"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sortDates = void 0;
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/esm/slicedToArray"));
var sortDates = function sortDates(a, b, sortKey, sortOrder) {
  var dateRegex = /^\d{2}([./-])\d{2}\1\d{4}$/;
  var isDate = dateRegex.test(a[sortKey]) && dateRegex.test(b[sortKey]);
  if (isDate) {
    var delimiter = dateRegex.exec(a[sortKey])[1];
    var _a$sortKey$split$map = a[sortKey].split(delimiter).map(function (x) {
        return parseInt(x, 10);
      }),
      _a$sortKey$split$map2 = (0, _slicedToArray2.default)(_a$sortKey$split$map, 3),
      dayA = _a$sortKey$split$map2[0],
      monthA = _a$sortKey$split$map2[1],
      yearA = _a$sortKey$split$map2[2];
    var _b$sortKey$split$map = b[sortKey].split(delimiter).map(function (x) {
        return parseInt(x, 10);
      }),
      _b$sortKey$split$map2 = (0, _slicedToArray2.default)(_b$sortKey$split$map, 3),
      dayB = _b$sortKey$split$map2[0],
      monthB = _b$sortKey$split$map2[1],
      yearB = _b$sortKey$split$map2[2];
    var dateA = new Date(yearA, monthA - 1, dayA);
    var dateB = new Date(yearB, monthB - 1, dayB);
    if (dateA < dateB) return sortOrder === 'asc' ? -1 : 1;
    if (dateA > dateB) return sortOrder === 'asc' ? 1 : -1;
    return 0;
  } else {
    if (a[sortKey] < b[sortKey]) return sortOrder === 'asc' ? -1 : 1;
    if (a[sortKey] > b[sortKey]) return sortOrder === 'asc' ? 1 : -1;
    return 0;
  }
};
exports.sortDates = sortDates;