import { ExpenseTable } from "@/components/expenseTable"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { api_base_url } from "@/lib/utils"
import { PlusIcon } from "@radix-ui/react-icons"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

export interface Expenses {
    _id: string,
    items: string[],
    totalAmount: number,
    expenseDate: Date
}

export const Expenses = () => {
    const [ expenses, setExpenses ] = useState<Expenses[] | undefined>(undefined)

    useEffect(() => {
        const getExpenses = async() => {
            const res = await fetch(`${api_base_url}/expense`)
            const resData = await res.json()
            setExpenses(resData)
        }
        getExpenses()
    }, [])

    return(
        <div className="h-full">
            <div className="flex items-center justify-between gap-6">
                <div className="flex flex-1 gap-6 items-center">
                    <span className="hidden md:block text-muted-foreground font-medium text-xl text-nowrap">Expenses</span>
                    <Input type="email" placeholder="search for expense" />
                </div>
                <Button className="hidden md:block" asChild>
                    <Link to="add">Add Expense</Link>
                </Button>
                <Button className="md:hidden">
                    <Link to="add"><PlusIcon className="h-4 w-4" /></Link>
                </Button>
            </div>
            {
                expenses && 
                <ExpenseTable expenseArr={expenses} />
            }
        </div>
    )
}