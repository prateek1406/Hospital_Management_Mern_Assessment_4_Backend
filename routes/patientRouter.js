const express = require("express");
const router = express.Router();
// const authController = require("./../controllers/authController");
const patientController = require("./../controllers/patientController");
router.post("/addPatient", patientController.addPatient);
router.get("/getPatients", patientController.getPatients);
router.get("/getPatientById/:id", patientController.getPatientById);
router.patch("/updatePatient/:id", patientController.updatePateint);
router.delete("/deletePatient/:id", patientController.deletePatient);
module.exports = router;