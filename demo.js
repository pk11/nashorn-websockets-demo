var createWebServer = Packages.org.webbitserver.WebServers.createWebServer;
var Thread = java.lang.Thread;
var StaticFileHandler = Packages.org.webbitserver.handler.StaticFileHandler;
var HttpHandler = Packages.org.webbitserver.HttpHandler;
var BaseWebSocketHandler = Java.extend(Packages.org.webbitserver.BaseWebSocketHandler);
var Map = java.util.HashMap;

var websocket = new BaseWebSocketHandler() {

	connectionCount: 1,
	//note: Webbit is single-threaded
	connections: new Map(),

	onOpen: function (connection) {
		connection.send("Number of active connections: " + this.connectionCount );
		this.connectionCount++;
		this.connections.put(connection.hashCode(), connection);
	},

	onClose: function (connection) {
		this.connectionCount--;
		this.connections.remove(connection.hashCode());
	},

	onMessage: function (connection, message) {
		print("message arrived: "+message);
		var conns = Java.from(this.connections.values());
		for (var i = 0; i < conns.length; i++) {
			conns[i].send(message.toUpperCase());
		}
	}
};


var helloworld = new HttpHandler {
	handleHttpRequest: function (request, response, control) {
		//note: Webbit is single-threaded
		//this essentially means execute this block of code on nextTick 
		control.execute(function () {
	            response.content("Hello World").end();
		});
	}
};

var webServer = 
					createWebServer(9000).
					add("/websockets", websocket).
					add("/hello", helloworld).
					add(new StaticFileHandler("./public"));

webServer.start();

print("Server running at " + webServer.getUri());

Thread.currentThread().join();
