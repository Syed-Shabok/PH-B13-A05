# GitHub Issues Tracker

<p align="left">
  <a href="https://syed-shabok.github.io/PH-B13-A05/" target="_blank">
    <img src="https://img.shields.io/badge/🚀%20Live%20Demo-Click%20Here-success?style=for-the-badge">
  </a>
</p>


# Assignment 5 Q&A:

**1️⃣ What is the difference between var, let, and const?**

Answer: Declaring a variable using `var` makes it function scoped, which lets us access it from anywhere in the function. Using `let` and `const` makes the variables accessible only within the `{}` braces in which they were declared (i.e. they are block scope). 

`var` variables get hoisted and are initialized as undefined (if user does not initialize themselves). `let` and `const` also get hoisted within their block, from the start of the block until their declaration but are not initialized to undefined. 

`var` can be both reassigned and redeclared, `let` can only be reassigned but not redeclared. `const` can neither be reassigned nor redeclared. 

**2️⃣ What is the spread operator (...)?**

Answer The spread `(…)` is a JS feature that expands or spreads the elements of an array or properties of an object into individual values. It is  mainly used for combining or copying arrays or objects without changing the original array.  

```jsx
const arr1 = [1, 2, 3];
const arr2 = [...arr1, 4, 5];

console.log(arr2); // [1, 2, 3, 4, 5]
```

**3️⃣ What is the difference between map(), filter(), and forEach()?**

Answer: 

- `map()`: We use this when we can to apply some changes to each element of an array and make a new array with the edited elements. The original array remains unchanged.
    
    ```jsx
    const numbers = [1, 2, 3, 4];
    const doubled = numbers.map(n => n * 2); 
    console.log(doubled); // [2,4,6,8]
    ```
    
- `filter()`: We use this when we want to copy certain elements from an array that meet certain conditions and create a new array with those particular elements.
    
    ```jsx
    const numbers = [1, 2, 3, 4];
    const even = numbers.filter(n => n % 2 === 0);
    console.log(even);// [2,4]
    ```
    
- `forEach()`: It is mainly used for traversing or iterating though arrays and perform certain actions for each element of that array.  It does not return a new array. It is mainly used for logging and can also update the array elements.
    
    ```jsx
    const numbers = [1, 2, 3, 4];
    numbers.forEach(n => console.log(n)); // prints each number: [1, 2, 3, 4]
    ```
    

**4️⃣ What is an arrow function?**

Answer: Arrow functions are basically a more convenient shorter form of normal functions. It uses the `⇒` syntax which lets programmers write cleaner and less amount of code.  Arrow functions are  slightly different than normal function, where they do not create their own `this` context, instead they inherit it from their surrounding lexical scope.  

- Normal Functions:  The function inside `setTimeout` is a regular function, so this refers to the global scope.
    
    ```jsx
    const person = {
      name: "John",
      greet: function () {
        setTimeout(function () {
          console.log("Hello, " + this.name);
        }, 1000);
      }
    };
    
    person.greet(); // Hello, undefined
    ```
    
- Arrow Functions: arrow functions do not create their own `this`. It inherits it from the its surrounding scope.
    
    ```jsx
    	const person = {
      name: "John",
      greet: function () {
        setTimeout(() => {
          console.log("Hello, " + this.name);
        }, 1000);
      }
    };
    
    person.greet(); // Hello, John
    ```
    

**5️⃣ What are template literals?**

Answer: They are another way of creating string in JS using backticks (```) instead of the usual quotation marks. They allow us to insert variables or expressions within the string using  `${}`, which is known as string interpolation. They also allow us to declare multiline string without using the`\n`.

```jsx
const a = 5;
const b = 3;

console.log(`The sum is ${a + b}`); // The sum is 8
```
