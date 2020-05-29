$(document).ready(function() {
  // disabling download buttons
  $(".download").hide();
  $(".formats").hide();
  // creating and displaying marker with user entered id and size
  getMarker();
  // downloading markers after they are generated
  $("input[type='submit']").click(function() {
    downloadMarker();
  });
});

// function to get marker details - ID, size and unit
function getMarker() {
  // setting marker max size limits based on units chosen
  limitSize("form-1");
  limitSize("form-2");
  // handling form data for fixed markers
  $(".fixed").submit(function(event) {
    // calling form data handler
    handleFormData("form-1");
    event.preventDefault();
  });

  // handling form data for random markers
  $(".random").submit(function(event) {
    // calling form data handler
    handleFormData("form-2");
    event.preventDefault();
  });
}

// function to limit maximum size based on chosen unit
function limitSize(form) {
let size = $("input[name='size-" + form + "']");
let unit = $("select[name='unit-" + form + "']");
  const minLimit = {
    px: 100,
    mm: 25,
    in: 1
  };
  const maxLimit = {
    px: 3780,
    mm: 1000,
    in: 40
  };
  unit.change(function() {
    size.attr("min", minLimit[unit.val()]);
    size.attr("max", maxLimit[unit.val()]);
  });
}

// function to handle user entered form data
function handleFormData(form) {
  let id = "";
  // getting input from fields with names 'size-form-X' and 'unit-form-X'
  let size = $("input[name='size-" + form + "']").val();
  let unit = $("select[name='unit-" + form + "']").val();
  // setting the marker ID based on form selection
  if (form === "form-1")
    id = $("input[name='id']").val();
  else if (form === "form-2")
    id = Math.floor(Math.random() * 1024);
  // handling empty user input
  if (!id)
    id = 0;
  if (!size)
    size = 400;
  // appending selected units to the marker size
  size += unit;
  // displaying generated marker
  setMarker(id, size);
}

// function to generate and display ArUco marker
function setMarker(id, size) {
  // generating marker matrix
  const marker = markerMatrix(id);
  // setting a fixed marker size for displaying only
  let svgMarker = toSVG(id, "100%", marker)
  // displaying marker
  $(".marker").html(svgMarker);
  // generating svg markers with custom sizes for download
  svgMarker = toSVG(id, size, marker);
  // creating marker in png format
  toPNGorJPEG(id, size, svgMarker, "png");
  // creating marker in jepg format
  toPNGorJPEG(id, size, svgMarker, "jpeg");
  // displaying marker ID and size
  $(".marker-info").html("ID - <strong>" + id + "</strong> | Size - <strong>" + size + "</strong> X <strong>" + size + "</strong>");
}

// function to download markers in different formats by toggling download buttons
function downloadMarker() {
  $(".dummy").hide();
  $(".download").show();
  $(".formats").hide();
  $(".download").click(function() {
    $(".download").slideUp(250);
    $(".formats").show();
  });
}
