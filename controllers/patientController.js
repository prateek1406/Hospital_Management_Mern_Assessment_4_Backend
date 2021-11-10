const Patient = require("./../models/patientModel");
const catchAsync = require("./../utils/catchAsync");

exports.addPatient = catchAsync(async (req, res, next) => {
  const patient = await Patient.create({
    name: req.body.name,
    phone: req.body.phone,
    gender: req.body.gender,
    purpose: req.body.purpose,
    age: req.body.age,
  });

  res.status(200).json({
    status: "success",
    data: {
      patient,
    },
  });
});

exports.getPatients = catchAsync(async (req, res, next) => {
  const patients = await Patient.find();
  res.status(200).json({
    status: "success",
    patients,
  });
});

exports.getPatientById = catchAsync(async (req, res, next) => {
  const patient = await Patient.findById(req.params.id);
  res.status(200).json({
    status: "success",
    patient,
  });
});

exports.updatePateint = catchAsync(async (req, res, next) => {
  const updatedPatient = await Patient.findOneAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );
  res.status(200).json({
    status: "success",
    updatedPatient,
  });
});

exports.deletePatient = catchAsync(async (req, res, next) => {
  await Patient.findOneAndDelete(req.params.id);

  res.status(200).json({
    status: "success",
  });
});
