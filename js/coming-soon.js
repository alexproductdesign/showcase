/* "Coming soon" pill that follows the cursor over disabled nav items. */
(function () {
  const items = document.querySelectorAll('.coming-soon');
  if (!items.length) return;

  const tip = document.createElement('div');
  tip.className = 'coming-soon-tip';
  tip.innerHTML =
    '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" stroke-width="2"/><path d="M12 7.5V12l3 2" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>' +
    'Coming soon';
  document.body.appendChild(tip);

  function move(e) {
    tip.style.left = (e.clientX + 16) + 'px';
    tip.style.top = (e.clientY + 20) + 'px';
  }

  items.forEach(function (el) {
    el.addEventListener('pointerenter', function (e) {
      tip.classList.add('is-visible');
      move(e);
    });
    el.addEventListener('pointermove', move);
    el.addEventListener('pointerleave', function () {
      tip.classList.remove('is-visible');
    });
    el.addEventListener('click', function (e) { e.preventDefault(); });
  });
})();
