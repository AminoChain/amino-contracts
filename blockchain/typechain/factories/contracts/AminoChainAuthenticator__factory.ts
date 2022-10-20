/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../common";
import type {
  AminoChainAuthenticator,
  AminoChainAuthenticatorInterface,
} from "../../contracts/AminoChainAuthenticator";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "nftAddress",
        type: "address",
      },
      {
        internalType: "address",
        name: "marketplaceAddress",
        type: "address",
      },
      {
        internalType: "address",
        name: "usdcAddress",
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
        name: "user",
        type: "address",
      },
    ],
    name: "UserRegistered",
    type: "event",
  },
  {
    inputs: [],
    name: "isRegistered",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "",
        type: "bytes",
      },
    ],
    name: "onERC721Received",
    outputs: [
      {
        internalType: "bytes4",
        name: "",
        type: "bytes4",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "uint8[]",
            name: "A",
            type: "uint8[]",
          },
          {
            internalType: "uint8[]",
            name: "B",
            type: "uint8[]",
          },
          {
            internalType: "uint8[]",
            name: "C",
            type: "uint8[]",
          },
          {
            internalType: "uint8[]",
            name: "DPB",
            type: "uint8[]",
          },
          {
            internalType: "uint8[]",
            name: "DRB",
            type: "uint8[]",
          },
        ],
        internalType: "struct AminoChainLibrary.BioData",
        name: "bioData",
        type: "tuple",
      },
      {
        internalType: "address",
        name: "biobankAddress",
        type: "address",
      },
    ],
    name: "registerUser",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const _bytecode =
  "0x60e06040526954b40b1f852bda0000006000553480156200001f57600080fd5b5060405162000c6f38038062000c6f8339818101604052810190620000459190620001c8565b8273ffffffffffffffffffffffffffffffffffffffff1660808173ffffffffffffffffffffffffffffffffffffffff168152505060805173ffffffffffffffffffffffffffffffffffffffff1663a22cb4658360016040518363ffffffff1660e01b8152600401620000b992919062000252565b600060405180830381600087803b158015620000d457600080fd5b505af1158015620000e9573d6000803e3d6000fd5b505050508173ffffffffffffffffffffffffffffffffffffffff1660a08173ffffffffffffffffffffffffffffffffffffffff16815250508073ffffffffffffffffffffffffffffffffffffffff1660c08173ffffffffffffffffffffffffffffffffffffffff16815250505050506200027f565b600080fd5b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000620001908262000163565b9050919050565b620001a28162000183565b8114620001ae57600080fd5b50565b600081519050620001c28162000197565b92915050565b600080600060608486031215620001e457620001e36200015e565b5b6000620001f486828701620001b1565b93505060206200020786828701620001b1565b92505060406200021a86828701620001b1565b9150509250925092565b6200022f8162000183565b82525050565b60008115159050919050565b6200024c8162000235565b82525050565b600060408201905062000269600083018562000224565b62000278602083018462000241565b9392505050565b60805160a05160c0516109af620002c0600039600050506000818161024a01526102bc01526000818160ca0152818161016d015261020d01526109af6000f3fe608060405234801561001057600080fd5b50600436106100415760003560e01c8063150b7a02146100465780632236684414610076578063c9f002ed14610094575b600080fd5b610060600480360381019061005b919061048c565b6100b0565b60405161006d919061054f565b60405180910390f35b61007e6100c5565b60405161008b9190610585565b60405180910390f35b6100ae60048036038101906100a991906105c4565b610169565b005b600063150b7a0260e01b905095945050505050565b6000807f000000000000000000000000000000000000000000000000000000000000000073ffffffffffffffffffffffffffffffffffffffff16632631fc95336040518263ffffffff1660e01b8152600401610121919061062f565b602060405180830381865afa15801561013e573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610162919061065f565b1415905090565b60007f000000000000000000000000000000000000000000000000000000000000000073ffffffffffffffffffffffffffffffffffffffff166325c4d81933856040518363ffffffff1660e01b81526004016101c69291906108be565b6020604051808303816000875af11580156101e5573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610209919061065f565b90507f000000000000000000000000000000000000000000000000000000000000000073ffffffffffffffffffffffffffffffffffffffff166323b872dd307f0000000000000000000000000000000000000000000000000000000000000000846040518463ffffffff1660e01b8152600401610288939291906108fd565b600060405180830381600087803b1580156102a257600080fd5b505af11580156102b6573d6000803e3d6000fd5b505050507f000000000000000000000000000000000000000000000000000000000000000073ffffffffffffffffffffffffffffffffffffffff1663eef06bbd8260005433866040518563ffffffff1660e01b815260040161031b9493929190610934565b600060405180830381600087803b15801561033557600080fd5b505af1158015610349573d6000803e3d6000fd5b505050507f54db7a5cb4735e1aac1f53db512d3390390bb6637bd30ad4bf9fc98667d9b9b93360405161037c919061062f565b60405180910390a1505050565b600080fd5b600080fd5b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b60006103be82610393565b9050919050565b6103ce816103b3565b81146103d957600080fd5b50565b6000813590506103eb816103c5565b92915050565b6000819050919050565b610404816103f1565b811461040f57600080fd5b50565b600081359050610421816103fb565b92915050565b600080fd5b600080fd5b600080fd5b60008083601f84011261044c5761044b610427565b5b8235905067ffffffffffffffff8111156104695761046861042c565b5b60208301915083600182028301111561048557610484610431565b5b9250929050565b6000806000806000608086880312156104a8576104a7610389565b5b60006104b6888289016103dc565b95505060206104c7888289016103dc565b94505060406104d888828901610412565b935050606086013567ffffffffffffffff8111156104f9576104f861038e565b5b61050588828901610436565b92509250509295509295909350565b60007fffffffff0000000000000000000000000000000000000000000000000000000082169050919050565b61054981610514565b82525050565b60006020820190506105646000830184610540565b92915050565b60008115159050919050565b61057f8161056a565b82525050565b600060208201905061059a6000830184610576565b92915050565b600080fd5b600060a082840312156105bb576105ba6105a0565b5b81905092915050565b600080604083850312156105db576105da610389565b5b600083013567ffffffffffffffff8111156105f9576105f861038e565b5b610605858286016105a5565b9250506020610616858286016103dc565b9150509250929050565b610629816103b3565b82525050565b60006020820190506106446000830184610620565b92915050565b600081519050610659816103fb565b92915050565b60006020828403121561067557610674610389565b5b60006106838482850161064a565b91505092915050565b600080fd5b600080fd5b600080fd5b600080833560016020038436030381126106b8576106b7610696565b5b83810192508235915060208301925067ffffffffffffffff8211156106e0576106df61068c565b5b6020820236038313156106f6576106f5610691565b5b509250929050565b600082825260208201905092915050565b6000819050919050565b600060ff82169050919050565b61072f81610719565b82525050565b60006107418383610726565b60208301905092915050565b61075681610719565b811461076157600080fd5b50565b6000813590506107738161074d565b92915050565b60006107886020840184610764565b905092915050565b6000602082019050919050565b60006107a983856106fe565b93506107b48261070f565b8060005b858110156107ed576107ca8284610779565b6107d48882610735565b97506107df83610790565b9250506001810190506107b8565b5085925050509392505050565b600060a0830161080d600084018461069b565b858303600087015261082083828461079d565b92505050610831602084018461069b565b858303602087015261084483828461079d565b92505050610855604084018461069b565b858303604087015261086883828461079d565b92505050610879606084018461069b565b858303606087015261088c83828461079d565b9250505061089d608084018461069b565b85830360808701526108b083828461079d565b925050508091505092915050565b60006040820190506108d36000830185610620565b81810360208301526108e581846107fa565b90509392505050565b6108f7816103f1565b82525050565b60006060820190506109126000830186610620565b61091f6020830185610620565b61092c60408301846108ee565b949350505050565b600060808201905061094960008301876108ee565b61095660208301866108ee565b6109636040830185610620565b6109706060830184610620565b9594505050505056fea2646970667358221220baa451ebc77f586c0fe548de8e48459eca1143adcc66d53aaef05eba19ace7a664736f6c63430008110033";

type AminoChainAuthenticatorConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: AminoChainAuthenticatorConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class AminoChainAuthenticator__factory extends ContractFactory {
  constructor(...args: AminoChainAuthenticatorConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    nftAddress: PromiseOrValue<string>,
    marketplaceAddress: PromiseOrValue<string>,
    usdcAddress: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<AminoChainAuthenticator> {
    return super.deploy(
      nftAddress,
      marketplaceAddress,
      usdcAddress,
      overrides || {}
    ) as Promise<AminoChainAuthenticator>;
  }
  override getDeployTransaction(
    nftAddress: PromiseOrValue<string>,
    marketplaceAddress: PromiseOrValue<string>,
    usdcAddress: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(
      nftAddress,
      marketplaceAddress,
      usdcAddress,
      overrides || {}
    );
  }
  override attach(address: string): AminoChainAuthenticator {
    return super.attach(address) as AminoChainAuthenticator;
  }
  override connect(signer: Signer): AminoChainAuthenticator__factory {
    return super.connect(signer) as AminoChainAuthenticator__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): AminoChainAuthenticatorInterface {
    return new utils.Interface(_abi) as AminoChainAuthenticatorInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): AminoChainAuthenticator {
    return new Contract(
      address,
      _abi,
      signerOrProvider
    ) as AminoChainAuthenticator;
  }
}
