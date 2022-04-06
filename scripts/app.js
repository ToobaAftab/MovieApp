const movies = document.getElementById("movies");
const singlemovie = document.getElementById("movie");

function getImagesList(element){
    let displayImages = '';
    for (let index = 0; index < element.movies.length; index++) {
        displayImages = displayImages + `<div class="card-img col-md-2 mb-3 bg-dark">
        <img src="${element.movies[index].image}"/>
        </div>`
        // console.log(displayImages);
    }
    return displayImages;
}

function displayList() {
    // console.log(data[1].movies);
    // movies.innerHTML = data?.map((movieData,index) => getSingleMovie(movieData,index)).join("")

    let displayCategory = '';
    
    data.forEach(element => {
        displayCategory = displayCategory + `<h2>${element.category}</h2><div class="d-flex flex-row flex-wrap justify-content-between">`
        displayCategory = displayCategory + getImagesList(element);
        displayCategory = displayCategory + `</div>`;
        console.log(displayCategory)
        // console.log(getImagesList(element));
        
    });

    movies.innerHTML = displayCategory;
}
displayList()

function getSingleMovie(movieData,index){
    // console.log(index);
//     const movieDiv = `<div class="card-img col-md-2 mb-3 bg-dark">
//     <img src="${movieData[index]['movies']}">
//   </div>`
}