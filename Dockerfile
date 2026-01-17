FROM bellsoft/liberica-openjre-alpine:21
COPY *.jar app.jar

# NOTE:
# Application JAR file should be built with "-Pvaadin.productionMode=true".
# See more information about deployment in Jmix docs.

ENTRYPOINT ["java", "-jar", "/app.jar"]
