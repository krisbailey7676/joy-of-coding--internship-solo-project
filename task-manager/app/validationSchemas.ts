import { z } from "zod";

// defines the shape of the object and body of API request
export const taskSchema = z.object({
    title: z.string().min(1).max(255),
    status: z.enum(["NEW", "IN_PROGRESS", "OVERDUE", "COMPLETE"]),
    dueDateTime: z.string(),
    description: z.string().min(1),
})