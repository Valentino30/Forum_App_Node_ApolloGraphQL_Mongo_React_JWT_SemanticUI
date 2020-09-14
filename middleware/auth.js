const { verify } = require("jsonwebtoken");
const { AuthenticationError } = require("apollo-server");

const auth = (req) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split("Bearer ")[1];
    if (token) {
      try {
        const user = verify(token, process.env.JWT_SECRET);
        return user;
      } catch (error) {
        throw new AuthenticationError("Invalid token");
      }
    } else {
      throw new Error(
        "Token must be provided and have 'Bearer <token>' format"
      );
    }
  } else {
    throw new Error("Auth header must be provided");
  }
};

module.exports = auth;
