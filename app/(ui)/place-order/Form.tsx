'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { CheckCircleIcon, PencilSquareIcon, ShoppingCartIcon, TruckIcon } from '@heroicons/react/24/outline';
import toast from 'react-hot-toast';
import useSWRMutation from 'swr/mutation';
import { formatRupiah } from '@/lib/utils';

import CheckoutSteps from '@/components/checkout/CheckoutSteps';
import useCartService from '@/lib/hooks/useCartStore';

const Form = () => {

  const router = useRouter();
  const {
    paymentMethod,
    shippingAddress,
    items,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    clear,
  } = useCartService();

  const { trigger: placeOrder, isMutating: isPlacing } = useSWRMutation(
    `/api/orders/mine`,
    async () => {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          paymentMethod,
          shippingAddress,
          items,
          itemsPrice,
          taxPrice,
          shippingPrice,
          totalPrice,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        toast.success('Order placed successfully');
        router.push(`/order/${"payment"}?o=${data.order.id}`);
        clear()
      } else {
        toast.error(data.message);
      }
    },
  );

  useEffect(() => {
    if (!paymentMethod) {
      return router.push('/payment');
    }
    if (items.length === 0) {
      return router.push('/');
    }
  }, [paymentMethod, router, items]);

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <>Loading...</>;

  return (
    <div>
      <CheckoutSteps current={3} />

      <div className="my-4 grid md:grid-cols-4 md:gap-5">
        <div className="overflow-x-auto md:col-span-3">
          <div className="card shadow-lg">
            <div className="card-body">
              <h2 className="card-title text-primary flex items-center">
                <TruckIcon className="w-5 h-5 mr-2" />Alamat Pengiriman
              </h2>
              <p>{shippingAddress.fullName}</p>
              <p>
                {shippingAddress.address}, {shippingAddress.city},{' '}
                {shippingAddress.postalCode}, {shippingAddress.country}{' '}
              </p>
              <div>
                <Link className="btn btn-outline items-center" href="/shipping">
                  <PencilSquareIcon className="w-5 h-5 mr-2" /> Edit
                </Link>
              </div>
            </div>
          </div>

          <div className="card mt-4 shadow-lg">
            <div className="card-body">
              <h2 className="card-title text-primary flex items-center">
                <CheckCircleIcon className="w-5 h-5 mr-2" /> Metode Pembayaran
              </h2>
              <p>{paymentMethod}</p>
              <div>
                <Link className="btn btn-outline items-center" href="/payment">
                  <PencilSquareIcon className="w-5 h-5 mr-2" /> Edit
                </Link>
              </div>
            </div>
          </div>

          <div className="card mt-4 shadow-lg">
            <div className="card-body">
              <h2 className="card-title text-primary flex items-center">
                <ShoppingCartIcon className="w-5 h-5 mr-2" /> Barang
              </h2>
              <table className="table">
                <thead>
                  <tr>
                    <th>Item</th>
                    <th>Quantity</th>
                    <th>Price</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((item) => (
                    <tr key={item.slug}>
                      <td>
                        <Link
                          href={`/product/${item.slug}`}
                          className="flex items-center hover:text-primary transition"
                        >
                          <Image
                            src={item.image}
                            alt={item.name}
                            width={50}
                            height={50}
                          />
                        </Link>
                      </td>
                      <td>
                        <span>{item.qty}</span>
                      </td>
                      <td>{formatRupiah(item.price)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div>
                <Link className="btn btn-outline items-center" href="/cart">
                  <PencilSquareIcon className="w-5 h-5 mr-2" /> Edit
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div>
          <div className="card shadow-lg">
            <div className="card-body">
              <h2 className="card-title text-primary">Ringkasan Pesanan</h2>
              <ul className="space-y-3">
                <li>
                  <div className="flex justify-between">
                    <div>Items</div>
                    <div>{formatRupiah(itemsPrice)}</div>
                  </div>
                </li>
                <li>
                  <div className="flex justify-between">
                    <div>Tax</div>
                    <div>{formatRupiah(taxPrice)}</div>
                  </div>
                </li>
                <li>
                  <div className="flex justify-between">
                    <div>Shipping</div>
                    <div>{formatRupiah(shippingPrice)}</div>
                  </div>
                </li>
                <li>
                  <div className="flex justify-between">
                    <div>Total</div>
                    <div>{formatRupiah(totalPrice)}</div>
                  </div>
                </li>

                <li>
                  <button
                    onClick={() => placeOrder()}
                    disabled={isPlacing}
                    className="btn btn-primary w-full flex items-center justify-center"
                  >
                    {isPlacing && (
                      <span className="loading loading-spinner mr-2"></span>
                    )}
                    Pesan Sekarang
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Form;
