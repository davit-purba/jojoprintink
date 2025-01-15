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

  const product = await prisma.product.findFirst({
    where: {
      id : await params.id
    },
    include : {
      itemOrder: true
    }
  })
  if (!product) {
    return Response.json(
      { message: 'product not found' },
      {
        status: 404,
      },
    );
  }
  return Response.json(product);
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
    price,
    categoryId,
    image,
    brand,
    countInStock,
    description,
  } = await req.json();

  try {
    const product = await prisma.product.update({
      where: {
        id: await params.id
      },
       data :{
        name,
        price,
        categoryId,
        image,
        brand,
        countInStock,
        description,
       }
    })
    if (product) {
      return Response.json(product);
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

export const DELETE = auth (async (...args: any) => {

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
    const product = await prisma.product.delete({
      where: {
        id : params.id
      }
    })

    if (product) {
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
      { message: "Server error" },
      {
        status: 500,
      },
    );
  }
});
