// // Q1
// let x = "123";       
// let num = Number(x);  
// let sum = num + 7;   
// console.log(sum);    





// // Q2
// let x = 0;  
// if ( !x ) {
//     console.log("Invalid");
// } else {
//     console.log("Valid");
// }





// // Q3
// for (let i = 1; i <= 10; i++) {
//     if (i % 2 === 0) {
//         continue; 
//     }
//     console.log(i);
// }





// // Q4
// let numbers = [1, 2, 3, 4, 5]; 
// let evenNumbers = numbers.filter(function(num) {
//     return num % 2 === 0; 
// });
// console.log(evenNumbers);





// // Q5
// let array1 = [1, 2, 3];
// let array2 = [4, 5, 6];
// let mergedArray = [...array1, ...array2];
// console.log(mergedArray);





// // Q6
// let dayNum = 2; 
// let dayName;
// switch (dayNum) {
//     case 1:
//         dayName = "Sunday";
//         break;
//     case 2:
//         dayName = "Monday";
//         break;
//     case 3:
//         dayName = "Tuesday";
//         break;
//     case 4:
//         dayName = "Wednesday";
//         break;
//     case 5:
//         dayName = "Thursday";
//         break;
//     case 6:
//         dayName = "Friday";
//         break;
//     case 7:
//         dayName = "Saturday";
//         break;
//     default:
//         dayName = "Invalid day number";
// }
// console.log(dayName);





// // Q7
// let x = ["a", "ab", "abc"]; 
// let length = x.map(function(x) {
//     return x.length; 
// });
// console.log(length);





// // Q8
// let x = 15; 
// function checkDivisible(x) {
//     if (x % 3 === 0 && x % 5 === 0) {
//         return "Divisible by both";
//     } else {
//         return "Not divisible by both";
//     }
// } 
// console.log(checkDivisible(x));





// // Q9
// let num = 5;
// let square = (num) => {
//     return num * num;
// }; 
// console.log(square(num));





// // Q10
// let person = { name: 'John', age: 25 };

// function formatPerson(obj) {
//     let { name, age } = obj;
//     return `${name} is ${age} years old`;
// }
// console.log(formatPerson(person));





// // Q11
// function sumAll(...numbers) {
//     let sum = 0;
//     for (let num of numbers) {
//         sum += num; 
//     }
//     return sum;
// }
// console.log(sumAll(1, 2, 3, 4, 5));





// // Q12
// function delayedSuccess() {
//     return new Promise((resolve, reject) => {
//         setTimeout(() => {
//             resolve("Success"); 
//         }, 3000); 
//     });
// }
// delayedSuccess().then((message) => {
//     console.log(message);
// });





// // Q13
// function findLargest(numbers) {
//     let largest = numbers[0]; 
//     for (let num of numbers) {
//         if (num > largest) {
//             largest = num; 
//         }
//     }
//     return largest;
// }
// let x = [1, 3, 7, 2, 4]; 
// console.log(findLargest(x));





// // Q14
// let person = { name: "John", age: 30 };
// function getKeys(obj) {
//     return Object.keys(obj); 
// }
// console.log(getKeys(person));





// // Q15
// function splitIntoWords(x) {
//     return x.split(" "); 
// }
// let sentence = "The quick brown fox"; 
// console.log(splitIntoWords(sentence));
