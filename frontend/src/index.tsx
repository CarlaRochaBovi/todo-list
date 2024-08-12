import { CreateTaskSection } from "./components/create-task-section";
import { TaskItem } from "./components/task-item";
import { FilterComponent } from "./components/filter-component";
import { FormEvent, useEffect, useState } from "react";
import { api } from "./lib/axios";
import { UpdateTaskModal } from "./components/update-task-modal";
import { CreateTaskSectionModal } from "./components/create-task-section-modal";
import { AddTaskText } from "./components/add-task-text";

interface Task {
  id: string;
  name: string;
  details: string;
  created_at: string;
  is_completed: boolean;
}

export function App() {
  const [name, setName] = useState<string>("");
  const [details, setDetails] = useState<string>("");
  const [allTasks, setAllTasks] = useState<Task[]>([]);
  const [filteredTasks, setFilteredTasks] = useState<Task[]>([]);
  const [isEditTaskModalOpen, setIsEditTaskModalOpen] =
    useState<boolean>(false);
  const [isCreateTaskModalOpen, setIsCreateTaskModalOpen] =
    useState<boolean>(false);
  const [taskIdToEdit, setTaskIdToEdit] = useState<string>("");
  const [option, setOption] = useState<string>("");

  useEffect(() => {
    getTasks();
  }, []);

  useEffect(() => {
    filter(option);
  }, [option, allTasks]);

  async function getTasks() {
    try {
      const response = await api.get("/tasks");
      setAllTasks(response.data);
      setFilteredTasks(response.data); // Atualiza as tarefas filtradas com todas as tarefas
    } catch (error) {
      console.error("Failed to fetch tasks:", error);
    }
  }

  function filter(option: string) {
    let tasksToDisplay = [...allTasks];
    if (option === "completed") {
      tasksToDisplay = tasksToDisplay.filter((task) => task.is_completed);
    } else if (option === "incompleted") {
      tasksToDisplay = tasksToDisplay.filter((task) => !task.is_completed);
    }
    setFilteredTasks(tasksToDisplay);
  }

  function openEditModal(taskId: string) {
    api
      .get(`/tasks/${taskId}`)
      .then((response) => {
        const task = response.data;
        setName(task.name);
        setDetails(task.details);
        setIsEditTaskModalOpen(true);
        setTaskIdToEdit(taskId);
      })
      .catch((error) => {
        console.error("Failed to fetch task details:", error);
      });
  }

  async function createNewTask(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!name) return alert("Your task must have a name!");
    if (name.length > 25)
      return alert("Your task name is too long (over 30 characters).");
    if (details.length > 350)
      return alert("Your task details is too long (over 350 characters).");

    try {
      await api.post("/tasks", {
        name,
        details,
      });
      await getTasks(); // Atualiza as tarefas após a criação
    } catch (error) {
      alert("Failed to create task:" + error);
    }
    setName("");
    setDetails("");
  }

  async function deleteTask(taskId: string) {
    try {
      await api.delete(`/tasks/${taskId}`);
      await getTasks();
    } catch (error) {
      alert("Failed to delete task:" + error);
    }
  }

  async function editTask(taskId: string, event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    try {
      await api.put(`/tasks/${taskId}`, {
        name,
        details,
      });
      await getTasks(); // Atualiza as tarefas após a edição
      setIsEditTaskModalOpen(false);
    } catch (error) {
      alert("Failed to edit task:" + error);
    }
    setName("");
    setDetails("");
  }

  async function taskCompletedHandler(checked: boolean, taskId: string) {
    try {
      await api.patch(`/tasks/${taskId}`, {
        is_completed: checked,
      });
      await getTasks(); // Atualiza a lista de tarefas após a mudança
    } catch (error) {
      console.error("Failed to update task completion status", error);
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center bg-zinc-800">
      <header className="flex py-3 lg:py-5">
        <h2 className="text-3xl font-medium text-zinc-200 lg:text-4xl">
          Welcome to Todo!
        </h2>
      </header>

      <div className="z-10 h-1 w-full bg-blue-500" />

      <main className="flex w-full gap-5 p-5">
        <div className="hidden min-w-[350px] flex-col gap-3 md:flex">
          <CreateTaskSection
            setName={setName}
            setDetails={setDetails}
            createNewTask={createNewTask}
          />
        </div>

        <div className="flex h-[600px] w-full flex-col gap-3">
          <div className="flex w-full items-center justify-between ">
            <div className="visible md:hidden">
              <AddTaskText
                setIsCreateTaskModalOpen={setIsCreateTaskModalOpen}
              />
            </div>

            <FilterComponent setOption={setOption} />
          </div>
          <div className="flex h-[600px] w-full flex-col space-y-4 overflow-y-auto p-2">
            <h2 className="text-center text-3xl font-medium text-zinc-200 lg:text-4xl">
              Tasks
            </h2>
            {filteredTasks.length === 0 ? (
              <h2 className="text-md text-center font-medium text-zinc-400">
                Out of tasks
              </h2>
            ) : (
              filteredTasks.map((task) => (
                <TaskItem
                  key={task.id}
                  taskId={task.id}
                  taskName={task.name}
                  taskDetails={task.details}
                  taskCreationDate={task.created_at}
                  taskIsCompleted={task.is_completed}
                  deleteTask={deleteTask}
                  openEditModal={openEditModal}
                  setTaskIdToEdit={setTaskIdToEdit}
                  taskCompletedHandler={taskCompletedHandler}
                />
              ))
            )}
          </div>
        </div>
      </main>
      {isEditTaskModalOpen && (
        <UpdateTaskModal
          editTask={editTask}
          setDetails={setDetails}
          setName={setName}
          name={name}
          details={details}
          taskIdToEdit={taskIdToEdit}
          setIsEditTaskModalOpen={setIsEditTaskModalOpen}
        />
      )}

      {isCreateTaskModalOpen && (
        <CreateTaskSectionModal
          setName={setName}
          setDetails={setDetails}
          createNewTask={createNewTask}
          setIsCreateTaskModalOpen={setIsCreateTaskModalOpen}
        />
      )}
    </div>
  );
}
