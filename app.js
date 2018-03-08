const AI = (name)=>{
    console.log(`Hello, my name is ${name}`);
    //mutable states
    let ret = {
        name: name
    };
    //immutable states
    Object.defineProperty(ret, 'learn',{
        value: function(fname, func){
            this[fname] = func;
            console.log(`Thanks for teaching me how to ${fname}!`)
            return this;
        },
        writable: false
    })
    return ret;
}
const greet = function() {
    console.log(`Hello my name is ${this.name}.`);
}
const add = function(...args){
    let total = args.reduce((a, b)=> { return a + b; });
    console.log(`Adding up ${args} gives me ${total}.`);
}
const teach = function(student) {
    let oname = student.name;
    Object.getOwnPropertyNames(this).forEach(i=>student.learn(i, this[i]));
    student.name = oname;
}

const test = function(){
    console.log(`This is ${this.name} again, just making sure you couldnt stop me from learning.`);
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