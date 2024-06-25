import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table"
import { Pencil2Icon, TrashIcon } from "@radix-ui/react-icons"
import { useNavigate } from "react-router-dom"

type Props = {
    foodArray: [{
        name: string,
        price: number,
        _id: string
    }]
}

export const FoodItemTable = ({ foodArray }: Props) => {
    const navigate = useNavigate()
    return(
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Item name</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead className="hidden md:table-cell">Edit</TableHead>
                    <TableHead className="hidden md:table-cell">Delete</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {
                    foodArray.map((foodItem, index) => (
                        <TableRow key={index} className="cursor-pointer md:cursor-default" onClick={() => navigate(`edit/${foodItem._id}`)}>
                            <TableCell>{foodItem.name}</TableCell>
                            <TableCell>{parseFloat((foodItem.price / 100).toFixed(2))}</TableCell>
                            <TableCell className="hidden md:table-cell cursor-pointer">
                                <Pencil2Icon />
                            </TableCell>
                            <TableCell className="hidden md:table-cell cursor-pointer">
                                <TrashIcon />
                            </TableCell>
                        </TableRow>
                    ))
                }
            </TableBody>
        </Table>
    )
}