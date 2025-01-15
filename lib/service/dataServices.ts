import { cache } from "react";
import prisma from "../prisma";
import { NextResponse } from "next/server";

const getProducts = cache(async () => {
    try {
        const products = await prisma.product.findMany({
            include: {
                viewProduct: true
            }
        })
        return NextResponse.json(products)
    } catch (error) {
        return Response.json({ message: error })
    }
})

const plusView = cache(async (slug: string) => {
    try {
        const findProduct = await prisma.product.findFirst({
            where: {
                slug: slug
            }
        })

        if (findProduct) {

            const findView = await prisma.viewProduct.findFirst({
                where: {
                    productId: findProduct.id
                }
            })
            if (!findView) {
                 await prisma.viewProduct.create({
                    data: {
                        productId: findProduct.id,
                        view: 1
                    }
                })
            }
            const total: number = findView?.view + 1
            await prisma.viewProduct.update({
                where: {
                    productId: findProduct.id
                },
                data: {
                    view: total
                }
            })

        }
        return NextResponse.json({
            message: "Updated  views product",
            status: 201,
            data: findProduct
        })
    } catch (error) {
        return Response.json({ message: error})
    }
})

const getProductById = cache(async (slug: string) => {
    try {
        const product = await prisma.product.findFirst({
            where: {
                slug
            },
            include: {
                categoryItems: true
            }
        })
        return NextResponse.json(product)
    } catch (error) {
        return Response.json({ message: error })
    }
})
const getCategories = cache(async () => {
    try {
        const categories = await prisma.category.findMany()
        return NextResponse.json(categories)
    } catch (error) {
        return Response.json({ message: error })
    }
})
const getCategoryById = cache(async (categoryId: string) => {
    try {

        const category = await prisma.category.findFirst({
            where: {
                id: categoryId
            }
        })
        const categories = await prisma.product.findMany({
            where: {
                categoryId: categoryId
            },
            include: {
                categoryItems: true,
                viewProduct: true
            }
        })
        return NextResponse.json({categories, category})
    } catch (error) {
        return Response.json({ message: error})
    }
})
const productServices = {
    getProducts,
    getProductById,
    getCategories,
    getCategoryById,
    plusView
}

export default productServices;