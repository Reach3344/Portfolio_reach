const words = ["Web Apps", "UI Design", "Frontend Magic", "Brand Websites"];
const typingWord = document.getElementById("typingWord");
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");
const navAnchors = document.querySelectorAll(".nav-links a");
const skillsSection = document.getElementById("skills");
const skillCards = document.querySelectorAll(".skill-card");
const themeToggle = document.getElementById("themeToggle");
const contactForm = document.getElementById("contactForm");
const contactSuccess = document.getElementById("contactSuccess");

let wordIndex = 0;
setInterval(() => {
  wordIndex = (wordIndex + 1) % words.length;
  typingWord.style.opacity = "0";
  setTimeout(() => {
    typingWord.textContent = words[wordIndex];
    typingWord.style.opacity = "1";
  }, 180);
}, 2200);

menuToggle.addEventListener("click", () => {
  navLinks.classList.toggle("open");
});

navAnchors.forEach((link) => {
  link.addEventListener("click", () => {
    navAnchors.forEach((l) => l.classList.remove("active"));
    link.classList.add("active");
    navLinks.classList.remove("open");
  });
});

skillCards.forEach((card, index) => {
  card.style.setProperty("--delay", `${index * 90}ms`);
});

if (skillsSection && skillCards.length) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          skillCards.forEach((card) => card.classList.add("in-view"));
          observer.unobserve(skillsSection);
        }
      });
    },
    { threshold: 0.25 }
  );

  observer.observe(skillsSection);
}

if (themeToggle) {
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
    document.body.classList.add("dark-mode");
    themeToggle.innerHTML = "<i class='bx bx-sun'></i>";
  }

  themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    const isDark = document.body.classList.contains("dark-mode");
    themeToggle.innerHTML = isDark ? "<i class='bx bx-sun'></i>" : "<i class='bx bx-moon'></i>";
    localStorage.setItem("theme", isDark ? "dark" : "light");
  });
}

if (contactForm && contactSuccess) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();
    contactSuccess.classList.add("show");
    contactForm.reset();

    setTimeout(() => {
      contactSuccess.classList.remove("show");
    }, 3000);
  });
}
