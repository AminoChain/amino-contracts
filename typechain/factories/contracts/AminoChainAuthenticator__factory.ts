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
        indexed: true,
        internalType: "address",
        name: "user",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256[]",
        name: "tokenIds",
        type: "uint256[]",
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
      {
        internalType: "uint256[]",
        name: "amounts",
        type: "uint256[]",
      },
    ],
    name: "registerUser",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const _bytecode =
  "0x60e06040523480156200001157600080fd5b5060405162000ff738038062000ff78339818101604052810190620000379190620001ba565b8273ffffffffffffffffffffffffffffffffffffffff1660808173ffffffffffffffffffffffffffffffffffffffff168152505060805173ffffffffffffffffffffffffffffffffffffffff1663a22cb4658360016040518363ffffffff1660e01b8152600401620000ab92919062000244565b600060405180830381600087803b158015620000c657600080fd5b505af1158015620000db573d6000803e3d6000fd5b505050508173ffffffffffffffffffffffffffffffffffffffff1660a08173ffffffffffffffffffffffffffffffffffffffff16815250508073ffffffffffffffffffffffffffffffffffffffff1660c08173ffffffffffffffffffffffffffffffffffffffff168152505050505062000271565b600080fd5b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000620001828262000155565b9050919050565b620001948162000175565b8114620001a057600080fd5b50565b600081519050620001b48162000189565b92915050565b600080600060608486031215620001d657620001d562000150565b5b6000620001e686828701620001a3565b9350506020620001f986828701620001a3565b92505060406200020c86828701620001a3565b9150509250925092565b620002218162000175565b82525050565b60008115159050919050565b6200023e8162000227565b82525050565b60006040820190506200025b600083018562000216565b6200026a602083018462000233565b9392505050565b60805160a05160c051610d53620002a460003960005050600061022801526000818160ca01526101730152610d536000f3fe608060405234801561001057600080fd5b50600436106100415760003560e01c8063150b7a021461004657806322366844146100765780634cb9fe5814610094575b600080fd5b610060600480360381019061005b919061046b565b6100b0565b60405161006d919061052e565b60405180910390f35b61007e6100c5565b60405161008b9190610564565b60405180910390f35b6100ae60048036038101906100a991906105f9565b61016f565b005b600063150b7a0260e01b905095945050505050565b6000807f000000000000000000000000000000000000000000000000000000000000000073ffffffffffffffffffffffffffffffffffffffff16631881eeb4336040518263ffffffff1660e01b81526004016101219190610698565b600060405180830381865afa15801561013e573d6000803e3d6000fd5b505050506040513d6000823e3d601f19601f820116820180604052508101906101679190610817565b511415905090565b60007f000000000000000000000000000000000000000000000000000000000000000073ffffffffffffffffffffffffffffffffffffffff166360f22dc8338786866040518563ffffffff1660e01b81526004016101d09493929190610b0d565b6000604051808303816000875af11580156101ef573d6000803e3d6000fd5b505050506040513d6000823e3d601f19601f820116820180604052508101906102189190610817565b905060005b81518110156102fd577f000000000000000000000000000000000000000000000000000000000000000073ffffffffffffffffffffffffffffffffffffffff1663eef06bbd83838151811061027557610274610b54565b5b60200260200101518686858181106102905761028f610b54565b5b9050602002013533896040518563ffffffff1660e01b81526004016102b89493929190610b92565b600060405180830381600087803b1580156102d257600080fd5b505af11580156102e6573d6000803e3d6000fd5b5050505080806102f590610c06565b91505061021d565b508060405161030c9190610d06565b60405180910390203373ffffffffffffffffffffffffffffffffffffffff167f7d4cdd7c46b6e3c6b78909afb3ce556b6faa88f43754ec9358b9b3c76b58f73160405160405180910390a35050505050565b6000604051905090565b600080fd5b600080fd5b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b600061039d82610372565b9050919050565b6103ad81610392565b81146103b857600080fd5b50565b6000813590506103ca816103a4565b92915050565b6000819050919050565b6103e3816103d0565b81146103ee57600080fd5b50565b600081359050610400816103da565b92915050565b600080fd5b600080fd5b600080fd5b60008083601f84011261042b5761042a610406565b5b8235905067ffffffffffffffff8111156104485761044761040b565b5b60208301915083600182028301111561046457610463610410565b5b9250929050565b60008060008060006080868803121561048757610486610368565b5b6000610495888289016103bb565b95505060206104a6888289016103bb565b94505060406104b7888289016103f1565b935050606086013567ffffffffffffffff8111156104d8576104d761036d565b5b6104e488828901610415565b92509250509295509295909350565b60007fffffffff0000000000000000000000000000000000000000000000000000000082169050919050565b610528816104f3565b82525050565b6000602082019050610543600083018461051f565b92915050565b60008115159050919050565b61055e81610549565b82525050565b60006020820190506105796000830184610555565b92915050565b600080fd5b600060a0828403121561059a5761059961057f565b5b81905092915050565b60008083601f8401126105b9576105b8610406565b5b8235905067ffffffffffffffff8111156105d6576105d561040b565b5b6020830191508360208202830111156105f2576105f1610410565b5b9250929050565b6000806000806060858703121561061357610612610368565b5b600085013567ffffffffffffffff8111156106315761063061036d565b5b61063d87828801610584565b945050602061064e878288016103bb565b935050604085013567ffffffffffffffff81111561066f5761066e61036d565b5b61067b878288016105a3565b925092505092959194509250565b61069281610392565b82525050565b60006020820190506106ad6000830184610689565b92915050565b6000601f19601f8301169050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b6106fc826106b3565b810181811067ffffffffffffffff8211171561071b5761071a6106c4565b5b80604052505050565b600061072e61035e565b905061073a82826106f3565b919050565b600067ffffffffffffffff82111561075a576107596106c4565b5b602082029050602081019050919050565b60008151905061077a816103da565b92915050565b600061079361078e8461073f565b610724565b905080838252602082019050602084028301858111156107b6576107b5610410565b5b835b818110156107df57806107cb888261076b565b8452602084019350506020810190506107b8565b5050509392505050565b600082601f8301126107fe576107fd610406565b5b815161080e848260208601610780565b91505092915050565b60006020828403121561082d5761082c610368565b5b600082015167ffffffffffffffff81111561084b5761084a61036d565b5b610857848285016107e9565b91505092915050565b600080fd5b600080fd5b600080fd5b6000808335600160200384360303811261088c5761088b61086a565b5b83810192508235915060208301925067ffffffffffffffff8211156108b4576108b3610860565b5b6020820236038313156108ca576108c9610865565b5b509250929050565b600082825260208201905092915050565b6000819050919050565b600060ff82169050919050565b610903816108ed565b82525050565b600061091583836108fa565b60208301905092915050565b61092a816108ed565b811461093557600080fd5b50565b60008135905061094781610921565b92915050565b600061095c6020840184610938565b905092915050565b6000602082019050919050565b600061097d83856108d2565b9350610988826108e3565b8060005b858110156109c15761099e828461094d565b6109a88882610909565b97506109b383610964565b92505060018101905061098c565b5085925050509392505050565b600060a083016109e1600084018461086f565b85830360008701526109f4838284610971565b92505050610a05602084018461086f565b8583036020870152610a18838284610971565b92505050610a29604084018461086f565b8583036040870152610a3c838284610971565b92505050610a4d606084018461086f565b8583036060870152610a60838284610971565b92505050610a71608084018461086f565b8583036080870152610a84838284610971565b925050508091505092915050565b600082825260208201905092915050565b600080fd5b82818337505050565b6000610abd8385610a92565b93507f07ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff831115610af057610aef610aa3565b5b602083029250610b01838584610aa8565b82840190509392505050565b6000606082019050610b226000830187610689565b8181036020830152610b3481866109ce565b90508181036040830152610b49818486610ab1565b905095945050505050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b610b8c816103d0565b82525050565b6000608082019050610ba76000830187610b83565b610bb46020830186610b83565b610bc16040830185610689565b610bce6060830184610689565b95945050505050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b6000610c11826103d0565b91507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff8203610c4357610c42610bd7565b5b600182019050919050565b600081519050919050565b600081905092915050565b6000819050602082019050919050565b610c7d816103d0565b82525050565b6000610c8f8383610c74565b60208301905092915050565b6000602082019050919050565b6000610cb382610c4e565b610cbd8185610c59565b9350610cc883610c64565b8060005b83811015610cf9578151610ce08882610c83565b9750610ceb83610c9b565b925050600181019050610ccc565b5085935050505092915050565b6000610d128284610ca8565b91508190509291505056fea2646970667358221220870f5a87ffe1cf70b668933cbf565471019358df070eafd38ed5800aa109a10c64736f6c63430008110033";

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
