import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { api_base_url } from "@/lib/utils"

export function AddPayment({ id, due }: { id: string, due: number }) {
  const FormSchema = z.object({
    amountPaid: z.coerce.number({
      invalid_type_error: "Enter a valid number",
      required_error: "Required"
    }).min(1, {
      message: "Enter valid amount"
    }).max(due / 100, {
      message: "Can't pay more than due"
    }),
    mode: z.enum(["Cash", "Online"])
  })
  
  const [ isAddingPayment, setIsAddingPayment ] = useState(false)

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  })

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    setIsAddingPayment(true)
    await fetch(`${api_base_url}/payment/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    }) 
    setIsAddingPayment(false)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
        <FormField control={form.control} name="amountPaid" render={({ field }) => (
          <FormItem>
            <FormLabel>Amount paid</FormLabel>
            <FormControl>
              <Input {...field} placeholder="Enter the amount" />
            </FormControl>
          </FormItem>
        )} />
        <FormField
          control={form.control}
          name="mode"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Mode</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select mode" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Cash">Cash</SelectItem>
                  <SelectItem value="Online">Online</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isAddingPayment}>
          {isAddingPayment ? (
            "Adding..."
          ): (
            "Add payment"
          )}
        </Button>
      </form>
    </Form>
  )
}
