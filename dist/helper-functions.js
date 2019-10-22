"use strict";

var JS = _interopRequireWildcard(require("./external/YourJS.min"));

var _formatValues = require("./format-values");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var RGX_CELL_PLACEHOLDER = /\$\{(time)(?:-(to|from))?\}|\$\{(?:(value|cell|0|[1-9]\d*)|(col|join-col|var):((?:[^\}:\\]*|\\.)+))(?::(?:(raw)|(escape)|(param)(?::((?:[^\}:\\]*|\\.)+))?))?\}/g;
var RGX_OLD_VAR_WORKAROUND = /([\?&])var-(\$\{var:(?:[^\}:\\]*|\\.)+:param\})/g;
var RGX_ESCAPED_CHARS = /\\(.)/g;
var RGX_LOOSE_DATE = /^(\d{4})-(\d\d?)-(\d\d?)(?:(?:T|\s+)(\d\d?):(\d\d?)(?::(\d\d?)(?:\.(\d\d?\d?))?)?)?$/;
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

  var nullString = opt_options.hasOwnProperty('nullString') ? opt_options.nullString : '(NULL)';
  var delimiter = opt_options.delimiter || ',';
  var RGX_DELIMIT = delimiter === ',' ? /[",\n\r]/ : new RegExp('["\r\n' + JS.quoteRegExp(delimiter) + ']');
  return rows.map(function (row) {
    return row.map(function (cell) {
      cell = cell != null ? 'function' === typeof cell.toString ? cell + "" : Object.prototype.toString.call(cell) : nullString;
      return RGX_DELIMIT.test(cell) ? '"' + cell.replace(/"/g, '""') + '"' : cell;
    }).join(delimiter);
  }).join('\n');
}

function parseRegExp(strPattern) {
  var parts = /^\/(.+)\/(\w*)$/.exec(strPattern);
  return parts ? new RegExp(parts[1], parts[2]) : new RegExp('^' + _.escapeRegExp(strPattern) + '$', 'i');
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

function offsetByTZ(date, opt_tzOffset) {
  date = new Date(date);
  opt_tzOffset = opt_tzOffset == null ? date.getTimezoneOffset() : opt_tzOffset;
  return new Date(+date + opt_tzOffset * 6e4);
}

function getCellValue(valToMod, isForLink, options) {
  var cell = options.cell,
      cellsByColName = options.cellsByColName,
      joinValues = options.joinValues,
      colIndex = options.colIndex,
      rgx = options.rgx,
      ctrl = options.ctrl,
      varsByName = options.varsByName,
      rule = options.rule;
  var ruleType = rule.type,
      unitFormat = rule.unitFormat,
      unitFormatString = rule.unitFormatString,
      unitFormatDecimals = rule.unitFormatDecimals,
      tzOffsetType = rule.tzOffsetType,
      tzOffset = rule.tzOffset;
  var matches = ruleType === 'FILTER' ? cell != null ? Object(rgx.exec(cell + '')) : {
    '0': 'null'
  } : {
    '0': cell
  };

  var _ctrl$timeSrv$timeRan = ctrl.timeSrv.timeRangeForUrl(),
      from = _ctrl$timeSrv$timeRan.from,
      to = _ctrl$timeSrv$timeRan.to;

  if (/^dateTime/.test(unitFormat)) {
    var date = tzOffsetType === 'NO-TIMEZONE' ? offsetByTZ(cell) : tzOffsetType === 'TIMEZONE' ? offsetByTZ(cell, tzOffset) : new Date(cell);
    matches.value = (0, _formatValues.getValueFormat)(unitFormat)(date, unitFormatString);
  } else {
    matches.value = matches.cell = !['none', null, void 0].includes(unitFormat) && 'number' === typeof cell ? (0, _formatValues.getValueFormat)(unitFormat)(cell, unitFormatDecimals, null) : cell;
  }

  return valToMod.replace(RGX_OLD_VAR_WORKAROUND, '$1$2').replace(RGX_CELL_PLACEHOLDER, function (match0, isTime, opt_timePart, matchesKey, isColOrVar, name, isRaw, isEscape, isParam, paramName) {
    if (isTime) {
      return (opt_timePart != 'to' ? 'from=' + encodeURIComponent(from) : '') + (opt_timePart ? '' : '&') + (opt_timePart != 'from' ? 'to=' + encodeURIComponent(to) : '');
    }

    isRaw = isRaw || !(isForLink || isEscape);
    name = matchesKey || name && name.replace(RGX_ESCAPED_CHARS, '$1');

    var result = _toConsumableArray(new Set(matchesKey ? _.has(matches, matchesKey) ? [matches[matchesKey]] : [] : isColOrVar === 'col' ? _.has(cellsByColName, name) ? [cellsByColName[name]] : [] : isColOrVar === 'join-col' ? joinValues && _.has(joinValues[colIndex], name) ? [joinValues[colIndex][name]] : [] : _.has(varsByName, name) ? varsByName[name] : []));

    return result.length < 1 ? match0 : isRaw ? result.join(',') : isParam ? result.map(function (v) {
      return encodeURIComponent(paramName == undefined ? isColOrVar === 'var' ? "var-".concat(name) : name : paramName) + '=' + encodeURIComponent(v);
    }).join('&') : encodeURIComponent(result.join(','));
  });
} // TODO:  Should be improved if other types will be passed


var stringify = function stringify(value) {
  return value instanceof Date ? +value : value && value._isAMomentObject ? +value.toDate() : "".concat(value);
};

var getHtmlText = function (div) {
  return function (html) {
    return div.innerHTML = html, div.textContent;
  };
}(document.createElement('div'));
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
  strTerm.replace(/(?:(\+)|(-))?(?:\/((?:[^\\\/]+|\\.)+)\/(i?)|"((?:[^"]+|"")*)"|(\S+))/g, function (match, hasPlus, hasMinus, rgxBody, rgxFlags, quoteBody, word) {
    try {
      var must = hasPlus === '+' ? true : hasMinus === '-' ? false : undefined;
      terms.push({
        rgx: rgxBody ? new RegExp(rgxBody, (rgxFlags || '') + 'g') : new RegExp((quoteBody || word).replace(/(^\b)|(\s)|([\[\]\{\}\(\)\+\$\^\\\|\?])|("")|(\*)|(\b$)/g, function (match, breakStart, space, specialChar, isQuote, isAsterisk, breakEnd) {
          return space ? '\\s+' : specialChar ? '\\' + specialChar : isQuote ? '"' : isAsterisk ? '.*' : breakStart === '' || breakEnd === '' && (!opt_options.matchWordStart || quoteBody) ? '\\b' : match;
        }), 'g' + (opt_options.ignoreCase === false ? '' : 'i')),
        must: hasPlus === '+' ? true : hasMinus === '-' ? false : undefined
      });
      DEFAULT_MUSTS.push(must !== true);
    } catch (e) {
      if (opt_options.ignoreErrors) {
        console.warn(e);
      } else {
        throw e;
      }
    }
  });
  return function (str) {
    var musts = DEFAULT_MUSTS.slice();
    var matchWraps = [];
    terms.forEach(function (term, termIndex) {
      var match;

      while (match = term.rgx.exec(str)) {
        if (match[0] === '') {
          term.rgx.lastIndex++;
        }

        matchWraps.push({
          match: match,
          term: term,
          termIndex: termIndex
        });
      }
    });
    matchWraps = matchWraps.sort(function (a, b) {
      return a.match.index - b.match.index || a.termIndex - b.termIndex;
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
    return !musts.some(function (must) {
      return must === false;
    }) && !!matchWraps.length && matchWraps.map(function (matchWrap) {
      return matchWrap.match;
    });
  };
}

function parseLocalDate(strDate) {
  var match = RGX_LOOSE_DATE.exec(strDate);

  if (match) {
    return new Date(+match[1], +match[2] - 1, +match[3], +match[4] || 0, +match[5] || 0, +match[6] || 0, +match[7] || 0);
  }
}

function parseOptionalNumber(strNum) {
  if (strNum) {
    if ('function' === typeof BigInt && /^-?(0|[1-9]\d+)n$/.test(strNum)) {
      return BigInt(strNum.slice(0, -1));
    } else if (!isNaN(strNum = +strNum)) {
      return strNum;
    }
  }
}

module.exports = {
  toCSV: toCSV,
  parseRegExp: parseRegExp,
  pseudoCssToJSON: pseudoCssToJSON,
  getCellValue: getCellValue,
  getHtmlText: getHtmlText,
  term: term,
  parseLocalDate: parseLocalDate,
  parseOptionalNumber: parseOptionalNumber
};
//# sourceMappingURL=helper-functions.js.map
