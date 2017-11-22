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
    if [ -z "$WS" ]; then
        sed -i s/'localhost:3000'/"$DOMAIN"/g public/js/carvic.js
    fi
    sed -i s/'server_name localhost'/'server_name '"$DOMAIN"/g \
    /etc/nginx/conf.d/default.conf
fi

if [ -z "$WS" ]; then
    echo "Consider adding ws address, default: same as domain name!"
else
    sed -i s/'localhost:3000'/"$WS"/g public/js/carvic.js
fi

if [ -z "$RUNDECKP" ]; then
    echo "Consider changing the default rundeck password!"
else
    JAVA="${JAVA_HOME:-/usr}/bin/java"
    PASS=`$JAVA -cp /var/lib/rundeck/bootstrap/jetty-all-9.0.7.v20131107.jar \
    org.eclipse.jetty.util.security.Password admin $RUNDECKP 2>&1`
    MD5=`echo "$PASS" | grep "^MD5:"`
    sed -i s/'^admin:.*'/'admin:'"$MD5"',user,admin'/g \
    /etc/rundeck/realm.properties
fi

if [ -z "$ANSIBLE_USER" ]; then
    echo "Ansible user missing!"
else
    sed -i 's/.*remote_user.*/remote_user = '"$ANSIBLE_USER"'/' \
    /etc/ansible/ansible.cfg
fi

if [ -z "$GITHUB_HOOK" ]; then
    echo "Consider adding github webhook service!"
else
    if [ "$GITHUB_TOKEN" = "" ] || [ "$SECRET_TOKEN" = "" ]; then
        echo "Github and/or secret webhook token missing!"
    else
        NGINX_CONF="/etc/nginx/conf.d/default.conf"
        sed -i '$ s/.$//' "$NGINX_CONF"
        echo -e "\tlocation /pyload {" >> "$NGINX_CONF"
        echo -e "\t\tproxy_pass http://localhost:"$GITHUB_HOOK";" \
        >> "$NGINX_CONF"
        echo -e "\t}\n}" >> "$NGINX_CONF"
        SUPERVISORD="/etc/supervisor/conf.d/supervisord.conf"
        echo -e "\n[program:github-webhook]" >> "$SUPERVISORD"
        echo -e "directory=/root/videk-ci" >> "$SUPERVISORD"
        echo -e "command=/root/videk-ci/github-webhook" "$GITHUB_TOKEN" \
        >> "$SUPERVISORD"
        echo -e "autorestart=true" >> "$SUPERVISORD"
        sed -i s/'port=8000'/"port=$GITHUB_HOOK"/g /root/videk-ci/github-webhook
    fi
fi

if [ "$HTTPS" = "true" ]; then
    if [ "$EMAIL" = "" ] || [ "$DOMAIN" = "" ]; then
        echo "Email and/or domain missing!"
    else
        service nginx start
        certbot -n --agree-tos --email "$EMAIL" --domains "$DOMAIN" \
        --redirect --keep-until-expiring --nginx
        service nginx stop
        NGINX_CONF="/etc/nginx/conf.d/default.conf"
        sed -i s/"ssl;"/"ssl http2;"/g "$NGINX_CONF"
    fi
else
    echo "Consider using HTTPS!"
fi

exec /usr/bin/supervisord
