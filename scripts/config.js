// Afficher le panneau latéral et ajuster la disposition
function showPanel(event) {
  // Ajouter des classes pour ajuster la largeur du tableau et du panneau
  tableContainerElement.classList.add("adjust-table");
  rightPanelElement.classList.add("adjust-panel");

  // Gestion de la visibilité des flèches de navigation
  if (event.target.parentElement.classList.contains("arrows")) {
    if (event.target.classList.contains("bxs-left-arrow")) {
      leftArrowElement[1].style.display = "none";
      rightArrowElement[1].style.display = "block";
    } else {
      leftArrowElement[1].style.display = "block";
      rightArrowElement[1].style.display = "none";
    }
    return;
  }

  // Masquer la flèche cliquée et afficher l'autre flèche
  event.target.style.display = "none";
  if (event.target == leftArrowElement[1]) {
    rightArrowElement[1].style.display = "block";
  } else leftArrowElement[1].style.display = "block";
}

// Masquer le panneau latéral et réinitialiser la disposition
function hidePanel(event) {
  // Supprimer les classes d'ajustement
  tableContainerElement.classList.remove("adjust-table");
  rightPanelElement.classList.remove("adjust-panel");

  // Logique similaire à showPanel pour gérer la visibilité des flèches
  if (event.target.parentElement.classList.contains("arrows")) {
    if (event.target.classList.contains("bxs-left-arrow")) {
      leftArrowElement[1].style.display = "none";
      rightArrowElement[1].style.display = "block";
    } else {
      leftArrowElement[1].style.display = "block";
      rightArrowElement[1].style.display = "none";
    }
    return;
  }

  event.target.style.display = "none";
  if (event.target == leftArrowElement[1]) {
    rightArrowElement[1].style.display = "block";
  } else leftArrowElement[1].style.display = "block";
}

// Ouvrir l'overlay de configuration pour ajouter un verbe
function openAddVerbConfig(event) {
  // Afficher l'overlay et le fond
  addVerbOverlayElement.style.display = "block";
  backdropElement.style.display = "block";
}

// Fermer la configuration et réinitialiser le formulaire
function closePlayerConfig() {
  // Masquer l'overlay et le fond
  addVerbOverlayElement.style.display = "none";
  backdropElement.style.display = "none";

  // Réinitialiser les titres et l'état de mise à jour
  updateVerbH2Element.style.display = "none";
  addVerbH2Element.style.display = "block";

  // Effacer les messages d'erreur
  configErrorsElement.innerText = "";
  formElement.firstElementChild.classList.remove("config-error");

  // Réinitialiser l'état de mise à jour
  isVerbUpdated = false;

  // Vider tous les champs de saisie
  for (const input of verbInputElements) {
    input.value = "";
  }
}

// Effacer les erreurs de validation lors de la saisie
function clearError() {
  formElement.firstElementChild.classList.remove("config-error");
  configErrorsElement.innerText = "";
}

// Mettre à jour un verbe existant
function updateVerb(event) {
  // Vérifier si le bouton de mise à jour a été cliqué
  if (event.target && event.target.classList.contains("update-btn")) {
    // Extraire l'index du verbe à partir de l'ID du bouton
    const updateVerbBtnId = event.target.getAttribute("id");
    const match = updateVerbBtnId.match(/\d+$/);

    if (match) {
      const index = parseInt(match[0]);

      // Remplir les champs de formulaire avec les données du verbe sélectionné
      const choosenVerb = verbs[index];
      for (const input of verbInputElements) {
        input.value = choosenVerb[updateVerbFunctionIndex];
        updateVerbFunctionIndex++;
      }

      // Réinitialiser l'index et configurer l'état de mise à jour
      updateVerbFunctionIndex = 0;
      updateVerbH2Element.style.display = "block";
      addVerbH2Element.style.display = "none";
      isVerbUpdated = true;
      updatedVerbIndex = index;

      // Ouvrir la configuration
      openAddVerbConfig();
    } else {
      console.error("ID format is invalid. No digits found at the end.");
    }
  }
}

// Supprimer un verbe de la liste
function deleteVerb(event, index) {
  // Supprimer par index passé directement
  if (index) {
    verbs.splice(index, 1);
    verbsLoading();
  }
  // Supprimer via le bouton de suppression
  else if (event.target && event.target.classList.contains("delete-btn")) {
    const deletVerbBtnId = event.target.getAttribute("id");
    const index = parseInt(deletVerbBtnId.match(/\d+$/)[0]);
    verbs.splice(index, 1);
    verbsLoading();
  }
}

// Fonction pour activer les liens des lettres
function activateLinks() {
  document.querySelectorAll("#list-of-letters-link a").forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();

      // Extraire la lettre du lien
      const targetLetter = link
        .querySelector(".letter")
        .textContent.toLowerCase();

      // Trouver la première ligne de verbe commençant par cette lettre
      const targetRow = Array.from(
        document.querySelectorAll("#table-content tr")
      ).find((row) => {
        const verbFirstLetter = row
          .querySelector("td:first-child")
          .textContent.toLowerCase()
          .charAt(0);
        return verbFirstLetter === targetLetter;
      });

      // Réinitialiser la mise en évidence
      document.querySelectorAll("#table-content tr").forEach((row) => {
        row.classList.remove("highlight");
      });

      // Faire défiler et mettre en évidence la ligne
      if (targetRow) {
        targetRow.scrollIntoView({ behavior: "smooth", block: "center" });
        targetRow.classList.add("highlight");
      }
    });
  });
}

// Calculer et afficher les statistiques sur les verbes
function statistics() {
  // Supprimer les statistiques dynamiques précédentes
  const statsListItems = lettersStatElement.querySelectorAll("li.dynamic-stat");
  statsListItems.forEach((item) => item.remove());

  // Réinitialiser le comptage des lettres
  letterCounts = {};

  // Compter les occurrences de chaque première lettre
  verbs.forEach((verb) => {
    const firstLetter = verb[0][0];
    if (letterCounts[firstLetter]) {
      letterCounts[firstLetter]++;
    } else {
      letterCounts[firstLetter] = 1;
    }
  });

  let totalVerbs = 0;
  let uniqueLetters = 0;

  // Ajouter dynamiquement de nouvelles statistiques
  Object.entries(letterCounts).forEach(([letter, count]) => {
    const letterStatElement = document.createElement("li");
    letterStatElement.classList.add("dynamic-stat");
    letterStatElement.innerHTML = `${letter} → ${count}`;
    lettersStatElement.append(letterStatElement);
    totalVerbs += count;
    uniqueLetters++;
  });

  // Mettre à jour la moyenne des verbes
  const verbsAverage = uniqueLetters > 0 ? totalVerbs / uniqueLetters : 0;
  const averageSpan = document.querySelector("#verbs-average");
  if (averageSpan) {
    averageSpan.innerText = parseInt(verbsAverage);
  }
}

// Afficher les détails d'un verbe dans une modal
function showVerbDetails(event) {
  // Vérifier si un bouton de détails a été cliqué
  if (event.target && event.target.classList.contains("edit-btn")) {
    const VerbDetailsBtnId = event.target.getAttribute("id");
    const index = parseInt(VerbDetailsBtnId.match(/\d+$/)[0]);
    const verb = verbsDetails[index];

    // Définir le titre de la modal
    modalTitle.textContent = `More Details about The Verb: "${verbs[
      index
    ][0].toUpperCase()}"`;

    // Générer le contenu HTML de la modal
    detailsContent.innerHTML = `
    <div class="verb-details">
        <div class="detail-section">
            <h3>Basic information</h3>
            <div class="detail-content">
                <p><strong>Translation:</strong> ${verbs[index][3]}</p>
                <p><strong>Definition:</strong> ${verb.definition}</p>
            </div>
        </div>

        <div class="detail-section">
            <h3>Synonyms</h3>
            <div class="synonyms-list">
                ${verb.synonyms
                  .map((syn) => `<span class="synonym-tag">${syn}</span>`)
                  .join("")}
            </div>
        </div>
    </div>

    <div class="verb-details">
        <div class="detail-section">
            <h3>Examples of use</h3>
            <div class="examples-list">
                ${verb.examples
                  .map(
                    (ex) => `
                    <div class="example-item">"${ex}"</div>
                `
                  )
                  .join("")}
            </div>
        </div>

        <div class="detail-section">
            <h3>Associated Images</h3>
            <div class="images-container">
                ${verb.images
                  .map(
                    (img) => `
                    <img src="${img}" alt="Image de ${verb.name}">
                `
                  )
                  .join("")}
            </div>
        </div>
    </div>
`;

    // Afficher la modal
    modal.style.display = "block";
  }
}

// Fermer la modal
const closeModal = () => {
  modal.style.display = "none";
};

// Initialiser l'application
function initialize() {
  verbsLoading(); // Peupler le tableau
  createLinkToVerbs(); // Créer les liens pour les lettres
  activateLinks(); // Activer les événements sur les liens
  statistics(); // Afficher les statistiques
}
