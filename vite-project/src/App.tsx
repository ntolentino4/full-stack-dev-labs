import "./index.css";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { DepartmentSection } from "./components/DepartmentSection";

import employeesData from "./data/employees.json";
import type { Department, Employee } from "./types/directory";

function groupByDepartment(employees: Employee[]): Department[] {
  const map = new Map<string, Department>();

  for (const emp of employees) {
    if (!map.has(emp.department)) {
      map.set(emp.department, { name: emp.department, employees: [] });
    }

    map.get(emp.department)!.employees.push({
      firstName: emp.firstName,
      lastName: emp.lastName,
    });
  }

  const departments = Array.from(map.values());

  departments.sort((a, b) => a.name.localeCompare(b.name));
  for (const dept of departments) {
    dept.employees.sort((a, b) =>
      `${a.lastName ?? ""} ${a.firstName}`.localeCompare(
        `${b.lastName ?? ""} ${b.firstName}`
      )
    );
  }

  return departments;
}

export default function App() {
  const employees = employeesData as Employee[];
  const departments = groupByDepartment(employees);

  return (
    <>
      <Header
        title="Pixell River Employee Directory"
        message="Welcome! Browse employees by department."
      />

      <main className="container">
        {departments.map((dept) => (
          <DepartmentSection key={dept.name} department={dept} />
        ))}
      </main>

      <Footer />
    </>
  );
}
