import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { AddExpenseForm } from "@/forms/addExpensesForm"

export const AddExpensesPage = () => {
    return(
        <div className="h-full">
        <Card className="w-full max-w-[500px] mx-auto mt-20">
         <CardHeader>
             <CardTitle>New order</CardTitle>
             <CardDescription>Add new order here</CardDescription>
         </CardHeader>
         <CardContent>
             <AddExpenseForm />
         </CardContent>
        </Card>
     </div>
    )
}