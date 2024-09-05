export default function SkeletonProductInfo() {
  return (
    <div className="flex flex-col gap-1">
      <div className="h-[20px] w-[450px] bg-gray-500 animate-pulse"></div>
      <div className="h-[20px] w-[100px] bg-gray-500 animate-pulse"></div>
      <div className="h-[20px] w-[450px] bg-gray-500 animate-pulse mt-3"></div>
      <div className="h-[20px] w-[450px] bg-gray-500 animate-pulse"></div>
      <div className="h-[20px] w-[450px] bg-gray-500 animate-pulse"></div>
      <div className="h-[30px] w-[60px] bg-gray-500 animate-pulse mt-3"></div>
      <div className="h-[40px] w-[150px] bg-gray-500 animate-pulse mt-3"></div>
    </div>
  )
}
