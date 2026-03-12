import type { Employee } from "../types/directory";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

async function handleJson<T>(response: Response): Promise<T> {
  const data = await response.json();

  if (!response.ok) {
    throw data;
  }

  return data as T;
}

export async function fetchEmployees(): Promise<Employee[]> {
  const response = await fetch(`${API_BASE_URL}/employees`);
  return handleJson<Employee[]>(response);
}

export async function fetchDepartments(): Promise<string[]> {
  const response = await fetch(`${API_BASE_URL}/employees/departments`);
  return handleJson<string[]>(response);
}

export async function createEmployee(args: {
  firstName: string;
  lastName?: string;
  department: string;
}) {
  const response = await fetch(`${API_BASE_URL}/employees`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(args),
  });

  return handleJson(response);
}