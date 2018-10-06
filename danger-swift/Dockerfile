FROM node:10-slim
FROM swift:4.2

MAINTAINER Orta Therox

LABEL "com.github.actions.name"="Danger"
LABEL "com.github.actions.description"="Runs Danger"
LABEL "com.github.actions.icon"="mic"
LABEL "com.github.actions.color"="blue"

# Install danger-swift globally
RUN git clone https://github.com/danger/danger-swift.git _danger-swift
RUN cd _danger-swift && make install

# Run Danger Swift via Danger JS, allowing for custom args
ENTRYPOINT ["npx", "--package", "danger",  "process", "danger-swift"]
