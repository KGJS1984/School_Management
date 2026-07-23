let teacherPhotoData = "";

// =========================
// Save Teacher
// =========================
function saveTeacher() {

    let teacher = {
        id: Date.now(),
        name: document.getElementById("teacherName").value,
        designation: document.getElementById("designation").value,
        mobile: document.getElementById("teacherMobile").value,
        email: document.getElementById("teacherEmail").value,
        photo: teacherPhotoData
    };

    let teachers = JSON.parse(localStorage.getItem("teachers")) || [];
    let editIndex = localStorage.getItem("teacherEditIndex");

    if (editIndex !== null) {
        teachers[editIndex] = teacher;
        localStorage.removeItem("teacherEditIndex");
        alert("✅ Teacher Updated Successfully");
    } else {
        teachers.push(teacher);
        alert("✅ Teacher Saved Successfully");
    }

    localStorage.setItem("teachers", JSON.stringify(teachers));

    document.querySelector("form").reset();
    teacherPhotoData = "";

    if(document.getElementById("teacherPhotoPreview")){
        document.getElementById("teacherPhotoPreview").src =
        "https://via.placeholder.com/120";
    }

    window.location.href = "teachers_list.html";
}

// =========================
// Load Teacher List
// =========================
function loadTeachers(){

    let table = document.getElementById("teacherTable");
    if(!table) return;

    let teachers = JSON.parse(localStorage.getItem("teachers")) || [];

    let searchBox = document.getElementById("searchTeacher");
    let search = searchBox ? searchBox.value.toLowerCase() : "";

    table.innerHTML = "";

    teachers.forEach((teacher,index)=>{

        if(
            teacher.name.toLowerCase().includes(search) ||
            teacher.designation.toLowerCase().includes(search)
        ){

            table.innerHTML += `
            <tr>

            <td>${index+1}</td>

            <td>${teacher.name}</td>

            <td>${teacher.designation}</td>

            <td>${teacher.mobile}</td>

            <td>${teacher.email}</td>

            <td>

            <button class="btn btn-primary btn-sm" onclick="teacherID(${index})">🪪 ID</button>

            <button class="btn btn-info btn-sm" onclick="viewTeacherProfile(${index})">Profile</button>

            <button class="btn btn-warning btn-sm" onclick="editTeacher(${index})">Edit</button>

            <button class="btn btn-danger btn-sm" onclick="deleteTeacher(${index})">Delete</button>

            </td>

            </tr>
            `;
        }

    });

}

// =========================
// Delete Teacher
// =========================
function deleteTeacher(index){

    if(confirm("Delete this teacher?")){

        let teachers = JSON.parse(localStorage.getItem("teachers")) || [];

        teachers.splice(index,1);

        localStorage.setItem("teachers",JSON.stringify(teachers));

        loadTeachers();

    }

}

// =========================
// Edit Teacher
// =========================
function editTeacher(index){

    localStorage.setItem("teacherEditIndex",index);

    window.location.href="teachers.html";

}

// =========================
// Profile
// =========================
function viewTeacherProfile(index){

    localStorage.setItem("teacherProfileIndex",index);

    window.location.href="teachers_profile.html";

}

// =========================
// Teacher ID
// =========================
function teacherID(index){

    localStorage.setItem("teacherProfileIndex",index);

    window.location.href="teachers_incard.html";

}

// =========================
// Photo Preview
// =========================
function previewTeacherPhoto(event){

    let reader = new FileReader();

    reader.onload=function
