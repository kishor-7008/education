// console.log("setting Page......");





let token=localStorage.getItem("token")
if(!token){
    location.href="index.html"
}
let profile = document.querySelector("#profile");
let form = document.querySelector("#myTabContent");
form.style.display = "none";
let localStorageStyle = JSON.parse(localStorage.getItem("style"))
profile.style.display = "block";
localStorage.setItem("style", JSON.stringify({ style: "block", status: "profile" }));

// ................................  Profile .......................................
if (localStorageStyle.status === "form") {
    profile.style.display = "none";
    form.style.display = "block";
}
else {
    profile.style.display = "block";
    form.style.display = "none";
}

const updateValue = () => {
    localStorage.setItem("style", JSON.stringify({ style: "block", status: "form" }));
    let form = document.querySelector("#myTabContent");
    profile.style.display = "none";
    form.style.display = "block";

};


// ............................. profile end .............................

// ........................................ form ....................................
document.querySelector("#form").addEventListener("submit", (e) => {
    e.preventDefault();

    // .....................................
    localStorage.setItem("style", JSON.stringify({ style: "block", status: "profile" }));
    profile.style.display = "none";

    // ...............................

    const fistName = document.querySelector("#fistName").value;
    const lastName = document.querySelector("#lastName").value;
    const email = document.querySelector("#email").value;
    const dOB = document.querySelector("#dOB").value;
    const phoneNo = document.querySelector("#phoneNo").value;
    const occupation = document.querySelector("#occupation").value;
    const gender = document.querySelector("#gender").value;
    const status = document.querySelector("#status").value;
    const address = document.querySelector("#address").value;
    const city = document.querySelector("#city").value;
    const state = document.querySelector("#state").value;
    const country = document.querySelector("#country").value;
    const obj = {
        fistName, lastName, email, phoneNo, dOB, occupation, gender, state, status, address, city, country
    }
    // data.push(obj);

    // dateData(obj)
    profile.style.display = "block";
    localStorage.setItem("style", JSON.stringify("none"));
    form.style.display = "none";

})
// updateData();
