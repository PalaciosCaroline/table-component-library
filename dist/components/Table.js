"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Table;
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/esm/slicedToArray"));
var _react = _interopRequireWildcard(require("react"));
var _sortDates = require("./sortDates");
var _fa = require("react-icons/fa");
require("./table.css");
function Table(_ref) {
  var data = _ref.data,
    columns = _ref.columns;
  var _useState = (0, _react.useState)(null),
    _useState2 = (0, _slicedToArray2.default)(_useState, 2),
    sortKey = _useState2[0],
    setSortKey = _useState2[1];
  var _useState3 = (0, _react.useState)('asc'),
    _useState4 = (0, _slicedToArray2.default)(_useState3, 2),
    sortOrder = _useState4[0],
    setSortOrder = _useState4[1];
  var handleSort = function handleSort(key, sortOrder) {
    setSortKey(key);
    setSortOrder(sortOrder);
  };
  var renderHeader = function renderHeader() {
    return /*#__PURE__*/_react.default.createElement("thead", {
      className: "thead"
    }, /*#__PURE__*/_react.default.createElement("tr", {
      className: "tr"
    }, columnData.map(function (_ref2) {
      var label = _ref2.label,
        property = _ref2.property,
        selectedBtnSort = _ref2.selectedBtnSort;
      return /*#__PURE__*/_react.default.createElement("th", {
        key: property,
        className: "th"
      }, /*#__PURE__*/_react.default.createElement("div", {
        style: {
          display: 'flex',
          alignItems: 'center'
        }
      }, /*#__PURE__*/_react.default.createElement("p", {
        className: "label"
      }, label), /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("button", {
        type: "button",
        onClick: function onClick() {
          return handleSort(property, 'asc');
        },
        className: "btnForSort ".concat(selectedBtnSort && sortOrder === 'asc' ? 'selectedBtnSort' : '')
      }, /*#__PURE__*/_react.default.createElement(_fa.FaSortUp, {
        className: "btnSortIcon"
      })), /*#__PURE__*/_react.default.createElement("button", {
        type: "button",
        onClick: function onClick() {
          return handleSort(property, 'desc');
        },
        className: "btnForSort ".concat(selectedBtnSort && sortOrder === 'desc' ? 'selectedBtnSort' : '')
      }, /*#__PURE__*/_react.default.createElement(_fa.FaSortDown, {
        className: "btnSortIcon"
      })))));
    })));
  };
  var renderBody = function renderBody() {
    var sortedData = data;
    if (sortKey !== null) {
      sortedData = data.slice().sort(function (a, b) {
        if (typeof sortedData[0][sortKey] === 'string' && sortedData[0][sortKey].match(/^\d{2}([./-])\d{2}\1\d{4}$/)) {
          return (0, _sortDates.sortDates)(a, b, sortKey, sortOrder);
        } else {
          if (a[sortKey] < b[sortKey]) return sortOrder === 'asc' ? -1 : 1;
          if (a[sortKey] > b[sortKey]) return sortOrder === 'asc' ? 1 : -1;
          return 0;
        }
      });
    }
    return /*#__PURE__*/_react.default.createElement("tbody", {
      className: "tbody"
    }, sortedData.map(function (item, index) {
      return /*#__PURE__*/_react.default.createElement("tr", {
        key: index,
        className: "tr"
      }, columns.map(function (_ref3) {
        var property = _ref3.property;
        return /*#__PURE__*/_react.default.createElement("td", {
          key: "cell-".concat(index, "-").concat(property),
          className: "td"
        }, item[property]);
      }));
    }));
  };
  var columnData = columns.map(function (_ref4) {
    var label = _ref4.label,
      property = _ref4.property;
    return {
      label: label,
      property: property,
      selectedBtnSort: sortKey === property
    };
  });
  return /*#__PURE__*/_react.default.createElement("table", {
    className: "table"
  }, renderHeader(columnData), renderBody());
}