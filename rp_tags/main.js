"use strict";
(self.webpackChunkgenshix_rp_site =
  self.webpackChunkgenshix_rp_site || []).push([
  [179],
  {
    21: () => {
      function Q(e) {
        return "function" == typeof e;
      }
      function lo(e) {
        const n = e((r) => {
          Error.call(r), (r.stack = new Error().stack);
        });
        return (
          (n.prototype = Object.create(Error.prototype)),
          (n.prototype.constructor = n),
          n
        );
      }
      const ji = lo(
        (e) =>
          function (n) {
            e(this),
              (this.message = n
                ? `${n.length} errors occurred during unsubscription:\n${n
                    .map((r, o) => `${o + 1}) ${r.toString()}`)
                    .join("\n  ")}`
                : ""),
              (this.name = "UnsubscriptionError"),
              (this.errors = n);
          }
      );
      function fo(e, t) {
        if (e) {
          const n = e.indexOf(t);
          0 <= n && e.splice(n, 1);
        }
      }
      class We {
        constructor(t) {
          (this.initialTeardown = t),
            (this.closed = !1),
            (this._parentage = null),
            (this._finalizers = null);
        }
        unsubscribe() {
          let t;
          if (!this.closed) {
            this.closed = !0;
            const { _parentage: n } = this;
            if (n)
              if (((this._parentage = null), Array.isArray(n)))
                for (const i of n) i.remove(this);
              else n.remove(this);
            const { initialTeardown: r } = this;
            if (Q(r))
              try {
                r();
              } catch (i) {
                t = i instanceof ji ? i.errors : [i];
              }
            const { _finalizers: o } = this;
            if (o) {
              this._finalizers = null;
              for (const i of o)
                try {
                  Ef(i);
                } catch (s) {
                  (t = t ?? []),
                    s instanceof ji ? (t = [...t, ...s.errors]) : t.push(s);
                }
            }
            if (t) throw new ji(t);
          }
        }
        add(t) {
          var n;
          if (t && t !== this)
            if (this.closed) Ef(t);
            else {
              if (t instanceof We) {
                if (t.closed || t._hasParent(this)) return;
                t._addParent(this);
              }
              (this._finalizers =
                null !== (n = this._finalizers) && void 0 !== n ? n : []).push(
                t
              );
            }
        }
        _hasParent(t) {
          const { _parentage: n } = this;
          return n === t || (Array.isArray(n) && n.includes(t));
        }
        _addParent(t) {
          const { _parentage: n } = this;
          this._parentage = Array.isArray(n) ? (n.push(t), n) : n ? [n, t] : t;
        }
        _removeParent(t) {
          const { _parentage: n } = this;
          n === t ? (this._parentage = null) : Array.isArray(n) && fo(n, t);
        }
        remove(t) {
          const { _finalizers: n } = this;
          n && fo(n, t), t instanceof We && t._removeParent(this);
        }
      }
      We.EMPTY = (() => {
        const e = new We();
        return (e.closed = !0), e;
      })();
      const wf = We.EMPTY;
      function Cf(e) {
        return (
          e instanceof We ||
          (e && "closed" in e && Q(e.remove) && Q(e.add) && Q(e.unsubscribe))
        );
      }
      function Ef(e) {
        Q(e) ? e() : e.unsubscribe();
      }
      const Mn = {
          onUnhandledError: null,
          onStoppedNotification: null,
          Promise: void 0,
          useDeprecatedSynchronousErrorHandling: !1,
          useDeprecatedNextContext: !1,
        },
        $i = {
          setTimeout(e, t, ...n) {
            const { delegate: r } = $i;
            return r?.setTimeout
              ? r.setTimeout(e, t, ...n)
              : setTimeout(e, t, ...n);
          },
          clearTimeout(e) {
            const { delegate: t } = $i;
            return (t?.clearTimeout || clearTimeout)(e);
          },
          delegate: void 0,
        };
      function _f(e) {
        $i.setTimeout(() => {
          const { onUnhandledError: t } = Mn;
          if (!t) throw e;
          t(e);
        });
      }
      function eu() {}
      const eE = tu("C", void 0, void 0);
      function tu(e, t, n) {
        return { kind: e, value: t, error: n };
      }
      let Tn = null;
      function Hi(e) {
        if (Mn.useDeprecatedSynchronousErrorHandling) {
          const t = !Tn;
          if ((t && (Tn = { errorThrown: !1, error: null }), e(), t)) {
            const { errorThrown: n, error: r } = Tn;
            if (((Tn = null), n)) throw r;
          }
        } else e();
      }
      class nu extends We {
        constructor(t) {
          super(),
            (this.isStopped = !1),
            t
              ? ((this.destination = t), Cf(t) && t.add(this))
              : (this.destination = aE);
        }
        static create(t, n, r) {
          return new ho(t, n, r);
        }
        next(t) {
          this.isStopped
            ? ou(
                (function nE(e) {
                  return tu("N", e, void 0);
                })(t),
                this
              )
            : this._next(t);
        }
        error(t) {
          this.isStopped
            ? ou(
                (function tE(e) {
                  return tu("E", void 0, e);
                })(t),
                this
              )
            : ((this.isStopped = !0), this._error(t));
        }
        complete() {
          this.isStopped
            ? ou(eE, this)
            : ((this.isStopped = !0), this._complete());
        }
        unsubscribe() {
          this.closed ||
            ((this.isStopped = !0),
            super.unsubscribe(),
            (this.destination = null));
        }
        _next(t) {
          this.destination.next(t);
        }
        _error(t) {
          try {
            this.destination.error(t);
          } finally {
            this.unsubscribe();
          }
        }
        _complete() {
          try {
            this.destination.complete();
          } finally {
            this.unsubscribe();
          }
        }
      }
      const oE = Function.prototype.bind;
      function ru(e, t) {
        return oE.call(e, t);
      }
      class iE {
        constructor(t) {
          this.partialObserver = t;
        }
        next(t) {
          const { partialObserver: n } = this;
          if (n.next)
            try {
              n.next(t);
            } catch (r) {
              Vi(r);
            }
        }
        error(t) {
          const { partialObserver: n } = this;
          if (n.error)
            try {
              n.error(t);
            } catch (r) {
              Vi(r);
            }
          else Vi(t);
        }
        complete() {
          const { partialObserver: t } = this;
          if (t.complete)
            try {
              t.complete();
            } catch (n) {
              Vi(n);
            }
        }
      }
      class ho extends nu {
        constructor(t, n, r) {
          let o;
          if ((super(), Q(t) || !t))
            o = {
              next: t ?? void 0,
              error: n ?? void 0,
              complete: r ?? void 0,
            };
          else {
            let i;
            this && Mn.useDeprecatedNextContext
              ? ((i = Object.create(t)),
                (i.unsubscribe = () => this.unsubscribe()),
                (o = {
                  next: t.next && ru(t.next, i),
                  error: t.error && ru(t.error, i),
                  complete: t.complete && ru(t.complete, i),
                }))
              : (o = t);
          }
          this.destination = new iE(o);
        }
      }
      function Vi(e) {
        Mn.useDeprecatedSynchronousErrorHandling
          ? (function rE(e) {
              Mn.useDeprecatedSynchronousErrorHandling &&
                Tn &&
                ((Tn.errorThrown = !0), (Tn.error = e));
            })(e)
          : _f(e);
      }
      function ou(e, t) {
        const { onStoppedNotification: n } = Mn;
        n && $i.setTimeout(() => n(e, t));
      }
      const aE = {
          closed: !0,
          next: eu,
          error: function sE(e) {
            throw e;
          },
          complete: eu,
        },
        iu =
          ("function" == typeof Symbol && Symbol.observable) || "@@observable";
      function an(e) {
        return e;
      }
      function If(e) {
        return 0 === e.length
          ? an
          : 1 === e.length
          ? e[0]
          : function (n) {
              return e.reduce((r, o) => o(r), n);
            };
      }
      let ae = (() => {
        class e {
          constructor(n) {
            n && (this._subscribe = n);
          }
          lift(n) {
            const r = new e();
            return (r.source = this), (r.operator = n), r;
          }
          subscribe(n, r, o) {
            const i = (function lE(e) {
              return (
                (e && e instanceof nu) ||
                ((function cE(e) {
                  return e && Q(e.next) && Q(e.error) && Q(e.complete);
                })(e) &&
                  Cf(e))
              );
            })(n)
              ? n
              : new ho(n, r, o);
            return (
              Hi(() => {
                const { operator: s, source: a } = this;
                i.add(
                  s
                    ? s.call(i, a)
                    : a
                    ? this._subscribe(i)
                    : this._trySubscribe(i)
                );
              }),
              i
            );
          }
          _trySubscribe(n) {
            try {
              return this._subscribe(n);
            } catch (r) {
              n.error(r);
            }
          }
          forEach(n, r) {
            return new (r = bf(r))((o, i) => {
              const s = new ho({
                next: (a) => {
                  try {
                    n(a);
                  } catch (u) {
                    i(u), s.unsubscribe();
                  }
                },
                error: i,
                complete: o,
              });
              this.subscribe(s);
            });
          }
          _subscribe(n) {
            var r;
            return null === (r = this.source) || void 0 === r
              ? void 0
              : r.subscribe(n);
          }
          [iu]() {
            return this;
          }
          pipe(...n) {
            return If(n)(this);
          }
          toPromise(n) {
            return new (n = bf(n))((r, o) => {
              let i;
              this.subscribe(
                (s) => (i = s),
                (s) => o(s),
                () => r(i)
              );
            });
          }
        }
        return (e.create = (t) => new e(t)), e;
      })();
      function bf(e) {
        var t;
        return null !== (t = e ?? Mn.Promise) && void 0 !== t ? t : Promise;
      }
      const dE = lo(
        (e) =>
          function () {
            e(this),
              (this.name = "ObjectUnsubscribedError"),
              (this.message = "object unsubscribed");
          }
      );
      let ft = (() => {
        class e extends ae {
          constructor() {
            super(),
              (this.closed = !1),
              (this.currentObservers = null),
              (this.observers = []),
              (this.isStopped = !1),
              (this.hasError = !1),
              (this.thrownError = null);
          }
          lift(n) {
            const r = new Sf(this, this);
            return (r.operator = n), r;
          }
          _throwIfClosed() {
            if (this.closed) throw new dE();
          }
          next(n) {
            Hi(() => {
              if ((this._throwIfClosed(), !this.isStopped)) {
                this.currentObservers ||
                  (this.currentObservers = Array.from(this.observers));
                for (const r of this.currentObservers) r.next(n);
              }
            });
          }
          error(n) {
            Hi(() => {
              if ((this._throwIfClosed(), !this.isStopped)) {
                (this.hasError = this.isStopped = !0), (this.thrownError = n);
                const { observers: r } = this;
                for (; r.length; ) r.shift().error(n);
              }
            });
          }
          complete() {
            Hi(() => {
              if ((this._throwIfClosed(), !this.isStopped)) {
                this.isStopped = !0;
                const { observers: n } = this;
                for (; n.length; ) n.shift().complete();
              }
            });
          }
          unsubscribe() {
            (this.isStopped = this.closed = !0),
              (this.observers = this.currentObservers = null);
          }
          get observed() {
            var n;
            return (
              (null === (n = this.observers) || void 0 === n
                ? void 0
                : n.length) > 0
            );
          }
          _trySubscribe(n) {
            return this._throwIfClosed(), super._trySubscribe(n);
          }
          _subscribe(n) {
            return (
              this._throwIfClosed(),
              this._checkFinalizedStatuses(n),
              this._innerSubscribe(n)
            );
          }
          _innerSubscribe(n) {
            const { hasError: r, isStopped: o, observers: i } = this;
            return r || o
              ? wf
              : ((this.currentObservers = null),
                i.push(n),
                new We(() => {
                  (this.currentObservers = null), fo(i, n);
                }));
          }
          _checkFinalizedStatuses(n) {
            const { hasError: r, thrownError: o, isStopped: i } = this;
            r ? n.error(o) : i && n.complete();
          }
          asObservable() {
            const n = new ae();
            return (n.source = this), n;
          }
        }
        return (e.create = (t, n) => new Sf(t, n)), e;
      })();
      class Sf extends ft {
        constructor(t, n) {
          super(), (this.destination = t), (this.source = n);
        }
        next(t) {
          var n, r;
          null ===
            (r =
              null === (n = this.destination) || void 0 === n
                ? void 0
                : n.next) ||
            void 0 === r ||
            r.call(n, t);
        }
        error(t) {
          var n, r;
          null ===
            (r =
              null === (n = this.destination) || void 0 === n
                ? void 0
                : n.error) ||
            void 0 === r ||
            r.call(n, t);
        }
        complete() {
          var t, n;
          null ===
            (n =
              null === (t = this.destination) || void 0 === t
                ? void 0
                : t.complete) ||
            void 0 === n ||
            n.call(t);
        }
        _subscribe(t) {
          var n, r;
          return null !==
            (r =
              null === (n = this.source) || void 0 === n
                ? void 0
                : n.subscribe(t)) && void 0 !== r
            ? r
            : wf;
        }
      }
      function Mf(e) {
        return Q(e?.lift);
      }
      function fe(e) {
        return (t) => {
          if (Mf(t))
            return t.lift(function (n) {
              try {
                return e(n, this);
              } catch (r) {
                this.error(r);
              }
            });
          throw new TypeError("Unable to lift unknown Observable type");
        };
      }
      function he(e, t, n, r, o) {
        return new fE(e, t, n, r, o);
      }
      class fE extends nu {
        constructor(t, n, r, o, i, s) {
          super(t),
            (this.onFinalize = i),
            (this.shouldUnsubscribe = s),
            (this._next = n
              ? function (a) {
                  try {
                    n(a);
                  } catch (u) {
                    t.error(u);
                  }
                }
              : super._next),
            (this._error = o
              ? function (a) {
                  try {
                    o(a);
                  } catch (u) {
                    t.error(u);
                  } finally {
                    this.unsubscribe();
                  }
                }
              : super._error),
            (this._complete = r
              ? function () {
                  try {
                    r();
                  } catch (a) {
                    t.error(a);
                  } finally {
                    this.unsubscribe();
                  }
                }
              : super._complete);
        }
        unsubscribe() {
          var t;
          if (!this.shouldUnsubscribe || this.shouldUnsubscribe()) {
            const { closed: n } = this;
            super.unsubscribe(),
              !n &&
                (null === (t = this.onFinalize) ||
                  void 0 === t ||
                  t.call(this));
          }
        }
      }
      function U(e, t) {
        return fe((n, r) => {
          let o = 0;
          n.subscribe(
            he(r, (i) => {
              r.next(e.call(t, i, o++));
            })
          );
        });
      }
      function un(e) {
        return this instanceof un ? ((this.v = e), this) : new un(e);
      }
      function Nf(e) {
        if (!Symbol.asyncIterator)
          throw new TypeError("Symbol.asyncIterator is not defined.");
        var n,
          t = e[Symbol.asyncIterator];
        return t
          ? t.call(e)
          : ((e = (function cu(e) {
              var t = "function" == typeof Symbol && Symbol.iterator,
                n = t && e[t],
                r = 0;
              if (n) return n.call(e);
              if (e && "number" == typeof e.length)
                return {
                  next: function () {
                    return (
                      e && r >= e.length && (e = void 0),
                      { value: e && e[r++], done: !e }
                    );
                  },
                };
              throw new TypeError(
                t
                  ? "Object is not iterable."
                  : "Symbol.iterator is not defined."
              );
            })(e)),
            (n = {}),
            r("next"),
            r("throw"),
            r("return"),
            (n[Symbol.asyncIterator] = function () {
              return this;
            }),
            n);
        function r(i) {
          n[i] =
            e[i] &&
            function (s) {
              return new Promise(function (a, u) {
                !(function o(i, s, a, u) {
                  Promise.resolve(u).then(function (c) {
                    i({ value: c, done: a });
                  }, s);
                })(a, u, (s = e[i](s)).done, s.value);
              });
            };
        }
      }
      "function" == typeof SuppressedError && SuppressedError;
      const xf = (e) =>
        e && "number" == typeof e.length && "function" != typeof e;
      function Of(e) {
        return Q(e?.then);
      }
      function Pf(e) {
        return Q(e[iu]);
      }
      function Ff(e) {
        return Symbol.asyncIterator && Q(e?.[Symbol.asyncIterator]);
      }
      function kf(e) {
        return new TypeError(
          `You provided ${
            null !== e && "object" == typeof e ? "an invalid object" : `'${e}'`
          } where a stream was expected. You can provide an Observable, Promise, ReadableStream, Array, AsyncIterable, or Iterable.`
        );
      }
      const Lf = (function PE() {
        return "function" == typeof Symbol && Symbol.iterator
          ? Symbol.iterator
          : "@@iterator";
      })();
      function jf(e) {
        return Q(e?.[Lf]);
      }
      function $f(e) {
        return (function Rf(e, t, n) {
          if (!Symbol.asyncIterator)
            throw new TypeError("Symbol.asyncIterator is not defined.");
          var o,
            r = n.apply(e, t || []),
            i = [];
          return (
            (o = {}),
            s("next"),
            s("throw"),
            s("return"),
            (o[Symbol.asyncIterator] = function () {
              return this;
            }),
            o
          );
          function s(f) {
            r[f] &&
              (o[f] = function (h) {
                return new Promise(function (p, g) {
                  i.push([f, h, p, g]) > 1 || a(f, h);
                });
              });
          }
          function a(f, h) {
            try {
              !(function u(f) {
                f.value instanceof un
                  ? Promise.resolve(f.value.v).then(c, l)
                  : d(i[0][2], f);
              })(r[f](h));
            } catch (p) {
              d(i[0][3], p);
            }
          }
          function c(f) {
            a("next", f);
          }
          function l(f) {
            a("throw", f);
          }
          function d(f, h) {
            f(h), i.shift(), i.length && a(i[0][0], i[0][1]);
          }
        })(this, arguments, function* () {
          const n = e.getReader();
          try {
            for (;;) {
              const { value: r, done: o } = yield un(n.read());
              if (o) return yield un(void 0);
              yield yield un(r);
            }
          } finally {
            n.releaseLock();
          }
        });
      }
      function Hf(e) {
        return Q(e?.getReader);
      }
      function nt(e) {
        if (e instanceof ae) return e;
        if (null != e) {
          if (Pf(e))
            return (function FE(e) {
              return new ae((t) => {
                const n = e[iu]();
                if (Q(n.subscribe)) return n.subscribe(t);
                throw new TypeError(
                  "Provided object does not correctly implement Symbol.observable"
                );
              });
            })(e);
          if (xf(e))
            return (function kE(e) {
              return new ae((t) => {
                for (let n = 0; n < e.length && !t.closed; n++) t.next(e[n]);
                t.complete();
              });
            })(e);
          if (Of(e))
            return (function LE(e) {
              return new ae((t) => {
                e.then(
                  (n) => {
                    t.closed || (t.next(n), t.complete());
                  },
                  (n) => t.error(n)
                ).then(null, _f);
              });
            })(e);
          if (Ff(e)) return Vf(e);
          if (jf(e))
            return (function jE(e) {
              return new ae((t) => {
                for (const n of e) if ((t.next(n), t.closed)) return;
                t.complete();
              });
            })(e);
          if (Hf(e))
            return (function $E(e) {
              return Vf($f(e));
            })(e);
        }
        throw kf(e);
      }
      function Vf(e) {
        return new ae((t) => {
          (function HE(e, t) {
            var n, r, o, i;
            return (function Tf(e, t, n, r) {
              return new (n || (n = Promise))(function (i, s) {
                function a(l) {
                  try {
                    c(r.next(l));
                  } catch (d) {
                    s(d);
                  }
                }
                function u(l) {
                  try {
                    c(r.throw(l));
                  } catch (d) {
                    s(d);
                  }
                }
                function c(l) {
                  l.done
                    ? i(l.value)
                    : (function o(i) {
                        return i instanceof n
                          ? i
                          : new n(function (s) {
                              s(i);
                            });
                      })(l.value).then(a, u);
                }
                c((r = r.apply(e, t || [])).next());
              });
            })(this, void 0, void 0, function* () {
              try {
                for (n = Nf(e); !(r = yield n.next()).done; )
                  if ((t.next(r.value), t.closed)) return;
              } catch (s) {
                o = { error: s };
              } finally {
                try {
                  r && !r.done && (i = n.return) && (yield i.call(n));
                } finally {
                  if (o) throw o.error;
                }
              }
              t.complete();
            });
          })(e, t).catch((n) => t.error(n));
        });
      }
      function Ht(e, t, n, r = 0, o = !1) {
        const i = t.schedule(function () {
          n(), o ? e.add(this.schedule(null, r)) : this.unsubscribe();
        }, r);
        if ((e.add(i), !o)) return i;
      }
      function we(e, t, n = 1 / 0) {
        return Q(t)
          ? we((r, o) => U((i, s) => t(r, i, o, s))(nt(e(r, o))), n)
          : ("number" == typeof t && (n = t),
            fe((r, o) =>
              (function VE(e, t, n, r, o, i, s, a) {
                const u = [];
                let c = 0,
                  l = 0,
                  d = !1;
                const f = () => {
                    d && !u.length && !c && t.complete();
                  },
                  h = (g) => (c < r ? p(g) : u.push(g)),
                  p = (g) => {
                    i && t.next(g), c++;
                    let v = !1;
                    nt(n(g, l++)).subscribe(
                      he(
                        t,
                        (D) => {
                          o?.(D), i ? h(D) : t.next(D);
                        },
                        () => {
                          v = !0;
                        },
                        void 0,
                        () => {
                          if (v)
                            try {
                              for (c--; u.length && c < r; ) {
                                const D = u.shift();
                                s ? Ht(t, s, () => p(D)) : p(D);
                              }
                              f();
                            } catch (D) {
                              t.error(D);
                            }
                        }
                      )
                    );
                  };
                return (
                  e.subscribe(
                    he(t, h, () => {
                      (d = !0), f();
                    })
                  ),
                  () => {
                    a?.();
                  }
                );
              })(r, o, e, n)
            ));
      }
      function tr(e = 1 / 0) {
        return we(an, e);
      }
      const bt = new ae((e) => e.complete());
      function lu(e) {
        return e[e.length - 1];
      }
      function po(e) {
        return (function UE(e) {
          return e && Q(e.schedule);
        })(lu(e))
          ? e.pop()
          : void 0;
      }
      function Bf(e, t = 0) {
        return fe((n, r) => {
          n.subscribe(
            he(
              r,
              (o) => Ht(r, e, () => r.next(o), t),
              () => Ht(r, e, () => r.complete(), t),
              (o) => Ht(r, e, () => r.error(o), t)
            )
          );
        });
      }
      function Uf(e, t = 0) {
        return fe((n, r) => {
          r.add(e.schedule(() => n.subscribe(r), t));
        });
      }
      function zf(e, t) {
        if (!e) throw new Error("Iterable cannot be null");
        return new ae((n) => {
          Ht(n, t, () => {
            const r = e[Symbol.asyncIterator]();
            Ht(
              n,
              t,
              () => {
                r.next().then((o) => {
                  o.done ? n.complete() : n.next(o.value);
                });
              },
              0,
              !0
            );
          });
        });
      }
      function ve(e, t) {
        return t
          ? (function XE(e, t) {
              if (null != e) {
                if (Pf(e))
                  return (function qE(e, t) {
                    return nt(e).pipe(Uf(t), Bf(t));
                  })(e, t);
                if (xf(e))
                  return (function ZE(e, t) {
                    return new ae((n) => {
                      let r = 0;
                      return t.schedule(function () {
                        r === e.length
                          ? n.complete()
                          : (n.next(e[r++]), n.closed || this.schedule());
                      });
                    });
                  })(e, t);
                if (Of(e))
                  return (function WE(e, t) {
                    return nt(e).pipe(Uf(t), Bf(t));
                  })(e, t);
                if (Ff(e)) return zf(e, t);
                if (jf(e))
                  return (function YE(e, t) {
                    return new ae((n) => {
                      let r;
                      return (
                        Ht(n, t, () => {
                          (r = e[Lf]()),
                            Ht(
                              n,
                              t,
                              () => {
                                let o, i;
                                try {
                                  ({ value: o, done: i } = r.next());
                                } catch (s) {
                                  return void n.error(s);
                                }
                                i ? n.complete() : n.next(o);
                              },
                              0,
                              !0
                            );
                        }),
                        () => Q(r?.return) && r.return()
                      );
                    });
                  })(e, t);
                if (Hf(e))
                  return (function QE(e, t) {
                    return zf($f(e), t);
                  })(e, t);
              }
              throw kf(e);
            })(e, t)
          : nt(e);
      }
      class rt extends ft {
        constructor(t) {
          super(), (this._value = t);
        }
        get value() {
          return this.getValue();
        }
        _subscribe(t) {
          const n = super._subscribe(t);
          return !n.closed && t.next(this._value), n;
        }
        getValue() {
          const { hasError: t, thrownError: n, _value: r } = this;
          if (t) throw n;
          return this._throwIfClosed(), r;
        }
        next(t) {
          super.next((this._value = t));
        }
      }
      function A(...e) {
        return ve(e, po(e));
      }
      function Gf(e = {}) {
        const {
          connector: t = () => new ft(),
          resetOnError: n = !0,
          resetOnComplete: r = !0,
          resetOnRefCountZero: o = !0,
        } = e;
        return (i) => {
          let s,
            a,
            u,
            c = 0,
            l = !1,
            d = !1;
          const f = () => {
              a?.unsubscribe(), (a = void 0);
            },
            h = () => {
              f(), (s = u = void 0), (l = d = !1);
            },
            p = () => {
              const g = s;
              h(), g?.unsubscribe();
            };
          return fe((g, v) => {
            c++, !d && !l && f();
            const D = (u = u ?? t());
            v.add(() => {
              c--, 0 === c && !d && !l && (a = du(p, o));
            }),
              D.subscribe(v),
              !s &&
                c > 0 &&
                ((s = new ho({
                  next: (m) => D.next(m),
                  error: (m) => {
                    (d = !0), f(), (a = du(h, n, m)), D.error(m);
                  },
                  complete: () => {
                    (l = !0), f(), (a = du(h, r)), D.complete();
                  },
                })),
                nt(g).subscribe(s));
          })(i);
        };
      }
      function du(e, t, ...n) {
        if (!0 === t) return void e();
        if (!1 === t) return;
        const r = new ho({
          next: () => {
            r.unsubscribe(), e();
          },
        });
        return nt(t(...n)).subscribe(r);
      }
      function ht(e, t) {
        return fe((n, r) => {
          let o = null,
            i = 0,
            s = !1;
          const a = () => s && !o && r.complete();
          n.subscribe(
            he(
              r,
              (u) => {
                o?.unsubscribe();
                let c = 0;
                const l = i++;
                nt(e(u, l)).subscribe(
                  (o = he(
                    r,
                    (d) => r.next(t ? t(u, d, l, c++) : d),
                    () => {
                      (o = null), a();
                    }
                  ))
                );
              },
              () => {
                (s = !0), a();
              }
            )
          );
        });
      }
      function e_(e, t) {
        return e === t;
      }
      function Z(e) {
        for (let t in e) if (e[t] === Z) return t;
        throw Error("Could not find renamed property on target object.");
      }
      function pe(e) {
        if ("string" == typeof e) return e;
        if (Array.isArray(e)) return "[" + e.map(pe).join(", ") + "]";
        if (null == e) return "" + e;
        if (e.overriddenName) return `${e.overriddenName}`;
        if (e.name) return `${e.name}`;
        const t = e.toString();
        if (null == t) return "" + t;
        const n = t.indexOf("\n");
        return -1 === n ? t : t.substring(0, n);
      }
      function fu(e, t) {
        return null == e || "" === e
          ? null === t
            ? ""
            : t
          : null == t || "" === t
          ? e
          : e + " " + t;
      }
      const t_ = Z({ __forward_ref__: Z });
      function hu(e) {
        return (
          (e.__forward_ref__ = hu),
          (e.toString = function () {
            return pe(this());
          }),
          e
        );
      }
      function x(e) {
        return pu(e) ? e() : e;
      }
      function pu(e) {
        return (
          "function" == typeof e &&
          e.hasOwnProperty(t_) &&
          e.__forward_ref__ === hu
        );
      }
      function gu(e) {
        return e && !!e.ɵproviders;
      }
      class w extends Error {
        constructor(t, n) {
          super(
            (function Ui(e, t) {
              return `NG0${Math.abs(e)}${t ? ": " + t : ""}`;
            })(t, n)
          ),
            (this.code = t);
        }
      }
      function O(e) {
        return "string" == typeof e ? e : null == e ? "" : String(e);
      }
      function mu(e, t) {
        throw new w(-201, !1);
      }
      function ot(e, t) {
        null == e &&
          (function R(e, t, n, r) {
            throw new Error(
              `ASSERTION ERROR: ${e}` +
                (null == r ? "" : ` [Expected=> ${n} ${r} ${t} <=Actual]`)
            );
          })(t, e, null, "!=");
      }
      function S(e) {
        return {
          token: e.token,
          providedIn: e.providedIn || null,
          factory: e.factory,
          value: void 0,
        };
      }
      function cn(e) {
        return { providers: e.providers || [], imports: e.imports || [] };
      }
      function zi(e) {
        return Wf(e, qi) || Wf(e, Zf);
      }
      function Wf(e, t) {
        return e.hasOwnProperty(t) ? e[t] : null;
      }
      function Gi(e) {
        return e && (e.hasOwnProperty(vu) || e.hasOwnProperty(c_))
          ? e[vu]
          : null;
      }
      const qi = Z({ ɵprov: Z }),
        vu = Z({ ɵinj: Z }),
        Zf = Z({ ngInjectableDef: Z }),
        c_ = Z({ ngInjectorDef: Z });
      var $ = (function (e) {
        return (
          (e[(e.Default = 0)] = "Default"),
          (e[(e.Host = 1)] = "Host"),
          (e[(e.Self = 2)] = "Self"),
          (e[(e.SkipSelf = 4)] = "SkipSelf"),
          (e[(e.Optional = 8)] = "Optional"),
          e
        );
      })($ || {});
      let yu;
      function He(e) {
        const t = yu;
        return (yu = e), t;
      }
      function Qf(e, t, n) {
        const r = zi(e);
        return r && "root" == r.providedIn
          ? void 0 === r.value
            ? (r.value = r.factory())
            : r.value
          : n & $.Optional
          ? null
          : void 0 !== t
          ? t
          : void mu(pe(e));
      }
      const J = globalThis;
      class I {
        constructor(t, n) {
          (this._desc = t),
            (this.ngMetadataName = "InjectionToken"),
            (this.ɵprov = void 0),
            "number" == typeof n
              ? (this.__NG_ELEMENT_ID__ = n)
              : void 0 !== n &&
                (this.ɵprov = S({
                  token: this,
                  providedIn: n.providedIn || "root",
                  factory: n.factory,
                }));
        }
        get multi() {
          return this;
        }
        toString() {
          return `InjectionToken ${this._desc}`;
        }
      }
      const go = {},
        _u = "__NG_DI_FLAG__",
        Wi = "ngTempTokenPath",
        f_ = /\n/gm,
        Jf = "__source";
      let nr;
      function ln(e) {
        const t = nr;
        return (nr = e), t;
      }
      function g_(e, t = $.Default) {
        if (void 0 === nr) throw new w(-203, !1);
        return null === nr
          ? Qf(e, void 0, t)
          : nr.get(e, t & $.Optional ? null : void 0, t);
      }
      function b(e, t = $.Default) {
        return (
          (function Yf() {
            return yu;
          })() || g_
        )(x(e), t);
      }
      function _(e, t = $.Default) {
        return b(e, Zi(t));
      }
      function Zi(e) {
        return typeof e > "u" || "number" == typeof e
          ? e
          : 0 |
              (e.optional && 8) |
              (e.host && 1) |
              (e.self && 2) |
              (e.skipSelf && 4);
      }
      function Iu(e) {
        const t = [];
        for (let n = 0; n < e.length; n++) {
          const r = x(e[n]);
          if (Array.isArray(r)) {
            if (0 === r.length) throw new w(900, !1);
            let o,
              i = $.Default;
            for (let s = 0; s < r.length; s++) {
              const a = r[s],
                u = m_(a);
              "number" == typeof u
                ? -1 === u
                  ? (o = a.token)
                  : (i |= u)
                : (o = a);
            }
            t.push(b(o, i));
          } else t.push(b(r));
        }
        return t;
      }
      function mo(e, t) {
        return (e[_u] = t), (e.prototype[_u] = t), e;
      }
      function m_(e) {
        return e[_u];
      }
      function Vt(e) {
        return { toString: e }.toString();
      }
      var Yi = (function (e) {
          return (
            (e[(e.OnPush = 0)] = "OnPush"), (e[(e.Default = 1)] = "Default"), e
          );
        })(Yi || {}),
        pt = (function (e) {
          return (
            (e[(e.Emulated = 0)] = "Emulated"),
            (e[(e.None = 2)] = "None"),
            (e[(e.ShadowDom = 3)] = "ShadowDom"),
            e
          );
        })(pt || {});
      const St = {},
        z = [],
        Qi = Z({ ɵcmp: Z }),
        bu = Z({ ɵdir: Z }),
        Su = Z({ ɵpipe: Z }),
        eh = Z({ ɵmod: Z }),
        Bt = Z({ ɵfac: Z }),
        vo = Z({ __NG_ELEMENT_ID__: Z }),
        th = Z({ __NG_ENV_ID__: Z });
      function nh(e, t, n) {
        let r = e.length;
        for (;;) {
          const o = e.indexOf(t, n);
          if (-1 === o) return o;
          if (0 === o || e.charCodeAt(o - 1) <= 32) {
            const i = t.length;
            if (o + i === r || e.charCodeAt(o + i) <= 32) return o;
          }
          n = o + 1;
        }
      }
      function Mu(e, t, n) {
        let r = 0;
        for (; r < n.length; ) {
          const o = n[r];
          if ("number" == typeof o) {
            if (0 !== o) break;
            r++;
            const i = n[r++],
              s = n[r++],
              a = n[r++];
            e.setAttribute(t, s, a, i);
          } else {
            const i = o,
              s = n[++r];
            oh(i) ? e.setProperty(t, i, s) : e.setAttribute(t, i, s), r++;
          }
        }
        return r;
      }
      function rh(e) {
        return 3 === e || 4 === e || 6 === e;
      }
      function oh(e) {
        return 64 === e.charCodeAt(0);
      }
      function yo(e, t) {
        if (null !== t && 0 !== t.length)
          if (null === e || 0 === e.length) e = t.slice();
          else {
            let n = -1;
            for (let r = 0; r < t.length; r++) {
              const o = t[r];
              "number" == typeof o
                ? (n = o)
                : 0 === n ||
                  ih(e, n, o, null, -1 === n || 2 === n ? t[++r] : null);
            }
          }
        return e;
      }
      function ih(e, t, n, r, o) {
        let i = 0,
          s = e.length;
        if (-1 === t) s = -1;
        else
          for (; i < e.length; ) {
            const a = e[i++];
            if ("number" == typeof a) {
              if (a === t) {
                s = -1;
                break;
              }
              if (a > t) {
                s = i - 1;
                break;
              }
            }
          }
        for (; i < e.length; ) {
          const a = e[i];
          if ("number" == typeof a) break;
          if (a === n) {
            if (null === r) return void (null !== o && (e[i + 1] = o));
            if (r === e[i + 1]) return void (e[i + 2] = o);
          }
          i++, null !== r && i++, null !== o && i++;
        }
        -1 !== s && (e.splice(s, 0, t), (i = s + 1)),
          e.splice(i++, 0, n),
          null !== r && e.splice(i++, 0, r),
          null !== o && e.splice(i++, 0, o);
      }
      const sh = "ng-template";
      function D_(e, t, n) {
        let r = 0,
          o = !0;
        for (; r < e.length; ) {
          let i = e[r++];
          if ("string" == typeof i && o) {
            const s = e[r++];
            if (n && "class" === i && -1 !== nh(s.toLowerCase(), t, 0))
              return !0;
          } else {
            if (1 === i) {
              for (; r < e.length && "string" == typeof (i = e[r++]); )
                if (i.toLowerCase() === t) return !0;
              return !1;
            }
            "number" == typeof i && (o = !1);
          }
        }
        return !1;
      }
      function ah(e) {
        return 4 === e.type && e.value !== sh;
      }
      function w_(e, t, n) {
        return t === (4 !== e.type || n ? e.value : sh);
      }
      function C_(e, t, n) {
        let r = 4;
        const o = e.attrs || [],
          i = (function I_(e) {
            for (let t = 0; t < e.length; t++) if (rh(e[t])) return t;
            return e.length;
          })(o);
        let s = !1;
        for (let a = 0; a < t.length; a++) {
          const u = t[a];
          if ("number" != typeof u) {
            if (!s)
              if (4 & r) {
                if (
                  ((r = 2 | (1 & r)),
                  ("" !== u && !w_(e, u, n)) || ("" === u && 1 === t.length))
                ) {
                  if (gt(r)) return !1;
                  s = !0;
                }
              } else {
                const c = 8 & r ? u : t[++a];
                if (8 & r && null !== e.attrs) {
                  if (!D_(e.attrs, c, n)) {
                    if (gt(r)) return !1;
                    s = !0;
                  }
                  continue;
                }
                const d = E_(8 & r ? "class" : u, o, ah(e), n);
                if (-1 === d) {
                  if (gt(r)) return !1;
                  s = !0;
                  continue;
                }
                if ("" !== c) {
                  let f;
                  f = d > i ? "" : o[d + 1].toLowerCase();
                  const h = 8 & r ? f : null;
                  if ((h && -1 !== nh(h, c, 0)) || (2 & r && c !== f)) {
                    if (gt(r)) return !1;
                    s = !0;
                  }
                }
              }
          } else {
            if (!s && !gt(r) && !gt(u)) return !1;
            if (s && gt(u)) continue;
            (s = !1), (r = u | (1 & r));
          }
        }
        return gt(r) || s;
      }
      function gt(e) {
        return 0 == (1 & e);
      }
      function E_(e, t, n, r) {
        if (null === t) return -1;
        let o = 0;
        if (r || !n) {
          let i = !1;
          for (; o < t.length; ) {
            const s = t[o];
            if (s === e) return o;
            if (3 === s || 6 === s) i = !0;
            else {
              if (1 === s || 2 === s) {
                let a = t[++o];
                for (; "string" == typeof a; ) a = t[++o];
                continue;
              }
              if (4 === s) break;
              if (0 === s) {
                o += 4;
                continue;
              }
            }
            o += i ? 1 : 2;
          }
          return -1;
        }
        return (function b_(e, t) {
          let n = e.indexOf(4);
          if (n > -1)
            for (n++; n < e.length; ) {
              const r = e[n];
              if ("number" == typeof r) return -1;
              if (r === t) return n;
              n++;
            }
          return -1;
        })(t, e);
      }
      function uh(e, t, n = !1) {
        for (let r = 0; r < t.length; r++) if (C_(e, t[r], n)) return !0;
        return !1;
      }
      function ch(e, t) {
        return e ? ":not(" + t.trim() + ")" : t;
      }
      function M_(e) {
        let t = e[0],
          n = 1,
          r = 2,
          o = "",
          i = !1;
        for (; n < e.length; ) {
          let s = e[n];
          if ("string" == typeof s)
            if (2 & r) {
              const a = e[++n];
              o += "[" + s + (a.length > 0 ? '="' + a + '"' : "") + "]";
            } else 8 & r ? (o += "." + s) : 4 & r && (o += " " + s);
          else
            "" !== o && !gt(s) && ((t += ch(i, o)), (o = "")),
              (r = s),
              (i = i || !gt(r));
          n++;
        }
        return "" !== o && (t += ch(i, o)), t;
      }
      function Do(e) {
        return Vt(() => {
          const t = dh(e),
            n = {
              ...t,
              decls: e.decls,
              vars: e.vars,
              template: e.template,
              consts: e.consts || null,
              ngContentSelectors: e.ngContentSelectors,
              onPush: e.changeDetection === Yi.OnPush,
              directiveDefs: null,
              pipeDefs: null,
              dependencies: (t.standalone && e.dependencies) || null,
              getStandaloneInjector: null,
              signals: e.signals ?? !1,
              data: e.data || {},
              encapsulation: e.encapsulation || pt.Emulated,
              styles: e.styles || z,
              _: null,
              schemas: e.schemas || null,
              tView: null,
              id: "",
            };
          fh(n);
          const r = e.dependencies;
          return (
            (n.directiveDefs = Xi(r, !1)),
            (n.pipeDefs = Xi(r, !0)),
            (n.id = (function F_(e) {
              let t = 0;
              const n = [
                e.selectors,
                e.ngContentSelectors,
                e.hostVars,
                e.hostAttrs,
                e.consts,
                e.vars,
                e.decls,
                e.encapsulation,
                e.standalone,
                e.signals,
                e.exportAs,
                JSON.stringify(e.inputs),
                JSON.stringify(e.outputs),
                Object.getOwnPropertyNames(e.type.prototype),
                !!e.contentQueries,
                !!e.viewQuery,
              ].join("|");
              for (const o of n) t = (Math.imul(31, t) + o.charCodeAt(0)) << 0;
              return (t += 2147483648), "c" + t;
            })(n)),
            n
          );
        });
      }
      function N_(e) {
        return V(e) || Ce(e);
      }
      function x_(e) {
        return null !== e;
      }
      function Rn(e) {
        return Vt(() => ({
          type: e.type,
          bootstrap: e.bootstrap || z,
          declarations: e.declarations || z,
          imports: e.imports || z,
          exports: e.exports || z,
          transitiveCompileScopes: null,
          schemas: e.schemas || null,
          id: e.id || null,
        }));
      }
      function lh(e, t) {
        if (null == e) return St;
        const n = {};
        for (const r in e)
          if (e.hasOwnProperty(r)) {
            let o = e[r],
              i = o;
            Array.isArray(o) && ((i = o[1]), (o = o[0])),
              (n[o] = r),
              t && (t[o] = i);
          }
        return n;
      }
      function Re(e) {
        return Vt(() => {
          const t = dh(e);
          return fh(t), t;
        });
      }
      function V(e) {
        return e[Qi] || null;
      }
      function Ce(e) {
        return e[bu] || null;
      }
      function Ne(e) {
        return e[Su] || null;
      }
      function Ye(e, t) {
        const n = e[eh] || null;
        if (!n && !0 === t)
          throw new Error(`Type ${pe(e)} does not have '\u0275mod' property.`);
        return n;
      }
      function dh(e) {
        const t = {};
        return {
          type: e.type,
          providersResolver: null,
          factory: null,
          hostBindings: e.hostBindings || null,
          hostVars: e.hostVars || 0,
          hostAttrs: e.hostAttrs || null,
          contentQueries: e.contentQueries || null,
          declaredInputs: t,
          inputTransforms: null,
          inputConfig: e.inputs || St,
          exportAs: e.exportAs || null,
          standalone: !0 === e.standalone,
          signals: !0 === e.signals,
          selectors: e.selectors || z,
          viewQuery: e.viewQuery || null,
          features: e.features || null,
          setInput: null,
          findHostDirectiveDefs: null,
          hostDirectives: null,
          inputs: lh(e.inputs, t),
          outputs: lh(e.outputs),
        };
      }
      function fh(e) {
        e.features?.forEach((t) => t(e));
      }
      function Xi(e, t) {
        if (!e) return null;
        const n = t ? Ne : N_;
        return () =>
          ("function" == typeof e ? e() : e).map((r) => n(r)).filter(x_);
      }
      const ie = 0,
        C = 1,
        k = 2,
        re = 3,
        mt = 4,
        wo = 5,
        Se = 6,
        or = 7,
        ue = 8,
        dn = 9,
        ir = 10,
        P = 11,
        Co = 12,
        hh = 13,
        sr = 14,
        ce = 15,
        Eo = 16,
        ar = 17,
        Mt = 18,
        _o = 19,
        ph = 20,
        fn = 21,
        Ut = 22,
        Io = 23,
        bo = 24,
        H = 25,
        Tu = 1,
        gh = 2,
        Tt = 7,
        ur = 9,
        Ee = 11;
      function Be(e) {
        return Array.isArray(e) && "object" == typeof e[Tu];
      }
      function xe(e) {
        return Array.isArray(e) && !0 === e[Tu];
      }
      function Au(e) {
        return 0 != (4 & e.flags);
      }
      function Nn(e) {
        return e.componentOffset > -1;
      }
      function Ki(e) {
        return 1 == (1 & e.flags);
      }
      function vt(e) {
        return !!e.template;
      }
      function Ru(e) {
        return 0 != (512 & e[k]);
      }
      function xn(e, t) {
        return e.hasOwnProperty(Bt) ? e[Bt] : null;
      }
      let _e = null,
        es = !1;
      function it(e) {
        const t = _e;
        return (_e = e), t;
      }
      const yh = {
        version: 0,
        dirty: !1,
        producerNode: void 0,
        producerLastReadVersion: void 0,
        producerIndexOfThis: void 0,
        nextProducerIndex: 0,
        liveConsumerNode: void 0,
        liveConsumerIndexOfThis: void 0,
        consumerAllowSignalWrites: !1,
        consumerIsAlwaysLive: !1,
        producerMustRecompute: () => !1,
        producerRecomputeValue: () => {},
        consumerMarkedDirty: () => {},
      };
      function wh(e) {
        if (!Mo(e) || e.dirty) {
          if (!e.producerMustRecompute(e) && !_h(e)) return void (e.dirty = !1);
          e.producerRecomputeValue(e), (e.dirty = !1);
        }
      }
      function Eh(e) {
        (e.dirty = !0),
          (function Ch(e) {
            if (void 0 === e.liveConsumerNode) return;
            const t = es;
            es = !0;
            try {
              for (const n of e.liveConsumerNode) n.dirty || Eh(n);
            } finally {
              es = t;
            }
          })(e),
          e.consumerMarkedDirty?.(e);
      }
      function xu(e) {
        return e && (e.nextProducerIndex = 0), it(e);
      }
      function Ou(e, t) {
        if (
          (it(t),
          e &&
            void 0 !== e.producerNode &&
            void 0 !== e.producerIndexOfThis &&
            void 0 !== e.producerLastReadVersion)
        ) {
          if (Mo(e))
            for (let n = e.nextProducerIndex; n < e.producerNode.length; n++)
              ts(e.producerNode[n], e.producerIndexOfThis[n]);
          for (; e.producerNode.length > e.nextProducerIndex; )
            e.producerNode.pop(),
              e.producerLastReadVersion.pop(),
              e.producerIndexOfThis.pop();
        }
      }
      function _h(e) {
        cr(e);
        for (let t = 0; t < e.producerNode.length; t++) {
          const n = e.producerNode[t],
            r = e.producerLastReadVersion[t];
          if (r !== n.version || (wh(n), r !== n.version)) return !0;
        }
        return !1;
      }
      function Ih(e) {
        if ((cr(e), Mo(e)))
          for (let t = 0; t < e.producerNode.length; t++)
            ts(e.producerNode[t], e.producerIndexOfThis[t]);
        (e.producerNode.length =
          e.producerLastReadVersion.length =
          e.producerIndexOfThis.length =
            0),
          e.liveConsumerNode &&
            (e.liveConsumerNode.length = e.liveConsumerIndexOfThis.length = 0);
      }
      function ts(e, t) {
        if (
          ((function Sh(e) {
            (e.liveConsumerNode ??= []), (e.liveConsumerIndexOfThis ??= []);
          })(e),
          cr(e),
          1 === e.liveConsumerNode.length)
        )
          for (let r = 0; r < e.producerNode.length; r++)
            ts(e.producerNode[r], e.producerIndexOfThis[r]);
        const n = e.liveConsumerNode.length - 1;
        if (
          ((e.liveConsumerNode[t] = e.liveConsumerNode[n]),
          (e.liveConsumerIndexOfThis[t] = e.liveConsumerIndexOfThis[n]),
          e.liveConsumerNode.length--,
          e.liveConsumerIndexOfThis.length--,
          t < e.liveConsumerNode.length)
        ) {
          const r = e.liveConsumerIndexOfThis[t],
            o = e.liveConsumerNode[t];
          cr(o), (o.producerIndexOfThis[r] = t);
        }
      }
      function Mo(e) {
        return e.consumerIsAlwaysLive || (e?.liveConsumerNode?.length ?? 0) > 0;
      }
      function cr(e) {
        (e.producerNode ??= []),
          (e.producerIndexOfThis ??= []),
          (e.producerLastReadVersion ??= []);
      }
      let Mh = null;
      const Nh = () => {},
        Z_ = (() => ({
          ...yh,
          consumerIsAlwaysLive: !0,
          consumerAllowSignalWrites: !1,
          consumerMarkedDirty: (e) => {
            e.schedule(e.ref);
          },
          hasRun: !1,
          cleanupFn: Nh,
        }))();
      class Y_ {
        constructor(t, n, r) {
          (this.previousValue = t),
            (this.currentValue = n),
            (this.firstChange = r);
        }
        isFirstChange() {
          return this.firstChange;
        }
      }
      function On() {
        return xh;
      }
      function xh(e) {
        return e.type.prototype.ngOnChanges && (e.setInput = X_), Q_;
      }
      function Q_() {
        const e = Ph(this),
          t = e?.current;
        if (t) {
          const n = e.previous;
          if (n === St) e.previous = t;
          else for (let r in t) n[r] = t[r];
          (e.current = null), this.ngOnChanges(t);
        }
      }
      function X_(e, t, n, r) {
        const o = this.declaredInputs[n],
          i =
            Ph(e) ||
            (function J_(e, t) {
              return (e[Oh] = t);
            })(e, { previous: St, current: null }),
          s = i.current || (i.current = {}),
          a = i.previous,
          u = a[o];
        (s[o] = new Y_(u && u.currentValue, t, a === St)), (e[r] = t);
      }
      On.ngInherit = !0;
      const Oh = "__ngSimpleChanges__";
      function Ph(e) {
        return e[Oh] || null;
      }
      const At = function (e, t, n) {};
      function K(e) {
        for (; Array.isArray(e); ) e = e[ie];
        return e;
      }
      function Ue(e, t) {
        return K(t[e.index]);
      }
      function Lh(e, t) {
        return e.data[t];
      }
      function Qe(e, t) {
        const n = t[e];
        return Be(n) ? n : n[ie];
      }
      function pn(e, t) {
        return null == t ? null : e[t];
      }
      function jh(e) {
        e[ar] = 0;
      }
      function oI(e) {
        1024 & e[k] || ((e[k] |= 1024), Hh(e, 1));
      }
      function $h(e) {
        1024 & e[k] && ((e[k] &= -1025), Hh(e, -1));
      }
      function Hh(e, t) {
        let n = e[re];
        if (null === n) return;
        n[wo] += t;
        let r = n;
        for (
          n = n[re];
          null !== n && ((1 === t && 1 === r[wo]) || (-1 === t && 0 === r[wo]));

        )
          (n[wo] += t), (r = n), (n = n[re]);
      }
      const N = {
        lFrame: Xh(null),
        bindingsEnabled: !0,
        skipHydrationRootTNode: null,
      };
      function Uh() {
        return N.bindingsEnabled;
      }
      function y() {
        return N.lFrame.lView;
      }
      function B() {
        return N.lFrame.tView;
      }
      function To(e) {
        return (N.lFrame.contextLView = e), e[ue];
      }
      function Ao(e) {
        return (N.lFrame.contextLView = null), e;
      }
      function Ie() {
        let e = zh();
        for (; null !== e && 64 === e.type; ) e = e.parent;
        return e;
      }
      function zh() {
        return N.lFrame.currentTNode;
      }
      function Rt(e, t) {
        const n = N.lFrame;
        (n.currentTNode = e), (n.isParent = t);
      }
      function ju() {
        return N.lFrame.isParent;
      }
      function fr() {
        return N.lFrame.bindingIndex++;
      }
      function mI(e, t) {
        const n = N.lFrame;
        (n.bindingIndex = n.bindingRootIndex = e), Hu(t);
      }
      function Hu(e) {
        N.lFrame.currentDirectiveIndex = e;
      }
      function Bu(e) {
        N.lFrame.currentQueryIndex = e;
      }
      function yI(e) {
        const t = e[C];
        return 2 === t.type ? t.declTNode : 1 === t.type ? e[Se] : null;
      }
      function Yh(e, t, n) {
        if (n & $.SkipSelf) {
          let o = t,
            i = e;
          for (
            ;
            !((o = o.parent),
            null !== o ||
              n & $.Host ||
              ((o = yI(i)), null === o || ((i = i[sr]), 10 & o.type)));

          );
          if (null === o) return !1;
          (t = o), (e = i);
        }
        const r = (N.lFrame = Qh());
        return (r.currentTNode = t), (r.lView = e), !0;
      }
      function Uu(e) {
        const t = Qh(),
          n = e[C];
        (N.lFrame = t),
          (t.currentTNode = n.firstChild),
          (t.lView = e),
          (t.tView = n),
          (t.contextLView = e),
          (t.bindingIndex = n.bindingStartIndex),
          (t.inI18n = !1);
      }
      function Qh() {
        const e = N.lFrame,
          t = null === e ? null : e.child;
        return null === t ? Xh(e) : t;
      }
      function Xh(e) {
        const t = {
          currentTNode: null,
          isParent: !0,
          lView: null,
          tView: null,
          selectedIndex: -1,
          contextLView: null,
          elementDepthCount: 0,
          currentNamespace: null,
          currentDirectiveIndex: -1,
          bindingRootIndex: -1,
          bindingIndex: -1,
          currentQueryIndex: 0,
          parent: e,
          child: null,
          inI18n: !1,
        };
        return null !== e && (e.child = t), t;
      }
      function Jh() {
        const e = N.lFrame;
        return (
          (N.lFrame = e.parent), (e.currentTNode = null), (e.lView = null), e
        );
      }
      const Kh = Jh;
      function zu() {
        const e = Jh();
        (e.isParent = !0),
          (e.tView = null),
          (e.selectedIndex = -1),
          (e.contextLView = null),
          (e.elementDepthCount = 0),
          (e.currentDirectiveIndex = -1),
          (e.currentNamespace = null),
          (e.bindingRootIndex = -1),
          (e.bindingIndex = -1),
          (e.currentQueryIndex = 0);
      }
      function Pe() {
        return N.lFrame.selectedIndex;
      }
      function Pn(e) {
        N.lFrame.selectedIndex = e;
      }
      function oe() {
        const e = N.lFrame;
        return Lh(e.tView, e.selectedIndex);
      }
      let tp = !0;
      function rs() {
        return tp;
      }
      function gn(e) {
        tp = e;
      }
      function os(e, t) {
        for (let n = t.directiveStart, r = t.directiveEnd; n < r; n++) {
          const i = e.data[n].type.prototype,
            {
              ngAfterContentInit: s,
              ngAfterContentChecked: a,
              ngAfterViewInit: u,
              ngAfterViewChecked: c,
              ngOnDestroy: l,
            } = i;
          s && (e.contentHooks ??= []).push(-n, s),
            a &&
              ((e.contentHooks ??= []).push(n, a),
              (e.contentCheckHooks ??= []).push(n, a)),
            u && (e.viewHooks ??= []).push(-n, u),
            c &&
              ((e.viewHooks ??= []).push(n, c),
              (e.viewCheckHooks ??= []).push(n, c)),
            null != l && (e.destroyHooks ??= []).push(n, l);
        }
      }
      function is(e, t, n) {
        np(e, t, 3, n);
      }
      function ss(e, t, n, r) {
        (3 & e[k]) === n && np(e, t, n, r);
      }
      function Gu(e, t) {
        let n = e[k];
        (3 & n) === t && ((n &= 8191), (n += 1), (e[k] = n));
      }
      function np(e, t, n, r) {
        const i = r ?? -1,
          s = t.length - 1;
        let a = 0;
        for (let u = void 0 !== r ? 65535 & e[ar] : 0; u < s; u++)
          if ("number" == typeof t[u + 1]) {
            if (((a = t[u]), null != r && a >= r)) break;
          } else
            t[u] < 0 && (e[ar] += 65536),
              (a < i || -1 == i) &&
                (SI(e, n, t, u), (e[ar] = (4294901760 & e[ar]) + u + 2)),
              u++;
      }
      function rp(e, t) {
        At(4, e, t);
        const n = it(null);
        try {
          t.call(e);
        } finally {
          it(n), At(5, e, t);
        }
      }
      function SI(e, t, n, r) {
        const o = n[r] < 0,
          i = n[r + 1],
          a = e[o ? -n[r] : n[r]];
        o
          ? e[k] >> 13 < e[ar] >> 16 &&
            (3 & e[k]) === t &&
            ((e[k] += 8192), rp(a, i))
          : rp(a, i);
      }
      const hr = -1;
      class No {
        constructor(t, n, r) {
          (this.factory = t),
            (this.resolving = !1),
            (this.canSeeViewProviders = n),
            (this.injectImpl = r);
        }
      }
      function Wu(e) {
        return e !== hr;
      }
      function xo(e) {
        return 32767 & e;
      }
      function Oo(e, t) {
        let n = (function RI(e) {
            return e >> 16;
          })(e),
          r = t;
        for (; n > 0; ) (r = r[sr]), n--;
        return r;
      }
      let Zu = !0;
      function as(e) {
        const t = Zu;
        return (Zu = e), t;
      }
      const op = 255,
        ip = 5;
      let NI = 0;
      const Nt = {};
      function us(e, t) {
        const n = sp(e, t);
        if (-1 !== n) return n;
        const r = t[C];
        r.firstCreatePass &&
          ((e.injectorIndex = t.length),
          Yu(r.data, e),
          Yu(t, null),
          Yu(r.blueprint, null));
        const o = cs(e, t),
          i = e.injectorIndex;
        if (Wu(o)) {
          const s = xo(o),
            a = Oo(o, t),
            u = a[C].data;
          for (let c = 0; c < 8; c++) t[i + c] = a[s + c] | u[s + c];
        }
        return (t[i + 8] = o), i;
      }
      function Yu(e, t) {
        e.push(0, 0, 0, 0, 0, 0, 0, 0, t);
      }
      function sp(e, t) {
        return -1 === e.injectorIndex ||
          (e.parent && e.parent.injectorIndex === e.injectorIndex) ||
          null === t[e.injectorIndex + 8]
          ? -1
          : e.injectorIndex;
      }
      function cs(e, t) {
        if (e.parent && -1 !== e.parent.injectorIndex)
          return e.parent.injectorIndex;
        let n = 0,
          r = null,
          o = t;
        for (; null !== o; ) {
          if (((r = pp(o)), null === r)) return hr;
          if ((n++, (o = o[sr]), -1 !== r.injectorIndex))
            return r.injectorIndex | (n << 16);
        }
        return hr;
      }
      function Qu(e, t, n) {
        !(function xI(e, t, n) {
          let r;
          "string" == typeof n
            ? (r = n.charCodeAt(0) || 0)
            : n.hasOwnProperty(vo) && (r = n[vo]),
            null == r && (r = n[vo] = NI++);
          const o = r & op;
          t.data[e + (o >> ip)] |= 1 << o;
        })(e, t, n);
      }
      function ap(e, t, n) {
        if (n & $.Optional || void 0 !== e) return e;
        mu();
      }
      function up(e, t, n, r) {
        if (
          (n & $.Optional && void 0 === r && (r = null),
          !(n & ($.Self | $.Host)))
        ) {
          const o = e[dn],
            i = He(void 0);
          try {
            return o ? o.get(t, r, n & $.Optional) : Qf(t, r, n & $.Optional);
          } finally {
            He(i);
          }
        }
        return ap(r, 0, n);
      }
      function cp(e, t, n, r = $.Default, o) {
        if (null !== e) {
          if (2048 & t[k] && !(r & $.Self)) {
            const s = (function jI(e, t, n, r, o) {
              let i = e,
                s = t;
              for (
                ;
                null !== i && null !== s && 2048 & s[k] && !(512 & s[k]);

              ) {
                const a = lp(i, s, n, r | $.Self, Nt);
                if (a !== Nt) return a;
                let u = i.parent;
                if (!u) {
                  const c = s[ph];
                  if (c) {
                    const l = c.get(n, Nt, r);
                    if (l !== Nt) return l;
                  }
                  (u = pp(s)), (s = s[sr]);
                }
                i = u;
              }
              return o;
            })(e, t, n, r, Nt);
            if (s !== Nt) return s;
          }
          const i = lp(e, t, n, r, Nt);
          if (i !== Nt) return i;
        }
        return up(t, n, r, o);
      }
      function lp(e, t, n, r, o) {
        const i = (function FI(e) {
          if ("string" == typeof e) return e.charCodeAt(0) || 0;
          const t = e.hasOwnProperty(vo) ? e[vo] : void 0;
          return "number" == typeof t ? (t >= 0 ? t & op : LI) : t;
        })(n);
        if ("function" == typeof i) {
          if (!Yh(t, e, r)) return r & $.Host ? ap(o, 0, r) : up(t, n, r, o);
          try {
            let s;
            if (((s = i(r)), null != s || r & $.Optional)) return s;
            mu();
          } finally {
            Kh();
          }
        } else if ("number" == typeof i) {
          let s = null,
            a = sp(e, t),
            u = hr,
            c = r & $.Host ? t[ce][Se] : null;
          for (
            (-1 === a || r & $.SkipSelf) &&
            ((u = -1 === a ? cs(e, t) : t[a + 8]),
            u !== hr && fp(r, !1)
              ? ((s = t[C]), (a = xo(u)), (t = Oo(u, t)))
              : (a = -1));
            -1 !== a;

          ) {
            const l = t[C];
            if (dp(i, a, l.data)) {
              const d = PI(a, t, n, s, r, c);
              if (d !== Nt) return d;
            }
            (u = t[a + 8]),
              u !== hr && fp(r, t[C].data[a + 8] === c) && dp(i, a, t)
                ? ((s = l), (a = xo(u)), (t = Oo(u, t)))
                : (a = -1);
          }
        }
        return o;
      }
      function PI(e, t, n, r, o, i) {
        const s = t[C],
          a = s.data[e + 8],
          l = (function ls(e, t, n, r, o) {
            const i = e.providerIndexes,
              s = t.data,
              a = 1048575 & i,
              u = e.directiveStart,
              l = i >> 20,
              f = o ? a + l : e.directiveEnd;
            for (let h = r ? a : a + l; h < f; h++) {
              const p = s[h];
              if ((h < u && n === p) || (h >= u && p.type === n)) return h;
            }
            if (o) {
              const h = s[u];
              if (h && vt(h) && h.type === n) return u;
            }
            return null;
          })(
            a,
            s,
            n,
            null == r ? Nn(a) && Zu : r != s && 0 != (3 & a.type),
            o & $.Host && i === a
          );
        return null !== l ? Fn(t, s, l, a) : Nt;
      }
      function Fn(e, t, n, r) {
        let o = e[n];
        const i = t.data;
        if (
          (function MI(e) {
            return e instanceof No;
          })(o)
        ) {
          const s = o;
          s.resolving &&
            (function n_(e, t) {
              const n = t ? `. Dependency path: ${t.join(" > ")} > ${e}` : "";
              throw new w(
                -200,
                `Circular dependency in DI detected for ${e}${n}`
              );
            })(
              (function W(e) {
                return "function" == typeof e
                  ? e.name || e.toString()
                  : "object" == typeof e &&
                    null != e &&
                    "function" == typeof e.type
                  ? e.type.name || e.type.toString()
                  : O(e);
              })(i[n])
            );
          const a = as(s.canSeeViewProviders);
          s.resolving = !0;
          const c = s.injectImpl ? He(s.injectImpl) : null;
          Yh(e, r, $.Default);
          try {
            (o = e[n] = s.factory(void 0, i, e, r)),
              t.firstCreatePass &&
                n >= r.directiveStart &&
                (function bI(e, t, n) {
                  const {
                    ngOnChanges: r,
                    ngOnInit: o,
                    ngDoCheck: i,
                  } = t.type.prototype;
                  if (r) {
                    const s = xh(t);
                    (n.preOrderHooks ??= []).push(e, s),
                      (n.preOrderCheckHooks ??= []).push(e, s);
                  }
                  o && (n.preOrderHooks ??= []).push(0 - e, o),
                    i &&
                      ((n.preOrderHooks ??= []).push(e, i),
                      (n.preOrderCheckHooks ??= []).push(e, i));
                })(n, i[n], t);
          } finally {
            null !== c && He(c), as(a), (s.resolving = !1), Kh();
          }
        }
        return o;
      }
      function dp(e, t, n) {
        return !!(n[t + (e >> ip)] & (1 << e));
      }
      function fp(e, t) {
        return !(e & $.Self || (e & $.Host && t));
      }
      class Fe {
        constructor(t, n) {
          (this._tNode = t), (this._lView = n);
        }
        get(t, n, r) {
          return cp(this._tNode, this._lView, t, Zi(r), n);
        }
      }
      function LI() {
        return new Fe(Ie(), y());
      }
      function Xu(e) {
        return pu(e)
          ? () => {
              const t = Xu(x(e));
              return t && t();
            }
          : xn(e);
      }
      function pp(e) {
        const t = e[C],
          n = t.type;
        return 2 === n ? t.declTNode : 1 === n ? e[Se] : null;
      }
      const gr = "__parameters__";
      function vr(e, t, n) {
        return Vt(() => {
          const r = (function Ju(e) {
            return function (...n) {
              if (e) {
                const r = e(...n);
                for (const o in r) this[o] = r[o];
              }
            };
          })(t);
          function o(...i) {
            if (this instanceof o) return r.apply(this, i), this;
            const s = new o(...i);
            return (a.annotation = s), a;
            function a(u, c, l) {
              const d = u.hasOwnProperty(gr)
                ? u[gr]
                : Object.defineProperty(u, gr, { value: [] })[gr];
              for (; d.length <= l; ) d.push(null);
              return (d[l] = d[l] || []).push(s), u;
            }
          }
          return (
            n && (o.prototype = Object.create(n.prototype)),
            (o.prototype.ngMetadataName = e),
            (o.annotationCls = o),
            o
          );
        });
      }
      function Dr(e, t) {
        e.forEach((n) => (Array.isArray(n) ? Dr(n, t) : t(n)));
      }
      function mp(e, t, n) {
        t >= e.length ? e.push(n) : e.splice(t, 0, n);
      }
      function fs(e, t) {
        return t >= e.length - 1 ? e.pop() : e.splice(t, 1)[0];
      }
      const ps = mo(vr("Optional"), 8),
        gs = mo(vr("SkipSelf"), 4);
      function ws(e) {
        return 128 == (128 & e.flags);
      }
      var mn = (function (e) {
        return (
          (e[(e.Important = 1)] = "Important"),
          (e[(e.DashCase = 2)] = "DashCase"),
          e
        );
      })(mn || {});
      const oc = new Map();
      let gb = 0;
      const sc = "__ngContext__";
      function Me(e, t) {
        Be(t)
          ? ((e[sc] = t[_o]),
            (function vb(e) {
              oc.set(e[_o], e);
            })(t))
          : (e[sc] = t);
      }
      let ac;
      function uc(e, t) {
        return ac(e, t);
      }
      function $o(e) {
        const t = e[re];
        return xe(t) ? t[re] : t;
      }
      function Lp(e) {
        return $p(e[Co]);
      }
      function jp(e) {
        return $p(e[mt]);
      }
      function $p(e) {
        for (; null !== e && !xe(e); ) e = e[mt];
        return e;
      }
      function _r(e, t, n, r, o) {
        if (null != r) {
          let i,
            s = !1;
          xe(r) ? (i = r) : Be(r) && ((s = !0), (r = r[ie]));
          const a = K(r);
          0 === e && null !== n
            ? null == o
              ? Up(t, n, a)
              : kn(t, n, a, o || null, !0)
            : 1 === e && null !== n
            ? kn(t, n, a, o || null, !0)
            : 2 === e
            ? (function Ms(e, t, n) {
                const r = bs(e, t);
                r &&
                  (function kb(e, t, n, r) {
                    e.removeChild(t, n, r);
                  })(e, r, t, n);
              })(t, a, s)
            : 3 === e && t.destroyNode(a),
            null != i &&
              (function $b(e, t, n, r, o) {
                const i = n[Tt];
                i !== K(n) && _r(t, e, r, i, o);
                for (let a = Ee; a < n.length; a++) {
                  const u = n[a];
                  Vo(u[C], u, e, t, r, i);
                }
              })(t, e, i, n, o);
        }
      }
      function _s(e, t, n) {
        return e.createElement(t, n);
      }
      function Vp(e, t) {
        const n = e[ur],
          r = n.indexOf(t);
        $h(t), n.splice(r, 1);
      }
      function Is(e, t) {
        if (e.length <= Ee) return;
        const n = Ee + t,
          r = e[n];
        if (r) {
          const o = r[Eo];
          null !== o && o !== e && Vp(o, r), t > 0 && (e[n - 1][mt] = r[mt]);
          const i = fs(e, Ee + t);
          !(function Tb(e, t) {
            Vo(e, t, t[P], 2, null, null), (t[ie] = null), (t[Se] = null);
          })(r[C], r);
          const s = i[Mt];
          null !== s && s.detachView(i[C]),
            (r[re] = null),
            (r[mt] = null),
            (r[k] &= -129);
        }
        return r;
      }
      function lc(e, t) {
        if (!(256 & t[k])) {
          const n = t[P];
          t[Io] && Ih(t[Io]),
            t[bo] && Ih(t[bo]),
            n.destroyNode && Vo(e, t, n, 3, null, null),
            (function Nb(e) {
              let t = e[Co];
              if (!t) return dc(e[C], e);
              for (; t; ) {
                let n = null;
                if (Be(t)) n = t[Co];
                else {
                  const r = t[Ee];
                  r && (n = r);
                }
                if (!n) {
                  for (; t && !t[mt] && t !== e; )
                    Be(t) && dc(t[C], t), (t = t[re]);
                  null === t && (t = e), Be(t) && dc(t[C], t), (n = t && t[mt]);
                }
                t = n;
              }
            })(t);
        }
      }
      function dc(e, t) {
        if (!(256 & t[k])) {
          (t[k] &= -129),
            (t[k] |= 256),
            (function Fb(e, t) {
              let n;
              if (null != e && null != (n = e.destroyHooks))
                for (let r = 0; r < n.length; r += 2) {
                  const o = t[n[r]];
                  if (!(o instanceof No)) {
                    const i = n[r + 1];
                    if (Array.isArray(i))
                      for (let s = 0; s < i.length; s += 2) {
                        const a = o[i[s]],
                          u = i[s + 1];
                        At(4, a, u);
                        try {
                          u.call(a);
                        } finally {
                          At(5, a, u);
                        }
                      }
                    else {
                      At(4, o, i);
                      try {
                        i.call(o);
                      } finally {
                        At(5, o, i);
                      }
                    }
                  }
                }
            })(e, t),
            (function Pb(e, t) {
              const n = e.cleanup,
                r = t[or];
              if (null !== n)
                for (let i = 0; i < n.length - 1; i += 2)
                  if ("string" == typeof n[i]) {
                    const s = n[i + 3];
                    s >= 0 ? r[s]() : r[-s].unsubscribe(), (i += 2);
                  } else n[i].call(r[n[i + 1]]);
              null !== r && (t[or] = null);
              const o = t[fn];
              if (null !== o) {
                t[fn] = null;
                for (let i = 0; i < o.length; i++) (0, o[i])();
              }
            })(e, t),
            1 === t[C].type && t[P].destroy();
          const n = t[Eo];
          if (null !== n && xe(t[re])) {
            n !== t[re] && Vp(n, t);
            const r = t[Mt];
            null !== r && r.detachView(e);
          }
          !(function yb(e) {
            oc.delete(e[_o]);
          })(t);
        }
      }
      function fc(e, t, n) {
        return (function Bp(e, t, n) {
          let r = t;
          for (; null !== r && 40 & r.type; ) r = (t = r).parent;
          if (null === r) return n[ie];
          {
            const { componentOffset: o } = r;
            if (o > -1) {
              const { encapsulation: i } = e.data[r.directiveStart + o];
              if (i === pt.None || i === pt.Emulated) return null;
            }
            return Ue(r, n);
          }
        })(e, t.parent, n);
      }
      function kn(e, t, n, r, o) {
        e.insertBefore(t, n, r, o);
      }
      function Up(e, t, n) {
        e.appendChild(t, n);
      }
      function zp(e, t, n, r, o) {
        null !== r ? kn(e, t, n, r, o) : Up(e, t, n);
      }
      function bs(e, t) {
        return e.parentNode(t);
      }
      let hc,
        vc,
        Wp = function qp(e, t, n) {
          return 40 & e.type ? Ue(e, n) : null;
        };
      function Ss(e, t, n, r) {
        const o = fc(e, r, t),
          i = t[P],
          a = (function Gp(e, t, n) {
            return Wp(e, t, n);
          })(r.parent || t[Se], r, t);
        if (null != o)
          if (Array.isArray(n))
            for (let u = 0; u < n.length; u++) zp(i, o, n[u], a, !1);
          else zp(i, o, n, a, !1);
        void 0 !== hc && hc(i, r, t, n, o);
      }
      function Ho(e, t) {
        if (null !== t) {
          const n = t.type;
          if (3 & n) return Ue(t, e);
          if (4 & n) return pc(-1, e[t.index]);
          if (8 & n) {
            const r = t.child;
            if (null !== r) return Ho(e, r);
            {
              const o = e[t.index];
              return xe(o) ? pc(-1, o) : K(o);
            }
          }
          if (32 & n) return uc(t, e)() || K(e[t.index]);
          {
            const r = Yp(e, t);
            return null !== r
              ? Array.isArray(r)
                ? r[0]
                : Ho($o(e[ce]), r)
              : Ho(e, t.next);
          }
        }
        return null;
      }
      function Yp(e, t) {
        return null !== t ? e[ce][Se].projection[t.projection] : null;
      }
      function pc(e, t) {
        const n = Ee + e + 1;
        if (n < t.length) {
          const r = t[n],
            o = r[C].firstChild;
          if (null !== o) return Ho(r, o);
        }
        return t[Tt];
      }
      function gc(e, t, n, r, o, i, s) {
        for (; null != n; ) {
          const a = r[n.index],
            u = n.type;
          if (
            (s && 0 === t && (a && Me(K(a), r), (n.flags |= 2)),
            32 != (32 & n.flags))
          )
            if (8 & u) gc(e, t, n.child, r, o, i, !1), _r(t, e, o, a, i);
            else if (32 & u) {
              const c = uc(n, r);
              let l;
              for (; (l = c()); ) _r(t, e, o, l, i);
              _r(t, e, o, a, i);
            } else 16 & u ? Xp(e, t, r, n, o, i) : _r(t, e, o, a, i);
          n = s ? n.projectionNext : n.next;
        }
      }
      function Vo(e, t, n, r, o, i) {
        gc(n, r, e.firstChild, t, o, i, !1);
      }
      function Xp(e, t, n, r, o, i) {
        const s = n[ce],
          u = s[Se].projection[r.projection];
        if (Array.isArray(u))
          for (let c = 0; c < u.length; c++) _r(t, e, o, u[c], i);
        else {
          let c = u;
          const l = s[re];
          ws(r) && (c.flags |= 128), gc(e, t, c, l, o, i, !0);
        }
      }
      function Jp(e, t, n) {
        "" === n
          ? e.removeAttribute(t, "class")
          : e.setAttribute(t, "class", n);
      }
      function Kp(e, t, n) {
        const { mergedAttrs: r, classes: o, styles: i } = n;
        null !== r && Mu(e, t, r),
          null !== o && Jp(e, t, o),
          null !== i &&
            (function Vb(e, t, n) {
              e.setAttribute(t, "style", n);
            })(e, t, i);
      }
      const Go = new I("ENVIRONMENT_INITIALIZER"),
        hg = new I("INJECTOR", -1),
        pg = new I("INJECTOR_DEF_TYPES");
      class _c {
        get(t, n = go) {
          if (n === go) {
            const r = new Error(`NullInjectorError: No provider for ${pe(t)}!`);
            throw ((r.name = "NullInjectorError"), r);
          }
          return n;
        }
      }
      function pS(...e) {
        return { ɵproviders: gg(0, e), ɵfromNgModule: !0 };
      }
      function gg(e, ...t) {
        const n = [],
          r = new Set();
        let o;
        const i = (s) => {
          n.push(s);
        };
        return (
          Dr(t, (s) => {
            const a = s;
            Ns(a, i, [], r) && ((o ||= []), o.push(a));
          }),
          void 0 !== o && mg(o, i),
          n
        );
      }
      function mg(e, t) {
        for (let n = 0; n < e.length; n++) {
          const { ngModule: r, providers: o } = e[n];
          bc(o, (i) => {
            t(i, r);
          });
        }
      }
      function Ns(e, t, n, r) {
        if (!(e = x(e))) return !1;
        let o = null,
          i = Gi(e);
        const s = !i && V(e);
        if (i || s) {
          if (s && !s.standalone) return !1;
          o = e;
        } else {
          const u = e.ngModule;
          if (((i = Gi(u)), !i)) return !1;
          o = u;
        }
        const a = r.has(o);
        if (s) {
          if (a) return !1;
          if ((r.add(o), s.dependencies)) {
            const u =
              "function" == typeof s.dependencies
                ? s.dependencies()
                : s.dependencies;
            for (const c of u) Ns(c, t, n, r);
          }
        } else {
          if (!i) return !1;
          {
            if (null != i.imports && !a) {
              let c;
              r.add(o);
              try {
                Dr(i.imports, (l) => {
                  Ns(l, t, n, r) && ((c ||= []), c.push(l));
                });
              } finally {
              }
              void 0 !== c && mg(c, t);
            }
            if (!a) {
              const c = xn(o) || (() => new o());
              t({ provide: o, useFactory: c, deps: z }, o),
                t({ provide: pg, useValue: o, multi: !0 }, o),
                t({ provide: Go, useValue: () => b(o), multi: !0 }, o);
            }
            const u = i.providers;
            if (null != u && !a) {
              const c = e;
              bc(u, (l) => {
                t(l, c);
              });
            }
          }
        }
        return o !== e && void 0 !== e.providers;
      }
      function bc(e, t) {
        for (let n of e)
          gu(n) && (n = n.ɵproviders), Array.isArray(n) ? bc(n, t) : t(n);
      }
      const gS = Z({ provide: String, useValue: Z });
      function Sc(e) {
        return null !== e && "object" == typeof e && gS in e;
      }
      function Ln(e) {
        return "function" == typeof e;
      }
      const Mc = new I("Set Injector scope."),
        xs = {},
        vS = {};
      let Tc;
      function Os() {
        return void 0 === Tc && (Tc = new _c()), Tc;
      }
      class Je {}
      class Mr extends Je {
        get destroyed() {
          return this._destroyed;
        }
        constructor(t, n, r, o) {
          super(),
            (this.parent = n),
            (this.source = r),
            (this.scopes = o),
            (this.records = new Map()),
            (this._ngOnDestroyHooks = new Set()),
            (this._onDestroyHooks = []),
            (this._destroyed = !1),
            Rc(t, (s) => this.processProvider(s)),
            this.records.set(hg, Tr(void 0, this)),
            o.has("environment") && this.records.set(Je, Tr(void 0, this));
          const i = this.records.get(Mc);
          null != i && "string" == typeof i.value && this.scopes.add(i.value),
            (this.injectorDefTypes = new Set(this.get(pg.multi, z, $.Self)));
        }
        destroy() {
          this.assertNotDestroyed(), (this._destroyed = !0);
          try {
            for (const n of this._ngOnDestroyHooks) n.ngOnDestroy();
            const t = this._onDestroyHooks;
            this._onDestroyHooks = [];
            for (const n of t) n();
          } finally {
            this.records.clear(),
              this._ngOnDestroyHooks.clear(),
              this.injectorDefTypes.clear();
          }
        }
        onDestroy(t) {
          return (
            this.assertNotDestroyed(),
            this._onDestroyHooks.push(t),
            () => this.removeOnDestroy(t)
          );
        }
        runInContext(t) {
          this.assertNotDestroyed();
          const n = ln(this),
            r = He(void 0);
          try {
            return t();
          } finally {
            ln(n), He(r);
          }
        }
        get(t, n = go, r = $.Default) {
          if ((this.assertNotDestroyed(), t.hasOwnProperty(th)))
            return t[th](this);
          r = Zi(r);
          const i = ln(this),
            s = He(void 0);
          try {
            if (!(r & $.SkipSelf)) {
              let u = this.records.get(t);
              if (void 0 === u) {
                const c =
                  (function ES(e) {
                    return (
                      "function" == typeof e ||
                      ("object" == typeof e && e instanceof I)
                    );
                  })(t) && zi(t);
                (u = c && this.injectableDefInScope(c) ? Tr(Ac(t), xs) : null),
                  this.records.set(t, u);
              }
              if (null != u) return this.hydrate(t, u);
            }
            return (r & $.Self ? Os() : this.parent).get(
              t,
              (n = r & $.Optional && n === go ? null : n)
            );
          } catch (a) {
            if ("NullInjectorError" === a.name) {
              if (((a[Wi] = a[Wi] || []).unshift(pe(t)), i)) throw a;
              return (function v_(e, t, n, r) {
                const o = e[Wi];
                throw (
                  (t[Jf] && o.unshift(t[Jf]),
                  (e.message = (function y_(e, t, n, r = null) {
                    e =
                      e && "\n" === e.charAt(0) && "\u0275" == e.charAt(1)
                        ? e.slice(2)
                        : e;
                    let o = pe(t);
                    if (Array.isArray(t)) o = t.map(pe).join(" -> ");
                    else if ("object" == typeof t) {
                      let i = [];
                      for (let s in t)
                        if (t.hasOwnProperty(s)) {
                          let a = t[s];
                          i.push(
                            s +
                              ":" +
                              ("string" == typeof a ? JSON.stringify(a) : pe(a))
                          );
                        }
                      o = `{${i.join(", ")}}`;
                    }
                    return `${n}${r ? "(" + r + ")" : ""}[${o}]: ${e.replace(
                      f_,
                      "\n  "
                    )}`;
                  })("\n" + e.message, o, n, r)),
                  (e.ngTokenPath = o),
                  (e[Wi] = null),
                  e)
                );
              })(a, t, "R3InjectorError", this.source);
            }
            throw a;
          } finally {
            He(s), ln(i);
          }
        }
        resolveInjectorInitializers() {
          const t = ln(this),
            n = He(void 0);
          try {
            const o = this.get(Go.multi, z, $.Self);
            for (const i of o) i();
          } finally {
            ln(t), He(n);
          }
        }
        toString() {
          const t = [],
            n = this.records;
          for (const r of n.keys()) t.push(pe(r));
          return `R3Injector[${t.join(", ")}]`;
        }
        assertNotDestroyed() {
          if (this._destroyed) throw new w(205, !1);
        }
        processProvider(t) {
          let n = Ln((t = x(t))) ? t : x(t && t.provide);
          const r = (function DS(e) {
            return Sc(e)
              ? Tr(void 0, e.useValue)
              : Tr(
                  (function Dg(e, t, n) {
                    let r;
                    if (Ln(e)) {
                      const o = x(e);
                      return xn(o) || Ac(o);
                    }
                    if (Sc(e)) r = () => x(e.useValue);
                    else if (
                      (function yg(e) {
                        return !(!e || !e.useFactory);
                      })(e)
                    )
                      r = () => e.useFactory(...Iu(e.deps || []));
                    else if (
                      (function vg(e) {
                        return !(!e || !e.useExisting);
                      })(e)
                    )
                      r = () => b(x(e.useExisting));
                    else {
                      const o = x(e && (e.useClass || e.provide));
                      if (
                        !(function wS(e) {
                          return !!e.deps;
                        })(e)
                      )
                        return xn(o) || Ac(o);
                      r = () => new o(...Iu(e.deps));
                    }
                    return r;
                  })(e),
                  xs
                );
          })(t);
          if (Ln(t) || !0 !== t.multi) this.records.get(n);
          else {
            let o = this.records.get(n);
            o ||
              ((o = Tr(void 0, xs, !0)),
              (o.factory = () => Iu(o.multi)),
              this.records.set(n, o)),
              (n = t),
              o.multi.push(t);
          }
          this.records.set(n, r);
        }
        hydrate(t, n) {
          return (
            n.value === xs && ((n.value = vS), (n.value = n.factory())),
            "object" == typeof n.value &&
              n.value &&
              (function CS(e) {
                return (
                  null !== e &&
                  "object" == typeof e &&
                  "function" == typeof e.ngOnDestroy
                );
              })(n.value) &&
              this._ngOnDestroyHooks.add(n.value),
            n.value
          );
        }
        injectableDefInScope(t) {
          if (!t.providedIn) return !1;
          const n = x(t.providedIn);
          return "string" == typeof n
            ? "any" === n || this.scopes.has(n)
            : this.injectorDefTypes.has(n);
        }
        removeOnDestroy(t) {
          const n = this._onDestroyHooks.indexOf(t);
          -1 !== n && this._onDestroyHooks.splice(n, 1);
        }
      }
      function Ac(e) {
        const t = zi(e),
          n = null !== t ? t.factory : xn(e);
        if (null !== n) return n;
        if (e instanceof I) throw new w(204, !1);
        if (e instanceof Function)
          return (function yS(e) {
            const t = e.length;
            if (t > 0)
              throw (
                ((function ko(e, t) {
                  const n = [];
                  for (let r = 0; r < e; r++) n.push(t);
                  return n;
                })(t, "?"),
                new w(204, !1))
              );
            const n = (function u_(e) {
              return (e && (e[qi] || e[Zf])) || null;
            })(e);
            return null !== n ? () => n.factory(e) : () => new e();
          })(e);
        throw new w(204, !1);
      }
      function Tr(e, t, n = !1) {
        return { factory: e, value: t, multi: n ? [] : void 0 };
      }
      function Rc(e, t) {
        for (const n of e)
          Array.isArray(n) ? Rc(n, t) : n && gu(n) ? Rc(n.ɵproviders, t) : t(n);
      }
      const Ps = new I("AppId", { providedIn: "root", factory: () => _S }),
        _S = "ng",
        wg = new I("Platform Initializer"),
        jn = new I("Platform ID", {
          providedIn: "platform",
          factory: () => "unknown",
        }),
        Cg = new I("CSP nonce", {
          providedIn: "root",
          factory: () =>
            (function br() {
              if (void 0 !== vc) return vc;
              if (typeof document < "u") return document;
              throw new w(210, !1);
            })()
              .body?.querySelector("[ngCspNonce]")
              ?.getAttribute("ngCspNonce") || null,
        });
      let Eg = (e, t, n) => null;
      function jc(e, t, n = !1) {
        return Eg(e, t, n);
      }
      class OS {}
      class bg {}
      class FS {
        resolveComponentFactory(t) {
          throw (function PS(e) {
            const t = Error(`No component factory found for ${pe(e)}.`);
            return (t.ngComponent = e), t;
          })(t);
        }
      }
      let Hs = (() => {
        class e {
          static #e = (this.NULL = new FS());
        }
        return e;
      })();
      function kS() {
        return Nr(Ie(), y());
      }
      function Nr(e, t) {
        return new yn(Ue(e, t));
      }
      let yn = (() => {
        class e {
          constructor(n) {
            this.nativeElement = n;
          }
          static #e = (this.__NG_ELEMENT_ID__ = kS);
        }
        return e;
      })();
      class Mg {}
      let $S = (() => {
        class e {
          static #e = (this.ɵprov = S({
            token: e,
            providedIn: "root",
            factory: () => null,
          }));
        }
        return e;
      })();
      class Bs {
        constructor(t) {
          (this.full = t),
            (this.major = t.split(".")[0]),
            (this.minor = t.split(".")[1]),
            (this.patch = t.split(".").slice(2).join("."));
        }
      }
      const HS = new Bs("16.2.12"),
        Vc = {};
      function Ng(e, t = null, n = null, r) {
        const o = xg(e, t, n, r);
        return o.resolveInjectorInitializers(), o;
      }
      function xg(e, t = null, n = null, r, o = new Set()) {
        const i = [n || z, pS(e)];
        return (
          (r = r || ("object" == typeof e ? void 0 : pe(e))),
          new Mr(i, t || Os(), r || null, o)
        );
      }
      let at = (() => {
        class e {
          static #e = (this.THROW_IF_NOT_FOUND = go);
          static #t = (this.NULL = new _c());
          static create(n, r) {
            if (Array.isArray(n)) return Ng({ name: "" }, r, n, "");
            {
              const o = n.name ?? "";
              return Ng({ name: o }, n.parent, n.providers, o);
            }
          }
          static #n = (this.ɵprov = S({
            token: e,
            providedIn: "any",
            factory: () => b(hg),
          }));
          static #r = (this.__NG_ELEMENT_ID__ = -1);
        }
        return e;
      })();
      function Uc(e) {
        return e.ngOriginalError;
      }
      class Wt {
        constructor() {
          this._console = console;
        }
        handleError(t) {
          const n = this._findOriginalError(t);
          this._console.error("ERROR", t),
            n && this._console.error("ORIGINAL ERROR", n);
        }
        _findOriginalError(t) {
          let n = t && Uc(t);
          for (; n && Uc(n); ) n = Uc(n);
          return n || null;
        }
      }
      function Gc(e) {
        return (t) => {
          setTimeout(e, void 0, t);
        };
      }
      const ke = class WS extends ft {
        constructor(t = !1) {
          super(), (this.__isAsync = t);
        }
        emit(t) {
          super.next(t);
        }
        subscribe(t, n, r) {
          let o = t,
            i = n || (() => null),
            s = r;
          if (t && "object" == typeof t) {
            const u = t;
            (o = u.next?.bind(u)),
              (i = u.error?.bind(u)),
              (s = u.complete?.bind(u));
          }
          this.__isAsync && ((i = Gc(i)), o && (o = Gc(o)), s && (s = Gc(s)));
          const a = super.subscribe({ next: o, error: i, complete: s });
          return t instanceof We && t.add(a), a;
        }
      };
      function Pg(...e) {}
      class ee {
        constructor({
          enableLongStackTrace: t = !1,
          shouldCoalesceEventChangeDetection: n = !1,
          shouldCoalesceRunChangeDetection: r = !1,
        }) {
          if (
            ((this.hasPendingMacrotasks = !1),
            (this.hasPendingMicrotasks = !1),
            (this.isStable = !0),
            (this.onUnstable = new ke(!1)),
            (this.onMicrotaskEmpty = new ke(!1)),
            (this.onStable = new ke(!1)),
            (this.onError = new ke(!1)),
            typeof Zone > "u")
          )
            throw new w(908, !1);
          Zone.assertZonePatched();
          const o = this;
          (o._nesting = 0),
            (o._outer = o._inner = Zone.current),
            Zone.TaskTrackingZoneSpec &&
              (o._inner = o._inner.fork(new Zone.TaskTrackingZoneSpec())),
            t &&
              Zone.longStackTraceZoneSpec &&
              (o._inner = o._inner.fork(Zone.longStackTraceZoneSpec)),
            (o.shouldCoalesceEventChangeDetection = !r && n),
            (o.shouldCoalesceRunChangeDetection = r),
            (o.lastRequestAnimationFrameId = -1),
            (o.nativeRequestAnimationFrame = (function ZS() {
              const e = "function" == typeof J.requestAnimationFrame;
              let t = J[e ? "requestAnimationFrame" : "setTimeout"],
                n = J[e ? "cancelAnimationFrame" : "clearTimeout"];
              if (typeof Zone < "u" && t && n) {
                const r = t[Zone.__symbol__("OriginalDelegate")];
                r && (t = r);
                const o = n[Zone.__symbol__("OriginalDelegate")];
                o && (n = o);
              }
              return {
                nativeRequestAnimationFrame: t,
                nativeCancelAnimationFrame: n,
              };
            })().nativeRequestAnimationFrame),
            (function XS(e) {
              const t = () => {
                !(function QS(e) {
                  e.isCheckStableRunning ||
                    -1 !== e.lastRequestAnimationFrameId ||
                    ((e.lastRequestAnimationFrameId =
                      e.nativeRequestAnimationFrame.call(J, () => {
                        e.fakeTopEventTask ||
                          (e.fakeTopEventTask = Zone.root.scheduleEventTask(
                            "fakeTopEventTask",
                            () => {
                              (e.lastRequestAnimationFrameId = -1),
                                Wc(e),
                                (e.isCheckStableRunning = !0),
                                qc(e),
                                (e.isCheckStableRunning = !1);
                            },
                            void 0,
                            () => {},
                            () => {}
                          )),
                          e.fakeTopEventTask.invoke();
                      })),
                    Wc(e));
                })(e);
              };
              e._inner = e._inner.fork({
                name: "angular",
                properties: { isAngularZone: !0 },
                onInvokeTask: (n, r, o, i, s, a) => {
                  if (
                    (function KS(e) {
                      return (
                        !(!Array.isArray(e) || 1 !== e.length) &&
                        !0 === e[0].data?.__ignore_ng_zone__
                      );
                    })(a)
                  )
                    return n.invokeTask(o, i, s, a);
                  try {
                    return Fg(e), n.invokeTask(o, i, s, a);
                  } finally {
                    ((e.shouldCoalesceEventChangeDetection &&
                      "eventTask" === i.type) ||
                      e.shouldCoalesceRunChangeDetection) &&
                      t(),
                      kg(e);
                  }
                },
                onInvoke: (n, r, o, i, s, a, u) => {
                  try {
                    return Fg(e), n.invoke(o, i, s, a, u);
                  } finally {
                    e.shouldCoalesceRunChangeDetection && t(), kg(e);
                  }
                },
                onHasTask: (n, r, o, i) => {
                  n.hasTask(o, i),
                    r === o &&
                      ("microTask" == i.change
                        ? ((e._hasPendingMicrotasks = i.microTask),
                          Wc(e),
                          qc(e))
                        : "macroTask" == i.change &&
                          (e.hasPendingMacrotasks = i.macroTask));
                },
                onHandleError: (n, r, o, i) => (
                  n.handleError(o, i),
                  e.runOutsideAngular(() => e.onError.emit(i)),
                  !1
                ),
              });
            })(o);
        }
        static isInAngularZone() {
          return typeof Zone < "u" && !0 === Zone.current.get("isAngularZone");
        }
        static assertInAngularZone() {
          if (!ee.isInAngularZone()) throw new w(909, !1);
        }
        static assertNotInAngularZone() {
          if (ee.isInAngularZone()) throw new w(909, !1);
        }
        run(t, n, r) {
          return this._inner.run(t, n, r);
        }
        runTask(t, n, r, o) {
          const i = this._inner,
            s = i.scheduleEventTask("NgZoneEvent: " + o, t, YS, Pg, Pg);
          try {
            return i.runTask(s, n, r);
          } finally {
            i.cancelTask(s);
          }
        }
        runGuarded(t, n, r) {
          return this._inner.runGuarded(t, n, r);
        }
        runOutsideAngular(t) {
          return this._outer.run(t);
        }
      }
      const YS = {};
      function qc(e) {
        if (0 == e._nesting && !e.hasPendingMicrotasks && !e.isStable)
          try {
            e._nesting++, e.onMicrotaskEmpty.emit(null);
          } finally {
            if ((e._nesting--, !e.hasPendingMicrotasks))
              try {
                e.runOutsideAngular(() => e.onStable.emit(null));
              } finally {
                e.isStable = !0;
              }
          }
      }
      function Wc(e) {
        e.hasPendingMicrotasks = !!(
          e._hasPendingMicrotasks ||
          ((e.shouldCoalesceEventChangeDetection ||
            e.shouldCoalesceRunChangeDetection) &&
            -1 !== e.lastRequestAnimationFrameId)
        );
      }
      function Fg(e) {
        e._nesting++,
          e.isStable && ((e.isStable = !1), e.onUnstable.emit(null));
      }
      function kg(e) {
        e._nesting--, qc(e);
      }
      class JS {
        constructor() {
          (this.hasPendingMicrotasks = !1),
            (this.hasPendingMacrotasks = !1),
            (this.isStable = !0),
            (this.onUnstable = new ke()),
            (this.onMicrotaskEmpty = new ke()),
            (this.onStable = new ke()),
            (this.onError = new ke());
        }
        run(t, n, r) {
          return t.apply(n, r);
        }
        runGuarded(t, n, r) {
          return t.apply(n, r);
        }
        runOutsideAngular(t) {
          return t();
        }
        runTask(t, n, r, o) {
          return t.apply(n, r);
        }
      }
      const Lg = new I("", { providedIn: "root", factory: jg });
      function jg() {
        const e = _(ee);
        let t = !0;
        return (function JE(...e) {
          const t = po(e),
            n = (function GE(e, t) {
              return "number" == typeof lu(e) ? e.pop() : t;
            })(e, 1 / 0),
            r = e;
          return r.length ? (1 === r.length ? nt(r[0]) : tr(n)(ve(r, t))) : bt;
        })(
          new ae((o) => {
            (t =
              e.isStable && !e.hasPendingMacrotasks && !e.hasPendingMicrotasks),
              e.runOutsideAngular(() => {
                o.next(t), o.complete();
              });
          }),
          new ae((o) => {
            let i;
            e.runOutsideAngular(() => {
              i = e.onStable.subscribe(() => {
                ee.assertNotInAngularZone(),
                  queueMicrotask(() => {
                    !t &&
                      !e.hasPendingMacrotasks &&
                      !e.hasPendingMicrotasks &&
                      ((t = !0), o.next(!0));
                  });
              });
            });
            const s = e.onUnstable.subscribe(() => {
              ee.assertInAngularZone(),
                t &&
                  ((t = !1),
                  e.runOutsideAngular(() => {
                    o.next(!1);
                  }));
            });
            return () => {
              i.unsubscribe(), s.unsubscribe();
            };
          }).pipe(Gf())
        );
      }
      function Zt(e) {
        return e instanceof Function ? e() : e;
      }
      let Zc = (() => {
        class e {
          constructor() {
            (this.renderDepth = 0), (this.handler = null);
          }
          begin() {
            this.handler?.validateBegin(), this.renderDepth++;
          }
          end() {
            this.renderDepth--,
              0 === this.renderDepth && this.handler?.execute();
          }
          ngOnDestroy() {
            this.handler?.destroy(), (this.handler = null);
          }
          static #e = (this.ɵprov = S({
            token: e,
            providedIn: "root",
            factory: () => new e(),
          }));
        }
        return e;
      })();
      function Zo(e) {
        for (; e; ) {
          e[k] |= 64;
          const t = $o(e);
          if (Ru(e) && !t) return e;
          e = t;
        }
        return null;
      }
      const Ug = new I("", { providedIn: "root", factory: () => !1 });
      let zs = null;
      function Wg(e, t) {
        return e[t] ?? Qg();
      }
      function Zg(e, t) {
        const n = Qg();
        n.producerNode?.length && ((e[t] = zs), (n.lView = e), (zs = Yg()));
      }
      const cM = {
        ...yh,
        consumerIsAlwaysLive: !0,
        consumerMarkedDirty: (e) => {
          Zo(e.lView);
        },
        lView: null,
      };
      function Yg() {
        return Object.create(cM);
      }
      function Qg() {
        return (zs ??= Yg()), zs;
      }
      const F = {};
      function yt(e) {
        Xg(B(), y(), Pe() + e, !1);
      }
      function Xg(e, t, n, r) {
        if (!r)
          if (3 == (3 & t[k])) {
            const i = e.preOrderCheckHooks;
            null !== i && is(t, i, n);
          } else {
            const i = e.preOrderHooks;
            null !== i && ss(t, i, 0, n);
          }
        Pn(n);
      }
      function M(e, t = $.Default) {
        const n = y();
        return null === n ? b(e, t) : cp(Ie(), n, x(e), t);
      }
      function Gs(e, t, n, r, o, i, s, a, u, c, l) {
        const d = t.blueprint.slice();
        return (
          (d[ie] = o),
          (d[k] = 140 | r),
          (null !== c || (e && 2048 & e[k])) && (d[k] |= 2048),
          jh(d),
          (d[re] = d[sr] = e),
          (d[ue] = n),
          (d[ir] = s || (e && e[ir])),
          (d[P] = a || (e && e[P])),
          (d[dn] = u || (e && e[dn]) || null),
          (d[Se] = i),
          (d[_o] = (function mb() {
            return gb++;
          })()),
          (d[Ut] = l),
          (d[ph] = c),
          (d[ce] = 2 == t.type ? e[ce] : d),
          d
        );
      }
      function Pr(e, t, n, r, o) {
        let i = e.data[t];
        if (null === i)
          (i = (function Yc(e, t, n, r, o) {
            const i = zh(),
              s = ju(),
              u = (e.data[t] = (function vM(e, t, n, r, o, i) {
                let s = t ? t.injectorIndex : -1,
                  a = 0;
                return (
                  (function dr() {
                    return null !== N.skipHydrationRootTNode;
                  })() && (a |= 128),
                  {
                    type: n,
                    index: r,
                    insertBeforeIndex: null,
                    injectorIndex: s,
                    directiveStart: -1,
                    directiveEnd: -1,
                    directiveStylingLast: -1,
                    componentOffset: -1,
                    propertyBindings: null,
                    flags: a,
                    providerIndexes: 0,
                    value: o,
                    attrs: i,
                    mergedAttrs: null,
                    localNames: null,
                    initialInputs: void 0,
                    inputs: null,
                    outputs: null,
                    tView: null,
                    next: null,
                    prev: null,
                    projectionNext: null,
                    child: null,
                    parent: t,
                    projection: null,
                    styles: null,
                    stylesWithoutHost: null,
                    residualStyles: void 0,
                    classes: null,
                    classesWithoutHost: null,
                    residualClasses: void 0,
                    classBindings: 0,
                    styleBindings: 0,
                  }
                );
              })(0, s ? i : i && i.parent, n, t, r, o));
            return (
              null === e.firstChild && (e.firstChild = u),
              null !== i &&
                (s
                  ? null == i.child && null !== u.parent && (i.child = u)
                  : null === i.next && ((i.next = u), (u.prev = i))),
              u
            );
          })(e, t, n, r, o)),
            (function gI() {
              return N.lFrame.inI18n;
            })() && (i.flags |= 32);
        else if (64 & i.type) {
          (i.type = n), (i.value = r), (i.attrs = o);
          const s = (function Ro() {
            const e = N.lFrame,
              t = e.currentTNode;
            return e.isParent ? t : t.parent;
          })();
          i.injectorIndex = null === s ? -1 : s.injectorIndex;
        }
        return Rt(i, !0), i;
      }
      function Yo(e, t, n, r) {
        if (0 === n) return -1;
        const o = t.length;
        for (let i = 0; i < n; i++)
          t.push(r), e.blueprint.push(r), e.data.push(null);
        return o;
      }
      function Kg(e, t, n, r, o) {
        const i = Wg(t, Io),
          s = Pe(),
          a = 2 & r;
        try {
          Pn(-1), a && t.length > H && Xg(e, t, H, !1), At(a ? 2 : 0, o);
          const c = a ? i : null,
            l = xu(c);
          try {
            null !== c && (c.dirty = !1), n(r, o);
          } finally {
            Ou(c, l);
          }
        } finally {
          a && null === t[Io] && Zg(t, Io), Pn(s), At(a ? 3 : 1, o);
        }
      }
      function Qc(e, t, n) {
        if (Au(t)) {
          const r = it(null);
          try {
            const i = t.directiveEnd;
            for (let s = t.directiveStart; s < i; s++) {
              const a = e.data[s];
              a.contentQueries && a.contentQueries(1, n[s], s);
            }
          } finally {
            it(r);
          }
        }
      }
      function Xc(e, t, n) {
        Uh() &&
          ((function IM(e, t, n, r) {
            const o = n.directiveStart,
              i = n.directiveEnd;
            Nn(n) &&
              (function NM(e, t, n) {
                const r = Ue(t, e),
                  o = em(n);
                let s = 16;
                n.signals ? (s = 4096) : n.onPush && (s = 64);
                const a = qs(
                  e,
                  Gs(
                    e,
                    o,
                    null,
                    s,
                    r,
                    t,
                    null,
                    e[ir].rendererFactory.createRenderer(r, n),
                    null,
                    null,
                    null
                  )
                );
                e[t.index] = a;
              })(t, n, e.data[o + n.componentOffset]),
              e.firstCreatePass || us(n, t),
              Me(r, t);
            const s = n.initialInputs;
            for (let a = o; a < i; a++) {
              const u = e.data[a],
                c = Fn(t, e, a, n);
              Me(c, t),
                null !== s && xM(0, a - o, c, u, 0, s),
                vt(u) && (Qe(n.index, t)[ue] = Fn(t, e, a, n));
            }
          })(e, t, n, Ue(n, t)),
          64 == (64 & n.flags) && im(e, t, n));
      }
      function Jc(e, t, n = Ue) {
        const r = t.localNames;
        if (null !== r) {
          let o = t.index + 1;
          for (let i = 0; i < r.length; i += 2) {
            const s = r[i + 1],
              a = -1 === s ? n(t, e) : e[s];
            e[o++] = a;
          }
        }
      }
      function em(e) {
        const t = e.tView;
        return null === t || t.incompleteFirstPass
          ? (e.tView = Kc(
              1,
              null,
              e.template,
              e.decls,
              e.vars,
              e.directiveDefs,
              e.pipeDefs,
              e.viewQuery,
              e.schemas,
              e.consts,
              e.id
            ))
          : t;
      }
      function Kc(e, t, n, r, o, i, s, a, u, c, l) {
        const d = H + r,
          f = d + o,
          h = (function dM(e, t) {
            const n = [];
            for (let r = 0; r < t; r++) n.push(r < e ? null : F);
            return n;
          })(d, f),
          p = "function" == typeof c ? c() : c;
        return (h[C] = {
          type: e,
          blueprint: h,
          template: n,
          queries: null,
          viewQuery: a,
          declTNode: t,
          data: h.slice().fill(null, d),
          bindingStartIndex: d,
          expandoStartIndex: f,
          hostBindingOpCodes: null,
          firstCreatePass: !0,
          firstUpdatePass: !0,
          staticViewQueries: !1,
          staticContentQueries: !1,
          preOrderHooks: null,
          preOrderCheckHooks: null,
          contentHooks: null,
          contentCheckHooks: null,
          viewHooks: null,
          viewCheckHooks: null,
          destroyHooks: null,
          cleanup: null,
          contentQueries: null,
          components: null,
          directiveRegistry: "function" == typeof i ? i() : i,
          pipeRegistry: "function" == typeof s ? s() : s,
          firstChild: null,
          schemas: u,
          consts: p,
          incompleteFirstPass: !1,
          ssrId: l,
        });
      }
      let tm = (e) => null;
      function nm(e, t, n, r) {
        for (let o in e)
          if (e.hasOwnProperty(o)) {
            n = null === n ? {} : n;
            const i = e[o];
            null === r
              ? rm(n, t, o, i)
              : r.hasOwnProperty(o) && rm(n, t, r[o], i);
          }
        return n;
      }
      function rm(e, t, n, r) {
        e.hasOwnProperty(n) ? e[n].push(t, r) : (e[n] = [t, r]);
      }
      function Ke(e, t, n, r, o, i, s, a) {
        const u = Ue(t, n);
        let l,
          c = t.inputs;
        !a && null != c && (l = c[r])
          ? (ol(e, n, l, r, o),
            Nn(t) &&
              (function wM(e, t) {
                const n = Qe(t, e);
                16 & n[k] || (n[k] |= 64);
              })(n, t.index))
          : 3 & t.type &&
            ((r = (function DM(e) {
              return "class" === e
                ? "className"
                : "for" === e
                ? "htmlFor"
                : "formaction" === e
                ? "formAction"
                : "innerHtml" === e
                ? "innerHTML"
                : "readonly" === e
                ? "readOnly"
                : "tabindex" === e
                ? "tabIndex"
                : e;
            })(r)),
            (o = null != s ? s(o, t.value || "", r) : o),
            i.setProperty(u, r, o));
      }
      function el(e, t, n, r) {
        if (Uh()) {
          const o = null === r ? null : { "": -1 },
            i = (function SM(e, t) {
              const n = e.directiveRegistry;
              let r = null,
                o = null;
              if (n)
                for (let i = 0; i < n.length; i++) {
                  const s = n[i];
                  if (uh(t, s.selectors, !1))
                    if ((r || (r = []), vt(s)))
                      if (null !== s.findHostDirectiveDefs) {
                        const a = [];
                        (o = o || new Map()),
                          s.findHostDirectiveDefs(s, a, o),
                          r.unshift(...a, s),
                          tl(e, t, a.length);
                      } else r.unshift(s), tl(e, t, 0);
                    else
                      (o = o || new Map()),
                        s.findHostDirectiveDefs?.(s, r, o),
                        r.push(s);
                }
              return null === r ? null : [r, o];
            })(e, n);
          let s, a;
          null === i ? (s = a = null) : ([s, a] = i),
            null !== s && om(e, t, n, s, o, a),
            o &&
              (function MM(e, t, n) {
                if (t) {
                  const r = (e.localNames = []);
                  for (let o = 0; o < t.length; o += 2) {
                    const i = n[t[o + 1]];
                    if (null == i) throw new w(-301, !1);
                    r.push(t[o], i);
                  }
                }
              })(n, r, o);
        }
        n.mergedAttrs = yo(n.mergedAttrs, n.attrs);
      }
      function om(e, t, n, r, o, i) {
        for (let c = 0; c < r.length; c++) Qu(us(n, t), e, r[c].type);
        !(function AM(e, t, n) {
          (e.flags |= 1),
            (e.directiveStart = t),
            (e.directiveEnd = t + n),
            (e.providerIndexes = t);
        })(n, e.data.length, r.length);
        for (let c = 0; c < r.length; c++) {
          const l = r[c];
          l.providersResolver && l.providersResolver(l);
        }
        let s = !1,
          a = !1,
          u = Yo(e, t, r.length, null);
        for (let c = 0; c < r.length; c++) {
          const l = r[c];
          (n.mergedAttrs = yo(n.mergedAttrs, l.hostAttrs)),
            RM(e, n, t, u, l),
            TM(u, l, o),
            null !== l.contentQueries && (n.flags |= 4),
            (null !== l.hostBindings ||
              null !== l.hostAttrs ||
              0 !== l.hostVars) &&
              (n.flags |= 64);
          const d = l.type.prototype;
          !s &&
            (d.ngOnChanges || d.ngOnInit || d.ngDoCheck) &&
            ((e.preOrderHooks ??= []).push(n.index), (s = !0)),
            !a &&
              (d.ngOnChanges || d.ngDoCheck) &&
              ((e.preOrderCheckHooks ??= []).push(n.index), (a = !0)),
            u++;
        }
        !(function yM(e, t, n) {
          const o = t.directiveEnd,
            i = e.data,
            s = t.attrs,
            a = [];
          let u = null,
            c = null;
          for (let l = t.directiveStart; l < o; l++) {
            const d = i[l],
              f = n ? n.get(d) : null,
              p = f ? f.outputs : null;
            (u = nm(d.inputs, l, u, f ? f.inputs : null)),
              (c = nm(d.outputs, l, c, p));
            const g = null === u || null === s || ah(t) ? null : OM(u, l, s);
            a.push(g);
          }
          null !== u &&
            (u.hasOwnProperty("class") && (t.flags |= 8),
            u.hasOwnProperty("style") && (t.flags |= 16)),
            (t.initialInputs = a),
            (t.inputs = u),
            (t.outputs = c);
        })(e, n, i);
      }
      function im(e, t, n) {
        const r = n.directiveStart,
          o = n.directiveEnd,
          i = n.index,
          s = (function vI() {
            return N.lFrame.currentDirectiveIndex;
          })();
        try {
          Pn(i);
          for (let a = r; a < o; a++) {
            const u = e.data[a],
              c = t[a];
            Hu(a),
              (null !== u.hostBindings ||
                0 !== u.hostVars ||
                null !== u.hostAttrs) &&
                bM(u, c);
          }
        } finally {
          Pn(-1), Hu(s);
        }
      }
      function bM(e, t) {
        null !== e.hostBindings && e.hostBindings(1, t);
      }
      function tl(e, t, n) {
        (t.componentOffset = n), (e.components ??= []).push(t.index);
      }
      function TM(e, t, n) {
        if (n) {
          if (t.exportAs)
            for (let r = 0; r < t.exportAs.length; r++) n[t.exportAs[r]] = e;
          vt(t) && (n[""] = e);
        }
      }
      function RM(e, t, n, r, o) {
        e.data[r] = o;
        const i = o.factory || (o.factory = xn(o.type)),
          s = new No(i, vt(o), M);
        (e.blueprint[r] = s),
          (n[r] = s),
          (function EM(e, t, n, r, o) {
            const i = o.hostBindings;
            if (i) {
              let s = e.hostBindingOpCodes;
              null === s && (s = e.hostBindingOpCodes = []);
              const a = ~t.index;
              (function _M(e) {
                let t = e.length;
                for (; t > 0; ) {
                  const n = e[--t];
                  if ("number" == typeof n && n < 0) return n;
                }
                return 0;
              })(s) != a && s.push(a),
                s.push(n, r, i);
            }
          })(e, t, r, Yo(e, n, o.hostVars, F), o);
      }
      function xM(e, t, n, r, o, i) {
        const s = i[t];
        if (null !== s)
          for (let a = 0; a < s.length; ) sm(r, n, s[a++], s[a++], s[a++]);
      }
      function sm(e, t, n, r, o) {
        const i = it(null);
        try {
          const s = e.inputTransforms;
          null !== s && s.hasOwnProperty(r) && (o = s[r].call(t, o)),
            null !== e.setInput ? e.setInput(t, o, n, r) : (t[r] = o);
        } finally {
          it(i);
        }
      }
      function OM(e, t, n) {
        let r = null,
          o = 0;
        for (; o < n.length; ) {
          const i = n[o];
          if (0 !== i)
            if (5 !== i) {
              if ("number" == typeof i) break;
              if (e.hasOwnProperty(i)) {
                null === r && (r = []);
                const s = e[i];
                for (let a = 0; a < s.length; a += 2)
                  if (s[a] === t) {
                    r.push(i, s[a + 1], n[o + 1]);
                    break;
                  }
              }
              o += 2;
            } else o += 2;
          else o += 4;
        }
        return r;
      }
      function am(e, t, n, r) {
        return [e, !0, !1, t, null, 0, r, n, null, null, null];
      }
      function um(e, t) {
        const n = e.contentQueries;
        if (null !== n)
          for (let r = 0; r < n.length; r += 2) {
            const i = n[r + 1];
            if (-1 !== i) {
              const s = e.data[i];
              Bu(n[r]), s.contentQueries(2, t[i], i);
            }
          }
      }
      function qs(e, t) {
        return e[Co] ? (e[hh][mt] = t) : (e[Co] = t), (e[hh] = t), t;
      }
      function rl(e, t, n) {
        Bu(0);
        const r = it(null);
        try {
          t(e, n);
        } finally {
          it(r);
        }
      }
      function fm(e, t) {
        const n = e[dn],
          r = n ? n.get(Wt, null) : null;
        r && r.handleError(t);
      }
      function ol(e, t, n, r, o) {
        for (let i = 0; i < n.length; ) {
          const s = n[i++],
            a = n[i++];
          sm(e.data[s], t[s], r, a, o);
        }
      }
      function Yt(e, t, n) {
        const r = (function ns(e, t) {
          return K(t[e]);
        })(t, e);
        !(function Hp(e, t, n) {
          e.setValue(t, n);
        })(e[P], r, n);
      }
      function PM(e, t) {
        const n = Qe(t, e),
          r = n[C];
        !(function FM(e, t) {
          for (let n = t.length; n < e.blueprint.length; n++)
            t.push(e.blueprint[n]);
        })(r, n);
        const o = n[ie];
        null !== o && null === n[Ut] && (n[Ut] = jc(o, n[dn])), il(r, n, n[ue]);
      }
      function il(e, t, n) {
        Uu(t);
        try {
          const r = e.viewQuery;
          null !== r && rl(1, r, n);
          const o = e.template;
          null !== o && Kg(e, t, o, 1, n),
            e.firstCreatePass && (e.firstCreatePass = !1),
            e.staticContentQueries && um(e, t),
            e.staticViewQueries && rl(2, e.viewQuery, n);
          const i = e.components;
          null !== i &&
            (function kM(e, t) {
              for (let n = 0; n < t.length; n++) PM(e, t[n]);
            })(t, i);
        } catch (r) {
          throw (
            (e.firstCreatePass &&
              ((e.incompleteFirstPass = !0), (e.firstCreatePass = !1)),
            r)
          );
        } finally {
          (t[k] &= -5), zu();
        }
      }
      let hm = (() => {
        class e {
          constructor() {
            (this.all = new Set()), (this.queue = new Map());
          }
          create(n, r, o) {
            const i = typeof Zone > "u" ? null : Zone.current,
              s = (function W_(e, t, n) {
                const r = Object.create(Z_);
                n && (r.consumerAllowSignalWrites = !0),
                  (r.fn = e),
                  (r.schedule = t);
                const o = (s) => {
                  r.cleanupFn = s;
                };
                return (
                  (r.ref = {
                    notify: () => Eh(r),
                    run: () => {
                      if (((r.dirty = !1), r.hasRun && !_h(r))) return;
                      r.hasRun = !0;
                      const s = xu(r);
                      try {
                        r.cleanupFn(), (r.cleanupFn = Nh), r.fn(o);
                      } finally {
                        Ou(r, s);
                      }
                    },
                    cleanup: () => r.cleanupFn(),
                  }),
                  r.ref
                );
              })(
                n,
                (c) => {
                  this.all.has(c) && this.queue.set(c, i);
                },
                o
              );
            let a;
            this.all.add(s), s.notify();
            const u = () => {
              s.cleanup(), a?.(), this.all.delete(s), this.queue.delete(s);
            };
            return (a = r?.onDestroy(u)), { destroy: u };
          }
          flush() {
            if (0 !== this.queue.size)
              for (const [n, r] of this.queue)
                this.queue.delete(n), r ? r.run(() => n.run()) : n.run();
          }
          get isQueueEmpty() {
            return 0 === this.queue.size;
          }
          static #e = (this.ɵprov = S({
            token: e,
            providedIn: "root",
            factory: () => new e(),
          }));
        }
        return e;
      })();
      function Ws(e, t, n) {
        let r = n ? e.styles : null,
          o = n ? e.classes : null,
          i = 0;
        if (null !== t)
          for (let s = 0; s < t.length; s++) {
            const a = t[s];
            "number" == typeof a
              ? (i = a)
              : 1 == i
              ? (o = fu(o, a))
              : 2 == i && (r = fu(r, a + ": " + t[++s] + ";"));
          }
        n ? (e.styles = r) : (e.stylesWithoutHost = r),
          n ? (e.classes = o) : (e.classesWithoutHost = o);
      }
      function Qo(e, t, n, r, o = !1) {
        for (; null !== n; ) {
          const i = t[n.index];
          null !== i && r.push(K(i)), xe(i) && pm(i, r);
          const s = n.type;
          if (8 & s) Qo(e, t, n.child, r);
          else if (32 & s) {
            const a = uc(n, t);
            let u;
            for (; (u = a()); ) r.push(u);
          } else if (16 & s) {
            const a = Yp(t, n);
            if (Array.isArray(a)) r.push(...a);
            else {
              const u = $o(t[ce]);
              Qo(u[C], u, a, r, !0);
            }
          }
          n = o ? n.projectionNext : n.next;
        }
        return r;
      }
      function pm(e, t) {
        for (let n = Ee; n < e.length; n++) {
          const r = e[n],
            o = r[C].firstChild;
          null !== o && Qo(r[C], r, o, t);
        }
        e[Tt] !== e[ie] && t.push(e[Tt]);
      }
      function Zs(e, t, n, r = !0) {
        const o = t[ir],
          i = o.rendererFactory,
          s = o.afterRenderEventManager;
        i.begin?.(), s?.begin();
        try {
          gm(e, t, e.template, n);
        } catch (u) {
          throw (r && fm(t, u), u);
        } finally {
          i.end?.(), o.effectManager?.flush(), s?.end();
        }
      }
      function gm(e, t, n, r) {
        const o = t[k];
        if (256 != (256 & o)) {
          t[ir].effectManager?.flush(), Uu(t);
          try {
            jh(t),
              (function qh(e) {
                return (N.lFrame.bindingIndex = e);
              })(e.bindingStartIndex),
              null !== n && Kg(e, t, n, 2, r);
            const s = 3 == (3 & o);
            if (s) {
              const c = e.preOrderCheckHooks;
              null !== c && is(t, c, null);
            } else {
              const c = e.preOrderHooks;
              null !== c && ss(t, c, 0, null), Gu(t, 0);
            }
            if (
              ((function $M(e) {
                for (let t = Lp(e); null !== t; t = jp(t)) {
                  if (!t[gh]) continue;
                  const n = t[ur];
                  for (let r = 0; r < n.length; r++) {
                    oI(n[r]);
                  }
                }
              })(t),
              mm(t, 2),
              null !== e.contentQueries && um(e, t),
              s)
            ) {
              const c = e.contentCheckHooks;
              null !== c && is(t, c);
            } else {
              const c = e.contentHooks;
              null !== c && ss(t, c, 1), Gu(t, 1);
            }
            !(function lM(e, t) {
              const n = e.hostBindingOpCodes;
              if (null === n) return;
              const r = Wg(t, bo);
              try {
                for (let o = 0; o < n.length; o++) {
                  const i = n[o];
                  if (i < 0) Pn(~i);
                  else {
                    const s = i,
                      a = n[++o],
                      u = n[++o];
                    mI(a, s), (r.dirty = !1);
                    const c = xu(r);
                    try {
                      u(2, t[s]);
                    } finally {
                      Ou(r, c);
                    }
                  }
                }
              } finally {
                null === t[bo] && Zg(t, bo), Pn(-1);
              }
            })(e, t);
            const a = e.components;
            null !== a && ym(t, a, 0);
            const u = e.viewQuery;
            if ((null !== u && rl(2, u, r), s)) {
              const c = e.viewCheckHooks;
              null !== c && is(t, c);
            } else {
              const c = e.viewHooks;
              null !== c && ss(t, c, 2), Gu(t, 2);
            }
            !0 === e.firstUpdatePass && (e.firstUpdatePass = !1),
              (t[k] &= -73),
              $h(t);
          } finally {
            zu();
          }
        }
      }
      function mm(e, t) {
        for (let n = Lp(e); null !== n; n = jp(n))
          for (let r = Ee; r < n.length; r++) vm(n[r], t);
      }
      function HM(e, t, n) {
        vm(Qe(t, e), n);
      }
      function vm(e, t) {
        if (
          !(function nI(e) {
            return 128 == (128 & e[k]);
          })(e)
        )
          return;
        const n = e[C],
          r = e[k];
        if ((80 & r && 0 === t) || 1024 & r || 2 === t)
          gm(n, e, n.template, e[ue]);
        else if (e[wo] > 0) {
          mm(e, 1);
          const o = n.components;
          null !== o && ym(e, o, 1);
        }
      }
      function ym(e, t, n) {
        for (let r = 0; r < t.length; r++) HM(e, t[r], n);
      }
      class Xo {
        get rootNodes() {
          const t = this._lView,
            n = t[C];
          return Qo(n, t, n.firstChild, []);
        }
        constructor(t, n) {
          (this._lView = t),
            (this._cdRefInjectingView = n),
            (this._appRef = null),
            (this._attachedToViewContainer = !1);
        }
        get context() {
          return this._lView[ue];
        }
        set context(t) {
          this._lView[ue] = t;
        }
        get destroyed() {
          return 256 == (256 & this._lView[k]);
        }
        destroy() {
          if (this._appRef) this._appRef.detachView(this);
          else if (this._attachedToViewContainer) {
            const t = this._lView[re];
            if (xe(t)) {
              const n = t[8],
                r = n ? n.indexOf(this) : -1;
              r > -1 && (Is(t, r), fs(n, r));
            }
            this._attachedToViewContainer = !1;
          }
          lc(this._lView[C], this._lView);
        }
        onDestroy(t) {
          !(function Vh(e, t) {
            if (256 == (256 & e[k])) throw new w(911, !1);
            null === e[fn] && (e[fn] = []), e[fn].push(t);
          })(this._lView, t);
        }
        markForCheck() {
          Zo(this._cdRefInjectingView || this._lView);
        }
        detach() {
          this._lView[k] &= -129;
        }
        reattach() {
          this._lView[k] |= 128;
        }
        detectChanges() {
          Zs(this._lView[C], this._lView, this.context);
        }
        checkNoChanges() {}
        attachToViewContainerRef() {
          if (this._appRef) throw new w(902, !1);
          this._attachedToViewContainer = !0;
        }
        detachFromAppRef() {
          (this._appRef = null),
            (function Rb(e, t) {
              Vo(e, t, t[P], 2, null, null);
            })(this._lView[C], this._lView);
        }
        attachToAppRef(t) {
          if (this._attachedToViewContainer) throw new w(902, !1);
          this._appRef = t;
        }
      }
      class VM extends Xo {
        constructor(t) {
          super(t), (this._view = t);
        }
        detectChanges() {
          const t = this._view;
          Zs(t[C], t, t[ue], !1);
        }
        checkNoChanges() {}
        get context() {
          return null;
        }
      }
      class Dm extends Hs {
        constructor(t) {
          super(), (this.ngModule = t);
        }
        resolveComponentFactory(t) {
          const n = V(t);
          return new Jo(n, this.ngModule);
        }
      }
      function wm(e) {
        const t = [];
        for (let n in e)
          e.hasOwnProperty(n) && t.push({ propName: e[n], templateName: n });
        return t;
      }
      class UM {
        constructor(t, n) {
          (this.injector = t), (this.parentInjector = n);
        }
        get(t, n, r) {
          r = Zi(r);
          const o = this.injector.get(t, Vc, r);
          return o !== Vc || n === Vc ? o : this.parentInjector.get(t, n, r);
        }
      }
      class Jo extends bg {
        get inputs() {
          const t = this.componentDef,
            n = t.inputTransforms,
            r = wm(t.inputs);
          if (null !== n)
            for (const o of r)
              n.hasOwnProperty(o.propName) && (o.transform = n[o.propName]);
          return r;
        }
        get outputs() {
          return wm(this.componentDef.outputs);
        }
        constructor(t, n) {
          super(),
            (this.componentDef = t),
            (this.ngModule = n),
            (this.componentType = t.type),
            (this.selector = (function T_(e) {
              return e.map(M_).join(",");
            })(t.selectors)),
            (this.ngContentSelectors = t.ngContentSelectors
              ? t.ngContentSelectors
              : []),
            (this.isBoundToModule = !!n);
        }
        create(t, n, r, o) {
          let i = (o = o || this.ngModule) instanceof Je ? o : o?.injector;
          i &&
            null !== this.componentDef.getStandaloneInjector &&
            (i = this.componentDef.getStandaloneInjector(i) || i);
          const s = i ? new UM(t, i) : t,
            a = s.get(Mg, null);
          if (null === a) throw new w(407, !1);
          const d = {
              rendererFactory: a,
              sanitizer: s.get($S, null),
              effectManager: s.get(hm, null),
              afterRenderEventManager: s.get(Zc, null),
            },
            f = a.createRenderer(null, this.componentDef),
            h = this.componentDef.selectors[0][0] || "div",
            p = r
              ? (function fM(e, t, n, r) {
                  const i = r.get(Ug, !1) || n === pt.ShadowDom,
                    s = e.selectRootElement(t, i);
                  return (
                    (function hM(e) {
                      tm(e);
                    })(s),
                    s
                  );
                })(f, r, this.componentDef.encapsulation, s)
              : _s(
                  f,
                  h,
                  (function BM(e) {
                    const t = e.toLowerCase();
                    return "svg" === t ? "svg" : "math" === t ? "math" : null;
                  })(h)
                ),
            D = this.componentDef.signals
              ? 4608
              : this.componentDef.onPush
              ? 576
              : 528;
          let m = null;
          null !== p && (m = jc(p, s, !0));
          const E = Kc(0, null, null, 1, 0, null, null, null, null, null, null),
            T = Gs(null, E, null, D, null, null, d, f, s, null, m);
          let j, De;
          Uu(T);
          try {
            const $t = this.componentDef;
            let er,
              Df = null;
            $t.findHostDirectiveDefs
              ? ((er = []),
                (Df = new Map()),
                $t.findHostDirectiveDefs($t, er, Df),
                er.push($t))
              : (er = [$t]);
            const qk = (function GM(e, t) {
                const n = e[C],
                  r = H;
                return (e[r] = t), Pr(n, r, 2, "#host", null);
              })(T, p),
              Wk = (function qM(e, t, n, r, o, i, s) {
                const a = o[C];
                !(function WM(e, t, n, r) {
                  for (const o of e)
                    t.mergedAttrs = yo(t.mergedAttrs, o.hostAttrs);
                  null !== t.mergedAttrs &&
                    (Ws(t, t.mergedAttrs, !0), null !== n && Kp(r, n, t));
                })(r, e, t, s);
                let u = null;
                null !== t && (u = jc(t, o[dn]));
                const c = i.rendererFactory.createRenderer(t, n);
                let l = 16;
                n.signals ? (l = 4096) : n.onPush && (l = 64);
                const d = Gs(
                  o,
                  em(n),
                  null,
                  l,
                  o[e.index],
                  e,
                  i,
                  c,
                  null,
                  null,
                  u
                );
                return (
                  a.firstCreatePass && tl(a, e, r.length - 1),
                  qs(o, d),
                  (o[e.index] = d)
                );
              })(qk, p, $t, er, T, d, f);
            (De = Lh(E, H)),
              p &&
                (function YM(e, t, n, r) {
                  if (r) Mu(e, n, ["ng-version", HS.full]);
                  else {
                    const { attrs: o, classes: i } = (function A_(e) {
                      const t = [],
                        n = [];
                      let r = 1,
                        o = 2;
                      for (; r < e.length; ) {
                        let i = e[r];
                        if ("string" == typeof i)
                          2 === o
                            ? "" !== i && t.push(i, e[++r])
                            : 8 === o && n.push(i);
                        else {
                          if (!gt(o)) break;
                          o = i;
                        }
                        r++;
                      }
                      return { attrs: t, classes: n };
                    })(t.selectors[0]);
                    o && Mu(e, n, o),
                      i && i.length > 0 && Jp(e, n, i.join(" "));
                  }
                })(f, $t, p, r),
              void 0 !== n &&
                (function QM(e, t, n) {
                  const r = (e.projection = []);
                  for (let o = 0; o < t.length; o++) {
                    const i = n[o];
                    r.push(null != i ? Array.from(i) : null);
                  }
                })(De, this.ngContentSelectors, n),
              (j = (function ZM(e, t, n, r, o, i) {
                const s = Ie(),
                  a = o[C],
                  u = Ue(s, o);
                om(a, o, s, n, null, r);
                for (let l = 0; l < n.length; l++)
                  Me(Fn(o, a, s.directiveStart + l, s), o);
                im(a, o, s), u && Me(u, o);
                const c = Fn(o, a, s.directiveStart + s.componentOffset, s);
                if (((e[ue] = o[ue] = c), null !== i))
                  for (const l of i) l(c, t);
                return Qc(a, s, e), c;
              })(Wk, $t, er, Df, T, [XM])),
              il(E, T, null);
          } finally {
            zu();
          }
          return new zM(this.componentType, j, Nr(De, T), T, De);
        }
      }
      class zM extends OS {
        constructor(t, n, r, o, i) {
          super(),
            (this.location = r),
            (this._rootLView = o),
            (this._tNode = i),
            (this.previousInputValues = null),
            (this.instance = n),
            (this.hostView = this.changeDetectorRef = new VM(o)),
            (this.componentType = t);
        }
        setInput(t, n) {
          const r = this._tNode.inputs;
          let o;
          if (null !== r && (o = r[t])) {
            if (
              ((this.previousInputValues ??= new Map()),
              this.previousInputValues.has(t) &&
                Object.is(this.previousInputValues.get(t), n))
            )
              return;
            const i = this._rootLView;
            ol(i[C], i, o, t, n),
              this.previousInputValues.set(t, n),
              Zo(Qe(this._tNode.index, i));
          }
        }
        get injector() {
          return new Fe(this._tNode, this._rootLView);
        }
        destroy() {
          this.hostView.destroy();
        }
        onDestroy(t) {
          this.hostView.onDestroy(t);
        }
      }
      function XM() {
        const e = Ie();
        os(y()[C], e);
      }
      function Qs(e) {
        return (
          !!(function sl(e) {
            return (
              null !== e && ("function" == typeof e || "object" == typeof e)
            );
          })(e) &&
          (Array.isArray(e) || (!(e instanceof Map) && Symbol.iterator in e))
        );
      }
      function Te(e, t, n) {
        return !Object.is(e[t], n) && ((e[t] = n), !0);
      }
      function kr(e, t, n, r) {
        return Te(e, fr(), n) ? t + O(n) + r : F;
      }
      function Hn(e, t, n, r, o, i, s, a) {
        const u = y(),
          c = B(),
          l = e + H,
          d = c.firstCreatePass
            ? (function M0(e, t, n, r, o, i, s, a, u) {
                const c = t.consts,
                  l = Pr(t, e, 4, s || null, pn(c, a));
                el(t, n, l, pn(c, u)), os(t, l);
                const d = (l.tView = Kc(
                  2,
                  l,
                  r,
                  o,
                  i,
                  t.directiveRegistry,
                  t.pipeRegistry,
                  null,
                  t.schemas,
                  c,
                  null
                ));
                return (
                  null !== t.queries &&
                    (t.queries.template(t, l),
                    (d.queries = t.queries.embeddedTView(l))),
                  l
                );
              })(l, c, u, t, n, r, o, i, s)
            : c.data[l];
        Rt(d, !1);
        const f = $m(c, u, d, e);
        rs() && Ss(c, u, f, d),
          Me(f, u),
          qs(u, (u[l] = am(f, u, f, d))),
          Ki(d) && Xc(c, u, d),
          null != s && Jc(u, d, a);
      }
      let $m = function Hm(e, t, n, r) {
        return gn(!0), t[P].createComment("");
      };
      function hl(e) {
        return (function lr(e, t) {
          return e[t];
        })(
          (function pI() {
            return N.lFrame.contextLView;
          })(),
          H + e
        );
      }
      function Dn(e, t, n) {
        const r = y();
        return Te(r, fr(), t) && Ke(B(), oe(), r, e, t, r[P], n, !1), Dn;
      }
      function pl(e, t, n, r, o) {
        const s = o ? "class" : "style";
        ol(e, n, t.inputs[s], s, r);
      }
      function ye(e, t, n, r) {
        const o = y(),
          i = B(),
          s = H + e,
          a = o[P],
          u = i.firstCreatePass
            ? (function N0(e, t, n, r, o, i) {
                const s = t.consts,
                  u = Pr(t, e, 2, r, pn(s, o));
                return (
                  el(t, n, u, pn(s, i)),
                  null !== u.attrs && Ws(u, u.attrs, !1),
                  null !== u.mergedAttrs && Ws(u, u.mergedAttrs, !0),
                  null !== t.queries && t.queries.elementStart(t, u),
                  u
                );
              })(s, i, o, t, n, r)
            : i.data[s],
          c = Vm(i, o, u, a, t, e);
        o[s] = c;
        const l = Ki(u);
        return (
          Rt(u, !0),
          Kp(a, c, u),
          32 != (32 & u.flags) && rs() && Ss(i, o, c, u),
          0 ===
            (function sI() {
              return N.lFrame.elementDepthCount;
            })() && Me(c, o),
          (function aI() {
            N.lFrame.elementDepthCount++;
          })(),
          l && (Xc(i, o, u), Qc(i, u, o)),
          null !== r && Jc(o, u),
          ye
        );
      }
      function be() {
        let e = Ie();
        ju()
          ? (function $u() {
              N.lFrame.isParent = !1;
            })()
          : ((e = e.parent), Rt(e, !1));
        const t = e;
        (function cI(e) {
          return N.skipHydrationRootTNode === e;
        })(t) &&
          (function hI() {
            N.skipHydrationRootTNode = null;
          })(),
          (function uI() {
            N.lFrame.elementDepthCount--;
          })();
        const n = B();
        return (
          n.firstCreatePass && (os(n, e), Au(e) && n.queries.elementEnd(e)),
          null != t.classesWithoutHost &&
            (function TI(e) {
              return 0 != (8 & e.flags);
            })(t) &&
            pl(n, t, y(), t.classesWithoutHost, !0),
          null != t.stylesWithoutHost &&
            (function AI(e) {
              return 0 != (16 & e.flags);
            })(t) &&
            pl(n, t, y(), t.stylesWithoutHost, !1),
          be
        );
      }
      function Vn(e, t, n, r) {
        return ye(e, t, n, r), be(), Vn;
      }
      let Vm = (e, t, n, r, o, i) => (
        gn(!0),
        _s(
          r,
          o,
          (function ep() {
            return N.lFrame.currentNamespace;
          })()
        )
      );
      function vl() {
        return y();
      }
      function ta(e) {
        return !!e && "function" == typeof e.then;
      }
      function zm(e) {
        return !!e && "function" == typeof e.subscribe;
      }
      function Bn(e, t, n, r) {
        const o = y(),
          i = B(),
          s = Ie();
        return (
          (function qm(e, t, n, r, o, i, s) {
            const a = Ki(r),
              c =
                e.firstCreatePass &&
                (function lm(e) {
                  return e.cleanup || (e.cleanup = []);
                })(e),
              l = t[ue],
              d = (function cm(e) {
                return e[or] || (e[or] = []);
              })(t);
            let f = !0;
            if (3 & r.type || s) {
              const g = Ue(r, t),
                v = s ? s(g) : g,
                D = d.length,
                m = s ? (T) => s(K(T[r.index])) : r.index;
              let E = null;
              if (
                (!s &&
                  a &&
                  (E = (function L0(e, t, n, r) {
                    const o = e.cleanup;
                    if (null != o)
                      for (let i = 0; i < o.length - 1; i += 2) {
                        const s = o[i];
                        if (s === n && o[i + 1] === r) {
                          const a = t[or],
                            u = o[i + 2];
                          return a.length > u ? a[u] : null;
                        }
                        "string" == typeof s && (i += 2);
                      }
                    return null;
                  })(e, t, o, r.index)),
                null !== E)
              )
                ((E.__ngLastListenerFn__ || E).__ngNextListenerFn__ = i),
                  (E.__ngLastListenerFn__ = i),
                  (f = !1);
              else {
                i = Zm(r, t, l, i, !1);
                const T = n.listen(v, o, i);
                d.push(i, T), c && c.push(o, m, D, D + 1);
              }
            } else i = Zm(r, t, l, i, !1);
            const h = r.outputs;
            let p;
            if (f && null !== h && (p = h[o])) {
              const g = p.length;
              if (g)
                for (let v = 0; v < g; v += 2) {
                  const j = t[p[v]][p[v + 1]].subscribe(i),
                    De = d.length;
                  d.push(i, j), c && c.push(o, r.index, De, -(De + 1));
                }
            }
          })(i, o, o[P], s, e, t, r),
          Bn
        );
      }
      function Wm(e, t, n, r) {
        try {
          return At(6, t, n), !1 !== n(r);
        } catch (o) {
          return fm(e, o), !1;
        } finally {
          At(7, t, n);
        }
      }
      function Zm(e, t, n, r, o) {
        return function i(s) {
          if (s === Function) return r;
          Zo(e.componentOffset > -1 ? Qe(e.index, t) : t);
          let u = Wm(t, n, r, s),
            c = i.__ngNextListenerFn__;
          for (; c; ) (u = Wm(t, n, c, s) && u), (c = c.__ngNextListenerFn__);
          return o && !1 === u && s.preventDefault(), u;
        };
      }
      function Qt(e = 1) {
        return (function DI(e) {
          return (N.lFrame.contextLView = (function wI(e, t) {
            for (; e > 0; ) (t = t[sr]), e--;
            return t;
          })(e, N.lFrame.contextLView))[ue];
        })(e);
      }
      function yl(e, t, n) {
        return Dl(e, "", t, "", n), yl;
      }
      function Dl(e, t, n, r, o) {
        const i = y(),
          s = kr(i, t, n, r);
        return s !== F && Ke(B(), oe(), i, e, s, i[P], o, !1), Dl;
      }
      function Xt(e, t = "") {
        const n = y(),
          r = B(),
          o = e + H,
          i = r.firstCreatePass ? Pr(r, o, 1, t, null) : r.data[o],
          s = yv(r, n, i, t, e);
        (n[o] = s), rs() && Ss(r, n, s, i), Rt(i, !1);
      }
      let yv = (e, t, n, r, o) => (
        gn(!0),
        (function Es(e, t) {
          return e.createText(t);
        })(t[P], r)
      );
      function Il(e) {
        return oi("", e, ""), Il;
      }
      function oi(e, t, n) {
        const r = y(),
          o = kr(r, e, t, n);
        return o !== F && Yt(r, Pe(), o), oi;
      }
      const qr = "en-US";
      let Hv = qr;
      class Gn {}
      class fy {}
      class Nl extends Gn {
        constructor(t, n, r) {
          super(),
            (this._parent = n),
            (this._bootstrapComponents = []),
            (this.destroyCbs = []),
            (this.componentFactoryResolver = new Dm(this));
          const o = Ye(t);
          (this._bootstrapComponents = Zt(o.bootstrap)),
            (this._r3Injector = xg(
              t,
              n,
              [
                { provide: Gn, useValue: this },
                { provide: Hs, useValue: this.componentFactoryResolver },
                ...r,
              ],
              pe(t),
              new Set(["environment"])
            )),
            this._r3Injector.resolveInjectorInitializers(),
            (this.instance = this._r3Injector.get(t));
        }
        get injector() {
          return this._r3Injector;
        }
        destroy() {
          const t = this._r3Injector;
          !t.destroyed && t.destroy(),
            this.destroyCbs.forEach((n) => n()),
            (this.destroyCbs = null);
        }
        onDestroy(t) {
          this.destroyCbs.push(t);
        }
      }
      class xl extends fy {
        constructor(t) {
          super(), (this.moduleType = t);
        }
        create(t) {
          return new Nl(this.moduleType, t, []);
        }
      }
      class hy extends Gn {
        constructor(t) {
          super(),
            (this.componentFactoryResolver = new Dm(this)),
            (this.instance = null);
          const n = new Mr(
            [
              ...t.providers,
              { provide: Gn, useValue: this },
              { provide: Hs, useValue: this.componentFactoryResolver },
            ],
            t.parent || Os(),
            t.debugName,
            new Set(["environment"])
          );
          (this.injector = n),
            t.runEnvironmentInitializers && n.resolveInjectorInitializers();
        }
        destroy() {
          this.injector.destroy();
        }
        onDestroy(t) {
          this.injector.onDestroy(t);
        }
      }
      function Ol(e, t, n = null) {
        return new hy({
          providers: e,
          parent: t,
          debugName: n,
          runEnvironmentInitializers: !0,
        }).injector;
      }
      let OA = (() => {
        class e {
          constructor(n) {
            (this._injector = n), (this.cachedInjectors = new Map());
          }
          getOrCreateStandaloneInjector(n) {
            if (!n.standalone) return null;
            if (!this.cachedInjectors.has(n)) {
              const r = gg(0, n.type),
                o =
                  r.length > 0
                    ? Ol([r], this._injector, `Standalone[${n.type.name}]`)
                    : null;
              this.cachedInjectors.set(n, o);
            }
            return this.cachedInjectors.get(n);
          }
          ngOnDestroy() {
            try {
              for (const n of this.cachedInjectors.values())
                null !== n && n.destroy();
            } finally {
              this.cachedInjectors.clear();
            }
          }
          static #e = (this.ɵprov = S({
            token: e,
            providedIn: "environment",
            factory: () => new e(b(Je)),
          }));
        }
        return e;
      })();
      function py(e) {
        e.getStandaloneInjector = (t) =>
          t.get(OA).getOrCreateStandaloneInjector(e);
      }
      function aR(e, t, n, r = !0) {
        const o = t[C];
        if (
          ((function xb(e, t, n, r) {
            const o = Ee + r,
              i = n.length;
            r > 0 && (n[o - 1][mt] = t),
              r < i - Ee
                ? ((t[mt] = n[o]), mp(n, Ee + r, t))
                : (n.push(t), (t[mt] = null)),
              (t[re] = n);
            const s = t[Eo];
            null !== s &&
              n !== s &&
              (function Ob(e, t) {
                const n = e[ur];
                t[ce] !== t[re][re][ce] && (e[gh] = !0),
                  null === n ? (e[ur] = [t]) : n.push(t);
              })(s, t);
            const a = t[Mt];
            null !== a && a.insertView(e), (t[k] |= 128);
          })(o, t, e, n),
          r)
        ) {
          const i = pc(n, e),
            s = t[P],
            a = bs(s, e[Tt]);
          null !== a &&
            (function Ab(e, t, n, r, o, i) {
              (r[ie] = o), (r[Se] = t), Vo(e, r, n, 1, o, i);
            })(o, e[Se], s, t, a, i);
        }
      }
      Symbol;
      let Jt = (() => {
        class e {
          static #e = (this.__NG_ELEMENT_ID__ = lR);
        }
        return e;
      })();
      const uR = Jt,
        cR = class extends uR {
          constructor(t, n, r) {
            super(),
              (this._declarationLView = t),
              (this._declarationTContainer = n),
              (this.elementRef = r);
          }
          get ssrId() {
            return this._declarationTContainer.tView?.ssrId || null;
          }
          createEmbeddedView(t, n) {
            return this.createEmbeddedViewImpl(t, n);
          }
          createEmbeddedViewImpl(t, n, r) {
            const o = (function sR(e, t, n, r) {
              const o = t.tView,
                a = Gs(
                  e,
                  o,
                  n,
                  4096 & e[k] ? 4096 : 16,
                  null,
                  t,
                  null,
                  null,
                  null,
                  r?.injector ?? null,
                  r?.hydrationInfo ?? null
                );
              a[Eo] = e[t.index];
              const c = e[Mt];
              return (
                null !== c && (a[Mt] = c.createEmbeddedView(o)), il(o, a, n), a
              );
            })(this._declarationLView, this._declarationTContainer, t, {
              injector: n,
              hydrationInfo: r,
            });
            return new Xo(o);
          }
        };
      function lR() {
        return ua(Ie(), y());
      }
      function ua(e, t) {
        return 4 & e.type ? new cR(t, e, Nr(e, t)) : null;
      }
      let Ct = (() => {
        class e {
          static #e = (this.__NG_ELEMENT_ID__ = mR);
        }
        return e;
      })();
      function mR() {
        return (function xy(e, t) {
          let n;
          const r = t[e.index];
          return (
            xe(r)
              ? (n = r)
              : ((n = am(r, t, null, e)), (t[e.index] = n), qs(t, n)),
            Oy(n, t, e, r),
            new Ry(n, e, t)
          );
        })(Ie(), y());
      }
      const vR = Ct,
        Ry = class extends vR {
          constructor(t, n, r) {
            super(),
              (this._lContainer = t),
              (this._hostTNode = n),
              (this._hostLView = r);
          }
          get element() {
            return Nr(this._hostTNode, this._hostLView);
          }
          get injector() {
            return new Fe(this._hostTNode, this._hostLView);
          }
          get parentInjector() {
            const t = cs(this._hostTNode, this._hostLView);
            if (Wu(t)) {
              const n = Oo(t, this._hostLView),
                r = xo(t);
              return new Fe(n[C].data[r + 8], n);
            }
            return new Fe(null, this._hostLView);
          }
          clear() {
            for (; this.length > 0; ) this.remove(this.length - 1);
          }
          get(t) {
            const n = Ny(this._lContainer);
            return (null !== n && n[t]) || null;
          }
          get length() {
            return this._lContainer.length - Ee;
          }
          createEmbeddedView(t, n, r) {
            let o, i;
            "number" == typeof r
              ? (o = r)
              : null != r && ((o = r.index), (i = r.injector));
            const a = t.createEmbeddedViewImpl(n || {}, i, null);
            return this.insertImpl(a, o, false), a;
          }
          createComponent(t, n, r, o, i) {
            const s =
              t &&
              !(function Fo(e) {
                return "function" == typeof e;
              })(t);
            let a;
            if (s) a = n;
            else {
              const g = n || {};
              (a = g.index),
                (r = g.injector),
                (o = g.projectableNodes),
                (i = g.environmentInjector || g.ngModuleRef);
            }
            const u = s ? t : new Jo(V(t)),
              c = r || this.parentInjector;
            if (!i && null == u.ngModule) {
              const v = (s ? c : this.parentInjector).get(Je, null);
              v && (i = v);
            }
            V(u.componentType ?? {});
            const h = u.create(c, o, null, i);
            return this.insertImpl(h.hostView, a, false), h;
          }
          insert(t, n) {
            return this.insertImpl(t, n, !1);
          }
          insertImpl(t, n, r) {
            const o = t._lView;
            if (
              (function rI(e) {
                return xe(e[re]);
              })(o)
            ) {
              const u = this.indexOf(t);
              if (-1 !== u) this.detach(u);
              else {
                const c = o[re],
                  l = new Ry(c, c[Se], c[re]);
                l.detach(l.indexOf(t));
              }
            }
            const s = this._adjustIndex(n),
              a = this._lContainer;
            return (
              aR(a, o, s, !r), t.attachToViewContainerRef(), mp(kl(a), s, t), t
            );
          }
          move(t, n) {
            return this.insert(t, n);
          }
          indexOf(t) {
            const n = Ny(this._lContainer);
            return null !== n ? n.indexOf(t) : -1;
          }
          remove(t) {
            const n = this._adjustIndex(t, -1),
              r = Is(this._lContainer, n);
            r && (fs(kl(this._lContainer), n), lc(r[C], r));
          }
          detach(t) {
            const n = this._adjustIndex(t, -1),
              r = Is(this._lContainer, n);
            return r && null != fs(kl(this._lContainer), n) ? new Xo(r) : null;
          }
          _adjustIndex(t, n = 0) {
            return t ?? this.length + n;
          }
        };
      function Ny(e) {
        return e[8];
      }
      function kl(e) {
        return e[8] || (e[8] = []);
      }
      let Oy = function Py(e, t, n, r) {
        if (e[Tt]) return;
        let o;
        (o =
          8 & n.type
            ? K(r)
            : (function yR(e, t) {
                const n = e[P],
                  r = n.createComment(""),
                  o = Ue(t, e);
                return (
                  kn(
                    n,
                    bs(n, o),
                    r,
                    (function Lb(e, t) {
                      return e.nextSibling(t);
                    })(n, o),
                    !1
                  ),
                  r
                );
              })(t, n)),
          (e[Tt] = o);
      };
      function Bl(e, t) {
        return ua(e, t);
      }
      const Zl = new I("Application Initializer");
      let Yl = (() => {
          class e {
            constructor() {
              (this.initialized = !1),
                (this.done = !1),
                (this.donePromise = new Promise((n, r) => {
                  (this.resolve = n), (this.reject = r);
                })),
                (this.appInits = _(Zl, { optional: !0 }) ?? []);
            }
            runInitializers() {
              if (this.initialized) return;
              const n = [];
              for (const o of this.appInits) {
                const i = o();
                if (ta(i)) n.push(i);
                else if (zm(i)) {
                  const s = new Promise((a, u) => {
                    i.subscribe({ complete: a, error: u });
                  });
                  n.push(s);
                }
              }
              const r = () => {
                (this.done = !0), this.resolve();
              };
              Promise.all(n)
                .then(() => {
                  r();
                })
                .catch((o) => {
                  this.reject(o);
                }),
                0 === n.length && r(),
                (this.initialized = !0);
            }
            static #e = (this.ɵfac = function (r) {
              return new (r || e)();
            });
            static #t = (this.ɵprov = S({
              token: e,
              factory: e.ɵfac,
              providedIn: "root",
            }));
          }
          return e;
        })(),
        iD = (() => {
          class e {
            log(n) {
              console.log(n);
            }
            warn(n) {
              console.warn(n);
            }
            static #e = (this.ɵfac = function (r) {
              return new (r || e)();
            });
            static #t = (this.ɵprov = S({
              token: e,
              factory: e.ɵfac,
              providedIn: "platform",
            }));
          }
          return e;
        })();
      const Kt = new I("LocaleId", {
        providedIn: "root",
        factory: () =>
          _(Kt, $.Optional | $.SkipSelf) ||
          (function ZR() {
            return (typeof $localize < "u" && $localize.locale) || qr;
          })(),
      });
      let da = (() => {
        class e {
          constructor() {
            (this.taskId = 0),
              (this.pendingTasks = new Set()),
              (this.hasPendingTasks = new rt(!1));
          }
          add() {
            this.hasPendingTasks.next(!0);
            const n = this.taskId++;
            return this.pendingTasks.add(n), n;
          }
          remove(n) {
            this.pendingTasks.delete(n),
              0 === this.pendingTasks.size && this.hasPendingTasks.next(!1);
          }
          ngOnDestroy() {
            this.pendingTasks.clear(), this.hasPendingTasks.next(!1);
          }
          static #e = (this.ɵfac = function (r) {
            return new (r || e)();
          });
          static #t = (this.ɵprov = S({
            token: e,
            factory: e.ɵfac,
            providedIn: "root",
          }));
        }
        return e;
      })();
      class XR {
        constructor(t, n) {
          (this.ngModuleFactory = t), (this.componentFactories = n);
        }
      }
      let sD = (() => {
        class e {
          compileModuleSync(n) {
            return new xl(n);
          }
          compileModuleAsync(n) {
            return Promise.resolve(this.compileModuleSync(n));
          }
          compileModuleAndAllComponentsSync(n) {
            const r = this.compileModuleSync(n),
              i = Zt(Ye(n).declarations).reduce((s, a) => {
                const u = V(a);
                return u && s.push(new Jo(u)), s;
              }, []);
            return new XR(r, i);
          }
          compileModuleAndAllComponentsAsync(n) {
            return Promise.resolve(this.compileModuleAndAllComponentsSync(n));
          }
          clearCache() {}
          clearCacheFor(n) {}
          getModuleId(n) {}
          static #e = (this.ɵfac = function (r) {
            return new (r || e)();
          });
          static #t = (this.ɵprov = S({
            token: e,
            factory: e.ɵfac,
            providedIn: "root",
          }));
        }
        return e;
      })();
      const lD = new I(""),
        ha = new I("");
      let ed,
        Jl = (() => {
          class e {
            constructor(n, r, o) {
              (this._ngZone = n),
                (this.registry = r),
                (this._pendingCount = 0),
                (this._isZoneStable = !0),
                (this._didWork = !1),
                (this._callbacks = []),
                (this.taskTrackingZone = null),
                ed ||
                  ((function DN(e) {
                    ed = e;
                  })(o),
                  o.addToWindow(r)),
                this._watchAngularEvents(),
                n.run(() => {
                  this.taskTrackingZone =
                    typeof Zone > "u"
                      ? null
                      : Zone.current.get("TaskTrackingZone");
                });
            }
            _watchAngularEvents() {
              this._ngZone.onUnstable.subscribe({
                next: () => {
                  (this._didWork = !0), (this._isZoneStable = !1);
                },
              }),
                this._ngZone.runOutsideAngular(() => {
                  this._ngZone.onStable.subscribe({
                    next: () => {
                      ee.assertNotInAngularZone(),
                        queueMicrotask(() => {
                          (this._isZoneStable = !0),
                            this._runCallbacksIfReady();
                        });
                    },
                  });
                });
            }
            increasePendingRequestCount() {
              return (
                (this._pendingCount += 1),
                (this._didWork = !0),
                this._pendingCount
              );
            }
            decreasePendingRequestCount() {
              if (((this._pendingCount -= 1), this._pendingCount < 0))
                throw new Error("pending async requests below zero");
              return this._runCallbacksIfReady(), this._pendingCount;
            }
            isStable() {
              return (
                this._isZoneStable &&
                0 === this._pendingCount &&
                !this._ngZone.hasPendingMacrotasks
              );
            }
            _runCallbacksIfReady() {
              if (this.isStable())
                queueMicrotask(() => {
                  for (; 0 !== this._callbacks.length; ) {
                    let n = this._callbacks.pop();
                    clearTimeout(n.timeoutId), n.doneCb(this._didWork);
                  }
                  this._didWork = !1;
                });
              else {
                let n = this.getPendingTasks();
                (this._callbacks = this._callbacks.filter(
                  (r) =>
                    !r.updateCb ||
                    !r.updateCb(n) ||
                    (clearTimeout(r.timeoutId), !1)
                )),
                  (this._didWork = !0);
              }
            }
            getPendingTasks() {
              return this.taskTrackingZone
                ? this.taskTrackingZone.macroTasks.map((n) => ({
                    source: n.source,
                    creationLocation: n.creationLocation,
                    data: n.data,
                  }))
                : [];
            }
            addCallback(n, r, o) {
              let i = -1;
              r &&
                r > 0 &&
                (i = setTimeout(() => {
                  (this._callbacks = this._callbacks.filter(
                    (s) => s.timeoutId !== i
                  )),
                    n(this._didWork, this.getPendingTasks());
                }, r)),
                this._callbacks.push({ doneCb: n, timeoutId: i, updateCb: o });
            }
            whenStable(n, r, o) {
              if (o && !this.taskTrackingZone)
                throw new Error(
                  'Task tracking zone is required when passing an update callback to whenStable(). Is "zone.js/plugins/task-tracking" loaded?'
                );
              this.addCallback(n, r, o), this._runCallbacksIfReady();
            }
            getPendingRequestCount() {
              return this._pendingCount;
            }
            registerApplication(n) {
              this.registry.registerApplication(n, this);
            }
            unregisterApplication(n) {
              this.registry.unregisterApplication(n);
            }
            findProviders(n, r, o) {
              return [];
            }
            static #e = (this.ɵfac = function (r) {
              return new (r || e)(b(ee), b(Kl), b(ha));
            });
            static #t = (this.ɵprov = S({ token: e, factory: e.ɵfac }));
          }
          return e;
        })(),
        Kl = (() => {
          class e {
            constructor() {
              this._applications = new Map();
            }
            registerApplication(n, r) {
              this._applications.set(n, r);
            }
            unregisterApplication(n) {
              this._applications.delete(n);
            }
            unregisterAllApplications() {
              this._applications.clear();
            }
            getTestability(n) {
              return this._applications.get(n) || null;
            }
            getAllTestabilities() {
              return Array.from(this._applications.values());
            }
            getAllRootElements() {
              return Array.from(this._applications.keys());
            }
            findTestabilityInTree(n, r = !0) {
              return ed?.findTestabilityInTree(this, n, r) ?? null;
            }
            static #e = (this.ɵfac = function (r) {
              return new (r || e)();
            });
            static #t = (this.ɵprov = S({
              token: e,
              factory: e.ɵfac,
              providedIn: "platform",
            }));
          }
          return e;
        })(),
        Cn = null;
      const dD = new I("AllowMultipleToken"),
        td = new I("PlatformDestroyListeners"),
        nd = new I("appBootstrapListener");
      class hD {
        constructor(t, n) {
          (this.name = t), (this.token = n);
        }
      }
      function gD(e, t, n = []) {
        const r = `Platform: ${t}`,
          o = new I(r);
        return (i = []) => {
          let s = rd();
          if (!s || s.injector.get(dD, !1)) {
            const a = [...n, ...i, { provide: o, useValue: !0 }];
            e
              ? e(a)
              : (function EN(e) {
                  if (Cn && !Cn.get(dD, !1)) throw new w(400, !1);
                  (function fD() {
                    !(function B_(e) {
                      Mh = e;
                    })(() => {
                      throw new w(600, !1);
                    });
                  })(),
                    (Cn = e);
                  const t = e.get(vD);
                  (function pD(e) {
                    e.get(wg, null)?.forEach((n) => n());
                  })(e);
                })(
                  (function mD(e = [], t) {
                    return at.create({
                      name: t,
                      providers: [
                        { provide: Mc, useValue: "platform" },
                        { provide: td, useValue: new Set([() => (Cn = null)]) },
                        ...e,
                      ],
                    });
                  })(a, r)
                );
          }
          return (function IN(e) {
            const t = rd();
            if (!t) throw new w(401, !1);
            return t;
          })();
        };
      }
      function rd() {
        return Cn?.get(vD) ?? null;
      }
      let vD = (() => {
        class e {
          constructor(n) {
            (this._injector = n),
              (this._modules = []),
              (this._destroyListeners = []),
              (this._destroyed = !1);
          }
          bootstrapModuleFactory(n, r) {
            const o = (function bN(e = "zone.js", t) {
              return "noop" === e ? new JS() : "zone.js" === e ? new ee(t) : e;
            })(
              r?.ngZone,
              (function yD(e) {
                return {
                  enableLongStackTrace: !1,
                  shouldCoalesceEventChangeDetection: e?.eventCoalescing ?? !1,
                  shouldCoalesceRunChangeDetection: e?.runCoalescing ?? !1,
                };
              })({
                eventCoalescing: r?.ngZoneEventCoalescing,
                runCoalescing: r?.ngZoneRunCoalescing,
              })
            );
            return o.run(() => {
              const i = (function xA(e, t, n) {
                  return new Nl(e, t, n);
                })(
                  n.moduleType,
                  this.injector,
                  (function _D(e) {
                    return [
                      { provide: ee, useFactory: e },
                      {
                        provide: Go,
                        multi: !0,
                        useFactory: () => {
                          const t = _(MN, { optional: !0 });
                          return () => t.initialize();
                        },
                      },
                      { provide: ED, useFactory: SN },
                      { provide: Lg, useFactory: jg },
                    ];
                  })(() => o)
                ),
                s = i.injector.get(Wt, null);
              return (
                o.runOutsideAngular(() => {
                  const a = o.onError.subscribe({
                    next: (u) => {
                      s.handleError(u);
                    },
                  });
                  i.onDestroy(() => {
                    pa(this._modules, i), a.unsubscribe();
                  });
                }),
                (function DD(e, t, n) {
                  try {
                    const r = n();
                    return ta(r)
                      ? r.catch((o) => {
                          throw (
                            (t.runOutsideAngular(() => e.handleError(o)), o)
                          );
                        })
                      : r;
                  } catch (r) {
                    throw (t.runOutsideAngular(() => e.handleError(r)), r);
                  }
                })(s, o, () => {
                  const a = i.injector.get(Yl);
                  return (
                    a.runInitializers(),
                    a.donePromise.then(
                      () => (
                        (function Vv(e) {
                          ot(e, "Expected localeId to be defined"),
                            "string" == typeof e &&
                              (Hv = e.toLowerCase().replace(/_/g, "-"));
                        })(i.injector.get(Kt, qr) || qr),
                        this._moduleDoBootstrap(i),
                        i
                      )
                    )
                  );
                })
              );
            });
          }
          bootstrapModule(n, r = []) {
            const o = wD({}, r);
            return (function wN(e, t, n) {
              const r = new xl(n);
              return Promise.resolve(r);
            })(0, 0, n).then((i) => this.bootstrapModuleFactory(i, o));
          }
          _moduleDoBootstrap(n) {
            const r = n.injector.get(Yr);
            if (n._bootstrapComponents.length > 0)
              n._bootstrapComponents.forEach((o) => r.bootstrap(o));
            else {
              if (!n.instance.ngDoBootstrap) throw new w(-403, !1);
              n.instance.ngDoBootstrap(r);
            }
            this._modules.push(n);
          }
          onDestroy(n) {
            this._destroyListeners.push(n);
          }
          get injector() {
            return this._injector;
          }
          destroy() {
            if (this._destroyed) throw new w(404, !1);
            this._modules.slice().forEach((r) => r.destroy()),
              this._destroyListeners.forEach((r) => r());
            const n = this._injector.get(td, null);
            n && (n.forEach((r) => r()), n.clear()), (this._destroyed = !0);
          }
          get destroyed() {
            return this._destroyed;
          }
          static #e = (this.ɵfac = function (r) {
            return new (r || e)(b(at));
          });
          static #t = (this.ɵprov = S({
            token: e,
            factory: e.ɵfac,
            providedIn: "platform",
          }));
        }
        return e;
      })();
      function wD(e, t) {
        return Array.isArray(t) ? t.reduce(wD, e) : { ...e, ...t };
      }
      let Yr = (() => {
        class e {
          constructor() {
            (this._bootstrapListeners = []),
              (this._runningTick = !1),
              (this._destroyed = !1),
              (this._destroyListeners = []),
              (this._views = []),
              (this.internalErrorHandler = _(ED)),
              (this.zoneIsStable = _(Lg)),
              (this.componentTypes = []),
              (this.components = []),
              (this.isStable = _(da).hasPendingTasks.pipe(
                ht((n) => (n ? A(!1) : this.zoneIsStable)),
                (function KE(e, t = an) {
                  return (
                    (e = e ?? e_),
                    fe((n, r) => {
                      let o,
                        i = !0;
                      n.subscribe(
                        he(r, (s) => {
                          const a = t(s);
                          (i || !e(o, a)) && ((i = !1), (o = a), r.next(s));
                        })
                      );
                    })
                  );
                })(),
                Gf()
              )),
              (this._injector = _(Je));
          }
          get destroyed() {
            return this._destroyed;
          }
          get injector() {
            return this._injector;
          }
          bootstrap(n, r) {
            const o = n instanceof bg;
            if (!this._injector.get(Yl).done)
              throw (
                (!o &&
                  (function rr(e) {
                    const t = V(e) || Ce(e) || Ne(e);
                    return null !== t && t.standalone;
                  })(n),
                new w(405, !1))
              );
            let s;
            (s = o ? n : this._injector.get(Hs).resolveComponentFactory(n)),
              this.componentTypes.push(s.componentType);
            const a = (function CN(e) {
                return e.isBoundToModule;
              })(s)
                ? void 0
                : this._injector.get(Gn),
              c = s.create(at.NULL, [], r || s.selector, a),
              l = c.location.nativeElement,
              d = c.injector.get(lD, null);
            return (
              d?.registerApplication(l),
              c.onDestroy(() => {
                this.detachView(c.hostView),
                  pa(this.components, c),
                  d?.unregisterApplication(l);
              }),
              this._loadComponent(c),
              c
            );
          }
          tick() {
            if (this._runningTick) throw new w(101, !1);
            try {
              this._runningTick = !0;
              for (let n of this._views) n.detectChanges();
            } catch (n) {
              this.internalErrorHandler(n);
            } finally {
              this._runningTick = !1;
            }
          }
          attachView(n) {
            const r = n;
            this._views.push(r), r.attachToAppRef(this);
          }
          detachView(n) {
            const r = n;
            pa(this._views, r), r.detachFromAppRef();
          }
          _loadComponent(n) {
            this.attachView(n.hostView), this.tick(), this.components.push(n);
            const r = this._injector.get(nd, []);
            r.push(...this._bootstrapListeners), r.forEach((o) => o(n));
          }
          ngOnDestroy() {
            if (!this._destroyed)
              try {
                this._destroyListeners.forEach((n) => n()),
                  this._views.slice().forEach((n) => n.destroy());
              } finally {
                (this._destroyed = !0),
                  (this._views = []),
                  (this._bootstrapListeners = []),
                  (this._destroyListeners = []);
              }
          }
          onDestroy(n) {
            return (
              this._destroyListeners.push(n),
              () => pa(this._destroyListeners, n)
            );
          }
          destroy() {
            if (this._destroyed) throw new w(406, !1);
            const n = this._injector;
            n.destroy && !n.destroyed && n.destroy();
          }
          get viewCount() {
            return this._views.length;
          }
          warnIfDestroyed() {}
          static #e = (this.ɵfac = function (r) {
            return new (r || e)();
          });
          static #t = (this.ɵprov = S({
            token: e,
            factory: e.ɵfac,
            providedIn: "root",
          }));
        }
        return e;
      })();
      function pa(e, t) {
        const n = e.indexOf(t);
        n > -1 && e.splice(n, 1);
      }
      const ED = new I("", {
        providedIn: "root",
        factory: () => _(Wt).handleError.bind(void 0),
      });
      function SN() {
        const e = _(ee),
          t = _(Wt);
        return (n) => e.runOutsideAngular(() => t.handleError(n));
      }
      let MN = (() => {
        class e {
          constructor() {
            (this.zone = _(ee)), (this.applicationRef = _(Yr));
          }
          initialize() {
            this._onMicrotaskEmptySubscription ||
              (this._onMicrotaskEmptySubscription =
                this.zone.onMicrotaskEmpty.subscribe({
                  next: () => {
                    this.zone.run(() => {
                      this.applicationRef.tick();
                    });
                  },
                }));
          }
          ngOnDestroy() {
            this._onMicrotaskEmptySubscription?.unsubscribe();
          }
          static #e = (this.ɵfac = function (r) {
            return new (r || e)();
          });
          static #t = (this.ɵprov = S({
            token: e,
            factory: e.ɵfac,
            providedIn: "root",
          }));
        }
        return e;
      })();
      let od = (() => {
        class e {
          static #e = (this.__NG_ELEMENT_ID__ = AN);
        }
        return e;
      })();
      function AN(e) {
        return (function RN(e, t, n) {
          if (Nn(e) && !n) {
            const r = Qe(e.index, t);
            return new Xo(r, r);
          }
          return 47 & e.type ? new Xo(t[ce], t) : null;
        })(Ie(), y(), 16 == (16 & e));
      }
      class MD {
        constructor() {}
        supports(t) {
          return Qs(t);
        }
        create(t) {
          return new kN(t);
        }
      }
      const FN = (e, t) => t;
      class kN {
        constructor(t) {
          (this.length = 0),
            (this._linkedRecords = null),
            (this._unlinkedRecords = null),
            (this._previousItHead = null),
            (this._itHead = null),
            (this._itTail = null),
            (this._additionsHead = null),
            (this._additionsTail = null),
            (this._movesHead = null),
            (this._movesTail = null),
            (this._removalsHead = null),
            (this._removalsTail = null),
            (this._identityChangesHead = null),
            (this._identityChangesTail = null),
            (this._trackByFn = t || FN);
        }
        forEachItem(t) {
          let n;
          for (n = this._itHead; null !== n; n = n._next) t(n);
        }
        forEachOperation(t) {
          let n = this._itHead,
            r = this._removalsHead,
            o = 0,
            i = null;
          for (; n || r; ) {
            const s = !r || (n && n.currentIndex < AD(r, o, i)) ? n : r,
              a = AD(s, o, i),
              u = s.currentIndex;
            if (s === r) o--, (r = r._nextRemoved);
            else if (((n = n._next), null == s.previousIndex)) o++;
            else {
              i || (i = []);
              const c = a - o,
                l = u - o;
              if (c != l) {
                for (let f = 0; f < c; f++) {
                  const h = f < i.length ? i[f] : (i[f] = 0),
                    p = h + f;
                  l <= p && p < c && (i[f] = h + 1);
                }
                i[s.previousIndex] = l - c;
              }
            }
            a !== u && t(s, a, u);
          }
        }
        forEachPreviousItem(t) {
          let n;
          for (n = this._previousItHead; null !== n; n = n._nextPrevious) t(n);
        }
        forEachAddedItem(t) {
          let n;
          for (n = this._additionsHead; null !== n; n = n._nextAdded) t(n);
        }
        forEachMovedItem(t) {
          let n;
          for (n = this._movesHead; null !== n; n = n._nextMoved) t(n);
        }
        forEachRemovedItem(t) {
          let n;
          for (n = this._removalsHead; null !== n; n = n._nextRemoved) t(n);
        }
        forEachIdentityChange(t) {
          let n;
          for (
            n = this._identityChangesHead;
            null !== n;
            n = n._nextIdentityChange
          )
            t(n);
        }
        diff(t) {
          if ((null == t && (t = []), !Qs(t))) throw new w(900, !1);
          return this.check(t) ? this : null;
        }
        onDestroy() {}
        check(t) {
          this._reset();
          let o,
            i,
            s,
            n = this._itHead,
            r = !1;
          if (Array.isArray(t)) {
            this.length = t.length;
            for (let a = 0; a < this.length; a++)
              (i = t[a]),
                (s = this._trackByFn(a, i)),
                null !== n && Object.is(n.trackById, s)
                  ? (r && (n = this._verifyReinsertion(n, i, s, a)),
                    Object.is(n.item, i) || this._addIdentityChange(n, i))
                  : ((n = this._mismatch(n, i, s, a)), (r = !0)),
                (n = n._next);
          } else
            (o = 0),
              (function c0(e, t) {
                if (Array.isArray(e))
                  for (let n = 0; n < e.length; n++) t(e[n]);
                else {
                  const n = e[Symbol.iterator]();
                  let r;
                  for (; !(r = n.next()).done; ) t(r.value);
                }
              })(t, (a) => {
                (s = this._trackByFn(o, a)),
                  null !== n && Object.is(n.trackById, s)
                    ? (r && (n = this._verifyReinsertion(n, a, s, o)),
                      Object.is(n.item, a) || this._addIdentityChange(n, a))
                    : ((n = this._mismatch(n, a, s, o)), (r = !0)),
                  (n = n._next),
                  o++;
              }),
              (this.length = o);
          return this._truncate(n), (this.collection = t), this.isDirty;
        }
        get isDirty() {
          return (
            null !== this._additionsHead ||
            null !== this._movesHead ||
            null !== this._removalsHead ||
            null !== this._identityChangesHead
          );
        }
        _reset() {
          if (this.isDirty) {
            let t;
            for (
              t = this._previousItHead = this._itHead;
              null !== t;
              t = t._next
            )
              t._nextPrevious = t._next;
            for (t = this._additionsHead; null !== t; t = t._nextAdded)
              t.previousIndex = t.currentIndex;
            for (
              this._additionsHead = this._additionsTail = null,
                t = this._movesHead;
              null !== t;
              t = t._nextMoved
            )
              t.previousIndex = t.currentIndex;
            (this._movesHead = this._movesTail = null),
              (this._removalsHead = this._removalsTail = null),
              (this._identityChangesHead = this._identityChangesTail = null);
          }
        }
        _mismatch(t, n, r, o) {
          let i;
          return (
            null === t ? (i = this._itTail) : ((i = t._prev), this._remove(t)),
            null !==
            (t =
              null === this._unlinkedRecords
                ? null
                : this._unlinkedRecords.get(r, null))
              ? (Object.is(t.item, n) || this._addIdentityChange(t, n),
                this._reinsertAfter(t, i, o))
              : null !==
                (t =
                  null === this._linkedRecords
                    ? null
                    : this._linkedRecords.get(r, o))
              ? (Object.is(t.item, n) || this._addIdentityChange(t, n),
                this._moveAfter(t, i, o))
              : (t = this._addAfter(new LN(n, r), i, o)),
            t
          );
        }
        _verifyReinsertion(t, n, r, o) {
          let i =
            null === this._unlinkedRecords
              ? null
              : this._unlinkedRecords.get(r, null);
          return (
            null !== i
              ? (t = this._reinsertAfter(i, t._prev, o))
              : t.currentIndex != o &&
                ((t.currentIndex = o), this._addToMoves(t, o)),
            t
          );
        }
        _truncate(t) {
          for (; null !== t; ) {
            const n = t._next;
            this._addToRemovals(this._unlink(t)), (t = n);
          }
          null !== this._unlinkedRecords && this._unlinkedRecords.clear(),
            null !== this._additionsTail &&
              (this._additionsTail._nextAdded = null),
            null !== this._movesTail && (this._movesTail._nextMoved = null),
            null !== this._itTail && (this._itTail._next = null),
            null !== this._removalsTail &&
              (this._removalsTail._nextRemoved = null),
            null !== this._identityChangesTail &&
              (this._identityChangesTail._nextIdentityChange = null);
        }
        _reinsertAfter(t, n, r) {
          null !== this._unlinkedRecords && this._unlinkedRecords.remove(t);
          const o = t._prevRemoved,
            i = t._nextRemoved;
          return (
            null === o ? (this._removalsHead = i) : (o._nextRemoved = i),
            null === i ? (this._removalsTail = o) : (i._prevRemoved = o),
            this._insertAfter(t, n, r),
            this._addToMoves(t, r),
            t
          );
        }
        _moveAfter(t, n, r) {
          return (
            this._unlink(t),
            this._insertAfter(t, n, r),
            this._addToMoves(t, r),
            t
          );
        }
        _addAfter(t, n, r) {
          return (
            this._insertAfter(t, n, r),
            (this._additionsTail =
              null === this._additionsTail
                ? (this._additionsHead = t)
                : (this._additionsTail._nextAdded = t)),
            t
          );
        }
        _insertAfter(t, n, r) {
          const o = null === n ? this._itHead : n._next;
          return (
            (t._next = o),
            (t._prev = n),
            null === o ? (this._itTail = t) : (o._prev = t),
            null === n ? (this._itHead = t) : (n._next = t),
            null === this._linkedRecords && (this._linkedRecords = new TD()),
            this._linkedRecords.put(t),
            (t.currentIndex = r),
            t
          );
        }
        _remove(t) {
          return this._addToRemovals(this._unlink(t));
        }
        _unlink(t) {
          null !== this._linkedRecords && this._linkedRecords.remove(t);
          const n = t._prev,
            r = t._next;
          return (
            null === n ? (this._itHead = r) : (n._next = r),
            null === r ? (this._itTail = n) : (r._prev = n),
            t
          );
        }
        _addToMoves(t, n) {
          return (
            t.previousIndex === n ||
              (this._movesTail =
                null === this._movesTail
                  ? (this._movesHead = t)
                  : (this._movesTail._nextMoved = t)),
            t
          );
        }
        _addToRemovals(t) {
          return (
            null === this._unlinkedRecords &&
              (this._unlinkedRecords = new TD()),
            this._unlinkedRecords.put(t),
            (t.currentIndex = null),
            (t._nextRemoved = null),
            null === this._removalsTail
              ? ((this._removalsTail = this._removalsHead = t),
                (t._prevRemoved = null))
              : ((t._prevRemoved = this._removalsTail),
                (this._removalsTail = this._removalsTail._nextRemoved = t)),
            t
          );
        }
        _addIdentityChange(t, n) {
          return (
            (t.item = n),
            (this._identityChangesTail =
              null === this._identityChangesTail
                ? (this._identityChangesHead = t)
                : (this._identityChangesTail._nextIdentityChange = t)),
            t
          );
        }
      }
      class LN {
        constructor(t, n) {
          (this.item = t),
            (this.trackById = n),
            (this.currentIndex = null),
            (this.previousIndex = null),
            (this._nextPrevious = null),
            (this._prev = null),
            (this._next = null),
            (this._prevDup = null),
            (this._nextDup = null),
            (this._prevRemoved = null),
            (this._nextRemoved = null),
            (this._nextAdded = null),
            (this._nextMoved = null),
            (this._nextIdentityChange = null);
        }
      }
      class jN {
        constructor() {
          (this._head = null), (this._tail = null);
        }
        add(t) {
          null === this._head
            ? ((this._head = this._tail = t),
              (t._nextDup = null),
              (t._prevDup = null))
            : ((this._tail._nextDup = t),
              (t._prevDup = this._tail),
              (t._nextDup = null),
              (this._tail = t));
        }
        get(t, n) {
          let r;
          for (r = this._head; null !== r; r = r._nextDup)
            if (
              (null === n || n <= r.currentIndex) &&
              Object.is(r.trackById, t)
            )
              return r;
          return null;
        }
        remove(t) {
          const n = t._prevDup,
            r = t._nextDup;
          return (
            null === n ? (this._head = r) : (n._nextDup = r),
            null === r ? (this._tail = n) : (r._prevDup = n),
            null === this._head
          );
        }
      }
      class TD {
        constructor() {
          this.map = new Map();
        }
        put(t) {
          const n = t.trackById;
          let r = this.map.get(n);
          r || ((r = new jN()), this.map.set(n, r)), r.add(t);
        }
        get(t, n) {
          const o = this.map.get(t);
          return o ? o.get(t, n) : null;
        }
        remove(t) {
          const n = t.trackById;
          return this.map.get(n).remove(t) && this.map.delete(n), t;
        }
        get isEmpty() {
          return 0 === this.map.size;
        }
        clear() {
          this.map.clear();
        }
      }
      function AD(e, t, n) {
        const r = e.previousIndex;
        if (null === r) return r;
        let o = 0;
        return n && r < n.length && (o = n[r]), r + t + o;
      }
      function ND() {
        return new va([new MD()]);
      }
      let va = (() => {
        class e {
          static #e = (this.ɵprov = S({
            token: e,
            providedIn: "root",
            factory: ND,
          }));
          constructor(n) {
            this.factories = n;
          }
          static create(n, r) {
            if (null != r) {
              const o = r.factories.slice();
              n = n.concat(o);
            }
            return new e(n);
          }
          static extend(n) {
            return {
              provide: e,
              useFactory: (r) => e.create(n, r || ND()),
              deps: [[e, new gs(), new ps()]],
            };
          }
          find(n) {
            const r = this.factories.find((o) => o.supports(n));
            if (null != r) return r;
            throw new w(901, !1);
          }
        }
        return e;
      })();
      const UN = gD(null, "core", []);
      let zN = (() => {
          class e {
            constructor(n) {}
            static #e = (this.ɵfac = function (r) {
              return new (r || e)(b(Yr));
            });
            static #t = (this.ɵmod = Rn({ type: e }));
            static #n = (this.ɵinj = cn({}));
          }
          return e;
        })(),
        dd = null;
      function Qr() {
        return dd;
      }
      class ox {}
      const et = new I("DocumentToken");
      let fd = (() => {
        class e {
          historyGo(n) {
            throw new Error("Not implemented");
          }
          static #e = (this.ɵfac = function (r) {
            return new (r || e)();
          });
          static #t = (this.ɵprov = S({
            token: e,
            factory: function () {
              return _(sx);
            },
            providedIn: "platform",
          }));
        }
        return e;
      })();
      const ix = new I("Location Initialized");
      let sx = (() => {
        class e extends fd {
          constructor() {
            super(),
              (this._doc = _(et)),
              (this._location = window.location),
              (this._history = window.history);
          }
          getBaseHrefFromDOM() {
            return Qr().getBaseHref(this._doc);
          }
          onPopState(n) {
            const r = Qr().getGlobalEventTarget(this._doc, "window");
            return (
              r.addEventListener("popstate", n, !1),
              () => r.removeEventListener("popstate", n)
            );
          }
          onHashChange(n) {
            const r = Qr().getGlobalEventTarget(this._doc, "window");
            return (
              r.addEventListener("hashchange", n, !1),
              () => r.removeEventListener("hashchange", n)
            );
          }
          get href() {
            return this._location.href;
          }
          get protocol() {
            return this._location.protocol;
          }
          get hostname() {
            return this._location.hostname;
          }
          get port() {
            return this._location.port;
          }
          get pathname() {
            return this._location.pathname;
          }
          get search() {
            return this._location.search;
          }
          get hash() {
            return this._location.hash;
          }
          set pathname(n) {
            this._location.pathname = n;
          }
          pushState(n, r, o) {
            this._history.pushState(n, r, o);
          }
          replaceState(n, r, o) {
            this._history.replaceState(n, r, o);
          }
          forward() {
            this._history.forward();
          }
          back() {
            this._history.back();
          }
          historyGo(n = 0) {
            this._history.go(n);
          }
          getState() {
            return this._history.state;
          }
          static #e = (this.ɵfac = function (r) {
            return new (r || e)();
          });
          static #t = (this.ɵprov = S({
            token: e,
            factory: function () {
              return new e();
            },
            providedIn: "platform",
          }));
        }
        return e;
      })();
      function hd(e, t) {
        if (0 == e.length) return t;
        if (0 == t.length) return e;
        let n = 0;
        return (
          e.endsWith("/") && n++,
          t.startsWith("/") && n++,
          2 == n ? e + t.substring(1) : 1 == n ? e + t : e + "/" + t
        );
      }
      function VD(e) {
        const t = e.match(/#|\?|$/),
          n = (t && t.index) || e.length;
        return e.slice(0, n - ("/" === e[n - 1] ? 1 : 0)) + e.slice(n);
      }
      function en(e) {
        return e && "?" !== e[0] ? "?" + e : e;
      }
      let Wn = (() => {
        class e {
          historyGo(n) {
            throw new Error("Not implemented");
          }
          static #e = (this.ɵfac = function (r) {
            return new (r || e)();
          });
          static #t = (this.ɵprov = S({
            token: e,
            factory: function () {
              return _(UD);
            },
            providedIn: "root",
          }));
        }
        return e;
      })();
      const BD = new I("appBaseHref");
      let UD = (() => {
          class e extends Wn {
            constructor(n, r) {
              super(),
                (this._platformLocation = n),
                (this._removeListenerFns = []),
                (this._baseHref =
                  r ??
                  this._platformLocation.getBaseHrefFromDOM() ??
                  _(et).location?.origin ??
                  "");
            }
            ngOnDestroy() {
              for (; this._removeListenerFns.length; )
                this._removeListenerFns.pop()();
            }
            onPopState(n) {
              this._removeListenerFns.push(
                this._platformLocation.onPopState(n),
                this._platformLocation.onHashChange(n)
              );
            }
            getBaseHref() {
              return this._baseHref;
            }
            prepareExternalUrl(n) {
              return hd(this._baseHref, n);
            }
            path(n = !1) {
              const r =
                  this._platformLocation.pathname +
                  en(this._platformLocation.search),
                o = this._platformLocation.hash;
              return o && n ? `${r}${o}` : r;
            }
            pushState(n, r, o, i) {
              const s = this.prepareExternalUrl(o + en(i));
              this._platformLocation.pushState(n, r, s);
            }
            replaceState(n, r, o, i) {
              const s = this.prepareExternalUrl(o + en(i));
              this._platformLocation.replaceState(n, r, s);
            }
            forward() {
              this._platformLocation.forward();
            }
            back() {
              this._platformLocation.back();
            }
            getState() {
              return this._platformLocation.getState();
            }
            historyGo(n = 0) {
              this._platformLocation.historyGo?.(n);
            }
            static #e = (this.ɵfac = function (r) {
              return new (r || e)(b(fd), b(BD, 8));
            });
            static #t = (this.ɵprov = S({
              token: e,
              factory: e.ɵfac,
              providedIn: "root",
            }));
          }
          return e;
        })(),
        ax = (() => {
          class e extends Wn {
            constructor(n, r) {
              super(),
                (this._platformLocation = n),
                (this._baseHref = ""),
                (this._removeListenerFns = []),
                null != r && (this._baseHref = r);
            }
            ngOnDestroy() {
              for (; this._removeListenerFns.length; )
                this._removeListenerFns.pop()();
            }
            onPopState(n) {
              this._removeListenerFns.push(
                this._platformLocation.onPopState(n),
                this._platformLocation.onHashChange(n)
              );
            }
            getBaseHref() {
              return this._baseHref;
            }
            path(n = !1) {
              let r = this._platformLocation.hash;
              return null == r && (r = "#"), r.length > 0 ? r.substring(1) : r;
            }
            prepareExternalUrl(n) {
              const r = hd(this._baseHref, n);
              return r.length > 0 ? "#" + r : r;
            }
            pushState(n, r, o, i) {
              let s = this.prepareExternalUrl(o + en(i));
              0 == s.length && (s = this._platformLocation.pathname),
                this._platformLocation.pushState(n, r, s);
            }
            replaceState(n, r, o, i) {
              let s = this.prepareExternalUrl(o + en(i));
              0 == s.length && (s = this._platformLocation.pathname),
                this._platformLocation.replaceState(n, r, s);
            }
            forward() {
              this._platformLocation.forward();
            }
            back() {
              this._platformLocation.back();
            }
            getState() {
              return this._platformLocation.getState();
            }
            historyGo(n = 0) {
              this._platformLocation.historyGo?.(n);
            }
            static #e = (this.ɵfac = function (r) {
              return new (r || e)(b(fd), b(BD, 8));
            });
            static #t = (this.ɵprov = S({ token: e, factory: e.ɵfac }));
          }
          return e;
        })(),
        pd = (() => {
          class e {
            constructor(n) {
              (this._subject = new ke()),
                (this._urlChangeListeners = []),
                (this._urlChangeSubscription = null),
                (this._locationStrategy = n);
              const r = this._locationStrategy.getBaseHref();
              (this._basePath = (function lx(e) {
                if (new RegExp("^(https?:)?//").test(e)) {
                  const [, n] = e.split(/\/\/[^\/]+/);
                  return n;
                }
                return e;
              })(VD(zD(r)))),
                this._locationStrategy.onPopState((o) => {
                  this._subject.emit({
                    url: this.path(!0),
                    pop: !0,
                    state: o.state,
                    type: o.type,
                  });
                });
            }
            ngOnDestroy() {
              this._urlChangeSubscription?.unsubscribe(),
                (this._urlChangeListeners = []);
            }
            path(n = !1) {
              return this.normalize(this._locationStrategy.path(n));
            }
            getState() {
              return this._locationStrategy.getState();
            }
            isCurrentPathEqualTo(n, r = "") {
              return this.path() == this.normalize(n + en(r));
            }
            normalize(n) {
              return e.stripTrailingSlash(
                (function cx(e, t) {
                  if (!e || !t.startsWith(e)) return t;
                  const n = t.substring(e.length);
                  return "" === n || ["/", ";", "?", "#"].includes(n[0])
                    ? n
                    : t;
                })(this._basePath, zD(n))
              );
            }
            prepareExternalUrl(n) {
              return (
                n && "/" !== n[0] && (n = "/" + n),
                this._locationStrategy.prepareExternalUrl(n)
              );
            }
            go(n, r = "", o = null) {
              this._locationStrategy.pushState(o, "", n, r),
                this._notifyUrlChangeListeners(
                  this.prepareExternalUrl(n + en(r)),
                  o
                );
            }
            replaceState(n, r = "", o = null) {
              this._locationStrategy.replaceState(o, "", n, r),
                this._notifyUrlChangeListeners(
                  this.prepareExternalUrl(n + en(r)),
                  o
                );
            }
            forward() {
              this._locationStrategy.forward();
            }
            back() {
              this._locationStrategy.back();
            }
            historyGo(n = 0) {
              this._locationStrategy.historyGo?.(n);
            }
            onUrlChange(n) {
              return (
                this._urlChangeListeners.push(n),
                this._urlChangeSubscription ||
                  (this._urlChangeSubscription = this.subscribe((r) => {
                    this._notifyUrlChangeListeners(r.url, r.state);
                  })),
                () => {
                  const r = this._urlChangeListeners.indexOf(n);
                  this._urlChangeListeners.splice(r, 1),
                    0 === this._urlChangeListeners.length &&
                      (this._urlChangeSubscription?.unsubscribe(),
                      (this._urlChangeSubscription = null));
                }
              );
            }
            _notifyUrlChangeListeners(n = "", r) {
              this._urlChangeListeners.forEach((o) => o(n, r));
            }
            subscribe(n, r, o) {
              return this._subject.subscribe({
                next: n,
                error: r,
                complete: o,
              });
            }
            static #e = (this.normalizeQueryParams = en);
            static #t = (this.joinWithSlash = hd);
            static #n = (this.stripTrailingSlash = VD);
            static #r = (this.ɵfac = function (r) {
              return new (r || e)(b(Wn));
            });
            static #o = (this.ɵprov = S({
              token: e,
              factory: function () {
                return (function ux() {
                  return new pd(b(Wn));
                })();
              },
              providedIn: "root",
            }));
          }
          return e;
        })();
      function zD(e) {
        return e.replace(/\/index.html$/, "");
      }
      function KD(e, t) {
        t = encodeURIComponent(t);
        for (const n of e.split(";")) {
          const r = n.indexOf("="),
            [o, i] = -1 == r ? [n, ""] : [n.slice(0, r), n.slice(r + 1)];
          if (o.trim() === t) return decodeURIComponent(i);
        }
        return null;
      }
      class Qx {
        constructor(t, n, r, o) {
          (this.$implicit = t),
            (this.ngForOf = n),
            (this.index = r),
            (this.count = o);
        }
        get first() {
          return 0 === this.index;
        }
        get last() {
          return this.index === this.count - 1;
        }
        get even() {
          return this.index % 2 == 0;
        }
        get odd() {
          return !this.even;
        }
      }
      let bd = (() => {
        class e {
          set ngForOf(n) {
            (this._ngForOf = n), (this._ngForOfDirty = !0);
          }
          set ngForTrackBy(n) {
            this._trackByFn = n;
          }
          get ngForTrackBy() {
            return this._trackByFn;
          }
          constructor(n, r, o) {
            (this._viewContainer = n),
              (this._template = r),
              (this._differs = o),
              (this._ngForOf = null),
              (this._ngForOfDirty = !0),
              (this._differ = null);
          }
          set ngForTemplate(n) {
            n && (this._template = n);
          }
          ngDoCheck() {
            if (this._ngForOfDirty) {
              this._ngForOfDirty = !1;
              const n = this._ngForOf;
              !this._differ &&
                n &&
                (this._differ = this._differs
                  .find(n)
                  .create(this.ngForTrackBy));
            }
            if (this._differ) {
              const n = this._differ.diff(this._ngForOf);
              n && this._applyChanges(n);
            }
          }
          _applyChanges(n) {
            const r = this._viewContainer;
            n.forEachOperation((o, i, s) => {
              if (null == o.previousIndex)
                r.createEmbeddedView(
                  this._template,
                  new Qx(o.item, this._ngForOf, -1, -1),
                  null === s ? void 0 : s
                );
              else if (null == s) r.remove(null === i ? void 0 : i);
              else if (null !== i) {
                const a = r.get(i);
                r.move(a, s), nw(a, o);
              }
            });
            for (let o = 0, i = r.length; o < i; o++) {
              const a = r.get(o).context;
              (a.index = o), (a.count = i), (a.ngForOf = this._ngForOf);
            }
            n.forEachIdentityChange((o) => {
              nw(r.get(o.currentIndex), o);
            });
          }
          static ngTemplateContextGuard(n, r) {
            return !0;
          }
          static #e = (this.ɵfac = function (r) {
            return new (r || e)(M(Ct), M(Jt), M(va));
          });
          static #t = (this.ɵdir = Re({
            type: e,
            selectors: [["", "ngFor", "", "ngForOf", ""]],
            inputs: {
              ngForOf: "ngForOf",
              ngForTrackBy: "ngForTrackBy",
              ngForTemplate: "ngForTemplate",
            },
            standalone: !0,
          }));
        }
        return e;
      })();
      function nw(e, t) {
        e.context.$implicit = t.item;
      }
      let Sd = (() => {
        class e {
          constructor(n, r) {
            (this._viewContainer = n),
              (this._context = new Xx()),
              (this._thenTemplateRef = null),
              (this._elseTemplateRef = null),
              (this._thenViewRef = null),
              (this._elseViewRef = null),
              (this._thenTemplateRef = r);
          }
          set ngIf(n) {
            (this._context.$implicit = this._context.ngIf = n),
              this._updateView();
          }
          set ngIfThen(n) {
            rw("ngIfThen", n),
              (this._thenTemplateRef = n),
              (this._thenViewRef = null),
              this._updateView();
          }
          set ngIfElse(n) {
            rw("ngIfElse", n),
              (this._elseTemplateRef = n),
              (this._elseViewRef = null),
              this._updateView();
          }
          _updateView() {
            this._context.$implicit
              ? this._thenViewRef ||
                (this._viewContainer.clear(),
                (this._elseViewRef = null),
                this._thenTemplateRef &&
                  (this._thenViewRef = this._viewContainer.createEmbeddedView(
                    this._thenTemplateRef,
                    this._context
                  )))
              : this._elseViewRef ||
                (this._viewContainer.clear(),
                (this._thenViewRef = null),
                this._elseTemplateRef &&
                  (this._elseViewRef = this._viewContainer.createEmbeddedView(
                    this._elseTemplateRef,
                    this._context
                  )));
          }
          static ngTemplateContextGuard(n, r) {
            return !0;
          }
          static #e = (this.ɵfac = function (r) {
            return new (r || e)(M(Ct), M(Jt));
          });
          static #t = (this.ɵdir = Re({
            type: e,
            selectors: [["", "ngIf", ""]],
            inputs: {
              ngIf: "ngIf",
              ngIfThen: "ngIfThen",
              ngIfElse: "ngIfElse",
            },
            standalone: !0,
          }));
        }
        return e;
      })();
      class Xx {
        constructor() {
          (this.$implicit = null), (this.ngIf = null);
        }
      }
      function rw(e, t) {
        if (t && !t.createEmbeddedView)
          throw new Error(
            `${e} must be a TemplateRef, but received '${pe(t)}'.`
          );
      }
      let sw = (() => {
        class e {
          static #e = (this.ɵfac = function (r) {
            return new (r || e)();
          });
          static #t = (this.ɵmod = Rn({ type: e }));
          static #n = (this.ɵinj = cn({}));
        }
        return e;
      })();
      function uw(e) {
        return "server" === e;
      }
      let bO = (() => {
        class e {
          static #e = (this.ɵprov = S({
            token: e,
            providedIn: "root",
            factory: () => new SO(b(et), window),
          }));
        }
        return e;
      })();
      class SO {
        constructor(t, n) {
          (this.document = t), (this.window = n), (this.offset = () => [0, 0]);
        }
        setOffset(t) {
          this.offset = Array.isArray(t) ? () => t : t;
        }
        getScrollPosition() {
          return this.supportsScrolling()
            ? [this.window.pageXOffset, this.window.pageYOffset]
            : [0, 0];
        }
        scrollToPosition(t) {
          this.supportsScrolling() && this.window.scrollTo(t[0], t[1]);
        }
        scrollToAnchor(t) {
          if (!this.supportsScrolling()) return;
          const n = (function MO(e, t) {
            const n = e.getElementById(t) || e.getElementsByName(t)[0];
            if (n) return n;
            if (
              "function" == typeof e.createTreeWalker &&
              e.body &&
              "function" == typeof e.body.attachShadow
            ) {
              const r = e.createTreeWalker(e.body, NodeFilter.SHOW_ELEMENT);
              let o = r.currentNode;
              for (; o; ) {
                const i = o.shadowRoot;
                if (i) {
                  const s =
                    i.getElementById(t) || i.querySelector(`[name="${t}"]`);
                  if (s) return s;
                }
                o = r.nextNode();
              }
            }
            return null;
          })(this.document, t);
          n && (this.scrollToElement(n), n.focus());
        }
        setHistoryScrollRestoration(t) {
          this.supportsScrolling() &&
            (this.window.history.scrollRestoration = t);
        }
        scrollToElement(t) {
          const n = t.getBoundingClientRect(),
            r = n.left + this.window.pageXOffset,
            o = n.top + this.window.pageYOffset,
            i = this.offset();
          this.window.scrollTo(r - i[0], o - i[1]);
        }
        supportsScrolling() {
          try {
            return (
              !!this.window &&
              !!this.window.scrollTo &&
              "pageXOffset" in this.window
            );
          } catch {
            return !1;
          }
        }
      }
      class cw {}
      class QO extends ox {
        constructor() {
          super(...arguments), (this.supportsDOMEvents = !0);
        }
      }
      class Od extends QO {
        static makeCurrent() {
          !(function rx(e) {
            dd || (dd = e);
          })(new Od());
        }
        onAndCancel(t, n, r) {
          return (
            t.addEventListener(n, r),
            () => {
              t.removeEventListener(n, r);
            }
          );
        }
        dispatchEvent(t, n) {
          t.dispatchEvent(n);
        }
        remove(t) {
          t.parentNode && t.parentNode.removeChild(t);
        }
        createElement(t, n) {
          return (n = n || this.getDefaultDocument()).createElement(t);
        }
        createHtmlDocument() {
          return document.implementation.createHTMLDocument("fakeTitle");
        }
        getDefaultDocument() {
          return document;
        }
        isElementNode(t) {
          return t.nodeType === Node.ELEMENT_NODE;
        }
        isShadowRoot(t) {
          return t instanceof DocumentFragment;
        }
        getGlobalEventTarget(t, n) {
          return "window" === n
            ? window
            : "document" === n
            ? t
            : "body" === n
            ? t.body
            : null;
        }
        getBaseHref(t) {
          const n = (function XO() {
            return (
              (yi = yi || document.querySelector("base")),
              yi ? yi.getAttribute("href") : null
            );
          })();
          return null == n
            ? null
            : (function JO(e) {
                (Na = Na || document.createElement("a")),
                  Na.setAttribute("href", e);
                const t = Na.pathname;
                return "/" === t.charAt(0) ? t : `/${t}`;
              })(n);
        }
        resetBaseElement() {
          yi = null;
        }
        getUserAgent() {
          return window.navigator.userAgent;
        }
        getCookie(t) {
          return KD(document.cookie, t);
        }
      }
      let Na,
        yi = null,
        eP = (() => {
          class e {
            build() {
              return new XMLHttpRequest();
            }
            static #e = (this.ɵfac = function (r) {
              return new (r || e)();
            });
            static #t = (this.ɵprov = S({ token: e, factory: e.ɵfac }));
          }
          return e;
        })();
      const Pd = new I("EventManagerPlugins");
      let pw = (() => {
        class e {
          constructor(n, r) {
            (this._zone = r),
              (this._eventNameToPlugin = new Map()),
              n.forEach((o) => {
                o.manager = this;
              }),
              (this._plugins = n.slice().reverse());
          }
          addEventListener(n, r, o) {
            return this._findPluginFor(r).addEventListener(n, r, o);
          }
          getZone() {
            return this._zone;
          }
          _findPluginFor(n) {
            let r = this._eventNameToPlugin.get(n);
            if (r) return r;
            if (((r = this._plugins.find((i) => i.supports(n))), !r))
              throw new w(5101, !1);
            return this._eventNameToPlugin.set(n, r), r;
          }
          static #e = (this.ɵfac = function (r) {
            return new (r || e)(b(Pd), b(ee));
          });
          static #t = (this.ɵprov = S({ token: e, factory: e.ɵfac }));
        }
        return e;
      })();
      class gw {
        constructor(t) {
          this._doc = t;
        }
      }
      const Fd = "ng-app-id";
      let mw = (() => {
        class e {
          constructor(n, r, o, i = {}) {
            (this.doc = n),
              (this.appId = r),
              (this.nonce = o),
              (this.platformId = i),
              (this.styleRef = new Map()),
              (this.hostNodes = new Set()),
              (this.styleNodesInDOM = this.collectServerRenderedStyles()),
              (this.platformIsServer = uw(i)),
              this.resetHostNodes();
          }
          addStyles(n) {
            for (const r of n)
              1 === this.changeUsageCount(r, 1) && this.onStyleAdded(r);
          }
          removeStyles(n) {
            for (const r of n)
              this.changeUsageCount(r, -1) <= 0 && this.onStyleRemoved(r);
          }
          ngOnDestroy() {
            const n = this.styleNodesInDOM;
            n && (n.forEach((r) => r.remove()), n.clear());
            for (const r of this.getAllStyles()) this.onStyleRemoved(r);
            this.resetHostNodes();
          }
          addHost(n) {
            this.hostNodes.add(n);
            for (const r of this.getAllStyles()) this.addStyleToHost(n, r);
          }
          removeHost(n) {
            this.hostNodes.delete(n);
          }
          getAllStyles() {
            return this.styleRef.keys();
          }
          onStyleAdded(n) {
            for (const r of this.hostNodes) this.addStyleToHost(r, n);
          }
          onStyleRemoved(n) {
            const r = this.styleRef;
            r.get(n)?.elements?.forEach((o) => o.remove()), r.delete(n);
          }
          collectServerRenderedStyles() {
            const n = this.doc.head?.querySelectorAll(
              `style[${Fd}="${this.appId}"]`
            );
            if (n?.length) {
              const r = new Map();
              return (
                n.forEach((o) => {
                  null != o.textContent && r.set(o.textContent, o);
                }),
                r
              );
            }
            return null;
          }
          changeUsageCount(n, r) {
            const o = this.styleRef;
            if (o.has(n)) {
              const i = o.get(n);
              return (i.usage += r), i.usage;
            }
            return o.set(n, { usage: r, elements: [] }), r;
          }
          getStyleElement(n, r) {
            const o = this.styleNodesInDOM,
              i = o?.get(r);
            if (i?.parentNode === n)
              return o.delete(r), i.removeAttribute(Fd), i;
            {
              const s = this.doc.createElement("style");
              return (
                this.nonce && s.setAttribute("nonce", this.nonce),
                (s.textContent = r),
                this.platformIsServer && s.setAttribute(Fd, this.appId),
                s
              );
            }
          }
          addStyleToHost(n, r) {
            const o = this.getStyleElement(n, r);
            n.appendChild(o);
            const i = this.styleRef,
              s = i.get(r)?.elements;
            s ? s.push(o) : i.set(r, { elements: [o], usage: 1 });
          }
          resetHostNodes() {
            const n = this.hostNodes;
            n.clear(), n.add(this.doc.head);
          }
          static #e = (this.ɵfac = function (r) {
            return new (r || e)(b(et), b(Ps), b(Cg, 8), b(jn));
          });
          static #t = (this.ɵprov = S({ token: e, factory: e.ɵfac }));
        }
        return e;
      })();
      const kd = {
          svg: "http://www.w3.org/2000/svg",
          xhtml: "http://www.w3.org/1999/xhtml",
          xlink: "http://www.w3.org/1999/xlink",
          xml: "http://www.w3.org/XML/1998/namespace",
          xmlns: "http://www.w3.org/2000/xmlns/",
          math: "http://www.w3.org/1998/MathML/",
        },
        Ld = /%COMP%/g,
        oP = new I("RemoveStylesOnCompDestroy", {
          providedIn: "root",
          factory: () => !1,
        });
      function yw(e, t) {
        return t.map((n) => n.replace(Ld, e));
      }
      let Dw = (() => {
        class e {
          constructor(n, r, o, i, s, a, u, c = null) {
            (this.eventManager = n),
              (this.sharedStylesHost = r),
              (this.appId = o),
              (this.removeStylesOnCompDestroy = i),
              (this.doc = s),
              (this.platformId = a),
              (this.ngZone = u),
              (this.nonce = c),
              (this.rendererByCompId = new Map()),
              (this.platformIsServer = uw(a)),
              (this.defaultRenderer = new jd(n, s, u, this.platformIsServer));
          }
          createRenderer(n, r) {
            if (!n || !r) return this.defaultRenderer;
            this.platformIsServer &&
              r.encapsulation === pt.ShadowDom &&
              (r = { ...r, encapsulation: pt.Emulated });
            const o = this.getOrCreateRenderer(n, r);
            return (
              o instanceof Cw
                ? o.applyToHost(n)
                : o instanceof $d && o.applyStyles(),
              o
            );
          }
          getOrCreateRenderer(n, r) {
            const o = this.rendererByCompId;
            let i = o.get(r.id);
            if (!i) {
              const s = this.doc,
                a = this.ngZone,
                u = this.eventManager,
                c = this.sharedStylesHost,
                l = this.removeStylesOnCompDestroy,
                d = this.platformIsServer;
              switch (r.encapsulation) {
                case pt.Emulated:
                  i = new Cw(u, c, r, this.appId, l, s, a, d);
                  break;
                case pt.ShadowDom:
                  return new uP(u, c, n, r, s, a, this.nonce, d);
                default:
                  i = new $d(u, c, r, l, s, a, d);
              }
              o.set(r.id, i);
            }
            return i;
          }
          ngOnDestroy() {
            this.rendererByCompId.clear();
          }
          static #e = (this.ɵfac = function (r) {
            return new (r || e)(
              b(pw),
              b(mw),
              b(Ps),
              b(oP),
              b(et),
              b(jn),
              b(ee),
              b(Cg)
            );
          });
          static #t = (this.ɵprov = S({ token: e, factory: e.ɵfac }));
        }
        return e;
      })();
      class jd {
        constructor(t, n, r, o) {
          (this.eventManager = t),
            (this.doc = n),
            (this.ngZone = r),
            (this.platformIsServer = o),
            (this.data = Object.create(null)),
            (this.destroyNode = null);
        }
        destroy() {}
        createElement(t, n) {
          return n
            ? this.doc.createElementNS(kd[n] || n, t)
            : this.doc.createElement(t);
        }
        createComment(t) {
          return this.doc.createComment(t);
        }
        createText(t) {
          return this.doc.createTextNode(t);
        }
        appendChild(t, n) {
          (ww(t) ? t.content : t).appendChild(n);
        }
        insertBefore(t, n, r) {
          t && (ww(t) ? t.content : t).insertBefore(n, r);
        }
        removeChild(t, n) {
          t && t.removeChild(n);
        }
        selectRootElement(t, n) {
          let r = "string" == typeof t ? this.doc.querySelector(t) : t;
          if (!r) throw new w(-5104, !1);
          return n || (r.textContent = ""), r;
        }
        parentNode(t) {
          return t.parentNode;
        }
        nextSibling(t) {
          return t.nextSibling;
        }
        setAttribute(t, n, r, o) {
          if (o) {
            n = o + ":" + n;
            const i = kd[o];
            i ? t.setAttributeNS(i, n, r) : t.setAttribute(n, r);
          } else t.setAttribute(n, r);
        }
        removeAttribute(t, n, r) {
          if (r) {
            const o = kd[r];
            o ? t.removeAttributeNS(o, n) : t.removeAttribute(`${r}:${n}`);
          } else t.removeAttribute(n);
        }
        addClass(t, n) {
          t.classList.add(n);
        }
        removeClass(t, n) {
          t.classList.remove(n);
        }
        setStyle(t, n, r, o) {
          o & (mn.DashCase | mn.Important)
            ? t.style.setProperty(n, r, o & mn.Important ? "important" : "")
            : (t.style[n] = r);
        }
        removeStyle(t, n, r) {
          r & mn.DashCase ? t.style.removeProperty(n) : (t.style[n] = "");
        }
        setProperty(t, n, r) {
          t[n] = r;
        }
        setValue(t, n) {
          t.nodeValue = n;
        }
        listen(t, n, r) {
          if (
            "string" == typeof t &&
            !(t = Qr().getGlobalEventTarget(this.doc, t))
          )
            throw new Error(`Unsupported event target ${t} for event ${n}`);
          return this.eventManager.addEventListener(
            t,
            n,
            this.decoratePreventDefault(r)
          );
        }
        decoratePreventDefault(t) {
          return (n) => {
            if ("__ngUnwrap__" === n) return t;
            !1 ===
              (this.platformIsServer
                ? this.ngZone.runGuarded(() => t(n))
                : t(n)) && n.preventDefault();
          };
        }
      }
      function ww(e) {
        return "TEMPLATE" === e.tagName && void 0 !== e.content;
      }
      class uP extends jd {
        constructor(t, n, r, o, i, s, a, u) {
          super(t, i, s, u),
            (this.sharedStylesHost = n),
            (this.hostEl = r),
            (this.shadowRoot = r.attachShadow({ mode: "open" })),
            this.sharedStylesHost.addHost(this.shadowRoot);
          const c = yw(o.id, o.styles);
          for (const l of c) {
            const d = document.createElement("style");
            a && d.setAttribute("nonce", a),
              (d.textContent = l),
              this.shadowRoot.appendChild(d);
          }
        }
        nodeOrShadowRoot(t) {
          return t === this.hostEl ? this.shadowRoot : t;
        }
        appendChild(t, n) {
          return super.appendChild(this.nodeOrShadowRoot(t), n);
        }
        insertBefore(t, n, r) {
          return super.insertBefore(this.nodeOrShadowRoot(t), n, r);
        }
        removeChild(t, n) {
          return super.removeChild(this.nodeOrShadowRoot(t), n);
        }
        parentNode(t) {
          return this.nodeOrShadowRoot(
            super.parentNode(this.nodeOrShadowRoot(t))
          );
        }
        destroy() {
          this.sharedStylesHost.removeHost(this.shadowRoot);
        }
      }
      class $d extends jd {
        constructor(t, n, r, o, i, s, a, u) {
          super(t, i, s, a),
            (this.sharedStylesHost = n),
            (this.removeStylesOnCompDestroy = o),
            (this.styles = u ? yw(u, r.styles) : r.styles);
        }
        applyStyles() {
          this.sharedStylesHost.addStyles(this.styles);
        }
        destroy() {
          this.removeStylesOnCompDestroy &&
            this.sharedStylesHost.removeStyles(this.styles);
        }
      }
      class Cw extends $d {
        constructor(t, n, r, o, i, s, a, u) {
          const c = o + "-" + r.id;
          super(t, n, r, i, s, a, u, c),
            (this.contentAttr = (function iP(e) {
              return "_ngcontent-%COMP%".replace(Ld, e);
            })(c)),
            (this.hostAttr = (function sP(e) {
              return "_nghost-%COMP%".replace(Ld, e);
            })(c));
        }
        applyToHost(t) {
          this.applyStyles(), this.setAttribute(t, this.hostAttr, "");
        }
        createElement(t, n) {
          const r = super.createElement(t, n);
          return super.setAttribute(r, this.contentAttr, ""), r;
        }
      }
      let cP = (() => {
        class e extends gw {
          constructor(n) {
            super(n);
          }
          supports(n) {
            return !0;
          }
          addEventListener(n, r, o) {
            return (
              n.addEventListener(r, o, !1),
              () => this.removeEventListener(n, r, o)
            );
          }
          removeEventListener(n, r, o) {
            return n.removeEventListener(r, o);
          }
          static #e = (this.ɵfac = function (r) {
            return new (r || e)(b(et));
          });
          static #t = (this.ɵprov = S({ token: e, factory: e.ɵfac }));
        }
        return e;
      })();
      const Ew = ["alt", "control", "meta", "shift"],
        lP = {
          "\b": "Backspace",
          "\t": "Tab",
          "\x7f": "Delete",
          "\x1b": "Escape",
          Del: "Delete",
          Esc: "Escape",
          Left: "ArrowLeft",
          Right: "ArrowRight",
          Up: "ArrowUp",
          Down: "ArrowDown",
          Menu: "ContextMenu",
          Scroll: "ScrollLock",
          Win: "OS",
        },
        dP = {
          alt: (e) => e.altKey,
          control: (e) => e.ctrlKey,
          meta: (e) => e.metaKey,
          shift: (e) => e.shiftKey,
        };
      let fP = (() => {
        class e extends gw {
          constructor(n) {
            super(n);
          }
          supports(n) {
            return null != e.parseEventName(n);
          }
          addEventListener(n, r, o) {
            const i = e.parseEventName(r),
              s = e.eventCallback(i.fullKey, o, this.manager.getZone());
            return this.manager
              .getZone()
              .runOutsideAngular(() => Qr().onAndCancel(n, i.domEventName, s));
          }
          static parseEventName(n) {
            const r = n.toLowerCase().split("."),
              o = r.shift();
            if (0 === r.length || ("keydown" !== o && "keyup" !== o))
              return null;
            const i = e._normalizeKey(r.pop());
            let s = "",
              a = r.indexOf("code");
            if (
              (a > -1 && (r.splice(a, 1), (s = "code.")),
              Ew.forEach((c) => {
                const l = r.indexOf(c);
                l > -1 && (r.splice(l, 1), (s += c + "."));
              }),
              (s += i),
              0 != r.length || 0 === i.length)
            )
              return null;
            const u = {};
            return (u.domEventName = o), (u.fullKey = s), u;
          }
          static matchEventFullKeyCode(n, r) {
            let o = lP[n.key] || n.key,
              i = "";
            return (
              r.indexOf("code.") > -1 && ((o = n.code), (i = "code.")),
              !(null == o || !o) &&
                ((o = o.toLowerCase()),
                " " === o ? (o = "space") : "." === o && (o = "dot"),
                Ew.forEach((s) => {
                  s !== o && (0, dP[s])(n) && (i += s + ".");
                }),
                (i += o),
                i === r)
            );
          }
          static eventCallback(n, r, o) {
            return (i) => {
              e.matchEventFullKeyCode(i, n) && o.runGuarded(() => r(i));
            };
          }
          static _normalizeKey(n) {
            return "esc" === n ? "escape" : n;
          }
          static #e = (this.ɵfac = function (r) {
            return new (r || e)(b(et));
          });
          static #t = (this.ɵprov = S({ token: e, factory: e.ɵfac }));
        }
        return e;
      })();
      const mP = gD(UN, "browser", [
          { provide: jn, useValue: "browser" },
          {
            provide: wg,
            useValue: function hP() {
              Od.makeCurrent();
            },
            multi: !0,
          },
          {
            provide: et,
            useFactory: function gP() {
              return (
                (function Gb(e) {
                  vc = e;
                })(document),
                document
              );
            },
            deps: [],
          },
        ]),
        vP = new I(""),
        bw = [
          {
            provide: ha,
            useClass: class KO {
              addToWindow(t) {
                (J.getAngularTestability = (r, o = !0) => {
                  const i = t.findTestabilityInTree(r, o);
                  if (null == i) throw new w(5103, !1);
                  return i;
                }),
                  (J.getAllAngularTestabilities = () =>
                    t.getAllTestabilities()),
                  (J.getAllAngularRootElements = () => t.getAllRootElements()),
                  J.frameworkStabilizers || (J.frameworkStabilizers = []),
                  J.frameworkStabilizers.push((r) => {
                    const o = J.getAllAngularTestabilities();
                    let i = o.length,
                      s = !1;
                    const a = function (u) {
                      (s = s || u), i--, 0 == i && r(s);
                    };
                    o.forEach((u) => {
                      u.whenStable(a);
                    });
                  });
              }
              findTestabilityInTree(t, n, r) {
                return null == n
                  ? null
                  : t.getTestability(n) ??
                      (r
                        ? Qr().isShadowRoot(n)
                          ? this.findTestabilityInTree(t, n.host, !0)
                          : this.findTestabilityInTree(t, n.parentElement, !0)
                        : null);
              }
            },
            deps: [],
          },
          { provide: lD, useClass: Jl, deps: [ee, Kl, ha] },
          { provide: Jl, useClass: Jl, deps: [ee, Kl, ha] },
        ],
        Sw = [
          { provide: Mc, useValue: "root" },
          {
            provide: Wt,
            useFactory: function pP() {
              return new Wt();
            },
            deps: [],
          },
          { provide: Pd, useClass: cP, multi: !0, deps: [et, ee, jn] },
          { provide: Pd, useClass: fP, multi: !0, deps: [et] },
          Dw,
          mw,
          pw,
          { provide: Mg, useExisting: Dw },
          { provide: cw, useClass: eP, deps: [] },
          [],
        ];
      let yP = (() => {
          class e {
            constructor(n) {}
            static withServerTransition(n) {
              return {
                ngModule: e,
                providers: [{ provide: Ps, useValue: n.appId }],
              };
            }
            static #e = (this.ɵfac = function (r) {
              return new (r || e)(b(vP, 12));
            });
            static #t = (this.ɵmod = Rn({ type: e }));
            static #n = (this.ɵinj = cn({
              providers: [...Sw, ...bw],
              imports: [sw, zN],
            }));
          }
          return e;
        })(),
        Mw = (() => {
          class e {
            constructor(n) {
              this._doc = n;
            }
            getTitle() {
              return this._doc.title;
            }
            setTitle(n) {
              this._doc.title = n || "";
            }
            static #e = (this.ɵfac = function (r) {
              return new (r || e)(b(et));
            });
            static #t = (this.ɵprov = S({
              token: e,
              factory: function (r) {
                let o = null;
                return (
                  (o = r
                    ? new r()
                    : (function wP() {
                        return new Mw(b(et));
                      })()),
                  o
                );
              },
              providedIn: "root",
            }));
          }
          return e;
        })();
      function Jr(e, t) {
        return Q(t) ? we(e, t, 1) : we(e, 1);
      }
      function rn(e, t) {
        return fe((n, r) => {
          let o = 0;
          n.subscribe(he(r, (i) => e.call(t, i, o++) && r.next(i)));
        });
      }
      function Di(e) {
        return fe((t, n) => {
          try {
            t.subscribe(n);
          } finally {
            n.add(e);
          }
        });
      }
      typeof window < "u" && window;
      class xa {}
      class Oa {}
      class kt {
        constructor(t) {
          (this.normalizedNames = new Map()),
            (this.lazyUpdate = null),
            t
              ? "string" == typeof t
                ? (this.lazyInit = () => {
                    (this.headers = new Map()),
                      t.split("\n").forEach((n) => {
                        const r = n.indexOf(":");
                        if (r > 0) {
                          const o = n.slice(0, r),
                            i = o.toLowerCase(),
                            s = n.slice(r + 1).trim();
                          this.maybeSetNormalizedName(o, i),
                            this.headers.has(i)
                              ? this.headers.get(i).push(s)
                              : this.headers.set(i, [s]);
                        }
                      });
                  })
                : typeof Headers < "u" && t instanceof Headers
                ? ((this.headers = new Map()),
                  t.forEach((n, r) => {
                    this.setHeaderEntries(r, n);
                  }))
                : (this.lazyInit = () => {
                    (this.headers = new Map()),
                      Object.entries(t).forEach(([n, r]) => {
                        this.setHeaderEntries(n, r);
                      });
                  })
              : (this.headers = new Map());
        }
        has(t) {
          return this.init(), this.headers.has(t.toLowerCase());
        }
        get(t) {
          this.init();
          const n = this.headers.get(t.toLowerCase());
          return n && n.length > 0 ? n[0] : null;
        }
        keys() {
          return this.init(), Array.from(this.normalizedNames.values());
        }
        getAll(t) {
          return this.init(), this.headers.get(t.toLowerCase()) || null;
        }
        append(t, n) {
          return this.clone({ name: t, value: n, op: "a" });
        }
        set(t, n) {
          return this.clone({ name: t, value: n, op: "s" });
        }
        delete(t, n) {
          return this.clone({ name: t, value: n, op: "d" });
        }
        maybeSetNormalizedName(t, n) {
          this.normalizedNames.has(n) || this.normalizedNames.set(n, t);
        }
        init() {
          this.lazyInit &&
            (this.lazyInit instanceof kt
              ? this.copyFrom(this.lazyInit)
              : this.lazyInit(),
            (this.lazyInit = null),
            this.lazyUpdate &&
              (this.lazyUpdate.forEach((t) => this.applyUpdate(t)),
              (this.lazyUpdate = null)));
        }
        copyFrom(t) {
          t.init(),
            Array.from(t.headers.keys()).forEach((n) => {
              this.headers.set(n, t.headers.get(n)),
                this.normalizedNames.set(n, t.normalizedNames.get(n));
            });
        }
        clone(t) {
          const n = new kt();
          return (
            (n.lazyInit =
              this.lazyInit && this.lazyInit instanceof kt
                ? this.lazyInit
                : this),
            (n.lazyUpdate = (this.lazyUpdate || []).concat([t])),
            n
          );
        }
        applyUpdate(t) {
          const n = t.name.toLowerCase();
          switch (t.op) {
            case "a":
            case "s":
              let r = t.value;
              if (("string" == typeof r && (r = [r]), 0 === r.length)) return;
              this.maybeSetNormalizedName(t.name, n);
              const o = ("a" === t.op ? this.headers.get(n) : void 0) || [];
              o.push(...r), this.headers.set(n, o);
              break;
            case "d":
              const i = t.value;
              if (i) {
                let s = this.headers.get(n);
                if (!s) return;
                (s = s.filter((a) => -1 === i.indexOf(a))),
                  0 === s.length
                    ? (this.headers.delete(n), this.normalizedNames.delete(n))
                    : this.headers.set(n, s);
              } else this.headers.delete(n), this.normalizedNames.delete(n);
          }
        }
        setHeaderEntries(t, n) {
          const r = (Array.isArray(n) ? n : [n]).map((i) => i.toString()),
            o = t.toLowerCase();
          this.headers.set(o, r), this.maybeSetNormalizedName(t, o);
        }
        forEach(t) {
          this.init(),
            Array.from(this.normalizedNames.keys()).forEach((n) =>
              t(this.normalizedNames.get(n), this.headers.get(n))
            );
        }
      }
      class bP {
        encodeKey(t) {
          return Nw(t);
        }
        encodeValue(t) {
          return Nw(t);
        }
        decodeKey(t) {
          return decodeURIComponent(t);
        }
        decodeValue(t) {
          return decodeURIComponent(t);
        }
      }
      const MP = /%(\d[a-f0-9])/gi,
        TP = {
          40: "@",
          "3A": ":",
          24: "$",
          "2C": ",",
          "3B": ";",
          "3D": "=",
          "3F": "?",
          "2F": "/",
        };
      function Nw(e) {
        return encodeURIComponent(e).replace(MP, (t, n) => TP[n] ?? t);
      }
      function Pa(e) {
        return `${e}`;
      }
      class _n {
        constructor(t = {}) {
          if (
            ((this.updates = null),
            (this.cloneFrom = null),
            (this.encoder = t.encoder || new bP()),
            t.fromString)
          ) {
            if (t.fromObject)
              throw new Error("Cannot specify both fromString and fromObject.");
            this.map = (function SP(e, t) {
              const n = new Map();
              return (
                e.length > 0 &&
                  e
                    .replace(/^\?/, "")
                    .split("&")
                    .forEach((o) => {
                      const i = o.indexOf("="),
                        [s, a] =
                          -1 == i
                            ? [t.decodeKey(o), ""]
                            : [
                                t.decodeKey(o.slice(0, i)),
                                t.decodeValue(o.slice(i + 1)),
                              ],
                        u = n.get(s) || [];
                      u.push(a), n.set(s, u);
                    }),
                n
              );
            })(t.fromString, this.encoder);
          } else
            t.fromObject
              ? ((this.map = new Map()),
                Object.keys(t.fromObject).forEach((n) => {
                  const r = t.fromObject[n],
                    o = Array.isArray(r) ? r.map(Pa) : [Pa(r)];
                  this.map.set(n, o);
                }))
              : (this.map = null);
        }
        has(t) {
          return this.init(), this.map.has(t);
        }
        get(t) {
          this.init();
          const n = this.map.get(t);
          return n ? n[0] : null;
        }
        getAll(t) {
          return this.init(), this.map.get(t) || null;
        }
        keys() {
          return this.init(), Array.from(this.map.keys());
        }
        append(t, n) {
          return this.clone({ param: t, value: n, op: "a" });
        }
        appendAll(t) {
          const n = [];
          return (
            Object.keys(t).forEach((r) => {
              const o = t[r];
              Array.isArray(o)
                ? o.forEach((i) => {
                    n.push({ param: r, value: i, op: "a" });
                  })
                : n.push({ param: r, value: o, op: "a" });
            }),
            this.clone(n)
          );
        }
        set(t, n) {
          return this.clone({ param: t, value: n, op: "s" });
        }
        delete(t, n) {
          return this.clone({ param: t, value: n, op: "d" });
        }
        toString() {
          return (
            this.init(),
            this.keys()
              .map((t) => {
                const n = this.encoder.encodeKey(t);
                return this.map
                  .get(t)
                  .map((r) => n + "=" + this.encoder.encodeValue(r))
                  .join("&");
              })
              .filter((t) => "" !== t)
              .join("&")
          );
        }
        clone(t) {
          const n = new _n({ encoder: this.encoder });
          return (
            (n.cloneFrom = this.cloneFrom || this),
            (n.updates = (this.updates || []).concat(t)),
            n
          );
        }
        init() {
          null === this.map && (this.map = new Map()),
            null !== this.cloneFrom &&
              (this.cloneFrom.init(),
              this.cloneFrom
                .keys()
                .forEach((t) => this.map.set(t, this.cloneFrom.map.get(t))),
              this.updates.forEach((t) => {
                switch (t.op) {
                  case "a":
                  case "s":
                    const n =
                      ("a" === t.op ? this.map.get(t.param) : void 0) || [];
                    n.push(Pa(t.value)), this.map.set(t.param, n);
                    break;
                  case "d":
                    if (void 0 === t.value) {
                      this.map.delete(t.param);
                      break;
                    }
                    {
                      let r = this.map.get(t.param) || [];
                      const o = r.indexOf(Pa(t.value));
                      -1 !== o && r.splice(o, 1),
                        r.length > 0
                          ? this.map.set(t.param, r)
                          : this.map.delete(t.param);
                    }
                }
              }),
              (this.cloneFrom = this.updates = null));
        }
      }
      class AP {
        constructor() {
          this.map = new Map();
        }
        set(t, n) {
          return this.map.set(t, n), this;
        }
        get(t) {
          return (
            this.map.has(t) || this.map.set(t, t.defaultValue()),
            this.map.get(t)
          );
        }
        delete(t) {
          return this.map.delete(t), this;
        }
        has(t) {
          return this.map.has(t);
        }
        keys() {
          return this.map.keys();
        }
      }
      function xw(e) {
        return typeof ArrayBuffer < "u" && e instanceof ArrayBuffer;
      }
      function Ow(e) {
        return typeof Blob < "u" && e instanceof Blob;
      }
      function Pw(e) {
        return typeof FormData < "u" && e instanceof FormData;
      }
      class wi {
        constructor(t, n, r, o) {
          let i;
          if (
            ((this.url = n),
            (this.body = null),
            (this.reportProgress = !1),
            (this.withCredentials = !1),
            (this.responseType = "json"),
            (this.method = t.toUpperCase()),
            (function RP(e) {
              switch (e) {
                case "DELETE":
                case "GET":
                case "HEAD":
                case "OPTIONS":
                case "JSONP":
                  return !1;
                default:
                  return !0;
              }
            })(this.method) || o
              ? ((this.body = void 0 !== r ? r : null), (i = o))
              : (i = r),
            i &&
              ((this.reportProgress = !!i.reportProgress),
              (this.withCredentials = !!i.withCredentials),
              i.responseType && (this.responseType = i.responseType),
              i.headers && (this.headers = i.headers),
              i.context && (this.context = i.context),
              i.params && (this.params = i.params)),
            this.headers || (this.headers = new kt()),
            this.context || (this.context = new AP()),
            this.params)
          ) {
            const s = this.params.toString();
            if (0 === s.length) this.urlWithParams = n;
            else {
              const a = n.indexOf("?");
              this.urlWithParams =
                n + (-1 === a ? "?" : a < n.length - 1 ? "&" : "") + s;
            }
          } else (this.params = new _n()), (this.urlWithParams = n);
        }
        serializeBody() {
          return null === this.body
            ? null
            : xw(this.body) ||
              Ow(this.body) ||
              Pw(this.body) ||
              (function NP(e) {
                return (
                  typeof URLSearchParams < "u" && e instanceof URLSearchParams
                );
              })(this.body) ||
              "string" == typeof this.body
            ? this.body
            : this.body instanceof _n
            ? this.body.toString()
            : "object" == typeof this.body ||
              "boolean" == typeof this.body ||
              Array.isArray(this.body)
            ? JSON.stringify(this.body)
            : this.body.toString();
        }
        detectContentTypeHeader() {
          return null === this.body || Pw(this.body)
            ? null
            : Ow(this.body)
            ? this.body.type || null
            : xw(this.body)
            ? null
            : "string" == typeof this.body
            ? "text/plain"
            : this.body instanceof _n
            ? "application/x-www-form-urlencoded;charset=UTF-8"
            : "object" == typeof this.body ||
              "number" == typeof this.body ||
              "boolean" == typeof this.body
            ? "application/json"
            : null;
        }
        clone(t = {}) {
          const n = t.method || this.method,
            r = t.url || this.url,
            o = t.responseType || this.responseType,
            i = void 0 !== t.body ? t.body : this.body,
            s =
              void 0 !== t.withCredentials
                ? t.withCredentials
                : this.withCredentials,
            a =
              void 0 !== t.reportProgress
                ? t.reportProgress
                : this.reportProgress;
          let u = t.headers || this.headers,
            c = t.params || this.params;
          const l = t.context ?? this.context;
          return (
            void 0 !== t.setHeaders &&
              (u = Object.keys(t.setHeaders).reduce(
                (d, f) => d.set(f, t.setHeaders[f]),
                u
              )),
            t.setParams &&
              (c = Object.keys(t.setParams).reduce(
                (d, f) => d.set(f, t.setParams[f]),
                c
              )),
            new wi(n, r, i, {
              params: c,
              headers: u,
              context: l,
              reportProgress: a,
              responseType: o,
              withCredentials: s,
            })
          );
        }
      }
      var Kr = (function (e) {
        return (
          (e[(e.Sent = 0)] = "Sent"),
          (e[(e.UploadProgress = 1)] = "UploadProgress"),
          (e[(e.ResponseHeader = 2)] = "ResponseHeader"),
          (e[(e.DownloadProgress = 3)] = "DownloadProgress"),
          (e[(e.Response = 4)] = "Response"),
          (e[(e.User = 5)] = "User"),
          e
        );
      })(Kr || {});
      class Vd {
        constructor(t, n = 200, r = "OK") {
          (this.headers = t.headers || new kt()),
            (this.status = void 0 !== t.status ? t.status : n),
            (this.statusText = t.statusText || r),
            (this.url = t.url || null),
            (this.ok = this.status >= 200 && this.status < 300);
        }
      }
      class Bd extends Vd {
        constructor(t = {}) {
          super(t), (this.type = Kr.ResponseHeader);
        }
        clone(t = {}) {
          return new Bd({
            headers: t.headers || this.headers,
            status: void 0 !== t.status ? t.status : this.status,
            statusText: t.statusText || this.statusText,
            url: t.url || this.url || void 0,
          });
        }
      }
      class eo extends Vd {
        constructor(t = {}) {
          super(t),
            (this.type = Kr.Response),
            (this.body = void 0 !== t.body ? t.body : null);
        }
        clone(t = {}) {
          return new eo({
            body: void 0 !== t.body ? t.body : this.body,
            headers: t.headers || this.headers,
            status: void 0 !== t.status ? t.status : this.status,
            statusText: t.statusText || this.statusText,
            url: t.url || this.url || void 0,
          });
        }
      }
      class Fw extends Vd {
        constructor(t) {
          super(t, 0, "Unknown Error"),
            (this.name = "HttpErrorResponse"),
            (this.ok = !1),
            (this.message =
              this.status >= 200 && this.status < 300
                ? `Http failure during parsing for ${t.url || "(unknown url)"}`
                : `Http failure response for ${t.url || "(unknown url)"}: ${
                    t.status
                  } ${t.statusText}`),
            (this.error = t.error || null);
        }
      }
      function Ud(e, t) {
        return {
          body: t,
          headers: e.headers,
          context: e.context,
          observe: e.observe,
          params: e.params,
          reportProgress: e.reportProgress,
          responseType: e.responseType,
          withCredentials: e.withCredentials,
        };
      }
      let kw = (() => {
        class e {
          constructor(n) {
            this.handler = n;
          }
          request(n, r, o = {}) {
            let i;
            if (n instanceof wi) i = n;
            else {
              let u, c;
              (u = o.headers instanceof kt ? o.headers : new kt(o.headers)),
                o.params &&
                  (c =
                    o.params instanceof _n
                      ? o.params
                      : new _n({ fromObject: o.params })),
                (i = new wi(n, r, void 0 !== o.body ? o.body : null, {
                  headers: u,
                  context: o.context,
                  params: c,
                  reportProgress: o.reportProgress,
                  responseType: o.responseType || "json",
                  withCredentials: o.withCredentials,
                }));
            }
            const s = A(i).pipe(Jr((u) => this.handler.handle(u)));
            if (n instanceof wi || "events" === o.observe) return s;
            const a = s.pipe(rn((u) => u instanceof eo));
            switch (o.observe || "body") {
              case "body":
                switch (i.responseType) {
                  case "arraybuffer":
                    return a.pipe(
                      U((u) => {
                        if (null !== u.body && !(u.body instanceof ArrayBuffer))
                          throw new Error("Response is not an ArrayBuffer.");
                        return u.body;
                      })
                    );
                  case "blob":
                    return a.pipe(
                      U((u) => {
                        if (null !== u.body && !(u.body instanceof Blob))
                          throw new Error("Response is not a Blob.");
                        return u.body;
                      })
                    );
                  case "text":
                    return a.pipe(
                      U((u) => {
                        if (null !== u.body && "string" != typeof u.body)
                          throw new Error("Response is not a string.");
                        return u.body;
                      })
                    );
                  default:
                    return a.pipe(U((u) => u.body));
                }
              case "response":
                return a;
              default:
                throw new Error(
                  `Unreachable: unhandled observe type ${o.observe}}`
                );
            }
          }
          delete(n, r = {}) {
            return this.request("DELETE", n, r);
          }
          get(n, r = {}) {
            return this.request("GET", n, r);
          }
          head(n, r = {}) {
            return this.request("HEAD", n, r);
          }
          jsonp(n, r) {
            return this.request("JSONP", n, {
              params: new _n().append(r, "JSONP_CALLBACK"),
              observe: "body",
              responseType: "json",
            });
          }
          options(n, r = {}) {
            return this.request("OPTIONS", n, r);
          }
          patch(n, r, o = {}) {
            return this.request("PATCH", n, Ud(o, r));
          }
          post(n, r, o = {}) {
            return this.request("POST", n, Ud(o, r));
          }
          put(n, r, o = {}) {
            return this.request("PUT", n, Ud(o, r));
          }
          static #e = (this.ɵfac = function (r) {
            return new (r || e)(b(xa));
          });
          static #t = (this.ɵprov = S({ token: e, factory: e.ɵfac }));
        }
        return e;
      })();
      function $w(e, t) {
        return t(e);
      }
      function OP(e, t) {
        return (n, r) => t.intercept(n, { handle: (o) => e(o, r) });
      }
      const FP = new I(""),
        Ci = new I(""),
        Hw = new I("");
      function kP() {
        let e = null;
        return (t, n) => {
          null === e &&
            (e = (_(FP, { optional: !0 }) ?? []).reduceRight(OP, $w));
          const r = _(da),
            o = r.add();
          return e(t, n).pipe(Di(() => r.remove(o)));
        };
      }
      let Vw = (() => {
        class e extends xa {
          constructor(n, r) {
            super(),
              (this.backend = n),
              (this.injector = r),
              (this.chain = null),
              (this.pendingTasks = _(da));
          }
          handle(n) {
            if (null === this.chain) {
              const o = Array.from(
                new Set([
                  ...this.injector.get(Ci),
                  ...this.injector.get(Hw, []),
                ])
              );
              this.chain = o.reduceRight(
                (i, s) =>
                  (function PP(e, t, n) {
                    return (r, o) => n.runInContext(() => t(r, (i) => e(i, o)));
                  })(i, s, this.injector),
                $w
              );
            }
            const r = this.pendingTasks.add();
            return this.chain(n, (o) => this.backend.handle(o)).pipe(
              Di(() => this.pendingTasks.remove(r))
            );
          }
          static #e = (this.ɵfac = function (r) {
            return new (r || e)(b(Oa), b(Je));
          });
          static #t = (this.ɵprov = S({ token: e, factory: e.ɵfac }));
        }
        return e;
      })();
      const HP = /^\)\]\}',?\n/;
      let Uw = (() => {
        class e {
          constructor(n) {
            this.xhrFactory = n;
          }
          handle(n) {
            if ("JSONP" === n.method) throw new w(-2800, !1);
            const r = this.xhrFactory;
            return (r.ɵloadImpl ? ve(r.ɵloadImpl()) : A(null)).pipe(
              ht(
                () =>
                  new ae((i) => {
                    const s = r.build();
                    if (
                      (s.open(n.method, n.urlWithParams),
                      n.withCredentials && (s.withCredentials = !0),
                      n.headers.forEach((g, v) =>
                        s.setRequestHeader(g, v.join(","))
                      ),
                      n.headers.has("Accept") ||
                        s.setRequestHeader(
                          "Accept",
                          "application/json, text/plain, */*"
                        ),
                      !n.headers.has("Content-Type"))
                    ) {
                      const g = n.detectContentTypeHeader();
                      null !== g && s.setRequestHeader("Content-Type", g);
                    }
                    if (n.responseType) {
                      const g = n.responseType.toLowerCase();
                      s.responseType = "json" !== g ? g : "text";
                    }
                    const a = n.serializeBody();
                    let u = null;
                    const c = () => {
                        if (null !== u) return u;
                        const g = s.statusText || "OK",
                          v = new kt(s.getAllResponseHeaders()),
                          D =
                            (function VP(e) {
                              return "responseURL" in e && e.responseURL
                                ? e.responseURL
                                : /^X-Request-URL:/m.test(
                                    e.getAllResponseHeaders()
                                  )
                                ? e.getResponseHeader("X-Request-URL")
                                : null;
                            })(s) || n.url;
                        return (
                          (u = new Bd({
                            headers: v,
                            status: s.status,
                            statusText: g,
                            url: D,
                          })),
                          u
                        );
                      },
                      l = () => {
                        let {
                            headers: g,
                            status: v,
                            statusText: D,
                            url: m,
                          } = c(),
                          E = null;
                        204 !== v &&
                          (E =
                            typeof s.response > "u"
                              ? s.responseText
                              : s.response),
                          0 === v && (v = E ? 200 : 0);
                        let T = v >= 200 && v < 300;
                        if ("json" === n.responseType && "string" == typeof E) {
                          const j = E;
                          E = E.replace(HP, "");
                          try {
                            E = "" !== E ? JSON.parse(E) : null;
                          } catch (De) {
                            (E = j),
                              T && ((T = !1), (E = { error: De, text: E }));
                          }
                        }
                        T
                          ? (i.next(
                              new eo({
                                body: E,
                                headers: g,
                                status: v,
                                statusText: D,
                                url: m || void 0,
                              })
                            ),
                            i.complete())
                          : i.error(
                              new Fw({
                                error: E,
                                headers: g,
                                status: v,
                                statusText: D,
                                url: m || void 0,
                              })
                            );
                      },
                      d = (g) => {
                        const { url: v } = c(),
                          D = new Fw({
                            error: g,
                            status: s.status || 0,
                            statusText: s.statusText || "Unknown Error",
                            url: v || void 0,
                          });
                        i.error(D);
                      };
                    let f = !1;
                    const h = (g) => {
                        f || (i.next(c()), (f = !0));
                        let v = { type: Kr.DownloadProgress, loaded: g.loaded };
                        g.lengthComputable && (v.total = g.total),
                          "text" === n.responseType &&
                            s.responseText &&
                            (v.partialText = s.responseText),
                          i.next(v);
                      },
                      p = (g) => {
                        let v = { type: Kr.UploadProgress, loaded: g.loaded };
                        g.lengthComputable && (v.total = g.total), i.next(v);
                      };
                    return (
                      s.addEventListener("load", l),
                      s.addEventListener("error", d),
                      s.addEventListener("timeout", d),
                      s.addEventListener("abort", d),
                      n.reportProgress &&
                        (s.addEventListener("progress", h),
                        null !== a &&
                          s.upload &&
                          s.upload.addEventListener("progress", p)),
                      s.send(a),
                      i.next({ type: Kr.Sent }),
                      () => {
                        s.removeEventListener("error", d),
                          s.removeEventListener("abort", d),
                          s.removeEventListener("load", l),
                          s.removeEventListener("timeout", d),
                          n.reportProgress &&
                            (s.removeEventListener("progress", h),
                            null !== a &&
                              s.upload &&
                              s.upload.removeEventListener("progress", p)),
                          s.readyState !== s.DONE && s.abort();
                      }
                    );
                  })
              )
            );
          }
          static #e = (this.ɵfac = function (r) {
            return new (r || e)(b(cw));
          });
          static #t = (this.ɵprov = S({ token: e, factory: e.ɵfac }));
        }
        return e;
      })();
      const zd = new I("XSRF_ENABLED"),
        zw = new I("XSRF_COOKIE_NAME", {
          providedIn: "root",
          factory: () => "XSRF-TOKEN",
        }),
        Gw = new I("XSRF_HEADER_NAME", {
          providedIn: "root",
          factory: () => "X-XSRF-TOKEN",
        });
      class qw {}
      let zP = (() => {
        class e {
          constructor(n, r, o) {
            (this.doc = n),
              (this.platform = r),
              (this.cookieName = o),
              (this.lastCookieString = ""),
              (this.lastToken = null),
              (this.parseCount = 0);
          }
          getToken() {
            if ("server" === this.platform) return null;
            const n = this.doc.cookie || "";
            return (
              n !== this.lastCookieString &&
                (this.parseCount++,
                (this.lastToken = KD(n, this.cookieName)),
                (this.lastCookieString = n)),
              this.lastToken
            );
          }
          static #e = (this.ɵfac = function (r) {
            return new (r || e)(b(et), b(jn), b(zw));
          });
          static #t = (this.ɵprov = S({ token: e, factory: e.ɵfac }));
        }
        return e;
      })();
      function GP(e, t) {
        const n = e.url.toLowerCase();
        if (
          !_(zd) ||
          "GET" === e.method ||
          "HEAD" === e.method ||
          n.startsWith("http://") ||
          n.startsWith("https://")
        )
          return t(e);
        const r = _(qw).getToken(),
          o = _(Gw);
        return (
          null != r &&
            !e.headers.has(o) &&
            (e = e.clone({ headers: e.headers.set(o, r) })),
          t(e)
        );
      }
      var In = (function (e) {
        return (
          (e[(e.Interceptors = 0)] = "Interceptors"),
          (e[(e.LegacyInterceptors = 1)] = "LegacyInterceptors"),
          (e[(e.CustomXsrfConfiguration = 2)] = "CustomXsrfConfiguration"),
          (e[(e.NoXsrfProtection = 3)] = "NoXsrfProtection"),
          (e[(e.JsonpSupport = 4)] = "JsonpSupport"),
          (e[(e.RequestsMadeViaParent = 5)] = "RequestsMadeViaParent"),
          (e[(e.Fetch = 6)] = "Fetch"),
          e
        );
      })(In || {});
      function qP(...e) {
        const t = [
          kw,
          Uw,
          Vw,
          { provide: xa, useExisting: Vw },
          { provide: Oa, useExisting: Uw },
          { provide: Ci, useValue: GP, multi: !0 },
          { provide: zd, useValue: !0 },
          { provide: qw, useClass: zP },
        ];
        for (const n of e) t.push(...n.ɵproviders);
        return (function Ic(e) {
          return { ɵproviders: e };
        })(t);
      }
      const Ww = new I("LEGACY_INTERCEPTOR_FN");
      function WP() {
        return (function Zn(e, t) {
          return { ɵkind: e, ɵproviders: t };
        })(In.LegacyInterceptors, [
          { provide: Ww, useFactory: kP },
          { provide: Ci, useExisting: Ww, multi: !0 },
        ]);
      }
      let ZP = (() => {
        class e {
          static #e = (this.ɵfac = function (r) {
            return new (r || e)();
          });
          static #t = (this.ɵmod = Rn({ type: e }));
          static #n = (this.ɵinj = cn({ providers: [qP(WP())] }));
        }
        return e;
      })();
      const { isArray: t1 } = Array,
        { getPrototypeOf: n1, prototype: r1, keys: o1 } = Object;
      const { isArray: a1 } = Array;
      function Gd(...e) {
        const t = po(e),
          n = (function zE(e) {
            return Q(lu(e)) ? e.pop() : void 0;
          })(e),
          { args: r, keys: o } = (function i1(e) {
            if (1 === e.length) {
              const t = e[0];
              if (t1(t)) return { args: t, keys: null };
              if (
                (function s1(e) {
                  return e && "object" == typeof e && n1(e) === r1;
                })(t)
              ) {
                const n = o1(t);
                return { args: n.map((r) => t[r]), keys: n };
              }
            }
            return { args: e, keys: null };
          })(e);
        if (0 === r.length) return ve([], t);
        const i = new ae(
          (function d1(e, t, n = an) {
            return (r) => {
              Zw(
                t,
                () => {
                  const { length: o } = e,
                    i = new Array(o);
                  let s = o,
                    a = o;
                  for (let u = 0; u < o; u++)
                    Zw(
                      t,
                      () => {
                        const c = ve(e[u], t);
                        let l = !1;
                        c.subscribe(
                          he(
                            r,
                            (d) => {
                              (i[u] = d),
                                l || ((l = !0), a--),
                                a || r.next(n(i.slice()));
                            },
                            () => {
                              --s || r.complete();
                            }
                          )
                        );
                      },
                      r
                    );
                },
                r
              );
            };
          })(
            r,
            t,
            o
              ? (s) =>
                  (function l1(e, t) {
                    return e.reduce((n, r, o) => ((n[r] = t[o]), n), {});
                  })(o, s)
              : an
          )
        );
        return n
          ? i.pipe(
              (function c1(e) {
                return U((t) =>
                  (function u1(e, t) {
                    return a1(t) ? e(...t) : e(t);
                  })(e, t)
                );
              })(n)
            )
          : i;
      }
      function Zw(e, t, n) {
        e ? Ht(n, e, t) : t();
      }
      const ka = lo(
        (e) =>
          function () {
            e(this),
              (this.name = "EmptyError"),
              (this.message = "no elements in sequence");
          }
      );
      function qd(...e) {
        return (function f1() {
          return tr(1);
        })()(ve(e, po(e)));
      }
      function Yw(e) {
        return new ae((t) => {
          nt(e()).subscribe(t);
        });
      }
      function Ei(e, t) {
        const n = Q(e) ? e : () => e,
          r = (o) => o.error(n());
        return new ae(t ? (o) => t.schedule(r, 0, o) : r);
      }
      function Wd() {
        return fe((e, t) => {
          let n = null;
          e._refCount++;
          const r = he(t, void 0, void 0, void 0, () => {
            if (!e || e._refCount <= 0 || 0 < --e._refCount)
              return void (n = null);
            const o = e._connection,
              i = n;
            (n = null),
              o && (!i || o === i) && o.unsubscribe(),
              t.unsubscribe();
          });
          e.subscribe(r), r.closed || (n = e.connect());
        });
      }
      class Qw extends ae {
        constructor(t, n) {
          super(),
            (this.source = t),
            (this.subjectFactory = n),
            (this._subject = null),
            (this._refCount = 0),
            (this._connection = null),
            Mf(t) && (this.lift = t.lift);
        }
        _subscribe(t) {
          return this.getSubject().subscribe(t);
        }
        getSubject() {
          const t = this._subject;
          return (
            (!t || t.isStopped) && (this._subject = this.subjectFactory()),
            this._subject
          );
        }
        _teardown() {
          this._refCount = 0;
          const { _connection: t } = this;
          (this._subject = this._connection = null), t?.unsubscribe();
        }
        connect() {
          let t = this._connection;
          if (!t) {
            t = this._connection = new We();
            const n = this.getSubject();
            t.add(
              this.source.subscribe(
                he(
                  n,
                  void 0,
                  () => {
                    this._teardown(), n.complete();
                  },
                  (r) => {
                    this._teardown(), n.error(r);
                  },
                  () => this._teardown()
                )
              )
            ),
              t.closed && ((this._connection = null), (t = We.EMPTY));
          }
          return t;
        }
        refCount() {
          return Wd()(this);
        }
      }
      function to(e) {
        return e <= 0
          ? () => bt
          : fe((t, n) => {
              let r = 0;
              t.subscribe(
                he(n, (o) => {
                  ++r <= e && (n.next(o), e <= r && n.complete());
                })
              );
            });
      }
      function La(e) {
        return fe((t, n) => {
          let r = !1;
          t.subscribe(
            he(
              n,
              (o) => {
                (r = !0), n.next(o);
              },
              () => {
                r || n.next(e), n.complete();
              }
            )
          );
        });
      }
      function Xw(e = p1) {
        return fe((t, n) => {
          let r = !1;
          t.subscribe(
            he(
              n,
              (o) => {
                (r = !0), n.next(o);
              },
              () => (r ? n.complete() : n.error(e()))
            )
          );
        });
      }
      function p1() {
        return new ka();
      }
      function Yn(e, t) {
        const n = arguments.length >= 2;
        return (r) =>
          r.pipe(
            e ? rn((o, i) => e(o, i, r)) : an,
            to(1),
            n ? La(t) : Xw(() => new ka())
          );
      }
      function Ae(e, t, n) {
        const r = Q(e) || t || n ? { next: e, error: t, complete: n } : e;
        return r
          ? fe((o, i) => {
              var s;
              null === (s = r.subscribe) || void 0 === s || s.call(r);
              let a = !0;
              o.subscribe(
                he(
                  i,
                  (u) => {
                    var c;
                    null === (c = r.next) || void 0 === c || c.call(r, u),
                      i.next(u);
                  },
                  () => {
                    var u;
                    (a = !1),
                      null === (u = r.complete) || void 0 === u || u.call(r),
                      i.complete();
                  },
                  (u) => {
                    var c;
                    (a = !1),
                      null === (c = r.error) || void 0 === c || c.call(r, u),
                      i.error(u);
                  },
                  () => {
                    var u, c;
                    a &&
                      (null === (u = r.unsubscribe) ||
                        void 0 === u ||
                        u.call(r)),
                      null === (c = r.finalize) || void 0 === c || c.call(r);
                  }
                )
              );
            })
          : an;
      }
      function Qn(e) {
        return fe((t, n) => {
          let i,
            r = null,
            o = !1;
          (r = t.subscribe(
            he(n, void 0, void 0, (s) => {
              (i = nt(e(s, Qn(e)(t)))),
                r ? (r.unsubscribe(), (r = null), i.subscribe(n)) : (o = !0);
            })
          )),
            o && (r.unsubscribe(), (r = null), i.subscribe(n));
        });
      }
      function Zd(e) {
        return e <= 0
          ? () => bt
          : fe((t, n) => {
              let r = [];
              t.subscribe(
                he(
                  n,
                  (o) => {
                    r.push(o), e < r.length && r.shift();
                  },
                  () => {
                    for (const o of r) n.next(o);
                    n.complete();
                  },
                  void 0,
                  () => {
                    r = null;
                  }
                )
              );
            });
      }
      const L = "primary",
        _i = Symbol("RouteTitle");
      class w1 {
        constructor(t) {
          this.params = t || {};
        }
        has(t) {
          return Object.prototype.hasOwnProperty.call(this.params, t);
        }
        get(t) {
          if (this.has(t)) {
            const n = this.params[t];
            return Array.isArray(n) ? n[0] : n;
          }
          return null;
        }
        getAll(t) {
          if (this.has(t)) {
            const n = this.params[t];
            return Array.isArray(n) ? n : [n];
          }
          return [];
        }
        get keys() {
          return Object.keys(this.params);
        }
      }
      function no(e) {
        return new w1(e);
      }
      function C1(e, t, n) {
        const r = n.path.split("/");
        if (
          r.length > e.length ||
          ("full" === n.pathMatch && (t.hasChildren() || r.length < e.length))
        )
          return null;
        const o = {};
        for (let i = 0; i < r.length; i++) {
          const s = r[i],
            a = e[i];
          if (s.startsWith(":")) o[s.substring(1)] = a;
          else if (s !== a.path) return null;
        }
        return { consumed: e.slice(0, r.length), posParams: o };
      }
      function Lt(e, t) {
        const n = e ? Object.keys(e) : void 0,
          r = t ? Object.keys(t) : void 0;
        if (!n || !r || n.length != r.length) return !1;
        let o;
        for (let i = 0; i < n.length; i++)
          if (((o = n[i]), !Jw(e[o], t[o]))) return !1;
        return !0;
      }
      function Jw(e, t) {
        if (Array.isArray(e) && Array.isArray(t)) {
          if (e.length !== t.length) return !1;
          const n = [...e].sort(),
            r = [...t].sort();
          return n.every((o, i) => r[i] === o);
        }
        return e === t;
      }
      function Kw(e) {
        return e.length > 0 ? e[e.length - 1] : null;
      }
      function bn(e) {
        return (function e1(e) {
          return !!e && (e instanceof ae || (Q(e.lift) && Q(e.subscribe)));
        })(e)
          ? e
          : ta(e)
          ? ve(Promise.resolve(e))
          : A(e);
      }
      const _1 = {
          exact: function nC(e, t, n) {
            if (
              !Xn(e.segments, t.segments) ||
              !ja(e.segments, t.segments, n) ||
              e.numberOfChildren !== t.numberOfChildren
            )
              return !1;
            for (const r in t.children)
              if (!e.children[r] || !nC(e.children[r], t.children[r], n))
                return !1;
            return !0;
          },
          subset: rC,
        },
        eC = {
          exact: function I1(e, t) {
            return Lt(e, t);
          },
          subset: function b1(e, t) {
            return (
              Object.keys(t).length <= Object.keys(e).length &&
              Object.keys(t).every((n) => Jw(e[n], t[n]))
            );
          },
          ignored: () => !0,
        };
      function tC(e, t, n) {
        return (
          _1[n.paths](e.root, t.root, n.matrixParams) &&
          eC[n.queryParams](e.queryParams, t.queryParams) &&
          !("exact" === n.fragment && e.fragment !== t.fragment)
        );
      }
      function rC(e, t, n) {
        return oC(e, t, t.segments, n);
      }
      function oC(e, t, n, r) {
        if (e.segments.length > n.length) {
          const o = e.segments.slice(0, n.length);
          return !(!Xn(o, n) || t.hasChildren() || !ja(o, n, r));
        }
        if (e.segments.length === n.length) {
          if (!Xn(e.segments, n) || !ja(e.segments, n, r)) return !1;
          for (const o in t.children)
            if (!e.children[o] || !rC(e.children[o], t.children[o], r))
              return !1;
          return !0;
        }
        {
          const o = n.slice(0, e.segments.length),
            i = n.slice(e.segments.length);
          return (
            !!(Xn(e.segments, o) && ja(e.segments, o, r) && e.children[L]) &&
            oC(e.children[L], t, i, r)
          );
        }
      }
      function ja(e, t, n) {
        return t.every((r, o) => eC[n](e[o].parameters, r.parameters));
      }
      class ro {
        constructor(t = new Y([], {}), n = {}, r = null) {
          (this.root = t), (this.queryParams = n), (this.fragment = r);
        }
        get queryParamMap() {
          return (
            this._queryParamMap || (this._queryParamMap = no(this.queryParams)),
            this._queryParamMap
          );
        }
        toString() {
          return T1.serialize(this);
        }
      }
      class Y {
        constructor(t, n) {
          (this.segments = t),
            (this.children = n),
            (this.parent = null),
            Object.values(n).forEach((r) => (r.parent = this));
        }
        hasChildren() {
          return this.numberOfChildren > 0;
        }
        get numberOfChildren() {
          return Object.keys(this.children).length;
        }
        toString() {
          return $a(this);
        }
      }
      class Ii {
        constructor(t, n) {
          (this.path = t), (this.parameters = n);
        }
        get parameterMap() {
          return (
            this._parameterMap || (this._parameterMap = no(this.parameters)),
            this._parameterMap
          );
        }
        toString() {
          return aC(this);
        }
      }
      function Xn(e, t) {
        return e.length === t.length && e.every((n, r) => n.path === t[r].path);
      }
      let bi = (() => {
        class e {
          static #e = (this.ɵfac = function (r) {
            return new (r || e)();
          });
          static #t = (this.ɵprov = S({
            token: e,
            factory: function () {
              return new Yd();
            },
            providedIn: "root",
          }));
        }
        return e;
      })();
      class Yd {
        parse(t) {
          const n = new $1(t);
          return new ro(
            n.parseRootSegment(),
            n.parseQueryParams(),
            n.parseFragment()
          );
        }
        serialize(t) {
          const n = `/${Si(t.root, !0)}`,
            r = (function N1(e) {
              const t = Object.keys(e)
                .map((n) => {
                  const r = e[n];
                  return Array.isArray(r)
                    ? r.map((o) => `${Ha(n)}=${Ha(o)}`).join("&")
                    : `${Ha(n)}=${Ha(r)}`;
                })
                .filter((n) => !!n);
              return t.length ? `?${t.join("&")}` : "";
            })(t.queryParams);
          return `${n}${r}${
            "string" == typeof t.fragment
              ? `#${(function A1(e) {
                  return encodeURI(e);
                })(t.fragment)}`
              : ""
          }`;
        }
      }
      const T1 = new Yd();
      function $a(e) {
        return e.segments.map((t) => aC(t)).join("/");
      }
      function Si(e, t) {
        if (!e.hasChildren()) return $a(e);
        if (t) {
          const n = e.children[L] ? Si(e.children[L], !1) : "",
            r = [];
          return (
            Object.entries(e.children).forEach(([o, i]) => {
              o !== L && r.push(`${o}:${Si(i, !1)}`);
            }),
            r.length > 0 ? `${n}(${r.join("//")})` : n
          );
        }
        {
          const n = (function M1(e, t) {
            let n = [];
            return (
              Object.entries(e.children).forEach(([r, o]) => {
                r === L && (n = n.concat(t(o, r)));
              }),
              Object.entries(e.children).forEach(([r, o]) => {
                r !== L && (n = n.concat(t(o, r)));
              }),
              n
            );
          })(e, (r, o) =>
            o === L ? [Si(e.children[L], !1)] : [`${o}:${Si(r, !1)}`]
          );
          return 1 === Object.keys(e.children).length && null != e.children[L]
            ? `${$a(e)}/${n[0]}`
            : `${$a(e)}/(${n.join("//")})`;
        }
      }
      function iC(e) {
        return encodeURIComponent(e)
          .replace(/%40/g, "@")
          .replace(/%3A/gi, ":")
          .replace(/%24/g, "$")
          .replace(/%2C/gi, ",");
      }
      function Ha(e) {
        return iC(e).replace(/%3B/gi, ";");
      }
      function Qd(e) {
        return iC(e)
          .replace(/\(/g, "%28")
          .replace(/\)/g, "%29")
          .replace(/%26/gi, "&");
      }
      function Va(e) {
        return decodeURIComponent(e);
      }
      function sC(e) {
        return Va(e.replace(/\+/g, "%20"));
      }
      function aC(e) {
        return `${Qd(e.path)}${(function R1(e) {
          return Object.keys(e)
            .map((t) => `;${Qd(t)}=${Qd(e[t])}`)
            .join("");
        })(e.parameters)}`;
      }
      const x1 = /^[^\/()?;#]+/;
      function Xd(e) {
        const t = e.match(x1);
        return t ? t[0] : "";
      }
      const O1 = /^[^\/()?;=#]+/,
        F1 = /^[^=?&#]+/,
        L1 = /^[^&#]+/;
      class $1 {
        constructor(t) {
          (this.url = t), (this.remaining = t);
        }
        parseRootSegment() {
          return (
            this.consumeOptional("/"),
            "" === this.remaining ||
            this.peekStartsWith("?") ||
            this.peekStartsWith("#")
              ? new Y([], {})
              : new Y([], this.parseChildren())
          );
        }
        parseQueryParams() {
          const t = {};
          if (this.consumeOptional("?"))
            do {
              this.parseQueryParam(t);
            } while (this.consumeOptional("&"));
          return t;
        }
        parseFragment() {
          return this.consumeOptional("#")
            ? decodeURIComponent(this.remaining)
            : null;
        }
        parseChildren() {
          if ("" === this.remaining) return {};
          this.consumeOptional("/");
          const t = [];
          for (
            this.peekStartsWith("(") || t.push(this.parseSegment());
            this.peekStartsWith("/") &&
            !this.peekStartsWith("//") &&
            !this.peekStartsWith("/(");

          )
            this.capture("/"), t.push(this.parseSegment());
          let n = {};
          this.peekStartsWith("/(") &&
            (this.capture("/"), (n = this.parseParens(!0)));
          let r = {};
          return (
            this.peekStartsWith("(") && (r = this.parseParens(!1)),
            (t.length > 0 || Object.keys(n).length > 0) && (r[L] = new Y(t, n)),
            r
          );
        }
        parseSegment() {
          const t = Xd(this.remaining);
          if ("" === t && this.peekStartsWith(";")) throw new w(4009, !1);
          return this.capture(t), new Ii(Va(t), this.parseMatrixParams());
        }
        parseMatrixParams() {
          const t = {};
          for (; this.consumeOptional(";"); ) this.parseParam(t);
          return t;
        }
        parseParam(t) {
          const n = (function P1(e) {
            const t = e.match(O1);
            return t ? t[0] : "";
          })(this.remaining);
          if (!n) return;
          this.capture(n);
          let r = "";
          if (this.consumeOptional("=")) {
            const o = Xd(this.remaining);
            o && ((r = o), this.capture(r));
          }
          t[Va(n)] = Va(r);
        }
        parseQueryParam(t) {
          const n = (function k1(e) {
            const t = e.match(F1);
            return t ? t[0] : "";
          })(this.remaining);
          if (!n) return;
          this.capture(n);
          let r = "";
          if (this.consumeOptional("=")) {
            const s = (function j1(e) {
              const t = e.match(L1);
              return t ? t[0] : "";
            })(this.remaining);
            s && ((r = s), this.capture(r));
          }
          const o = sC(n),
            i = sC(r);
          if (t.hasOwnProperty(o)) {
            let s = t[o];
            Array.isArray(s) || ((s = [s]), (t[o] = s)), s.push(i);
          } else t[o] = i;
        }
        parseParens(t) {
          const n = {};
          for (
            this.capture("(");
            !this.consumeOptional(")") && this.remaining.length > 0;

          ) {
            const r = Xd(this.remaining),
              o = this.remaining[r.length];
            if ("/" !== o && ")" !== o && ";" !== o) throw new w(4010, !1);
            let i;
            r.indexOf(":") > -1
              ? ((i = r.slice(0, r.indexOf(":"))),
                this.capture(i),
                this.capture(":"))
              : t && (i = L);
            const s = this.parseChildren();
            (n[i] = 1 === Object.keys(s).length ? s[L] : new Y([], s)),
              this.consumeOptional("//");
          }
          return n;
        }
        peekStartsWith(t) {
          return this.remaining.startsWith(t);
        }
        consumeOptional(t) {
          return (
            !!this.peekStartsWith(t) &&
            ((this.remaining = this.remaining.substring(t.length)), !0)
          );
        }
        capture(t) {
          if (!this.consumeOptional(t)) throw new w(4011, !1);
        }
      }
      function uC(e) {
        return e.segments.length > 0 ? new Y([], { [L]: e }) : e;
      }
      function cC(e) {
        const t = {};
        for (const r of Object.keys(e.children)) {
          const i = cC(e.children[r]);
          if (r === L && 0 === i.segments.length && i.hasChildren())
            for (const [s, a] of Object.entries(i.children)) t[s] = a;
          else (i.segments.length > 0 || i.hasChildren()) && (t[r] = i);
        }
        return (function H1(e) {
          if (1 === e.numberOfChildren && e.children[L]) {
            const t = e.children[L];
            return new Y(e.segments.concat(t.segments), t.children);
          }
          return e;
        })(new Y(e.segments, t));
      }
      function Jn(e) {
        return e instanceof ro;
      }
      function lC(e) {
        let t;
        const o = uC(
          (function n(i) {
            const s = {};
            for (const u of i.children) {
              const c = n(u);
              s[u.outlet] = c;
            }
            const a = new Y(i.url, s);
            return i === e && (t = a), a;
          })(e.root)
        );
        return t ?? o;
      }
      function dC(e, t, n, r) {
        let o = e;
        for (; o.parent; ) o = o.parent;
        if (0 === t.length) return Jd(o, o, o, n, r);
        const i = (function B1(e) {
          if ("string" == typeof e[0] && 1 === e.length && "/" === e[0])
            return new hC(!0, 0, e);
          let t = 0,
            n = !1;
          const r = e.reduce((o, i, s) => {
            if ("object" == typeof i && null != i) {
              if (i.outlets) {
                const a = {};
                return (
                  Object.entries(i.outlets).forEach(([u, c]) => {
                    a[u] = "string" == typeof c ? c.split("/") : c;
                  }),
                  [...o, { outlets: a }]
                );
              }
              if (i.segmentPath) return [...o, i.segmentPath];
            }
            return "string" != typeof i
              ? [...o, i]
              : 0 === s
              ? (i.split("/").forEach((a, u) => {
                  (0 == u && "." === a) ||
                    (0 == u && "" === a
                      ? (n = !0)
                      : ".." === a
                      ? t++
                      : "" != a && o.push(a));
                }),
                o)
              : [...o, i];
          }, []);
          return new hC(n, t, r);
        })(t);
        if (i.toRoot()) return Jd(o, o, new Y([], {}), n, r);
        const s = (function U1(e, t, n) {
            if (e.isAbsolute) return new Ua(t, !0, 0);
            if (!n) return new Ua(t, !1, NaN);
            if (null === n.parent) return new Ua(n, !0, 0);
            const r = Ba(e.commands[0]) ? 0 : 1;
            return (function z1(e, t, n) {
              let r = e,
                o = t,
                i = n;
              for (; i > o; ) {
                if (((i -= o), (r = r.parent), !r)) throw new w(4005, !1);
                o = r.segments.length;
              }
              return new Ua(r, !1, o - i);
            })(n, n.segments.length - 1 + r, e.numberOfDoubleDots);
          })(i, o, e),
          a = s.processChildren
            ? Ti(s.segmentGroup, s.index, i.commands)
            : pC(s.segmentGroup, s.index, i.commands);
        return Jd(o, s.segmentGroup, a, n, r);
      }
      function Ba(e) {
        return (
          "object" == typeof e && null != e && !e.outlets && !e.segmentPath
        );
      }
      function Mi(e) {
        return "object" == typeof e && null != e && e.outlets;
      }
      function Jd(e, t, n, r, o) {
        let s,
          i = {};
        r &&
          Object.entries(r).forEach(([u, c]) => {
            i[u] = Array.isArray(c) ? c.map((l) => `${l}`) : `${c}`;
          }),
          (s = e === t ? n : fC(e, t, n));
        const a = uC(cC(s));
        return new ro(a, i, o);
      }
      function fC(e, t, n) {
        const r = {};
        return (
          Object.entries(e.children).forEach(([o, i]) => {
            r[o] = i === t ? n : fC(i, t, n);
          }),
          new Y(e.segments, r)
        );
      }
      class hC {
        constructor(t, n, r) {
          if (
            ((this.isAbsolute = t),
            (this.numberOfDoubleDots = n),
            (this.commands = r),
            t && r.length > 0 && Ba(r[0]))
          )
            throw new w(4003, !1);
          const o = r.find(Mi);
          if (o && o !== Kw(r)) throw new w(4004, !1);
        }
        toRoot() {
          return (
            this.isAbsolute &&
            1 === this.commands.length &&
            "/" == this.commands[0]
          );
        }
      }
      class Ua {
        constructor(t, n, r) {
          (this.segmentGroup = t), (this.processChildren = n), (this.index = r);
        }
      }
      function pC(e, t, n) {
        if (
          (e || (e = new Y([], {})), 0 === e.segments.length && e.hasChildren())
        )
          return Ti(e, t, n);
        const r = (function q1(e, t, n) {
            let r = 0,
              o = t;
            const i = { match: !1, pathIndex: 0, commandIndex: 0 };
            for (; o < e.segments.length; ) {
              if (r >= n.length) return i;
              const s = e.segments[o],
                a = n[r];
              if (Mi(a)) break;
              const u = `${a}`,
                c = r < n.length - 1 ? n[r + 1] : null;
              if (o > 0 && void 0 === u) break;
              if (u && c && "object" == typeof c && void 0 === c.outlets) {
                if (!mC(u, c, s)) return i;
                r += 2;
              } else {
                if (!mC(u, {}, s)) return i;
                r++;
              }
              o++;
            }
            return { match: !0, pathIndex: o, commandIndex: r };
          })(e, t, n),
          o = n.slice(r.commandIndex);
        if (r.match && r.pathIndex < e.segments.length) {
          const i = new Y(e.segments.slice(0, r.pathIndex), {});
          return (
            (i.children[L] = new Y(e.segments.slice(r.pathIndex), e.children)),
            Ti(i, 0, o)
          );
        }
        return r.match && 0 === o.length
          ? new Y(e.segments, {})
          : r.match && !e.hasChildren()
          ? Kd(e, t, n)
          : r.match
          ? Ti(e, 0, o)
          : Kd(e, t, n);
      }
      function Ti(e, t, n) {
        if (0 === n.length) return new Y(e.segments, {});
        {
          const r = (function G1(e) {
              return Mi(e[0]) ? e[0].outlets : { [L]: e };
            })(n),
            o = {};
          if (
            Object.keys(r).some((i) => i !== L) &&
            e.children[L] &&
            1 === e.numberOfChildren &&
            0 === e.children[L].segments.length
          ) {
            const i = Ti(e.children[L], t, n);
            return new Y(e.segments, i.children);
          }
          return (
            Object.entries(r).forEach(([i, s]) => {
              "string" == typeof s && (s = [s]),
                null !== s && (o[i] = pC(e.children[i], t, s));
            }),
            Object.entries(e.children).forEach(([i, s]) => {
              void 0 === r[i] && (o[i] = s);
            }),
            new Y(e.segments, o)
          );
        }
      }
      function Kd(e, t, n) {
        const r = e.segments.slice(0, t);
        let o = 0;
        for (; o < n.length; ) {
          const i = n[o];
          if (Mi(i)) {
            const u = W1(i.outlets);
            return new Y(r, u);
          }
          if (0 === o && Ba(n[0])) {
            r.push(new Ii(e.segments[t].path, gC(n[0]))), o++;
            continue;
          }
          const s = Mi(i) ? i.outlets[L] : `${i}`,
            a = o < n.length - 1 ? n[o + 1] : null;
          s && a && Ba(a)
            ? (r.push(new Ii(s, gC(a))), (o += 2))
            : (r.push(new Ii(s, {})), o++);
        }
        return new Y(r, {});
      }
      function W1(e) {
        const t = {};
        return (
          Object.entries(e).forEach(([n, r]) => {
            "string" == typeof r && (r = [r]),
              null !== r && (t[n] = Kd(new Y([], {}), 0, r));
          }),
          t
        );
      }
      function gC(e) {
        const t = {};
        return Object.entries(e).forEach(([n, r]) => (t[n] = `${r}`)), t;
      }
      function mC(e, t, n) {
        return e == n.path && Lt(t, n.parameters);
      }
      const Ai = "imperative";
      class jt {
        constructor(t, n) {
          (this.id = t), (this.url = n);
        }
      }
      class za extends jt {
        constructor(t, n, r = "imperative", o = null) {
          super(t, n),
            (this.type = 0),
            (this.navigationTrigger = r),
            (this.restoredState = o);
        }
        toString() {
          return `NavigationStart(id: ${this.id}, url: '${this.url}')`;
        }
      }
      class Sn extends jt {
        constructor(t, n, r) {
          super(t, n), (this.urlAfterRedirects = r), (this.type = 1);
        }
        toString() {
          return `NavigationEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}')`;
        }
      }
      class Ri extends jt {
        constructor(t, n, r, o) {
          super(t, n), (this.reason = r), (this.code = o), (this.type = 2);
        }
        toString() {
          return `NavigationCancel(id: ${this.id}, url: '${this.url}')`;
        }
      }
      class oo extends jt {
        constructor(t, n, r, o) {
          super(t, n), (this.reason = r), (this.code = o), (this.type = 16);
        }
      }
      class Ga extends jt {
        constructor(t, n, r, o) {
          super(t, n), (this.error = r), (this.target = o), (this.type = 3);
        }
        toString() {
          return `NavigationError(id: ${this.id}, url: '${this.url}', error: ${this.error})`;
        }
      }
      class vC extends jt {
        constructor(t, n, r, o) {
          super(t, n),
            (this.urlAfterRedirects = r),
            (this.state = o),
            (this.type = 4);
        }
        toString() {
          return `RoutesRecognized(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`;
        }
      }
      class Z1 extends jt {
        constructor(t, n, r, o) {
          super(t, n),
            (this.urlAfterRedirects = r),
            (this.state = o),
            (this.type = 7);
        }
        toString() {
          return `GuardsCheckStart(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`;
        }
      }
      class Y1 extends jt {
        constructor(t, n, r, o, i) {
          super(t, n),
            (this.urlAfterRedirects = r),
            (this.state = o),
            (this.shouldActivate = i),
            (this.type = 8);
        }
        toString() {
          return `GuardsCheckEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state}, shouldActivate: ${this.shouldActivate})`;
        }
      }
      class Q1 extends jt {
        constructor(t, n, r, o) {
          super(t, n),
            (this.urlAfterRedirects = r),
            (this.state = o),
            (this.type = 5);
        }
        toString() {
          return `ResolveStart(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`;
        }
      }
      class X1 extends jt {
        constructor(t, n, r, o) {
          super(t, n),
            (this.urlAfterRedirects = r),
            (this.state = o),
            (this.type = 6);
        }
        toString() {
          return `ResolveEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`;
        }
      }
      class J1 {
        constructor(t) {
          (this.route = t), (this.type = 9);
        }
        toString() {
          return `RouteConfigLoadStart(path: ${this.route.path})`;
        }
      }
      class K1 {
        constructor(t) {
          (this.route = t), (this.type = 10);
        }
        toString() {
          return `RouteConfigLoadEnd(path: ${this.route.path})`;
        }
      }
      class eF {
        constructor(t) {
          (this.snapshot = t), (this.type = 11);
        }
        toString() {
          return `ChildActivationStart(path: '${
            (this.snapshot.routeConfig && this.snapshot.routeConfig.path) || ""
          }')`;
        }
      }
      class tF {
        constructor(t) {
          (this.snapshot = t), (this.type = 12);
        }
        toString() {
          return `ChildActivationEnd(path: '${
            (this.snapshot.routeConfig && this.snapshot.routeConfig.path) || ""
          }')`;
        }
      }
      class nF {
        constructor(t) {
          (this.snapshot = t), (this.type = 13);
        }
        toString() {
          return `ActivationStart(path: '${
            (this.snapshot.routeConfig && this.snapshot.routeConfig.path) || ""
          }')`;
        }
      }
      class rF {
        constructor(t) {
          (this.snapshot = t), (this.type = 14);
        }
        toString() {
          return `ActivationEnd(path: '${
            (this.snapshot.routeConfig && this.snapshot.routeConfig.path) || ""
          }')`;
        }
      }
      class yC {
        constructor(t, n, r) {
          (this.routerEvent = t),
            (this.position = n),
            (this.anchor = r),
            (this.type = 15);
        }
        toString() {
          return `Scroll(anchor: '${this.anchor}', position: '${
            this.position ? `${this.position[0]}, ${this.position[1]}` : null
          }')`;
        }
      }
      class ef {}
      class tf {
        constructor(t) {
          this.url = t;
        }
      }
      class oF {
        constructor() {
          (this.outlet = null),
            (this.route = null),
            (this.injector = null),
            (this.children = new Ni()),
            (this.attachRef = null);
        }
      }
      let Ni = (() => {
        class e {
          constructor() {
            this.contexts = new Map();
          }
          onChildOutletCreated(n, r) {
            const o = this.getOrCreateContext(n);
            (o.outlet = r), this.contexts.set(n, o);
          }
          onChildOutletDestroyed(n) {
            const r = this.getContext(n);
            r && ((r.outlet = null), (r.attachRef = null));
          }
          onOutletDeactivated() {
            const n = this.contexts;
            return (this.contexts = new Map()), n;
          }
          onOutletReAttached(n) {
            this.contexts = n;
          }
          getOrCreateContext(n) {
            let r = this.getContext(n);
            return r || ((r = new oF()), this.contexts.set(n, r)), r;
          }
          getContext(n) {
            return this.contexts.get(n) || null;
          }
          static #e = (this.ɵfac = function (r) {
            return new (r || e)();
          });
          static #t = (this.ɵprov = S({
            token: e,
            factory: e.ɵfac,
            providedIn: "root",
          }));
        }
        return e;
      })();
      class DC {
        constructor(t) {
          this._root = t;
        }
        get root() {
          return this._root.value;
        }
        parent(t) {
          const n = this.pathFromRoot(t);
          return n.length > 1 ? n[n.length - 2] : null;
        }
        children(t) {
          const n = nf(t, this._root);
          return n ? n.children.map((r) => r.value) : [];
        }
        firstChild(t) {
          const n = nf(t, this._root);
          return n && n.children.length > 0 ? n.children[0].value : null;
        }
        siblings(t) {
          const n = rf(t, this._root);
          return n.length < 2
            ? []
            : n[n.length - 2].children
                .map((o) => o.value)
                .filter((o) => o !== t);
        }
        pathFromRoot(t) {
          return rf(t, this._root).map((n) => n.value);
        }
      }
      function nf(e, t) {
        if (e === t.value) return t;
        for (const n of t.children) {
          const r = nf(e, n);
          if (r) return r;
        }
        return null;
      }
      function rf(e, t) {
        if (e === t.value) return [t];
        for (const n of t.children) {
          const r = rf(e, n);
          if (r.length) return r.unshift(t), r;
        }
        return [];
      }
      class on {
        constructor(t, n) {
          (this.value = t), (this.children = n);
        }
        toString() {
          return `TreeNode(${this.value})`;
        }
      }
      function io(e) {
        const t = {};
        return e && e.children.forEach((n) => (t[n.value.outlet] = n)), t;
      }
      class wC extends DC {
        constructor(t, n) {
          super(t), (this.snapshot = n), sf(this, t);
        }
        toString() {
          return this.snapshot.toString();
        }
      }
      function CC(e, t) {
        const n = (function iF(e, t) {
            const s = new qa([], {}, {}, "", {}, L, t, null, {});
            return new _C("", new on(s, []));
          })(0, t),
          r = new rt([new Ii("", {})]),
          o = new rt({}),
          i = new rt({}),
          s = new rt({}),
          a = new rt(""),
          u = new Kn(r, o, s, a, i, L, t, n.root);
        return (u.snapshot = n.root), new wC(new on(u, []), n);
      }
      class Kn {
        constructor(t, n, r, o, i, s, a, u) {
          (this.urlSubject = t),
            (this.paramsSubject = n),
            (this.queryParamsSubject = r),
            (this.fragmentSubject = o),
            (this.dataSubject = i),
            (this.outlet = s),
            (this.component = a),
            (this._futureSnapshot = u),
            (this.title = this.dataSubject?.pipe(U((c) => c[_i])) ?? A(void 0)),
            (this.url = t),
            (this.params = n),
            (this.queryParams = r),
            (this.fragment = o),
            (this.data = i);
        }
        get routeConfig() {
          return this._futureSnapshot.routeConfig;
        }
        get root() {
          return this._routerState.root;
        }
        get parent() {
          return this._routerState.parent(this);
        }
        get firstChild() {
          return this._routerState.firstChild(this);
        }
        get children() {
          return this._routerState.children(this);
        }
        get pathFromRoot() {
          return this._routerState.pathFromRoot(this);
        }
        get paramMap() {
          return (
            this._paramMap ||
              (this._paramMap = this.params.pipe(U((t) => no(t)))),
            this._paramMap
          );
        }
        get queryParamMap() {
          return (
            this._queryParamMap ||
              (this._queryParamMap = this.queryParams.pipe(U((t) => no(t)))),
            this._queryParamMap
          );
        }
        toString() {
          return this.snapshot
            ? this.snapshot.toString()
            : `Future(${this._futureSnapshot})`;
        }
      }
      function EC(e, t = "emptyOnly") {
        const n = e.pathFromRoot;
        let r = 0;
        if ("always" !== t)
          for (r = n.length - 1; r >= 1; ) {
            const o = n[r],
              i = n[r - 1];
            if (o.routeConfig && "" === o.routeConfig.path) r--;
            else {
              if (i.component) break;
              r--;
            }
          }
        return (function sF(e) {
          return e.reduce(
            (t, n) => ({
              params: { ...t.params, ...n.params },
              data: { ...t.data, ...n.data },
              resolve: {
                ...n.data,
                ...t.resolve,
                ...n.routeConfig?.data,
                ...n._resolvedData,
              },
            }),
            { params: {}, data: {}, resolve: {} }
          );
        })(n.slice(r));
      }
      class qa {
        get title() {
          return this.data?.[_i];
        }
        constructor(t, n, r, o, i, s, a, u, c) {
          (this.url = t),
            (this.params = n),
            (this.queryParams = r),
            (this.fragment = o),
            (this.data = i),
            (this.outlet = s),
            (this.component = a),
            (this.routeConfig = u),
            (this._resolve = c);
        }
        get root() {
          return this._routerState.root;
        }
        get parent() {
          return this._routerState.parent(this);
        }
        get firstChild() {
          return this._routerState.firstChild(this);
        }
        get children() {
          return this._routerState.children(this);
        }
        get pathFromRoot() {
          return this._routerState.pathFromRoot(this);
        }
        get paramMap() {
          return (
            this._paramMap || (this._paramMap = no(this.params)), this._paramMap
          );
        }
        get queryParamMap() {
          return (
            this._queryParamMap || (this._queryParamMap = no(this.queryParams)),
            this._queryParamMap
          );
        }
        toString() {
          return `Route(url:'${this.url
            .map((r) => r.toString())
            .join("/")}', path:'${
            this.routeConfig ? this.routeConfig.path : ""
          }')`;
        }
      }
      class _C extends DC {
        constructor(t, n) {
          super(n), (this.url = t), sf(this, n);
        }
        toString() {
          return IC(this._root);
        }
      }
      function sf(e, t) {
        (t.value._routerState = e), t.children.forEach((n) => sf(e, n));
      }
      function IC(e) {
        const t =
          e.children.length > 0 ? ` { ${e.children.map(IC).join(", ")} } ` : "";
        return `${e.value}${t}`;
      }
      function af(e) {
        if (e.snapshot) {
          const t = e.snapshot,
            n = e._futureSnapshot;
          (e.snapshot = n),
            Lt(t.queryParams, n.queryParams) ||
              e.queryParamsSubject.next(n.queryParams),
            t.fragment !== n.fragment && e.fragmentSubject.next(n.fragment),
            Lt(t.params, n.params) || e.paramsSubject.next(n.params),
            (function E1(e, t) {
              if (e.length !== t.length) return !1;
              for (let n = 0; n < e.length; ++n) if (!Lt(e[n], t[n])) return !1;
              return !0;
            })(t.url, n.url) || e.urlSubject.next(n.url),
            Lt(t.data, n.data) || e.dataSubject.next(n.data);
        } else
          (e.snapshot = e._futureSnapshot),
            e.dataSubject.next(e._futureSnapshot.data);
      }
      function uf(e, t) {
        const n =
          Lt(e.params, t.params) &&
          (function S1(e, t) {
            return (
              Xn(e, t) && e.every((n, r) => Lt(n.parameters, t[r].parameters))
            );
          })(e.url, t.url);
        return (
          n &&
          !(!e.parent != !t.parent) &&
          (!e.parent || uf(e.parent, t.parent))
        );
      }
      let bC = (() => {
        class e {
          constructor() {
            (this.activated = null),
              (this._activatedRoute = null),
              (this.name = L),
              (this.activateEvents = new ke()),
              (this.deactivateEvents = new ke()),
              (this.attachEvents = new ke()),
              (this.detachEvents = new ke()),
              (this.parentContexts = _(Ni)),
              (this.location = _(Ct)),
              (this.changeDetector = _(od)),
              (this.environmentInjector = _(Je)),
              (this.inputBinder = _(Wa, { optional: !0 })),
              (this.supportsBindingToComponentInputs = !0);
          }
          get activatedComponentRef() {
            return this.activated;
          }
          ngOnChanges(n) {
            if (n.name) {
              const { firstChange: r, previousValue: o } = n.name;
              if (r) return;
              this.isTrackedInParentContexts(o) &&
                (this.deactivate(),
                this.parentContexts.onChildOutletDestroyed(o)),
                this.initializeOutletWithName();
            }
          }
          ngOnDestroy() {
            this.isTrackedInParentContexts(this.name) &&
              this.parentContexts.onChildOutletDestroyed(this.name),
              this.inputBinder?.unsubscribeFromRouteData(this);
          }
          isTrackedInParentContexts(n) {
            return this.parentContexts.getContext(n)?.outlet === this;
          }
          ngOnInit() {
            this.initializeOutletWithName();
          }
          initializeOutletWithName() {
            if (
              (this.parentContexts.onChildOutletCreated(this.name, this),
              this.activated)
            )
              return;
            const n = this.parentContexts.getContext(this.name);
            n?.route &&
              (n.attachRef
                ? this.attach(n.attachRef, n.route)
                : this.activateWith(n.route, n.injector));
          }
          get isActivated() {
            return !!this.activated;
          }
          get component() {
            if (!this.activated) throw new w(4012, !1);
            return this.activated.instance;
          }
          get activatedRoute() {
            if (!this.activated) throw new w(4012, !1);
            return this._activatedRoute;
          }
          get activatedRouteData() {
            return this._activatedRoute
              ? this._activatedRoute.snapshot.data
              : {};
          }
          detach() {
            if (!this.activated) throw new w(4012, !1);
            this.location.detach();
            const n = this.activated;
            return (
              (this.activated = null),
              (this._activatedRoute = null),
              this.detachEvents.emit(n.instance),
              n
            );
          }
          attach(n, r) {
            (this.activated = n),
              (this._activatedRoute = r),
              this.location.insert(n.hostView),
              this.inputBinder?.bindActivatedRouteToOutletComponent(this),
              this.attachEvents.emit(n.instance);
          }
          deactivate() {
            if (this.activated) {
              const n = this.component;
              this.activated.destroy(),
                (this.activated = null),
                (this._activatedRoute = null),
                this.deactivateEvents.emit(n);
            }
          }
          activateWith(n, r) {
            if (this.isActivated) throw new w(4013, !1);
            this._activatedRoute = n;
            const o = this.location,
              s = n.snapshot.component,
              a = this.parentContexts.getOrCreateContext(this.name).children,
              u = new aF(n, a, o.injector);
            (this.activated = o.createComponent(s, {
              index: o.length,
              injector: u,
              environmentInjector: r ?? this.environmentInjector,
            })),
              this.changeDetector.markForCheck(),
              this.inputBinder?.bindActivatedRouteToOutletComponent(this),
              this.activateEvents.emit(this.activated.instance);
          }
          static #e = (this.ɵfac = function (r) {
            return new (r || e)();
          });
          static #t = (this.ɵdir = Re({
            type: e,
            selectors: [["router-outlet"]],
            inputs: { name: "name" },
            outputs: {
              activateEvents: "activate",
              deactivateEvents: "deactivate",
              attachEvents: "attach",
              detachEvents: "detach",
            },
            exportAs: ["outlet"],
            standalone: !0,
            features: [On],
          }));
        }
        return e;
      })();
      class aF {
        constructor(t, n, r) {
          (this.route = t), (this.childContexts = n), (this.parent = r);
        }
        get(t, n) {
          return t === Kn
            ? this.route
            : t === Ni
            ? this.childContexts
            : this.parent.get(t, n);
        }
      }
      const Wa = new I("");
      let SC = (() => {
        class e {
          constructor() {
            this.outletDataSubscriptions = new Map();
          }
          bindActivatedRouteToOutletComponent(n) {
            this.unsubscribeFromRouteData(n), this.subscribeToRouteData(n);
          }
          unsubscribeFromRouteData(n) {
            this.outletDataSubscriptions.get(n)?.unsubscribe(),
              this.outletDataSubscriptions.delete(n);
          }
          subscribeToRouteData(n) {
            const { activatedRoute: r } = n,
              o = Gd([r.queryParams, r.params, r.data])
                .pipe(
                  ht(
                    ([i, s, a], u) => (
                      (a = { ...i, ...s, ...a }),
                      0 === u ? A(a) : Promise.resolve(a)
                    )
                  )
                )
                .subscribe((i) => {
                  if (
                    !n.isActivated ||
                    !n.activatedComponentRef ||
                    n.activatedRoute !== r ||
                    null === r.component
                  )
                    return void this.unsubscribeFromRouteData(n);
                  const s = (function nx(e) {
                    const t = V(e);
                    if (!t) return null;
                    const n = new Jo(t);
                    return {
                      get selector() {
                        return n.selector;
                      },
                      get type() {
                        return n.componentType;
                      },
                      get inputs() {
                        return n.inputs;
                      },
                      get outputs() {
                        return n.outputs;
                      },
                      get ngContentSelectors() {
                        return n.ngContentSelectors;
                      },
                      get isStandalone() {
                        return t.standalone;
                      },
                      get isSignal() {
                        return t.signals;
                      },
                    };
                  })(r.component);
                  if (s)
                    for (const { templateName: a } of s.inputs)
                      n.activatedComponentRef.setInput(a, i[a]);
                  else this.unsubscribeFromRouteData(n);
                });
            this.outletDataSubscriptions.set(n, o);
          }
          static #e = (this.ɵfac = function (r) {
            return new (r || e)();
          });
          static #t = (this.ɵprov = S({ token: e, factory: e.ɵfac }));
        }
        return e;
      })();
      function xi(e, t, n) {
        if (n && e.shouldReuseRoute(t.value, n.value.snapshot)) {
          const r = n.value;
          r._futureSnapshot = t.value;
          const o = (function cF(e, t, n) {
            return t.children.map((r) => {
              for (const o of n.children)
                if (e.shouldReuseRoute(r.value, o.value.snapshot))
                  return xi(e, r, o);
              return xi(e, r);
            });
          })(e, t, n);
          return new on(r, o);
        }
        {
          if (e.shouldAttach(t.value)) {
            const i = e.retrieve(t.value);
            if (null !== i) {
              const s = i.route;
              return (
                (s.value._futureSnapshot = t.value),
                (s.children = t.children.map((a) => xi(e, a))),
                s
              );
            }
          }
          const r = (function lF(e) {
              return new Kn(
                new rt(e.url),
                new rt(e.params),
                new rt(e.queryParams),
                new rt(e.fragment),
                new rt(e.data),
                e.outlet,
                e.component,
                e
              );
            })(t.value),
            o = t.children.map((i) => xi(e, i));
          return new on(r, o);
        }
      }
      const cf = "ngNavigationCancelingError";
      function MC(e, t) {
        const { redirectTo: n, navigationBehaviorOptions: r } = Jn(t)
            ? { redirectTo: t, navigationBehaviorOptions: void 0 }
            : t,
          o = TC(!1, 0, t);
        return (o.url = n), (o.navigationBehaviorOptions = r), o;
      }
      function TC(e, t, n) {
        const r = new Error("NavigationCancelingError: " + (e || ""));
        return (r[cf] = !0), (r.cancellationCode = t), n && (r.url = n), r;
      }
      function AC(e) {
        return e && e[cf];
      }
      let RC = (() => {
        class e {
          static #e = (this.ɵfac = function (r) {
            return new (r || e)();
          });
          static #t = (this.ɵcmp = Do({
            type: e,
            selectors: [["ng-component"]],
            standalone: !0,
            features: [py],
            decls: 1,
            vars: 0,
            template: function (r, o) {
              1 & r && Vn(0, "router-outlet");
            },
            dependencies: [bC],
            encapsulation: 2,
          }));
        }
        return e;
      })();
      function lf(e) {
        const t = e.children && e.children.map(lf),
          n = t ? { ...e, children: t } : { ...e };
        return (
          !n.component &&
            !n.loadComponent &&
            (t || n.loadChildren) &&
            n.outlet &&
            n.outlet !== L &&
            (n.component = RC),
          n
        );
      }
      function It(e) {
        return e.outlet || L;
      }
      function Oi(e) {
        if (!e) return null;
        if (e.routeConfig?._injector) return e.routeConfig._injector;
        for (let t = e.parent; t; t = t.parent) {
          const n = t.routeConfig;
          if (n?._loadedInjector) return n._loadedInjector;
          if (n?._injector) return n._injector;
        }
        return null;
      }
      class yF {
        constructor(t, n, r, o, i) {
          (this.routeReuseStrategy = t),
            (this.futureState = n),
            (this.currState = r),
            (this.forwardEvent = o),
            (this.inputBindingEnabled = i);
        }
        activate(t) {
          const n = this.futureState._root,
            r = this.currState ? this.currState._root : null;
          this.deactivateChildRoutes(n, r, t),
            af(this.futureState.root),
            this.activateChildRoutes(n, r, t);
        }
        deactivateChildRoutes(t, n, r) {
          const o = io(n);
          t.children.forEach((i) => {
            const s = i.value.outlet;
            this.deactivateRoutes(i, o[s], r), delete o[s];
          }),
            Object.values(o).forEach((i) => {
              this.deactivateRouteAndItsChildren(i, r);
            });
        }
        deactivateRoutes(t, n, r) {
          const o = t.value,
            i = n ? n.value : null;
          if (o === i)
            if (o.component) {
              const s = r.getContext(o.outlet);
              s && this.deactivateChildRoutes(t, n, s.children);
            } else this.deactivateChildRoutes(t, n, r);
          else i && this.deactivateRouteAndItsChildren(n, r);
        }
        deactivateRouteAndItsChildren(t, n) {
          t.value.component &&
          this.routeReuseStrategy.shouldDetach(t.value.snapshot)
            ? this.detachAndStoreRouteSubtree(t, n)
            : this.deactivateRouteAndOutlet(t, n);
        }
        detachAndStoreRouteSubtree(t, n) {
          const r = n.getContext(t.value.outlet),
            o = r && t.value.component ? r.children : n,
            i = io(t);
          for (const s of Object.keys(i))
            this.deactivateRouteAndItsChildren(i[s], o);
          if (r && r.outlet) {
            const s = r.outlet.detach(),
              a = r.children.onOutletDeactivated();
            this.routeReuseStrategy.store(t.value.snapshot, {
              componentRef: s,
              route: t,
              contexts: a,
            });
          }
        }
        deactivateRouteAndOutlet(t, n) {
          const r = n.getContext(t.value.outlet),
            o = r && t.value.component ? r.children : n,
            i = io(t);
          for (const s of Object.keys(i))
            this.deactivateRouteAndItsChildren(i[s], o);
          r &&
            (r.outlet &&
              (r.outlet.deactivate(), r.children.onOutletDeactivated()),
            (r.attachRef = null),
            (r.route = null));
        }
        activateChildRoutes(t, n, r) {
          const o = io(n);
          t.children.forEach((i) => {
            this.activateRoutes(i, o[i.value.outlet], r),
              this.forwardEvent(new rF(i.value.snapshot));
          }),
            t.children.length && this.forwardEvent(new tF(t.value.snapshot));
        }
        activateRoutes(t, n, r) {
          const o = t.value,
            i = n ? n.value : null;
          if ((af(o), o === i))
            if (o.component) {
              const s = r.getOrCreateContext(o.outlet);
              this.activateChildRoutes(t, n, s.children);
            } else this.activateChildRoutes(t, n, r);
          else if (o.component) {
            const s = r.getOrCreateContext(o.outlet);
            if (this.routeReuseStrategy.shouldAttach(o.snapshot)) {
              const a = this.routeReuseStrategy.retrieve(o.snapshot);
              this.routeReuseStrategy.store(o.snapshot, null),
                s.children.onOutletReAttached(a.contexts),
                (s.attachRef = a.componentRef),
                (s.route = a.route.value),
                s.outlet && s.outlet.attach(a.componentRef, a.route.value),
                af(a.route.value),
                this.activateChildRoutes(t, null, s.children);
            } else {
              const a = Oi(o.snapshot);
              (s.attachRef = null),
                (s.route = o),
                (s.injector = a),
                s.outlet && s.outlet.activateWith(o, s.injector),
                this.activateChildRoutes(t, null, s.children);
            }
          } else this.activateChildRoutes(t, null, r);
        }
      }
      class NC {
        constructor(t) {
          (this.path = t), (this.route = this.path[this.path.length - 1]);
        }
      }
      class Za {
        constructor(t, n) {
          (this.component = t), (this.route = n);
        }
      }
      function DF(e, t, n) {
        const r = e._root;
        return Pi(r, t ? t._root : null, n, [r.value]);
      }
      function so(e, t) {
        const n = Symbol(),
          r = t.get(e, n);
        return r === n
          ? "function" != typeof e ||
            (function a_(e) {
              return null !== zi(e);
            })(e)
            ? t.get(e)
            : e
          : r;
      }
      function Pi(
        e,
        t,
        n,
        r,
        o = { canDeactivateChecks: [], canActivateChecks: [] }
      ) {
        const i = io(t);
        return (
          e.children.forEach((s) => {
            (function CF(
              e,
              t,
              n,
              r,
              o = { canDeactivateChecks: [], canActivateChecks: [] }
            ) {
              const i = e.value,
                s = t ? t.value : null,
                a = n ? n.getContext(e.value.outlet) : null;
              if (s && i.routeConfig === s.routeConfig) {
                const u = (function EF(e, t, n) {
                  if ("function" == typeof n) return n(e, t);
                  switch (n) {
                    case "pathParamsChange":
                      return !Xn(e.url, t.url);
                    case "pathParamsOrQueryParamsChange":
                      return (
                        !Xn(e.url, t.url) || !Lt(e.queryParams, t.queryParams)
                      );
                    case "always":
                      return !0;
                    case "paramsOrQueryParamsChange":
                      return !uf(e, t) || !Lt(e.queryParams, t.queryParams);
                    default:
                      return !uf(e, t);
                  }
                })(s, i, i.routeConfig.runGuardsAndResolvers);
                u
                  ? o.canActivateChecks.push(new NC(r))
                  : ((i.data = s.data), (i._resolvedData = s._resolvedData)),
                  Pi(e, t, i.component ? (a ? a.children : null) : n, r, o),
                  u &&
                    a &&
                    a.outlet &&
                    a.outlet.isActivated &&
                    o.canDeactivateChecks.push(new Za(a.outlet.component, s));
              } else
                s && Fi(t, a, o),
                  o.canActivateChecks.push(new NC(r)),
                  Pi(e, null, i.component ? (a ? a.children : null) : n, r, o);
            })(s, i[s.value.outlet], n, r.concat([s.value]), o),
              delete i[s.value.outlet];
          }),
          Object.entries(i).forEach(([s, a]) => Fi(a, n.getContext(s), o)),
          o
        );
      }
      function Fi(e, t, n) {
        const r = io(e),
          o = e.value;
        Object.entries(r).forEach(([i, s]) => {
          Fi(s, o.component ? (t ? t.children.getContext(i) : null) : t, n);
        }),
          n.canDeactivateChecks.push(
            new Za(
              o.component && t && t.outlet && t.outlet.isActivated
                ? t.outlet.component
                : null,
              o
            )
          );
      }
      function ki(e) {
        return "function" == typeof e;
      }
      function xC(e) {
        return e instanceof ka || "EmptyError" === e?.name;
      }
      const Ya = Symbol("INITIAL_VALUE");
      function ao() {
        return ht((e) =>
          Gd(
            e.map((t) =>
              t.pipe(
                to(1),
                (function h1(...e) {
                  const t = po(e);
                  return fe((n, r) => {
                    (t ? qd(e, n, t) : qd(e, n)).subscribe(r);
                  });
                })(Ya)
              )
            )
          ).pipe(
            U((t) => {
              for (const n of t)
                if (!0 !== n) {
                  if (n === Ya) return Ya;
                  if (!1 === n || n instanceof ro) return n;
                }
              return !0;
            }),
            rn((t) => t !== Ya),
            to(1)
          )
        );
      }
      function OC(e) {
        return (function uE(...e) {
          return If(e);
        })(
          Ae((t) => {
            if (Jn(t)) throw MC(0, t);
          }),
          U((t) => !0 === t)
        );
      }
      class Qa {
        constructor(t) {
          this.segmentGroup = t || null;
        }
      }
      class PC {
        constructor(t) {
          this.urlTree = t;
        }
      }
      function uo(e) {
        return Ei(new Qa(e));
      }
      function FC(e) {
        return Ei(new PC(e));
      }
      class BF {
        constructor(t, n) {
          (this.urlSerializer = t), (this.urlTree = n);
        }
        /* noMatchError(t) {
          return new w(4002, !1);
        } */
        lineralizeSegments(t, n) {
          let r = [],
            o = n.root;
          for (;;) {
            if (((r = r.concat(o.segments)), 0 === o.numberOfChildren))
              return A(r);
            if (o.numberOfChildren > 1 || !o.children[L])
              return Ei(new w(4e3, !1));
            o = o.children[L];
          }
        }
        applyRedirectCommands(t, n, r) {
          return this.applyRedirectCreateUrlTree(
            n,
            this.urlSerializer.parse(n),
            t,
            r
          );
        }
        applyRedirectCreateUrlTree(t, n, r, o) {
          const i = this.createSegmentGroup(t, n.root, r, o);
          return new ro(
            i,
            this.createQueryParams(n.queryParams, this.urlTree.queryParams),
            n.fragment
          );
        }
        createQueryParams(t, n) {
          const r = {};
          return (
            Object.entries(t).forEach(([o, i]) => {
              if ("string" == typeof i && i.startsWith(":")) {
                const a = i.substring(1);
                r[o] = n[a];
              } else r[o] = i;
            }),
            r
          );
        }
        createSegmentGroup(t, n, r, o) {
          const i = this.createSegments(t, n.segments, r, o);
          let s = {};
          return (
            Object.entries(n.children).forEach(([a, u]) => {
              s[a] = this.createSegmentGroup(t, u, r, o);
            }),
            new Y(i, s)
          );
        }
        createSegments(t, n, r, o) {
          return n.map((i) =>
            i.path.startsWith(":")
              ? this.findPosParam(t, i, o)
              : this.findOrReturn(i, r)
          );
        }
        findPosParam(t, n, r) {
          const o = r[n.path.substring(1)];
          if (!o) throw new w(4001, !1);
          return o;
        }
        findOrReturn(t, n) {
          let r = 0;
          for (const o of n) {
            if (o.path === t.path) return n.splice(r), o;
            r++;
          }
          return t;
        }
      }
      const df = {
        matched: !1,
        consumedSegments: [],
        remainingSegments: [],
        parameters: {},
        positionalParamSegments: {},
      };
      function UF(e, t, n, r, o) {
        const i = ff(e, t, n);
        return i.matched
          ? ((r = (function fF(e, t) {
              return (
                e.providers &&
                  !e._injector &&
                  (e._injector = Ol(e.providers, t, `Route: ${e.path}`)),
                e._injector ?? t
              );
            })(t, r)),
            (function $F(e, t, n, r) {
              const o = t.canMatch;
              return o && 0 !== o.length
                ? A(
                    o.map((s) => {
                      const a = so(s, e);
                      return bn(
                        (function TF(e) {
                          return e && ki(e.canMatch);
                        })(a)
                          ? a.canMatch(t, n)
                          : e.runInContext(() => a(t, n))
                      );
                    })
                  ).pipe(ao(), OC())
                : A(!0);
            })(r, t, n).pipe(U((s) => (!0 === s ? i : { ...df }))))
          : A(i);
      }
      function ff(e, t, n) {
        if ("" === t.path)
          return "full" === t.pathMatch && (e.hasChildren() || n.length > 0)
            ? { ...df }
            : {
                matched: !0,
                consumedSegments: [],
                remainingSegments: n,
                parameters: {},
                positionalParamSegments: {},
              };
        const o = (t.matcher || C1)(n, e, t);
        if (!o) return { ...df };
        const i = {};
        Object.entries(o.posParams ?? {}).forEach(([a, u]) => {
          i[a] = u.path;
        });
        const s =
          o.consumed.length > 0
            ? { ...i, ...o.consumed[o.consumed.length - 1].parameters }
            : i;
        return {
          matched: !0,
          consumedSegments: o.consumed,
          remainingSegments: n.slice(o.consumed.length),
          parameters: s,
          positionalParamSegments: o.posParams ?? {},
        };
      }
      function kC(e, t, n, r) {
        return n.length > 0 &&
          (function qF(e, t, n) {
            return n.some((r) => Xa(e, t, r) && It(r) !== L);
          })(e, n, r)
          ? {
              segmentGroup: new Y(t, GF(r, new Y(n, e.children))),
              slicedSegments: [],
            }
          : 0 === n.length &&
            (function WF(e, t, n) {
              return n.some((r) => Xa(e, t, r));
            })(e, n, r)
          ? {
              segmentGroup: new Y(e.segments, zF(e, 0, n, r, e.children)),
              slicedSegments: n,
            }
          : { segmentGroup: new Y(e.segments, e.children), slicedSegments: n };
      }
      function zF(e, t, n, r, o) {
        const i = {};
        for (const s of r)
          if (Xa(e, n, s) && !o[It(s)]) {
            const a = new Y([], {});
            i[It(s)] = a;
          }
        return { ...o, ...i };
      }
      function GF(e, t) {
        const n = {};
        n[L] = t;
        for (const r of e)
          if ("" === r.path && It(r) !== L) {
            const o = new Y([], {});
            n[It(r)] = o;
          }
        return n;
      }
      function Xa(e, t, n) {
        return (
          (!(e.hasChildren() || t.length > 0) || "full" !== n.pathMatch) &&
          "" === n.path
        );
      }
      class XF {
        constructor(t, n, r, o, i, s, a) {
          (this.injector = t),
            (this.configLoader = n),
            (this.rootComponentType = r),
            (this.config = o),
            (this.urlTree = i),
            (this.paramsInheritanceStrategy = s),
            (this.urlSerializer = a),
            (this.allowRedirects = !0),
            (this.applyRedirects = new BF(this.urlSerializer, this.urlTree));
        }
        noMatchError(t) {
          return new w(4002, !1);
        }
        recognize() {
          const t = kC(this.urlTree.root, [], [], this.config).segmentGroup;
          return this.processSegmentGroup(
            this.injector,
            this.config,
            t,
            L
          ).pipe(
            Qn((n) => {
              if (n instanceof PC)
                return (
                  (this.allowRedirects = !1),
                  (this.urlTree = n.urlTree),
                  this.match(n.urlTree)
                );
              throw n instanceof Qa ? this.noMatchError(n) : n;
            }),
            U((n) => {
              const r = new qa(
                  [],
                  Object.freeze({}),
                  Object.freeze({ ...this.urlTree.queryParams }),
                  this.urlTree.fragment,
                  {},
                  L,
                  this.rootComponentType,
                  null,
                  {}
                ),
                o = new on(r, n),
                i = new _C("", o),
                s = (function V1(e, t, n = null, r = null) {
                  return dC(lC(e), t, n, r);
                })(r, [], this.urlTree.queryParams, this.urlTree.fragment);
              return (
                (s.queryParams = this.urlTree.queryParams),
                (i.url = this.urlSerializer.serialize(s)),
                this.inheritParamsAndData(i._root),
                { state: i, tree: s }
              );
            })
          );
        }
        match(t) {
          return this.processSegmentGroup(
            this.injector,
            this.config,
            t.root,
            L
          ).pipe(
            Qn((r) => {
              throw r instanceof Qa ? this.noMatchError(r) : r;
            })
          );
        }
        inheritParamsAndData(t) {
          const n = t.value,
            r = EC(n, this.paramsInheritanceStrategy);
          (n.params = Object.freeze(r.params)),
            (n.data = Object.freeze(r.data)),
            t.children.forEach((o) => this.inheritParamsAndData(o));
        }
        processSegmentGroup(t, n, r, o) {
          return 0 === r.segments.length && r.hasChildren()
            ? this.processChildren(t, n, r)
            : this.processSegment(t, n, r, r.segments, o, !0);
        }
        processChildren(t, n, r) {
          const o = [];
          for (const i of Object.keys(r.children))
            "primary" === i ? o.unshift(i) : o.push(i);
          return ve(o).pipe(
            Jr((i) => {
              const s = r.children[i],
                a = (function mF(e, t) {
                  const n = e.filter((r) => It(r) === t);
                  return n.push(...e.filter((r) => It(r) !== t)), n;
                })(n, i);
              return this.processSegmentGroup(t, a, s, i);
            }),
            (function m1(e, t) {
              return fe(
                (function g1(e, t, n, r, o) {
                  return (i, s) => {
                    let a = n,
                      u = t,
                      c = 0;
                    i.subscribe(
                      he(
                        s,
                        (l) => {
                          const d = c++;
                          (u = a ? e(u, l, d) : ((a = !0), l)), r && s.next(u);
                        },
                        o &&
                          (() => {
                            a && s.next(u), s.complete();
                          })
                      )
                    );
                  };
                })(e, t, arguments.length >= 2, !0)
              );
            })((i, s) => (i.push(...s), i)),
            La(null),
            (function v1(e, t) {
              const n = arguments.length >= 2;
              return (r) =>
                r.pipe(
                  e ? rn((o, i) => e(o, i, r)) : an,
                  Zd(1),
                  n ? La(t) : Xw(() => new ka())
                );
            })(),
            we((i) => {
              if (null === i) return uo(r);
              const s = LC(i);
              return (
                (function JF(e) {
                  e.sort((t, n) =>
                    t.value.outlet === L
                      ? -1
                      : n.value.outlet === L
                      ? 1
                      : t.value.outlet.localeCompare(n.value.outlet)
                  );
                })(s),
                A(s)
              );
            })
          );
        }
        processSegment(t, n, r, o, i, s) {
          return ve(n).pipe(
            Jr((a) =>
              this.processSegmentAgainstRoute(
                a._injector ?? t,
                n,
                a,
                r,
                o,
                i,
                s
              ).pipe(
                Qn((u) => {
                  if (u instanceof Qa) return A(null);
                  throw u;
                })
              )
            ),
            Yn((a) => !!a),
            Qn((a) => {
              if (xC(a))
                return (function YF(e, t, n) {
                  return 0 === t.length && !e.children[n];
                })(r, o, i)
                  ? A([])
                  : uo(r);
              throw a;
            })
          );
        }
        processSegmentAgainstRoute(t, n, r, o, i, s, a) {
          return (function ZF(e, t, n, r) {
            return (
              !!(It(e) === r || (r !== L && Xa(t, n, e))) &&
              ("**" === e.path || ff(t, e, n).matched)
            );
          })(r, o, i, s)
            ? void 0 === r.redirectTo
              ? this.matchSegmentAgainstRoute(t, o, r, i, s, a)
              : a && this.allowRedirects
              ? this.expandSegmentAgainstRouteUsingRedirect(t, o, n, r, i, s)
              : uo(o)
            : uo(o);
        }
        expandSegmentAgainstRouteUsingRedirect(t, n, r, o, i, s) {
          return "**" === o.path
            ? this.expandWildCardWithParamsAgainstRouteUsingRedirect(t, r, o, s)
            : this.expandRegularSegmentAgainstRouteUsingRedirect(
                t,
                n,
                r,
                o,
                i,
                s
              );
        }
        expandWildCardWithParamsAgainstRouteUsingRedirect(t, n, r, o) {
          const i = this.applyRedirects.applyRedirectCommands(
            [],
            r.redirectTo,
            {}
          );
          return r.redirectTo.startsWith("/")
            ? FC(i)
            : this.applyRedirects.lineralizeSegments(r, i).pipe(
                we((s) => {
                  const a = new Y(s, {});
                  return this.processSegment(t, n, a, s, o, !1);
                })
              );
        }
        expandRegularSegmentAgainstRouteUsingRedirect(t, n, r, o, i, s) {
          const {
            matched: a,
            consumedSegments: u,
            remainingSegments: c,
            positionalParamSegments: l,
          } = ff(n, o, i);
          if (!a) return uo(n);
          const d = this.applyRedirects.applyRedirectCommands(
            u,
            o.redirectTo,
            l
          );
          return o.redirectTo.startsWith("/")
            ? FC(d)
            : this.applyRedirects
                .lineralizeSegments(o, d)
                .pipe(
                  we((f) => this.processSegment(t, r, n, f.concat(c), s, !1))
                );
        }
        matchSegmentAgainstRoute(t, n, r, o, i, s) {
          let a;
          if ("**" === r.path) {
            const u = o.length > 0 ? Kw(o).parameters : {};
            (a = A({
              snapshot: new qa(
                o,
                u,
                Object.freeze({ ...this.urlTree.queryParams }),
                this.urlTree.fragment,
                jC(r),
                It(r),
                r.component ?? r._loadedComponent ?? null,
                r,
                $C(r)
              ),
              consumedSegments: [],
              remainingSegments: [],
            })),
              (n.children = {});
          } else
            a = UF(n, r, o, t).pipe(
              U(
                ({
                  matched: u,
                  consumedSegments: c,
                  remainingSegments: l,
                  parameters: d,
                }) =>
                  u
                    ? {
                        snapshot: new qa(
                          c,
                          d,
                          Object.freeze({ ...this.urlTree.queryParams }),
                          this.urlTree.fragment,
                          jC(r),
                          It(r),
                          r.component ?? r._loadedComponent ?? null,
                          r,
                          $C(r)
                        ),
                        consumedSegments: c,
                        remainingSegments: l,
                      }
                    : null
              )
            );
          return a.pipe(
            ht((u) =>
              null === u
                ? uo(n)
                : this.getChildConfig((t = r._injector ?? t), r, o).pipe(
                    ht(({ routes: c }) => {
                      const l = r._loadedInjector ?? t,
                        {
                          snapshot: d,
                          consumedSegments: f,
                          remainingSegments: h,
                        } = u,
                        { segmentGroup: p, slicedSegments: g } = kC(n, f, h, c);
                      if (0 === g.length && p.hasChildren())
                        return this.processChildren(l, c, p).pipe(
                          U((D) => (null === D ? null : [new on(d, D)]))
                        );
                      if (0 === c.length && 0 === g.length)
                        return A([new on(d, [])]);
                      const v = It(r) === i;
                      return this.processSegment(
                        l,
                        c,
                        p,
                        g,
                        v ? L : i,
                        !0
                      ).pipe(U((D) => [new on(d, D)]));
                    })
                  )
            )
          );
        }
        getChildConfig(t, n, r) {
          return n.children
            ? A({ routes: n.children, injector: t })
            : n.loadChildren
            ? void 0 !== n._loadedRoutes
              ? A({ routes: n._loadedRoutes, injector: n._loadedInjector })
              : (function jF(e, t, n, r) {
                  const o = t.canLoad;
                  return void 0 === o || 0 === o.length
                    ? A(!0)
                    : A(
                        o.map((s) => {
                          const a = so(s, e);
                          return bn(
                            (function IF(e) {
                              return e && ki(e.canLoad);
                            })(a)
                              ? a.canLoad(t, n)
                              : e.runInContext(() => a(t, n))
                          );
                        })
                      ).pipe(ao(), OC());
                })(t, n, r).pipe(
                  we((o) =>
                    o
                      ? this.configLoader.loadChildren(t, n).pipe(
                          Ae((i) => {
                            (n._loadedRoutes = i.routes),
                              (n._loadedInjector = i.injector);
                          })
                        )
                      : (function VF(e) {
                          return Ei(TC(!1, 3));
                        })()
                  )
                )
            : A({ routes: [], injector: t });
        }
      }
      function KF(e) {
        const t = e.value.routeConfig;
        return t && "" === t.path;
      }
      function LC(e) {
        const t = [],
          n = new Set();
        for (const r of e) {
          if (!KF(r)) {
            t.push(r);
            continue;
          }
          const o = t.find((i) => r.value.routeConfig === i.value.routeConfig);
          void 0 !== o ? (o.children.push(...r.children), n.add(o)) : t.push(r);
        }
        for (const r of n) {
          const o = LC(r.children);
          t.push(new on(r.value, o));
        }
        return t.filter((r) => !n.has(r));
      }
      function jC(e) {
        return e.data || {};
      }
      function $C(e) {
        return e.resolve || {};
      }
      function HC(e) {
        return "string" == typeof e.title || null === e.title;
      }
      function hf(e) {
        return ht((t) => {
          const n = e(t);
          return n ? ve(n).pipe(U(() => t)) : A(t);
        });
      }
      const co = new I("ROUTES");
      let pf = (() => {
        class e {
          constructor() {
            (this.componentLoaders = new WeakMap()),
              (this.childrenLoaders = new WeakMap()),
              (this.compiler = _(sD));
          }
          loadComponent(n) {
            if (this.componentLoaders.get(n))
              return this.componentLoaders.get(n);
            if (n._loadedComponent) return A(n._loadedComponent);
            this.onLoadStartListener && this.onLoadStartListener(n);
            const r = bn(n.loadComponent()).pipe(
                U(VC),
                Ae((i) => {
                  this.onLoadEndListener && this.onLoadEndListener(n),
                    (n._loadedComponent = i);
                }),
                Di(() => {
                  this.componentLoaders.delete(n);
                })
              ),
              o = new Qw(r, () => new ft()).pipe(Wd());
            return this.componentLoaders.set(n, o), o;
          }
          loadChildren(n, r) {
            if (this.childrenLoaders.get(r)) return this.childrenLoaders.get(r);
            if (r._loadedRoutes)
              return A({
                routes: r._loadedRoutes,
                injector: r._loadedInjector,
              });
            this.onLoadStartListener && this.onLoadStartListener(r);
            const i = (function sk(e, t, n, r) {
                return bn(e.loadChildren()).pipe(
                  U(VC),
                  we((o) =>
                    o instanceof fy || Array.isArray(o)
                      ? A(o)
                      : ve(t.compileModuleAsync(o))
                  ),
                  U((o) => {
                    r && r(e);
                    let i,
                      s,
                      a = !1;
                    return (
                      Array.isArray(o)
                        ? ((s = o), !0)
                        : ((i = o.create(n).injector),
                          (s = i
                            .get(co, [], { optional: !0, self: !0 })
                            .flat())),
                      { routes: s.map(lf), injector: i }
                    );
                  })
                );
              })(r, this.compiler, n, this.onLoadEndListener).pipe(
                Di(() => {
                  this.childrenLoaders.delete(r);
                })
              ),
              s = new Qw(i, () => new ft()).pipe(Wd());
            return this.childrenLoaders.set(r, s), s;
          }
          static #e = (this.ɵfac = function (r) {
            return new (r || e)();
          });
          static #t = (this.ɵprov = S({
            token: e,
            factory: e.ɵfac,
            providedIn: "root",
          }));
        }
        return e;
      })();
      function VC(e) {
        return (function ak(e) {
          return e && "object" == typeof e && "default" in e;
        })(e)
          ? e.default
          : e;
      }
      let Ja = (() => {
        class e {
          get hasRequestedNavigation() {
            return 0 !== this.navigationId;
          }
          constructor() {
            (this.currentNavigation = null),
              (this.currentTransition = null),
              (this.lastSuccessfulNavigation = null),
              (this.events = new ft()),
              (this.transitionAbortSubject = new ft()),
              (this.configLoader = _(pf)),
              (this.environmentInjector = _(Je)),
              (this.urlSerializer = _(bi)),
              (this.rootContexts = _(Ni)),
              (this.inputBindingEnabled = null !== _(Wa, { optional: !0 })),
              (this.navigationId = 0),
              (this.afterPreactivation = () => A(void 0)),
              (this.rootComponentType = null),
              (this.configLoader.onLoadEndListener = (o) =>
                this.events.next(new K1(o))),
              (this.configLoader.onLoadStartListener = (o) =>
                this.events.next(new J1(o)));
          }
          complete() {
            this.transitions?.complete();
          }
          handleNavigationRequest(n) {
            const r = ++this.navigationId;
            this.transitions?.next({ ...this.transitions.value, ...n, id: r });
          }
          setupNavigations(n, r, o) {
            return (
              (this.transitions = new rt({
                id: 0,
                currentUrlTree: r,
                currentRawUrl: r,
                currentBrowserUrl: r,
                extractedUrl: n.urlHandlingStrategy.extract(r),
                urlAfterRedirects: n.urlHandlingStrategy.extract(r),
                rawUrl: r,
                extras: {},
                resolve: null,
                reject: null,
                promise: Promise.resolve(!0),
                source: Ai,
                restoredState: null,
                currentSnapshot: o.snapshot,
                targetSnapshot: null,
                currentRouterState: o,
                targetRouterState: null,
                guards: { canActivateChecks: [], canDeactivateChecks: [] },
                guardsResult: null,
              })),
              this.transitions.pipe(
                rn((i) => 0 !== i.id),
                U((i) => ({
                  ...i,
                  extractedUrl: n.urlHandlingStrategy.extract(i.rawUrl),
                })),
                ht((i) => {
                  this.currentTransition = i;
                  let s = !1,
                    a = !1;
                  return A(i).pipe(
                    Ae((u) => {
                      this.currentNavigation = {
                        id: u.id,
                        initialUrl: u.rawUrl,
                        extractedUrl: u.extractedUrl,
                        trigger: u.source,
                        extras: u.extras,
                        previousNavigation: this.lastSuccessfulNavigation
                          ? {
                              ...this.lastSuccessfulNavigation,
                              previousNavigation: null,
                            }
                          : null,
                      };
                    }),
                    ht((u) => {
                      const c = u.currentBrowserUrl.toString(),
                        l =
                          !n.navigated ||
                          u.extractedUrl.toString() !== c ||
                          c !== u.currentUrlTree.toString();
                      if (
                        !l &&
                        "reload" !==
                          (u.extras.onSameUrlNavigation ??
                            n.onSameUrlNavigation)
                      ) {
                        const f = "";
                        return (
                          this.events.next(
                            new oo(
                              u.id,
                              this.urlSerializer.serialize(u.rawUrl),
                              f,
                              0
                            )
                          ),
                          u.resolve(null),
                          bt
                        );
                      }
                      if (n.urlHandlingStrategy.shouldProcessUrl(u.rawUrl))
                        return A(u).pipe(
                          ht((f) => {
                            const h = this.transitions?.getValue();
                            return (
                              this.events.next(
                                new za(
                                  f.id,
                                  this.urlSerializer.serialize(f.extractedUrl),
                                  f.source,
                                  f.restoredState
                                )
                              ),
                              h !== this.transitions?.getValue()
                                ? bt
                                : Promise.resolve(f)
                            );
                          }),
                          (function ek(e, t, n, r, o, i) {
                            return we((s) =>
                              (function QF(e, t, n, r, o, i, s = "emptyOnly") {
                                return new XF(e, t, n, r, o, s, i).recognize();
                              })(e, t, n, r, s.extractedUrl, o, i).pipe(
                                U(({ state: a, tree: u }) => ({
                                  ...s,
                                  targetSnapshot: a,
                                  urlAfterRedirects: u,
                                }))
                              )
                            );
                          })(
                            this.environmentInjector,
                            this.configLoader,
                            this.rootComponentType,
                            n.config,
                            this.urlSerializer,
                            n.paramsInheritanceStrategy
                          ),
                          Ae((f) => {
                            (i.targetSnapshot = f.targetSnapshot),
                              (i.urlAfterRedirects = f.urlAfterRedirects),
                              (this.currentNavigation = {
                                ...this.currentNavigation,
                                finalUrl: f.urlAfterRedirects,
                              });
                            const h = new vC(
                              f.id,
                              this.urlSerializer.serialize(f.extractedUrl),
                              this.urlSerializer.serialize(f.urlAfterRedirects),
                              f.targetSnapshot
                            );
                            this.events.next(h);
                          })
                        );
                      if (
                        l &&
                        n.urlHandlingStrategy.shouldProcessUrl(u.currentRawUrl)
                      ) {
                        const {
                            id: f,
                            extractedUrl: h,
                            source: p,
                            restoredState: g,
                            extras: v,
                          } = u,
                          D = new za(f, this.urlSerializer.serialize(h), p, g);
                        this.events.next(D);
                        const m = CC(0, this.rootComponentType).snapshot;
                        return (
                          (this.currentTransition = i =
                            {
                              ...u,
                              targetSnapshot: m,
                              urlAfterRedirects: h,
                              extras: {
                                ...v,
                                skipLocationChange: !1,
                                replaceUrl: !1,
                              },
                            }),
                          A(i)
                        );
                      }
                      {
                        const f = "";
                        return (
                          this.events.next(
                            new oo(
                              u.id,
                              this.urlSerializer.serialize(u.extractedUrl),
                              f,
                              1
                            )
                          ),
                          u.resolve(null),
                          bt
                        );
                      }
                    }),
                    Ae((u) => {
                      const c = new Z1(
                        u.id,
                        this.urlSerializer.serialize(u.extractedUrl),
                        this.urlSerializer.serialize(u.urlAfterRedirects),
                        u.targetSnapshot
                      );
                      this.events.next(c);
                    }),
                    U(
                      (u) => (
                        (this.currentTransition = i =
                          {
                            ...u,
                            guards: DF(
                              u.targetSnapshot,
                              u.currentSnapshot,
                              this.rootContexts
                            ),
                          }),
                        i
                      )
                    ),
                    (function RF(e, t) {
                      return we((n) => {
                        const {
                          targetSnapshot: r,
                          currentSnapshot: o,
                          guards: {
                            canActivateChecks: i,
                            canDeactivateChecks: s,
                          },
                        } = n;
                        return 0 === s.length && 0 === i.length
                          ? A({ ...n, guardsResult: !0 })
                          : (function NF(e, t, n, r) {
                              return ve(e).pipe(
                                we((o) =>
                                  (function LF(e, t, n, r, o) {
                                    const i =
                                      t && t.routeConfig
                                        ? t.routeConfig.canDeactivate
                                        : null;
                                    return i && 0 !== i.length
                                      ? A(
                                          i.map((a) => {
                                            const u = Oi(t) ?? o,
                                              c = so(a, u);
                                            return bn(
                                              (function MF(e) {
                                                return e && ki(e.canDeactivate);
                                              })(c)
                                                ? c.canDeactivate(e, t, n, r)
                                                : u.runInContext(() =>
                                                    c(e, t, n, r)
                                                  )
                                            ).pipe(Yn());
                                          })
                                        ).pipe(ao())
                                      : A(!0);
                                  })(o.component, o.route, n, t, r)
                                ),
                                Yn((o) => !0 !== o, !0)
                              );
                            })(s, r, o, e).pipe(
                              we((a) =>
                                a &&
                                (function _F(e) {
                                  return "boolean" == typeof e;
                                })(a)
                                  ? (function xF(e, t, n, r) {
                                      return ve(t).pipe(
                                        Jr((o) =>
                                          qd(
                                            (function PF(e, t) {
                                              return (
                                                null !== e && t && t(new eF(e)),
                                                A(!0)
                                              );
                                            })(o.route.parent, r),
                                            (function OF(e, t) {
                                              return (
                                                null !== e && t && t(new nF(e)),
                                                A(!0)
                                              );
                                            })(o.route, r),
                                            (function kF(e, t, n) {
                                              const r = t[t.length - 1],
                                                i = t
                                                  .slice(0, t.length - 1)
                                                  .reverse()
                                                  .map((s) =>
                                                    (function wF(e) {
                                                      const t = e.routeConfig
                                                        ? e.routeConfig
                                                            .canActivateChild
                                                        : null;
                                                      return t && 0 !== t.length
                                                        ? { node: e, guards: t }
                                                        : null;
                                                    })(s)
                                                  )
                                                  .filter((s) => null !== s)
                                                  .map((s) =>
                                                    Yw(() =>
                                                      A(
                                                        s.guards.map((u) => {
                                                          const c =
                                                              Oi(s.node) ?? n,
                                                            l = so(u, c);
                                                          return bn(
                                                            (function SF(e) {
                                                              return (
                                                                e &&
                                                                ki(
                                                                  e.canActivateChild
                                                                )
                                                              );
                                                            })(l)
                                                              ? l.canActivateChild(
                                                                  r,
                                                                  e
                                                                )
                                                              : c.runInContext(
                                                                  () => l(r, e)
                                                                )
                                                          ).pipe(Yn());
                                                        })
                                                      ).pipe(ao())
                                                    )
                                                  );
                                              return A(i).pipe(ao());
                                            })(e, o.path, n),
                                            (function FF(e, t, n) {
                                              const r = t.routeConfig
                                                ? t.routeConfig.canActivate
                                                : null;
                                              if (!r || 0 === r.length)
                                                return A(!0);
                                              const o = r.map((i) =>
                                                Yw(() => {
                                                  const s = Oi(t) ?? n,
                                                    a = so(i, s);
                                                  return bn(
                                                    (function bF(e) {
                                                      return (
                                                        e && ki(e.canActivate)
                                                      );
                                                    })(a)
                                                      ? a.canActivate(t, e)
                                                      : s.runInContext(() =>
                                                          a(t, e)
                                                        )
                                                  ).pipe(Yn());
                                                })
                                              );
                                              return A(o).pipe(ao());
                                            })(e, o.route, n)
                                          )
                                        ),
                                        Yn((o) => !0 !== o, !0)
                                      );
                                    })(r, i, e, t)
                                  : A(a)
                              ),
                              U((a) => ({ ...n, guardsResult: a }))
                            );
                      });
                    })(this.environmentInjector, (u) => this.events.next(u)),
                    Ae((u) => {
                      if (
                        ((i.guardsResult = u.guardsResult), Jn(u.guardsResult))
                      )
                        throw MC(0, u.guardsResult);
                      const c = new Y1(
                        u.id,
                        this.urlSerializer.serialize(u.extractedUrl),
                        this.urlSerializer.serialize(u.urlAfterRedirects),
                        u.targetSnapshot,
                        !!u.guardsResult
                      );
                      this.events.next(c);
                    }),
                    rn(
                      (u) =>
                        !!u.guardsResult ||
                        (this.cancelNavigationTransition(u, "", 3), !1)
                    ),
                    hf((u) => {
                      if (u.guards.canActivateChecks.length)
                        return A(u).pipe(
                          Ae((c) => {
                            const l = new Q1(
                              c.id,
                              this.urlSerializer.serialize(c.extractedUrl),
                              this.urlSerializer.serialize(c.urlAfterRedirects),
                              c.targetSnapshot
                            );
                            this.events.next(l);
                          }),
                          ht((c) => {
                            let l = !1;
                            return A(c).pipe(
                              (function tk(e, t) {
                                return we((n) => {
                                  const {
                                    targetSnapshot: r,
                                    guards: { canActivateChecks: o },
                                  } = n;
                                  if (!o.length) return A(n);
                                  let i = 0;
                                  return ve(o).pipe(
                                    Jr((s) =>
                                      (function nk(e, t, n, r) {
                                        const o = e.routeConfig,
                                          i = e._resolve;
                                        return (
                                          void 0 !== o?.title &&
                                            !HC(o) &&
                                            (i[_i] = o.title),
                                          (function rk(e, t, n, r) {
                                            const o = (function ok(e) {
                                              return [
                                                ...Object.keys(e),
                                                ...Object.getOwnPropertySymbols(
                                                  e
                                                ),
                                              ];
                                            })(e);
                                            if (0 === o.length) return A({});
                                            const i = {};
                                            return ve(o).pipe(
                                              we((s) =>
                                                (function ik(e, t, n, r) {
                                                  const o = Oi(t) ?? r,
                                                    i = so(e, o);
                                                  return bn(
                                                    i.resolve
                                                      ? i.resolve(t, n)
                                                      : o.runInContext(() =>
                                                          i(t, n)
                                                        )
                                                  );
                                                })(e[s], t, n, r).pipe(
                                                  Yn(),
                                                  Ae((a) => {
                                                    i[s] = a;
                                                  })
                                                )
                                              ),
                                              Zd(1),
                                              (function y1(e) {
                                                return U(() => e);
                                              })(i),
                                              Qn((s) => (xC(s) ? bt : Ei(s)))
                                            );
                                          })(i, e, t, r).pipe(
                                            U(
                                              (s) => (
                                                (e._resolvedData = s),
                                                (e.data = EC(e, n).resolve),
                                                o &&
                                                  HC(o) &&
                                                  (e.data[_i] = o.title),
                                                null
                                              )
                                            )
                                          )
                                        );
                                      })(s.route, r, e, t)
                                    ),
                                    Ae(() => i++),
                                    Zd(1),
                                    we((s) => (i === o.length ? A(n) : bt))
                                  );
                                });
                              })(
                                n.paramsInheritanceStrategy,
                                this.environmentInjector
                              ),
                              Ae({
                                next: () => (l = !0),
                                complete: () => {
                                  l ||
                                    this.cancelNavigationTransition(c, "", 2);
                                },
                              })
                            );
                          }),
                          Ae((c) => {
                            const l = new X1(
                              c.id,
                              this.urlSerializer.serialize(c.extractedUrl),
                              this.urlSerializer.serialize(c.urlAfterRedirects),
                              c.targetSnapshot
                            );
                            this.events.next(l);
                          })
                        );
                    }),
                    hf((u) => {
                      const c = (l) => {
                        const d = [];
                        l.routeConfig?.loadComponent &&
                          !l.routeConfig._loadedComponent &&
                          d.push(
                            this.configLoader.loadComponent(l.routeConfig).pipe(
                              Ae((f) => {
                                l.component = f;
                              }),
                              U(() => {})
                            )
                          );
                        for (const f of l.children) d.push(...c(f));
                        return d;
                      };
                      return Gd(c(u.targetSnapshot.root)).pipe(La(), to(1));
                    }),
                    hf(() => this.afterPreactivation()),
                    U((u) => {
                      const c = (function uF(e, t, n) {
                        const r = xi(e, t._root, n ? n._root : void 0);
                        return new wC(r, t);
                      })(
                        n.routeReuseStrategy,
                        u.targetSnapshot,
                        u.currentRouterState
                      );
                      return (
                        (this.currentTransition = i =
                          { ...u, targetRouterState: c }),
                        i
                      );
                    }),
                    Ae(() => {
                      this.events.next(new ef());
                    }),
                    ((e, t, n, r) =>
                      U(
                        (o) => (
                          new yF(
                            t,
                            o.targetRouterState,
                            o.currentRouterState,
                            n,
                            r
                          ).activate(e),
                          o
                        )
                      ))(
                      this.rootContexts,
                      n.routeReuseStrategy,
                      (u) => this.events.next(u),
                      this.inputBindingEnabled
                    ),
                    to(1),
                    Ae({
                      next: (u) => {
                        (s = !0),
                          (this.lastSuccessfulNavigation =
                            this.currentNavigation),
                          this.events.next(
                            new Sn(
                              u.id,
                              this.urlSerializer.serialize(u.extractedUrl),
                              this.urlSerializer.serialize(u.urlAfterRedirects)
                            )
                          ),
                          n.titleStrategy?.updateTitle(
                            u.targetRouterState.snapshot
                          ),
                          u.resolve(!0);
                      },
                      complete: () => {
                        s = !0;
                      },
                    }),
                    (function D1(e) {
                      return fe((t, n) => {
                        nt(e).subscribe(he(n, () => n.complete(), eu)),
                          !n.closed && t.subscribe(n);
                      });
                    })(
                      this.transitionAbortSubject.pipe(
                        Ae((u) => {
                          throw u;
                        })
                      )
                    ),
                    Di(() => {
                      s || a || this.cancelNavigationTransition(i, "", 1),
                        this.currentNavigation?.id === i.id &&
                          (this.currentNavigation = null);
                    }),
                    Qn((u) => {
                      if (((a = !0), AC(u)))
                        this.events.next(
                          new Ri(
                            i.id,
                            this.urlSerializer.serialize(i.extractedUrl),
                            u.message,
                            u.cancellationCode
                          )
                        ),
                          (function dF(e) {
                            return AC(e) && Jn(e.url);
                          })(u)
                            ? this.events.next(new tf(u.url))
                            : i.resolve(!1);
                      else {
                        this.events.next(
                          new Ga(
                            i.id,
                            this.urlSerializer.serialize(i.extractedUrl),
                            u,
                            i.targetSnapshot ?? void 0
                          )
                        );
                        try {
                          i.resolve(n.errorHandler(u));
                        } catch (c) {
                          i.reject(c);
                        }
                      }
                      return bt;
                    })
                  );
                })
              )
            );
          }
          cancelNavigationTransition(n, r, o) {
            const i = new Ri(
              n.id,
              this.urlSerializer.serialize(n.extractedUrl),
              r,
              o
            );
            this.events.next(i), n.resolve(!1);
          }
          static #e = (this.ɵfac = function (r) {
            return new (r || e)();
          });
          static #t = (this.ɵprov = S({
            token: e,
            factory: e.ɵfac,
            providedIn: "root",
          }));
        }
        return e;
      })();
      function BC(e) {
        return e !== Ai;
      }
      let UC = (() => {
          class e {
            buildTitle(n) {
              let r,
                o = n.root;
              for (; void 0 !== o; )
                (r = this.getResolvedTitleForRoute(o) ?? r),
                  (o = o.children.find((i) => i.outlet === L));
              return r;
            }
            getResolvedTitleForRoute(n) {
              return n.data[_i];
            }
            static #e = (this.ɵfac = function (r) {
              return new (r || e)();
            });
            static #t = (this.ɵprov = S({
              token: e,
              factory: function () {
                return _(uk);
              },
              providedIn: "root",
            }));
          }
          return e;
        })(),
        uk = (() => {
          class e extends UC {
            constructor(n) {
              super(), (this.title = n);
            }
            updateTitle(n) {
              const r = this.buildTitle(n);
              void 0 !== r && this.title.setTitle(r);
            }
            static #e = (this.ɵfac = function (r) {
              return new (r || e)(b(Mw));
            });
            static #t = (this.ɵprov = S({
              token: e,
              factory: e.ɵfac,
              providedIn: "root",
            }));
          }
          return e;
        })(),
        ck = (() => {
          class e {
            static #e = (this.ɵfac = function (r) {
              return new (r || e)();
            });
            static #t = (this.ɵprov = S({
              token: e,
              factory: function () {
                return _(dk);
              },
              providedIn: "root",
            }));
          }
          return e;
        })();
      class lk {
        shouldDetach(t) {
          return !1;
        }
        store(t, n) {}
        shouldAttach(t) {
          return !1;
        }
        retrieve(t) {
          return null;
        }
        shouldReuseRoute(t, n) {
          return t.routeConfig === n.routeConfig;
        }
      }
      let dk = (() => {
        class e extends lk {
          static #e = (this.ɵfac = (function () {
            let n;
            return function (o) {
              return (
                n ||
                (n = (function hp(e) {
                  return Vt(() => {
                    const t = e.prototype.constructor,
                      n = t[Bt] || Xu(t),
                      r = Object.prototype;
                    let o = Object.getPrototypeOf(e.prototype).constructor;
                    for (; o && o !== r; ) {
                      const i = o[Bt] || Xu(o);
                      if (i && i !== n) return i;
                      o = Object.getPrototypeOf(o);
                    }
                    return (i) => new i();
                  });
                })(e))
              )(o || e);
            };
          })());
          static #t = (this.ɵprov = S({
            token: e,
            factory: e.ɵfac,
            providedIn: "root",
          }));
        }
        return e;
      })();
      const Ka = new I("", { providedIn: "root", factory: () => ({}) });
      let fk = (() => {
          class e {
            static #e = (this.ɵfac = function (r) {
              return new (r || e)();
            });
            static #t = (this.ɵprov = S({
              token: e,
              factory: function () {
                return _(hk);
              },
              providedIn: "root",
            }));
          }
          return e;
        })(),
        hk = (() => {
          class e {
            shouldProcessUrl(n) {
              return !0;
            }
            extract(n) {
              return n;
            }
            merge(n, r) {
              return n;
            }
            static #e = (this.ɵfac = function (r) {
              return new (r || e)();
            });
            static #t = (this.ɵprov = S({
              token: e,
              factory: e.ɵfac,
              providedIn: "root",
            }));
          }
          return e;
        })();
      var Li = (function (e) {
        return (
          (e[(e.COMPLETE = 0)] = "COMPLETE"),
          (e[(e.FAILED = 1)] = "FAILED"),
          (e[(e.REDIRECTING = 2)] = "REDIRECTING"),
          e
        );
      })(Li || {});
      function zC(e, t) {
        e.events
          .pipe(
            rn(
              (n) =>
                n instanceof Sn ||
                n instanceof Ri ||
                n instanceof Ga ||
                n instanceof oo
            ),
            U((n) =>
              n instanceof Sn || n instanceof oo
                ? Li.COMPLETE
                : n instanceof Ri && (0 === n.code || 1 === n.code)
                ? Li.REDIRECTING
                : Li.FAILED
            ),
            rn((n) => n !== Li.REDIRECTING),
            to(1)
          )
          .subscribe(() => {
            t();
          });
      }
      function pk(e) {
        throw e;
      }
      function gk(e, t, n) {
        return t.parse("/");
      }
      const mk = {
          paths: "exact",
          fragment: "ignored",
          matrixParams: "ignored",
          queryParams: "exact",
        },
        vk = {
          paths: "subset",
          fragment: "ignored",
          matrixParams: "ignored",
          queryParams: "subset",
        };
      let dt = (() => {
        class e {
          get navigationId() {
            return this.navigationTransitions.navigationId;
          }
          get browserPageId() {
            return "computed" !== this.canceledNavigationResolution
              ? this.currentPageId
              : this.location.getState()?.ɵrouterPageId ?? this.currentPageId;
          }
          get events() {
            return this._events;
          }
          constructor() {
            (this.disposed = !1),
              (this.currentPageId = 0),
              (this.console = _(iD)),
              (this.isNgZoneEnabled = !1),
              (this._events = new ft()),
              (this.options = _(Ka, { optional: !0 }) || {}),
              (this.pendingTasks = _(da)),
              (this.errorHandler = this.options.errorHandler || pk),
              (this.malformedUriErrorHandler =
                this.options.malformedUriErrorHandler || gk),
              (this.navigated = !1),
              (this.lastSuccessfulId = -1),
              (this.urlHandlingStrategy = _(fk)),
              (this.routeReuseStrategy = _(ck)),
              (this.titleStrategy = _(UC)),
              (this.onSameUrlNavigation =
                this.options.onSameUrlNavigation || "ignore"),
              (this.paramsInheritanceStrategy =
                this.options.paramsInheritanceStrategy || "emptyOnly"),
              (this.urlUpdateStrategy =
                this.options.urlUpdateStrategy || "deferred"),
              (this.canceledNavigationResolution =
                this.options.canceledNavigationResolution || "replace"),
              (this.config = _(co, { optional: !0 })?.flat() ?? []),
              (this.navigationTransitions = _(Ja)),
              (this.urlSerializer = _(bi)),
              (this.location = _(pd)),
              (this.componentInputBindingEnabled = !!_(Wa, { optional: !0 })),
              (this.eventsSubscription = new We()),
              (this.isNgZoneEnabled =
                _(ee) instanceof ee && ee.isInAngularZone()),
              this.resetConfig(this.config),
              (this.currentUrlTree = new ro()),
              (this.rawUrlTree = this.currentUrlTree),
              (this.browserUrlTree = this.currentUrlTree),
              (this.routerState = CC(0, null)),
              this.navigationTransitions
                .setupNavigations(this, this.currentUrlTree, this.routerState)
                .subscribe(
                  (n) => {
                    (this.lastSuccessfulId = n.id),
                      (this.currentPageId = this.browserPageId);
                  },
                  (n) => {
                    this.console.warn(`Unhandled Navigation Error: ${n}`);
                  }
                ),
              this.subscribeToNavigationEvents();
          }
          subscribeToNavigationEvents() {
            const n = this.navigationTransitions.events.subscribe((r) => {
              try {
                const { currentTransition: o } = this.navigationTransitions;
                if (null === o) return void (GC(r) && this._events.next(r));
                if (r instanceof za)
                  BC(o.source) && (this.browserUrlTree = o.extractedUrl);
                else if (r instanceof oo) this.rawUrlTree = o.rawUrl;
                else if (r instanceof vC) {
                  if ("eager" === this.urlUpdateStrategy) {
                    if (!o.extras.skipLocationChange) {
                      const i = this.urlHandlingStrategy.merge(
                        o.urlAfterRedirects,
                        o.rawUrl
                      );
                      this.setBrowserUrl(i, o);
                    }
                    this.browserUrlTree = o.urlAfterRedirects;
                  }
                } else if (r instanceof ef)
                  (this.currentUrlTree = o.urlAfterRedirects),
                    (this.rawUrlTree = this.urlHandlingStrategy.merge(
                      o.urlAfterRedirects,
                      o.rawUrl
                    )),
                    (this.routerState = o.targetRouterState),
                    "deferred" === this.urlUpdateStrategy &&
                      (o.extras.skipLocationChange ||
                        this.setBrowserUrl(this.rawUrlTree, o),
                      (this.browserUrlTree = o.urlAfterRedirects));
                else if (r instanceof Ri)
                  0 !== r.code && 1 !== r.code && (this.navigated = !0),
                    (3 === r.code || 2 === r.code) && this.restoreHistory(o);
                else if (r instanceof tf) {
                  const i = this.urlHandlingStrategy.merge(
                      r.url,
                      o.currentRawUrl
                    ),
                    s = {
                      skipLocationChange: o.extras.skipLocationChange,
                      replaceUrl:
                        "eager" === this.urlUpdateStrategy || BC(o.source),
                    };
                  this.scheduleNavigation(i, Ai, null, s, {
                    resolve: o.resolve,
                    reject: o.reject,
                    promise: o.promise,
                  });
                }
                r instanceof Ga && this.restoreHistory(o, !0),
                  r instanceof Sn && (this.navigated = !0),
                  GC(r) && this._events.next(r);
              } catch (o) {
                this.navigationTransitions.transitionAbortSubject.next(o);
              }
            });
            this.eventsSubscription.add(n);
          }
          resetRootComponentType(n) {
            (this.routerState.root.component = n),
              (this.navigationTransitions.rootComponentType = n);
          }
          initialNavigation() {
            if (
              (this.setUpLocationChangeListener(),
              !this.navigationTransitions.hasRequestedNavigation)
            ) {
              const n = this.location.getState();
              this.navigateToSyncWithBrowser(this.location.path(!0), Ai, n);
            }
          }
          setUpLocationChangeListener() {
            this.locationSubscription ||
              (this.locationSubscription = this.location.subscribe((n) => {
                const r = "popstate" === n.type ? "popstate" : "hashchange";
                "popstate" === r &&
                  setTimeout(() => {
                    this.navigateToSyncWithBrowser(n.url, r, n.state);
                  }, 0);
              }));
          }
          navigateToSyncWithBrowser(n, r, o) {
            const i = { replaceUrl: !0 },
              s = o?.navigationId ? o : null;
            if (o) {
              const u = { ...o };
              delete u.navigationId,
                delete u.ɵrouterPageId,
                0 !== Object.keys(u).length && (i.state = u);
            }
            const a = this.parseUrl(n);
            this.scheduleNavigation(a, r, s, i);
          }
          get url() {
            return this.serializeUrl(this.currentUrlTree);
          }
          getCurrentNavigation() {
            return this.navigationTransitions.currentNavigation;
          }
          get lastSuccessfulNavigation() {
            return this.navigationTransitions.lastSuccessfulNavigation;
          }
          resetConfig(n) {
            (this.config = n.map(lf)),
              (this.navigated = !1),
              (this.lastSuccessfulId = -1);
          }
          ngOnDestroy() {
            this.dispose();
          }
          dispose() {
            this.navigationTransitions.complete(),
              this.locationSubscription &&
                (this.locationSubscription.unsubscribe(),
                (this.locationSubscription = void 0)),
              (this.disposed = !0),
              this.eventsSubscription.unsubscribe();
          }
          createUrlTree(n, r = {}) {
            const {
                relativeTo: o,
                queryParams: i,
                fragment: s,
                queryParamsHandling: a,
                preserveFragment: u,
              } = r,
              c = u ? this.currentUrlTree.fragment : s;
            let d,
              l = null;
            switch (a) {
              case "merge":
                l = { ...this.currentUrlTree.queryParams, ...i };
                break;
              case "preserve":
                l = this.currentUrlTree.queryParams;
                break;
              default:
                l = i || null;
            }
            null !== l && (l = this.removeEmptyProps(l));
            try {
              d = lC(o ? o.snapshot : this.routerState.snapshot.root);
            } catch {
              ("string" != typeof n[0] || !n[0].startsWith("/")) && (n = []),
                (d = this.currentUrlTree.root);
            }
            return dC(d, n, l, c ?? null);
          }
          navigateByUrl(n, r = { skipLocationChange: !1 }) {
            const o = Jn(n) ? n : this.parseUrl(n),
              i = this.urlHandlingStrategy.merge(o, this.rawUrlTree);
            return this.scheduleNavigation(i, Ai, null, r);
          }
          navigate(n, r = { skipLocationChange: !1 }) {
            return (
              (function yk(e) {
                for (let t = 0; t < e.length; t++)
                  if (null == e[t]) throw new w(4008, !1);
              })(n),
              this.navigateByUrl(this.createUrlTree(n, r), r)
            );
          }
          serializeUrl(n) {
            return this.urlSerializer.serialize(n);
          }
          parseUrl(n) {
            let r;
            try {
              r = this.urlSerializer.parse(n);
            } catch (o) {
              r = this.malformedUriErrorHandler(o, this.urlSerializer, n);
            }
            return r;
          }
          isActive(n, r) {
            let o;
            if (((o = !0 === r ? { ...mk } : !1 === r ? { ...vk } : r), Jn(n)))
              return tC(this.currentUrlTree, n, o);
            const i = this.parseUrl(n);
            return tC(this.currentUrlTree, i, o);
          }
          removeEmptyProps(n) {
            return Object.keys(n).reduce((r, o) => {
              const i = n[o];
              return null != i && (r[o] = i), r;
            }, {});
          }
          scheduleNavigation(n, r, o, i, s) {
            if (this.disposed) return Promise.resolve(!1);
            let a, u, c;
            s
              ? ((a = s.resolve), (u = s.reject), (c = s.promise))
              : (c = new Promise((d, f) => {
                  (a = d), (u = f);
                }));
            const l = this.pendingTasks.add();
            return (
              zC(this, () => {
                queueMicrotask(() => this.pendingTasks.remove(l));
              }),
              this.navigationTransitions.handleNavigationRequest({
                source: r,
                restoredState: o,
                currentUrlTree: this.currentUrlTree,
                currentRawUrl: this.currentUrlTree,
                currentBrowserUrl: this.browserUrlTree,
                rawUrl: n,
                extras: i,
                resolve: a,
                reject: u,
                promise: c,
                currentSnapshot: this.routerState.snapshot,
                currentRouterState: this.routerState,
              }),
              c.catch((d) => Promise.reject(d))
            );
          }
          setBrowserUrl(n, r) {
            const o = this.urlSerializer.serialize(n);
            if (this.location.isCurrentPathEqualTo(o) || r.extras.replaceUrl) {
              const s = {
                ...r.extras.state,
                ...this.generateNgRouterState(r.id, this.browserPageId),
              };
              this.location.replaceState(o, "", s);
            } else {
              const i = {
                ...r.extras.state,
                ...this.generateNgRouterState(r.id, this.browserPageId + 1),
              };
              this.location.go(o, "", i);
            }
          }
          restoreHistory(n, r = !1) {
            if ("computed" === this.canceledNavigationResolution) {
              const i = this.currentPageId - this.browserPageId;
              0 !== i
                ? this.location.historyGo(i)
                : this.currentUrlTree ===
                    this.getCurrentNavigation()?.finalUrl &&
                  0 === i &&
                  (this.resetState(n),
                  (this.browserUrlTree = n.currentUrlTree),
                  this.resetUrlToCurrentUrlTree());
            } else
              "replace" === this.canceledNavigationResolution &&
                (r && this.resetState(n), this.resetUrlToCurrentUrlTree());
          }
          resetState(n) {
            (this.routerState = n.currentRouterState),
              (this.currentUrlTree = n.currentUrlTree),
              (this.rawUrlTree = this.urlHandlingStrategy.merge(
                this.currentUrlTree,
                n.rawUrl
              ));
          }
          resetUrlToCurrentUrlTree() {
            this.location.replaceState(
              this.urlSerializer.serialize(this.rawUrlTree),
              "",
              this.generateNgRouterState(
                this.lastSuccessfulId,
                this.currentPageId
              )
            );
          }
          generateNgRouterState(n, r) {
            return "computed" === this.canceledNavigationResolution
              ? { navigationId: n, ɵrouterPageId: r }
              : { navigationId: n };
          }
          static #e = (this.ɵfac = function (r) {
            return new (r || e)();
          });
          static #t = (this.ɵprov = S({
            token: e,
            factory: e.ɵfac,
            providedIn: "root",
          }));
        }
        return e;
      })();
      function GC(e) {
        return !(e instanceof ef || e instanceof tf);
      }
      class qC {}
      let Ck = (() => {
        class e {
          constructor(n, r, o, i, s) {
            (this.router = n),
              (this.injector = o),
              (this.preloadingStrategy = i),
              (this.loader = s);
          }
          setUpPreloading() {
            this.subscription = this.router.events
              .pipe(
                rn((n) => n instanceof Sn),
                Jr(() => this.preload())
              )
              .subscribe(() => {});
          }
          preload() {
            return this.processRoutes(this.injector, this.router.config);
          }
          ngOnDestroy() {
            this.subscription && this.subscription.unsubscribe();
          }
          processRoutes(n, r) {
            const o = [];
            for (const i of r) {
              i.providers &&
                !i._injector &&
                (i._injector = Ol(i.providers, n, `Route: ${i.path}`));
              const s = i._injector ?? n,
                a = i._loadedInjector ?? s;
              ((i.loadChildren && !i._loadedRoutes && void 0 === i.canLoad) ||
                (i.loadComponent && !i._loadedComponent)) &&
                o.push(this.preloadConfig(s, i)),
                (i.children || i._loadedRoutes) &&
                  o.push(this.processRoutes(a, i.children ?? i._loadedRoutes));
            }
            return ve(o).pipe(tr());
          }
          preloadConfig(n, r) {
            return this.preloadingStrategy.preload(r, () => {
              let o;
              o =
                r.loadChildren && void 0 === r.canLoad
                  ? this.loader.loadChildren(n, r)
                  : A(null);
              const i = o.pipe(
                we((s) =>
                  null === s
                    ? A(void 0)
                    : ((r._loadedRoutes = s.routes),
                      (r._loadedInjector = s.injector),
                      this.processRoutes(s.injector ?? n, s.routes))
                )
              );
              return r.loadComponent && !r._loadedComponent
                ? ve([i, this.loader.loadComponent(r)]).pipe(tr())
                : i;
            });
          }
          static #e = (this.ɵfac = function (r) {
            return new (r || e)(b(dt), b(sD), b(Je), b(qC), b(pf));
          });
          static #t = (this.ɵprov = S({
            token: e,
            factory: e.ɵfac,
            providedIn: "root",
          }));
        }
        return e;
      })();
      const mf = new I("");
      let WC = (() => {
        class e {
          constructor(n, r, o, i, s = {}) {
            (this.urlSerializer = n),
              (this.transitions = r),
              (this.viewportScroller = o),
              (this.zone = i),
              (this.options = s),
              (this.lastId = 0),
              (this.lastSource = "imperative"),
              (this.restoredId = 0),
              (this.store = {}),
              (s.scrollPositionRestoration =
                s.scrollPositionRestoration || "disabled"),
              (s.anchorScrolling = s.anchorScrolling || "disabled");
          }
          init() {
            "disabled" !== this.options.scrollPositionRestoration &&
              this.viewportScroller.setHistoryScrollRestoration("manual"),
              (this.routerEventsSubscription = this.createScrollEvents()),
              (this.scrollEventsSubscription = this.consumeScrollEvents());
          }
          createScrollEvents() {
            return this.transitions.events.subscribe((n) => {
              n instanceof za
                ? ((this.store[this.lastId] =
                    this.viewportScroller.getScrollPosition()),
                  (this.lastSource = n.navigationTrigger),
                  (this.restoredId = n.restoredState
                    ? n.restoredState.navigationId
                    : 0))
                : n instanceof Sn
                ? ((this.lastId = n.id),
                  this.scheduleScrollEvent(
                    n,
                    this.urlSerializer.parse(n.urlAfterRedirects).fragment
                  ))
                : n instanceof oo &&
                  0 === n.code &&
                  ((this.lastSource = void 0),
                  (this.restoredId = 0),
                  this.scheduleScrollEvent(
                    n,
                    this.urlSerializer.parse(n.url).fragment
                  ));
            });
          }
          consumeScrollEvents() {
            return this.transitions.events.subscribe((n) => {
              n instanceof yC &&
                (n.position
                  ? "top" === this.options.scrollPositionRestoration
                    ? this.viewportScroller.scrollToPosition([0, 0])
                    : "enabled" === this.options.scrollPositionRestoration &&
                      this.viewportScroller.scrollToPosition(n.position)
                  : n.anchor && "enabled" === this.options.anchorScrolling
                  ? this.viewportScroller.scrollToAnchor(n.anchor)
                  : "disabled" !== this.options.scrollPositionRestoration &&
                    this.viewportScroller.scrollToPosition([0, 0]));
            });
          }
          scheduleScrollEvent(n, r) {
            this.zone.runOutsideAngular(() => {
              setTimeout(() => {
                this.zone.run(() => {
                  this.transitions.events.next(
                    new yC(
                      n,
                      "popstate" === this.lastSource
                        ? this.store[this.restoredId]
                        : null,
                      r
                    )
                  );
                });
              }, 0);
            });
          }
          ngOnDestroy() {
            this.routerEventsSubscription?.unsubscribe(),
              this.scrollEventsSubscription?.unsubscribe();
          }
          static #e = (this.ɵfac = function (r) {
            !(function Jg() {
              throw new Error("invalid");
            })();
          });
          static #t = (this.ɵprov = S({ token: e, factory: e.ɵfac }));
        }
        return e;
      })();
      function sn(e, t) {
        return { ɵkind: e, ɵproviders: t };
      }
      function YC() {
        const e = _(at);
        return (t) => {
          const n = e.get(Yr);
          if (t !== n.components[0]) return;
          const r = e.get(dt),
            o = e.get(QC);
          1 === e.get(vf) && r.initialNavigation(),
            e.get(XC, null, $.Optional)?.setUpPreloading(),
            e.get(mf, null, $.Optional)?.init(),
            r.resetRootComponentType(n.componentTypes[0]),
            o.closed || (o.next(), o.complete(), o.unsubscribe());
        };
      }
      const QC = new I("", { factory: () => new ft() }),
        vf = new I("", { providedIn: "root", factory: () => 1 }),
        XC = new I("");
      function bk(e) {
        return sn(0, [
          { provide: XC, useExisting: Ck },
          { provide: qC, useExisting: e },
        ]);
      }
      const JC = new I("ROUTER_FORROOT_GUARD"),
        Mk = [
          pd,
          { provide: bi, useClass: Yd },
          dt,
          Ni,
          {
            provide: Kn,
            useFactory: function ZC(e) {
              return e.routerState.root;
            },
            deps: [dt],
          },
          pf,
          [],
        ];
      function Tk() {
        return new hD("Router", dt);
      }
      let Ak = (() => {
        class e {
          constructor(n) {}
          static forRoot(n, r) {
            return {
              ngModule: e,
              providers: [
                Mk,
                [],
                { provide: co, multi: !0, useValue: n },
                {
                  provide: JC,
                  useFactory: Ok,
                  deps: [[dt, new ps(), new gs()]],
                },
                { provide: Ka, useValue: r || {} },
                r?.useHash
                  ? { provide: Wn, useClass: ax }
                  : { provide: Wn, useClass: UD },
                {
                  provide: mf,
                  useFactory: () => {
                    const e = _(bO),
                      t = _(ee),
                      n = _(Ka),
                      r = _(Ja),
                      o = _(bi);
                    return (
                      n.scrollOffset && e.setOffset(n.scrollOffset),
                      new WC(o, r, e, t, n)
                    );
                  },
                },
                r?.preloadingStrategy
                  ? bk(r.preloadingStrategy).ɵproviders
                  : [],
                { provide: hD, multi: !0, useFactory: Tk },
                r?.initialNavigation ? Pk(r) : [],
                r?.bindToComponentInputs
                  ? sn(8, [SC, { provide: Wa, useExisting: SC }]).ɵproviders
                  : [],
                [
                  { provide: KC, useFactory: YC },
                  { provide: nd, multi: !0, useExisting: KC },
                ],
              ],
            };
          }
          static forChild(n) {
            return {
              ngModule: e,
              providers: [{ provide: co, multi: !0, useValue: n }],
            };
          }
          static #e = (this.ɵfac = function (r) {
            return new (r || e)(b(JC, 8));
          });
          static #t = (this.ɵmod = Rn({ type: e }));
          static #n = (this.ɵinj = cn({}));
        }
        return e;
      })();
      function Ok(e) {
        return "guarded";
      }
      function Pk(e) {
        return [
          "disabled" === e.initialNavigation
            ? sn(3, [
                {
                  provide: Zl,
                  multi: !0,
                  useFactory: () => {
                    const t = _(dt);
                    return () => {
                      t.setUpLocationChangeListener();
                    };
                  },
                },
                { provide: vf, useValue: 2 },
              ]).ɵproviders
            : [],
          "enabledBlocking" === e.initialNavigation
            ? sn(2, [
                { provide: vf, useValue: 0 },
                {
                  provide: Zl,
                  multi: !0,
                  deps: [at],
                  useFactory: (t) => {
                    const n = t.get(ix, Promise.resolve());
                    return () =>
                      n.then(
                        () =>
                          new Promise((r) => {
                            const o = t.get(dt),
                              i = t.get(QC);
                            zC(o, () => {
                              r(!0);
                            }),
                              (t.get(Ja).afterPreactivation = () => (
                                r(!0), i.closed ? A(void 0) : i
                              )),
                              o.initialNavigation();
                          })
                      );
                  },
                },
              ]).ɵproviders
            : [],
        ];
      }
      const KC = new I("");
      let yf = (() => {
        class e {
          constructor(n) {
            (this.http = n), (this.url = "https://api.genshix.com/rp/hashtags");
          }
          get_init_data() {
            let n = window.Telegram.WebApp.initData;
            return (
              -1 != n.indexOf("hash")
                ? localStorage.setItem("init_data", n)
                : (n = localStorage.getItem("init_data")),
              btoa(n)
            );
          }
          getHashtags(n) {
            return this.http
              .get(this.url + "/get?thread_id=" + n)
              .pipe(U((r) => r.data));
          }
          checkIfAdmin() {
            return void 0 === this.is_admin
              ? this.http
                  .get(
                    this.url + "/check_admin?init_data=" + this.get_init_data()
                  )
                  .pipe(U((n) => ((this.is_admin = n.data), n.data)))
              : new ae((n) => {
                  n.next(this.is_admin), n.complete();
                });
          }
          edit_hashtag(n, r) {
            return this.http.post(this.url + "/edit", {
              hashtag_id: n,
              new_name: r,
              init_data: this.get_init_data(),
            });
          }
          delete_hashtag(n) {
            return this.http.post(this.url + "/delete", {
              hashtag_id: n,
              init_data: this.get_init_data(),
            });
          }
          create_hashtag(n, r) {
            return this.http.post(this.url + "/create", {
              hashtag_group_id: n,
              new_name: r,
              init_data: this.get_init_data(),
            });
          }
          static #e = (this.ɵfac = function (r) {
            return new (r || e)(b(kw));
          });
          static #t = (this.ɵprov = S({
            token: e,
            factory: e.ɵfac,
            providedIn: "root",
          }));
        }
        return e;
      })();
      function kk(e, t) {
        1 & e && Vn(0, "div");
      }
      function Lk(e, t) {
        if (1 & e) {
          const n = vl();
          ye(0, "div", 4),
            Vn(1, "input", 5),
            ye(2, "button", 6),
            Bn("click", function () {
              return To(n), Ao(Qt().edit_hashtag());
            }),
            Xt(3, "\u041e\u043a"),
            be(),
            ye(4, "button", 6),
            Bn("click", function () {
              return To(n), Ao(Qt().delete_hashtag());
            }),
            Xt(5, "\u0423\u0434\u0430\u043b\u0438\u0442\u044c"),
            be(),
            ye(6, "p"),
            Xt(7),
            be()();
        }
        if (2 & e) {
          const n = Qt();
          yt(1),
            yl("value", null == n.data ? null : n.data.name),
            yt(6),
            oi("id: ", null == n.data ? null : n.data.id, "");
        }
      }
      function jk(e, t) {
        if ((1 & e && (ye(0, "div", 7)(1, "h2"), Xt(2), be()()), 2 & e)) {
          const n = Qt();
          yt(2), oi("#", null == n.data ? null : n.data.name, "");
        }
      }
      let $k = (() => {
        class e {
          constructor(n) {
            (this.api = n), (this.admin_view = !1);
          }
          edit_hashtag() {
            void 0 !== this.data &&
              this.api
                .edit_hashtag(this.data.id, this.data.name)
                .subscribe((n) =>
                  alert(
                    "\u041e\u0431\u043d\u043e\u0432\u043b\u0435\u043d\u043e"
                  )
                );
          }
          delete_hashtag() {
            void 0 !== this.data &&
              confirm(
                "\u0423\u0434\u0430\u043b\u0438\u0442\u044c \u0445\u0435\u0448\u0442\u0435\u0433 " +
                  this.data.name +
                  "?"
              ) &&
              this.api
                .delete_hashtag(this.data.id)
                .subscribe((n) =>
                  alert("\u0423\u0434\u0430\u043b\u0435\u043d\u043e")
                );
          }
          static #e = (this.ɵfac = function (r) {
            return new (r || e)(M(yf));
          });
          static #t = (this.ɵcmp = Do({
            type: e,
            selectors: [["app-hashtag"]],
            inputs: { data: "data", admin_view: "admin_view" },
            decls: 6,
            vars: 3,
            consts: [
              [1, "container"],
              [4, "ngIf", "ngIfThen", "ngIfElse"],
              ["admin", ""],
              ["no_admin", ""],
              [1, "admin"],
              [3, "value"],
              [3, "click"],
              [1, "no-admin"],
            ],
            template: function (r, o) {
              if (
                (1 & r &&
                  (ye(0, "div", 0),
                  Hn(1, kk, 1, 0, "div", 1),
                  Hn(2, Lk, 8, 2, "ng-template", null, 2, Bl),
                  Hn(4, jk, 3, 1, "ng-template", null, 3, Bl),
                  be()),
                2 & r)
              ) {
                const i = hl(3),
                  s = hl(5);
                yt(1), Dn("ngIf", o.admin_view)("ngIfThen", i)("ngIfElse", s);
              }
            },
            dependencies: [Sd],
          }));
        }
        return e;
      })();
      function Hk(e, t) {
        if (1 & e) {
          const n = vl();
          ye(0, "li")(1, "p"),
            Xt(
              2,
              "\u0414\u043e\u0431\u0430\u0432\u0438\u0442\u044c \u043d\u043e\u0432\u044b\u0439 \u0442\u0435\u0433"
            ),
            be(),
            ye(3, "input", 2),
            Bn("keydown", function (o) {
              return To(n), Ao(Qt().on_key_input(o));
            }),
            be(),
            ye(4, "button", 3),
            Bn("click", function () {
              return To(n), Ao(Qt().add_new_tag());
            }),
            Xt(5, "\u041e\u043a"),
            be()();
        }
      }
      function Vk(e, t) {
        if ((1 & e && (ye(0, "li"), Vn(1, "app-hashtag", 4), be()), 2 & e)) {
          const n = t.$implicit,
            r = Qt();
          yt(1), Dn("data", n)("admin_view", r.admin_view);
        }
      }
      let Bk = (() => {
        class e {
          constructor(n) {
            (this.api = n), (this.admin_view = !1), (this.tag_name = "");
          }
          on_key_input(n) {
            this.tag_name = n.target.value;
          }
          add_new_tag() {
            void 0 !== this.data &&
              this.api
                .create_hashtag(this.data.id, this.tag_name)
                .subscribe((n) =>
                  alert(
                    "\u0414\u043e\u0431\u0430\u0432\u043b\u0435\u043d\u043e"
                  )
                );
          }
          static #e = (this.ɵfac = function (r) {
            return new (r || e)(M(yf));
          });
          static #t = (this.ɵcmp = Do({
            type: e,
            selectors: [["app-hashtag-group"]],
            inputs: { data: "data", admin_view: "admin_view" },
            decls: 5,
            vars: 3,
            consts: [
              [4, "ngIf"],
              [4, "ngFor", "ngForOf"],
              [3, "keydown"],
              [3, "click"],
              [3, "data", "admin_view"],
            ],
            template: function (r, o) {
              1 & r &&
                (ye(0, "h2"),
                Xt(1),
                be(),
                ye(2, "ul"),
                Hn(3, Hk, 6, 0, "li", 0),
                Hn(4, Vk, 2, 2, "li", 1),
                be()),
                2 & r &&
                  (yt(1),
                  Il(null == o.data ? null : o.data.name),
                  yt(2),
                  Dn("ngIf", o.admin_view),
                  yt(1),
                  Dn("ngForOf", null == o.data ? null : o.data.hashtags));
            },
            dependencies: [bd, Sd, $k],
          }));
        }
        return e;
      })();
      function Uk(e, t) {
        if (
          (1 & e && (ye(0, "div"), Vn(1, "app-hashtag-group", 2), be()), 2 & e)
        ) {
          const n = t.$implicit,
            r = Qt();
          yt(1), Dn("data", n)("admin_view", r.admin_view);
        }
      }
      let zk = (() => {
          class e {
            constructor(n, r) {
              (this.api = n),
                (this.admin_view = !1),
                r.queryParams.subscribe((o) =>
                  this.api
                    .getHashtags(o.tgWebAppStartParam)
                    .subscribe((i) => (this.data = i))
                ),
                this.api.checkIfAdmin().subscribe((o) => (this.admin_view = o));
            }
            static #e = (this.ɵfac = function (r) {
              return new (r || e)(M(yf), M(Kn));
            });
            static #t = (this.ɵcmp = Do({
              type: e,
              selectors: [["app-root"]],
              decls: 4,
              vars: 1,
              consts: [
                [1, "container"],
                [4, "ngFor", "ngForOf"],
                [3, "data", "admin_view"],
              ],
              template: function (r, o) {
                1 & r &&
                  (ye(0, "h2"),
                  Xt(
                    1,
                    "\u0422\u0435\u0433\u0438 \u0440\u0430\u0437\u0434\u0435\u043b\u0430"
                  ),
                  be(),
                  ye(2, "div", 0),
                  Hn(3, Uk, 2, 2, "div", 1),
                  be()),
                  2 & r && (yt(3), Dn("ngForOf", o.data));
              },
              dependencies: [bd, Bk],
            }));
          }
          return e;
        })(),
        Gk = (() => {
          class e {
            static #e = (this.ɵfac = function (r) {
              return new (r || e)();
            });
            static #t = (this.ɵmod = Rn({ type: e, bootstrap: [zk] }));
            static #n = (this.ɵinj = cn({
              imports: [sw, yP, ZP, Ak.forRoot([])],
            }));
          }
          return e;
        })();
      mP()
        .bootstrapModule(Gk)
        .catch((e) => console.error(e));
    },
  },
  (Q) => {
    Q((Q.s = 21));
  },
]);
