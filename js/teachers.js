let teacherPhotoData="";
function saveTeacher(){
 const teacher={id:Date.now(),name:teacherName.value,designation:designation.value,mobile:teacherMobile.value,email:teacherEmail.value,photo:teacherPhotoData};
 let teachers=JSON.parse(localStorage.getItem("teachers"))||[];
 let i=localStorage.getItem("teacherEditIndex");
 if(i!==null){teachers[i]=teacher;localStorage.removeItem("teacherEditIndex");} else teachers.push(teacher);
 localStorage.setItem("teachers",JSON.stringify(teachers));
 location.href="teachers_list.html";
}
function loadTeachers(){
 const table=document.getElementById("teacherTable"); if(!table)return;
 const s=(document.getElementById("searchTeacher")?.value||"").toLowerCase();
 const teachers=JSON.parse(localStorage.getItem("teachers"))||[];
 table.innerHTML="";
 teachers.forEach((t,i)=>{if(t.name.toLowerCase().includes(s)||t.designation.toLowerCase().includes(s)){table.innerHTML+=`<tr><td>${i+1}</td><td>${t.name}</td><td>${t.designation}</td><td>${t.mobile}</td><td>${t.email}</td><td><button onclick="editTeacher(${i})">Edit</button> <button onclick="deleteTeacher(${i})">Delete</button></td></tr>`;}});
}
function deleteTeacher(i){let t=JSON.parse(localStorage.getItem("teachers"))||[];t.splice(i,1);localStorage.setItem("teachers",JSON.stringify(t));loadTeachers();}
function editTeacher(i){localStorage.setItem("teacherEditIndex",i);location.href="teachers.html";}
function previewTeacherPhoto(e){const r=new FileReader();r.onload=()=>{teacherPhotoData=r.result;let p=document.getElementById("teacherPhotoPreview");if(p)p.src=teacherPhotoData;}; if(e.target.files[0])r.readAsDataURL(e.target.files[0]);}
window.onload=function(){loadTeachers(); let i=localStorage.getItem("teacherEditIndex"); if(i!==null&&document.getElementById("teacherName")){let t=(JSON.parse(localStorage.getItem("teachers"))||[])[i]; if(t){teacherName.value=t.name;designation.value=t.designation;teacherMobile.value=t.mobile;teacherEmail.value=t.email; if(t.photo){teacherPhotoData=t.photo;teacherPhotoPreview.src=t.photo;}}}}
