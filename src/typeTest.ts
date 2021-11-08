// https://www.logicbig.com/tutorials/misc/typescript/basic-types.html

class Person {
  constructor(public name: string) {}
}

interface Loggable {
  log(name: string): void;
}

class ConsoleLogger implements Loggable {
  log(name: string) {
    console.log(`Hello, I'm ${name}.`);
  }
}

// 두 객체를 받아 하나로 합칩니다.
function extend<First extends {}, Second extends {}>(
  first: First,
  second: Second
): First & Second {
  const result: Partial<First & Second> = {};
  for (const prop in first) {
    if (first.hasOwnProperty(prop)) {
      (result as First)[prop] = first[prop];
    }
  }
  for (const prop in second) {
    if (second.hasOwnProperty(prop)) {
      (result as Second)[prop] = second[prop];
    }
  }
  return result as First & Second;
}

const jim: Person & ConsoleLogger = extend(new Person("Jim"), ConsoleLogger.prototype);
jim.log(jim.name);

let myAdd: (baseValue: number, increment: number) => number =
    (x, y):number => { return x + y; };

let myIdentity: <T>(arg: T) => T = <T>(arg: T): T => {
  return arg;
};


function loggingIdentity<T>(arg: T[]): T[] {
  console.log(arg.length); // 배열은 .length를 가지고 있습니다. 따라서 오류는 없습니다.
  return arg;
}

loggingIdentity([1, '1', {}])

function identity<T>(arg: T): T {
  return arg;
}

let myIdentityObj: { <T>(arg: T): T } = identity;
let myIdentityFnc: <T>(arg: T) => T = identity;

myIdentityObj(1)


interface GenericIdentityFn<T> {
  (arg: T): T;
}
let myIdentityI: GenericIdentityFn<number> = identity;


class GenericNumber<T> {
    zeroValue!: T;
    add!: (x: T, y: T) => T;
}

let myGenericNumber = new GenericNumber<number>();
myGenericNumber.zeroValue = 0;
myGenericNumber.add = function(x, y) { return x + y; };


interface Lengthwise {
  length: number;
}
interface GenericIdentityFnExt<T extends Lengthwise> {
  (arg: T): T;
}

function loggingIdentityExt<T extends Lengthwise>(arg: T): T {
  console.log(arg.length); 
  return arg;
}

let test:GenericIdentityFnExt<number[]> = loggingIdentityExt


interface Bird {
  fly(): void;
  layEggs(): void;
}

interface Fish {
  swim(): void;
  layEggs(): void;
}

declare function getSmallPet(): Fish | Bird;

let pet = getSmallPet();
pet.layEggs();

if ((pet as Fish).swim) 
  (pet as Fish).swim();


type Alias = { num: number }
interface Interface {
    num: number;
}
declare function aliased(arg: Alias): Alias;
declare function interfaced(arg: Interface): Interface;


function pluck<T, K extends keyof T>(o: T, propertyNames: K[]): T[K][] {
  return propertyNames.map(n => o[n]);
}

interface Car {
    manufacturer: string;
    model: string;
    year: number;
}
let taxi: Car = {
    manufacturer: 'Toyota',
    model: 'Camry',
    year: 2014
};

// Manufacturer과 model은 둘 다 문자열 타입입니다,
// 그래서 둘 다 타이핑된 문자열 배열로 끌어낼 수 있습니다.
let makeAndModel: string[] = pluck(taxi, ['manufacturer', 'model']);
console.log('makeAndModel', makeAndModel)

interface IdxObj<T> {
  [key:string|number]:T
}
const myObj:IdxObj<string> = {
  a: 'b'
}
let keys: keyof IdxObj<number>; 
let value: IdxObj<number>['foo'];


let x: any = "hi there";
let s = (x as string).substring(0,3);


type Tkeys = 'option1' | 'option2';
type Flags = { [K in Tkeys]: boolean };
const fTest:Flags = {
 'option1': false,
 'option2': true
}


type Language = 'EN' | 'ES'; 
const userLanguage: Language = 'EN';
const preferences = { language: userLanguage, theme: 'light' };

type Preferences = typeof preferences; // type '{language: 'EN''; theme: string; }'
type PreferenceKeys = keyof typeof preferences; // type '"language" | "theme"'


interface Pair<F, S> {
  first: F;
  second: S;
}

let p : Pair<String, number> = {first: "10K", second: 1000};
let q : Pair<number, string> = {first: 1000, second: "10K"};


interface Pair<F, S> {
  first: F;
  second: S;
}

interface States<F, S> {
  [state: string]: Pair<F, S>;
}

let ss: States<number, boolean> =
  {'enabled': {first: 1, second: true}, 'maximized': {first: 2, second: false}};


interface Shape {
    draw() : void;
}

//applying constraint on Type Parameter S to be of only Shape type
function drawShapes<S extends Shape>(shapes: S[]): void{
     shapes.forEach(shape => shape.draw());
}

class Circle implements Shape{
    draw() {
        console.log(`drawing Circle`)
    }
}

class Rectangle implements Shape{
    draw() {
        console.log(`drawing Rectangle`)
    }
}

let circle = new Circle();
let rectangle = new Rectangle();
drawShapes([circle, rectangle]);


// Generic constraint on constructor function
function createInstance<T>(t: new () => T): T {
  return new t();
}

class Test {
  x: number = 4;
}

let testC: Test = createInstance(Test);


// A constructor with parameters
function createInstance2<T>(t: new(...constructorArgs:any[]) => T, ...args: any[]): T {
  return new t(args);
}

class Test2 {
  private x: number;

  constructor(x: number) {
    this.x = x;
  }
}

let test2: Test2 = createInstance2(Test2, 5);

// generics for the constructor type
function createInstance3<R, T extends { new(...constructorArgs: any[]): R }>(constructor: T, ...args: any[]): R {
	return new constructor(args);
}

class Test3 {
	private x: number;

	constructor(x: number) {
		this.x = x;
	}

}

let test3: Test3 = createInstance3(Test3, 6);


type Entity<T> = { id: number } & T;

interface Item {
    name: string;
    price: number;
}

let itemEntity: Entity<Item> = {id: 1, name: "Laptop", price: 150};