"use strict";

var _ = require("lodash");
var clc = require("cli-color");

var OlympusError = require("./error");

/**
 * Tries to determine the correct app name for commands that
 * only require an app name. Uses passed in firebase option
 * first, then falls back to firebase.json.
 * @param {Object} options The command-line options object
 * @param {boolean} allowNull Whether or not the firebase flag
 * is required
 * @returns {String} The firebase name
 */
module.exports = function(options, allowNull) {
  if (!options.project && !allowNull) {
    var aliases = _.get(options, "rc.projects", {});
    var aliasCount = _.size(aliases);

    if (aliasCount === 0) {
      throw new OlympusError(
        "No project active. Run with " +
          clc.bold("--project <projectId>") +
          " or define an alias by\nrunning " +
          clc.bold("firebase use --add"),
        {
          exit: 1,
        }
      );
    } else {
      var aliasList = _.map(aliases, function(projectId, aname) {
        return "  " + aname + " (" + projectId + ")";
      }).join("\n");

      throw new OlympusError(
        "No project active, but project aliases are available.\n\nRun " +
          clc.bold("firebase use <alias>") +
          " with one of these options:\n\n" +
          aliasList
      );
    }
  }
  return options.project;
};