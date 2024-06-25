import { Request, Response } from "express"
import { Food } from "../models/food"
import { Order } from "../models/order"

const getFoods = async (req: Request, res:Response) => {
    try {
        const foods = await Food.find({})
        res.json({ foods })
    } catch (error) {
        console.log("error in getFoods controller", error)
        res.status(500).json({ message: "error while fetching foods" })
    }
}

const getFood = async (req: Request, res: Response) => {
    try {
        const food = await Food.findById(req.params.id)
        res.json({ food })
    } catch (error) {
        console.log("error in get food by id controller", error)
        res.status(500).json({ message: "error while fetching food" })
    }
}

const addFood = async (req: Request, res: Response) => {
    try {
        const food = new Food({
            name: req.body.name,
            createdAt: new Date(),
            price: Number(req.body.price) * 100
        })
        await food.save()
        res.status(201).json({ food })
    } catch (error) {
        console.log("error in addFood controller", error)
        res.status(500).json({ message: "error while adding food" })
    }
}

const updateFood = async(req: Request, res: Response) => {
    try {
        const foodExists = await Food.findOne({
            _id: req.params.id
        })
        if(!foodExists){
            return res.status(404).json({ message: "This food item doesn't exists" })
        }
        foodExists.name = req.body.name
        foodExists.price = Number(req.body.price) * 100
        await foodExists.save()
        res.json({ foodExists })
    } catch (error) {
        console.log("error in update food controller", error)
        res.status(500).json({ message: "error while updating food item" })
    }
}

const deleteFood = async(req: Request, res: Response) => {
    try {
        const food = await Food.findById(req.params.id)
        if(!food){
            return res.status(404).json({ message: "No such food found" })
        }
        const pendingOrPartialOrders = food.orders.map(async (orderId) => {
            const arr = Order.find({
                $or: [
                    {
                        paymentStatus: "Pending"
                    },
                    {
                        dueAmount: { $gt: 0 }
                    }
                ]
            })
            return arr
        })
        if(pendingOrPartialOrders.length !== 0){
            return res.status(400).json({ message: "Can't delete as there are orders pending or partial "})
        }

        await Food.findByIdAndDelete(food._id)
        return res.json({ message: "deleted food item" })
        
    } catch (error) {
        console.log("error in deleteFood controller", error)
        res.status(500).json({ message: "error while deleting food" })
    }
}

export const reportFood = async (req: Request, res: Response) => {
    try {
        if(!req.body.from || !req.body.to){
            return res.status(404).json({ message: "from and to not sent" })
        }
        const { from, to } = req.body
        const cursor = await Food.aggregate([
            {
              '$unwind': '$orders'
            }, {
              '$match': {
                'orders.orderedAt': {
                  '$gte': from, 
                  '$lt': to
                }
              }
            }, {
              '$group': {
                '_id': '$name', 
                'totalQuantity': {
                  '$sum': '$orders.quantity'
                }, 
                'totalSalesAmount': {
                  '$sum': {
                    '$multiply': [
                      '$orders.quantity', '$price'
                    ]
                  }
                }
              }
            }
          ])
        res.json(cursor)
    } catch (error) {
        console.log("reportFood controller error", error)
        return res
    }
}

export default {
    getFoods,
    getFood,
    addFood,
    updateFood,
    deleteFood,
    reportFood
}