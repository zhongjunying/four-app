'use server'
import db from "@/lib/db"
import { Product, ProductsResponse, ProductResponse } from "@/types/global"

export  async function getProductsAction(): Promise<ProductsResponse> {
    const result = await db('SELECT * FROM products')  as Product[]
    return {
        status: 200,
        data: result
    }
}


export async function getProductDetailAction(id: number): Promise<ProductResponse> {  
    const result = await db('SELECT * FROM products WHERE id = $1', [id])  as Product[]
    return {
        status: 200,
        data: result[0]
    }
}