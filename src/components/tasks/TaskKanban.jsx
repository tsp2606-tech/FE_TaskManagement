import { ArrowRight, CheckCircle2, MoreHorizontal } from "lucide-react";
import TaskBadge from "./TaskBadge";
import { formatDate, getNextStatus, isOverdue, statusLabels, taskStatuses } from "./taskData";

const columnMeta = {
  todo: "bg-status-todo-text",
  doing: "bg-status-doing-text",
  done: "bg-status-done-text",
};

const TaskKanban = ({ onMove, onView, tasks }) => {
  return (
    <section className="grid gap-4 lg:grid-cols-3">
      {taskStatuses.map((status) => {
        const columnTasks = tasks.filter((task) => task.status === status);

        return (
          <div
            className="flex min-h-[560px] flex-col rounded-lg border border-outline-variant bg-surface-container-low"
            key={status}
          >
            <header className="flex items-center justify-between border-b border-outline-variant p-4">
              <div className="flex items-center gap-2">
                <span className={`h-2 w-2 rounded-full ${columnMeta[status]}`} />
                <h3 className="font-semibold text-on-surface">{statusLabels[status]}</h3>
                <span className="rounded-full bg-surface-variant px-2 py-0.5 font-mono text-xs text-on-surface-variant">
                  {columnTasks.length}
                </span>
              </div>
            </header>

            <div className="flex flex-1 flex-col gap-3 p-3">
              {columnTasks.map((task) => {
                const nextStatus = getNextStatus(task.status);

                return (
                  <article
                    className={`rounded-lg border border-outline-variant bg-surface-container-lowest p-4 transition hover:shadow-[0_4px_12px_rgba(0,0,0,0.05)] ${
                      task.status === "done" ? "opacity-75" : ""
                    }`}
                    key={task._id}
                  >
                    <div className="mb-3 flex items-start justify-between gap-3">
                      <TaskBadge type="priority" value={task.priority} />
                      <button
                        className="rounded-md p-1 text-outline transition hover:bg-surface-container-low hover:text-on-surface"
                        onClick={() => onView(task)}
                        title="View details"
                        type="button"
                      >
                        <MoreHorizontal className="h-4 w-4" />
                      </button>
                    </div>
                    <h4 className={`font-semibold text-on-surface ${task.status === "done" ? "line-through" : ""}`}>
                      {task.title}
                    </h4>
                    <p className="mt-2 line-clamp-2 text-sm text-on-surface-variant">
                      {task.description}
                    </p>
                    <footer className="mt-4 flex items-center justify-between border-t border-outline-variant pt-3">
                      <span
                        className={`text-sm ${
                          isOverdue(task.dueDate, task.status)
                            ? "font-semibold text-error"
                            : "text-on-surface-variant"
                        }`}
                      >
                        {formatDate(task.dueDate)}
                      </span>
                      {nextStatus ? (
                        <button
                          className="flex h-8 w-8 items-center justify-center rounded-full border border-outline-variant text-primary transition hover:bg-primary/10"
                          onClick={() => onMove(task)}
                          title={`Move to ${statusLabels[nextStatus]}`}
                          type="button"
                        >
                          <ArrowRight className="h-4 w-4" />
                        </button>
                      ) : (
                        <CheckCircle2 className="h-5 w-5 text-status-done-text" />
                      )}
                    </footer>
                  </article>
                );
              })}
            </div>
          </div>
        );
      })}
    </section>
  );
};

export default TaskKanban;
