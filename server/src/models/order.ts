import mongoose, { Schema } from "mongoose";

const orderSchema = new mongoose.Schema({
    customerName: { type: String, required: true },
    createdAt: { type: Date },
    updatedAt: { type: Date, required: true, default: Date.now },
    paymentStatus: { type: String, enum: ["Pending", "Paid", "Partial"], required: true },
    amount: { type: Number },
    dueAmount: { type: Number, required: true },
    payments: [{ type: Schema.Types.ObjectId, ref: "Payment" }],
    orderItems: [{
        foodItemId: { type: Schema.Types.ObjectId, required: true, ref: "Food" },
        quantity: { type: Number, required: true }
    }]
})

export const Order = mongoose.model('Order', orderSchema)