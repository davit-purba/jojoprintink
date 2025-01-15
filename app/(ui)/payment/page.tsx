import { Metadata } from 'next';

import Form from './Form';

export const metadata: Metadata = {
  title: 'Metode Pembayaran',
};

const PaymentPage = async () => {
  return (
    <div>
      <Form />
    </div>
  );
};

export default PaymentPage;
