import type { Department } from "../types/directory";

type Props = {
  department: Department;
};

export function DepartmentSection({ department }: Props) {
  return (
    <section className="department">
      <h2>{department.name}</h2>
      <ul className="employee-list">
        {department.employees.map((emp, idx) => {
          const fullName = emp.lastName
            ? `${emp.firstName} ${emp.lastName}`
            : emp.firstName;

          return <li key={`${fullName}-${idx}`}>{fullName}</li>;
        })}
      </ul>
    </section>
  );
}
