// Fonction pour charger et afficher les verbes dans le tableau
function verbsLoading() {
  // Réinitialiser le contenu du tableau
  tableContentElement.innerHTML = "";
  let index = 0;

  // Parcourir chaque verbe dans le tableau 'verbs'
  for (const verb of verbs) {
    // Créer une nouvelle ligne de tableau pour chaque verbe
    const row = document.createElement("tr");
    row.setAttribute("id", `verb-${index}`);
    row.setAttribute("data-verbid", index);

    // Générer le HTML de la ligne avec les informations du verbe et les boutons d'action
    row.innerHTML = `
                <td>${verb[0]}</td>
                <td>${verb[1]}</td>
                <td>${verb[2]}</td>
                <td>${verb[3]}</td>
                <td>
                  <input
                    type="button"
                    name="edit"
                    id="edit-btn-${index}"
                    value="Edit"
                    class="btn edit-btn"
                  />
                  <input
                    type="button"
                    name="update"
                    id="update-btn-${index}"
                    value="Update"
                    class="btn update-btn"
                  />
                  <input
                    type="button"
                    name="delete"
                    id="delete-btn-${index}"
                    value="delete"
                    class="btn delete-btn"
                  />
                </td>
              `;

    // Ajouter la ligne au tableau
    tableContentElement.append(row);
    console.log(index);
    index++;

    // Vérifier et surligner les cellules vides en rouge
    for (let i = 0; i < 4; i++) {
      if (row.children[i].innerText == "") {
        row.children[i].style.border = "2px solid red";
      }
    }
  }
}

// Fonction pour sauvegarder un nouveau verbe ou mettre à jour un verbe existant
function saveAddedVerb(event) {
  // Empêcher le comportement par défaut du formulaire
  event.preventDefault();

  // Récupérer les données du formulaire
  const formData = new FormData(event.target);
  const enteredBaseFormVerb = formData.get("baseForm").toLowerCase().trim();

  // Valider la présence d'un verbe de base
  if (!enteredBaseFormVerb) {
    configErrorsElement.innerText = "Please provide a valid verb!";
    configErrorsElement.style.marginBottom = "0.3rem";
    formElement.firstElementChild.classList.add("config-error");
    return;
  }

  // Récupérer les autres formes du verbe
  const enteredPastTenseVerb = formData.get("pastTense").toLowerCase().trim();
  const enteredPastParticipateVerb = formData
    .get("pastParticiple")
    .toLowerCase()
    .trim();
  const enteredTranslation = formData.get("Translation").toLowerCase().trim();

  let isVerbAlreadyExist = false;

  // Vérifier s'il s'agit d'une mise à jour ou d'un ajout
  if (isVerbUpdated) {
    // Remplacer le verbe existant à l'index spécifié
    verbs[updatedVerbIndex] = [
      enteredBaseFormVerb,
      enteredPastTenseVerb,
      enteredPastParticipateVerb,
      enteredTranslation,
    ];

    isVerbUpdated = false;
  } else {
    // Vérifier si le verbe existe déjà dans la liste
    verbs.map((elem) => {
      if (elem[0] == enteredBaseFormVerb) {
        alert("This verb is already on the list! Please add another verb.");
        isVerbAlreadyExist = true;
      }
    });

    // Annuler l'ajout si le verbe existe déjà
    if (isVerbAlreadyExist) return;

    // Créer un nouveau verbe et l'ajouter à la liste
    const newVerb = [
      enteredBaseFormVerb,
      enteredPastTenseVerb,
      enteredPastParticipateVerb,
      enteredTranslation,
    ];
    verbs.push(newVerb);
  }

  // Trier les verbes et réinitialiser l'affichage
  verbs.sort();
  closePlayerConfig();
  initialize();
}

// Fonction pour rechercher et mettre en avant un verbe spécifique
function findVerb() {
  // Récupérer la valeur de recherche et la nettoyer
  const searchInput = searchInputElement.value.trim();

  // Vérifier que la recherche n'est pas vide
  if (!searchInput) {
    alert("Please Provide a Valid Verb!");
    return;
  }

  let i;
  let statut = false;

  // Parcourir la liste des verbes pour trouver une correspondance
  for (i = 0; i < verbs.length; i++) {
    for (let j = 0; j < 1; j++) {
      if (verbs[i][j] == searchInput) {
        statut = true;
        break;
      }
    }
    if (statut) break;
  }

  // Gérer le cas où le verbe n'est pas trouvé
  if (!statut) {
    alert(`The verb "${searchInput}" is not in the list!`);
    return;
  }

  // Déplacer le verbe trouvé au début de la liste
  const foundedVerb = verbs.splice(i, 1)[0];
  verbs.unshift(foundedVerb);

  // Recharger le tableau avec la nouvelle disposition
  verbsLoading();
}

// Fonction pour créer des liens de navigation par lettre
function createLinkToVerbs() {
  // Réinitialiser la liste des liens
  listOfLettersLinkElement.innerHTML = "";
  lettersInLinks = [];

  let index = 0;

  // Parcourir les verbes pour créer des liens par première lettre
  verbs.forEach((verb) => {
    const firstLetter = verb[0][0];

    // Ajouter un lien unique pour chaque première lettre
    if (!lettersInLinks.includes(firstLetter)) {
      const link = document.createElement("li");
      link.innerHTML = `
                  Here is a link to
                  <a href="#verb-${index}"
                    >verbs that starts with the letter
                    <span class="letter">${firstLetter}</span></a
                  >
                `;
      listOfLettersLinkElement.append(link);
      lettersInLinks.push(firstLetter);
    }
    index++;
  });
}
