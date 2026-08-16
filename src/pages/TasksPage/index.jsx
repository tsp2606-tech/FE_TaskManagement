import { useCallback, useEffect, useMemo, useState } from "react";
import {
  Bell,
  ClipboardList,
  Menu,
  Plus,
  Settings,
  Sparkles,
} from "lucide-react";
import DeleteTaskModal from "../../components/tasks/DeleteTaskModal";
import TaskDetailModal from "../../components/tasks/TaskDetailModal";
import TaskFormModal from "../../components/tasks/TaskFormModal";
import TaskKanban from "../../components/tasks/TaskKanban";
import TaskStats from "../../components/tasks/TaskStats";
import TaskTable from "../../components/tasks/TaskTable";
import TaskToolbar from "../../components/tasks/TaskToolbar";
import {
  TaskEmptyState,
  TaskErrorBanner,
  TaskLoadingState,
  ToastStack,
} from "../../components/tasks/TaskStates";
import { getNextStatus } from "../../components/tasks/taskData";
import {
  createTask,
  deleteTask,
  getTasks,
  updateTask,
  updateTaskStatus,
} from "../../services/api/apiTask";

const navItems = [
  { label: "Tasks", icon: ClipboardList, active: true },
];

const initialFilters = {
  limit: 10,
  page: 1,
  priority: "",
  search: "",
  sortBy: "createdAt",
  sortOrder: "desc",
  status: "",
};

const TasksPage = () => {
  const [view, setView] = useState("list");
  const [modal, setModal] = useState(null);
  const [selectedTask, setSelectedTask] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [filters, setFilters] = useState(initialFilters);
  const [pagination, setPagination] = useState({
    limit: initialFilters.limit,
    page: initialFilters.page,
    total: 0,
    totalPages: 1,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [error, setError] = useState("");
  const [actionError, setActionError] = useState("");
  const [toast, setToast] = useState(null);

  const hasFilters = useMemo(
    () => Boolean(filters.search || filters.status || filters.priority),
    [filters.priority, filters.search, filters.status]
  );

  const showToast = (type, message) => {
    setToast({ type, message });
  };

  const fetchTasks = useCallback(async () => {
    setIsLoading(true);
    setError("");

    try {
      const result = await getTasks(filters);
      const nextTasks = result.data || [];
      setTasks(nextTasks);
      setPagination(
        result.meta?.pagination || {
          limit: filters.limit,
          page: filters.page,
          total: nextTasks.length,
          totalPages: 1,
        }
      );
      setSelectedTask((current) =>
        current ? nextTasks.find((task) => task._id === current._id) || current : current
      );
    } catch (requestError) {
      setError(requestError.message || "Unable to load tasks.");
    } finally {
      setIsLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  useEffect(() => {
    if (!toast) return undefined;

    const timer = window.setTimeout(() => setToast(null), 2800);
    return () => window.clearTimeout(timer);
  }, [toast]);

  const openModal = (modalName, task = selectedTask) => {
    setSelectedTask(task);
    setActionError("");
    setModal(modalName);
  };

  const closeModal = () => setModal(null);

  const updateFilters = (nextFilters) => {
    setFilters((current) => ({
      ...current,
      ...nextFilters,
    }));
  };

  const clearFilters = () => setFilters(initialFilters);

  const handleSubmitTask = async (payload) => {
    setActionError("");
    setActionLoading(true);

    try {
      if (modal === "edit" && selectedTask?._id) {
        await updateTask(selectedTask._id, payload);
        showToast("success", "Task updated successfully.");
      } else {
        await createTask(payload);
        setFilters((current) => ({ ...current, page: 1 }));
        showToast("success", "Task created successfully.");
      }

      closeModal();
      await fetchTasks();
    } catch (requestError) {
      setActionError(requestError.message || "Unable to save task.");
      showToast("error", requestError.message || "Unable to save task.");
    } finally {
      setActionLoading(false);
    }
  };

  const handleDeleteTask = async () => {
    if (!selectedTask?._id) return;

    setActionError("");
    setActionLoading(true);

    try {
      await deleteTask(selectedTask._id);
      closeModal();
      showToast("success", "Task deleted successfully.");
      await fetchTasks();
    } catch (requestError) {
      setActionError(requestError.message || "Unable to delete task.");
      showToast("error", requestError.message || "Unable to delete task.");
    } finally {
      setActionLoading(false);
    }
  };

  const handleMoveTask = async (task) => {
    const nextStatus = getNextStatus(task.status);
    if (!nextStatus) return;

    setActionError("");
    setActionLoading(true);

    try {
      const result = await updateTaskStatus(task._id, nextStatus);
      const updatedTask = result.data;
      setTasks((currentTasks) =>
        currentTasks.map((currentTask) =>
          currentTask._id === updatedTask._id ? updatedTask : currentTask
        )
      );
      setSelectedTask((current) => (current?._id === updatedTask._id ? updatedTask : current));
      showToast("success", "Task status updated successfully.");
    } catch (requestError) {
      setActionError(requestError.message || "Unable to update status.");
      showToast("error", requestError.message || "Unable to update status.");
    } finally {
      setActionLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-on-background">
      <aside className="fixed left-0 top-0 z-30 hidden h-screen w-[260px] flex-col border-r border-outline-variant bg-surface-container-lowest p-4 md:flex">
        <div className="mb-8 flex items-center gap-3 px-3 py-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-on-primary">
            <Sparkles className="h-5 w-5" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-primary">TaskFlow Admin</h1>
            <p className="text-sm text-on-surface-variant">Productivity Tool</p>
          </div>
        </div>

        <nav className="flex flex-1 flex-col gap-2">
          {navItems.map((item) => (
            <a
              className={`flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition ${
                item.active
                  ? "bg-secondary-container text-on-secondary-container"
                  : "text-on-surface-variant hover:bg-surface-container-low hover:text-on-surface"
              }`}
              href="#tasks"
              key={item.label}
            >
              <item.icon className="h-5 w-5" />
              {item.label}
            </a>
          ))}
        </nav>

        <button
          className="mt-auto inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-4 py-3 text-sm font-semibold text-on-primary transition hover:bg-primary-container"
          onClick={() => openModal("add", null)}
          type="button"
        >
          <Plus className="h-4 w-4" />
          Add Task
        </button>
      </aside>

      <div className="flex min-h-screen flex-col md:ml-[260px]">
        <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b border-outline-variant bg-surface-container-lowest px-4 md:px-6">
          <div className="flex items-center gap-3">
            <button className="rounded-md p-2 text-on-surface md:hidden" type="button">
              <Menu className="h-5 w-5" />
            </button>
            <div className="hidden md:block">
              <p className="text-sm font-semibold text-primary">Tasks workspace</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              className="relative rounded-full p-2 text-on-surface-variant transition hover:bg-surface-container-low hover:text-on-surface"
              type="button"
            >
              <Bell className="h-5 w-5" />
              <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-error" />
            </button>
            <button
              className="hidden rounded-full p-2 text-on-surface-variant transition hover:bg-surface-container-low hover:text-on-surface sm:inline-flex"
              type="button"
            >
              <Settings className="h-5 w-5" />
            </button>
          </div>
        </header>

        <main className="flex-1 space-y-6 p-4 md:p-8" id="tasks">
          <section className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <h2 className="text-3xl font-bold text-on-surface">Tasks</h2>
              <p className="mt-1 text-on-surface-variant">
                Manage and track your team's progress.
              </p>
            </div>
            <button
              className="inline-flex w-fit items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-on-primary transition hover:bg-primary-container"
              onClick={() => openModal("add", null)}
              type="button"
            >
              <Plus className="h-4 w-4" />
              Add Task
            </button>
          </section>

          {isLoading ? (
            <TaskLoadingState />
          ) : (
            <>
              <TaskStats tasks={tasks} />
              <TaskToolbar
                filters={filters}
                onFilterChange={updateFilters}
                onViewChange={setView}
                view={view}
              />
              {error ? (
                <TaskErrorBanner message={error} onRetry={fetchTasks} />
              ) : tasks.length === 0 ? (
                <TaskEmptyState
                  filtered={hasFilters}
                  onAction={hasFilters ? clearFilters : () => openModal("add", null)}
                />
              ) : view === "list" ? (
                <TaskTable
                  filters={filters}
                  onDelete={(task) => openModal("delete", task)}
                  onEdit={(task) => openModal("edit", task)}
                  onLimitChange={(limit) => updateFilters({ limit, page: 1 })}
                  onMove={handleMoveTask}
                  onPageChange={(page) => updateFilters({ page })}
                  onView={(task) => openModal("details", task)}
                  pagination={pagination}
                  tasks={tasks}
                />
              ) : (
                <TaskKanban
                  onMove={handleMoveTask}
                  onView={(task) => openModal("details", task)}
                  tasks={tasks}
                />
              )}
            </>
          )}
        </main>
      </div>

      <ToastStack toast={toast} />

      {modal === "add" && (
        <TaskFormModal
          error={actionError}
          isSubmitting={actionLoading}
          mode="add"
          onClose={closeModal}
          onSubmit={handleSubmitTask}
          task={selectedTask}
        />
      )}
      {modal === "edit" && selectedTask && (
        <TaskFormModal
          error={actionError}
          isSubmitting={actionLoading}
          mode="edit"
          onClose={closeModal}
          onSubmit={handleSubmitTask}
          task={selectedTask}
        />
      )}
      {modal === "delete" && selectedTask && (
        <DeleteTaskModal
          error={actionError}
          isSubmitting={actionLoading}
          onClose={closeModal}
          onConfirm={handleDeleteTask}
          task={selectedTask}
        />
      )}
      {modal === "details" && selectedTask && (
        <TaskDetailModal
          error={actionError}
          isSubmitting={actionLoading}
          onClose={closeModal}
          onDelete={(task) => openModal("delete", task)}
          onEdit={(task) => openModal("edit", task)}
          onMove={handleMoveTask}
          task={selectedTask}
        />
      )}
    </div>
  );
};

export default TasksPage;
