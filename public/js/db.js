import * as d3 from "https://cdn.skypack.dev/d3-sparql";

export {getType,getLabel,getComment,getGuztia}

var uri = "http://jonander:7200/repositories/LaDonacion"


function getType(uriObjektua){
	var eskaeraType = `
	PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
	SELECT ?type
	WHERE{
		<`+uriObjektua+`> rdf:type ?type .
	}`

	return d3.sparql(uri, eskaeraType).then((data) => {
		if(data.length > 0){
			return data[0]['type'];
		  		}
		else{
		  	return "Ez dauka typeik";
		}
	});

}

function getLabel(uriObjektua){
	var eskaeraType = `
		PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
		SELECT ?label
		WHERE{
		  	<`+uriObjektua+`> rdfs:label ?label .
		}`

	return d3.sparql(uri, eskaeraType).then((data) => {
		if(data.length > 0){
			return data[0]['label'];
		}
		else{
		  	return "Ez dauka labelik";
		}
	});
}

function getComment(uriObjektua){
	var eskaeraType = `
		PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
		SELECT ?comment
		WHERE{
		  	<`+uriObjektua+`> rdfs:comment ?comment .
		}`

	return d3.sparql(uri, eskaeraType).then((data) => {
		if(data.length > 0){
			return data[0]['comment'];
		}
		else{
		  	return "Ez dauka komentariorik";
		}
	});
}

function getGuztia(){
	var eskaera = `
	PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
	PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
	select ?s ?p ?o 
	where { 
		?s ?p ?o .
    	FILTER(?p != rdf:type || ?p != rdfs:comment || ?p != rdfs:label)
	}`

	return d3.sparql(uri,eskaera).then((data) => {
		return data;
	})
}


