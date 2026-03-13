import prisma from "../../../../prisma/client";
import type { Employee } from "../../../types/directory";

export async function fetchEmployees(): Promise<Employee[]> {
  const employees = await prisma.employee.findMany({
    include: {
      department: true,
    },
    orderBy: [
      { department: { name: "asc" } },
      { firstName: "asc" },
      { lastName: "asc" },
    ],
  });

  return employees.map((employee) => ({
    firstName: employee.firstName,
    lastName: employee.lastName ?? undefined,
    department: employee.department.name,
  }));
}

export async function fetchDepartments(): Promise<string[]> {
  const departments = await prisma.department.findMany({
    orderBy: { name: "asc" },
  });

  return departments.map((department) => department.name);
}

export async function createEmployee(employee: {
  firstName: string;
  lastName?: string;
  department: string;
}) {
  const department = await prisma.department.findUnique({
    where: { name: employee.department },
  });

  if (!department) {
    throw new Error("Department not found");
  }

  return prisma.employee.create({
    data: {
      firstName: employee.firstName,
      lastName: employee.lastName,
      departmentId: department.id,
    },
    include: {
      department: true,
    },
  });
}