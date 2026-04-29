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

  /* Form de contacto — usa mailto: para abrir el cliente de email del usuario.
     100% gratis, sin servicios externos, sin activaciones, sin tokens. */
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      // Honeypot anti-spam: si está lleno, ignorar (es un bot)
      if (contactForm._honey && contactForm._honey.value) return;

      const data = new FormData(contactForm);
      const get = k => (data.get(k) || '').toString().trim();

      const name    = get('name');
      const email   = get('email');
      const company = get('company');
      const phone   = get('phone');
      const service = get('service');
      const budget  = get('budget');
      const message = get('message');

      // Validación mínima
      if (!name || !email || !service || !message) {
        const btn = contactForm.querySelector('button[type="submit"]');
        if (btn) {
          btn.style.borderColor = 'var(--rose-glow)';
          btn.innerText = 'Completa los campos requeridos';
          setTimeout(() => { btn.style.borderColor = ''; btn.innerHTML = 'Enviar mensaje <span class="arrow" aria-hidden="true">→</span>'; }, 2400);
        }
        return;
      }

      // Mapeo de etiquetas humanas para el email
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

      const subject = `Nuevo lead desde lunariastudio.com — ${name}`;
      const body =
`Hola Estéfani,

Me llamo ${name}${company ? ` y represento a ${company}` : ''}.

Datos de contacto
─────────────────
Email: ${email}
${phone ? `WhatsApp: ${phone}\n` : ''}
Mi proyecto
───────────
Servicio de interés: ${services[service] || service}
${budget ? `Presupuesto estimado: ${budgets[budget] || budget}\n` : ''}
Mensaje
───────
${message}

— Enviado desde el formulario de Lunaria Studio`;

      const mailtoUrl = `mailto:estefanidelosangelestorres@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

      // UI feedback
      const btn = contactForm.querySelector('button[type="submit"]');
      if (btn) {
        btn.disabled = true;
        btn.style.opacity = '0.85';
        btn.innerHTML = 'Abriendo tu correo... <span class="arrow">✦</span>';
      }

      // Pequeño delay para que se vea el feedback antes de abrir el cliente de email
      setTimeout(() => {
        window.location.href = mailtoUrl;
        // Restaurar el botón después por si el usuario cancela el envío
        setTimeout(() => {
          if (btn) {
            btn.disabled = false;
            btn.style.opacity = '';
            btn.innerHTML = 'Enviar por email <span class="arrow" aria-hidden="true">→</span>';
          }
        }, 1500);
      }, 200);
    });

    /* Botón WhatsApp: arma el mensaje con los mismos campos del form y abre wa.me */
    const waBtn = document.getElementById('sendWhatsAppBtn');
    if (waBtn) {
      waBtn.addEventListener('click', () => {
        const data = new FormData(contactForm);
        const get = k => (data.get(k) || '').toString().trim();

        const name    = get('name');
        const email   = get('email');
        const company = get('company');
        const phone   = get('phone');
        const service = get('service');
        const budget  = get('budget');
        const message = get('message');

        if (!name || !service || !message) {
          waBtn.style.outline = '2px solid var(--rose-glow)';
          const orig = waBtn.innerHTML;
          waBtn.innerHTML = 'Completa nombre, servicio y mensaje';
          setTimeout(() => { waBtn.style.outline = ''; waBtn.innerHTML = orig; }, 2400);
          return;
        }

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

        const txt =
`✦ Hola Estéfani, vengo del sitio de Lunaria.

Me llamo *${name}*${company ? ` (de ${company})` : ''}.
${email ? `📧 ${email}` : ''}${phone ? `\n📱 ${phone}` : ''}

🎯 Servicio de interés: *${services[service] || service}*${budget ? `\n💰 Presupuesto: ${budgets[budget] || budget}` : ''}

💬 Mensaje:
${message}`;

        const waUrl = `https://wa.me/50767782931?text=${encodeURIComponent(txt)}`;

        const orig = waBtn.innerHTML;
        waBtn.style.opacity = '0.85';
        waBtn.innerHTML = 'Abriendo WhatsApp... ✦';
        window.open(waUrl, '_blank', 'noopener');
        setTimeout(() => { waBtn.style.opacity = ''; waBtn.innerHTML = orig; }, 1500);
      });
    }
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
