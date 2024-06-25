import { Route, Routes } from "react-router-dom"
import { Home } from "./home"
import { Layout } from "./layouts/layout"
import { FoodItems } from "./pages/foodItems/food_items"
import { AddFoodItem } from "./pages/foodItems/addFoodItem"
import { EditFoodItem } from "./pages/foodItems/editFoodItem"
import { OrdersPage } from "./pages/orders/orders"
import { AddOrderPage } from "./pages/orders/addOrderPage"
import { Expenses } from "./pages/expenses/expenses"
import { AddExpensesPage } from "./pages/expenses/addExpenses"

export const AppRoutes = () => {
    return(
        <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/food_items" element={<Layout><FoodItems /></Layout>}></Route>
            <Route path="/food_items/add" element={<Layout><AddFoodItem /></Layout>}></Route>
            <Route path="/food_items/edit/:id" element={<Layout><EditFoodItem /></Layout>}></Route>
            <Route path="/orders" element={<Layout><OrdersPage /></Layout>}></Route>
            <Route path="/orders/add" element={<Layout><AddOrderPage /></Layout>}></Route>
            <Route path="/expenses" element={<Layout><Expenses /></Layout>}></Route>
            <Route path="/expenses/add" element={<Layout><AddExpensesPage /></Layout>}></Route>
        </Routes>
    )
}