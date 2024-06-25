import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table"
import { api_base_url } from "@/lib/utils"
import { zodResolver } from "@hookform/resolvers/zod"
import { Cross1Icon } from "@radix-ui/react-icons"
import { useEffect, useState } from "react"
import { useForm,useFieldArray, Controller } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import z from "zod"

const formSchema = z.object({
    items: z.array(z.object({
        name: z.string().min(1, "Purchase item name is required"),
        price: z.coerce.number({
            invalid_type_error: "Invalid"
        }).min(1, {
            message: "Invalid"
        })
    })).nonempty("Add atleast one food item to create an order")
}) 

export const AddExpenseForm = () => {
    const navigate = useNavigate()
    const [ total, setTotal ] = useState(0)
    const { formState: { errors }, control, handleSubmit, watch } = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema)
    })
    const items = watch("items")
    const { fields, append, remove } = useFieldArray({
        control,
        name: "items"
    })

    useEffect(() => {
        
        if(items && items.length >= 1){
            const newTotal = items.reduce((acc, item) => acc + (Number(item.price)), 0)
            setTotal(newTotal)
        }
    }, [items && items.map((item) => item.price)])


    const onSubmit = handleSubmit(async (data) => {
        await fetch(`${api_base_url}/expense`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                items: data.items.map((item) => item.name),
                totalAmount: total
            })
        })
        navigate("/expenses")
    })

    return(
        <form onSubmit={onSubmit}>
            <div className="grid w-full items-center gap-4">
                <Table className="mt-4">
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[20px]">#</TableHead>
                            <TableHead className="text-start">Item</TableHead>
                            <TableHead className="w-[100px]">Price</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {
                            fields.map((field, index) => (
                                <TableRow key={field.id}>
                                    <TableCell className="cursor-pointer" onClick={() => remove(index)}>
                                        <Cross1Icon className="h-3 w-3 text-medium text-destructive" />
                                    </TableCell>
                                    <TableCell>
                                        <Controller
                                            control={control}
                                            name={`items.${index}.name`}
                                            render={({ field }) => (
                                                <div className="relative">
                                                    <Input {...field} list={`item-list-${index}`}
                                                    />
                                                </div>
                                            )}
                                        />
                                        {errors.items?.[index]?.name && (
                                            <span className="text-destructive text-sm">{errors.items?.[index]?.name?.message}</span>
                                        )}
                                    </TableCell>
                                    <TableCell>
                                        <Controller
                                            control={control}
                                            name={`items.${index}.price`}
                                            render={({ field }) => (
                                                <Input {...field} min={1} />
                                            )}
                                        />
                                        {errors.items?.[index]?.price && (
                                            <span className="text-destructive text-sm">{errors.items?.[index]?.price?.message}</span>
                                        )}
                                    </TableCell>
                                </TableRow>
                            ))
                        }
                        <TableRow>
                            <TableCell colSpan={3} className="text-center">
                                Total = {total}
                            </TableCell>
                        </TableRow>
                        <TableRow className="cursor-pointer" onClick={() => append({ name: "", price: 0 })}>
                            <TableCell colSpan={3} className="text-muted-foreground font-medium text-center">
                               Add purchase
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </div>
            <Button className="mt-4 mr-3">Create</Button>
        </form>
    )
}