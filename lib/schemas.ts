import { z } from "zod";

// The full task: used for storing and displaying tasks
export const TaskSchema = z.object({
  id: z.number(),
  title: z.string().min(1, "Title is required"),
  done: z.boolean(),
  dueDate: z.string().optional(),
  status: z.enum(["open", "doing", "done"]),
});
export type Task = z.infer<typeof TaskSchema>;

// The form input: only what the user types, no id or done
export const CreateTaskSchema = TaskSchema.omit({ id: true, done: true });
export type CreateTaskInput = z.infer<typeof CreateTaskSchema>;