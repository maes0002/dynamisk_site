console.log("index script loaded....");

fetch("https://kea-alt-del.dk/t7/api/categories")
  .then((Response) => Response.json())
  .then(showCategory);

function showCategory(data) {
  console.log("mine data er....", data);

  const markup = data
    .map(
      (element) => `
        <div class="cta_index">
          <a class="cta_index" href="produktliste.html?category=${element.category}">${element.category}</a>
        </div>
   `
    )
    .join("");

  console.log("min markup er....", markup);
  document.querySelector(".category_list_container").innerHTML = markup;
}
