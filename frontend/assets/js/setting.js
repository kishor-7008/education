let token = localStorage.getItem("token");
if (!token) {
  location.href = "index.html";
}


const changePassword = () => {
  let password = document.getElementById("password");
  fetch("https://educationbackend.onrender.com/reset/password", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify({
      password: password.value,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.status == false) {
        document.getElementById("error2").innerHTML = data.message;
      } else {
        password.value = "";
        document.getElementById("error2").innerHTML = "";
        localStorage.clear();
        // location.href="index.html"
      }
    });
};

// console.log("setting Page......");
// .........................................................

// function disableClick(event) {
//     event.preventDefault(); // Prevent the default action of clicking
// }

function disableKeyboard(event) {
  event.preventDefault();
}

document.addEventListener("keydown", disableKeyboard);

document.onkeydown = function (e) {
  return false;
};

navigator.keyboard.lock();
navigator.keyboard.unlock();

// Attach the event listener to the document
// document.addEventListener("keydown", disableClick);
// .........................................................
let profile = document.querySelector("#profile");
let form = document.querySelector("#myTabContent");
form.style.display = "none";
let localStorageStyle = JSON.parse(localStorage.getItem("style"));
profile.style.display = "block";
localStorage.setItem(
  "style",
  JSON.stringify({ style: "block", status: "profile" })
);

// ................................  Profile .......................................
if (localStorageStyle.status === "form") {
  profile.style.display = "none";
  form.style.display = "block";
} else {
  profile.style.display = "block";
  form.style.display = "none";
}

const updateValue = () => {
  localStorage.setItem(
    "style",
    JSON.stringify({ style: "block", status: "form" })
  );
  let form = document.querySelector("#myTabContent");
  profile.style.display = "none";
  form.style.display = "block";
};

// ............................. profile end .............................

// ........................................ form ....................................
document.querySelector("#form").addEventListener("submit", (e) => {
  e.preventDefault();

  // .....................................
  localStorage.setItem(
    "style",
    JSON.stringify({ style: "block", status: "profile" })
  );
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
    fistName,
    lastName,
    email,
    phoneNo,
    dOB,
    occupation,
    gender,
    state,
    status,
    address,
    city,
    country,
  };
  // data.push(obj);

  // dateData(obj)
  profile.style.display = "block";
  localStorage.setItem("style", JSON.stringify("none"));
  form.style.display = "none";
});
// updateData();

// const value = true;

// let profile = document.getElementById("profile");
// let localStorage = JSON.parse(localStorage.getItem('data'));
// console.log()
// const updateData = (data) => {
//     localStorage.setItem("data", JSON.stringify(data));
//     console.log("locaStorage", localStorage)
//     console.log("dataaaa", data)
// console.log(localStorage.getItem("data-----",data))
//     localStorage.map((itme) => {
//         profile.innerHTML = `  <p class="lead">My Profile</p>
//                     <hr>
//                     <div class="row">
//                         <div class="col-md-6">
//                             <p><strong>Name:</strong>${itme.fistName} ${itme.lastName}</p>
//                             <p><strong>Email:</strong> <a href="mailto:jwilliams@gmail.com">${itme.email}/a></p>
//                             <p><strong>Website:</strong> <a href="jwilliams.com">bootdey.com</a></p>
//                             <p><strong>Gender:</strong> ${item.gender}</p>
//                             <!-- <p><strong>Joined on:</strong> July 24<sup>th</sup>, 2010</p> -->
//                             <p><strong>Hobbies:</strong> Read books, hang out, learn history, making website</p>
//                         </div>
//                         <div class="col-md-6">
//                             <p><strong>Address:</strong> bootdey City, NY, USA</p>
//                             <p><strong>Phone:</strong> (123) 456-5644</p>
//                         </div>
//         `
//     })
// }

function formatDateToDdMmYy(isoDateString) {
  try {
    const date = new Date(isoDateString);

    // Get the day, month, and year components
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-based
    const year = date.getFullYear().toString().slice(-2); // Get the last two digits of the year

    // Format the components as "dd-mm-yy"
    const formattedDate = `${day}-${month}-${year}`;

    return formattedDate;
  } catch (error) {
    return error.toString();
  }
}


const profileUpdate = () => {

  let fistName = document.getElementById("fistName").value;
  let lastName = document.getElementById("lastName").value;
  let email = document.getElementById("email").value;
  let phoneNo = document.getElementById("phoneNo").value;
  let occupation = document.getElementById("occupation").value;
  let gender = document.getElementById("gender").value;
  let address = document.getElementById("address").value;
  let state = document.getElementById("state").value;
  let country = document.getElementById("country").value;
  let dob = document.getElementById("datepicker").value;




  fetch('http://localhost:3000/update/profile/details', {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify({
      name: fistName + lastName, email, mobile: phoneNo, occupation,
      gender, address, state, country, dob
    })
  }).then(res => res.json())
    .then(data => {
      document.getElementById("profile").style.display = "block"
      document.getElementById("myTabContent").style.display ="none"

})


}

const getProfile = () => {
  let profile = document.getElementById("profile")
  fetch("http://localhost:3000/profile/details", {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${token}`
    }
  }).then(res => res.json())
    .then(data => {
      profile.innerHTML = `
<div class="row">
                        <div class="col-md-6">
                            <p><strong>Name : </strong> ${data.message.name} </p>

                            <p><strong>Email : </strong> <a href="mailto:jwilliams@gmail.com">${data.message.email}</a>
                            </p>
                            <p><strong>Gender : </strong>${data.message.gender ? data.message.gender : ""} </p>
                            <p><strong>Date Of Birth :</strong>${data.message.dob ? formatDateToDdMmYy(data.message.dob) : ""} </p>

                        </div>
                        <div class="col-md-6">
                            <p><strong>Phone : </strong>${data.message.mobile}</p>
                            <p><strong>Address : </strong>${data.message.address ? data.message.address}</p>

                            <p><strong>State : </strong>${data.message.state}</p>
                            <p><strong>Country : </strong>${data.message.country}</p>
                        </div>


                        <div class="col-lg-12 col-md-12" onclick="updateValue()">
                            <button type="submit" class="btn btn-primary">
                                EDIT
                            </button>
                        </div>
                    </div>
`
    })
}
getProfile()
// const uploadPicture = () => {
//   let uploadInput = document.getElementById("uploadInput")
//   uploadInput.click()
//   console.log(uploadInput.files[0])
// }



// const getImageData=()=>{
//   let uploadInput = document.getElementById("uploadInput")
//   console.log(uploadInput.files[0])
// }

const uploadPicture = () => {
  let uploadInput = document.getElementById("uploadInput");
  uploadInput.click();
}

const displaySelectedImage = () => {
  let uploadInput = document.getElementById("uploadInput");
  let selectedImage = document.getElementById("profilePic2");

  if (uploadInput.files.length > 0) {
    const file = uploadInput.files[0];
    const reader = new FileReader();

    reader.onload = function (e) {
      selectedImage.src = e.target.result;
      selectedImage.style.display = "block";
    };

    reader.readAsDataURL(file);
  }

  document.getElementById("cameraID").style.display = "none"
  document.getElementById("saveID").style.display = "block"
}

const saveImage=()=>{
  let uploadInput = document.getElementById("uploadInput");
  let fdata=new FormData();
  fdata.set('image', uploadInput.files[0])

  fetch('http://localhost:3000/upload/profile',{
    method:"PUT",
    headers:{
      "Authorization":`Bearer ${token}`
    },
    body:fdata
  }).then(res=>res.json())
  .then(data=>{
    if(data.status==true){
      localStorage.setItem("avtar",data.imageUrl)
        alert(data.message);
    }else{
      return;
    }
  })

  document.getElementById("cameraID").style.display = "block"
  document.getElementById("saveID").style.display ="none"

}

// function payment(){
// console.log("2dwkjsncsdi;ckjnwi;ekjcjw;ickn efiwhfcliue")
//   fetch('http://localhost:3000/profile', {
//     method: "POST",
   
//   }).then(res => res.text())
//     .then(data =>{ console.log(data)
//     document.write(data)})
// }
// payment()