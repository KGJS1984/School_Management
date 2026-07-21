function login() {

    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    if (email === "admin@gmail.com" && password === "123456") {
        window.location.href = "dashboard.html";
    } else {
        alert("Wrong Email or Password");
    }

}
function toggleMenu(){
    document.getElementById("sidebar").classList.toggle("show");
}
function updateClock() {
    const now = new Date();
    document.getElementById("clock").innerHTML =
        now.toLocaleTimeString();
}

setInterval(updateClock, 1000);
updateClock();