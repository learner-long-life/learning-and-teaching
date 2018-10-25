Secure Scuttlebutt
==================

Secure Scuttlebutt is a community gossip protocol combined with a distributed encrypted apppend-only message queue.
If you're familiar with other message queues like Apache Kafka or Google PubSub, think of SSB as a decentralized, private-by-default
Kafka or PubSub that is open source and hosted on the hard drives of its users (their nodes).

With it, you can implement many fascinating applications that rely on message passing, persistence, privacy, and a friend graph.
In particular, Patchwork / Patchfoo are implementations of a basic, decentralized Facebook-like social media, but without
your data being mined and monetized.

Even more interestingly, Scuttlebutt can be used to replicate many of the applications that many people consider
unique to blockchains and similar immutable data structures. For example: voting, unique collectible digital items,
information oracles, mutual credit / social currencies, the afore-mentioned social media networks.

In fact, SSB is secure by default, so can do many things that transparent blockchains such as Bitcoin and Ethereum cannot do,
such as store the results of private computation or keep secret balances like Monero or Zcash.

Like blockchains, it is often useful to run testnets (called altnets in SSB parlance) while debugging your applications
to avoid polluting the mainnets, filling your friend's hard drives, and also maintain the privacy of your data.

Here's a good tutorial on altnets with Scuttlebot by Josiah Witt.
https://josiahwitt.com/2018/07/08/scuttlebutt-intro-test-playground.html
In particular, it will show you how to create a random new shared secret (`shs`) and signing key (`sign`) in base64
that you can substitute in your altnet `config`.

# Discoverability

In order to tell other pubs about your pub, you need to follow some steps based on the [official setup a pub tutorial](https://ssbc.github.io/docs/scuttlebot/howto-setup-a-pub.html).

By default, ssb nodes, including pubs, only discover each other on the same local network.
To connect across the internet, you can either run a pub (a known publicly accessible node that is invited to follow normal nodes)
or to statically add node IP addresses with the `ssb-gossip` plugin.

## Running a Pub

In the first method, you'll need to advertise your hostname (not IP address, possibly for reasons of NAT)

### Start up Server

  First, start up your node's server to create a `manifest.json` file.
  ```
  scuttlebot server --host {hostname}
  ```
  in our example, it would look like 

### Get ID

Then in other terminal get its id
  ```
  scuttlebot whoami
  ```

### Publish an About Message

Next, publish a message about your pub, something like this
  ``` 
  sbot publish --type about --about {pub-id} --name {hostname}
  ```
  in our example it would look like

### Request an Invite Code

On your pub node
 ```
 > sbot invite.create 1
 "arcology.nyc:8007:@yy7jfy6kZgIowz7LWVKYlmaysCL8V/7373pmQdjZj3I=.ed25519~hLzZooEY/c+nw+3vL3fVEIS+TxG7N3IVJHW6+UptUSo="
 ```
Or on someone else's pub node, request an invite.

### Get Followed By An Existing Pub

1. Then request an invite from an existing pub and accept it here by pasting its code
  ```
  ```

## Adding a Peer
