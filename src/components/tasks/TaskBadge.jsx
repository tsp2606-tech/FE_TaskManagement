import { priorityLabels, statusLabels } from "./taskData";

const statusClasses = {
  todo: "bg-status-todo-bg text-status-todo-text border-status-todo-text/15",
  doing: "bg-status-doing-bg text-status-doing-text border-status-doing-text/15",
  done: "bg-status-done-bg text-status-done-text border-status-done-text/15",
};

const priorityClasses = {
  low: "bg-priority-low-bg text-priority-low-text border-priority-low-text/15",
  medium: "bg-priority-medium-bg text-priority-medium-text border-priority-medium-text/15",
  high: "bg-priority-high-bg text-priority-high-text border-priority-high-text/15",
};

const TaskBadge = ({ type, value }) => {
  const isStatus = type === "status";
  const classes = isStatus ? statusClasses[value] : priorityClasses[value];
  const label = isStatus ? statusLabels[value] : priorityLabels[value];

  return (
    <span
      className={`inline-flex items-center rounded-md border px-2 py-1 text-xs font-semibold ${classes}`}
    >
      {label}
    </span>
  );
};

export default TaskBadge;
