import prisma from '@/lib/prisma';
import { auth } from '@/lib/auth';

export const GET = auth(async (req) => {
  if (!req.auth) {
    return Response.json(
      { message: 'unauthorized' },
      {
        status: 401,
      },
    );
  }
  const { user } = req.auth;

  const orders = await prisma.order.findMany({
    where: {
      userId: user.id
    }
  })
  return Response.json(orders);
});
