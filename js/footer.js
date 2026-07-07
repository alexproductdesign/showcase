/* Footer: eyes that follow the cursor + copy-email button. */
(function () {
  // --- eyes ---
  const eyes = Array.from(document.querySelectorAll('.d-eye'));
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (eyes.length && !reduced) {
    let px = null, py = null, raf = null;

    function update() {
      raf = null;
      eyes.forEach(function (eye) {
        const r = eye.getBoundingClientRect();
        const cx = r.left + r.width / 2;
        const cy = r.top + r.height / 2;
        const dx = px - cx;
        const dy = py - cy;
        const a = Math.atan2(dy, dx);
        // elliptical travel, keeps the pupil inside the egg shape
        const rx = r.width * 0.20;
        const ry = r.height * 0.24;
        const d = Math.min(1, Math.hypot(dx, dy) / 300);
        const pupil = eye.firstElementChild;
        pupil.style.transform =
          'translate(' + (Math.cos(a) * rx * d).toFixed(1) + 'px,' +
          (Math.sin(a) * ry * d).toFixed(1) + 'px)';
      });
    }

    document.addEventListener('pointermove', function (e) {
      px = e.clientX; py = e.clientY;
      if (!raf) raf = requestAnimationFrame(update);
    }, { passive: true });
  }

  // --- copy email ---
  document.querySelectorAll('.js-copy-email').forEach(function (btn) {
    btn.addEventListener('click', function () {
      navigator.clipboard.writeText(btn.dataset.email).then(function () {
        const node = btn.childNodes[0];
        const original = node.textContent;
        node.textContent = 'Copied! ';
        setTimeout(function () { node.textContent = original; }, 1500);
      });
    });
  });
})();
