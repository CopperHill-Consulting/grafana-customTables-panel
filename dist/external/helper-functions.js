const RGX_SIMPLE_NUMBER = /^\d+(\.\d+)?$/;

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

function getCellValue(valToMod, isForLink, { cell, cellsByColName, ruleType, rgx, ctrl, varsByName }) {
  let matches = ruleType === 'FILTER'
    ? cell != null
      ? rgx.exec(cell + '')
      : { '0': 'null' }
    : { '0': cell };
  _.extend(matches, { value: cell, cell });
  return valToMod.replace(
    /\${(?:(value|cell|0|[1-9]\d*)|(col|var):((?:[^\}:\\]*|\\.)+))(?::(?:(raw)|(escape)|(param)(?::((?:[^\}:\\]*|\\.)+))?))?}/g,
    function (match, matchesKey, type, name, isRaw, isEscape, isParam, paramName) {
      isRaw = isRaw || !(isForLink || isEscape);
      name = matchesKey || (name && name.replace(/\\(.)/g, '$1'));
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
