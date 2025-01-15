import { auth } from '@/lib/auth';
import prisma from '@/lib/prisma';

export const GET = auth(async (req) => {
  if (!req.auth || !req.auth.user?.isAdmin) {
    return Response.json(
      { message: 'unauthorized' },
      {
        status: 401,
      },
    );
  }
  const orders = await prisma.order.findMany({
    include: {
      user: true
    }
  })

  return Response.json(orders);
});
