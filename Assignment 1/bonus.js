function createCounter(init) {
  let current = init;
  return {
    increment: function() {
      current = current + 1;
      return current;
    },
    decrement: function() {
      current = current - 1;
      return current;
    },
    reset: function() {
      current = init;
      return current;
    }
  };
}
const counter = createCounter(5);
 console.log(counter.increment()); 
  console.log(counter.decrement()); 
   console.log(counter.reset());     
