const Replicate = require("replicate");
const replicate = new Replicate({
  auth: "r8_Jsl94SnX5KIUygbPJKRBEgvdOpQo3Xh449Ebq",
});
const express = require("express");
const app = express();
const axios = require("axios");
app.get("/api", async (req , res) => {
  const x = req.query.msg
  try {
  const output = await replicate.run(
    "methexis-inc/img2prompt:50adaf2d3ad20a6f911a8a9e3ccf777b263b8596fbd2c8fc26e8888f8a0edbb5",
    {
      input: {
        image: x
      }
    }
  );
  const translationResponse = await axios.get(`https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=ar&dt=t&q=${encodeURIComponent(output)}`);
  const k = translationResponse.data[0][0][0];
  console.log(output);
  res.json({ msg: k})
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
})
app.listen(3000 ,() => {
  console.log("is litening")
})