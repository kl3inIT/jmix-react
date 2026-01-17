# ---------- BUILD STAGE ----------
FROM registry.access.redhat.com/ubi9/openjdk-21 AS builder

WORKDIR /app

ENV GRADLE_USER_HOME=/tmp/gradle

# copy gradle wrapper & config trước để cache deps
COPY gradlew .
COPY gradle gradle
COPY build.gradle settings.gradle ./

# KHÔNG chmod – OpenShift không cho
RUN sh gradlew dependencies --no-daemon || true

# copy source
COPY . .

# build Jmix (Vaadin production)
RUN sh gradlew -Pvaadin.productionMode=true bootJar -x test --no-daemon


# ---------- RUNTIME STAGE ----------
FROM registry.access.redhat.com/ubi9/openjdk-21-runtime

WORKDIR /deployments

COPY --from=builder /app/build/libs/*.jar app.jar

EXPOSE 8080

ENTRYPOINT ["java","-jar","app.jar"]
