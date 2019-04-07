import {MetricsPanelCtrl} from 'app/plugins/sdk';
import _ from 'lodash';
import * as JS from './external/YourJS.min';
import './external/datatables/js/jquery.dataTables.min';
import './external/datatables/js/dataTables.fixedHeader.min';
import './external/datatables/css/jquery.dataTables.min.css!';
import './external/datatables/css/fixedHeader.dataTables.min.css!';
import './external/datatables-grafana-fix.css!';

const DEFAULT_PSEUDO_CSS = {
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

const CONTENT_RULE_TYPES = [
  { id: 'FILTER', text: 'Filter by exact value or RegExp' },
  { id: 'RANGE', text: "Match a range of values" },
  { id: 'NULL', text: "Is NULL" }
];

const CONTENT_RULE_CLASS_LEVELS = [
  { id: 'CELL', text: "Only the cell" },
  { id: 'ROW', text: 'Entire row' }
];

const CONTENT_RULE_MIN_VALUE_OPS = [
  { id: '>=', text: '\u2265 (greater than or equal to)' },
  { id: '>', text: '> (greater than)' }
];

const CONTENT_RULE_MAX_VALUE_OPS = [
  { id: '<', text: '< (less than)' },
  { id: '<=', text: '\u2264 (less than or equal to)' }
];

const CONTENT_RULE_EXACT_NUM_OPS = [
  { id: '==', text: '= (equals)' },
  { id: '!=', text: "\u2260 (doesn't)" }
];

const DEFAULT_PANEL_SETTINGS = {
  pseudoCSS: JSON.stringify(DEFAULT_PSEUDO_CSS, null, 2),
  columnDefs: [],
  isFullWidth: true,
  allowOrdering: true,
  allowSearching: true,
  allowLengthChange: true
};

function parseRegExp(strPattern) {
  let parts = /^\/(.+)\/(\w*)$/.exec(strPattern);
  return parts ? new RegExp(parts[1], parts[2]) : new RegExp('^' + _.escapeRegExp(strPattern) + '$', 'i');
}

function setContent(jElem, ctrl) {
  let data = ctrl.data;
  let panel = ctrl.panel;
  let height = jElem.height();

  let tableOpts = { _: 'table', cls: 'display', style: {} };
  if (panel.isFullWidth) {
    tableOpts.style.width = '100%';
  }

  let table = JS.dom(tableOpts);
  let jTable = jQuery(table).appendTo(jElem.html(''));
  let options = {
    data: data.rows,
    columns: data.columnTexts.map(title => {
      let result = { title };

      for (let colDefs = panel.columnDefs, i = 0, l = colDefs.length; i < l; i++) {
        let colDef = colDefs[i];
        let filter = parseRegExp(colDef.filter);
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
          }
          else {
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
  let dataTable = jTable.DataTable(options);

  jElem.find('.dataTables_scrollHeadInner').css('margin', '0 auto');
  fixDataTableSize(jElem.find('.dataTables_wrapper'), height);

  jElem.each((i, elem) => {
    elem.className = elem.className.replace(/\b_\d+\b/g, ' ').replace(/\s+/g, ' ').trim();
    elem.appendChild(JS.css(JSON.parse(panel.pseudoCSS), elem));
  });

  console.log({ data, height, ctrl, jElem, jTable, dataTable, options, table });
}

function fixDataTableSize(jWrap, fullHeight) {
  let wrapHeight = jWrap.height();
  let jScrollBody = jWrap.find('.dataTables_scrollBody');
  let scrollHeight = jScrollBody.height();
  let nonScrollHeight = wrapHeight - scrollHeight;
  jScrollBody.css('max-height', fullHeight - nonScrollHeight);
}

function renderNow(e, jElem) {
  let error,
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
      }
      catch (err) {
        error = err;
      }
    }
  }
  if (!isValid) {
    let msg = 'No data' + (error ? ':  \r\n' + error.message : '.');
    let elemMsg = JS.dom({ _: 'div', style: { display: 'flex', alignItems: 'center', textAlign: 'center', height: '100%' }, $: [
      { _: 'div', cls: 'alert alert-error', style: { margin: '0px auto' }, text: msg }
    ]});
    jContent.html('').append(elemMsg);
  }
}

function parseData(columns, rows) {
  return {
    columns,
    rows,
    columnTexts: columns.map(col => 'string' === typeof col ? col : col.text)
  };
}

export class DataTablePanelCtrl extends MetricsPanelCtrl {
  constructor($scope, $injector, $rootScope) {
    super($scope, $injector);

    this.$rootScope = $rootScope;
    this.data = null;

    _.defaultsDeep(this.panel, DEFAULT_PANEL_SETTINGS);

    this.events.on('init-edit-mode', this.onInitEditMode.bind(this));
    this.events.on('data-received', this.onDataReceived.bind(this));
    this.events.on('data-snapshot-load', this.onDataReceived.bind(this));
    this.events.on('data-error', this.onDataError.bind(this));
  }

  onInitEditMode() {
    let path = 'public/plugins/copperhill-datatables-panel/partials/';
    this.addEditorTab('Options', `${path}editor.html`, 2);
    this.addEditorTab('Column Definitions', `${path}column-defs.html`, 3);
    this.addEditorTab('Styles', `${path}styles.html`, 4);
  }

  onDataError() {
    this.renderNow();
  }

  onDataReceived(dataList) {
    if (dataList && dataList.length) {
      let data = dataList[0];
      this.data = _.extend(
        parseData(data.columns, data.rows),
        { isReal: true, type: data.type }
      );
    }
    else {
      let EXTRA_COLS = 2;
      this.data = _.extend(
        parseData(
          [{ text: "X" }, { text: "X * X" }, { text: "X + X" }].concat(_.range(EXTRA_COLS).map(y => ({ text: `${y} / Math.random()`}))),
          _.range(150).map(x => [x, x * x, x + x].concat(_.range(EXTRA_COLS).map(y => y / Math.random())))
        ),
        { isReal: false, type: 'table' }
      );
    }

    this.renderNow();
  }

  onChangeCallback(obj, key) {
    return newValue => {
      obj[key] = newValue;
      this.renderNow();
    };
  }

  getConstByName(name) {
    if (/^[A-Z_][A-Z_0-9]*$/.test(name)) {
     return eval(name);
    }
  }

  addColumnDef() {
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
      display: '',
      minValue: null,
      maxValue: null,
      minValueOp: null,
      maxValueOp: null,
      url: '',
      openNewWindow: true
    });
  }

  removeColumnContentRule(contentRule, columnDef) {
    let contentRules = columnDef.contentRules;
    contentRules.splice(contentRules.indexOf(contentRule), 1);
  }

  renderNow(e, elem) {
    this.events.emit('renderNow');
  }

  renderAfterOneSec() {
    this.events.emit('renderAfterOneSec');
  }

  link(scope, elem, attrs, ctrl) {
    this.events.on('renderNow', e => renderNow.call(this, e, elem));
    this.events.on('render', _.debounce(e => renderNow.call(this, e, elem), 250));
    this.events.on('renderAfterOneSec', _.debounce(e => renderNow.call(this, e, elem), 1000));
  }
}

DataTablePanelCtrl.templateUrl = 'partials/module.html';
