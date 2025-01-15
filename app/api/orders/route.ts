import { OrderItem } from '@prisma/client';
import { round2 } from '@/lib/utils';
import prisma from '@/lib/prisma';
import { auth } from '@/lib/auth';

const calcPrices = async (orderItems: OrderItem[]) => {

  // Calculate the items price
  const itemsPrice = round2(
    orderItems.reduce((acc, item) => acc + item.price * item.qty, 0),
  );
  // Calculate the shipping price
  const shippingPrice = round2(itemsPrice > 100 ? 0 : 10);
  // Calculate the tax price
  const taxPrice = round2(Number((0 * itemsPrice).toFixed(2)));
  // Calculate the total price
  const totalPrice = round2(itemsPrice + shippingPrice + taxPrice);
  return { itemsPrice, shippingPrice, taxPrice, totalPrice };
};


export const POST = auth(async (req) => {

  if (!req.auth) {
    return Response.json(
      { message: 'unauthorized' },
      {
        status: 401,
      },
    );
  }
  const { user } = req.auth;

  try {
    const payload = await req.json();

    const idPayload = payload.items.map((x: { id: string }) => x.id)
    const qtyPayload = payload.items.map((x: { qty: number }) => x.qty)


    const productPrices = await prisma.product.findMany({
      where: {
        id: {
          in: idPayload
        }
      }
    })

    const dataPrices = productPrices.find((item) => item.id === idPayload[0])

    const orderItem = payload.items.map((x: { id: string }) => ({
      ...x,
      productId: x.id,
      price: productPrices.find((item) => item.id === x.id)?.price,
    }))


    const { itemsPrice, taxPrice, shippingPrice, totalPrice } = await
      calcPrices(orderItem);


    const newOrderItem = await prisma.orderItem.create({
      data: {
        productId: dataPrices?.id as string,
        name: dataPrices?.name as string,
        slug: dataPrices?.slug as string,
        qty: qtyPayload[0],
        image: dataPrices?.image as string,
        price: dataPrices?.price as number,
      }
    })

    const newShippingAddress = await prisma.shippingAddress.create({
      data: {
        userId: user.id as string,
        fullName: payload.shippingAddress.fullName as string,
        address: payload.shippingAddress.address as string,
        city: payload.shippingAddress.city as string,
        postalCode: payload.shippingAddress.postalCode as string,
        country: payload.shippingAddress.country as string
      }
    })

    const newPaymentResult = await prisma.paymentResult.create({
      data: {
        idPayment: "randomid",
        status: payload.paymentMethod as string,
        emailAddress: user.email as string
      }
    })

    const newOrder = await prisma.order.create({
      data: {
        userId: user.id,
        orderItemId: newOrderItem.id,
        shippingAddressId: newShippingAddress.id,
        paymentMethod: payload.paymentMethod,
        paymentResultId: newPaymentResult.id,
        itemsPrice,
        shippingPrice,
        taxPrice,
        totalPrice
      }
    })
    console. log("Order baru", newOrder)
    return Response.json(
      { message: 'Pesanan telah dibuat', order: newOrder },
      {
        status: 201,
      },
    );
  } catch (err) {
    console.log("error", err)
    return Response.json(
      { message: "Server error" },
      {
        status: 500,
      },
    );
  }
});
