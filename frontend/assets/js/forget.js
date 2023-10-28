

const forget = () => {
    let forgetEmail = document.getElementById('forgetEmail')
    fetch('https://educationbackend.onrender.com/code/send', {
        method: "POST",
        headers: {
            "Content-type": "application/json",
            Accept: "application/json",
        },
        body: JSON.stringify({
            email: forgetEmail.value
        })
    }).then(res => res.json())
        .then(data => {
            if (data.status == false) {
                document.getElementById("error").innerHTML = data.message
            } else {

                document.getElementById("error").innerHTML = ""
                localStorage.setItem("forgetToken", data.message.token)
                location.href = "verifyOtp.html"
            }
        })
}

const verifyOtp = () => {
    let verifyEmail = document.getElementById('verifyEmail')
    fetch('https://educationbackend.onrender.com/verify/otp', {
        method: "POST",
        headers: {
            "Content-type": "application/json",
            Accept: "application/json",
            "Authorization": `Bearer ${localStorage.getItem("forgetToken")}`
        },
        body: JSON.stringify({
            otp: verifyEmail.value
        })
    }).then(res => res.json())
        .then(data => {
            if (data.status == false) {
                document.getElementById("error1").innerHTML = data.message
            } else {

                document.getElementById("error1").innerHTML = data.message
                location.href = "change_password.html"
            }
        })

}



const changePassword = () => {
    let password = document.getElementById('password')
    fetch('https://educationbackend.onrender.com/reset/password', {
        method: "POST",
        headers: {
            "Content-type": "application/json",
            Accept: "application/json",
            "Authorization": `Bearer ${localStorage.getItem("forgetToken")}`
        },
        body: JSON.stringify({
            password: password.value
        })
    }).then(res => res.json())
        .then(data => {
            if (data.status == false) {
                document.getElementById("error2").innerHTML = data.message
            } else {

                document.getElementById("error2").innerHTML = ''
                localStorage.clear()
                location.href = "login.html"
            }
        })

}