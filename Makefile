SHELL := /bin/bash
DOCKER := $(shell type -p docker)
DC := $(shell type -p docker-compose)
CURRENT_DIR := $(shell pwd)
TAG := latest
APP_NAME := datamed
PROJECT_NAME := datamed
ORG := dataoffice-ansm
REG := ghcr.io
ARGS = `arg="$(filter-out $@,$(MAKECMDGOALS))" && echo $${arg:-${1}}`

down:
	${DC} -f docker-compose-prod.yml down

up:
	${DC} -f docker-compose-prod.yml up -d

pull:
	docker pull ${REG}/${ORG}/${PROJECT_NAME}/${APP_NAME}:${TAG}

deploy: pull up


