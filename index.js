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
  watchChanges();
}

/*
 * NODEMON LITE
 */
async function watchChanges() {
  const dir = await fs.promises.opendir("src");
  await walkRecursive(dir);
}

async function walkRecursive(dir) {
  for await (const dirent of dir) {
    if (dirent.isFile()) {
      watchFile(dirent.name, dir.path);
    } else {
      const recDir = await fs.promises.opendir(`${dir.path}/${dirent.name}`);
      walkRecursive(recDir);
    }
  }
}

function watchFile(name, path) {
  fs.watch(`${path}/${name}`, (eventType, fileName) => {
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
