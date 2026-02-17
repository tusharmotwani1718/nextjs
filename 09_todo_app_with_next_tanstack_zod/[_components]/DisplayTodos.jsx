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

function TodoCard({
    title,
    description,
    priority,
    isCompleted
}) {
    return (
        <Card size="sm" className="mx-auto w-sm">
            <CardHeader>
                <CardTitle>{title}</CardTitle>
                {
                    description && (
                        <CardDescription>
                            {description}
                        </CardDescription>
                    )
                }
            </CardHeader>
            <CardContent>
                <p>
                    {priority}
                </p>
            </CardContent>
            <CardFooter>
                <Button variant="outline" size="sm" className="w-full">
                    Mark as {"completed" ? !isCompleted : "not-completed"}
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
                        <TodoCard key={todo._id} title={todo.title} description={todo.description} priority={todo.priority} isCompleted={todo.isCompleted} />
                    ))
                ) : (
                    <p>No Todos Available</p>
                )
            }
        </div>
    )
}

export default DisplayTodos