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
    <button class="btn btn-primary btn-sm"
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

function deleteStudent(index){

    if(confirm("Are you sure you want to delete this student?")){

        let students = JSON.parse(localStorage.getItem("students")) || [];

        students.splice(index,1);

        localStorage.setItem("students", JSON.stringify(students));

        loadStudents();

        alert("Student Deleted Successfully");
    }

}
function editStudent(index){

    let students = JSON.parse(localStorage.getItem("students")) || [];

    localStorage.setItem("editStudent", JSON.stringify(students[index]));

    window.location.href = "admissions.html";

}
