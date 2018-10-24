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

Here's a good tutorial on altnets with Scuttlebot
https://josiahwitt.com/2018/07/08/scuttlebutt-intro-test-playground.html
