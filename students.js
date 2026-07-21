function loadStudents() {

    let students = JSON.parse(localStorage.getItem("students")) || [];
    let search = document.getElementById("search").value.toLowerCase();

    let table = document.getElementById("studentTable");
    table.innerHTML = "";

    students.forEach((student, index) => {

        if (student.name.toLowerCase().includes(search)) {

            table.innerHTML += `
            <tr>
                <td>${student.id}</td>
                <td>${student.name}</td>
                <td>${student.class}</td>
                <td>${student.roll}</td>
                <td>${student.mobile}</td>
                <td>
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

function deleteStudent(index){

    let students = JSON.parse(localStorage.getItem("students")) || [];

    students.splice(index,1);

    localStorage.setItem("students", JSON.stringify(students));

    loadStudents();

}

window.onload = loadStudents;
