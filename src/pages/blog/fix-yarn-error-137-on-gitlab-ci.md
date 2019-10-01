---
title: Fix Yarn error 137 on GitLab CI
date: 2019-10-01T16:56:39.606Z
description: How to fix Yarn exit code 137 when running commands on GitLab CI/CD through GitLab Runner.
tags: ["gitlab","ci/cd"]
templateKey: blog-post
---

Very recently I came across an error when running some nodejs script on GitLab
CI/CD. As usual, the commands were running fine on my local machine, but on
GitLab Runner it was throwing an error 137 saying...

```
Killed
error Command failed with exit code 137.
info Visit https://yarnpkg.com/en/docs/cli/run for documentation about this command.
```

A quick googling revealed that the issue was indeed related to memory. For some
background, here's my GitLab setup.

-   I use [gitlab.com](https://gitlab.com) hosted service.
-   For runner, I have a 4GB [linode](https://linode.com) instance running
    GitLab Runner.
-   GitLab runner is running with
    [docker executor](https://docs.gitlab.com/runner/executors/docker.html).

## Fixing Yarn error 137 on GitLab CI

All we need to do is increase the memory size of the docker runner.

> NOTE: The following commands need to be run as super user. So affix `sudo`
> before all commands.

### STEP 1: Configure GitLab runner with docker executor

Make sure you are using GitLab runner with docker executor. Otherwise the guide
will not work. To configure a fresh gitlab runner with docker executor, you can
run the following command, optionally after deleting the file
`/etc/gitlab-runner/config.toml`.

```bash
sudo gitlab-runner register
```

Make sure you select the `docker` executor when asked. More information can be
[found here](https://docs.gitlab.com/runner/register/).

### STEP 2: Increase memory of the runner

Edit the gitlab runner `config.toml` file by

```bash
nano /etc/gitlab-runner/config.toml
```

It should look something like

```toml
[session_server]
  session_timeout = 1800

[[runners]]
  name = "runner-name"
  url = "https://gitlab.or.your.instance.com/"
  token = "SUPER_SECRET_TOKEN"
  executor = "docker"
  [runners.custom_build_dir]
  [runners.docker]
    tls_verify = false
    image = "ubuntu:latest"
    privileged = false
    disable_entrypoint_overwrite = false
    oom_kill_disable = false
    disable_cache = false
    volumes = ["/cache"]
    shm_size = 0
    memory = "128m"
    memory_swap = "256m"
    memory_reservation = "256m"
    cpus = "2"
  [runners.cache]
    [runners.cache.s3]
    [runners.cache.gcs]
```

The options we are interested in are the `memory`, `memory_swap` and
`memory_reservation`. I would like to give double the value to `memory_swap` as
that of `memory`. Since my runner was hosted on a 4GB instance, I increased the
memories like below.

```diff
[[runners]]
  name = "runner-wpquark"
  url = "https://gitlab.com/"
  token = "hkP9m2zhFYAuMS5_7yxQ"
  executor = "docker"
  [runners.custom_build_dir]
  [runners.docker]
    tls_verify = false
    image = "ubuntu:latest"
    privileged = false
    disable_entrypoint_overwrite = false
    oom_kill_disable = false
    disable_cache = false
    volumes = ["/cache"]
    shm_size = 0
-    memory = "128m"
+    memory = "2048m"
-    memory_swap = "256m"
+    memory_swap = "4096m"
-    memory_reservation = "256m"
+    memory_reservation = "2048m"
    cpus = "2"
  [runners.cache]
    [runners.cache.s3]
    [runners.cache.gcs]
```

### STEP 3: Restart GitLab Runner

Finally restart gitlab runner service by running

```bash
gitlab-runner restart
```

---

Now run your CI/CD pipeline again and for most of the cases the job will not
fail. If it still gives you error 137, try increasing the memory again.
