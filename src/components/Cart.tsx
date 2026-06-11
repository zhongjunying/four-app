'use client'
import { ArrowUpRight, Trash2 } from 'lucide-react'
import Link from 'next/link'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { useCartStore } from "@/store/index"
export default function Cart({ status }: { status: number }) {
    const { cartList, updateQuantity, removeFromCart } = useCartStore()
    const quantityOptions = Array.from({ length: 10 }, (_, i) => i + 1)
    const handleChange = (index: number, value: string) => {
        updateQuantity(index, Number(value))
    }
    return (
        <div className="container">
            {cartList.length ?
                (
                    <div className="py-24 px-2 flex">
                        <div className="flex-1 mr-14">
                            <h2 className="text-2xl font-bold mb-6">Cart</h2>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="w-[400px]">Item</TableHead>
                                        <TableHead>Quantity</TableHead>
                                        <TableHead>Price</TableHead>
                                        <TableHead className="text-right">Total</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {cartList.map((item, i) => (
                                        <TableRow key={i}>
                                            <TableCell className="font-medium">
                                                <div className='flex'>
                                                    <Image src={item.product.image} alt={item.product.name} priority width={64} height={64} style={{ objectFit: 'cover' }} />
                                                    <div className="ml-4 space-y-3">
                                                        <p className="text-sm font-medium">{item.product.name}</p>
                                                        <p className="text-xs text-gray-400">{item.selectedVariant}</p>
                                                    </div>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex items-center">
                                                    <Trash2
                                                        className="mr-1"
                                                        color="gray"
                                                        cursor="pointer"
                                                        onClick={() => removeFromCart(i)}
                                                    />
                                                    <Select value={item.quantity.toString()} onValueChange={(value) => handleChange(i, value)}>
                                                        <SelectTrigger className="w-full max-w-48">
                                                            <SelectValue placeholder="Select Quantity" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            {quantityOptions.map((item) => (
                                                                <SelectItem key={item} value={item.toString()}>
                                                                    {item.toString()}
                                                                </SelectItem>
                                                            ))}
                                                        </SelectContent>
                                                    </Select>
                                                </div>
                                            </TableCell>
                                            <TableCell>${item.product.price}</TableCell>
                                            <TableCell className="text-right">${item.quantity * item.product.price}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                        <div className="w-56">
                            <h2 className="font-sans font-medium text-2xl mb-6">
                                Total
                            </h2>
                            <p className="text-2xl font-bold text-red-400 mb-6">${cartList.reduce((acc, cur) => acc + cur.quantity * cur.product.price, 0)}</p>
                            {status === 200 ?
                                <Link href="/checkout">
                                    <Button className="w-full">Checkout</Button>
                                </Link> :
                                <>
                                    <Link href="/account">
                                        <Button className="w-full">Login</Button>
                                    </Link>
                                    <p className="text-sm text-slate-500 text-center mt-1"> You need to login to checkout.</p>
                                </>
                            }

                        </div>
                    </div>
                ) :
                (
                    <div className="py-48 px-2">
                        <h2 className="text-2xl font-bold">Cart</h2>
                        <p className="text-sm w-[400px] mb-6 mt-4">
                            You don&#39;t have anything in your cart. Let&#39;s change that, use the
                            link below to start browsing our products.
                        </p>
                        <div className="flex text-sm items-center underline text-orange-400">
                            <Link href="/">Start Shopping</Link>
                            <ArrowUpRight width={18} />
                        </div>
                    </div>)}
        </div>
    );
}