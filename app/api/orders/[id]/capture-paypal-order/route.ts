import prisma from '@/lib/prisma';
import { paypal } from '@/lib/paypal';
import { auth } from '@/lib/auth';
export const POST = auth(async (...request: any) => {
  const [req, { params }] = request;
  if (!req.auth) {
    return Response.json(
      { message: 'unauthorized' },
      {
        status: 401,
      },
    );
  }
  const order = await prisma.order.findFirst({
    where: {
      id: await params.id
    },
    include: {
      paymentResult: true
    }
  })

  if (order) {
    try {
      const { orderID } = await req.json();
      console.log("Order Id", orderID)
      const captureData = await paypal.capturePayment(orderID);

      const updatedOrder = await prisma.order.update({
        where: {
          id: order.id,
        },
        data: {
          isPaid: true,
        }
      })

      const idPaymentResult = order.paymentResult.id;

      await prisma.paymentResult.update({
        where: {
          id: idPaymentResult
        },
        data: {
          idPayment: captureData.id,
          status: captureData.status,
          emailAddress: captureData.payer.email_address
        }
      })

      // const updatedOrder = await order.save();
      return Response.json(updatedOrder);
    } catch (err) {
      console.log("error", err)
      return Response.json(
        { message: "Server error" },
        {
          status: 500,
        },
      );
    }
  } else {
    return Response.json(
      { message: 'Order not found' },
      {
        status: 404,
      },
    );
  }
});
