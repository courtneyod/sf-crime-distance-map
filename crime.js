var crimeData = require("./crime.json");
var streetGraph = require("./streetNode.js");

var incidents = {};



function crimeParser(crimeData){
  for(var i = 0; i < 10; i++){
    var crimeType = crimeData.data[i][9];
    var crimeLat = crimeData.data[i][18];
    var crimeLng = crimeData.data[i][17];
    var keyString = "Lat" + crimeLat.toString() + "Lng" + crimeLng.toString();
    if(incidents[keyString]){
      if(incidents[keyString][crimeType]){
        incidents[keyString][crimeType] = incidents[keyString][crimeType] + 1;
      } else {
        incidents[keyString][crimeType] = 1;
      }
    } else {
      var obj = {};
      obj[crimeType] = 1;
      incidents[keyString] = obj;
    }

    }
  }

crimeParser(crimeData);
