'use client';
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { redirect } from "next/navigation";

const navItems = [
    {
        id: 1,
        title: "Home",
        href: "/"
    },
    {
        id: 2,
        title: "About",
        href: "/about"
    },
    {
        id: 3,
        title: "Contact",
        href: "/contact"
    },
    {
        id: 4,
        title: "Dashboard",
        href: "/dashboard"
    }
]

export default function Navbar() {
    return (
        <nav className="flex items-center p-3 transition-colors duration-300 justify-between">
            <div className="flex items-center gap-5">
                {
                    navItems.map((item) => (
                        <Link key={item.id} href={item.href}>{item.title}</Link>
                    ))
                }
            </div>

            <div className="flex items-center gap-4">
                <Button onClick={() => {
                    redirect("/auth/signup")
                }}>Signup</Button>

                <Button variant="outline" onClick={() => {
                    redirect("/auth/login")
                }}>Login</Button>
            </div>
        </nav>
    )
}