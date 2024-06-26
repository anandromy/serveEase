import { CircleIcon } from "@radix-ui/react-icons"
import { useEffect, useState } from "react"
import { api_base_url } from "@/lib/utils"
import { OrderTable } from "./dataTable/page"
import { Orders } from "./dataTable/columns"

export const OrdersPage = () => {
    const [ orders, setOrders ] = useState<Orders[]>()
    const [ loading, setLoading ] = useState<boolean>(true)

    useEffect(() => {
        const getOrders = async() => {
            const res = await fetch(`${api_base_url}/order`)
            const resJson = await res.json()
            setOrders(resJson.orders)
            setLoading(false)
        }
        getOrders()
    }, [])

    return(
        <div className="h-full">
            {
                loading && (
                    <CircleIcon className="h-4 w-4 animate-spin" />
                )
            }
            {
                orders && (
                    <OrderTable data={orders} />
                )
            }
        </div>
    )
}