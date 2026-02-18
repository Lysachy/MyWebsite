document.addEventListener("DOMContentLoaded", () => {
    // ==========================================
    // 0. SCROLL RESTORATION (FORCE TO TOP ON RELOAD)
    // ==========================================
    if ('scrollRestoration' in history) {
        history.scrollRestoration = 'manual'; // Mencegah browser mengingat posisi scroll
    }
    window.scrollTo(0, 0); // Memaksa scroll kembali ke paling atas

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
    // 6. IMAGE MODAL PREVIEW & CARD SHUFFLE
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
                
                // 1. Cek apakah kartu yang ditekan adalah kartu terdepan (card-1)
                if (this.classList.contains('card-1')) {
                    // Buka preview gambar seperti biasa
                    if (modalImg && modal) {
                        modalImg.src = this.src;
                        modal.classList.add('active');
                        document.body.style.overflow = 'hidden'; 
                    }
                } else {
                    // 2. Jika kartu ke-2 atau ke-3 yang ditekan, tukar posisinya!
                    const currentCard1 = document.querySelector('.about-card.card-1');
                    const currentCard2 = document.querySelector('.about-card.card-2');
                    const currentCard3 = document.querySelector('.about-card.card-3');

                    if (this.classList.contains('card-2')) {
                        // Tukar posisi kartu 1 dan 2
                        currentCard1.classList.remove('card-1');
                        currentCard1.classList.add('card-2');
                        
                        this.classList.remove('card-2');
                        this.classList.add('card-1');
                        
                    } else if (this.classList.contains('card-3')) {
                        // Geser memutar: 3 naik ke 1, 1 turun ke 2, 2 turun ke 3
                        currentCard1.classList.remove('card-1');
                        currentCard1.classList.add('card-2');
                        
                        currentCard2.classList.remove('card-2');
                        currentCard2.classList.add('card-3');
                        
                        this.classList.remove('card-3');
                        this.classList.add('card-1');
                    }
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
            'galleryLabel', 'galleryHeading', 'galleryLine',
            'connectLabel'
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
            // Di dalam fungsi updateParallax pada initScrollEngine:
            const heroCanvas = document.getElementById('hero-3d-canvas');

            if (scrollY < heroHeight * 1.2 && heroText) {
                const progress = scrollY / heroHeight;

                if(heroLines) heroLines.style.transform = `translate3d(0, ${scrollY * 0.25}px, 0) scale(${1 + progress * 0.03})`;
                if(noiseOverlay) noiseOverlay.style.transform = `translate3d(0, ${scrollY * 0.1}px, 0)`;
                if(heroCanvas) heroCanvas.style.transform = `translate3d(0, ${scrollY * 0.35}px, 0)`;
                
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
    // 9. ASCII GLITCH HOVER EFFECT (BINARY)
    // ==========================================
    const initAsciiGlitch = () => {
        const WAVE_THRESH = 3;
        const CHAR_MULT = 3;
        const ANIM_STEP = 100; // 1. Diperlambat (sebelumnya 40)
        const WAVE_BUF = 5;

        const createASCIIShift = (el, opts = {}) => {
            let origTxt = el.textContent;
            let origChars = origTxt.split("");
            let isAnim = false;
            let cursorPos = 0;
            let waves = [];
            let animId = null;
            let isHover = false;
            let origW = null;

            const cfg = {
                dur: 600,
                // 2. Menggunakan deretan biner acak
                chars: '01101001011100101000101101001101', 
                preserveSpaces: true,
                spread: 0.3,
                ...opts
            };

            const updateCursorPos = (e) => {
                const rect = el.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const len = origTxt.length;
                const pos = Math.round((x / rect.width) * len);
                cursorPos = Math.max(0, Math.min(pos, len - 1));
            };

            const startWave = () => {
                waves.push({
                    startPos: cursorPos,
                    startTime: Date.now(),
                    id: Math.random()
                });
                if (!isAnim) start();
            };

            const cleanupWaves = (t) => {
                waves = waves.filter((w) => t - w.startTime < cfg.dur);
            };

            const calcWaveEffect = (charIdx, t) => {
                let shouldAnim = false;
                let resultChar = origChars[charIdx];

                for (const w of waves) {
                    const age = t - w.startTime;
                    const prog = Math.min(age / cfg.dur, 1);
                    const dist = Math.abs(charIdx - w.startPos);
                    const maxDist = Math.max(w.startPos, origChars.length - w.startPos - 1);
                    const rad = (prog * (maxDist + WAVE_BUF)) / cfg.spread;

                    if (dist <= rad) {
                        shouldAnim = true;
                        const intens = Math.max(0, rad - dist);

                        if (intens <= WAVE_THRESH && intens > 0) {
                            const charIdx = (dist * CHAR_MULT + Math.floor(age / ANIM_STEP)) % cfg.chars.length;
                            resultChar = cfg.chars[charIdx];
                        }
                    }
                }
                return { shouldAnim, char: resultChar };
            };

            const genScrambledTxt = (t) =>
                origChars.map((char, i) => {
                    if (cfg.preserveSpaces && char === " ") return " ";
                    const res = calcWaveEffect(i, t);
                    return res.shouldAnim ? res.char : char;
                }).join("");

            const stop = () => {
                el.textContent = origTxt;
                el.classList.remove("as");
                if (origW !== null) {
                    el.style.width = "";
                    origW = null;
                }
                isAnim = false;
            };

            const start = () => {
                if (isAnim) return;

                if (origW === null) {
                    origW = el.getBoundingClientRect().width;
                    el.style.width = `${origW}px`;
                }

                isAnim = true;
                el.classList.add("as");

                const animate = () => {
                    const t = Date.now();
                    cleanupWaves(t);

                    if (waves.length === 0) {
                        stop();
                        return;
                    }

                    el.textContent = genScrambledTxt(t);
                    animId = requestAnimationFrame(animate);
                };
                animId = requestAnimationFrame(animate);
            };

            const handleEnter = (e) => {
                isHover = true;
                updateCursorPos(e);
                startWave();
            };

            const handleMove = (e) => {
                if (!isHover) return;
                const old = cursorPos;
                updateCursorPos(e);
                if (cursorPos !== old) startWave();
            };

            const handleLeave = () => {
                isHover = false;
            };

            const init = () => {
                el.addEventListener("mouseenter", handleEnter);
                el.addEventListener("mousemove", handleMove);
                el.addEventListener("mouseleave", handleLeave);
            };

            init();
        };

        // 3. Ubah target dari .about-text menjadi .about-label
        const labelBlocks = document.querySelectorAll(".about-label");
        labelBlocks.forEach((block) => {
            if (!block.textContent.trim()) return;
            // 4. Durasi diperlambat menjadi 2500ms
            createASCIIShift(block, { dur: 2500, spread: 1 });
        });
    };

    // ==========================================
    // 10. ASCII TEXT REVEAL ON SCROLL
    // ==========================================
    const initAsciiReveal = () => {
        const WAVE_THRESH = 3;
        const CHAR_MULT = 3;
        const ANIM_STEP = 60; // Kecepatan acak biner (semakin besar semakin lambat)
        const WAVE_BUF = 5;

        const createRevealEffect = (el, opts = {}) => {
            let origTxt = el.textContent;
            let origChars = origTxt.split("");
            let isAnim = false;
            let waves = [];
            let animId = null;
            let origW = null;
            let origH = null;

            const cfg = {
                dur: 5000, // Lama proses dekripsi
                chars: '01101001011100101000101101001101', 
                preserveSpaces: true,
                spread: 1.5, // Spread diperbesar agar merambat mulus ke seluruh paragraf
                ...opts
            };

            const startWave = (pos) => {
                waves.push({
                    startPos: pos,
                    startTime: Date.now(),
                    id: Math.random()
                });
                if (!isAnim) start();
            };

            const cleanupWaves = (t) => {
                waves = waves.filter((w) => t - w.startTime < cfg.dur);
            };

            const calcWaveEffect = (charIdx, t) => {
                let shouldAnim = false;
                let resultChar = origChars[charIdx];

                for (const w of waves) {
                    const age = t - w.startTime;
                    const prog = Math.min(age / cfg.dur, 1);
                    const dist = Math.abs(charIdx - w.startPos);
                    const maxDist = Math.max(w.startPos, origChars.length - w.startPos - 1);
                    const rad = (prog * (maxDist + WAVE_BUF)) / cfg.spread;

                    if (dist <= rad) {
                        shouldAnim = true;
                        const intens = Math.max(0, rad - dist);

                        if (intens <= WAVE_THRESH && intens > 0) {
                            const charIdx = (dist * CHAR_MULT + Math.floor(age / ANIM_STEP)) % cfg.chars.length;
                            resultChar = cfg.chars[charIdx];
                        }
                    }
                }
                return { shouldAnim, char: resultChar };
            };

            const genScrambledTxt = (t) =>
                origChars.map((char, i) => {
                    if (cfg.preserveSpaces && char === " ") return " ";
                    const res = calcWaveEffect(i, t);
                    return res.shouldAnim ? res.char : char;
                }).join("");

            const stop = () => {
                el.textContent = origTxt;
                // Kembalikan styling normal setelah animasi selesai
                if (origW !== null) el.style.width = "";
                if (origH !== null) el.style.height = "";
                isAnim = false;
            };

            const start = () => {
                if (isAnim) return;

                // Kunci dimensi kotak teks agar layout tidak loncat-loncat saat teks diacak
                const rect = el.getBoundingClientRect();
                origW = rect.width;
                origH = rect.height;
                el.style.width = `${origW}px`;
                el.style.height = `${origH}px`;

                isAnim = true;

                const animate = () => {
                    const t = Date.now();
                    cleanupWaves(t);

                    if (waves.length === 0) {
                        stop();
                        return;
                    }

                    el.textContent = genScrambledTxt(t);
                    animId = requestAnimationFrame(animate);
                };
                animId = requestAnimationFrame(animate);
            };

            return {
                reveal: () => {
                    // Memicu dua gelombang: dari karakter pertama (index 0) 
                    // dan dari karakter terakhir agar menyatu di tengah
                    startWave(0);
                    setTimeout(() => startWave(origChars.length - 1), 300);
                }
            };
        };

        const textBlocks = document.querySelectorAll(".about-text");
        
        // Buat observer baru khusus untuk nge-trigger animasi ini
        const observer = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const revealer = createRevealEffect(entry.target, { dur: 2200, spread: 1.5 });
                    
                    // Delay 200ms agar pas dengan animasi fade-in transform dari CSS kamu
                    setTimeout(() => {
                        revealer.reveal();
                    }, 200); 
                    
                    // Unobserve agar efek ini hanya jalan SATU KALI saat pertama di-scroll
                    obs.unobserve(entry.target);
                }
            });
        }, { 
            threshold: 0.15,
            rootMargin: '0px 0px -50px 0px' // Trigger saat elemen sedikit naik ke tengah layar
        });

        setTimeout(() => {
            textBlocks.forEach(block => observer.observe(block));
        }, 2000); 
    };

    // ==========================================
    // 11. MAGNETIC BUTTON EFFECT
    // ==========================================
    const initMagnetic = () => {
        const magneticElements = document.querySelectorAll('.magnetic');

        magneticElements.forEach(el => {
            el.addEventListener('mousemove', (e) => {
                const rect = el.getBoundingClientRect();
                const centerX = rect.left + rect.width / 2;
                const centerY = rect.top + rect.height / 2;
                const dist = 0.3; // Kekuatan magnet (saya atur 0.3 agar smooth & tidak terlalu liar)

                const moveX = (e.clientX - centerX) * dist;
                const moveY = (e.clientY - centerY) * dist;

                // Menggeser tombol mengikuti kursor
                el.style.transform = `translate(${moveX}px, ${moveY}px)`;
            });

            el.addEventListener('mouseleave', () => {
                // Mengembalikan tombol ke posisi semula saat kursor pergi
                el.style.transform = 'translate(0, 0)';
                el.style.transition = 'transform 0.3s ease'; // Efek smooth saat kembali
            });
            
            // Menghapus transition saat digerakkan agar tidak delay/lag
            el.addEventListener('mouseenter', () => {
                el.style.transition = 'none';
            });
        });
    };

    // ==========================================
    // 12. THREE.JS 3D MODEL INTEGRATION
    // ==========================================
    const initThreeJS = () => {
        const canvasContainer = document.getElementById('hero-3d-canvas');
        if (!canvasContainer || typeof THREE === 'undefined') return;

        // 1. Setup Scene, Camera, Renderer
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.z = 5; // Jauh-dekatnya kamera

        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        canvasContainer.appendChild(renderer.domElement);

        // 2. Setup Pencahayaan (Lighting)
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
        scene.add(ambientLight);
        
        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
        directionalLight.position.set(2, 2, 5);
        scene.add(directionalLight);

        // 3. Setup Variabel Rotasi
        let model = null;
        let targetRotationY = 0;
        let targetRotationX = 0;

        let baseY = -1.2;

        // 4. Load File .glb
        const loader = new THREE.GLTFLoader();
        
        // GANTI URL INI DENGAN PATH FILE .GLB MILIKMU (misal: 'assets/models/shape.glb')
        // const glbUrl = 'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/DamagedHelmet/glTF-Binary/DamagedHelmet.glb';
        const glbUrl = 'cute_cat_with_strawberries.glb';
        
        loader.load(glbUrl, (gltf) => {
            model = gltf.scene;
            
            // Atur skala dan posisi awal model
            model.scale.set(0.4, 0.4, 0.4); 
            // UBAH BAGIAN INI:
            model.position.y = baseY; 
            
            scene.add(model); 
            
            scene.add(model);
        }, undefined, (error) => {
            console.error('Terjadi kesalahan saat memuat model 3D:', error);
        });

        // 5. Animation Loop
        const clock = new THREE.Clock();
        const animate = () => {
            requestAnimationFrame(animate);
            
            if (model) {
                // Interpolasi halus (lerp) menuju target rotasi dari scroll
                model.rotation.y += (targetRotationY - model.rotation.y) * 0.05;
                model.rotation.x += (targetRotationX - model.rotation.x) * 0.05;
                
                // Efek mengambang (floating) idle
                const time = clock.getElapsedTime();
                model.position.y = baseY + Math.sin(time * 1.5) * 0.1;
            }

            renderer.render(scene, camera);
        };
        animate();

        // 6. Hubungkan scroll dengan target rotasi
        window.addEventListener('scroll', () => {
            const scrollY = window.scrollY;
            targetRotationY = scrollY * 0.003; // Kecepatan putar sumbu Y
            targetRotationX = scrollY * 0.001; // Kecepatan putar sumbu X
        });

        // 7. Handle Resize Window
        window.addEventListener('resize', () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        });
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
    initAsciiGlitch();
    initAsciiReveal();
    initMagnetic();
    initThreeJS();
    
});