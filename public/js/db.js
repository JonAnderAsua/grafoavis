import * as d3 from "https://cdn.skypack.dev/d3-sparql";

export {getType,getLabel,getComment,getGuztia}

var uri = "http://jonander:7200/repositories/LaDonacion"

function getType(uriObjektua){ //Elementu baten typea atera
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

function getLabel(uriObjektua){ //Elementu baten labela atera
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

function getComment(uriObjektua){ //Elementu baten commenta atera
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

function getGuztia(){ //Aurreko metodoetan atera ez diren tripleak atera
	var eskaera = `
	PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
	PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
	select distinct ?s ?p ?o where { 
	    ?s ?p ?o .
	    FILTER(?p  NOT IN (<http://www.w3.org/1999/02/22-rdf-syntax-ns#type>, 
	    <http://www.w3.org/2000/01/rdf-schema#subPropertyOf>,
	    <http://www.w3.org/2000/01/rdf-schema#subClassOf>,
	    <http://www.w3.org/2000/01/rdf-schema#label>,
	    <http://www.w3.org/2000/01/rdf-schema#comment>,
	    <http://proton.semanticweb.org/protonsys#transitiveOver>,
	    <http://www.w3.org/2000/01/rdf-schema#domain>,
	    <http://www.w3.org/2000/01/rdf-schema#range>,
	    <http://www.w3.org/2002/07/owl#inverseOf>))
	}`

	return d3.sparql(uri,eskaera).then((data) => {
		return data;
	})
}


