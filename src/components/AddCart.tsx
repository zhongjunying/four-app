'use client'
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { Product } from "@/types/global"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { useCartStore } from "@/store/index"

export default function AddCart({ product }: { product: Product }) {
    const [value, setValue] = useState<string>('')
    const { cartList, addToCart, isItemInCart, updateQuantity } = useCartStore()
    const handleChange = (value: string) => {
        setValue(value)
    }
    const handleClick = () => {
        const index = isItemInCart(product.name, value)
        if (index !== -1) {
            updateQuantity(index, cartList[index].quantity + 1)
        }
        else {
            addToCart({ product, quantity: 1, selectedVariant: value })
        }
        setValue('')
    }
    return (
        <div className="w-80 py-12">
            <h3>Select</h3>
            <ToggleGroup className="justify-start py-6 border-b mb-6" type="single" variant="outline" value={value}
                onValueChange={handleChange}>
                {product.variant.map((item, i) => (
                    <ToggleGroupItem key={i} value={item}>{item}</ToggleGroupItem>
                ))}
            </ToggleGroup>
            <h3>Price</h3>
            <p className="text-2xl font-bold text-red-400 mb-6">${product.price}</p>
            <Button disabled={!value} onClick={handleClick}>Add to Cart</Button>
        </div>
    )
}