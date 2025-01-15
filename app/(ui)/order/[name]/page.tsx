import OrderDetails from './OrderDetails';

export const generateMetadata = () => {
  return {
    title: 'Pesanan',
  };
};

const OrderDetailsPage = async () => {
  return (
    <OrderDetails />
  );
};

export default OrderDetailsPage;
