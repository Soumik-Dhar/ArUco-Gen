// function to generate a marker as a 5x5 matrix of 0s and 1s.
function markerMatrix(id) {
  const ids = [16, 23, 9, 14];
  let marker = [
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0]
  ];

  for (let j = 0; j < 5; j++) {
    let index = ((id >> 2 * (4 - j)) & 3);
    let val = ids[index];
    for (let i = 0; i < 5; i++) {
      if (((val >> (4 - i)) & 1))
        marker[i][j] = 1;
      else
        marker[i][j] = 0;
    }
  }
  return marker;
}

// function to create and download an svg image of the marker
function toSVG(id, size, marker) {
  size = 'height="' + size + '" width="' + size + '"';
  // storing svg element as a string
  let image =
    '<svg ' + size + ' viewBox="0 0 9 9" version="1.1" xmlns="http://www.w3.org/2000/svg">\n' +
    ' <rect x="0" y="0" height="9" width="9" fill="white"/>\n' +
    ' <svg x="1" y="1" height="7" width="7" shape-rendering="crispEdges">\n' +
    '  <rect x="0" y="0" height="7" width="7" fill="black"/>\n';

  for (let j = 0; j < 5; j++)
    for (let i = 0; i < 5; i++)
      if (marker[i][j] === 1)
        image += '  <rect x="' + (i + 1) + '" y="' + (j + 1) + '" height="1" width="1" fill="white"/>\n';

  image += ' </svg>\n</svg>';
  // download marker as .svg
  $(".svg-download").attr({
    href: "data:image/svg+xml;utf8," + image,
    download: "aruco-marker-ID-" + id
  });
  return image;
}

// function to convert the svg marker to png/jpeg format
function toPNGorJPEG(id, size, svgMarker, format) {
  // converting units to px
  size = convertToPX(size);
  // setting up the canvas
  let canvas = $("#canvas")[0];
  canvas.height = size;
  canvas.width = size;
  let ctx = canvas.getContext("2d");
  let DOMURL = (self.URL || self.webkitURL || self);
  // creating raster image
  let img = new Image();
  let svg = new Blob([svgMarker], {
    type: "image/svg+xml;charset=utf-8"
  });
  img.src = DOMURL.createObjectURL(svg);
  // drawing the rasterized image on the canvas
  img.onload = function() {
    ctx.drawImage(img, 0, 0);
    // getting image url in png/jpeg format
    let image = canvas.toDataURL("image/" + format);
    // download marker as png/jepg
    $("." + format + "-download").attr({
      href: image,
      download: "aruco-marker-ID=" + id
    });
  };
}

// convert units to px
function convertToPX(size) {
  let unit = size.slice(-2);
  size = size.slice(0, -2);
  // conversion factor
  factor = {
    mm: (size / (25.4 / 96)),
    in: (size / (1 / 96)),
    px: size
  };
  return factor[unit];
};
