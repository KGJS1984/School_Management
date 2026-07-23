// =========================
// Certificate List
// =========================

function loadCertificates() {

    let certificates =
    JSON.parse(localStorage.getItem("certificates")) || [];

    let search = "";

    let searchBox =
    document.getElementById("searchCertificate");

    if(searchBox){
        search = searchBox.value.toLowerCase();
    }

    let table =
    document.getElementById("certificateTable");

    if(!table) return;

    table.innerHTML = "";

    certificates.forEach((c,index)=>{

        if(
            c.student.toLowerCase().includes(search) ||
            c.class.toLowerCase().includes(search)
        ){

            table.innerHTML += `

            <tr>

            <td>${index+1}</td>

            <td>${c.student}</td>

            <td>${c.class}</td>

            <td>${c.roll}</td>

            <td>${c.type}</td>

            <td>${c.issueDate}</td>

            <td>

            <button
            class="btn btn-warning btn-sm"
            onclick="editCertificate(${index})">

            Edit

            </button>

            <button
            class="btn btn-danger btn-sm"
            onclick="deleteCertificate(${index})">

            Delete

            </button>

            <button
            class="btn btn-success btn-sm"
            onclick="printCertificate(${index})">

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

function deleteCertificate(index){

    if(confirm("Delete this Certificate?")){

        let certificates =
        JSON.parse(localStorage.getItem("certificates")) || [];

        certificates.splice(index,1);

        localStorage.setItem(
            "certificates",
            JSON.stringify(certificates)
        );

        loadCertificates();

    }

}

// =========================
// Edit
// =========================

function editCertificate(index){

    localStorage.setItem(
        "certificateEditIndex",
        index
    );

    window.location.href = "certificate.html";

}

// =========================
// Print
// =========================

function printCertificate(index){

    let certificates =
    JSON.parse(localStorage.getItem("certificates")) || [];

    let c = certificates[index];

    let w = window.open("", "_blank");

    w.document.write(`
    <html>
    <head>
    <title>Certificate</title>
    <style>
    body{
        font-family:Arial
