const research = document.querySelector('.panel-tabset.research-tabs');
const overview = document.querySelector('#research-overview');

if (research && overview) {
  research.classList.add('research-ready');
  research.querySelector('[role="tablist"]').setAttribute('aria-label', 'Research topics');

  const showDetail = () => {
    const entering = !research.classList.contains('research-detail');
    research.classList.add('research-detail');
    overview.hidden = false;
    if (entering) {
      requestAnimationFrame(() => {
        const heading = research.querySelector('.tab-pane.active h4');
        heading.setAttribute('tabindex', '-1');
        heading.focus({ preventScroll: true });
        overview.scrollIntoView({ block: 'start', behavior: 'instant' });
      });
    }
  };

  // A click on the initially active tab does not emit Bootstrap's shown event.
  research.addEventListener('click', (event) => {
    if (event.target.closest('[role="tab"]')) showDetail();
  });
  research.addEventListener('shown.bs.tab', showDetail);
  overview.addEventListener('click', () => {
    research.classList.remove('research-detail');
    overview.hidden = true;
    const selected = research.querySelector('[role="tab"].active');
    selected.focus({ preventScroll: true });
    research.scrollIntoView({ block: 'start', behavior: 'instant' });
  });
}
