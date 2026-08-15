import { AlertTriangle, CheckCircle2, Circle, Clock3, ListChecks } from "lucide-react";

const TaskStats = ({ tasks }) => {
  const total = tasks.length;
  const todo = tasks.filter((task) => task.status === "todo").length;
  const doing = tasks.filter((task) => task.status === "doing").length;
  const done = tasks.filter((task) => task.status === "done").length;
  const high = tasks.filter((task) => task.priority === "high").length;

  const stats = [
    { label: "Total Tasks", value: total, icon: ListChecks, tone: "text-primary bg-primary/10" },
    { label: "Todo", value: todo, icon: Circle, tone: "text-status-todo-text bg-status-todo-bg" },
    { label: "Doing", value: doing, icon: Clock3, tone: "text-status-doing-text bg-status-doing-bg" },
    { label: "Done", value: done, icon: CheckCircle2, tone: "text-status-done-text bg-status-done-bg" },
    { label: "High Priority", value: high, icon: AlertTriangle, tone: "text-priority-high-text bg-priority-high-bg" },
  ];

  return (
    <section className="grid grid-cols-2 gap-4 lg:grid-cols-5">
      {stats.map((stat) => (
        <article
          className="rounded-lg border border-outline-variant bg-surface-container-lowest p-4"
          key={stat.label}
        >
          <div className="flex items-center gap-3">
            <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${stat.tone}`}>
              <stat.icon className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm text-on-surface-variant">{stat.label}</p>
              <p className="text-2xl font-bold text-on-surface">{stat.value}</p>
            </div>
          </div>
        </article>
      ))}
    </section>
  );
};

export default TaskStats;
