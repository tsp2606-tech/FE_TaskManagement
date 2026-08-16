import { useState } from "react";
import { X } from "lucide-react";
import TaskBadge from "./TaskBadge";
import { formatDate } from "./taskData";

const toDateInputValue = (date) => {
  if (!date) return "";
  const parsedDate = new Date(date);
  if (Number.isNaN(parsedDate.getTime())) return "";
  return parsedDate.toISOString().slice(0, 10);
};

const TaskFormModal = ({
  error,
  isSubmitting,
  mode = "add",
  onClose,
  onSubmit,
  task,
}) => {
  const isEdit = mode === "edit";
  const [formData, setFormData] = useState({
    title: isEdit ? task?.title || "" : "",
    description: task?.description || "",
    priority: task?.priority || "medium",
    dueDate: toDateInputValue(task?.dueDate),
  });
  const [isDueDateFocused, setIsDueDateFocused] = useState(false);

  const shouldUseDateInput = isDueDateFocused || Boolean(formData.dueDate);

  const handleChange = (field, value) => {
    setFormData((current) => ({
      ...current,
      [field]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit({
      ...formData,
      dueDate: formData.dueDate || null,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-on-background/40 p-4 backdrop-blur-sm">
      <section className="max-h-[calc(100vh-2rem)] w-full max-w-2xl overflow-hidden rounded-lg border border-outline-variant bg-surface-container-lowest shadow-2xl">
        <header className="flex items-center justify-between border-b border-outline-variant px-6 py-4">
          <div>
            <h2 className="text-xl font-bold text-on-surface">
              {isEdit ? "Edit Task" : "Add Task"}
            </h2>
            <p className="mt-1 text-sm text-on-surface-variant">
              {isEdit
                ? "Update task details without changing created date."
                : "Create a new task for the workflow."}
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
                <p className="text-xs font-semibold uppercase text-on-surface-variant">
                  Current Status
                </p>
                <p className="text-sm text-on-surface-variant">
                  Status changes use the dedicated workflow action.
                </p>
              </div>
              <TaskBadge type="status" value={task.status} />
            </div>
          </div>
        )}

        {error && (
          <div className="border-b border-error/25 bg-error-container/30 px-6 py-3 text-sm font-medium text-error">
            {error}
          </div>
        )}

        <div className="max-h-[62vh] overflow-y-auto p-6">
          <form className="space-y-5" onSubmit={handleSubmit}>
            <div>
              <label
                className="mb-1 block text-sm font-medium text-on-surface"
                htmlFor="task-title"
              >
                Title <span className="text-error">*</span>
              </label>
              <input
                className="w-full rounded-lg border border-outline-variant bg-surface px-3 py-2 text-sm text-on-surface outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                id="task-title"
                placeholder={
                  isEdit ? "Enter task title" : "e.g. Prepare Q3 Report"
                }
                onChange={(event) => handleChange("title", event.target.value)}
                type="text"
                value={formData.title}
              />
            </div>

            <div>
              <label
                className="mb-1 block text-sm font-medium text-on-surface"
                htmlFor="task-description"
              >
                Description
              </label>
              <textarea
                className="min-h-28 w-full resize-none rounded-lg border border-outline-variant bg-surface px-3 py-2 text-sm text-on-surface outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                id="task-description"
                onChange={(event) =>
                  handleChange("description", event.target.value)
                }
                placeholder="Add details or context..."
                value={formData.description}
              />
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label
                  className="mb-1 block text-sm font-medium text-on-surface"
                  htmlFor="task-priority"
                >
                  Priority
                </label>
                <select
                  className="w-full rounded-lg border border-outline-variant bg-surface px-3 py-2 text-sm text-on-surface outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                  id="task-priority"
                  onChange={(event) =>
                    handleChange("priority", event.target.value)
                  }
                  value={formData.priority}
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>

              <div>
                <label
                  className="mb-1 block text-sm font-medium text-on-surface"
                  htmlFor="task-due-date"
                >
                  Due Date
                </label>
                <input
                  className="w-full rounded-lg border border-outline-variant bg-surface px-3 py-2 text-sm text-on-surface outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                  id="task-due-date"
                  onBlur={() => setIsDueDateFocused(false)}
                  onChange={(event) =>
                    handleChange("dueDate", event.target.value)
                  }
                  onFocus={() => setIsDueDateFocused(true)}
                  placeholder="Today"
                  type={shouldUseDateInput ? "date" : "text"}
                  value={formData.dueDate}
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
            <span className="text-sm text-on-surface-variant">
              Created and updated dates are handled by the API.
            </span>
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
              disabled={isSubmitting}
              onClick={handleSubmit}
              type="button"
            >
              {isSubmitting
                ? "Saving..."
                : isEdit
                  ? "Save Changes"
                  : "Create Task"}
            </button>
          </div>
        </footer>
      </section>
    </div>
  );
};

export default TaskFormModal;
