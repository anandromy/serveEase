import mongoose from "mongoose";

export const paymentSchema = new mongoose.Schema({
    orderId: { type: String, required: true, ref: "Order" },
    amountPaid: { type: Number, required: true },
    paymentDate: { type: Date, required: true },
    paymentMode: { type: String, enum: ["Cash", "Online" ] }
})