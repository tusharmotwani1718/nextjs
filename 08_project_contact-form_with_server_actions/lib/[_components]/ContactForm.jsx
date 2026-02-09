import React from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Field } from '@/components/ui/field'
import { Textarea } from '@/components/ui/textarea'
import { Button } from "@/components/ui/button"

import Form from 'next/form';

export function CardDemo() {
    return (
        <Card className="w-full max-w-sm">
            <CardHeader>
                <CardTitle>Login to your account</CardTitle>
                <CardDescription>
                    Enter your email below to login to your account
                </CardDescription>
                <CardAction>
                    <Button variant="link">Sign Up</Button>
                </CardAction>
            </CardHeader>
            <CardContent>

            </CardContent>
            <CardFooter className="flex-col gap-2">
                <Button type="submit" className="w-full">
                    Login
                </Button>
                <Button variant="outline" className="w-full">
                    Login with Google
                </Button>
            </CardFooter>
        </Card>
    )
}




function ContactForm() {
    return (
        <div className='min-h-screen flex flex-col items-center justify-center gap-6'>
            <h2 className="scroll-m-20 text-4xl font-extrabold tracking-tight text-balance">Contact Us</h2>
            <Form action={'https://www.google.com'} className='space-y-6 w-sm'>
                <div className="flex flex-col gap-6">
                    <div className="grid gap-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            type="email"
                            name="email"
                            placeholder="m@example.com"
                            // required
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="title">Subject</Label>
                        <Input
                            id="title"
                            type="text"
                            name="title"
                            placeholder="Enquiring for..."
                            // required
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="message">Message</Label>
                        <Textarea
                            id="message"
                            name="message"
                        />
                    </div>
                    <Button type="" className="w-full">
                        Send
                    </Button>
                </div>
            </Form>

        </div>
    )
}

export default ContactForm;