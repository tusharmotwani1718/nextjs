"use server";
import { Todo } from "../models/todo.model.js";


async function createTodoAction(data) {
    const todo = await Todo.create(data);
    if(!todo) {
        throw new Error('error creating todo...');
    }

    return {
        success: true,
        message: 'Todo created successfully!',
        data: JSON.stringify(todo)
    }
}


export {
    createTodoAction
}