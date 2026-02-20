import type { Employee } from "../types/directory";
import * as EmployeeRepo from "../apis/employeeRepo";

// These Service functions handle the business logic of our application.

export type CreateEmployeeResult =
  | { isValid: true; employee: Employee }
  | { isValid: false; field: "firstName" | "department"; errors: string[] };

// A request to get all employees from the repository.
export function fetchEmployees(): Employee[] {
  return EmployeeRepo.fetchEmployees();
}

// A request to get all departments from the repository.
export function fetchDepartments(): string[] {
  return EmployeeRepo.fetchDepartments();
}

/**
 * Business logic: to create an employee.
 * - department must exist
 * - first name must have at least 3 characters
 * If valid, invoke repo createEmployee().
 * If invalid, return errors so presentation (hook/component) can display them.
 */
export function createEmployee(args: {
  firstName: string;
  lastName?: string;
  department: string;
}): CreateEmployeeResult {
  const firstName = args.firstName.trim();
  const lastName = args.lastName?.trim() || undefined;
  const department = args.department;

  const departments = EmployeeRepo.fetchDepartments();

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

  const employee: Employee = {
    firstName,
    lastName,
    department,
  };

  const created = EmployeeRepo.createEmployee(employee);
  return { isValid: true, employee: created };
}