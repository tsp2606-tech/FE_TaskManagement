import { ClipboardList, RefreshCcw, SearchX, TriangleAlert } from "lucide-react";

const Shimmer = ({ className = "" }) => (
  <div className={`animate-pulse rounded bg-surface-container-high ${className}`} />
);

export const TaskLoadingState = () => (
  <section className="space-y-4">
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-5">
      {Array.from({ length: 5 }).map((_, index) => (
        <div className="rounded-lg border border-outline-variant bg-surface-container-lowest p-4" key={index}>
          <Shimmer className="mb-3 h-10 w-10" />
          <Shimmer className="mb-2 h-4 w-24" />
          <Shimmer className="h-6 w-12" />
        </div>
      ))}
    </div>
    <div className="rounded-lg border border-outline-variant bg-surface-container-lowest p-4">
      <Shimmer className="mb-4 h-10 w-full max-w-xl" />
      {Array.from({ length: 5 }).map((_, index) => (
        <div className="grid grid-cols-12 gap-4 border-t border-outline-variant p-4" key={index}>
          <Shimmer className="col-span-5 h-6" />
          <Shimmer className="col-span-2 h-6" />
          <Shimmer className="col-span-2 h-6" />
          <Shimmer className="col-span-2 h-6" />
          <Shimmer className="col-span-1 h-6" />
        </div>
      ))}
    </div>
  </section>
);

export const TaskTableLoadingState = () => (
  <section className="overflow-hidden rounded-lg border border-outline-variant bg-surface-container-lowest">
    <div className="border-b border-outline-variant bg-surface-container-low px-4 py-3">
      <div className="grid grid-cols-12 gap-4">
        <Shimmer className="col-span-4 h-5" />
        <Shimmer className="col-span-2 h-5" />
        <Shimmer className="col-span-2 h-5" />
        <Shimmer className="col-span-2 h-5" />
        <Shimmer className="col-span-2 h-5" />
      </div>
    </div>
    {Array.from({ length: 6 }).map((_, index) => (
      <div className="grid grid-cols-12 gap-4 border-b border-outline-variant p-4" key={index}>
        <div className="col-span-4 space-y-2">
          <Shimmer className="h-5 w-3/4" />
          <Shimmer className="h-4 w-full" />
        </div>
        <Shimmer className="col-span-2 h-6" />
        <Shimmer className="col-span-2 h-6" />
        <Shimmer className="col-span-2 h-6" />
        <Shimmer className="col-span-2 h-6" />
      </div>
    ))}
  </section>
);

export const TaskEmptyState = ({ filtered = false, onAction }) => (
  <section className="flex min-h-[360px] flex-col items-center justify-center rounded-lg border border-dashed border-outline-variant bg-surface-container-lowest p-10 text-center">
    <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-lg bg-surface-container text-outline">
      {filtered ? <SearchX className="h-8 w-8" /> : <ClipboardList className="h-8 w-8" />}
    </div>
    <h3 className="text-xl font-bold text-on-surface">
      {filtered ? "No tasks match your filters" : "No tasks yet"}
    </h3>
    <p className="mt-2 max-w-sm text-on-surface-variant">
      {filtered
        ? "Try changing the status, priority, or search keyword."
        : "Create your first task to start tracking progress."}
    </p>
    <button
      className="mt-6 rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-on-primary"
      onClick={onAction}
      type="button"
    >
      {filtered ? "Clear Filters" : "Add Task"}
    </button>
  </section>
);

export const TaskErrorBanner = ({ message, onRetry }) => (
  <section className="flex flex-col gap-4 rounded-lg border border-error/20 bg-error-container p-4 sm:flex-row sm:items-start">
    <TriangleAlert className="h-5 w-5 shrink-0 text-error" />
    <div className="flex-1">
      <h3 className="font-semibold text-on-error-container">Unable to load tasks.</h3>
      <p className="mt-1 text-sm text-on-error-container/80">
        {message || "Check your connection or try again."}
      </p>
    </div>
    <button
      className="inline-flex items-center justify-center gap-2 rounded-lg border border-error/20 bg-surface-container-lowest px-4 py-2 text-sm font-semibold text-error transition hover:bg-error/5"
      onClick={onRetry}
      type="button"
    >
      <RefreshCcw className="h-4 w-4" />
      Retry
    </button>
  </section>
);

export const ToastStack = ({ toast }) => {
  if (!toast) return null;

  const tone =
    toast.type === "error"
      ? "border-error bg-error-container text-on-error-container"
      : "border-status-done-text bg-inverse-surface text-inverse-on-surface";

  return (
    <div className="fixed bottom-6 right-6 z-40 hidden flex-col gap-3 md:flex">
      <div className={`w-80 rounded-lg border-l-4 px-4 py-3 shadow-lg ${tone}`}>
        <p className="text-sm font-medium">{toast.message}</p>
      </div>
    </div>
  );
};
