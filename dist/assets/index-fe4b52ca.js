(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))n(s);new MutationObserver(s=>{for(const l of s)if(l.type==="childList")for(const c of l.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&n(c)}).observe(document,{childList:!0,subtree:!0});function a(s){const l={};return s.integrity&&(l.integrity=s.integrity),s.referrerPolicy&&(l.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?l.credentials="include":s.crossOrigin==="anonymous"?l.credentials="omit":l.credentials="same-origin",l}function n(s){if(s.ep)return;s.ep=!0;const l=a(s);fetch(s.href,l)}})();const u="2b171025",m="./public/poster_not_found.jpg";let p=document.querySelector(".search-box"),o=document.querySelector(".search-list");p.addEventListener("keyup",async function(){let t=p.value.trim();t.length>0?(o.classList.remove("hide-search-list"),y(t)):o.classList.add("hide-search-list")});document.addEventListener("click",t=>{if(t.target.classList!="input-field"&&o.classList.add("hide-search-list"),document.querySelector(".wishlist-btn").classList.contains("wishlist-btn")){const e=document.querySelector(".wishlist-btn").dataset.imdbid;JSON.parse(localStorage.getItem("wishlist")).contains(e)?(console.log(localStorage.getItem("wishlist")),v(e)):f(e)}});function f(t){let e=JSON.parse(localStorage.getItem("wishlist"))||[];const a=e.indexOf(t);a!==-1&&e.splice(a,1),localStorage.setItem("wishlist",JSON.stringify(e))}function v(t){let e=JSON.parse(localStorage.getItem("wishlist"))||[];e.push(t),localStorage.setItem("wishlist",JSON.stringify(e))}async function y(t){const e=`http://www.omdbapi.com/?apikey=${u}&page=1&s=${t}`,a=await fetch(`${e}`).then(n=>n.json());a&&a.Response=="True"&&b(a.Search)}async function h(t){const e=`https://www.omdbapi.com/?apikey=${u}&i=${t}`;return await(await fetch(e)).json()}function b(t){let e="";for(let a=0;a<t.length;a++){t[a].Poster==="N/A"&&(t[a].Poster=m);let n=`
        <div class="search-list-item" data-id="${t[a].imdbID}">
            <div class="search-item-thumbnail">
                <img src=${t[a].Poster} alt="poster">
            </div>
            <div class="search-item-info">
                <h5 class="text-wrap movie-name">
                    <span class="text-muted">${t[a].Type}</span> <br>
                    ${t[a].Title}
                </h5>
            </div>
        </div>
        `;e+=n}document.getElementById("search-list").innerHTML=e,w(t)}async function w(t){document.querySelector("#search-btn").addEventListener("click",async()=>{document.querySelector(".list").classList.add("hide-search-list");const n=document.querySelector(".row");n.classList.remove("hide-search-list");let s="";for(let c=0;c<t.length;c++)s+=`
            <div class="col-3 search-list-element" style="background-color:white;" data-id="${t[c].imdbID}">
                <img width="200px" class="d-inline rounded" src="${t[c].Poster}" alt="poster" />
                <h6 style="margin-top:auto;" class="search-list-title mx-4 my-3">${t[c].Title}</h6>
            </div>
            `;n.innerHTML=s,document.querySelectorAll(".search-list-element").forEach(c=>{c.addEventListener("click",async()=>{document.querySelector(".list").classList.remove("hide-search-list"),document.querySelector(".row").classList.add("hide-search-list");let i=await h(c.dataset.id);if(i.Response){let r="";for(let d=0;d<i.Language.split(",").length;d++)r+=`<span class="sub-type-language mx-2">${i.Language.split(",")[d]}</span>`;i.Poster==="N/A"&&(i.Poster=m);let g=`
                    <img class="main-poster"
                    src="${i.Poster}"
                    alt="poster">
                    <div class="item-list">
                    <div class="details">
                        <div class="box">
                            <h1 class="title"> ${i.Title} </h1>
                            <div class="info">
                                <span class="type">${i.Type}</span>
                                <h3 class="aired">${i.Year}</h3>
                                <button data-imdbid=${i.imdbID} class="wishlist-btn rounded bg-dark text-white p-1 m-1" style="font-size: 13px;">Add to Wishlist</button>
                            </div>
                        </div>
                        <div class="sub-list">
                            <div class="d-flex">
                                <span class="sub-type-year"> 
                                    ${i.Released}
                                </span>
                                
                                <p class="info-rating">
                                    <span class="tags" title="Ratings">
                                        <img src="https://img.icons8.com/color/48/imdb.png" alt="imdb"/>                                       
                                        <img class="space" width="28" height="28" src="https://img.icons8.com/fluency/48/star--v1.png" alt="star--v1"/> 
                                        ${i.imdbRating}
                                    </span>
                                    <span class="tags" title="Votes">
                                        <img class="space" src="https://img.icons8.com/parakeet/48/starred-ticket.png" alt="starred-ticket"/>
                                        ${i.imdbVotes}
                                    </span>
                                    <span class="tags" title="Genre">
                                        <img class="space"  src="https://img.icons8.com/arcade/64/comet.png" alt="comet"/>
                                        ${i.Genre}
                                    </span>
                                </p>
                                </div>
                                <div class="language" title="Lanuages Avilable"> 
                                    ${r}
                                </div>
                                <p class="text-wrap plot" >
                                    ${i.Plot}    
                                    </p>
                                    </div>
                            <div class="actors">
                            <span class="text-muted">Actors :</span> 
                            <div class="actors-names">${i.Actors}</div>
                            </div>
                            <div style="display: flex; justify-content:center; align-items:center;">
                                <img width="48" height="48" src="https://img.icons8.com/color/48/prize.png" alt="prize"/>
                                <span class="text-muted">${i.Awards}</span>
                            </div>
                        </div>
                    </div>
                    `;document.querySelector(".list").innerHTML=g,document.querySelector(".row").classList.add("hide-search-list")}})})}),document.querySelectorAll(".search-list-item").forEach(n=>{n.addEventListener("click",async()=>{o.classList.add("hide-search-list"),p.value="";let s=await h(n.dataset.id),l="";for(let i=0;i<s.Language.split(",").length;i++){let r=`<span class="sub-type-language mx-2">${s.Language.split(",")[i]}</span>`;l+=r}s.Poster==="N/A"&&(s.Poster=m);let c=`
            <img class="main-poster"
            src="${s.Poster}"
            alt="poster">
            <div class="item-list">
            <div class="details">
                <div class="box">
                    <h1 class="title"> ${s.Title} </h1>
                    <div class="info">
                        <span class="type">${s.Type}</span>
                        <h3 class="aired">${s.Year}</h3>
                        <button data-imdbid=${s.imdbID} class="wishlist-btn rounded bg-dark text-white p-1 m-1" style="font-size: 13px;">Add to Wishlist</button>
                    </div>
                </div>
                <div class="sub-list">
                    <div class="d-flex">
                        <span class="sub-type-year"> 
                            ${s.Released}
                        </span>
                        
                        <p class="info-rating">
                            <span class="tags" title="Ratings">
                                <img src="https://img.icons8.com/color/48/imdb.png" alt="imdb"/>                                       
                                <img class="space" width="28" height="28" src="https://img.icons8.com/fluency/48/star--v1.png" alt="star--v1"/> 
                                ${s.imdbRating}
                            </span>
                            <span class="tags" title="Votes">
                                <img class="space" src="https://img.icons8.com/parakeet/48/starred-ticket.png" alt="starred-ticket"/>
                                ${s.imdbVotes}
                            </span>
                            <span class="tags" title="Genre">
                                <img class="space"  src="https://img.icons8.com/arcade/64/comet.png" alt="comet"/>
                                ${s.Genre}
                            </span>
                        </p>
                        </div>
                        <div class="language" title="Lanuages Avilable"> 
                            ${l}
                        </div>
                        <p class="text-wrap plot" >
                            ${s.Plot}    
                            </p>
                            </div>
                    <div class="actors">
                    <span class="text-muted">Actors :</span> 
                    <div class="actors-names">${s.Actors}</div>
                    </div>
                    <div style="display: flex; justify-content:center; align-items:center;">
                        <img width="48" height="48" src="https://img.icons8.com/color/48/prize.png" alt="prize"/>
                        <span class="text-muted">${s.Awards}</span>
                    </div>
                </div>
            </div>
            `;document.querySelector(".list").innerHTML=c})})}
