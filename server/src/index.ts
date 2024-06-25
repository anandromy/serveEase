import express from "express"
import cors from "cors"
import "dotenv/config"
import mongoose from "mongoose"
import { foodRoute } from "./routes/foodRoute"
import { orderRoute } from "./routes/orderRoute"
import { paymentRoute } from "./routes/paymentRoute"
import { expenseRoute } from "./routes/expenseRoute"

const PORT = Number(process.env.PORT)
const db_url = process.env.DATABASE_URL 

const app = express()
app.use(express.json())
app.use(cors())

app.use("/food", foodRoute)
app.use("/order", orderRoute)
app.use("/payment", paymentRoute)
app.use("/expense", expenseRoute)

mongoose.connect(db_url as string).then(() => {
    console.log("Database connected")
})

app.listen(PORT,  () => {
    console.log(`Servers started listening at port ${PORT}`)
})

