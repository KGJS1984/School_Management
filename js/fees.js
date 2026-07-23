function saveFee() {

    let fee = {
        id: Date.now(),
        studentName: document.getElementById("studentName").value,
        studentClass: document.getElementById("studentClass").value,
        month: document.getElementById("feeMonth").value,
        amount: Number(document.getElementById("feeAmount").value),
        paymentMethod: document.getElementById("paymentMethod").value,
        receiptNo: document.getElementById("receiptNo").value,
        date: new Date().toLocaleDateString()
    };

    let fees = JSON.parse(localStorage.getItem("fees")) || [];

    fees.push(fee);

    localStorage.setItem("fees", JSON.stringify(fees));

    alert("✅ Fee Collected Successfully");

    document.querySelector("form").reset();

}
function loadStudentSuggestions(){

    let students =
    JSON.parse(localStorage.getItem("students")) || [];

    let list =
    document.getElementById("studentList");

    if(!list) return;

    list.innerHTML = "";

    students.forEach(student=>{

        list.innerHTML += `
        <option value="${student.name}">
        `;

    });

}
function fillStudentInfo(){

    let students =
    JSON.parse(localStorage.getItem("students")) || [];

    let name =
    document.getElementById("studentName").value;

    let student =
    students.find(s => s.name === name);

    if(student){

        document.getElementById("studentClass").value =
        student.class;

    }

}

function fillStudentInfo(){

    let students =
    JSON.parse(localStorage.getItem("students")) || [];

    let name =
    document.getElementById("studentName").value;

    let student =
    students.find(s => s.name === name);

    if(student){

        document.getElementById("studentClass").value = student.class;
        document.getElementById("studentRoll").value = student.roll;

    }

}
