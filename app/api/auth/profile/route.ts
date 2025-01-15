import bcrypt from 'bcryptjs';
import prisma from '@/lib/prisma';
import { auth } from '@/lib/auth';
export const PUT = auth(async (req) => {
  if (!req.auth) {
    return Response.json({ message: 'Not authenticated' }, { status: 401 });
  }
  const { user } = req.auth;

  const { name, email, password } = await req.json();
  try {
    const findUser = await prisma.user.findFirst({
      where: {
        id: user.id
      }
    })
    if (!findUser) {
      return Response.json(
        { message: 'User not found' },
        {
          status: 404,
        },
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await prisma.user.update({
      where: {
        id: findUser.id
      },
      data: {
        name,
        email,
        password: hashedPassword
      }
    })
    return Response.json({ message: 'User has been updated' });
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
