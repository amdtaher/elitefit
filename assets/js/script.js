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
        FADE IN UP ANIMATION
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
    // Fade Up
    gsap.utils.toArray(".fade").forEach((el, i) => {
        gsap.from(el, {
            opacity: 0.1,
            y: 40,
            duration: .4,
            stagger: 0.8,
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
    loop: true,
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
});
// Scroll reveal animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function (entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, observerOptions);

// Observe all reveal elements
document.querySelectorAll('.reveal, .reveal-up, .reveal-left, .reveal-right, .pricing-card').forEach(el => {
    observer.observe(el);
});

// Stagger animation for grid items
const staggerObserver = new IntersectionObserver(function (entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const items = entry.target.querySelectorAll('.stagger-item');
            items.forEach((item, index) => {
                setTimeout(() => {
                    item.classList.add('active');
                }, index * 100);
            });
            staggerObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe sections with stagger items
document.querySelectorAll('.stats-grid, .services-grid, .testimonials-grid').forEach(el => {
    staggerObserver.observe(el);
});

// Counter animation
function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-count'));
    const duration = 2000;
    const increment = target / (duration / 16);
    let current = 0;

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target + '+';
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
}

// Observe counter elements
const counterObserver = new IntersectionObserver(function (entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounter(entry.target);
            counterObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-value[data-count], .about-badge .number[data-count]').forEach(el => {
    counterObserver.observe(el);
});

// Form submission
function handleSubmit(event) {
    event.preventDefault();
    alert('Thank you for reaching out! I\'ll get back to you within 24 hours.');
    event.target.reset();
}

// Newsletter submission
function handleNewsletter(event) {
    event.preventDefault();
    alert('Successfully subscribed to the newsletter!');
    event.target.reset();
}
// Add .loaded as soon as browser finishes decoding/displaying the image
document.querySelectorAll('img.img').forEach(img => {
    if (img.complete && img.naturalWidth !== 0) {
        img.classList.add('loaded'); // already cached/loaded
    } else {
        img.addEventListener('load', () => img.classList.add('loaded'));
        // for cached images in some browsers
        img.addEventListener('error', () => img.classList.add('loaded'));
    }
});


// (function () {
//     const carousel = document.getElementById('carousel');
//     const prev = document.getElementById('prevBtn');
//     const next = document.getElementById('nextBtn');
//     const cards = Array.from(carousel.children);

//     // card size + gap (read computed values so it's responsive)
//     function getStep() {
//         const cardW = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--card-w')) || cards[0].clientWidth;
//         const gap = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--gap')) || 16;
//         return Math.round(cardW + gap);
//     }

//     // calculate index of the card closest to center
//     function getCenteredIndex() {
//         const center = carousel.scrollLeft + carousel.clientWidth / 2;
//         let bestIndex = 0; let bestDist = Infinity;
//         cards.forEach((c, i) => {
//             const cCenter = c.offsetLeft + c.clientWidth / 2;
//             const d = Math.abs(cCenter - center);
//             if (d < bestDist) { bestDist = d; bestIndex = i; }
//         });
//         return bestIndex;
//     }

//     // Improved smooth scroll-to-index with robust 'isAutoScrolling' handling
//     let isAutoScrolling = false;
//     let autoScrollWatcher = null;
//     function scrollToIndex(i) {
//         if (i < 0) i = 0; if (i > cards.length - 1) i = cards.length - 1;
//         const card = cards[i];
//         const offset = card.offsetLeft - ((carousel.clientWidth - card.clientWidth) / 2);

//         // prevent spamming nav during auto-scrolling
//         isAutoScrolling = true;
//         prev.disabled = true; next.disabled = true;

//         // request native smooth scroll
//         carousel.scrollTo({ left: offset, behavior: 'smooth' });

//         // clear any existing watcher
//         if (autoScrollWatcher) clearInterval(autoScrollWatcher);

//         // watch until scrollLeft is close to target or movement stops
//         const start = performance.now();
//         autoScrollWatcher = setInterval(() => {
//             const cur = carousel.scrollLeft;
//             // if we're within 2px of target OR 800ms elapsed, stop watching
//             if (Math.abs(cur - offset) <= 2 || performance.now() - start > 900) {
//                 clearInterval(autoScrollWatcher);
//                 autoScrollWatcher = null;
//                 // give a tiny delay to allow final paint
//                 setTimeout(() => {
//                     isAutoScrolling = false;
//                     prev.disabled = false; next.disabled = false;
//                 }, 60);
//             }
//         }, 40);
//     }

//     // prev/next button handlers using centered index
//     prev.addEventListener('click', () => {
//         if (prev.disabled) return;
//         const i = getCenteredIndex();
//         scrollToIndex(i - 1);
//     });
//     next.addEventListener('click', () => {
//         if (next.disabled) return;
//         const i = getCenteredIndex();
//         scrollToIndex(i + 1);
//     });

//     // drag to scroll (mouse)
//     let isDown = false, startX = 0, scrollLeft = 0;
//     carousel.addEventListener('mousedown', (e) => {
//         isDown = true; carousel.classList.add('dragging'); startX = e.pageX - carousel.offsetLeft; scrollLeft = carousel.scrollLeft; e.preventDefault();
//         // if user starts dragging while auto-scrolling, cancel auto state
//         if (isAutoScrolling) {
//             if (autoScrollWatcher) { clearInterval(autoScrollWatcher); autoScrollWatcher = null; }
//             isAutoScrolling = false; prev.disabled = false; next.disabled = false;
//         }
//     });
//     window.addEventListener('mouseup', () => { if (isDown) { isDown = false; carousel.classList.remove('dragging'); snapToNearest(); } });
//     window.addEventListener('mousemove', (e) => { if (!isDown) return; const x = e.pageX - carousel.offsetLeft; const walk = (x - startX) * 1.4; carousel.scrollLeft = scrollLeft - walk; });

//     // touch
//     let touchStartX = 0, touchScrollLeft = 0;
//     carousel.addEventListener('touchstart', (e) => { touchStartX = e.touches[0].pageX - carousel.offsetLeft; touchScrollLeft = carousel.scrollLeft; if (isAutoScrolling) { if (autoScrollWatcher) { clearInterval(autoScrollWatcher); autoScrollWatcher = null; } isAutoScrolling = false; prev.disabled = false; next.disabled = false; } });
//     carousel.addEventListener('touchmove', (e) => { const x = e.touches[0].pageX - carousel.offsetLeft; const walk = (x - touchStartX) * 1.2; carousel.scrollLeft = touchScrollLeft - walk; });
//     carousel.addEventListener('touchend', () => snapToNearest());

//     // keyboard
//     carousel.addEventListener('keydown', (e) => {
//         if (e.key === 'ArrowLeft') { e.preventDefault(); scrollToIndex(getCenteredIndex() - 1); }
//         if (e.key === 'ArrowRight') { e.preventDefault(); scrollToIndex(getCenteredIndex() + 1); }
//     });

//     // snapping: when user stops scrolling, snap to nearest card
//     let snapTimer;
//     function snapToNearest() {
//         if (isAutoScrolling) return; // don't interfere with programmatic scroll
//         clearTimeout(snapTimer);
//         snapTimer = setTimeout(() => {
//             const i = getCenteredIndex(); scrollToIndex(i);
//         }, 120);
//     }

//     // improved scroll handler — only trigger snap when not auto-scrolling
//     carousel.addEventListener('scroll', () => { if (!isAutoScrolling) snapToNearest(); });

//     // accessibility: let buttons be tabbable and show visible focus
//     prev.tabIndex = 0; next.tabIndex = 0;

//     // expose a simple API so this section can be reused/updated dynamically
//     window.simpleCarousel = {
//         next: () => next.click(), prev: () => prev.click(), scrollToIndex
//     };

//     // initial layout: center first card
//     window.addEventListener('load', () => scrollToIndex(0));
//     window.addEventListener('resize', () => setTimeout(() => scrollToIndex(getCenteredIndex()), 120));


// })();

