import { useState, useEffect } from "react";
import API from "../services/api";
import TaskCard from "../components/TaskCard";
import TaskDialog from "../components/TaskDialog";
import Navbar from "../components/Navbar";
import { toast } from "sonner";

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load tasks on mount
  useEffect(() => {
    const load = async () => {
      try {
        const response = await API.get("/tasks");
        setTasks(response.data);
      } catch (error) {
        toast.error("Failed to fetch tasks");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const handleTaskCreate = async (payload) => {
    try {
      const response = await API.post("/tasks", payload);
      setTasks((prev) => [...prev, response.data]);
      toast.success("Task created successfully ✅");
    } catch (error) {
      toast.error("Failed to create task ❌");
    }
  };

  const handleTaskUpdate = async (updatedTask) => {
    try {
      const response = await API.put(`/tasks/${updatedTask.id}`, updatedTask);
      setTasks((prev) =>
        prev.map((task) => (task.id === updatedTask.id ? response.data : task))
      );
      toast.success("Task updated successfully ✅");
    } catch (error) {
      toast.error("Failed to update task ❌");
    }
  };

  const handleTaskToggle = async (taskId) => {
    try {
      const response = await API.patch(`/tasks/${taskId}/toggle`);
      setTasks((prev) =>
        prev.map((task) =>
          task.id === taskId
            ? { ...task, completed: response.data.completed }
            : task
        )
      );
    } catch (error) {
      toast.error("Failed to toggle task ❌");
    }
  };

  const handleTaskDelete = async (taskId) => {
    try {
      await API.delete(`/tasks/${taskId}`);
      setTasks((prev) => prev.filter((task) => task.id !== taskId));
      toast.success("Task deleted successfully ✅");
    } catch (error) {
      toast.error("Failed to delete task ❌");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      <Navbar />
      <TaskDialog onSubmit={handleTaskCreate} />
      <div className="mt-4 space-y-4">
        {loading ? (
          <p className="text-center text-gray-500 dark:text-gray-300">
            Loading tasks...
          </p>
        ) : tasks.length === 0 ? (
          <p className="text-center text-zinc-400">No tasks found.</p>
        ) : (
          tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onToggle={() => handleTaskToggle(task.id)}
              onDelete={() => handleTaskDelete(task.id)}
              onUpdate={handleTaskUpdate} // passed once, used inside TaskCard
            />
          ))
        )}
      </div>
    </div>
  );
}
