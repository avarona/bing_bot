# !/bin/sh

# Remove docker images & containers
docker container kill $(docker ps -q) || true && docker rm -flv bing_bot_container || true;
docker system prune -af --volumes;
