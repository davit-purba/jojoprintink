import prisma from '@/lib/prisma';
import { auth } from '@/lib/auth'; 

export const GET = auth(async (...args: any) => {
  const [req, {params}] = args;
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
        orderItem: true,
        shippingAddress: true
     }
  });
  return Response.json(order);
});
