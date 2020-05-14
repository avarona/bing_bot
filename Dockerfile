FROM avarona/browser-test
WORKDIR /usr/src/app
COPY . .
RUN yarn install
