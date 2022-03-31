async function displayList() {
    const data = await getPopularMovies();
    const list = document.getElementById('list');
}
displayList()