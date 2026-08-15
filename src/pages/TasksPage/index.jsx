import { useState } from "react";
import {
  Bell,
  CalendarDays,
  ClipboardList,
  LayoutDashboard,
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
import { ToastStack } from "../../components/tasks/TaskStates";
import { mockTasks } from "../../components/tasks/taskData";

const navItems = [
  { label: "Dashboard", icon: LayoutDashboard },
  { label: "Tasks", icon: ClipboardList, active: true },
  { label: "Calendar", icon: CalendarDays },
  { label: "Settings", icon: Settings },
];

const TasksPage = () => {
  const [view, setView] = useState("list");
  const [modal, setModal] = useState(null);
  const [selectedTask, setSelectedTask] = useState(mockTasks[0]);

  const openModal = (modalName, task = selectedTask) => {
    setSelectedTask(task);
    setModal(modalName);
  };

  const closeModal = () => setModal(null);

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
          onClick={() => openModal("add", mockTasks[0])}
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
            <div className="ml-2 flex h-9 w-9 items-center justify-center rounded-full border border-outline-variant bg-surface-variant text-sm font-bold text-on-surface">
              TF
            </div>
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
              onClick={() => openModal("add", mockTasks[0])}
              type="button"
            >
              <Plus className="h-4 w-4" />
              Add Task
            </button>
          </section>

          <TaskStats tasks={mockTasks} />
          <TaskToolbar onViewChange={setView} view={view} />

          {view === "list" ? (
            <TaskTable
              onDelete={(task) => openModal("delete", task)}
              onEdit={(task) => openModal("edit", task)}
              onMove={(task) => openModal("details", task)}
              onView={(task) => openModal("details", task)}
              tasks={mockTasks}
            />
          ) : (
            <TaskKanban
              onMove={(task) => openModal("details", task)}
              onView={(task) => openModal("details", task)}
              tasks={mockTasks}
            />
          )}
        </main>
      </div>

      <ToastStack />

      {modal === "add" && <TaskFormModal mode="add" onClose={closeModal} task={selectedTask} />}
      {modal === "edit" && <TaskFormModal mode="edit" onClose={closeModal} task={selectedTask} />}
      {modal === "delete" && <DeleteTaskModal onClose={closeModal} task={selectedTask} />}
      {modal === "details" && (
        <TaskDetailModal
          onClose={closeModal}
          onDelete={(task) => openModal("delete", task)}
          onEdit={(task) => openModal("edit", task)}
          task={selectedTask}
        />
      )}
    </div>
  );
};

export default TasksPage;
