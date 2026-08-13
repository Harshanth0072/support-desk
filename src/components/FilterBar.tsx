import { TicketFilters } from "@/types/ticket";

interface Props {
  filters: TicketFilters;
  onChange: (filters: TicketFilters) => void;
}

export default function FilterBar({ filters, onChange }: Props) {
  return (
    <div className="flex flex-col gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:flex-row sm:items-center">
      <input
        type="text"
        placeholder="Search tickets..."
        value={filters.search || ""}
        onChange={(e) => onChange({ ...filters, search: e.target.value })}
        className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 sm:max-w-xs"
      />

      <select
        value={filters.status || "all"}
        onChange={(e) => onChange({ ...filters, status: e.target.value as any })}
        className="rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
      >
        <option value="all">All Status</option>
        <option value="open">Open</option>
        <option value="in_progress">In Progress</option>
        <option value="resolved">Resolved</option>
        <option value="closed">Closed</option>
      </select>

      <select
        value={filters.priority || "all"}
        onChange={(e) => onChange({ ...filters, priority: e.target.value as any })}
        className="rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
      >
        <option value="all">All Priority</option>
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
        <option value="critical">Critical</option>
      </select>

      <select
        value={filters.category || "all"}
        onChange={(e) => onChange({ ...filters, category: e.target.value as any })}
        className="rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
      >
        <option value="all">All Categories</option>
        <option value="hardware">Hardware</option>
        <option value="software">Software</option>
        <option value="network">Network</option>
        <option value="access">Access</option>
        <option value="other">Other</option>
      </select>
    </div>
  );
}
