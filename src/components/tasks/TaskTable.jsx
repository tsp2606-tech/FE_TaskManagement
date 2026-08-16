import { ArrowRight, CheckCheck, Eye, Pencil, Trash2 } from "lucide-react";
import TaskBadge from "./TaskBadge";
import { formatDate, getNextStatus, isOverdue, statusLabels } from "./taskData";

const TaskTable = ({
  filters,
  onDelete,
  onEdit,
  onLimitChange,
  onMove,
  onPageChange,
  onView,
  pagination,
  tasks,
}) => {
  const page = pagination?.page || 1;
  const limit = pagination?.limit || filters.limit;
  const total = pagination?.total || 0;
  const totalPages = pagination?.totalPages || 1;
  const from = total === 0 ? 0 : (page - 1) * limit + 1;
  const to = Math.min(page * limit, total);

  return (
    <section className="overflow-hidden rounded-lg border border-outline-variant bg-surface-container-lowest">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[980px] border-collapse text-left">
          <thead>
            <tr className="border-b border-outline-variant bg-surface-container-low text-xs font-semibold uppercase text-on-surface-variant">
              <th className="px-4 py-3">Task</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Priority</th>
              <th className="px-4 py-3">Due Date</th>
              <th className="px-4 py-3">Created Date</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-outline-variant text-sm">
            {tasks.map((task) => {
              const nextStatus = getNextStatus(task.status);

              return (
                <tr className="group transition hover:bg-surface-container-low" key={task._id}>
                  <td className="px-4 py-3">
                    <p className="font-semibold text-on-surface">{task.title}</p>
                    <p className="mt-1 max-w-md truncate text-on-surface-variant">
                      {task.description || "No description"}
                    </p>
                  </td>
                  <td className="px-4 py-3">
                    <TaskBadge type="status" value={task.status} />
                  </td>
                  <td className="px-4 py-3">
                    <TaskBadge type="priority" value={task.priority} />
                  </td>
                  <td
                    className={`px-4 py-3 ${
                      isOverdue(task.dueDate, task.status)
                        ? "font-semibold text-error"
                        : "text-on-surface-variant"
                    }`}
                  >
                    {formatDate(task.dueDate)}
                    {isOverdue(task.dueDate, task.status) && (
                      <span className="ml-1 text-xs">(Overdue)</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-on-surface-variant">
                    {formatDate(task.createdAt)}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-1">
                      <button
                        aria-label={`View ${task.title}`}
                        className="rounded-md p-2 text-on-surface-variant transition hover:bg-surface-variant hover:text-primary"
                        onClick={() => onView(task)}
                        title="View details"
                        type="button"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                      <button
                        aria-label={`Edit ${task.title}`}
                        className="rounded-md p-2 text-on-surface-variant transition hover:bg-surface-variant hover:text-primary"
                        onClick={() => onEdit(task)}
                        title="Edit task"
                        type="button"
                      >
                        <Pencil className="h-4 w-4" />
                      </button>
                      <button
                        aria-label={`Delete ${task.title}`}
                        className="rounded-md p-2 text-on-surface-variant transition hover:bg-surface-variant hover:text-error"
                        onClick={() => onDelete(task)}
                        title="Delete task"
                        type="button"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                      <span className="mx-1 h-4 w-px bg-outline-variant" />
                      <button
                        aria-label={nextStatus ? `Move to ${statusLabels[nextStatus]}` : "Already done"}
                        className={`rounded-md p-2 transition ${
                          nextStatus
                            ? "text-primary hover:bg-primary/10"
                            : "cursor-not-allowed text-outline"
                        }`}
                        disabled={!nextStatus}
                        onClick={() => onMove(task)}
                        title={nextStatus ? `Move to ${statusLabels[nextStatus]}` : "Already done"}
                        type="button"
                      >
                        {nextStatus ? <ArrowRight className="h-4 w-4" /> : <CheckCheck className="h-4 w-4" />}
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <footer className="flex flex-col items-center justify-between gap-4 border-t border-outline-variant bg-surface px-4 py-3 text-sm text-on-surface-variant sm:flex-row">
        <div className="flex items-center gap-2">
          <span>Rows per page:</span>
          <select
            className="rounded-md border border-outline-variant bg-surface-container-lowest px-2 py-1 text-on-surface"
            onChange={(event) => onLimitChange(Number(event.target.value))}
            value={limit}
          >
            <option value={10}>10</option>
            <option value={5}>5</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
          </select>
        </div>
        <div className="flex items-center gap-4">
          <span>
            Showing {from}-{to} of {total} tasks
          </span>
          <div className="flex items-center gap-1">
            <button
              className="rounded px-2 py-1 disabled:opacity-50 enabled:hover:bg-surface-container-low"
              disabled={page <= 1}
              onClick={() => onPageChange(page - 1)}
              type="button"
            >
              Previous
            </button>
            <button className="flex h-8 w-8 items-center justify-center rounded bg-primary text-on-primary" type="button">
              {page}
            </button>
            <button
              className="rounded px-2 py-1 disabled:opacity-50 enabled:hover:bg-surface-container-low"
              disabled={page >= totalPages}
              onClick={() => onPageChange(page + 1)}
              type="button"
            >
              Next
            </button>
          </div>
        </div>
      </footer>
    </section>
  );
};

export default TaskTable;
