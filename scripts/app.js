const movies = document.getElementById("movies");
const singlemovie = document.getElementById("movie");

displayMoviesList();
//getMovies();

function getMoviesList(element){
    let displayImages = '';
    for (let index = 0; index < element.movies.length; index++) {
        displayImages = displayImages + `<div class="card-img col-md-2 mb-3 bg-dark">
        <img src="${element.movies[index].image}"/>
        </div>`
    }
    return displayImages;
}

async function displayMoviesList() {
    let displayCategory = '';
    const moviesList = await getMovies();
    const displayMovies = moviesList.map((currentElement) => {
        displayCategory = displayCategory + `<h2>${currentElement.category}</h2>
    <div class="d-flex flex-row flex-wrap">`;
    currentElement.movies.forEach(element => {
        const {id,image,title} = element;
        displayCategory = displayCategory + `<div class="card-img col-md-2 mb-2 bg-dark">
        <img src="${image}"/>
        </div>`;
    });
    displayCategory = displayCategory + `</div>`;
    })
    
    movies.innerHTML = displayCategory;
}