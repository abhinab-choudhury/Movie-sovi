import './style.css'

const API_KEY = '2b171025'
var searchbox = document.querySelector('.search-box')

searchbox.addEventListener("keyup", async function() {
    let searchTerm = (searchbox.value).trim();
    if(searchTerm.length > 0) {
        fetch_data(searchTerm)
    }
})

async function fetch_data(search) {
    const URL = `http://www.omdbapi.com/?apikey=${API_KEY}&page=1&s=${search}`
    const data = await(await fetch(`${URL}`)).json()
    if(data.Response = "True")
        displayList();
}  

