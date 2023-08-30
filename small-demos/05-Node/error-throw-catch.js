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

// We can catch new errors thrown in the returned promise
b().then( (val) => { console.log(`VAL ${val}`) })
   .catch((err) => { console.error(`ERR ${err}`) })

async function c() {
  return new Promise((resolve,reject) => {
    reject('Rejection is in your head')
  })
}

// Can we catch rejections in the returned promise?
c().then( (val) => { console.log(`VAL ${val}`) } )
   .catch((err) => { console.error(`ERR ${err}`) } )
