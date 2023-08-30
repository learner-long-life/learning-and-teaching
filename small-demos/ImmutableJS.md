ImmutableJS
===========

ImmutableJS is an immutable data framework for Node and Javascript released by Facebook.
It complements, but can be used independently of, functional programming and reactive web frameworks
like React and Redux.
It's inspired by ideas from Clojure and Scala.

However, our main purpose in using it is to use functional programming paradigms mixed into an otherwise
workhorse imperative language/framework such as NodeJS.

In each of the sections below we'll describe a different use case of this functional style that's proven
useful in our equity and DAO framework over Secure Scuttlebutt.

# For Each

This is the most similar similar to an imperative for loop, and can be used to update
global state or populate a data structure in the outer scope, based on the items in your immutable
collection. Often it is a sign that you could "functionalize" your imperative program further,
but we're not here to be dogmatic; we want to get stuff done.

# Reduce

A common example of a reduction is to keep a rolling sum of numbers in a list
(the order doesn't matter in this case). The imperative way of doing this involves
looping over a collection, but usually stopping one less from the end or beginning
because a reduction from 2 items to one only needs to run `n-1` times.

The `reduce` method is available to any Collection.
For `Seq`'s (which are not growable) and `List`'s
(which are growable) the reduction proceeds in order from the second element (passing
in the first element as a "pre-sum"). For `Set`'s, the reduction occurs in some
implementation-dependent order which should not be relied upon.

```
> a.reduce((sum, val, key, iter) => { console.log(`Sum: ${sum}, Val: ${val}, Key: ${key}, Iter: ${iter}`); return sum+val })
Sum: 1, Val: 2, Key: 1, Iter: Seq [ 1, 2, 3 ]
Sum: 3, Val: 3, Key: 2, Iter: Seq [ 1, 2, 3 ]
```

```
> b.reduce((sum, val, key, iter) => { console.log(`Sum: ${sum}, Val: ${val}, Key: ${key}, Iter: ${iter}`); return sum+val })
Sum: 2, Val: 3, Key: 1, Iter: Seq [ 2, 3, 4, 5 ]
Sum: 5, Val: 4, Key: 2, Iter: Seq [ 2, 3, 4, 5 ]
Sum: 9, Val: 5, Key: 3, Iter: Seq [ 2, 3, 4, 5 ]
```

You can use `reduce` to keep a running updated `Map` summing up currency values, for example.

Assume you create a list of records (themselves `Map`s)
```
> a = Map({amountCurrency: 'USD', amountNumber: 123.45})
Map {
  size: 2,
  _root:                                                                                            ArrayMapNode { ownerID: OwnerID {}, entries: [ [Array], [Array] ] },                            __ownerID: undefined,
  __hash: undefined,
  __altered: false }
> b = Map({amountCurrency: 'USD', amountNumber: 77.43})
Map {
  size: 2,
  _root:
   ArrayMapNode { ownerID: OwnerID {}, entries: [ [Array], [Array] ] },
  __ownerID: undefined,
  __hash: undefined,
  __altered: false }
> c = Map({amountCurrency: "ETH", amountNumber: 111.23})
Map {
  size: 2,
  _root:
   ArrayMapNode { ownerID: OwnerID {}, entries: [ [Array], [Array] ] },
  __ownerID: undefined,
  __hash: undefined,
  __altered: false }
> list = Seq([a,b,c])
```

Then you can sum up by currency using `reduce` and a running `Map` as follows:
```
y = list.reduce((sum, val, key) => {
  let txCurrency = val.get('amountCurrency'), txAmount = val.get('amountNumber');
  console.log(txCurrency + " " + txAmount);
  return sum.set(txCurrency, txAmo$nt+(sum.get(txCurrency) ? sum.get(txCurrency) : 0)); }, new Map())
USD 123.45
USD 77.43
ETH 111.23
Map {
  size: 2,
  _root:
   ArrayMapNode { ownerID: undefined, entries: [ [Array], [Array] ] },
  __ownerID: undefined,
  __hash: undefined,
  __altered: false }
> JSON.stringify(y)
'{"USD":200.88,"ETH":111.23}'
```
