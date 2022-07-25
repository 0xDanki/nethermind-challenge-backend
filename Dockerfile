FROM node:16-alpine AS base

WORKDIR /app
COPY [ "package*.json", "tsconfig.build.json", "tsconfig.json", ".eslintrc.js", ".prettierrc", "yarn.lock" , "./" ]

FROM base AS dev
ENV NODE_ENV=dev
RUN yarn install --frozen-lockfile
COPY . .
EXPOSE 3001
CMD [ "yarn", "start:dev" ]

FROM base AS prod

ENV NODE_ENV=production
RUN yarn install --frozen-lockfile --production
COPY . .
RUN yarn global add @nestjs/cli
RUN yarn build
CMD [ "yarn", "start:prod" ]