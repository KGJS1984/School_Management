function login() {
    let email = document.getElementById("email").value.trim();
    let password = document.getElementById("password").value.trim();

    if (email === "admin@gmail.com" && password === "123456") {
        window.location.assign("dashboard.html");
    } else {
        alert("Wrong Email or Password");
    }
}
function saveStudent() {

    let student = {
        name: document.getElementById("name").value,
        father: document.getElementById("father").value,
        mother: document.getElementById("mother").value,
        class: document.getElementById("class").value,
        roll: document.getElementById("roll").value
    };

    let students = JSON.parse(localStorage.getItem("students")) || [];

    students.push(student);

    localStorage.setItem("students", JSON.stringify(students));

    alert("Student Saved Successfully");

}
// Photo Preview
function previewPhoto(event) {
    const reader = new FileReader();

    reader.onload = function () {
        document.getElementById("photoPreview").src = reader.result;
    };

    reader.readAsDataURL(event.target.files[0]);
}

// Save Student
function saveStudent() {

    let student = {
        id: "STD" + Date.now(),

        name: document.getElementById("name").value,
        father: document.getElementById("father").value,
        mother: document.getElementById("mother").value,
        dob: document.getElementById("dob").value,
        gender: document.getElementById("gender").value,
        class: document.getElementById("class").value,
        roll: document.getElementById("roll").value,
        mobile: document.getElementById("mobile").value,
        address: document.getElementById("address").value,
        photo: document.getElementById("photoPreview").src
    };

    let students = JSON.parse(localStorage.getItem("students")) || [];

    students.push(student);

    localStorage.setItem("students", JSON.stringify(students));

    alert("✅ Student Saved Successfully");

    document.getElementById("studentForm").reset();

    document.getElementById("photoPreview").src =
        "https://via.placeholder.com/150";
}
