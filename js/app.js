// =========================
// Login
// =========================
function login() {
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    if (email === "admin@gmail.com" && password === "123456") {
        localStorage.setItem("loggedIn", "true");
        window.location.href = "dashboard.html";
    } else {
        alert("❌ Invalid Email or Password");
    }
}

// =========================
// Logout
// =========================
function logout() {
    localStorage.removeItem("loggedIn");
    window.location.href = "index.html";
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
        clock.innerHTML = new Date().toLocaleTimeString();
    }
}

setInterval(updateClock, 1000);

// =========================
// Dashboard Student Count
// =========================
function updateDashboard() {
    let students = JSON.parse(localStorage.getItem("students")) || [];

    const count = document.getElementById("studentCount");
    if (count) {
        count.innerHTML = students.length;
    }
}
window.onload = function () {
    updateClock();
    updateDashboard();
    updateFeeTotal();
};
// =========================
// Save Student
// =========================
function saveStudent() {

    let student = {
    id: Date.now(),
    name: document.getElementById("name").value,
    father: document.getElementById("father").value,
    mother: document.getElementById("mother").value,
    dob: document.getElementById("dob").value,
    gender: document.getElementById("gender").value,
    class: document.getElementById("class").value,
    roll: document.getElementById("roll").value,
    mobile: document.getElementById("mobile").value,
    address: document.getElementById("address").value,
    photo: photoData
};

    let students = JSON.parse(localStorage.getItem("students")) || [];

    let editIndex = localStorage.getItem("editIndex");

    if (editIndex !== null) {
        students[editIndex] = student;
        localStorage.removeItem("editIndex");
        alert("✅ Student Updated Successfully");
    } else {
        students.push(student);
        alert("✅ Student Saved Successfully");
    }

    localStorage.setItem("students", JSON.stringify(students));

    document.getElementById("studentForm").reset();

    window.location.href = "students.html";
}

// =========================
let photoData = "";

function previewPhoto(event) {

    let reader = new FileReader();

    reader.onload = function () {
        photoData = reader.result;
        document.getElementById("photoPreview").src = photoData;
    };

    reader.readAsDataURL(event.target.files[0]);
}
window.addEventListener("load", function () {

    let editIndex = localStorage.getItem("editIndex");

    if (editIndex !== null && document.getElementById("name")) {

        let students = JSON.parse(localStorage.getItem("students")) || [];

        let s = students[editIndex];

        document.getElementById("name").value = s.name;
        document.getElementById("father").value = s.father;
        document.getElementById("mother").value = s.mother;
        document.getElementById("dob").value = s.dob;
        document.getElementById("gender").value = s.gender;
        document.getElementById("class").value = s.class;
        document.getElementById("roll").value = s.roll;
        document.getElementById("mobile").value = s.mobile;
        document.getElementById("address").value = s.address;
    }

});
function updateFeeTotal() {

    let fees = JSON.parse(localStorage.getItem("fees")) || [];

    let total = 0;

    fees.forEach(fee => {
        total += Number(fee.amount);
    });

    let feeTotal = document.getElementById("feeTotal");

    if (feeTotal) {
        feeTotal.innerHTML = "৳" + total;
    }

}
window.addEventListener("load", function () {

    updateClock();
    updateDashboard();
    updateFeeTotal();

});
// =========================
// Student List
// =========================

function loadStudents() {

    let students = JSON.parse(localStorage.getItem("students")) || [];
    let table = document.getElementById("studentTable");

    if (!table) return;

    let search = document.getElementById("search").value.toLowerCase();

    table.innerHTML = "";

    students.forEach((student, index) => {

        if (
            student.name.toLowerCase().includes(search) ||
            student.class.toLowerCase().includes(search)
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

            </tr>`;
        }

    });

}

function editStudent(index) {
    localStorage.setItem("editIndex", index);
    window.location.href = "admissions.html";
}

function deleteStudent(index) {

    if (confirm("Delete this student?")) {

        let students = JSON.parse(localStorage.getItem("students")) || [];

        students.splice(index, 1);

        localStorage.setItem("students", JSON.stringify(students));

        loadStudents();

    }

}

function viewProfile(index) {

    localStorage.setItem("profileIndex", index);

    window.location.href = "profile.html";

                    }
