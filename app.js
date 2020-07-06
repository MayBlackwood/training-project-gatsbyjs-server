const bodyParser = require("body-parser");
const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const cors = require("cors");

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())
app.listen(port, () => console.log("Backend server live on " + port));

app.post("/contact-us", (req, res) => {
  console.log(req.body);
  res.send({ message: "We did it!" });
});
