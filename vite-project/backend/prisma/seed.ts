import { PrismaClient } from "@prisma/client";
import employeesJson from "../src/data/employees.json";
import { roles } from "../src/data/roles";

const prisma = new PrismaClient();

function splitName(fullName: string): { firstName: string; lastName?: string } {
  const cleaned = fullName.replace(/\(.*?\)/g, "").trim();
  const parts = cleaned.split(/\s+/);

  if (parts.length <= 1) {
    return { firstName: cleaned };
  }

  return {
    firstName: parts[0],
    lastName: parts.slice(1).join(" "),
  };
}

async function main() {
  await prisma.roleOccupant.deleteMany();
  await prisma.role.deleteMany();
  await prisma.employee.deleteMany();
  await prisma.department.deleteMany();

  const departmentNames = Array.from(
    new Set((employeesJson as { department: string }[]).map((e) => e.department))
  ).sort((a, b) => a.localeCompare(b));

  await prisma.department.createMany({
    data: departmentNames.map((name) => ({ name })),
  });

  const departments = await prisma.department.findMany();
  const departmentIdByName = new Map(departments.map((d) => [d.name, d.id]));

  await prisma.employee.createMany({
    data: (employeesJson as {
      firstName: string;
      lastName?: string;
      department: string;
    }[]).map((e) => ({
      firstName: e.firstName,
      lastName: e.lastName,
      departmentId: departmentIdByName.get(e.department)!,
    })),
  });

  for (const entry of roles) {
    const createdRole = await prisma.role.create({
      data: {
        title: entry.role,
      },
    });

    const { firstName, lastName } = splitName(entry.name);

    await prisma.roleOccupant.create({
      data: {
        firstName,
        lastName,
        roleId: createdRole.id,
      },
    });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
    console.log("Seed completed.");
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });