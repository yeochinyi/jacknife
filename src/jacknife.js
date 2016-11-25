(function(root) {

    var root = this;

    var __slice = Array.prototype.slice,
        __map = Array.prototype.map,
        __hasProp = Array.prototype.hasOwnProperty,
        __filter = Array.prototype.filter;


    // See: http://underscorejs.org/docs/underscore.html
    var nativeIsArray = Array.isArray,
        toString = Object.prototype.toString,
        isArray = nativeIsArray || function(obj) {
            return toString.call(obj) == '[object Array]';
        },
        isString = function(obj) {
            return toString.call(obj) == '[object String]';
        },
        isFunction = function(obj) {
            return toString.call(obj) == '[object Function]';
        };

    if (typeof(/./) !== 'function') {
        isFunction = function(obj) {
            return typeof obj === 'function';
        };
    }

    // SHIM
    if ('ab'.split(/a*/).length < 2) {
        if (typeof console !== "undefined" && console !== null) {
            console.log("Warning: IE6 split is not ECMAScript-compliant.  This breaks '->1'");
        }
    }

    var callLeft = variadic(function(fn, args) {
        return variadic(function(remainingArgs) {
            return fn.apply(this, args.concat(remainingArgs))
        })
    });

    var callRight = variadic(function(fn, args) {
        return variadic(function(precedingArgs) {
            return fn.apply(this, precedingArgs.concat(args))
        })
    })

    function once(fn) {
        var done = false;

        return function() {
            return done ? void 0 : ((done = true), fn.apply(this, arguments))
        }
    }

    function maybe(fn) {
        return function() {
            var i;

            if (arguments.length === 0) {
                return
            } else {
                for (i = 0; i < arguments.length; ++i) {
                    if (arguments[i] == null) return null;
                }
                return fn.apply(this, arguments)
            }
        }
    }

    function getWith(attr) {
        return function(object) {
            return object[attr];
        }
    }


    function variadic(fn) {
        var fnLength = fn.length;

        if (fnLength < 1) {
            return fn;
        } else if (fnLength === 1) {
            return function() {
                return fn.call(
                    this, __slice.call(arguments, 0))
            }
        } else {
            return function() {
                var numberOfArgs = arguments.length,
                    namedArgs = __slice.call(
                        arguments, 0, fnLength - 1),
                    numberOfMissingNamedArgs = Math.max(
                        fnLength - numberOfArgs - 1, 0),
                    argPadding = new Array(numberOfMissingNamedArgs),
                    variadicArgs = __slice.call(
                        arguments, fn.length - 1);

                return fn.apply(
                    this, namedArgs
                    .concat(argPadding)
                    .concat([variadicArgs]));
            }
        }
    };

    var mapWith = flip(__map);

    function unary(fn) {
        if (fn.length == 1) {
            return fn
        } else return function(something) {
            return fn.call(this, something)
        }
    }

    function tap(value, fn) {
        if (fn === void 0) {
            return curried
        } else return curried(fn);

        function curried(fn) {
            if (typeof(fn) === 'function') {
                fn(value)
            }
            return value
        }
    }

    function flip(fn) {
        return function(first, second) {
            if (arguments.length === 2) {
                return fn.call(this, second, first);
            } else {
                return function(second) {
                    return fn.call(this, second, first);
                };
            };
        };
    };

    function deepPredicate(fn) {
        return function(collection, deepPath, value) {
            return fn(collection, function(o) {
                var x;
                var splitted = deepPath.split('.');
                for (x in splitted) {
                    var path = splitted[x];
                    o = o[path];
                    //					if(o === undefined){
                    //						break;
                    //					}					
                }
                return o === value;
            });
        }
    }

    function deepProp(fn) {
        return function(collection, deepPath) {
            return fn(collection, function(o) {
                var x;
                var splitted = deepPath.split('.');
                for (x in splitted) {
                    var path = splitted[x];
                    o = o[path];
                }
                return o;
            });
        }
    }


    // here's our export object
    var jk = {
        variadic: variadic,
        mapWith: mapWith,
        maybe: maybe,
        getWith: getWith,
        once: once,
        callLeft: callLeft,
        callRight: callRight,
        unary: unary,
        tap: tap,
        deepPredicate: deepPredicate,
        deepProp: deepProp
    };

    // Exports and sundries
    // --------------------

    if (typeof exports !== 'undefined') {
        if (typeof module !== 'undefined' && module.exports) {
            exports = module.exports = jk;
        }
        exports.jk = jk;
    } else {
        root.jk = jk;
    }

}).call(this);