import { promises as fs } from "fs";
import path from "path";
import { Ticket, Priority, Status, Category } from "@/types/ticket";

const DATA_FILE = path.join(process.cwd(), "data", "tickets.json");

const seedTickets: Ticket[] = [
  {
    id: "TKT-1001",
    title: "Laptop not connecting to dealership Wi-Fi",
    description: "Sales team laptop cannot join the internal network after Windows update. Already tried forgetting the network.",
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
    description: "Unable to authenticate into KeyLoop after password reset request. Error: Invalid credentials.",
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
    description: "HP LaserJet in service area shows offline. Cables checked, power cycled, still offline.",
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

async function ensureDataFile(): Promise<void> {
  try {
    await fs.access(DATA_FILE);
  } catch {
    await fs.mkdir(path.dirname(DATA_FILE), { recursive: true });
    await fs.writeFile(DATA_FILE, JSON.stringify(seedTickets, null, 2), "utf-8");
  }
}

export async function getAllTickets(): Promise<Ticket[]> {
  await ensureDataFile();
  const raw = await fs.readFile(DATA_FILE, "utf-8");
  return JSON.parse(raw) as Ticket[];
}

export async function getTicketById(id: string): Promise<Ticket | null> {
  const tickets = await getAllTickets();
  return tickets.find((t) => t.id === id) ?? null;
}

export async function createTicket(input: {
  title: string;
  description: string;
  priority: Priority;
  category: Category;
  requester: string;
}): Promise<Ticket> {
  const tickets = await getAllTickets();

  const numbers = tickets
    .map((t) => parseInt(t.id.replace("TKT-", ""), 10))
    .filter((n) => !isNaN(n));
  const next = numbers.length ? Math.max(...numbers) + 1 : 1001;

  const now = new Date().toISOString();
  const newTicket: Ticket = {
    id: `TKT-${next}`,
    ...input,
    status: "open",
    createdAt: now,
    updatedAt: now,
  };

  const updated = [newTicket, ...tickets];
  await fs.writeFile(DATA_FILE, JSON.stringify(updated, null, 2), "utf-8");
  return newTicket;
}

export async function updateTicket(
  id: string,
  updates: Partial<Pick<Ticket, "status" | "priority" | "assignee" | "title" | "description">>
): Promise<Ticket | null> {
  const tickets = await getAllTickets();
  const index = tickets.findIndex((t) => t.id === id);
  if (index === -1) return null;

  tickets[index] = {
    ...tickets[index],
    ...updates,
    updatedAt: new Date().toISOString(),
  };

  await fs.writeFile(DATA_FILE, JSON.stringify(tickets, null, 2), "utf-8");
  return tickets[index];
}

export async function deleteTicket(id: string): Promise<boolean> {
  const tickets = await getAllTickets();
  const filtered = tickets.filter((t) => t.id !== id);
  if (filtered.length === tickets.length) return false;

  await fs.writeFile(DATA_FILE, JSON.stringify(filtered, null, 2), "utf-8");
  return true;
}
