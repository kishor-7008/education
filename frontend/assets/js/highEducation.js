

let token = localStorage.getItem("token")
if (!token) {
    location.href = "index.html"
}




const isValidName = function (name) {
    return /^[a-zA-Z ]{2,30}$/.test(name)
}

const isValidPhone = function (phone) {
    return /^((?!(0))[0-9]{10})$/.test(phone)
}

const isValidEmail = function (Email) {
    return /^(?=.{1,30}$)[a-zA-Z0-9_\.]+\@(([a-z])+\.)+([a-z]{2,4})$/.test(Email)
}



let className = localStorage.getItem("className")
// let token = localStorage.getItem("token")
document.getElementById("courseName").innerHTML = ""
document.getElementById("courseName").innerHTML = `NCERT ${className}th MYB${className} Course`

function displayRadioValue() {
    var ele = document.getElementsByName('stream');
    for (i = 0; i < ele.length; i++) {
        if (ele[i].checked) {
            //    localStorage.setItem("stream",ele[i].value)
            //    location.href = 'payment.html'
            let courseName = `MYB${className}${ele[i].value}`
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
                    console.log(data)
                    console.log(data.redirect_url)
                    location.href = data.redirect_url
                })
        }
        else {
            return
        }
    }

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
    location.href = "portal.html"
}