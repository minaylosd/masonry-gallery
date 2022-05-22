function init() { 
    var grid = document.querySelector('.mg-gallery'); 
    var paginationContainer = document.querySelector('.pagination-container'); 
    let params = new URLSearchParams(document.location.search); 
    let query = params.get('search') || ''; 
    let pPage = params.get('per_page') || '10';
    let pageNum = params.get('page') || '1';
 
    if (query !== '') { 
        document.querySelector('.mg-searchbar-input').value = query; 
        document.querySelector('.items-per-page-container').style.display = 'flex'; 
        paginationContainer.style.display = 'flex'; 
    } else { 
        document.querySelector('.mg-searchbar-wrapper').style.margin = '30vh 0 0 0'; 
    } 
 
    let perPageLink = document.querySelectorAll('.number-of-items'); 
    let eventArray = [0, 0, 0];
    for (var p of perPageLink) { 
        p.addEventListener('click', function(event) { 
            eventArray[p] += event.target.textContent;
            pPage = event.target.textContent;
            document.location.href = window.location.pathname + '?search=' + query + '&per_page=' + pPage;
        }); 
    } 
 
    getImages(grid, query, pPage, paginationContainer, pageNum); 
} 
 
function getImages(grid, query, pPage, paginationContainer, pageNum){ 
    fetch("https://api.unsplash.com/search/photos/?client_id=elpPIOqxeDR7wXzrHc3uaL-_7cWSuV7-2_nhayAbBrg&query="
     + query + '&per_page=' + pPage + '&page=' + pageNum) 
    .then( response => response.json()) 
    .then( data => { 
        var m = data.total_pages; 
        renderImages(data.results, grid, paginationContainer, m, pPage, pageNum, query); 
        } 
    ) 
} 
 
 
function renderImages (data, grid, paginationContainer, m, pPage, pageNum, query) { 
    var html = ''; 
    var i = 0; 
    var gap = 0; 
    var topOffset = [0, 0, 0, 0]; 
    for (item of data) { 
        var link = item.urls; 
        var leftOffset = 200 * i + gap; 
        var height = 200 / item.width * item.height; 
        
        html += `<div data-full="${link.full}" data-raw="${link.raw}" data-regular="${link.regular}" data-small="${link.small}" 
         data-small_s3="${link.small_s3}" data-thumb="${link.thumb}" style="left:${leftOffset}px; top:${topOffset[i]}px" 
          class="mg-gallery-item"><img src="${link.regular}" alt=""></div>`; 
         
        topOffset[i] += height + 10; 
        i++; 
        gap += 10; 
        if (i >= 4) {  
            i = 0; 
            gap = 0; 
        }  
         
    } 
    let n = 1; 
    let pagination = `<div class="pagination-item">${n}</div><div class="pagination-item">${n+1}</div> 
    <div class="pagination-item">${n+2}</div>...<div class="pagination-item">${m}</div>`; 
    grid.style.height = Math.max(...topOffset) + 'px'; 
    grid.innerHTML = html; 
    paginationContainer.innerHTML = pagination; 
    paginationItem = document.querySelectorAll('.pagination-item');
    paginationEvent(n, paginationItem, m, pPage, pageNum, query);
    function paginationEvent(n, paginationItem, m, pPage, pageNum, query) {
        for(var j of paginationItem) {
            j.addEventListener('click', function(event) {
                pageNum = event.target.textContent;
                document.location.href = window.location.pathname + '?search=' + query + '&per_page=' + pPage + '&page=' + pageNum;
            })
        }
    }
}  
 
var overlay_wrapper = document.querySelector('.mg-gallery-overlay-wrapper'); 
overlay_wrapper.addEventListener('click', function(event) { 
    event.stopPropagation(); 
    console.log(event.target); 
    if (event.target.classList.contains('mg-gallery-overlay-wrapper')) { 
        overlay_wrapper.style.display = 'none'; 
        document.querySelector('body').style.overflow = 'visible'; 
        document.querySelector('.mg-gallery-overlay-content-image').style.height = 'max-content'; 
        document.querySelector('.mg-gallery-overlay-content-image').style.width = 'inherit'; 
    } 
}) 
 
 
document.querySelector('.mg-gallery').addEventListener('click', function(e) { 
    var dataset = e.target.parentElement.dataset; 
 
    var full_url = dataset.full; 
    var raw_url = dataset.raw; 
    var regular_url = dataset.regular; 
    var small_url = dataset.small; 
    var small_s3_url = dataset.small_s3; 
    var thumb_url = dataset.thumb; 
 
    document.querySelector('.mg-gallery-overlay-content-image img').src = regular_url; 
 
    console.log(e.target.offsetHeight); 
    console.log(e.target.offsetWidth); 
    if (e.target.offsetHeight > e.target.offsetWidth) { 
        document.querySelector('.mg-gallery-overlay-content-image').style.width = '400px'; 
    } 
 
    document.querySelector('.mg-gallery-overlay-wrapper').style.display = 'block'; 
    document.querySelector('body').style.overflow = 'hidden';

}) 
 
function searchSubmit(event) { 
    event.preventDefault(); 
    
    window.location = '?search=' + document.querySelector('.mg-searchbar-input').value; 
} 
    
var form = document.querySelector('.mg-searchbar').addEventListener('submit', searchSubmit);

