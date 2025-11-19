document.addEventListener('DOMContentLoaded', () => {
    const btn = document.getElementById('navToggle');
    const menu = document.getElementById('navDropdown');
    const NavArrow = document.getElementById("dropArrow");
    if (!btn || !menu) return;
    
    const navItems = menu.querySelectorAll('.nav-item');
    
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