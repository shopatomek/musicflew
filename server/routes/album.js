const router = require("express").Router();

const album = require("../models/album");

// Using POST we are posting creating data about albums on the mongoDB server

router.post("/save", async (req, res)=>{
    const newAlbum = album({
     name: req.body.name,
     imageURL: req.body.imageURL,
    })
 
    try {
     const saveAlbum = await newAlbum.save();
     return res.status(200).send({success: true, album: saveAlbum})
    } catch (error) {
     return res.status(400).send({success: false, msg: error})
    }
 });

 router.get("/getOne/:id", async(req, res)=>{

    const filter = {_id: req.params.id };
    const data = await album.findOne(filter)

    if (data){
        // return res.json(data);
       return res.status(200).send({success: true, album: data});
    }else {
        // return res.json("Not availble")
        return res.status(400).send({success: false, msg: "data not found"})
    }
});

router.get("/getAll", async (req, res)=>{
    const options = { 
        sort: {
            createdAt : 1,
        },
    };
    const data = await album.find(options)
    if (data){
        // return res.json(data);
       return res.status(200).send({success: true, album: data});
    }else {
        // return res.json("Not availble")
        return res.status(400).send({success: false, msg: "data not found"})
    }
});

// update album information

router.put("/update/:id", async(req, res)=>{
    const filter = { _id: req.params.id };
    const options = {
      upsert: true,
      new: true,
    };

    try {
      const result = await album.findOneAndUpdate(filter, {
            name: req.body.name,
            imageURL: req.body.imageURL,         
      },
      options
      );
      return res.status(200).send({success: true, data: result})
    } catch (error) {
        return res.status(400).send({success: false, msg: error})
    }
});

// delete method below

router.delete("/delete/:id", async(req, res) => {
    const filter = {_id: req.params.id };
    const result =  await album.deleteOne(filter);
   if (result ){
    // return res.json(data);
   return res.status(200).send({success: true, msg: "Data has been deleted", data: result});
}else {
    // return res.json("Not availble")
    return res.status   (400).send({success: false, msg: "data not found"})
}
})

module.exports = router