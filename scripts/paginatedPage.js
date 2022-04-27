const category = getQueryParameter();
const paginatedMovies = document.getElementById("paginatedMovies");
const pagination = document.getElementById("pagination");
var currentPage = 1;
var pageLi = "";
var totalPages = 0;

getCurrentMovies(currentPage);
// pages = paginate()
// pagination.innerHTML = `<li class="page-item"><a class="page-link" href="#">Previous</a></li>
// <li class="page-item"><a class="page-link" href="#">1</a></li>
// <li class="page-item"><a class="page-link" href="#">2</a></li>
// <li class="page-item"><a class="page-link" href="#">3</a></li>
// <li class="page-item"><a class="page-link" href="#">Next</a></li>`;



function getQueryParameter(){
    var url = new URL(window.location.href);
    return (url.searchParams.get("category"));
}

async function getCurrentMovies(page){
    var displayMovies = `<div class="d-flex flex-row flex-wrap">`;
    var result;
    if (category === 'popular'){
        result = await getAllPopularMovies(page);
        // currentPage = result.page;
        // totalPages = result.total_pages;
        // displayMovies = displayMovies + getAllMovies(result);
    }
    else if (category === 'topRated'){
        result = await getAllTopRatedMovies(page);
    }
    else if (category === 'upcoming'){
        result = await getAllUpcomingMovies(page);
    }
    currentPage = result.page;
    totalPages = result.total_pages;
    displayMovies = displayMovies + getAllMovies(result) + `</div>`;
    paginatedMovies.innerHTML = displayMovies;
    pagination.innerHTML = paginate(result)
console.log(paginate(result))
}

const getAllMovies = (result) => {
    return result.results?.map((currentElement) => {
        const image = getImageUrl(currentElement.poster_path);
        return `<div class="card-img col-md-2 mb-2 bg-dark">
        <img src="${image}" data-toggle="modal" data-target="#movieModal" 
       />
        </div>`;
    }).join("");
}

async function getAllPopularMovies(page) {
    const popularMovies = `${BASE_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=${page}`;
    const response = await fetch(popularMovies);
    const data = await response.json(); 
    return data;
  }

  async function getAllTopRatedMovies(page ) {
    const topRatedMovies = `${BASE_URL}movie/top_rated?api_key=${API_KEY}&language=en-US&page=${page}`;
    const response = await fetch(topRatedMovies);
    const data = await response.json(); 
    return data;
  }
  
  async function getAllUpcomingMovies(page) {
    const upcomingMovies = `${BASE_URL}movie/upcoming?api_key=${API_KEY}&language=en-US&page=${page}`;
    const response = await fetch(upcomingMovies);
    const data = await response.json(); 
    return data;
  }

  function paginate(arr) {
    return (arr.results?.map((element, index) => {
            return pageLi += `<li onclick="pageChange(${index+1}) class="page-item"><a class="page-link" href="javascript:void(0)">${index+1}</a></li>`
    }));
}