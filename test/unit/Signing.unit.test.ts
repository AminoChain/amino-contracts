import {AES, ModeOfOperation, padding, utils} from "aes-js";
import {expect} from "chai";
import {ethers} from "hardhat";
import {arrayify, hashMessage, recoverAddress, recoverPublicKey} from "ethers/lib/utils";

const key = "Example128BitKey"
const keyBytes = utils.utf8.toBytes(key)

describe("Sign & recover test", async () => {
    it("Sign & recover", async () => {
        const [wallet] = await ethers.getSigners()

        const message = 'Test message'
        const signature = await wallet.signMessage(message)
        const digest = arrayify(hashMessage(message))
        const recoveredAddress = recoverAddress(digest, signature)

        expect(recoveredAddress).eq(wallet.address)
    })
})