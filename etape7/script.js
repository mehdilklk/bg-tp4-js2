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

// Lire et modifier les propriétés des champs : chapitre 4, diapositives 61 et 86-87.
function doNewData() {
  const champNom = document.getElementById("form_nom");
  const champPrenom = document.getElementById("form_prenom");
  const champPoints = document.getElementById("form_points");
  const nom = champNom.value.trim();
  const prenom = champPrenom.value.trim();
  const valeurPoints = champPoints.value.trim();
  // Conversion et condition : chapitre 4, diapositives 37 et 42.
  const points = Number(valeurPoints);
  if (nom === "" || prenom === "" || valeurPoints === "" || !Number.isInteger(points)) {
    // La boîte d'alerte appartient à window : chapitre 4, diapositives 112-114.
    window.alert("Formulaire incomplet !");
    return;
  }

  // Création de l'objet, insertion et ajout au tableau : diapositives 38-40 et 45.
  doInsert(nom, prenom, points);
  persons.push({ nom: nom, prenom: prenom, points: points });
  champNom.value = "";
  champPrenom.value = "";
  champPoints.value = "";
}
document.getElementById("ajouter").addEventListener("click", doNewData);

// Sélecteurs DOM, boucle et suppression : chapitre 4, diapositives 44, 76 et 86-87.
function deleteRow() {
  // Conditions et sorties anticipées : chapitre 4, diapositive 42.
  if (lignes === 0) {
    window.alert("Le tableau est vide.");
    return;
  }
  const rows = document.querySelectorAll("#personnes tbody tr");
  const selection = document.querySelectorAll("#personnes tbody .col_chkbox input:checked");
  if (selection.length === 0) {
    window.alert("Sélectionnez au moins une ligne !");
    return;
  }
  // Boîte de dialogue du navigateur : chapitre 4, diapositives 112-114.
  if (!window.confirm("Confirmer la suppression des lignes sélectionnées ?")) {
    return;
  }

  // Parcours à rebours pour garder la correspondance des indices dans persons.
  // Boucles et tableaux : chapitre 4, diapositives 38 et 44.
  for (let i = rows.length - 1; i >= 0; i--) {
    if (rows[i].querySelector(".col_chkbox input").checked) {
      total_points -= persons[i].points;
      persons.splice(i, 1);
      rows[i].remove();
      lignes -= 1;
    }
  }
  // Remettre à jour les numéros et le résumé après suppression.
  document.querySelectorAll("#personnes tbody tr").forEach(function (row, index) {
    row.cells[0].innerText = index + 1;
  });
  update_summary();
  filtrer();
  document.getElementById("message").innerText = "Suppression effectuée.";
}
document.getElementById("supprimer").addEventListener("click", deleteRow);

// Fonctionnalité 1 : recherche par nom/prénom.
// Parcours et accès aux objets : chapitre 4, diapositives 39-40, 44 et 76.
function filtrer() {
  const recherche = document.getElementById("recherche").value.toLocaleLowerCase();
  document.querySelectorAll("#personnes tbody tr").forEach(function (row, index) {
    const nomComplet = persons[index].nom + " " + persons[index].prenom;
    row.hidden = !nomComplet.toLocaleLowerCase().includes(recherche);
  });
}
// Événement input et événement click : chapitre 4, diapositives 129-139.
document.getElementById("recherche").addEventListener("input", filtrer);

// Fonctionnalité 2 : cocher ou décocher les lignes visibles.
// Tableaux, méthodes et fonctions de rappel : diapositives 38, 44 et 47.
document.getElementById("tout").addEventListener("click", function () {
  const rows = Array.from(document.querySelectorAll("#personnes tbody tr"));
  const visibles = rows.filter(function (row) { return !row.hidden; });
  const cocher = visibles.some(function (row) {
    return !row.querySelector(".col_chkbox input").checked;
  });
  visibles.forEach(function (row) {
    row.querySelector(".col_chkbox input").checked = cocher;
  });
});

// Fonctionnalité 3 : modification de la personne sélectionnée.
// Lecture des champs et conditions : chapitre 4, diapositives 42, 61 et 76.
document.getElementById("modifier").addEventListener("click", function () {
  const rows = Array.from(document.querySelectorAll("#personnes tbody tr"));
  const selection = rows.filter(function (row) {
    return row.querySelector(".col_chkbox input").checked;
  });
  if (selection.length !== 1) {
    window.alert("Sélectionnez une seule personne à modifier.");
    return;
  }
  const champNom = document.getElementById("form_nom");
  const champPrenom = document.getElementById("form_prenom");
  const champPoints = document.getElementById("form_points");
  const nom = champNom.value.trim();
  const prenom = champPrenom.value.trim();
  const valeurPoints = champPoints.value.trim();
  const points = Number(valeurPoints);
  if (nom === "" || prenom === "" || valeurPoints === "" || !Number.isInteger(points)) {
    window.alert("Saisissez le nouveau nom, prénom et nombre entier de points.");
    return;
  }

  // Mise à jour de l'objet, de la ligne et du total : diapositives 39-40 et 86-87.
  const ligne = selection[0];
  const personne = persons[rows.indexOf(ligne)];
  total_points -= personne.points;
  personne.nom = nom;
  personne.prenom = prenom;
  personne.points = points;
  total_points += points;
  ligne.cells[1].innerText = nom;
  ligne.cells[2].innerText = prenom;
  ligne.cells[3].innerText = points;
  ligne.querySelector(".col_chkbox input").checked = false;
  champNom.value = "";
  champPrenom.value = "";
  champPoints.value = "";
  update_summary();
  filtrer();
  document.getElementById("message").innerText = "Modification effectuée.";
});
document.getElementById("ajouter").addEventListener("click", filtrer);

// Appel de la fonction d’initialisation : chapitre 4, diapositive 45.
init();
