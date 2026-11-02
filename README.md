<<<<<<< HEAD
# ÉMILE RUSSEL PHOTOGRAPHY — Atelier Photographique d'Art & Haute Couture

> **Projet Hackathon Académique :** « Création d'un site web d'entreprise d'exception »  
> **Rôle :** Développeur Web Junior, UI/UX Designer Junior & Directeur Artistique  
> **Entreprise :** ÉMILE RUSSEL PHOTOGRAPHY (Photographie de prestige)  
> **Technologies :** HTML5 sémantique, CSS3 moderne, Bootstrap 5.3, JavaScript ES6+, API Gemini AI (Serverless).

---

## 1. Identité Visuelle & Direction Artistique

Le site d'**ÉMILE RUSSEL PHOTOGRAPHY** s'inspire des portfolios de haute couture et des galeries d'art photographiques internationales les plus prestigieuses. Il allie minimalisme intemporel, rigueur typographique et contrastes profonds.

### Palette de Couleurs Sur-Mesure (Élimination de l'or générique)
Afin d'éviter les teintes jaunes/dorées génériques des templates courants, une palette sur-mesure de **Champagne Cuivré / Warm Bronze** a été élaborée pour susciter une sensation d'exclusivité et de noblesse :

| Nuance | Code HEX | Rôle dans l'interface |
|---|---|---|
| **Noir Profond Absolu** | `#050505` | Arrière-plan principal, profondeur spatiale |
| **Fond Sombre Rétro-éclairé** | `#0B0B0C` & `#141416` | Surfaces surélevées, cartes, modales et menus |
| **Surface Élevée** | `#1B1B1E` | Conteneurs secondaires et champs de saisie |
| **Champagne Cuivré (Principal)** | `#C59B73` | Accents de prestige, boutons d'action, bordures fines |
| **Champagne Doré Chaud (Secondaire)** | `#E6C280` | Survol lumineux, dégradés d'accent |
| **Blanc Pur & Blanc Cassé** | `#FFFFFF` & `#F4F4F6` | Typographie de titrage, clarté et sections de contraste |
| **Texte Atténué** | `#9E9EA7` | Corps de texte et descriptions lisibles |

### Typographies Distinctives (Google Fonts)
- **Titres & Display :** `'Cormorant Garamond'` — Une typographie Serif haute couture française incarnant l'élégance éditoriale des magazines d'art.
- **Corps de texte :** `'Plus Jakarta Sans'` — Un Sans-serif géométrique contemporain offrant une lisibilité optimale sur tous les supports.
- **Icônes :** *Google Fonts / Material Symbols Outlined* — Pour une cohérence visuelle raffinée, sans surcharge d'icônes génériques.

### Contraste Noir & Blanc
Une alternance rythmée de sections sombres rétro-éclairées et de sections blanches contrastées (« *Sélection Signature* », « *Piliers d'Excellence* ») sublime la présentation des œuvres photographiques.

---

## 2. Arborescence du Projet

```text
emile-russel-photography/
│
├── assets/
│   ├── images/                      # Toutes les photographies intégrées en local (HD)
│   │   ├── hero-bg.jpg              # Image d'ambiance Hero
│   │   ├── service-*.jpg            # 6 visuels de prestations
│   │   ├── carousel-slide-*.jpg     # 4 visuels du carrousel d'art
│   │   ├── galerie-*.jpg            # 12 photographies de la galerie plein écran
│   │   ├── emile-russel-bio.jpg     # Grand portrait biographique du fondateur
│   │   ├── team-*.jpg               # Portraits de l'équipe du studio
│   │   ├── avatar-*.jpg             # Avatars des témoignages clients
│   │   └── README.md                # Inventaire exhaustif des photographies
│   └── icons/
│       └── logo.svg                 # Favicon vectoriel sur-mesure
│
├── css/
│   └── style.css                    # Feuille de styles personnalisée (variables, animations, responsive)
│
├── js/
│   └── script.js                    # Script JS interactif (filtres, lightbox, validation, chatbot)
│
├── api/
│   └── chat.js                      # Endpoint Serverless Node.js sécurisé pour Gemini AI
│
├── index.html                       # Page 1 : Accueil
├── apropos.html                     # Page 2 : À propos de l'artiste & Histoire
├── services.html                    # Page 3 : Prestations & Portfolio interactif avec Lightbox
├── contact.html                     # Page 4 : Contact, coordonnées officielles & Réservation
├── vercel.json                      # Configuration de déploiement Vercel
└── README.md                        # Documentation pédagogique et technique
```

---

## 3. Détail des 4 Pages Obligatoires

### 1. Page Accueil (`index.html`)
- **Barre de Navigation :** Logo textuel haute couture, menu responsive avec burger mobile, boutons d'action et transition de flou au défilement (*glassmorphism*).
- **Hero Section :** Image de portrait haute couture avec animation cinématique douce, badge de distinction, grand titre officiel « *CAPTURER L'INSTANT. IMMORTALISER L'ÉMOTION.* », slogan « *Chaque image raconte une histoire.* », présentation brève et compteurs de réalisations.
- **Boutons Héros :** « *Découvrir mon univers* » (ancre vers les spécialités) et « *Réserver une séance* » (lien vers `contact.html`).
- **Section Spécialités :** Présentation des 3 domaines phares (Mariage, Portrait, Mode).
- **Sélection Signature :** Section blanche contrastée mettant en valeur 3 réalisations majeures primées.
- **Carrousel Bootstrap 5 :** Galerie rétrospective plein format avec indicateurs cuivrés, flèches de navigation circulaires et légendes en verre dépoli.
- **Témoignages Clients :** Avis authentiques 5 étoiles avec portraits et contextes d'intervention.
- **Appel à l'Action Final :** Bannière de réservation directe.
- **Pied de Page :** Liens utiles, réseaux sociaux artistiques, formulaire de lettre privée et coordonnées officielles.

### 2. Page À Propos (`apropos.html`)
- **Présentation de l'Artiste :** Grand portrait d'Émile Russel en studio, biographie immersive et manifeste artistique.
- **Histoire & Vision :** Parcours de l'atelier, fondation à Abidjan et ambition internationale.
- **Valeurs Fondamentales :** 4 cartes détaillant *Créativité*, *Excellence*, *Authenticité* et *Professionnalisme*.
- **Méthode de Travail (5 Étapes) :**
  1. *Échange & Moodboard*
  2. *Direction & Préparation*
  3. *Séance de Shooting*
  4. *Post-Production d'Art*
  5. *Livraison Haute Fidélité & Tirages Fine-Art*
- **Équipe du Studio :** Présentation d'Émile Russel (Photographe Fondateur), Clara Vance (Chef Opératrice & Styliste) et Marc-Antoine Diop (Responsable Post-Production).
- **Bouton d'Action :** « *Découvrir mes réalisations* » redirigeant vers `services.html`.

### 3. Page Services & Portfolio (`services.html`)
- **Présentation des 6 Catégories Officielles :**
  1. *Photographie de Mariage d'Exception* (dès 650 000 FCFA)
  2. *Photographie de Portrait Signature* (dès 180 000 FCFA)
  3. *Photographie Événementielle de Prestige* (dès 350 000 FCFA)
  4. *Photographie de Mode & Haute Couture* (dès 450 000 FCFA)
  5. *Corporate & Professionnel* (dès 250 000 FCFA)
  6. *Photographie de Produits & Joaillerie* (dès 200 000 FCFA)
- **Boutons Fonctionnels :** Chaque carte possède un bouton « *Réserver ce service* » qui redirige vers `contact.html?service=...` et pré-remplit instantanément le formulaire.
- **Galerie Interactive Filtrable :** Filtres par catégorie en JavaScript sans rechargement de page (*Tous, Mariage, Portrait, Mode, Événementiel, Corporate, Produit*).
- **Lightbox Photographique Plein Écran :** Au clic sur une photo, ouverture d'une visionneuse grand format avec titre, catégorie, commandes Précédent/Suivant et navigation clavier (touches Flèche Gauche, Flèche Droite, Échap).

### 4. Page Contact & Réservation (`contact.html`)
- **Coordonnées Officielles de l'Entreprise :**
  - **Nom :** Émile Russel Photography
  - **Localisation :** Repère Pigier, Abidjan, Côte d'Ivoire.
  - **Lien Google Maps Officiel :** [https://maps.app.goo.gl/45yUcWM2oigWwn1c7](https://maps.app.goo.gl/45yUcWM2oigWwn1c7)
  - **E-mail :** `Pigier@gmail.com`
  - **Téléphone / WhatsApp :** `+225 07 00 00 00 00`
- **Formulaire de Réservation Complet :**
  - Nom & Prénom
  - Adresse E-mail
  - Téléphone / WhatsApp
  - Type de photographie (menu déroulant avec auto-sélection dynamique depuis l'URL)
  - Date souhaitée (sélecteur de date)
  - Lieu pressenti
  - Budget estimatif en FCFA
  - Message & vision artistique détaillée
  - Case de consentement
- **Validation Dynamique :** Contrôle instantané de validité (format e-mail, longueur minimale, numéros de téléphone) avec retours visuels en rouge cuivré.
- **Bouton Champagne Cuivré :** « *Envoyer ma demande de réservation* ».
- **Modal de Confirmation :** Pop-up de confirmation personnalisée au nom du client avec message de remerciement et réinitialisation automatique du formulaire.

---

## 4. Bonus Spéciaux Hackathon

### BONUS 1 : JavaScript Exclusif (+1 point)
Le fichier `js/script.js` orchestre une expérience utilisateur hautement interactive et sans dépendance superflue :
- **Navigation adaptative :** Réduction de la hauteur et flou d'arrière-plan de la navbar au scroll, fermeture automatique du menu burger mobile au clic sur un lien, et surlignage de la page courante.
- **Animations au Défilement (`IntersectionObserver`) :** Révélation progressive et élégante des sections au fur et à mesure du scroll.
- **Filtrage Dynamique de la Galerie :** Transition de fondu et de redimensionnement des œuvres sans saccade.
- **Lightbox Clavier & Tactile :** Gestion complète des raccourcis clavier (`Escape`, `ArrowLeft`, `ArrowRight`) et boucle circulaire des photos.
- **Pré-remplissage via URL Search Params :** Analyse de la chaîne `?service=...` pour sélectionner immédiatement la prestation choisie.
- **Validation & Modale :** Contrôle des champs de formulaire et modale de confirmation.

### BONUS 2 : Chatbot IA Gemini « Russel Assistant » (+2 points)
Sur l'ensemble des 4 pages, une bulle flottante animée en bas à droite donne accès à **Russel Assistant** :
- **Nom officiel :** Russel Assistant (Concierge Virtuel IA)
- **Message d'accueil officiel :**  
  > *« Bonjour et bienvenue chez Émile Russel Photography ! Je suis votre assistant virtuel. Comment puis-je vous aider à immortaliser vos plus beaux moments ? »*
- **Puces de suggestions rapides :** Permet aux visiteurs d'explorer d'un clic les tarifs, les modalités de réservation ou la localisation du studio.
- **Architecture Sécurisée Côté Serveur (`/api/chat.js`) :**
  - La clé API Gemini n'est **jamais exposée** dans le code client / JavaScript.
  - L'appel s'effectue via une fonction Serverless Node.js lisant la variable d'environnement `process.env.GEMINI_API_KEY`.
  - **Gestion Propre de l'Indisponibilité :** Si aucune clé n'est configurée dans l'environnement du serveur (ou en local), l'assistant affiche un message d'information transparent et professionnel (aucune simulation trompeuse) :
    > *« Notre service d'assistance IA en direct est temporairement indisponible (la clé API Gemini n'a pas encore été configurée dans les variables d'environnement du serveur). Veuillez nous contacter directement via notre page Contact ou par e-mail à Pigier@gmail.com. »*

---

## 5. Guide d'Exécution & Déploiement

### Option A : Consultation Locale Statique
Double-cliquez simplement sur `index.html` ou ouvrez-le avec l'extension VS Code **Live Server** ou tout navigateur moderne (Chrome, Firefox, Safari, Edge).  
Toutes les fonctionnalités visuelles, filtres, lightbox et validations de formulaires sont 100% opérationnelles sans serveur.

### Option B : Déploiement sur Vercel (Recommandé pour l'IA Gemini)
Le projet est configuré nativement pour la plateforme **Vercel** grâce à `vercel.json` et au dossier `/api` :

1. Déposez le projet sur un dépôt GitHub (ou utilisez Vercel CLI : `npx vercel`).
2. Dans le tableau de bord Vercel, accédez à **Settings > Environment Variables**.
3. Ajoutez la variable suivante :
   - **Key :** `GEMINI_API_KEY`
   - **Value :** *Votre clé API Google AI Studio / Gemini*
4. Déployez le projet : le chatbot IA sera instantanément connecté et interactif en temps réel !

---

## 6. Validation Pédagogique & Critères Hackathon

- [x] **HTML5 sémantique :** Balisage rigoureux (`header`, `nav`, `main`, `section`, `article`, `footer`).
- [x] **CSS3 moderne :** Variables CSS personnalisées, transitions fluides, effets de brillance et ombres douces.
- [x] **Bootstrap 5.3 :** Grille responsive, carrousel d'art, collapse mobile et utilitaires.
- [x] **Responsive Design :** Testé sur mobile (360px - 480px), tablette (768px - 1024px) et écran large (1200px+).
- [x] **Aucun lien brisé :** Tous les boutons et menus sont rigoureusement reliés aux pages et ancres du site.
- [x] **Images libres de droits de haute qualité :** Sélections d'art en haute résolution via le CDN sécurisé Unsplash.
- [x] **Bonus 1 (JavaScript exclusif) :** Fichier `js/script.js` séparé et documenté (+1 pt).
- [x] **Bonus 2 (Chatbot IA Gemini) :** Architecture sécurisée et concierge opérationnel (+2 pts).

---
*Réalisé avec passion pour le Hackathon Académique — Émile Russel Photography.*
=======
# Vitrine-du-photographe-Emile-Russel
site web Html css et javascript
>>>>>>> 4f291178a96b27d0da9e509a01df6bae1341b7ac
