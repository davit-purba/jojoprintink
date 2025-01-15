'use client';

import Image from 'next/image';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { formatRupiah } from '@/lib/utils';
import useCartService from '@/lib/hooks/useCartStore';

const CartDetails = () => {
  const { items, itemsPrice, decrease, increase } = useCartService();
  const [mounted, setMounted] = useState(false);
  const router = useRouter();
  const { data: session } = useSession();
  const handleClick = () => {
    if (session?.user){
      router.push('/shipping')

    } else {
      router.push('/sign-in')
    }
  }

  useEffect(() => {
    setMounted(true);
  }, [items, itemsPrice, decrease, increase]);

  if (!mounted) return <>Loading...</>;

  return (
    <div>
      {items.length === 0 ? (
        <div className=''>
          <p className='mb-2 text-center'>Keranjang kosong!</p>

        </div>
      ) : (
        <div className='grid md:grid-cols-4 md:gap-5'>
          <div className='overflow-x-auto md:col-span-3'>
            <table className='table'>
              <thead>
                <tr>
                  <th>Item</th>
                  <th>Name</th>
                  <th>Quantity</th>
                  <th>Price</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item) => (
                  <tr key={item.slug}>
                    <td className='flex items-center'>
                      <Link
                        href={`/product/${item.slug}`}
                        className='flex items-center'
                      >
                        <Image
                          src={item.image}
                          alt={item.name}
                          width={80}
                          height={80}
                        />
                      </Link>
                    </td>
                    <td>
                      {item.name}
                    </td>
                    <td>
                      <div className='p-4'>
                        <button
                          className='btn'
                          type='button'
                          onClick={() => decrease(item)}
                        >
                          -
                        </button>
                        <p className='text-center'>{item.qty}</p>
                        <button
                          className='btn'
                          type='button'
                          onClick={() => increase(item)}
                        >
                          +
                        </button>
                      </div>
                    </td>
                    <td>{formatRupiah(item.price)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className='card bg-base shadow'>
            <div className='card-body'>
              <ul>
                <li className='pb-4 text flex'>
                  Subtotal :&nbsp;
                  <p className='text-warning'>
                    {items.reduce((acc, item) => acc + item.qty, 0)}
                  </p>
                  <br />
                </li>
                <p className='font-semibold pb-2'>
                  {formatRupiah(itemsPrice)}
                </p>
                <li>
                  <button
                    type='button'
                    className='btn btn-primary w-full'
                    onClick={handleClick}
                  >
                    Checkout
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartDetails;
