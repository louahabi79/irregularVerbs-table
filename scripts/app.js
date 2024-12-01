let verbs = [
  ["abide", "abode", "abode", "demeurer"],
  ["awake", "awoke", "awoken", "(se) réveiller, aussi awake/awoke/awoke"],
  ["be", "was/were", "been", "être"],
  ["bear", "bore", "borne", "porter/supporter/soutenir"],
  ["beat", "beat", "beaten", "battre"],
  ["become", "became", "become", "become"],
  ["beget", "begat", "begotten", "engendrer, aussi beget/begot/begotten"],
  ["begin", "began", "begun", "commencer"],
  ["bend", "bent", "bent", "se courber, etc."],
  ["bereave", "bereft", "bereft", "déposséder/priver"],
  ["bring", "brought", "brought", "apporter"],
  ["build", "built", "built", "construire"],
  ["burn", "burnt", "burnt", "brûler"],
  ["burst", "burst", "burst", "éclater"],
  ["buy", "bought", "", "acheter"],
  ["cast", "cast", "cast", "jeter, etc."],
  ["catch", "caught", "caught", "attraper"],
  ["chide", "chid", "chidden", "gronder/réprimander, aussi chide/chid/chid"],
  ["choose", "chose", "chosen", "choisir"],
  ["cleave", "cleft", "cleft", "fendre/coller, aussi cleave/clove/clove"],
  ["cling", "clung", "clung", "se cramponner"],
  ["come", "came", "come", "venir"],
  ["cost", "cost", "cost", "coûter"],
  ["creep", "crept", "crept", "ramper/se glisser/se hérisser"],
  ["crow", "crew", "crowed", "chanter (un coq)/jubiler"],
  ["cut", "cut", "cut", "couper"],
  ["deal", "dealt", "dealt", "distribuer/traiter"],
  ["dig", "dug", "dug", "bêcher"],
  ["do", "did", "", "faire"],
  ["draw", "drew", "drawn", "tirer/dessiner"],
  ["dream", "dreamt", "dreamt", "rêver"],
  ["drink", "drank", "drunk", "boire"],
  ["drive", "drove", "driven", "conduire"],
  ["dwell", "dwelt", "dwelt", "habiter/rester"],
  ["eat", "ate", "eaten", "manger"],
  ["fall", "fell", "fallen", "tomber"],
  ["feed", "fed", "fed", "nourrir"],
  ["feel", "felt", "felt", "(se) sentir"],
  ["fight", "fought", "fought", "combattre"],
  ["find", "found", "found", "trouver"],
];

// Tableau pour stocker les lettres uniques des liens de verbes
let lettersInLinks = [];

// Objet pour compter le nombre de verbes par lettre
let letterCounts = {};

// Variables pour gérer la mise à jour des verbes
let updateVerbFunctionIndex = 0;
let isVerbUpdated = false;
let updatedVerbIndex;

// Sélection des éléments du DOM pour différentes interactions
const tableContainerElement = document.querySelector(".table-container");
const rightPanelElement = document.getElementById("right-panel");
const tableContentElement = document.getElementById("table-content");
const rightArrowElement = document.getElementsByClassName("bxs-right-arrow");
const leftArrowElement = document.getElementsByClassName("bxs-left-arrow");
const lettersStatElement = document.getElementById("letters-stat");
const verbsAverageElement = document.getElementById("verbs-average");
const listOfLettersLinkElement = document.getElementById(
  "list-of-letters-link"
);

// Éléments pour la configuration et l'ajout de verbes
const addVerbOverlayElement = document.getElementById("add-verb-overlay");
const backdropElement = document.getElementById("backdrop");
const formElement = document.getElementById("add-verb-form");
const configErrorsElement = document.getElementById("config-errors");
const verbInputElements = document.querySelectorAll(".form-control input");
const searchInputElement = document.getElementById("find-verb");
const addVerbH2Element = document.querySelector(".add-verb-h2");
const updateVerbH2Element = document.querySelector(".update-verb-h2");

// Éléments pour la modal de détails des verbes
const modal = document.getElementById("verbDetailsModal");
const modalTitle = document.getElementById("verbModalTitle");
const detailsContent = document.getElementById("verbDetailsContent");

// Sélection des boutons principaux
const addVerbBtnElement = document.getElementById("add-btn");
const cancelConfigBtnElement = document.getElementById("cancel-config-btn");
const confirmFormBtnElement = document.getElementById("confirm-btn");
const findVerbBtnElement = document.getElementById("find-btn");
const closeBtn = document.querySelector(".close-btn");
const closeBtnFooter = document.querySelector(".btn-close");

// Événement déclenché au chargement de la page
window.addEventListener("load", initialize);

// Événements pour les boutons de navigation du panneau
leftArrowElement[0].addEventListener("click", showPanel);
leftArrowElement[1].addEventListener("click", showPanel);
rightArrowElement[0].addEventListener("click", hidePanel);
rightArrowElement[1].addEventListener("click", hidePanel);

// Événements pour l'ajout et la configuration des verbes
addVerbBtnElement.addEventListener("click", openAddVerbConfig);
cancelConfigBtnElement.addEventListener("click", closePlayerConfig);
backdropElement.addEventListener("click", closePlayerConfig);

// Événement de soumission du formulaire d'ajout de verbe
formElement.addEventListener("submit", saveAddedVerb);

// Effacer les erreurs lors de la saisie
verbInputElements[0].addEventListener("input", clearError);

// Événement pour rechercher un verbe
findVerbBtnElement.addEventListener("click", findVerb);

// Événements délégués pour les actions sur les verbes
document.body.addEventListener("click", showVerbDetails);
document.body.addEventListener("click", deleteVerb);
document.body.addEventListener("click", updateVerb);

// Événements pour fermer la modal
closeBtn.addEventListener("click", closeModal);
closeBtnFooter.addEventListener("click", closeModal);

// Fermer la modal si l'utilisateur clique en dehors
window.addEventListener("click", (event) => {
  if (event.target === modal) {
    closeModal();
  }
});
