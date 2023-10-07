import './style.css'

const API_KEY = '2b171025';
var searchbox = document.querySelector('.search-box');

searchbox.addEventListener("keyup", async function() {
    let searchTerm = (searchbox.value).trim();
    if(searchTerm.length > 0) {
        fetch_data(searchTerm);
    }
})

async function fetch_data(search) {
    const URL = `http://www.omdbapi.com/?apikey=${API_KEY}&page=1&s=${search}`
    const data = await fetch(`${URL}`).then((responce) => {
        return responce.json();
    }).then((data_responce) => {
        list_similar_movies(data_responce.Search);
    })

}  



let list = ""
function list_similar_movies(data_responce) {
    for(let i = 0;i < data_responce.size();i++) {
        let similar_movie = `
        <div class="search-list-item">
            <div class="search-item-thumbnail">
                <img src="${data_responce[i].Poster}" alt="poster">
            </div>
            <div class="search-item-info">
                <h3 class="text-wrap movie-name">${data_responce[i].Title}</h3>
            </div>
        </div>
        `
        list += similar_movie;
    }

    document.getElementById("search-list").innerHTML = list;
}