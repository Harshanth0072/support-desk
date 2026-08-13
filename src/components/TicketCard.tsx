import { Ticket, Status } from "@/types/ticket";
import { formatDistanceToNow } from "date-fns";

interface Props {
  ticket: Ticket;
  onStatusChange: (id: string, status: Status) => void;
}

const priorityStyles: Record<string, string> = {
  low: "bg-slate-100 text-slate-700",
  medium: "bg-blue-100 text-blue-800",
  high: "bg-orange-100 text-orange-800",
  critical: "bg-red-100 text-red-800",
};

const statusStyles: Record<string, string> = {
  open: "bg-sky-100 text-sky-800",
  in_progress: "bg-amber-100 text-amber-800",
  resolved: "bg-emerald-100 text-emerald-800",
  closed: "bg-slate-100 text-slate-600",
};

export default function TicketCard({ ticket, onStatusChange }: Props) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex-1 space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-mono text-xs font-medium text-slate-500">{ticket.id}</span>
            <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${priorityStyles[ticket.priority]}`}>
              {ticket.priority}
            </span>
            <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${statusStyles[ticket.status]}`}>
              {ticket.status.replace("_", " ")}
            </span>
            <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-600 capitalize">
              {ticket.category}
            </span>
          </div>

          <h3 className="text-base font-semibold text-slate-900">{ticket.title}</h3>
          <p className="text-sm text-slate-600 line-clamp-2">{ticket.description}</p>

          <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-500">
            <span>Requester: <strong className="font-medium text-slate-700">{ticket.requester}</strong></span>
            {ticket.assignee && (
              <span>Assignee: <strong className="font-medium text-slate-700">{ticket.assignee}</strong></span>
            )}
            <span>
              Created {formatDistanceToNow(new Date(ticket.createdAt), { addSuffix: true })}
            </span>
          </div>
        </div>

        <div className="flex-shrink-0">
          <select
            value={ticket.status}
            onChange={(e) => onStatusChange(ticket.id, e.target.value as Status)}
            className="rounded-lg border border-slate-300 px-3 py-1.5 text-sm focus:border-blue-500 focus:outline-none"
          >
            <option value="open">Open</option>
            <option value="in_progress">In Progress</option>
            <option value="resolved">Resolved</option>
            <option value="closed">Closed</option>
          </select>
        </div>
      </div>
    </div>
  );
}
