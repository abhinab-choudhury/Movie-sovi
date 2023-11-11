import './style.css'

let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

document.addEventListener('DOMContentLoaded', () => {
    const API_KEY = import.meta.env.VITE_API;
    const image_not_found = "./public/poster_not_found.jpg";
    
    let searchbox = document.querySelector('.search-box');
    let search_list = document.querySelector('.search-list')


    function updateWishlist() {
        localStorage.setItem("wishlist", JSON.stringify(wishlist))
    }

    updateWishlist()

    document.querySelector(".wishlist-btn").addEventListener('click', function () {
        let title = document.getElementById("click-id").dataset.imdbid
        wishlist.push(title)
        updateWishlist()
    })


    // This appends the enter charater into the search term and help in sending the request to the API.
    searchbox.addEventListener("keyup", async function () {
        let searchTerm = (searchbox.value).trim();
        if (searchTerm.length > 0) {
            search_list.classList.remove('hide-search-list');
            fetch_data(searchTerm);
        } else {
            search_list.classList.add('hide-search-list');
        }
    })

    // This function help to return a list movies/series which matches to the search word.
    async function fetch_data(search) {
        const URL = `http://www.omdbapi.com/?apikey=${API_KEY}&page=1&s=${search}`
        const data_responce = await fetch(`${URL}`).then((responce) => {
            return responce.json();
        })

        if (data_responce) {
            if (data_responce.Response == "True") {
                // console.log(data_responce.Search);
                list_similar_movies(data_responce.Search);
            }
        }

    }

    // help to fetch detail about a particlar move from IMDB Database using it ID.
    async function fetch_item_details(id) {
        const URL = `https://www.omdbapi.com/?apikey=${API_KEY}&i=${id}`
        const responce = await fetch(URL);
        const responce_data = await responce.json();

        return responce_data;
    }


    // This function return the string which is a formated HTML arranged according to the responce received 
    // from the API.
    function list_similar_movies(data_responce) {
        let list = ""
        for (let i = 0; i < data_responce.length; i++) {

            if (!(data_responce[i].Poster !== 'N/A')) {
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
        // This is the code updated the DOM realted to search suggessions 

        list_click_handler(data_responce);
        // this Function call links the updatation of DOM with the click EventListener to which 
        // responds a when clicked on search button.
    }

    async function list_click_handler(data_responce) {

        // this const variable handles the search button on top at the navbar
        const click_search_button = document.querySelector("#search-btn");
        click_search_button.addEventListener('click', async () => {
            document.querySelector(".list").classList.add('hide-search-list');

            const List = document.querySelector(".row");
            List.classList.remove('hide-search-list');

            let HTML = "";
            for (let i = 0; i < data_responce.length; i++) {
                HTML += `
            <div class="col-3 search-list-element" style="background-color:white;" data-id="${data_responce[i].imdbID}">
                <img width="200px" class="d-inline rounded" src="${data_responce[i].Poster}" alt="poster" />
                <h6 style="margin-top:auto;" class="search-list-title mx-4 my-3">${data_responce[i].Title}</h6>
            </div>
            `;
            }

            List.innerHTML = HTML;

            // This handles click on the list 
            const clicked_item = document.querySelectorAll('.search-list-element');
            clicked_item.forEach(item => {
                item.addEventListener('click', async () => {

                    document.querySelector(".list").classList.remove('hide-search-list');
                    document.querySelector(".row").classList.add('hide-search-list');

                    let item_info = await fetch_item_details(item.dataset.id);
                    if (item_info.Response) {
                        let languages = "";
                        for (let i = 0; i < item_info.Language.split("," || " ").length; i++) {
                            languages += `<span class="sub-type-language">${item_info.Language.split(',')[i]}</span>`
                        }
                        if (!(item_info.Poster !== 'N/A')) {
                            item_info.Poster = image_not_found;
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
                                    <span id="click-id" data-imdbid=${item_info.imdbID}></span>
                                    <button class="wishlist-btn rounded bg-dark text-white me-auto m-1 p-1 w-75"style="font-size: 13px;">Add to Wishlist</button>
                                </div>
                            </div>
                            <div class="sub-list">
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
                        document.querySelector('.list').innerHTML = detail;
                        document.querySelector('.row').classList.add('hide-search-list');
                    }
                })
            })
        })

        const clicked_item = document.querySelectorAll('.search-list-item');
        clicked_item.forEach(item => {
            item.addEventListener('click', async () => {
                search_list.classList.add('hide-search-list');
                searchbox.value = "";

                let item_info = await fetch_item_details(item.dataset.id);

                let languages = "";
                for (let i = 0; i < item_info.Language.split("," || " ").length; i++) {
                    let lang = `<span class="sub-type-language">${item_info.Language.split(',')[i]}</span>`
                    languages += lang;
                }

                if (!(item_info.Poster !== 'N/A')) {
                    item_info.Poster = image_not_found;
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
                            <span id="click-id" data-imdbid=${item_info.imdbID}></span>
                            <button class="wishlist-btn rounded bg-dark text-white me-auto m-1 p-1 w-75"style="font-size: 13px;">Add to Wishlist</button>
                        </div>
                    </div>
                    <div class="sub-list">
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
                document.querySelector('.list').innerHTML = detail;
            })
        })
    }
})


