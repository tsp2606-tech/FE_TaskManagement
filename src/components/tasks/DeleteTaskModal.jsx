import { Trash2, TriangleAlert, X } from "lucide-react";

const DeleteTaskModal = ({ onClose, task }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-on-background/40 p-4 backdrop-blur-sm">
      <section className="w-full max-w-md overflow-hidden rounded-lg border border-outline-variant bg-surface-container-lowest shadow-2xl">
        <header className="flex items-start justify-between px-6 pb-4 pt-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-error-container text-error">
              <TriangleAlert className="h-5 w-5" />
            </div>
            <h2 className="text-xl font-bold text-on-surface">Delete Task</h2>
          </div>
          <button
            className="rounded-md p-2 text-on-surface-variant transition hover:bg-surface-container-low hover:text-on-surface"
            onClick={onClose}
            type="button"
          >
            <X className="h-5 w-5" />
          </button>
        </header>

        <div className="px-6 pb-6">
          <p className="text-on-surface-variant">
            Are you sure you want to delete{" "}
            <strong className="font-semibold text-on-surface">"{task.title}"</strong>? This
            action cannot be undone.
          </p>
          <p className="mt-4 rounded-lg border border-error/20 bg-error-container/35 p-3 text-sm text-on-error-container">
            Task not found or already deleted.
          </p>
        </div>

        <footer className="flex justify-end gap-3 border-t border-outline-variant bg-surface-container-low px-6 py-4">
          <button
            className="rounded-lg border border-outline-variant bg-surface-container-lowest px-4 py-2 text-sm font-medium text-on-surface transition hover:bg-surface-container-high"
            onClick={onClose}
            type="button"
          >
            Cancel
          </button>
          <button
            className="inline-flex items-center gap-2 rounded-lg bg-error px-4 py-2 text-sm font-medium text-on-error shadow-sm transition hover:bg-on-error-container"
            type="button"
          >
            <Trash2 className="h-4 w-4" />
            Delete Task
          </button>
        </footer>
      </section>
    </div>
  );
};

export default DeleteTaskModal;
