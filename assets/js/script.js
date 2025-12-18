const nav = document.getElementById("nav");

window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
        nav.classList.add("scrolled");
    } else {
        nav.classList.remove("scrolled");
    }
});

// GSAP ANIMATIONS
document.addEventListener("DOMContentLoaded", () => {
    // REGISTER GSAP PLUGINS
    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

    /* =========================
        BACK TO TOP BUTTON
    ========================== */
    const btn = document.getElementById("backToTop");
    if (btn) {
        let isVisible = false;

        window.addEventListener("scroll", () => {
            if (window.scrollY > 300 && !isVisible) {
                isVisible = true;
                gsap.to(btn, {
                    autoAlpha: 1,
                    y: 0,
                    duration: 0.3,
                    ease: "power2.out",
                    pointerEvents: "auto"
                });
            }

            if (window.scrollY <= 300 && isVisible) {
                isVisible = false;
                gsap.to(btn, {
                    autoAlpha: 0,
                    y: 20,
                    duration: 0.3,
                    ease: "power2.out",
                    pointerEvents: "none"
                });
            }
        });

        btn.addEventListener("click", () => {
            gsap.killTweensOf(window);
            gsap.to(window, {
                scrollTo: { y: 0 },
                duration: 0.9,
                ease: "power3.out"
            });
        });
    }

    /* =========================
        FADE UP ANIMATION
    ========================== */
    gsap.utils.toArray(".gsap-fade-up").forEach((el, i) => {
        gsap.from(el, {
            opacity: 0,
            y: 30,
            duration: 0.4,
            delay: i * 0.6,
            ease: "power2.out",
            scrollTrigger: {
                trigger: el,
                start: "top 75%",
                toggleActions: "play none none none",
                once: true,
            }
        });
    });
    // Fade
    gsap.utils.toArray(".fade").forEach((el, i) => {
        gsap.from(el, {
            opacity: 0.1,
            y: 40,
            duration: .3,
            stagger: 0.3,
            ease: "power2.out",
            scrollTrigger: {
                trigger: el,
                start: "top 75%",
                toggleActions: "play none none none",
                once: true,
            }
        });
    });
});
// MOBILE MENU ANIMATION
document.addEventListener("DOMContentLoaded", () => {
    const menuBtn = document.querySelector(".menu-toggle");
    const menu = document.querySelector(".mobile-menu");
    const x = document.querySelector(".close-btn");

    // START HIDDEN (important)
    gsap.set(menu, { y: "10%", autoAlpha: 0 });

    // CREATE TIMELINE (paused)
    const menuTl = gsap.timeline({ paused: true });

    menuTl.to(menu, {
        y: "0%",
        autoAlpha: 1,
        duration: 0.4,
        pointerEvents: "auto",
        duration: 0.35,
        ease: "power2.out"
    });

    // TOGGLE ON CLICK
    let isOpen = false;

    menuBtn.addEventListener("click", () => {
        if (!isOpen) {
            menuTl.play();
        } else {
            menuTl.reverse();
        }
        isOpen = !isOpen;
    });
    x.addEventListener("click", () => {
        menuTl.reverse();
        isOpen = false;
        return;
    });
});

// STAT COUNT ANIMATION
gsap.registerPlugin(ScrollTrigger);

document.querySelectorAll(".stat-value[data-count]").forEach(el => {
    const target = +el.dataset.count;

    gsap.fromTo(
        el,
        { innerText: 0 },
        {
            innerText: target,
            duration: 2,
            ease: "power3.out",
            snap: { innerText: 1 },
            scrollTrigger: {
                trigger: el,
                start: "top 80%",
                once: true,
            },
            onUpdate() {
                el.textContent = Math.floor(el.innerText);
            },
            onComplete() {
                el.textContent = target + "+";
            },
        }
    );
});

// Swiper carousel initialization
const swiper = new Swiper('.swiper', {
    slidesPerView: 1.2, // mobile default
    spaceBetween: 20,
    breakpoints: {
        640: {
            slidesPerView: 2,
        },
        768: {
            slidesPerView: 3,
        },
        1024: {
            slidesPerView: 4,
        },
    },
  preloadImages: true,     // 🔑
  lazy: false,             // 🔑
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
});