import { useEffect, useState, type FormEvent } from "react";
import { useAuth } from "@clerk/clerk-react";
import { useFormInput } from "../hooks/userFormInput";
import * as EmployeeService from "../services/employeeService";

type Props = {
  onCreated: () => void;
};

export function AddEmployeeForm({ onCreated }: Props) {
  const { getToken } = useAuth();

  const [departments, setDepartments] = useState<string[]>([]);
  const [loadingDepartments, setLoadingDepartments] = useState(true);

  const firstName = useFormInput("");
  const lastName = useFormInput("");
  const department = useFormInput("");

  useEffect(() => {
  async function loadDepartments() {
    const data = await EmployeeService.fetchDepartments();
    setDepartments(data);
    setLoadingDepartments(false);
  }

  loadDepartments();
}, []);

useEffect(() => {
  if (departments.length > 0 && !department.value) {
    department.setValue(departments[0]);
  }
}, [departments, department]);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    firstName.setMessages([]);
    department.setMessages([]);

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

    if (!firstRequired.isValid || !deptRequired.isValid) {
      return;
    }

    try {
      const sessionToken = await getToken();

      if (!sessionToken) {
        throw new Error("Not authenticated.");
      }

      await EmployeeService.createEmployee(
        {
          firstName: firstName.value,
          lastName: lastName.value,
          department: department.value,
        },
        sessionToken
      );

      firstName.setValue("");
      lastName.setValue("");
      department.setValue(departments[0] ?? "");
      onCreated();
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

        if (apiError.field === "department") {
          department.setMessages(apiError.errors ?? []);
        }
      }
    }
  }

  if (loadingDepartments) {
    return (
      <section style={{ marginTop: "2rem" }}>
        <p>Loading departments...</p>
      </section>
    );
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