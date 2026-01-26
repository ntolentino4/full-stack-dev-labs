import { useMemo, useState } from "react";
import employeesData from "../data/employees.json";
import type { Department, Employee } from "../types/directory";
import { DepartmentSection } from "../components/DepartmentSection";
import { AddEmployeeForm } from "../components/AddEmployeeForm";

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
  const departments = Array.from(map.values()).sort((a, b) => a.name.localeCompare(b.name));
  return departments;
}

export function EmployeesPage() {
  const [employees, setEmployees] = useState<Employee[]>(employeesData as Employee[]);
  const departments = useMemo(() => groupByDepartment(employees), [employees]);
  const departmentNames = useMemo(() => departments.map((d) => d.name), [departments]);

  function addEmployee(emp: Employee) {
    setEmployees((prev) => [...prev, emp]);
  }

  return (
    <main className="container">
      {departments.map((dept) => (
        <DepartmentSection key={dept.name} department={dept} />
      ))}

      <AddEmployeeForm departments={departmentNames} onAddEmployee={addEmployee} />
    </main>
  );
}
