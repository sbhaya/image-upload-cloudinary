const express = require("express");
const connectDB = require("./config/db");
const path = require("path");
// var fs = require("file-system");
const Userimg = require("./models/Userimage");
var multer = require("multer");
var storage = multer.memoryStorage();
var upload = multer({ storage: storage });

require("dotenv").config();
const fileUpload = require("express-fileupload");

const cloudinary = require("cloudinary").v2;
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

var cors = require("cors");

const app = express();
app.use(fileUpload({ useTempFiles: true }));

// Connect Database
connectDB();

// Init Middleware

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(cors());
// Define Routes

app.use("/api/userimage", require("./routes/userimage"));

// Serve static assets in production
if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("client/build"));
  app.use(express.static("public"));

  app.get("*", (req, res) =>
    res.sendFile(
      path.resolve(__dirname, "public", "client", "build", "index.html")
    )
  );
}

app.post("/api/upload", upload.single("image"), async (req, res) => {
  let tmpPath = req.files?.file;
  cloudinary.uploader.unsigned_upload(
    tmpPath?.tempFilePath,
    process.env.UPLOAD_PRESET,
    {
      folder: "profile_image",
      public_id: tmpPath?.name,
      resource_type: "auto",
    },
    (err, fileResponse) => {
      if (err) console.log(err);
      res.json(fileResponse);
    }
  );
});

app.post("/api/delete", async (req, res) => {
  let val = req.body.file;
  let myval = val.split("/")[8].split(".");
  let retainimgtype = `${myval[0]}.${myval[1]}`;

  let final = `profile_image/${retainimgtype}`;
  cloudinary.uploader.destroy(
    final,
    process.env.UPLOAD_PRESET,
    (err, fileResponse) => {
      if (err) console.log(err);
      res.json(fileResponse);
    }
  );
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
