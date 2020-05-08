FROM alpine:3.10
WORKDIR /usr/src/app

COPY . .

# Use node version 10.19.0, yarn version 1.22.4
RUN apk add  --no-cache --repository http://dl-cdn.alpinelinux.org/alpine/v3.10/main/ nodejs=10.19.0-r0
RUN apk add  --no-cache --repository http://dl-cdn.alpinelinux.org/alpine/v3.10/community/ yarn=1.16.0-r0

# Install dependencies
RUN apk upgrade
RUN apk --update add \
  nodejs \
  yarn \
  wget \
  vim \
  git \
  dpkg=1.19.7-r0 \
  firefox-esr=60.9.0-r0

# Prereqs for geckodriver
RUN wget -q -O /etc/apk/keys/sgerrand.rsa.pub https://alpine-pkgs.sgerrand.com/sgerrand.rsa.pub
RUN wget https://github.com/sgerrand/alpine-pkg-glibc/releases/download/2.30-r0/glibc-2.30-r0.apk
RUN wget https://github.com/sgerrand/alpine-pkg-glibc/releases/download/2.30-r0/glibc-bin-2.30-r0.apk
RUN apk add glibc-2.30-r0.apk glibc-bin-2.30-r0.apk
RUN rm -rf glibc-2.30-r0.apk glibc-bin-2.30-r0.apk

# Install geckodriver
RUN wget https://github.com/mozilla/geckodriver/releases/download/v0.26.0/geckodriver-v0.26.0-linux64.tar.gz
RUN tar -zxf geckodriver-v0.26.0-linux64.tar.gz -C /usr/bin
RUN rm -rf geckodriver-v0.26.0-linux64.tar.gz

RUN yarn install
