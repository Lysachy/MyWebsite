(function () {
    /* ── HEADER SCROLL STATE ── */
    var header = document.getElementById('siteHeader');

    function updateHeader() {
        var scrollY = window.scrollY || window.pageYOffset;
        if (scrollY > 40) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }

    /* ── PARALLAX ENGINE ── */
    var heroLines = document.getElementById('heroLines');
    var heroText = document.getElementById('heroText');
    var orb1 = document.getElementById('orb1');
    var orb2 = document.getElementById('orb2');
    var orb3 = document.getElementById('orb3');
    var orb4 = document.getElementById('orb4');
    var noiseOverlay = document.getElementById('noiseOverlay');

    function updateParallax() {
        var scrollY = window.scrollY || window.pageYOffset;
        var heroHeight = window.innerHeight;

        if (scrollY < heroHeight * 1.2) {
            var progress = scrollY / heroHeight;

            /* Background lines move slower — creates depth */
            heroLines.style.transform = 'translate3d(0,' + (scrollY * 0.25) + 'px, 0) scale(' + (1 + progress * 0.03) + ')';

            /* Noise overlay drifts at its own slow rate */
            noiseOverlay.style.transform = 'translate3d(0,' + (scrollY * 0.1) + 'px, 0)';

            /* Text layer moves faster — floats above */
            heroText.style.transform = 'translate3d(0,' + (scrollY * 0.5) + 'px, 0)';
            heroText.style.opacity = Math.max(0, 1 - progress * 1.2);

            /* Orbs drift at different rates for layered feel */
            orb1.style.transform = 'translate3d(' + (scrollY * -0.08) + 'px,' + (scrollY * 0.15) + 'px, 0)';
            orb2.style.transform = 'translate3d(' + (scrollY * 0.06) + 'px,' + (scrollY * 0.1) + 'px, 0)';
            orb3.style.transform = 'translate3d(' + (scrollY * -0.12) + 'px,' + (scrollY * 0.2) + 'px, 0)';
            orb4.style.transform = 'translate3d(' + (scrollY * 0.1) + 'px,' + (scrollY * 0.13) + 'px, 0)';
        }
    }

    /* ── INTERSECTION OBSERVER FOR ABOUT ── */
    var aboutElements = [
        document.getElementById('aboutLabel'),
        document.getElementById('aboutHeading'),
        document.getElementById('aboutLine'),
        document.getElementById('aboutRight'),
        document.getElementById('showcaseLabel'),
        document.getElementById('showcaseHeading'),
        document.getElementById('showcaseLine')
    ];

    var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -60px 0px'
    });

    aboutElements.forEach(function (element) {
        if (element) observer.observe(element);
    });

    /* ── SMOOTH SCROLL FOR NAV LINKS ── */
    document.querySelectorAll('.nav-link, .logo').forEach(function (link) {
        link.addEventListener('click', function (event) {
            event.preventDefault();
            var targetId = this.getAttribute('href').substring(1);
            var targetElement = document.getElementById(targetId);
            if (targetElement) {
                var offsetTop = targetElement.offsetTop;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    /* ── RAF SCROLL HANDLER ── */
    var ticking = false;

    function onScroll() {
        if (!ticking) {
            window.requestAnimationFrame(function () {
                updateHeader();
                updateParallax();
                ticking = false;
            });
            ticking = true;
        }
    }

    window.addEventListener('scroll', onScroll, { passive: true });

    /* Initial calls */
    updateHeader();
    updateParallax();
})();
