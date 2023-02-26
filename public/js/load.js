const submitButton = document.getElementById("submit");
const loader = document.getElementById("loader");
const list = document.getElementById("list");
const buttonMore = document.getElementById("more");

submitButton.addEventListener("click", () => {
    loader.style.display = "inline-block";
});

list.addEventListener("change", () => {
    loader.style.display = "none";
});

buttonMore.addEventListener("click", () => {
    if (list.style.display == "none") {
        buttonMore.textContent = "v Détail";
        list.style.display = "block";
    } else {
        buttonMore.textContent = "> Détail";
        list.style.display = "none";
    }
});
