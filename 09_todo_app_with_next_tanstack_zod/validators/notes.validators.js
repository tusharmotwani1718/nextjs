import z from "zod";


// <-------------------VALIDATORS-------------------->
// 1. Add todo:
const addTodoValidator = z.object({
  title: z.string().min(1, "Title should be minimum of 1 character").max(50),
  description: z
    .string()
    .min(15, "Description should be at-least 15 chars long")
    .max(200)
    .optional()
    .or(z.literal(""))
    .transform(val => (val === "" ? undefined : val)),
  priority: z.enum(['low', 'medium', 'high']).default('medium').optional(),
});


// 2. update todo: 
const updateTodoValidator = z.object({
  todoId: z.string(),
  newStatus: z.boolean()
})

// 3. delete todo:
const deleteTodoValidator = z.object({
  todoId: z.string()
})


export {
  addTodoValidator,
  updateTodoValidator,
  deleteTodoValidator
}