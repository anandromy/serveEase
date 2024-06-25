import mongoose, { Schema } from "mongoose";

const foodSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    createdAt: { type: Date },
    updatedAt: { type: Date, required: true, default: Date.now },
    orders: [{ 
        orderId: { type: Schema.Types.ObjectId, ref: "Order" },
        quantity: { type: Number },
        orderedAt: { type: Date }
     }]
})

export const Food = mongoose.model('Food', foodSchema)

