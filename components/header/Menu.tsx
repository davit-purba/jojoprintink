'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { signOut, useSession } from 'next-auth/react';
import { UserCircleIcon } from '@heroicons/react/24/solid';
import { ShoppingCartIcon } from '@heroicons/react/24/outline';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import useCartService from '@/lib/hooks/useCartStore';
const Menu = () => {
  const { items, init } = useCartService();
  const { data: session } = useSession();

  const signOutHandler = () => {
    signOut({ callbackUrl: '/sign-in' });
    init();
  };

  const handleClick = () => {
    (document.activeElement as HTMLElement).blur();
  };

  return (
    <>
      <div className="navbar bg-gradient-to-r from-blue-500 via-green-500 to-green-400">
        <div className="flex-1">
          <Link href="/">
            <Image
              src='https://res.cloudinary.com/dx1wjwf5o/image/upload/v1736437854/ftrrmcfrpha3syetypd3.png'
              alt=''
              width={160}
              height={50}
            />
          </Link>
        </div>

        <ul className="items-center gap-4">
          {session?.user.isAdmin === false ? (
            <>
              <li className='flex items-center'>
                <Link href="/cart" className="relative mr-1" aria-label="Shopping Cart">
                  <ShoppingCartIcon height={25} width={25} color='white' />
                  <span className="absolute -right-4 -top-4">
                    {items.length !== 0 && (
                      <div className="badge badge-error px-1.5">
                        {items.reduce((a, c) => a + c.qty, 0)}
                      </div>
                    )}
                  </span>
                </Link>
              </li>
            </>
          ) : (
            <>
            </>
          )}
          {!session && (
            <>
              <li className='flex items-center'>
                <Link href="/cart" className="relative mr-1" aria-label="Shopping Cart">
                  <ShoppingCartIcon height={25} width={25} color='white' />
                  <span className="absolute -right-4 -top-4">
                    {items.length !== 0 && (
                      <div className="badge badge-error px-1.5">
                        {items.reduce((a, c) => a + c.qty, 0)}
                      </div>
                    )}
                  </span>
                </Link>
              </li>
            </>
          )}
          {session && session.user ? (
            <div className="dropdown dropdown-end dropdown-bottom">
              <label tabIndex={0} className="btn btn-ghost rounded-btn flex items-center gap-2 text-white">
                {session.user.name}
                <ChevronDownIcon className="h-5 w-5" />
              </label>
              <ul
                tabIndex={0}
                className="menu dropdown-content z-[1] w-52 rounded-box bg-white p-2 shadow border-sm"
              >
                {session.user.isAdmin && (
                  <li>
                    <Link href="/admin/dashboard" onClick={handleClick}>
                      Admin Dashboard
                    </Link>
                  </li>
                )}
                  {!session?.user.isAdmin && (
                    <li>
                      <Link href="/order-history" onClick={handleClick}>
                        Riwayat Pesanan
                      </Link>
                    </li>
                  )}

                  <li>
                    <Link href="/profile" onClick={handleClick}>
                      Akun
                    </Link>
                  </li>
                  <li>
                    <button className="button" onClick={signOutHandler}>
                      Keluar
                    </button>
                  </li>
              </ul>
            </div>
          ) : (
            <Link href="/sign-in">
              <UserCircleIcon height={30} width={30} color='white' />
            </Link>
          )}
        </ul>
      </div>
    </>
  );
};

export default Menu;
