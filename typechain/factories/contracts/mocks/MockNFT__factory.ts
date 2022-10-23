/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../../common";
import type {
  MockNFT,
  MockNFTInterface,
} from "../../../contracts/mocks/MockNFT";

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
        name: "approved",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
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
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        indexed: false,
        internalType: "bool",
        name: "approved",
        type: "bool",
      },
    ],
    name: "ApprovalForAll",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
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
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
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
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "approve",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
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
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "getApproved",
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
        name: "donor",
        type: "address",
      },
    ],
    name: "getTokenIdByDonor",
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
        name: "owner",
        type: "address",
      },
      {
        internalType: "address",
        name: "operator",
        type: "address",
      },
    ],
    name: "isApprovedForAll",
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
        name: "donor",
        type: "address",
      },
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
    ],
    name: "mint",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
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
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "ownerOf",
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
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
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
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "safeTransferFrom",
    outputs: [],
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
        name: "tokenId",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "data",
        type: "bytes",
      },
    ],
    name: "safeTransferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        internalType: "bool",
        name: "approved",
        type: "bool",
      },
    ],
    name: "setApprovalForAll",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes4",
        name: "interfaceId",
        type: "bytes4",
      },
    ],
    name: "supportsInterface",
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
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "tokenURI",
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
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "transferFrom",
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
];

const _bytecode =
  "0x60806040523480156200001157600080fd5b50604051620030c0380380620030c0833981810160405281019062000037919062000315565b818181600090816200004a9190620005e5565b5080600190816200005c9190620005e5565b5050506200007f620000736200009e60201b60201c565b620000a660201b60201c565b6200009660076200016c60201b62000b791760201c565b5050620006cc565b600033905090565b6000600660009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905081600660006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508173ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e060405160405180910390a35050565b6001816000016000828254019250508190555050565b6000604051905090565b600080fd5b600080fd5b600080fd5b600080fd5b6000601f19601f8301169050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b620001eb82620001a0565b810181811067ffffffffffffffff821117156200020d576200020c620001b1565b5b80604052505050565b60006200022262000182565b9050620002308282620001e0565b919050565b600067ffffffffffffffff821115620002535762000252620001b1565b5b6200025e82620001a0565b9050602081019050919050565b60005b838110156200028b5780820151818401526020810190506200026e565b60008484015250505050565b6000620002ae620002a88462000235565b62000216565b905082815260208101848484011115620002cd57620002cc6200019b565b5b620002da8482856200026b565b509392505050565b600082601f830112620002fa57620002f962000196565b5b81516200030c84826020860162000297565b91505092915050565b600080604083850312156200032f576200032e6200018c565b5b600083015167ffffffffffffffff81111562000350576200034f62000191565b5b6200035e85828601620002e2565b925050602083015167ffffffffffffffff81111562000382576200038162000191565b5b6200039085828601620002e2565b9150509250929050565b600081519050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b60006002820490506001821680620003ed57607f821691505b602082108103620004035762000402620003a5565b5b50919050565b60008190508160005260206000209050919050565b60006020601f8301049050919050565b600082821b905092915050565b6000600883026200046d7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff826200042e565b6200047986836200042e565b95508019841693508086168417925050509392505050565b6000819050919050565b6000819050919050565b6000620004c6620004c0620004ba8462000491565b6200049b565b62000491565b9050919050565b6000819050919050565b620004e283620004a5565b620004fa620004f182620004cd565b8484546200043b565b825550505050565b600090565b6200051162000502565b6200051e818484620004d7565b505050565b5b8181101562000546576200053a60008262000507565b60018101905062000524565b5050565b601f82111562000595576200055f8162000409565b6200056a846200041e565b810160208510156200057a578190505b6200059262000589856200041e565b83018262000523565b50505b505050565b600082821c905092915050565b6000620005ba600019846008026200059a565b1980831691505092915050565b6000620005d58383620005a7565b9150826002028217905092915050565b620005f0826200039a565b67ffffffffffffffff8111156200060c576200060b620001b1565b5b620006188254620003d4565b620006258282856200054a565b600060209050601f8311600181146200065d576000841562000648578287015190505b620006548582620005c7565b865550620006c4565b601f1984166200066d8662000409565b60005b82811015620006975784890151825560018201915060208501945060208101905062000670565b86831015620006b75784890151620006b3601f891682620005a7565b8355505b6001600288020188555050505b505050505050565b6129e480620006dc6000396000f3fe608060405234801561001057600080fd5b50600436106101165760003560e01c806370a08231116100a2578063a22cb46511610071578063a22cb465146102f3578063b88d4fde1461030f578063c87b56dd1461032b578063e985e9c51461035b578063f2fde38b1461038b57610116565b806370a082311461027d578063715018a6146102ad5780638da5cb5b146102b757806395d89b41146102d557610116565b806323b872dd116100e957806323b872dd146101b557806325c4d819146101d15780632631fc951461020157806342842e0e146102315780636352211e1461024d57610116565b806301ffc9a71461011b57806306fdde031461014b578063081812fc14610169578063095ea7b314610199575b600080fd5b610135600480360381019061013091906119f2565b6103a7565b6040516101429190611a3a565b60405180910390f35b610153610489565b6040516101609190611ae5565b60405180910390f35b610183600480360381019061017e9190611b3d565b61051b565b6040516101909190611bab565b60405180910390f35b6101b360048036038101906101ae9190611bf2565b610561565b005b6101cf60048036038101906101ca9190611c32565b610678565b005b6101eb60048036038101906101e69190611ca9565b6106d8565b6040516101f89190611d14565b60405180910390f35b61021b60048036038101906102169190611d2f565b610750565b6040516102289190611d14565b60405180910390f35b61024b60048036038101906102469190611c32565b610799565b005b61026760048036038101906102629190611b3d565b6107b9565b6040516102749190611bab565b60405180910390f35b61029760048036038101906102929190611d2f565b61086a565b6040516102a49190611d14565b60405180910390f35b6102b5610921565b005b6102bf610935565b6040516102cc9190611bab565b60405180910390f35b6102dd61095f565b6040516102ea9190611ae5565b60405180910390f35b61030d60048036038101906103089190611d88565b6109f1565b005b61032960048036038101906103249190611efd565b610a07565b005b61034560048036038101906103409190611b3d565b610a69565b6040516103529190611ae5565b60405180910390f35b61037560048036038101906103709190611f80565b610ad1565b6040516103829190611a3a565b60405180910390f35b6103a560048036038101906103a09190611d2f565b610b65565b005b60007f80ac58cd000000000000000000000000000000000000000000000000000000007bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916148061047257507f5b5e139f000000000000000000000000000000000000000000000000000000007bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916145b80610482575061048182610b8f565b5b9050919050565b60606000805461049890611fef565b80601f01602080910402602001604051908101604052809291908181526020018280546104c490611fef565b80156105115780601f106104e657610100808354040283529160200191610511565b820191906000526020600020905b8154815290600101906020018083116104f457829003601f168201915b5050505050905090565b600061052682610bf9565b6004600083815260200190815260200160002060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050919050565b600061056c826107b9565b90508073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff16036105dc576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016105d390612092565b60405180910390fd5b8073ffffffffffffffffffffffffffffffffffffffff166105fb610c44565b73ffffffffffffffffffffffffffffffffffffffff16148061062a575061062981610624610c44565b610ad1565b5b610669576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161066090612124565b60405180910390fd5b6106738383610c4c565b505050565b610689610683610c44565b82610d05565b6106c8576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016106bf906121b6565b60405180910390fd5b6106d3838383610d9a565b505050565b6000806106e56007611000565b90506106f16007610b79565b6107026106fc610c44565b8261100e565b80600860008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055508091505092915050565b6000600860008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020549050919050565b6107b483838360405180602001604052806000815250610a07565b505050565b6000806002600084815260200190815260200160002060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff1603610861576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161085890612222565b60405180910390fd5b80915050919050565b60008073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff16036108da576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016108d1906122b4565b60405180910390fd5b600360008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020549050919050565b61092961102c565b61093360006110aa565b565b6000600660009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905090565b60606001805461096e90611fef565b80601f016020809104026020016040519081016040528092919081815260200182805461099a90611fef565b80156109e75780601f106109bc576101008083540402835291602001916109e7565b820191906000526020600020905b8154815290600101906020018083116109ca57829003601f168201915b5050505050905090565b610a036109fc610c44565b8383611170565b5050565b610a18610a12610c44565b83610d05565b610a57576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610a4e906121b6565b60405180910390fd5b610a63848484846112dc565b50505050565b6060610a7482610bf9565b6000610a7e611338565b90506000815111610a9e5760405180602001604052806000815250610ac9565b80610aa88461134f565b604051602001610ab9929190612310565b6040516020818303038152906040525b915050919050565b6000600560008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff16905092915050565b610b6d61102c565b610b76816114af565b50565b6001816000016000828254019250508190555050565b60007f01ffc9a7000000000000000000000000000000000000000000000000000000007bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916149050919050565b610c0281611532565b610c41576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610c3890612222565b60405180910390fd5b50565b600033905090565b816004600083815260200190815260200160002060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550808273ffffffffffffffffffffffffffffffffffffffff16610cbf836107b9565b73ffffffffffffffffffffffffffffffffffffffff167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b92560405160405180910390a45050565b600080610d11836107b9565b90508073ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff161480610d535750610d528185610ad1565b5b80610d9157508373ffffffffffffffffffffffffffffffffffffffff16610d798461051b565b73ffffffffffffffffffffffffffffffffffffffff16145b91505092915050565b8273ffffffffffffffffffffffffffffffffffffffff16610dba826107b9565b73ffffffffffffffffffffffffffffffffffffffff1614610e10576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610e07906123a6565b60405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff1603610e7f576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610e7690612438565b60405180910390fd5b610e8a83838361159e565b610e95600082610c4c565b6001600360008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000828254610ee59190612487565b925050819055506001600360008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000828254610f3c91906124bb565b92505081905550816002600083815260200190815260200160002060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550808273ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef60405160405180910390a4610ffb8383836115a3565b505050565b600081600001549050919050565b6110288282604051806020016040528060008152506115a8565b5050565b611034610c44565b73ffffffffffffffffffffffffffffffffffffffff16611052610935565b73ffffffffffffffffffffffffffffffffffffffff16146110a8576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161109f9061253b565b60405180910390fd5b565b6000600660009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905081600660006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508173ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e060405160405180910390a35050565b8173ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff16036111de576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016111d5906125a7565b60405180910390fd5b80600560008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff0219169083151502179055508173ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff167f17307eab39ab6107e8899845ad3d59bd9653f200f220920489ca2b5937696c31836040516112cf9190611a3a565b60405180910390a3505050565b6112e7848484610d9a565b6112f384848484611603565b611332576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161132990612639565b60405180910390fd5b50505050565b606060405180602001604052806000815250905090565b606060008203611396576040518060400160405280600181526020017f300000000000000000000000000000000000000000000000000000000000000081525090506114aa565b600082905060005b600082146113c85780806113b190612659565b915050600a826113c191906126d0565b915061139e565b60008167ffffffffffffffff8111156113e4576113e3611dd2565b5b6040519080825280601f01601f1916602001820160405280156114165781602001600182028036833780820191505090505b5090505b600085146114a35760018261142f9190612487565b9150600a8561143e9190612701565b603061144a91906124bb565b60f81b8183815181106114605761145f612732565b5b60200101907effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916908160001a905350600a8561149c91906126d0565b945061141a565b8093505050505b919050565b6114b761102c565b600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff1603611526576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161151d906127d3565b60405180910390fd5b61152f816110aa565b50565b60008073ffffffffffffffffffffffffffffffffffffffff166002600084815260200190815260200160002060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1614159050919050565b505050565b505050565b6115b2838361178a565b6115bf6000848484611603565b6115fe576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016115f590612639565b60405180910390fd5b505050565b60006116248473ffffffffffffffffffffffffffffffffffffffff16611963565b1561177d578373ffffffffffffffffffffffffffffffffffffffff1663150b7a0261164d610c44565b8786866040518563ffffffff1660e01b815260040161166f9493929190612848565b6020604051808303816000875af19250505080156116ab57506040513d601f19601f820116820180604052508101906116a891906128a9565b60015b61172d573d80600081146116db576040519150601f19603f3d011682016040523d82523d6000602084013e6116e0565b606091505b506000815103611725576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161171c90612639565b60405180910390fd5b805181602001fd5b63150b7a0260e01b7bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916817bffffffffffffffffffffffffffffffffffffffffffffffffffffffff191614915050611782565b600190505b949350505050565b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff16036117f9576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016117f090612922565b60405180910390fd5b61180281611532565b15611842576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016118399061298e565b60405180910390fd5b61184e6000838361159e565b6001600360008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825461189e91906124bb565b92505081905550816002600083815260200190815260200160002060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550808273ffffffffffffffffffffffffffffffffffffffff16600073ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef60405160405180910390a461195f600083836115a3565b5050565b6000808273ffffffffffffffffffffffffffffffffffffffff163b119050919050565b6000604051905090565b600080fd5b600080fd5b60007fffffffff0000000000000000000000000000000000000000000000000000000082169050919050565b6119cf8161199a565b81146119da57600080fd5b50565b6000813590506119ec816119c6565b92915050565b600060208284031215611a0857611a07611990565b5b6000611a16848285016119dd565b91505092915050565b60008115159050919050565b611a3481611a1f565b82525050565b6000602082019050611a4f6000830184611a2b565b92915050565b600081519050919050565b600082825260208201905092915050565b60005b83811015611a8f578082015181840152602081019050611a74565b60008484015250505050565b6000601f19601f8301169050919050565b6000611ab782611a55565b611ac18185611a60565b9350611ad1818560208601611a71565b611ada81611a9b565b840191505092915050565b60006020820190508181036000830152611aff8184611aac565b905092915050565b6000819050919050565b611b1a81611b07565b8114611b2557600080fd5b50565b600081359050611b3781611b11565b92915050565b600060208284031215611b5357611b52611990565b5b6000611b6184828501611b28565b91505092915050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000611b9582611b6a565b9050919050565b611ba581611b8a565b82525050565b6000602082019050611bc06000830184611b9c565b92915050565b611bcf81611b8a565b8114611bda57600080fd5b50565b600081359050611bec81611bc6565b92915050565b60008060408385031215611c0957611c08611990565b5b6000611c1785828601611bdd565b9250506020611c2885828601611b28565b9150509250929050565b600080600060608486031215611c4b57611c4a611990565b5b6000611c5986828701611bdd565b9350506020611c6a86828701611bdd565b9250506040611c7b86828701611b28565b9150509250925092565b600080fd5b600060a08284031215611ca057611c9f611c85565b5b81905092915050565b60008060408385031215611cc057611cbf611990565b5b6000611cce85828601611bdd565b925050602083013567ffffffffffffffff811115611cef57611cee611995565b5b611cfb85828601611c8a565b9150509250929050565b611d0e81611b07565b82525050565b6000602082019050611d296000830184611d05565b92915050565b600060208284031215611d4557611d44611990565b5b6000611d5384828501611bdd565b91505092915050565b611d6581611a1f565b8114611d7057600080fd5b50565b600081359050611d8281611d5c565b92915050565b60008060408385031215611d9f57611d9e611990565b5b6000611dad85828601611bdd565b9250506020611dbe85828601611d73565b9150509250929050565b600080fd5b600080fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b611e0a82611a9b565b810181811067ffffffffffffffff82111715611e2957611e28611dd2565b5b80604052505050565b6000611e3c611986565b9050611e488282611e01565b919050565b600067ffffffffffffffff821115611e6857611e67611dd2565b5b611e7182611a9b565b9050602081019050919050565b82818337600083830152505050565b6000611ea0611e9b84611e4d565b611e32565b905082815260208101848484011115611ebc57611ebb611dcd565b5b611ec7848285611e7e565b509392505050565b600082601f830112611ee457611ee3611dc8565b5b8135611ef4848260208601611e8d565b91505092915050565b60008060008060808587031215611f1757611f16611990565b5b6000611f2587828801611bdd565b9450506020611f3687828801611bdd565b9350506040611f4787828801611b28565b925050606085013567ffffffffffffffff811115611f6857611f67611995565b5b611f7487828801611ecf565b91505092959194509250565b60008060408385031215611f9757611f96611990565b5b6000611fa585828601611bdd565b9250506020611fb685828601611bdd565b9150509250929050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b6000600282049050600182168061200757607f821691505b60208210810361201a57612019611fc0565b5b50919050565b7f4552433732313a20617070726f76616c20746f2063757272656e74206f776e6560008201527f7200000000000000000000000000000000000000000000000000000000000000602082015250565b600061207c602183611a60565b915061208782612020565b604082019050919050565b600060208201905081810360008301526120ab8161206f565b9050919050565b7f4552433732313a20617070726f76652063616c6c6572206973206e6f7420746f60008201527f6b656e206f776e6572206e6f7220617070726f76656420666f7220616c6c0000602082015250565b600061210e603e83611a60565b9150612119826120b2565b604082019050919050565b6000602082019050818103600083015261213d81612101565b9050919050565b7f4552433732313a2063616c6c6572206973206e6f7420746f6b656e206f776e6560008201527f72206e6f7220617070726f766564000000000000000000000000000000000000602082015250565b60006121a0602e83611a60565b91506121ab82612144565b604082019050919050565b600060208201905081810360008301526121cf81612193565b9050919050565b7f4552433732313a20696e76616c696420746f6b656e2049440000000000000000600082015250565b600061220c601883611a60565b9150612217826121d6565b602082019050919050565b6000602082019050818103600083015261223b816121ff565b9050919050565b7f4552433732313a2061646472657373207a65726f206973206e6f74206120766160008201527f6c6964206f776e65720000000000000000000000000000000000000000000000602082015250565b600061229e602983611a60565b91506122a982612242565b604082019050919050565b600060208201905081810360008301526122cd81612291565b9050919050565b600081905092915050565b60006122ea82611a55565b6122f481856122d4565b9350612304818560208601611a71565b80840191505092915050565b600061231c82856122df565b915061232882846122df565b91508190509392505050565b7f4552433732313a207472616e736665722066726f6d20696e636f72726563742060008201527f6f776e6572000000000000000000000000000000000000000000000000000000602082015250565b6000612390602583611a60565b915061239b82612334565b604082019050919050565b600060208201905081810360008301526123bf81612383565b9050919050565b7f4552433732313a207472616e7366657220746f20746865207a65726f2061646460008201527f7265737300000000000000000000000000000000000000000000000000000000602082015250565b6000612422602483611a60565b915061242d826123c6565b604082019050919050565b6000602082019050818103600083015261245181612415565b9050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b600061249282611b07565b915061249d83611b07565b92508282039050818111156124b5576124b4612458565b5b92915050565b60006124c682611b07565b91506124d183611b07565b92508282019050808211156124e9576124e8612458565b5b92915050565b7f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572600082015250565b6000612525602083611a60565b9150612530826124ef565b602082019050919050565b6000602082019050818103600083015261255481612518565b9050919050565b7f4552433732313a20617070726f766520746f2063616c6c657200000000000000600082015250565b6000612591601983611a60565b915061259c8261255b565b602082019050919050565b600060208201905081810360008301526125c081612584565b9050919050565b7f4552433732313a207472616e7366657220746f206e6f6e20455243373231526560008201527f63656976657220696d706c656d656e7465720000000000000000000000000000602082015250565b6000612623603283611a60565b915061262e826125c7565b604082019050919050565b6000602082019050818103600083015261265281612616565b9050919050565b600061266482611b07565b91507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff820361269657612695612458565b5b600182019050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601260045260246000fd5b60006126db82611b07565b91506126e683611b07565b9250826126f6576126f56126a1565b5b828204905092915050565b600061270c82611b07565b915061271783611b07565b925082612727576127266126a1565b5b828206905092915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b7f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160008201527f6464726573730000000000000000000000000000000000000000000000000000602082015250565b60006127bd602683611a60565b91506127c882612761565b604082019050919050565b600060208201905081810360008301526127ec816127b0565b9050919050565b600081519050919050565b600082825260208201905092915050565b600061281a826127f3565b61282481856127fe565b9350612834818560208601611a71565b61283d81611a9b565b840191505092915050565b600060808201905061285d6000830187611b9c565b61286a6020830186611b9c565b6128776040830185611d05565b8181036060830152612889818461280f565b905095945050505050565b6000815190506128a3816119c6565b92915050565b6000602082840312156128bf576128be611990565b5b60006128cd84828501612894565b91505092915050565b7f4552433732313a206d696e7420746f20746865207a65726f2061646472657373600082015250565b600061290c602083611a60565b9150612917826128d6565b602082019050919050565b6000602082019050818103600083015261293b816128ff565b9050919050565b7f4552433732313a20746f6b656e20616c7265616479206d696e74656400000000600082015250565b6000612978601c83611a60565b915061298382612942565b602082019050919050565b600060208201905081810360008301526129a78161296b565b905091905056fea2646970667358221220ea8734ce56096bf59dfc465b61b96a8174dba77140d19945edbe27c45f2fd3e164736f6c63430008110033";

type MockNFTConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: MockNFTConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class MockNFT__factory extends ContractFactory {
  constructor(...args: MockNFTConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    name_: PromiseOrValue<string>,
    symbol_: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<MockNFT> {
    return super.deploy(name_, symbol_, overrides || {}) as Promise<MockNFT>;
  }
  override getDeployTransaction(
    name_: PromiseOrValue<string>,
    symbol_: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(name_, symbol_, overrides || {});
  }
  override attach(address: string): MockNFT {
    return super.attach(address) as MockNFT;
  }
  override connect(signer: Signer): MockNFT__factory {
    return super.connect(signer) as MockNFT__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): MockNFTInterface {
    return new utils.Interface(_abi) as MockNFTInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): MockNFT {
    return new Contract(address, _abi, signerOrProvider) as MockNFT;
  }
}
