"use strict"; // Mode strict pour éviter les erreurs silencieuses (slide 51 et 141)

/* ============================================================
   TP4 - Partie 2 : Manipulation du DOM - CRUD-Persons
   Etape 6 : Suppression des lignes sélectionnées
   ============================================================ */

// ---------- Variables globales ----------

// Compteur de lignes insérées (sert aussi pour la colonne N°) : variable avec let (slide 51)
let lignes = 0;

// Total des points du tableau : variable avec let (slide 51)
let total_points = 0;

// Tableau d'objets littéraux "person" : nom, prenom, points (slides 38, 39 et 40)
const persons = [
    { nom: "nom-1", prenom: "prenom-1", points: 5 },
    { nom: "nom-2", prenom: "prenom-2", points: 10 },
    { nom: "nom-3", prenom: "prenom-3", points: 15 }
];

// Appel de la fonction init() au chargement du script (script chargé avec defer, slide 27)
init();

/* ------------------------------------------------------------
   init() : parcourt le tableau persons et insère chaque personne
   ------------------------------------------------------------ */
function init() { // Déclaration d'une fonction (slide 45)
    // Boucle for...of pour parcourir les objets du tableau (slide 44)
    for (const person of persons) {
        // Accès aux propriétés d'un objet avec la notation point (slide 39)
        doInsert(person.nom, person.prenom, person.points);
    }
}

/* ------------------------------------------------------------
   doInsert() : met à jour les compteurs, insère la ligne
   et met à jour le résumé
   ------------------------------------------------------------ */
function doInsert(nom, prenom, points) {
    // Opérateur d'incrémentation (opérateurs arithmétiques, slide 41)
    lignes++;

    // Opérateur combiné += pour ajouter les points au total (slide 41)
    total_points += points;

    // Insertion de la ligne dans le tableau HTML (appel de fonction, slide 45)
    doInsertRowTable(lignes, nom, prenom, points);

    // Mise à jour de l'espace "Résumé"
    update_summary();
}

/* ------------------------------------------------------------
   doInsertRowTable() : crée une ligne <tr> et l'ajoute au tableau
   ------------------------------------------------------------ */
function doInsertRowTable(num, nom, prenom, points) {
    // Retrouver le <tbody> par son identifiant : getElementById (slide 61)
    const table = document.getElementById("table_body");

    // Créer un élément HTML à partir de zéro : createElement (slide 104)
    const row = document.createElement("tr");

    // Affecter la classe "row" avec setAttribute (slide 107)
    row.setAttribute("class", "row");

    // Créer les 5 colonnes (td) : createElement (slide 104)
    const col1 = document.createElement("td");
    const col2 = document.createElement("td");
    const col3 = document.createElement("td");
    const col4 = document.createElement("td");
    const col5 = document.createElement("td");

    // Remplir le contenu des colonnes avec la propriété innerText (slide 91)
    col1.innerText = num;
    col2.innerText = nom;
    col3.innerText = prenom;
    col4.innerText = points;

    // La dernière colonne contient une checkbox (élément input) : createElement (slide 104)
    const checkbox = document.createElement("input");
    checkbox.setAttribute("type", "checkbox"); // setAttribute (slide 107)
    col5.append(checkbox); // append() ajoute à la fin de l'élément (slide 98)

    // Affecter les classes CSS de chaque colonne : setAttribute (slide 107)
    col1.setAttribute("class", "col_number");
    col2.setAttribute("class", "col_text");
    col3.setAttribute("class", "col_text");
    col4.setAttribute("class", "col_number");
    col5.setAttribute("class", "col_chkbox");

    // Ajouter les colonnes à la ligne avec append() (slide 98)
    row.append(col1, col2, col3, col4, col5);

    // Ajouter la ligne au tableau avec append() (slide 98)
    table.append(row);
}

/* ------------------------------------------------------------
   update_summary() : met à jour l'espace "Résumé"
   ------------------------------------------------------------ */
function update_summary() {
    // Retrouver les éléments p1 et p3 par leur identifiant : getElementById (slide 61)
    const element_lignes = document.getElementById("p1");
    const element_points = document.getElementById("p3");

    // Modifier le contenu avec innerText (slide 91), concaténation avec + (slide 41)
    element_lignes.innerText = lignes + " ligne(s)";
    element_points.innerText = "Total point(s)= " + total_points;
}

/* ------------------------------------------------------------
   doNewData() : ajout d'une personne via le formulaire
   ------------------------------------------------------------ */
function doNewData() {
    // Retrouver les champs du formulaire par leur identifiant : getElementById (slide 61)
    const elt_nom = document.getElementById("form_nom");
    const elt_prenom = document.getElementById("form_prenom");
    const elt_points = document.getElementById("form_points");

    // Lire la valeur saisie : accès direct à l'attribut value (slide 93)
    const nom = elt_nom.value.trim();
    const prenom = elt_prenom.value.trim();
    // parseInt convertit le texte saisi en nombre entier (type number, slide 37)
    const points = parseInt(elt_points.value);

    // Contrôle de saisie : condition if...else (slide 42), opérateurs logiques et === (slides 41 et 141)
    if (nom === "" || prenom === "" || Number.isNaN(points)) {
        // Boîte de dialogue alert() de l'objet window (BOM, slide 116)
        window.alert("Formulaire incomplet !");
    } else {
        // Insertion dans le tableau HTML + mise à jour du résumé
        doInsert(nom, prenom, points);

        // Insertion dans le tableau "persons" avec push (méthodes de tableau, slide 38)
        persons.push({ nom: nom, prenom: prenom, points: points });

        // Vider les champs : modification de l'attribut value (slide 93)
        elt_nom.value = "";
        elt_prenom.value = "";
        elt_points.value = "";
    }
}

/* ------------------------------------------------------------
   consoleTableau() : affiche le contenu de "persons" dans la console
   ------------------------------------------------------------ */
function consoleTableau() {
    // Affichage dans la console du navigateur : console.log (slide 33)
    console.log(persons);
}

/* ------------------------------------------------------------
   deleteRow() : supprime les lignes dont la checkbox est cochée
   (appelée au clic sur le bouton Supprimer : événement onclick, slides 130 à 135)
   ------------------------------------------------------------ */
function deleteRow() {

    // Étape 1 : vérifier si le tableau est vide (condition if, slide 42)
    if (lignes === 0) {
        window.alert("Le tableau est vide !"); // alert() (slide 116)
        return; // sortie de la fonction (slide 45)
    }

    // Étape 2 : récupérer le tableau et la liste des checkbox cochées
    // Recherche par sélecteur CSS : querySelector / querySelectorAll (slide 76)
    const table = document.querySelector("#persons_table tbody");
    const checked = table.querySelectorAll(".col_chkbox input:checked");

    // Étape 3 : vérifier si aucune checkbox n'est cochée (condition if, slide 42)
    if (checked.length === 0) {
        window.alert("Sélectionnez au moins une ligne !"); // alert() (slide 116)
        return;
    }

    // Étape 4 : demander une confirmation avant suppression
    // window.confirm est une boîte de dialogue du BOM (comme alert et prompt, slide 116) ;
    // elle retourne false si l'utilisateur clique sur "Annuler"
    if (!window.confirm("Supprimer " + checked.length + " ligne(s) sélectionnée(s) ?")) {
        return;
    }

    // Étape 5 : récupérer toutes les lignes du tableau (collection d'éléments, slide 76)
    const rows = table.querySelectorAll("tr");

    // Étape 6 : parcourir les lignes avec une boucle for (slide 44), de la dernière
    // à la première, pour que les indices restent valides après chaque suppression
    for (let i = rows.length - 1; i >= 0; i--) {
        const row = rows[i];
        const checkbox = row.querySelector(".col_chkbox input"); // querySelector (slide 76)

        // La propriété checked de la checkbox est un attribut accessible directement (slide 93)
        if (checkbox.checked) {
            // Valeur des points dans la 4e cellule (index 3) : navigation dans l'arbre
            // avec la collection d'enfants de la ligne (slide 89), lue avec innerText (slide 91)
            const points = parseInt(row.cells[3].innerText);

            total_points -= points; // opérateur combiné -= (slide 41)
            lignes--;               // opérateur de décrémentation (slide 41)
            row.remove();           // supprimer la ligne du DOM : remove() (slide 100)
            persons.splice(i, 1);   // supprimer la même entrée dans le tableau "persons" : splice (slide 38)
        }
    }

    // Renuméroter la colonne N° pour qu'elle reste 1, 2, 3... après suppression
    const remaining = table.querySelectorAll("tr");
    // forEach avec une fonction anonyme (slides 44 et 46)
    remaining.forEach(function (row, index) {
        row.cells[0].innerText = index + 1; // innerText (slide 91)
    });

    // Étape 7 : message de succès (alert, slide 116) et mise à jour du résumé
    window.alert("Suppression effectuée avec succès !");
    update_summary();
}