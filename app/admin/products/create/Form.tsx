'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ValidationRule, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import useSWRMutation from 'swr/mutation';
import { Product } from '@prisma/client';
import useSWR from 'swr';
import { Category } from '@prisma/client';

export default function ProductCreateForm() {
  const router = useRouter();
  const { data: categories } = useSWR(`/api/admin/categories`);

  const { trigger: createProduct, isMutating: isCreating } = useSWRMutation(
    `/api/admin/products`,
    async (url, { arg }) => {
      const res = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(arg),
      });
      const data = await res.json();
      if (!res.ok) return toast.error(data.message);

      toast.success('Product created successfully');
      router.push('/admin/products');
    }
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<Product>();

  const formSubmit = async (formData) => {
    const image = formData.image
    if (!image) {
      toast.error("Masukkan gambar terlebih dahulu!")
      return null
    }
    await createProduct(formData);
  };

  const FormInput = ({
    id,
    name,
    required,
    pattern,
  }: {
    id: keyof Product;
    name: string;
    required?: boolean;
    pattern?: ValidationRule<RegExp>;
  }) => (
    <div className='mb-6 md:flex'>
      <label className='label md:w-1/5' htmlFor={id}>
        {name}
      </label>
      <div className='md:w-4/5'>
        <input
          type='text'
          id={id}
          {...register(id, {
            required: required && `${name} is required`,
            pattern,
          })}
          className='input input-bordered w-full max-w-md'
        />
        {errors[id]?.message && (
          <div className='text-error'>{errors[id]?.message}</div>
        )}
      </div>
    </div>
  );

  const handleSelectCategory = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const id = event.target.value;
    setValue("categoryId", id)
};

  const FormInputNumber = ({
    id,
    name,
    required,
    min,
    max,
  }: {
    id: keyof Product;
    name: string;
    required?: boolean;
    min?: number;
    max?: number;
  }) => (
    <div className='mb-6 md:flex'>
      <label className='label md:w-1/5' htmlFor={id}>
        {name}
      </label>
      <div className='md:w-4/5'>
        <input
          type='number'
          id={id}
          {...register(id, {
            required: required && `${name} is required`,
            valueAsNumber: true, // Konversi input menjadi angka
            min: min && { value: min, message: `${name} must be at least ${min}` },
            max: max && { value: max, message: `${name} must be at most ${max}` },
          })}
          className='input input-bordered w-full max-w-md'
        />
        {errors[id]?.message && (
          <div className='text-error'>{errors[id]?.message}</div>
        )}
      </div>
    </div>
  );

  const uploadHandler = async (e) => {
    const toastId = toast.loading('Uploading image...');
    try {
      const resSign = await fetch('/api/cloudinary-sign', {
        method: 'POST',
      });
      const { signature, timestamp } = await resSign.json();
      const file = e.target.files[0];
      const formData = new FormData();
      formData.append('file', file);
      formData.append('signature', signature);
      formData.append('timestamp', timestamp);
      formData.append('api_key', process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY!);
      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/upload`,
        {
          method: 'POST',
          body: formData,
        }
      );
      const data = await res.json();
      setValue('image', data.secure_url);
      toast.success('File uploaded successfully', {
        id: toastId,
      });
    } catch (err) {
      toast.error(err.message, {
        id: toastId,
      });
    }
  };

  return (
    <div>
      <h1 className='py-4 text-2xl'>Create New Product</h1>
      <div>
        <form onSubmit={handleSubmit(formSubmit)}>
          <FormInput name='Name' id='name' required />
          <FormInputNumber name='Price' id='price' required />
          <div className='mb-6 md:flex'>
            <label className="label md:w-1/5" htmlFor="category">
              Category
            </label>
            <select onChange={handleSelectCategory} className="select select-bordered w-full max-w-md">
              <option value="">Select</option>
              {categories && categories.map((category: Category) => (
                <option key={category.id} value={category.id}>{category.name}</option>
              ))}
            </select>
          </div>
          <FormInput name='Brand' id='brand' required />
          <FormInput name='Description' id='description' required />
          <FormInputNumber name='Count In Stock' id='countInStock' required />
          <FormInputNumber name='Rating' id='rating' required/>
          <div className='mb-6 md:flex'>
            <label className='label md:w-1/5' htmlFor='imageFile'>
              Upload Image
            </label>
            <div className='mmd:w-4/5'>
              <input
                type='file'
                className='file-input w-full max-w-md'
                id='imageFile'
                onChange={uploadHandler}
              />
            </div>
          </div>
          <button
            disabled={isCreating}
            className='btn btn-primary'
          >
            {isCreating && <span className='loading loading-spinner'></span>}
            Create Product
          </button>
          <Link className='btn ml-4 ' href='/admin/products'>
            Cancel
          </Link>
        </form>
      </div>
    </div>
  );
}
