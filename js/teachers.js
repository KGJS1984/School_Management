function saveTeacher(){

    let teacher = {

        id: Date.now(),

        name: document.getElementById("teacherName").value,

        designation: document.getElementById("designation").value,

        mobile: document.getElementById("teacherMobile").value,

        email: document.getElementById("teacherEmail").value

    };

    let teachers =
    JSON.parse(localStorage.getItem("teachers")) || [];

    teachers.push(teacher);

    localStorage.setItem("teachers",
    JSON.stringify(teachers));

    alert("✅ Teacher Saved Successfully");

    document.querySelector("form").reset();

}
