/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumber,
  BigNumberish,
  BytesLike,
  CallOverrides,
  ContractTransaction,
  Overrides,
  PopulatedTransaction,
  Signer,
  utils,
} from "ethers";
import type { FunctionFragment, Result } from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type {
  TypedEventFilter,
  TypedEvent,
  TypedListener,
  OnEvent,
  PromiseOrValue,
} from "../../common";

export interface MockConsumerInterface extends utils.Interface {
  functions: {
    "bonusToken()": FunctionFragment;
    "buyOutside(address,uint256,uint256)": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic: "bonusToken" | "buyOutside"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "bonusToken",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "buyOutside",
    values: [
      PromiseOrValue<string>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BigNumberish>
    ]
  ): string;

  decodeFunctionResult(functionFragment: "bonusToken", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "buyOutside", data: BytesLike): Result;

  events: {};
}

export interface MockConsumer extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: MockConsumerInterface;

  queryFilter<TEvent extends TypedEvent>(
    event: TypedEventFilter<TEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TEvent>>;

  listeners<TEvent extends TypedEvent>(
    eventFilter?: TypedEventFilter<TEvent>
  ): Array<TypedListener<TEvent>>;
  listeners(eventName?: string): Array<Listener>;
  removeAllListeners<TEvent extends TypedEvent>(
    eventFilter: TypedEventFilter<TEvent>
  ): this;
  removeAllListeners(eventName?: string): this;
  off: OnEvent<this>;
  on: OnEvent<this>;
  once: OnEvent<this>;
  removeListener: OnEvent<this>;

  functions: {
    bonusToken(overrides?: CallOverrides): Promise<[string]>;

    buyOutside(
      user: PromiseOrValue<string>,
      price: PromiseOrValue<BigNumberish>,
      marketing: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;
  };

  bonusToken(overrides?: CallOverrides): Promise<string>;

  buyOutside(
    user: PromiseOrValue<string>,
    price: PromiseOrValue<BigNumberish>,
    marketing: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    bonusToken(overrides?: CallOverrides): Promise<string>;

    buyOutside(
      user: PromiseOrValue<string>,
      price: PromiseOrValue<BigNumberish>,
      marketing: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;
  };

  filters: {};

  estimateGas: {
    bonusToken(overrides?: CallOverrides): Promise<BigNumber>;

    buyOutside(
      user: PromiseOrValue<string>,
      price: PromiseOrValue<BigNumberish>,
      marketing: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    bonusToken(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    buyOutside(
      user: PromiseOrValue<string>,
      price: PromiseOrValue<BigNumberish>,
      marketing: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;
  };
}
