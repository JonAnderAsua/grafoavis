export default function Edge(idSubj, idObj, erlazioa){
	this.idSubj = idSubj //Subjektuaren id-a
    this.idObj = idObj //Objektuaren id-a
    this.erlazioa = erlazioa //Bi nodoen arteko erlazioa
}

Edge.prototype = new Edge();
Edge.prototype.constructor = Edge;