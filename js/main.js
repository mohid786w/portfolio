/* ============================================
   MOHID PORTFOLIO — GLOBAL JAVASCRIPT
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ── CUSTOM CURSOR ──────────────────────────
  const cursor     = document.getElementById('cursor');
  const cursorRing = document.getElementById('cursorRing');
  let mx = 0, my = 0, rx = 0, ry = 0;

  document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    if (cursor) {
      cursor.style.left = mx + 'px';
      cursor.style.top  = my + 'px';
    }
  });

  function lerpCursor() {
    rx += (mx - rx) * 0.1;
    ry += (my - ry) * 0.1;
    if (cursorRing) {
      cursorRing.style.left = rx + 'px';
      cursorRing.style.top  = ry + 'px';
    }
    requestAnimationFrame(lerpCursor);
  }
  lerpCursor();

  const hoverTargets = document.querySelectorAll(
    'a, button, .btn, .project-card, .exp-row, .skill-item, .contact-link, .nav-burger'
  );
  hoverTargets.forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor?.classList.add('hovering');
      cursorRing?.classList.add('hovering');
    });
    el.addEventListener('mouseleave', () => {
      cursor?.classList.remove('hovering');
      cursorRing?.classList.remove('hovering');
    });
  });

  // ── ACTIVE NAV LINK ────────────────────────
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  // ── MOBILE NAV ─────────────────────────────
  const burger  = document.querySelector('.nav-burger');
  const navMenu = document.querySelector('.nav-links');
  if (burger && navMenu) {
    burger.addEventListener('click', () => {
      navMenu.classList.toggle('open');
      burger.classList.toggle('open');
    });
  }

  // ── SCROLL REVEAL ──────────────────────────
  const revealEls = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        revealObserver.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });
  revealEls.forEach(el => revealObserver.observe(el));

  // ── SKILL BAR ANIMATION ────────────────────
  const bars = document.querySelectorAll('.skill-fill');
  const barObserver = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.style.width = e.target.dataset.width;
        barObserver.unobserve(e.target);
      }
    });
  }, { threshold: 0.3 });
  bars.forEach(bar => {
    const w = bar.style.width;
    bar.style.width = '0';
    bar.dataset.width = w;
    barObserver.observe(bar);
  });

  // ── NAV SCROLL SHADOW ──────────────────────
  const nav = document.querySelector('.nav');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      nav?.classList.add('scrolled');
    } else {
      nav?.classList.remove('scrolled');
    }
  });

  // ── TICKER DUPLICATE (for seamless loop) ───
  const track = document.querySelector('.ticker-track');
  if (track) {
    track.innerHTML += track.innerHTML;
  }

});
