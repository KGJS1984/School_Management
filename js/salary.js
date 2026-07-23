// =========================
// Salary Management
// =========================

function saveSalary() {

    let basic = Number(document.getElementById("basicSalary").value);

    let bonus = Number(document.getElementById("bonus").value);

    let deduction = Number(document.getElementById("deduction").value);

    let salary = {

        id: Date.now(),

        teacher: document.getElementById("teacherName").value,

        designation: document.getElementById("designation").value,

        month: document.getElementById("salaryMonth").value,

        basic: basic,

        bonus: bonus,

        deduction: deduction,

        netSalary: basic + bonus - deduction

    };

    let salaries =
    JSON.parse(localStorage.getItem("salaries")) || [];

    let editIndex =
    localStorage.getItem("salaryEditIndex");

    if(editIndex !== null){

        salaries[editIndex] = salary;

        localStorage.removeItem("salaryEditIndex");

        alert("✅ Salary Updated Successfully");

    }else{

        salaries.push(salary);

        alert("✅ Salary Saved Successfully");

    }

    localStorage.setItem(
        "salaries",
        JSON.stringify(salaries)
    );

    document.querySelector("form").reset();

    window.location.href = "salary_list.html";

}

// =========================
// Edit Mode
// =========================

window.onload = function(){

    let editIndex =
    localStorage.getItem("salaryEditIndex");

    if(editIndex !== null){

        let salaries =
        JSON.parse(localStorage.getItem("salaries")) || [];

        let s = salaries[editIndex];

        document.getElementById("teacherName").value = s.teacher;
        document.getElementById("designation").value = s.designation;
        document.getElementById("salaryMonth").value = s.month;
        document.getElementById("basicSalary").value = s.basic;
        document.getElementById("bonus").value = s.bonus;
        document.getElementById("deduction").value = s.deduction;

    }

};
