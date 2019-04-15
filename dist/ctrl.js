"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DataTablePanelCtrl = void 0;

var _sdk = require("app/plugins/sdk");

var _lodash = _interopRequireDefault(require("lodash"));

var JS = _interopRequireWildcard(require("./external/YourJS.min"));

var _helperFunctions = require("./helper-functions");

require("./external/datatables/js/jquery.dataTables.min");

require("./external/datatables/js/dataTables.fixedHeader.min");

require("./external/datatables/css/jquery.dataTables.min.css!");

require("./external/datatables/css/fixedHeader.dataTables.min.css!");

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

var RGX_SIMPLE_NUMBER = /^\d+(\.\d+)?$/;
var DEFAULT_PSEUDO_CSS = "\n.theme-dark & {\n  color: white;\n}\ntable.dataTable tbody tr {\n  &:hover td {\n    background-image: linear-gradient(0deg, rgba(128,128,128,0.1), rgba(128,128,128,0.1));\n  }\n  &, &.even, &.odd {\n    background-color: transparent;\n    td {\n      border-color: transparent;\n    }\n  }\n  &.odd {\n    background-color: rgba(128,128,128,0.3);\n  }\n  &.even {\n    background-color: rgba(128,128,128,0.15);\n  }\n}\n";
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
  pseudoCSS: DEFAULT_PSEUDO_CSS,
  varCols: {
    dataRefId: null,
    mainJoinColumn: null,
    joinColumn: null,
    nameColumn: null,
    valueColumn: null
  }
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
      this.addEditorTab('Variable Columns', "".concat(path, "var-cols.html"), 2);
      this.addEditorTab('Editor', "".concat(path, "editor.html"), 3);
      this.addEditorTab('Column Definitions', "".concat(path, "column-defs.html"), 4);
      this.addEditorTab('Styles', "".concat(path, "styles.html"), 5);
      this.addEditorTab('Table View', "".concat(path, "refresh-view.html"), 6);
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
        this.updateDataListOptions();
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
    key: "updateDataListOptions",
    value: function updateDataListOptions() {
      this.dataListOptions = [{}].concat(this.dataList).map(function (x, i) {
        return {
          id: i ? x.refId : null,
          text: i ? x.refId : '--- NONE ---'
        };
      });
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
      var data = this.getData();
      var rows = data.rows,
          columns = data.columns,
          headers = data.headers;
      this.processRows(rows, columns, headers, this.getVarsByName());
      JS.dom({
        _: 'a',
        href: 'data:text/csv;charset=utf-8,' + encodeURIComponent((0, _helperFunctions.toCSV)(rows.map(function (row) {
          return row.reduce(function (carry, cell) {
            if (cell.visible) {
              carry.push((0, _helperFunctions.getHtmlText)(cell.html));
            }

            return carry;
          }, []);
        }), {
          headers: columns.reduce(function (carry, col) {
            if (col.visible) {
              carry.push((0, _helperFunctions.getHtmlText)(col.html));
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
    key: "drawDataTable",
    value: function drawDataTable(data) {
      var ctrl = this;
      var panel = ctrl.panel;
      var jElem = ctrl.panelElement;
      var height = jElem.height();
      var columns = data.columns;
      var rows = data.rows;
      var varsByName = ctrl.getVarsByName();
      var domTable = {
        _: 'table',
        style: {}
      };

      if (panel.isFullWidth) {
        domTable.style.width = '100%';
      }

      var table = JS.dom(domTable);
      var jTable = jQuery(table).appendTo(jElem.html(''));
      var headers = data.headers;
      var dataTableOpts = {
        columns: columns.map(function (column, colIndex) {
          var result = {
            title: (0, _helperFunctions.getHtmlText)(column.html),
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
        headerCallback: function headerCallback(tr) {
          var thIndex = 0;
          columns.forEach(function (col) {
            if (col.visible) {
              var jTH = jQuery('>th', tr).eq(thIndex++).html(col.html);
            }
          });
        },
        data: rows,
        rowCallback: function rowCallback(tr, rowData, pageDisplayIndex, displayIndex, rowIndex) {
          if (!rowData.isProcessed) {
            ctrl.processRows([rowData], columns, headers, varsByName);
          }

          for (var cell, cellValue, tdIndex = 0, cellCount = rowData.length, colIndex = 0; colIndex < cellCount; colIndex++) {
            cell = rowData[colIndex];

            if (cell.visible) {
              var jTD = jQuery('> td', tr).eq(tdIndex++);

              if (cell.cls && cell.cls.level === 'CELL') {
                jTD.addClass(cell.cls.names);
              }

              var colDef = columns[colIndex].columnDef;

              if (colDef && colDef.classNames) {
                jTD.addClass(colDef.classNames);
              }

              var html = cell.html;

              if (cell.tooltip) {
                html = "<div data-tooltip data-original-title=\"".concat(_lodash.default.escape(cell.tooltip.display), "\" data-placement=\"").concat(cell.tooltip.placement, "\" class=\"d-inline-block\">").concat(html, "</div>");
              }

              jTD.html(html);
            }

            if (cell.cls && cell.cls.level === 'ROW') {
              jQuery(tr).addClass(cell.cls.names);
            }
          }
        },
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
        order: []
      };
      var dataTable = jTable.DataTable(dataTableOpts); // Horizontally center tables that are not full page width.

      jElem.find('.dataTables_scrollHeadInner').css('margin', '0 auto'); // Resize the scroll body of the table.

      ctrl.fixDataTableSize(); // Remove the old class names from the wrapper element and add a new
      // targeted stylesheet.

      jElem.each(function (i, elem) {
        elem.className = elem.className.replace(/\b_\d+\b/g, ' ').replace(/\s+/g, ' ').trim();
        elem.appendChild(JS.css(JSON.parse((0, _helperFunctions.pseudoCssToJSON)(panel.pseudoCSS)), elem));
      });
    }
  }, {
    key: "processRows",
    value: function processRows(rows, columns, headers, varsByName) {
      var ctrl = this;

      for (var row, rowCount = rows.length, rowIndex = 0; rowIndex < rowCount; rowIndex++) {
        row = rows[rowIndex];

        if (!row.isProcessed) {
          var _loop = function _loop(_cell, _cellValue, tdIndex, cellCount, colIndex) {
            var ruleApplied = void 0;
            var column = columns[colIndex];
            var colDef = column.colDef;
            _cellValue = row[colIndex];
            _cell = {
              html: _cellValue,
              visible: column.visible,
              valueOf: function valueOf() {
                cell = _cell;
                cellValue = _cellValue;
                return _cellValue;
              },
              toString: function toString() {
                cell = _cell;
                cellValue = _cellValue;
                return _cellValue;
              }
            };

            if (colDef) {
              var rules = colDef.contentRules;
              var cellsByColName = {};

              for (var ci = row.length; ci--;) {
                cellsByColName[headers[ci]] = row[ci];
              }

              for (var rule, ruleCount = rules.length, ruleIndex = 0; ruleIndex < ruleCount; ruleIndex++) {
                rule = rules[ruleIndex];
                var isMatch = true;
                var type = rule.type;
                var colDefContentRuleFilter = column.colDefContentRuleFilters[ruleIndex];
                var gcvOptions = {
                  cell: _cell.html,
                  cellsByColName: cellsByColName,
                  ruleType: rule.type,
                  rgx: colDefContentRuleFilter,
                  ctrl: ctrl,
                  varsByName: varsByName
                };

                if (type === 'FILTER') {
                  isMatch = colDefContentRuleFilter.test(_cell.html);
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
                    _cellValue = +_cellValue;
                  }

                  var minValueOp = rule.minValueOp;

                  if (minValueOp) {
                    isMatch = isMatch && (minValueOp === '<=' ? minValue <= _cellValue : minValue < _cellValue);
                  }

                  var maxValueOp = rule.maxValueOp;

                  if (maxValueOp) {
                    isMatch = isMatch && (maxValueOp === '>=' ? maxValue >= _cellValue : maxValue > _cellValue);
                  }
                } else {
                  isMatch = _cell.html == null;
                }

                isMatch = isMatch !== rule.negateCriteria; // If this is a match apply the class(es)

                if (isMatch) {
                  if (rule.classNames) {
                    _cell.cls = {
                      names: (0, _helperFunctions.getCellValue)(rule.classNames, false, gcvOptions),
                      level: rule.classLevel
                    };
                  } // Set the display


                  var displayHTML = (0, _helperFunctions.getCellValue)(rule.display, false, gcvOptions);

                  if (!rule.displayIsHTML) {
                    displayHTML = _lodash.default.escape(displayHTML);
                  }

                  if (rule.url) {
                    var url = _lodash.default.escape((0, _helperFunctions.getCellValue)(rule.url, true, gcvOptions));

                    var target = rule.openNewWindow ? '_blank' : '';
                    var tooltipHTML = '';

                    if (rule.tooltip.isVisible) {
                      _cell.tooltip = {
                        display: (0, _helperFunctions.getCellValue)(rule.tooltip.display, false, gcvOptions),
                        placement: rule.tooltip.placement.toLowerCase()
                      };
                    }

                    displayHTML = "<a href=\"".concat(url, "\" target=\"").concat(target, "\">").concat(displayHTML, "</a>");
                  }

                  _cell.html = displayHTML;
                  ruleApplied = rule;
                  break; // Break out of rules loop
                }
              } // End of rules for-loop

            } // End if (colDef) {...}


            if (!ruleApplied) {
              _cell.html = _lodash.default.escape(_cell.html);
            }

            row[colIndex] = _cell;
            cell = _cell;
            cellValue = _cellValue;
          };

          for (var cell, cellValue, tdIndex = 0, cellCount = row.length, colIndex = 0; colIndex < cellCount; colIndex++) {
            _loop(cell, cellValue, tdIndex, cellCount, colIndex);
          } // End of row for-loop

        } // End if (!row.isProcessed) {...}


        row.isProcessed = true;
      } // End of rows for-loop

    }
  }, {
    key: "getVarColColumns",
    value: function getVarColColumns() {
      var data = this.getVarColsData();
      return data ? data.columns : [];
    }
  }, {
    key: "getVarColsData",
    value: function getVarColsData() {
      var varCols = this.panel.varCols;
      var dataRefId = varCols && varCols.dataRefId;
      var dataList = this.dataList;
      return dataList && dataList.find(function (_ref) {
        var refId = _ref.refId;
        return refId === dataRefId;
      });
    }
  }, {
    key: "putVarColsIn",
    value: function putVarColsIn(data) {
      var varCols = this.panel.varCols;
      var columns = data.columns;
      var rows = data.rows.slice();
      var MAIN_COL_COUNT = columns.length;
      var MAIN_ROW_COUNT = rows.length;

      if (varCols) {
        var vcData = this.getVarColsData();

        if (vcData) {
          var vcHeaders = vcData.columns.map(function (col) {
            return col.text;
          });
          var mainJoinColIndex = columns.findIndex(function (c) {
            return c.text === varCols.mainJoinColumn;
          });
          var joinColIndex = vcHeaders.indexOf(varCols.joinColumn);
          var nameColIndex = vcHeaders.indexOf(varCols.nameColumn);
          var valueColIndex = vcHeaders.indexOf(varCols.valueColumn);

          if (mainJoinColIndex >= 0 && joinColIndex >= 0 && nameColIndex >= 0 && valueColIndex >= 0) {
            var mainRowIndex = 0; // Order a sliced version of the main `rows` using the join column.

            rows.sort(function (a, b) {
              return a[mainJoinColIndex] < b[mainJoinColIndex] ? -1 : 1;
            }); // Order a sliced version of the varCols rows using the join column.

            var vcRowsPrime = vcData.rows;
            var vcRows = vcRowsPrime.slice().sort(function (a, b) {
              return a[joinColIndex] < b[joinColIndex] ? -1 : 1;
            }); // Used later to reorder the new columns by the order they were found
            // in the data.

            var vcColIndexPairs = [];
            vcRows // Get a list of all of the new headers while simultaneously adding
            // the data to the appropriate rows and in the appropriate columns.
            .reduce(function (vcHeaders, vcRow) {
              var vcHeader = vcRow[nameColIndex];
              var vcJoinValue = vcRow[joinColIndex];
              var colIndex = vcHeaders.indexOf(vcHeader);
              var isNewVCHeader = colIndex < 0; // If the new column wasn't found add it.

              if (isNewVCHeader) {
                colIndex = vcHeaders.push(vcHeader) - 1;
              } // Since everything is ordered continue in `rows` looking for the
              // join and if found add the value there while setting the new row's
              // index as `mainRowIndex`.


              for (var mainRow, i = mainRowIndex; i < MAIN_ROW_COUNT; i++) {
                mainRow = rows[i];

                if (vcJoinValue === mainRow[mainJoinColIndex]) {
                  mainRow[MAIN_COL_COUNT + colIndex] = vcRow[valueColIndex];
                  mainRowIndex = i; // NOTE:  Return here to avoid checking `i` outside of loop.

                  return vcHeaders;
                }
              } // If new header was added but join was unsuccessful remove the new
              // header.


              if (isNewVCHeader) {
                vcHeaders.pop();
              }

              return vcHeaders;
            }, []) // Add the new `columns`.
            .forEach(function (vcHeader, vcHeaderIndex) {
              vcColIndexPairs.push({
                first: vcRowsPrime.findIndex(function (vcRow) {
                  return vcRow[nameColIndex] === vcHeader;
                }),
                index: vcHeaderIndex + MAIN_COL_COUNT
              });
              columns.push({
                text: vcHeader
              });
            }); // Used to reorder all of the var-cols

            vcColIndexPairs.sort(function (a, b) {
              return a.first - b.first;
            });
            var SPLICE_ARGS = [MAIN_COL_COUNT, vcColIndexPairs.length]; // Reorder all of the var-cols

            columns.splice.apply(columns, SPLICE_ARGS.concat(vcColIndexPairs.map(function (pair) {
              return columns[pair.index];
            }))); // Reorder all of the var-col cells in each row.

            rows.forEach(function (row) {
              row.splice.apply(row, SPLICE_ARGS.concat(vcColIndexPairs.map(function (pair) {
                pair = row[pair.index];
                return pair === undefined ? null : pair;
              })));
            });
          }
        }
      }
    }
  }, {
    key: "getData",
    value: function getData() {
      var ctrl = this;
      var dataList = ctrl.dataList[0];
      var columns = dataList.columns.map(function (col) {
        return _lodash.default.cloneDeep(col);
      });
      var rows = dataList.rows.map(function (row) {
        return row.slice();
      });
      var varsByName = ctrl.getVarsByName();
      var panel = ctrl.panel;
      var colDefs = panel.columnDefs;
      var varCols = panel.varCols;
      var colDefRgxs = colDefs.map(function (colDef) {
        return (0, _helperFunctions.parseRegExp)(colDef.filter);
      });
      var colDefContentRuleFilters = colDefs.map(function (colDef) {
        return colDef.contentRules.map(function (rule) {
          return rule.type === 'FILTER' ? (0, _helperFunctions.parseRegExp)(rule.filter) : null;
        });
      }); // Create the data object to be returned.

      var data = {
        columns: columns,
        rows: rows,
        type: dataList.type,
        refId: dataList.refId
      }; // Add the variable columns to the data if there are any.

      this.putVarColsIn(data); // Make an array of column headers.

      var headers = data.headers = columns.map(function (col) {
        return col.text;
      });
      columns.forEach(function (column, colIndex) {
        if ('string' === typeof column) {
          column = {
            text: column,
            visible: true
          };
        } else {
          column.visible = true;
        }

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
            column.text = (0, _helperFunctions.getCellValue)(colDef.display, false, gcvOptions);
            var html = colDef.displayIsHTML ? column.text : _lodash.default.escape(column.text);

            if (colDef.url) {
              var url = _lodash.default.escape((0, _helperFunctions.getCellValue)(colDef.url, true, gcvOptions));

              var target = colDef.openNewWindow ? '_blank' : '';
              html = "<a href=\"".concat(url, "\" target=\"").concat(target, "\" onclick=\"event.stopPropagation()\">").concat(html, "</a>");
            }

            column.colDef = colDef;
            column.colDefContentRuleFilters = colDefContentRuleFilters[colDefIndex];
            column.html = html;
            column.visible = colDef.isVisible;
            return true;
          }
        });

        if (!_lodash.default.has(column, 'html')) {
          column.html = _lodash.default.escape(column.text);
        }

        columns[colIndex] = column;
      });
      return data;
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
      var data = ctrl.getData();
      ctrl.pageLengthOptions = ctrl.getPageLengthOptions();

      if (data && data.rows.length) {
        if (data.type === 'table') {
          try {
            ctrl.drawDataTable(data);
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
