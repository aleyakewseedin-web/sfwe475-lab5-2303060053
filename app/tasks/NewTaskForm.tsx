import { useState } from "react";
import { CreateTaskSchema } from "@/lib/schemas";
import type { CreateTaskInput } from "@/lib/schemas";

function NewTaskForm({ onAddTask }: { onAddTask: (data: CreateTaskInput) => void }) {
  const [title, setTitle] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [status, setStatus] = useState("open");
  const [errors, setErrors] = useState<Record<string, string[]>>({}); 

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const result = CreateTaskSchema.safeParse({ title, dueDate, status });
if (!result.success) {
  console.log(result.error.issues);
}    if (!result.success) {
      setErrors(result.error.flatten().fieldErrors);
      return;
    }

    setErrors({});
    onAddTask(result.data);
    setTitle("");
    setDueDate("");
    setStatus("open");
  }
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="title">Title: </label>
        <input id="title" 
        value={title} 
        onChange={(e) => setTitle(e.target.value)}
        aria-invalid={!!errors.title}
        aria-describedby={errors.title ? "title-error" : undefined}
         />
        {errors.title && (
    <p id="title-error" style={{ color: "red" }}>
      {errors.title[0]}
    </p>
  )}
</div>
      <div>
        <label htmlFor="dueDate">Due Date: </label>
        <input id="dueDate" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
        {errors.dueDate && (
          <p id="dueDate-error" style={{ color: "red" }}>
            {errors.dueDate[0]}
          </p>
        )}
      </div>
      <div>
        <label htmlFor="status">Status: </label>
        <select id="status" value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="open">Open</option>
          <option value="doing">Doing</option>
          <option value="done">Done</option>
        </select>
      </div>
      <button type="submit">Add task</button>
    </form>
  );
}

export default NewTaskForm;
