import prisma from '@/lib/prisma';
import { auth } from '@/lib/auth';

import { paypal } from '@/lib/paypal';

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

    }
  });

  if (order) {
    try {
      const paypalOrder = await paypal.createOrder(order.totalPrice);
      return Response.json(paypalOrder);
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
