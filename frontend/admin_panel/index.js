function func() {
    v1 = document.getElementById("fname");
    v2 = document.getElementById("lname");
    v3 = document.getElementById("email");
    v4 = document.getElementById("mob");
    v5 = document.getElementById("job");
    v6 = document.getElementById("ans");
    v7 = document.getElementById("book");

 if(!v1.value || !v2.value || !v3.value || !v4.value ||  !v6.value  || !v7.value){
    alert("Please Fill Required Field")
    return ;
 }
  const formData=new FormData();
  formData.append("className",v1.value+"'th")
  formData.append( "subject",v2.value)
  formData.append( "chapter",v3.value)
  formData.append("setNumber",v4.value)
  formData.append("course",v5.value,)
  formData.append( "files",v6.value,)
  formData.append( "bookName",v7.value)

  fetch("https://educationbackend.onrender.com/api/classes/subjects",{
    method:"POST",
    headers:{
       

    },
    body:formData
  }).then((res=>res.json()))
  .then((data)=>{
    alert("Upload File Successfully")
   v1.value=""
   v2.value=""
   v3.value=""
   v4.value=""
   v5.value=""
   v6.value=""
   v7.value=""

  }
  )
  return false;


 
}