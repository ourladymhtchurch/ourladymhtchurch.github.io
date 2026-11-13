/* Our Lady of the Most Holy Trinity Chapel — site script
   Handles the slide-in navigation drawer, its expandable groups, highlighting the
   current page, the (demo) contact form, the Next Holy Latin Mass card and the
   click-to-play videos on the home page. */
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

    /* A link to a section of this page (Holy Latin Mass Schedule, Chapel News)
       only scrolls, so close the drawer to show it. Focus stays put (closeDrawer
       would move it to the menu button and scroll back to the top). */
    drawer.addEventListener('click', function (e) {
      var link = e.target.closest('a[href]');
      if (!link || link.target === '_blank' || !body.classList.contains('drawer-open')) return;
      body.classList.remove('drawer-open');
      drawer.setAttribute('aria-hidden', 'true');
      openBtn.setAttribute('aria-expanded', 'false');
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

  /* Next Mass card (home page): show the first Mass in _data/schedule.yml that has not
     ended yet (counted as one hour after it starts). If every listed Mass is past, show
     the "being updated" message instead. A Mass whose date could not be read is shown. */
  var nextMass = document.querySelector('[data-next-mass]');
  if (nextMass) {
    var items = nextMass.querySelectorAll('[data-start]');
    var cutoff = Date.now() - 60 * 60 * 1000;
    var shown = null;
    for (var i = 0; i < items.length && !shown; i++) {
      var start = Date.parse(items[i].getAttribute('data-start'));
      if (isNaN(start) || start > cutoff) shown = items[i];
    }
    Array.prototype.forEach.call(items, function (el) { el.hidden = el !== shown; });
    var none = nextMass.querySelector('[data-next-mass-none]');
    if (none) none.hidden = !!shown;
  }

  /* Click-to-play videos (_includes/youtube-facade.html): the page shows only a thumbnail,
     and YouTube's player is loaded when the visitor clicks it. Without this script the
     link simply opens the video on YouTube. */
  Array.prototype.forEach.call(document.querySelectorAll('a[data-youtube]'), function (link) {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      var start = link.getAttribute('data-start');
      var frame = document.createElement('iframe');
      frame.src = 'https://www.youtube.com/embed/' + encodeURIComponent(link.getAttribute('data-youtube')) +
        '?rel=0&autoplay=1' + (start ? '&start=' + encodeURIComponent(start) : '');
      frame.title = link.getAttribute('data-title') || 'Video';
      frame.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
      frame.allowFullscreen = true;
      var box = document.createElement('div');
      box.className = 'video';
      box.appendChild(frame);
      link.parentNode.replaceChild(box, link);
      frame.focus();
    });
  });
})();
