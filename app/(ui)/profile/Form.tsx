'use client';

import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

type Inputs = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const Form = () => {
  const { data: session, update } = useSession();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<Inputs>({
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  });

  useEffect(() => {
    if (session && session.user) {
      setValue('name', session.user.name!);
      setValue('email', session.user.email!);
    }
  }, [router, session, setValue]);

  const formSubmit: SubmitHandler<Inputs> = async (form) => {
    const { name, email, password } = form;
    try {
      const res = await fetch('/api/auth/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });
      if (res.status === 200) {
        toast.success('Akun berhasil diperbarui');
        const newSession = {
          ...session,
          user: {
            ...session?.user,
            name,
            email,
          },
        };
        await update(newSession);
      } else {
        const data = await res.json();
        toast.error(data.message || 'error');
      }
    } catch (err) {
      console.log(err)
      const error = "Gagal memperbarui akun"
      toast.error(error);
    }
  };

  return (
    <div className="card mx-auto my-6 max-w-md bg-white shadow-xl rounded-lg p-6">
      <div className="card-body">
        <h1 className="card-title text-2xl font-semibold text-center mb-6 text-gray-800">Profile</h1>
        <form onSubmit={handleSubmit(formSubmit)}>
          <div className="my-4">
            <label className="label text-gray-700 font-medium" htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              {...register('name', { required: 'Name is required' })}
              className="input input-bordered w-full max-w-sm mt-2 px-4 py-2 rounded-md border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.name?.message && (
              <div className="text-red-500 mt-2">{errors.name.message}</div>
            )}
          </div>

          <div className="my-4">
            <label className="label text-gray-700 font-medium" htmlFor="email">Email</label>
            <input
              type="text"
              id="email"
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
                  message: 'Email is invalid',
                },
              })}
              className="input input-bordered w-full max-w-sm mt-2 px-4 py-2 rounded-md border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.email?.message && (
              <div className="text-red-500 mt-2">{errors.email.message}</div>
            )}
          </div>

          <div className="my-4">
            <label className="label text-gray-700 font-medium" htmlFor="password">New Password</label>
            <input
              type="password"
              id="password"
              {...register('password')}
              className="input input-bordered w-full max-w-sm mt-2 px-4 py-2 rounded-md border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.password?.message && (
              <div className="text-red-500 mt-2">{errors.password.message}</div>
            )}
          </div>

          <div className="my-4">
            <label className="label text-gray-700 font-medium" htmlFor="confirmPassword">Confirm New Password</label>
            <input
              type="password"
              id="confirmPassword"
              {...register('confirmPassword', {
                validate: (value) => {
                  const { password } = getValues();
                  return password === value || 'Passwords should match!';
                },
              })}
              className="input input-bordered w-full max-w-sm mt-2 px-4 py-2 rounded-md border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.confirmPassword?.message && (
              <div className="text-red-500 mt-2">{errors.confirmPassword.message}</div>
            )}
          </div>

          <div className="my-6">
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn btn-primary w-full py-3 rounded-md bg-blue-600 text-white font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition ease-in-out duration-200"
            >
              {isSubmitting && <span className="loading loading-spinner"></span>}
              Update
            </button>
          </div>
        </form>
      </div>
    </div>

  );
};

export default Form;
