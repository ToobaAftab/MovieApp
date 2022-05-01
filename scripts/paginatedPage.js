const category = getQueryParameter();
const paginatedMovies = document.getElementById("paginatedMovies");
const pagination = document.getElementById("pagination");
var currentPage = 1;
var pageLi = "";
var totalPages = 0;
const modal = document.getElementById("movieModal");

onMoviesLoad();

async function onMoviesLoad(){
    totalPages = await getCurrentMovies(currentPage);
    pagination.innerHTML = createPagination(totalPages,currentPage)
}

function createPagination (totalPages,currentPage){
    console.log(totalPages,currentPage)
    let str = '<ul>';
  let active;
  let pageCutLow = currentPage - 1;
  let pageCutHigh = currentPage + 1;

  if (currentPage > 1) {
    str += '<li class="page-item previous no"><a onclick="createPagination('+(totalPages)+', '+(currentPage-1)+');getCurrentMovies('+(currentPage-1)+');" >Previous</a></li>';
  }

  if (totalPages < 6) {
    for (let p = 1; p <= totalPages; p++) {
      active = currentPage == p ? "active" : "no";
      str += '<li class="'+active+'"><a class="page-link"  onclick="createPagination('+(totalPages)+', '+p+');getCurrentMovies('+p+');">'+ p +'</a></li>';
    }
  }
  else{
    if (currentPage > 2) {
        str += '<li class="no page-item"><a onclick="createPagination('+(totalPages)+', 1);getCurrentMovies('+1+');">1</a></li>';
        if (currentPage > 3) {
            str += '<li class="out-of-range"><a onclick="createPagination('+(totalPages)+','+(currentPage-2)+');getCurrentMovies('+(currentPage)+');">...</a></li>';
        }
      }

      if (currentPage === 1) {
        pageCutHigh += 2;
      } else if (currentPage === 2) {
        pageCutHigh += 1;
      }

      if (currentPage === totalPages) {
        pageCutLow -= 2;
      } else if (currentPage === totalPages-1) {
        pageCutLow -= 1;
      }

      for (let p = pageCutLow; p <= pageCutHigh; p++) {
        if (p === 0) {
          p += 1;
        }
        if (p > totalPages) {
          continue
        }
        active = currentPage == p ? "active" : "no";
        str += '<li class="page-item '+active+'"><a onclick="createPagination('+(totalPages)+', '+p+');getCurrentMovies('+p+');">'+ p +'</a></li>';
      }
      
      if (currentPage < totalPages-1) {
        if (currentPage < totalPages-2) {
          str += '<li class="out-of-range"><a onclick="createPagination('+(totalPages)+','+(currentPage+2)+');getCurrentMovies('+currentPage+');">...</a></li>';
        }
        str += '<li class="page-item no"><a onclick="createPagination('+(totalPages)+', '+(totalPages)+');getCurrentMovies('+currentPage+');">'+totalPages+'</a></li>';
      }
    }

    if (currentPage < totalPages) {
        str += '<li class="page-item no"><a onclick="createPagination('+(totalPages)+', '+(currentPage+1)+');getCurrentMovies('+(currentPage+1)+');" >Next</a></li>';
      }
    str += '</ul>';

    pagination.innerHTML = str;

    return str
}


function getQueryParameter(){
    var url = new URL(window.location.href);
    return (url.searchParams.get("category"));
}


function show () {
  document.getElementById("loading").classList.add("show");
}
function hide () {
  document.getElementById("loading").classList.remove("show");
}

async function getCurrentMovies(page){
  var displayMovies = `<div class="d-flex flex-row flex-wrap">`;
  var result;
  show();
  if (category === 'popular'){
      result = await getAllPopularMovies(page);
  }
  else if (category === 'topRated'){
      result = await getAllTopRatedMovies(page);
  }
  else if (category === 'upcoming'){
      result = await getAllUpcomingMovies(page);
  }
  hide();
  currentPage = result.page;
  totalPages = result.total_pages;
  displayMovies += getAllMovies(result) + `</div>`;
  paginatedMovies.innerHTML = displayMovies;
  return totalPages;
}

const getAllMovies = (result) => {
  return result.results?.map((currentElement,movieIndex) => {
      const image = getImageUrl(currentElement.poster_path);
      return `<div class="card-img col-md-2 mb-2 bg-dark">
      <img src="${image}" data-toggle="modal" data-target="#movieModal" onclick="viewDetails(${movieIndex})"
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


function viewDetails(movieIndex) {
    const {title, release_date, overview} = wholeMoviesList.results[movieIndex];
    const image = getImageUrl(wholeMoviesList.results[movieIndex].poster_path);
    modal.innerHTML = `<div class="modal-dialog modal-lg" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title text-primary" id="exampleModalLabel">${title}</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body d-flex align-items-center">
        <div class="card-img d-inline-block ">
            <img src="${image}">
        </div>
        <div class="text-primary d-inline-block flex-column align-content-stretch col-md-6 " style="height: 600px;">
          <h3 class="p-2 my-5">${title}</h3>
          <h5 class="p-2 my-5">Release Date: ${release_date}</h5>
          <p class="p-2 my-5">${overview}
          </p>
        </div>
      </div>
    </div>
  </div>`;
}

function setURL(category) {
  const queryParameter = new URLSearchParams(window.location.search);
  queryParameter.set('category', category);
  console.log(window.location.href)
  window.location.search = queryParameter;
}