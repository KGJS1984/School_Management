function loadFees() {

    let fees = JSON.parse(localStorage.getItem("fees")) || [];
    let search = document.getElementById("searchFee").value.toLowerCase();

    let table = document.getElementById("feeTable");
    let total = 0;

    table.innerHTML = "";

    fees.forEach((fee, index) => {

        if (
            fee.studentName.toLowerCase().includes(search) ||
            fee.studentClass.toLowerCase().includes(search)
        ) {

            total += Number(fee.amount);

            table.innerHTML += `
            <tr>
                <td>${index + 1}</td>
                <td>${fee.studentName}</td>
                <td>${fee.studentClass}</td>
                <td>${fee.month}</td>
                <td>৳${fee.amount}</td>
                <td>${fee.paymentMethod}</td>
                <td>${fee.date}</td>

                <td>

                    <button class="btn btn-primary btn-sm"
                    onclick="printReceipt(${index})">
                    🧾 Receipt
                    </button>

                    <button class="btn btn-danger btn-sm"
                    onclick="deleteFee(${index})">
                    🗑 Delete
                    </button>

                </td>

            </tr>
            `;
        }

    });

    document.getElementById("totalFee").innerHTML = "৳" + total;
}

function deleteFee(index) {

    if (confirm("Delete this fee record?")) {

        let fees = JSON.parse(localStorage.getItem("fees")) || [];

        fees.splice(index, 1);

        localStorage.setItem("fees", JSON.stringify(fees));

        loadFees();
    }
}

function printReceipt(index) {

    let fees = JSON.parse(localStorage.getItem("fees")) || [];

    let f = fees[index];

    let w = window.open("", "", "width=600,height=700");

    w.document.write(`
    <h2 style="text-align:center">
    Gobindaganj KG & Junior School
    </h2>

    <hr>

    <h3>Fee Receipt</h3>

    <
