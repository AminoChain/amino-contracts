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

export declare namespace AminoChainMarketplace {
  export type ListingStruct = {
    seller: PromiseOrValue<string>;
    tokenId: PromiseOrValue<BigNumberish>;
    sizeInCC: PromiseOrValue<BigNumberish>;
    price: PromiseOrValue<BigNumberish>;
    donor: PromiseOrValue<string>;
    bioBank: PromiseOrValue<string>;
  };

  export type ListingStructOutput = [
    string,
    BigNumber,
    BigNumber,
    BigNumber,
    string,
    string
  ] & {
    seller: string;
    tokenId: BigNumber;
    sizeInCC: BigNumber;
    price: BigNumber;
    donor: string;
    bioBank: string;
  };
}

export interface AminoChainMarketplaceInterface extends utils.Interface {
  functions: {
    "DEFAULT_PRICE_PER_CC()": FunctionFragment;
    "authenticator()": FunctionFragment;
    "buyItem(uint256)": FunctionFragment;
    "cancelListing(uint256)": FunctionFragment;
    "donorIncentiveRate()": FunctionFragment;
    "fulfill(bytes32,bool)": FunctionFragment;
    "getListingData(uint256)": FunctionFragment;
    "i_usdc()": FunctionFragment;
    "listItem(uint256,uint256,address,address)": FunctionFragment;
    "owner()": FunctionFragment;
    "requestBuyAccess()": FunctionFragment;
    "setAuthenticatorAddress(address)": FunctionFragment;
    "setDonorIncentiveRate(uint256)": FunctionFragment;
    "setTokenizedStemCells(address)": FunctionFragment;
    "tokenziedStemCells()": FunctionFragment;
    "transferOwnership(address)": FunctionFragment;
    "updateListing(uint256,uint256)": FunctionFragment;
    "withdrawLink()": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | "DEFAULT_PRICE_PER_CC"
      | "authenticator"
      | "buyItem"
      | "cancelListing"
      | "donorIncentiveRate"
      | "fulfill"
      | "getListingData"
      | "i_usdc"
      | "listItem"
      | "owner"
      | "requestBuyAccess"
      | "setAuthenticatorAddress"
      | "setDonorIncentiveRate"
      | "setTokenizedStemCells"
      | "tokenziedStemCells"
      | "transferOwnership"
      | "updateListing"
      | "withdrawLink"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "DEFAULT_PRICE_PER_CC",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "authenticator",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "buyItem",
    values: [PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "cancelListing",
    values: [PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "donorIncentiveRate",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "fulfill",
    values: [PromiseOrValue<BytesLike>, PromiseOrValue<boolean>]
  ): string;
  encodeFunctionData(
    functionFragment: "getListingData",
    values: [PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(functionFragment: "i_usdc", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "listItem",
    values: [
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<string>,
      PromiseOrValue<string>
    ]
  ): string;
  encodeFunctionData(functionFragment: "owner", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "requestBuyAccess",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "setAuthenticatorAddress",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "setDonorIncentiveRate",
    values: [PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "setTokenizedStemCells",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "tokenziedStemCells",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "transferOwnership",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "updateListing",
    values: [PromiseOrValue<BigNumberish>, PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "withdrawLink",
    values?: undefined
  ): string;

  decodeFunctionResult(
    functionFragment: "DEFAULT_PRICE_PER_CC",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "authenticator",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "buyItem", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "cancelListing",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "donorIncentiveRate",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "fulfill", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "getListingData",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "i_usdc", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "listItem", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "owner", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "requestBuyAccess",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "setAuthenticatorAddress",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "setDonorIncentiveRate",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "setTokenizedStemCells",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "tokenziedStemCells",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "transferOwnership",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "updateListing",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "withdrawLink",
    data: BytesLike
  ): Result;

  events: {
    "ChainlinkCancelled(bytes32)": EventFragment;
    "ChainlinkFulfilled(bytes32)": EventFragment;
    "ChainlinkRequested(bytes32)": EventFragment;
    "authenticatorAddressSet(address)": EventFragment;
    "listingCanceled(address,uint256)": EventFragment;
    "newDonorIncentiveRate(uint256)": EventFragment;
    "newListing(address,uint256,uint256,uint256,address,address)": EventFragment;
    "ownershipTransferred(address,address)": EventFragment;
    "sale(address,uint256,uint256,address,uint256,uint256,address,uint256,address)": EventFragment;
    "stemCellsAddressSet(address)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "ChainlinkCancelled"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "ChainlinkFulfilled"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "ChainlinkRequested"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "authenticatorAddressSet"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "listingCanceled"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "newDonorIncentiveRate"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "newListing"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "ownershipTransferred"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "sale"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "stemCellsAddressSet"): EventFragment;
}

export interface ChainlinkCancelledEventObject {
  id: string;
}
export type ChainlinkCancelledEvent = TypedEvent<
  [string],
  ChainlinkCancelledEventObject
>;

export type ChainlinkCancelledEventFilter =
  TypedEventFilter<ChainlinkCancelledEvent>;

export interface ChainlinkFulfilledEventObject {
  id: string;
}
export type ChainlinkFulfilledEvent = TypedEvent<
  [string],
  ChainlinkFulfilledEventObject
>;

export type ChainlinkFulfilledEventFilter =
  TypedEventFilter<ChainlinkFulfilledEvent>;

export interface ChainlinkRequestedEventObject {
  id: string;
}
export type ChainlinkRequestedEvent = TypedEvent<
  [string],
  ChainlinkRequestedEventObject
>;

export type ChainlinkRequestedEventFilter =
  TypedEventFilter<ChainlinkRequestedEvent>;

export interface authenticatorAddressSetEventObject {
  authenticator: string;
}
export type authenticatorAddressSetEvent = TypedEvent<
  [string],
  authenticatorAddressSetEventObject
>;

export type authenticatorAddressSetEventFilter =
  TypedEventFilter<authenticatorAddressSetEvent>;

export interface listingCanceledEventObject {
  seller: string;
  tokenId: BigNumber;
}
export type listingCanceledEvent = TypedEvent<
  [string, BigNumber],
  listingCanceledEventObject
>;

export type listingCanceledEventFilter = TypedEventFilter<listingCanceledEvent>;

export interface newDonorIncentiveRateEventObject {
  newIncentiveRate: BigNumber;
}
export type newDonorIncentiveRateEvent = TypedEvent<
  [BigNumber],
  newDonorIncentiveRateEventObject
>;

export type newDonorIncentiveRateEventFilter =
  TypedEventFilter<newDonorIncentiveRateEvent>;

export interface newListingEventObject {
  seller: string;
  tokenId: BigNumber;
  sizeInCC: BigNumber;
  price: BigNumber;
  donor: string;
  bioBank: string;
}
export type newListingEvent = TypedEvent<
  [string, BigNumber, BigNumber, BigNumber, string, string],
  newListingEventObject
>;

export type newListingEventFilter = TypedEventFilter<newListingEvent>;

export interface ownershipTransferredEventObject {
  oldOwner: string;
  newOwner: string;
}
export type ownershipTransferredEvent = TypedEvent<
  [string, string],
  ownershipTransferredEventObject
>;

export type ownershipTransferredEventFilter =
  TypedEventFilter<ownershipTransferredEvent>;

export interface saleEventObject {
  seller: string;
  tokenId: BigNumber;
  sizeInCC: BigNumber;
  buyer: string;
  salePrice: BigNumber;
  protocolFee: BigNumber;
  donor: string;
  donorIncentive: BigNumber;
  bioBank: string;
}
export type saleEvent = TypedEvent<
  [
    string,
    BigNumber,
    BigNumber,
    string,
    BigNumber,
    BigNumber,
    string,
    BigNumber,
    string
  ],
  saleEventObject
>;

export type saleEventFilter = TypedEventFilter<saleEvent>;

export interface stemCellsAddressSetEventObject {
  stemCells: string;
}
export type stemCellsAddressSetEvent = TypedEvent<
  [string],
  stemCellsAddressSetEventObject
>;

export type stemCellsAddressSetEventFilter =
  TypedEventFilter<stemCellsAddressSetEvent>;

export interface AminoChainMarketplace extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: AminoChainMarketplaceInterface;

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
    DEFAULT_PRICE_PER_CC(overrides?: CallOverrides): Promise<[BigNumber]>;

    authenticator(overrides?: CallOverrides): Promise<[string]>;

    buyItem(
      tokenId: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    cancelListing(
      tokenId: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    donorIncentiveRate(overrides?: CallOverrides): Promise<[BigNumber]>;

    fulfill(
      _requestId: PromiseOrValue<BytesLike>,
      isDoctorOrResearcher: PromiseOrValue<boolean>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    getListingData(
      tokenId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<[AminoChainMarketplace.ListingStructOutput]>;

    i_usdc(overrides?: CallOverrides): Promise<[string]>;

    listItem(
      tokenId: PromiseOrValue<BigNumberish>,
      sizeInCC: PromiseOrValue<BigNumberish>,
      donor: PromiseOrValue<string>,
      bioBank: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    owner(overrides?: CallOverrides): Promise<[string]>;

    requestBuyAccess(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    setAuthenticatorAddress(
      _authenticator: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    setDonorIncentiveRate(
      newIncentiveRate: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    setTokenizedStemCells(
      stemCells: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    tokenziedStemCells(overrides?: CallOverrides): Promise<[string]>;

    transferOwnership(
      newOwner: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    updateListing(
      tokenId: PromiseOrValue<BigNumberish>,
      newPrice: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    withdrawLink(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;
  };

  DEFAULT_PRICE_PER_CC(overrides?: CallOverrides): Promise<BigNumber>;

  authenticator(overrides?: CallOverrides): Promise<string>;

  buyItem(
    tokenId: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  cancelListing(
    tokenId: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  donorIncentiveRate(overrides?: CallOverrides): Promise<BigNumber>;

  fulfill(
    _requestId: PromiseOrValue<BytesLike>,
    isDoctorOrResearcher: PromiseOrValue<boolean>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  getListingData(
    tokenId: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<AminoChainMarketplace.ListingStructOutput>;

  i_usdc(overrides?: CallOverrides): Promise<string>;

  listItem(
    tokenId: PromiseOrValue<BigNumberish>,
    sizeInCC: PromiseOrValue<BigNumberish>,
    donor: PromiseOrValue<string>,
    bioBank: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  owner(overrides?: CallOverrides): Promise<string>;

  requestBuyAccess(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  setAuthenticatorAddress(
    _authenticator: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  setDonorIncentiveRate(
    newIncentiveRate: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  setTokenizedStemCells(
    stemCells: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  tokenziedStemCells(overrides?: CallOverrides): Promise<string>;

  transferOwnership(
    newOwner: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  updateListing(
    tokenId: PromiseOrValue<BigNumberish>,
    newPrice: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  withdrawLink(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    DEFAULT_PRICE_PER_CC(overrides?: CallOverrides): Promise<BigNumber>;

    authenticator(overrides?: CallOverrides): Promise<string>;

    buyItem(
      tokenId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;

    cancelListing(
      tokenId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;

    donorIncentiveRate(overrides?: CallOverrides): Promise<BigNumber>;

    fulfill(
      _requestId: PromiseOrValue<BytesLike>,
      isDoctorOrResearcher: PromiseOrValue<boolean>,
      overrides?: CallOverrides
    ): Promise<void>;

    getListingData(
      tokenId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<AminoChainMarketplace.ListingStructOutput>;

    i_usdc(overrides?: CallOverrides): Promise<string>;

    listItem(
      tokenId: PromiseOrValue<BigNumberish>,
      sizeInCC: PromiseOrValue<BigNumberish>,
      donor: PromiseOrValue<string>,
      bioBank: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;

    owner(overrides?: CallOverrides): Promise<string>;

    requestBuyAccess(overrides?: CallOverrides): Promise<string>;

    setAuthenticatorAddress(
      _authenticator: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;

    setDonorIncentiveRate(
      newIncentiveRate: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;

    setTokenizedStemCells(
      stemCells: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;

    tokenziedStemCells(overrides?: CallOverrides): Promise<string>;

    transferOwnership(
      newOwner: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;

    updateListing(
      tokenId: PromiseOrValue<BigNumberish>,
      newPrice: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;

    withdrawLink(overrides?: CallOverrides): Promise<void>;
  };

  filters: {
    "ChainlinkCancelled(bytes32)"(
      id?: PromiseOrValue<BytesLike> | null
    ): ChainlinkCancelledEventFilter;
    ChainlinkCancelled(
      id?: PromiseOrValue<BytesLike> | null
    ): ChainlinkCancelledEventFilter;

    "ChainlinkFulfilled(bytes32)"(
      id?: PromiseOrValue<BytesLike> | null
    ): ChainlinkFulfilledEventFilter;
    ChainlinkFulfilled(
      id?: PromiseOrValue<BytesLike> | null
    ): ChainlinkFulfilledEventFilter;

    "ChainlinkRequested(bytes32)"(
      id?: PromiseOrValue<BytesLike> | null
    ): ChainlinkRequestedEventFilter;
    ChainlinkRequested(
      id?: PromiseOrValue<BytesLike> | null
    ): ChainlinkRequestedEventFilter;

    "authenticatorAddressSet(address)"(
      authenticator?: null
    ): authenticatorAddressSetEventFilter;
    authenticatorAddressSet(
      authenticator?: null
    ): authenticatorAddressSetEventFilter;

    "listingCanceled(address,uint256)"(
      seller?: null,
      tokenId?: null
    ): listingCanceledEventFilter;
    listingCanceled(seller?: null, tokenId?: null): listingCanceledEventFilter;

    "newDonorIncentiveRate(uint256)"(
      newIncentiveRate?: null
    ): newDonorIncentiveRateEventFilter;
    newDonorIncentiveRate(
      newIncentiveRate?: null
    ): newDonorIncentiveRateEventFilter;

    "newListing(address,uint256,uint256,uint256,address,address)"(
      seller?: null,
      tokenId?: null,
      sizeInCC?: null,
      price?: null,
      donor?: null,
      bioBank?: null
    ): newListingEventFilter;
    newListing(
      seller?: null,
      tokenId?: null,
      sizeInCC?: null,
      price?: null,
      donor?: null,
      bioBank?: null
    ): newListingEventFilter;

    "ownershipTransferred(address,address)"(
      oldOwner?: null,
      newOwner?: null
    ): ownershipTransferredEventFilter;
    ownershipTransferred(
      oldOwner?: null,
      newOwner?: null
    ): ownershipTransferredEventFilter;

    "sale(address,uint256,uint256,address,uint256,uint256,address,uint256,address)"(
      seller?: null,
      tokenId?: null,
      sizeInCC?: null,
      buyer?: null,
      salePrice?: null,
      protocolFee?: null,
      donor?: null,
      donorIncentive?: null,
      bioBank?: null
    ): saleEventFilter;
    sale(
      seller?: null,
      tokenId?: null,
      sizeInCC?: null,
      buyer?: null,
      salePrice?: null,
      protocolFee?: null,
      donor?: null,
      donorIncentive?: null,
      bioBank?: null
    ): saleEventFilter;

    "stemCellsAddressSet(address)"(
      stemCells?: null
    ): stemCellsAddressSetEventFilter;
    stemCellsAddressSet(stemCells?: null): stemCellsAddressSetEventFilter;
  };

  estimateGas: {
    DEFAULT_PRICE_PER_CC(overrides?: CallOverrides): Promise<BigNumber>;

    authenticator(overrides?: CallOverrides): Promise<BigNumber>;

    buyItem(
      tokenId: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    cancelListing(
      tokenId: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    donorIncentiveRate(overrides?: CallOverrides): Promise<BigNumber>;

    fulfill(
      _requestId: PromiseOrValue<BytesLike>,
      isDoctorOrResearcher: PromiseOrValue<boolean>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    getListingData(
      tokenId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    i_usdc(overrides?: CallOverrides): Promise<BigNumber>;

    listItem(
      tokenId: PromiseOrValue<BigNumberish>,
      sizeInCC: PromiseOrValue<BigNumberish>,
      donor: PromiseOrValue<string>,
      bioBank: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    owner(overrides?: CallOverrides): Promise<BigNumber>;

    requestBuyAccess(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    setAuthenticatorAddress(
      _authenticator: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    setDonorIncentiveRate(
      newIncentiveRate: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    setTokenizedStemCells(
      stemCells: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    tokenziedStemCells(overrides?: CallOverrides): Promise<BigNumber>;

    transferOwnership(
      newOwner: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    updateListing(
      tokenId: PromiseOrValue<BigNumberish>,
      newPrice: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    withdrawLink(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    DEFAULT_PRICE_PER_CC(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    authenticator(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    buyItem(
      tokenId: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    cancelListing(
      tokenId: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    donorIncentiveRate(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    fulfill(
      _requestId: PromiseOrValue<BytesLike>,
      isDoctorOrResearcher: PromiseOrValue<boolean>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    getListingData(
      tokenId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    i_usdc(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    listItem(
      tokenId: PromiseOrValue<BigNumberish>,
      sizeInCC: PromiseOrValue<BigNumberish>,
      donor: PromiseOrValue<string>,
      bioBank: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    owner(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    requestBuyAccess(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    setAuthenticatorAddress(
      _authenticator: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    setDonorIncentiveRate(
      newIncentiveRate: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    setTokenizedStemCells(
      stemCells: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    tokenziedStemCells(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    transferOwnership(
      newOwner: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    updateListing(
      tokenId: PromiseOrValue<BigNumberish>,
      newPrice: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    withdrawLink(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;
  };
}
