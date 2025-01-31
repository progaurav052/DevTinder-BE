const AdminAuth = (req, res, next) => {
  console.log("Admin Auth started");
  const token = "xyz";
  const isAuthorized = token === "xyz";
  if (!isAuthorized) {
    res.status(401).send("Wrong admin credentials");
  } else {
    next();
  }
};

const UserAuth = (req,res,next) =>{
  console.log("User Auth started");
  const token = "xyz";
  const isAuthorized = token === "xyz";
  if (!isAuthorized) {
    res.status(401).send("Wrong User credentials");
  } else {
    next();
  }
}

module.exports = {
  AdminAuth,
  UserAuth,
};
