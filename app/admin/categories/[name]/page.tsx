import AdminLayout from '@/components/admin/AdminLayout';

import Form from './Form';

export function generateMetadata() {
  return {
    title: 'Edit Kategori',
  };
}

export default async function ProductEditPage() {

  return (
    <AdminLayout activeItem='categories'>
      <Form/>
    </AdminLayout>
  );
}
