SHELL := /bin/bash
DOCKER := $(shell type -p docker)
DC := $(shell type -p docker-compose)
CURRENT_DIR := $(shell pwd)
DEPLOYMENT_VARS_FILE := deployment.env
TAG := latest
APP_NAME := datamed
PROJECT_NAME := datamed
ORG := dataoffice-ansm
REG := ghcr.io
ARGS = `arg="$(filter-out $@,$(MAKECMDGOALS))" && echo $${arg:-${1}}`

web-up-dev:
	DATA_DIR=${DATA_DIR} ${DC} -f docker-compose-dev.yml up -d web

down-%:
	${DC} -f docker-compose-$*.yml down

up-%:
	DATA_DIR=${DATA_DIR} ${DC} -f docker-compose-$*.yml up -d

pull-all-images: pull-image-web

pull-image-%:
	docker pull ${REG}/${ORG}/${PROJECT_NAME}/${APP_NAME}-$*:${TAG}
	docker tag ${REG}/${ORG}/${PROJECT_NAME}/${APP_NAME}-$*:${TAG} ${APP_NAME}-$*:${TAG}-prod

deploy: pull-all-images up-prod


