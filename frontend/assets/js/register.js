
// document.getElementById("regBtn").addEventListener("click",registerFunc)
const abc = () => {
    let name = document.getElementById("name").value
    let email = document.getElementById("email").value
    let phone = document.getElementById("phone").value
    let password = document.getElementById("password").value
    let error = document.getElementById("error")
    let tick = document.getElementById("test1")
    // if (!name.value || !email.value || !phone.value || !password.value) {
    //     error.innerHTML = "Please Fill All Inputs"
    //     return;
    // }

    fetch('http://localhost:3000/api/user/register', {
        method: "POST",
        headers: {
            "Content-type": "application/json",
            Accept: "application/json",
        },
        body: JSON.stringify({
            name: name,
            email: email,
            mobile: phone,
            password: password
        })

    }).then(res => res.json())
        .then(data => {
            if (data.status == false) {
                error.innerHTML = data.message
            } else {
                alert("Register Succefully")
                location.href = "index.html"
            }
        })
}