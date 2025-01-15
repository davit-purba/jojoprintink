import AdminLayout from '@/components/admin/AdminLayout';
import Form from './Form';

export function generateMetadata() {
  return {
    title: 'Tambah Kategori',
  };
}

export default function ProductEditPage() {
  return (
    <AdminLayout activeItem='categories'>
      <Form />
    </AdminLayout>
  );
}
