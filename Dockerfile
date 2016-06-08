FROM ubuntu:xenial
MAINTAINER Matevz Vucnik <matevz.vucnik@ijs.si>

LABEL Description="This image is used to bootstrap Videk with all dependences"
LABEL Vendor="JSI"
LABEL Version="1.0"

# update packages and install some commons
RUN apt-get update
RUN apt-get upgrade -y
RUN apt-get install -y supervisor
RUN apt-get install -y git

# install nodejs an npm
RUN apt-get install -y nodejs
RUN apt-get install -y npm
RUN ln -s /usr/bin/nodejs /usr/bin/node

# install mongodb
RUN apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv EA312927
RUN echo "deb http://repo.mongodb.org/apt/ubuntu trusty/mongodb-org/3.2 \
multiverse" | tee /etc/apt/sources.list.d/mongodb-org-3.2.list
RUN apt-get update && apt-get install -y mongodb-org
RUN mkdir -p /data/db

# install nginx
RUN apt-get install -y nginx
RUN apt-get install -y spawn-fcgi
COPY docker/nginx/default.conf /etc/nginx/conf.d/default.conf

# install munin
RUN apt install -y munin
RUN sed -e '/background 1/ s/^#*/# /' -i /etc/munin/munin-node.conf
RUN sed -i 's/^\(setsid \).*/\10/' /etc/munin/munin-node.conf
RUN mkdir -p /var/run/munin
RUN chown munin /var/run/munin
RUN chmod 755 /var/run/munin
RUN mkdir -p /var/cache/munin/www
RUN chown munin /var/cache/munin/www
RUN chmod 755 /var/cache/munin/www
RUN mkdir -p /var/lib/munin
RUN chown munin /var/lib/munin
RUN chmod 755 /var/lib/munin
COPY docker/munin/munin.conf /etc/munin/munin.conf

# install email support and setup munin alert
RUN apt-get install -y msmtp-mta
RUN apt-get install -y mailutils
COPY docker/munin/msmtprc /etc/msmtprc

# install ansible
RUN apt-get install -y ansible
COPY docker/ansible/hosts /etc/ansible/hosts

# install rundeck
RUN apt-get install -y default-jdk
RUN wget download.rundeck.org/deb/rundeck-2.6.7-1-GA.deb -P /tmp
RUN dpkg -i /tmp/rundeck-2.6.7-1-GA.deb
RUN wget https://github.com/Batix/rundeck-ansible-plugin/releases/download/\
1.2.4/ansible-plugin-1.2.4.jar -P /var/lib/rundeck/libext
COPY docker/rundeck/rundeck-config.properties \
/etc/rundeck/rundeck-config.properties
COPY docker/rundeck/profile /etc/rundeck/profile
COPY docker/rundeck/rundeckd /root/rundeck/rundeckd

# install Videk master from github
RUN cd /root && \
git clone -b rundeck-integration https://github.com/matevzv/SensorManagementSystem.git
WORKDIR /root/SensorManagementSystem
RUN npm install
RUN /usr/bin/mongod --fork --logpath /var/log/mongodb.log --dbpath \
/data/db && nodejs app.js init -y && /usr/bin/mongod --shutdown

# volumes
VOLUME ["/data/db", "/etc/munin", "/var/lib/munin", "/var/cache/munin/www", \
"/etc/ansible", "/etc/rundeck", "/var/lib/rundeck"]

COPY docker/supervisord.conf /etc/supervisor/conf.d/supervisord.conf
COPY docker/start.sh /root/start.sh
RUN chmod 755 /root/start.sh

ENTRYPOINT ["/root/start.sh"]
