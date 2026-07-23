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
    };

    result.total =
        result.bangla +
        result.english +
        result.math;

    result.average = (result.total / 3).toFixed(2);

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
function loadResults(){

    let results = JSON.parse(localStorage.getItem("results")) || [];

    let table = document.getElementById("resultTable");

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

        <td>${r.bangla}</td>

        <td>${r.english}</td>

        <td>${r.math}</td>

        <td>${r.total}</td>

        <td>${r.average}</td>

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

        localStorage.setItem("results", JSON.stringify(results));

        loadResults();

    }

}

window.addEventListener("load", loadResults);
