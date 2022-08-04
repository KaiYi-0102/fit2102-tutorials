// Surname     | Firstname | Contribution % | Any issues?
// =====================================================
// Low         |  Gabriel  | 25%
// Lee         |  Jun Kang | 25%
// Lee         |  Kai Yi   | 25%
// Khor        |  Kai Wen  | 25%
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
 const myObj = {
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
// map
const addN = (n, array) => array.map(x => operationOnTwoNumbers((y,z) => y+z)(x)(n));

// filter
const getEvens = array => array.filter(n => (n % 2 == 0));

// reduce
const multiplyArray = array => array.reduce((prod, n) => prod *= (n ? n : 1));


/**
 * Exercise 5
 */
function range(n){
    return n?range(n-1).concat(n-1):[]     
}


/**
 * Exercise 6
 */
const Euler1 = _ => range(1000).filter(n => n % 3 === 0 || n % 5 === 0).reduce((sum, n) => sum += n, 0);


/**
 * Exercise 7
 * Kai Yi
 */
const infinite_series_calculator = (accumulate) => (predicate) => (transform) => (n) => {
    
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
const calculatePiTerm = n => n ? (4*(n**2) / (4*(n**2) -1)) : 2;

//this function will return true for any number except 0
const skipZero = number => number ? true : false;

//this function will return the product of 2 number
const productAccumulate = (number1, number2) => number1 ? number1*number2 : number2;

//This function will calculate the approximation of pi using the given pi infinity series
const calculatePi = n => 2*infinite_series_calculator(productAccumulate)(skipZero)(calculatePiTerm)(n);

const pi = calculatePi(100);


/**
 * Exercise 9
 */
const factorial = (n) => n * (n === 1 ? 1 : factorial(n-1));

const calculateETerm = (n) => 2*(n + 1) / factorial(2*n+1);

const sumAccumulate = (m, n) => m + n;

const alwaysTrue = () => true;

const sum_series_calculator = (transform) => (n) => infinite_series_calculator(sumAccumulate)(alwaysTrue)(transform)(n);

const calculateE = (n) => sum_series_calculator(calculateETerm)(n);

const e = calculateE(3);


/**
 * Exercise 10
 */
const calculateXTerm = (n, x) => ((-1)**n)*(x**(2*n+1)) / factorial(2*n+1);

const calculateX = (n) => (x) => sum_series_calculator(n => calculateXTerm(n, x))(n);

const n = calculateX(3)

const sin = (x) => n(x);