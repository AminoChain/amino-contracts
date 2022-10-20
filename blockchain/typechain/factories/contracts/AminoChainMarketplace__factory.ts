/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import {
  Signer,
  utils,
  Contract,
  ContractFactory,
  BigNumberish,
  Overrides,
} from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../common";
import type {
  AminoChainMarketplace,
  AminoChainMarketplaceInterface,
} from "../../contracts/AminoChainMarketplace";

const _abi = [
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_donorIncentiveRate",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "_usdc",
        type: "address",
      },
      {
        internalType: "address",
        name: "_tokenizedStemCells",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "authenticator",
        type: "address",
      },
    ],
    name: "authenticatorAddressSet",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "seller",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "listingCanceled",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "newIncentiveRate",
        type: "uint256",
      },
    ],
    name: "newDonorIncentiveRate",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "seller",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "price",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "address",
        name: "donor",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "bioBank",
        type: "address",
      },
    ],
    name: "newListing",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "oldOwner",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "ownershipTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "seller",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "address",
        name: "buyer",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "salePrice",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "protocolFee",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "address",
        name: "donor",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "donorIncentive",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "address",
        name: "bioBank",
        type: "address",
      },
    ],
    name: "sale",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "stemCells",
        type: "address",
      },
    ],
    name: "stemCellsAddressSet",
    type: "event",
  },
  {
    inputs: [],
    name: "authenticator",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "buyItem",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "cancelListing",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "donorIncentiveRate",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "getListingData",
    outputs: [
      {
        components: [
          {
            internalType: "address",
            name: "seller",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "tokenId",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "price",
            type: "uint256",
          },
          {
            internalType: "address",
            name: "donor",
            type: "address",
          },
          {
            internalType: "address",
            name: "bioBank",
            type: "address",
          },
        ],
        internalType: "struct AminoChainMarketplace.Listing",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "i_usdc",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "price",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "donor",
        type: "address",
      },
      {
        internalType: "address",
        name: "bioBank",
        type: "address",
      },
    ],
    name: "listItem",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_authenticator",
        type: "address",
      },
    ],
    name: "setAuthenticatorAddress",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "newIncentiveRate",
        type: "uint256",
      },
    ],
    name: "setDonorIncentiveRate",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "stemCells",
        type: "address",
      },
    ],
    name: "setTokenizedStemCells",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "tokenziedStemCells",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "newPrice",
        type: "uint256",
      },
    ],
    name: "updateListing",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const _bytecode =
  "0x60a06040523480156200001157600080fd5b5060405162002e8638038062002e868339818101604052810190620000379190620001aa565b600160008190555033600160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555080600260006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508173ffffffffffffffffffffffffffffffffffffffff1660808173ffffffffffffffffffffffffffffffffffffffff16815250508260048190555050505062000206565b600080fd5b6000819050919050565b6200011f816200010a565b81146200012b57600080fd5b50565b6000815190506200013f8162000114565b92915050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000620001728262000145565b9050919050565b620001848162000165565b81146200019057600080fd5b50565b600081519050620001a48162000179565b92915050565b600080600060608486031215620001c657620001c562000105565b5b6000620001d6868287016200012e565b9350506020620001e98682870162000193565b9250506040620001fc8682870162000193565b9150509250925092565b608051612c416200024560003960008181611095015281816111750152818161127d0152818161133c015281816113e10152611d1c0152612c416000f3fe608060405234801561001057600080fd5b50600436106100ea5760003560e01c8063823a64041161008c578063e7fb74c711610066578063e7fb74c714610223578063eef06bbd1461023f578063f2fde38b1461025b578063ff40e1d014610277576100ea565b8063823a6404146101cb5780638da5cb5b146101e9578063db3a48ae14610207576100ea565b80632335c76b116100c85780632335c76b14610159578063266e534514610177578063305a67a814610193578063543538eb146101af576100ea565b80630179ea88146100ef5780631dfe0e841461010b5780631fa2be911461013b575b600080fd5b61010960048036038101906101049190611dea565b610295565b005b61012560048036038101906101209190611e2a565b61057c565b6040516101329190611f0f565b60405180910390f35b6101436106bf565b6040516101509190611f39565b60405180910390f35b6101616106c5565b60405161016e9190611f63565b60405180910390f35b610191600480360381019061018c9190611faa565b6106eb565b005b6101ad60048036038101906101a89190611e2a565b610886565b005b6101c960048036038101906101c49190611faa565b610a91565b005b6101d3610c2c565b6040516101e09190611f63565b60405180910390f35b6101f1610c52565b6040516101fe9190611f63565b60405180910390f35b610221600480360381019061021c9190611e2a565b610c78565b005b61023d60048036038101906102389190611e2a565b610d8d565b005b61025960048036038101906102549190611fd7565b611617565b005b61027560048036038101906102709190611faa565b611b55565b005b61027f611d1a565b60405161028c9190611f63565b60405180910390f35b600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614610325576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161031c906120c1565b60405180910390fd5b6000600560008481526020019081526020016000206040518060a00160405290816000820160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200160018201548152602001600282015481526020016003820160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020016004820160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152505090503373ffffffffffffffffffffffffffffffffffffffff16816000015173ffffffffffffffffffffffffffffffffffffffff16146104cf576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016104c690612153565b60405180910390fd5b81816040015103610515576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161050c906121e5565b60405180910390fd5b8160056000858152602001908152602001600020600201819055507f1c4a7091747dda6c07273f34e272f189efd6777639e3047dc71ab4f18b2b26d93384848460600151856080015160405161056f959493929190612205565b60405180910390a1505050565b610584611d3e565b600560008381526020019081526020016000206040518060a00160405290816000820160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200160018201548152602001600282015481526020016003820160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020016004820160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815250509050919050565b60045481565b600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161461077b576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610772906122a4565b60405180910390fd5b8073ffffffffffffffffffffffffffffffffffffffff16600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff160361080b576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161080290612310565b60405180910390fd5b80600360006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055507f9da5210e450224b4d57208d165c46878ece9c9943decff672779dbb1fbb307018160405161087b9190611f63565b60405180910390a150565b600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614610916576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161090d906120c1565b60405180910390fd5b3373ffffffffffffffffffffffffffffffffffffffff166005600083815260200190815260200160002060000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16146109ba576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016109b1906123a2565b60405180910390fd5b60056000828152602001908152602001600020600080820160006101000a81549073ffffffffffffffffffffffffffffffffffffffff0219169055600182016000905560028201600090556003820160006101000a81549073ffffffffffffffffffffffffffffffffffffffff02191690556004820160006101000a81549073ffffffffffffffffffffffffffffffffffffffff021916905550507fc190f2991d2c9fdc82c83977b5ff2669a3e412d6399ede8f0348151d0c449fc83382604051610a869291906123c2565b60405180910390a150565b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614610b21576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610b18906122a4565b60405180910390fd5b600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff1603610bb1576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610ba890612310565b60405180910390fd5b80600260006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055507fa145565e729bfa7f063333631a66b2c7ef471c4a11e75f7a528170576f94c0fa81604051610c219190611f63565b60405180910390a150565b600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614610d08576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610cff906122a4565b60405180910390fd5b8060045403610d4c576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610d439061245d565b60405180910390fd5b806004819055507f0e8bdd7f2b7add1b6b2292115d8f94f1b2a07f7b08085a30bcf25566a3811dba81604051610d829190611f39565b60405180910390a150565b600260005403610dd2576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610dc9906124c9565b60405180910390fd5b60026000819055506000600560008381526020019081526020016000206040518060a00160405290816000820160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200160018201548152602001600282015481526020016003820160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020016004820160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815250509050600073ffffffffffffffffffffffffffffffffffffffff16816000015173ffffffffffffffffffffffffffffffffffffffff1603610f85576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610f7c90612535565b60405180910390fd5b3373ffffffffffffffffffffffffffffffffffffffff16600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16636352211e846040518263ffffffff1660e01b8152600401610ff79190611f39565b602060405180830381865afa158015611014573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190611038919061256a565b73ffffffffffffffffffffffffffffffffffffffff160361108e576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161108590612609565b60405180910390fd5b80604001517f000000000000000000000000000000000000000000000000000000000000000073ffffffffffffffffffffffffffffffffffffffff166370a08231336040518263ffffffff1660e01b81526004016110ec9190611f63565b602060405180830381865afa158015611109573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061112d919061263e565b101561116e576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401611165906126b7565b60405180910390fd5b80604001517f000000000000000000000000000000000000000000000000000000000000000073ffffffffffffffffffffffffffffffffffffffff1663dd62ed3e33306040518363ffffffff1660e01b81526004016111ce9291906126d7565b602060405180830381865afa1580156111eb573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061120f919061263e565b1015611250576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161124790612798565b60405180910390fd5b600060045482604001516112649190612816565b90506000600a83604001516112799190612816565b90507f000000000000000000000000000000000000000000000000000000000000000073ffffffffffffffffffffffffffffffffffffffff166323b872dd33856080015184866112c99190612847565b87604001516112d8919061287b565b6040518463ffffffff1660e01b81526004016112f6939291906128af565b6020604051808303816000875af1158015611315573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190611339919061291e565b507f000000000000000000000000000000000000000000000000000000000000000073ffffffffffffffffffffffffffffffffffffffff166323b872dd338560000151846040518463ffffffff1660e01b815260040161139b939291906128af565b6020604051808303816000875af11580156113ba573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906113de919061291e565b507f000000000000000000000000000000000000000000000000000000000000000073ffffffffffffffffffffffffffffffffffffffff166323b872dd338560600151856040518463ffffffff1660e01b8152600401611440939291906128af565b6020604051808303816000875af115801561145f573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190611483919061291e565b50600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166342842e0e846000015133876040518463ffffffff1660e01b81526004016114e7939291906128af565b600060405180830381600087803b15801561150157600080fd5b505af1158015611515573d6000803e3d6000fd5b505050507f344e4b9c591441b1bb8e8ffdbcba6bcc90a6d7c22e1b8ffc858736a36c8ed71d836000015185338660400151858860600151888a6080015160405161156698979695949392919061294b565b60405180910390a160056000858152602001908152602001600020600080820160006101000a81549073ffffffffffffffffffffffffffffffffffffffff0219169055600182016000905560028201600090556003820160006101000a81549073ffffffffffffffffffffffffffffffffffffffff02191690556004820160006101000a81549073ffffffffffffffffffffffffffffffffffffffff02191690555050505050600160008190555050565b600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16146116a7576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161169e906120c1565b60405180910390fd5b3373ffffffffffffffffffffffffffffffffffffffff16600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16636352211e866040518263ffffffff1660e01b81526004016117199190611f39565b602060405180830381865afa158015611736573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061175a919061256a565b73ffffffffffffffffffffffffffffffffffffffff16146117b0576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016117a790612a15565b60405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff166005600086815260200190815260200160002060000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1614611855576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161184c90612a81565b60405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff16036118c4576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016118bb90612aed565b60405180910390fd5b60011515600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663e985e9c533306040518363ffffffff1660e01b81526004016119259291906126d7565b602060405180830381865afa158015611942573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190611966919061291e565b1515146119a8576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161199f90612b7f565b60405180910390fd5b6040518060a001604052803373ffffffffffffffffffffffffffffffffffffffff1681526020018581526020018481526020018373ffffffffffffffffffffffffffffffffffffffff1681526020018273ffffffffffffffffffffffffffffffffffffffff168152506005600086815260200190815260200160002060008201518160000160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550602082015181600101556040820151816002015560608201518160030160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555060808201518160040160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055509050507f1c4a7091747dda6c07273f34e272f189efd6777639e3047dc71ab4f18b2b26d93385858585604051611b47959493929190612205565b60405180910390a150505050565b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614611be5576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401611bdc906122a4565b60405180910390fd5b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff1603611c75576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401611c6c90612beb565b60405180910390fd5b6000600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905081600160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055507f7699c77f2404f9b6bbd003861bb4af8ae70b205e19e73d7ec7fe4590db59a6b78183604051611d0e9291906126d7565b60405180910390a15050565b7f000000000000000000000000000000000000000000000000000000000000000081565b6040518060a00160405280600073ffffffffffffffffffffffffffffffffffffffff1681526020016000815260200160008152602001600073ffffffffffffffffffffffffffffffffffffffff168152602001600073ffffffffffffffffffffffffffffffffffffffff1681525090565b600080fd5b6000819050919050565b611dc781611db4565b8114611dd257600080fd5b50565b600081359050611de481611dbe565b92915050565b60008060408385031215611e0157611e00611daf565b5b6000611e0f85828601611dd5565b9250506020611e2085828601611dd5565b9150509250929050565b600060208284031215611e4057611e3f611daf565b5b6000611e4e84828501611dd5565b91505092915050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000611e8282611e57565b9050919050565b611e9281611e77565b82525050565b611ea181611db4565b82525050565b60a082016000820151611ebd6000850182611e89565b506020820151611ed06020850182611e98565b506040820151611ee36040850182611e98565b506060820151611ef66060850182611e89565b506080820151611f096080850182611e89565b50505050565b600060a082019050611f246000830184611ea7565b92915050565b611f3381611db4565b82525050565b6000602082019050611f4e6000830184611f2a565b92915050565b611f5d81611e77565b82525050565b6000602082019050611f786000830184611f54565b92915050565b611f8781611e77565b8114611f9257600080fd5b50565b600081359050611fa481611f7e565b92915050565b600060208284031215611fc057611fbf611daf565b5b6000611fce84828501611f95565b91505092915050565b60008060008060808587031215611ff157611ff0611daf565b5b6000611fff87828801611dd5565b945050602061201087828801611dd5565b935050604061202187828801611f95565b925050606061203287828801611f95565b91505092959194509250565b600082825260208201905092915050565b7f4d73672073656e64657220696e206e6f742061757468656e74696361746f722060008201527f636f6e7472616374000000000000000000000000000000000000000000000000602082015250565b60006120ab60288361203e565b91506120b68261204f565b604082019050919050565b600060208201905081810360008301526120da8161209e565b9050919050565b7f4f6e6c79206c69737465722063616e20757064617465207468656972206c697360008201527f74696e6700000000000000000000000000000000000000000000000000000000602082015250565b600061213d60248361203e565b9150612148826120e1565b604082019050919050565b6000602082019050818103600083015261216c81612130565b9050919050565b7f4f6c642070726963652063616e6e6f74206265207468652073616d652061732060008201527f746865206e657700000000000000000000000000000000000000000000000000602082015250565b60006121cf60278361203e565b91506121da82612173565b604082019050919050565b600060208201905081810360008301526121fe816121c2565b9050919050565b600060a08201905061221a6000830188611f54565b6122276020830187611f2a565b6122346040830186611f2a565b6122416060830185611f54565b61224e6080830184611f54565b9695505050505050565b7f4d73672073656e64657220696e206e6f7420636f6e7472616374206f776e6572600082015250565b600061228e60208361203e565b915061229982612258565b602082019050919050565b600060208201905081810360008301526122bd81612281565b9050919050565b7f4e6577206164647265737320697320616c726561647920736574000000000000600082015250565b60006122fa601a8361203e565b9150612305826122c4565b602082019050919050565b60006020820190508181036000830152612329816122ed565b9050919050565b7f4f6e6c79206c69737465722063616e2063616e63656c207468656972206c697360008201527f74696e6700000000000000000000000000000000000000000000000000000000602082015250565b600061238c60248361203e565b915061239782612330565b604082019050919050565b600060208201905081810360008301526123bb8161237f565b9050919050565b60006040820190506123d76000830185611f54565b6123e46020830184611f2a565b9392505050565b7f4e657720696e63656e746976652072617465206973207468652073616d65206160008201527f7320746865206f6c640000000000000000000000000000000000000000000000602082015250565b600061244760298361203e565b9150612452826123eb565b604082019050919050565b600060208201905081810360008301526124768161243a565b9050919050565b7f5265656e7472616e637947756172643a207265656e7472616e742063616c6c00600082015250565b60006124b3601f8361203e565b91506124be8261247d565b602082019050919050565b600060208201905081810360008301526124e2816124a6565b9050919050565b7f546f6b656e206973206e6f74206c697374656400000000000000000000000000600082015250565b600061251f60138361203e565b915061252a826124e9565b602082019050919050565b6000602082019050818103600083015261254e81612512565b9050919050565b60008151905061256481611f7e565b92915050565b6000602082840312156125805761257f611daf565b5b600061258e84828501612555565b91505092915050565b7f546f6b656e2073656c6c65722063616e6e6f742062757920746865697220746f60008201527f6b656e0000000000000000000000000000000000000000000000000000000000602082015250565b60006125f360238361203e565b91506125fe82612597565b604082019050919050565b60006020820190508181036000830152612622816125e6565b9050919050565b60008151905061263881611dbe565b92915050565b60006020828403121561265457612653611daf565b5b600061266284828501612629565b91505092915050565b7f4275796572277320555344432062616c656e636520697320746f6f206c6f7700600082015250565b60006126a1601f8361203e565b91506126ac8261266b565b602082019050919050565b600060208201905081810360008301526126d081612694565b9050919050565b60006040820190506126ec6000830185611f54565b6126f96020830184611f54565b9392505050565b7f4d61726b6574706c61636520616c6c6f77616e63652066726f6d20627579657260008201527f206f6e205553444320636f6e7472616374206d7573742062652068696768657260208201527f207468616e206c697374696e6720707269636500000000000000000000000000604082015250565b600061278260538361203e565b915061278d82612700565b606082019050919050565b600060208201905081810360008301526127b181612775565b9050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601260045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b600061282182611db4565b915061282c83611db4565b92508261283c5761283b6127b8565b5b828204905092915050565b600061285282611db4565b915061285d83611db4565b9250828201905080821115612875576128746127e7565b5b92915050565b600061288682611db4565b915061289183611db4565b92508282039050818111156128a9576128a86127e7565b5b92915050565b60006060820190506128c46000830186611f54565b6128d16020830185611f54565b6128de6040830184611f2a565b949350505050565b60008115159050919050565b6128fb816128e6565b811461290657600080fd5b50565b600081519050612918816128f2565b92915050565b60006020828403121561293457612933611daf565b5b600061294284828501612909565b91505092915050565b600061010082019050612961600083018b611f54565b61296e602083018a611f2a565b61297b6040830189611f54565b6129886060830188611f2a565b6129956080830187611f2a565b6129a260a0830186611f54565b6129af60c0830185611f2a565b6129bc60e0830184611f54565b9998505050505050505050565b7f546f6b656e206973206e6f74206f776e65642062792073656e64657200000000600082015250565b60006129ff601c8361203e565b9150612a0a826129c9565b602082019050919050565b60006020820190508181036000830152612a2e816129f2565b9050919050565b7f546f6b656e20697320616c7265616479206c6973746564000000000000000000600082015250565b6000612a6b60178361203e565b9150612a7682612a35565b602082019050919050565b60006020820190508181036000830152612a9a81612a5e565b9050919050565b7f42696f42616e6b2063616e6e6f74206265206e756c6c00000000000000000000600082015250565b6000612ad760168361203e565b9150612ae282612aa1565b602082019050919050565b60006020820190508181036000830152612b0681612aca565b9050919050565b7f4d61726b6574706c61636520646f6573206e6f74206861766520617070726f7660008201527f616c2066726f6d206c6973746572206f6e204e465420636f6e74726163740000602082015250565b6000612b69603e8361203e565b9150612b7482612b0d565b604082019050919050565b60006020820190508181036000830152612b9881612b5c565b9050919050565b7f4e6577206164647265737320697320616c7265616479206f776e657200000000600082015250565b6000612bd5601c8361203e565b9150612be082612b9f565b602082019050919050565b60006020820190508181036000830152612c0481612bc8565b905091905056fea2646970667358221220839f86c5088f012c1ddf518c30d8afaac085a57306be7e12fa670acf5c6eefa164736f6c63430008110033";

type AminoChainMarketplaceConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: AminoChainMarketplaceConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class AminoChainMarketplace__factory extends ContractFactory {
  constructor(...args: AminoChainMarketplaceConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    _donorIncentiveRate: PromiseOrValue<BigNumberish>,
    _usdc: PromiseOrValue<string>,
    _tokenizedStemCells: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<AminoChainMarketplace> {
    return super.deploy(
      _donorIncentiveRate,
      _usdc,
      _tokenizedStemCells,
      overrides || {}
    ) as Promise<AminoChainMarketplace>;
  }
  override getDeployTransaction(
    _donorIncentiveRate: PromiseOrValue<BigNumberish>,
    _usdc: PromiseOrValue<string>,
    _tokenizedStemCells: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(
      _donorIncentiveRate,
      _usdc,
      _tokenizedStemCells,
      overrides || {}
    );
  }
  override attach(address: string): AminoChainMarketplace {
    return super.attach(address) as AminoChainMarketplace;
  }
  override connect(signer: Signer): AminoChainMarketplace__factory {
    return super.connect(signer) as AminoChainMarketplace__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): AminoChainMarketplaceInterface {
    return new utils.Interface(_abi) as AminoChainMarketplaceInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): AminoChainMarketplace {
    return new Contract(
      address,
      _abi,
      signerOrProvider
    ) as AminoChainMarketplace;
  }
}