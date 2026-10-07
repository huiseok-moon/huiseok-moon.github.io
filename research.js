const research = document.querySelector('.panel-tabset.research-tabs');
const overview = document.querySelector('#research-overview');

if (research && overview) {
  research.classList.add('research-ready');
  research.querySelector('[role="tablist"]').setAttribute('aria-label', 'Research topics');
  research.querySelectorAll('[role="tab"]').forEach((tab, index) => {
    tab.style.viewTransitionName = `research-topic-${index}`;
  });
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  let transition;
  let updating = false;
  let requestedTab;

  const navigate = (tab) => {
    requestedTab = tab;
    transition?.skipTransition();
    const update = () => {
      // Read the latest selection even if an earlier animation was interrupted.
      const target = requestedTab;
      const entering = target && !research.classList.contains('research-detail');
      updating = true;
      if (target) bootstrap.Tab.getOrCreateInstance(target).show();
      updating = false;
      research.classList.toggle('research-detail', Boolean(target));
      overview.hidden = !target;
      if (entering) {
        const heading = research.querySelector('.tab-pane.active h4');
        heading.setAttribute('tabindex', '-1');
        heading.focus({ preventScroll: true });
        overview.scrollIntoView({ block: 'start', behavior: 'instant' });
      } else if (!target) {
        research.querySelector('[role="tab"].active').focus({ preventScroll: true });
        research.scrollIntoView({ block: 'start', behavior: 'instant' });
      }
    };
    if (document.startViewTransition && !reducedMotion.matches) {
      transition = document.startViewTransition(update);
      // A skipped animation still runs its update callback.
      transition.ready.catch(() => {});
    } else {
      update();
    }
  };

  research.addEventListener('click', (event) => {
    const tab = event.target.closest('[role="tab"]');
    if (!tab) return;
    event.preventDefault();
    event.stopPropagation();
    navigate(tab);
  });
  // Bootstrap's arrow-key navigation uses the same animated update.
  research.addEventListener('show.bs.tab', (event) => {
    if (updating) return;
    event.preventDefault();
    navigate(event.target);
  });
  research.addEventListener('shown.bs.tab', (event) => {
    document.getElementById(event.target.getAttribute('aria-controls'))
      ?.querySelectorAll('video[autoplay]')
      .forEach((video) => video.play().catch(() => {}));
  });
  overview.addEventListener('click', () => navigate(null));

  const linkedPane = location.hash && document.getElementById(location.hash.slice(1))?.closest('.tab-pane');
  const linkedTab = linkedPane && research.querySelector(`[role="tab"][aria-controls="${linkedPane.id}"]`);
  if (linkedTab) navigate(linkedTab);
}
