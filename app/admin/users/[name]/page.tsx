import AdminLayout from '@/components/admin/AdminLayout';

import Form from './Form';

export function generateMetadata() {
  return {
    title: 'Edit User',
  };
}

export default function UserEditPage() {
  return (
    <AdminLayout activeItem='users'>
      <Form />
    </AdminLayout>
  );
}
