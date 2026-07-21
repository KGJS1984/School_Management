function loadProfile() {

    let index = localStorage.getItem("profileIndex");

    if (index === null) {
        alert("No student selected");
        window.location.href = "students.html";
        return;
    }

    let students = JSON.parse(localStorage.getItem("students")) || [];

    let s = students[index];

    document.getElementById("pName").innerHTML = s.name;
    document.getElementById("pFather").innerHTML = s.father;
    document.getElementById("pMother").innerHTML = s.mother;
    document.getElementById("pClass").innerHTML = s.class;
    document.getElementById("pRoll").innerHTML = s.roll;
    document.getElementById("pMobile").innerHTML = s.mobile;
    document.getElementById("pAddress").innerHTML = s.address;

    if (s.photo) {
        document.getElementById("profilePhoto").src = s.photo;
    }
}

window.onload = loadProfile;
