// Liste de mots à afficher
const mots = ['voiture', 'maison', 'ordinateur', 'chat', 'chien', 'arbre', 'liberté', 'éléphant'];

// Sélection des éléments
const affichageMot = document.getElementById('affichage-mot');
const champSaisie = document.getElementById('champ-saisie');
const affichageScore = document.getElementById('score');
const affichageCompteur = document.createElement('div');
affichageCompteur.id = 'compteur-temps';
document.getElementById('conteneur-jeu').appendChild(affichageCompteur);

let score = 0;
let motActuel = '';
let tempsRestant = 10; // Durée du temps (en secondes)
let intervalId; // Pour stocker l'intervalle du compteur de temps

// Fonction pour afficher un nouveau mot
function afficherNouveauMot() {
    // Réinitialiser le temps
    tempsRestant = 10;
    affichageCompteur.textContent = `Temps restant: ${tempsRestant}s`;

    const indexAleatoire = Math.floor(Math.random() * mots.length);
    motActuel = mots[indexAleatoire];
    affichageMot.textContent = motActuel;

    // Lancer un compteur de temps
    clearInterval(intervalId); // Si un compteur précédent existe, on l'arrête
    intervalId = setInterval(function() {
        tempsRestant--;
        affichageCompteur.textContent = `Temps restant: ${tempsRestant}s`;

        // Si le temps est écoulé
        if (tempsRestant <= 0) {
            clearInterval(intervalId); // Arrêter le compteur
            afficherNouveauMot(); // Afficher un nouveau mot après le temps écoulé
        }
    }, 1000); // Décrémenter toutes les secondes
}

// Vérifier si le mot saisi est correct
champSaisie.addEventListener('input', function() {
    if (champSaisie.value === motActuel) {
        score += 10; // Ajouter des points
        affichageScore.textContent = `Score: ${score}`;
        champSaisie.value = ''; // Effacer le champ de saisie
        afficherNouveauMot(); // Afficher un nouveau mot
    }
});

// Initialisation du jeu
afficherNouveauMot();