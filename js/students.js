function loadStudents() {

    let students = JSON.parse(localStorage.getItem("students")) || [];
    let search = document.getElementById("search").value.toLowerCase();

    let table = document.getElementById("studentTable");
    table.innerHTML = "";

    students.forEach((student, index) => {

        if (
            student.name.toLowerCase().includes(search) ||
            student.class.toLowerCase().includes(search)
        ) {

            table.innerHTML += `
            <tr>
                <td>${index + 1}</td>
                <td>${student.name}</td>
                <td>${student.father}</td>
                <td>${student.class}</td>
                <td>${student.roll}</td>
                <td>${student.mobile}</td>

                <td>
                    <button class="btn btn-warning btn-sm"
                        onclick="editStudent(${index})">
                        Edit
                    </button>

                    <button class="btn btn-danger btn-sm"
                        onclick="deleteStudent(${index})">
                        Delete
                    </button>
                </td>
            </tr>
            `;
        }

    });

}

function deleteStudent(index) {

    if (confirm("Delete this student?")) {

        let students = JSON.parse(localStorage.getItem("students")) || [];

        students.splice(index, 1);

        localStorage.setItem("students", JSON.stringify(students));

        loadStudents();
    }

}

function editStudent(index){

    localStorage.setItem("editIndex", index);

    window.location.href = "admissions.html";

}
window.addEventListener("load", loadStudents);
