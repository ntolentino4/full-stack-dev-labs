import type { Request, Response } from "express";
import * as RoleService from "../services/roleService";

export async function getRoles(_req: Request, res: Response) {
  const roles = await RoleService.fetchRoles();
  res.json(roles);
}

export async function postRole(req: Request, res: Response) {
  const { firstName, lastName, role } = req.body ?? {};

  if (typeof firstName !== "string" || typeof role !== "string") {
    return res.status(400).json({
      isValid: false,
      errors: ["Invalid role request body."],
    });
  }

  const result = await RoleService.createRole({
    firstName,
    lastName,
    role,
  });

  if (!result.isValid) {
    return res.status(400).json(result);
  }

  return res.status(201).json(result);
}