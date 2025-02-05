// Bekræfter, at scriptet er indlæst korrekt
console.log("single.js virker....");

// Henter produktets ID fra URL'en
let productId = new URLSearchParams(window.location.search).get("id");

// Logger produktets ID til konsollen for fejlfinding
console.log("id loader...", productId);

// Finder HTML-elementet, hvor produktinformationen skal vises
let productContainer = document.querySelector(".product_container");

// Kalder API’et for at hente data om det valgte produkt
fetch(`https://kea-alt-del.dk/t7/api/products/${productId}`)
  .then((response) => response.json()) // Konverterer svaret til JSON-format
  .then((data) => {
    // Indsætter produktets data i HTML'en
    productContainer.innerHTML = `
        <img src="https://kea-alt-del.dk/t7/images/webp/640/${productId}.webp" alt="${data.productdisplayname}" />
        <div>
            <!-- Viser produktets navn -->
            <h1>${data.productdisplayname}</h1>
            
            <!-- Viser normal pris -->
            <h2>${data.price} DKK</h2>
            
            <!-- Hvis der er rabat, vis den nye pris -->
            ${data.discount ? `<h3 class="discount">Tilbud: ${Math.floor((data.price / 100) * (100 - data.discount))} DKK</h3>` : ""}

            <!-- hvis produktet er udsolgt, vis dette -->
            ${data.soldout ? `<h2 class="sold_out">SOLD OUT</h2>` : ""}
            
            <!-- Knappen til at tilføje produktet til kurven -->
            <div class="cta">
                <a class="cta" href="#">ADD TO BASKET</a>
            </div>
          
            <!-- Viser yderligere produktinformation -->
            <div class="product_info">
                <p><strong>PRODUCT INFORMATION:</strong></p>
                <p>${data.brandname}, ${data.subcategory}</p>
            </div>
        </div>
    `;
  })
  // Hvis der opstår en fejl under hentningen, logges den i konsollen
  .catch((error) => console.error("Fejl ved hentning af produkt:", error));
