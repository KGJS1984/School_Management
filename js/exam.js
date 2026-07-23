// =========================
// Exam Management
// =========================

function saveExam() {

    let exam = {

        id: Date.now(),

        name: document.getElementById("examName").value,

        class: document.getElementById("examClass").value,

        start: document.getElementById("examStart").value,

        end: document.getElementById("examEnd").value,

        description: document.getElementById("examDescription").value

    };

    let exams = JSON.parse(localStorage.getItem("exams")) || [];

    let editIndex = localStorage.getItem("examEditIndex");

    if(editIndex !== null){

        exams[editIndex] = exam;

        localStorage.removeItem("examEditIndex");

        alert("✅ Exam Updated Successfully");

    }else{

        exams.push(exam);

        alert("✅ Exam Saved Successfully");

    }

    localStorage.setItem("exams", JSON.stringify(exams));

    document.querySelector("form").reset();

    window.location.href = "exam_list.html";

}

// =========================
// Edit Mode
// =========================

window.addEventListener("load", function(){

    let editIndex = localStorage.getItem("examEditIndex");

    if(editIndex !== null){

        let exams = JSON.parse(localStorage.getItem("exams")) || [];

        let e = exams[editIndex];

        document.getElementById("examName").value = e.name;

        document.getElementById("examClass").value = e.class;

        document.getElementById("examStart").value = e.start;

        document.getElementById("examEnd").value = e.end;

        document.getElementById("examDescription").value = e.description;

    }

});
