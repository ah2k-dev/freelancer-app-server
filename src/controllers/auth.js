const User = require("../models/user/user");
// const UserProfile = require("../models/user/userProfile");

const signUp = async (req, res) => {
  try {
    const { name, email, password, mobile } = req.body;
    const newUser = new User({
      name,
      email,
      password,
      mobile,
    });
    await newUser.save();
    res
      .status(200)
      .json({ success: true, message: "User created successfully" });
  } catch (error) {
    res.status(500).json({ sucess: false, error: error.message });
  }
};

const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ success: false, message: "Incorrect password" });
    }
    const token = await user.generateAuthToken();
    res.status(200).json({ success: true, token });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

const signOut = async (req, res) => {
  try {
    req.user = null;
    res.status(200).json({ success: true, message: "User signed out" });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

module.exports = {
  signUp,
  signIn,
  signOut,
};
