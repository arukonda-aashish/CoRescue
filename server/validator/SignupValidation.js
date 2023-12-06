const validator = require("validator");
const isEmpty = require("./IsEmpty");

module.exports = function SignupValidation(data) {
  let regex = /(?=(.*[0-9]))((?=.*[A-Za-z0-9])(?=.*[A-Z])(?=.*[a-z]))^.{8,}$/i;
  let errors = {};

  // Convert empty fields to an empty string so we can use validator
  data.latitude = !isEmpty(data.latitude) ? data.latitude : "";
  data.longitude = !isEmpty(data.longitude) ? data.longitude : "";
  data.code = !isEmpty(data.code) ? data.code : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.phoneNumber = !isEmpty(data.phoneNumber) ? data.phoneNumber : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.confirmPassword = !isEmpty(data.confirmPassword) ? data.confirmPassword : "";

  // Latitude checks
  if (validator.isEmpty(data.latitude)) {
    errors.latitude = "Latitude field is required";
  }

  // Longitude checks
  if (validator.isEmpty(data.longitude)) {
    errors.longitude = "Longitude field is required";
  }

  // Code checks
  if (validator.isEmpty(data.code)) {
    errors.code = "Code field is required";
  } else {
    const sum = Number(data.latitude) + Number(data.longitude);
    if (Number(data.code) !== sum) {
      errors.code = "Code should be the sum of latitude and longitude";
    }
  }

  // Email checks
  if (validator.isEmpty(data.email)) {
    errors.email = "Email field is required";
  } else if (!validator.isEmail(data.email)) {
    errors.email = "Invalid email format";
  }

  // Phone Number checks
  if (validator.isEmpty(data.phoneNumber)) {
    errors.phoneNumber = "Phone Number field is required";
  }

  // Password checks
  if (validator.isEmpty(data.password)) {
    errors.password = "Password field is required";
  } else if (!regex.test(data.password)) {
    errors.password =
      "Password should have 1 lowercase letter, 1 uppercase letter, 1 number, and be at least 8 characters long";
  }

  // Confirm Password checks
  if (validator.isEmpty(data.confirmPassword)) {
    errors.confirmPassword = "Confirm Password field is required";
  } else if (data.password !== data.confirmPassword) {
    errors.confirmPassword = "Passwords do not match";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
