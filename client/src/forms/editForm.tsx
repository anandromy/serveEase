import z from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useNavigate, useParams } from "react-router-dom"
import { useEffect } from "react"

const api_base_url = import.meta.env.VITE_API_BASE_URL

type Props = {
    name:  string,
    price: string
}

const formSchema = z.object({
    name: z.string().min(1, {
        message: "Name of food item is required"
    }),
    price: z.string().refine((val) => /^\d+(\.\d{1,2})?$/.test(val), {
        message: "Price must be a valid number at most two decimal places"
    })
})

export const EditFoodForm = ({ name, price }: Props ) => {
    const navigate = useNavigate()
    const params = useParams()
    const { register, formState: { errors }, handleSubmit, reset } = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema)
    })

    useEffect(() => {
        reset({ name, price })
    }, [ reset, name, price ])

    const onSubmit = handleSubmit(async (data) => {
        await fetch(`${api_base_url}/food/updateFood/${params.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
        navigate("/food_items")
    })

    const handleDelete = async() => {
        await fetch(`${api_base_url}/food/deleteFood/${params.id}`, {
            method: "POST",
        })
        navigate("/food_items")
    }

    return (
        <form onSubmit={onSubmit}>
            <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" placeholder="Name of your item" {...register("name")} />
                    {errors.name && (
                        <span className="text-sm text-destructive">{errors.name.message}</span>
                    )}
                </div>
                <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="price">Price</Label>
                    <Input id="price" placeholder="Price of your item" {...register("price")} />
                    {errors.price && (
                        <span className="text-sm text-destructive">{errors.price.message}</span>
                    )}
                </div>
            </div>
            <Button className="mt-4 mr-3">Save</Button>
            <Button variant="destructive" type="button" onClick={async () => await handleDelete()}>Delete</Button>
        </form>
    )
}