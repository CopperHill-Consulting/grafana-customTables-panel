"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DataTablePanelCtrl = void 0;

var _sdk = require("app/plugins/sdk");

var _formatValues = require("./format-values");

var _lodash = _interopRequireDefault(require("lodash"));

var JS = _interopRequireWildcard(require("./external/YourJS.min"));

var saveAs = _interopRequireWildcard(require("./external/FileSaver.min.js"));

var _helperFunctions = require("./helper-functions");

require("./external/datatables/js/jquery.dataTables.min");

require("./external/datatables/js/dataTables.fixedHeader.min");

require("./external/datatables/js/dataTables.buttons.min");

require("./external/datatables/css/jquery.dataTables.min.css!");

require("./external/datatables/css/fixedHeader.dataTables.min.css!");

require("./external/datatables/css/buttons.dataTables.min.css!");

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

var PARTIALS_BASE_PATH = 'public/plugins/copperhill-datatables-panel/partials/';
var RGX_SIMPLE_NUMBER = /^\d+(\.\d+)?$/;
var DEFAULT_PSEUDO_CSS = "\n.theme-dark & {\n  color: white;\n  \n  .dataTables_filter input[type=search] {\n    border: 1px solid #262628;\n  }\n}\n.dataTables_filter input[type=search] {\n  border: 1px solid #dde4ed;\n  height: 35px;\n  line-height: 35px;\n  border-radius: 5px;\n  padding: 0 8px;\n}\ntable.dataTable tbody tr {\n  &:hover td {\n    background-image: linear-gradient(0deg, rgba(128,128,128,0.1), rgba(128,128,128,0.1));\n  }\n  &, &.even, &.odd {\n    background-color: transparent;\n    td {\n      border-color: transparent;\n    }\n  }\n  &.odd {\n    background-color: rgba(128,128,128,0.3);\n  }\n  &.even {\n    background-color: rgba(128,128,128,0.15);\n  }\n}\n";
var UNIT_FORMATS = (0, _formatValues.getValueFormats)();
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
var TZ_OFFSET_TYPES = [{
  id: null,
  text: 'Default'
}, {
  id: 'NO-TIMEZONE',
  text: 'Local Timezone'
}, {
  id: 'TIMEZONE',
  text: 'Specify Minute Offset'
}];
var CONTENT_RULE_MAX_VALUE_OPS = [{
  id: '',
  text: ''
}, {
  id: '>=',
  text: "value \u2265 cell (greater than or equal to)"
}, {
  id: '>',
  text: 'value > cell (greater than)'
}];
var CONTENT_RULE_MIN_VALUE_OPS = [{
  id: '',
  text: ''
}, {
  id: '<',
  text: 'value < cell (less than)'
}, {
  id: '<=',
  text: "value \u2264 cell (less than or equal to)"
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
  allowFiltering: false,
  allowRedrawOnModify: true,
  allowPaging: true,
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
    _this.$rootScope = $rootScope; // Make sure old versions have this value set to false.

    if (!_lodash.default.has(_this.panel, 'allowRedrawOnModify')) {
      _this.panel.allowRedrawOnModify = false;
    }

    _lodash.default.defaultsDeep(_this.panel, DEFAULT_PANEL_SETTINGS);

    _this.events.on('init-edit-mode', _this.onInitEditMode.bind(_assertThisInitialized(_this)));

    _this.events.on('data-received', _this.onDataReceived.bind(_assertThisInitialized(_this)));

    _this.events.on('data-snapshot-load', _this.onDataReceived.bind(_assertThisInitialized(_this)));

    _this.events.on('data-error', _this.onDataError.bind(_assertThisInitialized(_this)));

    _this.events.on('init-panel-actions', _this.onInitPanelActions.bind(_assertThisInitialized(_this)));

    _this.events.on('render', _this.onPanelSizeChanged.bind(_assertThisInitialized(_this)));

    _this.events.on('view-mode-changed', _this.draw.bind(_assertThisInitialized(_this)));

    _this.events.on('panel-teardown', _this.onDataTablePanelTeardown.bind(_assertThisInitialized(_this)));

    $.fn.dataTable.ext.search.push(_this.filterDataTable.bind(_assertThisInitialized(_this)));
    return _this;
  }

  _createClass(DataTablePanelCtrl, [{
    key: "filterDataTable",
    value: function filterDataTable(settings, data, rowIndex, originalData) {
      return arguments.length === 0 ? this : this.panel.allowFiltering ? originalData.isProcessed ? this.columns.every(function (column, columnIndex) {
        var filter = column.filter;
        return !column.colDef || !column.visible || !column.colDef.isSearchable || !filter || filter.ignore || filter.test(originalData[columnIndex].value);
      }) : this.columns.every(function (column, columnIndex) {
        var filter = column.filter;
        return !column.colDef || !column.visible || !column.colDef.isSearchable || !filter || filter.ignore || filter.test(originalData[columnIndex]);
      }) : true;
    }
  }, {
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
    key: "onDataTablePanelTeardown",
    value: function onDataTablePanelTeardown() {
      var search = $.fn.dataTable.ext.search;

      for (var i = search.length; i--;) {
        if (search() === this) {
          search.splice(i, 1);
        }
      }
    }
  }, {
    key: "onPanelSizeChanged",
    value: function onPanelSizeChanged() {
      this.fixDataTableSize();
    }
  }, {
    key: "onInitEditMode",
    value: function onInitEditMode() {
      this.addEditorTab('Table View', "".concat(PARTIALS_BASE_PATH, "refresh-view.html"), 1);
      this.addEditorTab('Variable Columns', "".concat(PARTIALS_BASE_PATH, "var-cols.html"), 2);
      this.addEditorTab('Editor', "".concat(PARTIALS_BASE_PATH, "editor.html"), 3);
      this.addEditorTab('Column Definitions', "".concat(PARTIALS_BASE_PATH, "column-defs.html"), 4);
      this.addEditorTab('Styles', "".concat(PARTIALS_BASE_PATH, "styles.html"), 5);
      this.addEditorTab('Table View', "".concat(PARTIALS_BASE_PATH, "refresh-view.html"), 6);
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
          data.isReal = true;
          data.rows.forEach(function (cells) {
            cells.forEach(function (cell, cellIndex) {
              cells[cellIndex] = /^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\dZ$/.test(cell) ? new Date(cell) : cell;
            });
          });
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
    key: "moveColumnDef",
    value: function moveColumnDef(columnDef, offset) {
      var columnDefs = this.panel.columnDefs;
      var colDefIndex = columnDefs.indexOf(columnDef);
      var newColDefIndex = colDefIndex + offset;

      if (0 <= newColDefIndex && newColDefIndex < columnDefs.length) {
        columnDefs.splice(colDefIndex, 1);
        columnDefs.splice(newColDefIndex, 0, columnDef);
      }
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
        unitFormat: 'none',
        unitFormatDecimals: 0,
        unitFormatString: '',
        tzOffsetType: null,
        tzOffset: 0,
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
      var columns = data.columns;

      var _this$dataTable$butto = this.dataTable.buttons.exportData(),
          header = _this$dataTable$butto.header,
          rows = _this$dataTable$butto.body;

      this.processRows(rows, columns, header, this.getVarsByName());
      var csvText = (0, _helperFunctions.toCSV)(rows.map(function (row) {
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
      });
      var blob = new Blob([csvText], {
        type: 'text/csv;charset=utf-8'
      });
      var fileName = this.panel.title + JS.formatDate(new Date(), " (YYYY-MM-DD 'at' H.mm.ss).'csv'");
      saveAs(blob, fileName);
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
      var columns = ctrl.columns = data.columns;
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
          columns.forEach(function (col, colIndex) {
            if (col.visible) {
              var jTH = jQuery('>th', tr).eq(thIndex++).html(col.html);

              if (panel.allowFiltering && (!col.colDef || col.colDef.isSearchable)) {
                var showFilterModal = function showFilterModal(e) {
                  e && e.stopPropagation();
                  var ID_SUFFIX = +new Date();

                  var filterCopy = _lodash.default.extend(_lodash.default.cloneDeep(filter), {
                    minDate: filter.minDate && JS.formatDate(filter.minDate, 'YYYY-MM-DD HH:mm:ss'),
                    maxDate: filter.maxDate && JS.formatDate(filter.maxDate, 'YYYY-MM-DD HH:mm:ss')
                  });

                  ctrl.publishAppEvent('show-modal', {
                    src: "".concat(PARTIALS_BASE_PATH, "modal-column-filter.html"),
                    scope: _lodash.default.extend(ctrl.$scope.$new(true), {
                      column: _lodash.default.cloneDeep(col),
                      columnDataType: colDataType,
                      ID_SUFFIX: ID_SUFFIX,
                      filter: filterCopy,
                      resetFilter: function resetFilter() {
                        this.dismiss();
                        showFilterModal();
                      },
                      saveFilter: function saveFilter() {
                        var scopeFilter = this;
                        var ignore;

                        if (colDataType === 'Date' || colDataType === 'Number' || colDataType === 'BigInt') {
                          if (colDataType === 'Date') {
                            filter.minDate = (0, _helperFunctions.parseLocalDate)(scopeFilter.filter.minDate);
                            filter.maxDate = (0, _helperFunctions.parseLocalDate)(scopeFilter.filter.maxDate);
                          } else {
                            filter.minNum = (0, _helperFunctions.parseOptionalNumber)(scopeFilter.filter.minNum);
                            filter.maxNum = (0, _helperFunctions.parseOptionalNumber)(scopeFilter.filter.maxNum);
                          }

                          ignore = filter.minNum == undefined && filter.maxNum == undefined && filter.minDate == undefined && filter.maxDate == undefined;
                          filter.includeMin = scopeFilter.filter.includeMin;
                          filter.includeMax = scopeFilter.filter.includeMax;
                        } else if (colDataType === 'Boolean') {
                          filter.includeTrue = scopeFilter.filter.includeTrue;
                          filter.includeFalse = scopeFilter.filter.includeFalse;
                          ignore = !filter.includeTrue && !filter.includeFalse;
                        } else {
                          filter.text = scopeFilter.filter.text.trim();
                          filter.matchTerms = (0, _helperFunctions.term)(filter.text, {
                            matchWordStart: true
                          });
                          ignore = filter.text == '';
                        }

                        filter.includeNull = scopeFilter.filter.includeNull;
                        filter.negate = scopeFilter.filter.negate;
                        filter.ignore = ignore && !filter.includeNull;
                        ctrl.dataTable.draw();
                        this.dismiss();
                      },
                      includes: function includes(arr, value) {
                        return arr.includes(value);
                      }
                    }),
                    modalClass: 'modal-confirm'
                  });
                };

                var filter = col.filter;

                var colDataType = _lodash.default.get(col, 'filter.dataType', 'String');

                jTH.prepend(JS.dom({
                  _: 'i',
                  cls: 'fa fa-filter ' + (filter.ignore ? 'off' : 'on'),
                  style: (filter.ignore ? 'opacity:0.25;' : '') + 'margin-right:0.25em;cursor:pointer;',
                  onclick: showFilterModal
                }));
              }
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
        deferRender: true,
        paging: panel.allowPaging,
        scrollCollapse: true,
        ordering: panel.allowOrdering,
        searching: true,
        // Visibility is controlled via CSS to allow for custom filtering
        lengthChange: panel.allowLengthChange,
        lengthMenu: ctrl.getPageLengthOptions().reduce(function (arr, opt) {
          return [arr[0].concat([opt.value === Infinity ? -1 : opt.value]), arr[1].concat([opt.value === Infinity ? 'All' : opt.value])];
        }, [[], []]),
        pageLength: panel.initialPageLength,
        order: []
      };
      ctrl.dataTable = jTable.DataTable(dataTableOpts); // Horizontally center tables that are not full page width.

      jElem.find('.dataTables_scrollHeadInner').css('margin', '0 auto'); // Control visibility here instead in options to allow for custom filtering.

      if (!panel.allowSearching) {
        jElem.find('.dataTables_filter').css('display', 'none');
      } // Resize the scroll body of the table.


      ctrl.fixDataTableSize(true); // Remove the old class names from the wrapper element and add a new
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

        if (!row.isProcessed && 0 in row && !row[0].isProcessed) {
          var _loop = function _loop(_cell, _cellValue, tdIndex, cellCount, colIndex) {
            var ruleApplied = void 0;
            var column = columns[colIndex];
            var colDef = column.colDef;
            _cellValue = row[colIndex];
            _cell = {
              html: _cellValue,
              visible: column.visible,
              value: _cellValue,
              valueOf: function valueOf() {
                cell = _cell;
                cellValue = _cellValue;
                return _cellValue;
              },
              toString: function toString() {
                cell = _cell;
                cellValue = _cellValue;
                return _cellValue + '';
              },
              isProcessed: true
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
                  joinValues: row.joinValues,
                  colIndex: colIndex,
                  rule: rule,
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
            .reduce(function (vcAddedHeaders, vcRow) {
              var vcHeader = vcRow[nameColIndex];
              var vcJoinValue = vcRow[joinColIndex];
              var colIndex = vcAddedHeaders.indexOf(vcHeader);
              var isNewVCHeader = colIndex < 0; // If the new column wasn't found add it.

              if (isNewVCHeader) {
                colIndex = vcAddedHeaders.push(vcHeader) - 1;
              } // Since everything is ordered continue in `rows` looking for the
              // join and if found add the value there while setting the new row's
              // index as `mainRowIndex`.


              for (var isChanged, mainRow, i = mainRowIndex; i < MAIN_ROW_COUNT; i++) {
                mainRow = rows[i];

                if (vcJoinValue === mainRow[mainJoinColIndex]) {
                  mainRow[MAIN_COL_COUNT + colIndex] = vcRow[valueColIndex];
                  (mainRow.joinValues = mainRow.joinValues || [])[MAIN_COL_COUNT + colIndex] = _lodash.default.zipObject(vcHeaders, vcRow);
                  mainRowIndex = i;
                  isChanged = true;
                } else if (isChanged) {
                  // NOTE:  Return here to avoid checking `i` outside of loop.
                  return vcAddedHeaders;
                }
              } // If new header was added but join was unsuccessful remove the new
              // header.


              if (isNewVCHeader) {
                vcAddedHeaders.pop();
              }

              return vcAddedHeaders;
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

        var colDef;
        colDefRgxs.find(function (colDefRgx, colDefIndex) {
          if (colDefRgx.test(column.text)) {
            colDef = colDefs[colDefIndex];
            var gcvOptions = {
              cell: column.text,
              cellsByColName: {},
              rule: {
                type: 'FILTER'
              },
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

            _lodash.default.extend(column, {
              colDef: colDef,
              colDefContentRuleFilters: colDefContentRuleFilters[colDefIndex],
              html: html,
              visible: colDef.isVisible
            });

            return true;
          }
        });
        column.filter = {
          ignore: true,
          negate: false,
          text: '',
          includeTrue: false,
          includeFalse: false,
          includeNull: false,
          minNum: null,
          maxNum: null,
          minDate: null,
          maxDate: null,
          includeMin: false,
          includeMax: false,
          dataType: JS.nativeType((rows.find(function (row) {
            return row[colIndex] != undefined;
          }) || [])[colIndex]),
          test: function test(value) {
            var negate = this.negate,
                text = this.text,
                includeTrue = this.includeTrue,
                includeFalse = this.includeFalse,
                includeNull = this.includeNull,
                minNum = this.minNum,
                maxNum = this.maxNum,
                minDate = this.minDate,
                maxDate = this.maxDate,
                includeMin = this.includeMin,
                includeMax = this.includeMax,
                dataType = this.dataType;
            var min = minNum != undefined ? minNum : minDate;
            var max = maxNum != undefined ? maxNum : maxDate;

            if (dataType === 'Date' || dataType === 'Number' || dataType === 'BigInt') {
              return (value == undefined ? includeNull : (min == undefined || (includeMin ? min <= value : min < value)) && (max == undefined || (includeMax ? value <= max : value < max))) !== negate;
            } else if (dataType === 'Boolean') {
              return (includeTrue && value || includeFalse && !value || includeNull && value == undefined) !== negate;
            }

            return (this.matchTerms(value) || includeNull && value == undefined) !== negate;
          },
          matchTerms: function matchTerms() {
            return true;
          }
        };
        column.filter.test = column.filter.test.bind(column.filter);

        if (!_lodash.default.has(column, 'html')) {
          column.html = _lodash.default.escape(column.text);
        }

        columns[colIndex] = column;
      });
      return data;
    }
  }, {
    key: "fixDataTableSize",
    value: function fixDataTableSize(opt_onlyFixHeight) {
      var jElem = this.panelElement;
      var fullHeight = jElem.height();
      var jWrap = jElem.find('.dataTables_wrapper');

      if (jWrap.length) {
        var wrapHeight = jWrap.height();
        var jScrollBody = jWrap.find('.dataTables_scrollBody');
        var scrollHeight = jScrollBody.height();
        var nonScrollHeight = wrapHeight - scrollHeight;
        jScrollBody.css('max-height', fullHeight - nonScrollHeight);
      } // Make sure the column headers get resized


      if (this.dataTable && !opt_onlyFixHeight) {
        this.dataTable.columns().draw();
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
    key: "setPanelValue",
    value: function setPanelValue(rootVar, path, value) {
      _lodash.default.set(rootVar, path, value);

      this.autoRedraw();
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
DataTablePanelCtrl.prototype.autoRedraw = _lodash.default.debounce(function () {
  if (this.panel.allowRedrawOnModify) {
    this.drawIfChanged.apply(this, arguments);
  }
}, 500);
DataTablePanelCtrl.templateUrl = 'partials/module.html';
//# sourceMappingURL=ctrl.js.map
