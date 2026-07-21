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
