Overtone
========

[Overtone](overtone.github.io) is a client-side Clojure library for generating sonic algorithms,
livecoding performances, and adding audio beauty to the universe.
The LISP-like nature of Clojure makes it ideal for modifying objects and parameters
at runtime, as often happens in the real-time creative process.
It uses the SuperCollider synthesizer and communicates with it using the OSC
protocol.

## Installation

The following instructions describe how to begin using Overtone on my MacBook Air (2013)
running High Sierra 10.12.6, following the instructions on the
[Overtone wiki]().

First, install leiningen via Homebrew, which is a package manager and build-tool
for Clojure, and also gives you a REPL. It's similar to the role of SBT in the Scala
ecosystem.

```
brew install leiningen
```

You can get more info about the versions of Leiningen on your system,
and where it will install and look for dependencies by typing the below.

```
$ brew info leiningen
leiningen: stable 2.8.1 (bottled), HEAD
Build tool for Clojure
https://github.com/technomancy/leiningen
/usr/local/Cellar/leiningen/2.5.0 (8 files, 14.3MB)
  Built from source on 2014-12-20 at 22:10:21
/usr/local/Cellar/leiningen/2.7.1 (8 files, 14.7MB)
  Poured from bottle on 2017-10-14 at 15:40:01
/usr/local/Cellar/leiningen/2.8.1 (9 files, 13MB) *
  Poured from bottle on 2017-12-09 at 14:51:17
From: https://github.com/Homebrew/homebrew-core/blob/master/Formula/leiningen.rb
==> Caveats
Dependencies will be installed to:
  $HOME/.m2/repository
To play around with Clojure run `lein repl` or `lein help`.

Bash completion has been installed to:
  /usr/local/etc/bash_completion.d

zsh completions have been installed to:
  /usr/local/share/zsh/site-functions
```

Next, create a new Lein project

```
lein new tutorial
```

You'll find a new directory `tutorial` in your current directory,
which you can change into and edit the `project.clj` file using your favorite
text editor. I use `vim`.

```
cd tutorial
vim project.clj
```

Mine looks like this, where I added the exact versions of the dependencies
Lein should download and use, including Clojure itself.

```
(defproject tutorial "0.1.0-SNAPSHOT"
  :description "Sounds in Overtone"
  :url "http://example.com/FIXME"
  :license {:name "Eclipse Public License"
            :url "http://www.eclipse.org/legal/epl-v10.html"}
  :dependencies [ [org.clojure/clojure "1.8.0"]
                  [overtone "0.10.3"]
                 ])
```

## Overtone REPL

Continuing with
[the Overtone tutorial, we can start a REPL](https://github.com/overtone/overtone/wiki/Getting-Started), define some instruments,
and play them.

```
lein repl
```

You'll see some startup messages

```
```

Then start an internal SoundCollider server. Later you may wish to use an
external server for robustness, to collaborate with others, or to do a performance
connecting to another machine which is actually driving the speakers.

```
user=> (use 'overtone.live)
```

You'll see an inspiring message from Overtone to bless your creative session.

```
SC_AudioDriver: sample rate = 44100.000000, driver's block size = 512
--> Connecting to internal SuperCollider server...
--> Connection established

    _____                 __
   / __  /_  _____  _____/ /_____  ____  ___
  / / / / | / / _ \/ ___/ __/ __ \/ __ \/ _ \
 / /_/ /| |/ /  __/ /  / /_/ /_/ / / / /  __/
 \____/ |___/\___/_/   \__/\____/_/ /_/\___/

   Collaborative Programmable Music. v0.10.3


Hello Ppham, may algorithmic beauty pour forth from your fingertips today.

nil
```

## Defining Instruments and a Sawtooth Wave

We'll use the Overtone keyword `definst` (this is not a Clojure keyword btw)
to define new instruments, then practice playing them and then stopping them.

```
user=> (definst bar [freq 220] (saw freq))
#<instrument: bar>
user=> (bar 110)
#<synth-node[loading]: user/bar 37>
```

That means the instrument has been instantiated as a node with ID 37.
You'll hear the bright, warbling tones of a sawtooth at 220 Hz.

When you're tired of it, you can kill it with 

```
user=> (kill 37)
nil
```

or if you started up multiple `bar` instances, you can kill them all by name.

```
user=> (kill bar)
nil
```

## Overtone Workshop

The following documents steps on executing the [Overtone Workshop](https://github.com/mackenziestarr/overtone-workshop) taught at
Etsy School 2017 by Mackenzie Starr.

Here is a dump of my bash history showing some nonsense I had to do to downgrade
to java 8.

```
./osx-deps.sh
 9305  which java
 9306  java -version
 9307  lein repl
 9308  which java
 9309  brew info java
 9310  brew info jdk
 9311  brew cask info java
 9312  brew cask info java8
 9313  brew tap caskroom/versions
 9314  brew cask info java8
 9315  brew cask install java8
 9316  lein repl
 9317  brew search supercollider
 9318  brew install supercollider
 9319  brew cask install supercollider
```
