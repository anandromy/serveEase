import { NavLink } from "react-router-dom"

export const Navigation = () => {
    return(
        <div className="md:w-[200px] flex flex-row justify-evenly items-center gap-3 px-2 py-1 border-t md:flex-col md:justify-start md:items-start md:py-6 md:px-6 md:border-r">
            <NavLink to="/orders" className={({ isActive}) => isActive ? "bg-muted rounded w-full p-2 transition duration-300": "hover:bg-muted rounded w-full p-2 transition duration-300" }>Orders</NavLink>
            <NavLink to="/food_items" className={({ isActive}) => isActive ? "bg-muted rounded w-full p-2 transition duration-300": "hover:bg-muted rounded w-full p-2 transition duration-300" }>Food items</NavLink>
            <NavLink to="/expenses" className={({ isActive}) => isActive ? "hidden md:block bg-muted rounded w-full p-2 transition duration-300": "hidden md:block hover:bg-muted rounded w-full p-2 transition duration-300" }>Expenses</NavLink>
            {/* <NavLink to="/reports" className={({ isActive}) => isActive ? "hidden md:block bg-muted rounded w-full p-2 transition duration-300": "hidden md:block hover:bg-muted rounded w-full p-2 transition duration-300" }>Reports</NavLink> */}
        </div>
    )
}