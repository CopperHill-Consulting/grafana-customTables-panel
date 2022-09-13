import * as JS from './external/YourJS.min';
import { getValueFormat } from './format-values';
import * as XLSX from './external/xlsx.core.min';

const RGX_CELL_PLACEHOLDER = /\$\{(time)(?:-(to|from))?\}|\$\{(?:(value|cell|0|[1-9]\d*)|(col|join-col|var):((?:[^\}:\\]*|\\.)+))(?::(?:(raw)|(escape)|(param)(?::((?:[^\}:\\]*|\\.)+))?))?\}/g;
const RGX_OLD_VAR_WORKAROUND = /([\?&])var-(\$\{var:(?:[^\}:\\]*|\\.)+:param\})/g;
const RGX_ESCAPED_CHARS = /\\(.)/g;
const RGX_LOOSE_DATE = /^(\d{4})-(\d\d?)-(\d\d?)(?:(?:T|\s+)(\d\d?):(\d\d?)(?::(\d\d?)(?:\.(\d\d?\d?))?)?)?$/;

const LOCAL_TZ_OFFSET = (new Date).getTimezoneOffset();

/**
 * Converts an array of arrays of values to a CSV string.
 * @param rows {Array<Array>}
 *     An array of arrays of values that should be converted to a CSV string.
 * @param opt_options {Object=}
 *     Optional.  If this contains a `nullString` property the value will be used
 *     as the string that will appear whenever `null` or `undefined` is found.
 *     If this contains a `headers` property the value should be an array
 *     indicating the headers to be included as the first row.
 * @returns {string}
 *     The CSV version of `rows` with any specified options.
 */
function toCSV(rows, opt_options) {
  opt_options = Object(opt_options);
  if (opt_options.headers) {
    rows = [opt_options.headers].concat(rows);
  }
  let nullString = opt_options.hasOwnProperty('nullString') ? opt_options.nullString : '(NULL)';
  let delimiter = opt_options.delimiter || ',';
  let RGX_DELIMIT = delimiter === ','
    ? /[",\n\r]/
    : new RegExp('["\r\n' + JS.quoteRegExp(delimiter) + ']');
  return rows
    .map(function (row) {
      return row.map(function (cell) {
        cell = cell != null
          ? 'function' === typeof cell.toString
            ? cell + ""
            : Object.prototype.toString.call(cell)
          : nullString;
        return RGX_DELIMIT.test(cell) ? '"' + (cell).replace(/"/g, '""') + '"' : cell;
      }).join(delimiter);
    })
    .join('\n');
}

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

function offsetByTZ(date, opt_tzOffset) {
  date = new Date(date);
  opt_tzOffset = opt_tzOffset == null ? LOCAL_TZ_OFFSET : opt_tzOffset;
  return new Date(+date + opt_tzOffset * 6e4);
}

function getCellValue(valToMod, isForLink, options) {
  let { cell, cellsByColName, joinValues, colIndex, rgx, ctrl, varsByName, rule } = options;
  let { type: ruleType, unitFormat, unitFormatString, unitFormatDecimals, tzOffsetType, tzOffset } = rule;
  let matches = ruleType === 'FILTER'
    ? cell != null
      ? Object(rgx.exec(cell + ''))
      : { '0': 'null' }
    : { '0': cell };

  let { from, to } = ctrl.timeSrv.timeRangeForUrl();

  if (/^dateTime/.test(unitFormat)) {
    if (ctrl.panel.tzOffsetType) {
      tzOffsetType = ctrl.panel.tzOffsetType;
      tzOffset = ctrl.panel.tzOffset;
    }
    // Do not apply another offset if global offset was used on receiving the data.
    let date = tzOffsetType
      ? offsetByTZ(
          cell,
          tzOffsetType === 'TIMEZONE'
            ? tzOffset
            : tzOffsetType === 'NO-TIMEZONE'
              ? LOCAL_TZ_OFFSET
              : -LOCAL_TZ_OFFSET
        )
      : new Date(cell);
    matches.value = getValueFormat(unitFormat)(date, unitFormatString).text;
  }
  else {
    matches.value = matches.cell = (!['none', null, void 0].includes(unitFormat) && 'number' === typeof cell)
      ? getValueFormat(unitFormat)(cell, unitFormatDecimals, null).text
      : cell
  }

  return valToMod.replace(RGX_OLD_VAR_WORKAROUND, '$1$2').replace(
    RGX_CELL_PLACEHOLDER,
    function (match0, isTime, opt_timePart, matchesKey, isColOrVar, name, isRaw, isEscape, isParam, paramName) {
      if (isTime) {
        return (opt_timePart != 'to' ? 'from=' + encodeURIComponent(from) : '')
          + (opt_timePart ? '' : '&')
          + (opt_timePart != 'from' ? 'to=' + encodeURIComponent(to) : '');
      }

      isRaw = isRaw || !(isForLink || isEscape);
      name = matchesKey || (name && name.replace(RGX_ESCAPED_CHARS, '$1'));
      
      let result = [...new Set(
        matchesKey
          ? _.has(matches, matchesKey) ? [matches[matchesKey]] : []
          : isColOrVar === 'col'
            ? _.has(cellsByColName, name) ? [cellsByColName[name]] : []
            : isColOrVar === 'join-col'
              ? (joinValues && _.has(joinValues[colIndex], name)) ? [joinValues[colIndex][name]] : []
              : _.has(varsByName, name) ? varsByName[name] : []
      )];

      return result.length < 1
        ? match0
        : isRaw
          ? result.join(',')
          : isParam
            ? result.map(v => encodeURIComponent(paramName == undefined ? isColOrVar === 'var' ? `var-${name}` : name : paramName) + '=' + encodeURIComponent(v)).join('&')
            : encodeURIComponent(result.join(','));
    }
  );
}

// TODO:  Should be improved if other types will be passed
let stringify = value => value instanceof Date
  ? +value
  : (value && value._isAMomentObject)
    ? +value.toDate()
    : `${value}`;

const getHtmlText = (div => html => (div.innerHTML = html, div.textContent))(document.createElement('div'));

/**
 * Creates a function that when called will try to match the given string
 * against `strTerm`.
 * @param strTerm {string}
 *   The string that will be parsed and used to test one or more strings.
 * @param opt_options {?Object}
 *   Optional.  An object containing all of the options to be used.  The
 *   `ignoreCase` property (defaults to true) can be added specified to
 *   allow/disallow non-RegExp terms to match strings regardless of casing.
 *   The `matchWordStart` (defaults to false) can be added to allow plain words
 *   to match even if word only starts with the word entered in the term.  The
 *   `ignoreErrors` (defaults to false) can be added to indicate whether
 *   malformed will throw JS errors.
 */
function term(strTerm, opt_options) {
  opt_options = Object(opt_options);

  var terms = [];
  var DEFAULT_MUSTS = [];
  strTerm.replace(
    /(?:(\+)|(-))?(?:\/((?:[^\\\/]+|\\.)+)\/(i?)|"((?:[^"]+|"")*)"|(\S+))/g,
    function (match, hasPlus, hasMinus, rgxBody, rgxFlags, quoteBody, word) {
      try {
        var must = hasPlus === '+' ? true : hasMinus === '-' ? false : undefined;
        terms.push({
          rgx: rgxBody
            ? new RegExp(rgxBody, (rgxFlags || '') + 'g')
            : new RegExp(
              (quoteBody || word).replace(
                /(^\b)|(\s)|([\[\]\{\}\(\)\+\$\^\\\|\?])|("")|(\*)|(\b$)/g,
                function (match, breakStart, space, specialChar, isQuote, isAsterisk, breakEnd) {
                  return space
                    ? '\\s+'
                    : specialChar
                      ? '\\' + specialChar
                      : isQuote
                        ? '"'
                        : isAsterisk
                          ? '.*'
                          : (breakStart === '' || (breakEnd === '' && (!opt_options.matchWordStart || quoteBody)))
                            ? '\\b'
                            : match;
                }
              ),
              'g' + (opt_options.ignoreCase === false ? '' : 'i')
            ),
          must: hasPlus === '+' ? true : hasMinus === '-' ? false : undefined
        });
        DEFAULT_MUSTS.push(must !== true);
      }
      catch (e) {
        if (opt_options.ignoreErrors) {
          console.warn(e);
        }
        else {
          throw e;
        }
      }
    }
  );

  return function (str) {
    var musts = DEFAULT_MUSTS.slice();
    var matchWraps = [];
    terms.forEach(function (term, termIndex) {
      var match;
      while (match = term.rgx.exec(str)) {
        if (match[0] === '') {
          term.rgx.lastIndex++;
        }
        matchWraps.push({ match: match, term: term, termIndex: termIndex });
      }
    });

    matchWraps = matchWraps.sort(function (a, b) {
      return (a.match.index - b.match.index) || (a.termIndex - b.termIndex);
    }).filter(function (matchWrap, matchWrapIndex) {
      var keepIt = !matchWrapIndex;
      if (!keepIt) {
        var prevMatch = matchWraps[matchWrapIndex - 1].match;
        var prevMatchEnd = prevMatch.index + prevMatch[0].length;
        keepIt = matchWrap.match.index >= prevMatchEnd;
      }
      if (keepIt) {
        musts[matchWrap.termIndex] = matchWrap.term.must;
      }
      return keepIt;
    });

    return !musts.some(function (must) { return must === false; })
      && !!matchWraps.length
      && matchWraps.map(function (matchWrap) { return matchWrap.match; });
  };
}

function parseLocalDate(strDate, opt_ctrl, opt_negateTzOffset) {
  let match = RGX_LOOSE_DATE.exec(strDate);
  if (match) {
    let date = new Date(+match[1], +match[2] - 1, +match[3], +match[4] || 0, +match[5] || 0, +match[6] || 0, +match[7] || 0);
    date.actual = (opt_ctrl && opt_ctrl.panel.tzOffsetType)
      ? offsetByTZ(
          date,
          (opt_negateTzOffset ? -1 : 1) * (
            opt_ctrl.panel.tzOffsetType === 'TIMEZONE'
              ? opt_ctrl.panel.tzOffset
              : opt_ctrl.panel.tzOffsetType === 'NO-TIMEZONE'
                ? LOCAL_TZ_OFFSET
                : -LOCAL_TZ_OFFSET
          )
        )
      : date;
    return date;
  }
}

function toLocalDateString(date) {
  return date && JS.formatDate(date, 'YYYY-MM-DD HH:mm:ss');
}

function parseOptionalNumber(strNum) {
  if (strNum) {
    if ('function' === typeof BigInt && /^-?(0|[1-9]\d+)n$/.test(strNum)) {
      return BigInt(strNum.slice(0, -1));
    }
    else if (!isNaN(strNum = +strNum)) {
      return strNum;
    }
  }
}

/**
 * Always returns the same value unless this is an object of some sort or this
 * is a formula string.
 * @see https://docs.sheetjs.com/
 * @param {any} value
 * @returns {any}
 */
function _parseXLSXValue(value) {
  let typeName;
  if (value instanceof Date || (typeName = typeof value) === 'bigint' || typeName === 'number') {
    return value;
  }
  value = [value] + '';
  return /^=\w+\(/.test(value)
    ? {f: value.slice(1)}
    // Makes sure that numbers are represented correctly.
    : /^-?(?:[1-9]\d*|0)(?:\.\d+)?$/.test(value)
      ? +value
      : value;
}

/**
 * @typedef {Object} SaveXLSX_Settings
 * @property {string} fileName
 * @property {SaveXLSX_Worksheet[]} worksheets
 */

/**
 * @typedef {Object} SaveXLSX_Worksheet
 * @property {string=} name
 * @property {any[]=} headers
 * @property {(any[][]|Array<{[k: string]: any}>)} rows
 */

/**
 * @param {SaveXLSX_Settings} settings
 */
 function saveXLSX(settings) {
  const {fileName, worksheets} = settings;
  const wb = XLSX.utils.book_new();

  // Parses the worksheet objects that were passed in and adds them to wb.
  worksheets.forEach(({name, rows, headers}, worksheetIndex) => {
    let prependHeaders = !!headers;

    // Keeps track of the index of each header (AKA key).
    const indexOfKeys = (headers ??= []).reduce(
      (indexOfKeys, k, i) => Object.assign(indexOfKeys, {[k]: i}),
      {}
    );

    // Indicates of the first non-empty row is an array or an object to figure
    // out how to process the rows.
    const firstNonEmptyRow = rows.find(
      row => (Array.isArray(row) ? row : Object.keys(row)).length
    );

    // If this is an array of arrays just make sure that rows is an array of
    // arrays.
    if (Array.isArray(firstNonEmptyRow)) {
      rows = rows.map(r => r.map(_parseXLSXValue));
    }
    // If this is an array of objects get rows as an array of arrays and make
    // sure to add any headers that are missing to the `headers` array.
    else {
      prependHeaders = true;
      rows = rows.map(row => {
        const newRow = [];
        for (const [key, value] of Object.entries(row)) {
          let keyIndex = indexOfKeys[key];
          if ('number' !== typeof keyIndex) {
            indexOfKeys[key] = keyIndex = headers.push(key) - 1;
          }
          newRow[keyIndex] = _parseXLSXValue(value);
        }
        return newRow;
      });
    }

    // If `headers` was defined or `rows` was an array of objects then make sure
    // the first row is the array of headers.
    if (prependHeaders) {
      rows = [headers].concat(rows);
    }
    
    // Add this new worksheet to the workbook.
    XLSX.utils.book_append_sheet(
      wb,
      XLSX.utils.aoa_to_sheet(rows),
      name ?? `Sheet${worksheetIndex + 1}`
    );
  });

  const wbOut = XLSX.write(wb, {
    bookType: 'xlsx',
    bookSST: true,
    type: 'binary'
  });
  const wbOutBin64 = btoa(wbOut);
  Object.assign(
    document.createElement('a'),
    {
      href: `data:;base64,${wbOutBin64}`,
      download: fileName ?? `workbook-${(new Date).toJSON()}.xlsx`
    }
  ).click();
}

/**
 * Finds the minimum indentation of all of the lines that have non-space
 * characters and removes the indentation accordingly for all indented lines.
 * @param {string} text
 *   The string containing the lines of text that should be unindented.
 * @param {{trim: boolean, tabSize: number}=} opt_options
 *   Optional, defaults to `{trim: true, tabSize: 4}`.  The `trim` property
 *   indicates if leading lines should be removed along with trailing
 *   whitespaces.  The `tabSize` property indicates how many spaces will be
 *   used to replace all tab characters.
 * @returns {string}
 *   A new version of `text` with all of the minimally indented lines having
 *   no leading spacing and all other indented lines following suit.  If
 *   `opt_options.trim` is `true` all leading lines and trailing spaces will
 *   not exist.  All tab characters will be replaced with
 *   `opt_options.tabSize` amount of space characters.
 * @see https://gist.github.com/westc/8acb0f026014a6630b0b8ecbfeaf51f1
 */
 function unindentMin(text, opt_options) {
  opt_options = Object(opt_options);
  const tabSize = opt_options.tabSize ?? 4;
  const trim = opt_options.trim ?? true;
  text = text.replace(/\t/g, ' '.repeat(tabSize));
  if (!/(^|[\r\n])\S/.test(text)) {
    const rgx = /(^|[\r\n])((?:(?!\r|\n)\s)+)(?=(\S)?)/g;
    let min = Infinity;
    for (let match; match = rgx.exec(text);) {
      if (match[3]) {
        min = Math.min(min, match[2].length);
      }
    }
    text = text.replace(
      rgx,
      (_, start, spaces) => start + spaces.slice(min)
    );
  }
  return trim ? text.replace(/^(\s*[\r\n]+)+|\s+$/g, '') : text;
}

/**
 * A tag function which can be used to create verbose regular expressions.
 * @license Copyright 2021 - Chris West - MIT Licensed
 * @see https://gist.github.com/westc/dc1b74018d278147e05cac3018acd8e5
 */
 function vRegExp(input, ...fillins) {
  let {raw} = input;
  let content = raw[0];
  for (let i = 1, l = raw.length; i < l; i++) {
    content += fillins[i - 1] + raw[i];
  }
  content = content.replace(/^(\\[^])|\s+|\/\/.*|\/\*[^]*?\*\//g, '$1');
  return new RegExp(
    content.replace(/^(?:\(\?\w+\))+/g, ''),
    content.replace(/\(\?(\w+)\)|[^(]+|\(/g, '$1')
  );
}

export {
  getCellValue,
  getHtmlText,
  offsetByTZ,
  parseLocalDate,
  parseOptionalNumber,
  parseRegExp,
  pseudoCssToJSON,
  saveXLSX,
  term,
  toLocalDateString,
  toCSV,
  unindentMin,
  vRegExp,
};
