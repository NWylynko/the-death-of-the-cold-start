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

FROM node:16.15.0-alpine as Prod-Deps

WORKDIR /app

COPY --from=Builder /app .

# this removes all the dev dependencies, only keeping the ones needed at run time
RUN yarn workspaces focus --production

FROM node:16.15.0-alpine as Runner

WORKDIR /app

# copy in all the files needed to run
COPY --from=Prod-Deps /app/package.json ./package.json
# COPY --from=Prod-Deps /app/.env .env
COPY --from=Prod-Deps /app/node_modules/ node_modules/
COPY --from=Prod-Deps /app/dist/ dist/

# expose ports the service / app listens on
# EXPOSE 4000
ENV NODE_ENV=production

CMD ["yarn", "start"]