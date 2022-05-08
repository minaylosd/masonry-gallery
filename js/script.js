function init() {
    var grid = document.querySelector('.mg-gallery');
    

    console.log('init');

    let params = new URLSearchParams(document.location.search);
    let query = params.get('search') || '';
    if (query !== '') {
        document.querySelector('.mg-searchbar-input').value = query;
    }

    getImages(grid, query);
}

function getImages(grid, query){
    fetch("https://api.unsplash.com/search/photos/?client_id=elpPIOqxeDR7wXzrHc3uaL-_7cWSuV7-2_nhayAbBrg&query=" + query)
    .then( response => response.json())
    .then( data => renderImages(data.results, grid))
    .then( function() {
        var msnry = new Masonry( grid, {
            itemSelector: '.mg-gallery-item',
            gutter: 10,
            horizontalOrder: true
          });
    });
}

function renderImages (data, grid) {
    var html = '';
    
    for (item of data) {
        var link = item.urls;
        html += `<div data-full="${link.full}" data-raw="${link.raw}" data-regular="${link.regular}" data-small="${link.small}"
         data-small_s3="${link.small_s3}" data-thumb="${link.thumb}"
          class="mg-gallery-item"><img src="${link.regular}" alt=""></div>`;
    }

    grid.innerHTML = html;
}

var overlay_wrapper = document.querySelector('.mg-gallery-overlay-wrapper');
overlay_wrapper.addEventListener('click', function(event) {
    event.stopPropagation();
    console.log(event.target);
    if (event.target.classList.contains('mg-gallery-overlay-wrapper')) {
        overlay_wrapper.style.display = 'none';
        overlay_wrapper.style.overflow = 'visible';
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

    document.querySelector('.mg-gallery-overlay-wrapper').style.display = 'block';
    document.querySelector('.mg-gallery-overlay-wrapper').style.overflow = 'hidden';
    
})

function searchSubmit(event) {
    event.preventDefault();

    window.location = '?search=' + document.querySelector('.mg-searchbar-input').value;
}

var form = document.querySelector('.mg-searchbar').addEventListener('submit', searchSubmit);

