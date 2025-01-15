import prisma from '@/lib/prisma';
import { Product } from '@prisma/client';
import CryptoJS from 'crypto-js';
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
  const products = await prisma.product.findMany({
    include: {
      categoryItems: true
    }
  })
  return Response.json(products);
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
    const productData: Product = await req.json()

    const generateSlug = (text: string): string => {
      return text
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');
    };

    const secretKey = 'theSecret';

    const data = productData.image;
    const encryptedImage = CryptoJS.AES.encrypt(data, secretKey).toString();

    await prisma.product.create({
      data: {
        name: productData.name,
        slug: generateSlug(productData.name + encryptedImage),
        image: productData.image,
        categoryId: productData.categoryId,
        price: productData.price,
        description: productData.description,
        brand: productData.brand,
        rating: productData.rating,
        countInStock: productData.countInStock

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
