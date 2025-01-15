import prisma from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';
export const GET = async (req: NextRequest) => {
    const url = req.nextUrl;
    const key = url.searchParams.get('ic');

    if (!key) {
        return NextResponse.json({ error: 'Parameter yang dimasukkan tidak sah' }, { status: 401 });
    }
    try {
        const product = await prisma.product.findFirst({
            where: {
                categoryId: key
            },
            include: {
                categoryItems: true,
                viewProduct: true
            }
        })
        return NextResponse.json(product)
    } catch (error) {
        console.log(error)
        return Response.json({ message: 'Product not found' })
    }
};
