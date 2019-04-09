"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DataTablePanelCtrl = void 0;

var _sdk = require("app/plugins/sdk");

var _lodash = _interopRequireDefault(require("lodash"));

var JS = _interopRequireWildcard(require("./external/YourJS.min"));

require("./external/helper-functions");

require("./external/datatables/js/jquery.dataTables.min");

require("./external/datatables/js/dataTables.fixedHeader.min");

require("./external/datatables/css/jquery.dataTables.min.css!");

require("./external/datatables/css/fixedHeader.dataTables.min.css!");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var DEFAULT_PSEUDO_CSS = "\n.theme-dark & {\n  color: white;\n}\ntable.dataTable tbody tr {\n  &:hover td {\n    background-image: linear-gradient(0deg, rgba(128,128,128,0.1), rgba(128,128,128,0.1));\n  }\n  &, &.even, &.odd {\n    background-color: transparent;\n    >.sorting_1, >.sorting_2, >.sorting_3 {\n      background-color: transparent;\n    }\n    td {\n      border-color: transparent;\n    }\n  }\n  &.odd {\n    background-color: rgba(128,128,128,0.3);\n  }\n  &.even {\n    background-color: rgba(128,128,128,0.15);\n  }\n}\n";
var TOOLTIP_PLACEMENTS = [{
  "id": "TOP",
  "text": "Top"
}, {
  "id": "LEFT",
  "text": "Left"
}, {
  "id": "RIGHT",
  "text": "Right"
}, {
  "id": "BOTTOM",
  "text": "Bottom"
}];
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
  allowLengthChange: true,
  allowOrdering: true,
  allowSearching: true,
  columnDefs: [],
  initialPageLength: 25,
  isFullWidth: true,
  pageLengths: '10,15,20,25,50,100',
  pseudoCSS: DEFAULT_PSEUDO_CSS
};

var DataTablePanelCtrl =
/*#__PURE__*/
function (_MetricsPanelCtrl) {
  _inherits(DataTablePanelCtrl, _MetricsPanelCtrl);

  function DataTablePanelCtrl($scope, $injector, $rootScope) {
    var _this;

    _classCallCheck(this, DataTablePanelCtrl);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(DataTablePanelCtrl).call(this, $scope, $injector));
    _this.$rootScope = $rootScope;

    _lodash.default.defaultsDeep(_this.panel, DEFAULT_PANEL_SETTINGS);

    _this.events.on('init-edit-mode', _this.onInitEditMode.bind(_assertThisInitialized(_this)));

    _this.events.on('data-received', _this.onDataReceived.bind(_assertThisInitialized(_this)));

    _this.events.on('data-snapshot-load', _this.onDataReceived.bind(_assertThisInitialized(_this)));

    _this.events.on('data-error', _this.onDataError.bind(_assertThisInitialized(_this)));

    _this.events.on('data-error', _this.onDataError.bind(_assertThisInitialized(_this)));

    _this.events.on('init-panel-actions', _this.onInitPanelActions.bind(_assertThisInitialized(_this)));

    _this.events.on('render', _this.onPanelSizeChanged.bind(_assertThisInitialized(_this)));

    _this.events.on('view-mode-changed', _this.draw.bind(_assertThisInitialized(_this)));

    return _this;
  }

  _createClass(DataTablePanelCtrl, [{
    key: "drawIfChanged",
    value: function drawIfChanged() {
      if (this.panelJSON !== this.getPanelSettingsJSON()) {
        this.draw();
      }
    }
  }, {
    key: "getPanelSettingsJSON",
    value: function getPanelSettingsJSON(spacing) {
      var panel = this.panel;
      return JSON.stringify(panel, function (key, value) {
        return this != panel || _lodash.default.has(DEFAULT_PANEL_SETTINGS, key) ? value : undefined;
      }, spacing);
    }
  }, {
    key: "onPanelSizeChanged",
    value: function onPanelSizeChanged() {
      this.fixDataTableSize();
    }
  }, {
    key: "onInitEditMode",
    value: function onInitEditMode() {
      var path = 'public/plugins/copperhill-datatables-panel/partials/';
      this.addEditorTab('Table View', "".concat(path, "refresh-view.html"), 1);
      this.addEditorTab('Options', "".concat(path, "editor.html"), 2);
      this.addEditorTab('Column Definitions', "".concat(path, "column-defs.html"), 3);
      this.addEditorTab('Styles', "".concat(path, "styles.html"), 4);
      this.addEditorTab('Table View', "".concat(path, "refresh-view.html"), 5);
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
      this.draw();
    }
  }, {
    key: "onDataReceived",
    value: function onDataReceived(dataList) {
      if (dataList && dataList.length) {
        dataList.forEach(function (data) {
          return data.isReal = true;
        });
        this.dataList = dataList;
      } else {
        var EXTRA_COLS = 2;
        this.dataList = [{
          columns: [{
            text: "X"
          }, {
            text: "X * X"
          }, {
            text: "X + X"
          }].concat(_lodash.default.range(EXTRA_COLS).map(function (y) {
            return {
              text: "".concat(y, " / Math.random()")
            };
          })),
          rows: _lodash.default.range(150).map(function (x) {
            return [x, x * x, x + x].concat(_lodash.default.range(EXTRA_COLS).map(function (y) {
              return y / Math.random();
            }));
          }),
          isReal: false,
          type: 'table'
        }];
      }

      this.draw();
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
        display: '${value}',
        displayIsHTML: false,
        url: '',
        openNewWindow: true,
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
        openNewWindow: true,
        tooltip: {
          isVisible: false,
          display: '',
          placement: TOOLTIP_PLACEMENTS[0].id
        }
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
      var div = JS.dom({
        _: 'div'
      });
      var data = this.parseDataList(0);
      JS.dom({
        _: 'a',
        href: 'data:text/csv;charset=utf-8,' + encodeURIComponent(toCSV(data.rows.map(function (row) {
          return row.reduce(function (carry, cell) {
            if (cell.visible) {
              div.innerHTML = cell.html;
              carry.push(div.textContent);
            }

            return carry;
          }, []);
        }), {
          headers: data.columns.reduce(function (carry, header) {
            if (header.visible) {
              div.innerHTML = header.html;
              carry.push(div.textContent);
            }

            return carry;
          }, [])
        })),
        download: this.panel.title + JS.formatDate(new Date(), " (YYYY-MM-DD 'at' H.mm.ss).'csv'")
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
    key: "setContent",
    value: function setContent(data) {
      var ctrl = this;
      var panel = ctrl.panel;
      var jElem = ctrl.panelElement;
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
      var columns = data.columns;
      var headers = data.headers;
      var dataTableOpts = {
        data: data.rows,
        columns: columns.map(function (column, colIndex) {
          var result = {
            title: column.text,
            visible: column.visible
          };
          var colDef = column.colDef;

          if (colDef && column.visible) {
            if (colDef.width) {
              result.width = colDef.width;
            }

            if (colDef.classNames) {
              result.className = colDef.classNames;
            }

            result.orderable = colDef.isOrderable;
            result.searchable = colDef.isSearchable;
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
        headerCallback: function headerCallback(tr) {
          var thIndex = 0;
          columns.forEach(function (col) {
            if (col.visible) {
              var jTH = jQuery('>th', tr).eq(thIndex++).html(col.html);
            }
          });
        },
        rowCallback: function rowCallback(tr, rowData) {
          var tdIndex = 0;
          rowData.forEach(function (cell) {
            if (cell.visible) {
              var jTD = jQuery('>td', tr).eq(tdIndex++);

              if (cell.cls && cell.cls.level === 'CELL') {
                jTD.addClass(cell.cls.names);
              }

              var html = cell.html;

              if (cell.tooltip) {
                html = "<div data-tooltip data-original-title=\"".concat(_lodash.default.escape(cell.tooltip.display), "\" data-placement=\"").concat(cell.tooltip.placement, "\" class=\"d-inline-block\">").concat(html, "</div>");
              }

              jTD.html(html);
            } else if (cell.cls && cell.cls.level === 'ROW') {
              jQuery(tr).addClass(cell.cls.names);
            }
          });
        }
      };
      var dataTable = jTable.DataTable(dataTableOpts);
      jElem.find('.dataTables_scrollHeadInner').css('margin', '0 auto');
      ctrl.fixDataTableSize();
      jElem.each(function (i, elem) {
        elem.className = elem.className.replace(/\b_\d+\b/g, ' ').replace(/\s+/g, ' ').trim();
        elem.appendChild(JS.css(JSON.parse(pseudoCssToJSON(panel.pseudoCSS)), elem));
      });
    }
  }, {
    key: "parseDataList",
    value: function parseDataList() {
      var ctrl = this;
      var data = ctrl.dataList[0];
      var columns = data.columns;
      var rows = data.rows;
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
            var gcvOptions = {
              cell: column.text,
              cellsByColName: {},
              ruleType: 'FILTER',
              rgx: colDefRgx,
              ctrl: ctrl,
              varsByName: varsByName
            };
            column.text = getCellValue(colDef.display, false, gcvOptions);
            var html = colDef.displayIsHTML ? column.text : _lodash.default.escape(column.text);

            if (colDef.url) {
              var url = _lodash.default.escape(getCellValue(colDef.url, true, gcvOptions));

              var target = colDef.openNewWindow ? '_blank' : '';
              html = "<a href=\"".concat(url, "\" target=\"").concat(target, "\" onclick=\"event.stopPropagation()\">").concat(html, "</a>");
            }

            _lodash.default.extend(column, {
              colDef: colDef,
              colDefContentRuleFilters: colDefContentRuleFilters[colDefIndex],
              html: html,
              visible: colDef.isVisible
            });

            return true;
          }
        });

        if (!_lodash.default.has(column, 'html')) {
          column.html = _lodash.default.escape(column.text);
        }

        return column;
      });
      rows = rows.map(function (row) {
        return row.slice().map(function (cellValue, colIndex) {
          var column = columns[colIndex];
          var colDef = column.colDef;
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
                ruleType: rule.type,
                rgx: colDefContentRuleFilter,
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

                  var target = rule.openNewWindow ? '_blank' : '';
                  var tooltipHTML = '';

                  if (rule.tooltip.isVisible) {
                    cell.tooltip = {
                      display: getCellValue(rule.tooltip.display, false, gcvOptions),
                      placement: rule.tooltip.placement.toLowerCase()
                    };
                  }

                  displayHTML = "<a href=\"".concat(url, "\" target=\"").concat(target, "\">").concat(displayHTML, "</a>");
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
        headers: headers,
        type: data.type,
        refId: data.refId
      };
    }
  }, {
    key: "fixDataTableSize",
    value: function fixDataTableSize() {
      var jElem = this.panelElement;
      var fullHeight = jElem.height();
      var jWrap = jElem.find('.dataTables_wrapper');

      if (jWrap.length) {
        var wrapHeight = jWrap.height();
        var jScrollBody = jWrap.find('.dataTables_scrollBody');
        var scrollHeight = jScrollBody.height();
        var nonScrollHeight = wrapHeight - scrollHeight;
        jScrollBody.css('max-height', fullHeight - nonScrollHeight);
      }
    }
  }, {
    key: "draw",
    value: function draw() {
      var error;
      var isValid = false;
      var ctrl = this;
      var jElem = ctrl.element;
      var jContent = ctrl.panelElement.css('position', 'relative').html('');
      var elemContent = jContent[0];
      var data = ctrl.parseDataList();
      ctrl.pageLengthOptions = ctrl.getPageLengthOptions();

      if (data && data.rows.length) {
        if (data.type === 'table') {
          try {
            ctrl.setContent(data);
            ctrl.panelJSON = this.getPanelSettingsJSON();
            jElem.tooltip({
              selector: '[data-tooltip]'
            });
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
  }, {
    key: "link",
    value: function link(scope, elem, attrs, ctrl) {
      this.element = elem;
      this.panelElement = elem.find('.panel-content');
      this.throttleDraw = _lodash.default.debounce(this.draw.bind(this), 1000);
    }
  }]);

  return DataTablePanelCtrl;
}(_sdk.MetricsPanelCtrl);

exports.DataTablePanelCtrl = DataTablePanelCtrl;
DataTablePanelCtrl.templateUrl = 'partials/module.html';
//# sourceMappingURL=ctrl.js.map
