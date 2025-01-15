import React from 'react'
import productServices from '@/lib/service/dataServices'
import Link from 'next/link';
import Image from 'next/image';
import { Category } from '@prisma/client';

const CategoriesItem = async () => {
    const res = await productServices.getCategories()
    const categories: Category[] = await res.json()

    if (!categories) {
        return <p>Gagal memuat kategori</p>
      }    

    return (
        <>
            <div className='bg-gray-50 p-4'>
                <div className="">
                    <h3 className="font-semibold p-6 text-center text-xl">
                        Kategori
                    </h3>
                </div>
                <div className="flex overflow-x-auto space-x-6 p-6 bg-white shadow justify-around rounded-box">

                    {categories && categories ?(
                        (
                            categories.map((categori: Category) => (
                                <div
                                    className="rounded-box max-w-md space-x-4 shadow p-4 flex-shrink-0"
                                    key={categori.id}
                                >
                                    <Link href={`/category/${categori.name}?ic=${categori.id}`} className="">
                                        <Image
                                            alt={categori.name}
                                            src={categori.image}
                                            width={500}
                                            height={500}
                                            className="w-40 rounded-md bg-base lg:aspect-auto lg:h-40"
                                        />
                                        <h3 className="font-semibold text-center mt-6">{categori.name}</h3>
                                    </Link>
                                </div>
                            ))
                        )
                    ) : (
                        <>
                        </>
                    )}

                </div>

            </div>
        </>
    )
}

export default CategoriesItem