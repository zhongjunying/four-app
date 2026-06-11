'use client'
import { NotAccountType } from '@/types/global'
import {
    Field,
    FieldError,
    FieldGroup,
    FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import * as z from "zod"
import { loginAction } from "@/actions/users"
import { useState } from 'react'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'

const formSchema = z.object({
    account: z
        .string()
        .min(5, "Account must be at least 5 characters.")
        .max(32, "Account must be at most 32 characters."),
    password: z
        .string()
        .min(6, "Password must be at least 6 characters.")
        .max(100, "Password must be at most 100 characters."),
})

export default function Login({ setNotAccountType }: { setNotAccountType: (type: NotAccountType) => void }) {
    const router = useRouter()
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            account: "",
            password: "",
        },
    })

    const [isLogin, setIsLogin] = useState(false)
    const onSubmit = async (data: z.infer<typeof formSchema>) => {
        // console.log("Form validated:", data)
        setIsLogin(true)
        try {
            const result = await loginAction(data.account, data.password)
            if (result.status === 200) {
                toast.success(result.data, { position: "top-center" })
                // form.reset()
                router.refresh()
            }
            else {
                toast.error(result.data, { position: "top-center" })
            }
        } finally {
            setIsLogin(false)
        }
    }
    return (
        <div className="container-sm my-20">
            <h1 className="text-xl mb-3 text-center font-bold">Welcome back</h1>
            <p className="text-center mb-6">
                Sign in to access an enhanced shopping experience.
            </p>
            <div className="w-full flex justify-center items-center">
                <form id="form-rhf-login" className="w-[400px]" onSubmit={form.handleSubmit(onSubmit)}>
                    <FieldGroup>
                        <Controller
                            name="account"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor="form-rhf-login-account">
                                        Account
                                    </FieldLabel>
                                    <Input
                                        {...field}
                                        id="form-rhf-login-account"
                                        aria-invalid={fieldState.invalid}
                                        placeholder="Enter account"
                                        autoComplete="off"
                                    />
                                    {fieldState.invalid && (
                                        <FieldError errors={[fieldState.error]} />
                                    )}
                                </Field>

                            )}
                        />
                        <Controller
                            name="password"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor="form-rhf-login-password">
                                        Password
                                    </FieldLabel>
                                    <Input
                                        {...field}
                                        id="form-rhf-login-password"
                                        type="password"
                                        aria-invalid={fieldState.invalid}
                                        placeholder="Enter password"
                                        autoComplete="off"
                                    />
                                    {fieldState.invalid && (
                                        <FieldError errors={[fieldState.error]} />
                                    )}
                                </Field>

                            )}
                        />
                        <Button type="submit" form="form-rhf-login" disabled={isLogin}>
                            Login
                        </Button>
                        <p className="text-center text-sm mt-3">Not a member? <span className="underline text-orange-400 cursor-pointer" onClick={() => setNotAccountType(NotAccountType.Register)}>Join us.</span></p>

                    </FieldGroup>
                </form>
            </div>
        </div>
    )
}