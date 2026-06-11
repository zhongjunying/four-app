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
import { registerAction, sendCodeAction } from "@/actions/users"
import { useState, useEffect, useCallback } from 'react'
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
    code: z
        .string()
        .length(6, "Verification code must be 6 digits."),
})

export default function Register({ setNotAccountType }: { setNotAccountType: (type: NotAccountType) => void }) {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            account: "",
            password: "",
            code: "",
        },
    })

    const [isRegister, setIsRegister] = useState(false)
    const [isSending, setIsSending] = useState(false)
    const [countdown, setCountdown] = useState(0)

    // Countdown timer
    useEffect(() => {
        if (countdown <= 0) return
        const timer = setInterval(() => {
            setCountdown(prev => prev - 1)
        }, 1000)
        return () => clearInterval(timer)
    }, [countdown])

    const handleSendCode = useCallback(async () => {
        const email = form.getValues("email")
        // Validate email before sending
        const emailResult = z.string().email().safeParse(email)
        if (!emailResult.success) {
            toast.error("Please enter a valid email first.", { position: "top-center" })
            return
        }

        setIsSending(true)
        try {
            const result = await sendCodeAction(email)
            if (result.status === 200) {
                toast.success("Verification code sent to your email.", { position: "top-center" })
                setCountdown(60)
            } else {
                toast.error(result.data, { position: "top-center" })
            }
        } finally {
            setIsSending(false)
        }
    }, [form])

    const onSubmit = async (data: z.infer<typeof formSchema>) => {
        setIsRegister(true)
        try {
            const result = await registerAction(data.account, data.password, data.email, data.code)
            if (result.status === 200) {
                toast.success(result.data, { position: "top-center" })
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
                                    <div className="flex gap-2">
                                        <Input
                                            {...field}
                                            id="form-rhf-register-email"
                                            aria-invalid={fieldState.invalid}
                                            placeholder="Enter email"
                                            autoComplete="off"
                                            className="flex-1"
                                        />
                                        <Button
                                            type="button"
                                            variant="outline"
                                            disabled={isSending || countdown > 0}
                                            onClick={handleSendCode}
                                            className="shrink-0"
                                        >
                                            {isSending
                                                ? "Sending..."
                                                : countdown > 0
                                                    ? `Resend (${countdown}s)`
                                                    : "Send Code"}
                                        </Button>
                                    </div>
                                    {fieldState.invalid && (
                                        <FieldError errors={[fieldState.error]} />
                                    )}
                                </Field>

                            )}
                        />
                        <Controller
                            name="code"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor="form-rhf-register-code">
                                        Verification Code
                                    </FieldLabel>
                                    <Input
                                        {...field}
                                        id="form-rhf-register-code"
                                        aria-invalid={fieldState.invalid}
                                        placeholder="Enter 6-digit code"
                                        autoComplete="off"
                                        maxLength={6}
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
