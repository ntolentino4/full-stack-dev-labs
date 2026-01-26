import { useEffect, useState, type FormEvent } from "react";
import type { Employee } from "../types/directory";

type Props = {
  departments: string[];
  onAddEmployee: (employee: Employee) => void;
};

export function AddEmployeeForm({ departments, onAddEmployee }: Props) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [department, setDepartment] = useState(departments[0] ?? "");
  const [errors, setErrors] = useState<string[]>([]);

  useEffect(() => {
    // keep department valid if departments list changes
    if (!departments.includes(department)) {
      setDepartment(departments[0] ?? "");
    }
  }, [departments, department]);

  function validate(): string[] {
    const next: string[] = [];

    if (firstName.trim().length < 3) {
      next.push("First name must be at least 3 characters.");
    }

    if (!departments.includes(department)) {
      next.push("Please select an existing department.");
    }

    return next;
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    // clear old messages on submit
    setErrors([]);

    const validationErrors = validate();
    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      return;
    }

    const newEmployee: Employee = {
      firstName: firstName.trim(),
      lastName: lastName.trim() ? lastName.trim() : undefined,
      department,
    };

    onAddEmployee(newEmployee);

    // reset form
    setFirstName("");
    setLastName("");
    setDepartment(departments[0] ?? "");
  }

  return (
    <section style={{ marginTop: "2rem" }}>
      <h2>Add Employee</h2>

      {errors.length > 0 && (
        <ul role="alert">
          {errors.map((msg) => (
            <li key={msg}>{msg}</li>
          ))}
        </ul>
      )}

      <form onSubmit={handleSubmit}>
        <label>
          First Name
          <input
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </label>

        <label>
          Last Name (optional)
          <input
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </label>

        <label>
          Department
          <select
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
          >
            {departments.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>
        </label>

        <button type="submit">Add</button>
      </form>
    </section>
  );
}
