# SupportDesk

Internal IT Support Ticket System with real database persistence.

Full-stack application built with **Next.js 14**, **TypeScript**, **Prisma**, and **PostgreSQL**. Designed around real IT support workflows used in dealerships and corporate environments.

**Live Demo:** *(Add your Vercel link here after deploying)*

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
- Persistent PostgreSQL database via Prisma

## Tech Stack

| Layer        | Technology                          |
|--------------|-------------------------------------|
| Frontend     | Next.js 14 (App Router) + TypeScript |
| Styling      | Tailwind CSS                        |
| Backend      | Next.js Route Handlers              |
| ORM          | Prisma                              |
| Database     | PostgreSQL (Vercel Postgres / Neon / Supabase) |
| Icons        | Lucide React                        |

## Architecture

```
src/
├── app/
│   ├── api/tickets/          # REST API
│   ├── layout.tsx
│   └── page.tsx              # Dashboard
├── components/               # UI components
├── lib/
│   ├── prisma.ts             # Prisma client singleton
│   └── tickets.ts            # Data access layer
└── types/ticket.ts

prisma/
├── schema.prisma
└── seed.ts
```

## Getting Started (Local)

### 1. Clone & install

```bash
git clone https://github.com/Harshanth0072/support-desk.git
cd support-desk
npm install
```

### 2. Set up the database

Create a free PostgreSQL database (recommended options):

- [Vercel Postgres](https://vercel.com/storage/postgres) (easiest if deploying to Vercel)
- [Neon](https://neon.tech) (free tier, excellent)
- [Supabase](https://supabase.com) (free tier)

Copy the connection string, then:

```bash
cp .env.example .env
# Edit .env and paste your DATABASE_URL
```

### 3. Push schema & seed data

```bash
npx prisma db push
npm run db:seed
```

### 4. Run the app

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## Deploy to Vercel + Vercel Postgres

1. Push this repo to GitHub (already done).
2. Go to [vercel.com](https://vercel.com) → **Add New Project** → Import `support-desk`.
3. In the project, go to **Storage** → **Create Database** → **Postgres**.
4. Connect the database to your project. Vercel automatically adds `DATABASE_URL`.
5. Redeploy the project (or trigger a new deployment).
6. After deploy, run the seed once:

```bash
# From your local machine with the production DATABASE_URL
npx prisma db push
npm run db:seed
```

Or use Vercel CLI:

```bash
npx vercel env pull .env.local
npx prisma db push
npm run db:seed
```

---

## API Endpoints

| Method | Endpoint            | Description          |
|--------|---------------------|----------------------|
| GET    | `/api/tickets`      | List all tickets     |
| POST   | `/api/tickets`      | Create ticket        |
| GET    | `/api/tickets/[id]` | Get single ticket    |
| PATCH  | `/api/tickets/[id]` | Update ticket        |
| DELETE | `/api/tickets/[id]` | Delete ticket        |

---

## Author

**Harshanth Anantharajah**  
IT Support Executive · Porsche Centre Oman  
[GitHub](https://github.com/Harshanth0072) · [LinkedIn](https://www.linkedin.com/in/harshanth-anantharajah-3694a3247)

---

Built to reflect real IT support workflows with a proper database layer.
