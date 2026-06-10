// Enregistrement des plugins GSAP nécessaires
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const container = document.querySelector('#scroll-container');

// ---- Animations Parallaxe ----
const parallaxEls = document.querySelectorAll('[data-parallax]');
parallaxEls.forEach(el => {
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
sections.forEach(sec => {
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

// ---- Dictionnaire de Traductions (i18n) ----
const translations = {
    fr: {
        navHero: "Accueil",
        navAbout: "À propos",
        navServices: "Compétences",
        navProjects: "Projets",
        navContact: "Contact",
        heroText: "Salut ! Je suis ",
        heroName: "Melchior Fallevoz",
        subtitle: "Développeur Full-Stack",
        cta: "Voir mes projets",
        aboutTitle: "À propos",
        aboutText1: "Je suis <b>développeur full-stack</b> avec <b>3+ ans</b> d'expérience à concevoir et livrer des plateformes web, des boutiques e-commerce et des workflows d'automatisation.",
        aboutText2: "Je travaille sur toute la <b>stack</b> — des frontends React/Vue aux APIs backend — avec une vraie <b>sensibilité UI/UX</b> et le souci d'un code propre et maintenable.",
        aboutText3: "Ce que j'apporte à une équipe :",
        aboutText4: "<b>Autonomie de bout en bout</b> — je livre les fonctionnalités de l'interface au backend.",
        aboutText5: "<b>Adaptation rapide</b> aux nouvelles stacks, bases de code et contextes clients.",
        aboutText6: "<b>Expérience remote et internationale</b>, en français, anglais et vietnamien.",
        aboutText7: "Nomade digital basé en Asie, <b>ouvert au remote et à la relocalisation</b>.",
        aboutMockupCaption: "Cointribune — refonte frontend React",
        servicesTitle: "Ce que je fais",
        servicesIntro: "Les domaines que je couvre en tant que développeur full-stack.",
        service1Title: "Développement Frontend",
        service1Text: "Des interfaces responsive, accessibles et soignées.",
        service2Title: "Backend & APIs",
        service2Text: "Des APIs robustes et de la logique serveur.",
        service3Title: "E-commerce",
        service3Text: "Des boutiques en ligne construites de bout en bout.",
        service4Title: "Automatisation & Intégrations",
        service4Text: "Des workflows qui suppriment le travail manuel.",
        projectsTitle: "Mes Projets",
        project1Desc: "Maintenance et évolution d'une architecture e-commerce moderne (Shopify Headless avec surcouche Vue.js). Conception et automatisation des flux de données backend via Make et Airtable. Gestion opérationnelle et sécurisation des passerelles de paiement Stripe et Amazon Pay.",
        project2Desc: "Maintenance évolutive de la boutique Shopify et développement de fonctionnalités sur-mesure. Création et intégration de blocs customs (Liquid, CSS, JS) pour adapter l'interface aux besoins du catalogue. Gestion opérationnelle du site au rythme des sorties officielles de cartes TCG.",
        project3Desc: "Développement et maintenance évolutive des fonctionnalités d'un site média d'envergure. Travail en environnement Headless (CMS WordPress découplé avec un front-end en React). Optimisation des performances globales et de l'expérience utilisateur.",
        project4Desc: "Intégration au sein de l'équipe de l'ESN pour la maintenance et l'évolution graphique d'un parc de sites multiclient. Résolution de tickets techniques en autonomie, optimisation responsive et corrections front-end sur différents CMS WordPress.",
        contactTitle: "Me Contacter",
        contactText: "Un poste ou un projet en tête ? Écrivez-moi, je réponds rapidement.",
        formName: "Nom",
        formEmail: "Email",
        formMessage: "Message",
        formSubmit: "Envoyer",
        formSuccess: "✅ Merci ! Ton message a bien été envoyé.",
        formError: "❌ Oups, une erreur est survenue. Essaie à nouveau.",
        metaDesc: "Portfolio de Melchior Fallevoz, développeur full-stack (React, Vue, Node/PHP, Shopify) avec 3+ ans d'expérience en plateformes web, e-commerce et automatisation.",
        metaKeywords: "développeur full-stack, développeur web, React, Vue, TypeScript, Shopify, Node, PHP, portfolio"
    },
    en: {
        navHero: "Home",
        navAbout: "About",
        navServices: "Skills",
        navProjects: "Projects",
        navContact: "Contact",
        heroText: "Hi! I'm ",
        heroName: "Melchior Fallevoz",
        subtitle: "Full-Stack Developer",
        cta: "View my work",
        aboutTitle: "About",
        aboutText1: "I'm a <b>full-stack developer</b> with <b>3+ years</b> building and shipping web platforms, e-commerce stores, and automation workflows.",
        aboutText2: "I work across the <b>full stack</b> — from React/Vue frontends to backend APIs — with a strong <b>UI/UX sensibility</b> and a focus on clean, maintainable code.",
        aboutText3: "What I bring to a team:",
        aboutText4: "<b>End-to-end ownership</b> — I ship features from interface to backend.",
        aboutText5: "<b>Fast adaptation</b> to new stacks, codebases, and client contexts.",
        aboutText6: "<b>Remote, international experience</b> in French, English, and Vietnamese.",
        aboutText7: "Digital nomad based in Asia, <b>open to remote roles and relocation</b>.",
        aboutMockupCaption: "Cointribune — React frontend redesign",
        servicesTitle: "What I Do",
        servicesIntro: "The areas I work across as a full-stack developer.",
        service1Title: "Frontend Development",
        service1Text: "Responsive, accessible, polished interfaces.",
        service2Title: "Backend & APIs",
        service2Text: "Robust APIs and server-side logic.",
        service3Title: "E-commerce",
        service3Text: "Online stores built end-to-end.",
        service4Title: "Automation & Integrations",
        service4Text: "Workflows that remove manual work.",
        projectsTitle: "My Projects",
        project1Desc: "Maintenance and evolution of a modern e-commerce architecture (Headless Shopify with a Vue.js frontend). Design and automation of backend data workflows using Make and Airtable. Handled operational management and security for Stripe and Amazon Pay payment gateways.",
        project2Desc: "Maintenance and development of custom features for a Shopify storefront. Created and integrated custom blocks (Liquid, CSS, JS) tailored to catalog needs. Managed site operations aligned with official TCG card releases.",
        project3Desc: "Development and feature maintenance for a major media website. Worked in a Headless environment (decoupled WordPress CMS with a React frontend). Optimized overall technical performance and user experience.",
        project4Desc: "Joined the IT services agency team to handle maintenance and visual enhancements for a multi-client web fleet. Independently resolved technical tickets, optimized responsiveness, and implemented front-end fixes across various WordPress sites.",
        contactTitle: "Contact Me",
        contactText: "Have a role or project in mind? Send me a message and I'll get back to you quickly.",
        formName: "Name",
        formEmail: "Email",
        formMessage: "Message",
        formSubmit: "Send",
        formSuccess: "✅ Thanks! Your message has been sent successfully.",
        formError: "❌ Oops, something went wrong. Please try again.",
        metaDesc: "Portfolio of Melchior Fallevoz, full-stack developer (React, Vue, Node/PHP, Shopify) with 3+ years building web platforms, e-commerce, and automation.",
        metaKeywords: "full-stack developer, web developer, React, Vue, TypeScript, Shopify, Node, PHP, portfolio"
    }
};

// ---- Gestion de la Langue ----
const browserLang = navigator.language || navigator.userLanguage;
let currentLang = browserLang.startsWith('en') ? 'en' : 'fr';

const target = document.getElementById("typewriter");
const langBtn = document.getElementById('langBtn');
let typingTimeout;

function typeWriter(text, name) {
    clearTimeout(typingTimeout);
    let i = 0;
    function step() {
        if (i < text.length) {
            target.innerHTML = text.substring(0, i + 1);
            i++;
            typingTimeout = setTimeout(step, 80);
        } else if (i < text.length + name.length) {
            target.innerHTML = text + '<span class="text-[color:var(--accent)]">' + name.substring(0, i - text.length + 1) + '</span>';
            i++;
            typingTimeout = setTimeout(step, 80);
        } else {
            target.innerHTML = text + '<span class="text-[color:var(--accent)]">' + name + '</span>' + '<span class="cursor-blink">|</span>';
        }
    }
    step();
}

function updateTexts() {
    document.documentElement.lang = currentLang;
    langBtn.innerHTML = currentLang === 'fr' ? 'EN' : 'FR';

    const metaDescription = document.querySelector('meta[name="description"]');
    const metaKeywords = document.querySelector('meta[name="keywords"]');

    if (metaDescription && translations[currentLang].metaDesc) {
        metaDescription.setAttribute('content', translations[currentLang].metaDesc);
    }
    if (metaKeywords && translations[currentLang].metaKeywords) {
        metaKeywords.setAttribute('content', translations[currentLang].metaKeywords);
    }

    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (translations[currentLang][key]) {
            el.innerHTML = translations[currentLang][key];
        }
    });
}

let langSwitching = false;

function switchLang() {
    if (langSwitching) return; // évite les double-clics pendant le fondu
    langSwitching = true;

    currentLang = currentLang === 'fr' ? 'en' : 'fr';

    container.classList.add('lang-fade');

    setTimeout(() => {
        updateTexts();
        typeWriter(translations[currentLang].heroText, translations[currentLang].heroName);

        requestAnimationFrame(() => {
            container.classList.remove('lang-fade');
            setTimeout(() => { langSwitching = false; }, 250);
        });
    }, 220);
}

updateTexts();
typeWriter(translations[currentLang].heroText, translations[currentLang].heroName);
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
            gsap.to(container, { scrollTo: { y: sect.offsetTop }, duration: 0.7, ease: 'power2.out' });
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
        gsap.to(projectsSlider, { scrollLeft: `+=${getScrollAmount()}`, duration: 0.4, ease: 'power2.out' });
    });

    prevProjectBtn.addEventListener('click', () => {
        gsap.to(projectsSlider, { scrollLeft: `-=${getScrollAmount()}`, duration: 0.4, ease: 'power2.out' });
    });

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
    }

    projectsSlider.addEventListener('scroll', updateArrows);
    window.addEventListener('resize', updateArrows);

    setTimeout(updateArrows, 150);
}


// ---- Mobile : la carte la plus proche du centre du slider est en "focus" ----
const mobileFocusQuery = window.matchMedia('(max-width: 768px)');

if (projectsSlider) {
    const projectCards = Array.from(projectsSlider.querySelectorAll('.project-card'));
    let focusTick = false;

    function updateFocusedCard() {
        focusTick = false;

        if (!mobileFocusQuery.matches) {
            projectCards.forEach(card => card.classList.remove('is-focused'));
            return;
        }

        const sliderRect = projectsSlider.getBoundingClientRect();
        const sliderCenter = sliderRect.left + sliderRect.width / 2;

        let best = null;
        let bestDist = Infinity;
        projectCards.forEach(card => {
            const r = card.getBoundingClientRect();
            const dist = Math.abs(r.left + r.width / 2 - sliderCenter);
            if (dist < bestDist) { bestDist = dist; best = card; }
        });

        projectCards.forEach(card => card.classList.toggle('is-focused', card === best));
    }

    function requestFocusUpdate() {
        if (!focusTick) {
            focusTick = true;
            requestAnimationFrame(updateFocusedCard);
        }
    }

    projectsSlider.addEventListener('scroll', requestFocusUpdate, { passive: true });
    window.addEventListener('resize', requestFocusUpdate);
    mobileFocusQuery.addEventListener('change', requestFocusUpdate);
    window.addEventListener('load', requestFocusUpdate);
    requestFocusUpdate();
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

    gsap.to(formMessage, { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" });
});

window.addEventListener('load', () => {
    ScrollTrigger.refresh();
});