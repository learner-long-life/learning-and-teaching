Kafka
=====

Kafka is a message queue and distributed log that is gaining popularity for near-real-time streaming.
Here we are going to use it to process cryptocurrency trading events using the Poloniex API,
but it can be adapted for use with any exchange.

Kafka uses Zookeeper for coordinated message stores.

## Kafka Source Distribution

I often like to keep around the Kafka source distribution to have access to its command-line tools,
and also poke around in the Kafka source code if I need to.
In one `tmux` pane:

```
cd ~/src/kafka.dir/kafka
> git clone https://github.com/apache/kafka.git
```
Now we're going to fetch and checkout the latest release tag, 0.11.0.0.

```
> git fetch origin 0.11.0.0
> git checkout 0.11.0.0
```

You'll need a fairly recent version of Gradle (version 3 or higher) which on a Mac you can get with homebrew.

```
brew upgrade gradle
```

Then
```
gradle
```
to compile the source files, and
```
gradle jar
```
to the jar files packaged up for running, as expected by `./kafka-topics`.

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

Now try getting a list of topics, back in your Kafka source distribution
```
> bin/kafka-topics.sh --list --zookeeper localhost:2181
... some barf about SLF4J, we'll figure out how to silence it later
```
No topics yet. Let's create one.

```
> bin/kafka-topics.sh --create --topic "test-topic" --replication-factor 1 --partitions 1 --zookeeper localhost:2181
```

That takes care of the server, but now we'd like to connect to our simple little server with various clients.

## `node-rdkafka`

The first client is one that runs Node.js to take advantage of a Poloniex JS client that we've already written.

To do that, make sure you have the latest version of Node.js installed.
I use `nvm` to do that.

```
> nvm install v8.4.0
> nvm use v8.4.0
```
I also make sure I have the latest version of `npm`
```
> npm install --upgrade npm
> npm --version
5.4.1
```
As a dependency, make sure you have the latest `nan` installed. Is there really a whole package
for everyone's favorite numerical error?

```
❯ npm install nan                                                                                                                           ruby-2.2.0
+ nan@2.7.0
updated 1 package in 2.842s
```

Now I install `node-rdkafka` from Blizzard. Yes, that Blizzard, fine makers of Starcraft.
```
> npm install --save node-rdkafka
... some compilation output
+ node-rdkafka@2.0.0
added 2 packages in 42.07s
```

Now start up node and let's poke around in the console:

```
> node
var Kafka = require('node-rdkafka');
> console.log(Kafka.features);
[ 'gzip', 'snappy', 'sasl', 'regex', 'lz4' ]
> console.log(Kafka.version)
v0.9.5
```

Let's create a producer to send some messages.

```
var producer = new Kafka.Producer({ 'metadata.broker.list': 'localhost:9092' })
```
