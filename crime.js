var crimeData = require("./json/cleanCrimeData.json");
// var streetGraph = require("./streetNode.js");
var intersectionsObject = require("./json/intersectionsObject.json");
var cnnObject = require("./json/cnnObject.json");
var graph = require("./graph.js");

var incidents = {};
// var intersectionsObject = JSON.parse(intersectionsObjectJSON);
// var cnnObject = JSON.parse(cnnObjectJSON);

function crimeParser(crimeData){
  for(var i = 0; i < 50; i++){
    var crimeIncident = crimeData.data[i];
    // console.log(crimeData.data[i])
    // console.log(crimeIncident, " crime incident")
    var incidentAddress = crimeIncident[16];
    // console.log(incidentAddress, " incident address")

    if((incidentAddress).indexOf("Block") === -1){
      var splitIntersection = crimeIncident[16].split(" / ");
      // console.log(splitIntersection, " split intersection")
      var intersection1 = splitIntersection[0];
      var intersection2 = splitIntersection[1];

      if(((intersection2[0]).charCodeAt() > 47 && (intersection2[0]).charCodeAt() < 58) && ((intersection2[1]).charCodeAt() < 47 || (intersection2[1]).charCodeAt() > 58)){
        intersection2 = "0" + intersection2;
      }
      if(((intersection1[0]).charCodeAt() > 47 && (intersection1[0]).charCodeAt() < 58) && ((intersection1[1]).charCodeAt() < 47 || (intersection1[1]).charCodeAt() > 58)){
        intersection1 = "0" + intersection1;
      }
      var keyOption1 = intersection1 + "," + intersection2;
      var keyOption2 = intersection2 + "," + intersection1;
      var cnn;

      if(intersectionsObject[keyOption1]){
        cnn = intersectionsObject[keyOption1];
      } else if(intersectionsObject[keyOption2]){
        cnn = intersectionsObject[keyOption2];
      }
      var graphNode = cnnObject[cnn];
      console.log(keyOption1, " kopt1", keyOption2, " kopt2", cnn, " cnn", graphNode, " graphNode");
    }


    var crimeType = crimeIncident[9];
    console.log(incidentAddress, "address", " INTERSECTION1", intersection2, " INTERSECTION2");
  }
  }



console.log(crimeData.data[0][16])
crimeParser(crimeData);


// "01ST ST,STEVENSON ST"
