/**
 * =====================================================
 * ESTHER MARTINS - ESTÉTICA & HEALTHCARE
 * Script Principal
 * =====================================================
 * 1. Menu mobile
 * 2. Scroll suave com compensação do header
 * 3. Header ao rolar
 * 4. Abas de cuidados pré e pós
 * 5. FAQ acordeão
 * 6. Animações de entrada
 * 7. Mensagem padrão do WhatsApp
 * =====================================================
 */

document.addEventListener('DOMContentLoaded', function () {

    /* ========== 1. MENU MOBILE ========== */
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function () {
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', function () {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });

        document.addEventListener('click', function (e) {
            if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    }

    /* ========== 2. SCROLL SUAVE ========== */
    const header = document.getElementById('header');

    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            const target = document.querySelector(href);
            if (!target) return;
            e.preventDefault();
            const top = target.getBoundingClientRect().top + window.pageYOffset - header.offsetHeight + 1;
            window.scrollTo({ top: top, behavior: 'smooth' });
        });
    });

    /* ========== 3. HEADER AO ROLAR ========== */
    function onScroll() {
        header.classList.toggle('scrolled', window.pageYOffset > 40);
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    /* ========== 4. ABAS DE CUIDADOS ========== */
    const tabs = document.querySelectorAll('.cuidados-tabs .tab');
    const panels = document.querySelectorAll('.cuidados-panel');

    tabs.forEach(tab => {
        tab.addEventListener('click', function () {
            tabs.forEach(t => {
                t.classList.remove('active');
                t.setAttribute('aria-selected', 'false');
            });
            panels.forEach(p => p.classList.remove('active'));

            tab.classList.add('active');
            tab.setAttribute('aria-selected', 'true');
            const panel = document.getElementById('tab-' + tab.dataset.tab);
            if (panel) panel.classList.add('active');
        });
    });

    /* ========== 5. FAQ ACORDEÃO ========== */
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        item.querySelector('.faq-question').addEventListener('click', function () {
            const isActive = item.classList.contains('active');
            faqItems.forEach(other => other.classList.remove('active'));
            if (!isActive) item.classList.add('active');
        });
    });

    /* ========== 6. ANIMAÇÕES DE ENTRADA ========== */
    const revealEls = document.querySelectorAll(
        '.section-header, .servico-card, .feature, .passo, .depoimento-card, .faq-item, .cuidado-col, .gloss-info, .sobre-image'
    );

    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('in-view');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.12 });

        revealEls.forEach(el => {
            el.classList.add('reveal');
            observer.observe(el);
        });
    }

    /* ========== 7. MENSAGEM PADRÃO DO WHATSAPP ========== */
    // EDITÁVEL: mensagem que já aparece escrita quando a cliente abre o WhatsApp
    const defaultMessage = encodeURIComponent('Olá, Esther! Vim pelo site e gostaria de agendar uma avaliação.');

    document.querySelectorAll('a[href*="wa.me"]').forEach(link => {
        const href = link.getAttribute('href');
        if (!href.includes('text=')) {
            link.setAttribute('href', href + '?text=' + defaultMessage);
        }
    });
});
