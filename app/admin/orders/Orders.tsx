'use client';

import { formatNumber } from '@/lib/utils';
import Link from 'next/link';
import useSWR from 'swr';

interface Order {
  id: string;
  userId: string;
  paymentMethod: string;
  itemsPrice: number;
  shippingPrice: number;
  taxPrice: number;
  totalPrice: number;
  isPaid: boolean;
  isDelivered: boolean;
  paidAt: Date | null;
  deliveredAt: Date | null;
  createdAt: Date;
  user: {
    name: string
  }
}
export default function Orders() {
  const { data: orders, error, isLoading } = useSWR(`/api/admin/orders`);

  if (error) return 'An error has occurred.';
  if (isLoading) return 'Loading...';

  return (
    <div>
      <h1 className='py-4 text-2xl'>Orders</h1>
      <div className='overflow-x-auto'>
        <table className='table'>
          <thead>
            <tr>
              <th>ID</th>
              <th>USER</th>
              <th>DATE</th>
              <th>TOTAL</th>
              <th>PAID</th>
              <th>DELIVERED</th>
              <th>ACTION</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order: Order) => (
              <tr key={order.id}>
                <td>..{order.id.substring(20, 24)}</td>
                <td>{order.user?.name || 'Deleted user'}</td>
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
    </div>
  );
}
