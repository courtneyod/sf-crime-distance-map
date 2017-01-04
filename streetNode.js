var streetNode = require("./streetData.json");
var fs = require("fs");
var graph = require("./graph.js");
var hashTable = require("./hash_table.js");
var streetData = streetNode.data;
var streetGraph;
// const __apiKey__ = AIzaSyC9FPqo6Pdx4VjALRx5oeEDhfQvb-fkDjE
var request = require('request');

function createStreetNode(data) {
  streetGraph = new graph();

  for(var i = 0; i < 3; i++){
    var cnn;
    var intersection1 = [];
    var intersection2 = [];
    if(!(data[i][21]) && !(data[i][22])){
      cnn = data[i][8];
      intersection1.push(data[i][9]);
      intersection1.push(data[i][10]);
      intersection2.push(data[i][10]);
      intersection2.push(data[i][9]);
      var latLng;
      convertIntersectionLatLng(data[i][9], data[i][10])
        .then(function(response){
          latLng = response
          streetGraph.addNode(intersection1, intersection2, cnn, latLng);
        })
        .catch(function(err){
          console.log(err)
        })

    }
  }
  return streetGraph;
}


createStreetNode(streetData);
createStreetEdges(streetData);

function createStreetEdges(data){
  for(var i = 0; i < 3; i++){
    if(data[i][21] && data[i][22]){
      streetGraph.addEdge(data[i][21], data[i][22]);
    }
  }
}

function convertIntersectionLatLng(firstStreet, secondStreet){
  if(secondStreet.indexOf("\\") !== -1){
    var slashIdx = secondStreet.indexOf(" \\");
    secondStreet = secondStreet.substring(0, slashIdx);
  }
  if(firstStreet.indexOf(" ") !== -1){
    firstStreet = firstStreet.split(' ').join('+');
  }
  if(secondStreet.indexOf(" ") !== -1){
    secondStreet = secondStreet.split(' ').join('+');
  }
  // console.log("IDX " + slashIdx)
  // console.log("2nd " + secondStreet)
  let p = new Promise(function(resolve, reject){
    request("https://maps.googleapis.com/maps/api/geocode/json?address=" + firstStreet + "+and+" + secondStreet + ",+San+Francisco,+CA" + "&key=AIzaSyC9FPqo6Pdx4VjALRx5oeEDhfQvb-fkDjE", function (error, response, body) {
      if (!error && response.statusCode == 200) {
        var parsed = JSON.parse(body);
        resolve(parsed["results"][0]["geometry"]["location"]);
      } else {
        reject(err)
      }
    });
  });
  return p;
}





//
//
// console.log(streetData.length);
// console.log(streetData[1511].length);
// console.log(typeof streetData[0]);
// // var test = JSON.parse(streetData[0]);

// console.log(test);
