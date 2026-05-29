/* ============================================================
   KNS — main.js
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ── REVEAL ANIMATION (progressive enhancement) ── */
  // Only hide elements if IntersectionObserver is supported
  if ('IntersectionObserver' in window) {
    document.body.classList.add('js-ready');

    const revealEls = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const siblings = Array.from(entry.target.parentElement.children)
              .filter(el => el.classList.contains('reveal'));
            const idx = siblings.indexOf(entry.target);
            entry.target.style.transitionDelay = `${idx * 0.09}s`;
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
    );

    // Small delay so page paint happens before we hide anything
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        revealEls.forEach(el => observer.observe(el));
      });
    });
  }

  /* ── STICKY NAV SHADOW ── */
  const nav = document.querySelector('nav');
  if (nav) {
    window.addEventListener('scroll', () => {
      nav.classList.toggle('scrolled', window.scrollY > 30);
    }, { passive: true });
  }

  /* ── HAMBURGER MOBILE MENU ── */
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('open');
      mobileMenu.classList.toggle('open');
    });

    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('open');
        mobileMenu.classList.remove('open');
      });
    });
  }

  /* ── FAQ ACCORDION ── */
  document.querySelectorAll('.faq-item').forEach(item => {
    const btn = item.querySelector('.faq-question');
    if (!btn) return;
    btn.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item').forEach(f => f.classList.remove('open'));
      if (!isOpen) item.classList.add('open');
    });
  });

  /* ── FORM SUBMIT → WHATSAPP ── */
  const submitBtn = document.getElementById('submitBtn');
  if (submitBtn) submitBtn.addEventListener('click', handleSubmit);

  function handleSubmit() {
    const name  = (document.getElementById('name')?.value || '').trim();
    const biz   = (document.getElementById('biz')?.value || '').trim();
    const need  = document.getElementById('need')?.value || '';
    const waNum = (document.getElementById('waInput')?.value || '').trim();

    if (!name || !biz || !waNum) {
      showFormError('Please fill in your name, business name, and WhatsApp number.');
      return;
    }

    const service = need || 'growing my business';
    const msg = `Hi KNS! 👋\n\nMy name is *${name}* from *${biz}*.\n\nI need help with: *${service}*.\n\nMy WhatsApp: ${waNum}\n\nPlease send me a free growth plan!`;

    // ⚠️ Replace with your real WhatsApp number (digits only, no + or spaces)
    const KNS_WHATSAPP = '27600000000';
    window.open(`https://wa.me/${KNS_WHATSAPP}?text=${encodeURIComponent(msg)}`, '_blank');
  }

  function showFormError(msg) {
    let err = document.getElementById('formError');
    if (!err) {
      err = document.createElement('p');
      err.id = 'formError';
      err.style.cssText = 'color:#e05555;font-size:0.85rem;margin-top:0.25rem;text-align:center;';
      document.getElementById('submitBtn')?.insertAdjacentElement('beforebegin', err);
    }
    err.textContent = msg;
    setTimeout(() => { if (err) err.textContent = ''; }, 4000);
  }

  /* ── SMOOTH SCROLL ── */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offset = (nav ? nav.offsetHeight : 70) + 16;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

});