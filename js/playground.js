/* Pannable playground canvas with inertia. */
(function () {
  const viewport = document.getElementById('pg-viewport');
  const canvas = document.getElementById('pg-canvas');
  if (!viewport || !canvas) return;

  const CW = canvas.offsetWidth;
  const CH = canvas.offsetHeight;

  // start centered
  let x = (viewport.clientWidth - CW) / 2;
  let y = (viewport.clientHeight - CH) / 2;
  let vx = 0, vy = 0;
  let dragging = false;
  let lastX = 0, lastY = 0, lastT = 0;

  function clamp() {
    const minX = viewport.clientWidth - CW;
    const minY = viewport.clientHeight - CH;
    x = Math.min(0, Math.max(minX, x));
    y = Math.min(0, Math.max(minY, y));
  }

  function render() {
    canvas.style.transform = 'translate(' + x + 'px,' + y + 'px)';
  }

  viewport.addEventListener('pointerdown', (e) => {
    dragging = true;
    viewport.classList.add('is-dragging');
    lastX = e.clientX; lastY = e.clientY; lastT = performance.now();
    vx = 0; vy = 0;
    viewport.setPointerCapture(e.pointerId);
  });

  viewport.addEventListener('pointermove', (e) => {
    if (!dragging) return;
    const now = performance.now();
    const dt = Math.max(1, now - lastT) / 1000;
    const dx = e.clientX - lastX;
    const dy = e.clientY - lastY;
    vx = dx / dt; vy = dy / dt;
    x += dx; y += dy;
    clamp();
    render();
    lastX = e.clientX; lastY = e.clientY; lastT = now;
  });

  function release() {
    dragging = false;
    viewport.classList.remove('is-dragging');
  }
  viewport.addEventListener('pointerup', release);
  viewport.addEventListener('pointercancel', release);

  // inertia
  function frame() {
    if (!dragging && (Math.abs(vx) > 5 || Math.abs(vy) > 5)) {
      x += vx * 0.016;
      y += vy * 0.016;
      vx *= 0.94; vy *= 0.94;
      clamp();
      render();
    }
    requestAnimationFrame(frame);
  }

  window.addEventListener('resize', () => { clamp(); render(); });

  clamp();
  render();
  requestAnimationFrame(frame);
})();
