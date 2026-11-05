"use client";
import { useEffect, useState } from "react";
import type { Task,CreateTaskInput } from "@/lib/schemas";
import TaskList from "./TaskList";
import NewTaskForm from "./NewTaskForm";
import FilterBar from "./FilterBar";

export default function TaskBoard({ initialTasks }: { initialTasks: Task[] }) { 
    const [tasks, setTasks] = useState<Task[]>(initialTasks); 
    const [filter, setFilter] = useState<"all" | "done" | "open">("all");
    const [status, setStatus] = useState<
    "loading" | "success" | "empty" | "error"
  >("loading");

 if (tasks.length === 0) { 
    return <p>No tasks yet. Add your first one below.</p>;}

  function handleAddTask(data: CreateTaskInput) {
    console.log("adding", data);
  setTasks([ 
    ...tasks,
    {
      id: Date.now(),
      title: data.title,
      dueDate: data.dueDate,
      done: data.status === "done",
      status: data.status,
    },
  ]);
  setStatus("success");
}

 function handleToggleTask(id: number) {
    setTasks(
      tasks.map((task) =>
        task.id === id
          ? { ...task, done: !task.done, status: task.done ? "open" : "done" }
          : task
      )
    );
  }

  return (
    <div>
      <NewTaskForm onAddTask={handleAddTask} />
      {tasks.length === 0 ? (
        <p>No tasks yet. Add your first one below.</p>
      ) : (
        <>
          <FilterBar filter={filter} onFilterChange={setFilter} />
          <TaskList
            tasks={tasks}
            filter={filter}
            onToggleTask={handleToggleTask}
          />
        </>
      )}
    </div>
  );
}