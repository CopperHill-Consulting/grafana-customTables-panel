/**
 * @preserve Copyright (c)
 *     2019 Christopher West
 *     Licensed under the MIT license.
 */
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