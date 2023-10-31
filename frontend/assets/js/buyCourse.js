


const isValidName = function(name){
    return /^[a-zA-Z ]{2,30}$/.test(name)
  }
  
  const isValidPhone = function(phone) {
    return/^((?!(0))[0-9]{10})$/.test(phone)
  }
  
  const isValidEmail = function(Email) {
    return /^(?=.{1,30}$)[a-zA-Z0-9_\.]+\@(([a-z])+\.)+([a-z]{2,4})$/.test(Email)
  }

let className = localStorage.getItem("className")
let token = localStorage.getItem("_id")
let userToken = localStorage.getItem("token")

console.log(userToken)
const getUserDetails=()=>{
    let pay = document.getElementById("pay")
    let content = document.getElementById("content")
    console.log(pay)
    console.log(content)
    fetch("http://localhost:3000/profile/details", {
      method: "GET",
      headers: {
          "Authorization": `Bearer ${userToken}`
      }
    }).then(res => res.json())
      .then(data => {
      if(data.status==true){
          console.log(data.message.buyCourse)
          let paidCourse = data.message.buyCourse.filter((item) => item.courseName.includes(className))
          console.log(paidCourse)
          if(paidCourse.length==1){
              pay.style.display = "none"
              content.style.display ="block"
          }else if(paidCourse.length==0){
              pay.style.display = "block"
              content.style.display = "none"
          }else{
              pay.style.display = "block"
              content.style.display = "none"
          }
      }else{
          pay.style.display = "block"
          content.style.display = "none"
      }})
}

getUserDetails()

// let fee = localStorage.getItem("fee")
let subject = localStorage.getItem("subject")
subject = subject.split(",")
document.getElementById("courseName").innerHTML = ""
document.getElementById("courseName").innerHTML = `NCERT ${className}th MYB${className} Course`

// document.getElementById("price").innerHTML = `&#8377; &nbsp; ${fee}`

let subList = document.getElementById("subjectList")

subject.map((item) => {
    subList.innerHTML += `<li class="my-3">${item}</li>`
})


const func = () => {
    let name = document.getElementById("name").value
    let email = document.getElementById("email").value
    let contact = document.getElementById("contact").value
    let message = document.getElementById("message").value
    if(name=="" || email =="" || contact =="" || message == ""){
        alert("All fields are required")
        return
    }
if(!isValidName(name)){
    alert("Invalid name")
    return
}
if(!isValidPhone(contact)){
    alert("Invalid Phone Number")
    return
}
if(!isValidEmail(email)){
    alert("Invalid email ID")
    return
}


    fetch('https://educationbackend.onrender.com/get/touch', {
        method: "POST",
        headers: {
            "Content-type": "application/json",
            Accept: "application/json",
        },
        body: JSON.stringify({
            name, email, contact, message
        })
    }).then(res => res.json())
        .then(data => {
            if (data.status == false) {
                alert(data.message)
            } else {

                document.getElementById("name").value = ""
                document.getElementById("email").value = ""
                document.getElementById("contact").value = ""
                document.getElementById("message").value = ""
                alert(data.message)
            }
        }
        )
}


// const buttons = document.getElementsByClassName('.btnpop')[0];

// for (let i = 0; i < buttons.length; i++) {
//     const btn = buttons[i]

//     btn.addEventListener('click', function (event) {
//         event.target.classList.toggle('active');
//     });
// }

let paymentPage=()=>{
    let courseName;
    let amount;
    if(className=="09"){
        courseName="MYB09"
        amount=450
    } else if (className == "10"){
        courseName = "MYB10"
        amount=500
    }
    fetch('http://localhost:3000/payment',{
        method:"POST",
        headers:{
            "Content-type":'application/json',

        },
        body: JSON.stringify({
           amount,
           courseName,
            userId: token
        })

    }).then(res=>res.json())
    .then(data=>{console.log(data)
        console.log(data.redirect_url)
        location.href = data.redirect_url
})
   
}

const showContent=()=>{
    location.href="portal.html"
}