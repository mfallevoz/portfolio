gsap.registerPlugin(ScrollTrigger);
const container = document.querySelector('#scroll-container');
const parallaxEls = document.querySelectorAll('[data-parallax]');
parallaxEls.forEach(el => {
    const speed = parseFloat(el.dataset.speed) || 0;
    gsap.to(el, { yPercent: speed, ease: 'none', scrollTrigger: { trigger: el, scroller: container, start: 'top bottom', end: 'bottom top', scrub: true } });
});
const sections = gsap.utils.toArray('section');
sections.forEach(sec => {
    const elems = sec.querySelectorAll('h1,h2,h3,p,form,div,a,ul,li');
    gsap.from(elems, { opacity: 0, y: 40, stagger: 0.08, duration: 0.7, ease: 'power2.out', scrollTrigger: { trigger: sec, scroller: container, start: 'top 70%' } });
});
const dots = document.querySelectorAll('.menu-dot');
container.addEventListener('scroll', () => {
    const top = container.scrollTop + (window.innerHeight / 2);
    const sects = Array.from(document.querySelectorAll('section'));
    let idx = 0;
    for (let i = 0; i < sects.length; i++) { if (top >= sects[i].offsetTop) idx = i; }
    dots.forEach(d => d.classList.remove('active'));
    if (dots[idx]) dots[idx].classList.add('active');
});
dots.forEach((dot, i) => {
    dot.addEventListener('click', e => {
        e.preventDefault();
        const sect = document.querySelectorAll('section')[i];
        gsap.to(container, { scrollTo: { y: sect.offsetTop }, duration: 0.7, ease: 'power2.out' });
    });
});

const translations = {
    fr: {
        heroText: "Salut ! Je suis ",
        heroName: "Melchior Fallevoz",
        subtitle: "UI/UX & Web Designer",
        cta: "Voir mes services",
        aboutTitle: "À propos",
        aboutText1: "Je conçois des <b>sites modernes et performants</b> qui valorisent votre activité et transforment vos visiteurs en clients.",
        aboutText2: "Mon expertise combine <b>UI/UX design</b> et <b>développement web</b>, ce qui me permet de créer des sites <b>claires</b>, <b>esthétiques</b> et <b>optimisées</b>.",
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
        contactTitle: "Me Contacter",
        contactText: "Remplissez le formulaire et je vous recontacterai rapidement.",
        formName: "Nom",
        formEmail: "Email",
        formMessage: "Message",
        formSubmit: "Envoyer",
        formSuccess: "✅ Merci ! Ton message a bien été envoyé.",
        formError: "❌ Oups, une erreur est survenue. Essaie à nouveau."
    },
    en: {
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
        contactTitle: "Contact Me",
        contactText: "Fill out the form and I’ll get back to you quickly.",
        formName: "Name",
        formEmail: "Email",
        formMessage: "Message",
        formSubmit: "Send",
        formSuccess: "✅ Thanks! Your message has been sent successfully.",
        formError: "❌ Oops, something went wrong. Please try again."
    }
};

let currentLang = 'fr';
const target = document.getElementById("typewriter");
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

const langBtn = document.getElementById('langBtn');
function switchLang() {
    currentLang = currentLang === 'fr' ? 'en' : 'fr';
    document.documentElement.lang = currentLang;
    langBtn.innerHTML = currentLang === 'fr' ? 'EN' : 'FR';

    // Mettre à jour les textes traduits
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (translations[currentLang][key]) {
            el.innerHTML = translations[currentLang][key];
        }
    });

    // Relancer le typewriter avec la bonne langue
    typeWriter(translations[currentLang].heroText, translations[currentLang].heroName);
}

// Lancer en français au début
typeWriter(translations.fr.heroText, translations.fr.heroName);
langBtn.addEventListener('click', switchLang);

// ---- Gestion du formulaire ----
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

    // Réinitialiser classes
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

    // Animation GSAP : fade + slide-up
    gsap.to(formMessage, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power2.out"
    });
});