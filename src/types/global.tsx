export enum SortValue {
    Latest = "Latest",
    Low = "Low",
    High = "High",
}

export type Product = {
    id: number
    name: string
    price: number
    description: string
    image: string
    variant: string[]
}

export type ProductsResponse = {
    status: number
    data: Product[]
}

export type ProductResponse = {
    status: number
    data: Product
}

export type CartItem = {
    product: Product
    quantity: number
    selectedVariant: string
}