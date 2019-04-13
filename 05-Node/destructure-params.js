class FirstClass {

  constructor({a, b}) {
    this.a = a
    this.b = b
    console.log(arguments) 
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
