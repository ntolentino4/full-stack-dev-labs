import { useMemo } from "react";
import { SignedIn, SignedOut } from "@clerk/clerk-react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import type { Department, Employee } from "../types/directory";
import { DepartmentSection } from "../components/DepartmentSection";
import { AddEmployeeForm } from "../components/AddEmployeeForm";
import { AuthRequiredMessage } from "../components/AuthRequiredMessage";
import * as EmployeeService from "../services/employeeService";

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

  return Array.from(map.values()).sort((a, b) => a.name.localeCompare(b.name));
}

export function EmployeesPage() {
  const queryClient = useQueryClient();

  const {
    data: employees = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["employees"],
    queryFn: EmployeeService.fetchEmployees,
  });

  const departments = useMemo(() => groupByDepartment(employees), [employees]);

  function refreshEmployees() {
    queryClient.invalidateQueries({ queryKey: ["employees"] });
  }

  if (isLoading) {
    return <main className="container">Loading employees...</main>;
  }

  if (isError) {
    return <main className="container">Unable to load employees.</main>;
  }

  return (
    <main className="container">
      {departments.map((dept) => (
        <DepartmentSection key={dept.name} department={dept} />
      ))}

      <SignedIn>
        <AddEmployeeForm onCreated={refreshEmployees} />
      </SignedIn>

      <SignedOut>
        <AuthRequiredMessage itemLabel="employee" />
      </SignedOut>
    </main>
  );
}