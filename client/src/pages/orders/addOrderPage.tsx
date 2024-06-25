import { Card, CardHeader, CardTitle, CardDescription, CardContent} from "@/components/ui/card"
import { AddOrderForm } from "@/forms/addOrderForm"
import { useEffect, useState } from "react"
import { api_base_url } from "@/lib/utils"


export const AddOrderPage = () => {
    const [ foodItems, setFoodItems ] = useState<[{
        name: string,
        price: number,
        _id: string
    }]>()
    
    useEffect(() => {
        const getFoodItems = async () => {
            const res = await fetch(`${api_base_url}/food/all`, {
                method: "GET"
            })
            const data = await res.json()
            setFoodItems(data.foods)
        }
        getFoodItems()
    }, [])
    
    return(
        <div className="h-full">
        <Card className="w-full max-w-[500px] mx-auto mt-20">
         <CardHeader>
             <CardTitle>New order</CardTitle>
             <CardDescription>Add new order here</CardDescription>
         </CardHeader>
         <CardContent>
             {
                foodItems && <AddOrderForm foodArray={foodItems} />
             }
         </CardContent>
        </Card>
     </div>
    )
}