FROM      ubuntu:xenial
MAINTAINER Matevz Vucnik <matevz.vucnik@ijs.si>

LABEL Description="This image is used to bootstrap Videk with all \
                  dependences" Vendor="JSI" Version="1.0"
# update packages
RUN apt-get update
RUN apt-get install -y lsb-release

# install nodejs an npm
RUN apt-get install -y nodejs
RUN apt-get install -y npm
RUN ln -s /usr/bin/nodejs /usr/bin/node
RUN npm install forever -g

# install mongodb
RUN apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv EA312927
RUN echo "deb http://repo.mongodb.org/apt/ubuntu trusty/mongodb-org/3.2 \
multiverse" | tee /etc/apt/sources.list.d/mongodb-org-3.2.list
RUN apt-get update && apt-get install -y mongodb-org
RUN mkdir -p /data/db

# install git
RUN apt-get install -y git

# get Videk master from github
RUN cd /home && \
git clone https://github.com/sensorlab/SensorManagementSystem.git
RUN cd /home/SensorManagementSystem && npm install

# install nginx
# install munin

# nginx configuration file
# munin configuration file

COPY start.sh /home/start.sh
ENTRYPOINT ["/bin/bash", "/home/start.sh"]
