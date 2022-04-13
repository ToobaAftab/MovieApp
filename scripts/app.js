const movies = document.getElementById("movies");
const singlemovie = document.getElementById("movie");

displayMoviesList();

function getMoviesList(element){
    return element.movies?.map(currentElement => {
        return `<div class="card-img col-md-2 mb-2 bg-dark">
        <img src="${currentElement.image}"/>
        </div>`;
    }).join("");
}

async function displayMoviesList() {
    const moviesList = await getMovies();
    const displayMovies = moviesList?.map((currentElement) => {
        return `<h2>${currentElement.category}</h2>
    <div class="d-flex flex-row flex-wrap"> ${getMoviesList(currentElement)} </div>`;
    }).join("");

    movies.innerHTML = displayMovies;
}