// =========================
// Load Students
// =========================

function loadAttendance() {

    let students = JSON.parse(localStorage.getItem("students")) || [];

    let table = document.getElementById("attendanceTable");

    table.innerHTML = "";

    students.forEach((student, index) => {

        table.innerHTML += `
        <tr>

            <td>${index + 1}</td>

            <td>${student.name}</td>

            <td>${student.class}</td>

            <td>${student.roll}</td>

            <td>

                <select id="status${index}" class="form-select">

                    <option value="Present">✅ Present</option>

                    <option value="Absent">❌ Absent</option>

                    <option value="Leave">🟡 Leave</option>

                </select>

            </td>

        </tr>
        `;

    });

}

// =========================
// Save Attendance
// =========================

function saveAttendance() {

    let date = document.getElementById("attendanceDate").value;

    if(date == ""){

        alert("Please select a date.");

        return;

    }

    let students = JSON.parse(localStorage.getItem("students")) || [];

    let attendance = [];

    students.forEach((student, index) => {

        attendance.push({

            name: student.name,

            class: student.class,

            roll: student.roll,

            status: document.getElementById("status" + index).value

        });

    });

    localStorage.setItem("attendance_" + date, JSON.stringify(attendance));

    alert("✅ Attendance Saved Successfully");

}

window.onload = function () {

    document.getElementById("attendanceDate").value =
        new Date().toISOString().split("T")[0];

    loadAttendance();

};
