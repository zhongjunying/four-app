import Sort from "@/components/Sort";
import Products from "@/components/Products";
import { getProductsAction } from "@/actions/products";
import { ProductsResponse } from "@/types/global";
export default async function Page() {
  const res: ProductsResponse = await getProductsAction()
  return (
    <div className="container flex py-6">
        <Sort />
        <Products data={res.data} />
    </div>
  );
}