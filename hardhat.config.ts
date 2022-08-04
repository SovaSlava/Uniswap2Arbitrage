import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
const config: HardhatUserConfig = {
  solidity: "0.8.9",
  networks: {
    hardhat: {
      forking: {
        url: "https://eth-mainnet.g.alchemy.com/v2/qtTzV89cHW8dqC9y-6BcCNYAPd22EAoU",
        blockNumber: 15237166
      }
    }
  }
};

export default config;
