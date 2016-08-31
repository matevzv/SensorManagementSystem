#!/bin/bash

if [ -z "$EMAIL" ]; then
    echo "Email missing!"
else
    sed -i s/example@gmail.com/"$EMAIL"/g /etc/munin/munin.conf
    sed -i s/example@gmail.com/"$EMAIL"/g /etc/msmtprc
fi

if [ -z "$PASSWORD" ]; then
    echo "Email password missing!"
else
    sed -i s/secret/"$PASSWORD"/g /etc/msmtprc
fi

if [ -z "$SSH_AUTH_SOCK" ]; then
    echo "Consider adding ssh key!"
else
    sed -i \
    's|^#!/bin/bash|#!/bin/bash\n\nexport SSH_AUTH_SOCK='"$SSH_AUTH_SOCK"'|g' \
    /root/videk-hosts/videk-ping.sh
fi

if [ -z "$DOMAIN" ]; then
    echo "Consider adding domain name, default: localhost!"
else
    sed -i s/'localhost:3000'/"$DOMAIN"/g public/js/carvic.js
    sed -i s/'server_name localhost'/'server_name '"$DOMAIN"/g \
    /etc/nginx/conf.d/default.conf
fi

if [ -z "$RUNDECKP" ]; then
    echo "Consider changing the default rundeck password!"
else
    JAVA="${JAVA_HOME:-/usr}/bin/java"
    PASS=`$JAVA -cp /var/lib/rundeck/bootstrap/jetty-all-7.6.0.v20120127.jar \
    org.eclipse.jetty.util.security.Password admin $RUNDECKP 2>&1`
    MD5=`echo "$PASS" | grep "^MD5:"`
    sed -i s/'^admin:.*'/'admin:'"$MD5"',user,admin,architect,deploy,build'/g \
    /etc/rundeck/realm.properties
fi

if [ -z "$ANSIBLE_USER" ]; then
    echo "Ansible user missing!"
else
    sed -i 's/.*remote_user.*/remote_user = '"$ANSIBLE_USER"'/' \
    /etc/ansible/ansible.cfg
fi

exec /usr/bin/supervisord -c /etc/supervisor/conf.d/supervisord.conf
