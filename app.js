const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({
  extended: true
}));

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/signup.html");
});

app.post("/", function(req, res) {
  const API_KEY = "be470aab7df58f831a4ec985d4825386-us1";
  const LIST_ID = "69987dd91e";

  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const email = req.body.email;
  const data = {
    members: [
        {
            email_address: email,
            status: "subscribed",
            merge_fields: {
                FNAME: firstName,
                LNAME: lastName
            }
        }
    ]
};

  const url = "https://us14.api.mailchimp.com/3.0/lists/" + LIST_ID;
  const options = {
    method: "POST",
    auth: "Chaitra_T:" + API_KEY
  }

  const request = https.request(url, options, function(response) {
    if(response.statusCode === 200) {
      res.sendFile(__dirname + "/success.html");
    } else {
      res.sendFile(__dirname + "/failure.html");
    }
    response.on("data", function(data) {
      // console.log(JSON.parse(data));
    })
  });

  request.write(JSON.stringify(data));
  request.end();
});

app.post("/failure", function(req, res) {
  res.redirect("/");
});

app.listen(3000, function() {
  console.log("Server listening at port: 3000");
})
