export const taskStatuses = ["todo", "doing", "done"];
export const taskPriorities = ["low", "medium", "high"];

export const mockTasks = [
  {
    _id: "TSK-1042",
    title: "Update Authentication Flow",
    description:
      "Review session timeout, refresh-token handling, and mobile login copy before the next sprint review.",
    status: "todo",
    priority: "high",
    dueDate: "2026-08-20T00:00:00.000Z",
    createdAt: "2026-08-16T08:00:00.000Z",
    updatedAt: "2026-08-16T08:00:00.000Z",
  },
  {
    _id: "TSK-1041",
    title: "Design Database Schema",
    description:
      "Finalize collection indexes and document the task status transition rules for backend validation.",
    status: "doing",
    priority: "medium",
    dueDate: "2026-08-22T00:00:00.000Z",
    createdAt: "2026-08-15T09:00:00.000Z",
    updatedAt: "2026-08-16T10:00:00.000Z",
  },
  {
    _id: "TSK-1038",
    title: "Setup CI/CD Pipeline",
    description:
      "Add production build checks and configure the deployment workflow for Railway previews.",
    status: "done",
    priority: "low",
    dueDate: "2026-08-18T00:00:00.000Z",
    createdAt: "2026-08-14T11:00:00.000Z",
    updatedAt: "2026-08-16T11:00:00.000Z",
  },
  {
    _id: "TSK-1045",
    title: "Migrate Legacy Data",
    description:
      "Prepare a dry-run migration plan and verify fallback steps for task records created before schema v2.",
    status: "todo",
    priority: "high",
    dueDate: "2026-08-17T00:00:00.000Z",
    createdAt: "2026-08-16T12:00:00.000Z",
    updatedAt: "2026-08-16T12:00:00.000Z",
  },
  {
    _id: "TSK-1046",
    title: "Write API Test Collection",
    description:
      "Create HTTP examples covering list filters, detail lookup, updates, deletes, and status patching.",
    status: "doing",
    priority: "medium",
    dueDate: "2026-08-24T00:00:00.000Z",
    createdAt: "2026-08-16T13:00:00.000Z",
    updatedAt: "2026-08-16T14:30:00.000Z",
  },
];

export const statusLabels = {
  todo: "Todo",
  doing: "Doing",
  done: "Done",
};

export const priorityLabels = {
  low: "Low",
  medium: "Medium",
  high: "High",
};

export const getNextStatus = (status) => {
  if (status === "todo") return "doing";
  if (status === "doing") return "done";
  return null;
};

export const formatDate = (date) => {
  if (!date) return "No due date";

  const parsedDate = new Date(date);
  if (Number.isNaN(parsedDate.getTime())) return "Invalid date";

  return new Intl.DateTimeFormat("en", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(parsedDate);
};

export const isOverdue = (date, status) =>
  Boolean(date) && status !== "done" && new Date(date) < new Date();
