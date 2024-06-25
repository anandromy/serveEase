import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { EditFoodForm } from "@/forms/editForm"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

const api_base_url = import.meta.env.VITE_API_BASE_URL

export const EditFoodItem = () => {
    const [ food, setFood ] = useState<{
        name: string,
        price: number
    }>()

    const params = useParams()

    useEffect(() => {
        const getFood = async () => {
            const res = await fetch(`${api_base_url}/food/getFoodById/${params.id}`)
            const resData = await res.json()
            setFood(resData.food)
        }
        getFood()
    }, [])

    return(
        <div className="h-full">
           <Card className="w-full md:w-[350px] mx-auto mt-20">
            <CardHeader>
                <CardTitle>Add food item</CardTitle>
                <CardDescription>Add food items in your menu</CardDescription>
            </CardHeader>
            <CardContent>
                <EditFoodForm name={food?.name || ""} price={food?.price ? String(food.price / 100) : "0"} />     
            </CardContent>
           </Card>
        </div>
    )
}