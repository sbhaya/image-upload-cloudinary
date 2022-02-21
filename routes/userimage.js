const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const fileUpload = require("express-fileupload");
const Userimg = require("../models/Userimage");
const app = express();

app.use(fileUpload());

// @route     GET api/userimage
// @access   public
router.get("/", async (req, res) => {
  try {
    const userimg = await Userimg.find({}).sort({
      date: -1, //sorting starting from the recent date
    });

    res.json(userimg);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

router.post(
  "/",
  [check("userimage", "Image is required").not().isEmpty()],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { userimage } = req.body;

    try {
      const newUserimg = new Userimg({
        userimage,
      });

      const userimg = await newUserimg.save();

      res.json(userimg);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// @route     PUT api/userimage/:id
// @phone      Update userimage
// @access    Private
router.put("/:id", async (req, res) => {
  const { title, userimg } = req.body;

  // Build userimage object
  const userimgFields = {};
  if (title) userimgFields.title = title;
  if (userimg) userimgFields.userimg = userimg;

  try {
    let userimg = await Userimg.findById(req.params.id);
    if (!userimg)
      return res.status(404).json({ msg: "No User image is found" });

    userimg = await Userimg.findByIdAndUpdate(
      req.params.id,
      { $set: userimgFields },
      { new: true }
    );

    res.json(userimg);
  } catch (err) {
    console.error(er.message);
    res.status(500).send("Server Error");
  }
});

// @route     DELETE api/userimage/:id
// @phone      Delete user image
// @access    Private
router.delete("/:id", async (req, res) => {
  try {
    let userimg = await Userimg.findById(req.params.id);

    if (!userimg) return res.status(404).json({ msg: "User image not found" });

    await Userimg.findByIdAndRemove(req.params.id);

    res.json({ msg: "User image is removed" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
