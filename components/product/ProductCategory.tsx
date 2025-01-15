"use client"

import Link from 'next/link';
import Image from 'next/image';
import { Category, ViewProduct } from '@prisma/client';
import WaButton from '../WaButton';
import { classNames, formatRupiah } from '@/lib/utils';
import { EyeIcon, StarIcon } from '@heroicons/react/24/solid';
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import toast from 'react-hot-toast';

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
    categoryItems: Category
    viewProduct: ViewProduct[];
}

const ProductCategory: React.FC = () => {
    const [products, setProducts] = useState<ProductProps>();
    const [loading, setLoading] = useState<boolean>(true);
    const searchParams = useSearchParams();
    const key = searchParams.get('ic');

    useEffect(() => {
        if (key) {
            const fetchData = async () => {
                try {
                    setLoading(true);
                    const response = await fetch(`/api/product?ic=${key}`, {
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

    if (!products) {
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
        <>
            <div className="bg-white">
                <nav aria-label="Breadcrumb">
                    <ol role="list" className="mx-auto flex max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl mt-8">
                        <li>
                            <div key={products.id} className="flex items-center">
                                <p>{products.categoryItems.name}</p>
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
                    </ol>
                </nav>
                <div className="mx-auto max-w-2xl px-4 py-2 sm:px-6 sm:py-8 lg:max-w-7xl lg:px-8">
                    <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                        <div key={products.id} className="p-4">
                            <div className="group relative">
                                <Link href={`/product/${products.name}?sp=${products.slug}`}>
                                    <Image
                                        alt=""
                                        width={1000}
                                        height={1000}
                                        src={products.image}
                                        className="aspect-square w-full rounded-md bg-gray-200 object-cover group-hover:opacity-75 lg:aspect-auto lg:h-80"
                                    />
                                    <div className="mt-4 flex justify-between">
                                        <div>
                                            <h3 className="text-sm text-gray-700">
                                                <span aria-hidden="true" className="absolute inset-0" />
                                                {products.name}
                                            </h3>
                                            {/* <p className="mt-1 text-sm text-gray-500">{product.color}</p> */}
                                        </div>
                                        <p className="text-sm font-medium text-gray-900">{formatRupiah(products.price)}</p>
                                    </div>
                                    <div className="flex">
                                        {renderStars(products.rating)}
                                    </div>
                                    <div className="flex gap-1">
                                        <EyeIcon width={20} height={20} color="gray" />
                                        {products.viewProduct.map((item: ViewProduct) => (
                                            <div key={item.id}>
                                                <p>{item.view}</p>
                                            </div>
                                        ))}
                                        {/* <p>{product.viewProduct}</p> */}
                                    </div>
                                </Link>
                            </div>
                            <div>
                                <WaButton pesan={products} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ProductCategory