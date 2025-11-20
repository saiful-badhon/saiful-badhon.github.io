// Mobile hamburger menu
const hamburger = document.getElementById('hamburger');
const mobileNav = document.getElementById('mobile-nav');

if (hamburger && mobileNav) {
  hamburger.addEventListener('click', () => {
    mobileNav.classList.toggle('hidden');
    const isOpen = !mobileNav.classList.contains('hidden');
    hamburger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  });

  // Close nav on link click (mobile)
  mobileNav.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      mobileNav.classList.add('hidden');
      hamburger.setAttribute('aria-expanded', 'false');
    });
  });
}

// Active link highlighting while scrolling
const sections = document.querySelectorAll('main .section[id]');
const navLinks = document.querySelectorAll('.nav-link');

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
  return val || 'resume- data.pdf';
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
