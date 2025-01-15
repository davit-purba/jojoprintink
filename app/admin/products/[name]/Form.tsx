'use client';

import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect } from 'react';
import { ValidationRule, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import useSWR from 'swr';
import useSWRMutation from 'swr/mutation';
import { Category } from '@prisma/client';
import { OrderItem } from '@prisma/client';
import { formatId } from '@/lib/utils';
import Image from 'next/image';

interface ProductProps {
  name: string;
  id: string;
  slug: string;
  image: string;
  banner: string | null;
  categoryId: string;
  price: number;
  brand: string;
  description: string;
  rating: number;
  numReviews: number;
  countInStock: number;
  colors: string[];
  sizes: string[];
  isFeatured: boolean;
  categoryItems: Category;
  itemOrder: OrderItem[]
}

const ProductEditForm : React.FC = () => {
  const searchParams = useSearchParams();
  const key = searchParams.get('apd');
  const { data: categories } = useSWR(`/api/admin/categories`);
  const { data: product, error } = useSWR(`/api/admin/products/${key}`);
  const router = useRouter();
  const { trigger: updateProduct, isMutating: isUpdating } = useSWRMutation(
    `/api/admin/products/${key}`,
    async (url, { arg }) => {
      const res = await fetch(`${url}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(arg),
      });
      const data = await res.json();
      if (!res.ok) return toast.error(data.message);

      toast.success('Product updated successfully');
      router.push('/admin/products');
    },
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<ProductProps>();

  useEffect(() => {
    if (!product) return;
    setValue('name', product.name);
    // setValue('slug', product.slug);
    setValue('price', product.price);
    setValue('image', product.image);
    setValue('categoryId', product.categoryId);
    setValue('brand', product.brand);
    setValue('countInStock', product.countInStock);
    setValue('rating', product.rating);
    setValue('description', product.description);
  }, [product, setValue]);

  const formSubmit = async (formData) => {
    await updateProduct(formData);
  };

  if (error) return error.message;

  if (!product) return 'Loading...';

  const FormInput = ({
    id,
    name,
    required,
    pattern,
  }: {
    id: keyof ProductProps;
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

  const FormInputNumber = ({
    id,
    name,
    required,
    min,
    max,
  }: {
    id: keyof
    ProductProps;
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

  const handleSelectCategory = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const id = event.target.value;
    setValue("categoryId", id)
  };


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
        },
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
  if (!key) {
    return <p>Maaf kata kunci tidak dapat ditemukan</p>
  }
  return (
    <div>
      <h1 className='py-4 text-2xl'>Edit Product {formatId(key)}</h1>
      <div>
        <form onSubmit={handleSubmit(formSubmit)}>
          <FormInput name='Name' id='name' required />
          <div className='mb-6 md:flex'>
            <label className="label md:w-1/5" htmlFor="category">
              Image
            </label>
            <Image
              src={product.image}
              alt={product.name}
              width={100}
              height={100}
            />
          </div>
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
          <FormInputNumber name='Rating' id='rating' required />
          <div className='mb-6 md:flex'>
            <label className='label md:w-1/5' htmlFor='imageFile'>
              Upload Image
            </label>
            <div className='md:w-4/5'>
              <input
                type='file'
                className='file-input w-full max-w-md'
                id='imageFile'
                onChange={uploadHandler}
              />
            </div>
          </div>
          <button
            disabled={isUpdating}
            className='btn btn-primary'
          >
            {isUpdating && <span className='loading loading-spinner'></span>}
            Update
          </button>
          <Link className='btn ml-4 ' href='/admin/products'>
            Cancel
          </Link>
        </form>
      </div>
    </div>
  );
}
export default ProductEditForm;