const express = require("express");
const app = express();
const fs = require("fs");
const bodyParser = require("body-parser");
const clients = require("./models/data.json");

const cors = require("cors"); /// npm install cors --save
app.use(express.json());
app.use(cors());
app.use(express.static(__dirname));

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.header("Content-Type", "application/json");
  res.send("hello");
});

app.get("/clients", (req, res) => {
  //res.header("Content-Type", "application/json");
  res.send(JSON.stringify(clients));
});

app.post("/post", (req, res) => {
  //if(!req.body.id|| !req.body.name){res.status(400).send('invalid info')}
  fs.readFile("./models/data.json", "utf8", function (err, data) {
    if (err) {
      console.log(err);
    } else {
      const file = JSON.parse(data);
      const client = {
        Name: req.body.Name,
        Email: req.body.Email,
        ID: req.body.ID,
        Phone: req.body.Phone,
        IP: req.body.IP,
      };
      console.log(client);
      file.push(client);
      res.send(client);
      fs.writeFile(
        "./models/data.json",
        JSON.stringify(file, null, 2),
        "utf8",
        function (err) {
          if (err) {
            console.log(err);
          } else {
            //Everything went OK!
          }
        }
      );
    }
  });
});

app.delete("/delete", (req, res) => {
  ///delete a client  - need to be added with splice
  fs.readFile("./models/data.json", "utf8", function (err, data) {
    console.log("id: test : " + req.body.ID);

    if (err) {
      console.log(err);
    }
    var file = JSON.parse(data);
    let findEntry = file.find((entry) => entry.ID === req.body.ID);
    if (!findEntry) {
      res.status(400).send("No such client id");
    }
    console.log(findEntry);
    const removeClient = (criteria, clients) =>
      clients.splice(clients.indexOf(clients.find(criteria)), 1);
    if (findEntry) removeClient(({ ID }) => ID === findEntry.ID, file);
    console.log("unlinked");
    res.status(200).send(" client deleted successfully!");
    fs.writeFile(
      "./models/data.json",
      JSON.stringify(file, null, 4),
      "utf-8",
      function (err) {
        if (err) throw err;
        console.log("Done!");
      }
    );
  });
});
const port = process.env.PORT || 9000;
app.listen(port, () => console.log(`Listening on port ${port} `));
