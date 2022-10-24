import chai from "chai";

export interface HLA {
    A: number[]
    B: number[]
    C: number[]
    DPB: number[]
    DRB: number[]
}

export const bioData: HLA = {
    A: [1, 2, 3],
    B: [1, 2, 3],
    C: [1, 2, 3],
    DPB: [1, 2, 3, 4],
    DRB: [1, 2, 3, 4],
}

export const biobankAddress = "0x985AC3C3Dbb4135Bea36D643bf93d073A10520bc"
export const amounts = [6,3,4,1,2]
export const firstNftTokeId = 1


chai.use(function(chai, util) {
    chai.Assertion.addMethod("bioDataEqual", function (expected: HLA) {
        let actual = this._obj as HLA;
        new chai.Assertion(actual.A).eql(expected.A);
        new chai.Assertion(actual.B).eql(expected.B);
        new chai.Assertion(actual.C).eql(expected.C);
        new chai.Assertion(actual.DPB).eql(expected.DPB);
        new chai.Assertion(actual.DRB).eql(expected.DRB);
    });
})

declare module Chai {
    interface Assertion {
        bioDataEqual(bioData: any):Assertion;
    }
}