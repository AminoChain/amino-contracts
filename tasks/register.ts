import { task } from "hardhat/config";
import {
    AminoChainAuthenticator__factory,
    AminoChainDonation__factory,
    AminoChainMarketplace__factory
} from "../typechain";

task("register", "").setAction(async (taskArgs, hre) => {
    const ethers = hre.ethers
    const [ deployer] = await ethers.getSigners()

    const nftFactory = (await ethers.getContractFactory("AminoChainDonation")) as AminoChainDonation__factory
    const nft = await nftFactory.attach('0xdF20EDD683d4a5e14a7B37eC9fDc6884d07Ba92E')

    const marketplaceFactory = (await ethers.getContractFactory("AminoChainMarketplace")) as AminoChainMarketplace__factory
    const marketplace = await marketplaceFactory.attach('0xaD4ef14479a1EA2F18449ff46D19707f6ab18642')

    const authenticatorFactory = (await ethers.getContractFactory("AminoChainAuthenticator")) as AminoChainAuthenticator__factory
    const authenticator = await authenticatorFactory.attach('0xe678C9BA5a9aE61fAc009a602b29ed869eD8156c')

    await authenticator.setNftAddress(nft.address)
    await nft.transferOwnership(authenticator.address)
    if (await marketplace.tokenziedStemCells() != nft.address) await marketplace.setTokenizedStemCells(nft.address)
    if (await marketplace.authenticator() != authenticator.address) await marketplace.setAuthenticatorAddress(authenticator.address)

    // const encryptor = new Encryptor('secret')
    // const hlaEncodedBytes = encryptor.encrypt(JSON.stringify(bioData))

    const hlaHash = '0xc69e9253e09dbcc132a1703674d67c398910241873892aafa3b1989931396a59'
    const donor = '0x3ef68eca339af002520a1ec0af7e940c7f0e0a9c'

    const tx = await authenticator.register({
        hlaHashed: {
            "A": "0xb4ff4867cc79126826f7a227459583daf153a4c06ebe46aa70d02b5edf79bf90",
            "B": "0x4f78dcb8885880abdd79a0ee42acd93e663070f9f26bc0fc0c5f286292ed80b8",
            "C": "0x91a4b0333b4164454a16c893710e4d93be09adce949dd57b62045d9702889926",
            "DPB": "0x2bf8860cf9668ead6525698f0457f7848f42305ccbc59f6880f5eee34ac8283f",
            "DRB": "0x8a2488f5299e815401467583e7495c69909605d3670c05471bc064e9d0938228"
        },
        hlaHash,
        hlaEncoded,
        genomeEncodedIpfsId: '',
        amounts: [20, 10],
        donor,
        biobank: '0x35a5b80732eFe78D171327C39de408227C299AAc'
    })

    await tx.wait()
})

const hlaEncoded = new Uint8Array([
    69,
    8,
    5,
    3,
    8,
    0,
    55,
    7,
    9,
    1,
    134,
    229,
    34,
    159,
    31,
    11,
    82,
    79,
    189,
    151,
    42,
    206,
    245,
    70,
    247,
    126,
    91,
    168,
    253,
    84,
    136,
    93,
    42,
    173,
    251,
    39,
    91,
    232,
    154,
    146,
    2,
    173,
    35,
    68,
    254,
    234,
    99,
    202,
    57,
    178,
    109,
    65,
    250,
    46,
    47,
    141,
    163,
    209,
    148,
    144,
    84,
    204,
    138,
    78,
    127,
    193,
    103,
    111,
    65,
    184,
    181,
    73,
    141,
    117,
    209,
    188,
    153,
    143,
    145,
    156
])