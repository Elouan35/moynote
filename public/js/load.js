/* Récupérer mes éléments HTML */
const submitButton = document.getElementById("submit");
const loader = document.getElementById("loader");
const list = document.getElementById("list");
const buttonMore = document.getElementById("more");

/* Afficher l'animation de chargement */
submitButton.addEventListener("click", () => {
    loader.style.display = "inline-block";
});

/* Enlever l'animation de chargement quand on reçois les moyennes */
list.addEventListener("change", () => {
    loader.style.display = "none";
});

/* Voir le détail de la moyenne générale */
buttonMore.addEventListener("click", () => {
    if (list.style.display == "none") {
        buttonMore.textContent = "v Détail";
        list.style.display = "block";
    } else {
        buttonMore.textContent = "> Détail";
        list.style.display = "none";
    }
});
