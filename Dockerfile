FROM node:16.15.0-alpine as Deps

WORKDIR /app

# copy in the files used for dependencies
COPY ./package.json ./yarn.lock .yarnrc.yml ./
COPY .yarn .yarn

# install all the dependencies
RUN yarn install --frozen-lockfile

FROM node:16.15.0-alpine as Builder

WORKDIR /app

COPY --from=Deps /app .
COPY ./tsconfig.json ./tsconfig.build.json ./
COPY src/ src/

# build the app
RUN yarn build

FROM node:16.15.0-alpine as Runner

WORKDIR /app

# copy in all the files needed to run
COPY /app/package.json ./package.json
# COPY /app/.env .env
COPY --from=Deps /app/node_modules/ node_modules/
COPY --from=Builder /app/dist/ dist/

# expose ports the service / app listens on
EXPOSE 4000
ENV NODE_ENV=production

CMD ["yarn", "start"]