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

// Tableau d'objets et variables : chapitre 4, diapositives 37-40.
const persons = [
  { nom: "nom-1", prenom: "prenom-1", points: 5 },
  { nom: "nom-2", prenom: "prenom-2", points: 10 },
  { nom: "nom-3", prenom: "prenom-3", points: 15 }
];
let lignes = 0;
let total_points = 0;

// Fonctions et parcours d'un tableau : chapitre 4, diapositives 44-45.
function init() {
  persons.forEach(function (personne) {
    doInsert(personne.nom, personne.prenom, personne.points);
  });
}

function doInsert(nom, prenom, points) {
  lignes += 1;
  doInsertRowTable(lignes, nom, prenom, points);
  total_points += points;
  update_summary();
}

// Récupérer des éléments par identifiant et modifier leur contenu : diapositives 61-63.
function update_summary() {
  document.getElementById("nb_lignes").innerText = lignes + " ligne(s)";
  document.getElementById("total").innerText = "Total point(s) = " + total_points;
}

// Console et événement de clic : chapitre 4, diapositives 38 et 129-133.
function consoleTableau() {
  console.log(persons);
}
document.getElementById("console").addEventListener("click", consoleTableau);

// Événement click et ajout dans le tableau : diapositives 38 et 129-133.
document.getElementById("ajouter").addEventListener("click", function () {
  doInsert("nom", "prenom", 10);
  persons.push({ nom: "nom", prenom: "prenom", points: 10 });
});

// Appel de la fonction d’initialisation : chapitre 4, diapositive 45.
init();
