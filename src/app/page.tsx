"use client";

import { useEffect, useState, useMemo, useCallback } from "react";
import { Ticket, TicketFilters, Status, Priority, Category } from "@/types/ticket";
import DashboardStats from "@/components/DashboardStats";
import TicketForm from "@/components/TicketForm";
import TicketList from "@/components/TicketList";
import FilterBar from "@/components/FilterBar";

export default function HomePage() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<TicketFilters>({
    status: "all",
    priority: "all",
    category: "all",
    search: "",
  });
  const [showForm, setShowForm] = useState(false);

  const fetchTickets = useCallback(async () => {
    try {
      setError(null);
      const res = await fetch("/api/tickets");
      if (!res.ok) throw new Error("Failed to load tickets");
      const data = await res.json();
      setTickets(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTickets();
  }, [fetchTickets]);

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
          t.ticketId.toLowerCase().includes(q) ||
          t.requester.toLowerCase().includes(q);
        if (!match) return false;
      }
      return true;
    });
  }, [tickets, filters]);

  const handleCreate = async (data: {
    title: string;
    description: string;
    priority: Priority;
    category: Category;
    requester: string;
  }) => {
    try {
      const res = await fetch("/api/tickets", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Failed to create ticket");
      }

      const newTicket = await res.json();
      setTickets((prev) => [newTicket, ...prev]);
      setShowForm(false);
    } catch (err) {
      alert(err instanceof Error ? err.message : "Failed to create ticket");
    }
  };

  const handleStatusChange = async (ticketId: string, status: Status) => {
    // Optimistic update
    setTickets((prev) =>
      prev.map((t) =>
        t.ticketId === ticketId ? { ...t, status, updatedAt: new Date().toISOString() } : t
      )
    );

    try {
      const res = await fetch(`/api/tickets/${ticketId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });

      if (!res.ok) {
        await fetchTickets();
        throw new Error("Failed to update status");
      }

      const updated = await res.json();
      setTickets((prev) => prev.map((t) => (t.ticketId === ticketId ? updated : t)));
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-32">
        <div className="text-slate-500">Loading tickets...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-xl border border-red-200 bg-red-50 p-6 text-center">
        <p className="text-red-700 font-medium">{error}</p>
        <button
          onClick={fetchTickets}
          className="mt-3 text-sm text-red-600 underline hover:no-underline"
        >
          Try again
        </button>
      </div>
    );
  }

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
