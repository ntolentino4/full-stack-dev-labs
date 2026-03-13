import type { Employee } from "../../../types/directory";
import * as EmployeeModel from "../models/employeeModel";

export type CreateEmployeeResult =
  | { isValid: true; employee: Employee }
  | { isValid: false; field: "firstName" | "department"; errors: string[] };

export async function fetchEmployees(): Promise<Employee[]> {
  return EmployeeModel.fetchEmployees();
}

export async function fetchDepartments(): Promise<string[]> {
  return EmployeeModel.fetchDepartments();
}

export async function createEmployee(args: {
  firstName: string;
  lastName?: string;
  department: string;
}): Promise<CreateEmployeeResult> {
  const firstName = args.firstName.trim();
  const lastName = args.lastName?.trim() || undefined;
  const department = args.department;

  const departments = await EmployeeModel.fetchDepartments();

  if (!departments.includes(department)) {
    return {
      isValid: false,
      field: "department",
      errors: ["Please select an existing department."],
    };
  }

  if (firstName.length < 3) {
    return {
      isValid: false,
      field: "firstName",
      errors: ["First name must be at least 3 characters."],
    };
  }

  const created = await EmployeeModel.createEmployee({
    firstName,
    lastName,
    department,
  });

  return {
    isValid: true,
    employee: {
      firstName: created.firstName,
      lastName: created.lastName ?? undefined,
      department: created.department.name,
    },
  };
}