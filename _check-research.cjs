// Run: node _check-research.cjs
const assert = require('node:assert/strict');
const vm = require('node:vm');
const fs = require('node:fs');
const classes = new Set();
const events = {};
const frame = [];
const heading = { setAttribute() {}, focus() { this.focused = true; } };
const tab = { focus() { this.focused = true; } };
const research = {
  classList: { add: (v) => classes.add(v), remove: (v) => classes.delete(v), contains: (v) => classes.has(v) },
  querySelector: (s) => s.includes('h4') ? heading : s.includes('.active') ? tab : { setAttribute() {} },
  addEventListener: (type, handler) => { events[type] = handler; },
  scrollIntoView() {},
};
const overview = { hidden: true, addEventListener(type, handler) { this.click = handler; }, scrollIntoView() {} };
vm.runInNewContext(fs.readFileSync('research.js', 'utf8'), {
  document: { querySelector: (s) => s.startsWith('#') ? overview : research },
  requestAnimationFrame: (fn) => frame.push(fn),
});
assert(classes.has('research-ready') && !classes.has('research-detail'));
events.click({ target: { closest: () => null } });
assert(!classes.has('research-detail'));
events.click({ target: { closest: () => tab } }); // Includes the initially active tab.
events['shown.bs.tab']();
assert(classes.has('research-detail') && !overview.hidden);
assert.equal(frame.length, 1);
frame.shift()();
assert(heading.focused);
overview.click();
assert(!classes.has('research-detail') && overview.hidden && tab.focused);
events['shown.bs.tab'](); // Keyboard tab selection also enters detail mode.
assert(classes.has('research-detail') && !overview.hidden);
console.log('PASS: card/keyboard entry, ignored body clicks, detail focus, return to grid');
