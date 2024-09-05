'use client'
import Cart from '@/app/_components/Cart';
import { CartContext } from "@/app/_context/CartContext";
import { UserButton, useUser } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { useContext, useEffect, useState } from 'react';
import { MdShoppingCart } from "react-icons/md";
import cartApis from "../_apis/cartApis";


export default function Header() {
  const { user } = useUser();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [openCart, setOpenCart] = useState(false);
  const { cart, setCart } = useContext(CartContext);
  useEffect(() => {
    user && getCartItems();
  }, [user])
  const getCartItems = async () => {
    const res = await cartApis.getUserCartItems(user.primaryEmailAddress.emailAddress);
    res?.data?.data.forEach((item) => {
      setCart((oldCart) =>[
        ...oldCart,
        {
          id: item.id,
          product: item.attributes.products.data[0],
        }
      ]);
    });
  }
  useEffect(() => {
    setIsLoggedIn(window.location.href.toString().includes('sign'));
  }, []);

  return !isLoggedIn && (
    <header className="bg-white dark:bg-gray-900 border-b-2 border-gray-800">
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-">
        <div className="flex h-16 items-center justify-between">
          <div className="md:flex md:items-center md:gap-12">
            <Link href="/">
              <Image src="/logo.svg" alt="Logo" width="40" height="40" />
            </Link>
          </div>
          <div className="hidden md:block">
            <nav aria-label="Global">
              <ul className="flex items-center gap-6 text-sm">
                <li>
                  <a
                    className="text-gray-500 transition hover:text-gray-500/75 dark:text-white dark:hover:text-white/75"
                    href="#"
                  >
                    Home
                  </a>
                </li>

                <li>
                  <a
                    className="text-gray-500 transition hover:text-gray-500/75 dark:text-white dark:hover:text-white/75"
                    href="#"
                  >
                    Explore
                  </a>
                </li>

                <li>
                  <a
                    className="text-gray-500 transition hover:text-gray-500/75 dark:text-white dark:hover:text-white/75"
                    href="#"
                  >
                    Products
                  </a>
                </li>

                <li>
                  <a
                    className="text-gray-500 transition hover:text-gray-500/75 dark:text-white dark:hover:text-white/75"
                    href="#"
                  >
                    About
                  </a>
                </li>

                <li>
                  <a
                    className="text-gray-500 transition hover:text-gray-500/75 dark:text-white dark:hover:text-white/75"
                    href="#"
                  >
                    Contact Us
                  </a>
                </li>
              </ul>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            {
              user ? <div className="flex items-center gap-3 relative">
                  <h2 className="flex items-center cursor-pointer select-none ">
                    <MdShoppingCart onClick={() => setOpenCart(!openCart)} className="text-xl" />({cart?.length})
                  </h2>
                  {openCart && <Cart setOpenCart={setOpenCart} openCart={openCart} /> }
                  <UserButton />
                </div>
              : <div className="sm:flex sm:gap-4">
              <a
                className="rounded-md bg-blue-600 px-5 py-2.5 text-sm font-medium text-white shadow dark:hover:bg-blue-500"
                href="/sign-in"
              >
                Login
              </a>
              <div className="hidden sm:flex">
                <a
                  className="rounded-md bg-gray-100 px-5 py-2.5 text-sm font-medium text-blue-600 dark:bg-gray-800 dark:text-white dark:hover:text-white/75"
                  href="/sign-up"
                >
                  Register
                </a>
              </div>
            </div>
            }

            <div className="block md:hidden">
              <button
                className="rounded bg-gray-100 p-2 text-gray-600 transition hover:text-gray-600/75 dark:bg-gray-800 dark:text-white dark:hover:text-white/75"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="size-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
