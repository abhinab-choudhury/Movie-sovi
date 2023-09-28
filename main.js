import './style.css'

document.querySelector('#navbar').innerHTML = `
<nav class="navbar navbar-expand-sm navbar-light bg-light">
<div class="container">
    <img class="me-4" width="67" height="67" src="https://img.icons8.com/color/100/cinema---v1.png" alt="cinema---v1"/>
    <a class="navbar-brand" href="#">Movie-sovi</a>
    <button class="navbar-toggler d-lg-none" type="button" data-bs-toggle="collapse"
        data-bs-target="#collapsibleNavId" aria-controls="collapsibleNavId" aria-expanded="false"
        aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="collapsibleNavId">
        <ul class="navbar-nav me-auto mt-2 mt-lg-0">
            <li class="nav-item">
                <a class="nav-link active" href="#" aria-current="page">Home <span
                        class="visually-hidden">(current)</span></a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="#">Movies</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="#">Series</a>
            </li>
        </ul>
        <form class="search-box d-flex my-2 my-lg-0">
            <input class="form-control me-sm-2 m-2 w-75" type="text" placeholder="Search">
            <button class="btn btn-outline-success my-2" type="submit">Search</button>
        </form>
    </div>
</div>
</nav>
`
document.querySelector('#view-area').innerHTML = `
    <div class="container border rounded my-3"> </div>
            <div class="container list">
                <div class="item">
                    <img class="main-poster" src="https://m.media-amazon.com/images/M/MV5BY2FmZTY5YTktOWRlYy00NmIyLWE0ZmQtZDg2YjlmMzczZDZiXkEyXkFqcGdeQXVyNjg4NzAyOTA@._V1_SX300.jpg" alt="poster">
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
                                <div class="d-flex">
                                    <span class="sub-type-year"> Movie 2012</span>
                                    <h5 class="text-wrap" style="width: 80%;">The Big Bang Theory: It All Started with a Big Bang</h5> 
                                    <img class="poster" width="180" height="230" src="./public/movie_not_found.jpg" alt="Movie Not Found"> 
                                </div>
                            </div>
                            <div class="sub-list container">
                                <div class="d-flex">
                                    <h5>The Big Bang Theory </h5>  
                                    <img class="poster" width="180" height="230" src="./public/movie_not_found.jpg" alt="Movie Not Found"> 
                                    <span class="sub-type-year"> Movie 2007</span>  
                                </div>
                            </div>
                            <div class="sub-list container">
                                <div class="d-flex">
                                    <h5>The Big Bang Theory: Access All Areas </h5>  
                                    <img class="poster" width="180" height="230" src="./public/movie_not_found.jpg" alt="Movie Not Found"> 
                                    <span class="sub-type-year"> Movie 2012</span> 
                                </div>
                            </div>
                            <div class="sub-list container">
                                <div class="d-flex">
                                    <h5 class="mr-auto">The Big Bang Theory: Set Tour with Simon & Kunal</h5>  
                                    <img class="poster" width="180" height="230" src="./public/movie_not_found.jpg" alt="Movie Not Found"> 
                                    <span class="sub-type-year"> Movie 2010</span> 
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
`

