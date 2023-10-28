const Edu = require("../models/educationModel");
const awsController = require("../controllers/awsController");
const Book = require("../models/bookModel");
let data = require("../../educationData");
const saveClass = async (req, res) => {
  let files = req.files;
  const { className, subject, chapter, setNumber, course, docsUrl, bookName } =
    req.body;
  if (files && files.length > 0)
    var uploadedFileURL = await awsController.uploadFile(files[0]);
  req.body.docsUrl = uploadedFileURL;
  const savedDocs = await Edu.create(req.body);
  res.send({ status: true, savedDocs });
};

const getFiles = async (req, res) => {
  let query = req.query;
  if (Object.keys(query).length == 0) {
    return res.status(400).send({ status: false, message: "Query is Empty" });
  }
  var { className, subject, chapter } = query;
  if (!className) {
    return res
      .status(400)
      .send({ status: false, message: "Class name is required" });
  }
  let filterObj = {};
  if (className) {
    filterObj.className = query.className;
  }
  if (subject) {
    filterObj.subject = query.subject;
  }
  if (chapter) {
    filterObj.chapter = query.chapter;
  }
  let data = await Edu.find(filterObj).select({ _id: 0, __v: 0 });
  res.status(200).send({ status: true, Data: data });
};

const subject = async (req, res) => {
  let className = req.params.className;
  try {
    let response = await Edu.find({ className });

    res.json(response);
  } catch (error) {}
};
const allData = async (req, res) => {
  let response = await Edu.find();
  res.json(response);
};

const insertEducationData = async (req, res) => {
  try {
    for (let i = 0; i < data.length; i++) {
      let response = await Book.create({
        className: data[i].className,
        bookName: data[i].bookName,
        course: data[i].course,
        subject: data[i].subject,
        chapter: data[i].chapter,
        setNumber: data[i].setNumber,
        docsUrl: data[i].docsUrl,
      });
      // await response.save();
    }
    res.json("Insert Successfully");
  } catch (error) {
    res.json(error);
  }
};
module.exports = { saveClass, getFiles, subject, allData, insertEducationData };
