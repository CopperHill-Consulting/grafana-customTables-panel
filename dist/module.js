define(["@grafana/data","app/plugins/sdk","jquery","lodash"], function(__WEBPACK_EXTERNAL_MODULE__grafana_data__, __WEBPACK_EXTERNAL_MODULE_grafana_app_plugins_sdk__, __WEBPACK_EXTERNAL_MODULE_jquery__, __WEBPACK_EXTERNAL_MODULE_lodash__) { return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./module.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "../node_modules/base64-js/index.js":
/*!******************************************!*\
  !*** ../node_modules/base64-js/index.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.byteLength = byteLength
exports.toByteArray = toByteArray
exports.fromByteArray = fromByteArray

var lookup = []
var revLookup = []
var Arr = typeof Uint8Array !== 'undefined' ? Uint8Array : Array

var code = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
for (var i = 0, len = code.length; i < len; ++i) {
  lookup[i] = code[i]
  revLookup[code.charCodeAt(i)] = i
}

// Support decoding URL-safe base64 strings, as Node.js does.
// See: https://en.wikipedia.org/wiki/Base64#URL_applications
revLookup['-'.charCodeAt(0)] = 62
revLookup['_'.charCodeAt(0)] = 63

function getLens (b64) {
  var len = b64.length

  if (len % 4 > 0) {
    throw new Error('Invalid string. Length must be a multiple of 4')
  }

  // Trim off extra bytes after placeholder bytes are found
  // See: https://github.com/beatgammit/base64-js/issues/42
  var validLen = b64.indexOf('=')
  if (validLen === -1) validLen = len

  var placeHoldersLen = validLen === len
    ? 0
    : 4 - (validLen % 4)

  return [validLen, placeHoldersLen]
}

// base64 is 4/3 + up to two characters of the original data
function byteLength (b64) {
  var lens = getLens(b64)
  var validLen = lens[0]
  var placeHoldersLen = lens[1]
  return ((validLen + placeHoldersLen) * 3 / 4) - placeHoldersLen
}

function _byteLength (b64, validLen, placeHoldersLen) {
  return ((validLen + placeHoldersLen) * 3 / 4) - placeHoldersLen
}

function toByteArray (b64) {
  var tmp
  var lens = getLens(b64)
  var validLen = lens[0]
  var placeHoldersLen = lens[1]

  var arr = new Arr(_byteLength(b64, validLen, placeHoldersLen))

  var curByte = 0

  // if there are placeholders, only get up to the last complete 4 chars
  var len = placeHoldersLen > 0
    ? validLen - 4
    : validLen

  var i
  for (i = 0; i < len; i += 4) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 18) |
      (revLookup[b64.charCodeAt(i + 1)] << 12) |
      (revLookup[b64.charCodeAt(i + 2)] << 6) |
      revLookup[b64.charCodeAt(i + 3)]
    arr[curByte++] = (tmp >> 16) & 0xFF
    arr[curByte++] = (tmp >> 8) & 0xFF
    arr[curByte++] = tmp & 0xFF
  }

  if (placeHoldersLen === 2) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 2) |
      (revLookup[b64.charCodeAt(i + 1)] >> 4)
    arr[curByte++] = tmp & 0xFF
  }

  if (placeHoldersLen === 1) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 10) |
      (revLookup[b64.charCodeAt(i + 1)] << 4) |
      (revLookup[b64.charCodeAt(i + 2)] >> 2)
    arr[curByte++] = (tmp >> 8) & 0xFF
    arr[curByte++] = tmp & 0xFF
  }

  return arr
}

function tripletToBase64 (num) {
  return lookup[num >> 18 & 0x3F] +
    lookup[num >> 12 & 0x3F] +
    lookup[num >> 6 & 0x3F] +
    lookup[num & 0x3F]
}

function encodeChunk (uint8, start, end) {
  var tmp
  var output = []
  for (var i = start; i < end; i += 3) {
    tmp =
      ((uint8[i] << 16) & 0xFF0000) +
      ((uint8[i + 1] << 8) & 0xFF00) +
      (uint8[i + 2] & 0xFF)
    output.push(tripletToBase64(tmp))
  }
  return output.join('')
}

function fromByteArray (uint8) {
  var tmp
  var len = uint8.length
  var extraBytes = len % 3 // if we have 1 byte left, pad 2 bytes
  var parts = []
  var maxChunkLength = 16383 // must be multiple of 3

  // go through the array every three bytes, we'll deal with trailing stuff later
  for (var i = 0, len2 = len - extraBytes; i < len2; i += maxChunkLength) {
    parts.push(encodeChunk(uint8, i, (i + maxChunkLength) > len2 ? len2 : (i + maxChunkLength)))
  }

  // pad the end with zeros, but make sure to not forget the extra bytes
  if (extraBytes === 1) {
    tmp = uint8[len - 1]
    parts.push(
      lookup[tmp >> 2] +
      lookup[(tmp << 4) & 0x3F] +
      '=='
    )
  } else if (extraBytes === 2) {
    tmp = (uint8[len - 2] << 8) + uint8[len - 1]
    parts.push(
      lookup[tmp >> 10] +
      lookup[(tmp >> 4) & 0x3F] +
      lookup[(tmp << 2) & 0x3F] +
      '='
    )
  }

  return parts.join('')
}


/***/ }),

/***/ "../node_modules/buffer/index.js":
/*!***************************************!*\
  !*** ../node_modules/buffer/index.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <http://feross.org>
 * @license  MIT
 */
/* eslint-disable no-proto */



var base64 = __webpack_require__(/*! base64-js */ "../node_modules/base64-js/index.js")
var ieee754 = __webpack_require__(/*! ieee754 */ "../node_modules/ieee754/index.js")
var isArray = __webpack_require__(/*! isarray */ "../node_modules/isarray/index.js")

exports.Buffer = Buffer
exports.SlowBuffer = SlowBuffer
exports.INSPECT_MAX_BYTES = 50

/**
 * If `Buffer.TYPED_ARRAY_SUPPORT`:
 *   === true    Use Uint8Array implementation (fastest)
 *   === false   Use Object implementation (most compatible, even IE6)
 *
 * Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,
 * Opera 11.6+, iOS 4.2+.
 *
 * Due to various browser bugs, sometimes the Object implementation will be used even
 * when the browser supports typed arrays.
 *
 * Note:
 *
 *   - Firefox 4-29 lacks support for adding new properties to `Uint8Array` instances,
 *     See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438.
 *
 *   - Chrome 9-10 is missing the `TypedArray.prototype.subarray` function.
 *
 *   - IE10 has a broken `TypedArray.prototype.subarray` function which returns arrays of
 *     incorrect length in some situations.

 * We detect these buggy browsers and set `Buffer.TYPED_ARRAY_SUPPORT` to `false` so they
 * get the Object implementation, which is slower but behaves correctly.
 */
Buffer.TYPED_ARRAY_SUPPORT = global.TYPED_ARRAY_SUPPORT !== undefined
  ? global.TYPED_ARRAY_SUPPORT
  : typedArraySupport()

/*
 * Export kMaxLength after typed array support is determined.
 */
exports.kMaxLength = kMaxLength()

function typedArraySupport () {
  try {
    var arr = new Uint8Array(1)
    arr.__proto__ = {__proto__: Uint8Array.prototype, foo: function () { return 42 }}
    return arr.foo() === 42 && // typed array instances can be augmented
        typeof arr.subarray === 'function' && // chrome 9-10 lack `subarray`
        arr.subarray(1, 1).byteLength === 0 // ie10 has broken `subarray`
  } catch (e) {
    return false
  }
}

function kMaxLength () {
  return Buffer.TYPED_ARRAY_SUPPORT
    ? 0x7fffffff
    : 0x3fffffff
}

function createBuffer (that, length) {
  if (kMaxLength() < length) {
    throw new RangeError('Invalid typed array length')
  }
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    // Return an augmented `Uint8Array` instance, for best performance
    that = new Uint8Array(length)
    that.__proto__ = Buffer.prototype
  } else {
    // Fallback: Return an object instance of the Buffer class
    if (that === null) {
      that = new Buffer(length)
    }
    that.length = length
  }

  return that
}

/**
 * The Buffer constructor returns instances of `Uint8Array` that have their
 * prototype changed to `Buffer.prototype`. Furthermore, `Buffer` is a subclass of
 * `Uint8Array`, so the returned instances will have all the node `Buffer` methods
 * and the `Uint8Array` methods. Square bracket notation works as expected -- it
 * returns a single octet.
 *
 * The `Uint8Array` prototype remains unmodified.
 */

function Buffer (arg, encodingOrOffset, length) {
  if (!Buffer.TYPED_ARRAY_SUPPORT && !(this instanceof Buffer)) {
    return new Buffer(arg, encodingOrOffset, length)
  }

  // Common case.
  if (typeof arg === 'number') {
    if (typeof encodingOrOffset === 'string') {
      throw new Error(
        'If encoding is specified then the first argument must be a string'
      )
    }
    return allocUnsafe(this, arg)
  }
  return from(this, arg, encodingOrOffset, length)
}

Buffer.poolSize = 8192 // not used by this implementation

// TODO: Legacy, not needed anymore. Remove in next major version.
Buffer._augment = function (arr) {
  arr.__proto__ = Buffer.prototype
  return arr
}

function from (that, value, encodingOrOffset, length) {
  if (typeof value === 'number') {
    throw new TypeError('"value" argument must not be a number')
  }

  if (typeof ArrayBuffer !== 'undefined' && value instanceof ArrayBuffer) {
    return fromArrayBuffer(that, value, encodingOrOffset, length)
  }

  if (typeof value === 'string') {
    return fromString(that, value, encodingOrOffset)
  }

  return fromObject(that, value)
}

/**
 * Functionally equivalent to Buffer(arg, encoding) but throws a TypeError
 * if value is a number.
 * Buffer.from(str[, encoding])
 * Buffer.from(array)
 * Buffer.from(buffer)
 * Buffer.from(arrayBuffer[, byteOffset[, length]])
 **/
Buffer.from = function (value, encodingOrOffset, length) {
  return from(null, value, encodingOrOffset, length)
}

if (Buffer.TYPED_ARRAY_SUPPORT) {
  Buffer.prototype.__proto__ = Uint8Array.prototype
  Buffer.__proto__ = Uint8Array
  if (typeof Symbol !== 'undefined' && Symbol.species &&
      Buffer[Symbol.species] === Buffer) {
    // Fix subarray() in ES2016. See: https://github.com/feross/buffer/pull/97
    Object.defineProperty(Buffer, Symbol.species, {
      value: null,
      configurable: true
    })
  }
}

function assertSize (size) {
  if (typeof size !== 'number') {
    throw new TypeError('"size" argument must be a number')
  } else if (size < 0) {
    throw new RangeError('"size" argument must not be negative')
  }
}

function alloc (that, size, fill, encoding) {
  assertSize(size)
  if (size <= 0) {
    return createBuffer(that, size)
  }
  if (fill !== undefined) {
    // Only pay attention to encoding if it's a string. This
    // prevents accidentally sending in a number that would
    // be interpretted as a start offset.
    return typeof encoding === 'string'
      ? createBuffer(that, size).fill(fill, encoding)
      : createBuffer(that, size).fill(fill)
  }
  return createBuffer(that, size)
}

/**
 * Creates a new filled Buffer instance.
 * alloc(size[, fill[, encoding]])
 **/
Buffer.alloc = function (size, fill, encoding) {
  return alloc(null, size, fill, encoding)
}

function allocUnsafe (that, size) {
  assertSize(size)
  that = createBuffer(that, size < 0 ? 0 : checked(size) | 0)
  if (!Buffer.TYPED_ARRAY_SUPPORT) {
    for (var i = 0; i < size; ++i) {
      that[i] = 0
    }
  }
  return that
}

/**
 * Equivalent to Buffer(num), by default creates a non-zero-filled Buffer instance.
 * */
Buffer.allocUnsafe = function (size) {
  return allocUnsafe(null, size)
}
/**
 * Equivalent to SlowBuffer(num), by default creates a non-zero-filled Buffer instance.
 */
Buffer.allocUnsafeSlow = function (size) {
  return allocUnsafe(null, size)
}

function fromString (that, string, encoding) {
  if (typeof encoding !== 'string' || encoding === '') {
    encoding = 'utf8'
  }

  if (!Buffer.isEncoding(encoding)) {
    throw new TypeError('"encoding" must be a valid string encoding')
  }

  var length = byteLength(string, encoding) | 0
  that = createBuffer(that, length)

  var actual = that.write(string, encoding)

  if (actual !== length) {
    // Writing a hex string, for example, that contains invalid characters will
    // cause everything after the first invalid character to be ignored. (e.g.
    // 'abxxcd' will be treated as 'ab')
    that = that.slice(0, actual)
  }

  return that
}

function fromArrayLike (that, array) {
  var length = array.length < 0 ? 0 : checked(array.length) | 0
  that = createBuffer(that, length)
  for (var i = 0; i < length; i += 1) {
    that[i] = array[i] & 255
  }
  return that
}

function fromArrayBuffer (that, array, byteOffset, length) {
  array.byteLength // this throws if `array` is not a valid ArrayBuffer

  if (byteOffset < 0 || array.byteLength < byteOffset) {
    throw new RangeError('\'offset\' is out of bounds')
  }

  if (array.byteLength < byteOffset + (length || 0)) {
    throw new RangeError('\'length\' is out of bounds')
  }

  if (byteOffset === undefined && length === undefined) {
    array = new Uint8Array(array)
  } else if (length === undefined) {
    array = new Uint8Array(array, byteOffset)
  } else {
    array = new Uint8Array(array, byteOffset, length)
  }

  if (Buffer.TYPED_ARRAY_SUPPORT) {
    // Return an augmented `Uint8Array` instance, for best performance
    that = array
    that.__proto__ = Buffer.prototype
  } else {
    // Fallback: Return an object instance of the Buffer class
    that = fromArrayLike(that, array)
  }
  return that
}

function fromObject (that, obj) {
  if (Buffer.isBuffer(obj)) {
    var len = checked(obj.length) | 0
    that = createBuffer(that, len)

    if (that.length === 0) {
      return that
    }

    obj.copy(that, 0, 0, len)
    return that
  }

  if (obj) {
    if ((typeof ArrayBuffer !== 'undefined' &&
        obj.buffer instanceof ArrayBuffer) || 'length' in obj) {
      if (typeof obj.length !== 'number' || isnan(obj.length)) {
        return createBuffer(that, 0)
      }
      return fromArrayLike(that, obj)
    }

    if (obj.type === 'Buffer' && isArray(obj.data)) {
      return fromArrayLike(that, obj.data)
    }
  }

  throw new TypeError('First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.')
}

function checked (length) {
  // Note: cannot use `length < kMaxLength()` here because that fails when
  // length is NaN (which is otherwise coerced to zero.)
  if (length >= kMaxLength()) {
    throw new RangeError('Attempt to allocate Buffer larger than maximum ' +
                         'size: 0x' + kMaxLength().toString(16) + ' bytes')
  }
  return length | 0
}

function SlowBuffer (length) {
  if (+length != length) { // eslint-disable-line eqeqeq
    length = 0
  }
  return Buffer.alloc(+length)
}

Buffer.isBuffer = function isBuffer (b) {
  return !!(b != null && b._isBuffer)
}

Buffer.compare = function compare (a, b) {
  if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b)) {
    throw new TypeError('Arguments must be Buffers')
  }

  if (a === b) return 0

  var x = a.length
  var y = b.length

  for (var i = 0, len = Math.min(x, y); i < len; ++i) {
    if (a[i] !== b[i]) {
      x = a[i]
      y = b[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

Buffer.isEncoding = function isEncoding (encoding) {
  switch (String(encoding).toLowerCase()) {
    case 'hex':
    case 'utf8':
    case 'utf-8':
    case 'ascii':
    case 'latin1':
    case 'binary':
    case 'base64':
    case 'ucs2':
    case 'ucs-2':
    case 'utf16le':
    case 'utf-16le':
      return true
    default:
      return false
  }
}

Buffer.concat = function concat (list, length) {
  if (!isArray(list)) {
    throw new TypeError('"list" argument must be an Array of Buffers')
  }

  if (list.length === 0) {
    return Buffer.alloc(0)
  }

  var i
  if (length === undefined) {
    length = 0
    for (i = 0; i < list.length; ++i) {
      length += list[i].length
    }
  }

  var buffer = Buffer.allocUnsafe(length)
  var pos = 0
  for (i = 0; i < list.length; ++i) {
    var buf = list[i]
    if (!Buffer.isBuffer(buf)) {
      throw new TypeError('"list" argument must be an Array of Buffers')
    }
    buf.copy(buffer, pos)
    pos += buf.length
  }
  return buffer
}

function byteLength (string, encoding) {
  if (Buffer.isBuffer(string)) {
    return string.length
  }
  if (typeof ArrayBuffer !== 'undefined' && typeof ArrayBuffer.isView === 'function' &&
      (ArrayBuffer.isView(string) || string instanceof ArrayBuffer)) {
    return string.byteLength
  }
  if (typeof string !== 'string') {
    string = '' + string
  }

  var len = string.length
  if (len === 0) return 0

  // Use a for loop to avoid recursion
  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'ascii':
      case 'latin1':
      case 'binary':
        return len
      case 'utf8':
      case 'utf-8':
      case undefined:
        return utf8ToBytes(string).length
      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return len * 2
      case 'hex':
        return len >>> 1
      case 'base64':
        return base64ToBytes(string).length
      default:
        if (loweredCase) return utf8ToBytes(string).length // assume utf8
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}
Buffer.byteLength = byteLength

function slowToString (encoding, start, end) {
  var loweredCase = false

  // No need to verify that "this.length <= MAX_UINT32" since it's a read-only
  // property of a typed array.

  // This behaves neither like String nor Uint8Array in that we set start/end
  // to their upper/lower bounds if the value passed is out of range.
  // undefined is handled specially as per ECMA-262 6th Edition,
  // Section 13.3.3.7 Runtime Semantics: KeyedBindingInitialization.
  if (start === undefined || start < 0) {
    start = 0
  }
  // Return early if start > this.length. Done here to prevent potential uint32
  // coercion fail below.
  if (start > this.length) {
    return ''
  }

  if (end === undefined || end > this.length) {
    end = this.length
  }

  if (end <= 0) {
    return ''
  }

  // Force coersion to uint32. This will also coerce falsey/NaN values to 0.
  end >>>= 0
  start >>>= 0

  if (end <= start) {
    return ''
  }

  if (!encoding) encoding = 'utf8'

  while (true) {
    switch (encoding) {
      case 'hex':
        return hexSlice(this, start, end)

      case 'utf8':
      case 'utf-8':
        return utf8Slice(this, start, end)

      case 'ascii':
        return asciiSlice(this, start, end)

      case 'latin1':
      case 'binary':
        return latin1Slice(this, start, end)

      case 'base64':
        return base64Slice(this, start, end)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return utf16leSlice(this, start, end)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = (encoding + '').toLowerCase()
        loweredCase = true
    }
  }
}

// The property is used by `Buffer.isBuffer` and `is-buffer` (in Safari 5-7) to detect
// Buffer instances.
Buffer.prototype._isBuffer = true

function swap (b, n, m) {
  var i = b[n]
  b[n] = b[m]
  b[m] = i
}

Buffer.prototype.swap16 = function swap16 () {
  var len = this.length
  if (len % 2 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 16-bits')
  }
  for (var i = 0; i < len; i += 2) {
    swap(this, i, i + 1)
  }
  return this
}

Buffer.prototype.swap32 = function swap32 () {
  var len = this.length
  if (len % 4 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 32-bits')
  }
  for (var i = 0; i < len; i += 4) {
    swap(this, i, i + 3)
    swap(this, i + 1, i + 2)
  }
  return this
}

Buffer.prototype.swap64 = function swap64 () {
  var len = this.length
  if (len % 8 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 64-bits')
  }
  for (var i = 0; i < len; i += 8) {
    swap(this, i, i + 7)
    swap(this, i + 1, i + 6)
    swap(this, i + 2, i + 5)
    swap(this, i + 3, i + 4)
  }
  return this
}

Buffer.prototype.toString = function toString () {
  var length = this.length | 0
  if (length === 0) return ''
  if (arguments.length === 0) return utf8Slice(this, 0, length)
  return slowToString.apply(this, arguments)
}

Buffer.prototype.equals = function equals (b) {
  if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer')
  if (this === b) return true
  return Buffer.compare(this, b) === 0
}

Buffer.prototype.inspect = function inspect () {
  var str = ''
  var max = exports.INSPECT_MAX_BYTES
  if (this.length > 0) {
    str = this.toString('hex', 0, max).match(/.{2}/g).join(' ')
    if (this.length > max) str += ' ... '
  }
  return '<Buffer ' + str + '>'
}

Buffer.prototype.compare = function compare (target, start, end, thisStart, thisEnd) {
  if (!Buffer.isBuffer(target)) {
    throw new TypeError('Argument must be a Buffer')
  }

  if (start === undefined) {
    start = 0
  }
  if (end === undefined) {
    end = target ? target.length : 0
  }
  if (thisStart === undefined) {
    thisStart = 0
  }
  if (thisEnd === undefined) {
    thisEnd = this.length
  }

  if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
    throw new RangeError('out of range index')
  }

  if (thisStart >= thisEnd && start >= end) {
    return 0
  }
  if (thisStart >= thisEnd) {
    return -1
  }
  if (start >= end) {
    return 1
  }

  start >>>= 0
  end >>>= 0
  thisStart >>>= 0
  thisEnd >>>= 0

  if (this === target) return 0

  var x = thisEnd - thisStart
  var y = end - start
  var len = Math.min(x, y)

  var thisCopy = this.slice(thisStart, thisEnd)
  var targetCopy = target.slice(start, end)

  for (var i = 0; i < len; ++i) {
    if (thisCopy[i] !== targetCopy[i]) {
      x = thisCopy[i]
      y = targetCopy[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

// Finds either the first index of `val` in `buffer` at offset >= `byteOffset`,
// OR the last index of `val` in `buffer` at offset <= `byteOffset`.
//
// Arguments:
// - buffer - a Buffer to search
// - val - a string, Buffer, or number
// - byteOffset - an index into `buffer`; will be clamped to an int32
// - encoding - an optional encoding, relevant is val is a string
// - dir - true for indexOf, false for lastIndexOf
function bidirectionalIndexOf (buffer, val, byteOffset, encoding, dir) {
  // Empty buffer means no match
  if (buffer.length === 0) return -1

  // Normalize byteOffset
  if (typeof byteOffset === 'string') {
    encoding = byteOffset
    byteOffset = 0
  } else if (byteOffset > 0x7fffffff) {
    byteOffset = 0x7fffffff
  } else if (byteOffset < -0x80000000) {
    byteOffset = -0x80000000
  }
  byteOffset = +byteOffset  // Coerce to Number.
  if (isNaN(byteOffset)) {
    // byteOffset: it it's undefined, null, NaN, "foo", etc, search whole buffer
    byteOffset = dir ? 0 : (buffer.length - 1)
  }

  // Normalize byteOffset: negative offsets start from the end of the buffer
  if (byteOffset < 0) byteOffset = buffer.length + byteOffset
  if (byteOffset >= buffer.length) {
    if (dir) return -1
    else byteOffset = buffer.length - 1
  } else if (byteOffset < 0) {
    if (dir) byteOffset = 0
    else return -1
  }

  // Normalize val
  if (typeof val === 'string') {
    val = Buffer.from(val, encoding)
  }

  // Finally, search either indexOf (if dir is true) or lastIndexOf
  if (Buffer.isBuffer(val)) {
    // Special case: looking for empty string/buffer always fails
    if (val.length === 0) {
      return -1
    }
    return arrayIndexOf(buffer, val, byteOffset, encoding, dir)
  } else if (typeof val === 'number') {
    val = val & 0xFF // Search for a byte value [0-255]
    if (Buffer.TYPED_ARRAY_SUPPORT &&
        typeof Uint8Array.prototype.indexOf === 'function') {
      if (dir) {
        return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset)
      } else {
        return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset)
      }
    }
    return arrayIndexOf(buffer, [ val ], byteOffset, encoding, dir)
  }

  throw new TypeError('val must be string, number or Buffer')
}

function arrayIndexOf (arr, val, byteOffset, encoding, dir) {
  var indexSize = 1
  var arrLength = arr.length
  var valLength = val.length

  if (encoding !== undefined) {
    encoding = String(encoding).toLowerCase()
    if (encoding === 'ucs2' || encoding === 'ucs-2' ||
        encoding === 'utf16le' || encoding === 'utf-16le') {
      if (arr.length < 2 || val.length < 2) {
        return -1
      }
      indexSize = 2
      arrLength /= 2
      valLength /= 2
      byteOffset /= 2
    }
  }

  function read (buf, i) {
    if (indexSize === 1) {
      return buf[i]
    } else {
      return buf.readUInt16BE(i * indexSize)
    }
  }

  var i
  if (dir) {
    var foundIndex = -1
    for (i = byteOffset; i < arrLength; i++) {
      if (read(arr, i) === read(val, foundIndex === -1 ? 0 : i - foundIndex)) {
        if (foundIndex === -1) foundIndex = i
        if (i - foundIndex + 1 === valLength) return foundIndex * indexSize
      } else {
        if (foundIndex !== -1) i -= i - foundIndex
        foundIndex = -1
      }
    }
  } else {
    if (byteOffset + valLength > arrLength) byteOffset = arrLength - valLength
    for (i = byteOffset; i >= 0; i--) {
      var found = true
      for (var j = 0; j < valLength; j++) {
        if (read(arr, i + j) !== read(val, j)) {
          found = false
          break
        }
      }
      if (found) return i
    }
  }

  return -1
}

Buffer.prototype.includes = function includes (val, byteOffset, encoding) {
  return this.indexOf(val, byteOffset, encoding) !== -1
}

Buffer.prototype.indexOf = function indexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, true)
}

Buffer.prototype.lastIndexOf = function lastIndexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, false)
}

function hexWrite (buf, string, offset, length) {
  offset = Number(offset) || 0
  var remaining = buf.length - offset
  if (!length) {
    length = remaining
  } else {
    length = Number(length)
    if (length > remaining) {
      length = remaining
    }
  }

  // must be an even number of digits
  var strLen = string.length
  if (strLen % 2 !== 0) throw new TypeError('Invalid hex string')

  if (length > strLen / 2) {
    length = strLen / 2
  }
  for (var i = 0; i < length; ++i) {
    var parsed = parseInt(string.substr(i * 2, 2), 16)
    if (isNaN(parsed)) return i
    buf[offset + i] = parsed
  }
  return i
}

function utf8Write (buf, string, offset, length) {
  return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length)
}

function asciiWrite (buf, string, offset, length) {
  return blitBuffer(asciiToBytes(string), buf, offset, length)
}

function latin1Write (buf, string, offset, length) {
  return asciiWrite(buf, string, offset, length)
}

function base64Write (buf, string, offset, length) {
  return blitBuffer(base64ToBytes(string), buf, offset, length)
}

function ucs2Write (buf, string, offset, length) {
  return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length)
}

Buffer.prototype.write = function write (string, offset, length, encoding) {
  // Buffer#write(string)
  if (offset === undefined) {
    encoding = 'utf8'
    length = this.length
    offset = 0
  // Buffer#write(string, encoding)
  } else if (length === undefined && typeof offset === 'string') {
    encoding = offset
    length = this.length
    offset = 0
  // Buffer#write(string, offset[, length][, encoding])
  } else if (isFinite(offset)) {
    offset = offset | 0
    if (isFinite(length)) {
      length = length | 0
      if (encoding === undefined) encoding = 'utf8'
    } else {
      encoding = length
      length = undefined
    }
  // legacy write(string, encoding, offset, length) - remove in v0.13
  } else {
    throw new Error(
      'Buffer.write(string, encoding, offset[, length]) is no longer supported'
    )
  }

  var remaining = this.length - offset
  if (length === undefined || length > remaining) length = remaining

  if ((string.length > 0 && (length < 0 || offset < 0)) || offset > this.length) {
    throw new RangeError('Attempt to write outside buffer bounds')
  }

  if (!encoding) encoding = 'utf8'

  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'hex':
        return hexWrite(this, string, offset, length)

      case 'utf8':
      case 'utf-8':
        return utf8Write(this, string, offset, length)

      case 'ascii':
        return asciiWrite(this, string, offset, length)

      case 'latin1':
      case 'binary':
        return latin1Write(this, string, offset, length)

      case 'base64':
        // Warning: maxLength not taken into account in base64Write
        return base64Write(this, string, offset, length)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return ucs2Write(this, string, offset, length)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}

Buffer.prototype.toJSON = function toJSON () {
  return {
    type: 'Buffer',
    data: Array.prototype.slice.call(this._arr || this, 0)
  }
}

function base64Slice (buf, start, end) {
  if (start === 0 && end === buf.length) {
    return base64.fromByteArray(buf)
  } else {
    return base64.fromByteArray(buf.slice(start, end))
  }
}

function utf8Slice (buf, start, end) {
  end = Math.min(buf.length, end)
  var res = []

  var i = start
  while (i < end) {
    var firstByte = buf[i]
    var codePoint = null
    var bytesPerSequence = (firstByte > 0xEF) ? 4
      : (firstByte > 0xDF) ? 3
      : (firstByte > 0xBF) ? 2
      : 1

    if (i + bytesPerSequence <= end) {
      var secondByte, thirdByte, fourthByte, tempCodePoint

      switch (bytesPerSequence) {
        case 1:
          if (firstByte < 0x80) {
            codePoint = firstByte
          }
          break
        case 2:
          secondByte = buf[i + 1]
          if ((secondByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0x1F) << 0x6 | (secondByte & 0x3F)
            if (tempCodePoint > 0x7F) {
              codePoint = tempCodePoint
            }
          }
          break
        case 3:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0xC | (secondByte & 0x3F) << 0x6 | (thirdByte & 0x3F)
            if (tempCodePoint > 0x7FF && (tempCodePoint < 0xD800 || tempCodePoint > 0xDFFF)) {
              codePoint = tempCodePoint
            }
          }
          break
        case 4:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          fourthByte = buf[i + 3]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80 && (fourthByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0x12 | (secondByte & 0x3F) << 0xC | (thirdByte & 0x3F) << 0x6 | (fourthByte & 0x3F)
            if (tempCodePoint > 0xFFFF && tempCodePoint < 0x110000) {
              codePoint = tempCodePoint
            }
          }
      }
    }

    if (codePoint === null) {
      // we did not generate a valid codePoint so insert a
      // replacement char (U+FFFD) and advance only 1 byte
      codePoint = 0xFFFD
      bytesPerSequence = 1
    } else if (codePoint > 0xFFFF) {
      // encode to utf16 (surrogate pair dance)
      codePoint -= 0x10000
      res.push(codePoint >>> 10 & 0x3FF | 0xD800)
      codePoint = 0xDC00 | codePoint & 0x3FF
    }

    res.push(codePoint)
    i += bytesPerSequence
  }

  return decodeCodePointsArray(res)
}

// Based on http://stackoverflow.com/a/22747272/680742, the browser with
// the lowest limit is Chrome, with 0x10000 args.
// We go 1 magnitude less, for safety
var MAX_ARGUMENTS_LENGTH = 0x1000

function decodeCodePointsArray (codePoints) {
  var len = codePoints.length
  if (len <= MAX_ARGUMENTS_LENGTH) {
    return String.fromCharCode.apply(String, codePoints) // avoid extra slice()
  }

  // Decode in chunks to avoid "call stack size exceeded".
  var res = ''
  var i = 0
  while (i < len) {
    res += String.fromCharCode.apply(
      String,
      codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH)
    )
  }
  return res
}

function asciiSlice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i] & 0x7F)
  }
  return ret
}

function latin1Slice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i])
  }
  return ret
}

function hexSlice (buf, start, end) {
  var len = buf.length

  if (!start || start < 0) start = 0
  if (!end || end < 0 || end > len) end = len

  var out = ''
  for (var i = start; i < end; ++i) {
    out += toHex(buf[i])
  }
  return out
}

function utf16leSlice (buf, start, end) {
  var bytes = buf.slice(start, end)
  var res = ''
  for (var i = 0; i < bytes.length; i += 2) {
    res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256)
  }
  return res
}

Buffer.prototype.slice = function slice (start, end) {
  var len = this.length
  start = ~~start
  end = end === undefined ? len : ~~end

  if (start < 0) {
    start += len
    if (start < 0) start = 0
  } else if (start > len) {
    start = len
  }

  if (end < 0) {
    end += len
    if (end < 0) end = 0
  } else if (end > len) {
    end = len
  }

  if (end < start) end = start

  var newBuf
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    newBuf = this.subarray(start, end)
    newBuf.__proto__ = Buffer.prototype
  } else {
    var sliceLen = end - start
    newBuf = new Buffer(sliceLen, undefined)
    for (var i = 0; i < sliceLen; ++i) {
      newBuf[i] = this[i + start]
    }
  }

  return newBuf
}

/*
 * Need to make sure that buffer isn't trying to write out of bounds.
 */
function checkOffset (offset, ext, length) {
  if ((offset % 1) !== 0 || offset < 0) throw new RangeError('offset is not uint')
  if (offset + ext > length) throw new RangeError('Trying to access beyond buffer length')
}

Buffer.prototype.readUIntLE = function readUIntLE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }

  return val
}

Buffer.prototype.readUIntBE = function readUIntBE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    checkOffset(offset, byteLength, this.length)
  }

  var val = this[offset + --byteLength]
  var mul = 1
  while (byteLength > 0 && (mul *= 0x100)) {
    val += this[offset + --byteLength] * mul
  }

  return val
}

Buffer.prototype.readUInt8 = function readUInt8 (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 1, this.length)
  return this[offset]
}

Buffer.prototype.readUInt16LE = function readUInt16LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  return this[offset] | (this[offset + 1] << 8)
}

Buffer.prototype.readUInt16BE = function readUInt16BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  return (this[offset] << 8) | this[offset + 1]
}

Buffer.prototype.readUInt32LE = function readUInt32LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return ((this[offset]) |
      (this[offset + 1] << 8) |
      (this[offset + 2] << 16)) +
      (this[offset + 3] * 0x1000000)
}

Buffer.prototype.readUInt32BE = function readUInt32BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] * 0x1000000) +
    ((this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    this[offset + 3])
}

Buffer.prototype.readIntLE = function readIntLE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readIntBE = function readIntBE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var i = byteLength
  var mul = 1
  var val = this[offset + --i]
  while (i > 0 && (mul *= 0x100)) {
    val += this[offset + --i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readInt8 = function readInt8 (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 1, this.length)
  if (!(this[offset] & 0x80)) return (this[offset])
  return ((0xff - this[offset] + 1) * -1)
}

Buffer.prototype.readInt16LE = function readInt16LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset] | (this[offset + 1] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt16BE = function readInt16BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset + 1] | (this[offset] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt32LE = function readInt32LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset]) |
    (this[offset + 1] << 8) |
    (this[offset + 2] << 16) |
    (this[offset + 3] << 24)
}

Buffer.prototype.readInt32BE = function readInt32BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] << 24) |
    (this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    (this[offset + 3])
}

Buffer.prototype.readFloatLE = function readFloatLE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, true, 23, 4)
}

Buffer.prototype.readFloatBE = function readFloatBE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, false, 23, 4)
}

Buffer.prototype.readDoubleLE = function readDoubleLE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, true, 52, 8)
}

Buffer.prototype.readDoubleBE = function readDoubleBE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, false, 52, 8)
}

function checkInt (buf, value, offset, ext, max, min) {
  if (!Buffer.isBuffer(buf)) throw new TypeError('"buffer" argument must be a Buffer instance')
  if (value > max || value < min) throw new RangeError('"value" argument is out of bounds')
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
}

Buffer.prototype.writeUIntLE = function writeUIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  var mul = 1
  var i = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUIntBE = function writeUIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  var i = byteLength - 1
  var mul = 1
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUInt8 = function writeUInt8 (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 1, 0xff, 0)
  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
  this[offset] = (value & 0xff)
  return offset + 1
}

function objectWriteUInt16 (buf, value, offset, littleEndian) {
  if (value < 0) value = 0xffff + value + 1
  for (var i = 0, j = Math.min(buf.length - offset, 2); i < j; ++i) {
    buf[offset + i] = (value & (0xff << (8 * (littleEndian ? i : 1 - i)))) >>>
      (littleEndian ? i : 1 - i) * 8
  }
}

Buffer.prototype.writeUInt16LE = function writeUInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
  } else {
    objectWriteUInt16(this, value, offset, true)
  }
  return offset + 2
}

Buffer.prototype.writeUInt16BE = function writeUInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 8)
    this[offset + 1] = (value & 0xff)
  } else {
    objectWriteUInt16(this, value, offset, false)
  }
  return offset + 2
}

function objectWriteUInt32 (buf, value, offset, littleEndian) {
  if (value < 0) value = 0xffffffff + value + 1
  for (var i = 0, j = Math.min(buf.length - offset, 4); i < j; ++i) {
    buf[offset + i] = (value >>> (littleEndian ? i : 3 - i) * 8) & 0xff
  }
}

Buffer.prototype.writeUInt32LE = function writeUInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset + 3] = (value >>> 24)
    this[offset + 2] = (value >>> 16)
    this[offset + 1] = (value >>> 8)
    this[offset] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, true)
  }
  return offset + 4
}

Buffer.prototype.writeUInt32BE = function writeUInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 24)
    this[offset + 1] = (value >>> 16)
    this[offset + 2] = (value >>> 8)
    this[offset + 3] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, false)
  }
  return offset + 4
}

Buffer.prototype.writeIntLE = function writeIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) {
    var limit = Math.pow(2, 8 * byteLength - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = 0
  var mul = 1
  var sub = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeIntBE = function writeIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) {
    var limit = Math.pow(2, 8 * byteLength - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = byteLength - 1
  var mul = 1
  var sub = 0
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeInt8 = function writeInt8 (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 1, 0x7f, -0x80)
  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
  if (value < 0) value = 0xff + value + 1
  this[offset] = (value & 0xff)
  return offset + 1
}

Buffer.prototype.writeInt16LE = function writeInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
  } else {
    objectWriteUInt16(this, value, offset, true)
  }
  return offset + 2
}

Buffer.prototype.writeInt16BE = function writeInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 8)
    this[offset + 1] = (value & 0xff)
  } else {
    objectWriteUInt16(this, value, offset, false)
  }
  return offset + 2
}

Buffer.prototype.writeInt32LE = function writeInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
    this[offset + 2] = (value >>> 16)
    this[offset + 3] = (value >>> 24)
  } else {
    objectWriteUInt32(this, value, offset, true)
  }
  return offset + 4
}

Buffer.prototype.writeInt32BE = function writeInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  if (value < 0) value = 0xffffffff + value + 1
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 24)
    this[offset + 1] = (value >>> 16)
    this[offset + 2] = (value >>> 8)
    this[offset + 3] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, false)
  }
  return offset + 4
}

function checkIEEE754 (buf, value, offset, ext, max, min) {
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
  if (offset < 0) throw new RangeError('Index out of range')
}

function writeFloat (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 4, 3.4028234663852886e+38, -3.4028234663852886e+38)
  }
  ieee754.write(buf, value, offset, littleEndian, 23, 4)
  return offset + 4
}

Buffer.prototype.writeFloatLE = function writeFloatLE (value, offset, noAssert) {
  return writeFloat(this, value, offset, true, noAssert)
}

Buffer.prototype.writeFloatBE = function writeFloatBE (value, offset, noAssert) {
  return writeFloat(this, value, offset, false, noAssert)
}

function writeDouble (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 8, 1.7976931348623157E+308, -1.7976931348623157E+308)
  }
  ieee754.write(buf, value, offset, littleEndian, 52, 8)
  return offset + 8
}

Buffer.prototype.writeDoubleLE = function writeDoubleLE (value, offset, noAssert) {
  return writeDouble(this, value, offset, true, noAssert)
}

Buffer.prototype.writeDoubleBE = function writeDoubleBE (value, offset, noAssert) {
  return writeDouble(this, value, offset, false, noAssert)
}

// copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
Buffer.prototype.copy = function copy (target, targetStart, start, end) {
  if (!start) start = 0
  if (!end && end !== 0) end = this.length
  if (targetStart >= target.length) targetStart = target.length
  if (!targetStart) targetStart = 0
  if (end > 0 && end < start) end = start

  // Copy 0 bytes; we're done
  if (end === start) return 0
  if (target.length === 0 || this.length === 0) return 0

  // Fatal error conditions
  if (targetStart < 0) {
    throw new RangeError('targetStart out of bounds')
  }
  if (start < 0 || start >= this.length) throw new RangeError('sourceStart out of bounds')
  if (end < 0) throw new RangeError('sourceEnd out of bounds')

  // Are we oob?
  if (end > this.length) end = this.length
  if (target.length - targetStart < end - start) {
    end = target.length - targetStart + start
  }

  var len = end - start
  var i

  if (this === target && start < targetStart && targetStart < end) {
    // descending copy from end
    for (i = len - 1; i >= 0; --i) {
      target[i + targetStart] = this[i + start]
    }
  } else if (len < 1000 || !Buffer.TYPED_ARRAY_SUPPORT) {
    // ascending copy from start
    for (i = 0; i < len; ++i) {
      target[i + targetStart] = this[i + start]
    }
  } else {
    Uint8Array.prototype.set.call(
      target,
      this.subarray(start, start + len),
      targetStart
    )
  }

  return len
}

// Usage:
//    buffer.fill(number[, offset[, end]])
//    buffer.fill(buffer[, offset[, end]])
//    buffer.fill(string[, offset[, end]][, encoding])
Buffer.prototype.fill = function fill (val, start, end, encoding) {
  // Handle string cases:
  if (typeof val === 'string') {
    if (typeof start === 'string') {
      encoding = start
      start = 0
      end = this.length
    } else if (typeof end === 'string') {
      encoding = end
      end = this.length
    }
    if (val.length === 1) {
      var code = val.charCodeAt(0)
      if (code < 256) {
        val = code
      }
    }
    if (encoding !== undefined && typeof encoding !== 'string') {
      throw new TypeError('encoding must be a string')
    }
    if (typeof encoding === 'string' && !Buffer.isEncoding(encoding)) {
      throw new TypeError('Unknown encoding: ' + encoding)
    }
  } else if (typeof val === 'number') {
    val = val & 255
  }

  // Invalid ranges are not set to a default, so can range check early.
  if (start < 0 || this.length < start || this.length < end) {
    throw new RangeError('Out of range index')
  }

  if (end <= start) {
    return this
  }

  start = start >>> 0
  end = end === undefined ? this.length : end >>> 0

  if (!val) val = 0

  var i
  if (typeof val === 'number') {
    for (i = start; i < end; ++i) {
      this[i] = val
    }
  } else {
    var bytes = Buffer.isBuffer(val)
      ? val
      : utf8ToBytes(new Buffer(val, encoding).toString())
    var len = bytes.length
    for (i = 0; i < end - start; ++i) {
      this[i + start] = bytes[i % len]
    }
  }

  return this
}

// HELPER FUNCTIONS
// ================

var INVALID_BASE64_RE = /[^+\/0-9A-Za-z-_]/g

function base64clean (str) {
  // Node strips out invalid characters like \n and \t from the string, base64-js does not
  str = stringtrim(str).replace(INVALID_BASE64_RE, '')
  // Node converts strings with length < 2 to ''
  if (str.length < 2) return ''
  // Node allows for non-padded base64 strings (missing trailing ===), base64-js does not
  while (str.length % 4 !== 0) {
    str = str + '='
  }
  return str
}

function stringtrim (str) {
  if (str.trim) return str.trim()
  return str.replace(/^\s+|\s+$/g, '')
}

function toHex (n) {
  if (n < 16) return '0' + n.toString(16)
  return n.toString(16)
}

function utf8ToBytes (string, units) {
  units = units || Infinity
  var codePoint
  var length = string.length
  var leadSurrogate = null
  var bytes = []

  for (var i = 0; i < length; ++i) {
    codePoint = string.charCodeAt(i)

    // is surrogate component
    if (codePoint > 0xD7FF && codePoint < 0xE000) {
      // last char was a lead
      if (!leadSurrogate) {
        // no lead yet
        if (codePoint > 0xDBFF) {
          // unexpected trail
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        } else if (i + 1 === length) {
          // unpaired lead
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        }

        // valid lead
        leadSurrogate = codePoint

        continue
      }

      // 2 leads in a row
      if (codePoint < 0xDC00) {
        if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
        leadSurrogate = codePoint
        continue
      }

      // valid surrogate pair
      codePoint = (leadSurrogate - 0xD800 << 10 | codePoint - 0xDC00) + 0x10000
    } else if (leadSurrogate) {
      // valid bmp char, but last char was a lead
      if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
    }

    leadSurrogate = null

    // encode utf8
    if (codePoint < 0x80) {
      if ((units -= 1) < 0) break
      bytes.push(codePoint)
    } else if (codePoint < 0x800) {
      if ((units -= 2) < 0) break
      bytes.push(
        codePoint >> 0x6 | 0xC0,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x10000) {
      if ((units -= 3) < 0) break
      bytes.push(
        codePoint >> 0xC | 0xE0,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x110000) {
      if ((units -= 4) < 0) break
      bytes.push(
        codePoint >> 0x12 | 0xF0,
        codePoint >> 0xC & 0x3F | 0x80,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else {
      throw new Error('Invalid code point')
    }
  }

  return bytes
}

function asciiToBytes (str) {
  var byteArray = []
  for (var i = 0; i < str.length; ++i) {
    // Node's code seems to be doing this and not & 0x7F..
    byteArray.push(str.charCodeAt(i) & 0xFF)
  }
  return byteArray
}

function utf16leToBytes (str, units) {
  var c, hi, lo
  var byteArray = []
  for (var i = 0; i < str.length; ++i) {
    if ((units -= 2) < 0) break

    c = str.charCodeAt(i)
    hi = c >> 8
    lo = c % 256
    byteArray.push(lo)
    byteArray.push(hi)
  }

  return byteArray
}

function base64ToBytes (str) {
  return base64.toByteArray(base64clean(str))
}

function blitBuffer (src, dst, offset, length) {
  for (var i = 0; i < length; ++i) {
    if ((i + offset >= dst.length) || (i >= src.length)) break
    dst[i + offset] = src[i]
  }
  return i
}

function isnan (val) {
  return val !== val // eslint-disable-line no-self-compare
}

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../webpack/buildin/global.js */ "../node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "../node_modules/css-loader/dist/cjs.js?!../node_modules/postcss-loader/src/index.js?!../node_modules/sass-loader/dist/cjs.js!./external/datatables/css/buttons.dataTables.min.css":
/*!**************************************************************************************************************************************************************************************************!*\
  !*** ../node_modules/css-loader/dist/cjs.js??ref--8-1!../node_modules/postcss-loader/src??ref--8-2!../node_modules/sass-loader/dist/cjs.js!./external/datatables/css/buttons.dataTables.min.css ***!
  \**************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../../../node_modules/css-loader/dist/runtime/api.js */ "../node_modules/css-loader/dist/runtime/api.js");
exports = ___CSS_LOADER_API_IMPORT___(true);
// Module
exports.push([module.i, "@keyframes dtb-spinner {\n  100% {\n    transform: rotate(360deg); } }\n\n@-webkit-keyframes dtb-spinner {\n  100% {\n    transform: rotate(360deg); } }\n\ndiv.dt-button-info {\n  position: fixed;\n  top: 50%;\n  left: 50%;\n  width: 400px;\n  margin-top: -100px;\n  margin-left: -200px;\n  background-color: white;\n  border: 2px solid #111;\n  box-shadow: 3px 3px 8px rgba(0, 0, 0, 0.3);\n  border-radius: 3px;\n  text-align: center;\n  z-index: 21; }\n\ndiv.dt-button-info h2 {\n  padding: 0.5em;\n  margin: 0;\n  font-weight: normal;\n  border-bottom: 1px solid #ddd;\n  background-color: #f3f3f3; }\n\ndiv.dt-button-info > div {\n  padding: 1em; }\n\ndiv.dt-button-collection-title {\n  text-align: center;\n  padding: 0.3em 0 0.5em;\n  font-size: 0.9em; }\n\ndiv.dt-button-collection-title:empty {\n  display: none; }\n\nbutton.dt-button, div.dt-button, a.dt-button {\n  position: relative;\n  display: inline-block;\n  box-sizing: border-box;\n  margin-right: 0.333em;\n  margin-bottom: 0.333em;\n  padding: 0.5em 1em;\n  border: 1px solid #999;\n  border-radius: 2px;\n  cursor: pointer;\n  font-size: 0.88em;\n  line-height: 1.6em;\n  color: black;\n  white-space: nowrap;\n  overflow: hidden;\n  background-color: #e9e9e9;\n  background-image: linear-gradient(to bottom, #fff 0%, #e9e9e9 100%);\n  filter: progid:DXImageTransform.Microsoft.gradient(GradientType=0,StartColorStr='white', EndColorStr='#e9e9e9');\n  -webkit-user-select: none;\n  -moz-user-select: none;\n  -ms-user-select: none;\n  user-select: none;\n  text-decoration: none;\n  outline: none;\n  text-overflow: ellipsis; }\n\nbutton.dt-button.disabled, div.dt-button.disabled, a.dt-button.disabled {\n  color: #999;\n  border: 1px solid #d0d0d0;\n  cursor: default;\n  background-color: #f9f9f9;\n  background-image: linear-gradient(to bottom, #fff 0%, #f9f9f9 100%);\n  filter: progid:DXImageTransform.Microsoft.gradient(GradientType=0,StartColorStr='#ffffff', EndColorStr='#f9f9f9'); }\n\nbutton.dt-button:active:not(.disabled), button.dt-button.active:not(.disabled), div.dt-button:active:not(.disabled), div.dt-button.active:not(.disabled), a.dt-button:active:not(.disabled), a.dt-button.active:not(.disabled) {\n  background-color: #e2e2e2;\n  background-image: linear-gradient(to bottom, #f3f3f3 0%, #e2e2e2 100%);\n  filter: progid:DXImageTransform.Microsoft.gradient(GradientType=0,StartColorStr='#f3f3f3', EndColorStr='#e2e2e2');\n  box-shadow: inset 1px 1px 3px #999999; }\n\nbutton.dt-button:active:not(.disabled):hover:not(.disabled), button.dt-button.active:not(.disabled):hover:not(.disabled), div.dt-button:active:not(.disabled):hover:not(.disabled), div.dt-button.active:not(.disabled):hover:not(.disabled), a.dt-button:active:not(.disabled):hover:not(.disabled), a.dt-button.active:not(.disabled):hover:not(.disabled) {\n  box-shadow: inset 1px 1px 3px #999999;\n  background-color: #cccccc;\n  background-image: linear-gradient(to bottom, #eaeaea 0%, #ccc 100%);\n  filter: progid:DXImageTransform.Microsoft.gradient(GradientType=0,StartColorStr='#eaeaea', EndColorStr='#cccccc'); }\n\nbutton.dt-button:hover, div.dt-button:hover, a.dt-button:hover {\n  text-decoration: none; }\n\nbutton.dt-button:hover:not(.disabled), div.dt-button:hover:not(.disabled), a.dt-button:hover:not(.disabled) {\n  border: 1px solid #666;\n  background-color: #e0e0e0;\n  background-image: linear-gradient(to bottom, #f9f9f9 0%, #e0e0e0 100%);\n  filter: progid:DXImageTransform.Microsoft.gradient(GradientType=0,StartColorStr='#f9f9f9', EndColorStr='#e0e0e0'); }\n\nbutton.dt-button:focus:not(.disabled), div.dt-button:focus:not(.disabled), a.dt-button:focus:not(.disabled) {\n  border: 1px solid #426c9e;\n  text-shadow: 0 1px 0 #c4def1;\n  outline: none;\n  background-color: #79ace9;\n  background-image: linear-gradient(to bottom, #bddef4 0%, #79ace9 100%);\n  filter: progid:DXImageTransform.Microsoft.gradient(GradientType=0,StartColorStr='#bddef4', EndColorStr='#79ace9'); }\n\n.dt-button embed {\n  outline: none; }\n\ndiv.dt-buttons {\n  position: relative;\n  float: left; }\n\ndiv.dt-buttons.buttons-right {\n  float: right; }\n\ndiv.dt-button-collection {\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 150px;\n  margin-top: 3px;\n  padding: 8px 8px 4px 8px;\n  border: 1px solid #ccc;\n  border: 1px solid rgba(0, 0, 0, 0.4);\n  background-color: white;\n  overflow: hidden;\n  z-index: 2002;\n  border-radius: 5px;\n  box-shadow: 3px 3px 5px rgba(0, 0, 0, 0.3);\n  box-sizing: border-box; }\n\ndiv.dt-button-collection button.dt-button, div.dt-button-collection div.dt-button, div.dt-button-collection a.dt-button {\n  position: relative;\n  left: 0;\n  right: 0;\n  width: 100%;\n  display: block;\n  float: none;\n  margin-bottom: 4px;\n  margin-right: 0; }\n\ndiv.dt-button-collection button.dt-button:active:not(.disabled), div.dt-button-collection button.dt-button.active:not(.disabled), div.dt-button-collection div.dt-button:active:not(.disabled), div.dt-button-collection div.dt-button.active:not(.disabled), div.dt-button-collection a.dt-button:active:not(.disabled), div.dt-button-collection a.dt-button.active:not(.disabled) {\n  background-color: #dadada;\n  background-image: linear-gradient(to bottom, #f0f0f0 0%, #dadada 100%);\n  filter: progid:DXImageTransform.Microsoft.gradient(GradientType=0,StartColorStr='#f0f0f0', EndColorStr='#dadada');\n  box-shadow: inset 1px 1px 3px #666; }\n\ndiv.dt-button-collection.fixed {\n  position: fixed;\n  top: 50%;\n  left: 50%;\n  margin-left: -75px;\n  border-radius: 0; }\n\ndiv.dt-button-collection.fixed.two-column {\n  margin-left: -200px; }\n\ndiv.dt-button-collection.fixed.three-column {\n  margin-left: -225px; }\n\ndiv.dt-button-collection.fixed.four-column {\n  margin-left: -300px; }\n\ndiv.dt-button-collection > :last-child {\n  display: block !important;\n  -webkit-column-gap: 8px;\n  -moz-column-gap: 8px;\n  -ms-column-gap: 8px;\n  -o-column-gap: 8px;\n  grid-column-gap: 8px;\n  column-gap: 8px; }\n\ndiv.dt-button-collection > :last-child > * {\n  page-break-inside: avoid;\n  -moz-column-break-inside: avoid;\n       break-inside: avoid; }\n\ndiv.dt-button-collection.two-column {\n  width: 400px; }\n\ndiv.dt-button-collection.two-column > :last-child {\n  padding-bottom: 1px;\n  -moz-column-count: 2;\n  -ms-column-count: 2;\n  -o-column-count: 2;\n  column-count: 2; }\n\ndiv.dt-button-collection.three-column {\n  width: 450px; }\n\ndiv.dt-button-collection.three-column > :last-child {\n  padding-bottom: 1px;\n  -moz-column-count: 3;\n  -ms-column-count: 3;\n  -o-column-count: 3;\n  column-count: 3; }\n\ndiv.dt-button-collection.four-column {\n  width: 600px; }\n\ndiv.dt-button-collection.four-column > :last-child {\n  padding-bottom: 1px;\n  -moz-column-count: 4;\n  -ms-column-count: 4;\n  -o-column-count: 4;\n  column-count: 4; }\n\ndiv.dt-button-collection .dt-button {\n  border-radius: 0; }\n\ndiv.dt-button-background {\n  position: fixed;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  background: rgba(0, 0, 0, 0.7);\n  background: radial-gradient(ellipse farthest-corner at center, rgba(0, 0, 0, 0.3) 0%, rgba(0, 0, 0, 0.7) 100%);\n  z-index: 2001; }\n\n@media screen and (max-width: 640px) {\n  div.dt-buttons {\n    float: none !important;\n    text-align: center; } }\n\nbutton.dt-button.processing, div.dt-button.processing, a.dt-button.processing {\n  color: rgba(0, 0, 0, 0.2); }\n\nbutton.dt-button.processing:after, div.dt-button.processing:after, a.dt-button.processing:after {\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  width: 16px;\n  height: 16px;\n  margin: -8px 0 0 -8px;\n  box-sizing: border-box;\n  display: block;\n  content: ' ';\n  border: 2px solid #282828;\n  border-radius: 50%;\n  border-left-color: transparent;\n  border-right-color: transparent;\n  animation: dtb-spinner 1500ms infinite linear;\n  -o-animation: dtb-spinner 1500ms infinite linear;\n  -ms-animation: dtb-spinner 1500ms infinite linear;\n  -webkit-animation: dtb-spinner 1500ms infinite linear;\n  -moz-animation: dtb-spinner 1500ms infinite linear; }\n", "",{"version":3,"sources":["buttons.dataTables.min.css"],"names":[],"mappings":"AAAA;EACE;IACE,yBAAyB,EAAE,EAAE;;AAYjC;EACE;IAEE,yBAAyB,EAAE,EAAE;;AAOjC;EACE,eAAe;EACf,QAAQ;EACR,SAAS;EACT,YAAY;EACZ,kBAAkB;EAClB,mBAAmB;EACnB,uBAAuB;EACvB,sBAAsB;EACtB,0CAA0C;EAC1C,kBAAkB;EAClB,kBAAkB;EAClB,WAAW,EAAE;;AAEf;EACE,cAAc;EACd,SAAS;EACT,mBAAmB;EACnB,6BAA6B;EAC7B,yBAAyB,EAAE;;AAE7B;EACE,YAAY,EAAE;;AAEhB;EACE,kBAAkB;EAClB,sBAAsB;EACtB,gBAAgB,EAAE;;AAEpB;EACE,aAAa,EAAE;;AAEjB;EACE,kBAAkB;EAClB,qBAAqB;EACrB,sBAAsB;EACtB,qBAAqB;EACrB,sBAAsB;EACtB,kBAAkB;EAClB,sBAAsB;EACtB,kBAAkB;EAClB,eAAe;EACf,iBAAiB;EACjB,kBAAkB;EAClB,YAAY;EACZ,mBAAmB;EACnB,gBAAgB;EAChB,yBAAyB;EAKzB,mEAAmE;EACnE,+GAA+G;EAC/G,yBAAyB;EACzB,sBAAsB;EACtB,qBAAqB;EACrB,iBAAiB;EACjB,qBAAqB;EACrB,aAAa;EACb,uBAAuB,EAAE;;AAE3B;EACE,WAAW;EACX,yBAAyB;EACzB,eAAe;EACf,yBAAyB;EAKzB,mEAAmE;EACnE,iHAAiH,EAAE;;AAErH;EACE,yBAAyB;EAKzB,sEAAsE;EACtE,iHAAiH;EACjH,qCAAqC,EAAE;;AAEzC;EACE,qCAAqC;EACrC,yBAAyB;EAKzB,mEAAmE;EACnE,iHAAiH,EAAE;;AAErH;EACE,qBAAqB,EAAE;;AAEzB;EACE,sBAAsB;EACtB,yBAAyB;EAKzB,sEAAsE;EACtE,iHAAiH,EAAE;;AAErH;EACE,yBAAyB;EACzB,4BAA4B;EAC5B,aAAa;EACb,yBAAyB;EAKzB,sEAAsE;EACtE,iHAAiH,EAAE;;AAErH;EACE,aAAa,EAAE;;AAEjB;EACE,kBAAkB;EAClB,WAAW,EAAE;;AAEf;EACE,YAAY,EAAE;;AAEhB;EACE,kBAAkB;EAClB,MAAM;EACN,OAAO;EACP,YAAY;EACZ,eAAe;EACf,wBAAwB;EACxB,sBAAsB;EACtB,oCAAoC;EACpC,uBAAuB;EACvB,gBAAgB;EAChB,aAAa;EACb,kBAAkB;EAClB,0CAA0C;EAC1C,sBAAsB,EAAE;;AAE1B;EACE,kBAAkB;EAClB,OAAO;EACP,QAAQ;EACR,WAAW;EACX,cAAc;EACd,WAAW;EACX,kBAAkB;EAClB,eAAe,EAAE;;AAEnB;EACE,yBAAyB;EAKzB,sEAAsE;EACtE,iHAAiH;EACjH,kCAAkC,EAAE;;AAEtC;EACE,eAAe;EACf,QAAQ;EACR,SAAS;EACT,kBAAkB;EAClB,gBAAgB,EAAE;;AAEpB;EACE,mBAAmB,EAAE;;AAEvB;EACE,mBAAmB,EAAE;;AAEvB;EACE,mBAAmB,EAAE;;AAEvB;EACE,yBAAyB;EACzB,uBAAuB;EACvB,oBAAoB;EACpB,mBAAmB;EACnB,kBAAkB;EAClB,oBAAe;EAAf,eAAe,EAAE;;AAEnB;EAEE,wBAAmB;EAAnB,+BAAmB;OAAnB,mBAAmB,EAAE;;AAEvB;EACE,YAAY,EAAE;;AAEhB;EACE,mBAAmB;EAEnB,oBAAoB;EACpB,mBAAmB;EACnB,kBAAkB;EAClB,eAAe,EAAE;;AAEnB;EACE,YAAY,EAAE;;AAEhB;EACE,mBAAmB;EAEnB,oBAAoB;EACpB,mBAAmB;EACnB,kBAAkB;EAClB,eAAe,EAAE;;AAEnB;EACE,YAAY,EAAE;;AAEhB;EACE,mBAAmB;EAEnB,oBAAoB;EACpB,mBAAmB;EACnB,kBAAkB;EAClB,eAAe,EAAE;;AAEnB;EACE,gBAAgB,EAAE;;AAEpB;EACE,eAAe;EACf,MAAM;EACN,OAAO;EACP,WAAW;EACX,YAAY;EACZ,8BAA8B;EAM9B,8GAA8G;EAC9G,aAAa,EAAE;;AAEjB;EACE;IACE,sBAAsB;IACtB,kBAAkB,EAAE,EAAE;;AAE1B;EACE,yBAAyB,EAAE;;AAE7B;EACE,kBAAkB;EAClB,QAAQ;EACR,SAAS;EACT,WAAW;EACX,YAAY;EACZ,qBAAqB;EACrB,sBAAsB;EACtB,cAAc;EACd,YAAY;EACZ,yBAAyB;EACzB,kBAAkB;EAClB,8BAA8B;EAC9B,+BAA+B;EAC/B,6CAA6C;EAC7C,gDAAgD;EAChD,iDAAiD;EACjD,qDAAqD;EACrD,kDAAkD,EAAE","file":"buttons.dataTables.min.css","sourcesContent":["@keyframes dtb-spinner {\n  100% {\n    transform: rotate(360deg); } }\n\n@-o-keyframes dtb-spinner {\n  100% {\n    -o-transform: rotate(360deg);\n    transform: rotate(360deg); } }\n\n@-ms-keyframes dtb-spinner {\n  100% {\n    -ms-transform: rotate(360deg);\n    transform: rotate(360deg); } }\n\n@-webkit-keyframes dtb-spinner {\n  100% {\n    -webkit-transform: rotate(360deg);\n    transform: rotate(360deg); } }\n\n@-moz-keyframes dtb-spinner {\n  100% {\n    -moz-transform: rotate(360deg);\n    transform: rotate(360deg); } }\n\ndiv.dt-button-info {\n  position: fixed;\n  top: 50%;\n  left: 50%;\n  width: 400px;\n  margin-top: -100px;\n  margin-left: -200px;\n  background-color: white;\n  border: 2px solid #111;\n  box-shadow: 3px 3px 8px rgba(0, 0, 0, 0.3);\n  border-radius: 3px;\n  text-align: center;\n  z-index: 21; }\n\ndiv.dt-button-info h2 {\n  padding: 0.5em;\n  margin: 0;\n  font-weight: normal;\n  border-bottom: 1px solid #ddd;\n  background-color: #f3f3f3; }\n\ndiv.dt-button-info > div {\n  padding: 1em; }\n\ndiv.dt-button-collection-title {\n  text-align: center;\n  padding: 0.3em 0 0.5em;\n  font-size: 0.9em; }\n\ndiv.dt-button-collection-title:empty {\n  display: none; }\n\nbutton.dt-button, div.dt-button, a.dt-button {\n  position: relative;\n  display: inline-block;\n  box-sizing: border-box;\n  margin-right: 0.333em;\n  margin-bottom: 0.333em;\n  padding: 0.5em 1em;\n  border: 1px solid #999;\n  border-radius: 2px;\n  cursor: pointer;\n  font-size: 0.88em;\n  line-height: 1.6em;\n  color: black;\n  white-space: nowrap;\n  overflow: hidden;\n  background-color: #e9e9e9;\n  background-image: -webkit-linear-gradient(top, #fff 0%, #e9e9e9 100%);\n  background-image: -moz-linear-gradient(top, #fff 0%, #e9e9e9 100%);\n  background-image: -ms-linear-gradient(top, #fff 0%, #e9e9e9 100%);\n  background-image: -o-linear-gradient(top, #fff 0%, #e9e9e9 100%);\n  background-image: linear-gradient(to bottom, #fff 0%, #e9e9e9 100%);\n  filter: progid:DXImageTransform.Microsoft.gradient(GradientType=0,StartColorStr='white', EndColorStr='#e9e9e9');\n  -webkit-user-select: none;\n  -moz-user-select: none;\n  -ms-user-select: none;\n  user-select: none;\n  text-decoration: none;\n  outline: none;\n  text-overflow: ellipsis; }\n\nbutton.dt-button.disabled, div.dt-button.disabled, a.dt-button.disabled {\n  color: #999;\n  border: 1px solid #d0d0d0;\n  cursor: default;\n  background-color: #f9f9f9;\n  background-image: -webkit-linear-gradient(top, #fff 0%, #f9f9f9 100%);\n  background-image: -moz-linear-gradient(top, #fff 0%, #f9f9f9 100%);\n  background-image: -ms-linear-gradient(top, #fff 0%, #f9f9f9 100%);\n  background-image: -o-linear-gradient(top, #fff 0%, #f9f9f9 100%);\n  background-image: linear-gradient(to bottom, #fff 0%, #f9f9f9 100%);\n  filter: progid:DXImageTransform.Microsoft.gradient(GradientType=0,StartColorStr='#ffffff', EndColorStr='#f9f9f9'); }\n\nbutton.dt-button:active:not(.disabled), button.dt-button.active:not(.disabled), div.dt-button:active:not(.disabled), div.dt-button.active:not(.disabled), a.dt-button:active:not(.disabled), a.dt-button.active:not(.disabled) {\n  background-color: #e2e2e2;\n  background-image: -webkit-linear-gradient(top, #f3f3f3 0%, #e2e2e2 100%);\n  background-image: -moz-linear-gradient(top, #f3f3f3 0%, #e2e2e2 100%);\n  background-image: -ms-linear-gradient(top, #f3f3f3 0%, #e2e2e2 100%);\n  background-image: -o-linear-gradient(top, #f3f3f3 0%, #e2e2e2 100%);\n  background-image: linear-gradient(to bottom, #f3f3f3 0%, #e2e2e2 100%);\n  filter: progid:DXImageTransform.Microsoft.gradient(GradientType=0,StartColorStr='#f3f3f3', EndColorStr='#e2e2e2');\n  box-shadow: inset 1px 1px 3px #999999; }\n\nbutton.dt-button:active:not(.disabled):hover:not(.disabled), button.dt-button.active:not(.disabled):hover:not(.disabled), div.dt-button:active:not(.disabled):hover:not(.disabled), div.dt-button.active:not(.disabled):hover:not(.disabled), a.dt-button:active:not(.disabled):hover:not(.disabled), a.dt-button.active:not(.disabled):hover:not(.disabled) {\n  box-shadow: inset 1px 1px 3px #999999;\n  background-color: #cccccc;\n  background-image: -webkit-linear-gradient(top, #eaeaea 0%, #ccc 100%);\n  background-image: -moz-linear-gradient(top, #eaeaea 0%, #ccc 100%);\n  background-image: -ms-linear-gradient(top, #eaeaea 0%, #ccc 100%);\n  background-image: -o-linear-gradient(top, #eaeaea 0%, #ccc 100%);\n  background-image: linear-gradient(to bottom, #eaeaea 0%, #ccc 100%);\n  filter: progid:DXImageTransform.Microsoft.gradient(GradientType=0,StartColorStr='#eaeaea', EndColorStr='#cccccc'); }\n\nbutton.dt-button:hover, div.dt-button:hover, a.dt-button:hover {\n  text-decoration: none; }\n\nbutton.dt-button:hover:not(.disabled), div.dt-button:hover:not(.disabled), a.dt-button:hover:not(.disabled) {\n  border: 1px solid #666;\n  background-color: #e0e0e0;\n  background-image: -webkit-linear-gradient(top, #f9f9f9 0%, #e0e0e0 100%);\n  background-image: -moz-linear-gradient(top, #f9f9f9 0%, #e0e0e0 100%);\n  background-image: -ms-linear-gradient(top, #f9f9f9 0%, #e0e0e0 100%);\n  background-image: -o-linear-gradient(top, #f9f9f9 0%, #e0e0e0 100%);\n  background-image: linear-gradient(to bottom, #f9f9f9 0%, #e0e0e0 100%);\n  filter: progid:DXImageTransform.Microsoft.gradient(GradientType=0,StartColorStr='#f9f9f9', EndColorStr='#e0e0e0'); }\n\nbutton.dt-button:focus:not(.disabled), div.dt-button:focus:not(.disabled), a.dt-button:focus:not(.disabled) {\n  border: 1px solid #426c9e;\n  text-shadow: 0 1px 0 #c4def1;\n  outline: none;\n  background-color: #79ace9;\n  background-image: -webkit-linear-gradient(top, #bddef4 0%, #79ace9 100%);\n  background-image: -moz-linear-gradient(top, #bddef4 0%, #79ace9 100%);\n  background-image: -ms-linear-gradient(top, #bddef4 0%, #79ace9 100%);\n  background-image: -o-linear-gradient(top, #bddef4 0%, #79ace9 100%);\n  background-image: linear-gradient(to bottom, #bddef4 0%, #79ace9 100%);\n  filter: progid:DXImageTransform.Microsoft.gradient(GradientType=0,StartColorStr='#bddef4', EndColorStr='#79ace9'); }\n\n.dt-button embed {\n  outline: none; }\n\ndiv.dt-buttons {\n  position: relative;\n  float: left; }\n\ndiv.dt-buttons.buttons-right {\n  float: right; }\n\ndiv.dt-button-collection {\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 150px;\n  margin-top: 3px;\n  padding: 8px 8px 4px 8px;\n  border: 1px solid #ccc;\n  border: 1px solid rgba(0, 0, 0, 0.4);\n  background-color: white;\n  overflow: hidden;\n  z-index: 2002;\n  border-radius: 5px;\n  box-shadow: 3px 3px 5px rgba(0, 0, 0, 0.3);\n  box-sizing: border-box; }\n\ndiv.dt-button-collection button.dt-button, div.dt-button-collection div.dt-button, div.dt-button-collection a.dt-button {\n  position: relative;\n  left: 0;\n  right: 0;\n  width: 100%;\n  display: block;\n  float: none;\n  margin-bottom: 4px;\n  margin-right: 0; }\n\ndiv.dt-button-collection button.dt-button:active:not(.disabled), div.dt-button-collection button.dt-button.active:not(.disabled), div.dt-button-collection div.dt-button:active:not(.disabled), div.dt-button-collection div.dt-button.active:not(.disabled), div.dt-button-collection a.dt-button:active:not(.disabled), div.dt-button-collection a.dt-button.active:not(.disabled) {\n  background-color: #dadada;\n  background-image: -webkit-linear-gradient(top, #f0f0f0 0%, #dadada 100%);\n  background-image: -moz-linear-gradient(top, #f0f0f0 0%, #dadada 100%);\n  background-image: -ms-linear-gradient(top, #f0f0f0 0%, #dadada 100%);\n  background-image: -o-linear-gradient(top, #f0f0f0 0%, #dadada 100%);\n  background-image: linear-gradient(to bottom, #f0f0f0 0%, #dadada 100%);\n  filter: progid:DXImageTransform.Microsoft.gradient(GradientType=0,StartColorStr='#f0f0f0', EndColorStr='#dadada');\n  box-shadow: inset 1px 1px 3px #666; }\n\ndiv.dt-button-collection.fixed {\n  position: fixed;\n  top: 50%;\n  left: 50%;\n  margin-left: -75px;\n  border-radius: 0; }\n\ndiv.dt-button-collection.fixed.two-column {\n  margin-left: -200px; }\n\ndiv.dt-button-collection.fixed.three-column {\n  margin-left: -225px; }\n\ndiv.dt-button-collection.fixed.four-column {\n  margin-left: -300px; }\n\ndiv.dt-button-collection > :last-child {\n  display: block !important;\n  -webkit-column-gap: 8px;\n  -moz-column-gap: 8px;\n  -ms-column-gap: 8px;\n  -o-column-gap: 8px;\n  column-gap: 8px; }\n\ndiv.dt-button-collection > :last-child > * {\n  -webkit-column-break-inside: avoid;\n  break-inside: avoid; }\n\ndiv.dt-button-collection.two-column {\n  width: 400px; }\n\ndiv.dt-button-collection.two-column > :last-child {\n  padding-bottom: 1px;\n  -webkit-column-count: 2;\n  -moz-column-count: 2;\n  -ms-column-count: 2;\n  -o-column-count: 2;\n  column-count: 2; }\n\ndiv.dt-button-collection.three-column {\n  width: 450px; }\n\ndiv.dt-button-collection.three-column > :last-child {\n  padding-bottom: 1px;\n  -webkit-column-count: 3;\n  -moz-column-count: 3;\n  -ms-column-count: 3;\n  -o-column-count: 3;\n  column-count: 3; }\n\ndiv.dt-button-collection.four-column {\n  width: 600px; }\n\ndiv.dt-button-collection.four-column > :last-child {\n  padding-bottom: 1px;\n  -webkit-column-count: 4;\n  -moz-column-count: 4;\n  -ms-column-count: 4;\n  -o-column-count: 4;\n  column-count: 4; }\n\ndiv.dt-button-collection .dt-button {\n  border-radius: 0; }\n\ndiv.dt-button-background {\n  position: fixed;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  background: rgba(0, 0, 0, 0.7);\n  background: -ms-radial-gradient(center, ellipse farthest-corner, rgba(0, 0, 0, 0.3) 0%, rgba(0, 0, 0, 0.7) 100%);\n  background: -moz-radial-gradient(center, ellipse farthest-corner, rgba(0, 0, 0, 0.3) 0%, rgba(0, 0, 0, 0.7) 100%);\n  background: -o-radial-gradient(center, ellipse farthest-corner, rgba(0, 0, 0, 0.3) 0%, rgba(0, 0, 0, 0.7) 100%);\n  background: -webkit-gradient(radial, center center, 0, center center, 497, color-stop(0, rgba(0, 0, 0, 0.3)), color-stop(1, rgba(0, 0, 0, 0.7)));\n  background: -webkit-radial-gradient(center, ellipse farthest-corner, rgba(0, 0, 0, 0.3) 0%, rgba(0, 0, 0, 0.7) 100%);\n  background: radial-gradient(ellipse farthest-corner at center, rgba(0, 0, 0, 0.3) 0%, rgba(0, 0, 0, 0.7) 100%);\n  z-index: 2001; }\n\n@media screen and (max-width: 640px) {\n  div.dt-buttons {\n    float: none !important;\n    text-align: center; } }\n\nbutton.dt-button.processing, div.dt-button.processing, a.dt-button.processing {\n  color: rgba(0, 0, 0, 0.2); }\n\nbutton.dt-button.processing:after, div.dt-button.processing:after, a.dt-button.processing:after {\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  width: 16px;\n  height: 16px;\n  margin: -8px 0 0 -8px;\n  box-sizing: border-box;\n  display: block;\n  content: ' ';\n  border: 2px solid #282828;\n  border-radius: 50%;\n  border-left-color: transparent;\n  border-right-color: transparent;\n  animation: dtb-spinner 1500ms infinite linear;\n  -o-animation: dtb-spinner 1500ms infinite linear;\n  -ms-animation: dtb-spinner 1500ms infinite linear;\n  -webkit-animation: dtb-spinner 1500ms infinite linear;\n  -moz-animation: dtb-spinner 1500ms infinite linear; }\n"]}]);
// Exports
module.exports = exports;


/***/ }),

/***/ "../node_modules/css-loader/dist/cjs.js?!../node_modules/postcss-loader/src/index.js?!../node_modules/sass-loader/dist/cjs.js!./external/datatables/css/fixedHeader.dataTables.min.css":
/*!******************************************************************************************************************************************************************************************************!*\
  !*** ../node_modules/css-loader/dist/cjs.js??ref--8-1!../node_modules/postcss-loader/src??ref--8-2!../node_modules/sass-loader/dist/cjs.js!./external/datatables/css/fixedHeader.dataTables.min.css ***!
  \******************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../../../node_modules/css-loader/dist/runtime/api.js */ "../node_modules/css-loader/dist/runtime/api.js");
exports = ___CSS_LOADER_API_IMPORT___(true);
// Module
exports.push([module.i, "table.fixedHeader-floating {\n  position: fixed !important;\n  background-color: white; }\n\ntable.fixedHeader-floating.no-footer {\n  border-bottom-width: 0; }\n\ntable.fixedHeader-locked {\n  position: absolute !important;\n  background-color: white; }\n\n@media print {\n  table.fixedHeader-floating {\n    display: none; } }\n", "",{"version":3,"sources":["fixedHeader.dataTables.min.css"],"names":[],"mappings":"AAAA;EACE,0BAA0B;EAC1B,uBAAuB,EAAE;;AAE3B;EACE,sBAAsB,EAAE;;AAE1B;EACE,6BAA6B;EAC7B,uBAAuB,EAAE;;AAE3B;EACE;IACE,aAAa,EAAE,EAAE","file":"fixedHeader.dataTables.min.css","sourcesContent":["table.fixedHeader-floating {\n  position: fixed !important;\n  background-color: white; }\n\ntable.fixedHeader-floating.no-footer {\n  border-bottom-width: 0; }\n\ntable.fixedHeader-locked {\n  position: absolute !important;\n  background-color: white; }\n\n@media print {\n  table.fixedHeader-floating {\n    display: none; } }\n"]}]);
// Exports
module.exports = exports;


/***/ }),

/***/ "../node_modules/css-loader/dist/cjs.js?!../node_modules/postcss-loader/src/index.js?!../node_modules/sass-loader/dist/cjs.js!./external/datatables/css/jquery.dataTables.min.css":
/*!*************************************************************************************************************************************************************************************************!*\
  !*** ../node_modules/css-loader/dist/cjs.js??ref--8-1!../node_modules/postcss-loader/src??ref--8-2!../node_modules/sass-loader/dist/cjs.js!./external/datatables/css/jquery.dataTables.min.css ***!
  \*************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../../../node_modules/css-loader/dist/runtime/api.js */ "../node_modules/css-loader/dist/runtime/api.js");
var ___CSS_LOADER_GET_URL_IMPORT___ = __webpack_require__(/*! ../../../../node_modules/css-loader/dist/runtime/getUrl.js */ "../node_modules/css-loader/dist/runtime/getUrl.js");
var ___CSS_LOADER_URL_IMPORT_0___ = __webpack_require__(/*! ../images/sort_both.png */ "./external/datatables/images/sort_both.png");
var ___CSS_LOADER_URL_IMPORT_1___ = __webpack_require__(/*! ../images/sort_asc.png */ "./external/datatables/images/sort_asc.png");
var ___CSS_LOADER_URL_IMPORT_2___ = __webpack_require__(/*! ../images/sort_desc.png */ "./external/datatables/images/sort_desc.png");
var ___CSS_LOADER_URL_IMPORT_3___ = __webpack_require__(/*! ../images/sort_asc_disabled.png */ "./external/datatables/images/sort_asc_disabled.png");
var ___CSS_LOADER_URL_IMPORT_4___ = __webpack_require__(/*! ../images/sort_desc_disabled.png */ "./external/datatables/images/sort_desc_disabled.png");
exports = ___CSS_LOADER_API_IMPORT___(true);
var ___CSS_LOADER_URL_REPLACEMENT_0___ = ___CSS_LOADER_GET_URL_IMPORT___(___CSS_LOADER_URL_IMPORT_0___);
var ___CSS_LOADER_URL_REPLACEMENT_1___ = ___CSS_LOADER_GET_URL_IMPORT___(___CSS_LOADER_URL_IMPORT_1___);
var ___CSS_LOADER_URL_REPLACEMENT_2___ = ___CSS_LOADER_GET_URL_IMPORT___(___CSS_LOADER_URL_IMPORT_2___);
var ___CSS_LOADER_URL_REPLACEMENT_3___ = ___CSS_LOADER_GET_URL_IMPORT___(___CSS_LOADER_URL_IMPORT_3___);
var ___CSS_LOADER_URL_REPLACEMENT_4___ = ___CSS_LOADER_GET_URL_IMPORT___(___CSS_LOADER_URL_IMPORT_4___);
// Module
exports.push([module.i, "table.dataTable {\n  width: 100%;\n  margin: 0 auto;\n  clear: both;\n  border-collapse: separate;\n  border-spacing: 0; }\n\ntable.dataTable thead th, table.dataTable tfoot th {\n  font-weight: bold; }\n\ntable.dataTable thead th, table.dataTable thead td {\n  padding: 10px 18px;\n  border-bottom: 1px solid #111; }\n\ntable.dataTable thead th:active, table.dataTable thead td:active {\n  outline: none; }\n\ntable.dataTable tfoot th, table.dataTable tfoot td {\n  padding: 10px 18px 6px 18px;\n  border-top: 1px solid #111; }\n\ntable.dataTable thead .sorting, table.dataTable thead .sorting_asc, table.dataTable thead .sorting_desc, table.dataTable thead .sorting_asc_disabled, table.dataTable thead .sorting_desc_disabled {\n  cursor: pointer;\n  *cursor: hand;\n  background-repeat: no-repeat;\n  background-position: center right; }\n\ntable.dataTable thead .sorting {\n  background-image: url(" + ___CSS_LOADER_URL_REPLACEMENT_0___ + "); }\n\ntable.dataTable thead .sorting_asc {\n  background-image: url(" + ___CSS_LOADER_URL_REPLACEMENT_1___ + "); }\n\ntable.dataTable thead .sorting_desc {\n  background-image: url(" + ___CSS_LOADER_URL_REPLACEMENT_2___ + "); }\n\ntable.dataTable thead .sorting_asc_disabled {\n  background-image: url(" + ___CSS_LOADER_URL_REPLACEMENT_3___ + "); }\n\ntable.dataTable thead .sorting_desc_disabled {\n  background-image: url(" + ___CSS_LOADER_URL_REPLACEMENT_4___ + "); }\n\ntable.dataTable tbody tr {\n  background-color: #ffffff; }\n\ntable.dataTable tbody tr.selected {\n  background-color: #B0BED9; }\n\ntable.dataTable tbody th, table.dataTable tbody td {\n  padding: 8px 10px; }\n\ntable.dataTable.row-border tbody th, table.dataTable.row-border tbody td, table.dataTable.display tbody th, table.dataTable.display tbody td {\n  border-top: 1px solid #ddd; }\n\ntable.dataTable.row-border tbody tr:first-child th, table.dataTable.row-border tbody tr:first-child td, table.dataTable.display tbody tr:first-child th, table.dataTable.display tbody tr:first-child td {\n  border-top: none; }\n\ntable.dataTable.cell-border tbody th, table.dataTable.cell-border tbody td {\n  border-top: 1px solid #ddd;\n  border-right: 1px solid #ddd; }\n\ntable.dataTable.cell-border tbody tr th:first-child, table.dataTable.cell-border tbody tr td:first-child {\n  border-left: 1px solid #ddd; }\n\ntable.dataTable.cell-border tbody tr:first-child th, table.dataTable.cell-border tbody tr:first-child td {\n  border-top: none; }\n\ntable.dataTable.stripe tbody tr.odd, table.dataTable.display tbody tr.odd {\n  background-color: #f9f9f9; }\n\ntable.dataTable.stripe tbody tr.odd.selected, table.dataTable.display tbody tr.odd.selected {\n  background-color: #acbad4; }\n\ntable.dataTable.hover tbody tr:hover, table.dataTable.display tbody tr:hover {\n  background-color: #f6f6f6; }\n\ntable.dataTable.hover tbody tr:hover.selected, table.dataTable.display tbody tr:hover.selected {\n  background-color: #aab7d1; }\n\ntable.dataTable.order-column tbody tr > .sorting_1, table.dataTable.order-column tbody tr > .sorting_2, table.dataTable.order-column tbody tr > .sorting_3, table.dataTable.display tbody tr > .sorting_1, table.dataTable.display tbody tr > .sorting_2, table.dataTable.display tbody tr > .sorting_3 {\n  background-color: #fafafa; }\n\ntable.dataTable.order-column tbody tr.selected > .sorting_1, table.dataTable.order-column tbody tr.selected > .sorting_2, table.dataTable.order-column tbody tr.selected > .sorting_3, table.dataTable.display tbody tr.selected > .sorting_1, table.dataTable.display tbody tr.selected > .sorting_2, table.dataTable.display tbody tr.selected > .sorting_3 {\n  background-color: #acbad5; }\n\ntable.dataTable.display tbody tr.odd > .sorting_1, table.dataTable.order-column.stripe tbody tr.odd > .sorting_1 {\n  background-color: #f1f1f1; }\n\ntable.dataTable.display tbody tr.odd > .sorting_2, table.dataTable.order-column.stripe tbody tr.odd > .sorting_2 {\n  background-color: #f3f3f3; }\n\ntable.dataTable.display tbody tr.odd > .sorting_3, table.dataTable.order-column.stripe tbody tr.odd > .sorting_3 {\n  background-color: whitesmoke; }\n\ntable.dataTable.display tbody tr.odd.selected > .sorting_1, table.dataTable.order-column.stripe tbody tr.odd.selected > .sorting_1 {\n  background-color: #a6b4cd; }\n\ntable.dataTable.display tbody tr.odd.selected > .sorting_2, table.dataTable.order-column.stripe tbody tr.odd.selected > .sorting_2 {\n  background-color: #a8b5cf; }\n\ntable.dataTable.display tbody tr.odd.selected > .sorting_3, table.dataTable.order-column.stripe tbody tr.odd.selected > .sorting_3 {\n  background-color: #a9b7d1; }\n\ntable.dataTable.display tbody tr.even > .sorting_1, table.dataTable.order-column.stripe tbody tr.even > .sorting_1 {\n  background-color: #fafafa; }\n\ntable.dataTable.display tbody tr.even > .sorting_2, table.dataTable.order-column.stripe tbody tr.even > .sorting_2 {\n  background-color: #fcfcfc; }\n\ntable.dataTable.display tbody tr.even > .sorting_3, table.dataTable.order-column.stripe tbody tr.even > .sorting_3 {\n  background-color: #fefefe; }\n\ntable.dataTable.display tbody tr.even.selected > .sorting_1, table.dataTable.order-column.stripe tbody tr.even.selected > .sorting_1 {\n  background-color: #acbad5; }\n\ntable.dataTable.display tbody tr.even.selected > .sorting_2, table.dataTable.order-column.stripe tbody tr.even.selected > .sorting_2 {\n  background-color: #aebcd6; }\n\ntable.dataTable.display tbody tr.even.selected > .sorting_3, table.dataTable.order-column.stripe tbody tr.even.selected > .sorting_3 {\n  background-color: #afbdd8; }\n\ntable.dataTable.display tbody tr:hover > .sorting_1, table.dataTable.order-column.hover tbody tr:hover > .sorting_1 {\n  background-color: #eaeaea; }\n\ntable.dataTable.display tbody tr:hover > .sorting_2, table.dataTable.order-column.hover tbody tr:hover > .sorting_2 {\n  background-color: #ececec; }\n\ntable.dataTable.display tbody tr:hover > .sorting_3, table.dataTable.order-column.hover tbody tr:hover > .sorting_3 {\n  background-color: #efefef; }\n\ntable.dataTable.display tbody tr:hover.selected > .sorting_1, table.dataTable.order-column.hover tbody tr:hover.selected > .sorting_1 {\n  background-color: #a2aec7; }\n\ntable.dataTable.display tbody tr:hover.selected > .sorting_2, table.dataTable.order-column.hover tbody tr:hover.selected > .sorting_2 {\n  background-color: #a3b0c9; }\n\ntable.dataTable.display tbody tr:hover.selected > .sorting_3, table.dataTable.order-column.hover tbody tr:hover.selected > .sorting_3 {\n  background-color: #a5b2cb; }\n\ntable.dataTable.no-footer {\n  border-bottom: 1px solid #111; }\n\ntable.dataTable.nowrap th, table.dataTable.nowrap td {\n  white-space: nowrap; }\n\ntable.dataTable.compact thead th, table.dataTable.compact thead td {\n  padding: 4px 17px 4px 4px; }\n\ntable.dataTable.compact tfoot th, table.dataTable.compact tfoot td {\n  padding: 4px; }\n\ntable.dataTable.compact tbody th, table.dataTable.compact tbody td {\n  padding: 4px; }\n\ntable.dataTable th.dt-left, table.dataTable td.dt-left {\n  text-align: left; }\n\ntable.dataTable th.dt-center, table.dataTable td.dt-center, table.dataTable td.dataTables_empty {\n  text-align: center; }\n\ntable.dataTable th.dt-right, table.dataTable td.dt-right {\n  text-align: right; }\n\ntable.dataTable th.dt-justify, table.dataTable td.dt-justify {\n  text-align: justify; }\n\ntable.dataTable th.dt-nowrap, table.dataTable td.dt-nowrap {\n  white-space: nowrap; }\n\ntable.dataTable thead th.dt-head-left, table.dataTable thead td.dt-head-left, table.dataTable tfoot th.dt-head-left, table.dataTable tfoot td.dt-head-left {\n  text-align: left; }\n\ntable.dataTable thead th.dt-head-center, table.dataTable thead td.dt-head-center, table.dataTable tfoot th.dt-head-center, table.dataTable tfoot td.dt-head-center {\n  text-align: center; }\n\ntable.dataTable thead th.dt-head-right, table.dataTable thead td.dt-head-right, table.dataTable tfoot th.dt-head-right, table.dataTable tfoot td.dt-head-right {\n  text-align: right; }\n\ntable.dataTable thead th.dt-head-justify, table.dataTable thead td.dt-head-justify, table.dataTable tfoot th.dt-head-justify, table.dataTable tfoot td.dt-head-justify {\n  text-align: justify; }\n\ntable.dataTable thead th.dt-head-nowrap, table.dataTable thead td.dt-head-nowrap, table.dataTable tfoot th.dt-head-nowrap, table.dataTable tfoot td.dt-head-nowrap {\n  white-space: nowrap; }\n\ntable.dataTable tbody th.dt-body-left, table.dataTable tbody td.dt-body-left {\n  text-align: left; }\n\ntable.dataTable tbody th.dt-body-center, table.dataTable tbody td.dt-body-center {\n  text-align: center; }\n\ntable.dataTable tbody th.dt-body-right, table.dataTable tbody td.dt-body-right {\n  text-align: right; }\n\ntable.dataTable tbody th.dt-body-justify, table.dataTable tbody td.dt-body-justify {\n  text-align: justify; }\n\ntable.dataTable tbody th.dt-body-nowrap, table.dataTable tbody td.dt-body-nowrap {\n  white-space: nowrap; }\n\ntable.dataTable, table.dataTable th, table.dataTable td {\n  box-sizing: content-box; }\n\n.dataTables_wrapper {\n  position: relative;\n  clear: both;\n  *zoom: 1;\n  zoom: 1; }\n\n.dataTables_wrapper .dataTables_length {\n  float: left; }\n\n.dataTables_wrapper .dataTables_filter {\n  float: right;\n  text-align: right; }\n\n.dataTables_wrapper .dataTables_filter input {\n  margin-left: 0.5em; }\n\n.dataTables_wrapper .dataTables_info {\n  clear: both;\n  float: left;\n  padding-top: 0.755em; }\n\n.dataTables_wrapper .dataTables_paginate {\n  float: right;\n  text-align: right;\n  padding-top: 0.25em; }\n\n.dataTables_wrapper .dataTables_paginate .paginate_button {\n  box-sizing: border-box;\n  display: inline-block;\n  min-width: 1.5em;\n  padding: 0.5em 1em;\n  margin-left: 2px;\n  text-align: center;\n  text-decoration: none !important;\n  cursor: pointer;\n  *cursor: hand;\n  color: #333 !important;\n  border: 1px solid transparent;\n  border-radius: 2px; }\n\n.dataTables_wrapper .dataTables_paginate .paginate_button.current, .dataTables_wrapper .dataTables_paginate .paginate_button.current:hover {\n  color: #333 !important;\n  border: 1px solid #979797;\n  background-color: white;\n  background: linear-gradient(to bottom, #fff 0%, #dcdcdc 100%); }\n\n.dataTables_wrapper .dataTables_paginate .paginate_button.disabled, .dataTables_wrapper .dataTables_paginate .paginate_button.disabled:hover, .dataTables_wrapper .dataTables_paginate .paginate_button.disabled:active {\n  cursor: default;\n  color: #666 !important;\n  border: 1px solid transparent;\n  background: transparent;\n  box-shadow: none; }\n\n.dataTables_wrapper .dataTables_paginate .paginate_button:hover {\n  color: white !important;\n  border: 1px solid #111;\n  background-color: #585858;\n  background: linear-gradient(to bottom, #585858 0%, #111 100%); }\n\n.dataTables_wrapper .dataTables_paginate .paginate_button:active {\n  outline: none;\n  background-color: #2b2b2b;\n  background: linear-gradient(to bottom, #2b2b2b 0%, #0c0c0c 100%);\n  box-shadow: inset 0 0 3px #111; }\n\n.dataTables_wrapper .dataTables_paginate .ellipsis {\n  padding: 0 1em; }\n\n.dataTables_wrapper .dataTables_processing {\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  width: 100%;\n  height: 40px;\n  margin-left: -50%;\n  margin-top: -25px;\n  padding-top: 20px;\n  text-align: center;\n  font-size: 1.2em;\n  background-color: white;\n  background: linear-gradient(to right, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.9) 25%, rgba(255, 255, 255, 0.9) 75%, rgba(255, 255, 255, 0) 100%); }\n\n.dataTables_wrapper .dataTables_length, .dataTables_wrapper .dataTables_filter, .dataTables_wrapper .dataTables_info, .dataTables_wrapper .dataTables_processing, .dataTables_wrapper .dataTables_paginate {\n  color: #333; }\n\n.dataTables_wrapper .dataTables_scroll {\n  clear: both; }\n\n.dataTables_wrapper .dataTables_scroll div.dataTables_scrollBody {\n  *margin-top: -1px;\n  -webkit-overflow-scrolling: touch; }\n\n.dataTables_wrapper .dataTables_scroll div.dataTables_scrollBody > table > thead > tr > th, .dataTables_wrapper .dataTables_scroll div.dataTables_scrollBody > table > thead > tr > td, .dataTables_wrapper .dataTables_scroll div.dataTables_scrollBody > table > tbody > tr > th, .dataTables_wrapper .dataTables_scroll div.dataTables_scrollBody > table > tbody > tr > td {\n  vertical-align: middle; }\n\n.dataTables_wrapper .dataTables_scroll div.dataTables_scrollBody > table > thead > tr > th > div.dataTables_sizing, .dataTables_wrapper .dataTables_scroll div.dataTables_scrollBody > table > thead > tr > td > div.dataTables_sizing, .dataTables_wrapper .dataTables_scroll div.dataTables_scrollBody > table > tbody > tr > th > div.dataTables_sizing, .dataTables_wrapper .dataTables_scroll div.dataTables_scrollBody > table > tbody > tr > td > div.dataTables_sizing {\n  height: 0;\n  overflow: hidden;\n  margin: 0 !important;\n  padding: 0 !important; }\n\n.dataTables_wrapper.no-footer .dataTables_scrollBody {\n  border-bottom: 1px solid #111; }\n\n.dataTables_wrapper.no-footer div.dataTables_scrollHead table.dataTable, .dataTables_wrapper.no-footer div.dataTables_scrollBody > table {\n  border-bottom: none; }\n\n.dataTables_wrapper:after {\n  visibility: hidden;\n  display: block;\n  content: \"\";\n  clear: both;\n  height: 0; }\n\n@media screen and (max-width: 767px) {\n  .dataTables_wrapper .dataTables_info, .dataTables_wrapper .dataTables_paginate {\n    float: none;\n    text-align: center; }\n  .dataTables_wrapper .dataTables_paginate {\n    margin-top: 0.5em; } }\n\n@media screen and (max-width: 640px) {\n  .dataTables_wrapper .dataTables_length, .dataTables_wrapper .dataTables_filter {\n    float: none;\n    text-align: center; }\n  .dataTables_wrapper .dataTables_filter {\n    margin-top: 0.5em; } }\n", "",{"version":3,"sources":["jquery.dataTables.min.css"],"names":[],"mappings":"AAAA;EACE,WAAW;EACX,cAAc;EACd,WAAW;EACX,yBAAyB;EACzB,iBAAiB,EAAE;;AAErB;EACE,iBAAiB,EAAE;;AAErB;EACE,kBAAkB;EAClB,6BAA6B,EAAE;;AAEjC;EACE,aAAa,EAAE;;AAEjB;EACE,2BAA2B;EAC3B,0BAA0B,EAAE;;AAE9B;EACE,eAAe;GACf,YAAa;EACb,4BAA4B;EAC5B,iCAAiC,EAAE;;AAErC;EACE,yDAAgD,EAAE;;AAEpD;EACE,yDAA+C,EAAE;;AAEnD;EACE,yDAAgD,EAAE;;AAEpD;EACE,yDAAwD,EAAE;;AAE5D;EACE,yDAAyD,EAAE;;AAE7D;EACE,yBAAyB,EAAE;;AAE7B;EACE,yBAAyB,EAAE;;AAE7B;EACE,iBAAiB,EAAE;;AAErB;EACE,0BAA0B,EAAE;;AAE9B;EACE,gBAAgB,EAAE;;AAEpB;EACE,0BAA0B;EAC1B,4BAA4B,EAAE;;AAEhC;EACE,2BAA2B,EAAE;;AAE/B;EACE,gBAAgB,EAAE;;AAEpB;EACE,yBAAyB,EAAE;;AAE7B;EACE,yBAAyB,EAAE;;AAE7B;EACE,yBAAyB,EAAE;;AAE7B;EACE,yBAAyB,EAAE;;AAE7B;EACE,yBAAyB,EAAE;;AAE7B;EACE,yBAAyB,EAAE;;AAE7B;EACE,yBAAyB,EAAE;;AAE7B;EACE,yBAAyB,EAAE;;AAE7B;EACE,4BAA4B,EAAE;;AAEhC;EACE,yBAAyB,EAAE;;AAE7B;EACE,yBAAyB,EAAE;;AAE7B;EACE,yBAAyB,EAAE;;AAE7B;EACE,yBAAyB,EAAE;;AAE7B;EACE,yBAAyB,EAAE;;AAE7B;EACE,yBAAyB,EAAE;;AAE7B;EACE,yBAAyB,EAAE;;AAE7B;EACE,yBAAyB,EAAE;;AAE7B;EACE,yBAAyB,EAAE;;AAE7B;EACE,yBAAyB,EAAE;;AAE7B;EACE,yBAAyB,EAAE;;AAE7B;EACE,yBAAyB,EAAE;;AAE7B;EACE,yBAAyB,EAAE;;AAE7B;EACE,yBAAyB,EAAE;;AAE7B;EACE,yBAAyB,EAAE;;AAE7B;EACE,6BAA6B,EAAE;;AAEjC;EACE,mBAAmB,EAAE;;AAEvB;EACE,yBAAyB,EAAE;;AAE7B;EACE,YAAY,EAAE;;AAEhB;EACE,YAAY,EAAE;;AAEhB;EACE,gBAAgB,EAAE;;AAEpB;EACE,kBAAkB,EAAE;;AAEtB;EACE,iBAAiB,EAAE;;AAErB;EACE,mBAAmB,EAAE;;AAEvB;EACE,mBAAmB,EAAE;;AAEvB;EACE,gBAAgB,EAAE;;AAEpB;EACE,kBAAkB,EAAE;;AAEtB;EACE,iBAAiB,EAAE;;AAErB;EACE,mBAAmB,EAAE;;AAEvB;EACE,mBAAmB,EAAE;;AAEvB;EACE,gBAAgB,EAAE;;AAEpB;EACE,kBAAkB,EAAE;;AAEtB;EACE,iBAAiB,EAAE;;AAErB;EACE,mBAAmB,EAAE;;AAEvB;EACE,mBAAmB,EAAE;;AAEvB;EACE,uBAAuB,EAAE;;AAE3B;EACE,kBAAkB;EAClB,WAAW;GACX,OAAQ;EACR,OAAO,EAAE;;AAEX;EACE,WAAW,EAAE;;AAEf;EACE,YAAY;EACZ,iBAAiB,EAAE;;AAErB;EACE,kBAAkB,EAAE;;AAEtB;EACE,WAAW;EACX,WAAW;EACX,oBAAoB,EAAE;;AAExB;EACE,YAAY;EACZ,iBAAiB;EACjB,mBAAmB,EAAE;;AAEvB;EACE,sBAAsB;EACtB,qBAAqB;EACrB,gBAAgB;EAChB,kBAAkB;EAClB,gBAAgB;EAChB,kBAAkB;EAClB,gCAAgC;EAChC,eAAe;GACf,YAAa;EACb,sBAAsB;EACtB,6BAA6B;EAC7B,kBAAkB,EAAE;;AAEtB;EACE,sBAAsB;EACtB,yBAAyB;EACzB,uBAAuB;EAMvB,6DAA6D,EAAE;;AAEjE;EACE,eAAe;EACf,sBAAsB;EACtB,6BAA6B;EAC7B,uBAAuB;EACvB,gBAAgB,EAAE;;AAEpB;EACE,uBAAuB;EACvB,sBAAsB;EACtB,yBAAyB;EAMzB,6DAA6D,EAAE;;AAEjE;EACE,aAAa;EACb,yBAAyB;EAMzB,gEAAgE;EAChE,8BAA8B,EAAE;;AAElC;EACE,cAAc,EAAE;;AAElB;EACE,kBAAkB;EAClB,QAAQ;EACR,SAAS;EACT,WAAW;EACX,YAAY;EACZ,iBAAiB;EACjB,iBAAiB;EACjB,iBAAiB;EACjB,kBAAkB;EAClB,gBAAgB;EAChB,uBAAuB;EAMvB,yJAAyJ,EAAE;;AAE7J;EACE,WAAW,EAAE;;AAEf;EACE,WAAW,EAAE;;AAEf;GACE,gBAAiB;EACjB,iCAAiC,EAAE;;AAErC;EACE,sBAAsB,EAAE;;AAE1B;EACE,SAAS;EACT,gBAAgB;EAChB,oBAAoB;EACpB,qBAAqB,EAAE;;AAEzB;EACE,6BAA6B,EAAE;;AAEjC;EACE,mBAAmB,EAAE;;AAEvB;EACE,kBAAkB;EAClB,cAAc;EACd,WAAW;EACX,WAAW;EACX,SAAS,EAAE;;AAEb;EACE;IACE,WAAW;IACX,kBAAkB,EAAE;EACtB;IACE,iBAAiB,EAAE,EAAE;;AAEzB;EACE;IACE,WAAW;IACX,kBAAkB,EAAE;EACtB;IACE,iBAAiB,EAAE,EAAE","file":"jquery.dataTables.min.css","sourcesContent":["table.dataTable {\n  width: 100%;\n  margin: 0 auto;\n  clear: both;\n  border-collapse: separate;\n  border-spacing: 0; }\n\ntable.dataTable thead th, table.dataTable tfoot th {\n  font-weight: bold; }\n\ntable.dataTable thead th, table.dataTable thead td {\n  padding: 10px 18px;\n  border-bottom: 1px solid #111; }\n\ntable.dataTable thead th:active, table.dataTable thead td:active {\n  outline: none; }\n\ntable.dataTable tfoot th, table.dataTable tfoot td {\n  padding: 10px 18px 6px 18px;\n  border-top: 1px solid #111; }\n\ntable.dataTable thead .sorting, table.dataTable thead .sorting_asc, table.dataTable thead .sorting_desc, table.dataTable thead .sorting_asc_disabled, table.dataTable thead .sorting_desc_disabled {\n  cursor: pointer;\n  *cursor: hand;\n  background-repeat: no-repeat;\n  background-position: center right; }\n\ntable.dataTable thead .sorting {\n  background-image: url(\"../images/sort_both.png\"); }\n\ntable.dataTable thead .sorting_asc {\n  background-image: url(\"../images/sort_asc.png\"); }\n\ntable.dataTable thead .sorting_desc {\n  background-image: url(\"../images/sort_desc.png\"); }\n\ntable.dataTable thead .sorting_asc_disabled {\n  background-image: url(\"../images/sort_asc_disabled.png\"); }\n\ntable.dataTable thead .sorting_desc_disabled {\n  background-image: url(\"../images/sort_desc_disabled.png\"); }\n\ntable.dataTable tbody tr {\n  background-color: #ffffff; }\n\ntable.dataTable tbody tr.selected {\n  background-color: #B0BED9; }\n\ntable.dataTable tbody th, table.dataTable tbody td {\n  padding: 8px 10px; }\n\ntable.dataTable.row-border tbody th, table.dataTable.row-border tbody td, table.dataTable.display tbody th, table.dataTable.display tbody td {\n  border-top: 1px solid #ddd; }\n\ntable.dataTable.row-border tbody tr:first-child th, table.dataTable.row-border tbody tr:first-child td, table.dataTable.display tbody tr:first-child th, table.dataTable.display tbody tr:first-child td {\n  border-top: none; }\n\ntable.dataTable.cell-border tbody th, table.dataTable.cell-border tbody td {\n  border-top: 1px solid #ddd;\n  border-right: 1px solid #ddd; }\n\ntable.dataTable.cell-border tbody tr th:first-child, table.dataTable.cell-border tbody tr td:first-child {\n  border-left: 1px solid #ddd; }\n\ntable.dataTable.cell-border tbody tr:first-child th, table.dataTable.cell-border tbody tr:first-child td {\n  border-top: none; }\n\ntable.dataTable.stripe tbody tr.odd, table.dataTable.display tbody tr.odd {\n  background-color: #f9f9f9; }\n\ntable.dataTable.stripe tbody tr.odd.selected, table.dataTable.display tbody tr.odd.selected {\n  background-color: #acbad4; }\n\ntable.dataTable.hover tbody tr:hover, table.dataTable.display tbody tr:hover {\n  background-color: #f6f6f6; }\n\ntable.dataTable.hover tbody tr:hover.selected, table.dataTable.display tbody tr:hover.selected {\n  background-color: #aab7d1; }\n\ntable.dataTable.order-column tbody tr > .sorting_1, table.dataTable.order-column tbody tr > .sorting_2, table.dataTable.order-column tbody tr > .sorting_3, table.dataTable.display tbody tr > .sorting_1, table.dataTable.display tbody tr > .sorting_2, table.dataTable.display tbody tr > .sorting_3 {\n  background-color: #fafafa; }\n\ntable.dataTable.order-column tbody tr.selected > .sorting_1, table.dataTable.order-column tbody tr.selected > .sorting_2, table.dataTable.order-column tbody tr.selected > .sorting_3, table.dataTable.display tbody tr.selected > .sorting_1, table.dataTable.display tbody tr.selected > .sorting_2, table.dataTable.display tbody tr.selected > .sorting_3 {\n  background-color: #acbad5; }\n\ntable.dataTable.display tbody tr.odd > .sorting_1, table.dataTable.order-column.stripe tbody tr.odd > .sorting_1 {\n  background-color: #f1f1f1; }\n\ntable.dataTable.display tbody tr.odd > .sorting_2, table.dataTable.order-column.stripe tbody tr.odd > .sorting_2 {\n  background-color: #f3f3f3; }\n\ntable.dataTable.display tbody tr.odd > .sorting_3, table.dataTable.order-column.stripe tbody tr.odd > .sorting_3 {\n  background-color: whitesmoke; }\n\ntable.dataTable.display tbody tr.odd.selected > .sorting_1, table.dataTable.order-column.stripe tbody tr.odd.selected > .sorting_1 {\n  background-color: #a6b4cd; }\n\ntable.dataTable.display tbody tr.odd.selected > .sorting_2, table.dataTable.order-column.stripe tbody tr.odd.selected > .sorting_2 {\n  background-color: #a8b5cf; }\n\ntable.dataTable.display tbody tr.odd.selected > .sorting_3, table.dataTable.order-column.stripe tbody tr.odd.selected > .sorting_3 {\n  background-color: #a9b7d1; }\n\ntable.dataTable.display tbody tr.even > .sorting_1, table.dataTable.order-column.stripe tbody tr.even > .sorting_1 {\n  background-color: #fafafa; }\n\ntable.dataTable.display tbody tr.even > .sorting_2, table.dataTable.order-column.stripe tbody tr.even > .sorting_2 {\n  background-color: #fcfcfc; }\n\ntable.dataTable.display tbody tr.even > .sorting_3, table.dataTable.order-column.stripe tbody tr.even > .sorting_3 {\n  background-color: #fefefe; }\n\ntable.dataTable.display tbody tr.even.selected > .sorting_1, table.dataTable.order-column.stripe tbody tr.even.selected > .sorting_1 {\n  background-color: #acbad5; }\n\ntable.dataTable.display tbody tr.even.selected > .sorting_2, table.dataTable.order-column.stripe tbody tr.even.selected > .sorting_2 {\n  background-color: #aebcd6; }\n\ntable.dataTable.display tbody tr.even.selected > .sorting_3, table.dataTable.order-column.stripe tbody tr.even.selected > .sorting_3 {\n  background-color: #afbdd8; }\n\ntable.dataTable.display tbody tr:hover > .sorting_1, table.dataTable.order-column.hover tbody tr:hover > .sorting_1 {\n  background-color: #eaeaea; }\n\ntable.dataTable.display tbody tr:hover > .sorting_2, table.dataTable.order-column.hover tbody tr:hover > .sorting_2 {\n  background-color: #ececec; }\n\ntable.dataTable.display tbody tr:hover > .sorting_3, table.dataTable.order-column.hover tbody tr:hover > .sorting_3 {\n  background-color: #efefef; }\n\ntable.dataTable.display tbody tr:hover.selected > .sorting_1, table.dataTable.order-column.hover tbody tr:hover.selected > .sorting_1 {\n  background-color: #a2aec7; }\n\ntable.dataTable.display tbody tr:hover.selected > .sorting_2, table.dataTable.order-column.hover tbody tr:hover.selected > .sorting_2 {\n  background-color: #a3b0c9; }\n\ntable.dataTable.display tbody tr:hover.selected > .sorting_3, table.dataTable.order-column.hover tbody tr:hover.selected > .sorting_3 {\n  background-color: #a5b2cb; }\n\ntable.dataTable.no-footer {\n  border-bottom: 1px solid #111; }\n\ntable.dataTable.nowrap th, table.dataTable.nowrap td {\n  white-space: nowrap; }\n\ntable.dataTable.compact thead th, table.dataTable.compact thead td {\n  padding: 4px 17px 4px 4px; }\n\ntable.dataTable.compact tfoot th, table.dataTable.compact tfoot td {\n  padding: 4px; }\n\ntable.dataTable.compact tbody th, table.dataTable.compact tbody td {\n  padding: 4px; }\n\ntable.dataTable th.dt-left, table.dataTable td.dt-left {\n  text-align: left; }\n\ntable.dataTable th.dt-center, table.dataTable td.dt-center, table.dataTable td.dataTables_empty {\n  text-align: center; }\n\ntable.dataTable th.dt-right, table.dataTable td.dt-right {\n  text-align: right; }\n\ntable.dataTable th.dt-justify, table.dataTable td.dt-justify {\n  text-align: justify; }\n\ntable.dataTable th.dt-nowrap, table.dataTable td.dt-nowrap {\n  white-space: nowrap; }\n\ntable.dataTable thead th.dt-head-left, table.dataTable thead td.dt-head-left, table.dataTable tfoot th.dt-head-left, table.dataTable tfoot td.dt-head-left {\n  text-align: left; }\n\ntable.dataTable thead th.dt-head-center, table.dataTable thead td.dt-head-center, table.dataTable tfoot th.dt-head-center, table.dataTable tfoot td.dt-head-center {\n  text-align: center; }\n\ntable.dataTable thead th.dt-head-right, table.dataTable thead td.dt-head-right, table.dataTable tfoot th.dt-head-right, table.dataTable tfoot td.dt-head-right {\n  text-align: right; }\n\ntable.dataTable thead th.dt-head-justify, table.dataTable thead td.dt-head-justify, table.dataTable tfoot th.dt-head-justify, table.dataTable tfoot td.dt-head-justify {\n  text-align: justify; }\n\ntable.dataTable thead th.dt-head-nowrap, table.dataTable thead td.dt-head-nowrap, table.dataTable tfoot th.dt-head-nowrap, table.dataTable tfoot td.dt-head-nowrap {\n  white-space: nowrap; }\n\ntable.dataTable tbody th.dt-body-left, table.dataTable tbody td.dt-body-left {\n  text-align: left; }\n\ntable.dataTable tbody th.dt-body-center, table.dataTable tbody td.dt-body-center {\n  text-align: center; }\n\ntable.dataTable tbody th.dt-body-right, table.dataTable tbody td.dt-body-right {\n  text-align: right; }\n\ntable.dataTable tbody th.dt-body-justify, table.dataTable tbody td.dt-body-justify {\n  text-align: justify; }\n\ntable.dataTable tbody th.dt-body-nowrap, table.dataTable tbody td.dt-body-nowrap {\n  white-space: nowrap; }\n\ntable.dataTable, table.dataTable th, table.dataTable td {\n  box-sizing: content-box; }\n\n.dataTables_wrapper {\n  position: relative;\n  clear: both;\n  *zoom: 1;\n  zoom: 1; }\n\n.dataTables_wrapper .dataTables_length {\n  float: left; }\n\n.dataTables_wrapper .dataTables_filter {\n  float: right;\n  text-align: right; }\n\n.dataTables_wrapper .dataTables_filter input {\n  margin-left: 0.5em; }\n\n.dataTables_wrapper .dataTables_info {\n  clear: both;\n  float: left;\n  padding-top: 0.755em; }\n\n.dataTables_wrapper .dataTables_paginate {\n  float: right;\n  text-align: right;\n  padding-top: 0.25em; }\n\n.dataTables_wrapper .dataTables_paginate .paginate_button {\n  box-sizing: border-box;\n  display: inline-block;\n  min-width: 1.5em;\n  padding: 0.5em 1em;\n  margin-left: 2px;\n  text-align: center;\n  text-decoration: none !important;\n  cursor: pointer;\n  *cursor: hand;\n  color: #333 !important;\n  border: 1px solid transparent;\n  border-radius: 2px; }\n\n.dataTables_wrapper .dataTables_paginate .paginate_button.current, .dataTables_wrapper .dataTables_paginate .paginate_button.current:hover {\n  color: #333 !important;\n  border: 1px solid #979797;\n  background-color: white;\n  background: -webkit-gradient(linear, left top, left bottom, color-stop(0%, #fff), color-stop(100%, #dcdcdc));\n  background: -webkit-linear-gradient(top, #fff 0%, #dcdcdc 100%);\n  background: -moz-linear-gradient(top, #fff 0%, #dcdcdc 100%);\n  background: -ms-linear-gradient(top, #fff 0%, #dcdcdc 100%);\n  background: -o-linear-gradient(top, #fff 0%, #dcdcdc 100%);\n  background: linear-gradient(to bottom, #fff 0%, #dcdcdc 100%); }\n\n.dataTables_wrapper .dataTables_paginate .paginate_button.disabled, .dataTables_wrapper .dataTables_paginate .paginate_button.disabled:hover, .dataTables_wrapper .dataTables_paginate .paginate_button.disabled:active {\n  cursor: default;\n  color: #666 !important;\n  border: 1px solid transparent;\n  background: transparent;\n  box-shadow: none; }\n\n.dataTables_wrapper .dataTables_paginate .paginate_button:hover {\n  color: white !important;\n  border: 1px solid #111;\n  background-color: #585858;\n  background: -webkit-gradient(linear, left top, left bottom, color-stop(0%, #585858), color-stop(100%, #111));\n  background: -webkit-linear-gradient(top, #585858 0%, #111 100%);\n  background: -moz-linear-gradient(top, #585858 0%, #111 100%);\n  background: -ms-linear-gradient(top, #585858 0%, #111 100%);\n  background: -o-linear-gradient(top, #585858 0%, #111 100%);\n  background: linear-gradient(to bottom, #585858 0%, #111 100%); }\n\n.dataTables_wrapper .dataTables_paginate .paginate_button:active {\n  outline: none;\n  background-color: #2b2b2b;\n  background: -webkit-gradient(linear, left top, left bottom, color-stop(0%, #2b2b2b), color-stop(100%, #0c0c0c));\n  background: -webkit-linear-gradient(top, #2b2b2b 0%, #0c0c0c 100%);\n  background: -moz-linear-gradient(top, #2b2b2b 0%, #0c0c0c 100%);\n  background: -ms-linear-gradient(top, #2b2b2b 0%, #0c0c0c 100%);\n  background: -o-linear-gradient(top, #2b2b2b 0%, #0c0c0c 100%);\n  background: linear-gradient(to bottom, #2b2b2b 0%, #0c0c0c 100%);\n  box-shadow: inset 0 0 3px #111; }\n\n.dataTables_wrapper .dataTables_paginate .ellipsis {\n  padding: 0 1em; }\n\n.dataTables_wrapper .dataTables_processing {\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  width: 100%;\n  height: 40px;\n  margin-left: -50%;\n  margin-top: -25px;\n  padding-top: 20px;\n  text-align: center;\n  font-size: 1.2em;\n  background-color: white;\n  background: -webkit-gradient(linear, left top, right top, color-stop(0%, rgba(255, 255, 255, 0)), color-stop(25%, rgba(255, 255, 255, 0.9)), color-stop(75%, rgba(255, 255, 255, 0.9)), color-stop(100%, rgba(255, 255, 255, 0)));\n  background: -webkit-linear-gradient(left, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.9) 25%, rgba(255, 255, 255, 0.9) 75%, rgba(255, 255, 255, 0) 100%);\n  background: -moz-linear-gradient(left, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.9) 25%, rgba(255, 255, 255, 0.9) 75%, rgba(255, 255, 255, 0) 100%);\n  background: -ms-linear-gradient(left, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.9) 25%, rgba(255, 255, 255, 0.9) 75%, rgba(255, 255, 255, 0) 100%);\n  background: -o-linear-gradient(left, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.9) 25%, rgba(255, 255, 255, 0.9) 75%, rgba(255, 255, 255, 0) 100%);\n  background: linear-gradient(to right, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.9) 25%, rgba(255, 255, 255, 0.9) 75%, rgba(255, 255, 255, 0) 100%); }\n\n.dataTables_wrapper .dataTables_length, .dataTables_wrapper .dataTables_filter, .dataTables_wrapper .dataTables_info, .dataTables_wrapper .dataTables_processing, .dataTables_wrapper .dataTables_paginate {\n  color: #333; }\n\n.dataTables_wrapper .dataTables_scroll {\n  clear: both; }\n\n.dataTables_wrapper .dataTables_scroll div.dataTables_scrollBody {\n  *margin-top: -1px;\n  -webkit-overflow-scrolling: touch; }\n\n.dataTables_wrapper .dataTables_scroll div.dataTables_scrollBody > table > thead > tr > th, .dataTables_wrapper .dataTables_scroll div.dataTables_scrollBody > table > thead > tr > td, .dataTables_wrapper .dataTables_scroll div.dataTables_scrollBody > table > tbody > tr > th, .dataTables_wrapper .dataTables_scroll div.dataTables_scrollBody > table > tbody > tr > td {\n  vertical-align: middle; }\n\n.dataTables_wrapper .dataTables_scroll div.dataTables_scrollBody > table > thead > tr > th > div.dataTables_sizing, .dataTables_wrapper .dataTables_scroll div.dataTables_scrollBody > table > thead > tr > td > div.dataTables_sizing, .dataTables_wrapper .dataTables_scroll div.dataTables_scrollBody > table > tbody > tr > th > div.dataTables_sizing, .dataTables_wrapper .dataTables_scroll div.dataTables_scrollBody > table > tbody > tr > td > div.dataTables_sizing {\n  height: 0;\n  overflow: hidden;\n  margin: 0 !important;\n  padding: 0 !important; }\n\n.dataTables_wrapper.no-footer .dataTables_scrollBody {\n  border-bottom: 1px solid #111; }\n\n.dataTables_wrapper.no-footer div.dataTables_scrollHead table.dataTable, .dataTables_wrapper.no-footer div.dataTables_scrollBody > table {\n  border-bottom: none; }\n\n.dataTables_wrapper:after {\n  visibility: hidden;\n  display: block;\n  content: \"\";\n  clear: both;\n  height: 0; }\n\n@media screen and (max-width: 767px) {\n  .dataTables_wrapper .dataTables_info, .dataTables_wrapper .dataTables_paginate {\n    float: none;\n    text-align: center; }\n  .dataTables_wrapper .dataTables_paginate {\n    margin-top: 0.5em; } }\n\n@media screen and (max-width: 640px) {\n  .dataTables_wrapper .dataTables_length, .dataTables_wrapper .dataTables_filter {\n    float: none;\n    text-align: center; }\n  .dataTables_wrapper .dataTables_filter {\n    margin-top: 0.5em; } }\n"]}]);
// Exports
module.exports = exports;


/***/ }),

/***/ "../node_modules/css-loader/dist/runtime/api.js":
/*!******************************************************!*\
  !*** ../node_modules/css-loader/dist/runtime/api.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
// eslint-disable-next-line func-names
module.exports = function (useSourceMap) {
  var list = []; // return the list of modules as css string

  list.toString = function toString() {
    return this.map(function (item) {
      var content = cssWithMappingToString(item, useSourceMap);

      if (item[2]) {
        return "@media ".concat(item[2], " {").concat(content, "}");
      }

      return content;
    }).join('');
  }; // import a list of modules into the list
  // eslint-disable-next-line func-names


  list.i = function (modules, mediaQuery, dedupe) {
    if (typeof modules === 'string') {
      // eslint-disable-next-line no-param-reassign
      modules = [[null, modules, '']];
    }

    var alreadyImportedModules = {};

    if (dedupe) {
      for (var i = 0; i < this.length; i++) {
        // eslint-disable-next-line prefer-destructuring
        var id = this[i][0];

        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }

    for (var _i = 0; _i < modules.length; _i++) {
      var item = [].concat(modules[_i]);

      if (dedupe && alreadyImportedModules[item[0]]) {
        // eslint-disable-next-line no-continue
        continue;
      }

      if (mediaQuery) {
        if (!item[2]) {
          item[2] = mediaQuery;
        } else {
          item[2] = "".concat(mediaQuery, " and ").concat(item[2]);
        }
      }

      list.push(item);
    }
  };

  return list;
};

function cssWithMappingToString(item, useSourceMap) {
  var content = item[1] || ''; // eslint-disable-next-line prefer-destructuring

  var cssMapping = item[3];

  if (!cssMapping) {
    return content;
  }

  if (useSourceMap && typeof btoa === 'function') {
    var sourceMapping = toComment(cssMapping);
    var sourceURLs = cssMapping.sources.map(function (source) {
      return "/*# sourceURL=".concat(cssMapping.sourceRoot || '').concat(source, " */");
    });
    return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
  }

  return [content].join('\n');
} // Adapted from convert-source-map (MIT)


function toComment(sourceMap) {
  // eslint-disable-next-line no-undef
  var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
  var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
  return "/*# ".concat(data, " */");
}

/***/ }),

/***/ "../node_modules/css-loader/dist/runtime/getUrl.js":
/*!*********************************************************!*\
  !*** ../node_modules/css-loader/dist/runtime/getUrl.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function (url, options) {
  if (!options) {
    // eslint-disable-next-line no-param-reassign
    options = {};
  } // eslint-disable-next-line no-underscore-dangle, no-param-reassign


  url = url && url.__esModule ? url.default : url;

  if (typeof url !== 'string') {
    return url;
  } // If url is already wrapped in quotes, remove them


  if (/^['"].*['"]$/.test(url)) {
    // eslint-disable-next-line no-param-reassign
    url = url.slice(1, -1);
  }

  if (options.hash) {
    // eslint-disable-next-line no-param-reassign
    url += options.hash;
  } // Should url be wrapped?
  // See https://drafts.csswg.org/css-values-3/#urls


  if (/["'() \t\n]/.test(url) || options.needQuotes) {
    return "\"".concat(url.replace(/"/g, '\\"').replace(/\n/g, '\\n'), "\"");
  }

  return url;
};

/***/ }),

/***/ "../node_modules/ieee754/index.js":
/*!****************************************!*\
  !*** ../node_modules/ieee754/index.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/*! ieee754. BSD-3-Clause License. Feross Aboukhadijeh <https://feross.org/opensource> */
exports.read = function (buffer, offset, isLE, mLen, nBytes) {
  var e, m
  var eLen = (nBytes * 8) - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var nBits = -7
  var i = isLE ? (nBytes - 1) : 0
  var d = isLE ? -1 : 1
  var s = buffer[offset + i]

  i += d

  e = s & ((1 << (-nBits)) - 1)
  s >>= (-nBits)
  nBits += eLen
  for (; nBits > 0; e = (e * 256) + buffer[offset + i], i += d, nBits -= 8) {}

  m = e & ((1 << (-nBits)) - 1)
  e >>= (-nBits)
  nBits += mLen
  for (; nBits > 0; m = (m * 256) + buffer[offset + i], i += d, nBits -= 8) {}

  if (e === 0) {
    e = 1 - eBias
  } else if (e === eMax) {
    return m ? NaN : ((s ? -1 : 1) * Infinity)
  } else {
    m = m + Math.pow(2, mLen)
    e = e - eBias
  }
  return (s ? -1 : 1) * m * Math.pow(2, e - mLen)
}

exports.write = function (buffer, value, offset, isLE, mLen, nBytes) {
  var e, m, c
  var eLen = (nBytes * 8) - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var rt = (mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0)
  var i = isLE ? 0 : (nBytes - 1)
  var d = isLE ? 1 : -1
  var s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0

  value = Math.abs(value)

  if (isNaN(value) || value === Infinity) {
    m = isNaN(value) ? 1 : 0
    e = eMax
  } else {
    e = Math.floor(Math.log(value) / Math.LN2)
    if (value * (c = Math.pow(2, -e)) < 1) {
      e--
      c *= 2
    }
    if (e + eBias >= 1) {
      value += rt / c
    } else {
      value += rt * Math.pow(2, 1 - eBias)
    }
    if (value * c >= 2) {
      e++
      c /= 2
    }

    if (e + eBias >= eMax) {
      m = 0
      e = eMax
    } else if (e + eBias >= 1) {
      m = ((value * c) - 1) * Math.pow(2, mLen)
      e = e + eBias
    } else {
      m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen)
      e = 0
    }
  }

  for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8) {}

  e = (e << mLen) | m
  eLen += mLen
  for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8) {}

  buffer[offset + i - d] |= s * 128
}


/***/ }),

/***/ "../node_modules/isarray/index.js":
/*!****************************************!*\
  !*** ../node_modules/isarray/index.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = Array.isArray || function (arr) {
  return toString.call(arr) == '[object Array]';
};


/***/ }),

/***/ "../node_modules/node-libs-browser/mock/empty.js":
/*!*******************************************************!*\
  !*** ../node_modules/node-libs-browser/mock/empty.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ }),

/***/ "../node_modules/process/browser.js":
/*!******************************************!*\
  !*** ../node_modules/process/browser.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),

/***/ "../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!*****************************************************************************!*\
  !*** ../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \*****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isOldIE = function isOldIE() {
  var memo;
  return function memorize() {
    if (typeof memo === 'undefined') {
      // Test for IE <= 9 as proposed by Browserhacks
      // @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
      // Tests for existence of standard globals is to allow style-loader
      // to operate correctly into non-standard environments
      // @see https://github.com/webpack-contrib/style-loader/issues/177
      memo = Boolean(window && document && document.all && !window.atob);
    }

    return memo;
  };
}();

var getTarget = function getTarget() {
  var memo = {};
  return function memorize(target) {
    if (typeof memo[target] === 'undefined') {
      var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself

      if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
        try {
          // This will throw an exception if access to iframe is blocked
          // due to cross-origin restrictions
          styleTarget = styleTarget.contentDocument.head;
        } catch (e) {
          // istanbul ignore next
          styleTarget = null;
        }
      }

      memo[target] = styleTarget;
    }

    return memo[target];
  };
}();

var stylesInDom = [];

function getIndexByIdentifier(identifier) {
  var result = -1;

  for (var i = 0; i < stylesInDom.length; i++) {
    if (stylesInDom[i].identifier === identifier) {
      result = i;
      break;
    }
  }

  return result;
}

function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];

  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var index = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3]
    };

    if (index !== -1) {
      stylesInDom[index].references++;
      stylesInDom[index].updater(obj);
    } else {
      stylesInDom.push({
        identifier: identifier,
        updater: addStyle(obj, options),
        references: 1
      });
    }

    identifiers.push(identifier);
  }

  return identifiers;
}

function insertStyleElement(options) {
  var style = document.createElement('style');
  var attributes = options.attributes || {};

  if (typeof attributes.nonce === 'undefined') {
    var nonce =  true ? __webpack_require__.nc : undefined;

    if (nonce) {
      attributes.nonce = nonce;
    }
  }

  Object.keys(attributes).forEach(function (key) {
    style.setAttribute(key, attributes[key]);
  });

  if (typeof options.insert === 'function') {
    options.insert(style);
  } else {
    var target = getTarget(options.insert || 'head');

    if (!target) {
      throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
    }

    target.appendChild(style);
  }

  return style;
}

function removeStyleElement(style) {
  // istanbul ignore if
  if (style.parentNode === null) {
    return false;
  }

  style.parentNode.removeChild(style);
}
/* istanbul ignore next  */


var replaceText = function replaceText() {
  var textStore = [];
  return function replace(index, replacement) {
    textStore[index] = replacement;
    return textStore.filter(Boolean).join('\n');
  };
}();

function applyToSingletonTag(style, index, remove, obj) {
  var css = remove ? '' : obj.media ? "@media ".concat(obj.media, " {").concat(obj.css, "}") : obj.css; // For old IE

  /* istanbul ignore if  */

  if (style.styleSheet) {
    style.styleSheet.cssText = replaceText(index, css);
  } else {
    var cssNode = document.createTextNode(css);
    var childNodes = style.childNodes;

    if (childNodes[index]) {
      style.removeChild(childNodes[index]);
    }

    if (childNodes.length) {
      style.insertBefore(cssNode, childNodes[index]);
    } else {
      style.appendChild(cssNode);
    }
  }
}

function applyToTag(style, options, obj) {
  var css = obj.css;
  var media = obj.media;
  var sourceMap = obj.sourceMap;

  if (media) {
    style.setAttribute('media', media);
  } else {
    style.removeAttribute('media');
  }

  if (sourceMap && btoa) {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  } // For old IE

  /* istanbul ignore if  */


  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    while (style.firstChild) {
      style.removeChild(style.firstChild);
    }

    style.appendChild(document.createTextNode(css));
  }
}

var singleton = null;
var singletonCounter = 0;

function addStyle(obj, options) {
  var style;
  var update;
  var remove;

  if (options.singleton) {
    var styleIndex = singletonCounter++;
    style = singleton || (singleton = insertStyleElement(options));
    update = applyToSingletonTag.bind(null, style, styleIndex, false);
    remove = applyToSingletonTag.bind(null, style, styleIndex, true);
  } else {
    style = insertStyleElement(options);
    update = applyToTag.bind(null, style, options);

    remove = function remove() {
      removeStyleElement(style);
    };
  }

  update(obj);
  return function updateStyle(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap) {
        return;
      }

      update(obj = newObj);
    } else {
      remove();
    }
  };
}

module.exports = function (list, options) {
  options = options || {}; // Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
  // tags it will allow on a page

  if (!options.singleton && typeof options.singleton !== 'boolean') {
    options.singleton = isOldIE();
  }

  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];

    if (Object.prototype.toString.call(newList) !== '[object Array]') {
      return;
    }

    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDom[index].references--;
    }

    var newLastIdentifiers = modulesToDom(newList, options);

    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];

      var _index = getIndexByIdentifier(_identifier);

      if (stylesInDom[_index].references === 0) {
        stylesInDom[_index].updater();

        stylesInDom.splice(_index, 1);
      }
    }

    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),

/***/ "../node_modules/tslib/tslib.es6.js":
/*!******************************************!*\
  !*** ../node_modules/tslib/tslib.es6.js ***!
  \******************************************/
/*! exports provided: __extends, __assign, __rest, __decorate, __param, __metadata, __awaiter, __generator, __createBinding, __exportStar, __values, __read, __spread, __spreadArrays, __await, __asyncGenerator, __asyncDelegator, __asyncValues, __makeTemplateObject, __importStar, __importDefault, __classPrivateFieldGet, __classPrivateFieldSet */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__extends", function() { return __extends; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__assign", function() { return __assign; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__rest", function() { return __rest; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__decorate", function() { return __decorate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__param", function() { return __param; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__metadata", function() { return __metadata; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__awaiter", function() { return __awaiter; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__generator", function() { return __generator; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__createBinding", function() { return __createBinding; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__exportStar", function() { return __exportStar; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__values", function() { return __values; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__read", function() { return __read; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__spread", function() { return __spread; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__spreadArrays", function() { return __spreadArrays; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__await", function() { return __await; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__asyncGenerator", function() { return __asyncGenerator; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__asyncDelegator", function() { return __asyncDelegator; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__asyncValues", function() { return __asyncValues; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__makeTemplateObject", function() { return __makeTemplateObject; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__importStar", function() { return __importStar; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__importDefault", function() { return __importDefault; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__classPrivateFieldGet", function() { return __classPrivateFieldGet; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__classPrivateFieldSet", function() { return __classPrivateFieldSet; });
/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    }
    return __assign.apply(this, arguments);
}

function __rest(s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
}

function __decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}

function __param(paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
}

function __metadata(metadataKey, metadataValue) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
}

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}

function __createBinding(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}

function __exportStar(m, exports) {
    for (var p in m) if (p !== "default" && !exports.hasOwnProperty(p)) exports[p] = m[p];
}

function __values(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
}

function __read(o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
}

function __spread() {
    for (var ar = [], i = 0; i < arguments.length; i++)
        ar = ar.concat(__read(arguments[i]));
    return ar;
}

function __spreadArrays() {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};

function __await(v) {
    return this instanceof __await ? (this.v = v, this) : new __await(v);
}

function __asyncGenerator(thisArg, _arguments, generator) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var g = generator.apply(thisArg, _arguments || []), i, q = [];
    return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
    function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
    function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
    function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
    function fulfill(value) { resume("next", value); }
    function reject(value) { resume("throw", value); }
    function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
}

function __asyncDelegator(o) {
    var i, p;
    return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
    function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: n === "return" } : f ? f(v) : v; } : f; }
}

function __asyncValues(o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
}

function __makeTemplateObject(cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};

function __importStar(mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result.default = mod;
    return result;
}

function __importDefault(mod) {
    return (mod && mod.__esModule) ? mod : { default: mod };
}

function __classPrivateFieldGet(receiver, privateMap) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to get private field on non-instance");
    }
    return privateMap.get(receiver);
}

function __classPrivateFieldSet(receiver, privateMap, value) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to set private field on non-instance");
    }
    privateMap.set(receiver, value);
    return value;
}


/***/ }),

/***/ "../node_modules/webpack/buildin/amd-define.js":
/*!*****************************************************!*\
  !*** ../node_modules/webpack/buildin/amd-define.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function() {
	throw new Error("define cannot be used indirect");
};


/***/ }),

/***/ "../node_modules/webpack/buildin/amd-options.js":
/*!******************************************************!*\
  !*** ../node_modules/webpack/buildin/amd-options.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/* WEBPACK VAR INJECTION */(function(__webpack_amd_options__) {/* globals __webpack_amd_options__ */
module.exports = __webpack_amd_options__;

/* WEBPACK VAR INJECTION */}.call(this, {}))

/***/ }),

/***/ "../node_modules/webpack/buildin/global.js":
/*!*************************************************!*\
  !*** ../node_modules/webpack/buildin/global.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ "./external/FileSaver.min.js":
/*!***********************************!*\
  !*** ./external/FileSaver.min.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_RESULT__;/*! @source http://purl.eligrey.com/github/FileSaver.js/blob/master/FileSaver.js */
var saveAs = saveAs || function (e) {
  "use strict";

  if (typeof e === "undefined" || typeof navigator !== "undefined" && /MSIE [1-9]\./.test(navigator.userAgent)) {
    return;
  }

  var t = e.document,
      n = function n() {
    return e.URL || e.webkitURL || e;
  },
      r = t.createElementNS("http://www.w3.org/1999/xhtml", "a"),
      o = ("download" in r),
      a = function a(e) {
    var t = new MouseEvent("click");
    e.dispatchEvent(t);
  },
      i = /constructor/i.test(e.HTMLElement) || e.safari,
      f = /CriOS\/[\d]+/.test(navigator.userAgent),
      u = function u(t) {
    (e.setImmediate || e.setTimeout)(function () {
      throw t;
    }, 0);
  },
      s = "application/octet-stream",
      d = 1e3 * 40,
      c = function c(e) {
    var t = function t() {
      if (typeof e === "string") {
        n().revokeObjectURL(e);
      } else {
        e.remove();
      }
    };

    setTimeout(t, d);
  },
      l = function l(e, t, n) {
    t = [].concat(t);
    var r = t.length;

    while (r--) {
      var o = e["on" + t[r]];

      if (typeof o === "function") {
        try {
          o.call(e, n || e);
        } catch (a) {
          u(a);
        }
      }
    }
  },
      p = function p(e) {
    if (/^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(e.type)) {
      return new Blob([String.fromCharCode(65279), e], {
        type: e.type
      });
    }

    return e;
  },
      v = function v(t, u, d) {
    if (!d) {
      t = p(t);
    }

    var v = this,
        w = t.type,
        m = w === s,
        y,
        h = function h() {
      l(v, "writestart progress write writeend".split(" "));
    },
        S = function S() {
      if ((f || m && i) && e.FileReader) {
        var r = new FileReader();

        r.onloadend = function () {
          var t = f ? r.result : r.result.replace(/^data:[^;]*;/, "data:attachment/file;");
          var n = e.open(t, "_blank");
          if (!n) e.location.href = t;
          t = undefined;
          v.readyState = v.DONE;
          h();
        };

        r.readAsDataURL(t);
        v.readyState = v.INIT;
        return;
      }

      if (!y) {
        y = n().createObjectURL(t);
      }

      if (m) {
        e.location.href = y;
      } else {
        var o = e.open(y, "_blank");

        if (!o) {
          e.location.href = y;
        }
      }

      v.readyState = v.DONE;
      h();
      c(y);
    };

    v.readyState = v.INIT;

    if (o) {
      y = n().createObjectURL(t);
      setTimeout(function () {
        r.href = y;
        r.download = u;
        a(r);
        h();
        c(y);
        v.readyState = v.DONE;
      });
      return;
    }

    S();
  },
      w = v.prototype,
      m = function m(e, t, n) {
    return new v(e, t || e.name || "download", n);
  };

  if (typeof navigator !== "undefined" && navigator.msSaveOrOpenBlob) {
    return function (e, t, n) {
      t = t || e.name || "download";

      if (!n) {
        e = p(e);
      }

      return navigator.msSaveOrOpenBlob(e, t);
    };
  }

  w.abort = function () {};

  w.readyState = w.INIT = 0;
  w.WRITING = 1;
  w.DONE = 2;
  w.error = w.onwritestart = w.onprogress = w.onwrite = w.onabort = w.onerror = w.onwriteend = null;
  return m;
}(typeof self !== "undefined" && self || typeof window !== "undefined" && window || this.content);

if ( true && module.exports) {
  module.exports.saveAs = saveAs;
} else if ( true && __webpack_require__(/*! !webpack amd define */ "../node_modules/webpack/buildin/amd-define.js") !== null && __webpack_require__(/*! !webpack amd options */ "../node_modules/webpack/buildin/amd-options.js") !== null) {
  !(__WEBPACK_AMD_DEFINE_RESULT__ = (function () {
    return saveAs;
  }).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
}

/***/ }),

/***/ "./external/YourJS.min.js":
/*!********************************!*\
  !*** ./external/YourJS.min.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/*
 YourJS v2.22.1.gl - Your Very Own JS Library
 Home Page - http://yourjs.com/
 Download - http://yourjs.com/download/2.22.1.gl

 Copyright (c) 2015-2019 Christopher West
 Licensed under the MIT license.
*/
(function (G, n, u) {
  function B(b, c) {
    return b[c].bind(b);
  }

  function t(b) {
    return C.toString.call(b).slice(8, -1);
  }

  function H(b) {
    var c,
        a,
        d = t(b);
    return "Array" === d || !!b && !b.nodeName && "number" === typeof (c = b.length) && "Function" !== d && "String" !== d && (!c || 0 < c && 0 == (a = c - 1) % 1 && a in b);
  }

  function D(b) {
    return arguments.length ? H(b) ? E(b) : [b] : [];
  }

  function I(b) {
    var c = _typeof(b);

    return b == u || "object" != c && "function" != c;
  }

  function J(b) {
    var c = b && b.constructor;
    return c && "function" === typeof c ? c.prototype === b : !1;
  }

  function K() {
    return "YourJS v" + G + " (" + n + ")";
  }

  var x = this,
      C = {},
      v = x.document,
      w = B(C.hasOwnProperty, "call"),
      L;

  (function (b, c, a, d, k, e, p) {
    function g(e, r) {
      var m = [],
          l = [];

      for (h in e) {
        if (w(e, h)) {
          var f = e[h],
              q = t(f);
          if (h.indexOf("@media ")) {
            if ("Object" === q) {
              var h = h.replace(p, "$1");
              h = h.replace(k, function (b) {
                b = r ? b.replace(d, "& $&") : b;
                return r.replace(a, function (a) {
                  return b.replace(c, a);
                });
              });
              m.push(g(f, h));
            } else f = "Array" !== q ? f != u ? f && "number" == typeof f ? f + "px" : "!" == (f + "").slice(-1) ? f + "important" : f : "none" : f.join(","), h = h.replace(b, "-$&").toLowerCase(), l.push(h + ":" + f + ";");
          } else m.push(h + "{" + g(f, r) + "}");
        }
      }

      l[0] && m.unshift(r + "{" + l.join("") + "}");
      return m.join("");
    }

    L = function L(b, a) {
      if ("string" != typeof a) {
        if (a) {
          var c = ("_" + Math.random()).replace(e, +new Date());
          a = "Array" == t(a) ? a : [a];

          for (var d = a.length; d--;) {
            a[d].className += " " + c;
          }
        }

        a = c ? "." + c : "";
      }

      c = g(b, a);
      d = v.createElement("style");
      d.type = "text/css";
      d.styleSheet && !d.sheet ? d.styleSheet.cssText = c : d.appendChild(v.createTextNode(c));
      (v.getElementsByTagName("head")[0] || v.body).appendChild(d);
      return d;
    };
  })(/[A-Z]/g, /&/g, /[^,]+|^$/g, /^[^&]+$/, /[^\s\xa0,][^,]*/g, /0(.|$)/, /^[\s\xa0]+|[\s\xa0]*(,)[\s\xa0]*|[\s\xa0]+$/g);

  var E = B([].slice, "call"),
      F,
      y;

  (function (b, c) {
    F = function F(a) {
      var d = J(a),
          k = [],
          e = C.toString.call(a).slice(8, -1);
      I(a) ? k.push("*primitive", e.toLowerCase()) : "Object" !== e && k.push("Object");
      a != u && k.push(e);

      if ("Object" === e) {
        e = (a = a.constructor) && a.name || "*unknown";

        for (i = 0; i < c; i += 2) {
          if (a === b[i]) {
            e = b[i + 1];
            break;
          }
        }

        "Object" !== e && k.push(e);
      }

      d && k.push("*prototype");
      return k;
    };

    y = function y(a, d) {
      if (d) {
        for (var k = 0; k < c; k += 2) {
          if (a === b[k]) return !1;
        }

        c += 2;
        b.push(a, d);
        return !0;
      }

      a = F(a);
      return a[a.length - 1];
    };
  })([], 0);

  var _z;

  (function (b, c, a, d) {
    function k(a, b) {
      return b.toUpperCase();
    }

    _z = function z(e) {
      var p, g, n, r, m;
      if ("String" == y(e)) var l = E(_z({
        _: "DIV",
        html: e
      }).childNodes);else for (p in l = v.createElement(e.nodeName || e._), e) {
        var f = e[p];
        if (w(e, p) && "_" != (g = w(d, p) ? d[p] : p)) if ("style" == g) {
          var q = l[g];
          if ("String" == y(f)) q.cssText = f;else for (m in f) {
            w(f, m) && (q[m.replace(b, k)] = f[m]);
          }
        } else if (g == c || g == a) l[a] = l[c] = f;else if ("$" == g) for (f = D(f), q = 0, n = f.length; q < n;) {
          var h = D(_z(f[q++]));
          var t = 0;

          for (r = h.length; t < r;) {
            l.appendChild(h[t++]);
          }
        } else l[g] = f, g == p && l.getAttribute(g) == u && "function" != typeof f && l.setAttribute(g, f);
      }
      return l;
    };
  })(/-([^-])/g, "innerText", "textContent", {
    nodeName: "_",
    html: "innerHTML",
    text: "innerText",
    children: "$",
    "for": "htmlFor",
    "class": "className",
    cls: "className"
  });

  var N = function (b, c) {
    function a(a, b) {
      return (Array(b).join(0) + Math.abs(a)).slice(-b);
    }

    return function (d, k, e) {
      e = e || {};
      var p = e.months || b,
          g = e.days || c;
      e = d.getFullYear();
      var n = d.getMonth();
      p = p[n++];
      g = g[d.getDay()];
      var r = d.getDate(),
          m = d.getHours(),
          l = m % 12 || 12,
          f = d.getMinutes(),
          q = d.getSeconds(),
          h = d.getMilliseconds();
      d = d.getTimezoneOffset();
      var t = {
        YYYY: e,
        YY: e % 100,
        MMMM: p,
        MMM: p.slice(0, 3),
        MM: a(n, 2),
        M: n,
        DDDD: g,
        DDD: g.slice(0, 3),
        DD: a(r, 2),
        D: r,
        HH: a(m, 2),
        hh: a(l, 2),
        H: m,
        h: l,
        mm: a(f, 2),
        m: f,
        ss: a(q, 2),
        s: q,
        a: 12 > m ? "am" : "pm",
        A: 12 > m ? "AM" : "PM",
        SSS: a(h, 3),
        S: h,
        Z: (0 > d ? "+" : "-") + a(d / 60, 2) + a(d % 60, 2)
      };
      return k.replace(/YY(?:YY)?|M{1,4}|D{1,4}|HH?|hh?|mm?|ss?|a|A|S(?:SS)?|Z|'((?:[^']+|'')+)'/g, function (a, b) {
        return b ? b.replace(/''/g, "'") : t[a];
      });
    };
  }("January February March April May June July August September October November December".split(" "), "Sunday Monday Tuesday Wednesday Thursday Friday Saturday".split(" ")),
      M;

  (function (b, c) {
    M = function M() {
      c || (c = 1, x[n] = b);
      return A;
    };
  })(x[n]);

  var A = {
    alias: B,
    css: L,
    dom: _z,
    formatDate: N,
    has: w,
    info: function info() {
      return {
        name: n,
        version: G,
        toString: K
      };
    },
    isArrayLike: H,
    isPrimitive: I,
    isPrototype: J,
    kindsOf: F,
    nativeType: t,
    noConflict: M,
    quoteRegExp: function quoteRegExp(b, c) {
      var a = b.replace(/[[\](){}.+*^$|\\?-]/g, "\\$&");
      return "" === c || c ? new RegExp(a, !0 === c ? "" : c) : a;
    },
    slice: E,
    toArray: D,
    toString: K,
    typeOf: y
  };
  [].forEach(function (b) {
    b();
  });
   true ? ( true && module.exports && (exports = module.exports = A), (exports[n] = A)[n] = u) : undefined;
})("2.22.1.gl", "JS");

/***/ }),

/***/ "./external/datatables/css/buttons.dataTables.min.css":
/*!************************************************************!*\
  !*** ./external/datatables/css/buttons.dataTables.min.css ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var api = __webpack_require__(/*! ../../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
            var content = __webpack_require__(/*! !../../../../node_modules/css-loader/dist/cjs.js??ref--8-1!../../../../node_modules/postcss-loader/src??ref--8-2!../../../../node_modules/sass-loader/dist/cjs.js!./buttons.dataTables.min.css */ "../node_modules/css-loader/dist/cjs.js?!../node_modules/postcss-loader/src/index.js?!../node_modules/sass-loader/dist/cjs.js!./external/datatables/css/buttons.dataTables.min.css");

            content = content.__esModule ? content.default : content;

            if (typeof content === 'string') {
              content = [[module.i, content, '']];
            }

var options = {};

options.insert = "head";
options.singleton = false;

var update = api(content, options);

var exported = content.locals ? content.locals : {};



module.exports = exported;

/***/ }),

/***/ "./external/datatables/css/fixedHeader.dataTables.min.css":
/*!****************************************************************!*\
  !*** ./external/datatables/css/fixedHeader.dataTables.min.css ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var api = __webpack_require__(/*! ../../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
            var content = __webpack_require__(/*! !../../../../node_modules/css-loader/dist/cjs.js??ref--8-1!../../../../node_modules/postcss-loader/src??ref--8-2!../../../../node_modules/sass-loader/dist/cjs.js!./fixedHeader.dataTables.min.css */ "../node_modules/css-loader/dist/cjs.js?!../node_modules/postcss-loader/src/index.js?!../node_modules/sass-loader/dist/cjs.js!./external/datatables/css/fixedHeader.dataTables.min.css");

            content = content.__esModule ? content.default : content;

            if (typeof content === 'string') {
              content = [[module.i, content, '']];
            }

var options = {};

options.insert = "head";
options.singleton = false;

var update = api(content, options);

var exported = content.locals ? content.locals : {};



module.exports = exported;

/***/ }),

/***/ "./external/datatables/css/jquery.dataTables.min.css":
/*!***********************************************************!*\
  !*** ./external/datatables/css/jquery.dataTables.min.css ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var api = __webpack_require__(/*! ../../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
            var content = __webpack_require__(/*! !../../../../node_modules/css-loader/dist/cjs.js??ref--8-1!../../../../node_modules/postcss-loader/src??ref--8-2!../../../../node_modules/sass-loader/dist/cjs.js!./jquery.dataTables.min.css */ "../node_modules/css-loader/dist/cjs.js?!../node_modules/postcss-loader/src/index.js?!../node_modules/sass-loader/dist/cjs.js!./external/datatables/css/jquery.dataTables.min.css");

            content = content.__esModule ? content.default : content;

            if (typeof content === 'string') {
              content = [[module.i, content, '']];
            }

var options = {};

options.insert = "head";
options.singleton = false;

var update = api(content, options);

var exported = content.locals ? content.locals : {};



module.exports = exported;

/***/ }),

/***/ "./external/datatables/images/sort_asc.png":
/*!*************************************************!*\
  !*** ./external/datatables/images/sort_asc.png ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABMAAAATCAYAAAByUDbMAAAAZ0lEQVQ4y2NgGLKgquEuFxBPAGI2ahhWCsS/gDibUoO0gPgxEP8H4ttArEyuQYxAPBdqEAxPBImTY5gjEL9DM+wTENuQahAvEO9DMwiGdwAxOymGJQLxTyD+jgWDxCMZRsEoGAVoAADeemwtPcZI2wAAAABJRU5ErkJggg=="

/***/ }),

/***/ "./external/datatables/images/sort_asc_disabled.png":
/*!**********************************************************!*\
  !*** ./external/datatables/images/sort_asc_disabled.png ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABMAAAATCAQAAADYWf5HAAAAW0lEQVQoz2NgoCm4w3Vnwh02wspK7/y6k01Ikdadx3f+37l9RxmfIsY7c4GKQHDiHUbcyhzvvIMq+3THBpci3jv7oIpAcMcdduzKEu/8vPMdDn/eiWQYBYMKAAC3ykIEuYQJUgAAAABJRU5ErkJggg=="

/***/ }),

/***/ "./external/datatables/images/sort_both.png":
/*!**************************************************!*\
  !*** ./external/datatables/images/sort_both.png ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABMAAAATCAQAAADYWf5HAAAAkElEQVQoz7XQMQ5AQBCF4dWQSJxC5wwax1Cq1e7BAdxD5SL+Tq/QCM1oNiJidwox0355mXnG/DrEtIQ6azioNZQxI0ykPhTQIwhCR+BmBYtlK7kLJYwWCcJA9M4qdrZrd8pPjZWPtOqdRQy320YSV17OatFC4euts6z39GYMKRPCTKY9UnPQ6P+GtMRfGtPnBCiqhAeJPmkqAAAAAElFTkSuQmCC"

/***/ }),

/***/ "./external/datatables/images/sort_desc.png":
/*!**************************************************!*\
  !*** ./external/datatables/images/sort_desc.png ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABMAAAATCAYAAAByUDbMAAAAZUlEQVQ4y2NgGAWjYBSggaqGu5FA/BOIv2PBIPFEUgxjB+IdQPwfC94HxLykus4GiD+hGfQOiB3J8SojEE9EM2wuSJzcsFMG4ttQgx4DsRalkZENxL+AuJQaMcsGxBOAmGvopk8AVz1sLZgg0bsAAAAASUVORK5CYII="

/***/ }),

/***/ "./external/datatables/images/sort_desc_disabled.png":
/*!***********************************************************!*\
  !*** ./external/datatables/images/sort_desc_disabled.png ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABMAAAATCAQAAADYWf5HAAAAWUlEQVQoz2NgGAWDCtyJvPPzznc4/HknEbsy9js77vyHw313eHGZZ3PnE1TRuzuOuK1lvDMRqmzuHUZ87lO+cxuo6PEdLUIeyb7z604pYf+y3Zlwh4u2YQoAc7ZCBHH4jigAAAAASUVORK5CYII="

/***/ }),

/***/ "./external/datatables/js/dataTables.buttons.min.js":
/*!**********************************************************!*\
  !*** ./external/datatables/js/dataTables.buttons.min.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/*!
 Buttons for DataTables 1.6.1
 ©2016-2019 SpryMedia Ltd - datatables.net/license
*/
(function (d) {
   true ? !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(/*! jquery */ "jquery"), __webpack_require__(/*! ./jquery.dataTables.min */ "./external/datatables/js/jquery.dataTables.min.js")], __WEBPACK_AMD_DEFINE_RESULT__ = (function (u) {
    return d(u, window, document);
  }).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : undefined;
})(function (d, u, t, p) {
  function y(a) {
    a = new m.Api(a);
    var b = a.init().buttons || m.defaults.buttons;
    return new n(a, b).container();
  }

  var m = d.fn.dataTable,
      B = 0,
      C = 0,
      q = m.ext.buttons,
      n = function n(a, b) {
    if (!(this instanceof n)) return function (b) {
      return new n(b, a).container();
    };
    "undefined" === typeof b && (b = {});
    !0 === b && (b = {});
    d.isArray(b) && (b = {
      buttons: b
    });
    this.c = d.extend(!0, {}, n.defaults, b);
    b.buttons && (this.c.buttons = b.buttons);
    this.s = {
      dt: new m.Api(a),
      buttons: [],
      listenKeys: "",
      namespace: "dtb" + B++
    };
    this.dom = {
      container: d("<" + this.c.dom.container.tag + "/>").addClass(this.c.dom.container.className)
    };

    this._constructor();
  };

  d.extend(n.prototype, {
    action: function action(a, b) {
      a = this._nodeToButton(a);
      if (b === p) return a.conf.action;
      a.conf.action = b;
      return this;
    },
    active: function active(a, b) {
      var c = this._nodeToButton(a);

      a = this.c.dom.button.active;
      c = d(c.node);
      if (b === p) return c.hasClass(a);
      c.toggleClass(a, b === p ? !0 : b);
      return this;
    },
    add: function add(a, b) {
      var c = this.s.buttons;

      if ("string" === typeof b) {
        b = b.split("-");
        var e = this.s;
        c = 0;

        for (var d = b.length - 1; c < d; c++) {
          e = e.buttons[1 * b[c]];
        }

        c = e.buttons;
        b = 1 * b[b.length - 1];
      }

      this._expandButton(c, a, e !== p, b);

      this._draw();

      return this;
    },
    container: function container() {
      return this.dom.container;
    },
    disable: function disable(a) {
      a = this._nodeToButton(a);
      d(a.node).addClass(this.c.dom.button.disabled);
      return this;
    },
    destroy: function destroy() {
      d("body").off("keyup." + this.s.namespace);
      var a = this.s.buttons.slice(),
          b;
      var c = 0;

      for (b = a.length; c < b; c++) {
        this.remove(a[c].node);
      }

      this.dom.container.remove();
      a = this.s.dt.settings()[0];
      c = 0;

      for (b = a.length; c < b; c++) {
        if (a.inst === this) {
          a.splice(c, 1);
          break;
        }
      }

      return this;
    },
    enable: function enable(a, b) {
      if (!1 === b) return this.disable(a);
      a = this._nodeToButton(a);
      d(a.node).removeClass(this.c.dom.button.disabled);
      return this;
    },
    name: function name() {
      return this.c.name;
    },
    node: function node(a) {
      if (!a) return this.dom.container;
      a = this._nodeToButton(a);
      return d(a.node);
    },
    processing: function processing(a, b) {
      var c = this.s.dt,
          e = this._nodeToButton(a);

      if (b === p) return d(e.node).hasClass("processing");
      d(e.node).toggleClass("processing", b);
      d(c.table().node()).triggerHandler("buttons-processing.dt", [b, c.button(a), c, d(a), e.conf]);
      return this;
    },
    remove: function remove(a) {
      var b = this._nodeToButton(a),
          c = this._nodeToHost(a),
          e = this.s.dt;

      if (b.buttons.length) for (var g = b.buttons.length - 1; 0 <= g; g--) {
        this.remove(b.buttons[g].node);
      }
      b.conf.destroy && b.conf.destroy.call(e.button(a), e, d(a), b.conf);

      this._removeKey(b.conf);

      d(b.node).remove();
      a = d.inArray(b, c);
      c.splice(a, 1);
      return this;
    },
    text: function text(a, b) {
      var c = this._nodeToButton(a);

      a = this.c.dom.collection.buttonLiner;
      a = c.inCollection && a && a.tag ? a.tag : this.c.dom.buttonLiner.tag;

      var e = this.s.dt,
          g = d(c.node),
          f = function f(a) {
        return "function" === typeof a ? a(e, g, c.conf) : a;
      };

      if (b === p) return f(c.conf.text);
      c.conf.text = b;
      a ? g.children(a).html(f(b)) : g.html(f(b));
      return this;
    },
    _constructor: function _constructor() {
      var a = this,
          b = this.s.dt,
          c = b.settings()[0],
          e = this.c.buttons;
      c._buttons || (c._buttons = []);

      c._buttons.push({
        inst: this,
        name: this.c.name
      });

      for (var g = 0, f = e.length; g < f; g++) {
        this.add(e[g]);
      }

      b.on("destroy", function (b, e) {
        e === c && a.destroy();
      });
      d("body").on("keyup." + this.s.namespace, function (b) {
        if (!t.activeElement || t.activeElement === t.body) {
          var c = String.fromCharCode(b.keyCode).toLowerCase();
          -1 !== a.s.listenKeys.toLowerCase().indexOf(c) && a._keypress(c, b);
        }
      });
    },
    _addKey: function _addKey(a) {
      a.key && (this.s.listenKeys += d.isPlainObject(a.key) ? a.key.key : a.key);
    },
    _draw: function _draw(a, b) {
      a || (a = this.dom.container, b = this.s.buttons);
      a.children().detach();

      for (var c = 0, e = b.length; c < e; c++) {
        a.append(b[c].inserter), a.append(" "), b[c].buttons && b[c].buttons.length && this._draw(b[c].collection, b[c].buttons);
      }
    },
    _expandButton: function _expandButton(a, b, c, e) {
      var g = this.s.dt,
          f = 0;
      b = d.isArray(b) ? b : [b];

      for (var h = 0, k = b.length; h < k; h++) {
        var r = this._resolveExtends(b[h]);

        if (r) if (d.isArray(r)) this._expandButton(a, r, c, e);else {
          var l = this._buildButton(r, c);

          l && (e !== p ? (a.splice(e, 0, l), e++) : a.push(l), l.conf.buttons && (l.collection = d("<" + this.c.dom.collection.tag + "/>"), l.conf._collection = l.collection, this._expandButton(l.buttons, l.conf.buttons, !0, e)), r.init && r.init.call(g.button(l.node), g, d(l.node), r), f++);
        }
      }
    },
    _buildButton: function _buildButton(a, b) {
      var c = this.c.dom.button,
          e = this.c.dom.buttonLiner,
          g = this.c.dom.collection,
          f = this.s.dt,
          h = function h(b) {
        return "function" === typeof b ? b(f, l, a) : b;
      };

      b && g.button && (c = g.button);
      b && g.buttonLiner && (e = g.buttonLiner);
      if (a.available && !a.available(f, a)) return !1;

      var k = function k(a, b, c, e) {
        e.action.call(b.button(c), a, b, c, e);
        d(b.table().node()).triggerHandler("buttons-action.dt", [b.button(c), b, c, e]);
      };

      g = a.tag || c.tag;
      var r = a.clickBlurs === p ? !0 : a.clickBlurs,
          l = d("<" + g + "/>").addClass(c.className).attr("tabindex", this.s.dt.settings()[0].iTabIndex).attr("aria-controls", this.s.dt.table().node().id).on("click.dtb", function (b) {
        b.preventDefault();
        !l.hasClass(c.disabled) && a.action && k(b, f, l, a);
        r && l.blur();
      }).on("keyup.dtb", function (b) {
        13 === b.keyCode && !l.hasClass(c.disabled) && a.action && k(b, f, l, a);
      });
      "a" === g.toLowerCase() && l.attr("href", "#");
      "button" === g.toLowerCase() && l.attr("type", "button");
      e.tag ? (g = d("<" + e.tag + "/>").html(h(a.text)).addClass(e.className), "a" === e.tag.toLowerCase() && g.attr("href", "#"), l.append(g)) : l.html(h(a.text));
      !1 === a.enabled && l.addClass(c.disabled);
      a.className && l.addClass(a.className);
      a.titleAttr && l.attr("title", h(a.titleAttr));
      a.attr && l.attr(a.attr);
      a.namespace || (a.namespace = ".dt-button-" + C++);
      e = (e = this.c.dom.buttonContainer) && e.tag ? d("<" + e.tag + "/>").addClass(e.className).append(l) : l;

      this._addKey(a);

      this.c.buttonCreated && (e = this.c.buttonCreated(a, e));
      return {
        conf: a,
        node: l.get(0),
        inserter: e,
        buttons: [],
        inCollection: b,
        collection: null
      };
    },
    _nodeToButton: function _nodeToButton(a, b) {
      b || (b = this.s.buttons);

      for (var c = 0, e = b.length; c < e; c++) {
        if (b[c].node === a) return b[c];

        if (b[c].buttons.length) {
          var d = this._nodeToButton(a, b[c].buttons);

          if (d) return d;
        }
      }
    },
    _nodeToHost: function _nodeToHost(a, b) {
      b || (b = this.s.buttons);

      for (var c = 0, e = b.length; c < e; c++) {
        if (b[c].node === a) return b;

        if (b[c].buttons.length) {
          var d = this._nodeToHost(a, b[c].buttons);

          if (d) return d;
        }
      }
    },
    _keypress: function _keypress(a, b) {
      if (!b._buttonsHandled) {
        var c = function c(e) {
          for (var g = 0, f = e.length; g < f; g++) {
            var h = e[g].conf,
                k = e[g].node;
            h.key && (h.key === a ? (b._buttonsHandled = !0, d(k).click()) : !d.isPlainObject(h.key) || h.key.key !== a || h.key.shiftKey && !b.shiftKey || h.key.altKey && !b.altKey || h.key.ctrlKey && !b.ctrlKey || h.key.metaKey && !b.metaKey || (b._buttonsHandled = !0, d(k).click()));
            e[g].buttons.length && c(e[g].buttons);
          }
        };

        c(this.s.buttons);
      }
    },
    _removeKey: function _removeKey(a) {
      if (a.key) {
        var b = d.isPlainObject(a.key) ? a.key.key : a.key;
        a = this.s.listenKeys.split("");
        b = d.inArray(b, a);
        a.splice(b, 1);
        this.s.listenKeys = a.join("");
      }
    },
    _resolveExtends: function _resolveExtends(a) {
      var b = this.s.dt,
          c,
          e = function e(c) {
        for (var e = 0; !d.isPlainObject(c) && !d.isArray(c);) {
          if (c === p) return;

          if ("function" === typeof c) {
            if (c = c(b, a), !c) return !1;
          } else if ("string" === typeof c) {
            if (!q[c]) throw "Unknown button type: " + c;
            c = q[c];
          }

          e++;
          if (30 < e) throw "Buttons: Too many iterations";
        }

        return d.isArray(c) ? c : d.extend({}, c);
      };

      for (a = e(a); a && a.extend;) {
        if (!q[a.extend]) throw "Cannot extend unknown button type: " + a.extend;
        var g = e(q[a.extend]);
        if (d.isArray(g)) return g;
        if (!g) return !1;
        var f = g.className;
        a = d.extend({}, g, a);
        f && a.className !== f && (a.className = f + " " + a.className);
        var h = a.postfixButtons;

        if (h) {
          a.buttons || (a.buttons = []);
          f = 0;

          for (c = h.length; f < c; f++) {
            a.buttons.push(h[f]);
          }

          a.postfixButtons = null;
        }

        if (h = a.prefixButtons) {
          a.buttons || (a.buttons = []);
          f = 0;

          for (c = h.length; f < c; f++) {
            a.buttons.splice(f, 0, h[f]);
          }

          a.prefixButtons = null;
        }

        a.extend = g.extend;
      }

      return a;
    },
    _popover: function _popover(a, b, c) {
      var e = this.c,
          g = d.extend({
        align: "button-left",
        autoClose: !1,
        background: !0,
        backgroundClassName: "dt-button-background",
        contentClassName: e.dom.collection.className,
        collectionLayout: "",
        collectionTitle: "",
        dropup: !1,
        fade: 400,
        rightAlignClassName: "dt-button-right",
        tag: e.dom.collection.tag
      }, c),
          f = b.node(),
          h = function h() {
        d(".dt-button-collection").stop().fadeOut(g.fade, function () {
          d(this).detach();
        });
        d(b.buttons('[aria-haspopup="true"][aria-expanded="true"]').nodes()).attr("aria-expanded", "false");
        d("div.dt-button-background").off("click.dtb-collection");
        n.background(!1, g.backgroundClassName, g.fade, f);
        d("body").off(".dtb-collection");
        b.off("buttons-action.b-internal");
      };

      !1 === a && h();
      c = d(b.buttons('[aria-haspopup="true"][aria-expanded="true"]').nodes());
      c.length && (f = c.eq(0), h());
      c = d("<div/>").addClass("dt-button-collection").addClass(g.collectionLayout).css("display", "none");
      a = d(a).addClass(g.contentClassName).attr("role", "menu").appendTo(c);
      f.attr("aria-expanded", "true");
      f.parents("body")[0] !== t.body && (f = t.body.lastChild);
      g.collectionTitle && c.prepend('<div class="dt-button-collection-title">' + g.collectionTitle + "</div>");
      c.insertAfter(f).fadeIn(g.fade);
      var k = d(b.table().container());
      e = c.css("position");
      "dt-container" === g.align && (f = f.parent(), c.css("width", k.width()));

      if ("absolute" === e) {
        e = f.position();
        c.css({
          top: e.top + f.outerHeight(),
          left: e.left
        });
        var r = c.outerHeight(),
            l = c.outerWidth(),
            w = k.offset().top + k.height();
        w = e.top + f.outerHeight() + r - w;
        var D = e.top - r,
            m = k.offset().top;
        r = e.top - r - 5;
        (w > m - D || g.dropup) && -r < m && c.css("top", r);
        (c.hasClass(g.rightAlignClassName) || "button-right" === g.align) && c.css("left", e.left + f.outerWidth() - l);
        r = e.left + l;
        k = k.offset().left + k.width();
        r > k && c.css("left", e.left - (r - k));
        k = f.offset().left + l;
        k > d(u).width() && c.css("left", e.left - (k - d(u).width()));
      } else e = c.height() / 2, e > d(u).height() / 2 && (e = d(u).height() / 2), c.css("marginTop", -1 * e);

      g.background && n.background(!0, g.backgroundClassName, g.fade, f);
      d("div.dt-button-background").on("click.dtb-collection", function () {});
      d("body").on("click.dtb-collection", function (b) {
        var c = d.fn.addBack ? "addBack" : "andSelf";
        d(b.target).parents()[c]().filter(a).length || h();
      }).on("keyup.dtb-collection", function (a) {
        27 === a.keyCode && h();
      });
      g.autoClose && setTimeout(function () {
        b.on("buttons-action.b-internal", function (a, b, c, e) {
          e[0] !== f[0] && h();
        });
      }, 0);
    }
  });

  n.background = function (a, b, c, e) {
    c === p && (c = 400);
    e || (e = t.body);
    a ? d("<div/>").addClass(b).css("display", "none").insertAfter(e).stop().fadeIn(c) : d("div." + b).stop().fadeOut(c, function () {
      d(this).removeClass(b).remove();
    });
  };

  n.instanceSelector = function (a, b) {
    if (a === p || null === a) return d.map(b, function (a) {
      return a.inst;
    });

    var c = [],
        e = d.map(b, function (a) {
      return a.name;
    }),
        g = function g(a) {
      if (d.isArray(a)) for (var f = 0, k = a.length; f < k; f++) {
        g(a[f]);
      } else "string" === typeof a ? -1 !== a.indexOf(",") ? g(a.split(",")) : (a = d.inArray(d.trim(a), e), -1 !== a && c.push(b[a].inst)) : "number" === typeof a && c.push(b[a].inst);
    };

    g(a);
    return c;
  };

  n.buttonSelector = function (a, b) {
    for (var c = [], e = function e(a, b, c) {
      for (var d, g, f = 0, k = b.length; f < k; f++) {
        if (d = b[f]) g = c !== p ? c + f : f + "", a.push({
          node: d.node,
          name: d.conf.name,
          idx: g
        }), d.buttons && e(a, d.buttons, g + "-");
      }
    }, g = function g(a, b) {
      var f,
          h = [];
      e(h, b.s.buttons);
      var k = d.map(h, function (a) {
        return a.node;
      });
      if (d.isArray(a) || a instanceof d) for (k = 0, f = a.length; k < f; k++) {
        g(a[k], b);
      } else if (null === a || a === p || "*" === a) for (k = 0, f = h.length; k < f; k++) {
        c.push({
          inst: b,
          node: h[k].node
        });
      } else if ("number" === typeof a) c.push({
        inst: b,
        node: b.s.buttons[a].node
      });else if ("string" === typeof a) {
        if (-1 !== a.indexOf(",")) for (h = a.split(","), k = 0, f = h.length; k < f; k++) {
          g(d.trim(h[k]), b);
        } else if (a.match(/^\d+(\-\d+)*$/)) k = d.map(h, function (a) {
          return a.idx;
        }), c.push({
          inst: b,
          node: h[d.inArray(a, k)].node
        });else if (-1 !== a.indexOf(":name")) for (a = a.replace(":name", ""), k = 0, f = h.length; k < f; k++) {
          h[k].name === a && c.push({
            inst: b,
            node: h[k].node
          });
        } else d(k).filter(a).each(function () {
          c.push({
            inst: b,
            node: this
          });
        });
      } else "object" === _typeof(a) && a.nodeName && (h = d.inArray(a, k), -1 !== h && c.push({
        inst: b,
        node: k[h]
      }));
    }, f = 0, h = a.length; f < h; f++) {
      g(b, a[f]);
    }

    return c;
  };

  n.defaults = {
    buttons: ["copy", "excel", "csv", "pdf", "print"],
    name: "main",
    tabIndex: 0,
    dom: {
      container: {
        tag: "div",
        className: "dt-buttons"
      },
      collection: {
        tag: "div",
        className: ""
      },
      button: {
        tag: "ActiveXObject" in u ? "a" : "button",
        className: "dt-button",
        active: "active",
        disabled: "disabled"
      },
      buttonLiner: {
        tag: "span",
        className: ""
      }
    }
  };
  n.version = "1.6.1";
  d.extend(q, {
    collection: {
      text: function text(a) {
        return a.i18n("buttons.collection", "Collection");
      },
      className: "buttons-collection",
      init: function init(a, b, c) {
        b.attr("aria-expanded", !1);
      },
      action: function action(a, b, c, e) {
        a.stopPropagation();
        e._collection.parents("body").length ? this.popover(!1, e) : this.popover(e._collection, e);
      },
      attr: {
        "aria-haspopup": !0
      }
    },
    copy: function copy(a, b) {
      if (q.copyHtml5) return "copyHtml5";
      if (q.copyFlash && q.copyFlash.available(a, b)) return "copyFlash";
    },
    csv: function csv(a, b) {
      if (q.csvHtml5 && q.csvHtml5.available(a, b)) return "csvHtml5";
      if (q.csvFlash && q.csvFlash.available(a, b)) return "csvFlash";
    },
    excel: function excel(a, b) {
      if (q.excelHtml5 && q.excelHtml5.available(a, b)) return "excelHtml5";
      if (q.excelFlash && q.excelFlash.available(a, b)) return "excelFlash";
    },
    pdf: function pdf(a, b) {
      if (q.pdfHtml5 && q.pdfHtml5.available(a, b)) return "pdfHtml5";
      if (q.pdfFlash && q.pdfFlash.available(a, b)) return "pdfFlash";
    },
    pageLength: function pageLength(a) {
      a = a.settings()[0].aLengthMenu;
      var b = d.isArray(a[0]) ? a[0] : a,
          c = d.isArray(a[0]) ? a[1] : a;
      return {
        extend: "collection",
        text: function text(a) {
          return a.i18n("buttons.pageLength", {
            "-1": "Show all rows",
            _: "Show %d rows"
          }, a.page.len());
        },
        className: "buttons-page-length",
        autoClose: !0,
        buttons: d.map(b, function (a, b) {
          return {
            text: c[b],
            className: "button-page-length",
            action: function action(b, c) {
              c.page.len(a).draw();
            },
            init: function init(b, c, d) {
              var e = this;

              c = function c() {
                e.active(b.page.len() === a);
              };

              b.on("length.dt" + d.namespace, c);
              c();
            },
            destroy: function destroy(a, b, c) {
              a.off("length.dt" + c.namespace);
            }
          };
        }),
        init: function init(a, b, c) {
          var d = this;
          a.on("length.dt" + c.namespace, function () {
            d.text(c.text);
          });
        },
        destroy: function destroy(a, b, c) {
          a.off("length.dt" + c.namespace);
        }
      };
    }
  });
  m.Api.register("buttons()", function (a, b) {
    b === p && (b = a, a = p);
    this.selector.buttonGroup = a;
    var c = this.iterator(!0, "table", function (c) {
      if (c._buttons) return n.buttonSelector(n.instanceSelector(a, c._buttons), b);
    }, !0);
    c._groupSelector = a;
    return c;
  });
  m.Api.register("button()", function (a, b) {
    a = this.buttons(a, b);
    1 < a.length && a.splice(1, a.length);
    return a;
  });
  m.Api.registerPlural("buttons().active()", "button().active()", function (a) {
    return a === p ? this.map(function (a) {
      return a.inst.active(a.node);
    }) : this.each(function (b) {
      b.inst.active(b.node, a);
    });
  });
  m.Api.registerPlural("buttons().action()", "button().action()", function (a) {
    return a === p ? this.map(function (a) {
      return a.inst.action(a.node);
    }) : this.each(function (b) {
      b.inst.action(b.node, a);
    });
  });
  m.Api.register(["buttons().enable()", "button().enable()"], function (a) {
    return this.each(function (b) {
      b.inst.enable(b.node, a);
    });
  });
  m.Api.register(["buttons().disable()", "button().disable()"], function () {
    return this.each(function (a) {
      a.inst.disable(a.node);
    });
  });
  m.Api.registerPlural("buttons().nodes()", "button().node()", function () {
    var a = d();
    d(this.each(function (b) {
      a = a.add(b.inst.node(b.node));
    }));
    return a;
  });
  m.Api.registerPlural("buttons().processing()", "button().processing()", function (a) {
    return a === p ? this.map(function (a) {
      return a.inst.processing(a.node);
    }) : this.each(function (b) {
      b.inst.processing(b.node, a);
    });
  });
  m.Api.registerPlural("buttons().text()", "button().text()", function (a) {
    return a === p ? this.map(function (a) {
      return a.inst.text(a.node);
    }) : this.each(function (b) {
      b.inst.text(b.node, a);
    });
  });
  m.Api.registerPlural("buttons().trigger()", "button().trigger()", function () {
    return this.each(function (a) {
      a.inst.node(a.node).trigger("click");
    });
  });
  m.Api.register("button().popover()", function (a, b) {
    return this.map(function (c) {
      return c.inst._popover(a, this.button(this[0].node), b);
    });
  });
  m.Api.register("buttons().containers()", function () {
    var a = d(),
        b = this._groupSelector;
    this.iterator(!0, "table", function (c) {
      if (c._buttons) {
        c = n.instanceSelector(b, c._buttons);

        for (var d = 0, g = c.length; d < g; d++) {
          a = a.add(c[d].container());
        }
      }
    });
    return a;
  });
  m.Api.register("buttons().container()", function () {
    return this.containers().eq(0);
  });
  m.Api.register("button().add()", function (a, b) {
    var c = this.context;
    c.length && (c = n.instanceSelector(this._groupSelector, c[0]._buttons), c.length && c[0].add(b, a));
    return this.button(this._groupSelector, a);
  });
  m.Api.register("buttons().destroy()", function () {
    this.pluck("inst").unique().each(function (a) {
      a.destroy();
    });
    return this;
  });
  m.Api.registerPlural("buttons().remove()", "buttons().remove()", function () {
    this.each(function (a) {
      a.inst.remove(a.node);
    });
    return this;
  });
  var v;
  m.Api.register("buttons.info()", function (a, b, c) {
    var e = this;
    if (!1 === a) return this.off("destroy.btn-info"), d("#datatables_buttons_info").fadeOut(function () {
      d(this).remove();
    }), clearTimeout(v), v = null, this;
    v && clearTimeout(v);
    d("#datatables_buttons_info").length && d("#datatables_buttons_info").remove();
    a = a ? "<h2>" + a + "</h2>" : "";
    d('<div id="datatables_buttons_info" class="dt-button-info"/>').html(a).append(d("<div/>")["string" === typeof b ? "html" : "append"](b)).css("display", "none").appendTo("body").fadeIn();
    c !== p && 0 !== c && (v = setTimeout(function () {
      e.buttons.info(!1);
    }, c));
    this.on("destroy.btn-info", function () {
      e.buttons.info(!1);
    });
    return this;
  });
  m.Api.register("buttons.exportData()", function (a) {
    if (this.context.length) return E(new m.Api(this.context[0]), a);
  });
  m.Api.register("buttons.exportInfo()", function (a) {
    a || (a = {});
    var b = a;
    var c = "*" === b.filename && "*" !== b.title && b.title !== p && null !== b.title && "" !== b.title ? b.title : b.filename;
    "function" === typeof c && (c = c());
    c === p || null === c ? c = null : (-1 !== c.indexOf("*") && (c = d.trim(c.replace("*", d("head > title").text()))), c = c.replace(/[^a-zA-Z0-9_\u00A1-\uFFFF\.,\-_ !\(\)]/g, ""), (b = x(b.extension)) || (b = ""), c += b);
    b = x(a.title);
    b = null === b ? null : -1 !== b.indexOf("*") ? b.replace("*", d("head > title").text() || "Exported data") : b;
    return {
      filename: c,
      title: b,
      messageTop: z(this, a.message || a.messageTop, "top"),
      messageBottom: z(this, a.messageBottom, "bottom")
    };
  });

  var x = function x(a) {
    return null === a || a === p ? null : "function" === typeof a ? a() : a;
  },
      z = function z(a, b, c) {
    b = x(b);
    if (null === b) return null;
    a = d("caption", a.table().container()).eq(0);
    return "*" === b ? a.css("caption-side") !== c ? null : a.length ? a.text() : "" : b;
  },
      A = d("<textarea/>")[0],
      E = function E(a, b) {
    var c = d.extend(!0, {}, {
      rows: null,
      columns: "",
      modifier: {
        search: "applied",
        order: "applied"
      },
      orthogonal: "display",
      stripHtml: !0,
      stripNewlines: !0,
      decodeEntities: !0,
      trim: !0,
      format: {
        header: function header(a) {
          return e(a);
        },
        footer: function footer(a) {
          return e(a);
        },
        body: function body(a) {
          return e(a);
        }
      },
      customizeData: null
    }, b),
        e = function e(a) {
      if ("string" !== typeof a) return a;
      a = a.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "");
      a = a.replace(/<!\-\-.*?\-\->/g, "");
      c.stripHtml && (a = a.replace(/<[^>]*>/g, ""));
      c.trim && (a = a.replace(/^\s+|\s+$/g, ""));
      c.stripNewlines && (a = a.replace(/\n/g, " "));
      c.decodeEntities && (A.innerHTML = a, a = A.value);
      return a;
    };

    b = a.columns(c.columns).indexes().map(function (b) {
      var d = a.column(b).header();
      return c.format.header(d.innerHTML, b, d);
    }).toArray();
    var g = a.table().footer() ? a.columns(c.columns).indexes().map(function (b) {
      var d = a.column(b).footer();
      return c.format.footer(d ? d.innerHTML : "", b, d);
    }).toArray() : null,
        f = d.extend({}, c.modifier);
    a.select && "function" === typeof a.select.info && f.selected === p && a.rows(c.rows, d.extend({
      selected: !0
    }, f)).any() && d.extend(f, {
      selected: !0
    });
    f = a.rows(c.rows, f).indexes().toArray();
    var h = a.cells(f, c.columns);
    f = h.render(c.orthogonal).toArray();
    h = h.nodes().toArray();

    for (var k = b.length, m = [], l = 0, n = 0, q = 0 < k ? f.length / k : 0; n < q; n++) {
      for (var u = [k], t = 0; t < k; t++) {
        u[t] = c.format.body(f[l], n, t, h[l]), l++;
      }

      m[n] = u;
    }

    b = {
      header: b,
      footer: g,
      body: m
    };
    c.customizeData && c.customizeData(b);
    return b;
  };

  d.fn.dataTable.Buttons = n;
  d.fn.DataTable.Buttons = n;
  d(t).on("init.dt plugin-init.dt", function (a, b) {
    "dt" === a.namespace && (a = b.oInit.buttons || m.defaults.buttons) && !b._buttons && new n(b, a).container();
  });
  m.ext.feature.push({
    fnInit: y,
    cFeature: "B"
  });
  m.ext.features && m.ext.features.register("buttons", y);
  return n;
});

/***/ }),

/***/ "./external/datatables/js/dataTables.fixedHeader.min.js":
/*!**************************************************************!*\
  !*** ./external/datatables/js/dataTables.fixedHeader.min.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/*!
 FixedHeader 3.1.4
 ©2009-2018 SpryMedia Ltd - datatables.net/license
*/
(function (d) {
   true ? !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(/*! jquery */ "jquery"), __webpack_require__(/*! ./jquery.dataTables.min */ "./external/datatables/js/jquery.dataTables.min.js")], __WEBPACK_AMD_DEFINE_RESULT__ = (function (g) {
    return d(g, window, document);
  }).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : undefined;
})(function (d, g, i, k) {
  var j = d.fn.dataTable,
      l = 0,
      h = function h(a, b) {
    if (!(this instanceof h)) throw "FixedHeader must be initialised with the 'new' keyword.";
    !0 === b && (b = {});
    a = new j.Api(a);
    this.c = d.extend(!0, {}, h.defaults, b);
    this.s = {
      dt: a,
      position: {
        theadTop: 0,
        tbodyTop: 0,
        tfootTop: 0,
        tfootBottom: 0,
        width: 0,
        left: 0,
        tfootHeight: 0,
        theadHeight: 0,
        windowHeight: d(g).height(),
        visible: !0
      },
      headerMode: null,
      footerMode: null,
      autoWidth: a.settings()[0].oFeatures.bAutoWidth,
      namespace: ".dtfc" + l++,
      scrollLeft: {
        header: -1,
        footer: -1
      },
      enable: !0
    };
    this.dom = {
      floatingHeader: null,
      thead: d(a.table().header()),
      tbody: d(a.table().body()),
      tfoot: d(a.table().footer()),
      header: {
        host: null,
        floating: null,
        placeholder: null
      },
      footer: {
        host: null,
        floating: null,
        placeholder: null
      }
    };
    this.dom.header.host = this.dom.thead.parent();
    this.dom.footer.host = this.dom.tfoot.parent();
    var e = a.settings()[0];
    if (e._fixedHeader) throw "FixedHeader already initialised on table " + e.nTable.id;
    e._fixedHeader = this;

    this._constructor();
  };

  d.extend(h.prototype, {
    enable: function enable(a) {
      this.s.enable = a;
      this.c.header && this._modeChange("in-place", "header", !0);
      this.c.footer && this.dom.tfoot.length && this._modeChange("in-place", "footer", !0);
      this.update();
    },
    headerOffset: function headerOffset(a) {
      a !== k && (this.c.headerOffset = a, this.update());
      return this.c.headerOffset;
    },
    footerOffset: function footerOffset(a) {
      a !== k && (this.c.footerOffset = a, this.update());
      return this.c.footerOffset;
    },
    update: function update() {
      this._positions();

      this._scroll(!0);
    },
    _constructor: function _constructor() {
      var a = this,
          b = this.s.dt;
      d(g).on("scroll" + this.s.namespace, function () {
        a._scroll();
      }).on("resize" + this.s.namespace, j.util.throttle(function () {
        a.s.position.windowHeight = d(g).height();
        a.update();
      }, 50));
      var e = d(".fh-fixedHeader");
      !this.c.headerOffset && e.length && (this.c.headerOffset = e.outerHeight());
      e = d(".fh-fixedFooter");
      !this.c.footerOffset && e.length && (this.c.footerOffset = e.outerHeight());
      b.on("column-reorder.dt.dtfc column-visibility.dt.dtfc draw.dt.dtfc column-sizing.dt.dtfc responsive-display.dt.dtfc", function () {
        a.update();
      });
      b.on("destroy.dtfc", function () {
        a.c.header && a._modeChange("in-place", "header", true);
        a.c.footer && a.dom.tfoot.length && a._modeChange("in-place", "footer", true);
        b.off(".dtfc");
        d(g).off(a.s.namespace);
      });

      this._positions();

      this._scroll();
    },
    _clone: function _clone(a, b) {
      var e = this.s.dt,
          c = this.dom[a],
          f = "header" === a ? this.dom.thead : this.dom.tfoot;
      !b && c.floating ? c.floating.removeClass("fixedHeader-floating fixedHeader-locked") : (c.floating && (c.placeholder.remove(), this._unsize(a), c.floating.children().detach(), c.floating.remove()), c.floating = d(e.table().node().cloneNode(!1)).css("table-layout", "fixed").attr("aria-hidden", "true").removeAttr("id").append(f).appendTo("body"), c.placeholder = f.clone(!1), c.placeholder.find("*[id]").removeAttr("id"), c.host.prepend(c.placeholder), this._matchWidths(c.placeholder, c.floating));
    },
    _matchWidths: function _matchWidths(a, b) {
      var e = function e(b) {
        return d(b, a).map(function () {
          return d(this).width();
        }).toArray();
      },
          c = function c(a, _c) {
        d(a, b).each(function (a) {
          d(this).css({
            width: _c[a],
            minWidth: _c[a]
          });
        });
      },
          f = e("th"),
          e = e("td");

      c("th", f);
      c("td", e);
    },
    _unsize: function _unsize(a) {
      var b = this.dom[a].floating;
      b && ("footer" === a || "header" === a && !this.s.autoWidth) ? d("th, td", b).css({
        width: "",
        minWidth: ""
      }) : b && "header" === a && d("th, td", b).css("min-width", "");
    },
    _horizontal: function _horizontal(a, b) {
      var e = this.dom[a],
          c = this.s.position,
          d = this.s.scrollLeft;
      e.floating && d[a] !== b && (e.floating.css("left", c.left - b), d[a] = b);
    },
    _modeChange: function _modeChange(a, b, e) {
      var c = this.dom[b],
          f = this.s.position,
          g = this.dom["footer" === b ? "tfoot" : "thead"],
          h = d.contains(g[0], i.activeElement) ? i.activeElement : null;
      h && h.blur();

      if ("in-place" === a) {
        if (c.placeholder && (c.placeholder.remove(), c.placeholder = null), this._unsize(b), "header" === b ? c.host.prepend(g) : c.host.append(g), c.floating) c.floating.remove(), c.floating = null;
      } else "in" === a ? (this._clone(b, e), c.floating.addClass("fixedHeader-floating").css("header" === b ? "top" : "bottom", this.c[b + "Offset"]).css("left", f.left + "px").css("width", f.width + "px"), "footer" === b && c.floating.css("top", "")) : "below" === a ? (this._clone(b, e), c.floating.addClass("fixedHeader-locked").css("top", f.tfootTop - f.theadHeight).css("left", f.left + "px").css("width", f.width + "px")) : "above" === a && (this._clone(b, e), c.floating.addClass("fixedHeader-locked").css("top", f.tbodyTop).css("left", f.left + "px").css("width", f.width + "px"));

      h && h !== i.activeElement && setTimeout(function () {
        h.focus();
      }, 10);
      this.s.scrollLeft.header = -1;
      this.s.scrollLeft.footer = -1;
      this.s[b + "Mode"] = a;
    },
    _positions: function _positions() {
      var a = this.s.dt.table(),
          b = this.s.position,
          e = this.dom,
          a = d(a.node()),
          c = a.children("thead"),
          f = a.children("tfoot"),
          e = e.tbody;
      b.visible = a.is(":visible");
      b.width = a.outerWidth();
      b.left = a.offset().left;
      b.theadTop = c.offset().top;
      b.tbodyTop = e.offset().top;
      b.theadHeight = b.tbodyTop - b.theadTop;
      f.length ? (b.tfootTop = f.offset().top, b.tfootBottom = b.tfootTop + f.outerHeight(), b.tfootHeight = b.tfootBottom - b.tfootTop) : (b.tfootTop = b.tbodyTop + e.outerHeight(), b.tfootBottom = b.tfootTop, b.tfootHeight = b.tfootTop);
    },
    _scroll: function _scroll(a) {
      var b = d(i).scrollTop(),
          e = d(i).scrollLeft(),
          c = this.s.position,
          f;
      if (this.s.enable && (this.c.header && (f = !c.visible || b <= c.theadTop - this.c.headerOffset ? "in-place" : b <= c.tfootTop - c.theadHeight - this.c.headerOffset ? "in" : "below", (a || f !== this.s.headerMode) && this._modeChange(f, "header", a), this._horizontal("header", e)), this.c.footer && this.dom.tfoot.length)) b = !c.visible || b + c.windowHeight >= c.tfootBottom + this.c.footerOffset ? "in-place" : c.windowHeight + b > c.tbodyTop + c.tfootHeight + this.c.footerOffset ? "in" : "above", (a || b !== this.s.footerMode) && this._modeChange(b, "footer", a), this._horizontal("footer", e);
    }
  });
  h.version = "3.1.4";
  h.defaults = {
    header: !0,
    footer: !1,
    headerOffset: 0,
    footerOffset: 0
  };
  d.fn.dataTable.FixedHeader = h;
  d.fn.DataTable.FixedHeader = h;
  d(i).on("init.dt.dtfh", function (a, b) {
    if ("dt" === a.namespace) {
      var e = b.oInit.fixedHeader,
          c = j.defaults.fixedHeader;
      if ((e || c) && !b._fixedHeader) c = d.extend({}, c, e), !1 !== e && new h(b, c);
    }
  });
  j.Api.register("fixedHeader()", function () {});
  j.Api.register("fixedHeader.adjust()", function () {
    return this.iterator("table", function (a) {
      (a = a._fixedHeader) && a.update();
    });
  });
  j.Api.register("fixedHeader.enable()", function (a) {
    return this.iterator("table", function (b) {
      b = b._fixedHeader;
      a = a !== k ? a : !0;
      b && a !== b.s.enable && b.enable(a);
    });
  });
  j.Api.register("fixedHeader.disable()", function () {
    return this.iterator("table", function (a) {
      (a = a._fixedHeader) && a.s.enable && a.enable(!1);
    });
  });
  d.each(["header", "footer"], function (a, b) {
    j.Api.register("fixedHeader." + b + "Offset()", function (a) {
      var c = this.context;
      return a === k ? c.length && c[0]._fixedHeader ? c[0]._fixedHeader[b + "Offset"]() : k : this.iterator("table", function (c) {
        if (c = c._fixedHeader) c[b + "Offset"](a);
      });
    });
  });
  return h;
});

/***/ }),

/***/ "./external/datatables/js/jquery.dataTables.min.js":
/*!*********************************************************!*\
  !*** ./external/datatables/js/jquery.dataTables.min.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/*!
 DataTables 1.10.19
 ©2008-2018 SpryMedia Ltd - datatables.net/license
*/
(function (h) {
   true ? !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(/*! jquery */ "jquery")], __WEBPACK_AMD_DEFINE_RESULT__ = (function (E) {
    return h(E, window, document);
  }).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : undefined;
})(function (h, E, H, k) {
  function Z(a) {
    var b,
        c,
        d = {};
    h.each(a, function (e) {
      if ((b = e.match(/^([^A-Z]+?)([A-Z])/)) && -1 !== "a aa ai ao as b fn i m o s ".indexOf(b[1] + " ")) c = e.replace(b[0], b[2].toLowerCase()), d[c] = e, "o" === b[1] && Z(a[e]);
    });
    a._hungarianMap = d;
  }

  function J(a, b, c) {
    a._hungarianMap || Z(a);
    var d;
    h.each(b, function (e) {
      d = a._hungarianMap[e];
      if (d !== k && (c || b[d] === k)) "o" === d.charAt(0) ? (b[d] || (b[d] = {}), h.extend(!0, b[d], b[e]), J(a[d], b[d], c)) : b[d] = b[e];
    });
  }

  function Ca(a) {
    var b = n.defaults.oLanguage,
        c = b.sDecimal;
    c && Da(c);

    if (a) {
      var d = a.sZeroRecords;
      !a.sEmptyTable && d && "No data available in table" === b.sEmptyTable && F(a, a, "sZeroRecords", "sEmptyTable");
      !a.sLoadingRecords && d && "Loading..." === b.sLoadingRecords && F(a, a, "sZeroRecords", "sLoadingRecords");
      a.sInfoThousands && (a.sThousands = a.sInfoThousands);
      (a = a.sDecimal) && c !== a && Da(a);
    }
  }

  function fb(a) {
    A(a, "ordering", "bSort");
    A(a, "orderMulti", "bSortMulti");
    A(a, "orderClasses", "bSortClasses");
    A(a, "orderCellsTop", "bSortCellsTop");
    A(a, "order", "aaSorting");
    A(a, "orderFixed", "aaSortingFixed");
    A(a, "paging", "bPaginate");
    A(a, "pagingType", "sPaginationType");
    A(a, "pageLength", "iDisplayLength");
    A(a, "searching", "bFilter");
    "boolean" === typeof a.sScrollX && (a.sScrollX = a.sScrollX ? "100%" : "");
    "boolean" === typeof a.scrollX && (a.scrollX = a.scrollX ? "100%" : "");
    if (a = a.aoSearchCols) for (var b = 0, c = a.length; b < c; b++) {
      a[b] && J(n.models.oSearch, a[b]);
    }
  }

  function gb(a) {
    A(a, "orderable", "bSortable");
    A(a, "orderData", "aDataSort");
    A(a, "orderSequence", "asSorting");
    A(a, "orderDataType", "sortDataType");
    var b = a.aDataSort;
    "number" === typeof b && !h.isArray(b) && (a.aDataSort = [b]);
  }

  function hb(a) {
    if (!n.__browser) {
      var b = {};
      n.__browser = b;
      var c = h("<div/>").css({
        position: "fixed",
        top: 0,
        left: -1 * h(E).scrollLeft(),
        height: 1,
        width: 1,
        overflow: "hidden"
      }).append(h("<div/>").css({
        position: "absolute",
        top: 1,
        left: 1,
        width: 100,
        overflow: "scroll"
      }).append(h("<div/>").css({
        width: "100%",
        height: 10
      }))).appendTo("body"),
          d = c.children(),
          e = d.children();
      b.barWidth = d[0].offsetWidth - d[0].clientWidth;
      b.bScrollOversize = 100 === e[0].offsetWidth && 100 !== d[0].clientWidth;
      b.bScrollbarLeft = 1 !== Math.round(e.offset().left);
      b.bBounding = c[0].getBoundingClientRect().width ? !0 : !1;
      c.remove();
    }

    h.extend(a.oBrowser, n.__browser);
    a.oScroll.iBarWidth = n.__browser.barWidth;
  }

  function ib(a, b, c, d, e, f) {
    var g,
        j = !1;
    c !== k && (g = c, j = !0);

    for (; d !== e;) {
      a.hasOwnProperty(d) && (g = j ? b(g, a[d], d, a) : a[d], j = !0, d += f);
    }

    return g;
  }

  function Ea(a, b) {
    var c = n.defaults.column,
        d = a.aoColumns.length,
        c = h.extend({}, n.models.oColumn, c, {
      nTh: b ? b : H.createElement("th"),
      sTitle: c.sTitle ? c.sTitle : b ? b.innerHTML : "",
      aDataSort: c.aDataSort ? c.aDataSort : [d],
      mData: c.mData ? c.mData : d,
      idx: d
    });
    a.aoColumns.push(c);
    c = a.aoPreSearchCols;
    c[d] = h.extend({}, n.models.oSearch, c[d]);
    ka(a, d, h(b).data());
  }

  function ka(a, b, c) {
    var b = a.aoColumns[b],
        d = a.oClasses,
        e = h(b.nTh);

    if (!b.sWidthOrig) {
      b.sWidthOrig = e.attr("width") || null;
      var f = (e.attr("style") || "").match(/width:\s*(\d+[pxem%]+)/);
      f && (b.sWidthOrig = f[1]);
    }

    c !== k && null !== c && (gb(c), J(n.defaults.column, c), c.mDataProp !== k && !c.mData && (c.mData = c.mDataProp), c.sType && (b._sManualType = c.sType), c.className && !c.sClass && (c.sClass = c.className), c.sClass && e.addClass(c.sClass), h.extend(b, c), F(b, c, "sWidth", "sWidthOrig"), c.iDataSort !== k && (b.aDataSort = [c.iDataSort]), F(b, c, "aDataSort"));

    var g = b.mData,
        j = S(g),
        i = b.mRender ? S(b.mRender) : null,
        c = function c(a) {
      return "string" === typeof a && -1 !== a.indexOf("@");
    };

    b._bAttrSrc = h.isPlainObject(g) && (c(g.sort) || c(g.type) || c(g.filter));
    b._setter = null;

    b.fnGetData = function (a, b, c) {
      var d = j(a, b, k, c);
      return i && b ? i(d, b, a, c) : d;
    };

    b.fnSetData = function (a, b, c) {
      return N(g)(a, b, c);
    };

    "number" !== typeof g && (a._rowReadObject = !0);
    a.oFeatures.bSort || (b.bSortable = !1, e.addClass(d.sSortableNone));
    a = -1 !== h.inArray("asc", b.asSorting);
    c = -1 !== h.inArray("desc", b.asSorting);
    !b.bSortable || !a && !c ? (b.sSortingClass = d.sSortableNone, b.sSortingClassJUI = "") : a && !c ? (b.sSortingClass = d.sSortableAsc, b.sSortingClassJUI = d.sSortJUIAscAllowed) : !a && c ? (b.sSortingClass = d.sSortableDesc, b.sSortingClassJUI = d.sSortJUIDescAllowed) : (b.sSortingClass = d.sSortable, b.sSortingClassJUI = d.sSortJUI);
  }

  function $(a) {
    if (!1 !== a.oFeatures.bAutoWidth) {
      var b = a.aoColumns;
      Fa(a);

      for (var c = 0, d = b.length; c < d; c++) {
        b[c].nTh.style.width = b[c].sWidth;
      }
    }

    b = a.oScroll;
    ("" !== b.sY || "" !== b.sX) && la(a);
    r(a, null, "column-sizing", [a]);
  }

  function aa(a, b) {
    var c = ma(a, "bVisible");
    return "number" === typeof c[b] ? c[b] : null;
  }

  function ba(a, b) {
    var c = ma(a, "bVisible"),
        c = h.inArray(b, c);
    return -1 !== c ? c : null;
  }

  function V(a) {
    var b = 0;
    h.each(a.aoColumns, function (a, d) {
      d.bVisible && "none" !== h(d.nTh).css("display") && b++;
    });
    return b;
  }

  function ma(a, b) {
    var c = [];
    h.map(a.aoColumns, function (a, e) {
      a[b] && c.push(e);
    });
    return c;
  }

  function Ga(a) {
    var b = a.aoColumns,
        c = a.aoData,
        d = n.ext.type.detect,
        e,
        f,
        g,
        j,
        i,
        h,
        l,
        q,
        t;
    e = 0;

    for (f = b.length; e < f; e++) {
      if (l = b[e], t = [], !l.sType && l._sManualType) l.sType = l._sManualType;else if (!l.sType) {
        g = 0;

        for (j = d.length; g < j; g++) {
          i = 0;

          for (h = c.length; i < h; i++) {
            t[i] === k && (t[i] = B(a, i, e, "type"));
            q = d[g](t[i], a);
            if (!q && g !== d.length - 1) break;
            if ("html" === q) break;
          }

          if (q) {
            l.sType = q;
            break;
          }
        }

        l.sType || (l.sType = "string");
      }
    }
  }

  function jb(a, b, c, d) {
    var e,
        f,
        g,
        j,
        i,
        m,
        l = a.aoColumns;
    if (b) for (e = b.length - 1; 0 <= e; e--) {
      m = b[e];
      var q = m.targets !== k ? m.targets : m.aTargets;
      h.isArray(q) || (q = [q]);
      f = 0;

      for (g = q.length; f < g; f++) {
        if ("number" === typeof q[f] && 0 <= q[f]) {
          for (; l.length <= q[f];) {
            Ea(a);
          }

          d(q[f], m);
        } else if ("number" === typeof q[f] && 0 > q[f]) d(l.length + q[f], m);else if ("string" === typeof q[f]) {
          j = 0;

          for (i = l.length; j < i; j++) {
            ("_all" == q[f] || h(l[j].nTh).hasClass(q[f])) && d(j, m);
          }
        }
      }
    }

    if (c) {
      e = 0;

      for (a = c.length; e < a; e++) {
        d(e, c[e]);
      }
    }
  }

  function O(a, b, c, d) {
    var e = a.aoData.length,
        f = h.extend(!0, {}, n.models.oRow, {
      src: c ? "dom" : "data",
      idx: e
    });
    f._aData = b;
    a.aoData.push(f);

    for (var g = a.aoColumns, j = 0, i = g.length; j < i; j++) {
      g[j].sType = null;
    }

    a.aiDisplayMaster.push(e);
    b = a.rowIdFn(b);
    b !== k && (a.aIds[b] = f);
    (c || !a.oFeatures.bDeferRender) && Ha(a, e, c, d);
    return e;
  }

  function na(a, b) {
    var c;
    b instanceof h || (b = h(b));
    return b.map(function (b, e) {
      c = Ia(a, e);
      return O(a, c.data, e, c.cells);
    });
  }

  function B(a, b, c, d) {
    var e = a.iDraw,
        f = a.aoColumns[c],
        g = a.aoData[b]._aData,
        j = f.sDefaultContent,
        i = f.fnGetData(g, d, {
      settings: a,
      row: b,
      col: c
    });
    if (i === k) return a.iDrawError != e && null === j && (K(a, 0, "Requested unknown parameter " + ("function" == typeof f.mData ? "{function}" : "'" + f.mData + "'") + " for row " + b + ", column " + c, 4), a.iDrawError = e), j;
    if ((i === g || null === i) && null !== j && d !== k) i = j;else if ("function" === typeof i) return i.call(g);
    return null === i && "display" == d ? "" : i;
  }

  function kb(a, b, c, d) {
    a.aoColumns[c].fnSetData(a.aoData[b]._aData, d, {
      settings: a,
      row: b,
      col: c
    });
  }

  function Ja(a) {
    return h.map(a.match(/(\\.|[^\.])+/g) || [""], function (a) {
      return a.replace(/\\\./g, ".");
    });
  }

  function S(a) {
    if (h.isPlainObject(a)) {
      var b = {};
      h.each(a, function (a, c) {
        c && (b[a] = S(c));
      });
      return function (a, c, f, g) {
        var j = b[c] || b._;
        return j !== k ? j(a, c, f, g) : a;
      };
    }

    if (null === a) return function (a) {
      return a;
    };
    if ("function" === typeof a) return function (b, c, f, g) {
      return a(b, c, f, g);
    };

    if ("string" === typeof a && (-1 !== a.indexOf(".") || -1 !== a.indexOf("[") || -1 !== a.indexOf("("))) {
      var c = function c(a, b, f) {
        var g, j;

        if ("" !== f) {
          j = Ja(f);

          for (var i = 0, m = j.length; i < m; i++) {
            f = j[i].match(ca);
            g = j[i].match(W);

            if (f) {
              j[i] = j[i].replace(ca, "");
              "" !== j[i] && (a = a[j[i]]);
              g = [];
              j.splice(0, i + 1);
              j = j.join(".");

              if (h.isArray(a)) {
                i = 0;

                for (m = a.length; i < m; i++) {
                  g.push(c(a[i], b, j));
                }
              }

              a = f[0].substring(1, f[0].length - 1);
              a = "" === a ? g : g.join(a);
              break;
            } else if (g) {
              j[i] = j[i].replace(W, "");
              a = a[j[i]]();
              continue;
            }

            if (null === a || a[j[i]] === k) return k;
            a = a[j[i]];
          }
        }

        return a;
      };

      return function (b, e) {
        return c(b, e, a);
      };
    }

    return function (b) {
      return b[a];
    };
  }

  function N(a) {
    if (h.isPlainObject(a)) return N(a._);
    if (null === a) return function () {};
    if ("function" === typeof a) return function (b, d, e) {
      a(b, "set", d, e);
    };

    if ("string" === typeof a && (-1 !== a.indexOf(".") || -1 !== a.indexOf("[") || -1 !== a.indexOf("("))) {
      var b = function b(a, d, e) {
        var e = Ja(e),
            f;
        f = e[e.length - 1];

        for (var g, j, i = 0, m = e.length - 1; i < m; i++) {
          g = e[i].match(ca);
          j = e[i].match(W);

          if (g) {
            e[i] = e[i].replace(ca, "");
            a[e[i]] = [];
            f = e.slice();
            f.splice(0, i + 1);
            g = f.join(".");

            if (h.isArray(d)) {
              j = 0;

              for (m = d.length; j < m; j++) {
                f = {}, b(f, d[j], g), a[e[i]].push(f);
              }
            } else a[e[i]] = d;

            return;
          }

          j && (e[i] = e[i].replace(W, ""), a = a[e[i]](d));
          if (null === a[e[i]] || a[e[i]] === k) a[e[i]] = {};
          a = a[e[i]];
        }

        if (f.match(W)) a[f.replace(W, "")](d);else a[f.replace(ca, "")] = d;
      };

      return function (c, d) {
        return b(c, d, a);
      };
    }

    return function (b, d) {
      b[a] = d;
    };
  }

  function Ka(a) {
    return D(a.aoData, "_aData");
  }

  function oa(a) {
    a.aoData.length = 0;
    a.aiDisplayMaster.length = 0;
    a.aiDisplay.length = 0;
    a.aIds = {};
  }

  function pa(a, b, c) {
    for (var d = -1, e = 0, f = a.length; e < f; e++) {
      a[e] == b ? d = e : a[e] > b && a[e]--;
    }

    -1 != d && c === k && a.splice(d, 1);
  }

  function da(a, b, c, d) {
    var e = a.aoData[b],
        f,
        g = function g(c, d) {
      for (; c.childNodes.length;) {
        c.removeChild(c.firstChild);
      }

      c.innerHTML = B(a, b, d, "display");
    };

    if ("dom" === c || (!c || "auto" === c) && "dom" === e.src) e._aData = Ia(a, e, d, d === k ? k : e._aData).data;else {
      var j = e.anCells;
      if (j) if (d !== k) g(j[d], d);else {
        c = 0;

        for (f = j.length; c < f; c++) {
          g(j[c], c);
        }
      }
    }
    e._aSortData = null;
    e._aFilterData = null;
    g = a.aoColumns;
    if (d !== k) g[d].sType = null;else {
      c = 0;

      for (f = g.length; c < f; c++) {
        g[c].sType = null;
      }

      La(a, e);
    }
  }

  function Ia(a, b, c, d) {
    var e = [],
        f = b.firstChild,
        g,
        j,
        i = 0,
        m,
        l = a.aoColumns,
        q = a._rowReadObject,
        d = d !== k ? d : q ? {} : [],
        t = function t(a, b) {
      if ("string" === typeof a) {
        var c = a.indexOf("@");
        -1 !== c && (c = a.substring(c + 1), N(a)(d, b.getAttribute(c)));
      }
    },
        G = function G(a) {
      if (c === k || c === i) j = l[i], m = h.trim(a.innerHTML), j && j._bAttrSrc ? (N(j.mData._)(d, m), t(j.mData.sort, a), t(j.mData.type, a), t(j.mData.filter, a)) : q ? (j._setter || (j._setter = N(j.mData)), j._setter(d, m)) : d[i] = m;
      i++;
    };

    if (f) for (; f;) {
      g = f.nodeName.toUpperCase();
      if ("TD" == g || "TH" == g) G(f), e.push(f);
      f = f.nextSibling;
    } else {
      e = b.anCells;
      f = 0;

      for (g = e.length; f < g; f++) {
        G(e[f]);
      }
    }
    if (b = b.firstChild ? b : b.nTr) (b = b.getAttribute("id")) && N(a.rowId)(d, b);
    return {
      data: d,
      cells: e
    };
  }

  function Ha(a, b, c, d) {
    var e = a.aoData[b],
        f = e._aData,
        g = [],
        j,
        i,
        m,
        l,
        q;

    if (null === e.nTr) {
      j = c || H.createElement("tr");
      e.nTr = j;
      e.anCells = g;
      j._DT_RowIndex = b;
      La(a, e);
      l = 0;

      for (q = a.aoColumns.length; l < q; l++) {
        m = a.aoColumns[l];
        i = c ? d[l] : H.createElement(m.sCellType);
        i._DT_CellIndex = {
          row: b,
          column: l
        };
        g.push(i);
        if ((!c || m.mRender || m.mData !== l) && (!h.isPlainObject(m.mData) || m.mData._ !== l + ".display")) i.innerHTML = B(a, b, l, "display");
        m.sClass && (i.className += " " + m.sClass);
        m.bVisible && !c ? j.appendChild(i) : !m.bVisible && c && i.parentNode.removeChild(i);
        m.fnCreatedCell && m.fnCreatedCell.call(a.oInstance, i, B(a, b, l), f, b, l);
      }

      r(a, "aoRowCreatedCallback", null, [j, f, b, g]);
    }

    e.nTr.setAttribute("role", "row");
  }

  function La(a, b) {
    var c = b.nTr,
        d = b._aData;

    if (c) {
      var e = a.rowIdFn(d);
      e && (c.id = e);
      d.DT_RowClass && (e = d.DT_RowClass.split(" "), b.__rowc = b.__rowc ? qa(b.__rowc.concat(e)) : e, h(c).removeClass(b.__rowc.join(" ")).addClass(d.DT_RowClass));
      d.DT_RowAttr && h(c).attr(d.DT_RowAttr);
      d.DT_RowData && h(c).data(d.DT_RowData);
    }
  }

  function lb(a) {
    var b,
        c,
        d,
        e,
        f,
        g = a.nTHead,
        j = a.nTFoot,
        i = 0 === h("th, td", g).length,
        m = a.oClasses,
        l = a.aoColumns;
    i && (e = h("<tr/>").appendTo(g));
    b = 0;

    for (c = l.length; b < c; b++) {
      f = l[b], d = h(f.nTh).addClass(f.sClass), i && d.appendTo(e), a.oFeatures.bSort && (d.addClass(f.sSortingClass), !1 !== f.bSortable && (d.attr("tabindex", a.iTabIndex).attr("aria-controls", a.sTableId), Ma(a, f.nTh, b))), f.sTitle != d[0].innerHTML && d.html(f.sTitle), Na(a, "header")(a, d, f, m);
    }

    i && ea(a.aoHeader, g);
    h(g).find(">tr").attr("role", "row");
    h(g).find(">tr>th, >tr>td").addClass(m.sHeaderTH);
    h(j).find(">tr>th, >tr>td").addClass(m.sFooterTH);

    if (null !== j) {
      a = a.aoFooter[0];
      b = 0;

      for (c = a.length; b < c; b++) {
        f = l[b], f.nTf = a[b].cell, f.sClass && h(f.nTf).addClass(f.sClass);
      }
    }
  }

  function fa(a, b, c) {
    var d,
        e,
        f,
        g = [],
        j = [],
        i = a.aoColumns.length,
        m;

    if (b) {
      c === k && (c = !1);
      d = 0;

      for (e = b.length; d < e; d++) {
        g[d] = b[d].slice();
        g[d].nTr = b[d].nTr;

        for (f = i - 1; 0 <= f; f--) {
          !a.aoColumns[f].bVisible && !c && g[d].splice(f, 1);
        }

        j.push([]);
      }

      d = 0;

      for (e = g.length; d < e; d++) {
        if (a = g[d].nTr) for (; f = a.firstChild;) {
          a.removeChild(f);
        }
        f = 0;

        for (b = g[d].length; f < b; f++) {
          if (m = i = 1, j[d][f] === k) {
            a.appendChild(g[d][f].cell);

            for (j[d][f] = 1; g[d + i] !== k && g[d][f].cell == g[d + i][f].cell;) {
              j[d + i][f] = 1, i++;
            }

            for (; g[d][f + m] !== k && g[d][f].cell == g[d][f + m].cell;) {
              for (c = 0; c < i; c++) {
                j[d + c][f + m] = 1;
              }

              m++;
            }

            h(g[d][f].cell).attr("rowspan", i).attr("colspan", m);
          }
        }
      }
    }
  }

  function P(a) {
    var b = r(a, "aoPreDrawCallback", "preDraw", [a]);
    if (-1 !== h.inArray(!1, b)) C(a, !1);else {
      var b = [],
          c = 0,
          d = a.asStripeClasses,
          e = d.length,
          f = a.oLanguage,
          g = a.iInitDisplayStart,
          j = "ssp" == y(a),
          i = a.aiDisplay;
      a.bDrawing = !0;
      g !== k && -1 !== g && (a._iDisplayStart = j ? g : g >= a.fnRecordsDisplay() ? 0 : g, a.iInitDisplayStart = -1);
      var g = a._iDisplayStart,
          m = a.fnDisplayEnd();
      if (a.bDeferLoading) a.bDeferLoading = !1, a.iDraw++, C(a, !1);else if (j) {
        if (!a.bDestroying && !mb(a)) return;
      } else a.iDraw++;

      if (0 !== i.length) {
        f = j ? a.aoData.length : m;

        for (j = j ? 0 : g; j < f; j++) {
          var l = i[j],
              q = a.aoData[l];
          null === q.nTr && Ha(a, l);
          var t = q.nTr;

          if (0 !== e) {
            var G = d[c % e];
            q._sRowStripe != G && (h(t).removeClass(q._sRowStripe).addClass(G), q._sRowStripe = G);
          }

          r(a, "aoRowCallback", null, [t, q._aData, c, j, l]);
          b.push(t);
          c++;
        }
      } else c = f.sZeroRecords, 1 == a.iDraw && "ajax" == y(a) ? c = f.sLoadingRecords : f.sEmptyTable && 0 === a.fnRecordsTotal() && (c = f.sEmptyTable), b[0] = h("<tr/>", {
        "class": e ? d[0] : ""
      }).append(h("<td />", {
        valign: "top",
        colSpan: V(a),
        "class": a.oClasses.sRowEmpty
      }).html(c))[0];

      r(a, "aoHeaderCallback", "header", [h(a.nTHead).children("tr")[0], Ka(a), g, m, i]);
      r(a, "aoFooterCallback", "footer", [h(a.nTFoot).children("tr")[0], Ka(a), g, m, i]);
      d = h(a.nTBody);
      d.children().detach();
      d.append(h(b));
      r(a, "aoDrawCallback", "draw", [a]);
      a.bSorted = !1;
      a.bFiltered = !1;
      a.bDrawing = !1;
    }
  }

  function T(a, b) {
    var c = a.oFeatures,
        d = c.bFilter;
    c.bSort && nb(a);
    d ? ga(a, a.oPreviousSearch) : a.aiDisplay = a.aiDisplayMaster.slice();
    !0 !== b && (a._iDisplayStart = 0);
    a._drawHold = b;
    P(a);
    a._drawHold = !1;
  }

  function ob(a) {
    var b = a.oClasses,
        c = h(a.nTable),
        c = h("<div/>").insertBefore(c),
        d = a.oFeatures,
        e = h("<div/>", {
      id: a.sTableId + "_wrapper",
      "class": b.sWrapper + (a.nTFoot ? "" : " " + b.sNoFooter)
    });
    a.nHolding = c[0];
    a.nTableWrapper = e[0];
    a.nTableReinsertBefore = a.nTable.nextSibling;

    for (var f = a.sDom.split(""), g, j, i, m, l, q, k = 0; k < f.length; k++) {
      g = null;
      j = f[k];

      if ("<" == j) {
        i = h("<div/>")[0];
        m = f[k + 1];

        if ("'" == m || '"' == m) {
          l = "";

          for (q = 2; f[k + q] != m;) {
            l += f[k + q], q++;
          }

          "H" == l ? l = b.sJUIHeader : "F" == l && (l = b.sJUIFooter);
          -1 != l.indexOf(".") ? (m = l.split("."), i.id = m[0].substr(1, m[0].length - 1), i.className = m[1]) : "#" == l.charAt(0) ? i.id = l.substr(1, l.length - 1) : i.className = l;
          k += q;
        }

        e.append(i);
        e = h(i);
      } else if (">" == j) e = e.parent();else if ("l" == j && d.bPaginate && d.bLengthChange) g = pb(a);else if ("f" == j && d.bFilter) g = qb(a);else if ("r" == j && d.bProcessing) g = rb(a);else if ("t" == j) g = sb(a);else if ("i" == j && d.bInfo) g = tb(a);else if ("p" == j && d.bPaginate) g = ub(a);else if (0 !== n.ext.feature.length) {
        i = n.ext.feature;
        q = 0;

        for (m = i.length; q < m; q++) {
          if (j == i[q].cFeature) {
            g = i[q].fnInit(a);
            break;
          }
        }
      }

      g && (i = a.aanFeatures, i[j] || (i[j] = []), i[j].push(g), e.append(g));
    }

    c.replaceWith(e);
    a.nHolding = null;
  }

  function ea(a, b) {
    var c = h(b).children("tr"),
        d,
        e,
        f,
        g,
        j,
        i,
        m,
        l,
        q,
        k;
    a.splice(0, a.length);
    f = 0;

    for (i = c.length; f < i; f++) {
      a.push([]);
    }

    f = 0;

    for (i = c.length; f < i; f++) {
      d = c[f];

      for (e = d.firstChild; e;) {
        if ("TD" == e.nodeName.toUpperCase() || "TH" == e.nodeName.toUpperCase()) {
          l = 1 * e.getAttribute("colspan");
          q = 1 * e.getAttribute("rowspan");
          l = !l || 0 === l || 1 === l ? 1 : l;
          q = !q || 0 === q || 1 === q ? 1 : q;
          g = 0;

          for (j = a[f]; j[g];) {
            g++;
          }

          m = g;
          k = 1 === l ? !0 : !1;

          for (j = 0; j < l; j++) {
            for (g = 0; g < q; g++) {
              a[f + g][m + j] = {
                cell: e,
                unique: k
              }, a[f + g].nTr = d;
            }
          }
        }

        e = e.nextSibling;
      }
    }
  }

  function ra(a, b, c) {
    var d = [];
    c || (c = a.aoHeader, b && (c = [], ea(c, b)));

    for (var b = 0, e = c.length; b < e; b++) {
      for (var f = 0, g = c[b].length; f < g; f++) {
        if (c[b][f].unique && (!d[f] || !a.bSortCellsTop)) d[f] = c[b][f].cell;
      }
    }

    return d;
  }

  function sa(a, b, c) {
    r(a, "aoServerParams", "serverParams", [b]);

    if (b && h.isArray(b)) {
      var d = {},
          e = /(.*?)\[\]$/;
      h.each(b, function (a, b) {
        var c = b.name.match(e);
        c ? (c = c[0], d[c] || (d[c] = []), d[c].push(b.value)) : d[b.name] = b.value;
      });
      b = d;
    }

    var f,
        g = a.ajax,
        j = a.oInstance,
        i = function i(b) {
      r(a, null, "xhr", [a, b, a.jqXHR]);
      c(b);
    };

    if (h.isPlainObject(g) && g.data) {
      f = g.data;
      var m = "function" === typeof f ? f(b, a) : f,
          b = "function" === typeof f && m ? m : h.extend(!0, b, m);
      delete g.data;
    }

    m = {
      data: b,
      success: function success(b) {
        var c = b.error || b.sError;
        c && K(a, 0, c);
        a.json = b;
        i(b);
      },
      dataType: "json",
      cache: !1,
      type: a.sServerMethod,
      error: function error(b, c) {
        var d = r(a, null, "xhr", [a, null, a.jqXHR]);
        -1 === h.inArray(!0, d) && ("parsererror" == c ? K(a, 0, "Invalid JSON response", 1) : 4 === b.readyState && K(a, 0, "Ajax error", 7));
        C(a, !1);
      }
    };
    a.oAjaxData = b;
    r(a, null, "preXhr", [a, b]);
    a.fnServerData ? a.fnServerData.call(j, a.sAjaxSource, h.map(b, function (a, b) {
      return {
        name: b,
        value: a
      };
    }), i, a) : a.sAjaxSource || "string" === typeof g ? a.jqXHR = h.ajax(h.extend(m, {
      url: g || a.sAjaxSource
    })) : "function" === typeof g ? a.jqXHR = g.call(j, b, i, a) : (a.jqXHR = h.ajax(h.extend(m, g)), g.data = f);
  }

  function mb(a) {
    return a.bAjaxDataGet ? (a.iDraw++, C(a, !0), sa(a, vb(a), function (b) {
      wb(a, b);
    }), !1) : !0;
  }

  function vb(a) {
    var b = a.aoColumns,
        c = b.length,
        d = a.oFeatures,
        e = a.oPreviousSearch,
        f = a.aoPreSearchCols,
        g,
        j = [],
        i,
        m,
        l,
        k = X(a);
    g = a._iDisplayStart;
    i = !1 !== d.bPaginate ? a._iDisplayLength : -1;

    var t = function t(a, b) {
      j.push({
        name: a,
        value: b
      });
    };

    t("sEcho", a.iDraw);
    t("iColumns", c);
    t("sColumns", D(b, "sName").join(","));
    t("iDisplayStart", g);
    t("iDisplayLength", i);
    var G = {
      draw: a.iDraw,
      columns: [],
      order: [],
      start: g,
      length: i,
      search: {
        value: e.sSearch,
        regex: e.bRegex
      }
    };

    for (g = 0; g < c; g++) {
      m = b[g], l = f[g], i = "function" == typeof m.mData ? "function" : m.mData, G.columns.push({
        data: i,
        name: m.sName,
        searchable: m.bSearchable,
        orderable: m.bSortable,
        search: {
          value: l.sSearch,
          regex: l.bRegex
        }
      }), t("mDataProp_" + g, i), d.bFilter && (t("sSearch_" + g, l.sSearch), t("bRegex_" + g, l.bRegex), t("bSearchable_" + g, m.bSearchable)), d.bSort && t("bSortable_" + g, m.bSortable);
    }

    d.bFilter && (t("sSearch", e.sSearch), t("bRegex", e.bRegex));
    d.bSort && (h.each(k, function (a, b) {
      G.order.push({
        column: b.col,
        dir: b.dir
      });
      t("iSortCol_" + a, b.col);
      t("sSortDir_" + a, b.dir);
    }), t("iSortingCols", k.length));
    b = n.ext.legacy.ajax;
    return null === b ? a.sAjaxSource ? j : G : b ? j : G;
  }

  function wb(a, b) {
    var c = ta(a, b),
        d = b.sEcho !== k ? b.sEcho : b.draw,
        e = b.iTotalRecords !== k ? b.iTotalRecords : b.recordsTotal,
        f = b.iTotalDisplayRecords !== k ? b.iTotalDisplayRecords : b.recordsFiltered;

    if (d) {
      if (1 * d < a.iDraw) return;
      a.iDraw = 1 * d;
    }

    oa(a);
    a._iRecordsTotal = parseInt(e, 10);
    a._iRecordsDisplay = parseInt(f, 10);
    d = 0;

    for (e = c.length; d < e; d++) {
      O(a, c[d]);
    }

    a.aiDisplay = a.aiDisplayMaster.slice();
    a.bAjaxDataGet = !1;
    P(a);
    a._bInitComplete || ua(a, b);
    a.bAjaxDataGet = !0;
    C(a, !1);
  }

  function ta(a, b) {
    var c = h.isPlainObject(a.ajax) && a.ajax.dataSrc !== k ? a.ajax.dataSrc : a.sAjaxDataProp;
    return "data" === c ? b.aaData || b[c] : "" !== c ? S(c)(b) : b;
  }

  function qb(a) {
    var b = a.oClasses,
        c = a.sTableId,
        d = a.oLanguage,
        e = a.oPreviousSearch,
        f = a.aanFeatures,
        g = '<input type="search" class="' + b.sFilterInput + '"/>',
        j = d.sSearch,
        j = j.match(/_INPUT_/) ? j.replace("_INPUT_", g) : j + g,
        b = h("<div/>", {
      id: !f.f ? c + "_filter" : null,
      "class": b.sFilter
    }).append(h("<label/>").append(j)),
        f = function f() {
      var b = !this.value ? "" : this.value;
      b != e.sSearch && (ga(a, {
        sSearch: b,
        bRegex: e.bRegex,
        bSmart: e.bSmart,
        bCaseInsensitive: e.bCaseInsensitive
      }), a._iDisplayStart = 0, P(a));
    },
        g = null !== a.searchDelay ? a.searchDelay : "ssp" === y(a) ? 400 : 0,
        i = h("input", b).val(e.sSearch).attr("placeholder", d.sSearchPlaceholder).on("keyup.DT search.DT input.DT paste.DT cut.DT", g ? Oa(f, g) : f).on("keypress.DT", function (a) {
      if (13 == a.keyCode) return !1;
    }).attr("aria-controls", c);

    h(a.nTable).on("search.dt.DT", function (b, c) {
      if (a === c) try {
        i[0] !== H.activeElement && i.val(e.sSearch);
      } catch (d) {}
    });
    return b[0];
  }

  function ga(a, b, c) {
    var d = a.oPreviousSearch,
        e = a.aoPreSearchCols,
        f = function f(a) {
      d.sSearch = a.sSearch;
      d.bRegex = a.bRegex;
      d.bSmart = a.bSmart;
      d.bCaseInsensitive = a.bCaseInsensitive;
    };

    Ga(a);

    if ("ssp" != y(a)) {
      xb(a, b.sSearch, c, b.bEscapeRegex !== k ? !b.bEscapeRegex : b.bRegex, b.bSmart, b.bCaseInsensitive);
      f(b);

      for (b = 0; b < e.length; b++) {
        yb(a, e[b].sSearch, b, e[b].bEscapeRegex !== k ? !e[b].bEscapeRegex : e[b].bRegex, e[b].bSmart, e[b].bCaseInsensitive);
      }

      zb(a);
    } else f(b);

    a.bFiltered = !0;
    r(a, null, "search", [a]);
  }

  function zb(a) {
    for (var b = n.ext.search, c = a.aiDisplay, d, e, f = 0, g = b.length; f < g; f++) {
      for (var j = [], i = 0, m = c.length; i < m; i++) {
        e = c[i], d = a.aoData[e], b[f](a, d._aFilterData, e, d._aData, i) && j.push(e);
      }

      c.length = 0;
      h.merge(c, j);
    }
  }

  function yb(a, b, c, d, e, f) {
    if ("" !== b) {
      for (var g = [], j = a.aiDisplay, d = Pa(b, d, e, f), e = 0; e < j.length; e++) {
        b = a.aoData[j[e]]._aFilterData[c], d.test(b) && g.push(j[e]);
      }

      a.aiDisplay = g;
    }
  }

  function xb(a, b, c, d, e, f) {
    var d = Pa(b, d, e, f),
        f = a.oPreviousSearch.sSearch,
        g = a.aiDisplayMaster,
        j,
        e = [];
    0 !== n.ext.search.length && (c = !0);
    j = Ab(a);
    if (0 >= b.length) a.aiDisplay = g.slice();else {
      if (j || c || f.length > b.length || 0 !== b.indexOf(f) || a.bSorted) a.aiDisplay = g.slice();
      b = a.aiDisplay;

      for (c = 0; c < b.length; c++) {
        d.test(a.aoData[b[c]]._sFilterRow) && e.push(b[c]);
      }

      a.aiDisplay = e;
    }
  }

  function Pa(a, b, c, d) {
    a = b ? a : Qa(a);
    c && (a = "^(?=.*?" + h.map(a.match(/"[^"]+"|[^ ]+/g) || [""], function (a) {
      if ('"' === a.charAt(0)) var b = a.match(/^"(.*)"$/),
          a = b ? b[1] : a;
      return a.replace('"', "");
    }).join(")(?=.*?") + ").*$");
    return RegExp(a, d ? "i" : "");
  }

  function Ab(a) {
    var b = a.aoColumns,
        c,
        d,
        e,
        f,
        g,
        j,
        i,
        h,
        l = n.ext.type.search;
    c = !1;
    d = 0;

    for (f = a.aoData.length; d < f; d++) {
      if (h = a.aoData[d], !h._aFilterData) {
        j = [];
        e = 0;

        for (g = b.length; e < g; e++) {
          c = b[e], c.bSearchable ? (i = B(a, d, e, "filter"), l[c.sType] && (i = l[c.sType](i)), null === i && (i = ""), "string" !== typeof i && i.toString && (i = i.toString())) : i = "", i.indexOf && -1 !== i.indexOf("&") && (va.innerHTML = i, i = Wb ? va.textContent : va.innerText), i.replace && (i = i.replace(/[\r\n]/g, "")), j.push(i);
        }

        h._aFilterData = j;
        h._sFilterRow = j.join("  ");
        c = !0;
      }
    }

    return c;
  }

  function Bb(a) {
    return {
      search: a.sSearch,
      smart: a.bSmart,
      regex: a.bRegex,
      caseInsensitive: a.bCaseInsensitive
    };
  }

  function Cb(a) {
    return {
      sSearch: a.search,
      bSmart: a.smart,
      bRegex: a.regex,
      bCaseInsensitive: a.caseInsensitive
    };
  }

  function tb(a) {
    var b = a.sTableId,
        c = a.aanFeatures.i,
        d = h("<div/>", {
      "class": a.oClasses.sInfo,
      id: !c ? b + "_info" : null
    });
    c || (a.aoDrawCallback.push({
      fn: Db,
      sName: "information"
    }), d.attr("role", "status").attr("aria-live", "polite"), h(a.nTable).attr("aria-describedby", b + "_info"));
    return d[0];
  }

  function Db(a) {
    var b = a.aanFeatures.i;

    if (0 !== b.length) {
      var c = a.oLanguage,
          d = a._iDisplayStart + 1,
          e = a.fnDisplayEnd(),
          f = a.fnRecordsTotal(),
          g = a.fnRecordsDisplay(),
          j = g ? c.sInfo : c.sInfoEmpty;
      g !== f && (j += " " + c.sInfoFiltered);
      j += c.sInfoPostFix;
      j = Eb(a, j);
      c = c.fnInfoCallback;
      null !== c && (j = c.call(a.oInstance, a, d, e, f, g, j));
      h(b).html(j);
    }
  }

  function Eb(a, b) {
    var c = a.fnFormatNumber,
        d = a._iDisplayStart + 1,
        e = a._iDisplayLength,
        f = a.fnRecordsDisplay(),
        g = -1 === e;
    return b.replace(/_START_/g, c.call(a, d)).replace(/_END_/g, c.call(a, a.fnDisplayEnd())).replace(/_MAX_/g, c.call(a, a.fnRecordsTotal())).replace(/_TOTAL_/g, c.call(a, f)).replace(/_PAGE_/g, c.call(a, g ? 1 : Math.ceil(d / e))).replace(/_PAGES_/g, c.call(a, g ? 1 : Math.ceil(f / e)));
  }

  function ha(a) {
    var b,
        c,
        d = a.iInitDisplayStart,
        e = a.aoColumns,
        f;
    c = a.oFeatures;
    var g = a.bDeferLoading;

    if (a.bInitialised) {
      ob(a);
      lb(a);
      fa(a, a.aoHeader);
      fa(a, a.aoFooter);
      C(a, !0);
      c.bAutoWidth && Fa(a);
      b = 0;

      for (c = e.length; b < c; b++) {
        f = e[b], f.sWidth && (f.nTh.style.width = v(f.sWidth));
      }

      r(a, null, "preInit", [a]);
      T(a);
      e = y(a);
      if ("ssp" != e || g) "ajax" == e ? sa(a, [], function (c) {
        var f = ta(a, c);

        for (b = 0; b < f.length; b++) {
          O(a, f[b]);
        }

        a.iInitDisplayStart = d;
        T(a);
        C(a, !1);
        ua(a, c);
      }, a) : (C(a, !1), ua(a));
    } else setTimeout(function () {
      ha(a);
    }, 200);
  }

  function ua(a, b) {
    a._bInitComplete = !0;
    (b || a.oInit.aaData) && $(a);
    r(a, null, "plugin-init", [a, b]);
    r(a, "aoInitComplete", "init", [a, b]);
  }

  function Ra(a, b) {
    var c = parseInt(b, 10);
    a._iDisplayLength = c;
    Sa(a);
    r(a, null, "length", [a, c]);
  }

  function pb(a) {
    for (var b = a.oClasses, c = a.sTableId, d = a.aLengthMenu, e = h.isArray(d[0]), f = e ? d[0] : d, d = e ? d[1] : d, e = h("<select/>", {
      name: c + "_length",
      "aria-controls": c,
      "class": b.sLengthSelect
    }), g = 0, j = f.length; g < j; g++) {
      e[0][g] = new Option("number" === typeof d[g] ? a.fnFormatNumber(d[g]) : d[g], f[g]);
    }

    var i = h("<div><label/></div>").addClass(b.sLength);
    a.aanFeatures.l || (i[0].id = c + "_length");
    i.children().append(a.oLanguage.sLengthMenu.replace("_MENU_", e[0].outerHTML));
    h("select", i).val(a._iDisplayLength).on("change.DT", function () {
      Ra(a, h(this).val());
      P(a);
    });
    h(a.nTable).on("length.dt.DT", function (b, c, d) {
      a === c && h("select", i).val(d);
    });
    return i[0];
  }

  function ub(a) {
    var b = a.sPaginationType,
        c = n.ext.pager[b],
        d = "function" === typeof c,
        e = function e(a) {
      P(a);
    },
        b = h("<div/>").addClass(a.oClasses.sPaging + b)[0],
        f = a.aanFeatures;

    d || c.fnInit(a, b, e);
    f.p || (b.id = a.sTableId + "_paginate", a.aoDrawCallback.push({
      fn: function fn(a) {
        if (d) {
          var b = a._iDisplayStart,
              i = a._iDisplayLength,
              h = a.fnRecordsDisplay(),
              l = -1 === i,
              b = l ? 0 : Math.ceil(b / i),
              i = l ? 1 : Math.ceil(h / i),
              h = c(b, i),
              k,
              l = 0;

          for (k = f.p.length; l < k; l++) {
            Na(a, "pageButton")(a, f.p[l], l, h, b, i);
          }
        } else c.fnUpdate(a, e);
      },
      sName: "pagination"
    }));
    return b;
  }

  function Ta(a, b, c) {
    var d = a._iDisplayStart,
        e = a._iDisplayLength,
        f = a.fnRecordsDisplay();
    0 === f || -1 === e ? d = 0 : "number" === typeof b ? (d = b * e, d > f && (d = 0)) : "first" == b ? d = 0 : "previous" == b ? (d = 0 <= e ? d - e : 0, 0 > d && (d = 0)) : "next" == b ? d + e < f && (d += e) : "last" == b ? d = Math.floor((f - 1) / e) * e : K(a, 0, "Unknown paging action: " + b, 5);
    b = a._iDisplayStart !== d;
    a._iDisplayStart = d;
    b && (r(a, null, "page", [a]), c && P(a));
    return b;
  }

  function rb(a) {
    return h("<div/>", {
      id: !a.aanFeatures.r ? a.sTableId + "_processing" : null,
      "class": a.oClasses.sProcessing
    }).html(a.oLanguage.sProcessing).insertBefore(a.nTable)[0];
  }

  function C(a, b) {
    a.oFeatures.bProcessing && h(a.aanFeatures.r).css("display", b ? "block" : "none");
    r(a, null, "processing", [a, b]);
  }

  function sb(a) {
    var b = h(a.nTable);
    b.attr("role", "grid");
    var c = a.oScroll;
    if ("" === c.sX && "" === c.sY) return a.nTable;
    var d = c.sX,
        e = c.sY,
        f = a.oClasses,
        g = b.children("caption"),
        j = g.length ? g[0]._captionSide : null,
        i = h(b[0].cloneNode(!1)),
        m = h(b[0].cloneNode(!1)),
        l = b.children("tfoot");
    l.length || (l = null);
    i = h("<div/>", {
      "class": f.sScrollWrapper
    }).append(h("<div/>", {
      "class": f.sScrollHead
    }).css({
      overflow: "hidden",
      position: "relative",
      border: 0,
      width: d ? !d ? null : v(d) : "100%"
    }).append(h("<div/>", {
      "class": f.sScrollHeadInner
    }).css({
      "box-sizing": "content-box",
      width: c.sXInner || "100%"
    }).append(i.removeAttr("id").css("margin-left", 0).append("top" === j ? g : null).append(b.children("thead"))))).append(h("<div/>", {
      "class": f.sScrollBody
    }).css({
      position: "relative",
      overflow: "auto",
      width: !d ? null : v(d)
    }).append(b));
    l && i.append(h("<div/>", {
      "class": f.sScrollFoot
    }).css({
      overflow: "hidden",
      border: 0,
      width: d ? !d ? null : v(d) : "100%"
    }).append(h("<div/>", {
      "class": f.sScrollFootInner
    }).append(m.removeAttr("id").css("margin-left", 0).append("bottom" === j ? g : null).append(b.children("tfoot")))));
    var b = i.children(),
        k = b[0],
        f = b[1],
        t = l ? b[2] : null;
    if (d) h(f).on("scroll.DT", function () {
      var a = this.scrollLeft;
      k.scrollLeft = a;
      l && (t.scrollLeft = a);
    });
    h(f).css(e && c.bCollapse ? "max-height" : "height", e);
    a.nScrollHead = k;
    a.nScrollBody = f;
    a.nScrollFoot = t;
    a.aoDrawCallback.push({
      fn: la,
      sName: "scrolling"
    });
    return i[0];
  }

  function la(a) {
    var b = a.oScroll,
        c = b.sX,
        d = b.sXInner,
        e = b.sY,
        b = b.iBarWidth,
        f = h(a.nScrollHead),
        g = f[0].style,
        j = f.children("div"),
        i = j[0].style,
        m = j.children("table"),
        j = a.nScrollBody,
        l = h(j),
        q = j.style,
        t = h(a.nScrollFoot).children("div"),
        n = t.children("table"),
        o = h(a.nTHead),
        p = h(a.nTable),
        s = p[0],
        r = s.style,
        u = a.nTFoot ? h(a.nTFoot) : null,
        x = a.oBrowser,
        U = x.bScrollOversize,
        Xb = D(a.aoColumns, "nTh"),
        Q,
        L,
        R,
        w,
        Ua = [],
        y = [],
        z = [],
        A = [],
        B,
        C = function C(a) {
      a = a.style;
      a.paddingTop = "0";
      a.paddingBottom = "0";
      a.borderTopWidth = "0";
      a.borderBottomWidth = "0";
      a.height = 0;
    };

    L = j.scrollHeight > j.clientHeight;
    if (a.scrollBarVis !== L && a.scrollBarVis !== k) a.scrollBarVis = L, $(a);else {
      a.scrollBarVis = L;
      p.children("thead, tfoot").remove();
      u && (R = u.clone().prependTo(p), Q = u.find("tr"), R = R.find("tr"));
      w = o.clone().prependTo(p);
      o = o.find("tr");
      L = w.find("tr");
      w.find("th, td").removeAttr("tabindex");
      c || (q.width = "100%", f[0].style.width = "100%");
      h.each(ra(a, w), function (b, c) {
        B = aa(a, b);
        c.style.width = a.aoColumns[B].sWidth;
      });
      u && I(function (a) {
        a.style.width = "";
      }, R);
      f = p.outerWidth();

      if ("" === c) {
        r.width = "100%";
        if (U && (p.find("tbody").height() > j.offsetHeight || "scroll" == l.css("overflow-y"))) r.width = v(p.outerWidth() - b);
        f = p.outerWidth();
      } else "" !== d && (r.width = v(d), f = p.outerWidth());

      I(C, L);
      I(function (a) {
        z.push(a.innerHTML);
        Ua.push(v(h(a).css("width")));
      }, L);
      I(function (a, b) {
        if (h.inArray(a, Xb) !== -1) a.style.width = Ua[b];
      }, o);
      h(L).height(0);
      u && (I(C, R), I(function (a) {
        A.push(a.innerHTML);
        y.push(v(h(a).css("width")));
      }, R), I(function (a, b) {
        a.style.width = y[b];
      }, Q), h(R).height(0));
      I(function (a, b) {
        a.innerHTML = '<div class="dataTables_sizing">' + z[b] + "</div>";
        a.childNodes[0].style.height = "0";
        a.childNodes[0].style.overflow = "hidden";
        a.style.width = Ua[b];
      }, L);
      u && I(function (a, b) {
        a.innerHTML = '<div class="dataTables_sizing">' + A[b] + "</div>";
        a.childNodes[0].style.height = "0";
        a.childNodes[0].style.overflow = "hidden";
        a.style.width = y[b];
      }, R);

      if (p.outerWidth() < f) {
        Q = j.scrollHeight > j.offsetHeight || "scroll" == l.css("overflow-y") ? f + b : f;
        if (U && (j.scrollHeight > j.offsetHeight || "scroll" == l.css("overflow-y"))) r.width = v(Q - b);
        ("" === c || "" !== d) && K(a, 1, "Possible column misalignment", 6);
      } else Q = "100%";

      q.width = v(Q);
      g.width = v(Q);
      u && (a.nScrollFoot.style.width = v(Q));
      !e && U && (q.height = v(s.offsetHeight + b));
      c = p.outerWidth();
      m[0].style.width = v(c);
      i.width = v(c);
      d = p.height() > j.clientHeight || "scroll" == l.css("overflow-y");
      e = "padding" + (x.bScrollbarLeft ? "Left" : "Right");
      i[e] = d ? b + "px" : "0px";
      u && (n[0].style.width = v(c), t[0].style.width = v(c), t[0].style[e] = d ? b + "px" : "0px");
      p.children("colgroup").insertBefore(p.children("thead"));
      l.scroll();
      if ((a.bSorted || a.bFiltered) && !a._drawHold) j.scrollTop = 0;
    }
  }

  function I(a, b, c) {
    for (var d = 0, e = 0, f = b.length, g, j; e < f;) {
      g = b[e].firstChild;

      for (j = c ? c[e].firstChild : null; g;) {
        1 === g.nodeType && (c ? a(g, j, d) : a(g, d), d++), g = g.nextSibling, j = c ? j.nextSibling : null;
      }

      e++;
    }
  }

  function Fa(a) {
    var b = a.nTable,
        c = a.aoColumns,
        d = a.oScroll,
        e = d.sY,
        f = d.sX,
        g = d.sXInner,
        j = c.length,
        i = ma(a, "bVisible"),
        m = h("th", a.nTHead),
        l = b.getAttribute("width"),
        k = b.parentNode,
        t = !1,
        n,
        o,
        p = a.oBrowser,
        d = p.bScrollOversize;
    (n = b.style.width) && -1 !== n.indexOf("%") && (l = n);

    for (n = 0; n < i.length; n++) {
      o = c[i[n]], null !== o.sWidth && (o.sWidth = Fb(o.sWidthOrig, k), t = !0);
    }

    if (d || !t && !f && !e && j == V(a) && j == m.length) for (n = 0; n < j; n++) {
      i = aa(a, n), null !== i && (c[i].sWidth = v(m.eq(n).width()));
    } else {
      j = h(b).clone().css("visibility", "hidden").removeAttr("id");
      j.find("tbody tr").remove();
      var s = h("<tr/>").appendTo(j.find("tbody"));
      j.find("thead, tfoot").remove();
      j.append(h(a.nTHead).clone()).append(h(a.nTFoot).clone());
      j.find("tfoot th, tfoot td").css("width", "");
      m = ra(a, j.find("thead")[0]);

      for (n = 0; n < i.length; n++) {
        o = c[i[n]], m[n].style.width = null !== o.sWidthOrig && "" !== o.sWidthOrig ? v(o.sWidthOrig) : "", o.sWidthOrig && f && h(m[n]).append(h("<div/>").css({
          width: o.sWidthOrig,
          margin: 0,
          padding: 0,
          border: 0,
          height: 1
        }));
      }

      if (a.aoData.length) for (n = 0; n < i.length; n++) {
        t = i[n], o = c[t], h(Gb(a, t)).clone(!1).append(o.sContentPadding).appendTo(s);
      }
      h("[name]", j).removeAttr("name");
      o = h("<div/>").css(f || e ? {
        position: "absolute",
        top: 0,
        left: 0,
        height: 1,
        right: 0,
        overflow: "hidden"
      } : {}).append(j).appendTo(k);
      f && g ? j.width(g) : f ? (j.css("width", "auto"), j.removeAttr("width"), j.width() < k.clientWidth && l && j.width(k.clientWidth)) : e ? j.width(k.clientWidth) : l && j.width(l);

      for (n = e = 0; n < i.length; n++) {
        k = h(m[n]), g = k.outerWidth() - k.width(), k = p.bBounding ? Math.ceil(m[n].getBoundingClientRect().width) : k.outerWidth(), e += k, c[i[n]].sWidth = v(k - g);
      }

      b.style.width = v(e);
      o.remove();
    }
    l && (b.style.width = v(l));
    if ((l || f) && !a._reszEvt) b = function b() {
      h(E).on("resize.DT-" + a.sInstance, Oa(function () {
        $(a);
      }));
    }, d ? setTimeout(b, 1E3) : b(), a._reszEvt = !0;
  }

  function Fb(a, b) {
    if (!a) return 0;
    var c = h("<div/>").css("width", v(a)).appendTo(b || H.body),
        d = c[0].offsetWidth;
    c.remove();
    return d;
  }

  function Gb(a, b) {
    var c = Hb(a, b);
    if (0 > c) return null;
    var d = a.aoData[c];
    return !d.nTr ? h("<td/>").html(B(a, c, b, "display"))[0] : d.anCells[b];
  }

  function Hb(a, b) {
    for (var c, d = -1, e = -1, f = 0, g = a.aoData.length; f < g; f++) {
      c = B(a, f, b, "display") + "", c = c.replace(Yb, ""), c = c.replace(/&nbsp;/g, " "), c.length > d && (d = c.length, e = f);
    }

    return e;
  }

  function v(a) {
    return null === a ? "0px" : "number" == typeof a ? 0 > a ? "0px" : a + "px" : a.match(/\d$/) ? a + "px" : a;
  }

  function X(a) {
    var b,
        c,
        d = [],
        e = a.aoColumns,
        f,
        g,
        j,
        i;
    b = a.aaSortingFixed;
    c = h.isPlainObject(b);
    var m = [];

    f = function f(a) {
      a.length && !h.isArray(a[0]) ? m.push(a) : h.merge(m, a);
    };

    h.isArray(b) && f(b);
    c && b.pre && f(b.pre);
    f(a.aaSorting);
    c && b.post && f(b.post);

    for (a = 0; a < m.length; a++) {
      i = m[a][0];
      f = e[i].aDataSort;
      b = 0;

      for (c = f.length; b < c; b++) {
        g = f[b], j = e[g].sType || "string", m[a]._idx === k && (m[a]._idx = h.inArray(m[a][1], e[g].asSorting)), d.push({
          src: i,
          col: g,
          dir: m[a][1],
          index: m[a]._idx,
          type: j,
          formatter: n.ext.type.order[j + "-pre"]
        });
      }
    }

    return d;
  }

  function nb(a) {
    var b,
        c,
        d = [],
        e = n.ext.type.order,
        f = a.aoData,
        g = 0,
        j,
        i = a.aiDisplayMaster,
        h;
    Ga(a);
    h = X(a);
    b = 0;

    for (c = h.length; b < c; b++) {
      j = h[b], j.formatter && g++, Ib(a, j.col);
    }

    if ("ssp" != y(a) && 0 !== h.length) {
      b = 0;

      for (c = i.length; b < c; b++) {
        d[i[b]] = b;
      }

      g === h.length ? i.sort(function (a, b) {
        var c,
            e,
            g,
            j,
            i = h.length,
            k = f[a]._aSortData,
            n = f[b]._aSortData;

        for (g = 0; g < i; g++) {
          if (j = h[g], c = k[j.col], e = n[j.col], c = c < e ? -1 : c > e ? 1 : 0, 0 !== c) return "asc" === j.dir ? c : -c;
        }

        c = d[a];
        e = d[b];
        return c < e ? -1 : c > e ? 1 : 0;
      }) : i.sort(function (a, b) {
        var c,
            g,
            j,
            i,
            k = h.length,
            n = f[a]._aSortData,
            o = f[b]._aSortData;

        for (j = 0; j < k; j++) {
          if (i = h[j], c = n[i.col], g = o[i.col], i = e[i.type + "-" + i.dir] || e["string-" + i.dir], c = i(c, g), 0 !== c) return c;
        }

        c = d[a];
        g = d[b];
        return c < g ? -1 : c > g ? 1 : 0;
      });
    }

    a.bSorted = !0;
  }

  function Jb(a) {
    for (var b, c, d = a.aoColumns, e = X(a), a = a.oLanguage.oAria, f = 0, g = d.length; f < g; f++) {
      c = d[f];
      var j = c.asSorting;
      b = c.sTitle.replace(/<.*?>/g, "");
      var i = c.nTh;
      i.removeAttribute("aria-sort");
      c.bSortable && (0 < e.length && e[0].col == f ? (i.setAttribute("aria-sort", "asc" == e[0].dir ? "ascending" : "descending"), c = j[e[0].index + 1] || j[0]) : c = j[0], b += "asc" === c ? a.sSortAscending : a.sSortDescending);
      i.setAttribute("aria-label", b);
    }
  }

  function Va(a, b, c, d) {
    var e = a.aaSorting,
        f = a.aoColumns[b].asSorting,
        g = function g(a, b) {
      var c = a._idx;
      c === k && (c = h.inArray(a[1], f));
      return c + 1 < f.length ? c + 1 : b ? null : 0;
    };

    "number" === typeof e[0] && (e = a.aaSorting = [e]);
    c && a.oFeatures.bSortMulti ? (c = h.inArray(b, D(e, "0")), -1 !== c ? (b = g(e[c], !0), null === b && 1 === e.length && (b = 0), null === b ? e.splice(c, 1) : (e[c][1] = f[b], e[c]._idx = b)) : (e.push([b, f[0], 0]), e[e.length - 1]._idx = 0)) : e.length && e[0][0] == b ? (b = g(e[0]), e.length = 1, e[0][1] = f[b], e[0]._idx = b) : (e.length = 0, e.push([b, f[0]]), e[0]._idx = 0);
    T(a);
    "function" == typeof d && d(a);
  }

  function Ma(a, b, c, d) {
    var e = a.aoColumns[c];
    Wa(b, {}, function (b) {
      !1 !== e.bSortable && (a.oFeatures.bProcessing ? (C(a, !0), setTimeout(function () {
        Va(a, c, b.shiftKey, d);
        "ssp" !== y(a) && C(a, !1);
      }, 0)) : Va(a, c, b.shiftKey, d));
    });
  }

  function wa(a) {
    var b = a.aLastSort,
        c = a.oClasses.sSortColumn,
        d = X(a),
        e = a.oFeatures,
        f,
        g;

    if (e.bSort && e.bSortClasses) {
      e = 0;

      for (f = b.length; e < f; e++) {
        g = b[e].src, h(D(a.aoData, "anCells", g)).removeClass(c + (2 > e ? e + 1 : 3));
      }

      e = 0;

      for (f = d.length; e < f; e++) {
        g = d[e].src, h(D(a.aoData, "anCells", g)).addClass(c + (2 > e ? e + 1 : 3));
      }
    }

    a.aLastSort = d;
  }

  function Ib(a, b) {
    var c = a.aoColumns[b],
        d = n.ext.order[c.sSortDataType],
        e;
    d && (e = d.call(a.oInstance, a, b, ba(a, b)));

    for (var f, g = n.ext.type.order[c.sType + "-pre"], j = 0, i = a.aoData.length; j < i; j++) {
      if (c = a.aoData[j], c._aSortData || (c._aSortData = []), !c._aSortData[b] || d) f = d ? e[j] : B(a, j, b, "sort"), c._aSortData[b] = g ? g(f) : f;
    }
  }

  function xa(a) {
    if (a.oFeatures.bStateSave && !a.bDestroying) {
      var b = {
        time: +new Date(),
        start: a._iDisplayStart,
        length: a._iDisplayLength,
        order: h.extend(!0, [], a.aaSorting),
        search: Bb(a.oPreviousSearch),
        columns: h.map(a.aoColumns, function (b, d) {
          return {
            visible: b.bVisible,
            search: Bb(a.aoPreSearchCols[d])
          };
        })
      };
      r(a, "aoStateSaveParams", "stateSaveParams", [a, b]);
      a.oSavedState = b;
      a.fnStateSaveCallback.call(a.oInstance, a, b);
    }
  }

  function Kb(a, b, c) {
    var d,
        e,
        f = a.aoColumns,
        b = function b(_b) {
      if (_b && _b.time) {
        var g = r(a, "aoStateLoadParams", "stateLoadParams", [a, _b]);

        if (-1 === h.inArray(!1, g) && (g = a.iStateDuration, !(0 < g && _b.time < +new Date() - 1E3 * g) && !(_b.columns && f.length !== _b.columns.length))) {
          a.oLoadedState = h.extend(!0, {}, _b);
          _b.start !== k && (a._iDisplayStart = _b.start, a.iInitDisplayStart = _b.start);
          _b.length !== k && (a._iDisplayLength = _b.length);
          _b.order !== k && (a.aaSorting = [], h.each(_b.order, function (b, c) {
            a.aaSorting.push(c[0] >= f.length ? [0, c[1]] : c);
          }));
          _b.search !== k && h.extend(a.oPreviousSearch, Cb(_b.search));

          if (_b.columns) {
            d = 0;

            for (e = _b.columns.length; d < e; d++) {
              g = _b.columns[d], g.visible !== k && (f[d].bVisible = g.visible), g.search !== k && h.extend(a.aoPreSearchCols[d], Cb(g.search));
            }
          }

          r(a, "aoStateLoaded", "stateLoaded", [a, _b]);
        }
      }

      c();
    };

    if (a.oFeatures.bStateSave) {
      var g = a.fnStateLoadCallback.call(a.oInstance, a, b);
      g !== k && b(g);
    } else c();
  }

  function ya(a) {
    var b = n.settings,
        a = h.inArray(a, D(b, "nTable"));
    return -1 !== a ? b[a] : null;
  }

  function K(a, b, c, d) {
    c = "DataTables warning: " + (a ? "table id=" + a.sTableId + " - " : "") + c;
    d && (c += ". For more information about this error, please see http://datatables.net/tn/" + d);
    if (b) E.console && console.log && console.log(c);else if (b = n.ext, b = b.sErrMode || b.errMode, a && r(a, null, "error", [a, d, c]), "alert" == b) alert(c);else {
      if ("throw" == b) throw Error(c);
      "function" == typeof b && b(a, d, c);
    }
  }

  function F(a, b, c, d) {
    h.isArray(c) ? h.each(c, function (c, d) {
      h.isArray(d) ? F(a, b, d[0], d[1]) : F(a, b, d);
    }) : (d === k && (d = c), b[c] !== k && (a[d] = b[c]));
  }

  function Xa(a, b, c) {
    var d, e;

    for (e in b) {
      b.hasOwnProperty(e) && (d = b[e], h.isPlainObject(d) ? (h.isPlainObject(a[e]) || (a[e] = {}), h.extend(!0, a[e], d)) : a[e] = c && "data" !== e && "aaData" !== e && h.isArray(d) ? d.slice() : d);
    }

    return a;
  }

  function Wa(a, b, c) {
    h(a).on("click.DT", b, function (b) {
      h(a).blur();
      c(b);
    }).on("keypress.DT", b, function (a) {
      13 === a.which && (a.preventDefault(), c(a));
    }).on("selectstart.DT", function () {
      return !1;
    });
  }

  function z(a, b, c, d) {
    c && a[b].push({
      fn: c,
      sName: d
    });
  }

  function r(a, b, c, d) {
    var e = [];
    b && (e = h.map(a[b].slice().reverse(), function (b) {
      return b.fn.apply(a.oInstance, d);
    }));
    null !== c && (b = h.Event(c + ".dt"), h(a.nTable).trigger(b, d), e.push(b.result));
    return e;
  }

  function Sa(a) {
    var b = a._iDisplayStart,
        c = a.fnDisplayEnd(),
        d = a._iDisplayLength;
    b >= c && (b = c - d);
    b -= b % d;
    if (-1 === d || 0 > b) b = 0;
    a._iDisplayStart = b;
  }

  function Na(a, b) {
    var c = a.renderer,
        d = n.ext.renderer[b];
    return h.isPlainObject(c) && c[b] ? d[c[b]] || d._ : "string" === typeof c ? d[c] || d._ : d._;
  }

  function y(a) {
    return a.oFeatures.bServerSide ? "ssp" : a.ajax || a.sAjaxSource ? "ajax" : "dom";
  }

  function ia(a, b) {
    var c = [],
        c = Lb.numbers_length,
        d = Math.floor(c / 2);
    b <= c ? c = Y(0, b) : a <= d ? (c = Y(0, c - 2), c.push("ellipsis"), c.push(b - 1)) : (a >= b - 1 - d ? c = Y(b - (c - 2), b) : (c = Y(a - d + 2, a + d - 1), c.push("ellipsis"), c.push(b - 1)), c.splice(0, 0, "ellipsis"), c.splice(0, 0, 0));
    c.DT_el = "span";
    return c;
  }

  function Da(a) {
    h.each({
      num: function num(b) {
        return za(b, a);
      },
      "num-fmt": function numFmt(b) {
        return za(b, a, Ya);
      },
      "html-num": function htmlNum(b) {
        return za(b, a, Aa);
      },
      "html-num-fmt": function htmlNumFmt(b) {
        return za(b, a, Aa, Ya);
      }
    }, function (b, c) {
      x.type.order[b + a + "-pre"] = c;
      b.match(/^html\-/) && (x.type.search[b + a] = x.type.search.html);
    });
  }

  function Mb(a) {
    return function () {
      var b = [ya(this[n.ext.iApiIndex])].concat(Array.prototype.slice.call(arguments));
      return n.ext.internal[a].apply(this, b);
    };
  }

  var n = function n(a) {
    this.$ = function (a, b) {
      return this.api(!0).$(a, b);
    };

    this._ = function (a, b) {
      return this.api(!0).rows(a, b).data();
    };

    this.api = function (a) {
      return a ? new _s(ya(this[x.iApiIndex])) : new _s(this);
    };

    this.fnAddData = function (a, b) {
      var c = this.api(!0),
          d = h.isArray(a) && (h.isArray(a[0]) || h.isPlainObject(a[0])) ? c.rows.add(a) : c.row.add(a);
      (b === k || b) && c.draw();
      return d.flatten().toArray();
    };

    this.fnAdjustColumnSizing = function (a) {
      var b = this.api(!0).columns.adjust(),
          c = b.settings()[0],
          d = c.oScroll;
      a === k || a ? b.draw(!1) : ("" !== d.sX || "" !== d.sY) && la(c);
    };

    this.fnClearTable = function (a) {
      var b = this.api(!0).clear();
      (a === k || a) && b.draw();
    };

    this.fnClose = function (a) {
      this.api(!0).row(a).child.hide();
    };

    this.fnDeleteRow = function (a, b, c) {
      var d = this.api(!0),
          a = d.rows(a),
          e = a.settings()[0],
          h = e.aoData[a[0][0]];
      a.remove();
      b && b.call(this, e, h);
      (c === k || c) && d.draw();
      return h;
    };

    this.fnDestroy = function (a) {
      this.api(!0).destroy(a);
    };

    this.fnDraw = function (a) {
      this.api(!0).draw(a);
    };

    this.fnFilter = function (a, b, c, d, e, h) {
      e = this.api(!0);
      null === b || b === k ? e.search(a, c, d, h) : e.column(b).search(a, c, d, h);
      e.draw();
    };

    this.fnGetData = function (a, b) {
      var c = this.api(!0);

      if (a !== k) {
        var d = a.nodeName ? a.nodeName.toLowerCase() : "";
        return b !== k || "td" == d || "th" == d ? c.cell(a, b).data() : c.row(a).data() || null;
      }

      return c.data().toArray();
    };

    this.fnGetNodes = function (a) {
      var b = this.api(!0);
      return a !== k ? b.row(a).node() : b.rows().nodes().flatten().toArray();
    };

    this.fnGetPosition = function (a) {
      var b = this.api(!0),
          c = a.nodeName.toUpperCase();
      return "TR" == c ? b.row(a).index() : "TD" == c || "TH" == c ? (a = b.cell(a).index(), [a.row, a.columnVisible, a.column]) : null;
    };

    this.fnIsOpen = function (a) {
      return this.api(!0).row(a).child.isShown();
    };

    this.fnOpen = function (a, b, c) {
      return this.api(!0).row(a).child(b, c).show().child()[0];
    };

    this.fnPageChange = function (a, b) {
      var c = this.api(!0).page(a);
      (b === k || b) && c.draw(!1);
    };

    this.fnSetColumnVis = function (a, b, c) {
      a = this.api(!0).column(a).visible(b);
      (c === k || c) && a.columns.adjust().draw();
    };

    this.fnSettings = function () {
      return ya(this[x.iApiIndex]);
    };

    this.fnSort = function (a) {
      this.api(!0).order(a).draw();
    };

    this.fnSortListener = function (a, b, c) {
      this.api(!0).order.listener(a, b, c);
    };

    this.fnUpdate = function (a, b, c, d, e) {
      var h = this.api(!0);
      c === k || null === c ? h.row(b).data(a) : h.cell(b, c).data(a);
      (e === k || e) && h.columns.adjust();
      (d === k || d) && h.draw();
      return 0;
    };

    this.fnVersionCheck = x.fnVersionCheck;
    var b = this,
        c = a === k,
        d = this.length;
    c && (a = {});
    this.oApi = this.internal = x.internal;

    for (var e in n.ext.internal) {
      e && (this[e] = Mb(e));
    }

    this.each(function () {
      var e = {},
          g = 1 < d ? Xa(e, a, !0) : a,
          j = 0,
          i,
          e = this.getAttribute("id"),
          m = !1,
          l = n.defaults,
          q = h(this);
      if ("table" != this.nodeName.toLowerCase()) K(null, 0, "Non-table node initialisation (" + this.nodeName + ")", 2);else {
        fb(l);
        gb(l.column);
        J(l, l, !0);
        J(l.column, l.column, !0);
        J(l, h.extend(g, q.data()));
        var t = n.settings,
            j = 0;

        for (i = t.length; j < i; j++) {
          var o = t[j];

          if (o.nTable == this || o.nTHead && o.nTHead.parentNode == this || o.nTFoot && o.nTFoot.parentNode == this) {
            var s = g.bRetrieve !== k ? g.bRetrieve : l.bRetrieve;
            if (c || s) return o.oInstance;

            if (g.bDestroy !== k ? g.bDestroy : l.bDestroy) {
              o.oInstance.fnDestroy();
              break;
            } else {
              K(o, 0, "Cannot reinitialise DataTable", 3);
              return;
            }
          }

          if (o.sTableId == this.id) {
            t.splice(j, 1);
            break;
          }
        }

        if (null === e || "" === e) this.id = e = "DataTables_Table_" + n.ext._unique++;
        var p = h.extend(!0, {}, n.models.oSettings, {
          sDestroyWidth: q[0].style.width,
          sInstance: e,
          sTableId: e
        });
        p.nTable = this;
        p.oApi = b.internal;
        p.oInit = g;
        t.push(p);
        p.oInstance = 1 === b.length ? b : q.dataTable();
        fb(g);
        Ca(g.oLanguage);
        g.aLengthMenu && !g.iDisplayLength && (g.iDisplayLength = h.isArray(g.aLengthMenu[0]) ? g.aLengthMenu[0][0] : g.aLengthMenu[0]);
        g = Xa(h.extend(!0, {}, l), g);
        F(p.oFeatures, g, "bPaginate bLengthChange bFilter bSort bSortMulti bInfo bProcessing bAutoWidth bSortClasses bServerSide bDeferRender".split(" "));
        F(p, g, ["asStripeClasses", "ajax", "fnServerData", "fnFormatNumber", "sServerMethod", "aaSorting", "aaSortingFixed", "aLengthMenu", "sPaginationType", "sAjaxSource", "sAjaxDataProp", "iStateDuration", "sDom", "bSortCellsTop", "iTabIndex", "fnStateLoadCallback", "fnStateSaveCallback", "renderer", "searchDelay", "rowId", ["iCookieDuration", "iStateDuration"], ["oSearch", "oPreviousSearch"], ["aoSearchCols", "aoPreSearchCols"], ["iDisplayLength", "_iDisplayLength"]]);
        F(p.oScroll, g, [["sScrollX", "sX"], ["sScrollXInner", "sXInner"], ["sScrollY", "sY"], ["bScrollCollapse", "bCollapse"]]);
        F(p.oLanguage, g, "fnInfoCallback");
        z(p, "aoDrawCallback", g.fnDrawCallback, "user");
        z(p, "aoServerParams", g.fnServerParams, "user");
        z(p, "aoStateSaveParams", g.fnStateSaveParams, "user");
        z(p, "aoStateLoadParams", g.fnStateLoadParams, "user");
        z(p, "aoStateLoaded", g.fnStateLoaded, "user");
        z(p, "aoRowCallback", g.fnRowCallback, "user");
        z(p, "aoRowCreatedCallback", g.fnCreatedRow, "user");
        z(p, "aoHeaderCallback", g.fnHeaderCallback, "user");
        z(p, "aoFooterCallback", g.fnFooterCallback, "user");
        z(p, "aoInitComplete", g.fnInitComplete, "user");
        z(p, "aoPreDrawCallback", g.fnPreDrawCallback, "user");
        p.rowIdFn = S(g.rowId);
        hb(p);
        var u = p.oClasses;
        h.extend(u, n.ext.classes, g.oClasses);
        q.addClass(u.sTable);
        p.iInitDisplayStart === k && (p.iInitDisplayStart = g.iDisplayStart, p._iDisplayStart = g.iDisplayStart);
        null !== g.iDeferLoading && (p.bDeferLoading = !0, e = h.isArray(g.iDeferLoading), p._iRecordsDisplay = e ? g.iDeferLoading[0] : g.iDeferLoading, p._iRecordsTotal = e ? g.iDeferLoading[1] : g.iDeferLoading);
        var v = p.oLanguage;
        h.extend(!0, v, g.oLanguage);
        v.sUrl && (h.ajax({
          dataType: "json",
          url: v.sUrl,
          success: function success(a) {
            Ca(a);
            J(l.oLanguage, a);
            h.extend(true, v, a);
            ha(p);
          },
          error: function error() {
            ha(p);
          }
        }), m = !0);
        null === g.asStripeClasses && (p.asStripeClasses = [u.sStripeOdd, u.sStripeEven]);
        var e = p.asStripeClasses,
            x = q.children("tbody").find("tr").eq(0);
        -1 !== h.inArray(!0, h.map(e, function (a) {
          return x.hasClass(a);
        })) && (h("tbody tr", this).removeClass(e.join(" ")), p.asDestroyStripes = e.slice());
        e = [];
        t = this.getElementsByTagName("thead");
        0 !== t.length && (ea(p.aoHeader, t[0]), e = ra(p));

        if (null === g.aoColumns) {
          t = [];
          j = 0;

          for (i = e.length; j < i; j++) {
            t.push(null);
          }
        } else t = g.aoColumns;

        j = 0;

        for (i = t.length; j < i; j++) {
          Ea(p, e ? e[j] : null);
        }

        jb(p, g.aoColumnDefs, t, function (a, b) {
          ka(p, a, b);
        });

        if (x.length) {
          var w = function w(a, b) {
            return a.getAttribute("data-" + b) !== null ? b : null;
          };

          h(x[0]).children("th, td").each(function (a, b) {
            var c = p.aoColumns[a];

            if (c.mData === a) {
              var d = w(b, "sort") || w(b, "order"),
                  e = w(b, "filter") || w(b, "search");

              if (d !== null || e !== null) {
                c.mData = {
                  _: a + ".display",
                  sort: d !== null ? a + ".@data-" + d : k,
                  type: d !== null ? a + ".@data-" + d : k,
                  filter: e !== null ? a + ".@data-" + e : k
                };
                ka(p, a);
              }
            }
          });
        }

        var U = p.oFeatures,
            e = function e() {
          if (g.aaSorting === k) {
            var a = p.aaSorting;
            j = 0;

            for (i = a.length; j < i; j++) {
              a[j][1] = p.aoColumns[j].asSorting[0];
            }
          }

          wa(p);
          U.bSort && z(p, "aoDrawCallback", function () {
            if (p.bSorted) {
              var a = X(p),
                  b = {};
              h.each(a, function (a, c) {
                b[c.src] = c.dir;
              });
              r(p, null, "order", [p, a, b]);
              Jb(p);
            }
          });
          z(p, "aoDrawCallback", function () {
            (p.bSorted || y(p) === "ssp" || U.bDeferRender) && wa(p);
          }, "sc");
          var a = q.children("caption").each(function () {
            this._captionSide = h(this).css("caption-side");
          }),
              b = q.children("thead");
          b.length === 0 && (b = h("<thead/>").appendTo(q));
          p.nTHead = b[0];
          b = q.children("tbody");
          b.length === 0 && (b = h("<tbody/>").appendTo(q));
          p.nTBody = b[0];
          b = q.children("tfoot");
          if (b.length === 0 && a.length > 0 && (p.oScroll.sX !== "" || p.oScroll.sY !== "")) b = h("<tfoot/>").appendTo(q);
          if (b.length === 0 || b.children().length === 0) q.addClass(u.sNoFooter);else if (b.length > 0) {
            p.nTFoot = b[0];
            ea(p.aoFooter, p.nTFoot);
          }
          if (g.aaData) for (j = 0; j < g.aaData.length; j++) {
            O(p, g.aaData[j]);
          } else (p.bDeferLoading || y(p) == "dom") && na(p, h(p.nTBody).children("tr"));
          p.aiDisplay = p.aiDisplayMaster.slice();
          p.bInitialised = true;
          m === false && ha(p);
        };

        g.bStateSave ? (U.bStateSave = !0, z(p, "aoDrawCallback", xa, "state_save"), Kb(p, g, e)) : e();
      }
    });
    b = null;
    return this;
  },
      x,
      _s,
      o,
      u,
      Za = {},
      Nb = /[\r\n]/g,
      Aa = /<.*?>/g,
      Zb = /^\d{2,4}[\.\/\-]\d{1,2}[\.\/\-]\d{1,2}([T ]{1}\d{1,2}[:\.]\d{2}([\.:]\d{2})?)?$/,
      $b = RegExp("(\\/|\\.|\\*|\\+|\\?|\\||\\(|\\)|\\[|\\]|\\{|\\}|\\\\|\\$|\\^|\\-)", "g"),
      Ya = /[',$£€¥%\u2009\u202F\u20BD\u20a9\u20BArfkɃΞ]/gi,
      M = function M(a) {
    return !a || !0 === a || "-" === a ? !0 : !1;
  },
      Ob = function Ob(a) {
    var b = parseInt(a, 10);
    return !isNaN(b) && isFinite(a) ? b : null;
  },
      Pb = function Pb(a, b) {
    Za[b] || (Za[b] = RegExp(Qa(b), "g"));
    return "string" === typeof a && "." !== b ? a.replace(/\./g, "").replace(Za[b], ".") : a;
  },
      $a = function $a(a, b, c) {
    var d = "string" === typeof a;
    if (M(a)) return !0;
    b && d && (a = Pb(a, b));
    c && d && (a = a.replace(Ya, ""));
    return !isNaN(parseFloat(a)) && isFinite(a);
  },
      Qb = function Qb(a, b, c) {
    return M(a) ? !0 : !(M(a) || "string" === typeof a) ? null : $a(a.replace(Aa, ""), b, c) ? !0 : null;
  },
      D = function D(a, b, c) {
    var d = [],
        e = 0,
        f = a.length;
    if (c !== k) for (; e < f; e++) {
      a[e] && a[e][b] && d.push(a[e][b][c]);
    } else for (; e < f; e++) {
      a[e] && d.push(a[e][b]);
    }
    return d;
  },
      ja = function ja(a, b, c, d) {
    var e = [],
        f = 0,
        g = b.length;
    if (d !== k) for (; f < g; f++) {
      a[b[f]][c] && e.push(a[b[f]][c][d]);
    } else for (; f < g; f++) {
      e.push(a[b[f]][c]);
    }
    return e;
  },
      Y = function Y(a, b) {
    var c = [],
        d;
    b === k ? (b = 0, d = a) : (d = b, b = a);

    for (var e = b; e < d; e++) {
      c.push(e);
    }

    return c;
  },
      Rb = function Rb(a) {
    for (var b = [], c = 0, d = a.length; c < d; c++) {
      a[c] && b.push(a[c]);
    }

    return b;
  },
      qa = function qa(a) {
    var b;

    a: {
      if (!(2 > a.length)) {
        b = a.slice().sort();

        for (var c = b[0], d = 1, e = b.length; d < e; d++) {
          if (b[d] === c) {
            b = !1;
            break a;
          }

          c = b[d];
        }
      }

      b = !0;
    }

    if (b) return a.slice();
    b = [];
    var e = a.length,
        f,
        g = 0,
        d = 0;

    a: for (; d < e; d++) {
      c = a[d];

      for (f = 0; f < g; f++) {
        if (b[f] === c) continue a;
      }

      b.push(c);
      g++;
    }

    return b;
  };

  n.util = {
    throttle: function throttle(a, b) {
      var c = b !== k ? b : 200,
          d,
          e;
      return function () {
        var b = this,
            g = +new Date(),
            j = arguments;
        d && g < d + c ? (clearTimeout(e), e = setTimeout(function () {
          d = k;
          a.apply(b, j);
        }, c)) : (d = g, a.apply(b, j));
      };
    },
    escapeRegex: function escapeRegex(a) {
      return a.replace($b, "\\$1");
    }
  };

  var A = function A(a, b, c) {
    a[b] !== k && (a[c] = a[b]);
  },
      ca = /\[.*?\]$/,
      W = /\(\)$/,
      Qa = n.util.escapeRegex,
      va = h("<div>")[0],
      Wb = va.textContent !== k,
      Yb = /<.*?>/g,
      Oa = n.util.throttle,
      Sb = [],
      w = Array.prototype,
      ac = function ac(a) {
    var b,
        c,
        d = n.settings,
        e = h.map(d, function (a) {
      return a.nTable;
    });

    if (a) {
      if (a.nTable && a.oApi) return [a];
      if (a.nodeName && "table" === a.nodeName.toLowerCase()) return b = h.inArray(a, e), -1 !== b ? [d[b]] : null;
      if (a && "function" === typeof a.settings) return a.settings().toArray();
      "string" === typeof a ? c = h(a) : a instanceof h && (c = a);
    } else return [];

    if (c) return c.map(function () {
      b = h.inArray(this, e);
      return -1 !== b ? d[b] : null;
    }).toArray();
  };

  _s = function s(a, b) {
    if (!(this instanceof _s)) return new _s(a, b);

    var c = [],
        d = function d(a) {
      (a = ac(a)) && (c = c.concat(a));
    };

    if (h.isArray(a)) for (var e = 0, f = a.length; e < f; e++) {
      d(a[e]);
    } else d(a);
    this.context = qa(c);
    b && h.merge(this, b);
    this.selector = {
      rows: null,
      cols: null,
      opts: null
    };

    _s.extend(this, this, Sb);
  };

  n.Api = _s;
  h.extend(_s.prototype, {
    any: function any() {
      return 0 !== this.count();
    },
    concat: w.concat,
    context: [],
    count: function count() {
      return this.flatten().length;
    },
    each: function each(a) {
      for (var b = 0, c = this.length; b < c; b++) {
        a.call(this, this[b], b, this);
      }

      return this;
    },
    eq: function eq(a) {
      var b = this.context;
      return b.length > a ? new _s(b[a], this[a]) : null;
    },
    filter: function filter(a) {
      var b = [];
      if (w.filter) b = w.filter.call(this, a, this);else for (var c = 0, d = this.length; c < d; c++) {
        a.call(this, this[c], c, this) && b.push(this[c]);
      }
      return new _s(this.context, b);
    },
    flatten: function flatten() {
      var a = [];
      return new _s(this.context, a.concat.apply(a, this.toArray()));
    },
    join: w.join,
    indexOf: w.indexOf || function (a, b) {
      for (var c = b || 0, d = this.length; c < d; c++) {
        if (this[c] === a) return c;
      }

      return -1;
    },
    iterator: function iterator(a, b, c, d) {
      var e = [],
          f,
          g,
          j,
          h,
          m,
          l = this.context,
          n,
          o,
          u = this.selector;
      "string" === typeof a && (d = c, c = b, b = a, a = !1);
      g = 0;

      for (j = l.length; g < j; g++) {
        var r = new _s(l[g]);
        if ("table" === b) f = c.call(r, l[g], g), f !== k && e.push(f);else if ("columns" === b || "rows" === b) f = c.call(r, l[g], this[g], g), f !== k && e.push(f);else if ("column" === b || "column-rows" === b || "row" === b || "cell" === b) {
          o = this[g];
          "column-rows" === b && (n = Ba(l[g], u.opts));
          h = 0;

          for (m = o.length; h < m; h++) {
            f = o[h], f = "cell" === b ? c.call(r, l[g], f.row, f.column, g, h) : c.call(r, l[g], f, g, h, n), f !== k && e.push(f);
          }
        }
      }

      return e.length || d ? (a = new _s(l, a ? e.concat.apply([], e) : e), b = a.selector, b.rows = u.rows, b.cols = u.cols, b.opts = u.opts, a) : this;
    },
    lastIndexOf: w.lastIndexOf || function (a, b) {
      return this.indexOf.apply(this.toArray.reverse(), arguments);
    },
    length: 0,
    map: function map(a) {
      var b = [];
      if (w.map) b = w.map.call(this, a, this);else for (var c = 0, d = this.length; c < d; c++) {
        b.push(a.call(this, this[c], c));
      }
      return new _s(this.context, b);
    },
    pluck: function pluck(a) {
      return this.map(function (b) {
        return b[a];
      });
    },
    pop: w.pop,
    push: w.push,
    reduce: w.reduce || function (a, b) {
      return ib(this, a, b, 0, this.length, 1);
    },
    reduceRight: w.reduceRight || function (a, b) {
      return ib(this, a, b, this.length - 1, -1, -1);
    },
    reverse: w.reverse,
    selector: null,
    shift: w.shift,
    slice: function slice() {
      return new _s(this.context, this);
    },
    sort: w.sort,
    splice: w.splice,
    toArray: function toArray() {
      return w.slice.call(this);
    },
    to$: function to$() {
      return h(this);
    },
    toJQuery: function toJQuery() {
      return h(this);
    },
    unique: function unique() {
      return new _s(this.context, qa(this));
    },
    unshift: w.unshift
  });

  _s.extend = function (a, b, c) {
    if (c.length && b && (b instanceof _s || b.__dt_wrapper)) {
      var d,
          e,
          f,
          g = function g(a, b, c) {
        return function () {
          var d = b.apply(a, arguments);

          _s.extend(d, d, c.methodExt);

          return d;
        };
      };

      d = 0;

      for (e = c.length; d < e; d++) {
        f = c[d], b[f.name] = "function" === typeof f.val ? g(a, f.val, f) : h.isPlainObject(f.val) ? {} : f.val, b[f.name].__dt_wrapper = !0, _s.extend(a, b[f.name], f.propExt);
      }
    }
  };

  _s.register = o = function o(a, b) {
    if (h.isArray(a)) for (var c = 0, d = a.length; c < d; c++) {
      _s.register(a[c], b);
    } else for (var e = a.split("."), f = Sb, g, j, c = 0, d = e.length; c < d; c++) {
      g = (j = -1 !== e[c].indexOf("()")) ? e[c].replace("()", "") : e[c];
      var i;

      a: {
        i = 0;

        for (var m = f.length; i < m; i++) {
          if (f[i].name === g) {
            i = f[i];
            break a;
          }
        }

        i = null;
      }

      i || (i = {
        name: g,
        val: {},
        methodExt: [],
        propExt: []
      }, f.push(i));
      c === d - 1 ? i.val = b : f = j ? i.methodExt : i.propExt;
    }
  };

  _s.registerPlural = u = function u(a, b, c) {
    _s.register(a, c);

    _s.register(b, function () {
      var a = c.apply(this, arguments);
      return a === this ? this : a instanceof _s ? a.length ? h.isArray(a[0]) ? new _s(a.context, a[0]) : a[0] : k : a;
    });
  };

  o("tables()", function (a) {
    var b;

    if (a) {
      b = _s;
      var c = this.context;
      if ("number" === typeof a) a = [c[a]];else var d = h.map(c, function (a) {
        return a.nTable;
      }),
          a = h(d).filter(a).map(function () {
        var a = h.inArray(this, d);
        return c[a];
      }).toArray();
      b = new b(a);
    } else b = this;

    return b;
  });
  o("table()", function (a) {
    var a = this.tables(a),
        b = a.context;
    return b.length ? new _s(b[0]) : a;
  });
  u("tables().nodes()", "table().node()", function () {
    return this.iterator("table", function (a) {
      return a.nTable;
    }, 1);
  });
  u("tables().body()", "table().body()", function () {
    return this.iterator("table", function (a) {
      return a.nTBody;
    }, 1);
  });
  u("tables().header()", "table().header()", function () {
    return this.iterator("table", function (a) {
      return a.nTHead;
    }, 1);
  });
  u("tables().footer()", "table().footer()", function () {
    return this.iterator("table", function (a) {
      return a.nTFoot;
    }, 1);
  });
  u("tables().containers()", "table().container()", function () {
    return this.iterator("table", function (a) {
      return a.nTableWrapper;
    }, 1);
  });
  o("draw()", function (a) {
    return this.iterator("table", function (b) {
      "page" === a ? P(b) : ("string" === typeof a && (a = "full-hold" === a ? !1 : !0), T(b, !1 === a));
    });
  });
  o("page()", function (a) {
    return a === k ? this.page.info().page : this.iterator("table", function (b) {
      Ta(b, a);
    });
  });
  o("page.info()", function () {
    if (0 === this.context.length) return k;
    var a = this.context[0],
        b = a._iDisplayStart,
        c = a.oFeatures.bPaginate ? a._iDisplayLength : -1,
        d = a.fnRecordsDisplay(),
        e = -1 === c;
    return {
      page: e ? 0 : Math.floor(b / c),
      pages: e ? 1 : Math.ceil(d / c),
      start: b,
      end: a.fnDisplayEnd(),
      length: c,
      recordsTotal: a.fnRecordsTotal(),
      recordsDisplay: d,
      serverSide: "ssp" === y(a)
    };
  });
  o("page.len()", function (a) {
    return a === k ? 0 !== this.context.length ? this.context[0]._iDisplayLength : k : this.iterator("table", function (b) {
      Ra(b, a);
    });
  });

  var Tb = function Tb(a, b, c) {
    if (c) {
      var d = new _s(a);
      d.one("draw", function () {
        c(d.ajax.json());
      });
    }

    if ("ssp" == y(a)) T(a, b);else {
      C(a, !0);
      var e = a.jqXHR;
      e && 4 !== e.readyState && e.abort();
      sa(a, [], function (c) {
        oa(a);

        for (var c = ta(a, c), d = 0, e = c.length; d < e; d++) {
          O(a, c[d]);
        }

        T(a, b);
        C(a, !1);
      });
    }
  };

  o("ajax.json()", function () {
    var a = this.context;
    if (0 < a.length) return a[0].json;
  });
  o("ajax.params()", function () {
    var a = this.context;
    if (0 < a.length) return a[0].oAjaxData;
  });
  o("ajax.reload()", function (a, b) {
    return this.iterator("table", function (c) {
      Tb(c, !1 === b, a);
    });
  });
  o("ajax.url()", function (a) {
    var b = this.context;

    if (a === k) {
      if (0 === b.length) return k;
      b = b[0];
      return b.ajax ? h.isPlainObject(b.ajax) ? b.ajax.url : b.ajax : b.sAjaxSource;
    }

    return this.iterator("table", function (b) {
      h.isPlainObject(b.ajax) ? b.ajax.url = a : b.ajax = a;
    });
  });
  o("ajax.url().load()", function (a, b) {
    return this.iterator("table", function (c) {
      Tb(c, !1 === b, a);
    });
  });

  var ab = function ab(a, b, c, d, e) {
    var f = [],
        g,
        j,
        i,
        m,
        l,
        n;
    i = _typeof(b);
    if (!b || "string" === i || "function" === i || b.length === k) b = [b];
    i = 0;

    for (m = b.length; i < m; i++) {
      j = b[i] && b[i].split && !b[i].match(/[\[\(:]/) ? b[i].split(",") : [b[i]];
      l = 0;

      for (n = j.length; l < n; l++) {
        (g = c("string" === typeof j[l] ? h.trim(j[l]) : j[l])) && g.length && (f = f.concat(g));
      }
    }

    a = x.selector[a];

    if (a.length) {
      i = 0;

      for (m = a.length; i < m; i++) {
        f = a[i](d, e, f);
      }
    }

    return qa(f);
  },
      bb = function bb(a) {
    a || (a = {});
    a.filter && a.search === k && (a.search = a.filter);
    return h.extend({
      search: "none",
      order: "current",
      page: "all"
    }, a);
  },
      cb = function cb(a) {
    for (var b = 0, c = a.length; b < c; b++) {
      if (0 < a[b].length) return a[0] = a[b], a[0].length = 1, a.length = 1, a.context = [a.context[b]], a;
    }

    a.length = 0;
    return a;
  },
      Ba = function Ba(a, b) {
    var c,
        d,
        e,
        f = [],
        g = a.aiDisplay;
    e = a.aiDisplayMaster;
    var j = b.search;
    c = b.order;
    d = b.page;
    if ("ssp" == y(a)) return "removed" === j ? [] : Y(0, e.length);

    if ("current" == d) {
      c = a._iDisplayStart;

      for (d = a.fnDisplayEnd(); c < d; c++) {
        f.push(g[c]);
      }
    } else if ("current" == c || "applied" == c) {
      if ("none" == j) f = e.slice();else if ("applied" == j) f = g.slice();else {
        if ("removed" == j) {
          var i = {};
          c = 0;

          for (d = g.length; c < d; c++) {
            i[g[c]] = null;
          }

          f = h.map(e, function (a) {
            return !i.hasOwnProperty(a) ? a : null;
          });
        }
      }
    } else if ("index" == c || "original" == c) {
      c = 0;

      for (d = a.aoData.length; c < d; c++) {
        "none" == j ? f.push(c) : (e = h.inArray(c, g), (-1 === e && "removed" == j || 0 <= e && "applied" == j) && f.push(c));
      }
    }

    return f;
  };

  o("rows()", function (a, b) {
    a === k ? a = "" : h.isPlainObject(a) && (b = a, a = "");
    var b = bb(b),
        c = this.iterator("table", function (c) {
      var e = b,
          f;
      return ab("row", a, function (a) {
        var b = Ob(a),
            i = c.aoData;
        if (b !== null && !e) return [b];
        f || (f = Ba(c, e));
        if (b !== null && h.inArray(b, f) !== -1) return [b];
        if (a === null || a === k || a === "") return f;
        if (typeof a === "function") return h.map(f, function (b) {
          var c = i[b];
          return a(b, c._aData, c.nTr) ? b : null;
        });

        if (a.nodeName) {
          var b = a._DT_RowIndex,
              m = a._DT_CellIndex;
          if (b !== k) return i[b] && i[b].nTr === a ? [b] : [];
          if (m) return i[m.row] && i[m.row].nTr === a ? [m.row] : [];
          b = h(a).closest("*[data-dt-row]");
          return b.length ? [b.data("dt-row")] : [];
        }

        if (typeof a === "string" && a.charAt(0) === "#") {
          b = c.aIds[a.replace(/^#/, "")];
          if (b !== k) return [b.idx];
        }

        b = Rb(ja(c.aoData, f, "nTr"));
        return h(b).filter(a).map(function () {
          return this._DT_RowIndex;
        }).toArray();
      }, c, e);
    }, 1);
    c.selector.rows = a;
    c.selector.opts = b;
    return c;
  });
  o("rows().nodes()", function () {
    return this.iterator("row", function (a, b) {
      return a.aoData[b].nTr || k;
    }, 1);
  });
  o("rows().data()", function () {
    return this.iterator(!0, "rows", function (a, b) {
      return ja(a.aoData, b, "_aData");
    }, 1);
  });
  u("rows().cache()", "row().cache()", function (a) {
    return this.iterator("row", function (b, c) {
      var d = b.aoData[c];
      return "search" === a ? d._aFilterData : d._aSortData;
    }, 1);
  });
  u("rows().invalidate()", "row().invalidate()", function (a) {
    return this.iterator("row", function (b, c) {
      da(b, c, a);
    });
  });
  u("rows().indexes()", "row().index()", function () {
    return this.iterator("row", function (a, b) {
      return b;
    }, 1);
  });
  u("rows().ids()", "row().id()", function (a) {
    for (var b = [], c = this.context, d = 0, e = c.length; d < e; d++) {
      for (var f = 0, g = this[d].length; f < g; f++) {
        var h = c[d].rowIdFn(c[d].aoData[this[d][f]]._aData);
        b.push((!0 === a ? "#" : "") + h);
      }
    }

    return new _s(c, b);
  });
  u("rows().remove()", "row().remove()", function () {
    var a = this;
    this.iterator("row", function (b, c, d) {
      var e = b.aoData,
          f = e[c],
          g,
          h,
          i,
          m,
          l;
      e.splice(c, 1);
      g = 0;

      for (h = e.length; g < h; g++) {
        if (i = e[g], l = i.anCells, null !== i.nTr && (i.nTr._DT_RowIndex = g), null !== l) {
          i = 0;

          for (m = l.length; i < m; i++) {
            l[i]._DT_CellIndex.row = g;
          }
        }
      }

      pa(b.aiDisplayMaster, c);
      pa(b.aiDisplay, c);
      pa(a[d], c, !1);
      0 < b._iRecordsDisplay && b._iRecordsDisplay--;
      Sa(b);
      c = b.rowIdFn(f._aData);
      c !== k && delete b.aIds[c];
    });
    this.iterator("table", function (a) {
      for (var c = 0, d = a.aoData.length; c < d; c++) {
        a.aoData[c].idx = c;
      }
    });
    return this;
  });
  o("rows.add()", function (a) {
    var b = this.iterator("table", function (b) {
      var c,
          f,
          g,
          h = [];
      f = 0;

      for (g = a.length; f < g; f++) {
        c = a[f], c.nodeName && "TR" === c.nodeName.toUpperCase() ? h.push(na(b, c)[0]) : h.push(O(b, c));
      }

      return h;
    }, 1),
        c = this.rows(-1);
    c.pop();
    h.merge(c, b);
    return c;
  });
  o("row()", function (a, b) {
    return cb(this.rows(a, b));
  });
  o("row().data()", function (a) {
    var b = this.context;
    if (a === k) return b.length && this.length ? b[0].aoData[this[0]]._aData : k;
    var c = b[0].aoData[this[0]];
    c._aData = a;
    h.isArray(a) && c.nTr.id && N(b[0].rowId)(a, c.nTr.id);
    da(b[0], this[0], "data");
    return this;
  });
  o("row().node()", function () {
    var a = this.context;
    return a.length && this.length ? a[0].aoData[this[0]].nTr || null : null;
  });
  o("row.add()", function (a) {
    a instanceof h && a.length && (a = a[0]);
    var b = this.iterator("table", function (b) {
      return a.nodeName && "TR" === a.nodeName.toUpperCase() ? na(b, a)[0] : O(b, a);
    });
    return this.row(b[0]);
  });

  var db = function db(a, b) {
    var c = a.context;
    if (c.length && (c = c[0].aoData[b !== k ? b : a[0]]) && c._details) c._details.remove(), c._detailsShow = k, c._details = k;
  },
      Ub = function Ub(a, b) {
    var c = a.context;

    if (c.length && a.length) {
      var d = c[0].aoData[a[0]];

      if (d._details) {
        (d._detailsShow = b) ? d._details.insertAfter(d.nTr) : d._details.detach();
        var e = c[0],
            f = new _s(e),
            g = e.aoData;
        f.off("draw.dt.DT_details column-visibility.dt.DT_details destroy.dt.DT_details");
        0 < D(g, "_details").length && (f.on("draw.dt.DT_details", function (a, b) {
          e === b && f.rows({
            page: "current"
          }).eq(0).each(function (a) {
            a = g[a];
            a._detailsShow && a._details.insertAfter(a.nTr);
          });
        }), f.on("column-visibility.dt.DT_details", function (a, b) {
          if (e === b) for (var c, d = V(b), f = 0, h = g.length; f < h; f++) {
            c = g[f], c._details && c._details.children("td[colspan]").attr("colspan", d);
          }
        }), f.on("destroy.dt.DT_details", function (a, b) {
          if (e === b) for (var c = 0, d = g.length; c < d; c++) {
            g[c]._details && db(f, c);
          }
        }));
      }
    }
  };

  o("row().child()", function (a, b) {
    var c = this.context;
    if (a === k) return c.length && this.length ? c[0].aoData[this[0]]._details : k;
    if (!0 === a) this.child.show();else if (!1 === a) db(this);else if (c.length && this.length) {
      var d = c[0],
          c = c[0].aoData[this[0]],
          e = [],
          f = function f(a, b) {
        if (h.isArray(a) || a instanceof h) for (var c = 0, k = a.length; c < k; c++) {
          f(a[c], b);
        } else a.nodeName && "tr" === a.nodeName.toLowerCase() ? e.push(a) : (c = h("<tr><td/></tr>").addClass(b), h("td", c).addClass(b).html(a)[0].colSpan = V(d), e.push(c[0]));
      };

      f(a, b);
      c._details && c._details.detach();
      c._details = h(e);
      c._detailsShow && c._details.insertAfter(c.nTr);
    }
    return this;
  });
  o(["row().child.show()", "row().child().show()"], function () {
    Ub(this, !0);
    return this;
  });
  o(["row().child.hide()", "row().child().hide()"], function () {
    Ub(this, !1);
    return this;
  });
  o(["row().child.remove()", "row().child().remove()"], function () {
    db(this);
    return this;
  });
  o("row().child.isShown()", function () {
    var a = this.context;
    return a.length && this.length ? a[0].aoData[this[0]]._detailsShow || !1 : !1;
  });

  var bc = /^([^:]+):(name|visIdx|visible)$/,
      Vb = function Vb(a, b, c, d, e) {
    for (var c = [], d = 0, f = e.length; d < f; d++) {
      c.push(B(a, e[d], b));
    }

    return c;
  };

  o("columns()", function (a, b) {
    a === k ? a = "" : h.isPlainObject(a) && (b = a, a = "");
    var b = bb(b),
        c = this.iterator("table", function (c) {
      var e = a,
          f = b,
          g = c.aoColumns,
          j = D(g, "sName"),
          i = D(g, "nTh");
      return ab("column", e, function (a) {
        var b = Ob(a);
        if (a === "") return Y(g.length);
        if (b !== null) return [b >= 0 ? b : g.length + b];

        if (typeof a === "function") {
          var e = Ba(c, f);
          return h.map(g, function (b, f) {
            return a(f, Vb(c, f, 0, 0, e), i[f]) ? f : null;
          });
        }

        var k = typeof a === "string" ? a.match(bc) : "";
        if (k) switch (k[2]) {
          case "visIdx":
          case "visible":
            b = parseInt(k[1], 10);

            if (b < 0) {
              var n = h.map(g, function (a, b) {
                return a.bVisible ? b : null;
              });
              return [n[n.length + b]];
            }

            return [aa(c, b)];

          case "name":
            return h.map(j, function (a, b) {
              return a === k[1] ? b : null;
            });

          default:
            return [];
        }
        if (a.nodeName && a._DT_CellIndex) return [a._DT_CellIndex.column];
        b = h(i).filter(a).map(function () {
          return h.inArray(this, i);
        }).toArray();
        if (b.length || !a.nodeName) return b;
        b = h(a).closest("*[data-dt-column]");
        return b.length ? [b.data("dt-column")] : [];
      }, c, f);
    }, 1);
    c.selector.cols = a;
    c.selector.opts = b;
    return c;
  });
  u("columns().header()", "column().header()", function () {
    return this.iterator("column", function (a, b) {
      return a.aoColumns[b].nTh;
    }, 1);
  });
  u("columns().footer()", "column().footer()", function () {
    return this.iterator("column", function (a, b) {
      return a.aoColumns[b].nTf;
    }, 1);
  });
  u("columns().data()", "column().data()", function () {
    return this.iterator("column-rows", Vb, 1);
  });
  u("columns().dataSrc()", "column().dataSrc()", function () {
    return this.iterator("column", function (a, b) {
      return a.aoColumns[b].mData;
    }, 1);
  });
  u("columns().cache()", "column().cache()", function (a) {
    return this.iterator("column-rows", function (b, c, d, e, f) {
      return ja(b.aoData, f, "search" === a ? "_aFilterData" : "_aSortData", c);
    }, 1);
  });
  u("columns().nodes()", "column().nodes()", function () {
    return this.iterator("column-rows", function (a, b, c, d, e) {
      return ja(a.aoData, e, "anCells", b);
    }, 1);
  });
  u("columns().visible()", "column().visible()", function (a, b) {
    var c = this.iterator("column", function (b, c) {
      if (a === k) return b.aoColumns[c].bVisible;
      var f = b.aoColumns,
          g = f[c],
          j = b.aoData,
          i,
          m,
          l;

      if (a !== k && g.bVisible !== a) {
        if (a) {
          var n = h.inArray(!0, D(f, "bVisible"), c + 1);
          i = 0;

          for (m = j.length; i < m; i++) {
            l = j[i].nTr, f = j[i].anCells, l && l.insertBefore(f[c], f[n] || null);
          }
        } else h(D(b.aoData, "anCells", c)).detach();

        g.bVisible = a;
        fa(b, b.aoHeader);
        fa(b, b.aoFooter);
        b.aiDisplay.length || h(b.nTBody).find("td[colspan]").attr("colspan", V(b));
        xa(b);
      }
    });
    a !== k && (this.iterator("column", function (c, e) {
      r(c, null, "column-visibility", [c, e, a, b]);
    }), (b === k || b) && this.columns.adjust());
    return c;
  });
  u("columns().indexes()", "column().index()", function (a) {
    return this.iterator("column", function (b, c) {
      return "visible" === a ? ba(b, c) : c;
    }, 1);
  });
  o("columns.adjust()", function () {
    return this.iterator("table", function (a) {
      $(a);
    }, 1);
  });
  o("column.index()", function (a, b) {
    if (0 !== this.context.length) {
      var c = this.context[0];
      if ("fromVisible" === a || "toData" === a) return aa(c, b);
      if ("fromData" === a || "toVisible" === a) return ba(c, b);
    }
  });
  o("column()", function (a, b) {
    return cb(this.columns(a, b));
  });
  o("cells()", function (a, b, c) {
    h.isPlainObject(a) && (a.row === k ? (c = a, a = null) : (c = b, b = null));
    h.isPlainObject(b) && (c = b, b = null);
    if (null === b || b === k) return this.iterator("table", function (b) {
      var d = a,
          e = bb(c),
          f = b.aoData,
          g = Ba(b, e),
          j = Rb(ja(f, g, "anCells")),
          i = h([].concat.apply([], j)),
          l,
          m = b.aoColumns.length,
          n,
          o,
          u,
          s,
          r,
          v;
      return ab("cell", d, function (a) {
        var c = typeof a === "function";

        if (a === null || a === k || c) {
          n = [];
          o = 0;

          for (u = g.length; o < u; o++) {
            l = g[o];

            for (s = 0; s < m; s++) {
              r = {
                row: l,
                column: s
              };

              if (c) {
                v = f[l];
                a(r, B(b, l, s), v.anCells ? v.anCells[s] : null) && n.push(r);
              } else n.push(r);
            }
          }

          return n;
        }

        if (h.isPlainObject(a)) return a.column !== k && a.row !== k && h.inArray(a.row, g) !== -1 ? [a] : [];
        c = i.filter(a).map(function (a, b) {
          return {
            row: b._DT_CellIndex.row,
            column: b._DT_CellIndex.column
          };
        }).toArray();
        if (c.length || !a.nodeName) return c;
        v = h(a).closest("*[data-dt-row]");
        return v.length ? [{
          row: v.data("dt-row"),
          column: v.data("dt-column")
        }] : [];
      }, b, e);
    });
    var d = this.columns(b),
        e = this.rows(a),
        f,
        g,
        j,
        i,
        m;
    this.iterator("table", function (a, b) {
      f = [];
      g = 0;

      for (j = e[b].length; g < j; g++) {
        i = 0;

        for (m = d[b].length; i < m; i++) {
          f.push({
            row: e[b][g],
            column: d[b][i]
          });
        }
      }
    }, 1);
    var l = this.cells(f, c);
    h.extend(l.selector, {
      cols: b,
      rows: a,
      opts: c
    });
    return l;
  });
  u("cells().nodes()", "cell().node()", function () {
    return this.iterator("cell", function (a, b, c) {
      return (a = a.aoData[b]) && a.anCells ? a.anCells[c] : k;
    }, 1);
  });
  o("cells().data()", function () {
    return this.iterator("cell", function (a, b, c) {
      return B(a, b, c);
    }, 1);
  });
  u("cells().cache()", "cell().cache()", function (a) {
    a = "search" === a ? "_aFilterData" : "_aSortData";
    return this.iterator("cell", function (b, c, d) {
      return b.aoData[c][a][d];
    }, 1);
  });
  u("cells().render()", "cell().render()", function (a) {
    return this.iterator("cell", function (b, c, d) {
      return B(b, c, d, a);
    }, 1);
  });
  u("cells().indexes()", "cell().index()", function () {
    return this.iterator("cell", function (a, b, c) {
      return {
        row: b,
        column: c,
        columnVisible: ba(a, c)
      };
    }, 1);
  });
  u("cells().invalidate()", "cell().invalidate()", function (a) {
    return this.iterator("cell", function (b, c, d) {
      da(b, c, a, d);
    });
  });
  o("cell()", function (a, b, c) {
    return cb(this.cells(a, b, c));
  });
  o("cell().data()", function (a) {
    var b = this.context,
        c = this[0];
    if (a === k) return b.length && c.length ? B(b[0], c[0].row, c[0].column) : k;
    kb(b[0], c[0].row, c[0].column, a);
    da(b[0], c[0].row, "data", c[0].column);
    return this;
  });
  o("order()", function (a, b) {
    var c = this.context;
    if (a === k) return 0 !== c.length ? c[0].aaSorting : k;
    "number" === typeof a ? a = [[a, b]] : a.length && !h.isArray(a[0]) && (a = Array.prototype.slice.call(arguments));
    return this.iterator("table", function (b) {
      b.aaSorting = a.slice();
    });
  });
  o("order.listener()", function (a, b, c) {
    return this.iterator("table", function (d) {
      Ma(d, a, b, c);
    });
  });
  o("order.fixed()", function (a) {
    if (!a) {
      var b = this.context,
          b = b.length ? b[0].aaSortingFixed : k;
      return h.isArray(b) ? {
        pre: b
      } : b;
    }

    return this.iterator("table", function (b) {
      b.aaSortingFixed = h.extend(!0, {}, a);
    });
  });
  o(["columns().order()", "column().order()"], function (a) {
    var b = this;
    return this.iterator("table", function (c, d) {
      var e = [];
      h.each(b[d], function (b, c) {
        e.push([c, a]);
      });
      c.aaSorting = e;
    });
  });
  o("search()", function (a, b, c, d) {
    var e = this.context;
    return a === k ? 0 !== e.length ? e[0].oPreviousSearch.sSearch : k : this.iterator("table", function (e) {
      e.oFeatures.bFilter && ga(e, h.extend({}, e.oPreviousSearch, {
        sSearch: a + "",
        bRegex: null === b ? !1 : b,
        bSmart: null === c ? !0 : c,
        bCaseInsensitive: null === d ? !0 : d
      }), 1);
    });
  });
  u("columns().search()", "column().search()", function (a, b, c, d) {
    return this.iterator("column", function (e, f) {
      var g = e.aoPreSearchCols;
      if (a === k) return g[f].sSearch;
      e.oFeatures.bFilter && (h.extend(g[f], {
        sSearch: a + "",
        bRegex: null === b ? !1 : b,
        bSmart: null === c ? !0 : c,
        bCaseInsensitive: null === d ? !0 : d
      }), ga(e, e.oPreviousSearch, 1));
    });
  });
  o("state()", function () {
    return this.context.length ? this.context[0].oSavedState : null;
  });
  o("state.clear()", function () {
    return this.iterator("table", function (a) {
      a.fnStateSaveCallback.call(a.oInstance, a, {});
    });
  });
  o("state.loaded()", function () {
    return this.context.length ? this.context[0].oLoadedState : null;
  });
  o("state.save()", function () {
    return this.iterator("table", function (a) {
      xa(a);
    });
  });

  n.versionCheck = n.fnVersionCheck = function (a) {
    for (var b = n.version.split("."), a = a.split("."), c, d, e = 0, f = a.length; e < f; e++) {
      if (c = parseInt(b[e], 10) || 0, d = parseInt(a[e], 10) || 0, c !== d) return c > d;
    }

    return !0;
  };

  n.isDataTable = n.fnIsDataTable = function (a) {
    var b = h(a).get(0),
        c = !1;
    if (a instanceof n.Api) return !0;
    h.each(n.settings, function (a, e) {
      var f = e.nScrollHead ? h("table", e.nScrollHead)[0] : null,
          g = e.nScrollFoot ? h("table", e.nScrollFoot)[0] : null;
      if (e.nTable === b || f === b || g === b) c = !0;
    });
    return c;
  };

  n.tables = n.fnTables = function (a) {
    var b = !1;
    h.isPlainObject(a) && (b = a.api, a = a.visible);
    var c = h.map(n.settings, function (b) {
      if (!a || a && h(b.nTable).is(":visible")) return b.nTable;
    });
    return b ? new _s(c) : c;
  };

  n.camelToHungarian = J;
  o("$()", function (a, b) {
    var c = this.rows(b).nodes(),
        c = h(c);
    return h([].concat(c.filter(a).toArray(), c.find(a).toArray()));
  });
  h.each(["on", "one", "off"], function (a, b) {
    o(b + "()", function () {
      var a = Array.prototype.slice.call(arguments);
      a[0] = h.map(a[0].split(/\s/), function (a) {
        return !a.match(/\.dt\b/) ? a + ".dt" : a;
      }).join(" ");
      var d = h(this.tables().nodes());
      d[b].apply(d, a);
      return this;
    });
  });
  o("clear()", function () {
    return this.iterator("table", function (a) {
      oa(a);
    });
  });
  o("settings()", function () {
    return new _s(this.context, this.context);
  });
  o("init()", function () {
    var a = this.context;
    return a.length ? a[0].oInit : null;
  });
  o("data()", function () {
    return this.iterator("table", function (a) {
      return D(a.aoData, "_aData");
    }).flatten();
  });
  o("destroy()", function (a) {
    a = a || !1;
    return this.iterator("table", function (b) {
      var c = b.nTableWrapper.parentNode,
          d = b.oClasses,
          e = b.nTable,
          f = b.nTBody,
          g = b.nTHead,
          j = b.nTFoot,
          i = h(e),
          f = h(f),
          k = h(b.nTableWrapper),
          l = h.map(b.aoData, function (a) {
        return a.nTr;
      }),
          o;
      b.bDestroying = !0;
      r(b, "aoDestroyCallback", "destroy", [b]);
      a || new _s(b).columns().visible(!0);
      k.off(".DT").find(":not(tbody *)").off(".DT");
      h(E).off(".DT-" + b.sInstance);
      e != g.parentNode && (i.children("thead").detach(), i.append(g));
      j && e != j.parentNode && (i.children("tfoot").detach(), i.append(j));
      b.aaSorting = [];
      b.aaSortingFixed = [];
      wa(b);
      h(l).removeClass(b.asStripeClasses.join(" "));
      h("th, td", g).removeClass(d.sSortable + " " + d.sSortableAsc + " " + d.sSortableDesc + " " + d.sSortableNone);
      f.children().detach();
      f.append(l);
      g = a ? "remove" : "detach";
      i[g]();
      k[g]();
      !a && c && (c.insertBefore(e, b.nTableReinsertBefore), i.css("width", b.sDestroyWidth).removeClass(d.sTable), (o = b.asDestroyStripes.length) && f.children().each(function (a) {
        h(this).addClass(b.asDestroyStripes[a % o]);
      }));
      c = h.inArray(b, n.settings);
      -1 !== c && n.settings.splice(c, 1);
    });
  });
  h.each(["column", "row", "cell"], function (a, b) {
    o(b + "s().every()", function (a) {
      var d = this.selector.opts,
          e = this;
      return this.iterator(b, function (f, g, h, i, m) {
        a.call(e[b](g, "cell" === b ? h : d, "cell" === b ? d : k), g, h, i, m);
      });
    });
  });
  o("i18n()", function (a, b, c) {
    var d = this.context[0],
        a = S(a)(d.oLanguage);
    a === k && (a = b);
    c !== k && h.isPlainObject(a) && (a = a[c] !== k ? a[c] : a._);
    return a.replace("%d", c);
  });
  n.version = "1.10.19";
  n.settings = [];
  n.models = {};
  n.models.oSearch = {
    bCaseInsensitive: !0,
    sSearch: "",
    bRegex: !1,
    bSmart: !0
  };
  n.models.oRow = {
    nTr: null,
    anCells: null,
    _aData: [],
    _aSortData: null,
    _aFilterData: null,
    _sFilterRow: null,
    _sRowStripe: "",
    src: null,
    idx: -1
  };
  n.models.oColumn = {
    idx: null,
    aDataSort: null,
    asSorting: null,
    bSearchable: null,
    bSortable: null,
    bVisible: null,
    _sManualType: null,
    _bAttrSrc: !1,
    fnCreatedCell: null,
    fnGetData: null,
    fnSetData: null,
    mData: null,
    mRender: null,
    nTh: null,
    nTf: null,
    sClass: null,
    sContentPadding: null,
    sDefaultContent: null,
    sName: null,
    sSortDataType: "std",
    sSortingClass: null,
    sSortingClassJUI: null,
    sTitle: null,
    sType: null,
    sWidth: null,
    sWidthOrig: null
  };
  n.defaults = {
    aaData: null,
    aaSorting: [[0, "asc"]],
    aaSortingFixed: [],
    ajax: null,
    aLengthMenu: [10, 25, 50, 100],
    aoColumns: null,
    aoColumnDefs: null,
    aoSearchCols: [],
    asStripeClasses: null,
    bAutoWidth: !0,
    bDeferRender: !1,
    bDestroy: !1,
    bFilter: !0,
    bInfo: !0,
    bLengthChange: !0,
    bPaginate: !0,
    bProcessing: !1,
    bRetrieve: !1,
    bScrollCollapse: !1,
    bServerSide: !1,
    bSort: !0,
    bSortMulti: !0,
    bSortCellsTop: !1,
    bSortClasses: !0,
    bStateSave: !1,
    fnCreatedRow: null,
    fnDrawCallback: null,
    fnFooterCallback: null,
    fnFormatNumber: function fnFormatNumber(a) {
      return a.toString().replace(/\B(?=(\d{3})+(?!\d))/g, this.oLanguage.sThousands);
    },
    fnHeaderCallback: null,
    fnInfoCallback: null,
    fnInitComplete: null,
    fnPreDrawCallback: null,
    fnRowCallback: null,
    fnServerData: null,
    fnServerParams: null,
    fnStateLoadCallback: function fnStateLoadCallback(a) {
      try {
        return JSON.parse((-1 === a.iStateDuration ? sessionStorage : localStorage).getItem("DataTables_" + a.sInstance + "_" + location.pathname));
      } catch (b) {}
    },
    fnStateLoadParams: null,
    fnStateLoaded: null,
    fnStateSaveCallback: function fnStateSaveCallback(a, b) {
      try {
        (-1 === a.iStateDuration ? sessionStorage : localStorage).setItem("DataTables_" + a.sInstance + "_" + location.pathname, JSON.stringify(b));
      } catch (c) {}
    },
    fnStateSaveParams: null,
    iStateDuration: 7200,
    iDeferLoading: null,
    iDisplayLength: 10,
    iDisplayStart: 0,
    iTabIndex: 0,
    oClasses: {},
    oLanguage: {
      oAria: {
        sSortAscending: ": activate to sort column ascending",
        sSortDescending: ": activate to sort column descending"
      },
      oPaginate: {
        sFirst: "First",
        sLast: "Last",
        sNext: "Next",
        sPrevious: "Previous"
      },
      sEmptyTable: "No data available in table",
      sInfo: "Showing _START_ to _END_ of _TOTAL_ entries",
      sInfoEmpty: "Showing 0 to 0 of 0 entries",
      sInfoFiltered: "(filtered from _MAX_ total entries)",
      sInfoPostFix: "",
      sDecimal: "",
      sThousands: ",",
      sLengthMenu: "Show _MENU_ entries",
      sLoadingRecords: "Loading...",
      sProcessing: "Processing...",
      sSearch: "Search:",
      sSearchPlaceholder: "",
      sUrl: "",
      sZeroRecords: "No matching records found"
    },
    oSearch: h.extend({}, n.models.oSearch),
    sAjaxDataProp: "data",
    sAjaxSource: null,
    sDom: "lfrtip",
    searchDelay: null,
    sPaginationType: "simple_numbers",
    sScrollX: "",
    sScrollXInner: "",
    sScrollY: "",
    sServerMethod: "GET",
    renderer: null,
    rowId: "DT_RowId"
  };
  Z(n.defaults);
  n.defaults.column = {
    aDataSort: null,
    iDataSort: -1,
    asSorting: ["asc", "desc"],
    bSearchable: !0,
    bSortable: !0,
    bVisible: !0,
    fnCreatedCell: null,
    mData: null,
    mRender: null,
    sCellType: "td",
    sClass: "",
    sContentPadding: "",
    sDefaultContent: null,
    sName: "",
    sSortDataType: "std",
    sTitle: null,
    sType: null,
    sWidth: null
  };
  Z(n.defaults.column);
  n.models.oSettings = {
    oFeatures: {
      bAutoWidth: null,
      bDeferRender: null,
      bFilter: null,
      bInfo: null,
      bLengthChange: null,
      bPaginate: null,
      bProcessing: null,
      bServerSide: null,
      bSort: null,
      bSortMulti: null,
      bSortClasses: null,
      bStateSave: null
    },
    oScroll: {
      bCollapse: null,
      iBarWidth: 0,
      sX: null,
      sXInner: null,
      sY: null
    },
    oLanguage: {
      fnInfoCallback: null
    },
    oBrowser: {
      bScrollOversize: !1,
      bScrollbarLeft: !1,
      bBounding: !1,
      barWidth: 0
    },
    ajax: null,
    aanFeatures: [],
    aoData: [],
    aiDisplay: [],
    aiDisplayMaster: [],
    aIds: {},
    aoColumns: [],
    aoHeader: [],
    aoFooter: [],
    oPreviousSearch: {},
    aoPreSearchCols: [],
    aaSorting: null,
    aaSortingFixed: [],
    asStripeClasses: null,
    asDestroyStripes: [],
    sDestroyWidth: 0,
    aoRowCallback: [],
    aoHeaderCallback: [],
    aoFooterCallback: [],
    aoDrawCallback: [],
    aoRowCreatedCallback: [],
    aoPreDrawCallback: [],
    aoInitComplete: [],
    aoStateSaveParams: [],
    aoStateLoadParams: [],
    aoStateLoaded: [],
    sTableId: "",
    nTable: null,
    nTHead: null,
    nTFoot: null,
    nTBody: null,
    nTableWrapper: null,
    bDeferLoading: !1,
    bInitialised: !1,
    aoOpenRows: [],
    sDom: null,
    searchDelay: null,
    sPaginationType: "two_button",
    iStateDuration: 0,
    aoStateSave: [],
    aoStateLoad: [],
    oSavedState: null,
    oLoadedState: null,
    sAjaxSource: null,
    sAjaxDataProp: null,
    bAjaxDataGet: !0,
    jqXHR: null,
    json: k,
    oAjaxData: k,
    fnServerData: null,
    aoServerParams: [],
    sServerMethod: null,
    fnFormatNumber: null,
    aLengthMenu: null,
    iDraw: 0,
    bDrawing: !1,
    iDrawError: -1,
    _iDisplayLength: 10,
    _iDisplayStart: 0,
    _iRecordsTotal: 0,
    _iRecordsDisplay: 0,
    oClasses: {},
    bFiltered: !1,
    bSorted: !1,
    bSortCellsTop: null,
    oInit: null,
    aoDestroyCallback: [],
    fnRecordsTotal: function fnRecordsTotal() {
      return "ssp" == y(this) ? 1 * this._iRecordsTotal : this.aiDisplayMaster.length;
    },
    fnRecordsDisplay: function fnRecordsDisplay() {
      return "ssp" == y(this) ? 1 * this._iRecordsDisplay : this.aiDisplay.length;
    },
    fnDisplayEnd: function fnDisplayEnd() {
      var a = this._iDisplayLength,
          b = this._iDisplayStart,
          c = b + a,
          d = this.aiDisplay.length,
          e = this.oFeatures,
          f = e.bPaginate;
      return e.bServerSide ? !1 === f || -1 === a ? b + d : Math.min(b + a, this._iRecordsDisplay) : !f || c > d || -1 === a ? d : c;
    },
    oInstance: null,
    sInstance: null,
    iTabIndex: 0,
    nScrollHead: null,
    nScrollFoot: null,
    aLastSort: [],
    oPlugins: {},
    rowIdFn: null,
    rowId: null
  };
  n.ext = x = {
    buttons: {},
    classes: {},
    builder: "-source-",
    errMode: "alert",
    feature: [],
    search: [],
    selector: {
      cell: [],
      column: [],
      row: []
    },
    internal: {},
    legacy: {
      ajax: null
    },
    pager: {},
    renderer: {
      pageButton: {},
      header: {}
    },
    order: {},
    type: {
      detect: [],
      search: {},
      order: {}
    },
    _unique: 0,
    fnVersionCheck: n.fnVersionCheck,
    iApiIndex: 0,
    oJUIClasses: {},
    sVersion: n.version
  };
  h.extend(x, {
    afnFiltering: x.search,
    aTypes: x.type.detect,
    ofnSearch: x.type.search,
    oSort: x.type.order,
    afnSortData: x.order,
    aoFeatures: x.feature,
    oApi: x.internal,
    oStdClasses: x.classes,
    oPagination: x.pager
  });
  h.extend(n.ext.classes, {
    sTable: "dataTable",
    sNoFooter: "no-footer",
    sPageButton: "paginate_button",
    sPageButtonActive: "current",
    sPageButtonDisabled: "disabled",
    sStripeOdd: "odd",
    sStripeEven: "even",
    sRowEmpty: "dataTables_empty",
    sWrapper: "dataTables_wrapper",
    sFilter: "dataTables_filter",
    sInfo: "dataTables_info",
    sPaging: "dataTables_paginate paging_",
    sLength: "dataTables_length",
    sProcessing: "dataTables_processing",
    sSortAsc: "sorting_asc",
    sSortDesc: "sorting_desc",
    sSortable: "sorting",
    sSortableAsc: "sorting_asc_disabled",
    sSortableDesc: "sorting_desc_disabled",
    sSortableNone: "sorting_disabled",
    sSortColumn: "sorting_",
    sFilterInput: "",
    sLengthSelect: "",
    sScrollWrapper: "dataTables_scroll",
    sScrollHead: "dataTables_scrollHead",
    sScrollHeadInner: "dataTables_scrollHeadInner",
    sScrollBody: "dataTables_scrollBody",
    sScrollFoot: "dataTables_scrollFoot",
    sScrollFootInner: "dataTables_scrollFootInner",
    sHeaderTH: "",
    sFooterTH: "",
    sSortJUIAsc: "",
    sSortJUIDesc: "",
    sSortJUI: "",
    sSortJUIAscAllowed: "",
    sSortJUIDescAllowed: "",
    sSortJUIWrapper: "",
    sSortIcon: "",
    sJUIHeader: "",
    sJUIFooter: ""
  });
  var Lb = n.ext.pager;
  h.extend(Lb, {
    simple: function simple() {
      return ["previous", "next"];
    },
    full: function full() {
      return ["first", "previous", "next", "last"];
    },
    numbers: function numbers(a, b) {
      return [ia(a, b)];
    },
    simple_numbers: function simple_numbers(a, b) {
      return ["previous", ia(a, b), "next"];
    },
    full_numbers: function full_numbers(a, b) {
      return ["first", "previous", ia(a, b), "next", "last"];
    },
    first_last_numbers: function first_last_numbers(a, b) {
      return ["first", ia(a, b), "last"];
    },
    _numbers: ia,
    numbers_length: 7
  });
  h.extend(!0, n.ext.renderer, {
    pageButton: {
      _: function _(a, b, c, d, e, f) {
        var g = a.oClasses,
            j = a.oLanguage.oPaginate,
            i = a.oLanguage.oAria.paginate || {},
            m,
            l,
            n = 0,
            o = function o(b, d) {
          var k,
              s,
              u,
              r,
              v = function v(b) {
            Ta(a, b.data.action, true);
          };

          k = 0;

          for (s = d.length; k < s; k++) {
            r = d[k];

            if (h.isArray(r)) {
              u = h("<" + (r.DT_el || "div") + "/>").appendTo(b);
              o(u, r);
            } else {
              m = null;
              l = "";

              switch (r) {
                case "ellipsis":
                  b.append('<span class="ellipsis">&#x2026;</span>');
                  break;

                case "first":
                  m = j.sFirst;
                  l = r + (e > 0 ? "" : " " + g.sPageButtonDisabled);
                  break;

                case "previous":
                  m = j.sPrevious;
                  l = r + (e > 0 ? "" : " " + g.sPageButtonDisabled);
                  break;

                case "next":
                  m = j.sNext;
                  l = r + (e < f - 1 ? "" : " " + g.sPageButtonDisabled);
                  break;

                case "last":
                  m = j.sLast;
                  l = r + (e < f - 1 ? "" : " " + g.sPageButtonDisabled);
                  break;

                default:
                  m = r + 1;
                  l = e === r ? g.sPageButtonActive : "";
              }

              if (m !== null) {
                u = h("<a>", {
                  "class": g.sPageButton + " " + l,
                  "aria-controls": a.sTableId,
                  "aria-label": i[r],
                  "data-dt-idx": n,
                  tabindex: a.iTabIndex,
                  id: c === 0 && typeof r === "string" ? a.sTableId + "_" + r : null
                }).html(m).appendTo(b);
                Wa(u, {
                  action: r
                }, v);
                n++;
              }
            }
          }
        },
            s;

        try {
          s = h(b).find(H.activeElement).data("dt-idx");
        } catch (u) {}

        o(h(b).empty(), d);
        s !== k && h(b).find("[data-dt-idx=" + s + "]").focus();
      }
    }
  });
  h.extend(n.ext.type.detect, [function (a, b) {
    var c = b.oLanguage.sDecimal;
    return $a(a, c) ? "num" + c : null;
  }, function (a) {
    if (a && !(a instanceof Date) && !Zb.test(a)) return null;
    var b = Date.parse(a);
    return null !== b && !isNaN(b) || M(a) ? "date" : null;
  }, function (a, b) {
    var c = b.oLanguage.sDecimal;
    return $a(a, c, !0) ? "num-fmt" + c : null;
  }, function (a, b) {
    var c = b.oLanguage.sDecimal;
    return Qb(a, c) ? "html-num" + c : null;
  }, function (a, b) {
    var c = b.oLanguage.sDecimal;
    return Qb(a, c, !0) ? "html-num-fmt" + c : null;
  }, function (a) {
    return M(a) || "string" === typeof a && -1 !== a.indexOf("<") ? "html" : null;
  }]);
  h.extend(n.ext.type.search, {
    html: function html(a) {
      return M(a) ? a : "string" === typeof a ? a.replace(Nb, " ").replace(Aa, "") : "";
    },
    string: function string(a) {
      return M(a) ? a : "string" === typeof a ? a.replace(Nb, " ") : a;
    }
  });

  var za = function za(a, b, c, d) {
    if (0 !== a && (!a || "-" === a)) return -Infinity;
    b && (a = Pb(a, b));
    a.replace && (c && (a = a.replace(c, "")), d && (a = a.replace(d, "")));
    return 1 * a;
  };

  h.extend(x.type.order, {
    "date-pre": function datePre(a) {
      a = Date.parse(a);
      return isNaN(a) ? -Infinity : a;
    },
    "html-pre": function htmlPre(a) {
      return M(a) ? "" : a.replace ? a.replace(/<.*?>/g, "").toLowerCase() : a + "";
    },
    "string-pre": function stringPre(a) {
      return M(a) ? "" : "string" === typeof a ? a.toLowerCase() : !a.toString ? "" : a.toString();
    },
    "string-asc": function stringAsc(a, b) {
      return a < b ? -1 : a > b ? 1 : 0;
    },
    "string-desc": function stringDesc(a, b) {
      return a < b ? 1 : a > b ? -1 : 0;
    }
  });
  Da("");
  h.extend(!0, n.ext.renderer, {
    header: {
      _: function _(a, b, c, d) {
        h(a.nTable).on("order.dt.DT", function (e, f, g, h) {
          if (a === f) {
            e = c.idx;
            b.removeClass(c.sSortingClass + " " + d.sSortAsc + " " + d.sSortDesc).addClass(h[e] == "asc" ? d.sSortAsc : h[e] == "desc" ? d.sSortDesc : c.sSortingClass);
          }
        });
      },
      jqueryui: function jqueryui(a, b, c, d) {
        h("<div/>").addClass(d.sSortJUIWrapper).append(b.contents()).append(h("<span/>").addClass(d.sSortIcon + " " + c.sSortingClassJUI)).appendTo(b);
        h(a.nTable).on("order.dt.DT", function (e, f, g, h) {
          if (a === f) {
            e = c.idx;
            b.removeClass(d.sSortAsc + " " + d.sSortDesc).addClass(h[e] == "asc" ? d.sSortAsc : h[e] == "desc" ? d.sSortDesc : c.sSortingClass);
            b.find("span." + d.sSortIcon).removeClass(d.sSortJUIAsc + " " + d.sSortJUIDesc + " " + d.sSortJUI + " " + d.sSortJUIAscAllowed + " " + d.sSortJUIDescAllowed).addClass(h[e] == "asc" ? d.sSortJUIAsc : h[e] == "desc" ? d.sSortJUIDesc : c.sSortingClassJUI);
          }
        });
      }
    }
  });

  var eb = function eb(a) {
    return "string" === typeof a ? a.replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;") : a;
  };

  n.render = {
    number: function number(a, b, c, d, e) {
      return {
        display: function display(f) {
          if ("number" !== typeof f && "string" !== typeof f) return f;
          var g = 0 > f ? "-" : "",
              h = parseFloat(f);
          if (isNaN(h)) return eb(f);
          h = h.toFixed(c);
          f = Math.abs(h);
          h = parseInt(f, 10);
          f = c ? b + (f - h).toFixed(c).substring(2) : "";
          return g + (d || "") + h.toString().replace(/\B(?=(\d{3})+(?!\d))/g, a) + f + (e || "");
        }
      };
    },
    text: function text() {
      return {
        display: eb,
        filter: eb
      };
    }
  };
  h.extend(n.ext.internal, {
    _fnExternApiFunc: Mb,
    _fnBuildAjax: sa,
    _fnAjaxUpdate: mb,
    _fnAjaxParameters: vb,
    _fnAjaxUpdateDraw: wb,
    _fnAjaxDataSrc: ta,
    _fnAddColumn: Ea,
    _fnColumnOptions: ka,
    _fnAdjustColumnSizing: $,
    _fnVisibleToColumnIndex: aa,
    _fnColumnIndexToVisible: ba,
    _fnVisbleColumns: V,
    _fnGetColumns: ma,
    _fnColumnTypes: Ga,
    _fnApplyColumnDefs: jb,
    _fnHungarianMap: Z,
    _fnCamelToHungarian: J,
    _fnLanguageCompat: Ca,
    _fnBrowserDetect: hb,
    _fnAddData: O,
    _fnAddTr: na,
    _fnNodeToDataIndex: function _fnNodeToDataIndex(a, b) {
      return b._DT_RowIndex !== k ? b._DT_RowIndex : null;
    },
    _fnNodeToColumnIndex: function _fnNodeToColumnIndex(a, b, c) {
      return h.inArray(c, a.aoData[b].anCells);
    },
    _fnGetCellData: B,
    _fnSetCellData: kb,
    _fnSplitObjNotation: Ja,
    _fnGetObjectDataFn: S,
    _fnSetObjectDataFn: N,
    _fnGetDataMaster: Ka,
    _fnClearTable: oa,
    _fnDeleteIndex: pa,
    _fnInvalidate: da,
    _fnGetRowElements: Ia,
    _fnCreateTr: Ha,
    _fnBuildHead: lb,
    _fnDrawHead: fa,
    _fnDraw: P,
    _fnReDraw: T,
    _fnAddOptionsHtml: ob,
    _fnDetectHeader: ea,
    _fnGetUniqueThs: ra,
    _fnFeatureHtmlFilter: qb,
    _fnFilterComplete: ga,
    _fnFilterCustom: zb,
    _fnFilterColumn: yb,
    _fnFilter: xb,
    _fnFilterCreateSearch: Pa,
    _fnEscapeRegex: Qa,
    _fnFilterData: Ab,
    _fnFeatureHtmlInfo: tb,
    _fnUpdateInfo: Db,
    _fnInfoMacros: Eb,
    _fnInitialise: ha,
    _fnInitComplete: ua,
    _fnLengthChange: Ra,
    _fnFeatureHtmlLength: pb,
    _fnFeatureHtmlPaginate: ub,
    _fnPageChange: Ta,
    _fnFeatureHtmlProcessing: rb,
    _fnProcessingDisplay: C,
    _fnFeatureHtmlTable: sb,
    _fnScrollDraw: la,
    _fnApplyToChildren: I,
    _fnCalculateColumnWidths: Fa,
    _fnThrottle: Oa,
    _fnConvertToWidth: Fb,
    _fnGetWidestNode: Gb,
    _fnGetMaxLenString: Hb,
    _fnStringToCss: v,
    _fnSortFlatten: X,
    _fnSort: nb,
    _fnSortAria: Jb,
    _fnSortListener: Va,
    _fnSortAttachListener: Ma,
    _fnSortingClasses: wa,
    _fnSortData: Ib,
    _fnSaveState: xa,
    _fnLoadState: Kb,
    _fnSettingsFromNode: ya,
    _fnLog: K,
    _fnMap: F,
    _fnBindAction: Wa,
    _fnCallbackReg: z,
    _fnCallbackFire: r,
    _fnLengthOverflow: Sa,
    _fnRenderer: Na,
    _fnDataSource: y,
    _fnRowAttributes: La,
    _fnExtend: Xa,
    _fnCalculateEnd: function _fnCalculateEnd() {}
  });
  h.fn.dataTable = n;
  n.$ = h;
  h.fn.dataTableSettings = n.settings;
  h.fn.dataTableExt = n.ext;

  h.fn.DataTable = function (a) {
    return h(this).dataTable(a).api();
  };

  h.each(n, function (a, b) {
    h.fn.DataTable[a] = b;
  });
  return h.fn.dataTable;
});

/***/ }),

/***/ "./external/xlsx.core.min.js":
/*!***********************************!*\
  !*** ./external/xlsx.core.min.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(Buffer, global, process) {var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var require;var require;function _typeof(obj){"@babel/helpers - typeof";if(typeof Symbol==="function"&&typeof Symbol.iterator==="symbol"){_typeof=function _typeof(obj){return typeof obj;};}else{_typeof=function _typeof(obj){return obj&&typeof Symbol==="function"&&obj.constructor===Symbol&&obj!==Symbol.prototype?"symbol":typeof obj;};}return _typeof(obj);}/*! xlsx.js (C) 2013-present SheetJS -- http://sheetjs.com */var DO_NOT_EXPORT_CODEPAGE=true;var DO_NOT_EXPORT_JSZIP=true;(function(e){if("object"==( false?undefined:_typeof(exports))&&"undefined"!=typeof module&&"undefined"==typeof DO_NOT_EXPORT_JSZIP)module.exports=e();else if( true&&"undefined"==typeof DO_NOT_EXPORT_JSZIP){JSZipSync=e();!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (e),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));}else{var r;"undefined"!=typeof globalThis?r=globalThis:"undefined"!=typeof window?r=window:"undefined"!=typeof global?r=global:"undefined"!=typeof $&&$.global?r=$.global:"undefined"!=typeof self&&(r=self),r.JSZipSync=e();}})(function(){var e,r,t;return function a(e,r,t){function n(s,f){if(!r[s]){if(!e[s]){var l=typeof require=="function"&&require;if(!f&&l)return require(s,!0);if(i)return i(s,!0);throw new Error("Cannot find module '"+s+"'");}var o=r[s]={exports:{}};e[s][0].call(o.exports,function(r){var t=e[s][1][r];return n(t?t:r);},o,o.exports,a,e,r,t);}return r[s].exports;}var i=typeof require=="function"&&require;for(var s=0;s<t.length;s++){n(t[s]);}return n;}({1:[function(e,r,t){"use strict";var a="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";t.encode=function(e,r){var t="";var n,i,s,f,l,o,c;var u=0;while(u<e.length){n=e.charCodeAt(u++);i=e.charCodeAt(u++);s=e.charCodeAt(u++);f=n>>2;l=(n&3)<<4|i>>4;o=(i&15)<<2|s>>6;c=s&63;if(isNaN(i)){o=c=64;}else if(isNaN(s)){c=64;}t=t+a.charAt(f)+a.charAt(l)+a.charAt(o)+a.charAt(c);}return t;};t.decode=function(e,r){var t="";var n,i,s;var f,l,o,c;var u=0;e=e.replace(/[^A-Za-z0-9\+\/\=]/g,"");while(u<e.length){f=a.indexOf(e.charAt(u++));l=a.indexOf(e.charAt(u++));o=a.indexOf(e.charAt(u++));c=a.indexOf(e.charAt(u++));n=f<<2|l>>4;i=(l&15)<<4|o>>2;s=(o&3)<<6|c;t=t+String.fromCharCode(n);if(o!=64){t=t+String.fromCharCode(i);}if(c!=64){t=t+String.fromCharCode(s);}}return t;};},{}],2:[function(e,r,t){"use strict";function a(){this.compressedSize=0;this.uncompressedSize=0;this.crc32=0;this.compressionMethod=null;this.compressedContent=null;}a.prototype={getContent:function getContent(){return null;},getCompressedContent:function getCompressedContent(){return null;}};r.exports=a;},{}],3:[function(e,r,t){"use strict";t.STORE={magic:"\0\0",compress:function compress(e){return e;},uncompress:function uncompress(e){return e;},compressInputType:null,uncompressInputType:null};t.DEFLATE=e("./flate");},{"./flate":8}],4:[function(e,r,t){"use strict";var a=e("./utils");var n=[0,1996959894,3993919788,2567524794,124634137,1886057615,3915621685,2657392035,249268274,2044508324,3772115230,2547177864,162941995,2125561021,3887607047,2428444049,498536548,1789927666,4089016648,2227061214,450548861,1843258603,4107580753,2211677639,325883990,1684777152,4251122042,2321926636,335633487,1661365465,4195302755,2366115317,997073096,1281953886,3579855332,2724688242,1006888145,1258607687,3524101629,2768942443,901097722,1119000684,3686517206,2898065728,853044451,1172266101,3705015759,2882616665,651767980,1373503546,3369554304,3218104598,565507253,1454621731,3485111705,3099436303,671266974,1594198024,3322730930,2970347812,795835527,1483230225,3244367275,3060149565,1994146192,31158534,2563907772,4023717930,1907459465,112637215,2680153253,3904427059,2013776290,251722036,2517215374,3775830040,2137656763,141376813,2439277719,3865271297,1802195444,476864866,2238001368,4066508878,1812370925,453092731,2181625025,4111451223,1706088902,314042704,2344532202,4240017532,1658658271,366619977,2362670323,4224994405,1303535960,984961486,2747007092,3569037538,1256170817,1037604311,2765210733,3554079995,1131014506,879679996,2909243462,3663771856,1141124467,855842277,2852801631,3708648649,1342533948,654459306,3188396048,3373015174,1466479909,544179635,3110523913,3462522015,1591671054,702138776,2966460450,3352799412,1504918807,783551873,3082640443,3233442989,3988292384,2596254646,62317068,1957810842,3939845945,2647816111,81470997,1943803523,3814918930,2489596804,225274430,2053790376,3826175755,2466906013,167816743,2097651377,4027552580,2265490386,503444072,1762050814,4150417245,2154129355,426522225,1852507879,4275313526,2312317920,282753626,1742555852,4189708143,2394877945,397917763,1622183637,3604390888,2714866558,953729732,1340076626,3518719985,2797360999,1068828381,1219638859,3624741850,2936675148,906185462,1090812512,3747672003,2825379669,829329135,1181335161,3412177804,3160834842,628085408,1382605366,3423369109,3138078467,570562233,1426400815,3317316542,2998733608,733239954,1555261956,3268935591,3050360625,752459403,1541320221,2607071920,3965973030,1969922972,40735498,2617837225,3943577151,1913087877,83908371,2512341634,3803740692,2075208622,213261112,2463272603,3855990285,2094854071,198958881,2262029012,4057260610,1759359992,534414190,2176718541,4139329115,1873836001,414664567,2282248934,4279200368,1711684554,285281116,2405801727,4167216745,1634467795,376229701,2685067896,3608007406,1308918612,956543938,2808555105,3495958263,1231636301,1047427035,2932959818,3654703836,1088359270,936918e3,2847714899,3736837829,1202900863,817233897,3183342108,3401237130,1404277552,615818150,3134207493,3453421203,1423857449,601450431,3009837614,3294710456,1567103746,711928724,3020668471,3272380065,1510334235,755167117];r.exports=function i(e,r){if(typeof e==="undefined"||!e.length){return 0;}var t=a.getTypeOf(e)!=="string";if(typeof r=="undefined"){r=0;}var i=0;var s=0;var f=0;r=r^-1;for(var l=0,o=e.length;l<o;l++){f=t?e[l]:e.charCodeAt(l);s=(r^f)&255;i=n[s];r=r>>>8^i;}return r^-1;};},{"./utils":21}],5:[function(e,r,t){"use strict";var a=e("./utils");function n(e){this.data=null;this.length=0;this.index=0;}n.prototype={checkOffset:function checkOffset(e){this.checkIndex(this.index+e);},checkIndex:function checkIndex(e){if(this.length<e||e<0){throw new Error("End of data reached (data length = "+this.length+", asked index = "+e+"). Corrupted zip ?");}},setIndex:function setIndex(e){this.checkIndex(e);this.index=e;},skip:function skip(e){this.setIndex(this.index+e);},byteAt:function byteAt(e){},readInt:function readInt(e){var r=0,t;this.checkOffset(e);for(t=this.index+e-1;t>=this.index;t--){r=(r<<8)+this.byteAt(t);}this.index+=e;return r;},readString:function readString(e){return a.transformTo("string",this.readData(e));},readData:function readData(e){},lastIndexOfSignature:function lastIndexOfSignature(e){},readDate:function readDate(){var e=this.readInt(4);return new Date((e>>25&127)+1980,(e>>21&15)-1,e>>16&31,e>>11&31,e>>5&63,(e&31)<<1);}};r.exports=n;},{"./utils":21}],6:[function(e,r,t){"use strict";t.base64=false;t.binary=false;t.dir=false;t.createFolders=false;t.date=null;t.compression=null;t.comment=null;},{}],7:[function(e,r,t){"use strict";var a=e("./utils");t.string2binary=function(e){return a.string2binary(e);};t.string2Uint8Array=function(e){return a.transformTo("uint8array",e);};t.uint8Array2String=function(e){return a.transformTo("string",e);};t.string2Blob=function(e){var r=a.transformTo("arraybuffer",e);return a.arrayBuffer2Blob(r);};t.arrayBuffer2Blob=function(e){return a.arrayBuffer2Blob(e);};t.transformTo=function(e,r){return a.transformTo(e,r);};t.getTypeOf=function(e){return a.getTypeOf(e);};t.checkSupport=function(e){return a.checkSupport(e);};t.MAX_VALUE_16BITS=a.MAX_VALUE_16BITS;t.MAX_VALUE_32BITS=a.MAX_VALUE_32BITS;t.pretty=function(e){return a.pretty(e);};t.findCompression=function(e){return a.findCompression(e);};t.isRegExp=function(e){return a.isRegExp(e);};},{"./utils":21}],8:[function(e,r,t){"use strict";var a=typeof Uint8Array!=="undefined"&&typeof Uint16Array!=="undefined"&&typeof Uint32Array!=="undefined";var n=e("pako");t.uncompressInputType=a?"uint8array":"array";t.compressInputType=a?"uint8array":"array";t.magic="\b\0";t.compress=function(e){return n.deflateRaw(e);};t.uncompress=function(e){return n.inflateRaw(e);};},{pako:24}],9:[function(e,r,t){"use strict";var a=e("./base64");function n(e,r){if(!(this instanceof n))return new n(e,r);this.files={};this.comment=null;this.root="";if(e){this.load(e,r);}this.clone=function(){var e=new n();for(var r in this){if(typeof this[r]!=="function"){e[r]=this[r];}}return e;};}n.prototype=e("./object");n.prototype.load=e("./load");n.support=e("./support");n.defaults=e("./defaults");n.utils=e("./deprecatedPublicUtils");n.base64={encode:function encode(e){return a.encode(e);},decode:function decode(e){return a.decode(e);}};n.compressions=e("./compressions");r.exports=n;},{"./base64":1,"./compressions":3,"./defaults":6,"./deprecatedPublicUtils":7,"./load":10,"./object":13,"./support":17}],10:[function(e,r,t){"use strict";var a=e("./base64");var n=e("./zipEntries");r.exports=function(e,r){var t,i,s,f;r=r||{};if(r.base64){e=a.decode(e);}i=new n(e,r);t=i.files;for(s=0;s<t.length;s++){f=t[s];this.file(f.fileName,f.decompressed,{binary:true,optimizedBinaryString:true,date:f.date,dir:f.dir,comment:f.fileComment.length?f.fileComment:null,createFolders:r.createFolders});}if(i.zipComment.length){this.comment=i.zipComment;}return this;};},{"./base64":1,"./zipEntries":22}],11:[function(e,r,t){(function(e){"use strict";var t=function t(){};if(typeof e!=="undefined"){var a=!e.from;if(!a)try{e.from("foo","utf8");}catch(n){a=true;}t=a?function(r,t){return t?new e(r,t):new e(r);}:e.from.bind(e);if(!e.alloc)e.alloc=function(r){return new e(r);};}r.exports=function(r,a){return typeof r=="number"?e.alloc(r):t(r,a);};r.exports.test=function(r){return e.isBuffer(r);};}).call(this,typeof Buffer!=="undefined"?Buffer:undefined);},{}],12:[function(e,r,t){"use strict";var a=e("./uint8ArrayReader");function n(e){this.data=e;this.length=this.data.length;this.index=0;}n.prototype=new a();n.prototype.readData=function(e){this.checkOffset(e);var r=this.data.slice(this.index,this.index+e);this.index+=e;return r;};r.exports=n;},{"./uint8ArrayReader":18}],13:[function(e,r,t){"use strict";var a=e("./support");var n=e("./utils");var i=e("./crc32");var s=e("./signature");var f=e("./defaults");var l=e("./base64");var o=e("./compressions");var c=e("./compressedObject");var u=e("./nodeBuffer");var h=e("./utf8");var d=e("./stringWriter");var v=e("./uint8ArrayWriter");var p=function p(e){if(e._data instanceof c){e._data=e._data.getContent();e.options.binary=true;e.options.base64=false;if(n.getTypeOf(e._data)==="uint8array"){var r=e._data;e._data=new Uint8Array(r.length);if(r.length!==0){e._data.set(r,0);}}}return e._data;};var m=function m(e){var r=p(e),t=n.getTypeOf(r);if(t==="string"){if(!e.options.binary){if(a.nodebuffer){return u(r,"utf-8");}}return e.asBinary();}return r;};var b=function b(e){var r=p(this);if(r===null||typeof r==="undefined"){return"";}if(this.options.base64){r=l.decode(r);}if(e&&this.options.binary){r=y.utf8decode(r);}else{r=n.transformTo("string",r);}if(!e&&!this.options.binary){r=n.transformTo("string",y.utf8encode(r));}return r;};var g=function g(e,r,t){this.name=e;this.dir=t.dir;this.date=t.date;this.comment=t.comment;this._data=r;this.options=t;this._initialMetadata={dir:t.dir,date:t.date};};g.prototype={asText:function asText(){return b.call(this,true);},asBinary:function asBinary(){return b.call(this,false);},asNodeBuffer:function asNodeBuffer(){var e=m(this);return n.transformTo("nodebuffer",e);},asUint8Array:function asUint8Array(){var e=m(this);return n.transformTo("uint8array",e);},asArrayBuffer:function asArrayBuffer(){return this.asUint8Array().buffer;}};var w=function w(e,r){var t="",a;for(a=0;a<r;a++){t+=String.fromCharCode(e&255);e=e>>>8;}return t;};var k=function k(){var e={},r,t;for(r=0;r<arguments.length;r++){for(t in arguments[r]){if(arguments[r].hasOwnProperty(t)&&typeof e[t]==="undefined"){e[t]=arguments[r][t];}}}return e;};var E=function E(e){e=e||{};if(e.base64===true&&(e.binary===null||e.binary===undefined)){e.binary=true;}e=k(e,f);e.date=e.date||new Date();if(e.compression!==null)e.compression=e.compression.toUpperCase();return e;};var S=function S(e,r,t){var a=n.getTypeOf(r),i;t=E(t);if(t.createFolders&&(i=_(e))){C.call(this,i,true);}if(t.dir||r===null||typeof r==="undefined"){t.base64=false;t.binary=false;r=null;}else if(a==="string"){if(t.binary&&!t.base64){if(t.optimizedBinaryString!==true){r=n.string2binary(r);}}}else{t.base64=false;t.binary=true;if(!a&&!(r instanceof c)){throw new Error("The data of '"+e+"' is in an unsupported format !");}if(a==="arraybuffer"){r=n.transformTo("uint8array",r);}}var s=new g(e,r,t);this.files[e]=s;return s;};var _=function _(e){if(e.slice(-1)=="/"){e=e.substring(0,e.length-1);}var r=e.lastIndexOf("/");return r>0?e.substring(0,r):"";};var C=function C(e,r){if(e.slice(-1)!="/"){e+="/";}r=typeof r!=="undefined"?r:false;if(!this.files[e]){S.call(this,e,null,{dir:true,createFolders:r});}return this.files[e];};var B=function B(e,r){var t=new c(),a;if(e._data instanceof c){t.uncompressedSize=e._data.uncompressedSize;t.crc32=e._data.crc32;if(t.uncompressedSize===0||e.dir){r=o["STORE"];t.compressedContent="";t.crc32=0;}else if(e._data.compressionMethod===r.magic){t.compressedContent=e._data.getCompressedContent();}else{a=e._data.getContent();t.compressedContent=r.compress(n.transformTo(r.compressInputType,a));}}else{a=m(e);if(!a||a.length===0||e.dir){r=o["STORE"];a="";}t.uncompressedSize=a.length;t.crc32=i(a);t.compressedContent=r.compress(n.transformTo(r.compressInputType,a));}t.compressedSize=t.compressedContent.length;t.compressionMethod=r.magic;return t;};var T=function T(e,r,t,a){var f=t.compressedContent,l=n.transformTo("string",h.utf8encode(r.name)),o=r.comment||"",c=n.transformTo("string",h.utf8encode(o)),u=l.length!==r.name.length,d=c.length!==o.length,v=r.options,p,m,b="",g="",k="",E,S;if(r._initialMetadata.dir!==r.dir){E=r.dir;}else{E=v.dir;}if(r._initialMetadata.date!==r.date){S=r.date;}else{S=v.date;}p=S.getHours();p=p<<6;p=p|S.getMinutes();p=p<<5;p=p|S.getSeconds()/2;m=S.getFullYear()-1980;m=m<<4;m=m|S.getMonth()+1;m=m<<5;m=m|S.getDate();if(u){g=w(1,1)+w(i(l),4)+l;b+="up"+w(g.length,2)+g;}if(d){k=w(1,1)+w(this.crc32(c),4)+c;b+="uc"+w(k.length,2)+k;}var _="";_+="\n\0";_+=u||d?"\0\b":"\0\0";_+=t.compressionMethod;_+=w(p,2);_+=w(m,2);_+=w(t.crc32,4);_+=w(t.compressedSize,4);_+=w(t.uncompressedSize,4);_+=w(l.length,2);_+=w(b.length,2);var C=s.LOCAL_FILE_HEADER+_+l+b;var B=s.CENTRAL_FILE_HEADER+"\0"+_+w(c.length,2)+"\0\0"+"\0\0"+(E===true?"\0\0\0":"\0\0\0\0")+w(a,4)+l+b+c;return{fileRecord:C,dirRecord:B,compressedObject:t};};var y={load:function load(e,r){throw new Error("Load method is not defined. Is the file jszip-load.js included ?");},filter:function filter(e){var r=[],t,a,n,i;for(t in this.files){if(!this.files.hasOwnProperty(t)){continue;}n=this.files[t];i=new g(n.name,n._data,k(n.options));a=t.slice(this.root.length,t.length);if(t.slice(0,this.root.length)===this.root&&e(a,i)){r.push(i);}}return r;},file:function file(e,r,t){if(arguments.length===1){if(n.isRegExp(e)){var a=e;return this.filter(function(e,r){return!r.dir&&a.test(e);});}else{return this.filter(function(r,t){return!t.dir&&r===e;})[0]||null;}}else{e=this.root+e;S.call(this,e,r,t);}return this;},folder:function folder(e){if(!e){return this;}if(n.isRegExp(e)){return this.filter(function(r,t){return t.dir&&e.test(r);});}var r=this.root+e;var t=C.call(this,r);var a=this.clone();a.root=t.name;return a;},remove:function remove(e){e=this.root+e;var r=this.files[e];if(!r){if(e.slice(-1)!="/"){e+="/";}r=this.files[e];}if(r&&!r.dir){delete this.files[e];}else{var t=this.filter(function(r,t){return t.name.slice(0,e.length)===e;});for(var a=0;a<t.length;a++){delete this.files[t[a].name];}}return this;},generate:function generate(e){e=k(e||{},{base64:true,compression:"STORE",type:"base64",comment:null});n.checkSupport(e.type);var r=[],t=0,a=0,i,f,c=n.transformTo("string",this.utf8encode(e.comment||this.comment||""));for(var u in this.files){if(!this.files.hasOwnProperty(u)){continue;}var h=this.files[u];var p=h.options.compression||e.compression.toUpperCase();var m=o[p];if(!m){throw new Error(p+" is not a valid compression method !");}var b=B.call(this,h,m);var g=T.call(this,u,h,b,t);t+=g.fileRecord.length+b.compressedSize;a+=g.dirRecord.length;r.push(g);}var E="";E=s.CENTRAL_DIRECTORY_END+"\0\0"+"\0\0"+w(r.length,2)+w(r.length,2)+w(a,4)+w(t,4)+w(c.length,2)+c;var S=e.type.toLowerCase();if(S==="uint8array"||S==="arraybuffer"||S==="blob"||S==="nodebuffer"){i=new v(t+a+E.length);}else{i=new d(t+a+E.length);}for(f=0;f<r.length;f++){i.append(r[f].fileRecord);i.append(r[f].compressedObject.compressedContent);}for(f=0;f<r.length;f++){i.append(r[f].dirRecord);}i.append(E);var _=i.finalize();switch(e.type.toLowerCase()){case"uint8array":;case"arraybuffer":;case"nodebuffer":return n.transformTo(e.type.toLowerCase(),_);case"blob":return n.arrayBuffer2Blob(n.transformTo("arraybuffer",_));case"base64":return e.base64?l.encode(_):_;default:return _;}},crc32:function crc32(e,r){return i(e,r);},utf8encode:function utf8encode(e){return n.transformTo("string",h.utf8encode(e));},utf8decode:function utf8decode(e){return h.utf8decode(e);}};r.exports=y;},{"./base64":1,"./compressedObject":2,"./compressions":3,"./crc32":4,"./defaults":6,"./nodeBuffer":11,"./signature":14,"./stringWriter":16,"./support":17,"./uint8ArrayWriter":19,"./utf8":20,"./utils":21}],14:[function(e,r,t){"use strict";t.LOCAL_FILE_HEADER="PK";t.CENTRAL_FILE_HEADER="PK";t.CENTRAL_DIRECTORY_END="PK";t.ZIP64_CENTRAL_DIRECTORY_LOCATOR="PK";t.ZIP64_CENTRAL_DIRECTORY_END="PK";t.DATA_DESCRIPTOR="PK\b";},{}],15:[function(e,r,t){"use strict";var a=e("./dataReader");var n=e("./utils");function i(e,r){this.data=e;if(!r){this.data=n.string2binary(this.data);}this.length=this.data.length;this.index=0;}i.prototype=new a();i.prototype.byteAt=function(e){return this.data.charCodeAt(e);};i.prototype.lastIndexOfSignature=function(e){return this.data.lastIndexOf(e);};i.prototype.readData=function(e){this.checkOffset(e);var r=this.data.slice(this.index,this.index+e);this.index+=e;return r;};r.exports=i;},{"./dataReader":5,"./utils":21}],16:[function(e,r,t){"use strict";var a=e("./utils");var n=function n(){this.data=[];};n.prototype={append:function append(e){e=a.transformTo("string",e);this.data.push(e);},finalize:function finalize(){return this.data.join("");}};r.exports=n;},{"./utils":21}],17:[function(e,r,t){(function(e){"use strict";t.base64=true;t.array=true;t.string=true;t.arraybuffer=typeof ArrayBuffer!=="undefined"&&typeof Uint8Array!=="undefined";t.nodebuffer=typeof e!=="undefined";t.uint8array=typeof Uint8Array!=="undefined";if(typeof ArrayBuffer==="undefined"){t.blob=false;}else{var r=new ArrayBuffer(0);try{t.blob=new Blob([r],{type:"application/zip"}).size===0;}catch(a){try{var n=window.BlobBuilder||window.WebKitBlobBuilder||window.MozBlobBuilder||window.MSBlobBuilder;var i=new n();i.append(r);t.blob=i.getBlob("application/zip").size===0;}catch(a){t.blob=false;}}}}).call(this,typeof Buffer!=="undefined"?Buffer:undefined);},{}],18:[function(e,r,t){"use strict";var a=e("./dataReader");function n(e){if(e){this.data=e;this.length=this.data.length;this.index=0;}}n.prototype=new a();n.prototype.byteAt=function(e){return this.data[e];};n.prototype.lastIndexOfSignature=function(e){var r=e.charCodeAt(0),t=e.charCodeAt(1),a=e.charCodeAt(2),n=e.charCodeAt(3);for(var i=this.length-4;i>=0;--i){if(this.data[i]===r&&this.data[i+1]===t&&this.data[i+2]===a&&this.data[i+3]===n){return i;}}return-1;};n.prototype.readData=function(e){this.checkOffset(e);if(e===0){return new Uint8Array(0);}var r=this.data.subarray(this.index,this.index+e);this.index+=e;return r;};r.exports=n;},{"./dataReader":5}],19:[function(e,r,t){"use strict";var a=e("./utils");var n=function n(e){this.data=new Uint8Array(e);this.index=0;};n.prototype={append:function append(e){if(e.length!==0){e=a.transformTo("uint8array",e);this.data.set(e,this.index);this.index+=e.length;}},finalize:function finalize(){return this.data;}};r.exports=n;},{"./utils":21}],20:[function(e,r,t){"use strict";var a=e("./utils");var n=e("./support");var i=e("./nodeBuffer");var s=new Array(256);for(var f=0;f<256;f++){s[f]=f>=252?6:f>=248?5:f>=240?4:f>=224?3:f>=192?2:1;}s[254]=s[254]=1;var l=function l(e){var r,t,a,i,s,f=e.length,l=0;for(i=0;i<f;i++){t=e.charCodeAt(i);if((t&64512)===55296&&i+1<f){a=e.charCodeAt(i+1);if((a&64512)===56320){t=65536+(t-55296<<10)+(a-56320);i++;}}l+=t<128?1:t<2048?2:t<65536?3:4;}if(n.uint8array){r=new Uint8Array(l);}else{r=new Array(l);}for(s=0,i=0;s<l;i++){t=e.charCodeAt(i);if((t&64512)===55296&&i+1<f){a=e.charCodeAt(i+1);if((a&64512)===56320){t=65536+(t-55296<<10)+(a-56320);i++;}}if(t<128){r[s++]=t;}else if(t<2048){r[s++]=192|t>>>6;r[s++]=128|t&63;}else if(t<65536){r[s++]=224|t>>>12;r[s++]=128|t>>>6&63;r[s++]=128|t&63;}else{r[s++]=240|t>>>18;r[s++]=128|t>>>12&63;r[s++]=128|t>>>6&63;r[s++]=128|t&63;}}return r;};var o=function o(e,r){var t;r=r||e.length;if(r>e.length){r=e.length;}t=r-1;while(t>=0&&(e[t]&192)===128){t--;}if(t<0){return r;}if(t===0){return r;}return t+s[e[t]]>r?t:r;};var c=function c(e){var r,t,n,i,f;var l=e.length;var o=new Array(l*2);for(n=0,t=0;t<l;){i=e[t++];if(i<128){o[n++]=i;continue;}f=s[i];if(f>4){o[n++]=65533;t+=f-1;continue;}i&=f===2?31:f===3?15:7;while(f>1&&t<l){i=i<<6|e[t++]&63;f--;}if(f>1){o[n++]=65533;continue;}if(i<65536){o[n++]=i;}else{i-=65536;o[n++]=55296|i>>10&1023;o[n++]=56320|i&1023;}}if(o.length!==n){if(o.subarray){o=o.subarray(0,n);}else{o.length=n;}}return a.applyFromCharCode(o);};t.utf8encode=function u(e){if(n.nodebuffer){return i(e,"utf-8");}return l(e);};t.utf8decode=function h(e){if(n.nodebuffer){return a.transformTo("nodebuffer",e).toString("utf-8");}e=a.transformTo(n.uint8array?"uint8array":"array",e);var r=[],t=0,i=e.length,s=65536;while(t<i){var f=o(e,Math.min(t+s,i));if(n.uint8array){r.push(c(e.subarray(t,f)));}else{r.push(c(e.slice(t,f)));}t=f;}return r.join("");};},{"./nodeBuffer":11,"./support":17,"./utils":21}],21:[function(e,r,t){"use strict";var a=e("./support");var n=e("./compressions");var i=e("./nodeBuffer");t.string2binary=function(e){var r="";for(var t=0;t<e.length;t++){r+=String.fromCharCode(e.charCodeAt(t)&255);}return r;};t.arrayBuffer2Blob=function(e){t.checkSupport("blob");try{return new Blob([e],{type:"application/zip"});}catch(r){try{var a=window.BlobBuilder||window.WebKitBlobBuilder||window.MozBlobBuilder||window.MSBlobBuilder;var n=new a();n.append(e);return n.getBlob("application/zip");}catch(r){throw new Error("Bug : can't construct the Blob.");}}};function s(e){return e;}function f(e,r){for(var t=0;t<e.length;++t){r[t]=e.charCodeAt(t)&255;}return r;}function l(e){var r=65536;var a=[],n=e.length,s=t.getTypeOf(e),f=0,l=true;try{switch(s){case"uint8array":String.fromCharCode.apply(null,new Uint8Array(0));break;case"nodebuffer":String.fromCharCode.apply(null,i(0));break;}}catch(o){l=false;}if(!l){var c="";for(var u=0;u<e.length;u++){c+=String.fromCharCode(e[u]);}return c;}while(f<n&&r>1){try{if(s==="array"||s==="nodebuffer"){a.push(String.fromCharCode.apply(null,e.slice(f,Math.min(f+r,n))));}else{a.push(String.fromCharCode.apply(null,e.subarray(f,Math.min(f+r,n))));}f+=r;}catch(o){r=Math.floor(r/2);}}return a.join("");}t.applyFromCharCode=l;function o(e,r){for(var t=0;t<e.length;t++){r[t]=e[t];}return r;}var c={};c["string"]={string:s,array:function array(e){return f(e,new Array(e.length));},arraybuffer:function arraybuffer(e){return c["string"]["uint8array"](e).buffer;},uint8array:function uint8array(e){return f(e,new Uint8Array(e.length));},nodebuffer:function nodebuffer(e){return f(e,i(e.length));}};c["array"]={string:l,array:s,arraybuffer:function arraybuffer(e){return new Uint8Array(e).buffer;},uint8array:function uint8array(e){return new Uint8Array(e);},nodebuffer:function nodebuffer(e){return i(e);}};c["arraybuffer"]={string:function string(e){return l(new Uint8Array(e));},array:function array(e){return o(new Uint8Array(e),new Array(e.byteLength));},arraybuffer:s,uint8array:function uint8array(e){return new Uint8Array(e);},nodebuffer:function nodebuffer(e){return i(new Uint8Array(e));}};c["uint8array"]={string:l,array:function array(e){return o(e,new Array(e.length));},arraybuffer:function arraybuffer(e){return e.buffer;},uint8array:s,nodebuffer:function nodebuffer(e){return i(e);}};c["nodebuffer"]={string:l,array:function array(e){return o(e,new Array(e.length));},arraybuffer:function arraybuffer(e){return c["nodebuffer"]["uint8array"](e).buffer;},uint8array:function uint8array(e){return o(e,new Uint8Array(e.length));},nodebuffer:s};t.transformTo=function(e,r){if(!r){r="";}if(!e){return r;}t.checkSupport(e);var a=t.getTypeOf(r);var n=c[a][e](r);return n;};t.getTypeOf=function(e){if(typeof e==="string"){return"string";}if(Object.prototype.toString.call(e)==="[object Array]"){return"array";}if(a.nodebuffer&&i.test(e)){return"nodebuffer";}if(a.uint8array&&e instanceof Uint8Array){return"uint8array";}if(a.arraybuffer&&e instanceof ArrayBuffer){return"arraybuffer";}};t.checkSupport=function(e){var r=a[e.toLowerCase()];if(!r){throw new Error(e+" is not supported by this browser");}};t.MAX_VALUE_16BITS=65535;t.MAX_VALUE_32BITS=-1;t.pretty=function(e){var r="",t,a;for(a=0;a<(e||"").length;a++){t=e.charCodeAt(a);r+="\\x"+(t<16?"0":"")+t.toString(16).toUpperCase();}return r;};t.findCompression=function(e){for(var r in n){if(!n.hasOwnProperty(r)){continue;}if(n[r].magic===e){return n[r];}}return null;};t.isRegExp=function(e){return Object.prototype.toString.call(e)==="[object RegExp]";};},{"./compressions":3,"./nodeBuffer":11,"./support":17}],22:[function(e,r,t){"use strict";var a=e("./stringReader");var n=e("./nodeBufferReader");var i=e("./uint8ArrayReader");var s=e("./utils");var f=e("./signature");var l=e("./zipEntry");var o=e("./support");var c=e("./object");function u(e,r){this.files=[];this.loadOptions=r;if(e){this.load(e);}}u.prototype={checkSignature:function checkSignature(e){var r=this.reader.readString(4);if(r!==e){throw new Error("Corrupted zip or bug : unexpected signature "+"("+s.pretty(r)+", expected "+s.pretty(e)+")");}},readBlockEndOfCentral:function readBlockEndOfCentral(){this.diskNumber=this.reader.readInt(2);this.diskWithCentralDirStart=this.reader.readInt(2);this.centralDirRecordsOnThisDisk=this.reader.readInt(2);this.centralDirRecords=this.reader.readInt(2);this.centralDirSize=this.reader.readInt(4);this.centralDirOffset=this.reader.readInt(4);this.zipCommentLength=this.reader.readInt(2);this.zipComment=this.reader.readString(this.zipCommentLength);this.zipComment=c.utf8decode(this.zipComment);},readBlockZip64EndOfCentral:function readBlockZip64EndOfCentral(){this.zip64EndOfCentralSize=this.reader.readInt(8);this.versionMadeBy=this.reader.readString(2);this.versionNeeded=this.reader.readInt(2);this.diskNumber=this.reader.readInt(4);this.diskWithCentralDirStart=this.reader.readInt(4);this.centralDirRecordsOnThisDisk=this.reader.readInt(8);this.centralDirRecords=this.reader.readInt(8);this.centralDirSize=this.reader.readInt(8);this.centralDirOffset=this.reader.readInt(8);this.zip64ExtensibleData={};var e=this.zip64EndOfCentralSize-44,r=0,t,a,n;while(r<e){t=this.reader.readInt(2);a=this.reader.readInt(4);n=this.reader.readString(a);this.zip64ExtensibleData[t]={id:t,length:a,value:n};}},readBlockZip64EndOfCentralLocator:function readBlockZip64EndOfCentralLocator(){this.diskWithZip64CentralDirStart=this.reader.readInt(4);this.relativeOffsetEndOfZip64CentralDir=this.reader.readInt(8);this.disksCount=this.reader.readInt(4);if(this.disksCount>1){throw new Error("Multi-volumes zip are not supported");}},readLocalFiles:function readLocalFiles(){var e,r;for(e=0;e<this.files.length;e++){r=this.files[e];this.reader.setIndex(r.localHeaderOffset);this.checkSignature(f.LOCAL_FILE_HEADER);r.readLocalPart(this.reader);r.handleUTF8();}},readCentralDir:function readCentralDir(){var e;this.reader.setIndex(this.centralDirOffset);while(this.reader.readString(4)===f.CENTRAL_FILE_HEADER){e=new l({zip64:this.zip64},this.loadOptions);e.readCentralPart(this.reader);this.files.push(e);}},readEndOfCentral:function readEndOfCentral(){var e=this.reader.lastIndexOfSignature(f.CENTRAL_DIRECTORY_END);if(e===-1){throw new Error("Corrupted zip : can't find end of central directory");}this.reader.setIndex(e);this.checkSignature(f.CENTRAL_DIRECTORY_END);this.readBlockEndOfCentral();if(this.diskNumber===s.MAX_VALUE_16BITS||this.diskWithCentralDirStart===s.MAX_VALUE_16BITS||this.centralDirRecordsOnThisDisk===s.MAX_VALUE_16BITS||this.centralDirRecords===s.MAX_VALUE_16BITS||this.centralDirSize===s.MAX_VALUE_32BITS||this.centralDirOffset===s.MAX_VALUE_32BITS){this.zip64=true;e=this.reader.lastIndexOfSignature(f.ZIP64_CENTRAL_DIRECTORY_LOCATOR);if(e===-1){throw new Error("Corrupted zip : can't find the ZIP64 end of central directory locator");}this.reader.setIndex(e);this.checkSignature(f.ZIP64_CENTRAL_DIRECTORY_LOCATOR);this.readBlockZip64EndOfCentralLocator();this.reader.setIndex(this.relativeOffsetEndOfZip64CentralDir);this.checkSignature(f.ZIP64_CENTRAL_DIRECTORY_END);this.readBlockZip64EndOfCentral();}},prepareReader:function prepareReader(e){var r=s.getTypeOf(e);if(r==="string"&&!o.uint8array){this.reader=new a(e,this.loadOptions.optimizedBinaryString);}else if(r==="nodebuffer"){this.reader=new n(e);}else{this.reader=new i(s.transformTo("uint8array",e));}},load:function load(e){this.prepareReader(e);this.readEndOfCentral();this.readCentralDir();this.readLocalFiles();}};r.exports=u;},{"./nodeBufferReader":12,"./object":13,"./signature":14,"./stringReader":15,"./support":17,"./uint8ArrayReader":18,"./utils":21,"./zipEntry":23}],23:[function(e,r,t){"use strict";var a=e("./stringReader");var n=e("./utils");var i=e("./compressedObject");var s=e("./object");function f(e,r){this.options=e;this.loadOptions=r;}f.prototype={isEncrypted:function isEncrypted(){return(this.bitFlag&1)===1;},useUTF8:function useUTF8(){return(this.bitFlag&2048)===2048;},prepareCompressedContent:function prepareCompressedContent(e,r,t){return function(){var a=e.index;e.setIndex(r);var n=e.readData(t);e.setIndex(a);return n;};},prepareContent:function prepareContent(e,r,t,a,i){return function(){var e=n.transformTo(a.uncompressInputType,this.getCompressedContent());var r=a.uncompress(e);if(r.length!==i){throw new Error("Bug : uncompressed data size mismatch");}return r;};},readLocalPart:function readLocalPart(e){var r,t;e.skip(22);this.fileNameLength=e.readInt(2);t=e.readInt(2);this.fileName=e.readString(this.fileNameLength);e.skip(t);if(this.compressedSize==-1||this.uncompressedSize==-1){throw new Error("Bug or corrupted zip : didn't get enough informations from the central directory "+"(compressedSize == -1 || uncompressedSize == -1)");}r=n.findCompression(this.compressionMethod);if(r===null){throw new Error("Corrupted zip : compression "+n.pretty(this.compressionMethod)+" unknown (inner file : "+this.fileName+")");}this.decompressed=new i();this.decompressed.compressedSize=this.compressedSize;this.decompressed.uncompressedSize=this.uncompressedSize;this.decompressed.crc32=this.crc32;this.decompressed.compressionMethod=this.compressionMethod;this.decompressed.getCompressedContent=this.prepareCompressedContent(e,e.index,this.compressedSize,r);this.decompressed.getContent=this.prepareContent(e,e.index,this.compressedSize,r,this.uncompressedSize);if(this.loadOptions.checkCRC32){this.decompressed=n.transformTo("string",this.decompressed.getContent());if(s.crc32(this.decompressed)!==this.crc32){throw new Error("Corrupted zip : CRC32 mismatch");}}},readCentralPart:function readCentralPart(e){this.versionMadeBy=e.readString(2);this.versionNeeded=e.readInt(2);this.bitFlag=e.readInt(2);this.compressionMethod=e.readString(2);this.date=e.readDate();this.crc32=e.readInt(4);this.compressedSize=e.readInt(4);this.uncompressedSize=e.readInt(4);this.fileNameLength=e.readInt(2);this.extraFieldsLength=e.readInt(2);this.fileCommentLength=e.readInt(2);this.diskNumberStart=e.readInt(2);this.internalFileAttributes=e.readInt(2);this.externalFileAttributes=e.readInt(4);this.localHeaderOffset=e.readInt(4);if(this.isEncrypted()){throw new Error("Encrypted zip are not supported");}this.fileName=e.readString(this.fileNameLength);this.readExtraFields(e);this.parseZIP64ExtraField(e);this.fileComment=e.readString(this.fileCommentLength);this.dir=this.externalFileAttributes&16?true:false;},parseZIP64ExtraField:function parseZIP64ExtraField(e){if(!this.extraFields[1]){return;}var r=new a(this.extraFields[1].value);if(this.uncompressedSize===n.MAX_VALUE_32BITS){this.uncompressedSize=r.readInt(8);}if(this.compressedSize===n.MAX_VALUE_32BITS){this.compressedSize=r.readInt(8);}if(this.localHeaderOffset===n.MAX_VALUE_32BITS){this.localHeaderOffset=r.readInt(8);}if(this.diskNumberStart===n.MAX_VALUE_32BITS){this.diskNumberStart=r.readInt(4);}},readExtraFields:function readExtraFields(e){var r=e.index,t,a,n;this.extraFields=this.extraFields||{};while(e.index<r+this.extraFieldsLength){t=e.readInt(2);a=e.readInt(2);n=e.readString(a);this.extraFields[t]={id:t,length:a,value:n};}},handleUTF8:function handleUTF8(){if(this.useUTF8()){this.fileName=s.utf8decode(this.fileName);this.fileComment=s.utf8decode(this.fileComment);}else{var e=this.findExtraFieldUnicodePath();if(e!==null){this.fileName=e;}var r=this.findExtraFieldUnicodeComment();if(r!==null){this.fileComment=r;}}},findExtraFieldUnicodePath:function findExtraFieldUnicodePath(){var e=this.extraFields[28789];if(e){var r=new a(e.value);if(r.readInt(1)!==1){return null;}if(s.crc32(this.fileName)!==r.readInt(4)){return null;}return s.utf8decode(r.readString(e.length-5));}return null;},findExtraFieldUnicodeComment:function findExtraFieldUnicodeComment(){var e=this.extraFields[25461];if(e){var r=new a(e.value);if(r.readInt(1)!==1){return null;}if(s.crc32(this.fileComment)!==r.readInt(4)){return null;}return s.utf8decode(r.readString(e.length-5));}return null;}};r.exports=f;},{"./compressedObject":2,"./object":13,"./stringReader":15,"./utils":21}],24:[function(e,r,t){"use strict";var a=e("./lib/utils/common").assign;var n=e("./lib/deflate");var i=e("./lib/inflate");var s=e("./lib/zlib/constants");var f={};a(f,n,i,s);r.exports=f;},{"./lib/deflate":25,"./lib/inflate":26,"./lib/utils/common":27,"./lib/zlib/constants":30}],25:[function(e,r,t){"use strict";var a=e("./zlib/deflate.js");var n=e("./utils/common");var i=e("./utils/strings");var s=e("./zlib/messages");var f=e("./zlib/zstream");var l=0;var o=4;var c=0;var u=1;var h=-1;var d=0;var v=8;var p=function p(e){this.options=n.assign({level:h,method:v,chunkSize:16384,windowBits:15,memLevel:8,strategy:d,to:""},e||{});var r=this.options;if(r.raw&&r.windowBits>0){r.windowBits=-r.windowBits;}else if(r.gzip&&r.windowBits>0&&r.windowBits<16){r.windowBits+=16;}this.err=0;this.msg="";this.ended=false;this.chunks=[];this.strm=new f();this.strm.avail_out=0;var t=a.deflateInit2(this.strm,r.level,r.method,r.windowBits,r.memLevel,r.strategy);if(t!==c){throw new Error(s[t]);}if(r.header){a.deflateSetHeader(this.strm,r.header);}};p.prototype.push=function(e,r){var t=this.strm;var s=this.options.chunkSize;var f,h;if(this.ended){return false;}h=r===~~r?r:r===true?o:l;if(typeof e==="string"){t.input=i.string2buf(e);}else{t.input=e;}t.next_in=0;t.avail_in=t.input.length;do{if(t.avail_out===0){t.output=new n.Buf8(s);t.next_out=0;t.avail_out=s;}f=a.deflate(t,h);if(f!==u&&f!==c){this.onEnd(f);this.ended=true;return false;}if(t.avail_out===0||t.avail_in===0&&h===o){if(this.options.to==="string"){this.onData(i.buf2binstring(n.shrinkBuf(t.output,t.next_out)));}else{this.onData(n.shrinkBuf(t.output,t.next_out));}}}while((t.avail_in>0||t.avail_out===0)&&f!==u);if(h===o){f=a.deflateEnd(this.strm);this.onEnd(f);this.ended=true;return f===c;}return true;};p.prototype.onData=function(e){this.chunks.push(e);};p.prototype.onEnd=function(e){if(e===c){if(this.options.to==="string"){this.result=this.chunks.join("");}else{this.result=n.flattenChunks(this.chunks);}}this.chunks=[];this.err=e;this.msg=this.strm.msg;};function m(e,r){var t=new p(r);t.push(e,true);if(t.err){throw t.msg;}return t.result;}function b(e,r){r=r||{};r.raw=true;return m(e,r);}function g(e,r){r=r||{};r.gzip=true;return m(e,r);}t.Deflate=p;t.deflate=m;t.deflateRaw=b;t.gzip=g;},{"./utils/common":27,"./utils/strings":28,"./zlib/deflate.js":32,"./zlib/messages":37,"./zlib/zstream":39}],26:[function(e,r,t){"use strict";var a=e("./zlib/inflate.js");var n=e("./utils/common");var i=e("./utils/strings");var s=e("./zlib/constants");var f=e("./zlib/messages");var l=e("./zlib/zstream");var o=e("./zlib/gzheader");var c=function c(e){this.options=n.assign({chunkSize:16384,windowBits:0,to:""},e||{});var r=this.options;if(r.raw&&r.windowBits>=0&&r.windowBits<16){r.windowBits=-r.windowBits;if(r.windowBits===0){r.windowBits=-15;}}if(r.windowBits>=0&&r.windowBits<16&&!(e&&e.windowBits)){r.windowBits+=32;}if(r.windowBits>15&&r.windowBits<48){if((r.windowBits&15)===0){r.windowBits|=15;}}this.err=0;this.msg="";this.ended=false;this.chunks=[];this.strm=new l();this.strm.avail_out=0;var t=a.inflateInit2(this.strm,r.windowBits);if(t!==s.Z_OK){throw new Error(f[t]);}this.header=new o();a.inflateGetHeader(this.strm,this.header);};c.prototype.push=function(e,r){var t=this.strm;var f=this.options.chunkSize;var l,o;var c,u,h;if(this.ended){return false;}o=r===~~r?r:r===true?s.Z_FINISH:s.Z_NO_FLUSH;if(typeof e==="string"){t.input=i.binstring2buf(e);}else{t.input=e;}t.next_in=0;t.avail_in=t.input.length;do{if(t.avail_out===0){t.output=new n.Buf8(f);t.next_out=0;t.avail_out=f;}l=a.inflate(t,s.Z_NO_FLUSH);if(l!==s.Z_STREAM_END&&l!==s.Z_OK){this.onEnd(l);this.ended=true;return false;}if(t.next_out){if(t.avail_out===0||l===s.Z_STREAM_END||t.avail_in===0&&o===s.Z_FINISH){if(this.options.to==="string"){c=i.utf8border(t.output,t.next_out);u=t.next_out-c;h=i.buf2string(t.output,c);t.next_out=u;t.avail_out=f-u;if(u){n.arraySet(t.output,t.output,c,u,0);}this.onData(h);}else{this.onData(n.shrinkBuf(t.output,t.next_out));}}}}while(t.avail_in>0&&l!==s.Z_STREAM_END);if(l===s.Z_STREAM_END){o=s.Z_FINISH;}if(o===s.Z_FINISH){l=a.inflateEnd(this.strm);this.onEnd(l);this.ended=true;return l===s.Z_OK;}return true;};c.prototype.onData=function(e){this.chunks.push(e);};c.prototype.onEnd=function(e){if(e===s.Z_OK){if(this.options.to==="string"){this.result=this.chunks.join("");}else{this.result=n.flattenChunks(this.chunks);}}this.chunks=[];this.err=e;this.msg=this.strm.msg;};function u(e,r){var t=new c(r);t.push(e,true);if(t.err){throw t.msg;}return t.result;}function h(e,r){r=r||{};r.raw=true;return u(e,r);}t.Inflate=c;t.inflate=u;t.inflateRaw=h;t.ungzip=u;},{"./utils/common":27,"./utils/strings":28,"./zlib/constants":30,"./zlib/gzheader":33,"./zlib/inflate.js":35,"./zlib/messages":37,"./zlib/zstream":39}],27:[function(e,r,t){"use strict";var a=typeof Uint8Array!=="undefined"&&typeof Uint16Array!=="undefined"&&typeof Int32Array!=="undefined";t.assign=function(e){var r=Array.prototype.slice.call(arguments,1);while(r.length){var t=r.shift();if(!t){continue;}if(_typeof(t)!=="object"){throw new TypeError(t+"must be non-object");}for(var a in t){if(t.hasOwnProperty(a)){e[a]=t[a];}}}return e;};t.shrinkBuf=function(e,r){if(e.length===r){return e;}if(e.subarray){return e.subarray(0,r);}e.length=r;return e;};var n={arraySet:function arraySet(e,r,t,a,n){if(r.subarray&&e.subarray){e.set(r.subarray(t,t+a),n);return;}for(var i=0;i<a;i++){e[n+i]=r[t+i];}},flattenChunks:function flattenChunks(e){var r,t,a,n,i,s;a=0;for(r=0,t=e.length;r<t;r++){a+=e[r].length;}s=new Uint8Array(a);n=0;for(r=0,t=e.length;r<t;r++){i=e[r];s.set(i,n);n+=i.length;}return s;}};var i={arraySet:function arraySet(e,r,t,a,n){for(var i=0;i<a;i++){e[n+i]=r[t+i];}},flattenChunks:function flattenChunks(e){return[].concat.apply([],e);}};t.setTyped=function(e){if(e){t.Buf8=Uint8Array;t.Buf16=Uint16Array;t.Buf32=Int32Array;t.assign(t,n);}else{t.Buf8=Array;t.Buf16=Array;t.Buf32=Array;t.assign(t,i);}};t.setTyped(a);},{}],28:[function(e,r,t){"use strict";var a=e("./common");var n=true;var i=true;try{String.fromCharCode.apply(null,[0]);}catch(s){n=false;}try{String.fromCharCode.apply(null,new Uint8Array(1));}catch(s){i=false;}var f=new a.Buf8(256);for(var l=0;l<256;l++){f[l]=l>=252?6:l>=248?5:l>=240?4:l>=224?3:l>=192?2:1;}f[254]=f[254]=1;t.string2buf=function(e){var r,t,n,i,s,f=e.length,l=0;for(i=0;i<f;i++){t=e.charCodeAt(i);if((t&64512)===55296&&i+1<f){n=e.charCodeAt(i+1);if((n&64512)===56320){t=65536+(t-55296<<10)+(n-56320);i++;}}l+=t<128?1:t<2048?2:t<65536?3:4;}r=new a.Buf8(l);for(s=0,i=0;s<l;i++){t=e.charCodeAt(i);if((t&64512)===55296&&i+1<f){n=e.charCodeAt(i+1);if((n&64512)===56320){t=65536+(t-55296<<10)+(n-56320);i++;}}if(t<128){r[s++]=t;}else if(t<2048){r[s++]=192|t>>>6;r[s++]=128|t&63;}else if(t<65536){r[s++]=224|t>>>12;r[s++]=128|t>>>6&63;r[s++]=128|t&63;}else{r[s++]=240|t>>>18;r[s++]=128|t>>>12&63;r[s++]=128|t>>>6&63;r[s++]=128|t&63;}}return r;};function o(e,r){if(r<65537){if(e.subarray&&i||!e.subarray&&n){return String.fromCharCode.apply(null,a.shrinkBuf(e,r));}}var t="";for(var s=0;s<r;s++){t+=String.fromCharCode(e[s]);}return t;}t.buf2binstring=function(e){return o(e,e.length);};t.binstring2buf=function(e){var r=new a.Buf8(e.length);for(var t=0,n=r.length;t<n;t++){r[t]=e.charCodeAt(t);}return r;};t.buf2string=function(e,r){var t,a,n,i;var s=r||e.length;var l=new Array(s*2);for(a=0,t=0;t<s;){n=e[t++];if(n<128){l[a++]=n;continue;}i=f[n];if(i>4){l[a++]=65533;t+=i-1;continue;}n&=i===2?31:i===3?15:7;while(i>1&&t<s){n=n<<6|e[t++]&63;i--;}if(i>1){l[a++]=65533;continue;}if(n<65536){l[a++]=n;}else{n-=65536;l[a++]=55296|n>>10&1023;l[a++]=56320|n&1023;}}return o(l,a);};t.utf8border=function(e,r){var t;r=r||e.length;if(r>e.length){r=e.length;}t=r-1;while(t>=0&&(e[t]&192)===128){t--;}if(t<0){return r;}if(t===0){return r;}return t+f[e[t]]>r?t:r;};},{"./common":27}],29:[function(e,r,t){"use strict";function a(e,r,t,a){var n=e&65535|0,i=e>>>16&65535|0,s=0;while(t!==0){s=t>2e3?2e3:t;t-=s;do{n=n+r[a++]|0;i=i+n|0;}while(--s);n%=65521;i%=65521;}return n|i<<16|0;}r.exports=a;},{}],30:[function(e,r,t){r.exports={Z_NO_FLUSH:0,Z_PARTIAL_FLUSH:1,Z_SYNC_FLUSH:2,Z_FULL_FLUSH:3,Z_FINISH:4,Z_BLOCK:5,Z_TREES:6,Z_OK:0,Z_STREAM_END:1,Z_NEED_DICT:2,Z_ERRNO:-1,Z_STREAM_ERROR:-2,Z_DATA_ERROR:-3,Z_BUF_ERROR:-5,Z_NO_COMPRESSION:0,Z_BEST_SPEED:1,Z_BEST_COMPRESSION:9,Z_DEFAULT_COMPRESSION:-1,Z_FILTERED:1,Z_HUFFMAN_ONLY:2,Z_RLE:3,Z_FIXED:4,Z_DEFAULT_STRATEGY:0,Z_BINARY:0,Z_TEXT:1,Z_UNKNOWN:2,Z_DEFLATED:8};},{}],31:[function(e,r,t){"use strict";function a(){var e,r=[];for(var t=0;t<256;t++){e=t;for(var a=0;a<8;a++){e=e&1?3988292384^e>>>1:e>>>1;}r[t]=e;}return r;}var n=a();function i(e,r,t,a){var i=n,s=a+t;e=e^-1;for(var f=a;f<s;f++){e=e>>>8^i[(e^r[f])&255];}return e^-1;}r.exports=i;},{}],32:[function(e,r,t){"use strict";var a=e("../utils/common");var n=e("./trees");var i=e("./adler32");var s=e("./crc32");var f=e("./messages");var l=0;var o=1;var c=3;var u=4;var h=5;var d=0;var v=1;var p=-2;var m=-3;var b=-5;var g=-1;var w=1;var k=2;var E=3;var S=4;var _=0;var C=2;var B=8;var T=9;var y=15;var x=8;var A=29;var I=256;var R=I+1+A;var F=30;var O=19;var D=2*R+1;var P=15;var N=3;var L=258;var M=L+N+1;var U=32;var z=42;var H=69;var W=73;var V=91;var X=103;var G=113;var j=666;var K=1;var $=2;var Y=3;var Z=4;var J=3;function Q(e,r){e.msg=f[r];return r;}function q(e){return(e<<1)-(e>4?9:0);}function ee(e){var r=e.length;while(--r>=0){e[r]=0;}}function re(e){var r=e.state;var t=r.pending;if(t>e.avail_out){t=e.avail_out;}if(t===0){return;}a.arraySet(e.output,r.pending_buf,r.pending_out,t,e.next_out);e.next_out+=t;r.pending_out+=t;e.total_out+=t;e.avail_out-=t;r.pending-=t;if(r.pending===0){r.pending_out=0;}}function te(e,r){n._tr_flush_block(e,e.block_start>=0?e.block_start:-1,e.strstart-e.block_start,r);e.block_start=e.strstart;re(e.strm);}function ae(e,r){e.pending_buf[e.pending++]=r;}function ne(e,r){e.pending_buf[e.pending++]=r>>>8&255;e.pending_buf[e.pending++]=r&255;}function ie(e,r,t,n){var f=e.avail_in;if(f>n){f=n;}if(f===0){return 0;}e.avail_in-=f;a.arraySet(r,e.input,e.next_in,f,t);if(e.state.wrap===1){e.adler=i(e.adler,r,f,t);}else if(e.state.wrap===2){e.adler=s(e.adler,r,f,t);}e.next_in+=f;e.total_in+=f;return f;}function se(e,r){var t=e.max_chain_length;var a=e.strstart;var n;var i;var s=e.prev_length;var f=e.nice_match;var l=e.strstart>e.w_size-M?e.strstart-(e.w_size-M):0;var o=e.window;var c=e.w_mask;var u=e.prev;var h=e.strstart+L;var d=o[a+s-1];var v=o[a+s];if(e.prev_length>=e.good_match){t>>=2;}if(f>e.lookahead){f=e.lookahead;}do{n=r;if(o[n+s]!==v||o[n+s-1]!==d||o[n]!==o[a]||o[++n]!==o[a+1]){continue;}a+=2;n++;do{}while(o[++a]===o[++n]&&o[++a]===o[++n]&&o[++a]===o[++n]&&o[++a]===o[++n]&&o[++a]===o[++n]&&o[++a]===o[++n]&&o[++a]===o[++n]&&o[++a]===o[++n]&&a<h);i=L-(h-a);a=h-L;if(i>s){e.match_start=r;s=i;if(i>=f){break;}d=o[a+s-1];v=o[a+s];}}while((r=u[r&c])>l&&--t!==0);if(s<=e.lookahead){return s;}return e.lookahead;}function fe(e){var r=e.w_size;var t,n,i,s,f;do{s=e.window_size-e.lookahead-e.strstart;if(e.strstart>=r+(r-M)){a.arraySet(e.window,e.window,r,r,0);e.match_start-=r;e.strstart-=r;e.block_start-=r;n=e.hash_size;t=n;do{i=e.head[--t];e.head[t]=i>=r?i-r:0;}while(--n);n=r;t=n;do{i=e.prev[--t];e.prev[t]=i>=r?i-r:0;}while(--n);s+=r;}if(e.strm.avail_in===0){break;}n=ie(e.strm,e.window,e.strstart+e.lookahead,s);e.lookahead+=n;if(e.lookahead+e.insert>=N){f=e.strstart-e.insert;e.ins_h=e.window[f];e.ins_h=(e.ins_h<<e.hash_shift^e.window[f+1])&e.hash_mask;while(e.insert){e.ins_h=(e.ins_h<<e.hash_shift^e.window[f+N-1])&e.hash_mask;e.prev[f&e.w_mask]=e.head[e.ins_h];e.head[e.ins_h]=f;f++;e.insert--;if(e.lookahead+e.insert<N){break;}}}}while(e.lookahead<M&&e.strm.avail_in!==0);}function le(e,r){var t=65535;if(t>e.pending_buf_size-5){t=e.pending_buf_size-5;}for(;;){if(e.lookahead<=1){fe(e);if(e.lookahead===0&&r===l){return K;}if(e.lookahead===0){break;}}e.strstart+=e.lookahead;e.lookahead=0;var a=e.block_start+t;if(e.strstart===0||e.strstart>=a){e.lookahead=e.strstart-a;e.strstart=a;te(e,false);if(e.strm.avail_out===0){return K;}}if(e.strstart-e.block_start>=e.w_size-M){te(e,false);if(e.strm.avail_out===0){return K;}}}e.insert=0;if(r===u){te(e,true);if(e.strm.avail_out===0){return Y;}return Z;}if(e.strstart>e.block_start){te(e,false);if(e.strm.avail_out===0){return K;}}return K;}function oe(e,r){var t;var a;for(;;){if(e.lookahead<M){fe(e);if(e.lookahead<M&&r===l){return K;}if(e.lookahead===0){break;}}t=0;if(e.lookahead>=N){e.ins_h=(e.ins_h<<e.hash_shift^e.window[e.strstart+N-1])&e.hash_mask;t=e.prev[e.strstart&e.w_mask]=e.head[e.ins_h];e.head[e.ins_h]=e.strstart;}if(t!==0&&e.strstart-t<=e.w_size-M){e.match_length=se(e,t);}if(e.match_length>=N){a=n._tr_tally(e,e.strstart-e.match_start,e.match_length-N);e.lookahead-=e.match_length;if(e.match_length<=e.max_lazy_match&&e.lookahead>=N){e.match_length--;do{e.strstart++;e.ins_h=(e.ins_h<<e.hash_shift^e.window[e.strstart+N-1])&e.hash_mask;t=e.prev[e.strstart&e.w_mask]=e.head[e.ins_h];e.head[e.ins_h]=e.strstart;}while(--e.match_length!==0);e.strstart++;}else{e.strstart+=e.match_length;e.match_length=0;e.ins_h=e.window[e.strstart];e.ins_h=(e.ins_h<<e.hash_shift^e.window[e.strstart+1])&e.hash_mask;}}else{a=n._tr_tally(e,0,e.window[e.strstart]);e.lookahead--;e.strstart++;}if(a){te(e,false);if(e.strm.avail_out===0){return K;}}}e.insert=e.strstart<N-1?e.strstart:N-1;if(r===u){te(e,true);if(e.strm.avail_out===0){return Y;}return Z;}if(e.last_lit){te(e,false);if(e.strm.avail_out===0){return K;}}return $;}function ce(e,r){var t;var a;var i;for(;;){if(e.lookahead<M){fe(e);if(e.lookahead<M&&r===l){return K;}if(e.lookahead===0){break;}}t=0;if(e.lookahead>=N){e.ins_h=(e.ins_h<<e.hash_shift^e.window[e.strstart+N-1])&e.hash_mask;t=e.prev[e.strstart&e.w_mask]=e.head[e.ins_h];e.head[e.ins_h]=e.strstart;}e.prev_length=e.match_length;e.prev_match=e.match_start;e.match_length=N-1;if(t!==0&&e.prev_length<e.max_lazy_match&&e.strstart-t<=e.w_size-M){e.match_length=se(e,t);if(e.match_length<=5&&(e.strategy===w||e.match_length===N&&e.strstart-e.match_start>4096)){e.match_length=N-1;}}if(e.prev_length>=N&&e.match_length<=e.prev_length){i=e.strstart+e.lookahead-N;a=n._tr_tally(e,e.strstart-1-e.prev_match,e.prev_length-N);e.lookahead-=e.prev_length-1;e.prev_length-=2;do{if(++e.strstart<=i){e.ins_h=(e.ins_h<<e.hash_shift^e.window[e.strstart+N-1])&e.hash_mask;t=e.prev[e.strstart&e.w_mask]=e.head[e.ins_h];e.head[e.ins_h]=e.strstart;}}while(--e.prev_length!==0);e.match_available=0;e.match_length=N-1;e.strstart++;if(a){te(e,false);if(e.strm.avail_out===0){return K;}}}else if(e.match_available){a=n._tr_tally(e,0,e.window[e.strstart-1]);if(a){te(e,false);}e.strstart++;e.lookahead--;if(e.strm.avail_out===0){return K;}}else{e.match_available=1;e.strstart++;e.lookahead--;}}if(e.match_available){a=n._tr_tally(e,0,e.window[e.strstart-1]);e.match_available=0;}e.insert=e.strstart<N-1?e.strstart:N-1;if(r===u){te(e,true);if(e.strm.avail_out===0){return Y;}return Z;}if(e.last_lit){te(e,false);if(e.strm.avail_out===0){return K;}}return $;}function ue(e,r){var t;var a;var i,s;var f=e.window;for(;;){if(e.lookahead<=L){fe(e);if(e.lookahead<=L&&r===l){return K;}if(e.lookahead===0){break;}}e.match_length=0;if(e.lookahead>=N&&e.strstart>0){i=e.strstart-1;a=f[i];if(a===f[++i]&&a===f[++i]&&a===f[++i]){s=e.strstart+L;do{}while(a===f[++i]&&a===f[++i]&&a===f[++i]&&a===f[++i]&&a===f[++i]&&a===f[++i]&&a===f[++i]&&a===f[++i]&&i<s);e.match_length=L-(s-i);if(e.match_length>e.lookahead){e.match_length=e.lookahead;}}}if(e.match_length>=N){t=n._tr_tally(e,1,e.match_length-N);e.lookahead-=e.match_length;e.strstart+=e.match_length;e.match_length=0;}else{t=n._tr_tally(e,0,e.window[e.strstart]);e.lookahead--;e.strstart++;}if(t){te(e,false);if(e.strm.avail_out===0){return K;}}}e.insert=0;if(r===u){te(e,true);if(e.strm.avail_out===0){return Y;}return Z;}if(e.last_lit){te(e,false);if(e.strm.avail_out===0){return K;}}return $;}function he(e,r){var t;for(;;){if(e.lookahead===0){fe(e);if(e.lookahead===0){if(r===l){return K;}break;}}e.match_length=0;t=n._tr_tally(e,0,e.window[e.strstart]);e.lookahead--;e.strstart++;if(t){te(e,false);if(e.strm.avail_out===0){return K;}}}e.insert=0;if(r===u){te(e,true);if(e.strm.avail_out===0){return Y;}return Z;}if(e.last_lit){te(e,false);if(e.strm.avail_out===0){return K;}}return $;}var de=function de(e,r,t,a,n){this.good_length=e;this.max_lazy=r;this.nice_length=t;this.max_chain=a;this.func=n;};var ve;ve=[new de(0,0,0,0,le),new de(4,4,8,4,oe),new de(4,5,16,8,oe),new de(4,6,32,32,oe),new de(4,4,16,16,ce),new de(8,16,32,32,ce),new de(8,16,128,128,ce),new de(8,32,128,256,ce),new de(32,128,258,1024,ce),new de(32,258,258,4096,ce)];function pe(e){e.window_size=2*e.w_size;ee(e.head);e.max_lazy_match=ve[e.level].max_lazy;e.good_match=ve[e.level].good_length;e.nice_match=ve[e.level].nice_length;e.max_chain_length=ve[e.level].max_chain;e.strstart=0;e.block_start=0;e.lookahead=0;e.insert=0;e.match_length=e.prev_length=N-1;e.match_available=0;e.ins_h=0;}function me(){this.strm=null;this.status=0;this.pending_buf=null;this.pending_buf_size=0;this.pending_out=0;this.pending=0;this.wrap=0;this.gzhead=null;this.gzindex=0;this.method=B;this.last_flush=-1;this.w_size=0;this.w_bits=0;this.w_mask=0;this.window=null;this.window_size=0;this.prev=null;this.head=null;this.ins_h=0;this.hash_size=0;this.hash_bits=0;this.hash_mask=0;this.hash_shift=0;this.block_start=0;this.match_length=0;this.prev_match=0;this.match_available=0;this.strstart=0;this.match_start=0;this.lookahead=0;this.prev_length=0;this.max_chain_length=0;this.max_lazy_match=0;this.level=0;this.strategy=0;this.good_match=0;this.nice_match=0;this.dyn_ltree=new a.Buf16(D*2);this.dyn_dtree=new a.Buf16((2*F+1)*2);this.bl_tree=new a.Buf16((2*O+1)*2);ee(this.dyn_ltree);ee(this.dyn_dtree);ee(this.bl_tree);this.l_desc=null;this.d_desc=null;this.bl_desc=null;this.bl_count=new a.Buf16(P+1);this.heap=new a.Buf16(2*R+1);ee(this.heap);this.heap_len=0;this.heap_max=0;this.depth=new a.Buf16(2*R+1);ee(this.depth);this.l_buf=0;this.lit_bufsize=0;this.last_lit=0;this.d_buf=0;this.opt_len=0;this.static_len=0;this.matches=0;this.insert=0;this.bi_buf=0;this.bi_valid=0;}function be(e){var r;if(!e||!e.state){return Q(e,p);}e.total_in=e.total_out=0;e.data_type=C;r=e.state;r.pending=0;r.pending_out=0;if(r.wrap<0){r.wrap=-r.wrap;}r.status=r.wrap?z:G;e.adler=r.wrap===2?0:1;r.last_flush=l;n._tr_init(r);return d;}function ge(e){var r=be(e);if(r===d){pe(e.state);}return r;}function we(e,r){if(!e||!e.state){return p;}if(e.state.wrap!==2){return p;}e.state.gzhead=r;return d;}function ke(e,r,t,n,i,s){if(!e){return p;}var f=1;if(r===g){r=6;}if(n<0){f=0;n=-n;}else if(n>15){f=2;n-=16;}if(i<1||i>T||t!==B||n<8||n>15||r<0||r>9||s<0||s>S){return Q(e,p);}if(n===8){n=9;}var l=new me();e.state=l;l.strm=e;l.wrap=f;l.gzhead=null;l.w_bits=n;l.w_size=1<<l.w_bits;l.w_mask=l.w_size-1;l.hash_bits=i+7;l.hash_size=1<<l.hash_bits;l.hash_mask=l.hash_size-1;l.hash_shift=~~((l.hash_bits+N-1)/N);l.window=new a.Buf8(l.w_size*2);l.head=new a.Buf16(l.hash_size);l.prev=new a.Buf16(l.w_size);l.lit_bufsize=1<<i+6;l.pending_buf_size=l.lit_bufsize*4;l.pending_buf=new a.Buf8(l.pending_buf_size);l.d_buf=l.lit_bufsize>>1;l.l_buf=(1+2)*l.lit_bufsize;l.level=r;l.strategy=s;l.method=t;return ge(e);}function Ee(e,r){return ke(e,r,B,y,x,_);}function Se(e,r){var t,a;var i,f;if(!e||!e.state||r>h||r<0){return e?Q(e,p):p;}a=e.state;if(!e.output||!e.input&&e.avail_in!==0||a.status===j&&r!==u){return Q(e,e.avail_out===0?b:p);}a.strm=e;t=a.last_flush;a.last_flush=r;if(a.status===z){if(a.wrap===2){e.adler=0;ae(a,31);ae(a,139);ae(a,8);if(!a.gzhead){ae(a,0);ae(a,0);ae(a,0);ae(a,0);ae(a,0);ae(a,a.level===9?2:a.strategy>=k||a.level<2?4:0);ae(a,J);a.status=G;}else{ae(a,(a.gzhead.text?1:0)+(a.gzhead.hcrc?2:0)+(!a.gzhead.extra?0:4)+(!a.gzhead.name?0:8)+(!a.gzhead.comment?0:16));ae(a,a.gzhead.time&255);ae(a,a.gzhead.time>>8&255);ae(a,a.gzhead.time>>16&255);ae(a,a.gzhead.time>>24&255);ae(a,a.level===9?2:a.strategy>=k||a.level<2?4:0);ae(a,a.gzhead.os&255);if(a.gzhead.extra&&a.gzhead.extra.length){ae(a,a.gzhead.extra.length&255);ae(a,a.gzhead.extra.length>>8&255);}if(a.gzhead.hcrc){e.adler=s(e.adler,a.pending_buf,a.pending,0);}a.gzindex=0;a.status=H;}}else{var m=B+(a.w_bits-8<<4)<<8;var g=-1;if(a.strategy>=k||a.level<2){g=0;}else if(a.level<6){g=1;}else if(a.level===6){g=2;}else{g=3;}m|=g<<6;if(a.strstart!==0){m|=U;}m+=31-m%31;a.status=G;ne(a,m);if(a.strstart!==0){ne(a,e.adler>>>16);ne(a,e.adler&65535);}e.adler=1;}}if(a.status===H){if(a.gzhead.extra){i=a.pending;while(a.gzindex<(a.gzhead.extra.length&65535)){if(a.pending===a.pending_buf_size){if(a.gzhead.hcrc&&a.pending>i){e.adler=s(e.adler,a.pending_buf,a.pending-i,i);}re(e);i=a.pending;if(a.pending===a.pending_buf_size){break;}}ae(a,a.gzhead.extra[a.gzindex]&255);a.gzindex++;}if(a.gzhead.hcrc&&a.pending>i){e.adler=s(e.adler,a.pending_buf,a.pending-i,i);}if(a.gzindex===a.gzhead.extra.length){a.gzindex=0;a.status=W;}}else{a.status=W;}}if(a.status===W){if(a.gzhead.name){i=a.pending;do{if(a.pending===a.pending_buf_size){if(a.gzhead.hcrc&&a.pending>i){e.adler=s(e.adler,a.pending_buf,a.pending-i,i);}re(e);i=a.pending;if(a.pending===a.pending_buf_size){f=1;break;}}if(a.gzindex<a.gzhead.name.length){f=a.gzhead.name.charCodeAt(a.gzindex++)&255;}else{f=0;}ae(a,f);}while(f!==0);if(a.gzhead.hcrc&&a.pending>i){e.adler=s(e.adler,a.pending_buf,a.pending-i,i);}if(f===0){a.gzindex=0;a.status=V;}}else{a.status=V;}}if(a.status===V){if(a.gzhead.comment){i=a.pending;do{if(a.pending===a.pending_buf_size){if(a.gzhead.hcrc&&a.pending>i){e.adler=s(e.adler,a.pending_buf,a.pending-i,i);}re(e);i=a.pending;if(a.pending===a.pending_buf_size){f=1;break;}}if(a.gzindex<a.gzhead.comment.length){f=a.gzhead.comment.charCodeAt(a.gzindex++)&255;}else{f=0;}ae(a,f);}while(f!==0);if(a.gzhead.hcrc&&a.pending>i){e.adler=s(e.adler,a.pending_buf,a.pending-i,i);}if(f===0){a.status=X;}}else{a.status=X;}}if(a.status===X){if(a.gzhead.hcrc){if(a.pending+2>a.pending_buf_size){re(e);}if(a.pending+2<=a.pending_buf_size){ae(a,e.adler&255);ae(a,e.adler>>8&255);e.adler=0;a.status=G;}}else{a.status=G;}}if(a.pending!==0){re(e);if(e.avail_out===0){a.last_flush=-1;return d;}}else if(e.avail_in===0&&q(r)<=q(t)&&r!==u){return Q(e,b);}if(a.status===j&&e.avail_in!==0){return Q(e,b);}if(e.avail_in!==0||a.lookahead!==0||r!==l&&a.status!==j){var w=a.strategy===k?he(a,r):a.strategy===E?ue(a,r):ve[a.level].func(a,r);if(w===Y||w===Z){a.status=j;}if(w===K||w===Y){if(e.avail_out===0){a.last_flush=-1;}return d;}if(w===$){if(r===o){n._tr_align(a);}else if(r!==h){n._tr_stored_block(a,0,0,false);if(r===c){ee(a.head);if(a.lookahead===0){a.strstart=0;a.block_start=0;a.insert=0;}}}re(e);if(e.avail_out===0){a.last_flush=-1;return d;}}}if(r!==u){return d;}if(a.wrap<=0){return v;}if(a.wrap===2){ae(a,e.adler&255);ae(a,e.adler>>8&255);ae(a,e.adler>>16&255);ae(a,e.adler>>24&255);ae(a,e.total_in&255);ae(a,e.total_in>>8&255);ae(a,e.total_in>>16&255);ae(a,e.total_in>>24&255);}else{ne(a,e.adler>>>16);ne(a,e.adler&65535);}re(e);if(a.wrap>0){a.wrap=-a.wrap;}return a.pending!==0?d:v;}function _e(e){var r;if(!e||!e.state){return p;}r=e.state.status;if(r!==z&&r!==H&&r!==W&&r!==V&&r!==X&&r!==G&&r!==j){return Q(e,p);}e.state=null;return r===G?Q(e,m):d;}t.deflateInit=Ee;t.deflateInit2=ke;t.deflateReset=ge;t.deflateResetKeep=be;t.deflateSetHeader=we;t.deflate=Se;t.deflateEnd=_e;t.deflateInfo="pako deflate (from Nodeca project)";},{"../utils/common":27,"./adler32":29,"./crc32":31,"./messages":37,"./trees":38}],33:[function(e,r,t){"use strict";function a(){this.text=0;this.time=0;this.xflags=0;this.os=0;this.extra=null;this.extra_len=0;this.name="";this.comment="";this.hcrc=0;this.done=false;}r.exports=a;},{}],34:[function(e,r,t){"use strict";var a=30;var n=12;r.exports=function i(e,r){var t;var i;var s;var f;var l;var o;var c;var u;var h;var d;var v;var p;var m;var b;var g;var w;var k;var E;var S;var _;var C;var B;var T;var y,x;t=e.state;i=e.next_in;y=e.input;s=i+(e.avail_in-5);f=e.next_out;x=e.output;l=f-(r-e.avail_out);o=f+(e.avail_out-257);c=t.dmax;u=t.wsize;h=t.whave;d=t.wnext;v=t.window;p=t.hold;m=t.bits;b=t.lencode;g=t.distcode;w=(1<<t.lenbits)-1;k=(1<<t.distbits)-1;e:do{if(m<15){p+=y[i++]<<m;m+=8;p+=y[i++]<<m;m+=8;}E=b[p&w];r:for(;;){S=E>>>24;p>>>=S;m-=S;S=E>>>16&255;if(S===0){x[f++]=E&65535;}else if(S&16){_=E&65535;S&=15;if(S){if(m<S){p+=y[i++]<<m;m+=8;}_+=p&(1<<S)-1;p>>>=S;m-=S;}if(m<15){p+=y[i++]<<m;m+=8;p+=y[i++]<<m;m+=8;}E=g[p&k];t:for(;;){S=E>>>24;p>>>=S;m-=S;S=E>>>16&255;if(S&16){C=E&65535;S&=15;if(m<S){p+=y[i++]<<m;m+=8;if(m<S){p+=y[i++]<<m;m+=8;}}C+=p&(1<<S)-1;if(C>c){e.msg="invalid distance too far back";t.mode=a;break e;}p>>>=S;m-=S;S=f-l;if(C>S){S=C-S;if(S>h){if(t.sane){e.msg="invalid distance too far back";t.mode=a;break e;}}B=0;T=v;if(d===0){B+=u-S;if(S<_){_-=S;do{x[f++]=v[B++];}while(--S);B=f-C;T=x;}}else if(d<S){B+=u+d-S;S-=d;if(S<_){_-=S;do{x[f++]=v[B++];}while(--S);B=0;if(d<_){S=d;_-=S;do{x[f++]=v[B++];}while(--S);B=f-C;T=x;}}}else{B+=d-S;if(S<_){_-=S;do{x[f++]=v[B++];}while(--S);B=f-C;T=x;}}while(_>2){x[f++]=T[B++];x[f++]=T[B++];x[f++]=T[B++];_-=3;}if(_){x[f++]=T[B++];if(_>1){x[f++]=T[B++];}}}else{B=f-C;do{x[f++]=x[B++];x[f++]=x[B++];x[f++]=x[B++];_-=3;}while(_>2);if(_){x[f++]=x[B++];if(_>1){x[f++]=x[B++];}}}}else if((S&64)===0){E=g[(E&65535)+(p&(1<<S)-1)];continue t;}else{e.msg="invalid distance code";t.mode=a;break e;}break;}}else if((S&64)===0){E=b[(E&65535)+(p&(1<<S)-1)];continue r;}else if(S&32){t.mode=n;break e;}else{e.msg="invalid literal/length code";t.mode=a;break e;}break;}}while(i<s&&f<o);_=m>>3;i-=_;m-=_<<3;p&=(1<<m)-1;e.next_in=i;e.next_out=f;e.avail_in=i<s?5+(s-i):5-(i-s);e.avail_out=f<o?257+(o-f):257-(f-o);t.hold=p;t.bits=m;return;};},{}],35:[function(e,r,t){"use strict";var a=e("../utils/common");var n=e("./adler32");var i=e("./crc32");var s=e("./inffast");var f=e("./inftrees");var l=0;var o=1;var c=2;var u=4;var h=5;var d=6;var v=0;var p=1;var m=2;var b=-2;var g=-3;var w=-4;var k=-5;var E=8;var S=1;var _=2;var C=3;var B=4;var T=5;var y=6;var x=7;var A=8;var I=9;var R=10;var F=11;var O=12;var D=13;var P=14;var N=15;var L=16;var M=17;var U=18;var z=19;var H=20;var W=21;var V=22;var X=23;var G=24;var j=25;var K=26;var $=27;var Y=28;var Z=29;var J=30;var Q=31;var q=32;var ee=852;var re=592;var te=15;var ae=te;function ne(e){return(e>>>24&255)+(e>>>8&65280)+((e&65280)<<8)+((e&255)<<24);}function ie(){this.mode=0;this.last=false;this.wrap=0;this.havedict=false;this.flags=0;this.dmax=0;this.check=0;this.total=0;this.head=null;this.wbits=0;this.wsize=0;this.whave=0;this.wnext=0;this.window=null;this.hold=0;this.bits=0;this.length=0;this.offset=0;this.extra=0;this.lencode=null;this.distcode=null;this.lenbits=0;this.distbits=0;this.ncode=0;this.nlen=0;this.ndist=0;this.have=0;this.next=null;this.lens=new a.Buf16(320);this.work=new a.Buf16(288);this.lendyn=null;this.distdyn=null;this.sane=0;this.back=0;this.was=0;}function se(e){var r;if(!e||!e.state){return b;}r=e.state;e.total_in=e.total_out=r.total=0;e.msg="";if(r.wrap){e.adler=r.wrap&1;}r.mode=S;r.last=0;r.havedict=0;r.dmax=32768;r.head=null;r.hold=0;r.bits=0;r.lencode=r.lendyn=new a.Buf32(ee);r.distcode=r.distdyn=new a.Buf32(re);r.sane=1;r.back=-1;return v;}function fe(e){var r;if(!e||!e.state){return b;}r=e.state;r.wsize=0;r.whave=0;r.wnext=0;return se(e);}function le(e,r){var t;var a;if(!e||!e.state){return b;}a=e.state;if(r<0){t=0;r=-r;}else{t=(r>>4)+1;if(r<48){r&=15;}}if(r&&(r<8||r>15)){return b;}if(a.window!==null&&a.wbits!==r){a.window=null;}a.wrap=t;a.wbits=r;return fe(e);}function oe(e,r){var t;var a;if(!e){return b;}a=new ie();e.state=a;a.window=null;t=le(e,r);if(t!==v){e.state=null;}return t;}function ce(e){return oe(e,ae);}var ue=true;var he,de;function ve(e){if(ue){var r;he=new a.Buf32(512);de=new a.Buf32(32);r=0;while(r<144){e.lens[r++]=8;}while(r<256){e.lens[r++]=9;}while(r<280){e.lens[r++]=7;}while(r<288){e.lens[r++]=8;}f(o,e.lens,0,288,he,0,e.work,{bits:9});r=0;while(r<32){e.lens[r++]=5;}f(c,e.lens,0,32,de,0,e.work,{bits:5});ue=false;}e.lencode=he;e.lenbits=9;e.distcode=de;e.distbits=5;}function pe(e,r,t,n){var i;var s=e.state;if(s.window===null){s.wsize=1<<s.wbits;s.wnext=0;s.whave=0;s.window=new a.Buf8(s.wsize);}if(n>=s.wsize){a.arraySet(s.window,r,t-s.wsize,s.wsize,0);s.wnext=0;s.whave=s.wsize;}else{i=s.wsize-s.wnext;if(i>n){i=n;}a.arraySet(s.window,r,t-n,i,s.wnext);n-=i;if(n){a.arraySet(s.window,r,t-n,n,0);s.wnext=n;s.whave=s.wsize;}else{s.wnext+=i;if(s.wnext===s.wsize){s.wnext=0;}if(s.whave<s.wsize){s.whave+=i;}}}return 0;}function me(e,r){var t;var ee,re;var te;var ae;var ie,se;var fe;var le;var oe,ce;var ue;var he;var de;var me=0;var be,ge,we;var ke,Ee,Se;var _e;var Ce;var Be=new a.Buf8(4);var Te;var ye;var xe=[16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15];if(!e||!e.state||!e.output||!e.input&&e.avail_in!==0){return b;}t=e.state;if(t.mode===O){t.mode=D;}ae=e.next_out;re=e.output;se=e.avail_out;te=e.next_in;ee=e.input;ie=e.avail_in;fe=t.hold;le=t.bits;oe=ie;ce=se;Ce=v;e:for(;;){switch(t.mode){case S:if(t.wrap===0){t.mode=D;break;}while(le<16){if(ie===0){break e;}ie--;fe+=ee[te++]<<le;le+=8;}if(t.wrap&2&&fe===35615){t.check=0;Be[0]=fe&255;Be[1]=fe>>>8&255;t.check=i(t.check,Be,2,0);fe=0;le=0;t.mode=_;break;}t.flags=0;if(t.head){t.head.done=false;}if(!(t.wrap&1)||(((fe&255)<<8)+(fe>>8))%31){e.msg="incorrect header check";t.mode=J;break;}if((fe&15)!==E){e.msg="unknown compression method";t.mode=J;break;}fe>>>=4;le-=4;_e=(fe&15)+8;if(t.wbits===0){t.wbits=_e;}else if(_e>t.wbits){e.msg="invalid window size";t.mode=J;break;}t.dmax=1<<_e;e.adler=t.check=1;t.mode=fe&512?R:O;fe=0;le=0;break;case _:while(le<16){if(ie===0){break e;}ie--;fe+=ee[te++]<<le;le+=8;}t.flags=fe;if((t.flags&255)!==E){e.msg="unknown compression method";t.mode=J;break;}if(t.flags&57344){e.msg="unknown header flags set";t.mode=J;break;}if(t.head){t.head.text=fe>>8&1;}if(t.flags&512){Be[0]=fe&255;Be[1]=fe>>>8&255;t.check=i(t.check,Be,2,0);}fe=0;le=0;t.mode=C;case C:while(le<32){if(ie===0){break e;}ie--;fe+=ee[te++]<<le;le+=8;}if(t.head){t.head.time=fe;}if(t.flags&512){Be[0]=fe&255;Be[1]=fe>>>8&255;Be[2]=fe>>>16&255;Be[3]=fe>>>24&255;t.check=i(t.check,Be,4,0);}fe=0;le=0;t.mode=B;case B:while(le<16){if(ie===0){break e;}ie--;fe+=ee[te++]<<le;le+=8;}if(t.head){t.head.xflags=fe&255;t.head.os=fe>>8;}if(t.flags&512){Be[0]=fe&255;Be[1]=fe>>>8&255;t.check=i(t.check,Be,2,0);}fe=0;le=0;t.mode=T;case T:if(t.flags&1024){while(le<16){if(ie===0){break e;}ie--;fe+=ee[te++]<<le;le+=8;}t.length=fe;if(t.head){t.head.extra_len=fe;}if(t.flags&512){Be[0]=fe&255;Be[1]=fe>>>8&255;t.check=i(t.check,Be,2,0);}fe=0;le=0;}else if(t.head){t.head.extra=null;}t.mode=y;case y:if(t.flags&1024){ue=t.length;if(ue>ie){ue=ie;}if(ue){if(t.head){_e=t.head.extra_len-t.length;if(!t.head.extra){t.head.extra=new Array(t.head.extra_len);}a.arraySet(t.head.extra,ee,te,ue,_e);}if(t.flags&512){t.check=i(t.check,ee,ue,te);}ie-=ue;te+=ue;t.length-=ue;}if(t.length){break e;}}t.length=0;t.mode=x;case x:if(t.flags&2048){if(ie===0){break e;}ue=0;do{_e=ee[te+ue++];if(t.head&&_e&&t.length<65536){t.head.name+=String.fromCharCode(_e);}}while(_e&&ue<ie);if(t.flags&512){t.check=i(t.check,ee,ue,te);}ie-=ue;te+=ue;if(_e){break e;}}else if(t.head){t.head.name=null;}t.length=0;t.mode=A;case A:if(t.flags&4096){if(ie===0){break e;}ue=0;do{_e=ee[te+ue++];if(t.head&&_e&&t.length<65536){t.head.comment+=String.fromCharCode(_e);}}while(_e&&ue<ie);if(t.flags&512){t.check=i(t.check,ee,ue,te);}ie-=ue;te+=ue;if(_e){break e;}}else if(t.head){t.head.comment=null;}t.mode=I;case I:if(t.flags&512){while(le<16){if(ie===0){break e;}ie--;fe+=ee[te++]<<le;le+=8;}if(fe!==(t.check&65535)){e.msg="header crc mismatch";t.mode=J;break;}fe=0;le=0;}if(t.head){t.head.hcrc=t.flags>>9&1;t.head.done=true;}e.adler=t.check=0;t.mode=O;break;case R:while(le<32){if(ie===0){break e;}ie--;fe+=ee[te++]<<le;le+=8;}e.adler=t.check=ne(fe);fe=0;le=0;t.mode=F;case F:if(t.havedict===0){e.next_out=ae;e.avail_out=se;e.next_in=te;e.avail_in=ie;t.hold=fe;t.bits=le;return m;}e.adler=t.check=1;t.mode=O;case O:if(r===h||r===d){break e;};case D:if(t.last){fe>>>=le&7;le-=le&7;t.mode=$;break;}while(le<3){if(ie===0){break e;}ie--;fe+=ee[te++]<<le;le+=8;}t.last=fe&1;fe>>>=1;le-=1;switch(fe&3){case 0:t.mode=P;break;case 1:ve(t);t.mode=H;if(r===d){fe>>>=2;le-=2;break e;}break;case 2:t.mode=M;break;case 3:e.msg="invalid block type";t.mode=J;}fe>>>=2;le-=2;break;case P:fe>>>=le&7;le-=le&7;while(le<32){if(ie===0){break e;}ie--;fe+=ee[te++]<<le;le+=8;}if((fe&65535)!==(fe>>>16^65535)){e.msg="invalid stored block lengths";t.mode=J;break;}t.length=fe&65535;fe=0;le=0;t.mode=N;if(r===d){break e;};case N:t.mode=L;case L:ue=t.length;if(ue){if(ue>ie){ue=ie;}if(ue>se){ue=se;}if(ue===0){break e;}a.arraySet(re,ee,te,ue,ae);ie-=ue;te+=ue;se-=ue;ae+=ue;t.length-=ue;break;}t.mode=O;break;case M:while(le<14){if(ie===0){break e;}ie--;fe+=ee[te++]<<le;le+=8;}t.nlen=(fe&31)+257;fe>>>=5;le-=5;t.ndist=(fe&31)+1;fe>>>=5;le-=5;t.ncode=(fe&15)+4;fe>>>=4;le-=4;if(t.nlen>286||t.ndist>30){e.msg="too many length or distance symbols";t.mode=J;break;}t.have=0;t.mode=U;case U:while(t.have<t.ncode){while(le<3){if(ie===0){break e;}ie--;fe+=ee[te++]<<le;le+=8;}t.lens[xe[t.have++]]=fe&7;fe>>>=3;le-=3;}while(t.have<19){t.lens[xe[t.have++]]=0;}t.lencode=t.lendyn;t.lenbits=7;Te={bits:t.lenbits};Ce=f(l,t.lens,0,19,t.lencode,0,t.work,Te);t.lenbits=Te.bits;if(Ce){e.msg="invalid code lengths set";t.mode=J;break;}t.have=0;t.mode=z;case z:while(t.have<t.nlen+t.ndist){for(;;){me=t.lencode[fe&(1<<t.lenbits)-1];be=me>>>24;ge=me>>>16&255;we=me&65535;if(be<=le){break;}if(ie===0){break e;}ie--;fe+=ee[te++]<<le;le+=8;}if(we<16){fe>>>=be;le-=be;t.lens[t.have++]=we;}else{if(we===16){ye=be+2;while(le<ye){if(ie===0){break e;}ie--;fe+=ee[te++]<<le;le+=8;}fe>>>=be;le-=be;if(t.have===0){e.msg="invalid bit length repeat";t.mode=J;break;}_e=t.lens[t.have-1];ue=3+(fe&3);fe>>>=2;le-=2;}else if(we===17){ye=be+3;while(le<ye){if(ie===0){break e;}ie--;fe+=ee[te++]<<le;le+=8;}fe>>>=be;le-=be;_e=0;ue=3+(fe&7);fe>>>=3;le-=3;}else{ye=be+7;while(le<ye){if(ie===0){break e;}ie--;fe+=ee[te++]<<le;le+=8;}fe>>>=be;le-=be;_e=0;ue=11+(fe&127);fe>>>=7;le-=7;}if(t.have+ue>t.nlen+t.ndist){e.msg="invalid bit length repeat";t.mode=J;break;}while(ue--){t.lens[t.have++]=_e;}}}if(t.mode===J){break;}if(t.lens[256]===0){e.msg="invalid code -- missing end-of-block";t.mode=J;break;}t.lenbits=9;Te={bits:t.lenbits};Ce=f(o,t.lens,0,t.nlen,t.lencode,0,t.work,Te);t.lenbits=Te.bits;if(Ce){e.msg="invalid literal/lengths set";t.mode=J;break;}t.distbits=6;t.distcode=t.distdyn;Te={bits:t.distbits};Ce=f(c,t.lens,t.nlen,t.ndist,t.distcode,0,t.work,Te);t.distbits=Te.bits;if(Ce){e.msg="invalid distances set";t.mode=J;break;}t.mode=H;if(r===d){break e;};case H:t.mode=W;case W:if(ie>=6&&se>=258){e.next_out=ae;e.avail_out=se;e.next_in=te;e.avail_in=ie;t.hold=fe;t.bits=le;s(e,ce);ae=e.next_out;re=e.output;se=e.avail_out;te=e.next_in;ee=e.input;ie=e.avail_in;fe=t.hold;le=t.bits;if(t.mode===O){t.back=-1;}break;}t.back=0;for(;;){me=t.lencode[fe&(1<<t.lenbits)-1];be=me>>>24;ge=me>>>16&255;we=me&65535;if(be<=le){break;}if(ie===0){break e;}ie--;fe+=ee[te++]<<le;le+=8;}if(ge&&(ge&240)===0){ke=be;Ee=ge;Se=we;for(;;){me=t.lencode[Se+((fe&(1<<ke+Ee)-1)>>ke)];be=me>>>24;ge=me>>>16&255;we=me&65535;if(ke+be<=le){break;}if(ie===0){break e;}ie--;fe+=ee[te++]<<le;le+=8;}fe>>>=ke;le-=ke;t.back+=ke;}fe>>>=be;le-=be;t.back+=be;t.length=we;if(ge===0){t.mode=K;break;}if(ge&32){t.back=-1;t.mode=O;break;}if(ge&64){e.msg="invalid literal/length code";t.mode=J;break;}t.extra=ge&15;t.mode=V;case V:if(t.extra){ye=t.extra;while(le<ye){if(ie===0){break e;}ie--;fe+=ee[te++]<<le;le+=8;}t.length+=fe&(1<<t.extra)-1;fe>>>=t.extra;le-=t.extra;t.back+=t.extra;}t.was=t.length;t.mode=X;case X:for(;;){me=t.distcode[fe&(1<<t.distbits)-1];be=me>>>24;ge=me>>>16&255;we=me&65535;if(be<=le){break;}if(ie===0){break e;}ie--;fe+=ee[te++]<<le;le+=8;}if((ge&240)===0){ke=be;Ee=ge;Se=we;for(;;){me=t.distcode[Se+((fe&(1<<ke+Ee)-1)>>ke)];be=me>>>24;ge=me>>>16&255;we=me&65535;if(ke+be<=le){break;}if(ie===0){break e;}ie--;fe+=ee[te++]<<le;le+=8;}fe>>>=ke;le-=ke;t.back+=ke;}fe>>>=be;le-=be;t.back+=be;if(ge&64){e.msg="invalid distance code";t.mode=J;break;}t.offset=we;t.extra=ge&15;t.mode=G;case G:if(t.extra){ye=t.extra;while(le<ye){if(ie===0){break e;}ie--;fe+=ee[te++]<<le;le+=8;}t.offset+=fe&(1<<t.extra)-1;fe>>>=t.extra;le-=t.extra;t.back+=t.extra;}if(t.offset>t.dmax){e.msg="invalid distance too far back";t.mode=J;break;}t.mode=j;case j:if(se===0){break e;}ue=ce-se;if(t.offset>ue){ue=t.offset-ue;if(ue>t.whave){if(t.sane){e.msg="invalid distance too far back";t.mode=J;break;}}if(ue>t.wnext){ue-=t.wnext;he=t.wsize-ue;}else{he=t.wnext-ue;}if(ue>t.length){ue=t.length;}de=t.window;}else{de=re;he=ae-t.offset;ue=t.length;}if(ue>se){ue=se;}se-=ue;t.length-=ue;do{re[ae++]=de[he++];}while(--ue);if(t.length===0){t.mode=W;}break;case K:if(se===0){break e;}re[ae++]=t.length;se--;t.mode=W;break;case $:if(t.wrap){while(le<32){if(ie===0){break e;}ie--;fe|=ee[te++]<<le;le+=8;}ce-=se;e.total_out+=ce;t.total+=ce;if(ce){e.adler=t.check=t.flags?i(t.check,re,ce,ae-ce):n(t.check,re,ce,ae-ce);}ce=se;if((t.flags?fe:ne(fe))!==t.check){e.msg="incorrect data check";t.mode=J;break;}fe=0;le=0;}t.mode=Y;case Y:if(t.wrap&&t.flags){while(le<32){if(ie===0){break e;}ie--;fe+=ee[te++]<<le;le+=8;}if(fe!==(t.total&4294967295)){e.msg="incorrect length check";t.mode=J;break;}fe=0;le=0;}t.mode=Z;case Z:Ce=p;break e;case J:Ce=g;break e;case Q:return w;case q:;default:return b;}}e.next_out=ae;e.avail_out=se;e.next_in=te;e.avail_in=ie;t.hold=fe;t.bits=le;if(t.wsize||ce!==e.avail_out&&t.mode<J&&(t.mode<$||r!==u)){if(pe(e,e.output,e.next_out,ce-e.avail_out)){t.mode=Q;return w;}}oe-=e.avail_in;ce-=e.avail_out;e.total_in+=oe;e.total_out+=ce;t.total+=ce;if(t.wrap&&ce){e.adler=t.check=t.flags?i(t.check,re,ce,e.next_out-ce):n(t.check,re,ce,e.next_out-ce);}e.data_type=t.bits+(t.last?64:0)+(t.mode===O?128:0)+(t.mode===H||t.mode===N?256:0);if((oe===0&&ce===0||r===u)&&Ce===v){Ce=k;}return Ce;}function be(e){if(!e||!e.state){return b;}var r=e.state;if(r.window){r.window=null;}e.state=null;return v;}function ge(e,r){var t;if(!e||!e.state){return b;}t=e.state;if((t.wrap&2)===0){return b;}t.head=r;r.done=false;return v;}t.inflateReset=fe;t.inflateReset2=le;t.inflateResetKeep=se;t.inflateInit=ce;t.inflateInit2=oe;t.inflate=me;t.inflateEnd=be;t.inflateGetHeader=ge;t.inflateInfo="pako inflate (from Nodeca project)";},{"../utils/common":27,"./adler32":29,"./crc32":31,"./inffast":34,"./inftrees":36}],36:[function(e,r,t){"use strict";var a=e("../utils/common");var n=15;var i=852;var s=592;var f=0;var l=1;var o=2;var c=[3,4,5,6,7,8,9,10,11,13,15,17,19,23,27,31,35,43,51,59,67,83,99,115,131,163,195,227,258,0,0];var u=[16,16,16,16,16,16,16,16,17,17,17,17,18,18,18,18,19,19,19,19,20,20,20,20,21,21,21,21,16,72,78];var h=[1,2,3,4,5,7,9,13,17,25,33,49,65,97,129,193,257,385,513,769,1025,1537,2049,3073,4097,6145,8193,12289,16385,24577,0,0];var d=[16,16,16,16,17,17,18,18,19,19,20,20,21,21,22,22,23,23,24,24,25,25,26,26,27,27,28,28,29,29,64,64];r.exports=function v(e,r,t,p,m,b,g,w){var k=w.bits;var E=0;var S=0;var _=0,C=0;var B=0;var T=0;var y=0;var x=0;var A=0;var I=0;var R;var F;var O;var D;var P;var N=null;var L=0;var M;var U=new a.Buf16(n+1);var z=new a.Buf16(n+1);var H=null;var W=0;var V,X,G;for(E=0;E<=n;E++){U[E]=0;}for(S=0;S<p;S++){U[r[t+S]]++;}B=k;for(C=n;C>=1;C--){if(U[C]!==0){break;}}if(B>C){B=C;}if(C===0){m[b++]=1<<24|64<<16|0;m[b++]=1<<24|64<<16|0;w.bits=1;return 0;}for(_=1;_<C;_++){if(U[_]!==0){break;}}if(B<_){B=_;}x=1;for(E=1;E<=n;E++){x<<=1;x-=U[E];if(x<0){return-1;}}if(x>0&&(e===f||C!==1)){return-1;}z[1]=0;for(E=1;E<n;E++){z[E+1]=z[E]+U[E];}for(S=0;S<p;S++){if(r[t+S]!==0){g[z[r[t+S]]++]=S;}}if(e===f){N=H=g;M=19;}else if(e===l){N=c;L-=257;H=u;W-=257;M=256;}else{N=h;H=d;M=-1;}I=0;S=0;E=_;P=b;T=B;y=0;O=-1;A=1<<B;D=A-1;if(e===l&&A>i||e===o&&A>s){return 1;}var j=0;for(;;){j++;V=E-y;if(g[S]<M){X=0;G=g[S];}else if(g[S]>M){X=H[W+g[S]];G=N[L+g[S]];}else{X=32+64;G=0;}R=1<<E-y;F=1<<T;_=F;do{F-=R;m[P+(I>>y)+F]=V<<24|X<<16|G|0;}while(F!==0);R=1<<E-1;while(I&R){R>>=1;}if(R!==0){I&=R-1;I+=R;}else{I=0;}S++;if(--U[E]===0){if(E===C){break;}E=r[t+g[S]];}if(E>B&&(I&D)!==O){if(y===0){y=B;}P+=_;T=E-y;x=1<<T;while(T+y<C){x-=U[T+y];if(x<=0){break;}T++;x<<=1;}A+=1<<T;if(e===l&&A>i||e===o&&A>s){return 1;}O=I&D;m[O]=B<<24|T<<16|P-b|0;}}if(I!==0){m[P+I]=E-y<<24|64<<16|0;}w.bits=B;return 0;};},{"../utils/common":27}],37:[function(e,r,t){"use strict";r.exports={2:"need dictionary",1:"stream end",0:"","-1":"file error","-2":"stream error","-3":"data error","-4":"insufficient memory","-5":"buffer error","-6":"incompatible version"};},{}],38:[function(e,r,t){"use strict";var a=e("../utils/common");var n=4;var i=0;var s=1;var f=2;function l(e){var r=e.length;while(--r>=0){e[r]=0;}}var o=0;var c=1;var u=2;var h=3;var d=258;var v=29;var p=256;var m=p+1+v;var b=30;var g=19;var w=2*m+1;var k=15;var E=16;var S=7;var _=256;var C=16;var B=17;var T=18;var y=[0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0];var x=[0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13];var A=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,3,7];var I=[16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15];var R=512;var F=new Array((m+2)*2);l(F);var O=new Array(b*2);l(O);var D=new Array(R);l(D);var P=new Array(d-h+1);l(P);var N=new Array(v);l(N);var L=new Array(b);l(L);var M=function M(e,r,t,a,n){this.static_tree=e;this.extra_bits=r;this.extra_base=t;this.elems=a;this.max_length=n;this.has_stree=e&&e.length;};var U;var z;var H;var W=function W(e,r){this.dyn_tree=e;this.max_code=0;this.stat_desc=r;};function V(e){return e<256?D[e]:D[256+(e>>>7)];}function X(e,r){e.pending_buf[e.pending++]=r&255;e.pending_buf[e.pending++]=r>>>8&255;}function G(e,r,t){if(e.bi_valid>E-t){e.bi_buf|=r<<e.bi_valid&65535;X(e,e.bi_buf);e.bi_buf=r>>E-e.bi_valid;e.bi_valid+=t-E;}else{e.bi_buf|=r<<e.bi_valid&65535;e.bi_valid+=t;}}function j(e,r,t){G(e,t[r*2],t[r*2+1]);}function K(e,r){var t=0;do{t|=e&1;e>>>=1;t<<=1;}while(--r>0);return t>>>1;}function $(e){if(e.bi_valid===16){X(e,e.bi_buf);e.bi_buf=0;e.bi_valid=0;}else if(e.bi_valid>=8){e.pending_buf[e.pending++]=e.bi_buf&255;e.bi_buf>>=8;e.bi_valid-=8;}}function Y(e,r){var t=r.dyn_tree;var a=r.max_code;var n=r.stat_desc.static_tree;var i=r.stat_desc.has_stree;var s=r.stat_desc.extra_bits;var f=r.stat_desc.extra_base;var l=r.stat_desc.max_length;var o;var c,u;var h;var d;var v;var p=0;for(h=0;h<=k;h++){e.bl_count[h]=0;}t[e.heap[e.heap_max]*2+1]=0;for(o=e.heap_max+1;o<w;o++){c=e.heap[o];h=t[t[c*2+1]*2+1]+1;if(h>l){h=l;p++;}t[c*2+1]=h;if(c>a){continue;}e.bl_count[h]++;d=0;if(c>=f){d=s[c-f];}v=t[c*2];e.opt_len+=v*(h+d);if(i){e.static_len+=v*(n[c*2+1]+d);}}if(p===0){return;}do{h=l-1;while(e.bl_count[h]===0){h--;}e.bl_count[h]--;e.bl_count[h+1]+=2;e.bl_count[l]--;p-=2;}while(p>0);for(h=l;h!==0;h--){c=e.bl_count[h];while(c!==0){u=e.heap[--o];if(u>a){continue;}if(t[u*2+1]!==h){e.opt_len+=(h-t[u*2+1])*t[u*2];t[u*2+1]=h;}c--;}}}function Z(e,r,t){var a=new Array(k+1);var n=0;var i;var s;for(i=1;i<=k;i++){a[i]=n=n+t[i-1]<<1;}for(s=0;s<=r;s++){var f=e[s*2+1];if(f===0){continue;}e[s*2]=K(a[f]++,f);}}function J(){var e;var r;var t;var a;var n;var i=new Array(k+1);t=0;for(a=0;a<v-1;a++){N[a]=t;for(e=0;e<1<<y[a];e++){P[t++]=a;}}P[t-1]=a;n=0;for(a=0;a<16;a++){L[a]=n;for(e=0;e<1<<x[a];e++){D[n++]=a;}}n>>=7;for(;a<b;a++){L[a]=n<<7;for(e=0;e<1<<x[a]-7;e++){D[256+n++]=a;}}for(r=0;r<=k;r++){i[r]=0;}e=0;while(e<=143){F[e*2+1]=8;e++;i[8]++;}while(e<=255){F[e*2+1]=9;e++;i[9]++;}while(e<=279){F[e*2+1]=7;e++;i[7]++;}while(e<=287){F[e*2+1]=8;e++;i[8]++;}Z(F,m+1,i);for(e=0;e<b;e++){O[e*2+1]=5;O[e*2]=K(e,5);}U=new M(F,y,p+1,m,k);z=new M(O,x,0,b,k);H=new M(new Array(0),A,0,g,S);}function Q(e){var r;for(r=0;r<m;r++){e.dyn_ltree[r*2]=0;}for(r=0;r<b;r++){e.dyn_dtree[r*2]=0;}for(r=0;r<g;r++){e.bl_tree[r*2]=0;}e.dyn_ltree[_*2]=1;e.opt_len=e.static_len=0;e.last_lit=e.matches=0;}function q(e){if(e.bi_valid>8){X(e,e.bi_buf);}else if(e.bi_valid>0){e.pending_buf[e.pending++]=e.bi_buf;}e.bi_buf=0;e.bi_valid=0;}function ee(e,r,t,n){q(e);if(n){X(e,t);X(e,~t);}a.arraySet(e.pending_buf,e.window,r,t,e.pending);e.pending+=t;}function re(e,r,t,a){var n=r*2;var i=t*2;return e[n]<e[i]||e[n]===e[i]&&a[r]<=a[t];}function te(e,r,t){var a=e.heap[t];var n=t<<1;while(n<=e.heap_len){if(n<e.heap_len&&re(r,e.heap[n+1],e.heap[n],e.depth)){n++;}if(re(r,a,e.heap[n],e.depth)){break;}e.heap[t]=e.heap[n];t=n;n<<=1;}e.heap[t]=a;}function ae(e,r,t){var a;var n;var i=0;var s;var f;if(e.last_lit!==0){do{a=e.pending_buf[e.d_buf+i*2]<<8|e.pending_buf[e.d_buf+i*2+1];n=e.pending_buf[e.l_buf+i];i++;if(a===0){j(e,n,r);}else{s=P[n];j(e,s+p+1,r);f=y[s];if(f!==0){n-=N[s];G(e,n,f);}a--;s=V(a);j(e,s,t);f=x[s];if(f!==0){a-=L[s];G(e,a,f);}}}while(i<e.last_lit);}j(e,_,r);}function ne(e,r){var t=r.dyn_tree;var a=r.stat_desc.static_tree;var n=r.stat_desc.has_stree;var i=r.stat_desc.elems;var s,f;var l=-1;var o;e.heap_len=0;e.heap_max=w;for(s=0;s<i;s++){if(t[s*2]!==0){e.heap[++e.heap_len]=l=s;e.depth[s]=0;}else{t[s*2+1]=0;}}while(e.heap_len<2){o=e.heap[++e.heap_len]=l<2?++l:0;t[o*2]=1;e.depth[o]=0;e.opt_len--;if(n){e.static_len-=a[o*2+1];}}r.max_code=l;for(s=e.heap_len>>1;s>=1;s--){te(e,t,s);}o=i;do{s=e.heap[1];e.heap[1]=e.heap[e.heap_len--];te(e,t,1);f=e.heap[1];e.heap[--e.heap_max]=s;e.heap[--e.heap_max]=f;t[o*2]=t[s*2]+t[f*2];e.depth[o]=(e.depth[s]>=e.depth[f]?e.depth[s]:e.depth[f])+1;t[s*2+1]=t[f*2+1]=o;e.heap[1]=o++;te(e,t,1);}while(e.heap_len>=2);e.heap[--e.heap_max]=e.heap[1];Y(e,r);Z(t,l,e.bl_count);}function ie(e,r,t){var a;var n=-1;var i;var s=r[0*2+1];var f=0;var l=7;var o=4;if(s===0){l=138;o=3;}r[(t+1)*2+1]=65535;for(a=0;a<=t;a++){i=s;s=r[(a+1)*2+1];if(++f<l&&i===s){continue;}else if(f<o){e.bl_tree[i*2]+=f;}else if(i!==0){if(i!==n){e.bl_tree[i*2]++;}e.bl_tree[C*2]++;}else if(f<=10){e.bl_tree[B*2]++;}else{e.bl_tree[T*2]++;}f=0;n=i;if(s===0){l=138;o=3;}else if(i===s){l=6;o=3;}else{l=7;o=4;}}}function se(e,r,t){var a;var n=-1;var i;var s=r[0*2+1];var f=0;var l=7;var o=4;if(s===0){l=138;o=3;}for(a=0;a<=t;a++){i=s;s=r[(a+1)*2+1];if(++f<l&&i===s){continue;}else if(f<o){do{j(e,i,e.bl_tree);}while(--f!==0);}else if(i!==0){if(i!==n){j(e,i,e.bl_tree);f--;}j(e,C,e.bl_tree);G(e,f-3,2);}else if(f<=10){j(e,B,e.bl_tree);G(e,f-3,3);}else{j(e,T,e.bl_tree);G(e,f-11,7);}f=0;n=i;if(s===0){l=138;o=3;}else if(i===s){l=6;o=3;}else{l=7;o=4;}}}function fe(e){var r;ie(e,e.dyn_ltree,e.l_desc.max_code);ie(e,e.dyn_dtree,e.d_desc.max_code);ne(e,e.bl_desc);for(r=g-1;r>=3;r--){if(e.bl_tree[I[r]*2+1]!==0){break;}}e.opt_len+=3*(r+1)+5+5+4;return r;}function le(e,r,t,a){var n;G(e,r-257,5);G(e,t-1,5);G(e,a-4,4);for(n=0;n<a;n++){G(e,e.bl_tree[I[n]*2+1],3);}se(e,e.dyn_ltree,r-1);se(e,e.dyn_dtree,t-1);}function oe(e){var r=4093624447;var t;for(t=0;t<=31;t++,r>>>=1){if(r&1&&e.dyn_ltree[t*2]!==0){return i;}}if(e.dyn_ltree[9*2]!==0||e.dyn_ltree[10*2]!==0||e.dyn_ltree[13*2]!==0){return s;}for(t=32;t<p;t++){if(e.dyn_ltree[t*2]!==0){return s;}}return i;}var ce=false;function ue(e){if(!ce){J();ce=true;}e.l_desc=new W(e.dyn_ltree,U);e.d_desc=new W(e.dyn_dtree,z);e.bl_desc=new W(e.bl_tree,H);e.bi_buf=0;e.bi_valid=0;Q(e);}function he(e,r,t,a){G(e,(o<<1)+(a?1:0),3);ee(e,r,t,true);}function de(e){G(e,c<<1,3);j(e,_,F);$(e);}function ve(e,r,t,a){var i,s;var l=0;if(e.level>0){if(e.strm.data_type===f){e.strm.data_type=oe(e);}ne(e,e.l_desc);ne(e,e.d_desc);l=fe(e);i=e.opt_len+3+7>>>3;s=e.static_len+3+7>>>3;if(s<=i){i=s;}}else{i=s=t+5;}if(t+4<=i&&r!==-1){he(e,r,t,a);}else if(e.strategy===n||s===i){G(e,(c<<1)+(a?1:0),3);ae(e,F,O);}else{G(e,(u<<1)+(a?1:0),3);le(e,e.l_desc.max_code+1,e.d_desc.max_code+1,l+1);ae(e,e.dyn_ltree,e.dyn_dtree);}Q(e);if(a){q(e);}}function pe(e,r,t){e.pending_buf[e.d_buf+e.last_lit*2]=r>>>8&255;e.pending_buf[e.d_buf+e.last_lit*2+1]=r&255;e.pending_buf[e.l_buf+e.last_lit]=t&255;e.last_lit++;if(r===0){e.dyn_ltree[t*2]++;}else{e.matches++;r--;e.dyn_ltree[(P[t]+p+1)*2]++;e.dyn_dtree[V(r)*2]++;}return e.last_lit===e.lit_bufsize-1;}t._tr_init=ue;t._tr_stored_block=he;t._tr_flush_block=ve;t._tr_tally=pe;t._tr_align=de;},{"../utils/common":27}],39:[function(e,r,t){"use strict";function a(){this.input=null;this.next_in=0;this.avail_in=0;this.total_in=0;this.output=null;this.next_out=0;this.avail_out=0;this.total_out=0;this.msg="";this.state=null;this.data_type=2;this.adler=0;}r.exports=a;},{}]},{},[9])(9);});var XLSX={};function make_xlsx_lib(e){e.version="0.17.4";var r=1200,t=1252;if(true){if(typeof cptable==="undefined"){if(typeof global!=="undefined")global.cptable=undefined;else if(typeof window!=="undefined")window.cptable=undefined;}}var a=[874,932,936,949,950];for(var n=0;n<=8;++n){a.push(1250+n);}var i={0:1252,1:65001,2:65001,77:1e4,128:932,129:949,130:1361,134:936,136:950,161:1253,162:1254,163:1258,177:1255,178:1256,186:1257,204:1251,222:874,238:1250,255:1252,69:6969};var s=function s(e){if(a.indexOf(e)==-1)return;t=i[0]=e;};function f(){s(1252);}var l=function l(e){r=e;s(e);};function o(){l(1200);f();}function c(e){var r=[];for(var t=0,a=e.length;t<a;++t){r[t]=e.charCodeAt(t);}return r;}function u(e){var r=[];for(var t=0;t<e.length>>1;++t){r[t]=String.fromCharCode(e.charCodeAt(2*t)+(e.charCodeAt(2*t+1)<<8));}return r.join("");}function h(e){var r=[];for(var t=0;t<e.length>>1;++t){r[t]=String.fromCharCode(e.charCodeAt(2*t+1)+(e.charCodeAt(2*t)<<8));}return r.join("");}var d=function d(e){var r=e.charCodeAt(0),t=e.charCodeAt(1);if(r==255&&t==254)return u(e.slice(2));if(r==254&&t==255)return h(e.slice(2));if(r==65279)return e.slice(1);return e;};var v=function Rb(e){return String.fromCharCode(e);};var p=function Fb(e){return String.fromCharCode(e);};if(typeof cptable!=="undefined"){l=function l(e){r=e;s(e);};d=function d(e){if(e.charCodeAt(0)===255&&e.charCodeAt(1)===254){return cptable.utils.decode(1200,c(e.slice(2)));}return e;};v=function Ob(e){if(r===1200)return String.fromCharCode(e);return cptable.utils.decode(r,[e&255,e>>8])[0];};p=function Db(e){return cptable.utils.decode(t,[e])[0];};}var m=null;var b=true;var g=function Pb(){var e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";return{encode:function encode(r){var t="";var a=0,n=0,i=0,s=0,f=0,l=0,o=0;for(var c=0;c<r.length;){a=r.charCodeAt(c++);s=a>>2;n=r.charCodeAt(c++);f=(a&3)<<4|n>>4;i=r.charCodeAt(c++);l=(n&15)<<2|i>>6;o=i&63;if(isNaN(n)){l=o=64;}else if(isNaN(i)){o=64;}t+=e.charAt(s)+e.charAt(f)+e.charAt(l)+e.charAt(o);}return t;},decode:function r(t){var a="";var n=0,i=0,s=0,f=0,l=0,o=0,c=0;t=t.replace(/[^\w\+\/\=]/g,"");for(var u=0;u<t.length;){f=e.indexOf(t.charAt(u++));l=e.indexOf(t.charAt(u++));n=f<<2|l>>4;a+=String.fromCharCode(n);o=e.indexOf(t.charAt(u++));i=(l&15)<<4|o>>2;if(o!==64){a+=String.fromCharCode(i);}c=e.indexOf(t.charAt(u++));s=(o&3)<<6|c;if(c!==64){a+=String.fromCharCode(s);}}return a;}};}();var w=typeof Buffer!=="undefined"&&typeof process!=="undefined"&&typeof process.versions!=="undefined"&&!!process.versions.node;var k=function k(){};if(typeof Buffer!=="undefined"){var E=!Buffer.from;if(!E)try{Buffer.from("foo","utf8");}catch(S){E=true;}k=E?function(e,r){return r?new Buffer(e,r):new Buffer(e);}:Buffer.from.bind(Buffer);if(!Buffer.alloc)Buffer.alloc=function(e){return new Buffer(e);};if(!Buffer.allocUnsafe)Buffer.allocUnsafe=function(e){return new Buffer(e);};}function _(e){return w?Buffer.alloc(e):new Array(e);}function C(e){return w?Buffer.allocUnsafe(e):new Array(e);}var B=function Nb(e){if(w)return k(e,"binary");return e.split("").map(function(e){return e.charCodeAt(0)&255;});};function T(e){if(typeof ArrayBuffer==="undefined")return B(e);var r=new ArrayBuffer(e.length),t=new Uint8Array(r);for(var a=0;a!=e.length;++a){t[a]=e.charCodeAt(a)&255;}return r;}function y(e){if(Array.isArray(e))return e.map(function(e){return String.fromCharCode(e);}).join("");var r=[];for(var t=0;t<e.length;++t){r[t]=String.fromCharCode(e[t]);}return r.join("");}function x(e){if(typeof Uint8Array==="undefined")throw new Error("Unsupported");return new Uint8Array(e);}function A(e){if(typeof ArrayBuffer=="undefined")throw new Error("Unsupported");if(e instanceof ArrayBuffer)return A(new Uint8Array(e));var r=new Array(e.length);for(var t=0;t<e.length;++t){r[t]=e[t];}return r;}var I=function I(e){return[].concat.apply([],e);};var R=/\u0000/g,F=/[\u0001-\u0006]/g;var O={};var D=function Lb(e){e.version="0.11.2";function r(e){var r="",t=e.length-1;while(t>=0){r+=e.charAt(t--);}return r;}function t(e,r){var t="";while(t.length<r){t+=e;}return t;}function a(e,r){var a=""+e;return a.length>=r?a:t("0",r-a.length)+a;}function n(e,r){var a=""+e;return a.length>=r?a:t(" ",r-a.length)+a;}function i(e,r){var a=""+e;return a.length>=r?a:a+t(" ",r-a.length);}function s(e,r){var a=""+Math.round(e);return a.length>=r?a:t("0",r-a.length)+a;}function f(e,r){var a=""+e;return a.length>=r?a:t("0",r-a.length)+a;}var l=Math.pow(2,32);function o(e,r){if(e>l||e<-l)return s(e,r);var t=Math.round(e);return f(t,r);}function c(e,r){r=r||0;return e.length>=7+r&&(e.charCodeAt(r)|32)===103&&(e.charCodeAt(r+1)|32)===101&&(e.charCodeAt(r+2)|32)===110&&(e.charCodeAt(r+3)|32)===101&&(e.charCodeAt(r+4)|32)===114&&(e.charCodeAt(r+5)|32)===97&&(e.charCodeAt(r+6)|32)===108;}var u=[["Sun","Sunday"],["Mon","Monday"],["Tue","Tuesday"],["Wed","Wednesday"],["Thu","Thursday"],["Fri","Friday"],["Sat","Saturday"]];var h=[["J","Jan","January"],["F","Feb","February"],["M","Mar","March"],["A","Apr","April"],["M","May","May"],["J","Jun","June"],["J","Jul","July"],["A","Aug","August"],["S","Sep","September"],["O","Oct","October"],["N","Nov","November"],["D","Dec","December"]];function d(e){e[0]="General";e[1]="0";e[2]="0.00";e[3]="#,##0";e[4]="#,##0.00";e[9]="0%";e[10]="0.00%";e[11]="0.00E+00";e[12]="# ?/?";e[13]="# ??/??";e[14]="m/d/yy";e[15]="d-mmm-yy";e[16]="d-mmm";e[17]="mmm-yy";e[18]="h:mm AM/PM";e[19]="h:mm:ss AM/PM";e[20]="h:mm";e[21]="h:mm:ss";e[22]="m/d/yy h:mm";e[37]="#,##0 ;(#,##0)";e[38]="#,##0 ;[Red](#,##0)";e[39]="#,##0.00;(#,##0.00)";e[40]="#,##0.00;[Red](#,##0.00)";e[45]="mm:ss";e[46]="[h]:mm:ss";e[47]="mmss.0";e[48]="##0.0E+0";e[49]="@";e[56]='"上午/下午 "hh"時"mm"分"ss"秒 "';}var v={};d(v);var p=[];var m=0;for(m=5;m<=8;++m){p[m]=32+m;}for(m=23;m<=26;++m){p[m]=0;}for(m=27;m<=31;++m){p[m]=14;}for(m=50;m<=58;++m){p[m]=14;}for(m=59;m<=62;++m){p[m]=m-58;}for(m=67;m<=68;++m){p[m]=m-58;}for(m=72;m<=75;++m){p[m]=m-58;}for(m=67;m<=68;++m){p[m]=m-57;}for(m=76;m<=78;++m){p[m]=m-56;}for(m=79;m<=81;++m){p[m]=m-34;}var b=[];b[5]=b[63]='"$"#,##0_);\\("$"#,##0\\)';b[6]=b[64]='"$"#,##0_);[Red]\\("$"#,##0\\)';b[7]=b[65]='"$"#,##0.00_);\\("$"#,##0.00\\)';b[8]=b[66]='"$"#,##0.00_);[Red]\\("$"#,##0.00\\)';b[41]='_(* #,##0_);_(* \\(#,##0\\);_(* "-"_);_(@_)';b[42]='_("$"* #,##0_);_("$"* \\(#,##0\\);_("$"* "-"_);_(@_)';b[43]='_(* #,##0.00_);_(* \\(#,##0.00\\);_(* "-"??_);_(@_)';b[44]='_("$"* #,##0.00_);_("$"* \\(#,##0.00\\);_("$"* "-"??_);_(@_)';function g(e,r,t){var a=e<0?-1:1;var n=e*a;var i=0,s=1,f=0;var l=1,o=0,c=0;var u=Math.floor(n);while(o<r){u=Math.floor(n);f=u*s+i;c=u*o+l;if(n-u<5e-8)break;n=1/(n-u);i=s;s=f;l=o;o=c;}if(c>r){if(o>r){c=l;f=i;}else{c=o;f=s;}}if(!t)return[0,a*f,c];var h=Math.floor(a*f/c);return[h,a*f-h*c,c];}function w(e,r,t){if(e>2958465||e<0)return null;var a=e|0,n=Math.floor(86400*(e-a)),i=0;var s=[];var f={D:a,T:n,u:86400*(e-a)-n,y:0,m:0,d:0,H:0,M:0,S:0,q:0};if(Math.abs(f.u)<1e-6)f.u=0;if(r&&r.date1904)a+=1462;if(f.u>.9999){f.u=0;if(++n==86400){f.T=n=0;++a;++f.D;}}if(a===60){s=t?[1317,10,29]:[1900,2,29];i=3;}else if(a===0){s=t?[1317,8,29]:[1900,1,0];i=6;}else{if(a>60)--a;var l=new Date(1900,0,1);l.setDate(l.getDate()+a-1);s=[l.getFullYear(),l.getMonth()+1,l.getDate()];i=l.getDay();if(a<60)i=(i+6)%7;if(t)i=y(l,s);}f.y=s[0];f.m=s[1];f.d=s[2];f.S=n%60;n=Math.floor(n/60);f.M=n%60;n=Math.floor(n/60);f.H=n;f.q=i;return f;}e.parse_date_code=w;var k=new Date(1899,11,31,0,0,0);var E=k.getTime();var S=new Date(1900,2,1,0,0,0);function _(e,r){var t=e.getTime();if(r)t-=1461*24*60*60*1e3;else if(e>=S)t+=24*60*60*1e3;return(t-(E+(e.getTimezoneOffset()-k.getTimezoneOffset())*6e4))/(24*60*60*1e3);}function C(e){return e.toString(10);}e._general_int=C;var B=function H(){var e=/(?:\.0*|(\.\d*[1-9])0+)$/;function r(r){return r.indexOf(".")==-1?r:r.replace(e,"$1");}var t=/(?:\.0*|(\.\d*[1-9])0+)[Ee]/;var a=/(E[+-])(\d)$/;function n(e){if(e.indexOf("E")==-1)return e;return e.replace(t,"$1E").replace(a,"$10$2");}function i(e){var t=e<0?12:11;var a=r(e.toFixed(12));if(a.length<=t)return a;a=e.toPrecision(10);if(a.length<=t)return a;return e.toExponential(5);}function s(e){var t=r(e.toFixed(11));return t.length>(e<0?12:11)||t==="0"||t==="-0"?e.toPrecision(6):t;}function f(e){var t=Math.floor(Math.log(Math.abs(e))*Math.LOG10E),a;if(t>=-4&&t<=-1)a=e.toPrecision(10+t);else if(Math.abs(t)<=9)a=i(e);else if(t===10)a=e.toFixed(10).substr(0,12);else a=s(e);return r(n(a.toUpperCase()));}return f;}();e._general_num=B;function T(e,r){switch(_typeof(e)){case"string":return e;case"boolean":return e?"TRUE":"FALSE";case"number":return(e|0)===e?e.toString(10):B(e);case"undefined":return"";case"object":if(e==null)return"";if(e instanceof Date)return U(14,_(e,r&&r.date1904),r);}throw new Error("unsupported value in General format: "+e);}e._general=T;function y(e,r){r[0]-=581;var t=e.getDay();if(e<60)t=(t+6)%7;return t;}function x(e,r,t,n){var i="",s=0,f=0,l=t.y,o,c=0;switch(e){case 98:l=t.y+543;case 121:switch(r.length){case 1:;case 2:o=l%100;c=2;break;default:o=l%1e4;c=4;break;}break;case 109:switch(r.length){case 1:;case 2:o=t.m;c=r.length;break;case 3:return h[t.m-1][1];case 5:return h[t.m-1][0];default:return h[t.m-1][2];}break;case 100:switch(r.length){case 1:;case 2:o=t.d;c=r.length;break;case 3:return u[t.q][0];default:return u[t.q][1];}break;case 104:switch(r.length){case 1:;case 2:o=1+(t.H+11)%12;c=r.length;break;default:throw"bad hour format: "+r;}break;case 72:switch(r.length){case 1:;case 2:o=t.H;c=r.length;break;default:throw"bad hour format: "+r;}break;case 77:switch(r.length){case 1:;case 2:o=t.M;c=r.length;break;default:throw"bad minute format: "+r;}break;case 115:if(r!="s"&&r!="ss"&&r!=".0"&&r!=".00"&&r!=".000")throw"bad second format: "+r;if(t.u===0&&(r=="s"||r=="ss"))return a(t.S,r.length);if(n>=2)f=n===3?1e3:100;else f=n===1?10:1;s=Math.round(f*(t.S+t.u));if(s>=60*f)s=0;if(r==="s")return s===0?"0":""+s/f;i=a(s,2+n);if(r==="ss")return i.substr(0,2);return"."+i.substr(2,r.length-1);case 90:switch(r){case"[h]":;case"[hh]":o=t.D*24+t.H;break;case"[m]":;case"[mm]":o=(t.D*24+t.H)*60+t.M;break;case"[s]":;case"[ss]":o=((t.D*24+t.H)*60+t.M)*60+Math.round(t.S+t.u);break;default:throw"bad abstime format: "+r;}c=r.length===3?1:2;break;case 101:o=l;c=1;break;}var d=c>0?a(o,c):"";return d;}function A(e){var r=3;if(e.length<=r)return e;var t=e.length%r,a=e.substr(0,t);for(;t!=e.length;t+=r){a+=(a.length>0?",":"")+e.substr(t,r);}return a;}var I=function W(){var e=/%/g;function s(r,a,n){var i=a.replace(e,""),s=a.length-i.length;return I(r,i,n*Math.pow(10,2*s))+t("%",s);}function f(e,r,t){var a=r.length-1;while(r.charCodeAt(a-1)===44){--a;}return I(e,r.substr(0,a),t/Math.pow(10,3*(r.length-a)));}function l(e,r){var t;var a=e.indexOf("E")-e.indexOf(".")-1;if(e.match(/^#+0.0E\+0$/)){if(r==0)return"0.0E+0";else if(r<0)return"-"+l(e,-r);var n=e.indexOf(".");if(n===-1)n=e.indexOf("E");var i=Math.floor(Math.log(r)*Math.LOG10E)%n;if(i<0)i+=n;t=(r/Math.pow(10,i)).toPrecision(a+1+(n+i)%n);if(t.indexOf("e")===-1){var s=Math.floor(Math.log(r)*Math.LOG10E);if(t.indexOf(".")===-1)t=t.charAt(0)+"."+t.substr(1)+"E+"+(s-t.length+i);else t+="E+"+(s-i);while(t.substr(0,2)==="0."){t=t.charAt(0)+t.substr(2,n)+"."+t.substr(2+n);t=t.replace(/^0+([1-9])/,"$1").replace(/^0+\./,"0.");}t=t.replace(/\+-/,"-");}t=t.replace(/^([+-]?)(\d*)\.(\d*)[Ee]/,function(e,r,t,a){return r+t+a.substr(0,(n+i)%n)+"."+a.substr(i)+"E";});}else t=r.toExponential(a);if(e.match(/E\+00$/)&&t.match(/e[+-]\d$/))t=t.substr(0,t.length-1)+"0"+t.charAt(t.length-1);if(e.match(/E\-/)&&t.match(/e\+/))t=t.replace(/e\+/,"e");return t.replace("e","E");}var c=/# (\?+)( ?)\/( ?)(\d+)/;function u(e,r,i){var s=parseInt(e[4],10),f=Math.round(r*s),l=Math.floor(f/s);var o=f-l*s,c=s;return i+(l===0?"":""+l)+" "+(o===0?t(" ",e[1].length+1+e[4].length):n(o,e[1].length)+e[2]+"/"+e[3]+a(c,e[4].length));}function h(e,r,a){return a+(r===0?"":""+r)+t(" ",e[1].length+2+e[4].length);}var d=/^#*0*\.([0#]+)/;var v=/\).*[0#]/;var p=/\(###\) ###\\?-####/;function m(e){var r="",t;for(var a=0;a!=e.length;++a){switch(t=e.charCodeAt(a)){case 35:break;case 63:r+=" ";break;case 48:r+="0";break;default:r+=String.fromCharCode(t);}}return r;}function b(e,r){var t=Math.pow(10,r);return""+Math.round(e*t)/t;}function w(e,r){var t=e-Math.floor(e),a=Math.pow(10,r);if(r<(""+Math.round(t*a)).length)return 0;return Math.round(t*a);}function k(e,r){if(r<(""+Math.round((e-Math.floor(e))*Math.pow(10,r))).length){return 1;}return 0;}function E(e){if(e<2147483647&&e>-2147483648)return""+(e>=0?e|0:e-1|0);return""+Math.floor(e);}function S(e,h,_){if(e.charCodeAt(0)===40&&!h.match(v)){var C=h.replace(/\( */,"").replace(/ \)/,"").replace(/\)/,"");if(_>=0)return S("n",C,_);return"("+S("n",C,-_)+")";}if(h.charCodeAt(h.length-1)===44)return f(e,h,_);if(h.indexOf("%")!==-1)return s(e,h,_);if(h.indexOf("E")!==-1)return l(h,_);if(h.charCodeAt(0)===36)return"$"+S(e,h.substr(h.charAt(1)==" "?2:1),_);var B;var T,y,x,R=Math.abs(_),F=_<0?"-":"";if(h.match(/^00+$/))return F+o(R,h.length);if(h.match(/^[#?]+$/)){B=o(_,0);if(B==="0")B="";return B.length>h.length?B:m(h.substr(0,h.length-B.length))+B;}if(T=h.match(c))return u(T,R,F);if(h.match(/^#+0+$/))return F+o(R,h.length-h.indexOf("0"));if(T=h.match(d)){B=b(_,T[1].length).replace(/^([^\.]+)$/,"$1."+m(T[1])).replace(/\.$/,"."+m(T[1])).replace(/\.(\d*)$/,function(e,r){return"."+r+t("0",m(T[1]).length-r.length);});return h.indexOf("0.")!==-1?B:B.replace(/^0\./,".");}h=h.replace(/^#+([0.])/,"$1");if(T=h.match(/^(0*)\.(#*)$/)){return F+b(R,T[2].length).replace(/\.(\d*[1-9])0*$/,".$1").replace(/^(-?\d*)$/,"$1.").replace(/^0\./,T[1].length?"0.":".");}if(T=h.match(/^#{1,3},##0(\.?)$/))return F+A(o(R,0));if(T=h.match(/^#,##0\.([#0]*0)$/)){return _<0?"-"+S(e,h,-_):A(""+(Math.floor(_)+k(_,T[1].length)))+"."+a(w(_,T[1].length),T[1].length);}if(T=h.match(/^#,#*,#0/))return S(e,h.replace(/^#,#*,/,""),_);if(T=h.match(/^([0#]+)(\\?-([0#]+))+$/)){B=r(S(e,h.replace(/[\\-]/g,""),_));y=0;return r(r(h.replace(/\\/g,"")).replace(/[0#]/g,function(e){return y<B.length?B.charAt(y++):e==="0"?"0":"";}));}if(h.match(p)){B=S(e,"##########",_);return"("+B.substr(0,3)+") "+B.substr(3,3)+"-"+B.substr(6);}var O="";if(T=h.match(/^([#0?]+)( ?)\/( ?)([#0?]+)/)){y=Math.min(T[4].length,7);x=g(R,Math.pow(10,y)-1,false);B=""+F;O=I("n",T[1],x[1]);if(O.charAt(O.length-1)==" ")O=O.substr(0,O.length-1)+"0";B+=O+T[2]+"/"+T[3];O=i(x[2],y);if(O.length<T[4].length)O=m(T[4].substr(T[4].length-O.length))+O;B+=O;return B;}if(T=h.match(/^# ([#0?]+)( ?)\/( ?)([#0?]+)/)){y=Math.min(Math.max(T[1].length,T[4].length),7);x=g(R,Math.pow(10,y)-1,true);return F+(x[0]||(x[1]?"":"0"))+" "+(x[1]?n(x[1],y)+T[2]+"/"+T[3]+i(x[2],y):t(" ",2*y+1+T[2].length+T[3].length));}if(T=h.match(/^[#0?]+$/)){B=o(_,0);if(h.length<=B.length)return B;return m(h.substr(0,h.length-B.length))+B;}if(T=h.match(/^([#0?]+)\.([#0]+)$/)){B=""+_.toFixed(Math.min(T[2].length,10)).replace(/([^0])0+$/,"$1");y=B.indexOf(".");var D=h.indexOf(".")-y,P=h.length-B.length-D;return m(h.substr(0,D)+B+h.substr(h.length-P));}if(T=h.match(/^00,000\.([#0]*0)$/)){y=w(_,T[1].length);return _<0?"-"+S(e,h,-_):A(E(_)).replace(/^\d,\d{3}$/,"0$&").replace(/^\d*$/,function(e){return"00,"+(e.length<3?a(0,3-e.length):"")+e;})+"."+a(y,T[1].length);}switch(h){case"###,##0.00":return S(e,"#,##0.00",_);case"###,###":;case"##,###":;case"#,###":var N=A(o(R,0));return N!=="0"?F+N:"";case"###,###.00":return S(e,"###,##0.00",_).replace(/^0\./,".");case"#,###.00":return S(e,"#,##0.00",_).replace(/^0\./,".");default:;}throw new Error("unsupported format |"+h+"|");}function _(e,r,t){var a=r.length-1;while(r.charCodeAt(a-1)===44){--a;}return I(e,r.substr(0,a),t/Math.pow(10,3*(r.length-a)));}function C(r,a,n){var i=a.replace(e,""),s=a.length-i.length;return I(r,i,n*Math.pow(10,2*s))+t("%",s);}function B(e,r){var t;var a=e.indexOf("E")-e.indexOf(".")-1;if(e.match(/^#+0.0E\+0$/)){if(r==0)return"0.0E+0";else if(r<0)return"-"+B(e,-r);var n=e.indexOf(".");if(n===-1)n=e.indexOf("E");var i=Math.floor(Math.log(r)*Math.LOG10E)%n;if(i<0)i+=n;t=(r/Math.pow(10,i)).toPrecision(a+1+(n+i)%n);if(!t.match(/[Ee]/)){var s=Math.floor(Math.log(r)*Math.LOG10E);if(t.indexOf(".")===-1)t=t.charAt(0)+"."+t.substr(1)+"E+"+(s-t.length+i);else t+="E+"+(s-i);t=t.replace(/\+-/,"-");}t=t.replace(/^([+-]?)(\d*)\.(\d*)[Ee]/,function(e,r,t,a){return r+t+a.substr(0,(n+i)%n)+"."+a.substr(i)+"E";});}else t=r.toExponential(a);if(e.match(/E\+00$/)&&t.match(/e[+-]\d$/))t=t.substr(0,t.length-1)+"0"+t.charAt(t.length-1);if(e.match(/E\-/)&&t.match(/e\+/))t=t.replace(/e\+/,"e");return t.replace("e","E");}function T(e,s,f){if(e.charCodeAt(0)===40&&!s.match(v)){var l=s.replace(/\( */,"").replace(/ \)/,"").replace(/\)/,"");if(f>=0)return T("n",l,f);return"("+T("n",l,-f)+")";}if(s.charCodeAt(s.length-1)===44)return _(e,s,f);if(s.indexOf("%")!==-1)return C(e,s,f);if(s.indexOf("E")!==-1)return B(s,f);if(s.charCodeAt(0)===36)return"$"+T(e,s.substr(s.charAt(1)==" "?2:1),f);var o;var u,b,w,k=Math.abs(f),E=f<0?"-":"";if(s.match(/^00+$/))return E+a(k,s.length);if(s.match(/^[#?]+$/)){o=""+f;if(f===0)o="";return o.length>s.length?o:m(s.substr(0,s.length-o.length))+o;}if(u=s.match(c))return h(u,k,E);if(s.match(/^#+0+$/))return E+a(k,s.length-s.indexOf("0"));if(u=s.match(d)){o=(""+f).replace(/^([^\.]+)$/,"$1."+m(u[1])).replace(/\.$/,"."+m(u[1]));o=o.replace(/\.(\d*)$/,function(e,r){return"."+r+t("0",m(u[1]).length-r.length);});return s.indexOf("0.")!==-1?o:o.replace(/^0\./,".");}s=s.replace(/^#+([0.])/,"$1");if(u=s.match(/^(0*)\.(#*)$/)){return E+(""+k).replace(/\.(\d*[1-9])0*$/,".$1").replace(/^(-?\d*)$/,"$1.").replace(/^0\./,u[1].length?"0.":".");}if(u=s.match(/^#{1,3},##0(\.?)$/))return E+A(""+k);if(u=s.match(/^#,##0\.([#0]*0)$/)){return f<0?"-"+T(e,s,-f):A(""+f)+"."+t("0",u[1].length);}if(u=s.match(/^#,#*,#0/))return T(e,s.replace(/^#,#*,/,""),f);if(u=s.match(/^([0#]+)(\\?-([0#]+))+$/)){o=r(T(e,s.replace(/[\\-]/g,""),f));b=0;return r(r(s.replace(/\\/g,"")).replace(/[0#]/g,function(e){return b<o.length?o.charAt(b++):e==="0"?"0":"";}));}if(s.match(p)){o=T(e,"##########",f);return"("+o.substr(0,3)+") "+o.substr(3,3)+"-"+o.substr(6);}var S="";if(u=s.match(/^([#0?]+)( ?)\/( ?)([#0?]+)/)){b=Math.min(u[4].length,7);w=g(k,Math.pow(10,b)-1,false);o=""+E;S=I("n",u[1],w[1]);if(S.charAt(S.length-1)==" ")S=S.substr(0,S.length-1)+"0";o+=S+u[2]+"/"+u[3];S=i(w[2],b);if(S.length<u[4].length)S=m(u[4].substr(u[4].length-S.length))+S;o+=S;return o;}if(u=s.match(/^# ([#0?]+)( ?)\/( ?)([#0?]+)/)){b=Math.min(Math.max(u[1].length,u[4].length),7);w=g(k,Math.pow(10,b)-1,true);return E+(w[0]||(w[1]?"":"0"))+" "+(w[1]?n(w[1],b)+u[2]+"/"+u[3]+i(w[2],b):t(" ",2*b+1+u[2].length+u[3].length));}if(u=s.match(/^[#0?]+$/)){o=""+f;if(s.length<=o.length)return o;return m(s.substr(0,s.length-o.length))+o;}if(u=s.match(/^([#0]+)\.([#0]+)$/)){o=""+f.toFixed(Math.min(u[2].length,10)).replace(/([^0])0+$/,"$1");b=o.indexOf(".");var y=s.indexOf(".")-b,x=s.length-o.length-y;return m(s.substr(0,y)+o+s.substr(s.length-x));}if(u=s.match(/^00,000\.([#0]*0)$/)){return f<0?"-"+T(e,s,-f):A(""+f).replace(/^\d,\d{3}$/,"0$&").replace(/^\d*$/,function(e){return"00,"+(e.length<3?a(0,3-e.length):"")+e;})+"."+a(0,u[1].length);}switch(s){case"###,###":;case"##,###":;case"#,###":var R=A(""+k);return R!=="0"?E+R:"";default:if(s.match(/\.[0#?]*$/))return T(e,s.slice(0,s.lastIndexOf(".")),f)+m(s.slice(s.lastIndexOf(".")));}throw new Error("unsupported format |"+s+"|");}return function y(e,r,t){return(t|0)===t?T(e,r,t):S(e,r,t);};}();function R(e){var r=[];var t=false;for(var a=0,n=0;a<e.length;++a){switch(e.charCodeAt(a)){case 34:t=!t;break;case 95:;case 42:;case 92:++a;break;case 59:r[r.length]=e.substr(n,a-n);n=a+1;}}r[r.length]=e.substr(n);if(t===true)throw new Error("Format |"+e+"| unterminated string ");return r;}e._split=R;var F=/\[[HhMmSs\u0E0A\u0E19\u0E17]*\]/;function O(e){var r=0,t="",a="";while(r<e.length){switch(t=e.charAt(r)){case"G":if(c(e,r))r+=6;r++;break;case'"':for(;e.charCodeAt(++r)!==34&&r<e.length;){}++r;break;case"\\":r+=2;break;case"_":r+=2;break;case"@":++r;break;case"B":;case"b":if(e.charAt(r+1)==="1"||e.charAt(r+1)==="2")return true;case"M":;case"D":;case"Y":;case"H":;case"S":;case"E":;case"m":;case"d":;case"y":;case"h":;case"s":;case"e":;case"g":return true;case"A":;case"a":;case"上":if(e.substr(r,3).toUpperCase()==="A/P")return true;if(e.substr(r,5).toUpperCase()==="AM/PM")return true;if(e.substr(r,5).toUpperCase()==="上午/下午")return true;++r;break;case"[":a=t;while(e.charAt(r++)!=="]"&&r<e.length){a+=e.charAt(r);}if(a.match(F))return true;break;case".":;case"0":;case"#":while(r<e.length&&("0#?.,E+-%".indexOf(t=e.charAt(++r))>-1||t=="\\"&&e.charAt(r+1)=="-"&&"0#".indexOf(e.charAt(r+2))>-1)){}break;case"?":while(e.charAt(++r)===t){}break;case"*":++r;if(e.charAt(r)==" "||e.charAt(r)=="*")++r;break;case"(":;case")":++r;break;case"1":;case"2":;case"3":;case"4":;case"5":;case"6":;case"7":;case"8":;case"9":while(r<e.length&&"0123456789".indexOf(e.charAt(++r))>-1){}break;case" ":++r;break;default:++r;break;}}return false;}e.is_date=O;function D(e,r,t,a){var n=[],i="",s=0,f="",l="t",o,u,h;var d="H";while(s<e.length){switch(f=e.charAt(s)){case"G":if(!c(e,s))throw new Error("unrecognized character "+f+" in "+e);n[n.length]={t:"G",v:"General"};s+=7;break;case'"':for(i="";(h=e.charCodeAt(++s))!==34&&s<e.length;){i+=String.fromCharCode(h);}n[n.length]={t:"t",v:i};++s;break;case"\\":var v=e.charAt(++s),p=v==="("||v===")"?v:"t";n[n.length]={t:p,v:v};++s;break;case"_":n[n.length]={t:"t",v:" "};s+=2;break;case"@":n[n.length]={t:"T",v:r};++s;break;case"B":;case"b":if(e.charAt(s+1)==="1"||e.charAt(s+1)==="2"){if(o==null){o=w(r,t,e.charAt(s+1)==="2");if(o==null)return"";}n[n.length]={t:"X",v:e.substr(s,2)};l=f;s+=2;break;};case"M":;case"D":;case"Y":;case"H":;case"S":;case"E":f=f.toLowerCase();case"m":;case"d":;case"y":;case"h":;case"s":;case"e":;case"g":if(r<0)return"";if(o==null){o=w(r,t);if(o==null)return"";}i=f;while(++s<e.length&&e.charAt(s).toLowerCase()===f){i+=f;}if(f==="m"&&l.toLowerCase()==="h")f="M";if(f==="h")f=d;n[n.length]={t:f,v:i};l=f;break;case"A":;case"a":;case"上":var m={t:f,v:f};if(o==null)o=w(r,t);if(e.substr(s,3).toUpperCase()==="A/P"){if(o!=null)m.v=o.H>=12?"P":"A";m.t="T";d="h";s+=3;}else if(e.substr(s,5).toUpperCase()==="AM/PM"){if(o!=null)m.v=o.H>=12?"PM":"AM";m.t="T";s+=5;d="h";}else if(e.substr(s,5).toUpperCase()==="上午/下午"){if(o!=null)m.v=o.H>=12?"下午":"上午";m.t="T";s+=5;d="h";}else{m.t="t";++s;}if(o==null&&m.t==="T")return"";n[n.length]=m;l=f;break;case"[":i=f;while(e.charAt(s++)!=="]"&&s<e.length){i+=e.charAt(s);}if(i.slice(-1)!=="]")throw'unterminated "[" block: |'+i+"|";if(i.match(F)){if(o==null){o=w(r,t);if(o==null)return"";}n[n.length]={t:"Z",v:i.toLowerCase()};l=i.charAt(1);}else if(i.indexOf("$")>-1){i=(i.match(/\$([^-\[\]]*)/)||[])[1]||"$";if(!O(e))n[n.length]={t:"t",v:i};}break;case".":if(o!=null){i=f;while(++s<e.length&&(f=e.charAt(s))==="0"){i+=f;}n[n.length]={t:"s",v:i};break;};case"0":;case"#":i=f;while(++s<e.length&&"0#?.,E+-%".indexOf(f=e.charAt(s))>-1){i+=f;}n[n.length]={t:"n",v:i};break;case"?":i=f;while(e.charAt(++s)===f){i+=f;}n[n.length]={t:f,v:i};l=f;break;case"*":++s;if(e.charAt(s)==" "||e.charAt(s)=="*")++s;break;case"(":;case")":n[n.length]={t:a===1?"t":f,v:f};++s;break;case"1":;case"2":;case"3":;case"4":;case"5":;case"6":;case"7":;case"8":;case"9":i=f;while(s<e.length&&"0123456789".indexOf(e.charAt(++s))>-1){i+=e.charAt(s);}n[n.length]={t:"D",v:i};break;case" ":n[n.length]={t:f,v:f};++s;break;case"$":n[n.length]={t:"t",v:"$"};++s;break;default:if(",$-+/():!^&'~{}<>=€acfijklopqrtuvwxzP".indexOf(f)===-1)throw new Error("unrecognized character "+f+" in "+e);n[n.length]={t:"t",v:f};++s;break;}}var b=0,g=0,k;for(s=n.length-1,l="t";s>=0;--s){switch(n[s].t){case"h":;case"H":n[s].t=d;l="h";if(b<1)b=1;break;case"s":if(k=n[s].v.match(/\.0+$/))g=Math.max(g,k[0].length-1);if(b<3)b=3;case"d":;case"y":;case"M":;case"e":l=n[s].t;break;case"m":if(l==="s"){n[s].t="M";if(b<2)b=2;}break;case"X":break;case"Z":if(b<1&&n[s].v.match(/[Hh]/))b=1;if(b<2&&n[s].v.match(/[Mm]/))b=2;if(b<3&&n[s].v.match(/[Ss]/))b=3;}}switch(b){case 0:break;case 1:if(o.u>=.5){o.u=0;++o.S;}if(o.S>=60){o.S=0;++o.M;}if(o.M>=60){o.M=0;++o.H;}break;case 2:if(o.u>=.5){o.u=0;++o.S;}if(o.S>=60){o.S=0;++o.M;}break;}var E="",S;for(s=0;s<n.length;++s){switch(n[s].t){case"t":;case"T":;case" ":;case"D":break;case"X":n[s].v="";n[s].t=";";break;case"d":;case"m":;case"y":;case"h":;case"H":;case"M":;case"s":;case"e":;case"b":;case"Z":n[s].v=x(n[s].t.charCodeAt(0),n[s].v,o,g);n[s].t="t";break;case"n":;case"?":S=s+1;while(n[S]!=null&&((f=n[S].t)==="?"||f==="D"||(f===" "||f==="t")&&n[S+1]!=null&&(n[S+1].t==="?"||n[S+1].t==="t"&&n[S+1].v==="/")||n[s].t==="("&&(f===" "||f==="n"||f===")")||f==="t"&&(n[S].v==="/"||n[S].v===" "&&n[S+1]!=null&&n[S+1].t=="?"))){n[s].v+=n[S].v;n[S]={v:"",t:";"};++S;}E+=n[s].v;s=S-1;break;case"G":n[s].t="t";n[s].v=T(r,t);break;}}var _="",C,B;if(E.length>0){if(E.charCodeAt(0)==40){C=r<0&&E.charCodeAt(0)===45?-r:r;B=I("n",E,C);}else{C=r<0&&a>1?-r:r;B=I("n",E,C);if(C<0&&n[0]&&n[0].t=="t"){B=B.substr(1);n[0].v="-"+n[0].v;}}S=B.length-1;var y=n.length;for(s=0;s<n.length;++s){if(n[s]!=null&&n[s].t!="t"&&n[s].v.indexOf(".")>-1){y=s;break;}}var A=n.length;if(y===n.length&&B.indexOf("E")===-1){for(s=n.length-1;s>=0;--s){if(n[s]==null||"n?".indexOf(n[s].t)===-1)continue;if(S>=n[s].v.length-1){S-=n[s].v.length;n[s].v=B.substr(S+1,n[s].v.length);}else if(S<0)n[s].v="";else{n[s].v=B.substr(0,S+1);S=-1;}n[s].t="t";A=s;}if(S>=0&&A<n.length)n[A].v=B.substr(0,S+1)+n[A].v;}else if(y!==n.length&&B.indexOf("E")===-1){S=B.indexOf(".")-1;for(s=y;s>=0;--s){if(n[s]==null||"n?".indexOf(n[s].t)===-1)continue;u=n[s].v.indexOf(".")>-1&&s===y?n[s].v.indexOf(".")-1:n[s].v.length-1;_=n[s].v.substr(u+1);for(;u>=0;--u){if(S>=0&&(n[s].v.charAt(u)==="0"||n[s].v.charAt(u)==="#"))_=B.charAt(S--)+_;}n[s].v=_;n[s].t="t";A=s;}if(S>=0&&A<n.length)n[A].v=B.substr(0,S+1)+n[A].v;S=B.indexOf(".")+1;for(s=y;s<n.length;++s){if(n[s]==null||"n?(".indexOf(n[s].t)===-1&&s!==y)continue;u=n[s].v.indexOf(".")>-1&&s===y?n[s].v.indexOf(".")+1:0;_=n[s].v.substr(0,u);for(;u<n[s].v.length;++u){if(S<B.length)_+=B.charAt(S++);}n[s].v=_;n[s].t="t";A=s;}}}for(s=0;s<n.length;++s){if(n[s]!=null&&"n?".indexOf(n[s].t)>-1){C=a>1&&r<0&&s>0&&n[s-1].v==="-"?-r:r;n[s].v=I(n[s].t,n[s].v,C);n[s].t="t";}}var R="";for(s=0;s!==n.length;++s){if(n[s]!=null)R+=n[s].v;}return R;}e._eval=D;var P=/\[[=<>]/;var N=/\[(=|>[=]?|<[>=]?)(-?\d+(?:\.\d*)?)\]/;function L(e,r){if(r==null)return false;var t=parseFloat(r[2]);switch(r[1]){case"=":if(e==t)return true;break;case">":if(e>t)return true;break;case"<":if(e<t)return true;break;case"<>":if(e!=t)return true;break;case">=":if(e>=t)return true;break;case"<=":if(e<=t)return true;break;}return false;}function M(e,r){var t=R(e);var a=t.length,n=t[a-1].indexOf("@");if(a<4&&n>-1)--a;if(t.length>4)throw new Error("cannot find right format for |"+t.join("|")+"|");if(typeof r!=="number")return[4,t.length===4||n>-1?t[t.length-1]:"@"];switch(t.length){case 1:t=n>-1?["General","General","General",t[0]]:[t[0],t[0],t[0],"@"];break;case 2:t=n>-1?[t[0],t[0],t[0],t[1]]:[t[0],t[1],t[0],"@"];break;case 3:t=n>-1?[t[0],t[1],t[0],t[2]]:[t[0],t[1],t[2],"@"];break;case 4:break;}var i=r>0?t[0]:r<0?t[1]:t[2];if(t[0].indexOf("[")===-1&&t[1].indexOf("[")===-1)return[a,i];if(t[0].match(P)!=null||t[1].match(P)!=null){var s=t[0].match(N);var f=t[1].match(N);return L(r,s)?[a,t[0]]:L(r,f)?[a,t[1]]:[a,t[s!=null&&f!=null?2:1]];}return[a,i];}function U(e,r,t){if(t==null)t={};var a="";switch(_typeof(e)){case"string":if(e=="m/d/yy"&&t.dateNF)a=t.dateNF;else a=e;break;case"number":if(e==14&&t.dateNF)a=t.dateNF;else a=(t.table!=null?t.table:v)[e];if(a==null)a=t.table&&t.table[p[e]]||v[p[e]];if(a==null)a=b[e]||"General";break;}if(c(a,0))return T(r,t);if(r instanceof Date)r=_(r,t.date1904);var n=M(a,r);if(c(n[1]))return T(r,t);if(r===true)r="TRUE";else if(r===false)r="FALSE";else if(r===""||r==null)return"";return D(n[1],r,t,n[0]);}function z(e,r){if(typeof r!="number"){r=+r||-1;for(var t=0;t<392;++t){if(v[t]==undefined){if(r<0)r=t;continue;}if(v[t]==e){r=t;break;}}if(r<0)r=391;}v[r]=e;return r;}e.load=z;e._table=v;e.get_table=function V(){return v;};e.load_table=function X(e){for(var r=0;r!=392;++r){if(e[r]!==undefined)z(e[r],r);}};e.init_table=d;e.format=U;};D(O);var P={"General Number":"General","General Date":O._table[22],"Long Date":"dddd, mmmm dd, yyyy","Medium Date":O._table[15],"Short Date":O._table[14],"Long Time":O._table[19],"Medium Time":O._table[18],"Short Time":O._table[20],Currency:'"$"#,##0.00_);[Red]\\("$"#,##0.00\\)',Fixed:O._table[2],Standard:O._table[4],Percent:O._table[10],Scientific:O._table[11],"Yes/No":'"Yes";"Yes";"No";@',"True/False":'"True";"True";"False";@',"On/Off":'"Yes";"Yes";"No";@'};var N={5:'"$"#,##0_);\\("$"#,##0\\)',6:'"$"#,##0_);[Red]\\("$"#,##0\\)',7:'"$"#,##0.00_);\\("$"#,##0.00\\)',8:'"$"#,##0.00_);[Red]\\("$"#,##0.00\\)',23:"General",24:"General",25:"General",26:"General",27:"m/d/yy",28:"m/d/yy",29:"m/d/yy",30:"m/d/yy",31:"m/d/yy",32:"h:mm:ss",33:"h:mm:ss",34:"h:mm:ss",35:"h:mm:ss",36:"m/d/yy",41:'_(* #,##0_);_(* (#,##0);_(* "-"_);_(@_)',42:'_("$"* #,##0_);_("$"* (#,##0);_("$"* "-"_);_(@_)',43:'_(* #,##0.00_);_(* (#,##0.00);_(* "-"??_);_(@_)',44:'_("$"* #,##0.00_);_("$"* (#,##0.00);_("$"* "-"??_);_(@_)',50:"m/d/yy",51:"m/d/yy",52:"m/d/yy",53:"m/d/yy",54:"m/d/yy",55:"m/d/yy",56:"m/d/yy",57:"m/d/yy",58:"m/d/yy",59:"0",60:"0.00",61:"#,##0",62:"#,##0.00",63:'"$"#,##0_);\\("$"#,##0\\)',64:'"$"#,##0_);[Red]\\("$"#,##0\\)',65:'"$"#,##0.00_);\\("$"#,##0.00\\)',66:'"$"#,##0.00_);[Red]\\("$"#,##0.00\\)',67:"0%",68:"0.00%",69:"# ?/?",70:"# ??/??",71:"m/d/yy",72:"m/d/yy",73:"d-mmm-yy",74:"d-mmm",75:"mmm-yy",76:"h:mm",77:"h:mm:ss",78:"m/d/yy h:mm",79:"mm:ss",80:"[h]:mm:ss",81:"mmss.0"};var L=/[dD]+|[mM]+|[yYeE]+|[Hh]+|[Ss]+/g;function M(e){var r=typeof e=="number"?O._table[e]:e;r=r.replace(L,"(\\d+)");return new RegExp("^"+r+"$");}function U(e,r,t){var a=-1,n=-1,i=-1,s=-1,f=-1,l=-1;(r.match(L)||[]).forEach(function(e,r){var o=parseInt(t[r+1],10);switch(e.toLowerCase().charAt(0)){case"y":a=o;break;case"d":i=o;break;case"h":s=o;break;case"s":l=o;break;case"m":if(s>=0)f=o;else n=o;break;}});if(l>=0&&f==-1&&n>=0){f=n;n=-1;}var o=(""+(a>=0?a:new Date().getFullYear())).slice(-4)+"-"+("00"+(n>=1?n:1)).slice(-2)+"-"+("00"+(i>=1?i:1)).slice(-2);if(o.length==7)o="0"+o;if(o.length==8)o="20"+o;var c=("00"+(s>=0?s:0)).slice(-2)+":"+("00"+(f>=0?f:0)).slice(-2)+":"+("00"+(l>=0?l:0)).slice(-2);if(s==-1&&f==-1&&l==-1)return o;if(a==-1&&n==-1&&i==-1)return c;return o+"T"+c;}var z=true;var H;(function(e){e(H={});})(function(e){e.version="1.2.0";function r(){var e=0,r=new Array(256);for(var t=0;t!=256;++t){e=t;e=e&1?-306674912^e>>>1:e>>>1;e=e&1?-306674912^e>>>1:e>>>1;e=e&1?-306674912^e>>>1:e>>>1;e=e&1?-306674912^e>>>1:e>>>1;e=e&1?-306674912^e>>>1:e>>>1;e=e&1?-306674912^e>>>1:e>>>1;e=e&1?-306674912^e>>>1:e>>>1;e=e&1?-306674912^e>>>1:e>>>1;r[t]=e;}return typeof Int32Array!=="undefined"?new Int32Array(r):r;}var t=r();function a(e,r){var a=r^-1,n=e.length-1;for(var i=0;i<n;){a=a>>>8^t[(a^e.charCodeAt(i++))&255];a=a>>>8^t[(a^e.charCodeAt(i++))&255];}if(i===n)a=a>>>8^t[(a^e.charCodeAt(i))&255];return a^-1;}function n(e,r){if(e.length>1e4)return i(e,r);var a=r^-1,n=e.length-3;for(var s=0;s<n;){a=a>>>8^t[(a^e[s++])&255];a=a>>>8^t[(a^e[s++])&255];a=a>>>8^t[(a^e[s++])&255];a=a>>>8^t[(a^e[s++])&255];}while(s<n+3){a=a>>>8^t[(a^e[s++])&255];}return a^-1;}function i(e,r){var a=r^-1,n=e.length-7;for(var i=0;i<n;){a=a>>>8^t[(a^e[i++])&255];a=a>>>8^t[(a^e[i++])&255];a=a>>>8^t[(a^e[i++])&255];a=a>>>8^t[(a^e[i++])&255];a=a>>>8^t[(a^e[i++])&255];a=a>>>8^t[(a^e[i++])&255];a=a>>>8^t[(a^e[i++])&255];a=a>>>8^t[(a^e[i++])&255];}while(i<n+7){a=a>>>8^t[(a^e[i++])&255];}return a^-1;}function s(e,r){var a=r^-1;for(var n=0,i=e.length,s,f;n<i;){s=e.charCodeAt(n++);if(s<128){a=a>>>8^t[(a^s)&255];}else if(s<2048){a=a>>>8^t[(a^(192|s>>6&31))&255];a=a>>>8^t[(a^(128|s&63))&255];}else if(s>=55296&&s<57344){s=(s&1023)+64;f=e.charCodeAt(n++)&1023;a=a>>>8^t[(a^(240|s>>8&7))&255];a=a>>>8^t[(a^(128|s>>2&63))&255];a=a>>>8^t[(a^(128|f>>6&15|(s&3)<<4))&255];a=a>>>8^t[(a^(128|f&63))&255];}else{a=a>>>8^t[(a^(224|s>>12&15))&255];a=a>>>8^t[(a^(128|s>>6&63))&255];a=a>>>8^t[(a^(128|s&63))&255];}}return a^-1;}e.table=t;e.bstr=a;e.buf=n;e.str=s;});var W=function Mb(){var e={};e.version="1.1.4";function r(e,r){var t=e.split("/"),a=r.split("/");for(var n=0,i=0,s=Math.min(t.length,a.length);n<s;++n){if(i=t[n].length-a[n].length)return i;if(t[n]!=a[n])return t[n]<a[n]?-1:1;}return t.length-a.length;}function t(e){if(e.charAt(e.length-1)=="/")return e.slice(0,-1).indexOf("/")===-1?e:t(e.slice(0,-1));var r=e.lastIndexOf("/");return r===-1?e:e.slice(0,r+1);}function a(e){if(e.charAt(e.length-1)=="/")return a(e.slice(0,-1));var r=e.lastIndexOf("/");return r===-1?e:e.slice(r+1);}function n(e,r){if(typeof r==="string")r=new Date(r);var t=r.getHours();t=t<<6|r.getMinutes();t=t<<5|r.getSeconds()>>>1;e._W(2,t);var a=r.getFullYear()-1980;a=a<<4|r.getMonth()+1;a=a<<5|r.getDate();e._W(2,a);}function i(e){var r=e._R(2)&65535;var t=e._R(2)&65535;var a=new Date();var n=t&31;t>>>=5;var i=t&15;t>>>=4;a.setMilliseconds(0);a.setFullYear(t+1980);a.setMonth(i-1);a.setDate(n);var s=r&31;r>>>=5;var f=r&63;r>>>=6;a.setHours(r);a.setMinutes(f);a.setSeconds(s<<1);return a;}function s(e){Yr(e,0);var r={};var t=0;while(e.l<=e.length-4){var a=e._R(2);var n=e._R(2),i=e.l+n;var s={};switch(a){case 21589:{t=e._R(1);if(t&1)s.mtime=e._R(4);if(n>5){if(t&2)s.atime=e._R(4);if(t&4)s.ctime=e._R(4);}if(s.mtime)s.mt=new Date(s.mtime*1e3);}break;}e.l=i;r[a]=s;}return r;}var f;function l(){return f||(f=__webpack_require__(/*! fs */ "../node_modules/node-libs-browser/mock/empty.js"));}function o(e,r){if(e[0]==80&&e[1]==75)return Te(e,r);if(e.length<512)throw new Error("CFB file size "+e.length+" < 512");var t=3;var a=512;var n=0;var i=0;var s=0;var f=0;var l=0;var o=[];var v=e.slice(0,512);Yr(v,0);var m=c(v);t=m[0];switch(t){case 3:a=512;break;case 4:a=4096;break;case 0:if(m[1]==0)return Te(e,r);default:throw new Error("Major Version: Expected 3 or 4 saw "+t);}if(a!==512){v=e.slice(0,a);Yr(v,28);}var g=e.slice(0,a);u(v,t);var w=v._R(4,"i");if(t===3&&w!==0)throw new Error("# Directory Sectors: Expected 0 saw "+w);v.l+=4;s=v._R(4,"i");v.l+=4;v.chk("00100000","Mini Stream Cutoff Size: ");f=v._R(4,"i");n=v._R(4,"i");l=v._R(4,"i");i=v._R(4,"i");for(var E=-1,S=0;S<109;++S){E=v._R(4,"i");if(E<0)break;o[S]=E;}var _=h(e,a);p(l,i,_,a,o);var C=b(_,s,o,a);C[s].name="!Directory";if(n>0&&f!==N)C[f].name="!MiniFAT";C[o[0]].name="!FAT";C.fat_addrs=o;C.ssz=a;var B={},T=[],y=[],x=[];k(s,C,_,T,n,B,y,f);d(y,x,T);T.shift();var A={FileIndex:y,FullPaths:x};if(r&&r.raw)A.raw={header:g,sectors:_};return A;}function c(e){if(e[e.l]==80&&e[e.l+1]==75)return[0,0];e.chk(L,"Header Signature: ");e.l+=16;var r=e._R(2,"u");return[e._R(2,"u"),r];}function u(e,r){var t=9;e.l+=2;switch(t=e._R(2)){case 9:if(r!=3)throw new Error("Sector Shift: Expected 9 saw "+t);break;case 12:if(r!=4)throw new Error("Sector Shift: Expected 12 saw "+t);break;default:throw new Error("Sector Shift: Expected 9 or 12 saw "+t);}e.chk("0600","Mini Sector Shift: ");e.chk("000000000000","Reserved: ");}function h(e,r){var t=Math.ceil(e.length/r)-1;var a=[];for(var n=1;n<t;++n){a[n-1]=e.slice(n*r,(n+1)*r);}a[t-1]=e.slice(t*r);return a;}function d(e,r,t){var a=0,n=0,i=0,s=0,f=0,l=t.length;var o=[],c=[];for(;a<l;++a){o[a]=c[a]=a;r[a]=t[a];}for(;f<c.length;++f){a=c[f];n=e[a].L;i=e[a].R;s=e[a].C;if(o[a]===a){if(n!==-1&&o[n]!==n)o[a]=o[n];if(i!==-1&&o[i]!==i)o[a]=o[i];}if(s!==-1)o[s]=a;if(n!==-1&&a!=o[a]){o[n]=o[a];if(c.lastIndexOf(n)<f)c.push(n);}if(i!==-1&&a!=o[a]){o[i]=o[a];if(c.lastIndexOf(i)<f)c.push(i);}}for(a=1;a<l;++a){if(o[a]===a){if(i!==-1&&o[i]!==i)o[a]=o[i];else if(n!==-1&&o[n]!==n)o[a]=o[n];}}for(a=1;a<l;++a){if(e[a].type===0)continue;f=a;if(f!=o[f])do{f=o[f];r[a]=r[f]+"/"+r[a];}while(f!==0&&-1!==o[f]&&f!=o[f]);o[a]=-1;}r[0]+="/";for(a=1;a<l;++a){if(e[a].type!==2)r[a]+="/";}}function v(e,r,t){var a=e.start,n=e.size;var i=[];var s=a;while(t&&n>0&&s>=0){i.push(r.slice(s*P,s*P+P));n-=P;s=Hr(t,s*4);}if(i.length===0)return Jr(0);return I(i).slice(0,e.size);}function p(e,r,t,a,n){var i=N;if(e===N){if(r!==0)throw new Error("DIFAT chain shorter than expected");}else if(e!==-1){var s=t[e],f=(a>>>2)-1;if(!s)return;for(var l=0;l<f;++l){if((i=Hr(s,l*4))===N)break;n.push(i);}if(r>=1)p(Hr(s,a-4),r-1,t,a,n);}}function m(e,r,t,a,n){var i=[],s=[];if(!n)n=[];var f=a-1,l=0,o=0;for(l=r;l>=0;){n[l]=true;i[i.length]=l;s.push(e[l]);var c=t[Math.floor(l*4/a)];o=l*4&f;if(a<4+o)throw new Error("FAT boundary crossed: "+l+" 4 "+a);if(!e[c])break;l=Hr(e[c],o);}return{nodes:i,data:mr([s])};}function b(e,r,t,a){var n=e.length,i=[];var s=[],f=[],l=[];var o=a-1,c=0,u=0,h=0,d=0;for(c=0;c<n;++c){f=[];h=c+r;if(h>=n)h-=n;if(s[h])continue;l=[];var v=[];for(u=h;u>=0;){v[u]=true;s[u]=true;f[f.length]=u;l.push(e[u]);var p=t[Math.floor(u*4/a)];d=u*4&o;if(a<4+d)throw new Error("FAT boundary crossed: "+u+" 4 "+a);if(!e[p])break;u=Hr(e[p],d);if(v[u])break;}i[h]={nodes:f,data:mr([l])};}return i;}function k(e,r,t,a,n,i,s,f){var l=0,o=a.length?2:0;var c=r[e].data;var u=0,h=0,d;for(;u<c.length;u+=128){var p=c.slice(u,u+128);Yr(p,64);h=p._R(2);d=gr(p,0,h-o);a.push(d);var b={name:d,type:p._R(1),color:p._R(1),L:p._R(4,"i"),R:p._R(4,"i"),C:p._R(4,"i"),clsid:p._R(16),state:p._R(4,"i"),start:0,size:0};var g=p._R(2)+p._R(2)+p._R(2)+p._R(2);if(g!==0)b.ct=E(p,p.l-8);var w=p._R(2)+p._R(2)+p._R(2)+p._R(2);if(w!==0)b.mt=E(p,p.l-8);b.start=p._R(4,"i");b.size=p._R(4,"i");if(b.size<0&&b.start<0){b.size=b.type=0;b.start=N;b.name="";}if(b.type===5){l=b.start;if(n>0&&l!==N)r[l].name="!StreamData";}else if(b.size>=4096){b.storage="fat";if(r[b.start]===undefined)r[b.start]=m(t,b.start,r.fat_addrs,r.ssz);r[b.start].name=b.name;b.content=r[b.start].data.slice(0,b.size);}else{b.storage="minifat";if(b.size<0)b.size=0;else if(l!==N&&b.start!==N&&r[l]){b.content=v(b,r[l].data,(r[f]||{}).data);}}if(b.content)Yr(b.content,0);i[d]=b;s.push(b);}}function E(e,r){return new Date((zr(e,r+4)/1e7*Math.pow(2,32)+zr(e,r)/1e7-11644473600)*1e3);}function S(e,r){l();return o(f.readFileSync(e),r);}function T(e,r){switch(r&&r.type||"base64"){case"file":return S(e,r);case"base64":return o(B(g.decode(e)),r);case"binary":return o(B(e),r);}return o(e,r);}function y(e,r){var t=r||{},a=t.root||"Root Entry";if(!e.FullPaths)e.FullPaths=[];if(!e.FileIndex)e.FileIndex=[];if(e.FullPaths.length!==e.FileIndex.length)throw new Error("inconsistent CFB structure");if(e.FullPaths.length===0){e.FullPaths[0]=a+"/";e.FileIndex[0]={name:a,type:5};}if(t.CLSID)e.FileIndex[0].clsid=t.CLSID;x(e);}function x(e){var r="Sh33tJ5";if(W.find(e,"/"+r))return;var t=Jr(4);t[0]=55;t[1]=t[3]=50;t[2]=54;e.FileIndex.push({name:r,type:2,content:t,size:4,L:69,R:69,C:69});e.FullPaths.push(e.FullPaths[0]+r);A(e);}function A(e,n){y(e);var i=false,s=false;for(var f=e.FullPaths.length-1;f>=0;--f){var l=e.FileIndex[f];switch(l.type){case 0:if(s)i=true;else{e.FileIndex.pop();e.FullPaths.pop();}break;case 1:;case 2:;case 5:s=true;if(isNaN(l.R*l.L*l.C))i=true;if(l.R>-1&&l.L>-1&&l.R==l.L)i=true;break;default:i=true;break;}}if(!i&&!n)return;var o=new Date(1987,1,19),c=0;var u=[];for(f=0;f<e.FullPaths.length;++f){if(e.FileIndex[f].type===0)continue;u.push([e.FullPaths[f],e.FileIndex[f]]);}for(f=0;f<u.length;++f){var h=t(u[f][0]);s=false;for(c=0;c<u.length;++c){if(u[c][0]===h)s=true;}if(!s)u.push([h,{name:a(h).replace("/",""),type:1,clsid:U,ct:o,mt:o,content:null}]);}u.sort(function(e,t){return r(e[0],t[0]);});e.FullPaths=[];e.FileIndex=[];for(f=0;f<u.length;++f){e.FullPaths[f]=u[f][0];e.FileIndex[f]=u[f][1];}for(f=0;f<u.length;++f){var d=e.FileIndex[f];var v=e.FullPaths[f];d.name=a(v).replace("/","");d.L=d.R=d.C=-(d.color=1);d.size=d.content?d.content.length:0;d.start=0;d.clsid=d.clsid||U;if(f===0){d.C=u.length>1?1:-1;d.size=0;d.type=5;}else if(v.slice(-1)=="/"){for(c=f+1;c<u.length;++c){if(t(e.FullPaths[c])==v)break;}d.C=c>=u.length?-1:c;for(c=f+1;c<u.length;++c){if(t(e.FullPaths[c])==t(v))break;}d.R=c>=u.length?-1:c;d.type=1;}else{if(t(e.FullPaths[f+1]||"")==t(v))d.R=f+1;d.type=2;}}}function O(e,r){var t=r||{};A(e);if(t.fileType=="zip")return xe(e,t);var a=function(e){var r=0,t=0;for(var a=0;a<e.FileIndex.length;++a){var n=e.FileIndex[a];if(!n.content)continue;var i=n.content.length;if(i>0){if(i<4096)r+=i+63>>6;else t+=i+511>>9;}}var s=e.FullPaths.length+3>>2;var f=r+7>>3;var l=r+127>>7;var o=f+t+s+l;var c=o+127>>7;var u=c<=109?0:Math.ceil((c-109)/127);while(o+c+u+127>>7>c){u=++c<=109?0:Math.ceil((c-109)/127);}var h=[1,u,c,l,s,t,r,0];e.FileIndex[0].size=r<<6;h[7]=(e.FileIndex[0].start=h[0]+h[1]+h[2]+h[3]+h[4]+h[5])+(h[6]+7>>3);return h;}(e);var n=Jr(a[7]<<9);var i=0,s=0;{for(i=0;i<8;++i){n._W(1,M[i]);}for(i=0;i<8;++i){n._W(2,0);}n._W(2,62);n._W(2,3);n._W(2,65534);n._W(2,9);n._W(2,6);for(i=0;i<3;++i){n._W(2,0);}n._W(4,0);n._W(4,a[2]);n._W(4,a[0]+a[1]+a[2]+a[3]-1);n._W(4,0);n._W(4,1<<12);n._W(4,a[3]?a[0]+a[1]+a[2]-1:N);n._W(4,a[3]);n._W(-4,a[1]?a[0]-1:N);n._W(4,a[1]);for(i=0;i<109;++i){n._W(-4,i<a[2]?a[1]+i:-1);}}if(a[1]){for(s=0;s<a[1];++s){for(;i<236+s*127;++i){n._W(-4,i<a[2]?a[1]+i:-1);}n._W(-4,s===a[1]-1?N:s+1);}}var f=function f(e){for(s+=e;i<s-1;++i){n._W(-4,i+1);}if(e){++i;n._W(-4,N);}};s=i=0;for(s+=a[1];i<s;++i){n._W(-4,z.DIFSECT);}for(s+=a[2];i<s;++i){n._W(-4,z.FATSECT);}f(a[3]);f(a[4]);var l=0,o=0;var c=e.FileIndex[0];for(;l<e.FileIndex.length;++l){c=e.FileIndex[l];if(!c.content)continue;o=c.content.length;if(o<4096)continue;c.start=s;f(o+511>>9);}f(a[6]+7>>3);while(n.l&511){n._W(-4,z.ENDOFCHAIN);}s=i=0;for(l=0;l<e.FileIndex.length;++l){c=e.FileIndex[l];if(!c.content)continue;o=c.content.length;if(!o||o>=4096)continue;c.start=s;f(o+63>>6);}while(n.l&511){n._W(-4,z.ENDOFCHAIN);}for(i=0;i<a[4]<<2;++i){var u=e.FullPaths[i];if(!u||u.length===0){for(l=0;l<17;++l){n._W(4,0);}for(l=0;l<3;++l){n._W(4,-1);}for(l=0;l<12;++l){n._W(4,0);}continue;}c=e.FileIndex[i];if(i===0)c.start=c.size?c.start-1:N;var h=i===0&&t.root||c.name;o=2*(h.length+1);n._W(64,h,"utf16le");n._W(2,o);n._W(1,c.type);n._W(1,c.color);n._W(-4,c.L);n._W(-4,c.R);n._W(-4,c.C);if(!c.clsid)for(l=0;l<4;++l){n._W(4,0);}else n._W(16,c.clsid,"hex");n._W(4,c.state||0);n._W(4,0);n._W(4,0);n._W(4,0);n._W(4,0);n._W(4,c.start);n._W(4,c.size);n._W(4,0);}for(i=1;i<e.FileIndex.length;++i){c=e.FileIndex[i];if(c.size>=4096){n.l=c.start+1<<9;for(l=0;l<c.size;++l){n._W(1,c.content[l]);}for(;l&511;++l){n._W(1,0);}}}for(i=1;i<e.FileIndex.length;++i){c=e.FileIndex[i];if(c.size>0&&c.size<4096){for(l=0;l<c.size;++l){n._W(1,c.content[l]);}for(;l&63;++l){n._W(1,0);}}}while(n.l<n.length){n._W(1,0);}return n;}function D(e,r){var t=e.FullPaths.map(function(e){return e.toUpperCase();});var a=t.map(function(e){var r=e.split("/");return r[r.length-(e.slice(-1)=="/"?2:1)];});var n=false;if(r.charCodeAt(0)===47){n=true;r=t[0].slice(0,-1)+r;}else n=r.indexOf("/")!==-1;var i=r.toUpperCase();var s=n===true?t.indexOf(i):a.indexOf(i);if(s!==-1)return e.FileIndex[s];var f=!i.match(F);i=i.replace(R,"");if(f)i=i.replace(F,"!");for(s=0;s<t.length;++s){if((f?t[s].replace(F,"!"):t[s]).replace(R,"")==i)return e.FileIndex[s];if((f?a[s].replace(F,"!"):a[s]).replace(R,"")==i)return e.FileIndex[s];}return null;}var P=64;var N=-2;var L="d0cf11e0a1b11ae1";var M=[208,207,17,224,161,177,26,225];var U="00000000000000000000000000000000";var z={MAXREGSECT:-6,DIFSECT:-4,FATSECT:-3,ENDOFCHAIN:N,FREESECT:-1,HEADER_SIGNATURE:L,HEADER_MINOR_VERSION:"3e00",MAXREGSID:-6,NOSTREAM:-1,HEADER_CLSID:U,EntryTypes:["unknown","storage","stream","lockbytes","property","root"]};function V(e,r,t){l();var a=O(e,t);f.writeFileSync(r,a);}function X(e){var r=new Array(e.length);for(var t=0;t<e.length;++t){r[t]=String.fromCharCode(e[t]);}return r.join("");}function G(e,r){var t=O(e,r);switch(r&&r.type){case"file":l();f.writeFileSync(r.filename,t);return t;case"binary":return X(t);case"base64":return g.encode(X(t));}return t;}var j;function K(e){try{var r=e.InflateRaw;var t=new r();t._processChunk(new Uint8Array([3,0]),t._finishFlushFlag);if(t.bytesRead)j=e;else throw new Error("zlib does not expose bytesRead");}catch(a){console.error("cannot use native zlib: "+(a.message||a));}}function $(e,r){if(!j)return Ce(e,r);var t=j.InflateRaw;var a=new t();var n=a._processChunk(e.slice(e.l),a._finishFlushFlag);e.l+=a.bytesRead;return n;}function Y(e){return j?j.deflateRawSync(e):he(e);}var Z=[16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15];var J=[3,4,5,6,7,8,9,10,11,13,15,17,19,23,27,31,35,43,51,59,67,83,99,115,131,163,195,227,258];var Q=[1,2,3,4,5,7,9,13,17,25,33,49,65,97,129,193,257,385,513,769,1025,1537,2049,3073,4097,6145,8193,12289,16385,24577];function q(e){var r=(e<<1|e<<11)&139536|(e<<5|e<<15)&558144;return(r>>16|r>>8|r)&255;}var ee=typeof Uint8Array!=="undefined";var re=ee?new Uint8Array(1<<8):[];for(var te=0;te<1<<8;++te){re[te]=q(te);}function ae(e,r){var t=re[e&255];if(r<=8)return t>>>8-r;t=t<<8|re[e>>8&255];if(r<=16)return t>>>16-r;t=t<<8|re[e>>16&255];return t>>>24-r;}function ne(e,r){var t=r&7,a=r>>>3;return(e[a]|(t<=6?0:e[a+1]<<8))>>>t&3;}function ie(e,r){var t=r&7,a=r>>>3;return(e[a]|(t<=5?0:e[a+1]<<8))>>>t&7;}function se(e,r){var t=r&7,a=r>>>3;return(e[a]|(t<=4?0:e[a+1]<<8))>>>t&15;}function fe(e,r){var t=r&7,a=r>>>3;return(e[a]|(t<=3?0:e[a+1]<<8))>>>t&31;}function le(e,r){var t=r&7,a=r>>>3;return(e[a]|(t<=1?0:e[a+1]<<8))>>>t&127;}function oe(e,r,t){var a=r&7,n=r>>>3,i=(1<<t)-1;var s=e[n]>>>a;if(t<8-a)return s&i;s|=e[n+1]<<8-a;if(t<16-a)return s&i;s|=e[n+2]<<16-a;if(t<24-a)return s&i;s|=e[n+3]<<24-a;return s&i;}function ce(e,r){var t=e.length,a=2*t>r?2*t:r+5,n=0;if(t>=r)return e;if(w){var i=C(a);if(e.copy)e.copy(i);else for(;n<e.length;++n){i[n]=e[n];}return i;}else if(ee){var s=new Uint8Array(a);if(s.set)s.set(e);else for(;n<e.length;++n){s[n]=e[n];}return s;}e.length=a;return e;}function ue(e){var r=new Array(e);for(var t=0;t<e;++t){r[t]=0;}return r;}var he=function(){var e=function(){return function e(r,t){var a=0;while(a<r.length){var n=Math.min(65535,r.length-a);var i=a+n==r.length;t._W(1,+i);t._W(2,n);t._W(2,~n&65535);while(n-->0){t[t.l++]=r[a++];}}return t.l;};}();return function(r){var t=Jr(50+Math.floor(r.length*1.1));var a=e(r,t);return t.slice(0,a);};}();function de(e,r,t){var a=1,n=0,i=0,s=0,f=0,l=e.length;var o=ee?new Uint16Array(32):ue(32);for(i=0;i<32;++i){o[i]=0;}for(i=l;i<t;++i){e[i]=0;}l=e.length;var c=ee?new Uint16Array(l):ue(l);for(i=0;i<l;++i){o[n=e[i]]++;if(a<n)a=n;c[i]=0;}o[0]=0;for(i=1;i<=a;++i){o[i+16]=f=f+o[i-1]<<1;}for(i=0;i<l;++i){f=e[i];if(f!=0)c[i]=o[f+16]++;}var u=0;for(i=0;i<l;++i){u=e[i];if(u!=0){f=ae(c[i],a)>>a-u;for(s=(1<<a+4-u)-1;s>=0;--s){r[f|s<<u]=u&15|i<<4;}}}return a;}var ve=ee?new Uint16Array(512):ue(512);var pe=ee?new Uint16Array(32):ue(32);if(!ee){for(var me=0;me<512;++me){ve[me]=0;}for(me=0;me<32;++me){pe[me]=0;}}(function(){var e=[];var r=0;for(;r<32;r++){e.push(5);}de(e,pe,32);var t=[];r=0;for(;r<=143;r++){t.push(8);}for(;r<=255;r++){t.push(9);}for(;r<=279;r++){t.push(7);}for(;r<=287;r++){t.push(8);}de(t,ve,288);})();var be=ee?new Uint16Array(32768):ue(32768);var ge=ee?new Uint16Array(32768):ue(32768);var we=ee?new Uint16Array(128):ue(128);var ke=1,Ee=1;function Se(e,r){var t=fe(e,r)+257;r+=5;var a=fe(e,r)+1;r+=5;var n=se(e,r)+4;r+=4;var i=0;var s=ee?new Uint8Array(19):ue(19);var f=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];var l=1;var o=ee?new Uint8Array(8):ue(8);var c=ee?new Uint8Array(8):ue(8);var u=s.length;for(var h=0;h<n;++h){s[Z[h]]=i=ie(e,r);if(l<i)l=i;o[i]++;r+=3;}var d=0;o[0]=0;for(h=1;h<=l;++h){c[h]=d=d+o[h-1]<<1;}for(h=0;h<u;++h){if((d=s[h])!=0)f[h]=c[d]++;}var v=0;for(h=0;h<u;++h){v=s[h];if(v!=0){d=re[f[h]]>>8-v;for(var p=(1<<7-v)-1;p>=0;--p){we[d|p<<v]=v&7|h<<3;}}}var m=[];l=1;for(;m.length<t+a;){d=we[le(e,r)];r+=d&7;switch(d>>>=3){case 16:i=3+ne(e,r);r+=2;d=m[m.length-1];while(i-->0){m.push(d);}break;case 17:i=3+ie(e,r);r+=3;while(i-->0){m.push(0);}break;case 18:i=11+le(e,r);r+=7;while(i-->0){m.push(0);}break;default:m.push(d);if(l<d)l=d;break;}}var b=m.slice(0,t),g=m.slice(t);for(h=t;h<286;++h){b[h]=0;}for(h=a;h<30;++h){g[h]=0;}ke=de(b,be,286);Ee=de(g,ge,30);return r;}function _e(e,r){if(e[0]==3&&!(e[1]&3)){return[_(r),2];}var t=0;var a=0;var n=C(r?r:1<<18);var i=0;var s=n.length>>>0;var f=0,l=0;while((a&1)==0){a=ie(e,t);t+=3;if(a>>>1==0){if(t&7)t+=8-(t&7);var o=e[t>>>3]|e[(t>>>3)+1]<<8;t+=32;if(!r&&s<i+o){n=ce(n,i+o);s=n.length;}if(typeof e.copy==="function"){e.copy(n,i,t>>>3,(t>>>3)+o);i+=o;t+=8*o;}else while(o-->0){n[i++]=e[t>>>3];t+=8;}continue;}else if(a>>>1==1){f=9;l=5;}else{t=Se(e,t);f=ke;l=Ee;}if(!r&&s<i+32767){n=ce(n,i+32767);s=n.length;}for(;;){var c=oe(e,t,f);var u=a>>>1==1?ve[c]:be[c];t+=u&15;u>>>=4;if((u>>>8&255)===0)n[i++]=u;else if(u==256)break;else{u-=257;var h=u<8?0:u-4>>2;if(h>5)h=0;var d=i+J[u];if(h>0){d+=oe(e,t,h);t+=h;}c=oe(e,t,l);u=a>>>1==1?pe[c]:ge[c];t+=u&15;u>>>=4;var v=u<4?0:u-2>>1;var p=Q[u];if(v>0){p+=oe(e,t,v);t+=v;}if(!r&&s<d){n=ce(n,d);s=n.length;}while(i<d){n[i]=n[i-p];++i;}}}}return[r?n:n.slice(0,i),t+7>>>3];}function Ce(e,r){var t=e.slice(e.l||0);var a=_e(t,r);e.l+=a[1];return a[0];}function Be(e,r){if(e){if(typeof console!=="undefined")console.error(r);}else throw new Error(r);}function Te(e,r){var t=e;Yr(t,0);var a=[],n=[];var i={FileIndex:a,FullPaths:n};y(i,{root:r.root});var f=t.length-4;while((t[f]!=80||t[f+1]!=75||t[f+2]!=5||t[f+3]!=6)&&f>=0){--f;}t.l=f+4;t.l+=4;var l=t._R(2);t.l+=6;var o=t._R(4);t.l=o;for(f=0;f<l;++f){t.l+=20;var c=t._R(4);var u=t._R(4);var h=t._R(2);var d=t._R(2);var v=t._R(2);t.l+=8;var p=t._R(4);var m=s(t.slice(t.l+h,t.l+h+d));t.l+=h+d+v;var b=t.l;t.l=p+4;ye(t,c,u,i,m);t.l=b;}return i;}function ye(e,r,t,a,n){e.l+=2;var f=e._R(2);var l=e._R(2);var o=i(e);if(f&8257)throw new Error("Unsupported ZIP encryption");var c=e._R(4);var u=e._R(4);var h=e._R(4);var d=e._R(2);var v=e._R(2);var p="";for(var m=0;m<d;++m){p+=String.fromCharCode(e[e.l++]);}if(v){var b=s(e.slice(e.l,e.l+v));if((b[21589]||{}).mt)o=b[21589].mt;if(((n||{})[21589]||{}).mt)o=n[21589].mt;}e.l+=v;var g=e.slice(e.l,e.l+u);switch(l){case 8:g=$(e,h);break;case 0:break;default:throw new Error("Unsupported ZIP Compression method "+l);}var w=false;if(f&8){c=e._R(4);if(c==134695760){c=e._R(4);w=true;}u=e._R(4);h=e._R(4);}if(u!=r)Be(w,"Bad compressed size: "+r+" != "+u);if(h!=t)Be(w,"Bad uncompressed size: "+t+" != "+h);var k=H.buf(g,0);if(c>>0!=k>>0)Be(w,"Bad CRC32 checksum: "+c+" != "+k);Ie(a,p,g,{unsafe:true,mt:o});}function xe(e,r){var t=r||{};var a=[],i=[];var s=Jr(1);var f=t.compression?8:0,l=0;var o=false;if(o)l|=8;var c=0,u=0;var h=0,d=0;var v=e.FullPaths[0],p=v,m=e.FileIndex[0];var b=[];var g=0;for(c=1;c<e.FullPaths.length;++c){p=e.FullPaths[c].slice(v.length);m=e.FileIndex[c];if(!m.size||!m.content||p=="Sh33tJ5")continue;var w=h;var k=Jr(p.length);for(u=0;u<p.length;++u){k._W(1,p.charCodeAt(u)&127);}k=k.slice(0,k.l);b[d]=H.buf(m.content,0);var E=m.content;if(f==8)E=Y(E);s=Jr(30);s._W(4,67324752);s._W(2,20);s._W(2,l);s._W(2,f);if(m.mt)n(s,m.mt);else s._W(4,0);s._W(-4,l&8?0:b[d]);s._W(4,l&8?0:E.length);s._W(4,l&8?0:m.content.length);s._W(2,k.length);s._W(2,0);h+=s.length;a.push(s);h+=k.length;a.push(k);h+=E.length;a.push(E);if(l&8){s=Jr(12);s._W(-4,b[d]);s._W(4,E.length);s._W(4,m.content.length);h+=s.l;a.push(s);}s=Jr(46);s._W(4,33639248);s._W(2,0);s._W(2,20);s._W(2,l);s._W(2,f);s._W(4,0);s._W(-4,b[d]);s._W(4,E.length);s._W(4,m.content.length);s._W(2,k.length);s._W(2,0);s._W(2,0);s._W(2,0);s._W(2,0);s._W(4,0);s._W(4,w);g+=s.l;i.push(s);g+=k.length;i.push(k);++d;}s=Jr(22);s._W(4,101010256);s._W(2,0);s._W(2,0);s._W(2,d);s._W(2,d);s._W(4,g);s._W(4,h);s._W(2,0);return I([I(a),I(i),s]);}function Ae(e){var r={};y(r,e);return r;}function Ie(e,r,t,n){var i=n&&n.unsafe;if(!i)y(e);var s=!i&&W.find(e,r);if(!s){var f=e.FullPaths[0];if(r.slice(0,f.length)==f)f=r;else{if(f.slice(-1)!="/")f+="/";f=(f+r).replace("//","/");}s={name:a(r),type:2};e.FileIndex.push(s);e.FullPaths.push(f);if(!i)W.utils.cfb_gc(e);}s.content=t;s.size=t?t.length:0;if(n){if(n.CLSID)s.clsid=n.CLSID;if(n.mt)s.mt=n.mt;if(n.ct)s.ct=n.ct;}return s;}function Re(e,r){y(e);var t=W.find(e,r);if(t)for(var a=0;a<e.FileIndex.length;++a){if(e.FileIndex[a]==t){e.FileIndex.splice(a,1);e.FullPaths.splice(a,1);return true;}}return false;}function Fe(e,r,t){y(e);var n=W.find(e,r);if(n)for(var i=0;i<e.FileIndex.length;++i){if(e.FileIndex[i]==n){e.FileIndex[i].name=a(t);e.FullPaths[i]=t;return true;}}return false;}function Oe(e){A(e,true);}e.find=D;e.read=T;e.parse=o;e.write=G;e.writeFile=V;e.utils={cfb_new:Ae,cfb_add:Ie,cfb_del:Re,cfb_mov:Fe,cfb_gc:Oe,ReadShift:Vr,CheckField:$r,prep_blob:Yr,bconcat:I,use_zlib:K,_deflateRaw:he,_inflateRaw:Ce,consts:z};return e;}();if( true&&typeof z==="undefined"){module.exports=W;}var V;if(true)try{V=__webpack_require__(/*! fs */ "../node_modules/node-libs-browser/mock/empty.js");}catch(S){}function X(e){if(typeof e==="string")return T(e);if(Array.isArray(e))return x(e);return e;}function G(e,r,t){if(typeof V!=="undefined"&&V.writeFileSync)return t?V.writeFileSync(e,r,t):V.writeFileSync(e,r);var a=t=="utf8"?Ze(r):r;if(typeof IE_SaveFile!=="undefined")return IE_SaveFile(a,e);if(typeof Blob!=="undefined"){var n=new Blob([X(a)],{type:"application/octet-stream"});if(typeof navigator!=="undefined"&&navigator.msSaveBlob)return navigator.msSaveBlob(n,e);if(typeof saveAs!=="undefined")return saveAs(n,e);if(typeof URL!=="undefined"&&typeof document!=="undefined"&&document.createElement&&URL.createObjectURL){var i=URL.createObjectURL(n);if((typeof chrome==="undefined"?"undefined":_typeof(chrome))==="object"&&typeof(chrome.downloads||{}).download=="function"){if(URL.revokeObjectURL&&typeof setTimeout!=="undefined")setTimeout(function(){URL.revokeObjectURL(i);},6e4);return chrome.downloads.download({url:i,filename:e,saveAs:true});}var s=document.createElement("a");if(s.download!=null){s.download=e;s.href=i;document.body.appendChild(s);s.click();document.body.removeChild(s);if(URL.revokeObjectURL&&typeof setTimeout!=="undefined")setTimeout(function(){URL.revokeObjectURL(i);},6e4);return i;}}}if(typeof $!=="undefined"&&typeof File!=="undefined"&&typeof Folder!=="undefined")try{var f=File(e);f.open("w");f.encoding="binary";if(Array.isArray(r))r=y(r);f.write(r);f.close();return r;}catch(l){if(!l.message||!l.message.match(/onstruct/))throw l;}throw new Error("cannot save file "+e);}function j(e){if(typeof V!=="undefined")return V.readFileSync(e);if(typeof $!=="undefined"&&typeof File!=="undefined"&&typeof Folder!=="undefined")try{var r=File(e);r.open("r");r.encoding="binary";var t=r.read();r.close();return t;}catch(a){if(!a.message||!a.message.match(/onstruct/))throw a;}throw new Error("Cannot access file "+e);}function K(e){var r=Object.keys(e),t=[];for(var a=0;a<r.length;++a){if(Object.prototype.hasOwnProperty.call(e,r[a]))t.push(r[a]);}return t;}function Y(e,r){var t=[],a=K(e);for(var n=0;n!==a.length;++n){if(t[e[a[n]][r]]==null)t[e[a[n]][r]]=a[n];}return t;}function Z(e){var r=[],t=K(e);for(var a=0;a!==t.length;++a){r[e[t[a]]]=t[a];}return r;}function J(e){var r=[],t=K(e);for(var a=0;a!==t.length;++a){r[e[t[a]]]=parseInt(t[a],10);}return r;}function Q(e){var r=[],t=K(e);for(var a=0;a!==t.length;++a){if(r[e[t[a]]]==null)r[e[t[a]]]=[];r[e[t[a]]].push(t[a]);}return r;}var q=new Date(1899,11,30,0,0,0);function ee(e,r){var t=e.getTime();if(r)t-=1462*24*60*60*1e3;var a=q.getTime()+(e.getTimezoneOffset()-q.getTimezoneOffset())*6e4;return(t-a)/(24*60*60*1e3);}var re=new Date();var te=q.getTime()+(re.getTimezoneOffset()-q.getTimezoneOffset())*6e4;var ae=re.getTimezoneOffset();function ne(e){var r=new Date();r.setTime(e*24*60*60*1e3+te);if(r.getTimezoneOffset()!==ae){r.setTime(r.getTime()+(r.getTimezoneOffset()-ae)*6e4);}return r;}function ie(e){var r=0,t=0,a=false;var n=e.match(/P([0-9\.]+Y)?([0-9\.]+M)?([0-9\.]+D)?T([0-9\.]+H)?([0-9\.]+M)?([0-9\.]+S)?/);if(!n)throw new Error("|"+e+"| is not an ISO8601 Duration");for(var i=1;i!=n.length;++i){if(!n[i])continue;t=1;if(i>3)a=true;switch(n[i].slice(n[i].length-1)){case"Y":throw new Error("Unsupported ISO Duration Field: "+n[i].slice(n[i].length-1));case"D":t*=24;case"H":t*=60;case"M":if(!a)throw new Error("Unsupported ISO Duration Field: M");else t*=60;case"S":break;}r+=t*parseInt(n[i],10);}return r;}var se=new Date("2017-02-19T19:06:09.000Z");if(isNaN(se.getFullYear()))se=new Date("2/19/17");var fe=se.getFullYear()==2017;function le(e,r){var t=new Date(e);if(fe){if(r>0)t.setTime(t.getTime()+t.getTimezoneOffset()*60*1e3);else if(r<0)t.setTime(t.getTime()-t.getTimezoneOffset()*60*1e3);return t;}if(e instanceof Date)return e;if(se.getFullYear()==1917&&!isNaN(t.getFullYear())){var a=t.getFullYear();if(e.indexOf(""+a)>-1)return t;t.setFullYear(t.getFullYear()+100);return t;}var n=e.match(/\d+/g)||["2017","2","19","0","0","0"];var i=new Date(+n[0],+n[1]-1,+n[2],+n[3]||0,+n[4]||0,+n[5]||0);if(e.indexOf("Z")>-1)i=new Date(i.getTime()-i.getTimezoneOffset()*60*1e3);return i;}function oe(e){var r="";for(var t=0;t!=e.length;++t){r+=String.fromCharCode(e[t]);}return r;}function ce(e){if(typeof JSON!="undefined"&&!Array.isArray(e))return JSON.parse(JSON.stringify(e));if(_typeof(e)!="object"||e==null)return e;if(e instanceof Date)return new Date(e.getTime());var r={};for(var t in e){if(Object.prototype.hasOwnProperty.call(e,t))r[t]=ce(e[t]);}return r;}function ue(e,r){var t="";while(t.length<r){t+=e;}return t;}function he(e){var r=Number(e);if(isFinite(r))return r;if(!isNaN(r))return NaN;if(!/\d/.test(e))return r;var t=1;var a=e.replace(/([\d]),([\d])/g,"$1$2").replace(/[$]/g,"").replace(/[%]/g,function(){t*=100;return"";});if(!isNaN(r=Number(a)))return r/t;a=a.replace(/[(](.*)[)]/,function(e,r){t=-t;return r;});if(!isNaN(r=Number(a)))return r/t;return r;}function de(e){var r=new Date(e),t=new Date(NaN);var a=r.getYear(),n=r.getMonth(),i=r.getDate();if(isNaN(i))return t;if(a<0||a>8099)return t;if((n>0||i>1)&&a!=101)return r;if(e.toLowerCase().match(/jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec/))return r;if(e.match(/[^-0-9:,\/\\]/))return t;return r;}var ve="abacaba".split(/(:?b)/i).length==5;function pe(e,r,t){if(ve||typeof r=="string")return e.split(r);var a=e.split(r),n=[a[0]];for(var i=1;i<a.length;++i){n.push(t);n.push(a[i]);}return n;}function me(e){if(!e)return null;if(e.data)return d(e.data);if(e.asNodeBuffer&&w)return d(e.asNodeBuffer().toString("binary"));if(e.asBinary)return d(e.asBinary());if(e._data&&e._data.getContent)return d(oe(Array.prototype.slice.call(e._data.getContent(),0)));if(e.content&&e.type)return d(oe(e.content));return null;}function be(e){if(!e)return null;if(e.data)return c(e.data);if(e.asNodeBuffer&&w)return e.asNodeBuffer();if(e._data&&e._data.getContent){var r=e._data.getContent();if(typeof r=="string")return c(r);return Array.prototype.slice.call(r);}if(e.content&&e.type)return e.content;return null;}function ge(e){return e&&e.name.slice(-4)===".bin"?be(e):me(e);}function we(e,r){var t=e.FullPaths||K(e.files);var a=r.toLowerCase().replace(/[\/]/g,"\\"),n=a.replace(/\\/g,"/");for(var i=0;i<t.length;++i){var s=t[i].replace(/^Root Entry[\/]/,"").toLowerCase();if(a==s||n==s)return e.files?e.files[t[i]]:e.FileIndex[i];}return null;}function ke(e,r){var t=we(e,r);if(t==null)throw new Error("Cannot find file "+r+" in zip");return t;}function Ee(e,r,t){if(!t)return ge(ke(e,r));if(!r)return null;try{return Ee(e,r);}catch(a){return null;}}function Se(e,r,t){if(!t)return me(ke(e,r));if(!r)return null;try{return Se(e,r);}catch(a){return null;}}function _e(e){var r=e.FullPaths||K(e.files),t=[];for(var a=0;a<r.length;++a){if(r[a].slice(-1)!="/")t.push(r[a]);}return t.sort();}function Ce(e,r,t){if(e.FullPaths)W.utils.cfb_add(e,r,t);else e.file(r,t);}var Be;if(typeof JSZipSync!=="undefined")Be=JSZipSync;if(true){if( true&&module.exports){if(typeof Be==="undefined")Be=undefined;}}function Te(){if(!Be)return W.utils.cfb_new();return new Be();}function ye(e,r){var t;if(Be)switch(r.type){case"base64":t=new Be(e,{base64:true});break;case"binary":;case"array":t=new Be(e,{base64:false});break;case"buffer":t=new Be(e);break;default:throw new Error("Unrecognized type "+r.type);}else switch(r.type){case"base64":t=W.read(e,{type:"base64"});break;case"binary":t=W.read(e,{type:"binary"});break;case"buffer":;case"array":t=W.read(e,{type:"buffer"});break;default:throw new Error("Unrecognized type "+r.type);}return t;}function xe(e,r){if(e.charAt(0)=="/")return e.slice(1);var t=r.split("/");if(r.slice(-1)!="/")t.pop();var a=e.split("/");while(a.length!==0){var n=a.shift();if(n==="..")t.pop();else if(n!==".")t.push(n);}return t.join("/");}var Ae='<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\r\n';var Ie=/([^"\s?>\/]+)\s*=\s*((?:")([^"]*)(?:")|(?:')([^']*)(?:')|([^'">\s]+))/g;var Re=/<[\/\?]?[a-zA-Z0-9:_-]+(?:\s+[^"\s?>\/]+\s*=\s*(?:"[^"]*"|'[^']*'|[^'">\s=]+))*\s*[\/\?]?>/gm;if(!Ae.match(Re))Re=/<[^>]*>/g;var Fe=/<\w*:/,Oe=/<(\/?)\w+:/;function De(e,r,t){var a={};var n=0,i=0;for(;n!==e.length;++n){if((i=e.charCodeAt(n))===32||i===10||i===13)break;}if(!r)a[0]=e.slice(0,n);if(n===e.length)return a;var s=e.match(Ie),f=0,l="",o=0,c="",u="",h=1;if(s)for(o=0;o!=s.length;++o){u=s[o];for(i=0;i!=u.length;++i){if(u.charCodeAt(i)===61)break;}c=u.slice(0,i).trim();while(u.charCodeAt(i+1)==32){++i;}h=(n=u.charCodeAt(i+1))==34||n==39?1:0;l=u.slice(i+1+h,u.length-h);for(f=0;f!=c.length;++f){if(c.charCodeAt(f)===58)break;}if(f===c.length){if(c.indexOf("_")>0)c=c.slice(0,c.indexOf("_"));a[c]=l;if(!t)a[c.toLowerCase()]=l;}else{var d=(f===5&&c.slice(0,5)==="xmlns"?"xmlns":"")+c.slice(f+1);if(a[d]&&c.slice(f-3,f)=="ext")continue;a[d]=l;if(!t)a[d.toLowerCase()]=l;}}return a;}function Pe(e){return e.replace(Oe,"<$1");}var Ne={"&quot;":'"',"&apos;":"'","&gt;":">","&lt;":"<","&amp;":"&"};var Le=Z(Ne);var Me=function(){var e=/&(?:quot|apos|gt|lt|amp|#x?([\da-fA-F]+));/gi,r=/_x([\da-fA-F]{4})_/gi;return function t(a){var n=a+"",i=n.indexOf("<![CDATA[");if(i==-1)return n.replace(e,function(e,r){return Ne[e]||String.fromCharCode(parseInt(r,e.indexOf("x")>-1?16:10))||e;}).replace(r,function(e,r){return String.fromCharCode(parseInt(r,16));});var s=n.indexOf("]]>");return t(n.slice(0,i))+n.slice(i+9,s)+t(n.slice(s+3));};}();var Ue=/[&<>'"]/g,ze=/[\u0000-\u0008\u000b-\u001f]/g;function He(e){var r=e+"";return r.replace(Ue,function(e){return Le[e];}).replace(ze,function(e){return"_x"+("000"+e.charCodeAt(0).toString(16)).slice(-4)+"_";});}function We(e){return He(e).replace(/ /g,"_x0020_");}var Ve=/[\u0000-\u001f]/g;function Xe(e){var r=e+"";return r.replace(Ue,function(e){return Le[e];}).replace(/\n/g,"<br/>").replace(Ve,function(e){return"&#x"+("000"+e.charCodeAt(0).toString(16)).slice(-4)+";";});}function Ge(e){var r=e+"";return r.replace(Ue,function(e){return Le[e];}).replace(Ve,function(e){return"&#x"+e.charCodeAt(0).toString(16).toUpperCase()+";";});}var je=function(){var e=/&#(\d+);/g;function r(e,r){return String.fromCharCode(parseInt(r,10));}return function t(a){return a.replace(e,r);};}();var Ke=function(){return function e(r){return r.replace(/(\r\n|[\r\n])/g,"&#10;");};}();function $e(e){switch(e){case 1:;case true:;case"1":;case"true":;case"TRUE":return true;default:return false;}}var Ye=function Ub(e){var r="",t=0,a=0,n=0,i=0,s=0,f=0;while(t<e.length){a=e.charCodeAt(t++);if(a<128){r+=String.fromCharCode(a);continue;}n=e.charCodeAt(t++);if(a>191&&a<224){s=(a&31)<<6;s|=n&63;r+=String.fromCharCode(s);continue;}i=e.charCodeAt(t++);if(a<240){r+=String.fromCharCode((a&15)<<12|(n&63)<<6|i&63);continue;}s=e.charCodeAt(t++);f=((a&7)<<18|(n&63)<<12|(i&63)<<6|s&63)-65536;r+=String.fromCharCode(55296+(f>>>10&1023));r+=String.fromCharCode(56320+(f&1023));}return r;};var Ze=function Ze(e){var r=[],t=0,a=0,n=0;while(t<e.length){a=e.charCodeAt(t++);switch(true){case a<128:r.push(String.fromCharCode(a));break;case a<2048:r.push(String.fromCharCode(192+(a>>6)));r.push(String.fromCharCode(128+(a&63)));break;case a>=55296&&a<57344:a-=55296;n=e.charCodeAt(t++)-56320+(a<<10);r.push(String.fromCharCode(240+(n>>18&7)));r.push(String.fromCharCode(144+(n>>12&63)));r.push(String.fromCharCode(128+(n>>6&63)));r.push(String.fromCharCode(128+(n&63)));break;default:r.push(String.fromCharCode(224+(a>>12)));r.push(String.fromCharCode(128+(a>>6&63)));r.push(String.fromCharCode(128+(a&63)));}}return r.join("");};if(w){var Je=function zb(e){var r=Buffer.alloc(2*e.length),t,a,n=1,i=0,s=0,f;for(a=0;a<e.length;a+=n){n=1;if((f=e.charCodeAt(a))<128)t=f;else if(f<224){t=(f&31)*64+(e.charCodeAt(a+1)&63);n=2;}else if(f<240){t=(f&15)*4096+(e.charCodeAt(a+1)&63)*64+(e.charCodeAt(a+2)&63);n=3;}else{n=4;t=(f&7)*262144+(e.charCodeAt(a+1)&63)*4096+(e.charCodeAt(a+2)&63)*64+(e.charCodeAt(a+3)&63);t-=65536;s=55296+(t>>>10&1023);t=56320+(t&1023);}if(s!==0){r[i++]=s&255;r[i++]=s>>>8;s=0;}r[i++]=t%256;r[i++]=t>>>8;}return r.slice(0,i).toString("ucs2");};var Qe="foo bar bazâð£";if(Ye(Qe)==Je(Qe))Ye=Je;var qe=function Hb(e){return k(e,"binary").toString("utf8");};if(Ye(Qe)==qe(Qe))Ye=qe;Ze=function Ze(e){return k(e,"utf8").toString("binary");};}var er=function(){var e={};return function r(t,a){var n=t+"|"+(a||"");if(e[n])return e[n];return e[n]=new RegExp("<(?:\\w+:)?"+t+'(?: xml:space="preserve")?(?:[^>]*)>([\\s\\S]*?)</(?:\\w+:)?'+t+">",a||"");};}();var rr=function(){var e=[["nbsp"," "],["middot","·"],["quot",'"'],["apos","'"],["gt",">"],["lt","<"],["amp","&"]].map(function(e){return[new RegExp("&"+e[0]+";","ig"),e[1]];});return function r(t){var a=t.replace(/^[\t\n\r ]+/,"").replace(/[\t\n\r ]+$/,"").replace(/>\s+/g,">").replace(/\s+</g,"<").replace(/[\t\n\r ]+/g," ").replace(/<\s*[bB][rR]\s*\/?>/g,"\n").replace(/<[^>]*>/g,"");for(var n=0;n<e.length;++n){a=a.replace(e[n][0],e[n][1]);}return a;};}();var tr=function(){var e={};return function r(t){if(e[t]!==undefined)return e[t];return e[t]=new RegExp("<(?:vt:)?"+t+">([\\s\\S]*?)</(?:vt:)?"+t+">","g");};}();var ar=/<\/?(?:vt:)?variant>/g,nr=/<(?:vt:)([^>]*)>([\s\S]*)</;function ir(e,r){var t=De(e);var a=e.match(tr(t.baseType))||[];var n=[];if(a.length!=t.size){if(r.WTF)throw new Error("unexpected vector length "+a.length+" != "+t.size);return n;}a.forEach(function(e){var r=e.replace(ar,"").match(nr);if(r)n.push({v:Ye(r[2]),t:r[1]});});return n;}var sr=/(^\s|\s$|\n)/;function fr(e,r){return"<"+e+(r.match(sr)?' xml:space="preserve"':"")+">"+r+"</"+e+">";}function lr(e){return K(e).map(function(r){return" "+r+'="'+e[r]+'"';}).join("");}function or(e,r,t){return"<"+e+(t!=null?lr(t):"")+(r!=null?(r.match(sr)?' xml:space="preserve"':"")+">"+r+"</"+e:"/")+">";}function cr(e,r){try{return e.toISOString().replace(/\.\d*/,"");}catch(t){if(r)throw t;}return"";}function ur(e,r){switch(_typeof(e)){case"string":var t=or("vt:lpwstr",He(e));if(r)t=t.replace(/&quot;/g,"_x0022_");return t;case"number":return or((e|0)==e?"vt:i4":"vt:r8",He(String(e)));case"boolean":return or("vt:bool",e?"true":"false");}if(e instanceof Date)return or("vt:filetime",cr(e));throw new Error("Unable to serialize "+e);}var hr={dc:"http://purl.org/dc/elements/1.1/",dcterms:"http://purl.org/dc/terms/",dcmitype:"http://purl.org/dc/dcmitype/",mx:"http://schemas.microsoft.com/office/mac/excel/2008/main",r:"http://schemas.openxmlformats.org/officeDocument/2006/relationships",sjs:"http://schemas.openxmlformats.org/package/2006/sheetjs/core-properties",vt:"http://schemas.openxmlformats.org/officeDocument/2006/docPropsVTypes",xsi:"http://www.w3.org/2001/XMLSchema-instance",xsd:"http://www.w3.org/2001/XMLSchema"};hr.main=["http://schemas.openxmlformats.org/spreadsheetml/2006/main","http://purl.oclc.org/ooxml/spreadsheetml/main","http://schemas.microsoft.com/office/excel/2006/main","http://schemas.microsoft.com/office/excel/2006/2"];var dr={o:"urn:schemas-microsoft-com:office:office",x:"urn:schemas-microsoft-com:office:excel",ss:"urn:schemas-microsoft-com:office:spreadsheet",dt:"uuid:C2F41010-65B3-11d1-A29F-00AA00C14882",mv:"http://macVmlSchemaUri",v:"urn:schemas-microsoft-com:vml",html:"http://www.w3.org/TR/REC-html40"};function vr(e,r){var t=1-2*(e[r+7]>>>7);var a=((e[r+7]&127)<<4)+(e[r+6]>>>4&15);var n=e[r+6]&15;for(var i=5;i>=0;--i){n=n*256+e[r+i];}if(a==2047)return n==0?t*Infinity:NaN;if(a==0)a=-1022;else{a-=1023;n+=Math.pow(2,52);}return t*Math.pow(2,a-52)*n;}function pr(e,r,t){var a=(r<0||1/r==-Infinity?1:0)<<7,n=0,i=0;var s=a?-r:r;if(!isFinite(s)){n=2047;i=isNaN(r)?26985:0;}else if(s==0)n=i=0;else{n=Math.floor(Math.log(s)/Math.LN2);i=s*Math.pow(2,52-n);if(n<=-1023&&(!isFinite(i)||i<Math.pow(2,52))){n=-1022;}else{i-=Math.pow(2,52);n+=1023;}}for(var f=0;f<=5;++f,i/=256){e[t+f]=i&255;}e[t+6]=(n&15)<<4|i&15;e[t+7]=n>>4|a;}var mr=function mr(e){var r=[],t=10240;for(var a=0;a<e[0].length;++a){if(e[0][a])for(var n=0,i=e[0][a].length;n<i;n+=t){r.push.apply(r,e[0][a].slice(n,n+t));}}return r;};var br=mr;var gr=function gr(e,r,t){var a=[];for(var n=r;n<t;n+=2){a.push(String.fromCharCode(Mr(e,n)));}return a.join("").replace(R,"");};var wr=gr;var kr=function kr(e,r,t){var a=[];for(var n=r;n<r+t;++n){a.push(("0"+e[n].toString(16)).slice(-2));}return a.join("");};var Er=kr;var Sr=function Sr(e,r,t){var a=[];for(var n=r;n<t;n++){a.push(String.fromCharCode(Lr(e,n)));}return a.join("");};var _r=Sr;var Cr=function Cr(e,r){var t=zr(e,r);return t>0?Sr(e,r+4,r+4+t-1):"";};var Br=Cr;var Tr=function Tr(e,r){var t=zr(e,r);return t>0?Sr(e,r+4,r+4+t-1):"";};var yr=Tr;var xr=function xr(e,r){var t=2*zr(e,r);return t>0?Sr(e,r+4,r+4+t-1):"";};var Ar=xr;var Ir,Rr;Ir=Rr=function Wb(e,r){var t=zr(e,r);return t>0?gr(e,r+4,r+4+t):"";};var Fr=function Fr(e,r){var t=zr(e,r);return t>0?Sr(e,r+4,r+4+t):"";};var Or=Fr;var Dr,Pr;Dr=Pr=function Pr(e,r){return vr(e,r);};var Nr=function Vb(e){return Array.isArray(e);};if(w){gr=function gr(e,r,t){if(!Buffer.isBuffer(e))return wr(e,r,t);return e.toString("utf16le",r,t).replace(R,"");};kr=function kr(e,r,t){return Buffer.isBuffer(e)?e.toString("hex",r,r+t):Er(e,r,t);};Cr=function Xb(e,r){if(!Buffer.isBuffer(e))return Br(e,r);var t=e.readUInt32LE(r);return t>0?e.toString("utf8",r+4,r+4+t-1):"";};Tr=function Gb(e,r){if(!Buffer.isBuffer(e))return yr(e,r);var t=e.readUInt32LE(r);return t>0?e.toString("utf8",r+4,r+4+t-1):"";};xr=function jb(e,r){if(!Buffer.isBuffer(e))return Ar(e,r);var t=2*e.readUInt32LE(r);return e.toString("utf16le",r+4,r+4+t-1);};Ir=function Kb(e,r){if(!Buffer.isBuffer(e))return Rr(e,r);var t=e.readUInt32LE(r);return e.toString("utf16le",r+4,r+4+t);};Fr=function $b(e,r){if(!Buffer.isBuffer(e))return Or(e,r);var t=e.readUInt32LE(r);return e.toString("utf8",r+4,r+4+t);};Sr=function Yb(e,r,t){return Buffer.isBuffer(e)?e.toString("utf8",r,t):_r(e,r,t);};mr=function mr(e){return e[0].length>0&&Buffer.isBuffer(e[0][0])?Buffer.concat(e[0]):br(e);};I=function I(e){return Buffer.isBuffer(e[0])?Buffer.concat(e):[].concat.apply([],e);};Dr=function Zb(e,r){if(Buffer.isBuffer(e))return e.readDoubleLE(r);return Pr(e,r);};Nr=function Jb(e){return Buffer.isBuffer(e)||Array.isArray(e);};}if(typeof cptable!=="undefined"){gr=function gr(e,r,t){return cptable.utils.decode(1200,e.slice(r,t)).replace(R,"");};Sr=function Sr(e,r,t){return cptable.utils.decode(65001,e.slice(r,t));};Cr=function Cr(e,r){var a=zr(e,r);return a>0?cptable.utils.decode(t,e.slice(r+4,r+4+a-1)):"";};Tr=function Tr(e,t){var a=zr(e,t);return a>0?cptable.utils.decode(r,e.slice(t+4,t+4+a-1)):"";};xr=function xr(e,r){var t=2*zr(e,r);return t>0?cptable.utils.decode(1200,e.slice(r+4,r+4+t-1)):"";};Ir=function Ir(e,r){var t=zr(e,r);return t>0?cptable.utils.decode(1200,e.slice(r+4,r+4+t)):"";};Fr=function Fr(e,r){var t=zr(e,r);return t>0?cptable.utils.decode(65001,e.slice(r+4,r+4+t)):"";};}var Lr=function Lr(e,r){return e[r];};var Mr=function Mr(e,r){return e[r+1]*(1<<8)+e[r];};var Ur=function Ur(e,r){var t=e[r+1]*(1<<8)+e[r];return t<32768?t:(65535-t+1)*-1;};var zr=function zr(e,r){return e[r+3]*(1<<24)+(e[r+2]<<16)+(e[r+1]<<8)+e[r];};var Hr=function Hr(e,r){return e[r+3]<<24|e[r+2]<<16|e[r+1]<<8|e[r];};var Wr=function Wr(e,r){return e[r]<<24|e[r+1]<<16|e[r+2]<<8|e[r+3];};function Vr(e,t){var a="",n,i,s=[],f,l,o,c;switch(t){case"dbcs":c=this.l;if(w&&Buffer.isBuffer(this))a=this.slice(this.l,this.l+2*e).toString("utf16le");else for(o=0;o<e;++o){a+=String.fromCharCode(Mr(this,c));c+=2;}e*=2;break;case"utf8":a=Sr(this,this.l,this.l+e);break;case"utf16le":e*=2;a=gr(this,this.l,this.l+e);break;case"wstr":if(typeof cptable!=="undefined")a=cptable.utils.decode(r,this.slice(this.l,this.l+2*e));else return Vr.call(this,e,"dbcs");e=2*e;break;case"lpstr-ansi":a=Cr(this,this.l);e=4+zr(this,this.l);break;case"lpstr-cp":a=Tr(this,this.l);e=4+zr(this,this.l);break;case"lpwstr":a=xr(this,this.l);e=4+2*zr(this,this.l);break;case"lpp4":e=4+zr(this,this.l);a=Ir(this,this.l);if(e&2)e+=2;break;case"8lpp4":e=4+zr(this,this.l);a=Fr(this,this.l);if(e&3)e+=4-(e&3);break;case"cstr":e=0;a="";while((f=Lr(this,this.l+e++))!==0){s.push(v(f));}a=s.join("");break;case"_wstr":e=0;a="";while((f=Mr(this,this.l+e))!==0){s.push(v(f));e+=2;}e+=2;a=s.join("");break;case"dbcs-cont":a="";c=this.l;for(o=0;o<e;++o){if(this.lens&&this.lens.indexOf(c)!==-1){f=Lr(this,c);this.l=c+1;l=Vr.call(this,e-o,f?"dbcs-cont":"sbcs-cont");return s.join("")+l;}s.push(v(Mr(this,c)));c+=2;}a=s.join("");e*=2;break;case"cpstr":if(typeof cptable!=="undefined"){a=cptable.utils.decode(r,this.slice(this.l,this.l+e));break;};case"sbcs-cont":a="";c=this.l;for(o=0;o!=e;++o){if(this.lens&&this.lens.indexOf(c)!==-1){f=Lr(this,c);this.l=c+1;l=Vr.call(this,e-o,f?"dbcs-cont":"sbcs-cont");return s.join("")+l;}s.push(v(Lr(this,c)));c+=1;}a=s.join("");break;default:switch(e){case 1:n=Lr(this,this.l);this.l++;return n;case 2:n=(t==="i"?Ur:Mr)(this,this.l);this.l+=2;return n;case 4:;case-4:if(t==="i"||(this[this.l+3]&128)===0){n=(e>0?Hr:Wr)(this,this.l);this.l+=4;return n;}else{i=zr(this,this.l);this.l+=4;}return i;case 8:;case-8:if(t==="f"){if(e==8)i=Dr(this,this.l);else i=Dr([this[this.l+7],this[this.l+6],this[this.l+5],this[this.l+4],this[this.l+3],this[this.l+2],this[this.l+1],this[this.l+0]],0);this.l+=8;return i;}else e=8;case 16:a=kr(this,this.l,e);break;};}this.l+=e;return a;}var Xr=function Xr(e,r,t){e[t]=r&255;e[t+1]=r>>>8&255;e[t+2]=r>>>16&255;e[t+3]=r>>>24&255;};var Gr=function Gr(e,r,t){e[t]=r&255;e[t+1]=r>>8&255;e[t+2]=r>>16&255;e[t+3]=r>>24&255;};var jr=function jr(e,r,t){e[t]=r&255;e[t+1]=r>>>8&255;};function Kr(e,r,a){var n=0,i=0;if(a==="dbcs"){for(i=0;i!=r.length;++i){jr(this,r.charCodeAt(i),this.l+2*i);}n=2*r.length;}else if(a==="sbcs"){if(typeof cptable!=="undefined"&&t==874){for(i=0;i!=r.length;++i){var s=cptable.utils.encode(t,r.charAt(i));this[this.l+i]=s[0];}}else{r=r.replace(/[^\x00-\x7F]/g,"_");for(i=0;i!=r.length;++i){this[this.l+i]=r.charCodeAt(i)&255;}}n=r.length;}else if(a==="hex"){for(;i<e;++i){this[this.l++]=parseInt(r.slice(2*i,2*i+2),16)||0;}return this;}else if(a==="utf16le"){var f=Math.min(this.l+e,this.length);for(i=0;i<Math.min(r.length,e);++i){var l=r.charCodeAt(i);this[this.l++]=l&255;this[this.l++]=l>>8;}while(this.l<f){this[this.l++]=0;}return this;}else switch(e){case 1:n=1;this[this.l]=r&255;break;case 2:n=2;this[this.l]=r&255;r>>>=8;this[this.l+1]=r&255;break;case 3:n=3;this[this.l]=r&255;r>>>=8;this[this.l+1]=r&255;r>>>=8;this[this.l+2]=r&255;break;case 4:n=4;Xr(this,r,this.l);break;case 8:n=8;if(a==="f"){pr(this,r,this.l);break;};case 16:break;case-4:n=4;Gr(this,r,this.l);break;}this.l+=n;return this;}function $r(e,r){var t=kr(this,this.l,e.length>>1);if(t!==e)throw new Error(r+"Expected "+e+" saw "+t);this.l+=e.length>>1;}function Yr(e,r){e.l=r;e._R=Vr;e.chk=$r;e._W=Kr;}function Zr(e,r){e.l+=r;}function Jr(e){var r=_(e);Yr(r,0);return r;}function Qr(e,r,t){if(!e)return;var a,n,i;Yr(e,e.l||0);var s=e.length,f=0,l=0;while(e.l<s){f=e._R(1);if(f&128)f=(f&127)+((e._R(1)&127)<<7);var o=Qp[f]||Qp[65535];a=e._R(1);i=a&127;for(n=1;n<4&&a&128;++n){i+=((a=e._R(1))&127)<<7*n;}l=e.l+i;var c=o.f&&o.f(e,i,t);e.l=l;if(r(c,o.n,f))return;}}function qr(){var e=[],r=w?256:2048;var t=function l(e){var r=Jr(e);Yr(r,0);return r;};var a=t(r);var n=function o(){if(!a)return;if(a.length>a.l){a=a.slice(0,a.l);a.l=a.length;}if(a.length>0)e.push(a);a=null;};var i=function c(e){if(a&&e<a.length-a.l)return a;n();return a=t(Math.max(e+1,r));};var s=function u(){n();return mr([e]);};var f=function h(e){n();a=e;if(a.l==null)a.l=a.length;i(r);};return{next:i,push:f,end:s,_bufs:e};}function et(e,r,t,a){var n=+qp[r],i;if(isNaN(n))return;if(!a)a=Qp[n].p||(t||[]).length||0;i=1+(n>=128?1:0)+1;if(a>=128)++i;if(a>=16384)++i;if(a>=2097152)++i;var s=e.next(i);if(n<=127)s._W(1,n);else{s._W(1,(n&127)+128);s._W(1,n>>7);}for(var f=0;f!=4;++f){if(a>=128){s._W(1,(a&127)+128);a>>=7;}else{s._W(1,a);break;}}if(a>0&&Nr(t))e.push(t);}function rt(e,r,t){var a=ce(e);if(r.s){if(a.cRel)a.c+=r.s.c;if(a.rRel)a.r+=r.s.r;}else{if(a.cRel)a.c+=r.c;if(a.rRel)a.r+=r.r;}if(!t||t.biff<12){while(a.c>=256){a.c-=256;}while(a.r>=65536){a.r-=65536;}}return a;}function tt(e,r,t){var a=ce(e);a.s=rt(a.s,r.s,t);a.e=rt(a.e,r.s,t);return a;}function at(e,r){if(e.cRel&&e.c<0){e=ce(e);while(e.c<0){e.c+=r>8?16384:256;}}if(e.rRel&&e.r<0){e=ce(e);while(e.r<0){e.r+=r>8?1048576:r>5?65536:16384;}}var t=bt(e);if(!e.cRel&&e.cRel!=null)t=dt(t);if(!e.rRel&&e.rRel!=null)t=ot(t);return t;}function nt(e,r){if(e.s.r==0&&!e.s.rRel){if(e.e.r==(r.biff>=12?1048575:r.biff>=8?65536:16384)&&!e.e.rRel){return(e.s.cRel?"":"$")+ht(e.s.c)+":"+(e.e.cRel?"":"$")+ht(e.e.c);}}if(e.s.c==0&&!e.s.cRel){if(e.e.c==(r.biff>=12?16383:255)&&!e.e.cRel){return(e.s.rRel?"":"$")+lt(e.s.r)+":"+(e.e.rRel?"":"$")+lt(e.e.r);}}return at(e.s,r.biff)+":"+at(e.e,r.biff);}var it={};var st=function st(e,r){var t;if(typeof r!=="undefined")t=r;else if(true){try{t=undefined;}catch(a){t=null;}}e.rc4=function(e,r){var t=new Array(256);var a=0,n=0,i=0,s=0;for(n=0;n!=256;++n){t[n]=n;}for(n=0;n!=256;++n){i=i+t[n]+e[n%e.length].charCodeAt(0)&255;s=t[n];t[n]=t[i];t[i]=s;}n=i=0;var f=_(r.length);for(a=0;a!=r.length;++a){n=n+1&255;i=(i+t[n])%256;s=t[n];t[n]=t[i];t[i]=s;f[a]=r[a]^t[t[n]+t[i]&255];}return f;};e.md5=function(e){if(!t)throw new Error("Unsupported crypto");return t.createHash("md5").update(e).digest("hex");};};st(it,typeof crypto!=="undefined"?crypto:undefined);function ft(e){return parseInt(ct(e),10)-1;}function lt(e){return""+(e+1);}function ot(e){return e.replace(/([A-Z]|^)(\d+)$/,"$1$$$2");}function ct(e){return e.replace(/\$(\d+)$/,"$1");}function ut(e){var r=vt(e),t=0,a=0;for(;a!==r.length;++a){t=26*t+r.charCodeAt(a)-64;}return t-1;}function ht(e){if(e<0)throw new Error("invalid column "+e);var r="";for(++e;e;e=Math.floor((e-1)/26)){r=String.fromCharCode((e-1)%26+65)+r;}return r;}function dt(e){return e.replace(/^([A-Z])/,"$$$1");}function vt(e){return e.replace(/^\$([A-Z])/,"$1");}function pt(e){return e.replace(/(\$?[A-Z]*)(\$?\d*)/,"$1,$2").split(",");}function mt(e){var r=0,t=0;for(var a=0;a<e.length;++a){var n=e.charCodeAt(a);if(n>=48&&n<=57)r=10*r+(n-48);else if(n>=65&&n<=90)t=26*t+(n-64);}return{c:t-1,r:r-1};}function bt(e){var r=e.c+1;var t="";for(;r;r=(r-1)/26|0){t=String.fromCharCode((r-1)%26+65)+t;}return t+(e.r+1);}function gt(e){var r=e.indexOf(":");if(r==-1)return{s:mt(e),e:mt(e)};return{s:mt(e.slice(0,r)),e:mt(e.slice(r+1))};}function wt(e,r){if(typeof r==="undefined"||typeof r==="number"){return wt(e.s,e.e);}if(typeof e!=="string")e=bt(e);if(typeof r!=="string")r=bt(r);return e==r?e:e+":"+r;}function kt(e){var r={s:{c:0,r:0},e:{c:0,r:0}};var t=0,a=0,n=0;var i=e.length;for(t=0;a<i;++a){if((n=e.charCodeAt(a)-64)<1||n>26)break;t=26*t+n;}r.s.c=--t;for(t=0;a<i;++a){if((n=e.charCodeAt(a)-48)<0||n>9)break;t=10*t+n;}r.s.r=--t;if(a===i||e.charCodeAt(++a)===58){r.e.c=r.s.c;r.e.r=r.s.r;return r;}for(t=0;a!=i;++a){if((n=e.charCodeAt(a)-64)<1||n>26)break;t=26*t+n;}r.e.c=--t;for(t=0;a!=i;++a){if((n=e.charCodeAt(a)-48)<0||n>9)break;t=10*t+n;}r.e.r=--t;return r;}function Et(e,r){var t=e.t=="d"&&r instanceof Date;if(e.z!=null)try{return e.w=O.format(e.z,t?ee(r):r);}catch(a){}try{return e.w=O.format((e.XF||{}).numFmtId||(t?14:0),t?ee(r):r);}catch(a){return""+r;}}function St(e,r,t){if(e==null||e.t==null||e.t=="z")return"";if(e.w!==undefined)return e.w;if(e.t=="d"&&!e.z&&t&&t.dateNF)e.z=t.dateNF;if(e.t=="e")return Aa[e.v]||e.v;if(r==undefined)return Et(e,e.v);return Et(e,r);}function _t(e,r){var t=r&&r.sheet?r.sheet:"Sheet1";var a={};a[t]=e;return{SheetNames:[t],Sheets:a};}function Ct(e,r,t){var a=t||{};var n=e?Array.isArray(e):a.dense;if(m!=null&&n==null)n=m;var i=e||(n?[]:{});var s=0,f=0;if(i&&a.origin!=null){if(typeof a.origin=="number")s=a.origin;else{var l=typeof a.origin=="string"?mt(a.origin):a.origin;s=l.r;f=l.c;}if(!i["!ref"])i["!ref"]="A1:A1";}var o={s:{c:1e7,r:1e7},e:{c:0,r:0}};if(i["!ref"]){var c=kt(i["!ref"]);o.s.c=c.s.c;o.s.r=c.s.r;o.e.c=Math.max(o.e.c,c.e.c);o.e.r=Math.max(o.e.r,c.e.r);if(s==-1)o.e.r=s=c.e.r+1;}for(var u=0;u!=r.length;++u){if(!r[u])continue;if(!Array.isArray(r[u]))throw new Error("aoa_to_sheet expects an array of arrays");for(var h=0;h!=r[u].length;++h){if(typeof r[u][h]==="undefined")continue;var d={v:r[u][h]};var v=s+u,p=f+h;if(o.s.r>v)o.s.r=v;if(o.s.c>p)o.s.c=p;if(o.e.r<v)o.e.r=v;if(o.e.c<p)o.e.c=p;if(r[u][h]&&_typeof(r[u][h])==="object"&&!Array.isArray(r[u][h])&&!(r[u][h]instanceof Date))d=r[u][h];else{if(Array.isArray(d.v)){d.f=r[u][h][1];d.v=d.v[0];}if(d.v===null){if(d.f)d.t="n";else if(a.nullError){d.t="e";d.v=0;}else if(!a.sheetStubs)continue;else d.t="z";}else if(typeof d.v==="number")d.t="n";else if(typeof d.v==="boolean")d.t="b";else if(d.v instanceof Date){d.z=a.dateNF||O._table[14];if(a.cellDates){d.t="d";d.w=O.format(d.z,ee(d.v));}else{d.t="n";d.v=ee(d.v);d.w=O.format(d.z,d.v);}}else d.t="s";}if(n){if(!i[v])i[v]=[];if(i[v][p]&&i[v][p].z)d.z=i[v][p].z;i[v][p]=d;}else{var b=bt({c:p,r:v});if(i[b]&&i[b].z)d.z=i[b].z;i[b]=d;}}}if(o.s.c<1e7)i["!ref"]=wt(o);return i;}function Bt(e,r){return Ct(null,e,r);}function Tt(e,r){if(!r)r=Jr(4);r._W(4,e);return r;}function yt(e){var r=e._R(4);return r===0?"":e._R(r,"dbcs");}function xt(e,r){var t=false;if(r==null){t=true;r=Jr(4+2*e.length);}r._W(4,e.length);if(e.length>0)r._W(0,e,"dbcs");return t?r.slice(0,r.l):r;}function At(e){return{ich:e._R(2),ifnt:e._R(2)};}function It(e,r){if(!r)r=Jr(4);r._W(2,e.ich||0);r._W(2,e.ifnt||0);return r;}function Rt(e,r){var t=e.l;var a=e._R(1);var n=yt(e);var i=[];var s={t:n,h:n};if((a&1)!==0){var f=e._R(4);for(var l=0;l!=f;++l){i.push(At(e));}s.r=i;}else s.r=[{ich:0,ifnt:0}];e.l=t+r;return s;}function Ft(e,r){var t=false;if(r==null){t=true;r=Jr(15+4*e.t.length);}r._W(1,0);xt(e.t,r);return t?r.slice(0,r.l):r;}var Ot=Rt;function Dt(e,r){var t=false;if(r==null){t=true;r=Jr(23+4*e.t.length);}r._W(1,1);xt(e.t,r);r._W(4,1);It({ich:0,ifnt:0},r);return t?r.slice(0,r.l):r;}function Pt(e){var r=e._R(4);var t=e._R(2);t+=e._R(1)<<16;e.l++;return{c:r,iStyleRef:t};}function Nt(e,r){if(r==null)r=Jr(8);r._W(-4,e.c);r._W(3,e.iStyleRef||e.s);r._W(1,0);return r;}function Lt(e){var r=e._R(2);r+=e._R(1)<<16;e.l++;return{c:-1,iStyleRef:r};}function Mt(e,r){if(r==null)r=Jr(4);r._W(3,e.iStyleRef||e.s);r._W(1,0);return r;}var Ut=yt;var zt=xt;function Ht(e){var r=e._R(4);return r===0||r===4294967295?"":e._R(r,"dbcs");}function Wt(e,r){var t=false;if(r==null){t=true;r=Jr(127);}r._W(4,e.length>0?e.length:4294967295);if(e.length>0)r._W(0,e,"dbcs");return t?r.slice(0,r.l):r;}var Vt=yt;var Xt=Ht;var Gt=Wt;function jt(e){var r=e.slice(e.l,e.l+4);var t=r[0]&1,a=r[0]&2;e.l+=4;r[0]&=252;var n=a===0?Dr([0,0,0,0,r[0],r[1],r[2],r[3]],0):Hr(r,0)>>2;return t?n/100:n;}function Kt(e,r){if(r==null)r=Jr(4);var t=0,a=0,n=e*100;if(e==(e|0)&&e>=-(1<<29)&&e<1<<29){a=1;}else if(n==(n|0)&&n>=-(1<<29)&&n<1<<29){a=1;t=1;}if(a)r._W(-4,((t?n:e)<<2)+(t+2));else throw new Error("unsupported RkNumber "+e);}function $t(e){var r={s:{},e:{}};r.s.r=e._R(4);r.e.r=e._R(4);r.s.c=e._R(4);r.e.c=e._R(4);return r;}function Yt(e,r){if(!r)r=Jr(16);r._W(4,e.s.r);r._W(4,e.e.r);r._W(4,e.s.c);r._W(4,e.e.c);return r;}var Zt=$t;var Jt=Yt;function Qt(e){if(e.length-e.l<8)throw"XLS Xnum Buffer underflow";return e._R(8,"f");}function qt(e,r){return(r||Jr(8))._W(8,e,"f");}function ea(e){var r={};var t=e._R(1);var a=t>>>1;var n=e._R(1);var i=e._R(2,"i");var s=e._R(1);var f=e._R(1);var l=e._R(1);e.l++;switch(a){case 0:r.auto=1;break;case 1:r.index=n;var o=xa[n];if(o)r.rgb=cl(o);break;case 2:r.rgb=cl([s,f,l]);break;case 3:r.theme=n;break;}if(i!=0)r.tint=i>0?i/32767:i/32768;return r;}function ra(e,r){if(!r)r=Jr(8);if(!e||e.auto){r._W(4,0);r._W(4,0);return r;}if(e.index!=null){r._W(1,2);r._W(1,e.index);}else if(e.theme!=null){r._W(1,6);r._W(1,e.theme);}else{r._W(1,5);r._W(1,0);}var t=e.tint||0;if(t>0)t*=32767;else if(t<0)t*=32768;r._W(2,t);if(!e.rgb||e.theme!=null){r._W(2,0);r._W(1,0);r._W(1,0);}else{var a=e.rgb||"FFFFFF";if(typeof a=="number")a=("000000"+a.toString(16)).slice(-6);r._W(1,parseInt(a.slice(0,2),16));r._W(1,parseInt(a.slice(2,4),16));r._W(1,parseInt(a.slice(4,6),16));r._W(1,255);}return r;}function ta(e){var r=e._R(1);e.l++;var t={fBold:r&1,fItalic:r&2,fUnderline:r&4,fStrikeout:r&8,fOutline:r&16,fShadow:r&32,fCondense:r&64,fExtend:r&128};return t;}function aa(e,r){if(!r)r=Jr(2);var t=(e.italic?2:0)|(e.strike?8:0)|(e.outline?16:0)|(e.shadow?32:0)|(e.condense?64:0)|(e.extend?128:0);r._W(1,t);r._W(1,0);return r;}function na(e,r){var t={2:"BITMAP",3:"METAFILEPICT",8:"DIB",14:"ENHMETAFILE"};var a=e._R(4);switch(a){case 0:return"";case 4294967295:;case 4294967294:return t[e._R(4)]||"";}if(a>400)throw new Error("Unsupported Clipboard: "+a.toString(16));e.l-=4;return e._R(0,r==1?"lpstr":"lpwstr");}function ia(e){return na(e,1);}function sa(e){return na(e,2);}var fa=2;var la=3;var oa=11;var ca=12;var ua=19;var ha=30;var da=64;var va=65;var pa=71;var ma=4096;var ba=80;var ga=81;var wa=[ba,ga];var ka={1:{n:"CodePage",t:fa},2:{n:"Category",t:ba},3:{n:"PresentationFormat",t:ba},4:{n:"ByteCount",t:la},5:{n:"LineCount",t:la},6:{n:"ParagraphCount",t:la},7:{n:"SlideCount",t:la},8:{n:"NoteCount",t:la},9:{n:"HiddenCount",t:la},10:{n:"MultimediaClipCount",t:la},11:{n:"ScaleCrop",t:oa},12:{n:"HeadingPairs",t:ma|ca},13:{n:"TitlesOfParts",t:ma|ha},14:{n:"Manager",t:ba},15:{n:"Company",t:ba},16:{n:"LinksUpToDate",t:oa},17:{n:"CharacterCount",t:la},19:{n:"SharedDoc",t:oa},22:{n:"HyperlinksChanged",t:oa},23:{n:"AppVersion",t:la,p:"version"},24:{n:"DigSig",t:va},26:{n:"ContentType",t:ba},27:{n:"ContentStatus",t:ba},28:{n:"Language",t:ba},29:{n:"Version",t:ba},255:{},2147483648:{n:"Locale",t:ua},2147483651:{n:"Behavior",t:ua},1919054434:{}};var Ea={1:{n:"CodePage",t:fa},2:{n:"Title",t:ba},3:{n:"Subject",t:ba},4:{n:"Author",t:ba},5:{n:"Keywords",t:ba},6:{n:"Comments",t:ba},7:{n:"Template",t:ba},8:{n:"LastAuthor",t:ba},9:{n:"RevNumber",t:ba},10:{n:"EditTime",t:da},11:{n:"LastPrinted",t:da},12:{n:"CreatedDate",t:da},13:{n:"ModifiedDate",t:da},14:{n:"PageCount",t:la},15:{n:"WordCount",t:la},16:{n:"CharCount",t:la},17:{n:"Thumbnail",t:pa},18:{n:"Application",t:ba},19:{n:"DocSecurity",t:la},255:{},2147483648:{n:"Locale",t:ua},2147483651:{n:"Behavior",t:ua},1919054434:{}};var Sa=Y(ka,"n");var _a=Y(Ea,"n");var Ca={1:"US",2:"CA",3:"",7:"RU",20:"EG",30:"GR",31:"NL",32:"BE",33:"FR",34:"ES",36:"HU",39:"IT",41:"CH",43:"AT",44:"GB",45:"DK",46:"SE",47:"NO",48:"PL",49:"DE",52:"MX",55:"BR",61:"AU",64:"NZ",66:"TH",81:"JP",82:"KR",84:"VN",86:"CN",90:"TR",105:"JS",213:"DZ",216:"MA",218:"LY",351:"PT",354:"IS",358:"FI",420:"CZ",886:"TW",961:"LB",962:"JO",963:"SY",964:"IQ",965:"KW",966:"SA",971:"AE",972:"IL",974:"QA",981:"IR",65535:"US"};var Ba=[null,"solid","mediumGray","darkGray","lightGray","darkHorizontal","darkVertical","darkDown","darkUp","darkGrid","darkTrellis","lightHorizontal","lightVertical","lightDown","lightUp","lightGrid","lightTrellis","gray125","gray0625"];function Ta(e){return e.map(function(e){return[e>>16&255,e>>8&255,e&255];});}var ya=Ta([0,16777215,16711680,65280,255,16776960,16711935,65535,0,16777215,16711680,65280,255,16776960,16711935,65535,8388608,32768,128,8421376,8388736,32896,12632256,8421504,10066431,10040166,16777164,13434879,6684774,16744576,26316,13421823,128,16711935,16776960,65535,8388736,8388608,32896,255,52479,13434879,13434828,16777113,10079487,16751052,13408767,16764057,3368703,3394764,10079232,16763904,16750848,16737792,6710937,9868950,13158,3381606,13056,3355392,10040064,10040166,3355545,3355443,16777215,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]);var xa=ce(ya);var Aa={0:"#NULL!",7:"#DIV/0!",15:"#VALUE!",23:"#REF!",29:"#NAME?",36:"#NUM!",42:"#N/A",43:"#GETTING_DATA",255:"#WTF?"};var Ia=J(Aa);var Ra={"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml":"workbooks","application/vnd.ms-excel.binIndexWs":"TODO","application/vnd.ms-excel.intlmacrosheet":"TODO","application/vnd.ms-excel.binIndexMs":"TODO","application/vnd.openxmlformats-package.core-properties+xml":"coreprops","application/vnd.openxmlformats-officedocument.custom-properties+xml":"custprops","application/vnd.openxmlformats-officedocument.extended-properties+xml":"extprops","application/vnd.openxmlformats-officedocument.customXmlProperties+xml":"TODO","application/vnd.openxmlformats-officedocument.spreadsheetml.customProperty":"TODO","application/vnd.ms-excel.pivotTable":"TODO","application/vnd.openxmlformats-officedocument.spreadsheetml.pivotTable+xml":"TODO","application/vnd.openxmlformats-officedocument.drawingml.chart+xml":"TODO","application/vnd.ms-office.chartcolorstyle+xml":"TODO","application/vnd.ms-office.chartstyle+xml":"TODO","application/vnd.ms-office.chartex+xml":"TODO","application/vnd.ms-excel.calcChain":"calcchains","application/vnd.openxmlformats-officedocument.spreadsheetml.calcChain+xml":"calcchains","application/vnd.openxmlformats-officedocument.spreadsheetml.printerSettings":"TODO","application/vnd.ms-office.activeX":"TODO","application/vnd.ms-office.activeX+xml":"TODO","application/vnd.ms-excel.attachedToolbars":"TODO","application/vnd.ms-excel.connections":"TODO","application/vnd.openxmlformats-officedocument.spreadsheetml.connections+xml":"TODO","application/vnd.ms-excel.externalLink":"links","application/vnd.openxmlformats-officedocument.spreadsheetml.externalLink+xml":"links","application/vnd.ms-excel.sheetMetadata":"TODO","application/vnd.openxmlformats-officedocument.spreadsheetml.sheetMetadata+xml":"TODO","application/vnd.ms-excel.pivotCacheDefinition":"TODO","application/vnd.ms-excel.pivotCacheRecords":"TODO","application/vnd.openxmlformats-officedocument.spreadsheetml.pivotCacheDefinition+xml":"TODO","application/vnd.openxmlformats-officedocument.spreadsheetml.pivotCacheRecords+xml":"TODO","application/vnd.ms-excel.queryTable":"TODO","application/vnd.openxmlformats-officedocument.spreadsheetml.queryTable+xml":"TODO","application/vnd.ms-excel.userNames":"TODO","application/vnd.ms-excel.revisionHeaders":"TODO","application/vnd.ms-excel.revisionLog":"TODO","application/vnd.openxmlformats-officedocument.spreadsheetml.revisionHeaders+xml":"TODO","application/vnd.openxmlformats-officedocument.spreadsheetml.revisionLog+xml":"TODO","application/vnd.openxmlformats-officedocument.spreadsheetml.userNames+xml":"TODO","application/vnd.ms-excel.tableSingleCells":"TODO","application/vnd.openxmlformats-officedocument.spreadsheetml.tableSingleCells+xml":"TODO","application/vnd.ms-excel.slicer":"TODO","application/vnd.ms-excel.slicerCache":"TODO","application/vnd.ms-excel.slicer+xml":"TODO","application/vnd.ms-excel.slicerCache+xml":"TODO","application/vnd.ms-excel.wsSortMap":"TODO","application/vnd.ms-excel.table":"TODO","application/vnd.openxmlformats-officedocument.spreadsheetml.table+xml":"TODO","application/vnd.openxmlformats-officedocument.theme+xml":"themes","application/vnd.openxmlformats-officedocument.themeOverride+xml":"TODO","application/vnd.ms-excel.Timeline+xml":"TODO","application/vnd.ms-excel.TimelineCache+xml":"TODO","application/vnd.ms-office.vbaProject":"vba","application/vnd.ms-office.vbaProjectSignature":"vba","application/vnd.ms-office.volatileDependencies":"TODO","application/vnd.openxmlformats-officedocument.spreadsheetml.volatileDependencies+xml":"TODO","application/vnd.ms-excel.controlproperties+xml":"TODO","application/vnd.openxmlformats-officedocument.model+data":"TODO","application/vnd.ms-excel.Survey+xml":"TODO","application/vnd.openxmlformats-officedocument.drawing+xml":"drawings","application/vnd.openxmlformats-officedocument.drawingml.chartshapes+xml":"TODO","application/vnd.openxmlformats-officedocument.drawingml.diagramColors+xml":"TODO","application/vnd.openxmlformats-officedocument.drawingml.diagramData+xml":"TODO","application/vnd.openxmlformats-officedocument.drawingml.diagramLayout+xml":"TODO","application/vnd.openxmlformats-officedocument.drawingml.diagramStyle+xml":"TODO","application/vnd.openxmlformats-officedocument.vmlDrawing":"TODO","application/vnd.openxmlformats-package.relationships+xml":"rels","application/vnd.openxmlformats-officedocument.oleObject":"TODO","image/png":"TODO",sheet:"js"};var Fa=function(){var e={workbooks:{xlsx:"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml",xlsm:"application/vnd.ms-excel.sheet.macroEnabled.main+xml",xlsb:"application/vnd.ms-excel.sheet.binary.macroEnabled.main",xlam:"application/vnd.ms-excel.addin.macroEnabled.main+xml",xltx:"application/vnd.openxmlformats-officedocument.spreadsheetml.template.main+xml"},strs:{xlsx:"application/vnd.openxmlformats-officedocument.spreadsheetml.sharedStrings+xml",xlsb:"application/vnd.ms-excel.sharedStrings"},comments:{xlsx:"application/vnd.openxmlformats-officedocument.spreadsheetml.comments+xml",xlsb:"application/vnd.ms-excel.comments"},sheets:{xlsx:"application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml",xlsb:"application/vnd.ms-excel.worksheet"},charts:{xlsx:"application/vnd.openxmlformats-officedocument.spreadsheetml.chartsheet+xml",xlsb:"application/vnd.ms-excel.chartsheet"},dialogs:{xlsx:"application/vnd.openxmlformats-officedocument.spreadsheetml.dialogsheet+xml",xlsb:"application/vnd.ms-excel.dialogsheet"},macros:{xlsx:"application/vnd.ms-excel.macrosheet+xml",xlsb:"application/vnd.ms-excel.macrosheet"},styles:{xlsx:"application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml",xlsb:"application/vnd.ms-excel.styles"}};K(e).forEach(function(r){["xlsm","xlam"].forEach(function(t){if(!e[r][t])e[r][t]=e[r].xlsx;});});K(e).forEach(function(r){K(e[r]).forEach(function(t){Ra[e[r][t]]=r;});});return e;}();var Oa=Q(Ra);hr.CT="http://schemas.openxmlformats.org/package/2006/content-types";function Da(){return{workbooks:[],sheets:[],charts:[],dialogs:[],macros:[],rels:[],strs:[],comments:[],links:[],coreprops:[],extprops:[],custprops:[],themes:[],styles:[],calcchains:[],vba:[],drawings:[],TODO:[],xmlns:""};}function Pa(e){var r=Da();if(!e||!e.match)return r;var t={};(e.match(Re)||[]).forEach(function(e){var a=De(e);switch(a[0].replace(Fe,"<")){case"<?xml":break;case"<Types":r.xmlns=a["xmlns"+(a[0].match(/<(\w+):/)||["",""])[1]];break;case"<Default":t[a.Extension]=a.ContentType;break;case"<Override":if(r[Ra[a.ContentType]]!==undefined)r[Ra[a.ContentType]].push(a.PartName);break;}});if(r.xmlns!==hr.CT)throw new Error("Unknown Namespace: "+r.xmlns);r.calcchain=r.calcchains.length>0?r.calcchains[0]:"";r.sst=r.strs.length>0?r.strs[0]:"";r.style=r.styles.length>0?r.styles[0]:"";r.defaults=t;delete r.calcchains;return r;}var Na=or("Types",null,{xmlns:hr.CT,"xmlns:xsd":hr.xsd,"xmlns:xsi":hr.xsi});var La=[["xml","application/xml"],["bin","application/vnd.ms-excel.sheet.binary.macroEnabled.main"],["vml","application/vnd.openxmlformats-officedocument.vmlDrawing"],["data","application/vnd.openxmlformats-officedocument.model+data"],["bmp","image/bmp"],["png","image/png"],["gif","image/gif"],["emf","image/x-emf"],["wmf","image/x-wmf"],["jpg","image/jpeg"],["jpeg","image/jpeg"],["tif","image/tiff"],["tiff","image/tiff"],["pdf","application/pdf"],["rels",Oa.rels[0]]].map(function(e){return or("Default",null,{Extension:e[0],ContentType:e[1]});});function Ma(e,r){var t=[],a;t[t.length]=Ae;t[t.length]=Na;t=t.concat(La);var n=function n(_n2){if(e[_n2]&&e[_n2].length>0){a=e[_n2][0];t[t.length]=or("Override",null,{PartName:(a[0]=="/"?"":"/")+a,ContentType:Fa[_n2][r.bookType||"xlsx"]});}};var i=function i(a){(e[a]||[]).forEach(function(e){t[t.length]=or("Override",null,{PartName:(e[0]=="/"?"":"/")+e,ContentType:Fa[a][r.bookType||"xlsx"]});});};var s=function s(r){(e[r]||[]).forEach(function(e){t[t.length]=or("Override",null,{PartName:(e[0]=="/"?"":"/")+e,ContentType:Oa[r][0]});});};n("workbooks");i("sheets");i("charts");s("themes");["strs","styles"].forEach(n);["coreprops","extprops","custprops"].forEach(s);s("vba");s("comments");s("drawings");if(t.length>2){t[t.length]="</Types>";t[1]=t[1].replace("/>",">");}return t.join("");}var Ua={WB:"http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument",SHEET:"http://sheetjs.openxmlformats.org/officeDocument/2006/relationships/officeDocument",HLINK:"http://schemas.openxmlformats.org/officeDocument/2006/relationships/hyperlink",VML:"http://schemas.openxmlformats.org/officeDocument/2006/relationships/vmlDrawing",XPATH:"http://schemas.openxmlformats.org/officeDocument/2006/relationships/externalLinkPath",XMISS:"http://schemas.microsoft.com/office/2006/relationships/xlExternalLinkPath/xlPathMissing",XLINK:"http://schemas.openxmlformats.org/officeDocument/2006/relationships/externalLink",CXML:"http://schemas.openxmlformats.org/officeDocument/2006/relationships/customXml",CXMLP:"http://schemas.openxmlformats.org/officeDocument/2006/relationships/customXmlProps",VBA:"http://schemas.microsoft.com/office/2006/relationships/vbaProject"};function za(e){var r=e.lastIndexOf("/");return e.slice(0,r+1)+"_rels/"+e.slice(r+1)+".rels";}function Ha(e,r){var t={"!id":{}};if(!e)return t;if(r.charAt(0)!=="/"){r="/"+r;}var a={};(e.match(Re)||[]).forEach(function(e){var n=De(e);if(n[0]==="<Relationship"){var i={};i.Type=n.Type;i.Target=n.Target;i.Id=n.Id;i.TargetMode=n.TargetMode;var s=n.TargetMode==="External"?n.Target:xe(n.Target,r);t[s]=i;a[n.Id]=i;}});t["!id"]=a;return t;}hr.RELS="http://schemas.openxmlformats.org/package/2006/relationships";var Wa=or("Relationships",null,{xmlns:hr.RELS});function Va(e){var r=[Ae,Wa];K(e["!id"]).forEach(function(t){r[r.length]=or("Relationship",null,e["!id"][t]);});if(r.length>2){r[r.length]="</Relationships>";r[1]=r[1].replace("/>",">");}return r.join("");}var Xa=[Ua.HLINK,Ua.XPATH,Ua.XMISS];function Ga(e,r,t,a,n,i){if(!n)n={};if(!e["!id"])e["!id"]={};if(r<0)for(r=1;e["!id"]["rId"+r];++r){}n.Id="rId"+r;n.Type=a;n.Target=t;if(i)n.TargetMode=i;else if(Xa.indexOf(n.Type)>-1)n.TargetMode="External";if(e["!id"][n.Id])throw new Error("Cannot rewrite rId "+r);e["!id"][n.Id]=n;e[("/"+n.Target).replace("//","/")]=n;return r;}var ja="application/vnd.oasis.opendocument.spreadsheet";function Ka(e,r){var t=Bp(e);var a;var n;while(a=Tp.exec(t)){switch(a[3]){case"manifest":break;case"file-entry":n=De(a[0],false);if(n.path=="/"&&n.type!==ja)throw new Error("This OpenDocument is not a spreadsheet");break;case"encryption-data":;case"algorithm":;case"start-key-generation":;case"key-derivation":throw new Error("Unsupported ODS Encryption");default:if(r&&r.WTF)throw a;}}}function $a(e){var r=[Ae];r.push('<manifest:manifest xmlns:manifest="urn:oasis:names:tc:opendocument:xmlns:manifest:1.0" manifest:version="1.2">\n');r.push('  <manifest:file-entry manifest:full-path="/" manifest:version="1.2" manifest:media-type="application/vnd.oasis.opendocument.spreadsheet"/>\n');for(var t=0;t<e.length;++t){r.push('  <manifest:file-entry manifest:full-path="'+e[t][0]+'" manifest:media-type="'+e[t][1]+'"/>\n');}r.push("</manifest:manifest>");return r.join("");}function Ya(e,r,t){return['  <rdf:Description rdf:about="'+e+'">\n','    <rdf:type rdf:resource="http://docs.oasis-open.org/ns/office/1.2/meta/'+(t||"odf")+"#"+r+'"/>\n',"  </rdf:Description>\n"].join("");}function Za(e,r){return['  <rdf:Description rdf:about="'+e+'">\n','    <ns0:hasPart xmlns:ns0="http://docs.oasis-open.org/ns/office/1.2/meta/pkg#" rdf:resource="'+r+'"/>\n',"  </rdf:Description>\n"].join("");}function Ja(e){var r=[Ae];r.push('<rdf:RDF xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#">\n');for(var t=0;t!=e.length;++t){r.push(Ya(e[t][0],e[t][1]));r.push(Za("",e[t][0]));}r.push(Ya("","Document","pkg"));r.push("</rdf:RDF>");return r.join("");}var Qa=function(){var r='<office:document-meta xmlns:office="urn:oasis:names:tc:opendocument:xmlns:office:1.0" xmlns:meta="urn:oasis:names:tc:opendocument:xmlns:meta:1.0" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:xlink="http://www.w3.org/1999/xlink" office:version="1.2"><office:meta><meta:generator>Sheet'+"JS "+e.version+"</meta:generator></office:meta></office:document-meta>";return function t(){return r;};}();var qa=[["cp:category","Category"],["cp:contentStatus","ContentStatus"],["cp:keywords","Keywords"],["cp:lastModifiedBy","LastAuthor"],["cp:lastPrinted","LastPrinted"],["cp:revision","RevNumber"],["cp:version","Version"],["dc:creator","Author"],["dc:description","Comments"],["dc:identifier","Identifier"],["dc:language","Language"],["dc:subject","Subject"],["dc:title","Title"],["dcterms:created","CreatedDate","date"],["dcterms:modified","ModifiedDate","date"]];hr.CORE_PROPS="http://schemas.openxmlformats.org/package/2006/metadata/core-properties";Ua.CORE_PROPS="http://schemas.openxmlformats.org/package/2006/relationships/metadata/core-properties";var en=function(){var e=new Array(qa.length);for(var r=0;r<qa.length;++r){var t=qa[r];var a="(?:"+t[0].slice(0,t[0].indexOf(":"))+":)"+t[0].slice(t[0].indexOf(":")+1);e[r]=new RegExp("<"+a+"[^>]*>([\\s\\S]*?)</"+a+">");}return e;}();function rn(e){var r={};e=Ye(e);for(var t=0;t<qa.length;++t){var a=qa[t],n=e.match(en[t]);if(n!=null&&n.length>0)r[a[1]]=Me(n[1]);if(a[2]==="date"&&r[a[1]])r[a[1]]=le(r[a[1]]);}return r;}var tn=or("cp:coreProperties",null,{"xmlns:cp":hr.CORE_PROPS,"xmlns:dc":hr.dc,"xmlns:dcterms":hr.dcterms,"xmlns:dcmitype":hr.dcmitype,"xmlns:xsi":hr.xsi});function an(e,r,t,a,n){if(n[e]!=null||r==null||r==="")return;n[e]=r;r=He(r);a[a.length]=t?or(e,r,t):fr(e,r);}function nn(e,r){var t=r||{};var a=[Ae,tn],n={};if(!e&&!t.Props)return a.join("");if(e){if(e.CreatedDate!=null)an("dcterms:created",typeof e.CreatedDate==="string"?e.CreatedDate:cr(e.CreatedDate,t.WTF),{"xsi:type":"dcterms:W3CDTF"},a,n);if(e.ModifiedDate!=null)an("dcterms:modified",typeof e.ModifiedDate==="string"?e.ModifiedDate:cr(e.ModifiedDate,t.WTF),{"xsi:type":"dcterms:W3CDTF"},a,n);}for(var i=0;i!=qa.length;++i){var s=qa[i];var f=t.Props&&t.Props[s[1]]!=null?t.Props[s[1]]:e?e[s[1]]:null;if(f===true)f="1";else if(f===false)f="0";else if(typeof f=="number")f=String(f);if(f!=null)an(s[0],f,null,a,n);}if(a.length>2){a[a.length]="</cp:coreProperties>";a[1]=a[1].replace("/>",">");}return a.join("");}var sn=[["Application","Application","string"],["AppVersion","AppVersion","string"],["Company","Company","string"],["DocSecurity","DocSecurity","string"],["Manager","Manager","string"],["HyperlinksChanged","HyperlinksChanged","bool"],["SharedDoc","SharedDoc","bool"],["LinksUpToDate","LinksUpToDate","bool"],["ScaleCrop","ScaleCrop","bool"],["HeadingPairs","HeadingPairs","raw"],["TitlesOfParts","TitlesOfParts","raw"]];hr.EXT_PROPS="http://schemas.openxmlformats.org/officeDocument/2006/extended-properties";Ua.EXT_PROPS="http://schemas.openxmlformats.org/officeDocument/2006/relationships/extended-properties";var fn=["Worksheets","SheetNames","NamedRanges","DefinedNames","Chartsheets","ChartNames"];function ln(e,r,t,a){var n=[];if(typeof e=="string")n=ir(e,a);else for(var i=0;i<e.length;++i){n=n.concat(e[i].map(function(e){return{v:e};}));}var s=typeof r=="string"?ir(r,a).map(function(e){return e.v;}):r;var f=0,l=0;if(s.length>0)for(var o=0;o!==n.length;o+=2){l=+n[o+1].v;switch(n[o].v){case"Worksheets":;case"工作表":;case"Листы":;case"أوراق العمل":;case"ワークシート":;case"גליונות עבודה":;case"Arbeitsblätter":;case"Çalışma Sayfaları":;case"Feuilles de calcul":;case"Fogli di lavoro":;case"Folhas de cálculo":;case"Planilhas":;case"Regneark":;case"Hojas de cálculo":;case"Werkbladen":t.Worksheets=l;t.SheetNames=s.slice(f,f+l);break;case"Named Ranges":;case"Rangos con nombre":;case"名前付き一覧":;case"Benannte Bereiche":;case"Navngivne områder":t.NamedRanges=l;t.DefinedNames=s.slice(f,f+l);break;case"Charts":;case"Diagramme":t.Chartsheets=l;t.ChartNames=s.slice(f,f+l);break;}f+=l;}}function on(e,r,t){var a={};if(!r)r={};e=Ye(e);sn.forEach(function(t){var n=(e.match(er(t[0]))||[])[1];switch(t[2]){case"string":if(n)r[t[1]]=Me(n);break;case"bool":r[t[1]]=n==="true";break;case"raw":var i=e.match(new RegExp("<"+t[0]+"[^>]*>([\\s\\S]*?)</"+t[0]+">"));if(i&&i.length>0)a[t[1]]=i[1];break;}});if(a.HeadingPairs&&a.TitlesOfParts)ln(a.HeadingPairs,a.TitlesOfParts,r,t);return r;}var cn=or("Properties",null,{xmlns:hr.EXT_PROPS,"xmlns:vt":hr.vt});function un(e){var r=[],t=or;if(!e)e={};e.Application="SheetJS";r[r.length]=Ae;r[r.length]=cn;sn.forEach(function(a){if(e[a[1]]===undefined)return;var n;switch(a[2]){case"string":n=He(String(e[a[1]]));break;case"bool":n=e[a[1]]?"true":"false";break;}if(n!==undefined)r[r.length]=t(a[0],n);});r[r.length]=t("HeadingPairs",t("vt:vector",t("vt:variant","<vt:lpstr>Worksheets</vt:lpstr>")+t("vt:variant",t("vt:i4",String(e.Worksheets))),{size:2,baseType:"variant"}));r[r.length]=t("TitlesOfParts",t("vt:vector",e.SheetNames.map(function(e){return"<vt:lpstr>"+He(e)+"</vt:lpstr>";}).join(""),{size:e.Worksheets,baseType:"lpstr"}));if(r.length>2){r[r.length]="</Properties>";r[1]=r[1].replace("/>",">");}return r.join("");}hr.CUST_PROPS="http://schemas.openxmlformats.org/officeDocument/2006/custom-properties";Ua.CUST_PROPS="http://schemas.openxmlformats.org/officeDocument/2006/relationships/custom-properties";var hn=/<[^>]+>[^<]*/g;function dn(e,r){var t={},a="";var n=e.match(hn);if(n)for(var i=0;i!=n.length;++i){var s=n[i],f=De(s);switch(f[0]){case"<?xml":break;case"<Properties":break;case"<property":a=Me(f.name);break;case"</property>":a=null;break;default:if(s.indexOf("<vt:")===0){var l=s.split(">");var o=l[0].slice(4),c=l[1];switch(o){case"lpstr":;case"bstr":;case"lpwstr":t[a]=Me(c);break;case"bool":t[a]=$e(c);break;case"i1":;case"i2":;case"i4":;case"i8":;case"int":;case"uint":t[a]=parseInt(c,10);break;case"r4":;case"r8":;case"decimal":t[a]=parseFloat(c);break;case"filetime":;case"date":t[a]=le(c);break;case"cy":;case"error":t[a]=Me(c);break;default:if(o.slice(-1)=="/")break;if(r.WTF&&typeof console!=="undefined")console.warn("Unexpected",s,o,l);}}else if(s.slice(0,2)==="</"){}else if(r.WTF)throw new Error(s);}}return t;}var vn=or("Properties",null,{xmlns:hr.CUST_PROPS,"xmlns:vt":hr.vt});function pn(e){var r=[Ae,vn];if(!e)return r.join("");var t=1;K(e).forEach(function a(n){++t;r[r.length]=or("property",ur(e[n],true),{fmtid:"{D5CDD505-2E9C-101B-9397-08002B2CF9AE}",pid:t,name:He(n)});});if(r.length>2){r[r.length]="</Properties>";r[1]=r[1].replace("/>",">");}return r.join("");}var mn={Title:"Title",Subject:"Subject",Author:"Author",Keywords:"Keywords",Comments:"Description",LastAuthor:"LastAuthor",RevNumber:"Revision",Application:"AppName",LastPrinted:"LastPrinted",CreatedDate:"Created",ModifiedDate:"LastSaved",Category:"Category",Manager:"Manager",Company:"Company",AppVersion:"Version",ContentStatus:"ContentStatus",Identifier:"Identifier",Language:"Language"};var bn=Z(mn);function gn(e,r,t){r=bn[r]||r;e[r]=t;}function wn(e,r){var t=[];K(mn).map(function(e){for(var r=0;r<qa.length;++r){if(qa[r][1]==e)return qa[r];}for(r=0;r<sn.length;++r){if(sn[r][1]==e)return sn[r];}throw e;}).forEach(function(a){if(e[a[1]]==null)return;var n=r&&r.Props&&r.Props[a[1]]!=null?r.Props[a[1]]:e[a[1]];switch(a[2]){case"date":n=new Date(n).toISOString().replace(/\.\d*Z/,"Z");break;}if(typeof n=="number")n=String(n);else if(n===true||n===false){n=n?"1":"0";}else if(n instanceof Date)n=new Date(n).toISOString().replace(/\.\d*Z/,"");t.push(fr(mn[a[1]]||a[1],n));});return or("DocumentProperties",t.join(""),{xmlns:dr.o});}function kn(e,r){var t=["Worksheets","SheetNames"];var a="CustomDocumentProperties";var n=[];if(e)K(e).forEach(function(r){if(!Object.prototype.hasOwnProperty.call(e,r))return;for(var a=0;a<qa.length;++a){if(r==qa[a][1])return;}for(a=0;a<sn.length;++a){if(r==sn[a][1])return;}for(a=0;a<t.length;++a){if(r==t[a])return;}var i=e[r];var s="string";if(typeof i=="number"){s="float";i=String(i);}else if(i===true||i===false){s="boolean";i=i?"1":"0";}else i=String(i);n.push(or(We(r),i,{"dt:dt":s}));});if(r)K(r).forEach(function(t){if(!Object.prototype.hasOwnProperty.call(r,t))return;if(e&&Object.prototype.hasOwnProperty.call(e,t))return;var a=r[t];var i="string";if(typeof a=="number"){i="float";a=String(a);}else if(a===true||a===false){i="boolean";a=a?"1":"0";}else if(a instanceof Date){i="dateTime.tz";a=a.toISOString();}else a=String(a);n.push(or(We(t),a,{"dt:dt":i}));});return"<"+a+' xmlns="'+dr.o+'">'+n.join("")+"</"+a+">";}function En(e){var r=e._R(4),t=e._R(4);return new Date((t/1e7*Math.pow(2,32)+r/1e7-11644473600)*1e3).toISOString().replace(/\.000/,"");}function Sn(e){var r=typeof e=="string"?new Date(Date.parse(e)):e;var t=r.getTime()/1e3+11644473600;var a=t%Math.pow(2,32),n=(t-a)/Math.pow(2,32);a*=1e7;n*=1e7;var i=a/Math.pow(2,32)|0;if(i>0){a=a%Math.pow(2,32);n+=i;}var s=Jr(8);s._W(4,a);s._W(4,n);return s;}function _n(e,r,t){var a=e.l;var n=e._R(0,"lpstr-cp");if(t)while(e.l-a&3){++e.l;}return n;}function Cn(e,r,t){var a=e._R(0,"lpwstr");if(t)e.l+=4-(a.length+1&3)&3;return a;}function Bn(e,r,t){if(r===31)return Cn(e);return _n(e,r,t);}function Tn(e,r,t){return Bn(e,r,t===false?0:4);}function yn(e,r){if(!r)throw new Error("VtUnalignedString must have positive length");return Bn(e,r,0);}function xn(e){var r=e._R(4);var t=[];for(var a=0;a!=r;++a){var n=e.l;t[a]=e._R(0,"lpwstr").replace(R,"");if(e.l-n&2)e.l+=2;}return t;}function An(e){var r=e._R(4);var t=[];for(var a=0;a!=r;++a){t[a]=e._R(0,"lpstr-cp").replace(R,"");}return t;}function In(e){var r=e.l;var t=Pn(e,ga);if(e[e.l]==0&&e[e.l+1]==0&&e.l-r&2)e.l+=2;var a=Pn(e,la);return[t,a];}function Rn(e){var r=e._R(4);var t=[];for(var a=0;a<r/2;++a){t.push(In(e));}return t;}function Fn(e,r){var t=e._R(4);var a={};for(var n=0;n!=t;++n){var i=e._R(4);var s=e._R(4);a[i]=e._R(s,r===1200?"utf16le":"utf8").replace(R,"").replace(F,"!");if(r===1200&&s%2)e.l+=2;}if(e.l&3)e.l=e.l>>2+1<<2;return a;}function On(e){var r=e._R(4);var t=e.slice(e.l,e.l+r);e.l+=r;if((r&3)>0)e.l+=4-(r&3)&3;return t;}function Dn(e){var r={};r.Size=e._R(4);e.l+=r.Size+3-(r.Size-1)%4;return r;}function Pn(e,r,t){var a=e._R(2),n,i=t||{};e.l+=2;if(r!==ca)if(a!==r&&wa.indexOf(r)===-1&&!((r&65534)==4126&&(a&65534)==4126))throw new Error("Expected type "+r+" saw "+a);switch(r===ca?a:r){case 2:n=e._R(2,"i");if(!i.raw)e.l+=2;return n;case 3:n=e._R(4,"i");return n;case 11:return e._R(4)!==0;case 19:n=e._R(4);return n;case 30:return _n(e,a,4).replace(R,"");case 31:return Cn(e);case 64:return En(e);case 65:return On(e);case 71:return Dn(e);case 80:return Tn(e,a,!i.raw).replace(R,"");;case 81:return yn(e,a).replace(R,"");case 4108:return Rn(e);case 4126:;case 4127:return a==4127?xn(e):An(e);default:throw new Error("TypedPropertyValue unrecognized type "+r+" "+a);}}function Nn(e,r){var t=Jr(4),a=Jr(4);t._W(4,e==80?31:e);switch(e){case 3:a._W(-4,r);break;case 5:a=Jr(8);a._W(8,r,"f");break;case 11:a._W(4,r?1:0);break;case 64:a=Sn(r);break;case 31:;case 80:a=Jr(4+2*(r.length+1)+(r.length%2?0:2));a._W(4,r.length+1);a._W(0,r,"dbcs");while(a.l!=a.length){a._W(1,0);}break;default:throw new Error("TypedPropertyValue unrecognized type "+e+" "+r);}return I([t,a]);}function Ln(e,r){var t=e.l;var a=e._R(4);var n=e._R(4);var i=[],s=0;var f=0;var o=-1,c={};for(s=0;s!=n;++s){var u=e._R(4);var h=e._R(4);i[s]=[u,h+t];}i.sort(function(e,r){return e[1]-r[1];});var d={};for(s=0;s!=n;++s){if(e.l!==i[s][1]){var v=true;if(s>0&&r)switch(r[i[s-1][0]].t){case 2:if(e.l+2===i[s][1]){e.l+=2;v=false;}break;case 80:if(e.l<=i[s][1]){e.l=i[s][1];v=false;}break;case 4108:if(e.l<=i[s][1]){e.l=i[s][1];v=false;}break;}if((!r||s==0)&&e.l<=i[s][1]){v=false;e.l=i[s][1];}if(v)throw new Error("Read Error: Expected address "+i[s][1]+" at "+e.l+" :"+s);}if(r){var p=r[i[s][0]];d[p.n]=Pn(e,p.t,{raw:true});if(p.p==="version")d[p.n]=String(d[p.n]>>16)+"."+("0000"+String(d[p.n]&65535)).slice(-4);if(p.n=="CodePage")switch(d[p.n]){case 0:d[p.n]=1252;case 874:;case 932:;case 936:;case 949:;case 950:;case 1250:;case 1251:;case 1253:;case 1254:;case 1255:;case 1256:;case 1257:;case 1258:;case 1e4:;case 1200:;case 1201:;case 1252:;case 65e3:;case-536:;case 65001:;case-535:l(f=d[p.n]>>>0&65535);break;default:throw new Error("Unsupported CodePage: "+d[p.n]);}}else{if(i[s][0]===1){f=d.CodePage=Pn(e,fa);l(f);if(o!==-1){var m=e.l;e.l=i[o][1];c=Fn(e,f);e.l=m;}}else if(i[s][0]===0){if(f===0){o=s;e.l=i[s+1][1];continue;}c=Fn(e,f);}else{var b=c[i[s][0]];var g;switch(e[e.l]){case 65:e.l+=4;g=On(e);break;case 30:e.l+=4;g=Tn(e,e[e.l-4]).replace(/\u0000+$/,"");break;case 31:e.l+=4;g=Tn(e,e[e.l-4]).replace(/\u0000+$/,"");break;case 3:e.l+=4;g=e._R(4,"i");break;case 19:e.l+=4;g=e._R(4);break;case 5:e.l+=4;g=e._R(8,"f");break;case 11:e.l+=4;g=jn(e,4);break;case 64:e.l+=4;g=le(En(e));break;default:throw new Error("unparsed value: "+e[e.l]);}d[b]=g;}}}e.l=t+a;return d;}var Mn=["CodePage","Thumbnail","_PID_LINKBASE","_PID_HLINKS","SystemIdentifier","FMTID"].concat(fn);function Un(e){switch(_typeof(e)){case"boolean":return 11;case"number":return(e|0)==e?3:5;case"string":return 31;case"object":if(e instanceof Date)return 64;break;}return-1;}function zn(e,r,t){var a=Jr(8),n=[],i=[];var s=8,f=0;var l=Jr(8),o=Jr(8);l._W(4,2);l._W(4,1200);o._W(4,1);i.push(l);n.push(o);s+=8+l.length;if(!r){o=Jr(8);o._W(4,0);n.unshift(o);var c=[Jr(4)];c[0]._W(4,e.length);for(f=0;f<e.length;++f){var u=e[f][0];l=Jr(4+4+2*(u.length+1)+(u.length%2?0:2));l._W(4,f+2);l._W(4,u.length+1);l._W(0,u,"dbcs");while(l.l!=l.length){l._W(1,0);}c.push(l);}l=I(c);i.unshift(l);s+=8+l.length;}for(f=0;f<e.length;++f){if(r&&!r[e[f][0]])continue;if(Mn.indexOf(e[f][0])>-1)continue;if(e[f][1]==null)continue;var h=e[f][1],d=0;if(r){d=+r[e[f][0]];var v=t[d];if(v.p=="version"&&typeof h=="string"){var p=h.split(".");h=(+p[0]<<16)+(+p[1]||0);}l=Nn(v.t,h);}else{var m=Un(h);if(m==-1){m=31;h=String(h);}l=Nn(m,h);}i.push(l);o=Jr(8);o._W(4,!r?2+f:d);n.push(o);s+=8+l.length;}var b=8*(i.length+1);for(f=0;f<i.length;++f){n[f]._W(4,b);b+=i[f].length;}a._W(4,s);a._W(4,i.length);return I([a].concat(n).concat(i));}function Hn(e,r,t){var a=e.content;if(!a)return{};Yr(a,0);var n,i,s,f,l=0;a.chk("feff","Byte Order: ");a._R(2);var o=a._R(4);var c=a._R(16);if(c!==W.utils.consts.HEADER_CLSID&&c!==t)throw new Error("Bad PropertySet CLSID "+c);n=a._R(4);if(n!==1&&n!==2)throw new Error("Unrecognized #Sets: "+n);i=a._R(16);f=a._R(4);if(n===1&&f!==a.l)throw new Error("Length mismatch: "+f+" !== "+a.l);else if(n===2){s=a._R(16);l=a._R(4);}var u=Ln(a,r);var h={SystemIdentifier:o};for(var d in u){h[d]=u[d];}h.FMTID=i;if(n===1)return h;if(l-a.l==2)a.l+=2;if(a.l!==l)throw new Error("Length mismatch 2: "+a.l+" !== "+l);var v;try{v=Ln(a,null);}catch(p){}for(d in v){h[d]=v[d];}h.FMTID=[i,s];return h;}function Wn(e,r,t,a,n,i){var s=Jr(n?68:48);var f=[s];s._W(2,65534);s._W(2,0);s._W(4,842412599);s._W(16,W.utils.consts.HEADER_CLSID,"hex");s._W(4,n?2:1);s._W(16,r,"hex");s._W(4,n?68:48);var l=zn(e,t,a);f.push(l);if(n){var o=zn(n,null,null);s._W(16,i,"hex");s._W(4,68+l.length);f.push(o);}return I(f);}function Vn(e,r){e._R(r);return null;}function Xn(e,r){if(!r)r=Jr(e);for(var t=0;t<e;++t){r._W(1,0);}return r;}function Gn(e,r,t){var a=[],n=e.l+r;while(e.l<n){a.push(t(e,n-e.l));}if(n!==e.l)throw new Error("Slurp error");return a;}function jn(e,r){return e._R(r)===1;}function Kn(e,r){if(!r)r=Jr(2);r._W(2,+!!e);return r;}function $n(e){return e._R(2,"u");}function Yn(e,r){if(!r)r=Jr(2);r._W(2,e);return r;}function Zn(e,r){return Gn(e,r,$n);}function Jn(e){var r=e._R(1),t=e._R(1);return t===1?r:r===1;}function Qn(e,r,t){if(!t)t=Jr(2);t._W(1,r=="e"?+e:+!!e);t._W(1,r=="e"?1:0);return t;}function qn(e,t,a){var n=e._R(a&&a.biff>=12?2:1);var i="sbcs-cont";var s=r;if(a&&a.biff>=8)r=1200;if(!a||a.biff==8){var f=e._R(1);if(f){i="dbcs-cont";}}else if(a.biff==12){i="wstr";}if(a.biff>=2&&a.biff<=5)i="cpstr";var l=n?e._R(n,i):"";r=s;return l;}function ei(e){var t=r;r=1200;var a=e._R(2),n=e._R(1);var i=n&4,s=n&8;var f=1+(n&1);var l=0,o;var c={};if(s)l=e._R(2);if(i)o=e._R(4);var u=f==2?"dbcs-cont":"sbcs-cont";var h=a===0?"":e._R(a,u);if(s)e.l+=4*l;if(i)e.l+=o;c.t=h;if(!s){c.raw="<t>"+c.t+"</t>";c.r=c.t;}r=t;return c;}function ri(e){var r=e.t||"",t=1;var a=Jr(3+(t>1?2:0));a._W(2,r.length);a._W(1,(t>1?8:0)|1);if(t>1)a._W(2,t);var n=Jr(2*r.length);n._W(2*r.length,r,"utf16le");var i=[a,n];return I(i);}function ti(e,r,t){var a;if(t){if(t.biff>=2&&t.biff<=5)return e._R(r,"cpstr");if(t.biff>=12)return e._R(r,"dbcs-cont");}var n=e._R(1);if(n===0){a=e._R(r,"sbcs-cont");}else{a=e._R(r,"dbcs-cont");}return a;}function ai(e,r,t){var a=e._R(t&&t.biff==2?1:2);if(a===0){e.l++;return"";}return ti(e,a,t);}function ni(e,r,t){if(t.biff>5)return ai(e,r,t);var a=e._R(1);if(a===0){e.l++;return"";}return e._R(a,t.biff<=4||!e.lens?"cpstr":"sbcs-cont");}function ii(e,r,t){if(!t)t=Jr(3+2*e.length);t._W(2,e.length);t._W(1,1);t._W(31,e,"utf16le");return t;}function si(e){var r=e._R(1);e.l++;var t=e._R(2);e.l+=2;return[r,t];}function fi(e){var r=e._R(4),t=e.l;var a=false;if(r>24){e.l+=r-24;if(e._R(16)==="795881f43b1d7f48af2c825dc4852763")a=true;e.l=t;}var n=e._R((a?r-24:r)>>1,"utf16le").replace(R,"");if(a)e.l+=24;return n;}function li(e){var r=e._R(2);var t="";while(r-->0){t+="../";}var a=e._R(0,"lpstr-ansi");e.l+=2;if(e._R(2)!=57005)throw new Error("Bad FileMoniker");var n=e._R(4);if(n===0)return t+a.replace(/\\/g,"/");var i=e._R(4);if(e._R(2)!=3)throw new Error("Bad FileMoniker");var s=e._R(i>>1,"utf16le").replace(R,"");return t+s;}function oi(e,r){var t=e._R(16);r-=16;switch(t){case"e0c9ea79f9bace118c8200aa004ba90b":return fi(e,r);case"0303000000000000c000000000000046":return li(e,r);default:throw new Error("Unsupported Moniker "+t);}}function ci(e){var r=e._R(4);var t=r>0?e._R(r,"utf16le").replace(R,""):"";return t;}function ui(e,r){if(!r)r=Jr(6+e.length*2);r._W(4,1+e.length);for(var t=0;t<e.length;++t){r._W(2,e.charCodeAt(t));}r._W(2,0);return r;}function hi(e,r){var t=e.l+r;var a=e._R(4);if(a!==2)throw new Error("Unrecognized streamVersion: "+a);var n=e._R(2);e.l+=2;var i,s,f,l,o="",c,u;if(n&16)i=ci(e,t-e.l);if(n&128)s=ci(e,t-e.l);if((n&257)===257)f=ci(e,t-e.l);if((n&257)===1)l=oi(e,t-e.l);if(n&8)o=ci(e,t-e.l);if(n&32)c=e._R(16);if(n&64)u=En(e);e.l=t;var h=s||f||l||"";if(h&&o)h+="#"+o;if(!h)h="#"+o;if(n&2&&h.charAt(0)=="/"&&h.charAt(1)!="/")h="file://"+h;var d={Target:h};if(c)d.guid=c;if(u)d.time=u;if(i)d.Tooltip=i;return d;}function di(e){var r=Jr(512),t=0;var a=e.Target;if(a.slice(0,7)=="file://")a=a.slice(7);var n=a.indexOf("#");var i=n>-1?31:23;switch(a.charAt(0)){case"#":i=28;break;case".":i&=~2;break;}r._W(4,2);r._W(4,i);var s=[8,6815827,6619237,4849780,83];for(t=0;t<s.length;++t){r._W(4,s[t]);}if(i==28){a=a.slice(1);ui(a,r);}else if(i&2){s="e0 c9 ea 79 f9 ba ce 11 8c 82 00 aa 00 4b a9 0b".split(" ");for(t=0;t<s.length;++t){r._W(1,parseInt(s[t],16));}var f=n>-1?a.slice(0,n):a;r._W(4,2*(f.length+1));for(t=0;t<f.length;++t){r._W(2,f.charCodeAt(t));}r._W(2,0);if(i&8)ui(n>-1?a.slice(n+1):"",r);}else{s="03 03 00 00 00 00 00 00 c0 00 00 00 00 00 00 46".split(" ");for(t=0;t<s.length;++t){r._W(1,parseInt(s[t],16));}var l=0;while(a.slice(l*3,l*3+3)=="../"||a.slice(l*3,l*3+3)=="..\\"){++l;}r._W(2,l);r._W(4,a.length-3*l+1);for(t=0;t<a.length-3*l;++t){r._W(1,a.charCodeAt(t+3*l)&255);}r._W(1,0);r._W(2,65535);r._W(2,57005);for(t=0;t<6;++t){r._W(4,0);}}return r.slice(0,r.l);}function vi(e){var r=e._R(1),t=e._R(1),a=e._R(1),n=e._R(1);return[r,t,a,n];}function pi(e,r){var t=vi(e,r);t[3]=0;return t;}function mi(e){var r=e._R(2);var t=e._R(2);var a=e._R(2);return{r:r,c:t,ixfe:a};}function bi(e,r,t,a){if(!a)a=Jr(6);a._W(2,e);a._W(2,r);a._W(2,t||0);return a;}function gi(e){var r=e._R(2);var t=e._R(2);e.l+=8;return{type:r,flags:t};}function wi(e,r,t){return r===0?"":ni(e,r,t);}function ki(e,r,t){var a=t.biff>8?4:2;var n=e._R(a),i=e._R(a,"i"),s=e._R(a,"i");return[n,i,s];}function Ei(e){var r=e._R(2);var t=jt(e);return[r,t];}function Si(e,r,t){e.l+=4;r-=4;var a=e.l+r;var n=qn(e,r,t);var i=e._R(2);a-=e.l;if(i!==a)throw new Error("Malformed AddinUdf: padding = "+a+" != "+i);e.l+=i;return n;}function _i(e){var r=e._R(2);var t=e._R(2);var a=e._R(2);var n=e._R(2);return{s:{c:a,r:r},e:{c:n,r:t}};}function Ci(e,r){if(!r)r=Jr(8);r._W(2,e.s.r);r._W(2,e.e.r);r._W(2,e.s.c);r._W(2,e.e.c);return r;}function Bi(e){var r=e._R(2);var t=e._R(2);var a=e._R(1);var n=e._R(1);return{s:{c:a,r:r},e:{c:n,r:t}};}var Ti=Bi;function yi(e){e.l+=4;var r=e._R(2);var t=e._R(2);var a=e._R(2);e.l+=12;return[t,r,a];}function xi(e){var r={};e.l+=4;e.l+=16;r.fSharedNote=e._R(2);e.l+=4;return r;}function Ai(e){var r={};e.l+=4;e.cf=e._R(2);return r;}function Ii(e){e.l+=2;e.l+=e._R(2);}var Ri={0:Ii,4:Ii,5:Ii,6:Ii,7:Ai,8:Ii,9:Ii,10:Ii,11:Ii,12:Ii,13:xi,14:Ii,15:Ii,16:Ii,17:Ii,18:Ii,19:Ii,20:Ii,21:yi};function Fi(e,r){var t=e.l+r;var a=[];while(e.l<t){var n=e._R(2);e.l-=2;try{a.push(Ri[n](e,t-e.l));}catch(i){e.l=t;return a;}}if(e.l!=t)e.l=t;return a;}function Oi(e,r){var t={BIFFVer:0,dt:0};t.BIFFVer=e._R(2);r-=2;if(r>=2){t.dt=e._R(2);e.l-=2;}switch(t.BIFFVer){case 1536:;case 1280:;case 1024:;case 768:;case 512:;case 2:;case 7:break;default:if(r>6)throw new Error("Unexpected BIFF Ver "+t.BIFFVer);}e._R(r);return t;}function Di(e,r,t){var a=1536,n=16;switch(t.bookType){case"biff8":break;case"biff5":a=1280;n=8;break;case"biff4":a=4;n=6;break;case"biff3":a=3;n=6;break;case"biff2":a=2;n=4;break;case"xla":break;default:throw new Error("unsupported BIFF version");}var i=Jr(n);i._W(2,a);i._W(2,r);if(n>4)i._W(2,29282);if(n>6)i._W(2,1997);if(n>8){i._W(2,49161);i._W(2,1);i._W(2,1798);i._W(2,0);}return i;}function Pi(e,r){if(r===0)return 1200;if(e._R(2)!==1200){}return 1200;}function Ni(e,r,t){if(t.enc){e.l+=r;return"";}var a=e.l;var n=ni(e,0,t);e._R(r+a-e.l);return n;}function Li(e,r){var t=!r||r.biff==8;var a=Jr(t?112:54);a._W(r.biff==8?2:1,7);if(t)a._W(1,0);a._W(4,859007059);a._W(4,5458548|(t?0:536870912));while(a.l<a.length){a._W(1,t?0:32);}return a;}function Mi(e,r,t){var a=t&&t.biff==8||r==2?e._R(2):(e.l+=r,0);return{fDialog:a&16,fBelow:a&64,fRight:a&128};}function Ui(e,r,t){var a=e._R(4);var n=e._R(1)&3;var i=e._R(1);switch(i){case 0:i="Worksheet";break;case 1:i="Macrosheet";break;case 2:i="Chartsheet";break;case 6:i="VBAModule";break;}var s=qn(e,0,t);if(s.length===0)s="Sheet1";return{pos:a,hs:n,dt:i,name:s};}function zi(e,r){var t=!r||r.biff>=8?2:1;var a=Jr(8+t*e.name.length);a._W(4,e.pos);a._W(1,e.hs||0);a._W(1,e.dt);a._W(1,e.name.length);if(r.biff>=8)a._W(1,1);a._W(t*e.name.length,e.name,r.biff<8?"sbcs":"utf16le");var n=a.slice(0,a.l);n.l=a.l;return n;}function Hi(e,r){var t=e.l+r;var a=e._R(4);var n=e._R(4);var i=[];for(var s=0;s!=n&&e.l<t;++s){i.push(ei(e));}i.Count=a;i.Unique=n;return i;}function Wi(e,r){var t=Jr(8);t._W(4,e.Count);t._W(4,e.Unique);var a=[];for(var n=0;n<e.length;++n){a[n]=ri(e[n],r);}var i=I([t].concat(a));i.parts=[t.length].concat(a.map(function(e){return e.length;}));return i;}function Vi(e,r){var t={};t.dsst=e._R(2);e.l+=r-2;return t;}function Xi(e){var r={};r.r=e._R(2);r.c=e._R(2);r.cnt=e._R(2)-r.c;var t=e._R(2);e.l+=4;var a=e._R(1);e.l+=3;if(a&7)r.level=a&7;if(a&32)r.hidden=true;if(a&64)r.hpt=t/20;return r;}function Gi(e){var r=gi(e);if(r.type!=2211)throw new Error("Invalid Future Record "+r.type);var t=e._R(4);return t!==0;}function ji(e){e._R(2);return e._R(4);}function Ki(e,r,t){var a=0;if(!(t&&t.biff==2)){a=e._R(2);}var n=e._R(2);if(t&&t.biff==2){a=1-(n>>15);n&=32767;}var i={Unsynced:a&1,DyZero:(a&2)>>1,ExAsc:(a&4)>>2,ExDsc:(a&8)>>3};return[i,n];}function $i(e){var r=e._R(2),t=e._R(2),a=e._R(2),n=e._R(2);var i=e._R(2),s=e._R(2),f=e._R(2);var l=e._R(2),o=e._R(2);return{Pos:[r,t],Dim:[a,n],Flags:i,CurTab:s,FirstTab:f,Selected:l,TabRatio:o};}function Yi(){var e=Jr(18);e._W(2,0);e._W(2,0);e._W(2,29280);e._W(2,17600);e._W(2,56);e._W(2,0);e._W(2,0);e._W(2,1);e._W(2,500);return e;}function Zi(e,r,t){if(t&&t.biff>=2&&t.biff<5)return{};var a=e._R(2);return{RTL:a&64};}function Ji(e){var r=Jr(18),t=1718;if(e&&e.RTL)t|=64;r._W(2,t);r._W(4,0);r._W(4,64);r._W(4,0);r._W(4,0);return r;}function Qi(){}function qi(e,r,t){var a={dyHeight:e._R(2),fl:e._R(2)};switch(t&&t.biff||8){case 2:break;case 3:;case 4:e.l+=2;break;default:e.l+=10;break;}a.name=qn(e,0,t);return a;}function es(e,r){var t=e.name||"Arial";var a=r&&r.biff==5,n=a?15+t.length:16+2*t.length;var i=Jr(n);i._W(2,(e.sz||12)*20);i._W(4,0);i._W(2,400);i._W(4,0);i._W(2,0);i._W(1,t.length);if(!a)i._W(1,1);i._W((a?1:2)*t.length,t,a?"sbcs":"utf16le");return i;}function rs(e){var r=mi(e);r.isst=e._R(4);return r;}function ts(e,r,t,a){var n=Jr(10);bi(e,r,a,n);n._W(4,t);return n;}function as(e,r,t){if(t.biffguess&&t.biff==2)t.biff=5;var a=e.l+r;var n=mi(e,6);if(t.biff==2)e.l++;var i=ai(e,a-e.l,t);n.val=i;return n;}function ns(e,r,t,a,n){var i=!n||n.biff==8;var s=Jr(6+2+ +i+(1+i)*t.length);bi(e,r,a,s);s._W(2,t.length);if(i)s._W(1,1);s._W((1+i)*t.length,t,i?"utf16le":"sbcs");return s;}function is(e,r,t){var a=e._R(2);var n=ni(e,0,t);return[a,n];}function ss(e,r,t,a){var n=t&&t.biff==5;if(!a)a=Jr(n?3+r.length:5+2*r.length);a._W(2,e);a._W(n?1:2,r.length);if(!n)a._W(1,1);a._W((n?1:2)*r.length,r,n?"sbcs":"utf16le");var i=a.length>a.l?a.slice(0,a.l):a;if(i.l==null)i.l=i.length;return i;}var fs=ni;function ls(e,r,t){var a=e.l+r;var n=t.biff==8||!t.biff?4:2;var i=e._R(n),s=e._R(n);var f=e._R(2),l=e._R(2);e.l=a;return{s:{r:i,c:f},e:{r:s,c:l}};}function os(e,r){var t=r.biff==8||!r.biff?4:2;var a=Jr(2*t+6);a._W(t,e.s.r);a._W(t,e.e.r+1);a._W(2,e.s.c);a._W(2,e.e.c+1);a._W(2,0);return a;}function cs(e){var r=e._R(2),t=e._R(2);var a=Ei(e);return{r:r,c:t,ixfe:a[0],rknum:a[1]};}function us(e,r){var t=e.l+r-2;var a=e._R(2),n=e._R(2);var i=[];while(e.l<t){i.push(Ei(e));}if(e.l!==t)throw new Error("MulRK read error");var s=e._R(2);if(i.length!=s-n+1)throw new Error("MulRK length mismatch");return{r:a,c:n,C:s,rkrec:i};}function hs(e,r){var t=e.l+r-2;var a=e._R(2),n=e._R(2);var i=[];while(e.l<t){i.push(e._R(2));}if(e.l!==t)throw new Error("MulBlank read error");var s=e._R(2);if(i.length!=s-n+1)throw new Error("MulBlank length mismatch");return{r:a,c:n,C:s,ixfe:i};}function ds(e,r,t,a){var n={};var i=e._R(4),s=e._R(4);var f=e._R(4),l=e._R(2);n.patternType=Ba[f>>26];if(!a.cellStyles)return n;n.alc=i&7;n.fWrap=i>>3&1;n.alcV=i>>4&7;n.fJustLast=i>>7&1;n.trot=i>>8&255;n.cIndent=i>>16&15;n.fShrinkToFit=i>>20&1;n.iReadOrder=i>>22&2;n.fAtrNum=i>>26&1;n.fAtrFnt=i>>27&1;n.fAtrAlc=i>>28&1;n.fAtrBdr=i>>29&1;n.fAtrPat=i>>30&1;n.fAtrProt=i>>31&1;n.dgLeft=s&15;n.dgRight=s>>4&15;n.dgTop=s>>8&15;n.dgBottom=s>>12&15;n.icvLeft=s>>16&127;n.icvRight=s>>23&127;n.grbitDiag=s>>30&3;n.icvTop=f&127;n.icvBottom=f>>7&127;n.icvDiag=f>>14&127;n.dgDiag=f>>21&15;n.icvFore=l&127;n.icvBack=l>>7&127;n.fsxButton=l>>14&1;return n;}function vs(e,r,t){var a={};a.ifnt=e._R(2);a.numFmtId=e._R(2);a.flags=e._R(2);a.fStyle=a.flags>>2&1;r-=6;a.data=ds(e,r,a.fStyle,t);return a;}function ps(e,r,t,a){var n=t&&t.biff==5;if(!a)a=Jr(n?16:20);a._W(2,0);if(e.style){a._W(2,e.numFmtId||0);a._W(2,65524);}else{a._W(2,e.numFmtId||0);a._W(2,r<<4);}var i=0;if(e.numFmtId>0&&n)i|=1024;a._W(4,i);a._W(4,0);if(!n)a._W(4,0);a._W(2,0);return a;}function ms(e){e.l+=4;var r=[e._R(2),e._R(2)];if(r[0]!==0)r[0]--;if(r[1]!==0)r[1]--;if(r[0]>7||r[1]>7)throw new Error("Bad Gutters: "+r.join("|"));return r;}function bs(e){var r=Jr(8);r._W(4,0);r._W(2,e[0]?e[0]+1:0);r._W(2,e[1]?e[1]+1:0);return r;}function gs(e,r,t){var a=mi(e,6);if(t.biff==2||r==9)++e.l;var n=Jn(e,2);a.val=n;a.t=n===true||n===false?"b":"e";return a;}function ws(e,r,t,a,n,i){var s=Jr(8);bi(e,r,a,s);Qn(t,i,s);return s;}function ks(e,r,t){if(t.biffguess&&t.biff==2)t.biff=5;var a=mi(e,6);var n=Qt(e,8);a.val=n;return a;}function Es(e,r,t,a){var n=Jr(14);bi(e,r,a,n);qt(t,n);return n;}var Ss=wi;function _s(e,r,t){var a=e.l+r;var n=e._R(2);var i=e._R(2);t.sbcch=i;if(i==1025||i==14849)return[i,n];if(i<1||i>255)throw new Error("Unexpected SupBook type: "+i);var s=ti(e,i);var f=[];while(a>e.l){f.push(ai(e));}return[i,n,s,f];}function Cs(e,r,t){var a=e._R(2);var n;var i={fBuiltIn:a&1,fWantAdvise:a>>>1&1,fWantPict:a>>>2&1,fOle:a>>>3&1,fOleLink:a>>>4&1,cf:a>>>5&1023,fIcon:a>>>15&1};if(t.sbcch===14849)n=Si(e,r-2,t);i.body=n||e._R(r-2);if(typeof n==="string")i.Name=n;return i;}var Bs=["_xlnm.Consolidate_Area","_xlnm.Auto_Open","_xlnm.Auto_Close","_xlnm.Extract","_xlnm.Database","_xlnm.Criteria","_xlnm.Print_Area","_xlnm.Print_Titles","_xlnm.Recorder","_xlnm.Data_Form","_xlnm.Auto_Activate","_xlnm.Auto_Deactivate","_xlnm.Sheet_Title","_xlnm._FilterDatabase"];function Ts(e,r,t){var a=e.l+r;var n=e._R(2);var i=e._R(1);var s=e._R(1);var f=e._R(t&&t.biff==2?1:2);var l=0;if(!t||t.biff>=5){if(t.biff!=5)e.l+=2;l=e._R(2);if(t.biff==5)e.l+=2;e.l+=4;}var o=ti(e,s,t);if(n&32)o=Bs[o.charCodeAt(0)];var c=a-e.l;if(t&&t.biff==2)--c;var u=a==e.l||f===0||!(c>0)?[]:Gu(e,c,t,f);return{chKey:i,Name:o,itab:l,rgce:u};}function ys(e,r,t){if(t.biff<8)return xs(e,r,t);var a=[],n=e.l+r,i=e._R(t.biff>8?4:2);while(i--!==0){a.push(ki(e,t.biff>8?12:6,t));}if(e.l!=n)throw new Error("Bad ExternSheet: "+e.l+" != "+n);return a;}function xs(e,r,t){if(e[e.l+1]==3)e[e.l]++;var a=qn(e,r,t);return a.charCodeAt(0)==3?a.slice(1):a;}function As(e,r,t){if(t.biff<8){e.l+=r;return;}var a=e._R(2);var n=e._R(2);var i=ti(e,a,t);var s=ti(e,n,t);return[i,s];}function Is(e,r,t){var a=Bi(e,6);e.l++;var n=e._R(1);r-=8;return[ju(e,r,t),n,a];}function Rs(e,r,t){var a=Ti(e,6);switch(t.biff){case 2:e.l++;r-=7;break;case 3:;case 4:e.l+=2;r-=8;break;default:e.l+=6;r-=12;}return[a,Vu(e,r,t,a)];}function Fs(e){var r=e._R(4)!==0;var t=e._R(4)!==0;var a=e._R(4);return[r,t,a];}function Os(e,r,t){if(t.biff<8)return;var a=e._R(2),n=e._R(2);var i=e._R(2),s=e._R(2);var f=ni(e,0,t);if(t.biff<8)e._R(1);return[{r:a,c:n},f,s,i];}function Ds(e,r,t){return Os(e,r,t);}function Ps(e,r){var t=[];var a=e._R(2);while(a--){t.push(_i(e,r));}return t;}function Ns(e){var r=Jr(2+e.length*8);r._W(2,e.length);for(var t=0;t<e.length;++t){Ci(e[t],r);}return r;}function Ls(e,r,t){if(t&&t.biff<8)return Us(e,r,t);var a=yi(e,22);var n=Fi(e,r-22,a[1]);return{cmo:a,ft:n};}var Ms=[];Ms[8]=function(e,r){var t=e.l+r;e.l+=10;var a=e._R(2);e.l+=4;e.l+=2;e.l+=2;e.l+=2;e.l+=4;var n=e._R(1);e.l+=n;e.l=t;return{fmt:a};};function Us(e,r,t){e.l+=4;var a=e._R(2);var n=e._R(2);var i=e._R(2);e.l+=2;e.l+=2;e.l+=2;e.l+=2;e.l+=2;e.l+=2;e.l+=2;e.l+=2;e.l+=2;e.l+=6;r-=36;var s=[];s.push((Ms[a]||Zr)(e,r,t));return{cmo:[n,a,i],ft:s};}function zs(e,r,t){var a=e.l;var n="";try{e.l+=4;var i=(t.lastobj||{cmo:[0,0]}).cmo[1];var s;if([0,5,7,11,12,14].indexOf(i)==-1)e.l+=6;else s=si(e,6,t);var f=e._R(2);e._R(2);$n(e,2);var l=e._R(2);e.l+=l;for(var o=1;o<e.lens.length-1;++o){if(e.l-a!=e.lens[o])throw new Error("TxO: bad continue record");var c=e[e.l];var u=ti(e,e.lens[o+1]-e.lens[o]-1);n+=u;if(n.length>=(c?f:2*f))break;}if(n.length!==f&&n.length!==f*2){throw new Error("cchText: "+f+" != "+n.length);}e.l=a+r;return{t:n};}catch(h){e.l=a+r;return{t:n};}}function Hs(e,r){var t=_i(e,8);e.l+=16;var a=hi(e,r-24);return[t,a];}function Ws(e){var r=Jr(24);var t=mt(e[0]);r._W(2,t.r);r._W(2,t.r);r._W(2,t.c);r._W(2,t.c);var a="d0 c9 ea 79 f9 ba ce 11 8c 82 00 aa 00 4b a9 0b".split(" ");for(var n=0;n<16;++n){r._W(1,parseInt(a[n],16));}return I([r,di(e[1])]);}function Vs(e,r){e._R(2);var t=_i(e,8);var a=e._R((r-10)/2,"dbcs-cont");a=a.replace(R,"");return[t,a];}function Xs(e){var r=e[1].Tooltip;var t=Jr(10+2*(r.length+1));t._W(2,2048);var a=mt(e[0]);t._W(2,a.r);t._W(2,a.r);t._W(2,a.c);t._W(2,a.c);for(var n=0;n<r.length;++n){t._W(2,r.charCodeAt(n));}t._W(2,0);return t;}function Gs(e){var r=[0,0],t;t=e._R(2);r[0]=Ca[t]||t;t=e._R(2);r[1]=Ca[t]||t;return r;}function js(e){if(!e)e=Jr(4);e._W(2,1);e._W(2,1);return e;}function Ks(e){var r=e._R(2);var t=[];while(r-->0){t.push(pi(e,8));}return t;}function $s(e){var r=e._R(2);var t=[];while(r-->0){t.push(pi(e,8));}return t;}function Ys(e){e.l+=2;var r={cxfs:0,crc:0};r.cxfs=e._R(2);r.crc=e._R(4);return r;}function Zs(e,r,t){if(!t.cellStyles)return Zr(e,r);var a=t&&t.biff>=12?4:2;var n=e._R(a);var i=e._R(a);var s=e._R(a);var f=e._R(a);var l=e._R(2);if(a==2)e.l+=2;var o={s:n,e:i,w:s,ixfe:f,flags:l};if(t.biff>=5||!t.biff)o.level=l>>8&7;return o;}function Js(e,r){var t=Jr(12);t._W(2,r);t._W(2,r);t._W(2,e.width*256);t._W(2,0);var a=0;if(e.hidden)a|=1;t._W(1,a);a=e.level||0;t._W(1,a);t._W(2,0);return t;}function Qs(e,r){var t={};if(r<32)return t;e.l+=16;t.header=Qt(e,8);t.footer=Qt(e,8);e.l+=2;return t;}function qs(e,r,t){var a={area:false};if(t.biff!=5){e.l+=r;return a;}var n=e._R(1);e.l+=3;if(n&16)a.area=true;return a;}function ef(e){var r=Jr(2*e);for(var t=0;t<e;++t){r._W(2,t+1);}return r;}var rf=mi;var tf=Zn;var af=ai;function nf(e){var r=e._R(2);var t=e._R(2);var a=e._R(4);var n={fmt:r,env:t,len:a,data:e.slice(e.l,e.l+a)};e.l+=a;return n;}function sf(e,r,t){if(t.biffguess&&t.biff==5)t.biff=2;var a=mi(e,6);++e.l;var n=ni(e,r-7,t);a.t="str";a.val=n;return a;}function ff(e){var r=mi(e,6);++e.l;var t=Qt(e,8);r.t="n";r.val=t;return r;}function lf(e,r,t){var a=Jr(15);nm(a,e,r);a._W(8,t,"f");return a;}function of(e){var r=mi(e,6);++e.l;var t=e._R(2);r.t="n";r.val=t;return r;}function cf(e,r,t){var a=Jr(9);nm(a,e,r);a._W(2,t);return a;}function uf(e){var r=e._R(1);if(r===0){e.l++;return"";}return e._R(r,"sbcs-cont");}function hf(e,r){e.l+=6;e.l+=2;e.l+=1;e.l+=3;e.l+=1;e.l+=r-13;}function df(e,r,t){var a=e.l+r;var n=mi(e,6);var i=e._R(2);var s=ti(e,i,t);e.l=a;n.t="str";n.val=s;return n;}var vf=function(){var e={1:437,2:850,3:1252,4:1e4,100:852,101:866,102:865,103:861,104:895,105:620,106:737,107:857,120:950,121:949,122:936,123:932,124:874,125:1255,126:1256,150:10007,151:10029,152:10006,200:1250,201:1251,202:1254,203:1253,0:20127,8:865,9:437,10:850,11:437,13:437,14:850,15:437,16:850,17:437,18:850,19:932,20:850,21:437,22:850,23:865,24:437,25:437,26:850,27:437,28:863,29:850,31:852,34:852,35:852,36:860,37:850,38:866,55:850,64:852,77:936,78:949,79:950,80:874,87:1252,88:1252,89:1252,108:863,134:737,135:852,136:857,204:1257,255:16969};var r=Z({1:437,2:850,3:1252,4:1e4,100:852,101:866,102:865,103:861,104:895,105:620,106:737,107:857,120:950,121:949,122:936,123:932,124:874,125:1255,126:1256,150:10007,151:10029,152:10006,200:1250,201:1251,202:1254,203:1253,0:20127});var a=[2,3,48,49,131,139,140,245];function n(r,t){var a=[];var n=_(1);switch(t.type){case"base64":n=B(g.decode(r));break;case"binary":n=B(r);break;case"buffer":;case"array":n=r;break;}Yr(n,0);var i=n._R(1);var s=!!(i&136);var f=false,l=false;switch(i){case 2:break;case 3:break;case 48:f=true;s=true;break;case 49:f=true;s=true;break;case 131:break;case 139:break;case 140:l=true;break;case 245:break;default:throw new Error("DBF Unsupported Version: "+i.toString(16));}var o=0,c=521;if(i==2)o=n._R(2);n.l+=3;if(i!=2)o=n._R(4);if(o>1048576)o=1e6;if(i!=2)c=n._R(2);var u=n._R(2);var h=t.codepage||1252;if(i!=2){n.l+=16;n._R(1);if(n[n.l]!==0)h=e[n[n.l]];n.l+=1;n.l+=2;}if(l)n.l+=36;var d=[],v={};var p=Math.min(n.length,i==2?521:c-10-(f?264:0));var m=l?32:11;while(n.l<p&&n[n.l]!=13){v={};v.name=cptable.utils.decode(h,n.slice(n.l,n.l+m)).replace(/[\u0000\r\n].*$/g,"");n.l+=m;v.type=String.fromCharCode(n._R(1));if(i!=2&&!l)v.offset=n._R(4);v.len=n._R(1);if(i==2)v.offset=n._R(2);v.dec=n._R(1);if(v.name.length)d.push(v);if(i!=2)n.l+=l?13:14;switch(v.type){case"B":if((!f||v.len!=8)&&t.WTF)console.log("Skipping "+v.name+":"+v.type);break;case"G":;case"P":if(t.WTF)console.log("Skipping "+v.name+":"+v.type);break;case"+":;case"0":;case"@":;case"C":;case"D":;case"F":;case"I":;case"L":;case"M":;case"N":;case"O":;case"T":;case"Y":break;default:throw new Error("Unknown Field Type: "+v.type);}}if(n[n.l]!==13)n.l=c-1;if(n._R(1)!==13)throw new Error("DBF Terminator not found "+n.l+" "+n[n.l]);n.l=c;var b=0,w=0;a[0]=[];for(w=0;w!=d.length;++w){a[0][w]=d[w].name;}while(o-->0){if(n[n.l]===42){n.l+=u;continue;}++n.l;a[++b]=[];w=0;for(w=0;w!=d.length;++w){var k=n.slice(n.l,n.l+d[w].len);n.l+=d[w].len;Yr(k,0);var E=cptable.utils.decode(h,k);switch(d[w].type){case"C":if(E.trim().length)a[b][w]=E.replace(/\s+$/,"");break;case"D":if(E.length===8)a[b][w]=new Date(+E.slice(0,4),+E.slice(4,6)-1,+E.slice(6,8));else a[b][w]=E;break;case"F":a[b][w]=parseFloat(E.trim());break;case"+":;case"I":a[b][w]=l?k._R(-4,"i")^2147483648:k._R(4,"i");break;case"L":switch(E.trim().toUpperCase()){case"Y":;case"T":a[b][w]=true;break;case"N":;case"F":a[b][w]=false;break;case"":;case"?":break;default:throw new Error("DBF Unrecognized L:|"+E+"|");}break;case"M":if(!s)throw new Error("DBF Unexpected MEMO for type "+i.toString(16));a[b][w]="##MEMO##"+(l?parseInt(E.trim(),10):k._R(4));break;case"N":E=E.replace(/\u0000/g,"").trim();if(E&&E!=".")a[b][w]=+E||0;break;case"@":a[b][w]=new Date(k._R(-8,"f")-621356832e5);break;case"T":a[b][w]=new Date((k._R(4)-2440588)*864e5+k._R(4));break;case"Y":a[b][w]=k._R(4,"i")/1e4;break;case"O":a[b][w]=-k._R(-8,"f");break;case"B":if(f&&d[w].len==8){a[b][w]=k._R(8,"f");break;};case"G":;case"P":k.l+=d[w].len;break;case"0":if(d[w].name==="_NullFlags")break;default:throw new Error("DBF Unsupported data type "+d[w].type);}}}if(i!=2)if(n.l<n.length&&n[n.l++]!=26)throw new Error("DBF EOF Marker missing "+(n.l-1)+" of "+n.length+" "+n[n.l-1].toString(16));if(t&&t.sheetRows)a=a.slice(0,t.sheetRows);return a;}function i(e,r){var t=r||{};if(!t.dateNF)t.dateNF="yyyymmdd";return Bt(n(e,t),t);}function s(e,r){try{return _t(i(e,r),r);}catch(t){if(r&&r.WTF)throw t;}return{SheetNames:[],Sheets:{}};}var f={B:8,C:250,L:1,D:8,"?":0,"":0};function o(e,a){var n=a||{};if(+n.codepage>=0)l(+n.codepage);if(n.type=="string")throw new Error("Cannot write DBF to JS string");var i=qr();var s=Sb(e,{header:1,raw:true,cellDates:true});var o=s[0],c=s.slice(1);var u=0,h=0,d=0,v=1;for(u=0;u<o.length;++u){if(u==null)continue;++d;if(typeof o[u]==="number")o[u]=o[u].toString(10);if(typeof o[u]!=="string")throw new Error("DBF Invalid column name "+o[u]+" |"+_typeof(o[u])+"|");if(o.indexOf(o[u])!==u)for(h=0;h<1024;++h){if(o.indexOf(o[u]+"_"+h)==-1){o[u]+="_"+h;break;}}}var p=kt(e["!ref"]);var m=[];for(u=0;u<=p.e.c-p.s.c;++u){var b=[];for(h=0;h<c.length;++h){if(c[h][u]!=null)b.push(c[h][u]);}if(b.length==0||o[u]==null){m[u]="?";continue;}var g="",w="";for(h=0;h<b.length;++h){switch(_typeof(b[h])){case"number":w="B";break;case"string":w="C";break;case"boolean":w="L";break;case"object":w=b[h]instanceof Date?"D":"C";break;default:w="C";}g=g&&g!=w?"C":w;if(g=="C")break;}v+=f[g]||0;m[u]=g;}var k=i.next(32);k._W(4,318902576);k._W(4,c.length);k._W(2,296+32*d);k._W(2,v);for(u=0;u<4;++u){k._W(4,0);}k._W(4,0|(+r[t]||3)<<8);for(u=0,h=0;u<o.length;++u){if(o[u]==null)continue;var E=i.next(32);var S=(o[u].slice(-10)+"\0\0\0\0\0\0\0\0\0\0\0").slice(0,11);E._W(1,S,"sbcs");E._W(1,m[u]=="?"?"C":m[u],"sbcs");E._W(4,h);E._W(1,f[m[u]]||0);E._W(1,0);E._W(1,2);E._W(4,0);E._W(1,0);E._W(4,0);E._W(4,0);h+=f[m[u]]||0;}var _=i.next(264);_._W(4,13);for(u=0;u<65;++u){_._W(4,0);}for(u=0;u<c.length;++u){var C=i.next(v);C._W(1,0);for(h=0;h<o.length;++h){if(o[h]==null)continue;switch(m[h]){case"L":C._W(1,c[u][h]==null?63:c[u][h]?84:70);break;case"B":C._W(8,c[u][h]||0,"f");break;case"D":if(!c[u][h])C._W(8,"00000000","sbcs");else{C._W(4,("0000"+c[u][h].getFullYear()).slice(-4),"sbcs");C._W(2,("00"+(c[u][h].getMonth()+1)).slice(-2),"sbcs");C._W(2,("00"+c[u][h].getDate()).slice(-2),"sbcs");}break;case"C":var B=String(c[u][h]||"");C._W(1,B,"sbcs");for(d=0;d<250-B.length;++d){C._W(1,32);}break;}}}i.next(1)._W(1,26);return i.end();}return{versions:a,to_workbook:s,to_sheet:i,from_sheet:o};}();var pf=function(){var e={AA:"À",BA:"Á",CA:"Â",DA:195,HA:"Ä",JA:197,AE:"È",BE:"É",CE:"Ê",HE:"Ë",AI:"Ì",BI:"Í",CI:"Î",HI:"Ï",AO:"Ò",BO:"Ó",CO:"Ô",DO:213,HO:"Ö",AU:"Ù",BU:"Ú",CU:"Û",HU:"Ü",Aa:"à",Ba:"á",Ca:"â",Da:227,Ha:"ä",Ja:229,Ae:"è",Be:"é",Ce:"ê",He:"ë",Ai:"ì",Bi:"í",Ci:"î",Hi:"ï",Ao:"ò",Bo:"ó",Co:"ô",Do:245,Ho:"ö",Au:"ù",Bu:"ú",Cu:"û",Hu:"ü",KC:"Ç",Kc:"ç",q:"æ",z:"œ",a:"Æ",j:"Œ",DN:209,Dn:241,Hy:255,S:169,c:170,R:174,"B ":180,0:176,1:177,2:178,3:179,5:181,6:182,7:183,Q:185,k:186,b:208,i:216,l:222,s:240,y:248,"!":161,'"':162,"#":163,"(":164,"%":165,"'":167,"H ":168,"+":171,";":187,"<":188,"=":189,">":190,"?":191,"{":223};var r=new RegExp("N("+K(e).join("|").replace(/\|\|\|/,"|\\||").replace(/([?()+])/g,"\\$1")+"|\\|)","gm");var t=function t(r,_t2){var a=e[_t2];return typeof a=="number"?p(a):a;};var a=function a(e,r,t){var a=r.charCodeAt(0)-32<<4|t.charCodeAt(0)-48;return a==59?e:p(a);};e["|"]=254;function n(e,r){switch(r.type){case"base64":return i(g.decode(e),r);case"binary":return i(e,r);case"buffer":return i(w&&Buffer.isBuffer(e)?e.toString("binary"):y(e),r);case"array":return i(oe(e),r);}throw new Error("Unrecognized type "+r.type);}function i(e,n){var i=e.split(/[\n\r]+/),s=-1,f=-1,o=0,c=0,u=[];var h=[];var d=null;var v={},p=[],m=[],b=[];var g=0,w;if(+n.codepage>=0)l(+n.codepage);for(;o!==i.length;++o){g=0;var k=i[o].trim().replace(/\x1B([\x20-\x2F])([\x30-\x3F])/g,a).replace(r,t);var E=k.replace(/;;/g,"\0").split(";").map(function(e){return e.replace(/\u0000/g,";");});var S=E[0],_;if(k.length>0)switch(S){case"ID":break;case"E":break;case"B":break;case"O":break;case"W":break;case"P":if(E[1].charAt(0)=="P")h.push(k.slice(3).replace(/;;/g,";"));break;case"C":var C=false,B=false,T=false,y=false,x=-1,A=-1;for(c=1;c<E.length;++c){switch(E[c].charAt(0)){case"A":break;case"X":f=parseInt(E[c].slice(1))-1;B=true;break;case"Y":s=parseInt(E[c].slice(1))-1;if(!B)f=0;for(w=u.length;w<=s;++w){u[w]=[];}break;case"K":_=E[c].slice(1);if(_.charAt(0)==='"')_=_.slice(1,_.length-1);else if(_==="TRUE")_=true;else if(_==="FALSE")_=false;else if(!isNaN(he(_))){_=he(_);if(d!==null&&O.is_date(d))_=ne(_);}else if(!isNaN(de(_).getDate())){_=le(_);}if(typeof cptable!=="undefined"&&typeof _=="string"&&(n||{}).type!="string"&&(n||{}).codepage)_=cptable.utils.decode(n.codepage,_);C=true;break;case"E":y=true;var I=sc(E[c].slice(1),{r:s,c:f});u[s][f]=[u[s][f],I];break;case"S":T=true;u[s][f]=[u[s][f],"S5S"];break;case"G":break;case"R":x=parseInt(E[c].slice(1))-1;break;case"C":A=parseInt(E[c].slice(1))-1;break;default:if(n&&n.WTF)throw new Error("SYLK bad record "+k);}}if(C){if(u[s][f]&&u[s][f].length==2)u[s][f][0]=_;else u[s][f]=_;d=null;}if(T){if(y)throw new Error("SYLK shared formula cannot have own formula");var R=x>-1&&u[x][A];if(!R||!R[1])throw new Error("SYLK shared formula cannot find base");u[s][f][1]=oc(R[1],{r:s-x,c:f-A});}break;case"F":var F=0;for(c=1;c<E.length;++c){switch(E[c].charAt(0)){case"X":f=parseInt(E[c].slice(1))-1;++F;break;case"Y":s=parseInt(E[c].slice(1))-1;for(w=u.length;w<=s;++w){u[w]=[];}break;case"M":g=parseInt(E[c].slice(1))/20;break;case"F":break;case"G":break;case"P":d=h[parseInt(E[c].slice(1))];break;case"S":break;case"D":break;case"N":break;case"W":b=E[c].slice(1).split(" ");for(w=parseInt(b[0],10);w<=parseInt(b[1],10);++w){g=parseInt(b[2],10);m[w-1]=g===0?{hidden:true}:{wch:g};_l(m[w-1]);}break;case"C":f=parseInt(E[c].slice(1))-1;if(!m[f])m[f]={};break;case"R":s=parseInt(E[c].slice(1))-1;if(!p[s])p[s]={};if(g>0){p[s].hpt=g;p[s].hpx=yl(g);}else if(g===0)p[s].hidden=true;break;default:if(n&&n.WTF)throw new Error("SYLK bad record "+k);}}if(F<1)d=null;break;default:if(n&&n.WTF)throw new Error("SYLK bad record "+k);}}if(p.length>0)v["!rows"]=p;if(m.length>0)v["!cols"]=m;if(n&&n.sheetRows)u=u.slice(0,n.sheetRows);return[u,v];}function s(e,r){var t=n(e,r);var a=t[0],i=t[1];var s=Bt(a,r);K(i).forEach(function(e){s[e]=i[e];});return s;}function f(e,r){return _t(s(e,r),r);}function o(e,r,t,a){var n="C;Y"+(t+1)+";X"+(a+1)+";K";switch(e.t){case"n":n+=e.v||0;if(e.f&&!e.F)n+=";E"+lc(e.f,{r:t,c:a});break;case"b":n+=e.v?"TRUE":"FALSE";break;case"e":n+=e.w||e.v;break;case"d":n+='"'+(e.w||e.v)+'"';break;case"s":n+='"'+e.v.replace(/"/g,"")+'"';break;}return n;}function c(e,r){r.forEach(function(r,t){var a="F;W"+(t+1)+" "+(t+1)+" ";if(r.hidden)a+="0";else{if(typeof r.width=="number"&&!r.wpx)r.wpx=gl(r.width);if(typeof r.wpx=="number"&&!r.wch)r.wch=wl(r.wpx);if(typeof r.wch=="number")a+=Math.round(r.wch);}if(a.charAt(a.length-1)!=" ")e.push(a);});}function u(e,r){r.forEach(function(r,t){var a="F;";if(r.hidden)a+="M0;";else if(r.hpt)a+="M"+20*r.hpt+";";else if(r.hpx)a+="M"+20*Tl(r.hpx)+";";if(a.length>2)e.push(a+"R"+(t+1));});}function h(e,r){var t=["ID;PWXL;N;E"],a=[];var n=kt(e["!ref"]),i;var s=Array.isArray(e);var f="\r\n";t.push("P;PGeneral");t.push("F;P0;DG0G8;M255");if(e["!cols"])c(t,e["!cols"]);if(e["!rows"])u(t,e["!rows"]);t.push("B;Y"+(n.e.r-n.s.r+1)+";X"+(n.e.c-n.s.c+1)+";D"+[n.s.c,n.s.r,n.e.c,n.e.r].join(" "));for(var l=n.s.r;l<=n.e.r;++l){for(var h=n.s.c;h<=n.e.c;++h){var d=bt({r:l,c:h});i=s?(e[l]||[])[h]:e[d];if(!i||i.v==null&&(!i.f||i.F))continue;a.push(o(i,e,l,h,r));}}return t.join(f)+f+a.join(f)+f+"E"+f;}return{to_workbook:f,to_sheet:s,from_sheet:h};}();var mf=function(){function e(e,t){switch(t.type){case"base64":return r(g.decode(e),t);case"binary":return r(e,t);case"buffer":return r(w&&Buffer.isBuffer(e)?e.toString("binary"):y(e),t);case"array":return r(oe(e),t);}throw new Error("Unrecognized type "+t.type);}function r(e,r){var t=e.split("\n"),a=-1,n=-1,i=0,s=[];for(;i!==t.length;++i){if(t[i].trim()==="BOT"){s[++a]=[];n=0;continue;}if(a<0)continue;var f=t[i].trim().split(",");var l=f[0],o=f[1];++i;var c=t[i]||"";while((c.match(/["]/g)||[]).length&1&&i<t.length-1){c+="\n"+t[++i];}c=c.trim();switch(+l){case-1:if(c==="BOT"){s[++a]=[];n=0;continue;}else if(c!=="EOD")throw new Error("Unrecognized DIF special command "+c);break;case 0:if(c==="TRUE")s[a][n]=true;else if(c==="FALSE")s[a][n]=false;else if(!isNaN(he(o)))s[a][n]=he(o);else if(!isNaN(de(o).getDate()))s[a][n]=le(o);else s[a][n]=o;++n;break;case 1:c=c.slice(1,c.length-1);c=c.replace(/""/g,'"');if(b&&c&&c.match(/^=".*"$/))c=c.slice(2,-1);s[a][n++]=c!==""?c:null;break;}if(c==="EOD")break;}if(r&&r.sheetRows)s=s.slice(0,r.sheetRows);return s;}function t(r,t){return Bt(e(r,t),t);}function a(e,r){return _t(t(e,r),r);}var n=function(){var e=function t(e,r,a,n,i){e.push(r);e.push(a+","+n);e.push('"'+i.replace(/"/g,'""')+'"');};var r=function a(e,r,t,n){e.push(r+","+t);e.push(r==1?'"'+n.replace(/"/g,'""')+'"':n);};return function n(t){var a=[];var n=kt(t["!ref"]),i;var s=Array.isArray(t);e(a,"TABLE",0,1,"sheetjs");e(a,"VECTORS",0,n.e.r-n.s.r+1,"");e(a,"TUPLES",0,n.e.c-n.s.c+1,"");e(a,"DATA",0,0,"");for(var f=n.s.r;f<=n.e.r;++f){r(a,-1,0,"BOT");for(var l=n.s.c;l<=n.e.c;++l){var o=bt({r:f,c:l});i=s?(t[f]||[])[l]:t[o];if(!i){r(a,1,0,"");continue;}switch(i.t){case"n":var c=b?i.w:i.v;if(!c&&i.v!=null)c=i.v;if(c==null){if(b&&i.f&&!i.F)r(a,1,0,"="+i.f);else r(a,1,0,"");}else r(a,0,c,"V");break;case"b":r(a,0,i.v?1:0,i.v?"TRUE":"FALSE");break;case"s":r(a,1,0,!b||isNaN(i.v)?i.v:'="'+i.v+'"');break;case"d":if(!i.w)i.w=O.format(i.z||O._table[14],ee(le(i.v)));if(b)r(a,0,i.w,"V");else r(a,1,0,i.w);break;default:r(a,1,0,"");}}}r(a,-1,0,"EOD");var u="\r\n";var h=a.join(u);return h;};}();return{to_workbook:a,to_sheet:t,from_sheet:n};}();var bf=function(){function e(e){return e.replace(/\\b/g,"\\").replace(/\\c/g,":").replace(/\\n/g,"\n");}function r(e){return e.replace(/\\/g,"\\b").replace(/:/g,"\\c").replace(/\n/g,"\\n");}function t(r,t){var a=r.split("\n"),n=-1,i=-1,s=0,f=[];for(;s!==a.length;++s){var l=a[s].trim().split(":");if(l[0]!=="cell")continue;var o=mt(l[1]);if(f.length<=o.r)for(n=f.length;n<=o.r;++n){if(!f[n])f[n]=[];}n=o.r;i=o.c;switch(l[2]){case"t":f[n][i]=e(l[3]);break;case"v":f[n][i]=+l[3];break;case"vtf":var c=l[l.length-1];case"vtc":switch(l[3]){case"nl":f[n][i]=+l[4]?true:false;break;default:f[n][i]=+l[4];break;}if(l[2]=="vtf")f[n][i]=[f[n][i],c];}}if(t&&t.sheetRows)f=f.slice(0,t.sheetRows);return f;}function a(e,r){return Bt(t(e,r),r);}function n(e,r){return _t(a(e,r),r);}var i=["socialcalc:version:1.5","MIME-Version: 1.0","Content-Type: multipart/mixed; boundary=SocialCalcSpreadsheetControlSave"].join("\n");var s=["--SocialCalcSpreadsheetControlSave","Content-type: text/plain; charset=UTF-8"].join("\n")+"\n";var f=["# SocialCalc Spreadsheet Control Save","part:sheet"].join("\n");var l="--SocialCalcSpreadsheetControlSave--";function o(e){if(!e||!e["!ref"])return"";var t=[],a=[],n,i="";var s=gt(e["!ref"]);var f=Array.isArray(e);for(var l=s.s.r;l<=s.e.r;++l){for(var o=s.s.c;o<=s.e.c;++o){i=bt({r:l,c:o});n=f?(e[l]||[])[o]:e[i];if(!n||n.v==null||n.t==="z")continue;a=["cell",i,"t"];switch(n.t){case"s":;case"str":a.push(r(n.v));break;case"n":if(!n.f){a[2]="v";a[3]=n.v;}else{a[2]="vtf";a[3]="n";a[4]=n.v;a[5]=r(n.f);}break;case"b":a[2]="vt"+(n.f?"f":"c");a[3]="nl";a[4]=n.v?"1":"0";a[5]=r(n.f||(n.v?"TRUE":"FALSE"));break;case"d":var c=ee(le(n.v));a[2]="vtc";a[3]="nd";a[4]=""+c;a[5]=n.w||O.format(n.z||O._table[14],c);break;case"e":continue;}t.push(a.join(":"));}}t.push("sheet:c:"+(s.e.c-s.s.c+1)+":r:"+(s.e.r-s.s.r+1)+":tvf:1");t.push("valueformat:1:text-wiki");return t.join("\n");}function c(e){return[i,s,f,s,o(e),l].join("\n");}return{to_workbook:n,to_sheet:a,from_sheet:c};}();var gf=function(){function e(e,r,t,a,n){if(n.raw)r[t][a]=e;else if(e===""){}else if(e==="TRUE")r[t][a]=true;else if(e==="FALSE")r[t][a]=false;else if(!isNaN(he(e)))r[t][a]=he(e);else if(!isNaN(de(e).getDate()))r[t][a]=le(e);else r[t][a]=e;}function r(r,t){var a=t||{};var n=[];if(!r||r.length===0)return n;var i=r.split(/[\r\n]/);var s=i.length-1;while(s>=0&&i[s].length===0){--s;}var f=10,l=0;var o=0;for(;o<=s;++o){l=i[o].indexOf(" ");if(l==-1)l=i[o].length;else l++;f=Math.max(f,l);}for(o=0;o<=s;++o){n[o]=[];var c=0;e(i[o].slice(0,f).trim(),n,o,c,a);for(c=1;c<=(i[o].length-f)/10+1;++c){e(i[o].slice(f+(c-1)*10,f+c*10).trim(),n,o,c,a);}}if(a.sheetRows)n=n.slice(0,a.sheetRows);return n;}var t={44:",",9:"\t",59:";",124:"|"};var a={44:3,9:2,59:1,124:0};function n(e){var r={},n=false,i=0,s=0;for(;i<e.length;++i){if((s=e.charCodeAt(i))==34)n=!n;else if(!n&&s in t)r[s]=(r[s]||0)+1;}s=[];for(i in r){if(Object.prototype.hasOwnProperty.call(r,i)){s.push([r[i],i]);}}if(!s.length){r=a;for(i in r){if(Object.prototype.hasOwnProperty.call(r,i)){s.push([r[i],i]);}}}s.sort(function(e,r){return e[0]-r[0]||a[e[1]]-a[r[1]];});return t[s.pop()[1]]||44;}function i(e,r){var t=r||{};var a="";if(m!=null&&t.dense==null)t.dense=m;var i=t.dense?[]:{};var s={s:{c:0,r:0},e:{c:0,r:0}};if(e.slice(0,4)=="sep="){if(e.charCodeAt(5)==13&&e.charCodeAt(6)==10){a=e.charAt(4);e=e.slice(7);}else if(e.charCodeAt(5)==13||e.charCodeAt(5)==10){a=e.charAt(4);e=e.slice(6);}else a=n(e.slice(0,1024));}else if(t&&t.FS)a=t.FS;else a=n(e.slice(0,1024));var f=0,l=0,o=0;var c=0,u=0,h=a.charCodeAt(0),d=false,v=0,p=e.charCodeAt(0);e=e.replace(/\r\n/gm,"\n");var b=t.dateNF!=null?M(t.dateNF):null;function g(){var r=e.slice(c,u);var a={};if(r.charAt(0)=='"'&&r.charAt(r.length-1)=='"')r=r.slice(1,-1).replace(/""/g,'"');if(r.length===0)a.t="z";else if(t.raw){a.t="s";a.v=r;}else if(r.trim().length===0){a.t="s";a.v=r;}else if(r.charCodeAt(0)==61){if(r.charCodeAt(1)==34&&r.charCodeAt(r.length-1)==34){a.t="s";a.v=r.slice(2,-1).replace(/""/g,'"');}else if(uc(r)){a.t="n";a.f=r.slice(1);}else{a.t="s";a.v=r;}}else if(r=="TRUE"){a.t="b";a.v=true;}else if(r=="FALSE"){a.t="b";a.v=false;}else if(!isNaN(o=he(r))){a.t="n";if(t.cellText!==false)a.w=r;a.v=o;}else if(!isNaN(de(r).getDate())||b&&r.match(b)){a.z=t.dateNF||O._table[14];var n=0;if(b&&r.match(b)){r=U(r,t.dateNF,r.match(b)||[]);n=1;}if(t.cellDates){a.t="d";a.v=le(r,n);}else{a.t="n";a.v=ee(le(r,n));}if(t.cellText!==false)a.w=O.format(a.z,a.v instanceof Date?ee(a.v):a.v);if(!t.cellNF)delete a.z;}else{a.t="s";a.v=r;}if(a.t=="z"){}else if(t.dense){if(!i[f])i[f]=[];i[f][l]=a;}else i[bt({c:l,r:f})]=a;c=u+1;p=e.charCodeAt(c);if(s.e.c<l)s.e.c=l;if(s.e.r<f)s.e.r=f;if(v==h)++l;else{l=0;++f;if(t.sheetRows&&t.sheetRows<=f)return true;}}e:for(;u<e.length;++u){switch(v=e.charCodeAt(u)){case 34:if(p===34)d=!d;break;case h:;case 10:;case 13:if(!d&&g())break e;break;default:break;}}if(u-c>0)g();i["!ref"]=wt(s);return i;}function s(e,t){if(!(t&&t.PRN))return i(e,t);if(t.FS)return i(e,t);if(e.slice(0,4)=="sep=")return i(e,t);if(e.indexOf("\t")>=0||e.indexOf(",")>=0||e.indexOf(";")>=0)return i(e,t);return Bt(r(e,t),t);}function f(e,r){var t="",a=r.type=="string"?[0,0,0,0]:rb(e,r);switch(r.type){case"base64":t=g.decode(e);break;case"binary":t=e;break;case"buffer":if(r.codepage==65001)t=e.toString("utf8");else if(r.codepage&&typeof cptable!=="undefined")t=cptable.utils.decode(r.codepage,e);else t=w&&Buffer.isBuffer(e)?e.toString("binary"):y(e);break;case"array":t=oe(e);break;case"string":t=e;break;default:throw new Error("Unrecognized type "+r.type);}if(a[0]==239&&a[1]==187&&a[2]==191)t=Ye(t.slice(3));else if(r.type!="string"&&r.codepage==65001)t=Ye(t);else if(r.type=="binary"&&typeof cptable!=="undefined"&&r.codepage)t=cptable.utils.decode(r.codepage,cptable.utils.encode(28591,t));if(t.slice(0,19)=="socialcalc:version:")return bf.to_sheet(r.type=="string"?t:Ye(t),r);return s(t,r);}function l(e,r){return _t(f(e,r),r);}function o(e){var r=[];var t=kt(e["!ref"]),a;var n=Array.isArray(e);for(var i=t.s.r;i<=t.e.r;++i){var s=[];for(var f=t.s.c;f<=t.e.c;++f){var l=bt({r:i,c:f});a=n?(e[i]||[])[f]:e[l];if(!a||a.v==null){s.push("          ");continue;}var o=(a.w||(St(a),a.w)||"").slice(0,10);while(o.length<10){o+=" ";}s.push(o+(f===0?" ":""));}r.push(s.join(""));}return r.join("\n");}return{to_workbook:l,to_sheet:f,from_sheet:o};}();function wf(e,r){var t=r||{},a=!!t.WTF;t.WTF=true;try{var n=pf.to_workbook(e,t);t.WTF=a;return n;}catch(i){t.WTF=a;if(!i.message.match(/SYLK bad record ID/)&&a)throw i;return gf.to_workbook(e,r);}}var kf=function(){function e(e,r,t){if(!e)return;Yr(e,e.l||0);var a=t.Enum||U;while(e.l<e.length){var n=e._R(2);var i=a[n]||a[65535];var s=e._R(2);var f=e.l+s;var l=i.f&&i.f(e,s,t);e.l=f;if(r(l,i,n))return;}}function r(e,r){switch(r.type){case"base64":return t(B(g.decode(e)),r);case"binary":return t(B(e),r);case"buffer":;case"array":return t(e,r);}throw"Unsupported type "+r.type;}function t(r,t){if(!r)return r;var a=t||{};if(m!=null&&a.dense==null)a.dense=m;var n=a.dense?[]:{},i="Sheet1",s=0;var f={},l=[i],o=[];var c={s:{r:0,c:0},e:{r:0,c:0}};var u=a.sheetRows||0;if(r[2]==2){a.Enum=U;e(r,function(e,r,t){switch(t){case 0:a.vers=e;if(e>=4096)a.qpro=true;break;case 6:c=e;break;case 15:;case 51:if(!a.qpro)e[1].v=e[1].v.slice(1);case 13:;case 14:;case 16:if(t==14&&(e[2]&112)==112&&(e[2]&15)>1&&(e[2]&15)<15){e[1].z=a.dateNF||O._table[14];if(a.cellDates){e[1].t="d";e[1].v=ne(e[1].v);}}var i=a.dense?(n[e[0].r]||[])[e[0].c]:n[bt(e[0])];if(i){i.t=e[1].t;i.v=e[1].v;if(e[1].z!=null)i.z=e[1].z;if(e[1].f!=null)i.f=e[1].f;break;}if(a.dense){if(!n[e[0].r])n[e[0].r]=[];n[e[0].r][e[0].c]=e[1];}else n[bt(e[0])]=e[1];break;default:;}},a);}else if(r[2]==26||r[2]==14){a.Enum=z;if(r[2]==14){a.qpro=true;r.l=0;}e(r,function(e,r,t){switch(t){case 22:e[1].v=e[1].v.slice(1);case 23:;case 24:;case 25:;case 37:;case 39:;case 40:if(e[3]>s){n["!ref"]=wt(c);f[i]=n;n=a.dense?[]:{};c={s:{r:0,c:0},e:{r:0,c:0}};s=e[3];i="Sheet"+(s+1);l.push(i);}if(u>0&&e[0].r>=u)break;if(a.dense){if(!n[e[0].r])n[e[0].r]=[];n[e[0].r][e[0].c]=e[1];}else n[bt(e[0])]=e[1];if(c.e.c<e[0].c)c.e.c=e[0].c;if(c.e.r<e[0].r)c.e.r=e[0].r;break;case 27:if(e[14e3])o[e[14e3][0]]=e[14e3][1];break;default:break;}},a);}else throw new Error("Unrecognized LOTUS BOF "+r[2]);n["!ref"]=wt(c);f[i]=n;if(!o.length)return{SheetNames:l,Sheets:f};var h={},d=[];for(var v=0;v<o.length;++v){if(f[l[v]]){d.push(o[v]);h[o[v]]=f[l[v]];}}return{SheetNames:d,Sheets:h};}function a(e,r){var t=r||{};if(+t.codepage>=0)l(+t.codepage);if(t.type=="string")throw new Error("Cannot write WK1 to JS string");var a=qr();var n=kt(e["!ref"]);var s=Array.isArray(e);var f=[];tm(a,0,i(1030));tm(a,6,o(n));for(var c=n.s.r;c<=n.e.r;++c){var u=lt(c);for(var d=n.s.c;d<=n.e.c;++d){if(c===n.s.r)f[d]=ht(d);var p=f[d]+u;var m=s?(e[c]||[])[d]:e[p];if(!m||m.t=="z")continue;if(m.t=="n"){if((m.v|0)==m.v&&m.v>=-32768&&m.v<=32767)tm(a,13,v(c,d,m.v));else tm(a,14,b(c,d,m.v));}else{var g=St(m);tm(a,15,h(c,d,g.slice(0,239)));}}}tm(a,1);return a.end();}function n(e,r){var t=r||{};if(+t.codepage>=0)l(+t.codepage);if(t.type=="string")throw new Error("Cannot write WK3 to JS string");var a=qr();tm(a,0,s(e));for(var n=0,i=0;n<e.SheetNames.length;++n){if((e.Sheets[e.SheetNames[n]]||{})["!ref"])tm(a,27,M(e.SheetNames[n],i++));}var f=0;for(n=0;n<e.SheetNames.length;++n){var o=e.Sheets[e.SheetNames[n]];if(!o||!o["!ref"])continue;var c=kt(o["!ref"]);var u=Array.isArray(o);var h=[];for(var d=c.s.r;d<=c.e.r;++d){var v=lt(d);for(var p=c.s.c;p<=c.e.c;++p){if(d===c.s.r)h[p]=ht(p);var m=h[p]+v;var b=u?(o[d]||[])[p]:o[m];if(!b||b.t=="z")continue;if(b.t=="n"){tm(a,23,R(d,p,f,b.v));}else{var g=St(b);tm(a,22,x(d,p,f,g.slice(0,239)));}}}++f;}tm(a,1);return a.end();}function i(e){var r=Jr(2);r._W(2,e);return r;}function s(e){var r=Jr(26);r._W(2,4096);r._W(2,4);r._W(4,0);var t=0,a=0,n=0;for(var i=0;i<e.SheetNames.length;++i){var s=e.SheetNames[i];var f=e.Sheets[s];if(!f||!f["!ref"])continue;++n;var l=gt(f["!ref"]);if(t<l.e.r)t=l.e.r;if(a<l.e.c)a=l.e.c;}r._W(2,t);r._W(1,n);r._W(1,a);r._W(2,0);r._W(2,0);r._W(1,1);r._W(1,2);r._W(4,0);r._W(4,0);return r;}function f(e){var r={s:{c:0,r:0},e:{c:0,r:0}};r.s.c=e._R(2);r.s.r=e._R(2);r.e.c=e._R(2);r.e.r=e._R(2);if(r.s.c==65535)r.s.c=r.e.c=r.s.r=r.e.r=0;return r;}function o(e){var r=Jr(8);r._W(2,e.s.c);r._W(2,e.s.r);r._W(2,e.e.c);r._W(2,e.e.r);return r;}function c(e,r,t){var a=[{c:0,r:0},{t:"n",v:0},0];if(t.qpro&&t.vers!=20768){a[0].c=e._R(1);e.l++;a[0].r=e._R(2);e.l+=2;}else{a[2]=e._R(1);a[0].c=e._R(2);a[0].r=e._R(2);}return a;}function u(e,r,t){var a=e.l+r;var n=c(e,r,t);n[1].t="s";if(t.vers==20768){e.l++;var i=e._R(1);n[1].v=e._R(i,"utf8");return n;}if(t.qpro)e.l++;n[1].v=e._R(a-e.l,"cstr");return n;}function h(e,r,t){var a=Jr(7+t.length);a._W(1,255);a._W(2,r);a._W(2,e);a._W(1,39);for(var n=0;n<a.length;++n){var i=t.charCodeAt(n);a._W(1,i>=128?95:i);}a._W(1,0);return a;}function d(e,r,t){var a=c(e,r,t);a[1].v=e._R(2,"i");return a;}function v(e,r,t){var a=Jr(7);a._W(1,255);a._W(2,r);a._W(2,e);a._W(2,t,"i");return a;}function p(e,r,t){var a=c(e,r,t);a[1].v=e._R(8,"f");return a;}function b(e,r,t){var a=Jr(13);a._W(1,255);a._W(2,r);a._W(2,e);a._W(8,t,"f");return a;}function w(e,r,t){var a=e.l+r;var n=c(e,r,t);n[1].v=e._R(8,"f");if(t.qpro)e.l=a;else{var i=e._R(2);C(e.slice(e.l,e.l+i),n);e.l+=i;}return n;}function k(e,r,t){var a=r&32768;r&=~32768;r=(a?e:0)+(r>=8192?r-16384:r);return(a?"":"$")+(t?ht(r):lt(r));}var E=[8,8,8,8,8,8,8,8,6,4,4,5,5,7,3,3,3,3,3,3,1,1,2,6,8,8,8,8,8,8,8,8];var S={51:["FALSE",0],52:["TRUE",0],70:["LEN",1],80:["SUM",69],81:["AVERAGEA",69],82:["COUNTA",69],83:["MINA",69],84:["MAXA",69],111:["T",1]};var _=["","","","","","","","","","+","-","*","/","^","=","<>","<=",">=","<",">","","","","","&","","","","","","",""];function C(e,r){Yr(e,0);var t=[],a=0,n="",i="";while(e.l<e.length){var s=e[e.l++];switch(s){case 0:t.push(e._R(8,"f"));break;case 1:{i=k(r[0].c,e._R(2),true);n=k(r[0].r,e._R(2),false);t.push(i+n);}break;case 2:{var f=k(r[0].c,e._R(2),true);var l=k(r[0].r,e._R(2),false);i=k(r[0].c,e._R(2),true);n=k(r[0].r,e._R(2),false);t.push(f+l+":"+i+n);}break;case 3:if(e.l<e.length){console.error("WK1 premature formula end");return;}break;case 4:t.push("("+t.pop()+")");break;case 5:t.push(e._R(2));break;case 6:{var o="";while(s=e[e.l++]){o+=String.fromCharCode(s);}t.push('"'+o.replace(/"/g,'""')+'"');break;}break;case 8:t.push("-"+t.pop());break;case 23:t.push("+"+t.pop());break;case 22:t.push("NOT("+t.pop()+")");break;case 20:;case 21:{var c=t.pop(),u=t.pop();t.push(["AND","OR"][s-20]+"("+u+","+c+")");}break;default:if(s<32&&_[s]){c=t.pop();u=t.pop();t.push(u+_[s]+c);}else if(S[s]){a=S[s][1];if(a==69)a=e[e.l++];if(a>t.length){console.error("WK1 bad formula parse 0x"+s.toString(16)+":|"+t.join("|")+"|");return;}var h=t.slice(-a);t.length-=a;t.push(S[s][0]+"("+h.join(",")+")");}else if(s<=7)return console.error("WK1 invalid opcode "+s.toString(16));else if(s<=24)return console.error("WK1 unsupported op "+s.toString(16));else if(s<=30)return console.error("WK1 invalid opcode "+s.toString(16));else if(s<=115)return console.error("WK1 unsupported function opcode "+s.toString(16));else return console.error("WK1 unrecognized opcode "+s.toString(16));}}if(t.length==1)r[1].f=""+t[0];else console.error("WK1 bad formula parse |"+t.join("|")+"|");}function T(e){var r=[{c:0,r:0},{t:"n",v:0},0];r[0].r=e._R(2);r[3]=e[e.l++];r[0].c=e[e.l++];return r;}function y(e,r){var t=T(e,r);t[1].t="s";t[1].v=e._R(r-4,"cstr");return t;}function x(e,r,t,a){var n=Jr(6+a.length);n._W(2,e);n._W(1,t);n._W(1,r);n._W(1,39);for(var i=0;i<a.length;++i){var s=a.charCodeAt(i);n._W(1,s>=128?95:s);}n._W(1,0);return n;}function A(e,r){var t=T(e,r);t[1].v=e._R(2);var a=t[1].v>>1;if(t[1].v&1){switch(a&7){case 0:a=(a>>3)*5e3;break;case 1:a=(a>>3)*500;break;case 2:a=(a>>3)/20;break;case 3:a=(a>>3)/200;break;case 4:a=(a>>3)/2e3;break;case 5:a=(a>>3)/2e4;break;case 6:a=(a>>3)/16;break;case 7:a=(a>>3)/64;break;}}t[1].v=a;return t;}function I(e,r){var t=T(e,r);var a=e._R(4);var n=e._R(4);var i=e._R(2);if(i==65535){if(a===0&&n===3221225472){t[1].t="e";t[1].v=15;}else if(a===0&&n===3489660928){t[1].t="e";t[1].v=42;}else t[1].v=0;return t;}var s=i&32768;i=(i&32767)-16446;t[1].v=(1-s*2)*(n*Math.pow(2,i+32)+a*Math.pow(2,i));return t;}function R(e,r,t,a){var n=Jr(14);n._W(2,e);n._W(1,t);n._W(1,r);if(a==0){n._W(4,0);n._W(4,0);n._W(2,65535);return n;}var i=0,s=0,f=0,l=0;if(a<0){i=1;a=-a;}s=Math.log2(a)|0;a/=Math.pow(2,s-31);l=a>>>0;if((l&2147483648)==0){a/=2;++s;l=a>>>0;}a-=l;l|=2147483648;l>>>=0;a*=Math.pow(2,32);f=a>>>0;n._W(4,f);n._W(4,l);s+=16383+(i?32768:0);n._W(2,s);return n;}function F(e,r){var t=I(e,14);e.l+=r-14;return t;}function D(e,r){var t=T(e,r);var a=e._R(4);t[1].v=a>>6;return t;}function P(e,r){var t=T(e,r);var a=e._R(8,"f");t[1].v=a;return t;}function N(e,r){var t=P(e,14);e.l+=r-10;return t;}function L(e,r){var t={},a=e.l+r;while(e.l<a){var n=e._R(2);if(n==14e3){t[n]=[0,""];t[n][0]=e._R(2);while(e[e.l]){t[n][1]+=String.fromCharCode(e[e.l]);e.l++;}e.l++;}}return t;}function M(e,r){var t=Jr(5+e.length);t._W(2,14e3);t._W(2,r);for(var a=0;a<e.length;++a){var n=e.charCodeAt(a);t[t.l++]=n>127?95:n;}t[t.l++]=0;return t;}var U={0:{n:"BOF",f:$n},1:{n:"EOF"},2:{n:"CALCMODE"},3:{n:"CALCORDER"},4:{n:"SPLIT"},5:{n:"SYNC"},6:{n:"RANGE",f:f},7:{n:"WINDOW1"},8:{n:"COLW1"},9:{n:"WINTWO"},10:{n:"COLW2"},11:{n:"NAME"},12:{n:"BLANK"},13:{n:"INTEGER",f:d},14:{n:"NUMBER",f:p},15:{n:"LABEL",f:u},16:{n:"FORMULA",f:w},24:{n:"TABLE"},25:{n:"ORANGE"},26:{n:"PRANGE"},27:{n:"SRANGE"},28:{n:"FRANGE"},29:{n:"KRANGE1"},32:{n:"HRANGE"},35:{n:"KRANGE2"},36:{n:"PROTEC"},37:{n:"FOOTER"},38:{n:"HEADER"},39:{n:"SETUP"},40:{n:"MARGINS"},41:{n:"LABELFMT"},42:{n:"TITLES"},43:{n:"SHEETJS"},45:{n:"GRAPH"},46:{n:"NGRAPH"},47:{n:"CALCCOUNT"},48:{n:"UNFORMATTED"},49:{n:"CURSORW12"},50:{n:"WINDOW"},51:{n:"STRING",f:u},55:{n:"PASSWORD"},56:{n:"LOCKED"},60:{n:"QUERY"},61:{n:"QUERYNAME"},62:{n:"PRINT"},63:{n:"PRINTNAME"},64:{n:"GRAPH2"},65:{n:"GRAPHNAME"},66:{n:"ZOOM"},67:{n:"SYMSPLIT"},68:{n:"NSROWS"},69:{n:"NSCOLS"},70:{n:"RULER"},71:{n:"NNAME"},72:{n:"ACOMM"},73:{n:"AMACRO"},74:{n:"PARSE"},102:{n:"PRANGES??"},103:{n:"RRANGES??"},104:{n:"FNAME??"},105:{n:"MRANGES??"},65535:{n:""}};var z={0:{n:"BOF"},1:{n:"EOF"},2:{n:"PASSWORD"},3:{n:"CALCSET"},4:{n:"WINDOWSET"},5:{n:"SHEETCELLPTR"},6:{n:"SHEETLAYOUT"},7:{n:"COLUMNWIDTH"},8:{n:"HIDDENCOLUMN"},9:{n:"USERRANGE"},10:{n:"SYSTEMRANGE"},11:{n:"ZEROFORCE"},12:{n:"SORTKEYDIR"},13:{n:"FILESEAL"},14:{n:"DATAFILLNUMS"},15:{n:"PRINTMAIN"},16:{n:"PRINTSTRING"},17:{n:"GRAPHMAIN"},18:{n:"GRAPHSTRING"},19:{n:"??"},20:{n:"ERRCELL"},21:{n:"NACELL"},22:{n:"LABEL16",f:y},23:{n:"NUMBER17",f:I},24:{n:"NUMBER18",f:A},25:{n:"FORMULA19",f:F},26:{n:"FORMULA1A"},27:{n:"XFORMAT",f:L},28:{n:"DTLABELMISC"},29:{n:"DTLABELCELL"},30:{n:"GRAPHWINDOW"},31:{n:"CPA"},32:{n:"LPLAUTO"},33:{n:"QUERY"},34:{n:"HIDDENSHEET"},35:{n:"??"},37:{n:"NUMBER25",f:D},38:{n:"??"},39:{n:"NUMBER27",f:P},40:{n:"FORMULA28",f:N},142:{n:"??"},147:{n:"??"},150:{n:"??"},151:{n:"??"},152:{n:"??"},153:{n:"??"},154:{n:"??"},155:{n:"??"},156:{n:"??"},163:{n:"??"},174:{n:"??"},175:{n:"??"},176:{n:"??"},177:{n:"??"},184:{n:"??"},185:{n:"??"},186:{n:"??"},187:{n:"??"},188:{n:"??"},195:{n:"??"},201:{n:"??"},205:{n:"??"},206:{n:"??"},207:{n:"??"},208:{n:"??"},256:{n:"??"},259:{n:"??"},260:{n:"??"},261:{n:"??"},262:{n:"??"},263:{n:"??"},265:{n:"??"},266:{n:"??"},267:{n:"??"},268:{n:"??"},270:{n:"??"},271:{n:"??"},384:{n:"??"},389:{n:"??"},390:{n:"??"},393:{n:"??"},396:{n:"??"},512:{n:"??"},514:{n:"??"},513:{n:"??"},516:{n:"??"},517:{n:"??"},640:{n:"??"},641:{n:"??"},642:{n:"??"},643:{n:"??"},644:{n:"??"},645:{n:"??"},646:{n:"??"},647:{n:"??"},648:{n:"??"},658:{n:"??"},659:{n:"??"},660:{n:"??"},661:{n:"??"},662:{n:"??"},665:{n:"??"},666:{n:"??"},768:{n:"??"},772:{n:"??"},1600:{n:"??"},1602:{n:"??"},1793:{n:"??"},1794:{n:"??"},1795:{n:"??"},1796:{n:"??"},1920:{n:"??"},2048:{n:"??"},2049:{n:"??"},2052:{n:"??"},2688:{n:"??"},10998:{n:"??"},12849:{n:"??"},28233:{n:"??"},28484:{n:"??"},65535:{n:""}};return{sheet_to_wk1:a,book_to_wk3:n,to_workbook:r};}();function Ef(e){var r={},t=e.match(Re),a=0;var n=false;if(t)for(;a!=t.length;++a){var s=De(t[a]);switch(s[0].replace(/\w*:/g,"")){case"<condense":break;case"<extend":break;case"<shadow":if(!s.val)break;case"<shadow>":;case"<shadow/>":r.shadow=1;break;case"</shadow>":break;case"<charset":if(s.val=="1")break;r.cp=i[parseInt(s.val,10)];break;case"<outline":if(!s.val)break;case"<outline>":;case"<outline/>":r.outline=1;break;case"</outline>":break;case"<rFont":r.name=s.val;break;case"<sz":r.sz=s.val;break;case"<strike":if(!s.val)break;case"<strike>":;case"<strike/>":r.strike=1;break;case"</strike>":break;case"<u":if(!s.val)break;switch(s.val){case"double":r.uval="double";break;case"singleAccounting":r.uval="single-accounting";break;case"doubleAccounting":r.uval="double-accounting";break;};case"<u>":;case"<u/>":r.u=1;break;case"</u>":break;case"<b":if(s.val=="0")break;case"<b>":;case"<b/>":r.b=1;break;case"</b>":break;case"<i":if(s.val=="0")break;case"<i>":;case"<i/>":r.i=1;break;case"</i>":break;case"<color":if(s.rgb)r.color=s.rgb.slice(2,8);break;case"<family":r.family=s.val;break;case"<vertAlign":r.valign=s.val;break;case"<scheme":break;case"<extLst":;case"<extLst>":;case"</extLst>":break;case"<ext":n=true;break;case"</ext>":n=false;break;default:if(s[0].charCodeAt(1)!==47&&!n)throw new Error("Unrecognized rich format "+s[0]);}}return r;}var Sf=function(){var e=er("t"),r=er("rPr");function t(t){var a=t.match(e);if(!a)return{t:"s",v:""};var n={t:"s",v:Me(a[1])};var i=t.match(r);if(i)n.s=Ef(i[1]);return n;}var a=/<(?:\w+:)?r>/g,n=/<\/(?:\w+:)?r>/;return function i(e){return e.replace(a,"").split(n).map(t).filter(function(e){return e.v;});};}();var _f=function Qb(){var e=/(\r\n|\n)/g;function r(e,r,t){var a=[];if(e.u)a.push("text-decoration: underline;");if(e.uval)a.push("text-underline-style:"+e.uval+";");if(e.sz)a.push("font-size:"+e.sz+"pt;");if(e.outline)a.push("text-effect: outline;");if(e.shadow)a.push("text-shadow: auto;");r.push('<span style="'+a.join("")+'">');if(e.b){r.push("<b>");t.push("</b>");}if(e.i){r.push("<i>");t.push("</i>");}if(e.strike){r.push("<s>");t.push("</s>");}var n=e.valign||"";if(n=="superscript"||n=="super")n="sup";else if(n=="subscript")n="sub";if(n!=""){r.push("<"+n+">");t.push("</"+n+">");}t.push("</span>");return e;}function t(t){var a=[[],t.v,[]];if(!t.v)return"";if(t.s)r(t.s,a[0],a[2]);return a[0].join("")+a[1].replace(e,"<br/>")+a[2].join("");}return function a(e){return e.map(t).join("");};}();var Cf=/<(?:\w+:)?t[^>]*>([^<]*)<\/(?:\w+:)?t>/g,Bf=/<(?:\w+:)?r>/;var Tf=/<(?:\w+:)?rPh.*?>([\s\S]*?)<\/(?:\w+:)?rPh>/g;function yf(e,r){var t=r?r.cellHTML:true;var a={};if(!e)return{t:""};if(e.match(/^\s*<(?:\w+:)?t[^>]*>/)){a.t=Me(Ye(e.slice(e.indexOf(">")+1).split(/<\/(?:\w+:)?t>/)[0]||""));a.r=Ye(e);if(t)a.h=Xe(a.t);}else if(e.match(Bf)){a.r=Ye(e);a.t=Me(Ye((e.replace(Tf,"").match(Cf)||[]).join("").replace(Re,"")));if(t)a.h=_f(Sf(a.r));}return a;}var xf=/<(?:\w+:)?sst([^>]*)>([\s\S]*)<\/(?:\w+:)?sst>/;var Af=/<(?:\w+:)?(?:si|sstItem)>/g;var If=/<\/(?:\w+:)?(?:si|sstItem)>/;function Rf(e,r){var t=[],a="";if(!e)return t;var n=e.match(xf);if(n){a=n[2].replace(Af,"").split(If);for(var i=0;i!=a.length;++i){var s=yf(a[i].trim(),r);if(s!=null)t[t.length]=s;}n=De(n[1]);t.Count=n.count;t.Unique=n.uniqueCount;}return t;}Ua.SST="http://schemas.openxmlformats.org/officeDocument/2006/relationships/sharedStrings";var Ff=/^\s|\s$|[\t\n\r]/;function Of(e,r){if(!r.bookSST)return"";var t=[Ae];t[t.length]=or("sst",null,{xmlns:hr.main[0],count:e.Count,uniqueCount:e.Unique});for(var a=0;a!=e.length;++a){if(e[a]==null)continue;var n=e[a];var i="<si>";if(n.r)i+=n.r;else{i+="<t";if(!n.t)n.t="";if(n.t.match(Ff))i+=' xml:space="preserve"';i+=">"+He(n.t)+"</t>";}i+="</si>";t[t.length]=i;}if(t.length>2){t[t.length]="</sst>";t[1]=t[1].replace("/>",">");}return t.join("");}function Df(e){return[e._R(4),e._R(4)];}function Pf(e,r){var t=[];var a=false;Qr(e,function n(e,i,s){switch(s){case 159:t.Count=e[0];t.Unique=e[1];break;case 19:t.push(e);break;case 160:return true;case 35:a=true;break;case 36:a=false;break;default:if(i.indexOf("Begin")>0){}else if(i.indexOf("End")>0){}if(!a||r.WTF)throw new Error("Unexpected record "+s+" "+i);}});return t;}function Nf(e,r){if(!r)r=Jr(8);r._W(4,e.Count);r._W(4,e.Unique);return r;}var Lf=Ft;function Mf(e){var r=qr();et(r,"BrtBeginSst",Nf(e));for(var t=0;t<e.length;++t){et(r,"BrtSSTItem",Lf(e[t]));}et(r,"BrtEndSst");return r.end();}function Uf(e){if(typeof cptable!=="undefined")return cptable.utils.encode(t,e);var r=[],a=e.split("");for(var n=0;n<a.length;++n){r[n]=a[n].charCodeAt(0);}return r;}function zf(e,r){var t={};t.Major=e._R(2);t.Minor=e._R(2);if(r>=4)e.l+=r-4;return t;}function Hf(e){var r={};r.id=e._R(0,"lpp4");r.R=zf(e,4);r.U=zf(e,4);r.W=zf(e,4);return r;}function Wf(e){var r=e._R(4);var t=e.l+r-4;var a={};var n=e._R(4);var i=[];while(n-->0){i.push({t:e._R(4),v:e._R(0,"lpp4")});}a.name=e._R(0,"lpp4");a.comps=i;if(e.l!=t)throw new Error("Bad DataSpaceMapEntry: "+e.l+" != "+t);return a;}function Vf(e){var r=[];e.l+=4;var t=e._R(4);while(t-->0){r.push(Wf(e));}return r;}function Xf(e){var r=[];e.l+=4;var t=e._R(4);while(t-->0){r.push(e._R(0,"lpp4"));}return r;}function Gf(e){var r={};e._R(4);e.l+=4;r.id=e._R(0,"lpp4");r.name=e._R(0,"lpp4");r.R=zf(e,4);r.U=zf(e,4);r.W=zf(e,4);return r;}function jf(e){var r=Gf(e);r.ename=e._R(0,"8lpp4");r.blksz=e._R(4);r.cmode=e._R(4);if(e._R(4)!=4)throw new Error("Bad !Primary record");return r;}function Kf(e,r){var t=e.l+r;var a={};a.Flags=e._R(4)&63;e.l+=4;a.AlgID=e._R(4);var n=false;switch(a.AlgID){case 26126:;case 26127:;case 26128:n=a.Flags==36;break;case 26625:n=a.Flags==4;break;case 0:n=a.Flags==16||a.Flags==4||a.Flags==36;break;default:throw"Unrecognized encryption algorithm: "+a.AlgID;}if(!n)throw new Error("Encryption Flags/AlgID mismatch");a.AlgIDHash=e._R(4);a.KeySize=e._R(4);a.ProviderType=e._R(4);e.l+=8;a.CSPName=e._R(t-e.l>>1,"utf16le");e.l=t;return a;}function $f(e,r){var t={},a=e.l+r;e.l+=4;t.Salt=e.slice(e.l,e.l+16);e.l+=16;t.Verifier=e.slice(e.l,e.l+16);e.l+=16;e._R(4);t.VerifierHash=e.slice(e.l,a);e.l=a;return t;}function Yf(e){var r=zf(e);switch(r.Minor){case 2:return[r.Minor,Zf(e,r)];case 3:return[r.Minor,Jf(e,r)];case 4:return[r.Minor,Qf(e,r)];}throw new Error("ECMA-376 Encrypted file unrecognized Version: "+r.Minor);}function Zf(e){var r=e._R(4);if((r&63)!=36)throw new Error("EncryptionInfo mismatch");var t=e._R(4);var a=Kf(e,t);var n=$f(e,e.length-e.l);return{t:"Std",h:a,v:n};}function Jf(){throw new Error("File is password-protected: ECMA-376 Extensible");}function Qf(e){var r=["saltSize","blockSize","keyBits","hashSize","cipherAlgorithm","cipherChaining","hashAlgorithm","saltValue"];e.l+=4;var t=e._R(e.length-e.l,"utf8");var a={};t.replace(Re,function n(e){var t=De(e);switch(Pe(t[0])){case"<?xml":break;case"<encryption":;case"</encryption>":break;case"<keyData":r.forEach(function(e){a[e]=t[e];});break;case"<dataIntegrity":a.encryptedHmacKey=t.encryptedHmacKey;a.encryptedHmacValue=t.encryptedHmacValue;break;case"<keyEncryptors>":;case"<keyEncryptors":a.encs=[];break;case"</keyEncryptors>":break;case"<keyEncryptor":a.uri=t.uri;break;case"</keyEncryptor>":break;case"<encryptedKey":a.encs.push(t);break;default:throw t[0];}});return a;}function qf(e,r){var t={};var a=t.EncryptionVersionInfo=zf(e,4);r-=4;if(a.Minor!=2)throw new Error("unrecognized minor version code: "+a.Minor);if(a.Major>4||a.Major<2)throw new Error("unrecognized major version code: "+a.Major);t.Flags=e._R(4);r-=4;var n=e._R(4);r-=4;t.EncryptionHeader=Kf(e,n);r-=n;t.EncryptionVerifier=$f(e,r);return t;}function el(e){var r={};var t=r.EncryptionVersionInfo=zf(e,4);if(t.Major!=1||t.Minor!=1)throw"unrecognized version code "+t.Major+" : "+t.Minor;r.Salt=e._R(16);r.EncryptedVerifier=e._R(16);r.EncryptedVerifierHash=e._R(16);return r;}function rl(e){var r=0,t;var a=Uf(e);var n=a.length+1,i,s;var f,l,o;t=_(n);t[0]=a.length;for(i=1;i!=n;++i){t[i]=a[i-1];}for(i=n-1;i>=0;--i){s=t[i];f=(r&16384)===0?0:1;l=r<<1&32767;o=f|l;r=o^s;}return r^52811;}var tl=function(){var e=[187,255,255,186,255,255,185,128,0,190,15,0,191,15,0];var r=[57840,7439,52380,33984,4364,3600,61902,12606,6258,57657,54287,34041,10252,43370,20163];var t=[44796,19929,39858,10053,20106,40212,10761,31585,63170,64933,60267,50935,40399,11199,17763,35526,1453,2906,5812,11624,23248,885,1770,3540,7080,14160,28320,56640,55369,41139,20807,41614,21821,43642,17621,28485,56970,44341,19019,38038,14605,29210,60195,50791,40175,10751,21502,43004,24537,18387,36774,3949,7898,15796,31592,63184,47201,24803,49606,37805,14203,28406,56812,17824,35648,1697,3394,6788,13576,27152,43601,17539,35078,557,1114,2228,4456,30388,60776,51953,34243,7079,14158,28316,14128,28256,56512,43425,17251,34502,7597,13105,26210,52420,35241,883,1766,3532,4129,8258,16516,33032,4657,9314,18628];var a=function a(e){return(e/2|e*128)&255;};var n=function n(e,r){return a(e^r);};var i=function i(e){var a=r[e.length-1];var n=104;for(var i=e.length-1;i>=0;--i){var s=e[i];for(var f=0;f!=7;++f){if(s&64)a^=t[n];s*=2;--n;}}return a;};return function(r){var t=Uf(r);var a=i(t);var s=t.length;var f=_(16);for(var l=0;l!=16;++l){f[l]=0;}var o,c,u;if((s&1)===1){o=a>>8;f[s]=n(e[0],o);--s;o=a&255;c=t[t.length-1];f[s]=n(c,o);}while(s>0){--s;o=a>>8;f[s]=n(t[s],o);--s;o=a&255;f[s]=n(t[s],o);}s=15;u=15-t.length;while(u>0){o=a>>8;f[s]=n(e[u],o);--s;--u;o=a&255;f[s]=n(t[s],o);--s;--u;}return f;};}();var al=function al(e,r,t,a,n){if(!n)n=r;if(!a)a=tl(e);var i,s;for(i=0;i!=r.length;++i){s=r[i];s^=a[t];s=(s>>5|s<<3)&255;n[i]=s;++t;}return[n,t,a];};var nl=function nl(e){var r=0,t=tl(e);return function(e){var a=al("",e,r,t);r=a[1];return a[0];};};function il(e,r,t,a){var n={key:$n(e),verificationBytes:$n(e)};if(t.password)n.verifier=rl(t.password);a.valid=n.verificationBytes===n.verifier;if(a.valid)a.insitu=nl(t.password);return n;}function sl(e,r,t){var a=t||{};a.Info=e._R(2);e.l-=2;if(a.Info===1)a.Data=el(e,r);else a.Data=qf(e,r);return a;}function fl(e,r,t){var a={Type:t.biff>=8?e._R(2):0};if(a.Type)sl(e,r-2,a);else il(e,t.biff>=8?r:r-2,t,a);return a;}var ll=function(){function e(e,t){switch(t.type){case"base64":return r(g.decode(e),t);case"binary":return r(e,t);case"buffer":return r(w&&Buffer.isBuffer(e)?e.toString("binary"):y(e),t);case"array":return r(oe(e),t);}throw new Error("Unrecognized type "+t.type);}function r(e,r){var t=r||{};var a=t.dense?[]:{};var n=e.match(/\\trowd.*?\\row\b/g);if(!n.length)throw new Error("RTF missing table");var i={s:{c:0,r:0},e:{c:0,r:n.length-1}};n.forEach(function(e,r){if(Array.isArray(a))a[r]=[];var t=/\\\w+\b/g;var n=0;var s;var f=-1;while(s=t.exec(e)){switch(s[0]){case"\\cell":var l=e.slice(n,t.lastIndex-s[0].length);if(l[0]==" ")l=l.slice(1);++f;if(l.length){var o={v:l,t:"s"};if(Array.isArray(a))a[r][f]=o;else a[bt({r:r,c:f})]=o;}break;}n=t.lastIndex;}if(f>i.e.c)i.e.c=f;});a["!ref"]=wt(i);return a;}function t(r,t){return _t(e(r,t),t);}function a(e){var r=["{\\rtf1\\ansi"];var t=kt(e["!ref"]),a;var n=Array.isArray(e);for(var i=t.s.r;i<=t.e.r;++i){r.push("\\trowd\\trautofit1");for(var s=t.s.c;s<=t.e.c;++s){r.push("\\cellx"+(s+1));}r.push("\\pard\\intbl");for(s=t.s.c;s<=t.e.c;++s){var f=bt({r:i,c:s});a=n?(e[i]||[])[s]:e[f];if(!a||a.v==null&&(!a.f||a.F))continue;r.push(" "+(a.w||(St(a),a.w)));r.push("\\cell");}r.push("\\pard\\intbl\\row");}return r.join("")+"}";}return{to_workbook:t,to_sheet:e,from_sheet:a};}();function ol(e){var r=e.slice(e[0]==="#"?1:0).slice(0,6);return[parseInt(r.slice(0,2),16),parseInt(r.slice(2,4),16),parseInt(r.slice(4,6),16)];}function cl(e){for(var r=0,t=1;r!=3;++r){t=t*256+(e[r]>255?255:e[r]<0?0:e[r]);}return t.toString(16).toUpperCase().slice(1);}function ul(e){var r=e[0]/255,t=e[1]/255,a=e[2]/255;var n=Math.max(r,t,a),i=Math.min(r,t,a),s=n-i;if(s===0)return[0,0,r];var f=0,l=0,o=n+i;l=s/(o>1?2-o:o);switch(n){case r:f=((t-a)/s+6)%6;break;case t:f=(a-r)/s+2;break;case a:f=(r-t)/s+4;break;}return[f/6,l,o/2];}function hl(e){var r=e[0],t=e[1],a=e[2];var n=t*2*(a<.5?a:1-a),i=a-n/2;var s=[i,i,i],f=6*r;var l;if(t!==0)switch(f|0){case 0:;case 6:l=n*f;s[0]+=n;s[1]+=l;break;case 1:l=n*(2-f);s[0]+=l;s[1]+=n;break;case 2:l=n*(f-2);s[1]+=n;s[2]+=l;break;case 3:l=n*(4-f);s[1]+=l;s[2]+=n;break;case 4:l=n*(f-4);s[2]+=n;s[0]+=l;break;case 5:l=n*(6-f);s[2]+=l;s[0]+=n;break;}for(var o=0;o!=3;++o){s[o]=Math.round(s[o]*255);}return s;}function dl(e,r){if(r===0)return e;var t=ul(ol(e));if(r<0)t[2]=t[2]*(1+r);else t[2]=1-(1-t[2])*(1-r);return cl(hl(t));}var vl=6,pl=15,ml=1,bl=vl;function gl(e){return Math.floor((e+Math.round(128/bl)/256)*bl);}function wl(e){return Math.floor((e-5)/bl*100+.5)/100;}function kl(e){return Math.round((e*bl+5)/bl*256)/256;}function El(e){return kl(wl(gl(e)));}function Sl(e){var r=Math.abs(e-El(e)),t=bl;if(r>.005)for(bl=ml;bl<pl;++bl){if(Math.abs(e-El(e))<=r){r=Math.abs(e-El(e));t=bl;}}bl=t;}function _l(e){if(e.width){e.wpx=gl(e.width);e.wch=wl(e.wpx);e.MDW=bl;}else if(e.wpx){e.wch=wl(e.wpx);e.width=kl(e.wch);e.MDW=bl;}else if(typeof e.wch=="number"){e.width=kl(e.wch);e.wpx=gl(e.width);e.MDW=bl;}if(e.customWidth)delete e.customWidth;}var Cl=96,Bl=Cl;function Tl(e){return e*96/Bl;}function yl(e){return e*Bl/96;}var xl={None:"none",Solid:"solid",Gray50:"mediumGray",Gray75:"darkGray",Gray25:"lightGray",HorzStripe:"darkHorizontal",VertStripe:"darkVertical",ReverseDiagStripe:"darkDown",DiagStripe:"darkUp",DiagCross:"darkGrid",ThickDiagCross:"darkTrellis",ThinHorzStripe:"lightHorizontal",ThinVertStripe:"lightVertical",ThinReverseDiagStripe:"lightDown",ThinHorzCross:"lightGrid"};function Al(e,r,t,a){r.Borders=[];var n={};var i=false;(e[0].match(Re)||[]).forEach(function(e){var t=De(e);switch(Pe(t[0])){case"<borders":;case"<borders>":;case"</borders>":break;case"<border":;case"<border>":;case"<border/>":n={};if(t.diagonalUp)n.diagonalUp=$e(t.diagonalUp);if(t.diagonalDown)n.diagonalDown=$e(t.diagonalDown);r.Borders.push(n);break;case"</border>":break;case"<left/>":break;case"<left":;case"<left>":break;case"</left>":break;case"<right/>":break;case"<right":;case"<right>":break;case"</right>":break;case"<top/>":break;case"<top":;case"<top>":break;case"</top>":break;case"<bottom/>":break;case"<bottom":;case"<bottom>":break;case"</bottom>":break;case"<diagonal":;case"<diagonal>":;case"<diagonal/>":break;case"</diagonal>":break;case"<horizontal":;case"<horizontal>":;case"<horizontal/>":break;case"</horizontal>":break;case"<vertical":;case"<vertical>":;case"<vertical/>":break;case"</vertical>":break;case"<start":;case"<start>":;case"<start/>":break;case"</start>":break;case"<end":;case"<end>":;case"<end/>":break;case"</end>":break;case"<color":;case"<color>":break;case"<color/>":;case"</color>":break;case"<extLst":;case"<extLst>":;case"</extLst>":break;case"<ext":i=true;break;case"</ext>":i=false;break;default:if(a&&a.WTF){if(!i)throw new Error("unrecognized "+t[0]+" in borders");};}});}function Il(e,r,t,a){r.Fills=[];var n={};var i=false;(e[0].match(Re)||[]).forEach(function(e){var t=De(e);switch(Pe(t[0])){case"<fills":;case"<fills>":;case"</fills>":break;case"<fill>":;case"<fill":;case"<fill/>":n={};r.Fills.push(n);break;case"</fill>":break;case"<gradientFill>":break;case"<gradientFill":;case"</gradientFill>":r.Fills.push(n);n={};break;case"<patternFill":;case"<patternFill>":if(t.patternType)n.patternType=t.patternType;break;case"<patternFill/>":;case"</patternFill>":break;case"<bgColor":if(!n.bgColor)n.bgColor={};if(t.indexed)n.bgColor.indexed=parseInt(t.indexed,10);if(t.theme)n.bgColor.theme=parseInt(t.theme,10);if(t.tint)n.bgColor.tint=parseFloat(t.tint);if(t.rgb)n.bgColor.rgb=t.rgb.slice(-6);break;case"<bgColor/>":;case"</bgColor>":break;case"<fgColor":if(!n.fgColor)n.fgColor={};if(t.theme)n.fgColor.theme=parseInt(t.theme,10);if(t.tint)n.fgColor.tint=parseFloat(t.tint);if(t.rgb!=null)n.fgColor.rgb=t.rgb.slice(-6);break;case"<fgColor/>":;case"</fgColor>":break;case"<stop":;case"<stop/>":break;case"</stop>":break;case"<color":;case"<color/>":break;case"</color>":break;case"<extLst":;case"<extLst>":;case"</extLst>":break;case"<ext":i=true;break;case"</ext>":i=false;break;default:if(a&&a.WTF){if(!i)throw new Error("unrecognized "+t[0]+" in fills");};}});}function Rl(e,r,t,a){r.Fonts=[];var n={};var s=false;(e[0].match(Re)||[]).forEach(function(e){var f=De(e);switch(Pe(f[0])){case"<fonts":;case"<fonts>":;case"</fonts>":break;case"<font":;case"<font>":break;case"</font>":;case"<font/>":r.Fonts.push(n);n={};break;case"<name":if(f.val)n.name=Ye(f.val);break;case"<name/>":;case"</name>":break;case"<b":n.bold=f.val?$e(f.val):1;break;case"<b/>":n.bold=1;break;case"<i":n.italic=f.val?$e(f.val):1;break;case"<i/>":n.italic=1;break;case"<u":switch(f.val){case"none":n.underline=0;break;case"single":n.underline=1;break;case"double":n.underline=2;break;case"singleAccounting":n.underline=33;break;case"doubleAccounting":n.underline=34;break;}break;case"<u/>":n.underline=1;break;case"<strike":n.strike=f.val?$e(f.val):1;break;case"<strike/>":n.strike=1;break;case"<outline":n.outline=f.val?$e(f.val):1;break;case"<outline/>":n.outline=1;break;case"<shadow":n.shadow=f.val?$e(f.val):1;break;case"<shadow/>":n.shadow=1;break;case"<condense":n.condense=f.val?$e(f.val):1;break;case"<condense/>":n.condense=1;break;case"<extend":n.extend=f.val?$e(f.val):1;break;case"<extend/>":n.extend=1;break;case"<sz":if(f.val)n.sz=+f.val;break;case"<sz/>":;case"</sz>":break;case"<vertAlign":if(f.val)n.vertAlign=f.val;break;case"<vertAlign/>":;case"</vertAlign>":break;case"<family":if(f.val)n.family=parseInt(f.val,10);break;case"<family/>":;case"</family>":break;case"<scheme":if(f.val)n.scheme=f.val;break;case"<scheme/>":;case"</scheme>":break;case"<charset":if(f.val=="1")break;f.codepage=i[parseInt(f.val,10)];break;case"<color":if(!n.color)n.color={};if(f.auto)n.color.auto=$e(f.auto);if(f.rgb)n.color.rgb=f.rgb.slice(-6);else if(f.indexed){n.color.index=parseInt(f.indexed,10);var l=xa[n.color.index];if(n.color.index==81)l=xa[1];if(!l)l=xa[1];n.color.rgb=l[0].toString(16)+l[1].toString(16)+l[2].toString(16);}else if(f.theme){n.color.theme=parseInt(f.theme,10);if(f.tint)n.color.tint=parseFloat(f.tint);if(f.theme&&t.themeElements&&t.themeElements.clrScheme){n.color.rgb=dl(t.themeElements.clrScheme[n.color.theme].rgb,n.color.tint||0);}}break;case"<color/>":;case"</color>":break;case"<AlternateContent":s=true;break;case"</AlternateContent>":s=false;break;case"<extLst":;case"<extLst>":;case"</extLst>":break;case"<ext":s=true;break;case"</ext>":s=false;break;default:if(a&&a.WTF){if(!s)throw new Error("unrecognized "+f[0]+" in fonts");};}});}function Fl(e,r,t){r.NumberFmt=[];var a=K(O._table);for(var n=0;n<a.length;++n){r.NumberFmt[a[n]]=O._table[a[n]];}var i=e[0].match(Re);if(!i)return;for(n=0;n<i.length;++n){var s=De(i[n]);switch(Pe(s[0])){case"<numFmts":;case"</numFmts>":;case"<numFmts/>":;case"<numFmts>":break;case"<numFmt":{var f=Me(Ye(s.formatCode)),l=parseInt(s.numFmtId,10);r.NumberFmt[l]=f;if(l>0){if(l>392){for(l=392;l>60;--l){if(r.NumberFmt[l]==null)break;}r.NumberFmt[l]=f;}O.load(f,l);}}break;case"</numFmt>":break;default:if(t.WTF)throw new Error("unrecognized "+s[0]+" in numFmts");}}}function Ol(e){var r=["<numFmts>"];[[5,8],[23,26],[41,44],[50,392]].forEach(function(t){for(var a=t[0];a<=t[1];++a){if(e[a]!=null)r[r.length]=or("numFmt",null,{numFmtId:a,formatCode:He(e[a])});}});if(r.length===1)return"";r[r.length]="</numFmts>";r[0]=or("numFmts",null,{count:r.length-2}).replace("/>",">");return r.join("");}var Dl=["numFmtId","fillId","fontId","borderId","xfId"];var Pl=["applyAlignment","applyBorder","applyFill","applyFont","applyNumberFormat","applyProtection","pivotButton","quotePrefix"];function Nl(e,r,t){r.CellXf=[];var a;var n=false;(e[0].match(Re)||[]).forEach(function(e){var i=De(e),s=0;switch(Pe(i[0])){case"<cellXfs":;case"<cellXfs>":;case"<cellXfs/>":;case"</cellXfs>":break;case"<xf":;case"<xf/>":a=i;delete a[0];for(s=0;s<Dl.length;++s){if(a[Dl[s]])a[Dl[s]]=parseInt(a[Dl[s]],10);}for(s=0;s<Pl.length;++s){if(a[Pl[s]])a[Pl[s]]=$e(a[Pl[s]]);}if(r.NumberFmt&&a.numFmtId>392){for(s=392;s>60;--s){if(r.NumberFmt[a.numFmtId]==r.NumberFmt[s]){a.numFmtId=s;break;}}}r.CellXf.push(a);break;case"</xf>":break;case"<alignment":;case"<alignment/>":var f={};if(i.vertical)f.vertical=i.vertical;if(i.horizontal)f.horizontal=i.horizontal;if(i.textRotation!=null)f.textRotation=i.textRotation;if(i.indent)f.indent=i.indent;if(i.wrapText)f.wrapText=$e(i.wrapText);a.alignment=f;break;case"</alignment>":break;case"<protection":break;case"</protection>":;case"<protection/>":break;case"<AlternateContent":n=true;break;case"</AlternateContent>":n=false;break;case"<extLst":;case"<extLst>":;case"</extLst>":break;case"<ext":n=true;break;case"</ext>":n=false;break;default:if(t&&t.WTF){if(!n)throw new Error("unrecognized "+i[0]+" in cellXfs");};}});}function Ll(e){var r=[];r[r.length]=or("cellXfs",null);e.forEach(function(e){r[r.length]=or("xf",null,e);});r[r.length]="</cellXfs>";if(r.length===2)return"";r[0]=or("cellXfs",null,{count:r.length-2}).replace("/>",">");return r.join("");}var Ml=function qb(){var e=/<(?:\w+:)?numFmts([^>]*)>[\S\s]*?<\/(?:\w+:)?numFmts>/;var r=/<(?:\w+:)?cellXfs([^>]*)>[\S\s]*?<\/(?:\w+:)?cellXfs>/;var t=/<(?:\w+:)?fills([^>]*)>[\S\s]*?<\/(?:\w+:)?fills>/;var a=/<(?:\w+:)?fonts([^>]*)>[\S\s]*?<\/(?:\w+:)?fonts>/;var n=/<(?:\w+:)?borders([^>]*)>[\S\s]*?<\/(?:\w+:)?borders>/;return function i(s,f,l){var o={};if(!s)return o;s=s.replace(/<!--([\s\S]*?)-->/gm,"").replace(/<!DOCTYPE[^\[]*\[[^\]]*\]>/gm,"");var c;if(c=s.match(e))Fl(c,o,l);if(c=s.match(a))Rl(c,o,f,l);if(c=s.match(t))Il(c,o,f,l);if(c=s.match(n))Al(c,o,f,l);if(c=s.match(r))Nl(c,o,l);return o;};}();var Ul=or("styleSheet",null,{xmlns:hr.main[0],"xmlns:vt":hr.vt});Ua.STY="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles";function zl(e,r){var t=[Ae,Ul],a;if(e.SSF&&(a=Ol(e.SSF))!=null)t[t.length]=a;t[t.length]='<fonts count="1"><font><sz val="12"/><color theme="1"/><name val="Calibri"/><family val="2"/><scheme val="minor"/></font></fonts>';t[t.length]='<fills count="2"><fill><patternFill patternType="none"/></fill><fill><patternFill patternType="gray125"/></fill></fills>';t[t.length]='<borders count="1"><border><left/><right/><top/><bottom/><diagonal/></border></borders>';t[t.length]='<cellStyleXfs count="1"><xf numFmtId="0" fontId="0" fillId="0" borderId="0"/></cellStyleXfs>';if(a=Ll(r.cellXfs))t[t.length]=a;t[t.length]='<cellStyles count="1"><cellStyle name="Normal" xfId="0" builtinId="0"/></cellStyles>';t[t.length]='<dxfs count="0"/>';t[t.length]='<tableStyles count="0" defaultTableStyle="TableStyleMedium9" defaultPivotStyle="PivotStyleMedium4"/>';if(t.length>2){t[t.length]="</styleSheet>";t[1]=t[1].replace("/>",">");}return t.join("");}function Hl(e,r){var t=e._R(2);var a=yt(e,r-2);return[t,a];}function Wl(e,r,t){if(!t)t=Jr(6+4*r.length);t._W(2,e);xt(r,t);var a=t.length>t.l?t.slice(0,t.l):t;if(t.l==null)t.l=t.length;return a;}function Vl(e,r,t){var a={};a.sz=e._R(2)/20;var n=ta(e,2,t);if(n.fItalic)a.italic=1;if(n.fCondense)a.condense=1;if(n.fExtend)a.extend=1;if(n.fShadow)a.shadow=1;if(n.fOutline)a.outline=1;if(n.fStrikeout)a.strike=1;var i=e._R(2);if(i===700)a.bold=1;switch(e._R(2)){case 1:a.vertAlign="superscript";break;case 2:a.vertAlign="subscript";break;}var s=e._R(1);if(s!=0)a.underline=s;var f=e._R(1);if(f>0)a.family=f;var l=e._R(1);if(l>0)a.charset=l;e.l++;a.color=ea(e,8);switch(e._R(1)){case 1:a.scheme="major";break;case 2:a.scheme="minor";break;}a.name=yt(e,r-21);return a;}function Xl(e,r){if(!r)r=Jr(25+4*32);r._W(2,e.sz*20);aa(e,r);r._W(2,e.bold?700:400);var t=0;if(e.vertAlign=="superscript")t=1;else if(e.vertAlign=="subscript")t=2;r._W(2,t);r._W(1,e.underline||0);r._W(1,e.family||0);r._W(1,e.charset||0);r._W(1,0);ra(e.color,r);var a=0;if(e.scheme=="major")a=1;if(e.scheme=="minor")a=2;r._W(1,a);xt(e.name,r);return r.length>r.l?r.slice(0,r.l):r;}var Gl=["none","solid","mediumGray","darkGray","lightGray","darkHorizontal","darkVertical","darkDown","darkUp","darkGrid","darkTrellis","lightHorizontal","lightVertical","lightDown","lightUp","lightGrid","lightTrellis","gray125","gray0625"];var jl=Z(Gl);var Kl=Zr;function $l(e,r){if(!r)r=Jr(4*3+8*7+16*1);var t=jl[e.patternType];if(t==null)t=40;r._W(4,t);var a=0;if(t!=40){ra({auto:1},r);ra({auto:1},r);for(;a<12;++a){r._W(4,0);}}else{for(;a<4;++a){r._W(4,0);}for(;a<12;++a){r._W(4,0);}}return r.length>r.l?r.slice(0,r.l):r;}function Yl(e,r){var t=e.l+r;var a=e._R(2);var n=e._R(2);e.l=t;return{ixfe:a,numFmtId:n};}function Zl(e,r,t){if(!t)t=Jr(16);t._W(2,r||0);t._W(2,e.numFmtId||0);t._W(2,0);t._W(2,0);t._W(2,0);t._W(1,0);t._W(1,0);var a=0;t._W(1,a);t._W(1,0);t._W(1,0);t._W(1,0);return t;}function Jl(e,r){if(!r)r=Jr(10);r._W(1,0);r._W(1,0);r._W(4,0);r._W(4,0);return r;}var Ql=Zr;function ql(e,r){if(!r)r=Jr(51);r._W(1,0);Jl(null,r);Jl(null,r);Jl(null,r);Jl(null,r);Jl(null,r);return r.length>r.l?r.slice(0,r.l):r;}function eo(e,r){if(!r)r=Jr(12+4*10);r._W(4,e.xfId);r._W(2,1);r._W(1,+e.builtinId);r._W(1,0);Wt(e.name||"",r);return r.length>r.l?r.slice(0,r.l):r;}function ro(e,r,t){var a=Jr(4+256*2*4);a._W(4,e);Wt(r,a);Wt(t,a);return a.length>a.l?a.slice(0,a.l):a;}function to(e,r,t){var a={};a.NumberFmt=[];for(var n in O._table){a.NumberFmt[n]=O._table[n];}a.CellXf=[];a.Fonts=[];var i=[];var s=false;Qr(e,function f(e,n,l){switch(l){case 44:a.NumberFmt[e[0]]=e[1];O.load(e[1],e[0]);break;case 43:a.Fonts.push(e);if(e.color.theme!=null&&r&&r.themeElements&&r.themeElements.clrScheme){e.color.rgb=dl(r.themeElements.clrScheme[e.color.theme].rgb,e.color.tint||0);}break;case 1025:break;case 45:break;case 46:break;case 47:if(i[i.length-1]=="BrtBeginCellXFs"){a.CellXf.push(e);}break;case 48:;case 507:;case 572:;case 475:break;case 1171:;case 2102:;case 1130:;case 512:;case 2095:;case 3072:break;case 35:s=true;break;case 36:s=false;break;case 37:i.push(n);s=true;break;case 38:i.pop();s=false;break;default:if((n||"").indexOf("Begin")>0)i.push(n);else if((n||"").indexOf("End")>0)i.pop();else if(!s||t.WTF&&i[i.length-1]!="BrtACBegin")throw new Error("Unexpected record "+l+" "+n);}});return a;}function ao(e,r){if(!r)return;var t=0;[[5,8],[23,26],[41,44],[50,392]].forEach(function(e){for(var a=e[0];a<=e[1];++a){if(r[a]!=null)++t;}});if(t==0)return;et(e,"BrtBeginFmts",Tt(t));[[5,8],[23,26],[41,44],[50,392]].forEach(function(t){for(var a=t[0];a<=t[1];++a){if(r[a]!=null)et(e,"BrtFmt",Wl(a,r[a]));}});et(e,"BrtEndFmts");}function no(e){var r=1;if(r==0)return;et(e,"BrtBeginFonts",Tt(r));et(e,"BrtFont",Xl({sz:12,color:{theme:1},name:"Calibri",family:2,scheme:"minor"}));et(e,"BrtEndFonts");}function io(e){var r=2;if(r==0)return;et(e,"BrtBeginFills",Tt(r));et(e,"BrtFill",$l({patternType:"none"}));et(e,"BrtFill",$l({patternType:"gray125"}));et(e,"BrtEndFills");}function so(e){var r=1;if(r==0)return;et(e,"BrtBeginBorders",Tt(r));et(e,"BrtBorder",ql({}));et(e,"BrtEndBorders");}function fo(e){var r=1;et(e,"BrtBeginCellStyleXFs",Tt(r));et(e,"BrtXF",Zl({numFmtId:0,fontId:0,fillId:0,borderId:0},65535));et(e,"BrtEndCellStyleXFs");}function lo(e,r){et(e,"BrtBeginCellXFs",Tt(r.length));r.forEach(function(r){et(e,"BrtXF",Zl(r,0));});et(e,"BrtEndCellXFs");}function oo(e){var r=1;et(e,"BrtBeginStyles",Tt(r));et(e,"BrtStyle",eo({xfId:0,builtinId:0,name:"Normal"}));et(e,"BrtEndStyles");}function co(e){var r=0;et(e,"BrtBeginDXFs",Tt(r));et(e,"BrtEndDXFs");}function uo(e){var r=0;et(e,"BrtBeginTableStyles",ro(r,"TableStyleMedium9","PivotStyleMedium4"));et(e,"BrtEndTableStyles");}function ho(){return;}function vo(e,r){var t=qr();et(t,"BrtBeginStyleSheet");ao(t,e.SSF);no(t,e);io(t,e);so(t,e);fo(t,e);lo(t,r.cellXfs);oo(t,e);co(t,e);uo(t,e);ho(t,e);et(t,"BrtEndStyleSheet");return t.end();}Ua.THEME="http://schemas.openxmlformats.org/officeDocument/2006/relationships/theme";var po=["</a:lt1>","</a:dk1>","</a:lt2>","</a:dk2>","</a:accent1>","</a:accent2>","</a:accent3>","</a:accent4>","</a:accent5>","</a:accent6>","</a:hlink>","</a:folHlink>"];function mo(e,r,t){r.themeElements.clrScheme=[];var a={};(e[0].match(Re)||[]).forEach(function(e){var n=De(e);switch(n[0]){case"<a:clrScheme":;case"</a:clrScheme>":break;case"<a:srgbClr":a.rgb=n.val;break;case"<a:sysClr":a.rgb=n.lastClr;break;case"<a:dk1>":;case"</a:dk1>":;case"<a:lt1>":;case"</a:lt1>":;case"<a:dk2>":;case"</a:dk2>":;case"<a:lt2>":;case"</a:lt2>":;case"<a:accent1>":;case"</a:accent1>":;case"<a:accent2>":;case"</a:accent2>":;case"<a:accent3>":;case"</a:accent3>":;case"<a:accent4>":;case"</a:accent4>":;case"<a:accent5>":;case"</a:accent5>":;case"<a:accent6>":;case"</a:accent6>":;case"<a:hlink>":;case"</a:hlink>":;case"<a:folHlink>":;case"</a:folHlink>":if(n[0].charAt(1)==="/"){r.themeElements.clrScheme[po.indexOf(n[0])]=a;a={};}else{a.name=n[0].slice(3,n[0].length-1);}break;default:if(t&&t.WTF)throw new Error("Unrecognized "+n[0]+" in clrScheme");}});}function bo(){}function go(){}var wo=/<a:clrScheme([^>]*)>[\s\S]*<\/a:clrScheme>/;var ko=/<a:fontScheme([^>]*)>[\s\S]*<\/a:fontScheme>/;var Eo=/<a:fmtScheme([^>]*)>[\s\S]*<\/a:fmtScheme>/;function So(e,r,t){r.themeElements={};var a;[["clrScheme",wo,mo],["fontScheme",ko,bo],["fmtScheme",Eo,go]].forEach(function(n){if(!(a=e.match(n[1])))throw new Error(n[0]+" not found in themeElements");n[2](a,r,t);});}var _o=/<a:themeElements([^>]*)>[\s\S]*<\/a:themeElements>/;function Co(e,r){if(!e||e.length===0)return Co(Bo());var t;var a={};if(!(t=e.match(_o)))throw new Error("themeElements not found in theme");So(t[0],a,r);a.raw=e;return a;}function Bo(e,r){if(r&&r.themeXLSX)return r.themeXLSX;if(e&&typeof e.raw=="string")return e.raw;var t=[Ae];t[t.length]='<a:theme xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main" name="Office Theme">';t[t.length]="<a:themeElements>";t[t.length]='<a:clrScheme name="Office">';t[t.length]='<a:dk1><a:sysClr val="windowText" lastClr="000000"/></a:dk1>';t[t.length]='<a:lt1><a:sysClr val="window" lastClr="FFFFFF"/></a:lt1>';t[t.length]='<a:dk2><a:srgbClr val="1F497D"/></a:dk2>';t[t.length]='<a:lt2><a:srgbClr val="EEECE1"/></a:lt2>';t[t.length]='<a:accent1><a:srgbClr val="4F81BD"/></a:accent1>';t[t.length]='<a:accent2><a:srgbClr val="C0504D"/></a:accent2>';t[t.length]='<a:accent3><a:srgbClr val="9BBB59"/></a:accent3>';t[t.length]='<a:accent4><a:srgbClr val="8064A2"/></a:accent4>';t[t.length]='<a:accent5><a:srgbClr val="4BACC6"/></a:accent5>';t[t.length]='<a:accent6><a:srgbClr val="F79646"/></a:accent6>';t[t.length]='<a:hlink><a:srgbClr val="0000FF"/></a:hlink>';t[t.length]='<a:folHlink><a:srgbClr val="800080"/></a:folHlink>';t[t.length]="</a:clrScheme>";t[t.length]='<a:fontScheme name="Office">';t[t.length]="<a:majorFont>";t[t.length]='<a:latin typeface="Cambria"/>';t[t.length]='<a:ea typeface=""/>';t[t.length]='<a:cs typeface=""/>';t[t.length]='<a:font script="Jpan" typeface="ＭＳ Ｐゴシック"/>';t[t.length]='<a:font script="Hang" typeface="맑은 고딕"/>';t[t.length]='<a:font script="Hans" typeface="宋体"/>';t[t.length]='<a:font script="Hant" typeface="新細明體"/>';t[t.length]='<a:font script="Arab" typeface="Times New Roman"/>';t[t.length]='<a:font script="Hebr" typeface="Times New Roman"/>';t[t.length]='<a:font script="Thai" typeface="Tahoma"/>';t[t.length]='<a:font script="Ethi" typeface="Nyala"/>';t[t.length]='<a:font script="Beng" typeface="Vrinda"/>';t[t.length]='<a:font script="Gujr" typeface="Shruti"/>';t[t.length]='<a:font script="Khmr" typeface="MoolBoran"/>';t[t.length]='<a:font script="Knda" typeface="Tunga"/>';t[t.length]='<a:font script="Guru" typeface="Raavi"/>';t[t.length]='<a:font script="Cans" typeface="Euphemia"/>';t[t.length]='<a:font script="Cher" typeface="Plantagenet Cherokee"/>';t[t.length]='<a:font script="Yiii" typeface="Microsoft Yi Baiti"/>';t[t.length]='<a:font script="Tibt" typeface="Microsoft Himalaya"/>';t[t.length]='<a:font script="Thaa" typeface="MV Boli"/>';t[t.length]='<a:font script="Deva" typeface="Mangal"/>';t[t.length]='<a:font script="Telu" typeface="Gautami"/>';t[t.length]='<a:font script="Taml" typeface="Latha"/>';t[t.length]='<a:font script="Syrc" typeface="Estrangelo Edessa"/>';t[t.length]='<a:font script="Orya" typeface="Kalinga"/>';t[t.length]='<a:font script="Mlym" typeface="Kartika"/>';t[t.length]='<a:font script="Laoo" typeface="DokChampa"/>';t[t.length]='<a:font script="Sinh" typeface="Iskoola Pota"/>';t[t.length]='<a:font script="Mong" typeface="Mongolian Baiti"/>';t[t.length]='<a:font script="Viet" typeface="Times New Roman"/>';t[t.length]='<a:font script="Uigh" typeface="Microsoft Uighur"/>';t[t.length]='<a:font script="Geor" typeface="Sylfaen"/>';t[t.length]="</a:majorFont>";t[t.length]="<a:minorFont>";t[t.length]='<a:latin typeface="Calibri"/>';t[t.length]='<a:ea typeface=""/>';t[t.length]='<a:cs typeface=""/>';t[t.length]='<a:font script="Jpan" typeface="ＭＳ Ｐゴシック"/>';t[t.length]='<a:font script="Hang" typeface="맑은 고딕"/>';t[t.length]='<a:font script="Hans" typeface="宋体"/>';t[t.length]='<a:font script="Hant" typeface="新細明體"/>';t[t.length]='<a:font script="Arab" typeface="Arial"/>';t[t.length]='<a:font script="Hebr" typeface="Arial"/>';t[t.length]='<a:font script="Thai" typeface="Tahoma"/>';t[t.length]='<a:font script="Ethi" typeface="Nyala"/>';t[t.length]='<a:font script="Beng" typeface="Vrinda"/>';t[t.length]='<a:font script="Gujr" typeface="Shruti"/>';t[t.length]='<a:font script="Khmr" typeface="DaunPenh"/>';t[t.length]='<a:font script="Knda" typeface="Tunga"/>';t[t.length]='<a:font script="Guru" typeface="Raavi"/>';t[t.length]='<a:font script="Cans" typeface="Euphemia"/>';t[t.length]='<a:font script="Cher" typeface="Plantagenet Cherokee"/>';t[t.length]='<a:font script="Yiii" typeface="Microsoft Yi Baiti"/>';t[t.length]='<a:font script="Tibt" typeface="Microsoft Himalaya"/>';t[t.length]='<a:font script="Thaa" typeface="MV Boli"/>';t[t.length]='<a:font script="Deva" typeface="Mangal"/>';t[t.length]='<a:font script="Telu" typeface="Gautami"/>';t[t.length]='<a:font script="Taml" typeface="Latha"/>';t[t.length]='<a:font script="Syrc" typeface="Estrangelo Edessa"/>';t[t.length]='<a:font script="Orya" typeface="Kalinga"/>';t[t.length]='<a:font script="Mlym" typeface="Kartika"/>';t[t.length]='<a:font script="Laoo" typeface="DokChampa"/>';t[t.length]='<a:font script="Sinh" typeface="Iskoola Pota"/>';t[t.length]='<a:font script="Mong" typeface="Mongolian Baiti"/>';t[t.length]='<a:font script="Viet" typeface="Arial"/>';t[t.length]='<a:font script="Uigh" typeface="Microsoft Uighur"/>';t[t.length]='<a:font script="Geor" typeface="Sylfaen"/>';t[t.length]="</a:minorFont>";t[t.length]="</a:fontScheme>";t[t.length]='<a:fmtScheme name="Office">';t[t.length]="<a:fillStyleLst>";t[t.length]='<a:solidFill><a:schemeClr val="phClr"/></a:solidFill>';t[t.length]='<a:gradFill rotWithShape="1">';t[t.length]="<a:gsLst>";t[t.length]='<a:gs pos="0"><a:schemeClr val="phClr"><a:tint val="50000"/><a:satMod val="300000"/></a:schemeClr></a:gs>';t[t.length]='<a:gs pos="35000"><a:schemeClr val="phClr"><a:tint val="37000"/><a:satMod val="300000"/></a:schemeClr></a:gs>';t[t.length]='<a:gs pos="100000"><a:schemeClr val="phClr"><a:tint val="15000"/><a:satMod val="350000"/></a:schemeClr></a:gs>';t[t.length]="</a:gsLst>";t[t.length]='<a:lin ang="16200000" scaled="1"/>';t[t.length]="</a:gradFill>";t[t.length]='<a:gradFill rotWithShape="1">';t[t.length]="<a:gsLst>";t[t.length]='<a:gs pos="0"><a:schemeClr val="phClr"><a:tint val="100000"/><a:shade val="100000"/><a:satMod val="130000"/></a:schemeClr></a:gs>';t[t.length]='<a:gs pos="100000"><a:schemeClr val="phClr"><a:tint val="50000"/><a:shade val="100000"/><a:satMod val="350000"/></a:schemeClr></a:gs>';t[t.length]="</a:gsLst>";t[t.length]='<a:lin ang="16200000" scaled="0"/>';t[t.length]="</a:gradFill>";t[t.length]="</a:fillStyleLst>";t[t.length]="<a:lnStyleLst>";t[t.length]='<a:ln w="9525" cap="flat" cmpd="sng" algn="ctr"><a:solidFill><a:schemeClr val="phClr"><a:shade val="95000"/><a:satMod val="105000"/></a:schemeClr></a:solidFill><a:prstDash val="solid"/></a:ln>';t[t.length]='<a:ln w="25400" cap="flat" cmpd="sng" algn="ctr"><a:solidFill><a:schemeClr val="phClr"/></a:solidFill><a:prstDash val="solid"/></a:ln>';t[t.length]='<a:ln w="38100" cap="flat" cmpd="sng" algn="ctr"><a:solidFill><a:schemeClr val="phClr"/></a:solidFill><a:prstDash val="solid"/></a:ln>';t[t.length]="</a:lnStyleLst>";t[t.length]="<a:effectStyleLst>";t[t.length]="<a:effectStyle>";t[t.length]="<a:effectLst>";t[t.length]='<a:outerShdw blurRad="40000" dist="20000" dir="5400000" rotWithShape="0"><a:srgbClr val="000000"><a:alpha val="38000"/></a:srgbClr></a:outerShdw>';t[t.length]="</a:effectLst>";t[t.length]="</a:effectStyle>";t[t.length]="<a:effectStyle>";t[t.length]="<a:effectLst>";t[t.length]='<a:outerShdw blurRad="40000" dist="23000" dir="5400000" rotWithShape="0"><a:srgbClr val="000000"><a:alpha val="35000"/></a:srgbClr></a:outerShdw>';t[t.length]="</a:effectLst>";t[t.length]="</a:effectStyle>";t[t.length]="<a:effectStyle>";t[t.length]="<a:effectLst>";t[t.length]='<a:outerShdw blurRad="40000" dist="23000" dir="5400000" rotWithShape="0"><a:srgbClr val="000000"><a:alpha val="35000"/></a:srgbClr></a:outerShdw>';t[t.length]="</a:effectLst>";t[t.length]='<a:scene3d><a:camera prst="orthographicFront"><a:rot lat="0" lon="0" rev="0"/></a:camera><a:lightRig rig="threePt" dir="t"><a:rot lat="0" lon="0" rev="1200000"/></a:lightRig></a:scene3d>';t[t.length]='<a:sp3d><a:bevelT w="63500" h="25400"/></a:sp3d>';t[t.length]="</a:effectStyle>";t[t.length]="</a:effectStyleLst>";t[t.length]="<a:bgFillStyleLst>";t[t.length]='<a:solidFill><a:schemeClr val="phClr"/></a:solidFill>';t[t.length]='<a:gradFill rotWithShape="1">';t[t.length]="<a:gsLst>";t[t.length]='<a:gs pos="0"><a:schemeClr val="phClr"><a:tint val="40000"/><a:satMod val="350000"/></a:schemeClr></a:gs>';t[t.length]='<a:gs pos="40000"><a:schemeClr val="phClr"><a:tint val="45000"/><a:shade val="99000"/><a:satMod val="350000"/></a:schemeClr></a:gs>';t[t.length]='<a:gs pos="100000"><a:schemeClr val="phClr"><a:shade val="20000"/><a:satMod val="255000"/></a:schemeClr></a:gs>';t[t.length]="</a:gsLst>";t[t.length]='<a:path path="circle"><a:fillToRect l="50000" t="-80000" r="50000" b="180000"/></a:path>';t[t.length]="</a:gradFill>";t[t.length]='<a:gradFill rotWithShape="1">';t[t.length]="<a:gsLst>";t[t.length]='<a:gs pos="0"><a:schemeClr val="phClr"><a:tint val="80000"/><a:satMod val="300000"/></a:schemeClr></a:gs>';t[t.length]='<a:gs pos="100000"><a:schemeClr val="phClr"><a:shade val="30000"/><a:satMod val="200000"/></a:schemeClr></a:gs>';t[t.length]="</a:gsLst>";t[t.length]='<a:path path="circle"><a:fillToRect l="50000" t="50000" r="50000" b="50000"/></a:path>';t[t.length]="</a:gradFill>";t[t.length]="</a:bgFillStyleLst>";t[t.length]="</a:fmtScheme>";t[t.length]="</a:themeElements>";t[t.length]="<a:objectDefaults>";t[t.length]="<a:spDef>";t[t.length]='<a:spPr/><a:bodyPr/><a:lstStyle/><a:style><a:lnRef idx="1"><a:schemeClr val="accent1"/></a:lnRef><a:fillRef idx="3"><a:schemeClr val="accent1"/></a:fillRef><a:effectRef idx="2"><a:schemeClr val="accent1"/></a:effectRef><a:fontRef idx="minor"><a:schemeClr val="lt1"/></a:fontRef></a:style>';t[t.length]="</a:spDef>";t[t.length]="<a:lnDef>";t[t.length]='<a:spPr/><a:bodyPr/><a:lstStyle/><a:style><a:lnRef idx="2"><a:schemeClr val="accent1"/></a:lnRef><a:fillRef idx="0"><a:schemeClr val="accent1"/></a:fillRef><a:effectRef idx="1"><a:schemeClr val="accent1"/></a:effectRef><a:fontRef idx="minor"><a:schemeClr val="tx1"/></a:fontRef></a:style>';t[t.length]="</a:lnDef>";t[t.length]="</a:objectDefaults>";t[t.length]="<a:extraClrSchemeLst/>";t[t.length]="</a:theme>";return t.join("");}function To(e,r,t){var a=e.l+r;var n=e._R(4);if(n===124226)return;if(!t.cellStyles){e.l=a;return;}var i=e.slice(e.l);e.l=a;var s;try{s=ye(i,{type:"array"});}catch(f){return;}var l=Se(s,"theme/theme/theme1.xml",true);if(!l)return;return Co(l,t);}function yo(e){return e._R(4);}function xo(e){var r={};r.xclrType=e._R(2);r.nTintShade=e._R(2);switch(r.xclrType){case 0:e.l+=4;break;case 1:r.xclrValue=Ao(e,4);break;case 2:r.xclrValue=vi(e,4);break;case 3:r.xclrValue=yo(e,4);break;case 4:e.l+=4;break;}e.l+=8;return r;}function Ao(e,r){return Zr(e,r);}function Io(e,r){return Zr(e,r);}function Ro(e){var r=e._R(2);var t=e._R(2)-4;var a=[r];switch(r){case 4:;case 5:;case 7:;case 8:;case 9:;case 10:;case 11:;case 13:a[1]=xo(e,t);break;case 6:a[1]=Io(e,t);break;case 14:;case 15:a[1]=e._R(t===1?1:2);break;default:throw new Error("Unrecognized ExtProp type: "+r+" "+t);}return a;}function Fo(e,r){var t=e.l+r;e.l+=2;var a=e._R(2);e.l+=2;var n=e._R(2);var i=[];while(n-->0){i.push(Ro(e,t-e.l));}return{ixfe:a,ext:i};}function Oo(e,r){r.forEach(function(e){switch(e[0]){case 4:break;case 5:break;case 6:break;case 7:break;case 8:break;case 9:break;case 10:break;case 11:break;case 13:break;case 14:break;case 15:break;}});}function Do(e){var r=[];if(!e)return r;var t=1;(e.match(Re)||[]).forEach(function(e){var a=De(e);switch(a[0]){case"<?xml":break;case"<calcChain":;case"<calcChain>":;case"</calcChain>":break;case"<c":delete a[0];if(a.i)t=a.i;else a.i=t;r.push(a);break;}});return r;}function Po(e){var r={};r.i=e._R(4);var t={};t.r=e._R(4);t.c=e._R(4);r.r=bt(t);var a=e._R(1);if(a&2)r.l="1";if(a&8)r.a="1";return r;}function No(e,r,t){var a=[];var n=false;Qr(e,function i(e,r,s){switch(s){case 63:a.push(e);break;default:if((r||"").indexOf("Begin")>0){}else if((r||"").indexOf("End")>0){}else if(!n||t.WTF)throw new Error("Unexpected record "+s+" "+r);}});return a;}function Lo(){}function Mo(e,r,t,a){if(!e)return e;var n=a||{};var i=false,s=false;Qr(e,function f(e,r,t){if(s)return;switch(t){case 359:;case 363:;case 364:;case 366:;case 367:;case 368:;case 369:;case 370:;case 371:;case 472:;case 577:;case 578:;case 579:;case 580:;case 581:;case 582:;case 583:;case 584:;case 585:;case 586:;case 587:break;case 35:i=true;break;case 36:i=false;break;default:if((r||"").indexOf("Begin")>0){}else if((r||"").indexOf("End")>0){}else if(!i||n.WTF)throw new Error("Unexpected record "+t.toString(16)+" "+r);}},n);}Ua.IMG="http://schemas.openxmlformats.org/officeDocument/2006/relationships/image";Ua.DRAW="http://schemas.openxmlformats.org/officeDocument/2006/relationships/drawing";function Uo(e,r){if(!e)return"??";var t=(e.match(/<c:chart [^>]*r:id="([^"]*)"/)||["",""])[1];return r["!id"][t].Target;}var zo=1024;function Ho(e,r){var t=[21600,21600];var a=["m0,0l0",t[1],t[0],t[1],t[0],"0xe"].join(",");var n=[or("xml",null,{"xmlns:v":dr.v,"xmlns:o":dr.o,"xmlns:x":dr.x,"xmlns:mv":dr.mv}).replace(/\/>/,">"),or("o:shapelayout",or("o:idmap",null,{"v:ext":"edit",data:e}),{"v:ext":"edit"}),or("v:shapetype",[or("v:stroke",null,{joinstyle:"miter"}),or("v:path",null,{gradientshapeok:"t","o:connecttype":"rect"})].join(""),{id:"_x0000_t202","o:spt":202,coordsize:t.join(","),path:a})];while(zo<e*1e3){zo+=1e3;}r.forEach(function(e){var r=mt(e[0]);var t={color2:"#BEFF82",type:"gradient"};if(t.type=="gradient")t.angle="-180";var a=t.type=="gradient"?or("o:fill",null,{type:"gradientUnscaled","v:ext":"view"}):null;var i=or("v:fill",a,t);var s={on:"t",obscured:"t"};++zo;n=n.concat(["<v:shape"+lr({id:"_x0000_s"+zo,type:"#_x0000_t202",style:"position:absolute; margin-left:80pt;margin-top:5pt;width:104pt;height:64pt;z-index:10"+(e[1].hidden?";visibility:hidden":""),fillcolor:"#ECFAD4",strokecolor:"#edeaa1"})+">",i,or("v:shadow",null,s),or("v:path",null,{"o:connecttype":"none"}),'<v:textbox><div style="text-align:left"></div></v:textbox>','<x:ClientData ObjectType="Note">',"<x:MoveWithCells/>","<x:SizeWithCells/>",fr("x:Anchor",[r.c+1,0,r.r+1,0,r.c+3,20,r.r+5,20].join(",")),fr("x:AutoFill","False"),fr("x:Row",String(r.r)),fr("x:Column",String(r.c)),e[1].hidden?"":"<x:Visible/>","</x:ClientData>","</v:shape>"]);});n.push("</xml>");return n.join("");}Ua.CMNT="http://schemas.openxmlformats.org/officeDocument/2006/relationships/comments";function Wo(e,r){var t=Array.isArray(e);var a;r.forEach(function(r){var n=mt(r.ref);if(t){if(!e[n.r])e[n.r]=[];a=e[n.r][n.c];}else a=e[r.ref];if(!a){a={t:"z"};if(t)e[n.r][n.c]=a;else e[r.ref]=a;var i=kt(e["!ref"]||"BDWGO1000001:A1");if(i.s.r>n.r)i.s.r=n.r;if(i.e.r<n.r)i.e.r=n.r;if(i.s.c>n.c)i.s.c=n.c;if(i.e.c<n.c)i.e.c=n.c;var s=wt(i);if(s!==e["!ref"])e["!ref"]=s;}if(!a.c)a.c=[];var f={a:r.author,t:r.t,r:r.r};if(r.h)f.h=r.h;a.c.push(f);});}function Vo(e,r){if(e.match(/<(?:\w+:)?comments *\/>/))return[];var t=[];var a=[];var n=e.match(/<(?:\w+:)?authors>([\s\S]*)<\/(?:\w+:)?authors>/);if(n&&n[1])n[1].split(/<\/\w*:?author>/).forEach(function(e){if(e===""||e.trim()==="")return;var r=e.match(/<(?:\w+:)?author[^>]*>(.*)/);if(r)t.push(r[1]);});var i=e.match(/<(?:\w+:)?commentList>([\s\S]*)<\/(?:\w+:)?commentList>/);if(i&&i[1])i[1].split(/<\/\w*:?comment>/).forEach(function(e){if(e===""||e.trim()==="")return;var n=e.match(/<(?:\w+:)?comment[^>]*>/);if(!n)return;var i=De(n[0]);var s={author:i.authorId&&t[i.authorId]||"sheetjsghost",ref:i.ref,guid:i.guid};var f=mt(i.ref);if(r.sheetRows&&r.sheetRows<=f.r)return;var l=e.match(/<(?:\w+:)?text>([\s\S]*)<\/(?:\w+:)?text>/);var o=!!l&&!!l[1]&&yf(l[1])||{r:"",t:"",h:""};s.r=o.r;if(o.r=="<t></t>")o.t=o.h="";s.t=(o.t||"").replace(/\r\n/g,"\n").replace(/\r/g,"\n");if(r.cellHTML)s.h=o.h;a.push(s);});return a;}var Xo=or("comments",null,{xmlns:hr.main[0]});function Go(e){var r=[Ae,Xo];var t=[];r.push("<authors>");e.forEach(function(e){e[1].forEach(function(e){var a=He(e.a);if(t.indexOf(a)>-1)return;t.push(a);r.push("<author>"+a+"</author>");});});r.push("</authors>");r.push("<commentList>");e.forEach(function(e){e[1].forEach(function(a){r.push('<comment ref="'+e[0]+'" authorId="'+t.indexOf(He(a.a))+'"><text>');r.push(fr("t",a.t==null?"":He(a.t)));r.push("</text></comment>");});});r.push("</commentList>");if(r.length>2){r[r.length]="</comments>";r[1]=r[1].replace("/>",">");}return r.join("");}function jo(e){var r={};r.iauthor=e._R(4);var t=Zt(e,16);r.rfx=t.s;r.ref=bt(t.s);e.l+=16;return r;}function Ko(e,r){if(r==null)r=Jr(36);r._W(4,e[1].iauthor);Jt(e[0],r);r._W(4,0);r._W(4,0);r._W(4,0);r._W(4,0);return r;}var $o=yt;function Yo(e){return xt(e.slice(0,54));}function Zo(e,r){var t=[];var a=[];var n={};var i=false;Qr(e,function s(e,f,l){switch(l){case 632:a.push(e);break;case 635:n=e;break;case 637:n.t=e.t;n.h=e.h;n.r=e.r;break;case 636:n.author=a[n.iauthor];delete n.iauthor;if(r.sheetRows&&n.rfx&&r.sheetRows<=n.rfx.r)break;if(!n.t)n.t="";delete n.rfx;t.push(n);break;case 3072:break;case 35:i=true;break;case 36:i=false;break;case 37:break;case 38:break;default:if((f||"").indexOf("Begin")>0){}else if((f||"").indexOf("End")>0){}else if(!i||r.WTF)throw new Error("Unexpected record "+l+" "+f);}});return t;}function Jo(e){var r=qr();var t=[];et(r,"BrtBeginComments");et(r,"BrtBeginCommentAuthors");e.forEach(function(e){e[1].forEach(function(e){if(t.indexOf(e.a)>-1)return;t.push(e.a.slice(0,54));et(r,"BrtCommentAuthor",Yo(e.a));});});et(r,"BrtEndCommentAuthors");et(r,"BrtBeginCommentList");e.forEach(function(e){e[1].forEach(function(a){a.iauthor=t.indexOf(a.a);var n={s:mt(e[0]),e:mt(e[0])};et(r,"BrtBeginComment",Ko([n,a]));if(a.t&&a.t.length>0)et(r,"BrtCommentText",Dt(a));et(r,"BrtEndComment");delete a.iauthor;});});et(r,"BrtEndCommentList");et(r,"BrtEndComments");return r.end();}var Qo="application/vnd.ms-office.vbaProject";function qo(e){var r=W.utils.cfb_new({root:"R"});e.FullPaths.forEach(function(t,a){if(t.slice(-1)==="/"||!t.match(/_VBA_PROJECT_CUR/))return;var n=t.replace(/^[^\/]*/,"R").replace(/\/_VBA_PROJECT_CUR\u0000*/,"");W.utils.cfb_add(r,n,e.FileIndex[a].content);});return W.write(r);}function ec(e,r){r.FullPaths.forEach(function(t,a){if(a==0)return;var n=t.replace(/[^\/]*[\/]/,"/_VBA_PROJECT_CUR/");if(n.slice(-1)!=="/")W.utils.cfb_add(e,n,r.FileIndex[a].content);});}var rc=["xlsb","xlsm","xlam","biff8","xla"];Ua.DS="http://schemas.openxmlformats.org/officeDocument/2006/relationships/dialogsheet";Ua.MS="http://schemas.microsoft.com/office/2006/relationships/xlMacrosheet";function tc(){return{"!type":"dialog"};}function ac(){return{"!type":"dialog"};}function nc(){return{"!type":"macro"};}function ic(){return{"!type":"macro"};}var sc=function(){var e=/(^|[^A-Za-z_])R(\[?-?\d+\]|[1-9]\d*|)C(\[?-?\d+\]|[1-9]\d*|)(?![A-Za-z0-9_])/g;var r={r:0,c:0};function t(e,t,a,n){var i=false,s=false;if(a.length==0)s=true;else if(a.charAt(0)=="["){s=true;a=a.slice(1,-1);}if(n.length==0)i=true;else if(n.charAt(0)=="["){i=true;n=n.slice(1,-1);}var f=a.length>0?parseInt(a,10)|0:0,l=n.length>0?parseInt(n,10)|0:0;if(i)l+=r.c;else--l;if(s)f+=r.r;else--f;return t+(i?"":"$")+ht(l)+(s?"":"$")+lt(f);}return function a(n,i){r=i;return n.replace(e,t);};}();var fc=/(^|[^._A-Z0-9])([$]?)([A-Z]{1,2}|[A-W][A-Z]{2}|X[A-E][A-Z]|XF[A-D])([$]?)(10[0-3]\d{4}|104[0-7]\d{3}|1048[0-4]\d{2}|10485[0-6]\d|104857[0-6]|[1-9]\d{0,5})(?![_.\(A-Za-z0-9])/g;var lc=function(){return function e(r,t){return r.replace(fc,function(e,r,a,n,i,s){var f=ut(n)-(a?0:t.c);var l=ft(s)-(i?0:t.r);var o=l==0?"":!i?"["+l+"]":l+1;var c=f==0?"":!a?"["+f+"]":f+1;return r+"R"+o+"C"+c;});};}();function oc(e,r){return e.replace(fc,function(e,t,a,n,i,s){return t+(a=="$"?a+n:ht(ut(n)+r.c))+(i=="$"?i+s:lt(ft(s)+r.r));});}function cc(e,r,t){var a=gt(r),n=a.s,i=mt(t);var s={r:i.r-n.r,c:i.c-n.c};return oc(e,s);}function uc(e){if(e.length==1)return false;return true;}function hc(e){return e.replace(/_xlfn\./g,"");}function dc(e){e.l+=1;return;}function vc(e,r){var t=e._R(r==1?1:2);return[t&16383,t>>14&1,t>>15&1];}function pc(e,r,t){var a=2;if(t){if(t.biff>=2&&t.biff<=5)return mc(e,r,t);else if(t.biff==12)a=4;}var n=e._R(a),i=e._R(a);var s=vc(e,2);var f=vc(e,2);return{s:{r:n,c:s[0],cRel:s[1],rRel:s[2]},e:{r:i,c:f[0],cRel:f[1],rRel:f[2]}};}function mc(e){var r=vc(e,2),t=vc(e,2);var a=e._R(1);var n=e._R(1);return{s:{r:r[0],c:a,cRel:r[1],rRel:r[2]},e:{r:t[0],c:n,cRel:t[1],rRel:t[2]}};}function bc(e,r,t){if(t.biff<8)return mc(e,r,t);var a=e._R(t.biff==12?4:2),n=e._R(t.biff==12?4:2);var i=vc(e,2);var s=vc(e,2);return{s:{r:a,c:i[0],cRel:i[1],rRel:i[2]},e:{r:n,c:s[0],cRel:s[1],rRel:s[2]}};}function gc(e,r,t){if(t&&t.biff>=2&&t.biff<=5)return wc(e,r,t);var a=e._R(t&&t.biff==12?4:2);var n=vc(e,2);return{r:a,c:n[0],cRel:n[1],rRel:n[2]};}function wc(e){var r=vc(e,2);var t=e._R(1);return{r:r[0],c:t,cRel:r[1],rRel:r[2]};}function kc(e){var r=e._R(2);var t=e._R(2);return{r:r,c:t&255,fQuoted:!!(t&16384),cRel:t>>15,rRel:t>>15};}function Ec(e,r,t){var a=t&&t.biff?t.biff:8;if(a>=2&&a<=5)return Sc(e,r,t);var n=e._R(a>=12?4:2);var i=e._R(2);var s=(i&16384)>>14,f=(i&32768)>>15;i&=16383;if(f==1)while(n>524287){n-=1048576;}if(s==1)while(i>8191){i=i-16384;}return{r:n,c:i,cRel:s,rRel:f};}function Sc(e){var r=e._R(2);var t=e._R(1);var a=(r&32768)>>15,n=(r&16384)>>14;r&=16383;if(a==1&&r>=8192)r=r-16384;if(n==1&&t>=128)t=t-256;return{r:r,c:t,cRel:n,rRel:a};}function _c(e,r,t){var a=(e[e.l++]&96)>>5;var n=pc(e,t.biff>=2&&t.biff<=5?6:8,t);return[a,n];}function Cc(e,r,t){var a=(e[e.l++]&96)>>5;var n=e._R(2,"i");var i=8;if(t)switch(t.biff){case 5:e.l+=12;i=6;break;case 12:i=12;break;}var s=pc(e,i,t);return[a,n,s];}function Bc(e,r,t){var a=(e[e.l++]&96)>>5;e.l+=t&&t.biff>8?12:t.biff<8?6:8;return[a];}function Tc(e,r,t){var a=(e[e.l++]&96)>>5;var n=e._R(2);var i=8;if(t)switch(t.biff){case 5:e.l+=12;i=6;break;case 12:i=12;break;}e.l+=i;return[a,n];}function yc(e,r,t){var a=(e[e.l++]&96)>>5;var n=bc(e,r-1,t);return[a,n];}function xc(e,r,t){var a=(e[e.l++]&96)>>5;e.l+=t.biff==2?6:t.biff==12?14:7;return[a];}function Ac(e){var r=e[e.l+1]&1;var t=1;e.l+=4;return[r,t];}function Ic(e,r,t){e.l+=2;var a=e._R(t&&t.biff==2?1:2);var n=[];for(var i=0;i<=a;++i){n.push(e._R(t&&t.biff==2?1:2));}return n;}function Rc(e,r,t){var a=e[e.l+1]&255?1:0;e.l+=2;return[a,e._R(t&&t.biff==2?1:2)];}function Fc(e,r,t){var a=e[e.l+1]&255?1:0;e.l+=2;return[a,e._R(t&&t.biff==2?1:2)];}function Oc(e){var r=e[e.l+1]&255?1:0;e.l+=2;return[r,e._R(2)];}function Dc(e,r,t){var a=e[e.l+1]&255?1:0;e.l+=t&&t.biff==2?3:4;return[a];}function Pc(e){var r=e._R(1),t=e._R(1);return[r,t];}function Nc(e){e._R(2);return Pc(e,2);}function Lc(e){e._R(2);return Pc(e,2);}function Mc(e,r,t){var a=(e[e.l]&96)>>5;e.l+=1;var n=gc(e,0,t);return[a,n];}function Uc(e,r,t){var a=(e[e.l]&96)>>5;e.l+=1;var n=Ec(e,0,t);return[a,n];}function zc(e,r,t){var a=(e[e.l]&96)>>5;e.l+=1;var n=e._R(2);if(t&&t.biff==5)e.l+=12;var i=gc(e,0,t);return[a,n,i];}function Hc(e,r,t){var a=(e[e.l]&96)>>5;e.l+=1;var n=e._R(t&&t.biff<=3?1:2);return[nh[n],ah[n],a];}function Wc(e,r,t){var a=e[e.l++];var n=e._R(1),i=t&&t.biff<=3?[a==88?-1:0,e._R(1)]:Vc(e);return[n,(i[0]===0?ah:th)[i[1]]];}function Vc(e){return[e[e.l+1]>>7,e._R(2)&32767];}function Xc(e,r,t){e.l+=t&&t.biff==2?3:4;return;}function Gc(e,r,t){e.l++;if(t&&t.biff==12)return[e._R(4,"i"),0];var a=e._R(2);var n=e._R(t&&t.biff==2?1:2);return[a,n];}function jc(e){e.l++;return Aa[e._R(1)];}function Kc(e){e.l++;return e._R(2);}function $c(e){e.l++;return e._R(1)!==0;}function Yc(e){e.l++;return Qt(e,8);}function Zc(e,r,t){e.l++;return qn(e,r-1,t);}function Jc(e,r){var t=[e._R(1)];if(r==12)switch(t[0]){case 2:t[0]=4;break;case 4:t[0]=16;break;case 0:t[0]=1;break;case 1:t[0]=2;break;}switch(t[0]){case 4:t[1]=jn(e,1)?"TRUE":"FALSE";if(r!=12)e.l+=7;break;case 37:;case 16:t[1]=Aa[e[e.l]];e.l+=r==12?4:8;break;case 0:e.l+=8;break;case 1:t[1]=Qt(e,8);break;case 2:t[1]=ni(e,0,{biff:r>0&&r<8?2:r});break;default:throw new Error("Bad SerAr: "+t[0]);}return t;}function Qc(e,r,t){var a=e._R(t.biff==12?4:2);var n=[];for(var i=0;i!=a;++i){n.push((t.biff==12?Zt:_i)(e,8));}return n;}function qc(e,r,t){var a=0,n=0;if(t.biff==12){a=e._R(4);n=e._R(4);}else{n=1+e._R(1);a=1+e._R(2);}if(t.biff>=2&&t.biff<8){--a;if(--n==0)n=256;}for(var i=0,s=[];i!=a&&(s[i]=[]);++i){for(var f=0;f!=n;++f){s[i][f]=Jc(e,t.biff);}}return s;}function eu(e,r,t){var a=e._R(1)>>>5&3;var n=!t||t.biff>=8?4:2;var i=e._R(n);switch(t.biff){case 2:e.l+=5;break;case 3:;case 4:e.l+=8;break;case 5:e.l+=12;break;}return[a,0,i];}function ru(e,r,t){if(t.biff==5)return tu(e,r,t);var a=e._R(1)>>>5&3;var n=e._R(2);var i=e._R(4);return[a,n,i];}function tu(e){var r=e._R(1)>>>5&3;var t=e._R(2,"i");e.l+=8;var a=e._R(2);e.l+=12;return[r,t,a];}function au(e,r,t){var a=e._R(1)>>>5&3;e.l+=t&&t.biff==2?3:4;var n=e._R(t&&t.biff==2?1:2);return[a,n];}function nu(e,r,t){var a=e._R(1)>>>5&3;var n=e._R(t&&t.biff==2?1:2);return[a,n];}function iu(e,r,t){var a=e._R(1)>>>5&3;e.l+=4;if(t.biff<8)e.l--;if(t.biff==12)e.l+=2;return[a];}function su(e,r,t){var a=(e[e.l++]&96)>>5;var n=e._R(2);var i=4;if(t)switch(t.biff){case 5:i=15;break;case 12:i=6;break;}e.l+=i;return[a,n];}var fu=Zr;var lu=Zr;var ou=Zr;function cu(e,r,t){e.l+=2;return[kc(e,4,t)];}function uu(e){e.l+=6;return[];}var hu=cu;var du=uu;var vu=uu;var pu=cu;function mu(e){e.l+=2;return[$n(e),e._R(2)&1];}var bu=cu;var gu=mu;var wu=uu;var ku=cu;var Eu=cu;var Su=["Data","All","Headers","??","?Data2","??","?DataHeaders","??","Totals","??","??","??","?DataTotals","??","??","??","?Current"];function _u(e){e.l+=2;var r=e._R(2);var t=e._R(2);var a=e._R(4);var n=e._R(2);var i=e._R(2);var s=Su[t>>2&31];return{ixti:r,coltype:t&3,rt:s,idx:a,c:n,C:i};}function Cu(e){e.l+=2;return[e._R(4)];}function Bu(e,r,t){e.l+=5;e.l+=2;e.l+=t.biff==2?1:4;return["PTGSHEET"];}function Tu(e,r,t){e.l+=t.biff==2?4:5;return["PTGENDSHEET"];}function yu(e){var r=e._R(1)>>>5&3;var t=e._R(2);return[r,t];}function xu(e){var r=e._R(1)>>>5&3;var t=e._R(2);return[r,t];}function Au(e){e.l+=4;return[0,0];}var Iu={1:{n:"PtgExp",f:Gc},2:{n:"PtgTbl",f:ou},3:{n:"PtgAdd",f:dc},4:{n:"PtgSub",f:dc},5:{n:"PtgMul",f:dc},6:{n:"PtgDiv",f:dc},7:{n:"PtgPower",f:dc},8:{n:"PtgConcat",f:dc},9:{n:"PtgLt",f:dc},10:{n:"PtgLe",f:dc},11:{n:"PtgEq",f:dc},12:{n:"PtgGe",f:dc},13:{n:"PtgGt",f:dc},14:{n:"PtgNe",f:dc},15:{n:"PtgIsect",f:dc},16:{n:"PtgUnion",f:dc},17:{n:"PtgRange",f:dc},18:{n:"PtgUplus",f:dc},19:{n:"PtgUminus",f:dc},20:{n:"PtgPercent",f:dc},21:{n:"PtgParen",f:dc},22:{n:"PtgMissArg",f:dc},23:{n:"PtgStr",f:Zc},26:{n:"PtgSheet",f:Bu},27:{n:"PtgEndSheet",f:Tu},28:{n:"PtgErr",f:jc},29:{n:"PtgBool",f:$c},30:{n:"PtgInt",f:Kc},31:{n:"PtgNum",f:Yc},32:{n:"PtgArray",f:xc},33:{n:"PtgFunc",f:Hc},34:{n:"PtgFuncVar",f:Wc},35:{n:"PtgName",f:eu},36:{n:"PtgRef",f:Mc},37:{n:"PtgArea",f:_c},38:{n:"PtgMemArea",f:au},39:{n:"PtgMemErr",f:fu},40:{n:"PtgMemNoMem",f:lu},41:{n:"PtgMemFunc",f:nu},42:{n:"PtgRefErr",f:iu},43:{n:"PtgAreaErr",f:Bc},44:{n:"PtgRefN",f:Uc},45:{n:"PtgAreaN",f:yc},46:{n:"PtgMemAreaN",f:yu},47:{n:"PtgMemNoMemN",f:xu},57:{n:"PtgNameX",f:ru},58:{n:"PtgRef3d",f:zc},59:{n:"PtgArea3d",f:Cc},60:{n:"PtgRefErr3d",f:su},61:{n:"PtgAreaErr3d",f:Tc},255:{}};var Ru={64:32,96:32,65:33,97:33,66:34,98:34,67:35,99:35,68:36,100:36,69:37,101:37,70:38,102:38,71:39,103:39,72:40,104:40,73:41,105:41,74:42,106:42,75:43,107:43,76:44,108:44,77:45,109:45,78:46,110:46,79:47,111:47,88:34,120:34,89:57,121:57,90:58,122:58,91:59,123:59,92:60,124:60,93:61,125:61};(function(){for(var e in Ru){Iu[e]=Iu[Ru[e]];}})();var Fu={1:{n:"PtgElfLel",f:mu},2:{n:"PtgElfRw",f:ku},3:{n:"PtgElfCol",f:hu},6:{n:"PtgElfRwV",f:Eu},7:{n:"PtgElfColV",f:pu},10:{n:"PtgElfRadical",f:bu},11:{n:"PtgElfRadicalS",f:wu},13:{n:"PtgElfColS",f:du},15:{n:"PtgElfColSV",f:vu},16:{n:"PtgElfRadicalLel",f:gu},25:{n:"PtgList",f:_u},29:{n:"PtgSxName",f:Cu},255:{}};var Ou={0:{n:"PtgAttrNoop",f:Au},1:{n:"PtgAttrSemi",f:Dc},2:{n:"PtgAttrIf",f:Fc},4:{n:"PtgAttrChoose",f:Ic},8:{n:"PtgAttrGoto",f:Rc},16:{n:"PtgAttrSum",f:Xc},32:{n:"PtgAttrBaxcel",f:Ac},64:{n:"PtgAttrSpace",f:Nc},65:{n:"PtgAttrSpaceSemi",f:Lc},128:{n:"PtgAttrIfError",f:Oc},255:{}};Ou[33]=Ou[32];function Du(e,r,t,a){if(a.biff<8)return Zr(e,r);var n=e.l+r;var i=[];for(var s=0;s!==t.length;++s){switch(t[s][0]){case"PtgArray":t[s][1]=qc(e,0,a);i.push(t[s][1]);break;case"PtgMemArea":t[s][2]=Qc(e,t[s][1],a);i.push(t[s][2]);break;case"PtgExp":if(a&&a.biff==12){t[s][1][1]=e._R(4);i.push(t[s][1]);}break;case"PtgList":;case"PtgElfRadicalS":;case"PtgElfColS":;case"PtgElfColSV":throw"Unsupported "+t[s][0];default:break;}}r=n-e.l;if(r!==0)i.push(Zr(e,r));return i;}function Pu(e,r,t){var a=e.l+r;var n,i,s=[];while(a!=e.l){r=a-e.l;i=e[e.l];n=Iu[i];if(i===24||i===25)n=(i===24?Fu:Ou)[e[e.l+1]];if(!n||!n.f){Zr(e,r);}else{s.push([n.n,n.f(e,r,t)]);}}return s;}function Nu(e){var r=[];for(var t=0;t<e.length;++t){var a=e[t],n=[];for(var i=0;i<a.length;++i){var s=a[i];if(s)switch(s[0]){case 2:n.push('"'+s[1].replace(/"/g,'""')+'"');break;default:n.push(s[1]);}else n.push("");}r.push(n.join(","));}return r.join(";");}var Lu={PtgAdd:"+",PtgConcat:"&",PtgDiv:"/",PtgEq:"=",PtgGe:">=",PtgGt:">",PtgLe:"<=",PtgLt:"<",PtgMul:"*",PtgNe:"<>",PtgPower:"^",PtgSub:"-"};var Mu=new RegExp(/[^\w\u4E00-\u9FFF\u3040-\u30FF]/);function Uu(e,r){if(!e&&!(r&&r.biff<=5&&r.biff>=2))throw new Error("empty sheet name");if(Mu.test(e))return"'"+e+"'";return e;}function zu(e,r,t){if(!e)return"SH33TJSERR0";if(t.biff>8&&(!e.XTI||!e.XTI[r]))return e.SheetNames[r];if(!e.XTI)return"SH33TJSERR6";var a=e.XTI[r];if(t.biff<8){if(r>1e4)r-=65536;if(r<0)r=-r;return r==0?"":e.XTI[r-1];}if(!a)return"SH33TJSERR1";var n="";if(t.biff>8)switch(e[a[0]][0]){case 357:n=a[1]==-1?"#REF":e.SheetNames[a[1]];return a[1]==a[2]?n:n+":"+e.SheetNames[a[2]];case 358:if(t.SID!=null)return e.SheetNames[t.SID];return"SH33TJSSAME"+e[a[0]][0];case 355:;default:return"SH33TJSSRC"+e[a[0]][0];}switch(e[a[0]][0][0]){case 1025:n=a[1]==-1?"#REF":e.SheetNames[a[1]]||"SH33TJSERR3";return a[1]==a[2]?n:n+":"+e.SheetNames[a[2]];case 14849:return e[a[0]].slice(1).map(function(e){return e.Name;}).join(";;");default:if(!e[a[0]][0][3])return"SH33TJSERR2";n=a[1]==-1?"#REF":e[a[0]][0][3][a[1]]||"SH33TJSERR4";return a[1]==a[2]?n:n+":"+e[a[0]][0][3][a[2]];}}function Hu(e,r,t){var a=zu(e,r,t);return a=="#REF"?a:Uu(a,t);}function Wu(e,r,t,a,n){var i=n&&n.biff||8;var s={s:{c:0,r:0},e:{c:0,r:0}};var f=[],l,o,c,u=0,h=0,d,v="";if(!e[0]||!e[0][0])return"";var p=-1,m="";for(var b=0,g=e[0].length;b<g;++b){var w=e[0][b];switch(w[0]){case"PtgUminus":f.push("-"+f.pop());break;case"PtgUplus":f.push("+"+f.pop());break;case"PtgPercent":f.push(f.pop()+"%");break;case"PtgAdd":;case"PtgConcat":;case"PtgDiv":;case"PtgEq":;case"PtgGe":;case"PtgGt":;case"PtgLe":;case"PtgLt":;case"PtgMul":;case"PtgNe":;case"PtgPower":;case"PtgSub":l=f.pop();o=f.pop();if(p>=0){switch(e[0][p][1][0]){case 0:m=ue(" ",e[0][p][1][1]);break;case 1:m=ue("\r",e[0][p][1][1]);break;default:m="";if(n.WTF)throw new Error("Unexpected PtgAttrSpaceType "+e[0][p][1][0]);}o=o+m;p=-1;}f.push(o+Lu[w[0]]+l);break;case"PtgIsect":l=f.pop();o=f.pop();f.push(o+" "+l);break;case"PtgUnion":l=f.pop();o=f.pop();f.push(o+","+l);break;case"PtgRange":l=f.pop();o=f.pop();f.push(o+":"+l);break;case"PtgAttrChoose":break;case"PtgAttrGoto":break;case"PtgAttrIf":break;case"PtgAttrIfError":break;case"PtgRef":c=rt(w[1][1],s,n);f.push(at(c,i));break;case"PtgRefN":c=t?rt(w[1][1],t,n):w[1][1];f.push(at(c,i));break;case"PtgRef3d":u=w[1][1];c=rt(w[1][2],s,n);v=Hu(a,u,n);var k=v;f.push(v+"!"+at(c,i));break;case"PtgFunc":;case"PtgFuncVar":var E=w[1][0],S=w[1][1];if(!E)E=0;E&=127;var _=E==0?[]:f.slice(-E);f.length-=E;if(S==="User")S=_.shift();f.push(S+"("+_.join(",")+")");break;case"PtgBool":f.push(w[1]?"TRUE":"FALSE");break;case"PtgInt":f.push(w[1]);break;case"PtgNum":f.push(String(w[1]));break;case"PtgStr":f.push('"'+w[1].replace(/"/g,'""')+'"');break;case"PtgErr":f.push(w[1]);break;case"PtgAreaN":d=tt(w[1][1],t?{s:t}:s,n);f.push(nt(d,n));break;case"PtgArea":d=tt(w[1][1],s,n);f.push(nt(d,n));break;case"PtgArea3d":u=w[1][1];d=w[1][2];v=Hu(a,u,n);f.push(v+"!"+nt(d,n));break;case"PtgAttrSum":f.push("SUM("+f.pop()+")");break;case"PtgAttrBaxcel":;case"PtgAttrSemi":break;case"PtgName":h=w[1][2];var C=(a.names||[])[h-1]||(a[0]||[])[h];var B=C?C.Name:"SH33TJSNAME"+String(h);if(B in ih)B=ih[B];f.push(B);break;case"PtgNameX":var T=w[1][1];h=w[1][2];var y;if(n.biff<=5){if(T<0)T=-T;if(a[T])y=a[T][h];}else{var x="";if(((a[T]||[])[0]||[])[0]==14849){}else if(((a[T]||[])[0]||[])[0]==1025){if(a[T][h]&&a[T][h].itab>0){x=a.SheetNames[a[T][h].itab-1]+"!";}}else x=a.SheetNames[h-1]+"!";if(a[T]&&a[T][h])x+=a[T][h].Name;else if(a[0]&&a[0][h])x+=a[0][h].Name;else{var A=(zu(a,T,n)||"").split(";;");if(A[h-1])x=A[h-1];else x+="SH33TJSERRX";}f.push(x);break;}if(!y)y={Name:"SH33TJSERRY"};f.push(y.Name);break;case"PtgParen":var I="(",R=")";if(p>=0){m="";switch(e[0][p][1][0]){case 2:I=ue(" ",e[0][p][1][1])+I;break;case 3:I=ue("\r",e[0][p][1][1])+I;break;case 4:R=ue(" ",e[0][p][1][1])+R;break;case 5:R=ue("\r",e[0][p][1][1])+R;break;default:if(n.WTF)throw new Error("Unexpected PtgAttrSpaceType "+e[0][p][1][0]);}p=-1;}f.push(I+f.pop()+R);break;case"PtgRefErr":f.push("#REF!");break;case"PtgRefErr3d":f.push("#REF!");break;case"PtgExp":c={c:w[1][1],r:w[1][0]};var F={c:t.c,r:t.r};if(a.sharedf[bt(c)]){var O=a.sharedf[bt(c)];f.push(Wu(O,s,F,a,n));}else{var D=false;for(l=0;l!=a.arrayf.length;++l){o=a.arrayf[l];if(c.c<o[0].s.c||c.c>o[0].e.c)continue;if(c.r<o[0].s.r||c.r>o[0].e.r)continue;f.push(Wu(o[1],s,F,a,n));D=true;break;}if(!D)f.push(w[1]);}break;case"PtgArray":f.push("{"+Nu(w[1])+"}");break;case"PtgMemArea":break;case"PtgAttrSpace":;case"PtgAttrSpaceSemi":p=b;break;case"PtgTbl":break;case"PtgMemErr":break;case"PtgMissArg":f.push("");break;case"PtgAreaErr":f.push("#REF!");break;case"PtgAreaErr3d":f.push("#REF!");break;case"PtgList":f.push("Table"+w[1].idx+"[#"+w[1].rt+"]");break;case"PtgMemAreaN":;case"PtgMemNoMemN":;case"PtgAttrNoop":;case"PtgSheet":;case"PtgEndSheet":break;case"PtgMemFunc":break;case"PtgMemNoMem":break;case"PtgElfCol":;case"PtgElfColS":;case"PtgElfColSV":;case"PtgElfColV":;case"PtgElfLel":;case"PtgElfRadical":;case"PtgElfRadicalLel":;case"PtgElfRadicalS":;case"PtgElfRw":;case"PtgElfRwV":throw new Error("Unsupported ELFs");case"PtgSxName":throw new Error("Unrecognized Formula Token: "+String(w));default:throw new Error("Unrecognized Formula Token: "+String(w));}var P=["PtgAttrSpace","PtgAttrSpaceSemi","PtgAttrGoto"];if(n.biff!=3)if(p>=0&&P.indexOf(e[0][b][0])==-1){w=e[0][p];var N=true;switch(w[1][0]){case 4:N=false;case 0:m=ue(" ",w[1][1]);break;case 5:N=false;case 1:m=ue("\r",w[1][1]);break;default:m="";if(n.WTF)throw new Error("Unexpected PtgAttrSpaceType "+w[1][0]);}f.push((N?m:"")+f.pop()+(N?"":m));p=-1;}}if(f.length>1&&n.WTF)throw new Error("bad formula stack");return f[0];}function Vu(e,r,t){var a=e.l+r,n=t.biff==2?1:2;var i,s=e._R(n);if(s==65535)return[[],Zr(e,r-2)];var f=Pu(e,s,t);if(r!==s+n)i=Du(e,r-s-n,f,t);e.l=a;return[f,i];}function Xu(e,r,t){var a=e.l+r,n=t.biff==2?1:2;var i,s=e._R(n);if(s==65535)return[[],Zr(e,r-2)];var f=Pu(e,s,t);if(r!==s+n)i=Du(e,r-s-n,f,t);e.l=a;return[f,i];}function Gu(e,r,t,a){var n=e.l+r;var i=Pu(e,a,t);var s;if(n!==e.l)s=Du(e,n-e.l,i,t);return[i,s];}function ju(e,r,t){var a=e.l+r;var n,i=e._R(2);var s=Pu(e,i,t);if(i==65535)return[[],Zr(e,r-2)];if(r!==i+2)n=Du(e,a-i-2,s,t);return[s,n];}function Ku(e){var r;if(Mr(e,e.l+6)!==65535)return[Qt(e),"n"];switch(e[e.l]){case 0:e.l+=8;return["String","s"];case 1:r=e[e.l+2]===1;e.l+=8;return[r,"b"];case 2:r=e[e.l+2];e.l+=8;return[r,"e"];case 3:e.l+=8;return["","s"];}return[];}function $u(e){if(e==null){var r=Jr(8);r._W(1,3);r._W(1,0);r._W(2,0);r._W(2,0);r._W(2,65535);return r;}else if(typeof e=="number")return qt(e);return qt(0);}function Yu(e,r,t){var a=e.l+r;var n=mi(e,6);if(t.biff==2)++e.l;var i=Ku(e,8);var s=e._R(1);if(t.biff!=2){e._R(1);if(t.biff>=5){e._R(4);}}var f=Xu(e,a-e.l,t);return{cell:n,val:i[0],formula:f,shared:s>>3&1,tt:i[1]};}function Zu(e,r,t,a,n){var i=bi(r,t,n);var s=$u(e.v);var f=Jr(6);var l=1|32;f._W(2,l);f._W(4,0);var o=Jr(e.bf.length);for(var c=0;c<e.bf.length;++c){o[c]=e.bf[c];}var u=I([i,s,f,o]);return u;}function Ju(e,r,t){var a=e._R(4);var n=Pu(e,a,t);var i=e._R(4);var s=i>0?Du(e,i,n,t):null;return[n,s];}var Qu=Ju;var qu=Ju;var eh=Ju;var rh=Ju;var th={0:"BEEP",1:"OPEN",2:"OPEN.LINKS",3:"CLOSE.ALL",4:"SAVE",5:"SAVE.AS",6:"FILE.DELETE",7:"PAGE.SETUP",8:"PRINT",9:"PRINTER.SETUP",10:"QUIT",11:"NEW.WINDOW",12:"ARRANGE.ALL",13:"WINDOW.SIZE",14:"WINDOW.MOVE",15:"FULL",16:"CLOSE",17:"RUN",22:"SET.PRINT.AREA",23:"SET.PRINT.TITLES",24:"SET.PAGE.BREAK",25:"REMOVE.PAGE.BREAK",26:"FONT",27:"DISPLAY",28:"PROTECT.DOCUMENT",29:"PRECISION",30:"A1.R1C1",31:"CALCULATE.NOW",32:"CALCULATION",34:"DATA.FIND",35:"EXTRACT",36:"DATA.DELETE",37:"SET.DATABASE",38:"SET.CRITERIA",39:"SORT",40:"DATA.SERIES",41:"TABLE",42:"FORMAT.NUMBER",43:"ALIGNMENT",44:"STYLE",45:"BORDER",46:"CELL.PROTECTION",47:"COLUMN.WIDTH",48:"UNDO",49:"CUT",50:"COPY",51:"PASTE",52:"CLEAR",53:"PASTE.SPECIAL",54:"EDIT.DELETE",55:"INSERT",56:"FILL.RIGHT",57:"FILL.DOWN",61:"DEFINE.NAME",62:"CREATE.NAMES",63:"FORMULA.GOTO",64:"FORMULA.FIND",65:"SELECT.LAST.CELL",66:"SHOW.ACTIVE.CELL",67:"GALLERY.AREA",68:"GALLERY.BAR",69:"GALLERY.COLUMN",70:"GALLERY.LINE",71:"GALLERY.PIE",72:"GALLERY.SCATTER",73:"COMBINATION",74:"PREFERRED",75:"ADD.OVERLAY",76:"GRIDLINES",77:"SET.PREFERRED",78:"AXES",79:"LEGEND",80:"ATTACH.TEXT",81:"ADD.ARROW",82:"SELECT.CHART",83:"SELECT.PLOT.AREA",84:"PATTERNS",85:"MAIN.CHART",86:"OVERLAY",87:"SCALE",88:"FORMAT.LEGEND",89:"FORMAT.TEXT",90:"EDIT.REPEAT",91:"PARSE",92:"JUSTIFY",93:"HIDE",94:"UNHIDE",95:"WORKSPACE",96:"FORMULA",97:"FORMULA.FILL",98:"FORMULA.ARRAY",99:"DATA.FIND.NEXT",100:"DATA.FIND.PREV",101:"FORMULA.FIND.NEXT",102:"FORMULA.FIND.PREV",103:"ACTIVATE",104:"ACTIVATE.NEXT",105:"ACTIVATE.PREV",106:"UNLOCKED.NEXT",107:"UNLOCKED.PREV",108:"COPY.PICTURE",109:"SELECT",110:"DELETE.NAME",111:"DELETE.FORMAT",112:"VLINE",113:"HLINE",114:"VPAGE",115:"HPAGE",116:"VSCROLL",117:"HSCROLL",118:"ALERT",119:"NEW",120:"CANCEL.COPY",121:"SHOW.CLIPBOARD",122:"MESSAGE",124:"PASTE.LINK",125:"APP.ACTIVATE",126:"DELETE.ARROW",127:"ROW.HEIGHT",128:"FORMAT.MOVE",129:"FORMAT.SIZE",130:"FORMULA.REPLACE",131:"SEND.KEYS",132:"SELECT.SPECIAL",133:"APPLY.NAMES",134:"REPLACE.FONT",135:"FREEZE.PANES",136:"SHOW.INFO",137:"SPLIT",138:"ON.WINDOW",139:"ON.DATA",140:"DISABLE.INPUT",142:"OUTLINE",143:"LIST.NAMES",144:"FILE.CLOSE",145:"SAVE.WORKBOOK",146:"DATA.FORM",147:"COPY.CHART",148:"ON.TIME",149:"WAIT",150:"FORMAT.FONT",151:"FILL.UP",152:"FILL.LEFT",153:"DELETE.OVERLAY",155:"SHORT.MENUS",159:"SET.UPDATE.STATUS",161:"COLOR.PALETTE",162:"DELETE.STYLE",163:"WINDOW.RESTORE",164:"WINDOW.MAXIMIZE",166:"CHANGE.LINK",167:"CALCULATE.DOCUMENT",168:"ON.KEY",169:"APP.RESTORE",170:"APP.MOVE",171:"APP.SIZE",172:"APP.MINIMIZE",173:"APP.MAXIMIZE",174:"BRING.TO.FRONT",175:"SEND.TO.BACK",185:"MAIN.CHART.TYPE",186:"OVERLAY.CHART.TYPE",187:"SELECT.END",188:"OPEN.MAIL",189:"SEND.MAIL",190:"STANDARD.FONT",191:"CONSOLIDATE",192:"SORT.SPECIAL",193:"GALLERY.3D.AREA",194:"GALLERY.3D.COLUMN",195:"GALLERY.3D.LINE",196:"GALLERY.3D.PIE",197:"VIEW.3D",198:"GOAL.SEEK",199:"WORKGROUP",200:"FILL.GROUP",201:"UPDATE.LINK",202:"PROMOTE",203:"DEMOTE",204:"SHOW.DETAIL",206:"UNGROUP",207:"OBJECT.PROPERTIES",208:"SAVE.NEW.OBJECT",209:"SHARE",210:"SHARE.NAME",211:"DUPLICATE",212:"APPLY.STYLE",213:"ASSIGN.TO.OBJECT",214:"OBJECT.PROTECTION",215:"HIDE.OBJECT",216:"SET.EXTRACT",217:"CREATE.PUBLISHER",218:"SUBSCRIBE.TO",219:"ATTRIBUTES",220:"SHOW.TOOLBAR",222:"PRINT.PREVIEW",223:"EDIT.COLOR",224:"SHOW.LEVELS",225:"FORMAT.MAIN",226:"FORMAT.OVERLAY",227:"ON.RECALC",228:"EDIT.SERIES",229:"DEFINE.STYLE",240:"LINE.PRINT",243:"ENTER.DATA",249:"GALLERY.RADAR",250:"MERGE.STYLES",251:"EDITION.OPTIONS",252:"PASTE.PICTURE",253:"PASTE.PICTURE.LINK",254:"SPELLING",256:"ZOOM",259:"INSERT.OBJECT",260:"WINDOW.MINIMIZE",265:"SOUND.NOTE",266:"SOUND.PLAY",267:"FORMAT.SHAPE",268:"EXTEND.POLYGON",269:"FORMAT.AUTO",272:"GALLERY.3D.BAR",273:"GALLERY.3D.SURFACE",274:"FILL.AUTO",276:"CUSTOMIZE.TOOLBAR",277:"ADD.TOOL",278:"EDIT.OBJECT",279:"ON.DOUBLECLICK",280:"ON.ENTRY",281:"WORKBOOK.ADD",282:"WORKBOOK.MOVE",283:"WORKBOOK.COPY",284:"WORKBOOK.OPTIONS",285:"SAVE.WORKSPACE",288:"CHART.WIZARD",289:"DELETE.TOOL",290:"MOVE.TOOL",291:"WORKBOOK.SELECT",292:"WORKBOOK.ACTIVATE",293:"ASSIGN.TO.TOOL",295:"COPY.TOOL",296:"RESET.TOOL",297:"CONSTRAIN.NUMERIC",298:"PASTE.TOOL",302:"WORKBOOK.NEW",305:"SCENARIO.CELLS",306:"SCENARIO.DELETE",307:"SCENARIO.ADD",308:"SCENARIO.EDIT",309:"SCENARIO.SHOW",310:"SCENARIO.SHOW.NEXT",311:"SCENARIO.SUMMARY",312:"PIVOT.TABLE.WIZARD",313:"PIVOT.FIELD.PROPERTIES",314:"PIVOT.FIELD",315:"PIVOT.ITEM",316:"PIVOT.ADD.FIELDS",318:"OPTIONS.CALCULATION",319:"OPTIONS.EDIT",320:"OPTIONS.VIEW",321:"ADDIN.MANAGER",322:"MENU.EDITOR",323:"ATTACH.TOOLBARS",324:"VBAActivate",325:"OPTIONS.CHART",328:"VBA.INSERT.FILE",330:"VBA.PROCEDURE.DEFINITION",336:"ROUTING.SLIP",338:"ROUTE.DOCUMENT",339:"MAIL.LOGON",342:"INSERT.PICTURE",343:"EDIT.TOOL",344:"GALLERY.DOUGHNUT",350:"CHART.TREND",352:"PIVOT.ITEM.PROPERTIES",354:"WORKBOOK.INSERT",355:"OPTIONS.TRANSITION",356:"OPTIONS.GENERAL",370:"FILTER.ADVANCED",373:"MAIL.ADD.MAILER",374:"MAIL.DELETE.MAILER",375:"MAIL.REPLY",376:"MAIL.REPLY.ALL",377:"MAIL.FORWARD",378:"MAIL.NEXT.LETTER",379:"DATA.LABEL",380:"INSERT.TITLE",381:"FONT.PROPERTIES",382:"MACRO.OPTIONS",383:"WORKBOOK.HIDE",384:"WORKBOOK.UNHIDE",385:"WORKBOOK.DELETE",386:"WORKBOOK.NAME",388:"GALLERY.CUSTOM",390:"ADD.CHART.AUTOFORMAT",391:"DELETE.CHART.AUTOFORMAT",392:"CHART.ADD.DATA",393:"AUTO.OUTLINE",394:"TAB.ORDER",395:"SHOW.DIALOG",396:"SELECT.ALL",397:"UNGROUP.SHEETS",398:"SUBTOTAL.CREATE",399:"SUBTOTAL.REMOVE",400:"RENAME.OBJECT",412:"WORKBOOK.SCROLL",413:"WORKBOOK.NEXT",414:"WORKBOOK.PREV",415:"WORKBOOK.TAB.SPLIT",416:"FULL.SCREEN",417:"WORKBOOK.PROTECT",420:"SCROLLBAR.PROPERTIES",421:"PIVOT.SHOW.PAGES",422:"TEXT.TO.COLUMNS",423:"FORMAT.CHARTTYPE",424:"LINK.FORMAT",425:"TRACER.DISPLAY",430:"TRACER.NAVIGATE",431:"TRACER.CLEAR",432:"TRACER.ERROR",433:"PIVOT.FIELD.GROUP",434:"PIVOT.FIELD.UNGROUP",435:"CHECKBOX.PROPERTIES",436:"LABEL.PROPERTIES",437:"LISTBOX.PROPERTIES",438:"EDITBOX.PROPERTIES",439:"PIVOT.REFRESH",440:"LINK.COMBO",441:"OPEN.TEXT",442:"HIDE.DIALOG",443:"SET.DIALOG.FOCUS",444:"ENABLE.OBJECT",445:"PUSHBUTTON.PROPERTIES",446:"SET.DIALOG.DEFAULT",447:"FILTER",448:"FILTER.SHOW.ALL",449:"CLEAR.OUTLINE",450:"FUNCTION.WIZARD",451:"ADD.LIST.ITEM",452:"SET.LIST.ITEM",453:"REMOVE.LIST.ITEM",454:"SELECT.LIST.ITEM",455:"SET.CONTROL.VALUE",456:"SAVE.COPY.AS",458:"OPTIONS.LISTS.ADD",459:"OPTIONS.LISTS.DELETE",460:"SERIES.AXES",461:"SERIES.X",462:"SERIES.Y",463:"ERRORBAR.X",464:"ERRORBAR.Y",465:"FORMAT.CHART",466:"SERIES.ORDER",467:"MAIL.LOGOFF",468:"CLEAR.ROUTING.SLIP",469:"APP.ACTIVATE.MICROSOFT",470:"MAIL.EDIT.MAILER",471:"ON.SHEET",472:"STANDARD.WIDTH",473:"SCENARIO.MERGE",474:"SUMMARY.INFO",475:"FIND.FILE",476:"ACTIVE.CELL.FONT",477:"ENABLE.TIPWIZARD",478:"VBA.MAKE.ADDIN",480:"INSERTDATATABLE",481:"WORKGROUP.OPTIONS",482:"MAIL.SEND.MAILER",485:"AUTOCORRECT",489:"POST.DOCUMENT",491:"PICKLIST",493:"VIEW.SHOW",494:"VIEW.DEFINE",495:"VIEW.DELETE",509:"SHEET.BACKGROUND",510:"INSERT.MAP.OBJECT",511:"OPTIONS.MENONO",517:"MSOCHECKS",518:"NORMAL",519:"LAYOUT",520:"RM.PRINT.AREA",521:"CLEAR.PRINT.AREA",522:"ADD.PRINT.AREA",523:"MOVE.BRK",545:"HIDECURR.NOTE",546:"HIDEALL.NOTES",547:"DELETE.NOTE",548:"TRAVERSE.NOTES",549:"ACTIVATE.NOTES",620:"PROTECT.REVISIONS",621:"UNPROTECT.REVISIONS",647:"OPTIONS.ME",653:"WEB.PUBLISH",667:"NEWWEBQUERY",673:"PIVOT.TABLE.CHART",753:"OPTIONS.SAVE",755:"OPTIONS.SPELL",808:"HIDEALL.INKANNOTS"};var ah={0:"COUNT",1:"IF",2:"ISNA",3:"ISERROR",4:"SUM",5:"AVERAGE",6:"MIN",7:"MAX",8:"ROW",9:"COLUMN",10:"NA",11:"NPV",12:"STDEV",13:"DOLLAR",14:"FIXED",15:"SIN",16:"COS",17:"TAN",18:"ATAN",19:"PI",20:"SQRT",21:"EXP",22:"LN",23:"LOG10",24:"ABS",25:"INT",26:"SIGN",27:"ROUND",28:"LOOKUP",29:"INDEX",30:"REPT",31:"MID",32:"LEN",33:"VALUE",34:"TRUE",35:"FALSE",36:"AND",37:"OR",38:"NOT",39:"MOD",40:"DCOUNT",41:"DSUM",42:"DAVERAGE",43:"DMIN",44:"DMAX",45:"DSTDEV",46:"VAR",47:"DVAR",48:"TEXT",49:"LINEST",50:"TREND",51:"LOGEST",52:"GROWTH",53:"GOTO",54:"HALT",55:"RETURN",56:"PV",57:"FV",58:"NPER",59:"PMT",60:"RATE",61:"MIRR",62:"IRR",63:"RAND",64:"MATCH",65:"DATE",66:"TIME",67:"DAY",68:"MONTH",69:"YEAR",70:"WEEKDAY",71:"HOUR",72:"MINUTE",73:"SECOND",74:"NOW",75:"AREAS",76:"ROWS",77:"COLUMNS",78:"OFFSET",79:"ABSREF",80:"RELREF",81:"ARGUMENT",82:"SEARCH",83:"TRANSPOSE",84:"ERROR",85:"STEP",86:"TYPE",87:"ECHO",88:"SET.NAME",89:"CALLER",90:"DEREF",91:"WINDOWS",92:"SERIES",93:"DOCUMENTS",94:"ACTIVE.CELL",95:"SELECTION",96:"RESULT",97:"ATAN2",98:"ASIN",99:"ACOS",100:"CHOOSE",101:"HLOOKUP",102:"VLOOKUP",103:"LINKS",104:"INPUT",105:"ISREF",106:"GET.FORMULA",107:"GET.NAME",108:"SET.VALUE",109:"LOG",110:"EXEC",111:"CHAR",112:"LOWER",113:"UPPER",114:"PROPER",115:"LEFT",116:"RIGHT",117:"EXACT",118:"TRIM",119:"REPLACE",120:"SUBSTITUTE",121:"CODE",122:"NAMES",123:"DIRECTORY",124:"FIND",125:"CELL",126:"ISERR",127:"ISTEXT",128:"ISNUMBER",129:"ISBLANK",130:"T",131:"N",132:"FOPEN",133:"FCLOSE",134:"FSIZE",135:"FREADLN",136:"FREAD",137:"FWRITELN",138:"FWRITE",139:"FPOS",140:"DATEVALUE",141:"TIMEVALUE",142:"SLN",143:"SYD",144:"DDB",145:"GET.DEF",146:"REFTEXT",147:"TEXTREF",148:"INDIRECT",149:"REGISTER",150:"CALL",151:"ADD.BAR",152:"ADD.MENU",153:"ADD.COMMAND",154:"ENABLE.COMMAND",155:"CHECK.COMMAND",156:"RENAME.COMMAND",157:"SHOW.BAR",158:"DELETE.MENU",159:"DELETE.COMMAND",160:"GET.CHART.ITEM",161:"DIALOG.BOX",162:"CLEAN",163:"MDETERM",164:"MINVERSE",165:"MMULT",166:"FILES",167:"IPMT",168:"PPMT",169:"COUNTA",170:"CANCEL.KEY",171:"FOR",172:"WHILE",173:"BREAK",174:"NEXT",175:"INITIATE",176:"REQUEST",177:"POKE",178:"EXECUTE",179:"TERMINATE",180:"RESTART",181:"HELP",182:"GET.BAR",183:"PRODUCT",184:"FACT",185:"GET.CELL",186:"GET.WORKSPACE",187:"GET.WINDOW",188:"GET.DOCUMENT",189:"DPRODUCT",190:"ISNONTEXT",191:"GET.NOTE",192:"NOTE",193:"STDEVP",194:"VARP",195:"DSTDEVP",196:"DVARP",197:"TRUNC",198:"ISLOGICAL",199:"DCOUNTA",200:"DELETE.BAR",201:"UNREGISTER",204:"USDOLLAR",205:"FINDB",206:"SEARCHB",207:"REPLACEB",208:"LEFTB",209:"RIGHTB",210:"MIDB",211:"LENB",212:"ROUNDUP",213:"ROUNDDOWN",214:"ASC",215:"DBCS",216:"RANK",219:"ADDRESS",220:"DAYS360",221:"TODAY",222:"VDB",223:"ELSE",224:"ELSE.IF",225:"END.IF",226:"FOR.CELL",227:"MEDIAN",228:"SUMPRODUCT",229:"SINH",230:"COSH",231:"TANH",232:"ASINH",233:"ACOSH",234:"ATANH",235:"DGET",236:"CREATE.OBJECT",237:"VOLATILE",238:"LAST.ERROR",239:"CUSTOM.UNDO",240:"CUSTOM.REPEAT",241:"FORMULA.CONVERT",242:"GET.LINK.INFO",243:"TEXT.BOX",244:"INFO",245:"GROUP",246:"GET.OBJECT",247:"DB",248:"PAUSE",251:"RESUME",252:"FREQUENCY",253:"ADD.TOOLBAR",254:"DELETE.TOOLBAR",255:"User",256:"RESET.TOOLBAR",257:"EVALUATE",258:"GET.TOOLBAR",259:"GET.TOOL",260:"SPELLING.CHECK",261:"ERROR.TYPE",262:"APP.TITLE",263:"WINDOW.TITLE",264:"SAVE.TOOLBAR",265:"ENABLE.TOOL",266:"PRESS.TOOL",267:"REGISTER.ID",268:"GET.WORKBOOK",269:"AVEDEV",270:"BETADIST",271:"GAMMALN",272:"BETAINV",273:"BINOMDIST",274:"CHIDIST",275:"CHIINV",276:"COMBIN",277:"CONFIDENCE",278:"CRITBINOM",279:"EVEN",280:"EXPONDIST",281:"FDIST",282:"FINV",283:"FISHER",284:"FISHERINV",285:"FLOOR",286:"GAMMADIST",287:"GAMMAINV",288:"CEILING",289:"HYPGEOMDIST",290:"LOGNORMDIST",291:"LOGINV",292:"NEGBINOMDIST",293:"NORMDIST",294:"NORMSDIST",295:"NORMINV",296:"NORMSINV",297:"STANDARDIZE",298:"ODD",299:"PERMUT",300:"POISSON",301:"TDIST",302:"WEIBULL",303:"SUMXMY2",304:"SUMX2MY2",305:"SUMX2PY2",306:"CHITEST",307:"CORREL",308:"COVAR",309:"FORECAST",310:"FTEST",311:"INTERCEPT",312:"PEARSON",313:"RSQ",314:"STEYX",315:"SLOPE",316:"TTEST",317:"PROB",318:"DEVSQ",319:"GEOMEAN",320:"HARMEAN",321:"SUMSQ",322:"KURT",323:"SKEW",324:"ZTEST",325:"LARGE",326:"SMALL",327:"QUARTILE",328:"PERCENTILE",329:"PERCENTRANK",330:"MODE",331:"TRIMMEAN",332:"TINV",334:"MOVIE.COMMAND",335:"GET.MOVIE",336:"CONCATENATE",337:"POWER",338:"PIVOT.ADD.DATA",339:"GET.PIVOT.TABLE",340:"GET.PIVOT.FIELD",341:"GET.PIVOT.ITEM",342:"RADIANS",343:"DEGREES",344:"SUBTOTAL",345:"SUMIF",346:"COUNTIF",347:"COUNTBLANK",348:"SCENARIO.GET",349:"OPTIONS.LISTS.GET",350:"ISPMT",351:"DATEDIF",352:"DATESTRING",353:"NUMBERSTRING",354:"ROMAN",355:"OPEN.DIALOG",356:"SAVE.DIALOG",357:"VIEW.GET",358:"GETPIVOTDATA",359:"HYPERLINK",360:"PHONETIC",361:"AVERAGEA",362:"MAXA",363:"MINA",364:"STDEVPA",365:"VARPA",366:"STDEVA",367:"VARA",368:"BAHTTEXT",369:"THAIDAYOFWEEK",370:"THAIDIGIT",371:"THAIMONTHOFYEAR",372:"THAINUMSOUND",373:"THAINUMSTRING",374:"THAISTRINGLENGTH",375:"ISTHAIDIGIT",376:"ROUNDBAHTDOWN",377:"ROUNDBAHTUP",378:"THAIYEAR",379:"RTD",380:"CUBEVALUE",381:"CUBEMEMBER",382:"CUBEMEMBERPROPERTY",383:"CUBERANKEDMEMBER",384:"HEX2BIN",385:"HEX2DEC",386:"HEX2OCT",387:"DEC2BIN",388:"DEC2HEX",389:"DEC2OCT",390:"OCT2BIN",391:"OCT2HEX",392:"OCT2DEC",393:"BIN2DEC",394:"BIN2OCT",395:"BIN2HEX",396:"IMSUB",397:"IMDIV",398:"IMPOWER",399:"IMABS",400:"IMSQRT",401:"IMLN",402:"IMLOG2",403:"IMLOG10",404:"IMSIN",405:"IMCOS",406:"IMEXP",407:"IMARGUMENT",408:"IMCONJUGATE",409:"IMAGINARY",410:"IMREAL",411:"COMPLEX",412:"IMSUM",413:"IMPRODUCT",414:"SERIESSUM",415:"FACTDOUBLE",416:"SQRTPI",417:"QUOTIENT",418:"DELTA",419:"GESTEP",420:"ISEVEN",421:"ISODD",422:"MROUND",423:"ERF",424:"ERFC",425:"BESSELJ",426:"BESSELK",427:"BESSELY",428:"BESSELI",429:"XIRR",430:"XNPV",431:"PRICEMAT",432:"YIELDMAT",433:"INTRATE",434:"RECEIVED",435:"DISC",436:"PRICEDISC",437:"YIELDDISC",438:"TBILLEQ",439:"TBILLPRICE",440:"TBILLYIELD",441:"PRICE",442:"YIELD",443:"DOLLARDE",444:"DOLLARFR",445:"NOMINAL",446:"EFFECT",447:"CUMPRINC",448:"CUMIPMT",449:"EDATE",450:"EOMONTH",451:"YEARFRAC",452:"COUPDAYBS",453:"COUPDAYS",454:"COUPDAYSNC",455:"COUPNCD",456:"COUPNUM",457:"COUPPCD",458:"DURATION",459:"MDURATION",460:"ODDLPRICE",461:"ODDLYIELD",462:"ODDFPRICE",463:"ODDFYIELD",464:"RANDBETWEEN",465:"WEEKNUM",466:"AMORDEGRC",467:"AMORLINC",468:"CONVERT",724:"SHEETJS",469:"ACCRINT",470:"ACCRINTM",471:"WORKDAY",472:"NETWORKDAYS",473:"GCD",474:"MULTINOMIAL",475:"LCM",476:"FVSCHEDULE",477:"CUBEKPIMEMBER",478:"CUBESET",479:"CUBESETCOUNT",480:"IFERROR",481:"COUNTIFS",482:"SUMIFS",483:"AVERAGEIF",484:"AVERAGEIFS"};var nh={2:1,3:1,10:0,15:1,16:1,17:1,18:1,19:0,20:1,21:1,22:1,23:1,24:1,25:1,26:1,27:2,30:2,31:3,32:1,33:1,34:0,35:0,38:1,39:2,40:3,41:3,42:3,43:3,44:3,45:3,47:3,48:2,53:1,61:3,63:0,65:3,66:3,67:1,68:1,69:1,70:1,71:1,72:1,73:1,74:0,75:1,76:1,77:1,79:2,80:2,83:1,85:0,86:1,89:0,90:1,94:0,95:0,97:2,98:1,99:1,101:3,102:3,105:1,106:1,108:2,111:1,112:1,113:1,114:1,117:2,118:1,119:4,121:1,126:1,127:1,128:1,129:1,130:1,131:1,133:1,134:1,135:1,136:2,137:2,138:2,140:1,141:1,142:3,143:4,144:4,161:1,162:1,163:1,164:1,165:2,172:1,175:2,176:2,177:3,178:2,179:1,184:1,186:1,189:3,190:1,195:3,196:3,197:1,198:1,199:3,201:1,207:4,210:3,211:1,212:2,213:2,214:1,215:1,225:0,229:1,230:1,231:1,232:1,233:1,234:1,235:3,244:1,247:4,252:2,257:1,261:1,271:1,273:4,274:2,275:2,276:2,277:3,278:3,279:1,280:3,281:3,282:3,283:1,284:1,285:2,286:4,287:3,288:2,289:4,290:3,291:3,292:3,293:4,294:1,295:3,296:1,297:3,298:1,299:2,300:3,301:3,302:4,303:2,304:2,305:2,306:2,307:2,308:2,309:3,310:2,311:2,312:2,313:2,314:2,315:2,316:4,325:2,326:2,327:2,328:2,331:2,332:2,337:2,342:1,343:1,346:2,347:1,350:4,351:3,352:1,353:2,360:1,368:1,369:1,370:1,371:1,372:1,373:1,374:1,375:1,376:1,377:1,378:1,382:3,385:1,392:1,393:1,396:2,397:2,398:2,399:1,400:1,401:1,402:1,403:1,404:1,405:1,406:1,407:1,408:1,409:1,410:1,414:4,415:1,416:1,417:2,420:1,421:1,422:2,424:1,425:2,426:2,427:2,428:2,430:3,438:3,439:3,440:3,443:2,444:2,445:2,446:2,447:6,448:6,449:2,450:2,464:2,468:3,476:2,479:1,480:2,65535:0};var ih={"_xlfn.ACOT":"ACOT","_xlfn.ACOTH":"ACOTH","_xlfn.AGGREGATE":"AGGREGATE","_xlfn.ARABIC":"ARABIC","_xlfn.AVERAGEIF":"AVERAGEIF","_xlfn.AVERAGEIFS":"AVERAGEIFS","_xlfn.BASE":"BASE","_xlfn.BETA.DIST":"BETA.DIST","_xlfn.BETA.INV":"BETA.INV","_xlfn.BINOM.DIST":"BINOM.DIST","_xlfn.BINOM.DIST.RANGE":"BINOM.DIST.RANGE","_xlfn.BINOM.INV":"BINOM.INV","_xlfn.BITAND":"BITAND","_xlfn.BITLSHIFT":"BITLSHIFT","_xlfn.BITOR":"BITOR","_xlfn.BITRSHIFT":"BITRSHIFT","_xlfn.BITXOR":"BITXOR","_xlfn.CEILING.MATH":"CEILING.MATH","_xlfn.CEILING.PRECISE":"CEILING.PRECISE","_xlfn.CHISQ.DIST":"CHISQ.DIST","_xlfn.CHISQ.DIST.RT":"CHISQ.DIST.RT","_xlfn.CHISQ.INV":"CHISQ.INV","_xlfn.CHISQ.INV.RT":"CHISQ.INV.RT","_xlfn.CHISQ.TEST":"CHISQ.TEST","_xlfn.COMBINA":"COMBINA","_xlfn.CONCAT":"CONCAT","_xlfn.CONFIDENCE.NORM":"CONFIDENCE.NORM","_xlfn.CONFIDENCE.T":"CONFIDENCE.T","_xlfn.COT":"COT","_xlfn.COTH":"COTH","_xlfn.COUNTIFS":"COUNTIFS","_xlfn.COVARIANCE.P":"COVARIANCE.P","_xlfn.COVARIANCE.S":"COVARIANCE.S","_xlfn.CSC":"CSC","_xlfn.CSCH":"CSCH","_xlfn.DAYS":"DAYS","_xlfn.DECIMAL":"DECIMAL","_xlfn.ECMA.CEILING":"ECMA.CEILING","_xlfn.ERF.PRECISE":"ERF.PRECISE","_xlfn.ERFC.PRECISE":"ERFC.PRECISE","_xlfn.EXPON.DIST":"EXPON.DIST","_xlfn.F.DIST":"F.DIST","_xlfn.F.DIST.RT":"F.DIST.RT","_xlfn.F.INV":"F.INV","_xlfn.F.INV.RT":"F.INV.RT","_xlfn.F.TEST":"F.TEST","_xlfn.FILTERXML":"FILTERXML","_xlfn.FLOOR.MATH":"FLOOR.MATH","_xlfn.FLOOR.PRECISE":"FLOOR.PRECISE","_xlfn.FORECAST.ETS":"FORECAST.ETS","_xlfn.FORECAST.ETS.CONFINT":"FORECAST.ETS.CONFINT","_xlfn.FORECAST.ETS.SEASONALITY":"FORECAST.ETS.SEASONALITY","_xlfn.FORECAST.ETS.STAT":"FORECAST.ETS.STAT","_xlfn.FORECAST.LINEAR":"FORECAST.LINEAR","_xlfn.FORMULATEXT":"FORMULATEXT","_xlfn.GAMMA":"GAMMA","_xlfn.GAMMA.DIST":"GAMMA.DIST","_xlfn.GAMMA.INV":"GAMMA.INV","_xlfn.GAMMALN.PRECISE":"GAMMALN.PRECISE","_xlfn.GAUSS":"GAUSS","_xlfn.HYPGEOM.DIST":"HYPGEOM.DIST","_xlfn.IFERROR":"IFERROR","_xlfn.IFNA":"IFNA","_xlfn.IFS":"IFS","_xlfn.IMCOSH":"IMCOSH","_xlfn.IMCOT":"IMCOT","_xlfn.IMCSC":"IMCSC","_xlfn.IMCSCH":"IMCSCH","_xlfn.IMSEC":"IMSEC","_xlfn.IMSECH":"IMSECH","_xlfn.IMSINH":"IMSINH","_xlfn.IMTAN":"IMTAN","_xlfn.ISFORMULA":"ISFORMULA","_xlfn.ISO.CEILING":"ISO.CEILING","_xlfn.ISOWEEKNUM":"ISOWEEKNUM","_xlfn.LOGNORM.DIST":"LOGNORM.DIST","_xlfn.LOGNORM.INV":"LOGNORM.INV","_xlfn.MAXIFS":"MAXIFS","_xlfn.MINIFS":"MINIFS","_xlfn.MODE.MULT":"MODE.MULT","_xlfn.MODE.SNGL":"MODE.SNGL","_xlfn.MUNIT":"MUNIT","_xlfn.NEGBINOM.DIST":"NEGBINOM.DIST","_xlfn.NETWORKDAYS.INTL":"NETWORKDAYS.INTL","_xlfn.NIGBINOM":"NIGBINOM","_xlfn.NORM.DIST":"NORM.DIST","_xlfn.NORM.INV":"NORM.INV","_xlfn.NORM.S.DIST":"NORM.S.DIST","_xlfn.NORM.S.INV":"NORM.S.INV","_xlfn.NUMBERVALUE":"NUMBERVALUE","_xlfn.PDURATION":"PDURATION","_xlfn.PERCENTILE.EXC":"PERCENTILE.EXC","_xlfn.PERCENTILE.INC":"PERCENTILE.INC","_xlfn.PERCENTRANK.EXC":"PERCENTRANK.EXC","_xlfn.PERCENTRANK.INC":"PERCENTRANK.INC","_xlfn.PERMUTATIONA":"PERMUTATIONA","_xlfn.PHI":"PHI","_xlfn.POISSON.DIST":"POISSON.DIST","_xlfn.QUARTILE.EXC":"QUARTILE.EXC","_xlfn.QUARTILE.INC":"QUARTILE.INC","_xlfn.QUERYSTRING":"QUERYSTRING","_xlfn.RANK.AVG":"RANK.AVG","_xlfn.RANK.EQ":"RANK.EQ","_xlfn.RRI":"RRI","_xlfn.SEC":"SEC","_xlfn.SECH":"SECH","_xlfn.SHEET":"SHEET","_xlfn.SHEETS":"SHEETS","_xlfn.SKEW.P":"SKEW.P","_xlfn.STDEV.P":"STDEV.P","_xlfn.STDEV.S":"STDEV.S","_xlfn.SUMIFS":"SUMIFS","_xlfn.SWITCH":"SWITCH","_xlfn.T.DIST":"T.DIST","_xlfn.T.DIST.2T":"T.DIST.2T","_xlfn.T.DIST.RT":"T.DIST.RT","_xlfn.T.INV":"T.INV","_xlfn.T.INV.2T":"T.INV.2T","_xlfn.T.TEST":"T.TEST","_xlfn.TEXTJOIN":"TEXTJOIN","_xlfn.UNICHAR":"UNICHAR","_xlfn.UNICODE":"UNICODE","_xlfn.VAR.P":"VAR.P","_xlfn.VAR.S":"VAR.S","_xlfn.WEBSERVICE":"WEBSERVICE","_xlfn.WEIBULL.DIST":"WEIBULL.DIST","_xlfn.WORKDAY.INTL":"WORKDAY.INTL","_xlfn.XOR":"XOR","_xlfn.Z.TEST":"Z.TEST"};function sh(e){if(e.slice(0,3)=="of:")e=e.slice(3);if(e.charCodeAt(0)==61){e=e.slice(1);if(e.charCodeAt(0)==61)e=e.slice(1);}e=e.replace(/COM\.MICROSOFT\./g,"");e=e.replace(/\[((?:\.[A-Z]+[0-9]+)(?::\.[A-Z]+[0-9]+)?)\]/g,function(e,r){return r.replace(/\./g,"");});e=e.replace(/\[.(#[A-Z]*[?!])\]/g,"$1");return e.replace(/[;~]/g,",").replace(/\|/g,";");}function fh(e){var r="of:="+e.replace(fc,"$1[.$2$3$4$5]").replace(/\]:\[/g,":");return r.replace(/;/g,"|").replace(/,/g,";");}function lh(e){var r=e.split(":");var t=r[0].split(".")[0];return[t,r[0].split(".")[1]+(r.length>1?":"+(r[1].split(".")[1]||r[1].split(".")[0]):"")];}function oh(e){return e.replace(/\./,"!");}var ch={};var uh={};Ua.WS=["http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet","http://purl.oclc.org/ooxml/officeDocument/relationships/worksheet"];var hh=typeof Map!=="undefined";function dh(e,r,t){var a=0,n=e.length;if(t){if(hh?t.has(r):Object.prototype.hasOwnProperty.call(t,r)){var i=hh?t.get(r):t[r];for(;a<i.length;++a){if(e[i[a]].t===r){e.Count++;return i[a];}}}}else for(;a<n;++a){if(e[a].t===r){e.Count++;return a;}}e[n]={t:r};e.Count++;e.Unique++;if(t){if(hh){if(!t.has(r))t.set(r,[]);t.get(r).push(n);}else{if(!Object.prototype.hasOwnProperty.call(t,r))t[r]=[];t[r].push(n);}}return n;}function vh(e,r){var t={min:e+1,max:e+1};var a=-1;if(r.MDW)bl=r.MDW;if(r.width!=null)t.customWidth=1;else if(r.wpx!=null)a=wl(r.wpx);else if(r.wch!=null)a=r.wch;if(a>-1){t.width=kl(a);t.customWidth=1;}else if(r.width!=null)t.width=r.width;if(r.hidden)t.hidden=true;if(r.level!=null){t.outlineLevel=t.level=r.level;}return t;}function ph(e,r){if(!e)return;var t=[.7,.7,.75,.75,.3,.3];if(r=="xlml")t=[1,1,1,1,.5,.5];if(e.left==null)e.left=t[0];if(e.right==null)e.right=t[1];if(e.top==null)e.top=t[2];if(e.bottom==null)e.bottom=t[3];if(e.header==null)e.header=t[4];if(e.footer==null)e.footer=t[5];}function mh(e,r,t){var a=t.revssf[r.z!=null?r.z:"General"];var n=60,i=e.length;if(a==null&&t.ssf){for(;n<392;++n){if(t.ssf[n]==null){O.load(r.z,n);t.ssf[n]=r.z;t.revssf[r.z]=a=n;break;}}}for(n=0;n!=i;++n){if(e[n].numFmtId===a)return n;}e[i]={numFmtId:a,fontId:0,fillId:0,borderId:0,xfId:0,applyNumberFormat:1};return i;}function bh(e,r,t,a,n,i){try{if(a.cellNF)e.z=O._table[r];}catch(s){if(a.WTF)throw s;}if(e.t==="z"&&!a.cellStyles)return;if(e.t==="d"&&typeof e.v==="string")e.v=le(e.v);if((!a||a.cellText!==false)&&e.t!=="z")try{if(O._table[r]==null)O.load(N[r]||"General",r);if(e.t==="e")e.w=e.w||Aa[e.v];else if(r===0){if(e.t==="n"){if((e.v|0)===e.v)e.w=O._general_int(e.v);else e.w=O._general_num(e.v);}else if(e.t==="d"){var f=ee(e.v);if((f|0)===f)e.w=O._general_int(f);else e.w=O._general_num(f);}else if(e.v===undefined)return"";else e.w=O._general(e.v,uh);}else if(e.t==="d")e.w=O.format(r,ee(e.v),uh);else e.w=O.format(r,e.v,uh);}catch(s){if(a.WTF)throw s;}if(!a.cellStyles)return;if(t!=null)try{e.s=i.Fills[t];if(e.s.fgColor&&e.s.fgColor.theme&&!e.s.fgColor.rgb){e.s.fgColor.rgb=dl(n.themeElements.clrScheme[e.s.fgColor.theme].rgb,e.s.fgColor.tint||0);if(a.WTF)e.s.fgColor.raw_rgb=n.themeElements.clrScheme[e.s.fgColor.theme].rgb;}if(e.s.bgColor&&e.s.bgColor.theme){e.s.bgColor.rgb=dl(n.themeElements.clrScheme[e.s.bgColor.theme].rgb,e.s.bgColor.tint||0);if(a.WTF)e.s.bgColor.raw_rgb=n.themeElements.clrScheme[e.s.bgColor.theme].rgb;}}catch(s){if(a.WTF&&i.Fills)throw s;}}function gh(e,r,t){if(e&&e["!ref"]){var a=kt(e["!ref"]);if(a.e.c<a.s.c||a.e.r<a.s.r)throw new Error("Bad range ("+t+"): "+e["!ref"]);}}function wh(e,r){var t=kt(r);if(t.s.r<=t.e.r&&t.s.c<=t.e.c&&t.s.r>=0&&t.s.c>=0)e["!ref"]=wt(t);}var kh=/<(?:\w:)?mergeCell ref="[A-Z0-9:]+"\s*[\/]?>/g;var Eh=/<(?:\w+:)?sheetData[^>]*>([\s\S]*)<\/(?:\w+:)?sheetData>/;var Sh=/<(?:\w:)?hyperlink [^>]*>/gm;var _h=/"(\w*:\w*)"/;var Ch=/<(?:\w:)?col\b[^>]*[\/]?>/g;var Bh=/<(?:\w:)?autoFilter[^>]*([\/]|>([\s\S]*)<\/(?:\w:)?autoFilter)>/g;var Th=/<(?:\w:)?pageMargins[^>]*\/>/g;var yh=/<(?:\w:)?sheetPr\b(?:[^>a-z][^>]*)?\/>/;var xh=/<(?:\w:)?sheetPr[^>]*(?:[\/]|>([\s\S]*)<\/(?:\w:)?sheetPr)>/;var Ah=/<(?:\w:)?sheetViews[^>]*(?:[\/]|>([\s\S]*)<\/(?:\w:)?sheetViews)>/;function Ih(e,r,t,a,n,i,s){if(!e)return e;if(!a)a={"!id":{}};if(m!=null&&r.dense==null)r.dense=m;var f=r.dense?[]:{};var l={s:{r:2e6,c:2e6},e:{r:0,c:0}};var o="",c="";var u=e.match(Eh);if(u){o=e.slice(0,u.index);c=e.slice(u.index+u[0].length);}else o=c=e;var h=o.match(yh);if(h)Fh(h[0],f,n,t);else if(h=o.match(xh))Oh(h[0],h[1]||"",f,n,t,s,i);var d=(o.match(/<(?:\w*:)?dimension/)||{index:-1}).index;if(d>0){var v=o.slice(d,d+50).match(_h);if(v)wh(f,v[1]);}var p=o.match(Ah);if(p&&p[1])jh(p[1],n);var b=[];if(r.cellStyles){var g=o.match(Ch);if(g)Hh(b,g);}if(u)Yh(u[1],f,r,l,i,s);var w=c.match(Bh);if(w)f["!autofilter"]=Vh(w[0]);var k=[];var E=c.match(kh);if(E)for(d=0;d!=E.length;++d){k[d]=kt(E[d].slice(E[d].indexOf('"')+1));}var S=c.match(Sh);if(S)Mh(f,S,a);var _=c.match(Th);if(_)f["!margins"]=Uh(De(_[0]));if(!f["!ref"]&&l.e.c>=l.s.c&&l.e.r>=l.s.r)f["!ref"]=wt(l);if(r.sheetRows>0&&f["!ref"]){var C=kt(f["!ref"]);if(r.sheetRows<=+C.e.r){C.e.r=r.sheetRows-1;if(C.e.r>l.e.r)C.e.r=l.e.r;if(C.e.r<C.s.r)C.s.r=C.e.r;if(C.e.c>l.e.c)C.e.c=l.e.c;if(C.e.c<C.s.c)C.s.c=C.e.c;f["!fullref"]=f["!ref"];f["!ref"]=wt(C);}}if(b.length>0)f["!cols"]=b;if(k.length>0)f["!merges"]=k;return f;}function Rh(e){if(e.length===0)return"";var r='<mergeCells count="'+e.length+'">';for(var t=0;t!=e.length;++t){r+='<mergeCell ref="'+wt(e[t])+'"/>';}return r+"</mergeCells>";}function Fh(e,r,t,a){var n=De(e);if(!t.Sheets[a])t.Sheets[a]={};if(n.codeName)t.Sheets[a].CodeName=Me(Ye(n.codeName));}function Oh(e,r,t,a,n,i,s){Fh(e.slice(0,e.indexOf(">")),t,a,n);}function Dh(e,r,t,a,n){var i=false;var s={},f=null;if(a.bookType!=="xlsx"&&r.vbaraw){var l=r.SheetNames[t];try{if(r.Workbook)l=r.Workbook.Sheets[t].CodeName||l;}catch(o){}i=true;s.codeName=Ze(He(l));}if(e&&e["!outline"]){var c={summaryBelow:1,summaryRight:1};if(e["!outline"].above)c.summaryBelow=0;if(e["!outline"].left)c.summaryRight=0;f=(f||"")+or("outlinePr",null,c);}if(!i&&!f)return;n[n.length]=or("sheetPr",f,s);}var Ph=["objects","scenarios","selectLockedCells","selectUnlockedCells"];var Nh=["formatColumns","formatRows","formatCells","insertColumns","insertRows","insertHyperlinks","deleteColumns","deleteRows","sort","autoFilter","pivotTables"];function Lh(e){var r={sheet:1};Ph.forEach(function(t){if(e[t]!=null&&e[t])r[t]="1";});Nh.forEach(function(t){if(e[t]!=null&&!e[t])r[t]="0";});if(e.password)r.password=rl(e.password).toString(16).toUpperCase();return or("sheetProtection",null,r);}function Mh(e,r,t){var a=Array.isArray(e);for(var n=0;n!=r.length;++n){var i=De(Ye(r[n]),true);if(!i.ref)return;var s=((t||{})["!id"]||[])[i.id];if(s){i.Target=s.Target;if(i.location)i.Target+="#"+Me(i.location);}else{i.Target="#"+Me(i.location);s={Target:i.Target,TargetMode:"Internal"};}i.Rel=s;if(i.tooltip){i.Tooltip=i.tooltip;delete i.tooltip;}var f=kt(i.ref);for(var l=f.s.r;l<=f.e.r;++l){for(var o=f.s.c;o<=f.e.c;++o){var c=bt({c:o,r:l});if(a){if(!e[l])e[l]=[];if(!e[l][o])e[l][o]={t:"z",v:undefined};e[l][o].l=i;}else{if(!e[c])e[c]={t:"z",v:undefined};e[c].l=i;}}}}}function Uh(e){var r={};["left","right","top","bottom","header","footer"].forEach(function(t){if(e[t])r[t]=parseFloat(e[t]);});return r;}function zh(e){ph(e);return or("pageMargins",null,e);}function Hh(e,r){var t=false;for(var a=0;a!=r.length;++a){var n=De(r[a],true);if(n.hidden)n.hidden=$e(n.hidden);var i=parseInt(n.min,10)-1,s=parseInt(n.max,10)-1;if(n.outlineLevel)n.level=+n.outlineLevel||0;delete n.min;delete n.max;n.width=+n.width;if(!t&&n.width){t=true;Sl(n.width);}_l(n);while(i<=s){e[i++]=ce(n);}}}function Wh(e,r){var t=["<cols>"],a;for(var n=0;n!=r.length;++n){if(!(a=r[n]))continue;t[t.length]=or("col",null,vh(n,a));}t[t.length]="</cols>";return t.join("");}function Vh(e){var r={ref:(e.match(/ref="([^"]*)"/)||[])[1]};return r;}function Xh(e,r,t,a){var n=typeof e.ref=="string"?e.ref:wt(e.ref);if(!t.Workbook)t.Workbook={Sheets:[]};if(!t.Workbook.Names)t.Workbook.Names=[];var i=t.Workbook.Names;var s=gt(n);if(s.s.r==s.e.r){s.e.r=gt(r["!ref"]).e.r;n=wt(s);}for(var f=0;f<i.length;++f){var l=i[f];if(l.Name!="_xlnm._FilterDatabase")continue;if(l.Sheet!=a)continue;l.Ref="'"+t.SheetNames[a]+"'!"+n;break;}if(f==i.length)i.push({Name:"_xlnm._FilterDatabase",Sheet:a,Ref:"'"+t.SheetNames[a]+"'!"+n});return or("autoFilter",null,{ref:n});}var Gh=/<(?:\w:)?sheetView(?:[^>a-z][^>]*)?\/?>/;function jh(e,r){if(!r.Views)r.Views=[{}];(e.match(Gh)||[]).forEach(function(e,t){var a=De(e);if(!r.Views[t])r.Views[t]={};if(+a.zoomScale)r.Views[t].zoom=+a.zoomScale;if($e(a.rightToLeft))r.Views[t].RTL=true;});}function Kh(e,r,t,a){var n={workbookViewId:"0"};if((((a||{}).Workbook||{}).Views||[])[0])n.rightToLeft=a.Workbook.Views[0].RTL?"1":"0";return or("sheetViews",or("sheetView",null,n),{});}function $h(e,r,t,a){if(e.v===undefined&&typeof e.f!=="string"||e.t==="z")return"";var n="";var i=e.t,s=e.v;if(e.t!=="z")switch(e.t){case"b":n=e.v?"1":"0";break;case"n":n=""+e.v;break;case"e":n=Aa[e.v];break;case"d":if(a&&a.cellDates)n=le(e.v,-1).toISOString();else{e=ce(e);e.t="n";n=""+(e.v=ee(le(e.v)));}if(typeof e.z==="undefined")e.z=O._table[14];break;default:n=e.v;break;}var f=fr("v",He(n)),l={r:r};var o=mh(a.cellXfs,e,a);if(o!==0)l.s=o;switch(e.t){case"n":break;case"d":l.t="d";break;case"b":l.t="b";break;case"e":l.t="e";break;case"z":break;default:if(e.v==null){delete e.t;break;}if(e.v.length>32767)throw new Error("Text length must not exceed 32767 characters");if(a&&a.bookSST){f=fr("v",""+dh(a.Strings,e.v,a.revStrings));l.t="s";break;}l.t="str";break;}if(e.t!=i){e.t=i;e.v=s;}if(typeof e.f=="string"&&e.f){var c=e.F&&e.F.slice(0,r.length)==r?{t:"array",ref:e.F}:null;f=or("f",He(e.f),c)+(e.v!=null?f:"");}if(e.l)t["!links"].push([r,e.l]);if(e.c)t["!comments"].push([r,e.c]);return or("c",f,l);}var Yh=function(){var e=/<(?:\w+:)?c[ \/>]/,r=/<\/(?:\w+:)?row>/;var t=/r=["']([^"']*)["']/,a=/<(?:\w+:)?is>([\S\s]*?)<\/(?:\w+:)?is>/;var n=/ref=["']([^"']*)["']/;var i=er("v"),s=er("f");return function f(l,o,c,u,h,d){var v=0,p="",m=[],b=[],g=0,w=0,k=0,E="",S;var _,C=0,B=0;var T,y;var x=0,A=0;var I=Array.isArray(d.CellXf),R;var F=[];var D=[];var P=Array.isArray(o);var N=[],L={},M=false;var U=!!c.sheetStubs;for(var z=l.split(r),H=0,W=z.length;H!=W;++H){p=z[H].trim();var V=p.length;if(V===0)continue;var X=0;e:for(v=0;v<V;++v){switch(p[v]){case">":if(p[v-1]!="/"){++v;break e;}if(c&&c.cellStyles){_=De(p.slice(X,v),true);C=_.r!=null?parseInt(_.r,10):C+1;B=-1;if(c.sheetRows&&c.sheetRows<C)continue;L={};M=false;if(_.ht){M=true;L.hpt=parseFloat(_.ht);L.hpx=yl(L.hpt);}if(_.hidden=="1"){M=true;L.hidden=true;}if(_.outlineLevel!=null){M=true;L.level=+_.outlineLevel;}if(M)N[C-1]=L;}break;case"<":X=v;break;}}if(X>=v)break;_=De(p.slice(X,v),true);C=_.r!=null?parseInt(_.r,10):C+1;B=-1;if(c.sheetRows&&c.sheetRows<C)continue;if(u.s.r>C-1)u.s.r=C-1;if(u.e.r<C-1)u.e.r=C-1;if(c&&c.cellStyles){L={};M=false;if(_.ht){M=true;L.hpt=parseFloat(_.ht);L.hpx=yl(L.hpt);}if(_.hidden=="1"){M=true;L.hidden=true;}if(_.outlineLevel!=null){M=true;L.level=+_.outlineLevel;}if(M)N[C-1]=L;}m=p.slice(v).split(e);for(var G=0;G!=m.length;++G){if(m[G].trim().charAt(0)!="<")break;}m=m.slice(G);for(v=0;v!=m.length;++v){p=m[v].trim();if(p.length===0)continue;b=p.match(t);g=v;w=0;k=0;p="<c "+(p.slice(0,1)=="<"?">":"")+p;if(b!=null&&b.length===2){g=0;E=b[1];for(w=0;w!=E.length;++w){if((k=E.charCodeAt(w)-64)<1||k>26)break;g=26*g+k;}--g;B=g;}else++B;for(w=0;w!=p.length;++w){if(p.charCodeAt(w)===62)break;}++w;_=De(p.slice(0,w),true);if(!_.r)_.r=bt({r:C-1,c:B});E=p.slice(w);S={t:""};if((b=E.match(i))!=null&&b[1]!=="")S.v=Me(b[1]);if(c.cellFormula){if((b=E.match(s))!=null&&b[1]!==""){S.f=Me(Ye(b[1])).replace(/\r\n/g,"\n");if(!c.xlfn)S.f=hc(S.f);if(b[0].indexOf('t="array"')>-1){S.F=(E.match(n)||[])[1];if(S.F.indexOf(":")>-1)F.push([kt(S.F),S.F]);}else if(b[0].indexOf('t="shared"')>-1){y=De(b[0]);var j=Me(Ye(b[1]));if(!c.xlfn)j=hc(j);D[parseInt(y.si,10)]=[y,j,_.r];}}else if(b=E.match(/<f[^>]*\/>/)){y=De(b[0]);if(D[y.si])S.f=cc(D[y.si][1],D[y.si][2],_.r);}var K=mt(_.r);for(w=0;w<F.length;++w){if(K.r>=F[w][0].s.r&&K.r<=F[w][0].e.r)if(K.c>=F[w][0].s.c&&K.c<=F[w][0].e.c)S.F=F[w][1];}}if(_.t==null&&S.v===undefined){if(S.f||S.F){S.v=0;S.t="n";}else if(!U)continue;else S.t="z";}else S.t=_.t||"n";if(u.s.c>B)u.s.c=B;if(u.e.c<B)u.e.c=B;switch(S.t){case"n":if(S.v==""||S.v==null){if(!U)continue;S.t="z";}else S.v=parseFloat(S.v);break;case"s":if(typeof S.v=="undefined"){if(!U)continue;S.t="z";}else{T=ch[parseInt(S.v,10)];S.v=T.t;S.r=T.r;if(c.cellHTML)S.h=T.h;}break;case"str":S.t="s";S.v=S.v!=null?Ye(S.v):"";if(c.cellHTML)S.h=Xe(S.v);break;case"inlineStr":b=E.match(a);S.t="s";if(b!=null&&(T=yf(b[1]))){S.v=T.t;if(c.cellHTML)S.h=T.h;}else S.v="";break;case"b":S.v=$e(S.v);break;case"d":if(c.cellDates)S.v=le(S.v,1);else{S.v=ee(le(S.v,1));S.t="n";}break;case"e":if(!c||c.cellText!==false)S.w=S.v;S.v=Ia[S.v];break;}x=A=0;R=null;if(I&&_.s!==undefined){R=d.CellXf[_.s];if(R!=null){if(R.numFmtId!=null)x=R.numFmtId;if(c.cellStyles){if(R.fillId!=null)A=R.fillId;}}}bh(S,x,A,c,h,d);if(c.cellDates&&I&&S.t=="n"&&O.is_date(O._table[x])){S.t="d";S.v=ne(S.v);}if(P){var $=mt(_.r);if(!o[$.r])o[$.r]=[];o[$.r][$.c]=S;}else o[_.r]=S;}}if(N.length>0)o["!rows"]=N;};}();function Zh(e,r,t,a){var n=[],i=[],s=kt(e["!ref"]),f="",l,o="",c=[],u=0,h=0,d=e["!rows"];var v=Array.isArray(e);var p={r:o},m,b=-1;for(h=s.s.c;h<=s.e.c;++h){c[h]=ht(h);}for(u=s.s.r;u<=s.e.r;++u){i=[];o=lt(u);for(h=s.s.c;h<=s.e.c;++h){l=c[h]+o;var g=v?(e[u]||[])[h]:e[l];if(g===undefined)continue;if((f=$h(g,l,e,r,t,a))!=null)i.push(f);}if(i.length>0||d&&d[u]){p={r:o};if(d&&d[u]){m=d[u];if(m.hidden)p.hidden=1;b=-1;if(m.hpx)b=Tl(m.hpx);else if(m.hpt)b=m.hpt;if(b>-1){p.ht=b;p.customHeight=1;}if(m.level){p.outlineLevel=m.level;}}n[n.length]=or("row",i.join(""),p);}}if(d)for(;u<d.length;++u){if(d&&d[u]){p={r:u+1};m=d[u];if(m.hidden)p.hidden=1;b=-1;if(m.hpx)b=Tl(m.hpx);else if(m.hpt)b=m.hpt;if(b>-1){p.ht=b;p.customHeight=1;}if(m.level){p.outlineLevel=m.level;}n[n.length]=or("row","",p);}}return n.join("");}var Jh=or("worksheet",null,{xmlns:hr.main[0],"xmlns:r":hr.r});function Qh(e,r,t,a){var n=[Ae,Jh];var i=t.SheetNames[e],s=0,f="";var l=t.Sheets[i];if(l==null)l={};var o=l["!ref"]||"A1";var c=kt(o);if(c.e.c>16383||c.e.r>1048575){if(r.WTF)throw new Error("Range "+o+" exceeds format limit A1:XFD1048576");c.e.c=Math.min(c.e.c,16383);c.e.r=Math.min(c.e.c,1048575);o=wt(c);}if(!a)a={};l["!comments"]=[];var u=[];Dh(l,t,e,r,n);n[n.length]=or("dimension",null,{ref:o});n[n.length]=Kh(l,r,e,t);if(r.sheetFormat)n[n.length]=or("sheetFormatPr",null,{defaultRowHeight:r.sheetFormat.defaultRowHeight||"16",baseColWidth:r.sheetFormat.baseColWidth||"10",outlineLevelRow:r.sheetFormat.outlineLevelRow||"7"});if(l["!cols"]!=null&&l["!cols"].length>0)n[n.length]=Wh(l,l["!cols"]);n[s=n.length]="<sheetData/>";l["!links"]=[];if(l["!ref"]!=null){f=Zh(l,r,e,t,a);if(f.length>0)n[n.length]=f;}if(n.length>s+1){n[n.length]="</sheetData>";n[s]=n[s].replace("/>",">");}if(l["!protect"])n[n.length]=Lh(l["!protect"]);if(l["!autofilter"]!=null)n[n.length]=Xh(l["!autofilter"],l,t,e);if(l["!merges"]!=null&&l["!merges"].length>0)n[n.length]=Rh(l["!merges"]);var h=-1,d,v=-1;if(l["!links"].length>0){n[n.length]="<hyperlinks>";l["!links"].forEach(function(e){if(!e[1].Target)return;d={ref:e[0]};if(e[1].Target.charAt(0)!="#"){v=Ga(a,-1,He(e[1].Target).replace(/#.*$/,""),Ua.HLINK);d["r:id"]="rId"+v;}if((h=e[1].Target.indexOf("#"))>-1)d.location=He(e[1].Target.slice(h+1));if(e[1].Tooltip)d.tooltip=He(e[1].Tooltip);n[n.length]=or("hyperlink",null,d);});n[n.length]="</hyperlinks>";}delete l["!links"];if(l["!margins"]!=null)n[n.length]=zh(l["!margins"]);if(!r||r.ignoreEC||r.ignoreEC==void 0)n[n.length]=fr("ignoredErrors",or("ignoredError",null,{numberStoredAsText:1,sqref:o}));if(u.length>0){v=Ga(a,-1,"../drawings/drawing"+(e+1)+".xml",Ua.DRAW);n[n.length]=or("drawing",null,{"r:id":"rId"+v});l["!drawing"]=u;}if(l["!comments"].length>0){v=Ga(a,-1,"../drawings/vmlDrawing"+(e+1)+".vml",Ua.VML);n[n.length]=or("legacyDrawing",null,{"r:id":"rId"+v});l["!legacy"]=v;}if(n.length>1){n[n.length]="</worksheet>";n[1]=n[1].replace("/>",">");}return n.join("");}function qh(e,r){var t={};var a=e.l+r;t.r=e._R(4);e.l+=4;var n=e._R(2);e.l+=1;var i=e._R(1);e.l=a;if(i&7)t.level=i&7;if(i&16)t.hidden=true;if(i&32)t.hpt=n/20;return t;}function ed(e,r,t){var a=Jr(17+8*16);var n=(t["!rows"]||[])[e]||{};a._W(4,e);a._W(4,0);var i=320;if(n.hpx)i=Tl(n.hpx)*20;else if(n.hpt)i=n.hpt*20;a._W(2,i);a._W(1,0);var s=0;if(n.level)s|=n.level;if(n.hidden)s|=16;if(n.hpx||n.hpt)s|=32;a._W(1,s);a._W(1,0);var f=0,l=a.l;a.l+=4;var o={r:e,c:0};for(var c=0;c<16;++c){if(r.s.c>c+1<<10||r.e.c<c<<10)continue;var u=-1,h=-1;for(var d=c<<10;d<c+1<<10;++d){o.c=d;var v=Array.isArray(t)?(t[o.r]||[])[o.c]:t[bt(o)];if(v){if(u<0)u=d;h=d;}}if(u<0)continue;++f;a._W(4,u);a._W(4,h);}var p=a.l;a.l=l;a._W(4,f);a.l=p;return a.length>a.l?a.slice(0,a.l):a;}function rd(e,r,t,a){var n=ed(a,t,r);if(n.length>17||(r["!rows"]||[])[a])et(e,"BrtRowHdr",n);}var td=Zt;var ad=Jt;function nd(){}function id(e,r){var t={};var a=e[e.l];++e.l;t.above=!(a&64);t.left=!(a&128);e.l+=18;t.name=Ut(e,r-19);return t;}function sd(e,r,t){if(t==null)t=Jr(84+4*e.length);var a=192;if(r){if(r.above)a&=~64;if(r.left)a&=~128;}t._W(1,a);for(var n=1;n<3;++n){t._W(1,0);}ra({auto:1},t);t._W(-4,-1);t._W(-4,-1);zt(e,t);return t.slice(0,t.l);}function fd(e){var r=Pt(e);return[r];}function ld(e,r,t){if(t==null)t=Jr(8);return Nt(r,t);}function od(e){var r=Lt(e);return[r];}function cd(e,r,t){if(t==null)t=Jr(4);return Mt(r,t);}function ud(e){var r=Pt(e);var t=e._R(1);return[r,t,"b"];}function hd(e,r,t){if(t==null)t=Jr(9);Nt(r,t);t._W(1,e.v?1:0);return t;}function dd(e){var r=Lt(e);var t=e._R(1);return[r,t,"b"];}function vd(e,r,t){if(t==null)t=Jr(5);Mt(r,t);t._W(1,e.v?1:0);return t;}function pd(e){var r=Pt(e);var t=e._R(1);return[r,t,"e"];}function md(e,r,t){if(t==null)t=Jr(9);Nt(r,t);t._W(1,e.v);return t;}function bd(e){var r=Lt(e);var t=e._R(1);return[r,t,"e"];}function gd(e,r,t){if(t==null)t=Jr(8);Mt(r,t);t._W(1,e.v);t._W(2,0);t._W(1,0);return t;}function wd(e){var r=Pt(e);var t=e._R(4);return[r,t,"s"];}function kd(e,r,t){if(t==null)t=Jr(12);Nt(r,t);t._W(4,r.v);return t;}function Ed(e){var r=Lt(e);var t=e._R(4);return[r,t,"s"];}function Sd(e,r,t){if(t==null)t=Jr(8);Mt(r,t);t._W(4,r.v);return t;}function _d(e){var r=Pt(e);var t=Qt(e);return[r,t,"n"];}function Cd(e,r,t){if(t==null)t=Jr(16);Nt(r,t);qt(e.v,t);return t;}function Bd(e){var r=Lt(e);var t=Qt(e);return[r,t,"n"];}function Td(e,r,t){if(t==null)t=Jr(12);Mt(r,t);qt(e.v,t);return t;}function yd(e){var r=Pt(e);var t=jt(e);return[r,t,"n"];}function xd(e,r,t){if(t==null)t=Jr(12);Nt(r,t);Kt(e.v,t);return t;}function Ad(e){var r=Lt(e);var t=jt(e);return[r,t,"n"];}function Id(e,r,t){if(t==null)t=Jr(8);Mt(r,t);Kt(e.v,t);return t;}function Rd(e){var r=Pt(e);var t=yt(e);return[r,t,"str"];}function Fd(e,r,t){if(t==null)t=Jr(12+4*e.v.length);Nt(r,t);xt(e.v,t);return t.length>t.l?t.slice(0,t.l):t;}function Od(e){var r=Lt(e);var t=yt(e);return[r,t,"str"];}function Dd(e,r,t){if(t==null)t=Jr(8+4*e.v.length);Mt(r,t);xt(e.v,t);return t.length>t.l?t.slice(0,t.l):t;}function Pd(e,r,t){var a=e.l+r;var n=Pt(e);n.r=t["!row"];var i=e._R(1);var s=[n,i,"b"];if(t.cellFormula){e.l+=2;var f=qu(e,a-e.l,t);s[3]=Wu(f,null,n,t.supbooks,t);}else e.l=a;return s;}function Nd(e,r,t){var a=e.l+r;var n=Pt(e);n.r=t["!row"];var i=e._R(1);var s=[n,i,"e"];if(t.cellFormula){e.l+=2;var f=qu(e,a-e.l,t);s[3]=Wu(f,null,n,t.supbooks,t);}else e.l=a;return s;}function Ld(e,r,t){var a=e.l+r;var n=Pt(e);n.r=t["!row"];var i=Qt(e);var s=[n,i,"n"];if(t.cellFormula){e.l+=2;var f=qu(e,a-e.l,t);s[3]=Wu(f,null,n,t.supbooks,t);}else e.l=a;return s;}function Md(e,r,t){var a=e.l+r;var n=Pt(e);n.r=t["!row"];var i=yt(e);var s=[n,i,"str"];if(t.cellFormula){e.l+=2;var f=qu(e,a-e.l,t);s[3]=Wu(f,null,n,t.supbooks,t);}else e.l=a;return s;}var Ud=Zt;var zd=Jt;function Hd(e,r){if(r==null)r=Jr(4);r._W(4,e);return r;}function Wd(e,r){var t=e.l+r;var a=Zt(e,16);var n=Ht(e);var i=yt(e);var s=yt(e);var f=yt(e);e.l=t;var l={rfx:a,relId:n,loc:i,display:f};if(s)l.Tooltip=s;return l;}function Vd(e,r){var t=Jr(50+4*(e[1].Target.length+(e[1].Tooltip||"").length));Jt({s:mt(e[0]),e:mt(e[0])},t);Gt("rId"+r,t);var a=e[1].Target.indexOf("#");var n=a==-1?"":e[1].Target.slice(a+1);xt(n||"",t);xt(e[1].Tooltip||"",t);xt("",t);return t.slice(0,t.l);}function Xd(){}function Gd(e,r,t){var a=e.l+r;var n=$t(e,16);var i=e._R(1);var s=[n];s[2]=i;if(t.cellFormula){var f=Qu(e,a-e.l,t);s[1]=f;}else e.l=a;return s;}function jd(e,r,t){var a=e.l+r;var n=Zt(e,16);var i=[n];if(t.cellFormula){var s=rh(e,a-e.l,t);i[1]=s;e.l=a;}else e.l=a;return i;}function Kd(e,r,t){if(t==null)t=Jr(18);var a=vh(e,r);t._W(-4,e);t._W(-4,e);t._W(4,(a.width||10)*256);t._W(4,0);var n=0;if(r.hidden)n|=1;if(typeof a.width=="number")n|=2;if(r.level)n|=r.level<<8;t._W(2,n);return t;}var $d=["left","right","top","bottom","header","footer"];function Yd(e){var r={};$d.forEach(function(t){r[t]=Qt(e,8);});return r;}function Zd(e,r){if(r==null)r=Jr(6*8);ph(e);$d.forEach(function(t){qt(e[t],r);});return r;}function Jd(e){var r=e._R(2);e.l+=28;return{RTL:r&32};}function Qd(e,r,t){if(t==null)t=Jr(30);var a=924;if((((r||{}).Views||[])[0]||{}).RTL)a|=32;t._W(2,a);t._W(4,0);t._W(4,0);t._W(4,0);t._W(1,0);t._W(1,0);t._W(2,0);t._W(2,100);t._W(2,0);t._W(2,0);t._W(2,0);t._W(4,0);return t;}function qd(e){var r=Jr(24);r._W(4,4);r._W(4,1);Jt(e,r);return r;}function ev(e,r){if(r==null)r=Jr(16*4+2);r._W(2,e.password?rl(e.password):0);r._W(4,1);[["objects",false],["scenarios",false],["formatCells",true],["formatColumns",true],["formatRows",true],["insertColumns",true],["insertRows",true],["insertHyperlinks",true],["deleteColumns",true],["deleteRows",true],["selectLockedCells",false],["sort",true],["autoFilter",true],["pivotTables",true],["selectUnlockedCells",false]].forEach(function(t){if(t[1])r._W(4,e[t[0]]!=null&&!e[t[0]]?1:0);else r._W(4,e[t[0]]!=null&&e[t[0]]?0:1);});return r;}function rv(){}function tv(){}function av(e,r,t,a,n,i,s){if(!e)return e;var f=r||{};if(!a)a={"!id":{}};if(m!=null&&f.dense==null)f.dense=m;var l=f.dense?[]:{};var o;var c={s:{r:2e6,c:2e6},e:{r:0,c:0}};var u=[];var h=false,d=false;var v,p,b,g,w,k,E,S,_;var C=[];f.biff=12;f["!row"]=0;var B=0,T=false;var y=[];var x={};var A=f.supbooks||n.supbooks||[[]];A.sharedf=x;A.arrayf=y;A.SheetNames=n.SheetNames||n.Sheets.map(function(e){return e.name;});if(!f.supbooks){f.supbooks=A;if(n.Names)for(var I=0;I<n.Names.length;++I){A[0][I+1]=n.Names[I];}}var R=[],F=[];var D=false;Qp[16]={n:"BrtShortReal",f:Bd};Qr(e,function N(e,r,m){if(d)return;switch(m){case 148:o=e;break;case 0:v=e;if(f.sheetRows&&f.sheetRows<=v.r)d=true;S=lt(g=v.r);f["!row"]=v.r;if(e.hidden||e.hpt||e.level!=null){if(e.hpt)e.hpx=yl(e.hpt);F[e.r]=e;}break;case 2:;case 3:;case 4:;case 5:;case 6:;case 7:;case 8:;case 9:;case 10:;case 11:;case 13:;case 14:;case 15:;case 16:;case 17:;case 18:p={t:e[2]};switch(e[2]){case"n":p.v=e[1];break;case"s":E=ch[e[1]];p.v=E.t;p.r=E.r;break;case"b":p.v=e[1]?true:false;break;case"e":p.v=e[1];if(f.cellText!==false)p.w=Aa[p.v];break;case"str":p.t="s";p.v=e[1];break;}if(b=s.CellXf[e[0].iStyleRef])bh(p,b.numFmtId,null,f,i,s);w=e[0].c==-1?w+1:e[0].c;if(f.dense){if(!l[g])l[g]=[];l[g][w]=p;}else l[ht(w)+S]=p;if(f.cellFormula){T=false;for(B=0;B<y.length;++B){var I=y[B];if(v.r>=I[0].s.r&&v.r<=I[0].e.r)if(w>=I[0].s.c&&w<=I[0].e.c){p.F=wt(I[0]);T=true;}}if(!T&&e.length>3)p.f=e[3];}if(c.s.r>v.r)c.s.r=v.r;if(c.s.c>w)c.s.c=w;if(c.e.r<v.r)c.e.r=v.r;if(c.e.c<w)c.e.c=w;if(f.cellDates&&b&&p.t=="n"&&O.is_date(O._table[b.numFmtId])){var P=O.parse_date_code(p.v);if(P){p.t="d";p.v=new Date(P.y,P.m-1,P.d,P.H,P.M,P.S,P.u);}}break;case 1:;case 12:if(!f.sheetStubs||h)break;p={t:"z",v:undefined};w=e[0].c==-1?w+1:e[0].c;if(f.dense){if(!l[g])l[g]=[];l[g][w]=p;}else l[ht(w)+S]=p;if(c.s.r>v.r)c.s.r=v.r;if(c.s.c>w)c.s.c=w;if(c.e.r<v.r)c.e.r=v.r;if(c.e.c<w)c.e.c=w;break;case 176:C.push(e);break;case 494:var N=a["!id"][e.relId];if(N){e.Target=N.Target;if(e.loc)e.Target+="#"+e.loc;e.Rel=N;}else if(e.relId==""){e.Target="#"+e.loc;}for(g=e.rfx.s.r;g<=e.rfx.e.r;++g){for(w=e.rfx.s.c;w<=e.rfx.e.c;++w){if(f.dense){if(!l[g])l[g]=[];if(!l[g][w])l[g][w]={t:"z",v:undefined};l[g][w].l=e;}else{k=bt({c:w,r:g});if(!l[k])l[k]={t:"z",v:undefined};l[k].l=e;}}}break;case 426:if(!f.cellFormula)break;y.push(e);_=f.dense?l[g][w]:l[ht(w)+S];_.f=Wu(e[1],c,{r:v.r,c:w},A,f);_.F=wt(e[0]);break;case 427:if(!f.cellFormula)break;x[bt(e[0].s)]=e[1];_=f.dense?l[g][w]:l[ht(w)+S];_.f=Wu(e[1],c,{r:v.r,c:w},A,f);break;case 60:if(!f.cellStyles)break;while(e.e>=e.s){R[e.e--]={width:e.w/256,hidden:!!(e.flags&1),level:e.level};if(!D){D=true;Sl(e.w/256);}_l(R[e.e+1]);}break;case 161:l["!autofilter"]={ref:wt(e)};break;case 476:l["!margins"]=e;break;case 147:if(!n.Sheets[t])n.Sheets[t]={};if(e.name)n.Sheets[t].CodeName=e.name;if(e.above||e.left)l["!outline"]={above:e.above,left:e.left};break;case 137:if(!n.Views)n.Views=[{}];if(!n.Views[0])n.Views[0]={};if(e.RTL)n.Views[0].RTL=true;break;case 485:break;case 64:;case 1053:break;case 151:break;case 152:;case 175:;case 644:;case 625:;case 562:;case 396:;case 1112:;case 1146:;case 471:;case 1050:;case 649:;case 1105:;case 49:;case 589:;case 607:;case 564:;case 1055:;case 168:;case 174:;case 1180:;case 499:;case 507:;case 550:;case 171:;case 167:;case 1177:;case 169:;case 1181:;case 551:;case 552:;case 661:;case 639:;case 478:;case 537:;case 477:;case 536:;case 1103:;case 680:;case 1104:;case 1024:;case 663:;case 535:;case 678:;case 504:;case 1043:;case 428:;case 170:;case 3072:;case 50:;case 2070:;case 1045:break;case 35:h=true;break;case 36:h=false;break;case 37:u.push(r);h=true;break;case 38:u.pop();h=false;break;default:if((r||"").indexOf("Begin")>0){}else if((r||"").indexOf("End")>0){}else if(!h||f.WTF)throw new Error("Unexpected record "+m+" "+r);}},f);delete f.supbooks;delete f["!row"];if(!l["!ref"]&&(c.s.r<2e6||o&&(o.e.r>0||o.e.c>0||o.s.r>0||o.s.c>0)))l["!ref"]=wt(o||c);if(f.sheetRows&&l["!ref"]){var P=kt(l["!ref"]);if(f.sheetRows<=+P.e.r){P.e.r=f.sheetRows-1;if(P.e.r>c.e.r)P.e.r=c.e.r;if(P.e.r<P.s.r)P.s.r=P.e.r;if(P.e.c>c.e.c)P.e.c=c.e.c;if(P.e.c<P.s.c)P.s.c=P.e.c;l["!fullref"]=l["!ref"];l["!ref"]=wt(P);}}if(C.length>0)l["!merges"]=C;if(R.length>0)l["!cols"]=R;if(F.length>0)l["!rows"]=F;return l;}function nv(e,r,t,a,n,i,s){if(r.v===undefined)return false;var f="";switch(r.t){case"b":f=r.v?"1":"0";break;case"d":r=ce(r);r.z=r.z||O._table[14];r.v=ee(le(r.v));r.t="n";break;case"n":;case"e":f=""+r.v;break;default:f=r.v;break;}var l={r:t,c:a};l.s=mh(n.cellXfs,r,n);if(r.l)i["!links"].push([bt(l),r.l]);if(r.c)i["!comments"].push([bt(l),r.c]);switch(r.t){case"s":;case"str":if(n.bookSST){f=dh(n.Strings,r.v,n.revStrings);l.t="s";l.v=f;if(s)et(e,"BrtShortIsst",Sd(r,l));else et(e,"BrtCellIsst",kd(r,l));}else{l.t="str";if(s)et(e,"BrtShortSt",Dd(r,l));else et(e,"BrtCellSt",Fd(r,l));}return true;case"n":if(r.v==(r.v|0)&&r.v>-1e3&&r.v<1e3){if(s)et(e,"BrtShortRk",Id(r,l));else et(e,"BrtCellRk",xd(r,l));}else{if(s)et(e,"BrtShortReal",Td(r,l));else et(e,"BrtCellReal",Cd(r,l));}return true;case"b":l.t="b";if(s)et(e,"BrtShortBool",vd(r,l));else et(e,"BrtCellBool",hd(r,l));return true;case"e":l.t="e";if(s)et(e,"BrtShortError",gd(r,l));else et(e,"BrtCellError",md(r,l));return true;}if(s)et(e,"BrtShortBlank",cd(r,l));else et(e,"BrtCellBlank",ld(r,l));return true;}function iv(e,r,t,a){var n=kt(r["!ref"]||"A1"),i,s="",f=[];et(e,"BrtBeginSheetData");var l=Array.isArray(r);var o=n.e.r;if(r["!rows"])o=Math.max(n.e.r,r["!rows"].length-1);for(var c=n.s.r;c<=o;++c){s=lt(c);rd(e,r,n,c);var u=false;if(c<=n.e.r)for(var h=n.s.c;h<=n.e.c;++h){if(c===n.s.r)f[h]=ht(h);i=f[h]+s;var d=l?(r[c]||[])[h]:r[i];if(!d){u=false;continue;}u=nv(e,d,c,h,a,r,u);}}et(e,"BrtEndSheetData");}function sv(e,r){if(!r||!r["!merges"])return;et(e,"BrtBeginMergeCells",Hd(r["!merges"].length));r["!merges"].forEach(function(r){et(e,"BrtMergeCell",zd(r));});et(e,"BrtEndMergeCells");}function fv(e,r){if(!r||!r["!cols"])return;et(e,"BrtBeginColInfos");r["!cols"].forEach(function(r,t){if(r)et(e,"BrtColInfo",Kd(t,r));});et(e,"BrtEndColInfos");}function lv(e,r){if(!r||!r["!ref"])return;et(e,"BrtBeginCellIgnoreECs");et(e,"BrtCellIgnoreEC",qd(kt(r["!ref"])));et(e,"BrtEndCellIgnoreECs");}function ov(e,r,t){r["!links"].forEach(function(r){if(!r[1].Target)return;var a=Ga(t,-1,r[1].Target.replace(/#.*$/,""),Ua.HLINK);et(e,"BrtHLink",Vd(r,a));});delete r["!links"];}function cv(e,r,t,a){if(r["!comments"].length>0){var n=Ga(a,-1,"../drawings/vmlDrawing"+(t+1)+".vml",Ua.VML);et(e,"BrtLegacyDrawing",Gt("rId"+n));r["!legacy"]=n;}}function uv(e,r,t,a){if(!r["!autofilter"])return;var n=r["!autofilter"];var i=typeof n.ref==="string"?n.ref:wt(n.ref);if(!t.Workbook)t.Workbook={Sheets:[]};if(!t.Workbook.Names)t.Workbook.Names=[];var s=t.Workbook.Names;var f=gt(i);if(f.s.r==f.e.r){f.e.r=gt(r["!ref"]).e.r;i=wt(f);}for(var l=0;l<s.length;++l){var o=s[l];if(o.Name!="_xlnm._FilterDatabase")continue;if(o.Sheet!=a)continue;o.Ref="'"+t.SheetNames[a]+"'!"+i;break;}if(l==s.length)s.push({Name:"_xlnm._FilterDatabase",Sheet:a,Ref:"'"+t.SheetNames[a]+"'!"+i});et(e,"BrtBeginAFilter",Jt(kt(i)));et(e,"BrtEndAFilter");}function hv(e,r,t){et(e,"BrtBeginWsViews");{et(e,"BrtBeginWsView",Qd(r,t));et(e,"BrtEndWsView");}et(e,"BrtEndWsViews");}function dv(){}function vv(e,r){if(!r["!protect"])return;et(e,"BrtSheetProtection",ev(r["!protect"]));}function pv(e,r,t,a){var n=qr();var i=t.SheetNames[e],s=t.Sheets[i]||{};var f=i;try{if(t&&t.Workbook)f=t.Workbook.Sheets[e].CodeName||f;}catch(l){}var o=kt(s["!ref"]||"A1");if(o.e.c>16383||o.e.r>1048575){if(r.WTF)throw new Error("Range "+(s["!ref"]||"A1")+" exceeds format limit A1:XFD1048576");o.e.c=Math.min(o.e.c,16383);o.e.r=Math.min(o.e.c,1048575);}s["!links"]=[];s["!comments"]=[];et(n,"BrtBeginSheet");if(t.vbaraw||s["!outline"])et(n,"BrtWsProp",sd(f,s["!outline"]));et(n,"BrtWsDim",ad(o));hv(n,s,t.Workbook);dv(n,s);fv(n,s,e,r,t);iv(n,s,e,r,t);vv(n,s);uv(n,s,t,e);sv(n,s);ov(n,s,a);if(s["!margins"])et(n,"BrtMargins",Zd(s["!margins"]));if(!r||r.ignoreEC||r.ignoreEC==void 0)lv(n,s);cv(n,s,e,a);et(n,"BrtEndSheet");return n.end();}Ua.CHART="http://schemas.openxmlformats.org/officeDocument/2006/relationships/chart";Ua.CHARTEX="http://schemas.microsoft.com/office/2014/relationships/chartEx";function mv(e){var r=[];var t=e.match(/^<c:numCache>/);var a;(e.match(/<c:pt idx="(\d*)">(.*?)<\/c:pt>/gm)||[]).forEach(function(e){var a=e.match(/<c:pt idx="(\d*?)"><c:v>(.*)<\/c:v><\/c:pt>/);if(!a)return;r[+a[1]]=t?+a[2]:a[2];});var n=Me((e.match(/<c:formatCode>([\s\S]*?)<\/c:formatCode>/)||["","General"])[1]);(e.match(/<c:f>(.*?)<\/c:f>/gm)||[]).forEach(function(e){a=e.replace(/<.*?>/g,"");});return[r,n,a];}function bv(e,r,t,a,n,i){var s=i||{"!type":"chart"};if(!e)return i;var f=0,l=0,o="A";var c={s:{r:2e6,c:2e6},e:{r:0,c:0}};(e.match(/<c:numCache>[\s\S]*?<\/c:numCache>/gm)||[]).forEach(function(e){var r=mv(e);c.s.r=c.s.c=0;c.e.c=f;o=ht(f);r[0].forEach(function(e,t){s[o+lt(t)]={t:"n",v:e,z:r[1]};l=t;});if(c.e.r<l)c.e.r=l;++f;});if(f>0)s["!ref"]=wt(c);return s;}Ua.CS="http://schemas.openxmlformats.org/officeDocument/2006/relationships/chartsheet";var gv=or("chartsheet",null,{xmlns:hr.main[0],"xmlns:r":hr.r});function wv(e,r,t,a,n){if(!e)return e;if(!a)a={"!id":{}};var i={"!type":"chart","!drawel":null,"!rel":""};var s;var f=e.match(yh);if(f)Fh(f[0],i,n,t);if(s=e.match(/drawing r:id="(.*?)"/))i["!rel"]=s[1];if(a["!id"][i["!rel"]])i["!drawel"]=a["!id"][i["!rel"]];return i;}function kv(e,r,t,a){var n=[Ae,gv];n[n.length]=or("drawing",null,{"r:id":"rId1"});Ga(a,-1,"../drawings/drawing"+(e+1)+".xml",Ua.DRAW);if(n.length>2){n[n.length]="</chartsheet>";n[1]=n[1].replace("/>",">");}return n.join("");}function Ev(e,r){e.l+=10;var t=yt(e,r-10);return{name:t};}function Sv(e,r,t,a,n){if(!e)return e;if(!a)a={"!id":{}};var i={"!type":"chart","!drawel":null,"!rel":""};var s=[];var f=false;Qr(e,function l(e,a,o){switch(o){case 550:i["!rel"]=e;break;case 651:if(!n.Sheets[t])n.Sheets[t]={};if(e.name)n.Sheets[t].CodeName=e.name;break;case 562:;case 652:;case 669:;case 679:;case 551:;case 552:;case 476:;case 3072:break;case 35:f=true;break;case 36:f=false;break;case 37:s.push(a);break;case 38:s.pop();break;default:if((a||"").indexOf("Begin")>0)s.push(a);else if((a||"").indexOf("End")>0)s.pop();else if(!f||r.WTF)throw new Error("Unexpected record "+o+" "+a);}},r);if(a["!id"][i["!rel"]])i["!drawel"]=a["!id"][i["!rel"]];return i;}function _v(){var e=qr();et(e,"BrtBeginSheet");et(e,"BrtEndSheet");return e.end();}var Cv=[["allowRefreshQuery",false,"bool"],["autoCompressPictures",true,"bool"],["backupFile",false,"bool"],["checkCompatibility",false,"bool"],["CodeName",""],["date1904",false,"bool"],["defaultThemeVersion",0,"int"],["filterPrivacy",false,"bool"],["hidePivotFieldList",false,"bool"],["promptedSolutions",false,"bool"],["publishItems",false,"bool"],["refreshAllConnections",false,"bool"],["saveExternalLinkValues",true,"bool"],["showBorderUnselectedTables",true,"bool"],["showInkAnnotation",true,"bool"],["showObjects","all"],["showPivotChartFilter",false,"bool"],["updateLinks","userSet"]];var Bv=[["activeTab",0,"int"],["autoFilterDateGrouping",true,"bool"],["firstSheet",0,"int"],["minimized",false,"bool"],["showHorizontalScroll",true,"bool"],["showSheetTabs",true,"bool"],["showVerticalScroll",true,"bool"],["tabRatio",600,"int"],["visibility","visible"]];var Tv=[];var yv=[["calcCompleted","true"],["calcMode","auto"],["calcOnSave","true"],["concurrentCalc","true"],["fullCalcOnLoad","false"],["fullPrecision","true"],["iterate","false"],["iterateCount","100"],["iterateDelta","0.001"],["refMode","A1"]];function xv(e,r){for(var t=0;t!=e.length;++t){var a=e[t];for(var n=0;n!=r.length;++n){var i=r[n];if(a[i[0]]==null)a[i[0]]=i[1];else switch(i[2]){case"bool":if(typeof a[i[0]]=="string")a[i[0]]=$e(a[i[0]]);break;case"int":if(typeof a[i[0]]=="string")a[i[0]]=parseInt(a[i[0]],10);break;}}}}function Av(e,r){for(var t=0;t!=r.length;++t){var a=r[t];if(e[a[0]]==null)e[a[0]]=a[1];else switch(a[2]){case"bool":if(typeof e[a[0]]=="string")e[a[0]]=$e(e[a[0]]);break;case"int":if(typeof e[a[0]]=="string")e[a[0]]=parseInt(e[a[0]],10);break;}}}function Iv(e){Av(e.WBProps,Cv);Av(e.CalcPr,yv);xv(e.WBView,Bv);xv(e.Sheets,Tv);uh.date1904=$e(e.WBProps.date1904);}function Rv(e){if(!e.Workbook)return"false";if(!e.Workbook.WBProps)return"false";return $e(e.Workbook.WBProps.date1904)?"true":"false";}var Fv="][*?/\\".split("");function Ov(e,r){if(e.length>31){if(r)return false;throw new Error("Sheet names cannot exceed 31 chars");}var t=true;Fv.forEach(function(a){if(e.indexOf(a)==-1)return;if(!r)throw new Error("Sheet name cannot contain : \\ / ? * [ ]");t=false;});return t;}function Dv(e,r,t){e.forEach(function(a,n){Ov(a);for(var i=0;i<n;++i){if(a==e[i])throw new Error("Duplicate Sheet Name: "+a);}if(t){var s=r&&r[n]&&r[n].CodeName||a;if(s.charCodeAt(0)==95&&s.length>22)throw new Error("Bad Code Name: Worksheet"+s);}});}function Pv(e){if(!e||!e.SheetNames||!e.Sheets)throw new Error("Invalid Workbook");if(!e.SheetNames.length)throw new Error("Workbook is empty");var r=e.Workbook&&e.Workbook.Sheets||[];Dv(e.SheetNames,r,!!e.vbaraw);for(var t=0;t<e.SheetNames.length;++t){gh(e.Sheets[e.SheetNames[t]],e.SheetNames[t],t);}}var Nv=/<\w+:workbook/;function Lv(e,r){if(!e)throw new Error("Could not find file");var t={AppVersion:{},WBProps:{},WBView:[],Sheets:[],CalcPr:{},Names:[],xmlns:""};var a=false,n="xmlns";var i={},s=0;e.replace(Re,function f(l,o){var c=De(l);switch(Pe(c[0])){case"<?xml":break;case"<workbook":if(l.match(Nv))n="xmlns"+l.match(/<(\w+):/)[1];t.xmlns=c[n];break;case"</workbook>":break;case"<fileVersion":delete c[0];t.AppVersion=c;break;case"<fileVersion/>":;case"</fileVersion>":break;case"<fileSharing":break;case"<fileSharing/>":break;case"<workbookPr":;case"<workbookPr/>":Cv.forEach(function(e){if(c[e[0]]==null)return;switch(e[2]){case"bool":t.WBProps[e[0]]=$e(c[e[0]]);break;case"int":t.WBProps[e[0]]=parseInt(c[e[0]],10);break;default:t.WBProps[e[0]]=c[e[0]];}});if(c.codeName)t.WBProps.CodeName=Ye(c.codeName);break;case"</workbookPr>":break;case"<workbookProtection":break;case"<workbookProtection/>":break;case"<bookViews":;case"<bookViews>":;case"</bookViews>":break;case"<workbookView":;case"<workbookView/>":delete c[0];t.WBView.push(c);break;case"</workbookView>":break;case"<sheets":;case"<sheets>":;case"</sheets>":break;case"<sheet":switch(c.state){case"hidden":c.Hidden=1;break;case"veryHidden":c.Hidden=2;break;default:c.Hidden=0;}delete c.state;c.name=Me(Ye(c.name));delete c[0];t.Sheets.push(c);break;case"</sheet>":break;case"<functionGroups":;case"<functionGroups/>":break;case"<functionGroup":break;case"<externalReferences":;case"</externalReferences>":;case"<externalReferences>":break;case"<externalReference":break;case"<definedNames/>":break;case"<definedNames>":;case"<definedNames":a=true;break;case"</definedNames>":a=false;break;case"<definedName":{i={};i.Name=Ye(c.name);if(c.comment)i.Comment=c.comment;if(c.localSheetId)i.Sheet=+c.localSheetId;if($e(c.hidden||"0"))i.Hidden=true;s=o+l.length;}break;case"</definedName>":{i.Ref=Me(Ye(e.slice(s,o)));t.Names.push(i);}break;case"<definedName/>":break;case"<calcPr":delete c[0];t.CalcPr=c;break;case"<calcPr/>":delete c[0];t.CalcPr=c;break;case"</calcPr>":break;case"<oleSize":break;case"<customWorkbookViews>":;case"</customWorkbookViews>":;case"<customWorkbookViews":break;case"<customWorkbookView":;case"</customWorkbookView>":break;case"<pivotCaches>":;case"</pivotCaches>":;case"<pivotCaches":break;case"<pivotCache":break;case"<smartTagPr":;case"<smartTagPr/>":break;case"<smartTagTypes":;case"<smartTagTypes>":;case"</smartTagTypes>":break;case"<smartTagType":break;case"<webPublishing":;case"<webPublishing/>":break;case"<fileRecoveryPr":;case"<fileRecoveryPr/>":break;case"<webPublishObjects>":;case"<webPublishObjects":;case"</webPublishObjects>":break;case"<webPublishObject":break;case"<extLst":;case"<extLst>":;case"</extLst>":;case"<extLst/>":break;case"<ext":a=true;break;case"</ext>":a=false;break;case"<ArchID":break;case"<AlternateContent":;case"<AlternateContent>":a=true;break;case"</AlternateContent>":a=false;break;case"<revisionPtr":break;default:if(!a&&r.WTF)throw new Error("unrecognized "+c[0]+" in workbook");}return l;});if(hr.main.indexOf(t.xmlns)===-1)throw new Error("Unknown Namespace: "+t.xmlns);Iv(t);return t;}var Mv=or("workbook",null,{xmlns:hr.main[0],"xmlns:r":hr.r});function Uv(e){var r=[Ae];r[r.length]=Mv;var t=e.Workbook&&(e.Workbook.Names||[]).length>0;var a={codeName:"ThisWorkbook"};if(e.Workbook&&e.Workbook.WBProps){Cv.forEach(function(r){if(e.Workbook.WBProps[r[0]]==null)return;if(e.Workbook.WBProps[r[0]]==r[1])return;a[r[0]]=e.Workbook.WBProps[r[0]];});if(e.Workbook.WBProps.CodeName){a.codeName=e.Workbook.WBProps.CodeName;delete a.CodeName;}}r[r.length]=or("workbookPr",null,a);var n=e.Workbook&&e.Workbook.Sheets||[];var i=0;if(n&&n[0]&&!!n[0].Hidden){r[r.length]="<bookViews>";for(i=0;i!=e.SheetNames.length;++i){if(!n[i])break;if(!n[i].Hidden)break;}if(i==e.SheetNames.length)i=0;r[r.length]='<workbookView firstSheet="'+i+'" activeTab="'+i+'"/>';r[r.length]="</bookViews>";}r[r.length]="<sheets>";for(i=0;i!=e.SheetNames.length;++i){var s={name:He(e.SheetNames[i].slice(0,31))};s.sheetId=""+(i+1);s["r:id"]="rId"+(i+1);if(n[i])switch(n[i].Hidden){case 1:s.state="hidden";break;case 2:s.state="veryHidden";break;}r[r.length]=or("sheet",null,s);}r[r.length]="</sheets>";if(t){r[r.length]="<definedNames>";if(e.Workbook&&e.Workbook.Names)e.Workbook.Names.forEach(function(e){var t={name:e.Name};if(e.Comment)t.comment=e.Comment;if(e.Sheet!=null)t.localSheetId=""+e.Sheet;if(e.Hidden)t.hidden="1";if(!e.Ref)return;r[r.length]=or("definedName",He(e.Ref),t);});r[r.length]="</definedNames>";}if(r.length>2){r[r.length]="</workbook>";r[1]=r[1].replace("/>",">");}return r.join("");}function zv(e,r){var t={};t.Hidden=e._R(4);t.iTabID=e._R(4);t.strRelID=Xt(e,r-8);t.name=yt(e);return t;}function Hv(e,r){if(!r)r=Jr(127);r._W(4,e.Hidden);r._W(4,e.iTabID);Gt(e.strRelID,r);xt(e.name.slice(0,31),r);return r.length>r.l?r.slice(0,r.l):r;}function Wv(e,r){var t={};var a=e._R(4);t.defaultThemeVersion=e._R(4);var n=r>8?yt(e):"";if(n.length>0)t.CodeName=n;t.autoCompressPictures=!!(a&65536);t.backupFile=!!(a&64);t.checkCompatibility=!!(a&4096);t.date1904=!!(a&1);t.filterPrivacy=!!(a&8);t.hidePivotFieldList=!!(a&1024);t.promptedSolutions=!!(a&16);t.publishItems=!!(a&2048);t.refreshAllConnections=!!(a&262144);t.saveExternalLinkValues=!!(a&128);t.showBorderUnselectedTables=!!(a&4);t.showInkAnnotation=!!(a&32);t.showObjects=["all","placeholders","none"][a>>13&3];t.showPivotChartFilter=!!(a&32768);t.updateLinks=["userSet","never","always"][a>>8&3];return t;}function Vv(e,r){if(!r)r=Jr(72);var t=0;if(e){if(e.filterPrivacy)t|=8;}r._W(4,t);r._W(4,0);zt(e&&e.CodeName||"ThisWorkbook",r);return r.slice(0,r.l);}function Xv(e,r){var t={};e._R(4);t.ArchID=e._R(4);e.l+=r-8;return t;}function Gv(e,r,t){var a=e.l+r;e.l+=4;e.l+=1;var n=e._R(4);var i=Vt(e);var s=eh(e,0,t);var f=Ht(e);e.l=a;var l={Name:i,Ptg:s};if(n<268435455)l.Sheet=n;if(f)l.Comment=f;return l;}function jv(e,r){var t={AppVersion:{},WBProps:{},WBView:[],Sheets:[],CalcPr:{},xmlns:""};var a=[];var n=false;if(!r)r={};r.biff=12;var i=[];var s=[[]];s.SheetNames=[];s.XTI=[];Qp[16]={n:"BrtFRTArchID$",f:Xv};Qr(e,function f(e,l,o){switch(o){case 156:s.SheetNames.push(e.name);t.Sheets.push(e);break;case 153:t.WBProps=e;break;case 39:if(e.Sheet!=null)r.SID=e.Sheet;e.Ref=Wu(e.Ptg,null,null,s,r);delete r.SID;delete e.Ptg;i.push(e);break;case 1036:break;case 357:;case 358:;case 355:;case 667:if(!s[0].length)s[0]=[o,e];else s.push([o,e]);s[s.length-1].XTI=[];break;case 362:if(s.length===0){s[0]=[];s[0].XTI=[];}s[s.length-1].XTI=s[s.length-1].XTI.concat(e);s.XTI=s.XTI.concat(e);break;case 361:break;case 2071:;case 158:;case 143:;case 664:;case 353:break;case 3072:;case 3073:;case 534:;case 677:;case 157:;case 610:;case 2050:;case 155:;case 548:;case 676:;case 128:;case 665:;case 2128:;case 2125:;case 549:;case 2053:;case 596:;case 2076:;case 2075:;case 2082:;case 397:;case 154:;case 1117:;case 553:;case 2091:break;case 35:a.push(l);n=true;break;case 36:a.pop();n=false;break;case 37:a.push(l);n=true;break;case 38:a.pop();n=false;break;case 16:break;default:if((l||"").indexOf("Begin")>0){}else if((l||"").indexOf("End")>0){}else if(!n||r.WTF&&a[a.length-1]!="BrtACBegin"&&a[a.length-1]!="BrtFRTBegin")throw new Error("Unexpected record "+o+" "+l);}},r);Iv(t);t.Names=i;t.supbooks=s;return t;}function Kv(e,r){et(e,"BrtBeginBundleShs");for(var t=0;t!=r.SheetNames.length;++t){var a=r.Workbook&&r.Workbook.Sheets&&r.Workbook.Sheets[t]&&r.Workbook.Sheets[t].Hidden||0;var n={Hidden:a,iTabID:t+1,strRelID:"rId"+(t+1),name:r.SheetNames[t]};et(e,"BrtBundleSh",Hv(n));}et(e,"BrtEndBundleShs");}function $v(r,t){if(!t)t=Jr(127);for(var a=0;a!=4;++a){t._W(4,0);}xt("SheetJS",t);xt(e.version,t);xt(e.version,t);xt("7262",t);return t.length>t.l?t.slice(0,t.l):t;}function Yv(e,r){if(!r)r=Jr(29);r._W(-4,0);r._W(-4,460);r._W(4,28800);r._W(4,17600);r._W(4,500);r._W(4,e);r._W(4,e);var t=120;r._W(1,t);return r.length>r.l?r.slice(0,r.l):r;}function Zv(e,r){if(!r.Workbook||!r.Workbook.Sheets)return;var t=r.Workbook.Sheets;var a=0,n=-1,i=-1;for(;a<t.length;++a){if(!t[a]||!t[a].Hidden&&n==-1)n=a;else if(t[a].Hidden==1&&i==-1)i=a;}if(i>n)return;et(e,"BrtBeginBookViews");et(e,"BrtBookView",Yv(n));et(e,"BrtEndBookViews");}function Jv(e,r){var t=qr();et(t,"BrtBeginBook");et(t,"BrtFileVersion",$v());et(t,"BrtWbProp",Vv(e.Workbook&&e.Workbook.WBProps||null));Zv(t,e,r);Kv(t,e,r);et(t,"BrtEndBook");return t.end();}function Qv(e,r,t){if(r.slice(-4)===".bin")return jv(e,t);return Lv(e,t);}function qv(e,r,t,a,n,i,s,f){if(r.slice(-4)===".bin")return av(e,a,t,n,i,s,f);return Ih(e,a,t,n,i,s,f);}function ep(e,r,t,a,n,i,s,f){if(r.slice(-4)===".bin")return Sv(e,a,t,n,i,s,f);return wv(e,a,t,n,i,s,f);}function rp(e,r,t,a,n,i,s,f){if(r.slice(-4)===".bin")return nc(e,a,t,n,i,s,f);return ic(e,a,t,n,i,s,f);}function tp(e,r,t,a,n,i,s,f){if(r.slice(-4)===".bin")return tc(e,a,t,n,i,s,f);return ac(e,a,t,n,i,s,f);}function ap(e,r,t,a){if(r.slice(-4)===".bin")return to(e,t,a);return Ml(e,t,a);}function np(e,r,t){return Co(e,t);}function ip(e,r,t){if(r.slice(-4)===".bin")return Pf(e,t);return Rf(e,t);}function sp(e,r,t){if(r.slice(-4)===".bin")return Zo(e,t);return Vo(e,t);}function fp(e,r,t){if(r.slice(-4)===".bin")return No(e,r,t);return Do(e,r,t);}function lp(e,r,t,a){if(t.slice(-4)===".bin")return Mo(e,r,t,a);return Lo(e,r,t,a);}function op(e,r,t){return(r.slice(-4)===".bin"?Jv:Uv)(e,t);}function cp(e,r,t,a,n){return(r.slice(-4)===".bin"?pv:Qh)(e,t,a,n);}function up(e,r,t,a,n){return(r.slice(-4)===".bin"?_v:kv)(e,t,a,n);}function hp(e,r,t){return(r.slice(-4)===".bin"?vo:zl)(e,t);}function dp(e,r,t){return(r.slice(-4)===".bin"?Mf:Of)(e,t);}function vp(e,r,t){return(r.slice(-4)===".bin"?Jo:Go)(e,t);}var pp=/([\w:]+)=((?:")([^"]*)(?:")|(?:')([^']*)(?:'))/g;var mp=/([\w:]+)=((?:")(?:[^"]*)(?:")|(?:')(?:[^']*)(?:'))/;function bp(e,r){var t=e.split(/\s+/);var a=[];if(!r)a[0]=t[0];if(t.length===1)return a;var n=e.match(pp),i,s,f,l;if(n)for(l=0;l!=n.length;++l){i=n[l].match(mp);if((s=i[1].indexOf(":"))===-1)a[i[1]]=i[2].slice(1,i[2].length-1);else{if(i[1].slice(0,6)==="xmlns:")f="xmlns"+i[1].slice(6);else f=i[1].slice(s+1);a[f]=i[2].slice(1,i[2].length-1);}}return a;}function gp(e){var r=e.split(/\s+/);var t={};if(r.length===1)return t;var a=e.match(pp),n,i,s,f;if(a)for(f=0;f!=a.length;++f){n=a[f].match(mp);if((i=n[1].indexOf(":"))===-1)t[n[1]]=n[2].slice(1,n[2].length-1);else{if(n[1].slice(0,6)==="xmlns:")s="xmlns"+n[1].slice(6);else s=n[1].slice(i+1);t[s]=n[2].slice(1,n[2].length-1);}}return t;}function wp(e,r){var t=P[e]||Me(e);if(t==="General")return O._general(r);return O.format(t,r);}function kp(e,r,t,a){var n=a;switch((t[0].match(/dt:dt="([\w.]+)"/)||["",""])[1]){case"boolean":n=$e(a);break;case"i2":;case"int":n=parseInt(a,10);break;case"r4":;case"float":n=parseFloat(a);break;case"date":;case"dateTime.tz":n=le(a);break;case"i8":;case"string":;case"fixed":;case"uuid":;case"bin.base64":break;default:throw new Error("bad custprop:"+t[0]);}e[Me(r)]=n;}function Ep(e,r,t){if(e.t==="z")return;if(!t||t.cellText!==false)try{if(e.t==="e"){e.w=e.w||Aa[e.v];}else if(r==="General"){if(e.t==="n"){if((e.v|0)===e.v)e.w=O._general_int(e.v);else e.w=O._general_num(e.v);}else e.w=O._general(e.v);}else e.w=wp(r||"General",e.v);}catch(a){if(t.WTF)throw a;}try{var n=P[r]||r||"General";if(t.cellNF)e.z=n;if(t.cellDates&&e.t=="n"&&O.is_date(n)){var i=O.parse_date_code(e.v);if(i){e.t="d";e.v=new Date(i.y,i.m-1,i.d,i.H,i.M,i.S,i.u);}}}catch(a){if(t.WTF)throw a;}}function Sp(e,r,t){if(t.cellStyles){if(r.Interior){var a=r.Interior;if(a.Pattern)a.patternType=xl[a.Pattern]||a.Pattern;}}e[r.ID]=r;}function _p(e,r,t,a,n,i,s,f,l,o){var c="General",u=a.StyleID,h={};o=o||{};var d=[];var v=0;if(u===undefined&&f)u=f.StyleID;if(u===undefined&&s)u=s.StyleID;while(i[u]!==undefined){if(i[u].nf)c=i[u].nf;if(i[u].Interior)d.push(i[u].Interior);if(!i[u].Parent)break;u=i[u].Parent;}switch(t.Type){case"Boolean":a.t="b";a.v=$e(e);break;case"String":a.t="s";a.r=je(Me(e));a.v=e.indexOf("<")>-1?Me(r||e).replace(/<.*?>/g,""):a.r;break;case"DateTime":if(e.slice(-1)!="Z")e+="Z";a.v=(le(e)-new Date(Date.UTC(1899,11,30)))/(24*60*60*1e3);if(a.v!==a.v)a.v=Me(e);else if(a.v<60)a.v=a.v-1;if(!c||c=="General")c="yyyy-mm-dd";case"Number":if(a.v===undefined)a.v=+e;if(!a.t)a.t="n";break;case"Error":a.t="e";a.v=Ia[e];if(o.cellText!==false)a.w=e;break;default:if(e==""&&r==""){a.t="z";}else{a.t="s";a.v=je(r||e);}break;}Ep(a,c,o);if(o.cellFormula!==false){if(a.Formula){var p=Me(a.Formula);if(p.charCodeAt(0)==61)p=p.slice(1);a.f=sc(p,n);delete a.Formula;if(a.ArrayRange=="RC")a.F=sc("RC:RC",n);else if(a.ArrayRange){a.F=sc(a.ArrayRange,n);l.push([kt(a.F),a.F]);}}else{for(v=0;v<l.length;++v){if(n.r>=l[v][0].s.r&&n.r<=l[v][0].e.r)if(n.c>=l[v][0].s.c&&n.c<=l[v][0].e.c)a.F=l[v][1];}}}if(o.cellStyles){d.forEach(function(e){if(!h.patternType&&e.patternType)h.patternType=e.patternType;});a.s=h;}if(a.StyleID!==undefined)a.ixfe=a.StyleID;}function Cp(e){e.t=e.v||"";e.t=e.t.replace(/\r\n/g,"\n").replace(/\r/g,"\n");e.v=e.w=e.ixfe=undefined;}function Bp(e){if(w&&Buffer.isBuffer(e))return e.toString("utf8");if(typeof e==="string")return e;if(typeof Uint8Array!=="undefined"&&e instanceof Uint8Array)return Ye(y(A(e)));throw new Error("Bad input format: expected Buffer or string");}var Tp=/<(\/?)([^\s?><!\/:]*:|)([^\s?<>:\/]+)(?:[\s?:\/][^>]*)?>/gm;function yp(e,r){var t=r||{};D(O);var a=d(Bp(e));if(t.type=="binary"||t.type=="array"||t.type=="base64"){if(typeof cptable!=="undefined")a=cptable.utils.decode(65001,c(a));else a=Ye(a);}var n=a.slice(0,1024).toLowerCase(),i=false;if((n.indexOf(">")&1023)>Math.min(n.indexOf(",")&1023,n.indexOf(";")&1023)){var s=ce(t);s.type="string";return gf.to_workbook(a,s);}if(n.indexOf("<?xml")==-1)["html","table","head","meta","script","style","div"].forEach(function(e){if(n.indexOf("<"+e)>=0)i=true;});if(i)return Em.to_workbook(a,t);var f;var l=[],o;if(m!=null&&t.dense==null)t.dense=m;var u={},h=[],v=t.dense?[]:{},p="";var b={},g={},w={};var k=bp('<Data ss:Type="String">'),E=0;var S=0,_=0;var C={s:{r:2e6,c:2e6},e:{r:0,c:0}};var B={},T={};var y="",x=0;var A=[];var I={},R={},F=0,N=[];var L=[],M={};var U=[],z,H=false;var W=[];var V=[],X={},G=0,j=0;var K={Sheets:[],WBProps:{date1904:false}},$={};Tp.lastIndex=0;a=a.replace(/<!--([\s\S]*?)-->/gm,"");var Y="";while(f=Tp.exec(a)){switch(f[3]=(Y=f[3]).toLowerCase()){case"data":if(Y=="data"){if(f[1]==="/"){if((o=l.pop())[0]!==f[3])throw new Error("Bad state: "+o.join("|"));}else if(f[0].charAt(f[0].length-2)!=="/")l.push([f[3],true]);break;}if(l[l.length-1][1])break;if(f[1]==="/")_p(a.slice(E,f.index),y,k,l[l.length-1][0]=="comment"?M:g,{c:S,r:_},B,U[S],w,W,t);else{y="";k=bp(f[0]);E=f.index+f[0].length;}break;case"cell":if(f[1]==="/"){if(L.length>0)g.c=L;if((!t.sheetRows||t.sheetRows>_)&&g.v!==undefined){if(t.dense){if(!v[_])v[_]=[];v[_][S]=g;}else v[ht(S)+lt(_)]=g;}if(g.HRef){g.l={Target:Me(g.HRef)};if(g.HRefScreenTip)g.l.Tooltip=g.HRefScreenTip;delete g.HRef;delete g.HRefScreenTip;}if(g.MergeAcross||g.MergeDown){G=S+(parseInt(g.MergeAcross,10)|0);j=_+(parseInt(g.MergeDown,10)|0);A.push({s:{c:S,r:_},e:{c:G,r:j}});}if(!t.sheetStubs){if(g.MergeAcross)S=G+1;else++S;}else if(g.MergeAcross||g.MergeDown){for(var Z=S;Z<=G;++Z){for(var J=_;J<=j;++J){if(Z>S||J>_){if(t.dense){if(!v[J])v[J]=[];v[J][Z]={t:"z"};}else v[ht(Z)+lt(J)]={t:"z"};}}}S=G+1;}else++S;}else{g=gp(f[0]);if(g.Index)S=+g.Index-1;if(S<C.s.c)C.s.c=S;if(S>C.e.c)C.e.c=S;if(f[0].slice(-2)==="/>")++S;L=[];}break;case"row":if(f[1]==="/"||f[0].slice(-2)==="/>"){if(_<C.s.r)C.s.r=_;if(_>C.e.r)C.e.r=_;if(f[0].slice(-2)==="/>"){w=bp(f[0]);if(w.Index)_=+w.Index-1;}S=0;++_;}else{w=bp(f[0]);if(w.Index)_=+w.Index-1;X={};if(w.AutoFitHeight=="0"||w.Height){X.hpx=parseInt(w.Height,10);X.hpt=Tl(X.hpx);V[_]=X;}if(w.Hidden=="1"){X.hidden=true;V[_]=X;}}break;case"worksheet":if(f[1]==="/"){if((o=l.pop())[0]!==f[3])throw new Error("Bad state: "+o.join("|"));h.push(p);if(C.s.r<=C.e.r&&C.s.c<=C.e.c){v["!ref"]=wt(C);if(t.sheetRows&&t.sheetRows<=C.e.r){v["!fullref"]=v["!ref"];C.e.r=t.sheetRows-1;v["!ref"]=wt(C);}}if(A.length)v["!merges"]=A;if(U.length>0)v["!cols"]=U;if(V.length>0)v["!rows"]=V;u[p]=v;}else{C={s:{r:2e6,c:2e6},e:{r:0,c:0}};_=S=0;l.push([f[3],false]);o=bp(f[0]);p=Me(o.Name);v=t.dense?[]:{};A=[];W=[];V=[];$={name:p,Hidden:0};K.Sheets.push($);}break;case"table":if(f[1]==="/"){if((o=l.pop())[0]!==f[3])throw new Error("Bad state: "+o.join("|"));}else if(f[0].slice(-2)=="/>")break;else{b=bp(f[0]);l.push([f[3],false]);U=[];H=false;}break;case"style":if(f[1]==="/")Sp(B,T,t);else T=bp(f[0]);break;case"numberformat":T.nf=Me(bp(f[0]).Format||"General");if(P[T.nf])T.nf=P[T.nf];for(var Q=0;Q!=392;++Q){if(O._table[Q]==T.nf)break;}if(Q==392)for(Q=57;Q!=392;++Q){if(O._table[Q]==null){O.load(T.nf,Q);break;}}break;case"column":if(l[l.length-1][0]!=="table")break;z=bp(f[0]);if(z.Hidden){z.hidden=true;delete z.Hidden;}if(z.Width)z.wpx=parseInt(z.Width,10);if(!H&&z.wpx>10){H=true;bl=vl;for(var q=0;q<U.length;++q){if(U[q])_l(U[q]);}}if(H)_l(z);U[z.Index-1||U.length]=z;for(var ee=0;ee<+z.Span;++ee){U[U.length]=ce(z);}break;case"namedrange":if(f[1]==="/")break;if(!K.Names)K.Names=[];var re=De(f[0]);var te={Name:re.Name,Ref:sc(re.RefersTo.slice(1),{r:0,c:0})};if(K.Sheets.length>0)te.Sheet=K.Sheets.length-1;K.Names.push(te);break;case"namedcell":break;case"b":break;case"i":break;case"u":break;case"s":break;case"em":break;case"h2":break;case"h3":break;case"sub":break;case"sup":break;case"span":break;case"alignment":break;case"borders":break;case"border":break;case"font":if(f[0].slice(-2)==="/>")break;else if(f[1]==="/")y+=a.slice(x,f.index);else x=f.index+f[0].length;break;case"interior":if(!t.cellStyles)break;T.Interior=bp(f[0]);break;case"protection":break;case"author":;case"title":;case"description":;case"created":;case"keywords":;case"subject":;case"category":;case"company":;case"lastauthor":;case"lastsaved":;case"lastprinted":;case"version":;case"revision":;case"totaltime":;case"hyperlinkbase":;case"manager":;case"contentstatus":;case"identifier":;case"language":;case"appname":if(f[0].slice(-2)==="/>")break;else if(f[1]==="/")gn(I,Y,a.slice(F,f.index));else F=f.index+f[0].length;break;case"paragraphs":break;case"styles":;case"workbook":if(f[1]==="/"){if((o=l.pop())[0]!==f[3])throw new Error("Bad state: "+o.join("|"));}else l.push([f[3],false]);break;case"comment":if(f[1]==="/"){if((o=l.pop())[0]!==f[3])throw new Error("Bad state: "+o.join("|"));Cp(M);L.push(M);}else{l.push([f[3],false]);o=bp(f[0]);M={a:o.Author};}break;case"autofilter":if(f[1]==="/"){if((o=l.pop())[0]!==f[3])throw new Error("Bad state: "+o.join("|"));}else if(f[0].charAt(f[0].length-2)!=="/"){var ae=bp(f[0]);v["!autofilter"]={ref:sc(ae.Range).replace(/\$/g,"")};l.push([f[3],true]);}break;case"name":break;case"datavalidation":if(f[1]==="/"){if((o=l.pop())[0]!==f[3])throw new Error("Bad state: "+o.join("|"));}else{if(f[0].charAt(f[0].length-2)!=="/")l.push([f[3],true]);}break;case"pixelsperinch":break;case"componentoptions":;case"documentproperties":;case"customdocumentproperties":;case"officedocumentsettings":;case"pivottable":;case"pivotcache":;case"names":;case"mapinfo":;case"pagebreaks":;case"querytable":;case"sorting":;case"schema":;case"conditionalformatting":;case"smarttagtype":;case"smarttags":;case"excelworkbook":;case"workbookoptions":;case"worksheetoptions":if(f[1]==="/"){if((o=l.pop())[0]!==f[3])throw new Error("Bad state: "+o.join("|"));}else if(f[0].charAt(f[0].length-2)!=="/")l.push([f[3],true]);break;case"null":break;default:if(l.length==0&&f[3]=="document")return Am(a,t);if(l.length==0&&f[3]=="uof")return Am(a,t);var ne=true;switch(l[l.length-1][0]){case"officedocumentsettings":switch(f[3]){case"allowpng":break;case"removepersonalinformation":break;case"downloadcomponents":break;case"locationofcomponents":break;case"colors":break;case"color":break;case"index":break;case"rgb":break;case"targetscreensize":break;case"readonlyrecommended":break;default:ne=false;}break;case"componentoptions":switch(f[3]){case"toolbar":break;case"hideofficelogo":break;case"spreadsheetautofit":break;case"label":break;case"caption":break;case"maxheight":break;case"maxwidth":break;case"nextsheetnumber":break;default:ne=false;}break;case"excelworkbook":switch(f[3]){case"date1904":K.WBProps.date1904=true;break;case"windowheight":break;case"windowwidth":break;case"windowtopx":break;case"windowtopy":break;case"tabratio":break;case"protectstructure":break;case"protectwindow":break;case"protectwindows":break;case"activesheet":break;case"displayinknotes":break;case"firstvisiblesheet":break;case"supbook":break;case"sheetname":break;case"sheetindex":break;case"sheetindexfirst":break;case"sheetindexlast":break;case"dll":break;case"acceptlabelsinformulas":break;case"donotsavelinkvalues":break;case"iteration":break;case"maxiterations":break;case"maxchange":break;case"path":break;case"xct":break;case"count":break;case"selectedsheets":break;case"calculation":break;case"uncalced":break;case"startupprompt":break;case"crn":break;case"externname":break;case"formula":break;case"colfirst":break;case"collast":break;case"wantadvise":break;case"boolean":break;case"error":break;case"text":break;case"ole":break;case"noautorecover":break;case"publishobjects":break;case"donotcalculatebeforesave":break;case"number":break;case"refmoder1c1":break;case"embedsavesmarttags":break;default:ne=false;}break;case"workbookoptions":switch(f[3]){case"owcversion":break;case"height":break;case"width":break;default:ne=false;}break;case"worksheetoptions":switch(f[3]){case"visible":if(f[0].slice(-2)==="/>"){}else if(f[1]==="/")switch(a.slice(F,f.index)){case"SheetHidden":$.Hidden=1;break;case"SheetVeryHidden":$.Hidden=2;break;}else F=f.index+f[0].length;break;case"header":if(!v["!margins"])ph(v["!margins"]={},"xlml");v["!margins"].header=De(f[0]).Margin;break;case"footer":if(!v["!margins"])ph(v["!margins"]={},"xlml");v["!margins"].footer=De(f[0]).Margin;break;case"pagemargins":var ie=De(f[0]);if(!v["!margins"])ph(v["!margins"]={},"xlml");if(ie.Top)v["!margins"].top=ie.Top;if(ie.Left)v["!margins"].left=ie.Left;if(ie.Right)v["!margins"].right=ie.Right;if(ie.Bottom)v["!margins"].bottom=ie.Bottom;break;case"displayrighttoleft":if(!K.Views)K.Views=[];if(!K.Views[0])K.Views[0]={};K.Views[0].RTL=true;break;case"freezepanes":break;case"frozennosplit":break;case"splithorizontal":;case"splitvertical":break;case"donotdisplaygridlines":break;case"activerow":break;case"activecol":break;case"toprowbottompane":break;case"leftcolumnrightpane":break;case"unsynced":break;case"print":break;case"printerrors":break;case"panes":break;case"scale":break;case"pane":break;case"number":break;case"layout":break;case"pagesetup":break;case"selected":break;case"protectobjects":break;case"enableselection":break;case"protectscenarios":break;case"validprinterinfo":break;case"horizontalresolution":break;case"verticalresolution":break;case"numberofcopies":break;case"activepane":break;case"toprowvisible":break;case"leftcolumnvisible":break;case"fittopage":break;case"rangeselection":break;case"papersizeindex":break;case"pagelayoutzoom":break;case"pagebreakzoom":break;case"filteron":break;case"fitwidth":break;case"fitheight":break;case"commentslayout":break;case"zoom":break;case"lefttoright":break;case"gridlines":break;case"allowsort":break;case"allowfilter":break;case"allowinsertrows":break;case"allowdeleterows":break;case"allowinsertcols":break;case"allowdeletecols":break;case"allowinserthyperlinks":break;case"allowformatcells":break;case"allowsizecols":break;case"allowsizerows":break;case"nosummaryrowsbelowdetail":if(!v["!outline"])v["!outline"]={};v["!outline"].above=true;break;case"tabcolorindex":break;case"donotdisplayheadings":break;case"showpagelayoutzoom":break;case"nosummarycolumnsrightdetail":if(!v["!outline"])v["!outline"]={};v["!outline"].left=true;break;case"blackandwhite":break;case"donotdisplayzeros":break;case"displaypagebreak":break;case"rowcolheadings":break;case"donotdisplayoutline":break;case"noorientation":break;case"allowusepivottables":break;case"zeroheight":break;case"viewablerange":break;case"selection":break;case"protectcontents":break;default:ne=false;}break;case"pivottable":;case"pivotcache":switch(f[3]){case"immediateitemsondrop":break;case"showpagemultipleitemlabel":break;case"compactrowindent":break;case"location":break;case"pivotfield":break;case"orientation":break;case"layoutform":break;case"layoutsubtotallocation":break;case"layoutcompactrow":break;case"position":break;case"pivotitem":break;case"datatype":break;case"datafield":break;case"sourcename":break;case"parentfield":break;case"ptlineitems":break;case"ptlineitem":break;case"countofsameitems":break;case"item":break;case"itemtype":break;case"ptsource":break;case"cacheindex":break;case"consolidationreference":break;case"filename":break;case"reference":break;case"nocolumngrand":break;case"norowgrand":break;case"blanklineafteritems":break;case"hidden":break;case"subtotal":break;case"basefield":break;case"mapchilditems":break;case"function":break;case"refreshonfileopen":break;case"printsettitles":break;case"mergelabels":break;case"defaultversion":break;case"refreshname":break;case"refreshdate":break;case"refreshdatecopy":break;case"versionlastrefresh":break;case"versionlastupdate":break;case"versionupdateablemin":break;case"versionrefreshablemin":break;case"calculation":break;default:ne=false;}break;case"pagebreaks":switch(f[3]){case"colbreaks":break;case"colbreak":break;case"rowbreaks":break;case"rowbreak":break;case"colstart":break;case"colend":break;case"rowend":break;default:ne=false;}break;case"autofilter":switch(f[3]){case"autofiltercolumn":break;case"autofiltercondition":break;case"autofilterand":break;case"autofilteror":break;default:ne=false;}break;case"querytable":switch(f[3]){case"id":break;case"autoformatfont":break;case"autoformatpattern":break;case"querysource":break;case"querytype":break;case"enableredirections":break;case"refreshedinxl9":break;case"urlstring":break;case"htmltables":break;case"connection":break;case"commandtext":break;case"refreshinfo":break;case"notitles":break;case"nextid":break;case"columninfo":break;case"overwritecells":break;case"donotpromptforfile":break;case"textwizardsettings":break;case"source":break;case"number":break;case"decimal":break;case"thousandseparator":break;case"trailingminusnumbers":break;case"formatsettings":break;case"fieldtype":break;case"delimiters":break;case"tab":break;case"comma":break;case"autoformatname":break;case"versionlastedit":break;case"versionlastrefresh":break;default:ne=false;}break;case"datavalidation":switch(f[3]){case"range":break;case"type":break;case"min":break;case"max":break;case"sort":break;case"descending":break;case"order":break;case"casesensitive":break;case"value":break;case"errorstyle":break;case"errormessage":break;case"errortitle":break;case"inputmessage":break;case"inputtitle":break;case"combohide":break;case"inputhide":break;case"condition":break;case"qualifier":break;case"useblank":break;case"value1":break;case"value2":break;case"format":break;case"cellrangelist":break;default:ne=false;}break;case"sorting":;case"conditionalformatting":switch(f[3]){case"range":break;case"type":break;case"min":break;case"max":break;case"sort":break;case"descending":break;case"order":break;case"casesensitive":break;case"value":break;case"errorstyle":break;case"errormessage":break;case"errortitle":break;case"cellrangelist":break;case"inputmessage":break;case"inputtitle":break;case"combohide":break;case"inputhide":break;case"condition":break;case"qualifier":break;case"useblank":break;case"value1":break;case"value2":break;case"format":break;default:ne=false;}break;case"mapinfo":;case"schema":;case"data":switch(f[3]){case"map":break;case"entry":break;case"range":break;case"xpath":break;case"field":break;case"xsdtype":break;case"filteron":break;case"aggregate":break;case"elementtype":break;case"attributetype":break;case"schema":;case"element":;case"complextype":;case"datatype":;case"all":;case"attribute":;case"extends":break;case"row":break;default:ne=false;}break;case"smarttags":break;default:ne=false;break;}if(ne)break;if(f[3].match(/!\[CDATA/))break;if(!l[l.length-1][1])throw"Unrecognized tag: "+f[3]+"|"+l.join("|");if(l[l.length-1][0]==="customdocumentproperties"){if(f[0].slice(-2)==="/>")break;else if(f[1]==="/")kp(R,Y,N,a.slice(F,f.index));else{N=f;F=f.index+f[0].length;}break;}if(t.WTF)throw"Unrecognized tag: "+f[3]+"|"+l.join("|");}}var se={};if(!t.bookSheets&&!t.bookProps)se.Sheets=u;se.SheetNames=h;se.Workbook=K;se.SSF=O.get_table();se.Props=I;se.Custprops=R;return se;}function xp(e,r){jm(r=r||{});switch(r.type||"base64"){case"base64":return yp(g.decode(e),r);case"binary":;case"buffer":;case"file":return yp(e,r);case"array":return yp(y(e),r);}}function Ap(e,r){var t=[];if(e.Props)t.push(wn(e.Props,r));if(e.Custprops)t.push(kn(e.Props,e.Custprops,r));return t.join("");}function Ip(){return"";}function Rp(e,r){var t=['<Style ss:ID="Default" ss:Name="Normal"><NumberFormat/></Style>'];r.cellXfs.forEach(function(e,r){var a=[];a.push(or("NumberFormat",null,{"ss:Format":He(O._table[e.numFmtId])}));var n={"ss:ID":"s"+(21+r)};t.push(or("Style",a.join(""),n));});return or("Styles",t.join(""));}function Fp(e){return or("NamedRange",null,{"ss:Name":e.Name,"ss:RefersTo":"="+lc(e.Ref,{r:0,c:0})});}function Op(e){if(!((e||{}).Workbook||{}).Names)return"";var r=e.Workbook.Names;var t=[];for(var a=0;a<r.length;++a){var n=r[a];if(n.Sheet!=null)continue;if(n.Name.match(/^_xlfn\./))continue;t.push(Fp(n));}return or("Names",t.join(""));}function Dp(e,r,t,a){if(!e)return"";if(!((a||{}).Workbook||{}).Names)return"";var n=a.Workbook.Names;var i=[];for(var s=0;s<n.length;++s){var f=n[s];if(f.Sheet!=t)continue;if(f.Name.match(/^_xlfn\./))continue;i.push(Fp(f));}return i.join("");}function Pp(e,r,t,a){if(!e)return"";var n=[];if(e["!margins"]){n.push("<PageSetup>");if(e["!margins"].header)n.push(or("Header",null,{"x:Margin":e["!margins"].header}));if(e["!margins"].footer)n.push(or("Footer",null,{"x:Margin":e["!margins"].footer}));n.push(or("PageMargins",null,{"x:Bottom":e["!margins"].bottom||"0.75","x:Left":e["!margins"].left||"0.7","x:Right":e["!margins"].right||"0.7","x:Top":e["!margins"].top||"0.75"}));n.push("</PageSetup>");}if(a&&a.Workbook&&a.Workbook.Sheets&&a.Workbook.Sheets[t]){if(a.Workbook.Sheets[t].Hidden)n.push(or("Visible",a.Workbook.Sheets[t].Hidden==1?"SheetHidden":"SheetVeryHidden",{}));else{for(var i=0;i<t;++i){if(a.Workbook.Sheets[i]&&!a.Workbook.Sheets[i].Hidden)break;}if(i==t)n.push("<Selected/>");}}if(((((a||{}).Workbook||{}).Views||[])[0]||{}).RTL)n.push("<DisplayRightToLeft/>");if(e["!protect"]){n.push(fr("ProtectContents","True"));if(e["!protect"].objects)n.push(fr("ProtectObjects","True"));if(e["!protect"].scenarios)n.push(fr("ProtectScenarios","True"));if(e["!protect"].selectLockedCells!=null&&!e["!protect"].selectLockedCells)n.push(fr("EnableSelection","NoSelection"));else if(e["!protect"].selectUnlockedCells!=null&&!e["!protect"].selectUnlockedCells)n.push(fr("EnableSelection","UnlockedCells"));[["formatCells","AllowFormatCells"],["formatColumns","AllowSizeCols"],["formatRows","AllowSizeRows"],["insertColumns","AllowInsertCols"],["insertRows","AllowInsertRows"],["insertHyperlinks","AllowInsertHyperlinks"],["deleteColumns","AllowDeleteCols"],["deleteRows","AllowDeleteRows"],["sort","AllowSort"],["autoFilter","AllowFilter"],["pivotTables","AllowUsePivotTables"]].forEach(function(r){if(e["!protect"][r[0]])n.push("<"+r[1]+"/>");});}if(n.length==0)return"";return or("WorksheetOptions",n.join(""),{xmlns:dr.x});}function Np(e){return e.map(function(e){var r=Ke(e.t||"");var t=or("ss:Data",r,{xmlns:"http://www.w3.org/TR/REC-html40"});return or("Comment",t,{"ss:Author":e.a});}).join("");}function Lp(e,r,t,a,n,i,s){if(!e||e.v==undefined&&e.f==undefined)return"";var f={};if(e.f)f["ss:Formula"]="="+He(lc(e.f,s));if(e.F&&e.F.slice(0,r.length)==r){var l=mt(e.F.slice(r.length+1));f["ss:ArrayRange"]="RC:R"+(l.r==s.r?"":"["+(l.r-s.r)+"]")+"C"+(l.c==s.c?"":"["+(l.c-s.c)+"]");}if(e.l&&e.l.Target){f["ss:HRef"]=He(e.l.Target);if(e.l.Tooltip)f["x:HRefScreenTip"]=He(e.l.Tooltip);}if(t["!merges"]){var o=t["!merges"];for(var c=0;c!=o.length;++c){if(o[c].s.c!=s.c||o[c].s.r!=s.r)continue;if(o[c].e.c>o[c].s.c)f["ss:MergeAcross"]=o[c].e.c-o[c].s.c;if(o[c].e.r>o[c].s.r)f["ss:MergeDown"]=o[c].e.r-o[c].s.r;}}var u="",h="";switch(e.t){case"z":if(!a.sheetStubs)return"";break;case"n":u="Number";h=String(e.v);break;case"b":u="Boolean";h=e.v?"1":"0";break;case"e":u="Error";h=Aa[e.v];break;case"d":u="DateTime";h=new Date(e.v).toISOString();if(e.z==null)e.z=e.z||O._table[14];break;case"s":u="String";h=Ge(e.v||"");break;}var d=mh(a.cellXfs,e,a);f["ss:StyleID"]="s"+(21+d);f["ss:Index"]=s.c+1;var v=e.v!=null?h:"";var p=e.t=="z"?"":'<Data ss:Type="'+u+'">'+v+"</Data>";if((e.c||[]).length>0)p+=Np(e.c);return or("Cell",p,f);}function Mp(e,r){var t='<Row ss:Index="'+(e+1)+'"';if(r){if(r.hpt&&!r.hpx)r.hpx=yl(r.hpt);if(r.hpx)t+=' ss:AutoFitHeight="0" ss:Height="'+r.hpx+'"';if(r.hidden)t+=' ss:Hidden="1"';}return t+">";}function Up(e,r,t,a){if(!e["!ref"])return"";var n=kt(e["!ref"]);var i=e["!merges"]||[],s=0;var f=[];if(e["!cols"])e["!cols"].forEach(function(e,r){_l(e);var t=!!e.width;var a=vh(r,e);var n={"ss:Index":r+1};if(t)n["ss:Width"]=gl(a.width);if(e.hidden)n["ss:Hidden"]="1";f.push(or("Column",null,n));});var l=Array.isArray(e);for(var o=n.s.r;o<=n.e.r;++o){var c=[Mp(o,(e["!rows"]||[])[o])];for(var u=n.s.c;u<=n.e.c;++u){var h=false;for(s=0;s!=i.length;++s){if(i[s].s.c>u)continue;if(i[s].s.r>o)continue;if(i[s].e.c<u)continue;if(i[s].e.r<o)continue;if(i[s].s.c!=u||i[s].s.r!=o)h=true;break;}if(h)continue;var d={r:o,c:u};var v=bt(d),p=l?(e[o]||[])[u]:e[v];c.push(Lp(p,v,e,r,t,a,d));}c.push("</Row>");if(c.length>2)f.push(c.join(""));}return f.join("");}function zp(e,r,t){var a=[];var n=t.SheetNames[e];var i=t.Sheets[n];var s=i?Dp(i,r,e,t):"";if(s.length>0)a.push("<Names>"+s+"</Names>");s=i?Up(i,r,e,t):"";if(s.length>0)a.push("<Table>"+s+"</Table>");a.push(Pp(i,r,e,t));return a.join("");}function Hp(e,r){if(!r)r={};if(!e.SSF)e.SSF=O.get_table();if(e.SSF){D(O);O.load_table(e.SSF);r.revssf=J(e.SSF);r.revssf[e.SSF[65535]]=0;r.ssf=e.SSF;r.cellXfs=[];mh(r.cellXfs,{},{revssf:{General:0}});}var t=[];t.push(Ap(e,r));t.push(Ip(e,r));t.push("");t.push("");for(var a=0;a<e.SheetNames.length;++a){t.push(or("Worksheet",zp(a,r,e),{"ss:Name":He(e.SheetNames[a])}));}t[2]=Rp(e,r);t[3]=Op(e,r);return Ae+or("Workbook",t.join(""),{xmlns:dr.ss,"xmlns:o":dr.o,"xmlns:x":dr.x,"xmlns:ss":dr.ss,"xmlns:dt":dr.dt,"xmlns:html":dr.html});}function Wp(e){var r={};var t=e.content;t.l=28;r.AnsiUserType=t._R(0,"lpstr-ansi");r.AnsiClipboardFormat=ia(t);if(t.length-t.l<=4)return r;var a=t._R(4);if(a==0||a>40)return r;t.l-=4;r.Reserved1=t._R(0,"lpstr-ansi");if(t.length-t.l<=4)return r;a=t._R(4);if(a!==1907505652)return r;r.UnicodeClipboardFormat=sa(t);a=t._R(4);if(a==0||a>40)return r;t.l-=4;r.Reserved2=t._R(0,"lpwstr");}function Vp(e,r,t,a){var n=t;var i=[];var s=r.slice(r.l,r.l+n);if(a&&a.enc&&a.enc.insitu&&s.length>0)switch(e.n){case"BOF":;case"FilePass":;case"FileLock":;case"InterfaceHdr":;case"RRDInfo":;case"RRDHead":;case"UsrExcl":;case"EOF":break;case"BoundSheet8":break;default:a.enc.insitu(s);}i.push(s);r.l+=n;var f=em[Mr(r,r.l)];var l=0;while(f!=null&&f.n.slice(0,8)==="Continue"){n=Mr(r,r.l+2);l=r.l+4;if(f.n=="ContinueFrt")l+=4;else if(f.n.slice(0,11)=="ContinueFrt"){l+=12;}s=r.slice(l,r.l+4+n);i.push(s);r.l+=4+n;f=em[Mr(r,r.l)];}var o=I(i);Yr(o,0);var c=0;o.lens=[];for(var u=0;u<i.length;++u){o.lens.push(c);c+=i[u].length;}if(o.length<t)throw"XLS Record "+(e&&e.n||"??")+" Truncated: "+o.length+" < "+t;return e.f(o,o.length,a);}function Xp(e,r,t){if(e.t==="z")return;if(!e.XF)return;var a=0;try{a=e.z||e.XF.numFmtId||0;if(r.cellNF)e.z=O._table[a];}catch(n){if(r.WTF)throw n;}if(!r||r.cellText!==false)try{if(e.t==="e"){e.w=e.w||Aa[e.v];}else if(a===0||a=="General"){if(e.t==="n"){if((e.v|0)===e.v)e.w=O._general_int(e.v);else e.w=O._general_num(e.v);}else e.w=O._general(e.v);}else e.w=O.format(a,e.v,{date1904:!!t,dateNF:r&&r.dateNF});}catch(n){if(r.WTF)throw n;}if(r.cellDates&&a&&e.t=="n"&&O.is_date(O._table[a]||String(a))){var i=O.parse_date_code(e.v);if(i){e.t="d";e.v=new Date(i.y,i.m-1,i.d,i.H,i.M,i.S,i.u);}}}function Gp(e,r,t){return{v:e,ixfe:r,t:t};}function jp(e,r){var t={opts:{}};var a={};if(m!=null&&r.dense==null)r.dense=m;var n=r.dense?[]:{};var i={};var s={};var f=null;var o=[];var c="";var u={};var h,d="",v,p,b,g;var w={};var k=[];var E;var S;var _=[];var C=[];var B={Sheets:[],WBProps:{date1904:false},Views:[{}]},T={};var y=function ge(e){if(e<8)return xa[e];if(e<64)return C[e-8]||xa[e];return xa[e];};var x=function we(e,r,t){var a=r.XF.data;if(!a||!a.patternType||!t||!t.cellStyles)return;r.s={};r.s.patternType=a.patternType;var n;if(n=cl(y(a.icvFore))){r.s.fgColor={rgb:n};}if(n=cl(y(a.icvBack))){r.s.bgColor={rgb:n};}};var A=function ke(e,r,t){if(W>1)return;if(t.sheetRows&&e.r>=t.sheetRows)return;if(t.cellStyles&&r.XF&&r.XF.data)x(e,r,t);delete r.ixfe;delete r.XF;h=e;d=bt(e);if(!s||!s.s||!s.e)s={s:{r:0,c:0},e:{r:0,c:0}};if(e.r<s.s.r)s.s.r=e.r;if(e.c<s.s.c)s.s.c=e.c;if(e.r+1>s.e.r)s.e.r=e.r+1;if(e.c+1>s.e.c)s.e.c=e.c+1;if(t.cellFormula&&r.f){for(var a=0;a<k.length;++a){if(k[a][0].s.c>e.c||k[a][0].s.r>e.r)continue;if(k[a][0].e.c<e.c||k[a][0].e.r<e.r)continue;r.F=wt(k[a][0]);if(k[a][0].s.c!=e.c||k[a][0].s.r!=e.r)delete r.f;if(r.f)r.f=""+Wu(k[a][1],s,e,z,I);break;}}{if(t.dense){if(!n[e.r])n[e.r]=[];n[e.r][e.c]=r;}else n[d]=r;}};var I={enc:false,sbcch:0,snames:[],sharedf:w,arrayf:k,rrtabid:[],lastuser:"",biff:8,codepage:0,winlocked:0,cellStyles:!!r&&!!r.cellStyles,WTF:!!r&&!!r.wtf};if(r.password)I.password=r.password;var R;var F=[];var D=[];var P=[],N=[];var L=0,M=0;var U=false;var z=[];z.SheetNames=I.snames;z.sharedf=I.sharedf;z.arrayf=I.arrayf;z.names=[];z.XTI=[];var H="";var W=0;var V=0,X=[];var G=[];var j;I.codepage=1200;l(1200);var $=false;while(e.l<e.length-1){var Y=e.l;var Z=e._R(2);if(Z===0&&H==="EOF")break;var J=e.l===e.length?0:e._R(2);var Q=em[Z];if(Q&&Q.f){if(r.bookSheets){if(H==="BoundSheet8"&&Q.n!=="BoundSheet8")break;}H=Q.n;if(Q.r===2||Q.r==12){var q=e._R(2);J-=2;if(!I.enc&&q!==Z&&((q&255)<<8|q>>8)!==Z)throw new Error("rt mismatch: "+q+"!="+Z);if(Q.r==12){e.l+=10;J-=10;}}var ee={};if(Q.n==="EOF")ee=Q.f(e,J,I);else ee=Vp(Q,e,J,I);var re=Q.n;if(W==0&&re!="BOF")continue;switch(re){case"Date1904":t.opts.Date1904=B.WBProps.date1904=ee;break;case"WriteProtect":t.opts.WriteProtect=true;break;case"FilePass":if(!I.enc)e.l=0;I.enc=ee;if(!r.password)throw new Error("File is password-protected");if(ee.valid==null)throw new Error("Encryption scheme unsupported");if(!ee.valid)throw new Error("Password is incorrect");break;case"WriteAccess":I.lastuser=ee;break;case"FileSharing":break;case"CodePage":var te=Number(ee);switch(te){case 21010:te=1200;break;case 32768:te=1e4;break;case 32769:te=1252;break;}l(I.codepage=te);$=true;break;case"RRTabId":I.rrtabid=ee;break;case"WinProtect":I.winlocked=ee;break;case"Template":break;case"BookBool":break;case"UsesELFs":break;case"MTRSettings":break;case"RefreshAll":;case"CalcCount":;case"CalcDelta":;case"CalcIter":;case"CalcMode":;case"CalcPrecision":;case"CalcSaveRecalc":t.opts[re]=ee;break;case"CalcRefMode":I.CalcRefMode=ee;break;case"Uncalced":break;case"ForceFullCalculation":t.opts.FullCalc=ee;break;case"WsBool":if(ee.fDialog)n["!type"]="dialog";if(!ee.fBelow)(n["!outline"]||(n["!outline"]={})).above=true;if(!ee.fRight)(n["!outline"]||(n["!outline"]={})).left=true;break;case"XF":_.push(ee);break;case"ExtSST":break;case"BookExt":break;case"RichTextStream":break;case"BkHim":break;case"SupBook":z.push([ee]);z[z.length-1].XTI=[];break;case"ExternName":z[z.length-1].push(ee);break;case"Index":break;case"Lbl":j={Name:ee.Name,Ref:Wu(ee.rgce,s,null,z,I)};if(ee.itab>0)j.Sheet=ee.itab-1;z.names.push(j);if(!z[0]){z[0]=[];z[0].XTI=[];}z[z.length-1].push(ee);if(ee.Name=="_xlnm._FilterDatabase"&&ee.itab>0)if(ee.rgce&&ee.rgce[0]&&ee.rgce[0][0]&&ee.rgce[0][0][0]=="PtgArea3d")G[ee.itab-1]={ref:wt(ee.rgce[0][0][1][2])};break;case"ExternCount":I.ExternCount=ee;break;case"ExternSheet":if(z.length==0){z[0]=[];z[0].XTI=[];}z[z.length-1].XTI=z[z.length-1].XTI.concat(ee);z.XTI=z.XTI.concat(ee);break;case"NameCmt":if(I.biff<8)break;if(j!=null)j.Comment=ee[1];break;case"Protect":n["!protect"]=ee;break;case"Password":if(ee!==0&&I.WTF)console.error("Password verifier: "+ee);break;case"Prot4Rev":;case"Prot4RevPass":break;case"BoundSheet8":{i[ee.pos]=ee;I.snames.push(ee.name);}break;case"EOF":{if(--W)break;if(s.e){if(s.e.r>0&&s.e.c>0){s.e.r--;s.e.c--;n["!ref"]=wt(s);if(r.sheetRows&&r.sheetRows<=s.e.r){var ae=s.e.r;s.e.r=r.sheetRows-1;n["!fullref"]=n["!ref"];n["!ref"]=wt(s);s.e.r=ae;}s.e.r++;s.e.c++;}if(F.length>0)n["!merges"]=F;if(D.length>0)n["!objects"]=D;if(P.length>0)n["!cols"]=P;if(N.length>0)n["!rows"]=N;B.Sheets.push(T);}if(c==="")u=n;else a[c]=n;n=r.dense?[]:{};}break;case"BOF":{if(I.biff===8)I.biff={9:2,521:3,1033:4}[Z]||{512:2,768:3,1024:4,1280:5,1536:8,2:2,7:2}[ee.BIFFVer]||8;I.biffguess=ee.BIFFVer==0;if(ee.BIFFVer==0&&ee.dt==4096){I.biff=5;$=true;l(I.codepage=28591);}if(I.biff==8&&ee.BIFFVer==0&&ee.dt==16)I.biff=2;if(W++)break;n=r.dense?[]:{};if(I.biff<8&&!$){$=true;l(I.codepage=r.codepage||1252);}if(I.biff<5||ee.BIFFVer==0&&ee.dt==4096){if(c==="")c="Sheet1";s={s:{r:0,c:0},e:{r:0,c:0}};var ne={pos:e.l-J,name:c};i[ne.pos]=ne;I.snames.push(c);}else c=(i[Y]||{name:""}).name;if(ee.dt==32)n["!type"]="chart";if(ee.dt==64)n["!type"]="macro";F=[];D=[];I.arrayf=k=[];P=[];N=[];L=M=0;U=false;T={Hidden:(i[Y]||{hs:0}).hs,name:c};}break;case"Number":;case"BIFF2NUM":;case"BIFF2INT":{if(n["!type"]=="chart")if(r.dense?(n[ee.r]||[])[ee.c]:n[bt({c:ee.c,r:ee.r})])++ee.c;E={ixfe:ee.ixfe,XF:_[ee.ixfe]||{},v:ee.val,t:"n"};if(V>0)E.z=X[E.ixfe>>8&63];Xp(E,r,t.opts.Date1904);A({c:ee.c,r:ee.r},E,r);}break;case"BoolErr":{E={ixfe:ee.ixfe,XF:_[ee.ixfe],v:ee.val,t:ee.t};if(V>0)E.z=X[E.ixfe>>8&63];Xp(E,r,t.opts.Date1904);A({c:ee.c,r:ee.r},E,r);}break;case"RK":{E={ixfe:ee.ixfe,XF:_[ee.ixfe],v:ee.rknum,t:"n"};if(V>0)E.z=X[E.ixfe>>8&63];Xp(E,r,t.opts.Date1904);A({c:ee.c,r:ee.r},E,r);}break;case"MulRk":{for(var ie=ee.c;ie<=ee.C;++ie){var se=ee.rkrec[ie-ee.c][0];E={ixfe:se,XF:_[se],v:ee.rkrec[ie-ee.c][1],t:"n"};if(V>0)E.z=X[E.ixfe>>8&63];Xp(E,r,t.opts.Date1904);A({c:ie,r:ee.r},E,r);}}break;case"Formula":{if(ee.val=="String"){f=ee;break;}E=Gp(ee.val,ee.cell.ixfe,ee.tt);E.XF=_[E.ixfe];if(r.cellFormula){var fe=ee.formula;if(fe&&fe[0]&&fe[0][0]&&fe[0][0][0]=="PtgExp"){var le=fe[0][0][1][0],oe=fe[0][0][1][1];var ce=bt({r:le,c:oe});if(w[ce])E.f=""+Wu(ee.formula,s,ee.cell,z,I);else E.F=((r.dense?(n[le]||[])[oe]:n[ce])||{}).F;}else E.f=""+Wu(ee.formula,s,ee.cell,z,I);}if(V>0)E.z=X[E.ixfe>>8&63];Xp(E,r,t.opts.Date1904);A(ee.cell,E,r);f=ee;}break;case"String":{if(f){f.val=ee;E=Gp(ee,f.cell.ixfe,"s");E.XF=_[E.ixfe];if(r.cellFormula){E.f=""+Wu(f.formula,s,f.cell,z,I);}if(V>0)E.z=X[E.ixfe>>8&63];Xp(E,r,t.opts.Date1904);A(f.cell,E,r);f=null;}else throw new Error("String record expects Formula");}break;case"Array":{k.push(ee);var ue=bt(ee[0].s);v=r.dense?(n[ee[0].s.r]||[])[ee[0].s.c]:n[ue];if(r.cellFormula&&v){if(!f)break;if(!ue||!v)break;v.f=""+Wu(ee[1],s,ee[0],z,I);v.F=wt(ee[0]);}}break;case"ShrFmla":{if(!r.cellFormula)break;if(d){if(!f)break;w[bt(f.cell)]=ee[0];v=r.dense?(n[f.cell.r]||[])[f.cell.c]:n[bt(f.cell)];(v||{}).f=""+Wu(ee[0],s,h,z,I);}}break;case"LabelSst":E=Gp(o[ee.isst].t,ee.ixfe,"s");if(o[ee.isst].h)E.h=o[ee.isst].h;E.XF=_[E.ixfe];if(V>0)E.z=X[E.ixfe>>8&63];Xp(E,r,t.opts.Date1904);A({c:ee.c,r:ee.r},E,r);break;case"Blank":if(r.sheetStubs){E={ixfe:ee.ixfe,XF:_[ee.ixfe],t:"z"};if(V>0)E.z=X[E.ixfe>>8&63];Xp(E,r,t.opts.Date1904);A({c:ee.c,r:ee.r},E,r);}break;case"MulBlank":if(r.sheetStubs){for(var he=ee.c;he<=ee.C;++he){var de=ee.ixfe[he-ee.c];E={ixfe:de,XF:_[de],t:"z"};if(V>0)E.z=X[E.ixfe>>8&63];Xp(E,r,t.opts.Date1904);A({c:he,r:ee.r},E,r);}}break;case"RString":;case"Label":;case"BIFF2STR":E=Gp(ee.val,ee.ixfe,"s");E.XF=_[E.ixfe];if(V>0)E.z=X[E.ixfe>>8&63];Xp(E,r,t.opts.Date1904);A({c:ee.c,r:ee.r},E,r);break;case"Dimensions":{if(W===1)s=ee;}break;case"SST":{o=ee;}break;case"Format":{if(I.biff==4){X[V++]=ee[1];for(var ve=0;ve<V+163;++ve){if(O._table[ve]==ee[1])break;}if(ve>=163)O.load(ee[1],V+163);}else O.load(ee[1],ee[0]);}break;case"BIFF2FORMAT":{X[V++]=ee;for(var pe=0;pe<V+163;++pe){if(O._table[pe]==ee)break;}if(pe>=163)O.load(ee,V+163);}break;case"MergeCells":F=F.concat(ee);break;case"Obj":D[ee.cmo[0]]=I.lastobj=ee;break;case"TxO":I.lastobj.TxO=ee;break;case"ImData":I.lastobj.ImData=ee;break;case"HLink":{for(g=ee[0].s.r;g<=ee[0].e.r;++g){for(b=ee[0].s.c;b<=ee[0].e.c;++b){v=r.dense?(n[g]||[])[b]:n[bt({c:b,r:g})];if(v)v.l=ee[1];}}}break;case"HLinkTooltip":{for(g=ee[0].s.r;g<=ee[0].e.r;++g){for(b=ee[0].s.c;b<=ee[0].e.c;++b){v=r.dense?(n[g]||[])[b]:n[bt({c:b,r:g})];if(v&&v.l)v.l.Tooltip=ee[1];}}}break;case"Note":{if(I.biff<=5&&I.biff>=2)break;v=r.dense?(n[ee[0].r]||[])[ee[0].c]:n[bt(ee[0])];var me=D[ee[2]];if(!v){if(r.dense){if(!n[ee[0].r])n[ee[0].r]=[];v=n[ee[0].r][ee[0].c]={t:"z"};}else{v=n[bt(ee[0])]={t:"z"};}s.e.r=Math.max(s.e.r,ee[0].r);s.s.r=Math.min(s.s.r,ee[0].r);s.e.c=Math.max(s.e.c,ee[0].c);s.s.c=Math.min(s.s.c,ee[0].c);}if(!v.c)v.c=[];p={a:ee[1],t:me.TxO.t};v.c.push(p);}break;default:switch(Q.n){case"ClrtClient":break;case"XFExt":Oo(_[ee.ixfe],ee.ext);break;case"DefColWidth":L=ee;break;case"DefaultRowHeight":M=ee[1];break;case"ColInfo":{if(!I.cellStyles)break;while(ee.e>=ee.s){P[ee.e--]={width:ee.w/256,level:ee.level||0,hidden:!!(ee.flags&1)};if(!U){U=true;Sl(ee.w/256);}_l(P[ee.e+1]);}}break;case"Row":{var be={};if(ee.level!=null){N[ee.r]=be;be.level=ee.level;}if(ee.hidden){N[ee.r]=be;be.hidden=true;}if(ee.hpt){N[ee.r]=be;be.hpt=ee.hpt;be.hpx=yl(ee.hpt);}}break;case"LeftMargin":;case"RightMargin":;case"TopMargin":;case"BottomMargin":if(!n["!margins"])ph(n["!margins"]={});n["!margins"][re.slice(0,-6).toLowerCase()]=ee;break;case"Selection":break;case"Setup":if(!n["!margins"])ph(n["!margins"]={});n["!margins"].header=ee.header;n["!margins"].footer=ee.footer;break;case"Window2":if(ee.RTL)B.Views[0].RTL=true;break;case"Header":break;case"Footer":break;case"HCenter":break;case"VCenter":break;case"Pls":break;case"GCW":break;case"LHRecord":break;case"DBCell":break;case"EntExU2":break;case"SxView":break;case"Sxvd":break;case"SXVI":break;case"SXVDEx":break;case"SxIvd":break;case"SXString":break;case"Sync":break;case"Addin":break;case"SXDI":break;case"SXLI":break;case"SXEx":break;case"QsiSXTag":break;case"Feat":break;case"FeatHdr":;case"FeatHdr11":break;case"Feature11":;case"Feature12":;case"List12":break;case"Country":S=ee;break;case"RecalcId":break;case"DxGCol":break;case"Fbi":;case"Fbi2":;case"GelFrame":break;case"Font":break;case"XFCRC":break;case"Style":break;case"StyleExt":break;case"Palette":C=ee;break;case"Theme":R=ee;break;case"ScenarioProtect":break;case"ObjProtect":break;case"CondFmt12":break;case"Table":break;case"TableStyles":break;case"TableStyle":break;case"TableStyleElement":break;case"SXStreamID":break;case"SXVS":break;case"DConRef":break;case"SXAddl":break;case"DConBin":break;case"DConName":break;case"SXPI":break;case"SxFormat":break;case"SxSelect":break;case"SxRule":break;case"SxFilt":break;case"SxItm":break;case"SxDXF":break;case"ScenMan":break;case"DCon":break;case"CellWatch":break;case"PrintRowCol":break;case"PrintGrid":break;case"PrintSize":break;case"XCT":break;case"CRN":break;case"Scl":{}break;case"SheetExt":{}break;case"SheetExtOptional":{}break;case"ObNoMacros":{}break;case"ObProj":{}break;case"CodeName":{if(!c)B.WBProps.CodeName=ee||"ThisWorkbook";else T.CodeName=ee||T.name;}break;case"GUIDTypeLib":{}break;case"WOpt":break;case"PhoneticInfo":break;case"OleObjectSize":break;case"DXF":;case"DXFN":;case"DXFN12":;case"DXFN12List":;case"DXFN12NoCB":break;case"Dv":;case"DVal":break;case"BRAI":;case"Series":;case"SeriesText":break;case"DConn":break;case"DbOrParamQry":break;case"DBQueryExt":break;case"OleDbConn":break;case"ExtString":break;case"IFmtRecord":break;case"CondFmt":;case"CF":;case"CF12":;case"CFEx":break;case"Excel9File":break;case"Units":break;case"InterfaceHdr":;case"Mms":;case"InterfaceEnd":;case"DSF":break;case"BuiltInFnGroupCount":break;case"Window1":;case"HideObj":;case"GridSet":;case"Guts":;case"UserBView":;case"UserSViewBegin":;case"UserSViewEnd":break;case"Pane":break;default:switch(Q.n){case"Dat":;case"Begin":;case"End":;case"StartBlock":;case"EndBlock":;case"Frame":;case"Area":;case"Axis":;case"AxisLine":;case"Tick":break;case"AxesUsed":;case"CrtLayout12":;case"CrtLayout12A":;case"CrtLink":;case"CrtLine":;case"CrtMlFrt":;case"CrtMlFrtContinue":break;case"LineFormat":;case"AreaFormat":;case"Chart":;case"Chart3d":;case"Chart3DBarShape":;case"ChartFormat":;case"ChartFrtInfo":break;case"PlotArea":;case"PlotGrowth":break;case"SeriesList":;case"SerParent":;case"SerAuxTrend":break;case"DataFormat":;case"SerToCrt":;case"FontX":break;case"CatSerRange":;case"AxcExt":;case"SerFmt":break;case"ShtProps":break;case"DefaultText":;case"Text":;case"CatLab":break;case"DataLabExtContents":break;case"Legend":;case"LegendException":break;case"Pie":;case"Scatter":break;case"PieFormat":;case"MarkerFormat":break;case"StartObject":;case"EndObject":break;case"AlRuns":;case"ObjectLink":break;case"SIIndex":break;case"AttachedLabel":;case"YMult":break;case"Line":;case"Bar":break;case"Surf":break;case"AxisParent":break;case"Pos":break;case"ValueRange":break;case"SXViewEx9":break;case"SXViewLink":break;case"PivotChartBits":break;case"SBaseRef":break;case"TextPropsStream":break;case"LnExt":break;case"MkrExt":break;case"CrtCoopt":break;case"Qsi":;case"Qsif":;case"Qsir":;case"QsiSXTag":break;case"TxtQry":break;case"FilterMode":break;case"AutoFilter":;case"AutoFilterInfo":break;case"AutoFilter12":break;case"DropDownObjIds":break;case"Sort":break;case"SortData":break;case"ShapePropsStream":break;case"MsoDrawing":;case"MsoDrawingGroup":;case"MsoDrawingSelection":break;case"WebPub":;case"AutoWebPub":break;case"HeaderFooter":;case"HFPicture":;case"PLV":;case"HorizontalPageBreaks":;case"VerticalPageBreaks":break;case"Backup":;case"CompressPictures":;case"Compat12":break;case"Continue":;case"ContinueFrt12":break;case"FrtFontList":;case"FrtWrapper":break;default:switch(Q.n){case"TabIdConf":;case"Radar":;case"RadarArea":;case"DropBar":;case"Intl":;case"CoordList":;case"SerAuxErrBar":break;case"BIFF2FONTCLR":;case"BIFF2FMTCNT":;case"BIFF2FONTXTRA":break;case"BIFF2XF":;case"BIFF3XF":;case"BIFF4XF":break;case"BIFF2XFINDEX":break;case"BIFF4FMTCNT":;case"BIFF2ROW":;case"BIFF2WINDOW2":break;case"SCENARIO":;case"DConBin":;case"PicF":;case"DataLabExt":;case"Lel":;case"BopPop":;case"BopPopCustom":;case"RealTimeData":;case"Name":break;case"LHNGraph":;case"FnGroupName":;case"AddMenu":;case"LPr":break;case"ListObj":;case"ListField":break;case"RRSort":break;case"BigName":break;case"ToolbarHdr":;case"ToolbarEnd":break;case"DDEObjName":break;case"FRTArchId$":break;default:if(r.WTF)throw"Unrecognized Record "+Q.n;};};};}}else e.l+=J;}t.SheetNames=K(i).sort(function(e,r){return Number(e)-Number(r);}).map(function(e){return i[e].name;});if(!r.bookSheets)t.Sheets=a;if(!t.SheetNames.length&&u["!ref"]){t.SheetNames.push("Sheet1");if(t.Sheets)t.Sheets["Sheet1"]=u;}else t.Preamble=u;if(t.Sheets)G.forEach(function(e,r){t.Sheets[t.SheetNames[r]]["!autofilter"]=e;});t.Strings=o;t.SSF=O.get_table();if(I.enc)t.Encryption=I.enc;if(R)t.Themes=R;t.Metadata={};if(S!==undefined)t.Metadata.Country=S;if(z.names.length>0)B.Names=z.names;t.Workbook=B;return t;}var Kp={SI:"e0859ff2f94f6810ab9108002b27b3d9",DSI:"02d5cdd59c2e1b10939708002b2cf9ae",UDI:"05d5cdd59c2e1b10939708002b2cf9ae"};function $p(e,r,t){var a=W.find(e,"!DocumentSummaryInformation");if(a&&a.size>0)try{var n=Hn(a,ka,Kp.DSI);for(var i in n){r[i]=n[i];}}catch(s){if(t.WTF)throw s;}var f=W.find(e,"!SummaryInformation");if(f&&f.size>0)try{var l=Hn(f,Ea,Kp.SI);for(var o in l){if(r[o]==null)r[o]=l[o];}}catch(s){if(t.WTF)throw s;}if(r.HeadingPairs&&r.TitlesOfParts){ln(r.HeadingPairs,r.TitlesOfParts,r,t);delete r.HeadingPairs;delete r.TitlesOfParts;}}function Yp(e,r){var t=[],a=[],n=[];var i=0,s;if(e.Props){s=K(e.Props);for(i=0;i<s.length;++i){(Object.prototype.hasOwnProperty.call(Sa,s[i])?t:Object.prototype.hasOwnProperty.call(_a,s[i])?a:n).push([s[i],e.Props[s[i]]]);}}if(e.Custprops){s=K(e.Custprops);for(i=0;i<s.length;++i){if(!Object.prototype.hasOwnProperty.call(e.Props||{},s[i]))(Object.prototype.hasOwnProperty.call(Sa,s[i])?t:Object.prototype.hasOwnProperty.call(_a,s[i])?a:n).push([s[i],e.Custprops[s[i]]]);}}var f=[];for(i=0;i<n.length;++i){if(Mn.indexOf(n[i][0])>-1)continue;if(n[i][1]==null)continue;f.push(n[i]);}if(a.length)W.utils.cfb_add(r,"/SummaryInformation",Wn(a,Kp.SI,_a,Ea));if(t.length||f.length)W.utils.cfb_add(r,"/DocumentSummaryInformation",Wn(t,Kp.DSI,Sa,ka,f.length?f:null,Kp.UDI));}function Zp(e,r){if(!r)r={};jm(r);o();if(r.codepage)s(r.codepage);var t,a;if(e.FullPaths){if(W.find(e,"/encryption"))throw new Error("File is password-protected");t=W.find(e,"!CompObj");a=W.find(e,"/Workbook")||W.find(e,"/Book");}else{switch(r.type){case"base64":e=B(g.decode(e));break;case"binary":e=B(e);break;case"buffer":break;case"array":if(!Array.isArray(e))e=Array.prototype.slice.call(e);break;}Yr(e,0);a={content:e};}var n;var i;if(t)Wp(t);if(r.bookProps&&!r.bookSheets)n={};else{var f=w?"buffer":"array";if(a&&a.content)n=jp(a.content,r);else if((i=W.find(e,"PerfectOffice_MAIN"))&&i.content)n=kf.to_workbook(i.content,(r.type=f,r));else if((i=W.find(e,"NativeContent_MAIN"))&&i.content)n=kf.to_workbook(i.content,(r.type=f,r));else throw new Error("Cannot find Workbook stream");if(r.bookVBA&&e.FullPaths&&W.find(e,"/_VBA_PROJECT_CUR/VBA/dir"))n.vbaraw=qo(e);}var l={};if(e.FullPaths)$p(e,l,r);n.Props=n.Custprops=l;if(r.bookFiles)n.cfb=e;return n;}function Jp(e,r){var t=r||{};var a=W.utils.cfb_new({root:"R"});var n="/Workbook";switch(t.bookType||"xls"){case"xls":t.bookType="biff8";case"xla":if(!t.bookType)t.bookType="xla";case"biff8":n="/Workbook";t.biff=8;break;case"biff5":n="/Book";t.biff=5;break;default:throw new Error("invalid type "+t.bookType+" for XLS CFB");}W.utils.cfb_add(a,n,km(e,t));if(t.biff==8&&(e.Props||e.Custprops))Yp(e,a);if(t.biff==8&&e.vbaraw)ec(a,W.read(e.vbaraw,{type:typeof e.vbaraw=="string"?"binary":"buffer"}));return a;}var Qp={0:{n:"BrtRowHdr",f:qh},1:{n:"BrtCellBlank",f:fd},2:{n:"BrtCellRk",f:yd},3:{n:"BrtCellError",f:pd},4:{n:"BrtCellBool",f:ud},5:{n:"BrtCellReal",f:_d},6:{n:"BrtCellSt",f:Rd},7:{n:"BrtCellIsst",f:wd},8:{n:"BrtFmlaString",f:Md},9:{n:"BrtFmlaNum",f:Ld},10:{n:"BrtFmlaBool",f:Pd},11:{n:"BrtFmlaError",f:Nd},12:{n:"BrtShortBlank",f:od},13:{n:"BrtShortRk",f:Ad},14:{n:"BrtShortError",f:bd},15:{n:"BrtShortBool",f:dd},16:{n:"BrtShortReal",f:Bd},17:{n:"BrtShortSt",f:Od},18:{n:"BrtShortIsst",f:Ed},19:{n:"BrtSSTItem",f:Rt},20:{n:"BrtPCDIMissing"},21:{n:"BrtPCDINumber"},22:{n:"BrtPCDIBoolean"},23:{n:"BrtPCDIError"},24:{n:"BrtPCDIString"},25:{n:"BrtPCDIDatetime"},26:{n:"BrtPCDIIndex"},27:{n:"BrtPCDIAMissing"},28:{n:"BrtPCDIANumber"},29:{n:"BrtPCDIABoolean"},30:{n:"BrtPCDIAError"},31:{n:"BrtPCDIAString"},32:{n:"BrtPCDIADatetime"},33:{n:"BrtPCRRecord"},34:{n:"BrtPCRRecordDt"},35:{n:"BrtFRTBegin"},36:{n:"BrtFRTEnd"},37:{n:"BrtACBegin"},38:{n:"BrtACEnd"},39:{n:"BrtName",f:Gv},40:{n:"BrtIndexRowBlock"},42:{n:"BrtIndexBlock"},43:{n:"BrtFont",f:Vl},44:{n:"BrtFmt",f:Hl},45:{n:"BrtFill",f:Kl},46:{n:"BrtBorder",f:Ql},47:{n:"BrtXF",f:Yl},48:{n:"BrtStyle"},49:{n:"BrtCellMeta"},50:{n:"BrtValueMeta"},51:{n:"BrtMdb"},52:{n:"BrtBeginFmd"},53:{n:"BrtEndFmd"},54:{n:"BrtBeginMdx"},55:{n:"BrtEndMdx"},56:{n:"BrtBeginMdxTuple"},57:{n:"BrtEndMdxTuple"},58:{n:"BrtMdxMbrIstr"},59:{n:"BrtStr"},60:{n:"BrtColInfo",f:Zs},62:{n:"BrtCellRString"},63:{n:"BrtCalcChainItem$",f:Po},64:{n:"BrtDVal",f:rv},65:{n:"BrtSxvcellNum"},66:{n:"BrtSxvcellStr"},67:{n:"BrtSxvcellBool"},68:{n:"BrtSxvcellErr"},69:{n:"BrtSxvcellDate"},70:{n:"BrtSxvcellNil"},128:{n:"BrtFileVersion"},129:{n:"BrtBeginSheet"},130:{n:"BrtEndSheet"},131:{n:"BrtBeginBook",f:Zr,p:0},132:{n:"BrtEndBook"},133:{n:"BrtBeginWsViews"},134:{n:"BrtEndWsViews"},135:{n:"BrtBeginBookViews"},136:{n:"BrtEndBookViews"},137:{n:"BrtBeginWsView",f:Jd},138:{n:"BrtEndWsView"},139:{n:"BrtBeginCsViews"},140:{n:"BrtEndCsViews"},141:{n:"BrtBeginCsView"},142:{n:"BrtEndCsView"},143:{n:"BrtBeginBundleShs"},144:{n:"BrtEndBundleShs"},145:{n:"BrtBeginSheetData"},146:{n:"BrtEndSheetData"},147:{n:"BrtWsProp",f:id},148:{n:"BrtWsDim",f:td,p:16},151:{n:"BrtPane",f:Xd},152:{n:"BrtSel"},153:{n:"BrtWbProp",f:Wv},154:{n:"BrtWbFactoid"},155:{n:"BrtFileRecover"},156:{n:"BrtBundleSh",f:zv},157:{n:"BrtCalcProp"},158:{n:"BrtBookView"},159:{n:"BrtBeginSst",f:Df},160:{n:"BrtEndSst"},161:{n:"BrtBeginAFilter",f:Zt},162:{n:"BrtEndAFilter"},163:{n:"BrtBeginFilterColumn"},164:{n:"BrtEndFilterColumn"},165:{n:"BrtBeginFilters"},166:{n:"BrtEndFilters"},167:{n:"BrtFilter"},168:{n:"BrtColorFilter"},169:{n:"BrtIconFilter"},170:{n:"BrtTop10Filter"},171:{n:"BrtDynamicFilter"},172:{n:"BrtBeginCustomFilters"},173:{n:"BrtEndCustomFilters"},174:{n:"BrtCustomFilter"},175:{n:"BrtAFilterDateGroupItem"},176:{n:"BrtMergeCell",f:Ud},177:{n:"BrtBeginMergeCells"},178:{n:"BrtEndMergeCells"},179:{n:"BrtBeginPivotCacheDef"},180:{n:"BrtEndPivotCacheDef"},181:{n:"BrtBeginPCDFields"},182:{n:"BrtEndPCDFields"},183:{n:"BrtBeginPCDField"},184:{n:"BrtEndPCDField"},185:{n:"BrtBeginPCDSource"},186:{n:"BrtEndPCDSource"},187:{n:"BrtBeginPCDSRange"},188:{n:"BrtEndPCDSRange"},189:{n:"BrtBeginPCDFAtbl"},190:{n:"BrtEndPCDFAtbl"},191:{n:"BrtBeginPCDIRun"},192:{n:"BrtEndPCDIRun"},193:{n:"BrtBeginPivotCacheRecords"},194:{n:"BrtEndPivotCacheRecords"},195:{n:"BrtBeginPCDHierarchies"},196:{n:"BrtEndPCDHierarchies"},197:{n:"BrtBeginPCDHierarchy"},198:{n:"BrtEndPCDHierarchy"},199:{n:"BrtBeginPCDHFieldsUsage"},200:{n:"BrtEndPCDHFieldsUsage"},201:{n:"BrtBeginExtConnection"},202:{n:"BrtEndExtConnection"},203:{n:"BrtBeginECDbProps"},204:{n:"BrtEndECDbProps"},205:{n:"BrtBeginECOlapProps"},206:{n:"BrtEndECOlapProps"},207:{n:"BrtBeginPCDSConsol"},208:{n:"BrtEndPCDSConsol"},209:{n:"BrtBeginPCDSCPages"},210:{n:"BrtEndPCDSCPages"},211:{n:"BrtBeginPCDSCPage"},212:{n:"BrtEndPCDSCPage"},213:{n:"BrtBeginPCDSCPItem"},214:{n:"BrtEndPCDSCPItem"},215:{n:"BrtBeginPCDSCSets"},216:{n:"BrtEndPCDSCSets"},217:{n:"BrtBeginPCDSCSet"},218:{n:"BrtEndPCDSCSet"},219:{n:"BrtBeginPCDFGroup"},220:{n:"BrtEndPCDFGroup"},221:{n:"BrtBeginPCDFGItems"},222:{n:"BrtEndPCDFGItems"},223:{n:"BrtBeginPCDFGRange"},224:{n:"BrtEndPCDFGRange"},225:{n:"BrtBeginPCDFGDiscrete"},226:{n:"BrtEndPCDFGDiscrete"},227:{n:"BrtBeginPCDSDTupleCache"},228:{n:"BrtEndPCDSDTupleCache"},229:{n:"BrtBeginPCDSDTCEntries"},230:{n:"BrtEndPCDSDTCEntries"},231:{n:"BrtBeginPCDSDTCEMembers"},232:{n:"BrtEndPCDSDTCEMembers"},233:{n:"BrtBeginPCDSDTCEMember"},234:{n:"BrtEndPCDSDTCEMember"},235:{n:"BrtBeginPCDSDTCQueries"},236:{n:"BrtEndPCDSDTCQueries"},237:{n:"BrtBeginPCDSDTCQuery"},238:{n:"BrtEndPCDSDTCQuery"},239:{n:"BrtBeginPCDSDTCSets"},240:{n:"BrtEndPCDSDTCSets"},241:{n:"BrtBeginPCDSDTCSet"},242:{n:"BrtEndPCDSDTCSet"},243:{n:"BrtBeginPCDCalcItems"},244:{n:"BrtEndPCDCalcItems"},245:{n:"BrtBeginPCDCalcItem"},246:{n:"BrtEndPCDCalcItem"},247:{n:"BrtBeginPRule"},248:{n:"BrtEndPRule"},249:{n:"BrtBeginPRFilters"},250:{n:"BrtEndPRFilters"},251:{n:"BrtBeginPRFilter"},252:{n:"BrtEndPRFilter"},253:{n:"BrtBeginPNames"},254:{n:"BrtEndPNames"},255:{n:"BrtBeginPName"},256:{n:"BrtEndPName"},257:{n:"BrtBeginPNPairs"},258:{n:"BrtEndPNPairs"},259:{n:"BrtBeginPNPair"},260:{n:"BrtEndPNPair"},261:{n:"BrtBeginECWebProps"},262:{n:"BrtEndECWebProps"},263:{n:"BrtBeginEcWpTables"},264:{n:"BrtEndECWPTables"},265:{n:"BrtBeginECParams"},266:{n:"BrtEndECParams"},267:{n:"BrtBeginECParam"},268:{n:"BrtEndECParam"},269:{n:"BrtBeginPCDKPIs"},270:{n:"BrtEndPCDKPIs"},271:{n:"BrtBeginPCDKPI"},272:{n:"BrtEndPCDKPI"},273:{n:"BrtBeginDims"},274:{n:"BrtEndDims"},275:{n:"BrtBeginDim"},276:{n:"BrtEndDim"},277:{n:"BrtIndexPartEnd"},278:{n:"BrtBeginStyleSheet"},279:{n:"BrtEndStyleSheet"},280:{n:"BrtBeginSXView"},281:{n:"BrtEndSXVI"},282:{n:"BrtBeginSXVI"},283:{n:"BrtBeginSXVIs"},284:{n:"BrtEndSXVIs"},285:{n:"BrtBeginSXVD"},286:{n:"BrtEndSXVD"},287:{n:"BrtBeginSXVDs"},288:{n:"BrtEndSXVDs"},289:{n:"BrtBeginSXPI"},290:{n:"BrtEndSXPI"},291:{n:"BrtBeginSXPIs"},292:{n:"BrtEndSXPIs"},293:{n:"BrtBeginSXDI"},294:{n:"BrtEndSXDI"},295:{n:"BrtBeginSXDIs"},296:{n:"BrtEndSXDIs"},297:{n:"BrtBeginSXLI"},298:{n:"BrtEndSXLI"},299:{n:"BrtBeginSXLIRws"},300:{n:"BrtEndSXLIRws"},301:{n:"BrtBeginSXLICols"},302:{n:"BrtEndSXLICols"},303:{n:"BrtBeginSXFormat"},304:{n:"BrtEndSXFormat"},305:{n:"BrtBeginSXFormats"},306:{n:"BrtEndSxFormats"},307:{n:"BrtBeginSxSelect"},308:{n:"BrtEndSxSelect"},309:{n:"BrtBeginISXVDRws"},310:{n:"BrtEndISXVDRws"},311:{n:"BrtBeginISXVDCols"},312:{n:"BrtEndISXVDCols"},313:{n:"BrtEndSXLocation"},314:{n:"BrtBeginSXLocation"},315:{n:"BrtEndSXView"},316:{n:"BrtBeginSXTHs"},317:{n:"BrtEndSXTHs"},318:{n:"BrtBeginSXTH"},319:{n:"BrtEndSXTH"},320:{n:"BrtBeginISXTHRws"},321:{n:"BrtEndISXTHRws"},322:{n:"BrtBeginISXTHCols"},323:{n:"BrtEndISXTHCols"},324:{n:"BrtBeginSXTDMPS"},325:{n:"BrtEndSXTDMPs"},326:{n:"BrtBeginSXTDMP"},327:{n:"BrtEndSXTDMP"},328:{n:"BrtBeginSXTHItems"},329:{n:"BrtEndSXTHItems"},330:{n:"BrtBeginSXTHItem"},331:{n:"BrtEndSXTHItem"},332:{n:"BrtBeginMetadata"},333:{n:"BrtEndMetadata"},334:{n:"BrtBeginEsmdtinfo"},335:{n:"BrtMdtinfo"},336:{n:"BrtEndEsmdtinfo"},337:{n:"BrtBeginEsmdb"},338:{n:"BrtEndEsmdb"},339:{n:"BrtBeginEsfmd"},340:{n:"BrtEndEsfmd"},341:{n:"BrtBeginSingleCells"},342:{n:"BrtEndSingleCells"},343:{n:"BrtBeginList"},344:{n:"BrtEndList"},345:{n:"BrtBeginListCols"},346:{n:"BrtEndListCols"},347:{n:"BrtBeginListCol"},348:{n:"BrtEndListCol"},349:{n:"BrtBeginListXmlCPr"},350:{n:"BrtEndListXmlCPr"},351:{n:"BrtListCCFmla"},352:{n:"BrtListTrFmla"},353:{n:"BrtBeginExternals"},354:{n:"BrtEndExternals"},355:{n:"BrtSupBookSrc",f:Xt},357:{n:"BrtSupSelf"},358:{n:"BrtSupSame"},359:{n:"BrtSupTabs"},360:{n:"BrtBeginSupBook"},361:{n:"BrtPlaceholderName"},362:{n:"BrtExternSheet",f:ys},363:{n:"BrtExternTableStart"},364:{n:"BrtExternTableEnd"},366:{n:"BrtExternRowHdr"},367:{n:"BrtExternCellBlank"},368:{n:"BrtExternCellReal"},369:{n:"BrtExternCellBool"},370:{n:"BrtExternCellError"},371:{n:"BrtExternCellString"},372:{n:"BrtBeginEsmdx"},373:{n:"BrtEndEsmdx"},374:{n:"BrtBeginMdxSet"},375:{n:"BrtEndMdxSet"},376:{n:"BrtBeginMdxMbrProp"},377:{n:"BrtEndMdxMbrProp"},378:{n:"BrtBeginMdxKPI"},379:{n:"BrtEndMdxKPI"},380:{n:"BrtBeginEsstr"},381:{n:"BrtEndEsstr"},382:{n:"BrtBeginPRFItem"},383:{n:"BrtEndPRFItem"},384:{n:"BrtBeginPivotCacheIDs"},385:{n:"BrtEndPivotCacheIDs"},386:{n:"BrtBeginPivotCacheID"},387:{n:"BrtEndPivotCacheID"},388:{n:"BrtBeginISXVIs"},389:{n:"BrtEndISXVIs"},390:{n:"BrtBeginColInfos"},391:{n:"BrtEndColInfos"},392:{n:"BrtBeginRwBrk"},393:{n:"BrtEndRwBrk"},394:{n:"BrtBeginColBrk"},395:{n:"BrtEndColBrk"},396:{n:"BrtBrk"},397:{n:"BrtUserBookView"},398:{n:"BrtInfo"},399:{n:"BrtCUsr"},400:{n:"BrtUsr"},401:{n:"BrtBeginUsers"},403:{n:"BrtEOF"},404:{n:"BrtUCR"},405:{n:"BrtRRInsDel"},406:{n:"BrtRREndInsDel"},407:{n:"BrtRRMove"},408:{n:"BrtRREndMove"},409:{n:"BrtRRChgCell"},410:{n:"BrtRREndChgCell"},411:{n:"BrtRRHeader"},412:{n:"BrtRRUserView"},413:{n:"BrtRRRenSheet"},414:{n:"BrtRRInsertSh"},415:{n:"BrtRRDefName"},416:{n:"BrtRRNote"},417:{n:"BrtRRConflict"},418:{n:"BrtRRTQSIF"},419:{n:"BrtRRFormat"},420:{n:"BrtRREndFormat"},421:{n:"BrtRRAutoFmt"},422:{n:"BrtBeginUserShViews"},423:{n:"BrtBeginUserShView"},424:{n:"BrtEndUserShView"},425:{n:"BrtEndUserShViews"},426:{n:"BrtArrFmla",f:Gd},427:{n:"BrtShrFmla",f:jd},428:{n:"BrtTable"},429:{n:"BrtBeginExtConnections"},430:{n:"BrtEndExtConnections"},431:{n:"BrtBeginPCDCalcMems"},432:{n:"BrtEndPCDCalcMems"},433:{n:"BrtBeginPCDCalcMem"},434:{n:"BrtEndPCDCalcMem"},435:{n:"BrtBeginPCDHGLevels"},436:{n:"BrtEndPCDHGLevels"},437:{n:"BrtBeginPCDHGLevel"},438:{n:"BrtEndPCDHGLevel"},439:{n:"BrtBeginPCDHGLGroups"},440:{n:"BrtEndPCDHGLGroups"},441:{n:"BrtBeginPCDHGLGroup"},442:{n:"BrtEndPCDHGLGroup"},443:{n:"BrtBeginPCDHGLGMembers"},444:{n:"BrtEndPCDHGLGMembers"},445:{n:"BrtBeginPCDHGLGMember"},446:{n:"BrtEndPCDHGLGMember"},447:{n:"BrtBeginQSI"},448:{n:"BrtEndQSI"},449:{n:"BrtBeginQSIR"},450:{n:"BrtEndQSIR"},451:{n:"BrtBeginDeletedNames"},452:{n:"BrtEndDeletedNames"},453:{n:"BrtBeginDeletedName"},454:{n:"BrtEndDeletedName"},455:{n:"BrtBeginQSIFs"},456:{n:"BrtEndQSIFs"},457:{n:"BrtBeginQSIF"},458:{n:"BrtEndQSIF"},459:{n:"BrtBeginAutoSortScope"},460:{n:"BrtEndAutoSortScope"},461:{n:"BrtBeginConditionalFormatting"},462:{n:"BrtEndConditionalFormatting"},463:{n:"BrtBeginCFRule"},464:{n:"BrtEndCFRule"},465:{n:"BrtBeginIconSet"},466:{n:"BrtEndIconSet"},467:{n:"BrtBeginDatabar"},468:{n:"BrtEndDatabar"},469:{n:"BrtBeginColorScale"},470:{n:"BrtEndColorScale"},471:{n:"BrtCFVO"},472:{n:"BrtExternValueMeta"},473:{n:"BrtBeginColorPalette"},474:{n:"BrtEndColorPalette"},475:{n:"BrtIndexedColor"},476:{n:"BrtMargins",f:Yd},477:{n:"BrtPrintOptions"},478:{n:"BrtPageSetup"},479:{n:"BrtBeginHeaderFooter"},480:{n:"BrtEndHeaderFooter"},481:{n:"BrtBeginSXCrtFormat"},482:{n:"BrtEndSXCrtFormat"},483:{n:"BrtBeginSXCrtFormats"},484:{n:"BrtEndSXCrtFormats"},485:{n:"BrtWsFmtInfo",f:nd},486:{n:"BrtBeginMgs"},487:{n:"BrtEndMGs"},488:{n:"BrtBeginMGMaps"},489:{n:"BrtEndMGMaps"},490:{n:"BrtBeginMG"},491:{n:"BrtEndMG"},492:{n:"BrtBeginMap"},493:{n:"BrtEndMap"},494:{n:"BrtHLink",f:Wd},495:{n:"BrtBeginDCon"},496:{n:"BrtEndDCon"},497:{n:"BrtBeginDRefs"},498:{n:"BrtEndDRefs"},499:{n:"BrtDRef"},500:{n:"BrtBeginScenMan"},501:{n:"BrtEndScenMan"},502:{n:"BrtBeginSct"},503:{n:"BrtEndSct"},504:{n:"BrtSlc"},505:{n:"BrtBeginDXFs"},506:{n:"BrtEndDXFs"},507:{n:"BrtDXF"},508:{n:"BrtBeginTableStyles"},509:{n:"BrtEndTableStyles"},510:{n:"BrtBeginTableStyle"},511:{n:"BrtEndTableStyle"},512:{n:"BrtTableStyleElement"},513:{n:"BrtTableStyleClient"},514:{n:"BrtBeginVolDeps"},515:{n:"BrtEndVolDeps"},516:{n:"BrtBeginVolType"},517:{n:"BrtEndVolType"},518:{n:"BrtBeginVolMain"},519:{n:"BrtEndVolMain"},520:{n:"BrtBeginVolTopic"},521:{n:"BrtEndVolTopic"},522:{n:"BrtVolSubtopic"},523:{n:"BrtVolRef"},524:{n:"BrtVolNum"},525:{n:"BrtVolErr"},526:{n:"BrtVolStr"},527:{n:"BrtVolBool"},528:{n:"BrtBeginCalcChain$"},529:{n:"BrtEndCalcChain$"},530:{n:"BrtBeginSortState"},531:{n:"BrtEndSortState"},532:{n:"BrtBeginSortCond"},533:{n:"BrtEndSortCond"},534:{n:"BrtBookProtection"},535:{n:"BrtSheetProtection"},536:{n:"BrtRangeProtection"},537:{n:"BrtPhoneticInfo"},538:{n:"BrtBeginECTxtWiz"},539:{n:"BrtEndECTxtWiz"},540:{n:"BrtBeginECTWFldInfoLst"},541:{n:"BrtEndECTWFldInfoLst"},542:{n:"BrtBeginECTwFldInfo"},548:{n:"BrtFileSharing"},549:{n:"BrtOleSize"},550:{n:"BrtDrawing",f:Xt},551:{n:"BrtLegacyDrawing"},552:{n:"BrtLegacyDrawingHF"},553:{n:"BrtWebOpt"},554:{n:"BrtBeginWebPubItems"},555:{n:"BrtEndWebPubItems"},556:{n:"BrtBeginWebPubItem"},557:{n:"BrtEndWebPubItem"},558:{n:"BrtBeginSXCondFmt"},559:{n:"BrtEndSXCondFmt"},560:{n:"BrtBeginSXCondFmts"},561:{n:"BrtEndSXCondFmts"},562:{n:"BrtBkHim"},564:{n:"BrtColor"},565:{n:"BrtBeginIndexedColors"},566:{n:"BrtEndIndexedColors"},569:{n:"BrtBeginMRUColors"},570:{n:"BrtEndMRUColors"},572:{n:"BrtMRUColor"},573:{n:"BrtBeginDVals"},574:{n:"BrtEndDVals"},577:{n:"BrtSupNameStart"},578:{n:"BrtSupNameValueStart"},579:{n:"BrtSupNameValueEnd"},580:{n:"BrtSupNameNum"},581:{n:"BrtSupNameErr"},582:{n:"BrtSupNameSt"},583:{n:"BrtSupNameNil"},584:{n:"BrtSupNameBool"},585:{n:"BrtSupNameFmla"},586:{n:"BrtSupNameBits"},587:{n:"BrtSupNameEnd"},588:{n:"BrtEndSupBook"},589:{n:"BrtCellSmartTagProperty"},590:{n:"BrtBeginCellSmartTag"},591:{n:"BrtEndCellSmartTag"},592:{n:"BrtBeginCellSmartTags"},593:{n:"BrtEndCellSmartTags"},594:{n:"BrtBeginSmartTags"},595:{n:"BrtEndSmartTags"},596:{n:"BrtSmartTagType"},597:{n:"BrtBeginSmartTagTypes"},598:{n:"BrtEndSmartTagTypes"},599:{n:"BrtBeginSXFilters"},600:{n:"BrtEndSXFilters"},601:{n:"BrtBeginSXFILTER"},602:{n:"BrtEndSXFilter"},603:{n:"BrtBeginFills"},604:{n:"BrtEndFills"},605:{n:"BrtBeginCellWatches"},606:{n:"BrtEndCellWatches"},607:{n:"BrtCellWatch"},608:{n:"BrtBeginCRErrs"},609:{n:"BrtEndCRErrs"},610:{n:"BrtCrashRecErr"},611:{n:"BrtBeginFonts"},612:{n:"BrtEndFonts"},613:{n:"BrtBeginBorders"},614:{n:"BrtEndBorders"},615:{n:"BrtBeginFmts"},616:{n:"BrtEndFmts"},617:{n:"BrtBeginCellXFs"},618:{n:"BrtEndCellXFs"},619:{n:"BrtBeginStyles"},620:{n:"BrtEndStyles"},625:{n:"BrtBigName"},626:{n:"BrtBeginCellStyleXFs"},627:{n:"BrtEndCellStyleXFs"},628:{n:"BrtBeginComments"},629:{n:"BrtEndComments"},630:{n:"BrtBeginCommentAuthors"},631:{n:"BrtEndCommentAuthors"},632:{n:"BrtCommentAuthor",f:$o},633:{n:"BrtBeginCommentList"},634:{n:"BrtEndCommentList"},635:{n:"BrtBeginComment",f:jo},636:{n:"BrtEndComment"},637:{n:"BrtCommentText",f:Ot},638:{n:"BrtBeginOleObjects"},639:{n:"BrtOleObject"},640:{n:"BrtEndOleObjects"},641:{n:"BrtBeginSxrules"},642:{n:"BrtEndSxRules"},643:{n:"BrtBeginActiveXControls"},644:{n:"BrtActiveX"},645:{n:"BrtEndActiveXControls"},646:{n:"BrtBeginPCDSDTCEMembersSortBy"},648:{n:"BrtBeginCellIgnoreECs"},649:{n:"BrtCellIgnoreEC"},650:{n:"BrtEndCellIgnoreECs"},651:{n:"BrtCsProp",f:Ev},652:{n:"BrtCsPageSetup"},653:{n:"BrtBeginUserCsViews"},654:{n:"BrtEndUserCsViews"},655:{n:"BrtBeginUserCsView"},656:{n:"BrtEndUserCsView"},657:{n:"BrtBeginPcdSFCIEntries"},658:{n:"BrtEndPCDSFCIEntries"},659:{n:"BrtPCDSFCIEntry"},660:{n:"BrtBeginListParts"},661:{n:"BrtListPart"},662:{n:"BrtEndListParts"},663:{n:"BrtSheetCalcProp"},664:{n:"BrtBeginFnGroup"},665:{n:"BrtFnGroup"},666:{n:"BrtEndFnGroup"},667:{n:"BrtSupAddin"},668:{n:"BrtSXTDMPOrder"},669:{n:"BrtCsProtection"},671:{n:"BrtBeginWsSortMap"},672:{n:"BrtEndWsSortMap"},673:{n:"BrtBeginRRSort"},674:{n:"BrtEndRRSort"},675:{n:"BrtRRSortItem"},676:{n:"BrtFileSharingIso"},677:{n:"BrtBookProtectionIso"},678:{n:"BrtSheetProtectionIso"},679:{n:"BrtCsProtectionIso"},680:{n:"BrtRangeProtectionIso"},681:{n:"BrtDValList"},1024:{n:"BrtRwDescent"},1025:{n:"BrtKnownFonts"},1026:{n:"BrtBeginSXTupleSet"},1027:{n:"BrtEndSXTupleSet"},1028:{n:"BrtBeginSXTupleSetHeader"},1029:{n:"BrtEndSXTupleSetHeader"},1030:{n:"BrtSXTupleSetHeaderItem"},1031:{n:"BrtBeginSXTupleSetData"},1032:{n:"BrtEndSXTupleSetData"},1033:{n:"BrtBeginSXTupleSetRow"},1034:{n:"BrtEndSXTupleSetRow"},1035:{n:"BrtSXTupleSetRowItem"},1036:{n:"BrtNameExt"},1037:{n:"BrtPCDH14"},1038:{n:"BrtBeginPCDCalcMem14"},1039:{n:"BrtEndPCDCalcMem14"},1040:{n:"BrtSXTH14"},1041:{n:"BrtBeginSparklineGroup"},1042:{n:"BrtEndSparklineGroup"},1043:{n:"BrtSparkline"},1044:{n:"BrtSXDI14"},1045:{n:"BrtWsFmtInfoEx14"},1046:{n:"BrtBeginConditionalFormatting14"},1047:{n:"BrtEndConditionalFormatting14"},1048:{n:"BrtBeginCFRule14"},1049:{n:"BrtEndCFRule14"},1050:{n:"BrtCFVO14"},1051:{n:"BrtBeginDatabar14"},1052:{n:"BrtBeginIconSet14"},1053:{n:"BrtDVal14",f:tv},1054:{n:"BrtBeginDVals14"},1055:{n:"BrtColor14"},1056:{n:"BrtBeginSparklines"},1057:{n:"BrtEndSparklines"},1058:{n:"BrtBeginSparklineGroups"},1059:{n:"BrtEndSparklineGroups"},1061:{n:"BrtSXVD14"},1062:{n:"BrtBeginSXView14"},1063:{n:"BrtEndSXView14"},1064:{n:"BrtBeginSXView16"},1065:{n:"BrtEndSXView16"},1066:{n:"BrtBeginPCD14"},1067:{n:"BrtEndPCD14"},1068:{n:"BrtBeginExtConn14"},1069:{n:"BrtEndExtConn14"},1070:{n:"BrtBeginSlicerCacheIDs"},1071:{n:"BrtEndSlicerCacheIDs"},1072:{n:"BrtBeginSlicerCacheID"},1073:{n:"BrtEndSlicerCacheID"},1075:{n:"BrtBeginSlicerCache"},1076:{n:"BrtEndSlicerCache"},1077:{n:"BrtBeginSlicerCacheDef"},1078:{n:"BrtEndSlicerCacheDef"},1079:{n:"BrtBeginSlicersEx"},1080:{n:"BrtEndSlicersEx"},1081:{n:"BrtBeginSlicerEx"},1082:{n:"BrtEndSlicerEx"},1083:{n:"BrtBeginSlicer"},1084:{n:"BrtEndSlicer"},1085:{n:"BrtSlicerCachePivotTables"},1086:{n:"BrtBeginSlicerCacheOlapImpl"},1087:{n:"BrtEndSlicerCacheOlapImpl"},1088:{n:"BrtBeginSlicerCacheLevelsData"},1089:{n:"BrtEndSlicerCacheLevelsData"},1090:{n:"BrtBeginSlicerCacheLevelData"},1091:{n:"BrtEndSlicerCacheLevelData"},1092:{n:"BrtBeginSlicerCacheSiRanges"},1093:{n:"BrtEndSlicerCacheSiRanges"},1094:{n:"BrtBeginSlicerCacheSiRange"},1095:{n:"BrtEndSlicerCacheSiRange"},1096:{n:"BrtSlicerCacheOlapItem"},1097:{n:"BrtBeginSlicerCacheSelections"},1098:{n:"BrtSlicerCacheSelection"},1099:{n:"BrtEndSlicerCacheSelections"},1100:{n:"BrtBeginSlicerCacheNative"},1101:{n:"BrtEndSlicerCacheNative"},1102:{n:"BrtSlicerCacheNativeItem"},1103:{n:"BrtRangeProtection14"},1104:{n:"BrtRangeProtectionIso14"},1105:{n:"BrtCellIgnoreEC14"},1111:{n:"BrtList14"},1112:{n:"BrtCFIcon"},1113:{n:"BrtBeginSlicerCachesPivotCacheIDs"},1114:{n:"BrtEndSlicerCachesPivotCacheIDs"},1115:{n:"BrtBeginSlicers"},1116:{n:"BrtEndSlicers"},1117:{n:"BrtWbProp14"},1118:{n:"BrtBeginSXEdit"},1119:{n:"BrtEndSXEdit"},1120:{n:"BrtBeginSXEdits"},1121:{n:"BrtEndSXEdits"},1122:{n:"BrtBeginSXChange"},1123:{n:"BrtEndSXChange"},1124:{n:"BrtBeginSXChanges"},1125:{n:"BrtEndSXChanges"},1126:{n:"BrtSXTupleItems"},1128:{n:"BrtBeginSlicerStyle"},1129:{n:"BrtEndSlicerStyle"},1130:{n:"BrtSlicerStyleElement"},1131:{n:"BrtBeginStyleSheetExt14"},1132:{n:"BrtEndStyleSheetExt14"},1133:{n:"BrtBeginSlicerCachesPivotCacheID"},1134:{n:"BrtEndSlicerCachesPivotCacheID"},1135:{n:"BrtBeginConditionalFormattings"},1136:{n:"BrtEndConditionalFormattings"},1137:{n:"BrtBeginPCDCalcMemExt"},1138:{n:"BrtEndPCDCalcMemExt"},1139:{n:"BrtBeginPCDCalcMemsExt"},1140:{n:"BrtEndPCDCalcMemsExt"},1141:{n:"BrtPCDField14"},1142:{n:"BrtBeginSlicerStyles"},1143:{n:"BrtEndSlicerStyles"},1144:{n:"BrtBeginSlicerStyleElements"},1145:{n:"BrtEndSlicerStyleElements"},1146:{n:"BrtCFRuleExt"},1147:{n:"BrtBeginSXCondFmt14"},1148:{n:"BrtEndSXCondFmt14"},1149:{n:"BrtBeginSXCondFmts14"},1150:{n:"BrtEndSXCondFmts14"},1152:{n:"BrtBeginSortCond14"},1153:{n:"BrtEndSortCond14"},1154:{n:"BrtEndDVals14"},1155:{n:"BrtEndIconSet14"},1156:{n:"BrtEndDatabar14"},1157:{n:"BrtBeginColorScale14"},1158:{n:"BrtEndColorScale14"},1159:{n:"BrtBeginSxrules14"},1160:{n:"BrtEndSxrules14"},1161:{n:"BrtBeginPRule14"},1162:{n:"BrtEndPRule14"},1163:{n:"BrtBeginPRFilters14"},1164:{n:"BrtEndPRFilters14"},1165:{n:"BrtBeginPRFilter14"},1166:{n:"BrtEndPRFilter14"},1167:{n:"BrtBeginPRFItem14"},1168:{n:"BrtEndPRFItem14"},1169:{n:"BrtBeginCellIgnoreECs14"},1170:{n:"BrtEndCellIgnoreECs14"},1171:{n:"BrtDxf14"},1172:{n:"BrtBeginDxF14s"},1173:{n:"BrtEndDxf14s"},1177:{n:"BrtFilter14"},1178:{n:"BrtBeginCustomFilters14"},1180:{n:"BrtCustomFilter14"},1181:{n:"BrtIconFilter14"},1182:{n:"BrtPivotCacheConnectionName"},2048:{n:"BrtBeginDecoupledPivotCacheIDs"},2049:{n:"BrtEndDecoupledPivotCacheIDs"},2050:{n:"BrtDecoupledPivotCacheID"},2051:{n:"BrtBeginPivotTableRefs"},2052:{n:"BrtEndPivotTableRefs"},2053:{n:"BrtPivotTableRef"},2054:{n:"BrtSlicerCacheBookPivotTables"},2055:{n:"BrtBeginSxvcells"},2056:{n:"BrtEndSxvcells"},2057:{n:"BrtBeginSxRow"},2058:{n:"BrtEndSxRow"},2060:{n:"BrtPcdCalcMem15"},2067:{n:"BrtQsi15"},2068:{n:"BrtBeginWebExtensions"},2069:{n:"BrtEndWebExtensions"},2070:{n:"BrtWebExtension"},2071:{n:"BrtAbsPath15"},2072:{n:"BrtBeginPivotTableUISettings"},2073:{n:"BrtEndPivotTableUISettings"},2075:{n:"BrtTableSlicerCacheIDs"},2076:{n:"BrtTableSlicerCacheID"},2077:{n:"BrtBeginTableSlicerCache"},2078:{n:"BrtEndTableSlicerCache"},2079:{n:"BrtSxFilter15"},2080:{n:"BrtBeginTimelineCachePivotCacheIDs"},2081:{n:"BrtEndTimelineCachePivotCacheIDs"},2082:{n:"BrtTimelineCachePivotCacheID"},2083:{n:"BrtBeginTimelineCacheIDs"},2084:{n:"BrtEndTimelineCacheIDs"},2085:{n:"BrtBeginTimelineCacheID"},2086:{n:"BrtEndTimelineCacheID"},2087:{n:"BrtBeginTimelinesEx"},2088:{n:"BrtEndTimelinesEx"},2089:{n:"BrtBeginTimelineEx"},2090:{n:"BrtEndTimelineEx"},2091:{n:"BrtWorkBookPr15"},2092:{n:"BrtPCDH15"},2093:{n:"BrtBeginTimelineStyle"},2094:{n:"BrtEndTimelineStyle"},2095:{n:"BrtTimelineStyleElement"},2096:{n:"BrtBeginTimelineStylesheetExt15"},2097:{n:"BrtEndTimelineStylesheetExt15"},2098:{n:"BrtBeginTimelineStyles"},2099:{n:"BrtEndTimelineStyles"},2100:{n:"BrtBeginTimelineStyleElements"},2101:{n:"BrtEndTimelineStyleElements"},2102:{n:"BrtDxf15"},2103:{n:"BrtBeginDxfs15"},2104:{n:"brtEndDxfs15"},2105:{n:"BrtSlicerCacheHideItemsWithNoData"},2106:{n:"BrtBeginItemUniqueNames"},2107:{n:"BrtEndItemUniqueNames"},2108:{n:"BrtItemUniqueName"},2109:{n:"BrtBeginExtConn15"},2110:{n:"BrtEndExtConn15"},2111:{n:"BrtBeginOledbPr15"},2112:{n:"BrtEndOledbPr15"},2113:{n:"BrtBeginDataFeedPr15"},2114:{n:"BrtEndDataFeedPr15"},2115:{n:"BrtTextPr15"},2116:{n:"BrtRangePr15"},2117:{n:"BrtDbCommand15"},2118:{n:"BrtBeginDbTables15"},2119:{n:"BrtEndDbTables15"},2120:{n:"BrtDbTable15"},2121:{n:"BrtBeginDataModel"},2122:{n:"BrtEndDataModel"},2123:{n:"BrtBeginModelTables"},2124:{n:"BrtEndModelTables"},2125:{n:"BrtModelTable"},2126:{n:"BrtBeginModelRelationships"},2127:{n:"BrtEndModelRelationships"},2128:{n:"BrtModelRelationship"},2129:{n:"BrtBeginECTxtWiz15"},2130:{n:"BrtEndECTxtWiz15"},2131:{n:"BrtBeginECTWFldInfoLst15"},2132:{n:"BrtEndECTWFldInfoLst15"},2133:{n:"BrtBeginECTWFldInfo15"},2134:{n:"BrtFieldListActiveItem"},2135:{n:"BrtPivotCacheIdVersion"},2136:{n:"BrtSXDI15"},2137:{n:"BrtBeginModelTimeGroupings"},2138:{n:"BrtEndModelTimeGroupings"},2139:{n:"BrtBeginModelTimeGrouping"},2140:{n:"BrtEndModelTimeGrouping"},2141:{n:"BrtModelTimeGroupingCalcCol"},3072:{n:"BrtUid"},3073:{n:"BrtRevisionPtr"},5095:{n:"BrtBeginCalcFeatures"},5096:{n:"BrtEndCalcFeatures"},5097:{n:"BrtCalcFeature"},65535:{n:""}};var qp=Y(Qp,"n");qp["BrtFRTArchID$"]=16;var em={6:{n:"Formula",f:Yu},10:{n:"EOF",f:Vn},12:{n:"CalcCount",f:$n},13:{n:"CalcMode",f:$n},14:{n:"CalcPrecision",f:jn},15:{n:"CalcRefMode",f:jn},16:{n:"CalcDelta",f:Qt},17:{n:"CalcIter",f:jn},18:{n:"Protect",f:jn},19:{n:"Password",f:$n},20:{n:"Header",f:Ss},21:{n:"Footer",f:Ss},23:{n:"ExternSheet",f:ys},24:{n:"Lbl",f:Ts},25:{n:"WinProtect",f:jn},26:{n:"VerticalPageBreaks"},27:{n:"HorizontalPageBreaks"},28:{n:"Note",f:Ds},29:{n:"Selection"},34:{n:"Date1904",f:jn},35:{n:"ExternName",f:Cs},38:{n:"LeftMargin",f:Qt},39:{n:"RightMargin",f:Qt},40:{n:"TopMargin",f:Qt},41:{n:"BottomMargin",f:Qt},42:{n:"PrintRowCol",f:jn},43:{n:"PrintGrid",f:jn},47:{n:"FilePass",f:fl},49:{n:"Font",f:qi},51:{n:"PrintSize",f:$n},60:{n:"Continue"},61:{n:"Window1",f:$i},64:{n:"Backup",f:jn},65:{n:"Pane",f:Qi},66:{n:"CodePage",f:$n},77:{n:"Pls"},80:{n:"DCon"},81:{n:"DConRef"},82:{n:"DConName"},85:{n:"DefColWidth",f:$n},89:{n:"XCT"},90:{n:"CRN"},91:{n:"FileSharing"},92:{n:"WriteAccess",f:Ni},93:{n:"Obj",f:Ls},94:{n:"Uncalced"},95:{n:"CalcSaveRecalc",f:jn},96:{n:"Template"},97:{n:"Intl"},99:{n:"ObjProtect",f:jn},125:{n:"ColInfo",f:Zs},128:{n:"Guts",f:ms},129:{n:"WsBool",f:Mi},130:{n:"GridSet",f:$n},131:{n:"HCenter",f:jn},132:{n:"VCenter",f:jn},133:{n:"BoundSheet8",f:Ui},134:{n:"WriteProtect"},140:{n:"Country",f:Gs},141:{n:"HideObj",f:$n},144:{n:"Sort"},146:{n:"Palette",f:$s},151:{n:"Sync"},152:{n:"LPr"},153:{n:"DxGCol"},154:{n:"FnGroupName"},155:{n:"FilterMode"},156:{n:"BuiltInFnGroupCount",f:$n},157:{n:"AutoFilterInfo"},158:{n:"AutoFilter"},160:{n:"Scl",f:tf},161:{n:"Setup",f:Qs},174:{n:"ScenMan"},175:{n:"SCENARIO"},176:{n:"SxView"},177:{n:"Sxvd"},178:{n:"SXVI"},180:{n:"SxIvd"},181:{n:"SXLI"},182:{n:"SXPI"},184:{n:"DocRoute"},185:{n:"RecipName"},189:{n:"MulRk",f:us},190:{n:"MulBlank",f:hs},193:{n:"Mms",f:Vn},197:{n:"SXDI"},198:{n:"SXDB"},199:{n:"SXFDB"},200:{n:"SXDBB"},201:{n:"SXNum"},202:{n:"SxBool",f:jn},203:{n:"SxErr"},204:{n:"SXInt"},205:{n:"SXString"},206:{n:"SXDtr"},207:{n:"SxNil"},208:{n:"SXTbl"},209:{n:"SXTBRGIITM"},210:{n:"SxTbpg"},211:{n:"ObProj"},213:{n:"SXStreamID"},215:{n:"DBCell"},216:{n:"SXRng"},217:{n:"SxIsxoper"},218:{n:"BookBool",f:$n},220:{n:"DbOrParamQry"},221:{n:"ScenarioProtect",f:jn},222:{n:"OleObjectSize"},224:{n:"XF",f:vs},225:{n:"InterfaceHdr",f:Pi},226:{n:"InterfaceEnd",f:Vn},227:{n:"SXVS"},229:{n:"MergeCells",f:Ps},233:{n:"BkHim"},235:{n:"MsoDrawingGroup"},236:{n:"MsoDrawing"},237:{n:"MsoDrawingSelection"},239:{n:"PhoneticInfo"},240:{n:"SxRule"},241:{n:"SXEx"},242:{n:"SxFilt"},244:{n:"SxDXF"},245:{n:"SxItm"},246:{n:"SxName"},247:{n:"SxSelect"},248:{n:"SXPair"},249:{n:"SxFmla"},251:{n:"SxFormat"},252:{n:"SST",f:Hi},253:{n:"LabelSst",f:rs},255:{n:"ExtSST",f:Vi},256:{n:"SXVDEx"},259:{n:"SXFormula"},290:{n:"SXDBEx"},311:{n:"RRDInsDel"},312:{n:"RRDHead"},315:{n:"RRDChgCell"},317:{n:"RRTabId",f:Zn},318:{n:"RRDRenSheet"},319:{n:"RRSort"},320:{n:"RRDMove"},330:{n:"RRFormat"},331:{n:"RRAutoFmt"},333:{n:"RRInsertSh"},334:{n:"RRDMoveBegin"},335:{n:"RRDMoveEnd"},336:{n:"RRDInsDelBegin"},337:{n:"RRDInsDelEnd"},338:{n:"RRDConflict"},339:{n:"RRDDefName"},340:{n:"RRDRstEtxp"},351:{n:"LRng"},352:{n:"UsesELFs",f:jn},353:{n:"DSF",f:Vn},401:{n:"CUsr"},402:{n:"CbUsr"},403:{n:"UsrInfo"},404:{n:"UsrExcl"},405:{n:"FileLock"},406:{n:"RRDInfo"},407:{n:"BCUsrs"},408:{n:"UsrChk"},425:{n:"UserBView"},426:{n:"UserSViewBegin"},427:{n:"UserSViewEnd"},428:{n:"RRDUserView"},429:{n:"Qsi"},430:{n:"SupBook",f:_s},431:{n:"Prot4Rev",f:jn},432:{n:"CondFmt"},433:{n:"CF"},434:{n:"DVal"},437:{n:"DConBin"},438:{n:"TxO",f:zs},439:{n:"RefreshAll",f:jn},440:{n:"HLink",f:Hs},441:{n:"Lel"},442:{n:"CodeName",f:ai},443:{n:"SXFDBType"},444:{n:"Prot4RevPass",f:$n},445:{n:"ObNoMacros"},446:{n:"Dv"},448:{n:"Excel9File",f:Vn},449:{n:"RecalcId",f:ji,r:2},450:{n:"EntExU2",f:Vn},512:{n:"Dimensions",f:ls},513:{n:"Blank",f:rf},515:{n:"Number",f:ks},516:{n:"Label",f:as},517:{n:"BoolErr",f:gs},519:{n:"String",f:af},520:{n:"Row",f:Xi},523:{n:"Index"},545:{n:"Array",f:Rs},549:{n:"DefaultRowHeight",f:Ki},566:{n:"Table"},574:{n:"Window2",f:Zi},638:{n:"RK",f:cs},659:{n:"Style"},1048:{n:"BigName"},1054:{n:"Format",f:is},1084:{n:"ContinueBigName"},1212:{n:"ShrFmla",f:Is},2048:{n:"HLinkTooltip",f:Vs},2049:{n:"WebPub"},2050:{n:"QsiSXTag"},2051:{n:"DBQueryExt"},2052:{n:"ExtString"},2053:{n:"TxtQry"},2054:{n:"Qsir"},2055:{n:"Qsif"},2056:{n:"RRDTQSIF"},2057:{n:"BOF",f:Oi},2058:{n:"OleDbConn"},2059:{n:"WOpt"},2060:{n:"SXViewEx"},2061:{n:"SXTH"},2062:{n:"SXPIEx"},2063:{n:"SXVDTEx"},2064:{n:"SXViewEx9"},2066:{n:"ContinueFrt"},2067:{n:"RealTimeData"},2128:{n:"ChartFrtInfo"},2129:{n:"FrtWrapper"},2130:{n:"StartBlock"},2131:{n:"EndBlock"},2132:{n:"StartObject"},2133:{n:"EndObject"},2134:{n:"CatLab"},2135:{n:"YMult"},2136:{n:"SXViewLink"},2137:{n:"PivotChartBits"},2138:{n:"FrtFontList"},2146:{n:"SheetExt"},2147:{n:"BookExt",r:12},2148:{n:"SXAddl"},2149:{n:"CrErr"},2150:{n:"HFPicture"},2151:{n:"FeatHdr",f:Vn},2152:{n:"Feat"},2154:{n:"DataLabExt"},2155:{n:"DataLabExtContents"},2156:{n:"CellWatch"},2161:{n:"FeatHdr11"},2162:{n:"Feature11"},2164:{n:"DropDownObjIds"},2165:{n:"ContinueFrt11"},2166:{n:"DConn"},2167:{n:"List12"},2168:{n:"Feature12"},2169:{n:"CondFmt12"},2170:{n:"CF12"},2171:{n:"CFEx"},2172:{n:"XFCRC",f:Ys,r:12},2173:{n:"XFExt",f:Fo,r:12},2174:{n:"AutoFilter12"},2175:{n:"ContinueFrt12"},2180:{n:"MDTInfo"},2181:{n:"MDXStr"},2182:{n:"MDXTuple"},2183:{n:"MDXSet"},2184:{n:"MDXProp"},2185:{n:"MDXKPI"},2186:{n:"MDB"},2187:{n:"PLV"},2188:{n:"Compat12",f:jn,r:12},2189:{n:"DXF"},2190:{n:"TableStyles",r:12},2191:{n:"TableStyle"},2192:{n:"TableStyleElement"},2194:{n:"StyleExt"},2195:{n:"NamePublish"},2196:{n:"NameCmt",f:As,r:12},2197:{n:"SortData"},2198:{n:"Theme",f:To,r:12},2199:{n:"GUIDTypeLib"},2200:{n:"FnGrp12"},2201:{n:"NameFnGrp12"},2202:{n:"MTRSettings",f:Fs,r:12},2203:{n:"CompressPictures",f:Vn},2204:{n:"HeaderFooter"},2205:{n:"CrtLayout12"},2206:{n:"CrtMlFrt"},2207:{n:"CrtMlFrtContinue"},2211:{n:"ForceFullCalculation",f:Gi},2212:{n:"ShapePropsStream"},2213:{n:"TextPropsStream"},2214:{n:"RichTextStream"},2215:{n:"CrtLayout12A"},4097:{n:"Units"},4098:{n:"Chart"},4099:{n:"Series"},4102:{n:"DataFormat"},4103:{n:"LineFormat"},4105:{n:"MarkerFormat"},4106:{n:"AreaFormat"},4107:{n:"PieFormat"},4108:{n:"AttachedLabel"},4109:{n:"SeriesText"},4116:{n:"ChartFormat"},4117:{n:"Legend"},4118:{n:"SeriesList"},4119:{n:"Bar"},4120:{n:"Line"},4121:{n:"Pie"},4122:{n:"Area"},4123:{n:"Scatter"},4124:{n:"CrtLine"},4125:{n:"Axis"},4126:{n:"Tick"},4127:{n:"ValueRange"},4128:{n:"CatSerRange"},4129:{n:"AxisLine"},4130:{n:"CrtLink"},4132:{n:"DefaultText"},4133:{n:"Text"},4134:{n:"FontX",f:$n},4135:{n:"ObjectLink"},4146:{n:"Frame"},4147:{n:"Begin"},4148:{n:"End"},4149:{n:"PlotArea"},4154:{n:"Chart3d"},4156:{n:"PicF"},4157:{n:"DropBar"},4158:{n:"Radar"},4159:{n:"Surf"},4160:{n:"RadarArea"},4161:{n:"AxisParent"},4163:{n:"LegendException"},4164:{n:"ShtProps",f:qs},4165:{n:"SerToCrt"},4166:{n:"AxesUsed"},4168:{n:"SBaseRef"},4170:{n:"SerParent"},4171:{n:"SerAuxTrend"},4174:{n:"IFmtRecord"},4175:{n:"Pos"},4176:{n:"AlRuns"},4177:{n:"BRAI"},4187:{n:"SerAuxErrBar"},4188:{n:"ClrtClient",f:Ks},4189:{n:"SerFmt"},4191:{n:"Chart3DBarShape"},4192:{n:"Fbi"},4193:{n:"BopPop"},4194:{n:"AxcExt"},4195:{n:"Dat"},4196:{n:"PlotGrowth"},4197:{n:"SIIndex"},4198:{n:"GelFrame"},4199:{n:"BopPopCustom"},4200:{n:"Fbi2"},0:{n:"Dimensions",f:ls},1:{n:"BIFF2BLANK"},2:{n:"BIFF2INT",f:of},3:{n:"BIFF2NUM",f:ff},4:{n:"BIFF2STR",f:sf},5:{n:"BoolErr",f:gs},7:{n:"String",f:uf},8:{n:"BIFF2ROW"},9:{n:"BOF",f:Oi},11:{n:"Index"},22:{n:"ExternCount",f:$n},30:{n:"BIFF2FORMAT",f:fs},31:{n:"BIFF2FMTCNT"},32:{n:"BIFF2COLINFO"},33:{n:"Array",f:Rs},36:{n:"COLWIDTH"},37:{n:"DefaultRowHeight",f:Ki},50:{n:"BIFF2FONTXTRA",f:hf},62:{n:"BIFF2WINDOW2"},52:{n:"DDEObjName"},67:{n:"BIFF2XF"},68:{n:"BIFF2XFINDEX",f:$n},69:{n:"BIFF2FONTCLR"},86:{n:"BIFF4FMTCNT"},126:{n:"RK"},127:{n:"ImData",f:nf},135:{n:"Addin"},136:{n:"Edg"},137:{n:"Pub"},145:{n:"Sub"},148:{n:"LHRecord"},149:{n:"LHNGraph"},150:{n:"Sound"},169:{n:"CoordList"},171:{n:"GCW"},188:{n:"ShrFmla"},191:{n:"ToolbarHdr"},192:{n:"ToolbarEnd"},194:{n:"AddMenu"},195:{n:"DelMenu"},214:{n:"RString",f:df},223:{n:"UDDesc"},234:{n:"TabIdConf"},354:{n:"XL5Modify"},421:{n:"FileSharing2"},518:{n:"Formula",f:Yu},521:{n:"BOF",f:Oi},536:{n:"Lbl",f:Ts},547:{n:"ExternName",f:Cs},561:{n:"Font"},579:{n:"BIFF3XF"},1030:{n:"Formula",f:Yu},1033:{n:"BOF",f:Oi},1091:{n:"BIFF4XF"},2157:{n:"FeatInfo"},2163:{n:"FeatInfo11"},2177:{n:"SXAddl12"},2240:{n:"AutoWebPub"},2241:{n:"ListObj"},2242:{n:"ListField"},2243:{n:"ListDV"},2244:{n:"ListCondFmt"},2245:{n:"ListCF"},2246:{n:"FMQry"},2247:{n:"FMSQry"},2248:{n:"PLV"},2249:{n:"LnExt"},2250:{n:"MkrExt"},2251:{n:"CrtCoopt"},2262:{n:"FRTArchId$",r:12},29282:{}};var rm=Y(em,"n");function tm(e,r,t,a){var n=typeof r=="number"?r:+r||+rm[r];if(isNaN(n))return;var i=a||(t||[]).length||0;var s=e.next(4);s._W(2,n);s._W(2,i);if(i>0&&Nr(t))e.push(t);}function am(e,r,t,a){var n=a||(t||[]).length||0;if(n<=8224)return tm(e,r,t,n);var i=+r||+rm[r];if(isNaN(i))return;var s=t.parts||[],f=0;var l=0,o=0;while(o+(s[f]||8224)<=8224){o+=s[f]||8224;f++;}var c=e.next(4);c._W(2,i);c._W(2,o);e.push(t.slice(l,l+o));l+=o;while(l<n){c=e.next(4);c._W(2,60);o=0;while(o+(s[f]||8224)<=8224){o+=s[f]||8224;f++;}c._W(2,o);e.push(t.slice(l,l+o));l+=o;}}function nm(e,r,t){if(!e)e=Jr(7);e._W(2,r);e._W(2,t);e._W(2,0);e._W(1,0);return e;}function im(e,r,t,a){var n=Jr(9);nm(n,e,r);Qn(t,a||"b",n);return n;}function sm(e,r,t){var a=Jr(8+2*t.length);nm(a,e,r);a._W(1,t.length);a._W(t.length,t,"sbcs");return a.l<a.length?a.slice(0,a.l):a;}function fm(e,r,t,a){if(r.v!=null)switch(r.t){case"d":;case"n":var n=r.t=="d"?ee(le(r.v)):r.v;if(n==(n|0)&&n>=0&&n<65536)tm(e,2,cf(t,a,n));else tm(e,3,lf(t,a,n));return;case"b":;case"e":tm(e,5,im(t,a,r.v,r.t));return;case"s":;case"str":tm(e,4,sm(t,a,(r.v||"").slice(0,255)));return;}tm(e,1,nm(null,t,a));}function lm(e,r,t,a){var n=Array.isArray(r);var i=kt(r["!ref"]||"A1"),s,f="",l=[];if(i.e.c>255||i.e.r>16383){if(a.WTF)throw new Error("Range "+(r["!ref"]||"A1")+" exceeds format limit A1:IV16384");i.e.c=Math.min(i.e.c,255);i.e.r=Math.min(i.e.c,16383);s=wt(i);}for(var o=i.s.r;o<=i.e.r;++o){f=lt(o);for(var c=i.s.c;c<=i.e.c;++c){if(o===i.s.r)l[c]=ht(c);s=l[c]+f;var u=n?(r[o]||[])[c]:r[s];if(!u)continue;fm(e,u,o,c,a);}}}function om(e,r){var t=r||{};if(m!=null&&t.dense==null)t.dense=m;var a=qr();var n=0;for(var i=0;i<e.SheetNames.length;++i){if(e.SheetNames[i]==t.sheet)n=i;}if(n==0&&!!t.sheet&&e.SheetNames[0]!=t.sheet)throw new Error("Sheet not found: "+t.sheet);tm(a,t.biff==4?1033:t.biff==3?521:9,Di(e,16,t));lm(a,e.Sheets[e.SheetNames[n]],n,t,e);tm(a,10);return a.end();}function cm(e,r,t){tm(e,"Font",es({sz:12,color:{theme:1},name:"Arial",family:2,scheme:"minor"},t));}function um(e,r,t){if(!r)return;[[5,8],[23,26],[41,44],[50,392]].forEach(function(a){for(var n=a[0];n<=a[1];++n){if(r[n]!=null)tm(e,"Format",ss(n,r[n],t));}});}function hm(e,r){var t=Jr(19);t._W(4,2151);t._W(4,0);t._W(4,0);t._W(2,3);t._W(1,1);t._W(4,0);tm(e,"FeatHdr",t);t=Jr(39);t._W(4,2152);t._W(4,0);t._W(4,0);t._W(2,3);t._W(1,0);t._W(4,0);t._W(2,1);t._W(4,4);t._W(2,0);Ci(kt(r["!ref"]||"A1"),t);t._W(4,4);tm(e,"Feat",t);}function dm(e,r){for(var t=0;t<16;++t){tm(e,"XF",ps({numFmtId:0,style:true},0,r));}r.cellXfs.forEach(function(t){tm(e,"XF",ps(t,0,r));});}function vm(e,r){for(var t=0;t<r["!links"].length;++t){var a=r["!links"][t];tm(e,"HLink",Ws(a));if(a[1].Tooltip)tm(e,"HLinkTooltip",Xs(a));}delete r["!links"];}function pm(e,r,t){if(!r)return;var a=0;r.forEach(function(r,t){if(++a<=256&&r){tm(e,"ColInfo",Js(vh(t,r),t));}});}function mm(e,r,t,a,n){var i=16+mh(n.cellXfs,r,n);if(r.v==null&&!r.bf){tm(e,"Blank",bi(t,a,i));return;}if(r.bf)tm(e,"Formula",Zu(r,t,a,n,i));else switch(r.t){case"d":;case"n":var s=r.t=="d"?ee(le(r.v)):r.v;tm(e,"Number",Es(t,a,s,i,n));break;case"b":;case"e":tm(e,517,ws(t,a,r.v,i,n,r.t));break;case"s":;case"str":if(n.bookSST){var f=dh(n.Strings,r.v,n.revStrings);tm(e,"LabelSst",ts(t,a,f,i,n));}else tm(e,"Label",ns(t,a,(r.v||"").slice(0,255),i,n));break;default:tm(e,"Blank",bi(t,a,i));}}function bm(e,r,t){var a=qr();var n=t.SheetNames[e],i=t.Sheets[n]||{};var s=(t||{}).Workbook||{};var f=(s.Sheets||[])[e]||{};var l=Array.isArray(i);var o=r.biff==8;var c,u="",h=[];var d=kt(i["!ref"]||"A1");var v=o?65536:16384;if(d.e.c>255||d.e.r>=v){if(r.WTF)throw new Error("Range "+(i["!ref"]||"A1")+" exceeds format limit A1:IV16384");d.e.c=Math.min(d.e.c,255);d.e.r=Math.min(d.e.c,v-1);}tm(a,2057,Di(t,16,r));tm(a,"CalcMode",Yn(1));tm(a,"CalcCount",Yn(100));tm(a,"CalcRefMode",Kn(true));tm(a,"CalcIter",Kn(false));tm(a,"CalcDelta",qt(.001));tm(a,"CalcSaveRecalc",Kn(true));tm(a,"PrintRowCol",Kn(false));tm(a,"PrintGrid",Kn(false));tm(a,"GridSet",Yn(1));tm(a,"Guts",bs([0,0]));tm(a,"HCenter",Kn(false));tm(a,"VCenter",Kn(false));if(o)pm(a,i["!cols"],i);tm(a,512,os(d,r));if(o)i["!links"]=[];for(var p=d.s.r;p<=d.e.r;++p){u=lt(p);for(var m=d.s.c;m<=d.e.c;++m){if(p===d.s.r)h[m]=ht(m);c=h[m]+u;var b=l?(i[p]||[])[m]:i[c];if(!b)continue;mm(a,b,p,m,r);if(o&&b.l)i["!links"].push([c,b.l]);}}var g=f.CodeName||f.name||n;if(o)tm(a,"Window2",Ji((s.Views||[])[0]));if(o&&(i["!merges"]||[]).length)tm(a,"MergeCells",Ns(i["!merges"]));if(o)vm(a,i);tm(a,"CodeName",ii(g,r));if(o)hm(a,i);tm(a,"EOF");return a.end();}function gm(e,r,t){var a=qr();var n=(e||{}).Workbook||{};var i=n.Sheets||[];var s=n.WBProps||{};var f=t.biff==8,l=t.biff==5;tm(a,2057,Di(e,5,t));if(t.bookType=="xla")tm(a,"Addin");tm(a,"InterfaceHdr",f?Yn(1200):null);tm(a,"Mms",Xn(2));if(l)tm(a,"ToolbarHdr");if(l)tm(a,"ToolbarEnd");tm(a,"InterfaceEnd");tm(a,"WriteAccess",Li("SheetJS",t));tm(a,"CodePage",Yn(f?1200:1252));if(f)tm(a,"DSF",Yn(0));if(f)tm(a,"Excel9File");tm(a,"RRTabId",ef(e.SheetNames.length));if(f&&e.vbaraw)tm(a,"ObProj");if(f&&e.vbaraw){var o=s.CodeName||"ThisWorkbook";tm(a,"CodeName",ii(o,t));}tm(a,"BuiltInFnGroupCount",Yn(17));tm(a,"WinProtect",Kn(false));tm(a,"Protect",Kn(false));tm(a,"Password",Yn(0));if(f)tm(a,"Prot4Rev",Kn(false));if(f)tm(a,"Prot4RevPass",Yn(0));tm(a,"Window1",Yi(t));tm(a,"Backup",Kn(false));tm(a,"HideObj",Yn(0));tm(a,"Date1904",Kn(Rv(e)=="true"));tm(a,"CalcPrecision",Kn(true));if(f)tm(a,"RefreshAll",Kn(false));tm(a,"BookBool",Yn(0));cm(a,e,t);um(a,e.SSF,t);dm(a,t);if(f)tm(a,"UsesELFs",Kn(false));var c=a.end();var u=qr();if(f)tm(u,"Country",js());if(f&&t.Strings)am(u,"SST",Wi(t.Strings,t));tm(u,"EOF");var h=u.end();var d=qr();var v=0,p=0;for(p=0;p<e.SheetNames.length;++p){v+=(f?12:11)+(f?2:1)*e.SheetNames[p].length;}var m=c.length+v+h.length;for(p=0;p<e.SheetNames.length;++p){var b=i[p]||{};tm(d,"BoundSheet8",zi({pos:m,hs:b.Hidden||0,dt:0,name:e.SheetNames[p]},t));m+=r[p].length;}var g=d.end();if(v!=g.length)throw new Error("BS8 "+v+" != "+g.length);var w=[];if(c.length)w.push(c);if(g.length)w.push(g);if(h.length)w.push(h);return mr([w]);}function wm(e,r){var t=r||{};var a=[];if(e&&!e.SSF){e.SSF=O.get_table();}if(e&&e.SSF){D(O);O.load_table(e.SSF);t.revssf=J(e.SSF);t.revssf[e.SSF[65535]]=0;t.ssf=e.SSF;}t.Strings=[];t.Strings.Count=0;t.Strings.Unique=0;Km(t);t.cellXfs=[];mh(t.cellXfs,{},{revssf:{General:0}});if(!e.Props)e.Props={};for(var n=0;n<e.SheetNames.length;++n){a[a.length]=bm(n,t,e);}a.unshift(gm(e,a,t));return mr([a]);}function km(e,r){var t=r||{};switch(t.biff||2){case 8:;case 5:return wm(e,r);case 4:;case 3:;case 2:return om(e,r);}throw new Error("invalid type "+t.bookType+" for BIFF");}var Em=function(){function e(e,r){var t=r||{};if(m!=null&&t.dense==null)t.dense=m;var a=t.dense?[]:{};e=e.replace(/<!--.*?-->/g,"");var n=e.match(/<table/i);if(!n)throw new Error("Invalid HTML: could not find <table>");var i=e.match(/<\/table/i);var s=n.index,f=i&&i.index||e.length;var l=pe(e.slice(s,f),/(:?<tr[^>]*>)/i,"<tr>");var o=-1,c=0,u=0,h=0;var d={s:{r:1e7,c:1e7},e:{r:0,c:0}};var v=[];for(s=0;s<l.length;++s){var p=l[s].trim();var b=p.slice(0,3).toLowerCase();if(b=="<tr"){++o;if(t.sheetRows&&t.sheetRows<=o){--o;break;}c=0;continue;}if(b!="<td"&&b!="<th")continue;var g=p.split(/<\/t[dh]>/i);for(f=0;f<g.length;++f){var w=g[f].trim();if(!w.match(/<t[dh]/i))continue;var k=w,E=0;while(k.charAt(0)=="<"&&(E=k.indexOf(">"))>-1){k=k.slice(E+1);}for(var S=0;S<v.length;++S){var _=v[S];if(_.s.c==c&&_.s.r<o&&o<=_.e.r){c=_.e.c+1;S=-1;}}var C=De(w.slice(0,w.indexOf(">")));h=C.colspan?+C.colspan:1;if((u=+C.rowspan)>1||h>1)v.push({s:{r:o,c:c},e:{r:o+(u||1)-1,c:c+h-1}});var B=C.t||C["data-t"]||"";if(!k.length){c+=h;continue;}k=rr(k);if(d.s.r>o)d.s.r=o;if(d.e.r<o)d.e.r=o;if(d.s.c>c)d.s.c=c;if(d.e.c<c)d.e.c=c;if(!k.length)continue;var T={t:"s",v:k};if(t.raw||!k.trim().length||B=="s"){}else if(k==="TRUE")T={t:"b",v:true};else if(k==="FALSE")T={t:"b",v:false};else if(!isNaN(he(k)))T={t:"n",v:he(k)};else if(!isNaN(de(k).getDate())){T={t:"d",v:le(k)};if(!t.cellDates)T={t:"n",v:ee(T.v)};T.z=t.dateNF||O._table[14];}if(t.dense){if(!a[o])a[o]=[];a[o][c]=T;}else a[bt({r:o,c:c})]=T;c+=h;}}a["!ref"]=wt(d);if(v.length)a["!merges"]=v;return a;}function r(r,t){var a=r.match(/<table.*?>[\s\S]*?<\/table>/gi);if(!a||a.length==0)throw new Error("Invalid HTML: could not find <table>");if(a.length==1)return _t(e(a[0],t),t);var n=Ib.book_new();a.forEach(function(r,a){Ib.book_append_sheet(n,e(r,t),"Sheet"+(a+1));});return n;}function t(e,r,t,a){var n=e["!merges"]||[];var i=[];for(var s=r.s.c;s<=r.e.c;++s){var f=0,l=0;for(var o=0;o<n.length;++o){if(n[o].s.r>t||n[o].s.c>s)continue;if(n[o].e.r<t||n[o].e.c<s)continue;if(n[o].s.r<t||n[o].s.c<s){f=-1;break;}f=n[o].e.r-n[o].s.r+1;l=n[o].e.c-n[o].s.c+1;break;}if(f<0)continue;var c=bt({r:t,c:s});var u=a.dense?(e[t]||[])[s]:e[c];var h=u&&u.v!=null&&(u.h||Xe(u.w||(St(u),u.w)||""))||"";var d={};if(f>1)d.rowspan=f;if(l>1)d.colspan=l;if(a.editable)h='<span contenteditable="true">'+h+"</span>";else if(u){d["data-t"]=u&&u.t||"z";if(u.v!=null)d["data-v"]=u.v;if(u.z!=null)d["data-z"]=u.z;if(u.l&&(u.l.Target||"#").charAt(0)!="#")h='<a href="'+u.l.Target+'">'+h+"</a>";}d.id=(a.id||"sjs")+"-"+c;i.push(or("td",h,d));}var v="<tr>";return v+i.join("")+"</tr>";}function a(e,r,t){var a=[];return a.join("")+"<table"+(t&&t.id?' id="'+t.id+'"':"")+">";}var n='<html><head><meta charset="utf-8"/><title>SheetJS Table Export</title></head><body>';var i="</body></html>";function s(e,r){var s=r||{};var f=s.header!=null?s.header:n;var l=s.footer!=null?s.footer:i;var o=[f];var c=gt(e["!ref"]);s.dense=Array.isArray(e);o.push(a(e,c,s));for(var u=c.s.r;u<=c.e.r;++u){o.push(t(e,c,u,s));}o.push("</table>"+l);return o.join("");}return{to_workbook:r,to_sheet:e,_row:t,BEGIN:n,END:i,_preamble:a,from_sheet:s};}();function Sm(e,r,t){var a=t||{};if(m!=null)a.dense=m;var n=0,i=0;if(a.origin!=null){if(typeof a.origin=="number")n=a.origin;else{var s=typeof a.origin=="string"?mt(a.origin):a.origin;n=s.r;i=s.c;}}var f=r.getElementsByTagName("tr");var l=Math.min(a.sheetRows||1e7,f.length);var o={s:{r:0,c:0},e:{r:n,c:i}};if(e["!ref"]){var c=gt(e["!ref"]);o.s.r=Math.min(o.s.r,c.s.r);o.s.c=Math.min(o.s.c,c.s.c);o.e.r=Math.max(o.e.r,c.e.r);o.e.c=Math.max(o.e.c,c.e.c);if(n==-1)o.e.r=n=c.e.r+1;}var u=[],h=0;var d=e["!rows"]||(e["!rows"]=[]);var v=0,p=0,b=0,g=0,w=0,k=0;if(!e["!cols"])e["!cols"]=[];for(;v<f.length&&p<l;++v){var E=f[v];if(Bm(E)){if(a.display)continue;d[p]={hidden:true};}var S=E.children;for(b=g=0;b<S.length;++b){var _=S[b];if(a.display&&Bm(_))continue;var C=_.hasAttribute("data-v")?_.getAttribute("data-v"):_.hasAttribute("v")?_.getAttribute("v"):rr(_.innerHTML);var B=_.getAttribute("data-z")||_.getAttribute("z");for(h=0;h<u.length;++h){var T=u[h];if(T.s.c==g+i&&T.s.r<p+n&&p+n<=T.e.r){g=T.e.c+1-i;h=-1;}}k=+_.getAttribute("colspan")||1;if((w=+_.getAttribute("rowspan")||1)>1||k>1)u.push({s:{r:p+n,c:g+i},e:{r:p+n+(w||1)-1,c:g+i+(k||1)-1}});var y={t:"s",v:C};var x=_.getAttribute("data-t")||_.getAttribute("t")||"";if(C!=null){if(C.length==0)y.t=x||"z";else if(a.raw||C.trim().length==0||x=="s"){}else if(C==="TRUE")y={t:"b",v:true};else if(C==="FALSE")y={t:"b",v:false};else if(!isNaN(he(C)))y={t:"n",v:he(C)};else if(!isNaN(de(C).getDate())){y={t:"d",v:le(C)};if(!a.cellDates)y={t:"n",v:ee(y.v)};y.z=a.dateNF||O._table[14];}}if(y.z===undefined&&B!=null)y.z=B;var A="",I=_.getElementsByTagName("A");if(I&&I.length)for(var R=0;R<I.length;++R){if(I[R].hasAttribute("href")){A=I[R].getAttribute("href");if(A.charAt(0)!="#")break;}}if(A&&A.charAt(0)!="#")y.l={Target:A};if(a.dense){if(!e[p+n])e[p+n]=[];e[p+n][g+i]=y;}else e[bt({c:g+i,r:p+n})]=y;if(o.e.c<g+i)o.e.c=g+i;g+=k;}++p;}if(u.length)e["!merges"]=(e["!merges"]||[]).concat(u);o.e.r=Math.max(o.e.r,p-1+n);e["!ref"]=wt(o);if(p>=l)e["!fullref"]=wt((o.e.r=f.length-v+p-1+n,o));return e;}function _m(e,r){var t=r||{};var a=t.dense?[]:{};return Sm(a,e,r);}function Cm(e,r){return _t(_m(e,r),r);}function Bm(e){var r="";var t=Tm(e);if(t)r=t(e).getPropertyValue("display");if(!r)r=e.style.display;return r==="none";}function Tm(e){if(e.ownerDocument.defaultView&&typeof e.ownerDocument.defaultView.getComputedStyle==="function")return e.ownerDocument.defaultView.getComputedStyle;if(typeof getComputedStyle==="function")return getComputedStyle;return null;}var ym=function(){var e=function e(_e2){var r=_e2.replace(/[\t\r\n]/g," ").trim().replace(/ +/g," ").replace(/<text:s\/>/g," ").replace(/<text:s text:c="(\d+)"\/>/g,function(e,r){return Array(parseInt(r,10)+1).join(" ");}).replace(/<text:tab[^>]*\/>/g,"\t").replace(/<text:line-break\/>/g,"\n");var t=Me(r.replace(/<[^>]*>/g,""));return[t];};var r={day:["d","dd"],month:["m","mm"],year:["y","yy"],hours:["h","hh"],minutes:["m","mm"],seconds:["s","ss"],"am-pm":["A/P","AM/PM"],"day-of-week":["ddd","dddd"],era:["e","ee"],quarter:["\\Qm",'m\\"th quarter"']};return function t(a,n){var i=n||{};if(m!=null&&i.dense==null)i.dense=m;var s=Bp(a);var f=[],l;var o;var c={name:""},u="",h=0;var d;var v;var p={},b=[];var g=i.dense?[]:{};var w,k;var E={value:""};var S="",_=0,C;var B=[];var T=-1,y=-1,x={s:{r:1e6,c:1e7},e:{r:0,c:0}};var A=0;var I={};var R=[],F={},O=0,D=0;var P=[],N=1,L=1;var M=[];var U={Names:[]};var z={};var H=["",""];var W=[],V={};var X="",G=0;var j=false,K=false;var $=0;Tp.lastIndex=0;s=s.replace(/<!--([\s\S]*?)-->/gm,"").replace(/<!DOCTYPE[^\[]*\[[^\]]*\]>/gm,"");while(w=Tp.exec(s)){switch(w[3]=w[3].replace(/_.*$/,"")){case"table":;case"工作表":if(w[1]==="/"){if(x.e.c>=x.s.c&&x.e.r>=x.s.r)g["!ref"]=wt(x);else g["!ref"]="A1:A1";if(i.sheetRows>0&&i.sheetRows<=x.e.r){g["!fullref"]=g["!ref"];x.e.r=i.sheetRows-1;g["!ref"]=wt(x);}if(R.length)g["!merges"]=R;if(P.length)g["!rows"]=P;d.name=d["名称"]||d.name;if(typeof JSON!=="undefined")JSON.stringify(d);b.push(d.name);p[d.name]=g;K=false;}else if(w[0].charAt(w[0].length-2)!=="/"){d=De(w[0],false);T=y=-1;x.s.r=x.s.c=1e7;x.e.r=x.e.c=0;g=i.dense?[]:{};R=[];P=[];K=true;}break;case"table-row-group":if(w[1]==="/")--A;else++A;break;case"table-row":;case"行":if(w[1]==="/"){T+=N;N=1;break;}v=De(w[0],false);if(v["行号"])T=v["行号"]-1;else if(T==-1)T=0;N=+v["number-rows-repeated"]||1;if(N<10)for($=0;$<N;++$){if(A>0)P[T+$]={level:A};}y=-1;break;case"covered-table-cell":if(w[1]!=="/")++y;if(i.sheetStubs){if(i.dense){if(!g[T])g[T]=[];g[T][y]={t:"z"};}else g[bt({r:T,c:y})]={t:"z"};}S="";B=[];break;case"table-cell":;case"数据":if(w[0].charAt(w[0].length-2)==="/"){++y;E=De(w[0],false);L=parseInt(E["number-columns-repeated"]||"1",10);k={t:"z",v:null};if(E.formula&&i.cellFormula!=false)k.f=sh(Me(E.formula));if((E["数据类型"]||E["value-type"])=="string"){k.t="s";k.v=Me(E["string-value"]||"");if(i.dense){if(!g[T])g[T]=[];g[T][y]=k;}else{g[bt({r:T,c:y})]=k;}}y+=L-1;}else if(w[1]!=="/"){++y;S="";_=0;B=[];L=1;var Y=N?T+N-1:T;if(y>x.e.c)x.e.c=y;if(y<x.s.c)x.s.c=y;if(T<x.s.r)x.s.r=T;if(Y>x.e.r)x.e.r=Y;E=De(w[0],false);W=[];V={};k={t:E["数据类型"]||E["value-type"],v:null};if(i.cellFormula){if(E.formula)E.formula=Me(E.formula);if(E["number-matrix-columns-spanned"]&&E["number-matrix-rows-spanned"]){O=parseInt(E["number-matrix-rows-spanned"],10)||0;D=parseInt(E["number-matrix-columns-spanned"],10)||0;F={s:{r:T,c:y},e:{r:T+O-1,c:y+D-1}};k.F=wt(F);M.push([F,k.F]);}if(E.formula)k.f=sh(E.formula);else for($=0;$<M.length;++$){if(T>=M[$][0].s.r&&T<=M[$][0].e.r)if(y>=M[$][0].s.c&&y<=M[$][0].e.c)k.F=M[$][1];}}if(E["number-columns-spanned"]||E["number-rows-spanned"]){O=parseInt(E["number-rows-spanned"],10)||0;D=parseInt(E["number-columns-spanned"],10)||0;F={s:{r:T,c:y},e:{r:T+O-1,c:y+D-1}};R.push(F);}if(E["number-columns-repeated"])L=parseInt(E["number-columns-repeated"],10);switch(k.t){case"boolean":k.t="b";k.v=$e(E["boolean-value"]);break;case"float":k.t="n";k.v=parseFloat(E.value);break;case"percentage":k.t="n";k.v=parseFloat(E.value);break;case"currency":k.t="n";k.v=parseFloat(E.value);break;case"date":k.t="d";k.v=le(E["date-value"]);if(!i.cellDates){k.t="n";k.v=ee(k.v);}k.z="m/d/yy";break;case"time":k.t="n";k.v=ie(E["time-value"])/86400;if(i.cellDates){k.t="d";k.v=ne(k.v);}k.z="HH:MM:SS";break;case"number":k.t="n";k.v=parseFloat(E["数据数值"]);break;default:if(k.t==="string"||k.t==="text"||!k.t){k.t="s";if(E["string-value"]!=null){S=Me(E["string-value"]);B=[];}}else throw new Error("Unsupported value type "+k.t);}}else{j=false;if(k.t==="s"){k.v=S||"";if(B.length)k.R=B;j=_==0;}if(z.Target)k.l=z;if(W.length>0){k.c=W;W=[];}if(S&&i.cellText!==false)k.w=S;if(j){k.t="z";delete k.v;}if(!j||i.sheetStubs){if(!(i.sheetRows&&i.sheetRows<=T)){for(var Z=0;Z<N;++Z){L=parseInt(E["number-columns-repeated"]||"1",10);if(i.dense){if(!g[T+Z])g[T+Z]=[];g[T+Z][y]=Z==0?k:ce(k);while(--L>0){g[T+Z][y+L]=ce(k);}}else{g[bt({r:T+Z,c:y})]=k;while(--L>0){g[bt({r:T+Z,c:y+L})]=ce(k);}}if(x.e.c<=y)x.e.c=y;}}}L=parseInt(E["number-columns-repeated"]||"1",10);y+=L-1;L=0;k={};S="";B=[];}z={};break;case"document":;case"document-content":;case"电子表格文档":;case"spreadsheet":;case"主体":;case"scripts":;case"styles":;case"font-face-decls":;case"master-styles":if(w[1]==="/"){if((l=f.pop())[0]!==w[3])throw"Bad state: "+l;}else if(w[0].charAt(w[0].length-2)!=="/")f.push([w[3],true]);break;case"annotation":if(w[1]==="/"){if((l=f.pop())[0]!==w[3])throw"Bad state: "+l;V.t=S;if(B.length)V.R=B;V.a=X;W.push(V);}else if(w[0].charAt(w[0].length-2)!=="/"){f.push([w[3],false]);}X="";G=0;S="";_=0;B=[];break;case"creator":if(w[1]==="/"){X=s.slice(G,w.index);}else G=w.index+w[0].length;break;case"meta":;case"元数据":;case"settings":;case"config-item-set":;case"config-item-map-indexed":;case"config-item-map-entry":;case"config-item-map-named":;case"shapes":;case"frame":;case"text-box":;case"image":;case"data-pilot-tables":;case"list-style":;case"form":;case"dde-links":;case"event-listeners":;case"chart":if(w[1]==="/"){if((l=f.pop())[0]!==w[3])throw"Bad state: "+l;}else if(w[0].charAt(w[0].length-2)!=="/")f.push([w[3],false]);S="";_=0;B=[];break;case"scientific-number":break;case"currency-symbol":break;case"currency-style":break;case"number-style":;case"percentage-style":;case"date-style":;case"time-style":if(w[1]==="/"){I[c.name]=u;if((l=f.pop())[0]!==w[3])throw"Bad state: "+l;}else if(w[0].charAt(w[0].length-2)!=="/"){u="";c=De(w[0],false);f.push([w[3],true]);}break;case"script":break;case"libraries":break;case"automatic-styles":break;case"default-style":;case"page-layout":break;case"style":break;case"map":break;case"font-face":break;case"paragraph-properties":break;case"table-properties":break;case"table-column-properties":break;case"table-row-properties":break;case"table-cell-properties":break;case"number":switch(f[f.length-1][0]){case"time-style":;case"date-style":o=De(w[0],false);u+=r[w[3]][o.style==="long"?1:0];break;}break;case"fraction":break;case"day":;case"month":;case"year":;case"era":;case"day-of-week":;case"week-of-year":;case"quarter":;case"hours":;case"minutes":;case"seconds":;case"am-pm":switch(f[f.length-1][0]){case"time-style":;case"date-style":o=De(w[0],false);u+=r[w[3]][o.style==="long"?1:0];break;}break;case"boolean-style":break;case"boolean":break;case"text-style":break;case"text":if(w[0].slice(-2)==="/>")break;else if(w[1]==="/")switch(f[f.length-1][0]){case"number-style":;case"date-style":;case"time-style":u+=s.slice(h,w.index);break;}else h=w.index+w[0].length;break;case"named-range":o=De(w[0],false);H=lh(o["cell-range-address"]);var J={Name:o.name,Ref:H[0]+"!"+H[1]};if(K)J.Sheet=b.length;U.Names.push(J);break;case"text-content":break;case"text-properties":break;case"embedded-text":break;case"body":;case"电子表格":break;case"forms":break;case"table-column":break;case"table-header-rows":break;case"table-rows":break;case"table-column-group":break;case"table-header-columns":break;case"table-columns":break;case"null-date":break;case"graphic-properties":break;case"calculation-settings":break;case"named-expressions":break;case"label-range":break;case"label-ranges":break;case"named-expression":break;case"sort":break;case"sort-by":break;case"sort-groups":break;case"tab":break;case"line-break":break;case"span":break;case"p":;case"文本串":if(["master-styles"].indexOf(f[f.length-1][0])>-1)break;if(w[1]==="/"&&(!E||!E["string-value"])){var Q=e(s.slice(_,w.index),C);S=(S.length>0?S+"\n":"")+Q[0];}else{C=De(w[0],false);_=w.index+w[0].length;}break;case"s":break;case"database-range":if(w[1]==="/")break;try{H=lh(De(w[0])["target-range-address"]);p[H[0]]["!autofilter"]={ref:H[1]};}catch(q){}break;case"date":break;case"object":break;case"title":;case"标题":break;case"desc":break;case"binary-data":break;case"table-source":break;case"scenario":break;case"iteration":break;case"content-validations":break;case"content-validation":break;case"help-message":break;case"error-message":break;case"database-ranges":break;case"filter":break;case"filter-and":break;case"filter-or":break;case"filter-condition":break;case"list-level-style-bullet":break;case"list-level-style-number":break;case"list-level-properties":break;case"sender-firstname":;case"sender-lastname":;case"sender-initials":;case"sender-title":;case"sender-position":;case"sender-email":;case"sender-phone-private":;case"sender-fax":;case"sender-company":;case"sender-phone-work":;case"sender-street":;case"sender-city":;case"sender-postal-code":;case"sender-country":;case"sender-state-or-province":;case"author-name":;case"author-initials":;case"chapter":;case"file-name":;case"template-name":;case"sheet-name":break;case"event-listener":break;case"initial-creator":;case"creation-date":;case"print-date":;case"generator":;case"document-statistic":;case"user-defined":;case"editing-duration":;case"editing-cycles":break;case"config-item":break;case"page-number":break;case"page-count":break;case"time":break;case"cell-range-source":break;case"detective":break;case"operation":break;case"highlighted-range":break;case"data-pilot-table":;case"source-cell-range":;case"source-service":;case"data-pilot-field":;case"data-pilot-level":;case"data-pilot-subtotals":;case"data-pilot-subtotal":;case"data-pilot-members":;case"data-pilot-member":;case"data-pilot-display-info":;case"data-pilot-sort-info":;case"data-pilot-layout-info":;case"data-pilot-field-reference":;case"data-pilot-groups":;case"data-pilot-group":;case"data-pilot-group-member":break;case"rect":break;case"dde-connection-decls":;case"dde-connection-decl":;case"dde-link":;case"dde-source":break;case"properties":break;case"property":break;case"a":if(w[1]!=="/"){z=De(w[0],false);if(!z.href)break;z.Target=Me(z.href);delete z.href;if(z.Target.charAt(0)=="#"&&z.Target.indexOf(".")>-1){H=lh(z.Target.slice(1));z.Target="#"+H[0]+"!"+H[1];}else if(z.Target.match(/^\.\.[\\\/]/))z.Target=z.Target.slice(3);}break;case"table-protection":break;case"data-pilot-grand-total":break;case"office-document-common-attrs":break;default:switch(w[2]){case"dc:":;case"calcext:":;case"loext:":;case"ooo:":;case"chartooo:":;case"draw:":;case"style:":;case"chart:":;case"form:":;case"uof:":;case"表:":;case"字:":break;default:if(i.WTF)throw new Error(w);};}}var re={Sheets:p,SheetNames:b,Workbook:U};if(i.bookSheets)delete re.Sheets;return re;};}();function xm(e,r){r=r||{};if(we(e,"META-INF/manifest.xml"))Ka(Ee(e,"META-INF/manifest.xml"),r);var t=Se(e,"content.xml");if(!t)throw new Error("Missing content.xml in ODS / UOF file");var a=ym(Ye(t),r);if(we(e,"meta.xml"))a.Props=rn(Ee(e,"meta.xml"));return a;}function Am(e,r){return ym(e,r);}var Im=function(){var e="<office:master-styles>"+'<style:master-page style:name="mp1" style:page-layout-name="mp1">'+"<style:header/>"+'<style:header-left style:display="false"/>'+"<style:footer/>"+'<style:footer-left style:display="false"/>'+"</style:master-page>"+"</office:master-styles>";var r="<office:document-styles "+lr({"xmlns:office":"urn:oasis:names:tc:opendocument:xmlns:office:1.0","xmlns:table":"urn:oasis:names:tc:opendocument:xmlns:table:1.0","xmlns:style":"urn:oasis:names:tc:opendocument:xmlns:style:1.0","xmlns:text":"urn:oasis:names:tc:opendocument:xmlns:text:1.0","xmlns:draw":"urn:oasis:names:tc:opendocument:xmlns:drawing:1.0","xmlns:fo":"urn:oasis:names:tc:opendocument:xmlns:xsl-fo-compatible:1.0","xmlns:xlink":"http://www.w3.org/1999/xlink","xmlns:dc":"http://purl.org/dc/elements/1.1/","xmlns:number":"urn:oasis:names:tc:opendocument:xmlns:datastyle:1.0","xmlns:svg":"urn:oasis:names:tc:opendocument:xmlns:svg-compatible:1.0","xmlns:of":"urn:oasis:names:tc:opendocument:xmlns:of:1.2","office:version":"1.2"})+">"+e+"</office:document-styles>";return function t(){return Ae+r;};}();var Rm=function(){var e=function e(_e3){return He(_e3).replace(/  +/g,function(e){return'<text:s text:c="'+e.length+'"/>';}).replace(/\t/g,"<text:tab/>").replace(/\n/g,"</text:p><text:p>").replace(/^ /,"<text:s/>").replace(/ $/,"<text:s/>");};var r="          <table:table-cell />\n";var t="          <table:covered-table-cell/>\n";var a=function a(_a2,n,i){var s=[];s.push('      <table:table table:name="'+He(n.SheetNames[i])+'" table:style-name="ta1">\n');var f=0,l=0,o=gt(_a2["!ref"]||"A1");var c=_a2["!merges"]||[],u=0;var h=Array.isArray(_a2);if(_a2["!cols"]){for(l=0;l<=o.e.c;++l){s.push("        <table:table-column"+(_a2["!cols"][l]?' table:style-name="co'+_a2["!cols"][l].ods+'"':"")+"></table:table-column>\n");}}var d="",v=_a2["!rows"]||[];for(f=0;f<o.s.r;++f){d=v[f]?' table:style-name="ro'+v[f].ods+'"':"";s.push("        <table:table-row"+d+"></table:table-row>\n");}for(;f<=o.e.r;++f){d=v[f]?' table:style-name="ro'+v[f].ods+'"':"";s.push("        <table:table-row"+d+">\n");for(l=0;l<o.s.c;++l){s.push(r);}for(;l<=o.e.c;++l){var p=false,m={},b="";for(u=0;u!=c.length;++u){if(c[u].s.c>l)continue;if(c[u].s.r>f)continue;if(c[u].e.c<l)continue;if(c[u].e.r<f)continue;if(c[u].s.c!=l||c[u].s.r!=f)p=true;m["table:number-columns-spanned"]=c[u].e.c-c[u].s.c+1;m["table:number-rows-spanned"]=c[u].e.r-c[u].s.r+1;break;}if(p){s.push(t);continue;}var g=bt({r:f,c:l}),w=h?(_a2[f]||[])[l]:_a2[g];if(w&&w.f){m["table:formula"]=He(fh(w.f));if(w.F){if(w.F.slice(0,g.length)==g){var k=gt(w.F);m["table:number-matrix-columns-spanned"]=k.e.c-k.s.c+1;m["table:number-matrix-rows-spanned"]=k.e.r-k.s.r+1;}}}if(!w){s.push(r);continue;}switch(w.t){case"b":b=w.v?"TRUE":"FALSE";m["office:value-type"]="boolean";m["office:boolean-value"]=w.v?"true":"false";break;case"n":b=w.w||String(w.v||0);m["office:value-type"]="float";m["office:value"]=w.v||0;break;case"s":;case"str":b=w.v==null?"":w.v;m["office:value-type"]="string";break;case"d":b=w.w||le(w.v).toISOString();m["office:value-type"]="date";m["office:date-value"]=le(w.v).toISOString();m["table:style-name"]="ce1";break;default:s.push(r);continue;}var E=e(b);if(w.l&&w.l.Target){var S=w.l.Target;S=S.charAt(0)=="#"?"#"+oh(S.slice(1)):S;if(S.charAt(0)!="#"&&!S.match(/^\w+:/))S="../"+S;E=or("text:a",E,{"xlink:href":S.replace(/&/g,"&amp;")});}s.push("          "+or("table:table-cell",or("text:p",E,{}),m)+"\n");}s.push("        </table:table-row>\n");}s.push("      </table:table>\n");return s.join("");};var n=function n(e,r){e.push(" <office:automatic-styles>\n");e.push('  <number:date-style style:name="N37" number:automatic-order="true">\n');e.push('   <number:month number:style="long"/>\n');e.push("   <number:text>/</number:text>\n");e.push('   <number:day number:style="long"/>\n');e.push("   <number:text>/</number:text>\n");e.push("   <number:year/>\n");e.push("  </number:date-style>\n");var t=0;r.SheetNames.map(function(e){return r.Sheets[e];}).forEach(function(r){if(!r)return;if(r["!cols"]){for(var a=0;a<r["!cols"].length;++a){if(r["!cols"][a]){var n=r["!cols"][a];if(n.width==null&&n.wpx==null&&n.wch==null)continue;_l(n);n.ods=t;var i=r["!cols"][a].wpx+"px";e.push('  <style:style style:name="co'+t+'" style:family="table-column">\n');e.push('   <style:table-column-properties fo:break-before="auto" style:column-width="'+i+'"/>\n');e.push("  </style:style>\n");++t;}}}});var a=0;r.SheetNames.map(function(e){return r.Sheets[e];}).forEach(function(r){if(!r)return;if(r["!rows"]){for(var t=0;t<r["!rows"].length;++t){if(r["!rows"][t]){r["!rows"][t].ods=a;var n=r["!rows"][t].hpx+"px";e.push('  <style:style style:name="ro'+a+'" style:family="table-row">\n');e.push('   <style:table-row-properties fo:break-before="auto" style:row-height="'+n+'"/>\n');e.push("  </style:style>\n");++a;}}}});e.push('  <style:style style:name="ta1" style:family="table" style:master-page-name="mp1">\n');e.push('   <style:table-properties table:display="true" style:writing-mode="lr-tb"/>\n');e.push("  </style:style>\n");e.push('  <style:style style:name="ce1" style:family="table-cell" style:parent-style-name="Default" style:data-style-name="N37"/>\n');e.push(" </office:automatic-styles>\n");};return function i(e,r){var t=[Ae];var i=lr({"xmlns:office":"urn:oasis:names:tc:opendocument:xmlns:office:1.0","xmlns:table":"urn:oasis:names:tc:opendocument:xmlns:table:1.0","xmlns:style":"urn:oasis:names:tc:opendocument:xmlns:style:1.0","xmlns:text":"urn:oasis:names:tc:opendocument:xmlns:text:1.0","xmlns:draw":"urn:oasis:names:tc:opendocument:xmlns:drawing:1.0","xmlns:fo":"urn:oasis:names:tc:opendocument:xmlns:xsl-fo-compatible:1.0","xmlns:xlink":"http://www.w3.org/1999/xlink","xmlns:dc":"http://purl.org/dc/elements/1.1/","xmlns:meta":"urn:oasis:names:tc:opendocument:xmlns:meta:1.0","xmlns:number":"urn:oasis:names:tc:opendocument:xmlns:datastyle:1.0","xmlns:presentation":"urn:oasis:names:tc:opendocument:xmlns:presentation:1.0","xmlns:svg":"urn:oasis:names:tc:opendocument:xmlns:svg-compatible:1.0","xmlns:chart":"urn:oasis:names:tc:opendocument:xmlns:chart:1.0","xmlns:dr3d":"urn:oasis:names:tc:opendocument:xmlns:dr3d:1.0","xmlns:math":"http://www.w3.org/1998/Math/MathML","xmlns:form":"urn:oasis:names:tc:opendocument:xmlns:form:1.0","xmlns:script":"urn:oasis:names:tc:opendocument:xmlns:script:1.0","xmlns:ooo":"http://openoffice.org/2004/office","xmlns:ooow":"http://openoffice.org/2004/writer","xmlns:oooc":"http://openoffice.org/2004/calc","xmlns:dom":"http://www.w3.org/2001/xml-events","xmlns:xforms":"http://www.w3.org/2002/xforms","xmlns:xsd":"http://www.w3.org/2001/XMLSchema","xmlns:xsi":"http://www.w3.org/2001/XMLSchema-instance","xmlns:sheet":"urn:oasis:names:tc:opendocument:sh33tjs:1.0","xmlns:rpt":"http://openoffice.org/2005/report","xmlns:of":"urn:oasis:names:tc:opendocument:xmlns:of:1.2","xmlns:xhtml":"http://www.w3.org/1999/xhtml","xmlns:grddl":"http://www.w3.org/2003/g/data-view#","xmlns:tableooo":"http://openoffice.org/2009/table","xmlns:drawooo":"http://openoffice.org/2010/draw","xmlns:calcext":"urn:org:documentfoundation:names:experimental:calc:xmlns:calcext:1.0","xmlns:loext":"urn:org:documentfoundation:names:experimental:office:xmlns:loext:1.0","xmlns:field":"urn:openoffice:names:experimental:ooo-ms-interop:xmlns:field:1.0","xmlns:formx":"urn:openoffice:names:experimental:ooxml-odf-interop:xmlns:form:1.0","xmlns:css3t":"http://www.w3.org/TR/css3-text/","office:version":"1.2"});var s=lr({"xmlns:config":"urn:oasis:names:tc:opendocument:xmlns:config:1.0","office:mimetype":"application/vnd.oasis.opendocument.spreadsheet"});if(r.bookType=="fods"){t.push("<office:document"+i+s+">\n");t.push(Qa().replace(/office:document-meta/g,"office:meta"));}else t.push("<office:document-content"+i+">\n");n(t,e);t.push("  <office:body>\n");t.push("    <office:spreadsheet>\n");for(var f=0;f!=e.SheetNames.length;++f){t.push(a(e.Sheets[e.SheetNames[f]],e,f,r));}t.push("    </office:spreadsheet>\n");t.push("  </office:body>\n");if(r.bookType=="fods")t.push("</office:document>");else t.push("</office:document-content>");return t.join("");};}();function Fm(e,r){if(r.bookType=="fods")return Rm(e,r);var t=Te();var a="";var n=[];var i=[];a="mimetype";Ce(t,a,"application/vnd.oasis.opendocument.spreadsheet");a="content.xml";Ce(t,a,Rm(e,r));n.push([a,"text/xml"]);i.push([a,"ContentFile"]);a="styles.xml";Ce(t,a,Im(e,r));n.push([a,"text/xml"]);i.push([a,"StylesFile"]);a="meta.xml";Ce(t,a,Ae+Qa());n.push([a,"text/xml"]);i.push([a,"MetadataFile"]);a="manifest.rdf";Ce(t,a,Ja(i));n.push([a,"application/rdf+xml"]);a="META-INF/manifest.xml";Ce(t,a,$a(n));return t;}function Om(e,r){if(!r)return 0;var t=e.SheetNames.indexOf(r);if(t==-1)throw new Error("Sheet not found: "+r);return t;}function Dm(e){return function r(t,a){var n=Om(t,a.sheet);return e.from_sheet(t.Sheets[t.SheetNames[n]],a,t);};}var Pm=Dm(Em);var Nm=Dm({from_sheet:Bb});var Lm=Dm(typeof pf!=="undefined"?pf:{});var Mm=Dm(typeof mf!=="undefined"?mf:{});var Um=Dm(typeof gf!=="undefined"?gf:{});var zm=Dm(typeof ll!=="undefined"?ll:{});var Hm=Dm({from_sheet:Tb});var Wm=Dm(typeof vf!=="undefined"?vf:{});var Vm=Dm(typeof bf!=="undefined"?bf:{});var Xm=Dm(typeof kf!=="undefined"?{from_sheet:kf.sheet_to_wk1}:{});function Gm(e){return function r(t){for(var a=0;a!=e.length;++a){var n=e[a];if(t[n[0]]===undefined)t[n[0]]=n[1];if(n[2]==="n")t[n[0]]=Number(t[n[0]]);}};}var jm=function jm(e){Gm([["cellNF",false],["cellHTML",true],["cellFormula",true],["cellStyles",false],["cellText",true],["cellDates",false],["sheetStubs",false],["sheetRows",0,"n"],["bookDeps",false],["bookSheets",false],["bookProps",false],["bookFiles",false],["bookVBA",false],["password",""],["WTF",false]])(e);};var Km=Gm([["cellDates",false],["bookSST",false],["bookType","xlsx"],["compression",false],["WTF",false]]);function $m(e){if(Ua.WS.indexOf(e)>-1)return"sheet";if(Ua.CS&&e==Ua.CS)return"chart";if(Ua.DS&&e==Ua.DS)return"dialog";if(Ua.MS&&e==Ua.MS)return"macro";return e&&e.length?e:"sheet";}function Ym(e,r){if(!e)return 0;try{e=r.map(function a(r){if(!r.id)r.id=r.strRelID;return[r.name,e["!id"][r.id].Target,$m(e["!id"][r.id].Type)];});}catch(t){return null;}return!e||e.length===0?null:e;}function Zm(e,r,t,a,n,i,s,f,l,o,c,u){try{i[a]=Ha(Se(e,t,true),r);var h=Ee(e,r);var d;switch(f){case"sheet":d=qv(h,r,n,l,i[a],o,c,u);break;case"chart":d=ep(h,r,n,l,i[a],o,c,u);if(!d||!d["!drawel"])break;var v=xe(d["!drawel"].Target,r);var p=za(v);var m=Uo(Se(e,v,true),Ha(Se(e,p,true),v));var b=xe(m,v);var g=za(b);d=bv(Se(e,b,true),b,l,Ha(Se(e,g,true),b),o,d);break;case"macro":d=rp(h,r,n,l,i[a],o,c,u);break;case"dialog":d=tp(h,r,n,l,i[a],o,c,u);break;default:throw new Error("Unrecognized sheet type "+f);}s[a]=d;var w=[];if(i&&i[a])K(i[a]).forEach(function(t){if(i[a][t].Type==Ua.CMNT){var n=xe(i[a][t].Target,r);w=sp(Ee(e,n,true),n,l);if(!w||!w.length)return;Wo(d,w);}});}catch(k){if(l.WTF)throw k;}}function Jm(e){return e.charAt(0)=="/"?e.slice(1):e;}function Qm(e,r){D(O);r=r||{};jm(r);if(we(e,"META-INF/manifest.xml"))return xm(e,r);if(we(e,"objectdata.xml"))return xm(e,r);if(we(e,"Index/Document.iwa"))throw new Error("Unsupported NUMBERS file");var t=_e(e);var a=Pa(Se(e,"[Content_Types].xml"));var n=false;var i,s;if(a.workbooks.length===0){s="xl/workbook.xml";if(Ee(e,s,true))a.workbooks.push(s);}if(a.workbooks.length===0){s="xl/workbook.bin";if(!Ee(e,s,true))throw new Error("Could not find workbook");a.workbooks.push(s);n=true;}if(a.workbooks[0].slice(-3)=="bin")n=true;var f={};var l={};if(!r.bookSheets&&!r.bookProps){ch=[];if(a.sst)try{ch=ip(Ee(e,Jm(a.sst)),a.sst,r);}catch(o){if(r.WTF)throw o;}if(r.cellStyles&&a.themes.length)f=np(Se(e,a.themes[0].replace(/^\//,""),true)||"",a.themes[0],r);if(a.style)l=ap(Ee(e,Jm(a.style)),a.style,f,r);}a.links.map(function(t){try{var a=Ha(Se(e,za(Jm(t))),t);return lp(Ee(e,Jm(t)),a,t,r);}catch(n){}});var c=Qv(Ee(e,Jm(a.workbooks[0])),a.workbooks[0],r);var u={},h="";if(a.coreprops.length){h=Ee(e,Jm(a.coreprops[0]),true);if(h)u=rn(h);if(a.extprops.length!==0){h=Ee(e,Jm(a.extprops[0]),true);if(h)on(h,u,r);}}var d={};if(!r.bookSheets||r.bookProps){if(a.custprops.length!==0){h=Se(e,Jm(a.custprops[0]),true);if(h)d=dn(h,r);}}var v={};if(r.bookSheets||r.bookProps){if(c.Sheets)i=c.Sheets.map(function I(e){return e.name;});else if(u.Worksheets&&u.SheetNames.length>0)i=u.SheetNames;if(r.bookProps){v.Props=u;v.Custprops=d;}if(r.bookSheets&&typeof i!=="undefined")v.SheetNames=i;if(r.bookSheets?v.SheetNames:r.bookProps)return v;}i={};var p={};if(r.bookDeps&&a.calcchain)p=fp(Ee(e,Jm(a.calcchain)),a.calcchain,r);var m=0;var b={};var g,w;{var k=c.Sheets;u.Worksheets=k.length;u.SheetNames=[];for(var E=0;E!=k.length;++E){u.SheetNames[E]=k[E].name;}}var S=n?"bin":"xml";var _=a.workbooks[0].lastIndexOf("/");var C=(a.workbooks[0].slice(0,_+1)+"_rels/"+a.workbooks[0].slice(_+1)+".rels").replace(/^\//,"");if(!we(e,C))C="xl/_rels/workbook."+S+".rels";var B=Ha(Se(e,C,true),C);if(B)B=Ym(B,c.Sheets);var T=Ee(e,"xl/worksheets/sheet.xml",true)?1:0;e:for(m=0;m!=u.Worksheets;++m){var y="sheet";if(B&&B[m]){g="xl/"+B[m][1].replace(/[\/]?xl\//,"");if(!we(e,g))g=B[m][1];if(!we(e,g))g=C.replace(/_rels\/.*$/,"")+B[m][1];y=B[m][2];}else{g="xl/worksheets/sheet"+(m+1-T)+"."+S;g=g.replace(/sheet0\./,"sheet.");}w=g.replace(/^(.*)(\/)([^\/]*)$/,"$1/_rels/$3.rels");if(r&&r.sheets!=null)switch(_typeof(r.sheets)){case"number":if(m!=r.sheets)continue e;break;case"string":if(u.SheetNames[m].toLowerCase()!=r.sheets.toLowerCase())continue e;break;default:if(Array.isArray&&Array.isArray(r.sheets)){var x=false;for(var A=0;A!=r.sheets.length;++A){if(typeof r.sheets[A]=="number"&&r.sheets[A]==m)x=1;if(typeof r.sheets[A]=="string"&&r.sheets[A].toLowerCase()==u.SheetNames[m].toLowerCase())x=1;}if(!x)continue e;};}Zm(e,g,w,u.SheetNames[m],m,b,i,y,r,c,f,l);}v={Directory:a,Workbook:c,Props:u,Custprops:d,Deps:p,Sheets:i,SheetNames:u.SheetNames,Strings:ch,Styles:l,Themes:f,SSF:O.get_table()};if(r&&r.bookFiles){if(e.files){v.keys=t;v.files=e.files;}else{v.keys=[];v.files={};e.FullPaths.forEach(function(r,t){r=r.replace(/^Root Entry[\/]/,"");v.keys.push(r);v.files[r]=e.FileIndex[t];});}}if(r&&r.bookVBA){if(a.vba.length>0)v.vbaraw=Ee(e,Jm(a.vba[0]),true);else if(a.defaults&&a.defaults.bin===Qo)v.vbaraw=Ee(e,"xl/vbaProject.bin",true);}return v;}function qm(e,r){var t=r||{};var a="Workbook",n=W.find(e,a);try{a="/!DataSpaces/Version";n=W.find(e,a);if(!n||!n.content)throw new Error("ECMA-376 Encrypted file missing "+a);Hf(n.content);a="/!DataSpaces/DataSpaceMap";n=W.find(e,a);if(!n||!n.content)throw new Error("ECMA-376 Encrypted file missing "+a);var i=Vf(n.content);if(i.length!==1||i[0].comps.length!==1||i[0].comps[0].t!==0||i[0].name!=="StrongEncryptionDataSpace"||i[0].comps[0].v!=="EncryptedPackage")throw new Error("ECMA-376 Encrypted file bad "+a);a="/!DataSpaces/DataSpaceInfo/StrongEncryptionDataSpace";n=W.find(e,a);if(!n||!n.content)throw new Error("ECMA-376 Encrypted file missing "+a);var s=Xf(n.content);if(s.length!=1||s[0]!="StrongEncryptionTransform")throw new Error("ECMA-376 Encrypted file bad "+a);a="/!DataSpaces/TransformInfo/StrongEncryptionTransform/!Primary";n=W.find(e,a);if(!n||!n.content)throw new Error("ECMA-376 Encrypted file missing "+a);jf(n.content);}catch(f){}a="/EncryptionInfo";n=W.find(e,a);if(!n||!n.content)throw new Error("ECMA-376 Encrypted file missing "+a);var l=Yf(n.content);a="/EncryptedPackage";n=W.find(e,a);if(!n||!n.content)throw new Error("ECMA-376 Encrypted file missing "+a);if(l[0]==4&&typeof decrypt_agile!=="undefined")return decrypt_agile(l[1],n.content,t.password||"",t);if(l[0]==2&&typeof decrypt_std76!=="undefined")return decrypt_std76(l[1],n.content,t.password||"",t);throw new Error("File is password-protected");}function eb(e,r){zo=1024;if(r.bookType=="ods")return Fm(e,r);if(e&&!e.SSF){e.SSF=O.get_table();}if(e&&e.SSF){D(O);O.load_table(e.SSF);r.revssf=J(e.SSF);r.revssf[e.SSF[65535]]=0;r.ssf=e.SSF;}r.rels={};r.wbrels={};r.Strings=[];r.Strings.Count=0;r.Strings.Unique=0;if(hh)r.revStrings=new Map();else{r.revStrings={};r.revStrings.foo=[];delete r.revStrings.foo;}var t=r.bookType=="xlsb"?"bin":"xml";var a=rc.indexOf(r.bookType)>-1;var n=Da();Km(r=r||{});var i=Te();var s="",f=0;r.cellXfs=[];mh(r.cellXfs,{},{revssf:{General:0}});if(!e.Props)e.Props={};s="docProps/core.xml";Ce(i,s,nn(e.Props,r));n.coreprops.push(s);Ga(r.rels,2,s,Ua.CORE_PROPS);s="docProps/app.xml";if(e.Props&&e.Props.SheetNames){}else if(!e.Workbook||!e.Workbook.Sheets)e.Props.SheetNames=e.SheetNames;else{var l=[];for(var o=0;o<e.SheetNames.length;++o){if((e.Workbook.Sheets[o]||{}).Hidden!=2)l.push(e.SheetNames[o]);}e.Props.SheetNames=l;}e.Props.Worksheets=e.Props.SheetNames.length;Ce(i,s,un(e.Props,r));n.extprops.push(s);Ga(r.rels,3,s,Ua.EXT_PROPS);if(e.Custprops!==e.Props&&K(e.Custprops||{}).length>0){s="docProps/custom.xml";Ce(i,s,pn(e.Custprops,r));n.custprops.push(s);Ga(r.rels,4,s,Ua.CUST_PROPS);}for(f=1;f<=e.SheetNames.length;++f){var c={"!id":{}};var u=e.Sheets[e.SheetNames[f-1]];var h=(u||{})["!type"]||"sheet";switch(h){case"chart":;default:s="xl/worksheets/sheet"+f+"."+t;Ce(i,s,cp(f-1,s,r,e,c));n.sheets.push(s);Ga(r.wbrels,-1,"worksheets/sheet"+f+"."+t,Ua.WS[0]);}if(u){var d=u["!comments"];var v=false;if(d&&d.length>0){var p="xl/comments"+f+"."+t;Ce(i,p,vp(d,p,r));n.comments.push(p);Ga(c,-1,"../comments"+f+"."+t,Ua.CMNT);v=true;}if(u["!legacy"]){if(v)Ce(i,"xl/drawings/vmlDrawing"+f+".vml",Ho(f,u["!comments"]));}delete u["!comments"];delete u["!legacy"];}if(c["!id"].rId1)Ce(i,za(s),Va(c));}if(r.Strings!=null&&r.Strings.length>0){s="xl/sharedStrings."+t;Ce(i,s,dp(r.Strings,s,r));n.strs.push(s);Ga(r.wbrels,-1,"sharedStrings."+t,Ua.SST);}s="xl/workbook."+t;Ce(i,s,op(e,s,r));n.workbooks.push(s);Ga(r.rels,1,s,Ua.WB);s="xl/theme/theme1.xml";Ce(i,s,Bo(e.Themes,r));n.themes.push(s);Ga(r.wbrels,-1,"theme/theme1.xml",Ua.THEME);s="xl/styles."+t;Ce(i,s,hp(e,s,r));n.styles.push(s);Ga(r.wbrels,-1,"styles."+t,Ua.STY);if(e.vbaraw&&a){s="xl/vbaProject.bin";Ce(i,s,e.vbaraw);n.vba.push(s);Ga(r.wbrels,-1,"vbaProject.bin",Ua.VBA);}Ce(i,"[Content_Types].xml",Ma(n,r));Ce(i,"_rels/.rels",Va(r.rels));Ce(i,"xl/_rels/workbook."+t+".rels",Va(r.wbrels));delete r.revssf;delete r.ssf;return i;}function rb(e,r){var t="";switch((r||{}).type||"base64"){case"buffer":return[e[0],e[1],e[2],e[3],e[4],e[5],e[6],e[7]];case"base64":t=g.decode(e.slice(0,12));break;case"binary":t=e;break;case"array":return[e[0],e[1],e[2],e[3],e[4],e[5],e[6],e[7]];default:throw new Error("Unrecognized type "+(r&&r.type||"undefined"));}return[t.charCodeAt(0),t.charCodeAt(1),t.charCodeAt(2),t.charCodeAt(3),t.charCodeAt(4),t.charCodeAt(5),t.charCodeAt(6),t.charCodeAt(7)];}function tb(e,r){if(W.find(e,"EncryptedPackage"))return qm(e,r);return Zp(e,r);}function ab(e,r){var t,a=e;var n=r||{};if(!n.type)n.type=w&&Buffer.isBuffer(e)?"buffer":"base64";t=ye(a,n);return Qm(t,n);}function nb(e,r){var t=0;e:while(t<e.length){switch(e.charCodeAt(t)){case 10:;case 13:;case 32:++t;break;case 60:return xp(e.slice(t),r);default:break e;}}return gf.to_workbook(e,r);}function ib(e,r){var t="",a=rb(e,r);switch(r.type){case"base64":t=g.decode(e);break;case"binary":t=e;break;case"buffer":t=e.toString("binary");break;case"array":t=oe(e);break;default:throw new Error("Unrecognized type "+r.type);}if(a[0]==239&&a[1]==187&&a[2]==191)t=Ye(t);return nb(t,r);}function sb(e,r){var t=e;if(r.type=="base64")t=g.decode(t);t=cptable.utils.decode(1200,t.slice(2),"str");r.type="binary";return nb(t,r);}function fb(e){return!e.match(/[^\x00-\x7F]/)?e:Ze(e);}function lb(e,r,t,a){if(a){t.type="string";return gf.to_workbook(e,t);}return gf.to_workbook(r,t);}function ob(e,r){o();var t=r||{};if(typeof ArrayBuffer!=="undefined"&&e instanceof ArrayBuffer)return ob(new Uint8Array(e),(t=ce(t),t.type="array",t));var a=e,n=[0,0,0,0],i=false;if(t.cellStyles){t.cellNF=true;t.sheetStubs=true;}uh={};if(t.dateNF)uh.dateNF=t.dateNF;if(!t.type)t.type=w&&Buffer.isBuffer(e)?"buffer":"base64";if(t.type=="file"){t.type=w?"buffer":"binary";a=j(e);}if(t.type=="string"){i=true;t.type="binary";t.codepage=65001;a=fb(e);}if(t.type=="array"&&typeof Uint8Array!=="undefined"&&e instanceof Uint8Array&&typeof ArrayBuffer!=="undefined"){var s=new ArrayBuffer(3),f=new Uint8Array(s);f.foo="bar";if(!f.foo){t=ce(t);t.type="array";return ob(A(a),t);}}switch((n=rb(a,t))[0]){case 208:if(n[1]===207&&n[2]===17&&n[3]===224&&n[4]===161&&n[5]===177&&n[6]===26&&n[7]===225)return tb(W.read(a,t),t);break;case 9:if(n[1]<=8)return Zp(a,t);break;case 60:return xp(a,t);case 73:if(n[1]===73&&n[2]===42&&n[3]===0)throw new Error("TIFF Image File is not a spreadsheet");if(n[1]===68)return wf(a,t);break;case 84:if(n[1]===65&&n[2]===66&&n[3]===76)return mf.to_workbook(a,t);break;case 80:return n[1]===75&&n[2]<9&&n[3]<9?ab(a,t):lb(e,a,t,i);case 239:return n[3]===60?xp(a,t):lb(e,a,t,i);case 255:if(n[1]===254){return sb(a,t);}break;case 0:if(n[1]===0&&n[2]>=2&&n[3]===0)return kf.to_workbook(a,t);break;case 3:;case 131:;case 139:;case 140:return vf.to_workbook(a,t);case 123:if(n[1]===92&&n[2]===114&&n[3]===116)return ll.to_workbook(a,t);break;case 10:;case 13:;case 32:return ib(a,t);case 137:if(n[1]===80&&n[2]===78&&n[3]===71)throw new Error("PNG Image File is not a spreadsheet");break;}if(vf.versions.indexOf(n[0])>-1&&n[2]<=12&&n[3]<=31)return vf.to_workbook(a,t);return lb(e,a,t,i);}function cb(e,r){var t=r||{};t.type="file";return ob(e,t);}function ub(e,r){switch(r.type){case"base64":;case"binary":break;case"buffer":;case"array":r.type="";break;case"file":return G(r.file,W.write(e,{type:w?"buffer":""}));case"string":throw new Error("'string' output type invalid for '"+r.bookType+"' files");default:throw new Error("Unrecognized type "+r.type);}return W.write(e,r);}function hb(e,r){var t=ce(r||{});var a=eb(e,t);var n={};if(t.compression)n.compression="DEFLATE";if(t.password)n.type=w?"nodebuffer":"string";else switch(t.type){case"base64":n.type="base64";break;case"binary":n.type="string";break;case"string":throw new Error("'string' output type invalid for '"+t.bookType+"' files");case"buffer":;case"file":n.type=w?"nodebuffer":"string";break;default:throw new Error("Unrecognized type "+t.type);}var i=a.FullPaths?W.write(a,{fileType:"zip",type:{nodebuffer:"buffer",string:"binary"}[n.type]||n.type}):a.generate(n);if(t.password&&typeof encrypt_agile!=="undefined")return ub(encrypt_agile(i,t.password),t);if(t.type==="file")return G(t.file,i);return t.type=="string"?Ye(i):i;}function db(e,r){var t=r||{};var a=Jp(e,t);return ub(a,t);}function vb(e,r,t){if(!t)t="";var a=t+e;switch(r.type){case"base64":return g.encode(Ze(a));case"binary":return Ze(a);case"string":return e;case"file":return G(r.file,a,"utf8");case"buffer":{if(w)return k(a,"utf8");else return vb(a,{type:"binary"}).split("").map(function(e){return e.charCodeAt(0);});};}throw new Error("Unrecognized type "+r.type);}function pb(e,r){switch(r.type){case"base64":return g.encode(e);case"binary":return e;case"string":return e;case"file":return G(r.file,e,"binary");case"buffer":{if(w)return k(e,"binary");else return e.split("").map(function(e){return e.charCodeAt(0);});};}throw new Error("Unrecognized type "+r.type);}function mb(e,r){switch(r.type){case"string":;case"base64":;case"binary":var t="";for(var a=0;a<e.length;++a){t+=String.fromCharCode(e[a]);}return r.type=="base64"?g.encode(t):r.type=="string"?Ye(t):t;case"file":return G(r.file,e);case"buffer":return e;default:throw new Error("Unrecognized type "+r.type);}}function bb(e,r){o();Pv(e);var t=ce(r||{});if(t.cellStyles){t.cellNF=true;t.sheetStubs=true;}if(t.type=="array"){t.type="binary";var a=bb(e,t);t.type="array";return T(a);}switch(t.bookType||"xlsb"){case"xml":;case"xlml":return vb(Hp(e,t),t);case"slk":;case"sylk":return vb(Lm(e,t),t);case"htm":;case"html":return vb(Pm(e,t),t);case"txt":return pb(Hm(e,t),t);case"csv":return vb(Nm(e,t),t,"\uFEFF");case"dif":return vb(Mm(e,t),t);case"dbf":return mb(Wm(e,t),t);case"prn":return vb(Um(e,t),t);case"rtf":return vb(zm(e,t),t);case"eth":return vb(Vm(e,t),t);case"fods":return vb(Fm(e,t),t);case"wk1":return mb(Xm(e,t),t);case"wk3":return mb(kf.book_to_wk3(e,t),t);case"biff2":if(!t.biff)t.biff=2;case"biff3":if(!t.biff)t.biff=3;case"biff4":if(!t.biff)t.biff=4;return mb(km(e,t),t);case"biff5":if(!t.biff)t.biff=5;case"biff8":;case"xla":;case"xls":if(!t.biff)t.biff=8;return db(e,t);case"xlsx":;case"xlsm":;case"xlam":;case"xlsb":;case"ods":return hb(e,t);default:throw new Error("Unrecognized bookType |"+t.bookType+"|");}}function gb(e){if(e.bookType)return;var r={xls:"biff8",htm:"html",slk:"sylk",socialcalc:"eth",Sh33tJS:"WTF"};var t=e.file.slice(e.file.lastIndexOf(".")).toLowerCase();if(t.match(/^\.[a-z]+$/))e.bookType=t.slice(1);e.bookType=r[e.bookType]||e.bookType;}function wb(e,r,t){var a=t||{};a.type="file";a.file=r;gb(a);return bb(e,a);}function kb(e,r,t,a){var n=t||{};n.type="file";n.file=e;gb(n);n.type="buffer";var i=a;if(!(i instanceof Function))i=t;return V.writeFile(e,bb(r,n),i);}function Eb(e,r,t,a,n,i,s,f){var l=lt(t);var o=f.defval,c=f.raw||!Object.prototype.hasOwnProperty.call(f,"raw");var u=true;var h=n===1?[]:{};if(n!==1){if(Object.defineProperty)try{Object.defineProperty(h,"__rowNum__",{value:t,enumerable:false});}catch(d){h.__rowNum__=t;}else h.__rowNum__=t;}if(!s||e[t])for(var v=r.s.c;v<=r.e.c;++v){var p=s?e[t][v]:e[a[v]+l];if(p===undefined||p.t===undefined){if(o===undefined)continue;if(i[v]!=null){h[i[v]]=o;}continue;}var m=p.v;switch(p.t){case"z":if(m==null)break;continue;case"e":m=m==0?null:void 0;break;case"s":;case"d":;case"b":;case"n":break;default:throw new Error("unrecognized type "+p.t);}if(i[v]!=null){if(m==null){if(p.t=="e"&&m===null)h[i[v]]=null;else if(o!==undefined)h[i[v]]=o;else if(c&&m===null)h[i[v]]=null;else continue;}else{h[i[v]]=c||f.rawNumbers&&p.t=="n"?m:St(p,m,f);}if(m!=null)u=false;}}return{row:h,isempty:u};}function Sb(e,r){if(e==null||e["!ref"]==null)return[];var t={t:"n",v:0},a=0,n=1,i=[],s=0,f="";var l={s:{r:0,c:0},e:{r:0,c:0}};var o=r||{};var c=o.range!=null?o.range:e["!ref"];if(o.header===1)a=1;else if(o.header==="A")a=2;else if(Array.isArray(o.header))a=3;else if(o.header==null)a=0;switch(_typeof(c)){case"string":l=kt(c);break;case"number":l=kt(e["!ref"]);l.s.r=c;break;default:l=c;}if(a>0)n=0;var u=lt(l.s.r);var h=[];var d=[];var v=0,p=0;var m=Array.isArray(e);var b=l.s.r,g=0,w=0;if(m&&!e[b])e[b]=[];for(g=l.s.c;g<=l.e.c;++g){h[g]=ht(g);t=m?e[b][g]:e[h[g]+u];switch(a){case 1:i[g]=g-l.s.c;break;case 2:i[g]=h[g];break;case 3:i[g]=o.header[g-l.s.c];break;default:if(t==null)t={w:"__EMPTY",t:"s"};f=s=St(t,null,o);p=0;for(w=0;w<i.length;++w){if(i[w]==f)f=s+"_"+ ++p;}i[g]=f;}}for(b=l.s.r+n;b<=l.e.r;++b){var k=Eb(e,l,b,h,a,i,m,o);if(k.isempty===false||(a===1?o.blankrows!==false:!!o.blankrows))d[v++]=k.row;}d.length=v;return d;}var _b=/"/g;function Cb(e,r,t,a,n,i,s,f){var l=true;var o=[],c="",u=lt(t);for(var h=r.s.c;h<=r.e.c;++h){if(!a[h])continue;var d=f.dense?(e[t]||[])[h]:e[a[h]+u];if(d==null)c="";else if(d.v!=null){l=false;c=""+(f.rawNumbers&&d.t=="n"?d.v:St(d,null,f));for(var v=0,p=0;v!==c.length;++v){if((p=c.charCodeAt(v))===n||p===i||p===34||f.forceQuotes){c='"'+c.replace(_b,'""')+'"';break;}}if(c=="ID")c='"ID"';}else if(d.f!=null&&!d.F){l=false;c="="+d.f;if(c.indexOf(",")>=0)c='"'+c.replace(_b,'""')+'"';}else c="";o.push(c);}if(f.blankrows===false&&l)return null;return o.join(s);}function Bb(e,r){var t=[];var a=r==null?{}:r;if(e==null||e["!ref"]==null)return"";var n=kt(e["!ref"]);var i=a.FS!==undefined?a.FS:",",s=i.charCodeAt(0);var f=a.RS!==undefined?a.RS:"\n",l=f.charCodeAt(0);var o=new RegExp((i=="|"?"\\|":i)+"+$");var c="",u=[];a.dense=Array.isArray(e);var h=a.skipHidden&&e["!cols"]||[];var d=a.skipHidden&&e["!rows"]||[];for(var v=n.s.c;v<=n.e.c;++v){if(!(h[v]||{}).hidden)u[v]=ht(v);}for(var p=n.s.r;p<=n.e.r;++p){if((d[p]||{}).hidden)continue;c=Cb(e,n,p,u,s,l,i,a);if(c==null){continue;}if(a.strip)c=c.replace(o,"");t.push(c+f);}delete a.dense;return t.join("");}function Tb(e,r){if(!r)r={};r.FS="\t";r.RS="\n";var t=Bb(e,r);if(typeof cptable=="undefined"||r.type=="string")return t;var a=cptable.utils.encode(1200,t,"str");return String.fromCharCode(255)+String.fromCharCode(254)+a;}function yb(e){var r="",t,a="";if(e==null||e["!ref"]==null)return[];var n=kt(e["!ref"]),i="",s=[],f;var l=[];var o=Array.isArray(e);for(f=n.s.c;f<=n.e.c;++f){s[f]=ht(f);}for(var c=n.s.r;c<=n.e.r;++c){i=lt(c);for(f=n.s.c;f<=n.e.c;++f){r=s[f]+i;t=o?(e[c]||[])[f]:e[r];a="";if(t===undefined)continue;else if(t.F!=null){r=t.F;if(!t.f)continue;a=t.f;if(r.indexOf(":")==-1)r=r+":"+r;}if(t.f!=null)a=t.f;else if(t.t=="z")continue;else if(t.t=="n"&&t.v!=null)a=""+t.v;else if(t.t=="b")a=t.v?"TRUE":"FALSE";else if(t.w!==undefined)a="'"+t.w;else if(t.v===undefined)continue;else if(t.t=="s")a="'"+t.v;else a=""+t.v;l[l.length]=r+"="+a;}}return l;}function xb(e,r,t){var a=t||{};var n=+!a.skipHeader;var i=e||{};var s=0,f=0;if(i&&a.origin!=null){if(typeof a.origin=="number")s=a.origin;else{var l=typeof a.origin=="string"?mt(a.origin):a.origin;s=l.r;f=l.c;}}var o;var c={s:{c:0,r:0},e:{c:f,r:s+r.length-1+n}};if(i["!ref"]){var u=kt(i["!ref"]);c.e.c=Math.max(c.e.c,u.e.c);c.e.r=Math.max(c.e.r,u.e.r);if(s==-1){s=u.e.r+1;c.e.r=s+r.length-1+n;}}else{if(s==-1){s=0;c.e.r=r.length-1+n;}}var h=a.header||[],d=0;r.forEach(function(e,r){K(e).forEach(function(t){if((d=h.indexOf(t))==-1)h[d=h.length]=t;var l=e[t];var c="z";var u="";var v=bt({c:f+d,r:s+r+n});o=Ib.sheet_get_cell(i,v);if(l&&_typeof(l)==="object"&&!(l instanceof Date)){i[v]=l;}else{if(typeof l=="number")c="n";else if(typeof l=="boolean")c="b";else if(typeof l=="string")c="s";else if(l instanceof Date){c="d";if(!a.cellDates){c="n";l=ee(l);}u=a.dateNF||O._table[14];}else if(l===null&&a.nullError){c="e";l=0;}if(!o)i[v]=o={t:c,v:l};else{o.t=c;o.v=l;delete o.w;delete o.R;if(u)o.z=u;}if(u)o.z=u;}});});c.e.c=Math.max(c.e.c,f+h.length-1);var v=lt(s);if(n)for(d=0;d<h.length;++d){i[ht(d+f)+v]={t:"s",v:h[d]};}i["!ref"]=wt(c);return i;}function Ab(e,r){return xb(null,e,r);}var Ib={encode_col:ht,encode_row:lt,encode_cell:bt,encode_range:wt,decode_col:ut,decode_row:ft,split_cell:pt,decode_cell:mt,decode_range:gt,format_cell:St,get_formulae:yb,make_csv:Bb,make_json:Sb,make_formulae:yb,sheet_add_aoa:Ct,sheet_add_json:xb,sheet_add_dom:Sm,aoa_to_sheet:Bt,json_to_sheet:Ab,table_to_sheet:_m,table_to_book:Cm,sheet_to_csv:Bb,sheet_to_txt:Tb,sheet_to_json:Sb,sheet_to_html:Em.from_sheet,sheet_to_formulae:yb,sheet_to_row_object_array:Sb};(function(e){e.consts=e.consts||{};function r(r){r.forEach(function(r){e.consts[r[0]]=r[1];});}function t(e,r,t){return e[r]!=null?e[r]:e[r]=t;}function a(e,r,t){if(typeof r=="string"){if(Array.isArray(e)){var n=mt(r);if(!e[n.r])e[n.r]=[];return e[n.r][n.c]||(e[n.r][n.c]={t:"z"});}return e[r]||(e[r]={t:"z"});}if(typeof r!="number")return a(e,bt(r));return a(e,bt({r:r,c:t||0}));}e.sheet_get_cell=a;function n(e,r){if(typeof r=="number"){if(r>=0&&e.SheetNames.length>r)return r;throw new Error("Cannot find sheet # "+r);}else if(typeof r=="string"){var t=e.SheetNames.indexOf(r);if(t>-1)return t;throw new Error("Cannot find sheet name |"+r+"|");}else throw new Error("Cannot find sheet |"+r+"|");}e.book_new=function(){return{SheetNames:[],Sheets:{}};};e.book_append_sheet=function(e,r,t){if(!t)for(var a=1;a<=65535;++a,t=undefined){if(e.SheetNames.indexOf(t="Sheet"+a)==-1)break;}if(!t||e.SheetNames.length>=65535)throw new Error("Too many worksheets");Ov(t);if(e.SheetNames.indexOf(t)>=0)throw new Error("Worksheet with name |"+t+"| already exists!");e.SheetNames.push(t);e.Sheets[t]=r;};e.book_set_sheet_visibility=function(e,r,a){t(e,"Workbook",{});t(e.Workbook,"Sheets",[]);var i=n(e,r);t(e.Workbook.Sheets,i,{});switch(a){case 0:;case 1:;case 2:break;default:throw new Error("Bad sheet visibility setting "+a);}e.Workbook.Sheets[i].Hidden=a;};r([["SHEET_VISIBLE",0],["SHEET_HIDDEN",1],["SHEET_VERY_HIDDEN",2]]);e.cell_set_number_format=function(e,r){e.z=r;return e;};e.cell_set_hyperlink=function(e,r,t){if(!r){delete e.l;}else{e.l={Target:r};if(t)e.l.Tooltip=t;}return e;};e.cell_set_internal_link=function(r,t,a){return e.cell_set_hyperlink(r,"#"+t,a);};e.cell_add_comment=function(e,r,t){if(!e.c)e.c=[];e.c.push({t:r,a:t||"SheetJS"});};e.sheet_set_array_formula=function(e,r,t){var n=typeof r!="string"?r:kt(r);var i=typeof r=="string"?r:wt(r);for(var s=n.s.r;s<=n.e.r;++s){for(var f=n.s.c;f<=n.e.c;++f){var l=a(e,s,f);l.t="n";l.F=i;delete l.v;if(s==n.s.r&&f==n.s.c)l.f=t;}}return e;};return e;})(Ib);if(w&&"function"!="undefined")(function(){var r={}.Readable;var t=function t(e,_t3){var a=r();var n=_t3==null?{}:_t3;if(e==null||e["!ref"]==null){a.push(null);return a;}var i=kt(e["!ref"]);var s=n.FS!==undefined?n.FS:",",f=s.charCodeAt(0);var l=n.RS!==undefined?n.RS:"\n",o=l.charCodeAt(0);var c=new RegExp((s=="|"?"\\|":s)+"+$");var u="",h=[];n.dense=Array.isArray(e);var d=n.skipHidden&&e["!cols"]||[];var v=n.skipHidden&&e["!rows"]||[];for(var p=i.s.c;p<=i.e.c;++p){if(!(d[p]||{}).hidden)h[p]=ht(p);}var m=i.s.r;var b=false;a._read=function(){if(!b){b=true;return a.push("\uFEFF");}while(m<=i.e.r){++m;if((v[m-1]||{}).hidden)continue;u=Cb(e,i,m-1,h,f,o,s,n);if(u!=null){if(n.strip)u=u.replace(c,"");a.push(u+l);break;}}if(m>i.e.r)return a.push(null);};return a;};var a=function a(e,t){var a=r();var n=t||{};var i=n.header!=null?n.header:Em.BEGIN;var s=n.footer!=null?n.footer:Em.END;a.push(i);var f=gt(e["!ref"]);n.dense=Array.isArray(e);a.push(Em._preamble(e,f,n));var l=f.s.r;var o=false;a._read=function(){if(l>f.e.r){if(!o){o=true;a.push("</table>"+s);}return a.push(null);}while(l<=f.e.r){a.push(Em._row(e,f,l,n));++l;break;}};return a;};var n=function n(e,t){var a=r({objectMode:true});if(e==null||e["!ref"]==null){a.push(null);return a;}var n={t:"n",v:0},i=0,s=1,f=[],l=0,o="";var c={s:{r:0,c:0},e:{r:0,c:0}};var u=t||{};var h=u.range!=null?u.range:e["!ref"];if(u.header===1)i=1;else if(u.header==="A")i=2;else if(Array.isArray(u.header))i=3;switch(_typeof(h)){case"string":c=kt(h);break;case"number":c=kt(e["!ref"]);c.s.r=h;break;default:c=h;}if(i>0)s=0;var d=lt(c.s.r);var v=[];var p=0;var m=Array.isArray(e);var b=c.s.r,g=0,w=0;if(m&&!e[b])e[b]=[];for(g=c.s.c;g<=c.e.c;++g){v[g]=ht(g);n=m?e[b][g]:e[v[g]+d];switch(i){case 1:f[g]=g-c.s.c;break;case 2:f[g]=v[g];break;case 3:f[g]=u.header[g-c.s.c];break;default:if(n==null)n={w:"__EMPTY",t:"s"};o=l=St(n,null,u);p=0;for(w=0;w<f.length;++w){if(f[w]==o)o=l+"_"+ ++p;}f[g]=o;}}b=c.s.r+s;a._read=function(){if(b>c.e.r)return a.push(null);while(b<=c.e.r){var r=Eb(e,c,b,v,i,f,m,u);++b;if(r.isempty===false||(i===1?u.blankrows!==false:!!u.blankrows)){a.push(r.row);break;}}};return a;};e.stream={to_json:n,to_html:a,to_csv:t};})();if(typeof Zp!=="undefined")e.parse_xlscfb=Zp;e.parse_zip=Qm;e.read=ob;e.readFile=cb;e.readFileSync=cb;e.write=bb;e.writeFile=wb;e.writeFileSync=wb;e.writeFileAsync=kb;e.utils=Ib;e.SSF=O;if(typeof W!=="undefined")e.CFB=W;}if(true)make_xlsx_lib(exports);else {}if(typeof window!=="undefined"&&!window.XLSX)window.XLSX=XLSX;var XLS=XLSX,ODS=XLSX;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../node_modules/buffer/index.js */ "../node_modules/buffer/index.js").Buffer, __webpack_require__(/*! ./../../node_modules/webpack/buildin/global.js */ "../node_modules/webpack/buildin/global.js"), __webpack_require__(/*! ./../../node_modules/process/browser.js */ "../node_modules/process/browser.js")))

/***/ }),

/***/ "./format-values.js":
/*!**************************!*\
  !*** ./format-values.js ***!
  \**************************/
/*! exports provided: getValueFormats, getValueFormat */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getValueFormats", function() { return getGrafanaFormats; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getValueFormat", function() { return getGrafanaFormat; });
/* harmony import */ var _grafana_data__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @grafana/data */ "@grafana/data");
/* harmony import */ var _grafana_data__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_grafana_data__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _external_YourJS_min__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./external/YourJS.min */ "./external/YourJS.min.js");
/* harmony import */ var _external_YourJS_min__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_external_YourJS_min__WEBPACK_IMPORTED_MODULE_1__);

 // Add our custom CHC functionality to the list of unit formats.

var GRAFANA_FORMATS = Object(_grafana_data__WEBPACK_IMPORTED_MODULE_0__["getValueFormats"])().concat([{
  text: 'Advanced (CHC)',
  submenu: [{
    text: 'Custom Date Format',
    value: 'dateTimeYourJS'
  }]
}]);

function getGrafanaFormats() {
  return GRAFANA_FORMATS;
}

function getGrafanaFormat(formatName) {
  return formatName === 'dateTimeYourJS' ? function (date, format) {
    return {
      text: _external_YourJS_min__WEBPACK_IMPORTED_MODULE_1__["formatDate"](date, format || '')
    };
  } : Object(_grafana_data__WEBPACK_IMPORTED_MODULE_0__["getValueFormat"])(formatName);
}



/***/ }),

/***/ "./helper-functions.js":
/*!*****************************!*\
  !*** ./helper-functions.js ***!
  \*****************************/
/*! exports provided: toCSV, parseRegExp, pseudoCssToJSON, getCellValue, getHtmlText, term, parseLocalDate, parseOptionalNumber, offsetByTZ, toLocalDateString, saveXLSX */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "toCSV", function() { return toCSV; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "parseRegExp", function() { return parseRegExp; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "pseudoCssToJSON", function() { return pseudoCssToJSON; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getCellValue", function() { return getCellValue; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getHtmlText", function() { return getHtmlText; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "term", function() { return term; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "parseLocalDate", function() { return parseLocalDate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "parseOptionalNumber", function() { return parseOptionalNumber; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "offsetByTZ", function() { return offsetByTZ; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "toLocalDateString", function() { return toLocalDateString; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "saveXLSX", function() { return saveXLSX; });
/* harmony import */ var _external_YourJS_min__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./external/YourJS.min */ "./external/YourJS.min.js");
/* harmony import */ var _external_YourJS_min__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_external_YourJS_min__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _format_values__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./format-values */ "./format-values.js");
/* harmony import */ var _external_xlsx_core_min__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./external/xlsx.core.min */ "./external/xlsx.core.min.js");
/* harmony import */ var _external_xlsx_core_min__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_external_xlsx_core_min__WEBPACK_IMPORTED_MODULE_2__);
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }




var RGX_CELL_PLACEHOLDER = /\$\{(time)(?:-(to|from))?\}|\$\{(?:(value|cell|0|[1-9]\d*)|(col|join-col|var):((?:[^\}:\\]*|\\.)+))(?::(?:(raw)|(escape)|(param)(?::((?:[^\}:\\]*|\\.)+))?))?\}/g;
var RGX_OLD_VAR_WORKAROUND = /([\?&])var-(\$\{var:(?:[^\}:\\]*|\\.)+:param\})/g;
var RGX_ESCAPED_CHARS = /\\(.)/g;
var RGX_LOOSE_DATE = /^(\d{4})-(\d\d?)-(\d\d?)(?:(?:T|\s+)(\d\d?):(\d\d?)(?::(\d\d?)(?:\.(\d\d?\d?))?)?)?$/;
var LOCAL_TZ_OFFSET = new Date().getTimezoneOffset();
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
  var RGX_DELIMIT = delimiter === ',' ? /[",\n\r]/ : new RegExp('["\r\n' + _external_YourJS_min__WEBPACK_IMPORTED_MODULE_0__["quoteRegExp"](delimiter) + ']');
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
  opt_tzOffset = opt_tzOffset == null ? LOCAL_TZ_OFFSET : opt_tzOffset;
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
    if (ctrl.panel.tzOffsetType) {
      tzOffsetType = ctrl.panel.tzOffsetType;
      tzOffset = ctrl.panel.tzOffset;
    } // Do not apply another offset if global offset was used on receiving the data.


    var date = tzOffsetType ? offsetByTZ(cell, tzOffsetType === 'TIMEZONE' ? tzOffset : tzOffsetType === 'NO-TIMEZONE' ? LOCAL_TZ_OFFSET : -LOCAL_TZ_OFFSET) : new Date(cell);
    matches.value = Object(_format_values__WEBPACK_IMPORTED_MODULE_1__["getValueFormat"])(unitFormat)(date, unitFormatString).text;
  } else {
    matches.value = matches.cell = !['none', null, void 0].includes(unitFormat) && 'number' === typeof cell ? Object(_format_values__WEBPACK_IMPORTED_MODULE_1__["getValueFormat"])(unitFormat)(cell, unitFormatDecimals, null).text : cell;
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

function parseLocalDate(strDate, opt_ctrl, opt_negateTzOffset) {
  var match = RGX_LOOSE_DATE.exec(strDate);

  if (match) {
    var date = new Date(+match[1], +match[2] - 1, +match[3], +match[4] || 0, +match[5] || 0, +match[6] || 0, +match[7] || 0);
    date.actual = opt_ctrl && opt_ctrl.panel.tzOffsetType ? offsetByTZ(date, (opt_negateTzOffset ? -1 : 1) * (opt_ctrl.panel.tzOffsetType === 'TIMEZONE' ? opt_ctrl.panel.tzOffset : opt_ctrl.panel.tzOffsetType === 'NO-TIMEZONE' ? LOCAL_TZ_OFFSET : -LOCAL_TZ_OFFSET)) : date;
    return date;
  }
}

function toLocalDateString(date) {
  return date && _external_YourJS_min__WEBPACK_IMPORTED_MODULE_0__["formatDate"](date, 'YYYY-MM-DD HH:mm:ss');
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
/**
 * Always returns the same value unless this is an object of some sort or this
 * is a formula string.
 * @see https://docs.sheetjs.com/
 * @param {any} value
 * @returns {any}
 */


function _parseXLSXValue(value) {
  var typeName;

  if (value instanceof Date || (typeName = _typeof(value)) === 'bigint' || typeName === 'number') {
    return value;
  }

  value = [value] + '';
  return /^=\w+\(/.test(value) ? {
    f: value.slice(1)
  } // Makes sure that numbers are represented correctly.
  : /^-?(?:[1-9]\d*|0)(?:\.\d+)?$/.test(value) ? +value : value;
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
  var fileName = settings.fileName,
      worksheets = settings.worksheets;
  var wb = _external_xlsx_core_min__WEBPACK_IMPORTED_MODULE_2__["utils"].book_new(); // Parses the worksheet objects that were passed in and adds them to wb.

  worksheets.forEach(function (_ref, worksheetIndex) {
    var _headers;

    var name = _ref.name,
        rows = _ref.rows,
        headers = _ref.headers;
    var prependHeaders = !!headers; // Keeps track of the index of each header (AKA key).

    var indexOfKeys = ((_headers = headers) !== null && _headers !== void 0 ? _headers : headers = []).reduce(function (indexOfKeys, k, i) {
      return Object.assign(indexOfKeys, _defineProperty({}, k, i));
    }, {}); // Indicates of the first non-empty row is an array or an object to figure
    // out how to process the rows.

    var firstNonEmptyRow = rows.find(function (row) {
      return (Array.isArray(row) ? row : Object.keys(row)).length;
    }); // If this is an array of arrays just make sure that rows is an array of
    // arrays.

    if (Array.isArray(firstNonEmptyRow)) {
      rows = rows.map(function (r) {
        return r.map(_parseXLSXValue);
      });
    } // If this is an array of objects get rows as an array of arrays and make
    // sure to add any headers that are missing to the `headers` array.
    else {
        prependHeaders = true;
        rows = rows.map(function (row) {
          var newRow = [];

          for (var _i = 0, _Object$entries = Object.entries(row); _i < _Object$entries.length; _i++) {
            var _Object$entries$_i = _slicedToArray(_Object$entries[_i], 2),
                key = _Object$entries$_i[0],
                value = _Object$entries$_i[1];

            var keyIndex = indexOfKeys[key];

            if ('number' !== typeof keyIndex) {
              indexOfKeys[key] = keyIndex = headers.push(key) - 1;
            }

            newRow[keyIndex] = _parseXLSXValue(value);
          }

          return newRow;
        });
      } // If `headers` was defined or `rows` was an array of objects then make sure
    // the first row is the array of headers.


    if (prependHeaders) {
      rows = [headers].concat(rows);
    } // Add this new worksheet to the workbook.


    _external_xlsx_core_min__WEBPACK_IMPORTED_MODULE_2__["utils"].book_append_sheet(wb, _external_xlsx_core_min__WEBPACK_IMPORTED_MODULE_2__["utils"].aoa_to_sheet(rows), name !== null && name !== void 0 ? name : "Sheet".concat(worksheetIndex + 1));
  });
  var wbOut = _external_xlsx_core_min__WEBPACK_IMPORTED_MODULE_2__["write"](wb, {
    bookType: 'xlsx',
    bookSST: true,
    type: 'binary'
  });
  var wbOutBin64 = btoa(wbOut);
  Object.assign(document.createElement('a'), {
    href: "data:;base64,".concat(wbOutBin64),
    download: fileName !== null && fileName !== void 0 ? fileName : "workbook-".concat(new Date().toJSON(), ".xlsx")
  }).click();
}



/***/ }),

/***/ "./module.ts":
/*!*******************!*\
  !*** ./module.ts ***!
  \*******************/
/*! exports provided: DataTablePanelCtrl, PanelCtrl */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DataTablePanelCtrl", function() { return DataTablePanelCtrl; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PanelCtrl", function() { return DataTablePanelCtrl; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../node_modules/tslib/tslib.es6.js");
/* harmony import */ var grafana_app_plugins_sdk__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! grafana/app/plugins/sdk */ "grafana/app/plugins/sdk");
/* harmony import */ var grafana_app_plugins_sdk__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(grafana_app_plugins_sdk__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _format_values__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./format-values */ "./format-values.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! lodash */ "lodash");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _external_YourJS_min__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./external/YourJS.min */ "./external/YourJS.min.js");
/* harmony import */ var _external_YourJS_min__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_external_YourJS_min__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _external_FileSaver_min_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./external/FileSaver.min.js */ "./external/FileSaver.min.js");
/* harmony import */ var _external_FileSaver_min_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_external_FileSaver_min_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _helper_functions__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./helper-functions */ "./helper-functions.js");
/* harmony import */ var _external_datatables_js_jquery_dataTables_min__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./external/datatables/js/jquery.dataTables.min */ "./external/datatables/js/jquery.dataTables.min.js");
/* harmony import */ var _external_datatables_js_jquery_dataTables_min__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_external_datatables_js_jquery_dataTables_min__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _external_datatables_js_dataTables_fixedHeader_min__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./external/datatables/js/dataTables.fixedHeader.min */ "./external/datatables/js/dataTables.fixedHeader.min.js");
/* harmony import */ var _external_datatables_js_dataTables_fixedHeader_min__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_external_datatables_js_dataTables_fixedHeader_min__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _external_datatables_js_dataTables_buttons_min__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./external/datatables/js/dataTables.buttons.min */ "./external/datatables/js/dataTables.buttons.min.js");
/* harmony import */ var _external_datatables_js_dataTables_buttons_min__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(_external_datatables_js_dataTables_buttons_min__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var _external_datatables_css_jquery_dataTables_min_css__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./external/datatables/css/jquery.dataTables.min.css */ "./external/datatables/css/jquery.dataTables.min.css");
/* harmony import */ var _external_datatables_css_jquery_dataTables_min_css__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(_external_datatables_css_jquery_dataTables_min_css__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var _external_datatables_css_fixedHeader_dataTables_min_css__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./external/datatables/css/fixedHeader.dataTables.min.css */ "./external/datatables/css/fixedHeader.dataTables.min.css");
/* harmony import */ var _external_datatables_css_fixedHeader_dataTables_min_css__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(_external_datatables_css_fixedHeader_dataTables_min_css__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var _external_datatables_css_buttons_dataTables_min_css__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./external/datatables/css/buttons.dataTables.min.css */ "./external/datatables/css/buttons.dataTables.min.css");
/* harmony import */ var _external_datatables_css_buttons_dataTables_min_css__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(_external_datatables_css_buttons_dataTables_min_css__WEBPACK_IMPORTED_MODULE_12__);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! jquery */ "jquery");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_13___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_13__);














var PARTIALS_BASE_PATH = 'public/plugins/copperhill-datatables-panel/partials/';
var RGX_SIMPLE_NUMBER = /^\d+(\.\d+)?$/;

var DataTablePanelCtrl =
/** @class */
function (_super) {
  Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"])(DataTablePanelCtrl, _super);

  function DataTablePanelCtrl($scope, $injector, $rootScope) {
    var _this = _super.call(this, $scope, $injector) || this;

    _this.$rootScope = $rootScope; // Make sure old versions have this value set to false.

    if (!lodash__WEBPACK_IMPORTED_MODULE_3___default.a.has(_this.panel, 'allowRedrawOnModify')) {
      _this.panel.allowRedrawOnModify = false;
    }

    lodash__WEBPACK_IMPORTED_MODULE_3___default.a.defaultsDeep(_this.panel, DataTablePanelCtrl.DEFAULT_PANEL_SETTINGS);

    _this.events.on('init-edit-mode', _this.onInitEditMode.bind(_this));

    _this.events.on('data-received', _this.onDataReceived.bind(_this));

    _this.events.on('data-snapshot-load', _this.onDataReceived.bind(_this));

    _this.events.on('data-error', _this.onDataError.bind(_this));

    _this.events.on('init-panel-actions', _this.onInitPanelActions.bind(_this));

    _this.events.on('render', _this.onPanelSizeChanged.bind(_this));

    _this.events.on('view-mode-changed', _this.draw.bind(_this));

    _this.events.on('panel-teardown', _this.onDataTablePanelTeardown.bind(_this));

    jquery__WEBPACK_IMPORTED_MODULE_13___default.a.fn.dataTable.ext.search.push(_this.filterDataTable.bind(_this));
    return _this;
  }

  DataTablePanelCtrl.prototype.filterDataTable = function (settings, data, rowIndex, originalData) {
    return arguments.length === 0 ? this : this.panel.allowFiltering ? originalData.isProcessed ? this.columns.every(function (column, columnIndex) {
      var _a;

      var filter = column.filter;
      return !column.visible || ((_a = column === null || column === void 0 ? void 0 : column.colDef) === null || _a === void 0 ? void 0 : _a.isSearchable) === false || !filter || filter.ignore || filter.test(originalData[columnIndex].value);
    }) : this.columns.every(function (column, columnIndex) {
      var _a;

      var filter = column.filter;
      return !column.visible || ((_a = column === null || column === void 0 ? void 0 : column.colDef) === null || _a === void 0 ? void 0 : _a.isSearchable) === false || !filter || filter.ignore || filter.test(originalData[columnIndex]);
    }) : true;
  };

  DataTablePanelCtrl.prototype.drawIfChanged = function () {
    if (this.panelJSON !== this.getPanelSettingsJSON()) {
      this.draw();
    }
  };

  DataTablePanelCtrl.prototype.getPanelSettingsJSON = function (spacing) {
    var panel = this.panel;
    return JSON.stringify(panel, function (key, value) {
      return this !== panel || lodash__WEBPACK_IMPORTED_MODULE_3___default.a.has(DataTablePanelCtrl.DEFAULT_PANEL_SETTINGS, key) ? value : undefined;
    }, spacing);
  };

  DataTablePanelCtrl.prototype.onDataTablePanelTeardown = function () {
    var search = jquery__WEBPACK_IMPORTED_MODULE_13___default.a.fn.dataTable.ext.search;

    for (var i = search.length; i--;) {
      if (search[i]() === this) {
        search.splice(i, 1);
      }
    }
  };

  DataTablePanelCtrl.prototype.onPanelSizeChanged = function () {
    this.fixDataTableSize();
  };

  DataTablePanelCtrl.prototype.onInitEditMode = function () {
    this.addEditorTab('Table View', PARTIALS_BASE_PATH + "refresh-view.html", 1);
    this.addEditorTab('Variable Columns', PARTIALS_BASE_PATH + "var-cols.html", 2);
    this.addEditorTab('Editor', PARTIALS_BASE_PATH + "editor.html", 3);
    this.addEditorTab('Column Definitions', PARTIALS_BASE_PATH + "column-defs.html", 4);
    this.addEditorTab('Styles', PARTIALS_BASE_PATH + "styles.html", 5);
    this.addEditorTab('Table View', PARTIALS_BASE_PATH + "refresh-view.html", 6);
  };

  DataTablePanelCtrl.prototype.onInitPanelActions = function (actions) {
    actions.push({
      icon: 'fa fa-download',
      text: "Download As\u2026",
      click: 'ctrl.showDownloadModal()'
    });
  };

  DataTablePanelCtrl.prototype.onDataError = function () {
    this.draw();
  };

  DataTablePanelCtrl.prototype.onDataReceived = function (dataList) {
    // let { tzOffsetType, tzOffset } = this.panel;
    // const LOCAL_TZ_OFFSET = (new Date).getTimezoneOffset();
    if (dataList && dataList.length) {
      dataList.forEach(function (data) {
        data.isReal = true;
        data.rows.forEach(function (cells) {
          cells.forEach(function (cell, cellIndex) {
            if (/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\dZ$/.test(cell)) {
              cells[cellIndex] = new Date(cell);
            }
          });
        });
      });
      this.dataList = dataList;
      this.updateDataListOptions();
    } else {
      var EXTRA_COLS_1 = 2;
      this.dataList = [{
        columns: [{
          text: 'X'
        }, {
          text: 'X * X'
        }, {
          text: 'X + X'
        }].concat(lodash__WEBPACK_IMPORTED_MODULE_3___default.a.range(EXTRA_COLS_1).map(function (y) {
          return {
            text: y + " / Math.random()"
          };
        })),
        rows: lodash__WEBPACK_IMPORTED_MODULE_3___default.a.range(150).map(function (x) {
          return [x, x * x, x + x].concat(lodash__WEBPACK_IMPORTED_MODULE_3___default.a.range(EXTRA_COLS_1).map(function (y) {
            return y / Math.random();
          }));
        }),
        isReal: false,
        type: 'table'
      }];
    }

    this.draw();
  };

  DataTablePanelCtrl.prototype.getConstByName = function (name) {
    if (/^[A-Z_][A-Z_0-9]*$/.test(name)) {
      return DataTablePanelCtrl[name];
    }
  };

  DataTablePanelCtrl.prototype.addColumnDef = function () {
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
  };

  DataTablePanelCtrl.prototype.moveColumnDef = function (columnDef, offset) {
    var columnDefs = this.panel.columnDefs;
    var colDefIndex = columnDefs.indexOf(columnDef);
    var newColDefIndex = colDefIndex + offset;

    if (0 <= newColDefIndex && newColDefIndex < columnDefs.length) {
      columnDefs.splice(colDefIndex, 1);
      columnDefs.splice(newColDefIndex, 0, columnDef);
    }
  };

  DataTablePanelCtrl.prototype.removeColumnDef = function (columnDef) {
    var columnDefs = this.panel.columnDefs;
    columnDefs.splice(columnDefs.indexOf(columnDef), 1);
  };

  DataTablePanelCtrl.prototype.addColumnContentRule = function (columnDef) {
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
        placement: DataTablePanelCtrl.TOOLTIP_PLACEMENTS[0].id
      }
    });
  };

  DataTablePanelCtrl.prototype.removeColumnContentRule = function (contentRule, columnDef) {
    var contentRules = columnDef.contentRules;
    contentRules.splice(contentRules.indexOf(contentRule), 1);
  };

  DataTablePanelCtrl.prototype.updateDataListOptions = function () {
    this.dataListOptions = [{}].concat(this.dataList).map(function (x, i) {
      return {
        id: i ? x.refId : null,
        text: i ? x.refId : '--- NONE ---'
      };
    });
  };

  DataTablePanelCtrl.prototype.getPageLengthOptions = function () {
    return this.panel.pageLengths.replace(/\s+/g, '').split(',').reduce(function (arr, x) {
      if (+x === parseInt(x, 10) && +x >= -1) {
        x = +x === -1 ? Infinity : +x;
        arr.push({
          value: x,
          text: x === Infinity ? 'All' : x
        });
      }

      return arr;
    }, []);
  };

  DataTablePanelCtrl.prototype.showDownloadModal = function () {
    var FILE_NAME_PATTERN = "<TITLE> (YYYY-MM-DD 'at' H.mm.ss)";
    var ctrl = this;
    ctrl.publishAppEvent('show-modal', {
      src: PARTIALS_BASE_PATH + "modal-export.html",
      scope: lodash__WEBPACK_IMPORTED_MODULE_3___default.a.extend(ctrl.$scope.$new(true), {
        fileNamePattern: FILE_NAME_PATTERN,
        fileNamePatternPlaceholder: FILE_NAME_PATTERN,
        EXPORT_TYPES: [{
          value: 'CSV',
          text: 'CSV (Comma-separated values)'
        }, {
          value: 'JSON',
          text: 'JSON (JavaScript Object Notation)'
        }, {
          value: 'PSV',
          text: 'PSV (Pipe-separated values)'
        }, {
          value: 'TSV',
          text: 'TSV (Tab-separated values)'
        }, {
          value: 'XLSX',
          text: 'XLSX Workbook (Data Only)'
        }],
        exportType: 'CSV',
        getFileName: function getFileName() {
          return ctrl.getFileName(this.fileNamePattern, this.exportType);
        },
        download: function download(downloadAllData) {
          if (this.exportType === 'CSV') {
            ctrl.exportCSV(downloadAllData, this.fileNamePattern);
          } else if (this.exportType === 'JSON') {
            ctrl.exportJSON(downloadAllData, this.fileNamePattern);
          } else if (this.exportType === 'PSV') {
            ctrl.exportCSV(downloadAllData, this.fileNamePattern, {
              delimiter: '|',
              ext: 'psv'
            });
          } else if (this.exportType === 'TSV') {
            ctrl.exportCSV(downloadAllData, this.fileNamePattern, {
              delimiter: '\t',
              ext: 'tsv'
            });
          } else if (this.exportType === 'XLSX') {
            ctrl.exportXLSX(downloadAllData, this.fileNamePattern);
          }
        }
      }),
      modalClass: 'modal-confirm'
    });
  };

  DataTablePanelCtrl.prototype.exportData = function (exportAllData) {
    var header,
        rows,
        data = this.getData(),
        columns = data.columns;

    if (exportAllData) {
      header = this.dataTable.columns().header().toArray().map(function (x) {
        return x.innerText;
      });
      rows = Array.from(this.dataTable.data());
    } else {
      var exportedData = this.dataTable.buttons.exportData();
      header = exportedData.header;
      rows = exportedData.body;
    }

    return {
      header: header,
      rows: rows,
      data: data,
      columns: columns
    };
  };

  DataTablePanelCtrl.prototype.exportJSON = function (exportAllData, fileNamePattern) {
    var _a = this.exportData(exportAllData),
        columns = _a.columns,
        data = _a.data,
        header = _a.header,
        rows = _a.rows;

    var HEADER_TEXTS = columns.filter(function (c) {
      return c.visible;
    }).map(function (c) {
      return Object(_helper_functions__WEBPACK_IMPORTED_MODULE_6__["getHtmlText"])(c.html);
    });
    this.processRows(rows, columns, header, this.getVarsByName());
    rows = rows.map(function (row) {
      return row.reduce(function (objRow, cell, cellIndex) {
        if (cell.visible) {
          objRow[HEADER_TEXTS[cellIndex]] = Object(_helper_functions__WEBPACK_IMPORTED_MODULE_6__["getHtmlText"])(cell.html);
        }

        return objRow;
      }, {});
    });
    var blob = new Blob([JSON.stringify({
      headers: HEADER_TEXTS,
      rows: rows
    })], {
      type: 'application/json;charset=utf-8'
    });
    Object(_external_FileSaver_min_js__WEBPACK_IMPORTED_MODULE_5__["saveAs"])(blob, this.getFileName(fileNamePattern, 'json'));
  };

  DataTablePanelCtrl.prototype.exportCSV = function (exportAllData, fileNamePattern, opt_options) {
    opt_options = Object(opt_options);

    var _a = this.exportData(exportAllData),
        columns = _a.columns,
        data = _a.data,
        header = _a.header,
        rows = _a.rows;

    this.processRows(rows, columns, header, this.getVarsByName());
    var csvText = Object(_helper_functions__WEBPACK_IMPORTED_MODULE_6__["toCSV"])(rows.map(function (row) {
      return row.reduce(function (carry, cell) {
        if (cell.visible) {
          carry.push(Object(_helper_functions__WEBPACK_IMPORTED_MODULE_6__["getHtmlText"])(cell.html));
        }

        return carry;
      }, []);
    }), lodash__WEBPACK_IMPORTED_MODULE_3___default.a.extend({
      headers: columns.reduce(function (carry, col) {
        if (col.visible) {
          carry.push(Object(_helper_functions__WEBPACK_IMPORTED_MODULE_6__["getHtmlText"])(col.html));
        }

        return carry;
      }, [])
    }, Object(opt_options)));
    var ext = (opt_options.ext || 'csv').toLowerCase();
    var mimeType = 'text/' + (ext === 'tsv' ? 'tab-separated-values' : ext);
    var blob = new Blob([csvText], {
      type: mimeType + ";charset=utf-8"
    });
    Object(_external_FileSaver_min_js__WEBPACK_IMPORTED_MODULE_5__["saveAs"])(blob, this.getFileName(fileNamePattern, ext));
  };

  DataTablePanelCtrl.prototype.exportXLSX = function (exportAllData, fileNamePattern) {
    var _a = this.exportData(exportAllData),
        columns = _a.columns,
        data = _a.data,
        header = _a.header,
        rows = _a.rows;

    this.processRows(rows, columns, header, this.getVarsByName());
    Object(_helper_functions__WEBPACK_IMPORTED_MODULE_6__["saveXLSX"])({
      fileName: this.getFileName(fileNamePattern, 'xlsx'),
      worksheets: [{
        name: 'Main',
        headers: columns.reduce(function (carry, col) {
          if (col.visible) {
            carry.push(Object(_helper_functions__WEBPACK_IMPORTED_MODULE_6__["getHtmlText"])(col.html));
          }

          return carry;
        }, []),
        rows: rows.map(function (row) {
          return row.reduce(function (carry, cell) {
            if (cell.visible) {
              carry.push(Object(_helper_functions__WEBPACK_IMPORTED_MODULE_6__["getHtmlText"])(cell.html));
            }

            return carry;
          }, []);
        })
      }]
    });
  };

  DataTablePanelCtrl.prototype.getFileName = function (pattern, ext) {
    var _this = this;

    var title = this.panel.title;
    return pattern.replace(/<(TITLE|DASHBOARD|PANEL)>|[^<]+|</g, function (match, source) {
      return source ? source === 'TITLE' ? _this.panel.title || _this.dashboard.title : _this[source.toLowerCase()].title : _external_YourJS_min__WEBPACK_IMPORTED_MODULE_4__["formatDate"](new Date(), match);
    }) + '.' + ext.toLowerCase();
  };

  DataTablePanelCtrl.prototype.getVarsByName = function () {
    return this.templateSrv.variables.reduce(function (carry, variable) {
      // At times current.value is a string and at times it is an array.
      var varValues = _external_YourJS_min__WEBPACK_IMPORTED_MODULE_4__["toArray"](variable.current.value);
      var isAll = variable.includeAll && varValues.length === 1 && varValues[0] === '$__all';
      carry[variable.name] = isAll ? [variable.current.text] : varValues;
      return carry;
    }, {});
  };

  DataTablePanelCtrl.prototype.drawDataTable = function (data) {
    var ctrl = this;
    var panel = ctrl.panel;
    var jElem = ctrl.panelElement;
    var height = jElem.height();
    var columns = ctrl.columns = data.columns;
    var rows = data.rows;
    var varsByName = ctrl.getVarsByName();
    var domTable = {
      _: 'table',
      style: {}
    };

    if (panel.isFullWidth) {
      domTable.style.width = '100%';
    }

    var table = _external_YourJS_min__WEBPACK_IMPORTED_MODULE_4__["dom"](domTable);
    var jTable = jquery__WEBPACK_IMPORTED_MODULE_13___default()(table).appendTo(jElem.html(''));
    var headers = data.headers;
    var dataTableOpts = {
      columns: columns.map(function (column, colIndex) {
        var result = {
          title: Object(_helper_functions__WEBPACK_IMPORTED_MODULE_6__["getHtmlText"])(column.html),
          visible: column.visible
        };
        var colDef = column.colDef;

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
      headerCallback: function headerCallback(tr) {
        var thIndex = 0; // Loop through each column...

        columns.forEach(function (col, colIndex) {
          if (col.visible) {
            var jTH = jquery__WEBPACK_IMPORTED_MODULE_13___default()('>th', tr).eq(thIndex++).html(col.html);

            if (panel.allowFiltering && (!col.colDef || col.colDef.isSearchable)) {
              var filter_1 = col.filter;

              var colDataType_1 = lodash__WEBPACK_IMPORTED_MODULE_3___default.a.get(filter_1, 'dataType', 'String');

              var showFilterModal_1 = function showFilterModal_1(e) {
                e && e.stopPropagation();
                var ID_SUFFIX = +new Date();

                var filterCopy = lodash__WEBPACK_IMPORTED_MODULE_3___default.a.extend(lodash__WEBPACK_IMPORTED_MODULE_3___default.a.cloneDeep(filter_1), {
                  minDate: Object(_helper_functions__WEBPACK_IMPORTED_MODULE_6__["toLocalDateString"])(filter_1.minDate),
                  maxDate: Object(_helper_functions__WEBPACK_IMPORTED_MODULE_6__["toLocalDateString"])(filter_1.maxDate)
                });

                ctrl.publishAppEvent('show-modal', {
                  src: PARTIALS_BASE_PATH + "modal-column-filter.html",
                  scope: lodash__WEBPACK_IMPORTED_MODULE_3___default.a.extend(ctrl.$scope.$new(true), {
                    isEditing: ctrl.dashboard.meta.isEditing,
                    column: lodash__WEBPACK_IMPORTED_MODULE_3___default.a.cloneDeep(col),
                    columnDataType: colDataType_1,
                    ID_SUFFIX: ID_SUFFIX,
                    filter: filterCopy,
                    resetFilter: function resetFilter() {
                      this.dismiss();
                      showFilterModal_1();
                    },
                    saveFilter: function saveFilter() {
                      var scopeFilter = this;
                      var ignore;

                      if (colDataType_1 === 'Date' || colDataType_1 === 'Number' || colDataType_1 === 'BigInt') {
                        if (colDataType_1 === 'Date') {
                          filter_1.minDate = Object(_helper_functions__WEBPACK_IMPORTED_MODULE_6__["parseLocalDate"])(scopeFilter.filter.minDate, ctrl, true);
                          filter_1.maxDate = Object(_helper_functions__WEBPACK_IMPORTED_MODULE_6__["parseLocalDate"])(scopeFilter.filter.maxDate, ctrl, true);
                        } else {
                          filter_1.minNum = Object(_helper_functions__WEBPACK_IMPORTED_MODULE_6__["parseOptionalNumber"])(scopeFilter.filter.minNum);
                          filter_1.maxNum = Object(_helper_functions__WEBPACK_IMPORTED_MODULE_6__["parseOptionalNumber"])(scopeFilter.filter.maxNum);
                        }

                        ignore = (filter_1.minNum === null || filter_1.minNum === undefined) && (filter_1.maxNum === null || filter_1.maxNum === undefined) && (filter_1.minDate === null || filter_1.minDate === undefined) && (filter_1.maxDate === null || filter_1.maxDate === undefined);
                        filter_1.includeMin = scopeFilter.filter.includeMin;
                        filter_1.includeMax = scopeFilter.filter.includeMax;
                      } else if (colDataType_1 === 'Boolean') {
                        filter_1.includeTrue = scopeFilter.filter.includeTrue;
                        filter_1.includeFalse = scopeFilter.filter.includeFalse;
                        ignore = !filter_1.includeTrue && !filter_1.includeFalse;
                      } else {
                        filter_1.text = scopeFilter.filter.text.trim();
                        filter_1.matchTerms = Object(_helper_functions__WEBPACK_IMPORTED_MODULE_6__["term"])(filter_1.text, {
                          matchWordStart: true
                        });
                        ignore = filter_1.text === '';
                      }

                      filter_1.includeNull = scopeFilter.filter.includeNull;
                      filter_1.negate = scopeFilter.filter.negate;
                      filter_1.ignore = ignore && !filter_1.includeNull; // Save column filters only if in editor mode

                      if (ctrl.dashboard.meta.isEditing) {
                        ctrl.panel.columnFilters = columns.reduce(function (columnFilters, column) {
                          var filter;

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
                              minDate: Object(_helper_functions__WEBPACK_IMPORTED_MODULE_6__["toLocalDateString"])(filter.minDate),
                              maxDate: Object(_helper_functions__WEBPACK_IMPORTED_MODULE_6__["toLocalDateString"])(filter.maxDate),
                              includeMin: filter.includeMin,
                              includeMax: filter.includeMax,
                              dataType: filter.dataType
                            });
                          }

                          return columnFilters;
                        }, []);
                      }

                      ctrl.dataTable.draw();
                      this.dismiss();
                    },
                    includes: function includes(arr, value) {
                      return arr.includes(value);
                    }
                  }),
                  modalClass: 'modal-confirm'
                });
              };

              jTH.prepend(_external_YourJS_min__WEBPACK_IMPORTED_MODULE_4__["dom"]({
                _: 'i',
                cls: 'fa fa-filter ' + (filter_1.ignore ? 'off' : 'on'),
                style: (filter_1.ignore ? 'opacity:0.25;' : '') + 'margin-right:0.25em;cursor:pointer;',
                onclick: showFilterModal_1
              }));
            }
          }
        });
      },
      data: rows,
      rowCallback: function rowCallback(tr, rowData, pageDisplayIndex, displayIndex, rowIndex) {
        if (!rowData.isProcessed) {
          ctrl.processRows([rowData], columns, headers, varsByName);
        }

        for (var cell = void 0, cellValue = void 0, tdIndex = 0, cellCount = rowData.length, colIndex = 0; colIndex < cellCount; colIndex++) {
          cell = rowData[colIndex];

          if (cell.visible) {
            var jTD = jquery__WEBPACK_IMPORTED_MODULE_13___default()('> td', tr).eq(tdIndex++);

            if (cell.cls && cell.cls.level === 'CELL') {
              jTD.addClass(cell.cls.names);
            }

            var colDef = columns[colIndex].columnDef;

            if (colDef && colDef.classNames) {
              jTD.addClass(colDef.classNames);
            }

            var html = cell.html;

            if (cell.tooltip) {
              html = "<div data-tooltip data-original-title=\"" + lodash__WEBPACK_IMPORTED_MODULE_3___default.a.escape(cell.tooltip.display) + "\" data-placement=\"" + cell.tooltip.placement + "\" class=\"d-inline-block\">" + html + "</div>";
            }

            jTD.html(html);
          }

          if (cell.cls && cell.cls.level === 'ROW') {
            jquery__WEBPACK_IMPORTED_MODULE_13___default()(tr).addClass(cell.cls.names);
          }
        }
      },
      scrollY: height,
      scrollX: true,
      deferRender: true,
      paging: panel.allowPaging,
      scrollCollapse: true,
      ordering: panel.allowOrdering,
      searching: true,
      lengthChange: panel.allowLengthChange,
      lengthMenu: ctrl.getPageLengthOptions().reduce(function (arr, opt) {
        return [arr[0].concat([opt.value === Infinity ? -1 : opt.value]), arr[1].concat([opt.value === Infinity ? 'All' : opt.value])];
      }, [[], []]),
      pageLength: panel.initialPageLength,
      order: []
    };
    ctrl.dataTable = jTable.DataTable(dataTableOpts);
    globalThis["ctrl" + +new Date()] = ctrl; // Horizontally center tables that are not full page width.

    jElem.find('.dataTables_scrollHeadInner').css('margin', '0 auto'); // Control visibility here instead in options to allow for custom filtering.

    if (!panel.allowSearching) {
      jElem.find('.dataTables_filter').css('display', 'none');
    } // Resize the scroll body of the table.


    ctrl.fixDataTableSize(true); // Remove the old class names from the wrapper element and add a new
    // targeted stylesheet.

    jElem.each(function (i, elem) {
      elem.className = elem.className.replace(/\b_\d+\b/g, ' ').replace(/\s+/g, ' ').trim();
      elem.appendChild(_external_YourJS_min__WEBPACK_IMPORTED_MODULE_4__["css"](JSON.parse(Object(_helper_functions__WEBPACK_IMPORTED_MODULE_6__["pseudoCssToJSON"])(panel.pseudoCSS)), elem));
    });
  };

  DataTablePanelCtrl.prototype.processRows = function (rows, columns, headers, varsByName) {
    var ctrl = this;

    for (var row = void 0, rowCount = rows.length, rowIndex = 0; rowIndex < rowCount; rowIndex++) {
      row = rows[rowIndex];

      if (!row.isProcessed && !(row[0] || {}).isProcessed) {
        var _loop_1 = function _loop_1(cell, cellValue, tdIndex, cellCount, colIndex) {
          var ruleApplied = void 0;
          var column = columns[colIndex];
          var colDef = column.colDef;
          cellValue = row[colIndex];
          cell = {
            html: cellValue,
            visible: column.visible,
            value: cellValue,
            valueOf: function valueOf() {
              return cellValue;
            },
            toString: function toString() {
              return cellValue + '';
            },
            isProcessed: true
          };

          if (colDef) {
            var rules = colDef.contentRules;
            var cellsByColName = {};

            for (var ci = row.length; ci--;) {
              cellsByColName[headers[ci]] = row[ci];
            }

            for (var rule = void 0, ruleCount = rules.length, ruleIndex = 0; ruleIndex < ruleCount; ruleIndex++) {
              rule = rules[ruleIndex];
              var isMatch = true;
              var type = rule.type;
              var colDefContentRuleFilter = column.colDefContentRuleFilters[ruleIndex];
              var gcvOptions = {
                cell: cell.html,
                cellsByColName: cellsByColName,
                joinValues: row.joinValues,
                colIndex: colIndex,
                rule: rule,
                rgx: colDefContentRuleFilter,
                ctrl: ctrl,
                varsByName: varsByName
              };

              if (type === 'FILTER') {
                isMatch = colDefContentRuleFilter.test(cell.html);
              } else if (type === 'RANGE') {
                var minValue = rule.minValue;
                var minIsNum = RGX_SIMPLE_NUMBER.test(minValue);
                var maxValue = rule.maxValue;
                var maxIsNum = RGX_SIMPLE_NUMBER.test(maxValue);

                if (minIsNum) {
                  minValue = +minValue;
                }

                if (maxIsNum) {
                  maxValue = +maxValue;
                }

                if (minIsNum || maxIsNum) {
                  cellValue = +cellValue;
                }

                var minValueOp = rule.minValueOp;

                if (minValueOp) {
                  isMatch = isMatch && (minValueOp === '<=' ? minValue <= cellValue : minValue < cellValue);
                }

                var maxValueOp = rule.maxValueOp;

                if (maxValueOp) {
                  isMatch = isMatch && (maxValueOp === '>=' ? maxValue >= cellValue : maxValue > cellValue);
                }
              } else {
                isMatch = cell.html == null;
              }

              isMatch = isMatch !== rule.negateCriteria; // If this is a match apply the class(es)

              if (isMatch) {
                if (rule.classNames) {
                  cell.cls = {
                    names: Object(_helper_functions__WEBPACK_IMPORTED_MODULE_6__["getCellValue"])(rule.classNames, false, gcvOptions),
                    level: rule.classLevel
                  };
                } // Set the display


                var displayHTML = Object(_helper_functions__WEBPACK_IMPORTED_MODULE_6__["getCellValue"])(rule.display, false, gcvOptions);

                if (!rule.displayIsHTML) {
                  displayHTML = lodash__WEBPACK_IMPORTED_MODULE_3___default.a.escape(displayHTML);
                }

                if (rule.url) {
                  var url = lodash__WEBPACK_IMPORTED_MODULE_3___default.a.escape(Object(_helper_functions__WEBPACK_IMPORTED_MODULE_6__["getCellValue"])(rule.url, true, gcvOptions));

                  var target = rule.openNewWindow ? '_blank' : '';
                  var tooltipHTML = '';

                  if (rule.tooltip.isVisible) {
                    cell.tooltip = {
                      display: Object(_helper_functions__WEBPACK_IMPORTED_MODULE_6__["getCellValue"])(rule.tooltip.display, false, gcvOptions),
                      placement: rule.tooltip.placement.toLowerCase()
                    };
                  }

                  displayHTML = "<a href=\"" + url + "\" target=\"" + target + "\">" + displayHTML + "</a>";
                }

                cell.html = displayHTML;
                ruleApplied = rule;
                break; // Break out of rules loop
              }
            } // End of rules for-loop

          } // End if (colDef) {...}


          if (!ruleApplied) {
            cell.html = lodash__WEBPACK_IMPORTED_MODULE_3___default.a.escape(cell.html);
          }

          row[colIndex] = cell;
          out_cell_1 = cell;
          out_cellValue_1 = cellValue;
        };

        var out_cell_1, out_cellValue_1;

        for (var cell = void 0, cellValue = void 0, tdIndex = 0, cellCount = row.length, colIndex = 0; colIndex < cellCount; colIndex++) {
          _loop_1(cell, cellValue, tdIndex, cellCount, colIndex);

          cell = out_cell_1;
          cellValue = out_cellValue_1;
        } // End of row for-loop

      } // End if (!row.isProcessed) {...}


      row.isProcessed = true;
    } // End of rows for-loop

  };

  DataTablePanelCtrl.prototype.getVarColColumns = function () {
    var data = this.getVarColsData();
    return data ? data.columns : [];
  };

  DataTablePanelCtrl.prototype.getVarColsData = function () {
    var varCols = this.panel.varCols;
    var dataRefId = varCols && varCols.dataRefId;
    var dataList = this.dataList;
    return dataList && dataList.find(function (_a) {
      var refId = _a.refId;
      return refId === dataRefId;
    });
  };

  DataTablePanelCtrl.prototype.putVarColsIn = function (data) {
    var varCols = this.panel.varCols;
    var columns = data.columns;
    var rows = data.rows.slice();
    var MAIN_COL_COUNT = columns.length;
    var MAIN_ROW_COUNT = rows.length;

    if (varCols) {
      var vcData = this.getVarColsData();

      if (vcData) {
        var vcHeaders_1 = vcData.columns.map(function (col) {
          return col.text;
        });
        var mainJoinColIndex_1 = columns.findIndex(function (c) {
          return c.text === varCols.mainJoinColumn;
        });
        var joinColIndex_1 = vcHeaders_1.indexOf(varCols.joinColumn);
        var nameColIndex_1 = vcHeaders_1.indexOf(varCols.nameColumn);
        var valueColIndex_1 = vcHeaders_1.indexOf(varCols.valueColumn);

        if (mainJoinColIndex_1 >= 0 && joinColIndex_1 >= 0 && nameColIndex_1 >= 0 && valueColIndex_1 >= 0) {
          var mainRowIndex_1 = 0; // Order a sliced version of the main `rows` using the join column.

          rows.sort(function (a, b) {
            return a[mainJoinColIndex_1] < b[mainJoinColIndex_1] ? -1 : 1;
          }); // Order a sliced version of the varCols rows using the join column.

          var vcRowsPrime_1 = vcData.rows;
          var vcRows = vcRowsPrime_1.slice().sort(function (a, b) {
            return a[joinColIndex_1] < b[joinColIndex_1] ? -1 : 1;
          }); // Used later to reorder the new columns by the order they were found
          // in the data.

          var vcColIndexPairs_1 = [];
          vcRows // Get a list of all of the new headers while simultaneously adding
          // the data to the appropriate rows and in the appropriate columns.
          .reduce(function (vcAddedHeaders, vcRow) {
            var vcHeader = vcRow[nameColIndex_1];
            var vcJoinValue = vcRow[joinColIndex_1];
            var colIndex = vcAddedHeaders.indexOf(vcHeader);
            var isNewVCHeader = colIndex < 0; // If the new column wasn't found add it.

            if (isNewVCHeader) {
              colIndex = vcAddedHeaders.push(vcHeader) - 1;
            } // Since everything is ordered continue in `rows` looking for the
            // join and if found add the value there while setting the new row's
            // index as `mainRowIndex`.


            for (var isChanged = void 0, mainRow = void 0, i = mainRowIndex_1; i < MAIN_ROW_COUNT; i++) {
              mainRow = rows[i];

              if (vcJoinValue === mainRow[mainJoinColIndex_1]) {
                mainRow[MAIN_COL_COUNT + colIndex] = vcRow[valueColIndex_1];
                (mainRow.joinValues = mainRow.joinValues || [])[MAIN_COL_COUNT + colIndex] = lodash__WEBPACK_IMPORTED_MODULE_3___default.a.zipObject(vcHeaders_1, vcRow);
                mainRowIndex_1 = i;
                isChanged = true;
              } else if (isChanged) {
                // NOTE:  Return here to avoid checking `i` outside of loop.
                return vcAddedHeaders;
              }
            } // If new header was added but join was unsuccessful remove the new
            // header.


            if (isNewVCHeader) {
              vcAddedHeaders.pop();
            }

            return vcAddedHeaders;
          }, []) // Add the new `columns`.
          .forEach(function (vcHeader, vcHeaderIndex) {
            vcColIndexPairs_1.push({
              first: vcRowsPrime_1.findIndex(function (vcRow) {
                return vcRow[nameColIndex_1] === vcHeader;
              }),
              index: vcHeaderIndex + MAIN_COL_COUNT
            });
            columns.push({
              text: vcHeader
            });
          }); // Used to reorder all of the var-cols

          vcColIndexPairs_1.sort(function (a, b) {
            return a.first - b.first;
          });
          var SPLICE_ARGS_1 = [MAIN_COL_COUNT, vcColIndexPairs_1.length]; // Reorder all of the var-cols

          columns.splice.apply(columns, SPLICE_ARGS_1.concat(vcColIndexPairs_1.map(function (pair) {
            return columns[pair.index];
          }))); // Reorder all of the var-col cells in each row.

          rows.forEach(function (row) {
            row.splice.apply(row, SPLICE_ARGS_1.concat(vcColIndexPairs_1.map(function (pair) {
              pair = row[pair.index];
              return pair === undefined ? null : pair;
            })));
          });
        }
      }
    }
  };

  DataTablePanelCtrl.prototype.getData = function () {
    var ctrl = this;
    var dataList = ctrl.dataList[0];
    var columns = dataList.columns.map(function (col) {
      return lodash__WEBPACK_IMPORTED_MODULE_3___default.a.cloneDeep(col);
    });
    var rows = dataList.rows.map(function (row) {
      return row.slice();
    });
    var varsByName = ctrl.getVarsByName();
    var panel = ctrl.panel;
    var colDefs = panel.columnDefs;
    var varCols = panel.varCols;
    var colDefRgxs = colDefs.map(function (colDef) {
      return Object(_helper_functions__WEBPACK_IMPORTED_MODULE_6__["parseRegExp"])(colDef.filter);
    });
    var colDefContentRuleFilters = colDefs.map(function (colDef) {
      return colDef.contentRules.map(function (rule) {
        return rule.type === 'FILTER' ? Object(_helper_functions__WEBPACK_IMPORTED_MODULE_6__["parseRegExp"])(rule.filter) : null;
      });
    }); // Create the data object to be returned.

    var data = {
      columns: columns,
      rows: rows,
      type: dataList.type,
      refId: dataList.refId
    }; // Add the variable columns to the data if there are any.

    this.putVarColsIn(data); // Make an array of column headers.

    var headers = data.headers = columns.map(function (col) {
      return col.text;
    });
    columns.forEach(function (column, colIndex) {
      if ('string' === typeof column) {
        column = {
          text: column,
          visible: true
        };
      } else {
        column.visible = true;
      }

      var colDef;
      colDefRgxs.find(function (colDefRgx, colDefIndex) {
        if (colDefRgx.test(column.text)) {
          colDef = colDefs[colDefIndex];
          var gcvOptions = {
            cell: column.text,
            cellsByColName: {},
            rule: {
              type: 'FILTER'
            },
            rgx: colDefRgx,
            ctrl: ctrl,
            varsByName: varsByName
          };
          column.text = Object(_helper_functions__WEBPACK_IMPORTED_MODULE_6__["getCellValue"])(colDef.display, false, gcvOptions);
          var html = colDef.displayIsHTML ? column.text : lodash__WEBPACK_IMPORTED_MODULE_3___default.a.escape(column.text);

          if (colDef.url) {
            var url = lodash__WEBPACK_IMPORTED_MODULE_3___default.a.escape(Object(_helper_functions__WEBPACK_IMPORTED_MODULE_6__["getCellValue"])(colDef.url, true, gcvOptions));

            var target = colDef.openNewWindow ? '_blank' : '';
            html = "<a href=\"" + url + "\" target=\"" + target + "\" onclick=\"event.stopPropagation()\">" + html + "</a>";
          }

          lodash__WEBPACK_IMPORTED_MODULE_3___default.a.extend(column, {
            colDef: colDef,
            colDefContentRuleFilters: colDefContentRuleFilters[colDefIndex],
            html: html,
            visible: colDef.isVisible
          });

          return true;
        }

        return false;
      }); // Initialize the filter object...

      var filter = column.filter = {
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
        dataType: _external_YourJS_min__WEBPACK_IMPORTED_MODULE_4__["nativeType"]((rows.find(function (row) {
          return row[colIndex] !== null && row[colIndex] !== undefined;
        }) || [])[colIndex]),
        matchTerms: function matchTerms() {
          return true;
        }
      }; // Add the test() function to the filter object while binding the filter
      // object to the test() function.

      filter.test = function (value) {
        var _a = this,
            negate = _a.negate,
            text = _a.text,
            includeTrue = _a.includeTrue,
            includeFalse = _a.includeFalse,
            includeNull = _a.includeNull,
            minNum = _a.minNum,
            maxNum = _a.maxNum,
            minDate = _a.minDate,
            maxDate = _a.maxDate,
            includeMin = _a.includeMin,
            includeMax = _a.includeMax,
            dataType = _a.dataType;

        var min = minDate !== null && minDate !== undefined ? minDate.actual : minNum;
        var max = maxDate !== null && maxDate !== undefined ? maxDate.actual : maxNum;

        if (dataType === 'Date' || dataType === 'Number' || dataType === 'BigInt') {
          return (value === null || value === undefined ? includeNull : (min === null || min === undefined || (includeMin ? min <= value : min < value)) && (max === null || max === undefined || (includeMax ? value <= max : value < max))) !== negate;
        } else if (dataType === 'Boolean') {
          return (includeTrue && value || includeFalse && !value || includeNull && (value === null || value === undefined)) !== negate;
        }

        return (this.matchTerms(value) || includeNull && (value === null || value === undefined)) !== negate;
      }.bind(filter); // If the column is visible, try to attach the saved column filter by
      // matching on the column text and the column data type.


      if (column.visible) {
        var columnFilter = ctrl.panel.columnFilters.find(function (columnFilter) {
          var result = filter.dataType === columnFilter.dataType && column.text === columnFilter.columnText;

          if (result) {
            lodash__WEBPACK_IMPORTED_MODULE_3___default.a.extend(filter, {
              ignore: columnFilter.ignore,
              negate: columnFilter.negate,
              text: columnFilter.text,
              includeTrue: columnFilter.includeTrue,
              includeFalse: columnFilter.includeFalse,
              includeNull: columnFilter.includeNull,
              minNum: columnFilter.minNum,
              maxNum: columnFilter.maxNum,
              minDate: Object(_helper_functions__WEBPACK_IMPORTED_MODULE_6__["parseLocalDate"])(columnFilter.minDate, ctrl, true),
              maxDate: Object(_helper_functions__WEBPACK_IMPORTED_MODULE_6__["parseLocalDate"])(columnFilter.maxDate, ctrl, true),
              includeMin: columnFilter.includeMin,
              includeMax: columnFilter.includeMax,
              dataType: columnFilter.dataType
            });
          }

          return result;
        });
      }

      if (!lodash__WEBPACK_IMPORTED_MODULE_3___default.a.has(column, 'html')) {
        column.html = lodash__WEBPACK_IMPORTED_MODULE_3___default.a.escape(column.text);
      }

      columns[colIndex] = column;
    });
    return data;
  };

  DataTablePanelCtrl.prototype.fixDataTableSize = function (opt_onlyFixHeight) {
    var jElem = this.panelElement;
    var fullHeight = jElem.height();
    var jWrap = jElem.find('.dataTables_wrapper');

    if (jWrap.length) {
      var wrapHeight = jWrap.height();
      var jScrollBody = jWrap.find('.dataTables_scrollBody');
      var scrollHeight = jScrollBody.height();
      var nonScrollHeight = wrapHeight - scrollHeight;
      jScrollBody.css('max-height', fullHeight - nonScrollHeight);
    } // Make sure the column headers get resized


    if (this.dataTable && !opt_onlyFixHeight) {
      this.dataTable.columns().draw();
    }
  };

  DataTablePanelCtrl.prototype.draw = function () {
    var error;
    var isValid = false;
    var ctrl = this;
    var jElem = ctrl.element;
    var jContent = ctrl.panelElement.css('position', 'relative').html('');
    var elemContent = jContent[0];
    var data = ctrl.getData();
    ctrl.pageLengthOptions = ctrl.getPageLengthOptions();

    if (data && data.rows.length) {
      if (data.type === 'table') {
        try {
          ctrl.drawDataTable(data);
          ctrl.panelJSON = this.getPanelSettingsJSON();
          jElem.tooltip({
            selector: '[data-tooltip]'
          });
          isValid = true;
        } catch (err) {
          error = err;
        }
      }
    }

    if (!isValid) {
      var msg = 'No data' + (error ? ':  \r\n' + error.message : '.');
      var elemMsg = _external_YourJS_min__WEBPACK_IMPORTED_MODULE_4__["dom"]({
        _: 'div',
        style: {
          display: 'flex',
          alignItems: 'center',
          textAlign: 'center',
          height: '100%'
        },
        $: [{
          _: 'div',
          cls: 'alert alert-error',
          style: {
            margin: '0px auto'
          },
          text: msg
        }]
      });
      jContent.html('').append(elemMsg);

      if (error) {
        throw error;
      }
    }
  };

  DataTablePanelCtrl.prototype.setPanelValue = function (rootVar, path, value) {
    lodash__WEBPACK_IMPORTED_MODULE_3___default.a.set(rootVar, path, value);

    this.autoRedraw();
  };

  DataTablePanelCtrl.prototype.autoRedraw = function () {
    throw new Error('Method not implemented.');
  };

  DataTablePanelCtrl.prototype.link = function (scope, elem, attrs, ctrl) {
    this.element = elem;
    this.panelElement = elem.find('grafana-panel > *:eq(0)');
    this.throttleDraw = lodash__WEBPACK_IMPORTED_MODULE_3___default.a.debounce(this.draw.bind(this), 1000);
  };

  DataTablePanelCtrl.templateUrl = 'partials/module.html';
  DataTablePanelCtrl.DEFAULT_PSEUDO_CSS = "\n  .theme-dark & {\n    color: white;\n    \n    .dataTables_filter input[type=search] {\n      border: 1px solid #262628;\n    }\n  }\n  .dataTables_filter input[type=search] {\n    border: 1px solid #dde4ed;\n    height: 35px;\n    line-height: 35px;\n    border-radius: 5px;\n    padding: 0 8px;\n  }\n  table.dataTable tbody tr {\n    &:hover td {\n      background-image: linear-gradient(0deg, rgba(128,128,128,0.1), rgba(128,128,128,0.1));\n    }\n    &, &.even, &.odd {\n      background-color: transparent;\n      td {\n        border-color: transparent;\n      }\n    }\n    &.odd {\n      background-color: rgba(128,128,128,0.3);\n    }\n    &.even {\n      background-color: rgba(128,128,128,0.15);\n    }\n  }\n  ";
  DataTablePanelCtrl.UNIT_FORMATS = Object(_format_values__WEBPACK_IMPORTED_MODULE_2__["getValueFormats"])();
  DataTablePanelCtrl.TOOLTIP_PLACEMENTS = [{
    id: 'TOP',
    text: 'Top'
  }, {
    id: 'LEFT',
    text: 'Left'
  }, {
    id: 'RIGHT',
    text: 'Right'
  }, {
    id: 'BOTTOM',
    text: 'Bottom'
  }];
  DataTablePanelCtrl.CONTENT_RULE_TYPES = [{
    id: 'FILTER',
    text: 'Filter by exact value or RegExp'
  }, {
    id: 'RANGE',
    text: 'Match a range of values'
  }, {
    id: 'NULL',
    text: 'Is NULL'
  }];
  DataTablePanelCtrl.CONTENT_RULE_CLASS_LEVELS = [{
    id: 'CELL',
    text: 'Only the cell'
  }, {
    id: 'ROW',
    text: 'Entire row'
  }];
  DataTablePanelCtrl.TZ_OFFSET_TYPES = [{
    id: null,
    text: 'Default'
  }, {
    id: 'NO-TIMEZONE',
    text: 'Local Timezone'
  }, {
    id: 'NO-TIMEZONE-REVERSE',
    text: 'Reverse Local Timezone'
  }, {
    id: 'TIMEZONE',
    text: 'Specify Minute Offset'
  }];
  DataTablePanelCtrl.CONTENT_RULE_MAX_VALUE_OPS = [{
    id: '',
    text: ''
  }, {
    id: '>=',
    text: "value \u2265 cell (greater than or equal to)"
  }, {
    id: '>',
    text: 'value > cell (greater than)'
  }];
  DataTablePanelCtrl.CONTENT_RULE_MIN_VALUE_OPS = [{
    id: '',
    text: ''
  }, {
    id: '<',
    text: 'value < cell (less than)'
  }, {
    id: '<=',
    text: "value \u2264 cell (less than or equal to)"
  }];
  DataTablePanelCtrl.CONTENT_RULE_EXACT_NUM_OPS = [{
    id: '==',
    text: '= (equals)'
  }, {
    id: '!=',
    text: "\u2260 (doesn't)"
  }];
  DataTablePanelCtrl.DEFAULT_PANEL_SETTINGS = {
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
    pseudoCSS: DataTablePanelCtrl.DEFAULT_PSEUDO_CSS,
    varCols: {
      dataRefId: null,
      mainJoinColumn: null,
      joinColumn: null,
      nameColumn: null,
      valueColumn: null
    },
    tzOffsetType: null,
    tzOffset: 0,
    columnFilters: []
  };
  return DataTablePanelCtrl;
}(grafana_app_plugins_sdk__WEBPACK_IMPORTED_MODULE_1__["MetricsPanelCtrl"]);


DataTablePanelCtrl.prototype.autoRedraw = lodash__WEBPACK_IMPORTED_MODULE_3___default.a.debounce(function () {
  if (this.panel.allowRedrawOnModify) {
    this.drawIfChanged.apply(this, arguments);
  }
}, 500);


/***/ }),

/***/ "@grafana/data":
/*!********************************!*\
  !*** external "@grafana/data" ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__grafana_data__;

/***/ }),

/***/ "grafana/app/plugins/sdk":
/*!**********************************!*\
  !*** external "app/plugins/sdk" ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_grafana_app_plugins_sdk__;

/***/ }),

/***/ "jquery":
/*!*************************!*\
  !*** external "jquery" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_jquery__;

/***/ }),

/***/ "lodash":
/*!*************************!*\
  !*** external "lodash" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_lodash__;

/***/ })

/******/ })});;
//# sourceMappingURL=module.js.map