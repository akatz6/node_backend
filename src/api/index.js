const { router, bcrypt, prisma, jwt } = require("../common/common");
const axios = require("axios");

router.get("/", async (req, res) => {
  res.send("In auth");
});

router.get("/anime", async (req, res) => {
  const response = await axios.get("https://api.jikan.moe/v4/anime/50");
  console.log(response.data);
  res.json(response.data);
  return;
});

module.exports = router;
