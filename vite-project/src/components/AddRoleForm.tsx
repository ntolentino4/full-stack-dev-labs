import type { FormEvent } from "react";
import { useRoleForm } from "../hooks/useRoleForm";

type Props = {
  onCreated: () => void;
};

export function AddRoleForm({ onCreated }: Props) {
  const form = useRoleForm();

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
  e.preventDefault();

  const result = await form.tryCreateRole();

  if (result.isValid) {
    onCreated();
  }
}

  return (
    <section style={{ marginTop: "2rem" }}>
      <h2>Add Role</h2>

      <form onSubmit={handleSubmit}>
        <label>
          First Name
          <input
            value={form.firstName.value}
            onChange={(e) => form.firstName.setValue(e.target.value)}
          />
        </label>
        {form.firstName.messages.length > 0 && (
          <ul role="alert">
            {form.firstName.messages.map((m) => (
              <li key={m}>{m}</li>
            ))}
          </ul>
        )}

        <label>
          Last Name (optional)
          <input
            value={form.lastName.value}
            onChange={(e) => form.lastName.setValue(e.target.value)}
          />
        </label>

        <label>
          Role
          <input
            value={form.role.value}
            onChange={(e) => form.role.setValue(e.target.value)}
          />
        </label>
        {form.role.messages.length > 0 && (
          <ul role="alert">
            {form.role.messages.map((m) => (
              <li key={m}>{m}</li>
            ))}
          </ul>
        )}

        <button type="submit">Add</button>
      </form>
    </section>
  );
}