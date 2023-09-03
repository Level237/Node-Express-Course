"use strict";

var express = require('express');

require('./db/mongoose');

var userRouter = require('./routers/User');

var taskRouter = require('./routers/Task');

var app = express();
var port = process.env.PORT || 3000;
app.use(express.json());
app.use(userRouter);
app.use(taskRouter);
app.listen(port, function () {
  console.log('Server is up in port ' + port);
});

var bcrypt = require('bcryptjs');

var myFunction = function myFunction() {
  var password, hashedPassword;
  return regeneratorRuntime.async(function myFunction$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          password = "levelVertos";
          _context.next = 3;
          return regeneratorRuntime.awrap(bcrypt.hash(password, 10));

        case 3:
          hashedPassword = _context.sent;
          console.log(password);
          console.log(hashedPassword);

        case 6:
        case "end":
          return _context.stop();
      }
    }
  });
};

myFunction();