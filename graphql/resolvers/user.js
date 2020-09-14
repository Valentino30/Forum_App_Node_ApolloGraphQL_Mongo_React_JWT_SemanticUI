const { hash, compare } = require("bcryptjs");
const { UserInputError } = require("apollo-server");

const User = require("../../models/User");
const { validateInput } = require("../../utils/utils");
const { generateToken } = require("../../utils/utils");

const UserMutations = {
  register: async (
    _,
    { input: { username, email, password, confirmPassword } }
  ) => {
    const { valid, errors } = validateInput({
      action: "register",
      username,
      email,
      password,
      confirmPassword,
    });

    if (!valid) throw new UserInputError("Invalid Input", { errors });

    const user = await User.findOne({ email });
    if (user)
      throw new UserInputError("Email already registered", {
        errors: { email: "Email already registered" },
      });

    const hashedPassword = await hash(password, 12);
    const newUser = await new User({
      username,
      email,
      password: hashedPassword,
    }).save();

    const token = generateToken(newUser);

    return {
      id: newUser._id,
      username: newUser.username,
      email: newUser.email,
      token,
    };
  },
  login: async (_, { email, password }) => {
    const { valid, errors } = validateInput({
      action: "login",
      email,
      password,
    });
    if (!valid) throw new UserInputError("Invalid Input", { errors });

    const user = await User.findOne({ email });
    if (!user)
      throw new UserInputError("Invalid Credentials", {
        errors: { email: "Email not registered" },
      });

    const isPasswordCorrect = await compare(password, user.password);
    if (!isPasswordCorrect)
      throw new UserInputError("Invalid Credentials", {
        errors: { password: "Password Incorrect" },
      });

    const token = generateToken(user);

    return {
      id: user._id,
      username: user.username,
      email: user.email,
      token,
    };
  },
};

module.exports = UserMutations;
