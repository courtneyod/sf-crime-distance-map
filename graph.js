"use strict"

var hashTable = require("./hash_table.js");
var intersectionsObject = {};


function GraphEdge(first, second, weight) {
  this.first = first;
  this.second = second;
  this.weight = weight;
}

function GraphNode(intersection1, intersection2, cnn, latLng, streetEdges) {
  this.intersection1 = intersection1;
  this.intersection2 = intersection2;
  this.cnn = cnn;
  this.latLng = latLng
  this.streetEdges = streetEdges || [];
}

//This represents an undirected Graph
function Graph() {

  this.nodes = [];
  this.edges = [];

  // Helper function to find a node in nodes
  this.findNode = function (value) {
    if(intersectionsObject[value]){
      return intersectionsObject[value];
    } else {
      return;
    }
  };

  // Add a node to the list of nodes
  this.addNode = function(intersection1, intersection2, cnn, latLng) {
    if (this.findNode(cnn)) {
      return;
    }

    var newNode = new GraphNode(intersection1, intersection2, cnn, latLng);
    intersectionsObject[cnn] = newNode;
    this.nodes.push(newNode);
    console.log("THIS IS LATLNG " + latLng)
    console.log(newNode.latLng);
    }

  // Add an edge between 2 nodes and give it a weight
  this.addEdge = function(source, destination, weight = 1) {
    let first = this.findNode(source);
    let second = this.findNode(destination);
    if (first == null || second == null) {
      return;
    }
    var newEdge = new GraphEdge(first, second, weight)
    this.edges.push(newEdge);
    first.streetEdges.push(newEdge);
    second.streetEdges.push(newEdge);
  };

  // Get the size of the graph by returning how many nodes are in the graph
  this.size = function() {
    var length = this.nodes.length;
    return length;
  };

  // Find the total number of edges in the graph
  this.numEdges = function() {
    var num = this.edges.length;
    return num;
  };

  // Find the total weight of the graph by adding up the weights of each edge
  this.weight = function() {
    var weight = 0;
    for (var i = 0; i < this.edges.length; i++) {
      // console.log(typeof this.edges[i].weight)
      weight += this.edges[i].weight;
    }
    return weight;
  };

  // Find all node values a node is connected to.
  // Return all node values at the other side of an edge of the target node
  // Remember that edges are not directional: A -> B also implies B -> A
  this.findNeighbors = function(value) {
    var neighbors = [];
    for (var i = 0; i < this.edges.length; i++) {
      // console.log(this.edges[i].first)
      if(this.edges[i].first.value === value){
        neighbors.push(this.edges[i]);
      }
      if(this.edges[i].second.value === value){
        neighbors.push(this.edges[i]);
      }
    }
    return neighbors;
  }

  this.findPath = function(start, finish) {
    var frontier = new PriortyQueue();
    var visited = new Set();

    let queueObj = {
    node: start,
    cost: 0,
    path: []
  };
    frontier.push(queueObj)

    while(frontier.length > 0){
        var curr_node = frontier.shift();
        var curr_path = curr_node.path;
        var curr_cost = curr_node.cost;
        var neigh = this.findNeighbors(curr_node.node);
        if(curr_node.node === finish){
            return curr_path;
        }

        if(visited.has(curr_node.node)){
            continue;
        }

        for (var i = 0; i < neigh.length; i++) {
            var new_node;
            if(neigh[i].first.value !== curr_node){
                new_node = neigh[i].first.value
            } else {
                new_node = neigh[i].second.value
            }
            var new_path = curr_path.slice();
            new_path.push(neigh[i]);
            var new_cost = neigh[i].weight;
            var total_cost = new_cost + curr_cost;
            frontier.push({'node': new_node, 'path': new_path, 'cost': total_cost})
            visited.add(curr_node)
        }
    }
    return 10

  }

  // Return a list of any nodes that are orphans.
  // An orphan is any node with no edges.
  this.findOrphans = function() {
      //console.log(this.nodes[1])
    var currList = [];
    for (var i = 0; i < this.nodes.length; i++) {
        currList.push(this.nodes[i])
        //console.log(nodes)
    }
    var arr = []
    console.log(currList)
    for (var j = 0; j < currList.length; j++) {
        var curr = currList[j].value
        console.log(typeof curr, 'curr')
        for (var k = 0; k < this.edges.length; k++) {
            console.log(typeof this.edges[k].first.value, 'edges value')
            if(curr !== this.edges[k].first.value && curr !== this.edges[k].second.value)
            arr.push(curr)
        }
    }
    return arr;
  }

  this.print = function() {
    for (let i = 0; i < this.edges.length; i++) {
      let edge = this.edges[i];
      //console.log(edge.first.value, '->', edge.second.value, edge.weight, 'mi');
    }
  }

  this.pathWeight = function(path) {
    let sum = 0;
    for (let i = 0; i < path.length; i++) {
      sum += path[i].weight;
    }
    return sum;
  }
 }


module.exports = Graph;
