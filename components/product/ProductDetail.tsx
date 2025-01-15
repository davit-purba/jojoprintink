'use client'

import { StarIcon } from '@heroicons/react/20/solid'
import { Category } from '@prisma/client'
import { convertDocToObj } from '@/lib/utils'
import AddToCart from './AddToCart'
import { formatRupiah } from '@/lib/utils'
import { classNames } from '@/lib/utils'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import toast from 'react-hot-toast'
interface ProductProps {
        name: string;
        id: string;
        slug: string;
        image: string;
        banner: string | null;
        categoryId: string;
        price: number;
        brand: string;
        description: string;
        rating: number;
        numReviews: number;
        countInStock: number;
        colors: string[];
        sizes: string[];
        isFeatured: boolean;
        categoryItems: Category;
}



const ProductDetail: React.FC = () => {
    const [products, setProducts] = useState<ProductProps>();
    const [loading, setLoading] = useState<boolean>(true);
    const searchParams = useSearchParams();
    const key = searchParams.get('sp');

    useEffect(() => {
        if (key) {
            const fetchData = async () => {
                try {
                    setLoading(true);
                    const response = await fetch(`/api/product/slug?sp=${key}`, {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    });

                    const data = await response.json();

                    if (!response.ok) {
                        toast.error(data.error)
                    }
                    setProducts(data);
                } catch (err) {
                    console.log(err)
                } finally {
                    setLoading(false);
                }
            };
            fetchData();
        }
    }, [key]);

    if (loading) return <p>Loading...</p>;

    if (!products || !products.categoryItems) {
        return <p>Gagal memuat data</p>
    }

    const renderStars = (rating: number) => {
        const stars = [];
        for (let i = 0; i < 5; i++) {
            stars.push(
                <StarIcon
                    key={i}
                    aria-hidden="true"
                    className={classNames(
                        i < rating ? 'text-warning' : 'text-gray-200',
                        'size-5 shrink-0',
                    )}
                />
            );
        }
        return stars;
    };
    return (
        <div className="bg-white">
            <div className="pt-4">
                <nav aria-label="Breadcrumb">
                    <ol role="list" className="mx-auto flex max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl mt-8">
                        <li key={products.id}>
                            <div className="flex items-center">
                                {products.categoryItems.name}
                                <svg
                                    fill="currentColor"
                                    width={16}
                                    height={20}
                                    viewBox="0 0 16 20"
                                    aria-hidden="true"
                                    className="h-5 w-4 text-gray-300"
                                >
                                    <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
                                </svg>
                            </div>
                        </li>
                        <li className="text-sm">
                            {products.name}
                        </li>
                    </ol>
                </nav>

                <div className="mx-auto mt-6 max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
                    <Image
                        alt=""
                        width={1000}
                        height={1000}
                        src={products.image}
                        className="aspect-[4/5] size-full object-cover sm:rounded-lg lg:aspect-auto"
                    />
                    <div className="mt-4 lg:row-span-3 lg:mt-0">
                        <h2 className="sr-only">Product information</h2>
                        <p className="text-2xl tracking-tight text-gray-900">{formatRupiah(products.price)}</p>

                        <div className="mt-6">
                            <h3 className="sr-only">Reviews</h3>
                            <div className="flex items-center">
                                <div className="flex items-center">
                                    {renderStars(products.rating)}
                                </div>
                            </div>
                        </div>

                        <form className="mt-10">
                            <div>
                                <h3 className="text-sm font-medium text-gray-900">Stock : {products.countInStock}</h3>

                                <fieldset aria-label="Choose a color" className="mt-4">
                                </fieldset>
                            </div>

                            {products.countInStock !== 0 && (
                                <div className='card-actions justify-center'>
                                    <AddToCart
                                        item={{
                                            ...convertDocToObj(products),
                                            qty: 0,
                                            color: '',
                                            size: '',
                                        }}
                                    />
                                </div>
                            )}
                        </form>
                    </div>
                </div>

                <div className="mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto_auto_1fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16">
                    <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
                        <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">{products.name}</h1>
                    </div>

                    <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6">
                        <div>
                            <h3 className="sr-only">Description</h3>

                            <div className="space-y-6">
                                <p className="text-base text-gray-900">{products.description}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductDetail;
