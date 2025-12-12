function findMissing(arr, k) {
  let missingCount = 0;   
  let current = 1;       
  let index = 0;          
  while (true) {
    if (index < arr.length && arr[index] === current) {
      index++;
    } else {
      missingCount++;
      if (missingCount === k) {
        return current;   
      }
    }
    current++; 
  }
}
console.log(findMissing([2,3,4,7,11], 5)); 
console.log(findMissing([1,2,3,4], 2));  