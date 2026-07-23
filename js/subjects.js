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

// =========================
// Subject List
// =========================

function loadSubjects() {

    let subjects =
    JSON.parse(localStorage.getItem("subjects")) || [];

    let table =
    document.getElementById("subjectTable");

    if (!table) return;

    let search = "";

    let searchBox = document.getElementById("searchSubject");

    if (searchBox) {
        search = searchBox.value.toLowerCase();
    }

    table.innerHTML = "";

    subjects.forEach((subject, index) => {

        if (
            subject.name.toLowerCase().includes(search) ||
            subject.code.toLowerCase().includes(search) ||
            subject.class.toLowerCase().includes(search)
        ) {

            table.innerHTML += `

            <tr>

                <td>${index + 1}</td>

                <td>${subject.name}</td>

                <td>${subject.code}</td>

                <td>${subject.class}</td>

                <td>${subject.teacher}</td>

                <td>

                    <button
                    class="btn btn-warning btn-sm"
                    onclick="editSubject(${index})">
                    Edit
                    </button>

                    <button
                    class="btn btn-danger btn-sm"
                    onclick="deleteSubject(${index})">
                    Delete
                    </button>

                </td>

            </tr>

            `;
        }

    });

}

// =========================
// Delete Subject
// =========================

function deleteSubject(index){

    if(confirm("Delete this subject?")){

        let subjects =
        JSON.parse(localStorage.getItem("subjects")) || [];

        subjects.splice(index,1);

        localStorage.setItem(
        "subjects",
        JSON.stringify(subjects));

        loadSubjects();

    }

}

// =========================
// Edit Subject
// =========================

function editSubject(index){

    localStorage.setItem(
    "subjectEditIndex",
    index);

    window.location.href =
    "subjects.html";

}

// =========================
// Edit Data Load
// =========================

window.addEventListener("load",function(){

    let editIndex =
    localStorage.getItem("subjectEditIndex");

    if(editIndex !== null){

        let subjects =
        JSON.parse(localStorage.getItem("subjects")) || [];

        let s = subjects[editIndex];

        document.getElementById("subjectName").value = s.name;

        document.getElementById("subjectCode").value = s.code;

        document.getElementById("subjectClass").value = s.class;

        document.getElementById("subjectTeacher").value = s.teacher;

    }

});
