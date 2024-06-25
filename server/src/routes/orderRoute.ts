import express from 'express'
import orderController from '../controllers/orderController'
export const orderRoute = express.Router()

orderRoute.get("/", orderController.getOrders)
orderRoute.post("/", orderController.createOrder)
orderRoute.get("/:id", orderController.getOrder)