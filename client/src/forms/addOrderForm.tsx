import ComboBox from "@/components/combobox"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table"
import { api_base_url } from "@/lib/utils"
import { zodResolver } from "@hookform/resolvers/zod"
import { Cross1Icon } from "@radix-ui/react-icons"
import { useEffect, useState } from "react"
import { useForm,useFieldArray, Controller } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import z from "zod"

type Props = {
    foodArray: [{
        name: string,
        price: number,
        _id: string
    }]
}

const formSchema = z.object({
    customerName: z.string().min(1, "Name of customer is required"),
    items: z.array(z.object({
        name: z.string().min(1, "Name of food item is required"),
        quantity: z.coerce.number().min(1, "Quantity"),
        id: z.string(),
        price: z.number()
    })).nonempty("Add atleast one food item to create an order")
}) 

export const AddOrderForm = ({ foodArray }: Props) => {
    const navigate = useNavigate()
    const [ total, setTotal ] = useState(0)
    const { register, formState: { errors }, control, handleSubmit, setValue,  watch } = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema)
    })
    const items = watch("items")
    const { fields, append, remove } = useFieldArray({
        control,
        name: "items"
    })

    useEffect(() => {
        
        if(items && items.length >= 1){
            const newTotal = items.reduce((acc, item) => acc + ((item.price / 100) * item.quantity), 0)
            setTotal(parseFloat(newTotal.toFixed(2)));
        }
    }, [items, items && items.map((item) => item.quantity)])

    const handleSelect = (index: any, selectedItem: any) => {
        setValue(`items.${index}.name`, selectedItem.name)
        setValue(`items.${index}.id`, selectedItem._id)
        setValue(`items.${index}.price`, selectedItem.price)
    }

    const onSubmit = handleSubmit(async (data) => {
        await fetch(`${api_base_url}/order`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                customerName: data.customerName,
                items: items.map((item) => {
                    return { foodItemId: item.id, quantity: item.quantity }
                }),
                amount: total,
                due: total
            })
        })
        navigate("/orders")
    })

    return(
        <form onSubmit={onSubmit}>
            <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="name">Customer Name</Label>
                    <Input id="name" placeholder="Name of your customer" {...register("customerName")} />
                    {errors.customerName && (
                        <span className="text-sm text-destructive">{errors.customerName.message}</span>
                    )}
                </div>
                <Table className="mt-4">
                    <TableHeader>
                        <TableRow>
                            <TableHead className="text-start w-[20px]">#</TableHead>
                            <TableHead className="text-start">Item</TableHead>
                            <TableHead className="text-end w-[100px]">Quantity</TableHead>
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
                                            render={() => (
                                                <ComboBox
                                                    items={foodArray}
                                                    onSelect={(selectedItem) => handleSelect(index, selectedItem)}
                                                />
                                            )}
                                        />
                                        {errors.items?.[index]?.name && (
                                            <span className="text-destructive text-sm">{errors.items?.[index]?.name?.message}</span>
                                        )}
                                        <input
                                            type="hidden"
                                            {...register(`items.${index}.id`)}
                                        />
                                        <input
                                            type="hidden"
                                            {...register(`items.${index}.price`)}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <Controller
                                            control={control}
                                            name={`items.${index}.quantity`}
                                            render={({ field }) => (
                                                <Input type="number" {...field} min={1} />
                                            )}
                                        />
                                        {errors.items?.[index]?.quantity && (
                                            <span className="text-destructive text-sm">{errors.items?.[index]?.quantity?.message}</span>
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
                        <TableRow className="cursor-pointer" onClick={() => append({ name: "", quantity: 0, id: "", price: 0 })}>
                            <TableCell colSpan={3} className="text-muted-foreground font-medium text-center">
                               Add Food Item
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </div>
            <Button className="mt-4 mr-3">Create</Button>
        </form>
    )
}