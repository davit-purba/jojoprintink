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
  const users = await prisma.user.findMany()
  return Response.json(users);
});
