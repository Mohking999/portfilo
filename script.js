document.addEventListener('DOMContentLoaded', () => {
    // Intersection Observer for scroll animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show-element');
                // Optional: stop observing once animated in
                // observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Select all elements with hidden-element class
    const hiddenElements = document.querySelectorAll('.hidden-element');
    hiddenElements.forEach(el => observer.observe(el));

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Optional: Add simple parallax effect to blobs on scroll
    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;
        const blob1 = document.querySelector('.blob-1');
        const blob2 = document.querySelector('.blob-2');
        
        if (blob1 && blob2) {
            blob1.style.transform = `translate(0, ${scrolled * 0.1}px) scale(1.1)`;
            blob2.style.transform = `translate(0, ${scrolled * -0.1}px) scale(1)`;
        }
    });

    // Language Switcher Logic
    const langSelect = document.getElementById('lang-select');
    
    function setLanguage(lang) {
        if (typeof translations === 'undefined' || !translations[lang]) return;
        
        // Apply translations
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (translations[lang][key]) {
                el.innerHTML = translations[lang][key];
            }
        });
        
        // Handle RTL
        if (lang === 'ar') {
            document.documentElement.setAttribute('dir', 'rtl');
        } else {
            document.documentElement.removeAttribute('dir');
        }
        
        // Save preference
        localStorage.setItem('preferredLang', lang);
    }
    
    if (langSelect) {
        langSelect.addEventListener('change', (e) => {
            setLanguage(e.target.value);
        });
        
        // Load saved language or default to en
        const savedLang = localStorage.getItem('preferredLang') || 'en';
        langSelect.value = savedLang;
        setLanguage(savedLang);
    }

    // Theme Toggle Logic
    const themeToggleBtn = document.getElementById('theme-toggle');
    if (themeToggleBtn) {
        const themeIcon = themeToggleBtn.querySelector('i');
        
        function setTheme(theme) {
            document.documentElement.setAttribute('data-theme', theme);
            if (theme === 'light') {
                themeIcon.classList.remove('fa-sun');
                themeIcon.classList.add('fa-moon');
            } else {
                themeIcon.classList.remove('fa-moon');
                themeIcon.classList.add('fa-sun');
            }
            localStorage.setItem('preferredTheme', theme);
        }
        
        themeToggleBtn.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
            const newTheme = currentTheme === 'light' ? 'dark' : 'light';
            setTheme(newTheme);
        });
        
        // Load saved theme or default to dark
        const savedTheme = localStorage.getItem('preferredTheme') || 'dark';
        setTheme(savedTheme);
    }
});
