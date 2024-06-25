import { Request, Response } from 'express'
import { Expense } from '../models/expenses'

const getExpenses = async(req: Request, res: Response) => {
    try {
        const expenses = await Expense.find({})
        res.status(200).json(expenses)
    } catch (error) {
        console.log("error in getExpenses controller", error)
        res.status(500).json({ message: "error occured while fetching expenses" })
    }
}

const addExpense = async(req: Request, res: Response) => {
    try {
        const expense = new Expense({
            expenseDate: new Date(),
            items: req.body.items,
            totalAmount: req.body.totalAmount * 100
        })
        await expense.save()
        res.status(201).json({ message: "Added expense" })
    } catch (error) {
        console.log("error in addExpense controller", error)
        res.status(500).json({ message: "error occured while adding expense" })
    }
}

export default {
    addExpense,
    getExpenses
}