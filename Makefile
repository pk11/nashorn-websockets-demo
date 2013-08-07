PROJECT = "nashorn-demo"
DIST = "dist"
TMP = "/tmp/cp"
MAIN = "demo.js"

all: clean update package  

compile: ; @echo "Compiling ${PROJECT}....."; \
  javac -Xlint:unchecked -d ./target/classes -cp `cat ${TMP}` `find . -name "*.java"`

run: ;  @echo "running main class of ${PROJECT}.....";\
   jjs -scripting ${MAIN} -cp `cat ${TMP}`:./target/classes

test: ; @echo "running test for ${PROJECT}....." \
  mvn test

console: ; @echo "Running REPL ${PROJECT}....."; \
  rlwrap jjs -cp `cat ${TMP}`:./target/classes


package: ; @echo "packaging ${PROJECT}....."; \
  mvn package -Dmainclass=${MAINCLASS} 


update: ; @echo "genering classpath for ${PROJECT} into ${TMP}....."; \
	mvn -q dependency:build-classpath  -Dmdep.outputFile=${TMP} -Dmainclass=${MAINCLASS} -Ddist=${DIST} 

clean: ; @echo "cleaning up ${PROJECT}....." \
	mvn clean;
	rm -rf target;
	rm -rf dist;
	mkdir -p ./target/classes

