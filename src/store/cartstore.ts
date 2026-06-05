import { create } from 'zustand'
import { persist } from 'zustand/middleware' // 用于持久化状态，存储到localStorage，即刷新页面也还保存状态
import { CartItem } from '@/types/global'

type CartState = {
    cartList: CartItem[]
    addToCart: (item: CartItem) => void
    removeFromCart: (index: number) => void
    isItemInCart: (name: string, selectedVariant: string) => number
    updateQuantity: (index: number, quantity: number) => void
}

// 未持久化的写法，刷新就会消失了
// const useCartStore = create<CartState>(
//     (set) => ({
//         cartList: [],
//         addToCart: (item) => set((state) => ({ cartList: [...state.cartList, item] })),
//         removeFromCart: (index) => set((state) => {
//             const newCartList = [...state.cartList]
//             newCartList.splice(index, 1)
//             return { cartList: newCartList }
//         }),
//         isItemInCart: (name, selectedVariant): number => {
//             return useCartStore.getState().cartList.findIndex(item => item.product.name === name && item.selectedVariant === selectedVariant)
//         },
//         updateQuantity: (index, quantity) => set((state) => {
//             const newCartList = [...state.cartList]
//             newCartList[index].quantity = quantity
//             return { cartList: newCartList }
//         }),
//     })
// )
const useCartStore = create<CartState>()(
    persist(
        (set) => ({
            cartList: [],
            addToCart: (item) => set((state) => ({ cartList: [...state.cartList, item] })),
            removeFromCart: (index) => set((state) => {
                const newCartList = [...state.cartList]
                newCartList.splice(index, 1)
                return { cartList: newCartList }
            }),
            isItemInCart: (name, selectedVariant): number => {
                return useCartStore.getState().cartList.findIndex(item => item.product.name === name && item.selectedVariant === selectedVariant)
            },
            updateQuantity: (index, quantity) => set((state) => {
                const newCartList = [...state.cartList]
                newCartList[index].quantity = quantity
                return { cartList: newCartList }
            }),
        }), {
        name: 'cart-store'
    }
    )
)


export default useCartStore