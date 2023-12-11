const nodemailer = require("nodemailer");

exports.createEmail = (req, res) => {
  var transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    //
    auth: {
      user: "thuyhanguyen973@gmail.com",
      pass: "ucav qzvz mvkx apni",
    },
    tls: {
      //do not fail on invalid certs
      rejectUnauthorized: false,
    },
  });
  var content = "";
  content += `
            <div style="padding: 10px; background-color: #003375">
            <div style="padding: 10px; background-color: white;">
                <h4 style="color: #0085ff">Gửi mail với nodemailer và express</h4>
                <span style="color: black">Đây là mail test</span>
            </div>
        </div>`;
  var mainOptions = {
    from: "thuyhanguyen973@gmail.com",
    to: req.body.email,
    subject: "Test Nodemailer",
    text: "Your text is here",
    html: content,
  };

  transporter.sendMail(mainOptions, function (err, info) {
    if (err) {
      res.status(500).send({ message: err });
    } else {
      res.status(200).send("Message sent: " + info.response);
    }
  });
};
