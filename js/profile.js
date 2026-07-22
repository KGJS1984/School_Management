function loadProfile() {

    let index = localStorage.getItem("profileIndex");

    if (index === null) {
        alert("No student selected");
        window.location.href = "students.html";
        return;
    }

    let students = JSON.parse(localStorage.getItem("students")) || [];

    let s = students[index];

    document.getElementById("pname").innerHTML = s.name;
document.getElementById("pfather").innerHTML = s.father;
document.getElementById("pmother").innerHTML = s.mother;
document.getElementById("pclass").innerHTML = s.class;
document.getElementById("proll").innerHTML = s.roll;
document.getElementById("pmobile").innerHTML = s.mobile;
document.getElementById("paddress").innerHTML = s.address;

    if (s.photo) {
        document.getElementById("profilePhoto").src = s.photo;
    }
}

window.onload = loadProfile;
