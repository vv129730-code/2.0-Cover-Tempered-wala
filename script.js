document.addEventListener("DOMContentLoaded", () => {
  if (window.lucide) lucide.createIcons();

  const header = document.querySelector(".site-header");
  const menuBtn = document.querySelector("#menuBtn");
  const navLinks = document.querySelector("#navLinks");
  const glow = document.querySelector(".cursor-glow");
  const refreshIcons = () => {
    if (window.lucide) lucide.createIcons();
  };

  window.addEventListener("scroll", () => header.classList.toggle("scrolled", scrollY > 20), { passive: true });

  menuBtn.addEventListener("click", () => {
    const open = navLinks.classList.toggle("open");
    document.body.classList.toggle("menu-open", open);
    menuBtn.setAttribute("aria-expanded", String(open));
    menuBtn.innerHTML = open ? '<i data-lucide="x"></i>' : '<i data-lucide="menu"></i>';
    refreshIcons();
  });

  navLinks.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    document.body.classList.remove("menu-open");
    menuBtn.setAttribute("aria-expanded", "false");
    menuBtn.innerHTML = '<i data-lucide="menu"></i>';
    refreshIcons();
  }));

  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll(".reveal").forEach(el => revealObserver.observe(el));

  const counterObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = Number(el.dataset.target);
      let value = 0;
      const timer = setInterval(() => {
        value += 1;
        el.textContent = value;
        if (value >= target) clearInterval(timer);
      }, 90);
      counterObserver.unobserve(el);
    });
  }, { threshold: 0.7 });
  document.querySelectorAll(".counter").forEach(el => counterObserver.observe(el));

  if (matchMedia("(pointer:fine)").matches) {
    document.addEventListener("mousemove", event => {
      glow.style.opacity = "1";
      glow.style.left = `${event.clientX}px`;
      glow.style.top = `${event.clientY}px`;
    });
    document.querySelectorAll(".magnetic").forEach(button => {
      button.addEventListener("mousemove", event => {
        const rect = button.getBoundingClientRect();
        button.style.transform = `translate(${(event.clientX - rect.left - rect.width / 2) * .12}px, ${(event.clientY - rect.top - rect.height / 2) * .12}px)`;
      });
      button.addEventListener("mouseleave", () => button.style.transform = "");
    });
  }

  const particleWrap = document.querySelector("#particles");
  for (let i = 0; i < 24; i += 1) {
    const particle = document.createElement("i");
    particle.style.left = `${35 + Math.random() * 62}%`;
    particle.style.top = `${8 + Math.random() * 84}%`;
    particle.style.animationDelay = `${Math.random() * -8}s`;
    particle.style.animationDuration = `${6 + Math.random() * 7}s`;
    particleWrap.appendChild(particle);
  }
});
