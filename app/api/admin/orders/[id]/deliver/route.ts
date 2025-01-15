import { auth } from '@/lib/auth';
import prisma from '@/lib/prisma';

export const PUT = auth(async (...args: any) => {
  const [req, { params }] = args;
  if (!req.auth || !req.auth.user?.isAdmin) {
    return Response.json(
      { message: 'unauthorized' },
      {
        status: 401,
      },
    );
  }
  try {

    const order = await prisma.order.update({
      where : {
        id: await params.id
      },
      data: {
        isDelivered: true,
        deliveredAt: new Date()
      }
    });
    if (order) {
      return Response.json({message: "Berhasil Meperbaharui"});
    } else {
      return Response.json(
        { message: 'Order not found' },
        {
          status: 404,
        },
      );
    }
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
