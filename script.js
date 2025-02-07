// Liste de mots à afficher
const themes = {
  vacances: [
    'je pars en vacances au bord de la mer',
    'nous allons faire du camping en famille',
    'il fait chaud et le soleil brille',
    'je me repose sur un transat toute la journée',
    'nous découvrons une nouvelle ville chaque été',
  ],
  liberte: [
    'je me sens libre comme le vent',
    'chacun doit pouvoir choisir son chemin',
    'vivre sans contraintes est impossible',
    'exprimer ses idées est essentiel',
    'voyager seul procure une grande sensation de liberté',
  ],
  voyages: [
    'je découvre une nouvelle culture fascinante',
    'chaque voyage est une aventure unique',
    "prendre l'avion est toujours excitant",
    "j'aime me perdre dans les ruelles des vieilles villes",
    'dormir sous les étoiles en pleine nature est magique',
  ],
  animaux: [
    'mon chien court dans le jardin',
    'les chats aiment dormir au soleil',
    'les dauphins nagent en groupe',
    'un perroquet peut répéter des mots',
    'les éléphants vivent en groupe dans la savane',
  ],
  cuisine: [
    'je prépare un délicieux gâteau au chocolat',
    'les épices ajoutent de la saveur aux plats',
    'nous cuisinons ensemble en famille',
    'un bon repas commence avec des ingrédients frais',
    "j'adore tester de nouvelles recettes chaque semaine",
  ],
  nature: [
    'la forêt sent bon après la pluie',
    'les montagnes sont majestueuses au lever du soleil',
    'le bruit des vagues est apaisant',
    "marcher pieds nus dans l'herbe est agréable",
    'les fleurs colorées embellissent les jardins',
  ],
};

let nomJoueur = '';
// Convertit une chaine de texte en JSON 
let scoresJoueurs = JSON.parse(localStorage.getItem('scoresJoueurs')) || {};
let jeuCommence = false;
let timerGlobal;
let timerMot;
const TEMPS_PARTIE = 120; // 2 minutes
const TEMPS_PAR_MOT = {
  facile: 20,
  moyenne: 15,
  difficile: 10,
};

let mots = themes.animaux; // Thème par défaut
let tempsRestant = 20; // Valeur initiale du temps pour le niveau facile
let intervalId; // Pour stocker l'intervalle du compteur de temps
let score = 0; // Score initial
let meilleurScore = 0; // Nouveau score pour suivre le meilleur score

const affichageMot = document.getElementById('affichage-mot');
const affichageCompteur = document.createElement('div');

let motActuel = '';
let texteSaisi = ''; // Texte que l'utilisateur tape

// Fonction pour afficher un nouveau mot
function afficherNouveauMot() {
  // Réinitialiser la saisie
  texteSaisi = '';

  // Récupérer l'élément d'affichage
  const affichageMot = document.getElementById('affichage-mot');
  // Choisir un mot aléatoire
  const theme = document.getElementById('theme').value;
  const motsTheme = themes[theme];
  const indexAleatoire = Math.floor(Math.random() * motsTheme.length);
  motActuel = motsTheme[indexAleatoire];

  // Forcer la mise à jour de l'affichage
  affichageMot.textContent = motActuel;

  // Démarrer le timer mot
  demarrerTimerMot();
}

function demarrerTimerMot() {
  if (timerMot) {
    clearInterval(timerMot);
  }

  const difficulte = document.getElementById('difficulte').value;
  let tempsRestantMot = TEMPS_PAR_MOT[difficulte];
  const compteurTempsMot = document.getElementById('compteur-temps-mot');

  compteurTempsMot.textContent = `Temps mot: ${tempsRestantMot}s`;

  timerMot = setInterval(() => {
    tempsRestantMot--;
    compteurTempsMot.textContent = `Temps mot: ${tempsRestantMot}s`;

    if (tempsRestantMot <= 0) {
      clearInterval(timerMot);
      afficherNouveauMot();
    }
  }, 1000);
}

// Fonction pour obtenir le temps restant selon la difficulté
function getTempsRestant() {
  const difficulte = document.getElementById('difficulte').value;

  if (difficulte === 'facile') {
    return 20;
  } else if (difficulte === 'moyenne') {
    return 15;
  } else if (difficulte === 'difficile') {
    return 10;
  }
  return 20; // Valeur par défaut
}

// Fonction pour colorer le texte en fonction des lettres tapées
function colorerTexte() {
  let texteColoré = ''; // Chaîne qui contiendra le texte coloré

  // Parcourir chaque lettre du mot actuel et vérifier la saisie
  for (let i = 0; i < motActuel.length; i++) {
    const lettre = motActuel[i];
    // Si la lettre saisie correspond, on la colorie en violet
    if (i < texteSaisi.length && texteSaisi[i] === lettre) {
      texteColoré += `<span style="color: #9b7ed3">${lettre}</span>`;
    } else if (i < texteSaisi.length) {
      // Si la lettre est incorrecte, on la colore en rouge
      texteColoré += `<span style="color: red">${lettre}</span>`;
    } else if (lettre === ' ' && texteSaisi[i] === ' ') {
      // Si on tape un espace et qu'il correspond, on le laisse normal
      texteColoré += `<span>&nbsp;</span>`; // Utilisation de `&nbsp;` pour l'espace
    } else {
      // Sinon, la lettre reste normale
      texteColoré += `<span>${lettre}</span>`;
    }
  }

  // Mettre à jour le texte affiché avec les couleurs appropriées
  affichageMot.innerHTML = texteColoré;
  // Vérifier si la saisie complète est correcte
  if (texteSaisi === motActuel) {
    score += 10; // Ajouter des points
    scoreBouton = document.getElementById('score-bouton');
    scoreBouton.textContent = `Score : ${score}`;

    // Mettre à jour le meilleur score
    if (score > meilleurScore) {
      meilleurScore = score;
    }

    // Arrêter le timer mot actuel
    clearInterval(timerMot);

    // Réinitialiser la saisie et afficher un nouveau mot
    texteSaisi = '';
    afficherNouveauMot();
  }
}

// Fonction pour capter la saisie au clavier
function gererSaisie(e) {
  if (!jeuCommence) return;

  if (/^[a-zA-ZÀ-ÖØ-öø-ÿÂ-ÎÏ-ÏÔ-Û-ÿ]$/.test(e.key)) {
    texteSaisi += e.key.toLowerCase();
    colorerTexte();
  } else if (e.key === 'Backspace') {
    texteSaisi = texteSaisi.slice(0, -1);
    colorerTexte();
  } else if (e.key === ' ') {
    texteSaisi += ' ';
    colorerTexte();
  }
}

// Changer la liste de mots en fonction du thème sélectionné
document.getElementById('theme').addEventListener('change', function () {
  mots = themes[this.value];
  afficherNouveauMot(); // Charger un nouveau mot du thème sélectionné
});

document.getElementById('difficulte').addEventListener('change', function () {
    afficherNouveauMot();   });


// Changer la durée du temps en fonction de la difficulté sélectionnée
document.getElementById('difficulte').addEventListener('change', function () {
    scoreBouton = document.getElementById('score-bouton');
  // Réinitialiser le score et ajuster le temps
  score = 0; // Réinitialiser le score à zéro
  scoreBouton.textContent = `Score : ${score}`; // Réinitialiser le score dans le bouton
  afficherNouveauMot(); // Recharger un nouveau mot avec le temps réinitialisé
});

// Initialisation du jeu
afficherNouveauMot();

function demarrerJeu() {
  jeuCommence = true;
  const nom = document.getElementById('nom-joueur').value.trim();
  if (!nom) return;

  nomJoueur = nom;
  document.getElementById('formulaire-joueur').style.display = 'none';
  document.getElementById('conteneur-jeu').style.display = 'block';
  document.getElementById('changer-nom-btn').style.display = 'block';
  document.getElementById('tableau-scores').style.display = 'block';

  mettreAJourTableauScores();
  let tempsRestantGlobal = TEMPS_PARTIE;
  const compteurTempsGlobal = document.getElementById('compteur-temps');

  timerGlobal = setInterval(() => {
    const minutes = Math.floor(tempsRestantGlobal / 60);
    const secondes = tempsRestantGlobal % 60;
    compteurTempsGlobal.textContent = `Temps partie: ${minutes}:${secondes
      .toString()
      .padStart(2, '0')}`;

    if (tempsRestantGlobal <= 0) {
      clearInterval(timerGlobal);
      clearInterval(timerMot);
      finDePartie();
    }
    tempsRestantGlobal--;
  }, 1000);

  demarrerTimerMot();
  document.addEventListener('keydown', gererSaisie);
}

function verifierMot() {
  if (texteSaisi === motActuel) {
    clearInterval(timerMot);
    score += 10;
    document.getElementById('score-bouton').textContent = `Score : ${score}`;
    afficherNouveauMot();
  }
}

function mettreAJourTableauScores() {
  const scoresTriés = Object.entries(scoresJoueurs)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5);

  const tbody = document.getElementById('scores-body');
  tbody.innerHTML = '';

  scoresTriés.forEach(([nom, score], index) => {
    const row = tbody.insertRow();
    row.innerHTML = `
            <td>${index + 1}</td>
            <td>${nom}</td>
            <td>${score}</td>
        `;
  });
}

function finDePartie() {
  jeuCommence = false;
  document.removeEventListener('keydown', gererSaisie);
  // Arrêter tous les timers
  clearInterval(timerMot);
  clearInterval(timerGlobal);

  // Sauvegarder le score si c'est le meilleur
  if (!scoresJoueurs[nomJoueur] || score > scoresJoueurs[nomJoueur]) {
    scoresJoueurs[nomJoueur] = score;
    // Convertit scoresJoueurs en une chaîne de texte au format JSON
    localStorage.setItem('scoresJoueurs', JSON.stringify(scoresJoueurs));
  }

  // Afficher la modal de fin
  const modalHTML = `
        <div id="modal-fin-partie" class="modal">
            <div class="modal-content">
                <h2>Partie terminée!</h2>
                <p>Votre score: <span class="score-final">${score}</span></p>
                <p>Meilleur score personnel: <span class="meilleur-score">${scoresJoueurs[nomJoueur]}</span></p>
                <div class="modal-buttons">
                    <button id="btn-rejouer" class="btn-primary">Rejouer</button>
                    <button id="btn-changer-nom" class="btn-secondary" onclick="changementNom()"> Changer de nom </button>
                </div>
            </div>
        </div>
    `;

  document.body.insertAdjacentHTML('beforeend', modalHTML);
  document.getElementById('conteneur-jeu').style.display = 'none';

  document.getElementById('btn-rejouer').addEventListener('click', () => {
    document.getElementById('modal-fin-partie').remove();
    reinitialiserPartie();
  });

  document.getElementById('btn-changer-nom').addEventListener('click', () => {
    document.getElementById('modal-fin-partie').remove();
    document.getElementById('formulaire-joueur').style.display = 'block';
    document.getElementById('conteneur-jeu').style.display = 'none';
    document.getElementById('nom-joueur').value = '';
  });
}

function reinitialiserPartie() {
  // Réinitialiser le score
  score = 0;
  document.getElementById('score-bouton').textContent = `Score : ${score}`;

  // Réinitialiser l'affichage du mot
  document.getElementById('affichage-mot').textContent = '...';

  // Réafficher les éléments du jeu
  const elementsAAfficher = [
    'conteneur-jeu',
    'choix-difficulte',
    'choix-theme',
  ];

  elementsAAfficher.forEach((id) => {
    const element = document.getElementById(id);
    if (element) {
      element.style.display = 'block';
    }
  });

  // Arrêter les anciens timers
  if (timerGlobal) clearInterval(timerGlobal);
  if (timerMot) clearInterval(timerMot);

  // Réinitialiser les compteurs de temps
  document.getElementById('compteur-temps').textContent = 'Temps partie: 2:00';
  document.getElementById('compteur-temps-mot').textContent = 'Temps mot: --';

  // Redémarrer une nouvelle partie
  demarrerJeu();
}

document.addEventListener('DOMContentLoaded', function () {
  // Cacher les éléments du jeu au démarrage
  const elementsAMasquer = [
    'titre-jeu',
    'choix-difficulte',
    'choix-theme',
    'score-bouton',
    'conteneur-jeu',
  ];

  elementsAMasquer.forEach((id) => {
    document.getElementById(id).style.display = 'none';
  });

  // Gérer la soumission du formulaire
  document
    .getElementById('form-joueur')
    .addEventListener('submit', function (e) {
      e.preventDefault();
      const nom = document.getElementById('nom-joueur').value.trim();

      if (nom) {
        // Stocker le nom et masquer le formulaire
        nomJoueur = nom;
        document.getElementById('formulaire-joueur').style.display = 'none';

        // Afficher les éléments du jeu
        [
          'titre-jeu',
          'choix-difficulte',
          'choix-theme',
          'conteneur-jeu',
          'changer-nom-btn',
        ].forEach((id) => {
          const element = document.getElementById(id);
          if (element) element.style.display = 'block';
        });

        // Initialiser et démarrer la partie
        score = 0;
        document.getElementById(
          'score-bouton'
        ).textContent = `Score : ${score}`;
        demarrerJeu();
      }
    });
});

function changementNom() {
  jeuCommence = false;
  document.removeEventListener('keydown', gererSaisie);
  clearInterval(timerMot);
  clearInterval(timerGlobal);
  document.getElementById('formulaire-joueur').style.display = 'block';
  document.getElementById('nom-joueur').value = '';

  // Masquer les éléments du jeu
  [
    'titre-jeu',
    'choix-difficulte',
    'choix-theme',
    'conteneur-jeu',
    'changer-nom-btn',
  ].forEach((id) => {
    const element = document.getElementById(id);
    if (element) element.style.display = 'none';
  });

  // Arrêter les timers en cours
  if (timerGlobal) clearInterval(timerGlobal);
  if (timerMot) clearInterval(timerMot);

  // Réinitialiser le score
  score = 0;
  document.getElementById('score-bouton').textContent = `Score : ${score}`;
}
