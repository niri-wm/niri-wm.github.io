const win = window;
const doc = win.document;
const nav = win.navigator;
function resolvers() {
  let resolve, reject;
  let promise = new Promise((res, rej) => {
    resolve = res;
    reject = rej;
  });
  return { promise, resolve, reject };
}
class Island extends HTMLElement {
  static attributePrefix = "on:";
  static attr = {
    template: "data-island",
    ready: "ready",
    defer: "defer-hydration",
    type: "type",
    import: "import"
  };
  static _tagNames = /* @__PURE__ */ new Set();
  static _once = /* @__PURE__ */ new Map();
  static ctm() {
    return typeof globalThis !== "undefined";
  }
  static define(registry = win.customElements) {
    let tagName = "is-land";
    if (this.ctm() && !registry.get(tagName)) {
      registry.define(tagName, this);
    }
  }
  static _initTypes = {
    default: async (target) => {
      await import(target.getAttribute(Island.attr.import));
    }
  };
  static addInitType(name, fn) {
    this._initTypes[name] = fn;
  }
  static _fallback = {};
  static addFallback(selector, fn) {
    this._fallback[selector] = fn;
    let tags = Array.from(this._tagNames);
    if (tags.length) {
      doc.querySelectorAll(tags.map((t) => `${t}:defined`).join(",")).forEach((node) => {
        node.replaceFallbackContent();
      });
    }
  }
  getFallback() {
    return Object.assign({
      // Support: computed property name Chrome 47 Firefox 34 Safari 8
      // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Object_initializer#browser_compatibility
      [`:not(:defined):not(${this.localName}):not([${Island.attr.defer}])`]: (node, prefix) => {
        let cloned = Island.renameNode(node, prefix + node.localName);
        return () => {
          if (cloned.shadowRoot) {
            node.shadowRoot.append(...cloned.shadowRoot.childNodes);
          }
          node.append(...cloned.childNodes);
          cloned.replaceWith(node);
        };
      }
    }, Island._fallback);
  }
  static renameNode(node, name) {
    let cloned = doc.createElement(name);
    for (let attr of node.getAttributeNames()) {
      cloned.setAttribute(attr, node.getAttribute(attr));
    }
    let sr = node.shadowRoot;
    if (!sr) {
      let tmpl = node.querySelector(":scope > template[shadowrootmode], :scope > template[shadowroot]");
      if (tmpl) {
        let mode = tmpl.getAttribute("shadowrootmode") || tmpl.getAttribute("shadowroot") || "closed";
        sr = node.attachShadow({ mode });
        sr.appendChild(tmpl.content.cloneNode(true));
      }
    }
    if (sr) {
      cloned.attachShadow({ mode: sr.mode }).append(...sr.childNodes);
    }
    cloned.append(...node.childNodes);
    node.replaceWith(cloned);
    return cloned;
  }
  constructor() {
    super();
    this._ready = resolvers();
    this._fallbackExec = {};
    Island._tagNames.add(this.localName);
  }
  // any parents of `el` that are <is-land> with on: conditions
  getParents(el, stopAt = false) {
    let nodes = [];
    while (el = el.parentNode) {
      if (!el || el === doc.body) {
        break;
      } else if (el.matches && el.matches(this.localName)) {
        if (stopAt && el === stopAt) {
          break;
        }
        if (Conditions.hasConditions(el, Island.attributePrefix)) {
          nodes.push(el);
        }
      }
    }
    return nodes;
  }
  replaceTemplates() {
    let templates = this.querySelectorAll(`template[${Island.attr.template}]`);
    for (let tmpl of templates) {
      if (this.getParents(tmpl, this).length > 0) {
        continue;
      }
      let value = tmpl.getAttribute(Island.attr.template);
      if (value === "replace") {
        let children = Array.from(this.childNodes);
        for (let child of children) {
          this.removeChild(child);
        }
        this.appendChild(tmpl.content);
        break;
      } else {
        let html = tmpl.innerHTML;
        if (value === "once" && html) {
          if (Island._once.has(html)) {
            tmpl.remove();
            return;
          }
          Island._once.set(html, true);
        }
        tmpl.replaceWith(tmpl.content);
      }
    }
  }
  async beforeReady() {
    let type = this.getAttribute(Island.attr.type);
    let fn;
    if (type) {
      fn = Island._initTypes[type];
    } else if (this.getAttribute(Island.attr.import)) {
      fn = Island._initTypes["default"];
    }
    if (fn) {
      await fn(this);
    }
  }
  // resolves when all parent islands of node are ready
  async ready(node, parents) {
    if (!Array.isArray(parents)) {
      parents = this.getParents(node);
    }
    return Promise.all(parents.map((p) => p.wait()));
  }
  replaceFallbackContent() {
    let prefix = `${this.localName}--`;
    for (let [selector, fn] of Object.entries(this.getFallback())) {
      if (this._fallbackExec[selector]) {
        continue;
      }
      let components = Array.from(this.querySelectorAll(selector)).reverse();
      let nodes = [];
      for (let node of components) {
        if (!node.isConnected) {
          continue;
        }
        let parents = this.getParents(node);
        if (parents[0] === this) {
          let returned = fn(node, prefix);
          nodes.push({ node, parents, returned });
        }
      }
      for (let { node, parents, returned } of nodes.reverse()) {
        this.ready(node, parents).then(returned);
      }
      this._fallbackExec[selector] = true;
    }
  }
  wait() {
    return this._ready.promise;
  }
  async connectedCallback() {
    if (Conditions.hasConditions(this, Island.attributePrefix)) {
      this.replaceFallbackContent();
    }
    await this.hydrate();
  }
  async hydrate() {
    let conditions = [];
    let parents = this.getParents(this);
    if (parents.length) {
      conditions.push(parents[0].wait());
    }
    conditions.push(...Conditions.getConditions(this, Island.attributePrefix));
    await Promise.all(conditions);
    this.replaceTemplates();
    await this.beforeReady();
    this._ready.resolve();
    let { ready, defer } = Island.attr;
    this.setAttribute(ready, "");
    this.querySelectorAll(`[${defer}]`).forEach((n) => n.removeAttribute(defer));
  }
}
class Conditions {
  static _media = {};
  // cache
  // Attributes (prefixed with Island.attributePrefix) => Callbacks
  static map = {
    "visible": Conditions.visible,
    "idle": Conditions.idle,
    "load": Conditions.pageLoad,
    "interaction": Conditions.interaction,
    "media": Conditions.media,
    "save-data": Conditions.saveData
  };
  // Support: Default param values Chrome 49 Firefox 15 Safari 10
  static getMap(prefix = "") {
    return Object.keys(Conditions.map).map((attr) => prefix + attr);
  }
  static hasConditions(node, prefix) {
    for (let attr of Conditions.getMap(prefix)) {
      if (node.hasAttribute(attr)) {
        return true;
      }
    }
    return false;
  }
  static getConditions(node, prefix) {
    let v = [];
    for (let unprefixedAttr of Conditions.getMap()) {
      let prefixedAttr = prefix + unprefixedAttr;
      if (node.hasAttribute(prefixedAttr)) {
        let attrValue = node.getAttribute(prefixedAttr);
        v.push(Conditions.map[unprefixedAttr](attrValue, node));
      }
    }
    return v;
  }
  static visible(noop, el) {
    let { promise, resolve } = resolvers();
    if ("IntersectionObserver" in win) {
      let observer = new IntersectionObserver((entries) => {
        let [entry] = entries;
        if (entry.isIntersecting) {
          observer.unobserve(entry.target);
          resolve();
        }
      });
      observer.observe(el);
    } else {
      resolve();
    }
    return promise;
  }
  // Global (not element dependent)
  static pageLoad() {
    if (Conditions._cacheLoad) {
      return Conditions._cacheLoad;
    }
    let { promise, resolve } = resolvers();
    if (doc.readyState === "complete") {
      resolve();
    } else {
      win.addEventListener("load", () => resolve(), { once: true });
    }
    Conditions._cacheLoad = promise;
    return promise;
  }
  // Global (not element dependent)
  // TODO fix this to resolve *last* when used with other conditions
  static idle() {
    if (Conditions._cacheIdle) {
      return Conditions._cacheIdle;
    }
    let { promise, resolve } = resolvers();
    if ("requestIdleCallback" in win) {
      requestIdleCallback(() => resolve());
    } else {
      resolve();
    }
    Conditions._cacheIdle = Promise.all([
      Conditions.pageLoad(),
      // idle *after* load
      promise
    ]);
    return Conditions._cacheIdle;
  }
  static interaction(eventOverrides, el) {
    let eventsStr = eventOverrides || "click,touchstart";
    let events = eventsStr.split(",").map((entry) => entry.trim());
    let { promise, resolve } = resolvers();
    function resolveFn(e) {
      resolve();
      for (let name of events) {
        el.removeEventListener(name, resolveFn);
      }
    }
    for (let name of events) {
      el.addEventListener(name, resolveFn, { once: true, passive: true });
    }
    return promise;
  }
  // Global (viewport, not element dependent)
  static media(query) {
    if (Conditions._media[query]) {
      return Conditions._media[query];
    }
    let { promise, resolve } = resolvers();
    let mm = {
      matches: true
    };
    if (query && "matchMedia" in win) {
      mm = win.matchMedia(query);
    }
    if (mm.matches) {
      resolve();
    } else {
      mm.addListener((e) => {
        if (e.matches) {
          resolve();
        }
      });
    }
    Conditions._media[query] = promise;
    return promise;
  }
  // Immediate
  static saveData(expects) {
    let { promise, resolve } = resolvers();
    if (!("connection" in nav) || nav.connection.saveData === (expects !== "false")) {
      resolve();
    }
    return promise;
  }
}
if (!new URL(import.meta.url).searchParams.has("nodefine")) {
  Island.define();
}
win.Island = Island;
export {
  Island
};
