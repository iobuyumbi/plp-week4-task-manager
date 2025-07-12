import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@components/ui/dialog";
import { Button } from "@components/ui/button";
import { input } from "@components/ui/input";
import { Textarea } from "@components/ui/textarea";
import { useEffect, useState } from "react";

export default function TaskDialog({
  onSubmit,
  triggerLabel = "Add Task",
  task = null,
}) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  // Autofill form if task is passed (edit mode)
  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description);
    } else {
      setTitle("");
      setDescription("");
    }
  }, [task]);

  const handleSubmit = () => {
    if (title.trim() === "" || description.trim() === "") {
      alert("Title and description are required");
      return;
    }

    const payload = task
      ? { ...task, title, description } // editing
      : { title, description }; // creating

    onSubmit(payload);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="primary">{triggerLabel}</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{task ? "Edit Task" : "New Task"}</DialogTitle>
        </DialogHeader>
        <input
          type="text"
          placeholder="Task Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className={input({ className: "mb-4" })}
        />
        <Textarea
          placeholder="Task Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className={input({ className: "mb-4" })}
        />
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <DialogClose asChild>
            <Button variant="primary" onClick={handleSubmit}>
              {task ? "Update Task" : "Create Task"}
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
