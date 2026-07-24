// ========================================
// TEACHERS.JS V3.0
// Part 1
// ========================================

let teacherPhotoData = "";

// =========================
// Photo Preview
// =========================

function previewTeacherPhoto(event){

    const file = event.target.files[0];

    if(!file) return;

    const reader = new FileReader();

    reader.onload = function(e){

        teacherPhotoData = e.target.result;

        const img = document.getElementById("teacherPhotoPreview");

        if(img){

            img.src = teacherPhotoData;

        }

    };

    reader.readAsDataURL(file);

}

// =========================
// Save Teacher
// =========================

function saveTeacher(){

    let teacher={

        id:document.getElementById("teacherID").value ||

        "TCH-"+Date.now(),

        name:document.getElementById("teacherName").value.trim(),

        designation:document.getElementById("designation").value.trim(),

        mobile:document.getElementById("teacherMobile").value.trim(),

        email:document.getElementById("teacherEmail").value.trim(),

        gender:document.getElementById("teacherGender").value,

        blood:document.getElementById("teacherBlood").value,

        dob:document.getElementById("teacherDOB").value,

        joining:document.getElementById("teacherJoinDate").value,

        qualification:document.getElementById("teacherQualification").value.trim(),

        salary:document.getElementById("teacherSalary").value,

        address:document.getElementById("teacherAddress").value.trim(),

        status:document.getElementById("teacherStatus").value,

        photo:teacherPhotoData

    };

    // Validation

    if(teacher.name==""){

        alert("Teacher Name Required");

        return;

    }

    if(teacher.designation==""){

        alert("Designation Required");

        return;

    }

    let teachers=JSON.parse(

        localStorage.getItem("teachers")

    ) || [];

    let editIndex=

    localStorage.getItem("teacherEditIndex");

    // Duplicate Mobile

    if(

        teacher.mobile!=""

    ){

        let duplicate=teachers.find(

        (t,i)=>

        t.mobile===teacher.mobile

        && i!=editIndex

        );

        if(duplicate){

            alert("Mobile Already Exists");

            return;

        }

    }

    // Duplicate Email

    if(

        teacher.email!=""

    ){

        let duplicateEmail=teachers.find(

        (t,i)=>

        t.email===teacher.email

        && i!=editIndex

        );

        if(duplicateEmail){

            alert("Email Already Exists");

            return;

        }

    }
        // =========================
    // Update / Save
    // =========================

    if(editIndex !== null){

        teacher.id = teachers[editIndex].id;

        // পুরনো ছবি রেখে দিন যদি নতুন ছবি না দেওয়া হয়
        if(!teacher.photo){
            teacher.photo = teachers[editIndex].photo;
        }

        teachers[editIndex] = teacher;

        localStorage.removeItem("teacherEditIndex");

        alert("✅ Teacher Updated Successfully");

    }else{

        teachers.push(teacher);

        alert("✅ Teacher Saved Successfully");

    }

    // =========================
    // Save LocalStorage
    // =========================

    localStorage.setItem(
        "teachers",
        JSON.stringify(teachers)
    );

    // =========================
    // Reset Form
    // =========================

    const form = document.getElementById("teacherForm");

    if(form){
        form.reset();
    }

    teacherPhotoData = "";

    const preview = document.getElementById("teacherPhotoPreview");

    if(preview){
        preview.src = "https://via.placeholder.com/150";
    }

    // =========================
    // Remove Edit Mode
    // =========================

    localStorage.removeItem("teacherEditIndex");

    // =========================
    // Redirect
    // =========================

    window.location.href = "teachers_list.html";

}

// ========================================
// Auto Generate Teacher ID
// ========================================

function generateTeacherID(){

    let input = document.getElementById("teacherID");

    if(!input) return;

    if(input.value.trim() === ""){

        input.value = "TCH-" + Date.now().toString().slice(-6);

    }

}

// ========================================
// Load Teachers
// ========================================

function loadTeachers(){

    let teachers = JSON.parse(localStorage.getItem("teachers")) || [];

    let table = document.getElementById("teacherTable");

    if(!table) return;

    let keyword = "";

    let search = document.getElementById("searchTeacher");

    if(search){
        keyword = search.value.toLowerCase().trim();
    }

    table.innerHTML = "";

    if(teachers.length === 0){

        table.innerHTML = `
        <tr>
            <td colspan="8" class="text-center text-danger">
                No Teacher Found
            </td>
        </tr>`;

        return;
    }

    teachers.forEach((teacher,index)=>{

        let name = (teacher.name || "").toLowerCase();
        let designation = (teacher.designation || "").toLowerCase();
        let mobile = (teacher.mobile || "").toLowerCase();
        let email = (teacher.email || "").toLowerCase();

        if(
            keyword=="" ||
            name.includes(keyword) ||
            designation.includes(keyword) ||
            mobile.includes(keyword) ||
            email.includes(keyword)
        ){

            table.innerHTML += `

            <tr>

            <td>${index+1}</td>

            <td>

            <img src="${teacher.photo || 'https://via.placeholder.com/40'}"
            width="40"
            height="40"
            style="border-radius:50%;margin-right:8px;object-fit:cover;">

            ${teacher.name}

            </td>

            <td>${teacher.designation}</td>

            <td>${teacher.mobile || "-"}</td>

            <td>${teacher.email || "-"}</td>

            <td>

            <button
            class="btn btn-info btn-sm"
            onclick="viewTeacherProfile(${index})">
            👤
            </button>

            <button
            class="btn btn-warning btn-sm"
            onclick="editTeacher(${index})">
            ✏️
            </button>

            <button
            class="btn btn-danger btn-sm"
            onclick="deleteTeacher(${index})">
            🗑️
            </button>

            <button
            class="btn btn-primary btn-sm"
            onclick="teacherIDCard(${index})">
            🪪
            </button>

            </td>

            </tr>

            `;

        }

    });

}

// ========================================
// Edit Teacher
// ========================================

function editTeacher(index){

    localStorage.setItem("teacherEditIndex", index);

    window.location.href = "teachers.html";

}

// ========================================
// Delete Teacher
// ========================================

function deleteTeacher(index){

    if(!confirm("Are you sure you want to delete this teacher?")){
        return;
    }

    let teachers = JSON.parse(localStorage.getItem("teachers")) || [];

    teachers.splice(index,1);

    localStorage.setItem("teachers", JSON.stringify(teachers));

    loadTeachers();

    updateTeacherCount();

}

// ========================================
// Teacher Profile
// ========================================

function viewTeacherProfile(index){

    localStorage.setItem("teacherProfileIndex", index);

    window.location.href="teachers_profile.html";

}

// ========================================
// Teacher ID Card
// ========================================

function teacherIDCard(index){

    localStorage.setItem("teacherProfileIndex", index);

    window.location.href="teachers_incard.html";

}

// ========================================
// Dashboard Count
// ========================================

function updateTeacherCount(){

    let teachers = JSON.parse(localStorage.getItem("teachers")) || [];

    let count = document.getElementById("teacherCount");

    if(count){

        count.textContent = teachers.length;

    }

}

// ========================================
// Search Suggestion
// ========================================

function loadTeacherSuggestions(){

    let teachers = JSON.parse(localStorage.getItem("teachers")) || [];

    let input = document.getElementById("searchTeacher");

    let list = document.getElementById("teacherSuggestion");

    if(!input || !list) return;

    let keyword = input.value.toLowerCase().trim();

    list.innerHTML = "";

    if(keyword === "") return;

    teachers.forEach((teacher)=>{

        if(
            (teacher.name || "").toLowerCase().includes(keyword) ||
            (teacher.designation || "").toLowerCase().includes(keyword) ||
            (teacher.mobile || "").toLowerCase().includes(keyword)
        ){

            let option = document.createElement("option");

            option.value = teacher.name;

            list.appendChild(option);

        }

    });

}

// ========================================
// Initialize
// ========================================

document.addEventListener("DOMContentLoaded",function(){

    generateTeacherID();

    loadTeachers();

    updateTeacherCount();

});
