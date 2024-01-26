const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");

const app = express();
const port = 3000;
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.get("/", (req, res) => {
  res.render("index.ejs", { data: "API Response." });
});
app.post("/", async function (req, res) {
    try {
      var date = req.body.date;
      console.log(date);
      const url =
       ""+date;
      const response = await axios.get(url);
      const result = response.data;
      res.render("nasa.ejs", {
        data : result,
      });
    } catch (error) {
      console.error("Failed to make request:", error.message);
      res.render("nasa.ejs", {
        error: "no activities that match",
      });
  }
});




app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
