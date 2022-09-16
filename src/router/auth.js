const router = require("express").Router();

const { signIn, signOut, signUp } = require("../controllers/auth");

router.route("/signUp").post(signUp);
router.route("/signIn").post(signIn);
router.route("/signOut").post(signOut);

module.exports = router;
