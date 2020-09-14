const { sign } = require("jsonwebtoken");

const validateInput = (input) => {
  const { action, email, password } = input;

  const errors = {};

  if (email.trim() === "") {
    errors.email = "Email must not be empty";
  } else {
    const regEx = /^([0-9a-zA-Z]([-.w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-w]*[0-9a-zA-Z].)+[a-zA-Z]{2,9})$/;
    if (!email.match(regEx))
      errors.email = "Email must be a valid email address";
  }

  if (password.trim() === "") errors.password = "Password must not be empty";

  if (action === "register") {
    const { username, confirmPassword } = input;
    if (username.trim() === "") errors.username = "Username must not be empty";
    if (password !== confirmPassword) errors.password = "Passwords must match";
  }

  return { valid: Object.keys(errors).length < 1, errors };
};

const generateToken = (user) => {
  const token = sign(
    { id: user._id, email: user.email, username: user.username },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );
  return token;
};

module.exports = {
  validateInput,
  generateToken,
};
