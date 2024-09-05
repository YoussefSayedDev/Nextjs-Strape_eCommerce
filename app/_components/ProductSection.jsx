'use client'
import { useEffect, useState } from "react";
import productApis from "../_apis/productApis";
import ProductList from "./ProductList";


export default function ProductSection() {
  // UseState
  const [productList, setProductList] = useState([]);

  // Get The Products
  const getLatestProducts_ = async () => {
    const res = await productApis.getLatestProducts();
    setProductList(res.data.data);
  }
  
  // UseEffect
  useEffect(() => {
    getLatestProducts_();
  }, []);

  return (
    <section className='p-10 md:p-20'>
      <h1 className='text-3xl font-extrabold mb-8'>Our Latest Products</h1>
      <ProductList productList={productList} />
    </section>
  )
}
