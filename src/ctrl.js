import {MetricsPanelCtrl} from 'app/plugins/sdk';
import _ from 'lodash';
import * as JS from './external/YourJS.min';
import './external/helper-functions';
import './external/datatables/js/jquery.dataTables.min';
import './external/datatables/js/dataTables.fixedHeader.min';
import './external/datatables/css/jquery.dataTables.min.css!';
import './external/datatables/css/fixedHeader.dataTables.min.css!';

const DEFAULT_PSEUDO_CSS = `
.theme-dark & {
  color: white;
}
table.dataTable tbody tr {
  &:hover td {
    background-image: linear-gradient(0deg, rgba(128,128,128,0.1), rgba(128,128,128,0.1));
  }
  &, &.even, &.odd {
    background-color: transparent;
    >.sorting_1, >.sorting_2, >.sorting_3 {
      background-color: transparent;
    }
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
`;

const TOOLTIP_PLACEMENTS = [
  { "id": "TOP", "text": "Top" },
  { "id": "LEFT", "text": "Left" },
  { "id": "RIGHT", "text": "Right" },
  { "id": "BOTTOM", "text": "Bottom" }
];

const CONTENT_RULE_TYPES = [
  { id: 'FILTER', text: 'Filter by exact value or RegExp' },
  { id: 'RANGE', text: "Match a range of values" },
  { id: 'NULL', text: "Is NULL" }
];

const CONTENT_RULE_CLASS_LEVELS = [
  { id: 'CELL', text: "Only the cell" },
  { id: 'ROW', text: 'Entire row' }
];

const CONTENT_RULE_MAX_VALUE_OPS = [
  { id: '', text: '' },
  { id: '>=', text: '\u2265 (greater than or equal to)' },
  { id: '>', text: '> (greater than)' }
];

const CONTENT_RULE_MIN_VALUE_OPS = [
  { id: '', text: '' },
  { id: '<', text: '< (less than)' },
  { id: '<=', text: '\u2264 (less than or equal to)' }
];

const CONTENT_RULE_EXACT_NUM_OPS = [
  { id: '==', text: '= (equals)' },
  { id: '!=', text: "\u2260 (doesn't)" }
];

const DEFAULT_PANEL_SETTINGS = {
  allowLengthChange: true,
  allowOrdering: true,
  allowSearching: true,
  columnDefs: [],
  initialPageLength: 25,
  isFullWidth: true,
  pageLengths: '10,15,20,25,50,100',
  pseudoCSS: DEFAULT_PSEUDO_CSS
};

export class DataTablePanelCtrl extends MetricsPanelCtrl {
  constructor($scope, $injector, $rootScope) {
    super($scope, $injector);

    this.$rootScope = $rootScope;

    _.defaultsDeep(this.panel, DEFAULT_PANEL_SETTINGS);

    this.events.on('init-edit-mode', this.onInitEditMode.bind(this));
    this.events.on('data-received', this.onDataReceived.bind(this));
    this.events.on('data-snapshot-load', this.onDataReceived.bind(this));
    this.events.on('data-error', this.onDataError.bind(this));
    this.events.on('data-error', this.onDataError.bind(this));
    this.events.on('init-panel-actions', this.onInitPanelActions.bind(this));
    this.events.on('render', this.onPanelSizeChanged.bind(this));
    this.events.on('view-mode-changed', this.draw.bind(this));
  }

  drawIfChanged() {
    if (this.panelJSON !== this.getPanelSettingsJSON()) {
      this.draw();
    }
  }

  getPanelSettingsJSON(spacing) {
    let panel = this.panel;
    return JSON.stringify(
      panel,
      function (key, value) {
        return (this != panel || _.has(DEFAULT_PANEL_SETTINGS, key))
          ? value
          : undefined;
      },
      spacing
    );
  }

  onPanelSizeChanged() {
    this.fixDataTableSize();
  }

  onInitEditMode() {
    let path = 'public/plugins/copperhill-datatables-panel/partials/';
    this.addEditorTab('Table View', `${path}refresh-view.html`, 1);
    this.addEditorTab('Options', `${path}editor.html`, 2);
    this.addEditorTab('Column Definitions', `${path}column-defs.html`, 3);
    this.addEditorTab('Styles', `${path}styles.html`, 4);
    this.addEditorTab('Table View', `${path}refresh-view.html`, 5);
  }

  onInitPanelActions(actions) {
    actions.push({ text: 'Export CSV', click: 'ctrl.exportCSV()' });
  }

  onDataError() {
    this.draw();
  }

  onDataReceived(dataList) {
    if (dataList && dataList.length) {
      dataList.forEach(data => data.isReal = true);
      this.dataList = dataList;
    }
    else {
      let EXTRA_COLS = 2;
      this.dataList = [
        {
          columns: [{ text: "X" }, { text: "X * X" }, { text: "X + X" }].concat(_.range(EXTRA_COLS).map(y => ({ text: `${y} / Math.random()` }))),
          rows: _.range(150).map(x => [x, x * x, x + x].concat(_.range(EXTRA_COLS).map(y => y / Math.random()))),
          isReal: false,
          type: 'table'
        }
      ];
    }

    this.draw();
  }

  getConstByName(name) {
    if (/^[A-Z_][A-Z_0-9]*$/.test(name)) {
     return eval(name);
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
      contentRules: []
    });
  }

  removeColumnDef(columnDef) {
    let columnDefs = this.panel.columnDefs;
    columnDefs.splice(columnDefs.indexOf(columnDef), 1);
  }

  addColumnContentRule(columnDef) {
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

  removeColumnContentRule(contentRule, columnDef) {
    let contentRules = columnDef.contentRules;
    contentRules.splice(contentRules.indexOf(contentRule), 1);
  }

  getPageLengthOptions() {
    return this.panel.pageLengths
        .replace(/\s+/g, '')
        .split(',')
        .reduce(
          (arr, x) => {
            if (+x === parseInt(x, 10) && +x >= -1) {
              x = x == -1 ? Infinity : +x;
              arr.push({ value: x, text: x === Infinity ? 'All' : x });
            }
            return arr;
          },
          []
        );
  }

  exportCSV() {
    let div = JS.dom({ _: 'div' });
    let data = this.parseDataList(0);

    JS.dom({
      _: 'a',
      href: 'data:text/csv;charset=utf-8,' + encodeURIComponent(
        toCSV(
          data.rows.map(row => row.reduce((carry, cell) => {
            if (cell.visible) {
              div.innerHTML = cell.html;
              carry.push(div.textContent);
            }
            return carry;
          }, [])),
          {
            headers: data.columns.reduce((carry, header) => {
              if (header.visible) {
                div.innerHTML = header.html;
                carry.push(div.textContent);
              }
              return carry;
            }, [])
          }
        )
      ),
      download: this.panel.title + JS.formatDate(new Date, " (YYYY-MM-DD 'at' H.mm.ss).'csv'")
    }).click();
  }

  getVarsByName() {
    return this.templateSrv.variables.reduce(
      (carry, variable) => {
        // At times current.value is a string and at times it is an array.
        let varValues = JS.toArray(variable.current.value);
        let isAll = variable.includeAll && varValues.length === 1 && varValues[0] === '$__all';
        carry[variable.name] = isAll ? [variable.current.text] : varValues;
        return carry;
      },
      {}
    );
  }

  setContent(data) {
    let ctrl = this;
    let panel = ctrl.panel;
    let jElem = ctrl.panelElement;
    let height = jElem.height();
    let tableOpts = { _: 'table', cls: 'display', style: {} };
    if (panel.isFullWidth) {
      tableOpts.style.width = '100%';
    }

    let table = JS.dom(tableOpts);
    let jTable = jQuery(table).appendTo(jElem.html(''));
    let columns = data.columns;
    let headers = data.headers;
    let dataTableOpts = {
      data: data.rows,
      columns: columns.map((column, colIndex) => {
        let result = { title: column.text, visible: column.visible };

        let colDef = column.colDef;
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
      lengthMenu: ctrl.getPageLengthOptions().reduce(
        (arr, opt) => [
          arr[0].concat([opt.value === Infinity ? -1 : opt.value]),
          arr[1].concat([opt.value === Infinity ? 'All' : opt.value])
        ],
        [[], []]
      ),
      pageLength: panel.initialPageLength,
      order: [],
      headerCallback(tr) {
        let thIndex = 0;
        columns.forEach(col => {
          if (col.visible) {
            let jTH = jQuery('>th', tr).eq(thIndex++).html(col.html);
          }
        });
      },
      rowCallback(tr, rowData) {
        let tdIndex = 0;
        rowData.forEach(cell => {
          if (cell.visible) {
            let jTD = jQuery('>td', tr).eq(tdIndex++);
            if (cell.cls && cell.cls.level === 'CELL') {
              jTD.addClass(cell.cls.names);
            }
            let html = cell.html;
            if (cell.tooltip) {
              html = `<div data-tooltip data-original-title="${_.escape(cell.tooltip.display)}" data-placement="${cell.tooltip.placement}" class="d-inline-block">${html}</div>`;
            }
            jTD.html(html);
          }
          else if (cell.cls && cell.cls.level === 'ROW') {
            jQuery(tr).addClass(cell.cls.names);
          }
        });
      }
    };
    let dataTable = jTable.DataTable(dataTableOpts);

    jElem.find('.dataTables_scrollHeadInner').css('margin', '0 auto');
    ctrl.fixDataTableSize();

    jElem.each((i, elem) => {
      elem.className = elem.className.replace(/\b_\d+\b/g, ' ').replace(/\s+/g, ' ').trim();
      elem.appendChild(JS.css(JSON.parse(pseudoCssToJSON(panel.pseudoCSS)), elem));
    });
  }

  parseDataList() {
    let ctrl = this;
    let data = ctrl.dataList[0];
    let columns = data.columns;
    let rows = data.rows;
    let varsByName = ctrl.getVarsByName();
    let headers = columns.map(col => col.text);
    let colDefs = ctrl.panel.columnDefs;
    let colDefRgxs = colDefs.map(colDef => parseRegExp(colDef.filter));
    let colDefContentRuleFilters = colDefs.map(
      colDef => colDef.contentRules.map(
        rule => rule.type === 'FILTER' ? parseRegExp(rule.filter) : null
      )
    );

    columns = _.cloneDeep(columns).map(column => {
      column = _.extend(
        'string' === typeof column ? { text: column } : column,
        { visible: true }
      );

      colDefRgxs.find((colDefRgx, colDefIndex) => {
        if (colDefRgx.test(column.text)) {
          let colDef = colDefs[colDefIndex];
          let gcvOptions = {
            cell: column.text,
            cellsByColName: {},
            ruleType: 'FILTER',
            rgx: colDefRgx,
            ctrl,
            varsByName
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
            html: html,
            visible: colDef.isVisible
          });

          return true;
        }
      });

      if (!_.has(column, 'html')) {
        column.html = _.escape(column.text);
      }

      return column;
    });

    rows = rows.map(row => {
      return row.slice().map((cellValue, colIndex) => {
        let column = columns[colIndex];
        let colDef = column.colDef;

        let cell = {
          html: cellValue,
          visible: column.visible
        };

        if (colDef) {
          let rules = colDef.contentRules;
          let cellsByColName = row.reduceRight(
            (carry, val, i) => _.extend(carry, { [headers[i]]: val }),
            {}
          );

          // Use Array#find() solely to match the first applicable rule...
          rules.find((rule, ruleIndex) => {
            let isMatch = true;
            let type = rule.type;
            let colDefContentRuleFilter = column.colDefContentRuleFilters[ruleIndex];
            let gcvOptions = {
              cell: cell.html,
              cellsByColName,
              ruleType: rule.type,
              rgx: colDefContentRuleFilter,
              ctrl,
              varsByName
            };
            if (type === 'FILTER') {
              isMatch = colDefContentRuleFilter.test(cell.html);
            }
            else if (type === 'RANGE') {
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
                isMatch = isMatch && (minValueOp === '<=' ? minValue <= cellValue : (minValue < cellValue));
              }
              let maxValueOp = rule.maxValueOp;
              if (maxValueOp) {
                isMatch = isMatch && (maxValueOp === '>=' ? maxValue >= cellValue : (maxValue > cellValue));
              }
            }
            else {
              isMatch = cell.html == null;
            }

            isMatch = isMatch !== rule.negateCriteria;

            // If this is a match apply the class(es)
            if (isMatch) {
              if (rule.classNames) {
                cell.cls = {
                  names: getCellValue(rule.classNames, false, gcvOptions),
                  level: rule.classLevel
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
                    placement: rule.tooltip.placement.toLowerCase()
                  };
                }
                displayHTML = `<a href="${url}" target="${target}">${displayHTML}</a>`;
              }
              cell.html = displayHTML;
            }

            return isMatch;
          });
        }

        return cell;
      });
    });

    return { columns, rows, headers, type: data.type, refId: data.refId };
  }

  fixDataTableSize() {
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
  }

  draw() {
    let error;
    let isValid = false;
    let ctrl = this;
    let jElem = ctrl.element;
    let jContent = ctrl.panelElement.css('position', 'relative').html('');
    let elemContent = jContent[0];
    let data = ctrl.parseDataList();

    ctrl.pageLengthOptions = ctrl.getPageLengthOptions();

    if (data && data.rows.length) {
      if (data.type === 'table') {
        try {
          ctrl.setContent(data);
          ctrl.panelJSON = this.getPanelSettingsJSON();
          jElem.tooltip({ selector: '[data-tooltip]' });
          isValid = true;
        }
        catch (err) {
          error = err;
        }
      }
    }
    if (!isValid) {
      let msg = 'No data' + (error ? ':  \r\n' + error.message : '.');
      let elemMsg = JS.dom({
        _: 'div', style: { display: 'flex', alignItems: 'center', textAlign: 'center', height: '100%' }, $: [
          { _: 'div', cls: 'alert alert-error', style: { margin: '0px auto' }, text: msg }
        ]
      });
      jContent.html('').append(elemMsg);
      if (error) {
        throw error;
      }
    }
  }

  link(scope, elem, attrs, ctrl) {
    this.element = elem;
    this.panelElement = elem.find('.panel-content');
    this.throttleDraw = _.debounce(this.draw.bind(this), 1000);
  }
}

DataTablePanelCtrl.templateUrl = 'partials/module.html';
