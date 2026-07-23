// =========================
// Load Exam List
// =========================

function loadExams() {

    let exams =
    JSON.parse(localStorage.getItem("exams")) || [];

    let search =
    document.getElementById("searchExam").value.toLowerCase();

    let table =
    document.getElementById("examTable");

    if (!table) return;

    table.innerHTML = "";

    exams.forEach((exam, index) => {

        if (
            exam.name.toLowerCase().includes(search) ||
            exam.class.toLowerCase().includes(search)
        ) {

            table.innerHTML += `

            <tr>

            <td>${index + 1}</td>

            <td>${exam.name}</td>

            <td>${exam.class}</td>

            <td>${exam.start}</td>

            <td>${exam.end}</td>

            <td>${exam.description}</td>

            <td>

            <button
            class="btn btn-warning btn-sm"
            onclick="editExam(${index})">

            Edit

            </button>

            <button
            class="btn btn-danger btn-sm"
            onclick="deleteExam(${index})">

            Delete

            </button>

            </td>

            </tr>

            `;

        }

    });

}

// =========================
// Delete Exam
// =========================

function deleteExam(index) {

    if (confirm("Delete this Exam?")) {

        let exams =
        JSON.parse(localStorage.getItem("exams")) || [];

        exams.splice(index, 1);

        localStorage.setItem(
            "exams",
            JSON.stringify(exams)
        );

        loadExams();

    }

}

// =========================
// Edit Exam
// =========================

function editExam(index) {

    localStorage.setItem(
        "examEditIndex",
        index
    );

    window.location.href = "exam.html";

}

// =========================
// Auto Load
// =========================

window.onload = loadExams;
