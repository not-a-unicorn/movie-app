"use strict";

var UserSchema = require("./test");

var user = new UserSchema({ name: { firstName: "Theepan", lastName: "Thev" } });
//var user = new UserSchema({ name: { firstName: "Theepan", lastName: "Thev" } });
console.log(user);