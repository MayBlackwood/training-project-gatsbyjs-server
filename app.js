const bodyParser = require("body-parser");
const express = require("express");
const nodemailer = require("nodemailer");
const app = express();
const port = process.env.PORT || 5000;
const cors = require("cors");
require("dotenv").config();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.listen(port, () => console.log("Backend server live on " + port));

const contactAddress = "lorelei.blackwood13@gmail.com";

const mailer = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.GMAIL_ADDRESS,
    pass: process.env.GMAIL_PASSWORD,
  },
});

app.post("/contact-us", function (req, res) {
  const {
    body: { email, message, name },
  } = req;

  mailer.sendMail(
    {
      from: email,
      to: [contactAddress],
      subject: "Contact Us - Project",
      html: `${message} \n - ${name}` || "[No message]",
    },
    function (err, info) {
      if (err) return res.status(500).send(err);
      res.json({ success: true });
    }
  );
});
