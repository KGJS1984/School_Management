// =========================
// Certificate Management
// =========================

function saveCertificate() {

    let certificate = {

        id: Date.now(),

        student: document.getElementById("studentName").value,

        class: document.getElementById("studentClass").value,

        roll: document.getElementById("studentRoll").value,

        type: document.getElementById("certificateType").value,

        issueDate: document.getElementById("issueDate").value,

        remarks: document.getElementById("remarks").value

    };

    let certificates =
    JSON.parse(localStorage.getItem("certificates")) || [];

    let editIndex =
    localStorage.getItem("certificateEditIndex");

    if (editIndex !== null) {

        certificates[editIndex] = certificate;

        localStorage.removeItem("certificateEditIndex");

        alert("✅ Certificate Updated Successfully");

    } else {

        certificates.push(certificate);

        alert("✅ Certificate Saved Successfully");

    }

    localStorage.setItem(
        "certificates",
        JSON.stringify(certificates)
    );

    document.querySelector("form").reset();

    window.location.href = "certificate_list.html";
}

// =========================
// Edit Mode
// =========================

window.onload = function () {

    let editIndex =
    localStorage.getItem("certificateEditIndex");

    if (editIndex !== null) {

        let certificates =
        JSON.parse(localStorage.getItem("certificates")) || [];

        let c = certificates[editIndex];

        document.getElementById("studentName").value = c.student;
        document.getElementById("studentClass").value = c.class;
        document.getElementById("studentRoll").value = c.roll;
        document.getElementById("certificateType").value = c.type;
        document.getElementById("issueDate").value = c.issueDate;
        document.getElementById("remarks").value = c.remarks;

    }

};
