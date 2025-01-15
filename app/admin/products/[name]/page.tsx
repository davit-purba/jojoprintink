import AdminLayout from '@/components/admin/AdminLayout';

import Form from './Form';

export function generateMetadata() {
  return {
    title: 'Edit Product',
  };
}

export default async function ProductEditPage() {
  return (
    <AdminLayout activeItem='products'>
      <Form />
    </AdminLayout>
  );
}
