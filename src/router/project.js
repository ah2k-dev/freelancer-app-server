const router = require("express").Router();

const isAuthenticated = require("../../../OneDrive/Documents/Repos/insight-meter-node-backend/src/middleware/auth");
const project = require("../controllers/project");

//post
router.route("/hireFreeLancer").post(isAuthenticated, project.hireFreeLancer);
router.route("setProfile").post(isAuthenticated, project.setProfile);

//get
router.route("/myProjects").get(isAuthenticated, project.getMyProjects);
router.route("/findJobs").get(isAuthenticated, project.findJobs);
router.route("/myJobs").get(isAuthenticated, project.myJobs);
router.route("/getProfile").get(isAuthenticated, project.getProfile);
router.route("/getApplicants/:id").get(isAuthenticated, project.getApplicants);

//put
router
  .route("/markProjectComplete/:id")
  .put(isAuthenticated, project.markProjectComplete);
router
  .route("/markProjectRejected/:id")
  .put(isAuthenticated, project.markProjectRejected);
router
  .route("/acceptApplicant/:id")
  .put(isAuthenticated, project.acceptApplicant);
router
  .route("markProjectRejectedFreelancer/:id")
  .put(isAuthenticated, project.markProjectRejectedFreeLancer);
router
  .route("/updateProjectWorkingStatus:id")
  .put(isAuthenticated, project.updateProjectWorkingStatus);

module.exports = router;
