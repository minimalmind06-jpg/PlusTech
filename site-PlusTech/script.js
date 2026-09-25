document.addEventListener("DOMContentLoaded", function () {

    /* 1. Header Fixo ao Fazer Scroll */
    const navbar = document.getElementById("navbar");
    window.addEventListener("scroll", function () {
        if (window.scrollY > 50) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }
    });

    /* 2. Menu Mobile (Hamburger) */
    const hamburger = document.getElementById("hamburger");
    const navMenu = document.getElementById("nav-menu");
    const navLinks = document.querySelectorAll(".nav-link");

    hamburger.addEventListener("click", function () {
        navMenu.classList.toggle("active");
        const icon = hamburger.querySelector("i");
        if (navMenu.classList.contains("active")) {
            icon.classList.remove("fa-bars");
            icon.classList.add("fa-xmark");
        } else {
            icon.classList.remove("fa-xmark");
            icon.classList.add("fa-bars");
        }
    });

    // Fechar menu ao clicar num link
    navLinks.forEach(link => {
        link.addEventListener("click", () => {
            navMenu.classList.remove("active");
            hamburger.querySelector("i").className = "fa-solid fa-bars";
        });
    });

    /* 3. Filtro de Portfólio */
    const filterBtns = document.querySelectorAll(".filter-btn");
    const portfolioCards = document.querySelectorAll(".portfolio-card");

    filterBtns.forEach(btn => {
        btn.addEventListener("click", function () {
            filterBtns.forEach(b => b.classList.remove("active"));
            this.classList.add("active");

            const filterValue = this.getAttribute("data-filter");

            portfolioCards.forEach(card => {
                const category = card.getAttribute("data-category");
                if (filterValue === "all" || filterValue === category) {
                    card.style.display = "block";
                } else {
                    card.style.display = "none";
                }
            });
        });
    });

    /* 4. Acórdão FAQ */
    const faqQuestions = document.querySelectorAll(".faq-question");

    faqQuestions.forEach(question => {
        question.addEventListener("click", function () {
            const faqItem = this.parentElement;

            // Fechar outros itens abertos
            document.querySelectorAll(".faq-item").forEach(item => {
                if (item !== faqItem) {
                    item.classList.remove("active");
                }
            });

            faqItem.classList.toggle("active");
        });
    });

    /* 5. Simulação de Envio do Formulário de Contacto */
    const contactForm = document.getElementById("contactForm");
    const formSuccess = document.getElementById("formSuccess");

    contactForm.addEventListener("submit", function (e) {
        e.preventDefault();

        // Simular envio
        const btn = contactForm.querySelector("button[type='submit']");
        btn.innerHTML = 'A enviar... <i class="fa-solid fa-spinner fa-spin"></i>';
        btn.disabled = true;

        setTimeout(() => {
            btn.innerHTML = 'Enviar Pedido <i class="fa-solid fa-paper-plane"></i>';
            btn.disabled = false;
            formSuccess.style.display = "block";
            contactForm.reset();

            setTimeout(() => {
                formSuccess.style.display = "none";
            }, 5000);
        }, 1200);
    });

    /* 6. Modal do Projeto & Lightbox de Fotografias */
    const projectGuruCard = document.getElementById("project-guru");
    const modalGuru = document.getElementById("modal-guru");
    const closeModalGuru = document.getElementById("closeModalGuru");
    const backdropGuru = document.getElementById("backdropGuru");
    const btnCtaModal = document.getElementById("btnCtaModal");

    const lightboxOverlay = document.getElementById("lightboxOverlay");
    const lightboxClose = document.getElementById("lightboxClose");
    const lightboxImg = document.getElementById("lightboxImg");
    const lightboxCaption = document.getElementById("lightboxCaption");
    const galleryCards = document.querySelectorAll(".gallery-card");

    function openModal() {
        if (modalGuru) {
            modalGuru.classList.add("active");
            modalGuru.setAttribute("aria-hidden", "false");
            document.body.style.overflow = "hidden";
        }
    }

    function closeModal() {
        if (modalGuru) {
            modalGuru.classList.remove("active");
            modalGuru.setAttribute("aria-hidden", "true");
            document.body.style.overflow = "";
        }
    }

    if (projectGuruCard) {
        projectGuruCard.addEventListener("click", openModal);
        projectGuruCard.addEventListener("keydown", function (e) {
            if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                openModal();
            }
        });
    }

    if (closeModalGuru) closeModalGuru.addEventListener("click", closeModal);
    if (backdropGuru) backdropGuru.addEventListener("click", closeModal);

    if (btnCtaModal) {
        btnCtaModal.addEventListener("click", function () {
            closeModal();
        });
    }

    // Lightbox para imagens da galeria
    galleryCards.forEach(card => {
        card.addEventListener("click", function (e) {
            e.stopPropagation();
            const imgSrc = this.getAttribute("data-img");
            const captionText = this.getAttribute("data-caption");

            if (imgSrc && lightboxOverlay && lightboxImg) {
                lightboxImg.src = imgSrc;
                lightboxCaption.textContent = captionText || "";
                lightboxOverlay.classList.add("active");
                lightboxOverlay.setAttribute("aria-hidden", "false");
            }
        });
    });

    function closeLightbox() {
        if (lightboxOverlay) {
            lightboxOverlay.classList.remove("active");
            lightboxOverlay.setAttribute("aria-hidden", "true");
        }
    }

    if (lightboxClose) lightboxClose.addEventListener("click", closeLightbox);
    if (lightboxOverlay) {
        lightboxOverlay.addEventListener("click", function (e) {
            if (e.target === lightboxOverlay || e.target.classList.contains("lightbox-content")) {
                closeLightbox();
            }
        });
    }

    // Tecla ESC para fechar modal ou lightbox
    document.addEventListener("keydown", function (e) {
        if (e.key === "Escape") {
            if (lightboxOverlay && lightboxOverlay.classList.contains("active")) {
                closeLightbox();
            } else if (modalGuru && modalGuru.classList.contains("active")) {
                closeModal();
            }
        }
    });
});