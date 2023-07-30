FROM node:alpine as development
WORKDIR /usr/src/app
RUN npm install -g pnpm
RUN apk add --no-cache openssh-client
RUN apk add --no-cache git

COPY . .

ADD id_ed25519 /root/.ssh/id_ed25519
ADD id_ed25519.pub /root/.ssh/id_ed25519.pub
RUN chmod 400 /root/.ssh/id_ed25519
RUN chmod 400 /root/.ssh/id_ed25519.pub

ADD known_hosts /root/.ssh/known_hosts
ADD known_hosts ~/.ssh/known_hosts

RUN chmod 400 ~/.ssh/id_ed25519
RUN chmod 400 ~/.ssh/id_ed25519.pub

RUN git config --global user.name "Mutual Supply"
RUN git config --global user.email "gainormather@gmail.com"

RUN pnpm install

# # https://stackoverflow.com/questions/46652928/shell-into-a-docker-container-running-on-a-heroku-dyno-how
# RUN rm /bin/sh && ln -s /bin/bash /bin/sh

FROM development as production
COPY --from=development /usr/src/app /usr/src/app
RUN pnpm build
CMD ["node", "dist/index.js"]
