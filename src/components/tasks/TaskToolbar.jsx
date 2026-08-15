import { LayoutGrid, List, Search } from "lucide-react";

const TaskToolbar = ({ view, onViewChange }) => {
  return (
    <section className="rounded-lg border border-outline-variant bg-surface-container-lowest p-4">
      <div className="flex flex-col justify-between gap-4 xl:flex-row xl:items-center">
        <div className="flex flex-1 flex-col gap-3 md:flex-row">
          <label className="relative w-full md:max-w-xs">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-outline" />
            <input
              className="w-full rounded-md border border-outline-variant bg-surface py-2 pl-9 pr-3 text-sm text-on-surface outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
              placeholder="Search tasks..."
              type="text"
            />
          </label>

          <div className="flex gap-2 overflow-x-auto pb-1 md:pb-0">
            <select className="rounded-md border border-outline-variant bg-surface px-3 py-2 text-sm text-on-surface outline-none focus:border-primary focus:ring-2 focus:ring-primary/20">
              <option>Status: All</option>
              <option>Todo</option>
              <option>Doing</option>
              <option>Done</option>
            </select>
            <select className="rounded-md border border-outline-variant bg-surface px-3 py-2 text-sm text-on-surface outline-none focus:border-primary focus:ring-2 focus:ring-primary/20">
              <option>Priority: All</option>
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
            </select>
            <select className="rounded-md border border-outline-variant bg-surface px-3 py-2 text-sm text-on-surface outline-none focus:border-primary focus:ring-2 focus:ring-primary/20">
              <option>Sort: Created Date</option>
              <option>Due Date</option>
            </select>
            <select className="rounded-md border border-outline-variant bg-surface px-3 py-2 text-sm text-on-surface outline-none focus:border-primary focus:ring-2 focus:ring-primary/20">
              <option>Rows: 10</option>
              <option>Rows: 5</option>
              <option>Rows: 20</option>
              <option>Rows: 50</option>
            </select>
          </div>
        </div>

        <div className="flex w-fit items-center rounded-md border border-outline-variant bg-surface-container p-1">
          <button
            className={`inline-flex items-center gap-2 rounded px-3 py-1.5 text-sm font-medium transition ${
              view === "list"
                ? "bg-surface-container-lowest text-primary shadow-sm"
                : "text-on-surface-variant hover:text-on-surface"
            }`}
            onClick={() => onViewChange("list")}
            type="button"
          >
            <List className="h-4 w-4" />
            List
          </button>
          <button
            className={`inline-flex items-center gap-2 rounded px-3 py-1.5 text-sm font-medium transition ${
              view === "kanban"
                ? "bg-surface-container-lowest text-primary shadow-sm"
                : "text-on-surface-variant hover:text-on-surface"
            }`}
            onClick={() => onViewChange("kanban")}
            type="button"
          >
            <LayoutGrid className="h-4 w-4" />
            Kanban
          </button>
        </div>
      </div>
    </section>
  );
};

export default TaskToolbar;
