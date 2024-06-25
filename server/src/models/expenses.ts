import mongoose from "mongoose";

const expenseSchema = new mongoose.Schema({
    items: [{ type: String, required: true }],
    totalAmount: { type: Number, required: true },
    expenseDate: { type: Date, required: true }
})

export const Expense = mongoose.model("Expense", expenseSchema)