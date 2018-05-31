---
templateKey: blog-post
featured_image: '../../images/gitlab-ci-cd.png'
hero_image: '../../images/gitlab-ci-cd.png'
title: "Linode Private Networking with GitLab & GitLab Runner"
date: 2017-09-16T18:18:01+05:30
tags: [ "GitLab", "Linode", "Networking" ]
---
![GitLab CI/CD](../../images/gitlab-ci-cd.png)

So I have this 3 servers running for my complete GitLab setup with automated CI/CD
and code analysis with SonarQube. (*About which I will surely write*).

![GitLab CI/CD](../../images/linode-instances.png)

One thing I wanted to take advantage of was Linode's Private Networking for
faster communication between my GitLab and GitLab Runner. Do note that I assume
we already have

* Both [GitLab](https://about.gitlab.com/installation/) and [GitLab Runner](https://docs.gitlab.com/runner/install/linux-repository.html)
	were installed through official method. I am using Ubuntu and have installed
	through official PPAs.
* GitLab and GitLab runner installed on separate VMs.
* Have a few runners registered and running.

## Enable Linode Private Networking

For this I am going to defer to the [awesome guide](https://www.linode.com/docs/networking/remote-access#adding-private-ip-addresses) of Linode's Documentation.

In short, for the **GitLab Linode**

* Go to your Linode > Remote Access Tab.
* Add a Private IP.

For my case, it was `192.168.136.224 / 17`. So far so good. We do not need to
have private IP for the GitLab Runner Linode because, the Runner actually
communicates with the GitLab instance, not the other way round.

## Make GitLab Runner use Private IP

Now SSH into your GitLab Runner VM and edit the `/etc/hosts` file.

```bash
nano /etc/hosts
```

Depending on the IP and your GitLab URL, add an entry like this

```text
192.168.136.224 wpquark.io
```

As you have guessed, I am telling the **GitLab Runner** VM to use the private
IP for connecting to `https://wpquark.io`.

## Tell GitLab to listen to the private IP

This step is optional. But if you have changed the `nginx['listen_addresses']`
configuration. You may have done it if you were configuring, for say, GitLab Pages.

Now, edit your `/etc/gitlab/gitlab.rb` file

```bash
sudo nano /etc/gitlab/gitlab.rb
```

and modify the config to include our IP address.

```ruby
nginx['listen_addresses'] = ['192.168.136.224', '1.1.1.1', '[2001::2]']
```

Where I have assumed `1.1.1.1` and `[2001::2]` are the public IPV4 and IPV6 addresses
of your GitLab instance. Now, do a reconfigure.

```bash
sudo gitlab-ctl reconfigure
```

--------------------------------------------------------------------------------

![GitLab CI/CD](../../images/gitlab-runner.png)

That's it. Now enjoy while your runners will communicate faster.

