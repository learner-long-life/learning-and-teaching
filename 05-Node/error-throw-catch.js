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

b().then( (val) => { console.log(`VAL ${val}`) })
   .catch((err) => { console.error(`ERR ${err}`) })
