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
import type {
  FunctionFragment,
  Result,
  EventFragment,
} from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type {
  TypedEventFilter,
  TypedEvent,
  TypedListener,
  OnEvent,
  PromiseOrValue,
} from "../common";

export declare namespace AminoChainLibrary {
  export type BioDataStruct = {
    A: PromiseOrValue<BigNumberish>[];
    B: PromiseOrValue<BigNumberish>[];
    C: PromiseOrValue<BigNumberish>[];
    DPB: PromiseOrValue<BigNumberish>[];
    DRB: PromiseOrValue<BigNumberish>[];
  };

  export type BioDataStructOutput = [
    number[],
    number[],
    number[],
    number[],
    number[]
  ] & { A: number[]; B: number[]; C: number[]; DPB: number[]; DRB: number[] };
}

export interface IAminoChainAuthenticatorInterface extends utils.Interface {
  functions: {
    "isRegistered()": FunctionFragment;
    "registerUser((uint8[],uint8[],uint8[],uint8[],uint8[]),address)": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic: "isRegistered" | "registerUser"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "isRegistered",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "registerUser",
    values: [AminoChainLibrary.BioDataStruct, PromiseOrValue<string>]
  ): string;

  decodeFunctionResult(
    functionFragment: "isRegistered",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "registerUser",
    data: BytesLike
  ): Result;

  events: {
    "UserRegistered(address)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "UserRegistered"): EventFragment;
}

export interface UserRegisteredEventObject {
  user: string;
}
export type UserRegisteredEvent = TypedEvent<
  [string],
  UserRegisteredEventObject
>;

export type UserRegisteredEventFilter = TypedEventFilter<UserRegisteredEvent>;

export interface IAminoChainAuthenticator extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: IAminoChainAuthenticatorInterface;

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
    isRegistered(overrides?: CallOverrides): Promise<[boolean]>;

    registerUser(
      bioData: AminoChainLibrary.BioDataStruct,
      biobankAddress: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;
  };

  isRegistered(overrides?: CallOverrides): Promise<boolean>;

  registerUser(
    bioData: AminoChainLibrary.BioDataStruct,
    biobankAddress: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    isRegistered(overrides?: CallOverrides): Promise<boolean>;

    registerUser(
      bioData: AminoChainLibrary.BioDataStruct,
      biobankAddress: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;
  };

  filters: {
    "UserRegistered(address)"(user?: null): UserRegisteredEventFilter;
    UserRegistered(user?: null): UserRegisteredEventFilter;
  };

  estimateGas: {
    isRegistered(overrides?: CallOverrides): Promise<BigNumber>;

    registerUser(
      bioData: AminoChainLibrary.BioDataStruct,
      biobankAddress: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    isRegistered(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    registerUser(
      bioData: AminoChainLibrary.BioDataStruct,
      biobankAddress: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;
  };
}