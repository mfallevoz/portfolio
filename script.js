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
        navServices: "Services",
        navProjects: "Projets",
        navContact: "Contact",
        heroText: "Salut ! Je suis ",
        heroName: "Melchior Fallevoz",
        subtitle: "UI/UX & Web Designer",
        cta: "Voir mes services",
        aboutTitle: "À propos",
        aboutText1: "Je conçois des <b>sites modernes et performants</b> qui valorisent votre activité et transforment vos visiteurs en clients.",
        aboutText2: "Mon expertise combine <b>UI/UX design</b> et <b>développement web</b>, ce qui me permet de créer des sites <b>clairs</b>, <b>esthétiques</b> et <b>optimisés</b>.",
        aboutText3: "En travaillant ensemble, vous bénéficiez :",
        aboutText4: "d’un <b>site pensé pour vos utilisateurs</b> (ergonomie & design sur-mesure),",
        aboutText5: "d’une <b>visibilité renforcée</b> grâce au SEO et aux optimisations techniques,",
        aboutText6: "d’un <b>accompagnement complet</b> : de la création jusqu’à la maintenance.",
        aboutText7: "Mon objectif est simple : vous aider à développer une présence en ligne <b>professionnelle</b>, <b>crédible</b> et <b>impactante</b>.",
        servicesTitle: "Mes Services",
        servicesIntro: "Je vous accompagne dans la conception et l’optimisation de votre présence en ligne avec des solutions sur-mesure.",
        service1Title: "Création & Refonte de sites",
        service1Text: "Sites modernes, performants et adaptés à vos besoins.",
        service2Title: "UI / UX Design",
        service2Text: "Interfaces intuitives et designs centrés sur l’utilisateur.",
        service3Title: "SEO & Optimisation",
        service3Text: "Optimisation du référencement pour une meilleure visibilité.",
        service4Title: "Maintenance & Support",
        service4Text: "Suivi, mises à jour et assistance technique régulière.",
        projectsTitle: "Mes Projets",
        project1Desc: "Maintenance et évolution d'une architecture e-commerce moderne (Shopify Headless avec surcouche Vue.js). Conception et automatisation des flux de données backend via Make et Airtable. Gestion opérationnelle et sécurisation des passerelles de paiement Stripe et Amazon Pay.",
        project2Desc: "Maintenance évolutive de la boutique Shopify et développement de fonctionnalités sur-mesure. Création et intégration de blocs customs (Liquid, CSS, JS) pour adapter l'interface aux besoins du catalogue. Gestion opérationnelle du site au rythme des sorties officielles de cartes TCG.",
        project3Desc: "Développement et maintenance évolutive des fonctionnalités d'un site média d'envergure. Travail en environnement Headless (CMS WordPress découplé avec un front-end en React). Optimisation des performances globales et de l'expérience utilisateur.",
        project4Desc: "Intégration au sein de l'équipe de l'ESN pour la maintenance et l'évolution graphique d'un parc de sites multiclient. Résolution de tickets techniques en autonomie, optimisation responsive et corrections front-end sur différents CMS WordPress.",
        contactTitle: "Me Contacter",
        contactText: "Remplissez le formulaire et je vous recontacterai rapidement.",
        formName: "Nom",
        formEmail: "Email",
        formMessage: "Message",
        formSubmit: "Envoyer",
        formSuccess: "✅ Merci ! Ton message a bien été envoyé.",
        formError: "❌ Oups, une erreur est survenue. Essaie à nouveau.",
        metaDesc: "Portfolio de Melchior Fallevoz, UI/UX et Web Designer spécialisé dans les interfaces claires, ergonomiques et esthétiques.",
        metaKeywords: "UI/UX, web design, portfolio, design system, prototypes, interfaces"
    },
    en: {
        navHero: "Home",
        navAbout: "About",
        navServices: "Services",
        navProjects: "Projects",
        navContact: "Contact",
        heroText: "Hi! I'm ",
        heroName: "Melchior Fallevoz",
        subtitle: "UI/UX & Web Designer",
        cta: "See my services",
        aboutTitle: "About",
        aboutText1: "I design <b>modern and high-performing websites</b> that showcase your business and turn visitors into clients.",
        aboutText2: "My expertise combines <b>UI/UX design</b> and <b>web development</b>, which allows me to create websites that are <b>clear</b>, <b>aesthetic</b>, and <b>optimized</b>.",
        aboutText3: "By working together, you benefit from:",
        aboutText4: "a <b>website designed for your users</b> (ergonomics & tailored design),",
        aboutText5: "<b>enhanced visibility</b> thanks to SEO and technical optimizations,",
        aboutText6: "a <b>complete support</b>: from creation to ongoing maintenance.",
        aboutText7: "My goal is simple: to help you build an online presence that is <b>professional</b>, <b>credible</b>, and <b>impactful</b>.",
        servicesTitle: "My Services",
        servicesIntro: "I help you design and optimize your online presence with tailor-made solutions.",
        service1Title: "Website Creation & Redesign",
        service1Text: "Modern, high-performance websites tailored to your needs.",
        service2Title: "UI / UX Design",
        service2Text: "Intuitive interfaces and user-centered designs.",
        service3Title: "SEO & Optimization",
        service3Text: "SEO optimization for better visibility.",
        service4Title: "Maintenance & Support",
        service4Text: "Follow-up, updates and regular technical support.",
        projectsTitle: "My Projects",
        project1Desc: "Maintenance and evolution of a modern e-commerce architecture (Headless Shopify with a Vue.js frontend). Design and automation of backend data workflows using Make and Airtable. Handled operational management and security for Stripe and Amazon Pay payment gateways.",
        project2Desc: "Maintenance and development of custom features for a Shopify storefront. Created and integrated custom blocks (Liquid, CSS, JS) tailored to catalog needs. Managed site operations aligned with official TCG card releases.",
        project3Desc: "Development and feature maintenance for a major media website. Worked in a Headless environment (decoupled WordPress CMS with a React frontend). Optimized overall technical performance and user experience.",
        project4Desc: "Joined the IT services agency team to handle maintenance and visual enhancements for a multi-client web fleet. Independently resolved technical tickets, optimized responsiveness, and implemented front-end fixes across various WordPress sites.",
        contactTitle: "Contact Me",
        contactText: "Fill out the form and I’ll get back to you quickly.",
        formName: "Name",
        formEmail: "Email",
        formMessage: "Message",
        formSubmit: "Send",
        formSuccess: "✅ Thanks! Your message has been sent successfully.",
        formError: "❌ Oops, something went wrong. Please try again.",
        metaDesc: "Portfolio of Melchior Fallevoz, UI/UX and Web Designer specializing in clear, ergonomic, and aesthetic interfaces.",
        metaKeywords: "UI/UX, web design, portfolio, design system, prototypes, interfaces"
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
            target.innerHTML = text + '<span class="text-indigo-400">' + name.substring(0, i - text.length + 1) + '</span>';
            i++;
            typingTimeout = setTimeout(step, 80);
        } else {
            target.innerHTML = text + '<span class="text-indigo-400">' + name + '</span>' + '<span class="cursor-blink">|</span>';
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

function switchLang() {
    currentLang = currentLang === 'fr' ? 'en' : 'fr';
    updateTexts();
    typeWriter(translations[currentLang].heroText, translations[currentLang].heroName);
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