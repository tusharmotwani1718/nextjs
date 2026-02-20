"use client";

import { Button } from "@/components/ui/button"
import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/better-auth/auth-client.js";
import { useForm, Controller } from "react-hook-form"
import { useState } from "react";



export default function Signup() {
    const router = useRouter();

    const [isLoading, setIsLoading] = useState(false);


    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        control,
        setError
    } = useForm();

    
    const onSubmit = async (inputData) => {
        const { data, error } = await authClient.signUp.email({
            name: inputData.name,
            email: inputData.email,
            password: inputData.password,
            phoneNumber: inputData.phoneNumber,
        }, {
            onRequest: (ctx) => {
                console.log("ctx ", ctx);
                setIsLoading(true)
            },
            onSuccess: (ctx) => {
                alert("Account created successfully");
                router.push("/dashboard");
            },
            onError: (ctx) => {
                 alert("Error creating account"); 
                 console.log("ctx ", ctx)  
            }
        })

        console.log("data: ", data);
    }

    return (
        <div className="min-h-[90vh] flex items-center justify-center">
            <Card className="w-full max-w-sm">
                <CardHeader>
                    <CardTitle>Signup to create new account</CardTitle>
                    <CardDescription>
                        Fill the details below to create a new account
                    </CardDescription>
                    <CardAction>
                        <Button variant="link" onClick={() => {
                            router.push("/auth/login")
                        }}>Login</Button>
                    </CardAction>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="flex flex-col gap-6">
                            <div className="grid gap-2">
                                <Label htmlFor="name">Name</Label>
                                <Input
                                    id="name"
                                    type="name"
                                    placeholder="Tushar Motwani"
                                    required
                                    {...register("name")}
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="me@example.com"
                                    required
                                    {...register("email")}
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="phoneNumber">Phone Number</Label>
                                <Input
                                    id="phoneNumber"
                                    type="tel"
                                    required
                                    {...register("phoneNumber")}
                                />
                            </div>
                            <div className="grid gap-2">
                                <div className="flex items-center">
                                    <Label htmlFor="password">Password</Label>
                                </div>
                                <Input id="password" type="password" required {...register("password")} />
                            </div>
                        </div>
                        <Button type="submit" className={`w-full mt-4`} disabled={isLoading}>
                            {isLoading ? "Signing up..." : "Sign Up"}
                        </Button>
                    </form>
                </CardContent>
                <CardFooter className="flex-col gap-2">
                    <Button variant="outline" className="w-full">
                        Signup with Google
                    </Button>
                </CardFooter>
            </Card>
        </div>
    )
}