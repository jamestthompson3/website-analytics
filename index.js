"use strict";

const fs = require("fs");
const cluster = require("cluster");

/*
 * GET IT ALL RUNNING
 */
if (cluster.isMaster) {
  cluster.setupMaster({
    exec: "src/server.js"
  });
  cluster.fork();
  /*
   * NODEMON LITE
   */
  fs.watch("src", (eventType, fileName) => {
    if (fileName !== "index.js" && eventType === "change") {
      for (const id in cluster.workers) {
        const worker = cluster.workers[id];
        worker.kill("SIGTERM");
      }
      cluster.setupMaster({
        exec: "src/server.js"
      });
      cluster.fork();
    }
  });
}
