'use client';
import { addTodoValidator } from "../validators/notes.validators.js";
import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react";
import { CircleX } from "lucide-react";
import { Textarea } from "@/components/ui/textarea.jsx";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useForm, Controller } from "react-hook-form"
import { createTodoAction } from "../server_actions/todos.actions.js";
import { toast } from "sonner"
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";




export default function AddTodoForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
    setError
  } = useForm({
    resolver: zodResolver(addTodoValidator),
    defaultValues: {
      priority: "medium",
      description: undefined
    }
  });

  const [isFormOpen, setIsFormOpen] = useState(false);
  const queryClient = useQueryClient();

  const handleAddTodo = async (data) => {
    const response = await createTodoAction(data);

    if (!response.success) {
      // 1️⃣ Field-level errors (Zod)
      if (response.errors) {
        Object.entries(response.errors).forEach(([field, messages]) => {
          setError(field, {
            type: "server",
            message: messages[0], // show first error
          });
        });
      }

      // 2️⃣ Optional global error
      if (response.message) {
        toast.error(response.message);
      }

      throw new Error("Server validation failed");
    }

    return response.data;
  };


  const { mutate: addTodoMutate, isPending, error, isError } = useMutation({
    mutationFn: handleAddTodo,
    onSuccess: (addedTodo) => {
      queryClient.setQueryData(['todos'], (old = []) => [
        addedTodo,
        ...old,
      ]);

      toast.success("Note created successfully!");
      reset();
      setIsFormOpen(false);
    },
    onError: (error) => {
      toast.error(error?.message ?? "Error creating todo...");
    }
  });

  if(error || isError) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        {JSON.stringify(error)}
      </div>
    )
  }



  return (
    <div className="flex flex-col gap-5 justify-center items-center w-full">
      <Button disabled={isFormOpen} onClick={() => setIsFormOpen(true)}>Add New Todo</Button>
      {
        !!isFormOpen && (
          <Card className="w-full max-w-sm transition-colors duration-300">
            <CardHeader>
              <CardTitle>Create Todo</CardTitle>
              <CardDescription>
                Fill the details below to add a new todo.
              </CardDescription>
              <CardAction>
                <Button variant="outline" size="icon" onClick={() => {
                  setIsFormOpen(false)
                }}>
                  <CircleX />
                </Button>
              </CardAction>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit(addTodoMutate)}>
                <div className="flex flex-col gap-6">
                  <div className="grid gap-2">
                    <Label htmlFor="title">Title</Label>
                    <Input
                      id="title"
                      type="text"
                      placeholder="New Todo"
                      {...register("title")}
                    />
                    {errors.title && (
                      <p className="text-sm text-red-500">
                        {errors.title.message}
                      </p>
                    )}
                  </div>
                  <div className="grid gap-2">
                    <div className="flex items-center">
                      <Label htmlFor="description">Description</Label>
                    </div>
                    <Textarea id="description" placeholder="Type your message here" {...register("description")} />
                    {errors.description && (
                      <p className="text-sm text-red-500">
                        {errors.description.message}
                      </p>
                    )}
                  </div>
                  <div className="grid gap-2">
                    <div className="flex items-center">
                      <Label htmlFor="priority">Select Priority</Label>
                    </div>
                    <Controller
                      name="priority"
                      control={control}
                      render={({ field }) => (
                        <Select onValueChange={field.onChange} value={field.value}>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Priority" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="low">Low</SelectItem>
                            <SelectItem value="medium">Medium</SelectItem>
                            <SelectItem value="high">High</SelectItem>
                          </SelectContent>
                        </Select>
                      )}
                    />
                  </div>
                </div>

                <div className="mt-4 flex flex-col gap-2">
                  <Button type="submit" className="w-full">
                    {isPending ? "Creating Todo..." : "Create Todo"}
                  </Button>
                  <Button variant="outline" className="w-full">
                    Login with Google
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )
      }

    </div>
  )
}