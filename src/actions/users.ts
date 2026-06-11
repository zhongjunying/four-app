'use server'
import db from "@/lib/db"
import { User, UserResponse } from "@/types/global"
import jwt, { JwtPayload } from "jsonwebtoken"
import { cookies } from "next/headers"

const SECRET_KEY = "ZHONG-SECRET-KEY-123456"


export async function loginAction(account: string, password: string): Promise<UserResponse> {  
    const result = await db('SELECT * FROM users WHERE account = $1 ', [account])  as User[]
    const cookie = await cookies()
    if(result.length === 0) {
        return {
            status: 404,
            data: "Account not found"
        }
    }else {
        if(result[0].password === password) {
            const token = jwt.sign({ email: result[0].email, name: result[0].account, userid: result[0].id }, SECRET_KEY, { expiresIn: "1h" })
            cookie.set({
                name: "token",
                value: token,
                path: "/", 
                maxAge: 60 * 60 * 24
            })

            return {
                status: 200,
                data: "Login success"
            }
        }else {
            return {
                status: 401,
                data: "Password not match"
            }
        }
    }
}

export async function logoutAction(){
    const cookie = await cookies()
    cookie.delete("token")
    return {
        status: 200,
        data: "Logout success"
    }
}

export async function registerAction(account: string, password: string, email: string): Promise<UserResponse> {     
    const result = await db('SELECT * FROM users WHERE account = $1 OR email = $2', [account, email])  as User[]
    if(result.length !== 0) {
        if(result[0].email === email) {
            return {
                status: 401,
                data: "Email already exist"
            }
        }
        else{
            return {
                status: 401,
                data: "Account already exist"
            }
        }
    }
    await db('INSERT INTO users (account, password, email) VALUES ($1, $2, $3)', [account, password, email])
    return {
        status: 200,
        data: "Register success"
    }
}

export async function authAction(){
    const cookie = await cookies()
    const token = cookie.get("token")
    if(token) {
        try {
            const decoded = jwt.verify(token.value, SECRET_KEY) as JwtPayload
            return {
                status: 200,
                data: decoded
            }
        } catch (error) {
            return {
                status: 401,
                data: "Token expired: " + error
            }
        }
    }
    return {
        status: 401,
        data: "Not authenticated"
    } 
}