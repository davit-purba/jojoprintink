import AdminLayout from '@/components/admin/AdminLayout';

import Categories from './Categories';
const AdminCategoryPage = () => {
  return (
    <AdminLayout activeItem='categories'>
      <Categories />
    </AdminLayout>
  );
};

export default AdminCategoryPage;
