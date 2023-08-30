Browser Testing Automation with Puppetteer+Mocha+CircleCI
=========================================================

Mocha is a widely used testing framework for NodeJS.
On the command-line, it is well known how to invoke a
process that runs tests for backend code which exit with
a success code to the shell when all tests pass,
and exit with an error code if at least one test fails.

CircleCI is a popular continuous integration platform that
makes it easy to trigger a test suite on your code every
time you commit to Git (GitHub or Bitbucket) in a reproducible
testing environment via Docker images.

However, many Javascript projects requiring webpacking into
browser-friendly bundle, and these in turn produce
dynamically rendered web pages that are difficult to test
in the same automated way as Mocha.

Enter Puppeteer, a NodeJS framework that lets you open a
browser, scrape data from a rendered page (including any
webpack'd bundles you may have), and compare it to
expected values of DOM elements in a standard Mocha test.

Et voila! automated browser testing of your web app using
CircleCI, Mocha, and Puppeteer.

We'll be following this tutorial
https://github.com/entrptaher/playground-mocha-ci-test.git
