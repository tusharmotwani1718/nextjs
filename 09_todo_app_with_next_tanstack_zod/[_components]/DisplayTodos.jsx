"use client";
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
import { useQuery } from '@tanstack/react-query';
import { Todo } from '../models/todo.model';




function DisplayTodos() {

   
    const fetchTodos = async () => {
        const todos = await Todo.find().lean();

        if(!todos) {
            throw new Error(`Error fetching todos...`);
        }

        return todos;
    }

    const {} = useQuery({
        
    })

    return (
        <div className='my-12 p-8 flex bg-red-400 w-7xl mx-auto flex-wrap'>
            <Card size="sm" className="mx-auto w-sm">
                <CardHeader>
                    <CardTitle>Small Card</CardTitle>
                    <CardDescription>
                        This card uses the small size variant.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <p>
                        The card component supports a size prop that can be set to
                        &quot;sm&quot; for a more compact appearance.
                    </p>
                </CardContent>
                <CardFooter>
                    <Button variant="outline" size="sm" className="w-full">
                        Action
                    </Button>
                </CardFooter>
            </Card>
        </div>
    )
}

export default DisplayTodos