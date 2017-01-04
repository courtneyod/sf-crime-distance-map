var streetNode = require("./streetData.json");
var fs = require("fs");
var graph = require("./graph.js");
var hashTable = require("./hash_table.js");
var streetData = streetNode.data;

function createStreetNode(data) {
  var streetGraph = new graph();

  for(var i = 0; i < 100; i++){
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
  }
  return streetGraph
  console.log(streetGraph)
}



var streetNodes = createStreetNode(streetData);
console.log("LENGTH " + streetNodes.nodes.length);

console.log(streetData.length);
console.log(streetData[1511].length);
console.log(typeof streetData[0]);
// var test = JSON.parse(streetData[0]);

// console.log(test);
