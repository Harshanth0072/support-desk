export type Priority = "low" | "medium" | "high" | "critical";
export type Status = "open" | "in_progress" | "resolved" | "closed";
export type Category = "hardware" | "software" | "network" | "access" | "other";

export interface Ticket {
  id: string;          // internal cuid
  ticketId: string;    // human readable TKT-xxxx
  title: string;
  description: string;
  priority: Priority;
  status: Status;
  category: Category;
  requester: string;
  assignee?: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface TicketFilters {
  status?: Status | "all";
  priority?: Priority | "all";
  category?: Category | "all";
  search?: string;
}

// Helpers to convert between Prisma enums and frontend lowercase values
export const toPrismaPriority = (p: Priority) => p.toUpperCase() as any;
export const toPrismaStatus = (s: Status) => s.toUpperCase().replace("-", "_") as any;
export const toPrismaCategory = (c: Category) => c.toUpperCase() as any;

export const fromPrismaPriority = (p: string): Priority => p.toLowerCase() as Priority;
export const fromPrismaStatus = (s: string): Status => s.toLowerCase().replace("_", "-") as Status;
export const fromPrismaCategory = (c: string): Category => c.toLowerCase() as Category;
