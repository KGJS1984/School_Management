// =========================
// Attendance Report
// =========================

function loadAttendanceReport() {

    let date = document.getElementById("reportDate").value;

    if (date === "") {
        alert("Please select a date.");
        return;
    }

    let report =
        JSON.parse(localStorage.getItem("attendance_" + date)) || [];

    let table = document.getElementById("reportTable");

    table.innerHTML = "";

    let present = 0;
    let absent = 0;
    let leave = 0;

    report.forEach((student, index) => {

        if(student.status === "Present") present++;
        if(student.status === "Absent") absent++;
        if(student.status === "Leave") leave++;

        table.innerHTML += `
        <tr>
            <td>${index + 1}</td>
            <td>${student.name}</td>
            <td>${student.class}</td>
            <td>${student.roll}</td>
            <td>${student.status}</td>
        </tr>
        `;

    });

    table.innerHTML += `
    <tr class="table-primary">
        <td colspan="5">
            <b>
            Present: ${present}
            &nbsp;&nbsp;|
            &nbsp;&nbsp;
            Absent: ${absent}
            &nbsp;&nbsp;|
            &nbsp;&nbsp;
            Leave: ${leave}
            </b>
        </td>
    </tr>
    `;

}
