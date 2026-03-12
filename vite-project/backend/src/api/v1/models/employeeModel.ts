import employeesJson from "../../../data/employees.json";
import type { Employee } from "../../../types/directory";

// mock database
let employees: Employee[] = [...(employeesJson as Employee[])];

const departments: string[] = Array.from(
  new Set(employees.map((e) => e.department))
).sort((a, b) => a.localeCompare(b));

export function fetchEmployees(): Employee[] {
  return employees;
}

export function fetchDepartments(): string[] {
  return departments;
}

export function createEmployee(employee: Employee): Employee {
  employees = [...employees, employee];
  return employee;
}