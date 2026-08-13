import { prisma } from "./prisma";
import {
  Ticket,
  Priority,
  Status,
  Category,
  toPrismaPriority,
  toPrismaStatus,
  toPrismaCategory,
  fromPrismaPriority,
  fromPrismaStatus,
  fromPrismaCategory,
} from "@/types/ticket";

function mapTicket(record: any): Ticket {
  return {
    id: record.id,
    ticketId: record.ticketId,
    title: record.title,
    description: record.description,
    priority: fromPrismaPriority(record.priority),
    status: fromPrismaStatus(record.status),
    category: fromPrismaCategory(record.category),
    requester: record.requester,
    assignee: record.assignee,
    createdAt: record.createdAt.toISOString(),
    updatedAt: record.updatedAt.toISOString(),
  };
}

export async function getAllTickets(): Promise<Ticket[]> {
  const records = await prisma.ticket.findMany({
    orderBy: { createdAt: "desc" },
  });
  return records.map(mapTicket);
}

export async function getTicketById(ticketId: string): Promise<Ticket | null> {
  const record = await prisma.ticket.findUnique({
    where: { ticketId },
  });
  return record ? mapTicket(record) : null;
}

export async function createTicket(input: {
  title: string;
  description: string;
  priority: Priority;
  category: Category;
  requester: string;
}): Promise<Ticket> {
  // Generate next human-readable ticket ID
  const latest = await prisma.ticket.findFirst({
    orderBy: { createdAt: "desc" },
    select: { ticketId: true },
  });

  let nextNumber = 1001;
  if (latest?.ticketId) {
    const num = parseInt(latest.ticketId.replace("TKT-", ""), 10);
    if (!isNaN(num)) nextNumber = num + 1;
  }

  const record = await prisma.ticket.create({
    data: {
      ticketId: `TKT-${nextNumber}`,
      title: input.title,
      description: input.description,
      priority: toPrismaPriority(input.priority),
      category: toPrismaCategory(input.category),
      requester: input.requester,
      status: "OPEN",
    },
  });

  return mapTicket(record);
}

export async function updateTicket(
  ticketId: string,
  updates: Partial<{
    status: Status;
    priority: Priority;
    assignee: string;
    title: string;
    description: string;
  }>
): Promise<Ticket | null> {
  const data: any = {};

  if (updates.status) data.status = toPrismaStatus(updates.status);
  if (updates.priority) data.priority = toPrismaPriority(updates.priority);
  if (updates.assignee !== undefined) data.assignee = updates.assignee;
  if (updates.title) data.title = updates.title;
  if (updates.description) data.description = updates.description;

  try {
    const record = await prisma.ticket.update({
      where: { ticketId },
      data,
    });
    return mapTicket(record);
  } catch {
    return null;
  }
}

export async function deleteTicket(ticketId: string): Promise<boolean> {
  try {
    await prisma.ticket.delete({
      where: { ticketId },
    });
    return true;
  } catch {
    return false;
  }
}
