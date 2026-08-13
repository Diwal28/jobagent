/* =============================================================
   MAISON ÉMERAUDE — couche d'interaction
   Vanilla JS, sans dépendance. Toutes les animations sont
   désactivées si l'utilisateur demande un mouvement réduit.
   ============================================================= */
(function () {
  'use strict';

  var motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  var reduced = motionQuery.matches;
  motionQuery.addEventListener('change', function (e) { reduced = e.matches; });

  var isTouch = window.matchMedia('(hover: none)').matches;
  var raf = window.requestAnimationFrame.bind(window);

  function $(sel, ctx) { return (ctx || document).querySelector(sel); }
  function $$(sel, ctx) { return Array.prototype.slice.call((ctx || document).querySelectorAll(sel)); }
  function clamp(v, min, max) { return v < min ? min : v > max ? max : v; }

  /* ---------------------------------------------------------
     1. IMAGES — fondu à l'arrivée, repli élégant si indisponible
     Les photos sont servies par un CDN externe : si l'une d'elles
     ne répond pas, on garde le panneau dessiné plutôt qu'une
     image cassée.
     --------------------------------------------------------- */
  function initImages() {
    $$('.frame img').forEach(function (img) {
      var frame = img.closest('.frame');

      function onLoad() { img.classList.add('is-loaded'); }
      function onError() {
        img.remove();
        if (frame) frame.classList.add('is-fallback');
      }

      if (img.complete) {
        if (img.naturalWidth > 0) onLoad();
        else onError();
      } else {
        img.addEventListener('load', onLoad, { once: true });
        img.addEventListener('error', onError, { once: true });
      }
    });
  }

  /* ---------------------------------------------------------
     2. RÉVÉLATIONS AU DÉFILEMENT
     --------------------------------------------------------- */
  function initReveals() {
    var targets = $$('[data-reveal], [data-split], [data-milestone], .shimmer');
    if (!('IntersectionObserver' in window) || reduced) {
      targets.forEach(function (el) { el.classList.add('is-visible'); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        io.unobserve(entry.target);
      });
    }, { rootMargin: '0px 0px -12% 0px', threshold: 0.12 });

    targets.forEach(function (el) { io.observe(el); });
  }

  /* ---------------------------------------------------------
     3. RÉVÉLATION DU TITRE LIGNE PAR LIGNE
     --------------------------------------------------------- */
  function initSplitLines() {
    $$('[data-split]').forEach(function (el) {
      $$('span[aria-hidden="true"]', el).forEach(function (line, i) {
        var inner = document.createElement('span');
        inner.innerHTML = line.innerHTML;
        inner.style.setProperty('--d', (i * 130) + 'ms');
        line.innerHTML = '';
        line.appendChild(inner);
        line.classList.add('split-line');
      });
    });
  }

  /* ---------------------------------------------------------
     4. NAVIGATION — état au défilement + lien actif
     --------------------------------------------------------- */
  function initNav() {
    var nav = $('#nav');
    if (!nav) return;
    var lastY = window.scrollY;
    var ticking = false;

    function update() {
      var y = window.scrollY;
      nav.classList.toggle('is-stuck', y > 60);
      // On masque la barre en descente franche, jamais près du sommet
      if (!document.body.classList.contains('is-locked')) {
        var goingDown = y > lastY + 4;
        nav.classList.toggle('is-hidden', goingDown && y > 420);
      }
      lastY = y;
      ticking = false;
    }

    window.addEventListener('scroll', function () {
      if (ticking) return;
      ticking = true;
      raf(update);
    }, { passive: true });
    update();

    // Lien actif
    var sections = $$('main section[id]');
    var links = $$('.nav__link');
    if (!('IntersectionObserver' in window) || !sections.length) return;

    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var id = entry.target.id;
        links.forEach(function (a) {
          a.classList.toggle('is-active', a.getAttribute('href') === '#' + id);
        });
      });
    }, { rootMargin: '-45% 0px -50% 0px' });

    sections.forEach(function (s) { spy.observe(s); });
  }

  /* ---------------------------------------------------------
     5. MENU PLEIN ÉCRAN (MOBILE)
     --------------------------------------------------------- */
  function initMobileMenu() {
    var burger = $('#burger');
    var overlay = $('#menu-overlay');
    if (!burger || !overlay) return;

    var links = $$('.menu-overlay__link', overlay);
    var lastFocus = null;

    function setStaggers() {
      links.forEach(function (link, i) {
        link.style.transitionDelay = (120 + i * 65) + 'ms';
      });
    }
    setStaggers();

    function open() {
      lastFocus = document.activeElement;
      overlay.classList.add('is-open');
      overlay.removeAttribute('inert');
      var nav = document.getElementById('nav');
      if (nav) nav.classList.remove('is-hidden');
      burger.classList.add('is-open');
      burger.setAttribute('aria-expanded', 'true');
      burger.setAttribute('aria-label', 'Fermer le menu');
      document.body.classList.add('is-locked');
      window.setTimeout(function () { if (links[0]) links[0].focus(); }, 260);
    }

    function close() {
      overlay.classList.remove('is-open');
      overlay.setAttribute('inert', '');
      burger.classList.remove('is-open');
      burger.setAttribute('aria-expanded', 'false');
      burger.setAttribute('aria-label', 'Ouvrir le menu');
      document.body.classList.remove('is-locked');
      if (lastFocus && lastFocus.focus) lastFocus.focus();
    }

    burger.addEventListener('click', function () {
      overlay.classList.contains('is-open') ? close() : open();
    });

    overlay.addEventListener('click', function (e) {
      if (e.target.closest('a')) close();
    });

    document.addEventListener('keydown', function (e) {
      if (!overlay.classList.contains('is-open')) return;
      if (e.key === 'Escape') { close(); return; }
      if (e.key !== 'Tab') return;

      // Piège de focus
      var focusables = $$('a[href], button:not([disabled])', overlay);
      if (!focusables.length) return;
      var first = focusables[0];
      var last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    });

    // Le menu plein écran n'a plus lieu d'être sur grand écran
    window.matchMedia('(min-width: 900px)').addEventListener('change', function (e) {
      if (e.matches && overlay.classList.contains('is-open')) close();
    });
  }

  /* ---------------------------------------------------------
     6. ANCRES — défilement doux et respectueux du clavier
     --------------------------------------------------------- */
  function initAnchors() {
    document.addEventListener('click', function (e) {
      var link = e.target.closest('a[href^="#"]');
      if (!link) return;
      var id = link.getAttribute('href');
      if (!id || id === '#') return;
      var target = document.getElementById(id.slice(1));
      if (!target) return;

      e.preventDefault();
      target.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' });
      history.replaceState(null, '', id);

      // Le focus suit le défilement pour rester utilisable au clavier
      window.setTimeout(function () {
        target.setAttribute('tabindex', '-1');
        target.focus({ preventScroll: true });
        target.removeAttribute('tabindex');
      }, reduced ? 0 : 620);
    });
  }

  /* ---------------------------------------------------------
     7. PARALLAXE
     --------------------------------------------------------- */
  function initParallax() {
    var items = $$('[data-parallax]');
    if (!items.length || reduced) return;

    var ticking = false;
    function update() {
      var vh = window.innerHeight;
      items.forEach(function (el) {
        var rect = el.getBoundingClientRect();
        if (rect.bottom < -200 || rect.top > vh + 200) return;
        var speed = parseFloat(el.dataset.parallax) || 0.08;
        var progress = (rect.top + rect.height / 2 - vh / 2) / vh;
        el.style.transform = 'translate3d(0,' + (-progress * speed * 100).toFixed(2) + 'px,0)';
      });
      ticking = false;
    }

    window.addEventListener('scroll', function () {
      if (ticking) return;
      ticking = true;
      raf(update);
    }, { passive: true });
    window.addEventListener('resize', update);
    update();
  }

  /* ---------------------------------------------------------
     8. PARTICULES DORÉES (héros)
     --------------------------------------------------------- */
  function initParticles() {
    var canvas = $('#particles');
    if (!canvas || reduced) return;
    var ctx = canvas.getContext('2d');
    if (!ctx) return;

    var hero = canvas.closest('.hero');
    var particles = [];
    var w = 0, h = 0, dpr = 1;
    var running = true;
    var frame = null;

    function size() {
      var rect = (hero || canvas).getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = Math.max(rect.width, 1);
      h = Math.max(rect.height, 1);
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      canvas.style.width = w + 'px';
      canvas.style.height = h + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      build();
    }

    function build() {
      // Densité mesurée : discrète sur mobile, jamais plus de 70 grains
      var count = clamp(Math.round((w * h) / 26000), 18, 70);
      particles = [];
      for (var i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * w,
          y: Math.random() * h,
          r: Math.random() * 1.5 + 0.35,
          vx: (Math.random() - 0.5) * 0.14,
          vy: -(Math.random() * 0.18 + 0.03),
          a: Math.random() * 0.5 + 0.12,
          tw: Math.random() * Math.PI * 2,
          ts: Math.random() * 0.016 + 0.005
        });
      }
    }

    function draw() {
      ctx.clearRect(0, 0, w, h);
      for (var i = 0; i < particles.length; i++) {
        var p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.tw += p.ts;

        if (p.y < -10) { p.y = h + 8; p.x = Math.random() * w; }
        if (p.x < -10) p.x = w + 8;
        if (p.x > w + 10) p.x = -8;

        var alpha = p.a * (0.55 + 0.45 * Math.sin(p.tw));
        var glow = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 5);
        glow.addColorStop(0, 'rgba(244, 230, 195, ' + alpha.toFixed(3) + ')');
        glow.addColorStop(0.4, 'rgba(217, 185, 107, ' + (alpha * 0.4).toFixed(3) + ')');
        glow.addColorStop(1, 'rgba(217, 185, 107, 0)');
        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r * 5, 0, Math.PI * 2);
        ctx.fill();
      }
      if (running) frame = raf(draw);
    }

    function start() { if (!running) { running = true; frame = raf(draw); } }
    function stop() { running = false; if (frame) cancelAnimationFrame(frame); }

    size();
    frame = raf(draw);

    var resizeTimer;
    window.addEventListener('resize', function () {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(size, 180);
    });

    document.addEventListener('visibilitychange', function () {
      document.hidden ? stop() : start();
    });

    // On coupe l'animation dès que le héros sort du champ
    if ('IntersectionObserver' in window && hero) {
      new IntersectionObserver(function (entries) {
        entries[0].isIntersecting ? start() : stop();
      }, { threshold: 0 }).observe(hero);
    }
  }

  /* ---------------------------------------------------------
     9. INCLINAISON 3D DES CARTES (pointeur fin uniquement)
     --------------------------------------------------------- */
  function initTilt() {
    if (isTouch || reduced) return;
    $$('[data-tilt]').forEach(function (card) {
      var raf_ = null;

      function move(e) {
        if (raf_) return;
        raf_ = raf(function () {
          var rect = card.getBoundingClientRect();
          var px = (e.clientX - rect.left) / rect.width - 0.5;
          var py = (e.clientY - rect.top) / rect.height - 0.5;
          card.style.transform =
            'perspective(1100px) rotateY(' + (px * 6).toFixed(2) + 'deg) rotateX(' +
            (-py * 6).toFixed(2) + 'deg) translateY(-6px)';
          raf_ = null;
        });
      }

      function leave() {
        if (raf_) { cancelAnimationFrame(raf_); raf_ = null; }
        card.style.transform = '';
      }

      card.addEventListener('pointermove', move);
      card.addEventListener('pointerleave', leave);
      card.addEventListener('blur', leave, true);
    });
  }

  /* ---------------------------------------------------------
     10. BOUTONS MAGNÉTIQUES
     --------------------------------------------------------- */
  function initMagnetic() {
    if (isTouch || reduced) return;
    $$('[data-magnetic]').forEach(function (btn) {
      var label = $('.btn__label', btn);

      btn.addEventListener('pointermove', function (e) {
        var rect = btn.getBoundingClientRect();
        var x = (e.clientX - rect.left - rect.width / 2) * 0.22;
        var y = (e.clientY - rect.top - rect.height / 2) * 0.32;
        btn.style.transform = 'translate(' + x.toFixed(1) + 'px,' + y.toFixed(1) + 'px)';
        if (label) label.style.transform = 'translate(' + (x * 0.28).toFixed(1) + 'px,' + (y * 0.28).toFixed(1) + 'px)';
      });

      btn.addEventListener('pointerleave', function () {
        btn.style.transform = '';
        if (label) label.style.transform = '';
      });
    });
  }

  /* ---------------------------------------------------------
     11. LA CARTE — onglets accessibles
     --------------------------------------------------------- */
  function initMenuTabs() {
    var tabs = $$('.menu-tab');
    if (!tabs.length) return;

    function select(tab, focus) {
      tabs.forEach(function (t) {
        var selected = t === tab;
        t.setAttribute('aria-selected', selected ? 'true' : 'false');
        t.tabIndex = selected ? 0 : -1;
        var panel = document.getElementById(t.getAttribute('aria-controls'));
        if (!panel) return;
        panel.classList.toggle('is-active', selected);
        selected ? panel.removeAttribute('hidden') : panel.setAttribute('hidden', '');
      });
      if (focus) {
        tab.focus();
        tab.scrollIntoView({ block: 'nearest', inline: 'center', behavior: reduced ? 'auto' : 'smooth' });
      }
    }

    tabs.forEach(function (tab, i) {
      tab.addEventListener('click', function () { select(tab, false); });
      tab.addEventListener('keydown', function (e) {
        var next = null;
        if (e.key === 'ArrowRight') next = tabs[(i + 1) % tabs.length];
        else if (e.key === 'ArrowLeft') next = tabs[(i - 1 + tabs.length) % tabs.length];
        else if (e.key === 'Home') next = tabs[0];
        else if (e.key === 'End') next = tabs[tabs.length - 1];
        if (!next) return;
        e.preventDefault();
        select(next, true);
      });
    });
  }

  /* ---------------------------------------------------------
     12. GALERIE HORIZONTALE
     --------------------------------------------------------- */
  function initGalleryRail() {
    var rail = $('.gallery-rail');
    var bar = $('#rail-bar');
    if (!rail) return;

    var prev = $('[data-rail="prev"]');
    var next = $('[data-rail="next"]');

    function step() {
      var card = $('.gallery-card', rail);
      var gap = parseFloat(getComputedStyle(rail).columnGap) || 16;
      return card ? card.getBoundingClientRect().width + gap : rail.clientWidth * 0.8;
    }

    function update() {
      var max = rail.scrollWidth - rail.clientWidth;
      if (bar) {
        var ratio = rail.clientWidth / rail.scrollWidth;
        bar.style.width = (ratio * 100).toFixed(2) + '%';
        var travel = max > 0 ? rail.scrollLeft / max : 0;
        bar.style.transform = 'translateX(' + (travel * (100 / ratio - 100)).toFixed(2) + '%)';
      }
      if (prev) prev.disabled = rail.scrollLeft < 8;
      if (next) next.disabled = rail.scrollLeft > max - 8;
    }

    if (prev) prev.addEventListener('click', function () {
      rail.scrollBy({ left: -step(), behavior: reduced ? 'auto' : 'smooth' });
    });
    if (next) next.addEventListener('click', function () {
      rail.scrollBy({ left: step(), behavior: reduced ? 'auto' : 'smooth' });
    });

    rail.addEventListener('scroll', function () { raf(update); }, { passive: true });
    window.addEventListener('resize', update);

    // Flèches clavier lorsque la galerie a le focus
    rail.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowRight') { e.preventDefault(); rail.scrollBy({ left: step(), behavior: 'smooth' }); }
      if (e.key === 'ArrowLeft') { e.preventDefault(); rail.scrollBy({ left: -step(), behavior: 'smooth' }); }
    });

    update();
  }

  /* ---------------------------------------------------------
     13. TÉMOIGNAGES — carrousel
     --------------------------------------------------------- */
  function initReviews() {
    var root = $('[data-reviews]');
    if (!root) return;
    var slides = $$('.review', root);
    var dots = $$('.dot', root);
    if (slides.length < 2) return;

    var index = 0;
    var timer = null;
    var DELAY = 7000;

    function show(i) {
      index = (i + slides.length) % slides.length;
      slides.forEach(function (s, n) { s.classList.toggle('is-active', n === index); });
      dots.forEach(function (d, n) {
        var selected = n === index;
        d.setAttribute('aria-selected', selected ? 'true' : 'false');
        d.tabIndex = selected ? 0 : -1;
      });
      restart();
    }

    function restart() {
      window.clearTimeout(timer);
      if (reduced) return;
      timer = window.setTimeout(function () { show(index + 1); }, DELAY);
    }

    dots.forEach(function (dot, i) {
      dot.addEventListener('click', function () { show(i); });
      dot.addEventListener('keydown', function (e) {
        if (e.key === 'ArrowRight') { e.preventDefault(); show(index + 1); dots[index].focus(); }
        if (e.key === 'ArrowLeft') { e.preventDefault(); show(index - 1); dots[index].focus(); }
      });
    });

    var prev = $('[data-review="prev"]', root);
    var next = $('[data-review="next"]', root);
    if (prev) prev.addEventListener('click', function () { show(index - 1); });
    if (next) next.addEventListener('click', function () { show(index + 1); });

    // On suspend le défilement automatique pendant la lecture
    root.addEventListener('pointerenter', function () { window.clearTimeout(timer); });
    root.addEventListener('pointerleave', restart);
    root.addEventListener('focusin', function () { window.clearTimeout(timer); });
    root.addEventListener('focusout', restart);
    document.addEventListener('visibilitychange', function () {
      document.hidden ? window.clearTimeout(timer) : restart();
    });

    restart();
  }

  /* ---------------------------------------------------------
     14. FORMULAIRE DE RÉSERVATION
     --------------------------------------------------------- */
  function initForm() {
    var form = $('#reservation-form');
    if (!form) return;
    var status = $('#form-status');
    var submit = $('button[type="submit"]', form);

    // La réservation ne peut pas être antérieure à aujourd'hui
    var dateInput = $('#r-date', form);
    if (dateInput) {
      var today = new Date();
      var iso = new Date(today.getTime() - today.getTimezoneOffset() * 60000)
        .toISOString().slice(0, 10);
      dateInput.min = iso;
      if (!dateInput.value) dateInput.value = iso;
    }

    var RULES = {
      'r-date': function (v) {
        if (!v) return 'Indiquez une date.';
        if (dateInput && dateInput.min && v < dateInput.min) return 'Choisissez une date à venir.';
        return '';
      },
      'r-time': function (v) { return v ? '' : 'Choisissez une heure.'; },
      'r-guests': function (v) { return v ? '' : 'Indiquez le nombre de convives.'; },
      'r-name': function (v) { return v.trim().length >= 2 ? '' : 'Indiquez votre nom.'; },
      'r-phone': function (v) {
        return /^[+0-9][0-9\s().-]{7,19}$/.test(v.trim()) ? '' : 'Numéro de téléphone invalide.';
      },
      'r-email': function (v) {
        return /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i.test(v.trim()) ? '' : 'Adresse email invalide.';
      }
    };

    function validateField(id) {
      var input = document.getElementById(id);
      if (!input) return true;
      var field = input.closest('.field');
      var msgEl = form.querySelector('[data-error-for="' + id + '"]');
      var msg = RULES[id](input.value);
      if (field) field.classList.toggle('has-error', !!msg);
      if (msgEl) msgEl.textContent = msg;
      input.setAttribute('aria-invalid', msg ? 'true' : 'false');
      return !msg;
    }

    Object.keys(RULES).forEach(function (id) {
      var input = document.getElementById(id);
      if (!input) return;
      input.addEventListener('blur', function () { validateField(id); });
      input.addEventListener('input', function () {
        var field = input.closest('.field');
        if (field && field.classList.contains('has-error')) validateField(id);
      });
    });

    function setStatus(text, ok) {
      if (!status) return;
      status.textContent = text;
      status.classList.add('is-visible');
      status.style.borderColor = ok ? 'rgba(217,185,107,.35)' : 'rgba(232,168,124,.6)';
      status.style.color = ok ? 'var(--gold-200)' : '#E8A87C';
    }

    form.addEventListener('submit', function (e) {
      e.preventDefault();

      var firstInvalid = null;
      Object.keys(RULES).forEach(function (id) {
        if (!validateField(id) && !firstInvalid) firstInvalid = document.getElementById(id);
      });

      if (firstInvalid) {
        setStatus('Merci de corriger les champs signalés avant d\'envoyer votre demande.', false);
        firstInvalid.focus();
        return;
      }

      var endpoint = form.dataset.endpoint;
      var payload = Object.fromEntries(new FormData(form).entries());

      if (!endpoint) {
        // Aucun back-office branché : on l'annonce clairement plutôt que
        // de laisser croire que la demande est partie.
        setStatus(
          'Formulaire de démonstration : aucune adresse d\'envoi n\'est configurée. ' +
          'Renseignez data-endpoint sur le formulaire, ou appelez-nous au +33 1 42 65 18 40.',
          true
        );
        return;
      }

      submit.disabled = true;
      var original = $('.btn__label', submit).textContent;
      $('.btn__label', submit).textContent = 'Envoi en cours…';

      var controller = new AbortController();
      var timeout = window.setTimeout(function () { controller.abort(); }, 10000);

      fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        signal: controller.signal
      })
        .then(function (res) {
          if (!res.ok) throw new Error('HTTP ' + res.status);
          form.reset();
          if (dateInput) dateInput.value = dateInput.min;
          setStatus('Merci ! Votre demande est enregistrée. Nous vous confirmons votre table par téléphone sous 2 heures.', true);
        })
        .catch(function (err) {
          // On journalise avant de présenter un message lisible au client
          console.error('[réservation] envoi impossible :', err);
          setStatus('L\'envoi a échoué. Merci de nous appeler au +33 1 42 65 18 40 pour confirmer votre table.', false);
        })
        .finally(function () {
          window.clearTimeout(timeout);
          submit.disabled = false;
          $('.btn__label', submit).textContent = original;
        });
    });
  }

  /* ---------------------------------------------------------
     15. DIVERS
     --------------------------------------------------------- */
  function initMisc() {
    var year = $('#year');
    if (year) year.textContent = new Date().getFullYear();

    // La carte Google ne se charge pas toujours (bloqueurs, hors ligne) :
    // le repli reste visible dessous, on n'a rien à faire de plus.
    var iframe = $('.map iframe');
    if (iframe) {
      iframe.addEventListener('error', function () { iframe.remove(); });
    }
  }

  /* ---------------------------------------------------------
     Amorçage
     --------------------------------------------------------- */
  function init() {
    try {
      initImages();
      initSplitLines();
      initReveals();
      initNav();
      initMobileMenu();
      initAnchors();
      initParallax();
      initParticles();
      initTilt();
      initMagnetic();
      initMenuTabs();
      initGalleryRail();
      initReviews();
      initForm();
      initMisc();
    } catch (err) {
      // Une animation qui échoue ne doit jamais emporter la page avec elle
      console.error('[maison-emeraude] initialisation partielle :', err);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
