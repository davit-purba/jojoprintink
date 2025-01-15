'use client';

import Link from 'next/link';
import toast from 'react-hot-toast';
import useSWR from 'swr';
import useSWRMutation from 'swr/mutation';
import { Category } from '@prisma/client';
import { formatId } from '@/lib/utils';



export default function Categories() {
  const { data: categories, error } = useSWR(`/api/admin/categories`);
  const { trigger: deleteProduct } = useSWRMutation(
    `/api/admin/categories`,
    async (url, { arg }: { arg: { categoryId: string } }) => {
      const toastId = toast.loading('Deleting category...');
      const res = await fetch(`${url}/${arg.categoryId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (res.ok) {
        toast.success('Kategori deleted successfully', {
          id: toastId,
        })
      } else {
        toast.error("Gagal menghapus kategori", {
          id: toastId,
        });
      }
    },
  );



  if (error) return 'An error has occurred.';
  if (!categories) return 'Loading...';

  return (
    <div>
      <div className='flex items-center justify-between'>
        <h1 className='py-4 text-2xl'>Categories</h1>
        <Link href='/admin/categories/create'>
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
              <th>id</th>
              <th>name</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category: Category) => (
              <tr key={category.id}>
                <td>{formatId(category.id!)}</td>
                <td>{category.name}</td>
                <td>
                  <Link
                    href={`/admin/categories/${category.name}?aid=${category.id}`}
                    type='button'
                    className='btn btn-ghost btn-sm'
                  >
                    Edit
                  </Link>
                  &nbsp;
                  <button
                    onClick={() => deleteProduct({ categoryId: category.id! })}
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
