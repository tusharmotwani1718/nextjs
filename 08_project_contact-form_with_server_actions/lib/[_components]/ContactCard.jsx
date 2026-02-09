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




function ContactCard({
    contact
}) {
    return (
        <Card size="sm" className="w-full max-w-sm">
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
                <Button variant="outline" size="sm" className="w-full">
                    Mark as read
                </Button>
            </CardFooter>
        </Card>
    )
}

export default ContactCard