FROM node:12 as build
# assert that a compatible yarn version is installed or fail
RUN case `yarn --version` in 1.22*) true;; *) false;; esac
COPY package.json yarn.lock /tmp/platform-app/
WORKDIR /tmp/platform-app/
RUN yarn
COPY . /tmp/platform-app/
ARG REACT_APP_REVISION=""
RUN : "${REACT_APP_REVISION:?Missing --build-arg REACT_APP_REVISION=\$(git rev-parse --short HEAD)}"
RUN yarn build
FROM node:12
RUN npm install -g serve
COPY --from=build /tmp/platform-app/build/ /var/www/platform-app/
WORKDIR /var/www/platform-app/
EXPOSE 80
CMD ["serve", "--no-clipboard", "--single", "-l", "tcp://0.0.0.0:80"]
