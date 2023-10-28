const Users = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");
const generateToken = require("../utils/generateToken")
const userRegister = async (req, res) => {
  // if (!req.session.user_id) {
  try {


    let newUser = req.body;
    const { name, email, mobile, password } = newUser;
    if (!name || !email || !mobile || !password) {
      return res.status(400).send({ status: false, message: "Please fill all required fileds" });
    }
    newUser.password = await bcrypt.hash(newUser.password, 10);
    await Users.create(newUser);
    res.status(201).send({ status: true, message: "Register successfull" });
  } catch (error) {
    res.status(500).send({ status: false, message: error.message });

  }
  // } else {
  // return res
  //   .status(400)
  //   .send({ status: true, message: "You are already logged in" });
  // }
};

// User login handler

const userLogin = async (req, res) => {

  let userData = req.body;
  const { email, password } = userData;
  if (!email || !password) {
    return res
      .status(403)
      .send({ status: false, message: 'Enter your email and password' });
  }
  const isValidUser = await Users.findOne({ email: email });
  if (!isValidUser)
    return res
      .status(403)
      .send({ status: false, message: `Invalid! credentials` });
  let isValidPwd = await bcrypt.compare(password, isValidUser.password)
  if (!isValidPwd) return res.status(403).send({ status: false, message: "Invalid! password" })

  return res.status(200).send({
    status: true, message: {
      name: isValidUser.name,
      avtar: isValidUser.avtar
    }, accessToken: generateToken(isValidUser._id)
  })

};


const getInTouch = async (req, res) => {

  try {
    const { email, contact, message, name } = req.body;

    if (!email || !contact || !message || !name) {
      return res.status(400).json({ status: false, message: "All Fields Are Required" })
    }
    var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: "info@hminnovance.com",
        pass: "dhefcdnwioddvqjl",
      }
    });


    var mailOptions = {
      from: "info@hminnovance.com",
      to: "contact@hminnovance.com",
      subject: `Sending Email by user `,
      text: `
Hello Sir/Madam

     Contact Us 
     Name :${name}     Email :${email}
     Phone :${contact}
     Message :${message}
 
 Thank you,‍
 H & M INNOVANCE LLP
 
 ‍
`
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });
    res.status(200).json({ status: true, message: "Thanks For Connecting Us !" })
  } catch (error) {
    res.status(500).json({ status: false, message: error.message })
  }
}






const codeSend = async (req, res) => {
  try {
    if (req.body.email == "" || req.body == undefined || req.body.email == undefined) {
      return res.status(400).send({ status: false, message: "Please enter your email" })
    }
    const user = await Users.findOne({ "email": req.body.email })

    if (!user) {
      return res.status(400).send({ status: false, message: "Invalid Email ID" })

    }
    if (user) {
      var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: "info@hminnovance.com",
          pass: "dhefcdnwioddvqjl",
        }
      });
      let otpnum = Math.floor(Math.random() * 90000) + 10000;
      let addotp = await Users.findOneAndUpdate({ "email": req.body.email }, { $set: { otp: otpnum } })

      var mailOptions = {
        from: "info@hminnovance.com",
        to: `${req.body.email}`,
        subject: `Reset Password`,
        text: `
              Please use the following OTP Code to reset your password: ${otpnum}

              If you did not request a password change, please feel free to ignore this message.
              
              If you have any comments or questions don't hesitate to reach us at radhika@hminnovance.com
              Please feel free to respond to this email. It was sent from a monitored email address, and we would love to hear from you.

              Thanks,
              H & M Innovance LLP Team
          `
      };

      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }

      });
      const token = generateToken(user._id)
      res.status(200).json({ status: true, message: { token: token, role: user.role } })
    }
  } catch (err) {
    res.status(500).json({ status: true, message: err.message })

  }

}


const varifyOtp = async (req, res) => {
  if (!req.body.otp) {
    return res.status(400).json({ status: false, message: "Please enter your Otp" })

  }
  const varifyOtp = await Users.findOne({ "_id": req.user._id })

  if (!varifyOtp) {
    res.status(400).json({ status: false, message: "Invalid OTP" })
  }
  try {
    if (varifyOtp.otp == req.body.otp) {
      res.status(200).json({ status: true, message: "Success" })
    } else {
      res.status(400).json({ status: false, message: "Enter valid OTP" })

    }
  } catch (error) {
    res.json(error)
  }
}


const resetPassword = async (req, res) => {
  try {

    if (req.body.password == "" || req.body == undefined || req.body.password == undefined) {
      return res.status(400).send({ status: false, message: "Please enter new password" })
    }
    else {
      let hashPass = await bcrypt.hashSync(req.body.password, 10)
      let sucess = await Users.findByIdAndUpdate({ "_id": req.user._id }, { $set: { "password": hashPass } })
      res.status(200).json({ status: true, message: "Successful reset password" })

    }
  } catch (error) {
    res.status(400).json({ status: false, message: error })
  }
}

const sendingEmail = async (req, res) => {
  const { className, firstName, lastName, fatherName, phoneNumber, location,
    gender, school, board, degree, refference } = req.body
  try {
    var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: "info@hminnovance.com",
        pass: "dhefcdnwioddvqjl",
      }
    });


    var mailOptions = {
      from: "info@hminnovance.com",
      to: "contact@hminnovance.com",
      subject: `Sending Email by user `,
      text: `
Hello Sir/Madam,
 

   First Name : ${firstName}
   Last Name : ${lastName}
   Father Name : ${fatherName}
   Phone Number : ${phoneNumber}
   Gender : ${gender}
   Adress : ${location}
   Class Name : ${className}
   ${school ? `School : ${school}` : ""}
   ${board ? `Board : ${board}` : ""}
   ${degree ? `Stream : ${degree}` : ""}
   ${refference ? `Refference : ${refference}` : ""}
   

Thank you,‍
My Year Book

‍
`
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });
    res.status(200).json({ status: true, message: "Thanks For Connecting Us !" })
  } catch (error) {
    res.status(500).json({ status: false, message: error })
  }
}

const profileImage = async (req, res) => {
  try {

    console.log(req.file)
    let response = await Users.updateOne({ _id: req.user._id }, { $set: { avtar: req.file.filename } })
    res.status(200).json({ status: true, message: "Profile Picture add successfully" });
  } catch (error) {
    res.status(500).json({ status: false, message: error })


  }
}

const updateProfile = async (req, res) => {
  try {

    let { name, email, mobile, dob, gender, country, address, state } = req.body;

    let user = await Users.findOne({ _id: req.user._id })


    name = name ? name : user.name;
    email = email ? email : user.email;
    mobile = mobile ? mobile : user.mobile;
    dob = dob ? dob : user.dob;
    gender = gender ? gender : user.gender;
    country = country ? country : user.country;
    address = address ? address : user.address;
    state = state ? state : user.state;

    let response = await Users.updateOne({ _id: req.user._id }, {
      $set: {
        name, email, mobile, dob, gender, country, address, state
      }
    })
    res.status(200).json({ status: true, message: "Profile update success" })

  } catch (error) {
    res.status(500).json({ status: false, message: error })

  }
}

const getProfile = async (req, res) => {
  try {
    let user = await Users.findOne({ _id: req.user._id }).select({ password: 0 })
    res.status(200).json({ status: true, message: user })

  } catch (error) {
    res.status(500).json({ status: false, message: error })

  }
}



module.exports = { getProfile, userRegister, userLogin, getInTouch, codeSend, varifyOtp, resetPassword, sendingEmail, profileImage, updateProfile }
