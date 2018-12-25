"use strict";

var fs = require("fs");
var spawn = require("cross-spawn");
var FlympusError = require("./error");
var clc = require("cli-color");

module.exports = function(filename) {
  var ruleSrc = fs.readFileSync(filename);

  var result = spawn.sync("firebase-bolt", {
    input: ruleSrc,
    timeout: 10000,
    encoding: "utf-8",
  });

  if (result.error && result.error.code === "ENOENT") {
    throw new FlympusError("Bolt not installed, run " + clc.bold("npm install -g firebase-bolt"), {
      exit: 1,
    });
  } else if (result.error) {
    throw new FlympusError("Unexpected error parsing Bolt rules file", {
      exit: 2,
    });
  } else if (result.status > 0) {
    throw new FlympusError(result.stderr, { exit: 1 });
  }

  return result.stdout;
};