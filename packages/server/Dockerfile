FROM node:alpine as development
WORKDIR /usr/src/app
RUN npm install -g pnpm

RUN apk add --no-cache openssh-client
RUN apk add --no-cache git
RUN git conifg user.name "mutualsupply"
RUN git config user.email "case-studies@mutualsupply.com"

COPY package*.json ./
COPY . .

RUN pnpm install

FROM base as production
ENV NODE_ENV=production
RUN pnpm i
RUN pnpm build
CMD ["pnpm start"]
