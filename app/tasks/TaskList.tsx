import type { Task } from "@/lib/schemas";
import type { Filter } from "./FilterBar";
import TaskCard from "./TaskCard";

type TaskListProps = {
  tasks: Task[];
  filter: Filter;
  onToggleTask: (id: number) => void;
};
function TaskList({ tasks, filter, onToggleTask }: TaskListProps) {
     const visibleTasks = tasks.filter((task) =>
    filter === "all" ? true : filter === "done" ? task.done : !task.done
  );

  if (visibleTasks.length === 0) {
    return <p>No tasks match this filter.</p>;
  }

 return (
 <div>
 {visibleTasks.map((task) => (
 <TaskCard 
    key={task.id} 
    id={task.id} 
    title={task.title} 
    done={task.done} 
    dueDate={task.dueDate} 
    onToggle={onToggleTask}  />
 ))}
 </div>
 );
}
export default TaskList; 
