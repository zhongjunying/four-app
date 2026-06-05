'use client'
import { Product } from "@/types/global"
import Image from "next/image"
import { useSortStore } from "@/store"
import { SortValue } from "@/types/global"
import { ProductTitle } from "@/lib/constant"
import { useRouter } from "next/navigation"
export default function Products({ data }: { data: Product[] }) {
  const { sortValue } = useSortStore()
  console.log(sortValue)
  const router = useRouter()
  const products = [...data]
  if (sortValue !== SortValue.Latest) {
    products.sort((a, b) => sortValue === SortValue.Low ? a.price - b.price : b.price - a.price)
  }
  const handleClick = (product: Product) => {
    router.push(`/detail/${product.id}`)
  }
  return (
    <div className="flex-1">
      <h2 className="mb-8 text-4xl">{ProductTitle}</h2>
      <div className="grid grid-cols-3 gap-4">
        {products.map((product: Product) => (
          <div key={product.id} className="bg-slate-50 p-4 rounded-lg shadow-md hover:bg-slate-200 transition duration-300 ease-in-out cursor-pointer"
            onClick={() => handleClick(product)}
          >
            <Image src={product.image} alt={product.name} width={300} height={300} priority />
            <div className="flex items-center justify-between mt-4">
              <h3 className="flex-2xl text-slate-700">{product.name}</h3>
              <p className="text-lg font-bold text-red-400">${product.price}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}