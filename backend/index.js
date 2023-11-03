const express = require("express");
const mongoose = require("mongoose");
const multer = require("multer");
const cors = require("cors");
const path = require('path')
const { GridFsStorage } = require("multer-gridfs-storage");
const route = require("./src/routes/route");
const { protect } = require("./src/middlewares/auth1");
const { profileImage } = require("./src/controllers/userController");
const app = express();
app.use(express.json());
app.use(cors({ origin: "*" }));

const { postReq, postRes, htmlTest } = require('./src/controllers/paymentController');
var dotenv = require('dotenv')
dotenv.config({ path: "./config/.env" })



app.use(express.static('public'));
app.set('views', __dirname + '/client');
app.engine('html', require('ejs').renderFile);





const mongouri =
  "mongodb+srv://guru:Guru7563@cluster0.ogxrryr.mongodb.net/education?retryWrites=true&w=majority";

mongoose
  .connect(`${mongouri}`, {
    useNewUrlParser: true,
  })
  .then(() => console.log("Db is connected"))
  .catch((err) => console.log(err.message));



const storage = new GridFsStorage({
  url: mongouri,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      const originalName = file.originalname;
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      const filename = uniqueSuffix + "-" + originalName;
      const fileInfo = {
        filename: filename,
        bucketName: "file1",
      };
      resolve(fileInfo);
    });
  },
});
const upload = multer({
  storage,
});
//creating bucket
let bucket;
mongoose.connection.on("connected", () => {
  var client = mongoose.connections[0].client;
  var db = mongoose.connections[0].db;
  bucket = new mongoose.mongo.GridFSBucket(db, {
    bucketName: "file1",
  });
});



app.get("/image/:filename", async (req, res) => {
  let data = req.params.filename
  console.log(data)

  const file = await bucket.find({
    filename: req.params.filename,
  });
  if (!file) {
    return res.status(403).json("Not Found")
  }
  if (req.params.filename == null) {
    return res.status(403).json("https://e7.pngegg.com/pngimages/799/987/png-clipart-computer-icons-avatar-icon-design-avatar-heroes-computer-wallpaper-thumbnail.png")
  } else {
    bucket.openDownloadStreamByName(req.params.filename).pipe(res);

  }
});



app.set('view engine', 'ejs'); // Set EJS as the view engine
app.set('views', path.join(__dirname, 'views'));

app.use("/", route);

app.put("/upload/profile", upload.single("image"), protect, profileImage)



app.post('/payment', postReq);


app.post('/ccavResponseHandler', postRes)
app.get('/test', htmlTest)









const port = process.env.port || 3000;
app.listen(port, () => {
  console.log(`server is running on ${port}`);
});


