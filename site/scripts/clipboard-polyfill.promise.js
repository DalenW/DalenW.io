! function (t, e) {
    "object" == typeof exports && "undefined" != typeof module ? e() : "function" == typeof define && define.amd ? define(e) : e()
}(0, function () {
    "use strict";

    function t(t) {
        var e = this.constructor;
        return this.then(function (n) {
            return e.resolve(t()).then(function () {
                return n
            })
        }, function (n) {
            return e.resolve(t()).then(function () {
                return e.reject(n)
            })
        })
    }

    function e(t) {
        return !(!t || void 0 === t.length)
    }

    function n() {}

    function r(t) {
        if (!(this instanceof r)) throw new TypeError("Promises must be constructed via new");
        if ("function" != typeof t) throw new TypeError("not a function");
        this._state = 0, this._handled = !1, this._value = void 0, this._deferreds = [], c(t, this)
    }

    function o(t, e) {
        for (; 3 === t._state;) t = t._value;
        0 !== t._state ? (t._handled = !0, r._immediateFn(function () {
            var n = 1 === t._state ? e.onFulfilled : e.onRejected;
            if (null !== n) {
                var r;
                try {
                    r = n(t._value)
                } catch (t) {
                    return void a(e.promise, t)
                }
                i(e.promise, r)
            } else(1 === t._state ? i : a)(e.promise, t._value)
        })) : t._deferreds.push(e)
    }

    function i(t, e) {
        try {
            if (e === t) throw new TypeError("A promise cannot be resolved with itself.");
            if (e && ("object" == typeof e || "function" == typeof e)) {
                var n = e.then;
                if (e instanceof r) return t._state = 3, t._value = e, void u(t);
                if ("function" == typeof n) return void c(function (t, e) {
                    return function () {
                        t.apply(e, arguments)
                    }
                }(n, e), t)
            }
            t._state = 1, t._value = e, u(t)
        } catch (e) {
            a(t, e)
        }
    }

    function a(t, e) {
        t._state = 2, t._value = e, u(t)
    }

    function u(t) {
        2 === t._state && 0 === t._deferreds.length && r._immediateFn(function () {
            t._handled || r._unhandledRejectionFn(t._value)
        });
        for (var e = 0, n = t._deferreds.length; n > e; e++) o(t, t._deferreds[e]);
        t._deferreds = null
    }

    function c(t, e) {
        var n = !1;
        try {
            t(function (t) {
                n || (n = !0, i(e, t))
            }, function (t) {
                n || (n = !0, a(e, t))
            })
        } catch (t) {
            if (n) return;
            n = !0, a(e, t)
        }
    }
    var f = setTimeout;
    r.prototype.catch = function (t) {
        return this.then(null, t)
    }, r.prototype.then = function (t, e) {
        var r = new this.constructor(n);
        return o(this, new function (t, e, n) {
            this.onFulfilled = "function" == typeof t ? t : null, this.onRejected = "function" == typeof e ? e : null, this.promise = n
        }(t, e, r)), r
    }, r.prototype.finally = t, r.all = function (t) {
        return new r(function (n, r) {
            function o(t, e) {
                try {
                    if (e && ("object" == typeof e || "function" == typeof e)) {
                        var u = e.then;
                        if ("function" == typeof u) return void u.call(e, function (e) {
                            o(t, e)
                        }, r)
                    }
                    i[t] = e, 0 == --a && n(i)
                } catch (t) {
                    r(t)
                }
            }
            if (!e(t)) return r(new TypeError("Promise.all accepts an array"));
            var i = Array.prototype.slice.call(t);
            if (0 === i.length) return n([]);
            for (var a = i.length, u = 0; i.length > u; u++) o(u, i[u])
        })
    }, r.resolve = function (t) {
        return t && "object" == typeof t && t.constructor === r ? t : new r(function (e) {
            e(t)
        })
    }, r.reject = function (t) {
        return new r(function (e, n) {
            n(t)
        })
    }, r.race = function (t) {
        return new r(function (n, o) {
            if (!e(t)) return o(new TypeError("Promise.race accepts an array"));
            for (var i = 0, a = t.length; a > i; i++) r.resolve(t[i]).then(n, o)
        })
    }, r._immediateFn = "function" == typeof setImmediate && function (t) {
        setImmediate(t)
    } || function (t) {
        f(t, 0)
    }, r._unhandledRejectionFn = function (t) {
        void 0 !== console && console && console.warn("Possible Unhandled Promise Rejection:", t)
    };
    var s = function () {
        if ("undefined" != typeof self) return self;
        if ("undefined" != typeof window) return window;
        if ("undefined" != typeof global) return global;
        throw Error("unable to locate global object")
    }();
    "Promise" in s ? s.Promise.prototype.finally || (s.Promise.prototype.finally = t) : s.Promise = r
}),
function (t, e) {
    "object" == typeof exports && "undefined" != typeof module ? e(exports) : "function" == typeof define && define.amd ? define(["exports"], e) : e((t = t || self).clipboard = {})
}(this, function (t) {
    "use strict";

    function e(t, e, n, r) {
        return new(n || (n = Promise))(function (o, i) {
            function a(t) {
                try {
                    c(r.next(t))
                } catch (t) {
                    i(t)
                }
            }

            function u(t) {
                try {
                    c(r.throw(t))
                } catch (t) {
                    i(t)
                }
            }

            function c(t) {
                t.done ? o(t.value) : new n(function (e) {
                    e(t.value)
                }).then(a, u)
            }
            c((r = r.apply(t, e || [])).next())
        })
    }

    function n(t, e) {
        var n, r, o, i, a = {
            label: 0,
            sent: function () {
                if (1 & o[0]) throw o[1];
                return o[1]
            },
            trys: [],
            ops: []
        };
        return i = {
            next: u(0),
            throw: u(1),
            return: u(2)
        }, "function" == typeof Symbol && (i[Symbol.iterator] = function () {
            return this
        }), i;

        function u(i) {
            return function (u) {
                return function (i) {
                    if (n) throw new TypeError("Generator is already executing.");
                    for (; a;) try {
                        if (n = 1, r && (o = 2 & i[0] ? r.return : i[0] ? r.throw || ((o = r.return) && o.call(r), 0) : r.next) && !(o = o.call(r, i[1])).done) return o;
                        switch (r = 0, o && (i = [2 & i[0], o.value]), i[0]) {
                            case 0:
                            case 1:
                                o = i;
                                break;
                            case 4:
                                return a.label++, {
                                    value: i[1],
                                    done: !1
                                };
                            case 5:
                                a.label++, r = i[1], i = [0];
                                continue;
                            case 7:
                                i = a.ops.pop(), a.trys.pop();
                                continue;
                            default:
                                if (!(o = (o = a.trys).length > 0 && o[o.length - 1]) && (6 === i[0] || 2 === i[0])) {
                                    a = 0;
                                    continue
                                }
                                if (3 === i[0] && (!o || i[1] > o[0] && i[1] < o[3])) {
                                    a.label = i[1];
                                    break
                                }
                                if (6 === i[0] && a.label < o[1]) {
                                    a.label = o[1], o = i;
                                    break
                                }
                                if (o && a.label < o[2]) {
                                    a.label = o[2], a.ops.push(i);
                                    break
                                }
                                o[2] && a.ops.pop(), a.trys.pop();
                                continue
                        }
                        i = e.call(t, a)
                    } catch (t) {
                        i = [6, t], r = 0
                    } finally {
                        n = o = 0
                    }
                    if (5 & i[0]) throw i[1];
                    return {
                        value: i[0] ? i[1] : void 0,
                        done: !0
                    }
                }([i, u])
            }
        }
    }
    var r = ["text/plain", "text/html"];
    var o = function () {
            (console.warn || console.log).call(arguments)
        }.bind(console, "[clipboard-polyfill]"),
        i = !0;
    var a = function () {
            function t() {
                this.m = {}
            }
            return t.prototype.setData = function (t, e) {
                i && -1 === r.indexOf(t) && o("Unknown data type: " + t, "Call clipboard.suppressWarnings() to suppress this warning."), this.m[t] = e
            }, t.prototype.getData = function (t) {
                return this.m[t]
            }, t.prototype.forEach = function (t) {
                for (var e in this.m) t(this.m[e], e)
            }, t
        }(),
        u = function (t) {},
        c = !0;
    var f = function () {
            (console.warn || console.log).apply(console, arguments)
        }.bind("[clipboard-polyfill]"),
        s = "text/plain";

    function l(t) {
        u = t
    }

    function d() {
        c = !1, i = !1
    }

    function p(t) {
        return e(this, void 0, void 0, function () {
            var e;
            return n(this, function (n) {
                if (c && !t.getData(s) && f("clipboard.write() was called without a `text/plain` data type. On some platforms, this may result in an empty clipboard. Call clipboard.suppressWarnings() to suppress this warning."), j()) {
                    if (function (t) {
                            var e = t.getData(s);
                            if (void 0 !== e) return window.clipboardData.setData("Text", e);
                            throw new Error("No `text/plain` value was specified.")
                        }(t)) return [2];
                    throw new Error("Copying failed, possibly because the user rejected it.")
                }
                if (x(t)) return u("regular execCopy worked"), [2];
                if (navigator.userAgent.indexOf("Edge") > -1) return u('UA "Edge" => assuming success'), [2];
                if (_(document.body, t)) return u("copyUsingTempSelection worked"), [2];
                if (function (t) {
                        var e = document.createElement("div");
                        e.setAttribute("style", "-webkit-user-select: text !important"), e.textContent = "temporary element", document.body.appendChild(e);
                        var n = _(e, t);
                        return document.body.removeChild(e), n
                    }(t)) return u("copyUsingTempElem worked"), [2];
                if (void 0 !== (e = t.getData(s)) && function (t) {
                        u("copyTextUsingDOM");
                        var e = document.createElement("div");
                        e.setAttribute("style", "-webkit-user-select: text !important");
                        var n = e;
                        e.attachShadow && (u("Using shadow DOM."), n = e.attachShadow({
                            mode: "open"
                        }));
                        var r = document.createElement("span");
                        r.innerText = t, n.appendChild(r), document.body.appendChild(e), T(r);
                        var o = document.execCommand("copy");
                        return E(), document.body.removeChild(e), o
                    }(e)) return u("copyTextUsingDOM worked"), [2];
                throw new Error("Copy command failed.")
            })
        })
    }

    function h(t) {
        return e(this, void 0, void 0, function () {
            return n(this, function (e) {
                return navigator.clipboard && navigator.clipboard.writeText ? (u("Using `navigator.clipboard.writeText()`."), [2, navigator.clipboard.writeText(t)]) : [2, p(D(t))]
            })
        })
    }

    function v() {
        return e(this, void 0, void 0, function () {
            var t;
            return n(this, function (e) {
                switch (e.label) {
                    case 0:
                        return t = D, [4, y()];
                    case 1:
                        return [2, t.apply(void 0, [e.sent()])]
                }
            })
        })
    }

    function y() {
        return e(this, void 0, void 0, function () {
            return n(this, function (t) {
                if (navigator.clipboard && navigator.clipboard.readText) return u("Using `navigator.clipboard.readText()`."), [2, navigator.clipboard.readText()];
                if (j()) return u("Reading text using IE strategy."), [2, C()];
                throw new Error("Read is not supported in your browser.")
            })
        })
    }
    var m = !1;

    function w() {
        m || (c && f('The deprecated default object of `clipboard-polyfill` was called. Please switch to `import * as clipboard from "clipboard-polyfill"` and see https://github.com/lgarron/clipboard-polyfill/issues/101 for more info.'), m = !0)
    }
    var b = {
            DT: a,
            setDebugLog: function (t) {
                return w(), l(t)
            },
            suppressWarnings: function () {
                return w(), d()
            },
            write: function (t) {
                return e(this, void 0, void 0, function () {
                    return n(this, function (e) {
                        return w(), [2, p(t)]
                    })
                })
            },
            writeText: function (t) {
                return e(this, void 0, void 0, function () {
                    return n(this, function (e) {
                        return w(), [2, h(t)]
                    })
                })
            },
            read: function () {
                return e(this, void 0, void 0, function () {
                    return n(this, function (t) {
                        return w(), [2, v()]
                    })
                })
            },
            readText: function () {
                return e(this, void 0, void 0, function () {
                    return n(this, function (t) {
                        return w(), [2, y()]
                    })
                })
            }
        },
        g = function () {
            this.success = !1
        };

    function x(t) {
        var e = new g,
            n = function (t, e, n) {
                u("listener called"), t.success = !0, e.forEach(function (e, r) {
                    var o = n.clipboardData;
                    o.setData(r, e), r === s && o.getData(r) !== e && (u("setting text/plain failed"), t.success = !1)
                }), n.preventDefault()
            }.bind(this, e, t);
        document.addEventListener("copy", n);
        try {
            document.execCommand("copy")
        } finally {
            document.removeEventListener("copy", n)
        }
        return e.success
    }

    function _(t, e) {
        T(t);
        var n = x(e);
        return E(), n
    }

    function T(t) {
        var e = document.getSelection();
        if (e) {
            var n = document.createRange();
            n.selectNodeContents(t), e.removeAllRanges(), e.addRange(n)
        }
    }

    function E() {
        var t = document.getSelection();
        t && t.removeAllRanges()
    }

    function D(t) {
        var e = new a;
        return e.setData(s, t), e
    }

    function j() {
        return "undefined" == typeof ClipboardEvent && void 0 !== window.clipboardData && void 0 !== window.clipboardData.setData
    }

    function C() {
        return e(this, void 0, void 0, function () {
            var t;
            return n(this, function (e) {
                if ("" === (t = window.clipboardData.getData("Text"))) throw new Error("Empty clipboard or could not read plain text from clipboard");
                return [2, t]
            })
        })
    }
    t.DT = a, t.default = b, t.read = v, t.readText = y, t.setDebugLog = l, t.suppressWarnings = d, t.write = p, t.writeText = h, Object.defineProperty(t, "__esModule", {
        value: !0
    })
});
//# sourceMappingURL=clipboard-polyfill.promise.js.map