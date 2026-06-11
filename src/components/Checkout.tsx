'use client'
import { Address } from "@/types/global";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
    TableFooter,
} from "@/components/ui/table"
import { useCartStore } from "@/store/index"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import Image from "next/image"
export default function Checkout({ addressesData }: { addressesData: Address[] }) {
    const { cartList } = useCartStore()
    const [selectedAddressID, setSelectedAddressID] = useState('')
    const handleChange = (value: string) => {
        setSelectedAddressID(value)
    }
    return (
        <>

            <div className="border-b py-4">
                <h2 className="text-lg leading-10 font-bold">Address</h2>
                {
                    addressesData.length === 0 ? (
                        <div className="my-2">
                            <p>Don&#39;t have a shipping address yet?</p>
                            <div className="flex text-sm items-center underline text-orange-400">
                                <Link href="/account">Add address</Link>
                                <ArrowUpRight width={18} />
                            </div>
                        </div>
                    ) : (
                        <div>
                            <Select value={selectedAddressID} onValueChange={handleChange}>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select Address" />
                                </SelectTrigger>
                                <SelectContent>
                                    {addressesData.map((item) => (
                                        <SelectItem key={item.id} value={item.id.toString()}>
                                            <h3 className="font-bold m-2">{item.name}</h3>
                                            <p className="mx-5">city: {item.city}</p>
                                            <p className="mx-5">address: {item.address}</p>
                                            <p className="mx-5">phone: {item.phone}</p>
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    )
                }
            </div>

            <div className="border-b py-4">
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
                                <TableCell>{item.quantity}</TableCell>
                                <TableCell>${item.product.price}</TableCell>
                                <TableCell className="text-right">${item.quantity * item.product.price}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                    <TableFooter>
                        <TableRow>
                            <TableCell colSpan={3}>Total</TableCell>
                            <TableCell className="text-right">
                                $
                                {cartList
                                    .reduce(
                                        (acc, cartItem) =>
                                            acc + cartItem.product.price * cartItem.quantity,
                                        0
                                    )
                                    .toFixed(2)}
                            </TableCell>
                        </TableRow>
                    </TableFooter>
                </Table>
            </div>
            <div className="border-b py-4">
                <h2 className="text-lg leading-10 font-bold">Payment</h2>
                <p>In the process of functional construction ...</p>
            </div>
            <div className="mt-4">
                <Button disabled={!selectedAddressID || !cartList.length}>Create order</Button>
            </div>
        </>
    );
}