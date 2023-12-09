const { Router } = require("express");
const TikTokNoWatermark = require("tiktok-no-watermark-api");

const router = Router();

const webUrlPattern =
  /^(https?:\/\/)?(www\.)?tiktok\.com\/@([\w.]+)\/video\/(\d+)/;
const shortLinkPattern = /^(https?:\/\/)?(vt|vm)\.tiktok\.com\/[\w-]+\/?$/;

router.get("/", (req, res) => {
  const message = req.flash("message");
  res.render("index", { message });
});

router.post("/download", async (req, res) => {
  const { url } = req.body;
  try {
    if (!webUrlPattern.test(url) && !shortLinkPattern.test(url)) {
      req.flash("message", "Invalid TikTok URL");
      return res.redirect("/");
    }
    const data = await TikTokNoWatermark(url, true);
    res.render("download", { data: data.result });
  } catch (error) {
    req.flash("message", "Video not found");
    res.redirect("/");
  }
});

router.use((req, res, next) => {
  res.redirect("/");
});

module.exports = router;
