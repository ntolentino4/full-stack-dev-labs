import type { Request, Response } from "express";
import * as EmployeeService from "../services/employeeService";

export async function getEmployees(_req: Request, res: Response) {
  const employees = await EmployeeService.fetchEmployees();
  res.json(employees);
}

export async function getDepartments(_req: Request, res: Response) {
  const departments = await EmployeeService.fetchDepartments();
  res.json(departments);
}

export async function postEmployee(req: Request, res: Response) {
  const { firstName, lastName, department } = req.body ?? {};

  if (typeof firstName !== "string" || typeof department !== "string") {
    return res.status(400).json({
      isValid: false,
      errors: ["Invalid employee request body."],
    });
  }

  const result = await EmployeeService.createEmployee({
    firstName,
    lastName,
    department,
  });

  if (!result.isValid) {
    return res.status(400).json(result);
  }

  return res.status(201).json(result);
}