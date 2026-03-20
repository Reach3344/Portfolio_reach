const words = [
  "Web Developer",
  "Ux Design",
  "Quality Assurance",
  "Web App",
  "Forntend Developer",
  "Backend Develpoer",
];
const typingWord = document.getElementById("typingWord");
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");
const navAnchors = document.querySelectorAll(".nav-links a");
const skillsSection = document.getElementById("skills");
const skillCards = document.querySelectorAll(".skill-card");
const projectsSection = document.getElementById("projects");
const projectCards = document.querySelectorAll(".project-card");
const themeToggle = document.getElementById("themeToggle");
const contactForm = document.getElementById("contactForm");
const contactSuccess = document.getElementById("contactSuccess");

let wordIndex = 0;
if (typingWord) {
  const typeWord = (word, speed = 140) =>
    new Promise((resolve) => {
      typingWord.textContent = "";
      let i = 0;
      const timer = setInterval(() => {
        typingWord.textContent += word[i];
        i += 1;
        if (i >= word.length) {
          clearInterval(timer);
          resolve();
        }
      }, speed);
    });

  const runTypingLoop = async () => {
    while (true) {
      const currentWord = words[wordIndex];
      await typeWord(currentWord);
      await new Promise((resolve) => setTimeout(resolve, 1500));
      wordIndex = (wordIndex + 1) % words.length;
    }
  };

  runTypingLoop();
}

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

projectCards.forEach((card, index) => {
  card.style.setProperty("--delay", `${index * 110}ms`);
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

if (projectsSection && projectCards.length) {
  const projectsObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          projectCards.forEach((card) => card.classList.add("in-view"));
          projectsObserver.unobserve(projectsSection);
        }
      });
    },
    { threshold: 0.2 }
  );

  projectsObserver.observe(projectsSection);
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

