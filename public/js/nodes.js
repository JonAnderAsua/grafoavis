export default function Node(uri,type,label,comment,id){
	this.uri = uri; //Nodoaren URI identifikatzailea
	this.type = type; 
	this.label = label; 
	this.comment = comment; 
	this.id = id; //Nodoaren identifikatzaile numerikoa
}

Node.prototype = new Node();
Node.prototype.constructor = Node;