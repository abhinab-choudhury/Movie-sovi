import './style.css'

const API_KEY = '2b171025';
const image_not_found = "./public/poster_not_found.jpg";

let searchbox = document.querySelector('.search-box');
let seach_list = document.querySelector('.search-list')

searchbox.addEventListener("keyup", async function () {
    let searchTerm = (searchbox.value).trim();
    if (searchTerm.length > 0) {
        seach_list.classList.remove('hide-search-list');
        fetch_data(searchTerm);
    } else {
        seach_list.classList.add('hide-search-list');
    }
})

document.addEventListener('click', (event) => {
    console.log(event.target.idList);
    if(event.target.classList != 'input-field') {
        seach_list.classList.add('hide-search-list');
    }
})

document.getElementById('search-btn').addEventListener('click', () => {
    document.getElementById('view-area').classList.add('hide-search-list');
    Movie_Lists_Page();
})

function Movie_Lists_Page() {
    let list = `
    <div class="item">
        <img class="main-poster"
            src="https://m.media-amazon.com/images/M/MV5BY2FmZTY5YTktOWRlYy00NmIyLWE0ZmQtZDg2YjlmMzczZDZiXkEyXkFqcGdeQXVyNjg4NzAyOTA@._V1_SX300.jpg"
            alt="poster">
        <div class="item-list">
            <div class="details">
                <div class="box">
                    <h1 class="title"> The Big Bang Theory </h1>
                    <div class="info">
                        <span class="type">Series</span>
                        <h3 class="aired"> 2007-2019</h3>
                    </div>
                </div>
                <div class="sub-list container">
                    <p class="sub-type-year">
                        Released : 01 May 2006
                    </p>
                </div> 
            </div>
        </div>
    </div>
    `
}

async function fetch_data(search) {
    const URL = `http://www.omdbapi.com/?apikey=${API_KEY}&page=1&s=${search}`
    const data_responce = await fetch(`${URL}`).then((responce) => {
        return responce.json();
    })

    if (data_responce) {
        if (data_responce.Response == "True") {
            console.log(data_responce.Search);
            list_similar_movies(data_responce.Search);
        }
    }

}

async function fetch_item_details(id) {
    const URL = `https://www.omdbapi.com/?apikey=${API_KEY}&i=${id}`
    const responce = await fetch(URL);
    const responce_data = await responce.json();

    return responce_data;
}

function list_similar_movies(data_responce) {
    let list = ""
    for (let i = 0; i < data_responce.length; i++) {

        if(! (data_responce[i].Poster !== 'N/A')) {
            data_responce[i].Poster = image_not_found;
        }
        
        let similar_movie = `
        <div class="search-list-item" data-id="${data_responce[i].imdbID}">
            <div class="search-item-thumbnail">
                <img src=${data_responce[i].Poster} alt="poster">
            </div>
            <div class="search-item-info">
                <h5 class="text-wrap movie-name">
                    <span class="text-muted">${data_responce[i].Type}</span> <br>
                    ${data_responce[i].Title}
                </h5>
            </div>
        </div>
        `;
        list += similar_movie;
    }
    document.getElementById("search-list").innerHTML = list;
    list_click_handler();
}

async function list_click_handler() {

    const clicked_item = document.querySelectorAll('.search-list-item');
    clicked_item.forEach(item => {
        item.addEventListener('click', async () => {
            seach_list.classList.add('hide-search-list');
            searchbox.value = "";

            let item_info = await fetch_item_details(item.dataset.id);

            let languages="";
            for (let i = 0; i < item_info.Language.split("," || " ").length; i++) {
                let lang = `<span class="sub-type-language mx-2">${item_info.Language.split(',')[i]}</span>`
                languages += lang;
            }
    
            let detail = `
            <img class="main-poster"
                src="${item_info.Poster}"
                alt="poster">
            <div class="item-list">
                <div class="details">
                    <div class="box">
                        <h1 class="title"> ${item_info.Title} </h1>
                        <div class="info">
                            <span class="type">${item_info.Type}</span>
                            <h3 class="aired">${item_info.Year}</h3>
                        </div>
                    </div>
                    <div class="sub-list container">
                    <div class="d-flex">
                        <span class="sub-type-year"> 
                            ${item_info.Released}
                        </span>
                        <p class="info-rating">
                            <span class="tags" title="Ratings">
                                <img src="https://img.icons8.com/color/48/imdb.png" alt="imdb"/>                                       
                                <img class="space" width="28" height="28" src="https://img.icons8.com/fluency/48/star--v1.png" alt="star--v1"/> 
                                ${item_info.imdbRating}
                            </span>
                            <span class="tags" title="Votes">
                                <img class="space" src="https://img.icons8.com/parakeet/48/starred-ticket.png" alt="starred-ticket"/>
                                ${item_info.imdbVotes}
                            </span>
                            <span class="tags" title="Genre">
                                <img class="space"  src="https://img.icons8.com/arcade/64/comet.png" alt="comet"/>
                                ${item_info.Genre}
                            </span>
                        </p>
                        </div>
                        <div class="language" title="Lanuages Avilable"> 
                            ${languages}
                        </div>
                        <p class="text-wrap plot" >
                            ${item_info.Plot}    
                            </p>
                            </div>
                    <div class="actors">
                    <span class="text-muted">Actors :</span> 
                    <div class="actors-names">${item_info.Actors}</div>
                    </div>
                    <div style="display: flex; justify-content:center; align-items:center;">
                        <img width="48" height="48" src="https://img.icons8.com/color/48/prize.png" alt="prize"/>
                        <span class="text-muted">${item_info.Awards}</span>
                    </div>
                </div>
            </div>
            `;
            document.querySelector('.item').innerHTML = detail;
        })
    })
}

