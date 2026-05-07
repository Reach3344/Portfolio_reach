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
const scrollLinks = document.querySelectorAll('a[href^="#"]');
const pageSections = Array.from(navAnchors)
  .map((link) => document.querySelector(link.getAttribute("href")))
  .filter(Boolean);
const skillsSection = document.getElementById("skills");
const skillCards = document.querySelectorAll(".skill-card");
const projectsSection = document.getElementById("projects");
const projectCards = document.querySelectorAll(".project-card");
const themeToggle = document.getElementById("themeToggle");
const contactForm = document.getElementById("contactForm");
const contactSuccess = document.getElementById("contactSuccess");
const sendConfirmModal = document.getElementById("sendConfirmModal");
const confirmCancel = document.getElementById("confirmCancel");
const confirmSend = document.getElementById("confirmSend");

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

const setActiveNavLink = (sectionId) => {
  navAnchors.forEach((link) => {
    const isActive = link.getAttribute("href") === `#${sectionId}`;
    link.classList.toggle("active", isActive);
  });
};

scrollLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    const targetId = link.getAttribute("href");
    const targetSection = targetId === "#" ? document.body : document.querySelector(targetId);

    if (!targetSection) {
      return;
    }

    event.preventDefault();
    targetSection.scrollIntoView({ behavior: "smooth", block: "start" });

    if (targetId !== "#") {
      history.pushState(null, "", targetId);
    }

    if (link.closest(".nav-links")) {
      setActiveNavLink(targetId.slice(1));
    }

    navLinks.classList.remove("open");
  });
});

if (pageSections.length) {
  const sectionObserver = new IntersectionObserver(
    (entries) => {
      const visibleSection = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

      if (visibleSection) {
        setActiveNavLink(visibleSection.target.id);
      }
    },
    {
      rootMargin: "-25% 0px -55% 0px",
      threshold: [0.2, 0.45, 0.7],
    }
  );

  pageSections.forEach((section) => sectionObserver.observe(section));
}

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
  const askSendConfirmation = () =>
    new Promise((resolve) => {
      if (!sendConfirmModal || !confirmCancel || !confirmSend) {
        resolve(true);
        return;
      }

      sendConfirmModal.classList.add("show");
      sendConfirmModal.setAttribute("aria-hidden", "false");

      const close = (decision) => {
        sendConfirmModal.classList.remove("show");
        sendConfirmModal.setAttribute("aria-hidden", "true");
        confirmCancel.removeEventListener("click", onCancel);
        confirmSend.removeEventListener("click", onSend);
        sendConfirmModal.removeEventListener("click", onBackdrop);
        resolve(decision);
      };

      const onCancel = () => close(false);
      const onSend = () => close(true);
      const onBackdrop = (event) => {
        if (event.target === sendConfirmModal) {
          close(false);
        }
      };

      confirmCancel.addEventListener("click", onCancel);
      confirmSend.addEventListener("click", onSend);
      sendConfirmModal.addEventListener("click", onBackdrop);
    });

  contactForm.addEventListener("submit", (event) => {
    const submitHandler = async () => {
      const isConfirmed = await askSendConfirmation();
      if (!isConfirmed) {
        return;
      }

      contactSuccess.classList.add("show");
      contactForm.reset();

      setTimeout(() => {
        contactSuccess.classList.remove("show");
      }, 3000);
    };

    event.preventDefault();
    submitHandler();
  });
}

