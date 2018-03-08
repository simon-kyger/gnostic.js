const AI = (name)=>{
    console.log(`${name}: Hello, my name is ${name}.  Thank you for creating me!`);
    //mutable states
    let ret = {
        name: name
    };
    //immutable states
    Object.defineProperty(ret, 'learn',{
        value: function(fname, func){
            this[fname] = func;
            console.log(`${this.name} has learned how to ${fname}.`)
            return this;
        },
        writable: false
    })
    return ret;
}
const greet = function() {
    console.log(`${this.name}: Oh hello again!.`);
    return this;
}
const add = function(...args){
    let total = args.reduce((a, b)=> { return a + b; });
    console.log(`${this.name}: Adding up ${args} gives me ${total}.`);
    return this;
}
const teach = function(student) {
    let oname = student.name;
    Object.getOwnPropertyNames(this).forEach(i=>{
        if (i !== `name`){
            student.learn(i, this[i])
        }
    });
    return this;
}

const test = function(){
    console.log(`${this.name}: Just making sure you couldnt stop me from learning.`);
    return this;
}

//testing the api

let betsy = AI('Betsy');
betsy.learn(`greet`, greet).learn(`add`, add).learn(`teach`, teach);
betsy.greet();
betsy.learn(`teach`, teach);
betsy.add(2, 2, 3);
let albert = AI('Albert');
betsy.teach(albert)
albert.greet();
albert.add(1,1,2,1,4)
albert.learn = null; //testing that learn is unable to be reassigned
albert.learn(`test`, test);
albert.test();