const User = require("../models/user");

exports.createOrUpdateUser = async (req, res) => {
  const { name, picture, email } = req.user;
  const {firstName,lastName,pin,po,teh,dist,state,mobile,id}=req.body;

  const user = await User.findOneAndUpdate(
    { email },
    { firstname: req.body.firstName,
      lastname:req.body.lastName,
      pin:pin,
      po:po,
      teh:teh,
      dist:dist,
      state:state,
      mobile:req.body.mobile,
      id:id,
      picture, },
    { new: true }
  );
  if (user) {
    console.log("USER UPDATED", user);
    res.json(user);
  } else {
    const newUser = await new User({
      email,
      firstname: req.body.firstName,
      lastname:req.body.lastName,
      pin:pin,
      po:po,
      teh:teh,
      dist:dist,
      state:state,
      mobile:req.body.mobile,
      id:id,
      picture,
    }).save();
    console.log("USER CREATED", newUser);
    res.json(newUser);
  }
};

exports.currentUser = async (req, res) => {
  User.findOne({ email: req.user.email }).exec((err, user) => {
    if (err) throw new Error(err);
    res.json(user);
  });
};
