import { Ticket } from "@/types/ticket";

const STORAGE_KEY = "support-desk-tickets";

const seedTickets: Ticket[] = [
  {
    id: "TKT-1001",
    title: "Laptop not connecting to dealership Wi-Fi",
    description: "Sales team laptop cannot join the internal network after Windows update.",
    priority: "high",
    status: "open",
    category: "network",
    requester: "Ahmed Al-Rashid",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
  },
  {
    id: "TKT-1002",
    title: "KeyLoop DMS login failure",
    description: "Unable to authenticate into KeyLoop after password reset request.",
    priority: "critical",
    status: "in_progress",
    category: "software",
    requester: "Sarah Khan",
    assignee: "Harshanth",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 26).toISOString(),
    updatedAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
  },
  {
    id: "TKT-1003",
    title: "Printer offline in Service Reception",
    description: "HP LaserJet in service area shows offline. Already checked cables.",
    priority: "medium",
    status: "open",
    category: "hardware",
    requester: "Omar Faisal",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 12).toISOString(),
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 12).toISOString(),
  },
  {
    id: "TKT-1004",
    title: "New user account for workshop technician",
    description: "Need Active Directory account + email for new technician starting Monday.",
    priority: "medium",
    status: "resolved",
    category: "access",
    requester: "HR Department",
    assignee: "Harshanth",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(),
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 8).toISOString(),
  },
];

export function getTickets(): Ticket[] {
  if (typeof window === "undefined") return seedTickets;

  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(seedTickets));
    return seedTickets;
  }

  try {
    return JSON.parse(raw) as Ticket[];
  } catch {
    return seedTickets;
  }
}

export function saveTickets(tickets: Ticket[]): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tickets));
}

export function generateTicketId(existing: Ticket[]): string {
  const numbers = existing
    .map((t) => parseInt(t.id.replace("TKT-", ""), 10))
    .filter((n) => !isNaN(n));
  const next = numbers.length ? Math.max(...numbers) + 1 : 1001;
  return `TKT-${next}`;
}
