const networkConfig = {
  11155111: {
    name: "sepolia",
    ethUsdPriceFeed: "0x1a81afB8146aeFfCFc5E50e8479e826E7D55b910",
  },
  84531: {
    name: "Goerli Testnet",
    ethUsdPriceFeed: "0xD4a33860578De61DBAbDc8BFdb98FD742fA7028e",
  },
  //31337
};
const developmentChains = ["hardhat", "localhost"];
const DECIMAL = 8;
const INITAL_ANSWER = 200000000000;

module.exports = {
  networkConfig,
  DECIMAL,
  INITAL_ANSWER,
  developmentChains,
};
