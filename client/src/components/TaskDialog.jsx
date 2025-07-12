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
import { useState } from "react";

export default function TaskDialog({ onSubmit }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleCreate = () => {
    if (title.trim() === "" || description.trim() === "") {
      alert("Title and description are required");
      return;
    }
    onSubmit({ title, description });
    setTitle("");
    setDescription("");
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="primary">Add Task</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>New Task</DialogTitle>
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
          <DialogClose>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button variant="primary" onClick={handleCreate}>
            Create Task
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

// export default function TaskDialog({ isOpen, onClose, onSubmit, task }) {
//   const [title, setTitle] = useState(task ? task.title : "");
//   const [description, setDescription] = useState(task ? task.description : "");

//   const handleSubmit = () => {
//     if (title.trim() === "") {
//       alert("Title is required");
//       return;
//     }
//     onSubmit({ id: task ? task.id : null, title, description });
//     onClose();
//   };

//   return (
//     <Dialog open={isOpen} onOpenChange={onClose}>
//       <DialogTrigger asChild>
//         <Button variant="primary">Add Task</Button>
//       </DialogTrigger>
//       <DialogContent>
//         <DialogHeader>
//           <DialogTitle>{task ? "Edit Task" : "New Task"}</DialogTitle>
//         </DialogHeader>
//         <input
//           type="text"
//           placeholder="Task Title"
//           value={title}
//           onChange={(e) => setTitle(e.target.value)}
//           className={input({ className: "mb-4" })}
//         />
//         <Textarea
//           placeholder="Task Description"
//           value={description}
//           onChange={(e) => setDescription(e.target.value)}
//           className={input({ className: "mb-4" })}
//         />
//         <DialogFooter>
//           <Button variant="secondary" onClick={onClose}>
//             Cancel
//           </Button>
//           <Button variant="primary" onClick={handleSubmit}>
//             {task ? "Update Task" : "Create Task"}
//           </Button>
//         </DialogFooter>
//       </DialogContent>
//       <DialogClose />
//     </Dialog>
//   );
// }
