import { Request, Response } from "express"
import { Order } from "../models/order"
import { paymentSchema } from "../models/payment"
import mongoose from "mongoose"
import { Food } from "../models/food"

export const Payment = mongoose.model("Payment", paymentSchema)

const getOrders = async (req: Request, res: Response) => {
    try {
        const filter = req.query.filter || ""
        // const orders = await Order.find({
        //     $or: [
        //         {
        //             customerName: {
        //                 $regex: filter,
        //                 $options: "i"
        //             },
        //             createdAt: {
        //                 $regex: filter,
        //                 $options: "i"
        //             },
        //             paymentStatus: {
        //                 $regex: filter,
        //                 $options: "i"
        //             },
        //             paymentDate: {
        //                 $regex: filter,
        //                 $options: "i"
        //             },
        //             paymentMode: {
        //                 $regex: filter,
        //                 $options: "i"
        //             }
        //         }
        //     ]
        // })
        const orders = await Order.find({}).populate('payments').exec()
        res.json({ orders })
    } catch (error) {
        console.log("error in getOrders controller", error)
        res.status(500).json({ message: "eerror while getting orders" })
    }
}

const createOrder = async (req: Request,  res: Response) => {
    try {
        const newOrder = new Order({
            customerName: req.body.customerName,
            amount: req.body.amount * 100,
            createdAt: new Date(),
            dueAmount: req.body.due * 100,
            paymentStatus: "Pending",
        })
        await newOrder.save()
        req.body.items.forEach(async (item: any) => {
            const food = await Food.findById(item.foodItemId)
            food?.orders.push({
                orderId: newOrder._id,
                quantity: item.quantity,
                orderedAt: new Date()
            })
            await food?.save()
        })
        return res.status(201).json({ message: "order created successfully" })
    } catch (error) {
        console.log("error in add order controller", error)
        res.status(500).json({ message: "error while creating order" })
    }
}

const getOrder = async (req: Request, res: Response) => {
    try {
        const order = await Order.findById(req.params.id)
        if(!order){
            return res.status(404).json({ message: "no such order found" })
        }
        return res.json(order)
    } catch (error) {
        console.log("error in getOrder controller")
        res.status(500).json({ message: "error occured while fetching order" })
    }
}

export default {
    getOrders,
    createOrder,
    getOrder
}

