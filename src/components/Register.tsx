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
import { registerAction } from "@/actions/users"
import { useState } from 'react'
import { toast } from 'sonner'

const formSchema = z.object({
    email: z
        .string()
        .email("Please enter a valid email."),
    account: z
        .string()
        .min(5, "Account must be at least 5 characters.")
        .max(32, "Account must be at most 32 characters."),
    password: z
        .string()
        .min(6, "Password must be at least 6 characters.")
        .max(100, "Password must be at most 100 characters."),
})

export default function Register({ setNotAccountType }: { setNotAccountType: (type: NotAccountType) => void }) {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            account: "",
            password: "",
        },
    })

    const [isRegister, setIsRegister] = useState(false)

    const onSubmit = async (data: z.infer<typeof formSchema>) => {
        // console.log("Form validated:", data)
        setIsRegister(true)
        try {
            const result = await registerAction(data.account, data.password, data.email)
            if (result.status === 200) {
                toast.success(result.data, { position: "top-center" })
                // form.reset()
                setNotAccountType(NotAccountType.Login)
            }
            else {
                toast.error(result.data, { position: "top-center" })
            }
        } finally{
            setIsRegister(false)
        }
    }
    return (
        <div className="container-sm my-20">
            <h1 className="text-xl mb-3 text-center font-bold">Become a member</h1>
            <p className="text-center mb-6">
                Create your DUYI store member profile.
            </p>
            <div className="w-full flex justify-center items-center">
                <form id="form-rhf-register" className="w-[400px]" onSubmit={form.handleSubmit(onSubmit)}>
                    <FieldGroup>
                        <Controller
                            name="email"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor="form-rhf-register-email">
                                        Email
                                    </FieldLabel>
                                    <Input
                                        {...field}
                                        id="form-rhf-register-email"
                                        aria-invalid={fieldState.invalid}
                                        placeholder="Enter email"
                                        autoComplete="off"
                                    />
                                    {fieldState.invalid && (
                                        <FieldError errors={[fieldState.error]} />
                                    )}
                                </Field>

                            )}
                        />
                        <Controller
                            name="account"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor="form-rhf-register-account">
                                        Account
                                    </FieldLabel>
                                    <Input
                                        {...field}
                                        id="form-rhf-register-account"
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
                                    <FieldLabel htmlFor="form-rhf-register-password">
                                        Password
                                    </FieldLabel>
                                    <Input
                                        {...field}
                                        id="form-rhf-register-password"
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
                        <Button type="submit" form="form-rhf-register" disabled={isRegister}>
                            Register
                        </Button>
                        <p className="text-center text-sm mt-3">Already a member? <span className="underline text-orange-400 cursor-pointer" onClick={() => setNotAccountType(NotAccountType.Login)}>Sign in.</span></p>

                    </FieldGroup>
                </form>
            </div>
        </div>
    )
}