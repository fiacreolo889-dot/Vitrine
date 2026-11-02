/**
 * ============================================================================
 * ÉMILE RUSSEL PHOTOGRAPHY — SCRIPT PRINCIPAL INTERACTIF
 * Auteur : Développeur Web Junior & Direction Artistique
 * Projet Hackathon : Création d'un site web d'entreprise d'exception
 * ============================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  /* --------------------------------------------------------------------------
     1. NAVIGATION INTERACTIVE & HEADER SCROLL
     -------------------------------------------------------------------------- */
  const navbar = document.querySelector('.luxury-navbar');
  const navCollapse = document.querySelector('.navbar-collapse');
  const navLinks = document.querySelectorAll('.nav-link-custom');

  // Effet de réduction et flou de la barre de navigation au défilement
  const handleNavbarScroll = () => {
    if (!navbar) return;
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleNavbarScroll, { passive: true });
  handleNavbarScroll();

  // Fermeture automatique du menu mobile lors du clic sur un lien
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (navCollapse && navCollapse.classList.contains('show')) {
        const bsCollapse = bootstrap.Collapse.getInstance(navCollapse);
        if (bsCollapse) {
          bsCollapse.hide();
        }
      }
    });
  });

  // Détection du lien actif selon l'URL de la page
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPath || (currentPath === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  /* --------------------------------------------------------------------------
     2. ANIMATIONS AU DÉFILEMENT (INTERSECTION OBSERVER)
     -------------------------------------------------------------------------- */
  const revealElements = document.querySelectorAll('.reveal-on-scroll');

  if ('IntersectionObserver' in window && revealElements.length > 0) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      root: null,
      rootMargin: '0px 0px -60px 0px',
      threshold: 0.12
    });

    revealElements.forEach(el => revealObserver.observe(el));
  } else {
    // Rétrocompatibilité si IntersectionObserver non disponible
    revealElements.forEach(el => el.classList.add('is-visible'));
  }

  /* --------------------------------------------------------------------------
     3. FILTRAGE DYNAMIQUE DE LA GALERIE (SERVICES / PORTFOLIO)
     -------------------------------------------------------------------------- */
  const filterButtons = document.querySelectorAll('.filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');

  if (filterButtons.length > 0 && galleryItems.length > 0) {
    filterButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        // Mise à jour visuelle des boutons de filtres
        filterButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filterValue = btn.getAttribute('data-filter');

        galleryItems.forEach(item => {
          const category = item.getAttribute('data-category');
          if (filterValue === 'all' || category === filterValue) {
            item.style.display = 'block';
            setTimeout(() => {
              item.style.opacity = '1';
              item.style.transform = 'scale(1)';
            }, 50);
          } else {
            item.style.opacity = '0';
            item.style.transform = 'scale(0.92)';
            setTimeout(() => {
              item.style.display = 'none';
            }, 300);
          }
        });
      });
    });
  }

  /* --------------------------------------------------------------------------
     4. LIGHTBOX PHOTOGRAPHIQUE INTERACTIVE PLEIN ÉCRAN
     -------------------------------------------------------------------------- */
  const lightboxModal = document.getElementById('luxuryLightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxTitle = document.getElementById('lightboxTitle');
  const lightboxCategory = document.getElementById('lightboxCategory');
  const lightboxClose = document.getElementById('lightboxClose');
  const lightboxPrev = document.getElementById('lightboxPrev');
  const lightboxNext = document.getElementById('lightboxNext');

  let currentGalleryList = [];
  let currentImageIndex = 0;

  // Récupération des données visibles de la galerie
  const getVisibleGalleryItems = () => {
    return Array.from(galleryItems).filter(item => item.style.display !== 'none');
  };

  const updateLightboxContent = (index) => {
    if (!currentGalleryList[index]) return;
    const item = currentGalleryList[index];
    const imgEl = item.querySelector('img');
    const titleEl = item.querySelector('.gallery-overlay h4');
    const catEl = item.querySelector('.gallery-overlay span');

    if (imgEl && lightboxImg) {
      lightboxImg.src = imgEl.src;
      lightboxImg.alt = imgEl.alt || 'Photographie Émile Russel';
    }
    if (titleEl && lightboxTitle) {
      lightboxTitle.textContent = titleEl.textContent;
    }
    if (catEl && lightboxCategory) {
      lightboxCategory.textContent = catEl.textContent;
    }
    currentImageIndex = index;
  };

  const openLightbox = (index) => {
    currentGalleryList = getVisibleGalleryItems();
    if (currentGalleryList.length === 0) {
      currentGalleryList = Array.from(galleryItems);
    }
    updateLightboxContent(index);
    if (lightboxModal) {
      lightboxModal.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  };

  const closeLightbox = () => {
    if (lightboxModal) {
      lightboxModal.classList.remove('active');
      document.body.style.overflow = '';
    }
  };

  const nextLightboxImage = () => {
    if (currentGalleryList.length <= 1) return;
    const nextIdx = (currentImageIndex + 1) % currentGalleryList.length;
    updateLightboxContent(nextIdx);
  };

  const prevLightboxImage = () => {
    if (currentGalleryList.length <= 1) return;
    const prevIdx = (currentImageIndex - 1 + currentGalleryList.length) % currentGalleryList.length;
    updateLightboxContent(prevIdx);
  };

  // Attacher les écouteurs sur chaque élément de la galerie
  galleryItems.forEach((item, idx) => {
    item.addEventListener('click', () => {
      const visibleItems = getVisibleGalleryItems();
      const visibleIndex = visibleItems.indexOf(item);
      openLightbox(visibleIndex >= 0 ? visibleIndex : idx);
    });
  });

  if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
  if (lightboxNext) lightboxNext.addEventListener('click', nextLightboxImage);
  if (lightboxPrev) lightboxPrev.addEventListener('click', prevLightboxImage);

  // Fermeture au clic sur le fond noir
  if (lightboxModal) {
    lightboxModal.addEventListener('click', (e) => {
      if (e.target === lightboxModal) {
        closeLightbox();
      }
    });
  }

  // Navigation clavier pour la lightbox
  window.addEventListener('keydown', (e) => {
    if (!lightboxModal || !lightboxModal.classList.contains('active')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowRight') nextLightboxImage();
    if (e.key === 'ArrowLeft') prevLightboxImage();
  });

  /* --------------------------------------------------------------------------
     5. PRÉ-REMPLISSAGE DU FORMULAIRE DE RÉSERVATION VIA URL (?service=...)
     -------------------------------------------------------------------------- */
  const contactForm = document.getElementById('bookingForm');
  const serviceSelect = document.getElementById('serviceSelect');

  if (serviceSelect) {
    const urlParams = new URLSearchParams(window.location.search);
    const requestedService = urlParams.get('service');

    if (requestedService) {
      const matchOption = Array.from(serviceSelect.options).find(opt => 
        opt.value.toLowerCase().includes(requestedService.toLowerCase()) ||
        opt.text.toLowerCase().includes(requestedService.toLowerCase())
      );
      if (matchOption) {
        serviceSelect.value = matchOption.value;
        serviceSelect.classList.add('border-bronze');
        // Défilement doux jusqu'au formulaire
        setTimeout(() => {
          contactForm?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 400);
      }
    }
  }

  /* --------------------------------------------------------------------------
     6. VALIDATION DYNAMIQUE DU FORMULAIRE & CONFIRMATION
     -------------------------------------------------------------------------- */
  const successModal = document.getElementById('successModal');
  const closeModalBtns = document.querySelectorAll('.close-modal-trigger');

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validatePhone = (phone) => {
    return /^[\d\s\+\-\(\)]{8,}$/.test(phone.trim());
  };

  const setFieldValidation = (input, isValid, errorMsg = '') => {
    const feedback = input.parentElement.querySelector('.invalid-feedback-custom');
    if (!isValid) {
      input.classList.add('is-invalid');
      if (feedback && errorMsg) feedback.textContent = errorMsg;
    } else {
      input.classList.remove('is-invalid');
    }
  };

  if (contactForm) {
    const inputs = contactForm.querySelectorAll('input, select, textarea');

    // Validation instantanée lors de la perte de focus
    inputs.forEach(input => {
      input.addEventListener('blur', () => {
        validateSingleField(input);
      });
      input.addEventListener('input', () => {
        if (input.classList.contains('is-invalid')) {
          validateSingleField(input);
        }
      });
    });

    const validateSingleField = (field) => {
      const val = field.value.trim();
      if (field.id === 'clientName') {
        const valid = val.length >= 3;
        setFieldValidation(field, valid, 'Veuillez saisir votre nom et prénom (3 caractères minimum).');
        return valid;
      }
      if (field.id === 'clientEmail') {
        const valid = validateEmail(val);
        setFieldValidation(field, valid, 'Veuillez renseigner une adresse e-mail valide.');
        return valid;
      }
      if (field.id === 'clientPhone') {
        const valid = validatePhone(val);
        setFieldValidation(field, valid, 'Veuillez saisir un numéro de téléphone valide.');
        return valid;
      }
      if (field.id === 'serviceSelect') {
        const valid = val !== '';
        setFieldValidation(field, valid, 'Veuillez sélectionner un type de prestation.');
        return valid;
      }
      if (field.id === 'clientDate') {
        const valid = val !== '';
        setFieldValidation(field, valid, 'Veuillez indiquer la date souhaitée pour votre séance.');
        return valid;
      }
      if (field.id === 'clientMessage') {
        const valid = val.length >= 10;
        setFieldValidation(field, valid, 'Veuillez détailler votre vision artistique (10 caractères minimum).');
        return valid;
      }
      return true;
    };

    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      let isFormValid = true;

      inputs.forEach(field => {
        if (field.hasAttribute('required')) {
          const valid = validateSingleField(field);
          if (!valid) isFormValid = false;
        }
      });

      if (!isFormValid) {
        // Faire défiler jusqu'au premier champ invalide
        const firstInvalid = contactForm.querySelector('.is-invalid');
        if (firstInvalid) {
          firstInvalid.scrollIntoView({ behavior: 'smooth', block: 'center' });
          firstInvalid.focus();
        }
        return;
      }

      // Animation de chargement sur le bouton
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = `
        <span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
        Transmission de votre demande...
      `;

      // Simulation de soumission sécurisée
      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;

        // Afficher la modal de confirmation personnalisée
        const clientNameVal = document.getElementById('clientName')?.value || 'Cher(e) Client(e)';
        const modalClientName = document.getElementById('modalClientName');
        if (modalClientName) modalClientName.textContent = clientNameVal;

        if (successModal) {
          successModal.classList.add('active');
          document.body.style.overflow = 'hidden';
        }

        contactForm.reset();
        inputs.forEach(input => input.classList.remove('is-invalid'));
      }, 1200);
    });
  }

  // Fermeture de la modal de confirmation
  closeModalBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      if (successModal) {
        successModal.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  });

  if (successModal) {
    successModal.addEventListener('click', (e) => {
      if (e.target === successModal) {
        successModal.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  }

  /* --------------------------------------------------------------------------
     7. BONUS 2 : CHATBOT IA GEMINI (RUSSEL ASSISTANT)
     -------------------------------------------------------------------------- */
  const chatbotTrigger = document.getElementById('chatbotTrigger');
  const chatbotContainer = document.getElementById('chatbotContainer');
  const chatbotClose = document.getElementById('chatbotClose');
  const chatMessages = document.getElementById('chatMessages');
  const chatForm = document.getElementById('chatForm');
  const chatInput = document.getElementById('chatInput');
  const suggestionChips = document.querySelectorAll('.suggestion-chip');

  // Ouvrir / fermer le chatbot
  if (chatbotTrigger && chatbotContainer) {
    chatbotTrigger.addEventListener('click', () => {
      chatbotContainer.classList.toggle('active');
      if (chatbotContainer.classList.contains('active')) {
        chatInput?.focus();
      }
    });
  }

  if (chatbotClose && chatbotContainer) {
    chatbotClose.addEventListener('click', () => {
      chatbotContainer.classList.remove('active');
    });
  }

  // Ajout d'une bulle de message dans la boîte de dialogue
  const appendChatMessage = (text, sender = 'bot', isAlert = false) => {
    if (!chatMessages) return;

    const bubble = document.createElement('div');
    bubble.className = `chat-bubble ${sender}${isAlert ? ' system-alert' : ''}`;
    bubble.textContent = text;
    chatMessages.appendChild(bubble);

    // Faire défiler automatiquement vers le bas
    chatMessages.scrollTop = chatMessages.scrollHeight;
  };

  // Indicateur de saisie en cours (typing indicator)
  let typingIndicator = null;
  const showTypingIndicator = () => {
    if (!chatMessages || typingIndicator) return;
    typingIndicator = document.createElement('div');
    typingIndicator.className = 'chat-bubble bot';
    typingIndicator.innerHTML = `
      <div class="d-flex align-items-center gap-2">
        <span class="spinner-grow spinner-grow-sm text-bronze" role="status" style="width: 8px; height: 8px;"></span>
        <span class="spinner-grow spinner-grow-sm text-bronze" role="status" style="width: 8px; height: 8px; animation-delay: 0.2s;"></span>
        <span class="spinner-grow spinner-grow-sm text-bronze" role="status" style="width: 8px; height: 8px; animation-delay: 0.4s;"></span>
        <span style="font-size: 0.8rem; color: var(--color-text-muted);" class="ms-1">Russel Assistant compose...</span>
      </div>
    `;
    chatMessages.appendChild(typingIndicator);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  };

  const removeTypingIndicator = () => {
    if (typingIndicator && typingIndicator.parentNode) {
      typingIndicator.parentNode.removeChild(typingIndicator);
      typingIndicator = null;
    }
  };

  // Historique de la conversation locale pour l'API
  const conversationHistory = [];

  // Envoi du message à l'API serveur sécurisée Gemini (/api/chat)
  const sendChatMessage = async (userMessage) => {
    const trimmedMessage = userMessage.trim();
    if (!trimmedMessage) return;

    // Afficher la bulle de l'utilisateur
    appendChatMessage(trimmedMessage, 'user');
    conversationHistory.push({ role: 'user', text: trimmedMessage });

    if (chatInput) chatInput.value = '';
    showTypingIndicator();

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          message: trimmedMessage,
          history: conversationHistory.slice(-6)
        })
      });

      removeTypingIndicator();

      if (response.ok) {
        const data = await response.json();
        const reply = data.reply || "Je reste à votre entière disposition pour immortaliser vos plus beaux moments.";
        appendChatMessage(reply, 'bot');
        conversationHistory.push({ role: 'model', text: reply });
      } else {
        // En cas d'erreur ou d'absence de clé API côté serveur
        const errData = await response.json().catch(() => ({}));
        const defaultUnavailableMsg = "Notre service d'assistance IA en direct est temporairement indisponible (la clé API Gemini n'a pas encore été configurée dans les variables d'environnement du serveur). Veuillez nous contacter directement via notre page Contact ou par e-mail à Pigier@gmail.com.";
        
        appendChatMessage(errData.message || defaultUnavailableMsg, 'bot', true);
      }
    } catch (networkError) {
      removeTypingIndicator();
      console.warn('Russel Assistant API Notice:', networkError);
      
      // Message propre d'indisponibilité (exigence stricte hackathon : pas de fausse simulation locale)
      const cleanMessage = "Notre service d'assistance IA en direct est temporairement indisponible (la clé API Gemini n'a pas encore été configurée dans les variables d'environnement du serveur). Veuillez nous contacter directement via notre page Contact ou par e-mail à Pigier@gmail.com.";
      appendChatMessage(cleanMessage, 'bot', true);
    }
  };

  if (chatForm) {
    chatForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const msg = chatInput?.value || '';
      sendChatMessage(msg);
    });
  }

  // Clic sur les suggestions rapides
  suggestionChips.forEach(chip => {
    chip.addEventListener('click', () => {
      const prompt = chip.getAttribute('data-prompt') || chip.textContent;
      sendChatMessage(prompt);
    });
  });

  /* --------------------------------------------------------------------------
     8. NEWSLETTER FOOTER (VALIDATION & RETOUR VISUEL)
     -------------------------------------------------------------------------- */
  const newsletterForm = document.getElementById('newsletterForm');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const emailInput = newsletterForm.querySelector('input[type="email"]');
      if (emailInput && validateEmail(emailInput.value)) {
        const originalBtn = newsletterForm.querySelector('button');
        const originalContent = originalBtn.innerHTML;
        originalBtn.innerHTML = '<span class="material-symbols-outlined fs-6">check</span>';
        emailInput.value = '';
        emailInput.placeholder = 'Merci de votre confiance !';
        setTimeout(() => {
          originalBtn.innerHTML = originalContent;
          emailInput.placeholder = 'Votre adresse e-mail';
        }, 3500);
      } else if (emailInput) {
        emailInput.classList.add('is-invalid');
        setTimeout(() => emailInput.classList.remove('is-invalid'), 2500);
      }
    });
  }

});
