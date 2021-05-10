let employees = [];

let firstName = document.getElementById("firstName");
let surname = document.getElementById("surname");
let age = document.getElementById("age");
let company = document.getElementById("company");
let position = document.getElementById("position");
let salary = document.getElementById("salary");
let exampleModalLabel = document.getElementById("exampleModalLabel");
let addEmployee = document.getElementById("addEmployee");
let exampleModal = document.getElementById("exampleModal");
let saveChanges = document.getElementById("saveChanges");
let tableBody = document.getElementById("data");
let sex = document.getElementsByName("sex");
let i = 0;
// let num = 0

class Person {
  constructor(firstName, surname, age, sex) {
    this.firstName = this.upperFirstLetter(firstName);
    this.surname = this.upperFirstLetter(surname);
    this.age = age;
    this.sex = sex;
  }
  showInfo() {
    return `Hi!I am ${this.firstName} ${this.surname},${this.age}-year old ${this.sex}`;
  }
  fullName() {
    return this.firstName + " " + this.surname;
  }
  upperFirstLetter(str) {
    if (!str) return str;
    return str[0].toUpperCase() + str.slice(1);
  }
}

class Employee extends Person {
  constructor(firstName, surname, age, sex, company, position, salary) {
    super(firstName, surname, age, sex);
    this.company = super.upperFirstLetter(company);
    this.position = position;
    this.salary = salary;
  }
  showInfo() {
    return (
      super.showInfo() +
      `\nI work in the ${this.company} as a ${this.position}. `
    );
  }
}
let Zakhar = new Employee(
  "Zakhar",
  "Perchak",
  20,
  "men",
  "TechMagic",
  "frontend developer",
  30000
);
let Marta = new Employee(
  "marta",
  "Baranovuch",
  26,
  "women",
  "Le Silpo",
  "accountant",
  15000
);
let Nadiya = new Employee(
  "Nadiya",
  "Yurkevich",
  37,
  "women",
  "Epicenter",
  "cashier",
  9650
);
let Oleksa = new Employee(
  "Oleksa",
  "Bogonis",
  15,
  "men",
  "Internet",
  "freelancer",
  7985
);
let Severun = new Employee(
  "Severun",
  "Kindrat",
  55,
  "men",
  "New post",
  "packer",
  6000
);

employees.push(Zakhar);
employees.push(Marta);
employees.push(Nadiya);
employees.push(Oleksa);
employees.push(Severun);
localStorage.setItem('employees',JSON.stringify(employees))

window.onload = async () => {
  employees = JSON.parse(localStorage.getItem("employees"));
  drawTable(tableBody);
};

let drawTable = (tbody) => {
  let tr, td;
  for (let i = 0; i < employees.length; i++) {
    tr = tbody.insertRow(tbody.rows.length);
    td = tr.insertCell(tr.cells.length);
    td.setAttribute("align", "center");
    td.innerHTML = employees[i].firstName + " " + employees[i].surname;
    td = tr.insertCell(tr.cells.length);
    td.setAttribute("align", "center");
    td.innerHTML = employees[i].age;
    td = tr.insertCell(tr.cells.length);
    td.setAttribute("align", "center");
    td.innerHTML = employees[i].company;
    td = tr.insertCell(tr.cells.length);
    td.setAttribute("align", "center");
    td.innerHTML = employees[i].position;
    td = tr.insertCell(tr.cells.length);
    td.setAttribute("align", "center");
    td.innerHTML = employees[i].salary + " grn";
    td = tr.insertCell(tr.cells.length);
    td.innerHTML =
      "<button type='button' data-toggle='modal' data-target='#exampleModal' onclick='editEmployee(this)' class='btn btn-warning'>Edit</button>";
    td = tr.insertCell(tr.cells.length);
    td.innerHTML =
      "<button type='button' onclick='deleteEmployee(this)' id='delete_button' class='btn btn-warning'>Delete</button>";
    td = tr.insertCell(tr.cells.length);
    td.innerHTML =
      "<button type='button' onclick='showInfo(this)' class='btn btn-warning'>Show info</button>";
    td = tr.insertCell(tr.cells.length);
  }
};

let showInfo = (employee) => {
  i = employee.parentNode.parentNode.rowIndex - 1;
  let temp = new Employee(
    employees[i].firstName,
    employees[i].surname,
    employees[i].age,
    employees[i].sex,
    employees[i].company,
    employees[i].position,
    employees[i].salary
  );
  //closures
  //salaryPerYear - внутрішня функція в той час, як showInfo зовнішня
  //змінна employees[i].salary береться із зовнішньої функції і ,таким чином, доступна у даній функції
  function salaryPerYear() {
    return employees[i].salary * 12;
  }
  alert(temp.showInfo() + `\nI earn ${salaryPerYear()} money per year`);
};

let deleteEmployee = (par) => {
  employees.splice(par.parentNode.parentNode.rowIndex - 1, 1);
  localStorage.setItem("employees", JSON.stringify(employees));
  par.closest("tr").remove();
};

function editEmployee(par) {
  exampleModalLabel.innerHTML = "Edit profile";
  i = par.parentNode.parentNode.rowIndex - 1;
  firstName.value = employees[i].firstName;
  surname.value = employees[i].surname;
  age.value = employees[i].age;
  company.value = employees[i].company;
  position.value = employees[i].position;
  salary.value = employees[i].salary;
  document.getElementById("radios").style.display = "none";
}

// addEmployee.addEventListener("click", () => {
//   exampleModalLabel.innerHTML = "Add new employee";
// });
addEmployee.onclick = () => {
  new Promise(() => {
    exampleModalLabel.innerHTML = "Add new employee";
    document.getElementById("radios").style.display = "flex";
  });
};

let cleanForm = () => {
  firstName.value = "";
  surname.value = "";
  age.value = "";
  company.value = "";
  position.value = "";
  salary.value = "";
};

saveChanges.addEventListener("click", () => {
  if (exampleModalLabel.innerHTML === "Edit profile") {
    employees[i].firstName = firstName.value;
    employees[i].surname = surname.value;
    employees[i].age = age.value;
    employees[i].company = company.value;
    employees[i].position = position.value;
    employees[i].salary = salary.value;
    localStorage.setItem("employees", JSON.stringify(employees));
    tableBody.rows[i].cells[0].innerHTML =
      firstName.value + " " + surname.value;
    tableBody.rows[i].cells[1].innerHTML = age.value;
    tableBody.rows[i].cells[2].innerHTML = company.value;
    tableBody.rows[i].cells[3].innerHTML = position.value;
    tableBody.rows[i].cells[4].innerHTML = salary.value;
  } else {
    let newEmployee = new Employee(
      firstName.value,
      surname.value,
      age.value,
      "",
      company.value,
      position.value,
      salary.value
    );
    for (let i = 0; i < sex.length; i++) {
      if (sex[i].checked) {
        console.log(i);
        if (i === 0) {
          newEmployee.sex = "men";
        } else {
          newEmployee.sex = "women";
        }
      }
    }
    employees.push(newEmployee);
    localStorage.setItem("employees", JSON.stringify(employees));
    addTableRow(newEmployee);
  }
  cleanForm();
});

document.getElementById("closeBtn").onclick = () => {
  cleanForm();
};

let addTableRow = (employee) => {
  let newRow = tableBody.insertRow(tableBody.rows.length);
  cell1 = newRow.insertCell(0);
  cell1.setAttribute("align", "center");
  cell2 = newRow.insertCell(1);
  cell2.setAttribute("align", "center");
  cell3 = newRow.insertCell(2);
  cell3.setAttribute("align", "center");
  cell4 = newRow.insertCell(3);
  cell4.setAttribute("align", "center");
  cell5 = newRow.insertCell(4);
  cell5.setAttribute("align", "center");
  cell6 = newRow.insertCell(5);
  cell7 = newRow.insertCell(6);
  cell8 = newRow.insertCell(7);
  cell1.innerHTML = employee.fullName();
  cell2.innerHTML = employee.age;
  cell3.innerHTML = employee.company;
  cell4.innerHTML = employee.position;
  cell5.innerHTML = employee.salary + " grn";
  cell6.innerHTML =
    "<button type='button' data-toggle='modal' data-target='#exampleModal' onclick='editEmployee(this)' class='btn btn-warning'>Edit</button>";
  cell7.innerHTML =
    "<button type='button' onclick='deleteEmployee(this)' id='delete_button' class='btn btn-warning'>Delete</button>";
  cell8.innerHTML =
    "<button type='button' onclick='showInfo(this)' class='btn btn-warning'>Show info</button>";
};
