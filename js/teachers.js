// =========================
// Teacher Management
// Part 1
// =========================

let teacherPhotoData = "";

// =========================
// Save Teacher
// =========================
function saveTeacher(){

    let teacher = {

        id: Date.now(),

        name: document.getElementById("teacherName").value.trim(),

        designation: document.getElementById("designation").value.trim(),

        mobile: document.getElementById("teacherMobile").value.trim(),

        email: document.getElementById("teacherEmail").value.trim(),

        photo: teacherPhotoData

    };

    let teachers =
    JSON.parse(localStorage.getItem("teachers")) || [];

    let editIndex =
    localStorage.getItem("teacherEditIndex");

    if(editIndex !== null){

        teachers[editIndex] = teacher;

        localStorage.removeItem("teacherEditIndex");

        alert("✅ Teacher Updated Successfully");

    }else{

        teachers.push(teacher);

        alert("✅ Teacher Saved Successfully");

    }

    localStorage.setItem(
        "teachers",
        JSON.stringify(teachers)
    );

    document.querySelector("form").reset();

    teacherPhotoData = "";

    let img =
    document.getElementById("teacherPhotoPreview");

    if(img){
        img.src = "https://via.placeholder.com/120";
    }

    console.log(localStorage.getItem("teachers"));
    window.location.href="teachers_list.html";

}

// =========================
// Teacher Photo Preview
// =========================

function previewTeacherPhoto(event){

    let reader = new FileReader();

    reader.onload = function(){

        teacherPhotoData = reader.result;

        document.getElementById(
        "teacherPhotoPreview").src = teacherPhotoData;

    };

    if(event.target.files.length>0){

        reader.readAsDataURL(
        event.target.files[0]);

    }

}

// =========================
// Teacher List + Smart Search
// =========================

function loadTeachers(){

    let teachers =
    JSON.parse(localStorage.getItem("teachers")) || [];

    let table =
    document.getElementById("teacherTable");

    if(!table) return;

    let searchBox =
    document.getElementById("searchTeacher");

    let search =
    searchBox ? searchBox.value.toLowerCase() : "";

    table.innerHTML="";

    teachers.forEach((teacher,index)=>{

        if(
            teacher.name.toLowerCase().includes(search) ||
            teacher.designation.toLowerCase().includes(search) ||
            teacher.mobile.toLowerCase().includes(search) ||
            teacher.email.toLowerCase().includes(search)
        ){

            table.innerHTML += `
            <tr>

            <td>${index+1}</td>

            <td>
            ${teacher.photo ?
            `<img src="${teacher.photo}"
            width="40"
            height="40"
            style="border-radius:50%;margin-right:8px;">`
            :
            ""}
            ${teacher.name}
            </td>

            <td>${teacher.designation}</td>

            <td>${teacher.mobile}</td>

            <td>${teacher.email}</td>

            <td>

            <button class="btn btn-info btn-sm"
            onclick="viewTeacherProfile(${index})">
            👤
            </button>

            <button class="btn btn-warning btn-sm"
            onclick="editTeacher(${index})">
            ✏️
            </button>

            <button class="btn btn-danger btn-sm"
            onclick="deleteTeacher(${index})">
            🗑️
            </button>

            </td>

            </tr>
            `;

        }

    });

            }

// =========================
// Edit Teacher
// =========================
function editTeacher(index){

    localStorage.setItem("teacherEditIndex", index);

    window.location.href = "teachers.html";

}

// =========================
// Delete Teacher
// =========================
function deleteTeacher(index){

    if(confirm("Delete this teacher?")){

        let teachers =
        JSON.parse(localStorage.getItem("teachers")) || [];

        teachers.splice(index,1);

        localStorage.setItem(
            "teachers",
            JSON.stringify(teachers)
        );

        loadTeachers();

    }

}

// =========================
// Teacher Profile
// =========================
function viewTeacherProfile(index){

    localStorage.setItem(
        "teacherProfileIndex",
        index
    );

    window.location.href =
    "teachers_profile.html";

}

// =========================
// Teacher ID Card
// =========================
function teacherID(index){

    localStorage.setItem(
        "teacherProfileIndex",
        index
    );

    window.location.href =
    "teachers_incard.html";

}

// =========================
// Auto Load
// =========================
window.onload = function(){

    // Teacher List Page
    loadTeachers();

    // Teacher Edit Page
    let editIndex =
    localStorage.getItem("teacherEditIndex");

    if(
        editIndex !== null &&
        document.getElementById("teacherName")
    ){

        let teachers =
        JSON.parse(localStorage.getItem("teachers")) || [];

        let t = teachers[editIndex];

        if(!t) return;

        document.getElementById("teacherName").value = t.name;
        document.getElementById("designation").value = t.designation;
        document.getElementById("teacherMobile").value = t.mobile;
        document.getElementById("teacherEmail").value = t.email;

        if(t.photo){
            teacherPhotoData = t.photo;
            document.getElementById("teacherPhotoPreview").src = t.photo;
        }

    }

};

// =========================
// Smart Search Suggestions
// =========================

function loadTeacherSuggestions(){

    let teachers =
    JSON.parse(localStorage.getItem("teachers")) || [];

    let input =
    document.getElementById("searchTeacher");

    let list =
    document.getElementById("teacherSuggestion");

    if(!input || !list) return;

    let keyword = input.value.toLowerCase();

    list.innerHTML = "";

    if(keyword=="") return;

    teachers.forEach((teacher)=>{

        if(
            const name = (teacher.name || "").toLowerCase();
const designation = (teacher.designation || "").toLowerCase();
const mobile = (teacher.mobile || "").toLowerCase();
const email = (teacher.email || "").toLowerCase();

if (
    name.includes(search) ||
    designation.includes(search) ||
    mobile.includes(search) ||
    email.includes(search)
)

            let option = document.createElement("option");

            option.value = teacher.name;

            list.appendChild(option);

        }

    });

}

// =========================
// Dashboard Count Update
// =========================

function updateTeacherCount(){

    let teachers =
    JSON.parse(localStorage.getItem("teachers")) || [];

    let count =
    document.getElementById("teacherCount");

    if(count){

        count.innerHTML = teachers.length;

    }

}

// =========================
// Initialize
// =========================

document.addEventListener("DOMContentLoaded",function(){

    loadTeachers();

    updateTeacherCount();

});
