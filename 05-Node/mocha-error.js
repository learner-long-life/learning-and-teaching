const assert = require('assert')

describe('error throw and catch', () => {

async function a() {
  return new Promise((resolve, reject) => {
    resolve(22)
  })
}

async function b() {
  const b = await a()
  if (b === 22) {
    throw new Error('We got 22!')
  }
}

async function b() {
  const b = await a()
  if (b === 22) {
    throw new Error('We got 22!')
  }
}

  it( "handle error, should succeed test", async () => {
    // We can catch new errors thrown in the returned promise
    return b().then( (val) => { console.log(`Shouldn't get here ${val}`); assert.fail(val) })
       .catch((err) => { console.error(`ERR ${err}`); assert(err) })
  })

async function c() {
  return new Promise((resolve,reject) => {
    reject('Rejection is in your head')
  })
}

  it( "unhandled error should fail test", async () => {
    // Can we catch rejections in the returned promise?
    return c().then( (val) => { console.log(`VAL ${val}`) } )
       .catch((err) => { console.error(`ERR ${err}`); assert.fail(err) } )
  })

})
