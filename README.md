# tl;dr

This demo app demonstrates how to create a simple non-blocking WebSocket and HTTP server using Nashorn Java scripting (hello end-to-end Javascript apps on the JVM!)


# prerequisites:

* [install java 8](http://jdk8.java.net/download.html)  
* maven
* make

# setup:

`make update`

`make run`

then visit:

`http://localhost:9000/index.html`

and

`http://localhost:9000/hello`

# repl:

`make console`

# development environment:

Combining all this with [fswatch] (https://github.com/alandipert/fswatch), one could get a pretty decent development environment for building server side JavaScript services on the JVM.


