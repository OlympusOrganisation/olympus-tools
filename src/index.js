"use strict";

const program = require('commander');
const pkg = require("../package.json");
const logger = require("./logger");
 
program.version(pkg.version)
 
var client = {};
client.cli = program;
client.logger = logger;
client.errorOut = function(error, status) {
  require("./errorOut")(client, error, status);
};
client.getCommand = function(name) {
  for (var i = 0; i < client.cli.commands.length; i++) {
    if (client.cli.commands[i]._name === name) {
      return client.cli.commands[i];
    }
  }
  return null;
};

require("./commands")(client);


var commandNames = program.commands.map(function(cmd) {
  return cmd._name;
});

program.action(function(cmd, cmd2) {
  logger.error("Error:" +cmd + "is not a Firebase command");
  process.exit(1);
});

program.parse(process.argv);