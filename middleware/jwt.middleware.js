const { expressjwt: jwt } = require("express-jwt");

// Instantiate the JWT token validation middleware
// this is going to give us access to the payload of the token
// it returns by default a middleware function that we can use in our routes
// we can access the payload of the token through `req.payload`
// if the token is valid and present, the middleware will pass the request to the next middleware including the payload
const isAuthenticated = jwt({
  secret: process.env.TOKEN_SECRET,
  algorithms: ["HS256"],
  requestProperty: "payload",
  getToken: getTokenFromHeaders,
});

// Function used to extract the JWT token from the request's 'Authorization' Headers
function getTokenFromHeaders(req) {
  // Check if the token is available on the request Headers
  if (
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "Bearer"
  ) {
    // Get the encoded token string and return it
    const token = req.headers.authorization.split(" ")[1];
    return token;
  }

  return null;
}

// Export the middleware so that we can use it to create protected routes
module.exports = {
  isAuthenticated,
};
