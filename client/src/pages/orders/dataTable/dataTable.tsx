import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { AddPayment } from "@/pages/payments/addPayment";
import { ColumnDef, flexRender, getCoreRowModel, getPaginationRowModel, useReactTable, ColumnFiltersState, getFilteredRowModel, SortingState, getSortedRowModel, VisibilityState } from "@tanstack/react-table";
import { Input } from "@/components/ui/input"
import { useState } from "react";
import { PlusIcon } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Link } from "react-router-dom";
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger,} from "@/components/ui/dropdown-menu"

interface DataTableProps<TData, TValue>{
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
}

export function DataTable<TData, TValue>({ columns, data }: DataTableProps<TData, TValue>){
    const [ sorting, setSorting ] = useState<SortingState>([])
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
    const [ columnVisibility, setColumnVisibility ] = useState<VisibilityState>({})
    const table = useReactTable({
        columns,
        data,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onSortingChange: setSorting,
        getSortedRowModel: getSortedRowModel(),
        onColumnFiltersChange: setColumnFilters,
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        state: {
            sorting,
            columnFilters,
            columnVisibility
        }
    })
    return(
        <div>
            <div className="py-4 space-y-6">
                <div className="flex items-center py-4 gap-6">
                    <Input
                    placeholder="Filter customers..."
                    value={(table.getColumn("customerName")?.getFilterValue() as string) ?? ""}
                    onChange={(event) =>
                        table.getColumn("customerName")?.setFilterValue(event.target.value)
                    }
                    className="max-w-full"
                    />
                    <Button className="hidden md:inline-block" asChild>
                        <Link to="add">Add Order</Link>
                    </Button>
                    <Button className="md:hidden" asChild>
                        <Link to="add">
                            <PlusIcon className="h-4 w-4"/></Link>
                    </Button>
                </div>
                <div className="flex items-center py-4 gap-6">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" className="ml-auto">
                            Columns
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            {table
                            .getAllColumns()
                            .filter(
                                (column) => column.getCanHide()
                            )
                            .map((column) => {
                                return (
                                <DropdownMenuCheckboxItem
                                    key={column.id}
                                    className="capitalize"
                                    checked={column.getIsVisible()}
                                    onCheckedChange={(value) =>
                                    column.toggleVisibility(!!value)
                                    }
                                >
                                    {column.id}
                                </DropdownMenuCheckboxItem>
                            )
                            })}
                        </DropdownMenuContent>
                </DropdownMenu>
                    <div>
                        <Select onValueChange={(event) => table.getColumn("paymentStatus")?.setFilterValue(event)}>
                            <SelectTrigger>
                                <SelectValue placeholder="Filter by:" />
                            </SelectTrigger>
                            <SelectContent>
                            <SelectItem value="Pending">Status: Pending</SelectItem>
                            <SelectItem value="Paid">Status: Paid</SelectItem>
                            <SelectItem value="Partial">Status: Partial</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
            </div>
            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id}>
                                            {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                                        </TableHead>
                                    )
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {
                            table.getRowModel().rows?.length ? (
                                table.getRowModel().rows.map((row) => (
                                <Dialog>
                                        <DialogTrigger asChild key={row.id}>
                                            <TableRow
                                            key={row.id}
                                            data-state={row.getIsSelected() && "selected"}
                                            className="cursor-pointer"
                                        >
                                            {row.getVisibleCells().map((cell) => (
                                            <TableCell key={cell.id}>
                                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                            </TableCell>
                                            ))}
                                        </TableRow>
                                    </DialogTrigger>
                                    <DialogContent>
                                        <DialogHeader>
                                            <DialogTitle>Add the amount paid by customer</DialogTitle>
                                            {/* @ts-ignore */}
                                            <DialogDescription>Due amount is {row.original.dueAmount / 100}</DialogDescription>
                                        </DialogHeader>
                                        {/* @ts-ignore */}
                                        <AddPayment id={row.original._id} due={row.original.dueAmount} />
                                    </DialogContent>
                                </Dialog>
                                ))
                            ) : (
                                <TableRow>
                                <TableCell colSpan={columns.length} className="h-24 text-center">
                                    No results.
                                </TableCell>
                                </TableRow>
                            )
                        }
                    </TableBody>
                </Table>
            </div>
            <div className="flex items-center justify-end space-x-2 py-4">
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => table.previousPage()}
                    disabled={!table.getCanPreviousPage()}
                >
                Previous
                </Button>
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => table.nextPage()}
                    disabled={!table.getCanNextPage()}
                >
                    Next
                </Button>
            </div>
        </div>
    )
}