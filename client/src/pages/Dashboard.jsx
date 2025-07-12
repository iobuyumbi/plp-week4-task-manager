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
        console.log("Fetching tasks...");
        const token = localStorage.getItem("token");
        console.log("Token:", token ? "Present" : "Missing");

        const response = await API.get("/tasks");
        console.log("Tasks response:", response.data);
        setTasks(response.data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
        console.error("Error response:", error.response?.data);
        toast.error("Failed to fetch tasks");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const handleTaskCreate = async (payload) => {
    try {
      console.log("Creating task:", payload);
      const response = await API.post("/tasks", payload);
      console.log("Create response:", response.data);
      setTasks((prev) => [...prev, response.data]);
      toast.success("Task created successfully ✅");
    } catch (error) {
      console.error("Error creating task:", error);
      toast.error("Failed to create task ❌");
    }
  };

  const handleTaskUpdate = async (updatedTask) => {
    try {
      const response = await API.put(`/tasks/${updatedTask._id}`, updatedTask);
      setTasks((prev) =>
        prev.map((task) =>
          task._id === updatedTask._id ? response.data : task
        )
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
          task._id === taskId
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
      setTasks((prev) => prev.filter((task) => task._id !== taskId));
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
          <div className="text-center">
            <p className="text-zinc-400 mb-4">No tasks found.</p>
            <p className="text-sm text-zinc-500">
              Create your first task using the button above!
            </p>
          </div>
        ) : (
          tasks.map((task) => (
            <TaskCard
              key={task._id}
              task={task}
              onToggle={() => handleTaskToggle(task._id)}
              onDelete={() => handleTaskDelete(task._id)}
              onUpdate={handleTaskUpdate} // passed once, used inside TaskCard
            />
          ))
        )}
      </div>
    </div>
  );
}
