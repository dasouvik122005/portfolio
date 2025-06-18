document.addEventListener("DOMContentLoaded", function () {
    const toggleButton = document.getElementById("theme-toggle");
    const navbarCollapse = document.querySelector('.navbar-collapse');
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navItemsToCollapse = document.querySelectorAll('.nav-link, .theme-toggle-btn');
    const contactForm = document.getElementById("contactForm");

    // Initialize Vanilla Tilt for hero-img
    const heroImg = document.querySelector(".hero-img");
    if (heroImg) {
        VanillaTilt.init(heroImg, {
            max: 8, // reduced tilt effect
            speed: 200,
            glare: true,
            "max-glare": 0.1, // reduced glare
            scale: 1.05, // reduced scale
            transition: true,
            easing: "cubic-bezier(.03,.98,.52,.99)"
        });
        // Add lighter shadow behind the profile picture
        heroImg.style.boxShadow = "0 16px 32px 0 rgba(80, 180, 255, 0.25)";
    }

    // Initialize Vanilla Tilt for tilt-btn
    const tiltBtns = document.querySelectorAll(".tilt-btn");
    if (tiltBtns.length > 0) {
        VanillaTilt.init(tiltBtns, {
            max: 1, // further reduced tilt effect
            speed: 200,
            glare: true,
            "max-glare": 0.08, // reduced glare
            scale: 1.02, // reduced scale
            transition: true,
            easing: "cubic-bezier(.03,.98,.52,.99)"
        });
    }

    // Dark Mode Toggle Logic
    const currentTheme = localStorage.getItem("theme") || "light"; // Default to light if no theme is set

    if (currentTheme === "dark") {
        document.body.classList.add("dark-mode");
        toggleButton.textContent = "☀️ Light Mode";
    } else {
        document.body.classList.remove("dark-mode");
        toggleButton.textContent = "🌙 Dark Mode";
    }

    toggleButton.addEventListener("click", () => {
        document.body.classList.toggle("dark-mode");
        if (document.body.classList.contains("dark-mode")) {
            toggleButton.textContent = "☀️ Light Mode";
            localStorage.setItem("theme", "dark");
        } else {
            toggleButton.textContent = "🌙 Dark Mode";
            localStorage.setItem("theme", "light");
        }
    });

    // Navbar Collapse Logic
    if (navbarToggler && navbarCollapse) {
        // Toggle navbar on hamburger click (Bootstrap handles aria-expanded and 'show' class)
        navbarToggler.addEventListener('click', () => {
            // Bootstrap's data-bs-toggle="collapse" already handles the show/hide,
            // but your custom script below also handles it. Keeping this minimal for clarity.
        });

        // Close on link or toggle button click inside navbar
        navItemsToCollapse.forEach(item => {
            item.addEventListener('click', () => {
                if (navbarCollapse.classList.contains('show')) {
                    const bsCollapse = new bootstrap.Collapse(navbarCollapse, { toggle: false });
                    bsCollapse.hide();
                }
            });
        });

        // Close if clicked outside
        document.addEventListener('click', function (event) {
            const isClickInsideNavbar = navbarCollapse.contains(event.target) || navbarToggler.contains(event.target);
            if (!isClickInsideNavbar && navbarCollapse.classList.contains('show')) {
                const bsCollapse = new bootstrap.Collapse(navbarCollapse, { toggle: false });
                bsCollapse.hide();
            }
        });

        // Close on scroll
        window.addEventListener('scroll', function () {
            if (navbarCollapse.classList.contains('show')) {
                const bsCollapse = new bootstrap.Collapse(navbarCollapse, { toggle: false });
                bsCollapse.hide();
            }
        });
    }

    // Contact Form Submission
    if (contactForm) {
        const scriptURL = "https://script.google.com/macros/s/AKfycbzkb4ims1IdXODVkQ0dgfqApX3xz1zSa04WwUhLi2uVGH0_LybrPywV6KvLtBhQgbPd/exec";
        contactForm.addEventListener("submit", e => {
            e.preventDefault();
            const formData = new FormData(contactForm);

            fetch(scriptURL, {
                method: "POST",
                body: formData
            })
            .then(response => {
                if (response.ok) {
                    alert("✅ Message submitted successfully!");
                    contactForm.reset();
                } else {
                    alert("❌ Submission failed (response not OK).");
                }
            })
            .catch(error => {
                console.error("❌ Error submitting form:", error);
                alert("❌ Network error occurred.");
            });
        });
    }
});

// Scroll to Top Button Logic

const scrollToTopBtn = document.getElementById("scrollToTopBtn");

window.addEventListener("scroll", () => {
    if (window.scrollY > 200) {
        scrollToTopBtn.style.display = "block";
    } else {
        scrollToTopBtn.style.display = "none";
    }
});

scrollToTopBtn.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});



// Check for system preference and apply dark mode if needed
const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
if (!localStorage.getItem("theme") && prefersDark) {
  document.body.classList.add("dark-mode");
  document.getElementById("theme-toggle").textContent = "☀️ Light Mode";
}


// Moved the loading overlay hiding logic here
    window.onload = function() {
        const loadingOverlay = document.getElementById("loading-overlay");
        if (loadingOverlay) {
            loadingOverlay.classList.add("hidden");
        }
    };


