'use server'
import db from "@/lib/db"
import { Address } from "@/types/global"
import { revalidatePath } from "next/cache"

export async function addAddressAction(addressData: Omit<Address, 'id'>) {  
  const { name, city, address, phone, userid } = addressData
  await db('INSERT INTO addresses (name, city, address, phone, userid) VALUES ($1, $2, $3, $4, $5)', [name, city, address, phone, userid])
  revalidatePath('/account')
  return {
    status: 200,
    body: 'add address success'
  }
}

export async function getAddressesAction(userid: number) {
  const result = await db('SELECT * FROM addresses WHERE userid = $1', [userid]) as Address[]
  return {
    status: 200,
    body: 'addresses success',
    data: result
  }
}

export async function getAddressSingleAction(userid: number, id: number) {
  const result = await db('SELECT * FROM addresses WHERE userid = $1 AND id = $2', [userid, id]) as Address[]
  return {
    status: 200,
    body: 'address detail success',
    data: result[0]
  }
}

export async function removeAddressAction(id: number) {
  await db('DELETE FROM addresses WHERE id = $1', [id])
  revalidatePath('/account')
  return {
    status: 200,
    body: 'remove address success'
  }
}

export async function updateAddressAction(id: number, addressData: Omit<Address, 'id'>) {
  const { name, city, address, phone } = addressData
  await db('UPDATE addresses SET name = $1, city = $2, address = $3, phone = $4 WHERE id = $5', [name, city, address, phone, id])
  revalidatePath('/account')
  return {
    status: 200,
    body: 'update address success'
  }
}