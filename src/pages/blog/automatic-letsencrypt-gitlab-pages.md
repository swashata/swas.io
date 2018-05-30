---
templateKey: blog-post
featured_image: ''
hero_image: ''
title: "Automatic Letsencrypt SSL for Gitlab and GitLab Pages"
description: "How to automate SSL with lets encrypt for GitLab and GitLab pages."
date: 2017-09-17T07:54:41+05:30
tags: [ "GitLab", "Let's encrypt", "SSL" ]
---

So I use GitLab and GitLab pages as part of my workflow for past 4 years and it
has been a wonderful journey. The flexibility GitLab provides is extra ordinary
and all for free. As you have seen from my [previous post](/blog/gitlab-private-networking-runner/)
I have set them up on different [Linode VMs](https://linode.com).

One of the challenges was to automate Let's Encrypt free SSL for both my GitLab
and GitLab instances.

I could have used [cloudflare SSL](https://www.cloudflare.com), but for brevity,
I opted for Let's Encrypt.

## Pre-requisites

For this, I am assuming, we are running GitLab on Ubuntu 16.04 LTS and we have
the following packages installed.

* [Python3](https://www.python.org/) - Comes pre-installed with Ubuntu 16.04.
* [Certbot](https://certbot.eff.org/) - We will see how to install it.
* [GitLab pages](https://docs.gitlab.com/ee/administration/pages/) is setup with any of the official methods.

Before we proceed, let's do a system upgrade.

```bash
sudo apt update
sudo apt upgrade
```

In my scenario, the URLs are as follows.

* GitLab - `https://wpquark.io` Listening on `139.162.39.232`.
* GitLab Pages - `https://wpquark.xyz` Listening on `172.104.184.210`.

But you can have both GitLab and GitLab pages on the same IP. I have this because
I support custom domain. This website `https://swashata.me` is actually being
hosted by GitLab Pages, originally at `https://swashata.wpquark.xyz` and published
through [Hugo](https://gohugo.io/).

## Installing Let's Encrypt

We will be using official PPA for this.

```bash
sudo add-apt-repository ppa:certbot/certbot
```

Now update package list and install certbot.

```bash
sudo apt update && apt install certbot
```

Now that certbot is installed, we can proceed with creating SSL.

## Create needed directories

We need the following directories, before we proceed.

```bash
sudo mkdir -p /var/www/letsencrypt
sudo mkdir -p /var/www/pagessl
```

## 1 - GitLab SSL through Let's Encrypt

With all pre-requisites out of the way, let's generate some SSL.

### Edit GitLab Configuration

Now edit the file at `/etc/gitlab/gitlab.rb`.

```bash
sudo nano /etc/gitlab/gitlab.rb
```

And put the following configuration, or edit if necessary.

```ruby
nginx['custom_gitlab_server_config'] = "location ^~ /.well-known { root /var/www/letsencrypt; }"
```

Reconfigure GitLab

```bash
sudo gitlab-ctl reconfigure
```

Now we are ready to generate SSL.

### Create GitLab SSL

Now that GitLab's Nginx is configured to server files from the needed directory,
we can go ahead and tell certbot to get us a certificate and use `--webroot` to
place the needed files.

```bash
sudo certbot certonly --webroot --webroot-path=/var/www/letsencrypt -d wpquark.io
```

Of course you would replace `wpquark.io` with your domain name. Once done, you
will see an output like this.

```text
IMPORTANT NOTES:
 - Congratulations! Your certificate and chain have been saved at
   /etc/letsencrypt/live/wpquark.io/fullchain.pem. Your cert
   will expire on 2017-07-26. To obtain a new or tweaked version of
   this certificate in the future, simply run certbot again. To
   non-interactively renew *all* of your certificates, run "certbot
   renew"
 - If you lose your account credentials, you can recover through
   e-mails sent to sammy@example.com.
 - Your account credentials have been saved in your Certbot
   configuration directory at /etc/letsencrypt. You should make a
   secure backup of this folder now. This configuration directory will
   also contain certificates and private keys obtained by Certbot so
   making regular backups of this folder is ideal.
 - If you like Certbot, please consider supporting our work by:

   Donating to ISRG / Let's Encrypt:   https://letsencrypt.org/donate
   Donating to EFF:                    https://eff.org/donate-le
```

If you are having issues, shoot in the comments.

### Use SSL in GitLab

Now edit your config file again.

```bash
sudo nano /etc/gitlab/gitlab.rb
```

And change or put the following configuration options.

```ruby
external_url 'https://wpquark.io'
nginx['redirect_http_to_https'] = true
nginx['ssl_certificate'] = "/etc/letsencrypt/live/wpquar.io/fullchain.pem"
nginx['ssl_certificate_key'] = "/etc/letsencrypt/live/wpquar.io/privkey.pem"
```

Reconfigure GitLab

```bash
sudo gitlab-ctl reconfigure
```

And see your GitLab under `https`.

## 2 - GitLab Pages using Let's Encrypt

Now this is going to be tricky, so I am going to break down what we will be doing.

1. We will turn off `gitlab-pages` service.
2. We will use python to spawn a `http.server` at `/var/www/pagessl`
3. We will use `certbot` to get the SSL through python server.
4. We will stop the python server and start `gitlab-pages` service.

For this we will be using two scripts which I have made from [here](https://github.com/VojtechMyslivec/letsencrypt-gitlab).

### Create the script files

Create a file `/opt/gpages/before.sh` and put the following content.

```bash
sudo nano /opt/gpages/before.sh
```

```python
#!/bin/bash
## letsencrypt_wrapper.sh
#
# this script is used to turn off gitlab-pages and start a python server
# then certbot would renew the domains and the after hook will kill python
# server and start the pages again

# path where python dummy server would be running
webroot_path="/var/www/pagessl"
# gitlab services controller
gitlab_ctl="/usr/bin/gitlab-ctl"
# log level
log_level_i=2
# Pages IP
pages_bind_ip=172.104.184.210

# functions --------------------------------------
message() {
    echo "$SCRIPTNAME[$1]: $2" >&2
}

# for log_level >= info = 2
info() {
    [ "$log_level_i" -ge "2" ] && \
      message "info" "$*"
}

# for log_level >= warn = 1
warning() {
    [ "$log_level_i" -ge "1" ] && \
      message "warn" "$*"
}

# for log_level >= err = 0 (everytime)
error() {
    #[ "$log_level_i" -ge "0" ] && \
      message "err" "$*"
}

# needed for dummy webserver
cd "$webroot_path" || {
    error "Can not change directory to '$webroot_path'"
    exit 1
}


# main -------------------------------------------

info "Stoping Pages"
"$gitlab_ctl" stop gitlab-pages > /dev/null || {
    error "Failed to stop pages"
    exit 3
}

info "Running dummy webserver"
dummy_server_pidfile=$( mktemp )
python3 -m http.server --bind "$pages_bind_ip" 80 &> /dev/null &
echo "$!" > "$dummy_server_pidfile"

sleep 2
pgrep -P "$$" -F "$dummy_server_pidfile" python > /dev/null || {
    error "Can not start dummy web server"
    "$gitlab_ctl" start gitlab-pages > /dev/null || {
        error "Failed to start pages"
        exit 3
    }
    exit 3
}

info "Exporting python server variable"
rm -f /tmp/wpq_pages_python
echo "$dummy_server_pidfile" > /tmp/wpq_pages_python
```

Create a file `/opt/gpages/after.sh` and put the following content.

```bash
sudo nano /opt/gpages/after.sh
```

```python
#!/bin/bash
## letsencrypt_wrapper.sh
#
# this script is used to turn off gitlab-pages and start a python server
# then certbot would renew the domains and the after hook will kill python
# server and start the pages again

# path where python dummy server would be running
webroot_path="/var/www/pagessl"
# gitlab services controller
gitlab_ctl="/usr/bin/gitlab-ctl"
# log level
log_level_i=2
# Pages IP
pages_bind_ip=172.104.184.210
# python variable
dummy_server_pidfile=`cat /tmp/wpq_pages_python`
dummy_server_pid=`cat $dummy_server_pidfile`

# functions --------------------------------------
message() {
    echo "$SCRIPTNAME[$1]: $2" >&2
}

# for log_level >= info = 2
info() {
    [ "$log_level_i" -ge "2" ] && \
      message "info" "$*"
}

# for log_level >= warn = 1
warning() {
    [ "$log_level_i" -ge "1" ] && \
      message "warn" "$*"
}

# for log_level >= err = 0 (everytime)
error() {
    #[ "$log_level_i" -ge "0" ] && \
      message "err" "$*"
}

# needed for dummy webserver
cd "$webroot_path" || {
    error "Can not change directory to '$webroot_path'"
    exit 1
}

info "Stoping dummy webserver"
kill -9 "$dummy_server_pid"

# in case it needs waiting to be killed
sleep 2

rm "$dummy_server_pidfile" || {
    warning "Can not remove temporary pidfile '$dummy_server_pidfile'"
}
rm -f "/tmp/wpq_pages_python" || {
	warning "Can not remove temporary varfile '/tmp/wpq_pages_python'"
}

info "Starting Pages" >&2
"$gitlab_ctl" start gitlab-pages > /dev/null || {
    error "Failed to start pages"
    exit 3
}
```

Now make both the files executable.

```bash
sudo chmod +x /opt/gpages/*
```

### Execute Commands

Now that our scripts are in-place, obtaining certificates for Pages domain is
only a matter of executing the scripts in order.

```bash
sudo /opt/gpages/before.sh
sudo certbot certonly --webroot --webroot-path=/var/www/letsencrypt -d wpquark.xyz -d subdomain1.wpquark.xyz -d subdomain2.wpquark.xyz
sudo /opt/gpages/after.sh
```

If set-up properly, then it will obtain certificates for you and will save them
in `/etc/letsencrypt/live/wpquark.xyz/fullchain.pem` for your use.

### Edit gitlab.rb configuration

Once again, edit `/etc/gitlab/gitlab.rb` file and put there the following config.
You need to change the values according to your server config.

```ruby
pages_external_url 'https://wpquark.xyz'
pages_nginx['enable'] = false
gitlab_pages['cert'] = "/etc/letsencrypt/live/wpquark.xyz/fullchain.pem"
gitlab_pages['cert_key'] = "/etc/letsencrypt/live/wpquark.xyz/privkey.pem"
gitlab_pages['external_http'] = ['172.104.184.210:80']
gitlab_pages['external_https'] = ['172.104.184.210:443']
```

Note that I have used external domain support for my setup. If you don't need
that, then your config would look like this.

```ruby
pages_external_url 'https://wpquark.xyz'
pages_nginx['ssl_certificate'] = "/etc/letsencrypt/live/wpq-develop.wpquark.xyz/fullchain.pem"
pages_nginx['ssl_certificate_key'] = "/etc/letsencrypt/live/wpq-develop.wpquark.xyz/privkey.pem"
pages_nginx['redirect_http_to_https'] = true
```

Now restart gitlab

```bash
gitlab-ctl reconfigure
gitlab-ctl restart
```

And enjoy free SSL with let's encrypt.

## Automate with Cron Job

Now that we have issued SSL, it is time to automate with crontab. Create or edit
the system crontab and put the following line.

```bash
sudo crontab -e
```

```text
15 3 * * * /usr/bin/certbot renew --quiet --pre-hook "/opt/gpages/before.sh" --post-hook "/opt/gpages/after.sh" --deploy-hook "/usr/bin/gitlab-ctl restart nginx"
```

This will check for renewal every day at `3:15am` and will execute needed hooks.

## Further Read

* [Secure GitLab with Let's Encrypt](https://www.digitalocean.com/community/tutorials/how-to-secure-gitlab-with-let-s-encrypt-on-ubuntu-16-04) - Digital Ocean.
* [Securing GitLab Pages with Let's Encrypt](https://about.gitlab.com/2016/04/11/tutorial-securing-your-gitlab-pages-with-tls-and-letsencrypt/) - GitLab.
