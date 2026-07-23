// =========================
// Class Management
// =========================

function saveClass(){

    let classData = {

        id: Date.now(),

        className: document.getElementById("className").value,

        section: document.getElementById("section").value,

        classTeacher: document.getElementById("classTeacher").value,

        roomNo: document.getElementById("roomNo").value,

        capacity: document.getElementById("capacity").value

    };

    let classes = JSON.parse(localStorage.getItem("classes")) || [];

    let editIndex = localStorage.getItem("classEditIndex");

    if(editIndex !== null){

        classes[editIndex] = classData;

        localStorage.removeItem("classEditIndex");

        alert("✅ Class Updated Successfully");

    }else{

        classes.push(classData);

        alert("✅ Class Saved Successfully");

    }

    localStorage.setItem("classes", JSON.stringify(classes));

    document.querySelector("form").reset();

    window.location.href="classes_list.html";

}
