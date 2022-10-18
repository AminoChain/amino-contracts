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
import type { Token, TokenInterface } from "../../../contracts/test/Token";

const _abi = [
  {
    inputs: [
      {
        internalType: "string",
        name: "name_",
        type: "string",
      },
      {
        internalType: "string",
        name: "symbol_",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "supply",
        type: "uint256",
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
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "Approval",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "Transfer",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
    ],
    name: "allowance",
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
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "approve",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "balanceOf",
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
    inputs: [],
    name: "decimals",
    outputs: [
      {
        internalType: "uint8",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "subtractedValue",
        type: "uint256",
      },
    ],
    name: "decreaseAllowance",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "addedValue",
        type: "uint256",
      },
    ],
    name: "increaseAllowance",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "name",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "symbol",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalSupply",
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
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "transfer",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "transferFrom",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const _bytecode =
  "0x60806040523480156200001157600080fd5b5060405162001b8d38038062001b8d833981810160405281019062000037919062000383565b82828160039080519060200190620000519291906200023e565b5080600490805190602001906200006a9291906200023e565b505050620000a93362000082620000b260201b60201c565b600a620000909190620005bc565b836200009d9190620006f9565b620000bb60201b60201c565b50505062000915565b60006012905090565b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff1614156200012e576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401620001259062000455565b60405180910390fd5b62000142600083836200023460201b60201c565b806002600082825462000156919062000504565b92505081905550806000808473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000828254620001ad919062000504565b925050819055508173ffffffffffffffffffffffffffffffffffffffff16600073ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef8360405162000214919062000477565b60405180910390a362000230600083836200023960201b60201c565b5050565b505050565b505050565b8280546200024c90620007a7565b90600052602060002090601f016020900481019282620002705760008555620002bc565b82601f106200028b57805160ff1916838001178555620002bc565b82800160010185558215620002bc579182015b82811115620002bb5782518255916020019190600101906200029e565b5b509050620002cb9190620002cf565b5090565b5b80821115620002ea576000816000905550600101620002d0565b5090565b600062000305620002ff84620004bd565b62000494565b905082815260208101848484011115620003245762000323620008a5565b5b6200033184828562000771565b509392505050565b600082601f830112620003515762000350620008a0565b5b815162000363848260208601620002ee565b91505092915050565b6000815190506200037d81620008fb565b92915050565b6000806000606084860312156200039f576200039e620008af565b5b600084015167ffffffffffffffff811115620003c057620003bf620008aa565b5b620003ce8682870162000339565b935050602084015167ffffffffffffffff811115620003f257620003f1620008aa565b5b620004008682870162000339565b925050604062000413868287016200036c565b9150509250925092565b60006200042c601f83620004f3565b91506200043982620008d2565b602082019050919050565b6200044f816200075a565b82525050565b6000602082019050818103600083015262000470816200041d565b9050919050565b60006020820190506200048e600083018462000444565b92915050565b6000620004a0620004b3565b9050620004ae8282620007dd565b919050565b6000604051905090565b600067ffffffffffffffff821115620004db57620004da62000871565b5b620004e682620008b4565b9050602081019050919050565b600082825260208201905092915050565b600062000511826200075a565b91506200051e836200075a565b9250827fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff0382111562000556576200055562000813565b5b828201905092915050565b6000808291508390505b6001851115620005b3578086048111156200058b576200058a62000813565b5b60018516156200059b5780820291505b8081029050620005ab85620008c5565b94506200056b565b94509492505050565b6000620005c9826200075a565b9150620005d68362000764565b9250620006057fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff84846200060d565b905092915050565b6000826200061f5760019050620006f2565b816200062f5760009050620006f2565b8160018114620006485760028114620006535762000689565b6001915050620006f2565b60ff84111562000668576200066762000813565b5b8360020a91508482111562000682576200068162000813565b5b50620006f2565b5060208310610133831016604e8410600b8410161715620006c35782820a905083811115620006bd57620006bc62000813565b5b620006f2565b620006d2848484600162000561565b92509050818404811115620006ec57620006eb62000813565b5b81810290505b9392505050565b600062000706826200075a565b915062000713836200075a565b9250817fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff04831182151516156200074f576200074e62000813565b5b828202905092915050565b6000819050919050565b600060ff82169050919050565b60005b838110156200079157808201518184015260208101905062000774565b83811115620007a1576000848401525b50505050565b60006002820490506001821680620007c057607f821691505b60208210811415620007d757620007d662000842565b5b50919050565b620007e882620008b4565b810181811067ffffffffffffffff821117156200080a576200080962000871565b5b80604052505050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b600080fd5b600080fd5b600080fd5b600080fd5b6000601f19601f8301169050919050565b60008160011c9050919050565b7f45524332303a206d696e7420746f20746865207a65726f206164647265737300600082015250565b62000906816200075a565b81146200091257600080fd5b50565b61126880620009256000396000f3fe608060405234801561001057600080fd5b50600436106100a95760003560e01c80633950935111610071578063395093511461016857806370a082311461019857806395d89b41146101c8578063a457c2d7146101e6578063a9059cbb14610216578063dd62ed3e14610246576100a9565b806306fdde03146100ae578063095ea7b3146100cc57806318160ddd146100fc57806323b872dd1461011a578063313ce5671461014a575b600080fd5b6100b6610276565b6040516100c39190610d29565b60405180910390f35b6100e660048036038101906100e19190610b73565b610308565b6040516100f39190610d0e565b60405180910390f35b61010461032b565b6040516101119190610e2b565b60405180910390f35b610134600480360381019061012f9190610b20565b610335565b6040516101419190610d0e565b60405180910390f35b610152610364565b60405161015f9190610e46565b60405180910390f35b610182600480360381019061017d9190610b73565b61036d565b60405161018f9190610d0e565b60405180910390f35b6101b260048036038101906101ad9190610ab3565b6103a4565b6040516101bf9190610e2b565b60405180910390f35b6101d06103ec565b6040516101dd9190610d29565b60405180910390f35b61020060048036038101906101fb9190610b73565b61047e565b60405161020d9190610d0e565b60405180910390f35b610230600480360381019061022b9190610b73565b6104f5565b60405161023d9190610d0e565b60405180910390f35b610260600480360381019061025b9190610ae0565b610518565b60405161026d9190610e2b565b60405180910390f35b60606003805461028590610f5b565b80601f01602080910402602001604051908101604052809291908181526020018280546102b190610f5b565b80156102fe5780601f106102d3576101008083540402835291602001916102fe565b820191906000526020600020905b8154815290600101906020018083116102e157829003601f168201915b5050505050905090565b60008061031361059f565b90506103208185856105a7565b600191505092915050565b6000600254905090565b60008061034061059f565b905061034d858285610772565b6103588585856107fe565b60019150509392505050565b60006012905090565b60008061037861059f565b905061039981858561038a8589610518565b6103949190610e7d565b6105a7565b600191505092915050565b60008060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020549050919050565b6060600480546103fb90610f5b565b80601f016020809104026020016040519081016040528092919081815260200182805461042790610f5b565b80156104745780601f1061044957610100808354040283529160200191610474565b820191906000526020600020905b81548152906001019060200180831161045757829003601f168201915b5050505050905090565b60008061048961059f565b905060006104978286610518565b9050838110156104dc576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016104d390610e0b565b60405180910390fd5b6104e982868684036105a7565b60019250505092915050565b60008061050061059f565b905061050d8185856107fe565b600191505092915050565b6000600160008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054905092915050565b600033905090565b600073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff161415610617576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161060e90610deb565b60405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff161415610687576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161067e90610d6b565b60405180910390fd5b80600160008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055508173ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925836040516107659190610e2b565b60405180910390a3505050565b600061077e8484610518565b90507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff81146107f857818110156107ea576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016107e190610d8b565b60405180910390fd5b6107f784848484036105a7565b5b50505050565b600073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff16141561086e576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161086590610dcb565b60405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff1614156108de576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016108d590610d4b565b60405180910390fd5b6108e9838383610a7f565b60008060008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205490508181101561096f576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161096690610dab565b60405180910390fd5b8181036000808673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002081905550816000808573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000828254610a029190610e7d565b925050819055508273ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef84604051610a669190610e2b565b60405180910390a3610a79848484610a84565b50505050565b505050565b505050565b600081359050610a9881611204565b92915050565b600081359050610aad8161121b565b92915050565b600060208284031215610ac957610ac8610feb565b5b6000610ad784828501610a89565b91505092915050565b60008060408385031215610af757610af6610feb565b5b6000610b0585828601610a89565b9250506020610b1685828601610a89565b9150509250929050565b600080600060608486031215610b3957610b38610feb565b5b6000610b4786828701610a89565b9350506020610b5886828701610a89565b9250506040610b6986828701610a9e565b9150509250925092565b60008060408385031215610b8a57610b89610feb565b5b6000610b9885828601610a89565b9250506020610ba985828601610a9e565b9150509250929050565b610bbc81610ee5565b82525050565b6000610bcd82610e61565b610bd78185610e6c565b9350610be7818560208601610f28565b610bf081610ff0565b840191505092915050565b6000610c08602383610e6c565b9150610c1382611001565b604082019050919050565b6000610c2b602283610e6c565b9150610c3682611050565b604082019050919050565b6000610c4e601d83610e6c565b9150610c598261109f565b602082019050919050565b6000610c71602683610e6c565b9150610c7c826110c8565b604082019050919050565b6000610c94602583610e6c565b9150610c9f82611117565b604082019050919050565b6000610cb7602483610e6c565b9150610cc282611166565b604082019050919050565b6000610cda602583610e6c565b9150610ce5826111b5565b604082019050919050565b610cf981610f11565b82525050565b610d0881610f1b565b82525050565b6000602082019050610d236000830184610bb3565b92915050565b60006020820190508181036000830152610d438184610bc2565b905092915050565b60006020820190508181036000830152610d6481610bfb565b9050919050565b60006020820190508181036000830152610d8481610c1e565b9050919050565b60006020820190508181036000830152610da481610c41565b9050919050565b60006020820190508181036000830152610dc481610c64565b9050919050565b60006020820190508181036000830152610de481610c87565b9050919050565b60006020820190508181036000830152610e0481610caa565b9050919050565b60006020820190508181036000830152610e2481610ccd565b9050919050565b6000602082019050610e406000830184610cf0565b92915050565b6000602082019050610e5b6000830184610cff565b92915050565b600081519050919050565b600082825260208201905092915050565b6000610e8882610f11565b9150610e9383610f11565b9250827fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff03821115610ec857610ec7610f8d565b5b828201905092915050565b6000610ede82610ef1565b9050919050565b60008115159050919050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000819050919050565b600060ff82169050919050565b60005b83811015610f46578082015181840152602081019050610f2b565b83811115610f55576000848401525b50505050565b60006002820490506001821680610f7357607f821691505b60208210811415610f8757610f86610fbc565b5b50919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b600080fd5b6000601f19601f8301169050919050565b7f45524332303a207472616e7366657220746f20746865207a65726f206164647260008201527f6573730000000000000000000000000000000000000000000000000000000000602082015250565b7f45524332303a20617070726f766520746f20746865207a65726f20616464726560008201527f7373000000000000000000000000000000000000000000000000000000000000602082015250565b7f45524332303a20696e73756666696369656e7420616c6c6f77616e6365000000600082015250565b7f45524332303a207472616e7366657220616d6f756e742065786365656473206260008201527f616c616e63650000000000000000000000000000000000000000000000000000602082015250565b7f45524332303a207472616e736665722066726f6d20746865207a65726f20616460008201527f6472657373000000000000000000000000000000000000000000000000000000602082015250565b7f45524332303a20617070726f76652066726f6d20746865207a65726f2061646460008201527f7265737300000000000000000000000000000000000000000000000000000000602082015250565b7f45524332303a2064656372656173656420616c6c6f77616e63652062656c6f7760008201527f207a65726f000000000000000000000000000000000000000000000000000000602082015250565b61120d81610ed3565b811461121857600080fd5b50565b61122481610f11565b811461122f57600080fd5b5056fea2646970667358221220a8d7dbf093f093d35da7645e121556bf0dc006e995fe4be8967927bb23f82be164736f6c63430008070033";

type TokenConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: TokenConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class Token__factory extends ContractFactory {
  constructor(...args: TokenConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    name_: PromiseOrValue<string>,
    symbol_: PromiseOrValue<string>,
    supply: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<Token> {
    return super.deploy(
      name_,
      symbol_,
      supply,
      overrides || {}
    ) as Promise<Token>;
  }
  override getDeployTransaction(
    name_: PromiseOrValue<string>,
    symbol_: PromiseOrValue<string>,
    supply: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(name_, symbol_, supply, overrides || {});
  }
  override attach(address: string): Token {
    return super.attach(address) as Token;
  }
  override connect(signer: Signer): Token__factory {
    return super.connect(signer) as Token__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): TokenInterface {
    return new utils.Interface(_abi) as TokenInterface;
  }
  static connect(address: string, signerOrProvider: Signer | Provider): Token {
    return new Contract(address, _abi, signerOrProvider) as Token;
  }
}
