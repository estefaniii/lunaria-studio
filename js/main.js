/* ============================================
   LUNARIA STUDIO — main.js
   ============================================ */

(() => {
  'use strict';

  /* Sticky navbar background on scroll + scroll progress */
  const nav = document.getElementById('nav');
  const progress = document.getElementById('scrollProgress');
  const onScroll = () => {
    if (nav) nav.classList.toggle('is-scrolled', window.scrollY > 20);
    if (progress) {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const pct = max > 0 ? (window.scrollY / max) * 100 : 0;
      progress.style.width = `${Math.min(100, Math.max(0, pct))}%`;
    }
  };
  document.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* Mobile menu */
  const navToggle = document.getElementById('navToggle');
  const navMobile = document.getElementById('navMobile');
  if (navToggle && navMobile) {
    const closeMenu = () => {
      navMobile.classList.remove('is-open');
      navToggle.classList.remove('is-open');
      navToggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    };

    // Inyectar botón "X" para cerrar el menú móvil (esquina superior derecha)
    if (!navMobile.querySelector('.nav-mobile-close')) {
      const closeBtn = document.createElement('button');
      closeBtn.type = 'button';
      closeBtn.className = 'nav-mobile-close';
      closeBtn.setAttribute('aria-label', 'Cerrar menú');
      closeBtn.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>';
      closeBtn.addEventListener('click', closeMenu);
      navMobile.insertBefore(closeBtn, navMobile.firstChild);
    }

    navToggle.addEventListener('click', () => {
      const isOpen = navMobile.classList.toggle('is-open');
      navToggle.classList.toggle('is-open', isOpen);
      navToggle.setAttribute('aria-expanded', String(isOpen));
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });
    navMobile.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));
    document.addEventListener('keydown', e => { if (e.key === 'Escape') closeMenu(); });
  }

  /* Reveal on scroll */
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!reduceMotion && 'IntersectionObserver' in window) {
    const io = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -80px 0px' });
    document.querySelectorAll('.reveal').forEach(el => io.observe(el));
  } else {
    document.querySelectorAll('.reveal').forEach(el => el.classList.add('is-visible'));
  }

  /* Counters animados */
  const animateCounter = (el) => {
    const target = parseFloat(el.dataset.counter || '0');
    const prefix = el.dataset.prefix || '';
    const suffix = el.dataset.suffix || '';
    const duration = 1800;
    const start = performance.now();
    const isLarge = target >= 1000;
    const step = (now) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 4);
      const current = target * eased;
      let display;
      if (isLarge) {
        display = current >= 1000 ? (current / 1000).toFixed(1).replace(/\.0$/, '') + 'K' : Math.round(current);
      } else {
        display = current % 1 === 0 ? Math.round(current) : current.toFixed(1);
      }
      el.textContent = `${prefix}${display}${suffix}`;
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };

  if ('IntersectionObserver' in window) {
    const counterIO = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          counterIO.unobserve(entry.target);
        }
      });
    }, { threshold: 0.4 });
    document.querySelectorAll('[data-counter]').forEach(el => counterIO.observe(el));
  }

  /* Service cards — mouse spotlight */
  document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const mx = ((e.clientX - rect.left) / rect.width) * 100;
      const my = ((e.clientY - rect.top) / rect.height) * 100;
      card.style.setProperty('--mx', `${mx}%`);
      card.style.setProperty('--my', `${my}%`);
    });
  });

  /* Process steps — toggle active */
  const processSteps = document.querySelectorAll('.process-step');
  processSteps.forEach(step => {
    step.addEventListener('mouseenter', () => {
      processSteps.forEach(s => s.classList.remove('is-active'));
      step.classList.add('is-active');
    });
    step.addEventListener('click', () => {
      processSteps.forEach(s => s.classList.remove('is-active'));
      step.classList.add('is-active');
    });
  });

  /* Cursor glow */
  const cursorGlow = document.getElementById('cursorGlow');
  if (cursorGlow && !reduceMotion) {
    let targetX = 0, targetY = 0, currentX = 0, currentY = 0;
    document.addEventListener('mousemove', (e) => {
      targetX = e.clientX;
      targetY = e.clientY;
    });
    const animate = () => {
      currentX += (targetX - currentX) * 0.1;
      currentY += (targetY - currentY) * 0.1;
      cursorGlow.style.transform = `translate(${currentX}px, ${currentY}px) translate(-50%, -50%)`;
      requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }

  /* Hero orbs subtle parallax (mouse) */
  const heroOrbs = document.querySelector('.hero-orbs');
  if (heroOrbs && !reduceMotion) {
    document.addEventListener('mousemove', (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 30;
      const y = (e.clientY / window.innerHeight - 0.5) * 30;
      heroOrbs.style.transform = `translate(${x}px, ${y}px)`;
    });
  }

  /* FAQ accordion */
  document.querySelectorAll('.faq-item').forEach(item => {
    const q = item.querySelector('.faq-question');
    if (!q) return;
    q.addEventListener('click', () => {
      const isOpen = item.classList.toggle('is-open');
      q.setAttribute('aria-expanded', String(isOpen));
    });
  });

  /* Smooth scroll for anchor links */
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      const id = a.getAttribute('href');
      if (id && id.length > 1) {
        const target = document.querySelector(id);
        if (target) {
          e.preventDefault();
          const offset = 80;
          const top = target.getBoundingClientRect().top + window.scrollY - offset;
          window.scrollTo({ top, behavior: 'smooth' });
        }
      }
    });
  });

  /* Magnetic effect on primary buttons */
  if (!reduceMotion && window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
    document.querySelectorAll('.btn-glow, .btn-primary').forEach(btn => {
      btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        btn.style.transform = `translate(${x * 0.18}px, ${y * 0.25}px)`;
      });
      btn.addEventListener('mouseleave', () => {
        btn.style.transform = '';
      });
    });
  }

  /* Back to top */
  const backTop = document.getElementById('backTop');
  if (backTop) {
    const onScrollTop = () => {
      backTop.classList.toggle('is-visible', window.scrollY > 800);
    };
    document.addEventListener('scroll', onScrollTop, { passive: true });
    onScrollTop();
    backTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
    });
  }

  /* Cookie banner */
  const cookieBanner = document.getElementById('cookieBanner');
  if (cookieBanner) {
    try {
      if (!localStorage.getItem('lunaria-cookies-ok')) {
        setTimeout(() => cookieBanner.classList.add('is-visible'), 1200);
      }
    } catch (_) { /* localStorage blocked */ }
    cookieBanner.querySelectorAll('[data-cookie-action]').forEach(btn => {
      btn.addEventListener('click', () => {
        const action = btn.getAttribute('data-cookie-action');
        try { localStorage.setItem('lunaria-cookies-ok', action); } catch (_) {}
        cookieBanner.classList.remove('is-visible');
      });
    });
  }

  /* Form de contacto — fetch al endpoint AJAX de Formsubmit (gratis, sin redirects).
     El email llega DIRECTO a estefanidelosangelestorres@gmail.com sin que el usuario salga del sitio. */
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    const formStatus = document.getElementById('formStatus');
    const submitBtn = contactForm.querySelector('button[type="submit"]');

    const setStatus = (type, msg, doScroll = false) => {
      if (!formStatus) return;
      formStatus.hidden = false;
      formStatus.className = `form-status form-status--${type}`;
      formStatus.innerHTML = msg;

      // Scroll inmediato al mensaje — garantizado en todos los browsers.
      // Múltiples intentos por si alguno falla (algunos browsers son quisquillosos).
      if (doScroll) {
        const doScrollNow = () => {
          const rect = formStatus.getBoundingClientRect();
          const targetY = window.scrollY + rect.top - 120;
          window.scrollTo(0, targetY);                 // instantáneo (siempre funciona)
          formStatus.scrollIntoView({ block: 'center' }); // respaldo
        };
        doScrollNow();
        requestAnimationFrame(doScrollNow);   // segundo intento tras paint
        setTimeout(doScrollNow, 100);         // tercer intento si el segundo falló
      }
    };

    const resetButton = () => {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.style.opacity = '';
        submitBtn.innerHTML = 'Enviar mensaje <span class="arrow" aria-hidden="true">→</span>';
      }
    };

    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      // Honeypot anti-spam
      const honey = contactForm.querySelector('[name="_honey"]');
      if (honey && honey.value) return;

      const data = new FormData(contactForm);
      const get = k => (data.get(k) || '').toString().trim();

      const name    = get('name');
      const email   = get('email');
      const company = get('company');
      const phone   = get('phone');
      const service = get('service');
      const budget  = get('budget');
      const message = get('message');

      // Validación
      if (!name || !email || !service || !message) {
        setStatus('error', '⚠ Completa los campos: nombre, email, servicio y mensaje.');
        return;
      }

      // Mapeo legible
      const services = {
        web: 'Diseño Web', branding: 'Branding', gestion: 'Gestión Digital',
        ecosistema: 'Ecosistema completo (los 3)', custom: 'Proyecto custom',
        consulta: 'Solo quiero conversar'
      };
      const budgets = {
        'lt-500': 'Menos de $500', '500-1000': '$500 - $1,000',
        '1000-2500': '$1,000 - $2,500', '2500-5000': '$2,500 - $5,000',
        'gt-5000': 'Más de $5,000', 'recurring': 'Servicio mensual'
      };

      // Estado: enviando
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.style.opacity = '0.85';
        submitBtn.innerHTML = 'Enviando... ✦';
      }
      setStatus('loading', '<span class="form-status-spinner"></span> Enviando tu mensaje a Estéfani...');

      try {
        const res = await fetch('https://formsubmit.co/ajax/estefanidelosangelestorres@gmail.com', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify({
            'Nombre': name,
            'Email': email,
            'Empresa': company || '—',
            'WhatsApp': phone || '—',
            'Servicio de interés': services[service] || service,
            'Presupuesto estimado': budgets[budget] || (budget || '—'),
            'Mensaje': message,
            _subject: `✦ Nuevo lead Lunaria · ${name}`,
            _template: 'table',
            _captcha: 'false'
          })
        });

        const result = await res.json().catch(() => ({}));
        const isSuccess = res.ok && (result.success === 'true' || result.success === true);
        const needsActivation = (result.message || '').toLowerCase().includes('activation');

        if (isSuccess) {
          // Email enviado correctamente — solo aquí limpiamos el form
          setStatus('success',
            '<strong>✓ ¡Mensaje enviado!</strong>' +
            'Gracias por escribirme. Te respondo personalmente en menos de 24 horas. ' +
            'Si es urgente, escríbeme al <a href="https://wa.me/50767782931" target="_blank" rel="noopener">+507 6778-2931</a>.',
            true /* scroll into view */
          );
          contactForm.reset();
        } else if (needsActivation) {
          // Form aún no activado por la dueña — mostrar alternativa, MANTENER datos
          setStatus('error',
            '<strong>⚠ Hubo un problema al enviar.</strong>' +
            'No te preocupes — escríbeme directamente y te respondo igual de rápido:<br>' +
            '📧 <a href="mailto:estefanidelosangelestorres@gmail.com">estefanidelosangelestorres@gmail.com</a><br>' +
            '📱 <a href="https://wa.me/50767782931" target="_blank" rel="noopener">WhatsApp +507 6778-2931</a>',
            true
          );
        } else {
          throw new Error(result.message || 'Respuesta no exitosa');
        }
      } catch (err) {
        // Error genérico — MANTENER los datos del usuario
        setStatus('error',
          '<strong>⚠ No se pudo enviar automáticamente.</strong>' +
          'Escríbeme directo a <a href="mailto:estefanidelosangelestorres@gmail.com">estefanidelosangelestorres@gmail.com</a> ' +
          'o por <a href="https://wa.me/50767782931" target="_blank" rel="noopener">WhatsApp +507 6778-2931</a>.<br>' +
          'Tus datos siguen aquí, no los pierdes.',
          true
        );
      } finally {
        resetButton();
      }
    });
  }

  /* Blog filters — filtra las cards por data-category */
  const filterButtons = document.querySelectorAll('.blog-filter');
  const blogCards = document.querySelectorAll('.blog-card[data-category]');
  if (filterButtons.length && blogCards.length) {
    filterButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const filter = btn.dataset.filter;
        // Toggle active state
        filterButtons.forEach(b => b.classList.toggle('is-active', b === btn));
        // Filter cards
        blogCards.forEach(card => {
          const cat = card.dataset.category;
          const match = filter === 'all' || cat === filter;
          card.classList.toggle('is-hidden', !match);
        });
        // Smooth fade-in for visible cards
        requestAnimationFrame(() => {
          blogCards.forEach((card, i) => {
            if (!card.classList.contains('is-hidden')) {
              card.classList.add('is-fading');
              setTimeout(() => card.classList.remove('is-fading'), 50 + i * 40);
            }
          });
        });
      });
    });
  }

  /* Newsletter form (blog) — same simple feedback */
  const newsletter = document.querySelector('form[data-newsletter]');
  if (newsletter) {
    newsletter.addEventListener('submit', () => {
      const btn = newsletter.querySelector('button[type="submit"]');
      if (btn) { btn.disabled = true; btn.innerHTML = 'Enviando...'; }
    });
  }
})();
