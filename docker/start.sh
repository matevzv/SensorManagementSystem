#!/bin/bash

if [ -z "$EMAIL" ]; then
    echo "Email missing!"
else
    sed -i s/example@gmail.com/$EMAIL/g /etc/munin/munin.conf
    sed -i s/example@gmail.com/$EMAIL/g /etc/msmtprc
fi

if [ -z "$PASSWORD" ]; then
    echo "Email password missing!"
else
    sed -i s/secret/$PASSWORD/g /etc/msmtprc
fi

exec /usr/bin/supervisord -c /etc/supervisor/conf.d/supervisord.conf
