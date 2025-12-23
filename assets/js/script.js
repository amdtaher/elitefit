// GSAP ANIMATIONS
document.addEventListener("DOMContentLoaded", () => {
    // REGISTER GSAP PLUGINS
    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

    ScrollTrigger.config({
        ignoreMobileResize: true,
        autoRefreshEvents: "visibilitychange,DOMContentLoaded,load"
    });
    // BACK TO TOP BUTTON
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

    // FADE UP ANIMATION
    gsap.utils.toArray(".gsap-fade-up").forEach((el, i) => {
        gsap.from(el, {
            opacity: 0,
            y: 30,
            duration: 0.3,
            delay: i * 0.15,
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
            opacity: 0.3,
            y: 20,
            duration: .25,
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
    gsap.set(".mobile-menu", {
        autoAlpha: 0,
        y: -20,
        pointerEvents: "none"
    });

    const menuBtn = document.querySelector(".menu-toggle");
    const menu = document.querySelector(".mobile-menu");
    const closeBtn = document.querySelector(".close-btn");

    const menuTl = gsap.timeline({ paused: true });

    menuTl.to(menu, {
        autoAlpha: 1,
        y: 0,
        pointerEvents: "auto",
        duration: 0.35,
        ease: "power2.out"
    });

    let isOpen = false;

    menuBtn.addEventListener("click", () => {
        isOpen ? menuTl.reverse() : menuTl.play();
        isOpen = !isOpen;
    });

    closeBtn.addEventListener("click", () => {
        menuTl.reverse();
        isOpen = false;
    });

    // AUTO-CLOSE MOBILE MENU ON LINK CLICK
    document.querySelectorAll(".mobile-menu a").forEach(link => {
        link.addEventListener("click", () => {
            if (isOpen) {
                menuTl.reverse();   // close menu
                isOpen = false;
            }
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
                duration: 1.3,
                ease: "power3.out",
                snap: { innerText: 1 },
                scrollTrigger: {
                    trigger: el,
                    start: "top 40%",
                    once: true,
                },
                onUpdate() {
                    el.textContent = Math.round(el.innerText);
                },
                onComplete() {
                    el.textContent = target + "+";
                },
            }
        );
    });
    // --X--

// Swiper carousel initialization
const swiper = new Swiper('.swiper', {
    slidesPerView: 1.2,
    spaceBetween: 20,
    breakpoints: {
        640: { slidesPerView: 2 },
        768: { slidesPerView: 3 },
        1024: { slidesPerView: 4 },
    },

    preloadImages: false, // ❌ stop eager loading
    lazy: {
        loadOnTransitionStart: true,
        loadPrevNext: true,
    },

    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
});

// --X--

// Navbar Visible on Scroll
const nav = document.getElementById("nav");

window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
        nav.classList.add("scrolled");
    } else {
        nav.classList.remove("scrolled");
    }
});

// Read more Button
function toggleServiceText(btn) {
    const text = btn.previousElementSibling;

    const shortText = text.getAttribute("data-short");
    const fullText = text.getAttribute("data-full");

    const expanded = btn.textContent === "Show Less «";

    text.textContent = expanded ? shortText : fullText;
    btn.textContent = expanded ? "read more »" : "Show Less «";
}

// QNA Show more
document.querySelectorAll(".faq-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
        const item = btn.parentElement;
        const content = item.querySelector(".faq-content");
        const icon = item.querySelector(".faq-icon");

        document.querySelectorAll(".faq-item").forEach((i) => {
            if (i !== item) {
                i.querySelector(".faq-content").style.maxHeight = null;
                i.querySelector(".faq-icon").style.transform = "rotate(0deg)";
            }
        });

        if (content.style.maxHeight) {
            content.style.maxHeight = null;
            icon.style.transform = "rotate(0deg)";
        } else {
            content.style.maxHeight = content.scrollHeight + "px";
            icon.style.transform = "rotate(180deg)";
        }
    });
});