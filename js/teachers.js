// =====================================
// TEACHERS.JS V2.0
// Part 1
// =====================================

let teacherPhotoData = "";

// ---------- Photo Preview ----------
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

// ---------- Save Teacher ----------
function saveTeacher(){

    const teacher = {

        id: Date.now(),

        name: document.getElementById("teacherName").value.trim(),

        designation: document.getElementById("designation").value.trim(),

        mobile: document.getElementById("teacherMobile").value.trim(),

        email: document.getElementById("teacherEmail").value.trim(),

        photo: teacherPhotoData

    };

    if(teacher.name===""){

        alert("Teacher name is required.");

        return;

    }

    let teachers = JSON.parse(localStorage.getItem("teachers")) || [];

    teachers.push(teacher);

    localStorage.setItem("teachers", JSON.stringify(teachers));

    alert("✅ Teacher Saved Successfully");

    window.location.href="teachers_list.html";

}
