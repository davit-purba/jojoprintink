'use client';

import Link from 'next/link';
import toast from 'react-hot-toast';
import useSWR from 'swr';
import useSWRMutation from 'swr/mutation';

import { formatId, formatNumber } from '@/lib/utils';
import { Category } from '@prisma/client';
import { OrderItem } from '@prisma/client';

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
  itemOrder: OrderItem[]
}


export default function Products() {

  const { data: products, error } = useSWR(`/api/admin/products`);

  const { trigger: deleteProduct } = useSWRMutation(
    `/api/admin/products`,
    async (url, { arg }: { arg: { productId: string } }) => {
      const toastId = toast.loading('Deleting product...');
      const res = await fetch(`${url}/${arg.productId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (res.ok) {
        toast.success('Product deleted successfully', {
          id: toastId,
        })
      } else {
        toast.error("Gagal menghapus produk", {
          id: toastId,
        });
      }
    },
  );



  if (error) return 'An error has occurred.';
  if (!products) return 'Loading...';

  return (
    <div>
      <div className='flex items-center justify-between'>
        <h1 className='py-4 text-2xl'>Products</h1>
        <Link href='/admin/products/create'>
          <button
            className='btn btn-primary btn-sm'
          >
            Create
          </button>
        </Link>
      </div>

      <div className='overflow-x-auto'>
        <table className='table table-zebra'>
          <thead>
            <tr>
              <th>No</th>
              <th>id</th>
              <th>name</th>
              <th>price</th>
              <th>category</th>
              <th>count in stock</th>
              <th>rating</th>
              <th>actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product: ProductProps, idx: number) => (
              <tr key={product.id}>
                <td>{idx + 1}</td>
                <td>{formatId(product.id!)}</td>
                <td>{product.name}</td>
                <td>{formatNumber(product.price)}</td>
                <td>{product.categoryItems?.name}</td>
                <td>{product.countInStock}</td>
                <td>{product.rating}</td>
                <td>
                  <Link
                    href={`/admin/products/${product.name}?apd=${product.id}`}
                    type='button'
                    className='btn btn-ghost btn-sm'
                  >
                    Edit
                  </Link>
                  &nbsp;
                  <button
                    onClick={() => deleteProduct({ productId: product.id! })}
                    type='button'
                    className='btn btn-ghost btn-sm'
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
