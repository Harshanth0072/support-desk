# SupportDesk

Internal IT Support Ticket System built for real operational workflows.

A full-stack application that manages support tickets with priority levels, status tracking, categories, and filtering. Designed around the kind of day-to-day IT support work done in dealerships and corporate environments.

**Live Demo:** 

---

## Features

- Create, view, update and close support tickets
- Priority levels: Low / Medium / High / Critical
- Status workflow: Open → In Progress → Resolved → Closed
- Categories: Hardware, Software, Network, Access, Other
- Dashboard with live stats
- Search + filter by status, priority and category
- Optimistic UI updates
- REST API backend

## Tech Stack

| Layer        | Technology                  |
|--------------|-----------------------------|
| Frontend     | Next.js 14 (App Router)     |
| Language     | TypeScript                  |
| Styling      | Tailwind CSS                |
| Backend      | Next.js Route Handlers      |
| Persistence  | JSON file store (server)    |
| Icons        | Lucide React                |

## Architecture

```
src/
├── app/
│   ├── api/
│   │   └── tickets/
│   │       ├── route.ts          # GET all, POST create
│   │       └── [id]/route.ts     # GET / PATCH / DELETE by id
│   ├── layout.tsx
│   └── page.tsx                 # Dashboard (client)
├── components/
│   ├── DashboardStats.tsx
│   ├── FilterBar.tsx
│   ├── TicketCard.tsx
│   ├── TicketForm.tsx
│   └── TicketList.tsx
├── lib/
│   └── tickets.ts               # Server-side data access layer
└── types/
    └── ticket.ts

data/
└── tickets.json                  # Persistent ticket store
```

### API Endpoints

| Method | Endpoint            | Description              |
|--------|---------------------|--------------------------|
| GET    | `/api/tickets`      | List all tickets         |
| POST   | `/api/tickets`      | Create a new ticket      |
| GET    | `/api/tickets/[id]` | Get single ticket        |
| PATCH  | `/api/tickets/[id]` | Update ticket fields     |
| DELETE | `/api/tickets/[id]` | Delete a ticket          |

## Getting Started

```bash
git clone https://github.com/Harshanth0072/support-desk.git
cd support-desk
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Design Decisions

- **Server-side persistence** instead of localStorage so the data layer is real and can be swapped for a database later.
- **Optimistic updates** on status changes for better UX.
- **Typed domain model** (`Ticket`, `Priority`, `Status`, `Category`) kept separate from UI.
- **Clear separation** between API routes, data access layer (`lib/tickets.ts`), and React components.

## Limitations (Current)

- Persistence uses a JSON file on the server (fine for local/demo use).
- No authentication yet.
- Single-user for now (no role-based access).

These are intentional starting points. The architecture is structured so each of them can be replaced without rewriting the whole app.

## Roadmap

- [ ] Replace JSON store with Prisma + SQLite / PostgreSQL
- [ ] Add authentication (NextAuth or Clerk)
- [ ] Role-based access (Requester vs Agent)
- [ ] Email / Slack notifications on status change
- [ ] File attachments
- [ ] Activity / audit log

## Author

**Harshanth Anantharajah**  
IT Support Executive · Porsche Centre Oman  
[GitHub](https://github.com/Harshanth0072) · [LinkedIn](https://www.linkedin.com/in/harshanth-anantharajah-3694a3247)

---

Built to reflect real IT support workflows, not as a tutorial exercise.
