// Student ID Card Generator

function generateIDCard(student) {

    let card = `
    <div class="id-card">
        <div class="school-name">
            Gobindaganj KG & Junior School
        </div>

        <img src="${student.photo}" 
        class="student-photo">

        <h3>${student.name}</h3>

        <p><b>Class:</b> ${student.class}</p>
        <p><b>Roll:</b> ${student.roll}</p>
        <p><b>ID:</b> ${student.id}</p>
        <p><b>Mobile:</b> ${student.mobile}</p>

        <div class="signature">
            Principal Signature
        </div>
    </div>
    `;

    document.getElementById("cardBox").innerHTML = card;
}


// Example Student Data

let student = {

    name:"Rahim Ahmed",
    class:"Five",
    roll:"12",
    id:"2026001",
    mobile:"017XXXXXXXX",
    photo:"student.jpg"

};


generateIDCard(student);
