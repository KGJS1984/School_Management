// =========================
// Result List
// =========================

function loadResults(){

    let results =
    JSON.parse(localStorage.getItem("results")) || [];

    let search =
    document.getElementById("searchResult").value.toLowerCase();

    let table =
    document.getElementById("resultTable");

    if(!table) return;

    table.innerHTML = "";

    results.forEach((result,index)=>{

        if(
            result.name.toLowerCase().includes(search) ||
            result.class.toLowerCase().includes(search)
        ){

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
