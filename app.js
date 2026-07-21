function login() {
    let email = document.getElementById("email").value.trim();
    let password = document.getElementById("password").value.trim();

    if (email === "admin@gmail.com" && password === "123456") {
        window.location.assign("dashboard.html");
    } else {
        alert("Wrong Email or Password");
    }
}
