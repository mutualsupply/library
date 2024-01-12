FROM node:alpine as development
WORKDIR /usr/src/app
RUN npm install -g pnpm
RUN apk add --no-cache openssh-client
RUN apk add --no-cache git

COPY . .

# SSH known hosts for committing to github
ADD known_hosts /root/.ssh/known_hosts
ADD known_hosts ~/.ssh/known_hosts

RUN git config --global user.name "Mutual Supply"
RUN git config --global user.email "computer@mutual.supply"

RUN pnpm install
RUN pnpx prisma generate

FROM development as production
COPY --from=development /usr/src/app /usr/src/app
RUN pnpm build
CMD ["pnpm", "start:prod"]
