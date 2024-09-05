import Image from "next/image";
import { BiSolidCategoryAlt } from "react-icons/bi";

export default function ProductItem({product}) {
  return (
    <div className='border-2 rounded-lg border-transparent hover:border-white transition-all duration-300 cursor-pointer'>
      <div className='relative min-h-[180px]'>
        <Image 
          src={product?.attributes?.banner?.data?.attributes?.url} 
          alt="Products Image" 
          fill
          className='rounded-t-lg h-full w-full object-cover absolute'
        />
      </div>
      <div className='flex justify-between items-center p-3 bg-slate-900 rounded-b-lg'>
        <div className=''>
          <h2 className='text-base font-medium line-clamp-1'>{product?.attributes?.title}</h2>
          <h3 className='text-xs text-gray-400 flex items-center gap-1'>
            <BiSolidCategoryAlt />
            {product?.attributes?.category}
          </h3>
        </div>
        <div>
          <h2 className=''>${product?.attributes?.price}</h2>
        </div>
      </div>
    </div>
  )
}
