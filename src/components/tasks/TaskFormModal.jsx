import { X } from "lucide-react";
import TaskBadge from "./TaskBadge";
import { formatDate } from "./taskData";

const TaskFormModal = ({ mode = "add", onClose, task }) => {
  const isEdit = mode === "edit";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-on-background/40 p-4 backdrop-blur-sm">
      <section className="max-h-[calc(100vh-2rem)] w-full max-w-2xl overflow-hidden rounded-lg border border-outline-variant bg-surface-container-lowest shadow-2xl">
        <header className="flex items-center justify-between border-b border-outline-variant px-6 py-4">
          <div>
            <h2 className="text-xl font-bold text-on-surface">
              {isEdit ? "Edit Task" : "Add Task"}
            </h2>
            <p className="mt-1 text-sm text-on-surface-variant">
              {isEdit ? "Update task details without changing created date." : "Create a new task for the workflow."}
            </p>
          </div>
          <button
            className="rounded-md p-2 text-on-surface-variant transition hover:bg-surface-container-low hover:text-on-surface"
            onClick={onClose}
            type="button"
          >
            <X className="h-5 w-5" />
          </button>
        </header>

        {isEdit && (
          <div className="border-b border-outline-variant bg-surface px-6 py-3">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-xs font-semibold uppercase text-on-surface-variant">Current Status</p>
                <p className="text-sm text-on-surface-variant">Status changes use the dedicated workflow action.</p>
              </div>
              <TaskBadge type="status" value={task.status} />
            </div>
          </div>
        )}

        {isEdit && (
          <div className="border-b border-error/25 bg-error-container/30 px-6 py-3 text-sm font-medium text-error">
            Unable to update task. Please try again.
          </div>
        )}

        <div className="max-h-[62vh] overflow-y-auto p-6">
          <form className="space-y-5">
            <div>
              <label className={`mb-1 block text-sm font-medium ${isEdit ? "text-error" : "text-on-surface"}`} htmlFor="task-title">
                Title <span className="text-error">*</span>
              </label>
              <input
                className={`w-full rounded-lg border bg-surface px-3 py-2 text-sm text-on-surface outline-none transition focus:ring-2 ${
                  isEdit
                    ? "border-error focus:border-error focus:ring-error/20"
                    : "border-outline-variant focus:border-primary focus:ring-primary/20"
                }`}
                defaultValue={isEdit ? "" : ""}
                id="task-title"
                placeholder={isEdit ? "Enter task title" : "e.g. Prepare Q3 Report"}
                required
                type="text"
              />
              {isEdit && <p className="mt-1 text-sm text-error">Task title is required.</p>}
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-on-surface" htmlFor="task-description">
                Description
              </label>
              <textarea
                className="min-h-28 w-full resize-none rounded-lg border border-outline-variant bg-surface px-3 py-2 text-sm text-on-surface outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                defaultValue={task?.description ?? ""}
                id="task-description"
                placeholder="Add details or context..."
              />
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label className="mb-1 block text-sm font-medium text-on-surface" htmlFor="task-priority">
                  Priority
                </label>
                <select
                  className="w-full rounded-lg border border-outline-variant bg-surface px-3 py-2 text-sm text-on-surface outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                  defaultValue={task?.priority ?? "medium"}
                  id="task-priority"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-on-surface" htmlFor="task-due-date">
                  Due Date
                </label>
                <input
                  className="w-full rounded-lg border border-outline-variant bg-surface px-3 py-2 text-sm text-on-surface outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                  id="task-due-date"
                  type="date"
                />
              </div>
            </div>
          </form>
        </div>

        <footer className="flex flex-col justify-between gap-4 border-t border-outline-variant bg-surface px-6 py-4 sm:flex-row sm:items-center">
          {isEdit ? (
            <div className="text-center font-mono text-xs text-outline sm:text-left">
              <p>Created: {formatDate(task.createdAt)} 09:12 AM</p>
              <p>Last updated: {formatDate(task.updatedAt)} 02:45 PM</p>
            </div>
          ) : (
            <span className="text-sm text-on-surface-variant">Created and updated dates are handled by the API.</span>
          )}
          <div className="flex gap-3">
            <button
              className="flex-1 rounded-lg border border-outline-variant bg-surface-container-lowest px-4 py-2 text-sm font-medium text-on-surface transition hover:bg-surface-container-low sm:flex-none"
              onClick={onClose}
              type="button"
            >
              Cancel
            </button>
            <button
              className="flex-1 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-on-primary shadow-sm transition hover:bg-primary-container sm:flex-none"
              type="button"
            >
              {isEdit ? "Save Changes" : "Create Task"}
            </button>
          </div>
        </footer>
      </section>
    </div>
  );
};

export default TaskFormModal;
