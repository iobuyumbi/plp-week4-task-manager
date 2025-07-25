import {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardContent,
} from "../components/ui/card";
import { Button } from "../components/ui/button";
import {
  CheckCircleIcon,
  TrashIcon,
  PencilSquareIcon,
} from "@heroicons/react/24/solid";
import TaskDialog from "./TaskDialog"; // embedded edit dialog

export default function TaskCard({ task, onDelete, onToggle, onUpdate }) {
  return (
    <Card
      className={`relative animation fade ${
        task.completed ? "opacity-70" : ""
      } bg-white dark:bg-gray-800 shadow-md hover:shadow-lg transition-shadow duration-300`}
    >
      <CardHeader>
        <CardTitle
          className={`text-lg font-semibold ${
            task.completed ? "line-through text-zinc-400" : ""
          }`}
        >
          {task.title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          {task.description}
        </p>
      </CardContent>
      <CardFooter className="flex justify-end gap-2">
        <Button
          variant={task.completed ? "outline" : "secondary"}
          size="icon"
          onClick={() => onToggle(task._id)}
        >
          <CheckCircleIcon className="h-5 w-5" />
        </Button>
        <TaskDialog
          task={task}
          triggerLabel={<PencilSquareIcon className="h-5 w-5" />}
          onSubmit={onUpdate}
        />
        <Button
          variant="destructive"
          size="icon"
          onClick={() => onDelete(task._id)}
        >
          <TrashIcon className="h-5 w-5" />
        </Button>
      </CardFooter>
    </Card>
  );
}
