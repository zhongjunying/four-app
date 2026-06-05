import { getProductDetailAction, getProductsAction } from "@/actions/products";
import Image from "next/image"
import AddCart from "@/components/AddCart"

export async function generateStaticParams() {
    const res = await getProductsAction()
    return res.data.map(item => ({
        id: item.id + ''
    }))
}

export default async function Detail({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    const res = await getProductDetailAction(Number(id))
    return (
        <div className="container flex py-6">
            <div className="w-64">
                <h2 className="font-sans text-3xl lending-10 font-bold my-8">{res.data.name}</h2>
                <p className="leading-10">{res.data.description}</p>
            </div>
            <div className="h-[500px] flex-1 mx-10 bg-slate-50 p-4 rounded-lg shadow-md relative">
                <Image src={res.data.image} alt={res.data.name} fill priority sizes="300" style={{ objectFit: 'cover' }} />
            </div>
            <AddCart product={res.data} />
        </div>
    );
}