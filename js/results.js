// =========================
// Result Management
// =========================

function saveResult() {

    let result = {
        id: Date.now(),
        student: document.getElementById("studentName").value,
        class: document.getElementById("studentClass").value,
        roll: document.getElementById("studentRoll").value,
        exam: document.getElementById("examName").value,
        bangla: Number(document.getElementById("bangla").value),
        english: Number(document.getElementById("english").value),
        math: Number(document.getElementById("math").value)
        window.location.href = "results_list.html";
    };
window.location.href="results.html";
    result.total =
        result.bangla +
        result.english +
        result.math;

    result.average = (result.total / 3).toFixed(2);

    if(result.average >= 80){
        result.grade = "A+";
    }else if(result.average >= 70){
        result.grade = "A";
    }else if(result.average >= 60){
        result.grade = "A-";
    }else if(result.average >= 50){
        result.grade = "B";
    }else if(result.average >= 40){
        result.grade = "C";
    }else if(result.average >= 33){
        result.grade = "D";
    }else{
        result.grade = "F";
    }

    let results =
    JSON.parse(localStorage.getItem("results")) || [];

    results.push(result);

    localStorage.setItem(
        "results",
        JSON.stringify(results)
    );

    alert("✅ Result Saved Successfully");

    document.querySelector("form").reset();

    window.location.href = "results_list.html";
}

// =========================
// Result List
// =========================

function loadResults(){

    let results =
    JSON.parse(localStorage.getItem("results")) || [];

    let table =
    document.getElementById("resultTable");

    if(!table) return;

    table.innerHTML = "";

    results.forEach((r,index)=>{

        table.innerHTML += `
        <tr>

        <td>${index+1}</td>

        <td>${r.student}</td>

        <td>${r.class}</td>

        <td>${r.roll}</td>

        <td>${r.exam}</td>

        <td>${r.total}</td>

        <td>${r.average}</td>

        <td>${r.grade}</td>

        <td>

        <button class="btn btn-danger btn-sm"
        onclick="deleteResult(${index})">
        Delete
        </button>

        </td>

        </tr>
        `;

    });

}

function deleteResult(index){

    if(confirm("Delete Result?")){

        let results =
        JSON.parse(localStorage.getItem("results")) || [];

        results.splice(index,1);

        localStorage.setItem(
        "results",
        JSON.stringify(results));

        loadResults();

    }

}

window.addEventListener("load",loadResults);
// =========================
// Result List
// =========================

function loadResults() {

    let results = JSON.parse(localStorage.getItem("results")) || [];

    let search = document.getElementById("searchResult").value.toLowerCase();

    let table = document.getElementById("resultTable");

    if (!table) return;

    table.innerHTML = "";

    results.forEach((result, index) => {

        if (
            result.name.toLowerCase().includes(search) ||
            result.class.toLowerCase().includes(search)
        ) {

            table.innerHTML += `
            <tr>

            <td>${index+1}</td>

            <td>${result.name}</td>

            <td>${result.class}</td>

            <td>${result.roll}</td>

            <td>${result.subject}</td>

            <td>${result.marks}</td>

            <td>${result.grade}</td>

            <td>

            <button class="btn btn-warning btn-sm"
            onclick="editResult(${index})">
            Edit
            </button>

            <button class="btn btn-danger btn-sm"
            onclick="deleteResult(${index})">
            Delete
            </button>

            </td>

            </tr>
            `;
        }

    });

}

function deleteResult(index){

    if(confirm("Delete this result?")){

        let results =
        JSON.parse(localStorage.getItem("results")) || [];

        results.splice(index,1);

        localStorage.setItem("results",
        JSON.stringify(results));

        loadResults();

    }

}

function editResult(index){

    localStorage.setItem("resultEditIndex",index);

    window.location.href="results.html";

                         }
