const express = require("express");
const fs = require("fs");
const router = express.Router();

const dataPath = "./data/events.json";
const validate = require("../validations/validations.js");

router.get("/", (req, res) => {
  fs.readFile(dataPath, (err, data) => {
    if (err) console.error(err);

    res.status(200).send(data);
  });
});

router.post("/", (req, res) => {
  const isValid = validate(req.body);
  if (!isValid) {
    res.status(400).send({ message: "Event is invalid" });
    return;
  }
  fs.readFile(dataPath, (err, data) => {
    if (err) console.error(err);
    const file = JSON.parse(data.toString("utf-8"));
    const length = file.length;
    const event = req.body;
    if (!length) id = 1;
    else id = file[length - 1].id + 1;
    event.id = id;
    file.push(event);

    fs.writeFile(dataPath, JSON.stringify(file), (err) => {
      if (err) console.error(err);
      res.status(200).send(event);
    });
  });
});

router.get("/:id", (req, res) => {
  fs.readFile(dataPath, (err, data) => {
    if (err) console.error(err);
    const file = JSON.parse(data.toString("utf-8"));
    file.forEach((element) => {
      if (element.id == req.params.id) {
        res.status(200).send(element);
        return;
      }
    });
  });
});

router.put("/:id", (req, res) => {
  fs.readFile(dataPath, (err, data) => {
    if (err) console.error(err);
    const file = JSON.parse(data.toString("utf-8"));
    const id = Number(req.params.id);
    const index = file.findIndex((el) => el.id === id);
    if (index === -1) {
      res.status(404).send({ message: "Post not found" });
    }
    req.body.id = id;
    file[index] = req.body;
    fs.writeFile(dataPath, JSON.stringify(file), (err) => {
      if (err) console.error(err);
      res.status(200).send(file);
    });
  });
});

router.delete("/:id", (req, res) => {
  fs.readFile(dataPath, (err, data) => {
    if (err) console.error(err);
    const file = JSON.parse(data.toString("utf-8"));
    const id = Number(req.params.id);
    const index = file.findIndex((el) => el.id === id);
    if (index === -1) res.status(404).send({ message: "Event not found" });
    file.splice(index, 1);
    fs.writeFile(dataPath, JSON.stringify(file), (err) => {
      if (err) console.error(err);
      res
        .status(200)
        .send({ message: `Event with id-${id} is successfully deleated` });
    });
  });
});

module.exports = router;
