// https://www.digitalocean.com/community/tutorials/how-to-launch-child-processes-in-node-js
const express = require("express");
const { fork } = require("child_process");
const app = express();
const port = 8888;
const fs = require("fs");
const events = require("events");

const csvEventEmitter = new events.EventEmitter();

function csvEventHandler(tenantId, entityId, postings) {
  console.log(`fetch from db for tenantId ${tenantId}, entityId: ${entityId}`);
  console.log({ postings });
  console.log("generate csv");
  console.log("copy to s3");
  console.log("send message to qap queue");
}

csvEventEmitter.on("csvGen", csvEventHandler);

app.get("/api", (req, res) => {
  const child = fork(__dirname + "/child-process/slowFunction4.js");
  child.on("message", (message) => {
    console.log("message came back from child process");
  });

  res.status(200).send("Hello World!");
  child.send("START");
  console.log("from /api");
});

app.get("/api2", (req, res) => {
  csvEventEmitter.emit("csvGen", 1, 2, [1, 2, 3]);
  res.status(200).send("event emitter Hello World!");
  console.log("from /api2");
});

app.get("/upload", async (req, res) => {
  res.status(200).send();
});

app.listen(port, () => {
  console.log(`%cExample app listening on port ${port}`, "color:green");
});
