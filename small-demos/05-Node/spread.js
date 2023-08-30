async function a({x, y}) {
  console.log(`arguments ${JSON.stringify(arguments)}`)
  return b(...arguments)
}

function b({x, y}) {
  // This simply outputs the map { x: 22} and not { '0': { x: 22}}
  console.log(`arguments ${JSON.stringify(...arguments)}`)
  console.log(`x ${x} y ${y}`)
}

a({x: '22'})
// Expect x 22 y undefined
