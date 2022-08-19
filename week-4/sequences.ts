/**
 * Surname     | Firstname | Contribution % | Any issues?
 * =====================================================
 * Lee         | Jun Kang  | 25%            |
 * Lee         | Kai Yi    | 25%            |
 * Khor        | Kai Wen   | 25%            |
 * Low         | Gabriel   | 25%            |
 *
 * Please do not hesitate to contact your tutors if there are
 * issues that you cannot resolve within the group.
 *
 * Complete Worksheet 4 by entering code in the places marked below...
 *
 * For full instructions and tests open the file worksheetChecklist.html
 * in Chrome browser.  Keep it open side-by-side with your editor window.
 * You will edit this file (main.ts), save it, build it, and reload the
 * browser window to run the test.
 */

/**
 * Replace references to IMPLEMENT_THIS with your code!
 */
const IMPLEMENT_THIS: any = undefined;

/**
 *  Exercise 1 - General Purpose infinite sequence function
 */

interface LazySequence<T> {
  value: T;
  next(): LazySequence<T>;
}

// Implement the function:

//note, return a function, such that the returned function will return the object of type LazySequence<T>
//Note that next is a function that will return the _next function but with the transformed value.
function initSequence<T>(transform: (value: T) => T): (initialValue: T) => LazySequence<T> {
  return function _next(value: T): LazySequence<T>{
    return {
      value : value,
      next : () => _next(transform(value))
    }
  }
}

/**
 *  Exercise 2 - map, filter, take, reduce
 */

//map will returns a new sequence that has undergone the transformation by the input function
function map<T, V>(func: (v: T) => V, seq: LazySequence<T>): LazySequence<V> {
  return {
    value : func(seq.value),
    next : () => map<T, V>(func, seq.next())
  } 
}

//This function will return a new sequence that is filtered by the input function.
function filter<T>(func: (v: T) => boolean, seq: LazySequence<T>): LazySequence<T> {
  return func(seq.value)? { //does this value pass the filter function? If yes, we keep it.
    value : seq.value,
    next : () => filter<T>(func, seq.next())
  } : filter<T>(func, seq.next()) //else, we continue to filter with the next item
}

/**
 * Creates a sequence of finite length (terminated by undefined) from a longer or infinite sequence.
 * Take returns a sequence that contains the specified number of elements of the sequence, and then 'undefined'.
 * That is, the next attribute of the last element in the returned sequence, will be a function that returns 'undefined'.
 *
 * @param n number of elements to return before returning undefined
 * @param seq the sequence
 */
function take<T>(n: number, seq: LazySequence<T>): LazySequence<T> | undefined {
  if (n <= 0) {
    return undefined;
  }

  return {
    value: seq.value,
    /**
     * We have to cast the type here due to the limitations of the TypeScript type system.
     * If you have to type cast something, make sure to justify it in the comments.
     */
    next: () => take(n - 1, seq.next()) as LazySequence<T>,
  };
}

/**
 * reduce a finite sequence to a value using the specified aggregation function
 * @param func aggregation function
 * @param seq either a sequence or undefined if we have reached the end of the sequence
 * @param start starting value of the reduction past as first parameter to first call of func
 */
function reduce<T, V>(func: (_: V, x: T) => V, seq: LazySequence<T> | undefined, start: V): V {
  //The ternary function is to check whether we already reach the end of the sequence.
  //Then the idea is update the start parameter with the aggregation function and continue to recurse with the next sequence value
  return seq ? reduce<T,V>(func, seq.next(), func(start,seq.value)): start
}

//This function will apply the aggregator function from the end of the sequence instead from the start of the sequence.
//The idea is to recurse all the way to the end of the sequence (reach undefined value), which we will return the start value, and at each call apply the aggregator function to seq[n] and seq[n-1]
function reduceRight<T, V>(f: (_: V, x: T) => V, seq: LazySequence<T> | undefined, start: V): V {
  return seq ? f(reduceRight<T,V>(f, seq.next(), start), seq.value) : start
}

/**
 *  Exercise 3 - Reduce Practice
 */

function maxNumber(lazyList: LazySequence<number>): number {
  // ******** YOUR CODE HERE ********
  // Use __only__ reduce on the
  // lazyList passed in. The lazyList
  // will terminate so don't use `take`
  // inside this function body.
  return reduce((x,y)=> x>y ? x : y, lazyList, 0);
}

function lengthOfSequence(lazyList: LazySequence<any>): number {
  // ******** YOUR CODE HERE ********
  // Again only use reduce and don't
  // use `take` inside this function.
  return reduce((x,_)=>x+1,lazyList,0);
}

function toArray<T>(seq: LazySequence<T>): T[] {
  // ******** YOUR CODE HERE ********
  // Again only use reduce and don't
  // use `take` inside this function.
  return reduce((x,y)=>x.concat(y),seq,[]);
}

/**
 *  Exercise 4 - Lazy Pi Approximations
 */

function exercise4Solution(seriesLength: number): number {
  // Your solution using lazy lists.
  // Use `take` to only take the right amount of the infinite list.
  return reduce((x,y) => x + 1/y, take(seriesLength, initSequence((x) => x>0 ? -(x+2) : -x+2)(1)), 0);
}