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
    const clock = document.getElementById("clock");
    if (clock) {
        clock.innerHTML = new Date().toLocaleTimeString();
    }
}

setInterval(updateClock, 1000);
updateClock();

setInterval(updateClock, 1000);
updateClock();
