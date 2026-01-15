document.addEventListener("DOMContentLoaded", () => {
  /* =============================
     NAVBAR FIXED
  ============================= */
  const header = document.querySelector("header");
  if (header) {
    window.addEventListener("scroll", () => {
      const fixedNav = header.offsetTop;
      header.classList.toggle("navbar-fixed", window.pageYOffset > fixedNav);
    });
  }

  /* =============================
     HAMBURGER MENU
  ============================= */
  const hamburger = document.getElementById("hamburger");
  const navMenu = document.getElementById("nav-menu");

  if (hamburger && navMenu) {
    hamburger.addEventListener("click", () => {
      hamburger.classList.toggle("hamburger-active");
      navMenu.classList.toggle("hidden");
    });
  }

  /* =============================
     DARK MODE
  ============================= */
  const html = document.documentElement;
  const darkToggle = document.getElementById("dark-toggle");

  if (localStorage.theme === "dark") {
    html.classList.add("dark");
  }

  if (darkToggle) {
    darkToggle.addEventListener("click", () => {
      html.classList.toggle("dark");
      localStorage.theme = html.classList.contains("dark") ? "dark" : "light";
    });
  }

  /* =============================
     BACK TO TOP
  ============================= */
  const backToTop = document.getElementById("backToTop");

  if (backToTop) {
    window.addEventListener("scroll", () => {
      const show = window.scrollY > 300;
      backToTop.classList.toggle("hidden", !show);
      backToTop.classList.toggle("opacity-100", show);
    });

    backToTop.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  /* =============================
     TYPING EFFECT
  ============================= */
  const typingText = document.getElementById("typingText");
  if (typingText) {
    const words = [
      "Mahasiswa",
      "Fakultas Ilmu Komputer",
      "Sistem Informasi",
      "Universitas Subang",
    ];

    let wordIndex = 0;
    let charIndex = 0;
    let deleting = false;

    const typeEffect = () => {
      const word = words[wordIndex];
      typingText.textContent = word.substring(0, charIndex);

      if (!deleting) {
        if (charIndex < word.length) {
          charIndex++;
        } else {
          deleting = true;
        }
      } else {
        if (charIndex > 0) {
          charIndex--;
        } else {
          deleting = false;
          wordIndex = (wordIndex + 1) % words.length;
        }
      }

      setTimeout(typeEffect, deleting ? 70 : 120);
    };

    typeEffect();
  }

  /* =============================
     PRELOADER
  ============================= */
  const preloader = document.getElementById("preloader");
  if (preloader) {
    window.addEventListener("load", () => {
      preloader.style.opacity = "0";
      setTimeout(() => (preloader.style.display = "none"), 500);
    });
  }

  /* =============================
     LOVE CONFETTI
  ============================= */
  const loveBtn = document.getElementById("loveBtn");

  if (loveBtn) {
    loveBtn.addEventListener("click", () => {
      const rect = loveBtn.getBoundingClientRect();
      const x = rect.left + rect.width / 2;
      const y = rect.top + rect.height / 2;

      for (let i = 0; i < 10; i++) createConfetti(x, y);

      loveBtn.classList.add("scale-125");
      setTimeout(() => loveBtn.classList.remove("scale-125"), 150);
    });
  }

  function createConfetti(x, y) {
    const confetti = document.createElement("span");
    const icons = ["💙", "✨", "⭐", "🎉", "😍"];
    confetti.textContent = icons[Math.floor(Math.random() * icons.length)];
    confetti.style.position = "fixed";
    confetti.style.left = `${x}px`;
    confetti.style.top = `${y}px`;
    confetti.style.pointerEvents = "none";
    confetti.style.zIndex = "9999";

    const angle = Math.random() * Math.PI * 2;
    const distance = Math.random() * 80 + 40;

    confetti.animate(
      [
        { transform: "translate(0,0)", opacity: 1 },
        {
          transform: `translate(${Math.cos(angle) * distance}px, ${
            Math.sin(angle) * distance
          }px)`,
          opacity: 0,
        },
      ],
      { duration: 900, easing: "ease-out" }
    );

    document.body.appendChild(confetti);
    setTimeout(() => confetti.remove(), 900);
  }

  /* =============================
     LIGHTBOX GALLERY
  ============================= */
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightboxImage");
  const btnClose = document.getElementById("lightboxClose");
  const btnNext = document.getElementById("lightboxNext");
  const btnPrev = document.getElementById("lightboxPrev");
  const images = document.querySelectorAll(".portfolio-img");

  let currentIndex = 0;

  if (lightbox && lightboxImg && images.length) {
    images.forEach((img, index) => {
      img.addEventListener("click", () => openLightbox(index));
    });

    btnClose?.addEventListener("click", closeLightbox);
    btnNext?.addEventListener("click", () => changeImage(1));
    btnPrev?.addEventListener("click", () => changeImage(-1));

    lightbox.addEventListener("click", (e) => {
      if (e.target === lightbox) closeLightbox();
    });

    document.addEventListener("keydown", (e) => {
      if (lightbox.classList.contains("hidden")) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") changeImage(1);
      if (e.key === "ArrowLeft") changeImage(-1);
    });
  }

  function openLightbox(index) {
    currentIndex = index;
    lightboxImg.src = images[currentIndex].src;
    lightbox.classList.remove("hidden");
    lightbox.classList.add("flex");
    document.body.style.overflow = "hidden";
  }

  function closeLightbox() {
    lightbox.classList.add("hidden");
    lightbox.classList.remove("flex");
    document.body.style.overflow = "";
  }

  function changeImage(step) {
    currentIndex = (currentIndex + step + images.length) % images.length;
    lightboxImg.src = images[currentIndex].src;
  }
});

  /* =============================
     EMAIL
  ============================= */

(function () {
  emailjs.init("6ifwGgJ0t5RPXMMLt");
})();

const form = document.getElementById("contactForm");
const statusText = document.getElementById("formStatus");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  statusText.textContent = "Mengirim pesan...";
  statusText.className = "text-sky-400";

  emailjs
    .send("service_riqy5c8", "template_q4cx5rj", {
      name: document.getElementById("name").value,
      email: document.getElementById("email").value,
      message: document.getElementById("message").value,
    })
    .then(() => {
      statusText.textContent = "Pesan berhasil dikirim ✅";
      statusText.className = "text-green-500";
      form.reset();
    })
    .catch(() => {
      statusText.textContent = "Gagal mengirim pesan ❌";
      statusText.className = "text-red-500";
    });
});
