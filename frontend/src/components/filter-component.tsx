
interface FilterComponentProps {
  setOption: (option: string) => void
}

export function FilterComponent({ setOption }:FilterComponentProps) {


  return (
    <div className="flex items-center gap-3 shrink-0 rounded bg-zinc-800 ">
      <label className="ml-0 md:ml-2 min-w-fit text-sm sm:text-lg font-medium text-zinc-200" htmlFor="filter">Filter tasks:</label>
      <select
        className="rounded w-full border-2 focus:ring focus:border-blue-500 text-sm sm:text-lg border-zinc-700 bg-zinc-800 p-1 text-zinc-400 outline-none"
        name="filter"
        id="filter"
        onChange={(event) => setOption(event.target.value)}
      >
        <option value="date">Date</option>
        <option value="completed">Completed</option>
        <option value="incompleted">Incompleted</option>
      </select>
    </div>
  );
}
