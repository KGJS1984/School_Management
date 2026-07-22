let teacherPhotoData = "";
function saveTeacher(){

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

    if(editIndex !== null){

        teachers[editIndex] = teacher;

        localStorage.removeItem("teacherEditIndex");

        alert("✅ Teacher Updated Successfully");

    }else{

        teachers.push(teacher);

        alert("✅ Teacher Saved Successfully");

    }

    localStorage.setItem("teachers", JSON.stringify(teachers));

    document.querySelector("form").reset();

    window.location.href = "teachers_list.html";

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

<button class="btn btn-primary btn-sm"
onclick="teacherID(${index})">
🪪 ID Card
</button>

<button class="btn btn-info btn-sm"
onclick="viewTeacherProfile(${index})">
Profile
</button>

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
function viewTeacherProfile(index){

    localStorage.setItem("teacherProfileIndex", index);

    window.location.href = "teachers_profile.html";

        }
function previewTeacherPhoto(event){

    let reader = new FileReader();

    reader.onload = function(){

        teacherPhotoData = reader.result;

        document.getElementById("teacherPhotoPreview").src = teacherPhotoData;

    };

    reader.readAsDataURL(event.target.files[0]);

}
function teacherID(index){

    localStorage.setItem("teacherProfileIndex", index);

    window.location.href = "teachers_incard.html";

}
window.addEventListener("load", function () {

    let editIndex = localStorage.getItem("teacherEditIndex");

    if (editIndex !== null) {

        let teachers = JSON.parse(localStorage.getItem("teachers")) || [];

        let t = teachers[editIndex];

        document.getElementById("teacherName").value = t.name;
        document.getElementById("designation").value = t.designation;
        document.getElementById("teacherMobile").value = t.mobile;
        document.getElementById("teacherEmail").value = t.email;

        if (t.photo) {
            teacherPhotoData = t.photo;
            document.getElementById("teacherPhotoPreview").src = t.photo;
        }
    }

});
