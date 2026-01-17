# ---------- BUILD STAGE ----------
FROM registry.access.redhat.com/ubi9/openjdk-21 AS builder

WORKDIR /app

# copy gradle wrapper & config trước (cache dependency)
COPY gradlew .
COPY gradle gradle
COPY build.gradle settings.gradle ./

RUN chmod +x gradlew
RUN ./gradlew dependencies --no-daemon || true

# copy toàn bộ source
COPY . .

# build Jmix + Vaadin production
RUN ./gradlew -Pvaadin.productionMode=true bootJar -x test --no-daemon


# ---------- RUNTIME STAGE ----------
FROM registry.access.redhat.com/ubi9/openjdk-21-runtime

WORKDIR /deployments

COPY --from=builder /app/build/libs/*.jar app.jar

EXPOSE 8080

ENTRYPOINT ["java","-jar","app.jar"]
