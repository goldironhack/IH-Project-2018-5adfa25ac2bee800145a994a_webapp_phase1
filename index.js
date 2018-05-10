
const N_NAMES_URL ="https://data.cityofnewyork.us/api/views/xyye-rtrs/rows.json?accessType=DOWNLOAD";
const D_GEOSHAPES_URL ="http://services5.arcgis.com/GfwWNkhOj9bNBqoJ/arcgis/rest/services/nycd/FeatureServer/0/query?where=1=1&outFields=*&outSR=4326&f=geojson";
const CRIME_URL ="https://data.cityofnewyork.us/api/views/qgea-i56i/rows.json";
const NY_HOUSING_URL ="https://data.cityofnewyork.us/api/views/hg8x-zxpr/rows.json?accessType=DOWNLOAD";
var infoRows = [];
var CrimeInfoRows = [];
var GeoInfoRows = [];
var GeoBoroInfoRows = [];
var HousingInfoRows = [];
var valor;
var initialCoordenates = {lat: 40.7291, lng: -73.9965};

const API_KEY = "AIzaSyCFalfoycG5PFQam2KTm9jpcUS9jkYbq0w";

function initMap(){
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 12  ,
    center: initialCoordenates

  });

  university_marker = new google.maps.Marker({
    position: initialCoordenates,
    map: map
  });

}


function getDistrictData() {
  var data = $.get(N_NAMES_URL, function() {})
    .done(function() {
      console.log("Done-DistrictData");
      console.log(data.responseJSON.data[0]);
      var dataRow = data.responseJSON.data;
      for (var i = 0; i < dataRow.length; i++) {
        infoRows.push([dataRow[i][16], dataRow[i][10], dataRow[i][9]]);
      }

      var tableReference = $("#tableBody")[0];
      var newRow, coordenates, neighborhood, borough;
      for (var j = 0; j < infoRows.length; j++) {
        newRow = tableReference.insertRow(tableReference.length);
        borough  = newRow.insertCell();
        neighborhood = newRow.insertCell();
        coordenates = newRow.insertCell();

        borough.innerHTML = infoRows[j][0]
        neighborhood.innerHTML = infoRows[j][1];
        coordenates.innerHTML = infoRows[j][2];

      }

    })
    .fail(function (error) {
      console.log(error);
    })
}

function getCrimeData() {
  console.log("BeforeDone-CrimeData");
  var CrimeData = $.get(CRIME_URL, function() {})

    .done(function() {
      console.log(CrimeData);
      console.log(CrimeData.responseJSON.data[0]);
      var CrimeDataRow = CrimeData.responseJSON.data('CMPLNT_FR_DT', );
      for(var k=0; k< CrimeDataRow.length; k++){
        CrimeInfoRows.push([CrimeDataRow[k][13],CrimeDataRow[k][15], CrimeDataRow[k][22], CrimeDataRow[k][32]]);
      }
      var tableReference =$("#CrimeTableBody")[0];
      var CrimeNewRow, CrimeDate, CrimeDescription, CrimeBorough, CrimeCoordenates;
      for (var l=0; l<CrimeInfoRows.lenght; l++){
        newRow = tableReference.insertRow(tableReference.length);
        CrimeDate  = newRow.insertCell();
        CrimeDescription = newRow.insertCell();
        CrimeBorough = newRow.insertCell();
        CrimeCoordenates = newRow.insertCell();

        CrimeData.innerHTML = CrimeInfoRows[l][0];
        CrimeDescription.innerHTML = CrimeInfoRows[l][1];
        CrimeBorough.innerHTML = CrimeInfoRows[j][l];
        CrimeCoordenates.innerHTML = CrimeInfoRows[l][3];
      }


  })
  .fail(function (error) {
    console.log("Error");
    console.log(error);
  })

  console.log("FinCrimeData");
}

function getGeoShapesData() {
  console.log("Before Done-GeoData");
  var GeoData = $.get(D_GEOSHAPES_URL, function() {})
    .done(function() {

      //console.log("Done-GeoData");
      //console.log(JSON.parse(GeoData.responseText).features[0].geometry.coordinates);
      //console.log("Boros:");
      //console.log(JSON.parse(GeoData.responseText).features[0].properties.BoroCD) ;
      //console.log(JSON.parse(GeoData.responseText).features[0]);

      var GeoDataRow = JSON.parse(GeoData.responseText).features;

      for (var i = 0; i < GeoDataRow.length; i++) {
        GeoInfoRows.push(GeoDataRow[i].geometry.coordinates);
        GeoBoroInfoRows.push(GeoDataRow[i].properties.BoroCD)
      }


    })
    .fail(function (error) {
      console.log(error);
    })
    console.log("Fin-GeoData");
}

function getHousingData() {
  var HousingData = $.get(NY_HOUSING_URL, function() {})
    .done(function() {
      console.log("Done-HousingData");
      console.log(HousingData.responseJSON.data[0]);
      var HousingDataRow = HousingData.responseJSON.data;
      for (var i = 0; i < HousingDataRow.length; i++) {
        HousingInfoRows.push([HousingDataRow[i][15], HousingDataRow[i][25], HousingDataRow[i][26], HousingDataRow[i][31]]);
      }

      var tableReference = $("#HousingTableBody")[0];
      var newRow, borough, lat, long, ExtremeLow;
      for (var j = 0; j < HousingInfoRows.length; j++) {
        newRow = tableReference.insertRow(tableReference.length);
        borough  = newRow.insertCell();
        lat = newRow.insertCell();
        long = newRow.insertCell();
        ExtremeLow = newRow.insertCell();

        borough.innerHTML = HousingInfoRows[j][0]
        lat.innerHTML = HousingInfoRows[j][1];
        long.innerHTML = HousingInfoRows[j][2];
        ExtremeLow.innerHTML = HousingInfoRows[j][3];

      }

    })
    .fail(function (error) {
      console.log(error);
    })
}

let getCrimes = () => {
  fetch(CRIME_URL)
    .then( function(response){
      console.log(response.data)
      ;
    })
}

$("document").ready(function () {
  $("#getData").on("click", getDistrictData)
  $("#getHousingData").on("click", getHousingData)
  $("#getCrimeData").on("click", getCrimes)
  $("#getGeoData").on("click", getGeoShapesData)
});
