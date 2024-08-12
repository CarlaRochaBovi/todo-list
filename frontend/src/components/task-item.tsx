import { Pencil, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import dayjs from "dayjs";

interface TaskItemProps {
  taskName: string;
  taskDetails: string;
  taskCreationDate: string;
  taskIsCompleted: boolean;
  taskId: string;
  deleteTask: (taskId: string) => void;
  openEditModal: (taskId: string) => void;
  setTaskIdToEdit: (taskIdToEdit: string) => void;
  taskCompletedHandler: (checked: boolean, taskId: string) => void
}

export function TaskItem({
  taskId,
  taskName,
  taskDetails,
  taskCreationDate,
  taskIsCompleted,
  deleteTask,
  openEditModal,
  setTaskIdToEdit,
  taskCompletedHandler
}: TaskItemProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [textExceeds, setTextExceeds] = useState(false);

  useEffect(() => {
    if (taskDetails.length > 50) {
      setTextExceeds(true);
    }
  }, [taskDetails]);

  const isExpandedHandler = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div>
      <p className="text-sm text-zinc-500">
        {dayjs(taskCreationDate).format("YYYY/MM/DD HH:mm")}
      </p>

      <div className="flex flex-col items-start gap-3 rounded border-2 border-zinc-700 p-2 shadow-lg shadow-zinc-900/50">
        <div className="flex w-full items-center justify-between">
          <div className="flex items-center gap-3">
            <input
              className="relative size-6 sm:size-8 appearance-none rounded border-2 border-blue-500 bg-zinc-800 before:pointer-events-none checked:bg-blue-500 checked:after:absolute checked:after:left-[10px] checked:after:top-[2px] checked:after:block checked:after:h-[19.5px] checked:after:w-[9px] checked:after:rotate-45 checked:after:border-[0.2rem] checked:after:border-l-0 checked:after:border-t-0 checked:after:border-solid checked:after:border-zinc-800 checked:after:bg-transparent checked:after:content-[''] hover:cursor-pointer"
              type="checkbox"
              checked={taskIsCompleted}
              onChange={(event) => taskCompletedHandler(event.target.checked, taskId)}
              id={`checkbox-${taskId}`}
            />
            <label
              className={`text-sm sm:text-lg font-medium ${taskIsCompleted ? "text-zinc-400 line-through" : "text-zinc-200"}`}
              htmlFor={`checkbox-${taskId}`}
            >
              {taskName}
            </label>
          </div>

          <div
            className={`flex gap-3 ${taskIsCompleted ? "opacity-50" : "opacity-100"}`}
          >
            <button
              onClick={() => {
                openEditModal(taskId);
                setTaskIdToEdit(taskId);
              }}
              className="group rounded border-2 border-zinc-200 bg-zinc-800 p-2 hover:bg-zinc-200"
            >
              <Pencil className="text-zinc-200 duration-100 size-4 lg:size-auto group-hover:text-zinc-800" />
            </button>
            <button
              onClick={() => deleteTask(taskId)}
              className="group rounded border-2 border-zinc-200 bg-zinc-800 p-2 hover:bg-zinc-200"
            >
              <Trash2 className="text-zinc-200 duration-100 size-4 lg:size-auto group-hover:text-zinc-800" />
            </button>
          </div>
        </div>

        {
          taskDetails.length !== 0 && (
            <div className="flex w-full items-start justify-between gap-2">
              <p
                className={` ${!isExpanded && "truncate"} ${taskIsCompleted ? "line-through opacity-50" : "opacity-75"} text-xs sm:text-sm max-w-xs lg:max-w-xl xl:max-w-3xl text-zinc-200`}
              >
                {taskDetails}
              </p>
              {textExceeds && (
                <button
                  onClick={isExpandedHandler}
                  className="text-xs sm:text-sm text-blue-500 min-w-fit"
                >
                  {isExpanded ? "Show Less" : "Show More"}
                </button>
              )}
            </div>
          )
        }
      </div>
    </div>
  );
}

