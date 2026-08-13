import { NextRequest, NextResponse } from "next/server";
import { getAllTickets, createTicket } from "@/lib/tickets";
import { Priority, Category } from "@/types/ticket";

export async function GET() {
  try {
    const tickets = await getAllTickets();
    return NextResponse.json(tickets);
  } catch (error) {
    console.error("Failed to fetch tickets:", error);
    return NextResponse.json({ error: "Failed to fetch tickets" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const { title, description, priority, category, requester } = body;

    if (!title?.trim() || !description?.trim() || !requester?.trim()) {
      return NextResponse.json(
        { error: "Title, description and requester are required" },
        { status: 400 }
      );
    }

    const validPriorities: Priority[] = ["low", "medium", "high", "critical"];
    const validCategories: Category[] = ["hardware", "software", "network", "access", "other"];

    if (!validPriorities.includes(priority) || !validCategories.includes(category)) {
      return NextResponse.json({ error: "Invalid priority or category" }, { status: 400 });
    }

    const ticket = await createTicket({
      title: title.trim(),
      description: description.trim(),
      priority,
      category,
      requester: requester.trim(),
    });

    return NextResponse.json(ticket, { status: 201 });
  } catch (error) {
    console.error("Failed to create ticket:", error);
    return NextResponse.json({ error: "Failed to create ticket" }, { status: 500 });
  }
}
