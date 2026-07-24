// ---------- Save Teacher ----------
function saveTeacher() {

    let teacher = {
        id: Date.now(),
        name: document.getElementById("teacherName").value.trim(),
        designation: document.getElementById("designation").value.trim(),
        mobile: document.getElementById("teacherMobile").value.trim(),
        email: document.getElementById("teacherEmail").value.trim(),
        photo: teacherPhotoData
    };

    // Validation
    if (teacher.name === "") {
        alert("Please enter Teacher Name.");
        return;
    }

    let teachers = JSON.parse(localStorage.getItem("teachers")) || [];

    let editIndex = localStorage.getItem("teacherEditIndex");

    // Duplicate Mobile Check
    let duplicate = teachers.find((t, i) =>
        t.mobile === teacher.mobile &&
        teacher.mobile !== "" &&
        i != editIndex
    );

    if (duplicate) {
        alert("This mobile number already exists.");
        return;
    }

    if (editIndex !== null) {

        teacher.id = teachers[editIndex].id;

        teachers[editIndex] = teacher;

        localStorage.removeItem("teacherEditIndex");

        alert("✅ Teacher Updated Successfully");

    } else {

        teachers.push(teacher);

        alert("✅ Teacher Saved Successfully");

    }

    localStorage.setItem("teachers", JSON.stringify(teachers));

    document.querySelector("form").reset();

    teacherPhotoData = "";

    let img = document.getElementById("teacherPhotoPreview");

    if (img) {
        img.src = "https://via.placeholder.com/120";
    }

    window.location.href = "teachers_list.html";
}

// =========================
// Load Teachers
// =========================

function loadTeachers() {

    let teachers = JSON.parse(localStorage.getItem("teachers")) || [];

    let table = document.getElementById("teacherTable");

    if (!table) return;

    let search = "";

    let searchBox = document.getElementById("searchTeacher");

    if (searchBox) {
        search = searchBox.value.toLowerCase();
    }

    table.innerHTML = "";

    teachers.forEach((teacher, index) => {

        if (
            teacher.name.toLowerCase().includes(search) ||
            teacher.designation.toLowerCase().includes(search) ||
            teacher.mobile.toLowerCase().includes(search) ||
            teacher.email.toLowerCase().includes(search)
        ) {

            table.innerHTML += `
            <tr>

                <td>${index + 1}</td>

                <td>
                    ${teacher.photo ?
                    `<img src="${teacher.photo}"
                    width="40"
                    height="40"
                    style="border-radius:50%;margin-right:8px;">`
                    : ""}
                    ${teacher.name}
                </td>

                <td>${teacher.designation}</td>

                <td>${teacher.mobile}</td>

                <td>${teacher.email}</td>

                <td>

                    <button class="btn btn-primary btn-sm"
                    onclick="teacherID(${index})">
                    🪪
                    </button>

                    <button class="btn btn-info btn-sm"
                    onclick="viewTeacherProfile(${index})">
                    👤
                    </button>

                    <button class="btn btn-warning btn-sm"
                    onclick="editTeacher(${index})">
                    ✏️
                    </button>

                    <button class="btn btn-danger btn-sm"
                    onclick="deleteTeacher(${index})">
                    🗑️
                    </button>

                </td>

            </tr>
            `;

        }

    });

                      }
