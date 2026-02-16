"use server";

import { addTodoValidator } from "../validators/notes.validators.js";
import { Todo } from "../models/todo.model";
import z from "zod";

export async function createTodoAction(rawData) {
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
