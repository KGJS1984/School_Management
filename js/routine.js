// =========================
// Save Routine
// =========================

function saveRoutine() {

    let routine = {

        id: Date.now(),

        class: document.getElementById("routineClass").value,

        day: document.getElementById("routineDay").value,

        subject: document.getElementById("routineSubject").value,

        teacher: document.getElementById("routineTeacher").value,

        time: document.getElementById("routineTime").value

    };

    let routines =
    JSON.parse(localStorage.getItem("routines")) || [];

    routines.push(routine);

    localStorage.setItem(
        "routines",
        JSON.stringify(routines)
    );

    alert("✅ Routine Saved Successfully");

    document.querySelector("form").reset();

    window.location.href = "routine_list.html";

}
