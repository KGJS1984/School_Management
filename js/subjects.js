// =========================
// Subject Management
// =========================

function saveSubject() {

    let subject = {
        id: Date.now(),
        name: document.getElementById("subjectName").value,
        code: document.getElementById("subjectCode").value,
        class: document.getElementById("subjectClass").value,
        teacher: document.getElementById("subjectTeacher").value
    };

    let subjects =
    JSON.parse(localStorage.getItem("subjects")) || [];

    let editIndex =
    localStorage.getItem("subjectEditIndex");

    if(editIndex !== null){

        subjects[editIndex] = subject;

        localStorage.removeItem("subjectEditIndex");

        alert("✅ Subject Updated Successfully");

    }else{

        subjects.push(subject);

        alert("✅ Subject Saved Successfully");

    }

    localStorage.setItem(
        "subjects",
        JSON.stringify(subjects)
    );

    document.querySelector("form").reset();

    window.location.href = "subjects_list.html";

}
