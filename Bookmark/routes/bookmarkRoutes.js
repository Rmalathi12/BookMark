const express = require("express");
const router = express.Router();
const Bookmark = require("../models/Bookmark");

router.get("/bookmarks", async (req, res) => {
  try {
    const bookmarks = await Bookmark.find();
    res.json(bookmarks);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.post("/bookmarks", async (req, res) => {
  try {
    const newBookmark = new Bookmark({
      title: req.body.title,
      url: req.body.url,
      category: req.body.category,
      createdAt: req.body.createdAt,
    });
    const savedBookmark = await newBookmark.save();
    res.json(savedBookmark);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.put("/bookmarks/:id", async (req, res) => {
  try {
    const updatedBookmark = await Bookmark.findByIdAndUpdate(
      req.params.id,
      {
        title: req.body.title,
        url: req.body.url,
        category: req.body.category,
        createdAt: req.body.createdAt,
      },
      { new: true },
    );

    res.json(updatedBookmark);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
router.delete("/bookmarks/:id", async (req, res) => {
  try {
    await Bookmark.findByIdAndDelete(req.params.id);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
module.exports = router;
