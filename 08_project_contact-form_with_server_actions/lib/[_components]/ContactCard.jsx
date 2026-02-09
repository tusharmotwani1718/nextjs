'use client';
import React from 'react'
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { updateContactStatus } from '../../server-actions/update-contact-status'
import { useTransition } from 'react';


function ContactCard({
    contact
}) {
    const [isPending, startTransition] = useTransition();

    function handleToggleStatus(newStatus) {
        startTransition(async () => {
            await updateContactStatus(contact._id, newStatus);
        });
    }

    return (
        <Card size="sm" className={`w-full max-w-sm ${contact.isRead ? "bg-green-800" : ""}
`}>
            <CardHeader>
                <CardTitle>{contact.title}</CardTitle>
                <CardDescription>
                    {contact.message ? contact.message : "No Description"}
                </CardDescription>
            </CardHeader>
            <CardContent>
                <p>
                    {contact.isRead ? 'Read' : 'Unread'}
                </p>
            </CardContent>
            <CardFooter>
                <Button
                    variant="outline"
                    size="sm"
                    className="w-full"
                    onClick={() => handleToggleStatus(!contact.isRead)}
                    disabled={isPending}
                >
                    {isPending ? "Updating..." : "Change"}
                </Button>
            </CardFooter>
        </Card>
    )
}

export default ContactCard