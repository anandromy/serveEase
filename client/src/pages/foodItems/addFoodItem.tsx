import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { useNavigate } from "react-router-dom"
import { api_base_url } from "@/lib/utils"

const formSchema = z.object({
    name: z.string().min(1, {
        message: "Name of food item is required"
    }),
    price: z.string().refine((val) => /^\d+(\.\d{1,2})?$/.test(val), {
        message: "Price must be a valid number at most two decimal places"
    })
})

export const AddFoodItem = () => {
    const navigate = useNavigate()
    const { register, formState: { errors }, handleSubmit} = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema)
    })

    const onSubmit = handleSubmit(async (data) => {
        await fetch(`${api_base_url}/food/addFood`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
        navigate("/food_items")
    })

    return(
        <div className="h-full">
           <Card className="w-full md:w-[350px] mx-auto mt-20">
            <CardHeader>
                <CardTitle>Add food item</CardTitle>
                <CardDescription>Add food items in your menu</CardDescription>
            </CardHeader>
            <CardContent>
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
                    <Button className="mt-4 mx-auto flex">Save</Button>
                </form>
            </CardContent>
           </Card>
        </div>
    )
}