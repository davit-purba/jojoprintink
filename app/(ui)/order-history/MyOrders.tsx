'use client';

import Link from 'next/link';
import React from 'react';
import useSWR from 'swr';
import { Order } from '@prisma/client';
import { formatNumber } from '@/lib/utils';

const MyOrders = () => {
  const { data: orders, error, isLoading } = useSWR('/api/orders/mine');

  if (error) return <>An error has occurred</>;
  if (isLoading) return <>Loading...</>;
  if (!orders) return <>No orders...</>;

  return (
    <div className='overflow-x-auto'>
      <table className='table'>
        <thead>
          <tr>
            <th>No</th>
            <th>DATE</th>
            <th>TOTAL</th>
            <th>PAID</th>
            <th>DELIVERED</th>
            <th>ACTION</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order: Order, idx: number) => (
            <tr key={order.id}>
              <td>{idx + 1}</td>
              {/* <td>{order.id.substring(20, 24)}</td> */}
              <td className='whitespace-nowrap'>
                {order.createdAt && order.createdAt
                  ? new Date(order.createdAt).toISOString().substring(0, 10)
                  : '0000-00-00'}
              </td>
              <td>{formatNumber(order.totalPrice)}</td>
              <td>
                {order.isPaid && order.paidAt
                  ? new Date(order.paidAt).toISOString().substring(0, 10)
                  : 'not paid'}
              </td>
              <td>
                {order.isDelivered && order.deliveredAt
                  ? new Date(order.deliveredAt).toISOString().substring(0, 10) // Convert to Date first
                  : 'not delivered'}
              </td>
              <td>
                <Link className="link" href={`/order/${"order"}?o=${order.id}`} passHref>
                  Details
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MyOrders;
