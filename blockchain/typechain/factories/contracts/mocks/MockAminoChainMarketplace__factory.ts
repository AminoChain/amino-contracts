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
import type { PromiseOrValue } from "../../../common";
import type {
  MockAminoChainMarketplace,
  MockAminoChainMarketplaceInterface,
} from "../../../contracts/mocks/MockAminoChainMarketplace";

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
  "0x608060405234801561001057600080fd5b506040516105b23803806105b283398181016040528101906100329190610113565b806000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550505050610166565b600080fd5b6000819050919050565b6100928161007f565b811461009d57600080fd5b50565b6000815190506100af81610089565b92915050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b60006100e0826100b5565b9050919050565b6100f0816100d5565b81146100fb57600080fd5b50565b60008151905061010d816100e7565b92915050565b60008060006060848603121561012c5761012b61007a565b5b600061013a868287016100a0565b935050602061014b868287016100fe565b925050604061015c868287016100fe565b9150509250925092565b61043d806101756000396000f3fe608060405234801561001057600080fd5b50600436106100885760003560e01c8063db3a48ae1161005b578063db3a48ae146100fd578063e7fb74c714610119578063eef06bbd14610135578063f2fde38b1461015157610088565b80630179ea881461008d578063266e5345146100a9578063305a67a8146100c5578063543538eb146100e1575b600080fd5b6100a760048036038101906100a29190610253565b61016d565b005b6100c360048036038101906100be91906102f1565b610171565b005b6100df60048036038101906100da919061031e565b610174565b005b6100fb60048036038101906100f691906102f1565b610177565b005b6101176004803603810190610112919061031e565b61017a565b005b610133600480360381019061012e919061031e565b61017d565b005b61014f600480360381019061014a919061034b565b61020f565b005b61016b600480360381019061016691906102f1565b610215565b005b5050565b50565b50565b50565b50565b60008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166323b872dd3033846040518463ffffffff1660e01b81526004016101da939291906103d0565b600060405180830381600087803b1580156101f457600080fd5b505af1158015610208573d6000803e3d6000fd5b5050505050565b50505050565b50565b600080fd5b6000819050919050565b6102308161021d565b811461023b57600080fd5b50565b60008135905061024d81610227565b92915050565b6000806040838503121561026a57610269610218565b5b60006102788582860161023e565b92505060206102898582860161023e565b9150509250929050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b60006102be82610293565b9050919050565b6102ce816102b3565b81146102d957600080fd5b50565b6000813590506102eb816102c5565b92915050565b60006020828403121561030757610306610218565b5b6000610315848285016102dc565b91505092915050565b60006020828403121561033457610333610218565b5b60006103428482850161023e565b91505092915050565b6000806000806080858703121561036557610364610218565b5b60006103738782880161023e565b94505060206103848782880161023e565b9350506040610395878288016102dc565b92505060606103a6878288016102dc565b91505092959194509250565b6103bb816102b3565b82525050565b6103ca8161021d565b82525050565b60006060820190506103e560008301866103b2565b6103f260208301856103b2565b6103ff60408301846103c1565b94935050505056fea264697066735822122033a0040fbe601e61e46a53dd18680d35fc89f0e1ca3f7cddbae22e6aa88ba55564736f6c63430008110033";

type MockAminoChainMarketplaceConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: MockAminoChainMarketplaceConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class MockAminoChainMarketplace__factory extends ContractFactory {
  constructor(...args: MockAminoChainMarketplaceConstructorParams) {
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
  ): Promise<MockAminoChainMarketplace> {
    return super.deploy(
      _donorIncentiveRate,
      _usdc,
      _tokenizedStemCells,
      overrides || {}
    ) as Promise<MockAminoChainMarketplace>;
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
  override attach(address: string): MockAminoChainMarketplace {
    return super.attach(address) as MockAminoChainMarketplace;
  }
  override connect(signer: Signer): MockAminoChainMarketplace__factory {
    return super.connect(signer) as MockAminoChainMarketplace__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): MockAminoChainMarketplaceInterface {
    return new utils.Interface(_abi) as MockAminoChainMarketplaceInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): MockAminoChainMarketplace {
    return new Contract(
      address,
      _abi,
      signerOrProvider
    ) as MockAminoChainMarketplace;
  }
}
