// Liste de mots à afficher
const themes = {
    vacances: [
    "je pars en vacances au bord de la mer",
    "nous allons faire du camping en famille",
    "il fait chaud et le soleil brille",
    "je me repose sur un transat toute la journée",
    "nous découvrons une nouvelle ville chaque été"
    ],
    liberte: [
    "je me sens libre comme le vent",
    "chacun doit pouvoir choisir son chemin",
    "vivre sans contraintes est impossible",
    "exprimer ses idées est essentiel",
    "voyager seul procure une grande sensation de liberté"
    ],
    voyages: [
    "je découvre une nouvelle culture fascinante",
    "chaque voyage est une aventure unique",
    "prendre l'avion est toujours excitant",
    "j'aime me perdre dans les ruelles des vieilles villes",
    "dormir sous les étoiles en pleine nature est magique"
    ],
    animaux: [
    "mon chien court dans le jardin",
    "les chats aiment dormir au soleil",
    "les dauphins nagent en groupe",
    "un perroquet peut répéter des mots",
    "les éléphants vivent en groupe dans la savane"
    ],
    cuisine: [
    "je prépare un délicieux gâteau au chocolat",
    "les épices ajoutent de la saveur aux plats",
    "nous cuisinons ensemble en famille",
    "un bon repas commence avec des ingrédients frais",
    "j'adore tester de nouvelles recettes chaque semaine"
    ],
    nature: [
    "la forêt sent bon après la pluie",
    "les montagnes sont majestueuses au lever du soleil",
    "le bruit des vagues est apaisant",
    "marcher pieds nus dans l'herbe est agréable",
    "les fleurs colorées embellissent les jardins"
    ]
   };
   
   let mots = themes.animaux; // Thème par défaut
   let tempsRestant = 20; // Valeur initiale du temps pour le niveau facile
   let intervalId; // Pour stocker l'intervalle du compteur de temps
   let score = 0; // Score initial
   let meilleurScore = 0; // Nouveau score pour suivre le meilleur score
   
   // Sélection des éléments
   const affichageMot = document.getElementById('affichage-mot');
   const affichageCompteur = document.createElement('div');
   affichageCompteur.id = 'compteur-temps';
   document.getElementById('conteneur-jeu').appendChild(affichageCompteur);
   
   // Création du bouton pour afficher le meilleur score
   const meilleurScoreBouton = document.createElement('button');
   meilleurScoreBouton.id = 'meilleur-score-bouton';
   meilleurScoreBouton.textContent = `Meilleur Score : ${meilleurScore}`;
   document.getElementById('conteneur-jeu').appendChild(meilleurScoreBouton);
   
   // Création du bouton pour afficher le score actuel
   const scoreBouton = document.createElement('button');
   scoreBouton.id = 'score-bouton';
   scoreBouton.textContent = `Score : ${score}`;
   document.getElementById('conteneur-jeu').appendChild(scoreBouton);
   
   let motActuel = '';
   let texteSaisi = ''; // Texte que l'utilisateur tape
   
   // Fonction pour afficher un nouveau mot
   function afficherNouveauMot() {
    // Réinitialiser la variable texteSaisi et réinitialiser le texte affiché
    texteSaisi = '';
    affichageMot.textContent = motActuel;
   
    // Choisir un mot aléatoire
    const indexAleatoire = Math.floor(Math.random() * mots.length);
    motActuel = mots[indexAleatoire];
    affichageMot.textContent = motActuel;
   
    // Réinitialiser le temps restant
    tempsRestant = getTempsRestant(); // Fonction pour récupérer la valeur du temps en fonction de la difficulté
    affichageCompteur.textContent = `Temps restant : ${tempsRestant}s`;
   
    // Lancer un compteur de temps
    clearInterval(intervalId); // Si un compteur précédent existe, on l'arrête
    intervalId = setInterval(function() {
    tempsRestant--;
    affichageCompteur.textContent = `Temps restant : ${tempsRestant}s`;
   
    // Si le temps est écoulé
    if (tempsRestant <= 0) {
    clearInterval(intervalId); // Arrêter le compteur
    afficherNouveauMot(); // Afficher un nouveau mot après le temps écoulé
    }
    }, 1000); // Décrémenter toutes les secondes
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
    } else if (lettre === " " && texteSaisi[i] === " ") {
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
    scoreBouton.textContent = `Score : ${score}`; // Mettre à jour le score dans son bouton
   
    // Mettre à jour le meilleur score
    if (score > meilleurScore) {
    meilleurScore = score;
    meilleurScoreBouton.textContent = `Meilleur Score : ${meilleurScore}`; // Mettre à jour le meilleur score
    }
   
    afficherNouveauMot(); // Afficher un nouveau mot
    }
   }
   
   // Fonction pour capter la saisie au clavier
   document.addEventListener('keydown', function(e) {
    // Permettre tous les caractères alphabétiques, y compris les lettres accentuées et les lettres avec circonflexes
    if (/^[a-zA-ZÀ-ÖØ-öø-ÿÂ-ÎÏ-ÏÔ-Û-ÿ]$/.test(e.key)) {
    texteSaisi += e.key.toLowerCase(); // Ajouter la lettre à la saisie
    colorerTexte(); // Recolorer le texte à chaque nouvelle lettre
    } else if (e.key === 'Backspace') {
    // Si on appuie sur Backspace, on efface la dernière lettre du texteSaisi
    texteSaisi = texteSaisi.slice(0, -1);
    colorerTexte(); // Recolorer après l'effacement
    } else if (e.key === ' ') {
    // Si on tape un espace, on l'ajoute à la saisie
    texteSaisi += ' ';
    colorerTexte(); // Recolorer après avoir tapé un espace
    }
   });
   
   // Changer la liste de mots en fonction du thème sélectionné
   document.getElementById('theme').addEventListener('change', function() {
    mots = themes[this.value];
    afficherNouveauMot(); // Charger un nouveau mot du thème sélectionné
   });
   
   // Changer la durée du temps en fonction de la difficulté sélectionnée
   document.getElementById('difficulte').addEventListener('change', function() {
    // Réinitialiser le score et ajuster le temps
    score = 0; // Réinitialiser le score à zéro
    scoreBouton.textContent = `Score : ${score}`; // Réinitialiser le score dans le bouton
   
    afficherNouveauMot(); // Recharger un nouveau mot avec le temps réinitialisé
   });
   
   // Initialisation du jeu
   afficherNouveauMot();