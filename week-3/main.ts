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
 * Complete the worksheet by entering code in the places marked below...
 *
 * For full instructions and tests open the file worksheetChecklist.html
 * in Chrome browser.  Keep it open side-by-side with your editor window.
 * You will edit this file, save it, compile it, and reload the
 * browser window to run the test.
 */

// Stub value to indicate an implementation
const IMPLEMENT_THIS: any = undefined;

/*****************************************************************
 * Exercise 1
 */

function addStuff(a: number, b: number) {
  return a + b;
}
function numberToString(input: number) {
  return JSON.stringify(input);
}

/**
 * Takes a string and adds "padding" to the left.
 * If 'padding' is a string, then 'padding' is appended to the left side.
 * If 'padding' is a number, then that number of spaces is added to the left side.
 */
function padLeft(value: string, padding: string | number) {
  if (typeof padding === "number") {
    return Array(padding + 1).join(" ") + value;
  }
  if (typeof padding === "string") {
    return padding + value;
  }
  throw new Error(`Expected string or number, got '${padding}'.`);
}

padLeft("Hello world", 4); // returns "    Hello world"

// What's the type of arg0 and arg1?
function curry(f:(x: number, y: number) => number) {
  return function (x: number) {
    return function (y: number) {
      return f(x, y);
    };
  };
}

/*****************************************************************
 * Exercise 2: implement the map function for the cons list below
 */

/**
 * A ConsList is either a function created by cons, or empty (null)
 */
type ConsList<T> = Cons<T> | null;

/**
 * The return type of the cons function, is itself a function
 * which can be given a selector function to pull out either the head or rest
 */
type Cons<T> = (selector: Selector<T>) => T | ConsList<T>;

/**
 * a selector will return either the head or rest
 */
type Selector<T> = (head: T, rest: ConsList<T>) => T | ConsList<T>;

/**
 * cons "constructs" a list node, if no second argument is specified it is the last node in the list
 */
function cons<T>(head: T, rest: ConsList<T>): Cons<T> {
  return (selector: Selector<T>) => selector(head, rest);
}

/**
 * head selector, returns the first element in the list
 * @param list is a Cons (note, not an empty ConsList)
 */
function head<T>(list: Cons<T>): T {
  if (!list) throw new TypeError("list is null");
  return <T>list((head, rest?) => head);
}

/**
 * rest selector, everything but the head
 * @param list is a Cons (note, not an empty ConsList)
 */
function rest<T>(list: Cons<T>): ConsList<T> {
  if (!list) throw new TypeError("list is null");
  return <Cons<T>>list((head, rest?) => rest);
}

/**
 * Use this as an example for other functions!
 * @param f Function to use for each element
 * @param list Cons list
 */
function forEach<T>(f: (_: T) => void, list: ConsList<T>): void {
  if (list) {
    f(head(list));
    forEach(f, rest(list));
  }
}

/**
 * Traverses the ConsList using recursion and calling map on every traverse
 * element until it reaches a null which stands for the end of the Conslist.
 * @param f Function to use for each element
 * @param l Cons list
 */
// const map = (f, list)=> !list ? null : cons(f(head(list)), map(f, rest(list)))
function map<T, V>(f: (_: T) => V, l: ConsList<T>): ConsList<V> {
  return !l ? null : cons<V>(f(head(l)), map(f, rest(l)));
}

/*****************************************************************
 * Exercise 3
 */

// fromArray
// --- construct a cons list from an array
function fromArray<T>(arr: T[]): ConsList<T> {
  return arr.length ? cons<T>(arr[0], fromArray(arr.slice(1))) : null;
}

// reduce
// --- similar to javascript’s Array.reduce
function reduce<T,V>(f: (x: V, y: T) => V, initVal: V, l: ConsList<T>): V {
  return l ? reduce(f, f(initVal, head(l)), rest(l)) : initVal;
}

// reduceRight
// --- executes a reducer function f for each value of an array, from right to left
function reduceRight<T,V>(f: (x: V, y: T) => V, initval: V, l: ConsList<T>): V {
  return l ? f(reduceRight(f, initval, rest(l)), head(l)) : initval;
}

// filter
// --- takes a function and a cons list, and returns another cons list populated 
//     only with those elements of the list for which the function returns true
function filter<T>(f: (x: T) => boolean, l: ConsList<T>): ConsList<T> {
  return l ? (f(head(l)) ? cons<T>(head(l), filter(f, rest(l))) : filter(f, rest(l))) : null;
}

// concat
// --- takes two lists as arguments and returns a new list of their concatenation
function concat<T>(list1: ConsList<T>, list2?: ConsList<T>): ConsList<T> {
  return list1 ? cons(head(list1), concat(rest(list1), list2)) : list2 ? concat(list2) : null;
}

// reverse
// --- 
function reverse<T>(l: ConsList<T>) : ConsList<T> {
  return l ? concat(reverse(rest(l)), cons(head(l), null)) : null;
}

// Example use of reduce
function countLetters(stringArray: string[]): number {
  const list = fromArray(stringArray);
  return reduce((len: number, s: string) => len + s.length, 0, list);
}


/*****************************************************************
 * Exercise 4
 * 
 * Tip: Use the functions in exercise 3!
 */

/**
 * A linked list backed by a ConsList
 */
class List<T> {
  private readonly head: ConsList<T>;
  constructor(list: T[] | ConsList<T>) {
    if (list instanceof Array) {
      this.head = fromArray(list);
    } else {
      // nullish coalescing operator
      // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Nullish_coalescing_operator
      this.head = list ?? null;
    }
  }

  /**
   * create an array containing all the elements of this List
   */
  toArray(): T[] {
    // Getting type errors here?
    // Make sure your type annotation for reduce()
    // in Exercise 3 is correct!
    return reduce((a, t) => [...a, t], <T[]>[], this.head);
  }

  // Add methods here:
  map<V>(f: (_:T) => V): List<V> {
    return new List(map(f, this.head));
  }

  forEach(f: (_:T) => void): List<T> {
    forEach(f, this.head);
    return new List(this.head);
  }

  filter(f: (_:T) => boolean): List<T> {
    return new List(filter(f, this.head));
  }

  reduce<V>(f: (accumulator:V, t:T) => V, initialValue: V): V {
    return reduce(f, initialValue, this.head);
  }

  concat(other: List<T>): List<T> {
    return new List(concat(this.head, other.head));
  }
}


/*****************************************************************
 * Exercise 5
 */
function line(text: string): [number, string] {
  return [0, text];
}

function lineToList(line: [number, string]): List<[number, string]> {
  return new List([line]);
}


/*****************************************************************
 * Exercise 6
 */
type BinaryTree<T> = BinaryTreeNode<T> | undefined;

class BinaryTreeNode<T> {
  constructor(
    public readonly data: T,
    public readonly leftChild?: BinaryTree<T>,
    public readonly rightChild?: BinaryTree<T>
  ) {}
}

// example tree:
const myTree = new BinaryTreeNode(
  1,
  new BinaryTreeNode(2, new BinaryTreeNode(3)),
  new BinaryTreeNode(4)
);

//This function will take a layout and increase the indent of all lines by the given indent. 
const nest = (indent: number, layout: List<[number, string]>): List<[number, string]> => {
  const addIndent = updateFunction(indent)
  return layout.forEach(addIndent)
}

const updateFunction : (i :number) => (x : [number,string]) => [number,string] = i => x => {
  x[0] += i
  return x
}

// *** uncomment the following code once you have implemented List and nest function (above) ***
function prettyPrintBinaryTree<T>(node: BinaryTree<T>): List<[number, string]> {
    if (!node) {
        return new List<[number, string]>([])
    }
    const thisLine = lineToList(line(node.data.toString())),
          leftLines = prettyPrintBinaryTree(node.leftChild),
          rightLines = prettyPrintBinaryTree(node.rightChild);
    return thisLine.concat(nest(1, leftLines.concat(rightLines)))
}

const output = prettyPrintBinaryTree(myTree)
                    .map(aLine => new Array(aLine[0] + 1).join('-') + aLine[1])
                    .reduce((a,b) => a + '\n' + b, '').trim();
console.log(output);


/*****************************************************************
 * Exercise 7: Implement prettyPrintNaryTree, which takes a NaryTree as input
 * and returns a list of the type expected by your nest function
 */

class NaryTree<T> {
  constructor(
    public data: T,
    public children: List<NaryTree<T>> = new List(undefined)
  ) {}
}

// Example tree for you to print:
const naryTree = new NaryTree(
  1,
  new List([
    new NaryTree(2),
    new NaryTree(3, new List([new NaryTree(4)])),
    new NaryTree(5),
  ])
);

// Implement: function prettyPrintNaryTree(...)
function prettyPrintNaryTree<T>(node: NaryTree<T>): List<[number, string]> {
  if(!node){
      return new List<[number, string]>([])
  }
  else{
      const currentparent = lineToList(line(node.data.toString()))
      const children = node.children.map(prettyPrintNaryTree)
      return children.reduce((line, otherChildern) => line.concat(nest(1, otherChildern)), currentparent)
  }
}

// *** uncomment the following code once you have implemented prettyPrintNaryTree (above) ***
const outputNaryTree = prettyPrintNaryTree(naryTree)
                    .map(aLine => new Array(aLine[0] + 1).join('-') + aLine[1])
                    .reduce((a,b) => a + '\n' + b, '').trim();
console.log(outputNaryTree);


/*****************************************************************
 * Exercise 8 (Supplementary)
 */

type jsonTypes =
  | Array<jsonTypes>
  | { [key: string]: jsonTypes }
  | string
  | boolean
  | number
  | null;

const jsonPrettyToDoc: (json: jsonTypes) => List<[number, string]> = (json) => {
  if (Array.isArray(json)) {
    // Handle the Array case.
  } else if (typeof json === "object" && json !== null) {
    // Handle the object case.
    // Hint: use Object.keys(json) to get a list of
    // keys that the object has.
  } else if (typeof json === "string") {
    // Handle string case.
  } else if (typeof json === "number") {
    // Handle number
  } else if (typeof json === "boolean") {
    // Handle the boolean case
  } else if (json === null) {
    // Handle the null case
  }

  // Default case to fall back on.
  return new List<[number, string]>([]);
};

// *** uncomment the following code once you are ready to test your implemented jsonPrettyToDoc ***
// const json = {
//     unit: "FIT2102",
//     year: 2021,
//     semester: "S2",
//     active: true,
//     assessments: {"week1": null as null, "week2": "Tutorial 1 Exercise", "week3": "Tutorial 2 Exercise"},
//     languages: ["Javascript", "Typescript", "Haskell", "Minizinc"]
// }
//
// function lineIndented(aLine: [number, string]): string {
//     return new Array(aLine[0] + 1).join('    ') + aLine[1];
// }
//
// function appendLine(acc: string, nextLine: string): string {
//     return nextLine.slice(-1) === "," ? acc + nextLine.trim() :
//            acc.slice(-1) === ":"      ? acc + " " + nextLine.trim() :
//            acc + '\n' + nextLine;
// }
//
// console.log(jsonPrettyToDoc(json)
//               .map(lineIndented)
//               .reduce(appendLine, '').trim());

// *** This is what it should look like in the console ***
//
// {
//     unit: FIT2102,
//     year: 2021,
//     semester: S2,
//     active: true,
//     assessments: {
//         week1: null,
//         week2: Tutorial 1 Exercise,
//         week3: Tutorial 2 Exercise
//     },
//     languages: [
//         Javascript,
//         Typescript,
//         Haskell,
//         Minizinc
//     ]
// }
