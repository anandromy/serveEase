import express from "express"
import expenseController from "../controllers/expenseController"

export const expenseRoute = express.Router()

expenseRoute.get("/", expenseController.getExpenses)
expenseRoute.post("/", expenseController.addExpense)