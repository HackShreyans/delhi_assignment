//user Auth part is incomleted>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>



const JWT = require("jsonwebtoken");
const UserModel = require("../Model/userModel");

//here is create userAuth tokens

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  // console.log("authorization", authorization);
  if (!authorization) {
    return res.status(401).json({
      message: "Unauthorized 1",
      data: {}
    });
  }

  let token = authorization.replace("Bearer ", "");

  JWT.verify(token, process.env.jwt_key, (err, decoded) => {
    if (!decoded || err) {
      return res.status(401).json({
        message: "Unauthorized 2",
        data: {}
      });
    }

    let _id = decoded._id;

    Userdb.findById({ _id })
      .then(result => {
        if (result == undefined || result == null) {
          return res.status(401).json({
            message: "Unauthorized 3",
            data: {}
          });
        }
        req.user = result;
        next();
      })
      .catch(err => {
        console.log("problem with user fetching in", err);
        return res.status(500).json({
          message: "problem with user fetching",
          data: {}
        });
      });
  });
};
