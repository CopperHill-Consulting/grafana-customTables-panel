import { getValueFormat } from './format-values';

const RGX_CELL_PLACEHOLDER = /\$\{(time)(?:-(to|from))?\}|\$\{(?:(value|cell|0|[1-9]\d*)|(col|join-col|var):((?:[^\}:\\]*|\\.)+))(?::(?:(raw)|(escape)|(param)(?::((?:[^\}:\\]*|\\.)+))?))?\}/g;
const RGX_OLD_VAR_WORKAROUND = /([\?&])var-(\$\{var:(?:[^\}:\\]*|\\.)+:param\})/g;
const RGX_ESCAPED_CHARS = /\\(.)/g;

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
  return rows
    .map(function (row) {
      return row.map(function (cell) {
        cell = cell != null
          ? 'function' === typeof cell.toString
            ? cell + ""
            : Object.prototype.toString.call(cell)
          : nullString;
        return /[",\n\r]/.test(cell) ? '"' + (cell).replace(/"/g, '""') + '"' : cell;
      }).join(',');
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
  opt_tzOffset = opt_tzOffset == null ? date.getTimezoneOffset() : opt_tzOffset;
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

  let timeVars = ctrl.timeSrv.time;

  if (/^dateTime/.test(unitFormat)) {
    let date = tzOffsetType === 'NO-TIMEZONE'
      ? offsetByTZ(cell)
      : tzOffsetType === 'TIMEZONE'
        ? offsetByTZ(cell, tzOffset)
        : new Date(cell);
    matches.value = getValueFormat(unitFormat)(date, unitFormatString);
  }
  else {
    matches.value = matches.cell = (!['none', null, void 0].includes(unitFormat) && 'number' === typeof cell)
      ? getValueFormat(unitFormat)(cell, unitFormatDecimals, null)
      : cell
  }

  return valToMod.replace(RGX_OLD_VAR_WORKAROUND, '$1$2').replace(
    RGX_CELL_PLACEHOLDER,
    function (match0, isTime, opt_timePart, matchesKey, isColOrVar, name, isRaw, isEscape, isParam, paramName) {
      if (isTime) {
        return (opt_timePart != 'to' ? 'from=' + encodeURIComponent(stringify(timeVars.from)) : '')
          + (opt_timePart ? '' : '&')
          + (opt_timePart != 'from' ? 'to=' + encodeURIComponent(stringify(timeVars.to)) : '');
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

module.exports = { toCSV, parseRegExp, pseudoCssToJSON, getCellValue, getHtmlText };