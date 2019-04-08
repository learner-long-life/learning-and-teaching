async function a() {
  let randNum = Math.random()
  return new Promise((resolve, reject) => {
    if (randNum > 0.5) {
      resolve(randNum)
    } else {
      reject(randNum)
    }
  })
}

a()
  .then((val) => { console.log(`Success ${val}`) })
  .catch((e)  => { console.error(`Error ${e}`) })
