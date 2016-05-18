FROM ubuntu:xenial
MAINTAINER Matevz Vucnik <matevz.vucnik@ijs.si>

LABEL Description="This image is used to bootstrap Videk with all dependences"
LABEL Vendor="JSI"
LABEL Version="1.0"

# update packages and install some commons
RUN apt-get update
RUN apt-get upgrade -y
RUN apt-get install -y supervisor

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
COPY docker/db /data/db

# install nginx
RUN apt-get install -y nginx
# RUN apt-get install fcgiwrap
RUN apt-get install -y spawn-fcgi
RUN echo "daemon off;" >> /etc/nginx/nginx.conf
COPY docker/default.conf /etc/nginx/conf.d/default.conf

# install git
RUN apt-get install -y git

# get Videk master from github
RUN cd /home && \
git clone -b docker-support https://github.com/matevzv/SensorManagementSystem.git
WORKDIR /home/SensorManagementSystem
RUN npm install

ARG EMAIL
ARG PASSWORD

# install munin
RUN apt install -y munin
RUN sed -e '/background 1/ s/^#*/# /' -i /etc/munin/munin-node.conf
RUN sed -i 's/^\(setsid \).*/\10/' /etc/munin/munin-node.conf
RUN mkdir -p /var/run/munin
RUN chown munin /var/run/munin
RUN chmod 755 /var/run/munin
#RUN mv /var/lib/munin/.mailrc /var/lib/munin/.mailrc-bak
COPY docker/munin.conf /etc/munin/munin.conf
RUN sed -i s/example@gmail.com/${EMAIL}/g /etc/munin/munin.conf

# setup munin alert email
RUN apt-get install -y msmtp-mta
RUN apt-get install -y mailutils
COPY docker/msmtprc /etc/msmtprc
RUN sed -i s/example@gmail.com/${EMAIL}/g /etc/msmtprc
RUN sed -i s/secret/${PASSWORD}/g /etc/msmtprc

COPY docker/supervisord.conf /etc/supervisor/conf.d/supervisord.conf
CMD ["/usr/bin/supervisord"]
