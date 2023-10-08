import './style.css'

const API_KEY = '2b171025';
var searchbox = document.querySelector('.search-box');

searchbox.addEventListener("keyup", async function() {
    let searchTerm = (searchbox.value).trim();
    if(searchTerm.length > 0) {
        fetch_data(searchTerm);
    }
})

window.addEventListener('click', (event) => {
    event.target.className != ""
})

async function fetch_data(search) {
    const URL = `http://www.omdbapi.com/?apikey=${API_KEY}&page=1&s=${search}`
    const data_responce = await fetch(`${URL}`).then((responce) => {
        return responce.json();
    })

    if(data_responce) {
        if(data_responce) {
            console.log(data_responce.Search);   
            list_similar_movies(data_responce.Search);
        } else {
            list_similar_movies([{"Poster" : './Poster_not_found.jpg', "Title" : "None"}]);
        }
    }

}  



function list_similar_movies(data_responce) {
    let Poster = () => {
        if(data_responce[i].Poster !== 'N/A') {
            return data_responce[i].Poster;
        } else {
            return './poster_not_found.jpg'
        }
    }
    let list = ""
    for(let i = 0;i < data_responce.length;i++) {
        let similar_movie = `
        <button class="search-list-item">
            <div class="search-item-thumbnail">
                <img src="${Poster} alt="poster">
            </div>
            <div class="search-item-info">
                <span class="text-muted">${data_responce[i].Type}</span>
                <h3 class="text-wrap movie-name">${data_responce[i].Title}</h3>
            </div>
        </button>
        `
        list += similar_movie;
    }
    
    document.getElementById("search-list").innerHTML = list;
}

async function list_click_handler(id) {
    const URL = `https://www.omdbapi.com/?apikey=${API_KEY}&i=${id}`
    let item_info = await fetch(URL).then((responce) => {
        return responce.json()
    });

    let languages;
    for(let i = 0;i < item_info.Language.split(",").length;i++) {
        let lang = `<span class="sub-type-language">${item_info.Language.split(',')[i]}</span>`
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
                        <span class="tags">
                        <img src="https://img.icons8.com/color/48/imdb.png" alt="imdb"/>                                       
                            <img class="space" width="28" height="28" src="https://img.icons8.com/fluency/48/star--v1.png" alt="star--v1"/> 
                            7.7
                        </span>
                        <span class="tags">
                            <img class="space" src="https://img.icons8.com/parakeet/48/starred-ticket.png" alt="starred-ticket"/>
                            7.7/10
                        </span>
                        <span class="tags">
                            <img class="space"  src="https://img.icons8.com/arcade/64/comet.png" alt="comet"/>
                            Short Drama Thriller
                            </span>
                    </p>
                    </div>
                    <div class="language"> 
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
    `

    document.querySelector('.item').innerHTML = detail;
    document.getElementById('.search-list').classList = "search-list";
}

