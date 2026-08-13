"use client";

import { useEffect, useState, useMemo } from "react";
import { Ticket, TicketFilters, Status, Priority, Category } from "@/types/ticket";
import { getTickets, saveTickets, generateTicketId } from "@/lib/storage";
import DashboardStats from "@/components/DashboardStats";
import TicketForm from "@/components/TicketForm";
import TicketList from "@/components/TicketList";
import FilterBar from "@/components/FilterBar";

export default function HomePage() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [filters, setFilters] = useState<TicketFilters>({
    status: "all",
    priority: "all",
    category: "all",
    search: "",
  });
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    setTickets(getTickets());
  }, []);

  const filteredTickets = useMemo(() => {
    return tickets.filter((t) => {
      if (filters.status && filters.status !== "all" && t.status !== filters.status) return false;
      if (filters.priority && filters.priority !== "all" && t.priority !== filters.priority) return false;
      if (filters.category && filters.category !== "all" && t.category !== filters.category) return false;
      if (filters.search) {
        const q = filters.search.toLowerCase();
        const match =
          t.title.toLowerCase().includes(q) ||
          t.description.toLowerCase().includes(q) ||
          t.id.toLowerCase().includes(q) ||
          t.requester.toLowerCase().includes(q);
        if (!match) return false;
      }
      return true;
    });
  }, [tickets, filters]);

  const handleCreate = (data: {
    title: string;
    description: string;
    priority: Priority;
    category: Category;
    requester: string;
  }) => {
    const now = new Date().toISOString();
    const newTicket: Ticket = {
      id: generateTicketId(tickets),
      ...data,
      status: "open",
      createdAt: now,
      updatedAt: now,
    };
    const updated = [newTicket, ...tickets];
    setTickets(updated);
    saveTickets(updated);
    setShowForm(false);
  };

  const handleStatusChange = (id: string, status: Status) => {
    const updated = tickets.map((t) =>
      t.id === id ? { ...t, status, updatedAt: new Date().toISOString() } : t
    );
    setTickets(updated);
    saveTickets(updated);
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900">Ticket Dashboard</h2>
          <p className="mt-1 text-sm text-slate-500">
            Manage and track internal IT support requests
          </p>
        </div>
        <button
          onClick={() => setShowForm((v) => !v)}
          className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white shadow-sm hover:bg-blue-700 transition-colors"
        >
          {showForm ? "Cancel" : "+ New Ticket"}
        </button>
      </div>

      <DashboardStats tickets={tickets} />

      {showForm && (
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <h3 className="mb-4 text-lg font-semibold">Create New Ticket</h3>
          <TicketForm onSubmit={handleCreate} onCancel={() => setShowForm(false)} />
        </div>
      )}

      <FilterBar filters={filters} onChange={setFilters} />

      <TicketList tickets={filteredTickets} onStatusChange={handleStatusChange} />
    </div>
  );
}
