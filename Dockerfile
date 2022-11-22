#!/bin/sh
FROM alpine:3.17

RUN apk add nodejs npm bash nano

WORKDIR /home/RUN

COPY . .

RUN npm i

CMD ["/bin/sh", "-c", "node", "app.js"]