const path = require("path");
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const { Questionnaire } = require("./models");

// Move to Secret File and use env variable
let secret = {
  DATABASE_URL: 'mongodb://coding:challenge@ds161306.mlab.com:61306/coding-challenge'
};

const app = express();

app.use(bodyParser.json());

app.get("/api/questionnaire", (req, res) => {
  Questionnaire.find()
    .then(questions => {
      res.json(questions);
    })
    .catch(err => {
      console.error(err);
    });
});

app.post("/api/questionnaire", (req, res) => {
  return Questionnaire.find({email: req.body.email}).then(questions => {
    if(questions.length > 0) {
      return res.status(409).json({data: 'Email Already Exist'})
    } else {
      return Questionnaire.create(req.body).then(() => {
        return res.status(200).json({data: 'Survey Submitted Successfully'})
      });
    }
  })
});

// Serve the built client
app.use(express.static(path.resolve(__dirname, "../client/build")));

// Unhandled requests which aren't for the API should serve index.html so
// client-side routing using browserHistory can function
app.get(/^(?!\/api(\/|$))/, (req, res) => {
  const index = path.resolve(__dirname, "../client/build", "index.html");
  res.sendFile(index);
});

let server;
mongoose.Promise = Promise;

function runServer(port = 4000) {
  return new Promise((resolve, reject) => {
    mongoose.connect(secret.DATABASE_URL, {
        useMongoClient: true,
        promiseLibrary: global.Promise}, err => {
      if (err) {
        return reject(err);
      }

      server = app
        .listen(port, () => {
          console.log(`Your app is listening on ${port}`);
          resolve();
        })
        .on("error", reject);
    });
  });
}

function closeServer() {
  return new Promise((resolve, reject) => {
    server.close(err => {
      if (err) {
        return reject(err);
      }
      resolve();
    });
  });
}

if (require.main === module) {
  runServer();
}

module.exports = {
  app,
  runServer,
  closeServer
};
