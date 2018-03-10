Chords
============

## File Loading

First we'll cover the basic of file loading in Clojure so that we can
save our musical masterpieces in files, and not have to type
them in every time.

Change into the directory of your `lein` project, which has Clojure source
files in a `src` directory.

For example, we can use the [insane-noises]() repo.

```
(load "chords")
```

will load and run a file called `src/chords.clj`
and those definitions will be available under the namespace
`chords`, such as

```
(chords/play-chord (chord :F3 :major))
```

Just the symbol for the function name needs the namespace.
`chord` and the keywords `:F3` and `:major` are imported
into the current namespace by this call
```
(use `overtone.live)
```

