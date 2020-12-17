
build:
	docker-compose \
		-f docker-compose.storage.yml \
		-f docker-compose.api.yml build --pull

create-net:
	docker network create default_network || true

initdb: 
	docker volume create --name=mongodb

init: create-net build initdb

dev:
	docker-compose \
		-f docker-compose.storage.yml \
		-f docker-compose.api.yml \
		up 

full: init dev