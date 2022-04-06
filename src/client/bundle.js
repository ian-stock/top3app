/* proxy-compat-disable */

/**
 * Copyright (C) 2018 salesforce.com, inc.
 */

/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */
function invariant(value, msg) {
  if (!value) {
    throw new Error(`Invariant Violation: ${msg}`);
  }
}

function isTrue$1(value, msg) {
  if (!value) {
    throw new Error(`Assert Violation: ${msg}`);
  }
}

function isFalse$1(value, msg) {
  if (value) {
    throw new Error(`Assert Violation: ${msg}`);
  }
}

function fail(msg) {
  throw new Error(msg);
}

var assert = /*#__PURE__*/Object.freeze({
  __proto__: null,
  invariant: invariant,
  isTrue: isTrue$1,
  isFalse: isFalse$1,
  fail: fail
});
/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */

const {
  assign,
  create,
  defineProperties,
  defineProperty,
  freeze,
  getOwnPropertyDescriptor: getOwnPropertyDescriptor$1,
  getOwnPropertyNames: getOwnPropertyNames$1,
  getPrototypeOf: getPrototypeOf$1,
  hasOwnProperty: hasOwnProperty$1,
  isFrozen,
  keys,
  seal,
  setPrototypeOf
} = Object;
const {
  isArray: isArray$1
} = Array;
const {
  filter: ArrayFilter,
  find: ArrayFind,
  indexOf: ArrayIndexOf,
  join: ArrayJoin,
  map: ArrayMap,
  push: ArrayPush$1,
  reduce: ArrayReduce,
  reverse: ArrayReverse,
  slice: ArraySlice,
  splice: ArraySplice,
  unshift: ArrayUnshift,
  forEach
} = Array.prototype;
const {
  fromCharCode: StringFromCharCode
} = String;
const {
  charCodeAt: StringCharCodeAt,
  replace: StringReplace,
  slice: StringSlice,
  toLowerCase: StringToLowerCase
} = String.prototype;

function isUndefined$1(obj) {
  return obj === undefined;
}

function isNull(obj) {
  return obj === null;
}

function isTrue(obj) {
  return obj === true;
}

function isFalse(obj) {
  return obj === false;
}

function isFunction$1(obj) {
  return typeof obj === 'function';
}

function isObject(obj) {
  return typeof obj === 'object';
}

function isString(obj) {
  return typeof obj === 'string';
}

function isNumber(obj) {
  return typeof obj === 'number';
}

function noop() {
  /* Do nothing */
}

const OtS$1 = {}.toString;

function toString$1(obj) {
  if (obj && obj.toString) {
    // Arrays might hold objects with "null" prototype So using
    // Array.prototype.toString directly will cause an error Iterate through
    // all the items and handle individually.
    if (isArray$1(obj)) {
      return ArrayJoin.call(ArrayMap.call(obj, toString$1), ',');
    }

    return obj.toString();
  } else if (typeof obj === 'object') {
    return OtS$1.call(obj);
  } else {
    return obj + '';
  }
}

function getPropertyDescriptor(o, p) {
  do {
    const d = getOwnPropertyDescriptor$1(o, p);

    if (!isUndefined$1(d)) {
      return d;
    }

    o = getPrototypeOf$1(o);
  } while (o !== null);
}
/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */

/**
 * According to the following list, there are 48 aria attributes of which two (ariaDropEffect and
 * ariaGrabbed) are deprecated:
 * https://www.w3.org/TR/wai-aria-1.1/#x6-6-definitions-of-states-and-properties-all-aria-attributes
 *
 * The above list of 46 aria attributes is consistent with the following resources:
 * https://github.com/w3c/aria/pull/708/files#diff-eacf331f0ffc35d4b482f1d15a887d3bR11060
 * https://wicg.github.io/aom/spec/aria-reflection.html
 */


const AriaPropertyNames = ['ariaActiveDescendant', 'ariaAtomic', 'ariaAutoComplete', 'ariaBusy', 'ariaChecked', 'ariaColCount', 'ariaColIndex', 'ariaColSpan', 'ariaControls', 'ariaCurrent', 'ariaDescribedBy', 'ariaDetails', 'ariaDisabled', 'ariaErrorMessage', 'ariaExpanded', 'ariaFlowTo', 'ariaHasPopup', 'ariaHidden', 'ariaInvalid', 'ariaKeyShortcuts', 'ariaLabel', 'ariaLabelledBy', 'ariaLevel', 'ariaLive', 'ariaModal', 'ariaMultiLine', 'ariaMultiSelectable', 'ariaOrientation', 'ariaOwns', 'ariaPlaceholder', 'ariaPosInSet', 'ariaPressed', 'ariaReadOnly', 'ariaRelevant', 'ariaRequired', 'ariaRoleDescription', 'ariaRowCount', 'ariaRowIndex', 'ariaRowSpan', 'ariaSelected', 'ariaSetSize', 'ariaSort', 'ariaValueMax', 'ariaValueMin', 'ariaValueNow', 'ariaValueText', 'role'];

const {
  AriaAttrNameToPropNameMap,
  AriaPropNameToAttrNameMap
} = /*@__PURE__*/(() => {
  const AriaAttrNameToPropNameMap = create(null);
  const AriaPropNameToAttrNameMap = create(null); // Synthetic creation of all AOM property descriptors for Custom Elements

  forEach.call(AriaPropertyNames, propName => {
    const attrName = StringToLowerCase.call(StringReplace.call(propName, /^aria/, () => 'aria-'));
    AriaAttrNameToPropNameMap[attrName] = propName;
    AriaPropNameToAttrNameMap[propName] = attrName;
  });
  return {
    AriaAttrNameToPropNameMap,
    AriaPropNameToAttrNameMap
  };
})();
/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */
// Inspired from: https://mathiasbynens.be/notes/globalthis


const _globalThis = /*@__PURE__*/function () {
  // On recent browsers, `globalThis` is already defined. In this case return it directly.
  if (typeof globalThis === 'object') {
    return globalThis;
  }

  let _globalThis;

  try {
    // eslint-disable-next-line no-extend-native
    Object.defineProperty(Object.prototype, '__magic__', {
      get: function () {
        return this;
      },
      configurable: true
    }); // __magic__ is undefined in Safari 10 and IE10 and older.
    // @ts-ignore
    // eslint-disable-next-line no-undef

    _globalThis = __magic__; // @ts-ignore

    delete Object.prototype.__magic__;
  } catch (ex) {// In IE8, Object.defineProperty only works on DOM objects.
  } finally {
    // If the magic above fails for some reason we assume that we are in a legacy browser.
    // Assume `window` exists in this case.
    if (typeof _globalThis === 'undefined') {
      // @ts-ignore
      _globalThis = window;
    }
  }

  return _globalThis;
}();
/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */


const KEY__IS_NATIVE_SHADOW_ROOT_DEFINED = '$isNativeShadowRootDefined$';
const KEY__SHADOW_RESOLVER = '$shadowResolver$';
const KEY__SHADOW_TOKEN = '$shadowToken$';
const KEY__SYNTHETIC_MODE = '$$lwc-synthetic-mode';
const KEY__SCOPED_CSS = '$scoped$';
/**
 * Map composed of properties to attributes not following the HTML property to attribute mapping
 * convention.
 */

const NO_STANDARD_PROPERTY_ATTRIBUTE_MAPPING = new Map([['accessKey', 'accesskey'], ['readOnly', 'readonly'], ['tabIndex', 'tabindex'], ['bgColor', 'bgcolor'], ['colSpan', 'colspan'], ['rowSpan', 'rowspan'], ['contentEditable', 'contenteditable'], ['crossOrigin', 'crossorigin'], ['dateTime', 'datetime'], ['formAction', 'formaction'], ['isMap', 'ismap'], ['maxLength', 'maxlength'], ['minLength', 'minlength'], ['noValidate', 'novalidate'], ['useMap', 'usemap'], ['htmlFor', 'for']]);
/**
 * Map associating previously transformed HTML property into HTML attribute.
 */

const CACHED_PROPERTY_ATTRIBUTE_MAPPING = new Map();

function htmlPropertyToAttribute(propName) {
  const ariaAttributeName = AriaPropNameToAttrNameMap[propName];

  if (!isUndefined$1(ariaAttributeName)) {
    return ariaAttributeName;
  }

  const specialAttributeName = NO_STANDARD_PROPERTY_ATTRIBUTE_MAPPING.get(propName);

  if (!isUndefined$1(specialAttributeName)) {
    return specialAttributeName;
  }

  const cachedAttributeName = CACHED_PROPERTY_ATTRIBUTE_MAPPING.get(propName);

  if (!isUndefined$1(cachedAttributeName)) {
    return cachedAttributeName;
  }

  let attributeName = '';

  for (let i = 0, len = propName.length; i < len; i++) {
    const code = StringCharCodeAt.call(propName, i);

    if (code >= 65 && // "A"
    code <= 90 // "Z"
    ) {
      attributeName += '-' + StringFromCharCode(code + 32);
    } else {
      attributeName += StringFromCharCode(code);
    }
  }

  CACHED_PROPERTY_ATTRIBUTE_MAPPING.set(propName, attributeName);
  return attributeName;
}
/** version: 2.7.0 */

/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */


function detect(propName) {
  return Object.getOwnPropertyDescriptor(Element.prototype, propName) === undefined;
}
/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */


const nodeToAriaPropertyValuesMap = new WeakMap();

function getAriaPropertyMap(elm) {
  let map = nodeToAriaPropertyValuesMap.get(elm);

  if (map === undefined) {
    map = {};
    nodeToAriaPropertyValuesMap.set(elm, map);
  }

  return map;
}

function getNormalizedAriaPropertyValue(value) {
  return value == null ? null : String(value);
}

function createAriaPropertyPropertyDescriptor(propName, attrName) {
  return {
    get() {
      const map = getAriaPropertyMap(this);

      if (hasOwnProperty$1.call(map, propName)) {
        return map[propName];
      } // otherwise just reflect what's in the attribute


      return this.hasAttribute(attrName) ? this.getAttribute(attrName) : null;
    },

    set(newValue) {
      const normalizedValue = getNormalizedAriaPropertyValue(newValue);
      const map = getAriaPropertyMap(this);
      map[propName] = normalizedValue; // reflect into the corresponding attribute

      if (newValue === null) {
        this.removeAttribute(attrName);
      } else {
        this.setAttribute(attrName, newValue);
      }
    },

    configurable: true,
    enumerable: true
  };
}

function patch(propName) {
  // Typescript is inferring the wrong function type for this particular
  // overloaded method: https://github.com/Microsoft/TypeScript/issues/27972
  // @ts-ignore type-mismatch
  const attrName = AriaPropNameToAttrNameMap[propName];
  const descriptor = createAriaPropertyPropertyDescriptor(propName, attrName);
  Object.defineProperty(Element.prototype, propName, descriptor);
}
/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */


const ElementPrototypeAriaPropertyNames = keys(AriaPropNameToAttrNameMap);

for (let i = 0, len = ElementPrototypeAriaPropertyNames.length; i < len; i += 1) {
  const propName = ElementPrototypeAriaPropertyNames[i];

  if (detect(propName)) {
    patch(propName);
  }
}

if (!_globalThis.lwcRuntimeFlags) {
  Object.defineProperty(_globalThis, 'lwcRuntimeFlags', {
    value: create(null)
  });
}

const runtimeFlags = _globalThis.lwcRuntimeFlags;
/** version: 2.7.0 */

/* proxy-compat-disable */

/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */


let nextTickCallbackQueue = [];
const SPACE_CHAR = 32;
const EmptyObject = seal(create(null));
const EmptyArray = seal([]);

function flushCallbackQueue() {
  {
    if (nextTickCallbackQueue.length === 0) {
      throw new Error(`Internal Error: If callbackQueue is scheduled, it is because there must be at least one callback on this pending queue.`);
    }
  }

  const callbacks = nextTickCallbackQueue;
  nextTickCallbackQueue = []; // reset to a new queue

  for (let i = 0, len = callbacks.length; i < len; i += 1) {
    callbacks[i]();
  }
}

function addCallbackToNextTick(callback) {
  {
    if (!isFunction$1(callback)) {
      throw new Error(`Internal Error: addCallbackToNextTick() can only accept a function callback`);
    }
  }

  if (nextTickCallbackQueue.length === 0) {
    Promise.resolve().then(flushCallbackQueue);
  }

  ArrayPush$1.call(nextTickCallbackQueue, callback);
}
// https://github.com/vuejs/vue/blob/531371b818b0e31a989a06df43789728f23dc4e8/src/platforms/web/util/style.js#L5-L16


const DECLARATION_DELIMITER = /;(?![^(]*\))/g;
const PROPERTY_DELIMITER = /:(.+)/;

function parseStyleText(cssText) {
  const styleMap = {};
  const declarations = cssText.split(DECLARATION_DELIMITER);

  for (const declaration of declarations) {
    if (declaration) {
      const [prop, value] = declaration.split(PROPERTY_DELIMITER);

      if (prop !== undefined && value !== undefined) {
        styleMap[prop.trim()] = value.trim();
      }
    }
  }

  return styleMap;
}
/*
 * Copyright (c) 2019, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */


const TargetToReactiveRecordMap = new WeakMap();

function getReactiveRecord(target) {
  let reactiveRecord = TargetToReactiveRecordMap.get(target);

  if (isUndefined$1(reactiveRecord)) {
    const newRecord = create(null);
    reactiveRecord = newRecord;
    TargetToReactiveRecordMap.set(target, newRecord);
  }

  return reactiveRecord;
}

let currentReactiveObserver = null;

function valueMutated(target, key) {
  const reactiveRecord = TargetToReactiveRecordMap.get(target);

  if (!isUndefined$1(reactiveRecord)) {
    const reactiveObservers = reactiveRecord[key];

    if (!isUndefined$1(reactiveObservers)) {
      for (let i = 0, len = reactiveObservers.length; i < len; i += 1) {
        const ro = reactiveObservers[i];
        ro.notify();
      }
    }
  }
}

function valueObserved(target, key) {
  // We should determine if an active Observing Record is present to track mutations.
  if (currentReactiveObserver === null) {
    return;
  }

  const ro = currentReactiveObserver;
  const reactiveRecord = getReactiveRecord(target);
  let reactiveObservers = reactiveRecord[key];

  if (isUndefined$1(reactiveObservers)) {
    reactiveObservers = [];
    reactiveRecord[key] = reactiveObservers;
  } else if (reactiveObservers[0] === ro) {
    return; // perf optimization considering that most subscriptions will come from the same record
  }

  if (ArrayIndexOf.call(reactiveObservers, ro) === -1) {
    ro.link(reactiveObservers);
  }
}

class ReactiveObserver {
  constructor(callback) {
    this.listeners = [];
    this.callback = callback;
  }

  observe(job) {
    const inceptionReactiveRecord = currentReactiveObserver;
    currentReactiveObserver = this;
    let error;

    try {
      job();
    } catch (e) {
      error = Object(e);
    } finally {
      currentReactiveObserver = inceptionReactiveRecord;

      if (error !== undefined) {
        throw error; // eslint-disable-line no-unsafe-finally
      }
    }
  }
  /**
   * This method is responsible for disconnecting the Reactive Observer
   * from any Reactive Record that has a reference to it, to prevent future
   * notifications about previously recorded access.
   */


  reset() {
    const {
      listeners
    } = this;
    const len = listeners.length;

    if (len > 0) {
      for (let i = 0; i < len; i += 1) {
        const set = listeners[i];
        const pos = ArrayIndexOf.call(listeners[i], this);
        ArraySplice.call(set, pos, 1);
      }

      listeners.length = 0;
    }
  } // friend methods


  notify() {
    this.callback.call(undefined, this);
  }

  link(reactiveObservers) {
    ArrayPush$1.call(reactiveObservers, this); // we keep track of observing records where the observing record was added to so we can do some clean up later on

    ArrayPush$1.call(this.listeners, reactiveObservers);
  }

}
/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */


function componentValueMutated(vm, key) {
  valueMutated(vm.component, key);
}

function componentValueObserved(vm, key) {
  valueObserved(vm.component, key);
}
/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */


function getComponentTag(vm) {
  return `<${StringToLowerCase.call(vm.tagName)}>`;
} // TODO [#1695]: Unify getComponentStack and getErrorComponentStack


function getComponentStack(vm) {
  const stack = [];
  let prefix = '';

  while (!isNull(vm.owner)) {
    ArrayPush$1.call(stack, prefix + getComponentTag(vm));
    vm = vm.owner;
    prefix += '\t';
  }

  return ArrayJoin.call(stack, '\n');
}

function getErrorComponentStack(vm) {
  const wcStack = [];
  let currentVm = vm;

  while (!isNull(currentVm)) {
    ArrayPush$1.call(wcStack, getComponentTag(currentVm));
    currentVm = currentVm.owner;
  }

  return wcStack.reverse().join('\n\t');
}
/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */


function log(method, message, vm) {
  let msg = `[LWC ${method}]: ${message}`;

  if (!isUndefined$1(vm)) {
    msg = `${msg}\n${getComponentStack(vm)}`;
  }

  try {
    throw new Error(msg);
  } catch (e) {
    /* eslint-disable-next-line no-console */
    console[method](e);
  }
}

function logError(message, vm) {
  log('error', message, vm);
}

function logWarn(message, vm) {
  log('warn', message, vm);
}
/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */


function handleEvent(event, vnode) {
  const {
    type
  } = event;
  const {
    data: {
      on
    }
  } = vnode;
  const handler = on && on[type]; // call event handler if exists

  if (handler) {
    handler.call(undefined, event);
  }
}

function createListener() {
  return function handler(event) {
    handleEvent(event, handler.vnode);
  };
}

function updateAllEventListeners(oldVnode, vnode) {
  if (isUndefined$1(oldVnode.listener)) {
    createAllEventListeners(vnode);
  } else {
    vnode.listener = oldVnode.listener;
    vnode.listener.vnode = vnode;
  }
}

function createAllEventListeners(vnode) {
  const {
    elm,
    data: {
      on
    },
    owner: {
      renderer
    }
  } = vnode;

  if (isUndefined$1(on)) {
    return;
  }

  const listener = vnode.listener = createListener();
  listener.vnode = vnode;
  let name;

  for (name in on) {
    renderer.addEventListener(elm, name, listener);
  }
}

var modEvents = {
  update: updateAllEventListeners,
  create: createAllEventListeners
};
/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */

const defaultDefHTMLPropertyNames = ['accessKey', 'dir', 'draggable', 'hidden', 'id', 'lang', 'spellcheck', 'tabIndex', 'title'];

function offsetPropertyErrorMessage(name) {
  return `Using the \`${name}\` property is an anti-pattern because it rounds the value to an integer. Instead, use the \`getBoundingClientRect\` method to obtain fractional values for the size of an element and its position relative to the viewport.`;
} // Global HTML Attributes & Properties
// https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes
// https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement


const globalHTMLProperties = assign(create(null), {
  accessKey: {
    attribute: 'accesskey'
  },
  accessKeyLabel: {
    readOnly: true
  },
  className: {
    attribute: 'class',
    error: 'Using the `className` property is an anti-pattern because of slow runtime behavior and potential conflicts with classes provided by the owner element. Use the `classList` API instead.'
  },
  contentEditable: {
    attribute: 'contenteditable'
  },
  dataset: {
    readOnly: true,
    error: "Using the `dataset` property is an anti-pattern because it can't be statically analyzed. Expose each property individually using the `@api` decorator instead."
  },
  dir: {
    attribute: 'dir'
  },
  draggable: {
    attribute: 'draggable'
  },
  dropzone: {
    attribute: 'dropzone',
    readOnly: true
  },
  hidden: {
    attribute: 'hidden'
  },
  id: {
    attribute: 'id'
  },
  inputMode: {
    attribute: 'inputmode'
  },
  lang: {
    attribute: 'lang'
  },
  slot: {
    attribute: 'slot',
    error: 'Using the `slot` property is an anti-pattern.'
  },
  spellcheck: {
    attribute: 'spellcheck'
  },
  style: {
    attribute: 'style'
  },
  tabIndex: {
    attribute: 'tabindex'
  },
  title: {
    attribute: 'title'
  },
  translate: {
    attribute: 'translate'
  },
  // additional "global attributes" that are not present in the link above.
  isContentEditable: {
    readOnly: true
  },
  offsetHeight: {
    readOnly: true,
    error: offsetPropertyErrorMessage('offsetHeight')
  },
  offsetLeft: {
    readOnly: true,
    error: offsetPropertyErrorMessage('offsetLeft')
  },
  offsetParent: {
    readOnly: true
  },
  offsetTop: {
    readOnly: true,
    error: offsetPropertyErrorMessage('offsetTop')
  },
  offsetWidth: {
    readOnly: true,
    error: offsetPropertyErrorMessage('offsetWidth')
  },
  role: {
    attribute: 'role'
  }
});
let controlledElement = null;
let controlledAttributeName;

function isAttributeLocked(elm, attrName) {
  return elm !== controlledElement || attrName !== controlledAttributeName;
}

function lockAttribute(_elm, _key) {
  controlledElement = null;
  controlledAttributeName = undefined;
}

function unlockAttribute(elm, key) {
  controlledElement = elm;
  controlledAttributeName = key;
}
/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */


const xlinkNS = 'http://www.w3.org/1999/xlink';
const xmlNS = 'http://www.w3.org/XML/1998/namespace';
const ColonCharCode = 58;

function updateAttrs(oldVnode, vnode) {
  const {
    data: {
      attrs
    },
    owner: {
      renderer
    }
  } = vnode;

  if (isUndefined$1(attrs)) {
    return;
  }

  let {
    data: {
      attrs: oldAttrs
    }
  } = oldVnode;

  if (oldAttrs === attrs) {
    return;
  }

  {
    assert.invariant(isUndefined$1(oldAttrs) || keys(oldAttrs).join(',') === keys(attrs).join(','), `vnode.data.attrs cannot change shape.`);
  }

  const elm = vnode.elm;
  const {
    setAttribute,
    removeAttribute
  } = renderer;
  let key;
  oldAttrs = isUndefined$1(oldAttrs) ? EmptyObject : oldAttrs; // update modified attributes, add new attributes
  // this routine is only useful for data-* attributes in all kind of elements
  // and aria-* in standard elements (custom elements will use props for these)

  for (key in attrs) {
    const cur = attrs[key];
    const old = oldAttrs[key];

    if (old !== cur) {
      unlockAttribute(elm, key);

      if (StringCharCodeAt.call(key, 3) === ColonCharCode) {
        // Assume xml namespace
        setAttribute(elm, key, cur, xmlNS);
      } else if (StringCharCodeAt.call(key, 5) === ColonCharCode) {
        // Assume xlink namespace
        setAttribute(elm, key, cur, xlinkNS);
      } else if (isNull(cur)) {
        removeAttribute(elm, key);
      } else {
        setAttribute(elm, key, cur);
      }

      lockAttribute();
    }
  }
}

const emptyVNode$3 = {
  data: {}
};
var modAttrs = {
  create: vnode => updateAttrs(emptyVNode$3, vnode),
  update: updateAttrs
};
/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */

function isLiveBindingProp(sel, key) {
  // For properties with live bindings, we read values from the DOM element
  // instead of relying on internally tracked values.
  return sel === 'input' && (key === 'value' || key === 'checked');
}

function update(oldVnode, vnode) {
  const props = vnode.data.props;

  if (isUndefined$1(props)) {
    return;
  }

  const oldProps = oldVnode.data.props;

  if (oldProps === props) {
    return;
  }

  {
    assert.invariant(isUndefined$1(oldProps) || keys(oldProps).join(',') === keys(props).join(','), 'vnode.data.props cannot change shape.');
  }

  const isFirstPatch = isUndefined$1(oldProps);
  const {
    elm,
    sel,
    owner: {
      renderer
    }
  } = vnode;

  for (const key in props) {
    const cur = props[key]; // if it is the first time this element is patched, or the current value is different to the previous value...

    if (isFirstPatch || cur !== (isLiveBindingProp(sel, key) ? renderer.getProperty(elm, key) : oldProps[key])) {
      renderer.setProperty(elm, key, cur);
    }
  }
}

const emptyVNode$2 = {
  data: {}
};
var modProps = {
  create: vnode => update(emptyVNode$2, vnode),
  update
};
/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */

const classNameToClassMap = create(null);

function getMapFromClassName(className) {
  // Intentionally using == to match undefined and null values from computed style attribute
  if (className == null) {
    return EmptyObject;
  } // computed class names must be string


  className = isString(className) ? className : className + '';
  let map = classNameToClassMap[className];

  if (map) {
    return map;
  }

  map = create(null);
  let start = 0;
  let o;
  const len = className.length;

  for (o = 0; o < len; o++) {
    if (StringCharCodeAt.call(className, o) === SPACE_CHAR) {
      if (o > start) {
        map[StringSlice.call(className, start, o)] = true;
      }

      start = o + 1;
    }
  }

  if (o > start) {
    map[StringSlice.call(className, start, o)] = true;
  }

  classNameToClassMap[className] = map;

  {
    // just to make sure that this object never changes as part of the diffing algo
    freeze(map);
  }

  return map;
}

function updateClassAttribute(oldVnode, vnode) {
  const {
    elm,
    data: {
      className: newClass
    },
    owner: {
      renderer
    }
  } = vnode;
  const {
    data: {
      className: oldClass
    }
  } = oldVnode;

  if (oldClass === newClass) {
    return;
  }

  const classList = renderer.getClassList(elm);
  const newClassMap = getMapFromClassName(newClass);
  const oldClassMap = getMapFromClassName(oldClass);
  let name;

  for (name in oldClassMap) {
    // remove only if it is not in the new class collection and it is not set from within the instance
    if (isUndefined$1(newClassMap[name])) {
      classList.remove(name);
    }
  }

  for (name in newClassMap) {
    if (isUndefined$1(oldClassMap[name])) {
      classList.add(name);
    }
  }
}

const emptyVNode$1 = {
  data: {}
};
var modComputedClassName = {
  create: vnode => updateClassAttribute(emptyVNode$1, vnode),
  update: updateClassAttribute
};
/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */

function updateStyleAttribute(oldVnode, vnode) {
  const {
    elm,
    data: {
      style: newStyle
    },
    owner: {
      renderer
    }
  } = vnode;
  const {
    setAttribute,
    removeAttribute
  } = renderer;

  if (oldVnode.data.style === newStyle) {
    return;
  }

  if (!isString(newStyle) || newStyle === '') {
    removeAttribute(elm, 'style');
  } else {
    setAttribute(elm, 'style', newStyle);
  }
}

const emptyVNode = {
  data: {}
};
var modComputedStyle = {
  create: vnode => updateStyleAttribute(emptyVNode, vnode),
  update: updateStyleAttribute
};
/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */
// The compiler takes care of transforming the inline classnames into an object. It's faster to set the
// different classnames properties individually instead of via a string.

function createClassAttribute(vnode) {
  const {
    elm,
    data: {
      classMap
    },
    owner: {
      renderer
    }
  } = vnode;

  if (isUndefined$1(classMap)) {
    return;
  }

  const classList = renderer.getClassList(elm);

  for (const name in classMap) {
    classList.add(name);
  }
}

var modStaticClassName = {
  create: createClassAttribute
};
/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */
// The compiler takes care of transforming the inline style into an object. It's faster to set the
// different style properties individually instead of via a string.

function createStyleAttribute(vnode) {
  const {
    elm,
    data: {
      styleDecls
    },
    owner: {
      renderer
    }
  } = vnode;

  if (isUndefined$1(styleDecls)) {
    return;
  }

  for (let i = 0; i < styleDecls.length; i++) {
    const [prop, value, important] = styleDecls[i];
    renderer.setCSSStyleProperty(elm, prop, value, important);
  }
}

var modStaticStyle = {
  create: createStyleAttribute
};
/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */

/**
@license
Copyright (c) 2015 Simon Friis Vindum.
This code may only be used under the MIT License found at
https://github.com/snabbdom/snabbdom/blob/master/LICENSE
Code distributed by Snabbdom as part of the Snabbdom project at
https://github.com/snabbdom/snabbdom/
*/

function isUndef(s) {
  return s === undefined;
}

function sameVnode(vnode1, vnode2) {
  return vnode1.key === vnode2.key && vnode1.sel === vnode2.sel;
}

function isVNode(vnode) {
  return vnode != null;
}

function createKeyToOldIdx(children, beginIdx, endIdx) {
  const map = {};
  let j, key, ch; // TODO [#1637]: simplify this by assuming that all vnodes has keys

  for (j = beginIdx; j <= endIdx; ++j) {
    ch = children[j];

    if (isVNode(ch)) {
      key = ch.key;

      if (key !== undefined) {
        map[key] = j;
      }
    }
  }

  return map;
}

function addVnodes(parentElm, before, vnodes, startIdx, endIdx) {
  for (; startIdx <= endIdx; ++startIdx) {
    const ch = vnodes[startIdx];

    if (isVNode(ch)) {
      ch.hook.create(ch);
      ch.hook.insert(ch, parentElm, before);
    }
  }
}

function removeVnodes(parentElm, vnodes, startIdx, endIdx) {
  for (; startIdx <= endIdx; ++startIdx) {
    const ch = vnodes[startIdx]; // text nodes do not have logic associated to them

    if (isVNode(ch)) {
      ch.hook.remove(ch, parentElm);
    }
  }
}

function updateDynamicChildren(parentElm, oldCh, newCh) {
  let oldStartIdx = 0;
  let newStartIdx = 0;
  let oldEndIdx = oldCh.length - 1;
  let oldStartVnode = oldCh[0];
  let oldEndVnode = oldCh[oldEndIdx];
  const newChEnd = newCh.length - 1;
  let newEndIdx = newChEnd;
  let newStartVnode = newCh[0];
  let newEndVnode = newCh[newEndIdx];
  let oldKeyToIdx;
  let idxInOld;
  let elmToMove;
  let before;

  while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
    if (!isVNode(oldStartVnode)) {
      oldStartVnode = oldCh[++oldStartIdx]; // Vnode might have been moved left
    } else if (!isVNode(oldEndVnode)) {
      oldEndVnode = oldCh[--oldEndIdx];
    } else if (!isVNode(newStartVnode)) {
      newStartVnode = newCh[++newStartIdx];
    } else if (!isVNode(newEndVnode)) {
      newEndVnode = newCh[--newEndIdx];
    } else if (sameVnode(oldStartVnode, newStartVnode)) {
      patchVnode(oldStartVnode, newStartVnode);
      oldStartVnode = oldCh[++oldStartIdx];
      newStartVnode = newCh[++newStartIdx];
    } else if (sameVnode(oldEndVnode, newEndVnode)) {
      patchVnode(oldEndVnode, newEndVnode);
      oldEndVnode = oldCh[--oldEndIdx];
      newEndVnode = newCh[--newEndIdx];
    } else if (sameVnode(oldStartVnode, newEndVnode)) {
      // Vnode moved right
      patchVnode(oldStartVnode, newEndVnode);
      newEndVnode.hook.move(oldStartVnode, parentElm, oldEndVnode.owner.renderer.nextSibling(oldEndVnode.elm));
      oldStartVnode = oldCh[++oldStartIdx];
      newEndVnode = newCh[--newEndIdx];
    } else if (sameVnode(oldEndVnode, newStartVnode)) {
      // Vnode moved left
      patchVnode(oldEndVnode, newStartVnode);
      newStartVnode.hook.move(oldEndVnode, parentElm, oldStartVnode.elm);
      oldEndVnode = oldCh[--oldEndIdx];
      newStartVnode = newCh[++newStartIdx];
    } else {
      if (oldKeyToIdx === undefined) {
        oldKeyToIdx = createKeyToOldIdx(oldCh, oldStartIdx, oldEndIdx);
      }

      idxInOld = oldKeyToIdx[newStartVnode.key];

      if (isUndef(idxInOld)) {
        // New element
        newStartVnode.hook.create(newStartVnode);
        newStartVnode.hook.insert(newStartVnode, parentElm, oldStartVnode.elm);
        newStartVnode = newCh[++newStartIdx];
      } else {
        elmToMove = oldCh[idxInOld];

        if (isVNode(elmToMove)) {
          if (elmToMove.sel !== newStartVnode.sel) {
            // New element
            newStartVnode.hook.create(newStartVnode);
            newStartVnode.hook.insert(newStartVnode, parentElm, oldStartVnode.elm);
          } else {
            patchVnode(elmToMove, newStartVnode);
            oldCh[idxInOld] = undefined;
            newStartVnode.hook.move(elmToMove, parentElm, oldStartVnode.elm);
          }
        }

        newStartVnode = newCh[++newStartIdx];
      }
    }
  }

  if (oldStartIdx <= oldEndIdx || newStartIdx <= newEndIdx) {
    if (oldStartIdx > oldEndIdx) {
      // There's some cases in which the sub array of vnodes to be inserted is followed by null(s) and an
      // already processed vnode, in such cases the vnodes to be inserted should be before that processed vnode.
      let i = newEndIdx;
      let n;

      do {
        n = newCh[++i];
      } while (!isVNode(n) && i < newChEnd);

      before = isVNode(n) ? n.elm : null;
      addVnodes(parentElm, before, newCh, newStartIdx, newEndIdx);
    } else {
      removeVnodes(parentElm, oldCh, oldStartIdx, oldEndIdx);
    }
  }
}

function updateStaticChildren(parentElm, oldCh, newCh) {
  const oldChLength = oldCh.length;
  const newChLength = newCh.length;

  if (oldChLength === 0) {
    // the old list is empty, we can directly insert anything new
    addVnodes(parentElm, null, newCh, 0, newChLength);
    return;
  }

  if (newChLength === 0) {
    // the old list is nonempty and the new list is empty so we can directly remove all old nodes
    // this is the case in which the dynamic children of an if-directive should be removed
    removeVnodes(parentElm, oldCh, 0, oldChLength);
    return;
  } // if the old list is not empty, the new list MUST have the same
  // amount of nodes, that's why we call this static children


  let referenceElm = null;

  for (let i = newChLength - 1; i >= 0; i -= 1) {
    const vnode = newCh[i];
    const oldVNode = oldCh[i];

    if (vnode !== oldVNode) {
      if (isVNode(oldVNode)) {
        if (isVNode(vnode)) {
          // both vnodes must be equivalent, and se just need to patch them
          patchVnode(oldVNode, vnode);
          referenceElm = vnode.elm;
        } else {
          // removing the old vnode since the new one is null
          oldVNode.hook.remove(oldVNode, parentElm);
        }
      } else if (isVNode(vnode)) {
        // this condition is unnecessary
        vnode.hook.create(vnode); // insert the new node one since the old one is null

        vnode.hook.insert(vnode, parentElm, referenceElm);
        referenceElm = vnode.elm;
      }
    }
  }
}

function patchVnode(oldVnode, vnode) {
  if (oldVnode !== vnode) {
    vnode.elm = oldVnode.elm;
    vnode.hook.update(oldVnode, vnode);
  }
}
/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */


function generateDataDescriptor(options) {
  return assign({
    configurable: true,
    enumerable: true,
    writable: true
  }, options);
}

function generateAccessorDescriptor(options) {
  return assign({
    configurable: true,
    enumerable: true
  }, options);
}

let isDomMutationAllowed = false;

function unlockDomMutation() {

  isDomMutationAllowed = true;
}

function lockDomMutation() {

  isDomMutationAllowed = false;
}

function logMissingPortalError(name, type) {
  return logError(`The \`${name}\` ${type} is available only on elements that use the \`lwc:dom="manual"\` directive.`);
}

function patchElementWithRestrictions(elm, options) {

  const originalOuterHTMLDescriptor = getPropertyDescriptor(elm, 'outerHTML');
  const descriptors = {
    outerHTML: generateAccessorDescriptor({
      get() {
        return originalOuterHTMLDescriptor.get.call(this);
      },

      set(_value) {
        throw new TypeError(`Invalid attempt to set outerHTML on Element.`);
      }

    })
  }; // Apply extra restriction related to DOM manipulation if the element is not a portal.

  if (!options.isLight && !options.isPortal) {
    const {
      appendChild,
      insertBefore,
      removeChild,
      replaceChild
    } = elm;
    const originalNodeValueDescriptor = getPropertyDescriptor(elm, 'nodeValue');
    const originalInnerHTMLDescriptor = getPropertyDescriptor(elm, 'innerHTML');
    const originalTextContentDescriptor = getPropertyDescriptor(elm, 'textContent');
    assign(descriptors, {
      appendChild: generateDataDescriptor({
        value(aChild) {
          logMissingPortalError('appendChild', 'method');
          return appendChild.call(this, aChild);
        }

      }),
      insertBefore: generateDataDescriptor({
        value(newNode, referenceNode) {
          if (!isDomMutationAllowed) {
            logMissingPortalError('insertBefore', 'method');
          }

          return insertBefore.call(this, newNode, referenceNode);
        }

      }),
      removeChild: generateDataDescriptor({
        value(aChild) {
          if (!isDomMutationAllowed) {
            logMissingPortalError('removeChild', 'method');
          }

          return removeChild.call(this, aChild);
        }

      }),
      replaceChild: generateDataDescriptor({
        value(newChild, oldChild) {
          logMissingPortalError('replaceChild', 'method');
          return replaceChild.call(this, newChild, oldChild);
        }

      }),
      nodeValue: generateAccessorDescriptor({
        get() {
          return originalNodeValueDescriptor.get.call(this);
        },

        set(value) {
          if (!isDomMutationAllowed) {
            logMissingPortalError('nodeValue', 'property');
          }

          originalNodeValueDescriptor.set.call(this, value);
        }

      }),
      textContent: generateAccessorDescriptor({
        get() {
          return originalTextContentDescriptor.get.call(this);
        },

        set(value) {
          logMissingPortalError('textContent', 'property');
          originalTextContentDescriptor.set.call(this, value);
        }

      }),
      innerHTML: generateAccessorDescriptor({
        get() {
          return originalInnerHTMLDescriptor.get.call(this);
        },

        set(value) {
          logMissingPortalError('innerHTML', 'property');
          return originalInnerHTMLDescriptor.set.call(this, value);
        }

      })
    });
  }

  defineProperties(elm, descriptors);
}

function getShadowRootRestrictionsDescriptors(sr) {
  // thing when using the real shadow root, because if that's the case,
  // the component will not work when running with synthetic shadow.


  const originalAddEventListener = sr.addEventListener;
  const originalInnerHTMLDescriptor = getPropertyDescriptor(sr, 'innerHTML');
  const originalTextContentDescriptor = getPropertyDescriptor(sr, 'textContent');
  return {
    innerHTML: generateAccessorDescriptor({
      get() {
        return originalInnerHTMLDescriptor.get.call(this);
      },

      set(_value) {
        throw new TypeError(`Invalid attempt to set innerHTML on ShadowRoot.`);
      }

    }),
    textContent: generateAccessorDescriptor({
      get() {
        return originalTextContentDescriptor.get.call(this);
      },

      set(_value) {
        throw new TypeError(`Invalid attempt to set textContent on ShadowRoot.`);
      }

    }),
    addEventListener: generateDataDescriptor({
      value(type, listener, options) {
        // TODO [#420]: this is triggered when the component author attempts to add a listener
        // programmatically into its Component's shadow root
        if (!isUndefined$1(options)) {
          logError('The `addEventListener` method on ShadowRoot does not support any options.', getAssociatedVMIfPresent(this));
        } // Typescript does not like it when you treat the `arguments` object as an array
        // @ts-ignore type-mismatch


        return originalAddEventListener.apply(this, arguments);
      }

    })
  };
} // Custom Elements Restrictions:
// -----------------------------


function getCustomElementRestrictionsDescriptors(elm) {

  const originalAddEventListener = elm.addEventListener;
  const originalInnerHTMLDescriptor = getPropertyDescriptor(elm, 'innerHTML');
  const originalOuterHTMLDescriptor = getPropertyDescriptor(elm, 'outerHTML');
  const originalTextContentDescriptor = getPropertyDescriptor(elm, 'textContent');
  return {
    innerHTML: generateAccessorDescriptor({
      get() {
        return originalInnerHTMLDescriptor.get.call(this);
      },

      set(_value) {
        throw new TypeError(`Invalid attempt to set innerHTML on HTMLElement.`);
      }

    }),
    outerHTML: generateAccessorDescriptor({
      get() {
        return originalOuterHTMLDescriptor.get.call(this);
      },

      set(_value) {
        throw new TypeError(`Invalid attempt to set outerHTML on HTMLElement.`);
      }

    }),
    textContent: generateAccessorDescriptor({
      get() {
        return originalTextContentDescriptor.get.call(this);
      },

      set(_value) {
        throw new TypeError(`Invalid attempt to set textContent on HTMLElement.`);
      }

    }),
    addEventListener: generateDataDescriptor({
      value(type, listener, options) {
        // TODO [#420]: this is triggered when the component author attempts to add a listener
        // programmatically into a lighting element node
        if (!isUndefined$1(options)) {
          logError('The `addEventListener` method in `LightningElement` does not support any options.', getAssociatedVMIfPresent(this));
        } // Typescript does not like it when you treat the `arguments` object as an array
        // @ts-ignore type-mismatch


        return originalAddEventListener.apply(this, arguments);
      }

    })
  };
}

function getComponentRestrictionsDescriptors() {

  return {
    tagName: generateAccessorDescriptor({
      get() {
        throw new Error(`Usage of property \`tagName\` is disallowed because the component itself does` + ` not know which tagName will be used to create the element, therefore writing` + ` code that check for that value is error prone.`);
      },

      configurable: true,
      enumerable: false // no enumerable properties on component

    })
  };
}

function getLightningElementPrototypeRestrictionsDescriptors(proto) {

  const originalDispatchEvent = proto.dispatchEvent;
  const descriptors = {
    dispatchEvent: generateDataDescriptor({
      value(event) {
        const vm = getAssociatedVM(this);

        if (!isNull(event) && isObject(event)) {
          const {
            type
          } = event;

          if (!/^[a-z][a-z0-9_]*$/.test(type)) {
            logError(`Invalid event type "${type}" dispatched in element ${getComponentTag(vm)}.` + ` Event name must start with a lowercase letter and followed only lowercase` + ` letters, numbers, and underscores`, vm);
          }
        } // Typescript does not like it when you treat the `arguments` object as an array
        // @ts-ignore type-mismatch


        return originalDispatchEvent.apply(this, arguments);
      }

    })
  };
  forEach.call(getOwnPropertyNames$1(globalHTMLProperties), propName => {
    if (propName in proto) {
      return; // no need to redefine something that we are already exposing
    }

    descriptors[propName] = generateAccessorDescriptor({
      get() {
        const {
          error,
          attribute
        } = globalHTMLProperties[propName];
        const msg = [];
        msg.push(`Accessing the global HTML property "${propName}" is disabled.`);

        if (error) {
          msg.push(error);
        } else if (attribute) {
          msg.push(`Instead access it via \`this.getAttribute("${attribute}")\`.`);
        }

        logError(msg.join('\n'), getAssociatedVM(this));
      },

      set() {
        const {
          readOnly
        } = globalHTMLProperties[propName];

        if (readOnly) {
          logError(`The global HTML property \`${propName}\` is read-only.`, getAssociatedVM(this));
        }
      }

    });
  });
  return descriptors;
} // This routine will prevent access to certain properties on a shadow root instance to guarantee
// that all components will work fine in IE11 and other browsers without shadow dom support.


function patchShadowRootWithRestrictions(sr) {
  defineProperties(sr, getShadowRootRestrictionsDescriptors(sr));
}

function patchCustomElementWithRestrictions(elm) {
  const restrictionsDescriptors = getCustomElementRestrictionsDescriptors(elm);
  const elmProto = getPrototypeOf$1(elm);
  setPrototypeOf(elm, create(elmProto, restrictionsDescriptors));
}

function patchComponentWithRestrictions(cmp) {
  defineProperties(cmp, getComponentRestrictionsDescriptors());
}

function patchLightningElementPrototypeWithRestrictions(proto) {
  defineProperties(proto, getLightningElementPrototypeRestrictionsDescriptors(proto));
}
/*
 * Copyright (c) 2020, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */
// This is a temporary workaround to get the @lwc/engine-server to evaluate in node without having
// to inject at runtime.


const HTMLElementConstructor$1 = typeof HTMLElement !== 'undefined' ? HTMLElement : function () {};
const HTMLElementPrototype = HTMLElementConstructor$1.prototype;
/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */

/**
 * This is a descriptor map that contains
 * all standard properties that a Custom Element can support (including AOM properties), which
 * determines what kind of capabilities the Base HTML Element and
 * Base Lightning Element should support.
 */

const HTMLElementOriginalDescriptors = create(null);
forEach.call(keys(AriaPropNameToAttrNameMap), propName => {
  // Note: intentionally using our in-house getPropertyDescriptor instead of getOwnPropertyDescriptor here because
  // in IE11, some properties are on Element.prototype instead of HTMLElement, just to be sure.
  const descriptor = getPropertyDescriptor(HTMLElementPrototype, propName);

  if (!isUndefined$1(descriptor)) {
    HTMLElementOriginalDescriptors[propName] = descriptor;
  }
});
forEach.call(defaultDefHTMLPropertyNames, propName => {
  // Note: intentionally using our in-house getPropertyDescriptor instead of getOwnPropertyDescriptor here because
  // in IE11, id property is on Element.prototype instead of HTMLElement, and we suspect that more will fall into
  // this category, so, better to be sure.
  const descriptor = getPropertyDescriptor(HTMLElementPrototype, propName);

  if (!isUndefined$1(descriptor)) {
    HTMLElementOriginalDescriptors[propName] = descriptor;
  }
});
/**
 * Copyright (C) 2017 salesforce.com, inc.
 */

const {
  isArray
} = Array;
const {
  prototype: ObjectDotPrototype,
  getPrototypeOf,
  create: ObjectCreate,
  defineProperty: ObjectDefineProperty,
  isExtensible,
  getOwnPropertyDescriptor,
  getOwnPropertyNames,
  getOwnPropertySymbols,
  preventExtensions,
  hasOwnProperty
} = Object;
const {
  push: ArrayPush,
  concat: ArrayConcat
} = Array.prototype;
const OtS = {}.toString;

function toString(obj) {
  if (obj && obj.toString) {
    return obj.toString();
  } else if (typeof obj === 'object') {
    return OtS.call(obj);
  } else {
    return obj + '';
  }
}

function isUndefined(obj) {
  return obj === undefined;
}

function isFunction(obj) {
  return typeof obj === 'function';
}

const proxyToValueMap = new WeakMap();

function registerProxy(proxy, value) {
  proxyToValueMap.set(proxy, value);
}

const unwrap$1 = replicaOrAny => proxyToValueMap.get(replicaOrAny) || replicaOrAny;

class BaseProxyHandler {
  constructor(membrane, value) {
    this.originalTarget = value;
    this.membrane = membrane;
  } // Shared utility methods


  wrapDescriptor(descriptor) {
    if (hasOwnProperty.call(descriptor, 'value')) {
      descriptor.value = this.wrapValue(descriptor.value);
    } else {
      const {
        set: originalSet,
        get: originalGet
      } = descriptor;

      if (!isUndefined(originalGet)) {
        descriptor.get = this.wrapGetter(originalGet);
      }

      if (!isUndefined(originalSet)) {
        descriptor.set = this.wrapSetter(originalSet);
      }
    }

    return descriptor;
  }

  copyDescriptorIntoShadowTarget(shadowTarget, key) {
    const {
      originalTarget
    } = this; // Note: a property might get defined multiple times in the shadowTarget
    //       but it will always be compatible with the previous descriptor
    //       to preserve the object invariants, which makes these lines safe.

    const originalDescriptor = getOwnPropertyDescriptor(originalTarget, key); // TODO: it should be impossible for the originalDescriptor to ever be undefined, this `if` can be removed

    /* istanbul ignore else */

    if (!isUndefined(originalDescriptor)) {
      const wrappedDesc = this.wrapDescriptor(originalDescriptor);
      ObjectDefineProperty(shadowTarget, key, wrappedDesc);
    }
  }

  lockShadowTarget(shadowTarget) {
    const {
      originalTarget
    } = this;
    const targetKeys = ArrayConcat.call(getOwnPropertyNames(originalTarget), getOwnPropertySymbols(originalTarget));
    targetKeys.forEach(key => {
      this.copyDescriptorIntoShadowTarget(shadowTarget, key);
    });
    const {
      membrane: {
        tagPropertyKey
      }
    } = this;

    if (!isUndefined(tagPropertyKey) && !hasOwnProperty.call(shadowTarget, tagPropertyKey)) {
      ObjectDefineProperty(shadowTarget, tagPropertyKey, ObjectCreate(null));
    }

    preventExtensions(shadowTarget);
  } // Shared Traps
  // TODO: apply() is never called

  /* istanbul ignore next */


  apply(shadowTarget, thisArg, argArray) {
    /* No op */
  } // TODO: construct() is never called

  /* istanbul ignore next */


  construct(shadowTarget, argArray, newTarget) {
    /* No op */
  }

  get(shadowTarget, key) {
    const {
      originalTarget,
      membrane: {
        valueObserved
      }
    } = this;
    const value = originalTarget[key];
    valueObserved(originalTarget, key);
    return this.wrapValue(value);
  }

  has(shadowTarget, key) {
    const {
      originalTarget,
      membrane: {
        tagPropertyKey,
        valueObserved
      }
    } = this;
    valueObserved(originalTarget, key); // since key is never going to be undefined, and tagPropertyKey might be undefined
    // we can simply compare them as the second part of the condition.

    return key in originalTarget || key === tagPropertyKey;
  }

  ownKeys(shadowTarget) {
    const {
      originalTarget,
      membrane: {
        tagPropertyKey
      }
    } = this; // if the membrane tag key exists and it is not in the original target, we add it to the keys.

    const keys = isUndefined(tagPropertyKey) || hasOwnProperty.call(originalTarget, tagPropertyKey) ? [] : [tagPropertyKey]; // small perf optimization using push instead of concat to avoid creating an extra array

    ArrayPush.apply(keys, getOwnPropertyNames(originalTarget));
    ArrayPush.apply(keys, getOwnPropertySymbols(originalTarget));
    return keys;
  }

  isExtensible(shadowTarget) {
    const {
      originalTarget
    } = this; // optimization to avoid attempting to lock down the shadowTarget multiple times

    if (!isExtensible(shadowTarget)) {
      return false; // was already locked down
    }

    if (!isExtensible(originalTarget)) {
      this.lockShadowTarget(shadowTarget);
      return false;
    }

    return true;
  }

  getPrototypeOf(shadowTarget) {
    const {
      originalTarget
    } = this;
    return getPrototypeOf(originalTarget);
  }

  getOwnPropertyDescriptor(shadowTarget, key) {
    const {
      originalTarget,
      membrane: {
        valueObserved,
        tagPropertyKey
      }
    } = this; // keys looked up via getOwnPropertyDescriptor need to be reactive

    valueObserved(originalTarget, key);
    let desc = getOwnPropertyDescriptor(originalTarget, key);

    if (isUndefined(desc)) {
      if (key !== tagPropertyKey) {
        return undefined;
      } // if the key is the membrane tag key, and is not in the original target,
      // we produce a synthetic descriptor and install it on the shadow target


      desc = {
        value: undefined,
        writable: false,
        configurable: false,
        enumerable: false
      };
      ObjectDefineProperty(shadowTarget, tagPropertyKey, desc);
      return desc;
    }

    if (desc.configurable === false) {
      // updating the descriptor to non-configurable on the shadow
      this.copyDescriptorIntoShadowTarget(shadowTarget, key);
    } // Note: by accessing the descriptor, the key is marked as observed
    // but access to the value, setter or getter (if available) cannot observe
    // mutations, just like regular methods, in which case we just do nothing.


    return this.wrapDescriptor(desc);
  }

}

const getterMap$1 = new WeakMap();
const setterMap$1 = new WeakMap();
const reverseGetterMap = new WeakMap();
const reverseSetterMap = new WeakMap();

class ReactiveProxyHandler extends BaseProxyHandler {
  wrapValue(value) {
    return this.membrane.getProxy(value);
  }

  wrapGetter(originalGet) {
    const wrappedGetter = getterMap$1.get(originalGet);

    if (!isUndefined(wrappedGetter)) {
      return wrappedGetter;
    }

    const handler = this;

    const get = function () {
      // invoking the original getter with the original target
      return handler.wrapValue(originalGet.call(unwrap$1(this)));
    };

    getterMap$1.set(originalGet, get);
    reverseGetterMap.set(get, originalGet);
    return get;
  }

  wrapSetter(originalSet) {
    const wrappedSetter = setterMap$1.get(originalSet);

    if (!isUndefined(wrappedSetter)) {
      return wrappedSetter;
    }

    const set = function (v) {
      // invoking the original setter with the original target
      originalSet.call(unwrap$1(this), unwrap$1(v));
    };

    setterMap$1.set(originalSet, set);
    reverseSetterMap.set(set, originalSet);
    return set;
  }

  unwrapDescriptor(descriptor) {
    if (hasOwnProperty.call(descriptor, 'value')) {
      // dealing with a data descriptor
      descriptor.value = unwrap$1(descriptor.value);
    } else {
      const {
        set,
        get
      } = descriptor;

      if (!isUndefined(get)) {
        descriptor.get = this.unwrapGetter(get);
      }

      if (!isUndefined(set)) {
        descriptor.set = this.unwrapSetter(set);
      }
    }

    return descriptor;
  }

  unwrapGetter(redGet) {
    const reverseGetter = reverseGetterMap.get(redGet);

    if (!isUndefined(reverseGetter)) {
      return reverseGetter;
    }

    const handler = this;

    const get = function () {
      // invoking the red getter with the proxy of this
      return unwrap$1(redGet.call(handler.wrapValue(this)));
    };

    getterMap$1.set(get, redGet);
    reverseGetterMap.set(redGet, get);
    return get;
  }

  unwrapSetter(redSet) {
    const reverseSetter = reverseSetterMap.get(redSet);

    if (!isUndefined(reverseSetter)) {
      return reverseSetter;
    }

    const handler = this;

    const set = function (v) {
      // invoking the red setter with the proxy of this
      redSet.call(handler.wrapValue(this), handler.wrapValue(v));
    };

    setterMap$1.set(set, redSet);
    reverseSetterMap.set(redSet, set);
    return set;
  }

  set(shadowTarget, key, value) {
    const {
      originalTarget,
      membrane: {
        valueMutated
      }
    } = this;
    const oldValue = originalTarget[key];

    if (oldValue !== value) {
      originalTarget[key] = value;
      valueMutated(originalTarget, key);
    } else if (key === 'length' && isArray(originalTarget)) {
      // fix for issue #236: push will add the new index, and by the time length
      // is updated, the internal length is already equal to the new length value
      // therefore, the oldValue is equal to the value. This is the forking logic
      // to support this use case.
      valueMutated(originalTarget, key);
    }

    return true;
  }

  deleteProperty(shadowTarget, key) {
    const {
      originalTarget,
      membrane: {
        valueMutated
      }
    } = this;
    delete originalTarget[key];
    valueMutated(originalTarget, key);
    return true;
  }

  setPrototypeOf(shadowTarget, prototype) {
    /* istanbul ignore else */
    {
      throw new Error(`Invalid setPrototypeOf invocation for reactive proxy ${toString(this.originalTarget)}. Prototype of reactive objects cannot be changed.`);
    }
  }

  preventExtensions(shadowTarget) {
    if (isExtensible(shadowTarget)) {
      const {
        originalTarget
      } = this;
      preventExtensions(originalTarget); // if the originalTarget is a proxy itself, it might reject
      // the preventExtension call, in which case we should not attempt to lock down
      // the shadow target.
      // TODO: It should not actually be possible to reach this `if` statement.
      // If a proxy rejects extensions, then calling preventExtensions will throw an error:
      // https://codepen.io/nolanlawson-the-selector/pen/QWMOjbY

      /* istanbul ignore if */

      if (isExtensible(originalTarget)) {
        return false;
      }

      this.lockShadowTarget(shadowTarget);
    }

    return true;
  }

  defineProperty(shadowTarget, key, descriptor) {
    const {
      originalTarget,
      membrane: {
        valueMutated,
        tagPropertyKey
      }
    } = this;

    if (key === tagPropertyKey && !hasOwnProperty.call(originalTarget, key)) {
      // To avoid leaking the membrane tag property into the original target, we must
      // be sure that the original target doesn't have yet.
      // NOTE: we do not return false here because Object.freeze and equivalent operations
      // will attempt to set the descriptor to the same value, and expect no to throw. This
      // is an small compromise for the sake of not having to diff the descriptors.
      return true;
    }

    ObjectDefineProperty(originalTarget, key, this.unwrapDescriptor(descriptor)); // intentionally testing if false since it could be undefined as well

    if (descriptor.configurable === false) {
      this.copyDescriptorIntoShadowTarget(shadowTarget, key);
    }

    valueMutated(originalTarget, key);
    return true;
  }

}

const getterMap = new WeakMap();
const setterMap = new WeakMap();

class ReadOnlyHandler extends BaseProxyHandler {
  wrapValue(value) {
    return this.membrane.getReadOnlyProxy(value);
  }

  wrapGetter(originalGet) {
    const wrappedGetter = getterMap.get(originalGet);

    if (!isUndefined(wrappedGetter)) {
      return wrappedGetter;
    }

    const handler = this;

    const get = function () {
      // invoking the original getter with the original target
      return handler.wrapValue(originalGet.call(unwrap$1(this)));
    };

    getterMap.set(originalGet, get);
    return get;
  }

  wrapSetter(originalSet) {
    const wrappedSetter = setterMap.get(originalSet);

    if (!isUndefined(wrappedSetter)) {
      return wrappedSetter;
    }

    const handler = this;

    const set = function (v) {
      /* istanbul ignore else */
      {
        const {
          originalTarget
        } = handler;
        throw new Error(`Invalid mutation: Cannot invoke a setter on "${originalTarget}". "${originalTarget}" is read-only.`);
      }
    };

    setterMap.set(originalSet, set);
    return set;
  }

  set(shadowTarget, key, value) {
    /* istanbul ignore else */
    {
      const {
        originalTarget
      } = this;
      const msg = isArray(originalTarget) ? `Invalid mutation: Cannot mutate array at index ${key.toString()}. Array is read-only.` : `Invalid mutation: Cannot set "${key.toString()}" on "${originalTarget}". "${originalTarget}" is read-only.`;
      throw new Error(msg);
    }
  }

  deleteProperty(shadowTarget, key) {
    /* istanbul ignore else */
    {
      const {
        originalTarget
      } = this;
      throw new Error(`Invalid mutation: Cannot delete "${key.toString()}" on "${originalTarget}". "${originalTarget}" is read-only.`);
    }
  }

  setPrototypeOf(shadowTarget, prototype) {
    /* istanbul ignore else */
    {
      const {
        originalTarget
      } = this;
      throw new Error(`Invalid prototype mutation: Cannot set prototype on "${originalTarget}". "${originalTarget}" prototype is read-only.`);
    }
  }

  preventExtensions(shadowTarget) {
    /* istanbul ignore else */
    {
      const {
        originalTarget
      } = this;
      throw new Error(`Invalid mutation: Cannot preventExtensions on ${originalTarget}". "${originalTarget} is read-only.`);
    }
  }

  defineProperty(shadowTarget, key, descriptor) {
    /* istanbul ignore else */
    {
      const {
        originalTarget
      } = this;
      throw new Error(`Invalid mutation: Cannot defineProperty "${key.toString()}" on "${originalTarget}". "${originalTarget}" is read-only.`);
    }
  }

}

function extract(objectOrArray) {
  if (isArray(objectOrArray)) {
    return objectOrArray.map(item => {
      const original = unwrap$1(item);

      if (original !== item) {
        return extract(original);
      }

      return item;
    });
  }

  const obj = ObjectCreate(getPrototypeOf(objectOrArray));
  const names = getOwnPropertyNames(objectOrArray);
  return ArrayConcat.call(names, getOwnPropertySymbols(objectOrArray)).reduce((seed, key) => {
    const item = objectOrArray[key];
    const original = unwrap$1(item);

    if (original !== item) {
      seed[key] = extract(original);
    } else {
      seed[key] = item;
    }

    return seed;
  }, obj);
}

const formatter = {
  header: plainOrProxy => {
    const originalTarget = unwrap$1(plainOrProxy); // if originalTarget is falsy or not unwrappable, exit

    if (!originalTarget || originalTarget === plainOrProxy) {
      return null;
    }

    const obj = extract(plainOrProxy);
    return ['object', {
      object: obj
    }];
  },
  hasBody: () => {
    return false;
  },
  body: () => {
    return null;
  }
}; // Inspired from paulmillr/es6-shim
// https://github.com/paulmillr/es6-shim/blob/master/es6-shim.js#L176-L185

/* istanbul ignore next */

function getGlobal() {
  // the only reliable means to get the global object is `Function('return this')()`
  // However, this causes CSP violations in Chrome apps.
  if (typeof globalThis !== 'undefined') {
    return globalThis;
  }

  if (typeof self !== 'undefined') {
    return self;
  }

  if (typeof window !== 'undefined') {
    return window;
  }

  if (typeof global !== 'undefined') {
    return global;
  } // Gracefully degrade if not able to locate the global object


  return {};
}

function init() {

  const global = getGlobal(); // Custom Formatter for Dev Tools. To enable this, open Chrome Dev Tools
  //  - Go to Settings,
  //  - Under console, select "Enable custom formatters"
  // For more information, https://docs.google.com/document/d/1FTascZXT9cxfetuPRT2eXPQKXui4nWFivUnS_335T3U/preview

  const devtoolsFormatters = global.devtoolsFormatters || [];
  ArrayPush.call(devtoolsFormatters, formatter);
  global.devtoolsFormatters = devtoolsFormatters;
}
/* istanbul ignore else */


{
  init();
}

function defaultValueIsObservable(value) {
  // intentionally checking for null
  if (value === null) {
    return false;
  } // treat all non-object types, including undefined, as non-observable values


  if (typeof value !== 'object') {
    return false;
  }

  if (isArray(value)) {
    return true;
  }

  const proto = getPrototypeOf(value);
  return proto === ObjectDotPrototype || proto === null || getPrototypeOf(proto) === null;
}

const defaultValueObserved = (obj, key) => {
  /* do nothing */
};

const defaultValueMutated = (obj, key) => {
  /* do nothing */
};

function createShadowTarget(value) {
  return isArray(value) ? [] : {};
}

class ObservableMembrane {
  constructor(options = {}) {
    this.readOnlyObjectGraph = new WeakMap();
    this.reactiveObjectGraph = new WeakMap();
    const {
      valueMutated,
      valueObserved,
      valueIsObservable,
      tagPropertyKey
    } = options;
    this.valueMutated = isFunction(valueMutated) ? valueMutated : defaultValueMutated;
    this.valueObserved = isFunction(valueObserved) ? valueObserved : defaultValueObserved;
    this.valueIsObservable = isFunction(valueIsObservable) ? valueIsObservable : defaultValueIsObservable;
    this.tagPropertyKey = tagPropertyKey;
  }

  getProxy(value) {
    const unwrappedValue = unwrap$1(value);

    if (this.valueIsObservable(unwrappedValue)) {
      // When trying to extract the writable version of a readonly we return the readonly.
      if (this.readOnlyObjectGraph.get(unwrappedValue) === value) {
        return value;
      }

      return this.getReactiveHandler(unwrappedValue);
    }

    return unwrappedValue;
  }

  getReadOnlyProxy(value) {
    value = unwrap$1(value);

    if (this.valueIsObservable(value)) {
      return this.getReadOnlyHandler(value);
    }

    return value;
  }

  unwrapProxy(p) {
    return unwrap$1(p);
  }

  getReactiveHandler(value) {
    let proxy = this.reactiveObjectGraph.get(value);

    if (isUndefined(proxy)) {
      // caching the proxy after the first time it is accessed
      const handler = new ReactiveProxyHandler(this, value);
      proxy = new Proxy(createShadowTarget(value), handler);
      registerProxy(proxy, value);
      this.reactiveObjectGraph.set(value, proxy);
    }

    return proxy;
  }

  getReadOnlyHandler(value) {
    let proxy = this.readOnlyObjectGraph.get(value);

    if (isUndefined(proxy)) {
      // caching the proxy after the first time it is accessed
      const handler = new ReadOnlyHandler(this, value);
      proxy = new Proxy(createShadowTarget(value), handler);
      registerProxy(proxy, value);
      this.readOnlyObjectGraph.set(value, proxy);
    }

    return proxy;
  }

}
/** version: 2.0.0 */

/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */


const lockerLivePropertyKey = Symbol.for('@@lockerLiveValue');
const reactiveMembrane = new ObservableMembrane({
  valueObserved,
  valueMutated,
  tagPropertyKey: lockerLivePropertyKey
});
/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */

/**
 * This operation is called with a descriptor of an standard html property
 * that a Custom Element can support (including AOM properties), which
 * determines what kind of capabilities the Base Lightning Element should support. When producing the new descriptors
 * for the Base Lightning Element, it also include the reactivity bit, so the standard property is reactive.
 */


function createBridgeToElementDescriptor(propName, descriptor) {
  const {
    get,
    set,
    enumerable,
    configurable
  } = descriptor;

  if (!isFunction$1(get)) {
    {
      assert.fail(`Detected invalid public property descriptor for HTMLElement.prototype.${propName} definition. Missing the standard getter.`);
    }

    throw new TypeError();
  }

  if (!isFunction$1(set)) {
    {
      assert.fail(`Detected invalid public property descriptor for HTMLElement.prototype.${propName} definition. Missing the standard setter.`);
    }

    throw new TypeError();
  }

  return {
    enumerable,
    configurable,

    get() {
      const vm = getAssociatedVM(this);

      if (isBeingConstructed(vm)) {
        {
          logError(`The value of property \`${propName}\` can't be read from the constructor because the owner component hasn't set the value yet. Instead, use the constructor to set a default value for the property.`, vm);
        }

        return;
      }

      componentValueObserved(vm, propName);
      return get.call(vm.elm);
    },

    set(newValue) {
      const vm = getAssociatedVM(this);

      {
        const vmBeingRendered = getVMBeingRendered();
        assert.invariant(!isInvokingRender, `${vmBeingRendered}.render() method has side effects on the state of ${vm}.${propName}`);
        assert.invariant(!isUpdatingTemplate, `When updating the template of ${vmBeingRendered}, one of the accessors used by the template has side effects on the state of ${vm}.${propName}`);
        assert.isFalse(isBeingConstructed(vm), `Failed to construct '${getComponentTag(vm)}': The result must not have attributes.`);
        assert.invariant(!isObject(newValue) || isNull(newValue), `Invalid value "${newValue}" for "${propName}" of ${vm}. Value cannot be an object, must be a primitive value.`);
      }

      if (newValue !== vm.cmpProps[propName]) {
        vm.cmpProps[propName] = newValue;
        componentValueMutated(vm, propName);
      }

      return set.call(vm.elm, newValue);
    }

  };
}
/**
 * This class is the base class for any LWC element.
 * Some elements directly extends this class, others implement it via inheritance.
 **/
// @ts-ignore


const LightningElement = function () {
  var _a; // This should be as performant as possible, while any initialization should be done lazily


  if (isNull(vmBeingConstructed)) {
    throw new ReferenceError('Illegal constructor');
  }

  const vm = vmBeingConstructed;
  const {
    def,
    elm,
    renderer
  } = vm;
  const {
    bridge
  } = def;

  {
    (_a = renderer.assertInstanceOfHTMLElement) === null || _a === void 0 ? void 0 : _a.call(renderer, vm.elm, `Component creation requires a DOM element to be associated to ${vm}.`);
  }

  const component = this;
  setPrototypeOf(elm, bridge.prototype);
  vm.component = this; // Locker hooks assignment. When the LWC engine run with Locker, Locker intercepts all the new
  // component creation and passes hooks to instrument all the component interactions with the
  // engine. We are intentionally hiding this argument from the formal API of LightningElement
  // because we don't want folks to know about it just yet.

  if (arguments.length === 1) {
    const {
      callHook,
      setHook,
      getHook
    } = arguments[0];
    vm.callHook = callHook;
    vm.setHook = setHook;
    vm.getHook = getHook;
  } // Making the component instance a live value when using Locker to support expandos.


  this[lockerLivePropertyKey] = undefined; // Linking elm, shadow root and component with the VM.

  associateVM(component, vm);
  associateVM(elm, vm);

  if (vm.renderMode === 1
  /* Shadow */
  ) {
    attachShadow(vm);
  } // Adding extra guard rails in DEV mode.


  {
    patchCustomElementWithRestrictions(elm);
    patchComponentWithRestrictions(component);
  }

  return this;
};

function attachShadow(vm) {
  const {
    elm,
    mode,
    renderer,
    shadowMode,
    def: {
      ctor
    }
  } = vm;
  const cmpRoot = renderer.attachShadow(elm, {
    [KEY__SYNTHETIC_MODE]: shadowMode === 1
    /* Synthetic */
    ,
    delegatesFocus: Boolean(ctor.delegatesFocus),
    mode
  });
  vm.cmpRoot = cmpRoot;
  associateVM(cmpRoot, vm);

  {
    patchShadowRootWithRestrictions(cmpRoot);
  }
}

function warnIfInvokedDuringConstruction(vm, methodOrPropName) {
  if (isBeingConstructed(vm)) {
    logError(`this.${methodOrPropName} should not be called during the construction of the custom element for ${getComponentTag(vm)} because the element is not yet in the DOM or has no children yet.`);
  }
} // @ts-ignore


LightningElement.prototype = {
  constructor: LightningElement,

  dispatchEvent(event) {
    const {
      elm,
      renderer: {
        dispatchEvent
      }
    } = getAssociatedVM(this);
    return dispatchEvent(elm, event);
  },

  addEventListener(type, listener, options) {
    const vm = getAssociatedVM(this);
    const {
      elm,
      renderer: {
        addEventListener
      }
    } = vm;

    {
      const vmBeingRendered = getVMBeingRendered();
      assert.invariant(!isInvokingRender, `${vmBeingRendered}.render() method has side effects on the state of ${vm} by adding an event listener for "${type}".`);
      assert.invariant(!isUpdatingTemplate, `Updating the template of ${vmBeingRendered} has side effects on the state of ${vm} by adding an event listener for "${type}".`);
      assert.invariant(isFunction$1(listener), `Invalid second argument for this.addEventListener() in ${vm} for event "${type}". Expected an EventListener but received ${listener}.`);
    }

    const wrappedListener = getWrappedComponentsListener(vm, listener);
    addEventListener(elm, type, wrappedListener, options);
  },

  removeEventListener(type, listener, options) {
    const vm = getAssociatedVM(this);
    const {
      elm,
      renderer: {
        removeEventListener
      }
    } = vm;
    const wrappedListener = getWrappedComponentsListener(vm, listener);
    removeEventListener(elm, type, wrappedListener, options);
  },

  hasAttribute(name) {
    const {
      elm,
      renderer: {
        getAttribute
      }
    } = getAssociatedVM(this);
    return !isNull(getAttribute(elm, name));
  },

  hasAttributeNS(namespace, name) {
    const {
      elm,
      renderer: {
        getAttribute
      }
    } = getAssociatedVM(this);
    return !isNull(getAttribute(elm, name, namespace));
  },

  removeAttribute(name) {
    const {
      elm,
      renderer: {
        removeAttribute
      }
    } = getAssociatedVM(this);
    unlockAttribute(elm, name);
    removeAttribute(elm, name);
    lockAttribute();
  },

  removeAttributeNS(namespace, name) {
    const {
      elm,
      renderer: {
        removeAttribute
      }
    } = getAssociatedVM(this);
    unlockAttribute(elm, name);
    removeAttribute(elm, name, namespace);
    lockAttribute();
  },

  getAttribute(name) {
    const {
      elm,
      renderer: {
        getAttribute
      }
    } = getAssociatedVM(this);
    return getAttribute(elm, name);
  },

  getAttributeNS(namespace, name) {
    const {
      elm,
      renderer: {
        getAttribute
      }
    } = getAssociatedVM(this);
    return getAttribute(elm, name, namespace);
  },

  setAttribute(name, value) {
    const vm = getAssociatedVM(this);
    const {
      elm,
      renderer: {
        setAttribute
      }
    } = vm;

    {
      assert.isFalse(isBeingConstructed(vm), `Failed to construct '${getComponentTag(vm)}': The result must not have attributes.`);
    }

    unlockAttribute(elm, name);
    setAttribute(elm, name, value);
    lockAttribute();
  },

  setAttributeNS(namespace, name, value) {
    const vm = getAssociatedVM(this);
    const {
      elm,
      renderer: {
        setAttribute
      }
    } = vm;

    {
      assert.isFalse(isBeingConstructed(vm), `Failed to construct '${getComponentTag(vm)}': The result must not have attributes.`);
    }

    unlockAttribute(elm, name);
    setAttribute(elm, name, value, namespace);
    lockAttribute();
  },

  getBoundingClientRect() {
    const vm = getAssociatedVM(this);
    const {
      elm,
      renderer: {
        getBoundingClientRect
      }
    } = vm;

    {
      warnIfInvokedDuringConstruction(vm, 'getBoundingClientRect()');
    }

    return getBoundingClientRect(elm);
  },

  get isConnected() {
    const {
      elm,
      renderer: {
        isConnected
      }
    } = getAssociatedVM(this);
    return isConnected(elm);
  },

  get classList() {
    const vm = getAssociatedVM(this);
    const {
      elm,
      renderer: {
        getClassList
      }
    } = vm;

    {
      // TODO [#1290]: this still fails in dev but works in production, eventually, we should
      // just throw in all modes
      assert.isFalse(isBeingConstructed(vm), `Failed to construct ${vm}: The result must not have attributes. Adding or tampering with classname in constructor is not allowed in a web component, use connectedCallback() instead.`);
    }

    return getClassList(elm);
  },

  get template() {
    const vm = getAssociatedVM(this);

    {
      if (vm.renderMode === 0
      /* Light */
      ) {
        logError('`this.template` returns null for light DOM components. Since there is no shadow, the rendered content can be accessed via `this` itself. e.g. instead of `this.template.querySelector`, use `this.querySelector`.');
      }
    }

    return vm.cmpRoot;
  },

  get shadowRoot() {
    // From within the component instance, the shadowRoot is always reported as "closed".
    // Authors should rely on this.template instead.
    return null;
  },

  render() {
    const vm = getAssociatedVM(this);
    return vm.def.template;
  },

  toString() {
    const vm = getAssociatedVM(this);
    return `[object ${vm.def.name}]`;
  }

};
const queryAndChildGetterDescriptors = create(null);
const childGetters = [['children', 'getChildren'], ['childNodes', 'getChildNodes'], ['firstChild', 'getFirstChild'], ['firstElementChild', 'getFirstElementChild'], ['lastChild', 'getLastChild'], ['lastElementChild', 'getLastElementChild']]; // Generic passthrough for child getters on HTMLElement to the relevant Renderer APIs

for (const [elementProp, rendererMethod] of childGetters) {
  queryAndChildGetterDescriptors[elementProp] = {
    get() {
      const vm = getAssociatedVM(this);
      const {
        elm,
        renderer
      } = vm;

      {
        warnIfInvokedDuringConstruction(vm, elementProp);
      }

      return renderer[rendererMethod](elm);
    },

    configurable: true,
    enumerable: true
  };
}

const queryMethods = ['getElementsByClassName', 'getElementsByTagName', 'querySelector', 'querySelectorAll']; // Generic passthrough for query APIs on HTMLElement to the relevant Renderer APIs

for (const queryMethod of queryMethods) {
  queryAndChildGetterDescriptors[queryMethod] = {
    value(arg) {
      const vm = getAssociatedVM(this);
      const {
        elm,
        renderer
      } = vm;

      {
        warnIfInvokedDuringConstruction(vm, `${queryMethod}()`);
      }

      return renderer[queryMethod](elm, arg);
    },

    configurable: true,
    enumerable: true,
    writable: true
  };
}

defineProperties(LightningElement.prototype, queryAndChildGetterDescriptors);
const lightningBasedDescriptors = create(null);

for (const propName in HTMLElementOriginalDescriptors) {
  lightningBasedDescriptors[propName] = createBridgeToElementDescriptor(propName, HTMLElementOriginalDescriptors[propName]);
}

defineProperties(LightningElement.prototype, lightningBasedDescriptors);
defineProperty(LightningElement, 'CustomElementConstructor', {
  get() {
    // If required, a runtime-specific implementation must be defined.
    throw new ReferenceError('The current runtime does not support CustomElementConstructor.');
  },

  configurable: true
});

{
  patchLightningElementPrototypeWithRestrictions(LightningElement.prototype);
}

function internalWireFieldDecorator(key) {
  return {
    get() {
      const vm = getAssociatedVM(this);
      componentValueObserved(vm, key);
      return vm.cmpFields[key];
    },

    set(value) {
      const vm = getAssociatedVM(this);
      /**
       * Reactivity for wired fields is provided in wiring.
       * We intentionally add reactivity here since this is just
       * letting the author to do the wrong thing, but it will keep our
       * system to be backward compatible.
       */

      if (value !== vm.cmpFields[key]) {
        vm.cmpFields[key] = value;
        componentValueMutated(vm, key);
      }
    },

    enumerable: true,
    configurable: true
  };
}

function internalTrackDecorator(key) {
  return {
    get() {
      const vm = getAssociatedVM(this);
      componentValueObserved(vm, key);
      return vm.cmpFields[key];
    },

    set(newValue) {
      const vm = getAssociatedVM(this);

      {
        const vmBeingRendered = getVMBeingRendered();
        assert.invariant(!isInvokingRender, `${vmBeingRendered}.render() method has side effects on the state of ${vm}.${toString$1(key)}`);
        assert.invariant(!isUpdatingTemplate, `Updating the template of ${vmBeingRendered} has side effects on the state of ${vm}.${toString$1(key)}`);
      }

      const reactiveOrAnyValue = reactiveMembrane.getProxy(newValue);

      if (reactiveOrAnyValue !== vm.cmpFields[key]) {
        vm.cmpFields[key] = reactiveOrAnyValue;
        componentValueMutated(vm, key);
      }
    },

    enumerable: true,
    configurable: true
  };
}

function createPublicPropertyDescriptor(key) {
  return {
    get() {
      const vm = getAssociatedVM(this);

      if (isBeingConstructed(vm)) {
        {
          logError(`Can’t read the value of property \`${toString$1(key)}\` from the constructor because the owner component hasn’t set the value yet. Instead, use the constructor to set a default value for the property.`, vm);
        }

        return;
      }

      componentValueObserved(vm, key);
      return vm.cmpProps[key];
    },

    set(newValue) {
      const vm = getAssociatedVM(this);

      {
        const vmBeingRendered = getVMBeingRendered();
        assert.invariant(!isInvokingRender, `${vmBeingRendered}.render() method has side effects on the state of ${vm}.${toString$1(key)}`);
        assert.invariant(!isUpdatingTemplate, `Updating the template of ${vmBeingRendered} has side effects on the state of ${vm}.${toString$1(key)}`);
      }

      vm.cmpProps[key] = newValue;
      componentValueMutated(vm, key);
    },

    enumerable: true,
    configurable: true
  };
}

class AccessorReactiveObserver extends ReactiveObserver {
  constructor(vm, set) {
    super(() => {
      if (isFalse(this.debouncing)) {
        this.debouncing = true;
        addCallbackToNextTick(() => {
          if (isTrue(this.debouncing)) {
            const {
              value
            } = this;
            const {
              isDirty: dirtyStateBeforeSetterCall,
              component,
              idx
            } = vm;
            set.call(component, value); // de-bouncing after the call to the original setter to prevent
            // infinity loop if the setter itself is mutating things that
            // were accessed during the previous invocation.

            this.debouncing = false;

            if (isTrue(vm.isDirty) && isFalse(dirtyStateBeforeSetterCall) && idx > 0) {
              // immediate rehydration due to a setter driven mutation, otherwise
              // the component will get rendered on the second tick, which it is not
              // desirable.
              rerenderVM(vm);
            }
          }
        });
      }
    });
    this.debouncing = false;
  }

  reset(value) {
    super.reset();
    this.debouncing = false;

    if (arguments.length > 0) {
      this.value = value;
    }
  }

}

function createPublicAccessorDescriptor(key, descriptor) {
  const {
    get,
    set,
    enumerable,
    configurable
  } = descriptor;

  if (!isFunction$1(get)) {
    {
      assert.invariant(isFunction$1(get), `Invalid compiler output for public accessor ${toString$1(key)} decorated with @api`);
    }

    throw new Error();
  }

  return {
    get() {
      {
        // Assert that the this value is an actual Component with an associated VM.
        getAssociatedVM(this);
      }

      return get.call(this);
    },

    set(newValue) {
      const vm = getAssociatedVM(this);

      {
        const vmBeingRendered = getVMBeingRendered();
        assert.invariant(!isInvokingRender, `${vmBeingRendered}.render() method has side effects on the state of ${vm}.${toString$1(key)}`);
        assert.invariant(!isUpdatingTemplate, `Updating the template of ${vmBeingRendered} has side effects on the state of ${vm}.${toString$1(key)}`);
      }

      if (set) {
        if (runtimeFlags.ENABLE_REACTIVE_SETTER) {
          let ro = vm.oar[key];

          if (isUndefined$1(ro)) {
            ro = vm.oar[key] = new AccessorReactiveObserver(vm, set);
          } // every time we invoke this setter from outside (through this wrapper setter)
          // we should reset the value and then debounce just in case there is a pending
          // invocation the next tick that is not longer relevant since the value is changing
          // from outside.


          ro.reset(newValue);
          ro.observe(() => {
            set.call(this, newValue);
          });
        } else {
          set.call(this, newValue);
        }
      } else {
        assert.fail(`Invalid attempt to set a new value for property ${toString$1(key)} of ${vm} that does not has a setter decorated with @api.`);
      }
    },

    enumerable,
    configurable
  };
}

function createObservedFieldPropertyDescriptor(key) {
  return {
    get() {
      const vm = getAssociatedVM(this);
      componentValueObserved(vm, key);
      return vm.cmpFields[key];
    },

    set(newValue) {
      const vm = getAssociatedVM(this);

      if (newValue !== vm.cmpFields[key]) {
        vm.cmpFields[key] = newValue;
        componentValueMutated(vm, key);
      }
    },

    enumerable: true,
    configurable: true
  };
}
/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */


function getClassDescriptorType(descriptor) {
  if (isFunction$1(descriptor.value)) {
    return "method"
    /* Method */
    ;
  } else if (isFunction$1(descriptor.set) || isFunction$1(descriptor.get)) {
    return "accessor"
    /* Accessor */
    ;
  } else {
    return "field"
    /* Field */
    ;
  }
}

function validateObservedField(Ctor, fieldName, descriptor) {
  if (!isUndefined$1(descriptor)) {
    const type = getClassDescriptorType(descriptor);
    const message = `Invalid observed ${fieldName} field. Found a duplicate ${type} with the same name.`; // [W-9927596] Ideally we always throw an error when detecting duplicate observed field.
    // This branch is only here for backward compatibility reasons.

    if (type === "accessor"
    /* Accessor */
    ) {
      logError(message);
    } else {
      assert.fail(message);
    }
  }
}

function validateFieldDecoratedWithTrack(Ctor, fieldName, descriptor) {
  if (!isUndefined$1(descriptor)) {
    const type = getClassDescriptorType(descriptor);
    assert.fail(`Invalid @track ${fieldName} field. Found a duplicate ${type} with the same name.`);
  }
}

function validateFieldDecoratedWithWire(Ctor, fieldName, descriptor) {
  if (!isUndefined$1(descriptor)) {
    const type = getClassDescriptorType(descriptor);
    assert.fail(`Invalid @wire ${fieldName} field. Found a duplicate ${type} with the same name.`);
  }
}

function validateMethodDecoratedWithWire(Ctor, methodName, descriptor) {
  if (isUndefined$1(descriptor) || !isFunction$1(descriptor.value) || isFalse(descriptor.writable)) {
    assert.fail(`Invalid @wire ${methodName} method.`);
  }
}

function validateFieldDecoratedWithApi(Ctor, fieldName, descriptor) {
  if (!isUndefined$1(descriptor)) {
    const type = getClassDescriptorType(descriptor);
    const message = `Invalid @api ${fieldName} field. Found a duplicate ${type} with the same name.`; // [W-9927596] Ideally we always throw an error when detecting duplicate public properties.
    // This branch is only here for backward compatibility reasons.

    if (type === "accessor"
    /* Accessor */
    ) {
      logError(message);
    } else {
      assert.fail(message);
    }
  }
}

function validateAccessorDecoratedWithApi(Ctor, fieldName, descriptor) {
  if (isUndefined$1(descriptor)) {
    assert.fail(`Invalid @api get ${fieldName} accessor.`);
  } else if (isFunction$1(descriptor.set)) {
    assert.isTrue(isFunction$1(descriptor.get), `Missing getter for property ${fieldName} decorated with @api in ${Ctor}. You cannot have a setter without the corresponding getter.`);
  } else if (!isFunction$1(descriptor.get)) {
    assert.fail(`Missing @api get ${fieldName} accessor.`);
  }
}

function validateMethodDecoratedWithApi(Ctor, methodName, descriptor) {
  if (isUndefined$1(descriptor) || !isFunction$1(descriptor.value) || isFalse(descriptor.writable)) {
    assert.fail(`Invalid @api ${methodName} method.`);
  }
}
/**
 * INTERNAL: This function can only be invoked by compiled code. The compiler
 * will prevent this function from being imported by user-land code.
 */


function registerDecorators(Ctor, meta) {
  const proto = Ctor.prototype;
  const {
    publicProps,
    publicMethods,
    wire,
    track,
    fields
  } = meta;
  const apiMethods = create(null);
  const apiFields = create(null);
  const wiredMethods = create(null);
  const wiredFields = create(null);
  const observedFields = create(null);
  const apiFieldsConfig = create(null);
  let descriptor;

  if (!isUndefined$1(publicProps)) {
    for (const fieldName in publicProps) {
      const propConfig = publicProps[fieldName];
      apiFieldsConfig[fieldName] = propConfig.config;
      descriptor = getOwnPropertyDescriptor$1(proto, fieldName);

      if (propConfig.config > 0) {
        // accessor declaration
        {
          validateAccessorDecoratedWithApi(Ctor, fieldName, descriptor);
        }

        if (isUndefined$1(descriptor)) {
          throw new Error();
        }

        descriptor = createPublicAccessorDescriptor(fieldName, descriptor);
      } else {
        // field declaration
        {
          validateFieldDecoratedWithApi(Ctor, fieldName, descriptor);
        } // [W-9927596] If a component has both a public property and a private setter/getter
        // with the same name, the property is defined as a public accessor. This branch is
        // only here for backward compatibility reasons.


        if (!isUndefined$1(descriptor) && !isUndefined$1(descriptor.get)) {
          descriptor = createPublicAccessorDescriptor(fieldName, descriptor);
        } else {
          descriptor = createPublicPropertyDescriptor(fieldName);
        }
      }

      apiFields[fieldName] = descriptor;
      defineProperty(proto, fieldName, descriptor);
    }
  }

  if (!isUndefined$1(publicMethods)) {
    forEach.call(publicMethods, methodName => {
      descriptor = getOwnPropertyDescriptor$1(proto, methodName);

      {
        validateMethodDecoratedWithApi(Ctor, methodName, descriptor);
      }

      if (isUndefined$1(descriptor)) {
        throw new Error();
      }

      apiMethods[methodName] = descriptor;
    });
  }

  if (!isUndefined$1(wire)) {
    for (const fieldOrMethodName in wire) {
      const {
        adapter,
        method,
        config: configCallback,
        dynamic = []
      } = wire[fieldOrMethodName];
      descriptor = getOwnPropertyDescriptor$1(proto, fieldOrMethodName);

      if (method === 1) {
        {
          assert.isTrue(adapter, `@wire on method "${fieldOrMethodName}": adapter id must be truthy.`);
          validateMethodDecoratedWithWire(Ctor, fieldOrMethodName, descriptor);
        }

        if (isUndefined$1(descriptor)) {
          throw new Error();
        }

        wiredMethods[fieldOrMethodName] = descriptor;
        storeWiredMethodMeta(descriptor, adapter, configCallback, dynamic);
      } else {
        {
          assert.isTrue(adapter, `@wire on field "${fieldOrMethodName}": adapter id must be truthy.`);
          validateFieldDecoratedWithWire(Ctor, fieldOrMethodName, descriptor);
        }

        descriptor = internalWireFieldDecorator(fieldOrMethodName);
        wiredFields[fieldOrMethodName] = descriptor;
        storeWiredFieldMeta(descriptor, adapter, configCallback, dynamic);
        defineProperty(proto, fieldOrMethodName, descriptor);
      }
    }
  }

  if (!isUndefined$1(track)) {
    for (const fieldName in track) {
      descriptor = getOwnPropertyDescriptor$1(proto, fieldName);

      {
        validateFieldDecoratedWithTrack(Ctor, fieldName, descriptor);
      }

      descriptor = internalTrackDecorator(fieldName);
      defineProperty(proto, fieldName, descriptor);
    }
  }

  if (!isUndefined$1(fields)) {
    for (let i = 0, n = fields.length; i < n; i++) {
      const fieldName = fields[i];
      descriptor = getOwnPropertyDescriptor$1(proto, fieldName);

      {
        validateObservedField(Ctor, fieldName, descriptor);
      } // [W-9927596] Only mark a field as observed whenever it isn't a duplicated public nor
      // tracked property. This is only here for backward compatibility purposes.


      const isDuplicatePublicProp = !isUndefined$1(publicProps) && fieldName in publicProps;
      const isDuplicateTrackedProp = !isUndefined$1(track) && fieldName in track;

      if (!isDuplicatePublicProp && !isDuplicateTrackedProp) {
        observedFields[fieldName] = createObservedFieldPropertyDescriptor(fieldName);
      }
    }
  }

  setDecoratorsMeta(Ctor, {
    apiMethods,
    apiFields,
    apiFieldsConfig,
    wiredMethods,
    wiredFields,
    observedFields
  });
  return Ctor;
}

const signedDecoratorToMetaMap = new Map();

function setDecoratorsMeta(Ctor, meta) {
  signedDecoratorToMetaMap.set(Ctor, meta);
}

const defaultMeta = {
  apiMethods: EmptyObject,
  apiFields: EmptyObject,
  apiFieldsConfig: EmptyObject,
  wiredMethods: EmptyObject,
  wiredFields: EmptyObject,
  observedFields: EmptyObject
};

function getDecoratorsMeta(Ctor) {
  const meta = signedDecoratorToMetaMap.get(Ctor);
  return isUndefined$1(meta) ? defaultMeta : meta;
}

const signedTemplateSet = new Set();

function defaultEmptyTemplate() {
  return [];
}

signedTemplateSet.add(defaultEmptyTemplate);

function isTemplateRegistered(tpl) {
  return signedTemplateSet.has(tpl);
}
/**
 * INTERNAL: This function can only be invoked by compiled code. The compiler
 * will prevent this function from being imported by userland code.
 */


function registerTemplate(tpl) {
  signedTemplateSet.add(tpl); // chaining this method as a way to wrap existing
  // assignment of templates easily, without too much transformation

  return tpl;
}
/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */
// from the element instance, and get the value or set a new value on the component.
// This means that across different elements, similar names can get the exact same
// descriptor, so we can cache them:


const cachedGetterByKey = create(null);
const cachedSetterByKey = create(null);

function createGetter(key) {
  let fn = cachedGetterByKey[key];

  if (isUndefined$1(fn)) {
    fn = cachedGetterByKey[key] = function () {
      const vm = getAssociatedVM(this);
      const {
        getHook
      } = vm;
      return getHook(vm.component, key);
    };
  }

  return fn;
}

function createSetter(key) {
  let fn = cachedSetterByKey[key];

  if (isUndefined$1(fn)) {
    fn = cachedSetterByKey[key] = function (newValue) {
      const vm = getAssociatedVM(this);
      const {
        setHook
      } = vm;
      newValue = reactiveMembrane.getReadOnlyProxy(newValue);
      setHook(vm.component, key, newValue);
    };
  }

  return fn;
}

function createMethodCaller(methodName) {
  return function () {
    const vm = getAssociatedVM(this);
    const {
      callHook,
      component
    } = vm;
    const fn = component[methodName];
    return callHook(vm.component, fn, ArraySlice.call(arguments));
  };
}

function createAttributeChangedCallback(attributeToPropMap, superAttributeChangedCallback) {
  return function attributeChangedCallback(attrName, oldValue, newValue) {
    if (oldValue === newValue) {
      // Ignore same values.
      return;
    }

    const propName = attributeToPropMap[attrName];

    if (isUndefined$1(propName)) {
      if (!isUndefined$1(superAttributeChangedCallback)) {
        // delegate unknown attributes to the super.
        // Typescript does not like it when you treat the `arguments` object as an array
        // @ts-ignore type-mismatch
        superAttributeChangedCallback.apply(this, arguments);
      }

      return;
    }

    if (!isAttributeLocked(this, attrName)) {
      // Ignore changes triggered by the engine itself during:
      // * diffing when public props are attempting to reflect to the DOM
      // * component via `this.setAttribute()`, should never update the prop
      // Both cases, the setAttribute call is always wrapped by the unlocking of the
      // attribute to be changed
      return;
    } // Reflect attribute change to the corresponding property when changed from outside.


    this[propName] = newValue;
  };
}

function HTMLBridgeElementFactory(SuperClass, props, methods) {
  let HTMLBridgeElement;
  /**
   * Modern browsers will have all Native Constructors as regular Classes
   * and must be instantiated with the new keyword. In older browsers,
   * specifically IE11, those are objects with a prototype property defined,
   * since they are not supposed to be extended or instantiated with the
   * new keyword. This forking logic supports both cases, specifically because
   * wc.ts relies on the construction path of the bridges to create new
   * fully qualifying web components.
   */

  if (isFunction$1(SuperClass)) {
    HTMLBridgeElement = class extends SuperClass {};
  } else {
    HTMLBridgeElement = function () {
      // Bridge classes are not supposed to be instantiated directly in
      // browsers that do not support web components.
      throw new TypeError('Illegal constructor');
    }; // prototype inheritance dance


    setPrototypeOf(HTMLBridgeElement, SuperClass);
    setPrototypeOf(HTMLBridgeElement.prototype, SuperClass.prototype);
    defineProperty(HTMLBridgeElement.prototype, 'constructor', {
      writable: true,
      configurable: true,
      value: HTMLBridgeElement
    });
  } // generating the hash table for attributes to avoid duplicate fields and facilitate validation
  // and false positives in case of inheritance.


  const attributeToPropMap = create(null);
  const {
    attributeChangedCallback: superAttributeChangedCallback
  } = SuperClass.prototype;
  const {
    observedAttributes: superObservedAttributes = []
  } = SuperClass;
  const descriptors = create(null); // expose getters and setters for each public props on the new Element Bridge

  for (let i = 0, len = props.length; i < len; i += 1) {
    const propName = props[i];
    attributeToPropMap[htmlPropertyToAttribute(propName)] = propName;
    descriptors[propName] = {
      get: createGetter(propName),
      set: createSetter(propName),
      enumerable: true,
      configurable: true
    };
  } // expose public methods as props on the new Element Bridge


  for (let i = 0, len = methods.length; i < len; i += 1) {
    const methodName = methods[i];
    descriptors[methodName] = {
      value: createMethodCaller(methodName),
      writable: true,
      configurable: true
    };
  } // creating a new attributeChangedCallback per bridge because they are bound to the corresponding
  // map of attributes to props. We do this after all other props and methods to avoid the possibility
  // of getting overrule by a class declaration in user-land, and we make it non-writable, non-configurable
  // to preserve this definition.


  descriptors.attributeChangedCallback = {
    value: createAttributeChangedCallback(attributeToPropMap, superAttributeChangedCallback)
  }; // Specify attributes for which we want to reflect changes back to their corresponding
  // properties via attributeChangedCallback.

  defineProperty(HTMLBridgeElement, 'observedAttributes', {
    get() {
      return [...superObservedAttributes, ...keys(attributeToPropMap)];
    }

  });
  defineProperties(HTMLBridgeElement.prototype, descriptors);
  return HTMLBridgeElement;
}

const BaseBridgeElement = HTMLBridgeElementFactory(HTMLElementConstructor$1, getOwnPropertyNames$1(HTMLElementOriginalDescriptors), []);
freeze(BaseBridgeElement);
seal(BaseBridgeElement.prototype);
/*
 * Copyright (c) 2020, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */

function resolveCircularModuleDependency(fn) {
  const module = fn();
  return (module === null || module === void 0 ? void 0 : module.__esModule) ? module.default : module;
}

function isCircularModuleDependency(obj) {
  return isFunction$1(obj) && hasOwnProperty$1.call(obj, '__circular__');
}
/*
 * Copyright (c) 2020, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */


const swappedTemplateMap = new WeakMap();
const swappedComponentMap = new WeakMap();
const swappedStyleMap = new WeakMap();
const activeTemplates = new WeakMap();
const activeComponents = new WeakMap();
const activeStyles = new WeakMap();

function flattenStylesheets(stylesheets) {
  const list = [];

  for (const stylesheet of stylesheets) {
    if (!Array.isArray(stylesheet)) {
      list.push(stylesheet);
    } else {
      list.push(...flattenStylesheets(stylesheet));
    }
  }

  return list;
}

function getTemplateOrSwappedTemplate(tpl) {

  if (runtimeFlags.ENABLE_HMR) {
    const visited = new Set();

    while (swappedTemplateMap.has(tpl) && !visited.has(tpl)) {
      visited.add(tpl);
      tpl = swappedTemplateMap.get(tpl);
    }
  }

  return tpl;
}

function getComponentOrSwappedComponent(Ctor) {

  if (runtimeFlags.ENABLE_HMR) {
    const visited = new Set();

    while (swappedComponentMap.has(Ctor) && !visited.has(Ctor)) {
      visited.add(Ctor);
      Ctor = swappedComponentMap.get(Ctor);
    }
  }

  return Ctor;
}

function getStyleOrSwappedStyle(style) {

  if (runtimeFlags.ENABLE_HMR) {
    const visited = new Set();

    while (swappedStyleMap.has(style) && !visited.has(style)) {
      visited.add(style);
      style = swappedStyleMap.get(style);
    }
  }

  return style;
}

function setActiveVM(vm) {

  if (runtimeFlags.ENABLE_HMR) {
    // tracking active component
    const Ctor = vm.def.ctor;
    let componentVMs = activeComponents.get(Ctor);

    if (isUndefined$1(componentVMs)) {
      componentVMs = new Set();
      activeComponents.set(Ctor, componentVMs);
    } // this will allow us to keep track of the hot components


    componentVMs.add(vm); // tracking active template

    const tpl = vm.cmpTemplate;

    if (tpl) {
      let templateVMs = activeTemplates.get(tpl);

      if (isUndefined$1(templateVMs)) {
        templateVMs = new Set();
        activeTemplates.set(tpl, templateVMs);
      } // this will allow us to keep track of the templates that are
      // being used by a hot component


      templateVMs.add(vm); // tracking active styles associated to template

      const stylesheets = tpl.stylesheets;

      if (!isUndefined$1(stylesheets)) {
        flattenStylesheets(stylesheets).forEach(stylesheet => {
          // this is necessary because we don't hold the list of styles
          // in the vm, we only hold the selected (already swapped template)
          // but the styles attached to the template might not be the actual
          // active ones, but the swapped versions of those.
          stylesheet = getStyleOrSwappedStyle(stylesheet);
          let stylesheetVMs = activeStyles.get(stylesheet);

          if (isUndefined$1(stylesheetVMs)) {
            stylesheetVMs = new Set();
            activeStyles.set(stylesheet, stylesheetVMs);
          } // this will allow us to keep track of the stylesheet that are
          // being used by a hot component


          stylesheetVMs.add(vm);
        });
      }
    }
  }
}

function removeActiveVM(vm) {

  if (runtimeFlags.ENABLE_HMR) {
    // tracking inactive component
    const Ctor = vm.def.ctor;
    let list = activeComponents.get(Ctor);

    if (!isUndefined$1(list)) {
      // deleting the vm from the set to avoid leaking memory
      list.delete(vm);
    } // removing inactive template


    const tpl = vm.cmpTemplate;

    if (tpl) {
      list = activeTemplates.get(tpl);

      if (!isUndefined$1(list)) {
        // deleting the vm from the set to avoid leaking memory
        list.delete(vm);
      } // removing active styles associated to template


      const styles = tpl.stylesheets;

      if (!isUndefined$1(styles)) {
        flattenStylesheets(styles).forEach(style => {
          list = activeStyles.get(style);

          if (!isUndefined$1(list)) {
            // deleting the vm from the set to avoid leaking memory
            list.delete(vm);
          }
        });
      }
    }
  }
}
/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */


const CtorToDefMap = new WeakMap();

function getCtorProto(Ctor) {
  let proto = getPrototypeOf$1(Ctor);

  if (isNull(proto)) {
    throw new ReferenceError(`Invalid prototype chain for ${Ctor.name}, you must extend LightningElement.`);
  } // covering the cases where the ref is circular in AMD


  if (isCircularModuleDependency(proto)) {
    const p = resolveCircularModuleDependency(proto);

    {
      if (isNull(p)) {
        throw new ReferenceError(`Circular module dependency for ${Ctor.name}, must resolve to a constructor that extends LightningElement.`);
      }
    } // escape hatch for Locker and other abstractions to provide their own base class instead
    // of our Base class without having to leak it to user-land. If the circular function returns
    // itself, that's the signal that we have hit the end of the proto chain, which must always
    // be base.


    proto = p === proto ? LightningElement : p;
  }

  return proto;
}

function createComponentDef(Ctor) {
  const {
    shadowSupportMode: ctorShadowSupportMode,
    renderMode: ctorRenderMode
  } = Ctor;

  {
    const ctorName = Ctor.name; // Removing the following assert until https://bugs.webkit.org/show_bug.cgi?id=190140 is fixed.
    // assert.isTrue(ctorName && isString(ctorName), `${toString(Ctor)} should have a "name" property with string value, but found ${ctorName}.`);

    assert.isTrue(Ctor.constructor, `Missing ${ctorName}.constructor, ${ctorName} should have a "constructor" property.`);

    if (!runtimeFlags.ENABLE_MIXED_SHADOW_MODE) {
      assert.isFalse('shadowSupportMode' in Ctor, `${ctorName || 'Anonymous class'} is an invalid LWC component. The shadowSupportMode static property is not available in this environment.`);
    }

    if (!isUndefined$1(ctorShadowSupportMode)) {
      assert.invariant(ctorShadowSupportMode === "any"
      /* Any */
      || ctorShadowSupportMode === "reset"
      /* Default */
      , `Invalid value for static property shadowSupportMode: '${ctorShadowSupportMode}'`);
    }

    if (!isUndefined$1(ctorRenderMode)) {
      assert.invariant(ctorRenderMode === 'light' || ctorRenderMode === 'shadow', `Invalid value for static property renderMode: '${ctorRenderMode}'. renderMode must be either 'light' or 'shadow'.`);
    }
  }

  const decoratorsMeta = getDecoratorsMeta(Ctor);
  const {
    apiFields,
    apiFieldsConfig,
    apiMethods,
    wiredFields,
    wiredMethods,
    observedFields
  } = decoratorsMeta;
  const proto = Ctor.prototype;
  let {
    connectedCallback,
    disconnectedCallback,
    renderedCallback,
    errorCallback,
    render
  } = proto;
  const superProto = getCtorProto(Ctor);
  const superDef = superProto !== LightningElement ? getComponentInternalDef(superProto) : lightingElementDef;
  const bridge = HTMLBridgeElementFactory(superDef.bridge, keys(apiFields), keys(apiMethods));
  const props = assign(create(null), superDef.props, apiFields);
  const propsConfig = assign(create(null), superDef.propsConfig, apiFieldsConfig);
  const methods = assign(create(null), superDef.methods, apiMethods);
  const wire = assign(create(null), superDef.wire, wiredFields, wiredMethods);
  connectedCallback = connectedCallback || superDef.connectedCallback;
  disconnectedCallback = disconnectedCallback || superDef.disconnectedCallback;
  renderedCallback = renderedCallback || superDef.renderedCallback;
  errorCallback = errorCallback || superDef.errorCallback;
  render = render || superDef.render;
  let shadowSupportMode = superDef.shadowSupportMode;

  if (!isUndefined$1(ctorShadowSupportMode)) {
    shadowSupportMode = ctorShadowSupportMode;
  }

  let renderMode = superDef.renderMode;

  if (!isUndefined$1(ctorRenderMode)) {
    renderMode = ctorRenderMode === 'light' ? 0
    /* Light */
    : 1
    /* Shadow */
    ;
  }

  const template = getComponentRegisteredTemplate(Ctor) || superDef.template;
  const name = Ctor.name || superDef.name; // installing observed fields into the prototype.

  defineProperties(proto, observedFields);
  const def = {
    ctor: Ctor,
    name,
    wire,
    props,
    propsConfig,
    methods,
    bridge,
    template,
    renderMode,
    shadowSupportMode,
    connectedCallback,
    disconnectedCallback,
    renderedCallback,
    errorCallback,
    render
  };

  {
    freeze(Ctor.prototype);
  }

  return def;
}
/**
 * EXPERIMENTAL: This function allows for the identification of LWC constructors. This API is
 * subject to change or being removed.
 */


function isComponentConstructor(ctor) {
  if (!isFunction$1(ctor)) {
    return false;
  } // Fast path: LightningElement is part of the prototype chain of the constructor.


  if (ctor.prototype instanceof LightningElement) {
    return true;
  } // Slow path: LightningElement is not part of the prototype chain of the constructor, we need
  // climb up the constructor prototype chain to check in case there are circular dependencies
  // to resolve.


  let current = ctor;

  do {
    if (isCircularModuleDependency(current)) {
      const circularResolved = resolveCircularModuleDependency(current); // If the circular function returns itself, that's the signal that we have hit the end
      // of the proto chain, which must always be a valid base constructor.

      if (circularResolved === current) {
        return true;
      }

      current = circularResolved;
    }

    if (current === LightningElement) {
      return true;
    }
  } while (!isNull(current) && (current = getPrototypeOf$1(current))); // Finally return false if the LightningElement is not part of the prototype chain.


  return false;
}

function getComponentInternalDef(Ctor) {
  {
    Ctor = getComponentOrSwappedComponent(Ctor);
  }

  let def = CtorToDefMap.get(Ctor);

  if (isUndefined$1(def)) {
    if (isCircularModuleDependency(Ctor)) {
      const resolvedCtor = resolveCircularModuleDependency(Ctor);
      def = getComponentInternalDef(resolvedCtor); // Cache the unresolved component ctor too. The next time if the same unresolved ctor is used,
      // look up the definition in cache instead of re-resolving and recreating the def.

      CtorToDefMap.set(Ctor, def);
      return def;
    }

    if (!isComponentConstructor(Ctor)) {
      throw new TypeError(`${Ctor} is not a valid component, or does not extends LightningElement from "lwc". You probably forgot to add the extend clause on the class declaration.`);
    }

    def = createComponentDef(Ctor);
    CtorToDefMap.set(Ctor, def);
  }

  return def;
}

const lightingElementDef = {
  ctor: LightningElement,
  name: LightningElement.name,
  props: lightningBasedDescriptors,
  propsConfig: EmptyObject,
  methods: EmptyObject,
  renderMode: 1
  /* Shadow */
  ,
  shadowSupportMode: "reset"
  /* Default */
  ,
  wire: EmptyObject,
  bridge: BaseBridgeElement,
  template: defaultEmptyTemplate,
  render: LightningElement.prototype.render
};
/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */


function observeElementChildNodes(elm) {
  elm.$domManual$ = true;
}

function setElementShadowToken(elm, token) {
  elm.$shadowToken$ = token;
} // Set the scope token class for *.scoped.css styles


function setScopeTokenClassIfNecessary(elm, owner) {
  const {
    cmpTemplate,
    context
  } = owner;
  const token = cmpTemplate === null || cmpTemplate === void 0 ? void 0 : cmpTemplate.stylesheetToken;

  if (!isUndefined$1(token) && context.hasScopedStyles) {
    owner.renderer.getClassList(elm).add(token);
  }
}

function updateNodeHook(oldVnode, vnode) {
  const {
    elm,
    text,
    owner: {
      renderer
    }
  } = vnode;

  if (oldVnode.text !== text) {
    {
      unlockDomMutation();
    }

    renderer.setText(elm, text);

    {
      lockDomMutation();
    }
  }
}

function insertNodeHook(vnode, parentNode, referenceNode) {
  const {
    renderer
  } = vnode.owner;

  {
    unlockDomMutation();
  }

  renderer.insert(vnode.elm, parentNode, referenceNode);

  {
    lockDomMutation();
  }
}

function removeNodeHook(vnode, parentNode) {
  const {
    renderer
  } = vnode.owner;

  {
    unlockDomMutation();
  }

  renderer.remove(vnode.elm, parentNode);

  {
    lockDomMutation();
  }
}

function createElmHook(vnode) {
  modEvents.create(vnode); // Attrs need to be applied to element before props
  // IE11 will wipe out value on radio inputs if value
  // is set before type=radio.

  modAttrs.create(vnode);
  modProps.create(vnode);
  modStaticClassName.create(vnode);
  modStaticStyle.create(vnode);
  modComputedClassName.create(vnode);
  modComputedStyle.create(vnode);
}

function hydrateElmHook(vnode) {
  modEvents.create(vnode); // Attrs are already on the element.
  // modAttrs.create(vnode);

  modProps.create(vnode); // Already set.
  // modStaticClassName.create(vnode);
  // modStaticStyle.create(vnode);
  // modComputedClassName.create(vnode);
  // modComputedStyle.create(vnode);
}

function fallbackElmHook(elm, vnode) {
  const {
    owner
  } = vnode;
  setScopeTokenClassIfNecessary(elm, owner);

  if (owner.shadowMode === 1
  /* Synthetic */
  ) {
    const {
      data: {
        context
      }
    } = vnode;
    const {
      stylesheetToken
    } = owner.context;

    if (!isUndefined$1(context) && !isUndefined$1(context.lwc) && context.lwc.dom === "manual"
    /* manual */
    ) {
      // this element will now accept any manual content inserted into it
      observeElementChildNodes(elm);
    } // when running in synthetic shadow mode, we need to set the shadowToken value
    // into each element from the template, so they can be styled accordingly.


    setElementShadowToken(elm, stylesheetToken);
  }

  {
    const {
      data: {
        context
      }
    } = vnode;
    const isPortal = !isUndefined$1(context) && !isUndefined$1(context.lwc) && context.lwc.dom === "manual"
    /* manual */
    ;
    const isLight = owner.renderMode === 0
    /* Light */
    ;
    patchElementWithRestrictions(elm, {
      isPortal,
      isLight
    });
  }
}

function updateElmHook(oldVnode, vnode) {
  // Attrs need to be applied to element before props
  // IE11 will wipe out value on radio inputs if value
  // is set before type=radio.
  modAttrs.update(oldVnode, vnode);
  modProps.update(oldVnode, vnode);
  modComputedClassName.update(oldVnode, vnode);
  modComputedStyle.update(oldVnode, vnode);
}

function updateChildrenHook(oldVnode, vnode) {
  const {
    elm,
    children
  } = vnode;

  if (hasDynamicChildren(children)) {
    updateDynamicChildren(elm, oldVnode.children, children);
  } else {
    updateStaticChildren(elm, oldVnode.children, children);
  }
}

function allocateChildrenHook(vnode, vm) {
  // A component with slots will re-render because:
  // 1- There is a change of the internal state.
  // 2- There is a change on the external api (ex: slots)
  //
  // In case #1, the vnodes in the cmpSlots will be reused since they didn't changed. This routine emptied the
  // slotted children when those VCustomElement were rendered and therefore in subsequent calls to allocate children
  // in a reused VCustomElement, there won't be any slotted children.
  // For those cases, we will use the reference for allocated children stored when rendering the fresh VCustomElement.
  //
  // In case #2, we will always get a fresh VCustomElement.
  const children = vnode.aChildren || vnode.children;
  vm.aChildren = children;
  const {
    renderMode,
    shadowMode
  } = vm;

  if (shadowMode === 1
  /* Synthetic */
  || renderMode === 0
  /* Light */
  ) {
    // slow path
    allocateInSlot(vm, children); // save the allocated children in case this vnode is reused.

    vnode.aChildren = children; // every child vnode is now allocated, and the host should receive none directly, it receives them via the shadow!

    vnode.children = EmptyArray;
  }
}

function createViewModelHook(elm, vnode) {
  if (!isUndefined$1(getAssociatedVMIfPresent(elm))) {
    // There is a possibility that a custom element is registered under tagName,
    // in which case, the initialization is already carry on, and there is nothing else
    // to do here since this hook is called right after invoking `document.createElement`.
    return;
  }

  const {
    sel,
    mode,
    ctor,
    owner
  } = vnode;
  setScopeTokenClassIfNecessary(elm, owner);

  if (owner.shadowMode === 1
  /* Synthetic */
  ) {
    const {
      stylesheetToken
    } = owner.context; // when running in synthetic shadow mode, we need to set the shadowToken value
    // into each element from the template, so they can be styled accordingly.

    setElementShadowToken(elm, stylesheetToken);
  }

  const def = getComponentInternalDef(ctor);
  createVM(elm, def, {
    mode,
    owner,
    tagName: sel,
    renderer: owner.renderer
  });

  {
    assert.isTrue(isArray$1(vnode.children), `Invalid vnode for a custom element, it must have children defined.`);
  }
}

function createCustomElmHook(vnode) {
  modEvents.create(vnode); // Attrs need to be applied to element before props
  // IE11 will wipe out value on radio inputs if value
  // is set before type=radio.

  modAttrs.create(vnode);
  modProps.create(vnode);
  modStaticClassName.create(vnode);
  modStaticStyle.create(vnode);
  modComputedClassName.create(vnode);
  modComputedStyle.create(vnode);
}

function createChildrenHook(vnode) {
  const {
    elm,
    children
  } = vnode;

  for (let j = 0; j < children.length; ++j) {
    const ch = children[j];

    if (ch != null) {
      ch.hook.create(ch);
      ch.hook.insert(ch, elm, null);
    }
  }
}

function isElementNode(node) {
  // eslint-disable-next-line lwc-internal/no-global-node
  return node.nodeType === Node.ELEMENT_NODE;
}

function vnodesAndElementHaveCompatibleAttrs(vnode, elm) {
  const {
    data: {
      attrs = {}
    },
    owner: {
      renderer
    }
  } = vnode;
  let nodesAreCompatible = true; // Validate attributes, though we could always recovery from those by running the update mods.
  // Note: intentionally ONLY matching vnodes.attrs to elm.attrs, in case SSR is adding extra attributes.

  for (const [attrName, attrValue] of Object.entries(attrs)) {
    const elmAttrValue = renderer.getAttribute(elm, attrName);

    if (String(attrValue) !== elmAttrValue) {
      logError(`Mismatch hydrating element <${elm.tagName.toLowerCase()}>: attribute "${attrName}" has different values, expected "${attrValue}" but found "${elmAttrValue}"`, vnode.owner);
      nodesAreCompatible = false;
    }
  }

  return nodesAreCompatible;
}

function vnodesAndElementHaveCompatibleClass(vnode, elm) {
  const {
    data: {
      className,
      classMap
    },
    owner: {
      renderer
    }
  } = vnode;
  let nodesAreCompatible = true;
  let vnodeClassName;

  if (!isUndefined$1(className) && String(className) !== elm.className) {
    // className is used when class is bound to an expr.
    nodesAreCompatible = false;
    vnodeClassName = className;
  } else if (!isUndefined$1(classMap)) {
    // classMap is used when class is set to static value.
    const classList = renderer.getClassList(elm);
    let computedClassName = ''; // all classes from the vnode should be in the element.classList

    for (const name in classMap) {
      computedClassName += ' ' + name;

      if (!classList.contains(name)) {
        nodesAreCompatible = false;
      }
    }

    vnodeClassName = computedClassName.trim();

    if (classList.length > keys(classMap).length) {
      nodesAreCompatible = false;
    }
  }

  if (!nodesAreCompatible) {
    logError(`Mismatch hydrating element <${elm.tagName.toLowerCase()}>: attribute "class" has different values, expected "${vnodeClassName}" but found "${elm.className}"`, vnode.owner);
  }

  return nodesAreCompatible;
}

function vnodesAndElementHaveCompatibleStyle(vnode, elm) {
  const {
    data: {
      style,
      styleDecls
    },
    owner: {
      renderer
    }
  } = vnode;
  const elmStyle = renderer.getAttribute(elm, 'style') || '';
  let vnodeStyle;
  let nodesAreCompatible = true;

  if (!isUndefined$1(style) && style !== elmStyle) {
    nodesAreCompatible = false;
    vnodeStyle = style;
  } else if (!isUndefined$1(styleDecls)) {
    const parsedVnodeStyle = parseStyleText(elmStyle);
    const expectedStyle = []; // styleMap is used when style is set to static value.

    for (let i = 0, n = styleDecls.length; i < n; i++) {
      const [prop, value, important] = styleDecls[i];
      expectedStyle.push(`${prop}: ${value + (important ? ' important!' : '')}`);
      const parsedPropValue = parsedVnodeStyle[prop];

      if (isUndefined$1(parsedPropValue)) {
        nodesAreCompatible = false;
      } else if (!parsedPropValue.startsWith(value)) {
        nodesAreCompatible = false;
      } else if (important && !parsedPropValue.endsWith('!important')) {
        nodesAreCompatible = false;
      }
    }

    if (keys(parsedVnodeStyle).length > styleDecls.length) {
      nodesAreCompatible = false;
    }

    vnodeStyle = ArrayJoin.call(expectedStyle, ';');
  }

  if (!nodesAreCompatible) {
    // style is used when class is bound to an expr.
    logError(`Mismatch hydrating element <${elm.tagName.toLowerCase()}>: attribute "style" has different values, expected "${vnodeStyle}" but found "${elmStyle}".`, vnode.owner);
  }

  return nodesAreCompatible;
}

function throwHydrationError() {
  assert.fail('Server rendered elements do not match client side generated elements');
}

function hydrateChildrenHook(elmChildren, children, vm) {
  var _a, _b;

  {
    const filteredVNodes = ArrayFilter.call(children, vnode => !!vnode);

    if (elmChildren.length !== filteredVNodes.length) {
      logError(`Hydration mismatch: incorrect number of rendered nodes, expected ${filteredVNodes.length} but found ${elmChildren.length}.`, vm);
      throwHydrationError();
    }
  }

  let elmCurrentChildIdx = 0;

  for (let j = 0, n = children.length; j < n; j++) {
    const ch = children[j];

    if (ch != null) {
      const childNode = elmChildren[elmCurrentChildIdx];

      {
        // VComments and VTexts validation is handled in their hooks
        if (isElementNode(childNode)) {
          if (((_a = ch.sel) === null || _a === void 0 ? void 0 : _a.toLowerCase()) !== childNode.tagName.toLowerCase()) {
            logError(`Hydration mismatch: expecting element with tag "${(_b = ch.sel) === null || _b === void 0 ? void 0 : _b.toLowerCase()}" but found "${childNode.tagName.toLowerCase()}".`, vm);
            throwHydrationError();
          } // Note: props are not yet set


          const hasIncompatibleAttrs = vnodesAndElementHaveCompatibleAttrs(ch, childNode);
          const hasIncompatibleClass = vnodesAndElementHaveCompatibleClass(ch, childNode);
          const hasIncompatibleStyle = vnodesAndElementHaveCompatibleStyle(ch, childNode);
          const isVNodeAndElementCompatible = hasIncompatibleAttrs && hasIncompatibleClass && hasIncompatibleStyle;

          if (!isVNodeAndElementCompatible) {
            throwHydrationError();
          }
        }
      }

      ch.hook.hydrate(ch, childNode);
      elmCurrentChildIdx++;
    }
  }
}

function updateCustomElmHook(oldVnode, vnode) {
  // Attrs need to be applied to element before props
  // IE11 will wipe out value on radio inputs if value
  // is set before type=radio.
  modAttrs.update(oldVnode, vnode);
  modProps.update(oldVnode, vnode);
  modComputedClassName.update(oldVnode, vnode);
  modComputedStyle.update(oldVnode, vnode);
}

function removeElmHook(vnode) {
  // this method only needs to search on child vnodes from template
  // to trigger the remove hook just in case some of those children
  // are custom elements.
  const {
    children,
    elm
  } = vnode;

  for (let j = 0, len = children.length; j < len; ++j) {
    const ch = children[j];

    if (!isNull(ch)) {
      ch.hook.remove(ch, elm);
    }
  }
} // Using a WeakMap instead of a WeakSet because this one works in IE11 :(


const FromIteration = new WeakMap(); // dynamic children means it was generated by an iteration
// in a template, and will require a more complex diffing algo.

function markAsDynamicChildren(children) {
  FromIteration.set(children, 1);
}

function hasDynamicChildren(children) {
  return FromIteration.has(children);
}
/*
 * Copyright (c) 2020, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */


function getUpgradableConstructor(tagName, renderer) {
  // Should never get a tag with upper case letter at this point, the compiler should
  // produce only tags with lowercase letters
  // But, for backwards compatibility, we will lower case the tagName
  tagName = tagName.toLowerCase();
  let CE = renderer.getCustomElement(tagName);

  if (!isUndefined$1(CE)) {
    return CE;
  }
  /**
   * LWC Upgradable Element reference to an element that was created
   * via the scoped registry mechanism, and that is ready to be upgraded.
   */


  CE = class LWCUpgradableElement extends renderer.HTMLElement {
    constructor(upgradeCallback) {
      super();

      if (isFunction$1(upgradeCallback)) {
        upgradeCallback(this); // nothing to do with the result for now
      }
    }

  };
  renderer.defineCustomElement(tagName, CE);
  return CE;
}
/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */


const SVG_NAMESPACE = 'http://www.w3.org/2000/svg';
const SymbolIterator = Symbol.iterator;
const TextHook = {
  create: vnode => {
    const {
      owner
    } = vnode;
    const {
      renderer
    } = owner;
    const elm = renderer.createText(vnode.text);
    linkNodeToShadow(elm, owner);
    vnode.elm = elm;
  },
  update: updateNodeHook,
  insert: insertNodeHook,
  move: insertNodeHook,
  remove: removeNodeHook,
  hydrate: (vNode, node) => {
    var _a;

    {
      // eslint-disable-next-line lwc-internal/no-global-node
      if (node.nodeType !== Node.TEXT_NODE) {
        logError('Hydration mismatch: incorrect node type received', vNode.owner);
        assert.fail('Hydration mismatch: incorrect node type received.');
      }

      if (node.nodeValue !== vNode.text) {
        logWarn('Hydration mismatch: text values do not match, will recover from the difference', vNode.owner);
      }
    } // always set the text value to the one from the vnode.


    node.nodeValue = (_a = vNode.text) !== null && _a !== void 0 ? _a : null;
    vNode.elm = node;
  }
};
const CommentHook = {
  create: vnode => {
    const {
      owner,
      text
    } = vnode;
    const {
      renderer
    } = owner;
    const elm = renderer.createComment(text);
    linkNodeToShadow(elm, owner);
    vnode.elm = elm;
  },
  update: updateNodeHook,
  insert: insertNodeHook,
  move: insertNodeHook,
  remove: removeNodeHook,
  hydrate: (vNode, node) => {
    var _a;

    {
      // eslint-disable-next-line lwc-internal/no-global-node
      if (node.nodeType !== Node.COMMENT_NODE) {
        logError('Hydration mismatch: incorrect node type received', vNode.owner);
        assert.fail('Hydration mismatch: incorrect node type received.');
      }

      if (node.nodeValue !== vNode.text) {
        logWarn('Hydration mismatch: comment values do not match, will recover from the difference', vNode.owner);
      }
    } // always set the text value to the one from the vnode.


    node.nodeValue = (_a = vNode.text) !== null && _a !== void 0 ? _a : null;
    vNode.elm = node;
  }
}; // insert is called after update, which is used somewhere else (via a module)
// to mark the vm as inserted, that means we cannot use update as the main channel
// to rehydrate when dirty, because sometimes the element is not inserted just yet,
// which breaks some invariants. For that reason, we have the following for any
// Custom Element that is inserted via a template.

const ElementHook = {
  create: vnode => {
    const {
      sel,
      owner,
      data: {
        svg
      }
    } = vnode;
    const {
      renderer
    } = owner;
    const namespace = isTrue(svg) ? SVG_NAMESPACE : undefined;
    const elm = renderer.createElement(sel, namespace);
    linkNodeToShadow(elm, owner);
    fallbackElmHook(elm, vnode);
    vnode.elm = elm;
    createElmHook(vnode);
  },
  update: (oldVnode, vnode) => {
    updateElmHook(oldVnode, vnode);
    updateChildrenHook(oldVnode, vnode);
  },
  insert: (vnode, parentNode, referenceNode) => {
    insertNodeHook(vnode, parentNode, referenceNode);
    createChildrenHook(vnode);
  },
  move: (vnode, parentNode, referenceNode) => {
    insertNodeHook(vnode, parentNode, referenceNode);
  },
  remove: (vnode, parentNode) => {
    removeNodeHook(vnode, parentNode);
    removeElmHook(vnode);
  },
  hydrate: (vnode, node) => {
    const elm = node;
    vnode.elm = elm;
    const {
      context
    } = vnode.data;
    const isDomManual = Boolean(!isUndefined$1(context) && !isUndefined$1(context.lwc) && context.lwc.dom === "manual"
    /* manual */
    );

    if (isDomManual) {
      // it may be that this element has lwc:inner-html, we need to diff and in case are the same,
      // remove the innerHTML from props so it reuses the existing dom elements.
      const {
        props
      } = vnode.data;

      if (!isUndefined$1(props) && !isUndefined$1(props.innerHTML)) {
        if (elm.innerHTML === props.innerHTML) {
          delete props.innerHTML;
        } else {
          logWarn(`Mismatch hydrating element <${elm.tagName.toLowerCase()}>: innerHTML values do not match for element, will recover from the difference`, vnode.owner);
        }
      }
    }

    hydrateElmHook(vnode);

    if (!isDomManual) {
      hydrateChildrenHook(vnode.elm.childNodes, vnode.children, vnode.owner);
    }
  }
};
const CustomElementHook = {
  create: vnode => {
    const {
      sel,
      owner
    } = vnode;
    const {
      renderer
    } = owner;
    const UpgradableConstructor = getUpgradableConstructor(sel, renderer);
    /**
     * Note: if the upgradable constructor does not expect, or throw when we new it
     * with a callback as the first argument, we could implement a more advanced
     * mechanism that only passes that argument if the constructor is known to be
     * an upgradable custom element.
     */

    const elm = new UpgradableConstructor(elm => {
      // the custom element from the registry is expecting an upgrade callback
      createViewModelHook(elm, vnode);
    });
    linkNodeToShadow(elm, owner);
    vnode.elm = elm;
    const vm = getAssociatedVMIfPresent(elm);

    if (vm) {
      allocateChildrenHook(vnode, vm);
    } else if (vnode.ctor !== UpgradableConstructor) {
      throw new TypeError(`Incorrect Component Constructor`);
    }

    createCustomElmHook(vnode);
  },
  update: (oldVnode, vnode) => {
    updateCustomElmHook(oldVnode, vnode);
    const vm = getAssociatedVMIfPresent(vnode.elm);

    if (vm) {
      // in fallback mode, the allocation will always set children to
      // empty and delegate the real allocation to the slot elements
      allocateChildrenHook(vnode, vm);
    } // in fallback mode, the children will be always empty, so, nothing
    // will happen, but in native, it does allocate the light dom


    updateChildrenHook(oldVnode, vnode);

    if (vm) {
      {
        assert.isTrue(isArray$1(vnode.children), `Invalid vnode for a custom element, it must have children defined.`);
      } // this will probably update the shadowRoot, but only if the vm is in a dirty state
      // this is important to preserve the top to bottom synchronous rendering phase.


      rerenderVM(vm);
    }
  },
  insert: (vnode, parentNode, referenceNode) => {
    insertNodeHook(vnode, parentNode, referenceNode);
    const vm = getAssociatedVMIfPresent(vnode.elm);

    if (vm) {
      {
        assert.isTrue(vm.state === 0
        /* created */
        , `${vm} cannot be recycled.`);
      }

      runConnectedCallback(vm);
    }

    createChildrenHook(vnode);

    if (vm) {
      appendVM(vm);
    }
  },
  move: (vnode, parentNode, referenceNode) => {
    insertNodeHook(vnode, parentNode, referenceNode);
  },
  remove: (vnode, parentNode) => {
    removeNodeHook(vnode, parentNode);
    const vm = getAssociatedVMIfPresent(vnode.elm);

    if (vm) {
      // for custom elements we don't have to go recursively because the removeVM routine
      // will take care of disconnecting any child VM attached to its shadow as well.
      removeVM(vm);
    }
  },
  hydrate: (vnode, elm) => {
    // the element is created, but the vm is not
    const {
      sel,
      mode,
      ctor,
      owner
    } = vnode;
    const def = getComponentInternalDef(ctor);
    createVM(elm, def, {
      mode,
      owner,
      tagName: sel,
      renderer: owner.renderer
    });
    vnode.elm = elm;
    const vm = getAssociatedVM(elm);
    allocateChildrenHook(vnode, vm);
    hydrateElmHook(vnode); // Insert hook section:

    {
      assert.isTrue(vm.state === 0
      /* created */
      , `${vm} cannot be recycled.`);
    }

    runConnectedCallback(vm);

    if (vm.renderMode !== 0
    /* Light */
    ) {
      // VM is not rendering in Light DOM, we can proceed and hydrate the slotted content.
      // Note: for Light DOM, this is handled while hydrating the VM
      hydrateChildrenHook(vnode.elm.childNodes, vnode.children, vm);
    }

    hydrateVM(vm);
  }
};

function linkNodeToShadow(elm, owner) {
  const {
    renderer,
    renderMode,
    shadowMode
  } = owner; // TODO [#1164]: this should eventually be done by the polyfill directly

  if (renderer.isSyntheticShadowDefined) {
    if (shadowMode === 1
    /* Synthetic */
    || renderMode === 0
    /* Light */
    ) {
      elm[KEY__SHADOW_RESOLVER] = getRenderRoot(owner)[KEY__SHADOW_RESOLVER];
    }
  }
}

function addVNodeToChildLWC(vnode) {
  ArrayPush$1.call(getVMBeingRendered().velements, vnode);
} // [h]tml node


function h(sel, data, children) {
  const vmBeingRendered = getVMBeingRendered();

  {
    assert.isTrue(isString(sel), `h() 1st argument sel must be a string.`);
    assert.isTrue(isObject(data), `h() 2nd argument data must be an object.`);
    assert.isTrue(isArray$1(children), `h() 3rd argument children must be an array.`);
    assert.isTrue('key' in data, ` <${sel}> "key" attribute is invalid or missing for ${vmBeingRendered}. Key inside iterator is either undefined or null.`); // checking reserved internal data properties

    assert.isFalse(data.className && data.classMap, `vnode.data.className and vnode.data.classMap ambiguous declaration.`);
    assert.isFalse(data.styleDecls && data.style, `vnode.data.styleDecls and vnode.data.style ambiguous declaration.`);

    if (data.style && !isString(data.style)) {
      logError(`Invalid 'style' attribute passed to <${sel}> is ignored. This attribute must be a string value.`, vmBeingRendered);
    }

    forEach.call(children, childVnode => {
      if (childVnode != null) {
        assert.isTrue(childVnode && 'sel' in childVnode && 'data' in childVnode && 'children' in childVnode && 'text' in childVnode && 'elm' in childVnode && 'key' in childVnode, `${childVnode} is not a vnode.`);
      }
    });
  }

  let text, elm;
  const {
    key
  } = data;
  return {
    sel,
    data,
    children,
    text,
    elm,
    key,
    hook: ElementHook,
    owner: vmBeingRendered
  };
} // [t]ab[i]ndex function


function ti(value) {
  // if value is greater than 0, we normalize to 0
  // If value is an invalid tabIndex value (null, undefined, string, etc), we let that value pass through
  // If value is less than -1, we don't care
  const shouldNormalize = value > 0 && !(isTrue(value) || isFalse(value));

  {
    const vmBeingRendered = getVMBeingRendered();

    if (shouldNormalize) {
      logError(`Invalid tabindex value \`${toString$1(value)}\` in template for ${vmBeingRendered}. This attribute must be set to 0 or -1.`, vmBeingRendered);
    }
  }

  return shouldNormalize ? 0 : value;
} // [s]lot element node


function s(slotName, data, children, slotset) {
  {
    assert.isTrue(isString(slotName), `s() 1st argument slotName must be a string.`);
    assert.isTrue(isObject(data), `s() 2nd argument data must be an object.`);
    assert.isTrue(isArray$1(children), `h() 3rd argument children must be an array.`);
  }

  if (!isUndefined$1(slotset) && !isUndefined$1(slotset[slotName]) && slotset[slotName].length !== 0) {
    children = slotset[slotName];
  }

  const vmBeingRendered = getVMBeingRendered();
  const {
    renderMode,
    shadowMode
  } = vmBeingRendered;

  if (renderMode === 0
  /* Light */
  ) {
    sc(children);
    return children;
  }

  if (shadowMode === 1
  /* Synthetic */
  ) {
    // TODO [#1276]: compiler should give us some sort of indicator when a vnodes collection is dynamic
    sc(children);
  }

  return h('slot', data, children);
} // [c]ustom element node


function c(sel, Ctor, data, children = EmptyArray) {
  const vmBeingRendered = getVMBeingRendered();

  {
    assert.isTrue(isString(sel), `c() 1st argument sel must be a string.`);
    assert.isTrue(isFunction$1(Ctor), `c() 2nd argument Ctor must be a function.`);
    assert.isTrue(isObject(data), `c() 3nd argument data must be an object.`);
    assert.isTrue(arguments.length === 3 || isArray$1(children), `c() 4nd argument data must be an array.`); // checking reserved internal data properties

    assert.isFalse(data.className && data.classMap, `vnode.data.className and vnode.data.classMap ambiguous declaration.`);
    assert.isFalse(data.styleDecls && data.style, `vnode.data.styleDecls and vnode.data.style ambiguous declaration.`);

    if (data.style && !isString(data.style)) {
      logError(`Invalid 'style' attribute passed to <${sel}> is ignored. This attribute must be a string value.`, vmBeingRendered);
    }

    if (arguments.length === 4) {
      forEach.call(children, childVnode => {
        if (childVnode != null) {
          assert.isTrue(childVnode && 'sel' in childVnode && 'data' in childVnode && 'children' in childVnode && 'text' in childVnode && 'elm' in childVnode && 'key' in childVnode, `${childVnode} is not a vnode.`);
        }
      });
    }
  }

  const {
    key
  } = data;
  let text, elm;
  const vnode = {
    sel,
    data,
    children,
    text,
    elm,
    key,
    hook: CustomElementHook,
    ctor: Ctor,
    owner: vmBeingRendered,
    mode: 'open' // TODO [#1294]: this should be defined in Ctor

  };
  addVNodeToChildLWC(vnode);
  return vnode;
} // [i]terable node


function i(iterable, factory) {
  const list = []; // TODO [#1276]: compiler should give us some sort of indicator when a vnodes collection is dynamic

  sc(list);
  const vmBeingRendered = getVMBeingRendered();

  if (isUndefined$1(iterable) || iterable === null) {
    {
      logError(`Invalid template iteration for value "${toString$1(iterable)}" in ${vmBeingRendered}. It must be an Array or an iterable Object.`, vmBeingRendered);
    }

    return list;
  }

  {
    assert.isFalse(isUndefined$1(iterable[SymbolIterator]), `Invalid template iteration for value \`${toString$1(iterable)}\` in ${vmBeingRendered}. It must be an array-like object and not \`null\` nor \`undefined\`.`);
  }

  const iterator = iterable[SymbolIterator]();

  {
    assert.isTrue(iterator && isFunction$1(iterator.next), `Invalid iterator function for "${toString$1(iterable)}" in ${vmBeingRendered}.`);
  }

  let next = iterator.next();
  let j = 0;
  let {
    value,
    done: last
  } = next;
  let keyMap;
  let iterationError;

  {
    keyMap = create(null);
  }

  while (last === false) {
    // implementing a look-back-approach because we need to know if the element is the last
    next = iterator.next();
    last = next.done; // template factory logic based on the previous collected value

    const vnode = factory(value, j, j === 0, last === true);

    if (isArray$1(vnode)) {
      ArrayPush$1.apply(list, vnode);
    } else {
      ArrayPush$1.call(list, vnode);
    }

    {
      const vnodes = isArray$1(vnode) ? vnode : [vnode];
      forEach.call(vnodes, childVnode => {
        if (!isNull(childVnode) && isObject(childVnode) && !isUndefined$1(childVnode.sel)) {
          const {
            key
          } = childVnode;

          if (isString(key) || isNumber(key)) {
            if (keyMap[key] === 1 && isUndefined$1(iterationError)) {
              iterationError = `Duplicated "key" attribute value for "<${childVnode.sel}>" in ${vmBeingRendered} for item number ${j}. A key with value "${childVnode.key}" appears more than once in the iteration. Key values must be unique numbers or strings.`;
            }

            keyMap[key] = 1;
          } else if (isUndefined$1(iterationError)) {
            iterationError = `Invalid "key" attribute value in "<${childVnode.sel}>" in ${vmBeingRendered} for item number ${j}. Set a unique "key" value on all iterated child elements.`;
          }
        }
      });
    } // preparing next value


    j += 1;
    value = next.value;
  }

  {
    if (!isUndefined$1(iterationError)) {
      logError(iterationError, vmBeingRendered);
    }
  }

  return list;
}
/**
 * [f]lattening
 */


function f(items) {
  {
    assert.isTrue(isArray$1(items), 'flattening api can only work with arrays.');
  }

  const len = items.length;
  const flattened = []; // TODO [#1276]: compiler should give us some sort of indicator when a vnodes collection is dynamic

  sc(flattened);

  for (let j = 0; j < len; j += 1) {
    const item = items[j];

    if (isArray$1(item)) {
      ArrayPush$1.apply(flattened, item);
    } else {
      ArrayPush$1.call(flattened, item);
    }
  }

  return flattened;
} // [t]ext node


function t(text) {
  const data = EmptyObject;
  let sel, children, key, elm;
  return {
    sel,
    data,
    children,
    text,
    elm,
    key,
    hook: TextHook,
    owner: getVMBeingRendered()
  };
} // [co]mment node


function co(text) {
  const data = EmptyObject;
  let sel, children, key, elm;
  return {
    sel,
    data,
    children,
    text,
    elm,
    key,
    hook: CommentHook,
    owner: getVMBeingRendered()
  };
} // [d]ynamic text


function d(value) {
  return value == null ? '' : String(value);
} // [b]ind function


function b(fn) {
  const vmBeingRendered = getVMBeingRendered();

  if (isNull(vmBeingRendered)) {
    throw new Error();
  }

  const vm = vmBeingRendered;
  return function (event) {
    invokeEventListener(vm, fn, vm.component, event);
  };
} // [k]ey function


function k(compilerKey, obj) {
  switch (typeof obj) {
    case 'number':
    case 'string':
      return compilerKey + ':' + obj;

    case 'object':
      {
        assert.fail(`Invalid key value "${obj}" in ${getVMBeingRendered()}. Key must be a string or number.`);
      }

  }
} // [g]lobal [id] function


function gid(id) {
  const vmBeingRendered = getVMBeingRendered();

  if (isUndefined$1(id) || id === '') {
    {
      logError(`Invalid id value "${id}". The id attribute must contain a non-empty string.`, vmBeingRendered);
    }

    return id;
  } // We remove attributes when they are assigned a value of null


  if (isNull(id)) {
    return null;
  }

  const {
    idx,
    shadowMode
  } = vmBeingRendered;

  if (shadowMode === 1
  /* Synthetic */
  ) {
    return StringReplace.call(id, /\S+/g, id => `${id}-${idx}`);
  }

  return id;
} // [f]ragment [id] function


function fid(url) {
  const vmBeingRendered = getVMBeingRendered();

  if (isUndefined$1(url) || url === '') {
    {
      if (isUndefined$1(url)) {
        logError(`Undefined url value for "href" or "xlink:href" attribute. Expected a non-empty string.`, vmBeingRendered);
      }
    }

    return url;
  } // We remove attributes when they are assigned a value of null


  if (isNull(url)) {
    return null;
  }

  const {
    idx,
    shadowMode
  } = vmBeingRendered; // Apply transformation only for fragment-only-urls, and only in shadow DOM

  if (shadowMode === 1
  /* Synthetic */
  && /^#/.test(url)) {
    return `${url}-${idx}`;
  }

  return url;
}
/**
 * Map to store an index value assigned to any dynamic component reference ingested
 * by dc() api. This allows us to generate a unique unique per template per dynamic
 * component reference to avoid diffing algo mismatches.
 */


const DynamicImportedComponentMap = new Map();
let dynamicImportedComponentCounter = 0;
/**
 * create a dynamic component via `<x-foo lwc:dynamic={Ctor}>`
 */

function dc(sel, Ctor, data, children) {
  {
    assert.isTrue(isString(sel), `dc() 1st argument sel must be a string.`);
    assert.isTrue(isObject(data), `dc() 3nd argument data must be an object.`);
    assert.isTrue(arguments.length === 3 || isArray$1(children), `dc() 4nd argument data must be an array.`);
  } // null or undefined values should produce a null value in the VNodes


  if (Ctor == null) {
    return null;
  }

  if (!isComponentConstructor(Ctor)) {
    throw new Error(`Invalid LWC Constructor ${toString$1(Ctor)} for custom element <${sel}>.`);
  }

  let idx = DynamicImportedComponentMap.get(Ctor);

  if (isUndefined$1(idx)) {
    idx = dynamicImportedComponentCounter++;
    DynamicImportedComponentMap.set(Ctor, idx);
  } // the new vnode key is a mix of idx and compiler key, this is required by the diffing algo
  // to identify different constructors as vnodes with different keys to avoid reusing the
  // element used for previous constructors.


  data.key = `dc:${idx}:${data.key}`;
  return c(sel, Ctor, data, children);
}
/**
 * slow children collection marking mechanism. this API allows the compiler to signal
 * to the engine that a particular collection of children must be diffed using the slow
 * algo based on keys due to the nature of the list. E.g.:
 *
 *   - slot element's children: the content of the slot has to be dynamic when in synthetic
 *                              shadow mode because the `vnode.children` might be the slotted
 *                              content vs default content, in which case the size and the
 *                              keys are not matching.
 *   - children that contain dynamic components
 *   - children that are produced by iteration
 *
 */


function sc(vnodes) {
  {
    assert.isTrue(isArray$1(vnodes), 'sc() api can only work with arrays.');
  } // We have to mark the vnodes collection as dynamic so we can later on
  // choose to use the snabbdom virtual dom diffing algo instead of our
  // static dummy algo.


  markAsDynamicChildren(vnodes);
  return vnodes;
}
/**
 * EXPERIMENTAL: This function acts like a hook for Lightning Locker Service and other similar
 * libraries to sanitize HTML content. This hook process the content passed via the template to
 * lwc:inner-html directive.
 * It is meant to be overridden with setSanitizeHtmlContentHook, it throws an error by default.
 */


let sanitizeHtmlContentHook = () => {
  // locker-service patches this function during runtime to sanitize HTML content.
  throw new Error('sanitizeHtmlContent hook must be implemented.');
};


function shc(content) {
  return sanitizeHtmlContentHook();
}

const api = freeze({
  s,
  h,
  c,
  i,
  f,
  t,
  d,
  b,
  k,
  co,
  dc,
  ti,
  gid,
  fid,
  shc
});
/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */

function makeHostToken(token) {
  return `${token}-host`;
}

function createInlineStyleVNode(content) {
  return api.h('style', {
    key: 'style',
    attrs: {
      type: 'text/css'
    }
  }, [api.t(content)]);
}

function updateStylesheetToken(vm, template) {
  const {
    elm,
    context,
    renderer,
    renderMode,
    shadowMode
  } = vm;
  const {
    stylesheets: newStylesheets,
    stylesheetToken: newStylesheetToken
  } = template;
  const isSyntheticShadow = renderMode === 1
  /* Shadow */
  && shadowMode === 1
  /* Synthetic */
  ;
  const {
    hasScopedStyles
  } = context;
  let newToken;
  let newHasTokenInClass;
  let newHasTokenInAttribute; // Reset the styling token applied to the host element.

  const {
    stylesheetToken: oldToken,
    hasTokenInClass: oldHasTokenInClass,
    hasTokenInAttribute: oldHasTokenInAttribute
  } = context;

  if (oldHasTokenInClass) {
    renderer.getClassList(elm).remove(makeHostToken(oldToken));
  }

  if (oldHasTokenInAttribute) {
    renderer.removeAttribute(elm, makeHostToken(oldToken));
  } // Apply the new template styling token to the host element, if the new template has any
  // associated stylesheets. In the case of light DOM, also ensure there is at least one scoped stylesheet.


  if (!isUndefined$1(newStylesheets) && newStylesheets.length !== 0) {
    newToken = newStylesheetToken;
  } // Set the new styling token on the host element


  if (!isUndefined$1(newToken)) {
    if (hasScopedStyles) {
      renderer.getClassList(elm).add(makeHostToken(newToken));
      newHasTokenInClass = true;
    }

    if (isSyntheticShadow) {
      renderer.setAttribute(elm, makeHostToken(newToken), '');
      newHasTokenInAttribute = true;
    }
  } // Update the styling tokens present on the context object.


  context.stylesheetToken = newToken;
  context.hasTokenInClass = newHasTokenInClass;
  context.hasTokenInAttribute = newHasTokenInAttribute;
}

function evaluateStylesheetsContent(stylesheets, stylesheetToken, vm) {
  const content = [];
  let root;

  for (let i = 0; i < stylesheets.length; i++) {
    let stylesheet = stylesheets[i];

    if (isArray$1(stylesheet)) {
      ArrayPush$1.apply(content, evaluateStylesheetsContent(stylesheet, stylesheetToken, vm));
    } else {
      {
        // in dev-mode, we support hot swapping of stylesheet, which means that
        // the component instance might be attempting to use an old version of
        // the stylesheet, while internally, we have a replacement for it.
        stylesheet = getStyleOrSwappedStyle(stylesheet);
      }

      const isScopedCss = stylesheet[KEY__SCOPED_CSS]; // Apply the scope token only if the stylesheet itself is scoped, or if we're rendering synthetic shadow.

      const scopeToken = isScopedCss || vm.shadowMode === 1
      /* Synthetic */
      && vm.renderMode === 1
      /* Shadow */
      ? stylesheetToken : undefined; // Use the actual `:host` selector if we're rendering global CSS for light DOM, or if we're rendering
      // native shadow DOM. Synthetic shadow DOM never uses `:host`.

      const useActualHostSelector = vm.renderMode === 0
      /* Light */
      ? !isScopedCss : vm.shadowMode === 0
      /* Native */
      ; // Use the native :dir() pseudoclass only in native shadow DOM. Otherwise, in synthetic shadow,
      // we use an attribute selector on the host to simulate :dir().

      let useNativeDirPseudoclass;

      if (vm.renderMode === 1
      /* Shadow */
      ) {
        useNativeDirPseudoclass = vm.shadowMode === 0
        /* Native */
        ;
      } else {
        // Light DOM components should only render `[dir]` if they're inside of a synthetic shadow root.
        // At the top level (root is null) or inside of a native shadow root, they should use `:dir()`.
        if (isUndefined$1(root)) {
          // Only calculate the root once as necessary
          root = getNearestShadowComponent(vm);
        }

        useNativeDirPseudoclass = isNull(root) || root.shadowMode === 0
        /* Native */
        ;
      }

      ArrayPush$1.call(content, stylesheet(scopeToken, useActualHostSelector, useNativeDirPseudoclass));
    }
  }

  return content;
}

function getStylesheetsContent(vm, template) {
  const {
    stylesheets,
    stylesheetToken
  } = template;
  let content = [];

  if (!isUndefined$1(stylesheets) && stylesheets.length !== 0) {
    content = evaluateStylesheetsContent(stylesheets, stylesheetToken, vm);
  }

  return content;
} // It might be worth caching this to avoid doing the lookup repeatedly, but
// perf testing has not shown it to be a huge improvement yet:
// https://github.com/salesforce/lwc/pull/2460#discussion_r691208892


function getNearestShadowComponent(vm) {
  let owner = vm;

  while (!isNull(owner)) {
    if (owner.renderMode === 1
    /* Shadow */
    ) {
      return owner;
    }

    owner = owner.owner;
  }

  return owner;
}

function getNearestNativeShadowComponent(vm) {
  const owner = getNearestShadowComponent(vm);

  if (!isNull(owner) && owner.shadowMode === 1
  /* Synthetic */
  ) {
    // Synthetic-within-native is impossible. So if the nearest shadow component is
    // synthetic, we know we won't find a native component if we go any further.
    return null;
  }

  return owner;
}

function createStylesheet(vm, stylesheets) {
  const {
    renderer,
    renderMode,
    shadowMode
  } = vm;

  if (renderMode === 1
  /* Shadow */
  && shadowMode === 1
  /* Synthetic */
  ) {
    for (let i = 0; i < stylesheets.length; i++) {
      renderer.insertGlobalStylesheet(stylesheets[i]);
    }
  } else if (renderer.ssr || renderer.isHydrating()) {
    // Note: We need to ensure that during hydration, the stylesheets method is the same as those in ssr.
    //       This works in the client, because the stylesheets are created, and cached in the VM
    //       the first time the VM renders.
    // native shadow or light DOM, SSR
    const combinedStylesheetContent = ArrayJoin.call(stylesheets, '\n');
    return createInlineStyleVNode(combinedStylesheetContent);
  } else {
    // native shadow or light DOM, DOM renderer
    const root = getNearestNativeShadowComponent(vm);
    const isGlobal = isNull(root);

    for (let i = 0; i < stylesheets.length; i++) {
      if (isGlobal) {
        renderer.insertGlobalStylesheet(stylesheets[i]);
      } else {
        // local level
        renderer.insertStylesheet(stylesheets[i], root.cmpRoot);
      }
    }
  }

  return null;
}
/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */


const operationIdNameMapping = ['constructor', 'render', 'patch', 'connectedCallback', 'renderedCallback', 'disconnectedCallback', 'errorCallback', 'lwc-hydrate', 'lwc-rehydrate']; // Even if all the browser the engine supports implements the UserTiming API, we need to guard the measure APIs.
// JSDom (used in Jest) for example doesn't implement the UserTiming APIs.

const isUserTimingSupported = typeof performance !== 'undefined' && typeof performance.mark === 'function' && typeof performance.clearMarks === 'function' && typeof performance.measure === 'function' && typeof performance.clearMeasures === 'function';
const start = !isUserTimingSupported ? noop : markName => {
  performance.mark(markName);
};
const end = !isUserTimingSupported ? noop : (measureName, markName) => {
  performance.measure(measureName, markName); // Clear the created marks and measure to avoid filling the performance entries buffer.
  // Note: Even if the entries get deleted, existing PerformanceObservers preserve a copy of those entries.

  performance.clearMarks(markName);
  performance.clearMeasures(measureName);
};

function getOperationName(opId) {
  return operationIdNameMapping[opId];
}

function getMeasureName(opId, vm) {
  return `${getComponentTag(vm)} - ${getOperationName(opId)}`;
}

function getMarkName(opId, vm) {
  // Adding the VM idx to the mark name creates a unique mark name component instance. This is necessary to produce
  // the right measures for components that are recursive.
  return `${getMeasureName(opId, vm)} - ${vm.idx}`;
}

function logOperationStart(opId, vm) {
  {
    const markName = getMarkName(opId, vm);
    start(markName);
  }
}

function logOperationEnd(opId, vm) {
  {
    const markName = getMarkName(opId, vm);
    const measureName = getMeasureName(opId, vm);
    end(measureName, markName);
  }
}

function logGlobalOperationStart(opId, vm) {
  {
    const opName = getOperationName(opId);
    const markName = isUndefined$1(vm) ? opName : getMarkName(opId, vm);
    start(markName);
  }
}

function logGlobalOperationEnd(opId, vm) {
  {
    const opName = getOperationName(opId);
    const markName = isUndefined$1(vm) ? opName : getMarkName(opId, vm);
    end(opName, markName);
  }
}
/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */


let isUpdatingTemplate = false;
let vmBeingRendered = null;

function getVMBeingRendered() {
  return vmBeingRendered;
}

function setVMBeingRendered(vm) {
  vmBeingRendered = vm;
}

function validateSlots(vm, html) {

  const {
    cmpSlots
  } = vm;
  const {
    slots = EmptyArray
  } = html;

  for (const slotName in cmpSlots) {
    // eslint-disable-next-line lwc-internal/no-production-assert
    assert.isTrue(isArray$1(cmpSlots[slotName]), `Slots can only be set to an array, instead received ${toString$1(cmpSlots[slotName])} for slot "${slotName}" in ${vm}.`);

    if (slotName !== '' && ArrayIndexOf.call(slots, slotName) === -1) {
      // TODO [#1297]: this should never really happen because the compiler should always validate
      // eslint-disable-next-line lwc-internal/no-production-assert
      logError(`Ignoring unknown provided slot name "${slotName}" in ${vm}. Check for a typo on the slot attribute.`, vm);
    }
  }
}

function validateLightDomTemplate(template, vm) {
  if (template === defaultEmptyTemplate) return;

  if (vm.renderMode === 0
  /* Light */
  ) {
    assert.isTrue(template.renderMode === 'light', `Light DOM components can't render shadow DOM templates. Add an 'lwc:render-mode="light"' directive to the root template tag of ${getComponentTag(vm)}.`);
  } else {
    assert.isTrue(isUndefined$1(template.renderMode), `Shadow DOM components template can't render light DOM templates. Either remove the 'lwc:render-mode' directive from ${getComponentTag(vm)} or set it to 'lwc:render-mode="shadow"`);
  }
}

function evaluateTemplate(vm, html) {
  {
    assert.isTrue(isFunction$1(html), `evaluateTemplate() second argument must be an imported template instead of ${toString$1(html)}`); // in dev-mode, we support hot swapping of templates, which means that
    // the component instance might be attempting to use an old version of
    // the template, while internally, we have a replacement for it.

    html = getTemplateOrSwappedTemplate(html);
  }

  const isUpdatingTemplateInception = isUpdatingTemplate;
  const vmOfTemplateBeingUpdatedInception = vmBeingRendered;
  let vnodes = [];
  runWithBoundaryProtection(vm, vm.owner, () => {
    // pre
    vmBeingRendered = vm;
    logOperationStart(1
    /* Render */
    , vm);
  }, () => {
    // job
    const {
      component,
      context,
      cmpSlots,
      cmpTemplate,
      tro
    } = vm;
    tro.observe(() => {
      // Reset the cache memoizer for template when needed.
      if (html !== cmpTemplate) {
        if ("development" !== 'production') {
          validateLightDomTemplate(html, vm);
        } // Perf opt: do not reset the shadow root during the first rendering (there is
        // nothing to reset).


        if (!isNull(cmpTemplate)) {
          // It is important to reset the content to avoid reusing similar elements
          // generated from a different template, because they could have similar IDs,
          // and snabbdom just rely on the IDs.
          resetComponentRoot(vm);
        } // Check that the template was built by the compiler.


        if (!isTemplateRegistered(html)) {
          throw new TypeError(`Invalid template returned by the render() method on ${vm}. It must return an imported template (e.g.: \`import html from "./${vm.def.name}.html"\`), instead, it has returned: ${toString$1(html)}.`);
        }

        vm.cmpTemplate = html; // Create a brand new template cache for the swapped templated.

        context.tplCache = create(null); // Set the computeHasScopedStyles property in the context, to avoid recomputing it repeatedly.

        context.hasScopedStyles = computeHasScopedStyles(html); // Update the scoping token on the host element.

        updateStylesheetToken(vm, html); // Evaluate, create stylesheet and cache the produced VNode for future
        // re-rendering.

        const stylesheetsContent = getStylesheetsContent(vm, html);
        context.styleVNode = stylesheetsContent.length === 0 ? null : createStylesheet(vm, stylesheetsContent);
      }

      if ("development" !== 'production') {
        // validating slots in every rendering since the allocated content might change over time
        validateSlots(vm, html); // add the VM to the list of host VMs that can be re-rendered if html is swapped

        setActiveVM(vm);
      } // right before producing the vnodes, we clear up all internal references
      // to custom elements from the template.


      vm.velements = []; // Set the global flag that template is being updated

      isUpdatingTemplate = true;
      vnodes = html.call(undefined, api, component, cmpSlots, context.tplCache);
      const {
        styleVNode
      } = context;

      if (!isNull(styleVNode)) {
        ArrayUnshift.call(vnodes, styleVNode);
      }
    });
  }, () => {
    // post
    isUpdatingTemplate = isUpdatingTemplateInception;
    vmBeingRendered = vmOfTemplateBeingUpdatedInception;
    logOperationEnd(1
    /* Render */
    , vm);
  });

  {
    assert.invariant(isArray$1(vnodes), `Compiler should produce html functions that always return an array.`);
  }

  return vnodes;
}

function computeHasScopedStyles(template) {
  const {
    stylesheets
  } = template;

  if (!isUndefined$1(stylesheets)) {
    for (let i = 0; i < stylesheets.length; i++) {
      if (isTrue(stylesheets[i][KEY__SCOPED_CSS])) {
        return true;
      }
    }
  }

  return false;
}
/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */


function addErrorComponentStack(vm, error) {
  if (!isFrozen(error) && isUndefined$1(error.wcStack)) {
    const wcStack = getErrorComponentStack(vm);
    defineProperty(error, 'wcStack', {
      get() {
        return wcStack;
      }

    });
  }
}
/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */


let isInvokingRender = false;
let vmBeingConstructed = null;

function isBeingConstructed(vm) {
  return vmBeingConstructed === vm;
}

function invokeComponentCallback(vm, fn, args) {
  const {
    component,
    callHook,
    owner
  } = vm;
  runWithBoundaryProtection(vm, owner, noop, () => {
    callHook(component, fn, args);
  }, noop);
}

function invokeComponentConstructor(vm, Ctor) {
  const vmBeingConstructedInception = vmBeingConstructed;
  let error;
  logOperationStart(0
  /* Constructor */
  , vm);
  vmBeingConstructed = vm;
  /**
   * Constructors don't need to be wrapped with a boundary because for root elements
   * it should throw, while elements from template are already wrapped by a boundary
   * associated to the diffing algo.
   */

  try {
    // job
    const result = new Ctor(); // Check indirectly if the constructor result is an instance of LightningElement. Using
    // the "instanceof" operator would not work here since Locker Service provides its own
    // implementation of LightningElement, so we indirectly check if the base constructor is
    // invoked by accessing the component on the vm.

    if (vmBeingConstructed.component !== result) {
      throw new TypeError('Invalid component constructor, the class should extend LightningElement.');
    }
  } catch (e) {
    error = Object(e);
  } finally {
    logOperationEnd(0
    /* Constructor */
    , vm);
    vmBeingConstructed = vmBeingConstructedInception;

    if (!isUndefined$1(error)) {
      addErrorComponentStack(vm, error); // re-throwing the original error annotated after restoring the context

      throw error; // eslint-disable-line no-unsafe-finally
    }
  }
}

function invokeComponentRenderMethod(vm) {
  const {
    def: {
      render
    },
    callHook,
    component,
    owner
  } = vm;
  const isRenderBeingInvokedInception = isInvokingRender;
  const vmBeingRenderedInception = getVMBeingRendered();
  let html;
  let renderInvocationSuccessful = false;
  runWithBoundaryProtection(vm, owner, () => {
    // pre
    isInvokingRender = true;
    setVMBeingRendered(vm);
  }, () => {
    // job
    vm.tro.observe(() => {
      html = callHook(component, render);
      renderInvocationSuccessful = true;
    });
  }, () => {
    // post
    isInvokingRender = isRenderBeingInvokedInception;
    setVMBeingRendered(vmBeingRenderedInception);
  }); // If render() invocation failed, process errorCallback in boundary and return an empty template

  return renderInvocationSuccessful ? evaluateTemplate(vm, html) : [];
}

function invokeEventListener(vm, fn, thisValue, event) {
  const {
    callHook,
    owner
  } = vm;
  runWithBoundaryProtection(vm, owner, noop, () => {
    // job
    if ("development" !== 'production') {
      assert.isTrue(isFunction$1(fn), `Invalid event handler for event '${event.type}' on ${vm}.`);
    }

    callHook(thisValue, fn, [event]);
  }, noop);
}
/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */


const signedTemplateMap = new Map();
/**
 * INTERNAL: This function can only be invoked by compiled code. The compiler
 * will prevent this function from being imported by userland code.
 */

function registerComponent(Ctor, {
  tmpl
}) {
  signedTemplateMap.set(Ctor, tmpl); // chaining this method as a way to wrap existing assignment of component constructor easily,
  // without too much transformation

  return Ctor;
}

function getComponentRegisteredTemplate(Ctor) {
  return signedTemplateMap.get(Ctor);
}

function getTemplateReactiveObserver(vm) {
  return new ReactiveObserver(() => {
    const {
      isDirty
    } = vm;

    if (isFalse(isDirty)) {
      markComponentAsDirty(vm);
      scheduleRehydration(vm);
    }
  });
}

function renderComponent(vm) {
  {
    assert.invariant(vm.isDirty, `${vm} is not dirty.`);
  }

  vm.tro.reset();
  const vnodes = invokeComponentRenderMethod(vm);
  vm.isDirty = false;
  vm.isScheduled = false;
  return vnodes;
}

function markComponentAsDirty(vm) {
  {
    const vmBeingRendered = getVMBeingRendered();
    assert.isFalse(vm.isDirty, `markComponentAsDirty() for ${vm} should not be called when the component is already dirty.`);
    assert.isFalse(isInvokingRender, `markComponentAsDirty() for ${vm} cannot be called during rendering of ${vmBeingRendered}.`);
    assert.isFalse(isUpdatingTemplate, `markComponentAsDirty() for ${vm} cannot be called while updating template of ${vmBeingRendered}.`);
  }

  vm.isDirty = true;
}

const cmpEventListenerMap = new WeakMap();

function getWrappedComponentsListener(vm, listener) {
  if (!isFunction$1(listener)) {
    throw new TypeError(); // avoiding problems with non-valid listeners
  }

  let wrappedListener = cmpEventListenerMap.get(listener);

  if (isUndefined$1(wrappedListener)) {
    wrappedListener = function (event) {
      invokeEventListener(vm, listener, undefined, event);
    };

    cmpEventListenerMap.set(listener, wrappedListener);
  }

  return wrappedListener;
}
/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */


const Services = create(null);

function invokeServiceHook(vm, cbs) {
  {
    assert.isTrue(isArray$1(cbs) && cbs.length > 0, `Optimize invokeServiceHook() to be invoked only when needed`);
  }

  const {
    component,
    def,
    context
  } = vm;

  for (let i = 0, len = cbs.length; i < len; ++i) {
    cbs[i].call(undefined, component, {}, def, context);
  }
}
/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */


let idx = 0;
/** The internal slot used to associate different objects the engine manipulates with the VM */

const ViewModelReflection = new WeakMap();

function callHook(cmp, fn, args = []) {
  return fn.apply(cmp, args);
}

function setHook(cmp, prop, newValue) {
  cmp[prop] = newValue;
}

function getHook(cmp, prop) {
  return cmp[prop];
}

function rerenderVM(vm) {
  rehydrate(vm);
}

function connectRootElement(elm) {
  const vm = getAssociatedVM(elm);
  logGlobalOperationStart(7
  /* GlobalHydrate */
  , vm); // Usually means moving the element from one place to another, which is observable via
  // life-cycle hooks.

  if (vm.state === 1
  /* connected */
  ) {
    disconnectRootElement(elm);
  }

  runConnectedCallback(vm);
  rehydrate(vm);
  logGlobalOperationEnd(7
  /* GlobalHydrate */
  , vm);
}

function disconnectRootElement(elm) {
  const vm = getAssociatedVM(elm);
  resetComponentStateWhenRemoved(vm);
}

function appendVM(vm) {
  rehydrate(vm);
}

function hydrateVM(vm) {
  hydrate(vm);
} // just in case the component comes back, with this we guarantee re-rendering it
// while preventing any attempt to rehydration until after reinsertion.


function resetComponentStateWhenRemoved(vm) {
  const {
    state
  } = vm;

  if (state !== 2
  /* disconnected */
  ) {
    const {
      oar,
      tro
    } = vm; // Making sure that any observing record will not trigger the rehydrated on this vm

    tro.reset(); // Making sure that any observing accessor record will not trigger the setter to be reinvoked

    for (const key in oar) {
      oar[key].reset();
    }

    runDisconnectedCallback(vm); // Spec: https://dom.spec.whatwg.org/#concept-node-remove (step 14-15)

    runChildNodesDisconnectedCallback(vm);
    runLightChildNodesDisconnectedCallback(vm);
  }

  {
    removeActiveVM(vm);
  }
} // this method is triggered by the diffing algo only when a vnode from the
// old vnode.children is removed from the DOM.


function removeVM(vm) {
  {
    assert.isTrue(vm.state === 1
    /* connected */
    || vm.state === 2
    /* disconnected */
    , `${vm} must have been connected.`);
  }

  resetComponentStateWhenRemoved(vm);
}

function getNearestShadowAncestor(vm) {
  let ancestor = vm.owner;

  while (!isNull(ancestor) && ancestor.renderMode === 0
  /* Light */
  ) {
    ancestor = ancestor.owner;
  }

  return ancestor;
}

function createVM(elm, def, options) {
  const {
    mode,
    owner,
    renderer,
    tagName
  } = options;
  const vm = {
    elm,
    def,
    idx: idx++,
    state: 0
    /* created */
    ,
    isScheduled: false,
    isDirty: true,
    tagName,
    mode,
    owner,
    renderer,
    children: EmptyArray,
    aChildren: EmptyArray,
    velements: EmptyArray,
    cmpProps: create(null),
    cmpFields: create(null),
    cmpSlots: create(null),
    oar: create(null),
    cmpTemplate: null,
    renderMode: def.renderMode,
    shadowMode: null,
    context: {
      stylesheetToken: undefined,
      hasTokenInClass: undefined,
      hasTokenInAttribute: undefined,
      hasScopedStyles: undefined,
      styleVNode: null,
      tplCache: EmptyObject,
      wiredConnecting: EmptyArray,
      wiredDisconnecting: EmptyArray
    },
    tro: null,
    component: null,
    cmpRoot: null,
    callHook,
    setHook,
    getHook
  };
  vm.shadowMode = computeShadowMode(vm);
  vm.tro = getTemplateReactiveObserver(vm);

  {
    vm.toString = () => {
      return `[object:vm ${def.name} (${vm.idx})]`;
    };

    if (runtimeFlags.ENABLE_FORCE_NATIVE_SHADOW_MODE_FOR_TEST) {
      vm.shadowMode = 0
      /* Native */
      ;
    }
  } // Create component instance associated to the vm and the element.


  invokeComponentConstructor(vm, def.ctor); // Initializing the wire decorator per instance only when really needed

  if (hasWireAdapters(vm)) {
    installWireAdapters(vm);
  }

  return vm;
}

function computeShadowMode(vm) {
  const {
    def,
    renderer
  } = vm;
  const {
    isNativeShadowDefined,
    isSyntheticShadowDefined
  } = renderer;
  let shadowMode;

  if (isSyntheticShadowDefined) {
    if (def.renderMode === 0
    /* Light */
    ) {
      // ShadowMode.Native implies "not synthetic shadow" which is consistent with how
      // everything defaults to native when the synthetic shadow polyfill is unavailable.
      shadowMode = 0
      /* Native */
      ;
    } else if (isNativeShadowDefined) {
      if (def.shadowSupportMode === "any"
      /* Any */
      ) {
        shadowMode = 0
        /* Native */
        ;
      } else {
        const shadowAncestor = getNearestShadowAncestor(vm);

        if (!isNull(shadowAncestor) && shadowAncestor.shadowMode === 0
        /* Native */
        ) {
          // Transitive support for native Shadow DOM. A component in native mode
          // transitively opts all of its descendants into native.
          shadowMode = 0
          /* Native */
          ;
        } else {
          // Synthetic if neither this component nor any of its ancestors are configured
          // to be native.
          shadowMode = 1
          /* Synthetic */
          ;
        }
      }
    } else {
      // Synthetic if there is no native Shadow DOM support.
      shadowMode = 1
      /* Synthetic */
      ;
    }
  } else {
    // Native if the synthetic shadow polyfill is unavailable.
    shadowMode = 0
    /* Native */
    ;
  }

  return shadowMode;
}

function assertIsVM(obj) {
  if (isNull(obj) || !isObject(obj) || !('cmpRoot' in obj)) {
    throw new TypeError(`${obj} is not a VM.`);
  }
}

function associateVM(obj, vm) {
  ViewModelReflection.set(obj, vm);
}

function getAssociatedVM(obj) {
  const vm = ViewModelReflection.get(obj);

  {
    assertIsVM(vm);
  }

  return vm;
}

function getAssociatedVMIfPresent(obj) {
  const maybeVm = ViewModelReflection.get(obj);

  {
    if (!isUndefined$1(maybeVm)) {
      assertIsVM(maybeVm);
    }
  }

  return maybeVm;
}

function rehydrate(vm) {
  if (isTrue(vm.isDirty)) {
    const children = renderComponent(vm);
    patchShadowRoot(vm, children);
  }
}

function hydrate(vm) {
  if (isTrue(vm.isDirty)) {
    // manually diffing/patching here.
    // This routine is:
    // patchShadowRoot(vm, children);
    //  -> addVnodes.
    const children = renderComponent(vm);
    vm.children = children;
    const vmChildren = vm.renderMode === 0
    /* Light */
    ? vm.elm.childNodes : vm.elm.shadowRoot.childNodes;
    hydrateChildrenHook(vmChildren, children, vm);
    runRenderedCallback(vm);
  }
}

function patchShadowRoot(vm, newCh) {
  const {
    children: oldCh
  } = vm; // caching the new children collection

  vm.children = newCh;

  if (newCh.length > 0 || oldCh.length > 0) {
    // patch function mutates vnodes by adding the element reference,
    // however, if patching fails it contains partial changes.
    if (oldCh !== newCh) {
      const fn = hasDynamicChildren(newCh) ? updateDynamicChildren : updateStaticChildren;
      runWithBoundaryProtection(vm, vm, () => {
        // pre
        logOperationStart(2
        /* Patch */
        , vm);
      }, () => {
        // job
        const elementToRenderTo = getRenderRoot(vm);
        fn(elementToRenderTo, oldCh, newCh);
      }, () => {
        // post
        logOperationEnd(2
        /* Patch */
        , vm);
      });
    }
  }

  if (vm.state === 1
  /* connected */
  ) {
    // If the element is connected, that means connectedCallback was already issued, and
    // any successive rendering should finish with the call to renderedCallback, otherwise
    // the connectedCallback will take care of calling it in the right order at the end of
    // the current rehydration process.
    runRenderedCallback(vm);
  }
}

function runRenderedCallback(vm) {
  const {
    renderer,
    def: {
      renderedCallback
    }
  } = vm;

  if (isTrue(renderer.ssr)) {
    return;
  }

  const {
    rendered
  } = Services;

  if (rendered) {
    invokeServiceHook(vm, rendered);
  }

  if (!isUndefined$1(renderedCallback)) {
    logOperationStart(4
    /* RenderedCallback */
    , vm);
    invokeComponentCallback(vm, renderedCallback);
    logOperationEnd(4
    /* RenderedCallback */
    , vm);
  }
}

let rehydrateQueue = [];

function flushRehydrationQueue() {
  logGlobalOperationStart(8
  /* GlobalRehydrate */
  );

  {
    assert.invariant(rehydrateQueue.length, `If rehydrateQueue was scheduled, it is because there must be at least one VM on this pending queue instead of ${rehydrateQueue}.`);
  }

  const vms = rehydrateQueue.sort((a, b) => a.idx - b.idx);
  rehydrateQueue = []; // reset to a new queue

  for (let i = 0, len = vms.length; i < len; i += 1) {
    const vm = vms[i];

    try {
      rehydrate(vm);
    } catch (error) {
      if (i + 1 < len) {
        // pieces of the queue are still pending to be rehydrated, those should have priority
        if (rehydrateQueue.length === 0) {
          addCallbackToNextTick(flushRehydrationQueue);
        }

        ArrayUnshift.apply(rehydrateQueue, ArraySlice.call(vms, i + 1));
      } // we need to end the measure before throwing.


      logGlobalOperationEnd(8
      /* GlobalRehydrate */
      ); // re-throwing the original error will break the current tick, but since the next tick is
      // already scheduled, it should continue patching the rest.

      throw error; // eslint-disable-line no-unsafe-finally
    }
  }

  logGlobalOperationEnd(8
  /* GlobalRehydrate */
  );
}

function runConnectedCallback(vm) {
  const {
    state
  } = vm;

  if (state === 1
  /* connected */
  ) {
    return; // nothing to do since it was already connected
  }

  vm.state = 1
  /* connected */
  ; // reporting connection

  const {
    connected
  } = Services;

  if (connected) {
    invokeServiceHook(vm, connected);
  }

  if (hasWireAdapters(vm)) {
    connectWireAdapters(vm);
  }

  const {
    connectedCallback
  } = vm.def;

  if (!isUndefined$1(connectedCallback)) {
    logOperationStart(3
    /* ConnectedCallback */
    , vm);
    invokeComponentCallback(vm, connectedCallback);
    logOperationEnd(3
    /* ConnectedCallback */
    , vm);
  }
}

function hasWireAdapters(vm) {
  return getOwnPropertyNames$1(vm.def.wire).length > 0;
}

function runDisconnectedCallback(vm) {
  {
    assert.isTrue(vm.state !== 2
    /* disconnected */
    , `${vm} must be inserted.`);
  }

  if (isFalse(vm.isDirty)) {
    // this guarantees that if the component is reused/reinserted,
    // it will be re-rendered because we are disconnecting the reactivity
    // linking, so mutations are not automatically reflected on the state
    // of disconnected components.
    vm.isDirty = true;
  }

  vm.state = 2
  /* disconnected */
  ; // reporting disconnection

  const {
    disconnected
  } = Services;

  if (disconnected) {
    invokeServiceHook(vm, disconnected);
  }

  if (hasWireAdapters(vm)) {
    disconnectWireAdapters(vm);
  }

  const {
    disconnectedCallback
  } = vm.def;

  if (!isUndefined$1(disconnectedCallback)) {
    logOperationStart(5
    /* DisconnectedCallback */
    , vm);
    invokeComponentCallback(vm, disconnectedCallback);
    logOperationEnd(5
    /* DisconnectedCallback */
    , vm);
  }
}

function runChildNodesDisconnectedCallback(vm) {
  const {
    velements: vCustomElementCollection
  } = vm; // Reporting disconnection for every child in inverse order since they are
  // inserted in reserved order.

  for (let i = vCustomElementCollection.length - 1; i >= 0; i -= 1) {
    const {
      elm
    } = vCustomElementCollection[i]; // There are two cases where the element could be undefined:
    // * when there is an error during the construction phase, and an error
    //   boundary picks it, there is a possibility that the VCustomElement
    //   is not properly initialized, and therefore is should be ignored.
    // * when slotted custom element is not used by the element where it is
    //   slotted into it, as  a result, the custom element was never
    //   initialized.

    if (!isUndefined$1(elm)) {
      const childVM = getAssociatedVMIfPresent(elm); // The VM associated with the element might be associated undefined
      // in the case where the VM failed in the middle of its creation,
      // eg: constructor throwing before invoking super().

      if (!isUndefined$1(childVM)) {
        resetComponentStateWhenRemoved(childVM);
      }
    }
  }
}

function runLightChildNodesDisconnectedCallback(vm) {
  const {
    aChildren: adoptedChildren
  } = vm;
  recursivelyDisconnectChildren(adoptedChildren);
}
/**
 * The recursion doesn't need to be a complete traversal of the vnode graph,
 * instead it can be partial, when a custom element vnode is found, we don't
 * need to continue into its children because by attempting to disconnect the
 * custom element itself will trigger the removal of anything slotted or anything
 * defined on its shadow.
 */


function recursivelyDisconnectChildren(vnodes) {
  for (let i = 0, len = vnodes.length; i < len; i += 1) {
    const vnode = vnodes[i];

    if (!isNull(vnode) && isArray$1(vnode.children) && !isUndefined$1(vnode.elm)) {
      // vnode is a VElement with children
      if (isUndefined$1(vnode.ctor)) {
        // it is a VElement, just keep looking (recursively)
        recursivelyDisconnectChildren(vnode.children);
      } else {
        // it is a VCustomElement, disconnect it and ignore its children
        resetComponentStateWhenRemoved(getAssociatedVM(vnode.elm));
      }
    }
  }
} // This is a super optimized mechanism to remove the content of the root node (shadow root
// for shadow DOM components and the root element itself for light DOM) without having to go
// into snabbdom. Especially useful when the reset is a consequence of an error, in which case the
// children VNodes might not be representing the current state of the DOM.


function resetComponentRoot(vm) {
  const {
    children,
    renderer
  } = vm;
  const rootNode = getRenderRoot(vm);

  for (let i = 0, len = children.length; i < len; i++) {
    const child = children[i];

    if (!isNull(child) && !isUndefined$1(child.elm)) {
      renderer.remove(child.elm, rootNode);
    }
  }

  vm.children = EmptyArray;
  runChildNodesDisconnectedCallback(vm);
  vm.velements = EmptyArray;
}

function scheduleRehydration(vm) {
  if (isTrue(vm.renderer.ssr) || isTrue(vm.isScheduled)) {
    return;
  }

  vm.isScheduled = true;

  if (rehydrateQueue.length === 0) {
    addCallbackToNextTick(flushRehydrationQueue);
  }

  ArrayPush$1.call(rehydrateQueue, vm);
}

function getErrorBoundaryVM(vm) {
  let currentVm = vm;

  while (!isNull(currentVm)) {
    if (!isUndefined$1(currentVm.def.errorCallback)) {
      return currentVm;
    }

    currentVm = currentVm.owner;
  }
} // slow path routine
// NOTE: we should probably more this routine to the synthetic shadow folder
// and get the allocation to be cached by in the elm instead of in the VM


function allocateInSlot(vm, children) {
  const {
    cmpSlots: oldSlots
  } = vm;
  const cmpSlots = vm.cmpSlots = create(null);

  for (let i = 0, len = children.length; i < len; i += 1) {
    const vnode = children[i];

    if (isNull(vnode)) {
      continue;
    }

    const {
      data
    } = vnode;
    const slotName = data.attrs && data.attrs.slot || '';
    const vnodes = cmpSlots[slotName] = cmpSlots[slotName] || []; // re-keying the vnodes is necessary to avoid conflicts with default content for the slot
    // which might have similar keys. Each vnode will always have a key that
    // starts with a numeric character from compiler. In this case, we add a unique
    // notation for slotted vnodes keys, e.g.: `@foo:1:1`

    if (!isUndefined$1(vnode.key)) {
      vnode.key = `@${slotName}:${vnode.key}`;
    }

    ArrayPush$1.call(vnodes, vnode);
  }

  if (isFalse(vm.isDirty)) {
    // We need to determine if the old allocation is really different from the new one
    // and mark the vm as dirty
    const oldKeys = keys(oldSlots);

    if (oldKeys.length !== keys(cmpSlots).length) {
      markComponentAsDirty(vm);
      return;
    }

    for (let i = 0, len = oldKeys.length; i < len; i += 1) {
      const key = oldKeys[i];

      if (isUndefined$1(cmpSlots[key]) || oldSlots[key].length !== cmpSlots[key].length) {
        markComponentAsDirty(vm);
        return;
      }

      const oldVNodes = oldSlots[key];
      const vnodes = cmpSlots[key];

      for (let j = 0, a = cmpSlots[key].length; j < a; j += 1) {
        if (oldVNodes[j] !== vnodes[j]) {
          markComponentAsDirty(vm);
          return;
        }
      }
    }
  }
}

function runWithBoundaryProtection(vm, owner, pre, job, post) {
  let error;
  pre();

  try {
    job();
  } catch (e) {
    error = Object(e);
  } finally {
    post();

    if (!isUndefined$1(error)) {
      addErrorComponentStack(vm, error);
      const errorBoundaryVm = isNull(owner) ? undefined : getErrorBoundaryVM(owner);

      if (isUndefined$1(errorBoundaryVm)) {
        throw error; // eslint-disable-line no-unsafe-finally
      }

      resetComponentRoot(vm); // remove offenders

      logOperationStart(6
      /* ErrorCallback */
      , vm); // error boundaries must have an ErrorCallback

      const errorCallback = errorBoundaryVm.def.errorCallback;
      invokeComponentCallback(errorBoundaryVm, errorCallback, [error, error.wcStack]);
      logOperationEnd(6
      /* ErrorCallback */
      , vm);
    }
  }
}

function getRenderRoot(vm) {
  return vm.renderMode === 1
  /* Shadow */
  ? vm.cmpRoot : vm.elm;
}
/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */


const DeprecatedWiredElementHost = '$$DeprecatedWiredElementHostKey$$';
const DeprecatedWiredParamsMeta = '$$DeprecatedWiredParamsMetaKey$$';
const WireMetaMap = new Map();

class WireContextRegistrationEvent extends CustomEvent {
  constructor(adapterToken, {
    setNewContext,
    setDisconnectedCallback
  }) {
    super(adapterToken, {
      bubbles: true,
      composed: true
    });
    defineProperties(this, {
      setNewContext: {
        value: setNewContext
      },
      setDisconnectedCallback: {
        value: setDisconnectedCallback
      }
    });
  }

}

function createFieldDataCallback(vm, name) {
  const {
    cmpFields
  } = vm;
  return value => {
    if (value !== vm.cmpFields[name]) {
      // storing the value in the underlying storage
      cmpFields[name] = value;
      componentValueMutated(vm, name);
    }
  };
}

function createMethodDataCallback(vm, method) {
  return value => {
    // dispatching new value into the wired method
    runWithBoundaryProtection(vm, vm.owner, noop, () => {
      // job
      method.call(vm.component, value);
    }, noop);
  };
}

function createConfigWatcher(component, configCallback, callbackWhenConfigIsReady) {
  let hasPendingConfig = false; // creating the reactive observer for reactive params when needed

  const ro = new ReactiveObserver(() => {
    if (hasPendingConfig === false) {
      hasPendingConfig = true; // collect new config in the micro-task

      Promise.resolve().then(() => {
        hasPendingConfig = false; // resetting current reactive params

        ro.reset(); // dispatching a new config due to a change in the configuration

        computeConfigAndUpdate();
      });
    }
  });

  const computeConfigAndUpdate = () => {
    let config;
    ro.observe(() => config = configCallback(component)); // eslint-disable-next-line lwc-internal/no-invalid-todo
    // TODO: dev-mode validation of config based on the adapter.configSchema
    // @ts-ignore it is assigned in the observe() callback

    callbackWhenConfigIsReady(config);
  };

  return {
    computeConfigAndUpdate,
    ro
  };
}

function createContextWatcher(vm, wireDef, callbackWhenContextIsReady) {
  const {
    adapter
  } = wireDef;
  const adapterContextToken = getAdapterToken(adapter);

  if (isUndefined$1(adapterContextToken)) {
    return; // no provider found, nothing to be done
  }

  const {
    elm,
    renderer,
    context: {
      wiredConnecting,
      wiredDisconnecting
    }
  } = vm; // waiting for the component to be connected to formally request the context via the token

  ArrayPush$1.call(wiredConnecting, () => {
    // This event is responsible for connecting the host element with another
    // element in the composed path that is providing contextual data. The provider
    // must be listening for a special dom event with the name corresponding to the value of
    // `adapterContextToken`, which will remain secret and internal to this file only to
    // guarantee that the linkage can be forged.
    const contextRegistrationEvent = new WireContextRegistrationEvent(adapterContextToken, {
      setNewContext(newContext) {
        // eslint-disable-next-line lwc-internal/no-invalid-todo
        // TODO: dev-mode validation of config based on the adapter.contextSchema
        callbackWhenContextIsReady(newContext);
      },

      setDisconnectedCallback(disconnectCallback) {
        // adds this callback into the disconnect bucket so it gets disconnected from parent
        // the the element hosting the wire is disconnected
        ArrayPush$1.call(wiredDisconnecting, disconnectCallback);
      }

    });
    renderer.dispatchEvent(elm, contextRegistrationEvent);
  });
}

function createConnector(vm, name, wireDef) {
  const {
    method,
    adapter,
    configCallback,
    dynamic
  } = wireDef;
  const dataCallback = isUndefined$1(method) ? createFieldDataCallback(vm, name) : createMethodDataCallback(vm, method);
  let context;
  let connector; // Workaround to pass the component element associated to this wire adapter instance.

  defineProperty(dataCallback, DeprecatedWiredElementHost, {
    value: vm.elm
  });
  defineProperty(dataCallback, DeprecatedWiredParamsMeta, {
    value: dynamic
  });
  runWithBoundaryProtection(vm, vm, noop, () => {
    // job
    connector = new adapter(dataCallback);
  }, noop);

  const updateConnectorConfig = config => {
    // every time the config is recomputed due to tracking,
    // this callback will be invoked with the new computed config
    runWithBoundaryProtection(vm, vm, noop, () => {
      // job
      connector.update(config, context);
    }, noop);
  }; // Computes the current wire config and calls the update method on the wire adapter.
  // If it has params, we will need to observe changes in the next tick.


  const {
    computeConfigAndUpdate,
    ro
  } = createConfigWatcher(vm.component, configCallback, updateConnectorConfig); // if the adapter needs contextualization, we need to watch for new context and push it alongside the config

  if (!isUndefined$1(adapter.contextSchema)) {
    createContextWatcher(vm, wireDef, newContext => {
      // every time the context is pushed into this component,
      // this callback will be invoked with the new computed context
      if (context !== newContext) {
        context = newContext; // Note: when new context arrives, the config will be recomputed and pushed along side the new
        // context, this is to preserve the identity characteristics, config should not have identity
        // (ever), while context can have identity

        if (vm.state === 1
        /* connected */
        ) {
          computeConfigAndUpdate();
        }
      }
    });
  }

  return {
    // @ts-ignore the boundary protection executes sync, connector is always defined
    connector,
    computeConfigAndUpdate,
    resetConfigWatcher: () => ro.reset()
  };
}

const AdapterToTokenMap = new Map();

function getAdapterToken(adapter) {
  return AdapterToTokenMap.get(adapter);
}

function storeWiredMethodMeta(descriptor, adapter, configCallback, dynamic) {
  // support for callable adapters
  if (adapter.adapter) {
    adapter = adapter.adapter;
  }

  const method = descriptor.value;
  const def = {
    adapter,
    method,
    configCallback,
    dynamic
  };
  WireMetaMap.set(descriptor, def);
}

function storeWiredFieldMeta(descriptor, adapter, configCallback, dynamic) {
  // support for callable adapters
  if (adapter.adapter) {
    adapter = adapter.adapter;
  }

  const def = {
    adapter,
    configCallback,
    dynamic
  };
  WireMetaMap.set(descriptor, def);
}

function installWireAdapters(vm) {
  const {
    context,
    def: {
      wire
    }
  } = vm;
  const wiredConnecting = context.wiredConnecting = [];
  const wiredDisconnecting = context.wiredDisconnecting = [];

  for (const fieldNameOrMethod in wire) {
    const descriptor = wire[fieldNameOrMethod];
    const wireDef = WireMetaMap.get(descriptor);

    {
      assert.invariant(wireDef, `Internal Error: invalid wire definition found.`);
    }

    if (!isUndefined$1(wireDef)) {
      const {
        connector,
        computeConfigAndUpdate,
        resetConfigWatcher
      } = createConnector(vm, fieldNameOrMethod, wireDef);
      const hasDynamicParams = wireDef.dynamic.length > 0;
      ArrayPush$1.call(wiredConnecting, () => {
        connector.connect();

        if (!runtimeFlags.ENABLE_WIRE_SYNC_EMIT) {
          if (hasDynamicParams) {
            Promise.resolve().then(computeConfigAndUpdate);
            return;
          }
        }

        computeConfigAndUpdate();
      });
      ArrayPush$1.call(wiredDisconnecting, () => {
        connector.disconnect();
        resetConfigWatcher();
      });
    }
  }
}

function connectWireAdapters(vm) {
  const {
    wiredConnecting
  } = vm.context;

  for (let i = 0, len = wiredConnecting.length; i < len; i += 1) {
    wiredConnecting[i]();
  }
}

function disconnectWireAdapters(vm) {
  const {
    wiredDisconnecting
  } = vm.context;
  runWithBoundaryProtection(vm, vm, noop, () => {
    // job
    for (let i = 0, len = wiredDisconnecting.length; i < len; i += 1) {
      wiredDisconnecting[i]();
    }
  }, noop);
}
/* version: 2.7.0 */

/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */


const globalStylesheets = create(null);

{
  // @ts-ignore
  window.__lwcResetGlobalStylesheets = () => {
    for (const key of Object.keys(globalStylesheets)) {
      delete globalStylesheets[key];
    }
  };
}

const globalStylesheetsParentElement = document.head || document.body || document; // This check for constructable stylesheets is similar to Fast's:
// https://github.com/microsoft/fast/blob/d49d1ec/packages/web-components/fast-element/src/dom.ts#L51-L53
// See also: https://github.com/whatwg/webidl/issues/1027#issuecomment-934510070

const supportsConstructableStyleSheets = isFunction$1(CSSStyleSheet.prototype.replaceSync) && isArray$1(document.adoptedStyleSheets);
const styleElements = create(null);
const styleSheets = create(null);
const nodesToStyleSheets = new WeakMap();
let getCustomElement, defineCustomElement, HTMLElementConstructor;

function isCustomElementRegistryAvailable() {
  if (typeof customElements === 'undefined') {
    return false;
  }

  try {
    // dereference HTMLElement global because babel wraps globals in compat mode with a
    // _wrapNativeSuper()
    // This is a problem because LWCUpgradableElement extends renderer.HTMLElement which does not
    // get wrapped by babel.
    const HTMLElementAlias = HTMLElement; // In case we use compat mode with a modern browser, the compat mode transformation
    // invokes the DOM api with an .apply() or .call() to initialize any DOM api sub-classing,
    // which are not equipped to be initialized that way.

    class clazz extends HTMLElementAlias {}

    customElements.define('lwc-test-' + Math.floor(Math.random() * 1000000), clazz);
    new clazz();
    return true;
  } catch (_a) {
    return false;
  }
}

function insertConstructableStyleSheet(content, target) {
  // It's important for CSSStyleSheets to be unique based on their content, so that
  // `shadowRoot.adoptedStyleSheets.includes(sheet)` works.
  let styleSheet = styleSheets[content];

  if (isUndefined$1(styleSheet)) {
    styleSheet = new CSSStyleSheet();
    styleSheet.replaceSync(content);
    styleSheets[content] = styleSheet;
  }

  if (!target.adoptedStyleSheets.includes(styleSheet)) {
    target.adoptedStyleSheets = [...target.adoptedStyleSheets, styleSheet];
  }
}

function insertStyleElement(content, target) {
  // Avoid inserting duplicate `<style>`s
  let sheets = nodesToStyleSheets.get(target);

  if (isUndefined$1(sheets)) {
    sheets = create(null);
    nodesToStyleSheets.set(target, sheets);
  }

  if (sheets[content]) {
    return;
  }

  sheets[content] = true; // This `<style>` may be repeated multiple times in the DOM, so cache it. It's a bit
  // faster to call `cloneNode()` on an existing node than to recreate it every time.

  let elm = styleElements[content];

  if (isUndefined$1(elm)) {
    elm = document.createElement('style');
    elm.type = 'text/css';
    elm.textContent = content;
    styleElements[content] = elm;
  } else {
    elm = elm.cloneNode(true);
  }

  target.appendChild(elm);
}

if (isCustomElementRegistryAvailable()) {
  getCustomElement = customElements.get.bind(customElements);
  defineCustomElement = customElements.define.bind(customElements);
  HTMLElementConstructor = HTMLElement;
} else {
  const registry = create(null);
  const reverseRegistry = new WeakMap();

  defineCustomElement = function define(name, ctor) {
    if (name !== StringToLowerCase.call(name) || registry[name]) {
      throw new TypeError(`Invalid Registration`);
    }

    registry[name] = ctor;
    reverseRegistry.set(ctor, name);
  };

  getCustomElement = function get(name) {
    return registry[name];
  };

  HTMLElementConstructor = function HTMLElement() {
    if (!(this instanceof HTMLElement)) {
      throw new TypeError(`Invalid Invocation`);
    }

    const {
      constructor
    } = this;
    const name = reverseRegistry.get(constructor);

    if (!name) {
      throw new TypeError(`Invalid Construction`);
    }

    const elm = document.createElement(name);
    setPrototypeOf(elm, constructor.prototype);
    return elm;
  };

  HTMLElementConstructor.prototype = HTMLElement.prototype;
}

let isHydrating = false;

const renderer = {
  ssr: false,

  isHydrating() {
    return isHydrating;
  },

  isNativeShadowDefined: _globalThis[KEY__IS_NATIVE_SHADOW_ROOT_DEFINED],
  isSyntheticShadowDefined: hasOwnProperty$1.call(Element.prototype, KEY__SHADOW_TOKEN),

  createElement(tagName, namespace) {
    return isUndefined$1(namespace) ? document.createElement(tagName) : document.createElementNS(namespace, tagName);
  },

  createText(content) {
    return document.createTextNode(content);
  },

  createComment(content) {
    return document.createComment(content);
  },

  insert(node, parent, anchor) {
    parent.insertBefore(node, anchor);
  },

  remove(node, parent) {
    parent.removeChild(node);
  },

  nextSibling(node) {
    return node.nextSibling;
  },

  attachShadow(element, options) {

    return element.attachShadow(options);
  },

  setText(node, content) {
    node.nodeValue = content;
  },

  getProperty(node, key) {
    return node[key];
  },

  setProperty(node, key, value) {
    {
      if (node instanceof Element && !(key in node)) {
        // TODO [#1297]: Move this validation to the compiler
        assert.fail(`Unknown public property "${key}" of element <${node.tagName}>. This is likely a typo on the corresponding attribute "${htmlPropertyToAttribute(key)}".`);
      }
    }

    node[key] = value;
  },

  getAttribute(element, name, namespace) {
    return isUndefined$1(namespace) ? element.getAttribute(name) : element.getAttributeNS(namespace, name);
  },

  setAttribute(element, name, value, namespace) {
    return isUndefined$1(namespace) ? element.setAttribute(name, value) : element.setAttributeNS(namespace, name, value);
  },

  removeAttribute(element, name, namespace) {
    if (isUndefined$1(namespace)) {
      element.removeAttribute(name);
    } else {
      element.removeAttributeNS(namespace, name);
    }
  },

  addEventListener(target, type, callback, options) {
    target.addEventListener(type, callback, options);
  },

  removeEventListener(target, type, callback, options) {
    target.removeEventListener(type, callback, options);
  },

  dispatchEvent(target, event) {
    return target.dispatchEvent(event);
  },

  getClassList(element) {
    return element.classList;
  },

  setCSSStyleProperty(element, name, value, important) {
    // TODO [#0]: How to avoid this type casting? Shall we use a different type interface to
    // represent elements in the engine?
    element.style.setProperty(name, value, important ? 'important' : '');
  },

  getBoundingClientRect(element) {
    return element.getBoundingClientRect();
  },

  querySelector(element, selectors) {
    return element.querySelector(selectors);
  },

  querySelectorAll(element, selectors) {
    return element.querySelectorAll(selectors);
  },

  getElementsByTagName(element, tagNameOrWildCard) {
    return element.getElementsByTagName(tagNameOrWildCard);
  },

  getElementsByClassName(element, names) {
    return element.getElementsByClassName(names);
  },

  getChildren(element) {
    return element.children;
  },

  getChildNodes(element) {
    return element.childNodes;
  },

  getFirstChild(element) {
    return element.firstChild;
  },

  getFirstElementChild(element) {
    return element.firstElementChild;
  },

  getLastChild(element) {
    return element.lastChild;
  },

  getLastElementChild(element) {
    return element.lastElementChild;
  },

  isConnected(node) {
    return node.isConnected;
  },

  insertGlobalStylesheet(content) {
    if (!isUndefined$1(globalStylesheets[content])) {
      return;
    }

    globalStylesheets[content] = true;
    const elm = document.createElement('style');
    elm.type = 'text/css';
    elm.textContent = content;
    globalStylesheetsParentElement.appendChild(elm);
  },

  insertStylesheet(content, target) {
    if (supportsConstructableStyleSheets) {
      insertConstructableStyleSheet(content, target);
    } else {
      // Fall back to <style> element
      insertStyleElement(content, target);
    }
  },

  assertInstanceOfHTMLElement(elm, msg) {
    assert.invariant(elm instanceof HTMLElement, msg);
  },

  defineCustomElement,
  getCustomElement,
  HTMLElement: HTMLElementConstructor
};
/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */
// TODO [#2472]: Remove this workaround when appropriate.
// eslint-disable-next-line lwc-internal/no-global-node

const _Node$1 = Node;
const ConnectingSlot = new WeakMap();
const DisconnectingSlot = new WeakMap();

function callNodeSlot(node, slot) {
  {
    assert.isTrue(node, `callNodeSlot() should not be called for a non-object`);
  }

  const fn = slot.get(node);

  if (!isUndefined$1(fn)) {
    fn(node);
  }

  return node; // for convenience
} // Monkey patching Node methods to be able to detect the insertions and removal of root elements
// created via createElement.


const {
  appendChild,
  insertBefore,
  removeChild,
  replaceChild
} = _Node$1.prototype;
assign(_Node$1.prototype, {
  appendChild(newChild) {
    const appendedNode = appendChild.call(this, newChild);
    return callNodeSlot(appendedNode, ConnectingSlot);
  },

  insertBefore(newChild, referenceNode) {
    const insertedNode = insertBefore.call(this, newChild, referenceNode);
    return callNodeSlot(insertedNode, ConnectingSlot);
  },

  removeChild(oldChild) {
    const removedNode = removeChild.call(this, oldChild);
    return callNodeSlot(removedNode, DisconnectingSlot);
  },

  replaceChild(newChild, oldChild) {
    const replacedNode = replaceChild.call(this, newChild, oldChild);
    callNodeSlot(replacedNode, DisconnectingSlot);
    callNodeSlot(newChild, ConnectingSlot);
    return replacedNode;
  }

});
/**
 * EXPERIMENTAL: This function is almost identical to document.createElement with the slightly
 * difference that in the options, you can pass the `is` property set to a Constructor instead of
 * just a string value. The intent is to allow the creation of an element controlled by LWC without
 * having to register the element as a custom element.
 *
 * @example
 * ```
 * const el = createElement('x-foo', { is: FooCtor });
 * ```
 */

function createElement(sel, options) {
  if (!isObject(options) || isNull(options)) {
    throw new TypeError(`"createElement" function expects an object as second parameter but received "${toString$1(options)}".`);
  }

  const Ctor = options.is;

  if (!isFunction$1(Ctor)) {
    throw new TypeError(`"createElement" function expects an "is" option with a valid component constructor.`);
  }

  const UpgradableConstructor = getUpgradableConstructor(sel, renderer);
  let wasComponentUpgraded = false; // the custom element from the registry is expecting an upgrade callback

  /**
   * Note: if the upgradable constructor does not expect, or throw when we new it
   * with a callback as the first argument, we could implement a more advanced
   * mechanism that only passes that argument if the constructor is known to be
   * an upgradable custom element.
   */

  const element = new UpgradableConstructor(elm => {
    const def = getComponentInternalDef(Ctor);
    createVM(elm, def, {
      tagName: sel,
      mode: options.mode !== 'closed' ? 'open' : 'closed',
      owner: null,
      renderer
    });
    ConnectingSlot.set(elm, connectRootElement);
    DisconnectingSlot.set(elm, disconnectRootElement);
    wasComponentUpgraded = true;
  });

  if (!wasComponentUpgraded) {
    /* eslint-disable-next-line no-console */
    console.error(`Unexpected tag name "${sel}". This name is a registered custom element, preventing LWC to upgrade the element.`);
  }

  return element;
}

function buildCustomElementConstructor(Ctor) {
  const def = getComponentInternalDef(Ctor);
  return class extends def.bridge {
    constructor() {
      super();
      createVM(this, def, {
        mode: 'open',
        owner: null,
        tagName: this.tagName,
        renderer
      });
    }

    connectedCallback() {
      connectRootElement(this);
    }

    disconnectedCallback() {
      disconnectRootElement(this);
    }

  };
}
/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */


const ComponentConstructorToCustomElementConstructorMap = new Map();

function getCustomElementConstructor(Ctor) {
  if (Ctor === LightningElement) {
    throw new TypeError(`Invalid Constructor. LightningElement base class can't be claimed as a custom element.`);
  }

  let ce = ComponentConstructorToCustomElementConstructorMap.get(Ctor);

  if (isUndefined$1(ce)) {
    ce = buildCustomElementConstructor(Ctor);
    ComponentConstructorToCustomElementConstructorMap.set(Ctor, ce);
  }

  return ce;
}
/**
 * This static getter builds a Web Component class from a LWC constructor so it can be registered
 * as a new element via customElements.define() at any given time. E.g.:
 *
 *      import Foo from 'ns/foo';
 *      customElements.define('x-foo', Foo.CustomElementConstructor);
 *      const elm = document.createElement('x-foo');
 *
 */


defineProperty(LightningElement, 'CustomElementConstructor', {
  get() {
    return getCustomElementConstructor(this);
  }

});
freeze(LightningElement);
seal(LightningElement.prototype);
/* version: 2.7.0 */

function stylesheet$8(token, useActualHostSelector, useNativeDirPseudoclass) {
  var shadowSelector = token ? ("[" + token + "]") : "";
  return ["*", shadowSelector, " {margin: 0;padding: 0;font-size: 24px;}button", shadowSelector, "{font-size: 2vw;border-radius: 5px;padding: 5px;cursor: pointer;}button:hover", shadowSelector, "{background-color: rgb(180, 180, 180);}.innerContainer", shadowSelector, "{display: flex;justify-content: space-between;width: 60%;height: 100%;min-height: 100%;margin: auto auto;}@media only screen and (max-width: 700px) {.innerContainer", shadowSelector, "{width: 100%;}}"].join('');
}
var stylesheet0 = [stylesheet$8];

function stylesheet$7(token, useActualHostSelector, useNativeDirPseudoclass) {
  var shadowSelector = token ? ("[" + token + "]") : "";
  return [".body", shadowSelector, " {background-color: #3ABBC9 ;top: 50px;height: calc(100vh - 100px);}"].join('');
}
var _implicitStylesheets$7 = [stylesheet0, stylesheet$7];

function stylesheet$6(token, useActualHostSelector, useNativeDirPseudoclass) {
  var shadowSelector = token ? ("[" + token + "]") : "";
  return ["header", shadowSelector, " {display: flex;justify-content: space-between;background: #ED5314 ;height: 50px;box-shadow: 0 6px 8px rgb(0 0 0 / 20%);}img", shadowSelector, "{height: 50px;}"].join('');
}
var _implicitStylesheets$6 = [stylesheet0, stylesheet$6];

function tmpl$7($api, $cmp, $slotset, $ctx) {
  const {h: api_element, d: api_dynamic_text, t: api_text} = $api;
  return [api_element("header", {
    key: 0
  }, [api_element("div", {
    classMap: {
      "innerContainer": true
    },
    key: 1
  }, [api_element("img", {
    attrs: {
      "src": "../../../resources/img/top3.jpeg",
      "alt": "top3"
    },
    key: 2
  }, []), api_element("div", {
    classMap: {
      "gamenum": true
    },
    key: 3
  }, [api_text("GameID: " + api_dynamic_text($cmp.sessiongamenum))]), api_element("div", {
    classMap: {
      "userid": true
    },
    key: 4
  }, [api_text(api_dynamic_text($cmp.hostOrPlayer) + ": " + api_dynamic_text($cmp.sessionusername))])])])];
}
var _tmpl$7 = registerTemplate(tmpl$7);
tmpl$7.stylesheets = [];


if (_implicitStylesheets$6) {
  tmpl$7.stylesheets.push.apply(tmpl$7.stylesheets, _implicitStylesheets$6);
}
tmpl$7.stylesheetToken = "ui-header_header";

class Header extends LightningElement {
  constructor(...args) {
    super(...args);
    this.sessiongamenum = void 0;
    this.sessionusername = void 0;
    this.hostOrPlayer = 'Player';
  }

  updateHost() {
    this.hostOrPlayer = 'Host';
  }

}

registerDecorators(Header, {
  publicProps: {
    sessiongamenum: {
      config: 0
    },
    sessionusername: {
      config: 0
    }
  },
  publicMethods: ["updateHost"],
  fields: ["hostOrPlayer"]
});

var _uiHeader = registerComponent(Header, {
  tmpl: _tmpl$7
});

function stylesheet$5(token, useActualHostSelector, useNativeDirPseudoclass) {
  var shadowSelector = token ? ("[" + token + "]") : "";
  return ["lobby", shadowSelector, " {padding: 1rem;}div", shadowSelector, ", button", shadowSelector, ", label", shadowSelector, ", input", shadowSelector, " {font-size: 3vh;}"].join('');
}
var _implicitStylesheets$5 = [stylesheet0, stylesheet$5];

function tmpl$6($api, $cmp, $slotset, $ctx) {
  const {h: api_element, b: api_bind, t: api_text, d: api_dynamic_text, gid: api_scoped_id} = $api;
  const {_m0, _m1, _m2} = $ctx;
  return [api_element("lobby", {
    key: 0
  }, [api_element("br", {
    key: 1
  }, []), api_element("button", {
    key: 2,
    on: {
      "click": _m0 || ($ctx._m0 = api_bind($cmp.loginRegister))
    }
  }, [api_text("Login/Register")]), api_element("br", {
    key: 3
  }, []), api_element("button", {
    key: 4,
    on: {
      "click": _m1 || ($ctx._m1 = api_bind($cmp.newGame))
    }
  }, [api_text("New Game")]), api_element("br", {
    key: 5
  }, []), api_element("div", {
    classMap: {
      "label": true
    },
    key: 6
  }, [api_text("GameID: " + api_dynamic_text($cmp.gameNum))]), api_element("br", {
    key: 7
  }, []), api_element("button", {
    attrs: {
      "data-id": "joinGameBtn"
    },
    key: 8,
    on: {
      "click": _m2 || ($ctx._m2 = api_bind($cmp.joinGame))
    }
  }, [api_text("Join Game")]), api_element("br", {
    key: 9
  }, []), api_element("label", {
    attrs: {
      "for": api_scoped_id("gameNumInput")
    },
    key: 10
  }, [api_text("GameID: ")]), api_element("input", {
    attrs: {
      "type": "text",
      "data-id": "gameNumInput",
      "id": api_scoped_id("gameNumInput")
    },
    key: 11
  }, []), api_element("br", {
    key: 12
  }, []), api_element("br", {
    key: 13
  }, [])])];
}
var _tmpl$6 = registerTemplate(tmpl$6);
tmpl$6.stylesheets = [];


if (_implicitStylesheets$5) {
  tmpl$6.stylesheets.push.apply(tmpl$6.stylesheets, _implicitStylesheets$5);
}
tmpl$6.stylesheetToken = "ui-lobby_lobby";

function createNewGame(userid) {
  const gameInfo = {
    userid
  };
  return fetch('/api/game', {
    method: 'post',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(gameInfo)
  }).then(function (response) {
    return response.json();
  });
}
function playerJoinGame(userid, gamenum, host) {
  let gameid36;
  let gameResp; // need to get game by 6 digit id first...

  return fetch(`/api/game/${gamenum}`, {
    method: 'get',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  }).then(response => response.json()).then(data => {
    gameid36 = data.rows[0].id; //id(36)

    gameResp = data.rows[0];
  }) // insert player record
  .then(() => {
    const playerInfo = {
      userid,
      gamenum,
      gameid36,
      host
    };
    return fetch('/api/game/join', {
      method: 'post',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(playerInfo)
    }).then(function (response) {
      return gameResp;
    });
  });
}

const SESSIONSTATES = Object.freeze({
  IN_LOBBY: 'InLobby',
  IN_LOGIN: 'InLogin',
  IN_NEWGAME: 'InNewGame',
  IN_JOIN_GAME: 'InJoinGame',
  IN_WAITING_GAME_START: 'InWaitingGameStart',
  ENTER_TOP3: 'EnterTop3',
  SUBMIT_VOTE: 'SubmitVote',
  REVEAL_ANSWER: 'RevealAnswer',
  GAME_RESULTS: 'GameResults'
}); //session is single-user, game is multi-user

const initUserId = 'anonymous-' + Math.floor(Math.random() * 10000);
const SESSION = {
  "userId": "notset",
  "userName": initUserId,
  "sessionState": SESSIONSTATES.IN_LOBBY,
  "gameId": "notset",
  "gameNum": "notset",
  "gameState": "notset",
  "host": false,
  "authenticated": false,
  "question1": "notset",
  "question2": "notset",
  "question3": "notset",
  "gameScore": 0
};

class Lobby extends LightningElement {
  constructor(...args) {
    super(...args);
    this.gameNum = void 0;
  }

  //for ui update
  loginRegister() {
    this.dispatchEvent(new CustomEvent('state_change', {
      detail: {
        name: 'LoginRegister'
      }
    }));
  }

  newGame() {
    //pass in username, return game object with host:userid and gamenum
    createNewGame(SESSION.userId).then(response => {
      SESSION.gameNum = response.gamenum;
      SESSION.gameId = response.id;
      SESSION.gameState = response.gamestate;
    }).catch(e => console.error('lobby createNewGame', e.stack)).then(() => {
      this.joinGame();
    }).then(() => {
      // lwc event - handled by app.js
      this.dispatchEvent(new CustomEvent('state_change', {
        detail: {
          name: 'NewGame',
          gamenum: SESSION.gameNum,
          userid: SESSION.userId
        }
      }));
    });
  }

  joinGame(event) {
    //if join game get the game id, if not it's create game and set host = true
    if (event != null) {
      if (event.target.dataset.id = 'joinGameBtn') {
        SESSION.gameNum = this.template.querySelector('[data-id="gameNumInput"]').value;
      }
    } else {
      SESSION.host = true;
    }

    playerJoinGame(SESSION.userId, SESSION.gameNum, SESSION.host).then(response => {
      SESSION.gameState = response.gamestate;
      this.gameNum = response.gamenum; //update ui
    }).catch(e => console.error('lobby.createNewGame', e.stack)).then(() => {
      // lwc event - handled by app.js
      this.dispatchEvent(new CustomEvent('state_change', {
        detail: {
          name: 'JoinedGame',
          gamenum: SESSION.gameNum,
          userid: SESSION.userId
        }
      }));
    });
  }

}

registerDecorators(Lobby, {
  fields: ["gameNum"]
});

var _uiLobby = registerComponent(Lobby, {
  tmpl: _tmpl$6
});

function stylesheet$4(token, useActualHostSelector, useNativeDirPseudoclass) {
  var shadowSelector = token ? ("[" + token + "]") : "";
  return ["login", shadowSelector, " {padding: 1rem;}div", shadowSelector, ", button", shadowSelector, ", label", shadowSelector, ", input", shadowSelector, " {font-size: 3vh;}"].join('');
}
var _implicitStylesheets$4 = [stylesheet0, stylesheet$4];

function tmpl$5($api, $cmp, $slotset, $ctx) {
  const {b: api_bind, t: api_text, h: api_element, gid: api_scoped_id} = $api;
  const {_m0, _m1} = $ctx;
  return [api_element("login", {
    key: 0
  }, [api_element("button", {
    key: 1,
    on: {
      "click": _m0 || ($ctx._m0 = api_bind($cmp.login))
    }
  }, [api_text("Login")]), api_element("button", {
    key: 2,
    on: {
      "click": _m1 || ($ctx._m1 = api_bind($cmp.register))
    }
  }, [api_text("Register")]), api_element("br", {
    key: 3
  }, []), api_element("label", {
    attrs: {
      "for": api_scoped_id("userIdInput")
    },
    key: 4
  }, [api_text("UserID: ")]), api_element("input", {
    attrs: {
      "type": "text",
      "data-id": "userIdInput",
      "id": api_scoped_id("userIdInput")
    },
    key: 5
  }, []), api_element("br", {
    key: 6
  }, []), api_element("br", {
    key: 7
  }, []), api_element("label", {
    attrs: {
      "for": api_scoped_id("pwdInput")
    },
    key: 8
  }, [api_text("Pwd: ")]), api_element("input", {
    attrs: {
      "type": "password",
      "data-id": "pwdInput",
      "id": api_scoped_id("pwdInput")
    },
    key: 9
  }, []), api_element("br", {
    key: 10
  }, []), api_element("br", {
    key: 11
  }, [])])];
}
var _tmpl$5 = registerTemplate(tmpl$5);
tmpl$5.stylesheets = [];


if (_implicitStylesheets$4) {
  tmpl$5.stylesheets.push.apply(tmpl$5.stylesheets, _implicitStylesheets$4);
}
tmpl$5.stylesheetToken = "ui-login_login";

function userRegistration(username, pwd) {
  const userInfo = {
    username,
    pwd
  };
  return fetch('/api/user/register', {
    method: 'post',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(userInfo)
  }).then(function (response) {
    return response.json();
  });
}
function userLogin(username, pwd) {
  const userInfo = {
    username,
    pwd
  };
  return fetch('/api/user/login', {
    method: 'post',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(userInfo)
  }).then(response => response.json()).then(data => {
    return data;
  });
}

class Login extends LightningElement {
  constructor(...args) {
    super(...args);
    this.inputUserName = void 0;
    this.inputPwd = void 0;
    this.eventType = void 0;
    this.eventDetail = void 0;
  }

  register() {
    this.inputUserName = this.template.querySelector('[data-id="userIdInput"]').value;
    this.inputPwd = this.template.querySelector('[data-id="pwdInput"]').value;
    userRegistration(this.inputUserName, this.inputPwd).then(response => {
      SESSION.userId = response.id;
      SESSION.userName = response.username;
      SESSION.authenticated = true;
    }).catch(e => console.error('login.userRegistration', e.stack)).then(() => {
      // lwc event - handled by app.js
      this.dispatchEvent(new CustomEvent('state_change', {
        detail: {
          name: 'LoggedIn',
          userid: SESSION.userName
        }
      }));
    });
  }

  login() {
    this.inputUserName = this.template.querySelector('[data-id="userIdInput"]').value;
    this.inputPwd = this.template.querySelector('[data-id="pwdInput"]').value;
    userLogin(this.inputUserName, this.inputPwd).then(response => {
      if (response.rowCount == 1) {
        SESSION.userId = response.rows[0].id;
        SESSION.userName = response.rows[0].username;
        SESSION.authenticated = true;
        this.eventType = 'state_change';
        this.eventDetail = {
          name: 'LoggedIn',
          userid: SESSION.userName
        };
      } else {
        this.eventType = 'error_message';
        this.eventDetail = {
          name: 'raiseUIError',
          errormsg: 'Incorrect username and password'
        }; // alert('Incorrect username and password');
      }
    }).catch(e => console.error('login.userLogin', e.stack)).then(() => {
      // lwc event - handled by app.js
      this.dispatchEvent(new CustomEvent(this.eventType, {
        detail: this.eventDetail
      }));
    });
  }

}

registerDecorators(Login, {
  fields: ["inputUserName", "inputPwd", "eventType", "eventDetail"]
});

var _uiLogin = registerComponent(Login, {
  tmpl: _tmpl$5
});

function stylesheet$3(token, useActualHostSelector, useNativeDirPseudoclass) {
  var shadowSelector = token ? ("[" + token + "]") : "";
  return ["newgame", shadowSelector, " {padding: 1rem;}div", shadowSelector, ", button", shadowSelector, ", label", shadowSelector, ", input", shadowSelector, " {font-size: 3vh;}"].join('');
}
var _implicitStylesheets$3 = [stylesheet0, stylesheet$3];

function tmpl$4($api, $cmp, $slotset, $ctx) {
  const {t: api_text, h: api_element, d: api_dynamic_text, b: api_bind} = $api;
  const {_m0, _m1} = $ctx;
  return [api_element("newgame", {
    key: 0
  }, [api_element("h2", {
    key: 1
  }, [api_text("newgame html")]), api_element("div", {
    key: 2
  }, [api_text("Player List: ")]), api_element("div", {
    key: 3
  }, [api_text(api_dynamic_text($cmp.playerlist))]), api_element("button", {
    key: 4,
    on: {
      "click": _m0 || ($ctx._m0 = api_bind($cmp.startGame))
    }
  }, [api_text("Start Game")]), api_element("button", {
    key: 5,
    on: {
      "click": _m1 || ($ctx._m1 = api_bind($cmp.endGame))
    }
  }, [api_text("End Game")])])];
}
var _tmpl$4 = registerTemplate(tmpl$4);
tmpl$4.stylesheets = [];


if (_implicitStylesheets$3) {
  tmpl$4.stylesheets.push.apply(tmpl$4.stylesheets, _implicitStylesheets$3);
}
tmpl$4.stylesheetToken = "ui-newgame_newgame";

class NewGame$1 extends LightningElement {
  constructor(...args) {
    super(...args);
    this.playerlist = void 0;
  }

  //for ui update
  startGame(e) {
    this.dispatchEvent(new CustomEvent('state_change', {
      detail: {
        name: 'GameStarted'
      }
    }));
  }

  endGame(e) {
    this.dispatchEvent(new CustomEvent('state_change', {
      detail: {
        name: 'GameEnded'
      }
    }));
  }

}

registerDecorators(NewGame$1, {
  publicProps: {
    playerlist: {
      config: 0
    }
  }
});

var _uiNewgame = registerComponent(NewGame$1, {
  tmpl: _tmpl$4
});

function stylesheet$2(token, useActualHostSelector, useNativeDirPseudoclass) {
  var shadowSelector = token ? ("[" + token + "]") : "";
  return ["waitinggame", shadowSelector, " {padding: 1rem;}div", shadowSelector, ", button", shadowSelector, ", label", shadowSelector, ", input", shadowSelector, " {font-size: 3vh;}"].join('');
}
var _implicitStylesheets$2 = [stylesheet0, stylesheet$2];

function tmpl$3($api, $cmp, $slotset, $ctx) {
  const {t: api_text, h: api_element} = $api;
  return [api_element("waitinggame", {
    key: 0
  }, [api_element("h2", {
    key: 1
  }, [api_text("waitinggame html")]), api_element("div", {
    key: 2
  }, [api_text("Waiting for game to start...")])])];
}
var _tmpl$3 = registerTemplate(tmpl$3);
tmpl$3.stylesheets = [];


if (_implicitStylesheets$2) {
  tmpl$3.stylesheets.push.apply(tmpl$3.stylesheets, _implicitStylesheets$2);
}
tmpl$3.stylesheetToken = "ui-waitinggame_waitinggame";

class NewGame extends LightningElement {}

var _uiWaitinggame = registerComponent(NewGame, {
  tmpl: _tmpl$3
});

function stylesheet$1(token, useActualHostSelector, useNativeDirPseudoclass) {
  var shadowSelector = token ? ("[" + token + "]") : "";
  return ["errormsg", shadowSelector, " {padding: 1rem;}div", shadowSelector, ", button", shadowSelector, ", label", shadowSelector, ", input", shadowSelector, " {font-size: 3vh;}"].join('');
}
var _implicitStylesheets$1 = [stylesheet0, stylesheet$1];

function tmpl$2($api, $cmp, $slotset, $ctx) {
  const {d: api_dynamic_text, t: api_text, h: api_element} = $api;
  return [api_element("errormsg", {
    key: 0
  }, [api_element("h3", {
    classMap: {
      "error": true
    },
    key: 1
  }, [api_text("Error: " + api_dynamic_text($cmp.errormsg))])])];
}
var _tmpl$2 = registerTemplate(tmpl$2);
tmpl$2.stylesheets = [];


if (_implicitStylesheets$1) {
  tmpl$2.stylesheets.push.apply(tmpl$2.stylesheets, _implicitStylesheets$1);
}
tmpl$2.stylesheetToken = "ui-errormsg_errormsg";

class ErrogMsg extends LightningElement {
  constructor(...args) {
    super(...args);
    this.errormsg = void 0;
  }

}

registerDecorators(ErrogMsg, {
  publicProps: {
    errormsg: {
      config: 0
    }
  }
});

var _uiErrormsg = registerComponent(ErrogMsg, {
  tmpl: _tmpl$2
});

function stylesheet(token, useActualHostSelector, useNativeDirPseudoclass) {
  var shadowSelector = token ? ("[" + token + "]") : "";
  return ["footer", shadowSelector, " {display: flex;align-items: stretch;justify-content: space-between;background: #ffcf40;height: 50px;}"].join('');
}
var _implicitStylesheets = [stylesheet0, stylesheet];

function tmpl$1($api, $cmp, $slotset, $ctx) {
  const {d: api_dynamic_text, t: api_text, h: api_element} = $api;
  return [api_element("footer", {
    key: 0
  }, [api_element("div", {
    classMap: {
      "innerContainer": true
    },
    key: 1
  }, [api_element("div", {
    key: 2
  }, [api_text("Players: " + api_dynamic_text($cmp.playercount))]), api_element("div", {
    key: 3
  }, [api_text("Score: " + api_dynamic_text($cmp.playerscore))])])])];
}
var _tmpl$1 = registerTemplate(tmpl$1);
tmpl$1.stylesheets = [];


if (_implicitStylesheets) {
  tmpl$1.stylesheets.push.apply(tmpl$1.stylesheets, _implicitStylesheets);
}
tmpl$1.stylesheetToken = "ui-footer_footer";

class Footer extends LightningElement {
  constructor(...args) {
    super(...args);
    this.playercount = void 0;
    this.playerscore = void 0;
  }

  printSession(e) {
    // console.log(JSON.stringify(SESSION));
    console.log(SESSION);
  }

}

registerDecorators(Footer, {
  publicProps: {
    playercount: {
      config: 0
    },
    playerscore: {
      config: 0
    }
  }
});

var _uiFooter = registerComponent(Footer, {
  tmpl: _tmpl$1
});

function tmpl($api, $cmp, $slotset, $ctx) {
  const {c: api_custom_element, b: api_bind, h: api_element} = $api;
  const {_m0, _m1, _m2, _m3, _m4} = $ctx;
  return [api_custom_element("ui-header", _uiHeader, {
    props: {
      "sessiongamenum": $cmp.sessionGameNum,
      "sessionusername": $cmp.sessionUserName
    },
    key: 0
  }, []), api_element("div", {
    classMap: {
      "body": true
    },
    key: 1
  }, [api_element("div", {
    classMap: {
      "innerContainer": true
    },
    key: 2
  }, [$cmp.isInLobbyState ? api_custom_element("ui-lobby", _uiLobby, {
    key: 3,
    on: {
      "state_change": _m0 || ($ctx._m0 = api_bind($cmp.handleStateChange))
    }
  }, []) : null, $cmp.isLoginRegState ? api_custom_element("ui-login", _uiLogin, {
    key: 4,
    on: {
      "state_change": _m1 || ($ctx._m1 = api_bind($cmp.handleStateChange)),
      "error_message": _m2 || ($ctx._m2 = api_bind($cmp.handleErrorMessage))
    }
  }, []) : null, $cmp.isNewGameState ? api_custom_element("ui-newgame", _uiNewgame, {
    props: {
      "playerlist": $cmp.gamePlayerList
    },
    key: 5,
    on: {
      "state_change": _m3 || ($ctx._m3 = api_bind($cmp.handleStateChange))
    }
  }, []) : null, $cmp.isJoinedGameState ? api_custom_element("ui-waitinggame", _uiWaitinggame, {
    key: 6,
    on: {
      "state_change": _m4 || ($ctx._m4 = api_bind($cmp.handleStateChange))
    }
  }, []) : null, $cmp.isErrorMessage ? api_custom_element("ui-errormsg", _uiErrormsg, {
    props: {
      "errormsg": $cmp.errorMessage
    },
    key: 7
  }, []) : null])]), api_custom_element("ui-footer", _uiFooter, {
    props: {
      "playerscore": $cmp.gamePlayerScore,
      "playercount": $cmp.gamePlayerCount
    },
    key: 8
  }, [])];
}
var _tmpl = registerTemplate(tmpl);
tmpl.stylesheets = [];


if (_implicitStylesheets$7) {
  tmpl.stylesheets.push.apply(tmpl.stylesheets, _implicitStylesheets$7);
}
tmpl.stylesheetToken = "ui-app_app";

var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

var socket_io = {exports: {}};

/*!
 * Socket.IO v4.4.1
 * (c) 2014-2022 Guillermo Rauch
 * Released under the MIT License.
 */

(function (module, exports) {
(function (global, factory) {
  module.exports = factory() ;
})(commonjsGlobal, function () {

  function _typeof(obj) {
    "@babel/helpers - typeof";

    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
      _typeof = function (obj) {
        return typeof obj;
      };
    } else {
      _typeof = function (obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
      };
    }

    return _typeof(obj);
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  function _extends() {
    _extends = Object.assign || function (target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];

        for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }

      return target;
    };

    return _extends.apply(this, arguments);
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function");
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        writable: true,
        configurable: true
      }
    });
    if (superClass) _setPrototypeOf(subClass, superClass);
  }

  function _getPrototypeOf(o) {
    _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
      return o.__proto__ || Object.getPrototypeOf(o);
    };
    return _getPrototypeOf(o);
  }

  function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
      o.__proto__ = p;
      return o;
    };

    return _setPrototypeOf(o, p);
  }

  function _isNativeReflectConstruct() {
    if (typeof Reflect === "undefined" || !Reflect.construct) return false;
    if (Reflect.construct.sham) return false;
    if (typeof Proxy === "function") return true;

    try {
      Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
      return true;
    } catch (e) {
      return false;
    }
  }

  function _assertThisInitialized(self) {
    if (self === void 0) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return self;
  }

  function _possibleConstructorReturn(self, call) {
    if (call && (typeof call === "object" || typeof call === "function")) {
      return call;
    } else if (call !== void 0) {
      throw new TypeError("Derived constructors may only return object or undefined");
    }

    return _assertThisInitialized(self);
  }

  function _createSuper(Derived) {
    var hasNativeReflectConstruct = _isNativeReflectConstruct();

    return function _createSuperInternal() {
      var Super = _getPrototypeOf(Derived),
          result;

      if (hasNativeReflectConstruct) {
        var NewTarget = _getPrototypeOf(this).constructor;

        result = Reflect.construct(Super, arguments, NewTarget);
      } else {
        result = Super.apply(this, arguments);
      }

      return _possibleConstructorReturn(this, result);
    };
  }

  function _superPropBase(object, property) {
    while (!Object.prototype.hasOwnProperty.call(object, property)) {
      object = _getPrototypeOf(object);
      if (object === null) break;
    }

    return object;
  }

  function _get(target, property, receiver) {
    if (typeof Reflect !== "undefined" && Reflect.get) {
      _get = Reflect.get;
    } else {
      _get = function _get(target, property, receiver) {
        var base = _superPropBase(target, property);

        if (!base) return;
        var desc = Object.getOwnPropertyDescriptor(base, property);

        if (desc.get) {
          return desc.get.call(receiver);
        }

        return desc.value;
      };
    }

    return _get(target, property, receiver || target);
  }

  function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
  }

  function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;

    for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

    return arr2;
  }

  function _createForOfIteratorHelper(o, allowArrayLike) {
    var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];

    if (!it) {
      if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
        if (it) o = it;
        var i = 0;

        var F = function () {};

        return {
          s: F,
          n: function () {
            if (i >= o.length) return {
              done: true
            };
            return {
              done: false,
              value: o[i++]
            };
          },
          e: function (e) {
            throw e;
          },
          f: F
        };
      }

      throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }

    var normalCompletion = true,
        didErr = false,
        err;
    return {
      s: function () {
        it = it.call(o);
      },
      n: function () {
        var step = it.next();
        normalCompletion = step.done;
        return step;
      },
      e: function (e) {
        didErr = true;
        err = e;
      },
      f: function () {
        try {
          if (!normalCompletion && it.return != null) it.return();
        } finally {
          if (didErr) throw err;
        }
      }
    };
  }
  /**
   * Parses an URI
   *
   * @author Steven Levithan <stevenlevithan.com> (MIT license)
   * @api private
   */


  var re = /^(?:(?![^:@]+:[^:@\/]*@)(http|https|ws|wss):\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?((?:[a-f0-9]{0,4}:){2,7}[a-f0-9]{0,4}|[^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/;
  var parts = ['source', 'protocol', 'authority', 'userInfo', 'user', 'password', 'host', 'port', 'relative', 'path', 'directory', 'file', 'query', 'anchor'];

  var parseuri = function parseuri(str) {
    var src = str,
        b = str.indexOf('['),
        e = str.indexOf(']');

    if (b != -1 && e != -1) {
      str = str.substring(0, b) + str.substring(b, e).replace(/:/g, ';') + str.substring(e, str.length);
    }

    var m = re.exec(str || ''),
        uri = {},
        i = 14;

    while (i--) {
      uri[parts[i]] = m[i] || '';
    }

    if (b != -1 && e != -1) {
      uri.source = src;
      uri.host = uri.host.substring(1, uri.host.length - 1).replace(/;/g, ':');
      uri.authority = uri.authority.replace('[', '').replace(']', '').replace(/;/g, ':');
      uri.ipv6uri = true;
    }

    uri.pathNames = pathNames(uri, uri['path']);
    uri.queryKey = queryKey(uri, uri['query']);
    return uri;
  };

  function pathNames(obj, path) {
    var regx = /\/{2,9}/g,
        names = path.replace(regx, "/").split("/");

    if (path.substr(0, 1) == '/' || path.length === 0) {
      names.splice(0, 1);
    }

    if (path.substr(path.length - 1, 1) == '/') {
      names.splice(names.length - 1, 1);
    }

    return names;
  }

  function queryKey(uri, query) {
    var data = {};
    query.replace(/(?:^|&)([^&=]*)=?([^&]*)/g, function ($0, $1, $2) {
      if ($1) {
        data[$1] = $2;
      }
    });
    return data;
  }
  /**
   * URL parser.
   *
   * @param uri - url
   * @param path - the request path of the connection
   * @param loc - An object meant to mimic window.location.
   *        Defaults to window.location.
   * @public
   */


  function url(uri) {
    var path = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";
    var loc = arguments.length > 2 ? arguments[2] : undefined;
    var obj = uri; // default to window.location

    loc = loc || typeof location !== "undefined" && location;
    if (null == uri) uri = loc.protocol + "//" + loc.host; // relative path support

    if (typeof uri === "string") {
      if ("/" === uri.charAt(0)) {
        if ("/" === uri.charAt(1)) {
          uri = loc.protocol + uri;
        } else {
          uri = loc.host + uri;
        }
      }

      if (!/^(https?|wss?):\/\//.test(uri)) {
        if ("undefined" !== typeof loc) {
          uri = loc.protocol + "//" + uri;
        } else {
          uri = "https://" + uri;
        }
      } // parse


      obj = parseuri(uri);
    } // make sure we treat `localhost:80` and `localhost` equally


    if (!obj.port) {
      if (/^(http|ws)$/.test(obj.protocol)) {
        obj.port = "80";
      } else if (/^(http|ws)s$/.test(obj.protocol)) {
        obj.port = "443";
      }
    }

    obj.path = obj.path || "/";
    var ipv6 = obj.host.indexOf(":") !== -1;
    var host = ipv6 ? "[" + obj.host + "]" : obj.host; // define unique id

    obj.id = obj.protocol + "://" + host + ":" + obj.port + path; // define href

    obj.href = obj.protocol + "://" + host + (loc && loc.port === obj.port ? "" : ":" + obj.port);
    return obj;
  }

  var hasCors = {
    exports: {}
  };
  /**
   * Module exports.
   *
   * Logic borrowed from Modernizr:
   *
   *   - https://github.com/Modernizr/Modernizr/blob/master/feature-detects/cors.js
   */

  try {
    hasCors.exports = typeof XMLHttpRequest !== 'undefined' && 'withCredentials' in new XMLHttpRequest();
  } catch (err) {
    // if XMLHttp support is disabled in IE then it will throw
    // when trying to create
    hasCors.exports = false;
  }

  var hasCORS = hasCors.exports;

  var globalThis = function () {
    if (typeof self !== "undefined") {
      return self;
    } else if (typeof window !== "undefined") {
      return window;
    } else {
      return Function("return this")();
    }
  }(); // browser shim for xmlhttprequest module


  function XMLHttpRequest$1(opts) {
    var xdomain = opts.xdomain; // XMLHttpRequest can be disabled on IE

    try {
      if ("undefined" !== typeof XMLHttpRequest && (!xdomain || hasCORS)) {
        return new XMLHttpRequest();
      }
    } catch (e) {}

    if (!xdomain) {
      try {
        return new globalThis[["Active"].concat("Object").join("X")]("Microsoft.XMLHTTP");
      } catch (e) {}
    }
  }

  function pick(obj) {
    for (var _len = arguments.length, attr = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      attr[_key - 1] = arguments[_key];
    }

    return attr.reduce(function (acc, k) {
      if (obj.hasOwnProperty(k)) {
        acc[k] = obj[k];
      }

      return acc;
    }, {});
  } // Keep a reference to the real timeout functions so they can be used when overridden


  var NATIVE_SET_TIMEOUT = setTimeout;
  var NATIVE_CLEAR_TIMEOUT = clearTimeout;

  function installTimerFunctions(obj, opts) {
    if (opts.useNativeTimers) {
      obj.setTimeoutFn = NATIVE_SET_TIMEOUT.bind(globalThis);
      obj.clearTimeoutFn = NATIVE_CLEAR_TIMEOUT.bind(globalThis);
    } else {
      obj.setTimeoutFn = setTimeout.bind(globalThis);
      obj.clearTimeoutFn = clearTimeout.bind(globalThis);
    }
  }
  /**
   * Expose `Emitter`.
   */


  var Emitter_1 = Emitter;
  /**
   * Initialize a new `Emitter`.
   *
   * @api public
   */

  function Emitter(obj) {
    if (obj) return mixin(obj);
  }
  /**
   * Mixin the emitter properties.
   *
   * @param {Object} obj
   * @return {Object}
   * @api private
   */


  function mixin(obj) {
    for (var key in Emitter.prototype) {
      obj[key] = Emitter.prototype[key];
    }

    return obj;
  }
  /**
   * Listen on the given `event` with `fn`.
   *
   * @param {String} event
   * @param {Function} fn
   * @return {Emitter}
   * @api public
   */


  Emitter.prototype.on = Emitter.prototype.addEventListener = function (event, fn) {
    this._callbacks = this._callbacks || {};
    (this._callbacks['$' + event] = this._callbacks['$' + event] || []).push(fn);
    return this;
  };
  /**
   * Adds an `event` listener that will be invoked a single
   * time then automatically removed.
   *
   * @param {String} event
   * @param {Function} fn
   * @return {Emitter}
   * @api public
   */


  Emitter.prototype.once = function (event, fn) {
    function on() {
      this.off(event, on);
      fn.apply(this, arguments);
    }

    on.fn = fn;
    this.on(event, on);
    return this;
  };
  /**
   * Remove the given callback for `event` or all
   * registered callbacks.
   *
   * @param {String} event
   * @param {Function} fn
   * @return {Emitter}
   * @api public
   */


  Emitter.prototype.off = Emitter.prototype.removeListener = Emitter.prototype.removeAllListeners = Emitter.prototype.removeEventListener = function (event, fn) {
    this._callbacks = this._callbacks || {}; // all

    if (0 == arguments.length) {
      this._callbacks = {};
      return this;
    } // specific event


    var callbacks = this._callbacks['$' + event];
    if (!callbacks) return this; // remove all handlers

    if (1 == arguments.length) {
      delete this._callbacks['$' + event];
      return this;
    } // remove specific handler


    var cb;

    for (var i = 0; i < callbacks.length; i++) {
      cb = callbacks[i];

      if (cb === fn || cb.fn === fn) {
        callbacks.splice(i, 1);
        break;
      }
    } // Remove event specific arrays for event types that no
    // one is subscribed for to avoid memory leak.


    if (callbacks.length === 0) {
      delete this._callbacks['$' + event];
    }

    return this;
  };
  /**
   * Emit `event` with the given args.
   *
   * @param {String} event
   * @param {Mixed} ...
   * @return {Emitter}
   */


  Emitter.prototype.emit = function (event) {
    this._callbacks = this._callbacks || {};
    var args = new Array(arguments.length - 1),
        callbacks = this._callbacks['$' + event];

    for (var i = 1; i < arguments.length; i++) {
      args[i - 1] = arguments[i];
    }

    if (callbacks) {
      callbacks = callbacks.slice(0);

      for (var i = 0, len = callbacks.length; i < len; ++i) {
        callbacks[i].apply(this, args);
      }
    }

    return this;
  }; // alias used for reserved events (protected method)


  Emitter.prototype.emitReserved = Emitter.prototype.emit;
  /**
   * Return array of callbacks for `event`.
   *
   * @param {String} event
   * @return {Array}
   * @api public
   */

  Emitter.prototype.listeners = function (event) {
    this._callbacks = this._callbacks || {};
    return this._callbacks['$' + event] || [];
  };
  /**
   * Check if this emitter has `event` handlers.
   *
   * @param {String} event
   * @return {Boolean}
   * @api public
   */


  Emitter.prototype.hasListeners = function (event) {
    return !!this.listeners(event).length;
  };

  var PACKET_TYPES = Object.create(null); // no Map = no polyfill

  PACKET_TYPES["open"] = "0";
  PACKET_TYPES["close"] = "1";
  PACKET_TYPES["ping"] = "2";
  PACKET_TYPES["pong"] = "3";
  PACKET_TYPES["message"] = "4";
  PACKET_TYPES["upgrade"] = "5";
  PACKET_TYPES["noop"] = "6";
  var PACKET_TYPES_REVERSE = Object.create(null);
  Object.keys(PACKET_TYPES).forEach(function (key) {
    PACKET_TYPES_REVERSE[PACKET_TYPES[key]] = key;
  });
  var ERROR_PACKET = {
    type: "error",
    data: "parser error"
  };
  var withNativeBlob$1 = typeof Blob === "function" || typeof Blob !== "undefined" && Object.prototype.toString.call(Blob) === "[object BlobConstructor]";
  var withNativeArrayBuffer$2 = typeof ArrayBuffer === "function"; // ArrayBuffer.isView method is not defined in IE10

  var isView$1 = function isView(obj) {
    return typeof ArrayBuffer.isView === "function" ? ArrayBuffer.isView(obj) : obj && obj.buffer instanceof ArrayBuffer;
  };

  var encodePacket = function encodePacket(_ref, supportsBinary, callback) {
    var type = _ref.type,
        data = _ref.data;

    if (withNativeBlob$1 && data instanceof Blob) {
      if (supportsBinary) {
        return callback(data);
      } else {
        return encodeBlobAsBase64(data, callback);
      }
    } else if (withNativeArrayBuffer$2 && (data instanceof ArrayBuffer || isView$1(data))) {
      if (supportsBinary) {
        return callback(data);
      } else {
        return encodeBlobAsBase64(new Blob([data]), callback);
      }
    } // plain string


    return callback(PACKET_TYPES[type] + (data || ""));
  };

  var encodeBlobAsBase64 = function encodeBlobAsBase64(data, callback) {
    var fileReader = new FileReader();

    fileReader.onload = function () {
      var content = fileReader.result.split(",")[1];
      callback("b" + content);
    };

    return fileReader.readAsDataURL(data);
  };
  /*
   * base64-arraybuffer 1.0.1 <https://github.com/niklasvh/base64-arraybuffer>
   * Copyright (c) 2021 Niklas von Hertzen <https://hertzen.com>
   * Released under MIT License
   */


  var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'; // Use a lookup table to find the index.

  var lookup$1 = typeof Uint8Array === 'undefined' ? [] : new Uint8Array(256);

  for (var i$1 = 0; i$1 < chars.length; i$1++) {
    lookup$1[chars.charCodeAt(i$1)] = i$1;
  }

  var decode$1 = function decode(base64) {
    var bufferLength = base64.length * 0.75,
        len = base64.length,
        i,
        p = 0,
        encoded1,
        encoded2,
        encoded3,
        encoded4;

    if (base64[base64.length - 1] === '=') {
      bufferLength--;

      if (base64[base64.length - 2] === '=') {
        bufferLength--;
      }
    }

    var arraybuffer = new ArrayBuffer(bufferLength),
        bytes = new Uint8Array(arraybuffer);

    for (i = 0; i < len; i += 4) {
      encoded1 = lookup$1[base64.charCodeAt(i)];
      encoded2 = lookup$1[base64.charCodeAt(i + 1)];
      encoded3 = lookup$1[base64.charCodeAt(i + 2)];
      encoded4 = lookup$1[base64.charCodeAt(i + 3)];
      bytes[p++] = encoded1 << 2 | encoded2 >> 4;
      bytes[p++] = (encoded2 & 15) << 4 | encoded3 >> 2;
      bytes[p++] = (encoded3 & 3) << 6 | encoded4 & 63;
    }

    return arraybuffer;
  };

  var withNativeArrayBuffer$1 = typeof ArrayBuffer === "function";

  var decodePacket = function decodePacket(encodedPacket, binaryType) {
    if (typeof encodedPacket !== "string") {
      return {
        type: "message",
        data: mapBinary(encodedPacket, binaryType)
      };
    }

    var type = encodedPacket.charAt(0);

    if (type === "b") {
      return {
        type: "message",
        data: decodeBase64Packet(encodedPacket.substring(1), binaryType)
      };
    }

    var packetType = PACKET_TYPES_REVERSE[type];

    if (!packetType) {
      return ERROR_PACKET;
    }

    return encodedPacket.length > 1 ? {
      type: PACKET_TYPES_REVERSE[type],
      data: encodedPacket.substring(1)
    } : {
      type: PACKET_TYPES_REVERSE[type]
    };
  };

  var decodeBase64Packet = function decodeBase64Packet(data, binaryType) {
    if (withNativeArrayBuffer$1) {
      var decoded = decode$1(data);
      return mapBinary(decoded, binaryType);
    } else {
      return {
        base64: true,
        data: data
      }; // fallback for old browsers
    }
  };

  var mapBinary = function mapBinary(data, binaryType) {
    switch (binaryType) {
      case "blob":
        return data instanceof ArrayBuffer ? new Blob([data]) : data;

      case "arraybuffer":
      default:
        return data;
      // assuming the data is already an ArrayBuffer
    }
  };

  var SEPARATOR = String.fromCharCode(30); // see https://en.wikipedia.org/wiki/Delimiter#ASCII_delimited_text

  var encodePayload = function encodePayload(packets, callback) {
    // some packets may be added to the array while encoding, so the initial length must be saved
    var length = packets.length;
    var encodedPackets = new Array(length);
    var count = 0;
    packets.forEach(function (packet, i) {
      // force base64 encoding for binary packets
      encodePacket(packet, false, function (encodedPacket) {
        encodedPackets[i] = encodedPacket;

        if (++count === length) {
          callback(encodedPackets.join(SEPARATOR));
        }
      });
    });
  };

  var decodePayload = function decodePayload(encodedPayload, binaryType) {
    var encodedPackets = encodedPayload.split(SEPARATOR);
    var packets = [];

    for (var i = 0; i < encodedPackets.length; i++) {
      var decodedPacket = decodePacket(encodedPackets[i], binaryType);
      packets.push(decodedPacket);

      if (decodedPacket.type === "error") {
        break;
      }
    }

    return packets;
  };

  var protocol$1 = 4;

  var Transport = /*#__PURE__*/function (_Emitter) {
    _inherits(Transport, _Emitter);

    var _super = _createSuper(Transport);
    /**
     * Transport abstract constructor.
     *
     * @param {Object} options.
     * @api private
     */


    function Transport(opts) {
      var _this;

      _classCallCheck(this, Transport);

      _this = _super.call(this);
      _this.writable = false;
      installTimerFunctions(_assertThisInitialized(_this), opts);
      _this.opts = opts;
      _this.query = opts.query;
      _this.readyState = "";
      _this.socket = opts.socket;
      return _this;
    }
    /**
     * Emits an error.
     *
     * @param {String} str
     * @return {Transport} for chaining
     * @api protected
     */


    _createClass(Transport, [{
      key: "onError",
      value: function onError(msg, desc) {
        var err = new Error(msg); // @ts-ignore

        err.type = "TransportError"; // @ts-ignore

        err.description = desc;

        _get(_getPrototypeOf(Transport.prototype), "emit", this).call(this, "error", err);

        return this;
      }
      /**
       * Opens the transport.
       *
       * @api public
       */

    }, {
      key: "open",
      value: function open() {
        if ("closed" === this.readyState || "" === this.readyState) {
          this.readyState = "opening";
          this.doOpen();
        }

        return this;
      }
      /**
       * Closes the transport.
       *
       * @api public
       */

    }, {
      key: "close",
      value: function close() {
        if ("opening" === this.readyState || "open" === this.readyState) {
          this.doClose();
          this.onClose();
        }

        return this;
      }
      /**
       * Sends multiple packets.
       *
       * @param {Array} packets
       * @api public
       */

    }, {
      key: "send",
      value: function send(packets) {
        if ("open" === this.readyState) {
          this.write(packets);
        }
      }
      /**
       * Called upon open
       *
       * @api protected
       */

    }, {
      key: "onOpen",
      value: function onOpen() {
        this.readyState = "open";
        this.writable = true;

        _get(_getPrototypeOf(Transport.prototype), "emit", this).call(this, "open");
      }
      /**
       * Called with data.
       *
       * @param {String} data
       * @api protected
       */

    }, {
      key: "onData",
      value: function onData(data) {
        var packet = decodePacket(data, this.socket.binaryType);
        this.onPacket(packet);
      }
      /**
       * Called with a decoded packet.
       *
       * @api protected
       */

    }, {
      key: "onPacket",
      value: function onPacket(packet) {
        _get(_getPrototypeOf(Transport.prototype), "emit", this).call(this, "packet", packet);
      }
      /**
       * Called upon close.
       *
       * @api protected
       */

    }, {
      key: "onClose",
      value: function onClose() {
        this.readyState = "closed";

        _get(_getPrototypeOf(Transport.prototype), "emit", this).call(this, "close");
      }
    }]);

    return Transport;
  }(Emitter_1);

  var alphabet = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-_'.split(''),
      length = 64,
      map = {},
      seed = 0,
      i = 0,
      prev;
  /**
   * Return a string representing the specified number.
   *
   * @param {Number} num The number to convert.
   * @returns {String} The string representation of the number.
   * @api public
   */

  function encode(num) {
    var encoded = '';

    do {
      encoded = alphabet[num % length] + encoded;
      num = Math.floor(num / length);
    } while (num > 0);

    return encoded;
  }
  /**
   * Return the integer value specified by the given string.
   *
   * @param {String} str The string to convert.
   * @returns {Number} The integer value represented by the string.
   * @api public
   */


  function decode(str) {
    var decoded = 0;

    for (i = 0; i < str.length; i++) {
      decoded = decoded * length + map[str.charAt(i)];
    }

    return decoded;
  }
  /**
   * Yeast: A tiny growing id generator.
   *
   * @returns {String} A unique id.
   * @api public
   */


  function yeast() {
    var now = encode(+new Date());
    if (now !== prev) return seed = 0, prev = now;
    return now + '.' + encode(seed++);
  } //
  // Map each character to its index.
  //


  for (; i < length; i++) {
    map[alphabet[i]] = i;
  } //
  // Expose the `yeast`, `encode` and `decode` functions.
  //


  yeast.encode = encode;
  yeast.decode = decode;
  var yeast_1 = yeast;
  var parseqs = {};
  /**
   * Compiles a querystring
   * Returns string representation of the object
   *
   * @param {Object}
   * @api private
   */

  parseqs.encode = function (obj) {
    var str = '';

    for (var i in obj) {
      if (obj.hasOwnProperty(i)) {
        if (str.length) str += '&';
        str += encodeURIComponent(i) + '=' + encodeURIComponent(obj[i]);
      }
    }

    return str;
  };
  /**
   * Parses a simple querystring into an object
   *
   * @param {String} qs
   * @api private
   */


  parseqs.decode = function (qs) {
    var qry = {};
    var pairs = qs.split('&');

    for (var i = 0, l = pairs.length; i < l; i++) {
      var pair = pairs[i].split('=');
      qry[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1]);
    }

    return qry;
  };

  var Polling = /*#__PURE__*/function (_Transport) {
    _inherits(Polling, _Transport);

    var _super = _createSuper(Polling);

    function Polling() {
      var _this;

      _classCallCheck(this, Polling);

      _this = _super.apply(this, arguments);
      _this.polling = false;
      return _this;
    }
    /**
     * Transport name.
     */


    _createClass(Polling, [{
      key: "name",
      get: function get() {
        return "polling";
      }
      /**
       * Opens the socket (triggers polling). We write a PING message to determine
       * when the transport is open.
       *
       * @api private
       */

    }, {
      key: "doOpen",
      value: function doOpen() {
        this.poll();
      }
      /**
       * Pauses polling.
       *
       * @param {Function} callback upon buffers are flushed and transport is paused
       * @api private
       */

    }, {
      key: "pause",
      value: function pause(onPause) {
        var _this2 = this;

        this.readyState = "pausing";

        var pause = function pause() {
          _this2.readyState = "paused";
          onPause();
        };

        if (this.polling || !this.writable) {
          var total = 0;

          if (this.polling) {
            total++;
            this.once("pollComplete", function () {
              --total || pause();
            });
          }

          if (!this.writable) {
            total++;
            this.once("drain", function () {
              --total || pause();
            });
          }
        } else {
          pause();
        }
      }
      /**
       * Starts polling cycle.
       *
       * @api public
       */

    }, {
      key: "poll",
      value: function poll() {
        this.polling = true;
        this.doPoll();
        this.emit("poll");
      }
      /**
       * Overloads onData to detect payloads.
       *
       * @api private
       */

    }, {
      key: "onData",
      value: function onData(data) {
        var _this3 = this;

        var callback = function callback(packet) {
          // if its the first message we consider the transport open
          if ("opening" === _this3.readyState && packet.type === "open") {
            _this3.onOpen();
          } // if its a close packet, we close the ongoing requests


          if ("close" === packet.type) {
            _this3.onClose();

            return false;
          } // otherwise bypass onData and handle the message


          _this3.onPacket(packet);
        }; // decode payload


        decodePayload(data, this.socket.binaryType).forEach(callback); // if an event did not trigger closing

        if ("closed" !== this.readyState) {
          // if we got data we're not polling
          this.polling = false;
          this.emit("pollComplete");

          if ("open" === this.readyState) {
            this.poll();
          }
        }
      }
      /**
       * For polling, send a close packet.
       *
       * @api private
       */

    }, {
      key: "doClose",
      value: function doClose() {
        var _this4 = this;

        var close = function close() {
          _this4.write([{
            type: "close"
          }]);
        };

        if ("open" === this.readyState) {
          close();
        } else {
          // in case we're trying to close while
          // handshaking is in progress (GH-164)
          this.once("open", close);
        }
      }
      /**
       * Writes a packets payload.
       *
       * @param {Array} data packets
       * @param {Function} drain callback
       * @api private
       */

    }, {
      key: "write",
      value: function write(packets) {
        var _this5 = this;

        this.writable = false;
        encodePayload(packets, function (data) {
          _this5.doWrite(data, function () {
            _this5.writable = true;

            _this5.emit("drain");
          });
        });
      }
      /**
       * Generates uri for connection.
       *
       * @api private
       */

    }, {
      key: "uri",
      value: function uri() {
        var query = this.query || {};
        var schema = this.opts.secure ? "https" : "http";
        var port = ""; // cache busting is forced

        if (false !== this.opts.timestampRequests) {
          query[this.opts.timestampParam] = yeast_1();
        }

        if (!this.supportsBinary && !query.sid) {
          query.b64 = 1;
        } // avoid port if default for schema


        if (this.opts.port && ("https" === schema && Number(this.opts.port) !== 443 || "http" === schema && Number(this.opts.port) !== 80)) {
          port = ":" + this.opts.port;
        }

        var encodedQuery = parseqs.encode(query);
        var ipv6 = this.opts.hostname.indexOf(":") !== -1;
        return schema + "://" + (ipv6 ? "[" + this.opts.hostname + "]" : this.opts.hostname) + port + this.opts.path + (encodedQuery.length ? "?" + encodedQuery : "");
      }
    }]);

    return Polling;
  }(Transport);
  /**
   * Empty function
   */


  function empty() {}

  var hasXHR2 = function () {
    var xhr = new XMLHttpRequest$1({
      xdomain: false
    });
    return null != xhr.responseType;
  }();

  var XHR = /*#__PURE__*/function (_Polling) {
    _inherits(XHR, _Polling);

    var _super = _createSuper(XHR);
    /**
     * XHR Polling constructor.
     *
     * @param {Object} opts
     * @api public
     */


    function XHR(opts) {
      var _this;

      _classCallCheck(this, XHR);

      _this = _super.call(this, opts);

      if (typeof location !== "undefined") {
        var isSSL = "https:" === location.protocol;
        var port = location.port; // some user agents have empty `location.port`

        if (!port) {
          port = isSSL ? "443" : "80";
        }

        _this.xd = typeof location !== "undefined" && opts.hostname !== location.hostname || port !== opts.port;
        _this.xs = opts.secure !== isSSL;
      }
      /**
       * XHR supports binary
       */


      var forceBase64 = opts && opts.forceBase64;
      _this.supportsBinary = hasXHR2 && !forceBase64;
      return _this;
    }
    /**
     * Creates a request.
     *
     * @param {String} method
     * @api private
     */


    _createClass(XHR, [{
      key: "request",
      value: function request() {
        var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

        _extends(opts, {
          xd: this.xd,
          xs: this.xs
        }, this.opts);

        return new Request(this.uri(), opts);
      }
      /**
       * Sends data.
       *
       * @param {String} data to send.
       * @param {Function} called upon flush.
       * @api private
       */

    }, {
      key: "doWrite",
      value: function doWrite(data, fn) {
        var _this2 = this;

        var req = this.request({
          method: "POST",
          data: data
        });
        req.on("success", fn);
        req.on("error", function (err) {
          _this2.onError("xhr post error", err);
        });
      }
      /**
       * Starts a poll cycle.
       *
       * @api private
       */

    }, {
      key: "doPoll",
      value: function doPoll() {
        var _this3 = this;

        var req = this.request();
        req.on("data", this.onData.bind(this));
        req.on("error", function (err) {
          _this3.onError("xhr poll error", err);
        });
        this.pollXhr = req;
      }
    }]);

    return XHR;
  }(Polling);

  var Request = /*#__PURE__*/function (_Emitter) {
    _inherits(Request, _Emitter);

    var _super2 = _createSuper(Request);
    /**
     * Request constructor
     *
     * @param {Object} options
     * @api public
     */


    function Request(uri, opts) {
      var _this4;

      _classCallCheck(this, Request);

      _this4 = _super2.call(this);
      installTimerFunctions(_assertThisInitialized(_this4), opts);
      _this4.opts = opts;
      _this4.method = opts.method || "GET";
      _this4.uri = uri;
      _this4.async = false !== opts.async;
      _this4.data = undefined !== opts.data ? opts.data : null;

      _this4.create();

      return _this4;
    }
    /**
     * Creates the XHR object and sends the request.
     *
     * @api private
     */


    _createClass(Request, [{
      key: "create",
      value: function create() {
        var _this5 = this;

        var opts = pick(this.opts, "agent", "pfx", "key", "passphrase", "cert", "ca", "ciphers", "rejectUnauthorized", "autoUnref");
        opts.xdomain = !!this.opts.xd;
        opts.xscheme = !!this.opts.xs;
        var xhr = this.xhr = new XMLHttpRequest$1(opts);

        try {
          xhr.open(this.method, this.uri, this.async);

          try {
            if (this.opts.extraHeaders) {
              xhr.setDisableHeaderCheck && xhr.setDisableHeaderCheck(true);

              for (var i in this.opts.extraHeaders) {
                if (this.opts.extraHeaders.hasOwnProperty(i)) {
                  xhr.setRequestHeader(i, this.opts.extraHeaders[i]);
                }
              }
            }
          } catch (e) {}

          if ("POST" === this.method) {
            try {
              xhr.setRequestHeader("Content-type", "text/plain;charset=UTF-8");
            } catch (e) {}
          }

          try {
            xhr.setRequestHeader("Accept", "*/*");
          } catch (e) {} // ie6 check


          if ("withCredentials" in xhr) {
            xhr.withCredentials = this.opts.withCredentials;
          }

          if (this.opts.requestTimeout) {
            xhr.timeout = this.opts.requestTimeout;
          }

          xhr.onreadystatechange = function () {
            if (4 !== xhr.readyState) return;

            if (200 === xhr.status || 1223 === xhr.status) {
              _this5.onLoad();
            } else {
              // make sure the `error` event handler that's user-set
              // does not throw in the same tick and gets caught here
              _this5.setTimeoutFn(function () {
                _this5.onError(typeof xhr.status === "number" ? xhr.status : 0);
              }, 0);
            }
          };

          xhr.send(this.data);
        } catch (e) {
          // Need to defer since .create() is called directly from the constructor
          // and thus the 'error' event can only be only bound *after* this exception
          // occurs.  Therefore, also, we cannot throw here at all.
          this.setTimeoutFn(function () {
            _this5.onError(e);
          }, 0);
          return;
        }

        if (typeof document !== "undefined") {
          this.index = Request.requestsCount++;
          Request.requests[this.index] = this;
        }
      }
      /**
       * Called upon successful response.
       *
       * @api private
       */

    }, {
      key: "onSuccess",
      value: function onSuccess() {
        this.emit("success");
        this.cleanup();
      }
      /**
       * Called if we have data.
       *
       * @api private
       */

    }, {
      key: "onData",
      value: function onData(data) {
        this.emit("data", data);
        this.onSuccess();
      }
      /**
       * Called upon error.
       *
       * @api private
       */

    }, {
      key: "onError",
      value: function onError(err) {
        this.emit("error", err);
        this.cleanup(true);
      }
      /**
       * Cleans up house.
       *
       * @api private
       */

    }, {
      key: "cleanup",
      value: function cleanup(fromError) {
        if ("undefined" === typeof this.xhr || null === this.xhr) {
          return;
        }

        this.xhr.onreadystatechange = empty;

        if (fromError) {
          try {
            this.xhr.abort();
          } catch (e) {}
        }

        if (typeof document !== "undefined") {
          delete Request.requests[this.index];
        }

        this.xhr = null;
      }
      /**
       * Called upon load.
       *
       * @api private
       */

    }, {
      key: "onLoad",
      value: function onLoad() {
        var data = this.xhr.responseText;

        if (data !== null) {
          this.onData(data);
        }
      }
      /**
       * Aborts the request.
       *
       * @api public
       */

    }, {
      key: "abort",
      value: function abort() {
        this.cleanup();
      }
    }]);

    return Request;
  }(Emitter_1);

  Request.requestsCount = 0;
  Request.requests = {};
  /**
   * Aborts pending requests when unloading the window. This is needed to prevent
   * memory leaks (e.g. when using IE) and to ensure that no spurious error is
   * emitted.
   */

  if (typeof document !== "undefined") {
    // @ts-ignore
    if (typeof attachEvent === "function") {
      // @ts-ignore
      attachEvent("onunload", unloadHandler);
    } else if (typeof addEventListener === "function") {
      var terminationEvent = "onpagehide" in globalThis ? "pagehide" : "unload";
      addEventListener(terminationEvent, unloadHandler, false);
    }
  }

  function unloadHandler() {
    for (var i in Request.requests) {
      if (Request.requests.hasOwnProperty(i)) {
        Request.requests[i].abort();
      }
    }
  }

  var nextTick = function () {
    var isPromiseAvailable = typeof Promise === "function" && typeof Promise.resolve === "function";

    if (isPromiseAvailable) {
      return function (cb) {
        return Promise.resolve().then(cb);
      };
    } else {
      return function (cb, setTimeoutFn) {
        return setTimeoutFn(cb, 0);
      };
    }
  }();

  var WebSocket = globalThis.WebSocket || globalThis.MozWebSocket;
  var usingBrowserWebSocket = true;
  var defaultBinaryType = "arraybuffer";
  var isReactNative = typeof navigator !== "undefined" && typeof navigator.product === "string" && navigator.product.toLowerCase() === "reactnative";

  var WS = /*#__PURE__*/function (_Transport) {
    _inherits(WS, _Transport);

    var _super = _createSuper(WS);
    /**
     * WebSocket transport constructor.
     *
     * @api {Object} connection options
     * @api public
     */


    function WS(opts) {
      var _this;

      _classCallCheck(this, WS);

      _this = _super.call(this, opts);
      _this.supportsBinary = !opts.forceBase64;
      return _this;
    }
    /**
     * Transport name.
     *
     * @api public
     */


    _createClass(WS, [{
      key: "name",
      get: function get() {
        return "websocket";
      }
      /**
       * Opens socket.
       *
       * @api private
       */

    }, {
      key: "doOpen",
      value: function doOpen() {
        if (!this.check()) {
          // let probe timeout
          return;
        }

        var uri = this.uri();
        var protocols = this.opts.protocols; // React Native only supports the 'headers' option, and will print a warning if anything else is passed

        var opts = isReactNative ? {} : pick(this.opts, "agent", "perMessageDeflate", "pfx", "key", "passphrase", "cert", "ca", "ciphers", "rejectUnauthorized", "localAddress", "protocolVersion", "origin", "maxPayload", "family", "checkServerIdentity");

        if (this.opts.extraHeaders) {
          opts.headers = this.opts.extraHeaders;
        }

        try {
          this.ws = usingBrowserWebSocket && !isReactNative ? protocols ? new WebSocket(uri, protocols) : new WebSocket(uri) : new WebSocket(uri, protocols, opts);
        } catch (err) {
          return this.emit("error", err);
        }

        this.ws.binaryType = this.socket.binaryType || defaultBinaryType;
        this.addEventListeners();
      }
      /**
       * Adds event listeners to the socket
       *
       * @api private
       */

    }, {
      key: "addEventListeners",
      value: function addEventListeners() {
        var _this2 = this;

        this.ws.onopen = function () {
          if (_this2.opts.autoUnref) {
            _this2.ws._socket.unref();
          }

          _this2.onOpen();
        };

        this.ws.onclose = this.onClose.bind(this);

        this.ws.onmessage = function (ev) {
          return _this2.onData(ev.data);
        };

        this.ws.onerror = function (e) {
          return _this2.onError("websocket error", e);
        };
      }
      /**
       * Writes data to socket.
       *
       * @param {Array} array of packets.
       * @api private
       */

    }, {
      key: "write",
      value: function write(packets) {
        var _this3 = this;

        this.writable = false; // encodePacket efficient as it uses WS framing
        // no need for encodePayload

        var _loop = function _loop(i) {
          var packet = packets[i];
          var lastPacket = i === packets.length - 1;
          encodePacket(packet, _this3.supportsBinary, function (data) {
            // throw an error

            try {
              if (usingBrowserWebSocket) {
                // TypeError is thrown when passing the second argument on Safari
                _this3.ws.send(data);
              }
            } catch (e) {}

            if (lastPacket) {
              // fake drain
              // defer to next tick to allow Socket to clear writeBuffer
              nextTick(function () {
                _this3.writable = true;

                _this3.emit("drain");
              }, _this3.setTimeoutFn);
            }
          });
        };

        for (var i = 0; i < packets.length; i++) {
          _loop(i);
        }
      }
      /**
       * Closes socket.
       *
       * @api private
       */

    }, {
      key: "doClose",
      value: function doClose() {
        if (typeof this.ws !== "undefined") {
          this.ws.close();
          this.ws = null;
        }
      }
      /**
       * Generates uri for connection.
       *
       * @api private
       */

    }, {
      key: "uri",
      value: function uri() {
        var query = this.query || {};
        var schema = this.opts.secure ? "wss" : "ws";
        var port = ""; // avoid port if default for schema

        if (this.opts.port && ("wss" === schema && Number(this.opts.port) !== 443 || "ws" === schema && Number(this.opts.port) !== 80)) {
          port = ":" + this.opts.port;
        } // append timestamp to URI


        if (this.opts.timestampRequests) {
          query[this.opts.timestampParam] = yeast_1();
        } // communicate binary support capabilities


        if (!this.supportsBinary) {
          query.b64 = 1;
        }

        var encodedQuery = parseqs.encode(query);
        var ipv6 = this.opts.hostname.indexOf(":") !== -1;
        return schema + "://" + (ipv6 ? "[" + this.opts.hostname + "]" : this.opts.hostname) + port + this.opts.path + (encodedQuery.length ? "?" + encodedQuery : "");
      }
      /**
       * Feature detection for WebSocket.
       *
       * @return {Boolean} whether this transport is available.
       * @api public
       */

    }, {
      key: "check",
      value: function check() {
        return !!WebSocket && !("__initialize" in WebSocket && this.name === WS.prototype.name);
      }
    }]);

    return WS;
  }(Transport);

  var transports = {
    websocket: WS,
    polling: XHR
  };

  var Socket$1 = /*#__PURE__*/function (_Emitter) {
    _inherits(Socket, _Emitter);

    var _super = _createSuper(Socket);
    /**
     * Socket constructor.
     *
     * @param {String|Object} uri or options
     * @param {Object} opts - options
     * @api public
     */


    function Socket(uri) {
      var _this;

      var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      _classCallCheck(this, Socket);

      _this = _super.call(this);

      if (uri && "object" === _typeof(uri)) {
        opts = uri;
        uri = null;
      }

      if (uri) {
        uri = parseuri(uri);
        opts.hostname = uri.host;
        opts.secure = uri.protocol === "https" || uri.protocol === "wss";
        opts.port = uri.port;
        if (uri.query) opts.query = uri.query;
      } else if (opts.host) {
        opts.hostname = parseuri(opts.host).host;
      }

      installTimerFunctions(_assertThisInitialized(_this), opts);
      _this.secure = null != opts.secure ? opts.secure : typeof location !== "undefined" && "https:" === location.protocol;

      if (opts.hostname && !opts.port) {
        // if no port is specified manually, use the protocol default
        opts.port = _this.secure ? "443" : "80";
      }

      _this.hostname = opts.hostname || (typeof location !== "undefined" ? location.hostname : "localhost");
      _this.port = opts.port || (typeof location !== "undefined" && location.port ? location.port : _this.secure ? "443" : "80");
      _this.transports = opts.transports || ["polling", "websocket"];
      _this.readyState = "";
      _this.writeBuffer = [];
      _this.prevBufferLen = 0;
      _this.opts = _extends({
        path: "/engine.io",
        agent: false,
        withCredentials: false,
        upgrade: true,
        timestampParam: "t",
        rememberUpgrade: false,
        rejectUnauthorized: true,
        perMessageDeflate: {
          threshold: 1024
        },
        transportOptions: {},
        closeOnBeforeunload: true
      }, opts);
      _this.opts.path = _this.opts.path.replace(/\/$/, "") + "/";

      if (typeof _this.opts.query === "string") {
        _this.opts.query = parseqs.decode(_this.opts.query);
      } // set on handshake


      _this.id = null;
      _this.upgrades = null;
      _this.pingInterval = null;
      _this.pingTimeout = null; // set on heartbeat

      _this.pingTimeoutTimer = null;

      if (typeof addEventListener === "function") {
        if (_this.opts.closeOnBeforeunload) {
          // Firefox closes the connection when the "beforeunload" event is emitted but not Chrome. This event listener
          // ensures every browser behaves the same (no "disconnect" event at the Socket.IO level when the page is
          // closed/reloaded)
          addEventListener("beforeunload", function () {
            if (_this.transport) {
              // silently close the transport
              _this.transport.removeAllListeners();

              _this.transport.close();
            }
          }, false);
        }

        if (_this.hostname !== "localhost") {
          _this.offlineEventListener = function () {
            _this.onClose("transport close");
          };

          addEventListener("offline", _this.offlineEventListener, false);
        }
      }

      _this.open();

      return _this;
    }
    /**
     * Creates transport of the given type.
     *
     * @param {String} transport name
     * @return {Transport}
     * @api private
     */


    _createClass(Socket, [{
      key: "createTransport",
      value: function createTransport(name) {
        var query = clone(this.opts.query); // append engine.io protocol identifier

        query.EIO = protocol$1; // transport name

        query.transport = name; // session id if we already have one

        if (this.id) query.sid = this.id;

        var opts = _extends({}, this.opts.transportOptions[name], this.opts, {
          query: query,
          socket: this,
          hostname: this.hostname,
          secure: this.secure,
          port: this.port
        });

        return new transports[name](opts);
      }
      /**
       * Initializes transport to use and starts probe.
       *
       * @api private
       */

    }, {
      key: "open",
      value: function open() {
        var _this2 = this;

        var transport;

        if (this.opts.rememberUpgrade && Socket.priorWebsocketSuccess && this.transports.indexOf("websocket") !== -1) {
          transport = "websocket";
        } else if (0 === this.transports.length) {
          // Emit error on next tick so it can be listened to
          this.setTimeoutFn(function () {
            _this2.emitReserved("error", "No transports available");
          }, 0);
          return;
        } else {
          transport = this.transports[0];
        }

        this.readyState = "opening"; // Retry with the next transport if the transport is disabled (jsonp: false)

        try {
          transport = this.createTransport(transport);
        } catch (e) {
          this.transports.shift();
          this.open();
          return;
        }

        transport.open();
        this.setTransport(transport);
      }
      /**
       * Sets the current transport. Disables the existing one (if any).
       *
       * @api private
       */

    }, {
      key: "setTransport",
      value: function setTransport(transport) {
        var _this3 = this;

        if (this.transport) {
          this.transport.removeAllListeners();
        } // set up transport


        this.transport = transport; // set up transport listeners

        transport.on("drain", this.onDrain.bind(this)).on("packet", this.onPacket.bind(this)).on("error", this.onError.bind(this)).on("close", function () {
          _this3.onClose("transport close");
        });
      }
      /**
       * Probes a transport.
       *
       * @param {String} transport name
       * @api private
       */

    }, {
      key: "probe",
      value: function probe(name) {
        var _this4 = this;

        var transport = this.createTransport(name);
        var failed = false;
        Socket.priorWebsocketSuccess = false;

        var onTransportOpen = function onTransportOpen() {
          if (failed) return;
          transport.send([{
            type: "ping",
            data: "probe"
          }]);
          transport.once("packet", function (msg) {
            if (failed) return;

            if ("pong" === msg.type && "probe" === msg.data) {
              _this4.upgrading = true;

              _this4.emitReserved("upgrading", transport);

              if (!transport) return;
              Socket.priorWebsocketSuccess = "websocket" === transport.name;

              _this4.transport.pause(function () {
                if (failed) return;
                if ("closed" === _this4.readyState) return;
                cleanup();

                _this4.setTransport(transport);

                transport.send([{
                  type: "upgrade"
                }]);

                _this4.emitReserved("upgrade", transport);

                transport = null;
                _this4.upgrading = false;

                _this4.flush();
              });
            } else {
              var err = new Error("probe error"); // @ts-ignore

              err.transport = transport.name;

              _this4.emitReserved("upgradeError", err);
            }
          });
        };

        function freezeTransport() {
          if (failed) return; // Any callback called by transport should be ignored since now

          failed = true;
          cleanup();
          transport.close();
          transport = null;
        } // Handle any error that happens while probing


        var onerror = function onerror(err) {
          var error = new Error("probe error: " + err); // @ts-ignore

          error.transport = transport.name;
          freezeTransport();

          _this4.emitReserved("upgradeError", error);
        };

        function onTransportClose() {
          onerror("transport closed");
        } // When the socket is closed while we're probing


        function onclose() {
          onerror("socket closed");
        } // When the socket is upgraded while we're probing


        function onupgrade(to) {
          if (transport && to.name !== transport.name) {
            freezeTransport();
          }
        } // Remove all listeners on the transport and on self


        var cleanup = function cleanup() {
          transport.removeListener("open", onTransportOpen);
          transport.removeListener("error", onerror);
          transport.removeListener("close", onTransportClose);

          _this4.off("close", onclose);

          _this4.off("upgrading", onupgrade);
        };

        transport.once("open", onTransportOpen);
        transport.once("error", onerror);
        transport.once("close", onTransportClose);
        this.once("close", onclose);
        this.once("upgrading", onupgrade);
        transport.open();
      }
      /**
       * Called when connection is deemed open.
       *
       * @api private
       */

    }, {
      key: "onOpen",
      value: function onOpen() {
        this.readyState = "open";
        Socket.priorWebsocketSuccess = "websocket" === this.transport.name;
        this.emitReserved("open");
        this.flush(); // we check for `readyState` in case an `open`
        // listener already closed the socket

        if ("open" === this.readyState && this.opts.upgrade && this.transport.pause) {
          var i = 0;
          var l = this.upgrades.length;

          for (; i < l; i++) {
            this.probe(this.upgrades[i]);
          }
        }
      }
      /**
       * Handles a packet.
       *
       * @api private
       */

    }, {
      key: "onPacket",
      value: function onPacket(packet) {
        if ("opening" === this.readyState || "open" === this.readyState || "closing" === this.readyState) {
          this.emitReserved("packet", packet); // Socket is live - any packet counts

          this.emitReserved("heartbeat");

          switch (packet.type) {
            case "open":
              this.onHandshake(JSON.parse(packet.data));
              break;

            case "ping":
              this.resetPingTimeout();
              this.sendPacket("pong");
              this.emitReserved("ping");
              this.emitReserved("pong");
              break;

            case "error":
              var err = new Error("server error"); // @ts-ignore

              err.code = packet.data;
              this.onError(err);
              break;

            case "message":
              this.emitReserved("data", packet.data);
              this.emitReserved("message", packet.data);
              break;
          }
        }
      }
      /**
       * Called upon handshake completion.
       *
       * @param {Object} data - handshake obj
       * @api private
       */

    }, {
      key: "onHandshake",
      value: function onHandshake(data) {
        this.emitReserved("handshake", data);
        this.id = data.sid;
        this.transport.query.sid = data.sid;
        this.upgrades = this.filterUpgrades(data.upgrades);
        this.pingInterval = data.pingInterval;
        this.pingTimeout = data.pingTimeout;
        this.onOpen(); // In case open handler closes socket

        if ("closed" === this.readyState) return;
        this.resetPingTimeout();
      }
      /**
       * Sets and resets ping timeout timer based on server pings.
       *
       * @api private
       */

    }, {
      key: "resetPingTimeout",
      value: function resetPingTimeout() {
        var _this5 = this;

        this.clearTimeoutFn(this.pingTimeoutTimer);
        this.pingTimeoutTimer = this.setTimeoutFn(function () {
          _this5.onClose("ping timeout");
        }, this.pingInterval + this.pingTimeout);

        if (this.opts.autoUnref) {
          this.pingTimeoutTimer.unref();
        }
      }
      /**
       * Called on `drain` event
       *
       * @api private
       */

    }, {
      key: "onDrain",
      value: function onDrain() {
        this.writeBuffer.splice(0, this.prevBufferLen); // setting prevBufferLen = 0 is very important
        // for example, when upgrading, upgrade packet is sent over,
        // and a nonzero prevBufferLen could cause problems on `drain`

        this.prevBufferLen = 0;

        if (0 === this.writeBuffer.length) {
          this.emitReserved("drain");
        } else {
          this.flush();
        }
      }
      /**
       * Flush write buffers.
       *
       * @api private
       */

    }, {
      key: "flush",
      value: function flush() {
        if ("closed" !== this.readyState && this.transport.writable && !this.upgrading && this.writeBuffer.length) {
          this.transport.send(this.writeBuffer); // keep track of current length of writeBuffer
          // splice writeBuffer and callbackBuffer on `drain`

          this.prevBufferLen = this.writeBuffer.length;
          this.emitReserved("flush");
        }
      }
      /**
       * Sends a message.
       *
       * @param {String} message.
       * @param {Function} callback function.
       * @param {Object} options.
       * @return {Socket} for chaining.
       * @api public
       */

    }, {
      key: "write",
      value: function write(msg, options, fn) {
        this.sendPacket("message", msg, options, fn);
        return this;
      }
    }, {
      key: "send",
      value: function send(msg, options, fn) {
        this.sendPacket("message", msg, options, fn);
        return this;
      }
      /**
       * Sends a packet.
       *
       * @param {String} packet type.
       * @param {String} data.
       * @param {Object} options.
       * @param {Function} callback function.
       * @api private
       */

    }, {
      key: "sendPacket",
      value: function sendPacket(type, data, options, fn) {
        if ("function" === typeof data) {
          fn = data;
          data = undefined;
        }

        if ("function" === typeof options) {
          fn = options;
          options = null;
        }

        if ("closing" === this.readyState || "closed" === this.readyState) {
          return;
        }

        options = options || {};
        options.compress = false !== options.compress;
        var packet = {
          type: type,
          data: data,
          options: options
        };
        this.emitReserved("packetCreate", packet);
        this.writeBuffer.push(packet);
        if (fn) this.once("flush", fn);
        this.flush();
      }
      /**
       * Closes the connection.
       *
       * @api public
       */

    }, {
      key: "close",
      value: function close() {
        var _this6 = this;

        var close = function close() {
          _this6.onClose("forced close");

          _this6.transport.close();
        };

        var cleanupAndClose = function cleanupAndClose() {
          _this6.off("upgrade", cleanupAndClose);

          _this6.off("upgradeError", cleanupAndClose);

          close();
        };

        var waitForUpgrade = function waitForUpgrade() {
          // wait for upgrade to finish since we can't send packets while pausing a transport
          _this6.once("upgrade", cleanupAndClose);

          _this6.once("upgradeError", cleanupAndClose);
        };

        if ("opening" === this.readyState || "open" === this.readyState) {
          this.readyState = "closing";

          if (this.writeBuffer.length) {
            this.once("drain", function () {
              if (_this6.upgrading) {
                waitForUpgrade();
              } else {
                close();
              }
            });
          } else if (this.upgrading) {
            waitForUpgrade();
          } else {
            close();
          }
        }

        return this;
      }
      /**
       * Called upon transport error
       *
       * @api private
       */

    }, {
      key: "onError",
      value: function onError(err) {
        Socket.priorWebsocketSuccess = false;
        this.emitReserved("error", err);
        this.onClose("transport error", err);
      }
      /**
       * Called upon transport close.
       *
       * @api private
       */

    }, {
      key: "onClose",
      value: function onClose(reason, desc) {
        if ("opening" === this.readyState || "open" === this.readyState || "closing" === this.readyState) {
          // clear timers
          this.clearTimeoutFn(this.pingTimeoutTimer); // stop event from firing again for transport

          this.transport.removeAllListeners("close"); // ensure transport won't stay open

          this.transport.close(); // ignore further transport communication

          this.transport.removeAllListeners();

          if (typeof removeEventListener === "function") {
            removeEventListener("offline", this.offlineEventListener, false);
          } // set ready state


          this.readyState = "closed"; // clear session id

          this.id = null; // emit close event

          this.emitReserved("close", reason, desc); // clean buffers after, so users can still
          // grab the buffers on `close` event

          this.writeBuffer = [];
          this.prevBufferLen = 0;
        }
      }
      /**
       * Filters upgrades, returning only those matching client transports.
       *
       * @param {Array} server upgrades
       * @api private
       *
       */

    }, {
      key: "filterUpgrades",
      value: function filterUpgrades(upgrades) {
        var filteredUpgrades = [];
        var i = 0;
        var j = upgrades.length;

        for (; i < j; i++) {
          if (~this.transports.indexOf(upgrades[i])) filteredUpgrades.push(upgrades[i]);
        }

        return filteredUpgrades;
      }
    }]);

    return Socket;
  }(Emitter_1);

  Socket$1.protocol = protocol$1;

  function clone(obj) {
    var o = {};

    for (var i in obj) {
      if (obj.hasOwnProperty(i)) {
        o[i] = obj[i];
      }
    }

    return o;
  }

  var withNativeArrayBuffer = typeof ArrayBuffer === "function";

  var isView = function isView(obj) {
    return typeof ArrayBuffer.isView === "function" ? ArrayBuffer.isView(obj) : obj.buffer instanceof ArrayBuffer;
  };

  var toString = Object.prototype.toString;
  var withNativeBlob = typeof Blob === "function" || typeof Blob !== "undefined" && toString.call(Blob) === "[object BlobConstructor]";
  var withNativeFile = typeof File === "function" || typeof File !== "undefined" && toString.call(File) === "[object FileConstructor]";
  /**
   * Returns true if obj is a Buffer, an ArrayBuffer, a Blob or a File.
   *
   * @private
   */

  function isBinary(obj) {
    return withNativeArrayBuffer && (obj instanceof ArrayBuffer || isView(obj)) || withNativeBlob && obj instanceof Blob || withNativeFile && obj instanceof File;
  }

  function hasBinary(obj, toJSON) {
    if (!obj || _typeof(obj) !== "object") {
      return false;
    }

    if (Array.isArray(obj)) {
      for (var i = 0, l = obj.length; i < l; i++) {
        if (hasBinary(obj[i])) {
          return true;
        }
      }

      return false;
    }

    if (isBinary(obj)) {
      return true;
    }

    if (obj.toJSON && typeof obj.toJSON === "function" && arguments.length === 1) {
      return hasBinary(obj.toJSON(), true);
    }

    for (var key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key) && hasBinary(obj[key])) {
        return true;
      }
    }

    return false;
  }
  /**
   * Replaces every Buffer | ArrayBuffer | Blob | File in packet with a numbered placeholder.
   *
   * @param {Object} packet - socket.io event packet
   * @return {Object} with deconstructed packet and list of buffers
   * @public
   */


  function deconstructPacket(packet) {
    var buffers = [];
    var packetData = packet.data;
    var pack = packet;
    pack.data = _deconstructPacket(packetData, buffers);
    pack.attachments = buffers.length; // number of binary 'attachments'

    return {
      packet: pack,
      buffers: buffers
    };
  }

  function _deconstructPacket(data, buffers) {
    if (!data) return data;

    if (isBinary(data)) {
      var placeholder = {
        _placeholder: true,
        num: buffers.length
      };
      buffers.push(data);
      return placeholder;
    } else if (Array.isArray(data)) {
      var newData = new Array(data.length);

      for (var i = 0; i < data.length; i++) {
        newData[i] = _deconstructPacket(data[i], buffers);
      }

      return newData;
    } else if (_typeof(data) === "object" && !(data instanceof Date)) {
      var _newData = {};

      for (var key in data) {
        if (data.hasOwnProperty(key)) {
          _newData[key] = _deconstructPacket(data[key], buffers);
        }
      }

      return _newData;
    }

    return data;
  }
  /**
   * Reconstructs a binary packet from its placeholder packet and buffers
   *
   * @param {Object} packet - event packet with placeholders
   * @param {Array} buffers - binary buffers to put in placeholder positions
   * @return {Object} reconstructed packet
   * @public
   */


  function reconstructPacket(packet, buffers) {
    packet.data = _reconstructPacket(packet.data, buffers);
    packet.attachments = undefined; // no longer useful

    return packet;
  }

  function _reconstructPacket(data, buffers) {
    if (!data) return data;

    if (data && data._placeholder) {
      return buffers[data.num]; // appropriate buffer (should be natural order anyway)
    } else if (Array.isArray(data)) {
      for (var i = 0; i < data.length; i++) {
        data[i] = _reconstructPacket(data[i], buffers);
      }
    } else if (_typeof(data) === "object") {
      for (var key in data) {
        if (data.hasOwnProperty(key)) {
          data[key] = _reconstructPacket(data[key], buffers);
        }
      }
    }

    return data;
  }
  /**
   * Protocol version.
   *
   * @public
   */


  var protocol = 5;
  var PacketType;

  (function (PacketType) {
    PacketType[PacketType["CONNECT"] = 0] = "CONNECT";
    PacketType[PacketType["DISCONNECT"] = 1] = "DISCONNECT";
    PacketType[PacketType["EVENT"] = 2] = "EVENT";
    PacketType[PacketType["ACK"] = 3] = "ACK";
    PacketType[PacketType["CONNECT_ERROR"] = 4] = "CONNECT_ERROR";
    PacketType[PacketType["BINARY_EVENT"] = 5] = "BINARY_EVENT";
    PacketType[PacketType["BINARY_ACK"] = 6] = "BINARY_ACK";
  })(PacketType || (PacketType = {}));
  /**
   * A socket.io Encoder instance
   */


  var Encoder = /*#__PURE__*/function () {
    function Encoder() {
      _classCallCheck(this, Encoder);
    }

    _createClass(Encoder, [{
      key: "encode",
      value:
      /**
       * Encode a packet as a single string if non-binary, or as a
       * buffer sequence, depending on packet type.
       *
       * @param {Object} obj - packet object
       */
      function encode(obj) {
        if (obj.type === PacketType.EVENT || obj.type === PacketType.ACK) {
          if (hasBinary(obj)) {
            obj.type = obj.type === PacketType.EVENT ? PacketType.BINARY_EVENT : PacketType.BINARY_ACK;
            return this.encodeAsBinary(obj);
          }
        }

        return [this.encodeAsString(obj)];
      }
      /**
       * Encode packet as string.
       */

    }, {
      key: "encodeAsString",
      value: function encodeAsString(obj) {
        // first is type
        var str = "" + obj.type; // attachments if we have them

        if (obj.type === PacketType.BINARY_EVENT || obj.type === PacketType.BINARY_ACK) {
          str += obj.attachments + "-";
        } // if we have a namespace other than `/`
        // we append it followed by a comma `,`


        if (obj.nsp && "/" !== obj.nsp) {
          str += obj.nsp + ",";
        } // immediately followed by the id


        if (null != obj.id) {
          str += obj.id;
        } // json data


        if (null != obj.data) {
          str += JSON.stringify(obj.data);
        }

        return str;
      }
      /**
       * Encode packet as 'buffer sequence' by removing blobs, and
       * deconstructing packet into object with placeholders and
       * a list of buffers.
       */

    }, {
      key: "encodeAsBinary",
      value: function encodeAsBinary(obj) {
        var deconstruction = deconstructPacket(obj);
        var pack = this.encodeAsString(deconstruction.packet);
        var buffers = deconstruction.buffers;
        buffers.unshift(pack); // add packet info to beginning of data list

        return buffers; // write all the buffers
      }
    }]);

    return Encoder;
  }();
  /**
   * A socket.io Decoder instance
   *
   * @return {Object} decoder
   */


  var Decoder = /*#__PURE__*/function (_Emitter) {
    _inherits(Decoder, _Emitter);

    var _super = _createSuper(Decoder);

    function Decoder() {
      _classCallCheck(this, Decoder);

      return _super.call(this);
    }
    /**
     * Decodes an encoded packet string into packet JSON.
     *
     * @param {String} obj - encoded packet
     */


    _createClass(Decoder, [{
      key: "add",
      value: function add(obj) {
        var packet;

        if (typeof obj === "string") {
          packet = this.decodeString(obj);

          if (packet.type === PacketType.BINARY_EVENT || packet.type === PacketType.BINARY_ACK) {
            // binary packet's json
            this.reconstructor = new BinaryReconstructor(packet); // no attachments, labeled binary but no binary data to follow

            if (packet.attachments === 0) {
              _get(_getPrototypeOf(Decoder.prototype), "emitReserved", this).call(this, "decoded", packet);
            }
          } else {
            // non-binary full packet
            _get(_getPrototypeOf(Decoder.prototype), "emitReserved", this).call(this, "decoded", packet);
          }
        } else if (isBinary(obj) || obj.base64) {
          // raw binary data
          if (!this.reconstructor) {
            throw new Error("got binary data when not reconstructing a packet");
          } else {
            packet = this.reconstructor.takeBinaryData(obj);

            if (packet) {
              // received final buffer
              this.reconstructor = null;

              _get(_getPrototypeOf(Decoder.prototype), "emitReserved", this).call(this, "decoded", packet);
            }
          }
        } else {
          throw new Error("Unknown type: " + obj);
        }
      }
      /**
       * Decode a packet String (JSON data)
       *
       * @param {String} str
       * @return {Object} packet
       */

    }, {
      key: "decodeString",
      value: function decodeString(str) {
        var i = 0; // look up type

        var p = {
          type: Number(str.charAt(0))
        };

        if (PacketType[p.type] === undefined) {
          throw new Error("unknown packet type " + p.type);
        } // look up attachments if type binary


        if (p.type === PacketType.BINARY_EVENT || p.type === PacketType.BINARY_ACK) {
          var start = i + 1;

          while (str.charAt(++i) !== "-" && i != str.length) {}

          var buf = str.substring(start, i);

          if (buf != Number(buf) || str.charAt(i) !== "-") {
            throw new Error("Illegal attachments");
          }

          p.attachments = Number(buf);
        } // look up namespace (if any)


        if ("/" === str.charAt(i + 1)) {
          var _start = i + 1;

          while (++i) {
            var c = str.charAt(i);
            if ("," === c) break;
            if (i === str.length) break;
          }

          p.nsp = str.substring(_start, i);
        } else {
          p.nsp = "/";
        } // look up id


        var next = str.charAt(i + 1);

        if ("" !== next && Number(next) == next) {
          var _start2 = i + 1;

          while (++i) {
            var _c = str.charAt(i);

            if (null == _c || Number(_c) != _c) {
              --i;
              break;
            }

            if (i === str.length) break;
          }

          p.id = Number(str.substring(_start2, i + 1));
        } // look up json data


        if (str.charAt(++i)) {
          var payload = tryParse(str.substr(i));

          if (Decoder.isPayloadValid(p.type, payload)) {
            p.data = payload;
          } else {
            throw new Error("invalid payload");
          }
        }

        return p;
      }
    }, {
      key: "destroy",
      value:
      /**
       * Deallocates a parser's resources
       */
      function destroy() {
        if (this.reconstructor) {
          this.reconstructor.finishedReconstruction();
        }
      }
    }], [{
      key: "isPayloadValid",
      value: function isPayloadValid(type, payload) {
        switch (type) {
          case PacketType.CONNECT:
            return _typeof(payload) === "object";

          case PacketType.DISCONNECT:
            return payload === undefined;

          case PacketType.CONNECT_ERROR:
            return typeof payload === "string" || _typeof(payload) === "object";

          case PacketType.EVENT:
          case PacketType.BINARY_EVENT:
            return Array.isArray(payload) && payload.length > 0;

          case PacketType.ACK:
          case PacketType.BINARY_ACK:
            return Array.isArray(payload);
        }
      }
    }]);

    return Decoder;
  }(Emitter_1);

  function tryParse(str) {
    try {
      return JSON.parse(str);
    } catch (e) {
      return false;
    }
  }
  /**
   * A manager of a binary event's 'buffer sequence'. Should
   * be constructed whenever a packet of type BINARY_EVENT is
   * decoded.
   *
   * @param {Object} packet
   * @return {BinaryReconstructor} initialized reconstructor
   */


  var BinaryReconstructor = /*#__PURE__*/function () {
    function BinaryReconstructor(packet) {
      _classCallCheck(this, BinaryReconstructor);

      this.packet = packet;
      this.buffers = [];
      this.reconPack = packet;
    }
    /**
     * Method to be called when binary data received from connection
     * after a BINARY_EVENT packet.
     *
     * @param {Buffer | ArrayBuffer} binData - the raw binary data received
     * @return {null | Object} returns null if more binary data is expected or
     *   a reconstructed packet object if all buffers have been received.
     */


    _createClass(BinaryReconstructor, [{
      key: "takeBinaryData",
      value: function takeBinaryData(binData) {
        this.buffers.push(binData);

        if (this.buffers.length === this.reconPack.attachments) {
          // done with buffer list
          var packet = reconstructPacket(this.reconPack, this.buffers);
          this.finishedReconstruction();
          return packet;
        }

        return null;
      }
      /**
       * Cleans up binary packet reconstruction variables.
       */

    }, {
      key: "finishedReconstruction",
      value: function finishedReconstruction() {
        this.reconPack = null;
        this.buffers = [];
      }
    }]);

    return BinaryReconstructor;
  }();

  var parser = /*#__PURE__*/Object.freeze({
    __proto__: null,
    protocol: protocol,

    get PacketType() {
      return PacketType;
    },

    Encoder: Encoder,
    Decoder: Decoder
  });

  function on(obj, ev, fn) {
    obj.on(ev, fn);
    return function subDestroy() {
      obj.off(ev, fn);
    };
  }
  /**
   * Internal events.
   * These events can't be emitted by the user.
   */


  var RESERVED_EVENTS = Object.freeze({
    connect: 1,
    connect_error: 1,
    disconnect: 1,
    disconnecting: 1,
    // EventEmitter reserved events: https://nodejs.org/api/events.html#events_event_newlistener
    newListener: 1,
    removeListener: 1
  });

  var Socket = /*#__PURE__*/function (_Emitter) {
    _inherits(Socket, _Emitter);

    var _super = _createSuper(Socket);
    /**
     * `Socket` constructor.
     *
     * @public
     */


    function Socket(io, nsp, opts) {
      var _this;

      _classCallCheck(this, Socket);

      _this = _super.call(this);
      _this.connected = false;
      _this.disconnected = true;
      _this.receiveBuffer = [];
      _this.sendBuffer = [];
      _this.ids = 0;
      _this.acks = {};
      _this.flags = {};
      _this.io = io;
      _this.nsp = nsp;

      if (opts && opts.auth) {
        _this.auth = opts.auth;
      }

      if (_this.io._autoConnect) _this.open();
      return _this;
    }
    /**
     * Subscribe to open, close and packet events
     *
     * @private
     */


    _createClass(Socket, [{
      key: "subEvents",
      value: function subEvents() {
        if (this.subs) return;
        var io = this.io;
        this.subs = [on(io, "open", this.onopen.bind(this)), on(io, "packet", this.onpacket.bind(this)), on(io, "error", this.onerror.bind(this)), on(io, "close", this.onclose.bind(this))];
      }
      /**
       * Whether the Socket will try to reconnect when its Manager connects or reconnects
       */

    }, {
      key: "active",
      get: function get() {
        return !!this.subs;
      }
      /**
       * "Opens" the socket.
       *
       * @public
       */

    }, {
      key: "connect",
      value: function connect() {
        if (this.connected) return this;
        this.subEvents();
        if (!this.io["_reconnecting"]) this.io.open(); // ensure open

        if ("open" === this.io._readyState) this.onopen();
        return this;
      }
      /**
       * Alias for connect()
       */

    }, {
      key: "open",
      value: function open() {
        return this.connect();
      }
      /**
       * Sends a `message` event.
       *
       * @return self
       * @public
       */

    }, {
      key: "send",
      value: function send() {
        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        args.unshift("message");
        this.emit.apply(this, args);
        return this;
      }
      /**
       * Override `emit`.
       * If the event is in `events`, it's emitted normally.
       *
       * @return self
       * @public
       */

    }, {
      key: "emit",
      value: function emit(ev) {
        if (RESERVED_EVENTS.hasOwnProperty(ev)) {
          throw new Error('"' + ev + '" is a reserved event name');
        }

        for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
          args[_key2 - 1] = arguments[_key2];
        }

        args.unshift(ev);
        var packet = {
          type: PacketType.EVENT,
          data: args
        };
        packet.options = {};
        packet.options.compress = this.flags.compress !== false; // event ack callback

        if ("function" === typeof args[args.length - 1]) {
          var id = this.ids++;
          var ack = args.pop();

          this._registerAckCallback(id, ack);

          packet.id = id;
        }

        var isTransportWritable = this.io.engine && this.io.engine.transport && this.io.engine.transport.writable;
        var discardPacket = this.flags["volatile"] && (!isTransportWritable || !this.connected);
        if (discardPacket) ;else if (this.connected) {
          this.packet(packet);
        } else {
          this.sendBuffer.push(packet);
        }
        this.flags = {};
        return this;
      }
      /**
       * @private
       */

    }, {
      key: "_registerAckCallback",
      value: function _registerAckCallback(id, ack) {
        var _this2 = this;

        var timeout = this.flags.timeout;

        if (timeout === undefined) {
          this.acks[id] = ack;
          return;
        } // @ts-ignore


        var timer = this.io.setTimeoutFn(function () {
          delete _this2.acks[id];

          for (var i = 0; i < _this2.sendBuffer.length; i++) {
            if (_this2.sendBuffer[i].id === id) {
              _this2.sendBuffer.splice(i, 1);
            }
          }

          ack.call(_this2, new Error("operation has timed out"));
        }, timeout);

        this.acks[id] = function () {
          // @ts-ignore
          _this2.io.clearTimeoutFn(timer);

          for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
            args[_key3] = arguments[_key3];
          }

          ack.apply(_this2, [null].concat(args));
        };
      }
      /**
       * Sends a packet.
       *
       * @param packet
       * @private
       */

    }, {
      key: "packet",
      value: function packet(_packet) {
        _packet.nsp = this.nsp;

        this.io._packet(_packet);
      }
      /**
       * Called upon engine `open`.
       *
       * @private
       */

    }, {
      key: "onopen",
      value: function onopen() {
        var _this3 = this;

        if (typeof this.auth == "function") {
          this.auth(function (data) {
            _this3.packet({
              type: PacketType.CONNECT,
              data: data
            });
          });
        } else {
          this.packet({
            type: PacketType.CONNECT,
            data: this.auth
          });
        }
      }
      /**
       * Called upon engine or manager `error`.
       *
       * @param err
       * @private
       */

    }, {
      key: "onerror",
      value: function onerror(err) {
        if (!this.connected) {
          this.emitReserved("connect_error", err);
        }
      }
      /**
       * Called upon engine `close`.
       *
       * @param reason
       * @private
       */

    }, {
      key: "onclose",
      value: function onclose(reason) {
        this.connected = false;
        this.disconnected = true;
        delete this.id;
        this.emitReserved("disconnect", reason);
      }
      /**
       * Called with socket packet.
       *
       * @param packet
       * @private
       */

    }, {
      key: "onpacket",
      value: function onpacket(packet) {
        var sameNamespace = packet.nsp === this.nsp;
        if (!sameNamespace) return;

        switch (packet.type) {
          case PacketType.CONNECT:
            if (packet.data && packet.data.sid) {
              var id = packet.data.sid;
              this.onconnect(id);
            } else {
              this.emitReserved("connect_error", new Error("It seems you are trying to reach a Socket.IO server in v2.x with a v3.x client, but they are not compatible (more information here: https://socket.io/docs/v3/migrating-from-2-x-to-3-0/)"));
            }

            break;

          case PacketType.EVENT:
            this.onevent(packet);
            break;

          case PacketType.BINARY_EVENT:
            this.onevent(packet);
            break;

          case PacketType.ACK:
            this.onack(packet);
            break;

          case PacketType.BINARY_ACK:
            this.onack(packet);
            break;

          case PacketType.DISCONNECT:
            this.ondisconnect();
            break;

          case PacketType.CONNECT_ERROR:
            this.destroy();
            var err = new Error(packet.data.message); // @ts-ignore

            err.data = packet.data.data;
            this.emitReserved("connect_error", err);
            break;
        }
      }
      /**
       * Called upon a server event.
       *
       * @param packet
       * @private
       */

    }, {
      key: "onevent",
      value: function onevent(packet) {
        var args = packet.data || [];

        if (null != packet.id) {
          args.push(this.ack(packet.id));
        }

        if (this.connected) {
          this.emitEvent(args);
        } else {
          this.receiveBuffer.push(Object.freeze(args));
        }
      }
    }, {
      key: "emitEvent",
      value: function emitEvent(args) {
        if (this._anyListeners && this._anyListeners.length) {
          var listeners = this._anyListeners.slice();

          var _iterator = _createForOfIteratorHelper(listeners),
              _step;

          try {
            for (_iterator.s(); !(_step = _iterator.n()).done;) {
              var listener = _step.value;
              listener.apply(this, args);
            }
          } catch (err) {
            _iterator.e(err);
          } finally {
            _iterator.f();
          }
        }

        _get(_getPrototypeOf(Socket.prototype), "emit", this).apply(this, args);
      }
      /**
       * Produces an ack callback to emit with an event.
       *
       * @private
       */

    }, {
      key: "ack",
      value: function ack(id) {
        var self = this;
        var sent = false;
        return function () {
          // prevent double callbacks
          if (sent) return;
          sent = true;

          for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
            args[_key4] = arguments[_key4];
          }

          self.packet({
            type: PacketType.ACK,
            id: id,
            data: args
          });
        };
      }
      /**
       * Called upon a server acknowlegement.
       *
       * @param packet
       * @private
       */

    }, {
      key: "onack",
      value: function onack(packet) {
        var ack = this.acks[packet.id];

        if ("function" === typeof ack) {
          ack.apply(this, packet.data);
          delete this.acks[packet.id];
        }
      }
      /**
       * Called upon server connect.
       *
       * @private
       */

    }, {
      key: "onconnect",
      value: function onconnect(id) {
        this.id = id;
        this.connected = true;
        this.disconnected = false;
        this.emitBuffered();
        this.emitReserved("connect");
      }
      /**
       * Emit buffered events (received and emitted).
       *
       * @private
       */

    }, {
      key: "emitBuffered",
      value: function emitBuffered() {
        var _this4 = this;

        this.receiveBuffer.forEach(function (args) {
          return _this4.emitEvent(args);
        });
        this.receiveBuffer = [];
        this.sendBuffer.forEach(function (packet) {
          return _this4.packet(packet);
        });
        this.sendBuffer = [];
      }
      /**
       * Called upon server disconnect.
       *
       * @private
       */

    }, {
      key: "ondisconnect",
      value: function ondisconnect() {
        this.destroy();
        this.onclose("io server disconnect");
      }
      /**
       * Called upon forced client/server side disconnections,
       * this method ensures the manager stops tracking us and
       * that reconnections don't get triggered for this.
       *
       * @private
       */

    }, {
      key: "destroy",
      value: function destroy() {
        if (this.subs) {
          // clean subscriptions to avoid reconnections
          this.subs.forEach(function (subDestroy) {
            return subDestroy();
          });
          this.subs = undefined;
        }

        this.io["_destroy"](this);
      }
      /**
       * Disconnects the socket manually.
       *
       * @return self
       * @public
       */

    }, {
      key: "disconnect",
      value: function disconnect() {
        if (this.connected) {
          this.packet({
            type: PacketType.DISCONNECT
          });
        } // remove socket from pool


        this.destroy();

        if (this.connected) {
          // fire events
          this.onclose("io client disconnect");
        }

        return this;
      }
      /**
       * Alias for disconnect()
       *
       * @return self
       * @public
       */

    }, {
      key: "close",
      value: function close() {
        return this.disconnect();
      }
      /**
       * Sets the compress flag.
       *
       * @param compress - if `true`, compresses the sending data
       * @return self
       * @public
       */

    }, {
      key: "compress",
      value: function compress(_compress) {
        this.flags.compress = _compress;
        return this;
      }
      /**
       * Sets a modifier for a subsequent event emission that the event message will be dropped when this socket is not
       * ready to send messages.
       *
       * @returns self
       * @public
       */

    }, {
      key: "volatile",
      get: function get() {
        this.flags["volatile"] = true;
        return this;
      }
      /**
       * Sets a modifier for a subsequent event emission that the callback will be called with an error when the
       * given number of milliseconds have elapsed without an acknowledgement from the server:
       *
       * ```
       * socket.timeout(5000).emit("my-event", (err) => {
       *   if (err) {
       *     // the server did not acknowledge the event in the given delay
       *   }
       * });
       * ```
       *
       * @returns self
       * @public
       */

    }, {
      key: "timeout",
      value: function timeout(_timeout) {
        this.flags.timeout = _timeout;
        return this;
      }
      /**
       * Adds a listener that will be fired when any event is emitted. The event name is passed as the first argument to the
       * callback.
       *
       * @param listener
       * @public
       */

    }, {
      key: "onAny",
      value: function onAny(listener) {
        this._anyListeners = this._anyListeners || [];

        this._anyListeners.push(listener);

        return this;
      }
      /**
       * Adds a listener that will be fired when any event is emitted. The event name is passed as the first argument to the
       * callback. The listener is added to the beginning of the listeners array.
       *
       * @param listener
       * @public
       */

    }, {
      key: "prependAny",
      value: function prependAny(listener) {
        this._anyListeners = this._anyListeners || [];

        this._anyListeners.unshift(listener);

        return this;
      }
      /**
       * Removes the listener that will be fired when any event is emitted.
       *
       * @param listener
       * @public
       */

    }, {
      key: "offAny",
      value: function offAny(listener) {
        if (!this._anyListeners) {
          return this;
        }

        if (listener) {
          var listeners = this._anyListeners;

          for (var i = 0; i < listeners.length; i++) {
            if (listener === listeners[i]) {
              listeners.splice(i, 1);
              return this;
            }
          }
        } else {
          this._anyListeners = [];
        }

        return this;
      }
      /**
       * Returns an array of listeners that are listening for any event that is specified. This array can be manipulated,
       * e.g. to remove listeners.
       *
       * @public
       */

    }, {
      key: "listenersAny",
      value: function listenersAny() {
        return this._anyListeners || [];
      }
    }]);

    return Socket;
  }(Emitter_1);
  /**
   * Expose `Backoff`.
   */


  var backo2 = Backoff;
  /**
   * Initialize backoff timer with `opts`.
   *
   * - `min` initial timeout in milliseconds [100]
   * - `max` max timeout [10000]
   * - `jitter` [0]
   * - `factor` [2]
   *
   * @param {Object} opts
   * @api public
   */

  function Backoff(opts) {
    opts = opts || {};
    this.ms = opts.min || 100;
    this.max = opts.max || 10000;
    this.factor = opts.factor || 2;
    this.jitter = opts.jitter > 0 && opts.jitter <= 1 ? opts.jitter : 0;
    this.attempts = 0;
  }
  /**
   * Return the backoff duration.
   *
   * @return {Number}
   * @api public
   */


  Backoff.prototype.duration = function () {
    var ms = this.ms * Math.pow(this.factor, this.attempts++);

    if (this.jitter) {
      var rand = Math.random();
      var deviation = Math.floor(rand * this.jitter * ms);
      ms = (Math.floor(rand * 10) & 1) == 0 ? ms - deviation : ms + deviation;
    }

    return Math.min(ms, this.max) | 0;
  };
  /**
   * Reset the number of attempts.
   *
   * @api public
   */


  Backoff.prototype.reset = function () {
    this.attempts = 0;
  };
  /**
   * Set the minimum duration
   *
   * @api public
   */


  Backoff.prototype.setMin = function (min) {
    this.ms = min;
  };
  /**
   * Set the maximum duration
   *
   * @api public
   */


  Backoff.prototype.setMax = function (max) {
    this.max = max;
  };
  /**
   * Set the jitter
   *
   * @api public
   */


  Backoff.prototype.setJitter = function (jitter) {
    this.jitter = jitter;
  };

  var Manager = /*#__PURE__*/function (_Emitter) {
    _inherits(Manager, _Emitter);

    var _super = _createSuper(Manager);

    function Manager(uri, opts) {
      var _this;

      _classCallCheck(this, Manager);

      var _a;

      _this = _super.call(this);
      _this.nsps = {};
      _this.subs = [];

      if (uri && "object" === _typeof(uri)) {
        opts = uri;
        uri = undefined;
      }

      opts = opts || {};
      opts.path = opts.path || "/socket.io";
      _this.opts = opts;
      installTimerFunctions(_assertThisInitialized(_this), opts);

      _this.reconnection(opts.reconnection !== false);

      _this.reconnectionAttempts(opts.reconnectionAttempts || Infinity);

      _this.reconnectionDelay(opts.reconnectionDelay || 1000);

      _this.reconnectionDelayMax(opts.reconnectionDelayMax || 5000);

      _this.randomizationFactor((_a = opts.randomizationFactor) !== null && _a !== void 0 ? _a : 0.5);

      _this.backoff = new backo2({
        min: _this.reconnectionDelay(),
        max: _this.reconnectionDelayMax(),
        jitter: _this.randomizationFactor()
      });

      _this.timeout(null == opts.timeout ? 20000 : opts.timeout);

      _this._readyState = "closed";
      _this.uri = uri;

      var _parser = opts.parser || parser;

      _this.encoder = new _parser.Encoder();
      _this.decoder = new _parser.Decoder();
      _this._autoConnect = opts.autoConnect !== false;
      if (_this._autoConnect) _this.open();
      return _this;
    }

    _createClass(Manager, [{
      key: "reconnection",
      value: function reconnection(v) {
        if (!arguments.length) return this._reconnection;
        this._reconnection = !!v;
        return this;
      }
    }, {
      key: "reconnectionAttempts",
      value: function reconnectionAttempts(v) {
        if (v === undefined) return this._reconnectionAttempts;
        this._reconnectionAttempts = v;
        return this;
      }
    }, {
      key: "reconnectionDelay",
      value: function reconnectionDelay(v) {
        var _a;

        if (v === undefined) return this._reconnectionDelay;
        this._reconnectionDelay = v;
        (_a = this.backoff) === null || _a === void 0 ? void 0 : _a.setMin(v);
        return this;
      }
    }, {
      key: "randomizationFactor",
      value: function randomizationFactor(v) {
        var _a;

        if (v === undefined) return this._randomizationFactor;
        this._randomizationFactor = v;
        (_a = this.backoff) === null || _a === void 0 ? void 0 : _a.setJitter(v);
        return this;
      }
    }, {
      key: "reconnectionDelayMax",
      value: function reconnectionDelayMax(v) {
        var _a;

        if (v === undefined) return this._reconnectionDelayMax;
        this._reconnectionDelayMax = v;
        (_a = this.backoff) === null || _a === void 0 ? void 0 : _a.setMax(v);
        return this;
      }
    }, {
      key: "timeout",
      value: function timeout(v) {
        if (!arguments.length) return this._timeout;
        this._timeout = v;
        return this;
      }
      /**
       * Starts trying to reconnect if reconnection is enabled and we have not
       * started reconnecting yet
       *
       * @private
       */

    }, {
      key: "maybeReconnectOnOpen",
      value: function maybeReconnectOnOpen() {
        // Only try to reconnect if it's the first time we're connecting
        if (!this._reconnecting && this._reconnection && this.backoff.attempts === 0) {
          // keeps reconnection from firing twice for the same reconnection loop
          this.reconnect();
        }
      }
      /**
       * Sets the current transport `socket`.
       *
       * @param {Function} fn - optional, callback
       * @return self
       * @public
       */

    }, {
      key: "open",
      value: function open(fn) {
        var _this2 = this;

        if (~this._readyState.indexOf("open")) return this;
        this.engine = new Socket$1(this.uri, this.opts);
        var socket = this.engine;
        var self = this;
        this._readyState = "opening";
        this.skipReconnect = false; // emit `open`

        var openSubDestroy = on(socket, "open", function () {
          self.onopen();
          fn && fn();
        }); // emit `error`

        var errorSub = on(socket, "error", function (err) {
          self.cleanup();
          self._readyState = "closed";

          _this2.emitReserved("error", err);

          if (fn) {
            fn(err);
          } else {
            // Only do this if there is no fn to handle the error
            self.maybeReconnectOnOpen();
          }
        });

        if (false !== this._timeout) {
          var timeout = this._timeout;

          if (timeout === 0) {
            openSubDestroy(); // prevents a race condition with the 'open' event
          } // set timer


          var timer = this.setTimeoutFn(function () {
            openSubDestroy();
            socket.close(); // @ts-ignore

            socket.emit("error", new Error("timeout"));
          }, timeout);

          if (this.opts.autoUnref) {
            timer.unref();
          }

          this.subs.push(function subDestroy() {
            clearTimeout(timer);
          });
        }

        this.subs.push(openSubDestroy);
        this.subs.push(errorSub);
        return this;
      }
      /**
       * Alias for open()
       *
       * @return self
       * @public
       */

    }, {
      key: "connect",
      value: function connect(fn) {
        return this.open(fn);
      }
      /**
       * Called upon transport open.
       *
       * @private
       */

    }, {
      key: "onopen",
      value: function onopen() {
        // clear old subs
        this.cleanup(); // mark as open

        this._readyState = "open";
        this.emitReserved("open"); // add new subs

        var socket = this.engine;
        this.subs.push(on(socket, "ping", this.onping.bind(this)), on(socket, "data", this.ondata.bind(this)), on(socket, "error", this.onerror.bind(this)), on(socket, "close", this.onclose.bind(this)), on(this.decoder, "decoded", this.ondecoded.bind(this)));
      }
      /**
       * Called upon a ping.
       *
       * @private
       */

    }, {
      key: "onping",
      value: function onping() {
        this.emitReserved("ping");
      }
      /**
       * Called with data.
       *
       * @private
       */

    }, {
      key: "ondata",
      value: function ondata(data) {
        this.decoder.add(data);
      }
      /**
       * Called when parser fully decodes a packet.
       *
       * @private
       */

    }, {
      key: "ondecoded",
      value: function ondecoded(packet) {
        this.emitReserved("packet", packet);
      }
      /**
       * Called upon socket error.
       *
       * @private
       */

    }, {
      key: "onerror",
      value: function onerror(err) {
        this.emitReserved("error", err);
      }
      /**
       * Creates a new socket for the given `nsp`.
       *
       * @return {Socket}
       * @public
       */

    }, {
      key: "socket",
      value: function socket(nsp, opts) {
        var socket = this.nsps[nsp];

        if (!socket) {
          socket = new Socket(this, nsp, opts);
          this.nsps[nsp] = socket;
        }

        return socket;
      }
      /**
       * Called upon a socket close.
       *
       * @param socket
       * @private
       */

    }, {
      key: "_destroy",
      value: function _destroy(socket) {
        var nsps = Object.keys(this.nsps);

        for (var _i = 0, _nsps = nsps; _i < _nsps.length; _i++) {
          var nsp = _nsps[_i];
          var _socket = this.nsps[nsp];

          if (_socket.active) {
            return;
          }
        }

        this._close();
      }
      /**
       * Writes a packet.
       *
       * @param packet
       * @private
       */

    }, {
      key: "_packet",
      value: function _packet(packet) {
        var encodedPackets = this.encoder.encode(packet);

        for (var i = 0; i < encodedPackets.length; i++) {
          this.engine.write(encodedPackets[i], packet.options);
        }
      }
      /**
       * Clean up transport subscriptions and packet buffer.
       *
       * @private
       */

    }, {
      key: "cleanup",
      value: function cleanup() {
        this.subs.forEach(function (subDestroy) {
          return subDestroy();
        });
        this.subs.length = 0;
        this.decoder.destroy();
      }
      /**
       * Close the current socket.
       *
       * @private
       */

    }, {
      key: "_close",
      value: function _close() {
        this.skipReconnect = true;
        this._reconnecting = false;
        this.onclose("forced close");
        if (this.engine) this.engine.close();
      }
      /**
       * Alias for close()
       *
       * @private
       */

    }, {
      key: "disconnect",
      value: function disconnect() {
        return this._close();
      }
      /**
       * Called upon engine close.
       *
       * @private
       */

    }, {
      key: "onclose",
      value: function onclose(reason) {
        this.cleanup();
        this.backoff.reset();
        this._readyState = "closed";
        this.emitReserved("close", reason);

        if (this._reconnection && !this.skipReconnect) {
          this.reconnect();
        }
      }
      /**
       * Attempt a reconnection.
       *
       * @private
       */

    }, {
      key: "reconnect",
      value: function reconnect() {
        var _this3 = this;

        if (this._reconnecting || this.skipReconnect) return this;
        var self = this;

        if (this.backoff.attempts >= this._reconnectionAttempts) {
          this.backoff.reset();
          this.emitReserved("reconnect_failed");
          this._reconnecting = false;
        } else {
          var delay = this.backoff.duration();
          this._reconnecting = true;
          var timer = this.setTimeoutFn(function () {
            if (self.skipReconnect) return;

            _this3.emitReserved("reconnect_attempt", self.backoff.attempts); // check again for the case socket closed in above events


            if (self.skipReconnect) return;
            self.open(function (err) {
              if (err) {
                self._reconnecting = false;
                self.reconnect();

                _this3.emitReserved("reconnect_error", err);
              } else {
                self.onreconnect();
              }
            });
          }, delay);

          if (this.opts.autoUnref) {
            timer.unref();
          }

          this.subs.push(function subDestroy() {
            clearTimeout(timer);
          });
        }
      }
      /**
       * Called upon successful reconnect.
       *
       * @private
       */

    }, {
      key: "onreconnect",
      value: function onreconnect() {
        var attempt = this.backoff.attempts;
        this._reconnecting = false;
        this.backoff.reset();
        this.emitReserved("reconnect", attempt);
      }
    }]);

    return Manager;
  }(Emitter_1);
  /**
   * Managers cache.
   */


  var cache = {};

  function lookup(uri, opts) {
    if (_typeof(uri) === "object") {
      opts = uri;
      uri = undefined;
    }

    opts = opts || {};
    var parsed = url(uri, opts.path || "/socket.io");
    var source = parsed.source;
    var id = parsed.id;
    var path = parsed.path;
    var sameNamespace = cache[id] && path in cache[id]["nsps"];
    var newConnection = opts.forceNew || opts["force new connection"] || false === opts.multiplex || sameNamespace;
    var io;

    if (newConnection) {
      io = new Manager(source, opts);
    } else {
      if (!cache[id]) {
        cache[id] = new Manager(source, opts);
      }

      io = cache[id];
    }

    if (parsed.query && !opts.query) {
      opts.query = parsed.queryKey;
    }

    return io.socket(parsed.path, opts);
  } // so that "lookup" can be used both as a function (e.g. `io(...)`) and as a
  // namespace (e.g. `io.connect(...)`), for backward compatibility


  _extends(lookup, {
    Manager: Manager,
    Socket: Socket,
    io: lookup,
    connect: lookup
  });

  return lookup;
});
}(socket_io));

//import { handleSocketEvent } from '../../utils/socketclient';

const socket = socket_io.exports.io();

class App extends LightningElement {
  constructor(...args) {
    super(...args);
    this.sessionGameNum = void 0;
    this.sessionState = void 0;
    this.sessionUserName = void 0;
    this.errorState = false;
    this.errorMessage = void 0;
    this.gamePlayerCount = 0;
    this.gamePlayerList = void 0;
    this.gamePlayerScore = 0;
  }

  connectedCallback() {
    this.addEventListener('state_change', this.handleStateChange);
    this.addEventListener('error_message', this.handleErrorMessage);
    this.sessionState = SESSION.sessionState;
    socket.on("connect", () => {
      console.log("app.socketid: " + socket.id);
    });
    socket.onAny((event, data) => {
      console.log(`app.event-received: ${event} - ${JSON.stringify(data)}`);
      this.handleSocketEvent(event, data);
    });
  } //lwc events


  handleStateChange(evt) {
    // console.log('app.handleStateChange: ' + evt.detail.name);
    // console.log(evt);
    if (evt.detail.name === 'LoginRegister') {
      SESSION.sessionState = this.sessionState = SESSIONSTATES.IN_LOGIN;
    }

    if (evt.detail.name === 'LoggedIn') {
      this.errorState = false; //if previous login error

      SESSION.sessionState = this.sessionState = SESSIONSTATES.IN_LOBBY;
      this.sessionUserName = SESSION.userName;
    }

    if (evt.detail.name === 'NewGame') {
      SESSION.sessionState = this.sessionState = SESSIONSTATES.IN_NEWGAME;
      this.sessionGameNum = SESSION.gameNum;
      this.sessionUserName = SESSION.userName;
      this.template.querySelector('ui-header').updateHost();
    }

    if (evt.detail.name === 'JoinedGame') {
      // socket.emit('joinedgame', {'gameid5': evt.detail.gameid5, 'userid': evt.detail.userid});
      socket.emit('joinedgame', SESSION);

      if (!SESSION.host) {
        SESSION.sessionState = this.sessionState = SESSIONSTATES.IN_WAITING_GAME_START;
        this.sessionGameNum = SESSION.gameNum;
        this.sessionUserName = SESSION.userName;
      } // console.log({'event':'joinedgame','gameid5': evt.detail.gameid5, 'userid': evt.detail.userid});

    }

    if (evt.detail.name === 'GameEnded') {
      SESSION.sessionState = this.sessionState = SESSIONSTATES.IN_LOBBY;
      SESSION.gameId = SESSION.gameNum = SESSION.gameState = 'notset';
      SESSION.host = false;
      this.sessionUserName = this.sessionGameNum = '';
    }
  } // UI expressions to dynamically render templates (return true or false)


  get isInLobbyState() {
    return this.sessionState === SESSIONSTATES.IN_LOBBY;
  }

  get isLoginRegState() {
    return this.sessionState === SESSIONSTATES.IN_LOGIN;
  }

  get isNewGameState() {
    return this.sessionState === SESSIONSTATES.IN_NEWGAME;
  }

  get isJoinedGameState() {
    return this.sessionState === SESSIONSTATES.IN_WAITING_GAME_START;
  }

  get isErrorMessage() {
    return this.errorState;
  } //handle socket events


  handleSocketEvent(event, data) {
    switch (event) {
      case 'player-joined':
        //increment player count 
        this.gamePlayerCount = data.length; //this.gamePlayerList = JSON.stringify(data);

        this.gamePlayerList = "";

        for (let i in data) {
          this.gamePlayerList += data[i].username + '  ';
        }
    }
  } //error handling


  handleErrorMessage(evt) {
    // console.log('app.handleErrorMessage: ' + evt.detail.errormsg);
    this.errorMessage = evt.detail.errormsg;
    this.errorState = true;
  }

}

registerDecorators(App, {
  fields: ["sessionGameNum", "sessionState", "sessionUserName", "errorState", "errorMessage", "gamePlayerCount", "gamePlayerList", "gamePlayerScore"]
});

var App$1 = registerComponent(App, {
  tmpl: _tmpl
});

const elmnt = createElement("ui-app", {
  is: App$1
});
document.querySelector('#lwc-main').appendChild(elmnt);
