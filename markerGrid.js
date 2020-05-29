// getting form data from query string
const urlParams = new URLSearchParams(window.location.search);
const quantity = urlParams.get('quantity');
// setting the number of rows with 5 markers per row
const row = quantity / 5;
$(".label").html('<strong>Showing ' + quantity + ' markers</strong>');

// function to create a grid of 'row' x 5 random markers
function makeGrid() {
  let markers = '';
  // generating a 'row' x 5 grid
  for (let i = 0; i < row; i++) {
    markers += '<div class="row">';
    // filling each row with 5 random markers
    for (let j = 0; j < 5; j++) {
      markers += '<div class="cell">' + createMarker() + '</div>';
    }
    markers += '</div>';
  }
  // displaying entire grid of 'row' x 5 random markers
  $(".group").html(markers);
}

// function to create a random marker in SVG format
function createMarker() {
  // generating a random ID
  let id = Math.floor(Math.random() * 1024);
  // generating marker matrix
  let marker = markerMatrix(id);
  // setting a fixed marker size for displaying only
  let svgMarker = toSVG(id, "100%", marker);
  svgMarker += "\n<small>ID - <b>" + id + "</b></small>";
  // returning marker
  return svgMarker;
}
