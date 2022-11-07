import * as d3 from "https://cdn.skypack.dev/d3-sparql";

//Metodoak exportatzeko
export {getType,getLabel,getComment,getGuztia,getUriFromLabel,getRelations,eskaeraEgin}

var uri = 'http://localhost:7200/repositories/ustelkeria' //Aldatu behar da

function getType(uriObjektua){ //Elementu baten typea atera

	//Eskaeraren adierazpena
	var eskaeraType = `
	PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
	SELECT ?type
	WHERE{
		<`+uriObjektua+`> rdf:type ?type .
	}`

	//Eskaeraren exekuzioa eta haren promesaren kudeaketa
	return d3.sparql(uri, eskaeraType).then((data) => {
		if(data.length > 0){
			return data[0]['type'];
		  		}
		else{
		  	return "Ez dauka typeik";
		}
	});

}

function eskaeraEgin(eskaeraOrokorra){
	return d3.sparql(uri,eskaeraOrokorra).then((data) => {
		return data;
	})
}

function getLabel(uriObjektua){ //Elementu baten labela atera

	//Eskaeraren adierazpena
	var eskaeraType = `
		PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
		SELECT ?label
		WHERE{
		  	<`+uriObjektua+`> rdfs:label ?label .
		}`

	//Eskaeraren exekuzioa eta haren promesaren kudeaketa
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

	//Eskaeraren adierazpena
	var eskaeraType = `
		PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
		SELECT ?comment
		WHERE{
		  	<`+uriObjektua+`> rdfs:comment ?comment .
		}`

	//Eskaeraren exekuzioa eta haren promesaren kudeaketa
	return d3.sparql(uri, eskaeraType).then((data) => {
		if(data.length > 0){
			return data[0]['comment'];
		}
		else{
		  	return "Ez dauka komentariorik";
		}
	});
}

function getUriFromLabel(label){
	var eskaera = `
		PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
		SELECT ?s WHERE {
			?s rdfs:label ?o .FILTER regex(str(?o), "` + label +`").
		}
	`

	return d3.sparql(uri,eskaera).then((data) => {
		return data
	})
}

function getRelations(uriObj){
	var eskaera = `
	PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
	PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
	select distinct ?s ?p ?o where { 
		?s ?p ?o .
		FILTER(?s = <`+uriObj+`> || ?o = <`+uriObj+`>)
		FILTER(?p  IN (<https://schema.org/parent>,
					<https://schema.org/owns>,
					<https://schema.org/spouse>,
					<https://schema.org/knows>,
					<https://schema.org/author>,
					<https://schema.org/worksFor>,
					<https://schema.org/participant>,
					<http://ehu.eus/transparentrelations#pays>,
					<http://ehu.eus/transparentrelations#registered_in>,
					<http://ehu.eus/transparentrelations#beneficiary_of>,
					<http://ehu.eus/transparentrelations#represents>,
					<http://ehu.eus/transparentrelations#controls>,
					<http://ehu.eus/transparentrelations#manages>,
					<http://ehu.eus/transparentrelations#has_bank_account_in>,
					<http://ehu.eus/transparentrelations#happens_in>,
					<http://ehu.eus/transparentrelations#sibling>,
					<http://ehu.eus/transparentrelations#related_to>))
	}
	`

	console.log(eskaera)
	return d3.sparql(uri,eskaera).then((data) => {
		console.log(data)
		return data
	})
}

function getGuztia(){ //Aurreko metodoetan atera ez diren tripleak atera

	//Eskaeraren adierazpena
	var eskaera = `
		PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
		PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
		select distinct ?s ?p ?o where { 
			?s ?p ?o .
			FILTER(?p  IN (<https://schema.org/parent>,
						<https://schema.org/owns>,
						<https://schema.org/spouse>,
						<https://schema.org/knows>,
						<https://schema.org/author>,
						<https://schema.org/worksFor>,
						<https://schema.org/participant>,
						<http://ehu.eus/transparentrelations#pays>,
						<http://ehu.eus/transparentrelations#registered_in>,
						<http://ehu.eus/transparentrelations#beneficiary_of>,
						<http://ehu.eus/transparentrelations#represents>,
						<http://ehu.eus/transparentrelations#controls>,
						<http://ehu.eus/transparentrelations#manages>,
						<http://ehu.eus/transparentrelations#has_bank_account_in>,
						<http://ehu.eus/transparentrelations#happens_in>,
						<http://ehu.eus/transparentrelations#sibling>,
						<http://ehu.eus/transparentrelations#related_to>))
		}
	`
	//<https://schema.org/participant>,

	//Eskaeraren exekuzioa eta haren promesaren kudeaketa
	return d3.sparql(uri,eskaera).then((data) => {
		return data;
	})
}



