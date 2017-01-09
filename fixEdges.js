var cnnObjectWithCrime = require("./json/cnnObjectWithCrime.json");
var fs = require("fs");

fixEdges(cnnObjectWithCrime);
writeToCnnObjectWithCrimeAndCorrectEdges(cnnObjectWithCrime);



function fixEdges(cnnObj){
	for(var node in cnnObj){
		var curNode = cnnObj[node];
		var curCnn = curNode["cnn"];
		var children = curNode["streetEdges"];

		for(var i = 0; i < children.length; i++){
			var child = children[i];
			var edgeComplimentCnn;
			var edgeNode;
			var curCnnExists;
			//cnn: '23813000'
			// { first: '23811000',
	    //     second: '23813000',
	    //     weight: 8,
	    //     crimeType: [Object] }
			if(child.first === curCnn){
				edgeComplimentCnn = child.second;
				edgeNode = cnnObjectWithCrime[edgeComplimentCnn];
				curCnnExists = cnnSearchNode(edgeNode, curCnn);
				if(!curCnnExists){
					edgeNode["streetEdges"].push(child);
				}
			} else {
					edgeComplimentCnn = child.first;
					edgeNode = cnnObjectWithCrime[edgeComplimentCnn];
					curCnnExists = cnnSearchNode(edgeNode, curCnn);
					if(!curCnnExists){
						edgeNode["streetEdges"].push(child);
					}
				}
		}

	}
}

function storeCnnObjectWithCrime(json){
    var str = JSON.stringify(json);
    // console.log(str, ' this is the json str')
    fs.writeFile("./json/cnnObjectWithCrime.json", str, function(err) {
    if(err) {
        return console.log(err);
    }
        console.log("The file was saved!");
    });
}

function cnnSearchNode (edgeNode, curCnn){
	var children = edgeNode["streetEdges"];
	var curCnnExists = false;
	for(var i = 0; i < children.length; i++){
		var child = children[i];
		if(child["first"] === curCnn){
			curCnnExists = true;
			return curCnnExists;
		} else if(child["second"] === curCnn){
			curCnnExists = true;
			return curCnnExists;
			}
	}
	return curCnnExists;
}

function writeToCnnObjectWithCrimeAndCorrectEdges(cnnObject){
	var str = JSON.stringify(cnnObject);
	// console.log(str, ' this is the json str')
	fs.writeFile("./json/cnnObjectWithCrimeAndCorrectEdges.json", str, function(err) {
	if(err) {
			return console.log(err);
	}
			console.log("The file was saved!");
	});
}




// { intersection1: [ 'BRANNAN ST', 'RITCH ST' ],
//   intersection2: [ 'RITCH ST', 'BRANNAN ST' ],
//   cnn: '23813000',
//   streetEdges:
//    [ { first: '23811000',
//        second: '23813000',
//        weight: 8,
//        crimeType: [Object] },
//      { first: '23813000',
//        second: '23812000',
//        weight: 8,
//        crimeType: [Object] } ] }
//
// { intersection1: [ '03RD ST', 'BRANNAN ST' ],
//   intersection2: [ 'BRANNAN ST', '03RD ST' ],
//   cnn: '23811000',
//   streetEdges:
//    [ { first: '23814000',
//        second: '23811000',
//        weight: 50,
//        crimeType: [Object] },
//      { first: '23811000',
//        second: '23813000',
//        weight: 50,
//        crimeType: [Object] } ] }
// > x[23812000]
//
// { intersection1: [ 'RITCH ST', 'TOWNSEND ST' ],
//   intersection2: [ 'TOWNSEND ST', 'RITCH ST' ],
//   cnn: '23812000',
//   streetEdges:
//    [ { first: '23807000',
//        second: '23812000',
//        weight: 4,
//        crimeType: [Object] },
//      { first: '23812000',
//        second: '23810000',
//        weight: 4,
//        crimeType: [Object] },
//      { first: '23813000',
//        second: '23812000',
//        weight: 4,
//        crimeType: [Object] } ] }
