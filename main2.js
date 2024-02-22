const accesskey = 'uRieipym3E20HYTtljCcOn0ncZm62WsBEksvYW4AAKc';

const formEl = document.querySelector("form");

const inputEl = document.getElementById("search-input");
const searchResults = document.querySelector(".search-results");
const showMoreButton = document.getElementById("show-more-button");

let inputData = "";
let page = 1;

async function searchImages() {
  inputData = inputEl.value; // Use `.value` to get the input value, not `.values`
  const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accesskey}`;

  const response = await fetch(url);
  const data = await response.json();

  const results = data.results;

  if (page === 1) {
    searchResults.innerHTML = "";
  }

  results.map((result) => { // Use singular `result` instead of `results`
    const imageWrapper = document.createElement("div");
    imageWrapper.classList.add("search-result"); // Use `.search-result` instead of `.search-results`

    const image = document.createElement("img");
    image.src = result.urls.small; // Use `result` instead of `results`
    image.alt = result.alt_description; // Use `result` instead of `results`

    const imageLink = document.createElement("a");
    imageLink.href = result.links.html;
    imageLink.target = "_blank";
    imageLink.textContent = result.alt_description; // Use `result` instead of `results`

    imageWrapper.appendChild(image);
    imageWrapper.appendChild(imageLink);
    searchResults.appendChild(imageWrapper);
  });

  page++;
  if (page > 1) {
    showMoreButton.style.display = "block";
  }
}

formEl.addEventListener("submit", (event) => {
  event.preventDefault();
  page = 1;
  searchImages();
});

showMoreButton.addEventListener("click", () => {
  searchImages();
});
