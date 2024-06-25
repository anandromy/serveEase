import { Expenses } from "@/pages/expenses/expenses"
import { Table, TableHeader, TableRow, TableHead, TableCell, TableBody } from "./ui/table"

type Props = {
    expenseArr: Expenses[]
}
export const ExpenseTable = ({ expenseArr }: Props) => {
    return(
        <Table className="mt-4">
            <TableHeader>
                <TableRow>
                    <TableHead>Item name</TableHead>
                    <TableHead>Price</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {
                    expenseArr.map((item, index) => (
                        <TableRow key={index}>
                            <TableCell>
                                <Table>
                                    <TableBody>
                                        {
                                            item.items.map((item) => (
                                                <TableRow>
                                                    <TableCell>{item}</TableCell>
                                                </TableRow>
                                            ))
                                        }
                                    </TableBody>
                                </Table>
                            </TableCell>
                            <TableCell className="border-l">{item.totalAmount / 100}</TableCell>
                        </TableRow>
                    ))
                }
            </TableBody>
        </Table>
    )
}