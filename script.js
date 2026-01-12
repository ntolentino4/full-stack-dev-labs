// Data (from case study employee table)
const employees = [
  { firstName: "Zoë", lastName: "Robins", department: "Administration" },
  { firstName: "Madeleine", lastName: "Madden", department: "Administration" },

  { firstName: "Josha", lastName: "Sadowski", department: "Audit" },
  { firstName: "Kate", lastName: "Fleetwood", department: "Audit" },

  { firstName: "Priyanka", lastName: "Bose", department: "Banking Operations" },
  { firstName: "Hammed", lastName: "Animashaun", department: "Banking Operations" },
  { firstName: "Álvaro", lastName: "Morte", department: "Banking Operations" },
  { firstName: "Taylor", lastName: "Napier", department: "Banking Operations" },
  { firstName: "Alan", lastName: "Simmonds", department: "Banking Operations" },

  { firstName: "Gil", lastName: "Cardinal", department: "Communications" },
  { firstName: "Richard", lastName: "J. Lewis", department: "Communications" },

  { firstName: "Randy", lastName: "Bradshaw", department: "Corporate Services" },
  { firstName: "Tracey", lastName: "Cook", department: "Corporate Services" },
  { firstName: "Lubomir", lastName: "Mykytiuk", department: "Corporate Services" },

  { firstName: "Dakota", lastName: "House", department: "Facilities" },
  { firstName: "Lori Lea", lastName: "Okemah", department: "Facilities" },
  { firstName: "Renae", lastName: "Morrisseau", department: "Facilities" },
  { firstName: "Rick", lastName: "Belcourt", department: "Facilities" },

  { firstName: "Selina", lastName: "Hanusa", department: "Financial Services" },
  { firstName: "Buffy", lastName: "Gaudry", department: "Financial Services" },
  { firstName: "Shaneen Ann", lastName: "Fox", department: "Financial Services" },
  { firstName: "Allan", lastName: "Little", department: "Financial Services" },
  { firstName: "Danny", lastName: "Rabbit", department: "Financial Services" },

  { firstName: "Jesse Ed", lastName: "Azure", department: "Human Resources" },
  { firstName: "Stacy", lastName: "Da Silva", department: "Human Resources" },
  { firstName: "Vladimír", lastName: "Valenta", department: "Human Resources" },
  { firstName: "Samone", lastName: "Sayeses-Whitney", department: "Human Resources" },
  { firstName: "Paul", lastName: "Coeur", department: "Human Resources" },

  { firstName: "Graham", lastName: "Greene", department: "Information Technology" },
  { firstName: "Sandika", lastName: "Evergreen", department: "Information Technology" },
  { firstName: "Jennifer", lastName: "Rodriguez (Software Developer)", department: "Information Technology" },

  // Listed separately in the case study table, so treat as their own department label:
  { firstName: "Aiyana", lastName: "Littlebear", department: "IT Technician" },
  { firstName: "Inara", lastName: "Thunderbird", department: "IT Technician" },
  { firstName: "Kaya", lastName: "Runningbrook", department: "IT Technician" },
  { firstName: "Elara", lastName: "Firehawk", department: "IT Technician" },
  { firstName: "Siona", lastName: "Moonflower", department: "IT Technician" },
  { firstName: "Kaiyu", lastName: "Greywolf", department: "IT Technician" },
  { firstName: "Ayawamat", lastName: "Nightwind", department: "IT Technician" },
  { firstName: "Tala", lastName: "Braveheart", department: "IT Technician" },
  { firstName: "Iniko", lastName: "Stonebear", department: "IT Technician" },
  { firstName: "Onatah", lastName: "Redhawk", department: "IT Technician" },
];

// Interfaces (conceptually):
// Department { name: string; employees: Employee[] }
// Employee { firstName: string; lastName?: string }

function groupEmployeesByDepartment(employeeList) {
  const deptMap = new Map();

  for (const emp of employeeList) {
    if (!deptMap.has(emp.department)) deptMap.set(emp.department, []);
    deptMap.get(emp.department).push({ firstName: emp.firstName, lastName: emp.lastName });
  }

  // Convert to Department[] and sort departments + employees for nicer display
  const departments = Array.from(deptMap.entries()).map(([name, emps]) => ({
    name,
    employees: emps.sort((a, b) =>
      `${a.lastName ?? ""} ${a.firstName}`.localeCompare(`${b.lastName ?? ""} ${b.firstName}`)
    ),
  }));

  departments.sort((a, b) => a.name.localeCompare(b.name));
  return departments;
}

function renderDirectory(departments) {
  const main = document.getElementById("app");
  main.innerHTML = "";

  for (const dept of departments) {
    const section = document.createElement("section");
    section.className = "department";

    const h2 = document.createElement("h2");
    h2.textContent = dept.name;

    const ul = document.createElement("ul");
    ul.className = "employee-list";

    for (const emp of dept.employees) {
      const li = document.createElement("li");
      li.textContent = emp.lastName ? `${emp.firstName} ${emp.lastName}` : emp.firstName;
      ul.appendChild(li);
    }

    section.appendChild(h2);
    section.appendChild(ul);
    main.appendChild(section);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  // Footer year
  document.getElementById("year").textContent = new Date().getFullYear();

  // Inject employee directory
  const departments = groupEmployeesByDepartment(employees);
  renderDirectory(departments);
});
