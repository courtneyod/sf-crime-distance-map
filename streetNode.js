var streetNode = require("./json/streetDataSource.json");
var fs = require("fs");
var graph = require("./graph.js");
var streetData = streetNode.data;


// const __apiKey__ = AIzaSyC9FPqo6Pdx4VjALRx5oeEDhfQvb-fkDjE
var request = require('request');

function createStreetNode(data) {
  console.log(new Date(), "this is the start.")
  var streetGraph = new graph();

  for(var i = 0; i < data.length; i++){
    var cnn;
    var intersection1 = [];
    var intersection2 = [];

    if(!(data[i][21]) && !(data[i][22])){
      cnn = data[i][8];
      intersection1.push(data[i][9]);
      intersection1.push(data[i][10]);
      intersection2.push(data[i][10]);
      intersection2.push(data[i][9]);
      streetGraph.addNode(intersection1, intersection2, cnn);
    }

    if(data[i][21] && data[i][22]){
      streetGraph.addEdge(data[i][21], data[i][22]);
    }
  }
  console.log(new Date(), "this is the end.");
  return streetGraph;
}


var streetGraph = createStreetNode(streetData);

// createStreetEdges(streetData);

//grab the instersection object and store in a variable
var cnnGraph = streetGraph.getCnnObject();
var intersectionsGraph = streetGraph.getIntersectionsObject();
// console.log(cnnGraph, ' this is the json graph')

// write to the json file and add the instersection object
storeCnnObject(cnnGraph);
storeIntersectionObject(intersectionsGraph);

function storeCnnObject(json){
    var str = JSON.stringify(json);
    // console.log(str, ' this is the json str')
    fs.writeFile("./json/cnnObject.json", str, function(err) {
    if(err) {
        return console.log(err);
    }
        console.log("The file was saved!");
    });
}

function storeIntersectionObject(json){
    var str = JSON.stringify(json);

    fs.writeFile("./json/intersectionsObject.json", str, function(err){
      if(err) {
        return console.log(err);
      }
      console.log("The file was saved!");
    });
}


// function createStreetEdges(data){
//   for(var i = 0; i < data.length; i++){
//
//   }
// }

module.exports = streetGraph;

// function convertIntersectionLatLng(firstStreet, secondStreet){
//   if(secondStreet.indexOf("\\") !== -1){
//     var slashIdx = secondStreet.indexOf(" \\");
//     secondStreet = secondStreet.substring(0, slashIdx);
//   }
//   if(firstStreet.indexOf(" ") !== -1){
//     firstStreet = firstStreet.split(' ').join('+');
//   }
//   if(secondStreet.indexOf(" ") !== -1){
//     secondStreet = secondStreet.split(' ').join('+');
//   }
//   // console.log("IDX " + slashIdx)
//   // console.log("2nd " + secondStreet)
//   let p = new Promise(function(resolve, reject){
//     request("https://maps.googleapis.com/maps/api/geocode/json?address=" + firstStreet + "+and+" + secondStreet + ",+San+Francisco,+CA" + "&key=AIzaSyC9FPqo6Pdx4VjALRx5oeEDhfQvb-fkDjE", function (error, response, body) {
//       if (!error && response.statusCode == 200) {
//         var parsed = JSON.parse(body);
//         resolve(parsed["results"][0]["geometry"]["location"]);
//       } else {
//         reject(err)
//       }
//     });
//   });
//   return p;
// }



// var latLng;
// convertIntersectionLatLng(data[i][9], data[i][10])
//   .then(function(response){
//     latLng = response
//     streetGraph.addNode(intersection1, intersection2, cnn, latLng);
//   })
//   .catch(function(err){
//     console.log(err)
//   })

// console.log(test);
