// 1. What is the difference between forEach and for...of? When would you use each?

// forEach  =>   when you  want to process all items in an array.
// use only on arrays.
// Takes a callback function for each element.
// Can't use break or continue to stop or skip .


// for...of  =>  when you  need to stop early, skip items, or work with different iterable types.
// use on arrays, strings, maps, sets.
// Uses a loop structure.
// can use break and continue.





// 2. What is hoisting and what is the Temporal Dead Zone (TDZ)? Explain with examples. 

// Hoisting : moves variable and function declarations to the top of their scope before code execution.
// EX:
// sayHi();
// function sayHi() {
//   console.log("Hello!");
// }


// " TDZ " : The time between the start of a block and the point where a let or const variable is declared.
// Only happens with let and const .
// EX:
// {
//   console.log(x); //  x is in TDZ
//   let x = 5;      // TDZ ends here
// }





// 3. What are the main differences between == and ===?

// " == " → Use only if you want type conversion , compare betwwen values only .


// " === " → Use most of the time, safer because it avoids unexpected results , compare betwwen values and type . 





// 4. Explain how try-catch works and why it is important in async operations. 

// try-catch ==> A way to handle errors in JavaScript without stopping the program.
// "try" ==> code that might throw an error
// "catch" ==> code that runs if an error occurs
// important in async operations:
// Async code may fail (network issues, invalid data) Without try-catch, errors can crash the app, Using try-catch helps  handle errors and show messages instead of breaking code.





// 5. What’s the difference between type conversion and coercion? Provide examples of each. 

// 1. Type Conversion :  changing a value from one type to another.
// Ex:
// let num = "8500";
// let X = Number(num);  
// console.log(x);       


// 2. Type Coercion : JavaScript automatically converts types when needed.
// Ex:
// let sum = "5" + 2;  
// console.log(sum);  
// let value = "10" - 3;  
// console.log(value);    
