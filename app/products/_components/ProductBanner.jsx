import Image from "next/image";


export default function ProductBanner({product}) {
  return (
    <div className="h-[300px] overflow-hidden">
      {
        product?.attributes?.banner?.data?.attributes?.url ? 
          <Image 
          src={product?.attributes?.banner?.data?.attributes?.url}  
          alt="Product Img" width={450} height={400} 
          className="rounded-lg h-full" 
          />
        : <div className="w-[450px] h-[300px] bg-gray-500 rounded-lg animate-pulse"></div>
      }
    </div>
  )
}
