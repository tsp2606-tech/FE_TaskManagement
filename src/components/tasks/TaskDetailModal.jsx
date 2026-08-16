import { ArrowRight, CalendarDays, FileText, Pencil, Route, Trash2, X } from "lucide-react";
import TaskBadge from "./TaskBadge";
import { formatDate, getNextStatus, statusLabels, taskStatuses } from "./taskData";

const TaskDetailModal = ({ error, isSubmitting, onClose, onDelete, onEdit, onMove, task }) => {
  const currentIndex = taskStatuses.indexOf(task.status);
  const nextStatus = getNextStatus(task.status);

  return (
    <div className="dialog-overlay fixed inset-0 z-50 flex items-center justify-center bg-on-background/45 p-4 backdrop-blur-md">
      <section className="dialog-panel max-h-[calc(100vh-2rem)] w-full max-w-3xl overflow-hidden rounded-lg border border-outline-variant bg-surface-container-lowest">
        <header className="sticky top-0 z-10 flex items-start justify-between border-b border-outline-variant bg-surface-container-lowest/95 px-6 py-5 backdrop-blur-sm">
          <div className="space-y-3">
            <div className="flex flex-wrap gap-2">
              <TaskBadge type="status" value={task.status} />
              <TaskBadge type="priority" value={task.priority} />
            </div>
            <h2 className="text-2xl font-bold text-on-surface">{task.title}</h2>
          </div>
          <button
            className="rounded-md p-2 text-on-surface-variant transition hover:bg-surface-container-low hover:text-on-surface"
            onClick={onClose}
            type="button"
          >
            <X className="h-5 w-5" />
          </button>
        </header>

        <div className="max-h-[68vh] space-y-8 overflow-y-auto p-6">
          <section>
            <h3 className="mb-3 flex items-center gap-2 font-semibold text-on-surface">
              <FileText className="h-4 w-4 text-outline" />
              Description
            </h3>
            <div className="rounded-lg border border-outline-variant bg-surface p-4 text-on-surface-variant">
              {task.description || "No description"}
            </div>
          </section>

          <section className="grid gap-6 md:grid-cols-2">
            <div className="rounded-lg border border-outline-variant bg-surface p-4">
              <h3 className="mb-4 flex items-center gap-2 font-semibold text-on-surface">
                <CalendarDays className="h-4 w-4 text-outline" />
                Dates
              </h3>
              <dl className="space-y-3 text-sm">
                <div className="flex justify-between gap-4">
                  <dt className="text-on-surface-variant">Due Date</dt>
                  <dd className="font-mono text-on-surface">{formatDate(task.dueDate)}</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-on-surface-variant">Created</dt>
                  <dd className="font-mono text-outline">{formatDate(task.createdAt)}</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-on-surface-variant">Updated</dt>
                  <dd className="font-mono text-outline">{formatDate(task.updatedAt)}</dd>
                </div>
              </dl>
            </div>

            <div className="rounded-lg border border-outline-variant bg-surface p-4">
              <h3 className="mb-5 flex items-center gap-2 font-semibold text-on-surface">
                <Route className="h-4 w-4 text-outline" />
                Workflow Status
              </h3>
              <div className="relative flex justify-between">
                <div className="absolute left-10 right-10 top-4 h-px bg-outline-variant" />
                {taskStatuses.map((status, index) => (
                  <div className="relative z-10 flex w-1/3 flex-col items-center gap-2 text-center" key={status}>
                    <span
                      className={`flex h-8 w-8 items-center justify-center rounded-full border-2 ${
                        index < currentIndex
                          ? "border-status-done-text bg-status-done-text"
                          : index === currentIndex
                            ? "border-primary bg-surface"
                            : "border-outline-variant bg-surface"
                      }`}
                    >
                      {index === currentIndex && <span className="h-3 w-3 rounded-full bg-primary" />}
                    </span>
                    <span
                      className={`text-xs font-semibold uppercase ${
                        index <= currentIndex ? "text-primary" : "text-outline"
                      }`}
                    >
                      {statusLabels[status]}
                    </span>
                  </div>
                ))}
              </div>
              {!nextStatus && (
                <p className="mt-5 rounded-lg bg-status-done-bg p-3 text-sm text-status-done-text">
                  This task is complete and cannot move backward.
                </p>
              )}
            </div>
          </section>

          {error && (
            <div className="rounded-lg border border-error/30 bg-error-container/35 p-4 text-sm text-on-error-container">
              {error}
            </div>
          )}
        </div>

        <footer className="flex flex-col-reverse justify-between gap-3 border-t border-outline-variant bg-surface px-6 py-4 sm:flex-row">
          <div className="flex gap-3">
            <button
              className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg border border-error px-4 py-2 text-sm font-medium text-error transition hover:bg-error-container sm:flex-none"
              onClick={() => onDelete(task)}
              type="button"
            >
              <Trash2 className="h-4 w-4" />
              Delete
            </button>
            <button
              className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg border border-outline-variant bg-surface-container-lowest px-4 py-2 text-sm font-medium text-on-surface transition hover:bg-surface-container-low sm:flex-none"
              onClick={() => onEdit(task)}
              type="button"
            >
              <Pencil className="h-4 w-4" />
              Edit
            </button>
          </div>
          <button
            className={`inline-flex items-center justify-center gap-2 rounded-lg px-5 py-2.5 text-sm font-medium transition ${
              nextStatus
                ? "bg-primary text-on-primary hover:bg-primary-container"
                : "cursor-not-allowed bg-surface-container-high text-outline"
            }`}
            disabled={!nextStatus || isSubmitting}
            onClick={() => onMove(task)}
            type="button"
          >
            {isSubmitting ? "Moving..." : nextStatus ? `Move to ${statusLabels[nextStatus]}` : "Already done"}
            {nextStatus && <ArrowRight className="h-4 w-4" />}
          </button>
        </footer>
      </section>
    </div>
  );
};

export default TaskDetailModal;
