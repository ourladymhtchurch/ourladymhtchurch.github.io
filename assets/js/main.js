/* Our Lady of the Most Holy Trinity Chapel — site script
   Handles the slide-in navigation drawer, its expandable groups,
   highlighting the current page, and the (demo) contact form. */
(function () {
  'use strict';

  var body = document.body;
  var drawer = document.getElementById('drawer');
  var openBtn = document.querySelector('[data-open-drawer]');
  var closeBtn = drawer ? drawer.querySelector('[data-close-drawer]') : null;
  var backdrop = document.querySelector('.drawer-backdrop');

  function openDrawer() {
    body.classList.add('drawer-open');
    drawer.setAttribute('aria-hidden', 'false');
    openBtn.setAttribute('aria-expanded', 'true');
    if (closeBtn) closeBtn.focus();
  }
  function closeDrawer() {
    body.classList.remove('drawer-open');
    drawer.setAttribute('aria-hidden', 'true');
    openBtn.setAttribute('aria-expanded', 'false');
    openBtn.focus();
  }

  if (drawer && openBtn) {
    openBtn.addEventListener('click', openDrawer);
    if (closeBtn) closeBtn.addEventListener('click', closeDrawer);
    if (backdrop) backdrop.addEventListener('click', closeDrawer);
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && body.classList.contains('drawer-open')) closeDrawer();
    });

    /* Expandable groups (Catholic Creeds, Resources, ...) */
    Array.prototype.forEach.call(drawer.querySelectorAll('.drawer__group-toggle'), function (btn) {
      btn.addEventListener('click', function () {
        var isOpen = btn.parentNode.classList.toggle('drawer__group--open');
        btn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      });
    });

    /* Highlight the current page and open the group that contains it */
    var here = window.location.pathname.replace(/index\.html$/, '');
    Array.prototype.forEach.call(drawer.querySelectorAll('a[href]'), function (a) {
      if (a.origin !== window.location.origin || a.hash) return;
      if (a.pathname.replace(/index\.html$/, '') === here) {
        a.classList.add('is-active');
        var group = a.closest('.drawer__group');
        if (group) {
          group.classList.add('drawer__group--open');
          var t = group.querySelector('.drawer__group-toggle');
          if (t) t.setAttribute('aria-expanded', 'true');
        }
      }
    });
  }

  /* Contact form: a static site has no mail server, so the form shows a
     confirmation message. Point the form's action at a form service to send email. */
  var form = document.getElementById('contact-form');
  if (form && !form.getAttribute('action')) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var note = form.querySelector('.form-success');
      if (note) note.hidden = false;
      form.reset();
    });
  }
})();
