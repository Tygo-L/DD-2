document.addEventListener('DOMContentLoaded', () => {
    const btn = document.getElementById('navToggle');
    const menu = document.getElementById('navDropdown');
    const NavArrow = document.getElementById("dropArrow");
    if (!btn || !menu) return;

    const navItems = menu.querySelectorAll('.nav-item');

    function smoothScrollTo(target, duration = 2000) {
        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset;
        const startPosition = window.pageYOffset;
        const distance = targetPosition - startPosition;
        let startTime = null;

        function animation(currentTime) {
            if (startTime === null) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const run = ease(timeElapsed, startPosition, distance, duration);
            window.scrollTo(0, run);
            if (timeElapsed < duration) requestAnimationFrame(animation);
        }

        function ease(t, b, c, d) {
            t /= d / 2;
            if (t < 1) return c / 2 * t * t + b;
            t--;
            return -c / 2 * (t * (t - 2) - 1) + b;
        }

        requestAnimationFrame(animation);
    }

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');

            if (targetId === '#top') {
                smoothScrollTo(document.body, 2000);
            } else {
                const target = document.querySelector(targetId);
                if (target) {
                    smoothScrollTo(target, 2000);
                }
            }
        });
    });

    const sections = document.querySelectorAll('.contentSection, .recentCase, .feature-card, .news-card');

    const observerOptions = {
        threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5],
        rootMargin: '0px 0px -50px 0px'
    };

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && entry.intersectionRatio >= 0.2) {
                entry.target.classList.add('section-highlight');
            } else if (entry.intersectionRatio < 0.1) {
                entry.target.classList.remove('section-highlight');
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        sectionObserver.observe(section);
    });

    btn.addEventListener('click', e => {
        const open = btn.getAttribute('aria-expanded') === 'true';
        btn.setAttribute('aria-expanded', String(!open));

        NavArrow.style.transform = open ? "rotate(0deg)" : "rotate(90deg)";

        if (!open) {
            navItems.forEach((item, index) => {
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'translateX(0)';
                }, index * 100);
            });
        } else {
            navItems.forEach((item, index) => {
                setTimeout(() => {
                    item.style.opacity = '0';
                    item.style.transform = 'translateX(20px)';
                }, index * 50);
            });
        }
    });

    document.addEventListener('click', e => {
        if (!btn.contains(e.target) && !menu.contains(e.target)) {
            navItems.forEach(item => {
                item.style.opacity = '0';
                item.style.transform = 'translateX(20px)';
            });
            btn.setAttribute('aria-expanded', 'false');
            NavArrow.style.transform = "rotate(0deg)";
        }
    });
});
