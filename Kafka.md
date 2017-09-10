Kafka
=====

Kafka is a message queue and distributed log that is gaining popularity for near-real-time streaming.
Here we are going to use it to process cryptocurrency trading events using the Poloniex API,
but it can be adapted for use with any exchange.

Kafka uses Zookeeper for coordinated message stores.
We'll first cover how to install the Kafka server backend.

# Kafka Server

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

## Schemas

While it is sometimes great to live in a fairyland of dynamic types and schemaless operations,
having a schema has many benefits in a streaming system:

* Enforce forward and backward compatibility and a migration path. Ignore unsupported message types that your code doesn't know how to handle. No more crashing on
serialization or deserialization errors.
* Built-in serialization and deserialization. You don't have to write custom converters, which can be error-prone.
* You can handle different message types / schema versions
easily, allowing you to mix different message types in a single topic.

This comes at the cost of
* Setting up a separate schema registry service.
* Using a schema wrapper library, like Avro.

In this section, we'll see how hard these are.

First, we'll compile things from source like the hardcore hackers we are.
Plus, I hate giving my email address to Confluent just to download their tarballs.

### `common` and `rest-utils`

You'll need to clone the `common` and `rest-utils` dependencies, fetch and checkout the `v3.3.0` release tag (the latest at the time of this writing),
and build them with Maven into your local cache.
You'll need to do these in order, since `rest-utils` depends on `common`.

```
> cd ~/src/kafka.dir
> git clone https://github.com/confluentinc/common.git
> cd common
> git fetch v3.3.0
> git checkout v3.3.0
> mvn compile
> mvn install
```

```
> cd ~/src/kafka.dir/
> git clone https://github.com/confluentinc/rest-utils.git
> cd rest-utils
> git fetch v3.3.0
> git checkout v3.3.0
> mvn compile
> mvn install
```

### `Schema Registry`

Now you have what you need to build Confluent's Schema Registry from source, which provides a nice
REST interface to query and create schemas that are used / usable by your streaming app.

```
> cd ~/src/kafka.dir
> git clone https://github.com/confluentinc/schema-registry.git
> cd schema-registry
> git fetch v3.3.0
> git checkout v3.3.0
> mvn compile
> mvn install 
```
When installing Schema Registry, you'll need to have your



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

# Clients

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
