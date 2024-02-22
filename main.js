const accesskey = uRieipym3E20HYTtljCcOn0ncZm62WsBEksvYW4AAKc;


const formel = document.querySelector("form");

const input1 = document.getElementById("search-input");
const searchResults = document.querySelector(".search-results");
const showmore = document.getElementById("show-more-button");

let inputData="";
let page=1;

async function searchimages(){
    inputData = input1.values;
    const url = 'https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accesskey}'

    const response = await fetch(url);
    const data = await response.json();

    const results = data.results;

    if(page == 1){
        searchResults.innerHTML = "";

    }

    results.map((results) =>{
        const imageWrapper = document.createElement("div");
        imageWrapper.classList.add("search-results");

        const image = document.createElement("img");
        image.src = results.urls.small;
        image.alt = results.alt_description;
        const imageLink = document.createElement("a");
        imageLink.href = results.links.html ;
        imageLink.target = "_blank";
        imageLink.textContent = results.alt_description;

        imageWrapper.appendChild(image);
        imageWrapper.appendChild(imageLink);
        searchResults.appendChild(imageWrapper);

     } );
     page++
     if(page>1)
     {
        showmore.style.display = "block"
     }

}
formel.addEventListener("submit",(event)=> {
    event.preventDefault()
    page=1;
    searchimages()

})

showmore.addEventListener("click",()=> {
    
    searchimages();
    
})