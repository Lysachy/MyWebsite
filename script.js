document.addEventListener("DOMContentLoaded", () => {
    // ==========================================
    // 1. PRELOADER SYSTEM
    // ==========================================
    const initPreloader = () => {
        const terminal = document.getElementById('terminal');
        const preloader = document.getElementById('preloader');
        const body = document.body;

        if (!preloader || !terminal) return;

        // Kunci scroll saat preloading
        body.style.overflow = 'hidden';

        const verbs = ["Loading", "Injecting", "Parsing", "Compiling", "Hashing", "Bundling", "Optimizing", "Verifying", "Fetching"];
        const nouns = ["module", "chunk", "asset", "script", "style", "node", "token", "byte", "frame"];
        const exts = [".js", ".css", ".json", ".png", ".woff2", ".html", ".map"];

        function getRandomLog() {
            const verb = verbs[Math.floor(Math.random() * verbs.length)];
            const noun = nouns[Math.floor(Math.random() * nouns.length)];
            const ext = exts[Math.floor(Math.random() * exts.length)];
            const id = Math.floor(Math.random() * 9999);
            const time = (Math.random() * 0.05).toFixed(3) + "s";
            return { msg: `${verb} ${noun}_${id}${ext}`, time };
        }

        const runDataRain = async () => {
            for (let i = 0; i < 60; i++) {
                const data = getRandomLog();
                const line = document.createElement('div');
                line.className = 'log-line';

                const isInfo = Math.random() > 0.8;
                const tagClass = isInfo ? "info" : "success";
                const tagName = isInfo ? "info" : "ok";

                line.innerHTML = `
                    <span class="status-tag ${tagClass}">${tagName}</span>
                    <span class="log-message">${data.msg}</span>
                    <span class="log-time">${data.time}</span>
                `;
                terminal.appendChild(line);
                preloader.scrollTop = preloader.scrollHeight;

                await new Promise(r => setTimeout(r, Math.random() * 15 + 5));
            }
        };

        const runFinalSequence = async () => {
            const separator = document.createElement('div');
            separator.style.margin = "20px 0 10px 0";
            separator.style.borderBottom = "1px dashed #ccc";
            terminal.appendChild(separator);

            const line = document.createElement('div');
            line.className = 'log-line';
            line.innerHTML = `
                <span id="gen-tag" class="status-tag process">wait</span>
                <span id="gen-msg" class="log-message" style="font-weight:bold; color:#333;">Initializing System</span>
            `;
            terminal.appendChild(line);
            preloader.scrollTop = preloader.scrollHeight;

            const msgElement = document.getElementById('gen-msg');
            let dots = 0;

            for (let i = 0; i < 5; i++) {
                dots = (dots + 1) % 4;
                msgElement.innerText = "Initializing System" + ".".repeat(dots);
                await new Promise(r => setTimeout(r, 300));
            }

            document.getElementById('gen-tag').className = "status-tag success";
            document.getElementById('gen-tag').innerText = "DONE";
            msgElement.innerText = "System Ready.";
        };

        const startLoad = async () => {
            await runDataRain();
            await runFinalSequence();

            setTimeout(() => {
                preloader.classList.add('slide-up');
                body.style.overflow = ''; // Kembalikan scroll body

                setTimeout(() => preloader.remove(), 800);
            }, 500);
        };

        startLoad();
    };


    // ==========================================
    // 2. CUSTOM CURSOR
    // ==========================================
    const initCursor = () => {
        const cursorDot = document.getElementById("cursor-dot");
        const cursorOutline = document.getElementById("cursor-outline");
        const isTouchDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

        if (!isTouchDevice && cursorDot && cursorOutline) {
            window.addEventListener("mousemove", (e) => {
                const posX = e.clientX;
                const posY = e.clientY;

                cursorDot.style.left = `${posX}px`;
                cursorDot.style.top = `${posY}px`;

                cursorOutline.animate(
                    { left: `${posX}px`, top: `${posY}px` },
                    { duration: 500, fill: "forwards" }
                );
            });

            document.querySelectorAll("a, button, input, .nav-link, .logo, .about-card").forEach((el) => {
                el.addEventListener("mouseenter", () => {
                    cursorOutline.style.transform = "translate(-50%, -50%) scale(1.5)";
                    cursorOutline.style.borderColor = "#C45B3E";
                });
                
                el.addEventListener("mouseleave", () => {
                    cursorOutline.style.transform = "translate(-50%, -50%) scale(1)";
                    cursorOutline.style.borderColor = ""; 
                });
            });

            document.querySelectorAll("[contenteditable]").forEach((el) => {
                el.addEventListener("mouseenter", () => {
                    cursorOutline.style.borderStyle = "dashed";
                });
                el.addEventListener("mouseleave", () => {
                    cursorOutline.style.borderStyle = "solid";
                });
            });
        } else if (cursorDot && cursorOutline) {
            // Sembunyikan jika di mobile
            cursorDot.style.display = 'none';
            cursorOutline.style.display = 'none';
        }
    };


    // ==========================================
    // 3. DARK MODE TOGGLE
    // ==========================================
    const initTheme = () => {
        const logo = document.querySelector('.logo');
        if (!logo) return;

        // Apply saved theme on load
        const savedTheme = window.localStorage ? localStorage.getItem('theme') : null;
        if (savedTheme === 'dark') {
            document.body.classList.add('dark-mode');
        }

        logo.addEventListener('dblclick', (event) => {
            event.preventDefault();
            const isDark = document.body.classList.toggle('dark-mode');

            if (window.localStorage) {
                localStorage.setItem('theme', isDark ? 'dark' : 'light');
            }

            const mainSection = document.getElementById('main');
            if (mainSection) {
                window.scrollTo({
                    top: mainSection.offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    };


    // ==========================================
    // 4. HERO CLOCK
    // ==========================================
    const initClock = () => {
        const clockEl = document.getElementById('clockDisplay');
        if (!clockEl) return;

        const updateClock = () => {
            const now = new Date();
            const h = String(now.getHours()).padStart(2, '0');
            const m = String(now.getMinutes()).padStart(2, '0');
            const s = String(now.getSeconds()).padStart(2, '0');
            clockEl.textContent = `${h}:${m}:${s}`;
        };

        updateClock();
        setInterval(updateClock, 1000);
    };


    // ==========================================
    // 5. SMOOTH SCROLL FOR NAV LINKS
    // ==========================================
    const initSmoothScroll = () => {
        document.querySelectorAll('.nav-link').forEach((link) => {
            link.addEventListener('click', function(event) {
                event.preventDefault();
                const targetId = this.getAttribute('href').substring(1);
                const targetElement = document.getElementById(targetId);
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });
    };


    // ==========================================
    // 6. IMAGE MODAL PREVIEW (LIGHTBOX)
    // ==========================================
    const initModal = () => {
        const modal = document.getElementById('imageModal');
        const modalImg = document.getElementById('modalImage');
        const closeModal = document.getElementById('closeModal');
        const aboutCardsList = document.querySelectorAll('.about-card');

        const hideModal = () => {
            if (modal) {
                modal.classList.remove('active');
                document.body.style.overflow = ''; 
                setTimeout(() => { if (modalImg) modalImg.src = ''; }, 400);
            }
        };

        aboutCardsList.forEach((card) => {
            card.addEventListener('click', function() {
                if (modalImg && modal) {
                    modalImg.src = this.src;
                    modal.classList.add('active');
                    document.body.style.overflow = 'hidden'; 
                }
            });
        });

        if (closeModal) closeModal.addEventListener('click', hideModal);

        window.addEventListener('click', (event) => {
            if (event.target === modal) hideModal();
        });
    };


    // ==========================================
    // 7. INTERSECTION OBSERVERS (Animations)
    // ==========================================
    const initObservers = () => {
        const elementsToObserve = [
            'aboutLabel', 'aboutHeading', 'aboutLine', 'aboutRight', 'aboutCards',
            'showcaseLabel', 'showcaseHeading', 'showcaseLine',
            'galleryLabel', 'galleryHeading', 'galleryLine'
        ].map(id => document.getElementById(id)).filter(el => el !== null);

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.15,
            rootMargin: '0px 0px -60px 0px'
        });

        elementsToObserve.forEach(el => observer.observe(el));
    };


    // ==========================================
    // 8. SCROLL & PARALLAX ENGINE (rAF)
    // ==========================================
    const initScrollEngine = () => {
        const header = document.getElementById('siteHeader');
        const heroLines = document.getElementById('heroLines');
        const heroText = document.getElementById('heroText');
        const orb1 = document.getElementById('orb1');
        const orb2 = document.getElementById('orb2');
        const orb3 = document.getElementById('orb3');
        const orb4 = document.getElementById('orb4');
        const noiseOverlay = document.getElementById('noiseOverlay');
        
        let ticking = false;

        const updateHeader = (scrollY) => {
            if (scrollY > 40) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        };

        const updateParallax = (scrollY) => {
            const heroHeight = window.innerHeight;

            if (scrollY < heroHeight * 1.2 && heroText) {
                const progress = scrollY / heroHeight;

                if(heroLines) heroLines.style.transform = `translate3d(0, ${scrollY * 0.25}px, 0) scale(${1 + progress * 0.03})`;
                if(noiseOverlay) noiseOverlay.style.transform = `translate3d(0, ${scrollY * 0.1}px, 0)`;
                
                heroText.style.transform = `translate3d(0, ${scrollY * 0.5}px, 0)`;
                heroText.style.opacity = Math.max(0, 1 - progress * 1.2);

                if(orb1) orb1.style.transform = `translate3d(${scrollY * -0.08}px, ${scrollY * 0.15}px, 0)`;
                if(orb2) orb2.style.transform = `translate3d(${scrollY * 0.06}px, ${scrollY * 0.1}px, 0)`;
                if(orb3) orb3.style.transform = `translate3d(${scrollY * -0.12}px, ${scrollY * 0.2}px, 0)`;
                if(orb4) orb4.style.transform = `translate3d(${scrollY * 0.1}px, ${scrollY * 0.13}px, 0)`;
            }
        };

        const onScroll = () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    const scrollY = window.scrollY || window.pageYOffset;
                    if (header) updateHeader(scrollY);
                    updateParallax(scrollY);
                    ticking = false;
                });
                ticking = true;
            }
        };

        window.addEventListener('scroll', onScroll, { passive: true });
        
        // Initial trigger
        const initialScrollY = window.scrollY || window.pageYOffset;
        if (header) updateHeader(initialScrollY);
        updateParallax(initialScrollY);
    };

    // ==========================================
    // INITIALIZATION RUNNER
    // ==========================================
    initPreloader();
    initCursor();
    initTheme();
    initClock();
    initSmoothScroll();
    initModal();
    initObservers();
    initScrollEngine();
});