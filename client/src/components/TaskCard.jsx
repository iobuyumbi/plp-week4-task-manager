import {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardContent,
} from "@components/ui/card";
import { Button } from "@components/ui/button";
import { CheckCircleIcon, TrashIcon } from "@heroicons/react/24/solid";

export default function TaskCard({ task, onDelete, onToggle }) {
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
          onClick={() => onToggle(task.id)}
        >
          <CheckCircleIcon className="h-5 w-5" />
          Complete
        </Button>
        <Button
          variant="destructive"
          size="icon"
          onClick={() => onDelete(task.id)}
        >
          <TrashIcon className="h-5 w-5" />
          Delete
        </Button>
      </CardFooter>
    </Card>
  );
}
