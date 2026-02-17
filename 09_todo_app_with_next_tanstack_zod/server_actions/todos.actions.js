"use server";

import { addTodoValidator, deleteTodoValidator, updateTodoValidator } from "../validators/notes.validators.js";
import { Todo } from "../models/todo.model";

async function createTodoAction(rawData) {
  try {
    // 1️⃣ Validate incoming data
    const parsed = addTodoValidator.safeParse(rawData);

    if (!parsed.success) {
      return {
        success: false,
        message: "Validation failed",
        errors: parsed.error.flatten().fieldErrors,
      };
    }

    // 2️⃣ Use validated & transformed data
    const todo = await Todo.create(parsed.data);

    return {
      success: true,
      message: "Todo created successfully!",
      data: JSON.parse(JSON.stringify(todo)), // important
    };
  } catch (error) {
    return {
      success: false,
      message: "There was some error creating the todo.",
    };
  }
}


async function fetchTodosAction() {
  try {
    const todos = await Todo.find().sort({ createdAt: -1 }).lean();

    return {
      success: true,
      data: JSON.parse(JSON.stringify(todos)),
    };
  } catch {
    return {
      success: false,
      message: "Failed to fetch todos",
    };
  }
}

async function updateStatusAction(todoId, newStatus) {
  try {

    const parsed = updateTodoValidator.safeParse({ todoId, newStatus });

    if (!parsed.success) {
      return {
        success: false,
        message: "Validation failed",
        errors: parsed.error.flatten().fieldErrors,
      };
    }

    const updated = await Todo.findByIdAndUpdate(todoId, {
      isCompleted: newStatus
    });

    if (!updated) {
      return {
        success: false,
        message: 'Error updating status'
      }
    }

    return {
      success: true,
      message: "Todo created successfully!",
      data: JSON.parse(JSON.stringify(updated)), // important
    };
  } catch (error) {
    return {
      success: false,
      message: "Failed to update todo",
    };
  }
}


async function deleteStatusAction(todoId) {
  try {
    const parsed = deleteTodoValidator.safeParse({ todoId });


    if (!parsed.success) {
      // console.log(errors);

      return {
        success: false,
        message: "Error validating todo",
        errors: parsed.error.flatten().fieldErrors,
      }
    }


    const todo = await Todo.findByIdAndDelete(todoId);

    return {
      success: true,
      message: 'Todo deleted successfully!'
    }
  } catch (error) {
    return {
      success: false,
      message: 'Error deleting todo'
    }
  }
}

export {
  fetchTodosAction,
  createTodoAction,
  updateStatusAction,
  deleteStatusAction
}