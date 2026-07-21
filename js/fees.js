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
