alert("app.js is loaded");

function login() {
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    if (email === "admin@gmail.com" && password === "123456") {
        window.location.href = "dashboard.html";
    } else {
        alert("Wrong Email or Password");
    }
}
function login() {
    alert("Login button works!");

    let email = document.getElementById("email").value.trim();
    let password = document.getElementById("password").value.trim();

    if (email === "admin@gmail.com" && password === "123456") {
        alert("Success");
        window.location.href = "dashboard.html";
    } else {
        alert("Wrong Email or Password");
    }
}
