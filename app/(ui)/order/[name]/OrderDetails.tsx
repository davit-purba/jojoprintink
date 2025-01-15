'use client';

import { PayPalButtons, PayPalScriptProvider } from '@paypal/react-paypal-js';
import Image from 'next/image';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import toast from 'react-hot-toast';
import useSWR from 'swr';
import useSWRMutation from 'swr/mutation';
import { formatRupiah } from '@/lib/utils';
import React from 'react';
import { useSearchParams } from 'next/navigation';

type PayPalOrderData = {
  orderID: string | null;
  payerID?: string | null;
};

const OrderDetails: React.FC = () => {
  const { data: session } = useSession();
  const paypalClientId = process.env.PAYPAL_CLIENT_ID || 'sb'
  const searchParams = useSearchParams();
  const key = searchParams.get('o');

  const { trigger: deliverOrder, isMutating: isDelivering } = useSWRMutation(
    `/api/orders/${key}`,
    async () => {
      const res = await fetch(`/api/admin/orders/${key}/deliver`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await res.json();
      if (res.ok) {
        toast.success('Pesanan berhasil terkirim')
      } else {
        toast.error(data.message);
      }
    },
  );

  async function createPayPalOrder() {
    const response = await fetch(`/api/orders/${key}/create-paypal-order`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const order = await response.json();
    return order.id;
  }

  async function onApprovePayPalOrder(data: PayPalOrderData) {
    await fetch(`/api/orders/${key}/capture-paypal-order`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    toast.success('Order paid successfully');
  }


  const { data, error } = useSWR(`/api/orders/${key}`);


  if (error) return error.message;
  if (!data) return 'Loading...';

  const {
    paymentMethod,
    shippingAddress,
    orderItem,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    isDelivered,
    deliveredAt,
    isPaid,
    paidAt,
  } = data;


  return (
    <div>
      <div className='my-4 grid md:grid-cols-4 md:gap-5'>
        <div className='md:col-span-3'>
          <div className='card shadow'>
            <div className='card-body'>
              <h2 className='card-title'>Alamat Pengiriman</h2>
              <p>{shippingAddress.fullName}</p>
              <p>
                {shippingAddress.address}, {shippingAddress.city},{' '}
                {shippingAddress.postalCode}, {shippingAddress.country}{' '}
              </p>
              {isDelivered ? (
                <div className='text-success'>Delivered at {deliveredAt}</div>
              ) : (
                <div className='text-error'>Not Delivered</div>
              )}
            </div>
          </div>

          <div className='card mt-4 shadow'>
            <div className='card-body'>
              <h2 className='card-title'>Payment Method</h2>
              <p>{paymentMethod}</p>
              {isPaid ? (
                <div className='text-success'>Paid at {paidAt}</div>
              ) : (
                <div className='text-error'>Not Paid</div>
              )}
            </div>
          </div>

          <div className='card mt-4 shadow'>
            <div className='card-body'>
              <h2 className='card-title'>Barang</h2>
              <table className='table'>
                <thead>
                  <tr>
                    <th>Item</th>
                    <th>Quantity</th>
                    <th>Price</th>
                  </tr>
                </thead>
                <tbody>
                  <tr key={orderItem.slug}>
                    <td>
                      <Link
                        href={`/product/${orderItem.slug}`}
                        className='flex items-center'
                      >
                        <Image
                          src={orderItem.image}
                          alt={orderItem.name}
                          width={50}
                          height={50}
                        ></Image>
                        <span className='px-2'>
                          {orderItem.name}
                        </span>
                      </Link>
                    </td>
                    <td>{orderItem.qty}</td>
                    <td>{formatRupiah(orderItem.price)}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div>
          <div className='card shadow'>
            <div className='card-body'>
              <h2 className='card-title'>Ringkasan Pesanan</h2>
              <ul>
                <li>
                  <div className='mb-2 flex justify-between'>
                    <div>Items</div>
                    <div>{formatRupiah(itemsPrice)}</div>
                  </div>
                </li>
                <li>
                  <div className='mb-2 flex justify-between'>
                    <div>Tax</div>
                    <div>{formatRupiah(taxPrice)}</div>
                  </div>
                </li>
                <li>
                  <div className='mb-2 flex justify-between'>
                    <div>Shipping</div>
                    <div>{formatRupiah(shippingPrice)}</div>
                  </div>
                </li>
                <li>
                  <div className='mb-2 flex justify-between'>
                    <div>Total</div>
                    <div>{formatRupiah(totalPrice)}</div>
                  </div>
                </li>

                {!isPaid && paymentMethod === 'PayPal' && (
                  <li>
                    <PayPalScriptProvider
                      options={{ clientId: paypalClientId }}
                    >
                      <PayPalButtons
                        createOrder={createPayPalOrder}
                        onApprove={onApprovePayPalOrder}
                      />
                    </PayPalScriptProvider>
                  </li>
                )}
                {session?.user?.isAdmin && (
                  <li>
                    <button
                      className='btn my-2 w-full'
                      onClick={() => deliverOrder()}
                      disabled={isDelivering}
                    >
                      {isDelivering && (
                        <span className='loading loading-spinner'></span>
                      )}
                      Mark as delivered
                    </button>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
