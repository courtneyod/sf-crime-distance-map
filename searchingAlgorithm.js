var cnnObjectWithCrime = require("./json/cnnObjectWithCrime.json");
var graph = require("./graph.js");
var intersectionsObject = require("./json/intersectionsObject.json");
var PriorityQueue = require("./priorityQueue.js");

function userInput (origin, destination){
	var originCNN = intersectionsObject[origin];
	var destinationCNN = intersectionsObject[destination];
	var originNode = cnnObject[originCNN];
	var destinationNode = cnnObject[destinationCNN];
	dijkstraSearch(originNode, destinationNode)
}


// {"20010000":
// {"intersection1":["JAMESTOWN AVE","GILROY ST"],
// "intersection2":["GILROY ST","JAMESTOWN AVE"],
// "cnn":"20010000",
// "streetEdges":
// [{"first":"20010000",
// "second":"20435000",
// "weight":1,
// "crimeType":{}
// }]}

function dijkstraSearch(sourceNode, destinationNode) {
	var destinationLatLng = convertIntersectionLatLng(destinationNode[intersection1])

  let frontier = new PriorityQueue(); // We're assuming such a class exists.
  let explored = new Set();

  let queueObj = {
    node: sourceNode,
    cost: 0,
    path = []
  };

  frontier.enqueue(queueObj, queueObj.cost);

  // Search until we're out of nodes
  while(frontier.size() > 0) {
    let currentQueueObj = frontier.dequeue();
    let curNode = currentQueueObj.node;
    let curPath = currentQueueObj.path;
    let curCost = currentQueueObj.cost;

    // Found a solution, return the path.
    if(curNode.intersection1 === destinationNode || curNode.intersection2 === destinationNode) {
      return curPath;
    }
    else if(explored.has(curNode)) {
      continue;
    }

    for(let i = 0; i < curNode.streetEdges.length; i++) {
      let newEdgeCnn = curNode.streetEdges[i];
			let newEdgeWeight = curNode.streetEdges[i].weight;
			let newEdge = cnnObjectWithCrime[newEdgeCnn];
      let newPath = curPath.slice();
      newPath.push(curNode);

      let heuristicValue = computeHeuristic(newEdge, destinationLatLng);

      // We use this format so we can track the path
      let newQueueObj = {
        node: newEdge,
        path: newPath,
        cost: newEdgeWeight + curCost; // NOTE: No heuristic here -- thats correct
      }

			******************** FIGURE OUT WEIGHT TOMORROW ********************************

      // We only use the heuristic as the value for the priority queue, not the 'cost'.
      frontier.enqueue(newQueueObj, newQueueObj.cost + heuristic);
    }

    explored.add(curNode);
  }

  // No solution.
  return null;
}

function computeHeuristic(currNode, finalLatLong){
	var currNodeLatLong = convertIntersectionLatLng(currNode[intersection1]);
	var distance = latLngDistance(currNodeLatLong, finalLatLong);
	return distance;
}

function convertIntersectionLatLng(intersectionArray){
	// ["JAMESTOWN AVE","GILROY ST"],
  var firstStreet = intersectionArray[0].split(" ").join("+");
	var secondStreet = intersectionArray[1].split(" ").join("+");

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

function latLngDistance(currNodeLatLong, finalLatLong, unit = "K") {
		lat1 = currNodeLatLong.lat;
		lon1 = currNodeLatLong.lng;
		lat2 = finalLatLong.lat;
		lon2 = finalLatLong.lng;

    var radlat1 = Math.PI * lat1/180
    var radlat2 = Math.PI * lat2/180
    var theta = lon1-lon2
    var radtheta = Math.PI * theta/180
    var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
    dist = Math.acos(dist)
    dist = dist * 180/Math.PI
    dist = dist * 60 * 1.1515
    if (unit=="K") { dist = dist * 1.609344 }
    if (unit=="N") { dist = dist * 0.8684 }
    return dist
}
