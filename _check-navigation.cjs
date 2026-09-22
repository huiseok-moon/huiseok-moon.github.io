// Run: node _check-navigation.cjs
const assert = require('node:assert/strict');
const vm = require('node:vm');
const fs = require('node:fs');
const source = fs.readFileSync('navigation.js', 'utf8');
const events = {};
const fetched = [];
const menu = { addEventListener: (type, handler) => { events[type] = handler; } };
const context = {
  document: { querySelector: () => menu },
  navigator: {}, URL,
  location: new URL('https://example.com/'),
  fetch: async (url) => {
    fetched.push(url);
    return { ok: true, arrayBuffer: async () => new ArrayBuffer(0) };
  },
};
vm.runInNewContext(source, context);
const event = (href, extra = {}) => ({ target: { closest: () => ({ href, target: '', hasAttribute: () => false, ...extra }) } });
events.pointerover(event('https://example.com/research.html'));
events.focusin(event('https://example.com/research.html'));
events.touchstart(event('https://example.com/cv.html'));
for (const url of ['https://example.com/', 'https://other.com/page.html', 'mailto:me@example.com', 'https://example.com/cv.html#section', 'https://example.com/cv.html?x=1', 'https://example.com/file.pdf']) {
  events.pointerover(event(url));
}
events.pointerover(event('https://example.com/publications.html', { target: '_blank' }));
events.pointerover(event('https://example.com/publications.html', { hasAttribute: () => true }));
assert.deepEqual(fetched, ['https://example.com/research.html', 'https://example.com/cv.html']);
vm.runInNewContext(source, { ...context, navigator: { connection: { saveData: true } }, document: { querySelector: () => ({ addEventListener() { assert.fail('Data saver must disable prefetch'); } }) } });
console.log('PASS: internal HTML only, deduplication, hover/focus/touch, data saver');
