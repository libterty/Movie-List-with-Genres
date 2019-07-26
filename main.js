const BASE_URL = 'https://movie-list.alphacamp.io';
const INDEX_URL = BASE_URL + '/api/v1/movies/';
const POSTER_URL = BASE_URL + '/posters/';
const movieList = document.querySelector('#movie-list');
const dataPanel = document.querySelector('#data-panel');
const data = [];
const movie = {
    "1": "Action",
    "2": "Adventure",
    "3": "Animation",
    "4": "Comedy",
    "5": "Crime",
    "6": "Documentary",
    "7": "Drama",
    "8": "Family",
    "9": "Fantasy",
    "10": "History",
    "11": "Horror",
    "12": "Music",
    "13": "Mystery",
    "14": "Romance",
    "15": "Science Fiction",
    "16": "TV Movie",
    "17": "Thriller",
    "18": "War",
    "19": "Western"
}

let dataTemp = {};

axios.get(INDEX_URL)
    .then((response) => {
        data.push(...response.data.results);
    }).catch((err) => alert(err));

movieList.addEventListener('click', (event) => {
    if (event.target.matches('.nav-link')) {
        let itemId = Number(event.target.dataset.id);
        let itemIdStr = event.target.dataset.id;
        if (Object.keys(dataTemp).indexOf(itemIdStr) !== -1) {
            dataTemp[itemId].length = 0;
        };
        data.forEach(function(item) {
            if (item.genres.indexOf(itemId) !== -1) {
                if (Object.keys(dataTemp).indexOf(itemIdStr) !== -1) {
                    dataTemp[itemId].push(item);
                } else {
                    dataTemp[itemId] = [];
                    dataTemp[itemId].push(item);
                }
            }
        });
        displayDataList(dataTemp);
    }
});

function classifcation() {
    let itemId = Number(event.target.dataset.id);
    let movieId = itemId - 1;
    if (typeof(dataTemp[itemId]) === "object") {
        for (let k = 0; k < dataTemp[itemId].length; k++) {
            for (let b = 0; b < dataTemp[itemId][k].genres.length; b++) {
                for (let a = 0; a < 19; a++) {
                    let movieKey = Number(Object.keys(movie)[a]);
                    let movieValue = Object.values(movie)[a];
                    let newArr = dataTemp[itemId][k].genres.slice(0);
                    if (newArr[b] === movieKey) {
                        newArr[b] = movieValue;
                        let showCategory = event.target.parentElement.parentElement.parentElement.parentElement.children[1].children[k].children[0].children[2];
                        showCategory.innerHTML += `<p>${newArr[b]}</P>`;
                    }
                }
            }
        }
    }

};

function displayDataList(dataTemp) {
    if (dataPanel.childElementCount !== 0 || dataPanel.childNodes[0] !== null) {
        emptyContent();
    };
    let itemId = Number(event.target.dataset.id);
    if (typeof(dataTemp[itemId]) !== "object") {
        dataPanel.innerHTML = `Sorry we don't have corresponding content in our genres`
    } else {
        dataTemp[itemId].forEach(function(obj) {
            dataPanel.innerHTML += `
                <div class="flex">
                    <div class="card mb-2">
                        <img class="card-img-top" src="${POSTER_URL}${obj.image}" alt="Card image cap">
                        <div class="card-body movie-item-body">
                            <h6>${obj.title}</h6>
                        </div>
                        <div class="modal-footer">
                        </div>
                    </div>
                </div>
            `;
        });
    }
    classifcation();
};

function emptyContent() {
    while (dataPanel.firstChild) {
        dataPanel.removeChild(dataPanel.firstChild);
    }
}