import prisma from '@/lib/prisma';
import { auth } from '@/lib/auth';

export const GET = auth(async (req) => {
  if (!req.auth || !req.auth.user?.isAdmin) {
    return Response.json(
      { message: 'unauthorized' },
      {
        status: 401,
      },
    );
  }
  const categories = await prisma.category.findMany()
  return Response.json(categories);
});

export const POST = auth(async (req) => {

  if (!req.auth || !req.auth.user?.isAdmin) {
    return Response.json(
      { message: 'unauthorized' },
      {
        status: 401,
      },
    );
  }
  
  try {
    const categoryData = await req.json()

    await prisma.category.create({
      data : {
        name: categoryData.name,
        image: categoryData.image
      }
    })
    return Response.json(
      { message: 'Product created successfully' },
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
