// Surname     | Firstname | Contribution % | Any issues?
// =====================================================
// Low         |  Gabriel  | 25%
// Lee         |  Jun Kang | 25%
// Lee         |  Kai Yi   | 25%
// Person 4..  |           | 25%
//
// complete Worksheet 2 by entering code in the places marked below...
//
// For full instructions and tests open the file worksheetChecklist.html
// in Chrome browser.  Keep it open side-by-side with your editor window.
// You will edit this file (main.js), save it, and reload the
// browser window to run the test.

/**
 * Exercise 1
 * JK 
 */
 const myObj={
    aProperty: "group1",
    anotherProperty: 1
}
/**
 * Exercise 2
 * JK
 */
const operationOnTwoNumbers = f => x => y => f(x,y);
/**
 * Exercise 3
 * JK
 */
const callEach = array => array.forEach(f => f());
/**
 * Exercise 4
 */

/**
 * Exercise 5
 */
function range(n){
    return n?range(n-1).concat(n-1):[]     
}
/**
 * Exercise 6
 */

/**
 * Exercise 7
 * Kai Yi
 */
const infinite_series_calculator = (accumulate) => (predicate) => (transform) => n => {

    
    const newRange = range(n) // create a list of number from 0 to n-1

    //filter first
    const filteredRange = newRange.filter(predicate)

    //transform
    const transformedRange = filteredRange.map(transform)
    
    //accumulate the result by sum of product
    return transformedRange.reduce(accumulate, 0)
}


/**
 * Exercise 8
 * Kai Yi
 */


function calculatePiTerm(n){
    //this function will calculate the nth term of the pi approximation series
    
}

function skipZero(number){
    //this function will return true for any number except 0
    return number ? true : false;
}

function productAccumulate(number1, number2){
    //this function will return the product of 2 number
    return number1 * number2
}

function calculatePi(n){
    
}


/**
 * Exercise 9
 */
 function factorial(n) {
    return n * (n === 1 ? 1 : factorial(n-1));
}

function calculateETerm(n) {
    return (2*(n + 1) / factorial(2*n + 1));
}

function sumAccumulate(m, n) {
    return m + n;
}

function alwaysTrue() {
    return true;
}

const sum_series_calculator = (transform) => (n) => {

}

function calculateE(n) {

}


/**
 * Exercise 10
 */
 function calculateNTerm(n) {
    return (((-1^n)*x^(2*n + 1))/factorial(2*n + 1));
}

function sin(x) {
    
}
