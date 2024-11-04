const { router } = require("../common/common");
const axios = require("axios");
const {
  login,
  register,
  users,
  user,
  userGet,
  userDelete
} = require("../controllers/authController");

function middleware(req, res, next) {
  if (req.headers?.authorization?.split(" ")[1]) {
    next();
  } else {
    res.send("Plead log in again");
  }
}

router.post("/login", login);
router.get("/users", middleware, users);
router.get("/user/:id", middleware, userGet);
router.delete("/user/:id", middleware, userDelete)
router.put("/user/:id", middleware, user);
router.post("/register", register);

module.exports = router;
