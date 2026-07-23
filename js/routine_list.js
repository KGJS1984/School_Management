// =========================
// Load Routine List
// =========================

function loadRoutines() {

    let routines =
    JSON.parse(localStorage.getItem("routines")) || [];

    let search =
    document.getElementById("searchRoutine").value.toLowerCase();

    let table =
    document.getElementById("routineTable");

    if (!table) return;

    table.innerHTML = "";

    routines.forEach((routine, index) => {

        if (
            routine.class.toLowerCase().includes(search) ||
            routine.subject.toLowerCase().includes(search) ||
            routine.teacher.toLowerCase().includes(search)
        ) {

            table.innerHTML += `

            <tr>

            <td>${index + 1}</td>

            <td>${routine.class}</td>

            <td>${routine.day}</td>

            <td>${routine.subject}</td>

            <td>${routine.teacher}</td>

            <td>${routine.time}</td>

            <td>

            <button
            class="btn btn-danger btn-sm"
            onclick="deleteRoutine(${index})">

            Delete

            </button>

            </td>

            </tr>

            `;

        }

    });

}

// =========================
// Delete Routine
// =========================

function deleteRoutine(index) {

    if (confirm("Delete this Routine?")) {

        let routines =
        JSON.parse(localStorage.getItem("routines")) || [];

        routines.splice(index, 1);

        localStorage.setItem(
            "routines",
            JSON.stringify(routines)
        );

        loadRoutines();

    }

}

// =========================
// Auto Load
// =========================

window.onload = loadRoutines;
