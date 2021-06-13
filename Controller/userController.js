const Userdb = require("../Model/userModel");
const mongoose = require("mongoose");

// create and save new user
exports.addUser = async (req, res) => {
  const { userid, username, dateofbirth, adress, description } = req.body;
  const users = new Userdb({
    userid,
    username,
    dateofbirth,
    adress,
    description
  });
  users
    .save()
    .then(() => {
      return res.status(200).json({
        message: "saved !!"
      });
    })
    .catch(e => {
      return res.status(400).json({
        message: e
      });
    });
};

// retrieve and return all users/ retrive and return a single user
exports.getUser = (req, res) => {
  Userdb.find({})
    .then(data => {
      return res.status(200).json({ data });
    })
    .catch(e => {
      return res.status(400).json({
        message: e
      });
    });
};

//update users
exports.updateUser = (req, res) => {
  const Userid = new mongoose.Types.ObjectId(req.params.id);
  const { userid, username, dateofbirth, adress, description } = req.body;
  Userdb.findByIdAndUpdate(
    { _id: Userid },

    { $set: { userid, username, dateofbirth, adress, description } }
  )
    .then(() => {
      return res.status(200).json({
        message: "updated user"
      });
    })
    .catch(e => {
      return res.status(400).json({
        message: e
      });
    });
};

//delete userdetails
exports.deleteUser = (req, res) => {
  const userid = new mongoose.Types.ObjectId(req.params.id);
  Userdb.findByIdAndDelete({ _id: userid })
    .then(() => {
      return res.status(200).json({
        message: "user deleted !!"
      });
    })
    .catch(e => {
      return res.status(400).json({
        message: e
      });
    });
};

//find nearby friends
exports.findUser = (req, res) => {
  Userdb.find({
    location: {
      near: {
        $maxDistance: 1000,
        $geometry: {
          type: "Point",
          coordinates: [36.09894, -112.110491]
        }
      }
    }
  })
    .find((err, results) => {
      if (err) {
        console.log(err);
      }
      console.log(JSON.stringify(results));
      res.json(results);
    })
    .catch(err => {
      console.log(err);
    });
};

//login user and varify
exports.loginUser = async (req, res) => {
  try {
    var userid = req.body.userid;
    var cdateofbirth = req.body.dateofbirth;

    const uservarify = await Userdb.findOne({ userid: userid });
    if (uservarify.dateofbirth === dateofbirth) {
      res.status(200).send("welcome to dashboard");
    } else {
      res.send("invalid login details");
    }
  } catch (error) {
    res.status(400).send("invalid login details");
  }
};
