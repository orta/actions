FROM node:10-slim

MAINTAINER Orta Therox

LABEL "com.github.actions.name"="Danger"
LABEL "com.github.actions.description"="Runs Danger"
LABEL "com.github.actions.icon"="mic"
LABEL "com.github.actions.color"="blue"

ENTRYPOINT ["npx", "--package", "danger", "--package","typescript", "--package", "@babel/cli", "danger", "ci"]
