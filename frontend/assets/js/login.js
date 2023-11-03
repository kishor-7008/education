
const loginFunc = () => {
    let email = document.getElementById("email").value
    let password = document.getElementById("password").value
    let error = document.getElementById("error")
    fetch('http://localhost:3000/api/user/login', {
        method: "POST",
        headers: {
            "Content-type": "application/json",
            Accept: "application/json",
        },
        body: JSON.stringify({

            email: email,
            password: password
        })

    }).then(res => res.json())
        .then(data => {
            if (data.status == false) {
                error.innerHTML = data.message
            } else {
                alert("Login Successfully")
                localStorage.setItem("token", data.accessToken)
                localStorage.setItem("user", data.message.name)
                localStorage.setItem("avtar", data.message.avtar)
                localStorage.setItem("_id", data.message._id)
                localStorage.setItem("paidCourse", JSON.stringify(data.message.buyCourse))
                location.href = "education.html"
            }
        })
}