// Enregistrement des plugins GSAP nécessaires
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const container = document.querySelector('#scroll-container');

// Respecte la préférence système « animations réduites » (accessibilité).
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
// Durées de défilement programmé (0 = saut instantané si les animations sont réduites).
const SCROLL_DUR = prefersReducedMotion ? 0 : 0.7;   // navigation entre sections
const SLIDER_DUR = prefersReducedMotion ? 0 : 0.4;   // flèches du slider projets

// ---- Animations Parallaxe ----
const parallaxEls = document.querySelectorAll('[data-parallax]');
if (!prefersReducedMotion) parallaxEls.forEach(el => {
    const speed = parseFloat(el.dataset.speed) || 0;
    gsap.to(el, {
        yPercent: speed,
        ease: 'none',
        scrollTrigger: {
            trigger: el,
            scroller: container,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true
        }
    });
});

// ---- Animations d'apparition des éléments (Fade in + Slide up) ----
const sections = gsap.utils.toArray('section');
if (!prefersReducedMotion) sections.forEach(sec => {
    const allElems = sec.querySelectorAll('h1, h2, h3, p, form, .project-card, #hero a, ul > li, article');

    // FIX ABSOLU : On filtre pour ne pas animer les éléments ENFANTS déjà inclus dans une carte ou un article
    const elems = Array.from(allElems).filter(el => {
        if (el.classList.contains('project-card') || el.tagName.toLowerCase() === 'article') {
            return true; // On garde la carte globale
        }
        if (el.closest('.project-card') || el.closest('article')) {
            return false; // On ignore le texte à l'intérieur pour éviter le bug d'opacité
        }
        return true;
    });

    gsap.from(elems, {
        opacity: 0,
        y: 40,
        stagger: 0.08,
        duration: 0.7,
        ease: 'power2.out',
        scrollTrigger: {
            trigger: sec,
            scroller: container,
            start: 'top 85%'
        }
    });
});

// ---- Dictionnaires de Traductions (i18n) ----
// Les dictionnaires sont chargés depuis ./lang/<code>.js et s'enregistrent sur
// window.translations. Pour ajouter une langue : créer ./lang/<code>.js puis
// ajouter <script src="./lang/<code>.js" defer></script> dans index.html,
// AVANT script.js. Aucune autre modification n'est nécessaire dans ce fichier.
const translations = window.translations || {};

// ---- Gestion de la Langue ----
// L'ordre de bascule suit l'ordre de chargement des fichiers ./lang/<code>.js.
const availableLangs = Object.keys(translations);
const DEFAULT_LANG = availableLangs.includes('fr') ? 'fr' : (availableLangs[0] || 'fr');

const browserLang = (navigator.language || navigator.userLanguage || '').slice(0, 2).toLowerCase();
let currentLang = availableLangs.includes(browserLang) ? browserLang : DEFAULT_LANG;

// Durée du fondu au changement de langue (ms).
// ⚠️ À garder synchronisée avec --lang-fade dans style.css.
const LANG_FADE_MS = 450;

const target = document.getElementById("typewriter");
const langBtn = document.getElementById('langBtn');
let typingTimeout;

// Langue suivante dans le cycle (sert au libellé du bouton ET à la bascule).
function getNextLang() {
    if (availableLangs.length < 2) return currentLang;
    const i = availableLangs.indexOf(currentLang);
    return availableLangs[(i + 1) % availableLangs.length];
}

// ---- Effet machine à écrire ----
const TYPE_BASE_MS = 70;     // cadence de frappe de base
const TYPE_JITTER_MS = 55;   // variation aléatoire pour un rythme « humain »
const TYPE_PAUSE_MS = 260;   // pause après ponctuation et avant le prénom

// Construit le caret (barre clignotante). Fixe pendant la frappe, clignotant une fois fini.
function caret(blinking) {
    return '<span class="type-caret' + (blinking ? ' cursor-blink' : '') + '">|</span>';
}

// Rend le hero : début en texte normal, prénom en doré, caret à la fin.
function renderHero(typedText, typedName, blinking) {
    const namePart = typedName
        ? '<span class="text-[color:var(--accent)]">' + typedName + '</span>'
        : '';
    target.innerHTML = typedText + namePart + caret(blinking);
}

function typeWriter(text, name) {
    clearTimeout(typingTimeout);

    // Accessibilité : pas d'animation si l'utilisateur préfère réduire les mouvements.
    if (prefersReducedMotion) {
        renderHero(text, name, true);
        return;
    }

    const full = text + name; // on tape le texte puis le prénom, sans interruption
    let i = 0;

    function step() {
        const shownText = full.slice(0, Math.min(i, text.length));
        const shownName = i > text.length ? full.slice(text.length, i) : '';

        if (i >= full.length) {
            renderHero(text, name, true); // terminé : caret clignotant
            return;
        }

        renderHero(shownText, shownName, false); // en cours : caret fixe

        // Délai jusqu'au caractère suivant, avec variation + petites pauses.
        let delay = TYPE_BASE_MS + Math.random() * TYPE_JITTER_MS;
        const lastChar = full[i - 1];
        if (lastChar && '!?.,'.indexOf(lastChar) !== -1) delay += TYPE_PAUSE_MS; // après ponctuation
        if (i === text.length) delay += TYPE_PAUSE_MS; // respiration juste avant le prénom

        i++;
        typingTimeout = setTimeout(step, delay);
    }

    step();
}

function updateTexts() {
    document.documentElement.lang = currentLang;
    langBtn.innerHTML = getNextLang().toUpperCase();

    const dict = translations[currentLang];
    if (!dict) return; // dictionnaire non chargé : on laisse le HTML par défaut

    const metaDescription = document.querySelector('meta[name="description"]');
    const metaKeywords = document.querySelector('meta[name="keywords"]');

    if (metaDescription && dict.metaDesc) {
        metaDescription.setAttribute('content', dict.metaDesc);
    }
    if (metaKeywords && dict.metaKeywords) {
        metaKeywords.setAttribute('content', dict.metaKeywords);
    }

    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (dict[key]) {
            el.innerHTML = dict[key];
        }
    });
}

let langSwitching = false;

function switchLang() {
    if (langSwitching) return; // évite les double-clics pendant le fondu
    if (availableLangs.length < 2) return; // une seule langue : rien à basculer
    langSwitching = true;

    currentLang = getNextLang();

    // Animations réduites : on bascule le texte instantanément, sans fondu.
    if (prefersReducedMotion) {
        updateTexts();
        typeWriter(translations[currentLang].heroText, translations[currentLang].heroName);
        langSwitching = false;
        return;
    }

    container.classList.add('lang-fade');

    setTimeout(() => {
        updateTexts();
        typeWriter(translations[currentLang].heroText, translations[currentLang].heroName);

        requestAnimationFrame(() => {
            container.classList.remove('lang-fade');
            setTimeout(() => { langSwitching = false; }, LANG_FADE_MS);
        });
    }, LANG_FADE_MS);
}

updateTexts();
if (translations[currentLang]) {
    typeWriter(translations[currentLang].heroText, translations[currentLang].heroName);
}
langBtn.addEventListener('click', switchLang);


// ---- Navigation latérale (Scroll & Clic) ----
const navItems = document.querySelectorAll('.nav-item');
const dots = document.querySelectorAll('.menu-dot');

container.addEventListener('scroll', () => {
    const top = container.scrollTop + (window.innerHeight / 2);
    const sects = Array.from(document.querySelectorAll('section'));
    let idx = 0;
    for (let i = 0; i < sects.length; i++) {
        if (top >= sects[i].offsetTop) idx = i;
    }
    dots.forEach(d => d.classList.remove('active'));
    if (dots[idx]) dots[idx].classList.add('active');
});

navItems.forEach((item, i) => {
    item.addEventListener('click', e => {
        e.preventDefault();
        const sect = document.querySelectorAll('section')[i];
        if (sect) {
            gsap.to(container, { scrollTo: { y: sect.offsetTop }, duration: SCROLL_DUR, ease: 'power2.out' });
        }
    });
});


// ---- Défilement fluide pour les ancres internes (chevron du hero, CTA, etc.) ----
// On exclut .nav-item (qui a déjà son propre handler) et on ignore les liens externes.
function smoothScrollToSection(id) {
    const sect = document.getElementById(id);
    if (sect) {
        gsap.to(container, { scrollTo: { y: sect.offsetTop }, duration: SCROLL_DUR, ease: 'power2.out' });
    }
}

document.querySelectorAll('a[href^="#"]:not(.nav-item)').forEach(link => {
    link.addEventListener('click', e => {
        const id = link.getAttribute('href').slice(1);
        if (document.getElementById(id)) {
            e.preventDefault();
            smoothScrollToSection(id);
        }
    });
});


// ---- Interaction Slider Projets (Boutons Flèches Gauche & Droite + Masquage dynamique) ----
const projectsSlider = document.getElementById('projects-slider');
const prevProjectBtn = document.getElementById('prevProjectBtn');
const nextProjectBtn = document.getElementById('nextProjectBtn');

if (projectsSlider && nextProjectBtn && prevProjectBtn) {

    const getScrollAmount = () => {
        const firstCard = projectsSlider.querySelector('.project-card');
        return firstCard ? firstCard.offsetWidth + 24 : 300;
    };

    nextProjectBtn.addEventListener('click', () => {
        gsap.to(projectsSlider, { scrollLeft: `+=${getScrollAmount()}`, duration: SLIDER_DUR, ease: 'power2.out' });
    });

    prevProjectBtn.addEventListener('click', () => {
        gsap.to(projectsSlider, { scrollLeft: `-=${getScrollAmount()}`, duration: SLIDER_DUR, ease: 'power2.out' });
    });

    // Largeur du fondu appliqué sur un bord quand du contenu déborde de ce côté (px).
    const EDGE_FADE = 72;

    function updateArrows() {
        const scrollLeft = projectsSlider.scrollLeft;
        const maxScroll = projectsSlider.scrollWidth - projectsSlider.clientWidth;

        if (scrollLeft <= 8) {
            prevProjectBtn.classList.add('pointer-events-none', '!opacity-0');
        } else {
            prevProjectBtn.classList.remove('pointer-events-none', '!opacity-0');
        }

        if (scrollLeft >= maxScroll - 8) {
            nextProjectBtn.classList.add('pointer-events-none', '!opacity-0');
        } else {
            nextProjectBtn.classList.remove('pointer-events-none', '!opacity-0');
        }

        // Fondu de bord : on n'estompe un côté que s'il reste du contenu à atteindre
        // de ce côté. Au départ → seulement à droite ; au milieu → des deux côtés ;
        // tout à droite → seulement à gauche.
        const hasOverflow = maxScroll > 8;
        const fadeLeft = (hasOverflow && scrollLeft > 8) ? EDGE_FADE : 0;
        const fadeRight = (hasOverflow && scrollLeft < maxScroll - 8) ? EDGE_FADE : 0;
        projectsSlider.style.setProperty('--fade-l', fadeLeft + 'px');
        projectsSlider.style.setProperty('--fade-r', fadeRight + 'px');
    }

    projectsSlider.addEventListener('scroll', updateArrows);
    window.addEventListener('resize', updateArrows);

    setTimeout(updateArrows, 150);
}


// ---- Mobile : la carte la plus proche du centre du slider est en "focus" ----
const mobileFocusQuery = window.matchMedia('(max-width: 768px)');

if (projectsSlider) {
    const projectCards = Array.from(projectsSlider.querySelectorAll('.project-card'));
    let currentFocused = null;   // mémorise la carte active pour éviter les bascules inutiles
    let settleTimer = null;      // debounce : on attend que le scroll se stabilise

    function computeBestCard() {
        const sliderRect = projectsSlider.getBoundingClientRect();
        const sliderCenter = sliderRect.left + sliderRect.width / 2;

        let best = null;
        let bestDist = Infinity;
        projectCards.forEach(card => {
            const r = card.getBoundingClientRect();
            const dist = Math.abs(r.left + r.width / 2 - sliderCenter);
            if (dist < bestDist) { bestDist = dist; best = card; }
        });
        return best;
    }

    // N'écrit dans le DOM QUE si la carte gagnante a réellement changé.
    // -> la classe is-focused n'est jamais retirée puis remise sur la même carte,
    //    donc la transition CSS de 700ms ne redémarre pas pour rien.
    function setFocused(card) {
        if (card === currentFocused) return;
        currentFocused = card;
        projectCards.forEach(c => c.classList.toggle('is-focused', c === card));
    }

    function clearFocused() {
        if (!currentFocused) return;
        currentFocused = null;
        projectCards.forEach(c => c.classList.remove('is-focused'));
    }

    function updateFocusedCard() {
        if (!mobileFocusQuery.matches) { clearFocused(); return; }
        setFocused(computeBestCard());
    }

    // Pendant le scroll, la carte la plus proche du centre oscille entre deux
    // candidates au passage du milieu (inertie + scroll-snap). On ne tranche donc
    // qu'une fois le défilement arrêté : un seul calcul, une seule animation.
    function onSliderScroll() {
        if (!mobileFocusQuery.matches) return;
        clearTimeout(settleTimer);
        settleTimer = setTimeout(updateFocusedCard, 120);
    }

    projectsSlider.addEventListener('scroll', onSliderScroll, { passive: true });
    // resize / changement de breakpoint / load : pas d'oscillation, on applique direct
    window.addEventListener('resize', updateFocusedCard);
    mobileFocusQuery.addEventListener('change', updateFocusedCard);
    window.addEventListener('load', updateFocusedCard);
    updateFocusedCard();
}


// ---- Gestion du Formulaire de Contact ----
const form = document.getElementById("contactForm");
const formMessage = document.getElementById("formMessage");

form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const data = new FormData(form);
    const response = await fetch(form.action, {
        method: form.method,
        body: data,
        headers: { 'Accept': 'application/json' }
    });

    formMessage.classList.remove("hidden");
    formMessage.style.opacity = 0;
    formMessage.style.transform = "translateY(20px)";

    if (response.ok) {
        form.reset();
        formMessage.className = "mt-4 text-green-400";
        formMessage.innerHTML = translations[currentLang].formSuccess;
    } else {
        formMessage.className = "mt-4 text-red-400";
        formMessage.innerHTML = translations[currentLang].formError;
    }

    gsap.to(formMessage, { opacity: 1, y: 0, duration: prefersReducedMotion ? 0 : 0.6, ease: "power2.out" });
});

window.addEventListener('load', () => {
    ScrollTrigger.refresh();
});