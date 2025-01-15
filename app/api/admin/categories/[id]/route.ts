import prisma from '@/lib/prisma';
import { auth } from '@/lib/auth';

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
  const category = await prisma.category.findFirst({
    where: {
      id: await params.id
    }
  })
  if (!category) {
    return Response.json(
      { message: 'product not found' },
      {
        status: 404,
      },
    );
  }
  return Response.json(category);
});

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

  const {
    name,
    image
  } = await req.json();

  try {
    const category = await prisma.category.update({
      where: {
        id: await params.id
      },
      data: {
        name,
        image
      }
    })
    if (category) {
      return Response.json({ message: 'unauthorized' });
    } else {
      return Response.json(
        { message: 'Product not found' },
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
  console.log("delete", ...args)

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
    const category = await prisma.category.delete({
      where: {
        id: await params.id
      }
    })
    if (category) {
      return Response.json({ message: 'Product deleted successfully' });
    } else {
      return Response.json(
        { message: 'Product not found' },
        {
          status: 404,
        },
      );
    }
  } catch (err) {
    console.log("error", err)
    return Response.json(
      { message: "Hapus produk terlebih dahulu yang berkaitan dengan kategori ini!" },
      {
        status: 500,
      },
    );
  }
});
