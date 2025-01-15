import prisma from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';
export const GET = async (req: NextRequest) => {
    const url = req.nextUrl;
    const key = url.searchParams.get('sp');

    if (!key) {
        return NextResponse.json({ error: 'Parameter yang dimasukkan tidak sah' }, { status: 401 });
    }
    try {
        const product = await prisma.product.findFirst({
            where: {
                slug: key
            },
            include: {
                categoryItems: true,
            }
        })
        if (product) {

            const findView = await prisma.viewProduct.findFirst({
                where: {
                    productId: product.id
                }
            })
            if (!findView) {
                await prisma.viewProduct.create({
                    data: {
                        productId: product.id,
                        view: 1
                    }
                })
            }
            const total: number = findView?.view + 1
            await prisma.viewProduct.update({
                where: {
                    productId: product.id
                },
                data: {
                    view: total
                }
            })

        }
        return NextResponse.json(product)
    } catch (error) {
        console.log(error)
        return Response.json({ message: 'Product not found' })
    }
};
