declare module Chai {

    interface Assertion {
        bioDataEqual(bioData: any):Assertion;
    }
}