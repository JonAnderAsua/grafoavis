export default function Node(uri,type,label,comment,id){
	this.uri = uri;


	this.type = type;
	this.label = label;
	this.comment = comment;
	this.id = id;
}

Node.prototype = new Node();
Node.prototype.constructor = Node;