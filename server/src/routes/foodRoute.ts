import express from "express"
import foodController from "../controllers/foodController"
export const foodRoute = express.Router()

foodRoute.get("/all", foodController.getFoods)
foodRoute.get("/getFoodById/:id", foodController.getFood)
foodRoute.post("/addFood", foodController.addFood)
foodRoute.put("/updateFood/:id", foodController.updateFood)
foodRoute.post("/deleteFood/:id", foodController.deleteFood)
foodRoute.post("/report", foodController.reportFood)