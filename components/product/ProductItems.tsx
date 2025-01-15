import Link from "next/link"
import productServices from "@/lib/service/dataServices"
import { ViewProduct } from "@prisma/client";
import { formatRupiah } from "@/lib/utils";
import { classNames } from "@/lib/utils";
import { StarIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import { EyeIcon } from "@heroicons/react/24/solid";
import WaButton from "../WaButton";

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
  viewProduct: ViewProduct[];
}

export default async function ProductItems() {
  const res = await productServices.getProducts();
  const products: ProductProps[] = await res.json()

  if (!products) {
    return <p>Gagal memuat produk</p>
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
    <div className="">
      <div className="mx-auto max-w-2xl sm:px-6 sm:py-4 lg:max-w-7xl lg:px-8">
        <div className="">
          <h3 className="font-semibold p-6 text-center text-xl">
            Portofolio
          </h3>
        </div>
        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {products ? (
            (
              products.map((product: ProductProps) => (
                <div key={product.id} className="p-4">
                  <div className="group relative">
                    <Link href={`/product/slug?sp=${product.slug}`}>
                      <Image
                        alt=""
                        width={1000}
                        height={1000}
                        src={product.image}
                        className="aspect-square w-full rounded-md bg-gray-200 object-cover group-hover:opacity-75 lg:aspect-auto lg:h-80"
                      />
                      <div className="mt-4 flex justify-between">
                        <div>
                          <h3 className="text-sm text-gray-700">
                            <span aria-hidden="true" className="absolute inset-0" />
                            {product.name}
                          </h3>
                          {/* <p className="mt-1 text-sm text-gray-500">{product.color}</p> */}
                        </div>
                        <p className="text-sm font-medium text-gray-900">{formatRupiah(product.price)}</p>
                      </div>
                      <div className="flex">
                        {renderStars(product.rating)}
                      </div>
                      <div className="flex gap-1">
                        <EyeIcon width={20} height={20} color="gray" />
                        {product.viewProduct.map((x: ViewProduct) => (
                          <div key={x.id}>
                            <p>{x.view}</p>
                          </div>
                        ))}
                      </div>
                    </Link>
                  </div>
                  <div>
                    <WaButton pesan={product} />
                  </div>
                </div>

              ))
            )
          ) : (
            <>
            </>
          )}

        </div>
      </div>
    </div>
  )
}
