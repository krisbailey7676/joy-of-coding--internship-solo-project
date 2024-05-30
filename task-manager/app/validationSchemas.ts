import { number, z } from "zod";

// defines the shape of the object and body of API request
export const createTaskSchema = z.object({
    title: z.string().min(1).max(255),
    dueDateTime: z.string(),
    description: z.string().min(1),
})

export const taskListSchema = z.object({
    id: z.number(),
    title: z.string(),
    description: z.string()
})