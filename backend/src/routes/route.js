const express = require("express");
const router = express.Router();
const { protect } = require("../middlewares/auth1");
const {
  userRegister,
  userLogin,
  getInTouch,
  codeSend,
  varifyOtp,
  resetPassword,
  sendingEmail,
  updateProfile,
  getProfile
} = require("../controllers/userController");
const {
  saveClass,
  getFiles,
  subject,
  allData,
  insertEducationData,
  updateEdu
} = require("../controllers/eduController");
// const {createClass,createSubject,createChapter, createSet,getAllTopics,fecthAllChapter, fetchAllSet, createQuestion} = require('../controllers/bookController');
const { verify } = require("jsonwebtoken");
// router.get("/test", (req, res) => {
//   res.send("I will kill you!");
// });
router.post("/api/user/register", userRegister);
router.post("/api/user/login", userLogin);
router.put("/update/profile/details", protect, updateProfile)
router.get("/profile/details", protect, getProfile)
//Book Apis
router.post("/api/classes/subjects", saveClass);
router.get("/api/classes/subjects", getFiles);
router.get("/subject/:className", subject);
router.put("/update/edu/:className/:subject/:stream", updateEdu);

router.post("/get/touch", getInTouch);
router.post("/code/send", codeSend);
router.post("/verify/otp", protect, varifyOtp);
router.post("/reset/password", protect, resetPassword);

router.post("/sending/email", sendingEmail);
router.get("/all/data", allData);
router.post("/insert/all/data", insertEducationData);

module.exports = router;
