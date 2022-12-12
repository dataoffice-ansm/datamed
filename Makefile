SHELL := /bin/bash
DOCKER := $(shell type -p docker)
DC := $(shell type -p docker-compose)
CURRENT_DIR := $(shell pwd)
DATA_DIR := $(shell pwd)/data
PRECOMMIT_VERSION := 2.17.0
DEPLOYMENT_VARS_FILE := deployment.env
TAG := latest
APP_NAME := datamed
PROJECT_NAME := datamed
ORG := dataoffice-ansm
REG := ghcr.io
ARGS = `arg="$(filter-out $@,$(MAKECMDGOALS))" && echo $${arg:-${1}}`
TESTS_EAFS_DIR = /data/outputs/sort_eafs

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

pre-commit:
	curl -L https://github.com/pre-commit/pre-commit/releases/download/v${PRECOMMIT_VERSION}/pre-commit-${PRECOMMIT_VERSION}.pyz -o pre-commit.pyz
	${DOCKER} run -v ${CURRENT_DIR}:/app -w /app python:3.9 python3 pre-commit.pyz install --install-hooks
	python3 pre-commit.pyz run --all-files
	rm pre-commit.pyz
