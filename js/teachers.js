function saveTeacher(){

    let teacher = {

        id: Date.now(),

        name: document.getElementById("teacherName").value,

        designation: document.getElementById("designation").value,

        mobile: document.getElementById("teacherMobile").value,

        email: document.getElementById("teacherEmail").value

    };

    let teachers =
    JSON.parse(localStorage.getItem("teachers")) || [];

    teachers.push(teacher);

    localStorage.setItem("teachers",
    JSON.stringify(teachers));

    alert("✅ Teacher Saved Successfully");

    document.querySelector("form").reset();

}
// =========================
// Teacher List
// =========================

function loadTeachers() {

    let teachers = JSON.parse(localStorage.getItem("teachers")) || [];

    let search = document.getElementById("searchTeacher").value.toLowerCase();

    let table = document.getElementById("teacherTable");

    if (!table) return;

    table.innerHTML = "";

    teachers.forEach((teacher, index) => {

        if (
            teacher.name.toLowerCase().includes(search) ||
            teacher.designation.toLowerCase().includes(search)
        ) {

            table.innerHTML += `
            <tr>

            <td>${index + 1}</td>

            <td>${teacher.name}</td>

            <td>${teacher.designation}</td>

            <td>${teacher.mobile}</td>

            <td>${teacher.email}</td>

            <td>

            <button class="btn btn-warning btn-sm"
            onclick="editTeacher(${index})">
            Edit
            </button>

            <button class="btn btn-danger btn-sm"
            onclick="deleteTeacher(${index})">
            Delete
            </button>

            </td>

            </tr>
            `;
        }

    });

}

function deleteTeacher(index){

    if(confirm("Delete this teacher?")){

        let teachers = JSON.parse(localStorage.getItem("teachers")) || [];

        teachers.splice(index,1);

        localStorage.setItem("teachers",JSON.stringify(teachers));

        loadTeachers();

    }

}

function editTeacher(index){

    localStorage.setItem("teacherEditIndex",index);

    window.location.href="teachers.html";

}
