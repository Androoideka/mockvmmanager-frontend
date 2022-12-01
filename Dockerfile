ARG APP_NAME=vm-manager

FROM androoideka/alpine-angular:latest AS builder
COPY . /repo
RUN (cd /repo && ng build --prod) && mv "/repo/dist/${APP_NAME}" /build