class FirstClass {

  constructor({a, b}) {
    this.a = a;
    this.b = b;
  }
  
}

const x = new FirstClass({a: 11, b: 22})
console.log(x)
