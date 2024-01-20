require("@nomicfoundation/hardhat-toolbox");
require("@nomicfoundation/hardhat-ethers");

const SEED_PHRASE = "there auto pave series gather glue oyster decide position solution follow merry"

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.19",
  networks: {
    hardhat: {
      accounts: {
        mnemonic: SEED_PHRASE,
      },
      chainId: 31337
    },
  },
};

