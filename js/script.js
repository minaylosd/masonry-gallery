var grid = document.querySelector('.mg-gallery'); 
var paginationContainer = document.querySelector('.pagination-container');
var searchbarWrapper = document.querySelector('.mg-searchbar-wrapper');
var params = new URLSearchParams(document.location.search);
var perPageLink = document.querySelectorAll('.number-of-items');
var totalPages;
var getParams = {
    query: params.get('search') || '', 
    pPage: params.get('per_page') || '10',
    pageNum: params.get('page') || '1'
    };
var html = ''; 
console.log(params);

async function init() {
    var form = document.querySelector('.mg-searchbar');
    form.addEventListener('submit', async function (event) {
        event.preventDefault();         
        getParams.query = document.querySelector('.mg-searchbar-input').value;
        const state = getParams;
        const title = `'${getParams.query}' - page ` + `${getParams.pageNum} - ` + 'Unsplash';
        const historyUrl = window.location.pathname + '?search=' + getParams.query + '&per_page=' + getParams.pPage + '&page=' + getParams.pageNum;
        history.pushState(state, title, historyUrl);
        history.pushState(state, title, historyUrl);
        pageLayout();
        getImages(getParams);
    });

}

async function getImages(getParams) {
    var imgData;
    if (window.getParams.query !== '') {
        fetch("https://api.unsplash.com/search/photos/?client_id=elpPIOqxeDR7wXzrHc3uaL-_7cWSuV7-2_nhayAbBrg&query="
        + window.getParams.query + '&per_page=' + window.getParams.pPage + '&page=' + window.getParams.pageNum) 
        .then( response => response.json()) 
        .then( data => {
            imgData = data;
            console.log(imgData);
            renderImages(imgData);
            return imgData;          
            } 
        )
    } else {
        window.grid.innerHTML = '';
    }
    // if (window.paramsObj) {
    //     imgData = await getImages(paramsObj);
    // } else {
    //     imgData = await getImages(window.getParams);
    //     console.log(imgData);
    // }
    
}

// function getImages(params){
//     let imgData;
//     if (window.getParams.query !== '') {
//         fetch("https://api.unsplash.com/search/photos/?client_id=elpPIOqxeDR7wXzrHc3uaL-_7cWSuV7-2_nhayAbBrg&query="
//         + window.getParams.query + '&per_page=' + window.getParams.pPage + '&page=' + window.getParams.pageNum) 
//         .then( response => response.json()) 
//         .then( data => {
//             imgData = data;
//             console.log(imgData);
//             window.totalPages = imgData.results.total_pages;  
//             } 
//         );
        
//         return imgData;
//     }
// } 
 
function renderImages (imgData) { 
    createGalleryObj (imgData);
    createPaginationObj (imgData);
    createItemCounter ();
    loadOverlayContent ();
    registerEvents();
}

function createGalleryObj (imgData) {
    let galleryItem = document.querySelectorAll('.mg-gallery-item');
    let i = 0;
    let animationArray = [0, 0, 0, 0]; 
    let gap = 0;
    console.log(imgData.results);
    if (window.grid.innerHTML == '') {
        let topOffset = [0, 0, 0, 0];
        let k = 0;
        let n = 1;
        for (let j = 0; j < getParams.pPage;) {
            let link = imgData.results[j]; 
            let leftOffset = 200 * i + gap; 
            let height = 200 / link.width * link.height;
            let y = document.createElement('div');
                for (item in link.urls) {
                    y.setAttribute(`data-${item}`, `${link.urls[item]}`);
                }
            y.setAttribute('class', 'mg-gallery-item');
            y.setAttribute("style", `left:${leftOffset}px; top:${topOffset[i]}px; height:${height}px`);
            y.innerHTML = `<img src="${link.urls.regular}" alt="">`;
            window.grid.appendChild(y);
            topOffset[i] += height + 10;
            animationArray.push(topOffset[i]); 
            i++;
            j++;
            gap += 10; 
            if (i >= 4) {  
                i = 0; 
                gap = 0; 
            } 
        }
        window.grid.style.height = Math.max(...topOffset) + 'px';
        console.log(animationArray);
        for (item of document.querySelectorAll('.mg-gallery-item')) {
            let pos = (animationArray[item] + 100) * n;
            let funcDelay = 1000 * k;
            item.animate({ top: [`${pos}px`,`${animationArray[item]}px`] }, {duration: 400, endDelay: funcDelay});
            k++;
            n *= -1;
            if (k >= 4) {
                k = 0;
            }
        }
    } else {
        let div = document.querySelector('.mg-gallery-item');
        while(div.firstChild) {
            div.removeChild(div.firstChild);
        }
        let topOffset = [0, 0, 0, 0];
        let i = 0;
        gap = 0;
        let animationArray = [0, 0, 0, 0];
        for (let j = 0; j < imgData.pPage;) {
            let link = imgData.results[j];
            let leftOffset = 200 * i + gap; 
            let height = 200 / link.width * link.height; 
            let y = document.createElement('div');
            for (item in link.urls) {
                y.setAttribute(`data-${item}`, `${link.urls[item]}`);
            }
            y.setAttribute('class', 'mg-gallery-item');
            y.setAttribute("style", `left:${leftOffset}px; top:${topOffset[i]}px; height:${height}px`);
            y.innerHTML = `<img src="${link.urls.regular}" alt="">`;
            window.grid.appendChild(y);
            topOffset[i] += height + 10;
            animationArray.push(topOffset[i]); 
            i++;
            j++;
            gap += 10; 
            if (i >= 4) {  
                i = 0; 
                gap = 0; 
            }
        }
        window.grid.style.height = (Math.max(...topOffset) - 10) + 'px';
    } 
    console.log(animationArray);

    let k = 0;
    let n = 1;
    
    for (let i = 0; i < document.querySelectorAll('.mg-gallery-item').length;) {
        let pos = (animationArray[i] + 100) * n;
        let funcDelay = 400 * k;
        document.querySelectorAll('.mg-gallery-item')[i].animate([{top: `${pos}px`}, {top: `${animationArray[item]}px`}], {duration: 800, endDelay: funcDelay});
        k++;
        i++;
        n *= -1; 
        if (k >= 4) {
            k = 0;
        }
    }
    
    
}

    function createPaginationObj (imgData) {
    let n = 1;
    let m = imgData.total_pages;
    console.log(m);

    let pagination = `<div class="pagination-item">${n}</div><div class="pagination-item">${n+1}</div> 
    <div class="pagination-item">${n+2}</div>...<div class="pagination-item">${m}</div>`; 
    window.paginationContainer.innerHTML = pagination;
    paginationEvent ();
}

function paginationEvent() {
    let paginationItem = document.querySelectorAll('.pagination-item');
    for(var j of paginationItem) {
        j.addEventListener('click', function(event) {
            window.getParams.pageNum = event.target.textContent;
            const state = getParams;
            const title = `'${getParams.query}' - page ` + `${getParams.pageNum} - ` + 'Unsplash';
            const historyUrl = window.location.pathname + '?search=' + getParams.query + '&per_page=' + getParams.pPage + '&page=' + getParams.pageNum;
            history.pushState(state, title, historyUrl);
            history.pushState(state, title, historyUrl);
            getImages(getParams);
        })
    }
}

function createItemCounter() {
    let eventArray = [0, 0, 0];
    for (let p of window.perPageLink) { 
        p.addEventListener('click', function(event) { 
            eventArray[p] += event.target.textContent;
            window.getParams.pPage = event.target.textContent;
            const state = getParams;
            const title = `'${getParams.query}' - page ` + `${getParams.pageNum} - ` + 'Unsplash';
            const historyUrl = window.location.pathname + '?search=' + getParams.query + '&per_page=' + getParams.pPage + '&page=' + getParams.pageNum;
            history.pushState(state, title, historyUrl);
            history.pushState(state, title, historyUrl);
            getImages(getParams);
        }); 
    } 
} 

function loadOverlayContent () {
    document.querySelector('.mg-gallery').addEventListener('click', function(e) { 
        let dataset = e.target.parentElement.dataset; 
    
        let full_url = dataset.full; 
        let raw_url = dataset.raw; 
        let regular_url = dataset.regular; 
        let small_url = dataset.small; 
        let small_s3_url = dataset.small_s3; 
        let thumb_url = dataset.thumb; 
    
        document.querySelector('.mg-gallery-overlay-content-image img').src = regular_url; 
        document.querySelector('.js-link-full').href = full_url;
        document.querySelector('.js-link-raw').href = raw_url;
        document.querySelector('.js-link-regular').href = regular_url;
        document.querySelector('.js-link-small').href = small_url;
        document.querySelector('.js-link-small-s3').href = small_s3_url;
        document.querySelector('.js-link-thumb').href = thumb_url;

        console.log(e.target.offsetHeight); 
        console.log(e.target.offsetWidth); 
        if (e.target.offsetHeight > e.target.offsetWidth) { 
            document.querySelector('.mg-gallery-overlay-content-image').style.width = '400px'; 
        } 
    
        document.querySelector('.mg-gallery-overlay-wrapper').style.display = 'block'; 
        document.querySelector('body').style.overflow = 'hidden';
        closingOverlayEvent ();
    }) 
}

function closingOverlayEvent () {
    let overlayWrapper = document.querySelector('.mg-gallery-overlay-wrapper'); 
    overlayWrapper.addEventListener('click', function(event) { 
        event.stopPropagation(); 
        console.log(event.target); 
        if (event.target.classList.contains('mg-gallery-overlay-wrapper')) { 
            overlayWrapper.style.display = 'none'; 
            document.querySelector('body').style.overflow = 'visible'; 
            document.querySelector('.mg-gallery-overlay-content-image').style.height = 'max-content'; 
            document.querySelector('.mg-gallery-overlay-content-image').style.width = 'inherit'; 
        } 
    }) 
}

function registerEvents() {
    let queryText = document.querySelector('.mg-searchbar-input').value;

    var paramsObj = {
        query: queryText,
        pPage: window.getParams.pPage,
        pageNum: window.getParams.pageNum
    };
    
}


    
// var form = document.querySelector('.mg-searchbar').addEventListener('submit', searchSubmit(event, grid, paginationContainer, params, query, pPage, pageNum));

function pageLayout() {
    if (window.getParams.query !== '') { 
        document.querySelector('.mg-searchbar-input').value = window.getParams.query; 
        document.querySelector('.items-per-page-container').style.display = 'flex'; 
        window.paginationContainer.style.display = 'flex'; 
        window.searchbarWrapper.style.margin = '0 0 0 0';
    } else { 
        window.searchbarWrapper.style.margin = '30vh 0 0 0'; 
    } 
}




// function cycle() {
//     let perPageLink = document.querySelectorAll('.number-of-items');
//     for (j of perPageLink) {
//         j.addEventListener('click', function(event) {
//             j.style.display = 'flex';
//         })
//     }
//     anyOtherFunction(perPageLink[j]);
// }

// function anyOtherFunction(perPageLink) {
//     perPageLink[j].style.color = 'red';
// }