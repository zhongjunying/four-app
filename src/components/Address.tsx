'use client'
import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import {
    Field,
    FieldError,
    FieldGroup,
    FieldLabel,
} from "@/components/ui/field"
import { Button } from "@/components/ui/button"
import { Plus, Edit, Trash2 } from 'lucide-react'
import { z } from 'zod'
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import { Input } from "@/components/ui/input"
import { toast } from 'sonner'
import { addAddressAction, updateAddressAction } from "@/actions/addresses"
import { Address } from "@/types/global"
import { JwtPayload } from 'jsonwebtoken'
import { removeAddressAction, getAddressSingleAction } from "@/actions/addresses"
import { useState } from 'react'


const formSchema = z.object({
    name: z.string().min(1, { message: 'Name cannot be empty' }),
    city: z.string().min(1, { message: 'City cannot be empty' }),
    address: z.string().min(1, { message: 'Address cannot be empty' }),
    phone: z.string().min(1, { message: 'Phone cannot be empty' }),
})



export default function AddressComponent({ authData, addressesData }: { authData: JwtPayload; addressesData: Address[] }) {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            city: "",
            address: "",
            phone: "",
        },
    })
    const [open, setOpen] = useState(false)
    const [isEdit, setIsEdit] = useState(false)
    const [editId, setEditId] = useState<number | null>(null)
    const onOpenChange = (open: boolean) => {
        if (!open) {
            form.reset()
            setIsEdit(false)
            setEditId(null)
        }
        setOpen(open)
    }

    const onSubmit = async (data: z.infer<typeof formSchema>) => {
        if (isEdit && editId !== null) {
            await updateAddressAction(editId, { ...data, userid: authData.userid })
            toast.success('Address updated successfully')
        } else {
            await addAddressAction({ ...data, userid: authData.userid })
            toast.success('Address added successfully')
        }
        setOpen(false)
        form.reset()
    }
    const handleClick = async (id: number) => {
        await removeAddressAction(id)
        toast.success('Address deleted successfully')
    }
    const editAddress = async (id: number) => {
        const res = await getAddressSingleAction(authData.userid, id)
        const { name, city, address, phone } = res.data
        form.setValues({ name, city, address, phone })
        setIsEdit(true)
        setEditId(id)
        setOpen(true)
    }
    return (
        <div className="grid grid-cols-2 mt-6 mb-4 gap-4">
            <AlertDialog open={open} onOpenChange={onOpenChange}>
                <AlertDialogTrigger asChild>
                    <div className="border rounded-sm h-40 cursor-pointer relative text-slate-600" onClick={() => { setIsEdit(false); setEditId(null); }}>
                        <p className="m-3">New address</p>
                        <div className="absolute bottom-2 left-3">
                            <Plus width={14} />
                        </div>
                    </div>
                </AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle className="mb-5">{isEdit ? 'Edit address' : 'Add address'}</AlertDialogTitle>
                        <AlertDialogDescription></AlertDialogDescription>
                    </AlertDialogHeader>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <FieldGroup>
                            <Controller
                                name="name"
                                control={form.control}
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel>
                                            Name
                                        </FieldLabel>
                                        <Input
                                            {...field}
                                            aria-invalid={fieldState.invalid}
                                            placeholder="Enter name"
                                            autoComplete="off"
                                        />
                                        {fieldState.invalid && (
                                            <FieldError errors={[fieldState.error]} />
                                        )}
                                    </Field>

                                )}
                            />
                            <Controller
                                name="city"
                                control={form.control}
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel>
                                            City
                                        </FieldLabel>
                                        <Input
                                            {...field}
                                            aria-invalid={fieldState.invalid}
                                            placeholder="Enter city"
                                            autoComplete="off"
                                        />
                                        {fieldState.invalid && (
                                            <FieldError errors={[fieldState.error]} />
                                        )}
                                    </Field>
                                )}
                            />
                            <Controller
                                name="address"
                                control={form.control}
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel>
                                            Address
                                        </FieldLabel>
                                        <Input
                                            {...field}
                                            aria-invalid={fieldState.invalid}
                                            placeholder="Enter address"
                                            autoComplete="off"
                                        />
                                        {fieldState.invalid && (
                                            <FieldError errors={[fieldState.error]} />
                                        )}
                                    </Field>
                                )}
                            />
                            <Controller
                                name="phone"
                                control={form.control}
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel>
                                            Phone
                                        </FieldLabel>
                                        <Input
                                            {...field}
                                            aria-invalid={fieldState.invalid}
                                            placeholder="Enter phone"
                                            autoComplete="off"
                                        />
                                        {fieldState.invalid && (
                                            <FieldError errors={[fieldState.error]} />
                                        )}
                                    </Field>
                                )}
                            />
                            <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <Button type="submit">Save</Button>
                            </AlertDialogFooter>
                        </FieldGroup>

                    </form>

                </AlertDialogContent>
            </AlertDialog>
            {addressesData.map(item => (
                <div key={item.id} className="border rounded-sm h-40 relative text-slate-600">
                    <p className="m-3">{item.name}</p>
                    <div className="text-sm ml-5">
                        <p>{item.city}</p>
                        <p>{item.address}</p>
                        <p>{item.phone}</p>
                    </div>
                    <div className="absolute bottom-2 left-3 flex text-xs gap-2">
                        <div className="flex items-center cursor-pointer" onClick={() => editAddress(item.id)}><Edit width={14} /> Edit</div>
                        <div className="flex items-center cursor-pointer" onClick={() => handleClick(item.id)}><Trash2 width={14} /> Remove</div>
                    </div>
                </div>
            ))}
        </div>
    )
}