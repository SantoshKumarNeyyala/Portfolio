const menuIcon = document.getElementById("menuIcon");
const navLinks = document.getElementById("navLinks");

menuIcon.addEventListener("click", () => {
  navLinks.classList.toggle("show");
});

const roles = [
  "Software Developer",
  "Python Developer",
  "Web Developer",
  "QA Enthusiast",
  "Data Analyst Learner"
];

let roleIndex = 0;
let charIndex = 0;
let currentRole = "";
let isDeleting = false;

function typeEffect() {
  const typing = document.getElementById("typing");
  currentRole = roles[roleIndex];

  if (!isDeleting) {
    typing.textContent = currentRole.substring(0, charIndex + 1);
    charIndex++;

    if (charIndex === currentRole.length) {
      isDeleting = true;
      setTimeout(typeEffect, 1000);
      return;
    }
  } else {
    typing.textContent = currentRole.substring(0, charIndex - 1);
    charIndex--;

    if (charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
    }
  }

  setTimeout(typeEffect, isDeleting ? 60 : 120);
}

typeEffect();

const scrollTopBtn = document.getElementById("scrollTopBtn");

window.addEventListener("load", () => {
  document.body.classList.add("loaded");
  revealSections();
  setActiveNavLink();
});

window.addEventListener("scroll", () => {
  if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
    scrollTopBtn.style.display = "block";
  } else {
    scrollTopBtn.style.display = "none";
  }

  revealSections();
  setActiveNavLink();
});

scrollTopBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});

function revealSections() {
  const reveals = document.querySelectorAll(".reveal");

  reveals.forEach((section) => {
    const windowHeight = window.innerHeight;
    const revealTop = section.getBoundingClientRect().top;
    const revealPoint = 100;

    if (revealTop < windowHeight - revealPoint) {
      section.classList.add("active");
    }
  });
}

function setActiveNavLink() {
  const sections = document.querySelectorAll("section");
  const navLinksList = document.querySelectorAll(".nav-link");

  let current = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 140;
    const sectionHeight = section.offsetHeight;

    if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
      current = section.getAttribute("id");
    }
  });

  navLinksList.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active");
    }
  });
}

const contactForm = document.getElementById("contactForm");
const formMessage = document.getElementById("formMessage");

contactForm.addEventListener("submit", async function (e) {
  e.preventDefault();

  const formData = new FormData(contactForm);

  try {
    const response = await fetch(contactForm.action, {
      method: "POST",
      body: formData,
      headers: {
        Accept: "application/json"
      }
    });

    if (response.ok) {
      formMessage.textContent = "Message sent successfully!";
      formMessage.style.color = "#38bdf8";
      contactForm.reset();
    } else {
      formMessage.textContent = "Something went wrong. Please try again.";
      formMessage.style.color = "#f87171";
    }
  } catch (error) {
    formMessage.textContent = "Network error. Please try again.";
    formMessage.style.color = "#f87171";
  }
});