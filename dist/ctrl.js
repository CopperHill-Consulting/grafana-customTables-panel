"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DataTablePanelCtrl = void 0;

var _sdk = require("app/plugins/sdk");

var _lodash = _interopRequireDefault(require("lodash"));

var JS = _interopRequireWildcard(require("./external/YourJS.min"));

require("./external/toCSV");

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

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var RGX_SIMPLE_NUMBER = /^\d+(\.\d+)?$/;
var DEFAULT_PSEUDO_CSS = "\n.theme-dark & {\n  color: white;\n}\ntable.dataTable tbody tr {\n  &:hover td {\n    background-image: linear-gradient(0deg, rgba(128,128,128,0.1), rgba(128,128,128,0.1));\n  }\n  &, &.even, &.odd {\n    background-color: transparent;\n    >.sorting_1, >.sorting_2, >.sorting_3 {\n      background-color: transparent;\n    }\n    td {\n      border-color: transparent;\n    }\n  }\n  &.odd {\n    background-color: rgba(128,128,128,0.3);\n  }\n  &.even {\n    background-color: rgba(128,128,128,0.15);\n  }\n}\n";
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
var CONTENT_RULE_MAX_VALUE_OPS = [{
  id: '',
  text: ''
}, {
  id: '>=',
  text: "\u2265 (greater than or equal to)"
}, {
  id: '>',
  text: '> (greater than)'
}];
var CONTENT_RULE_MIN_VALUE_OPS = [{
  id: '',
  text: ''
}, {
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
  pseudoCSS: DEFAULT_PSEUDO_CSS,
  columnDefs: [],
  isFullWidth: true,
  allowOrdering: true,
  allowSearching: true,
  allowLengthChange: true,
  pageLengths: '10,15,20,25,50,100',
  initialPageLength: 25
};

function parseRegExp(strPattern) {
  var parts = /^\/(.+)\/(\w*)$/.exec(strPattern);
  return parts ? new RegExp(parts[1], parts[2]) : new RegExp('^' + _lodash.default.escapeRegExp(strPattern) + '$', 'i');
}

function pseudoCssToJSON(strLess) {
  var openCount = 0;
  var closeCount = 0;
  strLess = strLess.replace(/\/\*[^]*?\*\//g, '').replace(/([^\{\};]+)\{|([^:\{\}]+):([^;]+);|\}/g, function (match, ruleName, styleName, styleValue) {
    if (ruleName) {
      openCount++;
      return JSON.stringify(ruleName.trim()) + ":{";
    }

    if (styleName) {
      return JSON.stringify(styleName.trim()) + ":" + JSON.stringify(styleValue.trim()) + ",";
    }

    closeCount++;
    return "},";
  }).replace(/,\s*(\}|$)/g, '$1');

  try {
    return JSON.stringify(JSON.parse("{" + strLess + "}"), null, 2);
  } catch (e) {
    throw new Error(openCount !== closeCount ? "Pseudo-CSS contains too many " + (openCount > closeCount ? "open" : "clos") + "ing braces." : "Pseudo-CSS couldn't be parsed correctly.");
  }
}

function setContent(jElem, ctrl) {
  var data = ctrl.data;
  var panel = ctrl.panel;
  var varsByName = ctrl.getVarsByName();
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
  var colDefs = panel.columnDefs;
  var colDefRgxs = colDefs.map(function (colDef) {
    return parseRegExp(colDef.filter);
  });
  var columnTexts = data.columnTexts;
  var colDefIndexByCol = columnTexts.map(function (title) {
    return colDefRgxs.reduce(function (carry, colDefRgx, colDefIndex) {
      return carry < 0 && colDefRgx.test(title) ? colDefIndex : carry;
    }, -1);
  });
  var colDefContentRuleFilters = colDefs.map(function (colDef) {
    return colDef.contentRules.map(function (rule) {
      return rule.type === 'FILTER' ? parseRegExp(rule.filter) : null;
    });
  });
  var options = {
    data: data.rows,
    columns: columnTexts.map(function (title, colIndex) {
      var result = {
        title: title
      };
      var colDefIndex = colDefIndexByCol[colIndex];
      var colDef = colDefs[colDefIndex];

      if (colDef) {
        var filter = colDefRgxs[colDefIndex];

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
    lengthMenu: ctrl.getPageLengthOptions().reduce(function (arr, opt) {
      return [arr[0].concat([opt.value === Infinity ? -1 : opt.value]), arr[1].concat([opt.value === Infinity ? 'All' : opt.value])];
    }, [[], []]),
    pageLength: panel.initialPageLength,
    order: [],
    rowCallback: function rowCallback(tr, rowData) {
      var tdIndex = -1;
      var cellsByColName = rowData.reduceRight(function (carry, val, i) {
        return _lodash.default.extend(carry, _defineProperty({}, columnTexts[i], val));
      }, {});
      rowData.map(function (cell, colIndex) {
        var colDefIndex = colDefIndexByCol[colIndex];
        var colDef = colDefs[colDefIndex];

        if (!colDef || colDef.isVisible) {
          tdIndex++;
        }

        if (colDef) {
          if (colDef.isVisible) {
            var rules = colDef.contentRules; // Use Array#find() solely to match the first applicable rule...

            rules.find(function (rule, ruleIndex) {
              var isMatch = true;
              var type = rule.type;
              var colDefContentRuleFilter = colDefContentRuleFilters[colDefIndex][ruleIndex];
              var gcvOptions = {
                cell: cell,
                cellsByColName: cellsByColName,
                rule: rule,
                colDefContentRuleFilter: colDefContentRuleFilter,
                ctrl: ctrl,
                varsByName: varsByName
              };

              if (type === 'FILTER') {
                isMatch = colDefContentRuleFilter.test(cell);
              } else if (type === 'RANGE') {
                var minValue = rule.minValue;
                var minIsNum = RGX_SIMPLE_NUMBER.test(minValue);
                var maxValue = rule.maxValue;
                var maxIsNum = RGX_SIMPLE_NUMBER.test(maxValue);

                if (minIsNum) {
                  minValue = +minValue;
                }

                if (maxIsNum) {
                  maxValue = +maxValue;
                }

                if (minIsNum || maxIsNum) {
                  cell = +cell;
                }

                var minValueOp = rule.minValueOp;

                if (minValueOp) {
                  isMatch = isMatch && (minValueOp === '<=' ? minValue <= cell : minValue < cell);
                }

                var maxValueOp = rule.maxValueOp;

                if (maxValueOp) {
                  isMatch = isMatch && (maxValueOp === '>=' ? maxValue >= cell : maxValue > cell);
                }
              } else {
                isMatch = cell == null;
              }

              isMatch = isMatch !== rule.negateCriteria; // If this is a match apply the class(es)

              if (isMatch) {
                var jTD = jQuery('>td', tr).eq(tdIndex);

                if (rule.classNames) {
                  var classNames = getCellValue(rule.classNames, false, gcvOptions);

                  if (rule.classLevel === 'ROW') {
                    jQuery(tr).addClass(classNames);
                  } else {
                    jTD.addClass(classNames);
                  }
                } // Set the display


                var display = getCellValue(rule.display, false, gcvOptions);

                if (rule.displayIsHTML) {
                  display = _lodash.default.escape(display);
                }

                if (rule.url) {
                  var url = _lodash.default.escape(getCellValue(rule.url, true, gcvOptions));

                  display = "<a href=\"".concat(url, "\" target=\"").concat(rule.openNewWindow ? '_blank' : '_self', "\">").concat(display, "</a>");
                }

                jTD.html(display);
              }

              return isMatch;
            }, false);
          }
        }
      });
    }
  };
  var dataTable = jTable.DataTable(options);
  jElem.find('.dataTables_scrollHeadInner').css('margin', '0 auto');
  fixDataTableSize(jElem.find('.dataTables_wrapper'), height);
  jElem.each(function (i, elem) {
    elem.className = elem.className.replace(/\b_\d+\b/g, ' ').replace(/\s+/g, ' ').trim();
    elem.appendChild(JS.css(JSON.parse(pseudoCssToJSON(panel.pseudoCSS)), elem));
  });
}

function getCellValue(valToMod, isForLink, _ref) {
  var display = _ref.display,
      cellsByColName = _ref.cellsByColName,
      rule = _ref.rule,
      colDefContentRuleFilter = _ref.colDefContentRuleFilter,
      ctrl = _ref.ctrl,
      varsByName = _ref.varsByName;
  var matches = rule.type === 'FILTER' ? display != null ? colDefContentRuleFilter.exec(display + '') : {
    '0': 'null'
  } : {
    '0': display
  };

  _lodash.default.extend(matches, {
    value: display,
    cell: display
  });

  return valToMod.replace(/\${(?:(value|cell|0|[1-9]\d*)|(col|var):((?:[^\}:\\]*|\\.)+))(?::(?:(raw)|(escape)|(param)(?::((?:[^\}:\\]*|\\.)+))?))?}/g, function (match, matchesKey, type, name, isRaw, isEscape, isParam, paramName) {
    isRaw = isRaw || !(isForLink || isEscape);
    name = name && name.replace(/\\(.)/g, '$1');

    var result = _toConsumableArray(new Set(matchesKey ? _lodash.default.has(matches, matchesKey) ? [matches[matchesKey]] : [] : type === 'col' ? _lodash.default.has(cellsByColName, name) ? [cellsByColName[name]] : [] : _lodash.default.has(varsByName, name) ? varsByName[name] : []));

    return result.length < 1 ? match : isRaw ? result.join(',') : isParam ? result.map(function (v) {
      return encodeURIComponent(paramName == undefined ? name : paramName) + '=' + encodeURIComponent(v);
    }).join('&') : encodeURIComponent(result.join(','));
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
  ctrl.pageLengthOptions = ctrl.getPageLengthOptions();

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

    if (error) {
      throw error;
    }
  }
}

function parseData(columns, rows, ctrl) {
  // let result = {
  //   columns,
  //   rows,
  //   columnTexts: columns.map(col => 'string' === typeof col ? col : col.text)
  // };
  var varsByName = ctrl.getVarsByName();
  var headers = columns.map(function (col) {
    return col.text;
  });
  var colDefs = ctrl.panel.columnDefs;
  var colDefRgxs = colDefs.map(function (colDef) {
    return parseRegExp(colDef.filter);
  });
  var colDefContentRuleFilters = colDefs.map(function (colDef) {
    return colDef.contentRules.map(function (rule) {
      return rule.type === 'FILTER' ? parseRegExp(rule.filter) : null;
    });
  });
  columns = _lodash.default.cloneDeep(columns).map(function (column) {
    column = _lodash.default.extend('string' === typeof column ? {
      text: column
    } : column, {
      visible: true
    });
    colDefRgxs.find(function (colDefRgx, colDefIndex) {
      if (colDefRgx.test(column.text)) {
        var colDef = colDefs[colDefIndex];
        column = _lodash.default.extend({}, column, {
          html: colDef.displayIsHTML ? column.text : _lodash.default.escape(column.text),
          colDef: colDef,
          visible: colDef.isVisible,
          colDefRgx: colDefRgx,
          colDefContentRuleFilters: colDefContentRuleFilters[colDefIndex]
        });
        return true;
      }
    });
    return column;
  });
  rows = rows.map(function (row) {
    return row.slice().map(function (cellValue, colIndex) {
      var column = columns[colIndex];
      var colDef = column.colDef && column.colDef;
      var cell = {
        html: cellValue,
        visible: column.visible
      };

      if (colDef) {
        var rules = colDef.contentRules;
        var cellsByColName = row.reduceRight(function (carry, val, i) {
          return _lodash.default.extend(carry, _defineProperty({}, headers[i], val));
        }, {}); // Use Array#find() solely to match the first applicable rule...

        rules.find(function (rule, ruleIndex) {
          var isMatch = true;
          var type = rule.type;
          var colDefContentRuleFilter = column.colDefContentRuleFilters[ruleIndex];
          var gcvOptions = {
            cell: cell.html,
            cellsByColName: cellsByColName,
            rule: rule,
            colDefContentRuleFilter: colDefContentRuleFilter,
            ctrl: ctrl,
            varsByName: varsByName
          };

          if (type === 'FILTER') {
            isMatch = colDefContentRuleFilter.test(cell.html);
          } else if (type === 'RANGE') {
            var minValue = rule.minValue;
            var minIsNum = RGX_SIMPLE_NUMBER.test(minValue);
            var maxValue = rule.maxValue;
            var maxIsNum = RGX_SIMPLE_NUMBER.test(maxValue);

            if (minIsNum) {
              minValue = +minValue;
            }

            if (maxIsNum) {
              maxValue = +maxValue;
            }

            if (minIsNum || maxIsNum) {
              cellValue = +cellValue;
            }

            var minValueOp = rule.minValueOp;

            if (minValueOp) {
              isMatch = isMatch && (minValueOp === '<=' ? minValue <= cellValue : minValue < cellValue);
            }

            var maxValueOp = rule.maxValueOp;

            if (maxValueOp) {
              isMatch = isMatch && (maxValueOp === '>=' ? maxValue >= cellValue : maxValue > cellValue);
            }
          } else {
            isMatch = cell.html == null;
          }

          isMatch = isMatch !== rule.negateCriteria; // If this is a match apply the class(es)

          if (isMatch) {
            if (rule.classNames) {
              cell.cls = {
                names: getCellValue(rule.classNames, false, gcvOptions),
                level: rule.classLevel
              };
            } // Set the display


            var displayHTML = getCellValue(rule.display, false, gcvOptions);

            if (!rule.displayIsHTML) {
              displayHTML = _lodash.default.escape(displayHTML);
            }

            if (rule.url) {
              var url = _lodash.default.escape(getCellValue(rule.url, true, gcvOptions));

              displayHTML = "<a href=\"".concat(url, "\" target=\"").concat(rule.openNewWindow ? '_blank' : '_self', "\">").concat(displayHTML, "</a>");
            }

            cell.html = displayHTML;
          }

          return isMatch;
        });
      }

      return cell;
    });
  });
  return {
    columns: columns,
    rows: rows,
    headers: headers
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

    _this.events.on('data-error', _this.onDataError.bind(_assertThisInitialized(_this)));

    _this.events.on('init-panel-actions', _this.onInitPanelActions.bind(_assertThisInitialized(_this)));

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
    key: "onInitPanelActions",
    value: function onInitPanelActions(actions) {
      actions.push({
        text: 'Export CSV',
        click: 'ctrl.exportCSV()'
      });
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
        this.data = _lodash.default.extend(parseData(data.columns, data.rows, this), {
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
        }), this), {
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
        display: '${value}',
        displayIsHTML: false,
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
    key: "getPageLengthOptions",
    value: function getPageLengthOptions() {
      return this.panel.pageLengths.replace(/\s+/g, '').split(',').reduce(function (arr, x) {
        if (+x === parseInt(x, 10) && +x >= -1) {
          x = x == -1 ? Infinity : +x;
          arr.push({
            value: x,
            text: x === Infinity ? 'All' : x
          });
        }

        return arr;
      }, []);
    }
  }, {
    key: "exportCSV",
    value: function exportCSV() {
      JS.dom({
        _: 'a',
        href: 'data:text/csv;charset=utf-8,' + encodeURIComponent(toCSV(this.data.rows, {
          headers: this.data.columnTexts
        })),
        download: this.panel.title + JS.formatDate(new Date(), " (YYYY-MM-DD 'at' H:mm:ss).'csv'")
      }).click();
    }
  }, {
    key: "getVarsByName",
    value: function getVarsByName() {
      return this.templateSrv.variables.reduce(function (carry, variable) {
        // At times current.value is a string and at times it is an array.
        var varValues = JS.toArray(variable.current.value);
        var isAll = variable.includeAll && varValues.length === 1 && varValues[0] === '$__all';
        carry[variable.name] = isAll ? [variable.current.text] : varValues;
        return carry;
      }, {});
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
