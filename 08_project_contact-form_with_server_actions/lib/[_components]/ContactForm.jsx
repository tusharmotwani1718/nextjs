'use client';

import React, { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Button } from "@/components/ui/button"
import { createContact } from '../../server-actions/create-contact'
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { CheckCircle2Icon, CrossIcon } from "lucide-react"
import Link from 'next/link';






function ContactForm() {

    const [isSendingMessage, setIsSendingMessage] = useState(false);
    const [message, setMessage] = useState(null);

    async function onSubmit(formData) {
        try {
            setIsSendingMessage(true);
            const submit = await createContact(formData);
            if (!submit.success) {
                setMessage({
                    type: 'error',
                    message: submit.message
                })
                return;
            }
            setMessage({
                type: 'success',
                message: submit.message
            })
            document.getElementById('contact-form').reset();
        } catch (error) {
            console.error(error);
            setMessage({
                type: 'error',
                message: error.message
            })
        } finally {
            setIsSendingMessage(false);
        }
    }

    return (
        <div className='min-h-screen flex flex-col items-center justify-center gap-6'>
            <h2 className="scroll-m-20 text-4xl font-extrabold tracking-tight text-balance">Contact Us</h2>

            <form action={onSubmit} id='contact-form' className='space-y-6 w-sm'>
                {
                    message && (
                        <Alert>
                            {message.type == 'success' ? (<CheckCircle2Icon />) : (<CrossIcon />)}
                            <AlertTitle>{JSON.stringify(message.message)}</AlertTitle>
                        </Alert>
                    )
                }
                <div className="flex flex-col gap-6">
                    <div className="grid gap-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            suppressHydrationWarning
                            id="email"
                            type="email"
                            name="email"
                            placeholder="m@example.com"
                            required
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="title">Subject</Label>
                        <Input
                            suppressHydrationWarning
                            id="title"
                            type="text"
                            name="title"
                            placeholder="Enquiring for..."
                            required
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="message">Message</Label>
                        <Textarea
                            suppressHydrationWarning
                            id="message"
                            name="message"
                        />
                    </div>
                    <Button suppressHydrationWarning type="submit" className="w-full" disabled={isSendingMessage}>
                        {isSendingMessage ? 'Sending...' : 'Send'}
                    </Button>

                </div>
                <Button suppressHydrationWarning variant='outline'><Link href={'/contacts'}>See List</Link></Button>
            </form>

        </div>
    )
}

export default ContactForm;