import type { Employee } from "../../../types/directory";
import * as EmployeeModel from "../models/employeeModel";

export type CreateEmployeeResult =
  | { isValid: true; employee: Employee }
  | { isValid: false; field: "firstName" | "department"; errors: string[] };

export function fetchEmployees(): Employee[] {
  return EmployeeModel.fetchEmployees();
}

export function fetchDepartments(): string[] {
  return EmployeeModel.fetchDepartments();
}

export function createEmployee(args: {
  firstName: string;
  lastName?: string;
  department: string;
}): CreateEmployeeResult {
  const firstName = args.firstName.trim();
  const lastName = args.lastName?.trim() || undefined;
  const department = args.department;

  const departments = EmployeeModel.fetchDepartments();

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

  const created = EmployeeModel.createEmployee({
    firstName,
    lastName,
    department,
  });

  return { isValid: true, employee: created };
}