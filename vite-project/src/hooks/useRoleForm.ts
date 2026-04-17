import { useAuth } from "@clerk/clerk-react";
import { useFormInput } from "./userFormInput";
import * as RoleService from "../services/roleService";

export function useRoleForm() {
  const { getToken } = useAuth();

  const firstName = useFormInput("");
  const lastName = useFormInput("");
  const role = useFormInput("");

  async function tryCreateRole(): Promise<{ isValid: boolean }> {
    firstName.setMessages([]);
    lastName.setMessages([]);
    role.setMessages([]);

    const firstReq = firstName.validate((v) =>
      v.trim().length
        ? { isValid: true }
        : { isValid: false, errors: ["First name is required."] }
    );

    const roleReq = role.validate((v) =>
      v.trim().length
        ? { isValid: true }
        : { isValid: false, errors: ["Role is required."] }
    );

    if (!firstReq.isValid || !roleReq.isValid) {
      return { isValid: false };
    }

    try {
      const sessionToken = await getToken();

      if (!sessionToken) {
        throw new Error("Not authenticated.");
      }

      await RoleService.createRole(
        {
          firstName: firstName.value,
          lastName: lastName.value,
          role: role.value,
        },
        sessionToken
      );

      firstName.setValue("");
      lastName.setValue("");
      role.setValue("");

      return { isValid: true };
    } catch (error: unknown) {
      if (
        typeof error === "object" &&
        error !== null &&
        "field" in error &&
        "errors" in error
      ) {
        const apiError = error as {
          field?: string;
          errors?: string[];
        };

        if (apiError.field === "firstName") {
          firstName.setMessages(apiError.errors ?? []);
        }

        if (apiError.field === "role") {
          role.setMessages(apiError.errors ?? []);
        }
      }

      return { isValid: false };
    }
  }

  return { firstName, lastName, role, tryCreateRole };
}