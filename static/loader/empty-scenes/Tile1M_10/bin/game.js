!function (t, e) {
  for (var n in e) {
    t[n] = e[n];
  }
}(this, function (t) {
  var e = {};

  function n(o) {
    if (e[o]) return e[o].exports;
    var r = e[o] = {
      i: o,
      l: !1,
      exports: {}
    };
    return t[o].call(r.exports, r, r.exports, n), r.l = !0, r.exports;
  }

  return n.m = t, n.c = e, n.d = function (t, e, o) {
    n.o(t, e) || Object.defineProperty(t, e, {
      enumerable: !0,
      get: o
    });
  }, n.r = function (t) {
    "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(t, Symbol.toStringTag, {
      value: "Module"
    }), Object.defineProperty(t, "__esModule", {
      value: !0
    });
  }, n.t = function (t, e) {
    if (1 & e && (t = n(t)), 8 & e) return t;
    if (4 & e && "object" == typeof t && t && t.__esModule) return t;
    var o = Object.create(null);
    if (n.r(o), Object.defineProperty(o, "default", {
      enumerable: !0,
      value: t
    }), 2 & e && "string" != typeof t) for (var r in t) {
      n.d(o, r, function (e) {
        return t[e];
      }.bind(null, r));
    }
    return o;
  }, n.n = function (t) {
    var e = t && t.__esModule ? function () {
      return t.default;
    } : function () {
      return t;
    };
    return n.d(e, "a", e), e;
  }, n.o = function (t, e) {
    return Object.prototype.hasOwnProperty.call(t, e);
  }, n.p = "", n(n.s = 25);
}([function (t, e, n) {
  "use strict";

  var o = this && this.__assign || function () {
    return (o = Object.assign || function (t) {
      for (var e, n = 1, o = arguments.length; n < o; n++) {
        for (var r in e = arguments[n]) {
          Object.prototype.hasOwnProperty.call(e, r) && (t[r] = e[r]);
        }
      }

      return t;
    }).apply(this, arguments);
  },
      r = this && this.__decorate || function (t, e, n, o) {
    var r,
        i = arguments.length,
        s = i < 3 ? e : null === o ? o = Object.getOwnPropertyDescriptor(e, n) : o;
    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) s = Reflect.decorate(t, e, n, o);else for (var a = t.length - 1; a >= 0; a--) {
      (r = t[a]) && (s = (i < 3 ? r(s) : i > 3 ? r(e, n, s) : r(e, n)) || s);
    }
    return i > 3 && s && Object.defineProperty(e, n, s), s;
  },
      i = this && this.__read || function (t, e) {
    var n = "function" == typeof Symbol && t[Symbol.iterator];
    if (!n) return t;
    var o,
        r,
        i = n.call(t),
        s = [];

    try {
      for (; (void 0 === e || e-- > 0) && !(o = i.next()).done;) {
        s.push(o.value);
      }
    } catch (t) {
      r = {
        error: t
      };
    } finally {
      try {
        o && !o.done && (n = i.return) && n.call(i);
      } finally {
        if (r) throw r.error;
      }
    }

    return s;
  },
      s = this && this.__spread || function () {
    for (var t = [], e = 0; e < arguments.length; e++) {
      t = t.concat(i(arguments[e]));
    }

    return t;
  };

  Object.defineProperty(e, "__esModule", {
    value: !0
  });

  var a = n(2),
      p = n(8),
      u = n(16),
      h = "__name__symbol_",
      l = "__classId__symbol_",
      c = "__component__id_",
      f = function () {
    function t(t, e, n) {
      this.componentId = t, this.componentName = e, this.classId = n;
    }

    return t = r([p.EventConstructor()], t);
  }();

  e.DisposableComponentCreated = f;

  var d = function () {
    function t(t) {
      this.componentId = t;
    }

    return t = r([p.EventConstructor()], t);
  }();

  e.DisposableComponentRemoved = d;

  var y = function () {
    function t(t, e) {
      this.componentId = t, this.component = e;
    }

    return t = r([p.EventConstructor()], t);
  }();

  function v(t, e) {
    return function (n) {
      if (n.isComponent) throw new TypeError("You cannot extend a component. Trying to extend " + n.originalClassName + " with: " + t);
      if ("number" != typeof e || isNaN(e)) throw new Error("classId: " + e + " is an invalid integer");

      var o = n,
          r = function r() {
        if (!v.engine) throw new Error("You need to set a DisposableComponent.engine before creating disposable components");
        var n = Array.prototype.slice.call(arguments),
            r = new (o.bind.apply(o, s([void 0], n)))(),
            i = a.newId("C");
        return Object.defineProperty(r, h, {
          enumerable: !1,
          writable: !1,
          configurable: !1,
          value: t
        }), Object.defineProperty(r, c, {
          enumerable: !1,
          writable: !1,
          configurable: !1,
          value: i
        }), void 0 !== e && Object.defineProperty(r, l, {
          enumerable: !1,
          writable: !1,
          configurable: !1,
          value: e
        }), v.engine && v.engine.registerComponent(r), r;
      };

      return void 0 !== e && (r[l] = e), r[h] = t, r.isComponent = !0, r.isDisposableComponent = !0, r.originalClassName = t, (r.prototype = n.prototype).constructor = n, r;
    };
  }

  function m(t) {
    if (!t) throw new TypeError(t + " is not a component.");
    if (t[c]) return t[c];
    throw new TypeError(t + " is not a registered disposable component.");
  }

  e.DisposableComponentUpdated = y, e.Component = function (t, e) {
    return function (n) {
      if (n.isComponent) throw new TypeError("You cannot extend a component. Trying to extend " + n.originalClassName + " with: " + t);

      var o = n,
          r = function r() {
        var n = Array.prototype.slice.call(arguments),
            r = new (o.bind.apply(o, s([void 0], n)))();
        return Object.defineProperty(r, h, {
          enumerable: !1,
          writable: !1,
          configurable: !1,
          value: t
        }), void 0 !== e && Object.defineProperty(r, l, {
          enumerable: !1,
          writable: !1,
          configurable: !1,
          value: e
        }), r;
      };

      return void 0 !== e && (r[l] = e), r[h] = t, r.isComponent = !0, r.originalClassName = t, (r.prototype = n.prototype).constructor = n, r;
    };
  }, e.DisposableComponent = v, function (t) {
    t.engine = null;
  }(v = e.DisposableComponent || (e.DisposableComponent = {})), e.getComponentName = function (t) {
    if (!t) throw new TypeError(t + " is not a component.");
    if (t[h]) return t[h];
    throw new TypeError(t + " is not a registered component.");
  }, e.getComponentClassId = function (t) {
    if (!t) throw new TypeError(t + " is not a component.");
    if (t[l]) return t[l];
    if (!t[h]) throw new TypeError(t + " is not a registered component.");
    return null;
  }, e.getComponentId = m;

  var b = function () {
    function t() {
      this.dirty = !1, this.data = {}, this.subscriptions = [];
    }

    return t.component = function (t, e) {
      if (delete t[e]) {
        var n = e + "_" + Math.random();
        t[n] = void 0, Object.defineProperty(t, n, o({}, Object.getOwnPropertyDescriptor(t, n), {
          enumerable: !1
        })), Object.defineProperty(t, e.toString(), {
          get: function get() {
            return this[n];
          },
          set: function set(t) {
            var o = this[n];

            if (this.data[e] = t ? m(t) : null, this[n] = t, t !== o) {
              this.dirty = !0;

              for (var r = 0; r < this.subscriptions.length; r++) {
                this.subscriptions[r](e, t, o);
              }
            }
          },
          enumerable: !0
        });
      }
    }, t.field = function (t, e) {
      delete t[e] && Object.defineProperty(t, e.toString(), {
        get: function get() {
          return this.data[e];
        },
        set: function set(t) {
          var n = this.data[e];

          if (this.data[e] = t, t !== n) {
            this.dirty = !0;

            for (var o = 0; o < this.subscriptions.length; o++) {
              this.subscriptions[o](e, t, n);
            }
          }
        },
        enumerable: !0
      });
    }, t.uiValue = function (t, e) {
      delete t[e] && Object.defineProperty(t, e.toString(), {
        get: function get() {
          return this.data[e].toString();
        },
        set: function set(t) {
          var n = this.data[e],
              o = new u.UIValue(t);

          if (this.data[e] = o, o !== n) {
            this.dirty = !0;

            for (var r = 0; r < this.subscriptions.length; r++) {
              this.subscriptions[r](e, o, n);
            }
          }
        },
        enumerable: !0
      });
    }, t.readonly = function (t, e) {
      delete t[e] && Object.defineProperty(t, e.toString(), {
        get: function get() {
          if (e in this.data == !1) throw new Error("The field " + e + " is uninitialized");
          return this.data[e];
        },
        set: function set(t) {
          if (e in this.data) throw new Error("The field " + e + " is readonly");
          this.data[e] = t, this.dirty = !0;
        },
        enumerable: !0,
        configurable: !1
      });
    }, t.prototype.onChange = function (t) {
      return this.subscriptions.push(t), this;
    }, t.prototype.toJSON = function () {
      return this.data;
    }, t;
  }();

  e.ObservableComponent = b, e.isDisposableComponent = function (t) {
    return c in t;
  };
}, function (t, e, n) {
  "use strict";

  Object.defineProperty(e, "__esModule", {
    value: !0
  }), function (t) {
    t[t.CW = 0] = "CW", t[t.CCW = 1] = "CCW";
  }(e.Orientation || (e.Orientation = {})), function (t) {
    t[t.LOCAL = 0] = "LOCAL", t[t.WORLD = 1] = "WORLD", t[t.BONE = 2] = "BONE";
  }(e.Space || (e.Space = {})), e.ToGammaSpace = 1 / 2.2, e.ToLinearSpace = 2.2, e.Epsilon = 1e-6, e.DEG2RAD = Math.PI / 180, e.RAD2DEG = 360 / (2 * Math.PI);
}, function (t, e, n) {
  "use strict";

  var o = this && this.__read || function (t, e) {
    var n = "function" == typeof Symbol && t[Symbol.iterator];
    if (!n) return t;
    var o,
        r,
        i = n.call(t),
        s = [];

    try {
      for (; (void 0 === e || e-- > 0) && !(o = i.next()).done;) {
        s.push(o.value);
      }
    } catch (t) {
      r = {
        error: t
      };
    } finally {
      try {
        o && !o.done && (n = i.return) && n.call(i);
      } finally {
        if (r) throw r.error;
      }
    }

    return s;
  },
      r = this && this.__spread || function () {
    for (var t = [], e = 0; e < arguments.length; e++) {
      t = t.concat(o(arguments[e]));
    }

    return t;
  };

  Object.defineProperty(e, "__esModule", {
    value: !0
  });
  var i = 0;
  e.log = function () {
    for (var t = [], e = 0; e < arguments.length; e++) {
      t[e] = arguments[e];
    }

    "undefined" != typeof dcl ? dcl.log.apply(dcl, r(t)) : console.log.apply(console, r(["DEBUG:"], t));
  }, e.error = function (t, e) {
    "undefined" != typeof dcl ? dcl.error(t, e) : console.error("ERROR:", t, e);
  }, e.newId = function (t) {
    if (i++, 0 === t.length) throw new Error("newId(type: string): type cannot be empty");
    return t + i.toString(36);
  }, e.uuid = function () {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (t) {
      var e = 16 * Math.random() | 0;
      return ("x" === t ? e : 3 & e | 8).toString(16);
    });
  }, e.buildArray = function (t, e) {
    for (var n = [], o = 0; o < t; ++o) {
      n.push(e());
    }

    return n;
  };
}, function (t, e, n) {
  "use strict";

  Object.defineProperty(e, "__esModule", {
    value: !0
  });

  var o = n(9),
      r = n(1),
      i = n(10),
      s = n(4),
      a = function () {
    function t(t, e, n) {
      void 0 === t && (t = 0), void 0 === e && (e = 0), void 0 === n && (n = 0), this.x = t, this.y = e, this.z = n;
    }

    return Object.defineProperty(t.prototype, "isNonUniform", {
      get: function get() {
        var t = Math.abs(this.x),
            e = Math.abs(this.y);
        if (t !== e) return !0;
        var n = Math.abs(this.z);
        return t !== n || e !== n;
      },
      enumerable: !0,
      configurable: !0
    }), t.Add = function (e, n) {
      return new t(e.x, e.y, e.z).addInPlace(n);
    }, t.GetClipFactor = function (e, n, o, r) {
      var i = t.Dot(e, o) - r;
      return i / (i - (t.Dot(n, o) - r));
    }, t.GetAngleBetweenVectors = function (e, n, r) {
      var i = e.normalizeToRef(o.MathTmp.Vector3[1]),
          s = n.normalizeToRef(o.MathTmp.Vector3[2]),
          a = t.Dot(i, s),
          p = o.MathTmp.Vector3[3];
      return t.CrossToRef(i, s, p), t.Dot(p, r) > 0 ? Math.acos(a) : -Math.acos(a);
    }, t.FromArray = function (e, n) {
      return void 0 === n && (n = 0), new t(e[n], e[n + 1], e[n + 2]);
    }, t.FromFloatArray = function (e, n) {
      return t.FromArray(e, n);
    }, t.FromArrayToRef = function (t, e, n) {
      n.x = t[e], n.y = t[e + 1], n.z = t[e + 2];
    }, t.FromFloatArrayToRef = function (e, n, o) {
      return t.FromArrayToRef(e, n, o);
    }, t.FromFloatsToRef = function (t, e, n, o) {
      o.copyFromFloats(t, e, n);
    }, t.Zero = function () {
      return new t(0, 0, 0);
    }, t.One = function () {
      return new t(1, 1, 1);
    }, t.Up = function () {
      return new t(0, 1, 0);
    }, t.Down = function () {
      return new t(0, -1, 0);
    }, t.Forward = function () {
      return new t(0, 0, 1);
    }, t.Backward = function () {
      return new t(0, 0, -1);
    }, t.Right = function () {
      return new t(1, 0, 0);
    }, t.Left = function () {
      return new t(-1, 0, 0);
    }, t.TransformCoordinates = function (e, n) {
      var o = t.Zero();
      return t.TransformCoordinatesToRef(e, n, o), o;
    }, t.TransformCoordinatesToRef = function (e, n, o) {
      return t.TransformCoordinatesFromFloatsToRef(e.x, e.y, e.z, n, o);
    }, t.TransformCoordinatesFromFloatsToRef = function (t, e, n, o, r) {
      var i = o.m,
          s = t * i[0] + e * i[4] + n * i[8] + i[12],
          a = t * i[1] + e * i[5] + n * i[9] + i[13],
          p = t * i[2] + e * i[6] + n * i[10] + i[14],
          u = 1 / (t * i[3] + e * i[7] + n * i[11] + i[15]);
      r.x = s * u, r.y = a * u, r.z = p * u;
    }, t.TransformNormal = function (e, n) {
      var o = t.Zero();
      return t.TransformNormalToRef(e, n, o), o;
    }, t.TransformNormalToRef = function (t, e, n) {
      this.TransformNormalFromFloatsToRef(t.x, t.y, t.z, e, n);
    }, t.TransformNormalFromFloatsToRef = function (t, e, n, o, r) {
      var i = o.m;
      r.x = t * i[0] + e * i[4] + n * i[8], r.y = t * i[1] + e * i[5] + n * i[9], r.z = t * i[2] + e * i[6] + n * i[10];
    }, t.CatmullRom = function (e, n, o, r, i) {
      var s = i * i,
          a = i * s;
      return new t(.5 * (2 * n.x + (-e.x + o.x) * i + (2 * e.x - 5 * n.x + 4 * o.x - r.x) * s + (-e.x + 3 * n.x - 3 * o.x + r.x) * a), .5 * (2 * n.y + (-e.y + o.y) * i + (2 * e.y - 5 * n.y + 4 * o.y - r.y) * s + (-e.y + 3 * n.y - 3 * o.y + r.y) * a), .5 * (2 * n.z + (-e.z + o.z) * i + (2 * e.z - 5 * n.z + 4 * o.z - r.z) * s + (-e.z + 3 * n.z - 3 * o.z + r.z) * a));
    }, t.Clamp = function (e, n, o) {
      var r = new t();
      return t.ClampToRef(e, n, o, r), r;
    }, t.ClampToRef = function (t, e, n, o) {
      var r = t.x;
      r = (r = r > n.x ? n.x : r) < e.x ? e.x : r;
      var i = t.y;
      i = (i = i > n.y ? n.y : i) < e.y ? e.y : i;
      var s = t.z;
      s = (s = s > n.z ? n.z : s) < e.z ? e.z : s, o.copyFromFloats(r, i, s);
    }, t.Hermite = function (e, n, o, r, i) {
      var s = i * i,
          a = i * s,
          p = 2 * a - 3 * s + 1,
          u = -2 * a + 3 * s,
          h = a - 2 * s + i,
          l = a - s;
      return new t(e.x * p + o.x * u + n.x * h + r.x * l, e.y * p + o.y * u + n.y * h + r.y * l, e.z * p + o.z * u + n.z * h + r.z * l);
    }, t.Lerp = function (e, n, o) {
      var r = new t(0, 0, 0);
      return t.LerpToRef(e, n, o, r), r;
    }, t.LerpToRef = function (t, e, n, o) {
      o.x = t.x + (e.x - t.x) * n, o.y = t.y + (e.y - t.y) * n, o.z = t.z + (e.z - t.z) * n;
    }, t.Dot = function (t, e) {
      return t.x * e.x + t.y * e.y + t.z * e.z;
    }, t.Cross = function (e, n) {
      var o = t.Zero();
      return t.CrossToRef(e, n, o), o;
    }, t.CrossToRef = function (t, e, n) {
      var o = t.y * e.z - t.z * e.y,
          r = t.z * e.x - t.x * e.z,
          i = t.x * e.y - t.y * e.x;
      n.copyFromFloats(o, r, i);
    }, t.Normalize = function (e) {
      var n = t.Zero();
      return t.NormalizeToRef(e, n), n;
    }, t.NormalizeToRef = function (t, e) {
      t.normalizeToRef(e);
    }, t.Minimize = function (e, n) {
      var o = new t(e.x, e.y, e.z);
      return o.minimizeInPlace(n), o;
    }, t.Maximize = function (e, n) {
      var o = new t(e.x, e.y, e.z);
      return o.maximizeInPlace(n), o;
    }, t.Distance = function (e, n) {
      return Math.sqrt(t.DistanceSquared(e, n));
    }, t.DistanceSquared = function (t, e) {
      var n = t.x - e.x,
          o = t.y - e.y,
          r = t.z - e.z;
      return n * n + o * o + r * r;
    }, t.Center = function (e, n) {
      var o = t.Add(e, n);
      return o.scaleInPlace(.5), o;
    }, t.RotationFromAxis = function (e, n, o) {
      var r = t.Zero();
      return t.RotationFromAxisToRef(e, n, o, r), r;
    }, t.RotationFromAxisToRef = function (t, e, n, r) {
      var s = o.MathTmp.Quaternion[0];
      i.Quaternion.RotationQuaternionFromAxisToRef(t, e, n, s), r.copyFrom(s.eulerAngles);
    }, t.prototype.toString = function () {
      return "(" + this.x + ", " + this.y + ", " + this.z + ")";
    }, t.prototype.getClassName = function () {
      return "Vector3";
    }, t.prototype.getHashCode = function () {
      var t = this.x || 0;
      return t = 397 * (t = 397 * t ^ (this.y || 0)) ^ (this.z || 0);
    }, t.prototype.asArray = function () {
      var t = [];
      return this.toArray(t, 0), t;
    }, t.prototype.toArray = function (t, e) {
      return void 0 === e && (e = 0), t[e] = this.x, t[e + 1] = this.y, t[e + 2] = this.z, this;
    }, t.prototype.toQuaternion = function () {
      return i.Quaternion.Identity.setEuler(this.y, this.x, this.z);
    }, t.prototype.addInPlace = function (t) {
      return this.addInPlaceFromFloats(t.x, t.y, t.z);
    }, t.prototype.addInPlaceFromFloats = function (t, e, n) {
      return this.x += t, this.y += e, this.z += n, this;
    }, t.prototype.add = function (e) {
      return new t(this.x + e.x, this.y + e.y, this.z + e.z);
    }, t.prototype.addToRef = function (t, e) {
      return e.copyFromFloats(this.x + t.x, this.y + t.y, this.z + t.z);
    }, t.prototype.subtractInPlace = function (t) {
      return this.x -= t.x, this.y -= t.y, this.z -= t.z, this;
    }, t.prototype.subtract = function (e) {
      return new t(this.x - e.x, this.y - e.y, this.z - e.z);
    }, t.prototype.subtractToRef = function (t, e) {
      return this.subtractFromFloatsToRef(t.x, t.y, t.z, e);
    }, t.prototype.subtractFromFloats = function (e, n, o) {
      return new t(this.x - e, this.y - n, this.z - o);
    }, t.prototype.subtractFromFloatsToRef = function (t, e, n, o) {
      return o.copyFromFloats(this.x - t, this.y - e, this.z - n);
    }, t.prototype.applyMatrix4 = function (t) {
      this.applyMatrix4ToRef(t, this);
    }, t.prototype.applyMatrix4ToRef = function (t, e) {
      var n = this.x,
          o = this.y,
          r = this.z,
          i = t.m,
          s = 1 / (i[3] * n + i[7] * o + i[11] * r + i[15]);
      return e.x = (i[0] * n + i[4] * o + i[8] * r + i[12]) * s, e.y = (i[1] * n + i[5] * o + i[9] * r + i[13]) * s, e.z = (i[2] * n + i[6] * o + i[10] * r + i[14]) * s, e;
    }, t.prototype.rotate = function (t) {
      return this.rotateToRef(t, this);
    }, t.prototype.rotateToRef = function (t, e) {
      var n = this.x,
          o = this.y,
          r = this.z,
          i = t.x,
          s = t.y,
          a = t.z,
          p = t.w,
          u = p * n + s * r - a * o,
          h = p * o + a * n - i * r,
          l = p * r + i * o - s * n,
          c = -i * n - s * o - a * r;
      return e.x = u * p + c * -i + h * -a - l * -s, e.y = h * p + c * -s + l * -i - u * -a, e.z = l * p + c * -a + u * -s - h * -i, e;
    }, t.prototype.negate = function () {
      return new t(-this.x, -this.y, -this.z);
    }, t.prototype.scaleInPlace = function (t) {
      return this.x *= t, this.y *= t, this.z *= t, this;
    }, t.prototype.scale = function (e) {
      return new t(this.x * e, this.y * e, this.z * e);
    }, t.prototype.scaleToRef = function (t, e) {
      return e.copyFromFloats(this.x * t, this.y * t, this.z * t);
    }, t.prototype.scaleAndAddToRef = function (t, e) {
      return e.addInPlaceFromFloats(this.x * t, this.y * t, this.z * t);
    }, t.prototype.equals = function (t) {
      return t && this.x === t.x && this.y === t.y && this.z === t.z;
    }, t.prototype.equalsWithEpsilon = function (t, e) {
      return void 0 === e && (e = r.Epsilon), t && s.Scalar.WithinEpsilon(this.x, t.x, e) && s.Scalar.WithinEpsilon(this.y, t.y, e) && s.Scalar.WithinEpsilon(this.z, t.z, e);
    }, t.prototype.equalsToFloats = function (t, e, n) {
      return this.x === t && this.y === e && this.z === n;
    }, t.prototype.multiplyInPlace = function (t) {
      return this.x *= t.x, this.y *= t.y, this.z *= t.z, this;
    }, t.prototype.multiply = function (t) {
      return this.multiplyByFloats(t.x, t.y, t.z);
    }, t.prototype.multiplyToRef = function (t, e) {
      return e.copyFromFloats(this.x * t.x, this.y * t.y, this.z * t.z);
    }, t.prototype.multiplyByFloats = function (e, n, o) {
      return new t(this.x * e, this.y * n, this.z * o);
    }, t.prototype.divide = function (e) {
      return new t(this.x / e.x, this.y / e.y, this.z / e.z);
    }, t.prototype.divideToRef = function (t, e) {
      return e.copyFromFloats(this.x / t.x, this.y / t.y, this.z / t.z);
    }, t.prototype.divideInPlace = function (t) {
      return this.divideToRef(t, this);
    }, t.prototype.minimizeInPlace = function (t) {
      return this.minimizeInPlaceFromFloats(t.x, t.y, t.z);
    }, t.prototype.maximizeInPlace = function (t) {
      return this.maximizeInPlaceFromFloats(t.x, t.y, t.z);
    }, t.prototype.minimizeInPlaceFromFloats = function (t, e, n) {
      return t < this.x && (this.x = t), e < this.y && (this.y = e), n < this.z && (this.z = n), this;
    }, t.prototype.maximizeInPlaceFromFloats = function (t, e, n) {
      return t > this.x && (this.x = t), e > this.y && (this.y = e), n > this.z && (this.z = n), this;
    }, t.prototype.floor = function () {
      return new t(Math.floor(this.x), Math.floor(this.y), Math.floor(this.z));
    }, t.prototype.fract = function () {
      return new t(this.x - Math.floor(this.x), this.y - Math.floor(this.y), this.z - Math.floor(this.z));
    }, t.prototype.length = function () {
      return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
    }, t.prototype.lengthSquared = function () {
      return this.x * this.x + this.y * this.y + this.z * this.z;
    }, t.prototype.normalize = function () {
      return this.normalizeFromLength(this.length());
    }, t.prototype.normalizeFromLength = function (t) {
      return 0 === t || 1 === t ? this : this.scaleInPlace(1 / t);
    }, t.prototype.normalizeToNew = function () {
      var e = new t(0, 0, 0);
      return this.normalizeToRef(e), e;
    }, t.prototype.normalizeToRef = function (t) {
      var e = this.length();
      return 0 === e || 1 === e ? t.copyFromFloats(this.x, this.y, this.z) : this.scaleToRef(1 / e, t);
    }, t.prototype.clone = function () {
      return new t(this.x, this.y, this.z);
    }, t.prototype.copyFrom = function (t) {
      return this.copyFromFloats(t.x, t.y, t.z);
    }, t.prototype.copyFromFloats = function (t, e, n) {
      return this.x = t, this.y = e, this.z = n, this;
    }, t.prototype.set = function (t, e, n) {
      return this.copyFromFloats(t, e, n);
    }, t.prototype.setAll = function (t) {
      return this.x = this.y = this.z = t, this;
    }, t;
  }();

  e.Vector3 = a;
}, function (t, e, n) {
  "use strict";

  Object.defineProperty(e, "__esModule", {
    value: !0
  });

  var o = function () {
    function t() {}

    return t.WithinEpsilon = function (t, e, n) {
      void 0 === n && (n = 1.401298e-45);
      var o = t - e;
      return -n <= o && o <= n;
    }, t.ToHex = function (t) {
      var e = t.toString(16);
      return t <= 15 ? ("0" + e).toUpperCase() : e.toUpperCase();
    }, t.Sign = function (t) {
      var e = +t;
      return 0 === e || isNaN(e) ? e : e > 0 ? 1 : -1;
    }, t.Clamp = function (t, e, n) {
      return void 0 === e && (e = 0), void 0 === n && (n = 1), Math.min(n, Math.max(e, t));
    }, t.Log2 = function (t) {
      return Math.log(t) * Math.LOG2E;
    }, t.Repeat = function (t, e) {
      return t - Math.floor(t / e) * e;
    }, t.Normalize = function (t, e, n) {
      return (t - e) / (n - e);
    }, t.Denormalize = function (t, e, n) {
      return t * (n - e) + e;
    }, t.DeltaAngle = function (e, n) {
      var o = t.Repeat(n - e, 360);
      return o > 180 && (o -= 360), o;
    }, t.PingPong = function (e, n) {
      var o = t.Repeat(e, 2 * n);
      return n - Math.abs(o - n);
    }, t.SmoothStep = function (e, n, o) {
      var r = t.Clamp(o);
      return n * (r = -2 * r * r * r + 3 * r * r) + e * (1 - r);
    }, t.MoveTowards = function (e, n, o) {
      return Math.abs(n - e) <= o ? n : e + t.Sign(n - e) * o;
    }, t.MoveTowardsAngle = function (e, n, o) {
      var r = t.DeltaAngle(e, n);
      return -o < r && r < o ? n : t.MoveTowards(e, e + r, o);
    }, t.Lerp = function (t, e, n) {
      return t + (e - t) * n;
    }, t.LerpAngle = function (e, n, o) {
      var r = t.Repeat(n - e, 360);
      return r > 180 && (r -= 360), e + r * t.Clamp(o);
    }, t.InverseLerp = function (e, n, o) {
      return e !== n ? t.Clamp((o - e) / (n - e)) : 0;
    }, t.Hermite = function (t, e, n, o, r) {
      var i = r * r,
          s = r * i;
      return t * (2 * s - 3 * i + 1) + n * (-2 * s + 3 * i) + e * (s - 2 * i + r) + o * (s - i);
    }, t.RandomRange = function (t, e) {
      return t === e ? t : Math.random() * (e - t) + t;
    }, t.RangeToPercent = function (t, e, n) {
      return (t - e) / (n - e);
    }, t.PercentToRange = function (t, e, n) {
      return (n - e) * t + e;
    }, t.NormalizeRadians = function (e) {
      return e - t.TwoPi * Math.floor((e + Math.PI) / t.TwoPi);
    }, t.TwoPi = 2 * Math.PI, t;
  }();

  e.Scalar = o;
}, function (t, e, n) {
  "use strict";

  var _o,
      r = this && this.__extends || (_o = function o(t, e) {
    return (_o = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (t, e) {
      t.__proto__ = e;
    } || function (t, e) {
      for (var n in e) {
        e.hasOwnProperty(n) && (t[n] = e[n]);
      }
    })(t, e);
  }, function (t, e) {
    function n() {
      this.constructor = t;
    }

    _o(t, e), t.prototype = null === e ? Object.create(e) : (n.prototype = e.prototype, new n());
  }),
      i = this && this.__assign || function () {
    return (i = Object.assign || function (t) {
      for (var e, n = 1, o = arguments.length; n < o; n++) {
        for (var r in e = arguments[n]) {
          Object.prototype.hasOwnProperty.call(e, r) && (t[r] = e[r]);
        }
      }

      return t;
    }).apply(this, arguments);
  },
      s = this && this.__decorate || function (t, e, n, o) {
    var r,
        i = arguments.length,
        s = i < 3 ? e : null === o ? o = Object.getOwnPropertyDescriptor(e, n) : o;
    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) s = Reflect.decorate(t, e, n, o);else for (var a = t.length - 1; a >= 0; a--) {
      (r = t[a]) && (s = (i < 3 ? r(s) : i > 3 ? r(e, n, s) : r(e, n)) || s);
    }
    return i > 3 && s && Object.defineProperty(e, n, s), s;
  };

  Object.defineProperty(e, "__esModule", {
    value: !0
  });
  var a,
      p = n(0),
      u = n(6),
      h = n(24),
      l = n(2);
  !function (t) {
    t[t.TRANSFORM = 1] = "TRANSFORM", t[t.UUID_CALLBACK = 8] = "UUID_CALLBACK", t[t.BOX_SHAPE = 16] = "BOX_SHAPE", t[t.SPHERE_SHAPE = 17] = "SPHERE_SHAPE", t[t.PLANE_SHAPE = 18] = "PLANE_SHAPE", t[t.CONE_SHAPE = 19] = "CONE_SHAPE", t[t.CYLINDER_SHAPE = 20] = "CYLINDER_SHAPE", t[t.TEXT_SHAPE = 21] = "TEXT_SHAPE", t[t.NFT_SHAPE = 22] = "NFT_SHAPE", t[t.UI_WORLD_SPACE_SHAPE = 23] = "UI_WORLD_SPACE_SHAPE", t[t.UI_SCREEN_SPACE_SHAPE = 24] = "UI_SCREEN_SPACE_SHAPE", t[t.UI_CONTAINER_RECT = 25] = "UI_CONTAINER_RECT", t[t.UI_CONTAINER_STACK = 26] = "UI_CONTAINER_STACK", t[t.UI_TEXT_SHAPE = 27] = "UI_TEXT_SHAPE", t[t.UI_INPUT_TEXT_SHAPE = 28] = "UI_INPUT_TEXT_SHAPE", t[t.UI_IMAGE_SHAPE = 29] = "UI_IMAGE_SHAPE", t[t.UI_SLIDER_SHAPE = 30] = "UI_SLIDER_SHAPE", t[t.CIRCLE_SHAPE = 31] = "CIRCLE_SHAPE", t[t.BILLBOARD = 32] = "BILLBOARD", t[t.ANIMATION = 33] = "ANIMATION", t[t.UI_FULLSCREEN_SHAPE = 40] = "UI_FULLSCREEN_SHAPE", t[t.UI_BUTTON_SHAPE = 41] = "UI_BUTTON_SHAPE", t[t.GLTF_SHAPE = 54] = "GLTF_SHAPE", t[t.OBJ_SHAPE = 55] = "OBJ_SHAPE", t[t.BASIC_MATERIAL = 64] = "BASIC_MATERIAL", t[t.PRB_MATERIAL = 65] = "PRB_MATERIAL", t[t.HIGHLIGHT_ENTITY = 66] = "HIGHLIGHT_ENTITY", t[t.SOUND = 67] = "SOUND", t[t.TEXTURE = 68] = "TEXTURE", t[t.AUDIO_CLIP = 200] = "AUDIO_CLIP", t[t.AUDIO_SOURCE = 201] = "AUDIO_SOURCE", t[t.GIZMOS = 203] = "GIZMOS";
  }(a = e.CLASS_ID || (e.CLASS_ID = {}));

  var c = function (t) {
    function e(e) {
      void 0 === e && (e = {});
      var n = t.call(this) || this;
      return n.position = e.position || u.Vector3.Zero(), n.rotation = e.rotation || u.Quaternion.Identity, n.scale = e.scale || new u.Vector3(1, 1, 1), n;
    }

    return r(e, t), Object.defineProperty(e.prototype, "eulerAngles", {
      get: function get() {
        return this.rotation.eulerAngles;
      },
      enumerable: !0,
      configurable: !0
    }), e.prototype.lookAt = function (t, e) {
      void 0 === e && (e = u.MathTmp.staticUp);
      var n = new u.Matrix();
      return u.Matrix.LookAtLHToRef(this.position, t, e, n), n.invert(), u.Quaternion.FromRotationMatrixToRef(n, this.rotation), this;
    }, e.prototype.rotate = function (t, e) {
      return this.rotation.multiplyInPlace(this.rotation.angleAxis(e, t)), this;
    }, e.prototype.translate = function (t) {
      return this.position.addInPlace(t), this;
    }, s([p.ObservableComponent.field], e.prototype, "position", void 0), s([p.ObservableComponent.field], e.prototype, "rotation", void 0), s([p.ObservableComponent.field], e.prototype, "scale", void 0), e = s([p.Component("engine.transform", a.TRANSFORM)], e);
  }(p.ObservableComponent);

  e.Transform = c;

  var f = function (t) {
    function e(e, n, o) {
      void 0 === e && (e = !0), void 0 === n && (n = !0), void 0 === o && (o = !0);
      var r = t.call(this) || this;
      return r.x = !0, r.y = !0, r.z = !0, r.x = e, r.y = n, r.z = o, r;
    }

    return r(e, t), s([p.ObservableComponent.field], e.prototype, "x", void 0), s([p.ObservableComponent.field], e.prototype, "y", void 0), s([p.ObservableComponent.field], e.prototype, "z", void 0), e = s([p.Component("engine.billboard", a.BILLBOARD)], e);
  }(p.ObservableComponent);

  e.Billboard = f;

  var d = function (t) {
    function e() {
      var e = null !== t && t.apply(this, arguments) || this;
      return e.withCollisions = !1, e.visible = !0, e;
    }

    return r(e, t), s([p.ObservableComponent.field], e.prototype, "withCollisions", void 0), s([p.ObservableComponent.field], e.prototype, "visible", void 0), e;
  }(p.ObservableComponent);

  e.Shape = d;

  var y = function (t) {
    function e() {
      return null !== t && t.apply(this, arguments) || this;
    }

    return r(e, t), e = s([p.DisposableComponent("engine.shape", a.BOX_SHAPE)], e);
  }(d);

  e.BoxShape = y;

  var v = function (t) {
    function e() {
      return null !== t && t.apply(this, arguments) || this;
    }

    return r(e, t), e = s([p.DisposableComponent("engine.shape", a.SPHERE_SHAPE)], e);
  }(d);

  e.SphereShape = v;

  var m = function (t) {
    function e() {
      return null !== t && t.apply(this, arguments) || this;
    }

    return r(e, t), s([p.ObservableComponent.field], e.prototype, "segments", void 0), s([p.ObservableComponent.field], e.prototype, "arc", void 0), e = s([p.DisposableComponent("engine.shape", a.CIRCLE_SHAPE)], e);
  }(d);

  e.CircleShape = m;

  var b = function (t) {
    function e() {
      var e = null !== t && t.apply(this, arguments) || this;
      return e.width = 1, e.height = 1, e;
    }

    return r(e, t), s([p.ObservableComponent.field], e.prototype, "width", void 0), s([p.ObservableComponent.field], e.prototype, "height", void 0), s([p.ObservableComponent.field], e.prototype, "uvs", void 0), e = s([p.DisposableComponent("engine.shape", a.PLANE_SHAPE)], e);
  }(d);

  e.PlaneShape = b;

  var g = function (t) {
    function e() {
      var e = null !== t && t.apply(this, arguments) || this;
      return e.radiusTop = 0, e.radiusBottom = 1, e.segmentsHeight = 1, e.segmentsRadial = 36, e.openEnded = !1, e.radius = null, e.arc = 360, e;
    }

    return r(e, t), s([p.ObservableComponent.field], e.prototype, "radiusTop", void 0), s([p.ObservableComponent.field], e.prototype, "radiusBottom", void 0), s([p.ObservableComponent.field], e.prototype, "segmentsHeight", void 0), s([p.ObservableComponent.field], e.prototype, "segmentsRadial", void 0), s([p.ObservableComponent.field], e.prototype, "openEnded", void 0), s([p.ObservableComponent.field], e.prototype, "radius", void 0), s([p.ObservableComponent.field], e.prototype, "arc", void 0), e = s([p.DisposableComponent("engine.shape", a.CONE_SHAPE)], e);
  }(d);

  e.ConeShape = g;

  var _ = function (t) {
    function e() {
      var e = null !== t && t.apply(this, arguments) || this;
      return e.radiusTop = 0, e.radiusBottom = 1, e.segmentsHeight = 1, e.segmentsRadial = 36, e.openEnded = !1, e.radius = null, e.arc = 360, e;
    }

    return r(e, t), s([p.ObservableComponent.field], e.prototype, "radiusTop", void 0), s([p.ObservableComponent.field], e.prototype, "radiusBottom", void 0), s([p.ObservableComponent.field], e.prototype, "segmentsHeight", void 0), s([p.ObservableComponent.field], e.prototype, "segmentsRadial", void 0), s([p.ObservableComponent.field], e.prototype, "openEnded", void 0), s([p.ObservableComponent.field], e.prototype, "radius", void 0), s([p.ObservableComponent.field], e.prototype, "arc", void 0), e = s([p.DisposableComponent("engine.shape", a.CYLINDER_SHAPE)], e);
  }(d);

  e.CylinderShape = _;

  var C = function (t) {
    function e(e) {
      var n = t.call(this) || this;
      return n.src = e, n;
    }

    return r(e, t), s([d.readonly], e.prototype, "src", void 0), e = s([p.DisposableComponent("engine.shape", a.GLTF_SHAPE)], e);
  }(d);

  e.GLTFShape = C;

  var x = function (t) {
    function e(e) {
      var n = t.call(this) || this;
      return n.src = e, n;
    }

    return r(e, t), s([d.readonly], e.prototype, "src", void 0), e = s([p.DisposableComponent("engine.shape", a.NFT_SHAPE)], e);
  }(d);

  e.NFTShape = x;

  var w = function (t) {
    function e(e, n) {
      var o = t.call(this) || this;
      if (o.src = e, n) for (var r in n) {
        o[r] = n[r];
      }
      return o;
    }

    return r(e, t), s([p.ObservableComponent.readonly], e.prototype, "src", void 0), s([p.ObservableComponent.readonly], e.prototype, "samplingMode", void 0), s([p.ObservableComponent.readonly], e.prototype, "wrap", void 0), s([p.ObservableComponent.readonly], e.prototype, "hasAlpha", void 0), e = s([p.DisposableComponent("engine.texture", a.TEXTURE)], e);
  }(p.ObservableComponent);

  e.Texture = w;

  var O = function (t) {
    function e() {
      var e = null !== t && t.apply(this, arguments) || this;
      return e.states = [], e;
    }

    return r(e, t), e.prototype.addClip = function (t) {
      var e = this;
      return this.states.push(t), t.onChange(function () {
        e.dirty = !0;
      }), this;
    }, e.prototype.getClip = function (t) {
      for (var e = 0; e < this.states.length; e++) {
        var n = this.states[e];
        if (n.clip === t) return n;
      }

      var o = new h.AnimationState(t);
      return this.addClip(o), o;
    }, s([p.ObservableComponent.readonly], e.prototype, "states", void 0), e = s([p.Component("engine.animator", a.ANIMATION)], e);
  }(d);

  e.Animator = O;

  var T = function (t) {
    function e(e) {
      var n = t.call(this) || this;
      return n.src = e, n;
    }

    return r(e, t), s([p.ObservableComponent.readonly], e.prototype, "src", void 0), e = s([p.DisposableComponent("engine.shape", a.OBJ_SHAPE)], e);
  }(d);

  e.OBJShape = T;

  var R = function (t) {
    function e(e) {
      var n = t.call(this) || this;
      return n.outlineWidth = 0, n.outlineColor = new u.Color3(1, 1, 1), n.color = new u.Color3(1, 1, 1), n.fontSize = 10, n.fontWeight = "normal", n.opacity = 1, n.value = "", n.lineSpacing = "0px", n.lineCount = 0, n.resizeToFit = !1, n.textWrapping = !1, n.shadowBlur = 0, n.shadowOffsetX = 0, n.shadowOffsetY = 0, n.shadowColor = new u.Color3(1, 1, 1), n.zIndex = 0, n.hTextAlign = "center", n.vTextAlign = "center", n.width = 1, n.height = 1, n.paddingTop = 0, n.paddingRight = 0, n.paddingBottom = 0, n.paddingLeft = 0, n.isPickable = !1, n.billboard = !1, e && (n.value = e), n;
    }

    return r(e, t), s([p.ObservableComponent.field], e.prototype, "outlineWidth", void 0), s([p.ObservableComponent.field], e.prototype, "outlineColor", void 0), s([p.ObservableComponent.field], e.prototype, "color", void 0), s([p.ObservableComponent.field], e.prototype, "fontSize", void 0), s([p.ObservableComponent.field], e.prototype, "fontWeight", void 0), s([p.ObservableComponent.field], e.prototype, "opacity", void 0), s([p.ObservableComponent.field], e.prototype, "value", void 0), s([p.ObservableComponent.field], e.prototype, "lineSpacing", void 0), s([p.ObservableComponent.field], e.prototype, "lineCount", void 0), s([p.ObservableComponent.field], e.prototype, "resizeToFit", void 0), s([p.ObservableComponent.field], e.prototype, "textWrapping", void 0), s([p.ObservableComponent.field], e.prototype, "shadowBlur", void 0), s([p.ObservableComponent.field], e.prototype, "shadowOffsetX", void 0), s([p.ObservableComponent.field], e.prototype, "shadowOffsetY", void 0), s([p.ObservableComponent.field], e.prototype, "shadowColor", void 0), s([p.ObservableComponent.field], e.prototype, "zIndex", void 0), s([p.ObservableComponent.field], e.prototype, "hTextAlign", void 0), s([p.ObservableComponent.field], e.prototype, "vTextAlign", void 0), s([p.ObservableComponent.field], e.prototype, "width", void 0), s([p.ObservableComponent.field], e.prototype, "height", void 0), s([p.ObservableComponent.field], e.prototype, "paddingTop", void 0), s([p.ObservableComponent.field], e.prototype, "paddingRight", void 0), s([p.ObservableComponent.field], e.prototype, "paddingBottom", void 0), s([p.ObservableComponent.field], e.prototype, "paddingLeft", void 0), s([p.ObservableComponent.field], e.prototype, "isPickable", void 0), s([p.ObservableComponent.field], e.prototype, "billboard", void 0), e = s([p.Component("engine.text", a.TEXT_SHAPE)], e);
  }(d);

  e.TextShape = R;

  var A = function (t) {
    function e() {
      return null !== t && t.apply(this, arguments) || this;
    }

    return r(e, t), s([p.ObservableComponent.field], e.prototype, "alpha", void 0), s([p.ObservableComponent.field], e.prototype, "albedoColor", void 0), s([p.ObservableComponent.field], e.prototype, "emissiveColor", void 0), s([p.ObservableComponent.field], e.prototype, "metallic", void 0), s([p.ObservableComponent.field], e.prototype, "roughness", void 0), s([p.ObservableComponent.field], e.prototype, "ambientColor", void 0), s([p.ObservableComponent.field], e.prototype, "reflectionColor", void 0), s([p.ObservableComponent.field], e.prototype, "reflectivityColor", void 0), s([p.ObservableComponent.field], e.prototype, "directIntensity", void 0), s([p.ObservableComponent.field], e.prototype, "microSurface", void 0), s([p.ObservableComponent.field], e.prototype, "emissiveIntensity", void 0), s([p.ObservableComponent.field], e.prototype, "environmentIntensity", void 0), s([p.ObservableComponent.field], e.prototype, "specularIntensity", void 0), s([p.ObservableComponent.component], e.prototype, "albedoTexture", void 0), s([p.ObservableComponent.component], e.prototype, "alphaTexture", void 0), s([p.ObservableComponent.component], e.prototype, "emissiveTexture", void 0), s([p.ObservableComponent.component], e.prototype, "bumpTexture", void 0), s([p.ObservableComponent.component], e.prototype, "refractionTexture", void 0), s([p.ObservableComponent.field], e.prototype, "disableLighting", void 0), s([p.ObservableComponent.field], e.prototype, "transparencyMode", void 0), s([p.ObservableComponent.field], e.prototype, "hasAlpha", void 0), e = s([p.DisposableComponent("engine.material", a.PRB_MATERIAL)], e);
  }(p.ObservableComponent);

  e.Material = A;

  var z = function (t) {
    function e() {
      var e = null !== t && t.apply(this, arguments) || this;
      return e.alphaTest = .5, e;
    }

    return r(e, t), s([p.ObservableComponent.component], e.prototype, "texture", void 0), s([p.ObservableComponent.field], e.prototype, "alphaTest", void 0), e = s([p.DisposableComponent("engine.material", a.BASIC_MATERIAL)], e);
  }(p.ObservableComponent);

  e.BasicMaterial = z;

  var E = function (t) {
    function e(e) {
      var n = t.call(this) || this;
      if (n.uuid = l.newId("UUID"), !(e && "apply" in e && "call" in e)) throw new Error("Callback is not a function");
      return n.callback = e, n;
    }

    return r(e, t), e.uuidEvent = function (t, n) {
      if (delete t[n]) {
        var o = n + "_" + Math.random();
        t[o] = void 0, Object.defineProperty(t, o, i({}, Object.getOwnPropertyDescriptor(t, o), {
          enumerable: !1
        })), Object.defineProperty(t, n.toString(), {
          get: function get() {
            return this[o];
          },
          set: function set(t) {
            var r = this[o];

            if (t) {
              if (!(t instanceof e)) throw new Error("value is not an OnUUIDEvent");
              this.data[n] = t.uuid;
            } else this.data[n] = null;

            if (this[o] = t, t !== r) {
              this.dirty = !0;

              for (var i = 0; i < this.subscriptions.length; i++) {
                this.subscriptions[i](n, t, r);
              }
            }
          },
          enumerable: !0
        });
      }
    }, e.prototype.toJSON = function () {
      return {
        uuid: this.uuid,
        type: this.type
      };
    }, s([p.ObservableComponent.field], e.prototype, "callback", void 0), e;
  }(p.ObservableComponent);

  e.OnUUIDEvent = E;

  var P = function (t) {
    function e() {
      var e = null !== t && t.apply(this, arguments) || this;
      return e.type = "onPointerLock", e;
    }

    return r(e, t), s([p.ObservableComponent.readonly], e.prototype, "type", void 0), e = s([p.Component("engine.onPointerLock", a.UUID_CALLBACK)], e);
  }(E);

  e.OnPointerLock = P;

  var S = function (t) {
    function e() {
      var e = null !== t && t.apply(this, arguments) || this;
      return e.type = "onAnimationEnd", e;
    }

    return r(e, t), s([p.ObservableComponent.readonly], e.prototype, "type", void 0), e = s([p.Component("engine.onAnimationEnd", a.UUID_CALLBACK)], e);
  }(E);

  e.OnAnimationEnd = S;

  var I = function (t) {
    function e() {
      var e = null !== t && t.apply(this, arguments) || this;
      return e.type = "onEnter", e;
    }

    return r(e, t), s([p.ObservableComponent.readonly], e.prototype, "type", void 0), e = s([p.Component("engine.onEnter", a.UUID_CALLBACK)], e);
  }(E);

  e.OnEnter = I;
}, function (t, e, n) {
  "use strict";

  function o(t) {
    for (var n in t) {
      e.hasOwnProperty(n) || (e[n] = t[n]);
    }
  }

  Object.defineProperty(e, "__esModule", {
    value: !0
  }), o(n(1)), o(n(9)), o(n(20)), o(n(21)), o(n(29)), o(n(30)), o(n(31)), o(n(22)), o(n(32)), o(n(33)), o(n(11)), o(n(34)), o(n(35)), o(n(23)), o(n(10)), o(n(4)), o(n(36)), o(n(14)), o(n(3)), o(n(19)), o(n(6));
}, function (t, e, n) {
  "use strict";

  var o = this && this.__decorate || function (t, e, n, o) {
    var r,
        i = arguments.length,
        s = i < 3 ? e : null === o ? o = Object.getOwnPropertyDescriptor(e, n) : o;
    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) s = Reflect.decorate(t, e, n, o);else for (var a = t.length - 1; a >= 0; a--) {
      (r = t[a]) && (s = (i < 3 ? r(s) : i > 3 ? r(e, n, s) : r(e, n)) || s);
    }
    return i > 3 && s && Object.defineProperty(e, n, s), s;
  };

  Object.defineProperty(e, "__esModule", {
    value: !0
  });

  var r = n(8),
      i = function () {
    function t(t, e, n) {
      this.entity = t, this.componentName = e, this.component = n;
    }

    return t = o([r.EventConstructor()], t);
  }();

  e.ComponentRemoved = i;

  var s = function () {
    function t(t, e, n) {
      this.entity = t, this.componentName = e, this.classId = n;
    }

    return t = o([r.EventConstructor()], t);
  }();

  e.ComponentAdded = s;

  var a = function () {
    function t(t, e) {
      this.entity = t, this.parent = e;
    }

    return t = o([r.EventConstructor()], t);
  }();

  e.ParentChanged = a;
}, function (t, e, n) {
  "use strict";

  Object.defineProperty(e, "__esModule", {
    value: !0
  });
  var o = n(2),
      r = "__event_name__",
      i = [];

  function s(t) {
    if (!(r in t) || "string" != typeof t[r]) throw new Error("The EventConstructor is not registered");
    return t[r];
  }

  var a = function () {
    function t() {
      this.listeners = {};
    }

    return t.prototype.addListener = function (t, e, n) {
      if (!t || "function" != typeof t) throw new Error("Invalid EventConstructor");
      var o = s(t),
          r = this.listeners[o];
      r || (r = this.listeners[o] = []);

      for (var i = 0; i < r.length; i++) {
        if (r[i].listener === e) throw new Error("The provided listener is already registered");
      }

      return r.push({
        listener: e,
        fn: n
      }), this;
    }, t.prototype.removeListener = function (t, e) {
      if (!e || "function" != typeof e) throw new Error("Invalid EventConstructor");
      var n = s(e),
          o = this.listeners[n];
      if (!o) return !1;

      for (var r = 0; r < o.length; r++) {
        if (o[r].listener === t) return o.splice(r, 1), !0;
      }

      return !1;
    }, t.prototype.fireEvent = function (t) {
      var e = s(t.constructor),
          n = this.listeners[e];
      if (n) for (var r = 0; r < n.length; r++) {
        try {
          var i = n[r];
          i.fn.call(i.listener, t);
        } catch (t) {
          o.error(t);
        }
      }
      return this;
    }, t;
  }();

  e.EventManager = a, e.EventConstructor = function () {
    var t = o.newId("EV");
    if (-1 !== i.indexOf(t)) throw new Error("The event name " + t + " is already taken");
    return i.push(t), function (e) {
      return e[r] = t, e;
    };
  };
}, function (t, e, n) {
  "use strict";

  Object.defineProperty(e, "__esModule", {
    value: !0
  });
  var o = n(2),
      r = n(3),
      i = n(10),
      s = n(11);
  e.MathTmp = {
    Vector3: o.buildArray(6, r.Vector3.Zero),
    Matrix: o.buildArray(2, s.Matrix.Identity),
    Quaternion: o.buildArray(3, i.Quaternion.Zero),
    staticUp: r.Vector3.Up(),
    tmpMatrix: s.Matrix.Zero()
  };
}, function (t, e, n) {
  "use strict";

  Object.defineProperty(e, "__esModule", {
    value: !0
  });

  var o = n(11),
      r = n(3),
      i = n(9),
      s = n(1),
      a = function () {
    function t(t, e, n, o) {
      void 0 === t && (t = 0), void 0 === e && (e = 0), void 0 === n && (n = 0), void 0 === o && (o = 1), this.x = t, this.y = e, this.z = n, this.w = o;
    }

    return t.FromRotationMatrix = function (e) {
      var n = new t();
      return t.FromRotationMatrixToRef(e, n), n;
    }, t.FromRotationMatrixToRef = function (t, e) {
      var n,
          o = t.m,
          r = o[0],
          i = o[4],
          s = o[8],
          a = o[1],
          p = o[5],
          u = o[9],
          h = o[2],
          l = o[6],
          c = o[10],
          f = r + p + c;
      f > 0 ? (n = .5 / Math.sqrt(f + 1), e.w = .25 / n, e.x = (l - u) * n, e.y = (s - h) * n, e.z = (a - i) * n) : r > p && r > c ? (n = 2 * Math.sqrt(1 + r - p - c), e.w = (l - u) / n, e.x = .25 * n, e.y = (i + a) / n, e.z = (s + h) / n) : p > c ? (n = 2 * Math.sqrt(1 + p - r - c), e.w = (s - h) / n, e.x = (i + a) / n, e.y = .25 * n, e.z = (u + l) / n) : (n = 2 * Math.sqrt(1 + c - r - p), e.w = (a - i) / n, e.x = (s + h) / n, e.y = (u + l) / n, e.z = .25 * n);
    }, t.Dot = function (t, e) {
      return t.x * e.x + t.y * e.y + t.z * e.z + t.w * e.w;
    }, t.AreClose = function (e, n) {
      return t.Dot(e, n) >= 0;
    }, t.Zero = function () {
      return new t(0, 0, 0, 0);
    }, t.Inverse = function (e) {
      return new t(-e.x, -e.y, -e.z, e.w);
    }, t.IsIdentity = function (t) {
      return t && 0 === t.x && 0 === t.y && 0 === t.z && 1 === t.w;
    }, t.RotationAxis = function (e, n) {
      var o = n * s.DEG2RAD;
      return t.RotationAxisToRef(e, o, new t());
    }, t.RotationAxisToRef = function (t, e, n) {
      var o = e * s.DEG2RAD,
          r = Math.sin(o / 2);
      return t.normalize(), n.w = Math.cos(o / 2), n.x = t.x * r, n.y = t.y * r, n.z = t.z * r, n;
    }, t.FromArray = function (e, n) {
      return void 0 === n && (n = 0), new t(e[n], e[n + 1], e[n + 2], e[n + 3]);
    }, t.FromEulerAnglesRef = function (e, n, o, r) {
      return t.RotationYawPitchRollToRef(n * s.DEG2RAD, e * s.DEG2RAD, o * s.DEG2RAD, r);
    }, t.RotationYawPitchRoll = function (e, n, o) {
      var r = new t();
      return t.RotationYawPitchRollToRef(e, n, o, r), r;
    }, t.RotationYawPitchRollToRef = function (t, e, n, o) {
      var r = .5 * n,
          i = .5 * e,
          s = .5 * t,
          a = Math.cos(i),
          p = Math.cos(s),
          u = Math.cos(r),
          h = Math.sin(i),
          l = Math.sin(s),
          c = Math.sin(r);
      o.x = h * p * u + a * l * c, o.y = a * l * u - h * p * c, o.z = a * p * c + h * l * u, o.w = a * p * u - h * l * c;
    }, t.RotationAlphaBetaGamma = function (e, n, o) {
      var r = new t();
      return t.RotationAlphaBetaGammaToRef(e, n, o, r), r;
    }, t.RotationAlphaBetaGammaToRef = function (t, e, n, o) {
      var r = .5 * (n + t),
          i = .5 * (n - t),
          s = .5 * e;
      o.x = Math.cos(i) * Math.sin(s), o.y = Math.sin(i) * Math.sin(s), o.z = Math.sin(r) * Math.cos(s), o.w = Math.cos(r) * Math.cos(s);
    }, t.RotationQuaternionFromAxis = function (e, n, o) {
      var r = new t(0, 0, 0, 0);
      return t.RotationQuaternionFromAxisToRef(e, n, o, r), r;
    }, t.RotationQuaternionFromAxisToRef = function (e, n, r, s) {
      var a = i.MathTmp.Matrix[0];
      o.Matrix.FromXYZAxesToRef(e.normalize(), n.normalize(), r.normalize(), a), t.FromRotationMatrixToRef(a, s);
    }, t.Slerp = function (e, n, o) {
      var r = t.Identity;
      return t.SlerpToRef(e, n, o, r), r;
    }, t.SlerpToRef = function (t, e, n, o) {
      var r,
          i,
          s = t.x * e.x + t.y * e.y + t.z * e.z + t.w * e.w,
          a = !1;
      if (s < 0 && (a = !0, s = -s), s > .999999) i = 1 - n, r = a ? -n : n;else {
        var p = Math.acos(s),
            u = 1 / Math.sin(p);
        i = Math.sin((1 - n) * p) * u, r = a ? -Math.sin(n * p) * u : Math.sin(n * p) * u;
      }
      o.x = i * t.x + r * e.x, o.y = i * t.y + r * e.y, o.z = i * t.z + r * e.z, o.w = i * t.w + r * e.w;
    }, t.Hermite = function (e, n, o, r, i) {
      var s = i * i,
          a = i * s,
          p = 2 * a - 3 * s + 1,
          u = -2 * a + 3 * s,
          h = a - 2 * s + i,
          l = a - s;
      return new t(e.x * p + o.x * u + n.x * h + r.x * l, e.y * p + o.y * u + n.y * h + r.y * l, e.z * p + o.z * u + n.z * h + r.z * l, e.w * p + o.w * u + n.w * h + r.w * l);
    }, Object.defineProperty(t, "Identity", {
      get: function get() {
        return new t(0, 0, 0, 1);
      },
      enumerable: !0,
      configurable: !0
    }), t.Angle = function (e, n) {
      var o = t.Dot(e, n);
      return 2 * Math.acos(Math.min(Math.abs(o), 1)) * s.RAD2DEG;
    }, t.Euler = function (e, n, o) {
      return t.RotationYawPitchRoll(n * s.DEG2RAD, e * s.DEG2RAD, o * s.DEG2RAD);
    }, t.LookRotation = function (e, n) {
      void 0 === n && (n = i.MathTmp.staticUp);
      var o = r.Vector3.Normalize(e),
          s = r.Vector3.Normalize(r.Vector3.Cross(n, o)),
          a = r.Vector3.Cross(o, s),
          p = s.x,
          u = s.y,
          h = s.z,
          l = a.x,
          c = a.y,
          f = a.z,
          d = o.x,
          y = o.y,
          v = o.z,
          m = p + c + v,
          b = new t();

      if (m > 0) {
        var g = Math.sqrt(m + 1);
        return b.w = .5 * g, g = .5 / g, b.x = (f - y) * g, b.y = (d - h) * g, b.z = (u - l) * g, b;
      }

      if (p >= c && p >= v) {
        var _ = Math.sqrt(1 + p - c - v),
            C = .5 / _;

        return b.x = .5 * _, b.y = (u + l) * C, b.z = (h + d) * C, b.w = (f - y) * C, b;
      }

      if (c > v) {
        var x = Math.sqrt(1 + c - p - v),
            w = .5 / x;
        return b.x = (l + u) * w, b.y = .5 * x, b.z = (y + f) * w, b.w = (d - h) * w, b;
      }

      var O = Math.sqrt(1 + v - p - c),
          T = .5 / O;
      return b.x = (d + h) * T, b.y = (y + f) * T, b.z = .5 * O, b.w = (u - l) * T, b;
    }, t.RotateTowards = function (e, n, o) {
      var r = t.Angle(e, n);
      if (0 === r) return n;
      var i = Math.min(1, o / r);
      return t.Slerp(e, n, i);
    }, t.FromToRotation = function (e, n) {
      var o = new t(),
          i = e.normalize(),
          a = n.normalize(),
          p = r.Vector3.Dot(i, a);

      if (p > -1 + s.Epsilon) {
        var u = Math.sqrt(2 * (1 + p)),
            h = 1 / u,
            l = r.Vector3.Cross(i, a).scaleInPlace(h);
        o.set(l.x, l.y, l.z, .5 * u);
      } else {
        if (p > 1 - s.Epsilon) return new t(0, 0, 0, 1);
        var c = r.Vector3.Cross(r.Vector3.Right(), i);
        c.lengthSquared() < s.Epsilon && (c = r.Vector3.Cross(r.Vector3.Forward(), i)), o.set(c.x, c.y, c.z, 0);
      }

      return o.normalize();
    }, Object.defineProperty(t.prototype, "normalized", {
      get: function get() {
        return this.normalize();
      },
      enumerable: !0,
      configurable: !0
    }), t.prototype.setFromToRotation = function (e, n, r) {
      void 0 === r && (r = i.MathTmp.staticUp), i.MathTmp.tmpMatrix = o.Matrix.Zero(), o.Matrix.LookAtLHToRef(e, n, r, i.MathTmp.tmpMatrix), i.MathTmp.tmpMatrix.invert(), t.FromRotationMatrixToRef(i.MathTmp.tmpMatrix, this);
    }, Object.defineProperty(t.prototype, "eulerAngles", {
      get: function get() {
        var t = new r.Vector3(),
            e = new o.Matrix();
        this.toRotationMatrix(e);
        var n = o.Matrix.GetAsMatrix3x3(e);
        return t.y = s.RAD2DEG * Math.asin(Math.max(-1, Math.min(1, n[6]))), Math.abs(n[6]) < .99999 ? (t.x = s.RAD2DEG * Math.atan2(-n[7], n[8]), t.z = s.RAD2DEG * Math.atan2(-n[3], n[0])) : (t.x = s.RAD2DEG * Math.atan2(n[5], n[4]), t.z = 0), t;
      },
      set: function set(t) {
        this.setEuler(t.x, t.y, t.z);
      },
      enumerable: !0,
      configurable: !0
    }), t.prototype.toString = function () {
      return "(" + this.x + ", " + this.y + ", " + this.z + ", " + this.w + ")";
    }, Object.defineProperty(t.prototype, "length", {
      get: function get() {
        return Math.sqrt(this.lengthSquared);
      },
      enumerable: !0,
      configurable: !0
    }), Object.defineProperty(t.prototype, "lengthSquared", {
      get: function get() {
        return this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w;
      },
      enumerable: !0,
      configurable: !0
    }), t.prototype.getClassName = function () {
      return "Quaternion";
    }, t.prototype.getHashCode = function () {
      var t = this.x || 0;
      return t = 397 * (t = 397 * (t = 397 * t ^ (this.y || 0)) ^ (this.z || 0)) ^ (this.w || 0);
    }, t.prototype.asArray = function () {
      return [this.x, this.y, this.z, this.w];
    }, t.prototype.equals = function (t) {
      return t && this.x === t.x && this.y === t.y && this.z === t.z && this.w === t.w;
    }, t.prototype.clone = function () {
      return new t(this.x, this.y, this.z, this.w);
    }, t.prototype.copyFrom = function (t) {
      return this.x = t.x, this.y = t.y, this.z = t.z, this.w = t.w, this;
    }, t.prototype.copyFromFloats = function (t, e, n, o) {
      return this.x = t, this.y = e, this.z = n, this.w = o, this;
    }, t.prototype.set = function (t, e, n, o) {
      return this.copyFromFloats(t, e, n, o);
    }, t.prototype.setEuler = function (e, n, o) {
      return t.RotationYawPitchRollToRef(n * s.DEG2RAD, e * s.DEG2RAD, o * s.DEG2RAD, this), this;
    }, t.prototype.add = function (e) {
      return new t(this.x + e.x, this.y + e.y, this.z + e.z, this.w + e.w);
    }, t.prototype.addInPlace = function (t) {
      return this.x += t.x, this.y += t.y, this.z += t.z, this.w += t.w, this;
    }, t.prototype.subtract = function (e) {
      return new t(this.x - e.x, this.y - e.y, this.z - e.z, this.w - e.w);
    }, t.prototype.scale = function (e) {
      return new t(this.x * e, this.y * e, this.z * e, this.w * e);
    }, t.prototype.scaleToRef = function (t, e) {
      return e.x = this.x * t, e.y = this.y * t, e.z = this.z * t, e.w = this.w * t, this;
    }, t.prototype.scaleInPlace = function (t) {
      return this.x *= t, this.y *= t, this.z *= t, this.w *= t, this;
    }, t.prototype.scaleAndAddToRef = function (t, e) {
      return e.x += this.x * t, e.y += this.y * t, e.z += this.z * t, e.w += this.w * t, this;
    }, t.prototype.multiply = function (e) {
      var n = new t(0, 0, 0, 1);
      return this.multiplyToRef(e, n), n;
    }, t.prototype.multiplyToRef = function (t, e) {
      var n = this.x * t.w + this.y * t.z - this.z * t.y + this.w * t.x,
          o = -this.x * t.z + this.y * t.w + this.z * t.x + this.w * t.y,
          r = this.x * t.y - this.y * t.x + this.z * t.w + this.w * t.z,
          i = -this.x * t.x - this.y * t.y - this.z * t.z + this.w * t.w;
      return e.copyFromFloats(n, o, r, i), this;
    }, t.prototype.multiplyInPlace = function (t) {
      return this.multiplyToRef(t, this), this;
    }, t.prototype.conjugateToRef = function (t) {
      return t.copyFromFloats(-this.x, -this.y, -this.z, this.w), this;
    }, t.prototype.conjugateInPlace = function () {
      return this.x *= -1, this.y *= -1, this.z *= -1, this;
    }, t.prototype.conjugate = function () {
      return new t(-this.x, -this.y, -this.z, this.w);
    }, t.prototype.normalize = function () {
      var t = 1 / this.length;
      return this.x *= t, this.y *= t, this.z *= t, this.w *= t, this;
    }, t.prototype.angleAxis = function (e, n) {
      if (0 === n.lengthSquared()) return t.Identity;
      var o = t.Identity,
          r = e * s.DEG2RAD;
      r *= .5;
      var i = n.normalize();
      return i = n.scaleInPlace(Math.sin(r)), o.x = i.x, o.y = i.y, o.z = i.z, o.w = Math.cos(r), o.normalize();
    }, t.prototype.toRotationMatrix = function (t) {
      return o.Matrix.FromQuaternionToRef(this, t), this;
    }, t.prototype.fromRotationMatrix = function (e) {
      return t.FromRotationMatrixToRef(e, this), this;
    }, t;
  }();

  e.Quaternion = a;
}, function (t, e, n) {
  "use strict";

  Object.defineProperty(e, "__esModule", {
    value: !0
  });

  var o = n(3),
      r = n(10),
      i = n(9),
      s = n(19),
      a = function () {
    function t() {
      this._isIdentity = !1, this._isIdentityDirty = !0, this._isIdentity3x2 = !0, this._isIdentity3x2Dirty = !0, this._m = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], this._updateIdentityStatus(!1);
    }

    return Object.defineProperty(t.prototype, "m", {
      get: function get() {
        return this._m;
      },
      enumerable: !0,
      configurable: !0
    }), Object.defineProperty(t, "IdentityReadOnly", {
      get: function get() {
        return t._identityReadOnly;
      },
      enumerable: !0,
      configurable: !0
    }), t.FromArray = function (e, n) {
      void 0 === n && (n = 0);
      var o = new t();
      return t.FromArrayToRef(e, n, o), o;
    }, t.FromArrayToRef = function (t, e, n) {
      for (var o = 0; o < 16; o++) {
        n._m[o] = t[o + e];
      }

      n._markAsUpdated();
    }, t.FromFloatArrayToRefScaled = function (t, e, n, o) {
      for (var r = 0; r < 16; r++) {
        o._m[r] = t[r + e] * n;
      }

      o._markAsUpdated();
    }, t.FromValuesToRef = function (t, e, n, o, r, i, s, a, p, u, h, l, c, f, d, y, v) {
      var m = v._m;
      m[0] = t, m[1] = e, m[2] = n, m[3] = o, m[4] = r, m[5] = i, m[6] = s, m[7] = a, m[8] = p, m[9] = u, m[10] = h, m[11] = l, m[12] = c, m[13] = f, m[14] = d, m[15] = y, v._markAsUpdated();
    }, t.FromValues = function (e, n, o, r, i, s, a, p, u, h, l, c, f, d, y, v) {
      var m = new t(),
          b = m._m;
      return b[0] = e, b[1] = n, b[2] = o, b[3] = r, b[4] = i, b[5] = s, b[6] = a, b[7] = p, b[8] = u, b[9] = h, b[10] = l, b[11] = c, b[12] = f, b[13] = d, b[14] = y, b[15] = v, m._markAsUpdated(), m;
    }, t.Compose = function (e, n, o) {
      var r = new t();
      return t.ComposeToRef(e, n, o, r), r;
    }, t.ComposeToRef = function (e, n, o, r) {
      t.ScalingToRef(e.x, e.y, e.z, i.MathTmp.Matrix[1]), n.toRotationMatrix(i.MathTmp.Matrix[0]), i.MathTmp.Matrix[1].multiplyToRef(i.MathTmp.Matrix[0], r), r.setTranslation(o);
    }, t.Identity = function () {
      var e = t.FromValues(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
      return e._updateIdentityStatus(!0), e;
    }, t.IdentityToRef = function (e) {
      t.FromValuesToRef(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, e), e._updateIdentityStatus(!0);
    }, t.Zero = function () {
      var e = t.FromValues(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
      return e._updateIdentityStatus(!1), e;
    }, t.RotationX = function (e) {
      var n = new t();
      return t.RotationXToRef(e, n), n;
    }, t.Invert = function (e) {
      var n = new t();
      return e.invertToRef(n), n;
    }, t.RotationXToRef = function (e, n) {
      var o = Math.sin(e),
          r = Math.cos(e);
      t.FromValuesToRef(1, 0, 0, 0, 0, r, o, 0, 0, -o, r, 0, 0, 0, 0, 1, n), n._updateIdentityStatus(1 === r && 0 === o);
    }, t.RotationY = function (e) {
      var n = new t();
      return t.RotationYToRef(e, n), n;
    }, t.RotationYToRef = function (e, n) {
      var o = Math.sin(e),
          r = Math.cos(e);
      t.FromValuesToRef(r, 0, -o, 0, 0, 1, 0, 0, o, 0, r, 0, 0, 0, 0, 1, n), n._updateIdentityStatus(1 === r && 0 === o);
    }, t.RotationZ = function (e) {
      var n = new t();
      return t.RotationZToRef(e, n), n;
    }, t.RotationZToRef = function (e, n) {
      var o = Math.sin(e),
          r = Math.cos(e);
      t.FromValuesToRef(r, o, 0, 0, -o, r, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, n), n._updateIdentityStatus(1 === r && 0 === o);
    }, t.RotationAxis = function (e, n) {
      var o = new t();
      return t.RotationAxisToRef(e, n, o), o;
    }, t.RotationAxisToRef = function (t, e, n) {
      var o = Math.sin(-e),
          r = Math.cos(-e),
          i = 1 - r;
      t.normalize();
      var s = n._m;
      s[0] = t.x * t.x * i + r, s[1] = t.x * t.y * i - t.z * o, s[2] = t.x * t.z * i + t.y * o, s[3] = 0, s[4] = t.y * t.x * i + t.z * o, s[5] = t.y * t.y * i + r, s[6] = t.y * t.z * i - t.x * o, s[7] = 0, s[8] = t.z * t.x * i - t.y * o, s[9] = t.z * t.y * i + t.x * o, s[10] = t.z * t.z * i + r, s[11] = 0, s[12] = 0, s[13] = 0, s[14] = 0, s[15] = 1, n._markAsUpdated();
    }, t.RotationYawPitchRoll = function (e, n, o) {
      var r = new t();
      return t.RotationYawPitchRollToRef(e, n, o, r), r;
    }, t.RotationYawPitchRollToRef = function (t, e, n, o) {
      r.Quaternion.RotationYawPitchRollToRef(t, e, n, i.MathTmp.Quaternion[0]), i.MathTmp.Quaternion[0].toRotationMatrix(o);
    }, t.Scaling = function (e, n, o) {
      var r = new t();
      return t.ScalingToRef(e, n, o, r), r;
    }, t.ScalingToRef = function (e, n, o, r) {
      t.FromValuesToRef(e, 0, 0, 0, 0, n, 0, 0, 0, 0, o, 0, 0, 0, 0, 1, r), r._updateIdentityStatus(1 === e && 1 === n && 1 === o);
    }, t.Translation = function (e, n, o) {
      var r = new t();
      return t.TranslationToRef(e, n, o, r), r;
    }, t.TranslationToRef = function (e, n, o, r) {
      t.FromValuesToRef(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, e, n, o, 1, r), r._updateIdentityStatus(0 === e && 0 === n && 0 === o);
    }, t.Lerp = function (e, n, o) {
      var r = new t();
      return t.LerpToRef(e, n, o, r), r;
    }, t.LerpToRef = function (t, e, n, o) {
      for (var r = 0; r < 16; r++) {
        o._m[r] = t._m[r] * (1 - n) + e._m[r] * n;
      }

      o._markAsUpdated();
    }, t.DecomposeLerp = function (e, n, o) {
      var r = new t();
      return t.DecomposeLerpToRef(e, n, o, r), r;
    }, t.DecomposeLerpToRef = function (e, n, s, a) {
      var p = i.MathTmp.Vector3[0],
          u = i.MathTmp.Quaternion[0],
          h = i.MathTmp.Vector3[1];
      e.decompose(p, u, h);
      var l = i.MathTmp.Vector3[2],
          c = i.MathTmp.Quaternion[1],
          f = i.MathTmp.Vector3[3];
      n.decompose(l, c, f);
      var d = i.MathTmp.Vector3[4];
      o.Vector3.LerpToRef(p, l, s, d);
      var y = i.MathTmp.Quaternion[2];
      r.Quaternion.SlerpToRef(u, c, s, y);
      var v = i.MathTmp.Vector3[5];
      o.Vector3.LerpToRef(h, f, s, v), t.ComposeToRef(d, y, v, a);
    }, t.LookAtLH = function (e, n, o) {
      var r = new t();
      return t.LookAtLHToRef(e, n, o, r), r;
    }, t.LookAtLHToRef = function (e, n, r, s) {
      var a = i.MathTmp.Vector3[0],
          p = i.MathTmp.Vector3[1],
          u = i.MathTmp.Vector3[2];
      n.subtractToRef(e, u), u.normalize(), o.Vector3.CrossToRef(r, u, a);
      var h = a.lengthSquared();
      0 === h ? a.x = 1 : a.normalizeFromLength(Math.sqrt(h)), o.Vector3.CrossToRef(u, a, p), p.normalize();
      var l = -o.Vector3.Dot(a, e),
          c = -o.Vector3.Dot(p, e),
          f = -o.Vector3.Dot(u, e);
      t.FromValuesToRef(a.x, p.x, u.x, 0, a.y, p.y, u.y, 0, a.z, p.z, u.z, 0, l, c, f, 1, s);
    }, t.LookAtRH = function (e, n, o) {
      var r = new t();
      return t.LookAtRHToRef(e, n, o, r), r;
    }, t.LookAtRHToRef = function (e, n, r, s) {
      var a = i.MathTmp.Vector3[0],
          p = i.MathTmp.Vector3[1],
          u = i.MathTmp.Vector3[2];
      e.subtractToRef(n, u), u.normalize(), o.Vector3.CrossToRef(r, u, a);
      var h = a.lengthSquared();
      0 === h ? a.x = 1 : a.normalizeFromLength(Math.sqrt(h)), o.Vector3.CrossToRef(u, a, p), p.normalize();
      var l = -o.Vector3.Dot(a, e),
          c = -o.Vector3.Dot(p, e),
          f = -o.Vector3.Dot(u, e);
      t.FromValuesToRef(a.x, p.x, u.x, 0, a.y, p.y, u.y, 0, a.z, p.z, u.z, 0, l, c, f, 1, s);
    }, t.OrthoLH = function (e, n, o, r) {
      var i = new t();
      return t.OrthoLHToRef(e, n, o, r, i), i;
    }, t.OrthoLHToRef = function (e, n, o, r, i) {
      var s = 2 / e,
          a = 2 / n,
          p = 2 / (r - o),
          u = -(r + o) / (r - o);
      t.FromValuesToRef(s, 0, 0, 0, 0, a, 0, 0, 0, 0, p, 0, 0, 0, u, 1, i), i._updateIdentityStatus(1 === s && 1 === a && 1 === p && 0 === u);
    }, t.OrthoOffCenterLH = function (e, n, o, r, i, s) {
      var a = new t();
      return t.OrthoOffCenterLHToRef(e, n, o, r, i, s, a), a;
    }, t.OrthoOffCenterLHToRef = function (e, n, o, r, i, s, a) {
      var p = 2 / (n - e),
          u = 2 / (r - o),
          h = 2 / (s - i),
          l = -(s + i) / (s - i),
          c = (e + n) / (e - n),
          f = (r + o) / (o - r);
      t.FromValuesToRef(p, 0, 0, 0, 0, u, 0, 0, 0, 0, h, 0, c, f, l, 1, a), a._markAsUpdated();
    }, t.OrthoOffCenterRH = function (e, n, o, r, i, s) {
      var a = new t();
      return t.OrthoOffCenterRHToRef(e, n, o, r, i, s, a), a;
    }, t.OrthoOffCenterRHToRef = function (e, n, o, r, i, s, a) {
      t.OrthoOffCenterLHToRef(e, n, o, r, i, s, a), a._m[10] *= -1;
    }, t.PerspectiveLH = function (e, n, o, r) {
      var i = new t(),
          s = 2 * o / e,
          a = 2 * o / n,
          p = (r + o) / (r - o),
          u = -2 * r * o / (r - o);
      return t.FromValuesToRef(s, 0, 0, 0, 0, a, 0, 0, 0, 0, p, 1, 0, 0, u, 0, i), i._updateIdentityStatus(!1), i;
    }, t.PerspectiveFovLH = function (e, n, o, r) {
      var i = new t();
      return t.PerspectiveFovLHToRef(e, n, o, r, i), i;
    }, t.PerspectiveFovLHToRef = function (e, n, o, r, i, s) {
      void 0 === s && (s = !0);
      var a = o,
          p = r,
          u = 1 / Math.tan(.5 * e),
          h = s ? u / n : u,
          l = s ? u : u * n,
          c = (p + a) / (p - a),
          f = -2 * p * a / (p - a);
      t.FromValuesToRef(h, 0, 0, 0, 0, l, 0, 0, 0, 0, c, 1, 0, 0, f, 0, i), i._updateIdentityStatus(!1);
    }, t.PerspectiveFovRH = function (e, n, o, r) {
      var i = new t();
      return t.PerspectiveFovRHToRef(e, n, o, r, i), i;
    }, t.PerspectiveFovRHToRef = function (e, n, o, r, i, s) {
      void 0 === s && (s = !0);
      var a = o,
          p = r,
          u = 1 / Math.tan(.5 * e),
          h = s ? u / n : u,
          l = s ? u : u * n,
          c = -(p + a) / (p - a),
          f = -2 * p * a / (p - a);
      t.FromValuesToRef(h, 0, 0, 0, 0, l, 0, 0, 0, 0, c, -1, 0, 0, f, 0, i), i._updateIdentityStatus(!1);
    }, t.PerspectiveFovWebVRToRef = function (t, e, n, o, r) {
      void 0 === r && (r = !1);
      var i = r ? -1 : 1,
          s = Math.tan(t.upDegrees * Math.PI / 180),
          a = Math.tan(t.downDegrees * Math.PI / 180),
          p = Math.tan(t.leftDegrees * Math.PI / 180),
          u = Math.tan(t.rightDegrees * Math.PI / 180),
          h = 2 / (p + u),
          l = 2 / (s + a),
          c = o._m;
      c[0] = h, c[1] = c[2] = c[3] = c[4] = 0, c[5] = l, c[6] = c[7] = 0, c[8] = (p - u) * h * .5, c[9] = -(s - a) * l * .5, c[10] = -n / (e - n), c[11] = 1 * i, c[12] = c[13] = c[15] = 0, c[14] = -2 * n * e / (n - e), o._markAsUpdated();
    }, t.GetAsMatrix2x2 = function (t) {
      return [t._m[0], t._m[1], t._m[4], t._m[5]];
    }, t.GetAsMatrix3x3 = function (t) {
      return [t._m[0], t._m[1], t._m[2], t._m[4], t._m[5], t._m[6], t._m[8], t._m[9], t._m[10]];
    }, t.Transpose = function (e) {
      var n = new t();
      return t.TransposeToRef(e, n), n;
    }, t.TransposeToRef = function (t, e) {
      var n = e._m,
          o = t._m;
      n[0] = o[0], n[1] = o[4], n[2] = o[8], n[3] = o[12], n[4] = o[1], n[5] = o[5], n[6] = o[9], n[7] = o[13], n[8] = o[2], n[9] = o[6], n[10] = o[10], n[11] = o[14], n[12] = o[3], n[13] = o[7], n[14] = o[11], n[15] = o[15], e._updateIdentityStatus(t._isIdentity, t._isIdentityDirty);
    }, t.Reflection = function (e) {
      var n = new t();
      return t.ReflectionToRef(e, n), n;
    }, t.ReflectionToRef = function (e, n) {
      e.normalize();
      var o = e.normal.x,
          r = e.normal.y,
          i = e.normal.z,
          s = -2 * o,
          a = -2 * r,
          p = -2 * i;
      t.FromValuesToRef(s * o + 1, a * o, p * o, 0, s * r, a * r + 1, p * r, 0, s * i, a * i, p * i + 1, 0, s * e.d, a * e.d, p * e.d, 1, n);
    }, t.FromXYZAxesToRef = function (e, n, o, r) {
      t.FromValuesToRef(e.x, e.y, e.z, 0, n.x, n.y, n.z, 0, o.x, o.y, o.z, 0, 0, 0, 0, 1, r);
    }, t.FromQuaternionToRef = function (t, e) {
      var n = t.x * t.x,
          o = t.y * t.y,
          r = t.z * t.z,
          i = t.x * t.y,
          s = t.z * t.w,
          a = t.z * t.x,
          p = t.y * t.w,
          u = t.y * t.z,
          h = t.x * t.w;
      e._m[0] = 1 - 2 * (o + r), e._m[1] = 2 * (i + s), e._m[2] = 2 * (a - p), e._m[3] = 0, e._m[4] = 2 * (i - s), e._m[5] = 1 - 2 * (r + n), e._m[6] = 2 * (u + h), e._m[7] = 0, e._m[8] = 2 * (a + p), e._m[9] = 2 * (u - h), e._m[10] = 1 - 2 * (o + n), e._m[11] = 0, e._m[12] = 0, e._m[13] = 0, e._m[14] = 0, e._m[15] = 1, e._markAsUpdated();
    }, t.prototype._markAsUpdated = function () {
      this.updateFlag = t._updateFlagSeed++, this._isIdentity = !1, this._isIdentity3x2 = !1, this._isIdentityDirty = !0, this._isIdentity3x2Dirty = !0;
    }, t.prototype.isIdentity = function () {
      if (this._isIdentityDirty) {
        this._isIdentityDirty = !1;
        var t = this._m;
        this._isIdentity = 1 === t[0] && 0 === t[1] && 0 === t[2] && 0 === t[3] && 0 === t[4] && 1 === t[5] && 0 === t[6] && 0 === t[7] && 0 === t[8] && 0 === t[9] && 1 === t[10] && 0 === t[11] && 0 === t[12] && 0 === t[13] && 0 === t[14] && 1 === t[15];
      }

      return this._isIdentity;
    }, t.prototype.isIdentityAs3x2 = function () {
      return this._isIdentity3x2Dirty && (this._isIdentity3x2Dirty = !1, 1 !== this._m[0] || 1 !== this._m[5] || 1 !== this._m[15] ? this._isIdentity3x2 = !1 : 0 !== this._m[1] || 0 !== this._m[2] || 0 !== this._m[3] || 0 !== this._m[4] || 0 !== this._m[6] || 0 !== this._m[7] || 0 !== this._m[8] || 0 !== this._m[9] || 0 !== this._m[10] || 0 !== this._m[11] || 0 !== this._m[12] || 0 !== this._m[13] || 0 !== this._m[14] ? this._isIdentity3x2 = !1 : this._isIdentity3x2 = !0), this._isIdentity3x2;
    }, t.prototype.determinant = function () {
      if (!0 === this._isIdentity) return 1;

      var t = this._m,
          e = t[0],
          n = t[1],
          o = t[2],
          r = t[3],
          i = t[4],
          s = t[5],
          a = t[6],
          p = t[7],
          u = t[8],
          h = t[9],
          l = t[10],
          c = t[11],
          f = t[12],
          d = t[13],
          y = t[14],
          v = t[15],
          m = l * v - y * c,
          b = h * v - d * c,
          g = h * y - d * l,
          _ = u * v - f * c,
          C = u * y - l * f,
          x = u * d - f * h;

      return e * +(s * m - a * b + p * g) + n * -(i * m - a * _ + p * C) + o * +(i * b - s * _ + p * x) + r * -(i * g - s * C + a * x);
    }, t.prototype.toArray = function () {
      return this._m;
    }, t.prototype.asArray = function () {
      return this._m;
    }, t.prototype.invert = function () {
      return this.invertToRef(this), this;
    }, t.prototype.reset = function () {
      return t.FromValuesToRef(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, this), this._updateIdentityStatus(!1), this;
    }, t.prototype.add = function (e) {
      var n = new t();
      return this.addToRef(e, n), n;
    }, t.prototype.addToRef = function (t, e) {
      for (var n = 0; n < 16; n++) {
        e._m[n] = this._m[n] + t._m[n];
      }

      return e._markAsUpdated(), this;
    }, t.prototype.addToSelf = function (t) {
      for (var e = 0; e < 16; e++) {
        this._m[e] += t._m[e];
      }

      return this._markAsUpdated(), this;
    }, t.prototype.invertToRef = function (e) {
      if (!0 === this._isIdentity) return t.IdentityToRef(e), this;

      var n = this._m,
          o = n[0],
          r = n[1],
          i = n[2],
          s = n[3],
          a = n[4],
          p = n[5],
          u = n[6],
          h = n[7],
          l = n[8],
          c = n[9],
          f = n[10],
          d = n[11],
          y = n[12],
          v = n[13],
          m = n[14],
          b = n[15],
          g = f * b - m * d,
          _ = c * b - v * d,
          C = c * m - v * f,
          x = l * b - y * d,
          w = l * m - f * y,
          O = l * v - y * c,
          T = +(p * g - u * _ + h * C),
          R = -(a * g - u * x + h * w),
          A = +(a * _ - p * x + h * O),
          z = -(a * C - p * w + u * O),
          E = o * T + r * R + i * A + s * z;

      if (0 === E) return e.copyFrom(this), this;
      var P = 1 / E,
          S = u * b - m * h,
          I = p * b - v * h,
          M = p * m - v * u,
          F = a * b - y * h,
          D = a * m - y * u,
          L = a * v - y * p,
          U = u * d - f * h,
          N = p * d - c * h,
          V = p * f - c * u,
          j = a * d - l * h,
          H = a * f - l * u,
          B = a * c - l * p,
          k = -(r * g - i * _ + s * C),
          G = +(o * g - i * x + s * w),
          W = -(o * _ - r * x + s * O),
          q = +(o * C - r * w + i * O),
          Y = +(r * S - i * I + s * M),
          X = -(o * S - i * F + s * D),
          Z = +(o * I - r * F + s * L),
          Q = -(o * M - r * D + i * L),
          J = -(r * U - i * N + s * V),
          K = +(o * U - i * j + s * H),
          $ = -(o * N - r * j + s * B),
          tt = +(o * V - r * H + i * B);
      return t.FromValuesToRef(T * P, k * P, Y * P, J * P, R * P, G * P, X * P, K * P, A * P, W * P, Z * P, $ * P, z * P, q * P, Q * P, tt * P, e), this;
    }, t.prototype.addAtIndex = function (t, e) {
      return this._m[t] += e, this._markAsUpdated(), this;
    }, t.prototype.multiplyAtIndex = function (t, e) {
      return this._m[t] *= e, this._markAsUpdated(), this;
    }, t.prototype.setTranslationFromFloats = function (t, e, n) {
      return this._m[12] = t, this._m[13] = e, this._m[14] = n, this._markAsUpdated(), this;
    }, t.prototype.setTranslation = function (t) {
      return this.setTranslationFromFloats(t.x, t.y, t.z);
    }, t.prototype.getTranslation = function () {
      return new o.Vector3(this._m[12], this._m[13], this._m[14]);
    }, t.prototype.getTranslationToRef = function (t) {
      return t.x = this._m[12], t.y = this._m[13], t.z = this._m[14], this;
    }, t.prototype.removeRotationAndScaling = function () {
      var e = this.m;
      return t.FromValuesToRef(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, e[12], e[13], e[14], e[15], this), this._updateIdentityStatus(0 === e[12] && 0 === e[13] && 0 === e[14] && 1 === e[15]), this;
    }, t.prototype.multiply = function (e) {
      var n = new t();
      return this.multiplyToRef(e, n), n;
    }, t.prototype.copyFrom = function (t) {
      t.copyToArray(this._m);
      var e = t;
      return this._updateIdentityStatus(e._isIdentity, e._isIdentityDirty, e._isIdentity3x2, e._isIdentity3x2Dirty), this;
    }, t.prototype.copyToArray = function (t, e) {
      void 0 === e && (e = 0);

      for (var n = 0; n < 16; n++) {
        t[e + n] = this._m[n];
      }

      return this;
    }, t.prototype.multiplyToRef = function (t, e) {
      return this._isIdentity ? (e.copyFrom(t), this) : t._isIdentity ? (e.copyFrom(this), this) : (this.multiplyToArray(t, e._m, 0), e._markAsUpdated(), this);
    }, t.prototype.multiplyToArray = function (t, e, n) {
      var o = this._m,
          r = t.m,
          i = o[0],
          s = o[1],
          a = o[2],
          p = o[3],
          u = o[4],
          h = o[5],
          l = o[6],
          c = o[7],
          f = o[8],
          d = o[9],
          y = o[10],
          v = o[11],
          m = o[12],
          b = o[13],
          g = o[14],
          _ = o[15],
          C = r[0],
          x = r[1],
          w = r[2],
          O = r[3],
          T = r[4],
          R = r[5],
          A = r[6],
          z = r[7],
          E = r[8],
          P = r[9],
          S = r[10],
          I = r[11],
          M = r[12],
          F = r[13],
          D = r[14],
          L = r[15];
      return e[n] = i * C + s * T + a * E + p * M, e[n + 1] = i * x + s * R + a * P + p * F, e[n + 2] = i * w + s * A + a * S + p * D, e[n + 3] = i * O + s * z + a * I + p * L, e[n + 4] = u * C + h * T + l * E + c * M, e[n + 5] = u * x + h * R + l * P + c * F, e[n + 6] = u * w + h * A + l * S + c * D, e[n + 7] = u * O + h * z + l * I + c * L, e[n + 8] = f * C + d * T + y * E + v * M, e[n + 9] = f * x + d * R + y * P + v * F, e[n + 10] = f * w + d * A + y * S + v * D, e[n + 11] = f * O + d * z + y * I + v * L, e[n + 12] = m * C + b * T + g * E + _ * M, e[n + 13] = m * x + b * R + g * P + _ * F, e[n + 14] = m * w + b * A + g * S + _ * D, e[n + 15] = m * O + b * z + g * I + _ * L, this;
    }, t.prototype.equals = function (t) {
      var e = t;
      if (!e) return !1;
      if ((this._isIdentity || e._isIdentity) && !this._isIdentityDirty && !e._isIdentityDirty) return this._isIdentity && e._isIdentity;
      var n = this.m,
          o = e.m;
      return n[0] === o[0] && n[1] === o[1] && n[2] === o[2] && n[3] === o[3] && n[4] === o[4] && n[5] === o[5] && n[6] === o[6] && n[7] === o[7] && n[8] === o[8] && n[9] === o[9] && n[10] === o[10] && n[11] === o[11] && n[12] === o[12] && n[13] === o[13] && n[14] === o[14] && n[15] === o[15];
    }, t.prototype.clone = function () {
      var e = new t();
      return e.copyFrom(this), e;
    }, t.prototype.getClassName = function () {
      return "Matrix";
    }, t.prototype.getHashCode = function () {
      for (var t = this._m[0] || 0, e = 1; e < 16; e++) {
        t = 397 * t ^ (this._m[e] || 0);
      }

      return t;
    }, t.prototype.decompose = function (e, n, o) {
      if (this._isIdentity) return o && o.setAll(0), e && e.setAll(1), n && n.copyFromFloats(0, 0, 0, 1), !0;
      var s = this._m;
      o && o.copyFromFloats(s[12], s[13], s[14]);
      var a = e || i.MathTmp.Vector3[0];
      if (a.x = Math.sqrt(s[0] * s[0] + s[1] * s[1] + s[2] * s[2]), a.y = Math.sqrt(s[4] * s[4] + s[5] * s[5] + s[6] * s[6]), a.z = Math.sqrt(s[8] * s[8] + s[9] * s[9] + s[10] * s[10]), this.determinant() <= 0 && (a.y *= -1), 0 === a.x || 0 === a.y || 0 === a.z) return n && n.copyFromFloats(0, 0, 0, 1), !1;

      if (n) {
        var p = 1 / a.x,
            u = 1 / a.y,
            h = 1 / a.z;
        t.FromValuesToRef(s[0] * p, s[1] * p, s[2] * p, 0, s[4] * u, s[5] * u, s[6] * u, 0, s[8] * h, s[9] * h, s[10] * h, 0, 0, 0, 0, 1, i.MathTmp.Matrix[0]), r.Quaternion.FromRotationMatrixToRef(i.MathTmp.Matrix[0], n);
      }

      return !0;
    }, t.prototype.getRow = function (t) {
      if (t < 0 || t > 3) return null;
      var e = 4 * t;
      return new s.Vector4(this._m[e + 0], this._m[e + 1], this._m[e + 2], this._m[e + 3]);
    }, t.prototype.setRow = function (t, e) {
      return this.setRowFromFloats(t, e.x, e.y, e.z, e.w);
    }, t.prototype.transpose = function () {
      return t.Transpose(this);
    }, t.prototype.transposeToRef = function (e) {
      return t.TransposeToRef(this, e), this;
    }, t.prototype.setRowFromFloats = function (t, e, n, o, r) {
      if (t < 0 || t > 3) return this;
      var i = 4 * t;
      return this._m[i + 0] = e, this._m[i + 1] = n, this._m[i + 2] = o, this._m[i + 3] = r, this._markAsUpdated(), this;
    }, t.prototype.scale = function (e) {
      var n = new t();
      return this.scaleToRef(e, n), n;
    }, t.prototype.scaleToRef = function (t, e) {
      for (var n = 0; n < 16; n++) {
        e._m[n] = this._m[n] * t;
      }

      return e._markAsUpdated(), this;
    }, t.prototype.scaleAndAddToRef = function (t, e) {
      for (var n = 0; n < 16; n++) {
        e._m[n] += this._m[n] * t;
      }

      return e._markAsUpdated(), this;
    }, t.prototype.toNormalMatrix = function (e) {
      var n = i.MathTmp.Matrix[0];
      this.invertToRef(n), n.transposeToRef(e);
      var o = e._m;
      t.FromValuesToRef(o[0], o[1], o[2], 0, o[4], o[5], o[6], 0, o[8], o[9], o[10], 0, 0, 0, 0, 1, e);
    }, t.prototype.getRotationMatrix = function () {
      var e = new t();
      return this.getRotationMatrixToRef(e), e;
    }, t.prototype.getRotationMatrixToRef = function (e) {
      var n = i.MathTmp.Vector3[0];
      if (!this.decompose(n)) return t.IdentityToRef(e), this;
      var o = this._m,
          r = 1 / n.x,
          s = 1 / n.y,
          a = 1 / n.z;
      return t.FromValuesToRef(o[0] * r, o[1] * r, o[2] * r, 0, o[4] * s, o[5] * s, o[6] * s, 0, o[8] * a, o[9] * a, o[10] * a, 0, 0, 0, 0, 1, e), this;
    }, t.prototype.toggleModelMatrixHandInPlace = function () {
      var t = this._m;
      t[2] *= -1, t[6] *= -1, t[8] *= -1, t[9] *= -1, t[14] *= -1, this._markAsUpdated();
    }, t.prototype.toggleProjectionMatrixHandInPlace = function () {
      var t = this._m;
      t[8] *= -1, t[9] *= -1, t[10] *= -1, t[11] *= -1, this._markAsUpdated();
    }, t.prototype._updateIdentityStatus = function (e, n, o, r) {
      void 0 === n && (n = !1), void 0 === o && (o = !1), void 0 === r && (r = !0), this.updateFlag = t._updateFlagSeed++, this._isIdentity = e, this._isIdentity3x2 = e || o, this._isIdentityDirty = !this._isIdentity && n, this._isIdentity3x2Dirty = !this._isIdentity3x2 && r;
    }, t._updateFlagSeed = 0, t._identityReadOnly = t.Identity(), t;
  }();

  e.Matrix = a;
}, function (t, e, n) {
  "use strict";

  var o = this && this.__decorate || function (t, e, n, o) {
    var r,
        i = arguments.length,
        s = i < 3 ? e : null === o ? o = Object.getOwnPropertyDescriptor(e, n) : o;
    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) s = Reflect.decorate(t, e, n, o);else for (var a = t.length - 1; a >= 0; a--) {
      (r = t[a]) && (s = (i < 3 ? r(s) : i > 3 ? r(e, n, s) : r(e, n)) || s);
    }
    return i > 3 && s && Object.defineProperty(e, n, s), s;
  };

  Object.defineProperty(e, "__esModule", {
    value: !0
  });

  var r = n(8),
      i = function () {
    function t(t, e) {
      this.uuid = t, this.payload = e;
    }

    return t = o([r.EventConstructor()], t);
  }();

  e.UUIDEvent = i;
}, function (t, e, n) {
  "use strict";

  Object.defineProperty(e, "__esModule", {
    value: !0
  });

  var o = n(12),
      r = n(5),
      i = n(7),
      s = function () {
    function t() {
      this.handlerMap = {};
    }

    return t.prototype.activate = function (t) {
      t.eventManager.addListener(o.UUIDEvent, this, this.handleEvent), t.eventManager.addListener(i.ComponentAdded, this, this.componentAdded), t.eventManager.addListener(i.ComponentRemoved, this, this.componentRemoved), "undefined" != typeof dcl && dcl.subscribe("uuidEvent");
    }, t.prototype.deactivate = function () {
      "undefined" != typeof dcl && dcl.unsubscribe("uuidEvent");
    }, t.prototype.onAddEntity = function (t) {
      for (var e in t.components) {
        var n = t.components[e];
        n instanceof r.OnUUIDEvent && (this.handlerMap[n.uuid] = n);
      }
    }, t.prototype.onRemoveEntity = function (t) {
      for (var e in t.components) {
        var n = t.components[e];
        n instanceof r.OnUUIDEvent && delete this.handlerMap[n.uuid];
      }
    }, t.prototype.componentAdded = function (t) {
      if (t.entity.isAddedToEngine()) {
        var e = t.entity.components[t.componentName];
        e instanceof r.OnUUIDEvent && (this.handlerMap[e.uuid] = e);
      }
    }, t.prototype.componentRemoved = function (t) {
      t.entity.isAddedToEngine() && t.component instanceof r.OnUUIDEvent && delete this.handlerMap[t.component.uuid];
    }, t.prototype.handleEvent = function (t) {
      if (t.uuid in this.handlerMap) {
        var e = this.handlerMap[t.uuid];
        e && e.callback && "call" in e.callback && e.callback(t.payload);
      }
    }, t;
  }();

  e.UUIDEventSystem = s, e.uuidEventSystem = new s();
}, function (t, e, n) {
  "use strict";

  Object.defineProperty(e, "__esModule", {
    value: !0
  });

  var o = n(1),
      r = n(4),
      i = function () {
    function t(t, e) {
      void 0 === t && (t = 0), void 0 === e && (e = 0), this.x = t, this.y = e;
    }

    return t.Zero = function () {
      return new t(0, 0);
    }, t.One = function () {
      return new t(1, 1);
    }, t.Add = function (e, n) {
      return new t(e.x, e.y).addInPlace(n);
    }, t.FromArray = function (e, n) {
      return void 0 === n && (n = 0), new t(e[n], e[n + 1]);
    }, t.FromArrayToRef = function (t, e, n) {
      n.x = t[e], n.y = t[e + 1];
    }, t.CatmullRom = function (e, n, o, r, i) {
      var s = i * i,
          a = i * s;
      return new t(.5 * (2 * n.x + (-e.x + o.x) * i + (2 * e.x - 5 * n.x + 4 * o.x - r.x) * s + (-e.x + 3 * n.x - 3 * o.x + r.x) * a), .5 * (2 * n.y + (-e.y + o.y) * i + (2 * e.y - 5 * n.y + 4 * o.y - r.y) * s + (-e.y + 3 * n.y - 3 * o.y + r.y) * a));
    }, t.Clamp = function (e, n, o) {
      var r = e.x;
      r = (r = r > o.x ? o.x : r) < n.x ? n.x : r;
      var i = e.y;
      return new t(r, i = (i = i > o.y ? o.y : i) < n.y ? n.y : i);
    }, t.Hermite = function (e, n, o, r, i) {
      var s = i * i,
          a = i * s,
          p = 2 * a - 3 * s + 1,
          u = -2 * a + 3 * s,
          h = a - 2 * s + i,
          l = a - s;
      return new t(e.x * p + o.x * u + n.x * h + r.x * l, e.y * p + o.y * u + n.y * h + r.y * l);
    }, t.Lerp = function (e, n, o) {
      return new t(e.x + (n.x - e.x) * o, e.y + (n.y - e.y) * o);
    }, t.Dot = function (t, e) {
      return t.x * e.x + t.y * e.y;
    }, t.Normalize = function (e) {
      var n = new t(e.x, e.y);
      return n.normalize(), n;
    }, t.Minimize = function (e, n) {
      return new t(e.x < n.x ? e.x : n.x, e.y < n.y ? e.y : n.y);
    }, t.Maximize = function (e, n) {
      return new t(e.x > n.x ? e.x : n.x, e.y > n.y ? e.y : n.y);
    }, t.Transform = function (e, n) {
      var o = t.Zero();
      return t.TransformToRef(e, n, o), o;
    }, t.TransformToRef = function (t, e, n) {
      var o = e.m,
          r = t.x * o[0] + t.y * o[4] + o[12],
          i = t.x * o[1] + t.y * o[5] + o[13];
      n.x = r, n.y = i;
    }, t.PointInTriangle = function (t, e, n, o) {
      var r = .5 * (-n.y * o.x + e.y * (-n.x + o.x) + e.x * (n.y - o.y) + n.x * o.y),
          i = r < 0 ? -1 : 1,
          s = (e.y * o.x - e.x * o.y + (o.y - e.y) * t.x + (e.x - o.x) * t.y) * i,
          a = (e.x * n.y - e.y * n.x + (e.y - n.y) * t.x + (n.x - e.x) * t.y) * i;
      return s > 0 && a > 0 && s + a < 2 * r * i;
    }, t.Distance = function (e, n) {
      return Math.sqrt(t.DistanceSquared(e, n));
    }, t.DistanceSquared = function (t, e) {
      var n = t.x - e.x,
          o = t.y - e.y;
      return n * n + o * o;
    }, t.Center = function (e, n) {
      var o = t.Add(e, n);
      return o.scaleInPlace(.5), o;
    }, t.DistanceOfPointFromSegment = function (e, n, o) {
      var r = t.DistanceSquared(n, o);
      if (0 === r) return t.Distance(e, n);
      var i = o.subtract(n),
          s = Math.max(0, Math.min(1, t.Dot(e.subtract(n), i) / r)),
          a = n.add(i.multiplyByFloats(s, s));
      return t.Distance(e, a);
    }, t.prototype.toString = function () {
      return "{X: " + this.x + " Y:" + this.y + "}";
    }, t.prototype.getClassName = function () {
      return "Vector2";
    }, t.prototype.getHashCode = function () {
      var t = this.x || 0;
      return t = 397 * t ^ (this.y || 0);
    }, t.prototype.toArray = function (t, e) {
      return void 0 === e && (e = 0), t[e] = this.x, t[e + 1] = this.y, this;
    }, t.prototype.asArray = function () {
      var t = new Array();
      return this.toArray(t, 0), t;
    }, t.prototype.copyFrom = function (t) {
      return this.x = t.x, this.y = t.y, this;
    }, t.prototype.copyFromFloats = function (t, e) {
      return this.x = t, this.y = e, this;
    }, t.prototype.set = function (t, e) {
      return this.copyFromFloats(t, e);
    }, t.prototype.add = function (e) {
      return new t(this.x + e.x, this.y + e.y);
    }, t.prototype.addToRef = function (t, e) {
      return e.x = this.x + t.x, e.y = this.y + t.y, this;
    }, t.prototype.addInPlace = function (t) {
      return this.x += t.x, this.y += t.y, this;
    }, t.prototype.addVector3 = function (e) {
      return new t(this.x + e.x, this.y + e.y);
    }, t.prototype.subtract = function (e) {
      return new t(this.x - e.x, this.y - e.y);
    }, t.prototype.subtractToRef = function (t, e) {
      return e.x = this.x - t.x, e.y = this.y - t.y, this;
    }, t.prototype.subtractInPlace = function (t) {
      return this.x -= t.x, this.y -= t.y, this;
    }, t.prototype.multiplyInPlace = function (t) {
      return this.x *= t.x, this.y *= t.y, this;
    }, t.prototype.multiply = function (e) {
      return new t(this.x * e.x, this.y * e.y);
    }, t.prototype.multiplyToRef = function (t, e) {
      return e.x = this.x * t.x, e.y = this.y * t.y, this;
    }, t.prototype.multiplyByFloats = function (e, n) {
      return new t(this.x * e, this.y * n);
    }, t.prototype.divide = function (e) {
      return new t(this.x / e.x, this.y / e.y);
    }, t.prototype.divideToRef = function (t, e) {
      return e.x = this.x / t.x, e.y = this.y / t.y, this;
    }, t.prototype.divideInPlace = function (t) {
      return this.divideToRef(t, this);
    }, t.prototype.negate = function () {
      return new t(-this.x, -this.y);
    }, t.prototype.scaleInPlace = function (t) {
      return this.x *= t, this.y *= t, this;
    }, t.prototype.scale = function (e) {
      var n = new t(0, 0);
      return this.scaleToRef(e, n), n;
    }, t.prototype.scaleToRef = function (t, e) {
      return e.x = this.x * t, e.y = this.y * t, this;
    }, t.prototype.scaleAndAddToRef = function (t, e) {
      return e.x += this.x * t, e.y += this.y * t, this;
    }, t.prototype.equals = function (t) {
      return t && this.x === t.x && this.y === t.y;
    }, t.prototype.equalsWithEpsilon = function (t, e) {
      return void 0 === e && (e = o.Epsilon), t && r.Scalar.WithinEpsilon(this.x, t.x, e) && r.Scalar.WithinEpsilon(this.y, t.y, e);
    }, t.prototype.floor = function () {
      return new t(Math.floor(this.x), Math.floor(this.y));
    }, t.prototype.fract = function () {
      return new t(this.x - Math.floor(this.x), this.y - Math.floor(this.y));
    }, t.prototype.length = function () {
      return Math.sqrt(this.x * this.x + this.y * this.y);
    }, t.prototype.lengthSquared = function () {
      return this.x * this.x + this.y * this.y;
    }, t.prototype.normalize = function () {
      var t = this.length();
      if (0 === t) return this;
      var e = 1 / t;
      return this.x *= e, this.y *= e, this;
    }, t.prototype.clone = function () {
      return new t(this.x, this.y);
    }, t;
  }();

  e.Vector2 = i;
}, function (t, e, n) {
  "use strict";

  var o = this && this.__read || function (t, e) {
    var n = "function" == typeof Symbol && t[Symbol.iterator];
    if (!n) return t;
    var o,
        r,
        i = n.call(t),
        s = [];

    try {
      for (; (void 0 === e || e-- > 0) && !(o = i.next()).done;) {
        s.push(o.value);
      }
    } catch (t) {
      r = {
        error: t
      };
    } finally {
      try {
        o && !o.done && (n = i.return) && n.call(i);
      } finally {
        if (r) throw r.error;
      }
    }

    return s;
  },
      r = this && this.__spread || function () {
    for (var t = [], e = 0; e < arguments.length; e++) {
      t = t.concat(o(arguments[e]));
    }

    return t;
  };

  Object.defineProperty(e, "__esModule", {
    value: !0
  });

  var i = n(7),
      s = n(0),
      a = n(8),
      p = n(26),
      u = n(2),
      h = function () {
    function t(t) {
      this.eventManager = new a.EventManager(), this.systems = [], this.entityLists = {}, this.addedSystems = [], this._entities = {}, this._disposableComponents = {}, this._componentGroups = {}, this.simpleSystems = [], this.eventManager.addListener(i.ComponentAdded, this, this.componentAddedHandler), this.eventManager.addListener(i.ComponentRemoved, this, this.componentRemovedHandler), this.rootEntity = t;
    }

    return Object.defineProperty(t.prototype, "entities", {
      get: function get() {
        return this._entities;
      },
      enumerable: !0,
      configurable: !0
    }), Object.defineProperty(t.prototype, "disposableComponents", {
      get: function get() {
        return this._disposableComponents;
      },
      enumerable: !0,
      configurable: !0
    }), t.prototype.addEntity = function (t) {
      var e = t.getParent();
      if (t.isAddedToEngine()) return t;

      for (var n in t.eventManager = this.eventManager, t.engine = this, this._entities[t.uuid] = t, this.checkRequirementsAndAdd(t), e ? e.isAddedToEngine() || u.log("Engine: warning, added an entity with a parent not present in the engine") : t.setParent(this.rootEntity), t.alive = !0, t.children) {
        var o = t.children[n];
        o && (o.isAddedToEngine() || this.addEntity(o));
      }

      return t;
    }, t.prototype.removeEntity = function (t) {
      var e = t.uuid;

      if (t.isAddedToEngine()) {
        for (var n in t.components) {
          var o = this._componentGroups[n];
          if (o) for (var r in o) {
            o[r].removeEntity(t);
          }
          delete this.entityLists[n][e];
        }

        for (var i = 0; i < this.simpleSystems.length; i++) {
          var s = this.simpleSystems[i];
          s.onRemoveEntity && s.onRemoveEntity(t);
        }

        for (var i in t.children) {
          var a = t.children[i];
          a && this.removeEntity(a);
        }

        return t.alive = !1, t.eventManager = null, delete this._entities[e], !0;
      }

      for (var n in u.log("Engine: Trying to remove non existent entity from engine."), t.isAddedToEngine() ? u.log("Engine: Entity id: " + e) : u.log('Engine: Entity "' + t.uuid + '" has not been added to any engine yet.'), u.log("Engine: Entity's components:"), t.components) {
        u.log(n);
      }

      return !1;
    }, t.prototype.addSystem = function (t, e) {
      if (void 0 === e && (e = 0), -1 !== this.addedSystems.indexOf(t)) return u.log("Engine: Trying to add a system that is already added. Aborting"), t;
      if (this.systems.length > 0) for (var n = 0; n < this.systems.length; n++) {
        var o = this.systems[n],
            r = n === this.systems.length - 1;

        if (o.priority > e) {
          this.addedSystems.push(t), this.systems.splice(n, 0, {
            system: t,
            priority: e
          });
          break;
        }

        if (r) {
          this.addedSystems.push(t), this.systems.splice(n + 1, 0, {
            system: t,
            priority: e
          });
          break;
        }
      } else this.addedSystems.push(t), this.systems.splice(1, 0, {
        system: t,
        priority: e
      });
      return this.registerSystem(t), t;
    }, t.prototype.removeSystem = function (t) {
      var e = this.addedSystems.indexOf(t);

      if (-1 !== e) {
        t.active = !1, t.deactivate && t.deactivate(), this.addedSystems.splice(e, 1);

        for (var n = 0; n < this.systems.length; n++) {
          this.systems[n].system === t && this.systems.splice(n, 1);
        }

        return !0;
      }

      return !1;
    }, t.prototype.update = function (t) {
      for (var e in this.systems) {
        var n = this.systems[e].system;
        if (n.active && n.update) try {
          n.update(t);
        } catch (t) {
          u.error(t);
        }
      }

      return this;
    }, t.prototype.getEntitiesWithComponent = function (t) {
      var e = "string" == typeof t ? t : s.getComponentName(t);
      return e in this.entityLists ? this.entityLists[e] : this.entityLists[e] = {};
    }, t.prototype.registerComponent = function (t) {
      var e = s.getComponentId(t),
          n = s.getComponentName(t),
          o = s.getComponentClassId(t);
      this._disposableComponents[e] = t, null !== o && (this.eventManager.fireEvent(new s.DisposableComponentCreated(e, n, o)), this.eventManager.fireEvent(new s.DisposableComponentUpdated(e, t)));
    }, t.prototype.disposeComponent = function (t) {
      var e = s.getComponentId(t);
      return delete this._disposableComponents[e] && (this.eventManager.fireEvent(new s.DisposableComponentRemoved(e)), t.onDispose && t.onDispose(), !0);
    }, t.prototype.updateComponent = function (t) {
      this.eventManager.fireEvent(new s.DisposableComponentUpdated(s.getComponentId(t), t));
    }, t.prototype.getComponentGroup = function () {
      for (var t = [], e = 0; e < arguments.length; e++) {
        t[e] = arguments[e];
      }

      var n = new (p.ComponentGroup.bind.apply(p.ComponentGroup, r([void 0], t)))();
      n.active = !0;

      for (var o = n.requiresNames, i = 0; i < o.length; i++) {
        var s = o[i],
            a = this._componentGroups[s];
        a || (this._componentGroups[s] = a = []), -1 === a.indexOf(n) && a.push(n);
      }

      for (var u in this._entities) {
        this.checkRequirements(this._entities[u], n);
      }

      return n;
    }, t.prototype.removeComponentGroup = function (t) {
      if (t.active) {
        t.active = !1;

        for (var e = t.requiresNames, n = 0; n < e.length; n++) {
          var o = e[n],
              r = this._componentGroups[o];

          if (r) {
            var i = r.indexOf(t);
            -1 !== i && r.splice(i, 1);
          }
        }

        return !0;
      }

      return !1;
    }, t.prototype.registerSystem = function (t) {
      t.active = !0, t.activate && t.activate(this), this.simpleSystems.push(t);
    }, t.prototype.checkRequirementsAndAdd = function (t) {
      if (t.isAddedToEngine()) {
        for (var e in t.components) {
          e in this.entityLists || (this.entityLists[e] = {}), this.entityLists[e][t.uuid] = t;
          var n = this._componentGroups[e];
          if (n) for (var o in n) {
            this.checkRequirements(t, n[o]);
          }
        }

        for (var r = 0; r < this.simpleSystems.length; r++) {
          var i = this.simpleSystems[r];
          i.onAddEntity && i.onAddEntity(t);
        }
      }
    }, t.prototype.checkRequirements = function (t, e) {
      e.meetsRequirements(t) ? e.hasEntity(t) || e.addEntity(t) : e.hasEntity(t) && e.removeEntity(t);
    }, t.prototype.componentAddedHandler = function (t) {
      var e,
          n = t.entity,
          o = t.componentName;

      if (n.isAddedToEngine()) {
        this.entityLists[o] ? this.entityLists[o][n.uuid] = n : this.entityLists[o] = ((e = {})[n.uuid] = n, e);
        var r = this._componentGroups[o];
        if (r) for (var i in r) {
          this.checkRequirements(n, r[i]);
        }
      }
    }, t.prototype.componentRemovedHandler = function (t) {
      var e = t.entity,
          n = t.componentName;

      if (e.isAddedToEngine()) {
        delete this.entityLists[n][e.uuid];
        var o = this._componentGroups[n];
        if (o) for (var r in o) {
          this.checkRequirements(e, o[r]);
        }
      }
    }, t;
  }();

  e.Engine = h;
}, function (t, e, n) {
  "use strict";

  var o;
  Object.defineProperty(e, "__esModule", {
    value: !0
  }), function (t) {
    t[t.PERCENT = 0] = "PERCENT", t[t.PIXELS = 1] = "PIXELS";
  }(o = e.UIValueType || (e.UIValueType = {}));

  var r = function () {
    function t(t) {
      if (this.type = o.PIXELS, "string" == typeof t) {
        var e = t;
        e.indexOf("px") > -1 ? this.type = o.PIXELS : e.indexOf("%") > -1 && (this.type = o.PERCENT), this.value = parseFloat(e);
      } else this.value = t;
    }

    return t.prototype.toString = function () {
      var t = this.value.toString();
      return this.type === o.PERCENT ? t += "%" : t += "px", t;
    }, t;
  }();

  e.UIValue = r;
}, function (t, e, n) {
  "use strict";

  Object.defineProperty(e, "__esModule", {
    value: !0
  });

  var o = n(0),
      r = n(7),
      i = n(2),
      s = function () {
    function t(t) {
      this.name = t, this.children = {}, this.eventManager = null, this.alive = !1, this.uuid = i.newId("E"), this.components = {}, this.engine = null, this._parent = null;
    }

    return t.prototype.addComponentOrReplace = function (t) {
      if ("function" == typeof t) throw new Error("You passed a function or class as a component, an instance of component is expected");
      if ("object" != typeof t) throw new Error("You passed a " + typeof t + ", an instance of component is expected");
      var e = o.getComponentName(t);

      if (this.components[e]) {
        if (this.components[e] === t) return t;
        this.removeComponent(this.components[e], !1);
      }

      return this.addComponent(t);
    }, t.prototype.hasComponent = function (t) {
      var e = typeof t;
      if ("string" !== e && "object" !== e && "function" !== e) throw new Error("Entity#has(component): component is not a class, name or instance");
      if (null == t) return !1;
      var n = "string" === e ? t : o.getComponentName(t),
          r = this.components[n];
      return !!r && ("object" === e ? r === t : "function" !== e || r instanceof t);
    }, t.prototype.getComponent = function (t) {
      var e = typeof t;
      if ("string" !== e && "function" !== e) throw new Error("Entity#get(component): component is not a class or name");
      var n = "string" === e ? t : o.getComponentName(t),
          r = this.components[n];
      if (!r) throw new Error('Can not get component "' + n + '" from entity "' + this.identifier + '"');

      if ("function" === e) {
        if (r instanceof t) return r;
        throw new Error('Can not get component "' + n + '" from entity "' + this.identifier + '" (by instance)');
      }

      return r;
    }, t.prototype.getComponentOrNull = function (t) {
      var e = typeof t;
      if ("string" !== e && "function" !== e) throw new Error("Entity#getOrNull(component): component is not a class or name");
      var n = "string" === e ? t : o.getComponentName(t),
          r = this.components[n];
      return r ? "function" === e ? r instanceof t ? r : null : r : null;
    }, t.prototype.getComponentOrCreate = function (t) {
      if ("function" != typeof t) throw new Error("Entity#getOrCreate(component): component is not a class");
      var e = this.getComponentOrNull(t);
      return e || (e = new t(), o.getComponentName(e), this.addComponentOrReplace(e)), e;
    }, t.prototype.addComponent = function (t) {
      if ("object" != typeof t) throw new Error("Entity#add(component): You passed a function or class as a component, an instance of component is expected");
      var e = o.getComponentName(t),
          n = o.getComponentClassId(t);
      if (this.components[e]) throw new Error('A component of type "' + e + '" is already present in entity "' + this.identifier + '"');
      this.components[e] = t, this.eventManager && this.eventManager.fireEvent(new r.ComponentAdded(this, e, n));
      var i = t;
      return "function" == typeof i.addedToEntity && i.addedToEntity(this), t;
    }, t.prototype.removeComponent = function (t, e) {
      void 0 === e && (e = !0);
      var n = typeof t;
      if ("string" !== n && "function" !== n && "object" !== n) throw new Error("Entity#remove(component): component is not a class, class or name");
      var s = "string" === n ? t : o.getComponentName(t),
          a = this.components[s];

      if (a) {
        if ("function" === n) return a instanceof t ? (delete this.components[s], void (a && (e && this.eventManager && this.eventManager.fireEvent(new r.ComponentRemoved(this, s, a)), "function" == typeof a.removedFromEntity && a.removedFromEntity(this)))) : void i.log('Entity Warning: Trying to remove wrong (by constructor) component "' + s + '" from entity "' + this.identifier + '"');
        delete this.components[s], a && (e && this.eventManager && this.eventManager.fireEvent(new r.ComponentRemoved(this, s, a)), "function" == typeof a.removedFromEntity && a.removedFromEntity(this));
      } else i.log('Entity Warning: Trying to remove inexisting component "' + s + '" from entity "' + this.identifier + '"');
    }, t.prototype.isAddedToEngine = function () {
      return !!(this.engine && this.uuid in this.engine.entities);
    }, t.prototype.setParent = function (t) {
      var e = !t && this.engine ? this.engine.rootEntity : t,
          n = this.getParent();
      if (t === this) throw new Error('Failed to set parent for entity "' + this.identifier + "\": An entity can't set itself as a its own parent");
      if (t === n) return this;
      var o = this.getCircularAncestor(t);
      if (o) throw new Error('Failed to set parent for entity "' + this.identifier + '": Circular parent references are not allowed (See entity "' + o + '")');
      return n && delete n.children[this.uuid], "0" !== t.uuid && (!t.isAddedToEngine() && this.isAddedToEngine() && this.engine.removeEntity(this), t.isAddedToEngine() && !this.isAddedToEngine() && t.engine.addEntity(this)), this._parent = e || null, this.registerAsChild(), this.eventManager && this.engine && this.eventManager.fireEvent(new r.ParentChanged(this, e)), this;
    }, t.prototype.getParent = function () {
      return this._parent;
    }, Object.defineProperty(t.prototype, "identifier", {
      get: function get() {
        return this.name || this.uuid;
      },
      enumerable: !0,
      configurable: !0
    }), t.prototype.getCircularAncestor = function (t) {
      for (var e = this.engine ? this.engine.rootEntity : null, n = t; n && n !== e;) {
        var o = n.getParent();
        if (o === this) return n.uuid;
        n = o;
      }

      return null;
    }, t.prototype.registerAsChild = function () {
      var t = this.getParent();
      this.uuid && t && (t.children[this.uuid] = this);
    }, t;
  }();

  e.Entity = s;
}, function (t, e, n) {
  "use strict";

  Object.defineProperty(e, "__esModule", {
    value: !0
  });
  var o = n(2),
      r = Promise.resolve().then.bind(Promise.resolve());

  e.executeTask = function (t) {
    var e = r(t);
    return e.isComplete = !1, e.then(function (t) {
      e.isComplete = !0, e.result = t, e.didFail = !1;
    }).catch(function (t) {
      e.isComplete = !0, e.error = t, e.didFail = !0, o.error("executeTask: FAILED " + t.toString(), t);
    }), e;
  };
}, function (t, e, n) {
  "use strict";

  Object.defineProperty(e, "__esModule", {
    value: !0
  });

  var o = n(1),
      r = n(4),
      i = n(3),
      s = function () {
    function t(t, e, n, o) {
      this.x = t, this.y = e, this.z = n, this.w = o;
    }

    return t.Add = function (e, n) {
      return new t(e.x, e.y, e.z, e.w).addInPlace(n);
    }, t.FromArray = function (e, n) {
      return void 0 === n && (n = 0), new t(e[n], e[n + 1], e[n + 2], e[n + 3]);
    }, t.FromArrayToRef = function (t, e, n) {
      n.x = t[e], n.y = t[e + 1], n.z = t[e + 2], n.w = t[e + 3];
    }, t.FromFloatArrayToRef = function (e, n, o) {
      t.FromArrayToRef(e, n, o);
    }, t.FromFloatsToRef = function (t, e, n, o, r) {
      r.x = t, r.y = e, r.z = n, r.w = o;
    }, t.Zero = function () {
      return new t(0, 0, 0, 0);
    }, t.One = function () {
      return new t(1, 1, 1, 1);
    }, t.Normalize = function (e) {
      var n = t.Zero();
      return t.NormalizeToRef(e, n), n;
    }, t.NormalizeToRef = function (t, e) {
      e.copyFrom(t), e.normalize();
    }, t.Minimize = function (e, n) {
      var o = new t(e.x, e.y, e.z, e.w);
      return o.minimizeInPlace(n), o;
    }, t.Maximize = function (e, n) {
      var o = new t(e.x, e.y, e.z, e.w);
      return o.maximizeInPlace(n), o;
    }, t.Distance = function (e, n) {
      return Math.sqrt(t.DistanceSquared(e, n));
    }, t.DistanceSquared = function (t, e) {
      var n = t.x - e.x,
          o = t.y - e.y,
          r = t.z - e.z,
          i = t.w - e.w;
      return n * n + o * o + r * r + i * i;
    }, t.Center = function (e, n) {
      var o = t.Add(e, n);
      return o.scaleInPlace(.5), o;
    }, t.TransformNormal = function (e, n) {
      var o = t.Zero();
      return t.TransformNormalToRef(e, n, o), o;
    }, t.TransformNormalToRef = function (t, e, n) {
      var o = e.m,
          r = t.x * o[0] + t.y * o[4] + t.z * o[8],
          i = t.x * o[1] + t.y * o[5] + t.z * o[9],
          s = t.x * o[2] + t.y * o[6] + t.z * o[10];
      n.x = r, n.y = i, n.z = s, n.w = t.w;
    }, t.TransformNormalFromFloatsToRef = function (t, e, n, o, r, i) {
      var s = r.m;
      i.x = t * s[0] + e * s[4] + n * s[8], i.y = t * s[1] + e * s[5] + n * s[9], i.z = t * s[2] + e * s[6] + n * s[10], i.w = o;
    }, t.prototype.toString = function () {
      return "{X: " + this.x + " Y:" + this.y + " Z:" + this.z + " W:" + this.w + "}";
    }, t.prototype.getClassName = function () {
      return "Vector4";
    }, t.prototype.getHashCode = function () {
      var t = this.x || 0;
      return t = 397 * (t = 397 * (t = 397 * t ^ (this.y || 0)) ^ (this.z || 0)) ^ (this.w || 0);
    }, t.prototype.asArray = function () {
      var t = new Array();
      return this.toArray(t, 0), t;
    }, t.prototype.toArray = function (t, e) {
      return void 0 === e && (e = 0), t[e] = this.x, t[e + 1] = this.y, t[e + 2] = this.z, t[e + 3] = this.w, this;
    }, t.prototype.addInPlace = function (t) {
      return this.x += t.x, this.y += t.y, this.z += t.z, this.w += t.w, this;
    }, t.prototype.add = function (e) {
      return new t(this.x + e.x, this.y + e.y, this.z + e.z, this.w + e.w);
    }, t.prototype.addToRef = function (t, e) {
      return e.x = this.x + t.x, e.y = this.y + t.y, e.z = this.z + t.z, e.w = this.w + t.w, this;
    }, t.prototype.subtractInPlace = function (t) {
      return this.x -= t.x, this.y -= t.y, this.z -= t.z, this.w -= t.w, this;
    }, t.prototype.subtract = function (e) {
      return new t(this.x - e.x, this.y - e.y, this.z - e.z, this.w - e.w);
    }, t.prototype.subtractToRef = function (t, e) {
      return e.x = this.x - t.x, e.y = this.y - t.y, e.z = this.z - t.z, e.w = this.w - t.w, this;
    }, t.prototype.subtractFromFloats = function (e, n, o, r) {
      return new t(this.x - e, this.y - n, this.z - o, this.w - r);
    }, t.prototype.subtractFromFloatsToRef = function (t, e, n, o, r) {
      return r.x = this.x - t, r.y = this.y - e, r.z = this.z - n, r.w = this.w - o, this;
    }, t.prototype.negate = function () {
      return new t(-this.x, -this.y, -this.z, -this.w);
    }, t.prototype.scaleInPlace = function (t) {
      return this.x *= t, this.y *= t, this.z *= t, this.w *= t, this;
    }, t.prototype.scale = function (e) {
      return new t(this.x * e, this.y * e, this.z * e, this.w * e);
    }, t.prototype.scaleToRef = function (t, e) {
      return e.x = this.x * t, e.y = this.y * t, e.z = this.z * t, e.w = this.w * t, this;
    }, t.prototype.scaleAndAddToRef = function (t, e) {
      return e.x += this.x * t, e.y += this.y * t, e.z += this.z * t, e.w += this.w * t, this;
    }, t.prototype.equals = function (t) {
      return t && this.x === t.x && this.y === t.y && this.z === t.z && this.w === t.w;
    }, t.prototype.equalsWithEpsilon = function (t, e) {
      return void 0 === e && (e = o.Epsilon), t && r.Scalar.WithinEpsilon(this.x, t.x, e) && r.Scalar.WithinEpsilon(this.y, t.y, e) && r.Scalar.WithinEpsilon(this.z, t.z, e) && r.Scalar.WithinEpsilon(this.w, t.w, e);
    }, t.prototype.equalsToFloats = function (t, e, n, o) {
      return this.x === t && this.y === e && this.z === n && this.w === o;
    }, t.prototype.multiplyInPlace = function (t) {
      return this.x *= t.x, this.y *= t.y, this.z *= t.z, this.w *= t.w, this;
    }, t.prototype.multiply = function (e) {
      return new t(this.x * e.x, this.y * e.y, this.z * e.z, this.w * e.w);
    }, t.prototype.multiplyToRef = function (t, e) {
      return e.x = this.x * t.x, e.y = this.y * t.y, e.z = this.z * t.z, e.w = this.w * t.w, this;
    }, t.prototype.multiplyByFloats = function (e, n, o, r) {
      return new t(this.x * e, this.y * n, this.z * o, this.w * r);
    }, t.prototype.divide = function (e) {
      return new t(this.x / e.x, this.y / e.y, this.z / e.z, this.w / e.w);
    }, t.prototype.divideToRef = function (t, e) {
      return e.x = this.x / t.x, e.y = this.y / t.y, e.z = this.z / t.z, e.w = this.w / t.w, this;
    }, t.prototype.divideInPlace = function (t) {
      return this.divideToRef(t, this);
    }, t.prototype.minimizeInPlace = function (t) {
      return t.x < this.x && (this.x = t.x), t.y < this.y && (this.y = t.y), t.z < this.z && (this.z = t.z), t.w < this.w && (this.w = t.w), this;
    }, t.prototype.maximizeInPlace = function (t) {
      return t.x > this.x && (this.x = t.x), t.y > this.y && (this.y = t.y), t.z > this.z && (this.z = t.z), t.w > this.w && (this.w = t.w), this;
    }, t.prototype.floor = function () {
      return new t(Math.floor(this.x), Math.floor(this.y), Math.floor(this.z), Math.floor(this.w));
    }, t.prototype.fract = function () {
      return new t(this.x - Math.floor(this.x), this.y - Math.floor(this.y), this.z - Math.floor(this.z), this.w - Math.floor(this.w));
    }, t.prototype.length = function () {
      return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w);
    }, t.prototype.lengthSquared = function () {
      return this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w;
    }, t.prototype.normalize = function () {
      var t = this.length();
      return 0 === t ? this : this.scaleInPlace(1 / t);
    }, t.prototype.toVector3 = function () {
      return new i.Vector3(this.x, this.y, this.z);
    }, t.prototype.clone = function () {
      return new t(this.x, this.y, this.z, this.w);
    }, t.prototype.copyFrom = function (t) {
      return this.x = t.x, this.y = t.y, this.z = t.z, this.w = t.w, this;
    }, t.prototype.copyFromFloats = function (t, e, n, o) {
      return this.x = t, this.y = e, this.z = n, this.w = o, this;
    }, t.prototype.set = function (t, e, n, o) {
      return this.copyFromFloats(t, e, n, o);
    }, t.prototype.setAll = function (t) {
      return this.x = this.y = this.z = this.w = t, this;
    }, t;
  }();

  e.Vector4 = s;
}, function (t, e, n) {
  "use strict";

  Object.defineProperty(e, "__esModule", {
    value: !0
  });

  var o = function () {
    function t(t) {
      this._radians = t, this._radians < 0 && (this._radians += 2 * Math.PI);
    }

    return t.BetweenTwoPoints = function (e, n) {
      var o = n.subtract(e);
      return new t(Math.atan2(o.y, o.x));
    }, t.FromRadians = function (e) {
      return new t(e);
    }, t.FromDegrees = function (e) {
      return new t(e * Math.PI / 180);
    }, t.prototype.degrees = function () {
      return 180 * this._radians / Math.PI;
    }, t.prototype.radians = function () {
      return this._radians;
    }, t;
  }();

  e.Angle = o;
}, function (t, e, n) {
  "use strict";

  Object.defineProperty(e, "__esModule", {
    value: !0
  });

  var o = n(20),
      r = n(14),
      i = n(1),
      s = function () {
    return function (t, e, n) {
      this.startPoint = t, this.midPoint = e, this.endPoint = n;
      var s = Math.pow(e.x, 2) + Math.pow(e.y, 2),
          a = (Math.pow(t.x, 2) + Math.pow(t.y, 2) - s) / 2,
          p = (s - Math.pow(n.x, 2) - Math.pow(n.y, 2)) / 2,
          u = (t.x - e.x) * (e.y - n.y) - (e.x - n.x) * (t.y - e.y);
      this.centerPoint = new r.Vector2((a * (e.y - n.y) - p * (t.y - e.y)) / u, ((t.x - e.x) * p - (e.x - n.x) * a) / u), this.radius = this.centerPoint.subtract(this.startPoint).length(), this.startAngle = o.Angle.BetweenTwoPoints(this.centerPoint, this.startPoint);
      var h = this.startAngle.degrees(),
          l = o.Angle.BetweenTwoPoints(this.centerPoint, this.midPoint).degrees(),
          c = o.Angle.BetweenTwoPoints(this.centerPoint, this.endPoint).degrees();
      l - h > 180 && (l -= 360), l - h < -180 && (l += 360), c - l > 180 && (c -= 360), c - l < -180 && (c += 360), this.orientation = l - h < 0 ? i.Orientation.CW : i.Orientation.CCW, this.angle = o.Angle.FromDegrees(this.orientation === i.Orientation.CW ? h - c : c - h);
    };
  }();

  e.Arc2 = s;
}, function (t, e, n) {
  "use strict";

  Object.defineProperty(e, "__esModule", {
    value: !0
  });

  var o = n(4),
      r = n(1),
      i = function () {
    function t(t, e, n, o) {
      void 0 === t && (t = 0), void 0 === e && (e = 0), void 0 === n && (n = 0), void 0 === o && (o = 1), this.r = t, this.g = e, this.b = n, this.a = o;
    }

    return t.FromHexString = function (e) {
      if ("#" !== e.substring(0, 1) || 9 !== e.length) return new t(0, 0, 0, 0);
      var n = parseInt(e.substring(1, 3), 16),
          o = parseInt(e.substring(3, 5), 16),
          r = parseInt(e.substring(5, 7), 16),
          i = parseInt(e.substring(7, 9), 16);
      return t.FromInts(n, o, r, i);
    }, t.Lerp = function (e, n, o) {
      var r = new t(0, 0, 0, 0);
      return t.LerpToRef(e, n, o, r), r;
    }, t.LerpToRef = function (t, e, n, o) {
      o.r = t.r + (e.r - t.r) * n, o.g = t.g + (e.g - t.g) * n, o.b = t.b + (e.b - t.b) * n, o.a = t.a + (e.a - t.a) * n;
    }, t.Red = function () {
      return new t(1, 0, 0, 1);
    }, t.Green = function () {
      return new t(0, 1, 0, 1);
    }, t.Blue = function () {
      return new t(0, 0, 1, 1);
    }, t.Black = function () {
      return new t(0, 0, 0, 1);
    }, t.White = function () {
      return new t(1, 1, 1, 1);
    }, t.Purple = function () {
      return new t(.5, 0, .5, 1);
    }, t.Magenta = function () {
      return new t(1, 0, 1, 1);
    }, t.Yellow = function () {
      return new t(1, 1, 0, 1);
    }, t.Gray = function () {
      return new t(.5, .5, .5, 1);
    }, t.Teal = function () {
      return new t(0, 1, 1, 1);
    }, t.Clear = function () {
      return new t(0, 0, 0, 0);
    }, t.FromColor3 = function (e, n) {
      return void 0 === n && (n = 1), new t(e.r, e.g, e.b, n);
    }, t.FromArray = function (e, n) {
      return void 0 === n && (n = 0), new t(e[n], e[n + 1], e[n + 2], e[n + 3]);
    }, t.FromInts = function (e, n, o, r) {
      return new t(e / 255, n / 255, o / 255, r / 255);
    }, t.CheckColors4 = function (t, e) {
      if (t.length === 3 * e) {
        for (var n = [], o = 0; o < t.length; o += 3) {
          var r = o / 3 * 4;
          n[r] = t[o], n[r + 1] = t[o + 1], n[r + 2] = t[o + 2], n[r + 3] = 1;
        }

        return n;
      }

      return t;
    }, t.prototype.addInPlace = function (t) {
      return this.r += t.r, this.g += t.g, this.b += t.b, this.a += t.a, this;
    }, t.prototype.asArray = function () {
      var t = new Array();
      return this.toArray(t, 0), t;
    }, t.prototype.toArray = function (t, e) {
      return void 0 === e && (e = 0), t[e] = this.r, t[e + 1] = this.g, t[e + 2] = this.b, t[e + 3] = this.a, this;
    }, t.prototype.add = function (e) {
      return new t(this.r + e.r, this.g + e.g, this.b + e.b, this.a + e.a);
    }, t.prototype.subtract = function (e) {
      return new t(this.r - e.r, this.g - e.g, this.b - e.b, this.a - e.a);
    }, t.prototype.subtractToRef = function (t, e) {
      return e.r = this.r - t.r, e.g = this.g - t.g, e.b = this.b - t.b, e.a = this.a - t.a, this;
    }, t.prototype.scale = function (e) {
      return new t(this.r * e, this.g * e, this.b * e, this.a * e);
    }, t.prototype.scaleToRef = function (t, e) {
      return e.r = this.r * t, e.g = this.g * t, e.b = this.b * t, e.a = this.a * t, this;
    }, t.prototype.scaleAndAddToRef = function (t, e) {
      return e.r += this.r * t, e.g += this.g * t, e.b += this.b * t, e.a += this.a * t, this;
    }, t.prototype.clampToRef = function (t, e, n) {
      return void 0 === t && (t = 0), void 0 === e && (e = 1), n.r = o.Scalar.Clamp(this.r, t, e), n.g = o.Scalar.Clamp(this.g, t, e), n.b = o.Scalar.Clamp(this.b, t, e), n.a = o.Scalar.Clamp(this.a, t, e), this;
    }, t.prototype.multiply = function (e) {
      return new t(this.r * e.r, this.g * e.g, this.b * e.b, this.a * e.a);
    }, t.prototype.multiplyToRef = function (t, e) {
      return e.r = this.r * t.r, e.g = this.g * t.g, e.b = this.b * t.b, e.a = this.a * t.a, e;
    }, t.prototype.toString = function () {
      return "{R: " + this.r + " G:" + this.g + " B:" + this.b + " A:" + this.a + "}";
    }, t.prototype.getClassName = function () {
      return "Color4";
    }, t.prototype.getHashCode = function () {
      var t = this.r || 0;
      return t = 397 * (t = 397 * (t = 397 * t ^ (this.g || 0)) ^ (this.b || 0)) ^ (this.a || 0);
    }, t.prototype.clone = function () {
      return new t(this.r, this.g, this.b, this.a);
    }, t.prototype.copyFrom = function (t) {
      return this.r = t.r, this.g = t.g, this.b = t.b, this.a = t.a, this;
    }, t.prototype.copyFromFloats = function (t, e, n, o) {
      return this.r = t, this.g = e, this.b = n, this.a = o, this;
    }, t.prototype.set = function (t, e, n, o) {
      return this.copyFromFloats(t, e, n, o);
    }, t.prototype.toHexString = function () {
      var t = 255 * this.r | 0,
          e = 255 * this.g | 0,
          n = 255 * this.b | 0,
          r = 255 * this.a | 0;
      return "#" + o.Scalar.ToHex(t) + o.Scalar.ToHex(e) + o.Scalar.ToHex(n) + o.Scalar.ToHex(r);
    }, t.prototype.toLinearSpace = function () {
      var e = new t();
      return this.toLinearSpaceToRef(e), e;
    }, t.prototype.toLinearSpaceToRef = function (t) {
      return t.r = Math.pow(this.r, r.ToLinearSpace), t.g = Math.pow(this.g, r.ToLinearSpace), t.b = Math.pow(this.b, r.ToLinearSpace), t.a = this.a, this;
    }, t.prototype.toGammaSpace = function () {
      var e = new t();
      return this.toGammaSpaceToRef(e), e;
    }, t.prototype.toGammaSpaceToRef = function (t) {
      return t.r = Math.pow(this.r, r.ToGammaSpace), t.g = Math.pow(this.g, r.ToGammaSpace), t.b = Math.pow(this.b, r.ToGammaSpace), t.a = this.a, this;
    }, t;
  }();

  e.Color4 = i;
}, function (t, e, n) {
  "use strict";

  Object.defineProperty(e, "__esModule", {
    value: !0
  });

  var o = n(3),
      r = n(11),
      i = n(9),
      s = function () {
    function t(t, e, n, r) {
      this.normal = new o.Vector3(t, e, n), this.d = r;
    }

    return t.FromArray = function (e) {
      return new t(e[0], e[1], e[2], e[3]);
    }, t.FromPoints = function (e, n, o) {
      var r = new t(0, 0, 0, 0);
      return r.copyFromPoints(e, n, o), r;
    }, t.FromPositionAndNormal = function (e, n) {
      var o = new t(0, 0, 0, 0);
      return n.normalize(), o.normal = n, o.d = -(n.x * e.x + n.y * e.y + n.z * e.z), o;
    }, t.SignedDistanceToPlaneFromPositionAndNormal = function (t, e, n) {
      var r = -(e.x * t.x + e.y * t.y + e.z * t.z);
      return o.Vector3.Dot(n, e) + r;
    }, t.prototype.asArray = function () {
      return [this.normal.x, this.normal.y, this.normal.z, this.d];
    }, t.prototype.clone = function () {
      return new t(this.normal.x, this.normal.y, this.normal.z, this.d);
    }, t.prototype.getClassName = function () {
      return "Plane";
    }, t.prototype.getHashCode = function () {
      var t = this.normal.getHashCode();
      return t = 397 * t ^ (this.d || 0);
    }, t.prototype.normalize = function () {
      var t = Math.sqrt(this.normal.x * this.normal.x + this.normal.y * this.normal.y + this.normal.z * this.normal.z),
          e = 0;
      return 0 !== t && (e = 1 / t), this.normal.x *= e, this.normal.y *= e, this.normal.z *= e, this.d *= e, this;
    }, t.prototype.transform = function (e) {
      var n = i.MathTmp.Matrix[0];
      r.Matrix.TransposeToRef(e, n);
      var o = n.m,
          s = this.normal.x,
          a = this.normal.y,
          p = this.normal.z,
          u = this.d;
      return new t(s * o[0] + a * o[1] + p * o[2] + u * o[3], s * o[4] + a * o[5] + p * o[6] + u * o[7], s * o[8] + a * o[9] + p * o[10] + u * o[11], s * o[12] + a * o[13] + p * o[14] + u * o[15]);
    }, t.prototype.dotCoordinate = function (t) {
      return this.normal.x * t.x + this.normal.y * t.y + this.normal.z * t.z + this.d;
    }, t.prototype.copyFromPoints = function (t, e, n) {
      var o,
          r = e.x - t.x,
          i = e.y - t.y,
          s = e.z - t.z,
          a = n.x - t.x,
          p = n.y - t.y,
          u = n.z - t.z,
          h = i * u - s * p,
          l = s * a - r * u,
          c = r * p - i * a,
          f = Math.sqrt(h * h + l * l + c * c);
      return o = 0 !== f ? 1 / f : 0, this.normal.x = h * o, this.normal.y = l * o, this.normal.z = c * o, this.d = -(this.normal.x * t.x + this.normal.y * t.y + this.normal.z * t.z), this;
    }, t.prototype.isFrontFacingTo = function (t, e) {
      return o.Vector3.Dot(this.normal, t) <= e;
    }, t.prototype.signedDistanceTo = function (t) {
      return o.Vector3.Dot(t, this.normal) + this.d;
    }, t;
  }();

  e.Plane = s;
}, function (t, e, n) {
  "use strict";

  var _o2,
      r = this && this.__extends || (_o2 = function o(t, e) {
    return (_o2 = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (t, e) {
      t.__proto__ = e;
    } || function (t, e) {
      for (var n in e) {
        e.hasOwnProperty(n) && (t[n] = e[n]);
      }
    })(t, e);
  }, function (t, e) {
    function n() {
      this.constructor = t;
    }

    _o2(t, e), t.prototype = null === e ? Object.create(e) : (n.prototype = e.prototype, new n());
  }),
      i = this && this.__assign || function () {
    return (i = Object.assign || function (t) {
      for (var e, n = 1, o = arguments.length; n < o; n++) {
        for (var r in e = arguments[n]) {
          Object.prototype.hasOwnProperty.call(e, r) && (t[r] = e[r]);
        }
      }

      return t;
    }).apply(this, arguments);
  },
      s = this && this.__decorate || function (t, e, n, o) {
    var r,
        i = arguments.length,
        s = i < 3 ? e : null === o ? o = Object.getOwnPropertyDescriptor(e, n) : o;
    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) s = Reflect.decorate(t, e, n, o);else for (var a = t.length - 1; a >= 0; a--) {
      (r = t[a]) && (s = (i < 3 ? r(s) : i > 3 ? r(e, n, s) : r(e, n)) || s);
    }
    return i > 3 && s && Object.defineProperty(e, n, s), s;
  };

  Object.defineProperty(e, "__esModule", {
    value: !0
  });

  var a = n(0),
      p = n(2),
      u = {
    looping: !0,
    speed: 1,
    weight: 1
  },
      h = function (t) {
    function e(e, n) {
      void 0 === n && (n = u);
      var o = t.call(this) || this;
      return o.isAnimationClip = !0, o.looping = u.looping, o.weight = u.weight, o.playing = !1, o.shouldReset = !1, o.speed = u.speed, o.name = p.newId("AnimClip"), o.clip = e, o.setParams(i({}, n)), o;
    }

    return r(e, t), e.prototype.setParams = function (t) {
      return this.looping = void 0 !== t.looping ? t.looping : this.looping, this.speed = t.speed || this.speed, this;
    }, e.prototype.toJSON = function () {
      var e = JSON.parse(JSON.stringify(t.prototype.toJSON.call(this)));
      return this.shouldReset && (this.shouldReset = !1), e;
    }, e.prototype.play = function () {
      this.playing = !0;
    }, e.prototype.pause = function () {
      this.playing = !1;
    }, e.prototype.reset = function () {
      this.shouldReset = !0;
    }, e.prototype.stop = function () {
      this.reset(), this.pause();
    }, s([a.ObservableComponent.readonly], e.prototype, "clip", void 0), s([a.ObservableComponent.field], e.prototype, "looping", void 0), s([a.ObservableComponent.field], e.prototype, "weight", void 0), s([a.ObservableComponent.field], e.prototype, "playing", void 0), s([a.ObservableComponent.field], e.prototype, "shouldReset", void 0), s([a.ObservableComponent.field], e.prototype, "speed", void 0), s([a.ObservableComponent.readonly], e.prototype, "name", void 0), e;
  }(a.ObservableComponent);

  e.AnimationState = h;
}, function (t, e, n) {
  "use strict";

  function o(t) {
    for (var n in t) {
      e.hasOwnProperty(n) || (e[n] = t[n]);
    }
  }

  Object.defineProperty(e, "__esModule", {
    value: !0
  }), o(n(15)), o(n(0)), o(n(17)), o(n(7)), o(n(18)), o(n(2)), o(n(27)), o(n(16)), o(n(8));
  var r = n(28),
      i = n(15),
      s = new (n(17).Entity)("scene");
  s.uuid = "0";
  var a = new i.Engine(s);
  e.engine = a, n(0).DisposableComponent.engine = a, "undefined" != typeof dcl && a.addSystem(new r.DecentralandSynchronizationSystem(dcl), 1 / 0);
  var p = n(13);
  a.addSystem(p.uuidEventSystem), o(n(37)), o(n(5)), o(n(13)), o(n(12)), o(n(38)), o(n(6)), o(n(24)), o(n(39)), o(n(40)), o(n(41)), o(n(42)), o(n(43));
}, function (t, e, n) {
  "use strict";

  Object.defineProperty(e, "__esModule", {
    value: !0
  });

  var o = n(0),
      r = function () {
    function t() {
      for (var t = [], e = 0; e < arguments.length; e++) {
        t[e] = arguments[e];
      }

      if (this.entities = [], this.active = !1, this._requiresNames = [], !t) throw new Error("ComponentGroup: Could not load the requires list");
      if (!(t instanceof Array)) throw new Error("ComponentGroup: requires list is not an Array");
      Object.defineProperty(this, "requires", {
        get: function get() {
          return t.slice();
        }
      }), Object.defineProperty(this, "requiresNames", {
        get: function get() {
          return this._requiresNames.slice();
        }
      });

      for (var n = function n(e) {
        var n = t[e],
            i = null;
        if (!n) throw new Error("ComponentGroup: the required component at location " + e + " is invalid");

        try {
          i = o.getComponentName(n);
        } catch (t) {
          throw new Error("ComponentGroup: the required component at location " + e + " is not registered as a @Component. Remember to provide the class of the component, not the name");
        }

        if (r._requiresNames.some(function (t) {
          return t === i;
        })) throw new Error("ComponentGroup: the required component list has a repeated name " + i);

        r._requiresNames.push(i);
      }, r = this, i = 0; i < t.length; i++) {
        n(i);
      }
    }

    return t.prototype.hasEntity = function (t) {
      return !!t.isAddedToEngine() && -1 !== this.entities.indexOf(t);
    }, t.prototype.addEntity = function (t) {
      if (!t.isAddedToEngine()) throw new TypeError("ComponentGroup: Cannot add a entity that is not added to the engine");
      -1 === this.entities.indexOf(t) && this.entities.push(t);
    }, t.prototype.removeEntity = function (t) {
      var e = this.entities.indexOf(t);
      -1 !== e && this.entities.splice(e, 1);
    }, t.prototype.componentRemoved = function (t, e) {
      -1 !== this._requiresNames.indexOf(e) && this.removeEntity(t);
    }, t.prototype.meetsRequirements = function (t) {
      for (var e = 0; e < this._requiresNames.length; e++) {
        if (!(this._requiresNames[e] in t.components)) return !1;
      }

      return !0;
    }, t;
  }();

  e.ComponentGroup = r;
}, function (t, e, n) {
  "use strict";

  var o = this && this.__awaiter || function (t, e, n, o) {
    return new (n || (n = Promise))(function (r, i) {
      function s(t) {
        try {
          p(o.next(t));
        } catch (t) {
          i(t);
        }
      }

      function a(t) {
        try {
          p(o.throw(t));
        } catch (t) {
          i(t);
        }
      }

      function p(t) {
        t.done ? r(t.value) : new n(function (e) {
          e(t.value);
        }).then(s, a);
      }

      p((o = o.apply(t, e || [])).next());
    });
  },
      r = this && this.__generator || function (t, e) {
    var n,
        o,
        r,
        i,
        s = {
      label: 0,
      sent: function sent() {
        if (1 & r[0]) throw r[1];
        return r[1];
      },
      trys: [],
      ops: []
    };
    return i = {
      next: a(0),
      throw: a(1),
      return: a(2)
    }, "function" == typeof Symbol && (i[Symbol.iterator] = function () {
      return this;
    }), i;

    function a(i) {
      return function (a) {
        return function (i) {
          if (n) throw new TypeError("Generator is already executing.");

          for (; s;) {
            try {
              if (n = 1, o && (r = 2 & i[0] ? o.return : i[0] ? o.throw || ((r = o.return) && r.call(o), 0) : o.next) && !(r = r.call(o, i[1])).done) return r;

              switch (o = 0, r && (i = [2 & i[0], r.value]), i[0]) {
                case 0:
                case 1:
                  r = i;
                  break;

                case 4:
                  return s.label++, {
                    value: i[1],
                    done: !1
                  };

                case 5:
                  s.label++, o = i[1], i = [0];
                  continue;

                case 7:
                  i = s.ops.pop(), s.trys.pop();
                  continue;

                default:
                  if (!(r = (r = s.trys).length > 0 && r[r.length - 1]) && (6 === i[0] || 2 === i[0])) {
                    s = 0;
                    continue;
                  }

                  if (3 === i[0] && (!r || i[1] > r[0] && i[1] < r[3])) {
                    s.label = i[1];
                    break;
                  }

                  if (6 === i[0] && s.label < r[1]) {
                    s.label = r[1], r = i;
                    break;
                  }

                  if (r && s.label < r[2]) {
                    s.label = r[2], s.ops.push(i);
                    break;
                  }

                  r[2] && s.ops.pop(), s.trys.pop();
                  continue;
              }

              i = e.call(t, s);
            } catch (t) {
              i = [6, t], o = 0;
            } finally {
              n = r = 0;
            }
          }

          if (5 & i[0]) throw i[1];
          return {
            value: i[0] ? i[1] : void 0,
            done: !0
          };
        }([i, a]);
      };
    }
  },
      i = this && this.__values || function (t) {
    var e = "function" == typeof Symbol && t[Symbol.iterator],
        n = 0;
    return e ? e.call(t) : {
      next: function next() {
        return t && n >= t.length && (t = void 0), {
          value: t && t[n++],
          done: !t
        };
      }
    };
  };

  Object.defineProperty(e, "__esModule", {
    value: !0
  });

  var s = n(18),
      a = function () {
    function t(t, e, n, o) {
      void 0 === e && (e = !1), this.initalize(t, e, n, o);
    }

    return t.prototype.initalize = function (t, e, n, o) {
      return void 0 === e && (e = !1), this.mask = t, this.skipNextObservers = e, this.target = n, this.currentTarget = o, this;
    }, t;
  }();

  e.ObserverEventState = a;

  var p = function () {
    return function (t, e, n) {
      void 0 === n && (n = null), this.callback = t, this.mask = e, this.scope = n, this.unregisterOnNextCall = !1, this._willBeUnregistered = !1;
    };
  }();

  e.Observer = p;

  var u = function () {
    function t() {
      this._observers = null, this._observables = null;
    }

    return t.Watch = function (e, n, o, r) {
      var s, a;
      void 0 === o && (o = -1), void 0 === r && (r = null);
      var p = new t();
      p._observers = new Array(), p._observables = e;

      try {
        for (var u = i(e), h = u.next(); !h.done; h = u.next()) {
          var l = h.value.add(n, o, !1, r);
          l && p._observers.push(l);
        }
      } catch (t) {
        s = {
          error: t
        };
      } finally {
        try {
          h && !h.done && (a = u.return) && a.call(u);
        } finally {
          if (s) throw s.error;
        }
      }

      return p;
    }, t.prototype.dispose = function () {
      if (this._observers && this._observables) for (var t = 0; t < this._observers.length; t++) {
        this._observables[t].remove(this._observers[t]);
      }
      this._observers = null, this._observables = null;
    }, t;
  }();

  e.MultiObserver = u;

  var h = function () {
    function t(t) {
      this._observers = new Array(), this._onObserverAdded = null, this._eventState = new a(0), t && (this._onObserverAdded = t);
    }

    return t.prototype.add = function (t, e, n, o, r) {
      if (void 0 === e && (e = -1), void 0 === n && (n = !1), void 0 === o && (o = null), void 0 === r && (r = !1), !t) return null;
      var i = new p(t, e, o);
      return i.unregisterOnNextCall = r, n ? this._observers.unshift(i) : this._observers.push(i), this._onObserverAdded && this._onObserverAdded(i), i;
    }, t.prototype.addOnce = function (t) {
      return this.add(t, void 0, void 0, void 0, !0);
    }, t.prototype.remove = function (t) {
      return !!t && -1 !== this._observers.indexOf(t) && (this._deferUnregister(t), !0);
    }, t.prototype.removeCallback = function (t, e) {
      for (var n = 0; n < this._observers.length; n++) {
        if (this._observers[n].callback === t && (!e || e === this._observers[n].scope)) return this._deferUnregister(this._observers[n]), !0;
      }

      return !1;
    }, t.prototype.notifyObservers = function (t, e, n, o) {
      var r, s;
      if (void 0 === e && (e = -1), !this._observers.length) return !0;
      var a = this._eventState;
      a.mask = e, a.target = n, a.currentTarget = o, a.skipNextObservers = !1, a.lastReturnValue = t;

      try {
        for (var p = i(this._observers), u = p.next(); !u.done; u = p.next()) {
          var h = u.value;
          if (!h._willBeUnregistered && (h.mask & e && (h.scope ? a.lastReturnValue = h.callback.apply(h.scope, [t, a]) : a.lastReturnValue = h.callback(t, a), h.unregisterOnNextCall && this._deferUnregister(h)), a.skipNextObservers)) return !1;
        }
      } catch (t) {
        r = {
          error: t
        };
      } finally {
        try {
          u && !u.done && (s = p.return) && s.call(p);
        } finally {
          if (r) throw r.error;
        }
      }

      return !0;
    }, t.prototype.notifyObserversWithPromise = function (t, e, n, o) {
      var r = this;
      void 0 === e && (e = -1);
      var i = Promise.resolve(t);
      if (!this._observers.length) return i;
      var s = this._eventState;
      return s.mask = e, s.target = n, s.currentTarget = o, s.skipNextObservers = !1, this._observers.forEach(function (n) {
        s.skipNextObservers || n._willBeUnregistered || n.mask & e && (i = n.scope ? i.then(function (e) {
          return s.lastReturnValue = e, n.callback.apply(n.scope, [t, s]);
        }) : i.then(function (e) {
          return s.lastReturnValue = e, n.callback(t, s);
        }), n.unregisterOnNextCall && r._deferUnregister(n));
      }), i.then(function () {
        return t;
      });
    }, t.prototype.notifyObserver = function (t, e, n) {
      void 0 === n && (n = -1);
      var o = this._eventState;
      o.mask = n, o.skipNextObservers = !1, t.callback(e, o);
    }, t.prototype.hasObservers = function () {
      return this._observers.length > 0;
    }, t.prototype.clear = function () {
      this._observers = new Array(), this._onObserverAdded = null;
    }, t.prototype.clone = function () {
      var e = new t();
      return e._observers = this._observers.slice(0), e;
    }, t.prototype.hasSpecificMask = function (t) {
      var e, n;
      void 0 === t && (t = -1);

      try {
        for (var o = i(this._observers), r = o.next(); !r.done; r = o.next()) {
          var s = r.value;
          if (s.mask & t || s.mask === t) return !0;
        }
      } catch (t) {
        e = {
          error: t
        };
      } finally {
        try {
          r && !r.done && (n = o.return) && n.call(o);
        } finally {
          if (e) throw e.error;
        }
      }

      return !1;
    }, t.prototype._deferUnregister = function (t) {
      var e = this;
      t.unregisterOnNextCall = !1, t._willBeUnregistered = !0, s.executeTask(function () {
        return o(e, void 0, void 0, function () {
          return r(this, function (e) {
            return [2, this._remove(t)];
          });
        });
      });
    }, t.prototype._remove = function (t) {
      if (!t) return !1;

      var e = this._observers.indexOf(t);

      return -1 !== e && (this._observers.splice(e, 1), !0);
    }, t;
  }();

  e.Observable = h;
}, function (t, e, n) {
  "use strict";

  Object.defineProperty(e, "__esModule", {
    value: !0
  });

  var o = n(7),
      r = n(12),
      i = n(0),
      s = function () {
    function t(t) {
      this.dcl = t, this.cachedComponents = {};
    }

    return t.prototype.activate = function (t) {
      var e = this;
      this.engine = t, t.eventManager.addListener(o.ComponentAdded, this, this.componentAdded), t.eventManager.addListener(o.ComponentRemoved, this, this.componentRemoved), t.eventManager.addListener(i.DisposableComponentCreated, this, this.disposableComponentCreated), t.eventManager.addListener(i.DisposableComponentRemoved, this, this.disposableComponentRemoved), t.eventManager.addListener(i.DisposableComponentUpdated, this, this.disposableComponentUpdated), t.eventManager.addListener(o.ParentChanged, this, this.parentChanged);
      var n = t.rootEntity.uuid;
      this.dcl.addEntity(n), this.dcl.onUpdate(function (n) {
        t.update(n), e.presentEntities();
      }), this.dcl.onEvent(function (e) {
        switch (e.type) {
          case "uuidEvent":
            var n = e.data;
            t.eventManager.fireEvent(new r.UUIDEvent(n.uuid, n.payload));
        }
      });
    }, t.prototype.onAddEntity = function (t) {
      if (t && t.isAddedToEngine()) {
        var e = t.uuid,
            n = t.getParent();

        for (var o in this.dcl.addEntity(e), n && this.dcl.setParent(e, n.uuid), this.cachedComponents[e] = {}, t.components) {
          var r = t.components[o],
              s = i.getComponentClassId(r);
          if (null !== s) if (i.isDisposableComponent(r)) this.dcl.attachEntityComponent(t.uuid, o, i.getComponentId(r));else {
            var a = JSON.stringify(r);
            this.dcl.updateEntityComponent(e, o, s, a), this.cachedComponents[e][o] = a;
          }
        }
      }
    }, t.prototype.onRemoveEntity = function (t) {
      if (t.isAddedToEngine()) {
        var e = t.uuid;
        this.dcl.removeEntity(e), delete this.cachedComponents[e];
      }
    }, t.prototype.presentEntities = function () {
      for (var t in this.engine.entities) {
        var e = this.engine.entities[t],
            n = e.uuid;

        for (var o in e.components) {
          var r = e.components[o],
              s = i.getComponentClassId(r);

          if (null !== s && !i.isDisposableComponent(r)) {
            var a = JSON.stringify(r);
            this.cachedComponents[n][o] !== a && (this.dcl.updateEntityComponent(e.uuid, o, s, a), this.cachedComponents[n][o] = a);
          }
        }
      }

      for (var p in this.engine.disposableComponents) {
        (r = this.engine.disposableComponents[p]) instanceof i.ObservableComponent && r.dirty && (this.dcl.componentUpdated(p, JSON.stringify(r)), r.dirty = !1);
      }
    }, t.prototype.componentAdded = function (t) {
      if (t.entity.isAddedToEngine()) {
        var e = t.entity.components[t.componentName];
        if (i.isDisposableComponent(e)) this.dcl.attachEntityComponent(t.entity.uuid, t.componentName, i.getComponentId(e));else if (null !== t.classId) {
          var n = JSON.stringify(e);
          this.dcl.updateEntityComponent(t.entity.uuid, t.componentName, t.classId, n), this.cachedComponents[t.entity.uuid][t.componentName] = n;
        }
      }
    }, t.prototype.componentRemoved = function (t) {
      t.entity.isAddedToEngine() && this.dcl.removeEntityComponent(t.entity.uuid, t.componentName);
    }, t.prototype.disposableComponentCreated = function (t) {
      this.dcl.componentCreated(t.componentId, t.componentName, t.classId);
    }, t.prototype.disposableComponentRemoved = function (t) {
      this.dcl.componentDisposed(t.componentId);
    }, t.prototype.disposableComponentUpdated = function (t) {
      this.dcl.componentUpdated(t.componentId, JSON.stringify(t.component));
    }, t.prototype.parentChanged = function (t) {
      this.dcl.setParent(t.entity.uuid, t.parent.uuid);
    }, t;
  }();

  e.DecentralandSynchronizationSystem = s;
}, function (t, e, n) {
  "use strict";

  Object.defineProperty(e, "__esModule", {
    value: !0
  });

  var o = n(3),
      r = function () {
    function t() {}

    return t.X = new o.Vector3(1, 0, 0), t.Y = new o.Vector3(0, 1, 0), t.Z = new o.Vector3(0, 0, 1), t;
  }();

  e.Axis = r;
}, function (t, e, n) {
  "use strict";

  Object.defineProperty(e, "__esModule", {
    value: !0
  });

  var o = function () {
    function t() {}

    return t.Interpolate = function (t, e, n, o, r) {
      for (var i = 1 - 3 * o + 3 * e, s = 3 * o - 6 * e, a = 3 * e, p = t, u = 0; u < 5; u++) {
        var h = p * p;
        p -= (i * (h * p) + s * h + a * p - t) * (1 / (3 * i * h + 2 * s * p + a)), p = Math.min(1, Math.max(0, p));
      }

      return 3 * Math.pow(1 - p, 2) * p * n + 3 * (1 - p) * Math.pow(p, 2) * r + Math.pow(p, 3);
    }, t;
  }();

  e.BezierCurve = o;
}, function (t, e, n) {
  "use strict";

  Object.defineProperty(e, "__esModule", {
    value: !0
  });

  var o = n(1),
      r = n(22),
      i = n(4),
      s = function () {
    function t(t, e, n) {
      void 0 === t && (t = 0), void 0 === e && (e = 0), void 0 === n && (n = 0), this.r = t, this.g = e, this.b = n;
    }

    return t.FromHexString = function (e) {
      if ("#" !== e.substring(0, 1) || 7 !== e.length) return new t(0, 0, 0);
      var n = parseInt(e.substring(1, 3), 16),
          o = parseInt(e.substring(3, 5), 16),
          r = parseInt(e.substring(5, 7), 16);
      return t.FromInts(n, o, r);
    }, t.FromArray = function (e, n) {
      return void 0 === n && (n = 0), new t(e[n], e[n + 1], e[n + 2]);
    }, t.FromInts = function (e, n, o) {
      return new t(e / 255, n / 255, o / 255);
    }, t.Lerp = function (e, n, o) {
      var r = new t(0, 0, 0);
      return t.LerpToRef(e, n, o, r), r;
    }, t.LerpToRef = function (t, e, n, o) {
      o.r = t.r + (e.r - t.r) * n, o.g = t.g + (e.g - t.g) * n, o.b = t.b + (e.b - t.b) * n;
    }, t.Red = function () {
      return new t(1, 0, 0);
    }, t.Green = function () {
      return new t(0, 1, 0);
    }, t.Blue = function () {
      return new t(0, 0, 1);
    }, t.Black = function () {
      return new t(0, 0, 0);
    }, t.White = function () {
      return new t(1, 1, 1);
    }, t.Purple = function () {
      return new t(.5, 0, .5);
    }, t.Magenta = function () {
      return new t(1, 0, 1);
    }, t.Yellow = function () {
      return new t(1, 1, 0);
    }, t.Gray = function () {
      return new t(.5, .5, .5);
    }, t.Teal = function () {
      return new t(0, 1, 1);
    }, t.Random = function () {
      return new t(Math.random(), Math.random(), Math.random());
    }, t.prototype.toString = function () {
      return "{R: " + this.r + " G:" + this.g + " B:" + this.b + "}";
    }, t.prototype.getClassName = function () {
      return "Color3";
    }, t.prototype.getHashCode = function () {
      var t = this.r || 0;
      return t = 397 * (t = 397 * t ^ (this.g || 0)) ^ (this.b || 0);
    }, t.prototype.toArray = function (t, e) {
      return void 0 === e && (e = 0), t[e] = this.r, t[e + 1] = this.g, t[e + 2] = this.b, this;
    }, t.prototype.toColor4 = function (t) {
      return void 0 === t && (t = 1), new r.Color4(this.r, this.g, this.b, t);
    }, t.prototype.asArray = function () {
      var t = new Array();
      return this.toArray(t, 0), t;
    }, t.prototype.toLuminance = function () {
      return .3 * this.r + .59 * this.g + .11 * this.b;
    }, t.prototype.multiply = function (e) {
      return new t(this.r * e.r, this.g * e.g, this.b * e.b);
    }, t.prototype.multiplyToRef = function (t, e) {
      return e.r = this.r * t.r, e.g = this.g * t.g, e.b = this.b * t.b, this;
    }, t.prototype.equals = function (t) {
      return t && this.r === t.r && this.g === t.g && this.b === t.b;
    }, t.prototype.equalsFloats = function (t, e, n) {
      return this.r === t && this.g === e && this.b === n;
    }, t.prototype.scale = function (e) {
      return new t(this.r * e, this.g * e, this.b * e);
    }, t.prototype.scaleToRef = function (t, e) {
      return e.r = this.r * t, e.g = this.g * t, e.b = this.b * t, this;
    }, t.prototype.scaleAndAddToRef = function (t, e) {
      return e.r += this.r * t, e.g += this.g * t, e.b += this.b * t, this;
    }, t.prototype.clampToRef = function (t, e, n) {
      return void 0 === t && (t = 0), void 0 === e && (e = 1), n.r = i.Scalar.Clamp(this.r, t, e), n.g = i.Scalar.Clamp(this.g, t, e), n.b = i.Scalar.Clamp(this.b, t, e), this;
    }, t.prototype.add = function (e) {
      return new t(this.r + e.r, this.g + e.g, this.b + e.b);
    }, t.prototype.addToRef = function (t, e) {
      return e.r = this.r + t.r, e.g = this.g + t.g, e.b = this.b + t.b, this;
    }, t.prototype.subtract = function (e) {
      return new t(this.r - e.r, this.g - e.g, this.b - e.b);
    }, t.prototype.subtractToRef = function (t, e) {
      return e.r = this.r - t.r, e.g = this.g - t.g, e.b = this.b - t.b, this;
    }, t.prototype.clone = function () {
      return new t(this.r, this.g, this.b);
    }, t.prototype.copyFrom = function (t) {
      return this.r = t.r, this.g = t.g, this.b = t.b, this;
    }, t.prototype.copyFromFloats = function (t, e, n) {
      return this.r = t, this.g = e, this.b = n, this;
    }, t.prototype.set = function (t, e, n) {
      return this.copyFromFloats(t, e, n);
    }, t.prototype.toHexString = function () {
      var t = 255 * this.r | 0,
          e = 255 * this.g | 0,
          n = 255 * this.b | 0;
      return "#" + i.Scalar.ToHex(t) + i.Scalar.ToHex(e) + i.Scalar.ToHex(n);
    }, t.prototype.toLinearSpace = function () {
      var e = new t();
      return this.toLinearSpaceToRef(e), e;
    }, t.prototype.toLinearSpaceToRef = function (t) {
      return t.r = Math.pow(this.r, o.ToLinearSpace), t.g = Math.pow(this.g, o.ToLinearSpace), t.b = Math.pow(this.b, o.ToLinearSpace), this;
    }, t.prototype.toGammaSpace = function () {
      var e = new t();
      return this.toGammaSpaceToRef(e), e;
    }, t.prototype.toGammaSpaceToRef = function (t) {
      return t.r = Math.pow(this.r, o.ToGammaSpace), t.g = Math.pow(this.g, o.ToGammaSpace), t.b = Math.pow(this.b, o.ToGammaSpace), this;
    }, t.prototype.toJSON = function () {
      return {
        r: this.r,
        g: this.g,
        b: this.b
      };
    }, t;
  }();

  e.Color3 = s;
}, function (t, e, n) {
  "use strict";

  Object.defineProperty(e, "__esModule", {
    value: !0
  });

  var o = n(3),
      r = function () {
    function t(t) {
      this._length = 0, this._points = t, this._length = this._computeLength(t);
    }

    return t.CreateQuadraticBezier = function (e, n, r, i) {
      i = i > 2 ? i : 3;

      for (var s = new Array(), a = function a(t, e, n, o) {
        return (1 - t) * (1 - t) * e + 2 * t * (1 - t) * n + t * t * o;
      }, p = 0; p <= i; p++) {
        s.push(new o.Vector3(a(p / i, e.x, n.x, r.x), a(p / i, e.y, n.y, r.y), a(p / i, e.z, n.z, r.z)));
      }

      return new t(s);
    }, t.CreateCubicBezier = function (e, n, r, i, s) {
      s = s > 3 ? s : 4;

      for (var a = new Array(), p = function p(t, e, n, o, r) {
        return (1 - t) * (1 - t) * (1 - t) * e + 3 * t * (1 - t) * (1 - t) * n + 3 * t * t * (1 - t) * o + t * t * t * r;
      }, u = 0; u <= s; u++) {
        a.push(new o.Vector3(p(u / s, e.x, n.x, r.x, i.x), p(u / s, e.y, n.y, r.y, i.y), p(u / s, e.z, n.z, r.z, i.z)));
      }

      return new t(a);
    }, t.CreateHermiteSpline = function (e, n, r, i, s) {
      for (var a = new Array(), p = 1 / s, u = 0; u <= s; u++) {
        a.push(o.Vector3.Hermite(e, n, r, i, u * p));
      }

      return new t(a);
    }, t.CreateCatmullRomSpline = function (e, n, r) {
      var i = new Array(),
          s = 1 / n,
          a = 0;

      if (r) {
        for (var p = e.length, u = 0; u < p; u++) {
          a = 0;

          for (var h = 0; h < n; h++) {
            i.push(o.Vector3.CatmullRom(e[u % p], e[(u + 1) % p], e[(u + 2) % p], e[(u + 3) % p], a)), a += s;
          }
        }

        i.push(i[0]);
      } else {
        var l = new Array();
        l.push(e[0].clone()), Array.prototype.push.apply(l, e), l.push(e[e.length - 1].clone());
        u = 0;

        for (u = 0; u < l.length - 3; u++) {
          a = 0;

          for (h = 0; h < n; h++) {
            i.push(o.Vector3.CatmullRom(l[u], l[u + 1], l[u + 2], l[u + 3], a)), a += s;
          }
        }

        u--, i.push(o.Vector3.CatmullRom(l[u], l[u + 1], l[u + 2], l[u + 3], a));
      }

      return new t(i);
    }, t.prototype.getPoints = function () {
      return this._points;
    }, t.prototype.length = function () {
      return this._length;
    }, t.prototype.continue = function (e) {
      for (var n = this._points[this._points.length - 1], o = this._points.slice(), r = e.getPoints(), i = 1; i < r.length; i++) {
        o.push(r[i].subtract(r[0]).add(n));
      }

      return new t(o);
    }, t.prototype._computeLength = function (t) {
      for (var e = 0, n = 1; n < t.length; n++) {
        e += t[n].subtract(t[n - 1]).length();
      }

      return e;
    }, t;
  }();

  e.Curve3 = r;
}, function (t, e, n) {
  "use strict";

  Object.defineProperty(e, "__esModule", {
    value: !0
  });

  var o = n(23),
      r = function () {
    function t() {}

    return t.GetPlanes = function (e) {
      for (var n = [], r = 0; r < 6; r++) {
        n.push(new o.Plane(0, 0, 0, 0));
      }

      return t.GetPlanesToRef(e, n), n;
    }, t.GetNearPlaneToRef = function (t, e) {
      var n = t.m;
      e.normal.x = n[3] + n[2], e.normal.y = n[7] + n[6], e.normal.z = n[11] + n[10], e.d = n[15] + n[14], e.normalize();
    }, t.GetFarPlaneToRef = function (t, e) {
      var n = t.m;
      e.normal.x = n[3] - n[2], e.normal.y = n[7] - n[6], e.normal.z = n[11] - n[10], e.d = n[15] - n[14], e.normalize();
    }, t.GetLeftPlaneToRef = function (t, e) {
      var n = t.m;
      e.normal.x = n[3] + n[0], e.normal.y = n[7] + n[4], e.normal.z = n[11] + n[8], e.d = n[15] + n[12], e.normalize();
    }, t.GetRightPlaneToRef = function (t, e) {
      var n = t.m;
      e.normal.x = n[3] - n[0], e.normal.y = n[7] - n[4], e.normal.z = n[11] - n[8], e.d = n[15] - n[12], e.normalize();
    }, t.GetTopPlaneToRef = function (t, e) {
      var n = t.m;
      e.normal.x = n[3] - n[1], e.normal.y = n[7] - n[5], e.normal.z = n[11] - n[9], e.d = n[15] - n[13], e.normalize();
    }, t.GetBottomPlaneToRef = function (t, e) {
      var n = t.m;
      e.normal.x = n[3] + n[1], e.normal.y = n[7] + n[5], e.normal.z = n[11] + n[9], e.d = n[15] + n[13], e.normalize();
    }, t.GetPlanesToRef = function (e, n) {
      t.GetNearPlaneToRef(e, n[0]), t.GetFarPlaneToRef(e, n[1]), t.GetLeftPlaneToRef(e, n[2]), t.GetRightPlaneToRef(e, n[3]), t.GetTopPlaneToRef(e, n[4]), t.GetBottomPlaneToRef(e, n[5]);
    }, t;
  }();

  e.Frustum = r;
}, function (t, e, n) {
  "use strict";

  Object.defineProperty(e, "__esModule", {
    value: !0
  });

  var o = n(14),
      r = n(21),
      i = n(1),
      s = function () {
    function t(t, e) {
      this.closed = !1, this._points = new Array(), this._length = 0, this._points.push(new o.Vector2(t, e));
    }

    return t.StartingAt = function (e, n) {
      return new t(e, n);
    }, t.prototype.addLineTo = function (t, e) {
      if (this.closed) return this;
      var n = new o.Vector2(t, e),
          r = this._points[this._points.length - 1];
      return this._points.push(n), this._length += n.subtract(r).length(), this;
    }, t.prototype.addArcTo = function (t, e, n, s, a) {
      if (void 0 === a && (a = 36), this.closed) return this;
      var p = this._points[this._points.length - 1],
          u = new o.Vector2(t, e),
          h = new o.Vector2(n, s),
          l = new r.Arc2(p, u, h),
          c = l.angle.radians() / a;
      l.orientation === i.Orientation.CW && (c *= -1);

      for (var f = l.startAngle.radians() + c, d = 0; d < a; d++) {
        var y = Math.cos(f) * l.radius + l.centerPoint.x,
            v = Math.sin(f) * l.radius + l.centerPoint.y;
        this.addLineTo(y, v), f += c;
      }

      return this;
    }, t.prototype.close = function () {
      return this.closed = !0, this;
    }, t.prototype.length = function () {
      var t = this._length;

      if (!this.closed) {
        var e = this._points[this._points.length - 1];
        t += this._points[0].subtract(e).length();
      }

      return t;
    }, t.prototype.getPoints = function () {
      return this._points;
    }, t.prototype.getPointAtLengthPosition = function (t) {
      if (t < 0 || t > 1) return o.Vector2.Zero();

      for (var e = t * this.length(), n = 0, r = 0; r < this._points.length; r++) {
        var i = (r + 1) % this._points.length,
            s = this._points[r],
            a = this._points[i].subtract(s),
            p = a.length() + n;

        if (e >= n && e <= p) {
          var u = a.normalize(),
              h = e - n;
          return new o.Vector2(s.x + u.x * h, s.y + u.y * h);
        }

        n = p;
      }

      return o.Vector2.Zero();
    }, t;
  }();

  e.Path2 = s;
}, function (t, e, n) {
  "use strict";

  Object.defineProperty(e, "__esModule", {
    value: !0
  });

  var o = n(3),
      r = n(1),
      i = n(4),
      s = function () {
    function t(t, e, n) {
      void 0 === e && (e = null), this.path = t, this._curve = new Array(), this._distances = new Array(), this._tangents = new Array(), this._normals = new Array(), this._binormals = new Array();

      for (var o = 0; o < t.length; o++) {
        this._curve[o] = t[o].clone();
      }

      this._raw = n || !1, this._compute(e);
    }

    return t.prototype.getCurve = function () {
      return this._curve;
    }, t.prototype.getTangents = function () {
      return this._tangents;
    }, t.prototype.getNormals = function () {
      return this._normals;
    }, t.prototype.getBinormals = function () {
      return this._binormals;
    }, t.prototype.getDistances = function () {
      return this._distances;
    }, t.prototype.update = function (t, e) {
      void 0 === e && (e = null);

      for (var n = 0; n < t.length; n++) {
        this._curve[n].x = t[n].x, this._curve[n].y = t[n].y, this._curve[n].z = t[n].z;
      }

      return this._compute(e), this;
    }, t.prototype._compute = function (t) {
      var e = this._curve.length;
      this._tangents[0] = this._getFirstNonNullVector(0), this._raw || this._tangents[0].normalize(), this._tangents[e - 1] = this._curve[e - 1].subtract(this._curve[e - 2]), this._raw || this._tangents[e - 1].normalize();

      var n,
          r,
          i,
          s,
          a = this._tangents[0],
          p = this._normalVector(this._curve[0], a, t);

      this._normals[0] = p, this._raw || this._normals[0].normalize(), this._binormals[0] = o.Vector3.Cross(a, this._normals[0]), this._raw || this._binormals[0].normalize(), this._distances[0] = 0;

      for (var u = 1; u < e; u++) {
        n = this._getLastNonNullVector(u), u < e - 1 && (r = this._getFirstNonNullVector(u), this._tangents[u] = n.add(r), this._tangents[u].normalize()), this._distances[u] = this._distances[u - 1] + n.length(), i = this._tangents[u], s = this._binormals[u - 1], this._normals[u] = o.Vector3.Cross(s, i), this._raw || this._normals[u].normalize(), this._binormals[u] = o.Vector3.Cross(i, this._normals[u]), this._raw || this._binormals[u].normalize();
      }
    }, t.prototype._getFirstNonNullVector = function (t) {
      for (var e = 1, n = this._curve[t + e].subtract(this._curve[t]); 0 === n.length() && t + e + 1 < this._curve.length;) {
        e++, n = this._curve[t + e].subtract(this._curve[t]);
      }

      return n;
    }, t.prototype._getLastNonNullVector = function (t) {
      for (var e = 1, n = this._curve[t].subtract(this._curve[t - e]); 0 === n.length() && t > e + 1;) {
        e++, n = this._curve[t].subtract(this._curve[t - e]);
      }

      return n;
    }, t.prototype._normalVector = function (t, e, n) {
      var s,
          a = e.length();

      if (0 === a && (a = 1), null == n) {
        var p = void 0;
        p = i.Scalar.WithinEpsilon(Math.abs(e.y) / a, 1, r.Epsilon) ? i.Scalar.WithinEpsilon(Math.abs(e.x) / a, 1, r.Epsilon) ? i.Scalar.WithinEpsilon(Math.abs(e.z) / a, 1, r.Epsilon) ? o.Vector3.Zero() : new o.Vector3(0, 0, 1) : new o.Vector3(1, 0, 0) : new o.Vector3(0, -1, 0), s = o.Vector3.Cross(e, p);
      } else s = o.Vector3.Cross(e, n), o.Vector3.CrossToRef(s, e, s);

      return s.normalize(), s;
    }, t;
  }();

  e.Path3D = s;
}, function (t, e, n) {
  "use strict";

  Object.defineProperty(e, "__esModule", {
    value: !0
  });

  var o = function () {
    function t(t, e) {
      this.width = t, this.height = e;
    }

    return Object.defineProperty(t.prototype, "surface", {
      get: function get() {
        return this.width * this.height;
      },
      enumerable: !0,
      configurable: !0
    }), t.Zero = function () {
      return new t(0, 0);
    }, t.Lerp = function (e, n, o) {
      return new t(e.width + (n.width - e.width) * o, e.height + (n.height - e.height) * o);
    }, t.prototype.toString = function () {
      return "{W: " + this.width + ", H: " + this.height + "}";
    }, t.prototype.getClassName = function () {
      return "Size";
    }, t.prototype.getHashCode = function () {
      var t = this.width || 0;
      return t = 397 * t ^ (this.height || 0);
    }, t.prototype.copyFrom = function (t) {
      this.width = t.width, this.height = t.height;
    }, t.prototype.copyFromFloats = function (t, e) {
      return this.width = t, this.height = e, this;
    }, t.prototype.set = function (t, e) {
      return this.copyFromFloats(t, e);
    }, t.prototype.multiplyByFloats = function (e, n) {
      return new t(this.width * e, this.height * n);
    }, t.prototype.clone = function () {
      return new t(this.width, this.height);
    }, t.prototype.equals = function (t) {
      return !!t && this.width === t.width && this.height === t.height;
    }, t.prototype.add = function (e) {
      return new t(this.width + e.width, this.height + e.height);
    }, t.prototype.subtract = function (e) {
      return new t(this.width - e.width, this.height - e.height);
    }, t;
  }();

  e.Size = o;
}, function (t, e, n) {
  "use strict";

  Object.defineProperty(e, "__esModule", {
    value: !0
  }), e.AVATAR_OBSERVABLE = "AVATAR_OBSERVABLE";
}, function (t, e, n) {
  "use strict";

  Object.defineProperty(e, "__esModule", {
    value: !0
  });

  var o = n(6),
      r = function () {
    function t() {
      var t = this;
      this.position = new o.Vector3(), this.rotation = new o.Quaternion(), this.lastEventPosition = {
        x: 0,
        y: 0,
        z: 0
      }, this.lastEventRotation = {
        x: 0,
        y: 0,
        z: 0,
        w: 1
      }, "undefined" != typeof dcl && (dcl.subscribe("positionChanged"), dcl.subscribe("rotationChanged"), dcl.onEvent(function (e) {
        switch (e.type) {
          case "positionChanged":
            t.positionChanged(e.data);
            break;

          case "rotationChanged":
            t.rotationChanged(e.data);
        }
      })), Object.defineProperty(this.position, "x", {
        get: function get() {
          return t.lastEventPosition.x;
        }
      }), Object.defineProperty(this.position, "y", {
        get: function get() {
          return t.lastEventPosition.y;
        }
      }), Object.defineProperty(this.position, "z", {
        get: function get() {
          return t.lastEventPosition.z;
        }
      }), Object.defineProperty(this.rotation, "x", {
        get: function get() {
          return t.lastEventRotation.x;
        }
      }), Object.defineProperty(this.rotation, "y", {
        get: function get() {
          return t.lastEventRotation.y;
        }
      }), Object.defineProperty(this.rotation, "z", {
        get: function get() {
          return t.lastEventRotation.z;
        }
      }), Object.defineProperty(this.rotation, "w", {
        get: function get() {
          return t.lastEventRotation.w;
        }
      });
    }

    return Object.defineProperty(t, "instance", {
      get: function get() {
        return t._instance || (t._instance = new t()), t._instance;
      },
      enumerable: !0,
      configurable: !0
    }), t.prototype.positionChanged = function (t) {
      this.lastEventPosition = t.position;
    }, t.prototype.rotationChanged = function (t) {
      this.lastEventRotation = t.quaternion;
    }, t;
  }();

  e.Camera = r;
}, function (t, e, n) {
  "use strict";

  var _o3,
      r = this && this.__extends || (_o3 = function o(t, e) {
    return (_o3 = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (t, e) {
      t.__proto__ = e;
    } || function (t, e) {
      for (var n in e) {
        e.hasOwnProperty(n) && (t[n] = e[n]);
      }
    })(t, e);
  }, function (t, e) {
    function n() {
      this.constructor = t;
    }

    _o3(t, e), t.prototype = null === e ? Object.create(e) : (n.prototype = e.prototype, new n());
  }),
      i = this && this.__assign || function () {
    return (i = Object.assign || function (t) {
      for (var e, n = 1, o = arguments.length; n < o; n++) {
        for (var r in e = arguments[n]) {
          Object.prototype.hasOwnProperty.call(e, r) && (t[r] = e[r]);
        }
      }

      return t;
    }).apply(this, arguments);
  },
      s = this && this.__decorate || function (t, e, n, o) {
    var r,
        i = arguments.length,
        s = i < 3 ? e : null === o ? o = Object.getOwnPropertyDescriptor(e, n) : o;
    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) s = Reflect.decorate(t, e, n, o);else for (var a = t.length - 1; a >= 0; a--) {
      (r = t[a]) && (s = (i < 3 ? r(s) : i > 3 ? r(e, n, s) : r(e, n)) || s);
    }
    return i > 3 && s && Object.defineProperty(e, n, s), s;
  };

  Object.defineProperty(e, "__esModule", {
    value: !0
  });
  var a,
      p = n(6),
      u = n(0);
  !function (t) {
    t.PRIMARY = "PRIMARY", t.SECONDARY = "SECONDARY";
  }(a = e.Pointer || (e.Pointer = {}));

  var h = function () {
    return function (t) {
      if (this.callback = t, !(t && "apply" in t && "call" in t)) throw new Error("Callback is not a function");
      f.ensureInstance();
    };
  }();

  e.PointerEventComponent = h;

  var l = function (t) {
    function e() {
      return null !== t && t.apply(this, arguments) || this;
    }

    return r(e, t), e = s([u.Component("pointerDown")], e);
  }(h);

  e.OnPointerDown = l;

  var c = function (t) {
    function e() {
      return null !== t && t.apply(this, arguments) || this;
    }

    return r(e, t), e = s([u.Component("pointerUp")], e);
  }(h);

  e.OnPointerUp = c;

  var f = function () {
    function t() {
      var t,
          e = this;
      this.subscriptions = {
        BUTTON_DOWN: [],
        BUTTON_UP: []
      }, this.internalState = ((t = {})[a.PRIMARY] = {
        BUTTON_DOWN: !1
      }, t[a.SECONDARY] = {
        BUTTON_DOWN: !1
      }, t), "undefined" != typeof dcl && (dcl.subscribe("pointerUp"), dcl.subscribe("pointerDown"), dcl.onEvent(function (t) {
        "pointerUp" === t.type ? e.handlePointerUp(t.data) : "pointerDown" === t.type && e.handlePointerDown(t.data);
      }));
    }

    return Object.defineProperty(t, "instance", {
      get: function get() {
        return t.ensureInstance(), t._instance;
      },
      enumerable: !0,
      configurable: !0
    }), Object.defineProperty(t.prototype, "state", {
      get: function get() {
        return this.internalState;
      },
      enumerable: !0,
      configurable: !0
    }), t.ensureInstance = function () {
      t._instance || (t._instance = new t());
    }, t.prototype.subscribe = function (t, e) {
      var n = this;
      return this.subscriptions[t].push(e), function () {
        return n.unsubscribe(t, e);
      };
    }, t.prototype.unsubscribe = function (t, e) {
      var n = this.subscriptions[t].indexOf(e);
      return n > -1 && this.subscriptions[t].splice(n, 1);
    }, t.prototype.getPointerById = function (t) {
      return 1 === t ? a.PRIMARY : a.SECONDARY;
    }, t.prototype.handlePointerUp = function (t) {
      var e = this.getPointerById(t.pointerId),
          n = i({}, t, {
        pointer: e,
        direction: new p.Vector3().copyFrom(t.direction),
        origin: new p.Vector3().copyFrom(t.origin),
        hit: t.hit ? i({}, t.hit, {
          hitPoint: new p.Vector3().copyFrom(t.hit.hitPoint),
          normal: new p.Vector3().copyFrom(t.hit.normal),
          worldNormal: new p.Vector3().copyFrom(t.hit.worldNormal)
        }) : void 0
      });
      this.internalState[a.PRIMARY].BUTTON_DOWN = !1;

      for (var o = 0; o < this.subscriptions.BUTTON_UP.length; o++) {
        this.subscriptions.BUTTON_UP[o](n);
      }

      if (n.hit && n.hit.entityId && u.DisposableComponent.engine) {
        var r = u.DisposableComponent.engine.entities[n.hit.entityId],
            s = r && r.getComponentOrNull(c);
        s && s.callback(n);
      }
    }, t.prototype.handlePointerDown = function (t) {
      var e = this.getPointerById(t.pointerId),
          n = i({}, t, {
        pointer: e,
        direction: new p.Vector3().copyFrom(t.direction),
        origin: new p.Vector3().copyFrom(t.origin),
        hit: t.hit ? i({}, t.hit, {
          hitPoint: new p.Vector3().copyFrom(t.hit.hitPoint),
          normal: new p.Vector3().copyFrom(t.hit.normal),
          worldNormal: new p.Vector3().copyFrom(t.hit.worldNormal)
        }) : void 0
      });
      this.internalState[a.PRIMARY].BUTTON_DOWN = !0;

      for (var o = 0; o < this.subscriptions.BUTTON_DOWN.length; o++) {
        this.subscriptions.BUTTON_DOWN[o](n);
      }

      if (n.hit && n.hit.entityId && u.DisposableComponent.engine) {
        var r = u.DisposableComponent.engine.entities[n.hit.entityId],
            s = r && r.getComponentOrNull(l);
        s && s.callback(n);
      }
    }, t;
  }();

  e.Input = f;
}, function (t, e, n) {
  "use strict";

  var _o4,
      r = this && this.__extends || (_o4 = function o(t, e) {
    return (_o4 = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (t, e) {
      t.__proto__ = e;
    } || function (t, e) {
      for (var n in e) {
        e.hasOwnProperty(n) && (t[n] = e[n]);
      }
    })(t, e);
  }, function (t, e) {
    function n() {
      this.constructor = t;
    }

    _o4(t, e), t.prototype = null === e ? Object.create(e) : (n.prototype = e.prototype, new n());
  }),
      i = this && this.__decorate || function (t, e, n, o) {
    var r,
        i = arguments.length,
        s = i < 3 ? e : null === o ? o = Object.getOwnPropertyDescriptor(e, n) : o;
    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) s = Reflect.decorate(t, e, n, o);else for (var a = t.length - 1; a >= 0; a--) {
      (r = t[a]) && (s = (i < 3 ? r(s) : i > 3 ? r(e, n, s) : r(e, n)) || s);
    }
    return i > 3 && s && Object.defineProperty(e, n, s), s;
  };

  Object.defineProperty(e, "__esModule", {
    value: !0
  });

  var s = n(0),
      a = n(5),
      p = function (t) {
    function e(e) {
      var n = t.call(this) || this;
      return n.loop = !1, n.volume = 1, n.url = e, n;
    }

    return r(e, t), i([s.ObservableComponent.readonly], e.prototype, "url", void 0), i([s.ObservableComponent.field], e.prototype, "loop", void 0), i([s.ObservableComponent.field], e.prototype, "loadingCompleteEventId", void 0), i([s.ObservableComponent.field], e.prototype, "volume", void 0), e = i([s.DisposableComponent("engine.AudioClip", a.CLASS_ID.AUDIO_CLIP)], e);
  }(s.ObservableComponent);

  e.AudioClip = p;

  var u = function (t) {
    function e(e) {
      var n = t.call(this) || this;
      if (n.audioClip = e, n.loop = !1, n.volume = 1, n.playing = !0, n.pitch = 1, !(e instanceof p)) throw new Error("Trying to create AudioSource(AudioClip) with an invalid AudioClip");
      return n.audioClipId = s.getComponentId(e), n;
    }

    return r(e, t), e.prototype.playOnce = function () {
      return this.playing = !0, this.dirty = !0, this.data.nonce = Math.random(), this;
    }, i([s.ObservableComponent.readonly], e.prototype, "audioClipId", void 0), i([s.ObservableComponent.field], e.prototype, "loop", void 0), i([s.ObservableComponent.field], e.prototype, "volume", void 0), i([s.ObservableComponent.field], e.prototype, "playing", void 0), i([s.ObservableComponent.field], e.prototype, "pitch", void 0), e = i([s.Component("engine.AudioSource", a.CLASS_ID.AUDIO_SOURCE)], e);
  }(s.ObservableComponent);

  e.AudioSource = u;
}, function (t, e, n) {
  "use strict";

  var _o5,
      r = this && this.__extends || (_o5 = function o(t, e) {
    return (_o5 = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (t, e) {
      t.__proto__ = e;
    } || function (t, e) {
      for (var n in e) {
        e.hasOwnProperty(n) && (t[n] = e[n]);
      }
    })(t, e);
  }, function (t, e) {
    function n() {
      this.constructor = t;
    }

    _o5(t, e), t.prototype = null === e ? Object.create(e) : (n.prototype = e.prototype, new n());
  }),
      i = this && this.__decorate || function (t, e, n, o) {
    var r,
        i = arguments.length,
        s = i < 3 ? e : null === o ? o = Object.getOwnPropertyDescriptor(e, n) : o;
    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) s = Reflect.decorate(t, e, n, o);else for (var a = t.length - 1; a >= 0; a--) {
      (r = t[a]) && (s = (i < 3 ? r(s) : i > 3 ? r(e, n, s) : r(e, n)) || s);
    }
    return i > 3 && s && Object.defineProperty(e, n, s), s;
  };

  Object.defineProperty(e, "__esModule", {
    value: !0
  });
  var s = n(0),
      a = n(5);
  !function (t) {
    t.MOVE = "MOVE", t.ROTATE = "ROTATE", t.SCALE = "SCALE", t.NONE = "NONE";
  }(e.Gizmo || (e.Gizmo = {}));

  var p = function (t) {
    function e() {
      var e = null !== t && t.apply(this, arguments) || this;
      return e.type = "gizmoEvent", e;
    }

    return r(e, t), i([s.ObservableComponent.readonly], e.prototype, "type", void 0), e = i([s.Component("engine.gizmoEvent", a.CLASS_ID.UUID_CALLBACK)], e);
  }(a.OnUUIDEvent);

  e.OnGizmoEvent = p;

  var u = function (t) {
    function e() {
      var e = null !== t && t.apply(this, arguments) || this;
      return e.position = !0, e.rotation = !0, e.scale = !0, e.cycle = !0, e.localReference = !1, e;
    }

    return r(e, t), i([s.ObservableComponent.field], e.prototype, "position", void 0), i([s.ObservableComponent.field], e.prototype, "rotation", void 0), i([s.ObservableComponent.field], e.prototype, "scale", void 0), i([s.ObservableComponent.field], e.prototype, "cycle", void 0), i([s.ObservableComponent.field], e.prototype, "selectedGizmo", void 0), i([s.ObservableComponent.field], e.prototype, "localReference", void 0), e = i([s.Component("engine.gizmos", a.CLASS_ID.GIZMOS)], e);
  }(s.ObservableComponent);

  e.Gizmos = u;
}, function (t, e, n) {
  "use strict";

  var _o6,
      r = this && this.__extends || (_o6 = function o(t, e) {
    return (_o6 = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (t, e) {
      t.__proto__ = e;
    } || function (t, e) {
      for (var n in e) {
        e.hasOwnProperty(n) && (t[n] = e[n]);
      }
    })(t, e);
  }, function (t, e) {
    function n() {
      this.constructor = t;
    }

    _o6(t, e), t.prototype = null === e ? Object.create(e) : (n.prototype = e.prototype, new n());
  }),
      i = this && this.__decorate || function (t, e, n, o) {
    var r,
        i = arguments.length,
        s = i < 3 ? e : null === o ? o = Object.getOwnPropertyDescriptor(e, n) : o;
    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) s = Reflect.decorate(t, e, n, o);else for (var a = t.length - 1; a >= 0; a--) {
      (r = t[a]) && (s = (i < 3 ? r(s) : i > 3 ? r(e, n, s) : r(e, n)) || s);
    }
    return i > 3 && s && Object.defineProperty(e, n, s), s;
  };

  Object.defineProperty(e, "__esModule", {
    value: !0
  });

  var s = n(0),
      a = n(5),
      p = n(6),
      u = function (t) {
    function e(e) {
      var n = t.call(this) || this;
      return n.name = null, n.visible = !0, n.opacity = 1, n.hAlign = "center", n.vAlign = "center", n.width = "100px", n.height = "50px", n.positionX = "0px", n.positionY = "0px", n.isPointerBlocker = !0, e && (n._parent = e, n.data.parentComponent = s.getComponentId(e)), n;
    }

    return r(e, t), Object.defineProperty(e.prototype, "parent", {
      get: function get() {
        return this._parent;
      },
      enumerable: !0,
      configurable: !0
    }), Object.defineProperty(e.prototype, "parentComponent", {
      get: function get() {
        return this.data.parentComponent;
      },
      enumerable: !0,
      configurable: !0
    }), i([s.ObservableComponent.field], e.prototype, "name", void 0), i([s.ObservableComponent.field], e.prototype, "visible", void 0), i([s.ObservableComponent.field], e.prototype, "opacity", void 0), i([s.ObservableComponent.field], e.prototype, "hAlign", void 0), i([s.ObservableComponent.field], e.prototype, "vAlign", void 0), i([s.ObservableComponent.uiValue], e.prototype, "width", void 0), i([s.ObservableComponent.uiValue], e.prototype, "height", void 0), i([s.ObservableComponent.uiValue], e.prototype, "positionX", void 0), i([s.ObservableComponent.uiValue], e.prototype, "positionY", void 0), i([s.ObservableComponent.field], e.prototype, "isPointerBlocker", void 0), e;
  }(s.ObservableComponent);

  e.UIShape = u;

  var h = function (t) {
    function e() {
      return t.call(this, null) || this;
    }

    return r(e, t), e = i([s.DisposableComponent("engine.shape", a.CLASS_ID.UI_FULLSCREEN_SHAPE)], e);
  }(u);

  e.UIFullScreen = h;

  var l = function (t) {
    function e() {
      return t.call(this, null) || this;
    }

    return r(e, t), e = i([s.DisposableComponent("engine.shape", a.CLASS_ID.UI_WORLD_SPACE_SHAPE)], e);
  }(u);

  e.UIWorldSpace = l;

  var c = function (t) {
    function e() {
      return t.call(this, null) || this;
    }

    return r(e, t), e = i([s.DisposableComponent("engine.shape", a.CLASS_ID.UI_SCREEN_SPACE_SHAPE)], e);
  }(u);

  e.UICanvas = c;

  var f,
      d = function (t) {
    function e() {
      var e = null !== t && t.apply(this, arguments) || this;
      return e.adaptWidth = !1, e.adaptHeight = !1, e.thickness = 0, e.color = p.Color4.Clear(), e.alignmentUsesSize = !0, e;
    }

    return r(e, t), i([s.ObservableComponent.field], e.prototype, "adaptWidth", void 0), i([s.ObservableComponent.field], e.prototype, "adaptHeight", void 0), i([s.ObservableComponent.field], e.prototype, "thickness", void 0), i([s.ObservableComponent.field], e.prototype, "color", void 0), i([s.ObservableComponent.field], e.prototype, "alignmentUsesSize", void 0), e = i([s.DisposableComponent("engine.shape", a.CLASS_ID.UI_CONTAINER_RECT)], e);
  }(u);

  e.UIContainerRect = d, function (t) {
    t[t.VERTICAL = 0] = "VERTICAL", t[t.HORIZONTAL = 1] = "HORIZONTAL";
  }(f = e.UIStackOrientation || (e.UIStackOrientation = {}));

  var y = function (t) {
    function e() {
      var e = null !== t && t.apply(this, arguments) || this;
      return e.adaptWidth = !0, e.adaptHeight = !0, e.color = p.Color4.Clear(), e.stackOrientation = f.VERTICAL, e.spacing = 0, e;
    }

    return r(e, t), i([s.ObservableComponent.field], e.prototype, "adaptWidth", void 0), i([s.ObservableComponent.field], e.prototype, "adaptHeight", void 0), i([s.ObservableComponent.field], e.prototype, "color", void 0), i([s.ObservableComponent.field], e.prototype, "stackOrientation", void 0), i([s.ObservableComponent.field], e.prototype, "spacing", void 0), e = i([s.DisposableComponent("engine.shape", a.CLASS_ID.UI_CONTAINER_STACK)], e);
  }(u);

  e.UIContainerStack = y;

  var v = function (t) {
    function e() {
      var e = null !== t && t.apply(this, arguments) || this;
      return e.fontSize = 10, e.fontWeight = "normal", e.thickness = 0, e.cornerRadius = 0, e.color = p.Color4.White(), e.background = p.Color4.White(), e.paddingTop = 0, e.paddingRight = 0, e.paddingBottom = 0, e.paddingLeft = 0, e.shadowBlur = 0, e.shadowOffsetX = 0, e.shadowOffsetY = 0, e.shadowColor = p.Color4.Black(), e.text = "button", e;
    }

    return r(e, t), i([s.ObservableComponent.field], e.prototype, "fontSize", void 0), i([s.ObservableComponent.field], e.prototype, "fontWeight", void 0), i([s.ObservableComponent.field], e.prototype, "thickness", void 0), i([s.ObservableComponent.field], e.prototype, "cornerRadius", void 0), i([s.ObservableComponent.field], e.prototype, "color", void 0), i([s.ObservableComponent.field], e.prototype, "background", void 0), i([s.ObservableComponent.field], e.prototype, "paddingTop", void 0), i([s.ObservableComponent.field], e.prototype, "paddingRight", void 0), i([s.ObservableComponent.field], e.prototype, "paddingBottom", void 0), i([s.ObservableComponent.field], e.prototype, "paddingLeft", void 0), i([s.ObservableComponent.field], e.prototype, "shadowBlur", void 0), i([s.ObservableComponent.field], e.prototype, "shadowOffsetX", void 0), i([s.ObservableComponent.field], e.prototype, "shadowOffsetY", void 0), i([s.ObservableComponent.field], e.prototype, "shadowColor", void 0), i([s.ObservableComponent.field], e.prototype, "text", void 0), e = i([s.DisposableComponent("engine.shape", a.CLASS_ID.UI_BUTTON_SHAPE)], e);
  }(u);

  e.UIButton = v;

  var m = function (t) {
    function e() {
      var e = null !== t && t.apply(this, arguments) || this;
      return e.outlineWidth = 0, e.outlineColor = p.Color4.White(), e.color = p.Color4.White(), e.fontSize = 10, e.fontAutoSize = !1, e.fontWeight = "normal", e.value = "", e.lineSpacing = 0, e.lineCount = 0, e.adaptWidth = !1, e.adaptHeight = !1, e.textWrapping = !1, e.shadowBlur = 0, e.shadowOffsetX = 0, e.shadowOffsetY = 0, e.shadowColor = p.Color4.Black(), e.hTextAlign = "left", e.vTextAlign = "bottom", e.paddingTop = 0, e.paddingRight = 0, e.paddingBottom = 0, e.paddingLeft = 0, e;
    }

    return r(e, t), i([s.ObservableComponent.field], e.prototype, "outlineWidth", void 0), i([s.ObservableComponent.field], e.prototype, "outlineColor", void 0), i([s.ObservableComponent.field], e.prototype, "color", void 0), i([s.ObservableComponent.field], e.prototype, "fontSize", void 0), i([s.ObservableComponent.field], e.prototype, "fontAutoSize", void 0), i([s.ObservableComponent.field], e.prototype, "fontWeight", void 0), i([s.ObservableComponent.field], e.prototype, "value", void 0), i([s.ObservableComponent.field], e.prototype, "lineSpacing", void 0), i([s.ObservableComponent.field], e.prototype, "lineCount", void 0), i([s.ObservableComponent.field], e.prototype, "adaptWidth", void 0), i([s.ObservableComponent.field], e.prototype, "adaptHeight", void 0), i([s.ObservableComponent.field], e.prototype, "textWrapping", void 0), i([s.ObservableComponent.field], e.prototype, "shadowBlur", void 0), i([s.ObservableComponent.field], e.prototype, "shadowOffsetX", void 0), i([s.ObservableComponent.field], e.prototype, "shadowOffsetY", void 0), i([s.ObservableComponent.field], e.prototype, "shadowColor", void 0), i([s.ObservableComponent.field], e.prototype, "hTextAlign", void 0), i([s.ObservableComponent.field], e.prototype, "vTextAlign", void 0), i([s.ObservableComponent.field], e.prototype, "paddingTop", void 0), i([s.ObservableComponent.field], e.prototype, "paddingRight", void 0), i([s.ObservableComponent.field], e.prototype, "paddingBottom", void 0), i([s.ObservableComponent.field], e.prototype, "paddingLeft", void 0), e = i([s.DisposableComponent("engine.shape", a.CLASS_ID.UI_TEXT_SHAPE)], e);
  }(u);

  e.UIText = m;

  var b = function (t) {
    function e() {
      var e = null !== t && t.apply(this, arguments) || this;
      return e.color = p.Color4.Clear(), e.thickness = 1, e.fontSize = 10, e.fontWeight = "normal", e.value = "", e.placeholderColor = p.Color4.White(), e.placeholder = "", e.margin = 10, e.maxWidth = 100, e.hTextAlign = "left", e.vTextAlign = "bottom", e.autoStretchWidth = !0, e.background = p.Color4.Black(), e.focusedBackground = p.Color4.Black(), e.shadowBlur = 0, e.shadowOffsetX = 0, e.shadowOffsetY = 0, e.shadowColor = p.Color4.White(), e.paddingTop = 0, e.paddingRight = 0, e.paddingBottom = 0, e.paddingLeft = 0, e.onTextSubmit = null, e.onChanged = null, e.onFocus = null, e.onBlur = null, e;
    }

    return r(e, t), i([s.ObservableComponent.field], e.prototype, "color", void 0), i([s.ObservableComponent.field], e.prototype, "thickness", void 0), i([s.ObservableComponent.field], e.prototype, "fontSize", void 0), i([s.ObservableComponent.field], e.prototype, "fontWeight", void 0), i([s.ObservableComponent.field], e.prototype, "value", void 0), i([s.ObservableComponent.field], e.prototype, "placeholderColor", void 0), i([s.ObservableComponent.field], e.prototype, "placeholder", void 0), i([s.ObservableComponent.field], e.prototype, "margin", void 0), i([s.ObservableComponent.field], e.prototype, "maxWidth", void 0), i([s.ObservableComponent.field], e.prototype, "hTextAlign", void 0), i([s.ObservableComponent.field], e.prototype, "vTextAlign", void 0), i([s.ObservableComponent.field], e.prototype, "autoStretchWidth", void 0), i([s.ObservableComponent.field], e.prototype, "background", void 0), i([s.ObservableComponent.field], e.prototype, "focusedBackground", void 0), i([s.ObservableComponent.field], e.prototype, "shadowBlur", void 0), i([s.ObservableComponent.field], e.prototype, "shadowOffsetX", void 0), i([s.ObservableComponent.field], e.prototype, "shadowOffsetY", void 0), i([s.ObservableComponent.field], e.prototype, "shadowColor", void 0), i([s.ObservableComponent.field], e.prototype, "paddingTop", void 0), i([s.ObservableComponent.field], e.prototype, "paddingRight", void 0), i([s.ObservableComponent.field], e.prototype, "paddingBottom", void 0), i([s.ObservableComponent.field], e.prototype, "paddingLeft", void 0), i([a.OnUUIDEvent.uuidEvent], e.prototype, "onTextSubmit", void 0), i([a.OnUUIDEvent.uuidEvent], e.prototype, "onChanged", void 0), i([a.OnUUIDEvent.uuidEvent], e.prototype, "onFocus", void 0), i([a.OnUUIDEvent.uuidEvent], e.prototype, "onBlur", void 0), e = i([s.DisposableComponent("engine.shape", a.CLASS_ID.UI_INPUT_TEXT_SHAPE)], e);
  }(u);

  e.UIInputText = b;

  var g = function (t) {
    function e(e, n) {
      var o = t.call(this, e) || this;
      return o.sourceLeft = 0, o.sourceTop = 0, o.sourceWidth = 1, o.sourceHeight = 1, o.paddingTop = 0, o.paddingRight = 0, o.paddingBottom = 0, o.paddingLeft = 0, o.sizeInPixels = !0, o.onClick = null, o.source = n, o;
    }

    return r(e, t), i([s.ObservableComponent.field], e.prototype, "sourceLeft", void 0), i([s.ObservableComponent.field], e.prototype, "sourceTop", void 0), i([s.ObservableComponent.field], e.prototype, "sourceWidth", void 0), i([s.ObservableComponent.field], e.prototype, "sourceHeight", void 0), i([s.ObservableComponent.component], e.prototype, "source", void 0), i([s.ObservableComponent.field], e.prototype, "paddingTop", void 0), i([s.ObservableComponent.field], e.prototype, "paddingRight", void 0), i([s.ObservableComponent.field], e.prototype, "paddingBottom", void 0), i([s.ObservableComponent.field], e.prototype, "paddingLeft", void 0), i([s.ObservableComponent.field], e.prototype, "sizeInPixels", void 0), i([a.OnUUIDEvent.uuidEvent], e.prototype, "onClick", void 0), e = i([s.DisposableComponent("engine.shape", a.CLASS_ID.UI_IMAGE_SHAPE)], e);
  }(u);

  e.UIImage = g;

  var _ = function (t) {
    function e() {
      var e = null !== t && t.apply(this, arguments) || this;
      return e.valueX = 0, e.valueY = 0, e.borderColor = p.Color4.White(), e.backgroundColor = p.Color4.Clear(), e.isHorizontal = !1, e.isVertical = !1, e.paddingTop = 0, e.paddingRight = 0, e.paddingBottom = 0, e.paddingLeft = 0, e.onChanged = null, e;
    }

    return r(e, t), i([s.ObservableComponent.field], e.prototype, "valueX", void 0), i([s.ObservableComponent.field], e.prototype, "valueY", void 0), i([s.ObservableComponent.field], e.prototype, "borderColor", void 0), i([s.ObservableComponent.field], e.prototype, "backgroundColor", void 0), i([s.ObservableComponent.field], e.prototype, "isHorizontal", void 0), i([s.ObservableComponent.field], e.prototype, "isVertical", void 0), i([s.ObservableComponent.field], e.prototype, "paddingTop", void 0), i([s.ObservableComponent.field], e.prototype, "paddingRight", void 0), i([s.ObservableComponent.field], e.prototype, "paddingBottom", void 0), i([s.ObservableComponent.field], e.prototype, "paddingLeft", void 0), i([a.OnUUIDEvent.uuidEvent], e.prototype, "onChanged", void 0), e = i([s.DisposableComponent("engine.shape", a.CLASS_ID.UI_SLIDER_SHAPE)], e);
  }(u);

  e.UIScrollRect = _;
}, function (t, e, n) {
  "use strict";

  var _o7,
      r = this && this.__extends || (_o7 = function o(t, e) {
    return (_o7 = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (t, e) {
      t.__proto__ = e;
    } || function (t, e) {
      for (var n in e) {
        e.hasOwnProperty(n) && (t[n] = e[n]);
      }
    })(t, e);
  }, function (t, e) {
    function n() {
      this.constructor = t;
    }

    _o7(t, e), t.prototype = null === e ? Object.create(e) : (n.prototype = e.prototype, new n());
  }),
      i = this && this.__decorate || function (t, e, n, o) {
    var r,
        i = arguments.length,
        s = i < 3 ? e : null === o ? o = Object.getOwnPropertyDescriptor(e, n) : o;
    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) s = Reflect.decorate(t, e, n, o);else for (var a = t.length - 1; a >= 0; a--) {
      (r = t[a]) && (s = (i < 3 ? r(s) : i > 3 ? r(e, n, s) : r(e, n)) || s);
    }
    return i > 3 && s && Object.defineProperty(e, n, s), s;
  };

  Object.defineProperty(e, "__esModule", {
    value: !0
  });

  var s = n(0),
      a = n(13),
      p = n(5),
      u = function (t) {
    function e(e) {
      var n = t.call(this, e) || this;
      return n.type = "onFocus", a.uuidEventSystem.handlerMap[n.uuid] = n, n;
    }

    return r(e, t), i([s.ObservableComponent.readonly], e.prototype, "type", void 0), e = i([s.Component("engine.onFocus", p.CLASS_ID.UUID_CALLBACK)], e);
  }(p.OnUUIDEvent);

  e.OnFocus = u;

  var h = function (t) {
    function e(e) {
      var n = t.call(this, e) || this;
      return n.type = "onTextSubmit", a.uuidEventSystem.handlerMap[n.uuid] = n, n;
    }

    return r(e, t), i([s.ObservableComponent.readonly], e.prototype, "type", void 0), e = i([s.Component("engine.onTextSubmit", p.CLASS_ID.UUID_CALLBACK)], e);
  }(p.OnUUIDEvent);

  e.OnTextSubmit = h;

  var l = function (t) {
    function e(e) {
      var n = t.call(this, e) || this;
      return n.type = "onBlur", a.uuidEventSystem.handlerMap[n.uuid] = n, n;
    }

    return r(e, t), i([s.ObservableComponent.readonly], e.prototype, "type", void 0), e = i([s.Component("engine.onBlur", p.CLASS_ID.UUID_CALLBACK)], e);
  }(p.OnUUIDEvent);

  e.OnBlur = l;

  var c = function (t) {
    function e(e) {
      var n = t.call(this, e) || this;
      return n.type = "onClick", a.uuidEventSystem.handlerMap[n.uuid] = n, n;
    }

    return r(e, t), i([s.ObservableComponent.readonly], e.prototype, "type", void 0), e = i([s.Component("engine.onClick", p.CLASS_ID.UUID_CALLBACK)], e);
  }(p.OnUUIDEvent);

  e.OnClick = c;

  var f = function (t) {
    function e(e) {
      var n = t.call(this, e) || this;
      return n.type = "onChange", a.uuidEventSystem.handlerMap[n.uuid] = n, n;
    }

    return r(e, t), i([s.ObservableComponent.readonly], e.prototype, "type", void 0), e = i([s.Component("engine.onChange", p.CLASS_ID.UUID_CALLBACK)], e);
  }(p.OnUUIDEvent);

  e.OnChanged = f;
}]));
// Builder generated code below
const scene = new Entity()
const transform = new Transform({
  position: new Vector3(0, 0, 0),
  rotation: new Quaternion(0, 0, 0, 1),
  scale: new Vector3(1, 1, 1)
})
scene.addComponentOrReplace(transform)
engine.addEntity(scene)

const floorBaseGrass_01 = new Entity()
floorBaseGrass_01.setParent(scene)
const gltfShape = new GLTFShape('models/FloorBaseGrass_01/FloorBaseGrass_01.glb')
floorBaseGrass_01.addComponentOrReplace(gltfShape)
const transform_2 = new Transform({
  position: new Vector3(8, 0, 8),
  rotation: new Quaternion(0, 0, 0, 1),
  scale: new Vector3(1, 1, 1)
})
floorBaseGrass_01.addComponentOrReplace(transform_2)
engine.addEntity(floorBaseGrass_01)

const grass_01 = new Entity()
grass_01.setParent(scene)
const gltfShape_2 = new GLTFShape('models/Grass_01/Grass_01.glb')
grass_01.addComponentOrReplace(gltfShape_2)
const transform_3 = new Transform({
  position: new Vector3(2.5, 0, 13.5),
  rotation: new Quaternion(0, 0, 0, 1),
  scale: new Vector3(1, 1, 1)
})
grass_01.addComponentOrReplace(transform_3)
engine.addEntity(grass_01)

const grass_02 = new Entity()
grass_02.setParent(scene)
const gltfShape_3 = new GLTFShape('models/Grass_02/Grass_02.glb')
grass_02.addComponentOrReplace(gltfShape_3)
const transform_4 = new Transform({
  position: new Vector3(14.5, 0, 9.5),
  rotation: new Quaternion(0, 0.9807852804032302, 0, 0.19509032201612825),
  scale: new Vector3(1, 1, 1)
})
grass_02.addComponentOrReplace(transform_4)
engine.addEntity(grass_02)

const grass_02_2 = new Entity()
grass_02_2.setParent(scene)
grass_02_2.addComponentOrReplace(gltfShape_3)
const transform_5 = new Transform({
  position: new Vector3(8, 0, 5.5),
  rotation: new Quaternion(0, 0.9807852804032302, 0, 0.19509032201612825),
  scale: new Vector3(1, 1, 1)
})
grass_02_2.addComponentOrReplace(transform_5)
engine.addEntity(grass_02_2)

const grass_02_3 = new Entity()
grass_02_3.setParent(scene)
grass_02_3.addComponentOrReplace(gltfShape_3)
const transform_6 = new Transform({
  position: new Vector3(9, 0, 11.5),
  rotation: new Quaternion(0, 0.773010453362737, 0, 0.6343932841636455),
  scale: new Vector3(1, 1, 1)
})
grass_02_3.addComponentOrReplace(transform_6)
engine.addEntity(grass_02_3)

const grass_03 = new Entity()
grass_03.setParent(scene)
const gltfShape_4 = new GLTFShape('models/Grass_03/Grass_03.glb')
grass_03.addComponentOrReplace(gltfShape_4)
const transform_7 = new Transform({
  position: new Vector3(13, 0, 4.5),
  rotation: new Quaternion(0, 0.9951847266721967, 0, -0.0980171403295605),
  scale: new Vector3(1, 1, 1)
})
grass_03.addComponentOrReplace(transform_7)
engine.addEntity(grass_03)

const grass_03_2 = new Entity()
grass_03_2.setParent(scene)
grass_03_2.addComponentOrReplace(gltfShape_4)
const transform_8 = new Transform({
  position: new Vector3(2.5, 0, 6),
  rotation: new Quaternion(0, -0.7071067811865477, 0, 0.7071067811865477),
  scale: new Vector3(1, 1, 1)
})
grass_03_2.addComponentOrReplace(transform_8)
engine.addEntity(grass_03_2)

const grass_03_3 = new Entity()
grass_03_3.setParent(scene)
grass_03_3.addComponentOrReplace(gltfShape_4)
const transform_9 = new Transform({
  position: new Vector3(5, 0, 12),
  rotation: new Quaternion(0, -0.7071067811865476, 0, 0.7071067811865475),
  scale: new Vector3(1, 1, 1)
})
grass_03_3.addComponentOrReplace(transform_9)
engine.addEntity(grass_03_3)

const junglePlant_02 = new Entity()
junglePlant_02.setParent(scene)
const gltfShape_5 = new GLTFShape('models/JunglePlant_02/JunglePlant_02.glb')
junglePlant_02.addComponentOrReplace(gltfShape_5)
const transform_10 = new Transform({
  position: new Vector3(10, 0, 8.5),
  rotation: new Quaternion(0, 0, 0, 1),
  scale: new Vector3(1, 1, 1)
})
junglePlant_02.addComponentOrReplace(transform_10)
engine.addEntity(junglePlant_02)

const rockSmall_01 = new Entity()
rockSmall_01.setParent(scene)
const gltfShape_6 = new GLTFShape('models/RockSmall_01/RockSmall_01.glb')
rockSmall_01.addComponentOrReplace(gltfShape_6)
const transform_11 = new Transform({
  position: new Vector3(4.5, 0, 3),
  rotation: new Quaternion(0, 0, 0, 1),
  scale: new Vector3(1, 1, 1)
})
rockSmall_01.addComponentOrReplace(transform_11)
engine.addEntity(rockSmall_01)

const log_03 = new Entity()
log_03.setParent(scene)
const gltfShape_7 = new GLTFShape('models/Log_03/Log_03.glb')
log_03.addComponentOrReplace(gltfShape_7)
const transform_12 = new Transform({
  position: new Vector3(6.5, 0, 8.5),
  rotation: new Quaternion(0, -0.9238795325112872, 0, 0.38268343236509006),
  scale: new Vector3(1, 1, 1)
})
log_03.addComponentOrReplace(transform_12)
engine.addEntity(log_03)

const mushroom_01 = new Entity()
mushroom_01.setParent(scene)
const gltfShape_8 = new GLTFShape('models/Mushroom_01/Mushroom_01.glb')
mushroom_01.addComponentOrReplace(gltfShape_8)
const transform_13 = new Transform({
  position: new Vector3(6.5, 0, 8),
  rotation: new Quaternion(0, 0, 0, 1),
  scale: new Vector3(1, 1, 1)
})
mushroom_01.addComponentOrReplace(transform_13)
engine.addEntity(mushroom_01)

const mushroom_02 = new Entity()
mushroom_02.setParent(scene)
const gltfShape_9 = new GLTFShape('models/Mushroom_02/Mushroom_02.glb')
mushroom_02.addComponentOrReplace(gltfShape_9)
const transform_14 = new Transform({
  position: new Vector3(4, 0, 9),
  rotation: new Quaternion(0, 0, 0, 1),
  scale: new Vector3(1, 1, 1)
})
mushroom_02.addComponentOrReplace(transform_14)
engine.addEntity(mushroom_02)

const plant_02 = new Entity()
plant_02.setParent(scene)
const gltfShape_10 = new GLTFShape('models/Plant_02/Plant_02.glb')
plant_02.addComponentOrReplace(gltfShape_10)
const transform_15 = new Transform({
  position: new Vector3(4.5, 0, 10.5),
  rotation: new Quaternion(0, 0, 0, 1),
  scale: new Vector3(1, 1, 1)
})
plant_02.addComponentOrReplace(transform_15)
engine.addEntity(plant_02)

const plant_03 = new Entity()
plant_03.setParent(scene)
const gltfShape_11 = new GLTFShape('models/Plant_03/Plant_03.glb')
plant_03.addComponentOrReplace(gltfShape_11)
const transform_16 = new Transform({
  position: new Vector3(13.5, 0, 3.5),
  rotation: new Quaternion(0, -0.6343932841636456, 0, 0.773010453362737),
  scale: new Vector3(1, 1, 1)
})
plant_03.addComponentOrReplace(transform_16)
engine.addEntity(plant_03)

const bush_01 = new Entity()
bush_01.setParent(scene)
const gltfShape_12 = new GLTFShape('models/Bush_01/Bush_01.glb')
bush_01.addComponentOrReplace(gltfShape_12)
const transform_17 = new Transform({
  position: new Vector3(12.5, 0, 12),
  rotation: new Quaternion(0, 0, 0, 1),
  scale: new Vector3(1, 1, 1)
})
bush_01.addComponentOrReplace(transform_17)
engine.addEntity(bush_01)

const bush_03 = new Entity()
bush_03.setParent(scene)
const gltfShape_13 = new GLTFShape('models/Bush_03/Bush_03.glb')
bush_03.addComponentOrReplace(gltfShape_13)
const transform_18 = new Transform({
  position: new Vector3(4, 0, 7),
  rotation: new Quaternion(0, -0.2902846772544624, 0, 0.9569403357322089),
  scale: new Vector3(1, 1, 1)
})
bush_03.addComponentOrReplace(transform_18)
engine.addEntity(bush_03)

const log_02 = new Entity()
log_02.setParent(scene)
const gltfShape_14 = new GLTFShape('models/Log_02/Log_02.glb')
log_02.addComponentOrReplace(gltfShape_14)
const transform_19 = new Transform({
  position: new Vector3(11, 0, 4),
  rotation: new Quaternion(0, 0.8819212643483549, 0, 0.4713967368259977),
  scale: new Vector3(1, 1, 1)
})
log_02.addComponentOrReplace(transform_19)
engine.addEntity(log_02)

const grass_01_2 = new Entity()
grass_01_2.setParent(scene)
grass_01_2.addComponentOrReplace(gltfShape_2)
const transform_20 = new Transform({
  position: new Vector3(10, 0, 2),
  rotation: new Quaternion(0, 0, 0, 1),
  scale: new Vector3(1, 1, 1)
})
grass_01_2.addComponentOrReplace(transform_20)
engine.addEntity(grass_01_2)

const grass_02_4 = new Entity()
grass_02_4.setParent(scene)
grass_02_4.addComponentOrReplace(gltfShape_3)
const transform_21 = new Transform({
  position: new Vector3(7.5, 0, 15),
  rotation: new Quaternion(0, 0, 0, 1),
  scale: new Vector3(1, 1, 1)
})
grass_02_4.addComponentOrReplace(transform_21)
engine.addEntity(grass_02_4)

const grass_01_3 = new Entity()
grass_01_3.setParent(scene)
grass_01_3.addComponentOrReplace(gltfShape_2)
const transform_22 = new Transform({
  position: new Vector3(1.5, 0, 1.5),
  rotation: new Quaternion(0, 0, 0, 1),
  scale: new Vector3(1, 1, 1)
})
grass_01_3.addComponentOrReplace(transform_22)
engine.addEntity(grass_01_3)
