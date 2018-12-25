"use strict";

var OlympusError = require("./error");
var cjson = require("cjson");

module.exports = function(path) {
  try {
    return cjson.load(path);
  } catch (e) {
    if (e.code === "ENOENT") {
      throw new OlympusError("File " + path + " does not exist", { exit: 1 });
    }
    throw new OlympusError("Parse Error in " + path + ":\n\n" + e.message);
  }
};