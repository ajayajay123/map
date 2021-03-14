let timer;
let selectedAddress;
let map, marker;
let request = {
placeId: "ChIJN1t_tDeuEmsRUsoyG83frY4",
fields: ["name", "formatted_address", "place_id", "geometry"],
};
let service;
let map1, marker1, geocoder1;

function start()
{
map = new google.maps.Map(document.getElementById("map"), {
center: { lat: 26.8065, lng: 87.2846 },
zoom: 16,
fullscreenControl: false,
mapTypeId: google.maps.MapTypeId.ROADMAP,
});

map.addListener("click", (mapsMouseEvent) => {
console.log(mapsMouseEvent.latLng);
var pos = JSON.stringify(mapsMouseEvent.latLng.toJSON(), null, 2);
var posObj = JSON.parse(pos);
 var inputLocation = document.getElementById("input_location");
inputLocation.value = "LAT:"+posObj.lat+"  LANG:"+posObj.lng;
marker.setMap(null);
marker = new google.maps.Marker({
position: mapsMouseEvent.latLng.toJSON(),
map: map,
});

service.getDetails(request, (place, status) => {
if (
status === google.maps.places.PlacesServiceStatus.OK &&
place &&
place.geometry &&
place.geometry.location
) {
// const marker = new google.maps.Marker({
//     map,
//     position: place.geometry.location,
// });
// google.maps.event.addListener(marker, "click", function () {
//    console.log(place);
    
// });
console.log("service init");
console.log("place is ",place);
}



});
});


}

function startMarker()
{
marker = new google.maps.Marker({
position: { lat: 26.8065, lng: 87.2846 },
map: map,
});

}

function startLocationService()
{
  let geocoder = new google.maps.Geocoder();

  geocoder.geocode({ location: map.getCenter() }, (results, status) => {
  if (status === "OK") {
  if (results[0]) {
  // map.setZoom(11);
  
  console.log("current location", results);
  selectedAddress = results[0].formatted_address; 
  var selectedAddEle = document.getElementById("selected-address");
  selectedAddEle.innerHTML = selectedAddress;
  } else {
  console.log("No results found");
  }
  } else {
  console.log("Geocoder failed due to: " + status);
  }
  //});
  
  }, 3000);  

}

function initMap() {

start();
startMarker();
startLocationService();



}

function showPopUp()
{
  var mapDivPopUp = document.getElementById("popup");
 mapDivPopUp.style.display = "block";
 var popupContainer = document.getElementById("popup-container");
  popupContainer.style.display = "block";
}

function hidePopUp()
{
  var mapDivPopUp = document.getElementById("popup");
 mapDivPopUp.style.display = "none";
 var popupContainer = document.getElementById("popup-container");
  popupContainer.style.display = "none";
}

function setGeocoder()
{
  geocoder = new google.maps.Geocoder();

map1.addListener("mouseup", () => {
// 3 seconds after the center of the map has changed, pan back to the
// marker.
//clearTimeout(timer);
//timer = window.setTimeout(() => {
//map.panTo(marker.getPosition());
console.log("center is",map1.getCenter().toJSON());
var inputBox = document.getElementById("input-box");
geocoder.geocode({ location: map1.getCenter() }, (results, status) => {
if (status === "OK") {
if (results[0]) {
// map.setZoom(11);

console.log("detail", results);
selectedAddress = results[0].formatted_address; 
inputBox.value = selectedAddress;


} else {
console.log("No results found");
}
} else {
console.log("Geocoder failed due to: " + status);
}
//});

}, 3000);

//     google.maps.event.addListener(map1, "dragend", function() {
//    console.log("dragend event postion",map1.getCenter().toUrlValue());
// });

});

}

function addPlacedChangeEvent(searchBox)
{

}

function setAutoComplete()
{
  const center = map1.getCenter().toJSON();
// Create a bounding box with sides ~10km away from the center point
const defaultBounds = {
  north: center.lat + 0.1,
  south: center.lat - 0.1,
  east: center.lng + 0.1,
  west: center.lng - 0.1,
};
const input = document.getElementById("input-box");
var searchBox = new google.maps.places.SearchBox(input, {
  bounds: defaultBounds
});
searchBox.addListener("places_changed", () => {
  const places = searchBox.getPlaces();

  const bounds = new google.maps.LatLngBounds();
  console.log("places searchbox lisiner", places);
  console.log(places[0].geometry.location.lat());
  map1.setCenter({"lat": places[0].geometry.location.lat(), "lng": places[0].geometry.location.lng()});
  selectedAddress = input.value;
});

}

function showSecondMap()
{
map1 = new google.maps.Map(document.getElementById("map1"), {
center: marker.getPosition(),
zoom: 16,
fullscreenControl: false,
mapTypeId: google.maps.MapTypeId.ROADMAP,
});

marker1 = new google.maps.Marker({
position: { lat: 26.8065, lng: 87.2846 },
map: map,
});

setGeocoder();
setAutoComplete();

}

function showCurrentLocation()
{
  var inputBox = document.getElementById("input-box");
geocoder.geocode({ location: map1.getCenter() }, (results, status) => {
if (status === "OK") {
if (results[0]) {
// map.setZoom(11);

console.log("detail", results);
inputBox.value = results[0].formatted_address;


} else {
console.log("No results found");
}
} else {
console.log("Geocoder failed due to: " + status);
}
//});

}, 3000);
}

function showMap() {
  
 showPopUp();
showSecondMap();
showCurrentLocation();
//addSearchEvent();
}

function submitAddress()
{

var selectedAddEle = document.getElementById("selected-address");
selectedAddEle.innerHTML = selectedAddress;

map.setCenter(map1.getCenter());
marker.setPosition(map1.getCenter());

hidePopUp();



}



function addNewAddress()
{
  var allAddress = document.getElementById("all-address");
  var add = selectedAddress.toString().split(',');
  var phoneNo = document.getElementById("phone-no").value;
  allAddress.innerHTML += "<div>"+add[0]+"<br>"+
                          add[1]+"<br>"+phoneNo+"<br></div>";
  console.log("addnewaddress");
}

function closePopUp()
{
  hidePopUp();
}

function addSearchEvent()
{
  var inputBox = document.getElementById("input-box");
  let timerInputBox;
  inputBox.addEventListener("input", function(){
    
    clearTimeout(timerInputBox);
    timerInputBox = setTimeout(function(){
      console.log(inputBox.value);
    }, 300);
  });

}


//bj

/* code edited by me */
const renderObject = function()
{
  Array.from(document.getElementsByClassName("my-select")).forEach(function(element){
    
    let select = element.getElementsByTagName("select");
    let options;
    if(select.length == 0) return;
    select = select[0];
    let height = select.getCSS("height").filterNumber();
    let width = element.getCSS("width").filterNumber();
    let color = element.getCSS("color");
    element.style.height = height + "px";
    let root = element.createNode("div",{class : "my-select-wrapper"}).css({
      display : "block",
      positon : "absolute",
      left : 0,
      top : 0,
      minHeight : height + "px",
      width : width + "px"
    });

    let currentValue = root.createNode("div",{class : "current-value"},"<span>" + select.value + "</span>").css({
      display: "block",
      boxSizing : "border-box",
      position : "relative",
      width : width + "px",
      height : height +"px",
      lineHeight : height + "px"
    })
    .createNode("div").css({
      position : "absolute",
      right:"8px",
      top:height /2 - 4 + "px",
      width:"0",
      height:"0",
      border:"8px solid",
      borderColor : color + "transparent transparent transparent"
    }).parentElement;
    currentValue.addEventListener("click",function(){
      options.style.display = "block";
    })

    options = root.createNode("div",{class : "options"}).css({
      display : "none",
      maxHeight : height * 4 +"px",
      position : "static",
      width : width + "px"
    })
    Array.from(select.getElementsByTagName("option")).forEach(function(option){
      options.createNode("div",{class : "option" , index : options.getElementsByClassName("my-select-option").length, value: option.getAttribute("value")},option.innerHTML).css({
        display: 'block',
        height : height + "px",
        minHeight : height + "px",
        lineHeight : height + "px"
      }).addEventListener("click",function(event){
        event.stopPropagation();
        select.selectedIndex = this.getAttribute("index");
        currentValue.getElementsByTagName("span")[0].innerHTML = this.innerHTML;
        options.style.display = "none";
      });
    });
  });
}
renderObject();



// Dropdown


// var x, i, j, l, ll, selElmnt, a, b, c;
// /* Look for any elements with the class "custom-select": */
// x = document.getElementsByClassName("custom-select");
// l = x.length;
// for (i = 0; i < l; i++) {
//   selElmnt = x[i].getElementsByTagName("select")[0];
//   ll = selElmnt.length;
//   /* For each element, create a new DIV that will act as the selected item: */
//   a = document.createElement("DIV");
//   a.setAttribute("class", "select-selected");
//   a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
//   x[i].appendChild(a);
//   /* For each element, create a new DIV that will contain the option list: */
//   b = document.createElement("DIV");
//   b.setAttribute("class", "select-items select-hide");
//   for (j = 1; j < ll; j++) {
//     /* For each option in the original select element,
//     create a new DIV that will act as an option item: */
//     c = document.createElement("DIV");
//     c.innerHTML = selElmnt.options[j].innerHTML;
//     c.addEventListener("click", function(e) {
//         /* When an item is clicked, update the original select box,
//         and the selected item: */
//         var y, i, k, s, h, sl, yl;
//         s = this.parentNode.parentNode.getElementsByTagName("select")[0];
//         sl = s.length;
//         h = this.parentNode.previousSibling;
//         for (i = 0; i < sl; i++) {
//           if (s.options[i].innerHTML == this.innerHTML) {
//             s.selectedIndex = i;
//             h.innerHTML = this.innerHTML;
//             y = this.parentNode.getElementsByClassName("same-as-selected");
//             yl = y.length;
//             for (k = 0; k < yl; k++) {
//               y[k].removeAttribute("class");
//             }
//             this.setAttribute("class", "same-as-selected");
//             break;
//           }
//         }
//         h.click();
//     });
//     b.appendChild(c);
//   }
//   x[i].appendChild(b);
//   a.addEventListener("click", function(e) {
//     /* When the select box is clicked, close any other select boxes,
//     and open/close the current select box: */
//     e.stopPropagation();
//     closeAllSelect(this);
//     this.nextSibling.classList.toggle("select-hide");
//     this.classList.toggle("select-arrow-active");
//   });
// }

// function closeAllSelect(elmnt) {
//   /* A function that will close all select boxes in the document,
//   except the current select box: */
//   var x, y, i, xl, yl, arrNo = [];
//   x = document.getElementsByClassName("select-items");
//   y = document.getElementsByClassName("select-selected");
//   xl = x.length;
//   yl = y.length;
//   for (i = 0; i < yl; i++) {
//     if (elmnt == y[i]) {
//       arrNo.push(i)
//     } else {
//       y[i].classList.remove("select-arrow-active");
//     }
//   }
//   for (i = 0; i < xl; i++) {
//     if (arrNo.indexOf(i)) {
//       x[i].classList.add("select-hide");
//     }
//   }
// }

// /* If the user clicks anywhere outside the select box,
// then close all select boxes: */
// document.addEventListener("click", closeAllSelect);
