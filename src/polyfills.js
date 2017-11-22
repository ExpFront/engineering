/*eslint-disable */
if (!String.fromCodePoint) {
		(function () {
				var defineProperty = (function () {
						try {
								var object = {};
								var $defineProperty = Object.defineProperty;
								var result = $defineProperty(object, object, object) && $defineProperty;
						} catch (error) { }
						return result;
				}());
				var stringFromCharCode = String.fromCharCode;
				var floor = Math.floor;
				var fromCodePoint = function () {
						var MAX_SIZE = 0x4000;
						var codeUnits = [];
						var highSurrogate;
						var lowSurrogate;
						var index = -1;
						var length = arguments.length;
						if (!length) {
								return '';
						}
						var result = '';
						while (++index < length) {
								var codePoint = Number(arguments[index]);
								if (
										!isFinite(codePoint) ||
										codePoint < 0 ||
										codePoint > 0x10FFFF ||
										floor(codePoint) != codePoint
								) {
										throw RangeError('Invalid code point: ' + codePoint);
								}
								if (codePoint <= 0xFFFF) { // BMP code point
										codeUnits.push(codePoint);
								} else {
										codePoint -= 0x10000;
										highSurrogate = (codePoint >> 10) + 0xD800;
										lowSurrogate = (codePoint % 0x400) + 0xDC00;
										codeUnits.push(highSurrogate, lowSurrogate);
								}
								if (index + 1 == length || codeUnits.length > MAX_SIZE) {
										result += stringFromCharCode.apply(null, codeUnits);
										codeUnits.length = 0;
								}
						}
						return result;
				};
				if (defineProperty) {
						defineProperty(String, 'fromCodePoint', {
								'value': fromCodePoint,
								'configurable': true,
								'writable': true
						});
				} else {
						String.fromCodePoint = fromCodePoint;
				}
		}());
}

if (!String.prototype.codePointAt) {
		(function () {
				'use strict';
				var codePointAt = function (position) {
						if (this == null) {
								throw TypeError();
						}
						var string = String(this);
						var size = string.length;
						var index = position ? Number(position) : 0;
						if (index != index) {
								index = 0;
						}
						if (index < 0 || index >= size) {
								return undefined;
						}
						var first = string.charCodeAt(index);
						var second;
						if (
								first >= 0xD800 && first <= 0xDBFF &&
								size > index + 1
						) {
								second = string.charCodeAt(index + 1);
								if (second >= 0xDC00 && second <= 0xDFFF) {
										return (first - 0xD800) * 0x400 + second - 0xDC00 + 0x10000;
								}
						}
						return first;
				};
				if (Object.defineProperty) {
						Object.defineProperty(String.prototype, 'codePointAt', {
								'value': codePointAt,
								'configurable': true,
								'writable': true
						});
				} else {
						String.prototype.codePointAt = codePointAt;
				}
		}());
}


if (!String.prototype.endsWith) {
		String.prototype.endsWith = function (searchString, position) {
				var subjectString = this.toString();
				if (typeof position !== 'number' || !isFinite(position) || Math.floor(position) !== position || position > subjectString.length) {
						position = subjectString.length;
				}
				position -= searchString.length;
				var lastIndex = subjectString.lastIndexOf(searchString, position);
				return lastIndex !== -1 && lastIndex === position;
		};
}

if (!String.prototype.includes) {
		String.prototype.includes = function (search, start) {
				'use strict';
				if (typeof start !== 'number') {
						start = 0;
				}
				if (start + search.length > this.length) {
						return false;
				} else {
						return this.indexOf(search, start) !== -1;
				}
		};
}

if (!String.prototype.padEnd) {
		String.prototype.padEnd = function padEnd(targetLength,padString) {
				targetLength = targetLength>>0; //floor if number or convert non-number to 0;
				padString = String(padString || ' ');
				if (this.length > targetLength) {
						return String(this);
				}
				else {
						targetLength = targetLength-this.length;
						if (targetLength > padString.length) {
								padString += padString.repeat(targetLength/padString.length); //append to original to ensure we are longer than needed
						}
						return String(this) + padString.slice(0,targetLength);
				}
		};
}

if (!String.prototype.padStart) {
		String.prototype.padStart = function padStart(targetLength,padString) {
				targetLength = targetLength>>0; //floor if number or convert non-number to 0;
				padString = String(padString || ' ');
				if (this.length > targetLength) {
						return String(this);
				}
				else {
						targetLength = targetLength-this.length;
						if (targetLength > padString.length) {
								padString += padString.repeat(targetLength/padString.length); //append to original to ensure we are longer than needed
						}
						return padString.slice(0,targetLength) + String(this);
				}
		};
}


if (!String.prototype.repeat) {
		String.prototype.repeat = function (count) {
				'use strict';
				if (this == null) {
						throw new TypeError('can\'t convert ' + this + ' to object');
				}
				var str = '' + this;
				count = +count;
				if (count != count) {
						count = 0;
				}
				if (count < 0) {
						throw new RangeError('repeat count must be non-negative');
				}
				if (count == Infinity) {
						throw new RangeError('repeat count must be less than infinity');
				}
				count = Math.floor(count);
				if (str.length == 0 || count == 0) {
						return '';
				}
				if (str.length * count >= 1 << 28) {
						throw new RangeError('repeat count must not overflow maximum string size');
				}
				var rpt = '';
				for (; ;) {
						if ((count & 1) == 1) {
								rpt += str;
						}
						count >>>= 1;
						if (count == 0) {
								break;
						}
						str += str;
				}
				return rpt;
		}
}

if (!String.prototype.startsWith) {
		String.prototype.startsWith = function (searchString, position) {
				position = position || 0;
				return this.substr(position, searchString.length) === searchString;
		};
}


if (!String.prototype.trim) {
		String.prototype.trim = function () {
				return this.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');
		};
}
/*eslint-disable */
