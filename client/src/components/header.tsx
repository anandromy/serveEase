import { Link, NavLink } from "react-router-dom"
import { Button } from "./ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu"
import { AvatarIcon } from "@radix-ui/react-icons"

export const Header = () => {
    return(
        <header className="py-3 border-b">
            <div className="px-2 md:px-6 flex items-center justify-between">
                <Link to="/" className="text-xl font-medium">serveEase</Link>
                <DropdownMenu>
                    <DropdownMenuTrigger className="md:hidden">
                        <AvatarIcon className="h-7 w-7" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuLabel>My Account</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                            <NavLink to="/expenses" className={({ isActive}) => isActive ? "bg-muted rounded w-full p-2 transition duration-300": "hover:bg-muted rounded w-full p-2 transition duration-300"}>Expenses</NavLink>
                        </DropdownMenuItem>
                        {/* <DropdownMenuItem>
                            <NavLink to="/reports" className={({ isActive}) => isActive ? "bg-muted rounded w-full p-2 transition duration-300": "hover:bg-muted rounded w-full p-2 transition duration-300"}>Reports</NavLink>
                        </DropdownMenuItem> */}
                        <DropdownMenuItem className="p-4">Logout</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
                <Button className="hidden md:block">Logout</Button>
            </div>
        </header>
    )
}