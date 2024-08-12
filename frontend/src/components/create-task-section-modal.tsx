import { FormEvent, useRef } from "react";

interface CreateTaskSectionProps {
  setName: (name: string) => void;
  setDetails: (details: string) => void;
  createNewTask: (event: FormEvent<HTMLFormElement>) => void;
  setIsCreateTaskModalOpen: (isCreateTaskModalOpen: boolean) => void

}

export function CreateTaskSectionModal({
  setName,
  createNewTask,
  setDetails,
  setIsCreateTaskModalOpen
}: CreateTaskSectionProps) {
  const formRef = useRef<HTMLFormElement>(null);

function resetForm() {
  formRef.current?.reset();
}
  return (
    <div className="flex fixed z-20 items-center justify-center inset-0 bg-black/80">
      <div className="flex max-w-[350px] shrink-0 rounded bg-zinc-800 p-5 shadow-lg shadow-zinc-900/50">
      <form ref={formRef} onSubmit={createNewTask} className="flex w-full flex-col gap-6" action="submit">
        <div className="flex w-full flex-col items-start gap-4">
          <label className="text-2xl text-zinc-200" htmlFor="task-name">
            Task name
          </label>
          <input
            autoFocus
            id="task-name"
            className="w-full rounded border-2 border-zinc-400 bg-zinc-800 px-3 py-2 text-2xl text-zinc-200 outline-none placeholder:text-xl placeholder:text-zinc-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
            type="text"
            placeholder="What are you going to do?"
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
            placeholder="Describe the task details..."
            maxLength={350}
            className="h-32 w-full resize-none overflow-auto rounded border-2 border-zinc-400 bg-zinc-800 px-3 py-2 text-zinc-200 outline-none placeholder:text-sm placeholder:text-zinc-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
          ></textarea>
        </div>
        <div className="flex w-full items-center justify-between">
          <button
          onClick={resetForm}
            className="transform rounded border-2 border-zinc-200 bg-zinc-800 px-4 py-2 text-xl font-medium text-zinc-200 transition duration-150 ease-in-out hover:bg-zinc-200 hover:text-zinc-800 hover:shadow-md focus:ring-2 focus:ring-blue-500"
            type="submit"
          >
            Create task
          </button>

          <button
              className="transform rounded border-2 border-zinc-200 bg-zinc-800 px-4 py-2 text-xl font-medium text-zinc-200 transition duration-150 ease-in-out hover:bg-zinc-200 hover:text-zinc-800 hover:shadow-md focus:ring-2 focus:ring-blue-500"
              onClick={() => setIsCreateTaskModalOpen(false)}
            >
              Close
            </button>
        </div>
      </form>
    </div>
    </div>
  );
}
