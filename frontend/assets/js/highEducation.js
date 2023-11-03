



const isValidName = function (name) {
    return /^[a-zA-Z ]{2,30}$/.test(name)
}

const isValidPhone = function (phone) {
    return /^((?!(0))[0-9]{10})$/.test(phone)
}

const isValidEmail = function (Email) {
    return /^(?=.{1,30}$)[a-zA-Z0-9_\.]+\@(([a-z])+\.)+([a-z]{2,4})$/.test(Email)
}


let content = document.getElementById("content").style.display = "none"
let className = localStorage.getItem("className")
document.getElementById("courseName").innerHTML = ""
document.getElementById("courseName").innerHTML = `NCERT ${className}th MYB${className} Course`






function displayRadioValue() {
    var ele = document.querySelector('input[name="stream"]:checked').value

    let courseName = `MYB${className}${ele}`
    let amount;
    if (className == "11") {
        amount = 550
    } else {
        amount = 600
    }



    fetch('http://localhost:3000/payment', {
        method: "POST",
        headers: {
            "Content-type": 'application/json',

        },
        body: JSON.stringify({
            amount,
            courseName,
            userId: "645c7f385690a8495e08ff55"
        })

    }).then(res => res.json())
        .then(data => {
           
            location.href = data.redirect_url
        })



}
const buyCourse = () => {

    displayRadioValue()
}

const func = () => {
    let name = document.getElementById("name").value
    let email = document.getElementById("email").value
    let contact = document.getElementById("contact").value
    let message = document.getElementById("message").value
    if (name == "" || email == "" || contact == "" || message == "") {
        alert("All fields are required")
        return
    }
    if (!isValidName(name)) {
        alert("Invalid name")
        return
    }

    if (!isValidPhone(contact)) {
        alert("Invalid Phone Number")
        return
    }
    if (!isValidEmail(email)) {
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

const showContent = () => {

    var ele = document.querySelector('input[name="stream"]:checked').value
    localStorage.setItem("courseName", `MYB${className}${ele}`)
    location.href = "higherportal.html"
}

let userToken = localStorage.getItem("token")
const checkPaid = (data) => {
    let buy = document.getElementById("buy")
    let content = document.getElementById("content")
    // let paidCourse = JSON.parse(localStorage.getItem("paidCourse"))
    fetch("http://localhost:3000/profile/details", {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${userToken}`
        }
    }).then(res => res.json())
        .then((getData) => {
            let paidCourse = getData.message.buyCourse
         
            let check = paidCourse.filter((item) =>
                item.courseName.includes(data.value))
            if (check.length == 0) {
                buy.style.display = "block"
                content.style.display = "none"
            } else {
                buy.style.display = "none"
                content.style.display = "block"
            }
        })


}