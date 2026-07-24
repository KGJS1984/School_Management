// ---------- Save Teacher ----------
function saveTeacher() {

    let teacher = {
        id: Date.now(),
        name: document.getElementById("teacherName").value.trim(),
        designation: document.getElementById("designation").value.trim(),
        mobile: document.getElementById("teacherMobile").value.trim(),
        email: document.getElementById("teacherEmail").value.trim(),
        photo: teacherPhotoData
    };

    // Validation
    if (teacher.name === "") {
        alert("Please enter Teacher Name.");
        return;
    }

    let teachers = JSON.parse(localStorage.getItem("teachers")) || [];

    let editIndex = localStorage.getItem("teacherEditIndex");

    // Duplicate Mobile Check
    let duplicate = teachers.find((t, i) =>
        t.mobile === teacher.mobile &&
        teacher.mobile !== "" &&
        i != editIndex
    );

    if (duplicate) {
        alert("This mobile number already exists.");
        return;
    }

    if (editIndex !== null) {

        teacher.id = teachers[editIndex].id;

        teachers[editIndex] = teacher;

        localStorage.removeItem("teacherEditIndex");

        alert("✅ Teacher Updated Successfully");

    } else {

        teachers.push(teacher);

        alert("✅ Teacher Saved Successfully");

    }

    localStorage.setItem("teachers", JSON.stringify(teachers));

    document.querySelector("form").reset();

    teacherPhotoData = "";

    let img = document.getElementById("teacherPhotoPreview");

    if (img) {
        img.src = "https://via.placeholder.com/120";
    }

    window.location.href = "teachers_list.html";
}
