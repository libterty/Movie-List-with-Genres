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

let dataTemp = [];

axios.get(INDEX_URL)
    .then((response) => {
        data.push(...response.data.results);
    }).catch((err) => alert(err));

movieList.addEventListener('click', (event) => {
    if (event.target.matches('.nav-link')) {
        // emptyContent放在event第一個執行原因在於清空上一個.nav-link產生的內容，如果empty功能放到後面會沒有任何畫面會輸出
        emptyContent();
        // 注意型別問題
        let itemId = Number(event.target.dataset.id);
        let itemNum = event.target.textContent;
        let restContent = event.target.parentElement.parentElement.parentElement.parentElement.children[1].children;
        console.log(restContent)
        for (let j = 0; j < data.length; j++) {
            if (data[j].genres.indexOf(itemId) !== -1) {
                dataTemp.push(data[j]);
            }
        }
        // 先產生card內容
        displayDataList(dataTemp);
        // classifcation分類功能以上一個displayDataList作為event.target為基礎，所以需要放在displayDataList後面
        classifcation();
    }
})

function classifcation() {
    for (let k = 0; k < dataTemp.length; k++) {
        for (let a = 0; a < Object.keys(movie).length; a++) {
            // 注意型別問題
            let movieKey = Number(Object.keys(movie)[a]);
            let movieValue = Object.values(movie)[a];
            for (let b = 0; b < dataTemp[k].genres.length; b++) {
                if (dataTemp[k].genres[b] === movieKey) {
                    dataTemp[k].genres[b] = movieValue;
                    let showCategory = event.target.parentElement.parentElement.parentElement.parentElement.children[1].children[k].children[0].children[2];
                    showCategory.innerHTML += `<p>${dataTemp[k].genres[b]}</P>`
                }
            }
        }
    }
};

function displayDataList(dataTemp) {
    for (let i = 0; i < dataTemp.length; i++) {
        dataPanel.innerHTML += `
            <div class="flex">
                <div class="card mb-2">
                    <img class="card-img-top" src="${POSTER_URL}${dataTemp[i].image}" alt="Card image cap">
                    <div class="card-body movie-item-body">
                        <h6>${dataTemp[i].title}</h6>
                    </div>
                    <div class="modal-footer">
                    </div>
                </div>
            </div>
        `;
    }
};

function emptyContent() {
    while (dataPanel.firstChild) {
        dataPanel.removeChild(dataPanel.firstChild);
    }
    dataTemp.length = 0;
}