import { FormEvent } from "react";

interface CreateTaskSectionProps {
  setName: (name: string) => void;
  setDetails: (details: string) => void;
  editTask: (taskId: string, event: FormEvent<HTMLFormElement>) => void;
  taskIdToEdit: string;
  name: string;
  details: string
  setIsEditTaskModalOpen: (isEditTaskModalOpen: boolean) => void
}

export function UpdateTaskModal({
  setName,
  setDetails,
  taskIdToEdit,
  editTask,
  name,
  details,
  setIsEditTaskModalOpen
}: CreateTaskSectionProps) {
  return (
    <div className="fixed inset-0 z-10 flex items-center justify-center bg-black/80">
      <div className="flex min-w-[350px] shrink-0 rounded bg-zinc-800 p-5 shadow-lg shadow-zinc-900/50">
        <form
          onSubmit={(event) => editTask(taskIdToEdit, event)}
          className="flex w-full flex-col gap-6"
          action="submit"
        >
          <div className="flex w-full flex-col items-start gap-4">
            <label className="text-2xl text-zinc-200" htmlFor="task-name">
              Task name
            </label>
            <input
              autoFocus
              id="task-name"
              className="w-full rounded border-2 border-zinc-400 bg-zinc-800 px-3 py-2 text-2xl text-zinc-200 outline-none placeholder:text-2xl placeholder:text-zinc-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
              type="text"
              value={name}
              placeholder="Do homework"
              onChange={(event) => setName(event.target.value)}
            />
            {/* Mensagem de erro de exemplo */}
            {/* <span className="text-red-500">Task name is required.</span> */}
          </div>
          <div className="flex w-full flex-col items-start gap-4">
            <label className="text-2xl text-zinc-200" htmlFor="details">
              Task details
            </label>
            <textarea
              onChange={(event) => setDetails(event.target.value)}
              id="details"
              value={details}
              placeholder="Describe the task details..."
              maxLength={350}
              className="h-32 w-full resize-none overflow-auto rounded border-2 border-zinc-400 bg-zinc-800 px-3 py-2 text-zinc-200 outline-none placeholder:text-sm placeholder:text-zinc-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
            ></textarea>
          </div>
          <div className="flex w-full items-center justify-between">
            <button
              className="transform rounded border-2 border-zinc-200 bg-zinc-800 px-4 py-2 text-xl font-medium text-zinc-200 transition duration-150 ease-in-out hover:bg-zinc-200 hover:text-zinc-800 hover:shadow-md focus:ring-2 focus:ring-blue-500"
              type="submit"
            >
              Edit task
            </button>

            <button
              className="transform rounded border-2 border-zinc-200 bg-zinc-800 px-4 py-2 text-xl font-medium text-zinc-200 transition duration-150 ease-in-out hover:bg-zinc-200 hover:text-zinc-800 hover:shadow-md focus:ring-2 focus:ring-blue-500"
              onClick={() => setIsEditTaskModalOpen(false)}
            >
              Close
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
