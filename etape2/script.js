"use strict";

// Fonction et paramètres : chapitre 4, diapositive 45.
// Accès au DOM et création/modification d'éléments : diapositives 76 et 86-87.
function doInsertRowTable(num, nom, prenom, points) {
  const corps = document.querySelector("#personnes tbody");
  const ligne = document.createElement("tr");
  ligne.setAttribute("class", "row");

  // Tableau de valeurs et parcours forEach : diapositives 38 et 44.
  const valeurs = [num, nom, prenom, points];
  valeurs.forEach(function (valeur, index) {
    const cellule = document.createElement("td");
    // Condition if...else : diapositive 42.
    if (index === 1 || index === 2) {
      cellule.setAttribute("class", "col_text");
    } else {
      cellule.setAttribute("class", "col_number");
    }
    cellule.innerText = valeur;
    ligne.appendChild(cellule);
  });

  // Attributs et ajout d'un enfant dans le DOM : diapositives 86-87.
  const celluleSelection = document.createElement("td");
  celluleSelection.setAttribute("class", "col_chkbox");
  const caseSelection = document.createElement("input");
  caseSelection.setAttribute("type", "checkbox");
  caseSelection.setAttribute("aria-label", "Sélectionner la ligne " + num);
  celluleSelection.appendChild(caseSelection);
  ligne.appendChild(celluleSelection);
  corps.appendChild(ligne);
}

// Événement de clic et appel de fonction : chapitre 4, diapositives 45 et 129-133.
document.getElementById("ajouter").addEventListener("click", function () {
  doInsertRowTable(99, "nom", "prenom", 10);
});
