// ======================================================
// Gobindaganj KG & Junior School
// School Management System v3.0
// app.js
// Part-1
// ======================================================

// =========================
// Global Variables
// =========================
let photoData = "";

// =========================
// Local Storage Helpers
// =========================
function getData(key) {
    return JSON.parse(localStorage.getItem(key)) || [];
}

function saveData(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}

// =========================
// Login
// =========================
function login() {

    const email = document.getElementById("email")?.value.trim();
    const password = document.getElementById("password")?.value.trim();

    if (!email || !password) {
        alert("Please enter Email and Password.");
        return;
    }

    if (email === "admin@gmail.com" && password === "123456") {

        localStorage.setItem("loggedIn", "true");
        location.replace("dashboard.html");

    } else {

        alert("Invalid Email or Password");

    }

}

// =========================
// Check Login
// =========================
function checkLogin() {

    const page = location.pathname.split("/").pop();

    if (page !== "index.html" && page !== "") {

        if (localStorage.getItem("loggedIn") !== "true") {

            location.replace("index.html");

        }

    }

}

// =========================
// Logout
// =========================
function logout() {

    if (confirm("Do you want to Logout?")) {

        localStorage.removeItem("loggedIn");
        location.replace("index.html");

    }

}

// =========================
// Sidebar Toggle
// =========================
function toggleMenu() {

    const sidebar = document.getElementById("sidebar");

    if (sidebar) {

        sidebar.classList.toggle("show");

    }

}

// =========================
// Live Clock
// =========================
function updateClock() {

    const clock = document.getElementById("clock");

    if (clock) {

        clock.innerHTML =
        new Date().toLocaleTimeString("en-GB");

    }

}

// =========================
// Dashboard Student Count
// =========================
function updateDashboard() {

    const students = getData("students");

    const studentCount =
        document.getElementById("studentCount");

    if (studentCount) {

        studentCount.innerHTML = students.length;

    }

}

// =========================
// Dashboard Teacher Count
// =========================
function updateTeacherCount() {

    const teachers = getData("teachers");

    const teacherCount =
        document.getElementById("teacherTotal");

    if (teacherCount) {

        teacherCount.innerHTML = teachers.length;

    }

}

// =========================
// Generate Unique ID
// =========================
function generateID() {

    if (window.crypto &&
        crypto.randomUUID) {

        return crypto.randomUUID();

    }

    return Date.now().toString();

}

// =========================
// Window Load
// =========================
window.addEventListener("load", () => {

    checkLogin();

    updateClock();

    setInterval(updateClock, 1000);

    updateDashboard();

    updateTeacherCount();

    updateFeeTotal();

    updateStatistics();

});

// ======================================================
// Part-2 : Student Management
// ======================================================

// =========================
// Photo Upload
// =========================

function previewPhoto(event) {

    const file = event.target.files[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onload = function (e) {

        photoData = e.target.result;

        const img = document.getElementById("photoPreview");

        if (img) {
            img.src = photoData;
        }

    };

    reader.readAsDataURL(file);

}

// =========================
// Save Student
// =========================
function saveStudent() {

    const student = {

        id: generateID(),

        name: document.getElementById("name")?.value.trim(),

        father: document.getElementById("father")?.value.trim(),

        mother: document.getElementById("mother")?.value.trim(),

        dob: document.getElementById("dob")?.value,

        gender: document.getElementById("gender")?.value,

        class: document.getElementById("class")?.value,

        roll: document.getElementById("roll")?.value.trim(),

        mobile: document.getElementById("mobile")?.value.trim(),

        address: document.getElementById("address")?.value.trim(),

        photo: photoData

    };

    if (!student.name || !student.class || !student.roll) {

        alert("Please fill all required fields.");

        return;

    }

    let students = getData("students");

    const editIndex = localStorage.getItem("editIndex");

    if (editIndex === null) {

        const duplicate = students.find(s =>
            s.class === student.class &&
            s.roll === student.roll
        );

        if (duplicate) {

            alert("Roll already exists in this class.");

            return;

        }

        students.push(student);

        alert("Student Saved Successfully.");

    }

    else {

        student.id = students[editIndex].id;

        if (!photoData) {

            student.photo = students[editIndex].photo;

        }

        students[editIndex] = student;

        localStorage.removeItem("editIndex");

        alert("Student Updated Successfully.");

    }

    saveData("students", students);

    document.getElementById("studentForm")?.reset();

    photoData = "";

    location.href = "students.html";

}

// =========================
// Load Student for Edit
// =========================
function loadStudentForEdit() {

    const editIndex = localStorage.getItem("editIndex");

    if (editIndex === null) return;

    const students = getData("students");

    const s = students[editIndex];

    if (!s) return;

    document.getElementById("name").value = s.name;

    document.getElementById("father").value = s.father;

    document.getElementById("mother").value = s.mother;

    document.getElementById("dob").value = s.dob;

    document.getElementById("gender").value = s.gender;

    document.getElementById("class").value = s.class;

    document.getElementById("roll").value = s.roll;

    document.getElementById("mobile").value = s.mobile;

    document.getElementById("address").value = s.address;

    photoData = s.photo || "";

    const img = document.getElementById("photoPreview");

    if (img && s.photo) {

        img.src = s.photo;

    }

}

// =========================
// Student List
// =========================
function loadStudents() {

    const students = getData("students");

    const table = document.getElementById("studentTable");

    if (!table) return;

    const search =
        document.getElementById("search")?.value.toLowerCase() || "";

    table.innerHTML = "";

    students.forEach((student, index) => {

        const name =
            (student.name || "").toLowerCase();

        const cls =
            (student.class || "").toLowerCase();

        const roll =
            (student.roll || "").toString();

        if (
            name.includes(search) ||
            cls.includes(search) ||
            roll.includes(search)
        ) {

            table.innerHTML += `

<tr>

<td>${index + 1}</td>

<td>${student.name}</td>

<td>${student.father}</td>

<td>${student.class}</td>

<td>${student.roll}</td>

<td>${student.mobile}</td>

<td>

<button class="btn btn-info btn-sm"
onclick="viewProfile(${index})">
Profile
</button>

<button class="btn btn-warning btn-sm"
onclick="editStudent(${index})">
Edit
</button>

<button class="btn btn-danger btn-sm"
onclick="deleteStudent(${index})">
Delete
</button>

</td>

</tr>

`;

        }

    });

}

// =========================
// Edit Student
// =========================
function editStudent(index) {

    localStorage.setItem("editIndex", index);

    location.href = "admissions.html";

}

// =========================
// Delete Student
// =========================
function deleteStudent(index) {

    if (!confirm("Delete this student?")) return;

    let students = getData("students");

    students.splice(index, 1);

    saveData("students", students);

    loadStudents();

    updateDashboard();

}

// =========================
// View Profile
// =========================
function viewProfile(index) {

    localStorage.setItem("profileIndex", index);

    location.href = "profile.html";

}

// =========================
// Auto Load Edit Data
// =========================
window.addEventListener("load", function () {

    loadStudentForEdit();

    loadStudents();

});
// ======================================================
// Part-3 : Teacher Management
// ======================================================

// =========================
// Save Teacher
// =========================
function saveTeacher() {

    const teacher = {

        id: generateID(),

        name: document.getElementById("teacherName")?.value.trim(),

        designation: document.getElementById("designation")?.value.trim(),

        subject: document.getElementById("subject")?.value.trim(),

        mobile: document.getElementById("teacherMobile")?.value.trim(),

        email: document.getElementById("teacherEmail")?.value.trim(),

        address: document.getElementById("teacherAddress")?.value.trim(),

        photo: photoData

    };

    if (!teacher.name || !teacher.designation) {

        alert("Please fill all required fields.");

        return;

    }

    let teachers = getData("teachers");

    const editIndex = localStorage.getItem("teacherEditIndex");

    if (editIndex === null) {

        teachers.push(teacher);

        alert("Teacher Saved Successfully.");

    } else {

        teacher.id = teachers[editIndex].id;

        if (!photoData) {

            teacher.photo = teachers[editIndex].photo;

        }

        teachers[editIndex] = teacher;

        localStorage.removeItem("teacherEditIndex");

        alert("Teacher Updated Successfully.");

    }

    saveData("teachers", teachers);

    document.getElementById("teacherForm")?.reset();

    photoData = "";

    location.href = "teachers.html";

}

// =========================
// Load Teacher List
// =========================
function loadTeachers() {

    const teachers = getData("teachers");

    const table = document.getElementById("teacherTable");

    if (!table) return;

    const search =
        document.getElementById("teacherSearch")?.value.toLowerCase() || "";

    table.innerHTML = "";

    teachers.forEach((teacher, index) => {

        const name =
            (teacher.name || "").toLowerCase();

        const subject =
            (teacher.subject || "").toLowerCase();

        if (
            name.includes(search) ||
            subject.includes(search)
        ) {

            table.innerHTML += `

<tr>

<td>${index + 1}</td>

<td>${teacher.name}</td>

<td>${teacher.designation}</td>

<td>${teacher.subject}</td>

<td>${teacher.mobile}</td>

<td>

<button class="btn btn-info btn-sm"
onclick="viewTeacher(${index})">
Profile
</button>

<button class="btn btn-warning btn-sm"
onclick="editTeacher(${index})">
Edit
</button>

<button class="btn btn-danger btn-sm"
onclick="deleteTeacher(${index})">
Delete
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
function editTeacher(index) {

    localStorage.setItem("teacherEditIndex", index);

    location.href = "teacher_admission.html";

}

// =========================
// Delete Teacher
// =========================
function deleteTeacher(index) {

    if (!confirm("Delete this teacher?")) return;

    let teachers = getData("teachers");

    teachers.splice(index, 1);

    saveData("teachers", teachers);

    loadTeachers();

    updateTeacherCount();

}

// =========================
// View Teacher Profile
// =========================
function viewTeacher(index) {

    localStorage.setItem("teacherProfileIndex", index);

    location.href = "teacher_profile.html";

}

// =========================
// Load Teacher For Edit
// =========================
function loadTeacherForEdit() {

    const editIndex =
        localStorage.getItem("teacherEditIndex");

    if (editIndex === null) return;

    const teachers = getData("teachers");

    const t = teachers[editIndex];

    if (!t) return;

    document.getElementById("teacherName").value = t.name;

    document.getElementById("designation").value = t.designation;

    document.getElementById("subject").value = t.subject;

    document.getElementById("teacherMobile").value = t.mobile;

    document.getElementById("teacherEmail").value = t.email;

    document.getElementById("teacherAddress").value = t.address;

    photoData = t.photo || "";

    const img = document.getElementById("photoPreview");

    if (img && t.photo) {

        img.src = t.photo;

    }

}

// =========================
// Auto Load
// =========================
window.addEventListener("load", function () {

    loadTeachers();

    loadTeacherForEdit();

});
// ======================================================
// Part-4 : Attendance Management
// ======================================================

// =========================
// Save Attendance
// =========================
function saveAttendance() {

    const date =
        document.getElementById("attendanceDate")?.value ||
        new Date().toISOString().split("T")[0];

    let attendance = [];

    document.querySelectorAll(".attendance-row").forEach(row => {

        attendance.push({

            id: row.dataset.id,

            name: row.dataset.name,

            class: row.dataset.class,

            roll: row.dataset.roll,

            status: row.querySelector(".status").value

        });

    });

    saveData("attendance_" + date, attendance);

    alert("Attendance Saved Successfully.");

    updateStatistics();

}

// =========================
// Load Attendance Students
// =========================
function loadAttendanceStudents() {

    const table =
        document.getElementById("attendanceTable");

    if (!table) return;

    const students = getData("students");

    table.innerHTML = "";

    students.forEach(student => {

        table.innerHTML += `

<tr class="attendance-row"

data-id="${student.id}"

data-name="${student.name}"

data-class="${student.class}"

data-roll="${student.roll}">

<td>${student.name}</td>

<td>${student.class}</td>

<td>${student.roll}</td>

<td>

<select class="form-select status">

<option value="Present">Present</option>

<option value="Absent">Absent</option>

<option value="Leave">Leave</option>

</select>

</td>

</tr>

`;

    });

}

// =========================
// Load Attendance Report
// =========================
function loadAttendanceReport() {

    const table =
        document.getElementById("attendanceReport");

    if (!table) return;

    const date =
        document.getElementById("attendanceDate")?.value ||
        new Date().toISOString().split("T")[0];

    const attendance =
        getData("attendance_" + date);

    table.innerHTML = "";

    attendance.forEach((a, index) => {

        table.innerHTML += `

<tr>

<td>${index + 1}</td>

<td>${a.name}</td>

<td>${a.class}</td>

<td>${a.roll}</td>

<td>${a.status}</td>

</tr>

`;

    });

}

// =========================
// Dashboard Attendance
// =========================
function updateStatistics() {

    const today =
        new Date().toISOString().split("T")[0];

    const attendance =
        getData("attendance_" + today);

    let present = 0;

    let absent = 0;

    let leave = 0;

    attendance.forEach(a => {

        if (a.status === "Present") present++;

        else if (a.status === "Absent") absent++;

        else leave++;

    });

    if (document.getElementById("attendanceCount")) {

        document.getElementById("attendanceCount").innerHTML = present;

    }

    if (document.getElementById("presentCount")) {

        document.getElementById("presentCount").innerHTML = present;

    }

    if (document.getElementById("absentCount")) {

        document.getElementById("absentCount").innerHTML = absent;

    }

    if (document.getElementById("leaveCount")) {

        document.getElementById("leaveCount").innerHTML = leave;

    }

}

// =========================
// Auto Load
// =========================
window.addEventListener("load", function () {

    loadAttendanceStudents();

    loadAttendanceReport();

});
// ======================================================
// Part-5 : Result Management
// ======================================================

// =========================
// Grade Function
// =========================
function getGrade(mark){

    if(mark>=80) return {grade:"A+", gpa:5.00};
    if(mark>=70) return {grade:"A", gpa:4.00};
    if(mark>=60) return {grade:"A-", gpa:3.50};
    if(mark>=50) return {grade:"B", gpa:3.00};
    if(mark>=40) return {grade:"C", gpa:2.00};
    if(mark>=33) return {grade:"D", gpa:1.00};

    return {grade:"F", gpa:0.00};

}

// =========================
// Save Result
// =========================
function saveResult(){

    let result={

        id:generateID(),

        student:document.getElementById("studentName").value,

        class:document.getElementById("studentClass").value,

        roll:document.getElementById("studentRoll").value,

        exam:document.getElementById("examName").value,

        bangla:Number(document.getElementById("bangla").value),

        english:Number(document.getElementById("english").value),

        math:Number(document.getElementById("math").value),

        science:Number(document.getElementById("science").value),

        religion:Number(document.getElementById("religion").value)

    };

    result.total=
    result.bangla+
    result.english+
    result.math+
    result.science+
    result.religion;

    result.average=(result.total/5).toFixed(2);

    let grade=getGrade(result.average);

    result.grade=grade.grade;

    result.gpa=grade.gpa;

    let results=getData("results");

    results.push(result);

    saveData("results",results);

    alert("Result Saved Successfully.");

    document.getElementById("resultForm").reset();

    loadResults();

}

// =========================
// Load Results
// =========================
function loadResults(){

    let table=document.getElementById("resultTable");

    if(!table) return;

    let results=getData("results");

    results.sort((a,b)=>b.total-a.total);

    table.innerHTML="";

    results.forEach((r,index)=>{

        table.innerHTML+=`

<tr>

<td>${index+1}</td>

<td>${r.student}</td>

<td>${r.class}</td>

<td>${r.roll}</td>

<td>${r.exam}</td>

<td>${r.total}</td>

<td>${r.average}</td>

<td>${r.grade}</td>

<td>${r.gpa}</td>

<td>${index+1}</td>

<td>

<button class="btn btn-info btn-sm"
onclick="printResult(${index})">
Print
</button>

<button class="btn btn-danger btn-sm"
onclick="deleteResult(${index})">
Delete
</button>

</td>

</tr>

`;

    });

}

// =========================
// Delete Result
// =========================
function deleteResult(index){

    if(!confirm("Delete Result?")) return;

    let results=getData("results");

    results.splice(index,1);

    saveData("results",results);

    loadResults();

}

// =========================
// Print Result
// =========================
function printResult(index){

    let results=getData("results");

    localStorage.setItem(
        "printResultIndex",
        index
    );

    location.href="result_print.html";

}

// =========================
// Search Result
// =========================
function searchResult(){

    let keyword=document
    .getElementById("resultSearch")
    .value
    .toLowerCase();

    let rows=document.querySelectorAll(
        "#resultTable tr"
    );

    rows.forEach(row=>{

        row.style.display=
        row.innerText
        .toLowerCase()
        .includes(keyword)
        ? ""
        : "none";

    });

}

// =========================
// Auto Load
// =========================
window.addEventListener("load",function(){

    loadResults();

});
// ======================================================
// Part-6 : Fee Collection System
// ======================================================

// =========================
// Save Fee
// =========================
function saveFee() {

    const fee = {

        id: generateID(),

        student: document.getElementById("studentName")?.value.trim(),

        class: document.getElementById("studentClass")?.value,

        roll: document.getElementById("studentRoll")?.value.trim(),

        month: document.getElementById("feeMonth")?.value,

        type: document.getElementById("feeType")?.value,

        amount: Number(document.getElementById("feeAmount")?.value),

        payment: document.getElementById("paymentMethod")?.value,

        date: document.getElementById("feeDate")?.value

    };

    if (!fee.student || !fee.amount) {

        alert("Please fill all required fields.");

        return;

    }

    let fees = getData("fees");

    fees.push(fee);

    saveData("fees", fees);

    alert("Fee Collected Successfully.");

    document.getElementById("feeForm")?.reset();

    loadFees();

    updateFeeTotal();

}

// =========================
// Load Fees
// =========================
function loadFees() {

    const table = document.getElementById("feeTable");

    if (!table) return;

    const fees = getData("fees");

    table.innerHTML = "";

    fees.forEach((fee, index) => {

        table.innerHTML += `

<tr>

<td>${index + 1}</td>

<td>${fee.student}</td>

<td>${fee.class}</td>

<td>${fee.roll}</td>

<td>${fee.month}</td>

<td>${fee.type}</td>

<td>৳ ${fee.amount}</td>

<td>${fee.payment}</td>

<td>${fee.date}</td>

<td>

<button class="btn btn-success btn-sm"
onclick="printReceipt(${index})">
Receipt
</button>

<button class="btn btn-danger btn-sm"
onclick="deleteFee(${index})">
Delete
</button>

</td>

</tr>

`;

    });

}

// =========================
// Delete Fee
// =========================
function deleteFee(index) {

    if (!confirm("Delete this fee record?")) return;

    let fees = getData("fees");

    fees.splice(index, 1);

    saveData("fees", fees);

    loadFees();

    updateFeeTotal();

}

// =========================
// Dashboard Total Collection
// =========================
function updateFeeTotal() {

    const fees = getData("fees");

    let total = 0;

    fees.forEach(fee => {

        total += Number(fee.amount || 0);

    });

    const feeTotal =
        document.getElementById("feeTotal");

    if (feeTotal) {

        feeTotal.innerHTML = "৳ " + total;

    }

}

// =========================
// Print Receipt
// =========================
function printReceipt(index) {

    localStorage.setItem(
        "receiptIndex",
        index
    );

    location.href = "receipt.html";

}

// =========================
// Search Fee
// =========================
function searchFee() {

    const keyword =
        document.getElementById("feeSearch")
        ?.value
        .toLowerCase() || "";

    const rows =
        document.querySelectorAll("#feeTable tr");

    rows.forEach(row => {

        row.style.display =
            row.innerText
            .toLowerCase()
            .includes(keyword)
            ? ""
            : "none";

    });

}

// =========================
// Monthly Collection
// =========================
function monthlyCollection(month) {

    const fees = getData("fees");

    let total = 0;

    fees.forEach(fee => {

        if (fee.month === month) {

            total += Number(fee.amount);

        }

    });

    return total;

}

// =========================
// Auto Load
// =========================
window.addEventListener("load", function () {

    loadFees();

});
