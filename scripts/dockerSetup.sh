# !/bin/sh

# Build image
docker build -t bing_bot_image .;

# Run container from image
docker container run -d -t --name bing_bot_container bing_bot_image;
