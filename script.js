// Mobile hamburger menu (vanilla JS)
const hamburger = document.getElementById('hamburger');
const nav = document.getElementById('site-nav');

if (hamburger && nav) {
  hamburger.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    hamburger.setAttribute('aria-expanded', open ? 'true' : 'false');
  });

  // Close nav on link click (mobile)
  nav.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      if (nav.classList.contains('open')) {
        nav.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
      }
    });
  });
}

// Active link highlighting while scrolling
const sections = document.querySelectorAll('main .section[id]');
const navLinks = document.querySelectorAll('#site-nav a');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute('id');
      navLinks.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === '#' + id);
      });
    }
  });
}, { rootMargin: '-40% 0px -50% 0px', threshold: 0.01 });

sections.forEach(sec => observer.observe(sec));

// Year in footer
const year = document.getElementById('year');
if (year) year.textContent = new Date().getFullYear();

// Resume actions
const downloadBtn = document.getElementById('downloadResume');
const viewResume = document.getElementById('viewResume');
const resumeFileInput = document.getElementById('resumeFile');

function fileName() {
  const val = resumeFileInput?.value?.trim();
  return val || 'resume.pdf';
}

downloadBtn?.addEventListener('click', () => {
  const f = fileName();
  const a = document.createElement('a');
  a.href = f;
  a.download = f.split('/').pop();
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
});

viewResume?.addEventListener('click', (e) => {
  e.preventDefault();
  const f = fileName();
  viewResume.href = f;
  window.open(f, '_blank', 'noopener');
});
