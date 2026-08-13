import { NextRequest, NextResponse } from "next/server";
import { getTicketById, updateTicket, deleteTicket } from "@/lib/tickets";
import { Status, Priority } from "@/types/ticket";

interface Params {
  params: { id: string };
}

export async function GET(_request: NextRequest, { params }: Params) {
  try {
    const ticket = await getTicketById(params.id);
    if (!ticket) {
      return NextResponse.json({ error: "Ticket not found" }, { status: 404 });
    }
    return NextResponse.json(ticket);
  } catch (error) {
    console.error("Failed to fetch ticket:", error);
    return NextResponse.json({ error: "Failed to fetch ticket" }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest, { params }: Params) {
  try {
    const body = await request.json();
    const allowed: (keyof typeof body)[] = ["status", "priority", "assignee", "title", "description"];

    const updates: Record<string, string> = {};
    for (const key of allowed) {
      if (body[key] !== undefined) {
        updates[key] = body[key];
      }
    }

    if (Object.keys(updates).length === 0) {
      return NextResponse.json({ error: "No valid fields to update" }, { status: 400 });
    }

    if (updates.status) {
      const valid: Status[] = ["open", "in_progress", "resolved", "closed"];
      if (!valid.includes(updates.status as Status)) {
        return NextResponse.json({ error: "Invalid status" }, { status: 400 });
      }
    }

    if (updates.priority) {
      const valid: Priority[] = ["low", "medium", "high", "critical"];
      if (!valid.includes(updates.priority as Priority)) {
        return NextResponse.json({ error: "Invalid priority" }, { status: 400 });
      }
    }

    const ticket = await updateTicket(params.id, updates);
    if (!ticket) {
      return NextResponse.json({ error: "Ticket not found" }, { status: 404 });
    }

    return NextResponse.json(ticket);
  } catch (error) {
    console.error("Failed to update ticket:", error);
    return NextResponse.json({ error: "Failed to update ticket" }, { status: 500 });
  }
}

export async function DELETE(_request: NextRequest, { params }: Params) {
  try {
    const success = await deleteTicket(params.id);
    if (!success) {
      return NextResponse.json({ error: "Ticket not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to delete ticket:", error);
    return NextResponse.json({ error: "Failed to delete ticket" }, { status: 500 });
  }
}
