import type { FormEvent } from "react";
import { useFormInput } from "../hooks/userFormInput";
import * as EmployeeService from "../services/employeeService";

type Props = {
  onCreated: () => void;
};

export function AddEmployeeForm({ onCreated }: Props) {
  const departments = EmployeeService.fetchDepartments();
  const defaultDepartment = departments[0] ?? "";

  const firstName = useFormInput("");
  const lastName = useFormInput("");
  const department = useFormInput(defaultDepartment);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    
    const firstRequired = firstName.validate((v) =>
      v.trim().length
        ? { isValid: true }
        : { isValid: false, errors: ["First name is required."] }
    );

    const deptRequired = department.validate((v) =>
      v.trim().length
        ? { isValid: true }
        : { isValid: false, errors: ["Department is required."] }
    );

    if (!firstRequired.isValid || !deptRequired.isValid) return;

    
    const result = EmployeeService.createEmployee({
      firstName: firstName.value,
      lastName: lastName.value,
      department: department.value,
    });

    if (!result.isValid) {
      if (result.field === "firstName") firstName.setMessages(result.errors);
      if (result.field === "department") department.setMessages(result.errors);
      return;
    }

    
    firstName.setValue("");
    lastName.setValue("");
    department.setValue(defaultDepartment);
    onCreated();
  }

  return (
    <section style={{ marginTop: "2rem" }}>
      <h2>Add Employee</h2>

      <form onSubmit={handleSubmit}>
        <label>
          First Name
          <input
            value={firstName.value}
            onChange={(e) => firstName.setValue(e.target.value)}
          />
        </label>
        {firstName.messages.length > 0 && (
          <ul role="alert">
            {firstName.messages.map((msg) => (
              <li key={msg}>{msg}</li>
            ))}
          </ul>
        )}

        <label>
          Last Name (optional)
          <input
            value={lastName.value}
            onChange={(e) => lastName.setValue(e.target.value)}
          />
        </label>

        <label>
          Department
          <select
            value={department.value}
            onChange={(e) => department.setValue(e.target.value)}
          >
            {departments.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>
        </label>
        {department.messages.length > 0 && (
          <ul role="alert">
            {department.messages.map((msg) => (
              <li key={msg}>{msg}</li>
            ))}
          </ul>
        )}

        <button type="submit">Add</button>
      </form>
    </section>
  );
}