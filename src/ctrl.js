import {MetricsPanelCtrl} from 'app/plugins/sdk';
import _ from 'lodash';
import * as JS from './external/YourJS.min';
import './external/toCSV';
import './external/datatables/js/jquery.dataTables.min';
import './external/datatables/js/dataTables.fixedHeader.min';
import './external/datatables/css/jquery.dataTables.min.css!';
import './external/datatables/css/fixedHeader.dataTables.min.css!';
import './external/datatables-grafana-fix.css!';

const RGX_SIMPLE_NUMBER = /^\d+(\.\d+)?$/;

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
  let parts = /^\/(.+)\/(\w*)$/.exec(strPattern);
  return parts ? new RegExp(parts[1], parts[2]) : new RegExp('^' + _.escapeRegExp(strPattern) + '$', 'i');
}

function pseudoCssToJSON(strLess) {
  var openCount = 0;
  var closeCount = 0;

  strLess = strLess
    .replace(/\/\*[^]*?\*\//g, '')
    .replace(
      /([^\{\};]+)\{|([^:\{\}]+):([^;]+);|\}/g,
      function (match, ruleName, styleName, styleValue) {
        if (ruleName) {
          openCount++;
          return JSON.stringify(ruleName.trim()) + ":{";
        }
        if (styleName) {
          return JSON.stringify(styleName.trim()) + ":" + JSON.stringify(styleValue.trim()) + ",";
        }
        closeCount++;
        return "},";
      }
    )
    .replace(/,\s*(\}|$)/g, '$1');

  try {
    return JSON.stringify(JSON.parse("{" + strLess + "}"), null, 2);
  }
  catch (e) {
    throw new Error(
      openCount !== closeCount
        ? "Pseudo-CSS contains too many " + (openCount > closeCount ? "open" : "clos") + "ing braces."
        : "Pseudo-CSS couldn't be parsed correctly."
    );
  }
}

function setContent(jElem, ctrl) {
  let data = ctrl.data;
  let panel = ctrl.panel;
  let varsByName = ctrl.getVarsByName();
  let height = jElem.height();

  let tableOpts = { _: 'table', cls: 'display', style: {} };
  if (panel.isFullWidth) {
    tableOpts.style.width = '100%';
  }

  let table = JS.dom(tableOpts);
  let jTable = jQuery(table).appendTo(jElem.html(''));
  let colDefs = panel.columnDefs;
  let colDefRgxs = colDefs.map(colDef => parseRegExp(colDef.filter));
  let columnTexts = data.columnTexts;
  let colDefIndexByCol = columnTexts.map(
    title => colDefRgxs.reduce(
      (carry, colDefRgx, colDefIndex) => (carry < 0 && colDefRgx.test(title)) ? colDefIndex : carry,
      -1
    )
  );
  let colDefContentRuleFilters = colDefs.map(
    colDef => colDef.contentRules.map(
      rule => rule.type === 'FILTER' ? parseRegExp(rule.filter) : null
    )
  );
  let options = {
    data: data.rows,
    columns: columnTexts.map((title, colIndex) => {
      let result = { title };

      let colDefIndex = colDefIndexByCol[colIndex];
      let colDef = colDefs[colDefIndex];
      if (colDef) {
        let filter = colDefRgxs[colDefIndex];
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
    lengthMenu: ctrl.getPageLengthOptions().reduce(
      (arr, opt) => [
        arr[0].concat([opt.value === Infinity ? -1 : opt.value]),
        arr[1].concat([opt.value === Infinity ? 'All' : opt.value])
      ],
      [[],[]]
    ),
    pageLength: panel.initialPageLength,
    order: [],
    rowCallback: function(tr, rowData) {
      let tdIndex = -1;
      let cellsByColName = rowData.reduceRight(
        (carry, val, i) => _.extend(carry, { [columnTexts[i]]: val }),
        {}
      );
      rowData.map((cell, colIndex) => {
        let colDefIndex = colDefIndexByCol[colIndex];
        let colDef = colDefs[colDefIndex];

        if (!colDef || colDef.isVisible) {
          tdIndex++;
        }

        if (colDef) {
          if (colDef.isVisible) {
            let rules = colDef.contentRules;
            // Use Array#find() solely to match the first applicable rule...
            rules.find((rule, ruleIndex) => {
              let isMatch = true;
              let type = rule.type;
              let colDefContentRuleFilter = colDefContentRuleFilters[colDefIndex][ruleIndex];
              let gcvOptions = { cell, cellsByColName, rule, colDefContentRuleFilter, ctrl, varsByName };
              if (type === 'FILTER') {
                isMatch = colDefContentRuleFilter.test(cell);
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
                  cell = +cell;
                }

                let minValueOp = rule.minValueOp;
                if (minValueOp) {
                  isMatch = isMatch && (minValueOp === '<=' ? minValue <= cell : (minValue < cell));
                }
                let maxValueOp = rule.maxValueOp;
                if (maxValueOp) {
                  isMatch = isMatch && (maxValueOp === '>=' ? maxValue >= cell : (maxValue > cell));
                }
              }
              else {
                isMatch = cell == null;
              }

              isMatch = isMatch !== rule.negateCriteria;

              // If this is a match apply the class(es)
              if (isMatch) {
                let jTD = jQuery('>td', tr).eq(tdIndex);
                if (rule.classNames) {
                  let classNames = getCellValue(rule.classNames, false, gcvOptions);
                  if (rule.classLevel === 'ROW') {
                    jQuery(tr).addClass(classNames);
                  }
                  else {
                    jTD.addClass(classNames);
                  }
                }

                // Set the display
                let display = getCellValue(rule.display, false, gcvOptions);
                if (rule.displayIsHTML) {
                  display = _.escape(display);
                }
                if (rule.url) {
                  let url = _.escape(getCellValue(rule.url, true, gcvOptions));
                  display = `<a href="${url}" target="${rule.openNewWindow ? '_blank' : '_self'}">${display}</a>`;
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
  let dataTable = jTable.DataTable(options);

  jElem.find('.dataTables_scrollHeadInner').css('margin', '0 auto');
  fixDataTableSize(jElem.find('.dataTables_wrapper'), height);

  jElem.each((i, elem) => {
    elem.className = elem.className.replace(/\b_\d+\b/g, ' ').replace(/\s+/g, ' ').trim();
    elem.appendChild(JS.css(JSON.parse(pseudoCssToJSON(panel.pseudoCSS)), elem));
  });
}

function getCellValue(valToMod, isForLink, { display, cellsByColName, rule, colDefContentRuleFilter, ctrl, varsByName }) {
  let matches = rule.type === 'FILTER'
    ? display != null
      ? colDefContentRuleFilter.exec(display + '')
      : { '0': 'null' }
    : { '0': display };
  _.extend(matches, { value: display, cell: display });
  return valToMod.replace(
    /\${(?:(value|cell|0|[1-9]\d*)|(col|var):((?:[^\}:\\]*|\\.)+))(?::(?:(raw)|(escape)|(param)(?::((?:[^\}:\\]*|\\.)+))?))?}/g,
    function (match, matchesKey, type, name, isRaw, isEscape, isParam, paramName) {
      isRaw = isRaw || !(isForLink || isEscape);
      name = name && name.replace(/\\(.)/g, '$1');
      let result = [...new Set(
        matchesKey
          ? _.has(matches, matchesKey) ? [matches[matchesKey]] : []
          : type === 'col'
            ? _.has(cellsByColName, name) ? [cellsByColName[name]] : []
            : _.has(varsByName, name) ? varsByName[name] : []
      )];
      return result.length < 1
        ? match
        : isRaw
          ? result.join(',')
          : isParam
            ? result.map(v => encodeURIComponent(paramName == undefined ? name : paramName) + '=' + encodeURIComponent(v)).join('&')
            : encodeURIComponent(result.join(','));
    }
  )
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

  ctrl.pageLengthOptions = ctrl.getPageLengthOptions();
  
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
        column = _.extend({}, column, {
          html: colDef.displayIsHTML ? column.text : _.escape(column.text),
          colDef: colDef,
          visible: colDef.isVisible,
          colDefRgx,
          colDefContentRuleFilters: colDefContentRuleFilters[colDefIndex]
        });
        return true;
      }
    });
    return column;
  });

  rows = rows.map(row => {
    return row.slice().map((cellValue, colIndex) => {
      let column = columns[colIndex];
      let colDef = column.colDef && column.colDef;

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
            rule,
            colDefContentRuleFilter,
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
              displayHTML = `<a href="${url}" target="${rule.openNewWindow ? '_blank' : '_self'}">${displayHTML}</a>`;
            }
            cell.html = displayHTML;
          }

          return isMatch;
        });
      }

      return cell;
    });
  });

  return { columns, rows, headers };
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
    this.events.on('data-error', this.onDataError.bind(this));
    this.events.on('init-panel-actions', this.onInitPanelActions.bind(this));
  }

  onInitEditMode() {
    let path = 'public/plugins/copperhill-datatables-panel/partials/';
    this.addEditorTab('Options', `${path}editor.html`, 2);
    this.addEditorTab('Column Definitions', `${path}column-defs.html`, 3);
    this.addEditorTab('Styles', `${path}styles.html`, 4);
  }

  onInitPanelActions(actions) {
    actions.push({ text: 'Export CSV', click: 'ctrl.exportCSV()' });
  }

  onDataError() {
    this.renderNow();
  }

  onDataReceived(dataList) {
    if (dataList && dataList.length) {
      let data = dataList[0];
      this.data = _.extend(
        parseData(data.columns, data.rows, this),
        { isReal: true, type: data.type }
      );
    }
    else {
      let EXTRA_COLS = 2;
      this.data = _.extend(
        parseData(
          [{ text: "X" }, { text: "X * X" }, { text: "X + X" }].concat(_.range(EXTRA_COLS).map(y => ({ text: `${y} / Math.random()`}))),
          _.range(150).map(x => [x, x * x, x + x].concat(_.range(EXTRA_COLS).map(y => y / Math.random()))),
          this
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
    JS.dom({
      _: 'a',
      href: 'data:text/csv;charset=utf-8,' + encodeURIComponent(
        toCSV(this.data.rows, { headers: this.data.columnTexts })
      ),
      download: this.panel.title + JS.formatDate(new Date, " (YYYY-MM-DD 'at' H:mm:ss).'csv'")
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
