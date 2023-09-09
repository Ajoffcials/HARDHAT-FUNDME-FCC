const { network } = require("hardhat");
const {
  networkConfig,
  developmentChains,
} = require("../helper-hardhat-config");
const chainId = network.config.chainId;
const { verify } = require("../utils/verify");
require("dotenv").config();

module.exports = async ({ deployments, getNamedAccounts }) => {
  const { deploy, log } = deployments;
  const { deployer } = await getNamedAccounts();
  let argumentConstructor;
  if (chainId == 31337) {
    log("mock detected");
    arrgegator = await deployments.get("MockV3Aggregator");
    arrgegatoraddresses = await arrgegator.address;
    argumentConstructor = arrgegatoraddresses;
  } else {
    log("test net");
    argumentConstructor = networkConfig[chainId]["ethUsdPriceFeed"];
  }

  // deploy
  const fundMe = await deploy("FundMe", {
    from: deployer,
    log: true,
    args: [argumentConstructor],
    waitConfirmations: network.config.blockConfirmations,
  });
  log(`${fundMe.address}`);
  if (
    !developmentChains.includes(network.name) &&
    process.env.ETHERSCAN_API_KEY
  ) {
    await verify(fundMe.address, [argumentConstructor]);
  }
};
module.exports.tags = ["all", "fundMe"];
