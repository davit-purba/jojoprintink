import { Metadata } from 'next';
import React from 'react';

import MyOrders from './MyOrders';

export const metadata: Metadata = {
  title: 'Riwayat Pesanan',
};

const MyOrderPage = () => {
  return (
    <div>
      <h1 className='py-2 text-xl'>Riwayat Pesanan</h1>
      <MyOrders />
    </div>
  );
};

export default MyOrderPage;
