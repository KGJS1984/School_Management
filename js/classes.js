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

// =========================
// Class List
// =========================

function loadClasses(){

    let classes = JSON.parse(localStorage.getItem("classes")) || [];

    let search = "";

    let searchBox = document.getElementById("searchClass");

    if(searchBox){

        search = searchBox.value.toLowerCase();

    }

    let table = document.getElementById("classTable");

    if(!table) return;

    table.innerHTML = "";

    classes.forEach((c,index)=>{

        if(

            c.className.toLowerCase().includes(search) ||

            c.section.toLowerCase().includes(search)

        ){

            table.innerHTML += `

            <tr>

            <td>${index+1}</td>

            <td>${c.className}</td>

            <td>${c.section}</td>

            <td>${c.classTeacher}</td>

            <td>${c.roomNo}</td>

            <td>${c.capacity}</td>

            <td>

<button class="btn btn-warning btn-sm"

onclick="editClass(${index})">

Edit

</button>

<button class="btn btn-danger btn-sm"

onclick="deleteClass(${index})">

Delete

</button>

</td>

</tr>

`;

        }

    });

}

function deleteClass(index){

    if(confirm("Delete this class?")){

        let classes = JSON.parse(localStorage.getItem("classes")) || [];

        classes.splice(index,1);

        localStorage.setItem("classes",JSON.stringify(classes));

        loadClasses();

    }

}

function editClass(index){

    localStorage.setItem("classEditIndex",index);

    window.location.href="classes.html";

}
