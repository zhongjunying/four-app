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

export enum NotAccountType {
    Login = 'login',
    Register = 'register',
}

export type User = {
    id: number
    email: string
    account: string
    password: string
}

export type UserResponse = {
    status: number
    data: string
}

export type Address = {
  id: number
  name: string
  city: string
  address: string
  phone: string
  userid: number
}