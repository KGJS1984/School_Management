// =========================
// Salary History
// =========================

function loadSalary() {

    let salaries =
    JSON.parse(localStorage.getItem("salaries")) || [];

    let search = "";

    let box = document.getElementById("searchSalary");

    if(box){
        search = box.value.toLowerCase();
    }

    let table = document.getElementById("salaryTable");

    if(!table) return;

    table.innerHTML = "";

    salaries.forEach((salary,index)=>{

        if(
            salary.teacher.toLowerCase().includes(search) ||
            salary.designation.toLowerCase().includes(search)
        ){

            table.innerHTML += `

            <tr>

            <td>${index+1}</td>

            <td>${salary.teacher}</td>

            <td>${salary.designation}</td>

            <td>${salary.month}</td>

            <td>৳${salary.basic}</td>

            <td>৳${salary.bonus}</td>

            <td>৳${salary.deduction}</td>

            <td><b>৳${salary.netSalary}</b></td>

            <td>

            <button
            class="btn btn-warning btn-sm"
            onclick="editSalary(${index})">

            Edit

            </button>

            <button
            class="btn btn-danger btn-sm"
            onclick="deleteSalary(${index})">

            Delete

            </button>

            <button
            class="btn btn-success btn-sm"
            onclick="printSalary(${index})">

            Print

            </button>

            </td>

            </tr>

            `;

        }

    });

}

// =========================
// Delete
// =========================

function deleteSalary(index){

    if(confirm("Delete this Salary Record?")){

        let salaries =
        JSON.parse(localStorage.getItem("salaries")) || [];

        salaries.splice(index,1);

        localStorage.setItem(
            "salaries",
            JSON.stringify(salaries)
        );

        loadSalary();

    }

}

// =========================
// Edit
// =========================

function editSalary(index){

    localStorage.setItem(
        "salaryEditIndex",
        index
    );

    window.location.href = "salary.html";

}

// =========================
// Print Salary Slip
// =========================

function printSalary(index){

    let salaries =
    JSON.parse(localStorage.getItem("salaries")) || [];

    let s = salaries[index];

    let w = window.open("", "_blank");

    w.document.write(`

    <html>

    <head>

    <title>Salary Slip</title>

    <style>

    body{
        font-family:Arial;
        padding:40px;
        line-height:2;
    }

    h2,h3{
        text-align:center;
    }

    </style>

    </head>

    <body>

    <h2>Gobindaganj KG & Junior School</h2>

    <h3>Salary Slip</h3>

    <hr>

    <p><b>Teacher :</b> ${s.teacher}</p>

    <p><b>Designation :</b> ${s.designation}</p>

    <p><b>Month :</b> ${s.month}</p>

    <p><b>Basic Salary :</b> ৳${s
