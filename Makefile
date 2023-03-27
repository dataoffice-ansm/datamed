SHELL := /bin/bash
DOCKER := $(shell type -p docker)
DC := $(shell type -p docker-compose)
TAG := latest
APP_NAME := datamed
PROJECT_NAME := datamed
ORG := dataoffice-ansm
REG := ghcr.io

.PHONY: up down

up:
	${DC} -f docker-compose-prod.yml up -d --remove-orphans

down:
	${DC} -f docker-compose-prod.yml down

pull:
	docker pull ${REG}/${ORG}/${APP_NAME}:${TAG}

clean:
	docker container prune -f && docker image prune -f && echo Container updated successfully.