FROM node:20-alpine

ENV NODE_ENV production
ENV NEXT_PUBLIC_CLIENT_ID hgar

WORKDIR /usr/src/app

COPY .npmrc /root/
COPY . ./

RUN yarn install
RUN yarn run build

EXPOSE 3000
CMD [ "yarn", "start" ]

