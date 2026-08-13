import { Ticket } from "@/types/ticket";
import { AlertCircle, CheckCircle2, Clock, Ticket as TicketIcon } from "lucide-react";

interface Props {
  tickets: Ticket[];
}

export default function DashboardStats({ tickets }: Props) {
  const open = tickets.filter((t) => t.status === "open").length;
  const inProgress = tickets.filter((t) => t.status === "in_progress").length;
  const critical = tickets.filter((t) => t.priority === "critical" && t.status !== "closed" && t.status !== "resolved").length;
  const resolved = tickets.filter((t) => t.status === "resolved" || t.status === "closed").length;

  const stats = [
    {
      label: "Open Tickets",
      value: open,
      icon: TicketIcon,
      color: "text-blue-600 bg-blue-50",
    },
    {
      label: "In Progress",
      value: inProgress,
      icon: Clock,
      color: "text-amber-600 bg-amber-50",
    },
    {
      label: "Critical",
      value: critical,
      icon: AlertCircle,
      color: "text-red-600 bg-red-50",
    },
    {
      label: "Resolved",
      value: resolved,
      icon: CheckCircle2,
      color: "text-emerald-600 bg-emerald-50",
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500">{stat.label}</p>
              <p className="mt-1 text-3xl font-bold tracking-tight">{stat.value}</p>
            </div>
            <div className={`rounded-lg p-2.5 ${stat.color}`}>
              <stat.icon className="h-5 w-5" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
