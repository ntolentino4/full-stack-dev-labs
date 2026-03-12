import type { Employee } from "../types/directory";
import * as EmployeeRepo from "../apis/employeeRepo";

export async function fetchEmployees(): Promise<Employee[]> {
  return EmployeeRepo.fetchEmployees();
}

export async function fetchDepartments(): Promise<string[]> {
  return EmployeeRepo.fetchDepartments();
}

export async function createEmployee(args: {
  firstName: string;
  lastName?: string;
  department: string;
}) {
  return EmployeeRepo.createEmployee({
    firstName: args.firstName.trim(),
    lastName: args.lastName?.trim() || undefined,
    department: args.department,
  });
}