// Navbar scroll effect
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 40) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// Mobile menu toggle
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');

menuToggle.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  menuToggle.classList.toggle('active');
});

// Close menu on link click
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    menuToggle.classList.remove('active');
  });
});

// Close menu on outside click
document.addEventListener('click', (e) => {
  if (!navLinks.contains(e.target) && !menuToggle.contains(e.target)) {
    navLinks.classList.remove('open');
    menuToggle.classList.remove('active');
  }
});

// Contact form handling
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const formData = new FormData(contactForm);
    const name = formData.get('name');
    const email = formData.get('email');
    const tipo = formData.get('tipo');

    // Simple validation feedback
    if (!name || !email || !tipo) {
      alert('Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    // Simulate success
    const successMsg = document.createElement('div');
    successMsg.className = 'form-success show';
    successMsg.innerHTML = `
      <strong>Mensagem enviada com sucesso!</strong><br>
      Obrigado, ${name}. Entraremos em contato em breve pelo e-mail ${email}.
    `;

    contactForm.style.display = 'none';
    contactForm.parentNode.insertBefore(successMsg, contactForm.nextSibling);

    // Reset after delay (for demo)
    setTimeout(() => {
      contactForm.reset();
      contactForm.style.display = 'flex';
      successMsg.remove();
    }, 6000);
  });
}

// Smooth reveal on scroll (Intersection Observer)
const observerOptions = {
  threshold: 0.12,
  rootMargin: '0px 0px -40px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate-in');
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

document.querySelectorAll(
  '.about-card, .problem-card, .solution-card, .process-step, .feature-item, .audience-card, .impact-card, .diff-card, .revenue-card, .detail-item'
).forEach(el => {
  el.style.opacity = '0';
  observer.observe(el);
});

// Active nav link on scroll
const sections = document.querySelectorAll('section[id], header[id]');
const navItems = document.querySelectorAll('.nav-links a[href^="#"]');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 120;
    if (window.scrollY >= sectionTop) {
      current = section.getAttribute('id');
    }
  });

  navItems.forEach(item => {
    item.classList.remove('active');
    if (item.getAttribute('href') === `#${current}`) {
      item.classList.add('active');
    }
  });
});
