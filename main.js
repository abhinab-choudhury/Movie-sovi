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
        <form class="d-flex my-2 my-lg-0">
            <input class="form-control me-sm-2 m-2" type="text" placeholder="Search">
            <button class="btn btn-outline-success my-2" type="submit">Search</button>
        </form>
    </div>
</div>
</nav>
`

