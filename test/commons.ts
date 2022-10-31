import chai from "chai"
import { BigNumber } from "ethers"
import { ethers } from "hardhat"

export interface HLA {
    A: number[]
    B: number[]
    C: number[]
    DPB: number[]
    DRB: number[]
}

export interface HLAHashed {
    A: string
    B: string
    C: string
    DPB: string
    DRB: string
}

export const bioData: HLA = {
    A: [1, 2, 3],
    B: [1, 2, 3],
    C: [1, 2, 3],
    DPB: [1, 2, 3, 4],
    DRB: [1, 2, 3, 4],
}

export const bioDataHashed: HLAHashed = {
    A: "0x0000000000000000000000000000000000000000000000000000000000000001",
    B: "0x0000000000000000000000000000000000000000000000000000000000000001",
    C: "0x0000000000000000000000000000000000000000000000000000000000000001",
    DPB: "0x0000000000000000000000000000000000000000000000000000000000000001",
    DRB: "0x0000000000000000000000000000000000000000000000000000000000000001",
}

export const biobankAddress = "0x985AC3C3Dbb4135Bea36D643bf93d073A10520bc"
export const amounts = [6, 3, 4, 1, 2]
export const firstNftTokeId = 1
export const DEFAULT_PRICE_PER_CC = 1400

export const LAGEST_UINT = BigNumber.from(
    // This is uint256's max value (2^256 - 1) in hex
    // Fun Fact: There are 64 f's in here.
    // In hexadecimal, each digit can represent 4 bits
    // f is the largest digit in hexadecimal (1111 in binary)
    // 4 + 4 = 8 i.e. two hex digits = 1 byte
    // 64 digits = 32 bytes
    // 32 bytes = 256 bits = uint256
    "0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff"
)

export function web3StringToBytes32(text: string) {
    const utils = ethers.utils
    let result = utils.hexlify(utils.toUtf8Bytes(text))
    while (result.length < 66) {
        result += "0"
    }
    if (result.length !== 66) {
        throw new Error(`invalid web3 implicit bytes32: ${result} for text: ${text}`)
    }
    return result
}

chai.use(function (chai, util) {
    chai.Assertion.addMethod("bioDataEqual", function (expected: HLA) {
        let actual = this._obj as HLA
        new chai.Assertion(actual.A).eql(expected.A)
        new chai.Assertion(actual.B).eql(expected.B)
        new chai.Assertion(actual.C).eql(expected.C)
        new chai.Assertion(actual.DPB).eql(expected.DPB)
        new chai.Assertion(actual.DRB).eql(expected.DRB)
    })
})

declare module Chai {
    interface Assertion {
        bioDataEqual(bioData: any): Assertion
    }
}
