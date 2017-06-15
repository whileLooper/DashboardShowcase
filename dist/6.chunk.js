webpackJsonpac__name_([6],{

/***/ 1115:
/***/ function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(jQuery) {/*!
 * jQuery twitter bootstrap wizard plugin
 * Examples and documentation at: http://github.com/VinceG/twitter-bootstrap-wizard
 * version 1.0
 * Requires jQuery v1.3.2 or later
 * Supports Bootstrap 2.2.x, 2.3.x, 3.0
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 * Authors: Vadim Vincent Gabriel (http://vadimg.com), Jason Gill (www.gilluminate.com)
 */
;(function($) {
var bootstrapWizardCreate = function(element, options) {
	var element = $(element);
	var obj = this;
	
	// selector skips any 'li' elements that do not contain a child with a tab data-toggle
	var baseItemSelector = 'li:has([data-toggle="tab"])';
	var historyStack = [];

	// Merge options with defaults
	var $settings = $.extend({}, $.fn.bootstrapWizard.defaults, options);
	var $activeTab = null;
	var $navigation = null;
	
	this.rebindClick = function(selector, fn)
	{
		selector.unbind('click', fn).bind('click', fn);
	}

	this.fixNavigationButtons = function() {
		// Get the current active tab
		if(!$activeTab.length) {
			// Select first one
			$navigation.find('a:first').tab('show');
			$activeTab = $navigation.find(baseItemSelector + ':first');
		}

		// See if we're currently in the first/last then disable the previous and last buttons
		$($settings.previousSelector, element).toggleClass('disabled', (obj.firstIndex() >= obj.currentIndex()));
		$($settings.nextSelector, element).toggleClass('disabled', (obj.currentIndex() >= obj.navigationLength()));
		$($settings.nextSelector, element).toggleClass('hidden', (obj.currentIndex() >= obj.navigationLength() && $($settings.finishSelector, element).length > 0));
		$($settings.lastSelector, element).toggleClass('hidden', (obj.currentIndex() >= obj.navigationLength() && $($settings.finishSelector, element).length > 0));
		$($settings.finishSelector, element).toggleClass('hidden', (obj.currentIndex() < obj.navigationLength()));
		$($settings.backSelector, element).toggleClass('disabled', (historyStack.length == 0));
		$($settings.backSelector, element).toggleClass('hidden', (obj.currentIndex() >= obj.navigationLength() && $($settings.finishSelector, element).length > 0));

		// We are unbinding and rebinding to ensure single firing and no double-click errors
		obj.rebindClick($($settings.nextSelector, element), obj.next);
		obj.rebindClick($($settings.previousSelector, element), obj.previous);
		obj.rebindClick($($settings.lastSelector, element), obj.last);
		obj.rebindClick($($settings.firstSelector, element), obj.first);
		obj.rebindClick($($settings.finishSelector, element), obj.finish);
		obj.rebindClick($($settings.backSelector, element), obj.back);

		if($settings.onTabShow && typeof $settings.onTabShow === 'function' && $settings.onTabShow($activeTab, $navigation, obj.currentIndex())===false){
			return false;
		}
	};

	this.next = function(e) {
		// If we clicked the last then dont activate this
		if(element.hasClass('last')) {
			return false;
		}

		if($settings.onNext && typeof $settings.onNext === 'function' && $settings.onNext($activeTab, $navigation, obj.nextIndex())===false){
			return false;
		}

		var formerIndex = obj.currentIndex();
		$index = obj.nextIndex();

	  // Did we click the last button
		if($index > obj.navigationLength()) {
		} else {
		  historyStack.push(formerIndex);
		  $navigation.find(baseItemSelector + ':eq(' + $index + ') a').tab('show');
		}
	};

	this.previous = function(e) {
		// If we clicked the first then dont activate this
		if(element.hasClass('first')) {
			return false;
		}

		if($settings.onPrevious && typeof $settings.onPrevious === 'function' && $settings.onPrevious($activeTab, $navigation, obj.previousIndex())===false){
			return false;
		}

		var formerIndex = obj.currentIndex();
		$index = obj.previousIndex();

		if($index < 0) {
		} else {
		  historyStack.push(formerIndex);
		  $navigation.find(baseItemSelector + ':eq(' + $index + ') a').tab('show');
		}
	};

	this.first = function (e) {
		if($settings.onFirst && typeof $settings.onFirst === 'function' && $settings.onFirst($activeTab, $navigation, obj.firstIndex())===false){
			return false;
		}

		// If the element is disabled then we won't do anything
		if(element.hasClass('disabled')) {
			return false;
		}

		historyStack.push(obj.currentIndex());
		$navigation.find(baseItemSelector + ':eq(0) a').tab('show');
	};

	this.last = function(e) {
		if($settings.onLast && typeof $settings.onLast === 'function' && $settings.onLast($activeTab, $navigation, obj.lastIndex())===false){
			return false;
		}

		// If the element is disabled then we won't do anything
		if(element.hasClass('disabled')) {
			return false;
		}

		historyStack.push(obj.currentIndex());
		$navigation.find(baseItemSelector + ':eq(' + obj.navigationLength() + ') a').tab('show');
	};

	this.finish = function (e) {
	  if ($settings.onFinish && typeof $settings.onFinish === 'function') {
	    $settings.onFinish($activeTab, $navigation, obj.lastIndex());
	  }
	};

	this.back = function () {
	  if (historyStack.length == 0) {
	    return null;
	  }

	  var formerIndex = historyStack.pop();
	  if ($settings.onBack && typeof $settings.onBack === 'function' && $settings.onBack($activeTab, $navigation, formerIndex) === false) {
	    historyStack.push(formerIndex);
	    return false;
	  }

	  element.find(baseItemSelector + ':eq(' + formerIndex + ') a').tab('show');
	};

	this.currentIndex = function() {
		return $navigation.find(baseItemSelector).index($activeTab);
	};

	this.firstIndex = function() {
		return 0;
	};

	this.lastIndex = function() {
		return obj.navigationLength();
	};
	this.getIndex = function(e) {
		return $navigation.find(baseItemSelector).index(e);
	};
	this.nextIndex = function() {
		return $navigation.find(baseItemSelector).index($activeTab) + 1;
	};
	this.previousIndex = function() {
		return $navigation.find(baseItemSelector).index($activeTab) - 1;
	};
	this.navigationLength = function() {
		return $navigation.find(baseItemSelector).length - 1;
	};
	this.activeTab = function() {
		return $activeTab;
	};
	this.nextTab = function() {
		return $navigation.find(baseItemSelector + ':eq('+(obj.currentIndex()+1)+')').length ? $navigation.find(baseItemSelector + ':eq('+(obj.currentIndex()+1)+')') : null;
	};
	this.previousTab = function() {
		if(obj.currentIndex() <= 0) {
			return null;
		}
		return $navigation.find(baseItemSelector + ':eq('+parseInt(obj.currentIndex()-1)+')');
	};
	this.show = function(index) {
	  var tabToShow = isNaN(index) ? 
      element.find(baseItemSelector + ' a[href=#' + index + ']') : 
      element.find(baseItemSelector + ':eq(' + index + ') a');
	  if (tabToShow.length > 0) {
	    historyStack.push(obj.currentIndex());
	    tabToShow.tab('show');
	  }
	};
	this.disable = function (index) {
		$navigation.find(baseItemSelector + ':eq('+index+')').addClass('disabled');
	};
	this.enable = function(index) {
		$navigation.find(baseItemSelector + ':eq('+index+')').removeClass('disabled');
	};
	this.hide = function(index) {
		$navigation.find(baseItemSelector + ':eq('+index+')').hide();
	};
	this.display = function(index) {
		$navigation.find(baseItemSelector + ':eq('+index+')').show();
	};
	this.remove = function(args) {
		var $index = args[0];
		var $removeTabPane = typeof args[1] != 'undefined' ? args[1] : false;
		var $item = $navigation.find(baseItemSelector + ':eq('+$index+')');

		// Remove the tab pane first if needed
		if($removeTabPane) {
			var $href = $item.find('a').attr('href');
			$($href).remove();
		}

		// Remove menu item
		$item.remove();
	};
	
	var innerTabClick = function (e) {
		// Get the index of the clicked tab
		var $ul = $navigation.find(baseItemSelector);
		var clickedIndex = $ul.index($(e.currentTarget).parent(baseItemSelector));
		var $clickedTab = $( $ul[clickedIndex] );
		if($settings.onTabClick && typeof $settings.onTabClick === 'function' && $settings.onTabClick($activeTab, $navigation, obj.currentIndex(), clickedIndex, $clickedTab)===false){
		    return false;
		}
	};
	
	var innerTabShown = function (e) {  // use shown instead of show to help prevent double firing
		$element = $(e.target).parent();
		var nextTab = $navigation.find(baseItemSelector).index($element);

		// If it's disabled then do not change
		if($element.hasClass('disabled')) {
			return false;
		}

		if($settings.onTabChange && typeof $settings.onTabChange === 'function' && $settings.onTabChange($activeTab, $navigation, obj.currentIndex(), nextTab)===false){
				return false;
		}

		$activeTab = $element; // activated tab
		obj.fixNavigationButtons();
	};
	
	this.resetWizard = function() {
		
		// remove the existing handlers
		$('a[data-toggle="tab"]', $navigation).off('click', innerTabClick);
		$('a[data-toggle="tab"]', $navigation).off('shown shown.bs.tab', innerTabShown);
		
		// reset elements based on current state of the DOM
		$navigation = element.find('ul:first', element);
		$activeTab = $navigation.find(baseItemSelector + '.active', element);
		
		// re-add handlers
		$('a[data-toggle="tab"]', $navigation).on('click', innerTabClick);
		$('a[data-toggle="tab"]', $navigation).on('shown shown.bs.tab', innerTabShown);
		
		obj.fixNavigationButtons();
	};

	$navigation = element.find('ul:first', element);
	$activeTab = $navigation.find(baseItemSelector + '.active', element);

	if(!$navigation.hasClass($settings.tabClass)) {
		$navigation.addClass($settings.tabClass);
	}

	// Load onInit
	if($settings.onInit && typeof $settings.onInit === 'function'){
		$settings.onInit($activeTab, $navigation, 0);
	}

	// Load onShow
	if($settings.onShow && typeof $settings.onShow === 'function'){
		$settings.onShow($activeTab, $navigation, obj.nextIndex());
	}

	$('a[data-toggle="tab"]', $navigation).on('click', innerTabClick);

	// attach to both shown and shown.bs.tab to support Bootstrap versions 2.3.2 and 3.0.0
	$('a[data-toggle="tab"]', $navigation).on('shown shown.bs.tab', innerTabShown);
};
$.fn.bootstrapWizard = function(options) {
	//expose methods
	if (typeof options == 'string') {
		var args = Array.prototype.slice.call(arguments, 1)
		if(args.length === 1) {
			args.toString();
		}
		return this.data('bootstrapWizard')[options](args);
	}
	return this.each(function(index){
		var element = $(this);
		// Return early if this element already has a plugin instance
		if (element.data('bootstrapWizard')) return;
		// pass options to plugin constructor
		var wizard = new bootstrapWizardCreate(element, options);
		// Store plugin object in this element's data
		element.data('bootstrapWizard', wizard);
		// and then trigger initial change
		wizard.fixNavigationButtons();
	});
};

// expose options
$.fn.bootstrapWizard.defaults = {
	tabClass:         'nav nav-pills',
	nextSelector:     '.wizard li.next',
	previousSelector: '.wizard li.previous',
	firstSelector:    '.wizard li.first',
	lastSelector:     '.wizard li.last',
  finishSelector:   '.wizard li.finish',
	backSelector:     '.wizard li.back',
	onShow:           null,
	onInit:           null,
	onNext:           null,
	onPrevious:       null,
	onLast:           null,
	onFirst:          null,
  onFinish:         null,
  onBack:           null,
	onTabChange:      null, 
	onTabClick:       null,
	onTabShow:        null
};

})(jQuery);

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(23)))

/***/ },

/***/ 1116:
/***/ function(module, exports) {

module.exports = function isBuffer(arg) {
  return arg && typeof arg === 'object'
    && typeof arg.copy === 'function'
    && typeof arg.fill === 'function'
    && typeof arg.readUInt8 === 'function';
}

/***/ },

/***/ 1117:
/***/ function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global, process) {// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

var formatRegExp = /%[sdj%]/g;
exports.format = function(f) {
  if (!isString(f)) {
    var objects = [];
    for (var i = 0; i < arguments.length; i++) {
      objects.push(inspect(arguments[i]));
    }
    return objects.join(' ');
  }

  var i = 1;
  var args = arguments;
  var len = args.length;
  var str = String(f).replace(formatRegExp, function(x) {
    if (x === '%%') return '%';
    if (i >= len) return x;
    switch (x) {
      case '%s': return String(args[i++]);
      case '%d': return Number(args[i++]);
      case '%j':
        try {
          return JSON.stringify(args[i++]);
        } catch (_) {
          return '[Circular]';
        }
      default:
        return x;
    }
  });
  for (var x = args[i]; i < len; x = args[++i]) {
    if (isNull(x) || !isObject(x)) {
      str += ' ' + x;
    } else {
      str += ' ' + inspect(x);
    }
  }
  return str;
};


// Mark that a method should not be used.
// Returns a modified function which warns once by default.
// If --no-deprecation is set, then it is a no-op.
exports.deprecate = function(fn, msg) {
  // Allow for deprecating things in the process of starting up.
  if (isUndefined(global.process)) {
    return function() {
      return exports.deprecate(fn, msg).apply(this, arguments);
    };
  }

  if (process.noDeprecation === true) {
    return fn;
  }

  var warned = false;
  function deprecated() {
    if (!warned) {
      if (process.throwDeprecation) {
        throw new Error(msg);
      } else if (process.traceDeprecation) {
        console.trace(msg);
      } else {
        console.error(msg);
      }
      warned = true;
    }
    return fn.apply(this, arguments);
  }

  return deprecated;
};


var debugs = {};
var debugEnviron;
exports.debuglog = function(set) {
  if (isUndefined(debugEnviron))
    debugEnviron = {"ENV":"development","NODE_ENV":"development","HMR":false}.NODE_DEBUG || '';
  set = set.toUpperCase();
  if (!debugs[set]) {
    if (new RegExp('\\b' + set + '\\b', 'i').test(debugEnviron)) {
      var pid = process.pid;
      debugs[set] = function() {
        var msg = exports.format.apply(exports, arguments);
        console.error('%s %d: %s', set, pid, msg);
      };
    } else {
      debugs[set] = function() {};
    }
  }
  return debugs[set];
};


/**
 * Echos the value of a value. Trys to print the value out
 * in the best way possible given the different types.
 *
 * @param {Object} obj The object to print out.
 * @param {Object} opts Optional options object that alters the output.
 */
/* legacy: obj, showHidden, depth, colors*/
function inspect(obj, opts) {
  // default options
  var ctx = {
    seen: [],
    stylize: stylizeNoColor
  };
  // legacy...
  if (arguments.length >= 3) ctx.depth = arguments[2];
  if (arguments.length >= 4) ctx.colors = arguments[3];
  if (isBoolean(opts)) {
    // legacy...
    ctx.showHidden = opts;
  } else if (opts) {
    // got an "options" object
    exports._extend(ctx, opts);
  }
  // set default options
  if (isUndefined(ctx.showHidden)) ctx.showHidden = false;
  if (isUndefined(ctx.depth)) ctx.depth = 2;
  if (isUndefined(ctx.colors)) ctx.colors = false;
  if (isUndefined(ctx.customInspect)) ctx.customInspect = true;
  if (ctx.colors) ctx.stylize = stylizeWithColor;
  return formatValue(ctx, obj, ctx.depth);
}
exports.inspect = inspect;


// http://en.wikipedia.org/wiki/ANSI_escape_code#graphics
inspect.colors = {
  'bold' : [1, 22],
  'italic' : [3, 23],
  'underline' : [4, 24],
  'inverse' : [7, 27],
  'white' : [37, 39],
  'grey' : [90, 39],
  'black' : [30, 39],
  'blue' : [34, 39],
  'cyan' : [36, 39],
  'green' : [32, 39],
  'magenta' : [35, 39],
  'red' : [31, 39],
  'yellow' : [33, 39]
};

// Don't use 'blue' not visible on cmd.exe
inspect.styles = {
  'special': 'cyan',
  'number': 'yellow',
  'boolean': 'yellow',
  'undefined': 'grey',
  'null': 'bold',
  'string': 'green',
  'date': 'magenta',
  // "name": intentionally not styling
  'regexp': 'red'
};


function stylizeWithColor(str, styleType) {
  var style = inspect.styles[styleType];

  if (style) {
    return '\u001b[' + inspect.colors[style][0] + 'm' + str +
           '\u001b[' + inspect.colors[style][1] + 'm';
  } else {
    return str;
  }
}


function stylizeNoColor(str, styleType) {
  return str;
}


function arrayToHash(array) {
  var hash = {};

  array.forEach(function(val, idx) {
    hash[val] = true;
  });

  return hash;
}


function formatValue(ctx, value, recurseTimes) {
  // Provide a hook for user-specified inspect functions.
  // Check that value is an object with an inspect function on it
  if (ctx.customInspect &&
      value &&
      isFunction(value.inspect) &&
      // Filter out the util module, it's inspect function is special
      value.inspect !== exports.inspect &&
      // Also filter out any prototype objects using the circular check.
      !(value.constructor && value.constructor.prototype === value)) {
    var ret = value.inspect(recurseTimes, ctx);
    if (!isString(ret)) {
      ret = formatValue(ctx, ret, recurseTimes);
    }
    return ret;
  }

  // Primitive types cannot have properties
  var primitive = formatPrimitive(ctx, value);
  if (primitive) {
    return primitive;
  }

  // Look up the keys of the object.
  var keys = Object.keys(value);
  var visibleKeys = arrayToHash(keys);

  if (ctx.showHidden) {
    keys = Object.getOwnPropertyNames(value);
  }

  // IE doesn't make error fields non-enumerable
  // http://msdn.microsoft.com/en-us/library/ie/dww52sbt(v=vs.94).aspx
  if (isError(value)
      && (keys.indexOf('message') >= 0 || keys.indexOf('description') >= 0)) {
    return formatError(value);
  }

  // Some type of object without properties can be shortcutted.
  if (keys.length === 0) {
    if (isFunction(value)) {
      var name = value.name ? ': ' + value.name : '';
      return ctx.stylize('[Function' + name + ']', 'special');
    }
    if (isRegExp(value)) {
      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
    }
    if (isDate(value)) {
      return ctx.stylize(Date.prototype.toString.call(value), 'date');
    }
    if (isError(value)) {
      return formatError(value);
    }
  }

  var base = '', array = false, braces = ['{', '}'];

  // Make Array say that they are Array
  if (isArray(value)) {
    array = true;
    braces = ['[', ']'];
  }

  // Make functions say that they are functions
  if (isFunction(value)) {
    var n = value.name ? ': ' + value.name : '';
    base = ' [Function' + n + ']';
  }

  // Make RegExps say that they are RegExps
  if (isRegExp(value)) {
    base = ' ' + RegExp.prototype.toString.call(value);
  }

  // Make dates with properties first say the date
  if (isDate(value)) {
    base = ' ' + Date.prototype.toUTCString.call(value);
  }

  // Make error with message first say the error
  if (isError(value)) {
    base = ' ' + formatError(value);
  }

  if (keys.length === 0 && (!array || value.length == 0)) {
    return braces[0] + base + braces[1];
  }

  if (recurseTimes < 0) {
    if (isRegExp(value)) {
      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
    } else {
      return ctx.stylize('[Object]', 'special');
    }
  }

  ctx.seen.push(value);

  var output;
  if (array) {
    output = formatArray(ctx, value, recurseTimes, visibleKeys, keys);
  } else {
    output = keys.map(function(key) {
      return formatProperty(ctx, value, recurseTimes, visibleKeys, key, array);
    });
  }

  ctx.seen.pop();

  return reduceToSingleString(output, base, braces);
}


function formatPrimitive(ctx, value) {
  if (isUndefined(value))
    return ctx.stylize('undefined', 'undefined');
  if (isString(value)) {
    var simple = '\'' + JSON.stringify(value).replace(/^"|"$/g, '')
                                             .replace(/'/g, "\\'")
                                             .replace(/\\"/g, '"') + '\'';
    return ctx.stylize(simple, 'string');
  }
  if (isNumber(value))
    return ctx.stylize('' + value, 'number');
  if (isBoolean(value))
    return ctx.stylize('' + value, 'boolean');
  // For some reason typeof null is "object", so special case here.
  if (isNull(value))
    return ctx.stylize('null', 'null');
}


function formatError(value) {
  return '[' + Error.prototype.toString.call(value) + ']';
}


function formatArray(ctx, value, recurseTimes, visibleKeys, keys) {
  var output = [];
  for (var i = 0, l = value.length; i < l; ++i) {
    if (hasOwnProperty(value, String(i))) {
      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
          String(i), true));
    } else {
      output.push('');
    }
  }
  keys.forEach(function(key) {
    if (!key.match(/^\d+$/)) {
      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
          key, true));
    }
  });
  return output;
}


function formatProperty(ctx, value, recurseTimes, visibleKeys, key, array) {
  var name, str, desc;
  desc = Object.getOwnPropertyDescriptor(value, key) || { value: value[key] };
  if (desc.get) {
    if (desc.set) {
      str = ctx.stylize('[Getter/Setter]', 'special');
    } else {
      str = ctx.stylize('[Getter]', 'special');
    }
  } else {
    if (desc.set) {
      str = ctx.stylize('[Setter]', 'special');
    }
  }
  if (!hasOwnProperty(visibleKeys, key)) {
    name = '[' + key + ']';
  }
  if (!str) {
    if (ctx.seen.indexOf(desc.value) < 0) {
      if (isNull(recurseTimes)) {
        str = formatValue(ctx, desc.value, null);
      } else {
        str = formatValue(ctx, desc.value, recurseTimes - 1);
      }
      if (str.indexOf('\n') > -1) {
        if (array) {
          str = str.split('\n').map(function(line) {
            return '  ' + line;
          }).join('\n').substr(2);
        } else {
          str = '\n' + str.split('\n').map(function(line) {
            return '   ' + line;
          }).join('\n');
        }
      }
    } else {
      str = ctx.stylize('[Circular]', 'special');
    }
  }
  if (isUndefined(name)) {
    if (array && key.match(/^\d+$/)) {
      return str;
    }
    name = JSON.stringify('' + key);
    if (name.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)) {
      name = name.substr(1, name.length - 2);
      name = ctx.stylize(name, 'name');
    } else {
      name = name.replace(/'/g, "\\'")
                 .replace(/\\"/g, '"')
                 .replace(/(^"|"$)/g, "'");
      name = ctx.stylize(name, 'string');
    }
  }

  return name + ': ' + str;
}


function reduceToSingleString(output, base, braces) {
  var numLinesEst = 0;
  var length = output.reduce(function(prev, cur) {
    numLinesEst++;
    if (cur.indexOf('\n') >= 0) numLinesEst++;
    return prev + cur.replace(/\u001b\[\d\d?m/g, '').length + 1;
  }, 0);

  if (length > 60) {
    return braces[0] +
           (base === '' ? '' : base + '\n ') +
           ' ' +
           output.join(',\n  ') +
           ' ' +
           braces[1];
  }

  return braces[0] + base + ' ' + output.join(', ') + ' ' + braces[1];
}


// NOTE: These type checking functions intentionally don't use `instanceof`
// because it is fragile and can be easily faked with `Object.create()`.
function isArray(ar) {
  return Array.isArray(ar);
}
exports.isArray = isArray;

function isBoolean(arg) {
  return typeof arg === 'boolean';
}
exports.isBoolean = isBoolean;

function isNull(arg) {
  return arg === null;
}
exports.isNull = isNull;

function isNullOrUndefined(arg) {
  return arg == null;
}
exports.isNullOrUndefined = isNullOrUndefined;

function isNumber(arg) {
  return typeof arg === 'number';
}
exports.isNumber = isNumber;

function isString(arg) {
  return typeof arg === 'string';
}
exports.isString = isString;

function isSymbol(arg) {
  return typeof arg === 'symbol';
}
exports.isSymbol = isSymbol;

function isUndefined(arg) {
  return arg === void 0;
}
exports.isUndefined = isUndefined;

function isRegExp(re) {
  return isObject(re) && objectToString(re) === '[object RegExp]';
}
exports.isRegExp = isRegExp;

function isObject(arg) {
  return typeof arg === 'object' && arg !== null;
}
exports.isObject = isObject;

function isDate(d) {
  return isObject(d) && objectToString(d) === '[object Date]';
}
exports.isDate = isDate;

function isError(e) {
  return isObject(e) &&
      (objectToString(e) === '[object Error]' || e instanceof Error);
}
exports.isError = isError;

function isFunction(arg) {
  return typeof arg === 'function';
}
exports.isFunction = isFunction;

function isPrimitive(arg) {
  return arg === null ||
         typeof arg === 'boolean' ||
         typeof arg === 'number' ||
         typeof arg === 'string' ||
         typeof arg === 'symbol' ||  // ES6 symbol
         typeof arg === 'undefined';
}
exports.isPrimitive = isPrimitive;

exports.isBuffer = __webpack_require__(1116);

function objectToString(o) {
  return Object.prototype.toString.call(o);
}


function pad(n) {
  return n < 10 ? '0' + n.toString(10) : n.toString(10);
}


var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep',
              'Oct', 'Nov', 'Dec'];

// 26 Feb 16:19:34
function timestamp() {
  var d = new Date();
  var time = [pad(d.getHours()),
              pad(d.getMinutes()),
              pad(d.getSeconds())].join(':');
  return [d.getDate(), months[d.getMonth()], time].join(' ');
}


// log is just a thin wrapper to console.log that prepends a timestamp
exports.log = function() {
  console.log('%s - %s', timestamp(), exports.format.apply(exports, arguments));
};


/**
 * Inherit the prototype methods from one constructor into another.
 *
 * The Function.prototype.inherits from lang.js rewritten as a standalone
 * function (not on Function.prototype). NOTE: If this file is to be loaded
 * during bootstrapping this function needs to be rewritten using some native
 * functions as prototype setup using normal JavaScript does not work as
 * expected during bootstrapping (see mirror.js in r114903).
 *
 * @param {function} ctor Constructor function which needs to inherit the
 *     prototype.
 * @param {function} superCtor Constructor function to inherit prototype from.
 */
exports.inherits = __webpack_require__(754);

exports._extend = function(origin, add) {
  // Don't do anything if add isn't an object
  if (!add || !isObject(add)) return origin;

  var keys = Object.keys(add);
  var i = keys.length;
  while (i--) {
    origin[keys[i]] = add[keys[i]];
  }
  return origin;
};

function hasOwnProperty(obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(59), __webpack_require__(193)))

/***/ },

/***/ 377:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(jQuery) {
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(10);
var Widget = (function () {
    function Widget(el) {
        this.$el = jQuery(el.nativeElement);
        jQuery.fn.widgster.Constructor.DEFAULTS.bodySelector = '.widget-body';
        /*
         When widget is closed remove its parent if it is .col-*
         */
        jQuery(document).on('close.widgster', function (e) {
            var $colWrap = jQuery(e.target)
                .closest('.content > .row > [class*="col-"]:not(.widget-container)');
            // remove colWrap only if there are no more widgets inside
            if (!$colWrap.find('.widget').not(e.target).length) {
                $colWrap.remove();
            }
        });
    }
    Widget.prototype.ngOnInit = function () {
        this.$el.widgster();
    };
    return Widget;
}());
Widget = __decorate([
    core_1.Directive({
        selector: '[widget]'
    }),
    __metadata("design:paramtypes", [core_1.ElementRef])
], Widget);
exports.Widget = Widget;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(23)))

/***/ },

/***/ 378:
/***/ function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(10);
var common_1 = __webpack_require__(44);
var widget_directive_1 = __webpack_require__(377);
var WidgetModule = (function () {
    function WidgetModule() {
    }
    return WidgetModule;
}());
WidgetModule = __decorate([
    core_1.NgModule({
        imports: [common_1.CommonModule],
        declarations: [widget_directive_1.Widget],
        exports: [widget_directive_1.Widget]
    })
], WidgetModule);
exports.WidgetModule = WidgetModule;


/***/ },

/***/ 470:
/***/ function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(10);
var Autosize = (function () {
    function Autosize(element) {
        this.element = element;
    }
    Autosize.prototype.onInput = function (textArea) {
        this.adjust();
    };
    Autosize.prototype.ngAfterContentChecked = function () {
        this.adjust();
    };
    Autosize.prototype.adjust = function () {
        this.element.nativeElement.style.overflow = 'hidden';
        this.element.nativeElement.style.height = 'auto';
        this.element.nativeElement.style.height = this.element.nativeElement.scrollHeight + "px";
    };
    return Autosize;
}());
__decorate([
    core_1.HostListener('input', ['$event.target']),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [HTMLTextAreaElement]),
    __metadata("design:returntype", void 0)
], Autosize.prototype, "onInput", null);
Autosize = __decorate([
    core_1.Directive({
        selector: 'textarea[autosize]'
    }),
    __metadata("design:paramtypes", [core_1.ElementRef])
], Autosize);
exports.Autosize = Autosize;


/***/ },

/***/ 471:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(jQuery, $) {
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(10);
var forms_1 = __webpack_require__(71);
var NKDatetime = (function () {
    function NKDatetime(ngControl) {
        this.dateChange = new core_1.EventEmitter();
        this.timepickerOptions = {};
        this.datepickerOptions = {};
        this.hasClearButton = false;
        this.readonly = null;
        this.required = null;
        this.idDatePicker = uniqueId('q-datepicker_');
        this.idTimePicker = uniqueId('q-timepicker_');
        this.onChange = function (_) {
        };
        this.onTouched = function () {
        };
        ngControl.valueAccessor = this; // override valueAccessor
    }
    NKDatetime.prototype.ngAfterViewInit = function () {
        this.init();
    };
    NKDatetime.prototype.ngOnDestroy = function () {
        if (this.datepicker) {
            this.datepicker.datepicker('destroy');
        }
        if (this.timepicker) {
            this.timepicker.timepicker('remove');
        }
    };
    NKDatetime.prototype.ngOnChanges = function (changes) {
        if (changes) {
            if (changes['datepickerOptions'] && this.datepicker) {
                this.datepicker.datepicker('destroy');
                if (changes['datepickerOptions'].currentValue) {
                    this.datepicker = null;
                    this.init();
                }
                else if (changes['datepickerOptions'].currentValue === false) {
                    this.datepicker.remove();
                }
            }
            if (changes['timepickerOptions'] && this.timepicker) {
                this.timepicker.timepicker('remove');
                if (changes['timepickerOptions'].currentValue) {
                    this.timepicker = null;
                    this.init();
                }
                else if (changes['timepickerOptions'].currentValue === false) {
                    this.timepicker.parent().remove();
                }
            }
        }
    };
    NKDatetime.prototype.writeValue = function (value) {
        var _this = this;
        this.date = value;
        if (isDate(this.date)) {
            setTimeout(function () {
                _this.updateModel(_this.date);
            }, 0);
        }
        else {
            this.clearModels();
        }
    };
    NKDatetime.prototype.registerOnChange = function (fn) {
        this.onChange = fn;
    };
    NKDatetime.prototype.registerOnTouched = function (fn) {
        this.onTouched = fn;
    };
    NKDatetime.prototype.checkEmptyValue = function (e) {
        var value = e.target.value;
        if (value === '' && (this.timepickerOptions === false ||
            this.datepickerOptions === false ||
            (this.timeModel === '' && this.dateModel === ''))) {
            this.dateChange.emit(null);
        }
    };
    NKDatetime.prototype.clearModels = function () {
        this.dateChange.emit(null);
        if (this.timepicker) {
            this.timepicker.timepicker('setTime', null);
        }
        this.updateDatepicker(null);
    };
    //////////////////////////////////
    NKDatetime.prototype.init = function () {
        var _this = this;
        if (!this.datepicker && this.datepickerOptions !== false) {
            var options = jQuery.extend({ enableOnReadonly: !this.readonly }, this.datepickerOptions);
            this.datepicker = $('#' + this.idDatePicker).datepicker(options);
            this.datepicker
                .on('changeDate', function (e) {
                var newDate = e.date;
                if (isDate(_this.date) && isDate(newDate)) {
                    // get hours/minutes
                    newDate.setHours(_this.date.getHours());
                    newDate.setMinutes(_this.date.getMinutes());
                }
                _this.date = newDate;
                _this.dateChange.emit(newDate);
            });
        }
        else if (this.datepickerOptions === false) {
            $('#' + this.idDatePicker).remove();
        }
        if (!this.timepicker && this.timepickerOptions !== false) {
            var options = jQuery.extend({ defaultTime: false }, this.timepickerOptions);
            this.timepicker = $('#' + this.idTimePicker).timepicker(options);
            this.timepicker
                .on('changeTime.timepicker', function (e) {
                var _a = e.time, meridian = _a.meridian, hours = _a.hours;
                if (meridian) {
                    // has meridian -> convert 12 to 24h
                    if (meridian === 'PM' && hours < 12) {
                        hours = hours + 12;
                    }
                    if (meridian === 'AM' && hours === 12) {
                        hours = hours - 12;
                    }
                    hours = parseInt(_this.pad(hours));
                }
                if (!isDate(_this.date)) {
                    _this.date = new Date();
                    _this.updateDatepicker(_this.date);
                }
                _this.date.setHours(hours);
                _this.date.setMinutes(e.time.minutes);
                _this.dateChange.emit(_this.date);
            });
        }
        else if (this.timepickerOptions === false) {
            $('#' + this.idTimePicker).parent().remove();
        }
        this.updateModel(this.date);
    };
    NKDatetime.prototype.updateModel = function (date) {
        this.updateDatepicker(date);
        // update timepicker
        if (this.timepicker !== undefined && isDate(date)) {
            var hours = date.getHours();
            if (this.timepickerOptions.showMeridian) {
                // Convert 24 to 12 hour system
                hours = (hours === 0 || hours === 12) ? 12 : hours % 12;
            }
            var meridian = date.getHours() >= 12 ? ' PM' : ' AM';
            var time = this.pad(hours) + ':' +
                this.pad(this.date.getMinutes()) +
                (this.timepickerOptions.showMeridian || this.timepickerOptions.showMeridian === undefined
                    ? meridian : '');
            this.timepicker.timepicker('setTime', time);
            this.timeModel = time; // fix initial empty timeModel bug
        }
    };
    NKDatetime.prototype.updateDatepicker = function (date) {
        if (this.datepicker !== undefined) {
            this.datepicker.datepicker('update', date);
        }
    };
    NKDatetime.prototype.pad = function (value) {
        return value.toString().length < 2 ? '0' + value : value.toString();
    };
    return NKDatetime;
}());
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], NKDatetime.prototype, "dateChange", void 0);
__decorate([
    core_1.Input('timepicker'),
    __metadata("design:type", Object)
], NKDatetime.prototype, "timepickerOptions", void 0);
__decorate([
    core_1.Input('datepicker'),
    __metadata("design:type", Object)
], NKDatetime.prototype, "datepickerOptions", void 0);
__decorate([
    core_1.Input('hasClearButton'),
    __metadata("design:type", Boolean)
], NKDatetime.prototype, "hasClearButton", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], NKDatetime.prototype, "readonly", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], NKDatetime.prototype, "required", void 0);
__decorate([
    core_1.HostListener('dateChange', ['$event']),
    __metadata("design:type", Object)
], NKDatetime.prototype, "onChange", void 0);
NKDatetime = __decorate([
    core_1.Component({
        selector: 'datetime',
        template: "\n    <div class=\"form-inline\">\n        <div id=\"{{idDatePicker}}\" class=\"input-group date\">\n            <input type=\"text\" class=\"form-control\"\n                   [attr.readonly]=\"readonly\"\n                   [attr.required]=\"required\"\n                   [attr.placeholder]=\"datepickerOptions.placeholder || 'Choose date'\"\n                   [(ngModel)]=\"dateModel\"\n                   (keyup)=\"checkEmptyValue($event)\"/>\n            <div class=\"input-group-addon\">\n                <span [ngClass]=\"datepickerOptions.icon || 'glyphicon glyphicon-th'\"></span>\n            </div>\n        </div>\n        <div class=\"input-group bootstrap-timepicker timepicker\">\n            <input id=\"{{idTimePicker}}\" type=\"text\" class=\"form-control input-small\" \n                   [attr.readonly]=\"readonly\"\n                   [attr.required]=\"required\"\n                   [attr.placeholder]=\"timepickerOptions.placeholder || 'Set time'\"\n                   [(ngModel)]=\"timeModel\"\n                   (keyup)=\"checkEmptyValue($event)\">\n            <span class=\"input-group-addon\"><i [ngClass]=\"timepickerOptions.icon || 'glyphicon glyphicon-time'\"></i></span>\n        </div>\n        <button *ngIf=\"hasClearButton\" type=\"button\" (click)=\"clearModels()\">Clear</button>\n    </div>\n   "
    }),
    __metadata("design:paramtypes", [forms_1.NgControl])
], NKDatetime);
exports.NKDatetime = NKDatetime;
var id = 0;
function uniqueId(prefix) {
    return prefix + ++id;
}
function isDate(obj) {
    return Object.prototype.toString.call(obj) === '[object Date]';
}

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(23), __webpack_require__(23)))

/***/ },

/***/ 478:
/***/ function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!

Holder - 2.3.1 - client side image placeholders
(c) 2012-2014 Ivan Malopinsky / http://imsky.co

Provided under the MIT License.
Commercial use requires attribution.

*/
var Holder = Holder || {};
(function (app, win) {
var system_config = {
	use_svg: false,
	use_canvas: false,
	use_fallback: false
};
var instance_config = {};
var preempted = false;
canvas = document.createElement('canvas');
var dpr = 1, bsr = 1;
var resizable_images = [];

if (!canvas.getContext) {
	system_config.use_fallback = true;
} else {
	if (canvas.toDataURL("image/png")
		.indexOf("data:image/png") < 0) {
		//Android doesn't support data URI
		system_config.use_fallback = true;
	} else {
		var ctx = canvas.getContext("2d");
	}
}

if(!!document.createElementNS && !!document.createElementNS('http://www.w3.org/2000/svg', 'svg').createSVGRect){
	system_config.use_svg = true;
	system_config.use_canvas = false;
}

if(!system_config.use_fallback){
    dpr = window.devicePixelRatio || 1,
    bsr = ctx.webkitBackingStorePixelRatio || ctx.mozBackingStorePixelRatio || ctx.msBackingStorePixelRatio || ctx.oBackingStorePixelRatio || ctx.backingStorePixelRatio || 1;
}

var ratio = dpr / bsr;

var settings = {
	domain: "holder.js",
	images: "img",
	bgnodes: ".holderjs",
	themes: {
		"gray": {
			background: "#eee",
			foreground: "#aaa",
			size: 12
		},
		"social": {
			background: "#3a5a97",
			foreground: "#fff",
			size: 12
		},
		"industrial": {
			background: "#434A52",
			foreground: "#C2F200",
			size: 12
		},
		"sky": {
			background: "#0D8FDB",
			foreground: "#fff",
			size: 12
		},
		"vine": {
			background: "#39DBAC",
			foreground: "#1E292C",
			size: 12
		},
		"lava": {
			background: "#F8591A",
			foreground: "#1C2846",
			size: 12
		}
	},
	stylesheet: ""
};
app.flags = {
	dimensions: {
		regex: /^(\d+)x(\d+)$/,
		output: function (val) {
			var exec = this.regex.exec(val);
			return {
				width: +exec[1],
				height: +exec[2]
			}
		}
	},
	fluid: {
		regex: /^([0-9%]+)x([0-9%]+)$/,
		output: function (val) {
			var exec = this.regex.exec(val);
			return {
				width: exec[1],
				height: exec[2]
			}
		}
	},
	colors: {
		regex: /#([0-9a-f]{3,})\:#([0-9a-f]{3,})/i,
		output: function (val) {
			var exec = this.regex.exec(val);
			return {
				size: settings.themes.gray.size,
				foreground: "#" + exec[2],
				background: "#" + exec[1]
			}
		}
	},
	text: {
		regex: /text\:(.*)/,
		output: function (val) {
			return this.regex.exec(val)[1];
		}
	},
	font: {
		regex: /font\:(.*)/,
		output: function (val) {
			return this.regex.exec(val)[1];
		}
	},
	auto: {
		regex: /^auto$/
	},
	textmode: {
		regex: /textmode\:(.*)/,
		output: function(val){
			return this.regex.exec(val)[1];
		}
	}
}

function text_size(width, height, template) {
	height = parseInt(height, 10);
	width = parseInt(width, 10);
	var bigSide = Math.max(height, width)
	var smallSide = Math.min(height, width)
	var scale = 1 / 12;
	var newHeight = Math.min(smallSide * 0.75, 0.75 * bigSide * scale);
	return {
		height: Math.round(Math.max(template.size, newHeight))
	}
}

var svg_el = (function(){
	//Prevent IE <9 from initializing SVG renderer
	if(!window.XMLSerializer) return;
	var serializer = new XMLSerializer();
	var svg_ns = "http://www.w3.org/2000/svg"
	var svg = document.createElementNS(svg_ns, "svg");
	//IE throws an exception if this is set and Chrome requires it to be set
	if(svg.webkitMatchesSelector){
		svg.setAttribute("xmlns", "http://www.w3.org/2000/svg")
	}
	var bg_el = document.createElementNS(svg_ns, "rect")
	var text_el = document.createElementNS(svg_ns, "text")
	var textnode_el = document.createTextNode(null)
	text_el.setAttribute("text-anchor", "middle")
	text_el.appendChild(textnode_el)
	svg.appendChild(bg_el)
	svg.appendChild(text_el)

	return function(props){
		svg.setAttribute("width",props.width);
		svg.setAttribute("height", props.height);
		bg_el.setAttribute("width", props.width);
		bg_el.setAttribute("height", props.height);
		bg_el.setAttribute("fill", props.template.background);
		text_el.setAttribute("x", props.width/2)
		text_el.setAttribute("y", props.height/2)
		textnode_el.nodeValue=props.text
		text_el.setAttribute("style", css_properties({
		"fill": props.template.foreground,
		"font-weight": "bold",
		"font-size": props.text_height+"px",
		"font-family":props.font,
		"dominant-baseline":"central"
		}))
		return serializer.serializeToString(svg)
	}
})()

function css_properties(props){
	var ret = [];
	for(p in props){
		if(props.hasOwnProperty(p)){
			ret.push(p+":"+props[p])
		}
	}
	return ret.join(";")
}

function draw_canvas(args) {
	var ctx = args.ctx,
		dimensions = args.dimensions,
		template = args.template,
		ratio = args.ratio,
		holder = args.holder,
		literal = holder.textmode == "literal",
		exact = holder.textmode == "exact";

	var ts = text_size(dimensions.width, dimensions.height, template);
	var text_height = ts.height;
	var width = dimensions.width * ratio,
		height = dimensions.height * ratio;
	var font = template.font ? template.font : "Arial,Helvetica,sans-serif";
	canvas.width = width;
	canvas.height = height;
	ctx.textAlign = "center";
	ctx.textBaseline = "middle";
	ctx.fillStyle = template.background;
	ctx.fillRect(0, 0, width, height);
	ctx.fillStyle = template.foreground;
	ctx.font = "bold " + text_height + "px " + font;
	var text = template.text ? template.text : (Math.floor(dimensions.width) + "x" + Math.floor(dimensions.height));
	if (literal) {
		var dimensions = holder.dimensions;
		text = dimensions.width + "x" + dimensions.height;
	}
	else if(exact && holder.exact_dimensions){
		var dimensions = holder.exact_dimensions;
		text = (Math.floor(dimensions.width) + "x" + Math.floor(dimensions.height));
	}
	var text_width = ctx.measureText(text).width;
	if (text_width / width >= 0.75) {
		text_height = Math.floor(text_height * 0.75 * (width / text_width));
	}
	//Resetting font size if necessary
	ctx.font = "bold " + (text_height * ratio) + "px " + font;
	ctx.fillText(text, (width / 2), (height / 2), width);
	return canvas.toDataURL("image/png");
}

function draw_svg(args){
	var dimensions = args.dimensions,
		template = args.template,
		holder = args.holder,
		literal = holder.textmode == "literal",
		exact = holder.textmode == "exact";

	var ts = text_size(dimensions.width, dimensions.height, template);
	var text_height = ts.height;
	var width = dimensions.width,
		height = dimensions.height;
		
	var font = template.font ? template.font : "Arial,Helvetica,sans-serif";
	var text = template.text ? template.text : (Math.floor(dimensions.width) + "x" + Math.floor(dimensions.height));
	
	if (literal) {
		var dimensions = holder.dimensions;
		text = dimensions.width + "x" + dimensions.height;
	}
	else if(exact && holder.exact_dimensions){
		var dimensions = holder.exact_dimensions;
		text = (Math.floor(dimensions.width) + "x" + Math.floor(dimensions.height));
	}
	var string = svg_el({
		text: text, 
		width:width, 
		height:height, 
		text_height:text_height, 
		font:font, 
		template:template
	})
	return "data:image/svg+xml;base64,"+btoa(string);
}

function draw(args) {
	if(instance_config.use_canvas && !instance_config.use_svg){
		return draw_canvas(args);
	}
	else{
		return draw_svg(args);
	}
}

function render(mode, el, holder, src) {
	var dimensions = holder.dimensions,
		theme = holder.theme,
		text = holder.text ? decodeURIComponent(holder.text) : holder.text;
	var dimensions_caption = dimensions.width + "x" + dimensions.height;
	theme = (text ? extend(theme, {
		text: text
	}) : theme);
	theme = (holder.font ? extend(theme, {
		font: holder.font
	}) : theme);
	el.setAttribute("data-src", src);
	holder.theme = theme;
	el.holder_data = holder;
	
	if (mode == "image") {
		el.setAttribute("alt", text ? text : theme.text ? theme.text + " [" + dimensions_caption + "]" : dimensions_caption);
		if (instance_config.use_fallback || !holder.auto) {
			el.style.width = dimensions.width + "px";
			el.style.height = dimensions.height + "px";
		}
		if (instance_config.use_fallback) {
			el.style.backgroundColor = theme.background;
		} else {
			el.setAttribute("src", draw({ctx: ctx, dimensions: dimensions, template: theme, ratio:ratio, holder: holder}));
			
			if(holder.textmode && holder.textmode == "exact"){
				resizable_images.push(el);
				resizable_update(el);
			}
			
		}
	} else if (mode == "background") {
		if (!instance_config.use_fallback) {
			el.style.backgroundImage = "url(" + draw({ctx:ctx, dimensions: dimensions, template: theme, ratio: ratio, holder: holder}) + ")";
			el.style.backgroundSize = dimensions.width + "px " + dimensions.height + "px";
		}
	} else if (mode == "fluid") {
		el.setAttribute("alt", text ? text : theme.text ? theme.text + " [" + dimensions_caption + "]" : dimensions_caption);
		if (dimensions.height.slice(-1) == "%") {
			el.style.height = dimensions.height
		} else if(holder.auto == null || !holder.auto){
			el.style.height = dimensions.height + "px"
		}
		if (dimensions.width.slice(-1) == "%") {
			el.style.width = dimensions.width
		} else if(holder.auto == null || !holder.auto){
			el.style.width = dimensions.width + "px"
		}
		if (el.style.display == "inline" || el.style.display === "" || el.style.display == "none") {
			el.style.display = "block";
		}
		
		set_initial_dimensions(el)
		
		if (instance_config.use_fallback) {
			el.style.backgroundColor = theme.background;
		} else {
			resizable_images.push(el);
			resizable_update(el);
		}
	}
}

function dimension_check(el, callback) {
	var dimensions = {
		height: el.clientHeight,
		width: el.clientWidth
	};
	if (!dimensions.height && !dimensions.width) {
		el.setAttribute("data-holder-invisible", true)
		callback.call(this, el)
	}
	else{
		el.removeAttribute("data-holder-invisible")
		return dimensions;
	}
}

function set_initial_dimensions(el){
	if(el.holder_data){
		var dimensions = dimension_check(el, app.invisible_error_fn( set_initial_dimensions))
		if(dimensions){
			var holder = el.holder_data;
			holder.initial_dimensions = dimensions;
			holder.fluid_data = {
				fluid_height: holder.dimensions.height.slice(-1) == "%",
				fluid_width: holder.dimensions.width.slice(-1) == "%",
				mode: null
			}
			if(holder.fluid_data.fluid_width && !holder.fluid_data.fluid_height){
				holder.fluid_data.mode = "width"
				holder.fluid_data.ratio = holder.initial_dimensions.width / parseFloat(holder.dimensions.height)
			}
			else if(!holder.fluid_data.fluid_width && holder.fluid_data.fluid_height){
				holder.fluid_data.mode = "height";
				holder.fluid_data.ratio = parseFloat(holder.dimensions.width) / holder.initial_dimensions.height
			}
		}
	}
}

function resizable_update(element) {
	var images;
	if (element.nodeType == null) {
		images = resizable_images;
	} else {
		images = [element]
	}
	for (var i in images) {
		if (!images.hasOwnProperty(i)) {
			continue;
		}
		var el = images[i]
		if (el.holder_data) {
			var holder = el.holder_data;
			var dimensions = dimension_check(el, app.invisible_error_fn( resizable_update))
			if(dimensions){
				if(holder.fluid){
					if(holder.auto){
						switch(holder.fluid_data.mode){
							case "width":
								dimensions.height = dimensions.width / holder.fluid_data.ratio;
							break;
							case "height":
								dimensions.width = dimensions.height * holder.fluid_data.ratio;
							break;
						}
					}
					el.setAttribute("src", draw({
						ctx: ctx,
						dimensions: dimensions,
						template: holder.theme,
						ratio: ratio,
						holder: holder
					}))
				}
				if(holder.textmode && holder.textmode == "exact"){
					holder.exact_dimensions = dimensions;
					el.setAttribute("src", draw({
						ctx: ctx,
						dimensions: holder.dimensions,
						template: holder.theme,
						ratio: ratio,
						holder: holder
					}))
				}
			}
		}
	}
}

function parse_flags(flags, options) {
	var ret = {
		theme: extend(settings.themes.gray, {})
	};
	var render = false;
	for (var fl = flags.length, j = 0; j < fl; j++) {
		var flag = flags[j];
		if (app.flags.dimensions.match(flag)) {
			render = true;
			ret.dimensions = app.flags.dimensions.output(flag);
		} else if (app.flags.fluid.match(flag)) {
			render = true;
			ret.dimensions = app.flags.fluid.output(flag);
			ret.fluid = true;
		} else if (app.flags.textmode.match(flag)) {
			ret.textmode = app.flags.textmode.output(flag)
		} else if (app.flags.colors.match(flag)) {
			ret.theme = app.flags.colors.output(flag);
		} else if (options.themes[flag]) {
			//If a theme is specified, it will override custom colors
			if(options.themes.hasOwnProperty(flag)){
				ret.theme = extend(options.themes[flag], {});
			}
		} else if (app.flags.font.match(flag)) {
			ret.font = app.flags.font.output(flag);
		} else if (app.flags.auto.match(flag)) {
			ret.auto = true;
		} else if (app.flags.text.match(flag)) {
			ret.text = app.flags.text.output(flag);
		}
	}
	return render ? ret : false;
}

for (var flag in app.flags) {
	if (!app.flags.hasOwnProperty(flag)) continue;
	app.flags[flag].match = function (val) {
		return val.match(this.regex)
	}
}

app.invisible_error_fn = function(fn){
	return function(el){
		if(el.hasAttribute("data-holder-invisible")){
			throw new Error("Holder: invisible placeholder")
		}
	}
}

app.add_theme = function (name, theme) {
	name != null && theme != null && (settings.themes[name] = theme);
	return app;
};

app.add_image = function (src, el) {
	var node = selector(el);
	if (node.length) {
		for (var i = 0, l = node.length; i < l; i++) {
			var img = document.createElement("img")
			img.setAttribute("data-src", src);
			node[i].appendChild(img);
		}
	}
	return app;
};

app.run = function (o) {
	instance_config = extend({}, system_config)
	preempted = true;

	var options = extend(settings, o),
		images = [],
		imageNodes = [],
		bgnodes = [];
		
	if(options.use_canvas != null && options.use_canvas){
		instance_config.use_canvas = true;
		instance_config.use_svg = false;
	}
		
	if (typeof (options.images) == "string") {
		imageNodes = selector(options.images);
	} else if (window.NodeList && options.images instanceof window.NodeList) {
		imageNodes = options.images;
	} else if (window.Node && options.images instanceof window.Node) {
		imageNodes = [options.images];
	} else if(window.HTMLCollection && options.images instanceof window.HTMLCollection){
		imageNodes = options.images
	}

	if (typeof (options.bgnodes) == "string") {
		bgnodes = selector(options.bgnodes);
	} else if (window.NodeList && options.elements instanceof window.NodeList) {
		bgnodes = options.bgnodes;
	} else if (window.Node && options.bgnodes instanceof window.Node) {
		bgnodes = [options.bgnodes];
	}
	for (i = 0, l = imageNodes.length; i < l; i++) images.push(imageNodes[i]);
	var holdercss = document.getElementById("holderjs-style");
	if (!holdercss) {
		holdercss = document.createElement("style");
		holdercss.setAttribute("id", "holderjs-style");
		holdercss.type = "text/css";
		document.getElementsByTagName("head")[0].appendChild(holdercss);
	}
	if (!options.nocss) {
		if (holdercss.styleSheet) {
			holdercss.styleSheet.cssText += options.stylesheet;
		} else {
			holdercss.appendChild(document.createTextNode(options.stylesheet));
		}
	}
	var cssregex = new RegExp(options.domain + "\/(.*?)\"?\\)");
	for (var l = bgnodes.length, i = 0; i < l; i++) {
		var src = window.getComputedStyle(bgnodes[i], null)
			.getPropertyValue("background-image");
		var flags = src.match(cssregex);
		var bgsrc = bgnodes[i].getAttribute("data-background-src");
		if (flags) {
			var holder = parse_flags(flags[1].split("/"), options);
			if (holder) {
				render("background", bgnodes[i], holder, src);
			}
		} else if (bgsrc != null) {
			var holder = parse_flags(bgsrc.substr(bgsrc.lastIndexOf(options.domain) + options.domain.length + 1)
				.split("/"), options);
			if (holder) {
				render("background", bgnodes[i], holder, src);
			}
		}
	}
	for (l = images.length, i = 0; i < l; i++) {
		var attr_data_src, attr_src;
		attr_src = attr_data_src = src = null;
		try {
			attr_src = images[i].getAttribute("src");
			attr_datasrc = images[i].getAttribute("data-src");
		} catch (e) {}
		if (attr_datasrc == null && !! attr_src && attr_src.indexOf(options.domain) >= 0) {
			src = attr_src;
		} else if ( !! attr_datasrc && attr_datasrc.indexOf(options.domain) >= 0) {
			src = attr_datasrc;
		}
		if (src) {
			var holder = parse_flags(src.substr(src.lastIndexOf(options.domain) + options.domain.length + 1).split("/"), options);
			if (holder) {
				if (holder.fluid) {
					render("fluid", images[i], holder, src)
				} else {
					render("image", images[i], holder, src);
				}
			}
		}
	}
	return app;
};

contentLoaded(win, function () {
	if (window.addEventListener) {
		window.addEventListener("resize", resizable_update, false);
		window.addEventListener("orientationchange", resizable_update, false);
	} else {
		window.attachEvent("onresize", resizable_update)
	}
	preempted || app.run({});
});
if (true) {
	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function () {
		return app;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
}

//github.com/davidchambers/Base64.js
(function(){function t(t){this.message=t}var e= true?exports:this,r="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";t.prototype=Error(),t.prototype.name="InvalidCharacterError",e.btoa||(e.btoa=function(e){for(var o,n,a=0,i=r,c="";e.charAt(0|a)||(i="=",a%1);c+=i.charAt(63&o>>8-8*(a%1))){if(n=e.charCodeAt(a+=.75),n>255)throw new t("'btoa' failed");o=o<<8|n}return c}),e.atob||(e.atob=function(e){if(e=e.replace(/=+$/,""),1==e.length%4)throw new t("'atob' failed");for(var o,n,a=0,i=0,c="";n=e.charAt(i++);~n&&(o=a%4?64*o+n:n,a++%4)?c+=String.fromCharCode(255&o>>(6&-2*a)):0)n=r.indexOf(n);return c})})();

//getElementsByClassName polyfill
document.getElementsByClassName||(document.getElementsByClassName=function(e){var t=document,n,r,i,s=[];if(t.querySelectorAll)return t.querySelectorAll("."+e);if(t.evaluate){r=".//*[contains(concat(' ', @class, ' '), ' "+e+" ')]",n=t.evaluate(r,t,null,0,null);while(i=n.iterateNext())s.push(i)}else{n=t.getElementsByTagName("*"),r=new RegExp("(^|\\s)"+e+"(\\s|$)");for(i=0;i<n.length;i++)r.test(n[i].className)&&s.push(n[i])}return s})

//getComputedStyle polyfill
window.getComputedStyle||(window.getComputedStyle=function(e){return this.el=e,this.getPropertyValue=function(t){var n=/(\-([a-z]){1})/g;return t=="float"&&(t="styleFloat"),n.test(t)&&(t=t.replace(n,function(){return arguments[2].toUpperCase()})),e.currentStyle[t]?e.currentStyle[t]:null},this})

//http://javascript.nwbox.com/ContentLoaded by Diego Perini with modifications
function contentLoaded(n,t){var l="complete",s="readystatechange",u=!1,h=u,c=!0,i=n.document,a=i.documentElement,e=i.addEventListener?"addEventListener":"attachEvent",v=i.addEventListener?"removeEventListener":"detachEvent",f=i.addEventListener?"":"on",r=function(e){(e.type!=s||i.readyState==l)&&((e.type=="load"?n:i)[v](f+e.type,r,u),!h&&(h=!0)&&t.call(n,null))},o=function(){try{a.doScroll("left")}catch(n){setTimeout(o,50);return}r("poll")};if(i.readyState==l)t.call(n,"lazy");else{if(i.createEventObject&&a.doScroll){try{c=!n.frameElement}catch(y){}c&&o()}i[e](f+"DOMContentLoaded",r,u),i[e](f+s,r,u),n[e](f+"load",r,u)}}

//https://gist.github.com/991057 by Jed Schmidt with modifications
function selector(a,b){var a=a.match(/^(\W)?(.*)/),b=b||document,c=b["getElement"+(a[1]?"#"==a[1]?"ById":"sByClassName":"sByTagName")],d=c.call(b,a[2]),e=[];return null!==d&&(e=d.length||0===d.length?d:[d]),e}

//shallow object property extend
function extend(a,b){
	var c={};
	for(var i in a){
		if(a.hasOwnProperty(i)){
			c[i]=a[i];
		}
	}
	for(var i in b){
		if(b.hasOwnProperty(i)){
			c[i]=b[i];
		}
	}
	return c
}

//hasOwnProperty polyfill
if (!Object.prototype.hasOwnProperty)
    /*jshint -W001, -W103 */
    Object.prototype.hasOwnProperty = function(prop) {
		var proto = this.__proto__ || this.constructor.prototype;
		return (prop in this) && (!(prop in proto) || proto[prop] !== this[prop]);
	}
    /*jshint +W001, +W103 */

})(Holder, window);


/***/ },

/***/ 479:
/***/ function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(__webpack_provided_window_dot_jQuery) {/* ===========================================================
 * Bootstrap: fileinput.js v3.1.3
 * http://jasny.github.com/bootstrap/javascript/#fileinput
 * ===========================================================
 * Copyright 2012-2014 Arnold Daniels
 *
 * Licensed under the Apache License, Version 2.0 (the "License")
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ========================================================== */

+function ($) { "use strict";

  var isIE = window.navigator.appName == 'Microsoft Internet Explorer'

  // FILEUPLOAD PUBLIC CLASS DEFINITION
  // =================================

  var Fileinput = function (element, options) {
    this.$element = $(element)
    
    this.$input = this.$element.find(':file')
    if (this.$input.length === 0) return

    this.name = this.$input.attr('name') || options.name

    this.$hidden = this.$element.find('input[type=hidden][name="' + this.name + '"]')
    if (this.$hidden.length === 0) {
      this.$hidden = $('<input type="hidden">').insertBefore(this.$input)
    }

    this.$preview = this.$element.find('.fileinput-preview')
    var height = this.$preview.css('height')
    if (this.$preview.css('display') !== 'inline' && height !== '0px' && height !== 'none') {
      this.$preview.css('line-height', height)
    }
        
    this.original = {
      exists: this.$element.hasClass('fileinput-exists'),
      preview: this.$preview.html(),
      hiddenVal: this.$hidden.val()
    }
    
    this.listen()
  }
  
  Fileinput.prototype.listen = function() {
    this.$input.on('change.bs.fileinput', $.proxy(this.change, this))
    $(this.$input[0].form).on('reset.bs.fileinput', $.proxy(this.reset, this))
    
    this.$element.find('[data-trigger="fileinput"]').on('click.bs.fileinput', $.proxy(this.trigger, this))
    this.$element.find('[data-dismiss="fileinput"]').on('click.bs.fileinput', $.proxy(this.clear, this))
  },

  Fileinput.prototype.change = function(e) {
    var files = e.target.files === undefined ? (e.target && e.target.value ? [{ name: e.target.value.replace(/^.+\\/, '')}] : []) : e.target.files
    
    e.stopPropagation()

    if (files.length === 0) {
      this.clear()
      return
    }

    this.$hidden.val('')
    this.$hidden.attr('name', '')
    this.$input.attr('name', this.name)

    var file = files[0]

    if (this.$preview.length > 0 && (typeof file.type !== "undefined" ? file.type.match(/^image\/(gif|png|jpeg)$/) : file.name.match(/\.(gif|png|jpe?g)$/i)) && typeof FileReader !== "undefined") {
      var reader = new FileReader()
      var preview = this.$preview
      var element = this.$element

      reader.onload = function(re) {
        var $img = $('<img>')
        $img[0].src = re.target.result
        files[0].result = re.target.result
        
        element.find('.fileinput-filename').text(file.name)
        
        // if parent has max-height, using `(max-)height: 100%` on child doesn't take padding and border into account
        if (preview.css('max-height') != 'none') $img.css('max-height', parseInt(preview.css('max-height'), 10) - parseInt(preview.css('padding-top'), 10) - parseInt(preview.css('padding-bottom'), 10)  - parseInt(preview.css('border-top'), 10) - parseInt(preview.css('border-bottom'), 10))
        
        preview.html($img)
        element.addClass('fileinput-exists').removeClass('fileinput-new')

        element.trigger('change.bs.fileinput', files)
      }

      reader.readAsDataURL(file)
    } else {
      this.$element.find('.fileinput-filename').text(file.name)
      this.$preview.text(file.name)
      
      this.$element.addClass('fileinput-exists').removeClass('fileinput-new')
      
      this.$element.trigger('change.bs.fileinput')
    }
  },

  Fileinput.prototype.clear = function(e) {
    if (e) e.preventDefault()
    
    this.$hidden.val('')
    this.$hidden.attr('name', this.name)
    this.$input.attr('name', '')

    //ie8+ doesn't support changing the value of input with type=file so clone instead
    if (isIE) { 
      var inputClone = this.$input.clone(true);
      this.$input.after(inputClone);
      this.$input.remove();
      this.$input = inputClone;
    } else {
      this.$input.val('')
    }

    this.$preview.html('')
    this.$element.find('.fileinput-filename').text('')
    this.$element.addClass('fileinput-new').removeClass('fileinput-exists')
    
    if (e !== undefined) {
      this.$input.trigger('change')
      this.$element.trigger('clear.bs.fileinput')
    }
  },

  Fileinput.prototype.reset = function() {
    this.clear()

    this.$hidden.val(this.original.hiddenVal)
    this.$preview.html(this.original.preview)
    this.$element.find('.fileinput-filename').text('')

    if (this.original.exists) this.$element.addClass('fileinput-exists').removeClass('fileinput-new')
     else this.$element.addClass('fileinput-new').removeClass('fileinput-exists')
    
    this.$element.trigger('reset.bs.fileinput')
  },

  Fileinput.prototype.trigger = function(e) {
    this.$input.trigger('click')
    e.preventDefault()
  }

  
  // FILEUPLOAD PLUGIN DEFINITION
  // ===========================

  var old = $.fn.fileinput
  
  $.fn.fileinput = function (options) {
    return this.each(function () {
      var $this = $(this),
          data = $this.data('bs.fileinput')
      if (!data) $this.data('bs.fileinput', (data = new Fileinput(this, options)))
      if (typeof options == 'string') data[options]()
    })
  }

  $.fn.fileinput.Constructor = Fileinput


  // FILEINPUT NO CONFLICT
  // ====================

  $.fn.fileinput.noConflict = function () {
    $.fn.fileinput = old
    return this
  }


  // FILEUPLOAD DATA-API
  // ==================

  $(document).on('click.fileinput.data-api', '[data-provides="fileinput"]', function (e) {
    var $this = $(this)
    if ($this.data('bs.fileinput')) return
    $this.fileinput($this.data())
      
    var $target = $(e.target).closest('[data-dismiss="fileinput"],[data-trigger="fileinput"]');
    if ($target.length > 0) {
      e.preventDefault()
      $target.trigger('click.bs.fileinput')
    }
  })

}(__webpack_provided_window_dot_jQuery);

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(23)))

/***/ },

/***/ 637:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(jQuery) {
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = __webpack_require__(10);
var Select2Component = (function () {
    function Select2Component(renderer) {
        this.renderer = renderer;
        this.cssImport = true;
        this.disabled = false;
        this.valueChanged = new core_1.EventEmitter();
        this.element = undefined;
        this.check = false;
        this.style = "\n            .select2-container{box-sizing:border-box;display:inline-block;margin:0;position:relative;vertical-align:middle;min-width:100px}.select2-container .select2-selection--single{box-sizing:border-box;cursor:pointer;display:block;height:28px;user-select:none;-webkit-user-select:none}.select2-container .select2-selection--single .select2-selection__rendered{display:block;padding-left:8px;padding-right:20px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.select2-container .select2-selection--single .select2-selection__clear{position:relative}.select2-container[dir=rtl] .select2-selection--single .select2-selection__rendered{padding-right:8px;padding-left:20px}.select2-container .select2-selection--multiple{box-sizing:border-box;cursor:pointer;display:block;min-height:32px;user-select:none;-webkit-user-select:none}.select2-container .select2-selection--multiple .select2-selection__rendered{display:inline-block;overflow:hidden;padding-left:8px;text-overflow:ellipsis;white-space:nowrap}.select2-container .select2-search--inline{float:left}.select2-container .select2-search--inline .select2-search__field{box-sizing:border-box;border:none;font-size:100%;margin-top:5px;padding:0}.select2-container .select2-search--inline .select2-search__field::-webkit-search-cancel-button{-webkit-appearance:none}.select2-dropdown{background-color:#fff;border:1px solid #aaa;border-radius:4px;box-sizing:border-box;display:block;position:absolute;left:-100000px;width:100%;z-index:1051}.select2-results{display:block}.select2-results__options{list-style:none;margin:0;padding:0}.select2-results__option{padding:6px;user-select:none;-webkit-user-select:none}.select2-results__option[aria-selected]{cursor:pointer}.select2-container--open .select2-dropdown{left:0}.select2-container--open .select2-dropdown--above{border-bottom:none;border-bottom-left-radius:0;border-bottom-right-radius:0}.select2-container--open .select2-dropdown--below{border-top:none;border-top-left-radius:0;border-top-right-radius:0}.select2-search--dropdown{display:block;padding:4px}.select2-search--dropdown .select2-search__field{padding:4px;width:100%;box-sizing:border-box}.select2-search--dropdown .select2-search__field::-webkit-search-cancel-button{-webkit-appearance:none}.select2-search--dropdown.select2-search--hide{display:none}.select2-close-mask{border:0;margin:0;padding:0;display:block;position:fixed;left:0;top:0;min-height:100%;min-width:100%;height:auto;width:auto;opacity:0;z-index:99;background-color:#fff;filter:alpha(opacity=0)}.select2-hidden-accessible{border:0!important;clip:rect(0 0 0 0)!important;height:1px!important;margin:-1px!important;overflow:hidden!important;padding:0!important;position:absolute!important;width:1px!important}.select2-container--classic .select2-results>.select2-results__options,.select2-container--default .select2-results>.select2-results__options{max-height:200px;overflow-y:auto}.select2-container--default .select2-selection--single{background-color:#fff;border:1px solid #aaa;border-radius:4px}.select2-container--default .select2-selection--single .select2-selection__rendered{color:#444;line-height:28px}.select2-container--default .select2-selection--single .select2-selection__clear{cursor:pointer;float:right;font-weight:700}.select2-container--default .select2-selection--single .select2-selection__placeholder{color:#999}.select2-container--default .select2-selection--single .select2-selection__arrow{height:26px;position:absolute;top:1px;right:1px;width:20px}.select2-container--default .select2-selection--single .select2-selection__arrow b{border-color:#888 transparent transparent;border-style:solid;border-width:5px 4px 0;height:0;left:50%;margin-left:-4px;margin-top:-2px;position:absolute;top:50%;width:0}.select2-container--default[dir=rtl] .select2-selection--single .select2-selection__clear{float:left}.select2-container--default[dir=rtl] .select2-selection--single .select2-selection__arrow{left:1px;right:auto}.select2-container--default.select2-container--disabled .select2-selection--single{background-color:#eee;cursor:default}.select2-container--default.select2-container--disabled .select2-selection--single .select2-selection__clear{display:none}.select2-container--default.select2-container--open .select2-selection--single .select2-selection__arrow b{border-color:transparent transparent #888;border-width:0 4px 5px}.select2-container--default .select2-selection--multiple{background-color:#fff;border:1px solid #aaa;border-radius:4px;cursor:text}.select2-container--default .select2-selection--multiple .select2-selection__rendered{box-sizing:border-box;list-style:none;margin:0;padding:0 5px;width:100%}.select2-container--default .select2-selection--multiple .select2-selection__rendered li{list-style:none}.select2-container--default .select2-selection--multiple .select2-selection__placeholder{color:#999;margin-top:5px;float:left}.select2-container--default .select2-selection--multiple .select2-selection__clear{cursor:pointer;float:right;font-weight:700;margin-top:5px;margin-right:10px}.select2-container--default .select2-selection--multiple .select2-selection__choice{background-color:#e4e4e4;border:1px solid #aaa;border-radius:4px;cursor:default;float:left;margin-right:5px;margin-top:5px;padding:0 5px}.select2-container--default .select2-selection--multiple .select2-selection__choice__remove{color:#999;cursor:pointer;display:inline-block;font-weight:700;margin-right:2px}.select2-container--default .select2-selection--multiple .select2-selection__choice__remove:hover{color:#333}.select2-container--default[dir=rtl] .select2-selection--multiple .select2-search--inline,.select2-container--default[dir=rtl] .select2-selection--multiple .select2-selection__choice,.select2-container--default[dir=rtl] .select2-selection--multiple .select2-selection__placeholder{float:right}.select2-container--default[dir=rtl] .select2-selection--multiple .select2-selection__choice{margin-left:5px;margin-right:auto}.select2-container--default[dir=rtl] .select2-selection--multiple .select2-selection__choice__remove{margin-left:2px;margin-right:auto}.select2-container--default.select2-container--focus .select2-selection--multiple{border:1px solid #000;outline:0}.select2-container--default.select2-container--disabled .select2-selection--multiple{background-color:#eee;cursor:default}.select2-container--default.select2-container--disabled .select2-selection__choice__remove{display:none}.select2-container--default.select2-container--open.select2-container--above .select2-selection--multiple,.select2-container--default.select2-container--open.select2-container--above .select2-selection--single{border-top-left-radius:0;border-top-right-radius:0}.select2-container--default.select2-container--open.select2-container--below .select2-selection--multiple,.select2-container--default.select2-container--open.select2-container--below .select2-selection--single{border-bottom-left-radius:0;border-bottom-right-radius:0}.select2-container--default .select2-search--dropdown .select2-search__field{border:1px solid #aaa}.select2-container--default .select2-search--inline .select2-search__field{background:0 0;border:none;outline:0;box-shadow:none;-webkit-appearance:textfield}.select2-container--default .select2-results__option[role=group]{padding:0}.select2-container--default .select2-results__option[aria-disabled=true]{color:#999}.select2-container--default .select2-results__option[aria-selected=true]{background-color:#ddd}.select2-container--default .select2-results__option .select2-results__option{padding-left:1em}.select2-container--default .select2-results__option .select2-results__option .select2-results__group{padding-left:0}.select2-container--default .select2-results__option .select2-results__option .select2-results__option{margin-left:-1em;padding-left:2em}.select2-container--default .select2-results__option .select2-results__option .select2-results__option .select2-results__option{margin-left:-2em;padding-left:3em}.select2-container--default .select2-results__option .select2-results__option .select2-results__option .select2-results__option .select2-results__option{margin-left:-3em;padding-left:4em}.select2-container--default .select2-results__option .select2-results__option .select2-results__option .select2-results__option .select2-results__option .select2-results__option{margin-left:-4em;padding-left:5em}.select2-container--default .select2-results__option .select2-results__option .select2-results__option .select2-results__option .select2-results__option .select2-results__option .select2-results__option{margin-left:-5em;padding-left:6em}.select2-container--default .select2-results__option--highlighted[aria-selected]{background-color:#5897fb;color:#fff}.select2-container--default .select2-results__group{cursor:default;display:block;padding:6px}.select2-container--classic .select2-selection--single{background-color:#f7f7f7;border:1px solid #aaa;border-radius:4px;outline:0;background-image:-webkit-linear-gradient(top,#fff 50%,#eee 100%);background-image:-o-linear-gradient(top,#fff 50%,#eee 100%);background-image:linear-gradient(to bottom,#fff 50%,#eee 100%);background-repeat:repeat-x;filter:progid:DXImageTransform.Microsoft.gradient(startColorstr='#FFFFFFFF', endColorstr='#FFEEEEEE', GradientType=0)}.select2-container--classic .select2-selection--single:focus{border:1px solid #5897fb}.select2-container--classic .select2-selection--single .select2-selection__rendered{color:#444;line-height:28px}.select2-container--classic .select2-selection--single .select2-selection__clear{cursor:pointer;float:right;font-weight:700;margin-right:10px}.select2-container--classic .select2-selection--single .select2-selection__placeholder{color:#999}.select2-container--classic .select2-selection--single .select2-selection__arrow{background-color:#ddd;border:none;border-left:1px solid #aaa;border-top-right-radius:4px;border-bottom-right-radius:4px;height:26px;position:absolute;top:1px;right:1px;width:20px;background-image:-webkit-linear-gradient(top,#eee 50%,#ccc 100%);background-image:-o-linear-gradient(top,#eee 50%,#ccc 100%);background-image:linear-gradient(to bottom,#eee 50%,#ccc 100%);background-repeat:repeat-x;filter:progid:DXImageTransform.Microsoft.gradient(startColorstr='#FFEEEEEE', endColorstr='#FFCCCCCC', GradientType=0)}.select2-container--classic .select2-selection--single .select2-selection__arrow b{border-color:#888 transparent transparent;border-style:solid;border-width:5px 4px 0;height:0;left:50%;margin-left:-4px;margin-top:-2px;position:absolute;top:50%;width:0}.select2-container--classic[dir=rtl] .select2-selection--single .select2-selection__clear{float:left}.select2-container--classic[dir=rtl] .select2-selection--single .select2-selection__arrow{border:none;border-right:1px solid #aaa;border-radius:4px 0 0 4px;left:1px;right:auto}.select2-container--classic.select2-container--open .select2-selection--single{border:1px solid #5897fb}.select2-container--classic.select2-container--open .select2-selection--single .select2-selection__arrow{background:0 0;border:none}.select2-container--classic.select2-container--open .select2-selection--single .select2-selection__arrow b{border-color:transparent transparent #888;border-width:0 4px 5px}.select2-container--classic.select2-container--open.select2-container--above .select2-selection--single{border-top:none;border-top-left-radius:0;border-top-right-radius:0;background-image:-webkit-linear-gradient(top,#fff 0,#eee 50%);background-image:-o-linear-gradient(top,#fff 0,#eee 50%);background-image:linear-gradient(to bottom,#fff 0,#eee 50%);background-repeat:repeat-x;filter:progid:DXImageTransform.Microsoft.gradient(startColorstr='#FFFFFFFF', endColorstr='#FFEEEEEE', GradientType=0)}.select2-container--classic.select2-container--open.select2-container--below .select2-selection--single{border-bottom:none;border-bottom-left-radius:0;border-bottom-right-radius:0;background-image:-webkit-linear-gradient(top,#eee 50%,#fff 100%);background-image:-o-linear-gradient(top,#eee 50%,#fff 100%);background-image:linear-gradient(to bottom,#eee 50%,#fff 100%);background-repeat:repeat-x;filter:progid:DXImageTransform.Microsoft.gradient(startColorstr='#FFEEEEEE', endColorstr='#FFFFFFFF', GradientType=0)}.select2-container--classic .select2-selection--multiple{background-color:#fff;border:1px solid #aaa;border-radius:4px;cursor:text;outline:0}.select2-container--classic .select2-selection--multiple:focus{border:1px solid #5897fb}.select2-container--classic .select2-selection--multiple .select2-selection__rendered{list-style:none;margin:0;padding:0 5px}.select2-container--classic .select2-selection--multiple .select2-selection__clear{display:none}.select2-container--classic .select2-selection--multiple .select2-selection__choice{background-color:#e4e4e4;border:1px solid #aaa;border-radius:4px;cursor:default;float:left;margin-right:5px;margin-top:5px;padding:0 5px}.select2-container--classic .select2-selection--multiple .select2-selection__choice__remove{color:#888;cursor:pointer;display:inline-block;font-weight:700;margin-right:2px}.select2-container--classic .select2-selection--multiple .select2-selection__choice__remove:hover{color:#555}.select2-container--classic[dir=rtl] .select2-selection--multiple .select2-selection__choice{float:right;margin-left:5px;margin-right:auto}.select2-container--classic[dir=rtl] .select2-selection--multiple .select2-selection__choice__remove{margin-left:2px;margin-right:auto}.select2-container--classic.select2-container--open .select2-selection--multiple{border:1px solid #5897fb}.select2-container--classic.select2-container--open.select2-container--above .select2-selection--multiple{border-top:none;border-top-left-radius:0;border-top-right-radius:0}.select2-container--classic.select2-container--open.select2-container--below .select2-selection--multiple{border-bottom:none;border-bottom-left-radius:0;border-bottom-right-radius:0}.select2-container--classic .select2-search--dropdown .select2-search__field{border:1px solid #aaa;outline:0}.select2-container--classic .select2-search--inline .select2-search__field{outline:0;box-shadow:none}.select2-container--classic .select2-dropdown{background-color:#fff;border:1px solid transparent}.select2-container--classic .select2-dropdown--above{border-bottom:none}.select2-container--classic .select2-dropdown--below{border-top:none}.select2-container--classic .select2-results__option[role=group]{padding:0}.select2-container--classic .select2-results__option[aria-disabled=true]{color:grey}.select2-container--classic .select2-results__option--highlighted[aria-selected]{background-color:#3875d7;color:#fff}.select2-container--classic .select2-results__group{cursor:default;display:block;padding:6px}.select2-container--classic.select2-container--open .select2-dropdown{border-color:#5897fb}";
    }
    Select2Component.prototype.ngOnInit = function () {
        if (this.cssImport) {
            var head = document.getElementsByTagName('head')[0];
            var link = head.children[head.children.length - 1];
            if (!link.version) {
                var newLink = this.renderer.createElement(head, 'style');
                this.renderer.setElementProperty(newLink, 'type', 'text/css');
                this.renderer.setElementProperty(newLink, 'version', 'select2');
                this.renderer.setElementProperty(newLink, 'innerHTML', this.style);
            }
        }
    };
    Select2Component.prototype.ngOnChanges = function (changes) {
        if (!this.element) {
            return;
        }
        if (changes['data'] && JSON.stringify(changes['data'].previousValue) !== JSON.stringify(changes['data'].currentValue)) {
            this.initPlugin();
            var newValue = this.element.val();
            this.valueChanged.emit({
                value: newValue
            });
        }
        if (changes['value'] && changes['value'].previousValue !== changes['value'].currentValue) {
            var newValue = changes['value'].currentValue;
            this.renderer.setElementProperty(this.selector.nativeElement, 'value', newValue);
            this.element.trigger('change.select2');
            this.valueChanged.emit({
                value: newValue
            });
        }
        if (changes['disabled'] && changes['disabled'].previousValue !== changes['disabled'].currentValue) {
            this.renderer.setElementProperty(this.selector.nativeElement, 'disabled', this.disabled);
        }
    };
    Select2Component.prototype.ngAfterViewInit = function () {
        var that = this;
        this.element = jQuery(this.selector.nativeElement);
        this.initPlugin();
        if (typeof this.value !== 'undefined') {
            this.renderer.setElementProperty(this.selector.nativeElement, 'value', this.value);
            this.element.trigger('change.select2');
        }
        this.element.on('select2:select select2:unselect', function () {
            that.valueChanged.emit({
                value: that.element.val()
            });
        });
    };
    Select2Component.prototype.ngOnDestroy = function () {
        this.element.off("select2:select");
    };
    Select2Component.prototype.initPlugin = function () {
        var _this = this;
        if (!this.element.select2) {
            if (!this.check) {
                this.check = true;
                console.log("Please add Select2 library (js file) to the project. You can download it from https://github.com/select2/select2/tree/master/dist/js.");
            }
            return;
        }
        if (this.element.hasClass('select2-hidden-accessible') == true) {
            this.element.select2('destroy');
            this.renderer.setElementProperty(this.selector.nativeElement, 'innerHTML', '');
        }
        var options = {
            data: this.data,
            width: (this.width) ? this.width : 'resolve'
        };
        Object.assign(options, this.options);
        if (options.matcher) {
            jQuery.fn.select2.amd.require(['select2/compat/matcher'], function (oldMatcher) {
                options.matcher = oldMatcher(options.matcher);
                _this.element.select2(options);
                if (typeof _this.value !== 'undefined') {
                    _this.renderer.setElementProperty(_this.selector.nativeElement, 'value', _this.value);
                    _this.element.trigger('change.select2');
                }
            });
        }
        else {
            this.element.select2(options);
        }
        if (this.disabled) {
            this.renderer.setElementProperty(this.selector.nativeElement, 'disabled', this.disabled);
        }
    };
    return Select2Component;
}());
__decorate([
    core_1.ViewChild('selector'),
    __metadata("design:type", core_1.ElementRef)
], Select2Component.prototype, "selector", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Array)
], Select2Component.prototype, "data", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], Select2Component.prototype, "value", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], Select2Component.prototype, "cssImport", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], Select2Component.prototype, "width", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], Select2Component.prototype, "disabled", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], Select2Component.prototype, "options", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], Select2Component.prototype, "valueChanged", void 0);
Select2Component = __decorate([
    core_1.Component({
        selector: 'select2',
        template: '<select #selector></select>',
        encapsulation: core_1.ViewEncapsulation.None,
        changeDetection: core_1.ChangeDetectionStrategy.OnPush
    }),
    __metadata("design:paramtypes", [core_1.Renderer])
], Select2Component);
exports.Select2Component = Select2Component;
//# sourceMappingURL=select2.component.js.map
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(23)))

/***/ },

/***/ 659:
/***/ function(module, exports, __webpack_require__) {

!function(e,r){ true?module.exports=r():"function"==typeof define&&define.amd?define([],r):"object"==typeof exports?exports.textMaskCore=r():e.textMaskCore=r()}(this,function(){return function(e){function r(n){if(t[n])return t[n].exports;var o=t[n]={exports:{},id:n,loaded:!1};return e[n].call(o.exports,o,o.exports,r),o.loaded=!0,o.exports}var t={};return r.m=e,r.c=t,r.p="",r(0)}([function(e,r,t){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(r,"__esModule",{value:!0});var o=t(3);Object.defineProperty(r,"conformToMask",{enumerable:!0,get:function(){return n(o).default}});var i=t(2);Object.defineProperty(r,"adjustCaretPosition",{enumerable:!0,get:function(){return n(i).default}});var a=t(5);Object.defineProperty(r,"createTextMaskInputElement",{enumerable:!0,get:function(){return n(a).default}})},function(e,r){"use strict";Object.defineProperty(r,"__esModule",{value:!0}),r.placeholderChar="_"},function(e,r){"use strict";function t(e){var r=e.previousConformedValue,t=void 0===r?o:r,i=e.currentCaretPosition,a=void 0===i?0:i,u=e.conformedValue,l=e.rawValue,f=e.placeholderChar,s=e.placeholder,c=e.indexesOfPipedChars,d=void 0===c?n:c,p=e.caretTrapIndexes,v=void 0===p?n:p;if(0===a)return 0;var h=l.length,m=t.length,g=s.length,y=u.length,C=h-m,b=C>0,j=0===m,O=C>1&&!b&&!j;if(O)return a;var P=b&&(t===u||u===s),x=0;if(P?x=a-C:!function(){for(var e=u.toLowerCase(),r=l.toLowerCase(),t=r.substr(0,a).split(o),n=t.filter(function(r){return e.indexOf(r)!==-1}),i=n[n.length-1],c=d.map(function(r){return e[r]}),p=c.filter(function(e){return e===i}).length,v=n.filter(function(e){return e===i}).length,h=s.substr(0,s.indexOf(f)).split(o).filter(function(e,r){return e===i&&l[r]!==e}).length,m=h+v+p,g=0,C=0;C<y;C++){var b=e[C];if(x=C+1,b===i&&g++,g>=m)break}}(),b){for(var k=x,V=x;V<=g;V++)if(s[V]===f&&(k=V),s[V]===f||v.indexOf(V)!==-1||V===g)return k}else for(var w=x;w>=0;w--)if(s[w-1]===f||v.indexOf(w)!==-1||0===w)return w}Object.defineProperty(r,"__esModule",{value:!0}),r.default=t;var n=[],o=""},function(e,r,t){"use strict";function n(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:a,r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:a,t=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{},n=t.guide,u=void 0===n||n,l=t.previousConformedValue,f=void 0===l?a:l,s=t.placeholderChar,c=void 0===s?i.placeholderChar:s,d=t.placeholder,p=void 0===d?(0,o.convertMaskToPlaceholder)(r,c):d,v=t.currentCaretPosition,h=t.keepCharPositions,m=u===!1&&void 0!==f,g=e.length,y=f.length,C=p.length,b=r.length,j=g-y,O=j>0,P=v+(O?-j:0),x=P+Math.abs(j);if(h===!0&&!O){for(var k=a,V=P;V<x;V++)p[V]===c&&(k+=c);e=e.slice(0,P)+k+e.slice(P,g)}for(var w=e.split(a).map(function(e,r){return{char:e,isNew:r>=P&&r<x}}),M=g-1;M>=0;M--){var T=w[M].char;if(T!==c){var _=M>=P&&y===b;T===p[_?M-j:M]&&w.splice(M,1)}}var R=a,S=!1;e:for(var N=0;N<C;N++){var E=p[N];if(E===c){if(w.length>0)for(;w.length>0;){var I=w.shift(),J=I.char,A=I.isNew;if(J===c&&m!==!0){R+=c;continue e}if(r[N].test(J)){if(h===!0&&A!==!1&&f!==a&&u!==!1&&O){for(var L=w.length,W=null,q=0;q<L;q++){var z=w[q];if(z.char!==c&&z.isNew===!1)break;if(z.char===c){W=q;break}}null!==W?(R+=J,w.splice(W,1)):N--}else R+=J;continue e}S=!0}m===!1&&(R+=p.substr(N,C));break}R+=E}if(m&&O===!1){for(var B=null,D=0;D<R.length;D++)p[D]===c&&(B=D);R=null!==B?R.substr(0,B+1):a}return{conformedValue:R,meta:{someCharsRejected:S}}}Object.defineProperty(r,"__esModule",{value:!0}),r.default=n;var o=t(4),i=t(1),a=""},function(e,r,t){"use strict";function n(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:l,r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:u.placeholderChar;if(e.indexOf(r)!==-1)throw new Error("Placeholder character must not be used as part of the mask. Please specify a character that is not present in your mask as your placeholder character.\n\n"+("The placeholder character that was received is: "+JSON.stringify(r)+"\n\n")+("The mask that was received is: "+JSON.stringify(e)));return e.map(function(e){return e instanceof RegExp?r:e}).join("")}function o(e){return"string"==typeof e||e instanceof String}function i(e){return"number"==typeof e&&void 0===e.length&&!isNaN(e)}function a(e){for(var r=[],t=void 0;t=e.indexOf(f),t!==-1;)r.push(t),e.splice(t,1);return{maskWithoutCaretTraps:e,indexes:r}}Object.defineProperty(r,"__esModule",{value:!0}),r.convertMaskToPlaceholder=n,r.isString=o,r.isNumber=i,r.processCaretTraps=a;var u=t(1),l=[],f="[]"},function(e,r,t){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}function o(e){var r=e.inputElement,t=e.mask,n=e.guide,o=e.pipe,f=e.placeholderChar,c=void 0===f?v.placeholderChar:f,g=e.onAccept,C=e.onReject,b=e.keepCharPositions,j=void 0!==b&&b;("undefined"==typeof t?"undefined":l(t))===y&&void 0!==t.pipe&&void 0!==t.mask&&(o=t.pipe,t=t.mask);var O={previousConformedValue:m,previousOnRejectRawValue:m},P=void 0,x=void 0;return t instanceof Array&&(P=(0,p.convertMaskToPlaceholder)(t,c)),{state:O,update:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:r.value;if(e!==O.previousConformedValue){var f=a(e),v=r.selectionStart,y=O.previousConformedValue,b=void 0;if(("undefined"==typeof t?"undefined":l(t))===h){x=t(f,{currentCaretPosition:v,previousConformedValue:y,placeholderChar:c});var k=(0,p.processCaretTraps)(x),V=k.maskWithoutCaretTraps,w=k.indexes;x=V,b=w,P=(0,p.convertMaskToPlaceholder)(x,c)}else x=t;var M={previousConformedValue:y,guide:n,placeholderChar:c,pipe:o,placeholder:P,currentCaretPosition:v,keepCharPositions:j},T=(0,d.default)(f,x,M),_=T.conformedValue,R=T.meta.someCharsRejected,S=("undefined"==typeof o?"undefined":l(o))===h,N={};S&&(N=o(_,u({rawValue:f},M)),N===!1?N={value:y,rejected:!0}:(0,p.isString)(N)&&(N={value:N}));var E=S?N.value:_,I=(0,s.default)({previousConformedValue:y,conformedValue:E,placeholder:P,rawValue:f,currentCaretPosition:v,placeholderChar:c,indexesOfPipedChars:N.indexesOfPipedChars,caretTrapIndexes:b}),J=E===P&&0===I,A=J?m:E;if(O.previousConformedValue=A,r.value!==A){r.value=A,i(r,I),("undefined"==typeof g?"undefined":l(g))===h&&A!==y&&A!==P&&(O.previousOnRejectRawValue=null,g());var L=f.length<y.length;("undefined"==typeof C?"undefined":l(C))===h&&(R||N.rejected)&&L===!1&&O.previousOnRejectRawValue!==e&&(O.previousOnRejectRawValue=e,C({conformedValue:E,pipeRejection:N.rejected,maskRejection:R}))}}}}}function i(e,r){document.activeElement===e&&e.setSelectionRange(r,r,g)}function a(e){if((0,p.isString)(e))return e;if((0,p.isNumber)(e))return String(e);if(void 0===e||null===e)return m;throw new Error("The 'value' provided to Text Mask needs to be a string or a number. The value received was:\n\n "+JSON.stringify(e))}Object.defineProperty(r,"__esModule",{value:!0});var u=Object.assign||function(e){for(var r=1;r<arguments.length;r++){var t=arguments[r];for(var n in t)Object.prototype.hasOwnProperty.call(t,n)&&(e[n]=t[n])}return e},l="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e};r.default=o;var f=t(2),s=n(f),c=t(3),d=n(c),p=t(4),v=t(1),h="function",m="",g="none",y="object"}])});

/***/ },

/***/ 660:
/***/ function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
var autosize_directive_1 = __webpack_require__(470);
__export(__webpack_require__(470));
exports.default = {
    directives: [autosize_directive_1.Autosize]
};


/***/ },

/***/ 661:
/***/ function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var ng2_datetime_1 = __webpack_require__(471);
exports.NKDatetime = ng2_datetime_1.NKDatetime;
var ng2_datetime_module_1 = __webpack_require__(662);
exports.NKDatetimeModule = ng2_datetime_module_1.NKDatetimeModule;


/***/ },

/***/ 662:
/***/ function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(10);
var common_1 = __webpack_require__(44);
var forms_1 = __webpack_require__(71);
var ng2_datetime_1 = __webpack_require__(471);
var NKDatetimeModule = (function () {
    function NKDatetimeModule() {
    }
    return NKDatetimeModule;
}());
NKDatetimeModule = __decorate([
    core_1.NgModule({
        imports: [common_1.CommonModule, forms_1.FormsModule],
        exports: [ng2_datetime_1.NKDatetime],
        declarations: [ng2_datetime_1.NKDatetime]
    })
], NKDatetimeModule);
exports.NKDatetimeModule = NKDatetimeModule;


/***/ },

/***/ 666:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(Dropzone, jQuery) {
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(10);
Dropzone.autoDiscover = false;
var DropzoneDemo = (function () {
    function DropzoneDemo(el) {
        this.$el = jQuery(el.nativeElement);
        this.$el.addClass('dropzone');
    }
    DropzoneDemo.prototype.ngOnInit = function () {
        var dropzone = new Dropzone(this.$el[0], {});
    };
    return DropzoneDemo;
}());
DropzoneDemo = __decorate([
    core_1.Directive({
        selector: '[dropzone-demo]'
    }),
    __metadata("design:paramtypes", [core_1.ElementRef])
], DropzoneDemo);
exports.DropzoneDemo = DropzoneDemo;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(751), __webpack_require__(23)))

/***/ },

/***/ 677:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(jQuery) {
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(10);
var BootstrapWizard = (function () {
    function BootstrapWizard(el) {
        this.$el = jQuery(el.nativeElement);
    }
    BootstrapWizard.prototype.render = function () {
        var _this = this;
        this.$el.bootstrapWizard({
            onTabShow: function ($activeTab, $navigation, index) {
                var $total = $navigation.find('li').length;
                var $current = index + 1;
                var $percent = ($current / $total) * 100;
                var $wizard = _this.$el;
                $wizard.find('#bar').css({ width: $percent + '%' });
                if ($current >= $total) {
                    $wizard.find('.pager .next').hide();
                    $wizard.find('.pager .finish').show();
                    $wizard.find('.pager .finish').removeClass('disabled');
                }
                else {
                    $wizard.find('.pager .next').show();
                    $wizard.find('.pager .finish').hide();
                }
                // setting done class
                $navigation.find('li').removeClass('done');
                $activeTab.prevAll().addClass('done');
            },
            // validate on tab change
            onNext: function ($activeTab, $navigation, nextIndex) {
                var $activeTabPane = jQuery($activeTab.find('a[data-toggle=tab]').attr('href')), $form = $activeTabPane.find('form');
                // validate form in casa there is form
                if ($form.length) {
                    return $form.parsley().validate();
                }
            },
            // diable tab clicking
            onTabClick: function ($activeTab, $navigation, currentIndex, clickedIndex) {
                return $navigation.find('li:eq(' + clickedIndex + ')').is('.done');
            }
        });
        if (this.$el.data('height')) {
            // setting fixed height so wizard won't jump
            this.$el.find('.tab-pane').css({ height: this.$el.data('height') });
        }
    };
    BootstrapWizard.prototype.ngAfterViewInit = function () {
        var _this = this;
        setTimeout(function () { _this.render(); }, 100);
    };
    return BootstrapWizard;
}());
BootstrapWizard = __decorate([
    core_1.Directive({
        selector: '[bootstrap-wizard]'
    }),
    __metadata("design:paramtypes", [core_1.ElementRef])
], BootstrapWizard);
exports.BootstrapWizard = BootstrapWizard;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(23)))

/***/ },

/***/ 678:
/***/ function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(10);
var wizard_directive_1 = __webpack_require__(677);
var BootstrapWizardModule = (function () {
    function BootstrapWizardModule() {
    }
    return BootstrapWizardModule;
}());
BootstrapWizardModule = __decorate([
    core_1.NgModule({
        declarations: [
            wizard_directive_1.BootstrapWizard
        ],
        exports: [
            wizard_directive_1.BootstrapWizard
        ]
    })
], BootstrapWizardModule);
exports.BootstrapWizardModule = BootstrapWizardModule;


/***/ },

/***/ 690:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(jQuery) {
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(10);
var platform_browser_1 = __webpack_require__(28);
var data = __webpack_require__(691);
var Elements = (function () {
    function Elements(injector) {
        var _this = this;
        this.date = new Date(2016, 5, 10);
        this.colorOptions = { color: '#f0b518' };
        this.select2Options = {
            theme: 'bootstrap'
        };
        this.phoneMask = {
            mask: ['(', /[1-9]/, /\d/, /\d/, ')',
                ' ', /\d/, /\d/, /\d/,
                '-', /\d/, /\d/, /\d/, /\d/]
        };
        this.interPhoneMask = {
            mask: ['+', /[1-9]/, /\d/, /\d/,
                ' ', /\d/, /\d/, /\d/,
                ' ', /\d/, /\d/, /\d/, /\d/,
                ' ', /\d/, /\d/, /\d/, /\d/]
        };
        this.dateMask = {
            mask: [/\d/, /\d/,
                '-', /\d/, /\d/,
                '-', /[1-9]/, /\d/, /\d/, /\d/]
        };
        this.timeMask = {
            mask: [/\d/, /\d/,
                ':', /\d/, /\d/]
        };
        this.phoneValue = '';
        this.interPhoneValue = '';
        this.dateValue = '';
        this.timeValue = '';
        //
        // This is a hack on angular style loader to prevent ng2-select2 from adding its styles.
        // They are hard-coded into the component, so there are no other way to get rid of them
        //
        this.domSharedStylesHost = injector.get(platform_browser_1.ɵDomSharedStylesHost);
        this.domSharedStylesHost.__onStylesAdded__ = this.domSharedStylesHost.onStylesAdded;
        this.domSharedStylesHost.onStylesAdded = function (additions) {
            var style = additions[0];
            if (!style || !style.trim().startsWith('.select2-container')) {
                _this.domSharedStylesHost.__onStylesAdded__(additions);
            }
        };
    }
    Elements.prototype.ngOnInit = function () {
        jQuery('#markdown-editor').markdown();
        jQuery('.js-slider').slider();
        jQuery('#colorpicker').colorpicker(this.colorOptions);
        jQuery('.selectpicker').selectpicker();
    };
    Elements.prototype.unmask = function (event) {
        return event.replace(/\D+/g, '');
    };
    Elements.prototype.getSelect2DefaultList = function () {
        return data.select2DefaultData;
    };
    Elements.prototype.getSelect2GroupedList = function () {
        return data.select2GroupedData;
    };
    Elements.prototype.select2Changed = function (e) {
        this.selected = e.value;
    };
    Elements.prototype.ngOnDestroy = function () {
        // detach custom hook
        this.domSharedStylesHost.onStylesAdded = this.domSharedStylesHost.__onStylesAdded__;
    };
    return Elements;
}());
Elements = __decorate([
    core_1.Component({
        selector: '[elements]',
        template: __webpack_require__(830),
        styles: [__webpack_require__(806)],
        encapsulation: core_1.ViewEncapsulation.None,
    }),
    __metadata("design:paramtypes", [core_1.Injector])
], Elements);
exports.Elements = Elements;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(23)))

/***/ },

/***/ 691:
/***/ function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.select2DefaultData = [{
        id: 'Magellanic',
        text: 'Large Magellanic Cloud'
    },
    {
        id: 'Andromeda',
        text: 'Andromeda Galaxy'
    },
    {
        id: 'Sextans',
        text: 'Sextans A'
    }];
exports.select2GroupedData = [{
        id: '1',
        text: 'NFC EAST',
        children: [
            {
                id: '11',
                text: 'Dallas Cowboys'
            },
            {
                id: '12',
                text: 'New York Giants'
            },
            {
                id: '13',
                text: 'Philadelphia Eagles'
            },
            {
                id: '14',
                text: 'Washington Redskins'
            }
        ]
    }, {
        id: '2',
        text: 'NFC NORTH',
        children: [
            {
                id: '21',
                text: 'Chicago Bears'
            },
            {
                id: '22',
                text: 'Detroit Lions'
            },
            {
                id: '23',
                text: 'Green Bay Packers'
            },
            {
                id: '24',
                text: 'Minnesota Vikings'
            }
        ]
    }, {
        id: '3',
        text: 'NFC SOUTH',
        children: [
            {
                id: '31',
                text: 'Atlanta Falcons'
            },
            {
                id: '32',
                text: 'Carolina Panthers'
            },
            {
                id: '33',
                text: 'New Orleans Saints'
            },
            {
                id: '34',
                text: 'Tampa Bay Buccaneers'
            }
        ]
    }];


/***/ },

/***/ 692:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {
Object.defineProperty(exports, "__esModule", { value: true });
var common_1 = __webpack_require__(44);
var forms_1 = __webpack_require__(71);
var core_1 = __webpack_require__(10);
var router_1 = __webpack_require__(56);
// libs
/* tslint:disable */
var markdown = __webpack_require__(765).markdown;
/* tslint:enable */
global.markdown = markdown;
__webpack_require__(748);
__webpack_require__(117);
__webpack_require__(798);
__webpack_require__(746);
__webpack_require__(1115);
__webpack_require__(478);
__webpack_require__(479);
__webpack_require__(792);
__webpack_require__(793);
__webpack_require__(747);
__webpack_require__(749);
__webpack_require__(478);
__webpack_require__(479);
__webpack_require__(757);
var ng2_bootstrap_1 = __webpack_require__(374);
var angular2_autosize_1 = __webpack_require__(660);
var ng2_select2_1 = __webpack_require__(794);
var widget_module_1 = __webpack_require__(378);
var angular2_text_mask_1 = __webpack_require__(745);
/* tslint:disable */
var wizard_module_1 = __webpack_require__(678);
var bootstrap_application_wizard_directive_1 = __webpack_require__(694);
var dropzone_directive_1 = __webpack_require__(666);
var ng2_datetime_1 = __webpack_require__(661);
/* tslint:enable */
var elements_component_1 = __webpack_require__(690);
var validation_component_1 = __webpack_require__(693);
var wizard_component_1 = __webpack_require__(695);
exports.routes = [
    { path: '', redirectTo: 'elements', pathMatch: 'full' },
    { path: 'elements', component: elements_component_1.Elements },
    { path: 'validation', component: validation_component_1.Validation },
    { path: 'wizard', component: wizard_component_1.Wizard }
];
var FormModule = (function () {
    function FormModule() {
    }
    return FormModule;
}());
FormModule.routes = exports.routes;
FormModule = __decorate([
    core_1.NgModule({
        declarations: [
            angular2_autosize_1.Autosize,
            elements_component_1.Elements,
            validation_component_1.Validation,
            bootstrap_application_wizard_directive_1.BootstrapApplicationWizard,
            wizard_component_1.Wizard,
            dropzone_directive_1.DropzoneDemo
        ],
        imports: [
            common_1.CommonModule,
            forms_1.FormsModule,
            angular2_text_mask_1.TextMaskModule,
            ng2_bootstrap_1.TooltipModule.forRoot(),
            ng2_bootstrap_1.AlertModule.forRoot(),
            ng2_bootstrap_1.DropdownModule.forRoot(),
            widget_module_1.WidgetModule,
            wizard_module_1.BootstrapWizardModule,
            ng2_datetime_1.NKDatetimeModule,
            ng2_select2_1.Select2Module,
            router_1.RouterModule.forChild(exports.routes),
        ]
    })
], FormModule);
exports.FormModule = FormModule;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(59)))

/***/ },

/***/ 693:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(jQuery) {
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(10);
var Validation = (function () {
    function Validation() {
    }
    Validation.prototype.ngOnInit = function () {
        jQuery('.parsleyjs').parsley();
    };
    return Validation;
}());
Validation = __decorate([
    core_1.Component({
        selector: '[forms-validation]',
        template: __webpack_require__(831),
        encapsulation: core_1.ViewEncapsulation.None,
        styles: [__webpack_require__(807)]
    })
], Validation);
exports.Validation = Validation;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(23)))

/***/ },

/***/ 694:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(jQuery, Tether) {
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(10);
var BootstrapApplicationWizard = (function () {
    function BootstrapApplicationWizard(el) {
        this.$el = jQuery(el.nativeElement);
        /* tslint:disable */
        window.validateServerLabel = function (el) {
            var name = el.val();
            var retValue = {};
            if (name === '') {
                retValue['status'] = false;
                retValue['msg'] = 'Please enter a label';
            }
            else {
                retValue['status'] = true;
            }
            return retValue;
        };
        window.validateFQDN = function (el) {
            var $this = jQuery(el);
            var retValue = {};
            if ($this.is(':disabled')) {
                // FQDN Disabled
                retValue['status'] = true;
            }
            else {
                if ($this.data('lookup') === 0) {
                    retValue['status'] = false;
                    retValue['msg'] = 'Preform lookup first';
                }
                else {
                    if ($this.data('is-valid') === 0) {
                        retValue['status'] = false;
                        retValue['msg'] = 'Lookup Failed';
                    }
                    else {
                        retValue['status'] = true;
                    }
                }
            }
            return retValue;
        };
        /* tslint:enable */
    }
    BootstrapApplicationWizard.prototype.lookup = function () {
        // Normally a ajax call to the server to preform a lookup
        jQuery('#fqdn').data('lookup', 1);
        jQuery('#fqdn').data('is-valid', 1);
        jQuery('#ip').val('127.0.0.1');
    };
    BootstrapApplicationWizard.prototype.render = function () {
        var _this = this;
        var wizard = this.$el.wizard({
            keyboard: false,
            contentHeight: 400,
            contentWidth: 700,
            backdrop: 'static'
        });
        jQuery('#fqdn').on('input', function () {
            if (jQuery(this).val().length !== 0) {
                jQuery('#ip').val('').attr('disabled', 'disabled');
                jQuery('#fqdn, #ip').parents('.form-group').removeClass('has-error has-success');
            }
            else {
                jQuery('#ip').val('').removeAttr('disabled');
            }
        });
        jQuery('#btn-fqdn').find('button').on('click', this.lookup);
        /* tslint:disable */
        var pattern = /\b(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\b/;
        var x = 46;
        /* tslint:enable */
        jQuery('#ip').on('input', function () {
            if (jQuery(_this).val().length !== 0) {
                jQuery('#fqdn').val('').attr('disabled', 'disabled');
            }
            else {
                jQuery('#fqdn').val('').removeAttr('disabled');
            }
        }).keypress(function (e) {
            if (e.which !== 8 && e.which !== 0 && e.which !== x && (e.which < 48 || e.which > 57)) {
                console.log(e.which);
                return false;
            }
        }).keyup(function () {
            var $this = jQuery(this);
            if (!pattern.test($this.val())) {
                // jQuery('#validate_ip').text('Not Valid IP');
                console.log('Not Valid IP');
                $this.parents('.form-group').removeClass('has-error has-success').addClass('has-error');
                while ($this.val().indexOf('..') !== -1) {
                    $this.val($this.val().replace('..', '.'));
                }
                x = 46;
            }
            else {
                x = 0;
                var lastChar = $this.val().substr($this.val().length - 1);
                if (lastChar === '.') {
                    $this.val($this.val().slice(0, -1));
                }
                var ip = $this.val().split('.');
                if (ip.length === 4) {
                    // jQuery('#validate_ip').text('Valid IP');
                    console.log('Valid IP');
                    $this.parents('.form-group').removeClass('has-error').addClass('has-success');
                }
            }
        });
        wizard.on('closed', function () {
            wizard.reset();
        });
        wizard.on('reset', function () {
            wizard.modal.find(':input').val('').removeAttr('disabled');
            wizard.modal.find('.form-group').removeClass('has-error').removeClass('has-succes');
            wizard.modal.find('#fqdn').data('is-valid', 0).data('lookup', 0);
        });
        wizard.on('submit', function (wizardItem) {
            var submit = {
                'hostname': jQuery('#new-server-fqdn').val()
            };
            this.log('seralize()');
            this.log(this.serialize());
            this.log('serializeArray()');
            /* tslint:disable */
            this.log(this['serializeArray']());
            /* tslint:enable */
            setTimeout(function () {
                wizardItem.trigger('success');
                wizardItem.hideButtons();
                wizardItem._submitting = false;
                wizardItem.showSubmitCard('success');
                wizardItem.updateProgressBar(0);
            }, 2000);
        });
        wizard.el.find('.wizard-success .im-done').click(function () {
            wizard.hide();
            setTimeout(function () {
                wizard.reset();
            }, 250);
        });
        wizard.el.find('.wizard-success .create-another-server').click(function () {
            wizard.reset();
        });
        /* tslint:disable */
        wizard.el.find('.wizard-progress-container').empty()
            .append('<div class="bg-gray-lighter progress progress-xs"><div class="progress-bar bg-primary progress-xs" style="width: 0%"></div></div>');
        /* tslint:enable */
        wizard.progress = wizard.modal.find('progress');
        jQuery('.wizard-group-list').click(function () {
            window.alert('Disabled for demo.');
        });
        jQuery('#open-wizard').click(function (e) {
            e.preventDefault();
            wizard.show();
            wizard.errorPopover = function (el, msg, allowHtml) {
                this.log('launching popover on', el);
                allowHtml = typeof allowHtml !== 'undefined' ? allowHtml : false;
                var popover = el.popover({
                    content: msg,
                    trigger: 'manual',
                    html: allowHtml,
                    container: el.parents('.form-group')
                }).addClass('error-popover').popover('show').next('.popover');
                el.parents('.form-group').find('.popover').addClass('error-popover');
                jQuery('.popover-title').css('display', 'none');
                jQuery('.popover').addClass('popover-body-error');
                jQuery('.popover-content').addClass('popover-content-error');
                jQuery('.popover-arrow').addClass('popover-arrow-error');
                Tether.position();
                /* tslint:disable */
                this['popovers'].push(el);
                /* tslint:enable */
                return popover;
            };
            jQuery('.dropdown-menu > li > a').addClass('dropdown-item');
        });
        wizard.el.find('.wizard-nav-list').addClass('flex-column');
        wizard.el.find('.wizard-close').addClass('flex-last');
    };
    BootstrapApplicationWizard.prototype.ngAfterViewInit = function () {
        var _this = this;
        setTimeout(function () { _this.render(); }, 100);
    };
    return BootstrapApplicationWizard;
}());
BootstrapApplicationWizard = __decorate([
    core_1.Directive({
        selector: '[bootstrap-application-wizard]'
    }),
    __metadata("design:paramtypes", [core_1.ElementRef])
], BootstrapApplicationWizard);
exports.BootstrapApplicationWizard = BootstrapApplicationWizard;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(23), __webpack_require__(102)))

/***/ },

/***/ 695:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(jQuery) {
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(10);
var Wizard = (function () {
    function Wizard() {
        this.destindationMask = {
            mask: [/[1-9]/, /\d/, /\d/, /\d/, /\d/]
        };
        this.creditMask = {
            mask: [/[1-9]/, /\d/, /\d/, /\d/, '-',
                /\d/, /\d/, /\d/, /\d/, '-',
                /\d/, /\d/, /\d/, /\d/, '-',
                /\d/, /\d/, /\d/, /\d/
            ]
        };
        this.destinationValue = '';
        this.creditValue = '';
    }
    Wizard.prototype.unmask = function (event) {
        return event.replace(/\D+/g, '');
    };
    Wizard.prototype.ngOnInit = function () {
        jQuery('.select2').select2();
    };
    return Wizard;
}());
Wizard = __decorate([
    core_1.Component({
        selector: '[forms-wizard]',
        template: __webpack_require__(832),
        encapsulation: core_1.ViewEncapsulation.None,
        styles: [__webpack_require__(808)]
    })
], Wizard);
exports.Wizard = Wizard;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(23)))

/***/ },

/***/ 745:
/***/ function(module, exports, __webpack_require__) {

"use strict";

var core_1 = __webpack_require__(10);
var common_1 = __webpack_require__(44);
var forms_1 = __webpack_require__(71);
var textMaskCore_1 = __webpack_require__(659);
var MaskedInputDirective = (function () {
    function MaskedInputDirective(renderer, element) {
        this.renderer = renderer;
        this.element = element;
        this.textMaskConfig = {
            mask: '',
            guide: true,
            placeholderChar: '_',
            pipe: undefined,
            keepCharPositions: false,
            onReject: undefined,
            onAccept: undefined
        };
        this._onTouched = function () { };
        this._onChange = function (_) { };
    }
    MaskedInputDirective.prototype.ngOnInit = function () {
        if (this.element.nativeElement.tagName === 'INPUT') {
            // `textMask` directive is used directly on an input element
            this.inputElement = this.element.nativeElement;
        }
        else {
            // `textMask` directive is used on an abstracted input element, `ion-input`, `md-input`, etc
            this.inputElement = this.element.nativeElement.getElementsByTagName('INPUT')[0];
        }
        this.textMaskInputElement = textMaskCore_1.createTextMaskInputElement(Object.assign({ inputElement: this.inputElement }, this.textMaskConfig));
    };
    MaskedInputDirective.prototype.writeValue = function (value) {
        if (this.textMaskInputElement !== undefined) {
            this.textMaskInputElement.update(value);
        }
    };
    MaskedInputDirective.prototype.registerOnChange = function (fn) { this._onChange = fn; };
    MaskedInputDirective.prototype.registerOnTouched = function (fn) { this._onTouched = fn; };
    MaskedInputDirective.prototype.onInput = function ($event) {
        this.textMaskInputElement.update($event.target.value);
        this._onChange($event.target.value);
    };
    MaskedInputDirective.prototype.setDisabledState = function (isDisabled) {
        this.renderer.setElementProperty(this.element.nativeElement, 'disabled', isDisabled);
    };
    MaskedInputDirective.decorators = [
        { type: core_1.Directive, args: [{
                    host: {
                        '(input)': 'onInput($event)',
                        '(blur)': '_onTouched()'
                    },
                    selector: '[textMask]',
                    providers: [{
                            provide: forms_1.NG_VALUE_ACCESSOR,
                            useExisting: core_1.forwardRef(function () { return MaskedInputDirective; }),
                            multi: true
                        }]
                },] },
    ];
    /** @nocollapse */
    MaskedInputDirective.ctorParameters = [
        { type: core_1.Renderer, },
        { type: core_1.ElementRef, },
    ];
    MaskedInputDirective.propDecorators = {
        'textMaskConfig': [{ type: core_1.Input, args: ['textMask',] },],
    };
    return MaskedInputDirective;
}());
exports.MaskedInputDirective = MaskedInputDirective;
var TextMaskModule = (function () {
    function TextMaskModule() {
    }
    TextMaskModule.decorators = [
        { type: core_1.NgModule, args: [{
                    declarations: [MaskedInputDirective],
                    exports: [MaskedInputDirective],
                    imports: [common_1.CommonModule]
                },] },
    ];
    /** @nocollapse */
    TextMaskModule.ctorParameters = [];
    return TextMaskModule;
}());
exports.TextMaskModule = TextMaskModule;
var textMaskCore_2 = __webpack_require__(659);
exports.conformToMask = textMaskCore_2.conformToMask;
//# sourceMappingURL=angular2TextMask.js.map

/***/ },

/***/ 746:
/***/ function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(__webpack_provided_window_dot_jQuery) {/*
 * Copyright (C) 2013 Panopta, Andrew Moffat
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */
(function ($) {
    $.fn.wizard = function(args) {
        return new Wizard(this, args);
    };

    $.fn.wizard.logging = false;
    
    var WizardCard = function(wizard, card, index, prev, next) {
        this.wizard 	= wizard;
        this.index 		= index;
        this.prev 		= prev;
        this.next 		= next;
        this.el 		= card;
        this.title 		= card.find("h3").first().text();
        this.name 		= card.data("cardname") || this.title;

        this.nav 		= this._createNavElement(this.title, index);

        this._disabled 	= false;
        this._loaded 	= false;
        this._events =	 {};
    };
    
    WizardCard.prototype = {
        select: function() {
            this.log("selecting");
            if (!this.isSelected()) {
                this.nav.addClass("active");
                this.el.show();

                if (!this._loaded) {
                    this.trigger("loaded");
                    this.reload();
                }

                this.trigger("selected");
            }


            /*
             * this is ugly, but we're handling the changing of the wizard's
             * buttons here, in the WizardCard select.  so when a card is
             * selected, we're figuring out if we're the first card or the
             * last card and changing the wizard's buttons via the guts of
             * the wizard
             *
             * ideally this logic should be encapsulated by some wizard methods
             * that we can call from here, instead of messing with the guts
             */
            var w = this.wizard;

            // The back button is only disabled on this first card...
            w.backButton.toggleClass("disabled", this.index == 0);

            if (this.index >= w._cards.length-1) {
                this.log("on last card, changing next button to submit");

                w.changeNextButton(w.args.buttons.submitText, "btn-success");
                w._readyToSubmit = true;
                w.trigger("readySubmit");
            }
            else {
                w._readyToSubmit = false;
                w.changeNextButton(w.args.buttons.nextText, "btn-primary");
            }

            return this;
        },

        _createNavElement: function(name, i) {
            var li = $('<li class="wizard-nav-item"></li>');
            var a = $('<a class="wizard-nav-link"></a>');
            a.data("navindex", i);
            li.append(a);
            a.append('<span class="glyphicon glyphicon-chevron-right"></span> ');
            a.append(name);
            return li;
        },

        markVisited: function() {
            this.log("marking as visited");
            this.nav.addClass("already-visited");
            this.trigger("markVisited");
            return this;
        },

        unmarkVisited: function() {
            this.log("unmarking as visited");
            this.nav.removeClass("already-visited");
            this.trigger("unmarkVisited");
            return this;
        },

        deselect: function() {
            this.nav.removeClass("active");
            this.el.hide();
            this.trigger("deselect");
            return this;
        },

        enable: function() {
            this.log("enabling");
            
            // Issue #38 Hiding navigation link when hide card
            // Awaiting approval
            //
            // this.nav.removeClass('hide');
            
            this.nav.addClass("active");
            this._disabled = false;
            this.trigger("enabled");
            return this;
        },

        disable: function(hideCard) {
            this.log("disabling");
            this._disabled = true;
            this.nav.removeClass("active already-visited");
            if (hideCard) {
                this.el.hide();
                // Issue #38 Hiding navigation link when hide card
                // Awaiting approval
                //
                // this.nav.addClass('hide');
            }
            this.trigger("disabled");
            return this;
        },

        isDisabled: function() {
            return this._disabled;
        },

        alreadyVisited: function() {
            return this.nav.hasClass("already-visited");
        },

        isSelected: function() {
            return this.nav.hasClass("active");
        },

        reload: function() {
            this._loaded = true;
            this.trigger("reload");
            return this;
        },

        on: function() {
            return this.wizard.on.apply(this, arguments);
        },

        trigger: function() {
            this.callListener("on"+arguments[0]);
            return this.wizard.trigger.apply(this, arguments);
        },

        /*
         * displays an alert box on the current card
         */
        toggleAlert: function(msg, toggle) {
            this.log("toggling alert to: " + toggle);

            toggle = typeof(toggle) == "undefined" ? true : toggle;

            if (toggle) {this.trigger("showAlert");}
            else {this.trigger("hideAlert");}

            var div;
            var alert = this.el.children("h3").first().next("div.alert");

            if (alert.length == 0) {
                /*
                 * we're hiding anyways, so no need to create anything.
                 * we'll do that if we ever are actually showing the alert
                 */
                if (!toggle) {return this;}

                this.log("couldn't find existing alert div, creating one");
                div = $("<div />");
                div.addClass("alert");
                div.addClass("hide");
                div.insertAfter(this.el.find("h3").first());
            }
            else {
                this.log("found existing alert div");
                div = alert.first();
            }

            if (toggle) {
                if (msg != null) {
                    this.log("setting alert msg to", msg);
                    div.html(msg);
                }
                div.show();
            }
            else {
                div.hide();
            }
            return this;
        },

        /*
         * this looks for event handlers embedded into the html of the
         * wizard card itself, in the form of a data- attribute
         */
        callListener: function(name) {
            // a bug(?) in jquery..can't access data-<name> if name is camelCase
            name = name.toLowerCase();

            this.log("looking for listener " + name);
            var listener = window[this.el.data(name)];
            if (listener) {
                this.log("calling listener " + name);
                var wizard = this.wizard;

                try {
                    var vret = listener(this);
                }
                catch (e) {
                    this.log("exception calling listener " + name + ": ", e);
                }
            }
            else {
                this.log("didn't find listener " + name);
            }
        },

        problem: function(toggle) {
            this.nav.find("a").toggleClass("wizard-step-error", toggle);
        },

        validate: function() {
            var failures = false;
            var self = this;

            /*
             * run all the validators embedded on the inputs themselves
             */
            this.el.find("[data-validate]").each(function(i, el) {
                self.log("validating individiual inputs");
                el = $(el);

                var v = el.data("validate");
                if (!v) {return;}

                var ret = {
                    status: true,
                    title: "Error",
                    msg: ""
                };

                var vret = window[v](el);
                $.extend(ret, vret);

                // Add-On
                // This allows the use of a INPUT+BTN used as one according to boostrap layout
                // for the wizard it is required to add an id with btn-(ID of Input)
                // this will make sure the popover is drawn on the correct element
                if ( $('#btn-' + el.attr('id')).length === 1 ) {
                    el = $('#btn-' + el.attr('id'));
                }

                if (!ret.status) {
                    failures = true;
                    
                    // Updated to show error on correct form-group
                    el.parents("div.form-group").toggleClass("has-error", true);
                    
                    // This allows the use of a INPUT+BTN used as one according to boostrap layout
                    // for the wizard it is required to add an id with btn-(ID of Input)
                    // this will make sure the popover is drawn on the correct element
                    if ( $('#btn-' + el.attr('id')).length === 1 ) {
                        el = $('#btn-' + el.attr('id'));
                    }
                    
                    self.wizard.errorPopover(el, ret.msg);
                } else {
                    el.parents("div.form-group").toggleClass("has-error", false);
                    
                    // This allows the use of a INPUT+BTN used as one according to boostrap layout
                    // for the wizard it is required to add an id with btn-(ID of Input)
                    // this will make sure the popover is drawn on the correct element
                    if ( $('#btn-' + el.attr('id')).length === 1 ) {
                        el = $('#btn-' + el.attr('id'));
                    }
                    
                    try {
                        el.popover("destroy");
                    }
                    /*
                     * older versions of bootstrap don't have a destroy call
                     * for popovers
                     */
                    catch (e) {
                        el.popover("hide");
                    }
                }
            });
            this.log("after validating inputs, failures is", failures);

            /*
             * run the validator embedded in the card
             */
            var cardValidator = window[this.el.data("validate")];
            if (cardValidator) {
                this.log("running html-embedded card validator");
                var cardValidated = cardValidator(this);
                if (typeof(cardValidated) == "undefined" || cardValidated == null) {
                    cardValidated = true;
                }
                if (!cardValidated) failures = true;
                this.log("after running html-embedded card validator, failures is", failures);
            }

            /*
             * run the validate listener
             */
            this.log("running listener validator");
            var listenerValidated = this.trigger("validate");
            if (typeof(listenerValidated) == "undefined" || listenerValidated == null) {
                listenerValidated = true;
            }
            if (!listenerValidated) failures = true;
            this.log("after running listener validator, failures is", failures);

            var validated = !failures;
            if (validated) {
                this.log("validated, calling listeners");
                this.trigger("validated");
            }
            else {
                this.log("invalid");
                this.trigger("invalid");
            }
            return validated;
        },
        
        log: function() {
            if (!window.console || !$.fn.wizard.logging) {return;}
            var prepend = "card '"+this.name+"': ";
            var args = [prepend];
            args.push.apply(args, arguments);

            console.log.apply(console, args);
        },

        isActive: function() {
            return this.nav.hasClass("active");
        }
    };
    
    Wizard = function(markup, args) {
        
        /* TEMPLATE */
        this.wizard_template = [
            '<div  class="modal fade wizard">',
                '<div class="modal-dialog wizard-dialog">',
                    '<div class="modal-content wizard-content">',
                        '<div class="modal-header wizard-header">',
                            '<button type="button" class="close wizard-close" aria-hidden="true">&times;</button>',
                            '<h3 class="modal-title wizard-title"></h3>',
                            '<span class="wizard-subtitle"></span>',
                        '</div>',
                        '<div class="modal-body wizard-body">',
                            '<div class="pull-left wizard-steps">',
                                '<div class="wizard-nav-container">',
                                    '<ul class="nav wizard-nav-list">',
                                    '</ul>',
                                '</div>',
                                '<div class="wizard-progress-container">',
                                    '<div class="progress progress-striped">',
                                        '<div class="progress-bar" style="width: 0%;"></div>',
                                    '</div>',
                                '</div>',
                            '</div>',
                            '<form>',
                                '<div class="wizard-cards">',
                                    '<div class="wizard-card-container">',
                                    '</div>',
                                    '<div class="wizard-footer">',
                                        '<div class="wizard-buttons-container">',
                                            '<button class="btn wizard-cancel wizard-close" type="button">Cancel</button>',
                                            '<div class="btn-group-single pull-right">',
                                                '<button class="btn wizard-back" type="button">Back</button>',
                                                '<button class="btn btn-primary wizard-next" type="button">Next</button>',
                                            '</div>',
                                        '</div>',
                                    '</div>',
                                '</div>',
                            '</form>',
                        '</div>',
                    
                    '</div>',
                '</div>',
            '</div>'
        ];
        
        this.args = {
            keyboard: true,
            backdrop: true,
            show: false,
            submitUrl: "",
            showCancel: false,
            showClose: true,
            progressBarCurrent: false,
            increaseHeight: 0,
            contentHeight: 300,
            contentWidth: 580,
            buttons: {
                cancelText: "Cancel",
                nextText: "Next",
                backText: "Back",
                submitText: "Submit",
                submittingText: "Submitting...",
            },
            formClass: "form-horizontal"
        };
        
        $.extend(this.args, args || {});
        
        this._create(markup);
    };
    
    Wizard.prototype = {
        log: function() {
            if (!window.console || !$.fn.wizard.logging) {return;}
            var prepend = "wizard "+this.el.id+": ";
            var args = [prepend];
            args.push.apply(args, arguments);
            console.log.apply(console, args);
        },
        
        _create: function(markup) {
            this.markup = $(markup);
            this.title					= 	this.markup.data('title');
            this.submitCards 			= 	this.markup.find(".wizard-error,.wizard-failure,.wizard-success,.wizard-loading");
            this.el						=	$(this.wizard_template.join('\n'));
            $('body').append(this.el);
            
            this.modal 					= 	this.el.modal({
                keyboard: this.args.keyboard,
                show: this.args.show,
                backdrop: this.args.backdrop
            });
            
            this.dimensions				=	{
                                                contentHeight: this.args.contentHeight,
                                                contentWidth: this.args.contentWidth
                                            };
            this.dialog 				=	this.modal.find('.wizard-dialog');
            this.content 				= 	this.modal.find('.wizard-content');
            this.header 				= 	this.modal.find('.wizard-header');
            this.body 					= 	this.modal.find('.wizard-body');
            this.wizardSteps			= 	this.modal.find('.wizard-steps');
            this.wizardCards			=	this.modal.find('.wizard-cards');
            this.wizardCardContainer	=	this.modal.find('.wizard-card-container');
            this.wizardCardContainer
                .append(this.markup.find('.wizard-card'))
                .append(this.submitCards);
            this.navContainer 			= 	this.modal.find('.wizard-nav-container');
            this.navList				= 	this.modal.find('.wizard-nav-list');
            this.progressContainer		= 	this.modal.find('.wizard-progress-container');
            this.progress				= 	this.progressContainer.find('.progress-bar');
            this.closeButton 			= 	this.modal.find('button.wizard-close.close');
            this.cardsContainer			=	this.modal.find('wizard-cards-container');
            this.form					=	this.modal.find('form');
            this.footer 				= 	this.modal.find(".wizard-footer");
            this.cancelButton 			= 	this.footer.find(".wizard-cancel");
            this.backButton 			= 	this.footer.find(".wizard-back");
            this.nextButton 			= 	this.footer.find(".wizard-next");
            
            this._cards 				= 	[];
            this.cards 					= 	{};
            this._readyToSubmit 		= 	false;
            this.percentComplete 		=	0;
            this._submitting 			= 	false;
            this._events 				= 	{};
            this._firstShow 			= 	true;
            
            this._createCards();

            this.nextButton.click(this, this._handleNextClick);
            this.backButton.click(this, this._handleBackClick);

            this.cancelButton.text(this.args.buttons.cancelText);
            this.backButton.text(this.args.buttons.backText);
            this.nextButton.text(this.args.buttons.nextText);
            
            // Apply Form Class(es)
            this.form.addClass(this.args.formClass);
            
            // Register Array Holder for popovers
            this.popovers				= [];

            var self = this;
            var _close = function() {
                self.reset();
                self.close();
                self.trigger("closed");
            };

            // Register Close Button
            this.closeButton.click(_close);
            this.cancelButton.click(_close);
            
            this.wizardSteps.on("click", "li.already-visited a.wizard-nav-link", this,
            function(event) {
                var index = parseInt($(event.target).data("navindex"));
                event.data.setCard(index);
            });
            
            if ( this.title.length != 0 ) {
                this.setTitle(this.title);
            }
            
            this.on("submit", this._defaultSubmit);
            
            // Set Modal Dimensions
            this.autoDimensions();
        },
        
        autoDimensions: function() {
            // DO NOT REMOVE DISPLAY ; Temporary display is required for calculation
            this.modal.css('display', 'block');
            
            this.dimensions.header = this.header.outerHeight(true);
            
            // Navigation Pane is dyanmic build on card content
            // Navigation Pane === BASE Inner Content Height
            this.dimensions.navigation = this.wizardSteps.outerHeight(true);
            if ( this.dimensions.navigation < this.dimensions.contentHeight ) {
                this.dimensions.navigation = this.dimensions.contentHeight;
                this.navContainer.height( (this.dimensions.contentHeight-30) - this.progressContainer.outerHeight(true));
            }
            
            // Dimension Alias ( Body Height === (Navigation Height) )
            this.dimensions.body = this.dimensions.navigation;
            
            // Apply OuterHeight of navigation to it's parent wizardSteps
            this.wizardSteps.height(this.dimensions.body);
            
            // Modal Height === (Header + Content)
            this.dimensions.modal = (this.dimensions.header + this.dimensions.navigation);
            this.content.height(this.dimensions.modal + 'px');
            this.dialog.width(this.dimensions.contentWidth);
            
            this.body.height(this.dimensions.body + 'px');
            this.wizardCards.height(this.dimensions.body + 'px');
            
            // Footer Height
            this.dimensions.footer = this.footer.outerHeight(true);
            
            // Card Container === (Body - Footer)
            this.dimensions.cardContainer = (this.dimensions.body - this.dimensions.footer);
            this.wizardCardContainer.height(this.dimensions.cardContainer);
            
            // Reposition
            this.dimensions.offset = ($(window).height() - this.dialog.height()) / 2;			
            this.dialog.css({
                'margin-top': this.dimensions.offset + 'px',
                'padding-top': 0
            });
            
            // DO NOT REMOVE NEXT LINE
            this.modal.css('display', '');
        },
        
        setTitle: function(title) {
            this.log("setting title to", title);
            this.modal.find(".wizard-title").first().text(title);
            return this;
        },

        setSubtitle: function(title) {
            this.log("setting subtitle to", title);
            this.modal.find(".wizard-subtitle").first().text(title);
            return this;
        },
        
        errorPopover: function(el, msg, allowHtml) {
            this.log("launching popover on", el);
            allowHtml = typeof allowHtml !== "undefined" ? allowHtml : false;
            var popover = el.popover({
                content: msg,
                trigger: "manual",
                html: allowHtml,
                container: el.parents('.form-group')
            }).addClass("error-popover").popover("show").next(".popover");

            el.parents('.form-group').find('.popover').addClass("error-popover");
            
            this.popovers.push(el);
            
            return popover;
        },
        
        destroyPopover: function(pop) {
            pop = $(pop);
            
            /*
             * this is the element that the popover was created for
             */
            try {
                pop.popover("destroy");
            }
            /*
             * older versions of bootstrap don't have a destroy call
             * for popovers
             */
            catch (e) {
                pop.popover("hide");
            }
        },
        
        hidePopovers: function(el) {
            this.log("hiding all popovers");
            var self = this;

            $.each(this.popovers, function(i, p) {
                self.destroyPopover(p);
            });
            
            this.modal.find('.has-error').removeClass('has-error');
            this.popovers = [];
        },

        eachCard: function(fn) {
            $.each(this._cards, fn);
            return this;
        },

        getActiveCard: function() {
            this.log("getting active card");
            var currentCard = null;

            $.each(this._cards, function(i, card) {
                if (card.isActive()) {
                    currentCard = card;
                    return false;
                }
            });
            if (currentCard) {this.log("found active card", currentCard);}
            else {this.log("couldn't find an active card");}
            return currentCard;
        },

        changeNextButton: function(text, cls) {
            this.log("changing next button, text: " + text, "class: " + cls);
            if (typeof(cls) != "undefined") {
                this.nextButton.removeClass("btn-success btn-primary");
            }

            if (cls) {
                this.nextButton.addClass(cls);
            }
            this.nextButton.text(text);
            return this;
        },

        hide: function() {
            this.log("hiding");
            this.modal.modal("hide");
            return this;
        },

        close: function() {
            this.log("closing");
            this.modal.modal("hide");
            return this;
        },


        show: function(modalOptions) {
            this.log("showing");
            if (this._firstShow) {
                this.setCard(0);
                this._firstShow = false;
            }
            if (this.args.showCancel) { 
                this.cancelButton.show(); 
            } else {
                this.cancelButton.hide(); 
            }
            if (this.args.showClose) { this.closeButton.show(); }
            this.modal.modal('show');
            
            return this;
        },

        on: function(name, fn) {
            this.log("adding listener to event " + name);
            this._events[name] = fn;
            return this;
        },

        trigger: function() {
            var name = arguments[0];
            var args = Array.prototype.slice.call(arguments);
            args.shift();
            args.unshift(this);

            this.log("firing event " + name);
            var handler = this._events[name];
            if (handler === undefined && this.wizard !== undefined) {
                handler = this.wizard._events[name];
            }
            var ret = null;

            if (typeof(handler) == "function") {
                this.log("found event handler, calling " + name);
                try {
                    ret = handler.apply(this, args);
                }
                catch (e) {
                    this.log("event handler " + name + " had an exception");
                }
            }
            else {
                this.log("couldn't find an event handler for " + name);
            }
            return ret;
        },


        reset: function() {
            this.log("resetting");
            
            this.updateProgressBar(0);
            this.hideSubmitCards();

            this.setCard(0);
            this.lockCards();

            this.enableNextButton();
            this.showButtons();
            
            this.hidePopovers();

            this.trigger("reset");
            return this;
        },
        
        /*
         * this handles switching to the next card or previous card, taking
         * care to skip over disabled cards
         */
        _abstractIncrementStep: function(direction, getNext) {
            var current = this.getActiveCard();
            var next;

            if (current) {
                /*
                 * loop until we find a card that isn't disabled
                 */
                this.log("searching for valid next card");
                while (true) {
                    next = getNext(current);
                    if (next) {
                        this.log("looking at card", next.index);
                        if (next.isDisabled()) {
                            this.log("card " + next.index + " is disabled/locked, continuing");
                            current = next;
                            continue;
                        }
                        else {
                            return this.setCard(current.index+direction);
                        }
                    }
                    else {
                        this.log("next card is not defined, breaking");
                        break;
                    }
                }
            }
            else {
                this.log("current card is undefined");
            }
        },


        incrementCard: function() {
            this.log("incrementing card");
            var card = this._abstractIncrementStep(1, function(current){return current.next;});
            this.trigger("incrementCard");
            return card;
        },

        decrementCard: function() {
            this.log("decrementing card");
            var card = this._abstractIncrementStep(-1, function(current){return current.prev;});
            this.trigger("decrementCard");
            return card;
        },

        setCard: function(i) {
            this.log("setting card to " + i);
            this.hideSubmitCards();
            var currentCard = this.getActiveCard();

            if (this._submitting) {
                this.log("we're submitting the wizard already, can't change cards");
                return currentCard;
            }

            var newCard = this._cards[i];
            if (newCard) {
                if (newCard.isDisabled()) {
                    this.log("new card is currently disabled, returning");
                    return currentCard;
                }

                if (currentCard) {

                    /*
                     * here, we're only validating if we're going forward,
                     * not if we're going backwards in a step
                     */
                    if (i > currentCard.index) {
                        var cardToValidate = currentCard;
                        var ok = false;

                        /*
                         * we need to loop over every card between our current
                         * card and the card that we clicked, and re-validate
                         * them.  if there's an error, we need to select the
                         * first card to have an error
                         */
                        while (cardToValidate.index != newCard.index) {
                            /*
                             * unless we're validating the card that we're
                             * leaving, we need to select the card, so that
                             * any validators that trigger errorPopovers can
                             * display correctly
                             */
                            if (cardToValidate.index != currentCard.index) {
                                cardToValidate.prev.deselect();
                                cardToValidate.prev.markVisited();
                                cardToValidate.select();
                            }
                            ok = cardToValidate.validate();
                            if (!ok) {
                                return cardToValidate;
                            }
                            cardToValidate = cardToValidate.next;
                        }

                        cardToValidate.prev.deselect();
                        cardToValidate.prev.markVisited();
                    }

                    currentCard.deselect();
                    currentCard.markVisited();
                }

                newCard.select();

                if (this.args.progressBarCurrent) {
                    this.percentComplete = i * 100.0 / this._cards.length;
                    this.updateProgressBar(this.percentComplete);					
                }
                else {
                    var lastPercent = this.percentComplete;
                    this.percentComplete = i * 100.0 / this._cards.length;
                    this.percentComplete = Math.max(lastPercent, this.percentComplete);
                    this.updateProgressBar(this.percentComplete);
                }

                return newCard;
            }
            else {
                this.log("couldn't find card " + i);
            }
        },

        updateProgressBar: function(percent) {
            this.log("updating progress to " + percent + "%");
            this.progress.css({width: percent + "%"});
            this.percentComplete = percent;

            this.trigger("progressBar", percent);

            if (percent == 100) {
                this.log("progress is 100, animating progress bar");
                this.progressContainer.find('.progress').addClass("active");
            }
            else if (percent == 0) {
                this.log("progress is 0, disabling animation");
                this.progressContainer.find('.progress').removeClass("active");
            }
        },

        getNextCard: function() {
            var currentCard = this.getActiveCard();
            if (currentCard) return currentCard.next;
        },

        lockCards: function() {
            this.log("locking nav cards");
            this.eachCard(function(i,card){card.unmarkVisited();});
            return this;
        },

        disableCards: function() {
            this.log("disabling all nav cards");
            this.eachCard(function(i,card){card.disable();});
            return this;
        },

        enableCards: function() {
            this.log("enabling all nav cards");
            this.eachCard(function(i,card){card.enable();});
            return this;
        },

        hideCards: function() {
            this.log("hiding cards");
            this.eachCard(function(i,card){card.deselect();});
            this.hideSubmitCards();
            return this;
        },

        hideButtons: function() {
            this.log("hiding buttons");
            this.cancelButton.hide();
            this.closeButton.hide();
            this.nextButton.hide();
            this.backButton.hide();
            return this;
        },

        showButtons: function() {
            this.log("showing buttons");
            if (this.args.showCancel) { 
                this.cancelButton.show(); 
            } else {
                this.cancelButton.hide(); 
            }
            if (this.args.showClose) { this.closeButton.show(); };
            this.nextButton.show();
            this.backButton.show();
            return this;
        },

        getCard: function(el) {
            var cardDOMEl = $(el).parents(".wizard-card").first()[0];
            if (cardDOMEl) {
                var foundCard = null;
                this.eachCard(function(i, card) {
                    if (cardDOMEl == card.el[0]) {
                        foundCard = card;
                        return false;
                    }
                    return true;
                });
                return foundCard;
            }
            else {
                return null;
            }
        },

        _createCards: function() {
            var prev = null;
            var next = null;
            var currentCard = null;
            var wizard = this;
            var self = this;
            
            self.log("Creating Cards");

            var cards = this.modal.find(".wizard-cards .wizard-card");
            $.each(cards, function(i, card) {
                card = $(card);

                prev = currentCard;
                currentCard = new WizardCard(wizard, card, i, prev, next);
                self._cards.push(currentCard);
                if (currentCard.name) {
                    self.cards[currentCard.name] = currentCard;
                }
                if (prev) {prev.next = currentCard;}

                self.modal.find(".wizard-steps .wizard-nav-list").append(currentCard.nav);
            });
        },

        showSubmitCard: function(name) {
            this.log("showing "+name+" submit card");

            var card = this.el.find(".wizard-"+name);
            if (card.length) {
                this.hideCards();
                this.el.find(".wizard-"+name).show();
            }
            else {
                this.log("couldn't find submit card "+name);
            }
        },

        hideSubmitCard: function(name) {
            this.log("hiding "+name+" submit card");
            this.el.find(".wizard-"+name).hide();
        },

        hideSubmitCards: function() {
            var wizard = this;
            $.each(["success", "error", "failure", "loading"], function(i, name) {
                wizard.hideSubmitCard(name);
            });
        },

        enableNextButton: function() {
            this.log("enabling next button");
            this.nextButton.removeAttr("disabled");
            return this;
        },

        disableNextButton: function() {
            this.log("disabling next button");
            this.nextButton.attr("disabled", "disabled");
            return this;
        },

        serializeArray: function() {
            var form = this.form.serializeArray();
            this.form.find('input[disabled][data-serialize="1"]').each(function() {
                formObj = {
                    name: $(this).attr('name'),
                    value: $(this).val()
                };
                
                form.push(formObj);
            });
            
            return form;
        },

        serialize: function() {
            var form = this.form.serialize();
            this.form.find('input[disabled][data-serialize="1"]').each(function() {
                form = form + '&' + $(this).attr('name') + '=' + $(this).val();
            });
            
            return form;
        },
        
        find: function(selector) {
            return this.modal.find(selector);
        },


        /*
         * the next 3 functions are to be called by the custom submit event
         * handler.  the idea is that after you make an ajax call to submit
         * your wizard data (or whatever it is you want to do at the end of
         * the wizard), you call one of these 3 handlers to display a specific
         * card for either success, failure, or error
         */
        submitSuccess: function() {
            this.log("submit success");
            this._submitting = false;
            this.showSubmitCard("success");
            this.trigger("submitSuccess");
        },

        submitFailure: function() {
            this.log("submit failure");
            this._submitting = false;
            this.showSubmitCard("failure");
            this.trigger("submitFailure");
        },

        submitError: function() {
            this.log("submit error");
            this._submitting = false;
            this.showSubmitCard("error");
            this.trigger("submitError");
        },


        _submit: function() {
            this.log("submitting wizard");
            this._submitting = true;

            this.lockCards();
            this.cancelButton.hide();
            this.closeButton.hide();
            this.backButton.hide();

            this.showSubmitCard("loading");
            this.updateProgressBar(100);

            this.changeNextButton(this.args.buttons.submittingText, false);
            this.disableNextButton();

            var ret = this.trigger("submit");
            this.trigger("loading");
        },

        _onNextClick: function() {
            this.log("handling 'next' button click");
            var currentCard = this.getActiveCard();
            if (this._readyToSubmit && currentCard.validate()) {
                this._submit();
            }
            else {
                currentCard = this.incrementCard();
            }
        },

        _onBackClick: function() {
            this.log("handling 'back' button click");
            var currentCard = this.decrementCard();
        },

        _handleNextClick: function(event) {
            var wizard = event.data;
            wizard._onNextClick.call(wizard);
        },

        _handleBackClick: function(event) {
            var wizard = event.data;
            wizard._onBackClick.call(wizard);
        },


        /*
         * this function is attached by default to the wizard's "submit" event.
         * if you choose to implement your own custom submit logic, you should
         * copy how this function works
         */
        _defaultSubmit: function(wizard) {
            $.ajax({
                type: "POST",
                url: wizard.args.submitUrl,
                data: wizard.serialize(),
                dataType: "json"
            }).done(function(response) {
                wizard.submitSuccess();
                wizard.hideButtons();
                wizard.updateProgressBar(0);
            }).fail(function() {
                wizard.submitFailure();
                wizard.hideButtons();
            });
        }
    };
    
    
}(__webpack_provided_window_dot_jQuery));

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(23)))

/***/ },

/***/ 747:
/***/ function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(__webpack_provided_window_dot_jQuery) {/*!
 * Bootstrap Colorpicker v2.3.6
 * https://itsjavi.com/bootstrap-colorpicker/
 *
 * Originally written by (c) 2012 Stefan Petre
 * Licensed under the Apache License v2.0
 * http://www.apache.org/licenses/LICENSE-2.0.txt
 *
 */

(function(factory) {
  "use strict";
  if (true) {
    module.exports = factory(__webpack_provided_window_dot_jQuery);
  } else if (typeof define === 'function' && define.amd) {
    define(['jquery'], factory);
  } else if (window.jQuery && !window.jQuery.fn.colorpicker) {
    factory(window.jQuery);
  }
}(function($) {
  'use strict';

  /**
   * Color manipulation helper class
   *
   * @param {Object|String} val
   * @param {Object} predefinedColors
   * @constructor
   */
  var Color = function(val, predefinedColors) {
    this.value = {
      h: 0,
      s: 0,
      b: 0,
      a: 1
    };
    this.origFormat = null; // original string format
    if (predefinedColors) {
      $.extend(this.colors, predefinedColors);
    }
    if (val) {
      if (val.toLowerCase !== undefined) {
        // cast to string
        val = val + '';
        this.setColor(val);
      } else if (val.h !== undefined) {
        this.value = val;
      }
    }
  };

  Color.prototype = {
    constructor: Color,
    // 140 predefined colors from the HTML Colors spec
    colors: {
      "aliceblue": "#f0f8ff",
      "antiquewhite": "#faebd7",
      "aqua": "#00ffff",
      "aquamarine": "#7fffd4",
      "azure": "#f0ffff",
      "beige": "#f5f5dc",
      "bisque": "#ffe4c4",
      "black": "#000000",
      "blanchedalmond": "#ffebcd",
      "blue": "#0000ff",
      "blueviolet": "#8a2be2",
      "brown": "#a52a2a",
      "burlywood": "#deb887",
      "cadetblue": "#5f9ea0",
      "chartreuse": "#7fff00",
      "chocolate": "#d2691e",
      "coral": "#ff7f50",
      "cornflowerblue": "#6495ed",
      "cornsilk": "#fff8dc",
      "crimson": "#dc143c",
      "cyan": "#00ffff",
      "darkblue": "#00008b",
      "darkcyan": "#008b8b",
      "darkgoldenrod": "#b8860b",
      "darkgray": "#a9a9a9",
      "darkgreen": "#006400",
      "darkkhaki": "#bdb76b",
      "darkmagenta": "#8b008b",
      "darkolivegreen": "#556b2f",
      "darkorange": "#ff8c00",
      "darkorchid": "#9932cc",
      "darkred": "#8b0000",
      "darksalmon": "#e9967a",
      "darkseagreen": "#8fbc8f",
      "darkslateblue": "#483d8b",
      "darkslategray": "#2f4f4f",
      "darkturquoise": "#00ced1",
      "darkviolet": "#9400d3",
      "deeppink": "#ff1493",
      "deepskyblue": "#00bfff",
      "dimgray": "#696969",
      "dodgerblue": "#1e90ff",
      "firebrick": "#b22222",
      "floralwhite": "#fffaf0",
      "forestgreen": "#228b22",
      "fuchsia": "#ff00ff",
      "gainsboro": "#dcdcdc",
      "ghostwhite": "#f8f8ff",
      "gold": "#ffd700",
      "goldenrod": "#daa520",
      "gray": "#808080",
      "green": "#008000",
      "greenyellow": "#adff2f",
      "honeydew": "#f0fff0",
      "hotpink": "#ff69b4",
      "indianred": "#cd5c5c",
      "indigo": "#4b0082",
      "ivory": "#fffff0",
      "khaki": "#f0e68c",
      "lavender": "#e6e6fa",
      "lavenderblush": "#fff0f5",
      "lawngreen": "#7cfc00",
      "lemonchiffon": "#fffacd",
      "lightblue": "#add8e6",
      "lightcoral": "#f08080",
      "lightcyan": "#e0ffff",
      "lightgoldenrodyellow": "#fafad2",
      "lightgrey": "#d3d3d3",
      "lightgreen": "#90ee90",
      "lightpink": "#ffb6c1",
      "lightsalmon": "#ffa07a",
      "lightseagreen": "#20b2aa",
      "lightskyblue": "#87cefa",
      "lightslategray": "#778899",
      "lightsteelblue": "#b0c4de",
      "lightyellow": "#ffffe0",
      "lime": "#00ff00",
      "limegreen": "#32cd32",
      "linen": "#faf0e6",
      "magenta": "#ff00ff",
      "maroon": "#800000",
      "mediumaquamarine": "#66cdaa",
      "mediumblue": "#0000cd",
      "mediumorchid": "#ba55d3",
      "mediumpurple": "#9370d8",
      "mediumseagreen": "#3cb371",
      "mediumslateblue": "#7b68ee",
      "mediumspringgreen": "#00fa9a",
      "mediumturquoise": "#48d1cc",
      "mediumvioletred": "#c71585",
      "midnightblue": "#191970",
      "mintcream": "#f5fffa",
      "mistyrose": "#ffe4e1",
      "moccasin": "#ffe4b5",
      "navajowhite": "#ffdead",
      "navy": "#000080",
      "oldlace": "#fdf5e6",
      "olive": "#808000",
      "olivedrab": "#6b8e23",
      "orange": "#ffa500",
      "orangered": "#ff4500",
      "orchid": "#da70d6",
      "palegoldenrod": "#eee8aa",
      "palegreen": "#98fb98",
      "paleturquoise": "#afeeee",
      "palevioletred": "#d87093",
      "papayawhip": "#ffefd5",
      "peachpuff": "#ffdab9",
      "peru": "#cd853f",
      "pink": "#ffc0cb",
      "plum": "#dda0dd",
      "powderblue": "#b0e0e6",
      "purple": "#800080",
      "red": "#ff0000",
      "rosybrown": "#bc8f8f",
      "royalblue": "#4169e1",
      "saddlebrown": "#8b4513",
      "salmon": "#fa8072",
      "sandybrown": "#f4a460",
      "seagreen": "#2e8b57",
      "seashell": "#fff5ee",
      "sienna": "#a0522d",
      "silver": "#c0c0c0",
      "skyblue": "#87ceeb",
      "slateblue": "#6a5acd",
      "slategray": "#708090",
      "snow": "#fffafa",
      "springgreen": "#00ff7f",
      "steelblue": "#4682b4",
      "tan": "#d2b48c",
      "teal": "#008080",
      "thistle": "#d8bfd8",
      "tomato": "#ff6347",
      "turquoise": "#40e0d0",
      "violet": "#ee82ee",
      "wheat": "#f5deb3",
      "white": "#ffffff",
      "whitesmoke": "#f5f5f5",
      "yellow": "#ffff00",
      "yellowgreen": "#9acd32",
      "transparent": "transparent"
    },
    _sanitizeNumber: function(val) {
      if (typeof val === 'number') {
        return val;
      }
      if (isNaN(val) || (val === null) || (val === '') || (val === undefined)) {
        return 1;
      }
      if (val === '') {
        return 0;
      }
      if (val.toLowerCase !== undefined) {
        if (val.match(/^\./)) {
          val = "0" + val;
        }
        return Math.ceil(parseFloat(val) * 100) / 100;
      }
      return 1;
    },
    isTransparent: function(strVal) {
      if (!strVal) {
        return false;
      }
      strVal = strVal.toLowerCase().trim();
      return (strVal === 'transparent') || (strVal.match(/#?00000000/)) || (strVal.match(/(rgba|hsla)\(0,0,0,0?\.?0\)/));
    },
    rgbaIsTransparent: function(rgba) {
      return ((rgba.r === 0) && (rgba.g === 0) && (rgba.b === 0) && (rgba.a === 0));
    },
    //parse a string to HSB
    setColor: function(strVal) {
      strVal = strVal.toLowerCase().trim();
      if (strVal) {
        if (this.isTransparent(strVal)) {
          this.value = {
            h: 0,
            s: 0,
            b: 0,
            a: 0
          };
        } else {
          this.value = this.stringToHSB(strVal) || {
            h: 0,
            s: 0,
            b: 0,
            a: 1
          }; // if parser fails, defaults to black
        }
      }
    },
    stringToHSB: function(strVal) {
      strVal = strVal.toLowerCase();
      var alias;
      if (typeof this.colors[strVal] !== 'undefined') {
        strVal = this.colors[strVal];
        alias = 'alias';
      }
      var that = this,
        result = false;
      $.each(this.stringParsers, function(i, parser) {
        var match = parser.re.exec(strVal),
          values = match && parser.parse.apply(that, [match]),
          format = alias || parser.format || 'rgba';
        if (values) {
          if (format.match(/hsla?/)) {
            result = that.RGBtoHSB.apply(that, that.HSLtoRGB.apply(that, values));
          } else {
            result = that.RGBtoHSB.apply(that, values);
          }
          that.origFormat = format;
          return false;
        }
        return true;
      });
      return result;
    },
    setHue: function(h) {
      this.value.h = 1 - h;
    },
    setSaturation: function(s) {
      this.value.s = s;
    },
    setBrightness: function(b) {
      this.value.b = 1 - b;
    },
    setAlpha: function(a) {
      this.value.a = Math.round((parseInt((1 - a) * 100, 10) / 100) * 100) / 100;
    },
    toRGB: function(h, s, b, a) {
      if (!h) {
        h = this.value.h;
        s = this.value.s;
        b = this.value.b;
      }
      h *= 360;
      var R, G, B, X, C;
      h = (h % 360) / 60;
      C = b * s;
      X = C * (1 - Math.abs(h % 2 - 1));
      R = G = B = b - C;

      h = ~~h;
      R += [C, X, 0, 0, X, C][h];
      G += [X, C, C, X, 0, 0][h];
      B += [0, 0, X, C, C, X][h];
      return {
        r: Math.round(R * 255),
        g: Math.round(G * 255),
        b: Math.round(B * 255),
        a: a || this.value.a
      };
    },
    toHex: function(h, s, b, a) {
      var rgb = this.toRGB(h, s, b, a);
      if (this.rgbaIsTransparent(rgb)) {
        return 'transparent';
      }
      return '#' + ((1 << 24) | (parseInt(rgb.r) << 16) | (parseInt(rgb.g) << 8) | parseInt(rgb.b)).toString(16).substr(1);
    },
    toHSL: function(h, s, b, a) {
      h = h || this.value.h;
      s = s || this.value.s;
      b = b || this.value.b;
      a = a || this.value.a;

      var H = h,
        L = (2 - s) * b,
        S = s * b;
      if (L > 0 && L <= 1) {
        S /= L;
      } else {
        S /= 2 - L;
      }
      L /= 2;
      if (S > 1) {
        S = 1;
      }
      return {
        h: isNaN(H) ? 0 : H,
        s: isNaN(S) ? 0 : S,
        l: isNaN(L) ? 0 : L,
        a: isNaN(a) ? 0 : a
      };
    },
    toAlias: function(r, g, b, a) {
      var rgb = this.toHex(r, g, b, a);
      for (var alias in this.colors) {
        if (this.colors[alias] === rgb) {
          return alias;
        }
      }
      return false;
    },
    RGBtoHSB: function(r, g, b, a) {
      r /= 255;
      g /= 255;
      b /= 255;

      var H, S, V, C;
      V = Math.max(r, g, b);
      C = V - Math.min(r, g, b);
      H = (C === 0 ? null :
        V === r ? (g - b) / C :
        V === g ? (b - r) / C + 2 :
        (r - g) / C + 4
      );
      H = ((H + 360) % 6) * 60 / 360;
      S = C === 0 ? 0 : C / V;
      return {
        h: this._sanitizeNumber(H),
        s: S,
        b: V,
        a: this._sanitizeNumber(a)
      };
    },
    HueToRGB: function(p, q, h) {
      if (h < 0) {
        h += 1;
      } else if (h > 1) {
        h -= 1;
      }
      if ((h * 6) < 1) {
        return p + (q - p) * h * 6;
      } else if ((h * 2) < 1) {
        return q;
      } else if ((h * 3) < 2) {
        return p + (q - p) * ((2 / 3) - h) * 6;
      } else {
        return p;
      }
    },
    HSLtoRGB: function(h, s, l, a) {
      if (s < 0) {
        s = 0;
      }
      var q;
      if (l <= 0.5) {
        q = l * (1 + s);
      } else {
        q = l + s - (l * s);
      }

      var p = 2 * l - q;

      var tr = h + (1 / 3);
      var tg = h;
      var tb = h - (1 / 3);

      var r = Math.round(this.HueToRGB(p, q, tr) * 255);
      var g = Math.round(this.HueToRGB(p, q, tg) * 255);
      var b = Math.round(this.HueToRGB(p, q, tb) * 255);
      return [r, g, b, this._sanitizeNumber(a)];
    },
    toString: function(format) {
      format = format || 'rgba';
      var c = false;
      switch (format) {
        case 'rgb':
          {
            c = this.toRGB();
            if (this.rgbaIsTransparent(c)) {
              return 'transparent';
            }
            return 'rgb(' + c.r + ',' + c.g + ',' + c.b + ')';
          }
          break;
        case 'rgba':
          {
            c = this.toRGB();
            return 'rgba(' + c.r + ',' + c.g + ',' + c.b + ',' + c.a + ')';
          }
          break;
        case 'hsl':
          {
            c = this.toHSL();
            return 'hsl(' + Math.round(c.h * 360) + ',' + Math.round(c.s * 100) + '%,' + Math.round(c.l * 100) + '%)';
          }
          break;
        case 'hsla':
          {
            c = this.toHSL();
            return 'hsla(' + Math.round(c.h * 360) + ',' + Math.round(c.s * 100) + '%,' + Math.round(c.l * 100) + '%,' + c.a + ')';
          }
          break;
        case 'hex':
          {
            return this.toHex();
          }
          break;
        case 'alias':
          return this.toAlias() || this.toHex();
        default:
          {
            return c;
          }
          break;
      }
    },
    // a set of RE's that can match strings and generate color tuples.
    // from John Resig color plugin
    // https://github.com/jquery/jquery-color/
    stringParsers: [{
      re: /rgb\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*?\)/,
      format: 'rgb',
      parse: function(execResult) {
        return [
          execResult[1],
          execResult[2],
          execResult[3],
          1
        ];
      }
    }, {
      re: /rgb\(\s*(\d*(?:\.\d+)?)\%\s*,\s*(\d*(?:\.\d+)?)\%\s*,\s*(\d*(?:\.\d+)?)\%\s*?\)/,
      format: 'rgb',
      parse: function(execResult) {
        return [
          2.55 * execResult[1],
          2.55 * execResult[2],
          2.55 * execResult[3],
          1
        ];
      }
    }, {
      re: /rgba\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*(?:,\s*(\d*(?:\.\d+)?)\s*)?\)/,
      format: 'rgba',
      parse: function(execResult) {
        return [
          execResult[1],
          execResult[2],
          execResult[3],
          execResult[4]
        ];
      }
    }, {
      re: /rgba\(\s*(\d*(?:\.\d+)?)\%\s*,\s*(\d*(?:\.\d+)?)\%\s*,\s*(\d*(?:\.\d+)?)\%\s*(?:,\s*(\d*(?:\.\d+)?)\s*)?\)/,
      format: 'rgba',
      parse: function(execResult) {
        return [
          2.55 * execResult[1],
          2.55 * execResult[2],
          2.55 * execResult[3],
          execResult[4]
        ];
      }
    }, {
      re: /hsl\(\s*(\d*(?:\.\d+)?)\s*,\s*(\d*(?:\.\d+)?)\%\s*,\s*(\d*(?:\.\d+)?)\%\s*?\)/,
      format: 'hsl',
      parse: function(execResult) {
        return [
          execResult[1] / 360,
          execResult[2] / 100,
          execResult[3] / 100,
          execResult[4]
        ];
      }
    }, {
      re: /hsla\(\s*(\d*(?:\.\d+)?)\s*,\s*(\d*(?:\.\d+)?)\%\s*,\s*(\d*(?:\.\d+)?)\%\s*(?:,\s*(\d*(?:\.\d+)?)\s*)?\)/,
      format: 'hsla',
      parse: function(execResult) {
        return [
          execResult[1] / 360,
          execResult[2] / 100,
          execResult[3] / 100,
          execResult[4]
        ];
      }
    }, {
      re: /#?([a-fA-F0-9]{2})([a-fA-F0-9]{2})([a-fA-F0-9]{2})/,
      format: 'hex',
      parse: function(execResult) {
        return [
          parseInt(execResult[1], 16),
          parseInt(execResult[2], 16),
          parseInt(execResult[3], 16),
          1
        ];
      }
    }, {
      re: /#?([a-fA-F0-9])([a-fA-F0-9])([a-fA-F0-9])/,
      format: 'hex',
      parse: function(execResult) {
        return [
          parseInt(execResult[1] + execResult[1], 16),
          parseInt(execResult[2] + execResult[2], 16),
          parseInt(execResult[3] + execResult[3], 16),
          1
        ];
      }
    }],
    colorNameToHex: function(name) {
      if (typeof this.colors[name.toLowerCase()] !== 'undefined') {
        return this.colors[name.toLowerCase()];
      }
      return false;
    }
  };

  /*
   * Default plugin options
   */
  var defaults = {
    horizontal: false, // horizontal mode layout ?
    inline: false, //forces to show the colorpicker as an inline element
    color: false, //forces a color
    format: false, //forces a format
    input: 'input', // children input selector
    container: false, // container selector
    component: '.add-on, .input-group-addon', // children component selector
    sliders: {
      saturation: {
        maxLeft: 100,
        maxTop: 100,
        callLeft: 'setSaturation',
        callTop: 'setBrightness'
      },
      hue: {
        maxLeft: 0,
        maxTop: 100,
        callLeft: false,
        callTop: 'setHue'
      },
      alpha: {
        maxLeft: 0,
        maxTop: 100,
        callLeft: false,
        callTop: 'setAlpha'
      }
    },
    slidersHorz: {
      saturation: {
        maxLeft: 100,
        maxTop: 100,
        callLeft: 'setSaturation',
        callTop: 'setBrightness'
      },
      hue: {
        maxLeft: 100,
        maxTop: 0,
        callLeft: 'setHue',
        callTop: false
      },
      alpha: {
        maxLeft: 100,
        maxTop: 0,
        callLeft: 'setAlpha',
        callTop: false
      }
    },
    template: '<div class="colorpicker dropdown-menu">' +
      '<div class="colorpicker-saturation"><i><b></b></i></div>' +
      '<div class="colorpicker-hue"><i></i></div>' +
      '<div class="colorpicker-alpha"><i></i></div>' +
      '<div class="colorpicker-color"><div /></div>' +
      '<div class="colorpicker-selectors"></div>' +
      '</div>',
    align: 'right',
    customClass: null,
    colorSelectors: null
  };

  /**
   * Colorpicker component class
   *
   * @param {Object|String} element
   * @param {Object} options
   * @constructor
   */
  var Colorpicker = function(element, options) {
    this.element = $(element).addClass('colorpicker-element');
    this.options = $.extend(true, {}, defaults, this.element.data(), options);
    this.component = this.options.component;
    this.component = (this.component !== false) ? this.element.find(this.component) : false;
    if (this.component && (this.component.length === 0)) {
      this.component = false;
    }
    this.container = (this.options.container === true) ? this.element : this.options.container;
    this.container = (this.container !== false) ? $(this.container) : false;

    // Is the element an input? Should we search inside for any input?
    this.input = this.element.is('input') ? this.element : (this.options.input ?
      this.element.find(this.options.input) : false);
    if (this.input && (this.input.length === 0)) {
      this.input = false;
    }
    // Set HSB color
    this.color = new Color(this.options.color !== false ? this.options.color : this.getValue(), this.options.colorSelectors);
    this.format = this.options.format !== false ? this.options.format : this.color.origFormat;

    if (this.options.color !== false) {
      this.updateInput(this.color);
      this.updateData(this.color);
    }

    // Setup picker
    this.picker = $(this.options.template);
    if (this.options.customClass) {
      this.picker.addClass(this.options.customClass);
    }
    if (this.options.inline) {
      this.picker.addClass('colorpicker-inline colorpicker-visible');
    } else {
      this.picker.addClass('colorpicker-hidden');
    }
    if (this.options.horizontal) {
      this.picker.addClass('colorpicker-horizontal');
    }
    if (this.format === 'rgba' || this.format === 'hsla' || this.options.format === false) {
      this.picker.addClass('colorpicker-with-alpha');
    }
    if (this.options.align === 'right') {
      this.picker.addClass('colorpicker-right');
    }
    if (this.options.inline === true) {
      this.picker.addClass('colorpicker-no-arrow');
    }
    if (this.options.colorSelectors) {
      var colorpicker = this;
      $.each(this.options.colorSelectors, function(name, color) {
        var $btn = $('<i />').css('background-color', color).data('class', name);
        $btn.click(function() {
          colorpicker.setValue($(this).css('background-color'));
        });
        colorpicker.picker.find('.colorpicker-selectors').append($btn);
      });
      this.picker.find('.colorpicker-selectors').show();
    }
    this.picker.on('mousedown.colorpicker touchstart.colorpicker', $.proxy(this.mousedown, this));
    this.picker.appendTo(this.container ? this.container : $('body'));

    // Bind events
    if (this.input !== false) {
      this.input.on({
        'keyup.colorpicker': $.proxy(this.keyup, this)
      });
      this.input.on({
        'change.colorpicker': $.proxy(this.change, this)
      });
      if (this.component === false) {
        this.element.on({
          'focus.colorpicker': $.proxy(this.show, this)
        });
      }
      if (this.options.inline === false) {
        this.element.on({
          'focusout.colorpicker': $.proxy(this.hide, this)
        });
      }
    }

    if (this.component !== false) {
      this.component.on({
        'click.colorpicker': $.proxy(this.show, this)
      });
    }

    if ((this.input === false) && (this.component === false)) {
      this.element.on({
        'click.colorpicker': $.proxy(this.show, this)
      });
    }

    // for HTML5 input[type='color']
    if ((this.input !== false) && (this.component !== false) && (this.input.attr('type') === 'color')) {

      this.input.on({
        'click.colorpicker': $.proxy(this.show, this),
        'focus.colorpicker': $.proxy(this.show, this)
      });
    }
    this.update();

    $($.proxy(function() {
      this.element.trigger('create');
    }, this));
  };

  Colorpicker.Color = Color;

  Colorpicker.prototype = {
    constructor: Colorpicker,
    destroy: function() {
      this.picker.remove();
      this.element.removeData('colorpicker', 'color').off('.colorpicker');
      if (this.input !== false) {
        this.input.off('.colorpicker');
      }
      if (this.component !== false) {
        this.component.off('.colorpicker');
      }
      this.element.removeClass('colorpicker-element');
      this.element.trigger({
        type: 'destroy'
      });
    },
    reposition: function() {
      if (this.options.inline !== false || this.options.container) {
        return false;
      }
      var type = this.container && this.container[0] !== document.body ? 'position' : 'offset';
      var element = this.component || this.element;
      var offset = element[type]();
      if (this.options.align === 'right') {
        offset.left -= this.picker.outerWidth() - element.outerWidth();
      }
      this.picker.css({
        top: offset.top + element.outerHeight(),
        left: offset.left
      });
    },
    show: function(e) {
      if (this.isDisabled()) {
        return false;
      }
      this.picker.addClass('colorpicker-visible').removeClass('colorpicker-hidden');
      this.reposition();
      $(window).on('resize.colorpicker', $.proxy(this.reposition, this));
      if (e && (!this.hasInput() || this.input.attr('type') === 'color')) {
        if (e.stopPropagation && e.preventDefault) {
          e.stopPropagation();
          e.preventDefault();
        }
      }
      if ((this.component || !this.input) && (this.options.inline === false)) {
        $(window.document).on({
          'mousedown.colorpicker': $.proxy(this.hide, this)
        });
      }
      this.element.trigger({
        type: 'showPicker',
        color: this.color
      });
    },
    hide: function() {
      this.picker.addClass('colorpicker-hidden').removeClass('colorpicker-visible');
      $(window).off('resize.colorpicker', this.reposition);
      $(document).off({
        'mousedown.colorpicker': this.hide
      });
      this.update();
      this.element.trigger({
        type: 'hidePicker',
        color: this.color
      });
    },
    updateData: function(val) {
      val = val || this.color.toString(this.format);
      this.element.data('color', val);
      return val;
    },
    updateInput: function(val) {
      val = val || this.color.toString(this.format);
      if (this.input !== false) {
        if (this.options.colorSelectors) {
          var color = new Color(val, this.options.colorSelectors);
          var alias = color.toAlias();
          if (typeof this.options.colorSelectors[alias] !== 'undefined') {
            val = alias;
          }
        }
        this.input.prop('value', val);
      }
      return val;
    },
    updatePicker: function(val) {
      if (val !== undefined) {
        this.color = new Color(val, this.options.colorSelectors);
      }
      var sl = (this.options.horizontal === false) ? this.options.sliders : this.options.slidersHorz;
      var icns = this.picker.find('i');
      if (icns.length === 0) {
        return;
      }
      if (this.options.horizontal === false) {
        sl = this.options.sliders;
        icns.eq(1).css('top', sl.hue.maxTop * (1 - this.color.value.h)).end()
          .eq(2).css('top', sl.alpha.maxTop * (1 - this.color.value.a));
      } else {
        sl = this.options.slidersHorz;
        icns.eq(1).css('left', sl.hue.maxLeft * (1 - this.color.value.h)).end()
          .eq(2).css('left', sl.alpha.maxLeft * (1 - this.color.value.a));
      }
      icns.eq(0).css({
        'top': sl.saturation.maxTop - this.color.value.b * sl.saturation.maxTop,
        'left': this.color.value.s * sl.saturation.maxLeft
      });
      this.picker.find('.colorpicker-saturation').css('backgroundColor', this.color.toHex(this.color.value.h, 1, 1, 1));
      this.picker.find('.colorpicker-alpha').css('backgroundColor', this.color.toHex());
      this.picker.find('.colorpicker-color, .colorpicker-color div').css('backgroundColor', this.color.toString(this.format));
      return val;
    },
    updateComponent: function(val) {
      val = val || this.color.toString(this.format);
      if (this.component !== false) {
        var icn = this.component.find('i').eq(0);
        if (icn.length > 0) {
          icn.css({
            'backgroundColor': val
          });
        } else {
          this.component.css({
            'backgroundColor': val
          });
        }
      }
      return val;
    },
    update: function(force) {
      var val;
      if ((this.getValue(false) !== false) || (force === true)) {
        // Update input/data only if the current value is not empty
        val = this.updateComponent();
        this.updateInput(val);
        this.updateData(val);
        this.updatePicker(); // only update picker if value is not empty
      }
      return val;

    },
    setValue: function(val) { // set color manually
      this.color = new Color(val, this.options.colorSelectors);
      this.update(true);
      this.element.trigger({
        type: 'changeColor',
        color: this.color,
        value: val
      });
    },
    getValue: function(defaultValue) {
      defaultValue = (defaultValue === undefined) ? '#000000' : defaultValue;
      var val;
      if (this.hasInput()) {
        val = this.input.val();
      } else {
        val = this.element.data('color');
      }
      if ((val === undefined) || (val === '') || (val === null)) {
        // if not defined or empty, return default
        val = defaultValue;
      }
      return val;
    },
    hasInput: function() {
      return (this.input !== false);
    },
    isDisabled: function() {
      if (this.hasInput()) {
        return (this.input.prop('disabled') === true);
      }
      return false;
    },
    disable: function() {
      if (this.hasInput()) {
        this.input.prop('disabled', true);
        this.element.trigger({
          type: 'disable',
          color: this.color,
          value: this.getValue()
        });
        return true;
      }
      return false;
    },
    enable: function() {
      if (this.hasInput()) {
        this.input.prop('disabled', false);
        this.element.trigger({
          type: 'enable',
          color: this.color,
          value: this.getValue()
        });
        return true;
      }
      return false;
    },
    currentSlider: null,
    mousePointer: {
      left: 0,
      top: 0
    },
    mousedown: function(e) {
      if (!e.pageX && !e.pageY && e.originalEvent && e.originalEvent.touches) {
        e.pageX = e.originalEvent.touches[0].pageX;
        e.pageY = e.originalEvent.touches[0].pageY;
      }
      e.stopPropagation();
      e.preventDefault();

      var target = $(e.target);

      //detect the slider and set the limits and callbacks
      var zone = target.closest('div');
      var sl = this.options.horizontal ? this.options.slidersHorz : this.options.sliders;
      if (!zone.is('.colorpicker')) {
        if (zone.is('.colorpicker-saturation')) {
          this.currentSlider = $.extend({}, sl.saturation);
        } else if (zone.is('.colorpicker-hue')) {
          this.currentSlider = $.extend({}, sl.hue);
        } else if (zone.is('.colorpicker-alpha')) {
          this.currentSlider = $.extend({}, sl.alpha);
        } else {
          return false;
        }
        var offset = zone.offset();
        //reference to guide's style
        this.currentSlider.guide = zone.find('i')[0].style;
        this.currentSlider.left = e.pageX - offset.left;
        this.currentSlider.top = e.pageY - offset.top;
        this.mousePointer = {
          left: e.pageX,
          top: e.pageY
        };
        //trigger mousemove to move the guide to the current position
        $(document).on({
          'mousemove.colorpicker': $.proxy(this.mousemove, this),
          'touchmove.colorpicker': $.proxy(this.mousemove, this),
          'mouseup.colorpicker': $.proxy(this.mouseup, this),
          'touchend.colorpicker': $.proxy(this.mouseup, this)
        }).trigger('mousemove');
      }
      return false;
    },
    mousemove: function(e) {
      if (!e.pageX && !e.pageY && e.originalEvent && e.originalEvent.touches) {
        e.pageX = e.originalEvent.touches[0].pageX;
        e.pageY = e.originalEvent.touches[0].pageY;
      }
      e.stopPropagation();
      e.preventDefault();
      var left = Math.max(
        0,
        Math.min(
          this.currentSlider.maxLeft,
          this.currentSlider.left + ((e.pageX || this.mousePointer.left) - this.mousePointer.left)
        )
      );
      var top = Math.max(
        0,
        Math.min(
          this.currentSlider.maxTop,
          this.currentSlider.top + ((e.pageY || this.mousePointer.top) - this.mousePointer.top)
        )
      );
      this.currentSlider.guide.left = left + 'px';
      this.currentSlider.guide.top = top + 'px';
      if (this.currentSlider.callLeft) {
        this.color[this.currentSlider.callLeft].call(this.color, left / this.currentSlider.maxLeft);
      }
      if (this.currentSlider.callTop) {
        this.color[this.currentSlider.callTop].call(this.color, top / this.currentSlider.maxTop);
      }
      // Change format dynamically
      // Only occurs if user choose the dynamic format by
      // setting option format to false
      if (this.currentSlider.callTop === 'setAlpha' && this.options.format === false) {

        // Converting from hex / rgb to rgba
        if (this.color.value.a !== 1) {
          this.format = 'rgba';
          this.color.origFormat = 'rgba';
        }

        // Converting from rgba to hex
        else {
          this.format = 'hex';
          this.color.origFormat = 'hex';
        }
      }
      this.update(true);

      this.element.trigger({
        type: 'changeColor',
        color: this.color
      });
      return false;
    },
    mouseup: function(e) {
      e.stopPropagation();
      e.preventDefault();
      $(document).off({
        'mousemove.colorpicker': this.mousemove,
        'touchmove.colorpicker': this.mousemove,
        'mouseup.colorpicker': this.mouseup,
        'touchend.colorpicker': this.mouseup
      });
      return false;
    },
    change: function(e) {
      this.keyup(e);
    },
    keyup: function(e) {
      if ((e.keyCode === 38)) {
        if (this.color.value.a < 1) {
          this.color.value.a = Math.round((this.color.value.a + 0.01) * 100) / 100;
        }
        this.update(true);
      } else if ((e.keyCode === 40)) {
        if (this.color.value.a > 0) {
          this.color.value.a = Math.round((this.color.value.a - 0.01) * 100) / 100;
        }
        this.update(true);
      } else {
        this.color = new Color(this.input.val(), this.options.colorSelectors);
        // Change format dynamically
        // Only occurs if user choose the dynamic format by
        // setting option format to false
        if (this.color.origFormat && this.options.format === false) {
          this.format = this.color.origFormat;
        }
        if (this.getValue(false) !== false) {
          this.updateData();
          this.updateComponent();
          this.updatePicker();
        }
      }
      this.element.trigger({
        type: 'changeColor',
        color: this.color,
        value: this.input.val()
      });
    }
  };

  $.colorpicker = Colorpicker;

  $.fn.colorpicker = function(option) {
    var apiArgs = Array.prototype.slice.call(arguments, 1),
      isSingleElement = (this.length === 1),
      returnValue = null;

    var $jq = this.each(function() {
      var $this = $(this),
        inst = $this.data('colorpicker'),
        options = ((typeof option === 'object') ? option : {});

      if (!inst) {
        inst = new Colorpicker(this, options);
        $this.data('colorpicker', inst);
      }

      if (typeof option === 'string') {
        if ($.isFunction(inst[option])) {
          returnValue = inst[option].apply(inst, apiArgs);
        } else { // its a property ?
          if (apiArgs.length) {
            // set property
            inst[option] = apiArgs[0];
          }
          returnValue = inst[option];
        }
      } else {
        returnValue = $this;
      }
    });
    return isSingleElement ? returnValue : $jq;
  };

  $.fn.colorpicker.constructor = Colorpicker;

}));

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(23)))

/***/ },

/***/ 748:
/***/ function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(jQuery) {var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/* ===================================================
 * bootstrap-markdown.js v2.10.0
 * http://github.com/toopay/bootstrap-markdown
 * ===================================================
 * Copyright 2013-2016 Taufan Aditya
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ========================================================== */

(function(factory){
    if (true) {
        //RequireJS
        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(23)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    } else if (typeof exports === 'object') {
        //Backbone.js
        factory(require('jquery'));
    } else {
        //Jquery plugin
        factory(jQuery);
    }
}(function($){
  "use strict"; // jshint ;_;

  /* MARKDOWN CLASS DEFINITION
   * ========================== */

  var Markdown = function (element, options) {
    // @TODO : remove this BC on next major release
    // @see : https://github.com/toopay/bootstrap-markdown/issues/109
    var opts = ['autofocus', 'savable', 'hideable', 'width', 
      'height', 'resize', 'iconlibrary', 'language', 
      'footer', 'fullscreen', 'hiddenButtons', 'disabledButtons'];
    $.each(opts,function(_, opt){
      if (typeof $(element).data(opt) !== 'undefined') {
        options = typeof options == 'object' ? options : {}
        options[opt] = $(element).data(opt)
      }
    });
    // End BC

    // Class Properties
    this.$ns           = 'bootstrap-markdown';
    this.$element      = $(element);
    this.$editable     = {el:null, type:null,attrKeys:[], attrValues:[], content:null};
    this.$options      = $.extend(true, {}, $.fn.markdown.defaults, options, this.$element.data('options'));
    this.$oldContent   = null;
    this.$isPreview    = false;
    this.$isFullscreen = false;
    this.$editor       = null;
    this.$textarea     = null;
    this.$handler      = [];
    this.$callback     = [];
    this.$nextTab      = [];

    this.showEditor();
  };

  Markdown.prototype = {

    constructor: Markdown

  , __alterButtons: function(name,alter) {
      var handler = this.$handler, isAll = (name == 'all'),that = this;

      $.each(handler,function(k,v) {
        var halt = true;
        if (isAll) {
          halt = false;
        } else {
          halt = v.indexOf(name) < 0;
        }

        if (halt === false) {
          alter(that.$editor.find('button[data-handler="'+v+'"]'));
        }
      });
    }

  , __buildButtons: function(buttonsArray, container) {
      var i,
          ns = this.$ns,
          handler = this.$handler,
          callback = this.$callback;

      for (i=0;i<buttonsArray.length;i++) {
        // Build each group container
        var y, btnGroups = buttonsArray[i];
        for (y=0;y<btnGroups.length;y++) {
          // Build each button group
          var z,
              buttons = btnGroups[y].data,
              btnGroupContainer = $('<div/>', {
                                    'class': 'btn-group'
                                  });

          for (z=0;z<buttons.length;z++) {
            var button = buttons[z],
                buttonContainer, buttonIconContainer,
                buttonHandler = ns+'-'+button.name,
                buttonIcon = this.__getIcon(button.icon),
                btnText = button.btnText ? button.btnText : '',
                btnClass = button.btnClass ? button.btnClass : 'btn',
                tabIndex = button.tabIndex ? button.tabIndex : '-1',
                hotkey = typeof button.hotkey !== 'undefined' ? button.hotkey : '',
                hotkeyCaption = typeof jQuery.hotkeys !== 'undefined' && hotkey !== '' ? ' ('+hotkey+')' : '';

            // Construct the button object
            buttonContainer = $('<button></button>');
            buttonContainer.text(' ' + this.__localize(btnText)).addClass('btn-default btn-sm').addClass(btnClass);
            if(btnClass.match(/btn\-(primary|success|info|warning|danger|link)/)){
                buttonContainer.removeClass('btn-default');
            }
            buttonContainer.attr({
                'type': 'button',
                'title': this.__localize(button.title) + hotkeyCaption,
                'tabindex': tabIndex,
                'data-provider': ns,
                'data-handler': buttonHandler,
                'data-hotkey': hotkey
            });
            if (button.toggle === true){
              buttonContainer.attr('data-toggle', 'button');
            }
            buttonIconContainer = $('<span/>');
            buttonIconContainer.addClass(buttonIcon);
            buttonIconContainer.prependTo(buttonContainer);

            // Attach the button object
            btnGroupContainer.append(buttonContainer);

            // Register handler and callback
            handler.push(buttonHandler);
            callback.push(button.callback);
          }

          // Attach the button group into container dom
          container.append(btnGroupContainer);
        }
      }

      return container;
    }
  , __setListener: function() {
      // Set size and resizable Properties
      var hasRows = typeof this.$textarea.attr('rows') !== 'undefined',
          maxRows = this.$textarea.val().split("\n").length > 5 ? this.$textarea.val().split("\n").length : '5',
          rowsVal = hasRows ? this.$textarea.attr('rows') : maxRows;

      this.$textarea.attr('rows',rowsVal);
      if (this.$options.resize) {
        this.$textarea.css('resize',this.$options.resize);
      }

      this.$textarea.on({
          'focus' : $.proxy(this.focus, this),
          'keyup' : $.proxy(this.keyup, this),
          'change' : $.proxy(this.change, this),
          'select' : $.proxy(this.select, this)
      });

      if (this.eventSupported('keydown')) {
        this.$textarea.on('keydown', $.proxy(this.keydown, this));
      }

      if (this.eventSupported('keypress')) {
        this.$textarea.on('keypress', $.proxy(this.keypress, this))
      }

      // Re-attach markdown data
      this.$textarea.data('markdown',this);
    }

  , __handle: function(e) {
      var target = $(e.currentTarget),
          handler = this.$handler,
          callback = this.$callback,
          handlerName = target.attr('data-handler'),
          callbackIndex = handler.indexOf(handlerName),
          callbackHandler = callback[callbackIndex];

      // Trigger the focusin
      $(e.currentTarget).focus();

      callbackHandler(this);

      // Trigger onChange for each button handle
      this.change(this);

      // Unless it was the save handler,
      // focusin the textarea
      if (handlerName.indexOf('cmdSave') < 0) {
        this.$textarea.focus();
      }

      e.preventDefault();
    }

  , __localize: function(string) {
      var messages = $.fn.markdown.messages,
          language = this.$options.language;
      if (
        typeof messages !== 'undefined' &&
        typeof messages[language] !== 'undefined' &&
        typeof messages[language][string] !== 'undefined'
      ) {
        return messages[language][string];
      }
      return string;
    }

  , __getIcon: function(src) {
    return typeof src == 'object' ? src[this.$options.iconlibrary] : src;
  }

  , setFullscreen: function(mode) {
    var $editor = this.$editor,
        $textarea = this.$textarea;

    if (mode === true) {
      $editor.addClass('md-fullscreen-mode');
      $('body').addClass('md-nooverflow');
      this.$options.onFullscreen(this);
    } else {
      $editor.removeClass('md-fullscreen-mode');
      $('body').removeClass('md-nooverflow');

      if (this.$isPreview == true) this.hidePreview().showPreview()
    }

    this.$isFullscreen = mode;
    $textarea.focus();
  }

  , showEditor: function() {
      var instance = this,
          textarea,
          ns = this.$ns,
          container = this.$element,
          originalHeigth = container.css('height'),
          originalWidth = container.css('width'),
          editable = this.$editable,
          handler = this.$handler,
          callback = this.$callback,
          options = this.$options,
          editor = $( '<div/>', {
                      'class': 'md-editor',
                      click: function() {
                        instance.focus();
                      }
                    });

      // Prepare the editor
      if (this.$editor === null) {
        // Create the panel
        var editorHeader = $('<div/>', {
                            'class': 'md-header btn-toolbar'
                            });

        // Merge the main & additional button groups together
        var allBtnGroups = [];
        if (options.buttons.length > 0) allBtnGroups = allBtnGroups.concat(options.buttons[0]);
        if (options.additionalButtons.length > 0) {
          // iterate the additional button groups
          $.each(options.additionalButtons[0], function(idx, buttonGroup){
            
            // see if the group name of the addional group matches an existing group
            var matchingGroups = $.grep(allBtnGroups, function(allButtonGroup, allIdx){
              return allButtonGroup.name === buttonGroup.name;
            });

            // if it matches add the addional buttons to that group, if not just add it to the all buttons group
            if(matchingGroups.length > 0) {
              matchingGroups[0].data = matchingGroups[0].data.concat(buttonGroup.data);
            } else {              
              allBtnGroups.push(options.additionalButtons[0][idx]);
            }

          });
        } 

        // Reduce and/or reorder the button groups
        if (options.reorderButtonGroups.length > 0) {
          allBtnGroups = allBtnGroups
              .filter(function(btnGroup) {
                return options.reorderButtonGroups.indexOf(btnGroup.name) > -1;
              })
              .sort(function(a, b) {
                if (options.reorderButtonGroups.indexOf(a.name) < options.reorderButtonGroups.indexOf(b.name)) return -1;
                if (options.reorderButtonGroups.indexOf(a.name) > options.reorderButtonGroups.indexOf(b.name)) return 1;
                return 0;
              });
        }

        // Build the buttons
        if (allBtnGroups.length > 0) {
          editorHeader = this.__buildButtons([allBtnGroups], editorHeader);
        }

        if (options.fullscreen.enable) {
          editorHeader.append('<div class="md-controls"><a class="md-control md-control-fullscreen" href="#"><span class="'+this.__getIcon(options.fullscreen.icons.fullscreenOn)+'"></span></a></div>').on('click', '.md-control-fullscreen', function(e) {
              e.preventDefault();
              instance.setFullscreen(true);
          });
        }

        editor.append(editorHeader);

        // Wrap the textarea
        if (container.is('textarea')) {
          container.before(editor);
          textarea = container;
          textarea.addClass('md-input');
          editor.append(textarea);
        } else {
          var rawContent = (typeof toMarkdown == 'function') ? toMarkdown(container.html()) : container.html(),
              currentContent = $.trim(rawContent);

          // This is some arbitrary content that could be edited
          textarea = $('<textarea/>', {
                       'class': 'md-input',
                       'val' : currentContent
                      });

          editor.append(textarea);

          // Save the editable
          editable.el = container;
          editable.type = container.prop('tagName').toLowerCase();
          editable.content = container.html();

          $(container[0].attributes).each(function(){
            editable.attrKeys.push(this.nodeName);
            editable.attrValues.push(this.nodeValue);
          });

          // Set editor to blocked the original container
          container.replaceWith(editor);
        }

        var editorFooter = $('<div/>', {
                           'class': 'md-footer'
                         }),
            createFooter = false,
            footer = '';
        // Create the footer if savable
        if (options.savable) {
          createFooter = true;
          var saveHandler = 'cmdSave';

          // Register handler and callback
          handler.push(saveHandler);
          callback.push(options.onSave);

          editorFooter.append('<button class="btn btn-success" data-provider="'
                              + ns
                              + '" data-handler="'
                              + saveHandler
                              + '"><i class="icon icon-white icon-ok"></i> '
                              + this.__localize('Save')
                              + '</button>');


        }

        footer = typeof options.footer === 'function' ? options.footer(this) : options.footer;

        if ($.trim(footer) !== '') {
          createFooter = true;
          editorFooter.append(footer);
        }

        if (createFooter) editor.append(editorFooter);

        // Set width
        if (options.width && options.width !== 'inherit') {
          if (jQuery.isNumeric(options.width)) {
            editor.css('display', 'table');
            textarea.css('width', options.width + 'px');
          } else {
            editor.addClass(options.width);
          }
        }

        // Set height
        if (options.height && options.height !== 'inherit') {
          if (jQuery.isNumeric(options.height)) {
            var height = options.height;
            if (editorHeader) height = Math.max(0, height - editorHeader.outerHeight());
            if (editorFooter) height = Math.max(0, height - editorFooter.outerHeight());
            textarea.css('height', height + 'px');
          } else {
            editor.addClass(options.height);
          }
        }

        // Reference
        this.$editor     = editor;
        this.$textarea   = textarea;
        this.$editable   = editable;
        this.$oldContent = this.getContent();

        this.__setListener();

        // Set editor attributes, data short-hand API and listener
        this.$editor.attr('id',(new Date()).getTime());
        this.$editor.on('click', '[data-provider="bootstrap-markdown"]', $.proxy(this.__handle, this));

        if (this.$element.is(':disabled') || this.$element.is('[readonly]')) {
          this.$editor.addClass('md-editor-disabled');
          this.disableButtons('all');
        }

        if (this.eventSupported('keydown') && typeof jQuery.hotkeys === 'object') {
          editorHeader.find('[data-provider="bootstrap-markdown"]').each(function() {
            var $button = $(this),
                hotkey = $button.attr('data-hotkey');
            if (hotkey.toLowerCase() !== '') {
              textarea.bind('keydown', hotkey, function() {
                $button.trigger('click');
                return false;
              });
            }
          });
        }

        if (options.initialstate === 'preview') {
          this.showPreview();
        } else if (options.initialstate === 'fullscreen' && options.fullscreen.enable) {
          this.setFullscreen(true);
        }

      } else {
        this.$editor.show();
      }

      if (options.autofocus) {
        this.$textarea.focus();
        this.$editor.addClass('active');
      }

      if (options.fullscreen.enable && options.fullscreen !== false) {
        this.$editor.append('<div class="md-fullscreen-controls">'
                        + '<a href="#" class="exit-fullscreen" title="Exit fullscreen"><span class="' + this.__getIcon(options.fullscreen.icons.fullscreenOff) + '">'
                        + '</span></a>'
                        + '</div>');
        this.$editor.on('click', '.exit-fullscreen', function(e) {
          e.preventDefault();
          instance.setFullscreen(false);
        });
      }

      // hide hidden buttons from options
      this.hideButtons(options.hiddenButtons);

      // disable disabled buttons from options
      this.disableButtons(options.disabledButtons);

      // Trigger the onShow hook
      options.onShow(this);

      return this;
    }

  , parseContent: function(val) {
      var content;

      // parse with supported markdown parser
      var val = val || this.$textarea.val();

      if (this.$options.parser) {
        content = this.$options.parser(val);
      } else if (typeof markdown == 'object') {
        content = markdown.toHTML(val);
      } else if (typeof marked == 'function') {
        content = marked(val);
      } else {
        content = val;
      }

      return content;
    }

  , showPreview: function() {
      var options = this.$options,
          container = this.$textarea,
          afterContainer = container.next(),
          replacementContainer = $('<div/>',{'class':'md-preview','data-provider':'markdown-preview'}),
          content,
          callbackContent;

      if (this.$isPreview == true) {
        // Avoid sequenced element creation on missused scenario
        // @see https://github.com/toopay/bootstrap-markdown/issues/170
        return this;
      }
      
      // Give flag that tell the editor enter preview mode
      this.$isPreview = true;
      // Disable all buttons
      this.disableButtons('all').enableButtons('cmdPreview');

      // Try to get the content from callback
      callbackContent = options.onPreview(this);
      // Set the content based from the callback content if string otherwise parse value from textarea
      content = typeof callbackContent == 'string' ? callbackContent : this.parseContent();

      // Build preview element
      replacementContainer.html(content);

      if (afterContainer && afterContainer.attr('class') == 'md-footer') {
        // If there is footer element, insert the preview container before it
        replacementContainer.insertBefore(afterContainer);
      } else {
        // Otherwise, just append it after textarea
        container.parent().append(replacementContainer);
      }

      // Set the preview element dimensions
      replacementContainer.css({
        width: container.outerWidth() + 'px',
        height: container.outerHeight() + 'px'
      });

      if (this.$options.resize) {
        replacementContainer.css('resize',this.$options.resize);
      }

      // Hide the last-active textarea
      container.hide();

      // Attach the editor instances
      replacementContainer.data('markdown',this);

      if (this.$element.is(':disabled') || this.$element.is('[readonly]')) {
        this.$editor.addClass('md-editor-disabled');
        this.disableButtons('all');
      }

      return this;
    }

  , hidePreview: function() {
      // Give flag that tell the editor quit preview mode
      this.$isPreview = false;

      // Obtain the preview container
      var container = this.$editor.find('div[data-provider="markdown-preview"]');

      // Remove the preview container
      container.remove();

      // Enable all buttons
      this.enableButtons('all');
      // Disable configured disabled buttons
      this.disableButtons(this.$options.disabledButtons);

      // Back to the editor
      this.$textarea.show();
      this.__setListener();

      return this;
    }

  , isDirty: function() {
      return this.$oldContent != this.getContent();
    }

  , getContent: function() {
      return this.$textarea.val();
    }

  , setContent: function(content) {
      this.$textarea.val(content);

      return this;
    }

  , findSelection: function(chunk) {
    var content = this.getContent(), startChunkPosition;

    if (startChunkPosition = content.indexOf(chunk), startChunkPosition >= 0 && chunk.length > 0) {
      var oldSelection = this.getSelection(), selection;

      this.setSelection(startChunkPosition,startChunkPosition+chunk.length);
      selection = this.getSelection();

      this.setSelection(oldSelection.start,oldSelection.end);

      return selection;
    } else {
      return null;
    }
  }

  , getSelection: function() {

      var e = this.$textarea[0];

      return (

          ('selectionStart' in e && function() {
              var l = e.selectionEnd - e.selectionStart;
              return { start: e.selectionStart, end: e.selectionEnd, length: l, text: e.value.substr(e.selectionStart, l) };
          }) ||

          /* browser not supported */
          function() {
            return null;
          }

      )();

    }

  , setSelection: function(start,end) {

      var e = this.$textarea[0];

      return (

          ('selectionStart' in e && function() {
              e.selectionStart = start;
              e.selectionEnd = end;
              return;
          }) ||

          /* browser not supported */
          function() {
            return null;
          }

      )();

    }

  , replaceSelection: function(text) {

      var e = this.$textarea[0];

      return (

          ('selectionStart' in e && function() {
              e.value = e.value.substr(0, e.selectionStart) + text + e.value.substr(e.selectionEnd, e.value.length);
              // Set cursor to the last replacement end
              e.selectionStart = e.value.length;
              return this;
          }) ||

          /* browser not supported */
          function() {
              e.value += text;
              return jQuery(e);
          }

      )();
    }

  , getNextTab: function() {
      // Shift the nextTab
      if (this.$nextTab.length === 0) {
        return null;
      } else {
        var nextTab, tab = this.$nextTab.shift();

        if (typeof tab == 'function') {
          nextTab = tab();
        } else if (typeof tab == 'object' && tab.length > 0) {
          nextTab = tab;
        }

        return nextTab;
      }
    }

  , setNextTab: function(start,end) {
      // Push new selection into nextTab collections
      if (typeof start == 'string') {
        var that = this;
        this.$nextTab.push(function(){
          return that.findSelection(start);
        });
      } else if (typeof start == 'number' && typeof end == 'number') {
        var oldSelection = this.getSelection();

        this.setSelection(start,end);
        this.$nextTab.push(this.getSelection());

        this.setSelection(oldSelection.start,oldSelection.end);
      }

      return;
    }

  , __parseButtonNameParam: function (names) {
      return typeof names == 'string' ?
                      names.split(' ') :
                      names;

    }

  , enableButtons: function(name) {
      var buttons = this.__parseButtonNameParam(name),
        that = this;

      $.each(buttons, function(i, v) {
        that.__alterButtons(buttons[i], function (el) {
          el.removeAttr('disabled');
        });
      });

      return this;
    }

  , disableButtons: function(name) {
      var buttons = this.__parseButtonNameParam(name),
        that = this;

      $.each(buttons, function(i, v) {
        that.__alterButtons(buttons[i], function (el) {
          el.attr('disabled','disabled');
        });
      });

      return this;
    }

  , hideButtons: function(name) {
      var buttons = this.__parseButtonNameParam(name),
        that = this;

      $.each(buttons, function(i, v) {
        that.__alterButtons(buttons[i], function (el) {
          el.addClass('hidden');
        });
      });

      return this;
    }

  , showButtons: function(name) {
      var buttons = this.__parseButtonNameParam(name),
        that = this;

      $.each(buttons, function(i, v) {
        that.__alterButtons(buttons[i], function (el) {
          el.removeClass('hidden');
        });
      });

      return this;
    }

  , eventSupported: function(eventName) {
      var isSupported = eventName in this.$element;
      if (!isSupported) {
        this.$element.setAttribute(eventName, 'return;');
        isSupported = typeof this.$element[eventName] === 'function';
      }
      return isSupported;
    }

  , keyup: function (e) {
      var blocked = false;
      switch(e.keyCode) {
        case 40: // down arrow
        case 38: // up arrow
        case 16: // shift
        case 17: // ctrl
        case 18: // alt
          break;

        case 9: // tab
          var nextTab;
          if (nextTab = this.getNextTab(),nextTab !== null) {
            // Get the nextTab if exists
            var that = this;
            setTimeout(function(){
              that.setSelection(nextTab.start,nextTab.end);
            },500);

            blocked = true;
          } else {
            // The next tab memory contains nothing...
            // check the cursor position to determine tab action
            var cursor = this.getSelection();

            if (cursor.start == cursor.end && cursor.end == this.getContent().length) {
              // The cursor already reach the end of the content
              blocked = false;
            } else {
              // Put the cursor to the end
              this.setSelection(this.getContent().length,this.getContent().length);

              blocked = true;
            }
          }

          break;

        case 13: // enter
          blocked = false;
          break;
        case 27: // escape
          if (this.$isFullscreen) this.setFullscreen(false);
          blocked = false;
          break;

        default:
          blocked = false;
      }

      if (blocked) {
        e.stopPropagation();
        e.preventDefault();
      }

      this.$options.onChange(this);
    }

  , change: function(e) {
      this.$options.onChange(this);
      return this;
    }
  , select: function (e) {
      this.$options.onSelect(this);
      return this;
    }
  , focus: function (e) {
      var options = this.$options,
          isHideable = options.hideable,
          editor = this.$editor;

      editor.addClass('active');

      // Blur other markdown(s)
      $(document).find('.md-editor').each(function(){
        if ($(this).attr('id') !== editor.attr('id')) {
          var attachedMarkdown;

          if (attachedMarkdown = $(this).find('textarea').data('markdown'),
              attachedMarkdown === null) {
              attachedMarkdown = $(this).find('div[data-provider="markdown-preview"]').data('markdown');
          }

          if (attachedMarkdown) {
            attachedMarkdown.blur();
          }
        }
      });

      // Trigger the onFocus hook
      options.onFocus(this);

      return this;
    }

  , blur: function (e) {
      var options = this.$options,
          isHideable = options.hideable,
          editor = this.$editor,
          editable = this.$editable;

      if (editor.hasClass('active') || this.$element.parent().length === 0) {
        editor.removeClass('active');

        if (isHideable) {
          // Check for editable elements
          if (editable.el !== null) {
            // Build the original element
            var oldElement = $('<'+editable.type+'/>'),
                content = this.getContent(),
                currentContent = this.parseContent(content);

            $(editable.attrKeys).each(function(k,v) {
              oldElement.attr(editable.attrKeys[k],editable.attrValues[k]);
            });

            // Get the editor content
            oldElement.html(currentContent);

            editor.replaceWith(oldElement);
          } else {
            editor.hide();
          }
        }

        // Trigger the onBlur hook
        options.onBlur(this);
      }

      return this;
    }

  };

 /* MARKDOWN PLUGIN DEFINITION
  * ========================== */

  var old = $.fn.markdown;

  $.fn.markdown = function (option) {
    return this.each(function () {
      var $this = $(this)
        , data = $this.data('markdown')
        , options = typeof option == 'object' && option;
      if (!data) $this.data('markdown', (data = new Markdown(this, options)))
    })
  };

  $.fn.markdown.messages = {};

  $.fn.markdown.defaults = {
    /* Editor Properties */
    autofocus: false,
    hideable: false,
    savable: false,
    width: 'inherit',
    height: 'inherit',
    resize: 'none',
    iconlibrary: 'glyph',
    language: 'en',
    initialstate: 'editor',
    parser: null,

    /* Buttons Properties */
    buttons: [
      [{
        name: 'groupFont',
        data: [{
          name: 'cmdBold',
          hotkey: 'Ctrl+B',
          title: 'Bold',
          icon: { glyph: 'glyphicon glyphicon-bold', fa: 'fa fa-bold', 'fa-3': 'icon-bold' },
          callback: function(e){
            // Give/remove ** surround the selection
            var chunk, cursor, selected = e.getSelection(), content = e.getContent();

            if (selected.length === 0) {
              // Give extra word
              chunk = e.__localize('strong text');
            } else {
              chunk = selected.text;
            }

            // transform selection and set the cursor into chunked text
            if (content.substr(selected.start-2,2) === '**'
                && content.substr(selected.end,2) === '**' ) {
              e.setSelection(selected.start-2,selected.end+2);
              e.replaceSelection(chunk);
              cursor = selected.start-2;
            } else {
              e.replaceSelection('**'+chunk+'**');
              cursor = selected.start+2;
            }

            // Set the cursor
            e.setSelection(cursor,cursor+chunk.length);
          }
        },{
          name: 'cmdItalic',
          title: 'Italic',
          hotkey: 'Ctrl+I',
          icon: { glyph: 'glyphicon glyphicon-italic', fa: 'fa fa-italic', 'fa-3': 'icon-italic' },
          callback: function(e){
            // Give/remove * surround the selection
            var chunk, cursor, selected = e.getSelection(), content = e.getContent();

            if (selected.length === 0) {
              // Give extra word
              chunk = e.__localize('emphasized text');
            } else {
              chunk = selected.text;
            }

            // transform selection and set the cursor into chunked text
            if (content.substr(selected.start-1,1) === '_'
                && content.substr(selected.end,1) === '_' ) {
              e.setSelection(selected.start-1,selected.end+1);
              e.replaceSelection(chunk);
              cursor = selected.start-1;
            } else {
              e.replaceSelection('_'+chunk+'_');
              cursor = selected.start+1;
            }

            // Set the cursor
            e.setSelection(cursor,cursor+chunk.length);
          }
        },{
          name: 'cmdHeading',
          title: 'Heading',
          hotkey: 'Ctrl+H',
          icon: { glyph: 'glyphicon glyphicon-header', fa: 'fa fa-header', 'fa-3': 'icon-font' },
          callback: function(e){
            // Append/remove ### surround the selection
            var chunk, cursor, selected = e.getSelection(), content = e.getContent(), pointer, prevChar;

            if (selected.length === 0) {
              // Give extra word
              chunk = e.__localize('heading text');
            } else {
              chunk = selected.text + '\n';
            }

            // transform selection and set the cursor into chunked text
            if ((pointer = 4, content.substr(selected.start-pointer,pointer) === '### ')
                || (pointer = 3, content.substr(selected.start-pointer,pointer) === '###')) {
              e.setSelection(selected.start-pointer,selected.end);
              e.replaceSelection(chunk);
              cursor = selected.start-pointer;
            } else if (selected.start > 0 && (prevChar = content.substr(selected.start-1,1), !!prevChar && prevChar != '\n')) {
              e.replaceSelection('\n\n### '+chunk);
              cursor = selected.start+6;
            } else {
              // Empty string before element
              e.replaceSelection('### '+chunk);
              cursor = selected.start+4;
            }

            // Set the cursor
            e.setSelection(cursor,cursor+chunk.length);
          }
        }]
      },{
        name: 'groupLink',
        data: [{
          name: 'cmdUrl',
          title: 'URL/Link',
          hotkey: 'Ctrl+L',
          icon: { glyph: 'glyphicon glyphicon-link', fa: 'fa fa-link', 'fa-3': 'icon-link' },
          callback: function(e){
            // Give [] surround the selection and prepend the link
            var chunk, cursor, selected = e.getSelection(), content = e.getContent(), link;

            if (selected.length === 0) {
              // Give extra word
              chunk = e.__localize('enter link description here');
            } else {
              chunk = selected.text;
            }

            link = prompt(e.__localize('Insert Hyperlink'),'http://');

            var urlRegex = new RegExp('^((http|https)://|(mailto:)|(//))[a-z0-9]', 'i');
            if (link !== null && link !== '' && link !== 'http://' && urlRegex.test(link)) {
              var sanitizedLink = $('<div>'+link+'</div>').text();

              // transform selection and set the cursor into chunked text
              e.replaceSelection('['+chunk+']('+sanitizedLink+')');
              cursor = selected.start+1;

              // Set the cursor
              e.setSelection(cursor,cursor+chunk.length);
            }
          }
        },{
          name: 'cmdImage',
          title: 'Image',
          hotkey: 'Ctrl+G',
          icon: { glyph: 'glyphicon glyphicon-picture', fa: 'fa fa-picture-o', 'fa-3': 'icon-picture' },
          callback: function(e){
            // Give ![] surround the selection and prepend the image link
            var chunk, cursor, selected = e.getSelection(), content = e.getContent(), link;

            if (selected.length === 0) {
              // Give extra word
              chunk = e.__localize('enter image description here');
            } else {
              chunk = selected.text;
            }

            link = prompt(e.__localize('Insert Image Hyperlink'),'http://');

            var urlRegex = new RegExp('^((http|https)://|(//))[a-z0-9]', 'i');
            if (link !== null && link !== '' && link !== 'http://' && urlRegex.test(link)) {
              var sanitizedLink = $('<div>'+link+'</div>').text();

              // transform selection and set the cursor into chunked text
              e.replaceSelection('!['+chunk+']('+sanitizedLink+' "'+e.__localize('enter image title here')+'")');
              cursor = selected.start+2;

              // Set the next tab
              e.setNextTab(e.__localize('enter image title here'));

              // Set the cursor
              e.setSelection(cursor,cursor+chunk.length);
            }
          }
        }]
      },{
        name: 'groupMisc',
        data: [{
          name: 'cmdList',
          hotkey: 'Ctrl+U',
          title: 'Unordered List',
          icon: { glyph: 'glyphicon glyphicon-list', fa: 'fa fa-list', 'fa-3': 'icon-list-ul' },
          callback: function(e){
            // Prepend/Give - surround the selection
            var chunk, cursor, selected = e.getSelection(), content = e.getContent();

            // transform selection and set the cursor into chunked text
            if (selected.length === 0) {
              // Give extra word
              chunk = e.__localize('list text here');

              e.replaceSelection('- '+chunk);
              // Set the cursor
              cursor = selected.start+2;
            } else {
              if (selected.text.indexOf('\n') < 0) {
                chunk = selected.text;

                e.replaceSelection('- '+chunk);

                // Set the cursor
                cursor = selected.start+2;
              } else {
                var list = [];

                list = selected.text.split('\n');
                chunk = list[0];

                $.each(list,function(k,v) {
                  list[k] = '- '+v;
                });

                e.replaceSelection('\n\n'+list.join('\n'));

                // Set the cursor
                cursor = selected.start+4;
              }
            }

            // Set the cursor
            e.setSelection(cursor,cursor+chunk.length);
          }
        },
        {
          name: 'cmdListO',
          hotkey: 'Ctrl+O',
          title: 'Ordered List',
          icon: { glyph: 'glyphicon glyphicon-th-list', fa: 'fa fa-list-ol', 'fa-3': 'icon-list-ol' },
          callback: function(e) {

            // Prepend/Give - surround the selection
            var chunk, cursor, selected = e.getSelection(), content = e.getContent();

            // transform selection and set the cursor into chunked text
            if (selected.length === 0) {
              // Give extra word
              chunk = e.__localize('list text here');
              e.replaceSelection('1. '+chunk);
              // Set the cursor
              cursor = selected.start+3;
            } else {
              if (selected.text.indexOf('\n') < 0) {
                chunk = selected.text;

                e.replaceSelection('1. '+chunk);

                // Set the cursor
                cursor = selected.start+3;
              } else {
                var list = [];

                list = selected.text.split('\n');
                chunk = list[0];

                $.each(list,function(k,v) {
                  list[k] = '1. '+v;
                });

                e.replaceSelection('\n\n'+list.join('\n'));

                // Set the cursor
                cursor = selected.start+5;
              }
            }

            // Set the cursor
            e.setSelection(cursor,cursor+chunk.length);
          }
        },
        {
          name: 'cmdCode',
          hotkey: 'Ctrl+K',
          title: 'Code',
          icon: { glyph: 'glyphicon glyphicon-asterisk', fa: 'fa fa-code', 'fa-3': 'icon-code' },
          callback: function(e) {
            // Give/remove ** surround the selection
            var chunk, cursor, selected = e.getSelection(), content = e.getContent();

            if (selected.length === 0) {
              // Give extra word
              chunk = e.__localize('code text here');
            } else {
              chunk = selected.text;
            }

            // transform selection and set the cursor into chunked text
            if (content.substr(selected.start-4,4) === '```\n'
                && content.substr(selected.end,4) === '\n```') {
              e.setSelection(selected.start-4, selected.end+4);
              e.replaceSelection(chunk);
              cursor = selected.start-4;
            } else if (content.substr(selected.start-1,1) === '`'
                && content.substr(selected.end,1) === '`') {
              e.setSelection(selected.start-1,selected.end+1);
              e.replaceSelection(chunk);
              cursor = selected.start-1;
            } else if (content.indexOf('\n') > -1) {
              e.replaceSelection('```\n'+chunk+'\n```');
              cursor = selected.start+4;
            } else {
              e.replaceSelection('`'+chunk+'`');
              cursor = selected.start+1;
            }

            // Set the cursor
            e.setSelection(cursor,cursor+chunk.length);
          }
        },
        {
          name: 'cmdQuote',
          hotkey: 'Ctrl+Q',
          title: 'Quote',
          icon: { glyph: 'glyphicon glyphicon-comment', fa: 'fa fa-quote-left', 'fa-3': 'icon-quote-left' },
          callback: function(e) {
            // Prepend/Give - surround the selection
            var chunk, cursor, selected = e.getSelection(), content = e.getContent();

            // transform selection and set the cursor into chunked text
            if (selected.length === 0) {
              // Give extra word
              chunk = e.__localize('quote here');

              e.replaceSelection('> '+chunk);

              // Set the cursor
              cursor = selected.start+2;
            } else {
              if (selected.text.indexOf('\n') < 0) {
                chunk = selected.text;

                e.replaceSelection('> '+chunk);

                // Set the cursor
                cursor = selected.start+2;
              } else {
                var list = [];

                list = selected.text.split('\n');
                chunk = list[0];

                $.each(list,function(k,v) {
                  list[k] = '> '+v;
                });

                e.replaceSelection('\n\n'+list.join('\n'));

                // Set the cursor
                cursor = selected.start+4;
              }
            }

            // Set the cursor
            e.setSelection(cursor,cursor+chunk.length);
          }
        }]
      },{
        name: 'groupUtil',
        data: [{
          name: 'cmdPreview',
          toggle: true,
          hotkey: 'Ctrl+P',
          title: 'Preview',
          btnText: 'Preview',
          btnClass: 'btn btn-primary btn-sm',
          icon: { glyph: 'glyphicon glyphicon-search', fa: 'fa fa-search', 'fa-3': 'icon-search' },
          callback: function(e){
            // Check the preview mode and toggle based on this flag
            var isPreview = e.$isPreview,content;

            if (isPreview === false) {
              // Give flag that tell the editor enter preview mode
              e.showPreview();
            } else {
              e.hidePreview();
            }
          }
        }]
      }]
    ],
    additionalButtons:[], // Place to hook more buttons by code
    reorderButtonGroups:[],
    hiddenButtons:[], // Default hidden buttons
    disabledButtons:[], // Default disabled buttons
    footer: '',
    fullscreen: {
      enable: true,
      icons: {
        fullscreenOn: {
          fa: 'fa fa-expand',
          glyph: 'glyphicon glyphicon-fullscreen',
          'fa-3': 'icon-resize-full'
        },
        fullscreenOff: {
          fa: 'fa fa-compress',
          glyph: 'glyphicon glyphicon-fullscreen',
          'fa-3': 'icon-resize-small'
        }
      }
    },

    /* Events hook */
    onShow: function (e) {},
    onPreview: function (e) {},
    onSave: function (e) {},
    onBlur: function (e) {},
    onFocus: function (e) {},
    onChange: function(e) {},
    onFullscreen: function(e) {},
    onSelect: function (e) {}
  };

  $.fn.markdown.Constructor = Markdown;


 /* MARKDOWN NO CONFLICT
  * ==================== */

  $.fn.markdown.noConflict = function () {
    $.fn.markdown = old;
    return this;
  };

  /* MARKDOWN GLOBAL FUNCTION & DATA-API
  * ==================================== */
  var initMarkdown = function(el) {
    var $this = el;

    if ($this.data('markdown')) {
      $this.data('markdown').showEditor();
      return;
    }

    $this.markdown()
  };

  var blurNonFocused = function(e) {
    var $activeElement = $(document.activeElement);

    // Blur event
    $(document).find('.md-editor').each(function(){
      var $this            = $(this),
          focused          = $activeElement.closest('.md-editor')[0] === this,
          attachedMarkdown = $this.find('textarea').data('markdown') ||
                             $this.find('div[data-provider="markdown-preview"]').data('markdown');

      if (attachedMarkdown && !focused) {
        attachedMarkdown.blur();
      }
    })
  };

  $(document)
    .on('click.markdown.data-api', '[data-provide="markdown-editable"]', function (e) {
      initMarkdown($(this));
      e.preventDefault();
    })
    .on('click focusin', function (e) {
      blurNonFocused(e);
    })
    .ready(function(){
      $('textarea[data-provide="markdown"]').each(function(){
        initMarkdown($(this));
      })
    });

}));

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(23)))

/***/ },

/***/ 749:
/***/ function(module, exports, __webpack_require__) {

"use strict";
var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*! =======================================================
                      VERSION  9.2.0              
========================================================= */


function _typeof(obj) { return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj; }

/*! =========================================================
 * bootstrap-slider.js
 *
 * Maintainers:
 *		Kyle Kemp
 *			- Twitter: @seiyria
 *			- Github:  seiyria
 *		Rohit Kalkur
 *			- Twitter: @Rovolutionary
 *			- Github:  rovolution
 *
 * =========================================================
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ========================================================= */

/**
 * Bridget makes jQuery widgets
 * v1.0.1
 * MIT license
 */
var windowIsDefined = (typeof window === "undefined" ? "undefined" : _typeof(window)) === "object";

(function (factory) {
	if (true) {
		!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(23)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	} else if ((typeof module === "undefined" ? "undefined" : _typeof(module)) === "object" && module.exports) {
		var jQuery;
		try {
			jQuery = require("jquery");
		} catch (err) {
			jQuery = null;
		}
		module.exports = factory(jQuery);
	} else if (window) {
		window.Slider = factory(window.jQuery);
	}
})(function ($) {
	// Constants
	var NAMESPACE_MAIN = 'slider';
	var NAMESPACE_ALTERNATE = 'bootstrapSlider';

	// Polyfill console methods
	if (windowIsDefined && !window.console) {
		window.console = {};
	}
	if (windowIsDefined && !window.console.log) {
		window.console.log = function () {};
	}
	if (windowIsDefined && !window.console.warn) {
		window.console.warn = function () {};
	}

	// Reference to Slider constructor
	var Slider;

	(function ($) {

		'use strict';

		// -------------------------- utils -------------------------- //

		var slice = Array.prototype.slice;

		function noop() {}

		// -------------------------- definition -------------------------- //

		function defineBridget($) {

			// bail if no jQuery
			if (!$) {
				return;
			}

			// -------------------------- addOptionMethod -------------------------- //

			/**
    * adds option method -> $().plugin('option', {...})
    * @param {Function} PluginClass - constructor class
    */
			function addOptionMethod(PluginClass) {
				// don't overwrite original option method
				if (PluginClass.prototype.option) {
					return;
				}

				// option setter
				PluginClass.prototype.option = function (opts) {
					// bail out if not an object
					if (!$.isPlainObject(opts)) {
						return;
					}
					this.options = $.extend(true, this.options, opts);
				};
			}

			// -------------------------- plugin bridge -------------------------- //

			// helper function for logging errors
			// $.error breaks jQuery chaining
			var logError = typeof console === 'undefined' ? noop : function (message) {
				console.error(message);
			};

			/**
    * jQuery plugin bridge, access methods like $elem.plugin('method')
    * @param {String} namespace - plugin name
    * @param {Function} PluginClass - constructor class
    */
			function bridge(namespace, PluginClass) {
				// add to jQuery fn namespace
				$.fn[namespace] = function (options) {
					if (typeof options === 'string') {
						// call plugin method when first argument is a string
						// get arguments for method
						var args = slice.call(arguments, 1);

						for (var i = 0, len = this.length; i < len; i++) {
							var elem = this[i];
							var instance = $.data(elem, namespace);
							if (!instance) {
								logError("cannot call methods on " + namespace + " prior to initialization; " + "attempted to call '" + options + "'");
								continue;
							}
							if (!$.isFunction(instance[options]) || options.charAt(0) === '_') {
								logError("no such method '" + options + "' for " + namespace + " instance");
								continue;
							}

							// trigger method with arguments
							var returnValue = instance[options].apply(instance, args);

							// break look and return first value if provided
							if (returnValue !== undefined && returnValue !== instance) {
								return returnValue;
							}
						}
						// return this if no return value
						return this;
					} else {
						var objects = this.map(function () {
							var instance = $.data(this, namespace);
							if (instance) {
								// apply options & init
								instance.option(options);
								instance._init();
							} else {
								// initialize new instance
								instance = new PluginClass(this, options);
								$.data(this, namespace, instance);
							}
							return $(this);
						});

						if (!objects || objects.length > 1) {
							return objects;
						} else {
							return objects[0];
						}
					}
				};
			}

			// -------------------------- bridget -------------------------- //

			/**
    * converts a Prototypical class into a proper jQuery plugin
    *   the class must have a ._init method
    * @param {String} namespace - plugin name, used in $().pluginName
    * @param {Function} PluginClass - constructor class
    */
			$.bridget = function (namespace, PluginClass) {
				addOptionMethod(PluginClass);
				bridge(namespace, PluginClass);
			};

			return $.bridget;
		}

		// get jquery from browser global
		defineBridget($);
	})($);

	/*************************************************
 			BOOTSTRAP-SLIDER SOURCE CODE
 	**************************************************/

	(function ($) {

		var ErrorMsgs = {
			formatInvalidInputErrorMsg: function formatInvalidInputErrorMsg(input) {
				return "Invalid input value '" + input + "' passed in";
			},
			callingContextNotSliderInstance: "Calling context element does not have instance of Slider bound to it. Check your code to make sure the JQuery object returned from the call to the slider() initializer is calling the method"
		};

		var SliderScale = {
			linear: {
				toValue: function toValue(percentage) {
					var rawValue = percentage / 100 * (this.options.max - this.options.min);
					var shouldAdjustWithBase = true;
					if (this.options.ticks_positions.length > 0) {
						var minv,
						    maxv,
						    minp,
						    maxp = 0;
						for (var i = 1; i < this.options.ticks_positions.length; i++) {
							if (percentage <= this.options.ticks_positions[i]) {
								minv = this.options.ticks[i - 1];
								minp = this.options.ticks_positions[i - 1];
								maxv = this.options.ticks[i];
								maxp = this.options.ticks_positions[i];

								break;
							}
						}
						var partialPercentage = (percentage - minp) / (maxp - minp);
						rawValue = minv + partialPercentage * (maxv - minv);
						shouldAdjustWithBase = false;
					}

					var adjustment = shouldAdjustWithBase ? this.options.min : 0;
					var value = adjustment + Math.round(rawValue / this.options.step) * this.options.step;
					if (value < this.options.min) {
						return this.options.min;
					} else if (value > this.options.max) {
						return this.options.max;
					} else {
						return value;
					}
				},
				toPercentage: function toPercentage(value) {
					if (this.options.max === this.options.min) {
						return 0;
					}

					if (this.options.ticks_positions.length > 0) {
						var minv,
						    maxv,
						    minp,
						    maxp = 0;
						for (var i = 0; i < this.options.ticks.length; i++) {
							if (value <= this.options.ticks[i]) {
								minv = i > 0 ? this.options.ticks[i - 1] : 0;
								minp = i > 0 ? this.options.ticks_positions[i - 1] : 0;
								maxv = this.options.ticks[i];
								maxp = this.options.ticks_positions[i];

								break;
							}
						}
						if (i > 0) {
							var partialPercentage = (value - minv) / (maxv - minv);
							return minp + partialPercentage * (maxp - minp);
						}
					}

					return 100 * (value - this.options.min) / (this.options.max - this.options.min);
				}
			},

			logarithmic: {
				/* Based on http://stackoverflow.com/questions/846221/logarithmic-slider */
				toValue: function toValue(percentage) {
					var min = this.options.min === 0 ? 0 : Math.log(this.options.min);
					var max = Math.log(this.options.max);
					var value = Math.exp(min + (max - min) * percentage / 100);
					value = this.options.min + Math.round((value - this.options.min) / this.options.step) * this.options.step;
					/* Rounding to the nearest step could exceed the min or
      * max, so clip to those values. */
					if (value < this.options.min) {
						return this.options.min;
					} else if (value > this.options.max) {
						return this.options.max;
					} else {
						return value;
					}
				},
				toPercentage: function toPercentage(value) {
					if (this.options.max === this.options.min) {
						return 0;
					} else {
						var max = Math.log(this.options.max);
						var min = this.options.min === 0 ? 0 : Math.log(this.options.min);
						var v = value === 0 ? 0 : Math.log(value);
						return 100 * (v - min) / (max - min);
					}
				}
			}
		};

		/*************************************************
  						CONSTRUCTOR
  	**************************************************/
		Slider = function (element, options) {
			createNewSlider.call(this, element, options);
			return this;
		};

		function createNewSlider(element, options) {

			/*
   	The internal state object is used to store data about the current 'state' of slider.
   		This includes values such as the `value`, `enabled`, etc...
   */
			this._state = {
				value: null,
				enabled: null,
				offset: null,
				size: null,
				percentage: null,
				inDrag: false,
				over: false
			};

			if (typeof element === "string") {
				this.element = document.querySelector(element);
			} else if (element instanceof HTMLElement) {
				this.element = element;
			}

			/*************************************************
   					Process Options
   	**************************************************/
			options = options ? options : {};
			var optionTypes = Object.keys(this.defaultOptions);

			for (var i = 0; i < optionTypes.length; i++) {
				var optName = optionTypes[i];

				// First check if an option was passed in via the constructor
				var val = options[optName];
				// If no data attrib, then check data atrributes
				val = typeof val !== 'undefined' ? val : getDataAttrib(this.element, optName);
				// Finally, if nothing was specified, use the defaults
				val = val !== null ? val : this.defaultOptions[optName];

				// Set all options on the instance of the Slider
				if (!this.options) {
					this.options = {};
				}
				this.options[optName] = val;
			}

			/*
   	Validate `tooltip_position` against 'orientation`
   	- if `tooltip_position` is incompatible with orientation, swith it to a default compatible with specified `orientation`
   		-- default for "vertical" -> "right"
   		-- default for "horizontal" -> "left"
   */
			if (this.options.orientation === "vertical" && (this.options.tooltip_position === "top" || this.options.tooltip_position === "bottom")) {

				this.options.tooltip_position = "right";
			} else if (this.options.orientation === "horizontal" && (this.options.tooltip_position === "left" || this.options.tooltip_position === "right")) {

				this.options.tooltip_position = "top";
			}

			function getDataAttrib(element, optName) {
				var dataName = "data-slider-" + optName.replace(/_/g, '-');
				var dataValString = element.getAttribute(dataName);

				try {
					return JSON.parse(dataValString);
				} catch (err) {
					return dataValString;
				}
			}

			/*************************************************
   					Create Markup
   	**************************************************/

			var origWidth = this.element.style.width;
			var updateSlider = false;
			var parent = this.element.parentNode;
			var sliderTrackSelection;
			var sliderTrackLow, sliderTrackHigh;
			var sliderMinHandle;
			var sliderMaxHandle;

			if (this.sliderElem) {
				updateSlider = true;
			} else {
				/* Create elements needed for slider */
				this.sliderElem = document.createElement("div");
				this.sliderElem.className = "slider";

				/* Create slider track elements */
				var sliderTrack = document.createElement("div");
				sliderTrack.className = "slider-track";

				sliderTrackLow = document.createElement("div");
				sliderTrackLow.className = "slider-track-low";

				sliderTrackSelection = document.createElement("div");
				sliderTrackSelection.className = "slider-selection";

				sliderTrackHigh = document.createElement("div");
				sliderTrackHigh.className = "slider-track-high";

				sliderMinHandle = document.createElement("div");
				sliderMinHandle.className = "slider-handle min-slider-handle";
				sliderMinHandle.setAttribute('role', 'slider');
				sliderMinHandle.setAttribute('aria-valuemin', this.options.min);
				sliderMinHandle.setAttribute('aria-valuemax', this.options.max);

				sliderMaxHandle = document.createElement("div");
				sliderMaxHandle.className = "slider-handle max-slider-handle";
				sliderMaxHandle.setAttribute('role', 'slider');
				sliderMaxHandle.setAttribute('aria-valuemin', this.options.min);
				sliderMaxHandle.setAttribute('aria-valuemax', this.options.max);

				sliderTrack.appendChild(sliderTrackLow);
				sliderTrack.appendChild(sliderTrackSelection);
				sliderTrack.appendChild(sliderTrackHigh);

				/* Create highlight range elements */
				this.rangeHighlightElements = [];
				if (Array.isArray(this.options.rangeHighlights) && this.options.rangeHighlights.length > 0) {
					for (var j = 0; j < this.options.rangeHighlights.length; j++) {

						var rangeHighlightElement = document.createElement("div");
						rangeHighlightElement.className = "slider-rangeHighlight slider-selection";

						this.rangeHighlightElements.push(rangeHighlightElement);
						sliderTrack.appendChild(rangeHighlightElement);
					}
				}

				/* Add aria-labelledby to handle's */
				var isLabelledbyArray = Array.isArray(this.options.labelledby);
				if (isLabelledbyArray && this.options.labelledby[0]) {
					sliderMinHandle.setAttribute('aria-labelledby', this.options.labelledby[0]);
				}
				if (isLabelledbyArray && this.options.labelledby[1]) {
					sliderMaxHandle.setAttribute('aria-labelledby', this.options.labelledby[1]);
				}
				if (!isLabelledbyArray && this.options.labelledby) {
					sliderMinHandle.setAttribute('aria-labelledby', this.options.labelledby);
					sliderMaxHandle.setAttribute('aria-labelledby', this.options.labelledby);
				}

				/* Create ticks */
				this.ticks = [];
				if (Array.isArray(this.options.ticks) && this.options.ticks.length > 0) {
					this.ticksContainer = document.createElement('div');
					this.ticksContainer.className = 'slider-tick-container';

					for (i = 0; i < this.options.ticks.length; i++) {
						var tick = document.createElement('div');
						tick.className = 'slider-tick';
						this.ticks.push(tick);
						this.ticksContainer.appendChild(tick);
					}

					sliderTrackSelection.className += " tick-slider-selection";
				}

				this.tickLabels = [];
				if (Array.isArray(this.options.ticks_labels) && this.options.ticks_labels.length > 0) {
					this.tickLabelContainer = document.createElement('div');
					this.tickLabelContainer.className = 'slider-tick-label-container';

					for (i = 0; i < this.options.ticks_labels.length; i++) {
						var label = document.createElement('div');
						var noTickPositionsSpecified = this.options.ticks_positions.length === 0;
						var tickLabelsIndex = this.options.reversed && noTickPositionsSpecified ? this.options.ticks_labels.length - (i + 1) : i;
						label.className = 'slider-tick-label';
						label.innerHTML = this.options.ticks_labels[tickLabelsIndex];

						this.tickLabels.push(label);
						this.tickLabelContainer.appendChild(label);
					}
				}

				var createAndAppendTooltipSubElements = function createAndAppendTooltipSubElements(tooltipElem) {
					var arrow = document.createElement("div");
					arrow.className = "tooltip-arrow";

					var inner = document.createElement("div");
					inner.className = "tooltip-inner";

					tooltipElem.appendChild(arrow);
					tooltipElem.appendChild(inner);
				};

				/* Create tooltip elements */
				var sliderTooltip = document.createElement("div");
				sliderTooltip.className = "tooltip tooltip-main";
				sliderTooltip.setAttribute('role', 'presentation');
				createAndAppendTooltipSubElements(sliderTooltip);

				var sliderTooltipMin = document.createElement("div");
				sliderTooltipMin.className = "tooltip tooltip-min";
				sliderTooltipMin.setAttribute('role', 'presentation');
				createAndAppendTooltipSubElements(sliderTooltipMin);

				var sliderTooltipMax = document.createElement("div");
				sliderTooltipMax.className = "tooltip tooltip-max";
				sliderTooltipMax.setAttribute('role', 'presentation');
				createAndAppendTooltipSubElements(sliderTooltipMax);

				/* Append components to sliderElem */
				this.sliderElem.appendChild(sliderTrack);
				this.sliderElem.appendChild(sliderTooltip);
				this.sliderElem.appendChild(sliderTooltipMin);
				this.sliderElem.appendChild(sliderTooltipMax);

				if (this.tickLabelContainer) {
					this.sliderElem.appendChild(this.tickLabelContainer);
				}
				if (this.ticksContainer) {
					this.sliderElem.appendChild(this.ticksContainer);
				}

				this.sliderElem.appendChild(sliderMinHandle);
				this.sliderElem.appendChild(sliderMaxHandle);

				/* Append slider element to parent container, right before the original <input> element */
				parent.insertBefore(this.sliderElem, this.element);

				/* Hide original <input> element */
				this.element.style.display = "none";
			}
			/* If JQuery exists, cache JQ references */
			if ($) {
				this.$element = $(this.element);
				this.$sliderElem = $(this.sliderElem);
			}

			/*************************************************
   						Setup
   	**************************************************/
			this.eventToCallbackMap = {};
			this.sliderElem.id = this.options.id;

			this.touchCapable = 'ontouchstart' in window || window.DocumentTouch && document instanceof window.DocumentTouch;

			this.touchX = 0;
			this.touchY = 0;

			this.tooltip = this.sliderElem.querySelector('.tooltip-main');
			this.tooltipInner = this.tooltip.querySelector('.tooltip-inner');

			this.tooltip_min = this.sliderElem.querySelector('.tooltip-min');
			this.tooltipInner_min = this.tooltip_min.querySelector('.tooltip-inner');

			this.tooltip_max = this.sliderElem.querySelector('.tooltip-max');
			this.tooltipInner_max = this.tooltip_max.querySelector('.tooltip-inner');

			if (SliderScale[this.options.scale]) {
				this.options.scale = SliderScale[this.options.scale];
			}

			if (updateSlider === true) {
				// Reset classes
				this._removeClass(this.sliderElem, 'slider-horizontal');
				this._removeClass(this.sliderElem, 'slider-vertical');
				this._removeClass(this.tooltip, 'hide');
				this._removeClass(this.tooltip_min, 'hide');
				this._removeClass(this.tooltip_max, 'hide');

				// Undo existing inline styles for track
				["left", "top", "width", "height"].forEach(function (prop) {
					this._removeProperty(this.trackLow, prop);
					this._removeProperty(this.trackSelection, prop);
					this._removeProperty(this.trackHigh, prop);
				}, this);

				// Undo inline styles on handles
				[this.handle1, this.handle2].forEach(function (handle) {
					this._removeProperty(handle, 'left');
					this._removeProperty(handle, 'top');
				}, this);

				// Undo inline styles and classes on tooltips
				[this.tooltip, this.tooltip_min, this.tooltip_max].forEach(function (tooltip) {
					this._removeProperty(tooltip, 'left');
					this._removeProperty(tooltip, 'top');
					this._removeProperty(tooltip, 'margin-left');
					this._removeProperty(tooltip, 'margin-top');

					this._removeClass(tooltip, 'right');
					this._removeClass(tooltip, 'top');
				}, this);
			}

			if (this.options.orientation === 'vertical') {
				this._addClass(this.sliderElem, 'slider-vertical');
				this.stylePos = 'top';
				this.mousePos = 'pageY';
				this.sizePos = 'offsetHeight';
			} else {
				this._addClass(this.sliderElem, 'slider-horizontal');
				this.sliderElem.style.width = origWidth;
				this.options.orientation = 'horizontal';
				this.stylePos = 'left';
				this.mousePos = 'pageX';
				this.sizePos = 'offsetWidth';
			}
			this._setTooltipPosition();
			/* In case ticks are specified, overwrite the min and max bounds */
			if (Array.isArray(this.options.ticks) && this.options.ticks.length > 0) {
				this.options.max = Math.max.apply(Math, this.options.ticks);
				this.options.min = Math.min.apply(Math, this.options.ticks);
			}

			if (Array.isArray(this.options.value)) {
				this.options.range = true;
				this._state.value = this.options.value;
			} else if (this.options.range) {
				// User wants a range, but value is not an array
				this._state.value = [this.options.value, this.options.max];
			} else {
				this._state.value = this.options.value;
			}

			this.trackLow = sliderTrackLow || this.trackLow;
			this.trackSelection = sliderTrackSelection || this.trackSelection;
			this.trackHigh = sliderTrackHigh || this.trackHigh;

			if (this.options.selection === 'none') {
				this._addClass(this.trackLow, 'hide');
				this._addClass(this.trackSelection, 'hide');
				this._addClass(this.trackHigh, 'hide');
			}

			this.handle1 = sliderMinHandle || this.handle1;
			this.handle2 = sliderMaxHandle || this.handle2;

			if (updateSlider === true) {
				// Reset classes
				this._removeClass(this.handle1, 'round triangle');
				this._removeClass(this.handle2, 'round triangle hide');

				for (i = 0; i < this.ticks.length; i++) {
					this._removeClass(this.ticks[i], 'round triangle hide');
				}
			}

			var availableHandleModifiers = ['round', 'triangle', 'custom'];
			var isValidHandleType = availableHandleModifiers.indexOf(this.options.handle) !== -1;
			if (isValidHandleType) {
				this._addClass(this.handle1, this.options.handle);
				this._addClass(this.handle2, this.options.handle);

				for (i = 0; i < this.ticks.length; i++) {
					this._addClass(this.ticks[i], this.options.handle);
				}
			}

			this._state.offset = this._offset(this.sliderElem);
			this._state.size = this.sliderElem[this.sizePos];
			this.setValue(this._state.value);

			/******************************************
   				Bind Event Listeners
   	******************************************/

			// Bind keyboard handlers
			this.handle1Keydown = this._keydown.bind(this, 0);
			this.handle1.addEventListener("keydown", this.handle1Keydown, false);

			this.handle2Keydown = this._keydown.bind(this, 1);
			this.handle2.addEventListener("keydown", this.handle2Keydown, false);

			this.mousedown = this._mousedown.bind(this);
			this.touchstart = this._touchstart.bind(this);
			this.touchmove = this._touchmove.bind(this);

			if (this.touchCapable) {
				// Bind touch handlers
				this.sliderElem.addEventListener("touchstart", this.touchstart, false);
				this.sliderElem.addEventListener("touchmove", this.touchmove, false);
			}
			this.sliderElem.addEventListener("mousedown", this.mousedown, false);

			// Bind window handlers
			this.resize = this._resize.bind(this);
			window.addEventListener("resize", this.resize, false);

			// Bind tooltip-related handlers
			if (this.options.tooltip === 'hide') {
				this._addClass(this.tooltip, 'hide');
				this._addClass(this.tooltip_min, 'hide');
				this._addClass(this.tooltip_max, 'hide');
			} else if (this.options.tooltip === 'always') {
				this._showTooltip();
				this._alwaysShowTooltip = true;
			} else {
				this.showTooltip = this._showTooltip.bind(this);
				this.hideTooltip = this._hideTooltip.bind(this);

				this.sliderElem.addEventListener("mouseenter", this.showTooltip, false);
				this.sliderElem.addEventListener("mouseleave", this.hideTooltip, false);

				this.handle1.addEventListener("focus", this.showTooltip, false);
				this.handle1.addEventListener("blur", this.hideTooltip, false);

				this.handle2.addEventListener("focus", this.showTooltip, false);
				this.handle2.addEventListener("blur", this.hideTooltip, false);
			}

			if (this.options.enabled) {
				this.enable();
			} else {
				this.disable();
			}
		}

		/*************************************************
  				INSTANCE PROPERTIES/METHODS
  	- Any methods bound to the prototype are considered
  part of the plugin's `public` interface
  	**************************************************/
		Slider.prototype = {
			_init: function _init() {}, // NOTE: Must exist to support bridget

			constructor: Slider,

			defaultOptions: {
				id: "",
				min: 0,
				max: 10,
				step: 1,
				precision: 0,
				orientation: 'horizontal',
				value: 5,
				range: false,
				selection: 'before',
				tooltip: 'show',
				tooltip_split: false,
				handle: 'round',
				reversed: false,
				enabled: true,
				formatter: function formatter(val) {
					if (Array.isArray(val)) {
						return val[0] + " : " + val[1];
					} else {
						return val;
					}
				},
				natural_arrow_keys: false,
				ticks: [],
				ticks_positions: [],
				ticks_labels: [],
				ticks_snap_bounds: 0,
				scale: 'linear',
				focus: false,
				tooltip_position: null,
				labelledby: null,
				rangeHighlights: []
			},

			getElement: function getElement() {
				return this.sliderElem;
			},

			getValue: function getValue() {
				if (this.options.range) {
					return this._state.value;
				} else {
					return this._state.value[0];
				}
			},

			setValue: function setValue(val, triggerSlideEvent, triggerChangeEvent) {
				if (!val) {
					val = 0;
				}
				var oldValue = this.getValue();
				this._state.value = this._validateInputValue(val);
				var applyPrecision = this._applyPrecision.bind(this);

				if (this.options.range) {
					this._state.value[0] = applyPrecision(this._state.value[0]);
					this._state.value[1] = applyPrecision(this._state.value[1]);

					this._state.value[0] = Math.max(this.options.min, Math.min(this.options.max, this._state.value[0]));
					this._state.value[1] = Math.max(this.options.min, Math.min(this.options.max, this._state.value[1]));
				} else {
					this._state.value = applyPrecision(this._state.value);
					this._state.value = [Math.max(this.options.min, Math.min(this.options.max, this._state.value))];
					this._addClass(this.handle2, 'hide');
					if (this.options.selection === 'after') {
						this._state.value[1] = this.options.max;
					} else {
						this._state.value[1] = this.options.min;
					}
				}

				if (this.options.max > this.options.min) {
					this._state.percentage = [this._toPercentage(this._state.value[0]), this._toPercentage(this._state.value[1]), this.options.step * 100 / (this.options.max - this.options.min)];
				} else {
					this._state.percentage = [0, 0, 100];
				}

				this._layout();
				var newValue = this.options.range ? this._state.value : this._state.value[0];

				this._setDataVal(newValue);
				if (triggerSlideEvent === true) {
					this._trigger('slide', newValue);
				}
				if (oldValue !== newValue && triggerChangeEvent === true) {
					this._trigger('change', {
						oldValue: oldValue,
						newValue: newValue
					});
				}

				return this;
			},

			destroy: function destroy() {
				// Remove event handlers on slider elements
				this._removeSliderEventHandlers();

				// Remove the slider from the DOM
				this.sliderElem.parentNode.removeChild(this.sliderElem);
				/* Show original <input> element */
				this.element.style.display = "";

				// Clear out custom event bindings
				this._cleanUpEventCallbacksMap();

				// Remove data values
				this.element.removeAttribute("data");

				// Remove JQuery handlers/data
				if ($) {
					this._unbindJQueryEventHandlers();
					this.$element.removeData('slider');
				}
			},

			disable: function disable() {
				this._state.enabled = false;
				this.handle1.removeAttribute("tabindex");
				this.handle2.removeAttribute("tabindex");
				this._addClass(this.sliderElem, 'slider-disabled');
				this._trigger('slideDisabled');

				return this;
			},

			enable: function enable() {
				this._state.enabled = true;
				this.handle1.setAttribute("tabindex", 0);
				this.handle2.setAttribute("tabindex", 0);
				this._removeClass(this.sliderElem, 'slider-disabled');
				this._trigger('slideEnabled');

				return this;
			},

			toggle: function toggle() {
				if (this._state.enabled) {
					this.disable();
				} else {
					this.enable();
				}
				return this;
			},

			isEnabled: function isEnabled() {
				return this._state.enabled;
			},

			on: function on(evt, callback) {
				this._bindNonQueryEventHandler(evt, callback);
				return this;
			},

			off: function off(evt, callback) {
				if ($) {
					this.$element.off(evt, callback);
					this.$sliderElem.off(evt, callback);
				} else {
					this._unbindNonQueryEventHandler(evt, callback);
				}
			},

			getAttribute: function getAttribute(attribute) {
				if (attribute) {
					return this.options[attribute];
				} else {
					return this.options;
				}
			},

			setAttribute: function setAttribute(attribute, value) {
				this.options[attribute] = value;
				return this;
			},

			refresh: function refresh() {
				this._removeSliderEventHandlers();
				createNewSlider.call(this, this.element, this.options);
				if ($) {
					// Bind new instance of slider to the element
					$.data(this.element, 'slider', this);
				}
				return this;
			},

			relayout: function relayout() {
				this._resize();
				this._layout();
				return this;
			},

			/******************************+
   				HELPERS
   	- Any method that is not part of the public interface.
   - Place it underneath this comment block and write its signature like so:
   	  					_fnName : function() {...}
   	********************************/
			_removeSliderEventHandlers: function _removeSliderEventHandlers() {
				// Remove keydown event listeners
				this.handle1.removeEventListener("keydown", this.handle1Keydown, false);
				this.handle2.removeEventListener("keydown", this.handle2Keydown, false);

				if (this.showTooltip) {
					this.handle1.removeEventListener("focus", this.showTooltip, false);
					this.handle2.removeEventListener("focus", this.showTooltip, false);
				}
				if (this.hideTooltip) {
					this.handle1.removeEventListener("blur", this.hideTooltip, false);
					this.handle2.removeEventListener("blur", this.hideTooltip, false);
				}

				// Remove event listeners from sliderElem
				if (this.showTooltip) {
					this.sliderElem.removeEventListener("mouseenter", this.showTooltip, false);
				}
				if (this.hideTooltip) {
					this.sliderElem.removeEventListener("mouseleave", this.hideTooltip, false);
				}
				this.sliderElem.removeEventListener("touchstart", this.touchstart, false);
				this.sliderElem.removeEventListener("touchmove", this.touchmove, false);
				this.sliderElem.removeEventListener("mousedown", this.mousedown, false);

				// Remove window event listener
				window.removeEventListener("resize", this.resize, false);
			},
			_bindNonQueryEventHandler: function _bindNonQueryEventHandler(evt, callback) {
				if (this.eventToCallbackMap[evt] === undefined) {
					this.eventToCallbackMap[evt] = [];
				}
				this.eventToCallbackMap[evt].push(callback);
			},
			_unbindNonQueryEventHandler: function _unbindNonQueryEventHandler(evt, callback) {
				var callbacks = this.eventToCallbackMap[evt];
				if (callbacks !== undefined) {
					for (var i = 0; i < callbacks.length; i++) {
						if (callbacks[i] === callback) {
							callbacks.splice(i, 1);
							break;
						}
					}
				}
			},
			_cleanUpEventCallbacksMap: function _cleanUpEventCallbacksMap() {
				var eventNames = Object.keys(this.eventToCallbackMap);
				for (var i = 0; i < eventNames.length; i++) {
					var eventName = eventNames[i];
					this.eventToCallbackMap[eventName] = null;
				}
			},
			_showTooltip: function _showTooltip() {
				if (this.options.tooltip_split === false) {
					this._addClass(this.tooltip, 'in');
					this.tooltip_min.style.display = 'none';
					this.tooltip_max.style.display = 'none';
				} else {
					this._addClass(this.tooltip_min, 'in');
					this._addClass(this.tooltip_max, 'in');
					this.tooltip.style.display = 'none';
				}
				this._state.over = true;
			},
			_hideTooltip: function _hideTooltip() {
				if (this._state.inDrag === false && this.alwaysShowTooltip !== true) {
					this._removeClass(this.tooltip, 'in');
					this._removeClass(this.tooltip_min, 'in');
					this._removeClass(this.tooltip_max, 'in');
				}
				this._state.over = false;
			},
			_layout: function _layout() {
				var positionPercentages;

				if (this.options.reversed) {
					positionPercentages = [100 - this._state.percentage[0], this.options.range ? 100 - this._state.percentage[1] : this._state.percentage[1]];
				} else {
					positionPercentages = [this._state.percentage[0], this._state.percentage[1]];
				}

				this.handle1.style[this.stylePos] = positionPercentages[0] + '%';
				this.handle1.setAttribute('aria-valuenow', this._state.value[0]);

				this.handle2.style[this.stylePos] = positionPercentages[1] + '%';
				this.handle2.setAttribute('aria-valuenow', this._state.value[1]);

				/* Position highlight range elements */
				if (this.rangeHighlightElements.length > 0 && Array.isArray(this.options.rangeHighlights) && this.options.rangeHighlights.length > 0) {
					for (var _i = 0; _i < this.options.rangeHighlights.length; _i++) {
						var startPercent = this._toPercentage(this.options.rangeHighlights[_i].start);
						var endPercent = this._toPercentage(this.options.rangeHighlights[_i].end);

						var currentRange = this._createHighlightRange(startPercent, endPercent);

						if (currentRange) {
							if (this.options.orientation === 'vertical') {
								this.rangeHighlightElements[_i].style.top = currentRange.start + "%";
								this.rangeHighlightElements[_i].style.height = currentRange.size + "%";
							} else {
								this.rangeHighlightElements[_i].style.left = currentRange.start + "%";
								this.rangeHighlightElements[_i].style.width = currentRange.size + "%";
							}
						} else {
							this.rangeHighlightElements[_i].style.display = "none";
						}
					}
				}

				/* Position ticks and labels */
				if (Array.isArray(this.options.ticks) && this.options.ticks.length > 0) {

					var styleSize = this.options.orientation === 'vertical' ? 'height' : 'width';
					var styleMargin = this.options.orientation === 'vertical' ? 'marginTop' : 'marginLeft';
					var labelSize = this._state.size / (this.options.ticks.length - 1);

					if (this.tickLabelContainer) {
						var extraMargin = 0;
						if (this.options.ticks_positions.length === 0) {
							if (this.options.orientation !== 'vertical') {
								this.tickLabelContainer.style[styleMargin] = -labelSize / 2 + 'px';
							}

							extraMargin = this.tickLabelContainer.offsetHeight;
						} else {
							/* Chidren are position absolute, calculate height by finding the max offsetHeight of a child */
							for (i = 0; i < this.tickLabelContainer.childNodes.length; i++) {
								if (this.tickLabelContainer.childNodes[i].offsetHeight > extraMargin) {
									extraMargin = this.tickLabelContainer.childNodes[i].offsetHeight;
								}
							}
						}
						if (this.options.orientation === 'horizontal') {
							this.sliderElem.style.marginBottom = extraMargin + 'px';
						}
					}
					for (var i = 0; i < this.options.ticks.length; i++) {

						var percentage = this.options.ticks_positions[i] || this._toPercentage(this.options.ticks[i]);

						if (this.options.reversed) {
							percentage = 100 - percentage;
						}

						this.ticks[i].style[this.stylePos] = percentage + '%';

						/* Set class labels to denote whether ticks are in the selection */
						this._removeClass(this.ticks[i], 'in-selection');
						if (!this.options.range) {
							if (this.options.selection === 'after' && percentage >= positionPercentages[0]) {
								this._addClass(this.ticks[i], 'in-selection');
							} else if (this.options.selection === 'before' && percentage <= positionPercentages[0]) {
								this._addClass(this.ticks[i], 'in-selection');
							}
						} else if (percentage >= positionPercentages[0] && percentage <= positionPercentages[1]) {
							this._addClass(this.ticks[i], 'in-selection');
						}

						if (this.tickLabels[i]) {
							this.tickLabels[i].style[styleSize] = labelSize + 'px';

							if (this.options.orientation !== 'vertical' && this.options.ticks_positions[i] !== undefined) {
								this.tickLabels[i].style.position = 'absolute';
								this.tickLabels[i].style[this.stylePos] = percentage + '%';
								this.tickLabels[i].style[styleMargin] = -labelSize / 2 + 'px';
							} else if (this.options.orientation === 'vertical') {
								this.tickLabels[i].style['marginLeft'] = this.sliderElem.offsetWidth + 'px';
								this.tickLabelContainer.style['marginTop'] = this.sliderElem.offsetWidth / 2 * -1 + 'px';
							}
						}
					}
				}

				var formattedTooltipVal;

				if (this.options.range) {
					formattedTooltipVal = this.options.formatter(this._state.value);
					this._setText(this.tooltipInner, formattedTooltipVal);
					this.tooltip.style[this.stylePos] = (positionPercentages[1] + positionPercentages[0]) / 2 + '%';

					if (this.options.orientation === 'vertical') {
						this._css(this.tooltip, 'margin-top', -this.tooltip.offsetHeight / 2 + 'px');
					} else {
						this._css(this.tooltip, 'margin-left', -this.tooltip.offsetWidth / 2 + 'px');
					}

					if (this.options.orientation === 'vertical') {
						this._css(this.tooltip, 'margin-top', -this.tooltip.offsetHeight / 2 + 'px');
					} else {
						this._css(this.tooltip, 'margin-left', -this.tooltip.offsetWidth / 2 + 'px');
					}

					var innerTooltipMinText = this.options.formatter(this._state.value[0]);
					this._setText(this.tooltipInner_min, innerTooltipMinText);

					var innerTooltipMaxText = this.options.formatter(this._state.value[1]);
					this._setText(this.tooltipInner_max, innerTooltipMaxText);

					this.tooltip_min.style[this.stylePos] = positionPercentages[0] + '%';

					if (this.options.orientation === 'vertical') {
						this._css(this.tooltip_min, 'margin-top', -this.tooltip_min.offsetHeight / 2 + 'px');
					} else {
						this._css(this.tooltip_min, 'margin-left', -this.tooltip_min.offsetWidth / 2 + 'px');
					}

					this.tooltip_max.style[this.stylePos] = positionPercentages[1] + '%';

					if (this.options.orientation === 'vertical') {
						this._css(this.tooltip_max, 'margin-top', -this.tooltip_max.offsetHeight / 2 + 'px');
					} else {
						this._css(this.tooltip_max, 'margin-left', -this.tooltip_max.offsetWidth / 2 + 'px');
					}
				} else {
					formattedTooltipVal = this.options.formatter(this._state.value[0]);
					this._setText(this.tooltipInner, formattedTooltipVal);

					this.tooltip.style[this.stylePos] = positionPercentages[0] + '%';
					if (this.options.orientation === 'vertical') {
						this._css(this.tooltip, 'margin-top', -this.tooltip.offsetHeight / 2 + 'px');
					} else {
						this._css(this.tooltip, 'margin-left', -this.tooltip.offsetWidth / 2 + 'px');
					}
				}

				if (this.options.orientation === 'vertical') {
					this.trackLow.style.top = '0';
					this.trackLow.style.height = Math.min(positionPercentages[0], positionPercentages[1]) + '%';

					this.trackSelection.style.top = Math.min(positionPercentages[0], positionPercentages[1]) + '%';
					this.trackSelection.style.height = Math.abs(positionPercentages[0] - positionPercentages[1]) + '%';

					this.trackHigh.style.bottom = '0';
					this.trackHigh.style.height = 100 - Math.min(positionPercentages[0], positionPercentages[1]) - Math.abs(positionPercentages[0] - positionPercentages[1]) + '%';
				} else {
					this.trackLow.style.left = '0';
					this.trackLow.style.width = Math.min(positionPercentages[0], positionPercentages[1]) + '%';

					this.trackSelection.style.left = Math.min(positionPercentages[0], positionPercentages[1]) + '%';
					this.trackSelection.style.width = Math.abs(positionPercentages[0] - positionPercentages[1]) + '%';

					this.trackHigh.style.right = '0';
					this.trackHigh.style.width = 100 - Math.min(positionPercentages[0], positionPercentages[1]) - Math.abs(positionPercentages[0] - positionPercentages[1]) + '%';

					var offset_min = this.tooltip_min.getBoundingClientRect();
					var offset_max = this.tooltip_max.getBoundingClientRect();

					if (this.options.tooltip_position === 'bottom') {
						if (offset_min.right > offset_max.left) {
							this._removeClass(this.tooltip_max, 'bottom');
							this._addClass(this.tooltip_max, 'top');
							this.tooltip_max.style.top = '';
							this.tooltip_max.style.bottom = 22 + 'px';
						} else {
							this._removeClass(this.tooltip_max, 'top');
							this._addClass(this.tooltip_max, 'bottom');
							this.tooltip_max.style.top = this.tooltip_min.style.top;
							this.tooltip_max.style.bottom = '';
						}
					} else {
						if (offset_min.right > offset_max.left) {
							this._removeClass(this.tooltip_max, 'top');
							this._addClass(this.tooltip_max, 'bottom');
							this.tooltip_max.style.top = 18 + 'px';
						} else {
							this._removeClass(this.tooltip_max, 'bottom');
							this._addClass(this.tooltip_max, 'top');
							this.tooltip_max.style.top = this.tooltip_min.style.top;
						}
					}
				}
			},
			_createHighlightRange: function _createHighlightRange(start, end) {
				if (this._isHighlightRange(start, end)) {
					if (start > end) {
						return { 'start': end, 'size': start - end };
					}
					return { 'start': start, 'size': end - start };
				}
				return null;
			},
			_isHighlightRange: function _isHighlightRange(start, end) {
				if (0 <= start && start <= 100 && 0 <= end && end <= 100) {
					return true;
				} else {
					return false;
				}
			},
			_resize: function _resize(ev) {
				/*jshint unused:false*/
				this._state.offset = this._offset(this.sliderElem);
				this._state.size = this.sliderElem[this.sizePos];
				this._layout();
			},
			_removeProperty: function _removeProperty(element, prop) {
				if (element.style.removeProperty) {
					element.style.removeProperty(prop);
				} else {
					element.style.removeAttribute(prop);
				}
			},
			_mousedown: function _mousedown(ev) {
				if (!this._state.enabled) {
					return false;
				}

				this._state.offset = this._offset(this.sliderElem);
				this._state.size = this.sliderElem[this.sizePos];

				var percentage = this._getPercentage(ev);

				if (this.options.range) {
					var diff1 = Math.abs(this._state.percentage[0] - percentage);
					var diff2 = Math.abs(this._state.percentage[1] - percentage);
					this._state.dragged = diff1 < diff2 ? 0 : 1;
					this._adjustPercentageForRangeSliders(percentage);
				} else {
					this._state.dragged = 0;
				}

				this._state.percentage[this._state.dragged] = percentage;
				this._layout();

				if (this.touchCapable) {
					document.removeEventListener("touchmove", this.mousemove, false);
					document.removeEventListener("touchend", this.mouseup, false);
				}

				if (this.mousemove) {
					document.removeEventListener("mousemove", this.mousemove, false);
				}
				if (this.mouseup) {
					document.removeEventListener("mouseup", this.mouseup, false);
				}

				this.mousemove = this._mousemove.bind(this);
				this.mouseup = this._mouseup.bind(this);

				if (this.touchCapable) {
					// Touch: Bind touch events:
					document.addEventListener("touchmove", this.mousemove, false);
					document.addEventListener("touchend", this.mouseup, false);
				}
				// Bind mouse events:
				document.addEventListener("mousemove", this.mousemove, false);
				document.addEventListener("mouseup", this.mouseup, false);

				this._state.inDrag = true;
				var newValue = this._calculateValue();

				this._trigger('slideStart', newValue);

				this._setDataVal(newValue);
				this.setValue(newValue, false, true);

				this._pauseEvent(ev);

				if (this.options.focus) {
					this._triggerFocusOnHandle(this._state.dragged);
				}

				return true;
			},
			_touchstart: function _touchstart(ev) {
				if (ev.changedTouches === undefined) {
					this._mousedown(ev);
					return;
				}

				var touch = ev.changedTouches[0];
				this.touchX = touch.pageX;
				this.touchY = touch.pageY;
			},
			_triggerFocusOnHandle: function _triggerFocusOnHandle(handleIdx) {
				if (handleIdx === 0) {
					this.handle1.focus();
				}
				if (handleIdx === 1) {
					this.handle2.focus();
				}
			},
			_keydown: function _keydown(handleIdx, ev) {
				if (!this._state.enabled) {
					return false;
				}

				var dir;
				switch (ev.keyCode) {
					case 37: // left
					case 40:
						// down
						dir = -1;
						break;
					case 39: // right
					case 38:
						// up
						dir = 1;
						break;
				}
				if (!dir) {
					return;
				}

				// use natural arrow keys instead of from min to max
				if (this.options.natural_arrow_keys) {
					var ifVerticalAndNotReversed = this.options.orientation === 'vertical' && !this.options.reversed;
					var ifHorizontalAndReversed = this.options.orientation === 'horizontal' && this.options.reversed;

					if (ifVerticalAndNotReversed || ifHorizontalAndReversed) {
						dir = -dir;
					}
				}

				var val = this._state.value[handleIdx] + dir * this.options.step;
				if (this.options.range) {
					val = [!handleIdx ? val : this._state.value[0], handleIdx ? val : this._state.value[1]];
				}

				this._trigger('slideStart', val);
				this._setDataVal(val);
				this.setValue(val, true, true);

				this._setDataVal(val);
				this._trigger('slideStop', val);
				this._layout();

				this._pauseEvent(ev);

				return false;
			},
			_pauseEvent: function _pauseEvent(ev) {
				if (ev.stopPropagation) {
					ev.stopPropagation();
				}
				if (ev.preventDefault) {
					ev.preventDefault();
				}
				ev.cancelBubble = true;
				ev.returnValue = false;
			},
			_mousemove: function _mousemove(ev) {
				if (!this._state.enabled) {
					return false;
				}

				var percentage = this._getPercentage(ev);
				this._adjustPercentageForRangeSliders(percentage);
				this._state.percentage[this._state.dragged] = percentage;
				this._layout();

				var val = this._calculateValue(true);
				this.setValue(val, true, true);

				return false;
			},
			_touchmove: function _touchmove(ev) {
				if (ev.changedTouches === undefined) {
					return;
				}

				var touch = ev.changedTouches[0];

				var xDiff = touch.pageX - this.touchX;
				var yDiff = touch.pageY - this.touchY;

				if (!this._state.inDrag) {
					// Vertical Slider
					if (this.options.orientation === 'vertical' && xDiff <= 5 && xDiff >= -5 && (yDiff >= 15 || yDiff <= -15)) {
						this._mousedown(ev);
					}
					// Horizontal slider.
					else if (yDiff <= 5 && yDiff >= -5 && (xDiff >= 15 || xDiff <= -15)) {
							this._mousedown(ev);
						}
				}
			},
			_adjustPercentageForRangeSliders: function _adjustPercentageForRangeSliders(percentage) {
				if (this.options.range) {
					var precision = this._getNumDigitsAfterDecimalPlace(percentage);
					precision = precision ? precision - 1 : 0;
					var percentageWithAdjustedPrecision = this._applyToFixedAndParseFloat(percentage, precision);
					if (this._state.dragged === 0 && this._applyToFixedAndParseFloat(this._state.percentage[1], precision) < percentageWithAdjustedPrecision) {
						this._state.percentage[0] = this._state.percentage[1];
						this._state.dragged = 1;
					} else if (this._state.dragged === 1 && this._applyToFixedAndParseFloat(this._state.percentage[0], precision) > percentageWithAdjustedPrecision) {
						this._state.percentage[1] = this._state.percentage[0];
						this._state.dragged = 0;
					}
				}
			},
			_mouseup: function _mouseup() {
				if (!this._state.enabled) {
					return false;
				}
				if (this.touchCapable) {
					// Touch: Unbind touch event handlers:
					document.removeEventListener("touchmove", this.mousemove, false);
					document.removeEventListener("touchend", this.mouseup, false);
				}
				// Unbind mouse event handlers:
				document.removeEventListener("mousemove", this.mousemove, false);
				document.removeEventListener("mouseup", this.mouseup, false);

				this._state.inDrag = false;
				if (this._state.over === false) {
					this._hideTooltip();
				}
				var val = this._calculateValue(true);

				this._layout();
				this._setDataVal(val);
				this._trigger('slideStop', val);

				return false;
			},
			_calculateValue: function _calculateValue(snapToClosestTick) {
				var val;
				if (this.options.range) {
					val = [this.options.min, this.options.max];
					if (this._state.percentage[0] !== 0) {
						val[0] = this._toValue(this._state.percentage[0]);
						val[0] = this._applyPrecision(val[0]);
					}
					if (this._state.percentage[1] !== 100) {
						val[1] = this._toValue(this._state.percentage[1]);
						val[1] = this._applyPrecision(val[1]);
					}
				} else {
					val = this._toValue(this._state.percentage[0]);
					val = parseFloat(val);
					val = this._applyPrecision(val);
				}

				if (snapToClosestTick) {
					var min = [val, Infinity];
					for (var i = 0; i < this.options.ticks.length; i++) {
						var diff = Math.abs(this.options.ticks[i] - val);
						if (diff <= min[1]) {
							min = [this.options.ticks[i], diff];
						}
					}
					if (min[1] <= this.options.ticks_snap_bounds) {
						return min[0];
					}
				}

				return val;
			},
			_applyPrecision: function _applyPrecision(val) {
				var precision = this.options.precision || this._getNumDigitsAfterDecimalPlace(this.options.step);
				return this._applyToFixedAndParseFloat(val, precision);
			},
			_getNumDigitsAfterDecimalPlace: function _getNumDigitsAfterDecimalPlace(num) {
				var match = ('' + num).match(/(?:\.(\d+))?(?:[eE]([+-]?\d+))?$/);
				if (!match) {
					return 0;
				}
				return Math.max(0, (match[1] ? match[1].length : 0) - (match[2] ? +match[2] : 0));
			},
			_applyToFixedAndParseFloat: function _applyToFixedAndParseFloat(num, toFixedInput) {
				var truncatedNum = num.toFixed(toFixedInput);
				return parseFloat(truncatedNum);
			},
			/*
   	Credits to Mike Samuel for the following method!
   	Source: http://stackoverflow.com/questions/10454518/javascript-how-to-retrieve-the-number-of-decimals-of-a-string-number
   */
			_getPercentage: function _getPercentage(ev) {
				if (this.touchCapable && (ev.type === 'touchstart' || ev.type === 'touchmove')) {
					ev = ev.touches[0];
				}

				var eventPosition = ev[this.mousePos];
				var sliderOffset = this._state.offset[this.stylePos];
				var distanceToSlide = eventPosition - sliderOffset;
				// Calculate what percent of the length the slider handle has slid
				var percentage = distanceToSlide / this._state.size * 100;
				percentage = Math.round(percentage / this._state.percentage[2]) * this._state.percentage[2];
				if (this.options.reversed) {
					percentage = 100 - percentage;
				}

				// Make sure the percent is within the bounds of the slider.
				// 0% corresponds to the 'min' value of the slide
				// 100% corresponds to the 'max' value of the slide
				return Math.max(0, Math.min(100, percentage));
			},
			_validateInputValue: function _validateInputValue(val) {
				if (typeof val === 'number') {
					return val;
				} else if (Array.isArray(val)) {
					this._validateArray(val);
					return val;
				} else {
					throw new Error(ErrorMsgs.formatInvalidInputErrorMsg(val));
				}
			},
			_validateArray: function _validateArray(val) {
				for (var i = 0; i < val.length; i++) {
					var input = val[i];
					if (typeof input !== 'number') {
						throw new Error(ErrorMsgs.formatInvalidInputErrorMsg(input));
					}
				}
			},
			_setDataVal: function _setDataVal(val) {
				this.element.setAttribute('data-value', val);
				this.element.setAttribute('value', val);
				this.element.value = val;
			},
			_trigger: function _trigger(evt, val) {
				val = val || val === 0 ? val : undefined;

				var callbackFnArray = this.eventToCallbackMap[evt];
				if (callbackFnArray && callbackFnArray.length) {
					for (var i = 0; i < callbackFnArray.length; i++) {
						var callbackFn = callbackFnArray[i];
						callbackFn(val);
					}
				}

				/* If JQuery exists, trigger JQuery events */
				if ($) {
					this._triggerJQueryEvent(evt, val);
				}
			},
			_triggerJQueryEvent: function _triggerJQueryEvent(evt, val) {
				var eventData = {
					type: evt,
					value: val
				};
				this.$element.trigger(eventData);
				this.$sliderElem.trigger(eventData);
			},
			_unbindJQueryEventHandlers: function _unbindJQueryEventHandlers() {
				this.$element.off();
				this.$sliderElem.off();
			},
			_setText: function _setText(element, text) {
				if (typeof element.textContent !== "undefined") {
					element.textContent = text;
				} else if (typeof element.innerText !== "undefined") {
					element.innerText = text;
				}
			},
			_removeClass: function _removeClass(element, classString) {
				var classes = classString.split(" ");
				var newClasses = element.className;

				for (var i = 0; i < classes.length; i++) {
					var classTag = classes[i];
					var regex = new RegExp("(?:\\s|^)" + classTag + "(?:\\s|$)");
					newClasses = newClasses.replace(regex, " ");
				}

				element.className = newClasses.trim();
			},
			_addClass: function _addClass(element, classString) {
				var classes = classString.split(" ");
				var newClasses = element.className;

				for (var i = 0; i < classes.length; i++) {
					var classTag = classes[i];
					var regex = new RegExp("(?:\\s|^)" + classTag + "(?:\\s|$)");
					var ifClassExists = regex.test(newClasses);

					if (!ifClassExists) {
						newClasses += " " + classTag;
					}
				}

				element.className = newClasses.trim();
			},
			_offsetLeft: function _offsetLeft(obj) {
				return obj.getBoundingClientRect().left;
			},
			_offsetTop: function _offsetTop(obj) {
				var offsetTop = obj.offsetTop;
				while ((obj = obj.offsetParent) && !isNaN(obj.offsetTop)) {
					offsetTop += obj.offsetTop;
					if (obj.tagName !== 'BODY') {
						offsetTop -= obj.scrollTop;
					}
				}
				return offsetTop;
			},
			_offset: function _offset(obj) {
				return {
					left: this._offsetLeft(obj),
					top: this._offsetTop(obj)
				};
			},
			_css: function _css(elementRef, styleName, value) {
				if ($) {
					$.style(elementRef, styleName, value);
				} else {
					var style = styleName.replace(/^-ms-/, "ms-").replace(/-([\da-z])/gi, function (all, letter) {
						return letter.toUpperCase();
					});
					elementRef.style[style] = value;
				}
			},
			_toValue: function _toValue(percentage) {
				return this.options.scale.toValue.apply(this, [percentage]);
			},
			_toPercentage: function _toPercentage(value) {
				return this.options.scale.toPercentage.apply(this, [value]);
			},
			_setTooltipPosition: function _setTooltipPosition() {
				var tooltips = [this.tooltip, this.tooltip_min, this.tooltip_max];
				if (this.options.orientation === 'vertical') {
					var tooltipPos = this.options.tooltip_position || 'right';
					var oppositeSide = tooltipPos === 'left' ? 'right' : 'left';
					tooltips.forEach((function (tooltip) {
						this._addClass(tooltip, tooltipPos);
						tooltip.style[oppositeSide] = '100%';
					}).bind(this));
				} else if (this.options.tooltip_position === 'bottom') {
					tooltips.forEach((function (tooltip) {
						this._addClass(tooltip, 'bottom');
						tooltip.style.top = 22 + 'px';
					}).bind(this));
				} else {
					tooltips.forEach((function (tooltip) {
						this._addClass(tooltip, 'top');
						tooltip.style.top = -this.tooltip.outerHeight - 14 + 'px';
					}).bind(this));
				}
			}
		};

		/*********************************
  		Attach to global namespace
  	*********************************/
		if ($) {
			(function () {
				var autoRegisterNamespace = undefined;

				if (!$.fn.slider) {
					$.bridget(NAMESPACE_MAIN, Slider);
					autoRegisterNamespace = NAMESPACE_MAIN;
				} else {
					if (windowIsDefined) {
						window.console.warn("bootstrap-slider.js - WARNING: $.fn.slider namespace is already bound. Use the $.fn.bootstrapSlider namespace instead.");
					}
					autoRegisterNamespace = NAMESPACE_ALTERNATE;
				}
				$.bridget(NAMESPACE_ALTERNATE, Slider);

				// Auto-Register data-provide="slider" Elements
				$(function () {
					$("input[data-provide=slider]")[autoRegisterNamespace]();
				});
			})();
		}
	})($);

	return Slider;
});


/***/ },

/***/ 751:
/***/ function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(jQuery, module) {
/*
 *
 * More info at [www.dropzonejs.com](http://www.dropzonejs.com)
 *
 * Copyright (c) 2012, Matias Meno
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 *
 */

(function() {
  var Dropzone, Emitter, camelize, contentLoaded, detectVerticalSquash, drawImageIOSFix, noop, without,
    __slice = [].slice,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  noop = function() {};

  Emitter = (function() {
    function Emitter() {}

    Emitter.prototype.addEventListener = Emitter.prototype.on;

    Emitter.prototype.on = function(event, fn) {
      this._callbacks = this._callbacks || {};
      if (!this._callbacks[event]) {
        this._callbacks[event] = [];
      }
      this._callbacks[event].push(fn);
      return this;
    };

    Emitter.prototype.emit = function() {
      var args, callback, callbacks, event, _i, _len;
      event = arguments[0], args = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
      this._callbacks = this._callbacks || {};
      callbacks = this._callbacks[event];
      if (callbacks) {
        for (_i = 0, _len = callbacks.length; _i < _len; _i++) {
          callback = callbacks[_i];
          callback.apply(this, args);
        }
      }
      return this;
    };

    Emitter.prototype.removeListener = Emitter.prototype.off;

    Emitter.prototype.removeAllListeners = Emitter.prototype.off;

    Emitter.prototype.removeEventListener = Emitter.prototype.off;

    Emitter.prototype.off = function(event, fn) {
      var callback, callbacks, i, _i, _len;
      if (!this._callbacks || arguments.length === 0) {
        this._callbacks = {};
        return this;
      }
      callbacks = this._callbacks[event];
      if (!callbacks) {
        return this;
      }
      if (arguments.length === 1) {
        delete this._callbacks[event];
        return this;
      }
      for (i = _i = 0, _len = callbacks.length; _i < _len; i = ++_i) {
        callback = callbacks[i];
        if (callback === fn) {
          callbacks.splice(i, 1);
          break;
        }
      }
      return this;
    };

    return Emitter;

  })();

  Dropzone = (function(_super) {
    var extend, resolveOption;

    __extends(Dropzone, _super);

    Dropzone.prototype.Emitter = Emitter;


    /*
    This is a list of all available events you can register on a dropzone object.
    
    You can register an event handler like this:
    
        dropzone.on("dragEnter", function() { });
     */

    Dropzone.prototype.events = ["drop", "dragstart", "dragend", "dragenter", "dragover", "dragleave", "addedfile", "addedfiles", "removedfile", "thumbnail", "error", "errormultiple", "processing", "processingmultiple", "uploadprogress", "totaluploadprogress", "sending", "sendingmultiple", "success", "successmultiple", "canceled", "canceledmultiple", "complete", "completemultiple", "reset", "maxfilesexceeded", "maxfilesreached", "queuecomplete"];

    Dropzone.prototype.defaultOptions = {
      url: null,
      method: "post",
      withCredentials: false,
      parallelUploads: 2,
      uploadMultiple: false,
      maxFilesize: 256,
      paramName: "file",
      createImageThumbnails: true,
      maxThumbnailFilesize: 10,
      thumbnailWidth: 120,
      thumbnailHeight: 120,
      filesizeBase: 1000,
      maxFiles: null,
      params: {},
      clickable: true,
      ignoreHiddenFiles: true,
      acceptedFiles: null,
      acceptedMimeTypes: null,
      autoProcessQueue: true,
      autoQueue: true,
      addRemoveLinks: false,
      previewsContainer: null,
      hiddenInputContainer: "body",
      capture: null,
      renameFilename: null,
      dictDefaultMessage: "Drop files here to upload",
      dictFallbackMessage: "Your browser does not support drag'n'drop file uploads.",
      dictFallbackText: "Please use the fallback form below to upload your files like in the olden days.",
      dictFileTooBig: "File is too big ({{filesize}}MiB). Max filesize: {{maxFilesize}}MiB.",
      dictInvalidFileType: "You can't upload files of this type.",
      dictResponseError: "Server responded with {{statusCode}} code.",
      dictCancelUpload: "Cancel upload",
      dictCancelUploadConfirmation: "Are you sure you want to cancel this upload?",
      dictRemoveFile: "Remove file",
      dictRemoveFileConfirmation: null,
      dictMaxFilesExceeded: "You can not upload any more files.",
      accept: function(file, done) {
        return done();
      },
      init: function() {
        return noop;
      },
      forceFallback: false,
      fallback: function() {
        var child, messageElement, span, _i, _len, _ref;
        this.element.className = "" + this.element.className + " dz-browser-not-supported";
        _ref = this.element.getElementsByTagName("div");
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          child = _ref[_i];
          if (/(^| )dz-message($| )/.test(child.className)) {
            messageElement = child;
            child.className = "dz-message";
            continue;
          }
        }
        if (!messageElement) {
          messageElement = Dropzone.createElement("<div class=\"dz-message\"><span></span></div>");
          this.element.appendChild(messageElement);
        }
        span = messageElement.getElementsByTagName("span")[0];
        if (span) {
          if (span.textContent != null) {
            span.textContent = this.options.dictFallbackMessage;
          } else if (span.innerText != null) {
            span.innerText = this.options.dictFallbackMessage;
          }
        }
        return this.element.appendChild(this.getFallbackForm());
      },
      resize: function(file) {
        var info, srcRatio, trgRatio;
        info = {
          srcX: 0,
          srcY: 0,
          srcWidth: file.width,
          srcHeight: file.height
        };
        srcRatio = file.width / file.height;
        info.optWidth = this.options.thumbnailWidth;
        info.optHeight = this.options.thumbnailHeight;
        if ((info.optWidth == null) && (info.optHeight == null)) {
          info.optWidth = info.srcWidth;
          info.optHeight = info.srcHeight;
        } else if (info.optWidth == null) {
          info.optWidth = srcRatio * info.optHeight;
        } else if (info.optHeight == null) {
          info.optHeight = (1 / srcRatio) * info.optWidth;
        }
        trgRatio = info.optWidth / info.optHeight;
        if (file.height < info.optHeight || file.width < info.optWidth) {
          info.trgHeight = info.srcHeight;
          info.trgWidth = info.srcWidth;
        } else {
          if (srcRatio > trgRatio) {
            info.srcHeight = file.height;
            info.srcWidth = info.srcHeight * trgRatio;
          } else {
            info.srcWidth = file.width;
            info.srcHeight = info.srcWidth / trgRatio;
          }
        }
        info.srcX = (file.width - info.srcWidth) / 2;
        info.srcY = (file.height - info.srcHeight) / 2;
        return info;
      },

      /*
      Those functions register themselves to the events on init and handle all
      the user interface specific stuff. Overwriting them won't break the upload
      but can break the way it's displayed.
      You can overwrite them if you don't like the default behavior. If you just
      want to add an additional event handler, register it on the dropzone object
      and don't overwrite those options.
       */
      drop: function(e) {
        return this.element.classList.remove("dz-drag-hover");
      },
      dragstart: noop,
      dragend: function(e) {
        return this.element.classList.remove("dz-drag-hover");
      },
      dragenter: function(e) {
        return this.element.classList.add("dz-drag-hover");
      },
      dragover: function(e) {
        return this.element.classList.add("dz-drag-hover");
      },
      dragleave: function(e) {
        return this.element.classList.remove("dz-drag-hover");
      },
      paste: noop,
      reset: function() {
        return this.element.classList.remove("dz-started");
      },
      addedfile: function(file) {
        var node, removeFileEvent, removeLink, _i, _j, _k, _len, _len1, _len2, _ref, _ref1, _ref2, _results;
        if (this.element === this.previewsContainer) {
          this.element.classList.add("dz-started");
        }
        if (this.previewsContainer) {
          file.previewElement = Dropzone.createElement(this.options.previewTemplate.trim());
          file.previewTemplate = file.previewElement;
          this.previewsContainer.appendChild(file.previewElement);
          _ref = file.previewElement.querySelectorAll("[data-dz-name]");
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            node = _ref[_i];
            node.textContent = this._renameFilename(file.name);
          }
          _ref1 = file.previewElement.querySelectorAll("[data-dz-size]");
          for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
            node = _ref1[_j];
            node.innerHTML = this.filesize(file.size);
          }
          if (this.options.addRemoveLinks) {
            file._removeLink = Dropzone.createElement("<a class=\"dz-remove\" href=\"javascript:undefined;\" data-dz-remove>" + this.options.dictRemoveFile + "</a>");
            file.previewElement.appendChild(file._removeLink);
          }
          removeFileEvent = (function(_this) {
            return function(e) {
              e.preventDefault();
              e.stopPropagation();
              if (file.status === Dropzone.UPLOADING) {
                return Dropzone.confirm(_this.options.dictCancelUploadConfirmation, function() {
                  return _this.removeFile(file);
                });
              } else {
                if (_this.options.dictRemoveFileConfirmation) {
                  return Dropzone.confirm(_this.options.dictRemoveFileConfirmation, function() {
                    return _this.removeFile(file);
                  });
                } else {
                  return _this.removeFile(file);
                }
              }
            };
          })(this);
          _ref2 = file.previewElement.querySelectorAll("[data-dz-remove]");
          _results = [];
          for (_k = 0, _len2 = _ref2.length; _k < _len2; _k++) {
            removeLink = _ref2[_k];
            _results.push(removeLink.addEventListener("click", removeFileEvent));
          }
          return _results;
        }
      },
      removedfile: function(file) {
        var _ref;
        if (file.previewElement) {
          if ((_ref = file.previewElement) != null) {
            _ref.parentNode.removeChild(file.previewElement);
          }
        }
        return this._updateMaxFilesReachedClass();
      },
      thumbnail: function(file, dataUrl) {
        var thumbnailElement, _i, _len, _ref;
        if (file.previewElement) {
          file.previewElement.classList.remove("dz-file-preview");
          _ref = file.previewElement.querySelectorAll("[data-dz-thumbnail]");
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            thumbnailElement = _ref[_i];
            thumbnailElement.alt = file.name;
            thumbnailElement.src = dataUrl;
          }
          return setTimeout(((function(_this) {
            return function() {
              return file.previewElement.classList.add("dz-image-preview");
            };
          })(this)), 1);
        }
      },
      error: function(file, message) {
        var node, _i, _len, _ref, _results;
        if (file.previewElement) {
          file.previewElement.classList.add("dz-error");
          if (typeof message !== "String" && message.error) {
            message = message.error;
          }
          _ref = file.previewElement.querySelectorAll("[data-dz-errormessage]");
          _results = [];
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            node = _ref[_i];
            _results.push(node.textContent = message);
          }
          return _results;
        }
      },
      errormultiple: noop,
      processing: function(file) {
        if (file.previewElement) {
          file.previewElement.classList.add("dz-processing");
          if (file._removeLink) {
            return file._removeLink.textContent = this.options.dictCancelUpload;
          }
        }
      },
      processingmultiple: noop,
      uploadprogress: function(file, progress, bytesSent) {
        var node, _i, _len, _ref, _results;
        if (file.previewElement) {
          _ref = file.previewElement.querySelectorAll("[data-dz-uploadprogress]");
          _results = [];
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            node = _ref[_i];
            if (node.nodeName === 'PROGRESS') {
              _results.push(node.value = progress);
            } else {
              _results.push(node.style.width = "" + progress + "%");
            }
          }
          return _results;
        }
      },
      totaluploadprogress: noop,
      sending: noop,
      sendingmultiple: noop,
      success: function(file) {
        if (file.previewElement) {
          return file.previewElement.classList.add("dz-success");
        }
      },
      successmultiple: noop,
      canceled: function(file) {
        return this.emit("error", file, "Upload canceled.");
      },
      canceledmultiple: noop,
      complete: function(file) {
        if (file._removeLink) {
          file._removeLink.textContent = this.options.dictRemoveFile;
        }
        if (file.previewElement) {
          return file.previewElement.classList.add("dz-complete");
        }
      },
      completemultiple: noop,
      maxfilesexceeded: noop,
      maxfilesreached: noop,
      queuecomplete: noop,
      addedfiles: noop,
      previewTemplate: "<div class=\"dz-preview dz-file-preview\">\n  <div class=\"dz-image\"><img data-dz-thumbnail /></div>\n  <div class=\"dz-details\">\n    <div class=\"dz-size\"><span data-dz-size></span></div>\n    <div class=\"dz-filename\"><span data-dz-name></span></div>\n  </div>\n  <div class=\"dz-progress\"><span class=\"dz-upload\" data-dz-uploadprogress></span></div>\n  <div class=\"dz-error-message\"><span data-dz-errormessage></span></div>\n  <div class=\"dz-success-mark\">\n    <svg width=\"54px\" height=\"54px\" viewBox=\"0 0 54 54\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" xmlns:sketch=\"http://www.bohemiancoding.com/sketch/ns\">\n      <title>Check</title>\n      <defs></defs>\n      <g id=\"Page-1\" stroke=\"none\" stroke-width=\"1\" fill=\"none\" fill-rule=\"evenodd\" sketch:type=\"MSPage\">\n        <path d=\"M23.5,31.8431458 L17.5852419,25.9283877 C16.0248253,24.3679711 13.4910294,24.366835 11.9289322,25.9289322 C10.3700136,27.4878508 10.3665912,30.0234455 11.9283877,31.5852419 L20.4147581,40.0716123 C20.5133999,40.1702541 20.6159315,40.2626649 20.7218615,40.3488435 C22.2835669,41.8725651 24.794234,41.8626202 26.3461564,40.3106978 L43.3106978,23.3461564 C44.8771021,21.7797521 44.8758057,19.2483887 43.3137085,17.6862915 C41.7547899,16.1273729 39.2176035,16.1255422 37.6538436,17.6893022 L23.5,31.8431458 Z M27,53 C41.3594035,53 53,41.3594035 53,27 C53,12.6405965 41.3594035,1 27,1 C12.6405965,1 1,12.6405965 1,27 C1,41.3594035 12.6405965,53 27,53 Z\" id=\"Oval-2\" stroke-opacity=\"0.198794158\" stroke=\"#747474\" fill-opacity=\"0.816519475\" fill=\"#FFFFFF\" sketch:type=\"MSShapeGroup\"></path>\n      </g>\n    </svg>\n  </div>\n  <div class=\"dz-error-mark\">\n    <svg width=\"54px\" height=\"54px\" viewBox=\"0 0 54 54\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" xmlns:sketch=\"http://www.bohemiancoding.com/sketch/ns\">\n      <title>Error</title>\n      <defs></defs>\n      <g id=\"Page-1\" stroke=\"none\" stroke-width=\"1\" fill=\"none\" fill-rule=\"evenodd\" sketch:type=\"MSPage\">\n        <g id=\"Check-+-Oval-2\" sketch:type=\"MSLayerGroup\" stroke=\"#747474\" stroke-opacity=\"0.198794158\" fill=\"#FFFFFF\" fill-opacity=\"0.816519475\">\n          <path d=\"M32.6568542,29 L38.3106978,23.3461564 C39.8771021,21.7797521 39.8758057,19.2483887 38.3137085,17.6862915 C36.7547899,16.1273729 34.2176035,16.1255422 32.6538436,17.6893022 L27,23.3431458 L21.3461564,17.6893022 C19.7823965,16.1255422 17.2452101,16.1273729 15.6862915,17.6862915 C14.1241943,19.2483887 14.1228979,21.7797521 15.6893022,23.3461564 L21.3431458,29 L15.6893022,34.6538436 C14.1228979,36.2202479 14.1241943,38.7516113 15.6862915,40.3137085 C17.2452101,41.8726271 19.7823965,41.8744578 21.3461564,40.3106978 L27,34.6568542 L32.6538436,40.3106978 C34.2176035,41.8744578 36.7547899,41.8726271 38.3137085,40.3137085 C39.8758057,38.7516113 39.8771021,36.2202479 38.3106978,34.6538436 L32.6568542,29 Z M27,53 C41.3594035,53 53,41.3594035 53,27 C53,12.6405965 41.3594035,1 27,1 C12.6405965,1 1,12.6405965 1,27 C1,41.3594035 12.6405965,53 27,53 Z\" id=\"Oval-2\" sketch:type=\"MSShapeGroup\"></path>\n        </g>\n      </g>\n    </svg>\n  </div>\n</div>"
    };

    extend = function() {
      var key, object, objects, target, val, _i, _len;
      target = arguments[0], objects = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
      for (_i = 0, _len = objects.length; _i < _len; _i++) {
        object = objects[_i];
        for (key in object) {
          val = object[key];
          target[key] = val;
        }
      }
      return target;
    };

    function Dropzone(element, options) {
      var elementOptions, fallback, _ref;
      this.element = element;
      this.version = Dropzone.version;
      this.defaultOptions.previewTemplate = this.defaultOptions.previewTemplate.replace(/\n*/g, "");
      this.clickableElements = [];
      this.listeners = [];
      this.files = [];
      if (typeof this.element === "string") {
        this.element = document.querySelector(this.element);
      }
      if (!(this.element && (this.element.nodeType != null))) {
        throw new Error("Invalid dropzone element.");
      }
      if (this.element.dropzone) {
        throw new Error("Dropzone already attached.");
      }
      Dropzone.instances.push(this);
      this.element.dropzone = this;
      elementOptions = (_ref = Dropzone.optionsForElement(this.element)) != null ? _ref : {};
      this.options = extend({}, this.defaultOptions, elementOptions, options != null ? options : {});
      if (this.options.forceFallback || !Dropzone.isBrowserSupported()) {
        return this.options.fallback.call(this);
      }
      if (this.options.url == null) {
        this.options.url = this.element.getAttribute("action");
      }
      if (!this.options.url) {
        throw new Error("No URL provided.");
      }
      if (this.options.acceptedFiles && this.options.acceptedMimeTypes) {
        throw new Error("You can't provide both 'acceptedFiles' and 'acceptedMimeTypes'. 'acceptedMimeTypes' is deprecated.");
      }
      if (this.options.acceptedMimeTypes) {
        this.options.acceptedFiles = this.options.acceptedMimeTypes;
        delete this.options.acceptedMimeTypes;
      }
      this.options.method = this.options.method.toUpperCase();
      if ((fallback = this.getExistingFallback()) && fallback.parentNode) {
        fallback.parentNode.removeChild(fallback);
      }
      if (this.options.previewsContainer !== false) {
        if (this.options.previewsContainer) {
          this.previewsContainer = Dropzone.getElement(this.options.previewsContainer, "previewsContainer");
        } else {
          this.previewsContainer = this.element;
        }
      }
      if (this.options.clickable) {
        if (this.options.clickable === true) {
          this.clickableElements = [this.element];
        } else {
          this.clickableElements = Dropzone.getElements(this.options.clickable, "clickable");
        }
      }
      this.init();
    }

    Dropzone.prototype.getAcceptedFiles = function() {
      var file, _i, _len, _ref, _results;
      _ref = this.files;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        file = _ref[_i];
        if (file.accepted) {
          _results.push(file);
        }
      }
      return _results;
    };

    Dropzone.prototype.getRejectedFiles = function() {
      var file, _i, _len, _ref, _results;
      _ref = this.files;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        file = _ref[_i];
        if (!file.accepted) {
          _results.push(file);
        }
      }
      return _results;
    };

    Dropzone.prototype.getFilesWithStatus = function(status) {
      var file, _i, _len, _ref, _results;
      _ref = this.files;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        file = _ref[_i];
        if (file.status === status) {
          _results.push(file);
        }
      }
      return _results;
    };

    Dropzone.prototype.getQueuedFiles = function() {
      return this.getFilesWithStatus(Dropzone.QUEUED);
    };

    Dropzone.prototype.getUploadingFiles = function() {
      return this.getFilesWithStatus(Dropzone.UPLOADING);
    };

    Dropzone.prototype.getAddedFiles = function() {
      return this.getFilesWithStatus(Dropzone.ADDED);
    };

    Dropzone.prototype.getActiveFiles = function() {
      var file, _i, _len, _ref, _results;
      _ref = this.files;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        file = _ref[_i];
        if (file.status === Dropzone.UPLOADING || file.status === Dropzone.QUEUED) {
          _results.push(file);
        }
      }
      return _results;
    };

    Dropzone.prototype.init = function() {
      var eventName, noPropagation, setupHiddenFileInput, _i, _len, _ref, _ref1;
      if (this.element.tagName === "form") {
        this.element.setAttribute("enctype", "multipart/form-data");
      }
      if (this.element.classList.contains("dropzone") && !this.element.querySelector(".dz-message")) {
        this.element.appendChild(Dropzone.createElement("<div class=\"dz-default dz-message\"><span>" + this.options.dictDefaultMessage + "</span></div>"));
      }
      if (this.clickableElements.length) {
        setupHiddenFileInput = (function(_this) {
          return function() {
            if (_this.hiddenFileInput) {
              _this.hiddenFileInput.parentNode.removeChild(_this.hiddenFileInput);
            }
            _this.hiddenFileInput = document.createElement("input");
            _this.hiddenFileInput.setAttribute("type", "file");
            if ((_this.options.maxFiles == null) || _this.options.maxFiles > 1) {
              _this.hiddenFileInput.setAttribute("multiple", "multiple");
            }
            _this.hiddenFileInput.className = "dz-hidden-input";
            if (_this.options.acceptedFiles != null) {
              _this.hiddenFileInput.setAttribute("accept", _this.options.acceptedFiles);
            }
            if (_this.options.capture != null) {
              _this.hiddenFileInput.setAttribute("capture", _this.options.capture);
            }
            _this.hiddenFileInput.style.visibility = "hidden";
            _this.hiddenFileInput.style.position = "absolute";
            _this.hiddenFileInput.style.top = "0";
            _this.hiddenFileInput.style.left = "0";
            _this.hiddenFileInput.style.height = "0";
            _this.hiddenFileInput.style.width = "0";
            document.querySelector(_this.options.hiddenInputContainer).appendChild(_this.hiddenFileInput);
            return _this.hiddenFileInput.addEventListener("change", function() {
              var file, files, _i, _len;
              files = _this.hiddenFileInput.files;
              if (files.length) {
                for (_i = 0, _len = files.length; _i < _len; _i++) {
                  file = files[_i];
                  _this.addFile(file);
                }
              }
              _this.emit("addedfiles", files);
              return setupHiddenFileInput();
            });
          };
        })(this);
        setupHiddenFileInput();
      }
      this.URL = (_ref = window.URL) != null ? _ref : window.webkitURL;
      _ref1 = this.events;
      for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
        eventName = _ref1[_i];
        this.on(eventName, this.options[eventName]);
      }
      this.on("uploadprogress", (function(_this) {
        return function() {
          return _this.updateTotalUploadProgress();
        };
      })(this));
      this.on("removedfile", (function(_this) {
        return function() {
          return _this.updateTotalUploadProgress();
        };
      })(this));
      this.on("canceled", (function(_this) {
        return function(file) {
          return _this.emit("complete", file);
        };
      })(this));
      this.on("complete", (function(_this) {
        return function(file) {
          if (_this.getAddedFiles().length === 0 && _this.getUploadingFiles().length === 0 && _this.getQueuedFiles().length === 0) {
            return setTimeout((function() {
              return _this.emit("queuecomplete");
            }), 0);
          }
        };
      })(this));
      noPropagation = function(e) {
        e.stopPropagation();
        if (e.preventDefault) {
          return e.preventDefault();
        } else {
          return e.returnValue = false;
        }
      };
      this.listeners = [
        {
          element: this.element,
          events: {
            "dragstart": (function(_this) {
              return function(e) {
                return _this.emit("dragstart", e);
              };
            })(this),
            "dragenter": (function(_this) {
              return function(e) {
                noPropagation(e);
                return _this.emit("dragenter", e);
              };
            })(this),
            "dragover": (function(_this) {
              return function(e) {
                var efct;
                try {
                  efct = e.dataTransfer.effectAllowed;
                } catch (_error) {}
                e.dataTransfer.dropEffect = 'move' === efct || 'linkMove' === efct ? 'move' : 'copy';
                noPropagation(e);
                return _this.emit("dragover", e);
              };
            })(this),
            "dragleave": (function(_this) {
              return function(e) {
                return _this.emit("dragleave", e);
              };
            })(this),
            "drop": (function(_this) {
              return function(e) {
                noPropagation(e);
                return _this.drop(e);
              };
            })(this),
            "dragend": (function(_this) {
              return function(e) {
                return _this.emit("dragend", e);
              };
            })(this)
          }
        }
      ];
      this.clickableElements.forEach((function(_this) {
        return function(clickableElement) {
          return _this.listeners.push({
            element: clickableElement,
            events: {
              "click": function(evt) {
                if ((clickableElement !== _this.element) || (evt.target === _this.element || Dropzone.elementInside(evt.target, _this.element.querySelector(".dz-message")))) {
                  _this.hiddenFileInput.click();
                }
                return true;
              }
            }
          });
        };
      })(this));
      this.enable();
      return this.options.init.call(this);
    };

    Dropzone.prototype.destroy = function() {
      var _ref;
      this.disable();
      this.removeAllFiles(true);
      if ((_ref = this.hiddenFileInput) != null ? _ref.parentNode : void 0) {
        this.hiddenFileInput.parentNode.removeChild(this.hiddenFileInput);
        this.hiddenFileInput = null;
      }
      delete this.element.dropzone;
      return Dropzone.instances.splice(Dropzone.instances.indexOf(this), 1);
    };

    Dropzone.prototype.updateTotalUploadProgress = function() {
      var activeFiles, file, totalBytes, totalBytesSent, totalUploadProgress, _i, _len, _ref;
      totalBytesSent = 0;
      totalBytes = 0;
      activeFiles = this.getActiveFiles();
      if (activeFiles.length) {
        _ref = this.getActiveFiles();
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          file = _ref[_i];
          totalBytesSent += file.upload.bytesSent;
          totalBytes += file.upload.total;
        }
        totalUploadProgress = 100 * totalBytesSent / totalBytes;
      } else {
        totalUploadProgress = 100;
      }
      return this.emit("totaluploadprogress", totalUploadProgress, totalBytes, totalBytesSent);
    };

    Dropzone.prototype._getParamName = function(n) {
      if (typeof this.options.paramName === "function") {
        return this.options.paramName(n);
      } else {
        return "" + this.options.paramName + (this.options.uploadMultiple ? "[" + n + "]" : "");
      }
    };

    Dropzone.prototype._renameFilename = function(name) {
      if (typeof this.options.renameFilename !== "function") {
        return name;
      }
      return this.options.renameFilename(name);
    };

    Dropzone.prototype.getFallbackForm = function() {
      var existingFallback, fields, fieldsString, form;
      if (existingFallback = this.getExistingFallback()) {
        return existingFallback;
      }
      fieldsString = "<div class=\"dz-fallback\">";
      if (this.options.dictFallbackText) {
        fieldsString += "<p>" + this.options.dictFallbackText + "</p>";
      }
      fieldsString += "<input type=\"file\" name=\"" + (this._getParamName(0)) + "\" " + (this.options.uploadMultiple ? 'multiple="multiple"' : void 0) + " /><input type=\"submit\" value=\"Upload!\"></div>";
      fields = Dropzone.createElement(fieldsString);
      if (this.element.tagName !== "FORM") {
        form = Dropzone.createElement("<form action=\"" + this.options.url + "\" enctype=\"multipart/form-data\" method=\"" + this.options.method + "\"></form>");
        form.appendChild(fields);
      } else {
        this.element.setAttribute("enctype", "multipart/form-data");
        this.element.setAttribute("method", this.options.method);
      }
      return form != null ? form : fields;
    };

    Dropzone.prototype.getExistingFallback = function() {
      var fallback, getFallback, tagName, _i, _len, _ref;
      getFallback = function(elements) {
        var el, _i, _len;
        for (_i = 0, _len = elements.length; _i < _len; _i++) {
          el = elements[_i];
          if (/(^| )fallback($| )/.test(el.className)) {
            return el;
          }
        }
      };
      _ref = ["div", "form"];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        tagName = _ref[_i];
        if (fallback = getFallback(this.element.getElementsByTagName(tagName))) {
          return fallback;
        }
      }
    };

    Dropzone.prototype.setupEventListeners = function() {
      var elementListeners, event, listener, _i, _len, _ref, _results;
      _ref = this.listeners;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        elementListeners = _ref[_i];
        _results.push((function() {
          var _ref1, _results1;
          _ref1 = elementListeners.events;
          _results1 = [];
          for (event in _ref1) {
            listener = _ref1[event];
            _results1.push(elementListeners.element.addEventListener(event, listener, false));
          }
          return _results1;
        })());
      }
      return _results;
    };

    Dropzone.prototype.removeEventListeners = function() {
      var elementListeners, event, listener, _i, _len, _ref, _results;
      _ref = this.listeners;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        elementListeners = _ref[_i];
        _results.push((function() {
          var _ref1, _results1;
          _ref1 = elementListeners.events;
          _results1 = [];
          for (event in _ref1) {
            listener = _ref1[event];
            _results1.push(elementListeners.element.removeEventListener(event, listener, false));
          }
          return _results1;
        })());
      }
      return _results;
    };

    Dropzone.prototype.disable = function() {
      var file, _i, _len, _ref, _results;
      this.clickableElements.forEach(function(element) {
        return element.classList.remove("dz-clickable");
      });
      this.removeEventListeners();
      _ref = this.files;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        file = _ref[_i];
        _results.push(this.cancelUpload(file));
      }
      return _results;
    };

    Dropzone.prototype.enable = function() {
      this.clickableElements.forEach(function(element) {
        return element.classList.add("dz-clickable");
      });
      return this.setupEventListeners();
    };

    Dropzone.prototype.filesize = function(size) {
      var cutoff, i, selectedSize, selectedUnit, unit, units, _i, _len;
      selectedSize = 0;
      selectedUnit = "b";
      if (size > 0) {
        units = ['TB', 'GB', 'MB', 'KB', 'b'];
        for (i = _i = 0, _len = units.length; _i < _len; i = ++_i) {
          unit = units[i];
          cutoff = Math.pow(this.options.filesizeBase, 4 - i) / 10;
          if (size >= cutoff) {
            selectedSize = size / Math.pow(this.options.filesizeBase, 4 - i);
            selectedUnit = unit;
            break;
          }
        }
        selectedSize = Math.round(10 * selectedSize) / 10;
      }
      return "<strong>" + selectedSize + "</strong> " + selectedUnit;
    };

    Dropzone.prototype._updateMaxFilesReachedClass = function() {
      if ((this.options.maxFiles != null) && this.getAcceptedFiles().length >= this.options.maxFiles) {
        if (this.getAcceptedFiles().length === this.options.maxFiles) {
          this.emit('maxfilesreached', this.files);
        }
        return this.element.classList.add("dz-max-files-reached");
      } else {
        return this.element.classList.remove("dz-max-files-reached");
      }
    };

    Dropzone.prototype.drop = function(e) {
      var files, items;
      if (!e.dataTransfer) {
        return;
      }
      this.emit("drop", e);
      files = e.dataTransfer.files;
      this.emit("addedfiles", files);
      if (files.length) {
        items = e.dataTransfer.items;
        if (items && items.length && (items[0].webkitGetAsEntry != null)) {
          this._addFilesFromItems(items);
        } else {
          this.handleFiles(files);
        }
      }
    };

    Dropzone.prototype.paste = function(e) {
      var items, _ref;
      if ((e != null ? (_ref = e.clipboardData) != null ? _ref.items : void 0 : void 0) == null) {
        return;
      }
      this.emit("paste", e);
      items = e.clipboardData.items;
      if (items.length) {
        return this._addFilesFromItems(items);
      }
    };

    Dropzone.prototype.handleFiles = function(files) {
      var file, _i, _len, _results;
      _results = [];
      for (_i = 0, _len = files.length; _i < _len; _i++) {
        file = files[_i];
        _results.push(this.addFile(file));
      }
      return _results;
    };

    Dropzone.prototype._addFilesFromItems = function(items) {
      var entry, item, _i, _len, _results;
      _results = [];
      for (_i = 0, _len = items.length; _i < _len; _i++) {
        item = items[_i];
        if ((item.webkitGetAsEntry != null) && (entry = item.webkitGetAsEntry())) {
          if (entry.isFile) {
            _results.push(this.addFile(item.getAsFile()));
          } else if (entry.isDirectory) {
            _results.push(this._addFilesFromDirectory(entry, entry.name));
          } else {
            _results.push(void 0);
          }
        } else if (item.getAsFile != null) {
          if ((item.kind == null) || item.kind === "file") {
            _results.push(this.addFile(item.getAsFile()));
          } else {
            _results.push(void 0);
          }
        } else {
          _results.push(void 0);
        }
      }
      return _results;
    };

    Dropzone.prototype._addFilesFromDirectory = function(directory, path) {
      var dirReader, errorHandler, readEntries;
      dirReader = directory.createReader();
      errorHandler = function(error) {
        return typeof console !== "undefined" && console !== null ? typeof console.log === "function" ? console.log(error) : void 0 : void 0;
      };
      readEntries = (function(_this) {
        return function() {
          return dirReader.readEntries(function(entries) {
            var entry, _i, _len;
            if (entries.length > 0) {
              for (_i = 0, _len = entries.length; _i < _len; _i++) {
                entry = entries[_i];
                if (entry.isFile) {
                  entry.file(function(file) {
                    if (_this.options.ignoreHiddenFiles && file.name.substring(0, 1) === '.') {
                      return;
                    }
                    file.fullPath = "" + path + "/" + file.name;
                    return _this.addFile(file);
                  });
                } else if (entry.isDirectory) {
                  _this._addFilesFromDirectory(entry, "" + path + "/" + entry.name);
                }
              }
              readEntries();
            }
            return null;
          }, errorHandler);
        };
      })(this);
      return readEntries();
    };

    Dropzone.prototype.accept = function(file, done) {
      if (file.size > this.options.maxFilesize * 1024 * 1024) {
        return done(this.options.dictFileTooBig.replace("{{filesize}}", Math.round(file.size / 1024 / 10.24) / 100).replace("{{maxFilesize}}", this.options.maxFilesize));
      } else if (!Dropzone.isValidFile(file, this.options.acceptedFiles)) {
        return done(this.options.dictInvalidFileType);
      } else if ((this.options.maxFiles != null) && this.getAcceptedFiles().length >= this.options.maxFiles) {
        done(this.options.dictMaxFilesExceeded.replace("{{maxFiles}}", this.options.maxFiles));
        return this.emit("maxfilesexceeded", file);
      } else {
        return this.options.accept.call(this, file, done);
      }
    };

    Dropzone.prototype.addFile = function(file) {
      file.upload = {
        progress: 0,
        total: file.size,
        bytesSent: 0
      };
      this.files.push(file);
      file.status = Dropzone.ADDED;
      this.emit("addedfile", file);
      this._enqueueThumbnail(file);
      return this.accept(file, (function(_this) {
        return function(error) {
          if (error) {
            file.accepted = false;
            _this._errorProcessing([file], error);
          } else {
            file.accepted = true;
            if (_this.options.autoQueue) {
              _this.enqueueFile(file);
            }
          }
          return _this._updateMaxFilesReachedClass();
        };
      })(this));
    };

    Dropzone.prototype.enqueueFiles = function(files) {
      var file, _i, _len;
      for (_i = 0, _len = files.length; _i < _len; _i++) {
        file = files[_i];
        this.enqueueFile(file);
      }
      return null;
    };

    Dropzone.prototype.enqueueFile = function(file) {
      if (file.status === Dropzone.ADDED && file.accepted === true) {
        file.status = Dropzone.QUEUED;
        if (this.options.autoProcessQueue) {
          return setTimeout(((function(_this) {
            return function() {
              return _this.processQueue();
            };
          })(this)), 0);
        }
      } else {
        throw new Error("This file can't be queued because it has already been processed or was rejected.");
      }
    };

    Dropzone.prototype._thumbnailQueue = [];

    Dropzone.prototype._processingThumbnail = false;

    Dropzone.prototype._enqueueThumbnail = function(file) {
      if (this.options.createImageThumbnails && file.type.match(/image.*/) && file.size <= this.options.maxThumbnailFilesize * 1024 * 1024) {
        this._thumbnailQueue.push(file);
        return setTimeout(((function(_this) {
          return function() {
            return _this._processThumbnailQueue();
          };
        })(this)), 0);
      }
    };

    Dropzone.prototype._processThumbnailQueue = function() {
      if (this._processingThumbnail || this._thumbnailQueue.length === 0) {
        return;
      }
      this._processingThumbnail = true;
      return this.createThumbnail(this._thumbnailQueue.shift(), (function(_this) {
        return function() {
          _this._processingThumbnail = false;
          return _this._processThumbnailQueue();
        };
      })(this));
    };

    Dropzone.prototype.removeFile = function(file) {
      if (file.status === Dropzone.UPLOADING) {
        this.cancelUpload(file);
      }
      this.files = without(this.files, file);
      this.emit("removedfile", file);
      if (this.files.length === 0) {
        return this.emit("reset");
      }
    };

    Dropzone.prototype.removeAllFiles = function(cancelIfNecessary) {
      var file, _i, _len, _ref;
      if (cancelIfNecessary == null) {
        cancelIfNecessary = false;
      }
      _ref = this.files.slice();
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        file = _ref[_i];
        if (file.status !== Dropzone.UPLOADING || cancelIfNecessary) {
          this.removeFile(file);
        }
      }
      return null;
    };

    Dropzone.prototype.createThumbnail = function(file, callback) {
      var fileReader;
      fileReader = new FileReader;
      fileReader.onload = (function(_this) {
        return function() {
          if (file.type === "image/svg+xml") {
            _this.emit("thumbnail", file, fileReader.result);
            if (callback != null) {
              callback();
            }
            return;
          }
          return _this.createThumbnailFromUrl(file, fileReader.result, callback);
        };
      })(this);
      return fileReader.readAsDataURL(file);
    };

    Dropzone.prototype.createThumbnailFromUrl = function(file, imageUrl, callback, crossOrigin) {
      var img;
      img = document.createElement("img");
      if (crossOrigin) {
        img.crossOrigin = crossOrigin;
      }
      img.onload = (function(_this) {
        return function() {
          var canvas, ctx, resizeInfo, thumbnail, _ref, _ref1, _ref2, _ref3;
          file.width = img.width;
          file.height = img.height;
          resizeInfo = _this.options.resize.call(_this, file);
          if (resizeInfo.trgWidth == null) {
            resizeInfo.trgWidth = resizeInfo.optWidth;
          }
          if (resizeInfo.trgHeight == null) {
            resizeInfo.trgHeight = resizeInfo.optHeight;
          }
          canvas = document.createElement("canvas");
          ctx = canvas.getContext("2d");
          canvas.width = resizeInfo.trgWidth;
          canvas.height = resizeInfo.trgHeight;
          drawImageIOSFix(ctx, img, (_ref = resizeInfo.srcX) != null ? _ref : 0, (_ref1 = resizeInfo.srcY) != null ? _ref1 : 0, resizeInfo.srcWidth, resizeInfo.srcHeight, (_ref2 = resizeInfo.trgX) != null ? _ref2 : 0, (_ref3 = resizeInfo.trgY) != null ? _ref3 : 0, resizeInfo.trgWidth, resizeInfo.trgHeight);
          thumbnail = canvas.toDataURL("image/png");
          _this.emit("thumbnail", file, thumbnail);
          if (callback != null) {
            return callback();
          }
        };
      })(this);
      if (callback != null) {
        img.onerror = callback;
      }
      return img.src = imageUrl;
    };

    Dropzone.prototype.processQueue = function() {
      var i, parallelUploads, processingLength, queuedFiles;
      parallelUploads = this.options.parallelUploads;
      processingLength = this.getUploadingFiles().length;
      i = processingLength;
      if (processingLength >= parallelUploads) {
        return;
      }
      queuedFiles = this.getQueuedFiles();
      if (!(queuedFiles.length > 0)) {
        return;
      }
      if (this.options.uploadMultiple) {
        return this.processFiles(queuedFiles.slice(0, parallelUploads - processingLength));
      } else {
        while (i < parallelUploads) {
          if (!queuedFiles.length) {
            return;
          }
          this.processFile(queuedFiles.shift());
          i++;
        }
      }
    };

    Dropzone.prototype.processFile = function(file) {
      return this.processFiles([file]);
    };

    Dropzone.prototype.processFiles = function(files) {
      var file, _i, _len;
      for (_i = 0, _len = files.length; _i < _len; _i++) {
        file = files[_i];
        file.processing = true;
        file.status = Dropzone.UPLOADING;
        this.emit("processing", file);
      }
      if (this.options.uploadMultiple) {
        this.emit("processingmultiple", files);
      }
      return this.uploadFiles(files);
    };

    Dropzone.prototype._getFilesWithXhr = function(xhr) {
      var file, files;
      return files = (function() {
        var _i, _len, _ref, _results;
        _ref = this.files;
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          file = _ref[_i];
          if (file.xhr === xhr) {
            _results.push(file);
          }
        }
        return _results;
      }).call(this);
    };

    Dropzone.prototype.cancelUpload = function(file) {
      var groupedFile, groupedFiles, _i, _j, _len, _len1, _ref;
      if (file.status === Dropzone.UPLOADING) {
        groupedFiles = this._getFilesWithXhr(file.xhr);
        for (_i = 0, _len = groupedFiles.length; _i < _len; _i++) {
          groupedFile = groupedFiles[_i];
          groupedFile.status = Dropzone.CANCELED;
        }
        file.xhr.abort();
        for (_j = 0, _len1 = groupedFiles.length; _j < _len1; _j++) {
          groupedFile = groupedFiles[_j];
          this.emit("canceled", groupedFile);
        }
        if (this.options.uploadMultiple) {
          this.emit("canceledmultiple", groupedFiles);
        }
      } else if ((_ref = file.status) === Dropzone.ADDED || _ref === Dropzone.QUEUED) {
        file.status = Dropzone.CANCELED;
        this.emit("canceled", file);
        if (this.options.uploadMultiple) {
          this.emit("canceledmultiple", [file]);
        }
      }
      if (this.options.autoProcessQueue) {
        return this.processQueue();
      }
    };

    resolveOption = function() {
      var args, option;
      option = arguments[0], args = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
      if (typeof option === 'function') {
        return option.apply(this, args);
      }
      return option;
    };

    Dropzone.prototype.uploadFile = function(file) {
      return this.uploadFiles([file]);
    };

    Dropzone.prototype.uploadFiles = function(files) {
      var file, formData, handleError, headerName, headerValue, headers, i, input, inputName, inputType, key, method, option, progressObj, response, updateProgress, url, value, xhr, _i, _j, _k, _l, _len, _len1, _len2, _len3, _m, _ref, _ref1, _ref2, _ref3, _ref4, _ref5;
      xhr = new XMLHttpRequest();
      for (_i = 0, _len = files.length; _i < _len; _i++) {
        file = files[_i];
        file.xhr = xhr;
      }
      method = resolveOption(this.options.method, files);
      url = resolveOption(this.options.url, files);
      xhr.open(method, url, true);
      xhr.withCredentials = !!this.options.withCredentials;
      response = null;
      handleError = (function(_this) {
        return function() {
          var _j, _len1, _results;
          _results = [];
          for (_j = 0, _len1 = files.length; _j < _len1; _j++) {
            file = files[_j];
            _results.push(_this._errorProcessing(files, response || _this.options.dictResponseError.replace("{{statusCode}}", xhr.status), xhr));
          }
          return _results;
        };
      })(this);
      updateProgress = (function(_this) {
        return function(e) {
          var allFilesFinished, progress, _j, _k, _l, _len1, _len2, _len3, _results;
          if (e != null) {
            progress = 100 * e.loaded / e.total;
            for (_j = 0, _len1 = files.length; _j < _len1; _j++) {
              file = files[_j];
              file.upload = {
                progress: progress,
                total: e.total,
                bytesSent: e.loaded
              };
            }
          } else {
            allFilesFinished = true;
            progress = 100;
            for (_k = 0, _len2 = files.length; _k < _len2; _k++) {
              file = files[_k];
              if (!(file.upload.progress === 100 && file.upload.bytesSent === file.upload.total)) {
                allFilesFinished = false;
              }
              file.upload.progress = progress;
              file.upload.bytesSent = file.upload.total;
            }
            if (allFilesFinished) {
              return;
            }
          }
          _results = [];
          for (_l = 0, _len3 = files.length; _l < _len3; _l++) {
            file = files[_l];
            _results.push(_this.emit("uploadprogress", file, progress, file.upload.bytesSent));
          }
          return _results;
        };
      })(this);
      xhr.onload = (function(_this) {
        return function(e) {
          var _ref;
          if (files[0].status === Dropzone.CANCELED) {
            return;
          }
          if (xhr.readyState !== 4) {
            return;
          }
          response = xhr.responseText;
          if (xhr.getResponseHeader("content-type") && ~xhr.getResponseHeader("content-type").indexOf("application/json")) {
            try {
              response = JSON.parse(response);
            } catch (_error) {
              e = _error;
              response = "Invalid JSON response from server.";
            }
          }
          updateProgress();
          if (!((200 <= (_ref = xhr.status) && _ref < 300))) {
            return handleError();
          } else {
            return _this._finished(files, response, e);
          }
        };
      })(this);
      xhr.onerror = (function(_this) {
        return function() {
          if (files[0].status === Dropzone.CANCELED) {
            return;
          }
          return handleError();
        };
      })(this);
      progressObj = (_ref = xhr.upload) != null ? _ref : xhr;
      progressObj.onprogress = updateProgress;
      headers = {
        "Accept": "application/json",
        "Cache-Control": "no-cache",
        "X-Requested-With": "XMLHttpRequest"
      };
      if (this.options.headers) {
        extend(headers, this.options.headers);
      }
      for (headerName in headers) {
        headerValue = headers[headerName];
        if (headerValue) {
          xhr.setRequestHeader(headerName, headerValue);
        }
      }
      formData = new FormData();
      if (this.options.params) {
        _ref1 = this.options.params;
        for (key in _ref1) {
          value = _ref1[key];
          formData.append(key, value);
        }
      }
      for (_j = 0, _len1 = files.length; _j < _len1; _j++) {
        file = files[_j];
        this.emit("sending", file, xhr, formData);
      }
      if (this.options.uploadMultiple) {
        this.emit("sendingmultiple", files, xhr, formData);
      }
      if (this.element.tagName === "FORM") {
        _ref2 = this.element.querySelectorAll("input, textarea, select, button");
        for (_k = 0, _len2 = _ref2.length; _k < _len2; _k++) {
          input = _ref2[_k];
          inputName = input.getAttribute("name");
          inputType = input.getAttribute("type");
          if (input.tagName === "SELECT" && input.hasAttribute("multiple")) {
            _ref3 = input.options;
            for (_l = 0, _len3 = _ref3.length; _l < _len3; _l++) {
              option = _ref3[_l];
              if (option.selected) {
                formData.append(inputName, option.value);
              }
            }
          } else if (!inputType || ((_ref4 = inputType.toLowerCase()) !== "checkbox" && _ref4 !== "radio") || input.checked) {
            formData.append(inputName, input.value);
          }
        }
      }
      for (i = _m = 0, _ref5 = files.length - 1; 0 <= _ref5 ? _m <= _ref5 : _m >= _ref5; i = 0 <= _ref5 ? ++_m : --_m) {
        formData.append(this._getParamName(i), files[i], this._renameFilename(files[i].name));
      }
      return this.submitRequest(xhr, formData, files);
    };

    Dropzone.prototype.submitRequest = function(xhr, formData, files) {
      return xhr.send(formData);
    };

    Dropzone.prototype._finished = function(files, responseText, e) {
      var file, _i, _len;
      for (_i = 0, _len = files.length; _i < _len; _i++) {
        file = files[_i];
        file.status = Dropzone.SUCCESS;
        this.emit("success", file, responseText, e);
        this.emit("complete", file);
      }
      if (this.options.uploadMultiple) {
        this.emit("successmultiple", files, responseText, e);
        this.emit("completemultiple", files);
      }
      if (this.options.autoProcessQueue) {
        return this.processQueue();
      }
    };

    Dropzone.prototype._errorProcessing = function(files, message, xhr) {
      var file, _i, _len;
      for (_i = 0, _len = files.length; _i < _len; _i++) {
        file = files[_i];
        file.status = Dropzone.ERROR;
        this.emit("error", file, message, xhr);
        this.emit("complete", file);
      }
      if (this.options.uploadMultiple) {
        this.emit("errormultiple", files, message, xhr);
        this.emit("completemultiple", files);
      }
      if (this.options.autoProcessQueue) {
        return this.processQueue();
      }
    };

    return Dropzone;

  })(Emitter);

  Dropzone.version = "4.3.0";

  Dropzone.options = {};

  Dropzone.optionsForElement = function(element) {
    if (element.getAttribute("id")) {
      return Dropzone.options[camelize(element.getAttribute("id"))];
    } else {
      return void 0;
    }
  };

  Dropzone.instances = [];

  Dropzone.forElement = function(element) {
    if (typeof element === "string") {
      element = document.querySelector(element);
    }
    if ((element != null ? element.dropzone : void 0) == null) {
      throw new Error("No Dropzone found for given element. This is probably because you're trying to access it before Dropzone had the time to initialize. Use the `init` option to setup any additional observers on your Dropzone.");
    }
    return element.dropzone;
  };

  Dropzone.autoDiscover = true;

  Dropzone.discover = function() {
    var checkElements, dropzone, dropzones, _i, _len, _results;
    if (document.querySelectorAll) {
      dropzones = document.querySelectorAll(".dropzone");
    } else {
      dropzones = [];
      checkElements = function(elements) {
        var el, _i, _len, _results;
        _results = [];
        for (_i = 0, _len = elements.length; _i < _len; _i++) {
          el = elements[_i];
          if (/(^| )dropzone($| )/.test(el.className)) {
            _results.push(dropzones.push(el));
          } else {
            _results.push(void 0);
          }
        }
        return _results;
      };
      checkElements(document.getElementsByTagName("div"));
      checkElements(document.getElementsByTagName("form"));
    }
    _results = [];
    for (_i = 0, _len = dropzones.length; _i < _len; _i++) {
      dropzone = dropzones[_i];
      if (Dropzone.optionsForElement(dropzone) !== false) {
        _results.push(new Dropzone(dropzone));
      } else {
        _results.push(void 0);
      }
    }
    return _results;
  };

  Dropzone.blacklistedBrowsers = [/opera.*Macintosh.*version\/12/i];

  Dropzone.isBrowserSupported = function() {
    var capableBrowser, regex, _i, _len, _ref;
    capableBrowser = true;
    if (window.File && window.FileReader && window.FileList && window.Blob && window.FormData && document.querySelector) {
      if (!("classList" in document.createElement("a"))) {
        capableBrowser = false;
      } else {
        _ref = Dropzone.blacklistedBrowsers;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          regex = _ref[_i];
          if (regex.test(navigator.userAgent)) {
            capableBrowser = false;
            continue;
          }
        }
      }
    } else {
      capableBrowser = false;
    }
    return capableBrowser;
  };

  without = function(list, rejectedItem) {
    var item, _i, _len, _results;
    _results = [];
    for (_i = 0, _len = list.length; _i < _len; _i++) {
      item = list[_i];
      if (item !== rejectedItem) {
        _results.push(item);
      }
    }
    return _results;
  };

  camelize = function(str) {
    return str.replace(/[\-_](\w)/g, function(match) {
      return match.charAt(1).toUpperCase();
    });
  };

  Dropzone.createElement = function(string) {
    var div;
    div = document.createElement("div");
    div.innerHTML = string;
    return div.childNodes[0];
  };

  Dropzone.elementInside = function(element, container) {
    if (element === container) {
      return true;
    }
    while (element = element.parentNode) {
      if (element === container) {
        return true;
      }
    }
    return false;
  };

  Dropzone.getElement = function(el, name) {
    var element;
    if (typeof el === "string") {
      element = document.querySelector(el);
    } else if (el.nodeType != null) {
      element = el;
    }
    if (element == null) {
      throw new Error("Invalid `" + name + "` option provided. Please provide a CSS selector or a plain HTML element.");
    }
    return element;
  };

  Dropzone.getElements = function(els, name) {
    var e, el, elements, _i, _j, _len, _len1, _ref;
    if (els instanceof Array) {
      elements = [];
      try {
        for (_i = 0, _len = els.length; _i < _len; _i++) {
          el = els[_i];
          elements.push(this.getElement(el, name));
        }
      } catch (_error) {
        e = _error;
        elements = null;
      }
    } else if (typeof els === "string") {
      elements = [];
      _ref = document.querySelectorAll(els);
      for (_j = 0, _len1 = _ref.length; _j < _len1; _j++) {
        el = _ref[_j];
        elements.push(el);
      }
    } else if (els.nodeType != null) {
      elements = [els];
    }
    if (!((elements != null) && elements.length)) {
      throw new Error("Invalid `" + name + "` option provided. Please provide a CSS selector, a plain HTML element or a list of those.");
    }
    return elements;
  };

  Dropzone.confirm = function(question, accepted, rejected) {
    if (window.confirm(question)) {
      return accepted();
    } else if (rejected != null) {
      return rejected();
    }
  };

  Dropzone.isValidFile = function(file, acceptedFiles) {
    var baseMimeType, mimeType, validType, _i, _len;
    if (!acceptedFiles) {
      return true;
    }
    acceptedFiles = acceptedFiles.split(",");
    mimeType = file.type;
    baseMimeType = mimeType.replace(/\/.*$/, "");
    for (_i = 0, _len = acceptedFiles.length; _i < _len; _i++) {
      validType = acceptedFiles[_i];
      validType = validType.trim();
      if (validType.charAt(0) === ".") {
        if (file.name.toLowerCase().indexOf(validType.toLowerCase(), file.name.length - validType.length) !== -1) {
          return true;
        }
      } else if (/\/\*$/.test(validType)) {
        if (baseMimeType === validType.replace(/\/.*$/, "")) {
          return true;
        }
      } else {
        if (mimeType === validType) {
          return true;
        }
      }
    }
    return false;
  };

  if (typeof jQuery !== "undefined" && jQuery !== null) {
    jQuery.fn.dropzone = function(options) {
      return this.each(function() {
        return new Dropzone(this, options);
      });
    };
  }

  if (typeof module !== "undefined" && module !== null) {
    module.exports = Dropzone;
  } else {
    window.Dropzone = Dropzone;
  }

  Dropzone.ADDED = "added";

  Dropzone.QUEUED = "queued";

  Dropzone.ACCEPTED = Dropzone.QUEUED;

  Dropzone.UPLOADING = "uploading";

  Dropzone.PROCESSING = Dropzone.UPLOADING;

  Dropzone.CANCELED = "canceled";

  Dropzone.ERROR = "error";

  Dropzone.SUCCESS = "success";


  /*
  
  Bugfix for iOS 6 and 7
  Source: http://stackoverflow.com/questions/11929099/html5-canvas-drawimage-ratio-bug-ios
  based on the work of https://github.com/stomita/ios-imagefile-megapixel
   */

  detectVerticalSquash = function(img) {
    var alpha, canvas, ctx, data, ey, ih, iw, py, ratio, sy;
    iw = img.naturalWidth;
    ih = img.naturalHeight;
    canvas = document.createElement("canvas");
    canvas.width = 1;
    canvas.height = ih;
    ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0);
    data = ctx.getImageData(0, 0, 1, ih).data;
    sy = 0;
    ey = ih;
    py = ih;
    while (py > sy) {
      alpha = data[(py - 1) * 4 + 3];
      if (alpha === 0) {
        ey = py;
      } else {
        sy = py;
      }
      py = (ey + sy) >> 1;
    }
    ratio = py / ih;
    if (ratio === 0) {
      return 1;
    } else {
      return ratio;
    }
  };

  drawImageIOSFix = function(ctx, img, sx, sy, sw, sh, dx, dy, dw, dh) {
    var vertSquashRatio;
    vertSquashRatio = detectVerticalSquash(img);
    return ctx.drawImage(img, sx, sy, sw, sh, dx, dy, dw, dh / vertSquashRatio);
  };


  /*
   * contentloaded.js
   *
   * Author: Diego Perini (diego.perini at gmail.com)
   * Summary: cross-browser wrapper for DOMContentLoaded
   * Updated: 20101020
   * License: MIT
   * Version: 1.2
   *
   * URL:
   * http://javascript.nwbox.com/ContentLoaded/
   * http://javascript.nwbox.com/ContentLoaded/MIT-LICENSE
   */

  contentLoaded = function(win, fn) {
    var add, doc, done, init, poll, pre, rem, root, top;
    done = false;
    top = true;
    doc = win.document;
    root = doc.documentElement;
    add = (doc.addEventListener ? "addEventListener" : "attachEvent");
    rem = (doc.addEventListener ? "removeEventListener" : "detachEvent");
    pre = (doc.addEventListener ? "" : "on");
    init = function(e) {
      if (e.type === "readystatechange" && doc.readyState !== "complete") {
        return;
      }
      (e.type === "load" ? win : doc)[rem](pre + e.type, init, false);
      if (!done && (done = true)) {
        return fn.call(win, e.type || e);
      }
    };
    poll = function() {
      var e;
      try {
        root.doScroll("left");
      } catch (_error) {
        e = _error;
        setTimeout(poll, 50);
        return;
      }
      return init("poll");
    };
    if (doc.readyState !== "complete") {
      if (doc.createEventObject && root.doScroll) {
        try {
          top = !win.frameElement;
        } catch (_error) {}
        if (top) {
          poll();
        }
      }
      doc[add](pre + "DOMContentLoaded", init, false);
      doc[add](pre + "readystatechange", init, false);
      return win[add](pre + "load", init, false);
    }
  };

  Dropzone._autoDiscoverFunction = function() {
    if (Dropzone.autoDiscover) {
      return Dropzone.discover();
    }
  };

  contentLoaded(window, Dropzone._autoDiscoverFunction);

}).call(this);

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(23), __webpack_require__(469)(module)))

/***/ },

/***/ 754:
/***/ function(module, exports) {

if (typeof Object.create === 'function') {
  // implementation from standard node.js 'util' module
  module.exports = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor
    ctor.prototype = Object.create(superCtor.prototype, {
      constructor: {
        value: ctor,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
  };
} else {
  // old school shim for old browsers
  module.exports = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor
    var TempCtor = function () {}
    TempCtor.prototype = superCtor.prototype
    ctor.prototype = new TempCtor()
    ctor.prototype.constructor = ctor
  }
}


/***/ },

/***/ 757:
/***/ function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(__webpack_provided_window_dot_jQuery) {/* ===========================================================
 * Bootstrap: inputmask.js v3.1.0
 * http://jasny.github.io/bootstrap/javascript/#inputmask
 * 
 * Based on Masked Input plugin by Josh Bush (digitalbush.com)
 * ===========================================================
 * Copyright 2012-2014 Arnold Daniels
 *
 * Licensed under the Apache License, Version 2.0 (the "License")
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ========================================================== */

+function ($) { "use strict";

  var isIphone = (window.orientation !== undefined)
  var isAndroid = navigator.userAgent.toLowerCase().indexOf("android") > -1
  var isIE = window.navigator.appName == 'Microsoft Internet Explorer'

  // INPUTMASK PUBLIC CLASS DEFINITION
  // =================================

  var Inputmask = function (element, options) {
    if (isAndroid) return // No support because caret positioning doesn't work on Android
    
    this.$element = $(element)
    this.options = $.extend({}, Inputmask.DEFAULTS, options)
    this.mask = String(this.options.mask)
    
    this.init()
    this.listen()
        
    this.checkVal() //Perform initial check for existing values
  }

  Inputmask.DEFAULTS = {
    mask: "",
    placeholder: "_",
    definitions: {
      '9': "[0-9]",
      'a': "[A-Za-z]",
      'w': "[A-Za-z0-9]",
      '*': "."
    }
  }

  Inputmask.prototype.init = function() {
    var defs = this.options.definitions
    var len = this.mask.length

    this.tests = [] 
    this.partialPosition = this.mask.length
    this.firstNonMaskPos = null

    $.each(this.mask.split(""), $.proxy(function(i, c) {
      if (c == '?') {
        len--
        this.partialPosition = i
      } else if (defs[c]) {
        this.tests.push(new RegExp(defs[c]))
        if (this.firstNonMaskPos === null)
          this.firstNonMaskPos =  this.tests.length - 1
      } else {
        this.tests.push(null)
      }
    }, this))

    this.buffer = $.map(this.mask.split(""), $.proxy(function(c, i) {
      if (c != '?') return defs[c] ? this.options.placeholder : c
    }, this))

    this.focusText = this.$element.val()

    this.$element.data("rawMaskFn", $.proxy(function() {
      return $.map(this.buffer, function(c, i) {
        return this.tests[i] && c != this.options.placeholder ? c : null
      }).join('')
    }, this))
  }
    
  Inputmask.prototype.listen = function() {
    if (this.$element.attr("readonly")) return

    var pasteEventName = (isIE ? 'paste' : 'input') + ".bs.inputmask"

    this.$element
      .on("unmask.bs.inputmask", $.proxy(this.unmask, this))

      .on("focus.bs.inputmask", $.proxy(this.focusEvent, this))
      .on("blur.bs.inputmask", $.proxy(this.blurEvent, this))

      .on("keydown.bs.inputmask", $.proxy(this.keydownEvent, this))
      .on("keypress.bs.inputmask", $.proxy(this.keypressEvent, this))

      .on(pasteEventName, $.proxy(this.pasteEvent, this))
  }

  //Helper Function for Caret positioning
  Inputmask.prototype.caret = function(begin, end) {
    if (this.$element.length === 0) return
    if (typeof begin == 'number') {
      end = (typeof end == 'number') ? end : begin
      return this.$element.each(function() {
        if (this.setSelectionRange) {
          this.setSelectionRange(begin, end)
        } else if (this.createTextRange) {
          var range = this.createTextRange()
          range.collapse(true)
          range.moveEnd('character', end)
          range.moveStart('character', begin)
          range.select()
        }
      })
    } else {
      if (this.$element[0].setSelectionRange) {
        begin = this.$element[0].selectionStart
        end = this.$element[0].selectionEnd
      } else if (document.selection && document.selection.createRange) {
        var range = document.selection.createRange()
        begin = 0 - range.duplicate().moveStart('character', -100000)
        end = begin + range.text.length
      }
      return {
        begin: begin, 
        end: end
      }
    }
  }
  
  Inputmask.prototype.seekNext = function(pos) {
    var len = this.mask.length
    while (++pos <= len && !this.tests[pos]);

    return pos
  }
  
  Inputmask.prototype.seekPrev = function(pos) {
    while (--pos >= 0 && !this.tests[pos]);

    return pos
  }

  Inputmask.prototype.shiftL = function(begin,end) {
    var len = this.mask.length

    if (begin < 0) return

    for (var i = begin, j = this.seekNext(end); i < len; i++) {
      if (this.tests[i]) {
        if (j < len && this.tests[i].test(this.buffer[j])) {
          this.buffer[i] = this.buffer[j]
          this.buffer[j] = this.options.placeholder
        } else
          break
        j = this.seekNext(j)
      }
    }
    this.writeBuffer()
    this.caret(Math.max(this.firstNonMaskPos, begin))
  }

  Inputmask.prototype.shiftR = function(pos) {
    var len = this.mask.length

    for (var i = pos, c = this.options.placeholder; i < len; i++) {
      if (this.tests[i]) {
        var j = this.seekNext(i)
        var t = this.buffer[i]
        this.buffer[i] = c
        if (j < len && this.tests[j].test(t))
          c = t
        else
          break
      }
    }
  },

  Inputmask.prototype.unmask = function() {
    this.$element
      .unbind(".bs.inputmask")
      .removeData("bs.inputmask")
  }

  Inputmask.prototype.focusEvent = function() {
    this.focusText = this.$element.val()
    var len = this.mask.length 
    var pos = this.checkVal()
    this.writeBuffer()

    var that = this
    var moveCaret = function() {
      if (pos == len)
        that.caret(0, pos)
      else
        that.caret(pos)
    }

    moveCaret()
    setTimeout(moveCaret, 50)
  }

  Inputmask.prototype.blurEvent = function() {
    this.checkVal()
    if (this.$element.val() !== this.focusText) {
      this.$element.trigger('change')
      this.$element.trigger('input')
    }
  }

  Inputmask.prototype.keydownEvent = function(e) {
    var k = e.which

    //backspace, delete, and escape get special treatment
    if (k == 8 || k == 46 || (isIphone && k == 127)) {
      var pos = this.caret(),
      begin = pos.begin,
      end = pos.end

      if (end - begin === 0) {
        begin = k != 46 ? this.seekPrev(begin) : (end = this.seekNext(begin - 1))
        end = k == 46 ? this.seekNext(end) : end
      }
      this.clearBuffer(begin, end)
      this.shiftL(begin, end - 1)

      return false
    } else if (k == 27) {//escape
      this.$element.val(this.focusText)
      this.caret(0, this.checkVal())
      return false
    }
  }

  Inputmask.prototype.keypressEvent = function(e) {
    var len = this.mask.length

    var k = e.which,
    pos = this.caret()

    if (e.ctrlKey || e.altKey || e.metaKey || k < 32)  {//Ignore
      return true
    } else if (k) {
      if (pos.end - pos.begin !== 0) {
        this.clearBuffer(pos.begin, pos.end)
        this.shiftL(pos.begin, pos.end - 1)
      }

      var p = this.seekNext(pos.begin - 1)
      if (p < len) {
        var c = String.fromCharCode(k)
        if (this.tests[p].test(c)) {
          this.shiftR(p)
          this.buffer[p] = c
          this.writeBuffer()
          var next = this.seekNext(p)
          this.caret(next)
        }
      }
      return false
    }
  }

  Inputmask.prototype.pasteEvent = function() {
    var that = this

    setTimeout(function() {
      that.caret(that.checkVal(true))
    }, 0)
  }

  Inputmask.prototype.clearBuffer = function(start, end) {
    var len = this.mask.length

    for (var i = start; i < end && i < len; i++) {
      if (this.tests[i])
        this.buffer[i] = this.options.placeholder
    }
  }

  Inputmask.prototype.writeBuffer = function() {
    return this.$element.val(this.buffer.join('')).val()
  }

  Inputmask.prototype.checkVal = function(allow) {
    var len = this.mask.length
    //try to place characters where they belong
    var test = this.$element.val()
    var lastMatch = -1

    for (var i = 0, pos = 0; i < len; i++) {
      if (this.tests[i]) {
        this.buffer[i] = this.options.placeholder
        while (pos++ < test.length) {
          var c = test.charAt(pos - 1)
          if (this.tests[i].test(c)) {
            this.buffer[i] = c
            lastMatch = i
            break
          }
        }
        if (pos > test.length)
          break
      } else if (this.buffer[i] == test.charAt(pos) && i != this.partialPosition) {
        pos++
        lastMatch = i
      }
    }
    if (!allow && lastMatch + 1 < this.partialPosition) {
      this.$element.val("")
      this.clearBuffer(0, len)
    } else if (allow || lastMatch + 1 >= this.partialPosition) {
      this.writeBuffer()
      if (!allow) this.$element.val(this.$element.val().substring(0, lastMatch + 1))
    }
    return (this.partialPosition ? i : this.firstNonMaskPos)
  }

  
  // INPUTMASK PLUGIN DEFINITION
  // ===========================

  var old = $.fn.inputmask
  
  $.fn.inputmask = function (options) {
    return this.each(function () {
      var $this = $(this)
      var data = $this.data('bs.inputmask')
      
      if (!data) $this.data('bs.inputmask', (data = new Inputmask(this, options)))
    })
  }

  $.fn.inputmask.Constructor = Inputmask


  // INPUTMASK NO CONFLICT
  // ====================

  $.fn.inputmask.noConflict = function () {
    $.fn.inputmask = old
    return this
  }


  // INPUTMASK DATA-API
  // ==================

  $(document).on('focus.bs.inputmask.data-api', '[data-mask]', function (e) {
    var $this = $(this)
    if ($this.data('bs.inputmask')) return
    $this.inputmask($this.data())
  })

}(__webpack_provided_window_dot_jQuery);

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(23)))

/***/ },

/***/ 765:
/***/ function(module, exports, __webpack_require__) {

// super simple module for the most common nodejs use case.
exports.markdown = __webpack_require__(766);
exports.parse = exports.markdown.toHTML;


/***/ },

/***/ 766:
/***/ function(module, exports, __webpack_require__) {

// Released under MIT license
// Copyright (c) 2009-2010 Dominic Baggott
// Copyright (c) 2009-2010 Ash Berlin
// Copyright (c) 2011 Christoph Dorn <christoph@christophdorn.com> (http://www.christophdorn.com)

/*jshint browser:true, devel:true */

(function( expose ) {

/**
 *  class Markdown
 *
 *  Markdown processing in Javascript done right. We have very particular views
 *  on what constitutes 'right' which include:
 *
 *  - produces well-formed HTML (this means that em and strong nesting is
 *    important)
 *
 *  - has an intermediate representation to allow processing of parsed data (We
 *    in fact have two, both as [JsonML]: a markdown tree and an HTML tree).
 *
 *  - is easily extensible to add new dialects without having to rewrite the
 *    entire parsing mechanics
 *
 *  - has a good test suite
 *
 *  This implementation fulfills all of these (except that the test suite could
 *  do with expanding to automatically run all the fixtures from other Markdown
 *  implementations.)
 *
 *  ##### Intermediate Representation
 *
 *  *TODO* Talk about this :) Its JsonML, but document the node names we use.
 *
 *  [JsonML]: http://jsonml.org/ "JSON Markup Language"
 **/
var Markdown = expose.Markdown = function(dialect) {
  switch (typeof dialect) {
    case "undefined":
      this.dialect = Markdown.dialects.Gruber;
      break;
    case "object":
      this.dialect = dialect;
      break;
    default:
      if ( dialect in Markdown.dialects ) {
        this.dialect = Markdown.dialects[dialect];
      }
      else {
        throw new Error("Unknown Markdown dialect '" + String(dialect) + "'");
      }
      break;
  }
  this.em_state = [];
  this.strong_state = [];
  this.debug_indent = "";
};

/**
 *  parse( markdown, [dialect] ) -> JsonML
 *  - markdown (String): markdown string to parse
 *  - dialect (String | Dialect): the dialect to use, defaults to gruber
 *
 *  Parse `markdown` and return a markdown document as a Markdown.JsonML tree.
 **/
expose.parse = function( source, dialect ) {
  // dialect will default if undefined
  var md = new Markdown( dialect );
  return md.toTree( source );
};

/**
 *  toHTML( markdown, [dialect]  ) -> String
 *  toHTML( md_tree ) -> String
 *  - markdown (String): markdown string to parse
 *  - md_tree (Markdown.JsonML): parsed markdown tree
 *
 *  Take markdown (either as a string or as a JsonML tree) and run it through
 *  [[toHTMLTree]] then turn it into a well-formated HTML fragment.
 **/
expose.toHTML = function toHTML( source , dialect , options ) {
  var input = expose.toHTMLTree( source , dialect , options );

  return expose.renderJsonML( input );
};

/**
 *  toHTMLTree( markdown, [dialect] ) -> JsonML
 *  toHTMLTree( md_tree ) -> JsonML
 *  - markdown (String): markdown string to parse
 *  - dialect (String | Dialect): the dialect to use, defaults to gruber
 *  - md_tree (Markdown.JsonML): parsed markdown tree
 *
 *  Turn markdown into HTML, represented as a JsonML tree. If a string is given
 *  to this function, it is first parsed into a markdown tree by calling
 *  [[parse]].
 **/
expose.toHTMLTree = function toHTMLTree( input, dialect , options ) {
  // convert string input to an MD tree
  if ( typeof input ==="string" ) input = this.parse( input, dialect );

  // Now convert the MD tree to an HTML tree

  // remove references from the tree
  var attrs = extract_attr( input ),
      refs = {};

  if ( attrs && attrs.references ) {
    refs = attrs.references;
  }

  var html = convert_tree_to_html( input, refs , options );
  merge_text_nodes( html );
  return html;
};

// For Spidermonkey based engines
function mk_block_toSource() {
  return "Markdown.mk_block( " +
          uneval(this.toString()) +
          ", " +
          uneval(this.trailing) +
          ", " +
          uneval(this.lineNumber) +
          " )";
}

// node
function mk_block_inspect() {
  var util = __webpack_require__(1117);
  return "Markdown.mk_block( " +
          util.inspect(this.toString()) +
          ", " +
          util.inspect(this.trailing) +
          ", " +
          util.inspect(this.lineNumber) +
          " )";

}

var mk_block = Markdown.mk_block = function(block, trail, line) {
  // Be helpful for default case in tests.
  if ( arguments.length == 1 ) trail = "\n\n";

  var s = new String(block);
  s.trailing = trail;
  // To make it clear its not just a string
  s.inspect = mk_block_inspect;
  s.toSource = mk_block_toSource;

  if ( line != undefined )
    s.lineNumber = line;

  return s;
};

function count_lines( str ) {
  var n = 0, i = -1;
  while ( ( i = str.indexOf("\n", i + 1) ) !== -1 ) n++;
  return n;
}

// Internal - split source into rough blocks
Markdown.prototype.split_blocks = function splitBlocks( input, startLine ) {
  input = input.replace(/(\r\n|\n|\r)/g, "\n");
  // [\s\S] matches _anything_ (newline or space)
  // [^] is equivalent but doesn't work in IEs.
  var re = /([\s\S]+?)($|\n#|\n(?:\s*\n|$)+)/g,
      blocks = [],
      m;

  var line_no = 1;

  if ( ( m = /^(\s*\n)/.exec(input) ) != null ) {
    // skip (but count) leading blank lines
    line_no += count_lines( m[0] );
    re.lastIndex = m[0].length;
  }

  while ( ( m = re.exec(input) ) !== null ) {
    if (m[2] == "\n#") {
      m[2] = "\n";
      re.lastIndex--;
    }
    blocks.push( mk_block( m[1], m[2], line_no ) );
    line_no += count_lines( m[0] );
  }

  return blocks;
};

/**
 *  Markdown#processBlock( block, next ) -> undefined | [ JsonML, ... ]
 *  - block (String): the block to process
 *  - next (Array): the following blocks
 *
 * Process `block` and return an array of JsonML nodes representing `block`.
 *
 * It does this by asking each block level function in the dialect to process
 * the block until one can. Succesful handling is indicated by returning an
 * array (with zero or more JsonML nodes), failure by a false value.
 *
 * Blocks handlers are responsible for calling [[Markdown#processInline]]
 * themselves as appropriate.
 *
 * If the blocks were split incorrectly or adjacent blocks need collapsing you
 * can adjust `next` in place using shift/splice etc.
 *
 * If any of this default behaviour is not right for the dialect, you can
 * define a `__call__` method on the dialect that will get invoked to handle
 * the block processing.
 */
Markdown.prototype.processBlock = function processBlock( block, next ) {
  var cbs = this.dialect.block,
      ord = cbs.__order__;

  if ( "__call__" in cbs ) {
    return cbs.__call__.call(this, block, next);
  }

  for ( var i = 0; i < ord.length; i++ ) {
    //D:this.debug( "Testing", ord[i] );
    var res = cbs[ ord[i] ].call( this, block, next );
    if ( res ) {
      //D:this.debug("  matched");
      if ( !isArray(res) || ( res.length > 0 && !( isArray(res[0]) ) ) )
        this.debug(ord[i], "didn't return a proper array");
      //D:this.debug( "" );
      return res;
    }
  }

  // Uhoh! no match! Should we throw an error?
  return [];
};

Markdown.prototype.processInline = function processInline( block ) {
  return this.dialect.inline.__call__.call( this, String( block ) );
};

/**
 *  Markdown#toTree( source ) -> JsonML
 *  - source (String): markdown source to parse
 *
 *  Parse `source` into a JsonML tree representing the markdown document.
 **/
// custom_tree means set this.tree to `custom_tree` and restore old value on return
Markdown.prototype.toTree = function toTree( source, custom_root ) {
  var blocks = source instanceof Array ? source : this.split_blocks( source );

  // Make tree a member variable so its easier to mess with in extensions
  var old_tree = this.tree;
  try {
    this.tree = custom_root || this.tree || [ "markdown" ];

    blocks:
    while ( blocks.length ) {
      var b = this.processBlock( blocks.shift(), blocks );

      // Reference blocks and the like won't return any content
      if ( !b.length ) continue blocks;

      this.tree.push.apply( this.tree, b );
    }
    return this.tree;
  }
  finally {
    if ( custom_root ) {
      this.tree = old_tree;
    }
  }
};

// Noop by default
Markdown.prototype.debug = function () {
  var args = Array.prototype.slice.call( arguments);
  args.unshift(this.debug_indent);
  if ( typeof print !== "undefined" )
      print.apply( print, args );
  if ( typeof console !== "undefined" && typeof console.log !== "undefined" )
      console.log.apply( null, args );
}

Markdown.prototype.loop_re_over_block = function( re, block, cb ) {
  // Dont use /g regexps with this
  var m,
      b = block.valueOf();

  while ( b.length && (m = re.exec(b) ) != null ) {
    b = b.substr( m[0].length );
    cb.call(this, m);
  }
  return b;
};

/**
 * Markdown.dialects
 *
 * Namespace of built-in dialects.
 **/
Markdown.dialects = {};

/**
 * Markdown.dialects.Gruber
 *
 * The default dialect that follows the rules set out by John Gruber's
 * markdown.pl as closely as possible. Well actually we follow the behaviour of
 * that script which in some places is not exactly what the syntax web page
 * says.
 **/
Markdown.dialects.Gruber = {
  block: {
    atxHeader: function atxHeader( block, next ) {
      var m = block.match( /^(#{1,6})\s*(.*?)\s*#*\s*(?:\n|$)/ );

      if ( !m ) return undefined;

      var header = [ "header", { level: m[ 1 ].length } ];
      Array.prototype.push.apply(header, this.processInline(m[ 2 ]));

      if ( m[0].length < block.length )
        next.unshift( mk_block( block.substr( m[0].length ), block.trailing, block.lineNumber + 2 ) );

      return [ header ];
    },

    setextHeader: function setextHeader( block, next ) {
      var m = block.match( /^(.*)\n([-=])\2\2+(?:\n|$)/ );

      if ( !m ) return undefined;

      var level = ( m[ 2 ] === "=" ) ? 1 : 2;
      var header = [ "header", { level : level }, m[ 1 ] ];

      if ( m[0].length < block.length )
        next.unshift( mk_block( block.substr( m[0].length ), block.trailing, block.lineNumber + 2 ) );

      return [ header ];
    },

    code: function code( block, next ) {
      // |    Foo
      // |bar
      // should be a code block followed by a paragraph. Fun
      //
      // There might also be adjacent code block to merge.

      var ret = [],
          re = /^(?: {0,3}\t| {4})(.*)\n?/,
          lines;

      // 4 spaces + content
      if ( !block.match( re ) ) return undefined;

      block_search:
      do {
        // Now pull out the rest of the lines
        var b = this.loop_re_over_block(
                  re, block.valueOf(), function( m ) { ret.push( m[1] ); } );

        if ( b.length ) {
          // Case alluded to in first comment. push it back on as a new block
          next.unshift( mk_block(b, block.trailing) );
          break block_search;
        }
        else if ( next.length ) {
          // Check the next block - it might be code too
          if ( !next[0].match( re ) ) break block_search;

          // Pull how how many blanks lines follow - minus two to account for .join
          ret.push ( block.trailing.replace(/[^\n]/g, "").substring(2) );

          block = next.shift();
        }
        else {
          break block_search;
        }
      } while ( true );

      return [ [ "code_block", ret.join("\n") ] ];
    },

    horizRule: function horizRule( block, next ) {
      // this needs to find any hr in the block to handle abutting blocks
      var m = block.match( /^(?:([\s\S]*?)\n)?[ \t]*([-_*])(?:[ \t]*\2){2,}[ \t]*(?:\n([\s\S]*))?$/ );

      if ( !m ) {
        return undefined;
      }

      var jsonml = [ [ "hr" ] ];

      // if there's a leading abutting block, process it
      if ( m[ 1 ] ) {
        jsonml.unshift.apply( jsonml, this.processBlock( m[ 1 ], [] ) );
      }

      // if there's a trailing abutting block, stick it into next
      if ( m[ 3 ] ) {
        next.unshift( mk_block( m[ 3 ] ) );
      }

      return jsonml;
    },

    // There are two types of lists. Tight and loose. Tight lists have no whitespace
    // between the items (and result in text just in the <li>) and loose lists,
    // which have an empty line between list items, resulting in (one or more)
    // paragraphs inside the <li>.
    //
    // There are all sorts weird edge cases about the original markdown.pl's
    // handling of lists:
    //
    // * Nested lists are supposed to be indented by four chars per level. But
    //   if they aren't, you can get a nested list by indenting by less than
    //   four so long as the indent doesn't match an indent of an existing list
    //   item in the 'nest stack'.
    //
    // * The type of the list (bullet or number) is controlled just by the
    //    first item at the indent. Subsequent changes are ignored unless they
    //    are for nested lists
    //
    lists: (function( ) {
      // Use a closure to hide a few variables.
      var any_list = "[*+-]|\\d+\\.",
          bullet_list = /[*+-]/,
          number_list = /\d+\./,
          // Capture leading indent as it matters for determining nested lists.
          is_list_re = new RegExp( "^( {0,3})(" + any_list + ")[ \t]+" ),
          indent_re = "(?: {0,3}\\t| {4})";

      // TODO: Cache this regexp for certain depths.
      // Create a regexp suitable for matching an li for a given stack depth
      function regex_for_depth( depth ) {

        return new RegExp(
          // m[1] = indent, m[2] = list_type
          "(?:^(" + indent_re + "{0," + depth + "} {0,3})(" + any_list + ")\\s+)|" +
          // m[3] = cont
          "(^" + indent_re + "{0," + (depth-1) + "}[ ]{0,4})"
        );
      }
      function expand_tab( input ) {
        return input.replace( / {0,3}\t/g, "    " );
      }

      // Add inline content `inline` to `li`. inline comes from processInline
      // so is an array of content
      function add(li, loose, inline, nl) {
        if ( loose ) {
          li.push( [ "para" ].concat(inline) );
          return;
        }
        // Hmmm, should this be any block level element or just paras?
        var add_to = li[li.length -1] instanceof Array && li[li.length - 1][0] == "para"
                   ? li[li.length -1]
                   : li;

        // If there is already some content in this list, add the new line in
        if ( nl && li.length > 1 ) inline.unshift(nl);

        for ( var i = 0; i < inline.length; i++ ) {
          var what = inline[i],
              is_str = typeof what == "string";
          if ( is_str && add_to.length > 1 && typeof add_to[add_to.length-1] == "string" ) {
            add_to[ add_to.length-1 ] += what;
          }
          else {
            add_to.push( what );
          }
        }
      }

      // contained means have an indent greater than the current one. On
      // *every* line in the block
      function get_contained_blocks( depth, blocks ) {

        var re = new RegExp( "^(" + indent_re + "{" + depth + "}.*?\\n?)*$" ),
            replace = new RegExp("^" + indent_re + "{" + depth + "}", "gm"),
            ret = [];

        while ( blocks.length > 0 ) {
          if ( re.exec( blocks[0] ) ) {
            var b = blocks.shift(),
                // Now remove that indent
                x = b.replace( replace, "");

            ret.push( mk_block( x, b.trailing, b.lineNumber ) );
          }
          else {
            break;
          }
        }
        return ret;
      }

      // passed to stack.forEach to turn list items up the stack into paras
      function paragraphify(s, i, stack) {
        var list = s.list;
        var last_li = list[list.length-1];

        if ( last_li[1] instanceof Array && last_li[1][0] == "para" ) {
          return;
        }
        if ( i + 1 == stack.length ) {
          // Last stack frame
          // Keep the same array, but replace the contents
          last_li.push( ["para"].concat( last_li.splice(1, last_li.length - 1) ) );
        }
        else {
          var sublist = last_li.pop();
          last_li.push( ["para"].concat( last_li.splice(1, last_li.length - 1) ), sublist );
        }
      }

      // The matcher function
      return function( block, next ) {
        var m = block.match( is_list_re );
        if ( !m ) return undefined;

        function make_list( m ) {
          var list = bullet_list.exec( m[2] )
                   ? ["bulletlist"]
                   : ["numberlist"];

          stack.push( { list: list, indent: m[1] } );
          return list;
        }


        var stack = [], // Stack of lists for nesting.
            list = make_list( m ),
            last_li,
            loose = false,
            ret = [ stack[0].list ],
            i;

        // Loop to search over block looking for inner block elements and loose lists
        loose_search:
        while ( true ) {
          // Split into lines preserving new lines at end of line
          var lines = block.split( /(?=\n)/ );

          // We have to grab all lines for a li and call processInline on them
          // once as there are some inline things that can span lines.
          var li_accumulate = "";

          // Loop over the lines in this block looking for tight lists.
          tight_search:
          for ( var line_no = 0; line_no < lines.length; line_no++ ) {
            var nl = "",
                l = lines[line_no].replace(/^\n/, function(n) { nl = n; return ""; });

            // TODO: really should cache this
            var line_re = regex_for_depth( stack.length );

            m = l.match( line_re );
            //print( "line:", uneval(l), "\nline match:", uneval(m) );

            // We have a list item
            if ( m[1] !== undefined ) {
              // Process the previous list item, if any
              if ( li_accumulate.length ) {
                add( last_li, loose, this.processInline( li_accumulate ), nl );
                // Loose mode will have been dealt with. Reset it
                loose = false;
                li_accumulate = "";
              }

              m[1] = expand_tab( m[1] );
              var wanted_depth = Math.floor(m[1].length/4)+1;
              //print( "want:", wanted_depth, "stack:", stack.length);
              if ( wanted_depth > stack.length ) {
                // Deep enough for a nested list outright
                //print ( "new nested list" );
                list = make_list( m );
                last_li.push( list );
                last_li = list[1] = [ "listitem" ];
              }
              else {
                // We aren't deep enough to be strictly a new level. This is
                // where Md.pl goes nuts. If the indent matches a level in the
                // stack, put it there, else put it one deeper then the
                // wanted_depth deserves.
                var found = false;
                for ( i = 0; i < stack.length; i++ ) {
                  if ( stack[ i ].indent != m[1] ) continue;
                  list = stack[ i ].list;
                  stack.splice( i+1, stack.length - (i+1) );
                  found = true;
                  break;
                }

                if (!found) {
                  //print("not found. l:", uneval(l));
                  wanted_depth++;
                  if ( wanted_depth <= stack.length ) {
                    stack.splice(wanted_depth, stack.length - wanted_depth);
                    //print("Desired depth now", wanted_depth, "stack:", stack.length);
                    list = stack[wanted_depth-1].list;
                    //print("list:", uneval(list) );
                  }
                  else {
                    //print ("made new stack for messy indent");
                    list = make_list(m);
                    last_li.push(list);
                  }
                }

                //print( uneval(list), "last", list === stack[stack.length-1].list );
                last_li = [ "listitem" ];
                list.push(last_li);
              } // end depth of shenegains
              nl = "";
            }

            // Add content
            if ( l.length > m[0].length ) {
              li_accumulate += nl + l.substr( m[0].length );
            }
          } // tight_search

          if ( li_accumulate.length ) {
            add( last_li, loose, this.processInline( li_accumulate ), nl );
            // Loose mode will have been dealt with. Reset it
            loose = false;
            li_accumulate = "";
          }

          // Look at the next block - we might have a loose list. Or an extra
          // paragraph for the current li
          var contained = get_contained_blocks( stack.length, next );

          // Deal with code blocks or properly nested lists
          if ( contained.length > 0 ) {
            // Make sure all listitems up the stack are paragraphs
            forEach( stack, paragraphify, this);

            last_li.push.apply( last_li, this.toTree( contained, [] ) );
          }

          var next_block = next[0] && next[0].valueOf() || "";

          if ( next_block.match(is_list_re) || next_block.match( /^ / ) ) {
            block = next.shift();

            // Check for an HR following a list: features/lists/hr_abutting
            var hr = this.dialect.block.horizRule( block, next );

            if ( hr ) {
              ret.push.apply(ret, hr);
              break;
            }

            // Make sure all listitems up the stack are paragraphs
            forEach( stack, paragraphify, this);

            loose = true;
            continue loose_search;
          }
          break;
        } // loose_search

        return ret;
      };
    })(),

    blockquote: function blockquote( block, next ) {
      if ( !block.match( /^>/m ) )
        return undefined;

      var jsonml = [];

      // separate out the leading abutting block, if any. I.e. in this case:
      //
      //  a
      //  > b
      //
      if ( block[ 0 ] != ">" ) {
        var lines = block.split( /\n/ ),
            prev = [],
            line_no = block.lineNumber;

        // keep shifting lines until you find a crotchet
        while ( lines.length && lines[ 0 ][ 0 ] != ">" ) {
            prev.push( lines.shift() );
            line_no++;
        }

        var abutting = mk_block( prev.join( "\n" ), "\n", block.lineNumber );
        jsonml.push.apply( jsonml, this.processBlock( abutting, [] ) );
        // reassemble new block of just block quotes!
        block = mk_block( lines.join( "\n" ), block.trailing, line_no );
      }


      // if the next block is also a blockquote merge it in
      while ( next.length && next[ 0 ][ 0 ] == ">" ) {
        var b = next.shift();
        block = mk_block( block + block.trailing + b, b.trailing, block.lineNumber );
      }

      // Strip off the leading "> " and re-process as a block.
      var input = block.replace( /^> ?/gm, "" ),
          old_tree = this.tree,
          processedBlock = this.toTree( input, [ "blockquote" ] ),
          attr = extract_attr( processedBlock );

      // If any link references were found get rid of them
      if ( attr && attr.references ) {
        delete attr.references;
        // And then remove the attribute object if it's empty
        if ( isEmpty( attr ) ) {
          processedBlock.splice( 1, 1 );
        }
      }

      jsonml.push( processedBlock );
      return jsonml;
    },

    referenceDefn: function referenceDefn( block, next) {
      var re = /^\s*\[(.*?)\]:\s*(\S+)(?:\s+(?:(['"])(.*?)\3|\((.*?)\)))?\n?/;
      // interesting matches are [ , ref_id, url, , title, title ]

      if ( !block.match(re) )
        return undefined;

      // make an attribute node if it doesn't exist
      if ( !extract_attr( this.tree ) ) {
        this.tree.splice( 1, 0, {} );
      }

      var attrs = extract_attr( this.tree );

      // make a references hash if it doesn't exist
      if ( attrs.references === undefined ) {
        attrs.references = {};
      }

      var b = this.loop_re_over_block(re, block, function( m ) {

        if ( m[2] && m[2][0] == "<" && m[2][m[2].length-1] == ">" )
          m[2] = m[2].substring( 1, m[2].length - 1 );

        var ref = attrs.references[ m[1].toLowerCase() ] = {
          href: m[2]
        };

        if ( m[4] !== undefined )
          ref.title = m[4];
        else if ( m[5] !== undefined )
          ref.title = m[5];

      } );

      if ( b.length )
        next.unshift( mk_block( b, block.trailing ) );

      return [];
    },

    para: function para( block, next ) {
      // everything's a para!
      return [ ["para"].concat( this.processInline( block ) ) ];
    }
  }
};

Markdown.dialects.Gruber.inline = {

    __oneElement__: function oneElement( text, patterns_or_re, previous_nodes ) {
      var m,
          res,
          lastIndex = 0;

      patterns_or_re = patterns_or_re || this.dialect.inline.__patterns__;
      var re = new RegExp( "([\\s\\S]*?)(" + (patterns_or_re.source || patterns_or_re) + ")" );

      m = re.exec( text );
      if (!m) {
        // Just boring text
        return [ text.length, text ];
      }
      else if ( m[1] ) {
        // Some un-interesting text matched. Return that first
        return [ m[1].length, m[1] ];
      }

      var res;
      if ( m[2] in this.dialect.inline ) {
        res = this.dialect.inline[ m[2] ].call(
                  this,
                  text.substr( m.index ), m, previous_nodes || [] );
      }
      // Default for now to make dev easier. just slurp special and output it.
      res = res || [ m[2].length, m[2] ];
      return res;
    },

    __call__: function inline( text, patterns ) {

      var out = [],
          res;

      function add(x) {
        //D:self.debug("  adding output", uneval(x));
        if ( typeof x == "string" && typeof out[out.length-1] == "string" )
          out[ out.length-1 ] += x;
        else
          out.push(x);
      }

      while ( text.length > 0 ) {
        res = this.dialect.inline.__oneElement__.call(this, text, patterns, out );
        text = text.substr( res.shift() );
        forEach(res, add )
      }

      return out;
    },

    // These characters are intersting elsewhere, so have rules for them so that
    // chunks of plain text blocks don't include them
    "]": function () {},
    "}": function () {},

    __escape__ : /^\\[\\`\*_{}\[\]()#\+.!\-]/,

    "\\": function escaped( text ) {
      // [ length of input processed, node/children to add... ]
      // Only esacape: \ ` * _ { } [ ] ( ) # * + - . !
      if ( this.dialect.inline.__escape__.exec( text ) )
        return [ 2, text.charAt( 1 ) ];
      else
        // Not an esacpe
        return [ 1, "\\" ];
    },

    "![": function image( text ) {

      // Unlike images, alt text is plain text only. no other elements are
      // allowed in there

      // ![Alt text](/path/to/img.jpg "Optional title")
      //      1          2            3       4         <--- captures
      var m = text.match( /^!\[(.*?)\][ \t]*\([ \t]*([^")]*?)(?:[ \t]+(["'])(.*?)\3)?[ \t]*\)/ );

      if ( m ) {
        if ( m[2] && m[2][0] == "<" && m[2][m[2].length-1] == ">" )
          m[2] = m[2].substring( 1, m[2].length - 1 );

        m[2] = this.dialect.inline.__call__.call( this, m[2], /\\/ )[0];

        var attrs = { alt: m[1], href: m[2] || "" };
        if ( m[4] !== undefined)
          attrs.title = m[4];

        return [ m[0].length, [ "img", attrs ] ];
      }

      // ![Alt text][id]
      m = text.match( /^!\[(.*?)\][ \t]*\[(.*?)\]/ );

      if ( m ) {
        // We can't check if the reference is known here as it likely wont be
        // found till after. Check it in md tree->hmtl tree conversion
        return [ m[0].length, [ "img_ref", { alt: m[1], ref: m[2].toLowerCase(), original: m[0] } ] ];
      }

      // Just consume the '!['
      return [ 2, "![" ];
    },

    "[": function link( text ) {

      var orig = String(text);
      // Inline content is possible inside `link text`
      var res = Markdown.DialectHelpers.inline_until_char.call( this, text.substr(1), "]" );

      // No closing ']' found. Just consume the [
      if ( !res ) return [ 1, "[" ];

      var consumed = 1 + res[ 0 ],
          children = res[ 1 ],
          link,
          attrs;

      // At this point the first [...] has been parsed. See what follows to find
      // out which kind of link we are (reference or direct url)
      text = text.substr( consumed );

      // [link text](/path/to/img.jpg "Optional title")
      //                 1            2       3         <--- captures
      // This will capture up to the last paren in the block. We then pull
      // back based on if there a matching ones in the url
      //    ([here](/url/(test))
      // The parens have to be balanced
      var m = text.match( /^\s*\([ \t]*([^"']*)(?:[ \t]+(["'])(.*?)\2)?[ \t]*\)/ );
      if ( m ) {
        var url = m[1];
        consumed += m[0].length;

        if ( url && url[0] == "<" && url[url.length-1] == ">" )
          url = url.substring( 1, url.length - 1 );

        // If there is a title we don't have to worry about parens in the url
        if ( !m[3] ) {
          var open_parens = 1; // One open that isn't in the capture
          for ( var len = 0; len < url.length; len++ ) {
            switch ( url[len] ) {
            case "(":
              open_parens++;
              break;
            case ")":
              if ( --open_parens == 0) {
                consumed -= url.length - len;
                url = url.substring(0, len);
              }
              break;
            }
          }
        }

        // Process escapes only
        url = this.dialect.inline.__call__.call( this, url, /\\/ )[0];

        attrs = { href: url || "" };
        if ( m[3] !== undefined)
          attrs.title = m[3];

        link = [ "link", attrs ].concat( children );
        return [ consumed, link ];
      }

      // [Alt text][id]
      // [Alt text] [id]
      m = text.match( /^\s*\[(.*?)\]/ );

      if ( m ) {

        consumed += m[ 0 ].length;

        // [links][] uses links as its reference
        attrs = { ref: ( m[ 1 ] || String(children) ).toLowerCase(),  original: orig.substr( 0, consumed ) };

        link = [ "link_ref", attrs ].concat( children );

        // We can't check if the reference is known here as it likely wont be
        // found till after. Check it in md tree->hmtl tree conversion.
        // Store the original so that conversion can revert if the ref isn't found.
        return [ consumed, link ];
      }

      // [id]
      // Only if id is plain (no formatting.)
      if ( children.length == 1 && typeof children[0] == "string" ) {

        attrs = { ref: children[0].toLowerCase(),  original: orig.substr( 0, consumed ) };
        link = [ "link_ref", attrs, children[0] ];
        return [ consumed, link ];
      }

      // Just consume the "["
      return [ 1, "[" ];
    },


    "<": function autoLink( text ) {
      var m;

      if ( ( m = text.match( /^<(?:((https?|ftp|mailto):[^>]+)|(.*?@.*?\.[a-zA-Z]+))>/ ) ) != null ) {
        if ( m[3] ) {
          return [ m[0].length, [ "link", { href: "mailto:" + m[3] }, m[3] ] ];

        }
        else if ( m[2] == "mailto" ) {
          return [ m[0].length, [ "link", { href: m[1] }, m[1].substr("mailto:".length ) ] ];
        }
        else
          return [ m[0].length, [ "link", { href: m[1] }, m[1] ] ];
      }

      return [ 1, "<" ];
    },

    "`": function inlineCode( text ) {
      // Inline code block. as many backticks as you like to start it
      // Always skip over the opening ticks.
      var m = text.match( /(`+)(([\s\S]*?)\1)/ );

      if ( m && m[2] )
        return [ m[1].length + m[2].length, [ "inlinecode", m[3] ] ];
      else {
        // TODO: No matching end code found - warn!
        return [ 1, "`" ];
      }
    },

    "  \n": function lineBreak( text ) {
      return [ 3, [ "linebreak" ] ];
    }

};

// Meta Helper/generator method for em and strong handling
function strong_em( tag, md ) {

  var state_slot = tag + "_state",
      other_slot = tag == "strong" ? "em_state" : "strong_state";

  function CloseTag(len) {
    this.len_after = len;
    this.name = "close_" + md;
  }

  return function ( text, orig_match ) {

    if ( this[state_slot][0] == md ) {
      // Most recent em is of this type
      //D:this.debug("closing", md);
      this[state_slot].shift();

      // "Consume" everything to go back to the recrusion in the else-block below
      return[ text.length, new CloseTag(text.length-md.length) ];
    }
    else {
      // Store a clone of the em/strong states
      var other = this[other_slot].slice(),
          state = this[state_slot].slice();

      this[state_slot].unshift(md);

      //D:this.debug_indent += "  ";

      // Recurse
      var res = this.processInline( text.substr( md.length ) );
      //D:this.debug_indent = this.debug_indent.substr(2);

      var last = res[res.length - 1];

      //D:this.debug("processInline from", tag + ": ", uneval( res ) );

      var check = this[state_slot].shift();
      if ( last instanceof CloseTag ) {
        res.pop();
        // We matched! Huzzah.
        var consumed = text.length - last.len_after;
        return [ consumed, [ tag ].concat(res) ];
      }
      else {
        // Restore the state of the other kind. We might have mistakenly closed it.
        this[other_slot] = other;
        this[state_slot] = state;

        // We can't reuse the processed result as it could have wrong parsing contexts in it.
        return [ md.length, md ];
      }
    }
  }; // End returned function
}

Markdown.dialects.Gruber.inline["**"] = strong_em("strong", "**");
Markdown.dialects.Gruber.inline["__"] = strong_em("strong", "__");
Markdown.dialects.Gruber.inline["*"]  = strong_em("em", "*");
Markdown.dialects.Gruber.inline["_"]  = strong_em("em", "_");


// Build default order from insertion order.
Markdown.buildBlockOrder = function(d) {
  var ord = [];
  for ( var i in d ) {
    if ( i == "__order__" || i == "__call__" ) continue;
    ord.push( i );
  }
  d.__order__ = ord;
};

// Build patterns for inline matcher
Markdown.buildInlinePatterns = function(d) {
  var patterns = [];

  for ( var i in d ) {
    // __foo__ is reserved and not a pattern
    if ( i.match( /^__.*__$/) ) continue;
    var l = i.replace( /([\\.*+?|()\[\]{}])/g, "\\$1" )
             .replace( /\n/, "\\n" );
    patterns.push( i.length == 1 ? l : "(?:" + l + ")" );
  }

  patterns = patterns.join("|");
  d.__patterns__ = patterns;
  //print("patterns:", uneval( patterns ) );

  var fn = d.__call__;
  d.__call__ = function(text, pattern) {
    if ( pattern != undefined ) {
      return fn.call(this, text, pattern);
    }
    else
    {
      return fn.call(this, text, patterns);
    }
  };
};

Markdown.DialectHelpers = {};
Markdown.DialectHelpers.inline_until_char = function( text, want ) {
  var consumed = 0,
      nodes = [];

  while ( true ) {
    if ( text.charAt( consumed ) == want ) {
      // Found the character we were looking for
      consumed++;
      return [ consumed, nodes ];
    }

    if ( consumed >= text.length ) {
      // No closing char found. Abort.
      return null;
    }

    var res = this.dialect.inline.__oneElement__.call(this, text.substr( consumed ) );
    consumed += res[ 0 ];
    // Add any returned nodes.
    nodes.push.apply( nodes, res.slice( 1 ) );
  }
}

// Helper function to make sub-classing a dialect easier
Markdown.subclassDialect = function( d ) {
  function Block() {}
  Block.prototype = d.block;
  function Inline() {}
  Inline.prototype = d.inline;

  return { block: new Block(), inline: new Inline() };
};

Markdown.buildBlockOrder ( Markdown.dialects.Gruber.block );
Markdown.buildInlinePatterns( Markdown.dialects.Gruber.inline );

Markdown.dialects.Maruku = Markdown.subclassDialect( Markdown.dialects.Gruber );

Markdown.dialects.Maruku.processMetaHash = function processMetaHash( meta_string ) {
  var meta = split_meta_hash( meta_string ),
      attr = {};

  for ( var i = 0; i < meta.length; ++i ) {
    // id: #foo
    if ( /^#/.test( meta[ i ] ) ) {
      attr.id = meta[ i ].substring( 1 );
    }
    // class: .foo
    else if ( /^\./.test( meta[ i ] ) ) {
      // if class already exists, append the new one
      if ( attr["class"] ) {
        attr["class"] = attr["class"] + meta[ i ].replace( /./, " " );
      }
      else {
        attr["class"] = meta[ i ].substring( 1 );
      }
    }
    // attribute: foo=bar
    else if ( /\=/.test( meta[ i ] ) ) {
      var s = meta[ i ].split( /\=/ );
      attr[ s[ 0 ] ] = s[ 1 ];
    }
  }

  return attr;
}

function split_meta_hash( meta_string ) {
  var meta = meta_string.split( "" ),
      parts = [ "" ],
      in_quotes = false;

  while ( meta.length ) {
    var letter = meta.shift();
    switch ( letter ) {
      case " " :
        // if we're in a quoted section, keep it
        if ( in_quotes ) {
          parts[ parts.length - 1 ] += letter;
        }
        // otherwise make a new part
        else {
          parts.push( "" );
        }
        break;
      case "'" :
      case '"' :
        // reverse the quotes and move straight on
        in_quotes = !in_quotes;
        break;
      case "\\" :
        // shift off the next letter to be used straight away.
        // it was escaped so we'll keep it whatever it is
        letter = meta.shift();
      default :
        parts[ parts.length - 1 ] += letter;
        break;
    }
  }

  return parts;
}

Markdown.dialects.Maruku.block.document_meta = function document_meta( block, next ) {
  // we're only interested in the first block
  if ( block.lineNumber > 1 ) return undefined;

  // document_meta blocks consist of one or more lines of `Key: Value\n`
  if ( ! block.match( /^(?:\w+:.*\n)*\w+:.*$/ ) ) return undefined;

  // make an attribute node if it doesn't exist
  if ( !extract_attr( this.tree ) ) {
    this.tree.splice( 1, 0, {} );
  }

  var pairs = block.split( /\n/ );
  for ( p in pairs ) {
    var m = pairs[ p ].match( /(\w+):\s*(.*)$/ ),
        key = m[ 1 ].toLowerCase(),
        value = m[ 2 ];

    this.tree[ 1 ][ key ] = value;
  }

  // document_meta produces no content!
  return [];
};

Markdown.dialects.Maruku.block.block_meta = function block_meta( block, next ) {
  // check if the last line of the block is an meta hash
  var m = block.match( /(^|\n) {0,3}\{:\s*((?:\\\}|[^\}])*)\s*\}$/ );
  if ( !m ) return undefined;

  // process the meta hash
  var attr = this.dialect.processMetaHash( m[ 2 ] );

  var hash;

  // if we matched ^ then we need to apply meta to the previous block
  if ( m[ 1 ] === "" ) {
    var node = this.tree[ this.tree.length - 1 ];
    hash = extract_attr( node );

    // if the node is a string (rather than JsonML), bail
    if ( typeof node === "string" ) return undefined;

    // create the attribute hash if it doesn't exist
    if ( !hash ) {
      hash = {};
      node.splice( 1, 0, hash );
    }

    // add the attributes in
    for ( a in attr ) {
      hash[ a ] = attr[ a ];
    }

    // return nothing so the meta hash is removed
    return [];
  }

  // pull the meta hash off the block and process what's left
  var b = block.replace( /\n.*$/, "" ),
      result = this.processBlock( b, [] );

  // get or make the attributes hash
  hash = extract_attr( result[ 0 ] );
  if ( !hash ) {
    hash = {};
    result[ 0 ].splice( 1, 0, hash );
  }

  // attach the attributes to the block
  for ( a in attr ) {
    hash[ a ] = attr[ a ];
  }

  return result;
};

Markdown.dialects.Maruku.block.definition_list = function definition_list( block, next ) {
  // one or more terms followed by one or more definitions, in a single block
  var tight = /^((?:[^\s:].*\n)+):\s+([\s\S]+)$/,
      list = [ "dl" ],
      i, m;

  // see if we're dealing with a tight or loose block
  if ( ( m = block.match( tight ) ) ) {
    // pull subsequent tight DL blocks out of `next`
    var blocks = [ block ];
    while ( next.length && tight.exec( next[ 0 ] ) ) {
      blocks.push( next.shift() );
    }

    for ( var b = 0; b < blocks.length; ++b ) {
      var m = blocks[ b ].match( tight ),
          terms = m[ 1 ].replace( /\n$/, "" ).split( /\n/ ),
          defns = m[ 2 ].split( /\n:\s+/ );

      // print( uneval( m ) );

      for ( i = 0; i < terms.length; ++i ) {
        list.push( [ "dt", terms[ i ] ] );
      }

      for ( i = 0; i < defns.length; ++i ) {
        // run inline processing over the definition
        list.push( [ "dd" ].concat( this.processInline( defns[ i ].replace( /(\n)\s+/, "$1" ) ) ) );
      }
    }
  }
  else {
    return undefined;
  }

  return [ list ];
};

// splits on unescaped instances of @ch. If @ch is not a character the result
// can be unpredictable

Markdown.dialects.Maruku.block.table = function table (block, next) {

    var _split_on_unescaped = function(s, ch) {
        ch = ch || '\\s';
        if (ch.match(/^[\\|\[\]{}?*.+^$]$/)) { ch = '\\' + ch; }
        var res = [ ],
            r = new RegExp('^((?:\\\\.|[^\\\\' + ch + '])*)' + ch + '(.*)'),
            m;
        while(m = s.match(r)) {
            res.push(m[1]);
            s = m[2];
        }
        res.push(s);
        return res;
    }

    var leading_pipe = /^ {0,3}\|(.+)\n {0,3}\|\s*([\-:]+[\-| :]*)\n((?:\s*\|.*(?:\n|$))*)(?=\n|$)/,
        // find at least an unescaped pipe in each line
        no_leading_pipe = /^ {0,3}(\S(?:\\.|[^\\|])*\|.*)\n {0,3}([\-:]+\s*\|[\-| :]*)\n((?:(?:\\.|[^\\|])*\|.*(?:\n|$))*)(?=\n|$)/,
        i, m;
    if (m = block.match(leading_pipe)) {
        // remove leading pipes in contents
        // (header and horizontal rule already have the leading pipe left out)
        m[3] = m[3].replace(/^\s*\|/gm, '');
    } else if (! ( m = block.match(no_leading_pipe))) {
        return undefined;
    }

    var table = [ "table", [ "thead", [ "tr" ] ], [ "tbody" ] ];

    // remove trailing pipes, then split on pipes
    // (no escaped pipes are allowed in horizontal rule)
    m[2] = m[2].replace(/\|\s*$/, '').split('|');

    // process alignment
    var html_attrs = [ ];
    forEach (m[2], function (s) {
        if (s.match(/^\s*-+:\s*$/))       html_attrs.push({align: "right"});
        else if (s.match(/^\s*:-+\s*$/))  html_attrs.push({align: "left"});
        else if (s.match(/^\s*:-+:\s*$/)) html_attrs.push({align: "center"});
        else                              html_attrs.push({});
    });

    // now for the header, avoid escaped pipes
    m[1] = _split_on_unescaped(m[1].replace(/\|\s*$/, ''), '|');
    for (i = 0; i < m[1].length; i++) {
        table[1][1].push(['th', html_attrs[i] || {}].concat(
            this.processInline(m[1][i].trim())));
    }

    // now for body contents
    forEach (m[3].replace(/\|\s*$/mg, '').split('\n'), function (row) {
        var html_row = ['tr'];
        row = _split_on_unescaped(row, '|');
        for (i = 0; i < row.length; i++) {
            html_row.push(['td', html_attrs[i] || {}].concat(this.processInline(row[i].trim())));
        }
        table[2].push(html_row);
    }, this);

    return [table];
}

Markdown.dialects.Maruku.inline[ "{:" ] = function inline_meta( text, matches, out ) {
  if ( !out.length ) {
    return [ 2, "{:" ];
  }

  // get the preceeding element
  var before = out[ out.length - 1 ];

  if ( typeof before === "string" ) {
    return [ 2, "{:" ];
  }

  // match a meta hash
  var m = text.match( /^\{:\s*((?:\\\}|[^\}])*)\s*\}/ );

  // no match, false alarm
  if ( !m ) {
    return [ 2, "{:" ];
  }

  // attach the attributes to the preceeding element
  var meta = this.dialect.processMetaHash( m[ 1 ] ),
      attr = extract_attr( before );

  if ( !attr ) {
    attr = {};
    before.splice( 1, 0, attr );
  }

  for ( var k in meta ) {
    attr[ k ] = meta[ k ];
  }

  // cut out the string and replace it with nothing
  return [ m[ 0 ].length, "" ];
};

Markdown.dialects.Maruku.inline.__escape__ = /^\\[\\`\*_{}\[\]()#\+.!\-|:]/;

Markdown.buildBlockOrder ( Markdown.dialects.Maruku.block );
Markdown.buildInlinePatterns( Markdown.dialects.Maruku.inline );

var isArray = Array.isArray || function(obj) {
  return Object.prototype.toString.call(obj) == "[object Array]";
};

var forEach;
// Don't mess with Array.prototype. Its not friendly
if ( Array.prototype.forEach ) {
  forEach = function( arr, cb, thisp ) {
    return arr.forEach( cb, thisp );
  };
}
else {
  forEach = function(arr, cb, thisp) {
    for (var i = 0; i < arr.length; i++) {
      cb.call(thisp || arr, arr[i], i, arr);
    }
  }
}

var isEmpty = function( obj ) {
  for ( var key in obj ) {
    if ( hasOwnProperty.call( obj, key ) ) {
      return false;
    }
  }

  return true;
}

function extract_attr( jsonml ) {
  return isArray(jsonml)
      && jsonml.length > 1
      && typeof jsonml[ 1 ] === "object"
      && !( isArray(jsonml[ 1 ]) )
      ? jsonml[ 1 ]
      : undefined;
}



/**
 *  renderJsonML( jsonml[, options] ) -> String
 *  - jsonml (Array): JsonML array to render to XML
 *  - options (Object): options
 *
 *  Converts the given JsonML into well-formed XML.
 *
 *  The options currently understood are:
 *
 *  - root (Boolean): wether or not the root node should be included in the
 *    output, or just its children. The default `false` is to not include the
 *    root itself.
 */
expose.renderJsonML = function( jsonml, options ) {
  options = options || {};
  // include the root element in the rendered output?
  options.root = options.root || false;

  var content = [];

  if ( options.root ) {
    content.push( render_tree( jsonml ) );
  }
  else {
    jsonml.shift(); // get rid of the tag
    if ( jsonml.length && typeof jsonml[ 0 ] === "object" && !( jsonml[ 0 ] instanceof Array ) ) {
      jsonml.shift(); // get rid of the attributes
    }

    while ( jsonml.length ) {
      content.push( render_tree( jsonml.shift() ) );
    }
  }

  return content.join( "\n\n" );
};

function escapeHTML( text ) {
  return text.replace( /&/g, "&amp;" )
             .replace( /</g, "&lt;" )
             .replace( />/g, "&gt;" )
             .replace( /"/g, "&quot;" )
             .replace( /'/g, "&#39;" );
}

function render_tree( jsonml ) {
  // basic case
  if ( typeof jsonml === "string" ) {
    return escapeHTML( jsonml );
  }

  var tag = jsonml.shift(),
      attributes = {},
      content = [];

  if ( jsonml.length && typeof jsonml[ 0 ] === "object" && !( jsonml[ 0 ] instanceof Array ) ) {
    attributes = jsonml.shift();
  }

  while ( jsonml.length ) {
    content.push( render_tree( jsonml.shift() ) );
  }

  var tag_attrs = "";
  for ( var a in attributes ) {
    tag_attrs += " " + a + '="' + escapeHTML( attributes[ a ] ) + '"';
  }

  // be careful about adding whitespace here for inline elements
  if ( tag == "img" || tag == "br" || tag == "hr" ) {
    return "<"+ tag + tag_attrs + "/>";
  }
  else {
    return "<"+ tag + tag_attrs + ">" + content.join( "" ) + "</" + tag + ">";
  }
}

function convert_tree_to_html( tree, references, options ) {
  var i;
  options = options || {};

  // shallow clone
  var jsonml = tree.slice( 0 );

  if ( typeof options.preprocessTreeNode === "function" ) {
      jsonml = options.preprocessTreeNode(jsonml, references);
  }

  // Clone attributes if they exist
  var attrs = extract_attr( jsonml );
  if ( attrs ) {
    jsonml[ 1 ] = {};
    for ( i in attrs ) {
      jsonml[ 1 ][ i ] = attrs[ i ];
    }
    attrs = jsonml[ 1 ];
  }

  // basic case
  if ( typeof jsonml === "string" ) {
    return jsonml;
  }

  // convert this node
  switch ( jsonml[ 0 ] ) {
    case "header":
      jsonml[ 0 ] = "h" + jsonml[ 1 ].level;
      delete jsonml[ 1 ].level;
      break;
    case "bulletlist":
      jsonml[ 0 ] = "ul";
      break;
    case "numberlist":
      jsonml[ 0 ] = "ol";
      break;
    case "listitem":
      jsonml[ 0 ] = "li";
      break;
    case "para":
      jsonml[ 0 ] = "p";
      break;
    case "markdown":
      jsonml[ 0 ] = "html";
      if ( attrs ) delete attrs.references;
      break;
    case "code_block":
      jsonml[ 0 ] = "pre";
      i = attrs ? 2 : 1;
      var code = [ "code" ];
      code.push.apply( code, jsonml.splice( i, jsonml.length - i ) );
      jsonml[ i ] = code;
      break;
    case "inlinecode":
      jsonml[ 0 ] = "code";
      break;
    case "img":
      jsonml[ 1 ].src = jsonml[ 1 ].href;
      delete jsonml[ 1 ].href;
      break;
    case "linebreak":
      jsonml[ 0 ] = "br";
    break;
    case "link":
      jsonml[ 0 ] = "a";
      break;
    case "link_ref":
      jsonml[ 0 ] = "a";

      // grab this ref and clean up the attribute node
      var ref = references[ attrs.ref ];

      // if the reference exists, make the link
      if ( ref ) {
        delete attrs.ref;

        // add in the href and title, if present
        attrs.href = ref.href;
        if ( ref.title ) {
          attrs.title = ref.title;
        }

        // get rid of the unneeded original text
        delete attrs.original;
      }
      // the reference doesn't exist, so revert to plain text
      else {
        return attrs.original;
      }
      break;
    case "img_ref":
      jsonml[ 0 ] = "img";

      // grab this ref and clean up the attribute node
      var ref = references[ attrs.ref ];

      // if the reference exists, make the link
      if ( ref ) {
        delete attrs.ref;

        // add in the href and title, if present
        attrs.src = ref.href;
        if ( ref.title ) {
          attrs.title = ref.title;
        }

        // get rid of the unneeded original text
        delete attrs.original;
      }
      // the reference doesn't exist, so revert to plain text
      else {
        return attrs.original;
      }
      break;
  }

  // convert all the children
  i = 1;

  // deal with the attribute node, if it exists
  if ( attrs ) {
    // if there are keys, skip over it
    for ( var key in jsonml[ 1 ] ) {
        i = 2;
        break;
    }
    // if there aren't, remove it
    if ( i === 1 ) {
      jsonml.splice( i, 1 );
    }
  }

  for ( ; i < jsonml.length; ++i ) {
    jsonml[ i ] = convert_tree_to_html( jsonml[ i ], references, options );
  }

  return jsonml;
}


// merges adjacent text nodes into a single node
function merge_text_nodes( jsonml ) {
  // skip the tag name and attribute hash
  var i = extract_attr( jsonml ) ? 2 : 1;

  while ( i < jsonml.length ) {
    // if it's a string check the next item too
    if ( typeof jsonml[ i ] === "string" ) {
      if ( i + 1 < jsonml.length && typeof jsonml[ i + 1 ] === "string" ) {
        // merge the second string into the first and remove it
        jsonml[ i ] += jsonml.splice( i + 1, 1 )[ 0 ];
      }
      else {
        ++i;
      }
    }
    // if it's not a string recurse
    else {
      merge_text_nodes( jsonml[ i ] );
      ++i;
    }
  }
}

} )( (function() {
  if ( false ) {
    window.markdown = {};
    return window.markdown;
  }
  else {
    return exports;
  }
} )() );


/***/ },

/***/ 792:
/***/ function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
 * Datepicker for Bootstrap v1.6.1 (https://github.com/eternicode/bootstrap-datepicker)
 *
 * Copyright 2012 Stefan Petre
 * Improvements by Andrew Rowls
 * Licensed under the Apache License v2.0 (http://www.apache.org/licenses/LICENSE-2.0)
 */
!function(a){ true?!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(23)], __WEBPACK_AMD_DEFINE_FACTORY__ = (a), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)):a("object"==typeof exports?require("jquery"):jQuery)}(function(a,b){function c(){return new Date(Date.UTC.apply(Date,arguments))}function d(){var a=new Date;return c(a.getFullYear(),a.getMonth(),a.getDate())}function e(a,b){return a.getUTCFullYear()===b.getUTCFullYear()&&a.getUTCMonth()===b.getUTCMonth()&&a.getUTCDate()===b.getUTCDate()}function f(a){return function(){return this[a].apply(this,arguments)}}function g(a){return a&&!isNaN(a.getTime())}function h(b,c){function d(a,b){return b.toLowerCase()}var e,f=a(b).data(),g={},h=new RegExp("^"+c.toLowerCase()+"([A-Z])");c=new RegExp("^"+c.toLowerCase());for(var i in f)c.test(i)&&(e=i.replace(h,d),g[e]=f[i]);return g}function i(b){var c={};if(q[b]||(b=b.split("-")[0],q[b])){var d=q[b];return a.each(p,function(a,b){b in d&&(c[b]=d[b])}),c}}var j=function(){var b={get:function(a){return this.slice(a)[0]},contains:function(a){for(var b=a&&a.valueOf(),c=0,d=this.length;d>c;c++)if(this[c].valueOf()===b)return c;return-1},remove:function(a){this.splice(a,1)},replace:function(b){b&&(a.isArray(b)||(b=[b]),this.clear(),this.push.apply(this,b))},clear:function(){this.length=0},copy:function(){var a=new j;return a.replace(this),a}};return function(){var c=[];return c.push.apply(c,arguments),a.extend(c,b),c}}(),k=function(b,c){a(b).data("datepicker",this),this._process_options(c),this.dates=new j,this.viewDate=this.o.defaultViewDate,this.focusDate=null,this.element=a(b),this.isInput=this.element.is("input"),this.inputField=this.isInput?this.element:this.element.find("input"),this.component=this.element.hasClass("date")?this.element.find(".add-on, .input-group-addon, .btn"):!1,this.hasInput=this.component&&this.inputField.length,this.component&&0===this.component.length&&(this.component=!1),this.isInline=!this.component&&this.element.is("div"),this.picker=a(r.template),this._check_template(this.o.templates.leftArrow)&&this.picker.find(".prev").html(this.o.templates.leftArrow),this._check_template(this.o.templates.rightArrow)&&this.picker.find(".next").html(this.o.templates.rightArrow),this._buildEvents(),this._attachEvents(),this.isInline?this.picker.addClass("datepicker-inline").appendTo(this.element):this.picker.addClass("datepicker-dropdown dropdown-menu"),this.o.rtl&&this.picker.addClass("datepicker-rtl"),this.viewMode=this.o.startView,this.o.calendarWeeks&&this.picker.find("thead .datepicker-title, tfoot .today, tfoot .clear").attr("colspan",function(a,b){return parseInt(b)+1}),this._allow_update=!1,this.setStartDate(this._o.startDate),this.setEndDate(this._o.endDate),this.setDaysOfWeekDisabled(this.o.daysOfWeekDisabled),this.setDaysOfWeekHighlighted(this.o.daysOfWeekHighlighted),this.setDatesDisabled(this.o.datesDisabled),this.fillDow(),this.fillMonths(),this._allow_update=!0,this.update(),this.showMode(),this.isInline&&this.show()};k.prototype={constructor:k,_resolveViewName:function(a,c){return 0===a||"days"===a||"month"===a?0:1===a||"months"===a||"year"===a?1:2===a||"years"===a||"decade"===a?2:3===a||"decades"===a||"century"===a?3:4===a||"centuries"===a||"millennium"===a?4:c===b?!1:c},_check_template:function(c){try{if(c===b||""===c)return!1;if((c.match(/[<>]/g)||[]).length<=0)return!0;var d=a(c);return d.length>0}catch(e){return!1}},_process_options:function(b){this._o=a.extend({},this._o,b);var e=this.o=a.extend({},this._o),f=e.language;q[f]||(f=f.split("-")[0],q[f]||(f=o.language)),e.language=f,e.startView=this._resolveViewName(e.startView,0),e.minViewMode=this._resolveViewName(e.minViewMode,0),e.maxViewMode=this._resolveViewName(e.maxViewMode,4),e.startView=Math.min(e.startView,e.maxViewMode),e.startView=Math.max(e.startView,e.minViewMode),e.multidate!==!0&&(e.multidate=Number(e.multidate)||!1,e.multidate!==!1&&(e.multidate=Math.max(0,e.multidate))),e.multidateSeparator=String(e.multidateSeparator),e.weekStart%=7,e.weekEnd=(e.weekStart+6)%7;var g=r.parseFormat(e.format);e.startDate!==-(1/0)&&(e.startDate?e.startDate instanceof Date?e.startDate=this._local_to_utc(this._zero_time(e.startDate)):e.startDate=r.parseDate(e.startDate,g,e.language,e.assumeNearbyYear):e.startDate=-(1/0)),e.endDate!==1/0&&(e.endDate?e.endDate instanceof Date?e.endDate=this._local_to_utc(this._zero_time(e.endDate)):e.endDate=r.parseDate(e.endDate,g,e.language,e.assumeNearbyYear):e.endDate=1/0),e.daysOfWeekDisabled=e.daysOfWeekDisabled||[],a.isArray(e.daysOfWeekDisabled)||(e.daysOfWeekDisabled=e.daysOfWeekDisabled.split(/[,\s]*/)),e.daysOfWeekDisabled=a.map(e.daysOfWeekDisabled,function(a){return parseInt(a,10)}),e.daysOfWeekHighlighted=e.daysOfWeekHighlighted||[],a.isArray(e.daysOfWeekHighlighted)||(e.daysOfWeekHighlighted=e.daysOfWeekHighlighted.split(/[,\s]*/)),e.daysOfWeekHighlighted=a.map(e.daysOfWeekHighlighted,function(a){return parseInt(a,10)}),e.datesDisabled=e.datesDisabled||[],a.isArray(e.datesDisabled)||(e.datesDisabled=[e.datesDisabled]),e.datesDisabled=a.map(e.datesDisabled,function(a){return r.parseDate(a,g,e.language,e.assumeNearbyYear)});var h=String(e.orientation).toLowerCase().split(/\s+/g),i=e.orientation.toLowerCase();if(h=a.grep(h,function(a){return/^auto|left|right|top|bottom$/.test(a)}),e.orientation={x:"auto",y:"auto"},i&&"auto"!==i)if(1===h.length)switch(h[0]){case"top":case"bottom":e.orientation.y=h[0];break;case"left":case"right":e.orientation.x=h[0]}else i=a.grep(h,function(a){return/^left|right$/.test(a)}),e.orientation.x=i[0]||"auto",i=a.grep(h,function(a){return/^top|bottom$/.test(a)}),e.orientation.y=i[0]||"auto";else;if(e.defaultViewDate){var j=e.defaultViewDate.year||(new Date).getFullYear(),k=e.defaultViewDate.month||0,l=e.defaultViewDate.day||1;e.defaultViewDate=c(j,k,l)}else e.defaultViewDate=d()},_events:[],_secondaryEvents:[],_applyEvents:function(a){for(var c,d,e,f=0;f<a.length;f++)c=a[f][0],2===a[f].length?(d=b,e=a[f][1]):3===a[f].length&&(d=a[f][1],e=a[f][2]),c.on(e,d)},_unapplyEvents:function(a){for(var c,d,e,f=0;f<a.length;f++)c=a[f][0],2===a[f].length?(e=b,d=a[f][1]):3===a[f].length&&(e=a[f][1],d=a[f][2]),c.off(d,e)},_buildEvents:function(){var b={keyup:a.proxy(function(b){-1===a.inArray(b.keyCode,[27,37,39,38,40,32,13,9])&&this.update()},this),keydown:a.proxy(this.keydown,this),paste:a.proxy(this.paste,this)};this.o.showOnFocus===!0&&(b.focus=a.proxy(this.show,this)),this.isInput?this._events=[[this.element,b]]:this.component&&this.hasInput?this._events=[[this.inputField,b],[this.component,{click:a.proxy(this.show,this)}]]:this._events=[[this.element,{click:a.proxy(this.show,this),keydown:a.proxy(this.keydown,this)}]],this._events.push([this.element,"*",{blur:a.proxy(function(a){this._focused_from=a.target},this)}],[this.element,{blur:a.proxy(function(a){this._focused_from=a.target},this)}]),this.o.immediateUpdates&&this._events.push([this.element,{"changeYear changeMonth":a.proxy(function(a){this.update(a.date)},this)}]),this._secondaryEvents=[[this.picker,{click:a.proxy(this.click,this)}],[a(window),{resize:a.proxy(this.place,this)}],[a(document),{mousedown:a.proxy(function(a){this.element.is(a.target)||this.element.find(a.target).length||this.picker.is(a.target)||this.picker.find(a.target).length||this.isInline||this.hide()},this)}]]},_attachEvents:function(){this._detachEvents(),this._applyEvents(this._events)},_detachEvents:function(){this._unapplyEvents(this._events)},_attachSecondaryEvents:function(){this._detachSecondaryEvents(),this._applyEvents(this._secondaryEvents)},_detachSecondaryEvents:function(){this._unapplyEvents(this._secondaryEvents)},_trigger:function(b,c){var d=c||this.dates.get(-1),e=this._utc_to_local(d);this.element.trigger({type:b,date:e,dates:a.map(this.dates,this._utc_to_local),format:a.proxy(function(a,b){0===arguments.length?(a=this.dates.length-1,b=this.o.format):"string"==typeof a&&(b=a,a=this.dates.length-1),b=b||this.o.format;var c=this.dates.get(a);return r.formatDate(c,b,this.o.language)},this)})},show:function(){return this.inputField.prop("disabled")||this.inputField.prop("readonly")&&this.o.enableOnReadonly===!1?void 0:(this.isInline||this.picker.appendTo(this.o.container),this.place(),this.picker.show(),this._attachSecondaryEvents(),this._trigger("show"),(window.navigator.msMaxTouchPoints||"ontouchstart"in document)&&this.o.disableTouchKeyboard&&a(this.element).blur(),this)},hide:function(){return this.isInline||!this.picker.is(":visible")?this:(this.focusDate=null,this.picker.hide().detach(),this._detachSecondaryEvents(),this.viewMode=this.o.startView,this.showMode(),this.o.forceParse&&this.inputField.val()&&this.setValue(),this._trigger("hide"),this)},destroy:function(){return this.hide(),this._detachEvents(),this._detachSecondaryEvents(),this.picker.remove(),delete this.element.data().datepicker,this.isInput||delete this.element.data().date,this},paste:function(b){var c;if(b.originalEvent.clipboardData&&b.originalEvent.clipboardData.types&&-1!==a.inArray("text/plain",b.originalEvent.clipboardData.types))c=b.originalEvent.clipboardData.getData("text/plain");else{if(!window.clipboardData)return;c=window.clipboardData.getData("Text")}this.setDate(c),this.update(),b.preventDefault()},_utc_to_local:function(a){return a&&new Date(a.getTime()+6e4*a.getTimezoneOffset())},_local_to_utc:function(a){return a&&new Date(a.getTime()-6e4*a.getTimezoneOffset())},_zero_time:function(a){return a&&new Date(a.getFullYear(),a.getMonth(),a.getDate())},_zero_utc_time:function(a){return a&&new Date(Date.UTC(a.getUTCFullYear(),a.getUTCMonth(),a.getUTCDate()))},getDates:function(){return a.map(this.dates,this._utc_to_local)},getUTCDates:function(){return a.map(this.dates,function(a){return new Date(a)})},getDate:function(){return this._utc_to_local(this.getUTCDate())},getUTCDate:function(){var a=this.dates.get(-1);return"undefined"!=typeof a?new Date(a):null},clearDates:function(){this.inputField&&this.inputField.val(""),this.update(),this._trigger("changeDate"),this.o.autoclose&&this.hide()},setDates:function(){var b=a.isArray(arguments[0])?arguments[0]:arguments;return this.update.apply(this,b),this._trigger("changeDate"),this.setValue(),this},setUTCDates:function(){var b=a.isArray(arguments[0])?arguments[0]:arguments;return this.update.apply(this,a.map(b,this._utc_to_local)),this._trigger("changeDate"),this.setValue(),this},setDate:f("setDates"),setUTCDate:f("setUTCDates"),remove:f("destroy"),setValue:function(){var a=this.getFormattedDate();return this.inputField.val(a),this},getFormattedDate:function(c){c===b&&(c=this.o.format);var d=this.o.language;return a.map(this.dates,function(a){return r.formatDate(a,c,d)}).join(this.o.multidateSeparator)},getStartDate:function(){return this.o.startDate},setStartDate:function(a){return this._process_options({startDate:a}),this.update(),this.updateNavArrows(),this},getEndDate:function(){return this.o.endDate},setEndDate:function(a){return this._process_options({endDate:a}),this.update(),this.updateNavArrows(),this},setDaysOfWeekDisabled:function(a){return this._process_options({daysOfWeekDisabled:a}),this.update(),this.updateNavArrows(),this},setDaysOfWeekHighlighted:function(a){return this._process_options({daysOfWeekHighlighted:a}),this.update(),this},setDatesDisabled:function(a){this._process_options({datesDisabled:a}),this.update(),this.updateNavArrows()},place:function(){if(this.isInline)return this;var b=this.picker.outerWidth(),c=this.picker.outerHeight(),d=10,e=a(this.o.container),f=e.width(),g="body"===this.o.container?a(document).scrollTop():e.scrollTop(),h=e.offset(),i=[];this.element.parents().each(function(){var b=a(this).css("z-index");"auto"!==b&&0!==b&&i.push(parseInt(b))});var j=Math.max.apply(Math,i)+this.o.zIndexOffset,k=this.component?this.component.parent().offset():this.element.offset(),l=this.component?this.component.outerHeight(!0):this.element.outerHeight(!1),m=this.component?this.component.outerWidth(!0):this.element.outerWidth(!1),n=k.left-h.left,o=k.top-h.top;"body"!==this.o.container&&(o+=g),this.picker.removeClass("datepicker-orient-top datepicker-orient-bottom datepicker-orient-right datepicker-orient-left"),"auto"!==this.o.orientation.x?(this.picker.addClass("datepicker-orient-"+this.o.orientation.x),"right"===this.o.orientation.x&&(n-=b-m)):k.left<0?(this.picker.addClass("datepicker-orient-left"),n-=k.left-d):n+b>f?(this.picker.addClass("datepicker-orient-right"),n+=m-b):this.picker.addClass("datepicker-orient-left");var p,q=this.o.orientation.y;if("auto"===q&&(p=-g+o-c,q=0>p?"bottom":"top"),this.picker.addClass("datepicker-orient-"+q),"top"===q?o-=c+parseInt(this.picker.css("padding-top")):o+=l,this.o.rtl){var r=f-(n+m);this.picker.css({top:o,right:r,zIndex:j})}else this.picker.css({top:o,left:n,zIndex:j});return this},_allow_update:!0,update:function(){if(!this._allow_update)return this;var b=this.dates.copy(),c=[],d=!1;return arguments.length?(a.each(arguments,a.proxy(function(a,b){b instanceof Date&&(b=this._local_to_utc(b)),c.push(b)},this)),d=!0):(c=this.isInput?this.element.val():this.element.data("date")||this.inputField.val(),c=c&&this.o.multidate?c.split(this.o.multidateSeparator):[c],delete this.element.data().date),c=a.map(c,a.proxy(function(a){return r.parseDate(a,this.o.format,this.o.language,this.o.assumeNearbyYear)},this)),c=a.grep(c,a.proxy(function(a){return!this.dateWithinRange(a)||!a},this),!0),this.dates.replace(c),this.dates.length?this.viewDate=new Date(this.dates.get(-1)):this.viewDate<this.o.startDate?this.viewDate=new Date(this.o.startDate):this.viewDate>this.o.endDate?this.viewDate=new Date(this.o.endDate):this.viewDate=this.o.defaultViewDate,d?this.setValue():c.length&&String(b)!==String(this.dates)&&this._trigger("changeDate"),!this.dates.length&&b.length&&this._trigger("clearDate"),this.fill(),this.element.change(),this},fillDow:function(){var b=this.o.weekStart,c="<tr>";for(this.o.calendarWeeks&&(this.picker.find(".datepicker-days .datepicker-switch").attr("colspan",function(a,b){return parseInt(b)+1}),c+='<th class="cw">&#160;</th>');b<this.o.weekStart+7;)c+='<th class="dow',a.inArray(b,this.o.daysOfWeekDisabled)>-1&&(c+=" disabled"),c+='">'+q[this.o.language].daysMin[b++%7]+"</th>";c+="</tr>",this.picker.find(".datepicker-days thead").append(c)},fillMonths:function(){for(var a=this._utc_to_local(this.viewDate),b="",c=0;12>c;){var d=a&&a.getMonth()===c?" focused":"";b+='<span class="month'+d+'">'+q[this.o.language].monthsShort[c++]+"</span>"}this.picker.find(".datepicker-months td").html(b)},setRange:function(b){b&&b.length?this.range=a.map(b,function(a){return a.valueOf()}):delete this.range,this.fill()},getClassNames:function(b){var c=[],d=this.viewDate.getUTCFullYear(),e=this.viewDate.getUTCMonth(),f=new Date;return b.getUTCFullYear()<d||b.getUTCFullYear()===d&&b.getUTCMonth()<e?c.push("old"):(b.getUTCFullYear()>d||b.getUTCFullYear()===d&&b.getUTCMonth()>e)&&c.push("new"),this.focusDate&&b.valueOf()===this.focusDate.valueOf()&&c.push("focused"),this.o.todayHighlight&&b.getUTCFullYear()===f.getFullYear()&&b.getUTCMonth()===f.getMonth()&&b.getUTCDate()===f.getDate()&&c.push("today"),-1!==this.dates.contains(b)&&c.push("active"),this.dateWithinRange(b)||c.push("disabled"),this.dateIsDisabled(b)&&c.push("disabled","disabled-date"),-1!==a.inArray(b.getUTCDay(),this.o.daysOfWeekHighlighted)&&c.push("highlighted"),this.range&&(b>this.range[0]&&b<this.range[this.range.length-1]&&c.push("range"),-1!==a.inArray(b.valueOf(),this.range)&&c.push("selected"),b.valueOf()===this.range[0]&&c.push("range-start"),b.valueOf()===this.range[this.range.length-1]&&c.push("range-end")),c},_fill_yearsView:function(c,d,e,f,g,h,i,j){var k,l,m,n,o,p,q,r,s,t,u;for(k="",l=this.picker.find(c),m=parseInt(g/e,10)*e,o=parseInt(h/f,10)*f,p=parseInt(i/f,10)*f,n=a.map(this.dates,function(a){return parseInt(a.getUTCFullYear()/f,10)*f}),l.find(".datepicker-switch").text(m+"-"+(m+9*f)),q=m-f,r=-1;11>r;r+=1)s=[d],t=null,-1===r?s.push("old"):10===r&&s.push("new"),-1!==a.inArray(q,n)&&s.push("active"),(o>q||q>p)&&s.push("disabled"),q===this.viewDate.getFullYear()&&s.push("focused"),j!==a.noop&&(u=j(new Date(q,0,1)),u===b?u={}:"boolean"==typeof u?u={enabled:u}:"string"==typeof u&&(u={classes:u}),u.enabled===!1&&s.push("disabled"),u.classes&&(s=s.concat(u.classes.split(/\s+/))),u.tooltip&&(t=u.tooltip)),k+='<span class="'+s.join(" ")+'"'+(t?' title="'+t+'"':"")+">"+q+"</span>",q+=f;l.find("td").html(k)},fill:function(){var d,e,f=new Date(this.viewDate),g=f.getUTCFullYear(),h=f.getUTCMonth(),i=this.o.startDate!==-(1/0)?this.o.startDate.getUTCFullYear():-(1/0),j=this.o.startDate!==-(1/0)?this.o.startDate.getUTCMonth():-(1/0),k=this.o.endDate!==1/0?this.o.endDate.getUTCFullYear():1/0,l=this.o.endDate!==1/0?this.o.endDate.getUTCMonth():1/0,m=q[this.o.language].today||q.en.today||"",n=q[this.o.language].clear||q.en.clear||"",o=q[this.o.language].titleFormat||q.en.titleFormat;if(!isNaN(g)&&!isNaN(h)){this.picker.find(".datepicker-days .datepicker-switch").text(r.formatDate(f,o,this.o.language)),this.picker.find("tfoot .today").text(m).toggle(this.o.todayBtn!==!1),this.picker.find("tfoot .clear").text(n).toggle(this.o.clearBtn!==!1),this.picker.find("thead .datepicker-title").text(this.o.title).toggle(""!==this.o.title),this.updateNavArrows(),this.fillMonths();var p=c(g,h-1,28),s=r.getDaysInMonth(p.getUTCFullYear(),p.getUTCMonth());p.setUTCDate(s),p.setUTCDate(s-(p.getUTCDay()-this.o.weekStart+7)%7);var t=new Date(p);p.getUTCFullYear()<100&&t.setUTCFullYear(p.getUTCFullYear()),t.setUTCDate(t.getUTCDate()+42),t=t.valueOf();for(var u,v=[];p.valueOf()<t;){if(p.getUTCDay()===this.o.weekStart&&(v.push("<tr>"),this.o.calendarWeeks)){var w=new Date(+p+(this.o.weekStart-p.getUTCDay()-7)%7*864e5),x=new Date(Number(w)+(11-w.getUTCDay())%7*864e5),y=new Date(Number(y=c(x.getUTCFullYear(),0,1))+(11-y.getUTCDay())%7*864e5),z=(x-y)/864e5/7+1;v.push('<td class="cw">'+z+"</td>")}u=this.getClassNames(p),u.push("day"),this.o.beforeShowDay!==a.noop&&(e=this.o.beforeShowDay(this._utc_to_local(p)),e===b?e={}:"boolean"==typeof e?e={enabled:e}:"string"==typeof e&&(e={classes:e}),e.enabled===!1&&u.push("disabled"),e.classes&&(u=u.concat(e.classes.split(/\s+/))),e.tooltip&&(d=e.tooltip)),u=a.unique(u),v.push('<td class="'+u.join(" ")+'"'+(d?' title="'+d+'"':"")+">"+p.getUTCDate()+"</td>"),d=null,p.getUTCDay()===this.o.weekEnd&&v.push("</tr>"),p.setUTCDate(p.getUTCDate()+1)}this.picker.find(".datepicker-days tbody").empty().append(v.join(""));var A=q[this.o.language].monthsTitle||q.en.monthsTitle||"Months",B=this.picker.find(".datepicker-months").find(".datepicker-switch").text(this.o.maxViewMode<2?A:g).end().find("span").removeClass("active");if(a.each(this.dates,function(a,b){b.getUTCFullYear()===g&&B.eq(b.getUTCMonth()).addClass("active")}),(i>g||g>k)&&B.addClass("disabled"),g===i&&B.slice(0,j).addClass("disabled"),g===k&&B.slice(l+1).addClass("disabled"),this.o.beforeShowMonth!==a.noop){var C=this;a.each(B,function(c,d){var e=new Date(g,c,1),f=C.o.beforeShowMonth(e);f===b?f={}:"boolean"==typeof f?f={enabled:f}:"string"==typeof f&&(f={classes:f}),f.enabled!==!1||a(d).hasClass("disabled")||a(d).addClass("disabled"),f.classes&&a(d).addClass(f.classes),f.tooltip&&a(d).prop("title",f.tooltip)})}this._fill_yearsView(".datepicker-years","year",10,1,g,i,k,this.o.beforeShowYear),this._fill_yearsView(".datepicker-decades","decade",100,10,g,i,k,this.o.beforeShowDecade),this._fill_yearsView(".datepicker-centuries","century",1e3,100,g,i,k,this.o.beforeShowCentury)}},updateNavArrows:function(){if(this._allow_update){var a=new Date(this.viewDate),b=a.getUTCFullYear(),c=a.getUTCMonth();switch(this.viewMode){case 0:this.o.startDate!==-(1/0)&&b<=this.o.startDate.getUTCFullYear()&&c<=this.o.startDate.getUTCMonth()?this.picker.find(".prev").css({visibility:"hidden"}):this.picker.find(".prev").css({visibility:"visible"}),this.o.endDate!==1/0&&b>=this.o.endDate.getUTCFullYear()&&c>=this.o.endDate.getUTCMonth()?this.picker.find(".next").css({visibility:"hidden"}):this.picker.find(".next").css({visibility:"visible"});break;case 1:case 2:case 3:case 4:this.o.startDate!==-(1/0)&&b<=this.o.startDate.getUTCFullYear()||this.o.maxViewMode<2?this.picker.find(".prev").css({visibility:"hidden"}):this.picker.find(".prev").css({visibility:"visible"}),this.o.endDate!==1/0&&b>=this.o.endDate.getUTCFullYear()||this.o.maxViewMode<2?this.picker.find(".next").css({visibility:"hidden"}):this.picker.find(".next").css({visibility:"visible"})}}},click:function(b){b.preventDefault(),b.stopPropagation();var e,f,g,h,i,j,k;e=a(b.target),e.hasClass("datepicker-switch")&&this.showMode(1);var l=e.closest(".prev, .next");l.length>0&&(f=r.modes[this.viewMode].navStep*(l.hasClass("prev")?-1:1),0===this.viewMode?(this.viewDate=this.moveMonth(this.viewDate,f),this._trigger("changeMonth",this.viewDate)):(this.viewDate=this.moveYear(this.viewDate,f),1===this.viewMode&&this._trigger("changeYear",this.viewDate)),this.fill()),e.hasClass("today")&&!e.hasClass("day")&&(this.showMode(-2),this._setDate(d(),"linked"===this.o.todayBtn?null:"view")),e.hasClass("clear")&&this.clearDates(),e.hasClass("disabled")||(e.hasClass("day")&&(g=parseInt(e.text(),10)||1,h=this.viewDate.getUTCFullYear(),i=this.viewDate.getUTCMonth(),e.hasClass("old")&&(0===i?(i=11,h-=1,j=!0,k=!0):(i-=1,j=!0)),e.hasClass("new")&&(11===i?(i=0,h+=1,j=!0,k=!0):(i+=1,j=!0)),this._setDate(c(h,i,g)),k&&this._trigger("changeYear",this.viewDate),j&&this._trigger("changeMonth",this.viewDate)),e.hasClass("month")&&(this.viewDate.setUTCDate(1),g=1,i=e.parent().find("span").index(e),h=this.viewDate.getUTCFullYear(),this.viewDate.setUTCMonth(i),this._trigger("changeMonth",this.viewDate),1===this.o.minViewMode?(this._setDate(c(h,i,g)),this.showMode()):this.showMode(-1),this.fill()),(e.hasClass("year")||e.hasClass("decade")||e.hasClass("century"))&&(this.viewDate.setUTCDate(1),g=1,i=0,h=parseInt(e.text(),10)||0,this.viewDate.setUTCFullYear(h),e.hasClass("year")&&(this._trigger("changeYear",this.viewDate),2===this.o.minViewMode&&this._setDate(c(h,i,g))),e.hasClass("decade")&&(this._trigger("changeDecade",this.viewDate),3===this.o.minViewMode&&this._setDate(c(h,i,g))),e.hasClass("century")&&(this._trigger("changeCentury",this.viewDate),4===this.o.minViewMode&&this._setDate(c(h,i,g))),this.showMode(-1),this.fill())),this.picker.is(":visible")&&this._focused_from&&a(this._focused_from).focus(),delete this._focused_from},_toggle_multidate:function(a){var b=this.dates.contains(a);if(a||this.dates.clear(),-1!==b?(this.o.multidate===!0||this.o.multidate>1||this.o.toggleActive)&&this.dates.remove(b):this.o.multidate===!1?(this.dates.clear(),this.dates.push(a)):this.dates.push(a),"number"==typeof this.o.multidate)for(;this.dates.length>this.o.multidate;)this.dates.remove(0)},_setDate:function(a,b){b&&"date"!==b||this._toggle_multidate(a&&new Date(a)),b&&"view"!==b||(this.viewDate=a&&new Date(a)),this.fill(),this.setValue(),b&&"view"===b||this._trigger("changeDate"),this.inputField&&this.inputField.change(),!this.o.autoclose||b&&"date"!==b||this.hide()},moveDay:function(a,b){var c=new Date(a);return c.setUTCDate(a.getUTCDate()+b),c},moveWeek:function(a,b){return this.moveDay(a,7*b)},moveMonth:function(a,b){if(!g(a))return this.o.defaultViewDate;if(!b)return a;var c,d,e=new Date(a.valueOf()),f=e.getUTCDate(),h=e.getUTCMonth(),i=Math.abs(b);if(b=b>0?1:-1,1===i)d=-1===b?function(){return e.getUTCMonth()===h}:function(){return e.getUTCMonth()!==c},c=h+b,e.setUTCMonth(c),(0>c||c>11)&&(c=(c+12)%12);else{for(var j=0;i>j;j++)e=this.moveMonth(e,b);c=e.getUTCMonth(),e.setUTCDate(f),d=function(){return c!==e.getUTCMonth()}}for(;d();)e.setUTCDate(--f),e.setUTCMonth(c);return e},moveYear:function(a,b){return this.moveMonth(a,12*b)},moveAvailableDate:function(a,b,c){do{if(a=this[c](a,b),!this.dateWithinRange(a))return!1;c="moveDay"}while(this.dateIsDisabled(a));return a},weekOfDateIsDisabled:function(b){return-1!==a.inArray(b.getUTCDay(),this.o.daysOfWeekDisabled)},dateIsDisabled:function(b){return this.weekOfDateIsDisabled(b)||a.grep(this.o.datesDisabled,function(a){return e(b,a)}).length>0},dateWithinRange:function(a){return a>=this.o.startDate&&a<=this.o.endDate},keydown:function(a){if(!this.picker.is(":visible"))return void((40===a.keyCode||27===a.keyCode)&&(this.show(),a.stopPropagation()));var b,c,d=!1,e=this.focusDate||this.viewDate;switch(a.keyCode){case 27:this.focusDate?(this.focusDate=null,this.viewDate=this.dates.get(-1)||this.viewDate,this.fill()):this.hide(),a.preventDefault(),a.stopPropagation();break;case 37:case 38:case 39:case 40:if(!this.o.keyboardNavigation||7===this.o.daysOfWeekDisabled.length)break;b=37===a.keyCode||38===a.keyCode?-1:1,0===this.viewMode?a.ctrlKey?(c=this.moveAvailableDate(e,b,"moveYear"),c&&this._trigger("changeYear",this.viewDate)):a.shiftKey?(c=this.moveAvailableDate(e,b,"moveMonth"),c&&this._trigger("changeMonth",this.viewDate)):37===a.keyCode||39===a.keyCode?c=this.moveAvailableDate(e,b,"moveDay"):this.weekOfDateIsDisabled(e)||(c=this.moveAvailableDate(e,b,"moveWeek")):1===this.viewMode?((38===a.keyCode||40===a.keyCode)&&(b=4*b),c=this.moveAvailableDate(e,b,"moveMonth")):2===this.viewMode&&((38===a.keyCode||40===a.keyCode)&&(b=4*b),c=this.moveAvailableDate(e,b,"moveYear")),c&&(this.focusDate=this.viewDate=c,this.setValue(),this.fill(),a.preventDefault());break;case 13:if(!this.o.forceParse)break;e=this.focusDate||this.dates.get(-1)||this.viewDate,this.o.keyboardNavigation&&(this._toggle_multidate(e),d=!0),this.focusDate=null,this.viewDate=this.dates.get(-1)||this.viewDate,this.setValue(),this.fill(),this.picker.is(":visible")&&(a.preventDefault(),a.stopPropagation(),this.o.autoclose&&this.hide());break;case 9:this.focusDate=null,this.viewDate=this.dates.get(-1)||this.viewDate,this.fill(),this.hide()}d&&(this.dates.length?this._trigger("changeDate"):this._trigger("clearDate"),this.inputField&&this.inputField.change())},showMode:function(a){a&&(this.viewMode=Math.max(this.o.minViewMode,Math.min(this.o.maxViewMode,this.viewMode+a))),this.picker.children("div").hide().filter(".datepicker-"+r.modes[this.viewMode].clsName).show(),this.updateNavArrows()}};var l=function(b,c){a(b).data("datepicker",this),this.element=a(b),this.inputs=a.map(c.inputs,function(a){return a.jquery?a[0]:a}),delete c.inputs,n.call(a(this.inputs),c).on("changeDate",a.proxy(this.dateUpdated,this)),this.pickers=a.map(this.inputs,function(b){return a(b).data("datepicker")}),this.updateDates()};l.prototype={updateDates:function(){this.dates=a.map(this.pickers,function(a){return a.getUTCDate()}),this.updateRanges()},updateRanges:function(){var b=a.map(this.dates,function(a){return a.valueOf()});a.each(this.pickers,function(a,c){c.setRange(b)})},dateUpdated:function(b){if(!this.updating){this.updating=!0;var c=a(b.target).data("datepicker");if("undefined"!=typeof c){var d=c.getUTCDate(),e=a.inArray(b.target,this.inputs),f=e-1,g=e+1,h=this.inputs.length;if(-1!==e){if(a.each(this.pickers,function(a,b){b.getUTCDate()||b.setUTCDate(d)}),d<this.dates[f])for(;f>=0&&d<this.dates[f];)this.pickers[f--].setUTCDate(d);else if(d>this.dates[g])for(;h>g&&d>this.dates[g];)this.pickers[g++].setUTCDate(d);this.updateDates(),delete this.updating}}}},remove:function(){a.map(this.pickers,function(a){a.remove()}),delete this.element.data().datepicker}};var m=a.fn.datepicker,n=function(c){var d=Array.apply(null,arguments);d.shift();var e;if(this.each(function(){var b=a(this),f=b.data("datepicker"),g="object"==typeof c&&c;if(!f){var j=h(this,"date"),m=a.extend({},o,j,g),n=i(m.language),p=a.extend({},o,n,j,g);b.hasClass("input-daterange")||p.inputs?(a.extend(p,{inputs:p.inputs||b.find("input").toArray()}),f=new l(this,p)):f=new k(this,p),b.data("datepicker",f)}"string"==typeof c&&"function"==typeof f[c]&&(e=f[c].apply(f,d))}),e===b||e instanceof k||e instanceof l)return this;if(this.length>1)throw new Error("Using only allowed for the collection of a single element ("+c+" function)");return e};a.fn.datepicker=n;var o=a.fn.datepicker.defaults={assumeNearbyYear:!1,autoclose:!1,beforeShowDay:a.noop,beforeShowMonth:a.noop,beforeShowYear:a.noop,beforeShowDecade:a.noop,beforeShowCentury:a.noop,calendarWeeks:!1,clearBtn:!1,toggleActive:!1,daysOfWeekDisabled:[],daysOfWeekHighlighted:[],datesDisabled:[],endDate:1/0,forceParse:!0,format:"mm/dd/yyyy",keyboardNavigation:!0,language:"en",minViewMode:0,maxViewMode:4,multidate:!1,multidateSeparator:",",orientation:"auto",rtl:!1,startDate:-(1/0),startView:0,todayBtn:!1,todayHighlight:!1,weekStart:0,disableTouchKeyboard:!1,enableOnReadonly:!0,showOnFocus:!0,zIndexOffset:10,container:"body",immediateUpdates:!1,title:"",templates:{leftArrow:"&laquo;",rightArrow:"&raquo;"}},p=a.fn.datepicker.locale_opts=["format","rtl","weekStart"];a.fn.datepicker.Constructor=k;var q=a.fn.datepicker.dates={en:{days:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],daysShort:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],daysMin:["Su","Mo","Tu","We","Th","Fr","Sa"],months:["January","February","March","April","May","June","July","August","September","October","November","December"],monthsShort:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],today:"Today",clear:"Clear",titleFormat:"MM yyyy"}},r={modes:[{clsName:"days",navFnc:"Month",navStep:1},{clsName:"months",navFnc:"FullYear",navStep:1},{clsName:"years",navFnc:"FullYear",navStep:10},{clsName:"decades",navFnc:"FullDecade",navStep:100},{clsName:"centuries",navFnc:"FullCentury",navStep:1e3}],isLeapYear:function(a){return a%4===0&&a%100!==0||a%400===0},getDaysInMonth:function(a,b){return[31,r.isLeapYear(a)?29:28,31,30,31,30,31,31,30,31,30,31][b]},validParts:/dd?|DD?|mm?|MM?|yy(?:yy)?/g,nonpunctuation:/[^ -\/:-@\u5e74\u6708\u65e5\[-`{-~\t\n\r]+/g,parseFormat:function(a){if("function"==typeof a.toValue&&"function"==typeof a.toDisplay)return a;var b=a.replace(this.validParts,"\x00").split("\x00"),c=a.match(this.validParts);if(!b||!b.length||!c||0===c.length)throw new Error("Invalid date format.");return{separators:b,parts:c}},parseDate:function(e,f,g,h){function i(a,b){return b===!0&&(b=10),100>a&&(a+=2e3,a>(new Date).getFullYear()+b&&(a-=100)),a}function j(){var a=this.slice(0,s[n].length),b=s[n].slice(0,a.length);return a.toLowerCase()===b.toLowerCase()}if(!e)return b;if(e instanceof Date)return e;if("string"==typeof f&&(f=r.parseFormat(f)),f.toValue)return f.toValue(e,f,g);var l,m,n,o,p=/([\-+]\d+)([dmwy])/,s=e.match(/([\-+]\d+)([dmwy])/g),t={d:"moveDay",m:"moveMonth",w:"moveWeek",y:"moveYear"},u={yesterday:"-1d",today:"+0d",tomorrow:"+1d"};if(/^[\-+]\d+[dmwy]([\s,]+[\-+]\d+[dmwy])*$/.test(e)){for(e=new Date,n=0;n<s.length;n++)l=p.exec(s[n]),m=parseInt(l[1]),o=t[l[2]],e=k.prototype[o](e,m);return c(e.getUTCFullYear(),e.getUTCMonth(),e.getUTCDate())}if("undefined"!=typeof u[e]&&(e=u[e],s=e.match(/([\-+]\d+)([dmwy])/g),/^[\-+]\d+[dmwy]([\s,]+[\-+]\d+[dmwy])*$/.test(e))){for(e=new Date,n=0;n<s.length;n++)l=p.exec(s[n]),m=parseInt(l[1]),o=t[l[2]],e=k.prototype[o](e,m);return c(e.getUTCFullYear(),e.getUTCMonth(),e.getUTCDate())}s=e&&e.match(this.nonpunctuation)||[],e=new Date;var v,w,x={},y=["yyyy","yy","M","MM","m","mm","d","dd"],z={yyyy:function(a,b){return a.setUTCFullYear(h?i(b,h):b)},yy:function(a,b){return a.setUTCFullYear(h?i(b,h):b)},m:function(a,b){if(isNaN(a))return a;for(b-=1;0>b;)b+=12;for(b%=12,a.setUTCMonth(b);a.getUTCMonth()!==b;)a.setUTCDate(a.getUTCDate()-1);return a},d:function(a,b){return a.setUTCDate(b)}};z.M=z.MM=z.mm=z.m,z.dd=z.d,e=d();var A=f.parts.slice();if(s.length!==A.length&&(A=a(A).filter(function(b,c){return-1!==a.inArray(c,y)}).toArray()),s.length===A.length){var B;for(n=0,B=A.length;B>n;n++){if(v=parseInt(s[n],10),l=A[n],isNaN(v))switch(l){case"MM":w=a(q[g].months).filter(j),v=a.inArray(w[0],q[g].months)+1;break;case"M":w=a(q[g].monthsShort).filter(j),v=a.inArray(w[0],q[g].monthsShort)+1}x[l]=v}var C,D;for(n=0;n<y.length;n++)D=y[n],D in x&&!isNaN(x[D])&&(C=new Date(e),z[D](C,x[D]),isNaN(C)||(e=C))}return e},formatDate:function(b,c,d){if(!b)return"";if("string"==typeof c&&(c=r.parseFormat(c)),c.toDisplay)return c.toDisplay(b,c,d);
var e={d:b.getUTCDate(),D:q[d].daysShort[b.getUTCDay()],DD:q[d].days[b.getUTCDay()],m:b.getUTCMonth()+1,M:q[d].monthsShort[b.getUTCMonth()],MM:q[d].months[b.getUTCMonth()],yy:b.getUTCFullYear().toString().substring(2),yyyy:b.getUTCFullYear()};e.dd=(e.d<10?"0":"")+e.d,e.mm=(e.m<10?"0":"")+e.m,b=[];for(var f=a.extend([],c.separators),g=0,h=c.parts.length;h>=g;g++)f.length&&b.push(f.shift()),b.push(e[c.parts[g]]);return b.join("")},headTemplate:'<thead><tr><th colspan="7" class="datepicker-title"></th></tr><tr><th class="prev">&laquo;</th><th colspan="5" class="datepicker-switch"></th><th class="next">&raquo;</th></tr></thead>',contTemplate:'<tbody><tr><td colspan="7"></td></tr></tbody>',footTemplate:'<tfoot><tr><th colspan="7" class="today"></th></tr><tr><th colspan="7" class="clear"></th></tr></tfoot>'};r.template='<div class="datepicker"><div class="datepicker-days"><table class="table-condensed">'+r.headTemplate+"<tbody></tbody>"+r.footTemplate+'</table></div><div class="datepicker-months"><table class="table-condensed">'+r.headTemplate+r.contTemplate+r.footTemplate+'</table></div><div class="datepicker-years"><table class="table-condensed">'+r.headTemplate+r.contTemplate+r.footTemplate+'</table></div><div class="datepicker-decades"><table class="table-condensed">'+r.headTemplate+r.contTemplate+r.footTemplate+'</table></div><div class="datepicker-centuries"><table class="table-condensed">'+r.headTemplate+r.contTemplate+r.footTemplate+"</table></div></div>",a.fn.datepicker.DPGlobal=r,a.fn.datepicker.noConflict=function(){return a.fn.datepicker=m,this},a.fn.datepicker.version="1.6.1",a(document).on("focus.datepicker.data-api click.datepicker.data-api",'[data-provide="datepicker"]',function(b){var c=a(this);c.data("datepicker")||(b.preventDefault(),n.call(c,"show"))}),a(function(){n.call(a('[data-provide="datepicker-inline"]'))})});

/***/ },

/***/ 793:
/***/ function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(jQuery) {/*! bootstrap-timepicker v0.5.2 
* http://jdewit.github.com/bootstrap-timepicker 
* Copyright (c) 2016 Joris de Wit and bootstrap-timepicker contributors 
* MIT License 
*/!function(a,b,c){"use strict";var d=function(b,c){this.widget="",this.$element=a(b),this.defaultTime=c.defaultTime,this.disableFocus=c.disableFocus,this.disableMousewheel=c.disableMousewheel,this.isOpen=c.isOpen,this.minuteStep=c.minuteStep,this.modalBackdrop=c.modalBackdrop,this.orientation=c.orientation,this.secondStep=c.secondStep,this.snapToStep=c.snapToStep,this.showInputs=c.showInputs,this.showMeridian=c.showMeridian,this.showSeconds=c.showSeconds,this.template=c.template,this.appendWidgetTo=c.appendWidgetTo,this.showWidgetOnAddonClick=c.showWidgetOnAddonClick,this.icons=c.icons,this.maxHours=c.maxHours,this.explicitMode=c.explicitMode,this.handleDocumentClick=function(a){var b=a.data.scope;b.$element.parent().find(a.target).length||b.$widget.is(a.target)||b.$widget.find(a.target).length||b.hideWidget()},this._init()};d.prototype={constructor:d,_init:function(){var b=this;this.showWidgetOnAddonClick&&this.$element.parent().hasClass("input-group")&&this.$element.parent().hasClass("bootstrap-timepicker")?(this.$element.parent(".input-group.bootstrap-timepicker").find(".input-group-addon").on({"click.timepicker":a.proxy(this.showWidget,this)}),this.$element.on({"focus.timepicker":a.proxy(this.highlightUnit,this),"click.timepicker":a.proxy(this.highlightUnit,this),"keydown.timepicker":a.proxy(this.elementKeydown,this),"blur.timepicker":a.proxy(this.blurElement,this),"mousewheel.timepicker DOMMouseScroll.timepicker":a.proxy(this.mousewheel,this)})):this.template?this.$element.on({"focus.timepicker":a.proxy(this.showWidget,this),"click.timepicker":a.proxy(this.showWidget,this),"blur.timepicker":a.proxy(this.blurElement,this),"mousewheel.timepicker DOMMouseScroll.timepicker":a.proxy(this.mousewheel,this)}):this.$element.on({"focus.timepicker":a.proxy(this.highlightUnit,this),"click.timepicker":a.proxy(this.highlightUnit,this),"keydown.timepicker":a.proxy(this.elementKeydown,this),"blur.timepicker":a.proxy(this.blurElement,this),"mousewheel.timepicker DOMMouseScroll.timepicker":a.proxy(this.mousewheel,this)}),this.template!==!1?this.$widget=a(this.getTemplate()).on("click",a.proxy(this.widgetClick,this)):this.$widget=!1,this.showInputs&&this.$widget!==!1&&this.$widget.find("input").each(function(){a(this).on({"click.timepicker":function(){a(this).select()},"keydown.timepicker":a.proxy(b.widgetKeydown,b),"keyup.timepicker":a.proxy(b.widgetKeyup,b)})}),this.setDefaultTime(this.defaultTime)},blurElement:function(){this.highlightedUnit=null,this.updateFromElementVal()},clear:function(){this.hour="",this.minute="",this.second="",this.meridian="",this.$element.val("")},decrementHour:function(){if(this.showMeridian)if(1===this.hour)this.hour=12;else{if(12===this.hour)return this.hour--,this.toggleMeridian();if(0===this.hour)return this.hour=11,this.toggleMeridian();this.hour--}else this.hour<=0?this.hour=this.maxHours-1:this.hour--},decrementMinute:function(a){var b;b=a?this.minute-a:this.minute-this.minuteStep,0>b?(this.decrementHour(),this.minute=b+60):this.minute=b},decrementSecond:function(){var a=this.second-this.secondStep;0>a?(this.decrementMinute(!0),this.second=a+60):this.second=a},elementKeydown:function(a){switch(a.which){case 9:if(a.shiftKey){if("hour"===this.highlightedUnit){this.hideWidget();break}this.highlightPrevUnit()}else{if(this.showMeridian&&"meridian"===this.highlightedUnit||this.showSeconds&&"second"===this.highlightedUnit||!this.showMeridian&&!this.showSeconds&&"minute"===this.highlightedUnit){this.hideWidget();break}this.highlightNextUnit()}a.preventDefault(),this.updateFromElementVal();break;case 27:this.updateFromElementVal();break;case 37:a.preventDefault(),this.highlightPrevUnit(),this.updateFromElementVal();break;case 38:switch(a.preventDefault(),this.highlightedUnit){case"hour":this.incrementHour(),this.highlightHour();break;case"minute":this.incrementMinute(),this.highlightMinute();break;case"second":this.incrementSecond(),this.highlightSecond();break;case"meridian":this.toggleMeridian(),this.highlightMeridian()}this.update();break;case 39:a.preventDefault(),this.highlightNextUnit(),this.updateFromElementVal();break;case 40:switch(a.preventDefault(),this.highlightedUnit){case"hour":this.decrementHour(),this.highlightHour();break;case"minute":this.decrementMinute(),this.highlightMinute();break;case"second":this.decrementSecond(),this.highlightSecond();break;case"meridian":this.toggleMeridian(),this.highlightMeridian()}this.update()}},getCursorPosition:function(){var a=this.$element.get(0);if("selectionStart"in a)return a.selectionStart;if(c.selection){a.focus();var b=c.selection.createRange(),d=c.selection.createRange().text.length;return b.moveStart("character",-a.value.length),b.text.length-d}},getTemplate:function(){var a,b,c,d,e,f;switch(this.showInputs?(b='<input type="text" class="bootstrap-timepicker-hour" maxlength="2"/>',c='<input type="text" class="bootstrap-timepicker-minute" maxlength="2"/>',d='<input type="text" class="bootstrap-timepicker-second" maxlength="2"/>',e='<input type="text" class="bootstrap-timepicker-meridian" maxlength="2"/>'):(b='<span class="bootstrap-timepicker-hour"></span>',c='<span class="bootstrap-timepicker-minute"></span>',d='<span class="bootstrap-timepicker-second"></span>',e='<span class="bootstrap-timepicker-meridian"></span>'),f='<table><tr><td><a href="#" data-action="incrementHour"><span class="'+this.icons.up+'"></span></a></td><td class="separator">&nbsp;</td><td><a href="#" data-action="incrementMinute"><span class="'+this.icons.up+'"></span></a></td>'+(this.showSeconds?'<td class="separator">&nbsp;</td><td><a href="#" data-action="incrementSecond"><span class="'+this.icons.up+'"></span></a></td>':"")+(this.showMeridian?'<td class="separator">&nbsp;</td><td class="meridian-column"><a href="#" data-action="toggleMeridian"><span class="'+this.icons.up+'"></span></a></td>':"")+"</tr><tr><td>"+b+'</td> <td class="separator">:</td><td>'+c+"</td> "+(this.showSeconds?'<td class="separator">:</td><td>'+d+"</td>":"")+(this.showMeridian?'<td class="separator">&nbsp;</td><td>'+e+"</td>":"")+'</tr><tr><td><a href="#" data-action="decrementHour"><span class="'+this.icons.down+'"></span></a></td><td class="separator"></td><td><a href="#" data-action="decrementMinute"><span class="'+this.icons.down+'"></span></a></td>'+(this.showSeconds?'<td class="separator">&nbsp;</td><td><a href="#" data-action="decrementSecond"><span class="'+this.icons.down+'"></span></a></td>':"")+(this.showMeridian?'<td class="separator">&nbsp;</td><td><a href="#" data-action="toggleMeridian"><span class="'+this.icons.down+'"></span></a></td>':"")+"</tr></table>",this.template){case"modal":a='<div class="bootstrap-timepicker-widget modal hide fade in" data-backdrop="'+(this.modalBackdrop?"true":"false")+'"><div class="modal-header"><a href="#" class="close" data-dismiss="modal">&times;</a><h3>Pick a Time</h3></div><div class="modal-content">'+f+'</div><div class="modal-footer"><a href="#" class="btn btn-primary" data-dismiss="modal">OK</a></div></div>';break;case"dropdown":a='<div class="bootstrap-timepicker-widget dropdown-menu">'+f+"</div>"}return a},getTime:function(){return""===this.hour?"":this.hour+":"+(1===this.minute.toString().length?"0"+this.minute:this.minute)+(this.showSeconds?":"+(1===this.second.toString().length?"0"+this.second:this.second):"")+(this.showMeridian?" "+this.meridian:"")},hideWidget:function(){this.isOpen!==!1&&(this.$element.trigger({type:"hide.timepicker",time:{value:this.getTime(),hours:this.hour,minutes:this.minute,seconds:this.second,meridian:this.meridian}}),"modal"===this.template&&this.$widget.modal?this.$widget.modal("hide"):this.$widget.removeClass("open"),a(c).off("mousedown.timepicker, touchend.timepicker",this.handleDocumentClick),this.isOpen=!1,this.$widget.detach())},highlightUnit:function(){this.position=this.getCursorPosition(),this.position>=0&&this.position<=2?this.highlightHour():this.position>=3&&this.position<=5?this.highlightMinute():this.position>=6&&this.position<=8?this.showSeconds?this.highlightSecond():this.highlightMeridian():this.position>=9&&this.position<=11&&this.highlightMeridian()},highlightNextUnit:function(){switch(this.highlightedUnit){case"hour":this.highlightMinute();break;case"minute":this.showSeconds?this.highlightSecond():this.showMeridian?this.highlightMeridian():this.highlightHour();break;case"second":this.showMeridian?this.highlightMeridian():this.highlightHour();break;case"meridian":this.highlightHour()}},highlightPrevUnit:function(){switch(this.highlightedUnit){case"hour":this.showMeridian?this.highlightMeridian():this.showSeconds?this.highlightSecond():this.highlightMinute();break;case"minute":this.highlightHour();break;case"second":this.highlightMinute();break;case"meridian":this.showSeconds?this.highlightSecond():this.highlightMinute()}},highlightHour:function(){var a=this.$element.get(0),b=this;this.highlightedUnit="hour",a.setSelectionRange&&setTimeout(function(){b.hour<10?a.setSelectionRange(0,1):a.setSelectionRange(0,2)},0)},highlightMinute:function(){var a=this.$element.get(0),b=this;this.highlightedUnit="minute",a.setSelectionRange&&setTimeout(function(){b.hour<10?a.setSelectionRange(2,4):a.setSelectionRange(3,5)},0)},highlightSecond:function(){var a=this.$element.get(0),b=this;this.highlightedUnit="second",a.setSelectionRange&&setTimeout(function(){b.hour<10?a.setSelectionRange(5,7):a.setSelectionRange(6,8)},0)},highlightMeridian:function(){var a=this.$element.get(0),b=this;this.highlightedUnit="meridian",a.setSelectionRange&&(this.showSeconds?setTimeout(function(){b.hour<10?a.setSelectionRange(8,10):a.setSelectionRange(9,11)},0):setTimeout(function(){b.hour<10?a.setSelectionRange(5,7):a.setSelectionRange(6,8)},0))},incrementHour:function(){if(this.showMeridian){if(11===this.hour)return this.hour++,this.toggleMeridian();12===this.hour&&(this.hour=0)}return this.hour===this.maxHours-1?void(this.hour=0):void this.hour++},incrementMinute:function(a){var b;b=a?this.minute+a:this.minute+this.minuteStep-this.minute%this.minuteStep,b>59?(this.incrementHour(),this.minute=b-60):this.minute=b},incrementSecond:function(){var a=this.second+this.secondStep-this.second%this.secondStep;a>59?(this.incrementMinute(!0),this.second=a-60):this.second=a},mousewheel:function(b){if(!this.disableMousewheel){b.preventDefault(),b.stopPropagation();var c=b.originalEvent.wheelDelta||-b.originalEvent.detail,d=null;switch("mousewheel"===b.type?d=-1*b.originalEvent.wheelDelta:"DOMMouseScroll"===b.type&&(d=40*b.originalEvent.detail),d&&(b.preventDefault(),a(this).scrollTop(d+a(this).scrollTop())),this.highlightedUnit){case"minute":c>0?this.incrementMinute():this.decrementMinute(),this.highlightMinute();break;case"second":c>0?this.incrementSecond():this.decrementSecond(),this.highlightSecond();break;case"meridian":this.toggleMeridian(),this.highlightMeridian();break;default:c>0?this.incrementHour():this.decrementHour(),this.highlightHour()}return!1}},changeToNearestStep:function(a,b){return a%b===0?a:Math.round(a%b/b)?(a+(b-a%b))%60:a-a%b},place:function(){if(!this.isInline){var c=this.$widget.outerWidth(),d=this.$widget.outerHeight(),e=10,f=a(b).width(),g=a(b).height(),h=a(b).scrollTop(),i=parseInt(this.$element.parents().filter(function(){return"auto"!==a(this).css("z-index")}).first().css("z-index"),10)+10,j=this.component?this.component.parent().offset():this.$element.offset(),k=this.component?this.component.outerHeight(!0):this.$element.outerHeight(!1),l=this.component?this.component.outerWidth(!0):this.$element.outerWidth(!1),m=j.left,n=j.top;this.$widget.removeClass("timepicker-orient-top timepicker-orient-bottom timepicker-orient-right timepicker-orient-left"),"auto"!==this.orientation.x?(this.$widget.addClass("timepicker-orient-"+this.orientation.x),"right"===this.orientation.x&&(m-=c-l)):(this.$widget.addClass("timepicker-orient-left"),j.left<0?m-=j.left-e:j.left+c>f&&(m=f-c-e));var o,p,q=this.orientation.y;"auto"===q&&(o=-h+j.top-d,p=h+g-(j.top+k+d),q=Math.max(o,p)===p?"top":"bottom"),this.$widget.addClass("timepicker-orient-"+q),"top"===q?n+=k:n-=d+parseInt(this.$widget.css("padding-top"),10),this.$widget.css({top:n,left:m,zIndex:i})}},remove:function(){a("document").off(".timepicker"),this.$widget&&this.$widget.remove(),delete this.$element.data().timepicker},setDefaultTime:function(a){if(this.$element.val())this.updateFromElementVal();else if("current"===a){var b=new Date,c=b.getHours(),d=b.getMinutes(),e=b.getSeconds(),f="AM";0!==e&&(e=Math.ceil(b.getSeconds()/this.secondStep)*this.secondStep,60===e&&(d+=1,e=0)),0!==d&&(d=Math.ceil(b.getMinutes()/this.minuteStep)*this.minuteStep,60===d&&(c+=1,d=0)),this.showMeridian&&(0===c?c=12:c>=12?(c>12&&(c-=12),f="PM"):f="AM"),this.hour=c,this.minute=d,this.second=e,this.meridian=f,this.update()}else a===!1?(this.hour=0,this.minute=0,this.second=0,this.meridian="AM"):this.setTime(a)},setTime:function(a,b){if(!a)return void this.clear();var c,d,e,f,g,h;if("object"==typeof a&&a.getMonth)e=a.getHours(),f=a.getMinutes(),g=a.getSeconds(),this.showMeridian&&(h="AM",e>12&&(h="PM",e%=12),12===e&&(h="PM"));else{if(c=(/a/i.test(a)?1:0)+(/p/i.test(a)?2:0),c>2)return void this.clear();if(d=a.replace(/[^0-9\:]/g,"").split(":"),e=d[0]?d[0].toString():d.toString(),this.explicitMode&&e.length>2&&e.length%2!==0)return void this.clear();f=d[1]?d[1].toString():"",g=d[2]?d[2].toString():"",e.length>4&&(g=e.slice(-2),e=e.slice(0,-2)),e.length>2&&(f=e.slice(-2),e=e.slice(0,-2)),f.length>2&&(g=f.slice(-2),f=f.slice(0,-2)),e=parseInt(e,10),f=parseInt(f,10),g=parseInt(g,10),isNaN(e)&&(e=0),isNaN(f)&&(f=0),isNaN(g)&&(g=0),g>59&&(g=59),f>59&&(f=59),e>=this.maxHours&&(e=this.maxHours-1),this.showMeridian?(e>12&&(c=2,e-=12),c||(c=1),0===e&&(e=12),h=1===c?"AM":"PM"):12>e&&2===c?e+=12:e>=this.maxHours?e=this.maxHours-1:(0>e||12===e&&1===c)&&(e=0)}this.hour=e,this.snapToStep?(this.minute=this.changeToNearestStep(f,this.minuteStep),this.second=this.changeToNearestStep(g,this.secondStep)):(this.minute=f,this.second=g),this.meridian=h,this.update(b)},showWidget:function(){this.isOpen||this.$element.is(":disabled")||(this.$widget.appendTo(this.appendWidgetTo),a(c).on("mousedown.timepicker, touchend.timepicker",{scope:this},this.handleDocumentClick),this.$element.trigger({type:"show.timepicker",time:{value:this.getTime(),hours:this.hour,minutes:this.minute,seconds:this.second,meridian:this.meridian}}),this.place(),this.disableFocus&&this.$element.blur(),""===this.hour&&(this.defaultTime?this.setDefaultTime(this.defaultTime):this.setTime("0:0:0")),"modal"===this.template&&this.$widget.modal?this.$widget.modal("show").on("hidden",a.proxy(this.hideWidget,this)):this.isOpen===!1&&this.$widget.addClass("open"),this.isOpen=!0)},toggleMeridian:function(){this.meridian="AM"===this.meridian?"PM":"AM"},update:function(a){this.updateElement(),a||this.updateWidget(),this.$element.trigger({type:"changeTime.timepicker",time:{value:this.getTime(),hours:this.hour,minutes:this.minute,seconds:this.second,meridian:this.meridian}})},updateElement:function(){this.$element.val(this.getTime()).change()},updateFromElementVal:function(){this.setTime(this.$element.val())},updateWidget:function(){if(this.$widget!==!1){var a=this.hour,b=1===this.minute.toString().length?"0"+this.minute:this.minute,c=1===this.second.toString().length?"0"+this.second:this.second;this.showInputs?(this.$widget.find("input.bootstrap-timepicker-hour").val(a),this.$widget.find("input.bootstrap-timepicker-minute").val(b),this.showSeconds&&this.$widget.find("input.bootstrap-timepicker-second").val(c),this.showMeridian&&this.$widget.find("input.bootstrap-timepicker-meridian").val(this.meridian)):(this.$widget.find("span.bootstrap-timepicker-hour").text(a),this.$widget.find("span.bootstrap-timepicker-minute").text(b),this.showSeconds&&this.$widget.find("span.bootstrap-timepicker-second").text(c),this.showMeridian&&this.$widget.find("span.bootstrap-timepicker-meridian").text(this.meridian))}},updateFromWidgetInputs:function(){if(this.$widget!==!1){var a=this.$widget.find("input.bootstrap-timepicker-hour").val()+":"+this.$widget.find("input.bootstrap-timepicker-minute").val()+(this.showSeconds?":"+this.$widget.find("input.bootstrap-timepicker-second").val():"")+(this.showMeridian?this.$widget.find("input.bootstrap-timepicker-meridian").val():"");this.setTime(a,!0)}},widgetClick:function(b){b.stopPropagation(),b.preventDefault();var c=a(b.target),d=c.closest("a").data("action");d&&this[d](),this.update(),c.is("input")&&c.get(0).setSelectionRange(0,2)},widgetKeydown:function(b){var c=a(b.target),d=c.attr("class").replace("bootstrap-timepicker-","");switch(b.which){case 9:if(b.shiftKey){if("hour"===d)return this.hideWidget()}else if(this.showMeridian&&"meridian"===d||this.showSeconds&&"second"===d||!this.showMeridian&&!this.showSeconds&&"minute"===d)return this.hideWidget();break;case 27:this.hideWidget();break;case 38:switch(b.preventDefault(),d){case"hour":this.incrementHour();break;case"minute":this.incrementMinute();break;case"second":this.incrementSecond();break;case"meridian":this.toggleMeridian()}this.setTime(this.getTime()),c.get(0).setSelectionRange(0,2);break;case 40:switch(b.preventDefault(),d){case"hour":this.decrementHour();break;case"minute":this.decrementMinute();break;case"second":this.decrementSecond();break;case"meridian":this.toggleMeridian()}this.setTime(this.getTime()),c.get(0).setSelectionRange(0,2)}},widgetKeyup:function(a){(65===a.which||77===a.which||80===a.which||46===a.which||8===a.which||a.which>=48&&a.which<=57||a.which>=96&&a.which<=105)&&this.updateFromWidgetInputs()}},a.fn.timepicker=function(b){var c=Array.apply(null,arguments);return c.shift(),this.each(function(){var e=a(this),f=e.data("timepicker"),g="object"==typeof b&&b;f||e.data("timepicker",f=new d(this,a.extend({},a.fn.timepicker.defaults,g,a(this).data()))),"string"==typeof b&&f[b].apply(f,c)})},a.fn.timepicker.defaults={defaultTime:"current",disableFocus:!1,disableMousewheel:!1,isOpen:!1,minuteStep:15,modalBackdrop:!1,orientation:{x:"auto",y:"auto"},secondStep:15,snapToStep:!1,showSeconds:!1,showInputs:!0,showMeridian:!0,template:"dropdown",appendWidgetTo:"body",showWidgetOnAddonClick:!0,icons:{up:"glyphicon glyphicon-chevron-up",down:"glyphicon glyphicon-chevron-down"},maxHours:24,explicitMode:!1},a.fn.timepicker.Constructor=d,a(c).on("focus.timepicker.data-api click.timepicker.data-api",'[data-provide="timepicker"]',function(b){var c=a(this);c.data("timepicker")||(b.preventDefault(),c.timepicker())})}(jQuery,window,document);
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(23)))

/***/ },

/***/ 794:
/***/ function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = __webpack_require__(10);
var select2_component_1 = __webpack_require__(637);
var select2_component_2 = __webpack_require__(637);
exports.Select2Component = select2_component_2.Select2Component;
var Select2Module = (function () {
    function Select2Module() {
    }
    return Select2Module;
}());
Select2Module = __decorate([
    core_1.NgModule({
        exports: [select2_component_1.Select2Component],
        declarations: [select2_component_1.Select2Component]
    }),
    __metadata("design:paramtypes", [])
], Select2Module);
exports.Select2Module = Select2Module;
//# sourceMappingURL=ng2-select2.js.map

/***/ },

/***/ 798:
/***/ function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {/*!
* Parsley.js
* Version 2.4.4 - built Thu, Aug 4th 2016, 9:54 pm
* http://parsleyjs.org
* Guillaume Potier - <guillaume@wisembly.com>
* Marc-Andre Lafortune - <petroselinum@marc-andre.ca>
* MIT Licensed
*/

// The source code below is generated by babel as
// Parsley is written in ECMAScript 6
//
var _slice = Array.prototype.slice;

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } }

(function (global, factory) {
   true ? module.exports = factory(__webpack_require__(23)) : typeof define === 'function' && define.amd ? define(['jquery'], factory) : global.parsley = factory(global.jQuery);
})(this, function ($) {
  'use strict';

  var globalID = 1;
  var pastWarnings = {};

  var ParsleyUtils__ParsleyUtils = {
    // Parsley DOM-API
    // returns object from dom attributes and values
    attr: function attr($element, namespace, obj) {
      var i;
      var attribute;
      var attributes;
      var regex = new RegExp('^' + namespace, 'i');

      if ('undefined' === typeof obj) obj = {};else {
        // Clear all own properties. This won't affect prototype's values
        for (i in obj) {
          if (obj.hasOwnProperty(i)) delete obj[i];
        }
      }

      if ('undefined' === typeof $element || 'undefined' === typeof $element[0]) return obj;

      attributes = $element[0].attributes;
      for (i = attributes.length; i--;) {
        attribute = attributes[i];

        if (attribute && attribute.specified && regex.test(attribute.name)) {
          obj[this.camelize(attribute.name.slice(namespace.length))] = this.deserializeValue(attribute.value);
        }
      }

      return obj;
    },

    checkAttr: function checkAttr($element, namespace, _checkAttr) {
      return $element.is('[' + namespace + _checkAttr + ']');
    },

    setAttr: function setAttr($element, namespace, attr, value) {
      $element[0].setAttribute(this.dasherize(namespace + attr), String(value));
    },

    generateID: function generateID() {
      return '' + globalID++;
    },

    /** Third party functions **/
    // Zepto deserialize function
    deserializeValue: function deserializeValue(value) {
      var num;

      try {
        return value ? value == "true" || (value == "false" ? false : value == "null" ? null : !isNaN(num = Number(value)) ? num : /^[\[\{]/.test(value) ? $.parseJSON(value) : value) : value;
      } catch (e) {
        return value;
      }
    },

    // Zepto camelize function
    camelize: function camelize(str) {
      return str.replace(/-+(.)?/g, function (match, chr) {
        return chr ? chr.toUpperCase() : '';
      });
    },

    // Zepto dasherize function
    dasherize: function dasherize(str) {
      return str.replace(/::/g, '/').replace(/([A-Z]+)([A-Z][a-z])/g, '$1_$2').replace(/([a-z\d])([A-Z])/g, '$1_$2').replace(/_/g, '-').toLowerCase();
    },

    warn: function warn() {
      var _window$console;

      if (window.console && 'function' === typeof window.console.warn) (_window$console = window.console).warn.apply(_window$console, arguments);
    },

    warnOnce: function warnOnce(msg) {
      if (!pastWarnings[msg]) {
        pastWarnings[msg] = true;
        this.warn.apply(this, arguments);
      }
    },

    _resetWarnings: function _resetWarnings() {
      pastWarnings = {};
    },

    trimString: function trimString(string) {
      return string.replace(/^\s+|\s+$/g, '');
    },

    namespaceEvents: function namespaceEvents(events, namespace) {
      events = this.trimString(events || '').split(/\s+/);
      if (!events[0]) return '';
      return $.map(events, function (evt) {
        return evt + '.' + namespace;
      }).join(' ');
    },

    difference: function difference(array, remove) {
      // This is O(N^2), should be optimized
      var result = [];
      $.each(array, function (_, elem) {
        if (remove.indexOf(elem) == -1) result.push(elem);
      });
      return result;
    },

    // Alter-ego to native Promise.all, but for jQuery
    all: function all(promises) {
      // jQuery treats $.when() and $.when(singlePromise) differently; let's avoid that and add spurious elements
      return $.when.apply($, _toConsumableArray(promises).concat([42, 42]));
    },

    // Object.create polyfill, see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/create#Polyfill
    objectCreate: Object.create || (function () {
      var Object = function Object() {};
      return function (prototype) {
        if (arguments.length > 1) {
          throw Error('Second argument not supported');
        }
        if (typeof prototype != 'object') {
          throw TypeError('Argument must be an object');
        }
        Object.prototype = prototype;
        var result = new Object();
        Object.prototype = null;
        return result;
      };
    })(),

    _SubmitSelector: 'input[type="submit"], button:submit'
  };

  var ParsleyUtils__default = ParsleyUtils__ParsleyUtils;

  // All these options could be overriden and specified directly in DOM using
  // `data-parsley-` default DOM-API
  // eg: `inputs` can be set in DOM using `data-parsley-inputs="input, textarea"`
  // eg: `data-parsley-stop-on-first-failing-constraint="false"`

  var ParsleyDefaults = {
    // ### General

    // Default data-namespace for DOM API
    namespace: 'data-parsley-',

    // Supported inputs by default
    inputs: 'input, textarea, select',

    // Excluded inputs by default
    excluded: 'input[type=button], input[type=submit], input[type=reset], input[type=hidden]',

    // Stop validating field on highest priority failing constraint
    priorityEnabled: true,

    // ### Field only

    // identifier used to group together inputs (e.g. radio buttons...)
    multiple: null,

    // identifier (or array of identifiers) used to validate only a select group of inputs
    group: null,

    // ### UI
    // Enable\Disable error messages
    uiEnabled: true,

    // Key events threshold before validation
    validationThreshold: 3,

    // Focused field on form validation error. 'first'|'last'|'none'
    focus: 'first',

    // event(s) that will trigger validation before first failure. eg: `input`...
    trigger: false,

    // event(s) that will trigger validation after first failure.
    triggerAfterFailure: 'input',

    // Class that would be added on every failing validation Parsley field
    errorClass: 'parsley-error',

    // Same for success validation
    successClass: 'parsley-success',

    // Return the `$element` that will receive these above success or error classes
    // Could also be (and given directly from DOM) a valid selector like `'#div'`
    classHandler: function classHandler(ParsleyField) {},

    // Return the `$element` where errors will be appended
    // Could also be (and given directly from DOM) a valid selector like `'#div'`
    errorsContainer: function errorsContainer(ParsleyField) {},

    // ul elem that would receive errors' list
    errorsWrapper: '<ul class="parsley-errors-list"></ul>',

    // li elem that would receive error message
    errorTemplate: '<li></li>'
  };

  var ParsleyAbstract = function ParsleyAbstract() {
    this.__id__ = ParsleyUtils__default.generateID();
  };

  ParsleyAbstract.prototype = {
    asyncSupport: true, // Deprecated

    _pipeAccordingToValidationResult: function _pipeAccordingToValidationResult() {
      var _this = this;

      var pipe = function pipe() {
        var r = $.Deferred();
        if (true !== _this.validationResult) r.reject();
        return r.resolve().promise();
      };
      return [pipe, pipe];
    },

    actualizeOptions: function actualizeOptions() {
      ParsleyUtils__default.attr(this.$element, this.options.namespace, this.domOptions);
      if (this.parent && this.parent.actualizeOptions) this.parent.actualizeOptions();
      return this;
    },

    _resetOptions: function _resetOptions(initOptions) {
      this.domOptions = ParsleyUtils__default.objectCreate(this.parent.options);
      this.options = ParsleyUtils__default.objectCreate(this.domOptions);
      // Shallow copy of ownProperties of initOptions:
      for (var i in initOptions) {
        if (initOptions.hasOwnProperty(i)) this.options[i] = initOptions[i];
      }
      this.actualizeOptions();
    },

    _listeners: null,

    // Register a callback for the given event name
    // Callback is called with context as the first argument and the `this`
    // The context is the current parsley instance, or window.Parsley if global
    // A return value of `false` will interrupt the calls
    on: function on(name, fn) {
      this._listeners = this._listeners || {};
      var queue = this._listeners[name] = this._listeners[name] || [];
      queue.push(fn);

      return this;
    },

    // Deprecated. Use `on` instead
    subscribe: function subscribe(name, fn) {
      $.listenTo(this, name.toLowerCase(), fn);
    },

    // Unregister a callback (or all if none is given) for the given event name
    off: function off(name, fn) {
      var queue = this._listeners && this._listeners[name];
      if (queue) {
        if (!fn) {
          delete this._listeners[name];
        } else {
          for (var i = queue.length; i--;) if (queue[i] === fn) queue.splice(i, 1);
        }
      }
      return this;
    },

    // Deprecated. Use `off`
    unsubscribe: function unsubscribe(name, fn) {
      $.unsubscribeTo(this, name.toLowerCase());
    },

    // Trigger an event of the given name
    // A return value of `false` interrupts the callback chain
    // Returns false if execution was interrupted
    trigger: function trigger(name, target, extraArg) {
      target = target || this;
      var queue = this._listeners && this._listeners[name];
      var result;
      var parentResult;
      if (queue) {
        for (var i = queue.length; i--;) {
          result = queue[i].call(target, target, extraArg);
          if (result === false) return result;
        }
      }
      if (this.parent) {
        return this.parent.trigger(name, target, extraArg);
      }
      return true;
    },

    // Reset UI
    reset: function reset() {
      // Field case: just emit a reset event for UI
      if ('ParsleyForm' !== this.__class__) {
        this._resetUI();
        return this._trigger('reset');
      }

      // Form case: emit a reset event for each field
      for (var i = 0; i < this.fields.length; i++) this.fields[i].reset();

      this._trigger('reset');
    },

    // Destroy Parsley instance (+ UI)
    destroy: function destroy() {
      // Field case: emit destroy event to clean UI and then destroy stored instance
      this._destroyUI();
      if ('ParsleyForm' !== this.__class__) {
        this.$element.removeData('Parsley');
        this.$element.removeData('ParsleyFieldMultiple');
        this._trigger('destroy');

        return;
      }

      // Form case: destroy all its fields and then destroy stored instance
      for (var i = 0; i < this.fields.length; i++) this.fields[i].destroy();

      this.$element.removeData('Parsley');
      this._trigger('destroy');
    },

    asyncIsValid: function asyncIsValid(group, force) {
      ParsleyUtils__default.warnOnce("asyncIsValid is deprecated; please use whenValid instead");
      return this.whenValid({ group: group, force: force });
    },

    _findRelated: function _findRelated() {
      return this.options.multiple ? this.parent.$element.find('[' + this.options.namespace + 'multiple="' + this.options.multiple + '"]') : this.$element;
    }
  };

  var requirementConverters = {
    string: function string(_string) {
      return _string;
    },
    integer: function integer(string) {
      if (isNaN(string)) throw 'Requirement is not an integer: "' + string + '"';
      return parseInt(string, 10);
    },
    number: function number(string) {
      if (isNaN(string)) throw 'Requirement is not a number: "' + string + '"';
      return parseFloat(string);
    },
    reference: function reference(string) {
      // Unused for now
      var result = $(string);
      if (result.length === 0) throw 'No such reference: "' + string + '"';
      return result;
    },
    boolean: function boolean(string) {
      return string !== 'false';
    },
    object: function object(string) {
      return ParsleyUtils__default.deserializeValue(string);
    },
    regexp: function regexp(_regexp) {
      var flags = '';

      // Test if RegExp is literal, if not, nothing to be done, otherwise, we need to isolate flags and pattern
      if (/^\/.*\/(?:[gimy]*)$/.test(_regexp)) {
        // Replace the regexp literal string with the first match group: ([gimy]*)
        // If no flag is present, this will be a blank string
        flags = _regexp.replace(/.*\/([gimy]*)$/, '$1');
        // Again, replace the regexp literal string with the first match group:
        // everything excluding the opening and closing slashes and the flags
        _regexp = _regexp.replace(new RegExp('^/(.*?)/' + flags + '$'), '$1');
      } else {
        // Anchor regexp:
        _regexp = '^' + _regexp + '$';
      }
      return new RegExp(_regexp, flags);
    }
  };

  var convertArrayRequirement = function convertArrayRequirement(string, length) {
    var m = string.match(/^\s*\[(.*)\]\s*$/);
    if (!m) throw 'Requirement is not an array: "' + string + '"';
    var values = m[1].split(',').map(ParsleyUtils__default.trimString);
    if (values.length !== length) throw 'Requirement has ' + values.length + ' values when ' + length + ' are needed';
    return values;
  };

  var convertRequirement = function convertRequirement(requirementType, string) {
    var converter = requirementConverters[requirementType || 'string'];
    if (!converter) throw 'Unknown requirement specification: "' + requirementType + '"';
    return converter(string);
  };

  var convertExtraOptionRequirement = function convertExtraOptionRequirement(requirementSpec, string, extraOptionReader) {
    var main = null;
    var extra = {};
    for (var key in requirementSpec) {
      if (key) {
        var value = extraOptionReader(key);
        if ('string' === typeof value) value = convertRequirement(requirementSpec[key], value);
        extra[key] = value;
      } else {
        main = convertRequirement(requirementSpec[key], string);
      }
    }
    return [main, extra];
  };

  // A Validator needs to implement the methods `validate` and `parseRequirements`

  var ParsleyValidator = function ParsleyValidator(spec) {
    $.extend(true, this, spec);
  };

  ParsleyValidator.prototype = {
    // Returns `true` iff the given `value` is valid according the given requirements.
    validate: function validate(value, requirementFirstArg) {
      if (this.fn) {
        // Legacy style validator

        if (arguments.length > 3) // If more args then value, requirement, instance...
          requirementFirstArg = [].slice.call(arguments, 1, -1); // Skip first arg (value) and last (instance), combining the rest
        return this.fn.call(this, value, requirementFirstArg);
      }

      if ($.isArray(value)) {
        if (!this.validateMultiple) throw 'Validator `' + this.name + '` does not handle multiple values';
        return this.validateMultiple.apply(this, arguments);
      } else {
        if (this.validateNumber) {
          if (isNaN(value)) return false;
          arguments[0] = parseFloat(arguments[0]);
          return this.validateNumber.apply(this, arguments);
        }
        if (this.validateString) {
          return this.validateString.apply(this, arguments);
        }
        throw 'Validator `' + this.name + '` only handles multiple values';
      }
    },

    // Parses `requirements` into an array of arguments,
    // according to `this.requirementType`
    parseRequirements: function parseRequirements(requirements, extraOptionReader) {
      if ('string' !== typeof requirements) {
        // Assume requirement already parsed
        // but make sure we return an array
        return $.isArray(requirements) ? requirements : [requirements];
      }
      var type = this.requirementType;
      if ($.isArray(type)) {
        var values = convertArrayRequirement(requirements, type.length);
        for (var i = 0; i < values.length; i++) values[i] = convertRequirement(type[i], values[i]);
        return values;
      } else if ($.isPlainObject(type)) {
        return convertExtraOptionRequirement(type, requirements, extraOptionReader);
      } else {
        return [convertRequirement(type, requirements)];
      }
    },
    // Defaults:
    requirementType: 'string',

    priority: 2

  };

  var ParsleyValidatorRegistry = function ParsleyValidatorRegistry(validators, catalog) {
    this.__class__ = 'ParsleyValidatorRegistry';

    // Default Parsley locale is en
    this.locale = 'en';

    this.init(validators || {}, catalog || {});
  };

  var typeRegexes = {
    email: /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i,

    // Follow https://www.w3.org/TR/html5/infrastructure.html#floating-point-numbers
    number: /^-?(\d*\.)?\d+(e[-+]?\d+)?$/i,

    integer: /^-?\d+$/,

    digits: /^\d+$/,

    alphanum: /^\w+$/i,

    url: new RegExp("^" +
    // protocol identifier
    "(?:(?:https?|ftp)://)?" + // ** mod: make scheme optional
    // user:pass authentication
    "(?:\\S+(?::\\S*)?@)?" + "(?:" +
    // IP address exclusion
    // private & local networks
    // "(?!(?:10|127)(?:\\.\\d{1,3}){3})" +   // ** mod: allow local networks
    // "(?!(?:169\\.254|192\\.168)(?:\\.\\d{1,3}){2})" +  // ** mod: allow local networks
    // "(?!172\\.(?:1[6-9]|2\\d|3[0-1])(?:\\.\\d{1,3}){2})" +  // ** mod: allow local networks
    // IP address dotted notation octets
    // excludes loopback network 0.0.0.0
    // excludes reserved space >= 224.0.0.0
    // excludes network & broacast addresses
    // (first & last IP address of each class)
    "(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])" + "(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}" + "(?:\\.(?:[1-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))" + "|" +
    // host name
    '(?:(?:[a-z\\u00a1-\\uffff0-9]-*)*[a-z\\u00a1-\\uffff0-9]+)' +
    // domain name
    '(?:\\.(?:[a-z\\u00a1-\\uffff0-9]-*)*[a-z\\u00a1-\\uffff0-9]+)*' +
    // TLD identifier
    '(?:\\.(?:[a-z\\u00a1-\\uffff]{2,}))' + ")" +
    // port number
    "(?::\\d{2,5})?" +
    // resource path
    "(?:/\\S*)?" + "$", 'i')
  };
  typeRegexes.range = typeRegexes.number;

  // See http://stackoverflow.com/a/10454560/8279
  var decimalPlaces = function decimalPlaces(num) {
    var match = ('' + num).match(/(?:\.(\d+))?(?:[eE]([+-]?\d+))?$/);
    if (!match) {
      return 0;
    }
    return Math.max(0,
    // Number of digits right of decimal point.
    (match[1] ? match[1].length : 0) - (
    // Adjust for scientific notation.
    match[2] ? +match[2] : 0));
  };

  ParsleyValidatorRegistry.prototype = {
    init: function init(validators, catalog) {
      this.catalog = catalog;
      // Copy prototype's validators:
      this.validators = $.extend({}, this.validators);

      for (var name in validators) this.addValidator(name, validators[name].fn, validators[name].priority);

      window.Parsley.trigger('parsley:validator:init');
    },

    // Set new messages locale if we have dictionary loaded in ParsleyConfig.i18n
    setLocale: function setLocale(locale) {
      if ('undefined' === typeof this.catalog[locale]) throw new Error(locale + ' is not available in the catalog');

      this.locale = locale;

      return this;
    },

    // Add a new messages catalog for a given locale. Set locale for this catalog if set === `true`
    addCatalog: function addCatalog(locale, messages, set) {
      if ('object' === typeof messages) this.catalog[locale] = messages;

      if (true === set) return this.setLocale(locale);

      return this;
    },

    // Add a specific message for a given constraint in a given locale
    addMessage: function addMessage(locale, name, message) {
      if ('undefined' === typeof this.catalog[locale]) this.catalog[locale] = {};

      this.catalog[locale][name] = message;

      return this;
    },

    // Add messages for a given locale
    addMessages: function addMessages(locale, nameMessageObject) {
      for (var name in nameMessageObject) this.addMessage(locale, name, nameMessageObject[name]);

      return this;
    },

    // Add a new validator
    //
    //    addValidator('custom', {
    //        requirementType: ['integer', 'integer'],
    //        validateString: function(value, from, to) {},
    //        priority: 22,
    //        messages: {
    //          en: "Hey, that's no good",
    //          fr: "Aye aye, pas bon du tout",
    //        }
    //    })
    //
    // Old API was addValidator(name, function, priority)
    //
    addValidator: function addValidator(name, arg1, arg2) {
      if (this.validators[name]) ParsleyUtils__default.warn('Validator "' + name + '" is already defined.');else if (ParsleyDefaults.hasOwnProperty(name)) {
        ParsleyUtils__default.warn('"' + name + '" is a restricted keyword and is not a valid validator name.');
        return;
      }
      return this._setValidator.apply(this, arguments);
    },

    updateValidator: function updateValidator(name, arg1, arg2) {
      if (!this.validators[name]) {
        ParsleyUtils__default.warn('Validator "' + name + '" is not already defined.');
        return this.addValidator.apply(this, arguments);
      }
      return this._setValidator.apply(this, arguments);
    },

    removeValidator: function removeValidator(name) {
      if (!this.validators[name]) ParsleyUtils__default.warn('Validator "' + name + '" is not defined.');

      delete this.validators[name];

      return this;
    },

    _setValidator: function _setValidator(name, validator, priority) {
      if ('object' !== typeof validator) {
        // Old style validator, with `fn` and `priority`
        validator = {
          fn: validator,
          priority: priority
        };
      }
      if (!validator.validate) {
        validator = new ParsleyValidator(validator);
      }
      this.validators[name] = validator;

      for (var locale in validator.messages || {}) this.addMessage(locale, name, validator.messages[locale]);

      return this;
    },

    getErrorMessage: function getErrorMessage(constraint) {
      var message;

      // Type constraints are a bit different, we have to match their requirements too to find right error message
      if ('type' === constraint.name) {
        var typeMessages = this.catalog[this.locale][constraint.name] || {};
        message = typeMessages[constraint.requirements];
      } else message = this.formatMessage(this.catalog[this.locale][constraint.name], constraint.requirements);

      return message || this.catalog[this.locale].defaultMessage || this.catalog.en.defaultMessage;
    },

    // Kind of light `sprintf()` implementation
    formatMessage: function formatMessage(string, parameters) {
      if ('object' === typeof parameters) {
        for (var i in parameters) string = this.formatMessage(string, parameters[i]);

        return string;
      }

      return 'string' === typeof string ? string.replace(/%s/i, parameters) : '';
    },

    // Here is the Parsley default validators list.
    // A validator is an object with the following key values:
    //  - priority: an integer
    //  - requirement: 'string' (default), 'integer', 'number', 'regexp' or an Array of these
    //  - validateString, validateMultiple, validateNumber: functions returning `true`, `false` or a promise
    // Alternatively, a validator can be a function that returns such an object
    //
    validators: {
      notblank: {
        validateString: function validateString(value) {
          return (/\S/.test(value)
          );
        },
        priority: 2
      },
      required: {
        validateMultiple: function validateMultiple(values) {
          return values.length > 0;
        },
        validateString: function validateString(value) {
          return (/\S/.test(value)
          );
        },
        priority: 512
      },
      type: {
        validateString: function validateString(value, type) {
          var _ref = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

          var _ref$step = _ref.step;
          var step = _ref$step === undefined ? '1' : _ref$step;
          var _ref$base = _ref.base;
          var base = _ref$base === undefined ? 0 : _ref$base;

          var regex = typeRegexes[type];
          if (!regex) {
            throw new Error('validator type `' + type + '` is not supported');
          }
          if (!regex.test(value)) return false;
          if ('number' === type) {
            if (!/^any$/i.test(step || '')) {
              var nb = Number(value);
              var decimals = Math.max(decimalPlaces(step), decimalPlaces(base));
              if (decimalPlaces(nb) > decimals) // Value can't have too many decimals
                return false;
              // Be careful of rounding errors by using integers.
              var toInt = function toInt(f) {
                return Math.round(f * Math.pow(10, decimals));
              };
              if ((toInt(nb) - toInt(base)) % toInt(step) != 0) return false;
            }
          }
          return true;
        },
        requirementType: {
          '': 'string',
          step: 'string',
          base: 'number'
        },
        priority: 256
      },
      pattern: {
        validateString: function validateString(value, regexp) {
          return regexp.test(value);
        },
        requirementType: 'regexp',
        priority: 64
      },
      minlength: {
        validateString: function validateString(value, requirement) {
          return value.length >= requirement;
        },
        requirementType: 'integer',
        priority: 30
      },
      maxlength: {
        validateString: function validateString(value, requirement) {
          return value.length <= requirement;
        },
        requirementType: 'integer',
        priority: 30
      },
      length: {
        validateString: function validateString(value, min, max) {
          return value.length >= min && value.length <= max;
        },
        requirementType: ['integer', 'integer'],
        priority: 30
      },
      mincheck: {
        validateMultiple: function validateMultiple(values, requirement) {
          return values.length >= requirement;
        },
        requirementType: 'integer',
        priority: 30
      },
      maxcheck: {
        validateMultiple: function validateMultiple(values, requirement) {
          return values.length <= requirement;
        },
        requirementType: 'integer',
        priority: 30
      },
      check: {
        validateMultiple: function validateMultiple(values, min, max) {
          return values.length >= min && values.length <= max;
        },
        requirementType: ['integer', 'integer'],
        priority: 30
      },
      min: {
        validateNumber: function validateNumber(value, requirement) {
          return value >= requirement;
        },
        requirementType: 'number',
        priority: 30
      },
      max: {
        validateNumber: function validateNumber(value, requirement) {
          return value <= requirement;
        },
        requirementType: 'number',
        priority: 30
      },
      range: {
        validateNumber: function validateNumber(value, min, max) {
          return value >= min && value <= max;
        },
        requirementType: ['number', 'number'],
        priority: 30
      },
      equalto: {
        validateString: function validateString(value, refOrValue) {
          var $reference = $(refOrValue);
          if ($reference.length) return value === $reference.val();else return value === refOrValue;
        },
        priority: 256
      }
    }
  };

  var ParsleyUI = {};

  var diffResults = function diffResults(newResult, oldResult, deep) {
    var added = [];
    var kept = [];

    for (var i = 0; i < newResult.length; i++) {
      var found = false;

      for (var j = 0; j < oldResult.length; j++) if (newResult[i].assert.name === oldResult[j].assert.name) {
        found = true;
        break;
      }

      if (found) kept.push(newResult[i]);else added.push(newResult[i]);
    }

    return {
      kept: kept,
      added: added,
      removed: !deep ? diffResults(oldResult, newResult, true).added : []
    };
  };

  ParsleyUI.Form = {

    _actualizeTriggers: function _actualizeTriggers() {
      var _this2 = this;

      this.$element.on('submit.Parsley', function (evt) {
        _this2.onSubmitValidate(evt);
      });
      this.$element.on('click.Parsley', ParsleyUtils__default._SubmitSelector, function (evt) {
        _this2.onSubmitButton(evt);
      });

      // UI could be disabled
      if (false === this.options.uiEnabled) return;

      this.$element.attr('novalidate', '');
    },

    focus: function focus() {
      this._focusedField = null;

      if (true === this.validationResult || 'none' === this.options.focus) return null;

      for (var i = 0; i < this.fields.length; i++) {
        var field = this.fields[i];
        if (true !== field.validationResult && field.validationResult.length > 0 && 'undefined' === typeof field.options.noFocus) {
          this._focusedField = field.$element;
          if ('first' === this.options.focus) break;
        }
      }

      if (null === this._focusedField) return null;

      return this._focusedField.focus();
    },

    _destroyUI: function _destroyUI() {
      // Reset all event listeners
      this.$element.off('.Parsley');
    }

  };

  ParsleyUI.Field = {

    _reflowUI: function _reflowUI() {
      this._buildUI();

      // If this field doesn't have an active UI don't bother doing something
      if (!this._ui) return;

      // Diff between two validation results
      var diff = diffResults(this.validationResult, this._ui.lastValidationResult);

      // Then store current validation result for next reflow
      this._ui.lastValidationResult = this.validationResult;

      // Handle valid / invalid / none field class
      this._manageStatusClass();

      // Add, remove, updated errors messages
      this._manageErrorsMessages(diff);

      // Triggers impl
      this._actualizeTriggers();

      // If field is not valid for the first time, bind keyup trigger to ease UX and quickly inform user
      if ((diff.kept.length || diff.added.length) && !this._failedOnce) {
        this._failedOnce = true;
        this._actualizeTriggers();
      }
    },

    // Returns an array of field's error message(s)
    getErrorsMessages: function getErrorsMessages() {
      // No error message, field is valid
      if (true === this.validationResult) return [];

      var messages = [];

      for (var i = 0; i < this.validationResult.length; i++) messages.push(this.validationResult[i].errorMessage || this._getErrorMessage(this.validationResult[i].assert));

      return messages;
    },

    // It's a goal of Parsley that this method is no longer required [#1073]
    addError: function addError(name) {
      var _ref2 = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

      var message = _ref2.message;
      var assert = _ref2.assert;
      var _ref2$updateClass = _ref2.updateClass;
      var updateClass = _ref2$updateClass === undefined ? true : _ref2$updateClass;

      this._buildUI();
      this._addError(name, { message: message, assert: assert });

      if (updateClass) this._errorClass();
    },

    // It's a goal of Parsley that this method is no longer required [#1073]
    updateError: function updateError(name) {
      var _ref3 = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

      var message = _ref3.message;
      var assert = _ref3.assert;
      var _ref3$updateClass = _ref3.updateClass;
      var updateClass = _ref3$updateClass === undefined ? true : _ref3$updateClass;

      this._buildUI();
      this._updateError(name, { message: message, assert: assert });

      if (updateClass) this._errorClass();
    },

    // It's a goal of Parsley that this method is no longer required [#1073]
    removeError: function removeError(name) {
      var _ref4 = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

      var _ref4$updateClass = _ref4.updateClass;
      var updateClass = _ref4$updateClass === undefined ? true : _ref4$updateClass;

      this._buildUI();
      this._removeError(name);

      // edge case possible here: remove a standard Parsley error that is still failing in this.validationResult
      // but highly improbable cuz' manually removing a well Parsley handled error makes no sense.
      if (updateClass) this._manageStatusClass();
    },

    _manageStatusClass: function _manageStatusClass() {
      if (this.hasConstraints() && this.needsValidation() && true === this.validationResult) this._successClass();else if (this.validationResult.length > 0) this._errorClass();else this._resetClass();
    },

    _manageErrorsMessages: function _manageErrorsMessages(diff) {
      if ('undefined' !== typeof this.options.errorsMessagesDisabled) return;

      // Case where we have errorMessage option that configure an unique field error message, regardless failing validators
      if ('undefined' !== typeof this.options.errorMessage) {
        if (diff.added.length || diff.kept.length) {
          this._insertErrorWrapper();

          if (0 === this._ui.$errorsWrapper.find('.parsley-custom-error-message').length) this._ui.$errorsWrapper.append($(this.options.errorTemplate).addClass('parsley-custom-error-message'));

          return this._ui.$errorsWrapper.addClass('filled').find('.parsley-custom-error-message').html(this.options.errorMessage);
        }

        return this._ui.$errorsWrapper.removeClass('filled').find('.parsley-custom-error-message').remove();
      }

      // Show, hide, update failing constraints messages
      for (var i = 0; i < diff.removed.length; i++) this._removeError(diff.removed[i].assert.name);

      for (i = 0; i < diff.added.length; i++) this._addError(diff.added[i].assert.name, { message: diff.added[i].errorMessage, assert: diff.added[i].assert });

      for (i = 0; i < diff.kept.length; i++) this._updateError(diff.kept[i].assert.name, { message: diff.kept[i].errorMessage, assert: diff.kept[i].assert });
    },

    _addError: function _addError(name, _ref5) {
      var message = _ref5.message;
      var assert = _ref5.assert;

      this._insertErrorWrapper();
      this._ui.$errorsWrapper.addClass('filled').append($(this.options.errorTemplate).addClass('parsley-' + name).html(message || this._getErrorMessage(assert)));
    },

    _updateError: function _updateError(name, _ref6) {
      var message = _ref6.message;
      var assert = _ref6.assert;

      this._ui.$errorsWrapper.addClass('filled').find('.parsley-' + name).html(message || this._getErrorMessage(assert));
    },

    _removeError: function _removeError(name) {
      this._ui.$errorsWrapper.removeClass('filled').find('.parsley-' + name).remove();
    },

    _getErrorMessage: function _getErrorMessage(constraint) {
      var customConstraintErrorMessage = constraint.name + 'Message';

      if ('undefined' !== typeof this.options[customConstraintErrorMessage]) return window.Parsley.formatMessage(this.options[customConstraintErrorMessage], constraint.requirements);

      return window.Parsley.getErrorMessage(constraint);
    },

    _buildUI: function _buildUI() {
      // UI could be already built or disabled
      if (this._ui || false === this.options.uiEnabled) return;

      var _ui = {};

      // Give field its Parsley id in DOM
      this.$element.attr(this.options.namespace + 'id', this.__id__);

      /** Generate important UI elements and store them in this **/
      // $errorClassHandler is the $element that woul have parsley-error and parsley-success classes
      _ui.$errorClassHandler = this._manageClassHandler();

      // $errorsWrapper is a div that would contain the various field errors, it will be appended into $errorsContainer
      _ui.errorsWrapperId = 'parsley-id-' + (this.options.multiple ? 'multiple-' + this.options.multiple : this.__id__);
      _ui.$errorsWrapper = $(this.options.errorsWrapper).attr('id', _ui.errorsWrapperId);

      // ValidationResult UI storage to detect what have changed bwt two validations, and update DOM accordingly
      _ui.lastValidationResult = [];
      _ui.validationInformationVisible = false;

      // Store it in this for later
      this._ui = _ui;
    },

    // Determine which element will have `parsley-error` and `parsley-success` classes
    _manageClassHandler: function _manageClassHandler() {
      // An element selector could be passed through DOM with `data-parsley-class-handler=#foo`
      if ('string' === typeof this.options.classHandler && $(this.options.classHandler).length) return $(this.options.classHandler);

      // Class handled could also be determined by function given in Parsley options
      var $handler = this.options.classHandler.call(this, this);

      // If this function returned a valid existing DOM element, go for it
      if ('undefined' !== typeof $handler && $handler.length) return $handler;

      return this._inputHolder();
    },

    _inputHolder: function _inputHolder() {
      // if simple element (input, texatrea, select...) it will perfectly host the classes and precede the error container
      if (!this.options.multiple || this.$element.is('select')) return this.$element;

      // But if multiple element (radio, checkbox), that would be their parent
      return this.$element.parent();
    },

    _insertErrorWrapper: function _insertErrorWrapper() {
      var $errorsContainer;

      // Nothing to do if already inserted
      if (0 !== this._ui.$errorsWrapper.parent().length) return this._ui.$errorsWrapper.parent();

      if ('string' === typeof this.options.errorsContainer) {
        if ($(this.options.errorsContainer).length) return $(this.options.errorsContainer).append(this._ui.$errorsWrapper);else ParsleyUtils__default.warn('The errors container `' + this.options.errorsContainer + '` does not exist in DOM');
      } else if ('function' === typeof this.options.errorsContainer) $errorsContainer = this.options.errorsContainer.call(this, this);

      if ('undefined' !== typeof $errorsContainer && $errorsContainer.length) return $errorsContainer.append(this._ui.$errorsWrapper);

      return this._inputHolder().after(this._ui.$errorsWrapper);
    },

    _actualizeTriggers: function _actualizeTriggers() {
      var _this3 = this;

      var $toBind = this._findRelated();
      var trigger;

      // Remove Parsley events already bound on this field
      $toBind.off('.Parsley');
      if (this._failedOnce) $toBind.on(ParsleyUtils__default.namespaceEvents(this.options.triggerAfterFailure, 'Parsley'), function () {
        _this3.validate();
      });else if (trigger = ParsleyUtils__default.namespaceEvents(this.options.trigger, 'Parsley')) {
        $toBind.on(trigger, function (event) {
          _this3._eventValidate(event);
        });
      }
    },

    _eventValidate: function _eventValidate(event) {
      // For keyup, keypress, keydown, input... events that could be a little bit obstrusive
      // do not validate if val length < min threshold on first validation. Once field have been validated once and info
      // about success or failure have been displayed, always validate with this trigger to reflect every yalidation change.
      if (/key|input/.test(event.type)) if (!(this._ui && this._ui.validationInformationVisible) && this.getValue().length <= this.options.validationThreshold) return;

      this.validate();
    },

    _resetUI: function _resetUI() {
      // Reset all event listeners
      this._failedOnce = false;
      this._actualizeTriggers();

      // Nothing to do if UI never initialized for this field
      if ('undefined' === typeof this._ui) return;

      // Reset all errors' li
      this._ui.$errorsWrapper.removeClass('filled').children().remove();

      // Reset validation class
      this._resetClass();

      // Reset validation flags and last validation result
      this._ui.lastValidationResult = [];
      this._ui.validationInformationVisible = false;
    },

    _destroyUI: function _destroyUI() {
      this._resetUI();

      if ('undefined' !== typeof this._ui) this._ui.$errorsWrapper.remove();

      delete this._ui;
    },

    _successClass: function _successClass() {
      this._ui.validationInformationVisible = true;
      this._ui.$errorClassHandler.removeClass(this.options.errorClass).addClass(this.options.successClass);
    },
    _errorClass: function _errorClass() {
      this._ui.validationInformationVisible = true;
      this._ui.$errorClassHandler.removeClass(this.options.successClass).addClass(this.options.errorClass);
    },
    _resetClass: function _resetClass() {
      this._ui.$errorClassHandler.removeClass(this.options.successClass).removeClass(this.options.errorClass);
    }
  };

  var ParsleyForm = function ParsleyForm(element, domOptions, options) {
    this.__class__ = 'ParsleyForm';

    this.$element = $(element);
    this.domOptions = domOptions;
    this.options = options;
    this.parent = window.Parsley;

    this.fields = [];
    this.validationResult = null;
  };

  var ParsleyForm__statusMapping = { pending: null, resolved: true, rejected: false };

  ParsleyForm.prototype = {
    onSubmitValidate: function onSubmitValidate(event) {
      var _this4 = this;

      // This is a Parsley generated submit event, do not validate, do not prevent, simply exit and keep normal behavior
      if (true === event.parsley) return;

      // If we didn't come here through a submit button, use the first one in the form
      var $submitSource = this._$submitSource || this.$element.find(ParsleyUtils__default._SubmitSelector).first();
      this._$submitSource = null;
      this.$element.find('.parsley-synthetic-submit-button').prop('disabled', true);
      if ($submitSource.is('[formnovalidate]')) return;

      var promise = this.whenValidate({ event: event });

      if ('resolved' === promise.state() && false !== this._trigger('submit')) {
        // All good, let event go through. We make this distinction because browsers
        // differ in their handling of `submit` being called from inside a submit event [#1047]
      } else {
          // Rejected or pending: cancel this submit
          event.stopImmediatePropagation();
          event.preventDefault();
          if ('pending' === promise.state()) promise.done(function () {
            _this4._submit($submitSource);
          });
        }
    },

    onSubmitButton: function onSubmitButton(event) {
      this._$submitSource = $(event.currentTarget);
    },
    // internal
    // _submit submits the form, this time without going through the validations.
    // Care must be taken to "fake" the actual submit button being clicked.
    _submit: function _submit($submitSource) {
      if (false === this._trigger('submit')) return;
      // Add submit button's data
      if ($submitSource) {
        var $synthetic = this.$element.find('.parsley-synthetic-submit-button').prop('disabled', false);
        if (0 === $synthetic.length) $synthetic = $('<input class="parsley-synthetic-submit-button" type="hidden">').appendTo(this.$element);
        $synthetic.attr({
          name: $submitSource.attr('name'),
          value: $submitSource.attr('value')
        });
      }

      this.$element.trigger($.extend($.Event('submit'), { parsley: true }));
    },

    // Performs validation on fields while triggering events.
    // @returns `true` if all validations succeeds, `false`
    // if a failure is immediately detected, or `null`
    // if dependant on a promise.
    // Consider using `whenValidate` instead.
    validate: function validate(options) {
      if (arguments.length >= 1 && !$.isPlainObject(options)) {
        ParsleyUtils__default.warnOnce('Calling validate on a parsley form without passing arguments as an object is deprecated.');

        var _arguments = _slice.call(arguments);

        var group = _arguments[0];
        var force = _arguments[1];
        var event = _arguments[2];

        options = { group: group, force: force, event: event };
      }
      return ParsleyForm__statusMapping[this.whenValidate(options).state()];
    },

    whenValidate: function whenValidate() {
      var _ParsleyUtils__default$all$done$fail$always,
          _this5 = this;

      var _ref7 = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

      var group = _ref7.group;
      var force = _ref7.force;
      var event = _ref7.event;

      this.submitEvent = event;
      if (event) {
        this.submitEvent = $.extend({}, event, { preventDefault: function preventDefault() {
            ParsleyUtils__default.warnOnce("Using `this.submitEvent.preventDefault()` is deprecated; instead, call `this.validationResult = false`");
            _this5.validationResult = false;
          } });
      }
      this.validationResult = true;

      // fire validate event to eventually modify things before every validation
      this._trigger('validate');

      // Refresh form DOM options and form's fields that could have changed
      this._refreshFields();

      var promises = this._withoutReactualizingFormOptions(function () {
        return $.map(_this5.fields, function (field) {
          return field.whenValidate({ force: force, group: group });
        });
      });

      return (_ParsleyUtils__default$all$done$fail$always = ParsleyUtils__default.all(promises).done(function () {
        _this5._trigger('success');
      }).fail(function () {
        _this5.validationResult = false;
        _this5.focus();
        _this5._trigger('error');
      }).always(function () {
        _this5._trigger('validated');
      })).pipe.apply(_ParsleyUtils__default$all$done$fail$always, _toConsumableArray(this._pipeAccordingToValidationResult()));
    },

    // Iterate over refreshed fields, and stop on first failure.
    // Returns `true` if all fields are valid, `false` if a failure is detected
    // or `null` if the result depends on an unresolved promise.
    // Prefer using `whenValid` instead.
    isValid: function isValid(options) {
      if (arguments.length >= 1 && !$.isPlainObject(options)) {
        ParsleyUtils__default.warnOnce('Calling isValid on a parsley form without passing arguments as an object is deprecated.');

        var _arguments2 = _slice.call(arguments);

        var group = _arguments2[0];
        var force = _arguments2[1];

        options = { group: group, force: force };
      }
      return ParsleyForm__statusMapping[this.whenValid(options).state()];
    },

    // Iterate over refreshed fields and validate them.
    // Returns a promise.
    // A validation that immediately fails will interrupt the validations.
    whenValid: function whenValid() {
      var _this6 = this;

      var _ref8 = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

      var group = _ref8.group;
      var force = _ref8.force;

      this._refreshFields();

      var promises = this._withoutReactualizingFormOptions(function () {
        return $.map(_this6.fields, function (field) {
          return field.whenValid({ group: group, force: force });
        });
      });
      return ParsleyUtils__default.all(promises);
    },

    _refreshFields: function _refreshFields() {
      return this.actualizeOptions()._bindFields();
    },

    _bindFields: function _bindFields() {
      var _this7 = this;

      var oldFields = this.fields;

      this.fields = [];
      this.fieldsMappedById = {};

      this._withoutReactualizingFormOptions(function () {
        _this7.$element.find(_this7.options.inputs).not(_this7.options.excluded).each(function (_, element) {
          var fieldInstance = new window.Parsley.Factory(element, {}, _this7);

          // Only add valid and not excluded `ParsleyField` and `ParsleyFieldMultiple` children
          if (('ParsleyField' === fieldInstance.__class__ || 'ParsleyFieldMultiple' === fieldInstance.__class__) && true !== fieldInstance.options.excluded) if ('undefined' === typeof _this7.fieldsMappedById[fieldInstance.__class__ + '-' + fieldInstance.__id__]) {
            _this7.fieldsMappedById[fieldInstance.__class__ + '-' + fieldInstance.__id__] = fieldInstance;
            _this7.fields.push(fieldInstance);
          }
        });

        $.each(ParsleyUtils__default.difference(oldFields, _this7.fields), function (_, field) {
          field._trigger('reset');
        });
      });
      return this;
    },

    // Internal only.
    // Looping on a form's fields to do validation or similar
    // will trigger reactualizing options on all of them, which
    // in turn will reactualize the form's options.
    // To avoid calling actualizeOptions so many times on the form
    // for nothing, _withoutReactualizingFormOptions temporarily disables
    // the method actualizeOptions on this form while `fn` is called.
    _withoutReactualizingFormOptions: function _withoutReactualizingFormOptions(fn) {
      var oldActualizeOptions = this.actualizeOptions;
      this.actualizeOptions = function () {
        return this;
      };
      var result = fn();
      this.actualizeOptions = oldActualizeOptions;
      return result;
    },

    // Internal only.
    // Shortcut to trigger an event
    // Returns true iff event is not interrupted and default not prevented.
    _trigger: function _trigger(eventName) {
      return this.trigger('form:' + eventName);
    }

  };

  var ConstraintFactory = function ConstraintFactory(parsleyField, name, requirements, priority, isDomConstraint) {
    if (!/ParsleyField/.test(parsleyField.__class__)) throw new Error('ParsleyField or ParsleyFieldMultiple instance expected');

    var validatorSpec = window.Parsley._validatorRegistry.validators[name];
    var validator = new ParsleyValidator(validatorSpec);

    $.extend(this, {
      validator: validator,
      name: name,
      requirements: requirements,
      priority: priority || parsleyField.options[name + 'Priority'] || validator.priority,
      isDomConstraint: true === isDomConstraint
    });
    this._parseRequirements(parsleyField.options);
  };

  var capitalize = function capitalize(str) {
    var cap = str[0].toUpperCase();
    return cap + str.slice(1);
  };

  ConstraintFactory.prototype = {
    validate: function validate(value, instance) {
      var _validator;

      return (_validator = this.validator).validate.apply(_validator, [value].concat(_toConsumableArray(this.requirementList), [instance]));
    },

    _parseRequirements: function _parseRequirements(options) {
      var _this8 = this;

      this.requirementList = this.validator.parseRequirements(this.requirements, function (key) {
        return options[_this8.name + capitalize(key)];
      });
    }
  };

  var ParsleyField = function ParsleyField(field, domOptions, options, parsleyFormInstance) {
    this.__class__ = 'ParsleyField';

    this.$element = $(field);

    // Set parent if we have one
    if ('undefined' !== typeof parsleyFormInstance) {
      this.parent = parsleyFormInstance;
    }

    this.options = options;
    this.domOptions = domOptions;

    // Initialize some properties
    this.constraints = [];
    this.constraintsByName = {};
    this.validationResult = true;

    // Bind constraints
    this._bindConstraints();
  };

  var parsley_field__statusMapping = { pending: null, resolved: true, rejected: false };

  ParsleyField.prototype = {
    // # Public API
    // Validate field and trigger some events for mainly `ParsleyUI`
    // @returns `true`, an array of the validators that failed, or
    // `null` if validation is not finished. Prefer using whenValidate
    validate: function validate(options) {
      if (arguments.length >= 1 && !$.isPlainObject(options)) {
        ParsleyUtils__default.warnOnce('Calling validate on a parsley field without passing arguments as an object is deprecated.');
        options = { options: options };
      }
      var promise = this.whenValidate(options);
      if (!promise) // If excluded with `group` option
        return true;
      switch (promise.state()) {
        case 'pending':
          return null;
        case 'resolved':
          return true;
        case 'rejected':
          return this.validationResult;
      }
    },

    // Validate field and trigger some events for mainly `ParsleyUI`
    // @returns a promise that succeeds only when all validations do
    // or `undefined` if field is not in the given `group`.
    whenValidate: function whenValidate() {
      var _whenValid$always$done$fail$always,
          _this9 = this;

      var _ref9 = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

      var force = _ref9.force;
      var group = _ref9.group;

      // do not validate a field if not the same as given validation group
      this.refreshConstraints();
      if (group && !this._isInGroup(group)) return;

      this.value = this.getValue();

      // Field Validate event. `this.value` could be altered for custom needs
      this._trigger('validate');

      return (_whenValid$always$done$fail$always = this.whenValid({ force: force, value: this.value, _refreshed: true }).always(function () {
        _this9._reflowUI();
      }).done(function () {
        _this9._trigger('success');
      }).fail(function () {
        _this9._trigger('error');
      }).always(function () {
        _this9._trigger('validated');
      })).pipe.apply(_whenValid$always$done$fail$always, _toConsumableArray(this._pipeAccordingToValidationResult()));
    },

    hasConstraints: function hasConstraints() {
      return 0 !== this.constraints.length;
    },

    // An empty optional field does not need validation
    needsValidation: function needsValidation(value) {
      if ('undefined' === typeof value) value = this.getValue();

      // If a field is empty and not required, it is valid
      // Except if `data-parsley-validate-if-empty` explicitely added, useful for some custom validators
      if (!value.length && !this._isRequired() && 'undefined' === typeof this.options.validateIfEmpty) return false;

      return true;
    },

    _isInGroup: function _isInGroup(group) {
      if ($.isArray(this.options.group)) return -1 !== $.inArray(group, this.options.group);
      return this.options.group === group;
    },

    // Just validate field. Do not trigger any event.
    // Returns `true` iff all constraints pass, `false` if there are failures,
    // or `null` if the result can not be determined yet (depends on a promise)
    // See also `whenValid`.
    isValid: function isValid(options) {
      if (arguments.length >= 1 && !$.isPlainObject(options)) {
        ParsleyUtils__default.warnOnce('Calling isValid on a parsley field without passing arguments as an object is deprecated.');

        var _arguments3 = _slice.call(arguments);

        var force = _arguments3[0];
        var value = _arguments3[1];

        options = { force: force, value: value };
      }
      var promise = this.whenValid(options);
      if (!promise) // Excluded via `group`
        return true;
      return parsley_field__statusMapping[promise.state()];
    },

    // Just validate field. Do not trigger any event.
    // @returns a promise that succeeds only when all validations do
    // or `undefined` if the field is not in the given `group`.
    // The argument `force` will force validation of empty fields.
    // If a `value` is given, it will be validated instead of the value of the input.
    whenValid: function whenValid() {
      var _this10 = this;

      var _ref10 = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

      var _ref10$force = _ref10.force;
      var force = _ref10$force === undefined ? false : _ref10$force;
      var value = _ref10.value;
      var group = _ref10.group;
      var _refreshed = _ref10._refreshed;

      // Recompute options and rebind constraints to have latest changes
      if (!_refreshed) this.refreshConstraints();
      // do not validate a field if not the same as given validation group
      if (group && !this._isInGroup(group)) return;

      this.validationResult = true;

      // A field without constraint is valid
      if (!this.hasConstraints()) return $.when();

      // Value could be passed as argument, needed to add more power to 'field:validate'
      if ('undefined' === typeof value || null === value) value = this.getValue();

      if (!this.needsValidation(value) && true !== force) return $.when();

      var groupedConstraints = this._getGroupedConstraints();
      var promises = [];
      $.each(groupedConstraints, function (_, constraints) {
        // Process one group of constraints at a time, we validate the constraints
        // and combine the promises together.
        var promise = ParsleyUtils__default.all($.map(constraints, function (constraint) {
          return _this10._validateConstraint(value, constraint);
        }));
        promises.push(promise);
        if (promise.state() === 'rejected') return false; // Interrupt processing if a group has already failed
      });
      return ParsleyUtils__default.all(promises);
    },

    // @returns a promise
    _validateConstraint: function _validateConstraint(value, constraint) {
      var _this11 = this;

      var result = constraint.validate(value, this);
      // Map false to a failed promise
      if (false === result) result = $.Deferred().reject();
      // Make sure we return a promise and that we record failures
      return ParsleyUtils__default.all([result]).fail(function (errorMessage) {
        if (!(_this11.validationResult instanceof Array)) _this11.validationResult = [];
        _this11.validationResult.push({
          assert: constraint,
          errorMessage: 'string' === typeof errorMessage && errorMessage
        });
      });
    },

    // @returns Parsley field computed value that could be overrided or configured in DOM
    getValue: function getValue() {
      var value;

      // Value could be overriden in DOM or with explicit options
      if ('function' === typeof this.options.value) value = this.options.value(this);else if ('undefined' !== typeof this.options.value) value = this.options.value;else value = this.$element.val();

      // Handle wrong DOM or configurations
      if ('undefined' === typeof value || null === value) return '';

      return this._handleWhitespace(value);
    },

    // Actualize options that could have change since previous validation
    // Re-bind accordingly constraints (could be some new, removed or updated)
    refreshConstraints: function refreshConstraints() {
      return this.actualizeOptions()._bindConstraints();
    },

    /**
    * Add a new constraint to a field
    *
    * @param {String}   name
    * @param {Mixed}    requirements      optional
    * @param {Number}   priority          optional
    * @param {Boolean}  isDomConstraint   optional
    */
    addConstraint: function addConstraint(name, requirements, priority, isDomConstraint) {

      if (window.Parsley._validatorRegistry.validators[name]) {
        var constraint = new ConstraintFactory(this, name, requirements, priority, isDomConstraint);

        // if constraint already exist, delete it and push new version
        if ('undefined' !== this.constraintsByName[constraint.name]) this.removeConstraint(constraint.name);

        this.constraints.push(constraint);
        this.constraintsByName[constraint.name] = constraint;
      }

      return this;
    },

    // Remove a constraint
    removeConstraint: function removeConstraint(name) {
      for (var i = 0; i < this.constraints.length; i++) if (name === this.constraints[i].name) {
        this.constraints.splice(i, 1);
        break;
      }
      delete this.constraintsByName[name];
      return this;
    },

    // Update a constraint (Remove + re-add)
    updateConstraint: function updateConstraint(name, parameters, priority) {
      return this.removeConstraint(name).addConstraint(name, parameters, priority);
    },

    // # Internals

    // Internal only.
    // Bind constraints from config + options + DOM
    _bindConstraints: function _bindConstraints() {
      var constraints = [];
      var constraintsByName = {};

      // clean all existing DOM constraints to only keep javascript user constraints
      for (var i = 0; i < this.constraints.length; i++) if (false === this.constraints[i].isDomConstraint) {
        constraints.push(this.constraints[i]);
        constraintsByName[this.constraints[i].name] = this.constraints[i];
      }

      this.constraints = constraints;
      this.constraintsByName = constraintsByName;

      // then re-add Parsley DOM-API constraints
      for (var name in this.options) this.addConstraint(name, this.options[name], undefined, true);

      // finally, bind special HTML5 constraints
      return this._bindHtml5Constraints();
    },

    // Internal only.
    // Bind specific HTML5 constraints to be HTML5 compliant
    _bindHtml5Constraints: function _bindHtml5Constraints() {
      // html5 required
      if (this.$element.hasClass('required') || this.$element.attr('required')) this.addConstraint('required', true, undefined, true);

      // html5 pattern
      if ('string' === typeof this.$element.attr('pattern')) this.addConstraint('pattern', this.$element.attr('pattern'), undefined, true);

      // range
      if ('undefined' !== typeof this.$element.attr('min') && 'undefined' !== typeof this.$element.attr('max')) this.addConstraint('range', [this.$element.attr('min'), this.$element.attr('max')], undefined, true);

      // HTML5 min
      else if ('undefined' !== typeof this.$element.attr('min')) this.addConstraint('min', this.$element.attr('min'), undefined, true);

        // HTML5 max
        else if ('undefined' !== typeof this.$element.attr('max')) this.addConstraint('max', this.$element.attr('max'), undefined, true);

      // length
      if ('undefined' !== typeof this.$element.attr('minlength') && 'undefined' !== typeof this.$element.attr('maxlength')) this.addConstraint('length', [this.$element.attr('minlength'), this.$element.attr('maxlength')], undefined, true);

      // HTML5 minlength
      else if ('undefined' !== typeof this.$element.attr('minlength')) this.addConstraint('minlength', this.$element.attr('minlength'), undefined, true);

        // HTML5 maxlength
        else if ('undefined' !== typeof this.$element.attr('maxlength')) this.addConstraint('maxlength', this.$element.attr('maxlength'), undefined, true);

      // html5 types
      var type = this.$element.attr('type');

      if ('undefined' === typeof type) return this;

      // Small special case here for HTML5 number: integer validator if step attribute is undefined or an integer value, number otherwise
      if ('number' === type) {
        return this.addConstraint('type', ['number', {
          step: this.$element.attr('step'),
          base: this.$element.attr('min') || this.$element.attr('value')
        }], undefined, true);
        // Regular other HTML5 supported types
      } else if (/^(email|url|range)$/i.test(type)) {
          return this.addConstraint('type', type, undefined, true);
        }
      return this;
    },

    // Internal only.
    // Field is required if have required constraint without `false` value
    _isRequired: function _isRequired() {
      if ('undefined' === typeof this.constraintsByName.required) return false;

      return false !== this.constraintsByName.required.requirements;
    },

    // Internal only.
    // Shortcut to trigger an event
    _trigger: function _trigger(eventName) {
      return this.trigger('field:' + eventName);
    },

    // Internal only
    // Handles whitespace in a value
    // Use `data-parsley-whitespace="squish"` to auto squish input value
    // Use `data-parsley-whitespace="trim"` to auto trim input value
    _handleWhitespace: function _handleWhitespace(value) {
      if (true === this.options.trimValue) ParsleyUtils__default.warnOnce('data-parsley-trim-value="true" is deprecated, please use data-parsley-whitespace="trim"');

      if ('squish' === this.options.whitespace) value = value.replace(/\s{2,}/g, ' ');

      if ('trim' === this.options.whitespace || 'squish' === this.options.whitespace || true === this.options.trimValue) value = ParsleyUtils__default.trimString(value);

      return value;
    },

    // Internal only.
    // Returns the constraints, grouped by descending priority.
    // The result is thus an array of arrays of constraints.
    _getGroupedConstraints: function _getGroupedConstraints() {
      if (false === this.options.priorityEnabled) return [this.constraints];

      var groupedConstraints = [];
      var index = {};

      // Create array unique of priorities
      for (var i = 0; i < this.constraints.length; i++) {
        var p = this.constraints[i].priority;
        if (!index[p]) groupedConstraints.push(index[p] = []);
        index[p].push(this.constraints[i]);
      }
      // Sort them by priority DESC
      groupedConstraints.sort(function (a, b) {
        return b[0].priority - a[0].priority;
      });

      return groupedConstraints;
    }

  };

  var parsley_field = ParsleyField;

  var ParsleyMultiple = function ParsleyMultiple() {
    this.__class__ = 'ParsleyFieldMultiple';
  };

  ParsleyMultiple.prototype = {
    // Add new `$element` sibling for multiple field
    addElement: function addElement($element) {
      this.$elements.push($element);

      return this;
    },

    // See `ParsleyField.refreshConstraints()`
    refreshConstraints: function refreshConstraints() {
      var fieldConstraints;

      this.constraints = [];

      // Select multiple special treatment
      if (this.$element.is('select')) {
        this.actualizeOptions()._bindConstraints();

        return this;
      }

      // Gather all constraints for each input in the multiple group
      for (var i = 0; i < this.$elements.length; i++) {

        // Check if element have not been dynamically removed since last binding
        if (!$('html').has(this.$elements[i]).length) {
          this.$elements.splice(i, 1);
          continue;
        }

        fieldConstraints = this.$elements[i].data('ParsleyFieldMultiple').refreshConstraints().constraints;

        for (var j = 0; j < fieldConstraints.length; j++) this.addConstraint(fieldConstraints[j].name, fieldConstraints[j].requirements, fieldConstraints[j].priority, fieldConstraints[j].isDomConstraint);
      }

      return this;
    },

    // See `ParsleyField.getValue()`
    getValue: function getValue() {
      // Value could be overriden in DOM
      if ('function' === typeof this.options.value) return this.options.value(this);else if ('undefined' !== typeof this.options.value) return this.options.value;

      // Radio input case
      if (this.$element.is('input[type=radio]')) return this._findRelated().filter(':checked').val() || '';

      // checkbox input case
      if (this.$element.is('input[type=checkbox]')) {
        var values = [];

        this._findRelated().filter(':checked').each(function () {
          values.push($(this).val());
        });

        return values;
      }

      // Select multiple case
      if (this.$element.is('select') && null === this.$element.val()) return [];

      // Default case that should never happen
      return this.$element.val();
    },

    _init: function _init() {
      this.$elements = [this.$element];

      return this;
    }
  };

  var ParsleyFactory = function ParsleyFactory(element, options, parsleyFormInstance) {
    this.$element = $(element);

    // If the element has already been bound, returns its saved Parsley instance
    var savedparsleyFormInstance = this.$element.data('Parsley');
    if (savedparsleyFormInstance) {

      // If the saved instance has been bound without a ParsleyForm parent and there is one given in this call, add it
      if ('undefined' !== typeof parsleyFormInstance && savedparsleyFormInstance.parent === window.Parsley) {
        savedparsleyFormInstance.parent = parsleyFormInstance;
        savedparsleyFormInstance._resetOptions(savedparsleyFormInstance.options);
      }

      if ('object' === typeof options) {
        $.extend(savedparsleyFormInstance.options, options);
      }

      return savedparsleyFormInstance;
    }

    // Parsley must be instantiated with a DOM element or jQuery $element
    if (!this.$element.length) throw new Error('You must bind Parsley on an existing element.');

    if ('undefined' !== typeof parsleyFormInstance && 'ParsleyForm' !== parsleyFormInstance.__class__) throw new Error('Parent instance must be a ParsleyForm instance');

    this.parent = parsleyFormInstance || window.Parsley;
    return this.init(options);
  };

  ParsleyFactory.prototype = {
    init: function init(options) {
      this.__class__ = 'Parsley';
      this.__version__ = '2.4.4';
      this.__id__ = ParsleyUtils__default.generateID();

      // Pre-compute options
      this._resetOptions(options);

      // A ParsleyForm instance is obviously a `<form>` element but also every node that is not an input and has the `data-parsley-validate` attribute
      if (this.$element.is('form') || ParsleyUtils__default.checkAttr(this.$element, this.options.namespace, 'validate') && !this.$element.is(this.options.inputs)) return this.bind('parsleyForm');

      // Every other element is bound as a `ParsleyField` or `ParsleyFieldMultiple`
      return this.isMultiple() ? this.handleMultiple() : this.bind('parsleyField');
    },

    isMultiple: function isMultiple() {
      return this.$element.is('input[type=radio], input[type=checkbox]') || this.$element.is('select') && 'undefined' !== typeof this.$element.attr('multiple');
    },

    // Multiples fields are a real nightmare :(
    // Maybe some refactoring would be appreciated here...
    handleMultiple: function handleMultiple() {
      var _this12 = this;

      var name;
      var multiple;
      var parsleyMultipleInstance;

      // Handle multiple name
      if (this.options.multiple) ; // We already have our 'multiple' identifier
      else if ('undefined' !== typeof this.$element.attr('name') && this.$element.attr('name').length) this.options.multiple = name = this.$element.attr('name');else if ('undefined' !== typeof this.$element.attr('id') && this.$element.attr('id').length) this.options.multiple = this.$element.attr('id');

      // Special select multiple input
      if (this.$element.is('select') && 'undefined' !== typeof this.$element.attr('multiple')) {
        this.options.multiple = this.options.multiple || this.__id__;
        return this.bind('parsleyFieldMultiple');

        // Else for radio / checkboxes, we need a `name` or `data-parsley-multiple` to properly bind it
      } else if (!this.options.multiple) {
          ParsleyUtils__default.warn('To be bound by Parsley, a radio, a checkbox and a multiple select input must have either a name or a multiple option.', this.$element);
          return this;
        }

      // Remove special chars
      this.options.multiple = this.options.multiple.replace(/(:|\.|\[|\]|\{|\}|\$)/g, '');

      // Add proper `data-parsley-multiple` to siblings if we have a valid multiple name
      if ('undefined' !== typeof name) {
        $('input[name="' + name + '"]').each(function (i, input) {
          if ($(input).is('input[type=radio], input[type=checkbox]')) $(input).attr(_this12.options.namespace + 'multiple', _this12.options.multiple);
        });
      }

      // Check here if we don't already have a related multiple instance saved
      var $previouslyRelated = this._findRelated();
      for (var i = 0; i < $previouslyRelated.length; i++) {
        parsleyMultipleInstance = $($previouslyRelated.get(i)).data('Parsley');
        if ('undefined' !== typeof parsleyMultipleInstance) {

          if (!this.$element.data('ParsleyFieldMultiple')) {
            parsleyMultipleInstance.addElement(this.$element);
          }

          break;
        }
      }

      // Create a secret ParsleyField instance for every multiple field. It will be stored in `data('ParsleyFieldMultiple')`
      // And will be useful later to access classic `ParsleyField` stuff while being in a `ParsleyFieldMultiple` instance
      this.bind('parsleyField', true);

      return parsleyMultipleInstance || this.bind('parsleyFieldMultiple');
    },

    // Return proper `ParsleyForm`, `ParsleyField` or `ParsleyFieldMultiple`
    bind: function bind(type, doNotStore) {
      var parsleyInstance;

      switch (type) {
        case 'parsleyForm':
          parsleyInstance = $.extend(new ParsleyForm(this.$element, this.domOptions, this.options), new ParsleyAbstract(), window.ParsleyExtend)._bindFields();
          break;
        case 'parsleyField':
          parsleyInstance = $.extend(new parsley_field(this.$element, this.domOptions, this.options, this.parent), new ParsleyAbstract(), window.ParsleyExtend);
          break;
        case 'parsleyFieldMultiple':
          parsleyInstance = $.extend(new parsley_field(this.$element, this.domOptions, this.options, this.parent), new ParsleyMultiple(), new ParsleyAbstract(), window.ParsleyExtend)._init();
          break;
        default:
          throw new Error(type + 'is not a supported Parsley type');
      }

      if (this.options.multiple) ParsleyUtils__default.setAttr(this.$element, this.options.namespace, 'multiple', this.options.multiple);

      if ('undefined' !== typeof doNotStore) {
        this.$element.data('ParsleyFieldMultiple', parsleyInstance);

        return parsleyInstance;
      }

      // Store the freshly bound instance in a DOM element for later access using jQuery `data()`
      this.$element.data('Parsley', parsleyInstance);

      // Tell the world we have a new ParsleyForm or ParsleyField instance!
      parsleyInstance._actualizeTriggers();
      parsleyInstance._trigger('init');

      return parsleyInstance;
    }
  };

  var vernums = $.fn.jquery.split('.');
  if (parseInt(vernums[0]) <= 1 && parseInt(vernums[1]) < 8) {
    throw "The loaded version of jQuery is too old. Please upgrade to 1.8.x or better.";
  }
  if (!vernums.forEach) {
    ParsleyUtils__default.warn('Parsley requires ES5 to run properly. Please include https://github.com/es-shims/es5-shim');
  }
  // Inherit `on`, `off` & `trigger` to Parsley:
  var Parsley = $.extend(new ParsleyAbstract(), {
    $element: $(document),
    actualizeOptions: null,
    _resetOptions: null,
    Factory: ParsleyFactory,
    version: '2.4.4'
  });

  // Supplement ParsleyField and Form with ParsleyAbstract
  // This way, the constructors will have access to those methods
  $.extend(parsley_field.prototype, ParsleyUI.Field, ParsleyAbstract.prototype);
  $.extend(ParsleyForm.prototype, ParsleyUI.Form, ParsleyAbstract.prototype);
  // Inherit actualizeOptions and _resetOptions:
  $.extend(ParsleyFactory.prototype, ParsleyAbstract.prototype);

  // ### jQuery API
  // `$('.elem').parsley(options)` or `$('.elem').psly(options)`
  $.fn.parsley = $.fn.psly = function (options) {
    if (this.length > 1) {
      var instances = [];

      this.each(function () {
        instances.push($(this).parsley(options));
      });

      return instances;
    }

    // Return undefined if applied to non existing DOM element
    if (!$(this).length) {
      ParsleyUtils__default.warn('You must bind Parsley on an existing element.');

      return;
    }

    return new ParsleyFactory(this, options);
  };

  // ### ParsleyField and ParsleyForm extension
  // Ensure the extension is now defined if it wasn't previously
  if ('undefined' === typeof window.ParsleyExtend) window.ParsleyExtend = {};

  // ### Parsley config
  // Inherit from ParsleyDefault, and copy over any existing values
  Parsley.options = $.extend(ParsleyUtils__default.objectCreate(ParsleyDefaults), window.ParsleyConfig);
  window.ParsleyConfig = Parsley.options; // Old way of accessing global options

  // ### Globals
  window.Parsley = window.psly = Parsley;
  window.ParsleyUtils = ParsleyUtils__default;

  // ### Define methods that forward to the registry, and deprecate all access except through window.Parsley
  var registry = window.Parsley._validatorRegistry = new ParsleyValidatorRegistry(window.ParsleyConfig.validators, window.ParsleyConfig.i18n);
  window.ParsleyValidator = {};
  $.each('setLocale addCatalog addMessage addMessages getErrorMessage formatMessage addValidator updateValidator removeValidator'.split(' '), function (i, method) {
    window.Parsley[method] = $.proxy(registry, method);
    window.ParsleyValidator[method] = function () {
      var _window$Parsley;

      ParsleyUtils__default.warnOnce('Accessing the method \'' + method + '\' through ParsleyValidator is deprecated. Simply call \'window.Parsley.' + method + '(...)\'');
      return (_window$Parsley = window.Parsley)[method].apply(_window$Parsley, arguments);
    };
  });

  // ### ParsleyUI
  // Deprecated global object
  window.Parsley.UI = ParsleyUI;
  window.ParsleyUI = {
    removeError: function removeError(instance, name, doNotUpdateClass) {
      var updateClass = true !== doNotUpdateClass;
      ParsleyUtils__default.warnOnce('Accessing ParsleyUI is deprecated. Call \'removeError\' on the instance directly. Please comment in issue 1073 as to your need to call this method.');
      return instance.removeError(name, { updateClass: updateClass });
    },
    getErrorsMessages: function getErrorsMessages(instance) {
      ParsleyUtils__default.warnOnce('Accessing ParsleyUI is deprecated. Call \'getErrorsMessages\' on the instance directly.');
      return instance.getErrorsMessages();
    }
  };
  $.each('addError updateError'.split(' '), function (i, method) {
    window.ParsleyUI[method] = function (instance, name, message, assert, doNotUpdateClass) {
      var updateClass = true !== doNotUpdateClass;
      ParsleyUtils__default.warnOnce('Accessing ParsleyUI is deprecated. Call \'' + method + '\' on the instance directly. Please comment in issue 1073 as to your need to call this method.');
      return instance[method](name, { message: message, assert: assert, updateClass: updateClass });
    };
  });

  // ### PARSLEY auto-binding
  // Prevent it by setting `ParsleyConfig.autoBind` to `false`
  if (false !== window.ParsleyConfig.autoBind) {
    $(function () {
      // Works only on `data-parsley-validate`.
      if ($('[data-parsley-validate]').length) $('[data-parsley-validate]').parsley();
    });
  }

  var o = $({});
  var deprecated = function deprecated() {
    ParsleyUtils__default.warnOnce("Parsley's pubsub module is deprecated; use the 'on' and 'off' methods on parsley instances or window.Parsley");
  };

  // Returns an event handler that calls `fn` with the arguments it expects
  function adapt(fn, context) {
    // Store to allow unbinding
    if (!fn.parsleyAdaptedCallback) {
      fn.parsleyAdaptedCallback = function () {
        var args = Array.prototype.slice.call(arguments, 0);
        args.unshift(this);
        fn.apply(context || o, args);
      };
    }
    return fn.parsleyAdaptedCallback;
  }

  var eventPrefix = 'parsley:';
  // Converts 'parsley:form:validate' into 'form:validate'
  function eventName(name) {
    if (name.lastIndexOf(eventPrefix, 0) === 0) return name.substr(eventPrefix.length);
    return name;
  }

  // $.listen is deprecated. Use Parsley.on instead.
  $.listen = function (name, callback) {
    var context;
    deprecated();
    if ('object' === typeof arguments[1] && 'function' === typeof arguments[2]) {
      context = arguments[1];
      callback = arguments[2];
    }

    if ('function' !== typeof callback) throw new Error('Wrong parameters');

    window.Parsley.on(eventName(name), adapt(callback, context));
  };

  $.listenTo = function (instance, name, fn) {
    deprecated();
    if (!(instance instanceof parsley_field) && !(instance instanceof ParsleyForm)) throw new Error('Must give Parsley instance');

    if ('string' !== typeof name || 'function' !== typeof fn) throw new Error('Wrong parameters');

    instance.on(eventName(name), adapt(fn));
  };

  $.unsubscribe = function (name, fn) {
    deprecated();
    if ('string' !== typeof name || 'function' !== typeof fn) throw new Error('Wrong arguments');
    window.Parsley.off(eventName(name), fn.parsleyAdaptedCallback);
  };

  $.unsubscribeTo = function (instance, name) {
    deprecated();
    if (!(instance instanceof parsley_field) && !(instance instanceof ParsleyForm)) throw new Error('Must give Parsley instance');
    instance.off(eventName(name));
  };

  $.unsubscribeAll = function (name) {
    deprecated();
    window.Parsley.off(eventName(name));
    $('form,input,textarea,select').each(function () {
      var instance = $(this).data('Parsley');
      if (instance) {
        instance.off(eventName(name));
      }
    });
  };

  // $.emit is deprecated. Use jQuery events instead.
  $.emit = function (name, instance) {
    var _instance;

    deprecated();
    var instanceGiven = instance instanceof parsley_field || instance instanceof ParsleyForm;
    var args = Array.prototype.slice.call(arguments, instanceGiven ? 2 : 1);
    args.unshift(eventName(name));
    if (!instanceGiven) {
      instance = window.Parsley;
    }
    (_instance = instance).trigger.apply(_instance, _toConsumableArray(args));
  };

  var pubsub = {};

  $.extend(true, Parsley, {
    asyncValidators: {
      'default': {
        fn: function fn(xhr) {
          // By default, only status 2xx are deemed successful.
          // Note: we use status instead of state() because responses with status 200
          // but invalid messages (e.g. an empty body for content type set to JSON) will
          // result in state() === 'rejected'.
          return xhr.status >= 200 && xhr.status < 300;
        },
        url: false
      },
      reverse: {
        fn: function fn(xhr) {
          // If reverse option is set, a failing ajax request is considered successful
          return xhr.status < 200 || xhr.status >= 300;
        },
        url: false
      }
    },

    addAsyncValidator: function addAsyncValidator(name, fn, url, options) {
      Parsley.asyncValidators[name] = {
        fn: fn,
        url: url || false,
        options: options || {}
      };

      return this;
    }

  });

  Parsley.addValidator('remote', {
    requirementType: {
      '': 'string',
      'validator': 'string',
      'reverse': 'boolean',
      'options': 'object'
    },

    validateString: function validateString(value, url, options, instance) {
      var data = {};
      var ajaxOptions;
      var csr;
      var validator = options.validator || (true === options.reverse ? 'reverse' : 'default');

      if ('undefined' === typeof Parsley.asyncValidators[validator]) throw new Error('Calling an undefined async validator: `' + validator + '`');

      url = Parsley.asyncValidators[validator].url || url;

      // Fill current value
      if (url.indexOf('{value}') > -1) {
        url = url.replace('{value}', encodeURIComponent(value));
      } else {
        data[instance.$element.attr('name') || instance.$element.attr('id')] = value;
      }

      // Merge options passed in from the function with the ones in the attribute
      var remoteOptions = $.extend(true, options.options || {}, Parsley.asyncValidators[validator].options);

      // All `$.ajax(options)` could be overridden or extended directly from DOM in `data-parsley-remote-options`
      ajaxOptions = $.extend(true, {}, {
        url: url,
        data: data,
        type: 'GET'
      }, remoteOptions);

      // Generate store key based on ajax options
      instance.trigger('field:ajaxoptions', instance, ajaxOptions);

      csr = $.param(ajaxOptions);

      // Initialise querry cache
      if ('undefined' === typeof Parsley._remoteCache) Parsley._remoteCache = {};

      // Try to retrieve stored xhr
      var xhr = Parsley._remoteCache[csr] = Parsley._remoteCache[csr] || $.ajax(ajaxOptions);

      var handleXhr = function handleXhr() {
        var result = Parsley.asyncValidators[validator].fn.call(instance, xhr, url, options);
        if (!result) // Map falsy results to rejected promise
          result = $.Deferred().reject();
        return $.when(result);
      };

      return xhr.then(handleXhr, handleXhr);
    },

    priority: -1
  });

  Parsley.on('form:submit', function () {
    Parsley._remoteCache = {};
  });

  window.ParsleyExtend.addAsyncValidator = function () {
    ParsleyUtils.warnOnce('Accessing the method `addAsyncValidator` through an instance is deprecated. Simply call `Parsley.addAsyncValidator(...)`');
    return Parsley.addAsyncValidator.apply(Parsley, arguments);
  };

  // This is included with the Parsley library itself,
  // thus there is no use in adding it to your project.
  Parsley.addMessages('en', {
    defaultMessage: "This value seems to be invalid.",
    type: {
      email: "This value should be a valid email.",
      url: "This value should be a valid url.",
      number: "This value should be a valid number.",
      integer: "This value should be a valid integer.",
      digits: "This value should be digits.",
      alphanum: "This value should be alphanumeric."
    },
    notblank: "This value should not be blank.",
    required: "This value is required.",
    pattern: "This value seems to be invalid.",
    min: "This value should be greater than or equal to %s.",
    max: "This value should be lower than or equal to %s.",
    range: "This value should be between %s and %s.",
    minlength: "This value is too short. It should have %s characters or more.",
    maxlength: "This value is too long. It should have %s characters or fewer.",
    length: "This value length is invalid. It should be between %s and %s characters long.",
    mincheck: "You must select at least %s choices.",
    maxcheck: "You must select %s choices or fewer.",
    check: "You must select between %s and %s choices.",
    equalto: "This value should be the same."
  });

  Parsley.setLocale('en');

  /**
   * inputevent - Alleviate browser bugs for input events
   * https://github.com/marcandre/inputevent
   * @version v0.0.3 - (built Thu, Apr 14th 2016, 5:58 pm)
   * @author Marc-Andre Lafortune <github@marc-andre.ca>
   * @license MIT
   */

  function InputEvent() {
    var _this13 = this;

    var globals = window || global;

    // Slightly odd way construct our object. This way methods are force bound.
    // Used to test for duplicate library.
    $.extend(this, {

      // For browsers that do not support isTrusted, assumes event is native.
      isNativeEvent: function isNativeEvent(evt) {
        return evt.originalEvent && evt.originalEvent.isTrusted !== false;
      },

      fakeInputEvent: function fakeInputEvent(evt) {
        if (_this13.isNativeEvent(evt)) {
          $(evt.target).trigger('input');
        }
      },

      misbehaves: function misbehaves(evt) {
        if (_this13.isNativeEvent(evt)) {
          _this13.behavesOk(evt);
          $(document).on('change.inputevent', evt.data.selector, _this13.fakeInputEvent);
          _this13.fakeInputEvent(evt);
        }
      },

      behavesOk: function behavesOk(evt) {
        if (_this13.isNativeEvent(evt)) {
          $(document) // Simply unbinds the testing handler
          .off('input.inputevent', evt.data.selector, _this13.behavesOk).off('change.inputevent', evt.data.selector, _this13.misbehaves);
        }
      },

      // Bind the testing handlers
      install: function install() {
        if (globals.inputEventPatched) {
          return;
        }
        globals.inputEventPatched = '0.0.3';
        var _arr = ['select', 'input[type="checkbox"]', 'input[type="radio"]', 'input[type="file"]'];
        for (var _i = 0; _i < _arr.length; _i++) {
          var selector = _arr[_i];
          $(document).on('input.inputevent', selector, { selector: selector }, _this13.behavesOk).on('change.inputevent', selector, { selector: selector }, _this13.misbehaves);
        }
      },

      uninstall: function uninstall() {
        delete globals.inputEventPatched;
        $(document).off('.inputevent');
      }

    });
  };

  var inputevent = new InputEvent();

  inputevent.install();

  var parsley = Parsley;

  return parsley;
});
//# sourceMappingURL=parsley.js.map

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(59)))

/***/ },

/***/ 806:
/***/ function(module, exports) {

module.exports = "/*!\n * Datepicker for Bootstrap v1.6.1 (https://github.com/eternicode/bootstrap-datepicker)\n *\n * Copyright 2012 Stefan Petre\n * Improvements by Andrew Rowls\n * Licensed under the Apache License v2.0 (http://www.apache.org/licenses/LICENSE-2.0)\n */\n.datepicker {\n  border-radius: 4px;\n  direction: ltr; }\n\n.datepicker-inline {\n  width: 220px; }\n\n.datepicker.datepicker-rtl {\n  direction: rtl; }\n\n.datepicker.datepicker-rtl table tr td span {\n  float: right; }\n\n.datepicker-dropdown {\n  top: 0;\n  left: 0;\n  padding: 4px; }\n\n.datepicker-dropdown:before {\n  content: '';\n  display: inline-block;\n  border-left: 7px solid transparent;\n  border-right: 7px solid transparent;\n  border-bottom: 7px solid rgba(0, 0, 0, 0.15);\n  border-top: 0;\n  border-bottom-color: rgba(0, 0, 0, 0.2);\n  position: absolute; }\n\n.datepicker-dropdown:after {\n  content: '';\n  display: inline-block;\n  border-left: 6px solid transparent;\n  border-right: 6px solid transparent;\n  border-bottom: 6px solid #fff;\n  border-top: 0;\n  position: absolute; }\n\n.datepicker-dropdown.datepicker-orient-left:before {\n  left: 6px; }\n\n.datepicker-dropdown.datepicker-orient-left:after {\n  left: 7px; }\n\n.datepicker-dropdown.datepicker-orient-right:before {\n  right: 6px; }\n\n.datepicker-dropdown.datepicker-orient-right:after {\n  right: 7px; }\n\n.datepicker-dropdown.datepicker-orient-bottom:before {\n  top: -7px; }\n\n.datepicker-dropdown.datepicker-orient-bottom:after {\n  top: -6px; }\n\n.datepicker-dropdown.datepicker-orient-top:before {\n  bottom: -7px;\n  border-bottom: 0;\n  border-top: 7px solid rgba(0, 0, 0, 0.15); }\n\n.datepicker-dropdown.datepicker-orient-top:after {\n  bottom: -6px;\n  border-bottom: 0;\n  border-top: 6px solid #fff; }\n\n.datepicker table {\n  margin: 0;\n  -webkit-touch-callout: none;\n  -webkit-user-select: none;\n  -khtml-user-select: none;\n  -moz-user-select: none;\n  -ms-user-select: none;\n  user-select: none; }\n\n.datepicker table tr td, .datepicker table tr th {\n  text-align: center;\n  width: 30px;\n  height: 30px;\n  border-radius: 4px;\n  border: none; }\n\n.table-striped .datepicker table tr td, .table-striped .datepicker table tr th {\n  background-color: transparent; }\n\n.datepicker table tr td.new, .datepicker table tr td.old {\n  color: #777; }\n\n.datepicker table tr td.day:hover, .datepicker table tr td.focused {\n  background: #eee;\n  cursor: pointer; }\n\n.datepicker table tr td.disabled, .datepicker table tr td.disabled:hover {\n  background: 0 0;\n  color: #777;\n  cursor: default; }\n\n.datepicker table tr td.highlighted {\n  color: #000;\n  background-color: #d9edf7;\n  border-color: #85c5e5;\n  border-radius: 0; }\n\n.datepicker table tr td.highlighted.focus, .datepicker table tr td.highlighted:focus {\n  color: #000;\n  background-color: #afd9ee;\n  border-color: #298fc2; }\n\n.datepicker table tr td.highlighted:hover {\n  color: #000;\n  background-color: #afd9ee;\n  border-color: #52addb; }\n\n.datepicker table tr td.highlighted.active, .datepicker table tr td.highlighted:active {\n  color: #000;\n  background-color: #afd9ee;\n  border-color: #52addb; }\n\n.datepicker table tr td.highlighted.active.focus, .datepicker table tr td.highlighted.active:focus, .datepicker table tr td.highlighted.active:hover, .datepicker table tr td.highlighted:active.focus, .datepicker table tr td.highlighted:active:focus, .datepicker table tr td.highlighted:active:hover {\n  color: #000;\n  background-color: #91cbe8;\n  border-color: #298fc2; }\n\n.datepicker table tr td.highlighted.disabled.focus, .datepicker table tr td.highlighted.disabled:focus, .datepicker table tr td.highlighted.disabled:hover, .datepicker table tr td.highlighted[disabled].focus, .datepicker table tr td.highlighted[disabled]:focus, .datepicker table tr td.highlighted[disabled]:hover, fieldset[disabled] .datepicker table tr td.highlighted.focus, fieldset[disabled] .datepicker table tr td.highlighted:focus, fieldset[disabled] .datepicker table tr td.highlighted:hover {\n  background-color: #d9edf7;\n  border-color: #85c5e5; }\n\n.datepicker table tr td.highlighted.focused {\n  background: #afd9ee; }\n\n.datepicker table tr td.highlighted.disabled, .datepicker table tr td.highlighted.disabled:active {\n  background: #d9edf7;\n  color: #777; }\n\n.datepicker table tr td.today {\n  color: #000;\n  background-color: #ffdb99;\n  border-color: #ffb733; }\n\n.datepicker table tr td.today.focus, .datepicker table tr td.today:focus {\n  color: #000;\n  background-color: #ffc966;\n  border-color: #b37400; }\n\n.datepicker table tr td.today:hover {\n  color: #000;\n  background-color: #ffc966;\n  border-color: #f59e00; }\n\n.datepicker table tr td.today.active, .datepicker table tr td.today:active {\n  color: #000;\n  background-color: #ffc966;\n  border-color: #f59e00; }\n\n.datepicker table tr td.today.active.focus, .datepicker table tr td.today.active:focus, .datepicker table tr td.today.active:hover, .datepicker table tr td.today:active.focus, .datepicker table tr td.today:active:focus, .datepicker table tr td.today:active:hover {\n  color: #000;\n  background-color: #ffbc42;\n  border-color: #b37400; }\n\n.datepicker table tr td.today.disabled.focus, .datepicker table tr td.today.disabled:focus, .datepicker table tr td.today.disabled:hover, .datepicker table tr td.today[disabled].focus, .datepicker table tr td.today[disabled]:focus, .datepicker table tr td.today[disabled]:hover, fieldset[disabled] .datepicker table tr td.today.focus, fieldset[disabled] .datepicker table tr td.today:focus, fieldset[disabled] .datepicker table tr td.today:hover {\n  background-color: #ffdb99;\n  border-color: #ffb733; }\n\n.datepicker table tr td.today.focused {\n  background: #ffc966; }\n\n.datepicker table tr td.today.disabled, .datepicker table tr td.today.disabled:active {\n  background: #ffdb99;\n  color: #777; }\n\n.datepicker table tr td.range {\n  color: #000;\n  background-color: #eee;\n  border-color: #bbb;\n  border-radius: 0; }\n\n.datepicker table tr td.range.focus, .datepicker table tr td.range:focus {\n  color: #000;\n  background-color: #d5d5d5;\n  border-color: #7c7c7c; }\n\n.datepicker table tr td.range:hover {\n  color: #000;\n  background-color: #d5d5d5;\n  border-color: #9d9d9d; }\n\n.datepicker table tr td.range.active, .datepicker table tr td.range:active {\n  color: #000;\n  background-color: #d5d5d5;\n  border-color: #9d9d9d; }\n\n.datepicker table tr td.range.active.focus, .datepicker table tr td.range.active:focus, .datepicker table tr td.range.active:hover, .datepicker table tr td.range:active.focus, .datepicker table tr td.range:active:focus, .datepicker table tr td.range:active:hover {\n  color: #000;\n  background-color: #c3c3c3;\n  border-color: #7c7c7c; }\n\n.datepicker table tr td.range.disabled.focus, .datepicker table tr td.range.disabled:focus, .datepicker table tr td.range.disabled:hover, .datepicker table tr td.range[disabled].focus, .datepicker table tr td.range[disabled]:focus, .datepicker table tr td.range[disabled]:hover, fieldset[disabled] .datepicker table tr td.range.focus, fieldset[disabled] .datepicker table tr td.range:focus, fieldset[disabled] .datepicker table tr td.range:hover {\n  background-color: #eee;\n  border-color: #bbb; }\n\n.datepicker table tr td.range.focused {\n  background: #d5d5d5; }\n\n.datepicker table tr td.range.disabled, .datepicker table tr td.range.disabled:active {\n  background: #eee;\n  color: #777; }\n\n.datepicker table tr td.range.highlighted {\n  color: #000;\n  background-color: #e4eef3;\n  border-color: #9dc1d3; }\n\n.datepicker table tr td.range.highlighted.focus, .datepicker table tr td.range.highlighted:focus {\n  color: #000;\n  background-color: #c1d7e3;\n  border-color: #4b88a6; }\n\n.datepicker table tr td.range.highlighted:hover {\n  color: #000;\n  background-color: #c1d7e3;\n  border-color: #73a6c0; }\n\n.datepicker table tr td.range.highlighted.active, .datepicker table tr td.range.highlighted:active {\n  color: #000;\n  background-color: #c1d7e3;\n  border-color: #73a6c0; }\n\n.datepicker table tr td.range.highlighted.active.focus, .datepicker table tr td.range.highlighted.active:focus, .datepicker table tr td.range.highlighted.active:hover, .datepicker table tr td.range.highlighted:active.focus, .datepicker table tr td.range.highlighted:active:focus, .datepicker table tr td.range.highlighted:active:hover {\n  color: #000;\n  background-color: #a8c8d8;\n  border-color: #4b88a6; }\n\n.datepicker table tr td.range.highlighted.disabled.focus, .datepicker table tr td.range.highlighted.disabled:focus, .datepicker table tr td.range.highlighted.disabled:hover, .datepicker table tr td.range.highlighted[disabled].focus, .datepicker table tr td.range.highlighted[disabled]:focus, .datepicker table tr td.range.highlighted[disabled]:hover, fieldset[disabled] .datepicker table tr td.range.highlighted.focus, fieldset[disabled] .datepicker table tr td.range.highlighted:focus, fieldset[disabled] .datepicker table tr td.range.highlighted:hover {\n  background-color: #e4eef3;\n  border-color: #9dc1d3; }\n\n.datepicker table tr td.range.highlighted.focused {\n  background: #c1d7e3; }\n\n.datepicker table tr td.range.highlighted.disabled, .datepicker table tr td.range.highlighted.disabled:active {\n  background: #e4eef3;\n  color: #777; }\n\n.datepicker table tr td.range.today {\n  color: #000;\n  background-color: #f7ca77;\n  border-color: #f1a417; }\n\n.datepicker table tr td.range.today.focus, .datepicker table tr td.range.today:focus {\n  color: #000;\n  background-color: #f4b747;\n  border-color: #815608; }\n\n.datepicker table tr td.range.today:hover {\n  color: #000;\n  background-color: #f4b747;\n  border-color: #bf800c; }\n\n.datepicker table tr td.range.today.active, .datepicker table tr td.range.today:active {\n  color: #000;\n  background-color: #f4b747;\n  border-color: #bf800c; }\n\n.datepicker table tr td.range.today.active.focus, .datepicker table tr td.range.today.active:focus, .datepicker table tr td.range.today.active:hover, .datepicker table tr td.range.today:active.focus, .datepicker table tr td.range.today:active:focus, .datepicker table tr td.range.today:active:hover {\n  color: #000;\n  background-color: #f2aa25;\n  border-color: #815608; }\n\n.datepicker table tr td.range.today.disabled.focus, .datepicker table tr td.range.today.disabled:focus, .datepicker table tr td.range.today.disabled:hover, .datepicker table tr td.range.today[disabled].focus, .datepicker table tr td.range.today[disabled]:focus, .datepicker table tr td.range.today[disabled]:hover, fieldset[disabled] .datepicker table tr td.range.today.focus, fieldset[disabled] .datepicker table tr td.range.today:focus, fieldset[disabled] .datepicker table tr td.range.today:hover {\n  background-color: #f7ca77;\n  border-color: #f1a417; }\n\n.datepicker table tr td.range.today.disabled, .datepicker table tr td.range.today.disabled:active {\n  background: #f7ca77;\n  color: #777; }\n\n.datepicker table tr td.selected, .datepicker table tr td.selected.highlighted {\n  color: #fff;\n  background-color: #777;\n  border-color: #555;\n  text-shadow: 0 -1px 0 rgba(0, 0, 0, 0.25); }\n\n.datepicker table tr td.selected.focus, .datepicker table tr td.selected.highlighted.focus, .datepicker table tr td.selected.highlighted:focus, .datepicker table tr td.selected:focus {\n  color: #fff;\n  background-color: #5e5e5e;\n  border-color: #161616; }\n\n.datepicker table tr td.selected.highlighted:hover, .datepicker table tr td.selected:hover {\n  color: #fff;\n  background-color: #5e5e5e;\n  border-color: #373737; }\n\n.datepicker table tr td.selected.active, .datepicker table tr td.selected.highlighted.active, .datepicker table tr td.selected.highlighted:active, .datepicker table tr td.selected:active {\n  color: #fff;\n  background-color: #5e5e5e;\n  border-color: #373737; }\n\n.datepicker table tr td.selected.active.focus, .datepicker table tr td.selected.active:focus, .datepicker table tr td.selected.active:hover, .datepicker table tr td.selected.highlighted.active.focus, .datepicker table tr td.selected.highlighted.active:focus, .datepicker table tr td.selected.highlighted.active:hover, .datepicker table tr td.selected.highlighted:active.focus, .datepicker table tr td.selected.highlighted:active:focus, .datepicker table tr td.selected.highlighted:active:hover, .datepicker table tr td.selected:active.focus, .datepicker table tr td.selected:active:focus, .datepicker table tr td.selected:active:hover {\n  color: #fff;\n  background-color: #4c4c4c;\n  border-color: #161616; }\n\n.datepicker table tr td.selected.disabled.focus, .datepicker table tr td.selected.disabled:focus, .datepicker table tr td.selected.disabled:hover, .datepicker table tr td.selected.highlighted.disabled.focus, .datepicker table tr td.selected.highlighted.disabled:focus, .datepicker table tr td.selected.highlighted.disabled:hover, .datepicker table tr td.selected.highlighted[disabled].focus, .datepicker table tr td.selected.highlighted[disabled]:focus, .datepicker table tr td.selected.highlighted[disabled]:hover, .datepicker table tr td.selected[disabled].focus, .datepicker table tr td.selected[disabled]:focus, .datepicker table tr td.selected[disabled]:hover, fieldset[disabled] .datepicker table tr td.selected.focus, fieldset[disabled] .datepicker table tr td.selected.highlighted.focus, fieldset[disabled] .datepicker table tr td.selected.highlighted:focus, fieldset[disabled] .datepicker table tr td.selected.highlighted:hover, fieldset[disabled] .datepicker table tr td.selected:focus, fieldset[disabled] .datepicker table tr td.selected:hover {\n  background-color: #777;\n  border-color: #555; }\n\n.datepicker table tr td.active, .datepicker table tr td.active.highlighted {\n  color: #fff;\n  background-color: #337ab7;\n  border-color: #2e6da4;\n  text-shadow: 0 -1px 0 rgba(0, 0, 0, 0.25); }\n\n.datepicker table tr td.active.focus, .datepicker table tr td.active.highlighted.focus, .datepicker table tr td.active.highlighted:focus, .datepicker table tr td.active:focus {\n  color: #fff;\n  background-color: #286090;\n  border-color: #122b40; }\n\n.datepicker table tr td.active.highlighted:hover, .datepicker table tr td.active:hover {\n  color: #fff;\n  background-color: #286090;\n  border-color: #204d74; }\n\n.datepicker table tr td.active.active, .datepicker table tr td.active.highlighted.active, .datepicker table tr td.active.highlighted:active, .datepicker table tr td.active:active {\n  color: #fff;\n  background-color: #286090;\n  border-color: #204d74; }\n\n.datepicker table tr td.active.active.focus, .datepicker table tr td.active.active:focus, .datepicker table tr td.active.active:hover, .datepicker table tr td.active.highlighted.active.focus, .datepicker table tr td.active.highlighted.active:focus, .datepicker table tr td.active.highlighted.active:hover, .datepicker table tr td.active.highlighted:active.focus, .datepicker table tr td.active.highlighted:active:focus, .datepicker table tr td.active.highlighted:active:hover, .datepicker table tr td.active:active.focus, .datepicker table tr td.active:active:focus, .datepicker table tr td.active:active:hover {\n  color: #fff;\n  background-color: #204d74;\n  border-color: #122b40; }\n\n.datepicker table tr td.active.disabled.focus, .datepicker table tr td.active.disabled:focus, .datepicker table tr td.active.disabled:hover, .datepicker table tr td.active.highlighted.disabled.focus, .datepicker table tr td.active.highlighted.disabled:focus, .datepicker table tr td.active.highlighted.disabled:hover, .datepicker table tr td.active.highlighted[disabled].focus, .datepicker table tr td.active.highlighted[disabled]:focus, .datepicker table tr td.active.highlighted[disabled]:hover, .datepicker table tr td.active[disabled].focus, .datepicker table tr td.active[disabled]:focus, .datepicker table tr td.active[disabled]:hover, fieldset[disabled] .datepicker table tr td.active.focus, fieldset[disabled] .datepicker table tr td.active.highlighted.focus, fieldset[disabled] .datepicker table tr td.active.highlighted:focus, fieldset[disabled] .datepicker table tr td.active.highlighted:hover, fieldset[disabled] .datepicker table tr td.active:focus, fieldset[disabled] .datepicker table tr td.active:hover {\n  background-color: #337ab7;\n  border-color: #2e6da4; }\n\n.datepicker table tr td span {\n  display: block;\n  width: 23%;\n  height: 54px;\n  line-height: 54px;\n  float: left;\n  margin: 1%;\n  cursor: pointer;\n  border-radius: 4px; }\n\n.datepicker table tr td span.focused, .datepicker table tr td span:hover {\n  background: #eee; }\n\n.datepicker table tr td span.disabled, .datepicker table tr td span.disabled:hover {\n  background: 0 0;\n  color: #777;\n  cursor: default; }\n\n.datepicker table tr td span.active, .datepicker table tr td span.active.disabled, .datepicker table tr td span.active.disabled:hover, .datepicker table tr td span.active:hover {\n  color: #fff;\n  background-color: #337ab7;\n  border-color: #2e6da4;\n  text-shadow: 0 -1px 0 rgba(0, 0, 0, 0.25); }\n\n.datepicker table tr td span.active.disabled.focus, .datepicker table tr td span.active.disabled:focus, .datepicker table tr td span.active.disabled:hover.focus, .datepicker table tr td span.active.disabled:hover:focus, .datepicker table tr td span.active.focus, .datepicker table tr td span.active:focus, .datepicker table tr td span.active:hover.focus, .datepicker table tr td span.active:hover:focus {\n  color: #fff;\n  background-color: #286090;\n  border-color: #122b40; }\n\n.datepicker table tr td span.active.disabled:hover, .datepicker table tr td span.active.disabled:hover:hover, .datepicker table tr td span.active:hover, .datepicker table tr td span.active:hover:hover {\n  color: #fff;\n  background-color: #286090;\n  border-color: #204d74; }\n\n.datepicker table tr td span.active.active, .datepicker table tr td span.active.disabled.active, .datepicker table tr td span.active.disabled:active, .datepicker table tr td span.active.disabled:hover.active, .datepicker table tr td span.active.disabled:hover:active, .datepicker table tr td span.active:active, .datepicker table tr td span.active:hover.active, .datepicker table tr td span.active:hover:active {\n  color: #fff;\n  background-color: #286090;\n  border-color: #204d74; }\n\n.datepicker table tr td span.active.active.focus, .datepicker table tr td span.active.active:focus, .datepicker table tr td span.active.active:hover, .datepicker table tr td span.active.disabled.active.focus, .datepicker table tr td span.active.disabled.active:focus, .datepicker table tr td span.active.disabled.active:hover, .datepicker table tr td span.active.disabled:active.focus, .datepicker table tr td span.active.disabled:active:focus, .datepicker table tr td span.active.disabled:active:hover, .datepicker table tr td span.active.disabled:hover.active.focus, .datepicker table tr td span.active.disabled:hover.active:focus, .datepicker table tr td span.active.disabled:hover.active:hover, .datepicker table tr td span.active.disabled:hover:active.focus, .datepicker table tr td span.active.disabled:hover:active:focus, .datepicker table tr td span.active.disabled:hover:active:hover, .datepicker table tr td span.active:active.focus, .datepicker table tr td span.active:active:focus, .datepicker table tr td span.active:active:hover, .datepicker table tr td span.active:hover.active.focus, .datepicker table tr td span.active:hover.active:focus, .datepicker table tr td span.active:hover.active:hover, .datepicker table tr td span.active:hover:active.focus, .datepicker table tr td span.active:hover:active:focus, .datepicker table tr td span.active:hover:active:hover {\n  color: #fff;\n  background-color: #204d74;\n  border-color: #122b40; }\n\n.datepicker table tr td span.active.disabled.disabled.focus, .datepicker table tr td span.active.disabled.disabled:focus, .datepicker table tr td span.active.disabled.disabled:hover, .datepicker table tr td span.active.disabled.focus, .datepicker table tr td span.active.disabled:focus, .datepicker table tr td span.active.disabled:hover, .datepicker table tr td span.active.disabled:hover.disabled.focus, .datepicker table tr td span.active.disabled:hover.disabled:focus, .datepicker table tr td span.active.disabled:hover.disabled:hover, .datepicker table tr td span.active.disabled:hover[disabled].focus, .datepicker table tr td span.active.disabled:hover[disabled]:focus, .datepicker table tr td span.active.disabled:hover[disabled]:hover, .datepicker table tr td span.active.disabled[disabled].focus, .datepicker table tr td span.active.disabled[disabled]:focus, .datepicker table tr td span.active.disabled[disabled]:hover, .datepicker table tr td span.active:hover.disabled.focus, .datepicker table tr td span.active:hover.disabled:focus, .datepicker table tr td span.active:hover.disabled:hover, .datepicker table tr td span.active:hover[disabled].focus, .datepicker table tr td span.active:hover[disabled]:focus, .datepicker table tr td span.active:hover[disabled]:hover, .datepicker table tr td span.active[disabled].focus, .datepicker table tr td span.active[disabled]:focus, .datepicker table tr td span.active[disabled]:hover, fieldset[disabled] .datepicker table tr td span.active.disabled.focus, fieldset[disabled] .datepicker table tr td span.active.disabled:focus, fieldset[disabled] .datepicker table tr td span.active.disabled:hover, fieldset[disabled] .datepicker table tr td span.active.disabled:hover.focus, fieldset[disabled] .datepicker table tr td span.active.disabled:hover:focus, fieldset[disabled] .datepicker table tr td span.active.disabled:hover:hover, fieldset[disabled] .datepicker table tr td span.active.focus, fieldset[disabled] .datepicker table tr td span.active:focus, fieldset[disabled] .datepicker table tr td span.active:hover, fieldset[disabled] .datepicker table tr td span.active:hover.focus, fieldset[disabled] .datepicker table tr td span.active:hover:focus, fieldset[disabled] .datepicker table tr td span.active:hover:hover {\n  background-color: #337ab7;\n  border-color: #2e6da4; }\n\n.datepicker table tr td span.new, .datepicker table tr td span.old {\n  color: #777; }\n\n.datepicker .datepicker-switch {\n  width: 145px; }\n\n.datepicker .datepicker-switch, .datepicker .next, .datepicker .prev, .datepicker tfoot tr th {\n  cursor: pointer; }\n\n.datepicker .datepicker-switch:hover, .datepicker .next:hover, .datepicker .prev:hover, .datepicker tfoot tr th:hover {\n  background: #eee; }\n\n.datepicker .cw {\n  font-size: 10px;\n  width: 12px;\n  padding: 0 2px 0 5px;\n  vertical-align: middle; }\n\n.input-group.date .input-group-addon {\n  cursor: pointer; }\n\n.input-daterange {\n  width: 100%; }\n\n.input-daterange input {\n  text-align: center; }\n\n.input-daterange input:first-child {\n  border-radius: 3px 0 0 3px; }\n\n.input-daterange input:last-child {\n  border-radius: 0 3px 3px 0; }\n\n.input-daterange .input-group-addon {\n  width: auto;\n  min-width: 16px;\n  padding: 4px 5px;\n  line-height: 1.42857143;\n  text-shadow: 0 1px 0 #fff;\n  border-width: 1px 0;\n  margin-left: -5px;\n  margin-right: -5px; }\n\n/*# sourceMappingURL=bootstrap-datepicker3.min.css.map */\n/*!\n * Timepicker Component for Twitter Bootstrap\n *\n * Copyright 2013 Joris de Wit\n *\n * Contributors https://github.com/jdewit/bootstrap-timepicker/graphs/contributors\n *\n * For the full copyright and license information, please view the LICENSE\n * file that was distributed with this source code.\n */\n.bootstrap-timepicker {\n  position: relative; }\n\n.bootstrap-timepicker.pull-right .bootstrap-timepicker-widget.dropdown-menu {\n  left: auto;\n  right: 0; }\n\n.bootstrap-timepicker.pull-right .bootstrap-timepicker-widget.dropdown-menu:before {\n  left: auto;\n  right: 12px; }\n\n.bootstrap-timepicker.pull-right .bootstrap-timepicker-widget.dropdown-menu:after {\n  left: auto;\n  right: 13px; }\n\n.bootstrap-timepicker .input-group-addon {\n  cursor: pointer; }\n\n.bootstrap-timepicker .input-group-addon i {\n  display: inline-block;\n  width: 16px;\n  height: 16px; }\n\n.bootstrap-timepicker-widget.dropdown-menu {\n  padding: 4px; }\n\n.bootstrap-timepicker-widget.dropdown-menu.open {\n  display: inline-block; }\n\n.bootstrap-timepicker-widget.dropdown-menu:before {\n  border-bottom: 7px solid rgba(0, 0, 0, 0.2);\n  border-left: 7px solid transparent;\n  border-right: 7px solid transparent;\n  content: \"\";\n  display: inline-block;\n  position: absolute; }\n\n.bootstrap-timepicker-widget.dropdown-menu:after {\n  border-bottom: 6px solid #fff;\n  border-left: 6px solid transparent;\n  border-right: 6px solid transparent;\n  content: \"\";\n  display: inline-block;\n  position: absolute; }\n\n.bootstrap-timepicker-widget.timepicker-orient-left:before {\n  left: 6px; }\n\n.bootstrap-timepicker-widget.timepicker-orient-left:after {\n  left: 7px; }\n\n.bootstrap-timepicker-widget.timepicker-orient-right:before {\n  right: 6px; }\n\n.bootstrap-timepicker-widget.timepicker-orient-right:after {\n  right: 7px; }\n\n.bootstrap-timepicker-widget.timepicker-orient-top:before {\n  top: -7px; }\n\n.bootstrap-timepicker-widget.timepicker-orient-top:after {\n  top: -6px; }\n\n.bootstrap-timepicker-widget.timepicker-orient-bottom:before {\n  bottom: -7px;\n  border-bottom: 0;\n  border-top: 7px solid #999; }\n\n.bootstrap-timepicker-widget.timepicker-orient-bottom:after {\n  bottom: -6px;\n  border-bottom: 0;\n  border-top: 6px solid #fff; }\n\n.bootstrap-timepicker-widget a.btn, .bootstrap-timepicker-widget input {\n  border-radius: 4px; }\n\n.bootstrap-timepicker-widget table {\n  width: 100%;\n  margin: 0; }\n\n.bootstrap-timepicker-widget table td {\n  text-align: center;\n  height: 30px;\n  margin: 0;\n  padding: 2px; }\n\n.bootstrap-timepicker-widget table td:not(.separator) {\n  min-width: 30px; }\n\n.bootstrap-timepicker-widget table td span {\n  width: 100%; }\n\n.bootstrap-timepicker-widget table td a {\n  border: 1px transparent solid;\n  width: 100%;\n  display: inline-block;\n  margin: 0;\n  padding: 8px 0;\n  outline: 0;\n  color: #333; }\n\n.bootstrap-timepicker-widget table td a:hover {\n  text-decoration: none;\n  background-color: #eee;\n  -webkit-border-radius: 4px;\n  -moz-border-radius: 4px;\n  border-radius: 4px;\n  border-color: #ddd; }\n\n.bootstrap-timepicker-widget table td a i {\n  margin-top: 2px;\n  font-size: 18px; }\n\n.bootstrap-timepicker-widget table td input {\n  width: 25px;\n  margin: 0;\n  text-align: center; }\n\n.bootstrap-timepicker-widget .modal-content {\n  padding: 4px; }\n\n@media (min-width: 767px) {\n  .bootstrap-timepicker-widget.modal {\n    width: 200px;\n    margin-left: -100px; } }\n\n@media (max-width: 767px) {\n  .bootstrap-timepicker {\n    width: 100%; }\n  .bootstrap-timepicker .dropdown-menu {\n    width: 100%; } }\n\n/*!\n * Bootstrap Colorpicker v2.3.6\n * https://itsjavi.com/bootstrap-colorpicker/\n *\n * Originally written by (c) 2012 Stefan Petre\n * Licensed under the Apache License v2.0\n * http://www.apache.org/licenses/LICENSE-2.0.txt\n *\n */\n.colorpicker-saturation {\n  width: 100px;\n  height: 100px;\n  background-image: url(\"../img/bootstrap-colorpicker/saturation.png\");\n  cursor: crosshair;\n  float: left; }\n\n.colorpicker-saturation i {\n  display: block;\n  height: 5px;\n  width: 5px;\n  border: 1px solid #000;\n  -webkit-border-radius: 5px;\n  -moz-border-radius: 5px;\n  border-radius: 5px;\n  position: absolute;\n  top: 0;\n  left: 0;\n  margin: -4px 0 0 -4px; }\n\n.colorpicker-saturation i b {\n  display: block;\n  height: 5px;\n  width: 5px;\n  border: 1px solid #fff;\n  -webkit-border-radius: 5px;\n  -moz-border-radius: 5px;\n  border-radius: 5px; }\n\n.colorpicker-hue,\n.colorpicker-alpha {\n  width: 15px;\n  height: 100px;\n  float: left;\n  cursor: row-resize;\n  margin-left: 4px;\n  margin-bottom: 4px; }\n\n.colorpicker-hue i,\n.colorpicker-alpha i {\n  display: block;\n  height: 1px;\n  background: #000;\n  border-top: 1px solid #fff;\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 100%;\n  margin-top: -1px; }\n\n.colorpicker-hue {\n  background-image: url(\"../img/bootstrap-colorpicker/hue.png\"); }\n\n.colorpicker-alpha {\n  background-image: url(\"../img/bootstrap-colorpicker/alpha.png\");\n  display: none; }\n\n.colorpicker-saturation,\n.colorpicker-hue,\n.colorpicker-alpha {\n  background-size: contain; }\n\n.colorpicker {\n  padding: 4px;\n  min-width: 130px;\n  margin-top: 1px;\n  -webkit-border-radius: 4px;\n  -moz-border-radius: 4px;\n  border-radius: 4px;\n  z-index: 2500; }\n\n.colorpicker:before,\n.colorpicker:after {\n  display: table;\n  content: \"\";\n  line-height: 0; }\n\n.colorpicker:after {\n  clear: both; }\n\n.colorpicker:before {\n  content: '';\n  display: inline-block;\n  border-left: 7px solid transparent;\n  border-right: 7px solid transparent;\n  border-bottom: 7px solid #ccc;\n  border-bottom-color: rgba(0, 0, 0, 0.2);\n  position: absolute;\n  top: -7px;\n  left: 6px; }\n\n.colorpicker:after {\n  content: '';\n  display: inline-block;\n  border-left: 6px solid transparent;\n  border-right: 6px solid transparent;\n  border-bottom: 6px solid #ffffff;\n  position: absolute;\n  top: -6px;\n  left: 7px; }\n\n.colorpicker div {\n  position: relative; }\n\n.colorpicker.colorpicker-with-alpha {\n  min-width: 140px; }\n\n.colorpicker.colorpicker-with-alpha .colorpicker-alpha {\n  display: block; }\n\n.colorpicker-color {\n  height: 10px;\n  margin-top: 5px;\n  clear: both;\n  background-image: url(\"../img/bootstrap-colorpicker/alpha.png\");\n  background-position: 0 100%; }\n\n.colorpicker-color div {\n  height: 10px; }\n\n.colorpicker-selectors {\n  display: none;\n  height: 10px;\n  margin-top: 5px;\n  clear: both; }\n\n.colorpicker-selectors i {\n  cursor: pointer;\n  float: left;\n  height: 10px;\n  width: 10px; }\n\n.colorpicker-selectors i + i {\n  margin-left: 3px; }\n\n.colorpicker-element .input-group-addon i,\n.colorpicker-element .add-on i {\n  display: inline-block;\n  cursor: pointer;\n  height: 16px;\n  vertical-align: text-top;\n  width: 16px; }\n\n.colorpicker.colorpicker-inline {\n  position: relative;\n  display: inline-block;\n  float: none;\n  z-index: auto; }\n\n.colorpicker.colorpicker-horizontal {\n  width: 110px;\n  min-width: 110px;\n  height: auto; }\n\n.colorpicker.colorpicker-horizontal .colorpicker-saturation {\n  margin-bottom: 4px; }\n\n.colorpicker.colorpicker-horizontal .colorpicker-color {\n  width: 100px; }\n\n.colorpicker.colorpicker-horizontal .colorpicker-hue,\n.colorpicker.colorpicker-horizontal .colorpicker-alpha {\n  width: 100px;\n  height: 15px;\n  float: left;\n  cursor: col-resize;\n  margin-left: 0px;\n  margin-bottom: 4px; }\n\n.colorpicker.colorpicker-horizontal .colorpicker-hue i,\n.colorpicker.colorpicker-horizontal .colorpicker-alpha i {\n  display: block;\n  height: 15px;\n  background: #ffffff;\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 1px;\n  border: none;\n  margin-top: 0px; }\n\n.colorpicker.colorpicker-horizontal .colorpicker-hue {\n  background-image: url(\"../img/bootstrap-colorpicker/hue-horizontal.png\"); }\n\n.colorpicker.colorpicker-horizontal .colorpicker-alpha {\n  background-image: url(\"../img/bootstrap-colorpicker/alpha-horizontal.png\"); }\n\n.colorpicker.colorpicker-hidden {\n  display: none; }\n\n.colorpicker.colorpicker-visible {\n  display: block; }\n\n.colorpicker-inline.colorpicker-visible {\n  display: inline-block; }\n\n.colorpicker-right:before {\n  left: auto;\n  right: 6px; }\n\n.colorpicker-right:after {\n  left: auto;\n  right: 7px; }\n\n.colorpicker-no-arrow:before {\n  border-right: 0;\n  border-left: 0; }\n\n.colorpicker-no-arrow:after {\n  border-right: 0;\n  border-left: 0; }\n\n/*# sourceMappingURL=bootstrap-colorpicker.css.map */\n.md-editor {\n  display: block;\n  border: 1px solid #ddd; }\n\n.md-editor .md-footer, .md-editor > .md-header {\n  display: block;\n  padding: 6px 4px;\n  background: #f5f5f5; }\n\n.md-editor > .md-header {\n  margin: 0; }\n\n.md-editor > .md-preview {\n  background: #fff;\n  border-top: 1px dashed #ddd;\n  border-bottom: 1px dashed #ddd;\n  min-height: 10px;\n  overflow: auto; }\n\n.md-editor > textarea {\n  font-family: Menlo,Monaco,Consolas,\"Courier New\",monospace;\n  font-size: 14px;\n  outline: 0;\n  margin: 0;\n  display: block;\n  padding: 0;\n  width: 100%;\n  border: 0;\n  border-top: 1px dashed #ddd;\n  border-bottom: 1px dashed #ddd;\n  border-radius: 0;\n  box-shadow: none;\n  background: #eee; }\n\n.md-editor > textarea:focus {\n  box-shadow: none;\n  background: #fff; }\n\n.md-editor.active {\n  border-color: #66afe9;\n  outline: 0;\n  -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 8px rgba(102, 175, 233, 0.6);\n  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 8px rgba(102, 175, 233, 0.6); }\n\n.md-editor .md-controls {\n  float: right;\n  padding: 3px; }\n\n.md-editor .md-controls .md-control {\n  right: 5px;\n  color: #bebebe;\n  padding: 3px 3px 3px 10px; }\n\n.md-editor .md-controls .md-control:hover {\n  color: #333; }\n\n.md-editor.md-fullscreen-mode {\n  width: 100%;\n  height: 100%;\n  position: fixed;\n  top: 0;\n  left: 0;\n  z-index: 99999;\n  padding: 60px 30px 15px;\n  background: #fff !important;\n  border: 0 !important; }\n\n.md-editor.md-fullscreen-mode .md-footer {\n  display: none; }\n\n.md-editor.md-fullscreen-mode .md-input, .md-editor.md-fullscreen-mode .md-preview {\n  margin: 0 auto !important;\n  height: 100% !important;\n  font-size: 20px !important;\n  padding: 20px !important;\n  color: #999;\n  line-height: 1.6em !important;\n  resize: none !important;\n  box-shadow: none !important;\n  background: #fff !important;\n  border: 0 !important; }\n\n.md-editor.md-fullscreen-mode .md-preview {\n  color: #333;\n  overflow: auto; }\n\n.md-editor.md-fullscreen-mode .md-input:focus, .md-editor.md-fullscreen-mode .md-input:hover {\n  color: #333;\n  background: #fff !important; }\n\n.md-editor.md-fullscreen-mode .md-header {\n  background: 0 0;\n  text-align: center;\n  position: fixed;\n  width: 100%;\n  top: 20px; }\n\n.md-editor.md-fullscreen-mode .btn-group {\n  float: none; }\n\n.md-editor.md-fullscreen-mode .btn {\n  border: 0;\n  background: 0 0;\n  color: #b3b3b3; }\n\n.md-editor.md-fullscreen-mode .btn.active, .md-editor.md-fullscreen-mode .btn:active, .md-editor.md-fullscreen-mode .btn:focus, .md-editor.md-fullscreen-mode .btn:hover {\n  box-shadow: none;\n  color: #333; }\n\n.md-editor.md-fullscreen-mode .md-fullscreen-controls {\n  position: absolute;\n  top: 20px;\n  right: 20px;\n  text-align: right;\n  z-index: 1002;\n  display: block; }\n\n.md-editor.md-fullscreen-mode .md-fullscreen-controls a {\n  color: #b3b3b3;\n  clear: right;\n  margin: 10px;\n  width: 30px;\n  height: 30px;\n  text-align: center; }\n\n.md-editor.md-fullscreen-mode .md-fullscreen-controls a:hover {\n  color: #333;\n  text-decoration: none; }\n\n.md-editor.md-fullscreen-mode .md-editor {\n  height: 100% !important;\n  position: relative; }\n\n.md-editor .md-fullscreen-controls {\n  display: none; }\n\n.md-nooverflow {\n  overflow: hidden;\n  position: fixed;\n  width: 100%; }\n\n/*!\r\n * Bootstrap-select v1.11.2 (http://silviomoreto.github.io/bootstrap-select)\r\n *\r\n * Copyright 2013-2016 bootstrap-select\r\n * Licensed under MIT (https://github.com/silviomoreto/bootstrap-select/blob/master/LICENSE)\r\n */\nselect.bs-select-hidden,\nselect.selectpicker {\n  display: none !important; }\n\n.bootstrap-select {\n  width: 220px \\0;\n  /*IE9 and below*/ }\n\n.bootstrap-select > .dropdown-toggle {\n  width: 100%;\n  padding-right: 25px;\n  z-index: 1; }\n\n.bootstrap-select > .dropdown-toggle.bs-placeholder,\n.bootstrap-select > .dropdown-toggle.bs-placeholder:hover,\n.bootstrap-select > .dropdown-toggle.bs-placeholder:focus,\n.bootstrap-select > .dropdown-toggle.bs-placeholder:active {\n  color: #999; }\n\n.bootstrap-select > select {\n  position: absolute !important;\n  bottom: 0;\n  left: 50%;\n  display: block !important;\n  width: 0.5px !important;\n  height: 100% !important;\n  padding: 0 !important;\n  opacity: 0 !important;\n  border: none; }\n\n.bootstrap-select > select.mobile-device {\n  top: 0;\n  left: 0;\n  display: block !important;\n  width: 100% !important;\n  z-index: 2; }\n\n.has-error .bootstrap-select .dropdown-toggle,\n.error .bootstrap-select .dropdown-toggle {\n  border-color: #b94a48; }\n\n.bootstrap-select.fit-width {\n  width: auto !important; }\n\n.bootstrap-select:not([class*=\"col-\"]):not([class*=\"form-control\"]):not(.input-group-btn) {\n  width: 220px; }\n\n.bootstrap-select .dropdown-toggle:focus {\n  outline: thin dotted #333333 !important;\n  outline: 5px auto -webkit-focus-ring-color !important;\n  outline-offset: -2px; }\n\n.bootstrap-select.form-control {\n  margin-bottom: 0;\n  padding: 0;\n  border: none; }\n\n.bootstrap-select.form-control:not([class*=\"col-\"]) {\n  width: 100%; }\n\n.bootstrap-select.form-control.input-group-btn {\n  z-index: auto; }\n\n.bootstrap-select.form-control.input-group-btn:not(:first-child):not(:last-child) > .btn {\n  border-radius: 0; }\n\n.bootstrap-select.btn-group:not(.input-group-btn),\n.bootstrap-select.btn-group[class*=\"col-\"] {\n  float: none;\n  display: inline-block;\n  margin-left: 0; }\n\n.bootstrap-select.btn-group.dropdown-menu-right,\n.bootstrap-select.btn-group[class*=\"col-\"].dropdown-menu-right,\n.row .bootstrap-select.btn-group[class*=\"col-\"].dropdown-menu-right {\n  float: right; }\n\n.form-inline .bootstrap-select.btn-group,\n.form-horizontal .bootstrap-select.btn-group,\n.form-group .bootstrap-select.btn-group {\n  margin-bottom: 0; }\n\n.form-group-lg .bootstrap-select.btn-group.form-control,\n.form-group-sm .bootstrap-select.btn-group.form-control {\n  padding: 0; }\n\n.form-inline .bootstrap-select.btn-group .form-control {\n  width: 100%; }\n\n.bootstrap-select.btn-group.disabled,\n.bootstrap-select.btn-group > .disabled {\n  cursor: not-allowed; }\n\n.bootstrap-select.btn-group.disabled:focus,\n.bootstrap-select.btn-group > .disabled:focus {\n  outline: none !important; }\n\n.bootstrap-select.btn-group.bs-container {\n  position: absolute;\n  height: 0 !important;\n  padding: 0 !important; }\n\n.bootstrap-select.btn-group.bs-container .dropdown-menu {\n  z-index: 1060; }\n\n.bootstrap-select.btn-group .dropdown-toggle .filter-option {\n  display: inline-block;\n  overflow: hidden;\n  width: 100%;\n  text-align: left; }\n\n.bootstrap-select.btn-group .dropdown-toggle .caret {\n  position: absolute;\n  top: 50%;\n  right: 12px;\n  margin-top: -2px;\n  vertical-align: middle; }\n\n.bootstrap-select.btn-group[class*=\"col-\"] .dropdown-toggle {\n  width: 100%; }\n\n.bootstrap-select.btn-group .dropdown-menu {\n  min-width: 100%;\n  -webkit-box-sizing: border-box;\n  -moz-box-sizing: border-box;\n  box-sizing: border-box; }\n\n.bootstrap-select.btn-group .dropdown-menu.inner {\n  position: static;\n  float: none;\n  border: 0;\n  padding: 0;\n  margin: 0;\n  border-radius: 0;\n  -webkit-box-shadow: none;\n  box-shadow: none; }\n\n.bootstrap-select.btn-group .dropdown-menu li {\n  position: relative; }\n\n.bootstrap-select.btn-group .dropdown-menu li.active small {\n  color: #fff; }\n\n.bootstrap-select.btn-group .dropdown-menu li.disabled a {\n  cursor: not-allowed; }\n\n.bootstrap-select.btn-group .dropdown-menu li a {\n  cursor: pointer;\n  -webkit-user-select: none;\n  -moz-user-select: none;\n  -ms-user-select: none;\n  user-select: none; }\n\n.bootstrap-select.btn-group .dropdown-menu li a.opt {\n  position: relative;\n  padding-left: 2.25em; }\n\n.bootstrap-select.btn-group .dropdown-menu li a span.check-mark {\n  display: none; }\n\n.bootstrap-select.btn-group .dropdown-menu li a span.text {\n  display: inline-block; }\n\n.bootstrap-select.btn-group .dropdown-menu li small {\n  padding-left: 0.5em; }\n\n.bootstrap-select.btn-group .dropdown-menu .notify {\n  position: absolute;\n  bottom: 5px;\n  width: 96%;\n  margin: 0 2%;\n  min-height: 26px;\n  padding: 3px 5px;\n  background: #f5f5f5;\n  border: 1px solid #e3e3e3;\n  -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.05);\n  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.05);\n  pointer-events: none;\n  opacity: 0.9;\n  -webkit-box-sizing: border-box;\n  -moz-box-sizing: border-box;\n  box-sizing: border-box; }\n\n.bootstrap-select.btn-group .no-results {\n  padding: 3px;\n  background: #f5f5f5;\n  margin: 0 5px;\n  white-space: nowrap; }\n\n.bootstrap-select.btn-group.fit-width .dropdown-toggle .filter-option {\n  position: static; }\n\n.bootstrap-select.btn-group.fit-width .dropdown-toggle .caret {\n  position: static;\n  top: auto;\n  margin-top: -1px; }\n\n.bootstrap-select.btn-group.show-tick .dropdown-menu li.selected a span.check-mark {\n  position: absolute;\n  display: inline-block;\n  right: 15px;\n  margin-top: 5px; }\n\n.bootstrap-select.btn-group.show-tick .dropdown-menu li a span.text {\n  margin-right: 34px; }\n\n.bootstrap-select.show-menu-arrow.open > .dropdown-toggle {\n  z-index: 1061; }\n\n.bootstrap-select.show-menu-arrow .dropdown-toggle:before {\n  content: '';\n  border-left: 7px solid transparent;\n  border-right: 7px solid transparent;\n  border-bottom: 7px solid rgba(204, 204, 204, 0.2);\n  position: absolute;\n  bottom: -4px;\n  left: 9px;\n  display: none; }\n\n.bootstrap-select.show-menu-arrow .dropdown-toggle:after {\n  content: '';\n  border-left: 6px solid transparent;\n  border-right: 6px solid transparent;\n  border-bottom: 6px solid white;\n  position: absolute;\n  bottom: -4px;\n  left: 10px;\n  display: none; }\n\n.bootstrap-select.show-menu-arrow.dropup .dropdown-toggle:before {\n  bottom: auto;\n  top: -3px;\n  border-top: 7px solid rgba(204, 204, 204, 0.2);\n  border-bottom: 0; }\n\n.bootstrap-select.show-menu-arrow.dropup .dropdown-toggle:after {\n  bottom: auto;\n  top: -3px;\n  border-top: 6px solid white;\n  border-bottom: 0; }\n\n.bootstrap-select.show-menu-arrow.pull-right .dropdown-toggle:before {\n  right: 12px;\n  left: auto; }\n\n.bootstrap-select.show-menu-arrow.pull-right .dropdown-toggle:after {\n  right: 13px;\n  left: auto; }\n\n.bootstrap-select.show-menu-arrow.open > .dropdown-toggle:before,\n.bootstrap-select.show-menu-arrow.open > .dropdown-toggle:after {\n  display: block; }\n\n.bs-searchbox,\n.bs-actionsbox,\n.bs-donebutton {\n  padding: 4px 8px; }\n\n.bs-actionsbox {\n  width: 100%;\n  -webkit-box-sizing: border-box;\n  -moz-box-sizing: border-box;\n  box-sizing: border-box; }\n\n.bs-actionsbox .btn-group button {\n  width: 50%; }\n\n.bs-donebutton {\n  float: left;\n  width: 100%;\n  -webkit-box-sizing: border-box;\n  -moz-box-sizing: border-box;\n  box-sizing: border-box; }\n\n.bs-donebutton .btn-group button {\n  width: 100%; }\n\n.bs-searchbox + .bs-actionsbox {\n  padding: 0 8px 4px; }\n\n.bs-searchbox .form-control {\n  margin-bottom: 0;\n  width: 100%;\n  float: none; }\n\n/*# sourceMappingURL=bootstrap-select.css.map */\n/*!\n * Jasny Bootstrap v3.1.3 (http://jasny.github.io/bootstrap)\n * Copyright 2012-2014 Arnold Daniels\n * Licensed under Apache-2.0 (https://github.com/jasny/bootstrap/blob/master/LICENSE)\n */\n.container-smooth {\n  max-width: 1170px; }\n\n@media (min-width: 1px) {\n  .container-smooth {\n    width: auto; } }\n\n.btn-labeled {\n  padding-top: 0;\n  padding-bottom: 0; }\n\n.btn-label {\n  position: relative;\n  left: -12px;\n  display: inline-block;\n  padding: 6px 12px;\n  background: transparent;\n  background: rgba(0, 0, 0, 0.15);\n  border-radius: 3px 0 0 3px; }\n\n.btn-label.btn-label-right {\n  right: -12px;\n  left: auto;\n  border-radius: 0 3px 3px 0; }\n\n.btn-lg .btn-label {\n  left: -16px;\n  padding: 10px 16px;\n  border-radius: 5px 0 0 5px; }\n\n.btn-lg .btn-label.btn-label-right {\n  right: -16px;\n  left: auto;\n  border-radius: 0 5px 5px 0; }\n\n.btn-sm .btn-label {\n  left: -10px;\n  padding: 5px 10px;\n  border-radius: 2px 0 0 2px; }\n\n.btn-sm .btn-label.btn-label-right {\n  right: -10px;\n  left: auto;\n  border-radius: 0 2px 2px 0; }\n\n.btn-xs .btn-label {\n  left: -5px;\n  padding: 1px 5px;\n  border-radius: 2px 0 0 2px; }\n\n.btn-xs .btn-label.btn-label-right {\n  right: -5px;\n  left: auto;\n  border-radius: 0 2px 2px 0; }\n\n.nav-tabs-bottom {\n  border-top: 1px solid #ddd;\n  border-bottom: 0; }\n\n.nav-tabs-bottom > li {\n  margin-top: -1px;\n  margin-bottom: 0; }\n\n.nav-tabs-bottom > li > a {\n  border-radius: 0 0 4px 4px; }\n\n.nav-tabs-bottom > li > a:hover,\n.nav-tabs-bottom > li > a:focus,\n.nav-tabs-bottom > li.active > a,\n.nav-tabs-bottom > li.active > a:hover,\n.nav-tabs-bottom > li.active > a:focus {\n  border: 1px solid #ddd;\n  border-top-color: transparent; }\n\n.nav-tabs-left {\n  border-right: 1px solid #ddd;\n  border-bottom: 0; }\n\n.nav-tabs-left > li {\n  float: none;\n  margin-right: -1px;\n  margin-bottom: 0; }\n\n.nav-tabs-left > li > a {\n  margin-right: 0;\n  margin-bottom: 2px;\n  border-radius: 4px 0 0 4px; }\n\n.nav-tabs-left > li > a:hover,\n.nav-tabs-left > li > a:focus,\n.nav-tabs-left > li.active > a,\n.nav-tabs-left > li.active > a:hover,\n.nav-tabs-left > li.active > a:focus {\n  border: 1px solid #ddd;\n  border-right-color: transparent; }\n\n.row > .nav-tabs-left {\n  position: relative;\n  z-index: 1;\n  padding-right: 0;\n  padding-left: 15px;\n  margin-right: -1px; }\n\n.row > .nav-tabs-left + .tab-content {\n  border-left: 1px solid #ddd; }\n\n.nav-tabs-right {\n  border-bottom: 0;\n  border-left: 1px solid #ddd; }\n\n.nav-tabs-right > li {\n  float: none;\n  margin-bottom: 0;\n  margin-left: -1px; }\n\n.nav-tabs-right > li > a {\n  margin-bottom: 2px;\n  margin-left: 0;\n  border-radius: 0 4px 4px 0; }\n\n.nav-tabs-right > li > a:hover,\n.nav-tabs-right > li > a:focus,\n.nav-tabs-right > li.active > a,\n.nav-tabs-right > li.active > a:hover,\n.nav-tabs-right > li.active > a:focus {\n  border: 1px solid #ddd;\n  border-left-color: transparent; }\n\n.row > .nav-tabs-right {\n  padding-right: 15px;\n  padding-left: 0; }\n\n.navmenu,\n.navbar-offcanvas {\n  width: 300px;\n  height: auto;\n  border-style: solid;\n  border-width: 1px;\n  border-radius: 4px; }\n\n.navmenu-fixed-left,\n.navmenu-fixed-right,\n.navbar-offcanvas {\n  position: fixed;\n  top: 0;\n  bottom: 0;\n  z-index: 1050;\n  overflow-y: auto;\n  border-radius: 0; }\n\n.navmenu-fixed-left,\n.navbar-offcanvas.navmenu-fixed-left {\n  right: auto;\n  left: 0;\n  border-width: 0 1px 0 0; }\n\n.navmenu-fixed-right,\n.navbar-offcanvas {\n  right: 0;\n  left: auto;\n  border-width: 0 0 0 1px; }\n\n.navmenu-nav {\n  margin-bottom: 10px; }\n\n.navmenu-nav.dropdown-menu {\n  position: static;\n  float: none;\n  padding-top: 0;\n  margin: 0;\n  border: none;\n  border-radius: 0;\n  -webkit-box-shadow: none;\n  box-shadow: none; }\n\n.navbar-offcanvas .navbar-nav {\n  margin: 0; }\n\n@media (min-width: 768px) {\n  .navbar-offcanvas {\n    width: auto;\n    border-top: 0;\n    box-shadow: none; }\n  .navbar-offcanvas.offcanvas {\n    position: static;\n    display: block !important;\n    height: auto !important;\n    padding-bottom: 0;\n    overflow: visible !important; }\n  .navbar-offcanvas .navbar-nav.navbar-left:first-child {\n    margin-left: -15px; }\n  .navbar-offcanvas .navbar-nav.navbar-right:last-child {\n    margin-right: -15px; }\n  .navbar-offcanvas .navmenu-brand {\n    display: none; } }\n\n.navmenu-brand {\n  display: block;\n  padding: 10px 15px;\n  margin: 10px 0;\n  font-size: 18px;\n  line-height: 20px; }\n\n.navmenu-brand:hover,\n.navmenu-brand:focus {\n  text-decoration: none; }\n\n.navmenu-default,\n.navbar-default .navbar-offcanvas {\n  background-color: #f8f8f8;\n  border-color: #e7e7e7; }\n\n.navmenu-default .navmenu-brand,\n.navbar-default .navbar-offcanvas .navmenu-brand {\n  color: #777; }\n\n.navmenu-default .navmenu-brand:hover,\n.navbar-default .navbar-offcanvas .navmenu-brand:hover,\n.navmenu-default .navmenu-brand:focus,\n.navbar-default .navbar-offcanvas .navmenu-brand:focus {\n  color: #5e5e5e;\n  background-color: transparent; }\n\n.navmenu-default .navmenu-text,\n.navbar-default .navbar-offcanvas .navmenu-text {\n  color: #777; }\n\n.navmenu-default .navmenu-nav > .dropdown > a:hover .caret,\n.navbar-default .navbar-offcanvas .navmenu-nav > .dropdown > a:hover .caret,\n.navmenu-default .navmenu-nav > .dropdown > a:focus .caret,\n.navbar-default .navbar-offcanvas .navmenu-nav > .dropdown > a:focus .caret {\n  border-top-color: #333;\n  border-bottom-color: #333; }\n\n.navmenu-default .navmenu-nav > .open > a,\n.navbar-default .navbar-offcanvas .navmenu-nav > .open > a,\n.navmenu-default .navmenu-nav > .open > a:hover,\n.navbar-default .navbar-offcanvas .navmenu-nav > .open > a:hover,\n.navmenu-default .navmenu-nav > .open > a:focus,\n.navbar-default .navbar-offcanvas .navmenu-nav > .open > a:focus {\n  color: #555;\n  background-color: #e7e7e7; }\n\n.navmenu-default .navmenu-nav > .open > a .caret,\n.navbar-default .navbar-offcanvas .navmenu-nav > .open > a .caret,\n.navmenu-default .navmenu-nav > .open > a:hover .caret,\n.navbar-default .navbar-offcanvas .navmenu-nav > .open > a:hover .caret,\n.navmenu-default .navmenu-nav > .open > a:focus .caret,\n.navbar-default .navbar-offcanvas .navmenu-nav > .open > a:focus .caret {\n  border-top-color: #555;\n  border-bottom-color: #555; }\n\n.navmenu-default .navmenu-nav > .dropdown > a .caret,\n.navbar-default .navbar-offcanvas .navmenu-nav > .dropdown > a .caret {\n  border-top-color: #777;\n  border-bottom-color: #777; }\n\n.navmenu-default .navmenu-nav.dropdown-menu,\n.navbar-default .navbar-offcanvas .navmenu-nav.dropdown-menu {\n  background-color: #e7e7e7; }\n\n.navmenu-default .navmenu-nav.dropdown-menu > .divider,\n.navbar-default .navbar-offcanvas .navmenu-nav.dropdown-menu > .divider {\n  background-color: #f8f8f8; }\n\n.navmenu-default .navmenu-nav.dropdown-menu > .active > a,\n.navbar-default .navbar-offcanvas .navmenu-nav.dropdown-menu > .active > a,\n.navmenu-default .navmenu-nav.dropdown-menu > .active > a:hover,\n.navbar-default .navbar-offcanvas .navmenu-nav.dropdown-menu > .active > a:hover,\n.navmenu-default .navmenu-nav.dropdown-menu > .active > a:focus,\n.navbar-default .navbar-offcanvas .navmenu-nav.dropdown-menu > .active > a:focus {\n  background-color: #d7d7d7; }\n\n.navmenu-default .navmenu-nav > li > a,\n.navbar-default .navbar-offcanvas .navmenu-nav > li > a {\n  color: #777; }\n\n.navmenu-default .navmenu-nav > li > a:hover,\n.navbar-default .navbar-offcanvas .navmenu-nav > li > a:hover,\n.navmenu-default .navmenu-nav > li > a:focus,\n.navbar-default .navbar-offcanvas .navmenu-nav > li > a:focus {\n  color: #333;\n  background-color: transparent; }\n\n.navmenu-default .navmenu-nav > .active > a,\n.navbar-default .navbar-offcanvas .navmenu-nav > .active > a,\n.navmenu-default .navmenu-nav > .active > a:hover,\n.navbar-default .navbar-offcanvas .navmenu-nav > .active > a:hover,\n.navmenu-default .navmenu-nav > .active > a:focus,\n.navbar-default .navbar-offcanvas .navmenu-nav > .active > a:focus {\n  color: #555;\n  background-color: #e7e7e7; }\n\n.navmenu-default .navmenu-nav > .disabled > a,\n.navbar-default .navbar-offcanvas .navmenu-nav > .disabled > a,\n.navmenu-default .navmenu-nav > .disabled > a:hover,\n.navbar-default .navbar-offcanvas .navmenu-nav > .disabled > a:hover,\n.navmenu-default .navmenu-nav > .disabled > a:focus,\n.navbar-default .navbar-offcanvas .navmenu-nav > .disabled > a:focus {\n  color: #ccc;\n  background-color: transparent; }\n\n.navmenu-inverse,\n.navbar-inverse .navbar-offcanvas {\n  background-color: #222;\n  border-color: #080808; }\n\n.navmenu-inverse .navmenu-brand,\n.navbar-inverse .navbar-offcanvas .navmenu-brand {\n  color: #999; }\n\n.navmenu-inverse .navmenu-brand:hover,\n.navbar-inverse .navbar-offcanvas .navmenu-brand:hover,\n.navmenu-inverse .navmenu-brand:focus,\n.navbar-inverse .navbar-offcanvas .navmenu-brand:focus {\n  color: #fff;\n  background-color: transparent; }\n\n.navmenu-inverse .navmenu-text,\n.navbar-inverse .navbar-offcanvas .navmenu-text {\n  color: #999; }\n\n.navmenu-inverse .navmenu-nav > .dropdown > a:hover .caret,\n.navbar-inverse .navbar-offcanvas .navmenu-nav > .dropdown > a:hover .caret,\n.navmenu-inverse .navmenu-nav > .dropdown > a:focus .caret,\n.navbar-inverse .navbar-offcanvas .navmenu-nav > .dropdown > a:focus .caret {\n  border-top-color: #fff;\n  border-bottom-color: #fff; }\n\n.navmenu-inverse .navmenu-nav > .open > a,\n.navbar-inverse .navbar-offcanvas .navmenu-nav > .open > a,\n.navmenu-inverse .navmenu-nav > .open > a:hover,\n.navbar-inverse .navbar-offcanvas .navmenu-nav > .open > a:hover,\n.navmenu-inverse .navmenu-nav > .open > a:focus,\n.navbar-inverse .navbar-offcanvas .navmenu-nav > .open > a:focus {\n  color: #fff;\n  background-color: #080808; }\n\n.navmenu-inverse .navmenu-nav > .open > a .caret,\n.navbar-inverse .navbar-offcanvas .navmenu-nav > .open > a .caret,\n.navmenu-inverse .navmenu-nav > .open > a:hover .caret,\n.navbar-inverse .navbar-offcanvas .navmenu-nav > .open > a:hover .caret,\n.navmenu-inverse .navmenu-nav > .open > a:focus .caret,\n.navbar-inverse .navbar-offcanvas .navmenu-nav > .open > a:focus .caret {\n  border-top-color: #fff;\n  border-bottom-color: #fff; }\n\n.navmenu-inverse .navmenu-nav > .dropdown > a .caret,\n.navbar-inverse .navbar-offcanvas .navmenu-nav > .dropdown > a .caret {\n  border-top-color: #999;\n  border-bottom-color: #999; }\n\n.navmenu-inverse .navmenu-nav.dropdown-menu,\n.navbar-inverse .navbar-offcanvas .navmenu-nav.dropdown-menu {\n  background-color: #080808; }\n\n.navmenu-inverse .navmenu-nav.dropdown-menu > .divider,\n.navbar-inverse .navbar-offcanvas .navmenu-nav.dropdown-menu > .divider {\n  background-color: #222; }\n\n.navmenu-inverse .navmenu-nav.dropdown-menu > .active > a,\n.navbar-inverse .navbar-offcanvas .navmenu-nav.dropdown-menu > .active > a,\n.navmenu-inverse .navmenu-nav.dropdown-menu > .active > a:hover,\n.navbar-inverse .navbar-offcanvas .navmenu-nav.dropdown-menu > .active > a:hover,\n.navmenu-inverse .navmenu-nav.dropdown-menu > .active > a:focus,\n.navbar-inverse .navbar-offcanvas .navmenu-nav.dropdown-menu > .active > a:focus {\n  background-color: #000; }\n\n.navmenu-inverse .navmenu-nav > li > a,\n.navbar-inverse .navbar-offcanvas .navmenu-nav > li > a {\n  color: #999; }\n\n.navmenu-inverse .navmenu-nav > li > a:hover,\n.navbar-inverse .navbar-offcanvas .navmenu-nav > li > a:hover,\n.navmenu-inverse .navmenu-nav > li > a:focus,\n.navbar-inverse .navbar-offcanvas .navmenu-nav > li > a:focus {\n  color: #fff;\n  background-color: transparent; }\n\n.navmenu-inverse .navmenu-nav > .active > a,\n.navbar-inverse .navbar-offcanvas .navmenu-nav > .active > a,\n.navmenu-inverse .navmenu-nav > .active > a:hover,\n.navbar-inverse .navbar-offcanvas .navmenu-nav > .active > a:hover,\n.navmenu-inverse .navmenu-nav > .active > a:focus,\n.navbar-inverse .navbar-offcanvas .navmenu-nav > .active > a:focus {\n  color: #fff;\n  background-color: #080808; }\n\n.navmenu-inverse .navmenu-nav > .disabled > a,\n.navbar-inverse .navbar-offcanvas .navmenu-nav > .disabled > a,\n.navmenu-inverse .navmenu-nav > .disabled > a:hover,\n.navbar-inverse .navbar-offcanvas .navmenu-nav > .disabled > a:hover,\n.navmenu-inverse .navmenu-nav > .disabled > a:focus,\n.navbar-inverse .navbar-offcanvas .navmenu-nav > .disabled > a:focus {\n  color: #444;\n  background-color: transparent; }\n\n.alert-fixed-top,\n.alert-fixed-bottom {\n  position: fixed;\n  left: 0;\n  z-index: 1035;\n  width: 100%;\n  margin: 0;\n  border-radius: 0; }\n\n@media (min-width: 992px) {\n  .alert-fixed-top,\n  .alert-fixed-bottom {\n    left: 50%;\n    width: 992px;\n    margin-left: -496px; } }\n\n.alert-fixed-top {\n  top: 0;\n  border-width: 0 0 1px 0; }\n\n@media (min-width: 992px) {\n  .alert-fixed-top {\n    border-width: 0 1px 1px 1px;\n    border-bottom-right-radius: 4px;\n    border-bottom-left-radius: 4px; } }\n\n.alert-fixed-bottom {\n  bottom: 0;\n  border-width: 1px 0 0 0; }\n\n@media (min-width: 992px) {\n  .alert-fixed-bottom {\n    border-width: 1px 1px 0 1px;\n    border-top-left-radius: 4px;\n    border-top-right-radius: 4px; } }\n\n.offcanvas {\n  display: none; }\n\n.offcanvas.in {\n  display: block; }\n\n@media (max-width: 767px) {\n  .offcanvas-xs {\n    display: none; }\n  .offcanvas-xs.in {\n    display: block; } }\n\n@media (max-width: 991px) {\n  .offcanvas-sm {\n    display: none; }\n  .offcanvas-sm.in {\n    display: block; } }\n\n@media (max-width: 1199px) {\n  .offcanvas-md {\n    display: none; }\n  .offcanvas-md.in {\n    display: block; } }\n\n.offcanvas-lg {\n  display: none; }\n\n.offcanvas-lg.in {\n  display: block; }\n\n.canvas-sliding {\n  -webkit-transition: top .35s, left .35s, bottom .35s, right .35s;\n  transition: top .35s, left .35s, bottom .35s, right .35s; }\n\n.offcanvas-clone {\n  position: absolute !important;\n  top: auto !important;\n  right: 0 !important;\n  bottom: 0 !important;\n  left: auto !important;\n  width: 0 !important;\n  height: 0 !important;\n  padding: 0 !important;\n  margin: 0 !important;\n  overflow: hidden !important;\n  border: none !important;\n  opacity: 0 !important; }\n\n.table.rowlink td:not(.rowlink-skip),\n.table .rowlink td:not(.rowlink-skip) {\n  cursor: pointer; }\n\n.table.rowlink td:not(.rowlink-skip) a,\n.table .rowlink td:not(.rowlink-skip) a {\n  font: inherit;\n  color: inherit;\n  text-decoration: inherit; }\n\n.table-hover.rowlink tr:hover td,\n.table-hover .rowlink tr:hover td {\n  background-color: #cfcfcf; }\n\n.btn-file {\n  position: relative;\n  overflow: hidden;\n  vertical-align: middle; }\n\n.btn-file > input {\n  position: absolute;\n  top: 0;\n  right: 0;\n  width: 100%;\n  height: 100%;\n  margin: 0;\n  font-size: 23px;\n  cursor: pointer;\n  filter: alpha(opacity=0);\n  opacity: 0;\n  direction: ltr; }\n\n.fileinput {\n  display: inline-block;\n  margin-bottom: 9px; }\n\n.fileinput .form-control {\n  display: inline-block;\n  padding-top: 7px;\n  padding-bottom: 5px;\n  margin-bottom: 0;\n  vertical-align: middle;\n  cursor: text; }\n\n.fileinput .thumbnail {\n  display: inline-block;\n  margin-bottom: 5px;\n  overflow: hidden;\n  text-align: center;\n  vertical-align: middle; }\n\n.fileinput .thumbnail > img {\n  max-height: 100%; }\n\n.fileinput .btn {\n  vertical-align: middle; }\n\n.fileinput-exists .fileinput-new,\n.fileinput-new .fileinput-exists {\n  display: none; }\n\n.fileinput-inline .fileinput-controls {\n  display: inline; }\n\n.fileinput-filename {\n  display: inline-block;\n  overflow: hidden;\n  vertical-align: middle; }\n\n.form-control .fileinput-filename {\n  vertical-align: bottom; }\n\n.fileinput.input-group {\n  display: table; }\n\n.fileinput.input-group > * {\n  position: relative;\n  z-index: 2; }\n\n.fileinput.input-group > .btn-file {\n  z-index: 1; }\n\n.fileinput-new.input-group .btn-file,\n.fileinput-new .input-group .btn-file {\n  border-radius: 0 4px 4px 0; }\n\n.fileinput-new.input-group .btn-file.btn-xs,\n.fileinput-new .input-group .btn-file.btn-xs,\n.fileinput-new.input-group .btn-file.btn-sm,\n.fileinput-new .input-group .btn-file.btn-sm {\n  border-radius: 0 3px 3px 0; }\n\n.fileinput-new.input-group .btn-file.btn-lg,\n.fileinput-new .input-group .btn-file.btn-lg {\n  border-radius: 0 6px 6px 0; }\n\n.form-group.has-warning .fileinput .fileinput-preview {\n  color: #8a6d3b; }\n\n.form-group.has-warning .fileinput .thumbnail {\n  border-color: #faebcc; }\n\n.form-group.has-error .fileinput .fileinput-preview {\n  color: #a94442; }\n\n.form-group.has-error .fileinput .thumbnail {\n  border-color: #ebccd1; }\n\n.form-group.has-success .fileinput .fileinput-preview {\n  color: #3c763d; }\n\n.form-group.has-success .fileinput .thumbnail {\n  border-color: #d6e9c6; }\n\n.input-group-addon:not(:first-child) {\n  border-left: 0; }\n\n/*# sourceMappingURL=jasny-bootstrap.css.map */\n/*\n * The MIT License\n * Copyright (c) 2012 Matias Meno <m@tias.me>\n */\n@-webkit-keyframes passing-through {\n  0% {\n    opacity: 0;\n    -webkit-transform: translateY(40px);\n    -moz-transform: translateY(40px);\n    -ms-transform: translateY(40px);\n    -o-transform: translateY(40px);\n    transform: translateY(40px); }\n  30%, 70% {\n    opacity: 1;\n    -webkit-transform: translateY(0px);\n    -moz-transform: translateY(0px);\n    -ms-transform: translateY(0px);\n    -o-transform: translateY(0px);\n    transform: translateY(0px); }\n  100% {\n    opacity: 0;\n    -webkit-transform: translateY(-40px);\n    -moz-transform: translateY(-40px);\n    -ms-transform: translateY(-40px);\n    -o-transform: translateY(-40px);\n    transform: translateY(-40px); } }\n\n@-moz-keyframes passing-through {\n  0% {\n    opacity: 0;\n    -webkit-transform: translateY(40px);\n    -moz-transform: translateY(40px);\n    -ms-transform: translateY(40px);\n    -o-transform: translateY(40px);\n    transform: translateY(40px); }\n  30%, 70% {\n    opacity: 1;\n    -webkit-transform: translateY(0px);\n    -moz-transform: translateY(0px);\n    -ms-transform: translateY(0px);\n    -o-transform: translateY(0px);\n    transform: translateY(0px); }\n  100% {\n    opacity: 0;\n    -webkit-transform: translateY(-40px);\n    -moz-transform: translateY(-40px);\n    -ms-transform: translateY(-40px);\n    -o-transform: translateY(-40px);\n    transform: translateY(-40px); } }\n\n@keyframes passing-through {\n  0% {\n    opacity: 0;\n    -webkit-transform: translateY(40px);\n    -moz-transform: translateY(40px);\n    -ms-transform: translateY(40px);\n    -o-transform: translateY(40px);\n    transform: translateY(40px); }\n  30%, 70% {\n    opacity: 1;\n    -webkit-transform: translateY(0px);\n    -moz-transform: translateY(0px);\n    -ms-transform: translateY(0px);\n    -o-transform: translateY(0px);\n    transform: translateY(0px); }\n  100% {\n    opacity: 0;\n    -webkit-transform: translateY(-40px);\n    -moz-transform: translateY(-40px);\n    -ms-transform: translateY(-40px);\n    -o-transform: translateY(-40px);\n    transform: translateY(-40px); } }\n\n@-webkit-keyframes slide-in {\n  0% {\n    opacity: 0;\n    -webkit-transform: translateY(40px);\n    -moz-transform: translateY(40px);\n    -ms-transform: translateY(40px);\n    -o-transform: translateY(40px);\n    transform: translateY(40px); }\n  30% {\n    opacity: 1;\n    -webkit-transform: translateY(0px);\n    -moz-transform: translateY(0px);\n    -ms-transform: translateY(0px);\n    -o-transform: translateY(0px);\n    transform: translateY(0px); } }\n\n@-moz-keyframes slide-in {\n  0% {\n    opacity: 0;\n    -webkit-transform: translateY(40px);\n    -moz-transform: translateY(40px);\n    -ms-transform: translateY(40px);\n    -o-transform: translateY(40px);\n    transform: translateY(40px); }\n  30% {\n    opacity: 1;\n    -webkit-transform: translateY(0px);\n    -moz-transform: translateY(0px);\n    -ms-transform: translateY(0px);\n    -o-transform: translateY(0px);\n    transform: translateY(0px); } }\n\n@keyframes slide-in {\n  0% {\n    opacity: 0;\n    -webkit-transform: translateY(40px);\n    -moz-transform: translateY(40px);\n    -ms-transform: translateY(40px);\n    -o-transform: translateY(40px);\n    transform: translateY(40px); }\n  30% {\n    opacity: 1;\n    -webkit-transform: translateY(0px);\n    -moz-transform: translateY(0px);\n    -ms-transform: translateY(0px);\n    -o-transform: translateY(0px);\n    transform: translateY(0px); } }\n\n@-webkit-keyframes pulse {\n  0% {\n    -webkit-transform: scale(1);\n    -moz-transform: scale(1);\n    -ms-transform: scale(1);\n    -o-transform: scale(1);\n    transform: scale(1); }\n  10% {\n    -webkit-transform: scale(1.1);\n    -moz-transform: scale(1.1);\n    -ms-transform: scale(1.1);\n    -o-transform: scale(1.1);\n    transform: scale(1.1); }\n  20% {\n    -webkit-transform: scale(1);\n    -moz-transform: scale(1);\n    -ms-transform: scale(1);\n    -o-transform: scale(1);\n    transform: scale(1); } }\n\n@-moz-keyframes pulse {\n  0% {\n    -webkit-transform: scale(1);\n    -moz-transform: scale(1);\n    -ms-transform: scale(1);\n    -o-transform: scale(1);\n    transform: scale(1); }\n  10% {\n    -webkit-transform: scale(1.1);\n    -moz-transform: scale(1.1);\n    -ms-transform: scale(1.1);\n    -o-transform: scale(1.1);\n    transform: scale(1.1); }\n  20% {\n    -webkit-transform: scale(1);\n    -moz-transform: scale(1);\n    -ms-transform: scale(1);\n    -o-transform: scale(1);\n    transform: scale(1); } }\n\n@keyframes pulse {\n  0% {\n    -webkit-transform: scale(1);\n    -moz-transform: scale(1);\n    -ms-transform: scale(1);\n    -o-transform: scale(1);\n    transform: scale(1); }\n  10% {\n    -webkit-transform: scale(1.1);\n    -moz-transform: scale(1.1);\n    -ms-transform: scale(1.1);\n    -o-transform: scale(1.1);\n    transform: scale(1.1); }\n  20% {\n    -webkit-transform: scale(1);\n    -moz-transform: scale(1);\n    -ms-transform: scale(1);\n    -o-transform: scale(1);\n    transform: scale(1); } }\n\n.dropzone, .dropzone * {\n  box-sizing: border-box; }\n\n.dropzone {\n  min-height: 150px;\n  border: 2px solid rgba(0, 0, 0, 0.3);\n  background: white;\n  padding: 20px 20px; }\n\n.dropzone.dz-clickable {\n  cursor: pointer; }\n\n.dropzone.dz-clickable * {\n  cursor: default; }\n\n.dropzone.dz-clickable .dz-message, .dropzone.dz-clickable .dz-message * {\n  cursor: pointer; }\n\n.dropzone.dz-started .dz-message {\n  display: none; }\n\n.dropzone.dz-drag-hover {\n  border-style: solid; }\n\n.dropzone.dz-drag-hover .dz-message {\n  opacity: 0.5; }\n\n.dropzone .dz-message {\n  text-align: center;\n  margin: 2em 0; }\n\n.dropzone .dz-preview {\n  position: relative;\n  display: inline-block;\n  vertical-align: top;\n  margin: 16px;\n  min-height: 100px; }\n\n.dropzone .dz-preview:hover {\n  z-index: 1000; }\n\n.dropzone .dz-preview:hover .dz-details {\n  opacity: 1; }\n\n.dropzone .dz-preview.dz-file-preview .dz-image {\n  border-radius: 20px;\n  background: #999;\n  background: linear-gradient(to bottom, #eee, #ddd); }\n\n.dropzone .dz-preview.dz-file-preview .dz-details {\n  opacity: 1; }\n\n.dropzone .dz-preview.dz-image-preview {\n  background: white; }\n\n.dropzone .dz-preview.dz-image-preview .dz-details {\n  -webkit-transition: opacity 0.2s linear;\n  -moz-transition: opacity 0.2s linear;\n  -ms-transition: opacity 0.2s linear;\n  -o-transition: opacity 0.2s linear;\n  transition: opacity 0.2s linear; }\n\n.dropzone .dz-preview .dz-remove {\n  font-size: 14px;\n  text-align: center;\n  display: block;\n  cursor: pointer;\n  border: none; }\n\n.dropzone .dz-preview .dz-remove:hover {\n  text-decoration: underline; }\n\n.dropzone .dz-preview:hover .dz-details {\n  opacity: 1; }\n\n.dropzone .dz-preview .dz-details {\n  z-index: 20;\n  position: absolute;\n  top: 0;\n  left: 0;\n  opacity: 0;\n  font-size: 13px;\n  min-width: 100%;\n  max-width: 100%;\n  padding: 2em 1em;\n  text-align: center;\n  color: rgba(0, 0, 0, 0.9);\n  line-height: 150%; }\n\n.dropzone .dz-preview .dz-details .dz-size {\n  margin-bottom: 1em;\n  font-size: 16px; }\n\n.dropzone .dz-preview .dz-details .dz-filename {\n  white-space: nowrap; }\n\n.dropzone .dz-preview .dz-details .dz-filename:hover span {\n  border: 1px solid rgba(200, 200, 200, 0.8);\n  background-color: rgba(255, 255, 255, 0.8); }\n\n.dropzone .dz-preview .dz-details .dz-filename:not(:hover) {\n  overflow: hidden;\n  text-overflow: ellipsis; }\n\n.dropzone .dz-preview .dz-details .dz-filename:not(:hover) span {\n  border: 1px solid transparent; }\n\n.dropzone .dz-preview .dz-details .dz-filename span, .dropzone .dz-preview .dz-details .dz-size span {\n  background-color: rgba(255, 255, 255, 0.4);\n  padding: 0 0.4em;\n  border-radius: 3px; }\n\n.dropzone .dz-preview:hover .dz-image img {\n  -webkit-transform: scale(1.05, 1.05);\n  -moz-transform: scale(1.05, 1.05);\n  -ms-transform: scale(1.05, 1.05);\n  -o-transform: scale(1.05, 1.05);\n  transform: scale(1.05, 1.05);\n  -webkit-filter: blur(8px);\n  filter: blur(8px); }\n\n.dropzone .dz-preview .dz-image {\n  border-radius: 20px;\n  overflow: hidden;\n  width: 120px;\n  height: 120px;\n  position: relative;\n  display: block;\n  z-index: 10; }\n\n.dropzone .dz-preview .dz-image img {\n  display: block; }\n\n.dropzone .dz-preview.dz-success .dz-success-mark {\n  -webkit-animation: passing-through 3s cubic-bezier(0.77, 0, 0.175, 1);\n  -moz-animation: passing-through 3s cubic-bezier(0.77, 0, 0.175, 1);\n  -ms-animation: passing-through 3s cubic-bezier(0.77, 0, 0.175, 1);\n  -o-animation: passing-through 3s cubic-bezier(0.77, 0, 0.175, 1);\n  animation: passing-through 3s cubic-bezier(0.77, 0, 0.175, 1); }\n\n.dropzone .dz-preview.dz-error .dz-error-mark {\n  opacity: 1;\n  -webkit-animation: slide-in 3s cubic-bezier(0.77, 0, 0.175, 1);\n  -moz-animation: slide-in 3s cubic-bezier(0.77, 0, 0.175, 1);\n  -ms-animation: slide-in 3s cubic-bezier(0.77, 0, 0.175, 1);\n  -o-animation: slide-in 3s cubic-bezier(0.77, 0, 0.175, 1);\n  animation: slide-in 3s cubic-bezier(0.77, 0, 0.175, 1); }\n\n.dropzone .dz-preview .dz-success-mark, .dropzone .dz-preview .dz-error-mark {\n  pointer-events: none;\n  opacity: 0;\n  z-index: 500;\n  position: absolute;\n  display: block;\n  top: 50%;\n  left: 50%;\n  margin-left: -27px;\n  margin-top: -27px; }\n\n.dropzone .dz-preview .dz-success-mark svg, .dropzone .dz-preview .dz-error-mark svg {\n  display: block;\n  width: 54px;\n  height: 54px; }\n\n.dropzone .dz-preview.dz-processing .dz-progress {\n  opacity: 1;\n  -webkit-transition: all 0.2s linear;\n  -moz-transition: all 0.2s linear;\n  -ms-transition: all 0.2s linear;\n  -o-transition: all 0.2s linear;\n  transition: all 0.2s linear; }\n\n.dropzone .dz-preview.dz-complete .dz-progress {\n  opacity: 0;\n  -webkit-transition: opacity 0.4s ease-in;\n  -moz-transition: opacity 0.4s ease-in;\n  -ms-transition: opacity 0.4s ease-in;\n  -o-transition: opacity 0.4s ease-in;\n  transition: opacity 0.4s ease-in; }\n\n.dropzone .dz-preview:not(.dz-processing) .dz-progress {\n  -webkit-animation: pulse 6s ease infinite;\n  -moz-animation: pulse 6s ease infinite;\n  -ms-animation: pulse 6s ease infinite;\n  -o-animation: pulse 6s ease infinite;\n  animation: pulse 6s ease infinite; }\n\n.dropzone .dz-preview .dz-progress {\n  opacity: 1;\n  z-index: 1000;\n  pointer-events: none;\n  position: absolute;\n  height: 16px;\n  left: 50%;\n  top: 50%;\n  margin-top: -8px;\n  width: 80px;\n  margin-left: -40px;\n  background: rgba(255, 255, 255, 0.9);\n  -webkit-transform: scale(1);\n  border-radius: 8px;\n  overflow: hidden; }\n\n.dropzone .dz-preview .dz-progress .dz-upload {\n  background: #333;\n  background: linear-gradient(to bottom, #666, #444);\n  position: absolute;\n  top: 0;\n  left: 0;\n  bottom: 0;\n  width: 0;\n  -webkit-transition: width 300ms ease-in-out;\n  -moz-transition: width 300ms ease-in-out;\n  -ms-transition: width 300ms ease-in-out;\n  -o-transition: width 300ms ease-in-out;\n  transition: width 300ms ease-in-out; }\n\n.dropzone .dz-preview.dz-error .dz-error-message {\n  display: block; }\n\n.dropzone .dz-preview.dz-error:hover .dz-error-message {\n  opacity: 1;\n  pointer-events: auto; }\n\n.dropzone .dz-preview .dz-error-message {\n  pointer-events: none;\n  z-index: 1000;\n  position: absolute;\n  display: block;\n  display: none;\n  opacity: 0;\n  -webkit-transition: opacity 0.3s ease;\n  -moz-transition: opacity 0.3s ease;\n  -ms-transition: opacity 0.3s ease;\n  -o-transition: opacity 0.3s ease;\n  transition: opacity 0.3s ease;\n  border-radius: 8px;\n  font-size: 13px;\n  top: 130px;\n  left: -10px;\n  width: 140px;\n  background: #be2626;\n  background: linear-gradient(to bottom, #be2626, #a92222);\n  padding: 0.5em 1.2em;\n  color: white; }\n\n.dropzone .dz-preview .dz-error-message:after {\n  content: '';\n  position: absolute;\n  top: -6px;\n  left: 64px;\n  width: 0;\n  height: 0;\n  border-left: 6px solid transparent;\n  border-right: 6px solid transparent;\n  border-bottom: 6px solid #be2626; }\n\n.select2-container {\n  box-sizing: border-box;\n  display: inline-block;\n  margin: 0;\n  position: relative;\n  vertical-align: middle; }\n  .select2-container .select2-selection--single {\n    box-sizing: border-box;\n    cursor: pointer;\n    display: block;\n    height: 28px;\n    user-select: none;\n    -webkit-user-select: none; }\n    .select2-container .select2-selection--single .select2-selection__rendered {\n      display: block;\n      padding-left: 8px;\n      padding-right: 20px;\n      overflow: hidden;\n      text-overflow: ellipsis;\n      white-space: nowrap; }\n    .select2-container .select2-selection--single .select2-selection__clear {\n      position: relative; }\n  .select2-container[dir=\"rtl\"] .select2-selection--single .select2-selection__rendered {\n    padding-right: 8px;\n    padding-left: 20px; }\n  .select2-container .select2-selection--multiple {\n    box-sizing: border-box;\n    cursor: pointer;\n    display: block;\n    min-height: 32px;\n    user-select: none;\n    -webkit-user-select: none; }\n    .select2-container .select2-selection--multiple .select2-selection__rendered {\n      display: inline-block;\n      overflow: hidden;\n      padding-left: 8px;\n      text-overflow: ellipsis;\n      white-space: nowrap; }\n  .select2-container .select2-search--inline {\n    float: left; }\n    .select2-container .select2-search--inline .select2-search__field {\n      box-sizing: border-box;\n      border: none;\n      font-size: 100%;\n      margin-top: 5px;\n      padding: 0; }\n      .select2-container .select2-search--inline .select2-search__field::-webkit-search-cancel-button {\n        -webkit-appearance: none; }\n\n.select2-dropdown {\n  background-color: white;\n  border: 1px solid #aaa;\n  border-radius: 4px;\n  box-sizing: border-box;\n  display: block;\n  position: absolute;\n  left: -100000px;\n  width: 100%;\n  z-index: 1051; }\n\n.select2-results {\n  display: block; }\n\n.select2-results__options {\n  list-style: none;\n  margin: 0;\n  padding: 0; }\n\n.select2-results__option {\n  padding: 6px;\n  user-select: none;\n  -webkit-user-select: none; }\n  .select2-results__option[aria-selected] {\n    cursor: pointer; }\n\n.select2-container--open .select2-dropdown {\n  left: 0; }\n\n.select2-container--open .select2-dropdown--above {\n  border-bottom: none;\n  border-bottom-left-radius: 0;\n  border-bottom-right-radius: 0; }\n\n.select2-container--open .select2-dropdown--below {\n  border-top: none;\n  border-top-left-radius: 0;\n  border-top-right-radius: 0; }\n\n.select2-search--dropdown {\n  display: block;\n  padding: 4px; }\n  .select2-search--dropdown .select2-search__field {\n    padding: 4px;\n    width: 100%;\n    box-sizing: border-box; }\n    .select2-search--dropdown .select2-search__field::-webkit-search-cancel-button {\n      -webkit-appearance: none; }\n  .select2-search--dropdown.select2-search--hide {\n    display: none; }\n\n.select2-close-mask {\n  border: 0;\n  margin: 0;\n  padding: 0;\n  display: block;\n  position: fixed;\n  left: 0;\n  top: 0;\n  min-height: 100%;\n  min-width: 100%;\n  height: auto;\n  width: auto;\n  opacity: 0;\n  z-index: 99;\n  background-color: #fff;\n  filter: alpha(opacity=0); }\n\n.select2-hidden-accessible {\n  border: 0 !important;\n  clip: rect(0 0 0 0) !important;\n  height: 1px !important;\n  margin: -1px !important;\n  overflow: hidden !important;\n  padding: 0 !important;\n  position: absolute !important;\n  width: 1px !important; }\n\n.select2-container--default .select2-selection--single {\n  background-color: #fff;\n  border: 1px solid #aaa;\n  border-radius: 4px; }\n  .select2-container--default .select2-selection--single .select2-selection__rendered {\n    color: #444;\n    line-height: 28px; }\n  .select2-container--default .select2-selection--single .select2-selection__clear {\n    cursor: pointer;\n    float: right;\n    font-weight: bold; }\n  .select2-container--default .select2-selection--single .select2-selection__placeholder {\n    color: #999; }\n  .select2-container--default .select2-selection--single .select2-selection__arrow {\n    height: 26px;\n    position: absolute;\n    top: 1px;\n    right: 1px;\n    width: 20px; }\n    .select2-container--default .select2-selection--single .select2-selection__arrow b {\n      border-color: #888 transparent transparent transparent;\n      border-style: solid;\n      border-width: 5px 4px 0 4px;\n      height: 0;\n      left: 50%;\n      margin-left: -4px;\n      margin-top: -2px;\n      position: absolute;\n      top: 50%;\n      width: 0; }\n\n.select2-container--default[dir=\"rtl\"] .select2-selection--single .select2-selection__clear {\n  float: left; }\n\n.select2-container--default[dir=\"rtl\"] .select2-selection--single .select2-selection__arrow {\n  left: 1px;\n  right: auto; }\n\n.select2-container--default.select2-container--disabled .select2-selection--single {\n  background-color: #eee;\n  cursor: default; }\n  .select2-container--default.select2-container--disabled .select2-selection--single .select2-selection__clear {\n    display: none; }\n\n.select2-container--default.select2-container--open .select2-selection--single .select2-selection__arrow b {\n  border-color: transparent transparent #888 transparent;\n  border-width: 0 4px 5px 4px; }\n\n.select2-container--default .select2-selection--multiple {\n  background-color: white;\n  border: 1px solid #aaa;\n  border-radius: 4px;\n  cursor: text; }\n  .select2-container--default .select2-selection--multiple .select2-selection__rendered {\n    box-sizing: border-box;\n    list-style: none;\n    margin: 0;\n    padding: 0 5px;\n    width: 100%; }\n    .select2-container--default .select2-selection--multiple .select2-selection__rendered li {\n      list-style: none; }\n  .select2-container--default .select2-selection--multiple .select2-selection__placeholder {\n    color: #999;\n    margin-top: 5px;\n    float: left; }\n  .select2-container--default .select2-selection--multiple .select2-selection__clear {\n    cursor: pointer;\n    float: right;\n    font-weight: bold;\n    margin-top: 5px;\n    margin-right: 10px; }\n  .select2-container--default .select2-selection--multiple .select2-selection__choice {\n    background-color: #e4e4e4;\n    border: 1px solid #aaa;\n    border-radius: 4px;\n    cursor: default;\n    float: left;\n    margin-right: 5px;\n    margin-top: 5px;\n    padding: 0 5px; }\n  .select2-container--default .select2-selection--multiple .select2-selection__choice__remove {\n    color: #999;\n    cursor: pointer;\n    display: inline-block;\n    font-weight: bold;\n    margin-right: 2px; }\n    .select2-container--default .select2-selection--multiple .select2-selection__choice__remove:hover {\n      color: #333; }\n\n.select2-container--default[dir=\"rtl\"] .select2-selection--multiple .select2-selection__choice, .select2-container--default[dir=\"rtl\"] .select2-selection--multiple .select2-selection__placeholder, .select2-container--default[dir=\"rtl\"] .select2-selection--multiple .select2-search--inline {\n  float: right; }\n\n.select2-container--default[dir=\"rtl\"] .select2-selection--multiple .select2-selection__choice {\n  margin-left: 5px;\n  margin-right: auto; }\n\n.select2-container--default[dir=\"rtl\"] .select2-selection--multiple .select2-selection__choice__remove {\n  margin-left: 2px;\n  margin-right: auto; }\n\n.select2-container--default.select2-container--focus .select2-selection--multiple {\n  border: solid black 1px;\n  outline: 0; }\n\n.select2-container--default.select2-container--disabled .select2-selection--multiple {\n  background-color: #eee;\n  cursor: default; }\n\n.select2-container--default.select2-container--disabled .select2-selection__choice__remove {\n  display: none; }\n\n.select2-container--default.select2-container--open.select2-container--above .select2-selection--single, .select2-container--default.select2-container--open.select2-container--above .select2-selection--multiple {\n  border-top-left-radius: 0;\n  border-top-right-radius: 0; }\n\n.select2-container--default.select2-container--open.select2-container--below .select2-selection--single, .select2-container--default.select2-container--open.select2-container--below .select2-selection--multiple {\n  border-bottom-left-radius: 0;\n  border-bottom-right-radius: 0; }\n\n.select2-container--default .select2-search--dropdown .select2-search__field {\n  border: 1px solid #aaa; }\n\n.select2-container--default .select2-search--inline .select2-search__field {\n  background: transparent;\n  border: none;\n  outline: 0;\n  box-shadow: none;\n  -webkit-appearance: textfield; }\n\n.select2-container--default .select2-results > .select2-results__options {\n  max-height: 200px;\n  overflow-y: auto; }\n\n.select2-container--default .select2-results__option[role=group] {\n  padding: 0; }\n\n.select2-container--default .select2-results__option[aria-disabled=true] {\n  color: #999; }\n\n.select2-container--default .select2-results__option[aria-selected=true] {\n  background-color: #ddd; }\n\n.select2-container--default .select2-results__option .select2-results__option {\n  padding-left: 1em; }\n  .select2-container--default .select2-results__option .select2-results__option .select2-results__group {\n    padding-left: 0; }\n  .select2-container--default .select2-results__option .select2-results__option .select2-results__option {\n    margin-left: -1em;\n    padding-left: 2em; }\n    .select2-container--default .select2-results__option .select2-results__option .select2-results__option .select2-results__option {\n      margin-left: -2em;\n      padding-left: 3em; }\n      .select2-container--default .select2-results__option .select2-results__option .select2-results__option .select2-results__option .select2-results__option {\n        margin-left: -3em;\n        padding-left: 4em; }\n        .select2-container--default .select2-results__option .select2-results__option .select2-results__option .select2-results__option .select2-results__option .select2-results__option {\n          margin-left: -4em;\n          padding-left: 5em; }\n          .select2-container--default .select2-results__option .select2-results__option .select2-results__option .select2-results__option .select2-results__option .select2-results__option .select2-results__option {\n            margin-left: -5em;\n            padding-left: 6em; }\n\n.select2-container--default .select2-results__option--highlighted[aria-selected] {\n  background-color: #5897fb;\n  color: white; }\n\n.select2-container--default .select2-results__group {\n  cursor: default;\n  display: block;\n  padding: 6px; }\n\n.select2-container--classic .select2-selection--single {\n  background-color: #f7f7f7;\n  border: 1px solid #aaa;\n  border-radius: 0.25rem;\n  outline: 0;\n  background-image: -webkit-linear-gradient(top, white 50%, #eeeeee 100%);\n  background-image: -o-linear-gradient(top, white 50%, #eeeeee 100%);\n  background-image: linear-gradient(to bottom, white 50%, #eeeeee 100%);\n  background-repeat: repeat-x;\n  filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#FFFFFFFF', endColorstr='#FFEEEEEE', GradientType=0); }\n  .select2-container--classic .select2-selection--single:focus {\n    border: 1px solid #5897fb; }\n  .select2-container--classic .select2-selection--single .select2-selection__rendered {\n    color: #444;\n    line-height: 28px; }\n  .select2-container--classic .select2-selection--single .select2-selection__clear {\n    cursor: pointer;\n    float: right;\n    font-weight: bold;\n    margin-right: 10px; }\n  .select2-container--classic .select2-selection--single .select2-selection__placeholder {\n    color: #999; }\n  .select2-container--classic .select2-selection--single .select2-selection__arrow {\n    background-color: #ddd;\n    border: none;\n    border-left: 1px solid #aaa;\n    border-top-right-radius: 0.25rem;\n    border-bottom-right-radius: 0.25rem;\n    height: 26px;\n    position: absolute;\n    top: 1px;\n    right: 1px;\n    width: 20px;\n    background-image: -webkit-linear-gradient(top, #eeeeee 50%, #cccccc 100%);\n    background-image: -o-linear-gradient(top, #eeeeee 50%, #cccccc 100%);\n    background-image: linear-gradient(to bottom, #eeeeee 50%, #cccccc 100%);\n    background-repeat: repeat-x;\n    filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#FFEEEEEE', endColorstr='#FFCCCCCC', GradientType=0); }\n    .select2-container--classic .select2-selection--single .select2-selection__arrow b {\n      border-color: #888 transparent transparent transparent;\n      border-style: solid;\n      border-width: 5px 4px 0 4px;\n      height: 0;\n      left: 50%;\n      margin-left: -4px;\n      margin-top: -2px;\n      position: absolute;\n      top: 50%;\n      width: 0; }\n\n.select2-container--classic[dir=\"rtl\"] .select2-selection--single .select2-selection__clear {\n  float: left; }\n\n.select2-container--classic[dir=\"rtl\"] .select2-selection--single .select2-selection__arrow {\n  border: none;\n  border-right: 1px solid #aaa;\n  border-radius: 0;\n  border-top-left-radius: 0.25rem;\n  border-bottom-left-radius: 0.25rem;\n  left: 1px;\n  right: auto; }\n\n.select2-container--classic.select2-container--open .select2-selection--single {\n  border: 1px solid #5897fb; }\n  .select2-container--classic.select2-container--open .select2-selection--single .select2-selection__arrow {\n    background: transparent;\n    border: none; }\n    .select2-container--classic.select2-container--open .select2-selection--single .select2-selection__arrow b {\n      border-color: transparent transparent #888 transparent;\n      border-width: 0 4px 5px 4px; }\n\n.select2-container--classic.select2-container--open.select2-container--above .select2-selection--single {\n  border-top: none;\n  border-top-left-radius: 0;\n  border-top-right-radius: 0;\n  background-image: -webkit-linear-gradient(top, white 0%, #eeeeee 50%);\n  background-image: -o-linear-gradient(top, white 0%, #eeeeee 50%);\n  background-image: linear-gradient(to bottom, white 0%, #eeeeee 50%);\n  background-repeat: repeat-x;\n  filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#FFFFFFFF', endColorstr='#FFEEEEEE', GradientType=0); }\n\n.select2-container--classic.select2-container--open.select2-container--below .select2-selection--single {\n  border-bottom: none;\n  border-bottom-left-radius: 0;\n  border-bottom-right-radius: 0;\n  background-image: -webkit-linear-gradient(top, #eeeeee 50%, white 100%);\n  background-image: -o-linear-gradient(top, #eeeeee 50%, white 100%);\n  background-image: linear-gradient(to bottom, #eeeeee 50%, white 100%);\n  background-repeat: repeat-x;\n  filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#FFEEEEEE', endColorstr='#FFFFFFFF', GradientType=0); }\n\n.select2-container--classic .select2-selection--multiple {\n  background-color: white;\n  border: 1px solid #aaa;\n  border-radius: 0.25rem;\n  cursor: text;\n  outline: 0; }\n  .select2-container--classic .select2-selection--multiple:focus {\n    border: 1px solid #5897fb; }\n  .select2-container--classic .select2-selection--multiple .select2-selection__rendered {\n    list-style: none;\n    margin: 0;\n    padding: 0 5px; }\n  .select2-container--classic .select2-selection--multiple .select2-selection__clear {\n    display: none; }\n  .select2-container--classic .select2-selection--multiple .select2-selection__choice {\n    background-color: #e4e4e4;\n    border: 1px solid #aaa;\n    border-radius: 0.25rem;\n    cursor: default;\n    float: left;\n    margin-right: 5px;\n    margin-top: 5px;\n    padding: 0 5px; }\n  .select2-container--classic .select2-selection--multiple .select2-selection__choice__remove {\n    color: #888;\n    cursor: pointer;\n    display: inline-block;\n    font-weight: bold;\n    margin-right: 2px; }\n    .select2-container--classic .select2-selection--multiple .select2-selection__choice__remove:hover {\n      color: #555; }\n\n.select2-container--classic[dir=\"rtl\"] .select2-selection--multiple .select2-selection__choice {\n  float: right; }\n\n.select2-container--classic[dir=\"rtl\"] .select2-selection--multiple .select2-selection__choice {\n  margin-left: 5px;\n  margin-right: auto; }\n\n.select2-container--classic[dir=\"rtl\"] .select2-selection--multiple .select2-selection__choice__remove {\n  margin-left: 2px;\n  margin-right: auto; }\n\n.select2-container--classic.select2-container--open .select2-selection--multiple {\n  border: 1px solid #5897fb; }\n\n.select2-container--classic.select2-container--open.select2-container--above .select2-selection--multiple {\n  border-top: none;\n  border-top-left-radius: 0;\n  border-top-right-radius: 0; }\n\n.select2-container--classic.select2-container--open.select2-container--below .select2-selection--multiple {\n  border-bottom: none;\n  border-bottom-left-radius: 0;\n  border-bottom-right-radius: 0; }\n\n.select2-container--classic .select2-search--dropdown .select2-search__field {\n  border: 1px solid #aaa;\n  outline: 0; }\n\n.select2-container--classic .select2-search--inline .select2-search__field {\n  outline: 0;\n  box-shadow: none; }\n\n.select2-container--classic .select2-dropdown {\n  background-color: white;\n  border: 1px solid transparent; }\n\n.select2-container--classic .select2-dropdown--above {\n  border-bottom: none; }\n\n.select2-container--classic .select2-dropdown--below {\n  border-top: none; }\n\n.select2-container--classic .select2-results > .select2-results__options {\n  max-height: 200px;\n  overflow-y: auto; }\n\n.select2-container--classic .select2-results__option[role=group] {\n  padding: 0; }\n\n.select2-container--classic .select2-results__option[aria-disabled=true] {\n  color: grey; }\n\n.select2-container--classic .select2-results__option--highlighted[aria-selected] {\n  background-color: #3875d7;\n  color: white; }\n\n.select2-container--classic .select2-results__group {\n  cursor: default;\n  display: block;\n  padding: 6px; }\n\n.select2-container--classic.select2-container--open .select2-dropdown {\n  border-color: #5897fb; }\n\n/*! Select2 Bootstrap Theme v0.1.0-beta.9 | MIT License | github.com/select2/select2-bootstrap-theme */\n.select2-container--bootstrap {\n  display: block;\n  /*------------------------------------*      #COMMON STYLES\n  \\*------------------------------------*/\n  /**\n   * Search field in the Select2 dropdown.\n   */\n  /**\n   * No outline for all search fields - in the dropdown\n   * and inline in multi Select2s.\n   */\n  /**\n   * Adjust Select2's choices hover and selected styles to match\n   * Bootstrap 3's default dropdown styles.\n   *\n   * @see http://getbootstrap.com/components/#dropdowns\n   */\n  /**\n   * Clear the selection.\n   */\n  /**\n   * Address disabled Select2 styles.\n   *\n   * @see https://select2.github.io/examples.html#disabled\n   * @see http://getbootstrap.com/css/#forms-control-disabled\n   */\n  /*------------------------------------*      #DROPDOWN\n  \\*------------------------------------*/\n  /**\n   * Dropdown border color and box-shadow.\n   */\n  /**\n   * Limit the dropdown height.\n   */\n  /*------------------------------------*      #SINGLE SELECT2\n  \\*------------------------------------*/\n  /*------------------------------------*    #MULTIPLE SELECT2\n  \\*------------------------------------*/\n  /**\n   * Address Bootstrap control sizing classes\n   *\n   * 1. Reset Bootstrap defaults.\n   * 2. Adjust the dropdown arrow button icon position.\n   *\n   * @see http://getbootstrap.com/css/#forms-control-sizes\n   */\n  /* 1 */\n  /*------------------------------------*    #RTL SUPPORT\n  \\*------------------------------------*/ }\n  .select2-container--bootstrap .select2-selection {\n    box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);\n    background-color: #fff;\n    border: 1px solid rgba(0, 0, 0, 0.15);\n    border-radius: 0.25rem;\n    color: #555555;\n    font-size: 1rem;\n    outline: 0; }\n    .select2-container--bootstrap .select2-selection.form-control {\n      border-radius: 0.25rem; }\n  .select2-container--bootstrap .select2-search--dropdown .select2-search__field {\n    box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);\n    background-color: #fff;\n    border: 1px solid rgba(0, 0, 0, 0.15);\n    border-radius: 0.25rem;\n    color: #555555;\n    font-size: 1rem; }\n  .select2-container--bootstrap .select2-search__field {\n    outline: 0;\n    /* Firefox 18- */\n    /**\n     * Firefox 19+\n     *\n     * @see http://stackoverflow.com/questions/24236240/color-for-styled-placeholder-text-is-muted-in-firefox\n     */ }\n    .select2-container--bootstrap .select2-search__field::-webkit-input-placeholder {\n      color: #999999; }\n    .select2-container--bootstrap .select2-search__field:-moz-placeholder {\n      color: #999999; }\n    .select2-container--bootstrap .select2-search__field::-moz-placeholder {\n      color: #999999;\n      opacity: 1; }\n    .select2-container--bootstrap .select2-search__field:-ms-input-placeholder {\n      color: #999999; }\n  .select2-container--bootstrap .select2-results__option {\n    padding: 6px 12px;\n    /**\n     * Disabled results.\n     *\n     * @see https://select2.github.io/examples.html#disabled-results\n     */\n    /**\n     * Hover state.\n     */\n    /**\n     * Selected state.\n     */ }\n    .select2-container--bootstrap .select2-results__option[role=group] {\n      padding: 0; }\n    .select2-container--bootstrap .select2-results__option[aria-disabled=true] {\n      color: #999999;\n      cursor: not-allowed; }\n    .select2-container--bootstrap .select2-results__option[aria-selected=true] {\n      background-color: #f7f7f9;\n      color: #272727; }\n    .select2-container--bootstrap .select2-results__option--highlighted[aria-selected] {\n      background-color: #5d8fc2;\n      color: #fff; }\n    .select2-container--bootstrap .select2-results__option .select2-results__option {\n      padding: 6px 12px; }\n      .select2-container--bootstrap .select2-results__option .select2-results__option .select2-results__group {\n        padding-left: 0; }\n      .select2-container--bootstrap .select2-results__option .select2-results__option .select2-results__option {\n        margin-left: -12px;\n        padding-left: 24px; }\n        .select2-container--bootstrap .select2-results__option .select2-results__option .select2-results__option .select2-results__option {\n          margin-left: -24px;\n          padding-left: 36px; }\n          .select2-container--bootstrap .select2-results__option .select2-results__option .select2-results__option .select2-results__option .select2-results__option {\n            margin-left: -36px;\n            padding-left: 48px; }\n            .select2-container--bootstrap .select2-results__option .select2-results__option .select2-results__option .select2-results__option .select2-results__option .select2-results__option {\n              margin-left: -48px;\n              padding-left: 60px; }\n              .select2-container--bootstrap .select2-results__option .select2-results__option .select2-results__option .select2-results__option .select2-results__option .select2-results__option .select2-results__option {\n                margin-left: -60px;\n                padding-left: 72px; }\n  .select2-container--bootstrap .select2-results__group {\n    color: #999999;\n    display: block;\n    padding: 6px 12px;\n    font-size: 0.875rem;\n    line-height: 1.5;\n    white-space: nowrap; }\n  .select2-container--bootstrap.select2-container--focus .select2-selection, .select2-container--bootstrap.select2-container--open .select2-selection {\n    box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 8px rgba(77, 144, 254, 0.6);\n    transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s;\n    border-color: #4D90FE; }\n  .select2-container--bootstrap.select2-container--open {\n    /**\n     * Make the dropdown arrow point up while the dropdown is visible.\n     */\n    /**\n     * Handle border radii of the container when the dropdown is showing.\n     */ }\n    .select2-container--bootstrap.select2-container--open .select2-selection .select2-selection__arrow b {\n      border-color: transparent transparent #999999 transparent;\n      border-width: 0 4px 4px 4px; }\n    .select2-container--bootstrap.select2-container--open.select2-container--below .select2-selection {\n      border-bottom-right-radius: 0;\n      border-bottom-left-radius: 0;\n      border-bottom-color: transparent; }\n    .select2-container--bootstrap.select2-container--open.select2-container--above .select2-selection {\n      border-top-right-radius: 0;\n      border-top-left-radius: 0;\n      border-top-color: transparent; }\n  .select2-container--bootstrap .select2-selection__clear {\n    color: #999999;\n    cursor: pointer;\n    float: right;\n    font-weight: bold;\n    margin-right: 10px; }\n    .select2-container--bootstrap .select2-selection__clear:hover {\n      color: #f8f8f8; }\n  .select2-container--bootstrap.select2-container--disabled .select2-selection {\n    border-color: rgba(0, 0, 0, 0.15);\n    box-shadow: none; }\n  .select2-container--bootstrap.select2-container--disabled .select2-selection,\n  .select2-container--bootstrap.select2-container--disabled .select2-search__field {\n    cursor: not-allowed; }\n  .select2-container--bootstrap.select2-container--disabled .select2-selection,\n  .select2-container--bootstrap.select2-container--disabled .select2-selection--multiple .select2-selection__choice {\n    background-color: #eeeeee; }\n  .select2-container--bootstrap.select2-container--disabled .select2-selection__clear,\n  .select2-container--bootstrap.select2-container--disabled .select2-selection--multiple .select2-selection__choice__remove {\n    display: none; }\n  .select2-container--bootstrap .select2-dropdown {\n    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.175);\n    border-color: #4D90FE;\n    overflow-x: hidden;\n    margin-top: -1px; }\n    .select2-container--bootstrap .select2-dropdown--above {\n      box-shadow: 0px -6px 12px rgba(0, 0, 0, 0.175);\n      margin-top: 1px; }\n  .select2-container--bootstrap .select2-results > .select2-results__options {\n    max-height: 200px;\n    overflow-y: auto; }\n  .select2-container--bootstrap .select2-selection--single {\n    height: 35px;\n    line-height: 1.5;\n    padding: 6px 24px 6px 12px;\n    /**\n     * Adjust the single Select2's dropdown arrow button appearance.\n     */ }\n    .select2-container--bootstrap .select2-selection--single .select2-selection__arrow {\n      position: absolute;\n      bottom: 0;\n      right: 12px;\n      top: 0;\n      width: 4px; }\n      .select2-container--bootstrap .select2-selection--single .select2-selection__arrow b {\n        border-color: #999999 transparent transparent transparent;\n        border-style: solid;\n        border-width: 4px 4px 0 4px;\n        height: 0;\n        left: 0;\n        margin-left: -4px;\n        margin-top: -2px;\n        position: absolute;\n        top: 50%;\n        width: 0; }\n    .select2-container--bootstrap .select2-selection--single .select2-selection__rendered {\n      color: #555555;\n      padding: 0; }\n    .select2-container--bootstrap .select2-selection--single .select2-selection__placeholder {\n      color: #999999; }\n  .select2-container--bootstrap .select2-selection--multiple {\n    min-height: 35px;\n    padding: 0;\n    height: auto;\n    /**\n     * Make Multi Select2's choices match Bootstrap 3's default button styles.\n     */\n    /**\n     * Minus 2px borders.\n     */\n    /**\n     * Clear the selection.\n     */ }\n    .select2-container--bootstrap .select2-selection--multiple .select2-selection__rendered {\n      box-sizing: border-box;\n      display: block;\n      line-height: 1.5;\n      list-style: none;\n      margin: 0;\n      overflow: hidden;\n      padding: 0;\n      width: 100%;\n      text-overflow: ellipsis;\n      white-space: nowrap; }\n    .select2-container--bootstrap .select2-selection--multiple .select2-selection__placeholder {\n      color: #999999;\n      float: left;\n      margin-top: 5px; }\n    .select2-container--bootstrap .select2-selection--multiple .select2-selection__choice {\n      color: #555555;\n      background: #f8f8f8;\n      border: 1px solid transparent;\n      border-radius: 0.25rem;\n      cursor: default;\n      float: left;\n      margin: 5px 0 0 6px;\n      padding: 0 6px; }\n    .select2-container--bootstrap .select2-selection--multiple .select2-search--inline .select2-search__field {\n      background: transparent;\n      padding: 0 12px;\n      height: 33px;\n      line-height: 1.5;\n      margin-top: 0;\n      min-width: 5em; }\n    .select2-container--bootstrap .select2-selection--multiple .select2-selection__choice__remove {\n      color: #999999;\n      cursor: pointer;\n      display: inline-block;\n      font-weight: bold;\n      margin-right: 3px; }\n      .select2-container--bootstrap .select2-selection--multiple .select2-selection__choice__remove:hover {\n        color: #f8f8f8; }\n    .select2-container--bootstrap .select2-selection--multiple .select2-selection__clear {\n      margin-top: 6px; }\n  .select2-container--bootstrap .select2-selection--single.input-sm,\n  .input-group-sm .select2-container--bootstrap .select2-selection--single,\n  .form-group-sm .select2-container--bootstrap .select2-selection--single {\n    border-radius: 0.2rem;\n    font-size: 0.875rem;\n    height: 1.8125rem;\n    line-height: 1.5;\n    padding: 5px 22px 5px 10px;\n    /* 2 */ }\n    .select2-container--bootstrap .select2-selection--single.input-sm .select2-selection__arrow b,\n    .input-group-sm .select2-container--bootstrap .select2-selection--single .select2-selection__arrow b,\n    .form-group-sm .select2-container--bootstrap .select2-selection--single .select2-selection__arrow b {\n      margin-left: -5px; }\n  .select2-container--bootstrap .select2-selection--multiple.input-sm,\n  .input-group-sm .select2-container--bootstrap .select2-selection--multiple,\n  .form-group-sm .select2-container--bootstrap .select2-selection--multiple {\n    min-height: 1.8125rem;\n    border-radius: 0.2rem; }\n    .select2-container--bootstrap .select2-selection--multiple.input-sm .select2-selection__choice,\n    .input-group-sm .select2-container--bootstrap .select2-selection--multiple .select2-selection__choice,\n    .form-group-sm .select2-container--bootstrap .select2-selection--multiple .select2-selection__choice {\n      font-size: 0.875rem;\n      line-height: 1.5;\n      margin: 4px 0 0 5px;\n      padding: 0 5px; }\n    .select2-container--bootstrap .select2-selection--multiple.input-sm .select2-search--inline .select2-search__field,\n    .input-group-sm .select2-container--bootstrap .select2-selection--multiple .select2-search--inline .select2-search__field,\n    .form-group-sm .select2-container--bootstrap .select2-selection--multiple .select2-search--inline .select2-search__field {\n      padding: 0 10px;\n      font-size: 0.875rem;\n      height: -0.1875rem;\n      line-height: 1.5; }\n    .select2-container--bootstrap .select2-selection--multiple.input-sm .select2-selection__clear,\n    .input-group-sm .select2-container--bootstrap .select2-selection--multiple .select2-selection__clear,\n    .form-group-sm .select2-container--bootstrap .select2-selection--multiple .select2-selection__clear {\n      margin-top: 5px; }\n  .select2-container--bootstrap .select2-selection--single.input-lg,\n  .input-group-lg .select2-container--bootstrap .select2-selection--single,\n  .form-group-lg .select2-container--bootstrap .select2-selection--single {\n    border-radius: 0.3rem;\n    font-size: 1.25rem;\n    height: 3.16667rem;\n    line-height: 1.33333;\n    padding: 10px 28px 10px 16px;\n    /* 1 */ }\n    .select2-container--bootstrap .select2-selection--single.input-lg .select2-selection__arrow,\n    .input-group-lg .select2-container--bootstrap .select2-selection--single .select2-selection__arrow,\n    .form-group-lg .select2-container--bootstrap .select2-selection--single .select2-selection__arrow {\n      width: 4px; }\n      .select2-container--bootstrap .select2-selection--single.input-lg .select2-selection__arrow b,\n      .input-group-lg .select2-container--bootstrap .select2-selection--single .select2-selection__arrow b,\n      .form-group-lg .select2-container--bootstrap .select2-selection--single .select2-selection__arrow b {\n        border-width: 4px 4px 0 4px;\n        margin-left: -4px;\n        margin-left: -10px;\n        margin-top: -2px; }\n  .select2-container--bootstrap .select2-selection--multiple.input-lg,\n  .input-group-lg .select2-container--bootstrap .select2-selection--multiple,\n  .form-group-lg .select2-container--bootstrap .select2-selection--multiple {\n    min-height: 3.16667rem;\n    border-radius: 0.3rem; }\n    .select2-container--bootstrap .select2-selection--multiple.input-lg .select2-selection__choice,\n    .input-group-lg .select2-container--bootstrap .select2-selection--multiple .select2-selection__choice,\n    .form-group-lg .select2-container--bootstrap .select2-selection--multiple .select2-selection__choice {\n      font-size: 1.25rem;\n      line-height: 1.33333;\n      border-radius: 0.25rem;\n      margin: 9px 0 0 8px;\n      padding: 0 10px; }\n    .select2-container--bootstrap .select2-selection--multiple.input-lg .select2-search--inline .select2-search__field,\n    .input-group-lg .select2-container--bootstrap .select2-selection--multiple .select2-search--inline .select2-search__field,\n    .form-group-lg .select2-container--bootstrap .select2-selection--multiple .select2-search--inline .select2-search__field {\n      padding: 0 16px;\n      font-size: 1.25rem;\n      height: 1.16667rem;\n      line-height: 1.33333; }\n    .select2-container--bootstrap .select2-selection--multiple.input-lg .select2-selection__clear,\n    .input-group-lg .select2-container--bootstrap .select2-selection--multiple .select2-selection__clear,\n    .form-group-lg .select2-container--bootstrap .select2-selection--multiple .select2-selection__clear {\n      margin-top: 10px; }\n  .select2-container--bootstrap .select2-selection.input-lg.select2-container--open .select2-selection--single {\n    /**\n     * Make the dropdown arrow point up while the dropdown is visible.\n     */ }\n    .select2-container--bootstrap .select2-selection.input-lg.select2-container--open .select2-selection--single .select2-selection__arrow b {\n      border-color: transparent transparent #999999 transparent;\n      border-width: 0 4px 4px 4px; }\n  .input-group-lg .select2-container--bootstrap .select2-selection.select2-container--open .select2-selection--single {\n    /**\n     * Make the dropdown arrow point up while the dropdown is visible.\n     */ }\n    .input-group-lg .select2-container--bootstrap .select2-selection.select2-container--open .select2-selection--single .select2-selection__arrow b {\n      border-color: transparent transparent #999999 transparent;\n      border-width: 0 4px 4px 4px; }\n  .select2-container--bootstrap[dir=\"rtl\"] {\n    /**\n     * Single Select2\n     *\n     * 1. Makes sure that .select2-selection__placeholder is positioned\n     *    correctly.\n     */\n    /**\n     * Multiple Select2\n     */ }\n    .select2-container--bootstrap[dir=\"rtl\"] .select2-selection--single {\n      padding-left: 24px;\n      padding-right: 12px; }\n      .select2-container--bootstrap[dir=\"rtl\"] .select2-selection--single .select2-selection__rendered {\n        padding-right: 0;\n        padding-left: 0;\n        text-align: right;\n        /* 1 */ }\n      .select2-container--bootstrap[dir=\"rtl\"] .select2-selection--single .select2-selection__clear {\n        float: left; }\n      .select2-container--bootstrap[dir=\"rtl\"] .select2-selection--single .select2-selection__arrow {\n        left: 12px;\n        right: auto; }\n        .select2-container--bootstrap[dir=\"rtl\"] .select2-selection--single .select2-selection__arrow b {\n          margin-left: 0; }\n    .select2-container--bootstrap[dir=\"rtl\"] .select2-selection--multiple .select2-selection__choice,\n    .select2-container--bootstrap[dir=\"rtl\"] .select2-selection--multiple .select2-selection__placeholder {\n      float: right; }\n    .select2-container--bootstrap[dir=\"rtl\"] .select2-selection--multiple .select2-selection__choice {\n      margin-left: 0;\n      margin-right: 6px; }\n    .select2-container--bootstrap[dir=\"rtl\"] .select2-selection--multiple .select2-selection__choice__remove {\n      margin-left: 2px;\n      margin-right: auto; }\n\n/*------------------------------------*  #ADDITIONAL GOODIES\n\\*------------------------------------*/\n/**\n * Address Bootstrap's validation states\n *\n * If a Select2 widget parent has one of Bootstrap's validation state modifier\n * classes, adjust Select2's border colors and focus states accordingly.\n * You may apply said classes to the Select2 dropdown (body > .select2-container)\n * via JavaScript match Bootstraps' to make its styles match.\n *\n * @see http://getbootstrap.com/css/#forms-control-validation\n */\n.has-warning .select2-dropdown,\n.has-warning .select2-selection {\n  border-color: #8a6d3b; }\n\n.has-warning .select2-container--focus .select2-selection,\n.has-warning .select2-container--open .select2-selection {\n  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 6px #c0a16b;\n  border-color: #66512c; }\n\n.has-warning.select2-drop-active {\n  border-color: #66512c; }\n  .has-warning.select2-drop-active.select2-drop.select2-drop-above {\n    border-top-color: #66512c; }\n\n.has-error .select2-dropdown,\n.has-error .select2-selection {\n  border-color: #a94442; }\n\n.has-error .select2-container--focus .select2-selection,\n.has-error .select2-container--open .select2-selection {\n  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 6px #ce8483;\n  border-color: #843534; }\n\n.has-error.select2-drop-active {\n  border-color: #843534; }\n  .has-error.select2-drop-active.select2-drop.select2-drop-above {\n    border-top-color: #843534; }\n\n.has-success .select2-dropdown,\n.has-success .select2-selection {\n  border-color: #3c763d; }\n\n.has-success .select2-container--focus .select2-selection,\n.has-success .select2-container--open .select2-selection {\n  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 6px #67b168;\n  border-color: #2b542c; }\n\n.has-success.select2-drop-active {\n  border-color: #2b542c; }\n  .has-success.select2-drop-active.select2-drop.select2-drop-above {\n    border-top-color: #2b542c; }\n\n/**\n * Select2 widgets in Bootstrap Input Groups\n *\n * When Select2 widgets are combined with other elements using Bootstraps\n * \"Input Group\" component, we don't want specific edges of the Select2\n * container to have a border-radius.\n *\n * Use .select2-bootstrap-prepend and .select2-bootstrap-append on\n * a Bootstrap 3 .input-group to let the contained Select2 widget know which\n * edges should not be rounded as they are directly followed by another element.\n *\n * @see http://getbootstrap.com/components/#input-groups\n */\n/**\n * Mimick Bootstraps .input-group .form-control styles.\n *\n * @see https://github.com/twbs/bootstrap/blob/master/less/input-groups.less\n */\n.input-group .select2-container--bootstrap {\n  display: table;\n  table-layout: fixed;\n  position: relative;\n  z-index: 2;\n  float: left;\n  width: 100%;\n  margin-bottom: 0;\n  /**\n   * Adjust z-index like Bootstrap does to show the focus-box-shadow\n   * above appended buttons in .input-group and .form-group.\n   */ }\n  .input-group .select2-container--bootstrap.select2-container--open, .input-group .select2-container--bootstrap.select2-container--focus {\n    z-index: 3; }\n\n.input-group.select2-bootstrap-prepend .select2-container--bootstrap .select2-selection {\n  border-bottom-left-radius: 0;\n  border-top-left-radius: 0; }\n\n.input-group.select2-bootstrap-append .select2-container--bootstrap .select2-selection {\n  border-bottom-right-radius: 0;\n  border-top-right-radius: 0; }\n\n/**\n * Adjust alignment of Bootstrap buttons in Bootstrap Input Groups to address\n * Multi Select2's height which - depending on how many elements have been selected -\n * may grow taller than its initial size.\n *\n * @see http://getbootstrap.com/components/#input-groups\n */\n.select2-bootstrap-append .select2-container--bootstrap,\n.select2-bootstrap-append .input-group-btn,\n.select2-bootstrap-append .input-group-btn .btn,\n.select2-bootstrap-prepend .select2-container--bootstrap,\n.select2-bootstrap-prepend .input-group-btn,\n.select2-bootstrap-prepend .input-group-btn .btn {\n  vertical-align: top; }\n\n/**\n * Temporary fix for https://github.com/select2/select2-bootstrap-theme/issues/9\n *\n * Provides `!important` for certain properties of the class applied to the\n * original `<select>` element to hide it.\n *\n * @see https://github.com/select2/select2/pull/3301\n * @see https://github.com/fk/select2/commit/31830c7b32cb3d8e1b12d5b434dee40a6e753ada\n */\n.form-control.select2-hidden-accessible {\n  position: absolute !important;\n  width: 1px !important; }\n\n/**\n * Display override for inline forms\n */\n.form-inline .select2-container--bootstrap {\n  display: inline-block; }\n\n/**\r\n * Bootstrap Colorpicker\r\n * setting correct urls\r\n */\n.colorpicker-saturation {\n  background-image: url(\"assets/bootstrap-colorpicker/saturation.png\"); }\n\n.colorpicker-hue {\n  background-image: url(\"assets/bootstrap-colorpicker/hue.png\"); }\n\n.colorpicker-alpha,\n.colorpicker-color {\n  background-image: url(\"assets/bootstrap-colorpicker/alpha.png\"); }\n\n.colorpicker.colorpicker-horizontal .colorpicker-hue {\n  background-image: url(\"assets/bootstrap-colorpicker/hue-horizontal.png\"); }\n\n.colorpicker.colorpicker-horizontal .colorpicker-alpha {\n  background-image: url(\"assets/bootstrap-colorpicker/alpha-horizontal.png\"); }\n\n/**\r\n * Switchery.\r\n */\n.switch {\n  box-sizing: content-box; }\n\n.switch input {\n  display: none; }\n\n.switch i {\n  display: inline-block;\n  cursor: pointer;\n  padding-right: 20px;\n  transition: all ease 0.2s;\n  -webkit-transition: all ease 0.2s;\n  border-radius: 20px;\n  box-shadow: inset 0 0 1px rgba(0, 0, 0, 0.5); }\n\n.switch i:before {\n  display: block;\n  content: '';\n  width: 30px;\n  height: 30px;\n  padding: 1px;\n  border-radius: 20px;\n  background: white;\n  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.5); }\n\n.switch :checked + i {\n  padding-right: 0;\n  padding-left: 20px;\n  background: #64bd63; }\n\n/**\r\n * Jasny Bootstrap\r\n * Fileinput.less\r\n */\n.fileinput.fileinput-new .thumbnail {\n  padding: 0.25rem;\n  line-height: 1.5;\n  background-color: #fff;\n  border: 1px solid #ddd;\n  border-radius: 0.25rem;\n  transition: all .2s ease-in-out;\n  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.075); }\n\n.fileinput-preview.fileinput-exists {\n  border: 1px solid rgba(0, 0, 0, 0.15);\n  border-radius: 0.25rem;\n  padding: 5px; }\n\n.fileinput.input-group {\n  display: flex; }\n\n.fileinput-new.input-group .btn-file,\n.fileinput-new .input-group .btn-file {\n  border-radius: 0 0.25rem 0.25rem 0; }\n  .fileinput-new.input-group .btn-file.btn-xs, .fileinput-new.input-group .btn-file.btn-sm,\n  .fileinput-new .input-group .btn-file.btn-xs,\n  .fileinput-new .input-group .btn-file.btn-sm {\n    border-radius: 0 0.2rem 0.2rem 0; }\n  .fileinput-new.input-group .btn-file.btn-lg,\n  .fileinput-new .input-group .btn-file.btn-lg {\n    border-radius: 0 0.3rem 0.3rem 0; }\n\n.form-group.has-warning .fileinput .fileinput-preview {\n  color: #8a6d3b; }\n\n.form-group.has-warning .fileinput .thumbnail {\n  border-color: #fcefce; }\n\n.form-group.has-error .fileinput .fileinput-preview {\n  color: #a94442; }\n\n.form-group.has-error .fileinput .thumbnail {\n  border-color: #ffddd6; }\n\n.form-group.has-success .fileinput .fileinput-preview {\n  color: #3c763d; }\n\n.form-group.has-success .fileinput .thumbnail {\n  border-color: #d8f5d8; }\n\n.btn-label {\n  background: transparent;\n  left: 2px;\n  padding: 1px 6px; }\n\n/**\r\n * Dropzone\r\n */\n.dropzone {\n  border: 2px dashed #ccc;\n  border-radius: 0.25rem; }\n\n/**\r\n * Markdown. converted from less files\r\n */\n.md-editor {\n  display: block;\n  border: 1px solid #ddd; }\n  .md-editor > .md-header, .md-editor .md-footer {\n    display: block;\n    padding: 6px 4px;\n    background: #ddd; }\n  .md-editor > .md-header {\n    margin: 0; }\n    .md-editor > .md-header .glyphicon {\n      top: 3px; }\n  .md-editor > .md-preview {\n    margin-left: -1px;\n    margin-right: -1px;\n    padding: 6px 12px;\n    background: transparent;\n    border-top: 1px dashed #ddd;\n    min-height: 10px; }\n  .md-editor > textarea {\n    font-family: Menlo, Monaco, Consolas, \"Liberation Mono\", \"Courier New\", monospace;\n    font-size: 1rem;\n    outline: 0;\n    outline: thin dotted  \\9;\n    /* IE6-9 */\n    margin: 0;\n    display: block;\n    width: 100%;\n    border: 0;\n    border-top: 1px dashed #ddd;\n    border-radius: 0;\n    box-shadow: none;\n    background: #eeeeee; }\n    .md-editor > textarea:focus {\n      box-shadow: none;\n      background: #fff; }\n  .md-editor.active {\n    border-color: #4D90FE;\n    outline: 0; }\n\n.md-nooverflow .page-controls {\n  z-index: 0 !important; }\n\n/**\r\n * Bootstrap slider. converted from less files\r\n */\n.slider {\n  display: inline-block;\n  vertical-align: middle;\n  position: relative; }\n  .slider.slider-horizontal {\n    width: 210px;\n    height: 8px; }\n    .slider.slider-horizontal .slider-track {\n      height: 4px;\n      width: 100%;\n      margin-top: -2px;\n      top: 50%;\n      left: 0; }\n    .slider.slider-horizontal .slider-selection {\n      height: 100%;\n      top: 0;\n      bottom: 0; }\n    .slider.slider-horizontal .slider-handle {\n      margin-left: -13px;\n      margin-top: -9.75px; }\n      .slider.slider-horizontal .slider-handle.triangle {\n        border-width: 0 4px 4px 4px;\n        width: 0;\n        height: 0;\n        border-bottom-color: #0480be;\n        margin-top: 0; }\n  .slider.slider-vertical {\n    height: 210px;\n    width: 8px; }\n    .slider.slider-vertical .slider-track {\n      width: 4px;\n      height: 100%;\n      margin-left: -2px;\n      left: 50%;\n      top: 0; }\n    .slider.slider-vertical .slider-selection {\n      width: 100%;\n      left: 0;\n      top: 0;\n      bottom: 0; }\n    .slider.slider-vertical .slider-handle {\n      margin-left: -9.75px;\n      margin-top: -13px; }\n      .slider.slider-vertical .slider-handle.triangle {\n        border-width: 4px 0 4px 4px;\n        width: 1px;\n        height: 1px;\n        border-left-color: #0480be;\n        margin-left: 0; }\n  .slider.slider-disabled .slider-handle {\n    background-image: linear-gradient(to bottom, #dfdfdf 0%, #bebebe 100%);\n    background-repeat: repeat-x; }\n  .slider.slider-disabled .slider-track {\n    background-image: linear-gradient(to bottom, #e5e5e5 0%, #e9e9e9 100%);\n    background-repeat: repeat-x;\n    cursor: not-allowed; }\n  .slider input {\n    display: none; }\n  .slider .tooltip-inner {\n    white-space: nowrap; }\n  .slider .tooltip.top {\n    top: -30px; }\n\n.slider-track {\n  position: absolute;\n  cursor: pointer;\n  background-image: linear-gradient(to bottom, #eee 0%, #f8f8f8 100%);\n  background-repeat: repeat-x;\n  box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.1);\n  border-radius: 0.25rem; }\n\n.slider-selection {\n  position: absolute;\n  background-color: #5d8fc2;\n  box-shadow: inset 0 -1px 0 rgba(0, 0, 0, 0.15);\n  box-sizing: border-box;\n  border-radius: 0.25rem; }\n  .slider-danger .slider-selection {\n    background-color: #dd5826; }\n  .slider-success .slider-selection {\n    background-color: #64bd63; }\n  .slider-warning .slider-selection {\n    background-color: #f0b518; }\n  .slider-info .slider-selection {\n    background-color: #5dc4bf; }\n  .slider-inverse .slider-selection {\n    background-color: #555555; }\n\n.slider-handle {\n  position: absolute;\n  width: 26px;\n  height: 26px;\n  background-color: #fff;\n  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.2), 0 1px 3px rgba(0, 0, 0, 0.5);\n  border: 0px solid transparent; }\n  .slider-handle:focus {\n    outline: 0; }\n  .slider-handle.round {\n    border-radius: 50%; }\n  .slider-handle.triangle {\n    background: transparent none; }\n\n/**\r\n * select2\r\n */\n.select2-container .select2-choice abbr {\n  background: url(\"assets/select2/select2.png\") right top no-repeat; }\n\n.select2-container .select2-choice .select2-arrow b {\n  background: url(\"assets/select2/select2.png\") no-repeat 0 1px; }\n\n.select2-search input {\n  background: #fff url(\"assets/select2/select2.png\") no-repeat 100% -22px;\n  background: url(\"assets/select2/select2.png\") no-repeat 100% -22px, -webkit-gradient(linear, left bottom, left top, color-stop(0.85, #fff), color-stop(0.99, #eee));\n  background: url(\"assets/select2/select2.png\") no-repeat 100% -22px, -webkit-linear-gradient(center bottom, #fff 85%, #eee 99%);\n  background: url(\"assets/select2/select2.png\") no-repeat 100% -22px, -moz-linear-gradient(center bottom, #fff 85%, #eee 99%);\n  background: url(\"assets/select2/select2.png\") no-repeat 100% -22px, linear-gradient(to bottom, #fff 85%, #eee 99%) 0 0; }\n\nhtml[dir=\"rtl\"] .select2-search input {\n  background: #fff url(\"assets/select2/select2.png\") no-repeat -37px -22px;\n  background: url(\"assets/select2/select2.png\") no-repeat -37px -22px, -webkit-gradient(linear, left bottom, left top, color-stop(0.85, #fff), color-stop(0.99, #eee));\n  background: url(\"assets/select2/select2.png\") no-repeat -37px -22px, -webkit-linear-gradient(center bottom, #fff 85%, #eee 99%);\n  background: url(\"assets/select2/select2.png\") no-repeat -37px -22px, -moz-linear-gradient(center bottom, #fff 85%, #eee 99%);\n  background: url(\"assets/select2/select2.png\") no-repeat -37px -22px, linear-gradient(to bottom, #fff 85%, #eee 99%) 0 0; }\n\n.select2-search-choice-close {\n  background: url(\"assets/select2/select2.png\") right top no-repeat; }\n\n.select2-search input.select2-active {\n  background: #fff url(\"assets/select2/select2-spinner.gif\") no-repeat 100%;\n  background: url(\"assets/select2/select2-spinner.gif\") no-repeat 100%, -webkit-gradient(linear, left bottom, left top, color-stop(0.85, #fff), color-stop(0.99, #eee));\n  background: url(\"assets/select2/select2-spinner.gif\") no-repeat 100%, -webkit-linear-gradient(center bottom, #fff 85%, #eee 99%);\n  background: url(\"assets/select2/select2-spinner.gif\") no-repeat 100%, -moz-linear-gradient(center bottom, #fff 85%, #eee 99%);\n  background: url(\"assets/select2/select2-spinner.gif\") no-repeat 100%, linear-gradient(to bottom, #fff 85%, #eee 99%) 0 0; }\n\n.select2-more-results.select2-active {\n  background: #f4f4f4 url(\"assets/select2/select2-spinner.gif\") no-repeat 100%; }\n\n.select2-container-multi .select2-choices .select2-search-field input.select2-active {\n  background: #fff url(\"assets/select2/select2-spinner.gif\") no-repeat 100% !important; }\n\n/* Retina-ize icons */\n@media only screen and (-webkit-min-device-pixel-ratio: 1.5), only screen and (min-resolution: 2dppx) {\n  .select2-search input,\n  .select2-search-choice-close,\n  .select2-container .select2-choice abbr,\n  .select2-container .select2-choice .select2-arrow b {\n    background-image: url(\"assets/select2/select2x2.png\") !important; } }\n\n/**\r\n * Bootstrap select\r\n */\n.selectpicker.form-control {\n  height: auto; }\n\n.bootstrap-select .dropdown-toggle {\n  padding-left: 10px; }\n  .bootstrap-select .dropdown-toggle:after {\n    margin-right: 0;\n    margin-left: 0; }\n\n.bootstrap-select .dropdown-menu > li > a {\n  display: block;\n  width: 100%;\n  padding: 3px 20px;\n  clear: both;\n  font-weight: normal;\n  line-height: 1.5;\n  color: #555555;\n  text-align: inherit;\n  white-space: nowrap;\n  background: none;\n  border: 0; }\n  .bootstrap-select .dropdown-menu > li > a:focus, .bootstrap-select .dropdown-menu > li > a:hover {\n    color: #272727;\n    text-decoration: none;\n    background-color: #f7f7f9; }\n  .bootstrap-select .dropdown-menu > li > a.active, .bootstrap-select .dropdown-menu > li > a.active:focus, .bootstrap-select .dropdown-menu > li > a.active:hover {\n    color: #fff;\n    text-decoration: none;\n    background-color: #5d8fc2;\n    outline: 0; }\n  .bootstrap-select .dropdown-menu > li > a.disabled, .bootstrap-select .dropdown-menu > li > a.disabled:focus, .bootstrap-select .dropdown-menu > li > a.disabled:hover {\n    color: #999999; }\n  .bootstrap-select .dropdown-menu > li > a.disabled:focus, .bootstrap-select .dropdown-menu > li > a.disabled:hover {\n    text-decoration: none;\n    cursor: not-allowed;\n    background-color: transparent;\n    background-image: none; }\n\n/**\r\n*  autosize\r\n**/\n.autogrow {\n  overflow: hidden;\n  resize: none; }\n\n/**\r\n* datetime\r\n**/\n.input-group {\n  width: auto; }\n  .input-group .input-group-addon {\n    padding: .375rem .75rem .375rem .75rem; }\n\n.fileinput .input-group-addon {\n  border-right: 1px solid #ccc; }\n\n/* Awesome Bootstrap Checkbox */\n.abc-checkbox, .abc-radio {\n  margin-bottom: 10px;\n  padding-left: 3rem; }\n"

/***/ },

/***/ 807:
/***/ function(module, exports) {

module.exports = "/***********************************/\n/**            PARSLEY            **/\n/***********************************/\ninput.parsley-error {\n  border-color: #dd5826;\n  box-shadow: inset 0 1px 1px rgba(221, 88, 38, 0.075); }\n\n.parsley-errors-list {\n  font-size: 85%;\n  padding-left: 0;\n  margin-bottom: 5px; }\n  .parsley-errors-list li {\n    list-style: none;\n    color: #dd5826; }\n\n.badge {\n  padding: 6px; }\n"

/***/ },

/***/ 808:
/***/ function(module, exports) {

module.exports = "/* WIZARD GENERAL */\n.wizard {\n  display: none; }\n\n.wizard-body {\n  padding: 0;\n  margin: 0; }\n\n/* WIZARD HEADER */\n.wizard-header {\n  padding: 9px 15px;\n  border-bottom: 0; }\n\n.wizard-header h3 {\n  margin: 0;\n  line-height: 35px;\n  display: inline;\n  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;\n  font-family: inherit;\n  font-weight: bold;\n  text-rendering: optimizelegibility;\n  color: #333333; }\n\n.wizard-subtitle {\n  font-weight: bold;\n  color: #AFAFAF;\n  padding-left: 20px; }\n\n/* WIZARD NAVIGATION */\n.wizard-steps {\n  width: 28%;\n  background-color: #f5f5f5;\n  border-bottom-left-radius: 6px;\n  position: relative; }\n\n.wizard-nav-container {\n  padding-bottom: 30px; }\n\n.wizard-nav-list {\n  margin-bottom: 0; }\n\n.wizard-nav-link .glyphicon-chevron-right {\n  float: right;\n  margin-top: 12px;\n  margin-right: -6px;\n  opacity: .25; }\n\nli.wizard-nav-item.active .glyphicon-chevron-right {\n  opacity: 1; }\n\nli.wizard-nav-item {\n  line-height: 40px; }\n\n.wizard-nav-list > li > a {\n  background-color: #f5f5f5;\n  padding: 3px 15px 3px 20px;\n  cursor: default;\n  color: #B4B4B4; }\n\n.wizard-nav-list > li > a:hover {\n  background-color: transparent; }\n\n.wizard-nav-list > li.already-visited > a.wizard-nav-link {\n  color: #08C;\n  cursor: pointer; }\n\n.wizard-nav-list > li.active > a.wizard-nav-link {\n  color: white; }\n\n.wizard-nav-item .already-visited .active {\n  background-color: #08C; }\n\n.wizard-nav-list li.active > a {\n  background-color: #08C; }\n\n/* WIZARD CONTENT */\n.wizard-body form {\n  padding: 0;\n  margin: 0; }\n\n/* WIZARD PROGRESS BAR */\n.wizard-progress-container {\n  margin-top: 20px;\n  padding: 15px;\n  width: 100%;\n  position: absolute;\n  bottom: 0; }\n\n.wizard-card-container {\n  margin-left: 28%; }\n\n/* WIZARD CARDS */\n.wizard-error,\n.wizard-failure,\n.wizard-success,\n.wizard-loading,\n.wizard-card {\n  border-top: 1px solid #EEE;\n  display: none;\n  padding: 35px;\n  padding-top: 20px;\n  overflow-y: auto;\n  /*\n\tposition:relative;\n\theight:300px;\n\tmargin-right: 5px;\n\t*/ }\n\n.wizard-card-overlay {\n  overflow-y: initial; }\n\n.wizard-card > h3 {\n  margin-top: 0;\n  margin-bottom: 20px;\n  font-size: 21px;\n  line-height: 40px;\n  font-weight: normal; }\n\n/* WIZARD FOOTER */\n.wizard-footer {\n  padding: 0; }\n\n.wizard-buttons-container {\n  padding: 20px; }\n\n.wizard-cancel {\n  margin-left: 12px; }\n\n/* Inner Card */\n.wizard-input-section {\n  margin-bottom: 20px; }\n\n.wizard-dialog .popover.error-popover {\n  background-color: #F2DEDE;\n  color: #B94A48;\n  border-color: #953B39; }\n\n.wizard-dialog .popover.error-popover .arrow::after {\n  border-right-color: #F2DEDE; }\n\n.wizard-dialog .popover.error-popover .popover-title {\n  display: none; }\n\n.wizard-dialog .popover.error-popover .arrow {\n  border-right-color: #953B39; }\n\n.select2-container {\n  box-sizing: border-box;\n  display: inline-block;\n  margin: 0;\n  position: relative;\n  vertical-align: middle; }\n  .select2-container .select2-selection--single {\n    box-sizing: border-box;\n    cursor: pointer;\n    display: block;\n    height: 28px;\n    user-select: none;\n    -webkit-user-select: none; }\n    .select2-container .select2-selection--single .select2-selection__rendered {\n      display: block;\n      padding-left: 8px;\n      padding-right: 20px;\n      overflow: hidden;\n      text-overflow: ellipsis;\n      white-space: nowrap; }\n    .select2-container .select2-selection--single .select2-selection__clear {\n      position: relative; }\n  .select2-container[dir=\"rtl\"] .select2-selection--single .select2-selection__rendered {\n    padding-right: 8px;\n    padding-left: 20px; }\n  .select2-container .select2-selection--multiple {\n    box-sizing: border-box;\n    cursor: pointer;\n    display: block;\n    min-height: 32px;\n    user-select: none;\n    -webkit-user-select: none; }\n    .select2-container .select2-selection--multiple .select2-selection__rendered {\n      display: inline-block;\n      overflow: hidden;\n      padding-left: 8px;\n      text-overflow: ellipsis;\n      white-space: nowrap; }\n  .select2-container .select2-search--inline {\n    float: left; }\n    .select2-container .select2-search--inline .select2-search__field {\n      box-sizing: border-box;\n      border: none;\n      font-size: 100%;\n      margin-top: 5px;\n      padding: 0; }\n      .select2-container .select2-search--inline .select2-search__field::-webkit-search-cancel-button {\n        -webkit-appearance: none; }\n\n.select2-dropdown {\n  background-color: white;\n  border: 1px solid #aaa;\n  border-radius: 4px;\n  box-sizing: border-box;\n  display: block;\n  position: absolute;\n  left: -100000px;\n  width: 100%;\n  z-index: 1051; }\n\n.select2-results {\n  display: block; }\n\n.select2-results__options {\n  list-style: none;\n  margin: 0;\n  padding: 0; }\n\n.select2-results__option {\n  padding: 6px;\n  user-select: none;\n  -webkit-user-select: none; }\n  .select2-results__option[aria-selected] {\n    cursor: pointer; }\n\n.select2-container--open .select2-dropdown {\n  left: 0; }\n\n.select2-container--open .select2-dropdown--above {\n  border-bottom: none;\n  border-bottom-left-radius: 0;\n  border-bottom-right-radius: 0; }\n\n.select2-container--open .select2-dropdown--below {\n  border-top: none;\n  border-top-left-radius: 0;\n  border-top-right-radius: 0; }\n\n.select2-search--dropdown {\n  display: block;\n  padding: 4px; }\n  .select2-search--dropdown .select2-search__field {\n    padding: 4px;\n    width: 100%;\n    box-sizing: border-box; }\n    .select2-search--dropdown .select2-search__field::-webkit-search-cancel-button {\n      -webkit-appearance: none; }\n  .select2-search--dropdown.select2-search--hide {\n    display: none; }\n\n.select2-close-mask {\n  border: 0;\n  margin: 0;\n  padding: 0;\n  display: block;\n  position: fixed;\n  left: 0;\n  top: 0;\n  min-height: 100%;\n  min-width: 100%;\n  height: auto;\n  width: auto;\n  opacity: 0;\n  z-index: 99;\n  background-color: #fff;\n  filter: alpha(opacity=0); }\n\n.select2-hidden-accessible {\n  border: 0 !important;\n  clip: rect(0 0 0 0) !important;\n  height: 1px !important;\n  margin: -1px !important;\n  overflow: hidden !important;\n  padding: 0 !important;\n  position: absolute !important;\n  width: 1px !important; }\n\n.select2-container--default .select2-selection--single {\n  background-color: #fff;\n  border: 1px solid #aaa;\n  border-radius: 4px; }\n  .select2-container--default .select2-selection--single .select2-selection__rendered {\n    color: #444;\n    line-height: 28px; }\n  .select2-container--default .select2-selection--single .select2-selection__clear {\n    cursor: pointer;\n    float: right;\n    font-weight: bold; }\n  .select2-container--default .select2-selection--single .select2-selection__placeholder {\n    color: #999; }\n  .select2-container--default .select2-selection--single .select2-selection__arrow {\n    height: 26px;\n    position: absolute;\n    top: 1px;\n    right: 1px;\n    width: 20px; }\n    .select2-container--default .select2-selection--single .select2-selection__arrow b {\n      border-color: #888 transparent transparent transparent;\n      border-style: solid;\n      border-width: 5px 4px 0 4px;\n      height: 0;\n      left: 50%;\n      margin-left: -4px;\n      margin-top: -2px;\n      position: absolute;\n      top: 50%;\n      width: 0; }\n\n.select2-container--default[dir=\"rtl\"] .select2-selection--single .select2-selection__clear {\n  float: left; }\n\n.select2-container--default[dir=\"rtl\"] .select2-selection--single .select2-selection__arrow {\n  left: 1px;\n  right: auto; }\n\n.select2-container--default.select2-container--disabled .select2-selection--single {\n  background-color: #eee;\n  cursor: default; }\n  .select2-container--default.select2-container--disabled .select2-selection--single .select2-selection__clear {\n    display: none; }\n\n.select2-container--default.select2-container--open .select2-selection--single .select2-selection__arrow b {\n  border-color: transparent transparent #888 transparent;\n  border-width: 0 4px 5px 4px; }\n\n.select2-container--default .select2-selection--multiple {\n  background-color: white;\n  border: 1px solid #aaa;\n  border-radius: 4px;\n  cursor: text; }\n  .select2-container--default .select2-selection--multiple .select2-selection__rendered {\n    box-sizing: border-box;\n    list-style: none;\n    margin: 0;\n    padding: 0 5px;\n    width: 100%; }\n    .select2-container--default .select2-selection--multiple .select2-selection__rendered li {\n      list-style: none; }\n  .select2-container--default .select2-selection--multiple .select2-selection__placeholder {\n    color: #999;\n    margin-top: 5px;\n    float: left; }\n  .select2-container--default .select2-selection--multiple .select2-selection__clear {\n    cursor: pointer;\n    float: right;\n    font-weight: bold;\n    margin-top: 5px;\n    margin-right: 10px; }\n  .select2-container--default .select2-selection--multiple .select2-selection__choice {\n    background-color: #e4e4e4;\n    border: 1px solid #aaa;\n    border-radius: 4px;\n    cursor: default;\n    float: left;\n    margin-right: 5px;\n    margin-top: 5px;\n    padding: 0 5px; }\n  .select2-container--default .select2-selection--multiple .select2-selection__choice__remove {\n    color: #999;\n    cursor: pointer;\n    display: inline-block;\n    font-weight: bold;\n    margin-right: 2px; }\n    .select2-container--default .select2-selection--multiple .select2-selection__choice__remove:hover {\n      color: #333; }\n\n.select2-container--default[dir=\"rtl\"] .select2-selection--multiple .select2-selection__choice, .select2-container--default[dir=\"rtl\"] .select2-selection--multiple .select2-selection__placeholder, .select2-container--default[dir=\"rtl\"] .select2-selection--multiple .select2-search--inline {\n  float: right; }\n\n.select2-container--default[dir=\"rtl\"] .select2-selection--multiple .select2-selection__choice {\n  margin-left: 5px;\n  margin-right: auto; }\n\n.select2-container--default[dir=\"rtl\"] .select2-selection--multiple .select2-selection__choice__remove {\n  margin-left: 2px;\n  margin-right: auto; }\n\n.select2-container--default.select2-container--focus .select2-selection--multiple {\n  border: solid black 1px;\n  outline: 0; }\n\n.select2-container--default.select2-container--disabled .select2-selection--multiple {\n  background-color: #eee;\n  cursor: default; }\n\n.select2-container--default.select2-container--disabled .select2-selection__choice__remove {\n  display: none; }\n\n.select2-container--default.select2-container--open.select2-container--above .select2-selection--single, .select2-container--default.select2-container--open.select2-container--above .select2-selection--multiple {\n  border-top-left-radius: 0;\n  border-top-right-radius: 0; }\n\n.select2-container--default.select2-container--open.select2-container--below .select2-selection--single, .select2-container--default.select2-container--open.select2-container--below .select2-selection--multiple {\n  border-bottom-left-radius: 0;\n  border-bottom-right-radius: 0; }\n\n.select2-container--default .select2-search--dropdown .select2-search__field {\n  border: 1px solid #aaa; }\n\n.select2-container--default .select2-search--inline .select2-search__field {\n  background: transparent;\n  border: none;\n  outline: 0;\n  box-shadow: none;\n  -webkit-appearance: textfield; }\n\n.select2-container--default .select2-results > .select2-results__options {\n  max-height: 200px;\n  overflow-y: auto; }\n\n.select2-container--default .select2-results__option[role=group] {\n  padding: 0; }\n\n.select2-container--default .select2-results__option[aria-disabled=true] {\n  color: #999; }\n\n.select2-container--default .select2-results__option[aria-selected=true] {\n  background-color: #ddd; }\n\n.select2-container--default .select2-results__option .select2-results__option {\n  padding-left: 1em; }\n  .select2-container--default .select2-results__option .select2-results__option .select2-results__group {\n    padding-left: 0; }\n  .select2-container--default .select2-results__option .select2-results__option .select2-results__option {\n    margin-left: -1em;\n    padding-left: 2em; }\n    .select2-container--default .select2-results__option .select2-results__option .select2-results__option .select2-results__option {\n      margin-left: -2em;\n      padding-left: 3em; }\n      .select2-container--default .select2-results__option .select2-results__option .select2-results__option .select2-results__option .select2-results__option {\n        margin-left: -3em;\n        padding-left: 4em; }\n        .select2-container--default .select2-results__option .select2-results__option .select2-results__option .select2-results__option .select2-results__option .select2-results__option {\n          margin-left: -4em;\n          padding-left: 5em; }\n          .select2-container--default .select2-results__option .select2-results__option .select2-results__option .select2-results__option .select2-results__option .select2-results__option .select2-results__option {\n            margin-left: -5em;\n            padding-left: 6em; }\n\n.select2-container--default .select2-results__option--highlighted[aria-selected] {\n  background-color: #5897fb;\n  color: white; }\n\n.select2-container--default .select2-results__group {\n  cursor: default;\n  display: block;\n  padding: 6px; }\n\n.select2-container--classic .select2-selection--single {\n  background-color: #f7f7f7;\n  border: 1px solid #aaa;\n  border-radius: 0.25rem;\n  outline: 0;\n  background-image: -webkit-linear-gradient(top, white 50%, #eeeeee 100%);\n  background-image: -o-linear-gradient(top, white 50%, #eeeeee 100%);\n  background-image: linear-gradient(to bottom, white 50%, #eeeeee 100%);\n  background-repeat: repeat-x;\n  filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#FFFFFFFF', endColorstr='#FFEEEEEE', GradientType=0); }\n  .select2-container--classic .select2-selection--single:focus {\n    border: 1px solid #5897fb; }\n  .select2-container--classic .select2-selection--single .select2-selection__rendered {\n    color: #444;\n    line-height: 28px; }\n  .select2-container--classic .select2-selection--single .select2-selection__clear {\n    cursor: pointer;\n    float: right;\n    font-weight: bold;\n    margin-right: 10px; }\n  .select2-container--classic .select2-selection--single .select2-selection__placeholder {\n    color: #999; }\n  .select2-container--classic .select2-selection--single .select2-selection__arrow {\n    background-color: #ddd;\n    border: none;\n    border-left: 1px solid #aaa;\n    border-top-right-radius: 0.25rem;\n    border-bottom-right-radius: 0.25rem;\n    height: 26px;\n    position: absolute;\n    top: 1px;\n    right: 1px;\n    width: 20px;\n    background-image: -webkit-linear-gradient(top, #eeeeee 50%, #cccccc 100%);\n    background-image: -o-linear-gradient(top, #eeeeee 50%, #cccccc 100%);\n    background-image: linear-gradient(to bottom, #eeeeee 50%, #cccccc 100%);\n    background-repeat: repeat-x;\n    filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#FFEEEEEE', endColorstr='#FFCCCCCC', GradientType=0); }\n    .select2-container--classic .select2-selection--single .select2-selection__arrow b {\n      border-color: #888 transparent transparent transparent;\n      border-style: solid;\n      border-width: 5px 4px 0 4px;\n      height: 0;\n      left: 50%;\n      margin-left: -4px;\n      margin-top: -2px;\n      position: absolute;\n      top: 50%;\n      width: 0; }\n\n.select2-container--classic[dir=\"rtl\"] .select2-selection--single .select2-selection__clear {\n  float: left; }\n\n.select2-container--classic[dir=\"rtl\"] .select2-selection--single .select2-selection__arrow {\n  border: none;\n  border-right: 1px solid #aaa;\n  border-radius: 0;\n  border-top-left-radius: 0.25rem;\n  border-bottom-left-radius: 0.25rem;\n  left: 1px;\n  right: auto; }\n\n.select2-container--classic.select2-container--open .select2-selection--single {\n  border: 1px solid #5897fb; }\n  .select2-container--classic.select2-container--open .select2-selection--single .select2-selection__arrow {\n    background: transparent;\n    border: none; }\n    .select2-container--classic.select2-container--open .select2-selection--single .select2-selection__arrow b {\n      border-color: transparent transparent #888 transparent;\n      border-width: 0 4px 5px 4px; }\n\n.select2-container--classic.select2-container--open.select2-container--above .select2-selection--single {\n  border-top: none;\n  border-top-left-radius: 0;\n  border-top-right-radius: 0;\n  background-image: -webkit-linear-gradient(top, white 0%, #eeeeee 50%);\n  background-image: -o-linear-gradient(top, white 0%, #eeeeee 50%);\n  background-image: linear-gradient(to bottom, white 0%, #eeeeee 50%);\n  background-repeat: repeat-x;\n  filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#FFFFFFFF', endColorstr='#FFEEEEEE', GradientType=0); }\n\n.select2-container--classic.select2-container--open.select2-container--below .select2-selection--single {\n  border-bottom: none;\n  border-bottom-left-radius: 0;\n  border-bottom-right-radius: 0;\n  background-image: -webkit-linear-gradient(top, #eeeeee 50%, white 100%);\n  background-image: -o-linear-gradient(top, #eeeeee 50%, white 100%);\n  background-image: linear-gradient(to bottom, #eeeeee 50%, white 100%);\n  background-repeat: repeat-x;\n  filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#FFEEEEEE', endColorstr='#FFFFFFFF', GradientType=0); }\n\n.select2-container--classic .select2-selection--multiple {\n  background-color: white;\n  border: 1px solid #aaa;\n  border-radius: 0.25rem;\n  cursor: text;\n  outline: 0; }\n  .select2-container--classic .select2-selection--multiple:focus {\n    border: 1px solid #5897fb; }\n  .select2-container--classic .select2-selection--multiple .select2-selection__rendered {\n    list-style: none;\n    margin: 0;\n    padding: 0 5px; }\n  .select2-container--classic .select2-selection--multiple .select2-selection__clear {\n    display: none; }\n  .select2-container--classic .select2-selection--multiple .select2-selection__choice {\n    background-color: #e4e4e4;\n    border: 1px solid #aaa;\n    border-radius: 0.25rem;\n    cursor: default;\n    float: left;\n    margin-right: 5px;\n    margin-top: 5px;\n    padding: 0 5px; }\n  .select2-container--classic .select2-selection--multiple .select2-selection__choice__remove {\n    color: #888;\n    cursor: pointer;\n    display: inline-block;\n    font-weight: bold;\n    margin-right: 2px; }\n    .select2-container--classic .select2-selection--multiple .select2-selection__choice__remove:hover {\n      color: #555; }\n\n.select2-container--classic[dir=\"rtl\"] .select2-selection--multiple .select2-selection__choice {\n  float: right; }\n\n.select2-container--classic[dir=\"rtl\"] .select2-selection--multiple .select2-selection__choice {\n  margin-left: 5px;\n  margin-right: auto; }\n\n.select2-container--classic[dir=\"rtl\"] .select2-selection--multiple .select2-selection__choice__remove {\n  margin-left: 2px;\n  margin-right: auto; }\n\n.select2-container--classic.select2-container--open .select2-selection--multiple {\n  border: 1px solid #5897fb; }\n\n.select2-container--classic.select2-container--open.select2-container--above .select2-selection--multiple {\n  border-top: none;\n  border-top-left-radius: 0;\n  border-top-right-radius: 0; }\n\n.select2-container--classic.select2-container--open.select2-container--below .select2-selection--multiple {\n  border-bottom: none;\n  border-bottom-left-radius: 0;\n  border-bottom-right-radius: 0; }\n\n.select2-container--classic .select2-search--dropdown .select2-search__field {\n  border: 1px solid #aaa;\n  outline: 0; }\n\n.select2-container--classic .select2-search--inline .select2-search__field {\n  outline: 0;\n  box-shadow: none; }\n\n.select2-container--classic .select2-dropdown {\n  background-color: white;\n  border: 1px solid transparent; }\n\n.select2-container--classic .select2-dropdown--above {\n  border-bottom: none; }\n\n.select2-container--classic .select2-dropdown--below {\n  border-top: none; }\n\n.select2-container--classic .select2-results > .select2-results__options {\n  max-height: 200px;\n  overflow-y: auto; }\n\n.select2-container--classic .select2-results__option[role=group] {\n  padding: 0; }\n\n.select2-container--classic .select2-results__option[aria-disabled=true] {\n  color: grey; }\n\n.select2-container--classic .select2-results__option--highlighted[aria-selected] {\n  background-color: #3875d7;\n  color: white; }\n\n.select2-container--classic .select2-results__group {\n  cursor: default;\n  display: block;\n  padding: 6px; }\n\n.select2-container--classic.select2-container--open .select2-dropdown {\n  border-color: #5897fb; }\n\n/*! Select2 Bootstrap Theme v0.1.0-beta.9 | MIT License | github.com/select2/select2-bootstrap-theme */\n.select2-container--bootstrap {\n  display: block;\n  /*------------------------------------*      #COMMON STYLES\n  \\*------------------------------------*/\n  /**\n   * Search field in the Select2 dropdown.\n   */\n  /**\n   * No outline for all search fields - in the dropdown\n   * and inline in multi Select2s.\n   */\n  /**\n   * Adjust Select2's choices hover and selected styles to match\n   * Bootstrap 3's default dropdown styles.\n   *\n   * @see http://getbootstrap.com/components/#dropdowns\n   */\n  /**\n   * Clear the selection.\n   */\n  /**\n   * Address disabled Select2 styles.\n   *\n   * @see https://select2.github.io/examples.html#disabled\n   * @see http://getbootstrap.com/css/#forms-control-disabled\n   */\n  /*------------------------------------*      #DROPDOWN\n  \\*------------------------------------*/\n  /**\n   * Dropdown border color and box-shadow.\n   */\n  /**\n   * Limit the dropdown height.\n   */\n  /*------------------------------------*      #SINGLE SELECT2\n  \\*------------------------------------*/\n  /*------------------------------------*    #MULTIPLE SELECT2\n  \\*------------------------------------*/\n  /**\n   * Address Bootstrap control sizing classes\n   *\n   * 1. Reset Bootstrap defaults.\n   * 2. Adjust the dropdown arrow button icon position.\n   *\n   * @see http://getbootstrap.com/css/#forms-control-sizes\n   */\n  /* 1 */\n  /*------------------------------------*    #RTL SUPPORT\n  \\*------------------------------------*/ }\n  .select2-container--bootstrap .select2-selection {\n    box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);\n    background-color: #fff;\n    border: 1px solid rgba(0, 0, 0, 0.15);\n    border-radius: 0.25rem;\n    color: #555555;\n    font-size: 1rem;\n    outline: 0; }\n    .select2-container--bootstrap .select2-selection.form-control {\n      border-radius: 0.25rem; }\n  .select2-container--bootstrap .select2-search--dropdown .select2-search__field {\n    box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);\n    background-color: #fff;\n    border: 1px solid rgba(0, 0, 0, 0.15);\n    border-radius: 0.25rem;\n    color: #555555;\n    font-size: 1rem; }\n  .select2-container--bootstrap .select2-search__field {\n    outline: 0;\n    /* Firefox 18- */\n    /**\n     * Firefox 19+\n     *\n     * @see http://stackoverflow.com/questions/24236240/color-for-styled-placeholder-text-is-muted-in-firefox\n     */ }\n    .select2-container--bootstrap .select2-search__field::-webkit-input-placeholder {\n      color: #999999; }\n    .select2-container--bootstrap .select2-search__field:-moz-placeholder {\n      color: #999999; }\n    .select2-container--bootstrap .select2-search__field::-moz-placeholder {\n      color: #999999;\n      opacity: 1; }\n    .select2-container--bootstrap .select2-search__field:-ms-input-placeholder {\n      color: #999999; }\n  .select2-container--bootstrap .select2-results__option {\n    padding: 6px 12px;\n    /**\n     * Disabled results.\n     *\n     * @see https://select2.github.io/examples.html#disabled-results\n     */\n    /**\n     * Hover state.\n     */\n    /**\n     * Selected state.\n     */ }\n    .select2-container--bootstrap .select2-results__option[role=group] {\n      padding: 0; }\n    .select2-container--bootstrap .select2-results__option[aria-disabled=true] {\n      color: #999999;\n      cursor: not-allowed; }\n    .select2-container--bootstrap .select2-results__option[aria-selected=true] {\n      background-color: #f7f7f9;\n      color: #272727; }\n    .select2-container--bootstrap .select2-results__option--highlighted[aria-selected] {\n      background-color: #5d8fc2;\n      color: #fff; }\n    .select2-container--bootstrap .select2-results__option .select2-results__option {\n      padding: 6px 12px; }\n      .select2-container--bootstrap .select2-results__option .select2-results__option .select2-results__group {\n        padding-left: 0; }\n      .select2-container--bootstrap .select2-results__option .select2-results__option .select2-results__option {\n        margin-left: -12px;\n        padding-left: 24px; }\n        .select2-container--bootstrap .select2-results__option .select2-results__option .select2-results__option .select2-results__option {\n          margin-left: -24px;\n          padding-left: 36px; }\n          .select2-container--bootstrap .select2-results__option .select2-results__option .select2-results__option .select2-results__option .select2-results__option {\n            margin-left: -36px;\n            padding-left: 48px; }\n            .select2-container--bootstrap .select2-results__option .select2-results__option .select2-results__option .select2-results__option .select2-results__option .select2-results__option {\n              margin-left: -48px;\n              padding-left: 60px; }\n              .select2-container--bootstrap .select2-results__option .select2-results__option .select2-results__option .select2-results__option .select2-results__option .select2-results__option .select2-results__option {\n                margin-left: -60px;\n                padding-left: 72px; }\n  .select2-container--bootstrap .select2-results__group {\n    color: #999999;\n    display: block;\n    padding: 6px 12px;\n    font-size: 0.875rem;\n    line-height: 1.5;\n    white-space: nowrap; }\n  .select2-container--bootstrap.select2-container--focus .select2-selection, .select2-container--bootstrap.select2-container--open .select2-selection {\n    box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 8px rgba(77, 144, 254, 0.6);\n    transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s;\n    border-color: #4D90FE; }\n  .select2-container--bootstrap.select2-container--open {\n    /**\n     * Make the dropdown arrow point up while the dropdown is visible.\n     */\n    /**\n     * Handle border radii of the container when the dropdown is showing.\n     */ }\n    .select2-container--bootstrap.select2-container--open .select2-selection .select2-selection__arrow b {\n      border-color: transparent transparent #999999 transparent;\n      border-width: 0 4px 4px 4px; }\n    .select2-container--bootstrap.select2-container--open.select2-container--below .select2-selection {\n      border-bottom-right-radius: 0;\n      border-bottom-left-radius: 0;\n      border-bottom-color: transparent; }\n    .select2-container--bootstrap.select2-container--open.select2-container--above .select2-selection {\n      border-top-right-radius: 0;\n      border-top-left-radius: 0;\n      border-top-color: transparent; }\n  .select2-container--bootstrap .select2-selection__clear {\n    color: #999999;\n    cursor: pointer;\n    float: right;\n    font-weight: bold;\n    margin-right: 10px; }\n    .select2-container--bootstrap .select2-selection__clear:hover {\n      color: #f8f8f8; }\n  .select2-container--bootstrap.select2-container--disabled .select2-selection {\n    border-color: rgba(0, 0, 0, 0.15);\n    box-shadow: none; }\n  .select2-container--bootstrap.select2-container--disabled .select2-selection,\n  .select2-container--bootstrap.select2-container--disabled .select2-search__field {\n    cursor: not-allowed; }\n  .select2-container--bootstrap.select2-container--disabled .select2-selection,\n  .select2-container--bootstrap.select2-container--disabled .select2-selection--multiple .select2-selection__choice {\n    background-color: #eeeeee; }\n  .select2-container--bootstrap.select2-container--disabled .select2-selection__clear,\n  .select2-container--bootstrap.select2-container--disabled .select2-selection--multiple .select2-selection__choice__remove {\n    display: none; }\n  .select2-container--bootstrap .select2-dropdown {\n    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.175);\n    border-color: #4D90FE;\n    overflow-x: hidden;\n    margin-top: -1px; }\n    .select2-container--bootstrap .select2-dropdown--above {\n      box-shadow: 0px -6px 12px rgba(0, 0, 0, 0.175);\n      margin-top: 1px; }\n  .select2-container--bootstrap .select2-results > .select2-results__options {\n    max-height: 200px;\n    overflow-y: auto; }\n  .select2-container--bootstrap .select2-selection--single {\n    height: 35px;\n    line-height: 1.5;\n    padding: 6px 24px 6px 12px;\n    /**\n     * Adjust the single Select2's dropdown arrow button appearance.\n     */ }\n    .select2-container--bootstrap .select2-selection--single .select2-selection__arrow {\n      position: absolute;\n      bottom: 0;\n      right: 12px;\n      top: 0;\n      width: 4px; }\n      .select2-container--bootstrap .select2-selection--single .select2-selection__arrow b {\n        border-color: #999999 transparent transparent transparent;\n        border-style: solid;\n        border-width: 4px 4px 0 4px;\n        height: 0;\n        left: 0;\n        margin-left: -4px;\n        margin-top: -2px;\n        position: absolute;\n        top: 50%;\n        width: 0; }\n    .select2-container--bootstrap .select2-selection--single .select2-selection__rendered {\n      color: #555555;\n      padding: 0; }\n    .select2-container--bootstrap .select2-selection--single .select2-selection__placeholder {\n      color: #999999; }\n  .select2-container--bootstrap .select2-selection--multiple {\n    min-height: 35px;\n    padding: 0;\n    height: auto;\n    /**\n     * Make Multi Select2's choices match Bootstrap 3's default button styles.\n     */\n    /**\n     * Minus 2px borders.\n     */\n    /**\n     * Clear the selection.\n     */ }\n    .select2-container--bootstrap .select2-selection--multiple .select2-selection__rendered {\n      box-sizing: border-box;\n      display: block;\n      line-height: 1.5;\n      list-style: none;\n      margin: 0;\n      overflow: hidden;\n      padding: 0;\n      width: 100%;\n      text-overflow: ellipsis;\n      white-space: nowrap; }\n    .select2-container--bootstrap .select2-selection--multiple .select2-selection__placeholder {\n      color: #999999;\n      float: left;\n      margin-top: 5px; }\n    .select2-container--bootstrap .select2-selection--multiple .select2-selection__choice {\n      color: #555555;\n      background: #f8f8f8;\n      border: 1px solid transparent;\n      border-radius: 0.25rem;\n      cursor: default;\n      float: left;\n      margin: 5px 0 0 6px;\n      padding: 0 6px; }\n    .select2-container--bootstrap .select2-selection--multiple .select2-search--inline .select2-search__field {\n      background: transparent;\n      padding: 0 12px;\n      height: 33px;\n      line-height: 1.5;\n      margin-top: 0;\n      min-width: 5em; }\n    .select2-container--bootstrap .select2-selection--multiple .select2-selection__choice__remove {\n      color: #999999;\n      cursor: pointer;\n      display: inline-block;\n      font-weight: bold;\n      margin-right: 3px; }\n      .select2-container--bootstrap .select2-selection--multiple .select2-selection__choice__remove:hover {\n        color: #f8f8f8; }\n    .select2-container--bootstrap .select2-selection--multiple .select2-selection__clear {\n      margin-top: 6px; }\n  .select2-container--bootstrap .select2-selection--single.input-sm,\n  .input-group-sm .select2-container--bootstrap .select2-selection--single,\n  .form-group-sm .select2-container--bootstrap .select2-selection--single {\n    border-radius: 0.2rem;\n    font-size: 0.875rem;\n    height: 1.8125rem;\n    line-height: 1.5;\n    padding: 5px 22px 5px 10px;\n    /* 2 */ }\n    .select2-container--bootstrap .select2-selection--single.input-sm .select2-selection__arrow b,\n    .input-group-sm .select2-container--bootstrap .select2-selection--single .select2-selection__arrow b,\n    .form-group-sm .select2-container--bootstrap .select2-selection--single .select2-selection__arrow b {\n      margin-left: -5px; }\n  .select2-container--bootstrap .select2-selection--multiple.input-sm,\n  .input-group-sm .select2-container--bootstrap .select2-selection--multiple,\n  .form-group-sm .select2-container--bootstrap .select2-selection--multiple {\n    min-height: 1.8125rem;\n    border-radius: 0.2rem; }\n    .select2-container--bootstrap .select2-selection--multiple.input-sm .select2-selection__choice,\n    .input-group-sm .select2-container--bootstrap .select2-selection--multiple .select2-selection__choice,\n    .form-group-sm .select2-container--bootstrap .select2-selection--multiple .select2-selection__choice {\n      font-size: 0.875rem;\n      line-height: 1.5;\n      margin: 4px 0 0 5px;\n      padding: 0 5px; }\n    .select2-container--bootstrap .select2-selection--multiple.input-sm .select2-search--inline .select2-search__field,\n    .input-group-sm .select2-container--bootstrap .select2-selection--multiple .select2-search--inline .select2-search__field,\n    .form-group-sm .select2-container--bootstrap .select2-selection--multiple .select2-search--inline .select2-search__field {\n      padding: 0 10px;\n      font-size: 0.875rem;\n      height: -0.1875rem;\n      line-height: 1.5; }\n    .select2-container--bootstrap .select2-selection--multiple.input-sm .select2-selection__clear,\n    .input-group-sm .select2-container--bootstrap .select2-selection--multiple .select2-selection__clear,\n    .form-group-sm .select2-container--bootstrap .select2-selection--multiple .select2-selection__clear {\n      margin-top: 5px; }\n  .select2-container--bootstrap .select2-selection--single.input-lg,\n  .input-group-lg .select2-container--bootstrap .select2-selection--single,\n  .form-group-lg .select2-container--bootstrap .select2-selection--single {\n    border-radius: 0.3rem;\n    font-size: 1.25rem;\n    height: 3.16667rem;\n    line-height: 1.33333;\n    padding: 10px 28px 10px 16px;\n    /* 1 */ }\n    .select2-container--bootstrap .select2-selection--single.input-lg .select2-selection__arrow,\n    .input-group-lg .select2-container--bootstrap .select2-selection--single .select2-selection__arrow,\n    .form-group-lg .select2-container--bootstrap .select2-selection--single .select2-selection__arrow {\n      width: 4px; }\n      .select2-container--bootstrap .select2-selection--single.input-lg .select2-selection__arrow b,\n      .input-group-lg .select2-container--bootstrap .select2-selection--single .select2-selection__arrow b,\n      .form-group-lg .select2-container--bootstrap .select2-selection--single .select2-selection__arrow b {\n        border-width: 4px 4px 0 4px;\n        margin-left: -4px;\n        margin-left: -10px;\n        margin-top: -2px; }\n  .select2-container--bootstrap .select2-selection--multiple.input-lg,\n  .input-group-lg .select2-container--bootstrap .select2-selection--multiple,\n  .form-group-lg .select2-container--bootstrap .select2-selection--multiple {\n    min-height: 3.16667rem;\n    border-radius: 0.3rem; }\n    .select2-container--bootstrap .select2-selection--multiple.input-lg .select2-selection__choice,\n    .input-group-lg .select2-container--bootstrap .select2-selection--multiple .select2-selection__choice,\n    .form-group-lg .select2-container--bootstrap .select2-selection--multiple .select2-selection__choice {\n      font-size: 1.25rem;\n      line-height: 1.33333;\n      border-radius: 0.25rem;\n      margin: 9px 0 0 8px;\n      padding: 0 10px; }\n    .select2-container--bootstrap .select2-selection--multiple.input-lg .select2-search--inline .select2-search__field,\n    .input-group-lg .select2-container--bootstrap .select2-selection--multiple .select2-search--inline .select2-search__field,\n    .form-group-lg .select2-container--bootstrap .select2-selection--multiple .select2-search--inline .select2-search__field {\n      padding: 0 16px;\n      font-size: 1.25rem;\n      height: 1.16667rem;\n      line-height: 1.33333; }\n    .select2-container--bootstrap .select2-selection--multiple.input-lg .select2-selection__clear,\n    .input-group-lg .select2-container--bootstrap .select2-selection--multiple .select2-selection__clear,\n    .form-group-lg .select2-container--bootstrap .select2-selection--multiple .select2-selection__clear {\n      margin-top: 10px; }\n  .select2-container--bootstrap .select2-selection.input-lg.select2-container--open .select2-selection--single {\n    /**\n     * Make the dropdown arrow point up while the dropdown is visible.\n     */ }\n    .select2-container--bootstrap .select2-selection.input-lg.select2-container--open .select2-selection--single .select2-selection__arrow b {\n      border-color: transparent transparent #999999 transparent;\n      border-width: 0 4px 4px 4px; }\n  .input-group-lg .select2-container--bootstrap .select2-selection.select2-container--open .select2-selection--single {\n    /**\n     * Make the dropdown arrow point up while the dropdown is visible.\n     */ }\n    .input-group-lg .select2-container--bootstrap .select2-selection.select2-container--open .select2-selection--single .select2-selection__arrow b {\n      border-color: transparent transparent #999999 transparent;\n      border-width: 0 4px 4px 4px; }\n  .select2-container--bootstrap[dir=\"rtl\"] {\n    /**\n     * Single Select2\n     *\n     * 1. Makes sure that .select2-selection__placeholder is positioned\n     *    correctly.\n     */\n    /**\n     * Multiple Select2\n     */ }\n    .select2-container--bootstrap[dir=\"rtl\"] .select2-selection--single {\n      padding-left: 24px;\n      padding-right: 12px; }\n      .select2-container--bootstrap[dir=\"rtl\"] .select2-selection--single .select2-selection__rendered {\n        padding-right: 0;\n        padding-left: 0;\n        text-align: right;\n        /* 1 */ }\n      .select2-container--bootstrap[dir=\"rtl\"] .select2-selection--single .select2-selection__clear {\n        float: left; }\n      .select2-container--bootstrap[dir=\"rtl\"] .select2-selection--single .select2-selection__arrow {\n        left: 12px;\n        right: auto; }\n        .select2-container--bootstrap[dir=\"rtl\"] .select2-selection--single .select2-selection__arrow b {\n          margin-left: 0; }\n    .select2-container--bootstrap[dir=\"rtl\"] .select2-selection--multiple .select2-selection__choice,\n    .select2-container--bootstrap[dir=\"rtl\"] .select2-selection--multiple .select2-selection__placeholder {\n      float: right; }\n    .select2-container--bootstrap[dir=\"rtl\"] .select2-selection--multiple .select2-selection__choice {\n      margin-left: 0;\n      margin-right: 6px; }\n    .select2-container--bootstrap[dir=\"rtl\"] .select2-selection--multiple .select2-selection__choice__remove {\n      margin-left: 2px;\n      margin-right: auto; }\n\n/*------------------------------------*  #ADDITIONAL GOODIES\n\\*------------------------------------*/\n/**\n * Address Bootstrap's validation states\n *\n * If a Select2 widget parent has one of Bootstrap's validation state modifier\n * classes, adjust Select2's border colors and focus states accordingly.\n * You may apply said classes to the Select2 dropdown (body > .select2-container)\n * via JavaScript match Bootstraps' to make its styles match.\n *\n * @see http://getbootstrap.com/css/#forms-control-validation\n */\n.has-warning .select2-dropdown,\n.has-warning .select2-selection {\n  border-color: #8a6d3b; }\n\n.has-warning .select2-container--focus .select2-selection,\n.has-warning .select2-container--open .select2-selection {\n  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 6px #c0a16b;\n  border-color: #66512c; }\n\n.has-warning.select2-drop-active {\n  border-color: #66512c; }\n  .has-warning.select2-drop-active.select2-drop.select2-drop-above {\n    border-top-color: #66512c; }\n\n.has-error .select2-dropdown,\n.has-error .select2-selection {\n  border-color: #a94442; }\n\n.has-error .select2-container--focus .select2-selection,\n.has-error .select2-container--open .select2-selection {\n  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 6px #ce8483;\n  border-color: #843534; }\n\n.has-error.select2-drop-active {\n  border-color: #843534; }\n  .has-error.select2-drop-active.select2-drop.select2-drop-above {\n    border-top-color: #843534; }\n\n.has-success .select2-dropdown,\n.has-success .select2-selection {\n  border-color: #3c763d; }\n\n.has-success .select2-container--focus .select2-selection,\n.has-success .select2-container--open .select2-selection {\n  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 6px #67b168;\n  border-color: #2b542c; }\n\n.has-success.select2-drop-active {\n  border-color: #2b542c; }\n  .has-success.select2-drop-active.select2-drop.select2-drop-above {\n    border-top-color: #2b542c; }\n\n/**\n * Select2 widgets in Bootstrap Input Groups\n *\n * When Select2 widgets are combined with other elements using Bootstraps\n * \"Input Group\" component, we don't want specific edges of the Select2\n * container to have a border-radius.\n *\n * Use .select2-bootstrap-prepend and .select2-bootstrap-append on\n * a Bootstrap 3 .input-group to let the contained Select2 widget know which\n * edges should not be rounded as they are directly followed by another element.\n *\n * @see http://getbootstrap.com/components/#input-groups\n */\n/**\n * Mimick Bootstraps .input-group .form-control styles.\n *\n * @see https://github.com/twbs/bootstrap/blob/master/less/input-groups.less\n */\n.input-group .select2-container--bootstrap {\n  display: table;\n  table-layout: fixed;\n  position: relative;\n  z-index: 2;\n  float: left;\n  width: 100%;\n  margin-bottom: 0;\n  /**\n   * Adjust z-index like Bootstrap does to show the focus-box-shadow\n   * above appended buttons in .input-group and .form-group.\n   */ }\n  .input-group .select2-container--bootstrap.select2-container--open, .input-group .select2-container--bootstrap.select2-container--focus {\n    z-index: 3; }\n\n.input-group.select2-bootstrap-prepend .select2-container--bootstrap .select2-selection {\n  border-bottom-left-radius: 0;\n  border-top-left-radius: 0; }\n\n.input-group.select2-bootstrap-append .select2-container--bootstrap .select2-selection {\n  border-bottom-right-radius: 0;\n  border-top-right-radius: 0; }\n\n/**\n * Adjust alignment of Bootstrap buttons in Bootstrap Input Groups to address\n * Multi Select2's height which - depending on how many elements have been selected -\n * may grow taller than its initial size.\n *\n * @see http://getbootstrap.com/components/#input-groups\n */\n.select2-bootstrap-append .select2-container--bootstrap,\n.select2-bootstrap-append .input-group-btn,\n.select2-bootstrap-append .input-group-btn .btn,\n.select2-bootstrap-prepend .select2-container--bootstrap,\n.select2-bootstrap-prepend .input-group-btn,\n.select2-bootstrap-prepend .input-group-btn .btn {\n  vertical-align: top; }\n\n/**\n * Temporary fix for https://github.com/select2/select2-bootstrap-theme/issues/9\n *\n * Provides `!important` for certain properties of the class applied to the\n * original `<select>` element to hide it.\n *\n * @see https://github.com/select2/select2/pull/3301\n * @see https://github.com/fk/select2/commit/31830c7b32cb3d8e1b12d5b434dee40a6e753ada\n */\n.form-control.select2-hidden-accessible {\n  position: absolute !important;\n  width: 1px !important; }\n\n/**\n * Display override for inline forms\n */\n.form-inline .select2-container--bootstrap {\n  display: inline-block; }\n\n/***********************************/\n/**            PARSLEY            **/\n/***********************************/\ninput.parsley-error {\n  border-color: #dd5826;\n  box-shadow: inset 0 1px 1px rgba(221, 88, 38, 0.075); }\n\n.parsley-errors-list {\n  font-size: 85%;\n  padding-left: 0;\n  margin-bottom: 5px; }\n  .parsley-errors-list li {\n    list-style: none;\n    color: #dd5826; }\n\n/**\r\n * select2\r\n */\n.select2-container .select2-choice abbr {\n  background: url(\"assets/select2/select2.png\") right top no-repeat; }\n\n.select2-container .select2-choice .select2-arrow b {\n  background: url(\"assets/select2/select2.png\") no-repeat 0 1px; }\n\n.select2-search input {\n  background: #fff url(\"assets/select2/select2.png\") no-repeat 100% -22px;\n  background: url(\"assets/select2/select2.png\") no-repeat 100% -22px, -webkit-gradient(linear, left bottom, left top, color-stop(0.85, #fff), color-stop(0.99, #eee));\n  background: url(\"assets/select2/select2.png\") no-repeat 100% -22px, -webkit-linear-gradient(center bottom, #fff 85%, #eee 99%);\n  background: url(\"assets/select2/select2.png\") no-repeat 100% -22px, -moz-linear-gradient(center bottom, #fff 85%, #eee 99%);\n  background: url(\"assets/select2/select2.png\") no-repeat 100% -22px, linear-gradient(to bottom, #fff 85%, #eee 99%) 0 0; }\n\nhtml[dir=\"rtl\"] .select2-search input {\n  background: #fff url(\"assets/select2/select2.png\") no-repeat -37px -22px;\n  background: url(\"assets/select2/select2.png\") no-repeat -37px -22px, -webkit-gradient(linear, left bottom, left top, color-stop(0.85, #fff), color-stop(0.99, #eee));\n  background: url(\"assets/select2/select2.png\") no-repeat -37px -22px, -webkit-linear-gradient(center bottom, #fff 85%, #eee 99%);\n  background: url(\"assets/select2/select2.png\") no-repeat -37px -22px, -moz-linear-gradient(center bottom, #fff 85%, #eee 99%);\n  background: url(\"assets/select2/select2.png\") no-repeat -37px -22px, linear-gradient(to bottom, #fff 85%, #eee 99%) 0 0; }\n\n.select2-search-choice-close {\n  background: url(\"assets/select2/select2.png\") right top no-repeat; }\n\n.select2-search input.select2-active {\n  background: #fff url(\"assets/select2/select2-spinner.gif\") no-repeat 100%;\n  background: url(\"assets/select2/select2-spinner.gif\") no-repeat 100%, -webkit-gradient(linear, left bottom, left top, color-stop(0.85, #fff), color-stop(0.99, #eee));\n  background: url(\"assets/select2/select2-spinner.gif\") no-repeat 100%, -webkit-linear-gradient(center bottom, #fff 85%, #eee 99%);\n  background: url(\"assets/select2/select2-spinner.gif\") no-repeat 100%, -moz-linear-gradient(center bottom, #fff 85%, #eee 99%);\n  background: url(\"assets/select2/select2-spinner.gif\") no-repeat 100%, linear-gradient(to bottom, #fff 85%, #eee 99%) 0 0; }\n\n.select2-more-results.select2-active {\n  background: #f4f4f4 url(\"assets/select2/select2-spinner.gif\") no-repeat 100%; }\n\n.select2-container-multi .select2-choices .select2-search-field input.select2-active {\n  background: #fff url(\"assets/select2/select2-spinner.gif\") no-repeat 100% !important; }\n\n/* Retina-ize icons */\n@media only screen and (-webkit-min-device-pixel-ratio: 1.5), only screen and (min-resolution: 2dppx) {\n  .select2-search input,\n  .select2-search-choice-close,\n  .select2-container .select2-choice abbr,\n  .select2-container .select2-choice .select2-arrow b {\n    background-image: url(\"assets/select2/select2x2.png\") !important; } }\n\n/***********************************/\n/**          FORM WIZARD          **/\n/***********************************/\n.form-wizard .nav-pills > li > a {\n  padding-top: 15px;\n  padding-bottom: 15px;\n  background-color: #eeeeee;\n  color: #999999;\n  border-radius: 3px;\n  cursor: default; }\n\n.form-wizard .nav-pills > li.active > a {\n  background-color: #5d8fc2;\n  color: #fff; }\n\n.form-wizard .nav-pills > li.done > a {\n  background-color: #c5d7e9;\n  color: #fff;\n  cursor: pointer; }\n\n@media (min-width: 768px) {\n  .form-wizard .nav-pills.nav-justified > li {\n    padding: 0 5px; }\n    .form-wizard .nav-pills.nav-justified > li:first-child {\n      padding-left: 0; }\n    .form-wizard .nav-pills.nav-justified > li:last-child {\n      padding-right: 0; } }\n\n.form-wizard .tab-pane {\n  padding: 1rem 20px;\n  border-radius: 5px; }\n\n.form-wizard .pager > li.disabled > .btn {\n  cursor: not-allowed;\n  pointer-events: none;\n  opacity: .65;\n  box-shadow: none; }\n\n.form-wizard .pager {\n  padding-left: 0;\n  margin-top: 1rem; }\n  .form-wizard .pager li {\n    display: inline; }\n\n.form-wizard .pager.wizard {\n  display: block; }\n\n/***********************************/\n/**         MODAL WIZARD          **/\n/***********************************/\n.wizard-header h3 {\n  font-family: \"Open Sans\", sans-serif;\n  font-weight: 300;\n  color: #555555; }\n\n.wizard-nav-list > li.already-visited > a.wizard-nav-link,\n.wizard-nav-list > li.already-visited.active > a.wizard-nav-link {\n  color: #555555; }\n\n.wizard-nav-item:not(.active) > .wizard-nav-link:hover {\n  background-color: #eeeeee; }\n\n.wizard-nav-list li.active > a,\n.wizard-nav-item .already-visited .active {\n  background-color: #5dc4bf;\n  color: #fff; }\n\n.wizard-dialog {\n  max-width: none; }\n\n.wizard-dialog .popover.error-popover .arrow {\n  border-right-color: transparent; }\n\n.wizard-nav-list li > a {\n  display: inline-block;\n  text-decoration: none;\n  width: 100%;\n  padding: 10px 15px; }\n\n.wizard-steps {\n  width: 30%; }\n\n.popover-body-error {\n  padding: 0; }\n\n.popover-content-error {\n  background-color: #F2DEDE;\n  color: #B94A48;\n  border-color: #953B39;\n  border-radius: 0.3rem; }\n\n.popover.popover-right .popover-arrow-error::after,\n.popover.bs-tether-element-attached-left .popover-arrow-error::after {\n  border-right-color: #F2DEDE; }\n\n.modal-header .close {\n  margin-top: -15px; }\n"

/***/ },

/***/ 830:
/***/ function(module, exports) {

module.exports = "<ol class=\"breadcrumb\">\r\n  <li class=\"breadcrumb-item\">YOU ARE HERE</li>\r\n  <li class=\"breadcrumb-item active\">Form Elements</li>\r\n</ol>\r\n<h1 class=\"page-title\">Form - <span class=\"fw-semi-bold\">Inputs & Controls</span></h1>\r\n\r\n<div class=\"row\">\r\n  <div class=\"col-lg-6\">\r\n    <section class=\"widget\" widget>\r\n      <header>\r\n        <h6>\r\n          Inputs\r\n        </h6>\r\n        <div class=\"widget-controls\">\r\n          <a href=\"#\"><i class=\"glyphicon glyphicon-cog\"></i></a>\r\n          <a href=\"#\"><i class=\"fa fa-refresh\"></i></a>\r\n          <a href=\"#\" data-widgster=\"close\"><i class=\"glyphicon glyphicon-remove\"></i></a>\r\n        </div>\r\n      </header>\r\n      <div class=\"widget-body\">\r\n        <form class=\"form-horizontal\" role=\"form\">\r\n          <fieldset>\r\n            <legend><strong>Horizontal</strong> form</legend>\r\n            <div class=\"form-group row\">\r\n              <label for=\"normal-field\" class=\"col-md-4  col-form-label text-md-right\">Normal field</label>\r\n              <div class=\"col-md-7 \">\r\n                <input type=\"text\" id=\"normal-field\" class=\"form-control\" placeholder=\"May have placeholder\">\r\n              </div>\r\n            </div>\r\n            <div class=\"form-group row\">\r\n              <label for=\"hint-field\" class=\"col-md-4 col-form-label text-md-right\">\r\n                Label hint\r\n                <span class=\"help-block\">Some help text</span>\r\n              </label>\r\n              <div class=\"col-md-7 \">\r\n                <input type=\"text\" id=\"hint-field\" class=\"form-control\">\r\n              </div>\r\n            </div>\r\n            <div class=\"form-group row\">\r\n              <label class=\"col-md-4  col-form-label text-md-right\" for=\"tooltip-enabled\">Tooltip enabled</label>\r\n              <div class=\"col-md-7 \">\r\n                <input type=\"text\" id=\"tooltip-enabled\" class=\"form-control\"\r\n                       placement=\"top\" tooltip=\"Some explanation text here\"\r\n                       placeholder=\"Hover over me..\">\r\n              </div>\r\n            </div>\r\n            <div class=\"form-group row\">\r\n              <label class=\"col-md-4  col-form-label text-md-right\" for=\"disabled-input\">Disabled input</label>\r\n              <div class=\"col-md-7 \">\r\n                <input type=\"text\" id=\"disabled-input\" class=\"form-control\"\r\n                       disabled=\"disabled\" value=\"Default value\" >\r\n              </div>\r\n            </div>\r\n            <div class=\"form-group row\">\r\n              <label class=\"col-md-4  col-form-label text-md-right\" for=\"max-length\">Max length</label>\r\n              <div class=\"col-md-7 \">\r\n                <input type=\"text\" id=\"max-length\" maxlength=\"3\"\r\n                       class=\"form-control\"\r\n                       placeholder=\"Max length 3 characters\"\r\n                       placement=\"top\" tooltip=\"You cannot write more than 3 characters.\">\r\n              </div>\r\n            </div>\r\n            <div class=\"form-group row\">\r\n              <label class=\"col-md-4  col-form-label text-md-right\" for=\"prepended-input\">Prepended input</label>\r\n              <div class=\"col-md-7 \">\r\n                <div class=\"input-group\">\r\n                  <span class=\"input-group-addon\"><i class=\"fa fa-user\"></i></span>\r\n                  <input id=\"prepended-input\" class=\"form-control\" size=\"16\" type=\"text\" placeholder=\"Username\">\r\n                </div>\r\n              </div>\r\n            </div>\r\n            <div class=\"form-group row\">\r\n              <label class=\"col-md-4  col-form-label text-md-right\" for=\"password-field\">Password</label>\r\n              <div class=\"col-md-7 \">\r\n                <div class=\"input-group\">\r\n                  <span class=\"input-group-addon\"><i class=\"fa fa-lock\"></i></span>\r\n                  <input type=\"password\" class=\"form-control\" id=\"password-field\" placeholder=\"Password\">\r\n                </div>\r\n              </div>\r\n            </div>\r\n            <div class=\"form-group row\">\r\n              <label class=\"col-md-4  col-form-label text-md-right\" for=\"appended-input\">Appended input</label>\r\n              <div class=\"col-md-7 \">\r\n                <div class=\"input-group\">\r\n                  <input id=\"appended-input\" class=\"form-control\" size=\"16\" type=\"text\">\r\n                  <span class=\"input-group-addon\">.00</span>\r\n                </div>\r\n              </div>\r\n            </div>\r\n            <div class=\"form-group row\">\r\n              <label class=\"col-md-4  col-form-label text-md-right\" for=\"combined-input\">Combined</label>\r\n              <div class=\"col-md-7 \">\r\n                <div class=\"input-group\">\r\n                  <span class=\"input-group-addon\">$</span>\r\n                  <input id=\"combined-input\" class=\"form-control\" size=\"16\" type=\"text\">\r\n                  <span class=\"input-group-addon\">.00</span>\r\n                </div>\r\n              </div>\r\n            </div>\r\n            <div class=\"form-group row\">\r\n              <label class=\"col-md-4  col-form-label text-md-right\" for=\"transparent-input\">\r\n                Append Transparent\r\n              </label>\r\n              <div class=\"col-md-7 \">\r\n                <div class=\"input-group input-group-transparent\">\r\n                  <input id=\"transparent-input\" class=\"form-control\" type=\"text\">\r\n                  <span class=\"input-group-addon\">\r\n                    <i class=\"fa fa-camera\"></i>\r\n                  </span>\r\n                </div>\r\n              </div>\r\n            </div>\r\n          </fieldset>\r\n          <div class=\"form-actions\">\r\n            <div class=\"row\">\r\n              <div class=\"offset-md-4 col-md-7 \">\r\n                <button type=\"submit\" class=\"btn btn-primary\">Save Changes</button>\r\n                <button type=\"button\" class=\"btn btn-inverse\">Cancel</button>\r\n              </div>\r\n            </div>\r\n          </div>\r\n        </form>\r\n      </div>\r\n    </section>\r\n  </div>\r\n  <div class=\"col-lg-6\">\r\n    <section class=\"widget\" widget>\r\n      <header>\r\n        <h6>\r\n          Prepended and appended inputs\r\n        </h6>\r\n        <div class=\"widget-controls\">\r\n          <a href=\"#\"><i class=\"glyphicon glyphicon-cog\"></i></a>\r\n          <a href=\"#\"><i class=\"fa fa-refresh\"></i></a>\r\n          <a href=\"#\" data-widgster=\"close\"><i class=\"glyphicon glyphicon-remove\"></i></a>\r\n        </div>\r\n      </header>\r\n      <div class=\"widget-body\">\r\n        <form role=\"form\">\r\n          <fieldset>\r\n            <legend><strong>Default</strong> Form</legend>\r\n            <div class=\"row\">\r\n              <div class=\"col-md-8 \">\r\n                <div class=\"form-group\">\r\n                  <label for=\"search-input\">Search type input</label>\r\n                  <div class=\"input-group\">\r\n                    <input type=\"search\" class=\"form-control\" id=\"search-input\">\r\n                    <span class=\"input-group-btn\">\r\n                      <button type=\"button\" class=\"btn btn-secondary\">Search</button>\r\n                    </span>\r\n                  </div>\r\n                </div>\r\n                <div class=\"form-group\">\r\n                  <label for=\"bar\">Whole bar appended</label>\r\n                  <div class=\"input-group\">\r\n                    <input type=\"text\" class=\"form-control\" id=\"bar\">\r\n                    <div class=\"input-group-btn\">\r\n                      <button type=\"button\" class=\"btn btn-danger\"><i class=\"fa fa-pencil\"></i></button>\r\n                      <button type=\"button\" class=\"btn btn-warning\"><i class=\"fa fa-plus\"></i></button>\r\n                      <button type=\"button\" class=\"btn btn-success\"><i class=\"fa fa-refresh\"></i></button>\r\n                    </div>\r\n                  </div>\r\n                </div>\r\n                <div class=\"form-group\">\r\n                  <label for=\"dropdown-appended\">Actions dropdown</label>\r\n                  <div class=\"input-group\">\r\n                    <input type=\"text\" class=\"form-control\" id=\"dropdown-appended\">\r\n                    <div class=\"input-group-btn\" data-dropdown>\r\n                      <button class=\"btn btn-success dropdown-toggle\" data-toggle=\"dropdown\">\r\n                        Action\r\n                        <i class=\"fa fa-caret-down\"></i>\r\n                      </button>\r\n                      <ul class=\"dropdown-menu\">\r\n                        <li><a class=\"dropdown-item\" href=\"#\">Action</a></li>\r\n                        <li><a class=\"dropdown-item\" href=\"#\">Another action</a></li>\r\n                        <li><a class=\"dropdown-item\" href=\"#\">Something else here</a></li>\r\n                        <li class=\"dropdown-divider\"></li>\r\n                        <li><a class=\"dropdown-item\" href=\"#\">Separated link</a></li>\r\n                      </ul>\r\n                    </div>\r\n                  </div>\r\n                </div>\r\n                <div class=\"form-group\">\r\n                  <label for=\"segmented-dropdown\">Segmented dropdown</label>\r\n                  <div class=\"input-group\">\r\n                    <input id=\"segmented-dropdown\" class=\"form-control\" type=\"text\">\r\n                    <div class=\"input-group-btn\" data-dropdown>\r\n                      <button class=\"btn btn-warning\">Action</button>\r\n                      <button class=\"btn btn-warning dropdown-toggle\" data-toggle=\"dropdown\">\r\n                        <i class=\"fa fa-caret-down\"></i>\r\n                      </button>\r\n                      <ul class=\"dropdown-menu\">\r\n                        <li><a class=\"dropdown-item\" href=\"#\">Action</a></li>\r\n                        <li><a class=\"dropdown-item\" href=\"#\">Another action</a></li>\r\n                        <li><a class=\"dropdown-item\" href=\"#\">Something else here</a></li>\r\n                        <li class=\"dropdown-divider\"></li>\r\n                        <li><a class=\"dropdown-item\" href=\"#\">Separated link</a></li>\r\n                      </ul>\r\n                    </div>\r\n                  </div>\r\n                  <span class=\"help-block\">Anything can be appended to the right</span>\r\n                </div>\r\n                <div class=\"form-group\">\r\n                  <label for=\"type-dropdown-appended\">Types dropdown</label>\r\n\r\n                  <div class=\"input-group\">\r\n                    <input type=\"text\" class=\"form-control\" id=\"type-dropdown-appended\">\r\n                    <div class=\"input-group-btn\">\r\n                      <select id=\"phone-type\" class=\"selectpicker\"\r\n                              data-style=\"btn-primary\"\r\n                              data-width=\"auto\">\r\n                        <option>Another type</option>\r\n                        <option>Type one</option>\r\n                        <option>Next type</option>\r\n                      </select>\r\n                    </div>\r\n                  </div>\r\n                  <p class=\"help-block\">You can select some type of a field just right in the place.</p>\r\n                </div>\r\n                <div class=\"form-group\">\r\n                  <label for=\"no-borders-input\">Transparent input</label>\r\n                  <input id=\"no-borders-input\" class=\"form-control input-no-border bg-gray-lighter\" type=\"text\"\r\n                         placeholder=\"Search Dashboard\">\r\n                  <p class=\"help-block\">With <code>.bg-gray-lighter</code>. White by default.</p>\r\n                </div>\r\n              </div>\r\n            </div>\r\n          </fieldset>\r\n          <div class=\"form-actions\">\r\n            <button type=\"submit\" class=\"btn btn-inverse\">Save Changes</button>\r\n            <button type=\"button\" class=\"btn btn-secondary\">Cancel</button>\r\n          </div>\r\n        </form>\r\n      </div>\r\n    </section>\r\n  </div>\r\n</div>\r\n<div class=\"row\">\r\n  <div class=\"col-lg-8 \">\r\n    <section class=\"widget\" widget>\r\n      <header>\r\n        <h6>\r\n          Form <span class=\"fw-semi-bold\">Options</span>\r\n        </h6>\r\n        <div class=\"widget-controls\">\r\n          <a class=\"bg-gray-transparent\" href=\"#\"><i class=\"glyphicon glyphicon-cog text-white\"></i></a>\r\n          <a href=\"#\"><i class=\"fa fa-refresh\"></i></a>\r\n          <a href=\"#\" data-widgster=\"close\"><i class=\"glyphicon glyphicon-remove\"></i></a>\r\n        </div>\r\n      </header>\r\n      <div class=\"widget-body\">\r\n        <form role=\"form\">\r\n          <fieldset>\r\n            <legend>\r\n              Control sizing\r\n            </legend>\r\n            <p>\r\n              Set input heights using classes like <code>.input-lg</code> and <code>.input-sm</code>.\r\n              Also works with <code>type=\"search\"</code> inputs and selects. For input groups use\r\n              <code>.input-group-lg</code> & <code>.input-group-sm</code>.\r\n            </p>\r\n            <br/>\r\n            <div class=\"form-group\">\r\n              <input type=\"text\" class=\"form-control form-control-lg\" placeholder=\".input-lg\">\r\n            </div>\r\n            <div class=\"form-group\">\r\n              <input type=\"text\" class=\"form-control\" placeholder=\"default input\">\r\n            </div>\r\n            <div class=\"form-group\">\r\n              <input type=\"text\" class=\"form-control form-control-sm\" placeholder=\".input-sm\">\r\n            </div>\r\n          </fieldset>\r\n        </form>\r\n      </div>\r\n    </section>\r\n  </div>\r\n  <div class=\"col-lg-4 \">\r\n    <section class=\"widget\" widget>\r\n      <header>\r\n        <h6>\r\n          Form <span class=\"fw-semi-bold\">Options</span>\r\n        </h6>\r\n        <div class=\"widget-controls\">\r\n          <a class=\"bg-gray-transparent\" href=\"#\"><i class=\"glyphicon glyphicon-cog text-white\"></i></a>\r\n          <a href=\"#\"><i class=\"fa fa-refresh\"></i></a>\r\n          <a href=\"#\" data-widgster=\"close\"><i class=\"glyphicon glyphicon-remove\"></i></a>\r\n        </div>\r\n      </header>\r\n      <div class=\"widget-body\">\r\n        <form role=\"form\">\r\n          <fieldset>\r\n            <legend>\r\n              Input Groups\r\n            </legend>\r\n            <p>\r\n              Different colors & sizes for any elements including input groups. Elements may be\r\n              easily styled with classes like <code>.bg-primary</code> or <code>.bg-transparent</code>\r\n            </p>\r\n            <br/>\r\n            <div class=\"form-group\">\r\n              <div class=\"input-group\">\r\n                <span class=\"input-group-addon bg-transparent\"><i class=\"fa fa-github-alt\"></i></span>\r\n                <input class=\"form-control\" size=\"16\" type=\"text\" placeholder=\"First Name\">\r\n              </div>\r\n            </div>\r\n            <div class=\"form-group\">\r\n              <div class=\"input-group input-group-lg\">\r\n                <span class=\"input-group-addon\"><i class=\"fa fa-bars\"></i></span>\r\n                <input class=\"form-control\" size=\"16\" type=\"text\" placeholder=\"Username\">\r\n              </div>\r\n            </div>\r\n            <div class=\"form-group\">\r\n              <div class=\"input-group input-group-sm\">\r\n                <input class=\"form-control\" size=\"16\" type=\"text\" placeholder=\"City\">\r\n                <span class=\"input-group-addon bg-danger text-white\"><i class=\"fa fa-code-fork\"></i></span>\r\n              </div>\r\n            </div>\r\n          </fieldset>\r\n        </form>\r\n      </div>\r\n    </section>\r\n  </div>\r\n</div>\r\n<div class=\"row\">\r\n  <div class=\"col-lg-6 \">\r\n    <section class=\"widget\" widget>\r\n      <header>\r\n        <h6>\r\n          <i class=\"fa fa-font\"></i>\r\n          Textareas\r\n        </h6>\r\n        <div class=\"widget-controls\">\r\n          <a href=\"#\"><i class=\"glyphicon glyphicon-cog\"></i></a>\r\n          <a href=\"#\"><i class=\"fa fa-refresh\"></i></a>\r\n          <a href=\"#\" data-widgster=\"close\"><i class=\"glyphicon glyphicon-remove\"></i></a>\r\n        </div>\r\n      </header>\r\n      <div class=\"widget-body\">\r\n        <form class=\"form-horizontal\" role=\"form\">\r\n          <fieldset>\r\n            <legend>Small form</legend>\r\n            <div class=\"form-group row\">\r\n              <label class=\"col-md-3  col-form-label text-md-right\" for=\"default-textarea\">Default textarea</label>\r\n              <div class=\"col-md-9 \">\r\n                <textarea rows=\"4\" class=\"form-control\" id=\"default-textarea\"></textarea>\r\n              </div>\r\n            </div>\r\n            <div class=\"form-group row\">\r\n              <label class=\"col-md-3  col-form-label text-md-right\" for=\"elastic-textarea\">\r\n                Auto-growing textarea\r\n              </label>\r\n              <div class=\"col-md-9 \">\r\n                  <textarea rows=\"3\" class=\"autogrow form-control transition-height\" id=\"elastic-textarea\"\r\n                            autosize\r\n                            placeholder=\"Try to add few new lines..\"></textarea>\r\n              </div>\r\n            </div>\r\n            <div class=\"form-group row\">\r\n              <label class=\"col-md-3  col-form-label text-md-right\">\r\n                Wysiwyg\r\n                <span class=\"help-block\">\r\n                  With bottom toolbar appended\r\n                </span>\r\n              </label>\r\n              <div class=\"col-md-9 \">\r\n                <alert [type]=\"'warning'\">There are no implementations of Wysiwyg editors for Angular 2 yet.\r\n                  Hopefully they are going to appear soon!</alert>\r\n              </div>\r\n            </div>\r\n            <div class=\"form-group row\">\r\n              <label class=\"col-md-3  col-form-label text-md-right\" for=\"markdown-editor\">\r\n                Markdown Editor\r\n              </label>\r\n              <div class=\"col-md-9 \">\r\n                  <textarea class=\"form-control\" id=\"markdown-editor\" data-provide=\"markdown\" rows=\"6\">### Hello there\r\nHow are you?\r\n\r\nI have bellow task for you :\r\n\r\nSelect from this text...\r\nClick the bold on THIS WORD and make THESE ONE italic\r\nLink GOOGLE to google.com\r\nTest to insert image (and try to tab after write the image description)\r\nTest Preview\r\nAnd ending here... Click \"List\"\r\n\r\nEnjoy!\r\n                  </textarea>\r\n              </div>\r\n            </div>\r\n          </fieldset>\r\n        </form>\r\n      </div>\r\n    </section>\r\n  </div>\r\n  <div class=\"col-lg-6 \">\r\n    <section class=\"widget\" widget>\r\n      <header>\r\n        <h6>\r\n          <i class=\"fa fa-list-alt\"></i>\r\n          Selects\r\n        </h6>\r\n        <div class=\"widget-controls\">\r\n          <a href=\"#\"><i class=\"glyphicon glyphicon-cog\"></i></a>\r\n          <a href=\"#\"><i class=\"fa fa-refresh\"></i></a>\r\n          <a href=\"#\" data-widgster=\"close\"><i class=\"glyphicon glyphicon-remove\"></i></a>\r\n        </div>\r\n      </header>\r\n      <div class=\"widget-body\">\r\n        <form class=\"form-horizontal form-label-left\" role=\"form\">\r\n          <fieldset>\r\n            <legend>Default form with labels on left</legend>\r\n            <div class=\"form-group row\">\r\n              <label class=\"col-md-4 col-form-label\" for=\"default-select\">Default select</label>\r\n              <div class=\"col-md-8 \">\r\n                <select2 id=\"default-select\"\r\n                         (valueChanged)=\"select2Changed($event)\"\r\n                         [data]=\"getSelect2DefaultList()\" [options]=\"select2Options\" [width]=\"250\"></select2>\r\n                <p *ngIf=\"selected\" class=\"help-block mb-0\">Selected value in select 2: <b>{{selected}}</b>.</p>\r\n              </div>\r\n            </div>\r\n            <div class=\"form-group row\">\r\n              <label class=\"col-md-4 col-form-label\" for=\"grouped-select\">Select with search & groups</label>\r\n              <div class=\"col-md-8 \">\r\n                <select2 id=\"grouped-select\"\r\n                         [data]=\"getSelect2GroupedList()\" [options]=\"select2Options\" [width]=\"250\"></select2>\r\n              </div>\r\n            </div>\r\n          </fieldset>\r\n          <fieldset>\r\n            <legend>Dropdown based colored selects</legend>\r\n            <div class=\"form-group row\">\r\n              <label class=\"col-md-4  col-form-label\" for=\"simple-select\">Simple select</label>\r\n              <div class=\"col-md-8 \">\r\n                <select class=\"selectpicker\" data-style=\"btn-secondary\"\r\n                        data-width=\"auto\"\r\n                        tabindex=\"-1\" id=\"simple-select\">\r\n                  <option value=\"0\">Option One</option>\r\n                  <option value=\"1\">Option Two</option>\r\n                  <option value=\"2\">Option Three</option>\r\n                </select>\r\n                <span class=\"help-block\">Auto size</span>\r\n              </div>\r\n            </div>\r\n            <div class=\"form-group row\">\r\n              <label class=\"col-md-4  col-form-label\" for=\"simple-red-select\">\r\n                Colored ones\r\n                  <span class=\"help-block\">\r\n                    A bit of Japanese\r\n                  </span>\r\n              </label>\r\n              <div class=\"col-md-8 \">\r\n                <select class=\"selectpicker\"\r\n                        data-style=\"btn-danger btn-sm\"\r\n                        data-width=\"auto\"\r\n                        tabindex=\"-1\" id=\"simple-red-select\">\r\n                  <option value=\"0\">Ichi</option>\r\n                  <option value=\"1\">Ni</option>\r\n                  <option value=\"2\">San</option>\r\n                </select>\r\n                <select class=\"selectpicker\"\r\n                        data-style=\"btn-warning btn-sm\"\r\n                        data-width=\"auto\"\r\n                        tabindex=\"-1\" id=\"simple-orange-select\">\r\n                  <option value=\"0\">Shi</option>\r\n                  <option value=\"1\">Go</option>\r\n                  <option value=\"2\">Roku</option>\r\n                </select>\r\n                <select class=\"selectpicker\"\r\n                        data-style=\"btn-success btn-sm\"\r\n                        data-width=\"auto\"\r\n                        tabindex=\"-1\" id=\"simple-green-select\">\r\n                  <option value=\"0\">Hichi</option>\r\n                  <option value=\"1\">Hachi</option>\r\n                  <option value=\"2\">Ku</option>\r\n                  <option value=\"3\">Ju</option>\r\n                </select>\r\n              </div>\r\n            </div>\r\n            <div class=\"form-group row\">\r\n              <label class=\"col-md-4  col-form-label\" for=\"simple-big-select\">\r\n                Big One\r\n                  <span class=\"help-block\">\r\n                    Size can be controlled with <code>.btn-lg</code> & <code>.btn-sm</code>\r\n                  </span>\r\n              </label>\r\n              <div class=\"col-md-8 \">\r\n                <select class=\"selectpicker\"\r\n                        data-style=\"btn-secondary btn-lg\"\r\n                        tabindex=\"-1\" id=\"simple-big-select\">\r\n                  <option value=\"0\">Fourth Item</option>\r\n                  <option value=\"1\">Fifth Item</option>\r\n                  <option value=\"2\">Sixth item</option>\r\n                </select>\r\n              </div>\r\n            </div>\r\n          </fieldset>\r\n        </form>\r\n      </div>\r\n    </section>\r\n  </div>\r\n</div>\r\n<div class=\"row\">\r\n  <div class=\"col-lg-12 \">\r\n    <section class=\"widget\" widget>\r\n      <header>\r\n        <h6>\r\n          Checkbox <strong>Controls</strong>\r\n        </h6>\r\n        <div class=\"widget-controls\">\r\n          <a class=\"bg-gray-transparent\" href=\"#\"><i class=\"glyphicon glyphicon-cog text-white\"></i></a>\r\n          <a href=\"#\"><i class=\"fa fa-refresh\"></i></a>\r\n          <a href=\"#\" data-widgster=\"close\"><i class=\"glyphicon glyphicon-remove\"></i></a>\r\n        </div>\r\n      </header>\r\n      <div class=\"widget-body\">\r\n        <form role=\"form\">\r\n          <div class=\"row\">\r\n            <div class=\"col-lg-4 \">\r\n              <fieldset>\r\n                <legend>\r\n                  Basic\r\n                </legend>\r\n                <p>\r\n                  Supports bootstrap brand colors: <code>.abc-checkbox-primary</code>, <code>.abc-checkbox-info</code> etc.\r\n                  Pure <abbr title=\"Cascading Style Sheet\">css</abbr> solution with no javascript.\r\n                  Let your checkboxes shine!\r\n                </p>\r\n                <div class=\"checkbox abc-checkbox\">\r\n                  <input id=\"checkbox1\" type=\"checkbox\">\r\n                  <label for=\"checkbox1\">\r\n                    Default\r\n                  </label>\r\n                </div>\r\n                <div class=\"checkbox abc-checkbox abc-checkbox-primary\">\r\n                  <input id=\"checkbox2\" type=\"checkbox\" checked>\r\n                  <label for=\"checkbox2\">\r\n                    Primary\r\n                  </label>\r\n                </div>\r\n                <div class=\"checkbox abc-checkbox abc-checkbox-success\">\r\n                  <input id=\"checkbox3\" type=\"checkbox\">\r\n                  <label for=\"checkbox3\">\r\n                    Success\r\n                  </label>\r\n                </div>\r\n                <div class=\"checkbox abc-checkbox abc-checkbox-info\">\r\n                  <input id=\"checkbox4\" type=\"checkbox\" checked>\r\n                  <label for=\"checkbox4\">\r\n                    Info\r\n                  </label>\r\n                </div>\r\n                <div class=\"checkbox abc-checkbox abc-checkbox-warning\">\r\n                  <input id=\"checkbox5\" type=\"checkbox\">\r\n                  <label for=\"checkbox5\">\r\n                    Warning\r\n                  </label>\r\n                </div>\r\n                <div class=\"checkbox abc-checkbox abc-checkbox-danger\">\r\n                  <input id=\"checkbox6\" type=\"checkbox\" checked>\r\n                  <label for=\"checkbox6\">\r\n                    Check me out\r\n                  </label>\r\n                </div>\r\n              </fieldset>\r\n            </div>\r\n            <div class=\"col-lg-4 \">\r\n              <fieldset>\r\n                <legend>\r\n                  Circled\r\n                </legend>\r\n                <p>\r\n                  <code>.abc-checkbox-circle</code> for roundness. No more sad controls controls.\r\n                  Check out this brand-new rounded checkboxes!\r\n                </p>\r\n                <div class=\"checkbox abc-checkbox abc-checkbox-circle\">\r\n                  <input id=\"checkbox7\" type=\"checkbox\">\r\n                  <label for=\"checkbox7\">\r\n                    Simply Rounded\r\n                  </label>\r\n                </div>\r\n                <div class=\"checkbox abc-checkbox abc-checkbox-info abc-checkbox-circle\">\r\n                  <input id=\"checkbox8\" type=\"checkbox\" checked>\r\n                  <label for=\"checkbox8\">\r\n                    Me too\r\n                  </label>\r\n                </div>\r\n              </fieldset>\r\n            </div>\r\n            <div class=\"col-lg-4 \">\r\n              <fieldset>\r\n                <legend>\r\n                  Disabled\r\n                </legend>\r\n                <p>\r\n                  Disabled state also supported. Full stack checkbox functionality.\r\n                </p>\r\n                <div class=\" checkbox abc-checkbox\">\r\n                  <input id=\"checkbox9\" type=\"checkbox\" disabled>\r\n                  <label for=\"checkbox9\">\r\n                    Can't check this\r\n                  </label>\r\n                </div>\r\n                <div class=\"checkbox abc-checkbox abc-checkbox-success\">\r\n                  <input id=\"checkbox10\" type=\"checkbox\" disabled checked>\r\n                  <label for=\"checkbox10\">\r\n                    This too\r\n                  </label>\r\n                </div>\r\n                <div class=\"checkbox abc-checkbox abc-checkbox-warning abc-checkbox-circle\">\r\n                  <input id=\"checkbox11\" type=\"checkbox\" disabled checked>\r\n                  <label for=\"checkbox11\">\r\n                    And this\r\n                  </label>\r\n                </div>\r\n              </fieldset>\r\n            </div>\r\n          </div>\r\n          <p class=\"fs-mini\">Built with <a href=\"https://github.com/flatlogic/awesome-bootstrap-checkbox\" target=\"_blank\">awesome-bootstrap-checkbox</a>.</p>\r\n        </form>\r\n      </div>\r\n    </section>\r\n  </div>\r\n</div>\r\n<div class=\"row\">\r\n  <div class=\"col-lg-12 \">\r\n    <section class=\"widget\" widget>\r\n      <header>\r\n        <h6>\r\n          Radio <strong>Controls</strong>\r\n        </h6>\r\n        <div class=\"widget-controls\">\r\n          <a class=\"bg-gray-transparent\" href=\"#\"><i class=\"glyphicon glyphicon-cog text-white\"></i></a>\r\n          <a href=\"#\"><i class=\"fa fa-refresh\"></i></a>\r\n          <a href=\"#\" data-widgster=\"close\"><i class=\"glyphicon glyphicon-remove\"></i></a>\r\n        </div>\r\n      </header>\r\n      <div class=\"widget-body\">\r\n        <form role=\"form\">\r\n          <div class=\"row\">\r\n            <div class=\"col-lg-4 \">\r\n              <fieldset>\r\n                <legend>\r\n                  Basic\r\n                </legend>\r\n                <p>\r\n                  Supports bootstrap brand colors: <code>.abc-radio-primary</code>, <code>.abc-radio-danger</code> etc.\r\n                  Pure css solution with no javascript. Let your radios shine!\r\n                </p>\r\n                <div class=\"row\">\r\n                  <div class=\"col-md-6 \">\r\n                    <div class=\"radio abc-radio\">\r\n                      <input type=\"radio\" name=\"radio1\" id=\"radio1\" value=\"option1\" checked>\r\n                      <label for=\"radio1\">\r\n                        Small\r\n                      </label>\r\n                    </div>\r\n                    <div class=\"radio abc-radio\">\r\n                      <input type=\"radio\" name=\"radio1\" id=\"radio2\" value=\"option2\">\r\n                      <label for=\"radio2\">\r\n                        Big\r\n                      </label>\r\n                    </div>\r\n                  </div>\r\n                  <div class=\"col-md-6 \">\r\n                    <div class=\"radio abc-radio abc-radio-danger\">\r\n                      <input type=\"radio\" name=\"radio2\" id=\"radio3\" value=\"option1\">\r\n                      <label for=\"radio3\">\r\n                        Next\r\n                      </label>\r\n                    </div>\r\n                    <div class=\"radio abc-radio abc-radio-danger\">\r\n                      <input type=\"radio\" name=\"radio2\" id=\"radio4\" value=\"option2\" checked>\r\n                      <label for=\"radio4\">\r\n                        One\r\n                      </label>\r\n                    </div>\r\n                  </div>\r\n                </div>\r\n              </fieldset>\r\n            </div>\r\n            <div class=\"col-lg-4 \">\r\n              <fieldset>\r\n                <legend>\r\n                  Disabled\r\n                </legend>\r\n                <p>\r\n                  Disabled state also supported. Full stack radios functionality.\r\n                </p>\r\n                <div class=\"radio abc-radio\">\r\n                  <input type=\"radio\" name=\"radio3\" id=\"radio5\" value=\"option1\" disabled>\r\n                  <label for=\"radio5\">\r\n                    Next\r\n                  </label>\r\n                </div>\r\n                <div class=\"radio abc-radio abc-radio-warning\">\r\n                  <input type=\"radio\" name=\"radio3\" id=\"radio6\" value=\"option2\" checked disabled>\r\n                  <label for=\"radio6\">\r\n                    One\r\n                  </label>\r\n                </div>\r\n              </fieldset>\r\n            </div>\r\n            <div class=\"col-lg-4 \">\r\n              <fieldset>\r\n                <legend>\r\n                  Cool iOS-like switches\r\n                </legend>\r\n                <p>\r\n                  Simple component that helps you turn your default HTML checkbox inputs into\r\n                  beautiful iOS 7 style switches in just few simple steps.\r\n                </p>\r\n                <div class=\"display-inline-block checkbox-ios\">\r\n                  <label for=\"checkbox-ios1\" class=\"switch\">\r\n                    <input type=\"checkbox\" class=\"ios\" checked id=\"checkbox-ios1\"><i></i>\r\n                  </label>\r\n                </div>\r\n                <div class=\"display-inline-block checkbox-ios ml\">\r\n                  <label for=\"checkbox-ios2\" class=\"switch\">\r\n                    <input type=\"checkbox\" class=\"ios\" id=\"checkbox-ios2\"><i></i>\r\n                  </label>\r\n                </div>\r\n              </fieldset>\r\n            </div>\r\n          </div>\r\n        </form>\r\n      </div>\r\n    </section>\r\n  </div>\r\n</div>\r\n<div class=\"row\">\r\n  <div class=\"col-lg-6 col-12\">\r\n    <section class=\"widget\" widget>\r\n      <header>\r\n        <h6>\r\n          Pickers\r\n        </h6>\r\n        <div class=\"widget-controls\">\r\n          <a class=\"bg-gray-transparent\" href=\"#\"><i class=\"glyphicon glyphicon-cog text-white\"></i></a>\r\n          <a href=\"#\"><i class=\"fa fa-refresh\"></i></a>\r\n          <a href=\"#\" data-widgster=\"close\"><i class=\"glyphicon glyphicon-remove\"></i></a>\r\n        </div>\r\n      </header>\r\n      <div class=\"widget-body\">\r\n        <form role=\"form\">\r\n          <fieldset>\r\n            <legend>\r\n              Date & Time\r\n            </legend>\r\n            <div class=\"form-group\">\r\n              <label for=\"datetimepicker2i\">\r\n                Time-enabled\r\n              </label>\r\n              <datetime [(ngModel)]=\"date\" name=\"datetime\" id=\"datetimepicker2i\"></datetime>\r\n            </div>\r\n          </fieldset>\r\n          <fieldset>\r\n            <legend>\r\n              Colors\r\n            </legend>\r\n            <div class=\"form-group\">\r\n              <label for=\"colorpickeri\">\r\n                Simple select\r\n                <span class=\"help-block\">\r\n                  Colorpicker plugin for Twitter Bootstrap, originally written by Stefan Petre\r\n                </span>\r\n              </label>\r\n              <div id=\"colorpicker\" class=\"input-group\">\r\n                <input type=\"text\" value=\"\" class=\"form-control\" id=\"colorpickeri\"/>\r\n                <span class=\"input-group-addon\"><i></i></span>\r\n              </div>\r\n            </div>\r\n          </fieldset>\r\n        </form>\r\n      </div>\r\n    </section>\r\n  </div>\r\n  <div class=\"col-lg-6 col-12\">\r\n    <section class=\"widget\" widget>\r\n      <header>\r\n        <h6>\r\n          Input <strong>Masks</strong>\r\n        </h6>\r\n        <div class=\"widget-controls\">\r\n          <a class=\"bg-gray-transparent\" href=\"#\"><i class=\"glyphicon glyphicon-cog text-white\"></i></a>\r\n          <a href=\"#\"><i class=\"fa fa-refresh\"></i></a>\r\n          <a href=\"#\" data-widgster=\"close\"><i class=\"glyphicon glyphicon-remove\"></i></a>\r\n        </div>\r\n      </header>\r\n      <div class=\"widget-body\">\r\n        <form role=\"form\" class=\"form-horizontal form-label-left\">\r\n          <fieldset>\r\n            <legend>\r\n              Masked inputs\r\n            </legend>\r\n            <div class=\"form-group row\">\r\n              <label class=\"form-control-label col-md-4 col-12\" for=\"mask-phone\">\r\n                Phone\r\n                <span class=\"help-block\">(123) 456-7890</span>\r\n              </label>\r\n              <div class=\"col-md-7 col-12\">\r\n                <input id=\"mask-phone\" name=\"mask-phone\" class=\"form-control\" [textMask]=\"phoneMask\" [ngModel]=\"phoneValue\" (ngModelChange)=\"phoneValue = unmask($event)\" type=\"text\"/>\r\n              </div>\r\n            </div>\r\n            <div class=\"form-group row\">\r\n              <label class=\"form-control-label col-md-4\" for=\"mask-int-phone\">\r\n                International Phone\r\n                <span class=\"help-block\">+375 123 456 789</span>\r\n              </label>\r\n              <div class=\"col-md-7 col-12\">\r\n                <input id=\"mask-int-phone\" name=\"mask-phone\" class=\"form-control\" [textMask]=\"interPhoneMask\" [ngModel]=\"phoneValue\" (ngModelChange)=\"interPhoneValue = unmask($event)\" type=\"text\"/>\r\n              </div>\r\n            </div>\r\n            <div class=\"form-group row\">\r\n              <label class=\"form-control-label col-md-4 col-12\" for=\"mask-date\">\r\n                Date Format\r\n                <span class=\"help-block\">07-03-2013</span>\r\n              </label>\r\n              <div class=\"col-md-7 col-12\">\r\n                <input id=\"mask-date\" name=\"mask-phone\" class=\"form-control\" [textMask]=\"dateMask\" [(ngModel)]=\"dateValue\" type=\"text\"/>\r\n              </div>\r\n            </div>\r\n            <div class=\"form-group row\">\r\n              <label class=\"form-control-label col-md-4 col-12\" for=\"mask-time\">\r\n                Time\r\n                <span class=\"help-block\">13:43</span>\r\n              </label>\r\n              <div class=\"col-md-7 col-12\">\r\n                <input id=\"mask-time\" name=\"mask-phone\" class=\"form-control\" [textMask]=\"timeMask\" [(ngModel)]=\"timeValue\" type=\"text\"/>\r\n              </div>\r\n            </div>\r\n          </fieldset>\r\n        </form>\r\n      </div>\r\n    </section>\r\n  </div>\r\n</div>\r\n<div class=\"row\">\r\n    <div class=\"col-lg-12 \">\r\n        <section class=\"widget\" widget>\r\n            <header>\r\n                <h6>\r\n                    Sliders\r\n                </h6>\r\n                <div class=\"widget-controls\">\r\n                    <a class=\"bg-gray-transparent\" href=\"#\"><i class=\"glyphicon glyphicon-cog text-white\"></i></a>\r\n                    <a href=\"#\"><i class=\"fa fa-refresh\"></i></a>\r\n                    <a href=\"#\" data-widgster=\"close\"><i class=\"glyphicon glyphicon-remove\"></i></a>\r\n                </div>\r\n            </header>\r\n            <div class=\"widget-body\">\r\n                <div class=\"row\">\r\n                    <div class=\"col-lg-4 \">\r\n                        <h4>Color Options</h4>\r\n                        <p>Sing extends Bootstrap Slider and provides different color options:</p>\r\n                        <form>\r\n                            <div class=\"mb-sm\">\r\n                                <input class=\"js-slider\" id=\"slider-ex1\" data-slider-id='ex1Slider' type=\"text\" data-slider-min=\"0\" data-slider-max=\"20\" data-slider-step=\"1\" data-slider-value=\"14\"/>\r\n                            </div>\r\n                            <div class=\"slider-danger mb-sm\">\r\n                                <input class=\"js-slider\" id=\"slider-ex2\" data-slider-id='ex2Slider' type=\"text\" data-slider-min=\"0\" data-slider-max=\"20\" data-slider-step=\"1\" data-slider-value=\"18\"/>\r\n                            </div>\r\n                            <div class=\"slider-warning mb-sm\">\r\n                                <input class=\"js-slider\" id=\"slider-ex3\" data-slider-id='ex3Slider' type=\"text\" data-slider-min=\"0\" data-slider-max=\"20\" data-slider-step=\"1\" data-slider-value=\"7\"/>\r\n                            </div>\r\n                            <div class=\"slider-success mb-sm\">\r\n                                <input class=\"js-slider\" id=\"slider-ex4\" data-slider-id='ex4Slider' type=\"text\" data-slider-min=\"0\" data-slider-max=\"20\" data-slider-step=\"1\" data-slider-value=\"11\"/>\r\n                            </div>\r\n                            <div class=\"slider-inverse mb-sm\">\r\n                                <input class=\"js-slider\" id=\"slider-ex5\" data-slider-id='ex5Slider' type=\"text\" data-slider-min=\"0\" data-slider-max=\"20\" data-slider-step=\"1\" data-slider-value=\"4\"/>\r\n                            </div>\r\n                        </form>\r\n                    </div>\r\n                    <div class=\"col-lg-4 \">\r\n                        <h4>Slider Orientation</h4>\r\n                        <p>Vertical orientation is also possible. Simply changing <strong>data-slider-orientation</strong>\r\n                            attribute does the thing.</p>\r\n                        <form>\r\n                            <div class=\"row\">\r\n                                <div class=\"col-md-8 col-md-offset-2 \">\r\n                                    <span class=\"\">\r\n                                        <input class=\"js-slider\" id=\"slider-ex6\" data-slider-orientation=\"vertical\" data-slider-id='ex6Slider' type=\"text\" data-slider-min=\"0\" data-slider-max=\"20\" data-slider-step=\"1\" data-slider-value=\"14\"/>\r\n                                    </span>\r\n                                    &nbsp;&nbsp;&nbsp;&nbsp;\r\n                                    <span class=\"slider-inverse\">\r\n                                        <input class=\"js-slider\" id=\"slider-ex7\" data-slider-orientation=\"vertical\" data-slider-id='ex7Slider' type=\"text\" data-slider-min=\"0\" data-slider-max=\"20\" data-slider-step=\"1\" data-slider-value=\"18\"/>\r\n                                    </span>\r\n                                    &nbsp;&nbsp;&nbsp;&nbsp;\r\n                                    <span class=\"\">\r\n                                        <input class=\"js-slider\" id=\"slider-ex8\" data-slider-orientation=\"vertical\" data-slider-id='ex8Slider' type=\"text\" data-slider-min=\"0\" data-slider-max=\"20\" data-slider-step=\"1\" data-slider-value=\"7\"/>\r\n                                    </span>\r\n                                    &nbsp;&nbsp;&nbsp;&nbsp;\r\n                                    <span class=\"slider-inverse\">\r\n                                        <input class=\"js-slider\" id=\"slider-ex9\" data-slider-orientation=\"vertical\" data-slider-id='ex9Slider' type=\"text\" data-slider-min=\"0\" data-slider-max=\"20\" data-slider-step=\"1\" data-slider-value=\"11\"/>\r\n                                    </span>\r\n                                    &nbsp;&nbsp;&nbsp;&nbsp;\r\n                                    <span class=\"\">\r\n                                        <input class=\"js-slider\" id=\"slider-ex10\" data-slider-orientation=\"vertical\" data-slider-id='ex10Slider' type=\"text\" data-slider-min=\"0\" data-slider-max=\"20\" data-slider-step=\"1\" data-slider-value=\"4\"/>\r\n                                    </span>\r\n                                </div>\r\n                            </div>\r\n                        </form>\r\n                    </div>\r\n                    <div class=\"col-lg-4 \">\r\n                        <h4>Range Selector</h4>\r\n                        <p>Range selector, options specified via <strong>data-slider-value</strong> attribute as\r\n                            an array. Price range selector:</p>\r\n                        <form>\r\n                            <span class=\"slider-warning\">\r\n                                <input class=\"js-slider\"\r\n                                       id=\"slider-ex11\" data-slider-id='ex11Slider'\r\n                                       type=\"text\" data-slider-min=\"0\" data-slider-max=\"2000\"\r\n                                       data-slider-step=\"1\" data-slider-value='[200,1547]' /> &nbsp;\r\n                            </span>\r\n                        </form>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n        </section>\r\n    </div>\r\n</div>\r\n<div class=\"row\">\r\n  <div class=\"col-lg-6 \">\r\n    <section class=\"widget\" widget>\r\n      <header>\r\n        <h6>\r\n          Simple <strong>file uploads</strong>\r\n        </h6>\r\n        <div class=\"widget-controls\">\r\n          <a class=\"bg-gray-transparent\" href=\"#\"><i class=\"glyphicon glyphicon-cog text-white\"></i></a>\r\n          <a href=\"#\"><i class=\"fa fa-refresh\"></i></a>\r\n          <a href=\"#\" data-widgster=\"close\"><i class=\"glyphicon glyphicon-remove\"></i></a>\r\n        </div>\r\n      </header>\r\n      <div class=\"widget-body\">\r\n        <form class=\"form-horizontal\" role=\"form\">\r\n          <fieldset>\r\n            <blockquote class=\"blockquote-reverse\">\r\n              <p>The man who is really serious, with the urge to find out what truth is, has no style at all. He lives only in what is.</p>\r\n              <footer>Bruce Lee</footer>\r\n            </blockquote>\r\n            <div class=\"form-group row\">\r\n              <label class=\"col-form-label col-md-4 text-md-right\" for=\"fileupload1\">\r\n                File input widget\r\n              </label>\r\n              <div class=\"col-md-8 \">\r\n                <div class=\"fileinput fileinput-new input-group\" data-provides=\"fileinput\">\r\n                  <div class=\"form-control\" data-trigger=\"fileinput\">\r\n                    <i class=\"glyphicon glyphicon-file fileinput-exists\"></i>\r\n                    <span class=\"fileinput-filename\"></span>\r\n                  </div>\r\n                  <span class=\"input-group-addon btn btn-secondary btn-file\">\r\n                    <span class=\"fileinput-new\">Select file</span>\r\n                    <span class=\"fileinput-exists\">Change</span>\r\n                    <input name=\"...\" type=\"file\">\r\n                  </span>\r\n                  <a href=\"#\" class=\"input-group-addon btn btn-secondary fileinput-exists\" data-dismiss=\"fileinput\">Remove</a>\r\n                </div>\r\n                <span class=\"help-block\">Awesome file input plugin allows you to create a visually appealing file or image inputs.</span>\r\n              </div>\r\n            </div>\r\n            <div class=\"form-group row\">\r\n              <label class=\"col-form-label col-md-4 text-md-right\">\r\n                Image upload widget\r\n              </label>\r\n              <div class=\"col-md-8 \">\r\n                <div class=\"fileinput fileinput-new\" data-provides=\"fileinput\">\r\n                  <div class=\"fileinput-new thumbnail\" data-trigger=\"fileinput\" style=\"width: 200px; height: 150px;\">\r\n                    <img alt=\"...\" src=\"data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxOTEiIGhlaWdodD0iMTQxIj48cmVjdCB3aWR0aD0iMTkxIiBoZWlnaHQ9IjE0MSIgZmlsbD0iI2VlZSIvPjx0ZXh0IHRleHQtYW5jaG9yPSJtaWRkbGUiIHg9Ijk1LjUiIHk9IjcwLjUiIHN0eWxlPSJmaWxsOiNhYWE7Zm9udC13ZWlnaHQ6Ym9sZDtmb250LXNpemU6MTJweDtmb250LWZhbWlseTpBcmlhbCxIZWx2ZXRpY2Esc2Fucy1zZXJpZjtkb21pbmFudC1iYXNlbGluZTpjZW50cmFsIj4xOTF4MTQxPC90ZXh0Pjwvc3ZnPg==\">\r\n                  </div>\r\n                  <div class=\"fileinput-preview fileinput-exists thumbnail\" style=\"max-width: 200px; max-height: 150px;\"></div>\r\n                  <div>\r\n                    <span class=\"btn btn-secondary btn-file\"><span class=\"fileinput-new\">Select image</span><span class=\"fileinput-exists\">Change</span><input type=\"file\" name=\"...\"></span>\r\n                    <a href=\"#\" class=\"btn btn-secondary fileinput-exists\" data-dismiss=\"fileinput\">Remove</a>\r\n                  </div>\r\n                </div>\r\n                <span class=\"help-block\">Showing a thumbnail instead of the filename when uploading an image.</span>\r\n              </div>\r\n            </div>\r\n          </fieldset>\r\n        </form>\r\n      </div>\r\n    </section>\r\n  </div>\r\n  <div class=\"col-lg-6 \">\r\n    <section class=\"widget\" widget>\r\n      <header>\r\n        <h6>\r\n          <strong>Drop</strong> Zone\r\n        </h6>\r\n        <div class=\"widget-controls\">\r\n          <a class=\"bg-gray-transparent\" href=\"#\"><i class=\"glyphicon glyphicon-cog text-white\"></i></a>\r\n          <a href=\"#\"><i class=\"fa fa-refresh\"></i></a>\r\n          <a href=\"#\" data-widgster=\"close\"><i class=\"glyphicon glyphicon-remove\"></i></a>\r\n        </div>\r\n      </header>\r\n      <div class=\"widget-body\">\r\n        <form dropzone-demo action=\"#\" id=\"my-awesome-dropzone\"></form>\r\n      </div>\r\n    </section>\r\n  </div>\r\n</div>\r\n"

/***/ },

/***/ 831:
/***/ function(module, exports) {

module.exports = "<ol class=\"breadcrumb\">\r\n  <li class=\"breadcrumb-item\">YOU ARE HERE</li>\r\n  <li class=\"breadcrumb-item active\">Form Validation</li>\r\n</ol>\r\n<h1 class=\"page-title\">Form - <span class=\"fw-semi-bold\">Validation</span></h1>\r\n<div class=\"row\">\r\n  <div class=\"col-lg-8 offset-lg-1 col-12\">\r\n    <section class=\"widget\" widget>\r\n      <header>\r\n        <h5>\r\n          Dead simple validation\r\n          <small>No JS needed to tune-up</small>\r\n        </h5>\r\n        <div class=\"widget-controls\">\r\n          <a data-widgster=\"expand\" title=\"Expand\" href=\"#\"><i class=\"glyphicon glyphicon-chevron-up\"></i></a>\r\n          <a data-widgster=\"collapse\" title=\"Collapse\" href=\"#\"><i class=\"glyphicon glyphicon-chevron-down\"></i></a>\r\n          <a data-widgster=\"close\" title=\"Close\" href=\"#\"><i class=\"glyphicon glyphicon-remove\"></i></a>\r\n        </div>\r\n      </header>\r\n      <div class=\"widget-body\">\r\n        <form class=\"form-horizontal form-label-left parsleyjs\" method=\"post\"\r\n              data-parsley-priority-enabled=\"false\"\r\n              novalidate=\"novalidate\">\r\n          <fieldset>\r\n            <legend>\r\n              By default validation is started only after at least 3 characters have been input.\r\n            </legend>\r\n            <div class=\"form-group row\">\r\n              <label class=\"form-control-label col-md-3 col-12\" for=\"basic\">Simple required</label>\r\n              <div class=\"col-md-9 col-12\">\r\n                <input type=\"text\" id=\"basic\" name=\"basic\" class=\"form-control\"\r\n                       required=\"required\">\r\n              </div>\r\n            </div>\r\n            <div class=\"form-group row\">\r\n              <label class=\"form-control-label col-md-3 col-12\" for=\"basic-change\">\r\n                Min-length On Change\r\n                                    <span class=\"help-block\">\r\n                                        At least 10\r\n                                    </span>\r\n              </label>\r\n              <div class=\"col-md-9 col-12\">\r\n                <input type=\"text\" id=\"basic-change\" name=\"basic-change\" class=\"form-control\"\r\n                       data-parsley-trigger=\"change\"\r\n                       data-parsley-minlength=\"10\"\r\n                       required=\"required\">\r\n              </div>\r\n            </div>\r\n          </fieldset>\r\n          <fieldset>\r\n            <legend>\r\n                                    <span class=\"badge badge-warning  text-gray-dark mr-xs\">\r\n                                        HTML5\r\n                                    </span>\r\n              input types supported\r\n            </legend>\r\n            <div class=\"form-group row\">\r\n              <label class=\"form-control-label col-md-3 col-12\" for=\"email\">\r\n                E-mail\r\n              </label>\r\n              <div class=\"col-md-9 col-12\">\r\n                <input type=\"email\" id=\"email\" name=\"email\" class=\"form-control\"\r\n                       data-parsley-trigger=\"change\"\r\n                       data-parsley-validation-threshold=\"1\"\r\n                       required=\"required\">\r\n                                    <span class=\"help-block\">\r\n                                        This one is triggered even when 1 character has been input\r\n                                    </span>\r\n              </div>\r\n            </div>\r\n            <div class=\"form-group row\">\r\n              <label class=\"form-control-label col-md-3 col-12\" for=\"number\">\r\n                Number\r\n              </label>\r\n              <div class=\"col-md-9 col-12\">\r\n                <input type=\"text\" id=\"number\" name=\"number\" class=\"form-control\"\r\n                       data-parsley-type=\"number\"\r\n                       required=\"required\">\r\n              </div>\r\n            </div>\r\n            <div class=\"form-group row\">\r\n              <label class=\"form-control-label col-md-3 col-12\" for=\"range\">\r\n                Range\r\n              </label>\r\n              <div class=\"col-md-9 col-12\">\r\n                <input type=\"text\"  class=\"form-control\"\r\n                       id=\"range\" name=\"range\"\r\n                       data-parsley-range=\"[10, 100]\"\r\n                       data-parsley-trigger=\"change\"\r\n                       data-parsley-validation-threshold=\"1\"\r\n                       required=\"required\">\r\n              </div>\r\n            </div>\r\n          </fieldset>\r\n          <fieldset>\r\n            <legend>\r\n              More validation\r\n            </legend>\r\n            <div class=\"form-group row\">\r\n              <label class=\"form-control-label col-md-3 col-12\" for=\"password\">\r\n                Password helpers\r\n              </label>\r\n              <div class=\"col-md-9 col-12\">\r\n                <input type=\"password\" id=\"password\" name=\"password\" class=\"form-control mb-sm\"\r\n                       data-parsley-trigger=\"change\"\r\n                       data-parsley-minlength=\"6\"\r\n                       required=\"required\">\r\n                <input type=\"password\" id=\"password-r\" name=\"password-r\" class=\"form-control\"\r\n                       data-parsley-trigger=\"change\"\r\n                       data-parsley-minlength=\"6\"\r\n                       data-parsley-equalto=\"#password\"\r\n                       required=\"required\">\r\n              </div>\r\n            </div>\r\n            <div class=\"form-group row\">\r\n              <label class=\"form-control-label col-md-3 col-12\" for=\"website\">\r\n                Website\r\n              </label>\r\n              <div class=\"col-md-9 col-12\">\r\n                <input type=\"text\" id=\"website\" name=\"website\" class=\"form-control\"\r\n                       data-parsley-trigger=\"change\"\r\n                       data-parsley-type=\"url\"\r\n                       required=\"required\">\r\n              </div>\r\n            </div>\r\n          </fieldset>\r\n          <div class=\"form-actions\">\r\n            <button type=\"submit\" class=\"btn btn-danger btn-rounded float-right\">Validate &amp; Submit</button>\r\n            <button type=\"button\" class=\"btn btn-default btn-rounded\">Cancel</button>\r\n          </div>\r\n        </form>\r\n      </div>\r\n    </section>\r\n  </div>\r\n</div>\r\n"

/***/ },

/***/ 832:
/***/ function(module, exports) {

module.exports = "<ol class=\"breadcrumb\">\r\n  <li class=\"breadcrumb-item\">YOU ARE HERE</li>\r\n  <li class=\"breadcrumb-item active\">Form Wizard</li>\r\n</ol>\r\n<h1 class=\"page-title\">Form - <span class=\"fw-semi-bold\">Wizards</span></h1>\r\n<div class=\"row\">\r\n  <div class=\"col-lg-12 col-12\">\r\n    <section class=\"widget\" widget>\r\n      <header>\r\n        <h5>\r\n          Wizard\r\n          <small>Tunable widget</small>\r\n        </h5>\r\n        <div class=\"widget-controls\">\r\n          <a data-widgster=\"expand\" title=\"Expand\" href=\"#\"><i class=\"glyphicon glyphicon-chevron-up\"></i></a>\r\n          <a data-widgster=\"collapse\" title=\"Collapse\" href=\"#\"><i class=\"glyphicon glyphicon-chevron-down\"></i></a>\r\n          <a data-widgster=\"close\" title=\"Close\" href=\"#\"><i class=\"glyphicon glyphicon-remove\"></i></a>\r\n        </div>\r\n      </header>\r\n      <div class=\"widget-body\">\r\n        <div class=\"row\">\r\n          <div class=\"col-lg-8 col-12\">\r\n            <h5>Inpage <strong>Wizard</strong></h5>\r\n            <p>An example of complete wizard form in widget.</p>\r\n\r\n            <div bootstrap-wizard data-height=\"444\" class=\"form-wizard\">\r\n              <ul class=\"nav-justified flex-md-row flex-column mb-sm nav nav-pills\">\r\n                <li class=\"nav-item\"><a class=\"nav-link\" href=\"#tab1\" data-toggle=\"tab\">\r\n                  <small>1.</small>\r\n                  Your Details</a></li>\r\n                <li class=\"nav-item\"><a class=\"nav-link\" href=\"#tab2\" data-toggle=\"tab\">\r\n                  <small>2.</small>\r\n                  Shipping</a></li>\r\n                <li class=\"nav-item\"><a class=\"nav-link\" href=\"#tab3\" data-toggle=\"tab\">\r\n                  <small>3.</small>\r\n                  Pay</a></li>\r\n                <li class=\"nav-item\"><a class=\"nav-link\" href=\"#tab4\" data-toggle=\"tab\">\r\n                  <small>4.</small>\r\n                  Thank you!</a></li>\r\n              </ul>\r\n              <div class=\"bg-gray-lighter progress progress-xs\">\r\n                <div id=\"bar\" class=\"progress-bar progress-xs bg-bar-gray-light\" style=\"width: 25%;\"></div>\r\n              </div>\r\n              <div class=\"tab-content\">\r\n                <div class=\"tab-pane bg-gray-lighter\" id=\"tab1\">\r\n                  <form action='' method=\"POST\"\r\n                        data-parsley-priority-enabled=\"false\"\r\n                        novalidate=\"novalidate\">\r\n                    <fieldset>\r\n                      <div class=\"form-group\">\r\n                        <!-- Username -->\r\n                        <label for=\"username\">Username</label>\r\n                        <input type=\"text\" id=\"username\" name=\"username\" placeholder=\"\"\r\n                               class=\"form-control\"\r\n                               required=\"required\">\r\n                        <span class=\"help-block\">Username can contain any letters or numbers, without spaces</span>\r\n                      </div>\r\n                      <div class=\"form-group\">\r\n                        <!-- Email -->\r\n                        <label for=\"email\">Email</label>\r\n                        <input type=\"email\" id=\"email\" name=\"email\"\r\n                               placeholder=\"\" class=\"form-control\"\r\n                               data-parsley-trigger=\"change\"\r\n                               required=\"required\">\r\n                        <span class=\"help-block\">Please provide your E-mail</span>\r\n                      </div>\r\n                      <div class=\"form-group\">\r\n                        <!-- Password -->\r\n                        <label for=\"address\">Address</label>\r\n                        <input type=\"text\" id=\"address\" name=\"address\" placeholder=\"\"\r\n                               class=\"form-control\">\r\n                        <span class=\"help-block\">Please provide your address</span>\r\n                      </div>\r\n                    </fieldset>\r\n                  </form>\r\n                </div>\r\n                <div class=\"tab-pane bg-gray-lighter\" id=\"tab2\">\r\n                  <form action='' method=\"POST\"\r\n                        data-parsley-priority-enabled=\"false\"\r\n                        novalidate=\"novalidate\">\r\n                    <fieldset>\r\n                      <div class=\"form-group\">\r\n                        <label for=\"country-select\">Destination Country</label>\r\n\r\n                        <select id=\"country-select\" data-width=\"250\" data-theme=\"bootstrap\" data-placeholder=\"Choose a Country...\"\r\n                                  class=\"form-control select2\">\r\n                            <option value=\"\"></option>\r\n                            <option value=\"United States\">United States</option>\r\n                            <option value=\"United Kingdom\">United Kingdom</option>\r\n                            <option value=\"Afghanistan\">Afghanistan</option>\r\n                            <option value=\"Albania\">Albania</option>\r\n                            <option value=\"Algeria\">Algeria</option>\r\n                            <option value=\"American Samoa\">American Samoa</option>\r\n                            <option value=\"Andorra\">Andorra</option>\r\n                            <option value=\"Angola\">Angola</option>\r\n                            <option value=\"Anguilla\">Anguilla</option>\r\n                            <option value=\"Antarctica\">Antarctica</option>\r\n                            <option value=\"Antigua and Barbuda\">Antigua and Barbuda</option>\r\n                            <option value=\"Argentina\">Argentina</option>\r\n                            <option value=\"Armenia\">Armenia</option>\r\n                            <option value=\"Aruba\">Aruba</option>\r\n                            <option value=\"Australia\">Australia</option>\r\n                            <option value=\"Austria\">Austria</option>\r\n                            <option value=\"Azerbaijan\">Azerbaijan</option>\r\n                            <option value=\"Bahamas\">Bahamas</option>\r\n                            <option value=\"Bahrain\">Bahrain</option>\r\n                            <option value=\"Bangladesh\">Bangladesh</option>\r\n                            <option value=\"Barbados\">Barbados</option>\r\n                            <option value=\"Belarus\">Belarus</option>\r\n                            <option value=\"Belgium\">Belgium</option>\r\n                            <option value=\"Belize\">Belize</option>\r\n                            <option value=\"Benin\">Benin</option>\r\n                            <option value=\"Bermuda\">Bermuda</option>\r\n                            <option value=\"Bhutan\">Bhutan</option>\r\n                            <option value=\"Bolivia\">Bolivia</option>\r\n                            <option value=\"Bosnia and Herzegovina\">Bosnia and Herzegovina</option>\r\n                            <option value=\"Botswana\">Botswana</option>\r\n                            <option value=\"Bouvet Island\">Bouvet Island</option>\r\n                            <option value=\"Brazil\">Brazil</option>\r\n                            <option value=\"British Indian Ocean Territory\">British Indian Ocean Territory</option>\r\n                            <option value=\"Brunei Darussalam\">Brunei Darussalam</option>\r\n                            <option value=\"Bulgaria\">Bulgaria</option>\r\n                            <option value=\"Burkina Faso\">Burkina Faso</option>\r\n                            <option value=\"Burundi\">Burundi</option>\r\n                            <option value=\"Cambodia\">Cambodia</option>\r\n                            <option value=\"Cameroon\">Cameroon</option>\r\n                            <option value=\"Canada\">Canada</option>\r\n                            <option value=\"Cape Verde\">Cape Verde</option>\r\n                            <option value=\"Cayman Islands\">Cayman Islands</option>\r\n                            <option value=\"Central African Republic\">Central African Republic</option>\r\n                            <option value=\"Chad\">Chad</option>\r\n                            <option value=\"Chile\">Chile</option>\r\n                            <option value=\"China\">China</option>\r\n                            <option value=\"Christmas Island\">Christmas Island</option>\r\n                            <option value=\"Cocos (Keeling) Islands\">Cocos (Keeling) Islands</option>\r\n                            <option value=\"Colombia\">Colombia</option>\r\n                            <option value=\"Comoros\">Comoros</option>\r\n                            <option value=\"Congo\">Congo</option>\r\n                            <option value=\"Congo, The Democratic Republic of The\">Congo, The Democratic Republic of The</option>\r\n                            <option value=\"Cook Islands\">Cook Islands</option>\r\n                            <option value=\"Costa Rica\">Costa Rica</option>\r\n                            <option value=\"Cote D'ivoire\">Cote D'ivoire</option>\r\n                            <option value=\"Croatia\">Croatia</option>\r\n                            <option value=\"Cuba\">Cuba</option>\r\n                            <option value=\"Cyprus\">Cyprus</option>\r\n                            <option value=\"Czech Republic\">Czech Republic</option>\r\n                            <option value=\"Denmark\">Denmark</option>\r\n                            <option value=\"Djibouti\">Djibouti</option>\r\n                            <option value=\"Dominica\">Dominica</option>\r\n                            <option value=\"Dominican Republic\">Dominican Republic</option>\r\n                            <option value=\"Ecuador\">Ecuador</option>\r\n                            <option value=\"Egypt\">Egypt</option>\r\n                            <option value=\"El Salvador\">El Salvador</option>\r\n                            <option value=\"Equatorial Guinea\">Equatorial Guinea</option>\r\n                            <option value=\"Eritrea\">Eritrea</option>\r\n                            <option value=\"Estonia\">Estonia</option>\r\n                            <option value=\"Ethiopia\">Ethiopia</option>\r\n                            <option value=\"Falkland Islands (Malvinas)\">Falkland Islands (Malvinas)</option>\r\n                            <option value=\"Faroe Islands\">Faroe Islands</option>\r\n                            <option value=\"Fiji\">Fiji</option>\r\n                            <option value=\"Finland\">Finland</option>\r\n                            <option value=\"France\">France</option>\r\n                            <option value=\"French Guiana\">French Guiana</option>\r\n                            <option value=\"French Polynesia\">French Polynesia</option>\r\n                            <option value=\"French Southern Territories\">French Southern Territories</option>\r\n                            <option value=\"Gabon\">Gabon</option>\r\n                            <option value=\"Gambia\">Gambia</option>\r\n                            <option value=\"Georgia\">Georgia</option>\r\n                            <option value=\"Germany\">Germany</option>\r\n                            <option value=\"Ghana\">Ghana</option>\r\n                            <option value=\"Gibraltar\">Gibraltar</option>\r\n                            <option value=\"Greece\">Greece</option>\r\n                            <option value=\"Greenland\">Greenland</option>\r\n                            <option value=\"Grenada\">Grenada</option>\r\n                            <option value=\"Guadeloupe\">Guadeloupe</option>\r\n                            <option value=\"Guam\">Guam</option>\r\n                            <option value=\"Guatemala\">Guatemala</option>\r\n                            <option value=\"Guinea\">Guinea</option>\r\n                            <option value=\"Guinea-bissau\">Guinea-bissau</option>\r\n                            <option value=\"Guyana\">Guyana</option>\r\n                            <option value=\"Haiti\">Haiti</option>\r\n                            <option value=\"Heard Island and Mcdonald Islands\">Heard Island and Mcdonald Islands</option>\r\n                            <option value=\"Holy See (Vatican City State)\">Holy See (Vatican City State)</option>\r\n                            <option value=\"Honduras\">Honduras</option>\r\n                            <option value=\"Hong Kong\">Hong Kong</option>\r\n                            <option value=\"Hungary\">Hungary</option>\r\n                            <option value=\"Iceland\">Iceland</option>\r\n                            <option value=\"India\">India</option>\r\n                            <option value=\"Indonesia\">Indonesia</option>\r\n                            <option value=\"Iran, Islamic Republic of\">Iran, Islamic Republic of</option>\r\n                            <option value=\"Iraq\">Iraq</option>\r\n                            <option value=\"Ireland\">Ireland</option>\r\n                            <option value=\"Israel\">Israel</option>\r\n                            <option value=\"Italy\">Italy</option>\r\n                            <option value=\"Jamaica\">Jamaica</option>\r\n                            <option value=\"Japan\">Japan</option>\r\n                            <option value=\"Jordan\">Jordan</option>\r\n                            <option value=\"Kazakhstan\">Kazakhstan</option>\r\n                            <option value=\"Kenya\">Kenya</option>\r\n                            <option value=\"Kiribati\">Kiribati</option>\r\n                            <option value=\"Korea, Democratic People's Republic of\">Korea, Democratic People's Republic of\r\n                            </option>\r\n                            <option value=\"Korea, Republic of\">Korea, Republic of</option>\r\n                            <option value=\"Kuwait\">Kuwait</option>\r\n                            <option value=\"Kyrgyzstan\">Kyrgyzstan</option>\r\n                            <option value=\"Lao People's Democratic Republic\">Lao People's Democratic Republic</option>\r\n                            <option value=\"Latvia\">Latvia</option>\r\n                            <option value=\"Lebanon\">Lebanon</option>\r\n                            <option value=\"Lesotho\">Lesotho</option>\r\n                            <option value=\"Liberia\">Liberia</option>\r\n                            <option value=\"Libyan Arab Jamahiriya\">Libyan Arab Jamahiriya</option>\r\n                            <option value=\"Liechtenstein\">Liechtenstein</option>\r\n                            <option value=\"Lithuania\">Lithuania</option>\r\n                            <option value=\"Luxembourg\">Luxembourg</option>\r\n                            <option value=\"Macao\">Macao</option>\r\n                            <option value=\"Macedonia, The Former Yugoslav Republic of\">Macedonia, The Former Yugoslav Republic\r\n                              of\r\n                            </option>\r\n                            <option value=\"Madagascar\">Madagascar</option>\r\n                            <option value=\"Malawi\">Malawi</option>\r\n                            <option value=\"Malaysia\">Malaysia</option>\r\n                            <option value=\"Maldives\">Maldives</option>\r\n                            <option value=\"Mali\">Mali</option>\r\n                            <option value=\"Malta\">Malta</option>\r\n                            <option value=\"Marshall Islands\">Marshall Islands</option>\r\n                            <option value=\"Martinique\">Martinique</option>\r\n                            <option value=\"Mauritania\">Mauritania</option>\r\n                            <option value=\"Mauritius\">Mauritius</option>\r\n                            <option value=\"Mayotte\">Mayotte</option>\r\n                            <option value=\"Mexico\">Mexico</option>\r\n                            <option value=\"Micronesia, Federated States of\">Micronesia, Federated States of</option>\r\n                            <option value=\"Moldova, Republic of\">Moldova, Republic of</option>\r\n                            <option value=\"Monaco\">Monaco</option>\r\n                            <option value=\"Mongolia\">Mongolia</option>\r\n                            <option value=\"Montenegro\">Montenegro</option>\r\n                            <option value=\"Montserrat\">Montserrat</option>\r\n                            <option value=\"Morocco\">Morocco</option>\r\n                            <option value=\"Mozambique\">Mozambique</option>\r\n                            <option value=\"Myanmar\">Myanmar</option>\r\n                            <option value=\"Namibia\">Namibia</option>\r\n                            <option value=\"Nauru\">Nauru</option>\r\n                            <option value=\"Nepal\">Nepal</option>\r\n                            <option value=\"Netherlands\">Netherlands</option>\r\n                            <option value=\"Netherlands Antilles\">Netherlands Antilles</option>\r\n                            <option value=\"New Caledonia\">New Caledonia</option>\r\n                            <option value=\"New Zealand\">New Zealand</option>\r\n                            <option value=\"Nicaragua\">Nicaragua</option>\r\n                            <option value=\"Niger\">Niger</option>\r\n                            <option value=\"Nigeria\">Nigeria</option>\r\n                            <option value=\"Niue\">Niue</option>\r\n                            <option value=\"Norfolk Island\">Norfolk Island</option>\r\n                            <option value=\"Northern Mariana Islands\">Northern Mariana Islands</option>\r\n                            <option value=\"Norway\">Norway</option>\r\n                            <option value=\"Oman\">Oman</option>\r\n                            <option value=\"Pakistan\">Pakistan</option>\r\n                            <option value=\"Palau\">Palau</option>\r\n                            <option value=\"Palestinian Territory, Occupied\">Palestinian Territory, Occupied</option>\r\n                            <option value=\"Panama\">Panama</option>\r\n                            <option value=\"Papua New Guinea\">Papua New Guinea</option>\r\n                            <option value=\"Paraguay\">Paraguay</option>\r\n                            <option value=\"Peru\">Peru</option>\r\n                            <option value=\"Philippines\">Philippines</option>\r\n                            <option value=\"Pitcairn\">Pitcairn</option>\r\n                            <option value=\"Poland\">Poland</option>\r\n                            <option value=\"Portugal\">Portugal</option>\r\n                            <option value=\"Puerto Rico\">Puerto Rico</option>\r\n                            <option value=\"Qatar\">Qatar</option>\r\n                            <option value=\"Reunion\">Reunion</option>\r\n                            <option value=\"Romania\">Romania</option>\r\n                            <option value=\"Russian Federation\">Russian Federation</option>\r\n                            <option value=\"Rwanda\">Rwanda</option>\r\n                            <option value=\"Saint Helena\">Saint Helena</option>\r\n                            <option value=\"Saint Kitts and Nevis\">Saint Kitts and Nevis</option>\r\n                            <option value=\"Saint Lucia\">Saint Lucia</option>\r\n                            <option value=\"Saint Pierre and Miquelon\">Saint Pierre and Miquelon</option>\r\n                            <option value=\"Saint Vincent and The Grenadines\">Saint Vincent and The Grenadines</option>\r\n                            <option value=\"Samoa\">Samoa</option>\r\n                            <option value=\"San Marino\">San Marino</option>\r\n                            <option value=\"Sao Tome and Principe\">Sao Tome and Principe</option>\r\n                            <option value=\"Saudi Arabia\">Saudi Arabia</option>\r\n                            <option value=\"Senegal\">Senegal</option>\r\n                            <option value=\"Serbia\">Serbia</option>\r\n                            <option value=\"Seychelles\">Seychelles</option>\r\n                            <option value=\"Sierra Leone\">Sierra Leone</option>\r\n                            <option value=\"Singapore\">Singapore</option>\r\n                            <option value=\"Slovakia\">Slovakia</option>\r\n                            <option value=\"Slovenia\">Slovenia</option>\r\n                            <option value=\"Solomon Islands\">Solomon Islands</option>\r\n                            <option value=\"Somalia\">Somalia</option>\r\n                            <option value=\"South Africa\">South Africa</option>\r\n                            <option value=\"South Georgia and The South Sandwich Islands\">South Georgia and The South Sandwich\r\n                              Islands\r\n                            </option>\r\n                            <option value=\"South Sudan\">South Sudan</option>\r\n                            <option value=\"Spain\">Spain</option>\r\n                            <option value=\"Sri Lanka\">Sri Lanka</option>\r\n                            <option value=\"Sudan\">Sudan</option>\r\n                            <option value=\"Suriname\">Suriname</option>\r\n                            <option value=\"Svalbard and Jan Mayen\">Svalbard and Jan Mayen</option>\r\n                            <option value=\"Swaziland\">Swaziland</option>\r\n                            <option value=\"Sweden\">Sweden</option>\r\n                            <option value=\"Switzerland\">Switzerland</option>\r\n                            <option value=\"Syrian Arab Republic\">Syrian Arab Republic</option>\r\n                            <option value=\"Taiwan, Republic of China\">Taiwan, Republic of China</option>\r\n                            <option value=\"Tajikistan\">Tajikistan</option>\r\n                            <option value=\"Tanzania, United Republic of\">Tanzania, United Republic of</option>\r\n                            <option value=\"Thailand\">Thailand</option>\r\n                            <option value=\"Timor-leste\">Timor-leste</option>\r\n                            <option value=\"Togo\">Togo</option>\r\n                            <option value=\"Tokelau\">Tokelau</option>\r\n                            <option value=\"Tonga\">Tonga</option>\r\n                            <option value=\"Trinidad and Tobago\">Trinidad and Tobago</option>\r\n                            <option value=\"Tunisia\">Tunisia</option>\r\n                            <option value=\"Turkey\">Turkey</option>\r\n                            <option value=\"Turkmenistan\">Turkmenistan</option>\r\n                            <option value=\"Turks and Caicos Islands\">Turks and Caicos Islands</option>\r\n                            <option value=\"Tuvalu\">Tuvalu</option>\r\n                            <option value=\"Uganda\">Uganda</option>\r\n                            <option value=\"Ukraine\">Ukraine</option>\r\n                            <option value=\"United Arab Emirates\">United Arab Emirates</option>\r\n                            <option value=\"United Kingdom\">United Kingdom</option>\r\n                            <option value=\"United States\">United States</option>\r\n                            <option value=\"United States Minor Outlying Islands\">United States Minor Outlying Islands</option>\r\n                            <option value=\"Uruguay\">Uruguay</option>\r\n                            <option value=\"Uzbekistan\">Uzbekistan</option>\r\n                            <option value=\"Vanuatu\">Vanuatu</option>\r\n                            <option value=\"Venezuela\">Venezuela</option>\r\n                            <option value=\"Viet Nam\">Viet Nam</option>\r\n                            <option value=\"Virgin Islands, British\">Virgin Islands, British</option>\r\n                            <option value=\"Virgin Islands, U.S.\">Virgin Islands, U.S.</option>\r\n                            <option value=\"Wallis and Futuna\">Wallis and Futuna</option>\r\n                            <option value=\"Western Sahara\">Western Sahara</option>\r\n                            <option value=\"Yemen\">Yemen</option>\r\n                            <option value=\"Zambia\">Zambia</option>\r\n                            <option value=\"Zimbabwe\">Zimbabwe</option>\r\n                          </select>\r\n\r\n                        <span class=\"help-block\">Please choose your country destination</span>\r\n\r\n                      </div>\r\n                      <div class=\"form-group\">\r\n                        <label for=\"courier\">Choose shipping option</label>\r\n\r\n\r\n                        <select id=\"courier\" data-placeholder=\"Choose an option..\"\r\n                        class=\"form-control select2\" data-theme=\"bootstrap\">\r\n                        <option value=\"\"></option>\r\n                        <option value=\"Australia Post\">Australia Post</option>\r\n                        <option value=\"DHL US\">DHL US</option>\r\n                        <option value=\"Other\">Other</option>\r\n                        </select>\r\n                        <span class=\"help-block\">Please choose your shipping option</span>\r\n\r\n                      </div>\r\n                      <div class=\"form-group\">\r\n                        <label for=\"destination\">Destination Zip Code</label>\r\n\r\n\r\n                        <input type=\"text\" id=\"destination\" name=\"destination\" class=\"form-control\" [textMask]=\"destindationMask\" [(ngModel)]=\"destinationValue\" required=\"required\">\r\n                        <span class=\"help-block\">Please provide your Destination Zip Code</span>\r\n\r\n                      </div>\r\n                      <div class=\"form-group\">\r\n                        <label for=\"dest-address\">Destination Address</label>\r\n\r\n\r\n                        <input type=\"text\" id=\"dest-address\" name=\"address\" placeholder=\"\"\r\n                               class=\"form-control\">\r\n                        <span class=\"help-block\">Please provide the destination address</span>\r\n\r\n                      </div>\r\n                    </fieldset>\r\n                  </form>\r\n                </div>\r\n                <div class=\"tab-pane bg-gray-lighter\" id=\"tab3\">\r\n                  <form action='' method=\"POST\">\r\n                    <fieldset>\r\n                      <div class=\"form-group\">\r\n                        <label for=\"name\">Name on the Card</label>\r\n\r\n\r\n                        <input type=\"text\" id=\"name\" name=\"name\" placeholder=\"\"\r\n                               class=\"form-control\" required=\"required\">\r\n\r\n                      </div>\r\n                      <div class=\"form-group\">\r\n                        <label for=\"credit-card-type\">Credit Card Type</label>\r\n\r\n\r\n                        <select id=\"credit-card-type\"\r\n                                data-placeholder=\"Please select..\"\r\n                                class=\"form-control select2\" data-theme=\"bootstrap\" required=\"required\">\r\n                          <option value=\"\"></option>\r\n                          <option value=\"Visa\">Visa</option>\r\n                          <option value=\"Mastercard\">Mastercard</option>\r\n                          <option value=\"Other\">Other</option>\r\n                        </select>\r\n\r\n                      </div>\r\n                      <div class=\"form-group \">\r\n                        <label for=\"credit\">Credit Card Number </label>\r\n                        <input type=\"text\" id=\"credit\" name=\"credit\" tabindex=\"3\" class=\"form-control\" [textMask]=\"creditMask\" [ngModel]=\"creditValue\" (ngModelChange)=\"creditValue = unmask($event)\" required=\"required\">\r\n                      </div>\r\n                      <div class=\"form-group\">\r\n                        <label for=\"expiration-date\">Expiration Date</label>\r\n\r\n\r\n                        <!--<datetime [timepicker]=\"false\"></datetime>-->\r\n\r\n                      </div>\r\n                    </fieldset>\r\n                  </form>\r\n                </div>\r\n                <div class=\"tab-pane bg-gray-lighter\" id=\"tab4\">\r\n                  <h2 class=\"m-t-1\">Thank you!</h2>\r\n\r\n                  <p>Your submission has been received.</p>\r\n                </div>\r\n                <ul class=\"pager wizard\">\r\n                  <li class=\"previous\">\r\n                    <button class=\"btn btn-default btn-rounded pull-left\">\r\n                      <i class=\"fa fa-caret-left\"></i> &nbsp; Previous\r\n                    </button>\r\n                  </li>\r\n                  <li class=\"next\">\r\n                    <button class=\"btn btn-primary btn-rounded pull-right\" >\r\n                      Next &nbsp; <i class=\"fa fa-caret-right\"></i></button>\r\n                  </li>\r\n                  <li class=\"finish\" style=\"display: none\">\r\n                    <button class=\"btn btn-success btn-rounded pull-right\" >\r\n                      Finish &nbsp; <i class=\"glyphicon glyphicon-ok\"></i>\r\n                    </button>\r\n                  </li>\r\n                </ul>\r\n              </div>\r\n            </div>\r\n          </div>\r\n          <div class=\"col-lg-4 col-12\">\r\n            <h5>Modal <strong>Application Wizard</strong></h5>\r\n            <p>An example of complete wizard form in a modal.</p>\r\n            <button class=\"btn btn-info btn-rounded\" id=\"open-wizard\" type=\"button\" >\r\n              Launch Wizard\r\n            </button>\r\n            <div class=\"wizard\" bootstrap-application-wizard data-title=\"Create Server\">\r\n\r\n              <!-- Step 1 Name & FQDN -->\r\n              <div class=\"wizard-card\" data-cardname=\"name\">\r\n                <h3>Name & FQDN</h3>\r\n\r\n                <div class=\"wizard-input-section\">\r\n                  <div class=\"form-group row\">\r\n                    <div class=\"col-md-6 col-12\">\r\n                      <input type=\"text\" class=\"form-control\" id=\"label\" name=\"label\" placeholder=\"Server label\" data-validate=\"validateServerLabel\">\r\n                    </div>\r\n                  </div>\r\n                </div>\r\n\r\n                <div class=\"wizard-input-section\">\r\n                  <p>\r\n                    Full Qualified Domain Name\r\n                  </p>\r\n\r\n                  <div class=\"form-group row\">\r\n                    <div class=\"col-md-8 col-12\">\r\n                      <div class=\"input-group\">\r\n                        <input type=\"text\" class=\"form-control\" id=\"fqdn\" name=\"fqdn\" placeholder=\"FQDN\" data-validate=\"validateFQDN\" data-is-valid=\"0\" data-lookup=\"0\" />\r\n\t\t\t\t\t\t\t\t<span class=\"input-group-btn\" id=\"btn-fqdn\">\r\n\t\t\t\t\t\t\t\t\t<button class=\"btn btn-default\" type=\"button\">\r\n                    Lookup\r\n                  </button> </span>\r\n                      </div>\r\n                    </div>\r\n                  </div>\r\n                </div>\r\n\r\n                <div class=\"wizard-input-section\">\r\n                  <p>\r\n                    Server ip.\r\n                  </p>\r\n\r\n                  <div class=\"form-group row\">\r\n                    <div class=\"col-md-8 col-12\">\r\n                      <input type=\"text\" class=\"form-control\" id=\"ip\" name=\"ip\" placeholder=\"IP\" data-serialize=\"1\" />\r\n                    </div>\r\n                  </div>\r\n                </div>\r\n              </div>\r\n\r\n              <div class=\"wizard-card\" data-cardname=\"group\">\r\n                <h3>Server Group</h3>\r\n\r\n                <div class=\"wizard-input-section\">\r\n                  <p>\r\n                    Where would you like server <strong class=\"create-server-name\"></strong>\r\n                    to go?\r\n                  </p>\r\n\r\n                  <img class=\"wizard-group-list\" src=\"assets/bootstrap-application-wizard/groups.png\" />\r\n                </div>\r\n              </div>\r\n\r\n              <div class=\"wizard-card wizard-card-overlay\" data-cardname=\"services\">\r\n                <h3>Service Selection</h3>\r\n\r\n                <div class=\"alert hide\">\r\n                  It's recommended that you select at least one\r\n                  service, like ping.\r\n                </div>\r\n\r\n                <div class=\"wizard-input-section\">\r\n                  <p>\r\n                    Please choose the services you'd like Panopta to\r\n                    monitor.  Any service you select will be given a default\r\n                    check frequency of 1 minute.\r\n                  </p>\r\n\r\n                  <select name=\"services\" data-placeholder=\"Service List\" style=\"width:350px;\" data-theme=\"bootstrap\" class=\"select2 create-server-service-list form-control\" multiple>\r\n\r\n                    <option value=\"\"></option>\r\n                    <optgroup label=\"Basic\">\r\n                      <option selected value=\"icmp.ping\">Ping</option>\r\n                      <option selected value=\"tcp.ssh\">SSH</option>\r\n                      <option value=\"tcp.ftp\">FTP</option>\r\n                    </optgroup>\r\n                    <optgroup label=\"Web\">\r\n                      <option selected value=\"tcp.http\">HTTP</option>\r\n                      <option value=\"tcp.https\">HTTP (Secure)</option>\r\n                      <option value=\"tcp.dns\">DNS</option>\r\n                    </optgroup>\r\n                    <optgroup label=\"Email\">\r\n                      <option value=\"tcp.pop\">POP</option>\r\n                      <option value=\"tcp.imap\">IMAP</option>\r\n                      <option value=\"tcp.smtp\">SMTP</option>\r\n                      <option value=\"tcp.pops\">POP (Secure)</option>\r\n                      <option value=\"tcp.imaps\">IMAP (Secure)</option>\r\n                      <option value=\"tcp.smtps\">SMTP (Secure)</option>\r\n                      <option value=\"tcp.http.exchange\">Microsoft Exchange</option>\r\n                    </optgroup>\r\n                    <optgroup label=\"Databases\">\r\n                      <option value=\"tcp.mysql\">MySQL</option>\r\n                      <option value=\"tcp.postgres\">PostgreSQL</option>\r\n                      <option value=\"tcp.mssql\">Microsoft SQL Server</option>\r\n                    </optgroup>\r\n                  </select>\r\n                </div>\r\n              </div>\r\n\r\n              <div class=\"wizard-card wizard-card-overlay\" data-cardname=\"location\">\r\n                <h3>Monitoring Location</h3>\r\n\r\n                <div class=\"wizard-input-section\">\r\n                  <p>\r\n                    We determined <strong>Chicago</strong> to be\r\n                    the closest location to monitor\r\n                    <strong class=\"create-server-name\"></strong>\r\n                    If you would like to change this, or you think this is\r\n                    incorrect, please select a different\r\n                    monitoring location.\r\n                  </p>\r\n\r\n                  <select name=\"location\" data-placeholder=\"Monitor nodes\" style=\"width:350px;\" data-theme=\"bootstrap\" class=\"select2 form-control\">\r\n                    <option value=\"\"></option>\r\n                    <optgroup label=\"North America\">\r\n                      <option>Atlanta</option>\r\n                      <option selected>Chicago</option>\r\n                      <option>Dallas</option>\r\n                      <option>Denver</option>\r\n                      <option>Fremont, CA</option>\r\n                      <option>Los Angeles</option>\r\n                      <option>Miami</option>\r\n                      <option>Newark, NJ</option>\r\n                      <option>Phoenix</option>\r\n                      <option>Seattle</option>\r\n                      <option>Washington, DC</option>\r\n                    </optgroup>\r\n\r\n                    <optgroup label=\"Europe\">\r\n                      <option>Amsterdam, NL</option>\r\n                      <option>Berlin</option>\r\n                      <option>London</option>\r\n                      <option>Milan, Italy</option>\r\n                      <option>Nurnberg, Germany</option>\r\n                      <option>Paris</option>\r\n                      <option>Stockholm</option>\r\n                      <option>Vienna</option>\r\n                    </optgroup>\r\n\r\n                    <optgroup label=\"Asia/Africa\">\r\n                      <option>Cairo</option>\r\n                      <option>Jakarta</option>\r\n                      <option>Johannesburg</option>\r\n                      <option>Hong Kong</option>\r\n                      <option>Singapore</option>\r\n                      <option>Sydney</option>\r\n                      <option>Tokyo</option>\r\n                    </optgroup>\r\n\r\n                  </select>\r\n\r\n                </div>\r\n              </div>\r\n\r\n              <div class=\"wizard-card wizard-card-overlay\">\r\n                <h3>Notification Schedule</h3>\r\n\r\n                <div class=\"wizard-input-section\">\r\n                  <p>\r\n                    Select the notification schedule to be used for outages.\r\n                  </p>\r\n\r\n                  <select name=\"notification\" class=\"wizard-ns-select select2 form-control\" data-theme=\"bootstrap\" data-placeholder=\"Notification schedule\" style=\"width:350px;\">\r\n                    <option value=\"\"></option>\r\n                    <option>ALIS Production</option>\r\n                    <option>ALIS Development &amp; Staging</option>\r\n                    <option>Panopta Development &amp; Staging</option>\r\n                    <option>Jira</option>\r\n                    <option>QSC Enterprise Production</option>\r\n                    <option>QSC Enterprise Development &amp; Staging</option>\r\n                    <option>Panopta Production</option>\r\n                    <option>Panopta Monitoring Nodes</option>\r\n                    <option>Common</option>\r\n                  </select>\r\n                </div>\r\n\r\n                <div class=\"wizard-ns-detail hide\">\r\n                  Also using <strong>ALIS Production</strong>:\r\n\r\n                  <ul id=\"wizard-ns-detail-servers\">\r\n                    <li><img src=\"assets/bootstrap-application-wizard/folder.png\" />Corporate sites</li>\r\n                    <li><img src=\"assets/bootstrap-application-wizard/folder.png\" />dt01.sat.medtelligent.com</li>\r\n                    <li><img src=\"assets/bootstrap-application-wizard/server_new.png\" />alisonline.com</li>\r\n                    <li><img src=\"assets/bootstrap-application-wizard/server_new.png\" />circa-db04.sat.medtelligent.com</li>\r\n                    <li><img src=\"assets/bootstrap-application-wizard/server_new.png\" />circa-services01.sat.medtelligent.com</li>\r\n                    <li><img src=\"assets/bootstrap-application-wizard/server_new.png\" />circa-web01.sat.medtelligent.com</li>\r\n                    <li><img src=\"assets/bootstrap-application-wizard/server_new.png\" />heartbeat.alisonline.com</li>\r\n                    <li><img src=\"assets/bootstrap-application-wizard/server_new.png\" />medtelligent.com</li>\r\n                    <li><img src=\"assets/bootstrap-application-wizard/server_new.png\" />dt02.fre.medtelligent.com</li>\r\n                    <li><img src=\"assets/bootstrap-application-wizard/server_new.png\" />dev03.lin.medtelligent.com</li>\r\n                  </ul>img\t\t\t\t</div>\r\n              </div>\r\n\r\n              <div class=\"wizard-card\">\r\n                <h3>Agent Setup</h3>\r\n\r\n                <div class=\"wizard-input-section\">\r\n                  <p>The <a target=\"_blank\" href=\"http://www.panopta.com/support/knowledgebase/support-questions/how-do-i-install-the-panopta-monitoring-agent/\">Panopta Agent</a> allows\r\n                    you to monitor local resources (disk usage, cpu usage, etc).\r\n                    If you would like to set that up now, please download\r\n                    and follow the <a target=\"_blank\" href=\"http://www.panopta.com/support/knowledgebase/support-questions/how-do-i-install-the-panopta-monitoring-agent/\">install instructions.</a>\r\n                  </p>\r\n\r\n                  <div class=\"btn-group\" dropdown>\r\n                    <button type=\"button\" dropdownToggle class=\"btn btn-default\">Download &nbsp; <span class=\"caret\"></span></button>\r\n                    <ul class=\"dropdown-menu\" dropdownMenu>\r\n                      <li><a>.rpm</a></li>\r\n                      <li><a>.deb</a></li>\r\n                      <li><a>.tar.gz</a></li>\r\n                    </ul>\r\n                  </div>\r\n                </div>\r\n\r\n\r\n                <div class=\"wizard-input-section\">\r\n                  <p>You will be given a server key after you install the Agent\r\n                    on <strong class=\"create-server-name\"></strong>.\r\n                    If you know your server key now, please enter it\r\n                    below.</p>\r\n\r\n                  <div class=\"form-group\">\r\n                    <input type=\"text\" class=\"create-server-agent-key form-control\" placeholder=\"Server key (optional)\" data-validate=\"\">\r\n                  </div>\r\n                </div>\r\n\r\n\r\n                <div class=\"wizard-error\">\r\n                  <div class=\"alert alert-error\">\r\n                    <strong>There was a problem</strong> with your submission.\r\n                    Please correct the errors and re-submit.\r\n                  </div>\r\n                </div>\r\n\r\n                <div class=\"wizard-failure\">\r\n                  <div class=\"alert alert-error\">\r\n                    <strong>There was a problem</strong> submitting the form.\r\n                    Please try again in a minute.\r\n                  </div>\r\n                </div>\r\n\r\n                <div class=\"wizard-success\">\r\n                  <div class=\"alert alert-success\">\r\n                    <span class=\"create-server-name\"></span>Server Created <strong>Successfully.</strong>\r\n                  </div>\r\n\r\n                  <a class=\"btn btn-default create-another-server\">Create another server</a>\r\n                  <span style=\"padding:0 10px\">or</span>\r\n                  <button class=\"btn btn-success im-done\">Done</button>\r\n                </div>\r\n              </div>\r\n            </div>\r\n          </div>\r\n        </div>\r\n      </div>\r\n    </section>\r\n  </div>\r\n</div>\r\n"

/***/ }

});
//# sourceMappingURL=6.map