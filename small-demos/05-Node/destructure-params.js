class FirstClass {

  constructor({a, b}) {
    this.a = a
    this.b = b
    console.log(JSON.stringify(arguments)) 
    this.func(...arguments)
  }

  func({a, b}) {
    console.log(arguments) 
    console.log(`A ${a}`) 
    console.log(`B ${b}`) 
  }
  
}

const x = new FirstClass({a: 11, b: 22})

console.log(x)

// Destructuring parameters with/without arrow notation
const first = ({c, d}) => {
  console.log(JSON.stringify(arguments))
  console.log(`c ${c}`)
  console.log(`d ${d}`)
  return {c:c, d:d}
}

const second = function({c, d}) {
  console.log(JSON.stringify(arguments))
  return first(...arguments)
}

first({c: 11, d: 22})
let c, d
// You can remap and declare things in the local scope
// from a returned map
let {c: e, d: f} = second({c: 33, d: 44})
console.log('e', e, 'f', f, 'c', c, 'd', d)
