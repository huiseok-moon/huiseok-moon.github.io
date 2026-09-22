// Run: node _check-research.cjs
const assert = require('node:assert/strict');
const vm = require('node:vm');
const fs = require('node:fs');
const source = fs.readFileSync('research.js', 'utf8');
for (const [supported, reduced] of [[true, false], [false, false], [true, true]]) {
  const classes = new Set();
  const events = {};
  const updates = [];
  const tabs = [0, 1].map(() => ({ style: {}, focus() { this.focused = true; } }));
  let selected = tabs[0];
  let skipped = 0;
  const heading = { setAttribute() {}, focus() { this.focused = true; } };
  const research = {
    classList: {
      add: (v) => classes.add(v), contains: (v) => classes.has(v),
      toggle: (v, on) => on ? classes.add(v) : classes.delete(v),
    },
    querySelector: (s) => s.includes('h4') ? heading : s.includes('.active') ? selected : { setAttribute() {} },
    querySelectorAll: () => tabs,
    addEventListener: (type, handler) => { events[type] = handler; },
    scrollIntoView() {},
  };
  const overview = { hidden: true, addEventListener(type, handler) { this.click = handler; }, scrollIntoView() {} };
  const showEvent = (tab) => ({ target: tab, preventDefault() { this.prevented = true; } });
  const document = { querySelector: (s) => s.startsWith('#') ? overview : research };
  if (supported) document.startViewTransition = (update) => {
    updates.push(update);
    return { skipTransition() { skipped++; }, ready: Promise.resolve() };
  };
  vm.runInNewContext(source, {
    document, matchMedia: () => ({ matches: reduced }),
    bootstrap: { Tab: { getOrCreateInstance: (tab) => ({ show() {
      const event = showEvent(tab);
      events['show.bs.tab'](event);
      if (!event.prevented) selected = tab;
    } }) } },
  });
  const flush = () => { while (updates.length) updates.shift()(); };
  const click = (tab) => events.click({ target: { closest: () => tab }, preventDefault() {}, stopPropagation() {} });
  assert(classes.has('research-ready') && !classes.has('research-detail'));
  assert.notEqual(tabs[0].style.viewTransitionName, tabs[1].style.viewTransitionName);
  click(null);
  assert(!classes.has('research-detail'));
  click(tabs[0]); // The initially active card must also open detail mode.
  assert.equal(updates.length, supported && !reduced ? 1 : 0);
  flush();
  assert(classes.has('research-detail') && !overview.hidden && heading.focused);
  click(tabs[1]);
  flush();
  assert.equal(selected, tabs[1]);
  const keyboardEvent = showEvent(tabs[0]);
  events['show.bs.tab'](keyboardEvent);
  assert(keyboardEvent.prevented);
  flush();
  assert.equal(selected, tabs[0]);
  click(tabs[1]);
  overview.click(); // A rapid return must not be undone by a pending callback.
  flush();
  assert(!classes.has('research-detail') && overview.hidden && selected.focused);
  if (supported && !reduced) assert(skipped > 0);
}
console.log('PASS: animated/fallback/reduced-motion paths, card and keyboard selection, interrupted return');
