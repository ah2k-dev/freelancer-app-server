const Project = require("../models/project/project");
const User = require("../models/user/user");
const UserProfile = require("../models/user/userProfile");

//post
const hireFreeLancer = async (req, res) => {
  try {
    const { title, description, budget, skills, category, deadline } = req.body;
    const newProject = new Project({
      title,
      description,
      budget,
      skills,
      owner: req.user._id,
      category,
      deadline,
    });
    await newProject.save();
    res.status(200).json({ success: true, message: "Project created" });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

const setProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const { address, skills, experience } = req.body;
    const newProfile = new UserProfile({
      user: user._id,
      address,
      skills,
      experience,
    });
    await newProfile.save();
    res.status(200).json({ success: true, message: "Profile created" });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

//get

const getMyProjects = async (req, res) => {
  try {
    let projects = await Project.find({ owner: req.user._id });
    if (!projects) {
      return res
        .status(404)
        .json({ success: false, message: "No projects found" });
    }
    let assignedProjects = projects.filter(
      (project) => project.status.assignStatus === ture
    );
    let unassignedProjects = projects.filter(
      (project) => project.status.assignStatus === false
    );
    let completedProjects = projects.filter(
      (project) => project.status.completedOwnerEnd === true
    );
    let rejectedProjects = projects.filter(
      (project) => project.status.rejected === true
    );
    res.status(200).json({
      success: true,
      assignedProjects,
      unassignedProjects,
      completedProjects,
      rejectedProjects,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

const findJobs = async (req, res) => {
  try {
    let projects = await Project.find({
      status: {
        assignStatus: false,
        rejected: false,
        completedOwnerEnd: false,
      },
    }).populate({
      path: "owner",
      select: "name email mobile",
    });
    if (!projects) {
      return res
        .status(404)
        .json({ success: false, message: "No projects found" });
    }
    projects.filter((project) => project.owner !== req.user._id);
    res.status(200).json({ success: true, projects });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

const myJobs = async (req, res) => {
  try {
    let projects = await Project.find({
      assignedTo: req.user._id,
    });
    if (!projects) {
      return res
        .status(404)
        .json({ success: false, message: "No projects found" });
    }
    let pendingProjects = projects.filter(
      (project) => project.status.workingStatus === "pending"
    );
    let workingProjects = projects.filter(
      (project) => project.status.workingStatus === "working"
    );
    let completedProjects = projects.filter(
      (project) => project.status.workingStatus === "completed"
    );
    let rejectedProjects = projects.filter(
      (project) => project.status.rejected === "rejected"
    );
    let verifiedProjects = projects.filter(
      (project) => project.status.completedOwnerEnd === true
    );
    res.status(200).json({
      success: true,
      pendingProjects,
      workingProjects,
      completedProjects,
      rejectedProjects,
      verifiedProjects,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

const getProfile = async (req, res) => {
  try {
    const profile = await UserProfile.findOne({ user: req.user._id }).populate({
      path: "user",
      select: "name email",
    });
    if (!profile) {
      return res
        .status(404)
        .json({ success: false, message: "No profile found" });
    }
    res.status(200).json({ success: true, profile });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

const getApplicants = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res
        .status(404)
        .json({ success: false, message: "No project found" });
    }
    res.status(200).json({ success: true, applicants: project.appliedBy });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

const markProjectComplete = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res
        .status(404)
        .json({ success: false, message: "No project found" });
    }
    project.status.completedOwnerEnd = true;
    await project.save();
    res.status(200).json({ success: true, message: "Project marked complete" });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

const markProjectRejected = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res
        .status(404)
        .json({ success: false, message: "No project found" });
    }
    project.status.rejected = true;
    await project.save();
    res.status(200).json({ success: true, message: "Project marked rejected" });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

const markProjectRejectedFreeLancer = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res
        .status(404)
        .json({ success: false, message: "No project found" });
    }
    project.status.rejected = true;
    await project.save();
    res.status(200).json({
      success: true,
      message: "Project marked rejected by freelancer",
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

const acceptApplicant = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res
        .status(404)
        .json({ success: false, message: "No project found" });
    }
    project.status.assignStatus = true;
    project.assignedTo = req.body.freelancerId;
    await project.save();
    res.status(200).json({ success: true, message: "Applicant accepted" });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

const updateProjectWorkingStatus = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res
        .status(404)
        .json({ success: false, message: "No project found" });
    }
    project.status.workingStatus = req.body.status;
    await project.save();
    res.status(200).json({ success: true, message: "Status updated" });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

module.exports = {
  hireFreeLancer,
  setProfile,
  getMyProjects,
  findJobs,
  myJobs,
  getProfile,
  getApplicants,
  markProjectComplete,
  markProjectRejected,
  markProjectRejectedFreeLancer,
  acceptApplicant,
  updateProjectWorkingStatus,
};
