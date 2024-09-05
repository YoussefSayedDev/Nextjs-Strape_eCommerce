'use client'
import cartApis from "@/app/_apis/cartApis";
import { CartContext } from "@/app/_context/CartContext";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useContext } from 'react';
import { FaCartShopping, FaRegCircleCheck } from "react-icons/fa6";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SkeletonProductInfo from "./SkeletonProductInfo";

export default function ProductInfo({product}) {
  const { user } = useUser();
  const router = useRouter();
  const { cart, setCart } = useContext(CartContext);
  const notify = () => {
    toast.success("Add To Cart Successfully!", {
      position: "bottom-right",
    });
  }
  const handleAddToCart = async () => {
    if (user) {
      notify();
      const data = {
        data: {
          username: user.fullName,
          email: user.primaryEmailAddress.emailAddress,
          products: [product?.id]
        }
      }
      try {
        const res = await cartApis.addToCart(data);
        setCart((oldCart) => [
          ...oldCart,
          { id: res?.data?.data?.id, product }
        ]);
      } catch (err) {
        console.error(err);
      }
    } else {
      router.push('/sign-in')
    }
  }
  return (
    <>
    {
      product.id?
      <div className="w-[450px]">
        <h2 className="text-xl">{product?.attributes?.title}</h2>
        <h3 className="text-base text-gray-400">{product?.attributes?.category}</h3>
        <h4 className="text-base mt-3">{product?.attributes?.description[0]?.children[0]?.text}</h4>
        <span className="text-3xl text-blue-600 mt-3 block">$ {product?.attributes?.price}</span>
        <button onClick={() => handleAddToCart()} className="flex items-center gap-2 rounded-lg bg-blue-600 hover:bg-blue-500 transition-all duration-300 px-5 py-2 mt-3">
          <FaCartShopping className="text-xl" />
          Add To Cart
        </button>
        <ToastContainer icon={<FaRegCircleCheck />} />
      </div>
      : <SkeletonProductInfo />
    }
    </>
  )
}
