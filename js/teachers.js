// ---------- Save Teacher ----------
function saveTeacher() {

    let teacher = {
        id: Date.now(),
        name: document.getElementById("teacherName").value.trim(),
        designation: document.getElementById("designation").value.trim(),
        mobile: document.getElementById("teacherMobile").value.trim(),
        email: document.getElementById("teacherEmail").value.trim(),
        photo: teacherPhotoData
    };

    // Validation
    if (teacher.name === "") {
        alert("Please enter Teacher Name.");
        return;
    }

    let teachers = JSON.parse(localStorage.getItem("teachers")) || [];

    let editIndex = localStorage.getItem("teacherEditIndex");

    // Duplicate Mobile Check
    let duplicate = teachers.find((t, i) =>
        t.mobile === teacher.mobile &&
        teacher.mobile !== "" &&
        i != editIndex
    );

    if (duplicate) {
        alert("This mobile number already exists.");
        return;
    }

    if (editIndex !== null) {

        teacher.id = teachers[editIndex].id;

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

    let img = document.getElementById("teacherPhotoPreview");

    if (img) {
        img.src = "https://via.placeholder.com/120";
    }

    window.location.href = "teachers_list.html";
}

// =========================
// Load Teachers
// =========================

function loadTeachers() {

    let teachers = JSON.parse(localStorage.getItem("teachers")) || [];

    let table = document.getElementById("teacherTable");

    if (!table) return;

    let search = "";

    let searchBox = document.getElementById("searchTeacher");

    if (searchBox) {
        search = searchBox.value.toLowerCase();
    }

    table.innerHTML = "";

    teachers.forEach((teacher, index) => {

        if (
            (teacher.name || "").toLowerCase().includes(search)
            (teacher.designation || "").toLowerCase().includes(search)
            (teacher.mobile || "").toLowerCase().includes(search)
            (teacher.email || "").toLowerCase().includes(search)
        ) {

            table.innerHTML += `
            <tr>

                <td>${index + 1}</td>

                <td>
                    ${teacher.photo ?
                    `<img src="${teacher.photo}"
                    width="40"
                    height="40"
                    style="border-radius:50%;margin-right:8px;">`
                    : ""}
                    ${teacher.name}
                </td>

                <td>${teacher.designation}</td>

                <td>${teacher.mobile}</td>

                <td>${teacher.email}</td>

                <td>

                    <button class="btn btn-primary btn-sm"
                    onclick="teacherID(${index})">
                    🪪
                    </button>

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

    if(confirm("Are you sure to delete this teacher?")){

        let teachers = JSON.parse(localStorage.getItem("teachers")) || [];

        teachers.splice(index,1);

        localStorage.setItem("teachers", JSON.stringify(teachers));

        loadTeachers();

        updateTeacherCount();

    }

}

// =========================
// Teacher Profile
// =========================
function viewTeacherProfile(index){

    localStorage.setItem("teacherProfileIndex", index);

    window.location.href = "teachers_profile.html";

}

// =========================
// Teacher ID Card
// =========================
function teacherID(index){

    localStorage.setItem("teacherProfileIndex", index);

    window.location.href = "teachers_incard.html";

}

// =========================
// Dashboard Teacher Count
// =========================
function updateTeacherCount(){

    let teachers = JSON.parse(localStorage.getItem("teachers")) || [];

    let count = document.getElementById("teacherCount");

    if(count){

        count.innerHTML = teachers.length;

    }

}

// =========================
// Auto Load
// =========================
window.addEventListener("DOMContentLoaded", function(){

    loadTeachers();

    updateTeacherCount();

    let editIndex = localStorage.getItem("teacherEditIndex");

    if(editIndex !== null && document.getElementById("teacherName")){

        let teachers = JSON.parse(localStorage.getItem("teachers")) || [];

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

});

// =========================
// Smart Search Suggestion
// =========================

function loadTeacherSuggestions(){

    let teachers = JSON.parse(localStorage.getItem("teachers")) || [];

    let input = document.getElementById("searchTeacher");
    let list = document.getElementById("teacherSuggestion");

    if(!input || !list) return;

    let keyword = input.value.toLowerCase();

    list.innerHTML = "";

    if(keyword === "") return;

    teachers.forEach((teacher)=>{

        if(
            teacher.name.toLowerCase().includes(keyword) ||
            teacher.designation.toLowerCase().includes(keyword) ||
            teacher.mobile.toLowerCase().includes(keyword) ||
            teacher.email.toLowerCase().includes(keyword)
        ){

            let option = document.createElement("option");

            option.value = teacher.name;

            list.appendChild(option);

        }

    });

}

// =========================
// Find Teacher By ID
// =========================

function getTeacher(index){

    let teachers = JSON.parse(localStorage.getItem("teachers")) || [];

    return teachers[index];

}

// =========================
// Recent Teachers
// =========================

function getRecentTeachers(limit = 5){

    let teachers = JSON.parse(localStorage.getItem("teachers")) || [];

    return teachers.slice(-limit).reverse();

}

// =========================
// Export Teachers
// =========================

function exportTeachers(){

    let teachers = JSON.parse(localStorage.getItem("teachers")) || [];

    if(teachers.length===0){

        alert("No teacher found.");

        return;

    }

    let data = JSON.stringify(teachers,null,2);

    let blob = new Blob([data],{type:"application/json"});

    let url = URL.createObjectURL(blob);

    let a=document.createElement("a");

    a.href=url;

    a.download="teachers_backup.json";

    a.click();

    URL.revokeObjectURL(url);

}

// =========================
// Clear Teacher Data
// =========================

function clearTeachers(){

    if(confirm("Delete all teachers?")){

        localStorage.removeItem("teachers");

        loadTeachers();

        updateTeacherCount();

        alert("All teachers deleted.");

    }

}
