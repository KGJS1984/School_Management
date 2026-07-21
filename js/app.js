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
        address: document.getElementById("address").value
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
// Photo Preview
// =========================
function previewPhoto(event) {

    let reader = new FileReader();

    reader.onload = function () {
        document.getElementById("photoPreview").src = reader.result;
    };

    reader.readAsDataURL(event.target.files[0]);

}
