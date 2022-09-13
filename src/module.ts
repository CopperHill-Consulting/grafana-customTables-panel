import * as gfData from '@grafana/data';
import { MetricsPanelCtrl } from 'grafana/app/plugins/sdk';
import { getValueFormats } from './format-values';
import _ from 'lodash';
import * as JS from './external/YourJS.min';
import { saveAs } from './external/FileSaver.min.js';
import {
  getCellValue,
  getHtmlText,
  parseLocalDate,
  parseOptionalNumber,
  parseRegExp,
  pseudoCssToJSON,
  saveXLSX,
  term,
  toCSV,
  toLocalDateString,
  unindentMin,
  vRegExp,
} from './helper-functions';
import './external/datatables/js/jquery.dataTables.min';
import './external/datatables/js/dataTables.fixedHeader.min';
import './external/datatables/js/dataTables.buttons.min';
import './external/datatables/css/jquery.dataTables.min.css';
import './external/datatables/css/fixedHeader.dataTables.min.css';
import './external/datatables/css/buttons.dataTables.min.css';
import jQuery from 'jquery';

const PARTIALS_BASE_PATH = 'public/plugins/copperhill-datatables-panel/partials/';

const RGX_SIMPLE_NUMBER = /^\d+(\.\d+)?$/;

export class DataTablePanelCtrl extends MetricsPanelCtrl {
  $rootScope;
  columns!: any[];
  panelJSON!: string;
  panelElement!: any;
  dataList: any;
  dataListOptions?: Array<{ id: any; text: any }>;
  dataTable: any;
  element: any;
  pageLengthOptions: any;
  throttleDraw: any;
  processedDataList: any;

  static templateUrl = 'partials/module.html';
  static DEFAULT_PSEUDO_CSS = unindentMin(`
  .theme-dark & {
    color: white;
    
    .dataTables_filter input[type=search] {
      border: 1px solid #262628;
    }
  }
  .dataTables_filter input[type=search] {
    border: 1px solid #dde4ed;
    height: 35px;
    line-height: 35px;
    border-radius: 5px;
    padding: 0 8px;
  }
  table.dataTable tbody tr {
    &:hover td {
      background-image: linear-gradient(0deg, rgba(128,128,128,0.1), rgba(128,128,128,0.1));
    }
    &, &.even, &.odd {
      background-color: transparent;
      td {
        border-color: transparent;
      }
    }
    &.odd {
      background-color: rgba(128,128,128,0.3);
    }
    &.even {
      background-color: rgba(128,128,128,0.15);
    }
  }
  `);
  static DEFAULT_COL_DEF_JS = unindentMin(`
  /**
   * The function that is called to process the array of received datasets.
   * @template {Dataset[]} T
   * @param {T} datasets
   * @returns {T}
   */
  function processData(datasets) {
    return datasets;
  }
  /**
   * @typedef {Object} Dataset
   * @property {{text: string}[]} columns
   * @property {boolean} isReal
   * @property {{executedQueryString: boolean}} meta
   * @property {string} refId
   * @property {any[][]} rows
   * @property {string} type
   */
  `);

  static UNIT_FORMATS = getValueFormats();

  static TOOLTIP_PLACEMENTS = [
    { id: 'TOP', text: 'Top' },
    { id: 'LEFT', text: 'Left' },
    { id: 'RIGHT', text: 'Right' },
    { id: 'BOTTOM', text: 'Bottom' },
  ];

  static CONTENT_RULE_TYPES = [
    { id: 'FILTER', text: 'Filter by exact value or RegExp' },
    { id: 'RANGE', text: 'Match a range of values' },
    { id: 'NULL', text: 'Is NULL' },
  ];

  static CONTENT_RULE_CLASS_LEVELS = [
    { id: 'CELL', text: 'Only the cell' },
    { id: 'ROW', text: 'Entire row' },
  ];

  static TZ_OFFSET_TYPES = [
    { id: null, text: 'Default' },
    { id: 'NO-TIMEZONE', text: 'Local Timezone' },
    { id: 'NO-TIMEZONE-REVERSE', text: 'Reverse Local Timezone' },
    { id: 'TIMEZONE', text: 'Specify Minute Offset' },
  ];

  static CONTENT_RULE_MAX_VALUE_OPS = [
    { id: '', text: '' },
    { id: '>=', text: 'value \u2265 cell (greater than or equal to)' },
    { id: '>', text: 'value > cell (greater than)' },
  ];

  static CONTENT_RULE_MIN_VALUE_OPS = [
    { id: '', text: '' },
    { id: '<', text: 'value < cell (less than)' },
    { id: '<=', text: 'value \u2264 cell (less than or equal to)' },
  ];

  static CONTENT_RULE_EXACT_NUM_OPS = [
    { id: '==', text: '= (equals)' },
    { id: '!=', text: "\u2260 (doesn't)" },
  ];

  static DEFAULT_PANEL_SETTINGS = {
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
    colDefJS: DataTablePanelCtrl.DEFAULT_COL_DEF_JS,
    pseudoCSS: DataTablePanelCtrl.DEFAULT_PSEUDO_CSS,
    varCols: {
      dataRefId: null,
      mainJoinColumn: null,
      joinColumn: null,
      nameColumn: null,
      valueColumn: null,
    },
    tzOffsetType: null,
    tzOffset: 0,
    columnFilters: [],
  };

  constructor($scope, $injector, $rootScope) {
    super($scope, $injector);

    this.$rootScope = $rootScope;

    // Make sure old versions have this value set to false.
    if (!_.has(this.panel, 'allowRedrawOnModify')) {
      this.panel.allowRedrawOnModify = false;
    }

    _.defaultsDeep(this.panel, DataTablePanelCtrl.DEFAULT_PANEL_SETTINGS);

    this.events.on('init-edit-mode', this.onInitEditMode.bind(this));
    this.events.on('data-received', this.onDataReceived.bind(this));
    this.events.on('data-snapshot-load', this.onDataReceived.bind(this));
    this.events.on('data-error', this.onDataError.bind(this));
    this.events.on('init-panel-actions', this.onInitPanelActions.bind(this));
    this.events.on('render', this.onPanelSizeChanged.bind(this));
    this.events.on('view-mode-changed', this.draw.bind(this));
    this.events.on('panel-teardown', this.onDataTablePanelTeardown.bind(this));
    Object.values(gfData.PanelEvents).forEach(({name}) => {
      this.events.on(name, function() {
        console.debug(name, arguments);
      });
    });

    jQuery.fn.dataTable.ext.search.push(this.filterDataTable.bind(this));
  }

  filterDataTable(settings, data, rowIndex, originalData) {
    return arguments.length === 0
      ? this
      : this.panel.allowFiltering
      ? originalData.isProcessed
        ? this.columns.every(function(column, columnIndex) {
            let { filter } = column;
            return (
              !column.visible ||
              column?.colDef?.isSearchable === false ||
              !filter ||
              filter.ignore ||
              filter.test(originalData[columnIndex].value)
            );
          })
        : this.columns.every(function(column, columnIndex) {
            let { filter } = column;
            return (
              !column.visible ||
              column?.colDef?.isSearchable === false ||
              !filter ||
              filter.ignore ||
              filter.test(originalData[columnIndex])
            );
          })
      : true;
  }

  drawIfChanged() {
    if (this.panelJSON !== this.getPanelSettingsJSON()) {
      this.draw();
    }
  }

  getPanelSettingsJSON(spacing?) {
    let panel = this.panel;
    return JSON.stringify(
      panel,
      function(key, value) {
        return this !== panel || _.has(DataTablePanelCtrl.DEFAULT_PANEL_SETTINGS, key) ? value : undefined;
      },
      spacing
    );
  }

  onDataTablePanelTeardown() {
    let { search } = jQuery.fn.dataTable.ext;
    for (var i = search.length; i--; ) {
      if (search[i]() === this) {
        search.splice(i, 1);
      }
    }
  }

  onPanelSizeChanged() {
    this.fixDataTableSize();
  }

  onInitEditMode() {
    this.addEditorTab('Table View', `${PARTIALS_BASE_PATH}refresh-view.html`, 1);
    this.addEditorTab('Variable Columns', `${PARTIALS_BASE_PATH}var-cols.html`, 2);
    this.addEditorTab('Editor', `${PARTIALS_BASE_PATH}editor.html`, 3);
    this.addEditorTab('Column Definitions', `${PARTIALS_BASE_PATH}column-defs.html`, 4);
    this.addEditorTab('Styles', `${PARTIALS_BASE_PATH}styles.html`, 5);
    this.addEditorTab('Table View', `${PARTIALS_BASE_PATH}refresh-view.html`, 6);
  }

  onInitPanelActions(actions) {
    actions.push({
      icon: 'fa fa-download',
      text: 'Download As\u2026',
      click: 'ctrl.showDownloadModal()',
    });
  }

  onDataError() {
    this.draw();
  }

  onDataReceived(dataList) {
    // let { tzOffsetType, tzOffset } = this.panel;
    // const LOCAL_TZ_OFFSET = (new Date).getTimezoneOffset();
    if (dataList && dataList.length) {
      dataList.forEach(data => {
        data.isReal = true;
        data.rows.forEach(cells => {
          cells.forEach((cell, cellIndex) => {
            if (/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\dZ$/.test(cell)) {
              cells[cellIndex] = new Date(cell);
            }
          });
        });
      });
      this.dataList = dataList;
    }
    else {
      let EXTRA_COLS = 2;
      this.dataList = [
        {
          columns: [{ text: 'X' }, { text: 'X * X' }, { text: 'X + X' }].concat(
            _.range(EXTRA_COLS).map(y => ({ text: `${y} / Math.random()` }))
          ),
          rows: _.range(150).map(x => [x, x * x, x + x].concat(_.range(EXTRA_COLS).map(y => y / Math.random()))),
          isReal: false,
          type: 'table',
        },
      ];
    }

    this.draw();
  }

  getConstByName(name) {
    if (/^[A-Z_][A-Z_0-9]*$/.test(name)) {
      return DataTablePanelCtrl[name];
    }
  }

  addColumnDef() {
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
      contentRules: [],
    });
  }

  moveColumnDef(columnDef, offset) {
    let columnDefs = this.panel.columnDefs;
    let colDefIndex = columnDefs.indexOf(columnDef);
    let newColDefIndex = colDefIndex + offset;
    if (0 <= newColDefIndex && newColDefIndex < columnDefs.length) {
      columnDefs.splice(colDefIndex, 1);
      columnDefs.splice(newColDefIndex, 0, columnDef);
    }
  }

  removeColumnDef(columnDef) {
    let columnDefs = this.panel.columnDefs;
    columnDefs.splice(columnDefs.indexOf(columnDef), 1);
  }

  addColumnContentRule(columnDef) {
    columnDef.contentRules.push({
      type: DataTablePanelCtrl.CONTENT_RULE_TYPES[0].id,
      classNames: '',
      classLevel: DataTablePanelCtrl.CONTENT_RULE_CLASS_LEVELS[0].id,
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
        placement: DataTablePanelCtrl.TOOLTIP_PLACEMENTS[0].id,
      },
    });
  }

  removeColumnContentRule(contentRule, columnDef) {
    let contentRules = columnDef.contentRules;
    contentRules.splice(contentRules.indexOf(contentRule), 1);
  }

  updateDataListOptions() {
    this.dataListOptions = [{}].concat(this.processedDataList).map((x, i) => ({
      id: i ? (x as any).refId : null,
      text: i ? (x as any).refId : '--- NONE ---',
    }));
  }

  getPageLengthOptions() {
    return this.panel.pageLengths
      .replace(/\s+/g, '')
      .split(',')
      .reduce((arr, x) => {
        if (+x === parseInt(x, 10) && +x >= -1) {
          x = +x === -1 ? Infinity : +x;
          arr.push({ value: x, text: x === Infinity ? 'All' : x });
        }
        return arr;
      }, []);
  }

  showDownloadModal() {
    const FILE_NAME_PATTERN = "<TITLE> (YYYY-MM-DD 'at' H.mm.ss)";
    let ctrl = this;
    ctrl.publishAppEvent('show-modal', {
      src: `${PARTIALS_BASE_PATH}modal-export.html`,
      scope: _.extend(ctrl.$scope.$new(true), {
        fileNamePattern: FILE_NAME_PATTERN,
        fileNamePatternPlaceholder: FILE_NAME_PATTERN,
        EXPORT_TYPES: [
          { value: 'CSV', text: 'CSV (Comma-separated values)' },
          { value: 'JSON', text: 'JSON (JavaScript Object Notation)' },
          { value: 'PSV', text: 'PSV (Pipe-separated values)' },
          { value: 'TSV', text: 'TSV (Tab-separated values)' },
          { value: 'XLSX', text: 'XLSX Workbook (Data Only)' },
        ],
        exportType: 'CSV',
        getFileName() {
          return ctrl.getFileName(this.fileNamePattern, this.exportType);
        },
        download(downloadAllData: boolean) {
          if (this.exportType === 'CSV') {
            ctrl.exportCSV(downloadAllData, this.fileNamePattern);
          } else if (this.exportType === 'JSON') {
            ctrl.exportJSON(downloadAllData, this.fileNamePattern);
          } else if (this.exportType === 'PSV') {
            ctrl.exportCSV(downloadAllData, this.fileNamePattern, { delimiter: '|', ext: 'psv' });
          } else if (this.exportType === 'TSV') {
            ctrl.exportCSV(downloadAllData, this.fileNamePattern, { delimiter: '\t', ext: 'tsv' });
          } else if (this.exportType === 'XLSX') {
            ctrl.exportXLSX(downloadAllData, this.fileNamePattern);
          }
        },
      }),
      modalClass: 'modal-confirm',
    });
  }

  exportData(exportAllData: boolean) {
    let header,
      rows,
      data = this.getData(),
      { columns } = data;
    if (exportAllData) {
      header = this.dataTable
        .columns()
        .header()
        .toArray()
        .map(x => x.innerText);
      rows = Array.from(this.dataTable.data());
    } else {
      let exportedData = this.dataTable.buttons.exportData();
      header = exportedData.header;
      rows = exportedData.body;
    }
    return { header, rows, data, columns };
  }

  exportJSON(exportAllData: boolean, fileNamePattern: string) {
    let { columns, data, header, rows } = this.exportData(exportAllData);
    const HEADER_TEXTS = columns.filter(c => c.visible).map(c => getHtmlText(c.html));
    this.processRows(rows, columns, header, this.getVarsByName());
    rows = rows.map(row =>
      row.reduce((objRow, cell, cellIndex) => {
        if (cell.visible) {
          objRow[HEADER_TEXTS[cellIndex]] = getHtmlText(cell.html);
        }
        return objRow;
      }, {})
    );
    let blob = new Blob([JSON.stringify({ headers: HEADER_TEXTS, rows })], { type: 'application/json;charset=utf-8' });
    saveAs(blob, this.getFileName(fileNamePattern, 'json'));
  }

  exportCSV(exportAllData: boolean, fileNamePattern: string, opt_options?) {
    opt_options = Object(opt_options);

    let { columns, data, header, rows } = this.exportData(exportAllData);
    this.processRows(rows, columns, header, this.getVarsByName());

    let csvText = toCSV(
      rows.map(row =>
        row.reduce((carry, cell) => {
          if (cell.visible) {
            carry.push(getHtmlText(cell.html));
          }
          return carry;
        }, [])
      ),
      _.extend(
        {
          headers: columns.reduce((carry, col) => {
            if (col.visible) {
              carry.push(getHtmlText(col.html));
            }
            return carry;
          }, []),
        },
        Object(opt_options)
      )
    );
    let ext = (opt_options.ext || 'csv').toLowerCase();
    let mimeType = 'text/' + (ext === 'tsv' ? 'tab-separated-values' : ext);
    let blob = new Blob([csvText], { type: `${mimeType};charset=utf-8` });
    saveAs(blob, this.getFileName(fileNamePattern, ext));
  }

  exportXLSX(exportAllData: boolean, fileNamePattern: string) {
    let { columns, data, header, rows } = this.exportData(exportAllData);
    this.processRows(rows, columns, header, this.getVarsByName());

    saveXLSX({
      fileName: this.getFileName(fileNamePattern, 'xlsx'),
      worksheets: [
        {
          name: 'Main',
          headers: columns.reduce((carry, col) => {
            if (col.visible) {
              carry.push(getHtmlText(col.html));
            }
            return carry;
          }, []),
          rows: rows.map(row =>
            row.reduce((carry, cell) => {
              if (cell.visible) {
                carry.push(getHtmlText(cell.html));
              }
              return carry;
            }, [])
          ),
        },
      ],
    });
  }

  getFileName(pattern, ext) {
    return (
      pattern
        // Replace the meta groups and date formatting.
        .replace(
          vRegExp`
          (?g)                      // Global regexp
          <(TITLE|DASHBOARD|PANEL)> // Source type
          |
          [^<]+                     // Characters to run through JS.formatDate().
        `,
          (match, source) =>
            source
              ? source === 'TITLE'
                ? this.panel.title || this.dashboard.title
                : this[source.toLowerCase()].title
              : JS.formatDate(new Date(), match)
        )
        // Replace 1 or more consecutive invalid file name characters with an
        // underscore.
        .replace(/[<>:"\\\/\|\?\*]+/g, '_') +
      // Add the extension.
      '.' +
      ext.toLowerCase()
    );
  }

  getVarsByName() {
    return this.templateSrv.variables.reduce((carry, variable) => {
      // At times current.value is a string and at times it is an array.
      let varValues = JS.toArray(variable.current.value);
      let isAll = variable.includeAll && varValues.length === 1 && varValues[0] === '$__all';
      carry[variable.name] = isAll ? [variable.current.text] : varValues;
      return carry;
    }, {});
  }

  drawDataTable(data) {
    let ctrl = this;
    let panel = ctrl.panel;
    let jElem = ctrl.panelElement;
    let height = jElem.height();
    let columns = (ctrl.columns = data.columns);
    let rows = data.rows;
    let varsByName = ctrl.getVarsByName();
    let domTable = { _: 'table', style: {} };
    if (panel.isFullWidth) {
      (domTable.style as any).width = '100%';
    }

    let table = JS.dom(domTable);
    let jTable = jQuery(table).appendTo(jElem.html(''));
    let headers = data.headers;
    let dataTableOpts = {
      columns: columns.map((column, colIndex) => {
        let result = {
          title: getHtmlText(column.html),
          visible: column.visible,
        };

        let colDef = column.colDef;
        if (colDef && column.visible) {
          if (colDef.width) {
            (result as any).width = colDef.width;
          }
          if (colDef.classNames) {
            (result as any).className = colDef.classNames;
          }
          (result as any).orderable = colDef.isOrderable;
          (result as any).searchable = colDef.isSearchable;
        }

        return result;
      }),
      headerCallback(tr) {
        let thIndex = 0;

        // Loop through each column...
        columns.forEach((col, colIndex) => {
          if (col.visible) {
            let jTH = jQuery('>th', tr)
              .eq(thIndex++)
              .html(col.html);
            if (panel.allowFiltering && (!col.colDef || col.colDef.isSearchable)) {
              let { filter } = col;
              let colDataType = _.get(filter, 'dataType', 'String');

              const showFilterModal = (e?) => {
                e && e.stopPropagation();

                const ID_SUFFIX = +new Date();

                let filterCopy = _.extend(_.cloneDeep(filter), {
                  minDate: toLocalDateString(filter.minDate),
                  maxDate: toLocalDateString(filter.maxDate),
                });

                ctrl.publishAppEvent('show-modal', {
                  src: `${PARTIALS_BASE_PATH}modal-column-filter.html`,
                  scope: _.extend(ctrl.$scope.$new(true), {
                    isEditing: ctrl.dashboard.meta.isEditing,
                    column: _.cloneDeep(col),
                    columnDataType: colDataType,
                    ID_SUFFIX,
                    filter: filterCopy,
                    removeFilter() {
                      filter.clear();
                      ctrl.dataTable.draw();
                      this.dismiss();
                    },
                    saveFilter() {
                      let scopeFilter = this;
                      let ignore;
                      if (colDataType === 'Date' || colDataType === 'Number' || colDataType === 'BigInt') {
                        if (colDataType === 'Date') {
                          filter.minDate = parseLocalDate(scopeFilter.filter.minDate, ctrl, true);
                          filter.maxDate = parseLocalDate(scopeFilter.filter.maxDate, ctrl, true);
                        } else {
                          filter.minNum = parseOptionalNumber(scopeFilter.filter.minNum);
                          filter.maxNum = parseOptionalNumber(scopeFilter.filter.maxNum);
                        }
                        ignore =
                          (filter.minNum === null || filter.minNum === undefined) &&
                          (filter.maxNum === null || filter.maxNum === undefined) &&
                          (filter.minDate === null || filter.minDate === undefined) &&
                          (filter.maxDate === null || filter.maxDate === undefined);
                        filter.includeMin = scopeFilter.filter.includeMin;
                        filter.includeMax = scopeFilter.filter.includeMax;
                      } else if (colDataType === 'Boolean') {
                        filter.includeTrue = scopeFilter.filter.includeTrue;
                        filter.includeFalse = scopeFilter.filter.includeFalse;
                        ignore = !filter.includeTrue && !filter.includeFalse;
                      } else {
                        filter.text = scopeFilter.filter.text.trim();
                        filter.matchTerms = term(filter.text, { matchWordStart: true });
                        ignore = filter.text === '';
                      }
                      filter.includeNull = scopeFilter.filter.includeNull;
                      filter.negate = scopeFilter.filter.negate;
                      filter.ignore = ignore && !filter.includeNull;

                      // Save column filters only if in editor mode
                      if (ctrl.dashboard.meta.isEditing) {
                        ctrl.panel.columnFilters = columns.reduce((columnFilters, column) => {
                          let filter;
                          if (column.visible && (filter = column.filter) && !filter.ignore) {
                            columnFilters.push({
                              columnText: column.text,
                              ignore: filter.ignore,
                              negate: filter.negate,
                              text: filter.text,
                              includeTrue: filter.includeTrue,
                              includeFalse: filter.includeFalse,
                              includeNull: filter.includeNull,
                              minNum: filter.minNum,
                              maxNum: filter.maxNum,
                              minDate: toLocalDateString(filter.minDate),
                              maxDate: toLocalDateString(filter.maxDate),
                              includeMin: filter.includeMin,
                              includeMax: filter.includeMax,
                              dataType: filter.dataType,
                            });
                          }
                          return columnFilters;
                        }, []);
                      }

                      ctrl.dataTable.draw();
                      this.dismiss();
                    },
                    includes: (arr, value) => arr.includes(value),
                  }),
                  modalClass: 'modal-confirm',
                });
              };

              jTH.prepend(
                JS.dom({
                  _: 'i',
                  cls: 'fa fa-filter ' + (filter.ignore ? 'off' : 'on'),
                  style: (filter.ignore ? 'opacity:0.25;' : '') + 'margin-right:0.25em;cursor:pointer;',
                  onclick: showFilterModal,
                })
              );
            }
          }
        });
      },
      data: rows,
      rowCallback(tr, rowData, pageDisplayIndex, displayIndex, rowIndex) {
        if (!rowData.isProcessed) {
          ctrl.processRows([rowData], columns, headers, varsByName);
        }
        for (
          let cell, cellValue, tdIndex = 0, cellCount = rowData.length, colIndex = 0;
          colIndex < cellCount;
          colIndex++
        ) {
          cell = rowData[colIndex];

          if (cell.visible) {
            let jTD = jQuery('> td', tr).eq(tdIndex++);
            if (cell.cls && cell.cls.level === 'CELL') {
              jTD.addClass(cell.cls.names);
            }
            let colDef = columns[colIndex].columnDef;
            if (colDef && colDef.classNames) {
              jTD.addClass(colDef.classNames);
            }
            let html = cell.html;
            if (cell.tooltip) {
              html = `<div data-tooltip data-original-title="${_.escape(cell.tooltip.display)}" data-placement="${
                cell.tooltip.placement
              }" class="d-inline-block">${html}</div>`;
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
      searching: true, // Visibility is controlled via CSS to allow for custom filtering
      lengthChange: panel.allowLengthChange,
      lengthMenu: ctrl
        .getPageLengthOptions()
        .reduce(
          (arr, opt) => [
            arr[0].concat([opt.value === Infinity ? -1 : opt.value]),
            arr[1].concat([opt.value === Infinity ? 'All' : opt.value]),
          ],
          [[], []]
        ),
      pageLength: panel.initialPageLength,
      order: [],
    };
    ctrl.dataTable = jTable.DataTable(dataTableOpts);
    globalThis[`ctrl${+new Date()}`] = ctrl;

    // Horizontally center tables that are not full page width.
    jElem.find('.dataTables_scrollHeadInner').css('margin', '0 auto');

    // Control visibility here instead in options to allow for custom filtering.
    if (!panel.allowSearching) {
      jElem.find('.dataTables_filter').css('display', 'none');
    }

    // Resize the scroll body of the table.
    ctrl.fixDataTableSize(true);

    // Remove the old class names from the wrapper element and add a new
    // targeted stylesheet.
    jElem.each((i, elem) => {
      elem.className = elem.className
        .replace(/\b_\d+\b/g, ' ')
        .replace(/\s+/g, ' ')
        .trim();
      elem.appendChild(JS.css(JSON.parse(pseudoCssToJSON(panel.pseudoCSS)), elem));
    });
  }

  processRows(rows, columns, headers, varsByName) {
    let ctrl = this;

    for (let row, rowCount = rows.length, rowIndex = 0; rowIndex < rowCount; rowIndex++) {
      row = rows[rowIndex];
      if (!row.isProcessed && !(row[0] || {}).isProcessed) {
        for (let cell, cellValue, tdIndex = 0, cellCount = row.length, colIndex = 0; colIndex < cellCount; colIndex++) {
          let ruleApplied;
          let column = columns[colIndex];
          let colDef = column.colDef;

          cellValue = row[colIndex];

          cell = {
            html: cellValue,
            visible: column.visible,
            value: cellValue,
            valueOf() {
              return cellValue;
            },
            toString() {
              return cellValue + '';
            },
            isProcessed: true,
          };

          if (colDef) {
            let rules = colDef.contentRules;
            let cellsByColName = {};
            for (let ci = row.length; ci--; ) {
              cellsByColName[headers[ci]] = row[ci];
            }

            for (let rule, ruleCount = rules.length, ruleIndex = 0; ruleIndex < ruleCount; ruleIndex++) {
              rule = rules[ruleIndex];
              let isMatch = true;
              let type = rule.type;
              let colDefContentRuleFilter = column.colDefContentRuleFilters[ruleIndex];
              let gcvOptions = {
                cell: cell.html,
                cellsByColName,
                joinValues: row.joinValues,
                colIndex,
                rule,
                rgx: colDefContentRuleFilter,
                ctrl,
                varsByName,
              };
              if (type === 'FILTER') {
                isMatch = colDefContentRuleFilter.test(cell.html);
              } else if (type === 'RANGE') {
                let minValue = rule.minValue;
                let minIsNum = RGX_SIMPLE_NUMBER.test(minValue);
                let maxValue = rule.maxValue;
                let maxIsNum = RGX_SIMPLE_NUMBER.test(maxValue);
                if (minIsNum) {
                  minValue = +minValue;
                }
                if (maxIsNum) {
                  maxValue = +maxValue;
                }

                if (minIsNum || maxIsNum) {
                  cellValue = +cellValue;
                }

                let minValueOp = rule.minValueOp;
                if (minValueOp) {
                  isMatch = isMatch && (minValueOp === '<=' ? minValue <= cellValue : minValue < cellValue);
                }
                let maxValueOp = rule.maxValueOp;
                if (maxValueOp) {
                  isMatch = isMatch && (maxValueOp === '>=' ? maxValue >= cellValue : maxValue > cellValue);
                }
              } else {
                isMatch = cell.html == null;
              }

              isMatch = isMatch !== rule.negateCriteria;

              // If this is a match apply the class(es)
              if (isMatch) {
                if (rule.classNames) {
                  cell.cls = {
                    names: getCellValue(rule.classNames, false, gcvOptions),
                    level: rule.classLevel,
                  };
                }

                // Set the display
                let displayHTML = getCellValue(rule.display, false, gcvOptions);
                if (!rule.displayIsHTML) {
                  displayHTML = _.escape(displayHTML);
                }
                if (rule.url) {
                  let url = _.escape(getCellValue(rule.url, true, gcvOptions));
                  let target = rule.openNewWindow ? '_blank' : '';
                  let tooltipHTML = '';
                  if (rule.tooltip.isVisible) {
                    cell.tooltip = {
                      display: getCellValue(rule.tooltip.display, false, gcvOptions),
                      placement: rule.tooltip.placement.toLowerCase(),
                    };
                  }
                  displayHTML = `<a href="${url}" target="${target}">${displayHTML}</a>`;
                }
                cell.html = displayHTML;
                ruleApplied = rule;

                break; // Break out of rules loop
              }
            } // End of rules for-loop
          } // End if (colDef) {...}

          if (!ruleApplied) {
            cell.html = _.escape(cell.html);
          }

          row[colIndex] = cell;
        } // End of row for-loop
      } // End if (!row.isProcessed) {...}
      row.isProcessed = true;
    } // End of rows for-loop
  }

  getVarColColumns() {
    let data = this.getVarColsData();
    return data ? data.columns : [];
  }

  getVarColsData() {
    let varCols = this.panel.varCols;
    let dataRefId = varCols && varCols.dataRefId;
    let dataList = this.processedDataList;
    return dataList && dataList.find(({ refId }) => refId === dataRefId);
  }

  putVarColsIn(data) {
    let varCols = this.panel.varCols;
    let columns = data.columns;
    let rows = data.rows.slice();

    const MAIN_COL_COUNT = columns.length;
    const MAIN_ROW_COUNT = rows.length;

    if (varCols) {
      let vcData = this.getVarColsData();
      if (vcData) {
        let vcHeaders = vcData.columns.map(col => col.text);
        let mainJoinColIndex = columns.findIndex(c => c.text === varCols.mainJoinColumn);
        let joinColIndex = vcHeaders.indexOf(varCols.joinColumn);
        let nameColIndex = vcHeaders.indexOf(varCols.nameColumn);
        let valueColIndex = vcHeaders.indexOf(varCols.valueColumn);
        if (mainJoinColIndex >= 0 && joinColIndex >= 0 && nameColIndex >= 0 && valueColIndex >= 0) {
          let mainRowIndex = 0;

          // Order a sliced version of the main `rows` using the join column.
          rows.sort((a, b) => (a[mainJoinColIndex] < b[mainJoinColIndex] ? -1 : 1));

          // Order a sliced version of the varCols rows using the join column.
          let vcRowsPrime = vcData.rows;
          let vcRows = vcRowsPrime.slice().sort((a, b) => (a[joinColIndex] < b[joinColIndex] ? -1 : 1));

          // Used later to reorder the new columns by the order they were found
          // in the data.
          let vcColIndexPairs: any[] = [];

          vcRows
            // Get a list of all of the new headers while simultaneously adding
            // the data to the appropriate rows and in the appropriate columns.
            .reduce((vcAddedHeaders, vcRow) => {
              let vcHeader = vcRow[nameColIndex];
              let vcJoinValue = vcRow[joinColIndex];
              let colIndex = vcAddedHeaders.indexOf(vcHeader);
              let isNewVCHeader = colIndex < 0;

              // If the new column wasn't found add it.
              if (isNewVCHeader) {
                colIndex = vcAddedHeaders.push(vcHeader) - 1;
              }

              // Since everything is ordered continue in `rows` looking for the
              // join and if found add the value there while setting the new row's
              // index as `mainRowIndex`.
              for (let isChanged, mainRow, i = mainRowIndex; i < MAIN_ROW_COUNT; i++) {
                mainRow = rows[i];
                if (vcJoinValue === mainRow[mainJoinColIndex]) {
                  mainRow[MAIN_COL_COUNT + colIndex] = vcRow[valueColIndex];
                  (mainRow.joinValues = mainRow.joinValues || [])[MAIN_COL_COUNT + colIndex] = _.zipObject(
                    vcHeaders,
                    vcRow
                  );
                  mainRowIndex = i;
                  isChanged = true;
                } else if (isChanged) {
                  // NOTE:  Return here to avoid checking `i` outside of loop.
                  return vcAddedHeaders;
                }
              }

              // If new header was added but join was unsuccessful remove the new
              // header.
              if (isNewVCHeader) {
                vcAddedHeaders.pop();
              }

              return vcAddedHeaders;
            }, [])
            // Add the new `columns`.
            .forEach((vcHeader, vcHeaderIndex) => {
              vcColIndexPairs.push({
                first: vcRowsPrime.findIndex(vcRow => vcRow[nameColIndex] === vcHeader),
                index: vcHeaderIndex + MAIN_COL_COUNT,
              });
              columns.push({ text: vcHeader });
            });

          // Used to reorder all of the var-cols
          vcColIndexPairs.sort((a, b) => a.first - b.first);
          const SPLICE_ARGS = [MAIN_COL_COUNT, vcColIndexPairs.length];

          // Reorder all of the var-cols
          columns.splice.apply(columns, SPLICE_ARGS.concat(vcColIndexPairs.map(pair => columns[pair.index])));

          // Reorder all of the var-col cells in each row.
          rows.forEach(row => {
            row.splice.apply(
              row,
              SPLICE_ARGS.concat(
                vcColIndexPairs.map(pair => {
                  pair = row[pair.index];
                  return pair === undefined ? null : pair;
                })
              )
            );
          });
        }
      }
    }
  }

  /**
   * Updates the `processedDataList` property of this panel's instance.
   */
  updateProcessedDataList() {
    const {colDefJS} = this.panel;
    this.processedDataList = JSON.parse(JSON.stringify(this.dataList));
    if (colDefJS !== DataTablePanelCtrl.DEFAULT_COL_DEF_JS && (colDefJS || '').trim() !== '') {
      this.processedDataList = new Function(`${colDefJS}\nreturn processData(arguments[0])`)(this.processedDataList);
    }
    this.updateDataListOptions();
  }

  getData() {
    let ctrl = this;

    // Update this.processedDataList
    ctrl.updateProcessedDataList();

    let dataList = ctrl.processedDataList[0];
    let columns = dataList.columns.map(col => _.cloneDeep(col));
    let rows = dataList.rows.map(row => row.slice());
    let varsByName = ctrl.getVarsByName();
    let panel = ctrl.panel;
    let colDefs = panel.columnDefs;
    let varCols = panel.varCols;
    let colDefRgxs = colDefs.map(colDef => parseRegExp(colDef.filter));
    let colDefContentRuleFilters = colDefs.map(colDef =>
      colDef.contentRules.map(rule => (rule.type === 'FILTER' ? parseRegExp(rule.filter) : null))
    );

    // Create the data object to be returned.
    let data = { columns, rows, type: dataList.type, refId: dataList.refId };

    // Add the variable columns to the data if there are any.
    this.putVarColsIn(data);

    // Make an array of column headers.
    let headers = ((data as any).headers = columns.map(col => col.text));

    columns.forEach((column, colIndex) => {
      if ('string' === typeof column) {
        column = { text: column, visible: true };
      } else {
        column.visible = true;
      }

      let colDef;
      colDefRgxs.find((colDefRgx, colDefIndex) => {
        if (colDefRgx.test(column.text)) {
          colDef = colDefs[colDefIndex];
          let gcvOptions = {
            cell: column.text,
            cellsByColName: {},
            rule: { type: 'FILTER' },
            rgx: colDefRgx,
            ctrl,
            varsByName,
          };
          column.text = getCellValue(colDef.display, false, gcvOptions);

          let html = colDef.displayIsHTML ? column.text : _.escape(column.text);

          if (colDef.url) {
            let url = _.escape(getCellValue(colDef.url, true, gcvOptions));
            let target = colDef.openNewWindow ? '_blank' : '';
            html = `<a href="${url}" target="${target}" onclick="event.stopPropagation()">${html}</a>`;
          }

          _.extend(column, {
            colDef,
            colDefContentRuleFilters: colDefContentRuleFilters[colDefIndex],
            html,
            visible: colDef.isVisible,
          });

          return true;
        }
        return false;
      });

      // Initialize the filter object...
      let originalFilter = {
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
        dataType: JS.nativeType(
          (rows.find(row => row[colIndex] !== null && row[colIndex] !== undefined) || [])[colIndex]
        ),
        matchTerms() {
          return true;
        },
      };
      let filter = (column.filter = Object.assign(
        {
          clear() {
            Object.assign(this, originalFilter);
          },
          dataType: JS.nativeType(
            (rows.find(row => row[colIndex] !== null && row[colIndex] !== undefined) || [])[colIndex]
          ),
          matchTerms() {
            return true;
          },
        },
        originalFilter
      ));

      // Add the test() function to the filter object while binding the filter
      // object to the test() function.
      (filter as any).test = function(value) {
        let {
          negate,
          text,
          includeTrue,
          includeFalse,
          includeNull,
          minNum,
          maxNum,
          minDate,
          maxDate,
          includeMin,
          includeMax,
          dataType,
        } = this;
        let min = minDate !== null && minDate !== undefined ? minDate.actual : minNum;
        let max = maxDate !== null && maxDate !== undefined ? maxDate.actual : maxNum;
        if (dataType === 'Date' || dataType === 'Number' || dataType === 'BigInt') {
          return (
            (value === null || value === undefined
              ? includeNull
              : (min === null || min === undefined || (includeMin ? min <= value : min < value)) &&
                (max === null || max === undefined || (includeMax ? value <= max : value < max))) !== negate
          );
        } else if (dataType === 'Boolean') {
          return (
            ((includeTrue && value) ||
              (includeFalse && !value) ||
              (includeNull && (value === null || value === undefined))) !== negate
          );
        }
        return !(this.matchTerms(value) || (includeNull && (value === null || value === undefined))) === negate;
      }.bind(filter);

      // If the column is visible, try to attach the saved column filter by
      // matching on the column text and the column data type.
      if (column.visible) {
        let columnFilter = ctrl.panel.columnFilters.find(columnFilter => {
          let result = filter.dataType === columnFilter.dataType && column.text === columnFilter.columnText;
          if (result) {
            _.extend(filter, {
              ignore: columnFilter.ignore,
              negate: columnFilter.negate,
              text: columnFilter.text,
              includeTrue: columnFilter.includeTrue,
              includeFalse: columnFilter.includeFalse,
              includeNull: columnFilter.includeNull,
              minNum: columnFilter.minNum,
              maxNum: columnFilter.maxNum,
              minDate: parseLocalDate(columnFilter.minDate, ctrl, true),
              maxDate: parseLocalDate(columnFilter.maxDate, ctrl, true),
              includeMin: columnFilter.includeMin,
              includeMax: columnFilter.includeMax,
              dataType: columnFilter.dataType,
            });
          }
          return result;
        });
      }

      if (!_.has(column, 'html')) {
        column.html = _.escape(column.text);
      }

      columns[colIndex] = column;
    });

    return data;
  }

  fixDataTableSize(opt_onlyFixHeight?) {
    let jElem = this.panelElement;
    let fullHeight = jElem.height();
    let jWrap = jElem.find('.dataTables_wrapper');
    if (jWrap.length) {
      let wrapHeight = jWrap.height();
      let jScrollBody = jWrap.find('.dataTables_scrollBody');
      let scrollHeight = jScrollBody.height();
      let nonScrollHeight = wrapHeight - scrollHeight;
      jScrollBody.css('max-height', fullHeight - nonScrollHeight);
    }

    // Make sure the column headers get resized
    if (this.dataTable && !opt_onlyFixHeight) {
      this.dataTable.columns().draw();
    }
  }

  draw() {
    let error;
    let isValid = false;
    let ctrl = this;
    let jElem = ctrl.element;
    let jContent = ctrl.panelElement.css('position', 'relative').html('');
    let elemContent = jContent[0];
    let data = ctrl.getData();

    ctrl.pageLengthOptions = ctrl.getPageLengthOptions();

    if (data && data.rows.length) {
      if (data.type === 'table') {
        try {
          ctrl.drawDataTable(data);
          ctrl.panelJSON = this.getPanelSettingsJSON();
          jElem.tooltip({ selector: '[data-tooltip]' });
          isValid = true;
        } catch (err) {
          error = err;
        }
      }
    }
    if (!isValid) {
      let msg = 'No data' + (error ? ':  \r\n' + error.message : '.');
      let elemMsg = JS.dom({
        _: 'div',
        style: { display: 'flex', alignItems: 'center', textAlign: 'center', height: '100%' },
        $: [{ _: 'div', cls: 'alert alert-error', style: { margin: '0px auto' }, text: msg }],
      });
      jContent.html('').append(elemMsg);
      if (error) {
        throw error;
      }
    }
  }

  setPanelValue(rootVar, path, value) {
    _.set(rootVar, path, value);
    this.autoRedraw();
  }

  autoRedraw() {
    throw new Error('Method not implemented.');
  }

  link(scope, elem, attrs, ctrl) {
    this.element = elem;
    this.panelElement = elem.find('grafana-panel > *:eq(0)');
    this.throttleDraw = _.debounce(this.draw.bind(this), 1000);
  }
}

DataTablePanelCtrl.prototype.autoRedraw = _.debounce(function() {
  if (this.panel.allowRedrawOnModify) {
    this.drawIfChanged.apply(this, arguments);
  }
}, 500);

export { DataTablePanelCtrl as PanelCtrl };
