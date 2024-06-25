import { FoodItemTable } from "@/components/foodItemsTable"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { PlusIcon } from "@radix-ui/react-icons"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

const api_base_url = import.meta.env.VITE_API_BASE_URL

export const FoodItems = () => {
    const [ foodItems, setFoodItems ] = useState()
    
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
            <div className="flex items-center justify-between gap-6">
                <div className="flex flex-1 gap-6 items-center">
                    <span className="hidden md:block text-muted-foreground font-medium text-xl text-nowrap">Food Items</span>
                    <Input type="email" placeholder="search for food items" />
                </div>
                <Button className="hidden md:block" asChild>
                    <Link to="add">Add item</Link>
                </Button>
                <Button className="md:hidden">
                    <Link to="add"><PlusIcon className="h-4 w-4" /></Link>
                </Button>
            </div>
            {
                foodItems && 
                <FoodItemTable foodArray={foodItems} />
            }
        </div>
    )
}