import type { Role } from "../types/role";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

async function handleJson<T>(response: Response): Promise<T> {
  const data = await response.json();

  if (!response.ok) {
    throw data;
  }

  return data as T;
}

export async function fetchRoles(): Promise<Role[]> {
  const response = await fetch(`${API_BASE_URL}/roles`);
  return handleJson<Role[]>(response);
}

export async function createRole(args: {
  firstName: string;
  lastName?: string;
  role: string;
}) {
  const response = await fetch(`${API_BASE_URL}/roles`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(args),
  });

  return handleJson(response);
}