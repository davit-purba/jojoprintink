import { auth } from '@/lib/auth';
import prisma from '@/lib/prisma';

export const GET = auth(async (...args: any) => {
  const [req, { params }] = args;
  if (!req.auth || !req.auth.user?.isAdmin) {
    return Response.json(
      { message: 'unauthorized' },
      {
        status: 401,
      },
    );
  }
  const user = await prisma.user.findFirst({
    where: {
      id: await params.id
    }
  })
  if (!user) {
    return Response.json(
      { message: 'user not found' },
      {
        status: 404,
      },
    );
  }
  return Response.json(user);
});

export const PUT = auth(async (...p: any) => {
  const [req, { params }] = p;
  if (!req.auth || !req.auth.user?.isAdmin) {
    return Response.json(
      { message: 'unauthorized' },
      {
        status: 401,
      },
    );
  }

  const { name, email, isAdmin } = await req.json();

  try {
    const user = await prisma.user.update({
      where: {
        id: await params.id
      },
      data: {
        name,
        email,
        isAdmin: Boolean(isAdmin)
      }
    })
    if (user) {
      return Response.json({
        message: 'User updated successfully',
        user: user,
      });
    } else {
      return Response.json(
        { message: 'User not found' },
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

export const DELETE = auth(async (...args: any) => {
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
    const user = await prisma.user.findFirst({
      where: {
        id: await params.id
      }
    })
    if (user) {
      if (user.isAdmin)
        return Response.json(
          { message: 'User is admin' },
          {
            status: 400,
          },
        );
      await prisma.user.delete({
        where: {
          id: await params.id
        }
      })
      return Response.json({ message: 'User deleted successfully' });
    } else {
      return Response.json(
        { message: 'User not found' },
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
