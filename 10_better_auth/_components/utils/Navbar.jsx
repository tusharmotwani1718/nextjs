'use client';
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { redirect, useRouter } from "next/navigation";
import { authClient } from "@/lib/better-auth/auth-client.js";
import { useState } from "react";

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
    }

]

export default function Navbar() {

    const router = useRouter();

    const [isLoading, setIsLoading] = useState(false);

    const {
        data: session,
        isPending, //loading state
        error, //error object
        refetch //refetch the session
    } = authClient.useSession();

    const extraItems = !isPending && session ? ([
        {
            id: 4,
            title: "Dashboard",
            href: "/dashboard"
        }
    ]) : ([]);


    return (
        <nav className="flex items-center p-3 transition-colors duration-300 justify-between">
            <div className="flex items-center gap-5">
                {
                    navItems.map((item) => (
                        <Link key={item.id} href={item.href}>{item.title}</Link>
                    ))
                }
                {
                    extraItems.length > 0 && (
                        extraItems.map((item) => (
                            <Link key={item.id} href={item.href}>{item.title}</Link>
                        ))
                    )
                }
            </div>

            <div className="flex items-center gap-4">
                {
                    !isPending && !session && (
                        <>
                            <Button onClick={() => {
                                redirect("/auth/signup")
                            }}>Signup</Button>

                            <Button variant="outline" onClick={() => {
                                redirect("/auth/login")
                            }}>Login</Button>
                        </>
                    )

                }




                {
                    !isPending && session && (
                        <Button variant="outline" disabled = {isLoading} onClick={() => {
                            setIsLoading(true);
                            authClient.signOut({
                                fetchOptions: {
                                    onSuccess: () => {
                                        router.push("/auth/login"); // redirect to login page
                                        setIsLoading(false);
                                    },
                                    onerror: () => {
                                        console.error("error logging out...");
                                        setIsLoading(false);
                                    }
                                },
                            });
                        }}>{isLoading ? "Logging Out..." : "Log out"}</Button>
                    )
                }

            </div>
        </nav>
    )
}