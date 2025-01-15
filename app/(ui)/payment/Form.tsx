'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import CheckoutSteps from '@/components/checkout/CheckoutSteps';
import useCartService from '@/lib/hooks/useCartStore';

const Form = () => {
  const router = useRouter();
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');

  const { savePaymentMethod, paymentMethod, shippingAddress } =
    useCartService();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    savePaymentMethod(selectedPaymentMethod);
    router.push('/place-order');
  };

  useEffect(() => {
    if (!shippingAddress) {
      return router.push('/shipping');
    }
    setSelectedPaymentMethod(paymentMethod || 'PayPal');
  }, [paymentMethod, router, shippingAddress]);

  return (
    <div>
      <CheckoutSteps current={1} />
      <div className="container mx-auto my-8 px-4">
        <div className="max-w-md mx-auto p-6 rounded-lg shadow-lg">
          <div className="flex items-center mb-4">
            <svg
              className="w-8 h-8 mr-3"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 12h3m4 0h-4m0 0h-3m3 0V9m0 3v3m-9-3h3m-4 0h4m0 0h-4m0 0H9m4 0h-4m0 0H6m0 0h3m3-6h3m4 0h-4m0 0H9m3 3H6"
              />
            </svg>
            <h1 className="text-2xl font-bold">Metode Pembayaran</h1>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            {['PayPal', 'Stripe', 'CashOnDelivery'].map((payment) => (
              <div key={payment} className="flex items-center">
                <input
                  type="radio"
                  name="paymentMethod"
                  className="radio radio-success mr-3"
                  value={payment}
                  checked={selectedPaymentMethod === payment}
                  onChange={() => setSelectedPaymentMethod(payment)}
                />
                <label className="label cursor-pointer">{payment}</label>
              </div>
            ))}
            <div className="space-y-2">
              <button
                className="btn btn-primary w-full"
              >
                Next
              </button>
              <button
                className="btn btn-base w-full"
                onClick={() => router.back()}
              >
                Back
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Form;
