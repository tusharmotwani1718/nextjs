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
import { useTodos } from '../hooks/useTodo';
import TodoSkeletonCard from './utils/TodoCardSkeleton';
import { Trash } from 'lucide-react';
import { updateStatusAction } from '../server_actions/todos.actions';
import { toast } from 'sonner';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Badge } from '@/components/ui/badge';

function TodoCard({
    title,
    description,
    priority,
    isCompleted,
    id
}) {

    const queryClient = useQueryClient();

    // const handleDelete = async (id, newStatus) => {
    //     const delete = await 
    // }   


    const handleToggle = async ({ id, newStatus }) => {
        const update = await updateStatusAction(id, newStatus);

        if (!update.success) {
            throw new Error(update.message);
        }

        return { id, newStatus };
    };


    const updateMutation = useMutation({
        retry: false,
        mutationFn: handleToggle,
        onMutate: async ({ id, newStatus }) => {
            await queryClient.cancelQueries(['todos']);

            const previousTodos = queryClient.getQueryData(["todos"]);

            queryClient.setQueryData(["todos"], (old = []) =>
                old.map(todo =>
                    todo._id === id
                        ? { ...todo, isCompleted: newStatus }
                        : todo
                )
            );

            return { previousTodos };
        },
        onError: (error, _vars, context) => {
            if (context?.previousTodos) {
                queryClient.setQueryData(["todos"], context.previousTodos);
            }

            toast.error(error?.message ?? 'Error updating todo');
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ["todos"] });
        },
        onSuccess: () => {
            toast.success("Todo updated successfully!");
        }
    })

    return (
        <Card size="sm" className="mx-auto w-sm relative">
            <CardHeader>
                <CardTitle>{title}</CardTitle>
                <Badge
                className={`${isCompleted ? "bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-300" : "bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-300"}`}
                >{isCompleted ? "Completed" : "Not Completed"}</Badge>
                {
                    description && (
                        <CardDescription>
                            {description}
                        </CardDescription>
                    )
                }
                <Button variant="outline" size="icon" className="absolute top-3 right-3">
                    <Trash />
                </Button>
            </CardHeader>
            <CardContent>
                <p>
                    {priority}
                </p>
            </CardContent>
            <CardFooter>
                <Button variant="outline" size="sm" className="w-full"
                onClick={() => {
                    updateMutation.mutate({
                        id,
                        newStatus: !isCompleted,
                    });
                }}
                >
                    Mark as {isCompleted ? "not-completed" : "completed"}
                </Button>
            </CardFooter>
        </Card>
    )
}



function DisplayTodos() {

    const { data: todos, isLoading, isError } = useTodos();



    // console.log(todos)

    if (isLoading) {
        return (
            <div className="my-12 p-8 flex flex-wrap gap-4 w-7xl mx-auto">
                {Array.from({ length: 6 }).map((_, i) => (
                    <TodoSkeletonCard key={i} />
                ))}
            </div>
        );
    }


    if (isError) return <p>Error loading todos</p>;

    return (
        <div className='my-12 p-8 flex w-7xl mx-auto gap-4 flex-wrap justify-center conatiner'>
            {
                !isLoading && todos && todos.length > 0 ? (
                    todos.map((todo) => (
                        <TodoCard key={todo._id} id={todo._id} title={todo.title} description={todo.description} priority={todo.priority} isCompleted={todo.isCompleted} />
                    ))
                ) : (
                    <p>No Todos Available</p>
                )
            }
        </div>
    )
}

export default DisplayTodos