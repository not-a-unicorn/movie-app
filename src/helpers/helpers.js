//@Theepan Thevathasan
//Helper functions

import { readFileSync } from "fs";
require("dotenv").config();

// moment.js is a handy library for displaying dates. We need this in our templates to display things like "Posted 5 minutes ago"
// exports.moment = require('moment');

// Making a static map is really long - this is a handy helper function to make one
// exports.staticMap = ([lng, lat]) =>
//   `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=14&size=800x150&key=${
//     process.env.MAP_KEY
//   }&markers=${lat},${lng}&scale=2`;

// inserting an SVG
export function icon(name) {
  return readFileSync(`./public/images/icons/${name}.svg`);
}

export const siteName = process.env.SITE_NAME || `Indian Movies`;

export const menu = [
  { slug: "/stores", title: "Stores", icon: "store" },
  { slug: "/tags", title: "Tags", icon: "tag" },
  { slug: "/top", title: "Top", icon: "top" },
  { slug: "/add", title: "Add", icon: "add" },
  { slug: "/map", title: "Map", icon: "map" }
];

// export function () removeLastComma(strng){
//   var n=strng.lastIndexOf(",");
//   var a=strng.substring(0,n)
//   return a;
// }

export function stripTrailingCommas(_string) {
  return _string.replace(/,\s*$/, "");
}

export function isDevelopmentMode() {
  return getAppMode() === "DEV";
}
export function getAppMode() {
  const appMode = process.env.NODE_ENV.toLowerCase();
  switch (true) {
    case !appMode:
      console.log(
        "!!!!! Application mode not defined in .env file / web server"
      );
      return "Undefined";
      break;

    case appMode == "production":
      return "PROD";
      break;
    case appMode == "development":
      return "DEV";
  }
}
