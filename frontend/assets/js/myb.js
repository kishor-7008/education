

const isValidName = function (name) {
  return /^[a-zA-Z ]{2,30}$/.test(name)
}

const isValidPhone = function (phone) {
  return /^((?!(0))[0-9]{10})$/.test(phone)
}





const classDetails = (data) => {

  const ccource = document.getElementById("cc-name");
  const school = document.getElementById("school-name");
  const board = document.getElementById("board-name");
  const degree = document.getElementById("degree");
  if (data == "cc") {
    ccource.removeAttribute("class");
    school.setAttribute("class", "classNone");
    degree.setAttribute("class", "classNone");
    board.setAttribute("class", "classNone");
  }
  else if (data == "pg" || data == "graduate") {
    board.removeAttribute("class");
    school.setAttribute("class", "classNone");
    degree.setAttribute("class", "classNone");
    ccource.setAttribute("class", "classNone");
  } else if (data == "twelveth" || data == "eleventh") {
    school.removeAttribute("class");
    board.removeAttribute("class");
    degree.removeAttribute("class");
    ccource.setAttribute("class", "classNone");

  } else if (data == "tenth" || data == "ninth" || data == "eighth") {
    school.removeAttribute("class");
    board.removeAttribute("class");
    degree.setAttribute("class", "classNone");
    ccource.setAttribute("class", "classNone");

  }
};

const abc = (e) => {
  e.preventDefault();
  const className = document.getElementsByClassName("mybclass")[0].value;
  const firstName = document.getElementById("firstName").value;
  const lastName = document.getElementById("lastName").value;
  const fatherName = document.getElementById("fatherName").value;
  const phoneNumber = document.getElementById("phoneNumber").value;
  const location = document.getElementById("location").value;
  const gender = document.getElementById("gender").value;
  const education = document.getElementById("education-detail-dropdown").value;
  const school = document.getElementById("school-name");
  const board = document.getElementById("board-name");
  const degree = document.getElementById("degree");
  const reference = document.getElementById("reference").value;

  const errField = document.getElementById("errField");
  const errText = document.getElementById("errorText");


  if (
    !firstName ||
    !lastName ||
    !fatherName ||
    !phoneNumber ||
    !location ||
    !gender ||
    !education
  ) {
    errField.removeAttribute("class");
    errText.innerHTML = "All fields are required";
    return;
  } else if (
    firstName == "" ||
    lastName == "" ||
    fatherName == "" ||
    phoneNumber == "" ||
    location == "" ||
    gender == "" ||
    education == ""
  ) {
    errField.removeAttribute("class");
    errText.innerHTML = "All fields are required";
    return;
  } else if (
    (className == "twelveth" && board.value == "") ||
    (className == "eleventh" && board.value == "")
  ) {
    errField.removeAttribute("class");
    errText.innerHTML = "Board name  required";
    return;
  } else if (
    (className == "twelveth" && school.value == "") ||
    (className == "eleventh" && school.value == "")
  ) {
    errField.removeAttribute("class");
    errText.innerHTML = "School name  required";
    return;
  } else if (
    (className == "twelveth" && degree.value == "") ||
    (className == "eleventh" && degree.value == "")
  ) {
    errField.removeAttribute("class");
    errText.innerHTML = "Stream  required";
    return;
  } else if (
    (className == "tenth" && board.value == "") ||
    (className == "ninth" && board.value == "") ||
    (className == "eighth" && board.value == "")
  ) {
    errField.removeAttribute("class");
    errText.innerHTML = "Board name required";
    return;
  } else if (
    (className == "tenth" && school.value == "") ||
    (className == "ninth" && school.value == "") ||
    (className == "eighth" && school.value == "")
  ) {
    errField.removeAttribute("class");
    errText.innerHTML = "School name required";
    return;
  } else if (
    (className == "pg" && board.value == "") ||
    (className == "graduate" && board.value == "")
  ) {
    errField.removeAttribute("class");
    errText.innerHTML = "Board name required";
    return;
  }

  if (!isValidName(firstName)) {
    errField.removeAttribute("class");
    errText.innerHTML = "Invalid First Name";
    return;
  }
  if (!isValidName(lastName)) {
    errField.removeAttribute("class");
    errText.innerHTML = "Invalid Last Name";
    return;
  }
  if (!isValidName(fatherName)) {
    errField.removeAttribute("class");
    errText.innerHTML = "Invalid Father Name";
    return;
  }
  if (!isValidPhone(phoneNumber)) {
    errField.removeAttribute("class");
    errText.innerHTML = "Invalid Phone Number";
    return;
  }

  let data;
  errField.setAttribute("class", "classNone");
  if (className == "pg" || className == "graduate") {
    data = {
      firstName,
      lastName,
      fatherName,
      phoneNumber,
      location,
      gender,
      className,
      board: board.value,
      reference,
    };
  } else if (
    className == "tenth" ||
    className == "ninth" ||
    className == "eighth"
  ) {
    data = {
      firstName,
      lastName,
      fatherName,
      phoneNumber,

      location,
      gender,
      className,
      board: board.value,
      reference,
      school: school.value,
    };
  } else if (className == "twelveth" || className == "eleventh") {
    data = {
      firstName,
      lastName,
      fatherName,
      phoneNumber,
      location,
      gender,
      className,
      board: board.value,
      reference,
      school: school.value,
      degree: degree.value,
    };
  } else if (className == "cc") {
    data = {
      firstName,
      lastName,
      phoneNumber,
      fatherName,
      location,
      gender,
      className,
      description: document.getElementById("cc-name").value,
      reference,
    }
  }
  // console.log(data)
  fetch("http://localhost:3000/sending/email", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.status == true) {
        alert(data.message);
        document.getElementsByClassName("mybclass")[0].value = "";
        document.getElementById("firstName").value = "";
        document.getElementById("lastName").value = "";
        document.getElementById("fatherName").value = "";
        document.getElementById("phoneNumber").value = "";
        document.getElementById("location").value = "";
        document.getElementById("gender").value = "";
        document.getElementById("education-detail-dropdown").value = "";
        document.getElementById("school-name").value = "";
        document.getElementById("board-name").value = "";
        document.getElementById("degree").value = "";
        document.getElementById("reference").value = "";
        const errText = (document.getElementById("errorText").innerHTML = "");
      } else {
        alert(data.message);
      }
    })
    .catch((er) => {
      alert(er.message);
    });

  return false;
};

document.getElementById("mybForm").addEventListener("submit", abc, false);
