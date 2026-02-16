import z from "zod";


// <-------------------VALIDATORS-------------------->
// 1. Add todo:
const addTodoValidator = z.object({
  title: z.string().min(1).max(50),
  description: z
    .string()
    .min(15, "Description should be at-least 15 chars long")
    .max(200)
    .optional(),
  priority: z.enum(['low', 'medium', 'high']).default('medium').optional(),
});


const validateAddTodo = (data) => {
    const result = addTodoValidator.safeParse(data);
    console.log(result);
    return result;
}




export {
    validateAddTodo
}