"use strict";

var _ui = require("@grafana/ui");

var JS = _interopRequireWildcard(require("./external/YourJS.min"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

var GRAFANA_FORMATS = (0, _ui.getValueFormats)().map(function (item) {
  if (item.text === 'Date & Time') {
    item.submenu.unshift({
      text: 'Custom Format',
      value: 'dateTimeYourJS'
    });
  }

  return item;
});

function getGrafanaFormats() {
  return GRAFANA_FORMATS;
}

function getGrafanaFormat(formatName) {
  return formatName === 'dateTimeYourJS' ? function (date, format) {
    return JS.formatDate(date, format || '');
  } : (0, _ui.getValueFormat)(formatName);
}

module.exports = {
  getValueFormats: getGrafanaFormats,
  getValueFormat: getGrafanaFormat
};
//# sourceMappingURL=format-values.js.map
