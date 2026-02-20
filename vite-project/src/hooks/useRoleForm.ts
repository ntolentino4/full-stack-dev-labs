import { useFormInput } from "./userFormInput";
import * as RoleService from "../services/roleService";

export function useRoleForm() {
  const firstName = useFormInput("");
  const lastName = useFormInput("");
  const role = useFormInput("");

  function tryCreateRole(): { isValid: boolean } {
    // Clear old messages
    firstName.setMessages([]);
    lastName.setMessages([]);
    role.setMessages([]);

    // Hook-level required checks
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

    if (!firstReq.isValid || !roleReq.isValid) return { isValid: false };

    // Service-level business validation + repo creation
    const result = RoleService.createRole({
      firstName: firstName.value,
      lastName: lastName.value,
      role: role.value,
    });

    if (!result.isValid) {
      if (result.field === "firstName") firstName.setMessages(result.errors);
      if (result.field === "role") role.setMessages(result.errors);
      return { isValid: false };
    }

    // Reset
    firstName.setValue("");
    lastName.setValue("");
    role.setValue("");

    return { isValid: true };
  }

  return { firstName, lastName, role, tryCreateRole };
}