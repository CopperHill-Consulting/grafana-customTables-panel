import * as JS from './external/YourJS.min';
import { getValueFormat } from './format-values';

const RGX_CELL_PLACEHOLDER = /\$\{(time)(?:-(to|from))?\}|\$\{(?:(value|cell|0|[1-9]\d*)|(col|join-col|var):((?:[^\}:\\]*|\\.)+))(?::(?:(raw)|(escape)|(param)(?::((?:[^\}:\\]*|\\.)+))?))?\}/g;
const RGX_OLD_VAR_WORKAROUND = /([\?&])var-(\$\{var:(?:[^\}:\\]*|\\.)+:param\})/g;
const RGX_ESCAPED_CHARS = /\\(.)/g;
const RGX_LOOSE_DATE = /^(\d{4})-(\d\d?)-(\d\d?)(?:(?:T|\s+)(\d\d?):(\d\d?)(?::(\d\d?)(?:\.(\d\d?\d?))?)?)?$/;

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

  let { from, to } = ctrl.timeSrv.timeRangeForUrl();

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

/*
Possible options properties:
- title (string):
    Required.  The title shown for the dialog.
- contents (Array<Object|string>|Object|string):
    Required.  Any object that is given should represent an element as specified
    by YourJS.dom().  Any strings given should contain the text to show.
- css (Object):
    Optional.  Represents a CSS stylesheet as specified by YourJS.css().
- showCloser (boolean):
    Optional.  If true the close button in the top-right corner will be shown.
*/
function showYourJSDialog(options) {
  options = Object(options);

  var body = document.body;

  var wrap = JS.dom({
    _: 'div',
    $: {
      _: 'div',
      cls: 'wrap-as-table',
      $: [
        {
          _: 'div',
          cls: 'header-row',
          $: [
            {
              _: 'div',
              cls: 'header-cell',
              $: [
                options.title,
                {
                  _: 'div',
                  cls: 'closer',
                  text: '\xA0\xA0\xD7\xA0\xA0',
                  onclick: closeDialog
                }
              ].slice(0, (options.showCloser || options.showCloser == undefined) ? 2 : 1)
            }
          ]
        },
        {
          _: 'div',
          cls: 'content-row',
          $: {
            _: 'div',
            cls: 'content-cell',
            $: {
              _: 'div',
              cls: 'content-div',
              $: options.contents
            }
          }
        }
      ]
    }
  });
  body.appendChild(wrap);
  var css = JS.css({
    '&': options.css || {},
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: '9999',
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: '16px 5%',

    '>.wrap-as-table': {
      display: 'table',
      maxHeight: '100%',
      width: '100%',
      backgroundColor: '#FFF',
      borderRadius: '0.5em',
      boxShadow: 'inset 0 0 5px #000, 0 0 5px #000',
      overflow: 'hidden',

      '>.header-row': {
        display: 'table-row',
        fontSize: '1.75em',
        fontWeight: 'bold',
        textShadow: '2px 2px rgba(0,0,0,0.125)',

        '>.header-cell': {
          display: 'table-cell',
          height: 1,
          width: '99%',
          boxShadow: '0 3px 3px -3px',
          paddingLeft: '8px',
          backgroundImage: 'linear-gradient(to bottom, rgba(0,0,0,0) 50%, rgba(0,0,0,0.125) 60%, rgba(0,0,0,0.0625))',

          '>.closer': {
            color: '#FFF',
            backgroundColor: '#F00',
            textAlign: 'center',
            borderRadius: '1em',
            cursor: 'pointer',
            boxShadow: '0 0 3px 1px #000, inset -0.125em -0.125em 0.5em #000',
            height: '1.5em',
            width: '1.5em',
            float: 'right',

            '&:hover': {
              backgroundColor: '#B00'
            }
          }
        }
      },

      '>.content-row': {
        display: 'table-row',

        '>.content-cell': {
          display: 'table-cell',
          height: '99%',
          overflow: 'auto',

          '>.content-div': {
            maxHeight: '85vh',
            padding: '8px',
            overflow: 'auto'
          }
        }
      }
    }
  }, wrap);

  function closeDialog() {
    body.removeChild(wrap);
    css.parentNode.removeChild(css);
  }

  return {
    close: closeDialog,
    stylesheet: css,
    rootElement: wrap
  };
}

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

function parseLocalDate(strDate) {
  let match = RGX_LOOSE_DATE.exec(strDate);
  if (match) {
    return new Date(+match[1], +match[2] - 1, +match[3], +match[4] || 0, +match[5] || 0, +match[6] || 0, +match[7] || 0);
  }
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

function getSwitchSliderFormDOM(label, isOn, id, opt_formAtts) {
  return _.extend(
    {
      _: 'div',
      cls: 'gf-form',
      $: [
        {
          _: 'label',
          cls: 'gf-form-label',
          htmlFor: id,
          text: label
        },
        {
          _: 'div',
          cls: 'gf-form-switch',
          $: [
            {
              _: 'input',
              id: id,
              type: 'checkbox',
              cls: `ng-valid ng-dirty ng-valid-parse ng-touched ng-${isOn ? 'not-' : ''}empty`,
              oninput() {
                this.className = `ng-valid ng-dirty ng-valid-parse ng-touched ng-${this.checked ? 'not-' : ''}empty`;
              },
              [isOn ? 'checked' : 'data-checked']: isOn
            },
            {
              _: 'label',
              cls: 'gf-form-switch__slider',
              htmlFor: id
            }
          ]
        }
      ]
    },
    Object(opt_formAtts)
  );
}

module.exports = {
  toCSV,
  parseRegExp,
  pseudoCssToJSON,
  getCellValue,
  getHtmlText,
  showYourJSDialog,
  term,
  parseLocalDate,
  parseOptionalNumber,
  getSwitchSliderFormDOM
};