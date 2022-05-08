function init() {
    var grid = document.querySelector('.mg-gallery');
    getImages(grid);

    console.log('init');
}

function getImages(grid){
    fetch("https://api.unsplash.com/photos/?client_id=elpPIOqxeDR7wXzrHc3uaL-_7cWSuV7-2_nhayAbBrg")
    .then( response => response.json())
    .then( data => renderImages(data, grid))
    .then( function() {
        var msnry = new Masonry( grid, {
            itemSelector: '.mg-gallery-item',
          //   columnWidth: 100,
            gutter: 10,
            horizontalOrder: true
          });
    });
}

function renderImages (data, grid) {
    var html = '';
    
    for (item of data) {
        var link = item.urls.regular;
        html += '<div class="mg-gallery-item"><img src="' + link + '" alt=""></div>';
    }

    grid.innerHTML = html;
}

