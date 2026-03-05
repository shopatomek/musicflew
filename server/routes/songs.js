const router = require("express").Router();

const song = require("../models/song");

router.post("/save", async (req, res) => {
  const newSong = song({
    name: req.body.name,
    imageURL: req.body.imageURL,
    songURL: req.body.songURL,
    album: req.body.album,
    artist: req.body.artist,
    language: req.body.language,
    category: req.body.category,
  });

  try {
    const saveSong = await newSong.save();
    return res.status(200).send({ success: true, song: saveSong });
  } catch (error) {
    return res.status(400).send({ success: false, msg: error });
  }
});

router.get("/getAll", async (req, res) => {
  const options = {
    sort: {
      createdAt: 1,
    },
  };
  const data = await song.find(options);
  if (data) {
    // return res.json(data);
    return res.status(200).send({ success: true, song: data });
  } else {
    // return res.json("Not availble")
    return res.status(400).send({ success: false, msg: "data not found" });
  }
});

router.get("/getOne/:getOne", async (req, res) => {
  const filter = { _id: req.params.getOne };
  const cursor = await song.findOne(filter);

  if (cursor) {
    // return res.json(data);
    return res.status(200).send({ success: true, data: cursor });
  } else {
    // return res.json("Not availble")
    return res.status(200).send({ success: false, msg: "data not found" });
  }
});

router.put("/update/:id", async (req, res) => {
  const filter = { _id: req.params.id };
  const options = {
    upsert: true,
    new: true,
  };

  try {
    const result = await song.findOneAndUpdate(
      filter,
      {
        name: req.body.name,
        imageURL: req.body.imageURL,
        songURL: req.body.songURL,
        album: req.body.album,
        artist: req.body.artist,
        language: req.body.language,
        category: req.body.category,
      },
      options
    );
    return res.status(200).send({ success: true, data: result });
  } catch (error) {
    return res.status(400).send({ success: false, msg: error });
  }
});

router.delete("/delete/:id", async (req, res) => {
  const filter = { _id: req.params.id };
  const result = await song.deleteOne(filter);
  if (result) {
    // return res.json(data);
    return res
      .status(200)
      .send({ success: true, msg: "Song has been deleted", data: result });
  } else {
    return res.status(400).send({ success: false, msg: "song not found" });
  }
});

module.exports = router;
