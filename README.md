# SupportDesk — Internal IT Ticket System

A clean, production-oriented internal IT support ticket system built with **Next.js 14**, **TypeScript**, and **Tailwind CSS**.

Designed to reflect real-world helpdesk workflows used in enterprise environments (dealerships, hotels, corporate IT teams).

## Features

- Create, view, update and close support tickets
- Priority levels: Low / Medium / High / Critical
- Status workflow: Open → In Progress → Resolved → Closed
- Categories: Hardware, Software, Network, Access, Other
- Dashboard with live stats (open tickets, critical count, resolution rate)
- Search + filter by status, priority and category
- Responsive UI with modern design
- Fully typed with TypeScript
- Clean component architecture

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State**: React hooks + local storage persistence (demo mode)
- **Icons**: Lucide React

## Getting Started

```bash
# Clone the repository
git clone https://github.com/Harshanth0072/support-desk.git
cd support-desk

# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Project Structure

```
src/
├── app/
│   ├── layout.tsx
│   ├── page.tsx              # Dashboard
│   └── globals.css
├── components/
│   ├── DashboardStats.tsx
│   ├── TicketForm.tsx
│   ├── TicketList.tsx
│   ├── TicketCard.tsx
│   └── FilterBar.tsx
├── types/
│   └── ticket.ts
└── lib/
    └── storage.ts            # Local persistence layer
```

## Why this project?

This system was built to demonstrate practical full-stack thinking relevant to IT Support and Systems roles:

- Clear separation of concerns
- Type-safe domain models
- Realistic ticket lifecycle
- Clean, maintainable React patterns
- Focus on usability for internal users

## Future Improvements

- Backend API (Node.js / Express or Next.js Route Handlers + Prisma)
- Real authentication (NextAuth / Clerk)
- Role-based access (Agent vs Requester)
- Email / Slack notifications
- Attachment support
- Audit log

## Author

**Harshanth Anantharajah**  
IT Support Executive · Porsche Centre Oman  
[GitHub](https://github.com/Harshanth0072) · [LinkedIn](https://linkedin.com/in/harshanth-anantharajah-3694a3247)

---

Built with attention to real operational needs, not just as a tutorial exercise.
