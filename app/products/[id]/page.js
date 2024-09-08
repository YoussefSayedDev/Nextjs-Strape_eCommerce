'use client'
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import productApi from '../../_apis/productApis';
import Breadcrumb from '../../_components/Breadcrumb';
import ProductList from '../../_components/ProductList';
import ProductBanner from '../_components/ProductBanner';
import ProductInfo from '../_components/ProductInfo';

export default function ProductPage({params}) {
  const pathname = usePathname();

  const [product, setProduct] = useState([]);
  const [similarProducts, setSimilarProducts] = useState([]);

  // Get Product By Id
  const getProductById_ = async () => {
    const res = await productApi.getProductById(params?.id);
    setProduct(res.data.data);
    getProductListByCategory(res.data.data);
  }

  // Get Prouct By Category
  const getProductListByCategory = async (product) => {
    const res  = await productApi.getProductByCategory(product?.attributes?.category);
    setSimilarProducts(res?.data?.data);
  }
  useEffect(() => {
    getProductById_();
  }, [params?.id]);
  return (
    <section className='px-10 py-8 md:py28'>
      <Breadcrumb path={pathname} />
      <div className='grid grid-cols-1 md:grid-cols-2 justify-around mt-10 gap-5'>
        <ProductBanner product={product} />
        <ProductInfo product={product} />
      </div>
      <div className="mt-40">
        <h2 className='text-3xl font-bold mb-8'>Similar Products</h2>
        <ProductList productList={similarProducts} />
      </div>
    </section>
  )
}
