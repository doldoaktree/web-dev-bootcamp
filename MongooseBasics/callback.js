// callback
const callLater = (toCall) => {
    setTimeout(() => {
        toCall(10);
    }, 5000);
}


callLater(() => {
    console.log('this was called later using a call back');
});




// promise 
const waiter = new Promise((resolve)=> {
 setTimeout(() => {
     resolve(1);
 }, 6000);
})

const waiter2 = new Promise((resolve)=> {
    setTimeout(() => {
        resolve(2);
    }, 6000);
   })

// then promise
waiter.then((value) => {
    return waiter2.then((value2) =>  value + value2)
})
.then((sum) => console.log(sum));

waiter2.then((value) => console.log(`this was called later using a promise ${value}`))


// await promise
const vaL1 =  await waiter;
const vaL2 =  await waiter2;
console.log(vaL1 + vaL2);



const a = doSomething();


let  b  = null;

callLater((value) => {
    b = value;
});

callLater((value) => {
    b = value;
});

console.log(b);

const d = new Promise((resolve) => { 
    callLater(resolve);
})

d.then
await d