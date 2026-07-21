function loadIDCard() {

    let index = localStorage.getItem("profileIndex");

    if (index === null) {
        alert("No student selected");
        window.location.href = "students.html";
        return;
    }

    let students = JSON.parse(localStorage.getItem("students")) || [];

    let s = students[index];

    document.getElementById("idName").innerHTML = s.name;
    document.getElementById("idClass").innerHTML = s.class;
    document.getElementById("idRoll").innerHTML = s.roll;
    document.getElementById("studentId").innerHTML = s.id;

    if (s.photo) {
        document.getElementById("idPhoto").src = s.photo;
    }
}

window.onload = loadIDCard;
