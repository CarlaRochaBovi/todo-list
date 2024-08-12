import { Plus } from "lucide-react";

interface FilterComponentProps {
  setIsCreateTaskModalOpen: (isCreateTaskModalOpen: boolean) => void;
}

export function AddTaskText({ setIsCreateTaskModalOpen }: FilterComponentProps) {
  return (
    <div className="flex shrink-0 items-center gap-3 rounded bg-zinc-800">
      <h2 className="text-sm sm:text-lg font-medium text-zinc-200 lg:text-4xl">
        Add Task
      </h2>

      <button onClick={() => setIsCreateTaskModalOpen(true)} className="group transform rounded border-2 border-zinc-200 bg-zinc-800 p-1 text-xl font-medium text-zinc-200 transition duration-150 ease-in-out hover:bg-zinc-200 hover:text-zinc-800 hover:shadow-md focus:ring-2 focus:ring-blue-500">
        <Plus className="text-zinc-200 duration-100 size-4 lg:size-auto group-hover:text-zinc-800"/>
      </button>
    </div>
  );
}
