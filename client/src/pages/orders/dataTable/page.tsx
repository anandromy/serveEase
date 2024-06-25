import { Orders, columns } from "./columns"
import { DataTable } from "./dataTable"

type Props = {
    data: Orders[]
}

export const OrderTable = ({ data }: Props) => {
    return(
        <div className="mx-auto">
            <DataTable columns={columns} data={data}></DataTable>
        </div>
    )
}