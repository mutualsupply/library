set -eu

docker buildx build --platform linux/amd64 -t mutual-supply .
docker tag mutual-supply registry.heroku.com/mutual-supply/web
docker push registry.heroku.com/mutual-supply/web
heroku container:release web -a mutual-supply
