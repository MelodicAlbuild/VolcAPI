var express = require("express");
var app = express();

var keys = require("./keys.json");

var apijson = require("./data/api.json");

var pejson = require("./data/volcanoids/pe/pe.json");

app.use(express.json());

app.use("/personal", express.static("data/personal"));

app.get("/ping", (req, res) => {
  res.status(204);
});

app.get("/", (req, res) => {
  res.status(200);
  res.json(apijson);
});

app.get("/volcanoids/mods/pe", (req, res, next) => {
  if (req.headers.authorization != null) {
    let chopped = req.headers.authorization.slice(7);
    let buff = Buffer.from(chopped, "base64");
    let auth = buff.toString("ascii");

    if (keys.volc.mods.pe.includes(auth)) {
      res.status(200);
      res.json(pejson);
    } else {
      res.sendStatus(403);
    }
  } else {
    res.sendStatus(401);
  }
});

app.listen(3000, () => {
  console.log("Server Running on Port 3000");
});
