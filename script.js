let addBtn = document.querySelector("button");

let tableBody = document.querySelector("#studentTable tbody");

addBtn.addEventListener("click", () => {
  let form = document.querySelector("#studentForm");
  let name = document.querySelector("#studentName").value;
  let id = document.querySelector("#studentId").value;
  let cls = document.querySelector("#studentClass").value;
  let roll = document.querySelector("#rollNo").value;

  if (!validateInput(name, id,  cls , roll)) return;

  let student = { name, id, class:cls, roll };
  addStudentToTable(student);

  form.reset();
});

function validateInput(name, id, cls, roll) {
  let namePattern = /[a-zA-Z ]/;

  if (!name || !id || !cls || !roll) {
    alert("All fields are required.");
    return false;
  }
  if (!namePattern.test(name)) {
    alert("Name must contain only letters.");
    return false;
  }
  if (isNaN(id) || isNaN(roll)) {
    alert("ID and Roll must be numbers.");
    return false;
  }
  return true;
}

function addStudentToTable(student) {
  let row = document.createElement("tr");

  row.innerHTML = `
        <td>${student.name}</td>
        <td>${student.id}</td>
        <td>${student.class}</td>
        <td>${student.roll}</td>
        <td class="actions">
            <button onclick="editStudent(this)">Edit</button>
            <button onclick="deleteStudent(this)">Delete</button>
        </td>
    `;

  tableBody.appendChild(row);
}

function deleteStudent(button) {
  let row = button.parentElement.parentElement;

  row.remove();
}

function editStudent(button) {
  let row = button.parentElement.parentElement;
  let name = row.children[0].textContent;
  let id = row.children[1].textContent;
  let cls = row.children[2].textContent;
  let roll = row.children[3].textContent;

  document.getElementById("studentName").value = name;
  document.getElementById("studentId").value = id;
  document.getElementById("studentClass").value = cls;
  document.getElementById("rollNo").value = roll;

  deleteStudent(button);
}
