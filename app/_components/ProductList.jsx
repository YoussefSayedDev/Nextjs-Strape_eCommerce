import Link from "next/link";
import ProductItem from "./ProductItem";


// ProductList
export default function ProductList({productList}) { 
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {productList.map((item) => (
        <Link 
          href={`/products/${item.id}`} 
          key={item.id}>
            {<ProductItem product={item} />}
        </Link>
      ))}
    </div>
  )
}
