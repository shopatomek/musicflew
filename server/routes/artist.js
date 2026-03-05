const artist = require("../models/artist");
const router = require("express").Router();

// const { rawListeners } = require("../models/artist");

router.post("/save", async (req, res) => {
  const newArtist = artist({
    name: req.body.name,
    imageURL: req.body.imageURL,
    twitter: req.body.twitter,
    instagram: req.body.instagram,
  });

  try {
    const saveArtist = await newArtist.save();
    return res.status(200).send({ success: true, artist: saveArtist });
  } catch (error) {
    return res.status(400).send({ success: false, msg: error });
  }
});

// BELOW IS EXAMPLE OF CRUD OPERATIONS MAKING ON DATA

// Fetching single artist(getOne) information

router.get("/getOne/:id", async (req, res) => {
  // below is example of fetching method to fetch unique Id token
  // return res.json(req.params.id);

  // Fetching data from mongoDB "{_id}" by findOne() metod

  const filter = { _id: req.params.id };
  const cursor = await artist.findOne(filter);

  if (cursor) {
    // return res.json(data);
    return res.status(200).send({ success: true, data: cursor });
  } else {
    // return res.json("Not availble")
    return res.status(400).send({ success: false, msg: "data not found" });
  }
});

// Fetch all the data form artist information method

router.get("/getAll", async (req, res) => {
  const options = {
    sort: {
      createdAt: 1,
    },
  };
  const cursor = await artist.find(options);
  if (cursor) {
    // return res.json(data);
    return res.status(200).send({ success: true, data: cursor });
  } else {
    // return res.json("Not availble")
    return res.status(400).send({ success: false, msg: "data not found" });
  }
});

// artist update using PUT

router.put("/update/:id", async (req, res) => {
  const filter = { _id: req.params.id };
  const options = {
    upsert: true,
    new: true,
  };

  try {
    const result = await artist.findOneAndUpdate(
      filter,
      {
        name: req.body.name,
        imageURL: req.body.imageURL,
        twitter: req.body.twitter,
        instagram: req.body.instagram,
      },
      options
    );
    return res.status(200).send({ success: true, data: result });
  } catch (error) {
    return res.status(400).send({ success: false, msg: error });
  }
});

// delete method below

router.delete("/delete/:id", async (req, res) => {
  const filter = { _id: req.params.id };
  const result = await artist.deleteOne(filter);
  if (result) {
    // return res.json(data);
    return res
      .status(200)
      .send({ success: true, msg: "Data has been deleted", data: result });
  } else {
    // return res.json("Not availble")
    return res.status(400).send({ success: false, msg: "data not found" });
  }
});

module.exports = router;
