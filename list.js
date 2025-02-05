// Henter kategoriens navn fra URL'en, fx: "products.html?category=shoes"
// Dette fortæller os, hvilken produktkategori vi skal vise
const myCategory = new URLSearchParams(window.location.search).get("category");

// Logger kategorien i konsollen for at sikre, at vi har hentet den korrekt
console.log("Produktliste loader...", myCategory);

// Finder HTML-elementerne, hvor vi skal indsætte produktlisten og kategoriens overskrift
const productContainer = document.querySelector(".product_list_container");
const overskrift = document.querySelector(".category_headline");

// Indsætter kategoriens navn som overskrift på siden
overskrift.innerHTML = myCategory;

// Henter produkter fra API’et, filtreret efter den valgte kategori
fetch(`https://kea-alt-del.dk/t7/api/products?limit=100&category=${myCategory}`)
  .then((response) => response.json()) // Konverterer API-responsen til JSON-format
  .then(showProducts); // Sender JSON-data til `showProducts`-funktionen

// Funktion der håndterer og viser produkterne på siden
function showProducts(products) {
  // Logger produktlisten i konsollen for at tjekke, om vi har modtaget data korrekt
  console.log(products);

  // Mapper over produkterne og genererer HTML for hvert produkt
  let markup = products
    .map(
      (element) => `
        <!-- Hvert produkt bliver et link til en separat produkt-side -->
      <a href="produkt.html?id=${element.id}">
  <div class="card">
    <img src="https://kea-alt-del.dk/t7/images/webp/640/${element.id}.webp" alt="${element.productdisplayname}" />
    <div>
      <h2>${element.productdisplayname}</h2>

      <!-- Viser om produktet er udsolgt eller har rabat som små badges -->
      ${element.soldout ? `<span class="sold_out">Sold Out</span>` : ""}
      ${element.discount ? `<span class="discount">-${element.discount}%</span>` : ""}

      <h3>${element.soldout ? "Sold Out" : element.price + " DKK"}</h3>

      ${element.discount ? `<h3>NEW PRICE ${Math.floor((element.price / 100) * (100 - element.discount))} DKK</h3>` : ""}
      
      <p>${element.articletype}</p>
    </div>
  </div>
</a>

      `
    )
    .join(""); // Samler alle HTML-elementer i én lang tekststreng

  // Logger den genererede HTML-markup til konsollen (hjælper med debugging)
  console.log(markup);

  // Indsætter den genererede HTML i `productContainer`, så produkterne vises på siden
  productContainer.innerHTML = markup;
}
