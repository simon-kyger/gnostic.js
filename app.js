const AI = (name)=>{
    console.log(`${name}: Hello, my name is ${name}.  Thank you for creating me!`);
    let ai = {};
    Object.defineProperties(ai, {
        name: {
            value: name,
            writable: false
        },
        learn: {
            value: function(fname, func){
                this[fname] = func;
                console.log(`${this.name} has learned how to ${fname}.`);
                return this;
            },
            writable: false
        }
    });
    return ai;
}

const greet = function() {
    console.log(`${this.name}: Oh hello again!.`);
    return this;
}

const add = function(...args){
    let total = args.reduce((a,b)=> a + b);
    let modargs = args.join('+');
    console.log(`${this.name}: Adding up ${modargs} gives me ${total}.`);
    return this;
}

const teach = function(student) {
    Object.getOwnPropertyNames(this).forEach(i=>{
        if (i !== `name`){
            console.log(`${this.name} is teaching ${student.name} how to ${i}.`)
            student.learn(i, this[i]);
        }
    });
    return this;
}

const forget = function(fn){
    delete this[fn];
    console.log(`${this.name} has forgotten how to ${fn}.`);
}

const test = function(testnum){
    console.log(`${this.name}: Test deletion ${testnum}`);
    return this;
}

//testing general application of knowledge
let betsy = AI('Betsy');
betsy.learn(`greet`, greet).learn(`add`, add).learn(`teach`, teach);
betsy.greet();
betsy.learn(`teach`, teach);
betsy.add(2, 2, 3);
let albert = AI('Albert');
betsy.teach(albert);
albert.add(1,1,2,1,-4);

//testing that learn and name are immutable
albert.learn(`test`, test);
albert.test(1);
albert.learn = function(){ 'this is just a test' }();
albert.test(2);
albert.learn(`deleteme`, function(){ delete this; });
albert.deleteme();
albert.test(3);
albert.learn = null;
albert.test(4);
delete albert.learn;
albert.test(5);
albert.name = 'Al';
albert.test(6);

//testing that a previously learned trait can be removed
console.log(`Albert before a mutable function is removed: \n`, albert)
delete albert.deleteme;
console.log(`Albert after a mutable function (deleteme) is removed: \n`, albert)
albert.learn(`forget`, forget);
albert.forget(`test`);
console.log(albert);