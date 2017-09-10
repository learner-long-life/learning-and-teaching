Kafka and Docker
================

The following writeup is a WIP and does not completely work yet.
We build on the `spotify/kafka` docker image but are experiencing
problems with the `advertised.host.name` server config setting when running
the docker container on Mac.

You might say, why not just run this on Linux.
Well that's great but I already have a MacBook that I'm not paying
constant rent on.

## Kafka and Zookeeper in Docker

We use the single-container image for running Kafka and Zookeeper from Spotify

```
git clone https://github.com/spotify/docker-kafka
```

Edit the file `kafka/Dockerfile` with version numbers updated to the latest versions of Kafka and Scala at the time of this writing.

```
ENV SCALA_VERSION 2.12
ENV KAFKA_VERSION 0.11.0.0
```

Then build the image:

```
docker build . -t kafka/spotify:latest
```

When it's done, start up the image in a `tmux` pane and voila:
```
⇒  docker run -p 2181:2181 -p 9092:9092 spotify/kafka
/usr/lib/python2.7/dist-packages/supervisor/options.py:296: UserWarning: Supervisord is running as root and it is searching for its configuration file in default locations (including its current working directory); you probably want to specify a "-c" argument specifying an absolute path to a configuration file for improved security.
  'Supervisord is running as root and it is searching '
2017-09-09 04:04:19,077 CRIT Supervisor running as root (no user in config file)
2017-09-09 04:04:19,078 WARN Included extra file "/etc/supervisor/conf.d/kafka.conf" during parsing
2017-09-09 04:04:19,078 WARN Included extra file "/etc/supervisor/conf.d/zookeeper.conf" during parsing
2017-09-09 04:04:19,087 INFO RPC interface 'supervisor' initialized
2017-09-09 04:04:19,087 CRIT Server 'unix_http_server' running without any HTTP authentication checking
2017-09-09 04:04:19,088 INFO supervisord started with pid 1
2017-09-09 04:04:20,095 INFO spawned: 'zookeeper' with pid 7
2017-09-09 04:04:20,102 INFO spawned: 'kafka' with pid 8
2017-09-09 04:04:21,112 INFO success: zookeeper entered RUNNING state, process has stayed up for > than 1 seconds (startsecs)
2017-09-09 04:04:21,112 INFO success: kafka entered RUNNING state, process has stayed up for > than 1 seconds (startsecs)
```
