/**
 * Émile Russel Photography - Serverless API Backend pour Russel Assistant (Gemini AI)
 * Architecture sécurisée : La clé API Gemini reste strictement côté serveur via variables d'environnement.
 */

export default async function handler(req, res) {
  // En-têtes CORS
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Méthode non autorisée. Utilisez POST.' });
  }

  const apiKey = process.env.GEMINI_API_KEY;

  // Vérification de sécurité : si aucune clé API n'est configurée dans l'environnement
  if (!apiKey || apiKey.trim() === '' || apiKey === 'VOTRE_CLE_API_GEMINI') {
    return res.status(503).json({
      status: 'unavailable',
      error: 'API_KEY_NOT_CONFIGURED',
      message: "Notre service d'assistance IA en direct est temporairement indisponible (la clé API Gemini n'a pas encore été configurée dans les variables d'environnement du serveur). Veuillez nous contacter directement via notre page Contact ou par e-mail à Pigier@gmail.com."
    });
  }

  const { message, history } = req.body || {};

  if (!message || typeof message !== 'string') {
    return res.status(400).json({ error: 'Le champ message est requis.' });
  }

  const systemInstruction = `Tu es "Russel Assistant", l'assistant virtuel et concierge de luxe officiel de l'atelier photographique "ÉMILE RUSSEL PHOTOGRAPHY".

TON ET STYLE :
- Ton : Prestigieux, courtois, chaleureux, haut de gamme, raffiné et très professionnel.
- Langue : Français soigné et élégant.
- Toujours valoriser l'art de capturer l'émotion et l'excellence du studio d'Émile Russel.

INFORMATIONS OFFICIELLES DU STUDIO :
- Photographe Fondateur : Émile Russel, photographe d'art et portraitiste d'exception.
- Slogan : "Chaque image raconte une histoire." & "CAPTURER L'INSTANT. IMMORTALISER L'ÉMOTION."
- Localisation : Abidjan, Côte d'Ivoire (Repère : Pigier, lien Google Maps officiel : https://maps.app.goo.gl/45yUcWM2oigWwn1c7).
- E-mail officiel : Pigier@gmail.com
- Téléphone : +225 07 00 00 00 00 / +225 27 20 00 00 00.
- Horaires : Du lundi au samedi de 09h00 à 19h00 (séances privées le dimanche sur demande).

PRESTATIONS & TARIFS INDICATIFS (EN FCFA) :
1. Photographie de Mariage d'Exception : dès 650 000 FCFA (reportage complet des préparatifs à la soirée, galerie 4K privée, album d'art relié cuir).
2. Photographie de Portrait Signature : dès 180 000 FCFA (séance studio ou extérieur, travail de lumière cinématique, retouche haute couture).
3. Photographie Événementielle de Prestige : dès 350 000 FCFA (galas, lancements de marque, réceptions privées, remise express des visuels).
4. Photographie de Mode & Haute Couture : dès 450 000 FCFA (lookbooks, éditoriaux magazines, campagnes publicitaires).
5. Photographie Corporate & Image de Marque : dès 250 000 FCFA (portraits exécutifs, trombinoscopes de direction, reportages d'entreprise).
6. Photographie de Produits & Joaillerie (Packshot Luxe) : dès 200 000 FCFA (mise en valeur de montres, parfums, gastronomie, objets d'art).

RÈGLES DE RÉPONSE :
- Réponds avec concision et élégance (2 à 4 paragraphes maximum).
- Si le client souhaite réserver, invite-le chaleureusement à se rendre sur la page "Contact / Réservation" (contact.html) pour remplir le formulaire personnalisé, ou à écrire à Pigier@gmail.com.
- Ne jamais inventer de fausses adresses ou d'autres coordonnées que celles de Pigier / Émile Russel.`;

  try {
    const geminiEndpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;

    // Construction du format de requêtes pour l'API Gemini
    const contents = [];

    // Historique préalable éventuel
    if (Array.isArray(history)) {
      history.slice(-6).forEach(h => {
        contents.push({
          role: h.role === 'user' ? 'user' : 'model',
          parts: [{ text: h.text }]
        });
      });
    }

    // Message actuel de l'utilisateur
    contents.push({
      role: 'user',
      parts: [{ text: message }]
    });

    const response = await fetch(geminiEndpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: contents,
        systemInstruction: {
          parts: [{ text: systemInstruction }]
        },
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 600
        }
      })
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('Erreur API Gemini :', errorData);
      return res.status(response.status).json({
        status: 'error',
        error: errorData.error?.message || 'Erreur lors de la communication avec Gemini AI.',
        message: "Une erreur est survenue lors de la communication avec l'assistant. Merci de nous contacter directement par e-mail à Pigier@gmail.com."
      });
    }

    const data = await response.json();
    const botReply = data.candidates?.[0]?.content?.parts?.[0]?.text || "Je reste à votre entière disposition pour tout renseignement complémentaire.";

    return res.status(200).json({
      status: 'success',
      reply: botReply
    });
  } catch (error) {
    console.error('Erreur serveur API Gemini :', error);
    return res.status(500).json({
      status: 'error',
      error: error.message,
      message: "Service temporairement indisponible. Veuillez nous contacter via la page Contact ou par e-mail à Pigier@gmail.com."
    });
  }
}
