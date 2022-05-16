import * as d3 from "https://cdn.skypack.dev/d3-sparql";

//Metodoak exportatzeko
export {getType,getLabel,getComment,getGuztia,getImage}

//Zein URIren kontra egingo diren eskaerak adierazi
var uri = "http://jonander:7200/repositories/LaDonacion"

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
						<https://schema.org/mentions>,
						<https://schema.org/author>,
						<https://schema.org/worksFor>,
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

function getImage(izena){
	var wikidataUri = 'https://query.wikidata.org/bigdata/namespace/wdq/sparql'

	var wikidataEskaera = `
	SELECT ?person
	WHERE
	{
		?person rdfs:label "`+izena+`"@es .
	}

	`

	return d3.sparql(wikidataUri,wikidataEskaera).then((data) => {
		var keyZero = Object.keys(data[0])[0];
		var uriObjektua = data[0][keyZero]

		var irudiEskaera = `
		SELECT ?pic
			WHERE
			{
			<`+uriObjektua+`> wdt:P18 ?pic
			}
		`

		//https://www.wikidata.org/wiki/Wikidata:SPARQL_query_service/queries/examples

		return d3.sparql(wikidataUri,irudiEskaera).then((data) => {
			var irudiUri = data[0]['pic'];
			console.log(irudiUri);
			return irudiUri;
		})
	})
}


