export type Priority = "low" | "medium" | "high" | "critical";
export type Status = "open" | "in_progress" | "resolved" | "closed";
export type Category = "hardware" | "software" | "network" | "access" | "other";

export interface Ticket {
  id: string;
  title: string;
  description: string;
  priority: Priority;
  status: Status;
  category: Category;
  requester: string;
  assignee?: string;
  createdAt: string;
  updatedAt: string;
}

export interface TicketFilters {
  status?: Status | "all";
  priority?: Priority | "all";
  category?: Category | "all";
  search?: string;
}
