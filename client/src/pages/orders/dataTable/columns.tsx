import { Button } from "@/components/ui/button"
import { CaretSortIcon } from "@radix-ui/react-icons"
import { ColumnDef } from "@tanstack/react-table"
import { format } from "date-fns"

export type Orders = {
    _id: string
    customerName: string
    orderItems: [{
        foodItemId: string,
        quantity: string,
        _id: string
    }],
    createdAt: Date,
    updatedAt: Date,
    amount: number,
    dueAmount: number,
    paymentStatus: "Pending" | "Paid" | "Partial"

}

export const columns: ColumnDef<Orders>[] = [
    {
        accessorKey: "customerName",
        header: "Name"
    },
    {
        accessorKey: "dueAmount",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc" )}
                >
                    Due
                    <CaretSortIcon className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => {
            const due: number = row.getValue("dueAmount")
            const dueInRupees = parseFloat((due / 100).toFixed(2))
            return <div className="text-left pl-4">{dueInRupees}</div>
        }
    },
    {
        accessorKey: "paymentStatus",
        header: "Status"
    },
    {
        accessorKey: "amount",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc" )}
                >
                    Order Amount
                    <CaretSortIcon className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => {
            const orderAmount: number = row.getValue("amount")
            const orderInRupees = parseFloat((orderAmount / 100).toFixed(2))
            return <div className="pl-4">{orderInRupees}</div>
        }
    },
    {
        accessorKey: "createdAt",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc" )}
                    className="text-right"
                >
                    Order Date
                    <CaretSortIcon className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => {
            const date: any = row.getValue("createdAt")
            const orderDate = format(date, "PPP")
            return <div className="pl-4">{orderDate}</div>
        }
    }
]