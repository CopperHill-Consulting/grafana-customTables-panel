"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DataTablePanelCtrl = void 0;

var _sdk = require("app/plugins/sdk");

var _lodash = _interopRequireDefault(require("lodash"));

var JS = _interopRequireWildcard(require("./external/YourJS.min"));

require("./external/datatables/js/jquery.dataTables.min");

require("./external/datatables/js/dataTables.fixedHeader.min");

require("./external/datatables/css/jquery.dataTables.min.css!");

require("./external/datatables/css/fixedHeader.dataTables.min.css!");

require("./external/datatables-grafana-fix.css!");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var DEFAULT_PSEUDO_CSS = {
  ".theme-dark &": {
    "color": "white"
  },
  "table.dataTable tbody tr": {
    "&:hover": {
      "background-image": "linear-gradient(0deg, rgba(128,128,128,0.05), rgba(128,128,128,0.05))"
    },
    "&, &.even, &.odd": {
      "background-color": "transparent",
      ">.sorting_1, >.sorting_2, >.sorting_3": {
        "background-color": "transparent"
      },
      "td": {
        "border-color": "transparent"
      }
    },
    "&.odd": {
      "background-color": "rgba(128,128,128,0.2)"
    },
    "&.even": {
      "background-color": "rgba(128,128,128,0.1)"
    }
  }
};
var CONTENT_RULE_TYPES = [{
  id: 'FILTER',
  text: 'Filter by exact value or RegExp'
}, {
  id: 'RANGE',
  text: "Match a range of values"
}, {
  id: 'NULL',
  text: "Is NULL"
}];
var CONTENT_RULE_CLASS_LEVELS = [{
  id: 'CELL',
  text: "Only the cell"
}, {
  id: 'ROW',
  text: 'Entire row'
}];
var CONTENT_RULE_MIN_VALUE_OPS = [{
  id: '>=',
  text: "\u2265 (greater than or equal to)"
}, {
  id: '>',
  text: '> (greater than)'
}];
var CONTENT_RULE_MAX_VALUE_OPS = [{
  id: '<',
  text: '< (less than)'
}, {
  id: '<=',
  text: "\u2264 (less than or equal to)"
}];
var CONTENT_RULE_EXACT_NUM_OPS = [{
  id: '==',
  text: '= (equals)'
}, {
  id: '!=',
  text: "\u2260 (doesn't)"
}];
var DEFAULT_PANEL_SETTINGS = {
  pseudoCSS: JSON.stringify(DEFAULT_PSEUDO_CSS, null, 2),
  columnDefs: [],
  isFullWidth: true,
  allowOrdering: true,
  allowSearching: true,
  allowLengthChange: true
};

function parseRegExp(strPattern) {
  var parts = /^\/(.+)\/(\w*)$/.exec(strPattern);
  return parts ? new RegExp(parts[1], parts[2]) : new RegExp('^' + _lodash.default.escapeRegExp(strPattern) + '$', 'i');
}

function setContent(jElem, ctrl) {
  var data = ctrl.data;
  var panel = ctrl.panel;
  var height = jElem.height();
  var tableOpts = {
    _: 'table',
    cls: 'display',
    style: {}
  };

  if (panel.isFullWidth) {
    tableOpts.style.width = '100%';
  }

  var table = JS.dom(tableOpts);
  var jTable = jQuery(table).appendTo(jElem.html(''));
  var options = {
    data: data.rows,
    columns: data.columnTexts.map(function (title) {
      var result = {
        title: title
      };

      for (var colDefs = panel.columnDefs, i = 0, l = colDefs.length; i < l; i++) {
        var colDef = colDefs[i];
        var filter = parseRegExp(colDef.filter);

        if (filter.test(title)) {
          if (colDef.display) {
            result.title = title.replace(filter, colDef.display);
          }

          if (colDef.isVisible) {
            if (colDef.width) {
              result.width = colDef.width;
            }

            if (colDef.classNames) {
              result.className = colDef.classNames;
            }

            result.orderable = colDef.isOrderable;
            result.searchable = colDef.isSearchable;
          } else {
            result.visible = colDef.isVisible;
          }

          break;
        }
      }

      return result;
    }),
    scrollY: height,
    scrollX: true,
    scrollCollapse: true,
    ordering: panel.allowOrdering,
    searching: panel.allowSearching,
    lengthChange: panel.allowLengthChange,
    order: [],
    pageLength: 50
  };
  var dataTable = jTable.DataTable(options);
  jElem.find('.dataTables_scrollHeadInner').css('margin', '0 auto');
  fixDataTableSize(jElem.find('.dataTables_wrapper'), height);
  jElem.each(function (i, elem) {
    elem.className = elem.className.replace(/\b_\d+\b/g, ' ').replace(/\s+/g, ' ').trim();
    elem.appendChild(JS.css(JSON.parse(panel.pseudoCSS), elem));
  });
  console.log({
    data: data,
    height: height,
    ctrl: ctrl,
    jElem: jElem,
    jTable: jTable,
    dataTable: dataTable,
    options: options,
    table: table
  });
}

function fixDataTableSize(jWrap, fullHeight) {
  var wrapHeight = jWrap.height();
  var jScrollBody = jWrap.find('.dataTables_scrollBody');
  var scrollHeight = jScrollBody.height();
  var nonScrollHeight = wrapHeight - scrollHeight;
  jScrollBody.css('max-height', fullHeight - nonScrollHeight);
}

function renderNow(e, jElem) {
  var error,
      isValid = false,
      ctrl = this,
      data = ctrl.data,
      jContent = jElem.find('.panel-content').css('position', 'relative').html(''),
      elemContent = jContent[0];

  if (data && data.rows.length) {
    if (data.type === 'table') {
      try {
        setContent(jContent, ctrl);
        isValid = true;
      } catch (err) {
        error = err;
      }
    }
  }

  if (!isValid) {
    var msg = 'No data' + (error ? ':  \r\n' + error.message : '.');
    var elemMsg = JS.dom({
      _: 'div',
      style: {
        display: 'flex',
        alignItems: 'center',
        textAlign: 'center',
        height: '100%'
      },
      $: [{
        _: 'div',
        cls: 'alert alert-error',
        style: {
          margin: '0px auto'
        },
        text: msg
      }]
    });
    jContent.html('').append(elemMsg);
  }
}

function parseData(columns, rows) {
  return {
    columns: columns,
    rows: rows,
    columnTexts: columns.map(function (col) {
      return 'string' === typeof col ? col : col.text;
    })
  };
}

var DataTablePanelCtrl =
/*#__PURE__*/
function (_MetricsPanelCtrl) {
  _inherits(DataTablePanelCtrl, _MetricsPanelCtrl);

  function DataTablePanelCtrl($scope, $injector, $rootScope) {
    var _this;

    _classCallCheck(this, DataTablePanelCtrl);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(DataTablePanelCtrl).call(this, $scope, $injector));
    _this.$rootScope = $rootScope;
    _this.data = null;

    _lodash.default.defaultsDeep(_this.panel, DEFAULT_PANEL_SETTINGS);

    _this.events.on('init-edit-mode', _this.onInitEditMode.bind(_assertThisInitialized(_this)));

    _this.events.on('data-received', _this.onDataReceived.bind(_assertThisInitialized(_this)));

    _this.events.on('data-snapshot-load', _this.onDataReceived.bind(_assertThisInitialized(_this)));

    _this.events.on('data-error', _this.onDataError.bind(_assertThisInitialized(_this)));

    return _this;
  }

  _createClass(DataTablePanelCtrl, [{
    key: "onInitEditMode",
    value: function onInitEditMode() {
      var path = 'public/plugins/copperhill-datatables-panel/partials/';
      this.addEditorTab('Options', "".concat(path, "editor.html"), 2);
      this.addEditorTab('Column Definitions', "".concat(path, "column-defs.html"), 3);
      this.addEditorTab('Styles', "".concat(path, "styles.html"), 4);
    }
  }, {
    key: "onDataError",
    value: function onDataError() {
      this.renderNow();
    }
  }, {
    key: "onDataReceived",
    value: function onDataReceived(dataList) {
      if (dataList && dataList.length) {
        var data = dataList[0];
        this.data = _lodash.default.extend(parseData(data.columns, data.rows), {
          isReal: true,
          type: data.type
        });
      } else {
        var EXTRA_COLS = 2;
        this.data = _lodash.default.extend(parseData([{
          text: "X"
        }, {
          text: "X * X"
        }, {
          text: "X + X"
        }].concat(_lodash.default.range(EXTRA_COLS).map(function (y) {
          return {
            text: "".concat(y, " / Math.random()")
          };
        })), _lodash.default.range(150).map(function (x) {
          return [x, x * x, x + x].concat(_lodash.default.range(EXTRA_COLS).map(function (y) {
            return y / Math.random();
          }));
        })), {
          isReal: false,
          type: 'table'
        });
      }

      this.renderNow();
    }
  }, {
    key: "onChangeCallback",
    value: function onChangeCallback(obj, key) {
      var _this2 = this;

      return function (newValue) {
        obj[key] = newValue;

        _this2.renderNow();
      };
    }
  }, {
    key: "getConstByName",
    value: function getConstByName(name) {
      if (/^[A-Z_][A-Z_0-9]*$/.test(name)) {
        return eval(name);
      }
    }
  }, {
    key: "addColumnDef",
    value: function addColumnDef() {
      this.panel.columnDefs.push({
        filter: '/[^]*/',
        display: '',
        width: '',
        classNames: '',
        isVisible: true,
        isOrderable: true,
        isSearchable: true,
        contentRules: []
      });
    }
  }, {
    key: "removeColumnDef",
    value: function removeColumnDef(columnDef) {
      var columnDefs = this.panel.columnDefs;
      columnDefs.splice(columnDefs.indexOf(columnDef), 1);
    }
  }, {
    key: "addColumnContentRule",
    value: function addColumnContentRule(columnDef) {
      columnDef.contentRules.push({
        type: CONTENT_RULE_TYPES[0].id,
        classNames: '',
        classLevel: CONTENT_RULE_CLASS_LEVELS[0].id,
        filter: '',
        negateCriteria: false,
        display: '',
        minValue: null,
        maxValue: null,
        minValueOp: null,
        maxValueOp: null,
        url: '',
        openNewWindow: true
      });
    }
  }, {
    key: "removeColumnContentRule",
    value: function removeColumnContentRule(contentRule, columnDef) {
      var contentRules = columnDef.contentRules;
      contentRules.splice(contentRules.indexOf(contentRule), 1);
    }
  }, {
    key: "renderNow",
    value: function renderNow(e, elem) {
      this.events.emit('renderNow');
    }
  }, {
    key: "renderAfterOneSec",
    value: function renderAfterOneSec() {
      this.events.emit('renderAfterOneSec');
    }
  }, {
    key: "link",
    value: function link(scope, elem, attrs, ctrl) {
      var _this3 = this;

      this.events.on('renderNow', function (e) {
        return renderNow.call(_this3, e, elem);
      });
      this.events.on('render', _lodash.default.debounce(function (e) {
        return renderNow.call(_this3, e, elem);
      }, 250));
      this.events.on('renderAfterOneSec', _lodash.default.debounce(function (e) {
        return renderNow.call(_this3, e, elem);
      }, 1000));
    }
  }]);

  return DataTablePanelCtrl;
}(_sdk.MetricsPanelCtrl);

exports.DataTablePanelCtrl = DataTablePanelCtrl;
DataTablePanelCtrl.templateUrl = 'partials/module.html';
//# sourceMappingURL=ctrl.js.map
