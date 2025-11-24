const totalFrames = 49;   //ajusta la cantidad de frames
const ultimoFrame = 9;
const framePath = i => `video1/ezgif-frame-${String(i).padStart(3, '0')}.jpg`;

// Suavizado 
const smooth = 0.15;

// DOM
const imgEl = document.getElementById('animImage');
const overlay = document.getElementById('overlayText');
const textWrap = document.querySelector('#overlayText .text-wrap');

// Precargar imagenes
const images = new Array(totalFrames);
let loaded = 0;
for (let i = 1; i <= totalFrames; i++) {
    const im = new Image();
    im.src = framePath(i);
    im.onload = () => {
        loaded++;
    };
    images[i - 1] = im;
}

// Estado de frames
let currentFrame = 1;
let targetFrame = 1;
let lastRendered = 0;

// Calcula fracción de scroll dentro de la sección
function getScrollFraction() {
    const section = document.querySelector('.animation-section');
    const top = section.offsetTop;
    const sectionScrollHeight = section.offsetHeight - window.innerHeight;
    const scrollY = window.scrollY || window.pageYOffset;

    if (scrollY <= top) return 0;
    if (scrollY >= top + sectionScrollHeight) return 1;
    return (scrollY - top) / sectionScrollHeight;
}

// Loop principal
function loop() {
    const frac = getScrollFraction();
    // target frame es fracción * (totalFrames - 1) + 1
    const exact = frac * (totalFrames - 1) + 1;
    targetFrame = exact;

    // lerp para suavidad
    currentFrame += (targetFrame - currentFrame) * smooth;

    // redondeado para mostrar imagen
    const frameToShow = Math.max(1, Math.min(totalFrames, Math.round(currentFrame)));

    // Cambiamos la imagen sólo si es diferente para reducir repintados
    if (frameToShow !== lastRendered && images[frameToShow - 1] && images[frameToShow - 1].complete) {
        imgEl.src = images[frameToShow - 1].src;
        lastRendered = frameToShow;
    }

    // CONTROL DE LA ANIMACIÓN DEL TEXTO en los últimos N frames
    const startShowFrame = Math.max(1, totalFrames - ultimoFrame + 1);
    if (frameToShow >= startShowFrame) {
        const progress = (frameToShow - startShowFrame) / (ultimoFrame - 1 || 1);
        showOverlayProgress(progress);
    } else {
        hideOverlay();
    }

    requestAnimationFrame(loop);
}
requestAnimationFrame(loop);

function showOverlayProgress(p) {
    // clamp
    const prog = Math.max(0, Math.min(1, p));

    const eased = easeOutCubic(prog);

    // Opacidad y escala
    textWrap.style.opacity = eased;
    textWrap.style.transform = `translateY(${(1 - eased) * 24}px) scale(${0.92 + eased * 0.08})`;

    // Opcional: jugamos con letter-spacing en la palabra IMAGINE para efecto "urban"
    const imagineEl = document.querySelector('.imagine');
    const byEl = document.querySelector('.by');

    // letter-spacing: start más ancho y se reduce
    const startLS = 12; // px (cuando empieza)
    const endLS = 4;    // px (cuando completo)
    const ls = startLS - (startLS - endLS) * eased;
    imagineEl.style.letterSpacing = `${ls}px`;

    // Un poco de glow hacia el final
    if (eased > 0.6) {
        imagineEl.classList.add('glow');
    } else {
        imagineEl.classList.remove('glow');
    }

    // Opcional: ajustar opacidad del by para que aparezca ligeramente después
    byEl.style.opacity = Math.max(0, (eased - 0.25) / 0.75).toString();
}

// Ocultar overlay
function hideOverlay() {
    textWrap.style.opacity = 0;
    textWrap.style.transform = `translateY(24px) scale(0.92)`;
    const imagineEl = document.querySelector('.imagine');
    imagineEl.style.letterSpacing = '';
    imagineEl.classList.remove('glow');
    const byEl = document.querySelector('.by');
    byEl.style.opacity = 0;
}

function easeOutCubic(t) {
    return 1 - Math.pow(1 - t, 3);
}
