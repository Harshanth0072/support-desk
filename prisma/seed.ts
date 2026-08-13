import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Clear existing data
  await prisma.ticket.deleteMany();

  await prisma.ticket.createMany({
    data: [
      {
        ticketId: "TKT-1001",
        title: "Laptop not connecting to dealership Wi-Fi",
        description: "Sales team laptop cannot join the internal network after Windows update. Already tried forgetting the network.",
        priority: "HIGH",
        status: "OPEN",
        category: "NETWORK",
        requester: "Ahmed Al-Rashid",
      },
      {
        ticketId: "TKT-1002",
        title: "KeyLoop DMS login failure",
        description: "Unable to authenticate into KeyLoop after password reset request. Error: Invalid credentials.",
        priority: "CRITICAL",
        status: "IN_PROGRESS",
        category: "SOFTWARE",
        requester: "Sarah Khan",
        assignee: "Harshanth",
      },
      {
        ticketId: "TKT-1003",
        title: "Printer offline in Service Reception",
        description: "HP LaserJet in service area shows offline. Cables checked, power cycled, still offline.",
        priority: "MEDIUM",
        status: "OPEN",
        category: "HARDWARE",
        requester: "Omar Faisal",
      },
      {
        ticketId: "TKT-1004",
        title: "New user account for workshop technician",
        description: "Need Active Directory account + email for new technician starting Monday.",
        priority: "MEDIUM",
        status: "RESOLVED",
        category: "ACCESS",
        requester: "HR Department",
        assignee: "Harshanth",
      },
    ],
  });

  console.log("Seeded 4 tickets successfully.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
