import express from "express"
import paymentController from "../controllers/paymentController"

export const paymentRoute = express.Router()

paymentRoute.post("/:orderId", paymentController.addPayment)