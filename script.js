// Liste de phrases à afficher
const phrasesEcologie = [
    'Protégeons notre planète',
    'Le recyclage est important',
    'Réduire les déchets est essentiel',
    'Préservons la biodiversité',
    'Les énergies renouvelables sont l avenir'
];

const phrasesLiberte = [
    'La liberté est précieuse',
    'Chacun a le droit de s exprimer',
    'Vivre libre est un droit fondamental',
    'La démocratie garantit la liberté',
    'La liberté est une quête perpétuelle'
];

const phrasesVacances = [
    'Les vacances sont un moment de détente',
    'Voyager ouvre l esprit',
    'La plage est un endroit idéal pour se relaxer',
    'Les montagnes offrent un paysage magnifique',
    'Découvrir de nouvelles cultures est enrichissant'
];

const phrasesAnimaux = [
    'Le chat dort sur le canapé',
    'Le chien aboie fort',
    'Un éléphant se promène',
    'Les oiseaux chantent au lever du soleil',
    'Les dauphins nagent dans l océan'
];

const phrasesMusique = [
    'La musique adoucit les mœurs',
    'Un bon rythme fait danser',
    'Les notes créent une mélodie harmonieuse',
    'La musique classique est intemporelle',
    'Chanter procure du bonheur'
];

// Sélection du thème
const themeChoisi = prompt("Choisissez un thème: ecologie, liberte, vacances, animaux, musique");
let phrases;

switch (themeChoisi) {
    case 'ecologie':
        phrases = phrasesEcologie;
        break;
    case 'liberte':
        phrases = phrasesLiberte;
        break;
    case 'vacances':
        phrases = phrasesVacances;
        break;
    case 'animaux':
        phrases = phrasesAnimaux;
        break;
    case 'musique':
        phrases = phrasesMusique;
        break;
    default:
        alert("Thème non reconnu, utilisation du thème par défaut: écologie");
        phrases = phrasesEcologie;
}

// Sélection des éléments
const affichagePhrase = document.getElementById('affichage-mot');
const champSaisie = document.getElementById('champ-saisie');
const affichageScore = document.getElementById('score');
const affichageCompteur = document.createElement('div');
affichageCompteur.id = 'compteur-temps';
document.getElementById('conteneur-jeu').appendChild(affichageCompteur);

let score = 0;
let phraseActuelle = '';
let tempsRestant = 10;
let intervalId;

// Fonction pour afficher une nouvelle phrase
function afficherNouvellePhrase() {
    tempsRestant = 10;
    affichageCompteur.textContent = `Temps restant: ${tempsRestant}s`;

    const indexAleatoire = Math.floor(Math.random() * phrases.length);
    phraseActuelle = phrases[indexAleatoire];
    affichagePhrase.textContent = phraseActuelle;

    clearInterval(intervalId);
    intervalId = setInterval(function() {
        tempsRestant--;
        affichageCompteur.textContent = `Temps restant: ${tempsRestant}s`;

        if (tempsRestant <= 0) {
            clearInterval(intervalId);
            afficherNouvellePhrase();
        }
    }, 1000);
}

// Vérifier si la phrase saisie est correcte
champSaisie.addEventListener('input', function() {
    if (champSaisie.value.trim() === phraseActuelle) {
        score += 10;
        affichageScore.textContent = `Score: ${score}`;
        champSaisie.value = '';
        afficherNouvellePhrase();
    }
});

// Initialisation du jeu
afficherNouvellePhrase();