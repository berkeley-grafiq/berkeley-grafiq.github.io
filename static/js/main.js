document.addEventListener('DOMContentLoaded', () => {

  // ─── Navbar burger toggle (mobile) ───
  const burgers = document.querySelectorAll('.navbar-burger');
  burgers.forEach(burger => {
    burger.addEventListener('click', () => {
      const target = document.getElementById(burger.dataset.target);
      burger.classList.toggle('is-active');
      if (target) target.classList.toggle('is-active');
    });
  });

  // ─── Sidebar active section highlight ───
  const sidebarLinks = document.querySelectorAll('.sidebar-link');
  const sections = [];

  sidebarLinks.forEach(link => {
    const id = link.getAttribute('href').slice(1);
    const el = document.getElementById(id);
    if (el) sections.push({ id, el, link });
  });

  if (sections.length > 0 && 'IntersectionObserver' in window) {
    const sidebarObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          sidebarLinks.forEach(l => l.classList.remove('is-active'));
          const match = sections.find(s => s.el === entry.target);
          if (match) match.link.classList.add('is-active');
        }
      });
    }, {
      rootMargin: '-80px 0px -60% 0px',
      threshold: 0
    });

    sections.forEach(s => sidebarObserver.observe(s.el));
  }

  // ─── Content block entrance animation ───
  const contentBlocks = document.querySelectorAll('.content-block');

  if (contentBlocks.length > 0 && 'IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, {
      rootMargin: '0px 0px -60px 0px',
      threshold: 0.05
    });

    contentBlocks.forEach(block => revealObserver.observe(block));
  }

  // ─── Back-to-top visibility ───
  const backToTop = document.querySelector('.back-to-top');
  if (backToTop) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 400) {
        backToTop.classList.add('is-visible');
      } else {
        backToTop.classList.remove('is-visible');
      }
    }, { passive: true });
  }

});
