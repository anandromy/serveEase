import { Request, Response } from "express"
import { Order } from "../models/order"
import { Payment } from "../controllers/orderController"

const addPayment = async (req: Request, res: Response) => {
    try {
        const order = await Order.findById(req.params.orderId)
        if(!order){
            return res.json(404).json({ message: "no such order found" })
        }
        const payment = new Payment({
            orderId: order._id,
            paymentDate: new Date(),
            amountPaid: req.body.amountPaid * 100,
            paymentMode: req.body.mode
        })
        await payment.save()
        order.dueAmount -= (req.body.amountPaid * 100)
        order.payments.push(payment._id)
        await order.save()
        if(order.dueAmount === 0){
            order.paymentStatus = "Paid"
        }else if(order.dueAmount === order.amount){
            order.paymentStatus = "Pending"
        } else {
            order.paymentStatus = "Partial"
        }
        await order.save()
        return res.json({ message: "created new payment and updated order" })
    } catch (error) {
        console.log("error in addPayment", error)
        res.status(500).json({ message: "error in adding payment" })
    }
    
}

export default {
    addPayment
}