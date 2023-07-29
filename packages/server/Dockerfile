FROM node:alpine as development
WORKDIR /usr/src/app
RUN npm install -g pnpm
RUN apk add --no-cache openssh-client
RUN apk add --no-cache git

RUN mkdir ~/.ssh
COPY id_ed25519 ~/.ssh/id_ed25519
COPY id_ed25519.pub ~/.ssh/id_ed25519.pub
# RUN chmod 400 ~/.ssh/id_ed25519
# RUN chmod 400 ~/.ssh/id_ed25519.pub
COPY . .

RUN ssh-keyscan github.com >>~/.ssh/known_hosts

RUN git config --global user.name "Mutual Supply"
RUN git config --global user.email "gainormather@gmail.com"

RUN pnpm install

FROM development as production
COPY --from=development /usr/src/app /usr/src/app
RUN pnpm build
CMD ["node", "dist/index.js"]
