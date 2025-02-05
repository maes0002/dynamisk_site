const burger = document.querySelector(".burger");
const nav = document.querySelector("nav");
const menu = document.querySelector(".menu");

burger.addEventListener("click", burgerClick);
function burgerClick() {
  burger.classList.toggle("active");
  nav.classList.toggle("active");
}
menu.addEventListener("click", menuClick);
function menuClick() {
  burger.classList.remove("active");
  nav.classList.remove("active");
}

// JavaScript til at tilføje interaktivitet
const buttons = document.querySelectorAll(".size-selector button");

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    // Fjern "active" fra alle knapper
    buttons.forEach((btn) => btn.classList.remove("active"));
    // Tilføj "active" til den valgte knap
    button.classList.add("active");
    // Vis skostørrelse i konsollen (eller brug den til noget andet)
    console.log("Valgt skostørrelse:", button.dataset.size);
  });
});
