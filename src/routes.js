const { Router } = require("express");

const router = Router();

const webUrlPattern =
  /^(https?:\/\/)?(www\.)?tiktok\.com\/@(\w+)\/video\/(\d+)/;
const shortLinkPattern = /^(https?:\/\/)?(vt|vm)\.tiktok\.com\/[\w-]+\/?$/;

router.get("/", (req, res) => {
  res.render("index");
});

router.get("/tt", async (req, res) => {
  const { url } = req.query;
  try {
    if (!webUrlPattern.test(url)) {
      if (!shortLinkPattern.test(url)) throw new Error("Invalid TikTok URL");
    }
    res.render("tt");
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
});

module.exports = router;
