# kafka-cheatsheet
A crib for common Kafka operations and configurations.

# Concepts


# Configs

## Client Configuration

http://kafka.apache.org/documentation.html#newconsumerconfigs
Also from 

`fetch.min.bytes` - The broker will wait until these minimum number of bytes is available in committed messages before sending them to the consumer. Default is 1 (byte).

`fetch.max.wait.ms` - maximum timeout in milliseconds. The broker will wait until either it has accumulated `fetch.min.bytes` or `fetch.max.wait.ms` milliseconds, whichever comes first. Default is 500 (ms).

`max.partition.fetch.bytes` - the maximum size of messages returned, by partition, to the consumer. Equivalently, the largest size of any message on any partition that the consumer can read. The consumer should have at least this many bytes available in memory. Default is 

`session.timeout.ms` - amount of time consumer can be out-of-touch with brokers and considered alive.

`heartbeat.interval.ms` - amount of time in between heartbeats 

`auto.offset.reset` - the policy of whether to consume the earliest available or latest available offset, if a new consumer comes online and the broker doesn't have a record of the latest offset consumed.

## Producer Configuration

## Topic Configuration

## Broker Configs

