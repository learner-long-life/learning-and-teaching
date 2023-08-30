Node Promises
=============

A promise is a deferred execution object that represents an
asynchronous, possibly slow operation.

Promises have been standardized in ES6 as part of the language,
and before that, many proprietary Promise-like constructs were
added in popular libraries such as jQuery.

Basic Promises
==============

Promises are returned from asynchronous function calls instead of
return values. They can be constructed with a callback that
accepts a `resolve` callback to return success values (which are
then handled by chaining `then` calls onto the returned Promise)
and a `reject` callback to return error values (which are then
handled by chaining `catch` calls onto the returned Promise).

Here's the basic form

[](./promise.js)
