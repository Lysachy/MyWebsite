const cursorDot = document.getElementById("cursor-dot");
const cursorOutline = document.getElementById("cursor-outline");

// Deteksi jika device touch screen (opsional, agar tidak bug di HP)
const isTouchDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

if (!isTouchDevice && cursorDot && cursorOutline) {
    // 1. Ikuti posisi mouse
    window.addEventListener("mousemove", (e) => {
      const posX = e.clientX;
      const posY = e.clientY;

      // Dot langsung ikut posisi mouse
      cursorDot.style.left = `${posX}px`;
      cursorDot.style.top = `${posY}px`;

      // Outline mengikuti dengan animasi halus (delay)
      cursorOutline.animate(
        { left: `${posX}px`, top: `${posY}px` },
        { duration: 500, fill: "forwards" }
      );
    });

    // 2. Efek hover: membesar & berubah warna saat di atas elemen interaktif
    // Menambahkan .nav-link, .logo, .about-card ke dalam daftar selector interaktif
    document.querySelectorAll("a, button, input, .nav-link, .logo, .about-card").forEach((el) => {
      el.addEventListener("mouseenter", () => {
        cursorOutline.style.transform = "translate(-50%, -50%) scale(1.5)";
        cursorOutline.style.borderColor = "#C45B3E";
      });
      
      el.addEventListener("mouseleave", () => {
        cursorOutline.style.transform = "translate(-50%, -50%) scale(1)";
        // Kosongkan borderColor agar kembali mengikuti aturan CSS (berguna untuk dark mode)
        cursorOutline.style.borderColor = ""; 
      });
    });

    // 3. Efek dashed border saat hover elemen contenteditable
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