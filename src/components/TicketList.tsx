import { Ticket, Status } from "@/types/ticket";
import TicketCard from "./TicketCard";

interface Props {
  tickets: Ticket[];
  onStatusChange: (id: string, status: Status) => void;
}

export default function TicketList({ tickets, onStatusChange }: Props) {
  if (tickets.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-slate-300 bg-white py-16 text-center">
        <p className="text-slate-500">No tickets match the current filters.</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {tickets.map((ticket) => (
        <TicketCard key={ticket.id} ticket={ticket} onStatusChange={onStatusChange} />
      ))}
    </div>
  );
}
